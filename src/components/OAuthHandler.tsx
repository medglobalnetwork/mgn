"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Detects OAuth tokens in the URL (from Supabase redirect fallback)
 * and forwards them to /auth/onboarding where the Supabase client can process them.
 *
 * This handles the case where Supabase can't redirect to /auth/callback
 * (not configured in dashboard) and falls back to the Site URL (/).
 */
export default function OAuthHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    const search = window.location.search;

    // Case 1: Hash fragment has access_token (implicit flow fallback)
    // e.g. /#access_token=xxx&refresh_token=yyy&...
    if (hash && hash.includes("access_token")) {
      const target = `/auth/onboarding${hash}`;
      // Clean the URL first to prevent loops
      window.history.replaceState({}, "", target);
      router.push(target);
      return;
    }

    // Case 2: Query param has code (PKCE flow fallback)
    // e.g. /?code=xxx
    if (search && search.includes("code=")) {
      const target = `/auth/callback${search}`;
      window.history.replaceState({}, "", target);
      router.push(target);
      return;
    }
  }, [pathname, router]);

  return null;
}
