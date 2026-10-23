import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Database, FileDown, Mail, Network, Terminal } from "lucide-react";
import { heroGreeting, heroPitch, identity, roles } from "../content";
import { GithubIcon, HackerrankIcon, LeetcodeIcon, LinkedinIcon } from "./icons";
import { IconTile, Magnetic, PrimaryButton, SecondaryButton } from "./primitives";
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
        <span className="mr-1 text-[#17130b]/60">{">"}</span>
        {roles[roleIndex].slice(0, chars)}
        <span className="animate-caret ml-0.5 inline-block h-5 w-[3px] translate-y-0.5 bg-inkline" />
      </span>
    </p>
  );
}

// Flat-shaded placeholder portrait. Replace with commissioned art — see
// AVATAR-BRIEF.md at the project root for the illustration brief.
function AvatarPortrait({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Illustrated portrait of Harshad Agrawal (placeholder)">
      <rect width="200" height="200" fill="#fdf3d3" />
      {/* hoodie */}
      <path
        d="M28 204 L34 168 C38 148 52 140 66 136 L80 150 L120 150 L134 136 C148 140 162 148 166 168 L172 204 Z"
        fill="#7dd3fc"
        stroke="#101010"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M92 152 L96 196 M108 152 L104 196" stroke="#101010" strokeWidth="4" strokeLinecap="round" />
      {/* neck */}
      <path d="M86 112 h28 v30 h-28 Z" fill="#e0a860" stroke="#101010" strokeWidth="5" />
      {/* ears */}
      <circle cx="58" cy="88" r="9" fill="#f1c27d" stroke="#101010" strokeWidth="5" />
      <circle cx="142" cy="88" r="9" fill="#f1c27d" stroke="#101010" strokeWidth="5" />
      {/* face */}
      <path
        d="M60 78 C60 48 74 36 100 36 C126 36 140 48 140 78 L140 92 C140 118 124 134 100 134 C76 134 60 118 60 92 Z"
        fill="#f1c27d"
        stroke="#101010"
        strokeWidth="5"
      />
      {/* hair, side-swept */}
      <path
        d="M54 88 C48 34 76 16 100 16 C124 16 152 32 146 88 C142 70 138 58 130 52 C118 62 90 64 72 55 C64 62 58 72 54 88 Z"
        fill="#2a1b10"
        stroke="#101010"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* brows + eyes */}
      <path d="M72 82 L88 79 M112 79 L128 82" stroke="#101010" strokeWidth="5" strokeLinecap="round" />
      <rect x="75" y="88" width="12" height="15" rx="5" fill="#101010" />
      <rect x="113" y="88" width="12" height="15" rx="5" fill="#101010" />
      {/* blush + smile */}
      <circle cx="70" cy="106" r="6" fill="#f9a8d4" />
      <circle cx="130" cy="106" r="6" fill="#f9a8d4" />
      <path d="M88 112 Q100 122 112 112" stroke="#101010" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const socials = [
  { label: "GitHub", href: identity.github, Icon: GithubIcon },
  { label: "LinkedIn", href: identity.linkedin, Icon: LinkedinIcon },
  { label: "LeetCode", href: identity.leetcode, Icon: LeetcodeIcon },
  { label: "HackerRank", href: identity.hackerrank, Icon: HackerrankIcon },
  { label: "Email", href: `mailto:${identity.email}`, Icon: Mail },
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
      className="sec-a relative flex min-h-[100svh] items-center overflow-hidden border-b-[3px] border-inkline pb-20 pt-28"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_auto] lg:gap-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="sticker fill-mint rotate-2">
              <span className="inline-block size-2 rounded-full bg-[#101010]" aria-hidden="true" />
              Open to work
            </span>
            <span className="sticker fill-gold -rotate-2" title="AI for Bharat Hackathon 2026 — Final Round">
              6th / 96,000+
            </span>
          </div>

          <p className="mt-8 font-mono text-sm font-bold tracking-wide text-ink">{heroGreeting}</p>

          <h1 className="mt-3 font-display uppercase leading-[0.95] tracking-tight text-ink">
            <span className="sr-only">Harshad Agrawal</span>
            <span aria-hidden="true" className="block text-6xl sm:text-7xl xl:text-8xl">
              <Scramble text="HARSHAD" />
            </span>
            <span
              aria-hidden="true"
              className="mt-3 inline-block -rotate-1 rounded-2xl border-4 border-inkline bg-[#f9a8d4] px-4 py-1 text-6xl text-[#17130b] shadow-[8px_8px_0_var(--c-hard)] sm:text-7xl xl:text-8xl"
            >
              <Scramble text="AGRAWAL" />
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="chip px-3 py-1.5 font-mono text-xs font-bold"
              aria-label="Level 5 — fifth semester of eight, B.Tech AI and ML"
            >
              LV.5 · SEM 5/8 · B.TECH AI &amp; ML
            </span>
            <span className="font-mono text-xs font-bold text-ink/70">
              {identity.pronouns} · {identity.location}
            </span>
          </div>

          <div className="mt-5">
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
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noreferrer noopener"}
                  aria-label={label}
                  className="sq-press flex size-12 items-center justify-center rounded-xl"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Avatar frame + floating icon tiles, desktop only so mobile keeps
            name, pitch and CTAs within the first screen */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto hidden pb-10 pr-10 lg:block"
          aria-hidden="true"
        >
          <div className="size-64 rotate-[-2deg] rounded-3xl border-4 border-inkline bg-[#ffde59] p-3 shadow-[9px_9px_0_var(--c-hard)] xl:size-72">
            <div className="size-full overflow-hidden rounded-2xl border-[3px] border-inkline">
              <AvatarPortrait className="size-full" />
            </div>
          </div>
          <span className="sticker fill-sky absolute -bottom-1 -left-5 rotate-[-5deg]">
            AI/ML Engineer
          </span>
          <IconTile
            Icon={Network}
            fill="fill-pink"
            bobClass="bob"
            className="absolute -right-2 top-2"
            label="Multi-agent systems"
          />
          <IconTile
            Icon={Terminal}
            fill="fill-mint"
            bobClass="bob-2"
            className="absolute -right-5 bottom-16"
            label="Backend engineering"
          />
          <IconTile
            Icon={Database}
            fill="fill-lav"
            bobClass="bob-3"
            className="absolute -left-7 top-10"
            label="Data pipelines"
          />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="sq-press absolute bottom-6 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full"
      >
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
