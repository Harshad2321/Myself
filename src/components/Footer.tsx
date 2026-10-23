import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ExternalLink } from "lucide-react";
import { identity } from "../content";
import { useScrolled } from "../hooks";
import { GithubIcon } from "./icons";

export function Footer() {
  const reduce = useReducedMotion();
  const showBackToTop = useScrolled(600);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent2 font-display text-sm font-bold text-[#07101d]">
            HA
          </span>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            <li>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 transition hover:text-ink"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="transition hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${identity.email}`} className="transition hover:text-ink">
                Email
              </a>
            </li>
            <li>
              <a
                href={identity.earlierPortfolio}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 transition hover:text-ink"
              >
                v1 portfolio
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-center text-xs text-faint">
          © {new Date().getFullYear()} {identity.name}. Built with React, TypeScript, Tailwind CSS
          and Framer Motion.
        </p>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur transition hover:border-accent/60 hover:text-accent"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
