import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

// Two-tone "HA" blocks + chunky loading bar intro. Under ~1.4s total,
// skippable by click/key, instantly skipped on repeat visits in the same
// session and under prefers-reduced-motion.
const KEY = "ha-intro-done";

const seenBefore = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

const markSeen = () => {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    // storage unavailable — the intro just plays again next load, harmless
  }
};

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(() => seenBefore());
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const skip = reduce;

  useEffect(() => {
    if (skip || done) return;
    // Lock scroll while the intro is up
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skip, done]);

  useEffect(() => {
    if (skip || done || leaving) return;
    const duration = 950;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // step-wise for a chunky, game-loading feel
      setPct(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    const finish = () => {
      setLeaving(true);
      markSeen();
      window.setTimeout(() => setDone(true), 380);
    };
    raf = requestAnimationFrame(tick);
    const skipNow = () => {
      cancelAnimationFrame(raf);
      finish();
    };
    window.addEventListener("pointerdown", skipNow);
    window.addEventListener("keydown", skipNow);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", skipNow);
      window.removeEventListener("keydown", skipNow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, done, leaving]);

  if (skip || done) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-page"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.36, ease: "easeIn" }}
    >
      <div className="flex items-center gap-4">
        <span className="flex size-20 items-center justify-center rounded-2xl border-4 border-inkline bg-[#ffde59] font-display text-4xl text-[#17130b] shadow-[7px_7px_0_var(--c-hard)] sm:size-24 sm:text-5xl -rotate-3">
          H
        </span>
        <span className="flex size-20 items-center justify-center rounded-2xl border-4 border-inkline bg-[#f9a8d4] font-display text-4xl text-[#17130b] shadow-[7px_7px_0_var(--c-hard)] sm:size-24 sm:text-5xl rotate-3">
          A
        </span>
      </div>

      <div className="w-64 max-w-[70vw]">
        <div className="intro-track h-5 w-full overflow-hidden rounded-full">
          <div className="intro-block h-full" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-center font-mono text-xs font-bold tracking-widest text-ink">
          LOADING PORTFOLIO… {pct}%
        </p>
      </div>
    </motion.div>
  );
}
