"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import {
  User, CheckCircle, Briefcase, GraduationCap, Building, Star, Award, Gift, ArrowRight, Activity, Cpu, Heart, CheckSquare, Settings, Users
} from "lucide-react";

type OnboardingStep = 
  | "WELCOME"
  | "ACCOUNT_TYPE"
  | "PERSONAL_PROFILE"
  | "PROFESSIONAL_INFO"
  | "INTERESTS"
  | "FOUNDING_MEMBER"
  | "PROFILE_STRENGTH"
  | "SUCCESS";

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("WELCOME");
  
  // Data State
  const [accountType, setAccountType] = useState<string>("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("");
  const [headline, setHeadline] = useState("");
  
  // Professional Details
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  
  // Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // System State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedReferral, setGeneratedReferral] = useState("");
  const [referralCodeInput, setReferralCodeInput] = useState("");

  const INTEREST_OPTIONS = [
    "Jobs", "Networking", "Learning", "Research", "Marketplace", "Events", "Mentorship", "Clinical Discussions", "Volunteering"
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else if (user && !name) {
      setName(user.displayName || "");
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  const handleNext = (next: OnboardingStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(next);
  };

  const calculateProfileStrength = () => {
    let score = 0;
    if (accountType) score += 20;
    if (name && country && city) score += 30;
    if (college || company || specialization) score += 30;
    if (selectedInterests.length > 0) score += 20;
    return score;
  };

  const handleFinishSetup = async () => {
    setIsSubmitting(true);
    try {
      // Create Payload matching API
      let education = null;
      let experience = null;
      
      if (accountType === "student") {
        education = { college, course, year, skills };
      } else {
        experience = { company, designation, specialization, skills };
      }

      const payload = {
        firebase_uid: user.uid,
        email: user.email || "",
        phone: user.phoneNumber || "",
        account_type: accountType === "organization" ? "organization" : "individual",
        category: accountType,
        name: name || user.displayName || "MGN User",
        country,
        city,
        headline,
        bio: "",
        interests: selectedInterests,
        education,
        experience,
        referred_by: referralCodeInput
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/auth/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      // Generate a mock referral code for the UI
      const namePart = (name || "MGN").split(" ")[0].toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
      const uidPart = user.uid.substring(0, 4).toUpperCase();
      setGeneratedReferral(`${namePart}${uidPart}`);
      
      handleNext("SUCCESS");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const getStepProgress = () => {
    const steps = ["WELCOME", "ACCOUNT_TYPE", "PERSONAL_PROFILE", "PROFESSIONAL_INFO", "INTERESTS", "FOUNDING_MEMBER", "PROFILE_STRENGTH", "SUCCESS"];
    const index = steps.indexOf(currentStep);
    return Math.max(0, (index / (steps.length - 1)) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#0B1B3D] text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('/grid-pattern.svg')] bg-repeat z-0"></div>
        <div className="p-12 relative z-10 flex-grow flex flex-col justify-center">
          <Link href="/">
            <img src="/logo-white.svg" alt="MGN Logo" className="h-10 mb-16" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <h1 className="text-3xl font-black mb-1 leading-tight text-white" style={{ display: 'none' }} id="fallback-logo">MGN</h1>
          </Link>
          
          <h1 className="text-4xl xl:text-5xl font-black mb-6 leading-tight">
            Join India's Largest Healthcare Network
          </h1>
          <p className="text-blue-200 text-lg mb-12">
            Connect with professionals, discover opportunities, and shape the future of healthcare.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="bg-[#0052CC] p-3 rounded-lg"><Users className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-2xl font-bold">10,000+</h3>
                <p className="text-blue-200 text-sm">Healthcare Professionals</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="bg-[#00A67E] p-3 rounded-lg"><Briefcase className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-2xl font-bold">2,000+</h3>
                <p className="text-blue-200 text-sm">Job Opportunities</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="bg-yellow-500 p-3 rounded-lg"><GraduationCap className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-blue-200 text-sm">Learning Resources</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 text-xs text-blue-300 relative z-10 opacity-70">
          © 2026 Med Global Network. 100% Verified Community.
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="w-full lg:w-7/12 flex flex-col min-h-screen relative">
        {/* Progress Bar */}
        {currentStep !== "WELCOME" && currentStep !== "SUCCESS" && (
          <div className="w-full bg-gray-200 h-1.5 absolute top-0 left-0 z-50">
            <div 
              className="bg-[#0052CC] h-full transition-all duration-500 ease-out"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
        )}

        <div className="flex-grow flex flex-col justify-center px-6 py-12 sm:px-12 xl:px-24">
          <div className="max-w-xl w-full mx-auto">

            {/* STEP 1: WELCOME */}
            {currentStep === "WELCOME" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-4">Welcome to MGN</h2>
                <p className="text-lg text-gray-600 mb-8">India's Healthcare Professional Network</p>
                
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="w-5 h-5 text-[#00A67E]" /> Build your professional network</div>
                  <div className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="w-5 h-5 text-[#00A67E]" /> Discover exclusive jobs</div>
                  <div className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="w-5 h-5 text-[#00A67E]" /> Access learning hubs</div>
                  <div className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle className="w-5 h-5 text-[#00A67E]" /> Buy & sell in the marketplace</div>
                </div>

                <button 
                  onClick={() => handleNext("ACCOUNT_TYPE")}
                  className="w-full bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Let's Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* STEP 2: ROLE SELECTION */}
            {currentStep === "ACCOUNT_TYPE" && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">How do you identify?</h2>
                <p className="text-gray-500 mb-8">Select your primary role on the platform.</p>

                <div className="space-y-4">
                  {[
                    { id: "professional", icon: Activity, title: "Healthcare Professional", desc: "Doctors, Nurses, Paramedics, etc." },
                    { id: "student", icon: GraduationCap, title: "Student", desc: "Medical, Nursing, Pharmacy students" },
                    { id: "organization", icon: Building, title: "Organization", desc: "Hospitals, Clinics, Institutions" },
                    { id: "recruiter", icon: Users, title: "Recruiter", desc: "Hiring for healthcare roles" },
                    { id: "business", icon: Briefcase, title: "Business", desc: "Healthcare products & services" }
                  ].map(role => (
                    <button
                      key={role.id}
                      onClick={() => { setAccountType(role.id); handleNext("PERSONAL_PROFILE"); }}
                      className="w-full flex items-center p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-[#0052CC] hover:bg-blue-50 transition-all group text-left shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0052CC] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <role.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0B1B3D] text-lg">{role.title}</h3>
                        <p className="text-sm text-gray-500">{role.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: PERSONAL PROFILE */}
            {currentStep === "PERSONAL_PROFILE" && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">Personal Profile</h2>
                <p className="text-gray-500 mb-8">Tell us a bit about yourself.</p>

                <div className="space-y-5">
                  <div className="flex justify-center mb-6">
                     <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 overflow-hidden relative cursor-pointer hover:bg-gray-50 transition-colors">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-3xl">+</span>
                            <span className="text-[10px] font-medium">Photo</span>
                          </div>
                        )}
                     </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Dr. Sarah Smith" />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Country</label>
                      <input type="text" value={country} onChange={e => setCountry(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                      <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Mumbai" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Professional Headline</label>
                    <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="e.g. Cardiologist at AIIMS | BPT Student" />
                  </div>

                  <button 
                    onClick={() => handleNext("PROFESSIONAL_INFO")}
                    disabled={!name || !city || !headline}
                    className="w-full mt-8 bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PROFESSIONAL INFO */}
            {currentStep === "PROFESSIONAL_INFO" && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">Professional Details</h2>
                <p className="text-gray-500 mb-8">Customize your experience based on your background.</p>

                {accountType === "student" ? (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">College / University</label>
                      <input type="text" value={college} onChange={e => setCollege(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Medical College Name" />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2/3">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Course</label>
                        <input type="text" value={course} onChange={e => setCourse(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="MBBS, BDS, etc." />
                      </div>
                      <div className="w-1/3">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Year</label>
                        <input type="text" value={year} onChange={e => setYear(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="e.g. 2024" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Key Skills / Interests</label>
                      <input type="text" value={skills} onChange={e => setSkills(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Anatomy, Research..." />
                    </div>
                  </div>
                ) : accountType === "recruiter" || accountType === "business" ? (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Company / Organization</label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Hospital or Company Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Designation</label>
                      <input type="text" value={designation} onChange={e => setDesignation(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="HR Manager, CEO..." />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Specialization</label>
                      <input type="text" value={specialization} onChange={e => setSpecialization(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="e.g. Neurology, Pediatrics" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Current Organization</label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="Hospital or Clinic Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Years of Experience</label>
                      <input type="text" value={experience} onChange={e => setExperience(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="e.g. 5 Years" />
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => handleNext("INTERESTS")}
                  className="w-full mt-8 bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 5: INTERESTS */}
            {currentStep === "INTERESTS" && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">What are your goals?</h2>
                <p className="text-gray-500 mb-8">Select interests to personalize your feed and recommendations.</p>

                <div className="flex flex-wrap gap-3">
                  {INTEREST_OPTIONS.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-5 py-3 rounded-full border-2 font-semibold text-sm transition-all ${
                        selectedInterests.includes(interest) 
                          ? "bg-blue-50 border-[#0052CC] text-[#0052CC]" 
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {selectedInterests.includes(interest) && "✓ "}{interest}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handleNext("FOUNDING_MEMBER")}
                  disabled={selectedInterests.length === 0}
                  className="w-full mt-10 bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 6: FOUNDING MEMBER & REFERRAL */}
            {currentStep === "FOUNDING_MEMBER" && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="bg-gradient-to-br from-[#0B1B3D] to-[#0052CC] rounded-3xl p-8 text-white mb-8 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4">EARLY ACCESS</div>
                    <h2 className="text-3xl font-black mb-2">You're a Founding Member 🎉</h2>
                    <p className="text-blue-100 text-sm mb-6">You are among the first healthcare professionals joining MGN.</p>
                    
                    <ul className="space-y-2 mb-6 text-sm font-medium">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00A67E]" /> Founding Member Badge</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00A67E]" /> 90 Days Premium Access</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00A67E]" /> Priority Verification</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Did someone invite you? (Optional)</label>
                  <input 
                    type="text" 
                    value={referralCodeInput} 
                    onChange={e => setReferralCodeInput(e.target.value.toUpperCase())} 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none uppercase" 
                    placeholder="ENTER REFERRAL CODE" 
                  />
                </div>

                <button 
                  onClick={() => handleNext("PROFILE_STRENGTH")}
                  className="w-full bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 7: PROFILE STRENGTH */}
            {currentStep === "PROFILE_STRENGTH" && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-2">Profile Strength</h2>
                <p className="text-gray-500 mb-8">A complete profile attracts more opportunities.</p>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-black text-2xl text-[#0B1B3D]">{calculateProfileStrength()}%</span>
                    <span className="text-sm font-bold text-[#00A67E] bg-green-50 px-3 py-1 rounded-full">Intermediate</span>
                  </div>
                  
                  <div className="w-full bg-gray-100 h-2.5 rounded-full mb-8 overflow-hidden">
                    <div className="bg-[#00A67E] h-full" style={{ width: `${calculateProfileStrength()}%` }}></div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-800"><CheckSquare className="w-5 h-5 text-[#00A67E]" /> Account Created</div>
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-800"><CheckSquare className="w-5 h-5 text-[#00A67E]" /> Role Selected</div>
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-800"><CheckSquare className="w-5 h-5 text-[#00A67E]" /> Basic Details</div>
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-800"><CheckSquare className="w-5 h-5 text-[#00A67E]" /> Interests Added</div>
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-400"><div className="w-5 h-5 rounded border-2 border-gray-300"></div> Verify License</div>
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-400"><div className="w-5 h-5 rounded border-2 border-gray-300"></div> Upload Resume</div>
                  </div>
                </div>

                <button 
                  onClick={handleFinishSetup}
                  disabled={isSubmitting}
                  className="w-full bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center"
                >
                  {isSubmitting ? "Saving Profile..." : "Complete Setup"}
                </button>
              </div>
            )}

            {/* STEP 8: FINAL SUCCESS */}
            {currentStep === "SUCCESS" && (
              <div className="animate-in zoom-in-95 duration-500 text-center py-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-[#00A67E]" />
                </div>
                <h2 className="text-3xl font-black text-[#0B1B3D] mb-4">🚀 Your MGN Profile Is Ready!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Welcome to the community, {name.split(" ")[0]}. Let's explore what's next.
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-bold text-[#0B1B3D] mb-2 flex items-center gap-2"><Gift className="w-5 h-5 text-[#0052CC]" /> Your Referral Code</h3>
                  <p className="text-sm text-gray-600 mb-4">Invite friends to unlock premium rewards and badges.</p>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 font-mono font-bold text-xl text-center tracking-widest text-[#0052CC]">
                    {generatedReferral}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button onClick={() => router.push("/dashboard")} className="w-full bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-md">
                    Go To Dashboard
                  </button>
                  <button onClick={() => router.push("/network")} className="w-full bg-white text-[#0052CC] border-2 border-[#0052CC] py-3.5 rounded-xl font-bold text-lg hover:bg-blue-50">
                    Explore Network
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
