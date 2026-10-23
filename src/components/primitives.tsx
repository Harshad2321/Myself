import { motion, useReducedMotion } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { hapticTap } from "../lib/haptics";

// Scroll reveal wrapper. With reduced motion the content renders in place
// (MotionConfig reducedMotion="user" disables the transform, opacity still fades once).
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Full-bleed section with the CLI-motif header: the kicker renders as a
// shell prompt (~/{id} $ {cmd}) while the title stays plainly readable for
// recruiters and ATS parsers.
export function Section({
  id,
  index,
  cmd,
  title,
  alternate = false,
  children,
}: {
  id: string;
  index: string;
  cmd: string;
  title: string;
  alternate?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-20 border-b-[3px] border-edge ${alternate ? "bg-bga" : "bg-bg"}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <div className="mb-10 md:mb-14">
            <p className="flex items-center gap-2 font-mono text-sm font-bold text-accent">
              <span className="text-muted" aria-hidden="true">
                ~/{id}
              </span>
              <span aria-hidden="true">$</span>
              <span className="text-ink">{cmd}</span>
              <span
                className="ml-1 inline-block h-4 w-[7px] translate-y-0.5 animate-caret bg-accent"
                aria-hidden="true"
              />
              <span className="sr-only">section {index}</span>
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-4 font-display text-3xl uppercase leading-none tracking-tight text-ink sm:text-4xl md:text-5xl"
            >
              {title}
            </h2>
            <div
              className="mt-4 h-2.5 w-24 rounded-full border-2 border-edge bg-transparent"
              aria-hidden="true"
            />
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Chip({ children, small }: { children: ReactNode; small?: boolean }) {
  return (
    <span className={`chip ${small ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}>
      {children}
    </span>
  );
}

// Magnetic hover wrapper, desktop fine pointers only, disabled under reduced motion.
export function Magnetic({
  children,
  strength = 0.2,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-200 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

// Buttons press like blocks: outline stays, shadow compresses (see .btn in
// index.css). Every activation also fires a short haptic tick on touch devices.
export function PrimaryButton({
  href,
  children,
  onClick,
  type,
  small,
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "submit";
  small?: boolean;
}) {
  const cls = `btn btn-primary ${small ? "px-4 py-2 text-sm" : ""}`;
  const activate = () => {
    hapticTap();
    onClick?.();
  };
  if (href) {
    return (
      <a href={href} className={cls} onClick={activate}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} onClick={activate}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  href,
  children,
  onClick,
  download,
  external,
  small,
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  download?: boolean;
  external?: boolean;
  small?: boolean;
}) {
  const cls = `btn btn-secondary ${small ? "px-4 py-2 text-sm" : ""}`;
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={cls}
      onClick={() => {
        hapticTap();
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
