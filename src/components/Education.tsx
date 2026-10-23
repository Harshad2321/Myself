import { BookOpen, GraduationCap } from "lucide-react";
import { education } from "../content";
import { Chip, Reveal, Section } from "./primitives";

export function Education() {
  return (
    <Section id="education" index="07" kicker="academics" title="Education" tone="b">
      <Reveal>
        <article className="card lift p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
            <div className="flex items-start gap-4">
              <div className="fill-yellow flex size-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-inkline shadow-[4px_4px_0_var(--c-hard)]">
                <GraduationCap className="size-7 text-[#17130b]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg leading-snug text-[#17130b] sm:text-xl">
                  {education.degree}
                </h3>
                <p className="mt-1 font-semibold text-[#45403a]">{education.institute}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Chip small>{education.period}</Chip>
              </li>
              <li>
                <Chip small>{education.status}</Chip>
              </li>
              <li>
                <Chip small>CGPA {education.cgpa}</Chip>
              </li>
            </ul>
          </div>

          <div className="mt-6 border-t-2 border-dashed border-[#17130b]/20 pt-6">
            <h4 className="flex items-center gap-2 font-display text-sm uppercase tracking-wide text-[#17130b]">
              <BookOpen className="size-4" aria-hidden="true" />
              Coursework
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <li key={course}>
                  <Chip>{course}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
