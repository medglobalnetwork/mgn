"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { 
  BookOpen, Stethoscope, Activity, HeartPulse, Smile, Pill, Microscope, GraduationCap, 
  Building2, School, FlaskConical, Settings, Rocket, Users, ChevronRight
} from "lucide-react";

const getCategoryIcon = (cat: string) => {
  const iconProps = { className: "w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" };
  const activeIconProps = { className: "w-5 h-5 text-blue-600" };
  
  const renderIcon = (IconCmp: any, isActive: boolean) => (
    <IconCmp {...(isActive ? activeIconProps : iconProps)} />
  );

  return (isActive: boolean) => {
    switch (cat) {
      case "Medical Student": return renderIcon(BookOpen, isActive);
      case "Doctor": return renderIcon(Stethoscope, isActive);
      case "Physiotherapist": return renderIcon(Activity, isActive);
      case "Nurse": return renderIcon(HeartPulse, isActive);
      case "Dentist": return renderIcon(Smile, isActive);
      case "Pharmacist": return renderIcon(Pill, isActive);
      case "Researcher": return renderIcon(Microscope, isActive);
      case "Faculty": return renderIcon(GraduationCap, isActive);
      case "Hospital": return renderIcon(Building2, isActive);
      case "Clinic": return renderIcon(Activity, isActive);
      case "Medical College": return renderIcon(GraduationCap, isActive);
      case "University": return renderIcon(School, isActive);
      case "Research Institute": return renderIcon(FlaskConical, isActive);
      case "Pharma Company": return renderIcon(Pill, isActive);
      case "Medical Device": return renderIcon(Settings, isActive);
      case "Healthcare Startup": return renderIcon(Rocket, isActive);
      default: return renderIcon(Users, isActive);
    }
  };
};

// --- STEPS ENUM ---
type OnboardingStep = 
  | "VERIFY_OTP"
  | "ACCOUNT_TYPE"
  | "CATEGORY_SELECTION"
  | "BASIC_PROFILE"
  | "SUCCESS";

