import { motion, useReducedMotion } from "framer-motion";
import { experience } from "../content";
import { Reveal, Section } from "./primitives";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <Section id="experience" index="03" kicker="where I have worked" title="Experience" tone="a">
      <div className="relative">
        <motion.div
          aria-hidden="true"
          className="absolute bottom-2 left-[9px] top-2 w-[3px] origin-top rounded-full bg-inkline sm:left-[11px]"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={reduce ? undefined : { scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        <ol className="space-y-12">
          {experience.map((job) => (
            <li key={job.role} className="relative pl-10 sm:pl-14">
              <span
                className="absolute left-0 top-2 flex size-5 items-center justify-center sm:size-6"
                aria-hidden="true"
              >
                <span className="fill-yellow size-full rotate-45 rounded-[6px] border-[3px] border-inkline shadow-[2px_2px_0_var(--c-hard)]" />
              </span>

              <Reveal>
                <article className="card lift p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-display text-lg text-[#17130b] sm:text-xl">
                      {job.role} <span className="text-[#17130b]/60">@ {job.org}</span>
                    </h3>
                    <p className="chip px-3 py-1 font-mono text-xs font-bold">{job.period}</p>
                  </div>

                  {job.note && <p className="mt-3 text-sm font-medium text-[#45403a]">{job.note}</p>}

                  <ul className="mt-4 space-y-2.5">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 40)}
                        className="flex gap-3 text-sm font-medium leading-relaxed text-[#45403a] sm:text-base"
                      >
                        <span
                          className="mt-2 size-2 shrink-0 rounded-[2px] bg-inkline"
                          aria-hidden="true"
                        />
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
