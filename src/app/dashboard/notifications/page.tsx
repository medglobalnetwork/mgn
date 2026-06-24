import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">Notifications</h1>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-2">
          <Bell className="w-8 h-8 text-[#0052CC]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0B1B3D] mb-2">Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            We are actively building the Notifications experience. Check back soon for updates.
          </p>
        </div>
      </div>
    </div>
  );
}
