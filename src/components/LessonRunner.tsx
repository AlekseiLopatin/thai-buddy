"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buildExercises, Exercise, speakThai } from "@/lib/exercises";
import { ReviewResult, useProgress } from "@/lib/progress";
import { Word } from "@/lib/types";

type Phase = "teach" | "quiz" | "done";

export default function LessonRunner({
  words,
  lessonId,
  title,
  teach,
}: {
  words: Word[];
  lessonId?: string;
  title: string;
  teach: boolean;
}) {
  const router = useRouter();
  const { completeLesson, recordReviews } = useProgress();

  const initialQueue = useMemo(() => buildExercises(words), [words]);

  const [phase, setPhase] = useState<Phase>(teach ? "teach" : "quiz");
  const [teachIdx, setTeachIdx] = useState(0);
  const [queue, setQueue] = useState<Exercise[]>(initialQueue);
  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  // First-attempt tracking drives both XP and spaced-repetition scheduling.
  const attempted = useRef<Set<string>>(new Set());
  const [results, setResults] = useState<ReviewResult[]>([]);
  const [done, setDone] = useState(false);

  const ex = queue[pos];

  // Speak on the listening prompt and when teaching a new word.
  useEffect(() => {
    if (phase === "quiz" && ex?.kind === "listen") speakThai(ex.word.thai);
  }, [phase, ex]);
  useEffect(() => {
    if (phase === "teach") speakThai(words[teachIdx]?.thai ?? "");
  }, [phase, teachIdx, words]);

  // ---- Teach phase (TEFL "presentation"): meet each word before practice ----
  if (phase === "teach") {
    const w = words[teachIdx];
    const last = teachIdx >= words.length - 1;
    return (
      <Shell title={title} top={<TeachProgress idx={teachIdx} total={words.length} />}>
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <p className="text-sm font-bold uppercase tracking-wide text-muted">New word</p>
          <button
            onClick={() => speakThai(w.thai)}
            className="flex flex-col items-center gap-3 rounded-3xl border-2 border-line px-10 py-8 active:scale-95"
          >
            <span className="text-7xl">{w.emoji}</span>
            <span className="font-thai text-4xl font-bold">{w.thai}</span>
            <span className="text-base text-muted">{w.roman} 🔊</span>
            <span className="text-xl font-extrabold capitalize">{w.en}</span>
          </button>
        </div>
        <Footer>
          <span className="text-sm text-muted">Tap the card to hear it</span>
          <PrimaryBtn
            onClick={() => (last ? setPhase("quiz") : setTeachIdx((i) => i + 1))}
          >
            {last ? "Start practice" : "Next"}
          </PrimaryBtn>
        </Footer>
      </Shell>
    );
  }

  // ---- Done ----
  if (done) {
    const firstTry = results;
    const correct = firstTry.filter((r) => r.correct).length;
    const xpEarned = 10 + correct * 2;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="text-7xl">🌟</span>
        <h1 className="text-3xl font-extrabold">Great job!</h1>
        <div className="flex gap-3">
          <Stat label="XP" value={`+${xpEarned}`} color="text-gold" />
          <Stat label="Accuracy" value={`${correct}/${firstTry.length}`} color="text-brand" />
        </div>
        <button
          onClick={() => {
            if (lessonId) completeLesson(lessonId, xpEarned);
            else completeLesson("__review__", xpEarned); // review still feeds XP/streak
            recordReviews(firstTry);
            router.replace("/learn");
          }}
          className="btn-3d w-full max-w-xs rounded-2xl border-brand-dark bg-brand px-6 py-3 text-lg font-extrabold text-on-accent"
        >
          Continue →
        </button>
      </main>
    );
  }

  const isCorrect = selected === ex.word.id;

  function check() {
    if (selected === null) return;
    setChecked(true);
    const correct = selected === ex.word.id;
    // Record only the first attempt of each word for XP + SRS.
    if (!attempted.current.has(ex.word.id)) {
      attempted.current.add(ex.word.id);
      setResults((r) => [...r, { wordId: ex.word.id, correct }]);
    }
    // Recycle missed items to the end of the queue (mastery, not punishment).
    if (!correct) {
      setQueue((q) => [...q, { ...ex, options: shuffle(ex.options) }]);
    }
  }

  function next() {
    if (pos + 1 >= queue.length) setDone(true);
    else {
      setPos(pos + 1);
      setSelected(null);
      setChecked(false);
    }
  }

  return (
    <Shell
      title={title}
      top={
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${(pos / queue.length) * 100}%` }}
          />
        </div>
      }
      onExit={() => router.replace("/learn")}
    >
      <Prompt ex={ex} />
      <Options ex={ex} selected={selected} checked={checked} onSelect={setSelected} />
      <Footer tone={checked ? (isCorrect ? "good" : "bad") : "neutral"}>
        {checked ? (
          <span className={`font-extrabold ${isCorrect ? "text-brand-dark" : "text-danger"}`}>
            {isCorrect ? "Nice! 🎉" : `Answer: ${ex.word.en}`}
          </span>
        ) : (
          <span className="text-sm text-muted">Pick an answer</span>
        )}
        {checked ? (
          <PrimaryBtn onClick={next}>Continue</PrimaryBtn>
        ) : (
          <PrimaryBtn onClick={check} disabled={selected === null}>
            Check
          </PrimaryBtn>
        )}
      </Footer>
    </Shell>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------- prompt + options ---------------- */

function Prompt({ ex }: { ex: Exercise }) {
  if (ex.kind === "pickImage") {
    return (
      <PromptShell title="Tap the matching picture">
        <button
          onClick={() => speakThai(ex.word.thai)}
          className="flex flex-col items-center gap-1 rounded-3xl border-2 border-line px-10 py-6 active:scale-95"
        >
          <span className="font-thai text-5xl font-bold">{ex.word.thai}</span>
          <span className="text-sm text-muted">{ex.word.roman} 🔊</span>
        </button>
      </PromptShell>
    );
  }
  if (ex.kind === "pickEnglish") {
    return (
      <PromptShell title="What does this mean?">
        <div className="flex flex-col items-center gap-2">
          <span className="text-7xl">{ex.word.emoji}</span>
          <span className="font-thai text-3xl font-bold">{ex.word.thai}</span>
        </div>
      </PromptShell>
    );
  }
  if (ex.kind === "pickThai") {
    return (
      <PromptShell title="Choose the Thai word">
        <div className="flex flex-col items-center gap-2">
          <span className="text-7xl">{ex.word.emoji}</span>
          <span className="text-3xl font-extrabold capitalize">{ex.word.en}</span>
        </div>
      </PromptShell>
    );
  }
  return (
    <PromptShell title="What did you hear?">
      <button
        onClick={() => speakThai(ex.word.thai)}
        className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-brand bg-brand-soft text-5xl active:scale-95"
        aria-label="Play audio"
      >
        🔊
      </button>
    </PromptShell>
  );
}

function Options({
  ex,
  selected,
  checked,
  onSelect,
}: {
  ex: Exercise;
  selected: string | null;
  checked: boolean;
  onSelect: (id: string) => void;
}) {
  const showImages = ex.kind === "pickImage";
  return (
    <div className={`grid gap-3 pb-4 ${showImages ? "grid-cols-2" : "grid-cols-1"}`}>
      {ex.options.map((opt: Word) => {
        const isPicked = selected === opt.id;
        const isAnswer = opt.id === ex.word.id;
        let cls = "border-line bg-surface";
        if (checked) {
          if (isAnswer) cls = "border-brand bg-brand-soft";
          else if (isPicked) cls = "border-danger bg-error-soft";
          else cls = "border-line bg-surface opacity-50";
        } else if (isPicked) {
          cls = "border-brand bg-brand-soft";
        }
        return (
          <button
            key={opt.id}
            onClick={() => !checked && onSelect(opt.id)}
            disabled={checked}
            className={`btn-3d flex flex-col items-center justify-center gap-1 rounded-2xl border-2 font-bold ${cls} ${
              showImages ? "py-4" : "px-4 py-3 text-lg"
            }`}
          >
            {/* Pictures always carry an English label so icons are never ambiguous. */}
            {ex.kind === "pickImage" && (
              <>
                <span className="text-5xl">{opt.emoji}</span>
                <span className="text-sm font-bold capitalize text-muted">{opt.en}</span>
              </>
            )}
            {ex.kind === "pickEnglish" && <span className="capitalize">{opt.en}</span>}
            {(ex.kind === "pickThai" || ex.kind === "listen") && (
              <span className="font-thai text-2xl">{opt.thai}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- chrome ---------------- */

function Shell({
  title,
  top,
  onExit,
  children,
}: {
  title: string;
  top: React.ReactNode;
  onExit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-4 py-4">
        <button
          onClick={onExit ?? (() => history.back())}
          className="text-2xl text-muted"
          aria-label="Exit"
        >
          ✕
        </button>
        {top}
      </div>
      <p className="mx-auto -mt-2 w-full max-w-xl px-5 text-xs font-bold uppercase tracking-wide text-muted">
        {title}
      </p>
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5">{children}</main>
    </div>
  );
}

function PromptShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h2 className="text-center text-lg font-bold text-muted">{title}</h2>
      {children}
    </div>
  );
}

function Footer({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "bad";
}) {
  const border =
    tone === "good" ? "border-brand bg-brand-soft" : tone === "bad" ? "border-danger bg-error-soft" : "border-line";
  return (
    <footer className={`sticky bottom-0 border-t-2 ${border}`}>
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4 px-5 py-4">
        {children}
      </div>
    </footer>
  );
}

function PrimaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-3d rounded-2xl border-brand-dark bg-brand px-8 py-3 font-extrabold text-on-accent"
    >
      {children}
    </button>
  );
}

function TeachProgress({ idx, total }: { idx: number; total: number }) {
  return (
    <div className="h-4 flex-1 overflow-hidden rounded-full bg-line">
      <div
        className="h-full rounded-full bg-gold transition-all"
        style={{ width: `${((idx + 1) / total) * 100}%` }}
      />
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl border-2 border-line px-6 py-3">
      <p className="text-xs font-bold uppercase text-muted">{label}</p>
      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
    </div>
  );
}
