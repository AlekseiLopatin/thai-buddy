"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import Quiz, { QuizQuestion } from "@/components/Quiz";
import { useProgress } from "@/lib/progress";
import { CONSONANTS, Letter, TONES, VOWELS } from "@/data/alphabet";
import { speakThai } from "@/lib/exercises";

type Mode = null | "consonants" | "vowels" | "tones";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// "Which sound is this letter?" — 4 options, distractors with distinct sounds.
function letterQuestions(letters: Letter[], count: number): QuizQuestion[] {
  return shuffle(letters)
    .slice(0, count)
    .map((l) => {
      const distractors = shuffle(letters.filter((x) => x.sound !== l.sound))
        .slice(0, 3)
        .map((x) => x.sound);
      const options = shuffle([l.sound, ...distractors]).map((s) => ({
        id: s,
        label: s,
        correct: s === l.sound,
      }));
      return {
        id: l.id,
        title: "Which sound does this letter make?",
        main: l.char,
        mainThai: true,
        sub: `${l.name} 🔊`,
        speak: l.exampleThai,
        options,
      };
    });
}

function toneQuestions(): QuizQuestion[] {
  return shuffle(TONES).map((t) => ({
    id: t.id,
    title: "Which tone is this?",
    main: t.exampleThai,
    mainThai: true,
    sub: `${t.exampleRoman} · ${t.exampleEn} 🔊`,
    speak: t.exampleThai,
    options: shuffle(TONES).map((o) => ({ id: o.id, label: o.name, correct: o.id === t.id })),
  }));
}

export default function LettersPage() {
  const { state, hydrated } = useProgress();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    if (hydrated && (!state.name || !state.placed)) router.replace("/");
  }, [hydrated, state.name, state.placed, router]);

  if (!hydrated || !state.placed) return null;

  if (mode === "consonants")
    return <Quiz title="Consonants" lessonId="letters-consonants" questions={letterQuestions(CONSONANTS, 8)} onExit={() => setMode(null)} onFinish={() => setMode(null)} />;
  if (mode === "vowels")
    return <Quiz title="Vowels" lessonId="letters-vowels" questions={letterQuestions(VOWELS, 8)} onExit={() => setMode(null)} onFinish={() => setMode(null)} />;
  if (mode === "tones")
    return <Quiz title="Tone trainer" lessonId="letters-tones" questions={toneQuestions()} onExit={() => setMode(null)} onFinish={() => setMode(null)} />;

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-5">
        <h1 className="mb-1 text-2xl font-extrabold">ก Thai script</h1>
        <p className="mb-6 text-sm text-muted">
          Learn the letters with their English sounds, then train the 5 tones.
        </p>

        {/* Consonants */}
        <Section
          title="Consonants"
          subtitle={`all ${CONSONANTS.length} consonants`}
          onPractice={() => setMode("consonants")}
        >
          {CONSONANTS.map((l) => (
            <LetterCard key={l.id} l={l} />
          ))}
        </Section>

        {/* Vowels */}
        <Section
          title="Vowels"
          subtitle={`${VOWELS.length} key vowels`}
          onPractice={() => setMode("vowels")}
        >
          {VOWELS.map((l) => (
            <LetterCard key={l.id} l={l} />
          ))}
        </Section>

        {/* Tones */}
        <div className="mb-4 mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold">Tones</h2>
            <p className="text-sm text-muted">Thai has 5 tones — same syllable, different meaning</p>
          </div>
          <button
            onClick={() => setMode("tones")}
            className="btn-3d rounded-xl border-brand-dark bg-brand px-4 py-2 text-sm font-extrabold text-on-accent"
          >
            Train
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {TONES.map((t) => (
            <button
              key={t.id}
              onClick={() => speakThai(t.exampleThai)}
              className="flex items-center gap-3 rounded-2xl border-2 border-line bg-surface px-4 py-3 text-left active:scale-[0.99]"
            >
              <span className="font-thai text-3xl font-bold">{t.exampleThai}</span>
              <div className="flex-1">
                <p className="font-extrabold">
                  {t.name} <span className="font-normal text-muted">· {t.thaiName}</span>
                </p>
                <p className="text-xs text-muted">{t.mark}</p>
                <p className="text-xs text-muted">{t.exampleRoman} — {t.exampleEn} 🔊</p>
              </div>
            </button>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

function Section({
  title,
  subtitle,
  onPractice,
  children,
}: {
  title: string;
  subtitle: string;
  onPractice: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold">{title}</h2>
          <p className="text-sm text-muted">{subtitle}</p>
        </div>
        <button
          onClick={onPractice}
          className="btn-3d rounded-xl border-brand-dark bg-brand px-4 py-2 text-sm font-extrabold text-on-accent"
        >
          Practice
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </section>
  );
}

function LetterCard({ l }: { l: Letter }) {
  return (
    <button
      onClick={() => speakThai(l.exampleThai)}
      className="flex items-center gap-3 rounded-2xl border-2 border-line bg-surface px-3 py-2 text-left active:scale-[0.98]"
    >
      <span className="font-thai text-3xl font-bold leading-none">{l.char}</span>
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold">{l.sound}</p>
        <p className="truncate text-xs text-muted">{l.hint}</p>
        <p className="truncate text-xs text-muted">
          <span className="font-thai">{l.exampleThai}</span> {l.exampleEn}
        </p>
      </div>
    </button>
  );
}
