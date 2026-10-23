import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Database, FileDown, Mail, Network, Terminal } from "lucide-react";
import { heroGreeting, heroPitch, identity, roles } from "../content";
import { GithubIcon, HackerrankIcon, LeetcodeIcon, LinkedinIcon } from "./icons";
import { IconTile, Magnetic, PrimaryButton, SecondaryButton } from "./primitives";
import { AvatarPortrait } from "./Avatar";
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
