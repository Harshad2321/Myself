import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Glitch/scramble reveal: letters cycle through glyphs and settle left to
// right. Runs once on mount (~350ms) and re-runs on hover, never on re-render.
// Renders purely visual — wrap with an sr-only copy of the real text for
// assistive tech.
const GLYPHS = "#$%&*<>/[]{}=+?0123456789";

export function Scramble({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const running = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  const run = useCallback(() => {
    if (reduce || running.current) return;
    running.current = true;
    let settled = 0;
    timer.current = window.setInterval(() => {
      settled += 1;
      if (settled >= text.length) {
        window.clearInterval(timer.current);
        setDisplay(text);
        running.current = false;
        return;
      }
      setDisplay(
        text.slice(0, settled) +
          [...text.slice(settled)]
            .map((c) => (c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(""),
      );
    }, 24);
  }, [reduce, text]);

  useEffect(() => {
    // Runs once after mount. Under StrictMode the first effect pass is
    // cleaned up (timer cleared) and this second pass starts the real run,
    // so no once-per-mount ref guard is used here.
    const start = window.setTimeout(run, 350);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer.current);
    };
  }, [run]);

  return (
    <span aria-hidden="true" onMouseEnter={run}>
      {display}
    </span>
  );
}
