"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Building, Hash, Network, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeftSidebar() {
  const { user } = useAuth();
  const [connectionCount, setConnectionCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetchConnections = async () => {
      const { count } = await supabase
        .from("connections")
        .select("*", { count: 'exact', head: true })
        .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .eq("status", "accepted");
      
      setConnectionCount(count || 0);
    };

    fetchConnections();
  }, [user]);

  const fullName = user?.user_metadata?.full_name || "My Profile";
  const photoUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0052CC&color=fff`;

  return (
    <div className="hidden lg:flex flex-col w-[280px] shrink-0 gap-4 sticky top-[72px] h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-16 bg-[#0B1B3D] w-full" />
        <div className="px-4 pb-4 relative">
          <div className="w-16 h-16 rounded-full bg-white p-1 absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="w-full h-full rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative">
              <Image src={photoUrl} alt={fullName} fill className="object-cover" unoptimized />
            </div>
          </div>
          <div className="mt-10 text-center">
            <h3 className="text-[15px] font-bold text-[#0B1B3D] leading-tight">{fullName}</h3>
            <p className="text-[11px] text-gray-500 mt-1">Medical Professional</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-50 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-gray-500 font-medium">Connections</span>
              <span className="text-[#0052CC] font-bold">{connectionCount}</span>
            </div>
            {/* Removed fake numbers for views/impressions as requested */}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h4 className="text-[12px] font-bold text-gray-900 mb-3">Manage my network</h4>
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/connections" className="flex items-center justify-between text-[13px] text-gray-600 hover:text-[#0052CC] transition-colors py-1 group">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400 group-hover:text-[#0052CC]" />
              Connections
            </div>
            <span className="font-medium">{connectionCount}</span>
          </Link>
          <Link href="/dashboard/groups" className="flex items-center justify-between text-[13px] text-gray-600 hover:text-[#0052CC] transition-colors py-1 group">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-400 group-hover:text-[#0052CC]" />
              Groups
            </div>
          </Link>
          <Link href="/dashboard/companies" className="flex items-center justify-between text-[13px] text-gray-600 hover:text-[#0052CC] transition-colors py-1 group">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-400 group-hover:text-[#0052CC]" />
              Companies
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
