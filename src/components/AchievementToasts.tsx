import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { navLinks } from "../content";
import { hapticMoment } from "../lib/haptics";

type Toast = { id: string; label: string; key: number };

// Game-style "achievement unlocked" toast the first time each section scrolls
// into view. Once per browser session (sessionStorage is enhancement only —
// failures just mean the toast can re-fire, logic never depends on it).
const unlockedKey = (id: string) => `ha-toast-${id}`;

const alreadyUnlocked = (id: string) => {
  try {
    return sessionStorage.getItem(unlockedKey(id)) === "1";
  } catch {
    return false;
  }
};

const markUnlocked = (id: string) => {
  try {
    sessionStorage.setItem(unlockedKey(id), "1");
  } catch {
    // ignore
  }
};

export function AchievementToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextKey = useRef(0);

  useEffect(() => {
    const targets = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const dismiss = (key: number) =>
      setToasts((list) => list.filter((t) => t.key !== key));

    const unlock = (id: string, label: string) => {
      markUnlocked(id);
      hapticMoment();
      const key = nextKey.current++;
      setToasts((list) => [...list.slice(-1), { id, label, key }]);
      window.setTimeout(() => dismiss(key), 3600);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (alreadyUnlocked(id)) {
            observer.unobserve(entry.target);
            continue;
          }
          observer.unobserve(entry.target);
          const link = navLinks.find((l) => l.id === id);
          if (link) unlock(id, link.label);
        }
      },
      { threshold: 0.2 },
    );

    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-5 z-[80] flex flex-col gap-3"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.key}
            role="status"
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="card pointer-events-auto relative flex items-center gap-3 p-4 pr-11"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-inkline bg-accentfill shadow-[3px_3px_0_var(--c-hard)]">
              <Trophy className="size-5 text-[#17130b]" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-mono text-[10px] font-bold tracking-widest text-[#17130b]/60">
                ACHIEVEMENT UNLOCKED
              </span>
              <span className="block font-display text-sm uppercase text-[#17130b]">
                {toast.label}
              </span>
            </span>
            <button
              type="button"
              onClick={() =>
                setToasts((list) => list.filter((t) => t.key !== toast.key))
              }
              aria-label={`Dismiss ${toast.label} notification`}
              className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-lg border-2 border-inkline bg-card text-[#17130b] transition-transform hover:rotate-90"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
