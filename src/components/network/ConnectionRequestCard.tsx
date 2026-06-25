"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useState, useTransition } from "react";
import { acceptConnectionRequest, rejectConnectionRequest } from "@/app/actions/network";

interface RequestProfile {
  id: string;
  full_name: string;
  avatar_url: string;
  headline: string;
}

export default function ConnectionRequestCard({ request }: { request: { id: string, created_at: string, profiles: RequestProfile } }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleAccept = () => {
    startTransition(async () => {
      try {
        await acceptConnectionRequest(request.id);
        setIsVisible(false);
      } catch (error) {
        console.error("Failed to accept", error);
      }
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      try {
        await rejectConnectionRequest(request.id);
        setIsVisible(false);
      } catch (error) {
        console.error("Failed to reject", error);
      }
    });
  };

  if (!isVisible) return null;

  const profile = request.profiles;
  const avatar = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}&background=0052CC&color=fff`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
        <Link href={`/profile/${profile.id}`}>
          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 cursor-pointer">
            <Image src={avatar} alt={profile.full_name} width={56} height={56} className="object-cover w-full h-full" unoptimized />
          </div>
        </Link>
        <div className="flex flex-col flex-1 min-w-0">
          <Link href={`/profile/${profile.id}`}>
            <h3 className="font-bold text-[#0B1B3D] text-[15px] hover:text-[#0052CC] transition-colors truncate">{profile.full_name}</h3>
          </Link>
          <p className="text-[13px] text-gray-500 truncate">{profile.headline || "Medical Professional"}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={handleReject}
          disabled={isPending}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
          title="Ignore"
        >
          <X className="w-5 h-5" />
        </button>
        <button 
          onClick={handleAccept}
          disabled={isPending}
          className="px-4 py-2 bg-white border border-[#0052CC] text-[#0052CC] rounded-full text-sm font-bold hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
