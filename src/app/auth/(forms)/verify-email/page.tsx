"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function VerifyEmailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signup");
    } else if (user?.email_confirmed_at != null) {
      router.push("/auth/onboarding");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const handleResendLink = async () => {
    try {
      setError("");
      setMessage("");
      setIsSending(true);
      if (user?.email) {
        await supabase.auth.resend({ type: 'signup', email: user.email });
      }
      setMessage("Verification link sent! Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send link. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = () => {
    // Note: Firebase natively uses Links for email verification.
    // If a custom 6-digit OTP is required, it requires backend integration.
    // For now, we simulate OTP failure to encourage link usage or test mode bypass.
    if (process.env.NODE_ENV === "development" && otpArray.join("") === "123456") {
      router.push("/auth/onboarding");
      return;
    }
    setError("Invalid OTP. Please use the verification link sent to your email.");
  };

  const updateOtp = (index: number, value: string) => {
    const newOtp = [...otpArray];
    newOtp[index] = value.substring(value.length - 1);
    setOtpArray(newOtp);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Image src="/logo.svg" alt="MGN Logo" width={200} height={40} className="h-8 w-auto mb-6" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-blue-900/5 sm:rounded-2xl sm:px-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h2 className="text-2xl font-black text-[#0B1B3D] tracking-tight">Verify Your Email</h2>
            <p className="text-sm text-gray-500 mt-2">
              We've sent a verification link to <span className="font-bold text-gray-800">{user.email}</span>
            </p>
          </div>

          {error && <div className="rounded-md bg-red-50 p-4 mb-6 text-sm text-red-600">{error}</div>}
          {message && <div className="rounded-md bg-green-50 p-4 mb-6 text-sm text-green-600">{message}</div>}

          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3 text-center">Enter 6 Digit OTP</p>
              <div className="flex justify-center gap-2 mb-4">
                {otpArray.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => updateOtp(i, e.target.value)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                ))}
              </div>
              <button
                onClick={handleVerifyOtp}
                disabled={otpArray.join("").length !== 6}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
              >
                Verify Email
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div>
              <button
                onClick={handleResendLink}
                disabled={isSending}
                className="w-full flex justify-center py-3.5 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all"
              >
                {isSending ? "Sending..." : "Resend Verification Link"}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                Once you click the link in your email, refresh this page or{" "}
                <button onClick={() => window.location.reload()} className="text-blue-600 font-bold hover:underline">
                  click here
                </button>
                {" "}to continue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
