import { motion, useReducedMotion } from "framer-motion";
import { Award, Medal, Star } from "lucide-react";
import { hackathons } from "../content";
import { Section } from "./primitives";

export function Hackathons() {
  const reduce = useReducedMotion();

  return (
    <Section id="hackathons" index="05" kicker="competitions and wins" title="Hackathons and Achievements">
      <ul className="grid gap-4 md:grid-cols-2">
        {hackathons.map((event, i) => (
          <motion.li
            key={event.name}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: "easeOut" }}
            className={`h-full rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 ${
              event.highlight
                ? "border-accent/45 bg-surface shadow-[0_0_36px_-18px_var(--c-accent)]"
                : "border-line bg-surface hover:border-accent/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-base font-semibold leading-snug">{event.name}</h3>
              {event.highlight ? (
                <Star
                  className="mt-0.5 size-5 shrink-0 fill-accent text-accent"
                  aria-label="Highlight"
                />
              ) : (
                <Medal className="mt-0.5 size-5 shrink-0 text-faint" aria-hidden="true" />
              )}
            </div>
            <p className="mt-1.5 text-sm text-muted">
              {[event.context, event.date].filter(Boolean).join(" · ")}
            </p>
            {event.result && (
              <p className="mt-2.5 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-elevated px-3 py-1.5 text-sm font-medium text-ink">
                <Award className="size-4 text-accent" aria-hidden="true" />
                {event.result}
              </p>
            )}
            {event.id && <p className="mt-2.5 font-mono text-xs break-all text-faint">ID: {event.id}</p>}
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
