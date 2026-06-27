"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Redirects authenticated users away from public-only pages:
 * - `/` (landing page) → `/dashboard`
 * - `/auth/login` → `/dashboard`
 * - `/auth/signup` → `/dashboard`
 *
 * Waits for sessionResolved before deciding to avoid stale session redirects.
 */
export default function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { user, sessionResolved } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for auth to fully resolve before deciding
    if (!sessionResolved) return;
    if (!user) return;

    // If user is on a public page but is logged in → redirect to dashboard
    // DashboardContext handles onboarding check and redirects there if needed
    if (pathname === "/" || pathname === "/auth/login" || pathname === "/auth/signup") {
      router.replace("/dashboard");
    }
  }, [user, sessionResolved, pathname, router]);

  return <>{children}</>;
}
