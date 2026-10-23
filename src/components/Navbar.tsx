import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navLinks } from "../content";
import { useActiveSection, useScrolled } from "../hooks";
import { useTheme } from "../theme";

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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent2 font-display text-sm font-bold text-[#07101d]">
            HA
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide sm:block">
            harshad<span className="text-accent">.</span>agrawal
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative block px-2.5 py-2 text-sm transition-colors ${
                  active === link.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-accent to-accent2"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent/60 hover:text-ink"
          >
            {theme === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent/60 hover:text-ink lg:hidden"
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
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? "true" : undefined}
                    className={`block rounded-lg px-3 py-3 text-base transition-colors ${
                      active === link.id
                        ? "bg-elevated text-ink"
                        : "text-muted hover:bg-elevated hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
