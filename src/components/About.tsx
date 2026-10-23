import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import {
  aboutEducationSummary,
  aboutParagraphs,
  currentlyStatus,
  identity,
  openToRoles,
  quickStats,
} from "../content";
import { Chip, Reveal, Section } from "./primitives";

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

export function About() {
  return (
    <Section id="about" index="01" kicker="who I am" title="About">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center gap-4">
                {/* TODO(owner): replace monogram with a profile photo when available */}
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent2 font-display text-xl font-bold text-[#07101d]">
                  {identity.initials}
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">{identity.name}</p>
                  <p className="flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    {identity.location}
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                <p className="flex gap-2.5 text-muted">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-ink">Currently: </span>
                    {currentlyStatus.label}. {currentlyStatus.detail}
                  </span>
                </p>
                <p className="flex gap-2.5 text-muted">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {aboutEducationSummary}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
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

      <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickStats.map((stat, i) => (
          <motion.li
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className="rounded-2xl border border-line bg-surface p-5 text-center transition-colors hover:border-accent/40"
          >
            <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
              <CountUp to={stat.value} decimals={stat.decimals} />
              {stat.suffix}
            </p>
            <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">{stat.label}</p>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
