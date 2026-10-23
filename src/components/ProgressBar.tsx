import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks } from "../content";

// Chunky XP-style scroll progress strip at the very top of the page, with a
// small "explored" readout. Percent is real scroll depth by definition.
export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(Math.min(1, Math.max(0, v)) * 100);
    setPct((prev) => (prev === next ? prev : next));
  });

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[70] h-3 border-b-[3px] border-inkline bg-page"
        aria-hidden="true"
      >
        <motion.div
          className="xp-fill h-full w-full origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      <p
        className="card pointer-events-none fixed right-4 top-[76px] z-[65] hidden px-3 py-1.5 font-mono text-[11px] font-bold tracking-wide sm:block"
        aria-hidden="true"
      >
        PROFILE {pct}% EXPLORED
        <span className="ml-2 inline-block size-2 rounded-[2px] bg-[#f4589e]" />
      </p>
      <span className="sr-only" aria-live="off">
        {`Profile ${pct}% explored across ${navLinks.length} sections`}
      </span>
    </>
  );
}
