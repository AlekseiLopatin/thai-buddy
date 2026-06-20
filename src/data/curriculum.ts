import { Lesson, Level, Unit, Word } from "@/lib/types";
import { WORDS } from "./words";

// Each category becomes a Unit; its words are chunked into lessons of ~3.
// Warm "Refined Ember" palette — gold, olive, bronze, terracotta (no bright colors).
const GOLD = "#d4a44b";
const OLIVE = "#7c9a52";
const BRONZE = "#9a8870";
const TERRA = "#b85042";

const UNIT_META: Record<string, { emoji: string; color: string }> = {
  Greetings: { emoji: "👋", color: GOLD },
  Numbers: { emoji: "🔢", color: OLIVE },
  Colors: { emoji: "🎨", color: BRONZE },
  Food: { emoji: "🍜", color: TERRA },
  Family: { emoji: "👨‍👩‍👧", color: GOLD },
  Animals: { emoji: "🐘", color: OLIVE },
  Places: { emoji: "🏠", color: BRONZE },
  Transport: { emoji: "🚆", color: TERRA },
  Nature: { emoji: "🌳", color: OLIVE },
  Feelings: { emoji: "😊", color: GOLD },
  Verbs: { emoji: "🏃", color: BRONZE },
  Concepts: { emoji: "💡", color: TERRA },
  Fruits: { emoji: "🍌", color: GOLD },
  Vegetables: { emoji: "🥬", color: OLIVE },
  Market: { emoji: "🏷️", color: TERRA },
  Pronouns: { emoji: "🧑", color: BRONZE },
  Time: { emoji: "⏰", color: GOLD },
  Body: { emoji: "✋", color: TERRA },
  Restaurant: { emoji: "🍽️", color: GOLD },
  Directions: { emoji: "🧭", color: OLIVE },
  Counting: { emoji: "🔢", color: BRONZE },
  Phrases: { emoji: "💬", color: OLIVE },
};

const LESSON_SIZE = 5;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function buildUnits(): Unit[] {
  // Group by category in first-appearance order, then sort units by level so the
  // map reads beginner → advanced regardless of where words were added in the file.
  const categories: string[] = [];
  for (const w of WORDS) if (!categories.includes(w.category)) categories.push(w.category);

  return categories
    .map((category) => {
    const words: Word[] = WORDS.filter((w) => w.category === category);
    const level = words[0].level;
    const meta = UNIT_META[category] ?? { emoji: "📘", color: "#777777" };
    const lessons: Lesson[] = chunk(words, LESSON_SIZE).map((group, i) => ({
      id: `${category.toLowerCase()}-${i + 1}`,
      title: `${category} ${i + 1}`,
      emoji: meta.emoji,
      level,
      wordIds: group.map((w) => w.id),
    }));
    return {
      id: category.toLowerCase(),
      title: category,
      level,
      color: meta.color,
      lessons,
    };
    })
    .sort((a, b) => a.level - b.level);
}

export const UNITS: Unit[] = buildUnits();

export const ALL_LESSONS: Lesson[] = UNITS.flatMap((u) => u.lessons);

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(
  ALL_LESSONS.map((l) => [l.id, l]),
);

export function unitsForLevel(level: Level): Unit[] {
  // Show everything up to and including the learner's level.
  return UNITS.filter((u) => u.level <= level);
}
