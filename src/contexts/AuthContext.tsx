"use client";

import { createContext, useContext, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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
      if (!token) {
        setLoading(false);
        setSessionResolved(true);
        return;
      }
      
      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          // Assuming the backend returns something similar to AppUser
          setUser({
            id: data.id,
            email: data.email,
            phone: data.phone,
            user_metadata: {
              full_name: data.full_name || data.first_name,
              avatar_url: data.avatar_url,
              provider: "email"
            }
          });
          setSession({ access_token: token });
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
        setSessionResolved(true);
      }
    };
    
    initAuth();
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login/email`, {
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
    
    setUser({
      id: data.user?.id || "",
      email: data.user?.email || email,
      user_metadata: {
        full_name: data.user?.full_name,
        provider: "email"
      }
    });
    setSession({ access_token: data.access_token });
  }

  async function signup(email: string, password: string, displayName?: string) {
    const res = await fetch(`${API_URL}/signup/email`, {
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
    
    setUser({
      id: data.user?.id || "",
      email: data.user?.email || email,
      user_metadata: {
        full_name: data.user?.full_name || displayName,
        provider: "email"
      }
    });
    setSession({ access_token: data.access_token });
  }

  async function logout() {
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }).catch(console.error);
    }
    
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setSession(null);
  }

  async function resetPassword(email: string) {
    const res = await fetch(`${API_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error("Reset password failed");
  }

  async function updateUserProfile(displayName: string) {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${API_URL}/basic`, {
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
    // Requires backend integration or frontend OAuth flow that passes token to backend
    throw new Error("Not implemented with backend API yet");
  }

  async function sendPhoneOtp(phoneNumber: string) {
    const res = await fetch(`${API_URL}/login/phone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber })
    });
    if (!res.ok) throw new Error("Send OTP failed");
  }

  async function verifyPhoneOtp(otp: string, phone: string) {
    const res = await fetch(`${API_URL}/verify-otp`, {
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
    
    setUser({
      id: data.user?.id || "",
      phone,
      user_metadata: { provider: "phone" }
    });
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
