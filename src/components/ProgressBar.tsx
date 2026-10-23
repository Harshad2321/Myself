import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { navLinks } from "../content";

// Chunky XP-style scroll progress strip at the very top. The percent label
// rides the fill's leading edge inside the strip itself, so it can never
// overlap page content at any viewport width.
export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(Math.min(1, Math.max(0, v)) * 100);
    setPct((prev) => (prev === next ? prev : next));
  });

  const labelLeft = useTransform(scrollYProgress, (v) => `${Math.min(v * 100, 99.2)}%`);
  const labelOpacity = useTransform(scrollYProgress, (v) => (v > 0.12 ? 1 : 0));

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[70] h-4 border-b-[3px] border-edge bg-bg"
        aria-hidden="true"
      >
        <motion.div
          className="xp-fill relative h-full w-full origin-left"
          style={{ scaleX: scrollYProgress }}
        >
          <motion.span
            style={{ left: labelLeft, opacity: labelOpacity }}
            className="absolute top-1/2 -translate-x-[calc(100%+6px)] -translate-y-1/2 whitespace-nowrap bg-[#17130b] px-1.5 py-px font-mono text-[10px] font-bold leading-none text-[#ff6b35]"
          >
            {pct}%
          </motion.span>
        </motion.div>
      </div>
      <span className="sr-only" aria-live="off">
        {`Profile ${pct}% explored across ${navLinks.length} sections`}
      </span>
    </>
  );
}
