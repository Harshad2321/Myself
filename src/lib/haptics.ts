// Haptic feedback for touch devices. Feature-detected, reduced-motion aware,
// and never throws — vibration is pure sugar and must not break a tap.

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function haptic(pattern: number | number[]) {
  try {
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    if (reducedMotion()) return;
    navigator.vibrate(pattern);
  } catch {
    // unsupported or blocked — silently ignore
  }
}

/** Short tick for everyday taps (buttons, filters, chips). */
export const hapticTap = () => haptic(10);

/** Bigger pattern for milestones (resume download, form submit, unlock). */
export const hapticMoment = () => haptic([10, 30, 10]);
