"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Level } from "./types";
import { useAuth } from "./auth";
import { loadProfile, rowToState, saveProgress, setUsername as dbSetUsername } from "./db";

export interface Friend {
  name: string;
  xp: number;
  emoji: string;
}

/** Leitner spaced-repetition record for one word. */
export interface SrsCard {
  box: number; // 1..6
  due: number; // epoch ms when the word is due for review
}

export interface ReviewResult {
  wordId: string;
  correct: boolean;
}

export interface ProgressState {
  name: string | null;
  placed: boolean;
  level: Level;
  xp: number;
  streak: number;
  lastActiveDate: string | null; // yyyy-mm-dd of last day XP was earned
  completedLessons: string[];
  dailyGoal: number;
  todayDate: string | null;
  todayXp: number;
  friends: Friend[];
  srs: Record<string, SrsCard>;
}

const STORAGE_KEY = "thai-buddy-v1";

// Leitner intervals in days, indexed by box (box 1 = index 1).
const BOX_DAYS = [0, 0, 1, 3, 7, 16, 35];
const DAY_MS = 86_400_000;

const initialState: ProgressState = {
  name: null,
  placed: false,
  level: 1,
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  completedLessons: [],
  dailyGoal: 30,
  todayDate: null,
  todayXp: 0,
  // Demo friends only used in local (no-Supabase) mode.
  friends: [
    { name: "Nok", xp: 240, emoji: "🦊" },
    { name: "Ploy", xp: 120, emoji: "🐱" },
    { name: "Som", xp: 60, emoji: "🐸" },
  ],
  srs: {},
};

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function isYesterday(date: string | null): boolean {
  if (!date) return false;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return y.toISOString().slice(0, 10) === date;
}

interface ProgressContextValue {
  state: ProgressState;
  hydrated: boolean;
  /** True once local + (if signed in) remote progress is ready to render. */
  synced: boolean;
  username: string | null;
  setName: (name: string) => void;
  setPlacement: (level: Level) => void;
  completeLesson: (lessonId: string, xp: number) => void;
  recordReviews: (results: ReviewResult[]) => void;
  updateUsername: (username: string) => Promise<{ error: string | null }>;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { configured, user, loading: authLoading } = useAuth();
  const [state, setState] = useState<ProgressState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [synced, setSynced] = useState(!configured);
  const [username, setUsernameState] = useState<string | null>(null);
  const prevUserId = useRef<string | null>(null);

  // Load local cache once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...(JSON.parse(raw) as Partial<ProgressState>) });
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist to local cache on every change (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full / unavailable */
    }
  }, [state, hydrated]);

  // Reconcile with Supabase when the signed-in user changes.
  useEffect(() => {
    if (!configured) {
      setSynced(true);
      return;
    }
    if (authLoading || !hydrated) return;

    if (!user) {
      if (prevUserId.current) {
        // Just signed out — clear so the next person starts fresh.
        setState(initialState);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      }
      prevUserId.current = null;
      setUsernameState(null);
      setSynced(true);
      return;
    }

    let cancelled = false;
    setSynced(false);
    (async () => {
      const row = await loadProfile(user.id);
      if (cancelled) return;
      if (row?.placed) {
        // Returning user: cloud is the source of truth.
        setState({ ...initialState, ...rowToState(row) });
      } else {
        // Fresh account: migrate any local guest progress up to the cloud.
        setState((curr) => {
          const merged = curr.placed ? curr : { ...curr, name: row?.display_name ?? curr.name };
          saveProgress(user.id, merged);
          return merged;
        });
      }
      setUsernameState(row?.username ?? null);
      prevUserId.current = user.id;
      setSynced(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [configured, authLoading, hydrated, user]);

  // Debounced push of progress to the cloud while signed in.
  useEffect(() => {
    if (!configured || !user || !synced) return;
    const t = setTimeout(() => saveProgress(user.id, state), 800);
    return () => clearTimeout(t);
  }, [state, configured, user, synced]);

  const setName = useCallback((name: string) => {
    setState((s) => ({ ...s, name: name.trim() || s.name }));
  }, []);

  const setPlacement = useCallback((level: Level) => {
    setState((s) => ({ ...s, level, placed: true }));
  }, []);

  const completeLesson = useCallback((lessonId: string, xp: number) => {
    setState((s) => {
      const today = todayStr();
      let streak = s.streak;
      let todayXp = s.todayXp;
      if (s.todayDate !== today) {
        streak = isYesterday(s.lastActiveDate) ? s.streak + 1 : 1;
        todayXp = 0;
      } else if (s.streak === 0) {
        streak = 1;
      }
      const completed = s.completedLessons.includes(lessonId)
        ? s.completedLessons
        : [...s.completedLessons, lessonId];
      return {
        ...s,
        xp: s.xp + xp,
        todayXp: todayXp + xp,
        todayDate: today,
        lastActiveDate: today,
        streak,
        completedLessons: completed,
      };
    });
  }, []);

  const recordReviews = useCallback((results: ReviewResult[]) => {
    if (results.length === 0) return;
    setState((s) => {
      const now = Date.now();
      const srs = { ...s.srs };
      const seen = new Set<string>();
      for (const { wordId, correct } of results) {
        if (seen.has(wordId)) continue;
        seen.add(wordId);
        const prev = srs[wordId]?.box ?? 0;
        const box = correct ? Math.min(prev + 1, 6) : 1;
        srs[wordId] = { box, due: now + BOX_DAYS[box] * DAY_MS };
      }
      return { ...s, srs };
    });
  }, []);

  const updateUsername = useCallback(
    async (name: string) => {
      if (!user) return { error: "Not signed in" };
      const res = await dbSetUsername(user.id, name);
      if (!res.error) {
        const clean = name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
        setUsernameState(clean);
        setState((s) => (s.name ? s : { ...s, name: clean }));
      }
      return res;
    },
    [user],
  );

  const reset = useCallback(() => {
    setState(initialState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      hydrated,
      synced,
      username,
      setName,
      setPlacement,
      completeLesson,
      recordReviews,
      updateUsername,
      reset,
    }),
    [state, hydrated, synced, username, setName, setPlacement, completeLesson, recordReviews, updateUsername, reset],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

/** Word ids that are due for spaced review right now. */
export function dueWordIds(srs: Record<string, SrsCard>): string[] {
  const now = Date.now();
  return Object.entries(srs)
    .filter(([, card]) => card.due <= now)
    .map(([id]) => id);
}
