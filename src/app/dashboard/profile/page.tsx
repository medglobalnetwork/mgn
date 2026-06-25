"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getProfileData } from "@/app/actions/profile";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Briefcase, GraduationCap, Calendar, Edit2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      try {
        const data = await getProfileData(user.id);
        if (data) setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Profile not found</h2>
        <p className="text-gray-500 mb-4">We couldn't load your profile details.</p>
      </div>
    );
  }

  const avatar = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}&background=0052CC&color=fff`;

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-6 pb-10 w-full">
      {/* Top Banner & Intro Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        {/* Cover Photo */}
        <div className="h-32 sm:h-48 bg-gradient-to-r from-[#0B1B3D] to-[#0052CC] relative">
          <Link href="/dashboard/settings" className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full text-white transition-colors">
            <Edit2 className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="px-6 pb-6 relative">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white absolute -top-12 sm:-top-16 overflow-hidden">
            <Image src={avatar} alt={profile.full_name} fill className="object-cover" unoptimized />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 sm:pt-6 mb-2 sm:mb-0">
            <Link href="/dashboard/settings" className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 font-bold text-[14px] hover:bg-gray-50 transition-colors">
              Edit profile
            </Link>
          </div>

          {/* User Info */}
          <div className="mt-4 sm:mt-0 max-w-[80%]">
            <h1 className="text-2xl font-bold text-[#0B1B3D] leading-tight">{profile.full_name}</h1>
            <p className="text-[15px] text-gray-800 mt-1">{profile.headline || profile.primary_category || "Medical Professional"}</p>
            
            <div className="flex items-center gap-2 mt-2 text-[13px] text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>{[profile.city, profile.country].filter(Boolean).join(", ") || "Location not set"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[18px] font-bold text-[#0B1B3D]">About</h2>
          <Link href="/dashboard/settings" className="p-2 hover:bg-gray-50 rounded-full text-gray-500 transition-colors">
            <Edit2 className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-[14px] text-gray-700 whitespace-pre-wrap leading-relaxed">
          {profile.bio || "No summary provided yet."}
        </p>
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-bold text-[#0B1B3D]">Experience</h2>
          <Link href="/dashboard/settings" className="p-2 hover:bg-gray-50 rounded-full text-gray-500 transition-colors">
            <Edit2 className="w-4 h-4" />
          </Link>
        </div>

        {profile.experience.length === 0 ? (
          <p className="text-[14px] text-gray-500 italic">No experience added yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {profile.experience.map((exp: any, index: number) => (
              <div key={exp.id || index} className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex flex-shrink-0 items-center justify-center">
                  <Briefcase className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-bold text-[#0B1B3D]">{exp.title}</h3>
                  <p className="text-[14px] text-gray-800">{exp.company_name}</p>
                  <p className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.start_date ? new Date(exp.start_date).getFullYear() : ""} - {exp.is_current ? "Present" : exp.end_date ? new Date(exp.end_date).getFullYear() : ""}
                  </p>
                  {exp.location && <p className="text-[13px] text-gray-500">{exp.location}</p>}
                  {exp.description && <p className="text-[14px] text-gray-700 mt-2 whitespace-pre-wrap">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-bold text-[#0B1B3D]">Education</h2>
          <Link href="/dashboard/settings" className="p-2 hover:bg-gray-50 rounded-full text-gray-500 transition-colors">
            <Edit2 className="w-4 h-4" />
          </Link>
        </div>

        {profile.education?.length === 0 ? (
          <p className="text-[14px] text-gray-500 italic">No education added yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {profile.education?.map((edu: any, index: number) => (
              <div key={edu.id} className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex flex-shrink-0 items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-bold text-[#0B1B3D]">{edu.institution_name}</h3>
                  <p className="text-[14px] text-gray-800">{edu.degree}{edu.field_of_study ? `, ${edu.field_of_study}` : ""}</p>
                  <p className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {edu.start_date ? new Date(edu.start_date).getFullYear() : ""} - {edu.is_current ? "Present" : edu.end_date ? new Date(edu.end_date).getFullYear() : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
