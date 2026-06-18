"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { LESSON_BY_ID } from "@/data/curriculum";
import { WORD_BY_ID } from "@/data/words";
import LessonRunner from "@/components/LessonRunner";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = LESSON_BY_ID[id];

  if (!lesson) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-bold">Lesson not found.</p>
        <Link href="/learn" className="font-bold text-brand">← Back to map</Link>
      </main>
    );
  }

  const words = lesson.wordIds.map((w) => WORD_BY_ID[w]);
  return <LessonRunner words={words} lessonId={lesson.id} title={lesson.title} teach />;
}
