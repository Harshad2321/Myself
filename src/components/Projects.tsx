import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Lock, ShieldCheck } from "lucide-react";
import {
  featuredProjects,
  githubProjects,
  openSourceRow,
  privateProjects,
  projectCategories,
  type GithubProject,
  type ProjectCategory,
} from "../content";
import { GithubIcon } from "./icons";
import { Reveal, Section } from "./primitives";
import { hapticTap } from "../lib/haptics";

// Category tags stay monochrome terminal tags — color coding by "rarity" was
// v1/v2 flavor; v3 keeps one accent and lets the text carry the meaning.
function CategoryTag({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border-2 border-inkline bg-card px-2 py-0.5 font-mono text-[10px] font-bold text-[#17130b] shadow-[2px_2px_0_var(--c-hard)]">
      {tag === "PRIVATE" && <Lock className="size-3" aria-hidden="true" />}
      {tag}
    </span>
  );
}

// Build/CI status chip — only where content actually backs it: the 194-test
// Pytest suite (JanSetu AI) and the GitHub Actions daily refresh (NSE).
function BuildStatus({ project }: { project: (typeof featuredProjects)[number] }) {
  if (project.bullets.some((b) => b.includes("194-test"))) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-lg border-2 border-inkline bg-accentfill px-2 py-0.5 font-mono text-[10px] font-bold text-[#17130b] shadow-[2px_2px_0_var(--c-hard)]"
        title="194-test Pytest suite enforced by 11 system invariants"
      >
        <CheckCircle2 className="size-3.5" aria-hidden="true" />
        build: passing · 194 tests
      </span>
    );
  }
  if (project.tech.includes("GitHub Actions")) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-lg border-2 border-inkline bg-card px-2 py-0.5 font-mono text-[10px] font-bold text-[#17130b] shadow-[2px_2px_0_var(--c-hard)]"
        title="Daily data refresh via GitHub Actions"
      >
        <CheckCircle2 className="size-3.5" aria-hidden="true" />
        ci: github-actions
      </span>
    );
  }
  return null;
}

function FeaturedCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
}) {
  return (
    <article className="card lift flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-t-[17px] border-b-[3px] border-inkline bg-[#17130b] px-5 py-3 sm:px-7">
        <p className="font-mono text-xs font-bold tracking-wider text-[#f2efe8]">
          <span className="text-accent">$</span> quest · {project.year}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <BuildStatus project={project} />
          {project.tags.slice(0, 2).map((tag) => (
            <CategoryTag key={tag} tag={tag} />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <h3 className="font-display text-xl leading-snug text-[#17130b] sm:text-2xl">
            {project.title}
          </h3>
          {project.repos && project.repos.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.repos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${repo.name} on GitHub`}
                    className="chip px-3 py-1.5 text-xs font-bold"
                  >
                    <GithubIcon className="size-4" />
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-3 text-sm font-medium text-[#45403a] sm:text-base">{project.pitch}</p>

        <ul className="mt-4 flex-1 space-y-2.5">
          {project.bullets.map((bullet) => (
            <li
              key={bullet.slice(0, 48)}
              className="flex gap-3 text-sm font-medium leading-relaxed text-[#45403a] sm:text-base"
            >
              <span className="mt-2 size-2 shrink-0 rounded-[2px] bg-accentfill" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>

        {project.callout && (
          <p className="mt-4 flex gap-2.5 rounded-xl border-2 border-dashed border-[#17130b]/30 p-4 text-sm font-medium leading-relaxed text-[#45403a]">
            <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-[#17130b]" aria-hidden="true" />
            {project.callout}
          </p>
        )}

        {project.credentialId && (
          <p className="mt-4 font-mono text-xs text-[#17130b]/60">
            Credential ID: {project.credentialId}
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-2 border-t-2 border-dashed border-[#17130b]/20 pt-5">
          {project.tech.map((tech, i) => (
            <li
              key={tech}
              style={{ transitionDelay: `${i * 22}ms` }}
              className="chip px-2.5 py-1 text-xs font-bold"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">{`Featured project ${index + 1}`}</span>
    </article>
  );
}

function SmallCard({ project }: { project: GithubProject }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="card lift flex h-full flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-sm leading-snug text-[#17130b] break-words sm:text-base">
          {project.name}
        </h4>
        {project.isPrivate ? (
          <CategoryTag tag="PRIVATE" />
        ) : project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View ${project.name} on GitHub`}
            className="shrink-0 text-[#17130b] transition-transform hover:-rotate-12"
          >
            <GithubIcon className="size-4.5" />
          </a>
        ) : null}
      </div>

      {project.desc && (
        <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-[#45403a]">
          {project.desc}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {project.lang && (
          <span className="chip px-2 py-0.5 font-mono text-[11px] font-bold">{project.lang}</span>
        )}
        {project.license && (
          <span className="chip px-2 py-0.5 font-mono text-[11px] font-bold">{project.license}</span>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="chip px-2 py-0.5 font-mono text-[11px] font-bold"
          >
            <ExternalLink className="size-3" aria-hidden="true" />
            live
          </a>
        )}
        {project.tags.map((tag) => (
          <CategoryTag key={tag} tag={tag} />
        ))}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");

  const allSmall = useMemo(() => [...githubProjects, ...privateProjects], []);
  const filtered = useMemo(
    () => (filter === "All" ? allSmall : allSmall.filter((p) => p.tags.includes(filter))),
    [filter, allSmall],
  );

  return (
    <Section id="projects" index="04" cmd="ls -la ~/projects" title="Projects">
      <Reveal>
        <h3 className="font-display text-xl uppercase text-ink sm:text-2xl">Featured projects</h3>
      </Reveal>
      <div className="mt-6 grid gap-7 lg:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
            <FeaturedCard project={project} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="font-display text-xl uppercase text-ink sm:text-2xl">More from GitHub</h3>
        <p className="mt-1.5 text-sm font-semibold text-muted">
          Repositories, private case studies, and open-source contributions.
        </p>
      </Reveal>

      <Reveal className="mt-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {projectCategories.map((category) => {
            const count =
              category === "All"
                ? allSmall.length
                : allSmall.filter((p) => p.tags.includes(category)).length;
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  hapticTap();
                  setFilter(category);
                }}
                className={`chip px-4 py-2 text-sm font-bold ${isActive ? "bg-accentfill" : ""}`}
              >
                {category}
                <span className="font-mono text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <li key={project.name} className="h-full">
              <SmallCard project={project} />
            </li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Reveal className="mt-12">
        <div className="card p-5 sm:p-6">
          <h4 className="font-display text-sm uppercase tracking-wide text-[#17130b]">
            Open source and forks
          </h4>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {openSourceRow.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="chip px-3.5 py-1.5 text-sm font-bold"
                >
                  <GithubIcon className="size-4" />
                  {repo.name}
                  <span className="text-xs opacity-70">
                    {repo.note}
                    {repo.license ? ` · ${repo.license}` : ""}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
