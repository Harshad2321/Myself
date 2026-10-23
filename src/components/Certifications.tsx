import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { certGroups, hackathons } from "../content";
import { Reveal, Section } from "./primitives";

const filters = ["All", ...certGroups.map((g) => g.group), "Hackathon participations"] as const;
type Filter = (typeof filters)[number];

export function Certifications() {
  const [filter, setFilter] = useState<Filter>("All");

  const groups = useMemo(() => {
    if (filter === "All") return certGroups;
    if (filter === "Hackathon participations") return [];
    return certGroups.filter((g) => g.group === filter);
  }, [filter]);

  return (
    <Section id="certifications" index="06" kicker="verified learning" title="Certifications">
      <Reveal>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter certifications by category">
          {filters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
                  isActive
                    ? "border-transparent bg-gradient-to-r from-accent to-accent2 text-[#07101d]"
                    : "border-line bg-surface text-muted hover:border-accent/60 hover:text-ink"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </Reveal>

      {filter === "Hackathon participations" ? (
        <Reveal className="mt-8">
          <p className="mb-4 text-sm text-muted">
            Participation certificates for these events live under Hackathons and Achievements:
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {hackathons
              .filter((h) => !h.highlight || h.result || h.id)
              .map((h) => (
                <li key={h.name}>
                  <a
                    href="#hackathons"
                    className="group flex h-full items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4 text-sm transition duration-200 hover:border-accent/50"
                  >
                    <span className="flex items-center gap-3">
                      <BadgeCheck className="size-4.5 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        <span className="block font-medium text-ink">{h.name}</span>
                        <span className="block text-xs text-faint">{h.date}</span>
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-faint transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
          </ul>
        </Reveal>
      ) : (
        <div className="mt-8 space-y-10">
          {groups.map((group) => (
            <div key={group.group}>
              <Reveal>
                <h3 className="font-display text-lg font-semibold">
                  <span className="mr-2 text-accent">▸</span>
                  {group.group}
                  <span className="ml-2 font-mono text-xs font-normal text-faint">
                    {group.items.length}
                  </span>
                </h3>
              </Reveal>
              <motion.ul layout className="mt-4 grid gap-3 lg:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {group.items.map((cert) => (
                    <motion.li
                      key={cert.title}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-snug">{cert.title}</p>
                        <p className="mt-1 text-xs text-muted">
                          {cert.issuer}
                          {cert.date ? ` · ${cert.date}` : ""}
                        </p>
                        {cert.credentialId && (
                          <p className="mt-1.5 font-mono text-[11px] break-all text-faint">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="shrink-0 text-sm font-medium text-accent underline-offset-4 transition hover:underline"
                        >
                          Show credential
                        </a>
                      ) : null}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
