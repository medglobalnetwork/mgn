"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * Detects OAuth tokens in the URL (from Supabase redirect fallback)
 * and forwards them to the proper handler.
 *
 * When Supabase can't find the redirect URL in its allowlist, it falls
 * back to the Site URL (/). The tokens end up as:
 * - Hash: /#access_token=xxx&refresh_token=yyy (implicit flow)
 * - Query: /?code=xxx (PKCE flow)
 * - Query: /?error=xxx&error_description=yyy (OAuth error)
 *
 * This component catches ALL these cases on ANY page and redirects.
 */
export default function OAuthHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const processed = useRef(false);

  useEffect(() => {
    // Prevent double-processing
    if (processed.current) return;

    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    const search = window.location.search;

    // Case 1: Hash fragment has access_token (implicit flow fallback)
    if (hash && hash.includes("access_token")) {
      processed.current = true;
      console.log("[OAuthHandler] Detected tokens in hash, forwarding to /auth/onboarding");
      // Use window.location for hash preservation (router.push may strip hashes)
      window.location.href = `/auth/onboarding${hash}`;
      return;
    }

    // Case 2: Query param has code (PKCE flow fallback)
    const code = searchParams.get("code");
    if (code) {
      processed.current = true;
      console.log("[OAuthHandler] Detected auth code in query, forwarding to /auth/callback");
      router.push(`/auth/callback?code=${code}`);
      return;
    }

    // Case 3: OAuth error in query params
    const error = searchParams.get("error");
    if (error) {
      processed.current = true;
      const desc = searchParams.get("error_description") || error;
      console.log("[OAuthHandler] Detected OAuth error:", desc);
      router.push(`/auth/login?error=${encodeURIComponent(desc)}`);
      return;
    }
  }, [pathname, searchParams, router]);

  return null;
}
