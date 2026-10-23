import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Lock, ShieldCheck } from "lucide-react";
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
import { Chip, Reveal, Section } from "./primitives";

function FeaturedCard({ project }: { project: (typeof featuredProjects)[number] }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_50px_-16px_var(--c-accent)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent">{project.year}</p>
          <h3 className="mt-1.5 font-display text-xl font-bold leading-snug sm:text-2xl">
            {project.title}
          </h3>
        </div>
        {project.repos && project.repos.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {project.repos.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`View ${repo.name} on GitHub`}
                  className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent/60 hover:text-ink"
                >
                  <GithubIcon className="size-4" />
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-3 text-sm text-muted sm:text-base">{project.pitch}</p>

      <ul className="mt-4 flex-1 space-y-2.5">
        {project.bullets.map((bullet) => (
          <li
            key={bullet.slice(0, 48)}
            className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent2" aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>

      {project.callout && (
        <p className="mt-4 flex gap-2.5 rounded-xl border border-accent/30 bg-elevated p-4 text-sm leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-accent" aria-hidden="true" />
          {project.callout}
        </p>
      )}

      {project.credentialId && (
        <p className="mt-4 font-mono text-xs text-faint">
          Credential ID: {project.credentialId}
        </p>
      )}

      <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
        {project.tech.map((tech) => (
          <li key={tech}>
            <Chip small>{tech}</Chip>
          </li>
        ))}
      </ul>
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
      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-sm font-semibold leading-snug break-words sm:text-base">
          {project.name}
        </h4>
        {project.isPrivate ? (
          <span
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-500"
            title="This repository is private"
          >
            <Lock className="size-3" aria-hidden="true" />
            Code private
          </span>
        ) : project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View ${project.name} on GitHub`}
            className="shrink-0 text-muted transition hover:text-accent"
          >
            <GithubIcon className="size-4.5" />
          </a>
        ) : null}
      </div>

      {project.desc && <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.desc}</p>}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {project.lang && (
          <span className="rounded-md border border-line bg-elevated px-1.5 py-0.5 font-mono text-[11px] text-faint">
            {project.lang}
          </span>
        )}
        {project.license && (
          <span className="rounded-md border border-line bg-elevated px-1.5 py-0.5 font-mono text-[11px] text-faint">
            {project.license}
          </span>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-md border border-line bg-elevated px-1.5 py-0.5 font-mono text-[11px] text-faint transition hover:border-accent/50 hover:text-ink"
          >
            <ExternalLink className="size-3" aria-hidden="true" />
            live
          </a>
        )}
        {project.tags.map((tag) => (
          <span key={tag} className="text-[11px] text-accent">
            #{tag}
          </span>
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
    <Section id="projects" index="04" kicker="what I have built" title="Projects">
      <Reveal>
        <h3 className="font-display text-xl font-bold sm:text-2xl">Featured projects</h3>
      </Reveal>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
            <FeaturedCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="font-display text-xl font-bold sm:text-2xl">More from GitHub</h3>
        <p className="mt-1.5 text-sm text-muted">
          Repositories, private case studies, and open-source contributions.
        </p>
      </Reveal>

      <Reveal className="mt-6">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
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
                onClick={() => setFilter(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
                  isActive
                    ? "border-transparent bg-gradient-to-r from-accent to-accent2 text-[#07101d]"
                    : "border-line bg-surface text-muted hover:border-accent/60 hover:text-ink"
                }`}
              >
                {category}
                <span className="ml-1.5 font-mono text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <li key={project.name} className="h-full">
              <SmallCard project={project} />
            </li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Reveal className="mt-10">
        <div className="rounded-2xl border border-dashed border-line bg-surface/50 p-5">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
            Open source and forks
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {openSourceRow.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-3.5 py-1.5 text-sm text-muted transition hover:border-accent/50 hover:text-ink"
                >
                  <GithubIcon className="size-4" />
                  {repo.name}
                  <span className="text-xs text-faint">
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
