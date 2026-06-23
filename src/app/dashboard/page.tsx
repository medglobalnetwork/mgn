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
          <path className="text-[#0052CC]" strokeDasharray="75, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-black text-[#0B1B3D] leading-none">75%</span>
          <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">Goal Progress</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[10px] text-gray-500 font-medium mb-0.5">Goal</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-[#0B1B3D] leading-none">20</span>
            <span className="text-[10px] text-gray-500">Hours</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium mb-0.5">Completed</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-[#0B1B3D] leading-none">15</span>
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
      <Link href="/dashboard/events" className="text-[11px] font-bold text-[#0052CC] hover:underline">View All</Link>
    </div>

    <div className="flex flex-col gap-5">
      {[
        { date: "24", month: "MAY", title: "AI in Healthcare Webinar", time: "11:00 AM - 12:30 PM (IST)", type: "Online", color: "text-blue-600" },
        { date: "28", month: "MAY", title: "Healthcare Leadership Summit", time: "09:00 AM - 05:00 PM (IST)", type: "Bengaluru, India", color: "text-[#0B1B3D]" },
      ].map((event, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-50 rounded-xl shrink-0 border border-gray-100">
            <span className="text-[8px] font-bold text-gray-500">{event.month}</span>
            <span className={`text-[17px] font-black leading-none ${event.color} mt-0.5`}>{event.date}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-[13px] font-bold text-[#0B1B3D]">{event.title}</h4>
            <p className="text-[10px] text-gray-500">{event.time}</p>
            <p className="text-[10px] font-medium text-gray-500 flex items-center gap-1 mt-0.5">
              {event.type === 'Online' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
              {event.type}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentActivityWidget = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-[#0B1B3D]">Recent Activity</h3>
      <Link href="/dashboard/activity" className="text-[11px] font-bold text-[#0052CC] hover:underline">View All</Link>
    </div>

    <div className="flex flex-col gap-5 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-100 before:z-0">
      <div className="relative flex items-start justify-between z-10 gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border-2 border-white overflow-hidden text-xs">
          <Image src="https://ui-avatars.com/api/?name=Ananya+Singh&background=0052CC&color=fff" alt="User" width={32} height={32} unoptimized />
        </div>
        <div className="flex flex-col flex-1 pb-1">
          <p className="text-[11px] text-gray-600"><span className="font-medium text-[#0B1B3D]">You</span> completed the course</p>
          <p className="text-[12px] font-bold text-[#0B1B3D]">Patient Safety & Quality</p>
          <span className="text-[9px] text-gray-400 mt-1">2h ago</span>
        </div>
      </div>

      <div className="relative flex items-start justify-between z-10 gap-4">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 border-2 border-white overflow-hidden text-xs">
          <Image src="https://ui-avatars.com/api/?name=Dr+Rohan&background=00A67E&color=fff" alt="User" width={32} height={32} unoptimized />
        </div>
        <div className="flex flex-col flex-1 pb-1">
          <p className="text-[11px] text-gray-600"><span className="font-medium text-[#0B1B3D]">Dr. Rohan Patel</span> accepted your connection request</p>
          <span className="text-[9px] text-gray-400 mt-1">1d ago</span>
        </div>
      </div>
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
  const displayName = user?.displayName || "User";
  const firstName = displayName.split(" ")[0];
  const photoUrl = user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0052CC&color=fff`;

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
              <span className="text-[22px] font-black text-green-500 leading-none mb-1.5">12</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-wide">Courses</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[22px] font-black text-blue-600 leading-none mb-1.5">08</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-wide">Certificates</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[22px] font-black text-[#0B1B3D] leading-none mb-1.5">245</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-wide">Connections</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[22px] font-black text-purple-700 leading-none mb-1.5">05</span>
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
              {displayName} <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm font-medium text-gray-500 mb-8">Discover. Connect. Grow.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                  <span className="text-xl font-black text-[#0B1B3D]">12</span>
                </div>
                <span className="text-[11px] font-medium text-gray-500">Courses Enrolled</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                  <span className="text-xl font-black text-[#0B1B3D]">08</span>
                </div>
                <span className="text-[11px] font-medium text-gray-500">Certificates</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  <span className="text-xl font-black text-[#0B1B3D]">245</span>
                </div>
                <span className="text-[11px] font-medium text-gray-500">Connections</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  <span className="text-xl font-black text-[#0B1B3D]">05</span>
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
            <Link href="/dashboard/learning" className="text-[13px] font-bold text-[#0052CC] hover:underline">View All</Link>
          </div>
          {/* Scrollable Container on Mobile */}
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-2 snap-x hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Course Card 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm shrink-0 w-[260px] sm:w-auto snap-start">
              <div className="h-28 bg-gray-200 relative overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80" alt="Data Analytics" fill className="object-cover" unoptimized />
                <div className="absolute top-2.5 left-2.5 bg-blue-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">In Progress</div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h4 className="text-[14px] font-bold text-[#0B1B3D] leading-tight line-clamp-2">Data Analytics in Healthcare</h4>
                <div className="mt-1">
                  <span className="text-[10px] font-bold text-gray-500">60% Complete</span>
                  <div className="mt-1.5 flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm shrink-0 w-[260px] sm:w-auto snap-start">
              <div className="h-28 bg-gray-200 relative overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80" alt="Clinical Research" fill className="object-cover" unoptimized />
                <div className="absolute top-2.5 left-2.5 bg-blue-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">In Progress</div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h4 className="text-[14px] font-bold text-[#0B1B3D] leading-tight line-clamp-2">Clinical Research Fundamentals</h4>
                <div className="mt-1">
                  <span className="text-[10px] font-bold text-gray-500">60% Complete</span>
                  <div className="mt-1.5 flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty space block for scroll padding on mobile */}
            <div className="w-4 shrink-0 sm:hidden"></div>
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
            <Link href="/dashboard/courses" className="text-[13px] font-bold text-[#0052CC] hover:underline">View All</Link>
          </div>
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-2 snap-x hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { title: "Surgical Techniques Masterclass", img: "https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&w=400&q=80", level: "Advanced", rating: "4.6", reviews: "128" },
              { title: "Pharmacology Essentials", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80", level: "Intermediate", rating: "4.4", reviews: "96" },
            ].map((course, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm shrink-0 w-[240px] sm:w-auto snap-start flex flex-col cursor-pointer">
                <div className="h-28 bg-gray-200 relative overflow-hidden shrink-0">
                  <Image src={course.img} alt={course.title} fill className="object-cover" unoptimized />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="text-[13px] font-bold text-[#0B1B3D] leading-tight mb-1 line-clamp-2">{course.title}</h4>
                  <p className="text-[11px] text-gray-500 mb-3">{course.level}</p>
                  
                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-orange-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      <span className="text-[11px] font-bold text-gray-700">{course.rating} <span className="font-medium text-gray-400">({course.reviews})</span></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-4 shrink-0 sm:hidden"></div>
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
