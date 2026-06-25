"use client";

import Image from "next/image";
import Link from "next/link";
import { UserPlus, Clock, Check } from "lucide-react";
import { useState, useTransition } from "react";
import { sendConnectionRequest } from "@/app/actions/network";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  headline: string;
  city?: string;
  primary_category?: string;
}

export default function ConnectionCard({ profile, currentUserId }: { profile: Profile, currentUserId: string }) {
  const [status, setStatus] = useState<"none" | "pending" | "connected">("none");
  const [isPending, startTransition] = useTransition();

  const handleConnect = () => {
    if (status !== "none") return;
    
    startTransition(async () => {
      try {
        await sendConnectionRequest(currentUserId, profile.id);
        setStatus("pending");
      } catch (error) {
        console.error("Failed to send request", error);
      }
    });
  };

  const avatar = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}&background=0052CC&color=fff`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="h-16 bg-gradient-to-r from-blue-50 to-blue-100 relative"></div>
      
      <div className="px-4 pb-4 flex-1 flex flex-col items-center text-center -mt-8 relative z-10">
        <Link href={`/profile/${profile.id}`}>
          <div className="w-16 h-16 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <Image src={avatar} alt={profile.full_name} width={64} height={64} className="object-cover w-full h-full" unoptimized />
          </div>
        </Link>
        
        <Link href={`/profile/${profile.id}`} className="mt-2 group">
          <h3 className="font-bold text-[#0B1B3D] text-[15px] group-hover:text-[#0052CC] transition-colors line-clamp-1">{profile.full_name}</h3>
        </Link>
        
        <p className="text-[13px] text-gray-500 mt-1 line-clamp-2 min-h-[39px]">
          {profile.headline || profile.primary_category || "Medical Professional"}
        </p>

        <div className="mt-auto pt-4 w-full">
          {status === "none" && (
            <button 
              onClick={handleConnect}
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 border border-[#0052CC] text-[#0052CC] hover:bg-blue-50 py-1.5 rounded-full text-sm font-bold transition-colors disabled:opacity-50"
            >
              {isPending ? "Connecting..." : <><UserPlus className="w-4 h-4" /> Connect</>}
            </button>
          )}

          {status === "pending" && (
            <button disabled className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-1.5 rounded-full text-sm font-bold">
              <Clock className="w-4 h-4" /> Pending
            </button>
          )}
          
          {status === "connected" && (
            <button disabled className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-600 py-1.5 rounded-full text-sm font-bold">
              <Check className="w-4 h-4" /> Connected
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
