"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LessonRunner from "@/components/LessonRunner";
import { WORD_BY_ID } from "@/data/words";
import { dueWordIds, useProgress } from "@/lib/progress";
import { Word } from "@/lib/types";

const MAX_REVIEW = 12;

export default function ReviewPage() {
  const { state, hydrated } = useProgress();
  const router = useRouter();

  // Snapshot the due list once, *after* hydration, so it reflects saved progress
  // and doesn't shift as SRS updates mid-session.
  const [words, setWords] = useState<Word[] | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (!state.name || !state.placed) {
      router.replace("/");
      return;
    }
    if (words === null) {
      const ids = dueWordIds(state.srs).slice(0, MAX_REVIEW);
      setWords(ids.map((id) => WORD_BY_ID[id]).filter(Boolean));
    }
  }, [hydrated, state.name, state.placed, state.srs, words, router]);

  if (!hydrated || words === null) return null;

  if (words.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-7xl">✅</span>
        <h1 className="text-2xl font-extrabold">Nothing to review yet</h1>
        <p className="text-muted">Finish a few lessons and come back — words you learn are scheduled for spaced review.</p>
        <Link href="/learn" className="btn-3d rounded-2xl border-brand-dark bg-brand px-6 py-3 font-extrabold text-on-accent">
          Back to map
        </Link>
      </main>
    );
  }

  // Review goes straight to practice — no teach phase for words you've already met.
  return <LessonRunner words={words} title="Spaced review" teach={false} />;
}
