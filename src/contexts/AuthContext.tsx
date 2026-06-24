"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendPhoneOtp: (phoneNumber: string) => Promise<void>;
  verifyPhoneOtp: (phoneNumber: string, otp: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }

  async function signup(email: string, password: string, displayName?: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName,
        }
      }
    });
    if (error) throw error;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/onboarding`,
      }
    });
    if (error) throw error;
  }

  async function sendPhoneOtp(phoneNumber: string) {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    if (error) throw error;
  }

  async function verifyPhoneOtp(phoneNumber: string, otp: string) {
    const { error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms',
    });
    if (error) throw error;
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
