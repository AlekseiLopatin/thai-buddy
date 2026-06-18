"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { useProgress } from "@/lib/progress";
import { useAuth } from "@/lib/auth";
import {
  acceptFriendRequest,
  incomingRequests,
  leaderboard,
  PublicProfile,
  searchUsers,
  sendFriendRequest,
} from "@/lib/db";

export default function Leaderboard() {
  const { state, hydrated } = useProgress();
  const { configured, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !configured && (!state.name || !state.placed)) router.replace("/");
  }, [hydrated, configured, state.name, state.placed, router]);

  if (!hydrated) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-5">
        <h1 className="mb-1 text-2xl font-extrabold">🏆 Friends</h1>
        {configured && user ? (
          <CloudFriends />
        ) : (
          <DemoFriends xp={state.xp} name={state.name} />
        )}
      </main>
      <BottomNav />
    </div>
  );
}

/* ------------------------- Supabase-backed friends ------------------------- */

function CloudFriends() {
  const { user } = useAuth();
  const { username } = useProgress();
  const [board, setBoard] = useState<PublicProfile[]>([]);
  const [requests, setRequests] = useState<PublicProfile[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PublicProfile[]>([]);
  const [pendingSent, setPendingSent] = useState<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    setBoard(await leaderboard());
    setRequests(await incomingRequests());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Debounced username search.
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => setResults(await searchUsers(query)), 300);
    return () => clearTimeout(t);
  }, [query]);

  async function add(id: string) {
    await sendFriendRequest(id);
    setPendingSent((s) => new Set(s).add(id));
  }
  async function accept(id: string) {
    await acceptFriendRequest(id);
    refresh();
  }

  return (
    <>
      <p className="mb-4 text-sm text-muted">Add friends by username and compare XP.</p>

      {/* search */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by username…"
        className="mb-3 w-full rounded-2xl border-2 border-line px-4 py-3 outline-none focus:border-brand"
      />
      {results.length > 0 && (
        <ul className="mb-5 flex flex-col gap-2">
          {results.map((u) => (
            <li key={u.id} className="flex items-center gap-3 rounded-2xl border-2 border-line px-4 py-2">
              <span className="text-2xl">{u.avatar_emoji ?? "🧑‍🎓"}</span>
              <span className="flex-1 font-bold">{u.username ?? u.display_name}</span>
              <button
                onClick={() => add(u.id)}
                disabled={pendingSent.has(u.id)}
                className="btn-3d rounded-xl border-brand-dark bg-brand px-3 py-1.5 text-sm font-extrabold text-white disabled:opacity-50"
              >
                {pendingSent.has(u.id) ? "Sent" : "Add"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* incoming requests */}
      {requests.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-extrabold uppercase text-muted">Friend requests</h2>
          <ul className="flex flex-col gap-2">
            {requests.map((u) => (
              <li key={u.id} className="flex items-center gap-3 rounded-2xl border-2 border-sky bg-sky/10 px-4 py-2">
                <span className="text-2xl">{u.avatar_emoji ?? "🧑‍🎓"}</span>
                <span className="flex-1 font-bold">{u.username ?? u.display_name}</span>
                <button
                  onClick={() => accept(u.id)}
                  className="btn-3d rounded-xl border-sky-dark bg-sky px-3 py-1.5 text-sm font-extrabold text-white"
                  style={{ borderColor: "#1899d6" }}
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* leaderboard */}
      <h2 className="mb-2 text-sm font-extrabold uppercase text-muted">Weekly XP</h2>
      <ol className="flex flex-col gap-2">
        {board.map((r, i) => (
          <Row
            key={r.id}
            rank={i + 1}
            name={r.username ?? r.display_name ?? "?"}
            emoji={r.avatar_emoji ?? "🧑‍🎓"}
            xp={r.xp}
            you={r.id === user?.id}
          />
        ))}
        {board.length === 0 && (
          <li className="rounded-2xl border-2 border-line px-4 py-6 text-center text-muted">
            No friends yet — search above to add some, or share your username.
          </li>
        )}
      </ol>
      {board.length <= 1 && board.length > 0 && (
        <p className="mt-3 text-center text-xs text-muted">It&apos;s just you so far — add a friend to compete!</p>
      )}
      {username && (
        <p className="mt-4 text-center text-xs text-muted">
          Share your username: <b className="text-ink">{username}</b>
        </p>
      )}
    </>
  );
}

/* ------------------------- local demo (no Supabase) ------------------------- */

function DemoFriends({ xp, name }: { xp: number; name: string | null }) {
  const rows = [
    { name: name ?? "You", xp, emoji: "🧑‍🎓", you: true },
    { name: "Nok", xp: 240, emoji: "🦊", you: false },
    { name: "Ploy", xp: 120, emoji: "🐱", you: false },
    { name: "Som", xp: 60, emoji: "🐸", you: false },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <>
      <p className="mb-5 text-sm text-muted">
        Demo leaderboard. Add Supabase keys to enable real accounts &amp; friends.
      </p>
      <ol className="flex flex-col gap-2">
        {rows.map((r, i) => (
          <Row key={r.name + i} rank={i + 1} name={r.name} emoji={r.emoji} xp={r.xp} you={r.you} />
        ))}
      </ol>
    </>
  );
}

function Row({
  rank,
  name,
  emoji,
  xp,
  you,
}: {
  rank: number;
  name: string;
  emoji: string;
  xp: number;
  you: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 ${
        you ? "border-brand bg-brand-soft" : "border-line bg-white"
      }`}
    >
      <span className="w-6 text-center text-lg font-extrabold text-muted">{rank}</span>
      <span className="text-2xl">{emoji}</span>
      <span className="flex-1 font-bold">
        {name} {you && <span className="text-xs text-brand-dark">(you)</span>}
      </span>
      <span className="font-extrabold text-gold">{xp} XP</span>
    </li>
  );
}
