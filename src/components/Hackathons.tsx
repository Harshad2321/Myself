import { motion, useReducedMotion } from "framer-motion";
import { Award, Medal, Star } from "lucide-react";
import { hackathons } from "../content";
import { Section } from "./primitives";

export function Hackathons() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="hackathons"
      index="05"
      cmd="history | grep win"
      title="Hackathons and Achievements"
      alternate
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {hackathons.map((event, i) => (
          <motion.li
            key={event.name}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: "easeOut" }}
            className="card lift h-full p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-base leading-snug text-[#17130b]">{event.name}</h3>
              {event.highlight ? (
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl border-[3px] border-inkline bg-accent shadow-[3px_3px_0_var(--c-hard)]"
                  aria-label="Highlight"
                >
                  <Star className="size-5 fill-[#17130b] text-[#17130b]" aria-hidden="true" />
                </span>
              ) : (
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl border-[3px] border-inkline bg-card shadow-[3px_3px_0_var(--c-hard)]"
                  aria-hidden="true"
                >
                  <Medal className="size-5 text-[#17130b]/70" />
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm font-semibold text-[#45403a]">
              {[event.context, event.date].filter(Boolean).join(" · ")}
            </p>
            {event.result && (
              <p className="chip mt-3 px-3 py-1.5 text-sm font-bold">
                <Award className="size-4 text-[#17130b]" aria-hidden="true" />
                {event.result}
              </p>
            )}
            {event.id && (
              <p className="mt-2.5 font-mono text-xs break-all text-[#17130b]/60">ID: {event.id}</p>
            )}
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
