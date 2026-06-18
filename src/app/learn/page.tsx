"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { dueWordIds, useProgress } from "@/lib/progress";
import { unitsForLevel } from "@/data/curriculum";

export default function Learn() {
  const { state, hydrated } = useProgress();
  const router = useRouter();

  // Guard: send unplaced/unnamed users back to onboarding.
  useEffect(() => {
    if (hydrated && (!state.name || !state.placed)) router.replace("/");
  }, [hydrated, state.name, state.placed, router]);

  if (!hydrated || !state.placed) return null;

  const units = unitsForLevel(state.level);
  const order = units.flatMap((u) => u.lessons.map((l) => l.id));
  const completed = new Set(state.completedLessons);

  const isUnlocked = (lessonId: string) => {
    const i = order.indexOf(lessonId);
    if (i <= 0) return true;
    return completed.has(order[i - 1]);
  };

  // Daily goal progress
  const goalPct = Math.min(100, Math.round((state.todayXp / state.dailyGoal) * 100));

  const dueCount = dueWordIds(state.srs).length;

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />

      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-5">
        {/* daily goal */}
        <div className="mb-6 rounded-2xl border border-line bg-white p-4">
          <div className="mb-2 flex items-center justify-between text-sm font-bold">
            <span>🎯 Daily goal</span>
            <span className="text-muted">
              {state.todayXp}/{state.dailyGoal} XP
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${goalPct}%` }} />
          </div>
        </div>

        {/* spaced repetition: surface due reviews */}
        {dueCount > 0 && (
          <Link
            href="/review"
            className="btn-3d mb-6 flex items-center justify-between rounded-2xl border-purple bg-purple px-4 py-3 text-white"
            style={{ borderColor: "#a855f7" }}
          >
            <span className="flex items-center gap-2 font-extrabold">🔁 Review</span>
            <span className="rounded-full bg-white/25 px-3 py-0.5 text-sm font-bold">
              {dueCount} word{dueCount > 1 ? "s" : ""} due
            </span>
          </Link>
        )}

        {units.map((unit) => (
          <section key={unit.id} className="mb-8">
            <div
              className="mb-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-white"
              style={{ backgroundColor: unit.color }}
            >
              <span className="text-2xl">{unit.lessons[0]?.emoji}</span>
              <div>
                <p className="text-xs font-semibold uppercase opacity-80">Level {unit.level}</p>
                <h2 className="text-lg font-extrabold">{unit.title}</h2>
              </div>
            </div>

            {/* lesson nodes, gently zig-zagged */}
            <div className="flex flex-col items-center gap-4">
              {unit.lessons.map((lesson, i) => {
                const isDone = completed.has(lesson.id);
                const unlocked = isUnlocked(lesson.id);
                const offset = ["translate-x-0", "translate-x-16", "-translate-x-16"][i % 3];
                return (
                  <div key={lesson.id} className={offset}>
                    <LessonNode
                      href={`/lesson/${lesson.id}`}
                      emoji={lesson.emoji}
                      done={isDone}
                      unlocked={unlocked}
                      color={unit.color}
                      label={lesson.title}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <p className="pb-4 text-center text-sm text-muted">
          More levels unlock as you climb. 🚀
        </p>
      </main>

      <BottomNav />
    </div>
  );
}

function LessonNode({
  href,
  emoji,
  done,
  unlocked,
  color,
  label,
}: {
  href: string;
  emoji: string;
  done: boolean;
  unlocked: boolean;
  color: string;
  label: string;
}) {
  const ring = done ? "#ffc800" : unlocked ? color : "#e5e5e5";
  const content = (
    <div className="flex flex-col items-center gap-1">
      <div
        className="btn-3d flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-sm"
        style={{
          backgroundColor: unlocked ? "white" : "#f3f3f3",
          border: `5px solid ${ring}`,
          borderBottomWidth: 8,
        }}
      >
        {done ? "⭐" : unlocked ? emoji : "🔒"}
      </div>
      <span className="text-xs font-bold text-muted">{label}</span>
    </div>
  );
  if (!unlocked) return <div className="opacity-70">{content}</div>;
  return (
    <Link href={href} aria-label={label}>
      {content}
    </Link>
  );
}
