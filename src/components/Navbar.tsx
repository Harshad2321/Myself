import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
import { navLinks } from "../content";
import { useActiveSection, useScrolled } from "../hooks";
import { useTheme } from "../theme";
import { hapticTap } from "../lib/haptics";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";

const navIds = navLinks.map((l) => l.id);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navIds);
  const scrolled = useScrolled(16);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b-[3px] border-edge bg-bg transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_0_var(--c-hard)]" : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex size-9 -rotate-3 items-center justify-center rounded-lg border-[3px] border-inkline bg-card font-display text-sm text-[#17130b] shadow-[3px_3px_0_var(--c-hard)] transition-transform group-hover:rotate-3">
            HA
          </span>
          <span className="hidden font-mono text-sm font-bold text-ink sm:block">
            <span className="text-accent">$</span> harshad.agrawal
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-lg px-2.5 py-2 text-sm font-bold transition-colors ${
                    isActive ? "text-[#17130b]" : "text-ink hover:text-accent"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg border-[3px] border-inkline bg-accentfill shadow-[3px_3px_0_var(--c-hard)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              hapticTap();
              window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
            }}
            aria-label="Open quick navigation (Ctrl+K)"
            aria-keyshortcuts="Control+K Meta+K"
            className="sq-press flex size-10 items-center justify-center rounded-xl"
          >
            <Command className="size-4.5" aria-hidden="true" />
          </button>
          <a
            href="#contact"
            className="btn btn-primary hidden px-4 py-2 text-sm md:inline-flex"
            onClick={hapticTap}
          >
            Get in Touch!
          </a>
          <button
            type="button"
            onClick={() => {
              hapticTap();
              toggle();
            }}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="sq-press flex size-10 items-center justify-center rounded-full"
          >
            {theme === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </button>
          <button
            type="button"
            onClick={() => {
              hapticTap();
              setOpen((o) => !o);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="sq-press flex size-10 items-center justify-center rounded-xl lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t-[3px] border-edge bg-bg lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1.5 px-5 py-4 sm:px-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => {
                      hapticTap();
                      setOpen(false);
                    }}
                    aria-current={active === link.id ? "true" : undefined}
                    className={`block rounded-xl border-[3px] px-3 py-3 text-base font-bold transition-colors ${
                      active === link.id
                        ? "border-inkline bg-accentfill text-[#17130b] shadow-[3px_3px_0_var(--c-hard)]"
                        : "border-transparent text-ink hover:border-edge hover:bg-card hover:text-[#17130b]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 md:hidden">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Get in Touch!
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
