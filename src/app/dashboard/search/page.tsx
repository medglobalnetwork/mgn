"use client";
import { Search } from "lucide-react";
export default function SearchPage() {
  return (
    <div className="max-w-[1000px] mx-auto pb-10 w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-[#0B1B3D] mb-4 flex items-center gap-2"><Search className="w-5 h-5"/> Global Search</h2>
        <input type="text" placeholder="Search people, posts, organizations..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0052CC]" />
        <div className="mt-8 text-center text-gray-500 text-sm">Search results will appear here.</div>
      </div>
    </div>
  );
}