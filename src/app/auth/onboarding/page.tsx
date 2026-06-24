"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  User, Building, Activity, GraduationCap, Users, Heart, Pill, 
  Stethoscope, Shield, MapPin, Briefcase, Camera, CheckCircle, ArrowRight 
} from "lucide-react";

type OnboardingStep = 
  | "WELCOME"
  | "ACCOUNT_TYPE"
  | "PRIMARY_CATEGORY"
  | "SUB_CATEGORY" // specific details like MBBS/Specialization
  | "ORG_TYPE"
  | "BASIC_PROFILE"
  | "SUCCESS";

function OnboardingContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<OnboardingStep>("WELCOME");
  
  // Data State
  const [accountType, setAccountType] = useState<"individual" | "organization" | "">("");
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [qualification, setQualification] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [orgType, setOrgType] = useState("");
  
  // Profile State
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [headline, setHeadline] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else if (user) {
      if (!name) setName(user.user_metadata?.full_name || "");
      
      const checkStatus = async () => {
        const { data } = await supabase.from('profiles').select('onboarding_score').eq('id', user.id).maybeSingle();
        if (data && data.onboarding_score > 0) {
          router.push("/dashboard");
        }
      };
      checkStatus();
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  const handleNext = (next: OnboardingStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(next);
  };

  const handleFinishSetup = async () => {
    setIsSubmitting(true);
    try {
      const interestsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
      
      // Compute score
      let score = 30; // base
      if (bio.length > 0) score += 10;
      if (skills.length > 0) score += 10;
      if (company.length > 0) score += 20;

      let finalPrimaryCategory = primaryCategory;
      let finalSubCategory = subCategory;

      if (accountType === "organization") {
        finalPrimaryCategory = "Organization";
        finalSubCategory = orgType;
      } else if (primaryCategory === "Clinical Practitioner") {
        finalSubCategory = `${qualification} - ${subCategory}`;
      }

      const payload = {
        id: user.id,
        account_type: accountType,
        primary_category: finalPrimaryCategory,
        sub_category: finalSubCategory,
        name: name,
        country: "India",
        city: city,
        headline: headline,
        bio: bio,
        interests: interestsArray,
        secondary_roles: [],
        profile_score: score,
        badge_color: "gray" // unverified initially
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/auth/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save profile");
      
      handleNext("SUCCESS");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans bg-[url('/grid-pattern-light.svg')] bg-repeat">
      <div className="max-w-3xl w-full mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-12">
            
            {currentStep === "WELCOME" && (
              <div className="text-center animate-in fade-in">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <Activity className="w-10 h-10 text-[#0052CC]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1B3D] mb-4">Welcome to MGN</h2>
                <p className="text-lg text-gray-500 mb-10">India's Ultimate Healthcare Professional Platform</p>
                <button onClick={() => handleNext("ACCOUNT_TYPE")} className="bg-[#0052CC] text-white px-8 py-4 rounded-xl font-bold text-lg w-full max-w-md hover:bg-[#0043a4] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 mx-auto">
                  Setup Your Profile <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {currentStep === "ACCOUNT_TYPE" && (
              <div className="animate-in fade-in slide-in-from-right-8">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">Join As</h2>
                <p className="text-gray-500 mb-8">Select your account type to personalize your experience.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button onClick={() => { setAccountType("individual"); handleNext("PRIMARY_CATEGORY"); }} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-[#0052CC] hover:bg-blue-50 text-left transition-all">
                    <User className="w-8 h-8 text-[#0052CC] mb-4" />
                    <h3 className="text-xl font-bold text-[#0B1B3D] mb-1">Individual</h3>
                    <p className="text-sm text-gray-500">Professionals, Students, Employees</p>
                  </button>
                  <button onClick={() => { setAccountType("organization"); handleNext("ORG_TYPE"); }} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-[#0052CC] hover:bg-blue-50 text-left transition-all">
                    <Building className="w-8 h-8 text-[#0052CC] mb-4" />
                    <h3 className="text-xl font-bold text-[#0B1B3D] mb-1">Organization</h3>
                    <p className="text-sm text-gray-500">Hospitals, Colleges, Companies</p>
                  </button>
                </div>
              </div>
            )}

            {currentStep === "PRIMARY_CATEGORY" && (
              <div className="animate-in fade-in slide-in-from-right-8">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">Choose Primary Category</h2>
                <p className="text-gray-500 mb-8">What best describes your role in healthcare?</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: "Clinical Practitioner", icon: Stethoscope },
                    { id: "Allied Health Professional", icon: Activity },
                    { id: "Nursing Professional", icon: Heart },
                    { id: "Medical Student", icon: GraduationCap },
                    { id: "Administration & Operations", icon: Users },
                    { id: "Pharma & Industry Professional", icon: Pill }
                  ].map(cat => (
                    <button key={cat.id} onClick={() => { setPrimaryCategory(cat.id); handleNext("SUB_CATEGORY"); }} className="p-5 rounded-xl border-2 border-gray-100 hover:border-[#0052CC] hover:bg-blue-50 flex items-center gap-4 text-left transition-all">
                      <cat.icon className="w-6 h-6 text-[#0052CC] shrink-0" />
                      <span className="font-bold text-[#0B1B3D]">{cat.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "SUB_CATEGORY" && (
              <div className="animate-in fade-in slide-in-from-right-8">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">{primaryCategory} Details</h2>
                <p className="text-gray-500 mb-8">Please provide your professional specialization.</p>
                
                {primaryCategory === "Clinical Practitioner" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Qualification</label>
                      <select value={qualification} onChange={(e) => setQualification(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0052CC]">
                        <option value="">Select Qualification</option>
                        {["MBBS", "BDS", "BAMS", "BHMS", "BUMS", "MD", "MS", "DM", "MCh"].map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                      <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0052CC]">
                        <option value="">Select Specialization</option>
                        {["Cardiology", "Neurology", "Orthopedics", "Dermatology", "Psychiatry", "Pediatrics", "General Practice", "Other"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {primaryCategory === "Allied Health Professional" && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Profession</label>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0052CC]">
                      <option value="">Select Profession</option>
                      {["Physiotherapist", "Occupational Therapist", "Speech Therapist", "Lab Technician", "Nutritionist", "Other"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}

                {primaryCategory === "Nursing Professional" && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Role / Degree</label>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0052CC]">
                      <option value="">Select Role</option>
                      {["Staff Nurse", "ICU Nurse", "Nursing Officer", "BSc Nursing", "Other"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}

                {primaryCategory === "Medical Student" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Program</label>
                      <select value={qualification} onChange={(e) => setQualification(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0052CC]">
                        <option value="">Select Program</option>
                        {["MBBS", "BDS", "BPT", "Nursing", "Pharmacy", "Allied Health"].map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Academic Stage</label>
                      <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0052CC]">
                        <option value="">Select Stage</option>
                        {["1st Year", "2nd Year", "3rd Year", "Final Year", "Intern", "PG Resident"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {(primaryCategory === "Administration & Operations" || primaryCategory === "Pharma & Industry Professional") && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                    <input type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0052CC]" placeholder="e.g. Hospital Administrator, Medical Rep" />
                  </div>
                )}

                <button 
                  onClick={() => handleNext("BASIC_PROFILE")}
                  disabled={!subCategory || (primaryCategory === "Clinical Practitioner" && !qualification) || (primaryCategory === "Medical Student" && !qualification)}
                  className="w-full mt-8 bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {currentStep === "ORG_TYPE" && (
              <div className="animate-in fade-in slide-in-from-right-8">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">Organization Type</h2>
                <p className="text-gray-500 mb-8">What type of organization do you represent?</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {["Providers", "Diagnostics", "Education", "Industry", "NGO / Startup"].map(type => (
                    <button key={type} onClick={() => setOrgType(type)} className={`p-5 rounded-xl border-2 text-left font-bold ${orgType === type ? 'border-[#0052CC] bg-blue-50 text-[#0052CC]' : 'border-gray-100 text-[#0B1B3D] hover:bg-gray-50'}`}>
                      {type}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => handleNext("BASIC_PROFILE")}
                  disabled={!orgType}
                  className="w-full bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {currentStep === "BASIC_PROFILE" && (
              <div className="animate-in fade-in slide-in-from-right-8">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">Basic Profile</h2>
                <p className="text-gray-500 mb-8">Add details to help others find you. You can update these later.</p>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                      <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Mumbai" />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">State</label>
                      <input type="text" value={state} onChange={e => setState(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Maharashtra" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Professional Headline</label>
                    <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="e.g. Orthopedic Surgeon at Apollo" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Current Organization (Optional)</label>
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Hospital or College Name" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Skills (Comma separated, max 10)</label>
                    <input type="text" value={skills} onChange={e => setSkills(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Orthopedics, Critical Care, Research..." />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Bio (Max 250 chars)</label>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={250} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none h-24 resize-none" placeholder="A short description about yourself..."></textarea>
                  </div>

                  <button 
                    onClick={handleFinishSetup}
                    disabled={!city || !state || !headline || isSubmitting}
                    className="w-full mt-8 bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Creating Profile..." : "Go To Dashboard"}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {currentStep === "SUCCESS" && (
              <div className="text-center py-8 animate-in zoom-in-95">
                <CheckCircle className="w-20 h-20 text-[#00A67E] mx-auto mb-6" />
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-4">Profile Ready!</h2>
                <p className="text-gray-600 mb-8">You have instant access to the dashboard. You can complete your verification later to unlock advanced features.</p>
                <button onClick={() => router.push("/dashboard")} className="w-full bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-md">
                  Enter Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0052CC]"></div></div>}>
      <OnboardingContent />
    </Suspense>
  );
}
