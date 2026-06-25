"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import CreatePostCard from "@/components/feed/CreatePostCard";
import FeedList from "@/components/feed/FeedList";
import { getDashboardStats, getTrendingTopics } from "@/app/actions/profile";
import { getSuggestedConnections } from "@/app/actions/network";

// Left Sidebar Components
const ProfileWidget = ({ user, stats }: { user: any, stats: any }) => {
  const fullName = user?.user_metadata?.full_name || "User";
  const headline = user?.user_metadata?.headline || user?.user_metadata?.primary_category || "Healthcare Professional";
  const avatarUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0052CC&color=fff`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
      {/* Cover */}
      <div className="h-20 bg-gradient-to-r from-[#0052CC] to-blue-400"></div>
      
      {/* Profile Info */}
      <div className="px-5 pb-5 relative">
        <div className="absolute -top-10 left-5 w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm">
          <Image src={avatarUrl} alt={fullName} fill className="object-cover" />
        </div>
        
        <div className="mt-12">
          <h2 className="font-bold text-lg text-[#0B1B3D] leading-tight">{fullName}</h2>
          <p className="text-xs text-gray-500 mt-1">{headline}</p>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-100">
          <Link href={`/profile/${user?.id}`} className="flex justify-between items-center py-2 hover:bg-gray-50 cursor-pointer rounded-lg px-2 -mx-2 transition-colors">
            <span className="text-xs font-semibold text-gray-500">Profile Views</span>
            <span className="text-xs font-bold text-[#0052CC]">{stats.views}</span>
          </Link>
          <Link href="/dashboard/network" className="flex justify-between items-center py-2 hover:bg-gray-50 cursor-pointer rounded-lg px-2 -mx-2 transition-colors">
            <span className="text-xs font-semibold text-gray-500">Connections</span>
            <span className="text-xs font-bold text-[#0052CC]">{stats.connections}</span>
          </Link>
        </div>
      </div>
      
      {/* Footer Link */}
      <Link href="/dashboard/saved" className="block px-5 py-3 border-t border-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
        Saved items
      </Link>
    </div>
  );
};

const ShortcutsWidget = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm sticky top-24">
    <h3 className="font-bold text-sm text-[#0B1B3D] mb-4">Shortcuts</h3>
    <div className="space-y-1">
      <Link href="/dashboard/network" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#0052CC] rounded-xl transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        Connections
      </Link>
      <Link href="/dashboard/groups" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#0052CC] rounded-xl transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        Groups
      </Link>
      <Link href="/dashboard/events" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#0052CC] rounded-xl transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        Events
      </Link>
    </div>
  </div>
);

// Right Sidebar Components
const TrendingWidget = ({ topics }: { topics: any[] }) => {
  // If no topics in DB yet, show realistic placeholders
  const displayTopics = topics.length > 0 ? topics : [
    { query: "AI in Radiology", count: 1240 },
    { query: "NEET PG 2026", count: 892 },
    { query: "New Telemedicine Guidelines", count: 543 },
    { query: "Medical Device Regulation", count: 312 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
      <h3 className="font-bold text-sm text-[#0B1B3D] mb-4">Trending on MGN</h3>
      <div className="space-y-4">
        {displayTopics.map((item, i) => (
          <div key={i} className="cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
            <p className="text-xs font-bold text-gray-800">#{item.query}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{item.count} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SuggestedProfessionalsWidget = ({ suggestions }: { suggestions: any[] }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm text-[#0B1B3D]">Add to your feed</h3>
        <button className="text-xs font-bold text-[#0052CC] hover:underline flex items-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <p className="text-xs text-gray-500">No new suggestions</p>
        ) : (
          suggestions.slice(0, 3).map((person, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                <Image 
                  src={person.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.full_name || 'U')}&background=E5E7EB&color=374151`} 
                  alt={person.full_name || 'User'} 
                  width={40} 
                  height={40} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <Link href={`/profile/${person.id}`} className="font-bold text-xs text-gray-800 hover:underline line-clamp-1">{person.full_name}</Link>
                <span className="text-[10px] text-gray-500 line-clamp-1 mb-1">{person.headline || person.primary_category || 'Healthcare Professional'}</span>
                <Link href="/dashboard/network" className="self-start text-xs font-bold text-gray-600 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors">
                  + Connect
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      
      <Link href="/dashboard/network" className="block text-center mt-5 text-xs font-bold text-[#0052CC] hover:underline">
        View all recommendations
      </Link>
    </div>
  );
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const [stats, setStats] = useState({ connections: 0, views: 0 });
  const [topics, setTopics] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    if (user?.id) {
      getDashboardStats(user.id).then(setStats);
      getTrendingTopics().then(setTopics);
      getSuggestedConnections(user.id).then(setSuggestions);
    }
  }, [user]);

  if (!mounted) return null;

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-1">
          <ProfileWidget user={user} stats={stats} />
          <ShortcutsWidget />
        </div>

        {/* Center Feed */}
        <div className="col-span-1 lg:col-span-2">
          {/* Mobile Profile Summary (Hidden on Desktop) */}
          <div className="lg:hidden bg-white p-4 mb-4 rounded-xl border border-gray-200 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <Image 
                src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.full_name || 'U')}&background=0052CC&color=fff`} 
                alt="Profile" 
                width={40} 
                height={40} 
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-bold text-sm text-[#0B1B3D]">{user?.user_metadata?.full_name}</p>
              <p className="text-[10px] text-gray-500">{user?.user_metadata?.headline || 'Healthcare Professional'}</p>
            </div>
          </div>

          <CreatePostCard onPostCreated={() => setRefreshTrigger(prev => prev + 1)} />
          
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <div className="px-3 flex items-center gap-1 text-xs text-gray-500">
              Sort by: <span className="font-bold text-gray-800 cursor-pointer">Top</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <FeedList refreshTrigger={refreshTrigger} />
        </div>

        {/* Right Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-1">
          <TrendingWidget topics={topics} />
          <SuggestedProfessionalsWidget suggestions={suggestions} />
        </div>
        
      </div>
    </div>
  );
}
