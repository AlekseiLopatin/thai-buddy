import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

/** OAuth / email-confirmation redirect target: exchanges the code for a session. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/learn";
  const providerError = searchParams.get("error_description") ?? searchParams.get("error");

  const fail = (reason: string) =>
    NextResponse.redirect(`${origin}/?auth_error=${encodeURIComponent(reason)}`);

  if (providerError) return fail(providerError);
  if (!code) return fail("No code returned from provider");

  const supabase = await getServerSupabase();
  if (!supabase) return fail("Supabase not configured on the server");

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return fail(error.message);

  return NextResponse.redirect(`${origin}${next}`);
}
