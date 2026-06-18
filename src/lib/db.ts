import { getSupabase } from "./supabase/client";
import type { ProgressState } from "./progress";
import type { Level } from "./types";

/** Shape of a row in the `profiles` table. */
export interface ProfileRow {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_emoji: string | null;
  placed: boolean;
  level: number;
  xp: number;
  streak: number;
  last_active_date: string | null;
  daily_goal: number;
  today_date: string | null;
  today_xp: number;
  completed_lessons: string[] | null;
  srs: ProgressState["srs"] | null;
}

export interface PublicProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_emoji: string | null;
  xp: number;
}

/** Map a progress snapshot to the columns we persist (display_name = the name). */
export function stateToRow(userId: string, s: ProgressState): Partial<ProfileRow> {
  return {
    id: userId,
    display_name: s.name,
    placed: s.placed,
    level: s.level,
    xp: s.xp,
    streak: s.streak,
    last_active_date: s.lastActiveDate,
    daily_goal: s.dailyGoal,
    today_date: s.todayDate,
    today_xp: s.todayXp,
    completed_lessons: s.completedLessons,
    srs: s.srs,
  };
}

export function rowToState(row: ProfileRow): Partial<ProgressState> {
  return {
    name: row.display_name,
    placed: row.placed,
    level: (row.level as Level) ?? 1,
    xp: row.xp ?? 0,
    streak: row.streak ?? 0,
    lastActiveDate: row.last_active_date,
    dailyGoal: row.daily_goal ?? 30,
    todayDate: row.today_date,
    todayXp: row.today_xp ?? 0,
    completedLessons: row.completed_lessons ?? [],
    srs: row.srs ?? {},
  };
}

export async function loadProfile(userId: string): Promise<ProfileRow | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.from("profiles").select("*").eq("id", userId).maybeSingle();
  return (data as ProfileRow) ?? null;
}

export async function saveProgress(userId: string, s: ProgressState): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  await sb.from("profiles").update(stateToRow(userId, s)).eq("id", userId);
}

export async function setUsername(
  userId: string,
  username: string,
): Promise<{ error: string | null }> {
  const sb = getSupabase();
  if (!sb) return { error: "Not configured" };
  const clean = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
  if (clean.length < 3) return { error: "Username must be at least 3 characters" };
  const { error } = await sb.from("profiles").update({ username: clean }).eq("id", userId);
  if (error) {
    return { error: error.code === "23505" ? "That username is taken" : error.message };
  }
  return { error: null };
}

/* ----------------------------- friends ----------------------------- */

async function myId(): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user?.id ?? null;
}

export async function searchUsers(query: string): Promise<PublicProfile[]> {
  const sb = getSupabase();
  const me = await myId();
  if (!sb || !me || query.trim().length < 2) return [];
  const { data } = await sb
    .from("profiles")
    .select("id, username, display_name, avatar_emoji, xp")
    .ilike("username", `${query.trim().toLowerCase()}%`)
    .neq("id", me)
    .limit(10);
  return (data as PublicProfile[]) ?? [];
}

export interface Friendship {
  requester_id: string;
  addressee_id: string;
  status: "pending" | "accepted";
}

export async function sendFriendRequest(addresseeId: string): Promise<{ error: string | null }> {
  const sb = getSupabase();
  const me = await myId();
  if (!sb || !me) return { error: "Not signed in" };

  // If they already requested us, accept instead of creating a duplicate.
  const { data: reverse } = await sb
    .from("friendships")
    .select("requester_id")
    .eq("requester_id", addresseeId)
    .eq("addressee_id", me)
    .maybeSingle();
  if (reverse) return acceptFriendRequest(addresseeId);

  const { error } = await sb
    .from("friendships")
    .upsert(
      { requester_id: me, addressee_id: addresseeId, status: "pending" },
      { onConflict: "requester_id,addressee_id" },
    );
  return { error: error?.message ?? null };
}

export async function acceptFriendRequest(requesterId: string): Promise<{ error: string | null }> {
  const sb = getSupabase();
  const me = await myId();
  if (!sb || !me) return { error: "Not signed in" };
  const { error } = await sb
    .from("friendships")
    .update({ status: "accepted" })
    .eq("requester_id", requesterId)
    .eq("addressee_id", me);
  return { error: error?.message ?? null };
}

/** Incoming pending requests with the requester's public profile. */
export async function incomingRequests(): Promise<PublicProfile[]> {
  const sb = getSupabase();
  const me = await myId();
  if (!sb || !me) return [];
  const { data } = await sb
    .from("friendships")
    .select("requester:profiles!friendships_requester_id_fkey(id, username, display_name, avatar_emoji, xp)")
    .eq("addressee_id", me)
    .eq("status", "pending");
  return ((data ?? []).map((r: { requester: PublicProfile }) => r.requester).filter(Boolean)) as PublicProfile[];
}

/** Accepted friends + the current user, ready for a leaderboard (xp desc). */
export async function leaderboard(): Promise<PublicProfile[]> {
  const sb = getSupabase();
  const me = await myId();
  if (!sb || !me) return [];

  const { data: links } = await sb
    .from("friendships")
    .select("requester_id, addressee_id")
    .eq("status", "accepted");

  const friendIds = new Set<string>();
  for (const l of (links ?? []) as Friendship[]) {
    friendIds.add(l.requester_id === me ? l.addressee_id : l.requester_id);
  }
  const ids = [me, ...friendIds];

  const { data } = await sb
    .from("profiles")
    .select("id, username, display_name, avatar_emoji, xp")
    .in("id", ids);

  return ((data as PublicProfile[]) ?? []).sort((a, b) => b.xp - a.xp);
}
