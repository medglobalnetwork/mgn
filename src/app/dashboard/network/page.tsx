import { getAllPosts } from "@/app/actions/network";
import Feed from "@/components/network/Feed";
import { Briefcase, Building, ChevronRight, Hash, Network, Users } from "lucide-react";
import Link from "next/link";

// Left Sidebar Mini Profile (Simplified)
function LeftSidebar() {
  return (
    <div className="hidden lg:flex flex-col w-[280px] shrink-0 gap-4 sticky top-[72px] h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-16 bg-[#0B1B3D] w-full" />
        <div className="px-4 pb-4 relative">
          <div className="w-16 h-16 rounded-full bg-white p-1 absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="w-full h-full rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
               <Network className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <div className="mt-10 text-center">
            <h3 className="text-[15px] font-bold text-[#0B1B3D] leading-tight">My Profile</h3>
            <p className="text-[11px] text-gray-500 mt-1">Medical Professional</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-50 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-gray-500 font-medium">Profile viewers</span>
              <span className="text-[#0052CC] font-bold">12</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-gray-500 font-medium">Post impressions</span>
              <span className="text-[#0052CC] font-bold">48</span>
            </div>
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
            <span className="font-medium">10</span>
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

// Right Sidebar News (Simplified)
function RightSidebar() {
  return (
    <div className="hidden xl:flex flex-col w-[300px] shrink-0 gap-4 sticky top-[72px]">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-[14px] font-bold text-[#0B1B3D] mb-4">MGN Trending News</h3>
        
        <div className="flex flex-col gap-4">
          <div className="group cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></div>
              <h4 className="text-[13px] font-bold text-gray-800 group-hover:text-[#0052CC] transition-colors leading-tight">AI in Healthcare: What's next?</h4>
            </div>
            <p className="text-[11px] text-gray-500 pl-3.5">Top news • 10,234 readers</p>
          </div>
          
          <div className="group cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#0052CC] transition-colors"></div>
              <h4 className="text-[13px] font-bold text-gray-800 group-hover:text-[#0052CC] transition-colors leading-tight">New regulations for tele-medicine</h4>
            </div>
            <p className="text-[11px] text-gray-500 pl-3.5">4 days ago • 5,432 readers</p>
          </div>

          <div className="group cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#0052CC] transition-colors"></div>
              <h4 className="text-[13px] font-bold text-gray-800 group-hover:text-[#0052CC] transition-colors leading-tight">Global Medical Conference 2026</h4>
            </div>
            <p className="text-[11px] text-gray-500 pl-3.5">Events • 3,211 readers</p>
          </div>
        </div>

        <button className="flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-800 mt-4 px-2 py-1 rounded hover:bg-gray-50 transition-colors">
          Show more
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
         <p className="text-[11px] text-gray-500 mb-2">Ad</p>
         <h4 className="text-[13px] font-bold text-[#0B1B3D] mb-1">Looking for a new role?</h4>
         <p className="text-[11px] text-gray-500 mb-3">Explore premium medical jobs on MGN.</p>
         <Link href="/dashboard/jobs" className="inline-flex items-center gap-1.5 border border-[#0052CC] text-[#0052CC] px-4 py-1.5 rounded-full text-[12px] font-bold hover:bg-blue-50 transition-colors">
           <Briefcase className="w-3 h-3" />
           View Jobs
         </Link>
      </div>
    </div>
  );
}

export default async function NetworkPage() {
  // Fetch posts via Server Action
  const posts = await getAllPosts();

  return (
    <div className="flex justify-center gap-6 w-full mx-auto pb-10">
      <LeftSidebar />
      <Feed posts={posts} />
      <RightSidebar />
    </div>
  );
}
