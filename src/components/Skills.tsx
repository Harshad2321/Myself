import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Network,
  Server,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "../content";
import { Reveal, Section } from "./primitives";

// One flat tile per skill category — the icon is decorative, the count is real.
const groupIcons: Record<string, LucideIcon> = {
  "Generative AI and Agents": BrainCircuit,
  "Machine Learning and AI": Cpu,
  "Data Analysis and Visualization": BarChart3,
  Languages: Code2,
  "Data Structures and Algorithms": Network,
  "Operating Systems and Networks": Server,
  "System Design": Boxes,
  "Backend and APIs": GitBranch,
  "Databases and Messaging": Database,
  "Cloud and DevOps": Cloud,
  Web: Code2,
  "Testing and Practices": ShieldCheck,
  "Professional Skills": Users,
};

const tileFills = ["fill-yellow", "fill-sky", "fill-pink", "fill-mint", "fill-lav", "fill-gold"];

export function Skills() {
  return (
    <Section id="skills" index="02" kicker="what I work with" title="Skills" tone="c">
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {skillGroups.map((group, gi) => {
          const Icon = groupIcons[group.group] ?? Boxes;
          const fill = tileFills[gi % tileFills.length];
          return (
            <Reveal
              key={group.group}
              delay={(gi % 3) * 0.07}
              className="mb-5 break-inside-avoid"
            >
              <div className="card lift h-full p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl border-[3px] border-inkline shadow-[3px_3px_0_var(--c-hard)] ${fill}`}
                    aria-hidden="true"
                  >
                    <Icon className="size-5 text-[#17130b]" />
                  </span>
                  <h3 className="font-display text-base uppercase leading-tight text-[#17130b] sm:text-lg">
                    {group.group}
                  </h3>
                  <span className="ml-auto chip shrink-0 px-2 py-0.5 font-mono text-xs font-bold">
                    ×{group.items.length}
                    <span className="sr-only"> skills</span>
                  </span>
                </div>

                {/* One segment per listed skill — a count you can verify, not
                    a skill percentage. Segments light up on scroll. */}
                <motion.ul
                  className="mt-4 flex gap-1"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
                  aria-hidden="true"
                >
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0.15, scaleX: 0.4 },
                        show: { opacity: 1, scaleX: 1 },
                      }}
                      transition={{ duration: 0.3 }}
                      className={`h-2.5 flex-1 rounded-[3px] border-2 border-inkline ${
                        i % 3 === 0 ? "fill-yellow" : i % 3 === 1 ? "fill-sky" : "fill-pink"
                      }`}
                    />
                  ))}
                </motion.ul>

                <motion.ul
                  className="mt-4 flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025 } } }}
                >
                  {group.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.3 }}
                      className="chip px-2.5 py-1 text-xs font-semibold"
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
