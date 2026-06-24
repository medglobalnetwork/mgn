"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col items-center gap-6 p-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-400">Name</p>
            <p className="text-sm text-gray-900">{user?.user_metadata?.full_name || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Email</p>
            <p className="text-sm text-gray-900">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">UID</p>
            <p className="text-xs text-gray-500 font-mono">{user?.id}</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
