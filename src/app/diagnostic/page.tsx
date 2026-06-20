"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { WORDS } from "@/data/words";
import { useProgress } from "@/lib/progress";
import { Level, LEVELS, Word } from "@/lib/types";
import { speakThai } from "@/lib/exercises";
import { displayThai } from "@/lib/polite";

interface Question {
  word: Word;
  options: string[]; // english options
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// Two questions per level, easy → hard.
function buildQuestions(): Question[] {
  const qs: Question[] = [];
  for (let lvl = 1 as Level; lvl <= 5; lvl = (lvl + 1) as Level) {
    const pool = shuffle(WORDS.filter((w) => w.level === lvl)).slice(0, 2);
    for (const word of pool) {
      const wrong = shuffle(WORDS.filter((w) => w.id !== word.id))
        .slice(0, 3)
        .map((w) => w.en);
      qs.push({ word, options: shuffle([word.en, ...wrong]) });
    }
  }
  return qs;
}

function placementFor(score: number): Level {
  if (score <= 2) return 1;
  if (score <= 4) return 2;
  if (score <= 6) return 3;
  if (score <= 8) return 4;
  return 5;
}

export default function Diagnostic() {
  const router = useRouter();
  const { state, setPlacement } = useProgress();
  const questions = useMemo(() => buildQuestions(), []);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState<Level | null>(null);

  const q = questions[idx];

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    const correct = opt === q.word.en;
    const newScore = score + (correct ? 1 : 0);
    setScore(newScore);
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setDone(placementFor(newScore));
      } else {
        setIdx(idx + 1);
        setPicked(null);
      }
    }, 700);
  }

  if (done) {
    const lvl = LEVELS.find((l) => l.id === done)!;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="text-7xl">🎯</span>
        <div>
          <p className="text-muted">You scored {score}/{questions.length}</p>
          <h1 className="text-3xl font-extrabold">{lvl.name}</h1>
          <p className="mt-1 text-muted">{lvl.blurb}</p>
        </div>
        <button
          onClick={() => {
            setPlacement(done);
            router.replace("/learn");
          }}
          className="btn-3d w-full max-w-xs rounded-2xl border-brand-dark bg-brand px-6 py-3 text-lg font-extrabold text-on-accent"
        >
          Start learning →
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-5 py-6">
      {/* progress */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-brand transition-all"
          style={{ width: `${(idx / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <h2 className="text-center text-lg font-bold text-muted">
          What does this word mean?
        </h2>
        <button
          onClick={() => speakThai(displayThai(q.word, state.gender).thai)}
          className="flex flex-col items-center gap-1 rounded-3xl border-2 border-line px-10 py-6 active:scale-95"
          title="Tap to hear it"
        >
          <span className="font-thai text-5xl font-bold">{displayThai(q.word, state.gender).thai}</span>
          <span className="text-sm text-muted">{displayThai(q.word, state.gender).roman} 🔊</span>
        </button>

        <div className="grid w-full grid-cols-1 gap-3">
          {q.options.map((opt) => {
            const isPicked = picked === opt;
            const isCorrect = opt === q.word.en;
            let cls = "border-line bg-surface";
            if (picked) {
              if (isCorrect) cls = "border-brand bg-brand-soft text-brand";
              else if (isPicked) cls = "border-danger bg-error-soft text-danger";
              else cls = "border-line bg-surface opacity-60";
            }
            return (
              <button
                key={opt}
                onClick={() => choose(opt)}
                disabled={!!picked}
                className={`btn-3d rounded-2xl border-2 px-4 py-3 text-lg font-bold capitalize ${cls}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