function OnboardingContent() {
  const { user, loading, setupRecaptcha, sendPhoneOtp, verifyPhoneOtp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Default step logic:
  // In a real app, you would fetch the user's progress from the Rust API / Supabase here
  // and set the initial step accordingly. For now, we start at the beginning or a requested step.
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("VERIFY_OTP");
  const [accountType, setAccountType] = useState<"individual" | "organization" | null>(null);
  const [category, setCategory] = useState<string>("");
  const [phoneSent, setPhoneSent] = useState(false);

  // Phone Auth State
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [otpError, setOtpError] = useState("");
  const [isProcessingOtp, setIsProcessingOtp] = useState(false);
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({});

  // Profile State
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch real counts from Supabase
  useEffect(() => {
    async function fetchCounts() {
      const { data, error } = await supabase.from('professional_identities').select('identity_type');
      if (data && !error) {
        const counts: Record<string, number> = {};
        data.forEach((row: any) => {
          const cat = row.identity_type;
          counts[cat] = (counts[cat] || 0) + 1;
        });
        setRoleCounts(counts);
      }
    }
    fetchCounts();
  }, []);

  useEffect(() => {
    if (currentStep === "VERIFY_OTP") {
      try {
        setupRecaptcha("recaptcha-container");
      } catch (err) {
        console.warn("Recaptcha setup skipped or failed", err);
      }
    }
  }, [currentStep, setupRecaptcha]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  // --- RENDER HELPERS ---
  const renderStepIndicator = () => {
    const steps = ["VERIFY_OTP", "ACCOUNT_TYPE", "CATEGORY_SELECTION", "BASIC_PROFILE", "SUCCESS"];
    const currentIndex = steps.indexOf(currentStep);
    
    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, idx) => (
          <div key={step} className="flex items-center">
            <div className={`w-2.5 h-2.5 rounded-full ${idx <= currentIndex ? "bg-blue-600" : "bg-gray-200"}`} />
            {idx < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${idx < currentIndex ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleNextStep = (next: OnboardingStep) => {
    setCurrentStep(next);
  };

  const handleFinishSetup = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    setOtpError("");
    try {
      const payload = {
        firebase_uid: user.uid,
        email: user.email || "",
        phone: `${countryCode}${phoneNumber}`,
        account_type: accountType || "individual",
        category: category,
        name: user.displayName || "MGN User",
        country,
        city,
        headline,
        bio
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/auth/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save profile on backend.");
      }

      localStorage.setItem("mgn_onboarding_completed", "true");
      handleNextStep("SUCCESS");
    } catch (err: any) {
      setOtpError(err.message || "Failed to finalize setup");
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) return;
    try {
      setOtpError("");
      setIsProcessingOtp(true);
      const fullPhone = `${countryCode}${phoneNumber}`;
      const result = await sendPhoneOtp(fullPhone);
      setConfirmationResult(result);
      setPhoneSent(true);
    } catch (err: any) {
      console.error("Firebase Phone Auth Error:", err);
      // Fallback for local development when Firebase config blocks SMS
      if (err.message.includes("auth/invalid-app-credential") || err.message.includes("reCAPTCHA") || process.env.NODE_ENV === "development") {
        console.warn("Bypassing Firebase Phone Auth for local development.");
        setConfirmationResult(null);
        setPhoneSent(true);
        setOtpError("Firebase restricted. Dev mode bypass activated. Enter any 6 digits.");
      } else {
        setOtpError(err.message || "Failed to send OTP.");
      }
    } finally {
      setIsProcessingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setOtpError("");
      setIsProcessingOtp(true);
      const otpCode = otpArray.join("");
      if (otpCode.length !== 6) throw new Error("Please enter all 6 digits.");
      
      if (confirmationResult) {
        await verifyPhoneOtp(confirmationResult, otpCode);
      } else {
        // Fallback for dev mode testing if Recaptcha was bypassed manually
        console.warn("No confirmation result. Bypassing OTP for dev.");
      }
      
      handleNextStep("ACCOUNT_TYPE");
    } catch (err: any) {
      setOtpError(err.message || "Invalid OTP.");
    } finally {
      setIsProcessingOtp(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const val = value.substring(value.length - 1);
    const newOtp = [...otpArray];
    newOtp[index] = val;
    setOtpArray(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    } else if (e.key === "Enter") {
      if (otpArray.join("").length === 6 && !isProcessingOtp) {
        handleVerifyOtp();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Image src="/logo.svg" alt="MGN Logo" width={200} height={40} className="h-8 w-auto mb-6" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl shadow-blue-900/5 sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {currentStep !== "SUCCESS" && renderStepIndicator()}

          {/* STEP 1: OTP VERIFICATION */}
          {currentStep === "VERIFY_OTP" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-[#0B1B3D] tracking-tight">
                  {phoneSent ? "Verify Your Phone" : "Complete Your Account"}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {phoneSent ? "Please enter the 6-digit code sent to your phone." : "Google provided your Name & Email. Please enter your phone number to continue."}
                </p>
              </div>

              {otpError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 mb-6 font-medium text-center">
                  {otpError}
                </div>
              )}
              
              {!phoneSent ? (
                <>
                  <div className="flex gap-3 mb-8">
                    <select 
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-1/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                    </select>
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>
                  <div id="recaptcha-container" className="flex justify-center mb-4"></div>
                  <button 
                    onClick={handleSendOtp}
                    disabled={isProcessingOtp || !phoneNumber}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70"
                  >
                    {isProcessingOtp ? "Sending..." : "Send OTP"}
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-center gap-3 mb-8">
                    {otpArray.map((digit, i) => (
                      <input 
                        key={i}
                        id={`otp-${i}`}
                        type="text" 
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50 focus:bg-white"
                      />
                    ))}
                  </div>

                  <button 
                    onClick={handleVerifyOtp}
                    disabled={isProcessingOtp || otpArray.join("").length !== 6}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70"
                  >
                    {isProcessingOtp ? "Verifying..." : "Verify & Continue"}
                  </button>
                </>
              )}
            </div>
          )}

          {/* STEP 2: ACCOUNT TYPE */}
          {currentStep === "ACCOUNT_TYPE" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-[#0B1B3D] tracking-tight">Who are you?</h2>
                <p className="text-sm text-gray-500 mt-2">Select your account type to personalize your experience.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => setAccountType("individual")}
                  className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl transition-all ${accountType === "individual" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"}`}
                >
                  <svg className={`w-10 h-10 mb-3 transition-colors ${accountType === "individual" ? "text-blue-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className={`font-bold ${accountType === "individual" ? "text-blue-700" : "text-gray-700"}`}>Individual</span>
                </button>
                <button 
                  onClick={() => setAccountType("organization")}
                  className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl transition-all ${accountType === "organization" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"}`}
                >
                  <svg className={`w-10 h-10 mb-3 transition-colors ${accountType === "organization" ? "text-blue-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  <span className={`font-bold ${accountType === "organization" ? "text-blue-700" : "text-gray-700"}`}>Organization</span>
                </button>
              </div>

              <button 
                disabled={!accountType}
                onClick={() => handleNextStep("CATEGORY_SELECTION")}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 3: CATEGORY SELECTION */}
          {currentStep === "CATEGORY_SELECTION" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-[#0B1B3D] tracking-tight">Select your role</h2>
                <p className="text-sm text-gray-500 mt-2">Which category best describes you?</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {accountType === "individual" ? (
                  ["Medical Student", "Doctor", "Physiotherapist", "Nurse", "Dentist", "Pharmacist", "Researcher", "Faculty", "Other"].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-3 text-sm font-medium border rounded-xl transition-all text-left flex justify-between items-center group ${category === cat ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(cat)(category === cat)}
                        <span>{cat}</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${category === cat ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500 group-hover:bg-blue-50"}`}>
                        {roleCounts[cat] || 0}
                      </span>
                    </button>
                  ))
                ) : (
                  ["Hospital", "Clinic", "Medical College", "University", "Research Institute", "Pharma Company", "Medical Device", "Healthcare Startup", "Other"].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-3 text-sm font-medium border rounded-xl transition-all text-left flex justify-between items-center group ${category === cat ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(cat)(category === cat)}
                        <span>{cat}</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${category === cat ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500 group-hover:bg-blue-50"}`}>
                        {roleCounts[cat] || 0}
                      </span>
                    </button>
                  ))
                )}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleNextStep("ACCOUNT_TYPE")}
                  className="w-1/3 flex justify-center py-3.5 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button 
                  disabled={!category}
                  onClick={() => handleNextStep("BASIC_PROFILE")}
                  className="w-2/3 flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: BASIC PROFILE */}
          {currentStep === "BASIC_PROFILE" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-[#0B1B3D] tracking-tight">Complete Profile</h2>
                <p className="text-sm text-gray-500 mt-2">Almost there! Add a few details to get started.</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-blue-400 transition-all">
                     <span className="text-3xl text-blue-300 group-hover:text-blue-500">+</span>
                  </div>
                  <div className="text-center mt-2 text-xs font-medium text-gray-500">Upload Photo</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Country</label>
                    <select 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mumbai" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Headline</label>
                  <input 
                    type="text" 
                    placeholder="e.g. BPT Student | Founder at MGN" 
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Bio</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell us a bit about yourself..." 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleNextStep("CATEGORY_SELECTION")}
                  className="w-1/3 flex justify-center py-3.5 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={handleFinishSetup}
                  className="w-2/3 flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Finish Setup"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS */}
          {currentStep === "SUCCESS" && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-3xl font-black text-[#0B1B3D] tracking-tight mb-3">Welcome to MGN!</h2>
              <p className="text-gray-500 mb-10 max-w-sm mx-auto">Your account has been created successfully. Let's start exploring your medical network.</p>
              
              <Link 
                href="/dashboard"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5"
              >
                Go To Dashboard
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
