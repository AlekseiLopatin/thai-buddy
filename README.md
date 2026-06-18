# Thai Buddy 🇹🇭

A gamified, Duolingo-style app for learning Thai — picture-based vocabulary, a
placement diagnostic, a skill tree, XP/streaks/hearts, and a friends leaderboard.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · PWA.
Pictures are open-source emoji glyphs (not AI-generated) and can be swapped for
OpenMoji/Twemoji SVGs later.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## How it works

1. **Onboarding** (`/`) — create a local display name ("login" placeholder).
2. **Diagnostic** (`/diagnostic`) — 10 recognition questions place you into one of
   5 levels (Absolute Beginner → Advanced).
3. **Learn map** (`/learn`) — a skill tree of units/lessons up to your level;
   lessons unlock in sequence. Surfaces a **Review** button when words are due.
4. **Lesson** (`/lesson/[id]`) — TEFL flow: a **teach phase** (meet each word with
   picture + Thai + romanization + English + audio) followed by mixed exercises
   (pick-the-picture, pick-the-meaning, pick-the-Thai, listen via browser TTS).
   Every picture always shows its English label. Missed items are **recycled**
   within the session until correct — no hearts/lives pressure.
5. **Letters** (`/letters`) — alphabet reference (consonants + vowels with English
   sound equivalents and example words) plus a **Tone Trainer** for Thai's 5 tones.
   Each section has its own practice quiz.
6. **Review** (`/review`) — **spaced repetition** (Leitner SRS): words you learn
   are scheduled for review; due words are quizzed with no teach phase.
7. **Friends** (`/leaderboard`) and **Profile** (`/profile`).

Progress (XP, streak, completed lessons, placement, SRS schedule) is kept in
`localStorage` via `src/lib/progress.tsx`.

### TEFL/ESL principles applied
- **Present → Practice**: teach phase before testing.
- **Spaced repetition**: Leitner boxes with increasing intervals.
- **Mastery, not punishment**: mistakes recycle instead of costing lives.
- **Comprehensible input**: pictures + English glosses everywhere.
- **Varied retrieval**: recognition, recall, and listening exercise types.
- **Real-life relevance**: numbers, market/shopping, fruits & vegetables for expats.

## Project layout

| Path | Purpose |
|---|---|
| `src/lib/types.ts` | Core types + the 5 levels |
| `src/data/words.ts` | Seed vocabulary (Thai, romanization, English, emoji, category, level) |
| `src/data/curriculum.ts` | Builds units/lessons from the word list |
| `src/lib/progress.tsx` | localStorage-backed global state (XP, streak, hearts, placement) |
| `src/lib/exercises.ts` | Exercise generator + Thai text-to-speech |
| `src/app/*` | Pages (onboarding, diagnostic, learn, lesson, leaderboard, profile) |
| `src/components/*` | TopBar (stats) + BottomNav |

## Accounts & friends (Supabase)

Auth, cloud progress sync, and friends are built in. The app runs in **local mode**
(localStorage, no accounts) until you add Supabase keys — see
[`SUPABASE_SETUP.md`](SUPABASE_SETUP.md). In short: create a free Supabase project,
paste its URL + anon key into `.env.local`, and run [`supabase/schema.sql`](supabase/schema.sql).

Once configured you get email/password + Google sign-in, progress that syncs to your
account, and a Friends tab to search users by username, send/accept requests, and
compare XP. Relevant code: `src/lib/auth.tsx`, `src/lib/db.ts`, `src/lib/supabase/*`,
`src/proxy.ts`, `src/app/auth/callback/route.ts`.

## Roadmap

**Phase 3 — Polish & deploy**
- Service worker + offline; richer PWA install
- Recorded native Thai audio (replace browser TTS)
- Deploy frontend to Vercel, backend to Supabase
- Expand content (more words/levels), add OpenMoji SVG art
