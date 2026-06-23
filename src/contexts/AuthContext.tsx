"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type User,
  type ConfirmationResult,
} from "@/lib/firebase";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  setupRecaptcha: (containerId: string) => void;
  sendPhoneOtp: (phoneNumber: string) => Promise<ConfirmationResult>;
  verifyPhoneOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signup(email: string, password: string, displayName?: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    
    // Save the user to Supabase using the new schema
    const { data: userData, error: userError } = await supabase.from('users').insert({
      firebase_uid: cred.user.uid,
      email: email
    }).select().single();

    if (userError) {
      console.error("Error saving user to Supabase:", userError);
    } else if (userData) {
      // Create the profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userData.id,
        display_name: displayName || null
      });
      if (profileError) {
        console.error("Error saving profile to Supabase:", profileError);
      }
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  async function updateUserProfile(displayName: string) {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      setUser({ ...auth.currentUser, displayName } as User);
    }
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  function setupRecaptcha(containerId: string) {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: "invisible",
      });
    }
  }

  async function sendPhoneOtp(phoneNumber: string) {
    if (!window.recaptchaVerifier) {
      throw new Error("Recaptcha not initialized");
    }
    return await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
  }

  async function verifyPhoneOtp(confirmationResult: ConfirmationResult, otp: string) {
    await confirmationResult.confirm(otp);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        updateUserProfile,
        signInWithGoogle,
        setupRecaptcha,
        sendPhoneOtp,
        verifyPhoneOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Add types for the window object to support RecaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
