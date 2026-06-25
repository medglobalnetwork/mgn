"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getSuggestedConnections, getConnectionRequests, getConnectedNetwork } from "@/app/actions/network";
import ConnectionCard from "@/components/network/ConnectionCard";
import ConnectionRequestCard from "@/components/network/ConnectionRequestCard";
import { Users, UserPlus, Search } from "lucide-react";

export default function NetworkPage() {
  const { user } = useAuth();
  
  const [requests, setRequests] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadNetworkData = async () => {
      try {
        const [reqs, suggs, conns] = await Promise.all([
          getConnectionRequests(user.id),
          getSuggestedConnections(user.id),
          getConnectedNetwork(user.id)
        ]);
        
        setRequests(reqs);
        setSuggestions(suggs);
        setConnections(conns);
      } catch (error) {
        console.error("Failed to load network data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNetworkData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto pb-10 w-full flex flex-col lg:flex-row gap-6">
      
      {/* Left Sidebar - Network Stats */}
      <div className="w-full lg:w-[300px] shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-[#0B1B3D] text-[16px]">Manage my network</h2>
          </div>
          <div className="flex flex-col">
            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left group">
              <div className="flex items-center gap-3 text-gray-600 group-hover:text-[#0052CC]">
                <Users className="w-5 h-5" />
                <span className="font-medium text-[15px]">Connections</span>
              </div>
              <span className="text-gray-500 font-medium">{connections.length}</span>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left group">
              <div className="flex items-center gap-3 text-gray-600 group-hover:text-[#0052CC]">
                <UserPlus className="w-5 h-5" />
                <span className="font-medium text-[15px]">Pending Requests</span>
              </div>
              <span className="text-gray-500 font-medium">{requests.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Connection Requests */}
        {requests.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bold text-[#0B1B3D]">Invitations ({requests.length})</h2>
              <button className="text-[#0052CC] font-bold text-[14px] hover:underline">Manage</button>
            </div>
            <div className="flex flex-col gap-3">
              {requests.map(req => (
                <ConnectionRequestCard key={req.id} request={req} />
              ))}
            </div>
          </div>
        )}

        {/* Suggested Connections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-bold text-[#0B1B3D]">Suggested for you</h2>
          </div>
          
          {suggestions.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Users className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">No new suggestions at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {suggestions.map(profile => (
                <ConnectionCard key={profile.id} profile={profile} currentUserId={user?.id || ""} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
