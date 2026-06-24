"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Turnstile } from "@marsidev/react-turnstile";

export default function SignupPage() {
  const { signup, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email");
  const [turnstileToken, setTurnstileToken] = useState("");

  const passwordRules = [
    { label: "Minimum 12 Characters", test: (p: string) => p.length >= 12 },
    { label: "1 Uppercase", test: (p: string) => /[A-Z]/.test(p) },
    { label: "1 Lowercase", test: (p: string) => /[a-z]/.test(p) },
    { label: "1 Number", test: (p: string) => /[0-9]/.test(p) },
    { label: "1 Special Character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  const isPasswordValid = passwordRules.every((r) => r.test(password));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!turnstileToken) {
      setError("Please complete the security check.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!isPasswordValid) {
      setError("Password does not meet all requirements");
      return;
    }

    const namePrefixRegex = /^(dr|doctor|prof|professor|mr|mrs|ms|miss|er|ca|cs)[\.\s]+/i;
    if (namePrefixRegex.test(name.trim())) {
      setError("Please enter your real full name without any prefixes (Dr., Mr., Prof., etc.)");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name);
      router.push("/auth/verify-email");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Signup failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
      // Route to onboarding
      router.push("/auth/onboarding");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full font-sans text-[#1F2937]">
      <div className="text-center mb-6">
        <h1 className="text-[32px] font-extrabold text-[#0B1B3D] mb-3">Create Account</h1>
        <p className="text-[15px] text-gray-500 font-medium">Join the MGN healthcare network</p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 mb-6 font-medium text-center">
          {error}
        </div>
      )}

      {/* Email / Phone Toggle */}
      <div className="flex w-full mb-6 p-1 bg-gray-100/80 border border-gray-200/60 rounded-lg">
        <button 
          type="button"
          onClick={() => setSignupMethod("email")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-[14px] font-semibold rounded-md transition-all ${signupMethod === 'email' ? 'bg-white text-[#0052CC] shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/30'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Email
        </button>
        <button 
          type="button"
          onClick={() => setSignupMethod("phone")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-[14px] font-semibold rounded-md transition-all ${signupMethod === 'phone' ? 'bg-white text-[#0052CC] shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/30'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Phone
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-bold text-[#0B1B3D] mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-md text-[14px] focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all placeholder:text-gray-400"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-[#0B1B3D] mb-1.5">
            {signupMethod === "email" ? "Email Address" : "Phone Number"}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              {signupMethod === "email" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              )}
            </div>
            <input
              type={signupMethod === "email" ? "email" : "tel"}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-md text-[14px] focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all placeholder:text-gray-400"
              placeholder={signupMethod === "email" ? "Enter your email address" : "Enter your mobile number"}
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-[#0B1B3D] mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-11 pr-12 py-2.5 border border-gray-200 rounded-md text-[14px] focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all placeholder:text-gray-400"
              placeholder="Create a strong password"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
          </div>

          {/* Live Password Rules */}
          {password.length > 0 && (
            <div className="mt-3 space-y-1.5 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-bold text-gray-700 mb-2">Password Requirements:</p>
              {passwordRules.map((rule, idx) => {
                const passed = rule.test(password);
                return (
                  <div key={idx} className={`flex items-center text-xs ${passed ? "text-green-600" : "text-gray-500"}`}>
                    <svg className={`w-3.5 h-3.5 mr-2 ${passed ? "text-green-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    {rule.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <label className="block text-[13px] font-bold text-[#0B1B3D] mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-11 pr-12 py-2.5 border border-gray-200 rounded-md text-[14px] focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all placeholder:text-gray-400"
              placeholder="Repeat password"
            />
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} 
            options={{ appearance: 'interaction-only' }}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken("fallback-token-due-to-error")}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !turnstileToken}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-[#0052CC] px-4 py-3 text-[15px] font-semibold text-white hover:bg-[#0043a4] disabled:opacity-70 transition-all mt-4 shadow-sm"
        >
          {loading ? "Creating account..." : "Sign Up"}
          {!loading && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-6">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-[13px] font-medium">or continue with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-3 gap-3">
        <button 
          type="button" 
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Image src="/google.svg" alt="Google" width={18} height={18} className="w-[18px] h-[18px] opacity-0" />
          <span className="font-semibold text-[13px] text-[#0B1B3D] flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </span>
        </button>
        <button type="button" className="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          <span className="font-semibold text-[13px] text-[#0B1B3D] flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.63-.77 1.54.06 2.82.72 3.61 1.83-3.16 1.9-2.62 5.92.41 7.15-.71 1.73-1.57 3.33-2.73 3.96zM12.03 7.25c-.15-2.5 1.92-4.64 4.33-4.83.33 2.72-2.29 4.91-4.33 4.83z"/></svg>
            Apple
          </span>
        </button>
        <button type="button" className="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          <span className="font-semibold text-[13px] text-[#0B1B3D] flex items-center gap-2">
            <svg className="w-4 h-4 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </span>
        </button>
      </div>

      {/* Footer Text */}
      <div className="mt-6 text-center text-[13px]">
         <span className="text-gray-500 font-medium">Already have an account? </span>
         <Link href="/auth/login" className="text-[#0052CC] font-bold hover:underline">
            Login
         </Link>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
         <span className="text-[11px] font-medium">Your data is safe with us. We never share your information.</span>
      </div>
    </div>
  );
}
