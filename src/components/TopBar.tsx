"use client";

import { useProgress } from "@/lib/progress";
import { LEVELS } from "@/lib/types";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  const { state } = useProgress();
  const levelName = LEVELS.find((l) => l.id === state.level)?.name ?? "Beginner";

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-4 py-3">
        <span className="hidden truncate text-sm font-semibold text-muted sm:block">
          {levelName}
        </span>
        <div className="flex items-center gap-4 text-base font-bold">
          <span className="flex items-center gap-1" title="Daily streak">
            🔥 <span className="text-gold">{state.streak}</span>
          </span>
          <span className="flex items-center gap-1" title="Total XP">
            ⚡ <span className="text-gold">{state.xp}</span>
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
