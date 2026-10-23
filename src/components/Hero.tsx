import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, FileDown } from "lucide-react";
import { heroGreeting, heroPitch, identity, currentlyBuilding, roles } from "../content";
import { GithubIcon, HackerrankIcon, LeetcodeIcon, LinkedinIcon } from "./icons";
import { Magnetic, PrimaryButton, SecondaryButton } from "./primitives";
import { Scramble } from "./Scramble";
import { celebrate } from "../lib/celebrate";
import { hapticMoment } from "../lib/haptics";

function TypedRoles() {
  const reduce = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const full = roles[roleIndex];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (chars < full.length) setChars(chars + 1);
          else setDeleting(true);
        } else if (chars > 0) {
          setChars(chars - 1);
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      },
      deleting ? 38 : 82,
    );
    return () => clearTimeout(timer);
  }, [chars, deleting, roleIndex, reduce]);

  if (reduce) {
    return <p className="font-mono text-base font-bold text-ink sm:text-lg">{roles.join("  ·  ")}</p>;
  }

  return (
    <p className="font-mono text-base font-bold text-ink sm:text-lg" aria-live="off">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        <span className="mr-1 text-accent">$</span>
        {roles[roleIndex].slice(0, chars)}
        <span className="animate-caret ml-0.5 inline-block h-5 w-[3px] translate-y-0.5 bg-accentfill" />
      </span>
    </p>
  );
}

// Hero status terminal: the real headline numbers rendered as shell output —
// status flags, rank, semester and the experience one-liner. All values come
// straight from content (quickStats / education).
function StatusTerminal() {
  const rows: [string, string][] = [
    ["open_to_work", "true"],
    ["hackathon_rank", "6th / 96,000+"],
    ["semester", "5/8 · CGPA 7.85/10"],
  ];
  return (
    <div className="term w-full max-w-md">
      <div className="term-head">
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="ml-2">harshad@portfolio: ~</span>
      </div>
      <div className="term-body">
        <p>
          <span className="term-prompt">$</span> status --check
        </p>
        {rows.map(([key, value]) => (
          <p key={key}>
            <span className="tok">[</span> {key}: <span className="tval">{value}</span>{" "}
            <span className="tok">]</span>
          </p>
        ))}
        <p className="mt-1">
          <span className="term-prompt">$</span> wc -l experience.log
        </p>
        <p className="tval">6+ mo industry · 17-agent platform · 194 tests passing</p>
        <p className="mt-1">
          <span className="term-prompt">$</span> cat building_now.txt
        </p>
        <p className="tval">{currentlyBuilding}</p>
      </div>
    </div>
  );
}

const socials = [
  { label: "GitHub", href: identity.github, Icon: GithubIcon },
  { label: "LinkedIn", href: identity.linkedin, Icon: LinkedinIcon },
  { label: "LeetCode", href: identity.leetcode, Icon: LeetcodeIcon },
  { label: "HackerRank", href: identity.hackerrank, Icon: HackerrankIcon },
];

export function Hero() {
  const reduce = useReducedMotion();

  const onResumeDownload = () => {
    hapticMoment();
    celebrate();
  };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b-[3px] border-edge bg-bg pb-20 pt-28"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_auto]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-sm font-bold text-muted">
            <span className="text-accent">$</span> echo "{heroGreeting}"
          </p>

          <h1 className="mt-3 font-display uppercase leading-[0.95] tracking-tight text-ink">
            <span className="sr-only">Harshad Agrawal</span>
            <span aria-hidden="true" className="block text-6xl sm:text-7xl xl:text-8xl">
              <Scramble text="HARSHAD" />
            </span>
            <span
              aria-hidden="true"
              className="mt-3 inline-block -rotate-1 rounded-2xl border-4 border-edge bg-accentfill px-4 py-1 text-6xl text-[#17130b] shadow-[8px_8px_0_var(--c-hard)] sm:text-7xl xl:text-8xl"
            >
              <Scramble text="AGRAWAL" />
            </span>
          </h1>

          {/* Fixed height so the typing animation never shifts the layout */}
          <div className="mt-5 min-h-8 sm:min-h-9">
            <TypedRoles />
          </div>

          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-muted sm:text-lg">
            {heroPitch}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <PrimaryButton href="#projects">View Projects</PrimaryButton>
            </Magnetic>
            <Magnetic>
              <SecondaryButton href={identity.resumePdf} download onClick={onResumeDownload}>
                <FileDown className="size-4.5" aria-hidden="true" />
                Download Resume
              </SecondaryButton>
            </Magnetic>
            <Magnetic>
              <SecondaryButton href="#contact">Contact</SecondaryButton>
            </Magnetic>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-3" aria-label="Social links">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="sq-press flex size-12 items-center justify-center rounded-xl"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${identity.email}`}
                aria-label="Email"
                className="sq-press flex size-12 items-center justify-center rounded-xl font-mono text-sm font-bold"
              >
                @
              </a>
            </li>
          </ul>

          {/* Compact status line for mobile — in flow, never overlapping */}
          <p className="mt-6 font-mono text-[11px] font-bold leading-relaxed text-muted lg:hidden">
            <span className="text-accent">$</span> status --check →{" "}
            <span className="text-ink">open_to_work: true</span> ·{" "}
            <span className="text-ink">rank 6th/96,000+</span> ·{" "}
            <span className="text-ink">sem 5/8</span>
          </p>
        </motion.div>

        {/* Status terminal — the recruiter numbers as shell output. Desktop
            only so mobile keeps name, pitch and CTAs within the first screen. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mx-auto hidden lg:block"
        >
          <StatusTerminal />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="sq-press absolute bottom-6 left-1/2 hidden size-11 -translate-x-1/2 items-center justify-center rounded-full lg:flex"
      >
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
