import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { identity } from "../content";
import { useScrolled } from "../hooks";
import { GithubIcon } from "./icons";
import { hapticTap } from "../lib/haptics";

export function Footer() {
  const reduce = useReducedMotion();
  const showBackToTop = useScrolled(600);

  const toTop = () => {
    hapticTap();
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t-[3px] border-edge bg-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex size-10 -rotate-3 items-center justify-center rounded-xl border-[3px] border-inkline bg-card font-display text-sm text-[#17130b] shadow-[3px_3px_0_var(--c-hard)] transition-transform group-hover:rotate-3">
            HA
          </span>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-ink">
            <li>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
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
                className="transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${identity.email}`} className="transition-colors hover:text-accent">
                Email
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-center font-mono text-xs font-bold text-muted">
          <span className="text-accent">$</span> echo "© {new Date().getFullYear()}{" "}
          {identity.name}. Built with React, TypeScript, Tailwind CSS and Framer Motion." && exit 0
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
            className="sq-press fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-xl"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
