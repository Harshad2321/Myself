import { BookOpen, GraduationCap } from "lucide-react";
import { education } from "../content";
import { Chip, Reveal, Section } from "./primitives";

export function Education() {
  return (
    <Section id="education" index="07" kicker="academics" title="Education">
      <Reveal>
        <article className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-[#07101d]">
                <GraduationCap className="size-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold sm:text-xl">{education.degree}</h3>
                <p className="mt-1 text-muted">{education.institute}</p>
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

          <div className="mt-6 border-t border-line pt-6">
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted">
              <BookOpen className="size-4 text-accent" aria-hidden="true" />
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
