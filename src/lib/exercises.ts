import { WORDS } from "@/data/words";
import { Word } from "./types";

export type Exercise =
  | { kind: "pickImage"; word: Word; options: Word[] } // see Thai → choose picture
  | { kind: "pickEnglish"; word: Word; options: Word[] } // see picture+Thai → choose meaning
  | { kind: "pickThai"; word: Word; options: Word[] } // see English → choose Thai
  | { kind: "listen"; word: Word; options: Word[] }; // hear Thai → choose Thai word

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick `n` distractor words, preferring the same category, then any. */
function distractors(word: Word, n: number): Word[] {
  const sameCat = WORDS.filter((w) => w.id !== word.id && w.category === word.category);
  const others = WORDS.filter((w) => w.id !== word.id && w.category !== word.category);
  return shuffle([...shuffle(sameCat), ...shuffle(others)]).slice(0, n);
}

function options(word: Word): Word[] {
  return shuffle([word, ...distractors(word, 3)]);
}

const KINDS: Exercise["kind"][] = ["pickImage", "pickEnglish", "pickThai", "listen"];

/** Build a varied, shuffled exercise set for a lesson's words. */
export function buildExercises(words: Word[]): Exercise[] {
  const exercises: Exercise[] = [];
  words.forEach((word, i) => {
    // First touch of a word: recognize the picture. Second: a rotating kind.
    exercises.push({ kind: "pickImage", word, options: options(word) });
    const kind = KINDS[(i + 1) % KINDS.length];
    exercises.push({ kind, word, options: options(word) } as Exercise);
  });
  return shuffle(exercises);
}

let thaiVoice: SpeechSynthesisVoice | null = null;

function pickThaiVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (thaiVoice) return thaiVoice;
  const voices = window.speechSynthesis.getVoices();
  thaiVoice = voices.find((v) => v.lang?.toLowerCase().startsWith("th")) ?? null;
  return thaiVoice;
}

/** Speak Thai text via the browser. No-op (returns false) if unsupported. */
export function speakThai(text: string): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "th-TH";
  const v = pickThaiVoice();
  if (v) u.voice = v;
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
  return true;
}
