// One-shot celebratory bursts via canvas-confetti, lazy-loaded so the library
// never lands in the initial bundle. No-op under prefers-reduced-motion.

type ConfettiFn = (opts: Record<string, unknown>) => void;

let confettiFn: ConfettiFn | null = null;
let loading: Promise<void> | null = null;

async function load(): Promise<ConfettiFn | null> {
  if (!loading) {
    loading = import("canvas-confetti")
      .then((m) => {
        confettiFn = m.default as ConfettiFn;
      })
      .catch(() => {
        // network failure or blocked — celebration is optional
      });
  }
  await loading;
  return confettiFn;
}

const allowed = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const NEON = ["#22d3ee", "#a78bfa", "#f472b6", "#38bdf8", "#e8eef9"];

/** Small dual-cannon pop from the bottom corners. Used sparingly. */
export async function celebrate() {
  if (!allowed()) return;
  const confetti = await load();
  if (!confetti) return;
  confetti({
    particleCount: 70,
    spread: 62,
    startVelocity: 34,
    ticks: 140,
    origin: { x: 0.18, y: 0.9 },
    colors: NEON,
    disableForReducedMotion: true,
  });
  confetti({
    particleCount: 70,
    spread: 62,
    startVelocity: 34,
    ticks: 140,
    origin: { x: 0.82, y: 0.9 },
    colors: NEON,
    disableForReducedMotion: true,
  });
}

/** Even smaller single burst (flex-card generation etc.). */
export async function celebrateSmall() {
  if (!allowed()) return;
  const confetti = await load();
  if (!confetti) return;
  confetti({
    particleCount: 36,
    spread: 46,
    startVelocity: 24,
    ticks: 110,
    scalar: 0.85,
    origin: { x: 0.5, y: 0.85 },
    colors: NEON,
    disableForReducedMotion: true,
  });
}
