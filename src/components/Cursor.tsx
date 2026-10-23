import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Blocky custom cursor: a small ink square that tracks the pointer exactly,
// plus a larger outlined square that follows on a spring and morphs (scales
// and rotates to a diamond) over interactive elements. Fine pointers only,
// disabled under prefers-reduced-motion; the native cursor stays untouched
// everywhere else.
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.7 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("ha-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setActive(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.documentElement.classList.remove("ha-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] size-2 rounded-[2px] bg-[var(--c-ink)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[94] size-8 rounded-lg border-[3px] border-[var(--c-ink)]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.8 : active ? 1.65 : 1,
          rotate: active ? 45 : 0,
          backgroundColor: active ? "rgba(255, 107, 53, 0.32)" : "rgba(255, 107, 53, 0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      />
    </>
  );
}
