"use client";
import { Bell } from "lucide-react";
export default function NotificationsPage() {
  return (
    <div className="max-w-[800px] mx-auto pb-10 w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-[#0B1B3D] mb-4 flex items-center gap-2"><Bell className="w-5 h-5"/> Notifications</h2>
        <div className="flex flex-col gap-4 mt-6">
          <div className="text-center text-gray-500 text-sm py-10">You have no new notifications.</div>
        </div>
      </div>
    </div>
  );
}