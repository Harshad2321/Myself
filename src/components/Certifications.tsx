import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { certGroups, hackathons } from "../content";
import { Reveal, Section } from "./primitives";
import { hapticTap } from "../lib/haptics";

const filters = ["All", ...certGroups.map((g) => g.group), "Hackathon participations"] as const;
type Filter = (typeof filters)[number];

// Badge-wall medallions: cream tile, comic-ink border, orange check — one
// accent, consistent with the rest of the system.
function Medallion({ index }: { index: number }) {
  return (
    <span
      className="flex size-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-inkline bg-card shadow-[3px_3px_0_var(--c-hard)]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="none">
        <path
          d="M5 13l4 4L19 7"
          stroke="var(--c-accent)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">{`Credential ${index + 1}`}</span>
    </span>
  );
}

export function Certifications() {
  const [filter, setFilter] = useState<Filter>("All");

  const totalCredentials = useMemo(
    () => certGroups.reduce((sum, g) => sum + g.items.length, 0),
    [],
  );

  const groups = useMemo(() => {
    if (filter === "All") return certGroups;
    if (filter === "Hackathon participations") return [];
    return certGroups.filter((g) => g.group === filter);
  }, [filter]);

  return (
    <Section
      id="certifications"
      index="06"
      cmd="ls ~/certs | wc -l"
      title="Certifications"
    >
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span className="chip px-3 py-1.5 font-mono text-xs font-bold">
            {totalCredentials} credentials listed
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter certifications by category">
            {filters.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    hapticTap();
                    setFilter(f);
                  }}
                  className={`chip px-3.5 py-1.5 text-sm font-bold ${isActive ? "bg-accentfill" : ""}`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {filter === "Hackathon participations" ? (
        <Reveal className="mt-8">
          <p className="mb-4 text-sm font-semibold text-ink/80">
            Participation certificates for these events live under Hackathons and Achievements:
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {hackathons
              .filter((h) => !h.highlight || h.result || h.id)
              .map((h) => (
                <li key={h.name}>
                  <a
                    href="#hackathons"
                    className="card lift group flex h-full items-center justify-between gap-3 p-4 text-sm"
                  >
                    <span className="flex items-center gap-3">
                      <BadgeCheck className="size-5 shrink-0 text-[#17130b]" aria-hidden="true" />
                      <span>
                        <span className="block font-bold text-[#17130b]">{h.name}</span>
                        <span className="block text-xs font-semibold text-[#45403a]">{h.date}</span>
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-[#17130b]/60 transition-transform group-hover:translate-x-1"
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
                <h3 className="flex items-center gap-2 font-display text-lg uppercase text-ink">
                  {group.group}
                  <span className="chip px-2 py-0.5 font-mono text-xs font-bold">
                    {group.items.length}
                  </span>
                </h3>
              </Reveal>
              <motion.ul layout className="mt-4 grid gap-4 lg:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {group.items.map((cert) => (
                    <motion.li
                      key={cert.title}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="card lift flex items-center gap-4 p-4"
                    >
                      <Medallion index={group.items.indexOf(cert)} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-snug text-[#17130b]">{cert.title}</p>
                        <p className="mt-1 text-xs font-semibold text-[#45403a]">
                          {cert.issuer}
                          {cert.date ? ` · ${cert.date}` : ""}
                        </p>
                        {cert.credentialId && (
                          <p className="mt-1.5 font-mono text-[11px] break-all text-[#17130b]/60">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="chip shrink-0 px-3 py-1.5 text-xs font-bold"
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
