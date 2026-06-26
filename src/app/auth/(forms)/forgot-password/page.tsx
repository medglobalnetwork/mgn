"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess("Check your email for the password reset link!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send reset link";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full font-sans text-[#1F2937]">
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-extrabold text-[#0B1B3D] mb-3">Reset Password</h1>
        <p className="text-[15px] text-gray-500 font-medium">Enter your email to receive a reset link</p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 mb-6 font-medium text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600 mb-6 font-medium text-center">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[13px] font-bold text-[#0B1B3D] mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-md text-[14px] focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all placeholder:text-gray-400"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <Turnstile 
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} 
              options={{ appearance: 'interaction-only' }}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken("ok")}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-[#0052CC] px-4 py-3 text-[15px] font-semibold text-white hover:bg-[#0043a4] disabled:opacity-70 transition-all shadow-sm"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* Footer Text */}
      <div className="mt-8 text-center text-[13px]">
         <Link href="/auth/login" className="text-gray-500 font-medium hover:text-[#0052CC] hover:underline flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Login
         </Link>
      </div>
    </div>
  );
}
