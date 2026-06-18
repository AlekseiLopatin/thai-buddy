import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True only when both Supabase env vars are present, so the app can fall back
 *  to local-only mode (localStorage, no accounts) during development. */
export const isSupabaseConfigured = Boolean(url && anonKey);

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

/** Singleton Supabase browser client, or null when not configured. */
export function getSupabase() {
  if (!isSupabaseConfigured) return null;
  if (!browserClient) {
    browserClient = createBrowserClient(url!, anonKey!);
  }
  return browserClient;
}
