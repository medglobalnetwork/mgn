"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface DashboardContextType {
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (isOpen: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user has completed onboarding
    const isCompleted = localStorage.getItem("mgn_onboarding_completed");
    if (!isCompleted && !pathname.includes("/auth/onboarding")) {
      router.push("/auth/onboarding");
    }
  }, [pathname, router]);

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
