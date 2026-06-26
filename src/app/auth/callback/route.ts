import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

/**
 * GET /auth/callback
 * 
 * Handles Supabase OAuth callback in two modes:
 * 
 * 1. PKCE flow (code in query params): Supabase redirects to
 *    /auth/callback?code=xxx — we exchange code for session server-side.
 * 
 * 2. Implicit flow (tokens in hash fragment): Supabase redirects to
 *    /auth/callback#access_token=xxx — hash is client-only, so we serve
 *    a tiny page that redirects to /auth/onboarding with the hash intact.
 * 
 * Also handles error cases from Supabase (error, error_description params).
 */
export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const origin = requestUrl.origin;

  console.log("[auth/callback] Hit:", {
    url: requestUrl.href,
    hasCode: !!code,
    error,
    errorDescription,
    origin,
  });

  // If Supabase returned an error
  if (error) {
    console.error("[auth/callback] OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  // PKCE flow: exchange code for session
  if (code) {
    console.log("[auth/callback] Exchanging code for session...");
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("[auth/callback] Code exchange failed:", exchangeError.message);
      return NextResponse.redirect(
        `${origin}/auth/login?error=${encodeURIComponent("Session exchange failed. Please try again.")}`
      );
    }

    console.log("[auth/callback] Session established for:", data.user?.email);
    return NextResponse.redirect(`${origin}/auth/onboarding`);
  }

  // No code, no error — likely implicit flow or direct hit.
  // Check if there are hash fragments (tokens) in the URL.
  // Hash fragments are NOT sent to the server, so we can't see them here.
  // Serve a client-side page that will redirect to onboarding with the hash.
  console.log("[auth/callback] No code found — serving client redirect page");
  
  const html = `
<!DOCTYPE html>
<html>
<head><title>Signing you in...</title></head>
<body>
  <p>Signing you in...</p>
  <script>
    // Hash fragments are client-side only — pass them to onboarding
    if (window.location.hash) {
      console.log("[OAuth callback] Forwarding hash to onboarding:", window.location.hash);
      window.location.replace('/auth/onboarding' + window.location.hash);
    } else {
      // No hash — just go to onboarding (session may already be established)
      console.log("[OAuth callback] No hash found, going to onboarding");
      window.location.replace('/auth/onboarding');
    }
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
