"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { 
  auth as firebaseAuth, 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  ConfirmationResult, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "@/lib/firebase";

export type AppUser = {
  id: string; // will be auth.users id OR firebase uid
  email?: string;
  phone?: string;
  email_confirmed_at?: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    provider?: string;
  };
};

type AuthContextType = {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendPhoneOtp: (phoneNumber: string, containerId: string) => Promise<void>;
  verifyPhoneOtp: (otp: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Helper to map Supabase User
  const mapSupabaseUser = (su: SupabaseUser | null): AppUser | null => {
    if (!su) return null;
    return {
      id: su.id,
      email: su.email,
      phone: su.phone,
      email_confirmed_at: su.email_confirmed_at,
      user_metadata: {
        full_name: su.user_metadata?.full_name,
        avatar_url: su.user_metadata?.avatar_url,
        provider: su.app_metadata?.provider || 'email'
      }
    };
  };

  // Helper to map Firebase User
  const mapFirebaseUser = (fu: FirebaseUser | null): AppUser | null => {
    if (!fu) return null;
    return {
      id: fu.uid,
      email: fu.email || undefined,
      phone: fu.phoneNumber || undefined,
      email_confirmed_at: fu.emailVerified ? new Date().toISOString() : undefined,
      user_metadata: {
        full_name: fu.displayName || undefined,
        avatar_url: fu.photoURL || undefined,
        provider: 'firebase'
      }
    };
  };

  useEffect(() => {
    let sbUser: SupabaseUser | null = null;
    let fbUser: FirebaseUser | null = null;

    const updateState = () => {
      if (sbUser) {
        setUser(mapSupabaseUser(sbUser));
      } else if (fbUser) {
        setUser(mapFirebaseUser(fbUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    // Supabase Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      sbUser = session?.user ?? null;
      updateState();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      sbUser = session?.user ?? null;
      updateState();
    });

    // Firebase Listener
    const unsubscribeFb = onAuthStateChanged(firebaseAuth, (user) => {
      fbUser = user;
      updateState();
    });

    return () => {
      subscription.unsubscribe();
      unsubscribeFb();
    };
  }, []);

  async function syncUserWithBackend(authId: string | null, firebaseUid: string | null, email: string | null, phone: string | null, fullName: string | null, provider: string) {
    try {
      await fetch("http://localhost:8000/auth/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_id: authId,
          firebase_uid: firebaseUid,
          email,
          phone,
          full_name: fullName,
          provider,
        }),
      });
    } catch (e) {
      console.error("Failed to sync user with Rust backend:", e);
    }
  }

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signup(email: string, password: string, displayName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: displayName } }
    });
    if (error) throw error;
    if (data.user) {
      await syncUserWithBackend(data.user.id, null, data.user.email || null, null, displayName || null, 'email');
    }
  }

  async function logout() {
    await Promise.all([
      supabase.auth.signOut(),
      firebaseSignOut(firebaseAuth)
    ]);
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  async function updateUserProfile(displayName: string) {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayName }
    });
    if (error) throw error;
  }

  async function signInWithGoogle() {
    // Note: OAuth redirect will handle the sync differently if needed,
    // but typically we can rely on a webhook or the onboarding page to trigger sync.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/onboarding`,
      }
    });
    if (error) throw error;
  }

  async function sendPhoneOtp(phoneNumber: string, containerId: string) {
    const recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, containerId, {
      size: 'invisible'
    });
    const result = await signInWithPhoneNumber(firebaseAuth, phoneNumber, recaptchaVerifier);
    setConfirmationResult(result);
  }

  async function verifyPhoneOtp(otp: string) {
    if (!confirmationResult) throw new Error("No OTP requested");
    const result = await confirmationResult.confirm(otp);
    if (result.user) {
      await syncUserWithBackend(null, result.user.uid, null, result.user.phoneNumber, null, 'firebase');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        updateUserProfile,
        signInWithGoogle,
        sendPhoneOtp,
        verifyPhoneOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
