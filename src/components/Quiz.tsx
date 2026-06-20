"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@/lib/progress";
import { speakThai } from "@/lib/exercises";

export interface QuizOption {
  id: string;
  label: string;
  thai?: boolean; // render label in the Thai font
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  title: string; // instruction
  main: string; // the big prompt (letter, word, etc.)
  mainThai?: boolean;
  sub?: string; // small line under the prompt
  speak?: string; // Thai text to speak when the prompt is tapped/shown
  options: QuizOption[];
}

export default function Quiz({
  title,
  lessonId,
  questions,
  onExit,
  onFinish,
}: {
  title: string;
  lessonId: string;
  questions: QuizQuestion[];
  onExit: () => void;
  onFinish: () => void;
}) {
  const { completeLesson } = useProgress();
  const [queue, setQueue] = useState(questions);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctFirstTry, setCorrectFirstTry] = useState(0);
  const attempted = useRef<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const q = queue[pos];

  useEffect(() => {
    if (q?.speak) speakThai(q.speak);
  }, [q]);

  if (done) {
    const xp = 10 + correctFirstTry * 2;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="text-7xl">🎓</span>
        <h1 className="text-3xl font-extrabold">Nice work!</h1>
        <p className="text-muted">+{xp} XP</p>
        <button
          onClick={() => {
            completeLesson(lessonId, xp);
            onFinish();
          }}
          className="btn-3d w-full max-w-xs rounded-2xl border-brand-dark bg-brand px-6 py-3 text-lg font-extrabold text-on-accent"
        >
          Continue →
        </button>
      </main>
    );
  }

  const correctOpt = q.options.find((o) => o.correct)!;
  const isCorrect = picked === correctOpt.id;

  function check() {
    if (picked === null) return;
    setChecked(true);
    const first = !attempted.current.has(q.id);
    if (first) attempted.current.add(q.id);
    if (picked === correctOpt.id) {
      if (first) setCorrectFirstTry((c) => c + 1);
    } else {
      setQueue((arr) => [...arr, q]); // recycle until mastered
    }
  }

  function next() {
    if (pos + 1 >= queue.length) setDone(true);
    else {
      setPos(pos + 1);
      setPicked(null);
      setChecked(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-4 py-4">
        <button onClick={onExit} className="text-2xl text-muted" aria-label="Exit">✕</button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${(pos / queue.length) * 100}%` }} />
        </div>
      </div>
      <p className="mx-auto -mt-2 w-full max-w-xl px-5 text-xs font-bold uppercase tracking-wide text-muted">
        {title}
      </p>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5">
        <div className="flex flex-col items-center gap-4 py-8">
          <h2 className="text-center text-lg font-bold text-muted">{q.title}</h2>
          <button
            onClick={() => q.speak && speakThai(q.speak)}
            className="flex flex-col items-center gap-1 rounded-3xl border-2 border-line px-12 py-6 active:scale-95"
          >
            <span className={`text-6xl font-bold ${q.mainThai ? "font-thai" : ""}`}>{q.main}</span>
            {q.sub && <span className="text-sm text-muted">{q.sub}</span>}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 pb-4">
          {q.options.map((opt) => {
            const isPicked = picked === opt.id;
            let cls = "border-line bg-surface";
            if (checked) {
              if (opt.correct) cls = "border-brand bg-brand-soft";
              else if (isPicked) cls = "border-danger bg-error-soft";
              else cls = "border-line bg-surface opacity-50";
            } else if (isPicked) cls = "border-brand bg-brand-soft";
            return (
              <button
                key={opt.id}
                onClick={() => !checked && setPicked(opt.id)}
                disabled={checked}
                className={`btn-3d rounded-2xl border-2 px-4 py-3 text-lg font-bold ${opt.thai ? "font-thai text-2xl" : ""} ${cls}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </main>

      <footer className={`sticky bottom-0 border-t-2 ${checked ? (isCorrect ? "border-brand bg-brand-soft" : "border-danger bg-error-soft") : "border-line"}`}>
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4 px-5 py-4">
          {checked ? (
            <span className={`font-extrabold ${isCorrect ? "text-brand-dark" : "text-danger"}`}>
              {isCorrect ? "Correct! 🎉" : `Answer: ${correctOpt.label}`}
            </span>
          ) : (
            <span className="text-sm text-muted">Pick an answer</span>
          )}
          <button
            onClick={checked ? next : check}
            disabled={!checked && picked === null}
            className="btn-3d rounded-2xl border-brand-dark bg-brand px-8 py-3 font-extrabold text-on-accent"
          >
            {checked ? "Continue" : "Check"}
          </button>
        </div>
      </footer>
    </div>
  );
}
