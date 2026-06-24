"use client";

import { useEffect, useState } from "react";
import { Users, Briefcase, GraduationCap, ShieldCheck, Building2, UserPlus } from "lucide-react";
import CountUp from "@/components/CountUp";

interface StatsData {
  totalUsers: number;
  verifiedProfessionals: number;
  organizations: number;
  activeJobs: number;
  resources: number;
  communityMembers: number;
}

export default function DynamicStats() {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    verifiedProfessionals: 0,
    organizations: 0,
    activeJobs: 0,
    resources: 0,
    communityMembers: 0
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#183670] rounded-2xl py-10 px-8 text-white flex flex-col md:flex-row flex-wrap items-center justify-between gap-8 md:gap-4 shadow-xl">
      <div className="flex items-center gap-4">
        <UserPlus className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
        <div>
          <p className="text-2xl font-bold">
            {loading ? "..." : <CountUp end={stats.totalUsers} />}
          </p>
          <p className="text-xs text-blue-100/70">Total Registered<br/>Users</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-12 bg-white/10"></div>
      
      <div className="flex items-center gap-4">
        <Users className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
        <div>
          <p className="text-2xl font-bold">
            {loading ? "..." : <CountUp end={stats.verifiedProfessionals} />}
          </p>
          <p className="text-xs text-blue-100/70">Verified<br/>Professionals</p>
        </div>
      </div>

      <div className="hidden md:block w-px h-12 bg-white/10"></div>

      <div className="flex items-center gap-4">
        <Building2 className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
        <div>
          <p className="text-2xl font-bold">
            {loading ? "..." : <CountUp end={stats.organizations} />}
          </p>
          <p className="text-xs text-blue-100/70">Verified<br/>Organizations</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-12 bg-white/10"></div>
      
      <div className="flex items-center gap-4">
        <Briefcase className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
        <div>
          <p className="text-2xl font-bold">
            {loading ? "..." : <CountUp end={stats.activeJobs} />}
          </p>
          <p className="text-xs text-blue-100/70">Active<br/>Jobs</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-12 bg-white/10"></div>
      
      <div className="flex items-center gap-4">
        <GraduationCap className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
        <div>
          <p className="text-2xl font-bold">
            {loading ? "..." : <CountUp end={stats.resources} />}
          </p>
          <p className="text-xs text-blue-100/70">Learning<br/>Resources</p>
        </div>
      </div>
    </div>
  );
}
