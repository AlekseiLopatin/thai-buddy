"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { useProgress } from "@/lib/progress";
import { useAuth } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";
import GenderChoice from "@/components/GenderChoice";
import { ALL_LESSONS } from "@/data/curriculum";
import { LEVELS } from "@/lib/types";

export default function Profile() {
  const { state, hydrated, reset, username, setGender } = useProgress();
  const { configured, user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && (!state.name || !state.placed)) router.replace("/");
  }, [hydrated, state.name, state.placed, router]);

  if (!hydrated || !state.placed) return null;

  const level = LEVELS.find((l) => l.id === state.level)!;
  const totalLessons = ALL_LESSONS.length;

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-5">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-4xl">
            🧑‍🎓
          </span>
          <div>
            <h1 className="text-2xl font-extrabold">{state.name}</h1>
            <p className="text-muted">
              {username ? `@${username} · ` : ""}
              {level.name}
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <Card icon="🔥" value={state.streak} label="Day streak" />
          <Card icon="⚡" value={state.xp} label="Total XP" />
          <Card icon="✅" value={`${state.completedLessons.length}/${totalLessons}`} label="Lessons done" />
          <Card icon="🎯" value={`${state.dailyGoal}`} label="Daily goal (XP)" />
        </div>

        {/* appearance */}
        <div className="mb-4 flex items-center justify-between rounded-2xl border-2 border-line bg-surface px-4 py-3">
          <span className="font-bold">Appearance</span>
          <ThemeToggle />
        </div>

        {/* polite ending */}
        <div className="mb-6 rounded-2xl border-2 border-line bg-surface px-4 py-3">
          <p className="mb-2 font-bold">Polite ending</p>
          <GenderChoice value={state.gender} onChange={setGender} showNote={false} />
        </div>

        <div className="flex flex-col gap-3">
          {configured && user ? (
            <button
              onClick={async () => {
                await signOut();
                router.replace("/");
              }}
              className="btn-3d w-full rounded-2xl border-line bg-surface px-6 py-3 font-bold"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => {
                if (confirm("Reset all progress? This clears your local data.")) {
                  reset();
                  router.replace("/");
                }
              }}
              className="btn-3d w-full rounded-2xl border-line bg-surface px-6 py-3 font-bold text-danger"
            >
              Reset progress
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          {configured ? "Progress syncs to your account." : "Local mode — progress is stored on this device."}
        </p>
      </main>
      <BottomNav />
    </div>
  );
}

function Card({ icon, value, label }: { icon: string; value: string | number; label: string }) {
  return (
    <div className="rounded-2xl border-2 border-line bg-surface p-4">
      <p className="text-2xl">{icon}</p>
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
