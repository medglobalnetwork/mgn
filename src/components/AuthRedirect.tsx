"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

/**
 * Redirects authenticated users away from public-only pages:
 * - `/` (landing page) → `/dashboard` or `/auth/onboarding`
 * - `/auth/login` → `/dashboard`
 * - `/auth/signup` → `/dashboard`
 *
 * Also redirects unauthenticated users away from protected pages.
 */
export default function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || !user) return;

    // If user is on a public page but is logged in → redirect away
    if (pathname === "/" || pathname === "/auth/login" || pathname === "/auth/signup") {
      const redirectUser = async () => {
        // Check if profile exists and is complete
        const { data: profile } = await supabase
          .from("profiles")
          .select("account_type, onboarding_score")
          .eq("id", user.id)
          .maybeSingle();

        if (profile && profile.account_type && (profile.onboarding_score ?? 0) > 0) {
          router.replace("/dashboard");
        } else {
          router.replace("/auth/onboarding");
        }
      };
      redirectUser();
    }
  }, [user, loading, pathname, router]);

  return <>{children}</>;
}
