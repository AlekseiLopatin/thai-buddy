import { Gender, Word } from "./types";

/**
 * Thai is spoken politely — most utterances end with a gendered particle:
 *   male:   ครับ (khráp) for both statements and questions
 *   female: ค่ะ (khâ) for statements, คะ (khá) for questions
 * Vocabulary words (rice, dog, numbers…) are not flagged, so they're unchanged.
 */
export function politeParticle(gender: Gender, kind: "statement" | "question") {
  if (gender === "male") return { thai: "ครับ", roman: "khráp" };
  return kind === "question" ? { thai: "คะ", roman: "khá" } : { thai: "ค่ะ", roman: "khâ" };
}

/** The Thai + romanization to display for a word, with the polite ending applied. */
export function displayThai(word: Word, gender: Gender): { thai: string; roman: string } {
  if (!word.polite) return { thai: word.thai, roman: word.roman };
  const p = politeParticle(gender, word.polite);
  return { thai: word.thai + p.thai, roman: `${word.roman} ${p.roman}` };
}
