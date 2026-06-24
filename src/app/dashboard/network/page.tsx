"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Building, Hash, Users, UserPlus, Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  primary_category: string | null;
}

export default function MyNetworkPage() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Fetch random profiles to suggest (excluding the current user)
    // In a real app, you would exclude people they are already connected with
    const fetchSuggestions = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, primary_category')
        .neq('id', user.id)
        .limit(12);
        
      if (!error && data) {
        setSuggestions(data);
      }
      setIsLoading(false);
    };

    fetchSuggestions();
  }, [user]);

  return (
    <div className="flex gap-6 w-full max-w-[1200px] mx-auto pb-10">
      
      {/* Left Sidebar - Manage Network */}
      <div className="hidden lg:flex flex-col w-[280px] shrink-0 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50">
            <h3 className="text-[15px] font-bold text-[#0B1B3D]">Manage my network</h3>
          </div>
          <div className="flex flex-col py-2">
            <Link href="/dashboard/connections" className="flex items-center justify-between text-[14px] text-gray-600 hover:text-[#0052CC] transition-colors py-2 px-4 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                Connections
              </div>
            </Link>
            <Link href="/dashboard/groups" className="flex items-center justify-between text-[14px] text-gray-600 hover:text-[#0052CC] transition-colors py-2 px-4 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5 text-gray-400" />
                Groups
              </div>
            </Link>
            <Link href="/dashboard/companies" className="flex items-center justify-between text-[14px] text-gray-600 hover:text-[#0052CC] transition-colors py-2 px-4 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-400" />
                Companies
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Invitations Section Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
          <h3 className="text-[15px] font-medium text-gray-700">No pending invitations</h3>
          <button className="text-[14px] font-bold text-gray-400 hover:text-gray-700">Manage</button>
        </div>

        {/* Suggestions Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-[#0B1B3D]">Suggested for you</h3>
            <button className="text-[14px] font-bold text-gray-400 hover:text-gray-700">See all</button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mb-3" />
                  <div className="w-24 h-4 bg-gray-200 rounded mb-2" />
                  <div className="w-32 h-3 bg-gray-200 rounded mb-4" />
                  <div className="w-full h-8 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((profile) => {
                const avatar = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}&background=0052CC&color=fff`;
                return (
                  <div key={profile.id} className="border border-gray-100 rounded-xl flex flex-col items-center text-center overflow-hidden hover:shadow-md transition-shadow relative">
                    {/* Background Banner */}
                    <div className="h-16 w-full bg-gray-100 mb-8" />
                    
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-white p-1 absolute top-6">
                      <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden relative">
                        <Image src={avatar} alt={profile.full_name} fill className="object-cover" unoptimized />
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="px-4 pb-4 w-full flex flex-col items-center flex-1">
                      <h4 className="text-[15px] font-bold text-[#0B1B3D] leading-tight hover:underline cursor-pointer">
                        {profile.full_name}
                      </h4>
                      <p className="text-[12px] text-gray-500 mt-1 line-clamp-2 min-h-[36px]">
                        {profile.primary_category || "Medical Professional"}
                      </p>
                      
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-3 mb-4">
                        <Users className="w-3 h-3" />
                        <span>Based on your profile</span>
                      </div>
                      
                      {/* Connect Button */}
                      <button className="mt-auto w-full py-1.5 rounded-full border border-[#0052CC] text-[#0052CC] font-bold text-[14px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
                        <UserPlus className="w-4 h-4" />
                        Connect
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
             <div className="py-12 text-center">
               <p className="text-gray-500 text-sm">No suggestions available at the moment.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
