"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const { setMobileSidebarOpen } = useDashboard();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Safe fallback for user info
  const fullName = user?.user_metadata?.full_name || "User";
  const firstName = fullName.split(" ")[0];
  const photoUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0052CC&color=fff`;

  return (
    <header className="w-full h-14 sm:h-[72px] bg-white flex items-center justify-between px-4 sm:px-6 shrink-0 relative z-20 sticky top-0 border-b border-gray-100 sm:border-none shadow-sm sm:shadow-none">
      
      {/* Mobile Layout */}
      <div className="flex items-center justify-between w-full sm:hidden">
        <button 
          onClick={() => setMobileSidebarOpen(true)}
          className="text-gray-600 p-1 -ml-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <Link href="/dashboard" className="absolute left-1/2 -translate-x-1/2">
           <img src="/logo.svg" alt="MGN Logo" className="h-5 w-auto object-contain" />
        </Link>
        <button className="relative p-1 -mr-1 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-blue-600 text-white text-[8px] font-bold flex items-center justify-center rounded-full border border-white">3</div>
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between w-full">
        {/* Left: Mobile Menu Toggle & Search Bar */}
        <div className="flex items-center gap-4 flex-1">
          {/* Search Bar */}
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for courses, people, groups, and more..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-100 rounded-lg text-[13px] outline-none focus:bg-white focus:ring-1 focus:ring-blue-100 focus:border-blue-200 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-5 shrink-0 ml-4">
          {/* Icon Group */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-full transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-blue-600 text-white text-[8px] font-bold flex items-center justify-center rounded-full border border-white">3</div>
            </button>
            
            {/* Messages */}
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-full transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-blue-600 text-white text-[8px] font-bold flex items-center justify-center rounded-full border border-white">1</div>
            </button>

            {/* Chat */}
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-full transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full border border-white"></div>
            </button>
          </div>
          
          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 mx-1"></div>

          {/* Profile Dropdown Container */}
          <div className="relative">
            {/* Profile Trigger */}
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-gray-200 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden relative border border-gray-100 shrink-0">
                <Image src={photoUrl} alt={fullName} fill className="object-cover" unoptimized />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-bold text-[#0B1B3D]">Hi, {firstName}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <h4 className="text-sm font-bold text-[#0B1B3D] truncate">{fullName}</h4>
                    <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#0052CC] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      Account Settings
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-50 py-1">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
