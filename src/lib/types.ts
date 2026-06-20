export type Level = 1 | 2 | 3 | 4 | 5;

/** Drives the polite sentence ending (ค่ะ vs ครับ). Default is female. */
export type Gender = "female" | "male";

export const LEVELS: { id: Level; name: string; blurb: string }[] = [
  { id: 1, name: "Absolute Beginner", blurb: "New to Thai — start with the basics" },
  { id: 2, name: "Newcomer", blurb: "You know a handful of words" },
  { id: 3, name: "Elementary", blurb: "You've studied some Thai" },
  { id: 4, name: "Intermediate", blurb: "You can hold a simple conversation" },
  { id: 5, name: "Advanced", blurb: "You're aiming for fluency" },
];

export interface Word {
  id: string;
  thai: string;
  roman: string; // romanized pronunciation
  en: string;
  emoji: string; // the "simple picture" (open-source glyph, not AI-generated)
  category: string;
  level: Level;
  isPhrase?: boolean; // multi-word phrase/sentence — skip picture-matching, favor recall
  /**
   * If set, this is a standalone utterance that takes a polite ending.
   * "statement" → ค่ะ/ครับ, "question" → คะ/ครับ (female forms differ by tone).
   */
  polite?: "statement" | "question";
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  level: Level;
  wordIds: string[];
}

export interface Unit {
  id: string;
  title: string;
  level: Level;
  color: string; // tailwind-ish hex used for the node ring
  lessons: Lesson[];
}
