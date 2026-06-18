import { Lesson, Level, Unit, Word } from "@/lib/types";
import { WORDS } from "./words";

// Each category becomes a Unit; its words are chunked into lessons of ~3.
const UNIT_META: Record<string, { emoji: string; color: string }> = {
  Greetings: { emoji: "👋", color: "#58cc02" },
  Numbers: { emoji: "🔢", color: "#1cb0f6" },
  Colors: { emoji: "🎨", color: "#ce82ff" },
  Food: { emoji: "🍜", color: "#ff9600" },
  Family: { emoji: "👨‍👩‍👧", color: "#ff4b4b" },
  Animals: { emoji: "🐘", color: "#2cc2a0" },
  Places: { emoji: "🏠", color: "#1cb0f6" },
  Transport: { emoji: "🚆", color: "#ff9600" },
  Nature: { emoji: "🌳", color: "#58cc02" },
  Feelings: { emoji: "😊", color: "#ffc800" },
  Verbs: { emoji: "🏃", color: "#ce82ff" },
  Concepts: { emoji: "💡", color: "#ff4b4b" },
  Fruits: { emoji: "🍌", color: "#ffc800" },
  Vegetables: { emoji: "🥬", color: "#2cc2a0" },
  Market: { emoji: "🏷️", color: "#ff9600" },
  Pronouns: { emoji: "🧑", color: "#ce82ff" },
  Time: { emoji: "⏰", color: "#1cb0f6" },
  Body: { emoji: "✋", color: "#ff4b4b" },
  Restaurant: { emoji: "🍽️", color: "#ff9600" },
  Directions: { emoji: "🧭", color: "#2cc2a0" },
  Counting: { emoji: "🔢", color: "#1cb0f6" },
  Phrases: { emoji: "💬", color: "#58cc02" },
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
