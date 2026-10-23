import { motion, useReducedMotion } from "framer-motion";
import { experience } from "../content";
import { Reveal, Section } from "./primitives";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <Section id="experience" index="03" kicker="where I have worked" title="Experience">
      <div className="relative">
        <motion.div
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent2 to-transparent sm:left-[9px]"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={reduce ? undefined : { scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        <ol className="space-y-12">
          {experience.map((job) => (
            <li key={job.role} className="relative pl-10 sm:pl-14">
              <span
                className="absolute left-0 top-2 flex size-4 items-center justify-center sm:size-5"
                aria-hidden="true"
              >
                <span className="absolute inline-flex size-full rounded-full bg-accent/40 animate-dot-ping" />
                <span className="relative inline-flex size-2.5 rounded-full border-2 border-accent bg-bg sm:size-3" />
              </span>

              <Reveal>
                <article className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-display text-lg font-semibold sm:text-xl">
                      {job.role} <span className="text-accent">@ {job.org}</span>
                    </h3>
                    <p className="rounded-full border border-line bg-elevated px-3 py-1 font-mono text-xs text-muted">
                      {job.period}
                    </p>
                  </div>

                  {job.note && <p className="mt-3 text-sm italic text-muted">{job.note}</p>}

                  <ul className="mt-4 space-y-2.5">
                    {job.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
