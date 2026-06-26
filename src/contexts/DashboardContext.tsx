"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DashboardContextType {
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (isOpen: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // We will check onboarding dynamically based on the profile data from Supabase

  useEffect(() => {
    async function checkVerificationLock() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('account_type, verified, created_at')
        .eq('id', session.user.id)
        .single();
        
      // If no profile or no account_type, redirect to onboarding
      if (error || !profile || !profile.account_type) {
         if (!pathname.includes("/auth/onboarding")) {
           router.push("/auth/onboarding");
         }
         return;
      }
        
      if (profile && profile.account_type === 'professional' && !profile.verified) {
        const createdAt = new Date(profile.created_at).getTime();
        const now = Date.now();
        const daysSinceCreation = (now - createdAt) / (1000 * 60 * 60 * 24);
        
        if (daysSinceCreation > 7) {
          const { data: request } = await supabase
            .from('verification_requests')
            .select('status')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
            
          if (!request || request.status === 'Rejected') {
             setIsLocked(true);
          } else {
             setIsLocked(false);
          }
        }
      }
    }
    
    checkVerificationLock();
  }, [pathname]);

  if (isLocked && pathname !== '/dashboard/verify') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F9FAFB] z-[9999] fixed inset-0">
         <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-sm border border-red-100">
           <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <ShieldAlert className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-bold mb-2 text-[#0B1B3D]">Action Required</h2>
           <p className="text-gray-500 mb-6">Your 7-day grace period to submit verification documents has expired. Your account is temporarily locked.</p>
           <button 
             onClick={() => router.push('/dashboard/verify')} 
             className="bg-[#0052CC] text-white px-6 py-3 rounded-xl font-bold w-full hover:bg-blue-700 transition-colors"
           >
             Verify Identity to Unlock
           </button>
         </div>
      </div>
    );
  }

  return (
    <DashboardContext.Provider value={{ isMobileSidebarOpen, setMobileSidebarOpen }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
