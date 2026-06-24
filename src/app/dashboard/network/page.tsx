import { getAllPosts } from "@/app/actions/network";
import Feed from "@/components/network/Feed";
import { Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import LeftSidebar from "@/components/network/LeftSidebar";

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
