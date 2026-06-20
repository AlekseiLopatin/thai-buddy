"use client";

import { Gender } from "@/lib/types";

/**
 * Lets the learner pick the polite ending their sentences should use.
 * We frame it as a speaking-style choice, not personal data, and default to
 * feminine (ค่ะ) if they'd rather not say.
 */
export default function GenderChoice({
  value,
  onChange,
  showNote = true,
}: {
  value: Gender;
  onChange: (g: Gender) => void;
  showNote?: boolean;
}) {
  const opt = (g: Gender, label: string, sub: string) => (
    <button
      type="button"
      onClick={() => onChange(g)}
      className={`btn-3d flex-1 rounded-2xl border-2 px-3 py-3 text-center ${
        value === g ? "border-brand bg-brand-soft" : "border-line bg-surface"
      }`}
    >
      <span className="block text-base font-extrabold">{label}</span>
      <span className="block text-xs text-muted">{sub}</span>
    </button>
  );

  return (
    <div className="w-full">
      {showNote && (
        <p className="mb-2 text-xs text-muted">
          Thai is polite — sentences end with <span className="font-thai">ค่ะ</span> (kha) or{" "}
          <span className="font-thai">ครับ</span> (krub) depending on the speaker. We don&apos;t
          store this as personal info; it just makes your phrases sound correct.
        </p>
      )}
      <div className="flex gap-2">
        {opt("female", "♀ ค่ะ", "feminine (kha)")}
        {opt("male", "♂ ครับ", "masculine (krub)")}
      </div>
      {showNote && (
        <button
          type="button"
          onClick={() => onChange("female")}
          className="mt-2 text-xs text-muted underline"
        >
          Prefer not to say — use the feminine ending
        </button>
      )}
    </div>
  );
}
