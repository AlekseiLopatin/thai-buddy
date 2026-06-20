"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/learn", label: "Learn", icon: "🏠" },
  { href: "/letters", label: "Letters", icon: "ก" },
  { href: "/leaderboard", label: "Friends", icon: "🏆" },
  { href: "/profile", label: "Profile", icon: "🧑" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-10 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-xl">
        {TABS.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-bold ${
                active ? "text-brand" : "text-muted"
              }`}
            >
              <span className="font-thai text-2xl leading-6">{t.icon}</span>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
