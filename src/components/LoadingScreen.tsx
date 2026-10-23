import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Terminal boot intro: a quick $ whoami / $ cat profile.json sequence, then
// the page reveals. Under ~1.2s, skippable by click/key, plays once per
// session, and never plays under prefers-reduced-motion.
const KEY = "ha-boot-done";

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
    // storage unavailable — the boot just replays next load, harmless
  }
};

// [command (typed char by char), output (appears at once)]
const STEPS: { cmd: string; out: string }[] = [
  { cmd: "whoami", out: "harshad_agrawal" },
  {
    cmd: "cat profile.json",
    out: '{ "role": "AI/ML Engineer", "open_to_work": true }',
  },
];

const TYPE_MS = 16; // per character while typing a command
const OUT_PAUSE = 260; // before showing a command's output
const CMD_PAUSE = 180; // before typing the next command

export function BootScreen() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(() => seenBefore());
  const [leaving, setLeaving] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reduce || done) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [reduce, done]);

  useEffect(() => {
    if (reduce || done || leaving) return;

    let cancelled = false;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(() => !cancelled && fn(), ms));
    };
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      setLeaving(true);
      markSeen();
      window.setTimeout(() => setDone(true), 340);
    };

    let clock = 120;
    for (const step of STEPS) {
      for (let i = 1; i <= step.cmd.length; i++) {
        const slice = step.cmd.slice(0, i);
        at(clock, () => setTyped(slice));
        clock += TYPE_MS;
      }
      const cmd = step.cmd;
      at(clock, () => {
        setLines((prev) => [...prev, `$ ${cmd}`]);
        setTyped("");
      });
      clock += OUT_PAUSE;
      const out = step.out;
      at(clock, () => setLines((prev) => [...prev, out]));
      clock += CMD_PAUSE;
    }
    at(clock + 160, finish);

    const skipNow = () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      finish();
    };
    window.addEventListener("pointerdown", skipNow);
    window.addEventListener("keydown", skipNow);
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("pointerdown", skipNow);
      window.removeEventListener("keydown", skipNow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, done, leaving]);

  if (reduce || done) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg px-5"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.32, ease: "easeIn" }}
    >
      <div className="term w-full max-w-xl">
        <div className="term-head">
          <span className="term-dot" aria-hidden="true" />
          <span className="term-dot" aria-hidden="true" />
          <span className="term-dot" aria-hidden="true" />
          <span className="ml-2">harshad@portfolio: ~</span>
        </div>
        <div className="term-body min-h-[7.5rem]">
          {lines.map((line, i) =>
            line.startsWith("$ ") ? (
              <p key={i}>
                <span className="term-prompt">$</span> {line.slice(2)}
              </p>
            ) : (
              <p key={i} className="tval">
                {line}
              </p>
            ),
          )}
          <p>
            <span className="term-prompt">$</span> {typed}
            <span className="animate-caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-[#e8e4d8]" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}
