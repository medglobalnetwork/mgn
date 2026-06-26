import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// GET /auth/callback#access_token=...&refresh_token=...
// Supabase OAuth redirects here with tokens in the hash fragment.
// But hash fragments are NOT sent to the server — they stay client-side.
// So we serve a tiny page that extracts the tokens and exchanges the session.
export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  // If Supabase returns a code (PKCE flow), exchange it
  if (code) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/auth/onboarding`);
    }
  }

  // For implicit flow (hash fragments), serve a client-side page that
  // reads the hash and forwards to /auth/onboarding
  const html = `
<!DOCTYPE html>
<html>
<head><title>Signing you in...</title></head>
<body>
  <p>Signing you in...</p>
  <script>
    // The hash fragments (#access_token=...&refresh_token=...) are already in the URL
    // Redirect to onboarding where the Supabase client will pick them up
    window.location.replace('/auth/onboarding' + window.location.hash);
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
