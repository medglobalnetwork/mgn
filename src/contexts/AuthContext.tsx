"use client";

import { createContext, useContext, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const AUTH_URL = `${API_URL}/v1/auth`;

export type AppUser = {
  id: string;
  email?: string;
  phone?: string;
  email_confirmed_at?: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    provider?: string;
    headline?: string;
    primary_category?: string;
  };
};

type AuthContextType = {
  user: AppUser | null;
  session: any | null;
  loading: boolean;
  sessionResolved: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendPhoneOtp: (phoneNumber: string) => Promise<void>;
  verifyPhoneOtp: (otp: string, phone: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionResolved, setSessionResolved] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      const savedUser = localStorage.getItem("user_data");
      
      if (!token || !savedUser) {
        setLoading(false);
        setSessionResolved(true);
        return;
      }

      // Decode JWT to check expiry
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < now) {
          // Token expired — clear everything
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_data");
          setLoading(false);
          setSessionResolved(true);
          return;
        }

        // Token valid — restore user from localStorage
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setSession({ access_token: token });
      } catch (err) {
        console.error("Failed to restore session:", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
      } finally {
        setLoading(false);
        setSessionResolved(true);
      }
    };
    
    initAuth();
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${AUTH_URL}/login/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Login failed");
    }
    
    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
    }
    
    const userData: AppUser = {
      id: data.user?.id || "",
      email: data.user?.email || email,
      user_metadata: {
        full_name: data.user?.full_name,
        provider: "email"
      }
    };
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    setSession({ access_token: data.access_token });
  }

  async function signup(email: string, password: string, displayName?: string) {
    const res = await fetch(`${AUTH_URL}/signup/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, full_name: displayName || "" })
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Signup failed");
    }
    
    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
    }
    
    const userData: AppUser = {
      id: data.user?.id || "",
      email: data.user?.email || email,
      user_metadata: {
        full_name: data.user?.full_name || displayName,
        provider: "email"
      }
    };
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    setSession({ access_token: data.access_token });
  }

  async function logout() {
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${AUTH_URL}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }).catch(console.error);
    }
    
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    setUser(null);
    setSession(null);
  }

  async function resetPassword(email: string) {
    const res = await fetch(`${AUTH_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error("Reset password failed");
  }

  async function updateUserProfile(displayName: string) {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${API_URL}/v1/profile/basic`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ preferred_name: displayName })
    });
    
    if (!res.ok) throw new Error("Update profile failed");
    if (user) {
      setUser({ ...user, user_metadata: { ...user.user_metadata, full_name: displayName } });
    }
  }

  async function signInWithGoogle() {
    // Import Firebase auth utilities (client-side only)
    const { auth, GoogleAuthProvider, signInWithPopup } = await import("@/lib/firebase");

    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    // Open Google popup for sign-in
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Get the Google ID token (JWT) from Firebase
    const idToken = await firebaseUser.getIdToken();

    // Send ID token to our Rust backend which will:
    // 1. Decode the Google JWT to extract email, name, sub
    // 2. Create profile if user is new, or find existing profile
    // 3. Create a session + issue our own JWT tokens
    const res = await fetch(`${AUTH_URL}/login/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Google login failed");
    }

    const data = await res.json();

    // Store tokens
    localStorage.setItem("access_token", data.access_token);
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
    }

    // Set user from backend response
    const userData: AppUser = {
      id: data.user?.id || firebaseUser.uid,
      email: data.user?.email || firebaseUser.email || undefined,
      phone: data.user?.phone || firebaseUser.phoneNumber || undefined,
      user_metadata: {
        full_name: data.user?.full_name || firebaseUser.displayName || "",
        avatar_url: data.user?.avatar_url || firebaseUser.photoURL || "",
        provider: "google",
      },
    };
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    setSession({ access_token: data.access_token });
  }

  async function sendPhoneOtp(phoneNumber: string) {
    const res = await fetch(`${AUTH_URL}/login/phone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber })
    });
    if (!res.ok) throw new Error("Send OTP failed");
  }

  async function verifyPhoneOtp(otp: string, phone: string) {
    const res = await fetch(`${AUTH_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp })
    });
    
    if (!res.ok) throw new Error("Verify OTP failed");
    
    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
    }
    
    const userData: AppUser = {
      id: data.user?.id || "",
      phone,
      user_metadata: { provider: "phone" }
    };
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    setSession({ access_token: data.access_token });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        sessionResolved,
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
