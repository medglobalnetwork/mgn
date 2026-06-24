"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Local Sub-components to avoid duplication for responsive interleaving
const ProgressWidget = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-[#0B1B3D]">Your Progress</h3>
      <button className="text-[11px] font-bold text-[#0052CC] flex items-center gap-1 hover:underline">
        This Month <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
    </div>

    <div className="flex items-center justify-center gap-6 sm:gap-8">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="text-[#0052CC]" strokeDasharray="0, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-black text-[#0B1B3D] leading-none">0%</span>
          <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">Goal Progress</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[10px] text-gray-500 font-medium mb-0.5">Goal</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-[#0B1B3D] leading-none">0</span>
            <span className="text-[10px] text-gray-500">Hours</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium mb-0.5">Completed</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-[#0B1B3D] leading-none">0</span>
            <span className="text-[10px] text-gray-500">Hours</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 pt-4 border-t border-gray-100">
      <Link href="/dashboard/analytics" className="w-full bg-blue-50/50 hover:bg-blue-50 text-[#0052CC] text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1 transition-colors">
        View Analytics <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </Link>
    </div>
  </div>
);

const UpcomingEventsWidget = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-[#0B1B3D]">Upcoming Events</h3>
    </div>
    <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      </div>
      <p className="text-xs font-medium text-gray-500">No upcoming events scheduled at the moment.</p>
    </div>
  </div>
);

const RecentActivityWidget = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-[#0B1B3D]">Recent Activity</h3>
    </div>
    <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <p className="text-xs font-medium text-gray-500">No recent activity to show.</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Safe fallback for user info
  const fullName = user?.user_metadata?.full_name || "User";
  const firstName = fullName.split(" ")[0];
  const photoUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0052CC&color=fff`;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 max-w-[1600px] mx-auto">
      {/* Left Column (Main Dashboard Content) */}
      <div className="xl:col-span-2 flex flex-col gap-6 lg:gap-8 w-full overflow-hidden">
        
        {/* MOBILE HERO SECTION (Only visible below sm) */}
        <div className="flex flex-col gap-5 sm:hidden px-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] flex items-center gap-2">
                Hello, {firstName} <span className="text-lg">👋</span>
              </h1>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Discover. Connect. Grow.</p>
            </div>
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-50 shrink-0 shadow-sm">
              <Image src={photoUrl} alt="Profile" width={56} height={56} className="object-cover" unoptimized />
            </div>
          </div>

          <div className="bg-white rounded-2xl py-5 px-2 shadow-sm border border-gray-100 grid grid-cols-4 gap-1 divide-x divide-gray-100">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[22px] font-black text-green-500 leading-none mb-1.5">0</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-wide">Courses</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[22px] font-black text-blue-600 leading-none mb-1.5">0</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-wide">Certificates</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[22px] font-black text-[#0B1B3D] leading-none mb-1.5">0</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-wide">Connections</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[22px] font-black text-purple-700 leading-none mb-1.5">0</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-wide">Groups</span>
            </div>
          </div>
        </div>

        {/* DESKTOP HERO SECTION (Hidden below sm) */}
        <div className="hidden sm:block bg-gradient-to-br from-[#F0F5FF] to-[#E6EFFF] rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-blue-100 shadow-sm">
          <div className="absolute top-0 right-0 w-[60%] h-full opacity-20 pointer-events-none">
             <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
               <path d="M100 0H400V400H100L0 200L100 0Z" fill="url(#paint0_linear)" />
               <defs>
                 <linearGradient id="paint0_linear" x1="400" y1="200" x2="0" y2="200" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#0052CC" stopOpacity="1" />
                   <stop offset="1" stopColor="#0052CC" stopOpacity="0" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          <div className="relative z-10 max-w-[60%]">
            <h2 className="text-gray-600 text-sm font-bold mb-1">Welcome back,</h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] flex items-center gap-2 mb-2">
              {fullName} <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm font-medium text-gray-500 mb-8">Discover. Connect. Grow.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                  <span className="text-xl font-black text-[#0B1B3D]">0</span>
                </div>
                <span className="text-[11px] font-medium text-gray-500">Courses Enrolled</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                  <span className="text-xl font-black text-[#0B1B3D]">0</span>
                </div>
                <span className="text-[11px] font-medium text-gray-500">Certificates</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  <span className="text-xl font-black text-[#0B1B3D]">0</span>
                </div>
                <span className="text-[11px] font-medium text-gray-500">Connections</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  <span className="text-xl font-black text-[#0B1B3D]">0</span>
                </div>
                <span className="text-[11px] font-medium text-gray-500">Groups</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-4 w-[280px] h-[220px] hidden sm:block pointer-events-none">
            <Image src="https://images.unsplash.com/photo-1594824436998-d822240ce470?auto=format&fit=crop&w=400&q=80" alt="Doctor" fill className="object-cover object-top mask-image-bottom opacity-90 rounded-tl-full" unoptimized />
          </div>
        </div>

        {/* MOBILE WIDGET: Your Progress (Interleaved here on mobile) */}
        <div className="xl:hidden w-full">
          <ProgressWidget />
        </div>

        {/* Continue Learning */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-[#0B1B3D]">Continue Learning</h3>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center">
               <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B1B3D] mb-1">No Active Courses</p>
              <p className="text-xs text-gray-500">You haven't enrolled in any courses yet. Explore our catalog to start learning.</p>
            </div>
          </div>
        </div>

        {/* MOBILE WIDGET: Upcoming Events (Interleaved here on mobile) */}
        <div className="xl:hidden w-full">
          <UpcomingEventsWidget />
        </div>

        {/* Recommended for You */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-[#0B1B3D]">Recommended for You</h3>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
               <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B1B3D] mb-1">Building Recommendations</p>
              <p className="text-xs text-gray-500">We are curating personalized recommendations based on your profile.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column (Sidebar Widgets) - Hidden on Mobile/Tablet since they are interleaved! */}
      <div className="hidden xl:flex xl:col-span-1 flex-col gap-6">
        <ProgressWidget />
        <UpcomingEventsWidget />
        <RecentActivityWidget />
      </div>
    </div>
  );
}
