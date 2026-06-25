"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { MapPin, Briefcase, Award, GraduationCap, ShieldCheck, UserPlus, MessageCircle, MoreHorizontal } from "lucide-react";
import { getProfileData } from "@/app/actions/profile";

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { user, supabase } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const unwrappedParams = use(params);
  const profileId = unwrappedParams.id;

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      const data = await getProfileData(profileId);
      setProfile(data);
      setIsLoading(false);
    }
    loadProfile();
  }, [profileId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) return (
    <div className="flex flex-col justify-center items-center h-screen text-gray-500">
      <h2 className="text-2xl font-bold text-[#0B1B3D] mb-2">Profile Not Found</h2>
      <p>This user does not exist or has been removed.</p>
    </div>
  );

  const isOwnProfile = user?.id === profileId;
  const displayAvatar = profile.avatar_url || profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'U')}&background=0052CC&color=fff`;

  return (
    <div className="max-w-[1200px] mx-auto pb-20 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Header Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm relative">
            {/* Cover Photo */}
            <div className="h-40 sm:h-56 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 w-full object-cover"></div>
            
            {/* Profile Content */}
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-16 sm:-top-20 left-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 sm:border-[6px] border-white bg-white overflow-hidden shadow-md">
                <Image src={displayAvatar} alt={profile.full_name || "Profile"} fill className="object-cover" />
              </div>
              
              <div className="flex justify-end pt-4 sm:pt-6 gap-2 sm:gap-3">
                {isOwnProfile ? (
                  <button className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button className="bg-[#0052CC] text-white px-5 sm:px-6 py-1.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                      <UserPlus className="w-4 h-4" /> Connect
                    </button>
                    <button className="border border-[#0052CC] text-[#0052CC] px-4 py-1.5 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" /> Message
                    </button>
                    <button className="border border-gray-300 text-gray-600 p-1.5 rounded-full hover:bg-gray-50 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-4 sm:mt-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D]">{profile.full_name}</h1>
                  {profile.verified && (
                    <ShieldCheck className="w-6 h-6 text-blue-500 fill-blue-50" />
                  )}
                </div>
                <p className="text-gray-800 font-medium text-lg mt-1">{profile.headline || profile.primary_category}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                  {profile.city && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.city}{profile.state ? `, ${profile.state}` : ''}{profile.country ? `, ${profile.country}` : ''}</span>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <span className="font-bold text-[#0052CC] hover:underline cursor-pointer">{profile.connections_count} Connections</span>
                    <span className="font-bold text-[#0052CC] hover:underline cursor-pointer">{profile.followers_count} Followers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. About Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B1B3D] mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
              {profile.bio || "This user hasn't added an about section yet."}
            </p>
          </div>

          {/* 3. Experience Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B1B3D] mb-6">Experience</h2>
            <div className="space-y-6">
              {(!profile.experience || profile.experience.length === 0) ? (
                <p className="text-gray-500 text-sm">No experience details added.</p>
              ) : profile.experience.map((exp: any, index: number) => (
                <div key={exp.id} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                    <Briefcase className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className={`pb-6 ${index !== profile.experience.length - 1 ? 'border-b border-gray-100' : ''} flex-1`}>
                    <h3 className="font-bold text-[#0B1B3D] text-base">{exp.title}</h3>
                    <p className="text-gray-800 text-sm">{exp.company_name}</p>
                    <p className="text-gray-500 text-xs mt-1">{exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}</p>
                    {exp.description && <p className="text-gray-700 text-sm mt-2">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Education Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B1B3D] mb-6">Education</h2>
            <div className="space-y-6">
              {(!profile.education || profile.education.length === 0) ? (
                <p className="text-gray-500 text-sm">No education details added.</p>
              ) : profile.education.map((edu: any, index: number) => (
                <div key={edu.id} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                    <GraduationCap className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className={`pb-6 ${index !== profile.education.length - 1 ? 'border-b border-gray-100' : ''} flex-1`}>
                    <h3 className="font-bold text-[#0B1B3D] text-base">{edu.institution_name}</h3>
                    <p className="text-gray-800 text-sm">{edu.degree} {edu.field_of_study && `, ${edu.field_of_study}`}</p>
                    <p className="text-gray-500 text-xs mt-1">{edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Trust Score & Verification Widget */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm sticky top-24">
            <h3 className="font-bold text-[#0B1B3D] text-base mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" /> Trust & Verification
            </h3>
            
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#0052CC" 
                    strokeWidth="8" 
                    strokeDasharray={`${(profile.trust_score / 100) * 283} 283`}
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-[#0B1B3D]">{profile.trust_score}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Score</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-2 mb-4">
               <span className="text-sm font-bold text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full">{profile.trust_level} LEVEL</span>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className={`w-5 h-5 ${profile.verified ? 'text-green-500' : 'text-gray-300'}`} />
                <span className={`${profile.verified ? 'text-gray-700' : 'text-gray-400'} font-medium`}>Identity Verified</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className={`w-5 h-5 ${profile.trust_score > 30 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className={`${profile.trust_score > 30 ? 'text-gray-700' : 'text-gray-400'} font-medium`}>Medical License Verified</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className={`w-5 h-5 ${profile.trust_score > 60 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className={`${profile.trust_score > 60 ? 'text-gray-700' : 'text-gray-400'} font-medium`}>Workplace Verified</span>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-blue-50 text-[#0052CC] font-bold py-2 rounded-xl text-sm hover:bg-blue-100 transition-colors">
              View Detailed Report
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
