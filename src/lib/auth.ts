'use server';

import { createClient } from '@/lib/supabase/server';
import { validateEmail } from '@/lib/email-validator';
import { type DeviceType, generateSessionToken } from '@/lib/device';

// Helper: safely convert any error to a string
function toErrorMessage(err: unknown): string {
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  if (err && typeof err === 'object' && 'message' in err) {
    return String((err as Record<string, unknown>).message || 'An error occurred');
  }
  return 'An error occurred';
}

// Helper: extract only serializable user data
function serializeUser(user: Record<string, unknown> | null) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    user_metadata: user.user_metadata,
    app_metadata: user.app_metadata,
    created_at: user.created_at,
  };
}

// ==========================================
// SIGNUP (Email + Password)
// ==========================================
export async function signUpWithEmail({
  fullName,
  email,
  username,
  password,
  referralCode,
  deviceType,
}: {
  fullName: string;
  email: string;
  username: string;
  password: string;
  referralCode?: string;
  deviceType?: DeviceType;
}) {
  const supabase = await createClient();

  // 1. Validate email
  const emailResult = await validateEmail(email);
  if (!emailResult.valid) {
    return { success: false, error: emailResult.error };
  }

  // 2. Check username
  const { data: existingUsername } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (existingUsername) {
    return { success: false, error: 'Username already taken' };
  }

  // 3. Check email
  const { data: existingEmail } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (existingEmail) {
    return { success: false, error: 'Email already registered' };
  }

  // 4. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username,
      },
    },
  });

  if (authError) {
    return { success: false, error: toErrorMessage(authError) };
  }

  // 5. Create profile
  if (authData.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      auth_id: authData.user.id,
      full_name: fullName,
      email,
      username,
      provider: 'email',
      role: 'user',
    });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return { success: false, error: 'Account created but profile setup failed. Please contact support.' };
    }
  }

  return {
    success: true,
    message: 'Account created! Check your email for verification link.',
  };
}

// ==========================================
// LOGIN (Email + Password)
// ==========================================
export async function signInWithEmail({
  email,
  password,
  deviceType,
}: {
  email: string;
  password: string;
  deviceType?: DeviceType;
}) {
  const supabase = await createClient();

  // 1. Validate email format
  const emailResult = validateEmailFormat(email);
  if (!emailResult) {
    return { success: false, error: 'Invalid email format' };
  }

  // 2. Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Invalid login')) {
      return { success: false, error: 'Invalid email or password' };
    }
    return { success: false, error: toErrorMessage(error) };
  }

  // 3. Register device session
  if (data.user && data.session && deviceType) {
    const sessionToken = generateSessionToken();
    try {
      const { data: sessionResult } = await supabase.rpc('register_session', {
        p_user_id: data.user.id,
        p_device_type: deviceType,
        p_session_token: sessionToken,
        p_device_info: deviceType,
      });
      if (sessionResult && sessionResult.allowed === false) {
        return {
          success: true,
          warning: 'Maximum device limit reached. Oldest session was replaced.',
        };
      }
    } catch {
      // RPC not set up yet — skip
    }
  }

  return { success: true };
}

// ==========================================
// LOGIN (Username + Password)
// ==========================================
export async function signInWithUsername({
  username,
  password,
  deviceType,
}: {
  username: string;
  password: string;
  deviceType?: DeviceType;
}) {
  const supabase = await createClient();

  // 1. Find email from username
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('email')
    .eq('username', username)
    .single();

  if (profileError || !profile?.email) {
    return { success: false, error: 'Username not found' };
  }

  // 2. Sign in with the email
  const { data, error } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password,
  });

  if (error) {
    if (error.message.includes('Invalid login')) {
      return { success: false, error: 'Invalid username or password' };
    }
    return { success: false, error: toErrorMessage(error) };
  }

  // 3. Register device session
  if (data.user && data.session && deviceType) {
    const sessionToken = generateSessionToken();
    try {
      const { data: sessionResult } = await supabase.rpc('register_session', {
        p_user_id: data.user.id,
        p_device_type: deviceType,
        p_session_token: sessionToken,
        p_device_info: deviceType,
      });
      if (sessionResult && sessionResult.allowed === false) {
        return {
          success: true,
          warning: 'Maximum device limit reached. Oldest session was replaced.',
        };
      }
    } catch {
      // RPC not set up yet — skip
    }
  }

  return { success: true };
}

