import { motion } from "framer-motion";
import { skillGroups } from "../content";
import { Reveal, Section } from "./primitives";

export function Skills() {
  return (
    <Section id="skills" index="02" kicker="what I work with" title="Skills">
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {skillGroups.map((group, gi) => (
          <Reveal
            key={group.group}
            delay={(gi % 3) * 0.07}
            className="mb-5 break-inside-avoid"
          >
            <div className="h-full rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40 sm:p-6">
              <h3 className="font-display text-base font-semibold sm:text-lg">
                <span className="mr-2 text-accent">▸</span>
                {group.group}
              </h3>
              <motion.ul
                className="mt-4 flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.025 } },
                }}
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full border border-line bg-elevated px-3 py-1 text-sm text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
