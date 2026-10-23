import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import {
  aboutEducationSummary,
  aboutParagraphs,
  currentlyStatus,
  education,
  identity,
  openToRoles,
  quickStats,
} from "../content";
import { Chip, Reveal, Section } from "./primitives";
import { FlexCardButton } from "./FlexCard";
import { AvatarPortrait } from "./Avatar";

function CountUp({
  to,
  decimals = 0,
  duration = 1300,
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

// Level bar framing for the education line — the number is the real semester.
function LevelBar() {
  const total = 8; // standard 8-semester B.Tech, expected May 2028
  const sem = Number(education.status.replace(/\D+/g, "")) || 0;
  return (
    <div>
      <p className="flex items-center justify-between font-mono text-xs font-bold text-[#17130b]/70">
        <span>
          LV.{sem} · SEM {sem}/{total}
        </span>
        <span>{aboutEducationSummary}</span>
      </p>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-[4px] border-2 border-inkline ${
              i < sem ? "fill-yellow" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <Section id="about" index="01" kicker="who I am" title="About" tone="b">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <Reveal>
          <div className="card space-y-5 p-6 text-base leading-relaxed text-[#17130b] sm:p-8 sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="card p-6">
              <div className="flex items-center gap-4">
                {/* TODO(owner): replace placeholder art — see AVATAR-BRIEF.md */}
                <div className="size-16 shrink-0 rotate-[-2deg] rounded-2xl border-[3px] border-inkline bg-[#ffde59] p-1 shadow-[4px_4px_0_var(--c-hard)]">
                  <AvatarPortrait className="size-full rounded-xl" />
                </div>
                <div>
                  <p className="font-display text-lg text-[#17130b]">{identity.name}</p>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-[#45403a]">
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    {identity.location}
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3 border-t-2 border-dashed border-[#17130b]/20 pt-5 text-sm">
                <p className="flex gap-2.5 font-medium text-[#45403a]">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-[#17130b]" aria-hidden="true" />
                  <span>
                    <span className="font-bold text-[#17130b]">Currently: </span>
                    {currentlyStatus.label}. {currentlyStatus.detail}
                  </span>
                </p>
                <p className="flex gap-2.5 font-medium text-[#45403a]">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-[#17130b]" aria-hidden="true" />
                  <LevelBar />
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-display text-sm uppercase tracking-wide text-[#17130b]">
                Open to roles
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {openToRoles.map((role) => (
                  <li key={role}>
                    <Chip>{role}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-display text-xl uppercase text-ink sm:text-2xl">Stat sheet</h3>
          <FlexCardButton />
        </div>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {quickStats.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="card lift p-5 text-center"
            >
              <p className="font-display text-3xl text-[#17130b] sm:text-4xl">
                <CountUp to={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </p>
              <p className="mt-2 text-xs font-semibold leading-snug text-[#45403a] sm:text-sm">
                {stat.label}
              </p>
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