// ==========================================
// SEND OTP (Phone)
// ==========================================
export async function sendPhoneOTP({
  fullName,
  phone,
  countryCode,
  deviceType,
}: {
  fullName: string;
  phone: string;
  countryCode: string;
  deviceType?: DeviceType;
}) {
  const supabase = await createClient();
  const fullPhone = `${countryCode}${phone.replace(/\s/g, '')}`;

  // Check if phone already registered
  const { data: existingPhone } = await supabase
    .from('profiles')
    .select('id')
    .eq('phone', fullPhone)
    .single();

  // Send OTP
  const { error } = await supabase.auth.signInWithOtp({
    phone: fullPhone,
    options: {
      data: {
        full_name: fullName,
        is_new_user: !existingPhone,
        device_type: deviceType || 'unknown',
      },
    },
  });

  if (error) {
    return { success: false, error: toErrorMessage(error) };
  }

  return {
    success: true,
    message: 'OTP sent successfully',
    phone: fullPhone,
    isNewUser: !existingPhone,
  };
}

// ==========================================
// VERIFY OTP (Phone)
// ==========================================
export async function verifyPhoneOTP({
  phone,
  otp,
  fullName,
  deviceType,
}: {
  phone: string;
  otp: string;
  fullName?: string;
  deviceType?: DeviceType;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: 'sms',
  });

  if (error) {
    return { success: false, error: toErrorMessage(error) };
  }

  // Create profile for new users
  if (data.user) {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('auth_id', data.user.id)
      .single();

    if (!existingProfile) {
      const generatedUsername =
        'user_' + (data.user.phone?.replace(/[^0-9]/g, '').slice(-8) || Date.now().toString());

      await supabase.from('profiles').insert({
        auth_id: data.user.id,
        full_name: fullName || data.user.user_metadata?.full_name || '',
        phone: data.user.phone,
        username: generatedUsername,
        provider: 'phone',
        role: 'user',
      });
    }

    // Register device session
    if (data.session && deviceType) {
      const sessionToken = generateSessionToken();
      try {
        await supabase.rpc('register_session', {
          p_user_id: data.user.id,
          p_device_type: deviceType,
          p_session_token: sessionToken,
          p_device_info: deviceType,
        });
      } catch {
        // RPC not set up yet — skip
      }
    }
  }

  return { success: true };
}

// ==========================================
// CHECK DEVICE SESSION
// ==========================================
export async function checkDeviceSession({
  userId,
  deviceType,
  sessionToken,
}: {
  userId: string;
  deviceType: DeviceType;
  sessionToken: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('check_session', {
    p_user_id: userId,
    p_device_type: deviceType,
    p_session_token: sessionToken,
  });

  if (error) {
    return { valid: false, error: toErrorMessage(error) };
  }

  return data;
}

// ==========================================
// LOGOUT
// ==========================================
export async function signOut({
  userId,
  sessionToken,
}: {
  userId?: string;
  sessionToken?: string;
} = {}) {
  const supabase = await createClient();

  if (userId && sessionToken) {
    try {
      await supabase.rpc('remove_session', {
        p_user_id: userId,
        p_session_token: sessionToken,
      });
    } catch {
      // RPC not set up yet — skip
    }
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: toErrorMessage(error) };
  }

  return { success: true };
}

// ==========================================
// GET PROFILE
// ==========================================
export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('auth_id', user.id)
    .single();

  return profile;
}

// ==========================================
// Helper: simple email format check
// ==========================================
function validateEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
