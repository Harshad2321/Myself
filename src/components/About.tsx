import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
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

// The quick stats rendered as terminal output — real numbers, no self-rated
// skill meters. Keys are slugged from the quickStats labels in content.ts.
const statKey = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .join("_");

function StatsTerminal() {
  return (
    <div className="term">
      <div className="term-head">
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="ml-2">~/about $ cat stats.log</span>
      </div>
      <div className="term-body">
        {quickStats.map((stat) => (
          <p key={stat.label} className="flex flex-wrap gap-x-2">
            <span className="min-w-[16rem] flex-1 truncate">{statKey(stat.label)}</span>
            <span className="tok">=</span>{" "}
            <span className="tval">
              <CountUp to={stat.value} decimals={stat.decimals} />
              {stat.suffix ?? ""}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

// Level bar framing for the education line — the number is the real semester.
function LevelBar() {
  const total = 8; // standard 8-semester B.Tech, expected May 2028
  const sem = Number(education.status.replace(/\D+/g, "")) || 0;
  return (
    <div>
      <p className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-bold text-[#45403a]">
        <span>
          LV.{sem} · SEM {sem}/{total}
        </span>
        <span className="text-[#17130b]/70">{aboutEducationSummary}</span>
      </p>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-[4px] border-2 border-inkline ${
              i < sem ? "bg-accentfill" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <Section id="about" index="01" cmd="whoami --verbose" title="About">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <Reveal>
          <div className="card space-y-5 p-6 text-base font-medium leading-relaxed text-[#17130b] sm:p-8 sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="size-16 shrink-0 rotate-[-2deg] overflow-hidden rounded-2xl border-[3px] border-inkline bg-card shadow-[4px_4px_0_var(--c-hard)] sm:size-20">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="./assets/avatar-320.webp 320w, ./assets/avatar-640.webp 640w, ./assets/avatar-960.webp 960w"
                      sizes="(min-width: 640px) 80px, 64px"
                    />
                    <img
                      src="./assets/avatar-320.jpg"
                      srcSet="./assets/avatar-320.jpg 320w, ./assets/avatar-640.jpg 640w, ./assets/avatar-960.jpg 960w"
                      sizes="(min-width: 640px) 80px, 64px"
                      width={320}
                      height={320}
                      alt="Portrait photo of Harshad Agrawal"
                      className="size-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
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
                <div className="flex gap-2.5">
                  <GraduationCap
                    className="mt-0.5 size-4 shrink-0 text-[#17130b]"
                    aria-hidden="true"
                  />
                  <LevelBar />
                </div>
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
          <h3 className="font-mono text-sm font-bold text-accent">
            <span className="text-muted">~/about</span> $ cat stats.log
          </h3>
          <FlexCardButton />
        </div>
        <StatsTerminal />
      </Reveal>
    </Section>
  );
}
