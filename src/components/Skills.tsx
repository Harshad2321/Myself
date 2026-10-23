import { useMemo } from "react";
import { motion } from "framer-motion";
import { skillGroups, skillProofs, type SkillGroup } from "../content";
import { Reveal, Section } from "./primitives";
import { useLive } from "../lib/live";

// Recruiter-first ordering (Addendum v3): languages and backend infra before
// ML/AI, DSA and the rest. Anything not listed keeps its content.ts order.
const GROUP_ORDER = [
  "Languages",
  "Backend and APIs",
  "Cloud and DevOps",
  "Databases and Messaging",
  "Generative AI and Agents",
  "Machine Learning and AI",
  "Data Analysis and Visualization",
  "Data Structures and Algorithms",
  "Operating Systems and Networks",
  "System Design",
  "Web",
  "Testing and Practices",
  "Professional Skills",
];

const orderedGroups: SkillGroup[] = [...skillGroups].sort((a, b) => {
  const ia = GROUP_ORDER.indexOf(a.group);
  const ib = GROUP_ORDER.indexOf(b.group);
  return (ia === -1 ? GROUP_ORDER.length : ia) - (ib === -1 ? GROUP_ORDER.length : ib);
});

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

// Live GitHub byte-share for matching chips — a real usage indicator, not a
// self-rated level. Only shown when live/cached data has actually loaded.
function useLangPct(): Record<string, number> {
  const { github } = useLive();
  return useMemo(() => {
    const map: Record<string, number> = {};
    if (!github) return map;
    for (const lang of github.data.topLanguages) map[lang.name] = lang.pct;
    return map;
  }, [github]);
}

function SkillChip({ item }: { item: string }) {
  const proof = skillProofs[item];
  const langPct = useLangPct();
  // Combined TypeScript+JavaScript share for the "familiar" chip.
  const pct =
    item === "TypeScript/JavaScript (familiar)"
      ? (langPct["TypeScript"] ?? 0) + (langPct["JavaScript"] ?? 0) || undefined
      : langPct[item];
  const usage = pct && pct >= 1 ? pct : undefined;
  const usageLabel = usage ? (
    <span
      className="ml-1 font-mono text-[10px] font-bold text-accentcard"
      title={`${usage}% of public GitHub repo bytes (live)`}
    >
      ·{usage}%
    </span>
  ) : null;

  if (proof) {
    return (
      <a
        href={proof.href}
        title={`Proof: ${proof.note}`}
        aria-label={`${item} — evidence: ${proof.note}`}
        className="chip chip-proof px-2.5 py-1 text-xs"
      >
        {item}
        {usageLabel}
      </a>
    );
  }
  return (
    <span className="chip px-2.5 py-1 text-xs font-semibold">
      {item}
      {usageLabel}
    </span>
  );
}

// Each category renders as a terminal file block: ~/skills/<group>.txt with
// a comment header and the tools as chips. Orange-underlined chips carry a
// proof link to the project/experience/cert that uses them.
function SkillFile({ group }: { group: SkillGroup }) {
  return (
    <div className="term lift break-inside-avoid">
      <div className="term-head">
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="ml-2">~/skills/{slug(group.group)}.txt</span>
        <span className="ml-auto tok">×{group.items.length}</span>
      </div>
      <div className="term-body">
        <p className="tok"># {group.group}</p>
        <motion.ul
          className="mt-2 flex flex-wrap gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.02 } } }}
        >
          {group.items.map((item) => (
            <motion.li
              key={item}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.25 }}
            >
              <SkillChip item={item} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" index="02" cmd="cat requirements.txt" title="Skills" alternate>
      <p className="mb-6 max-w-3xl text-sm font-semibold text-muted sm:text-base">
        Grouped by category, most recruiter-relevant first. Chips with an{" "}
        <span className="font-bold text-accent">orange underline</span> link to the project,
        experience bullet, or certification that proves them — hover for details.
      </p>
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {orderedGroups.map((group, gi) => (
          <Reveal key={group.group} delay={(gi % 3) * 0.06} className="mb-5">
            <SkillFile group={group} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
