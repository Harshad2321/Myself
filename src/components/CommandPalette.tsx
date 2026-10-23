import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, FileDown, Mail, MoonStar, Search } from "lucide-react";
import { identity, navLinks } from "../content";
import { hapticTap } from "../lib/haptics";
import { useTheme } from "../theme";
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from "./icons";

// Ctrl/Cmd+K quick-jump — jump to sections, grab the resume, copy the email,
// open profiles, toggle the theme. Self-contained: listens for the hotkey and
// the "ha:open-palette" event (fired by the navbar button).
type Action = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

export const OPEN_PALETTE_EVENT = "ha:open-palette";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<Element | null>(null);
  const { toggle } = useTheme();

  const actions = useMemo<Action[]>(() => {
    const go = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    const sectionActions: Action[] = navLinks.map((link) => ({
      id: `sec-${link.id}`,
      label: link.label,
      hint: `~/${link.id}`,
      run: go(link.id),
    }));
    return [
      ...sectionActions,
      {
        id: "resume",
        label: "Download Resume (PDF)",
        hint: "assets · Harshad_Agrawal_Resume.pdf",
        run: () => {
          window.setTimeout(() => {
            const a = document.createElement("a");
            a.href = identity.resumePdf;
            a.download = "";
            a.click();
          }, 120);
        },
      },
      {
        id: "copy-email",
        label: `Copy email — ${identity.email}`,
        hint: "clipboard",
        run: () => {
          void navigator.clipboard?.writeText(identity.email).catch(() => {});
        },
      },
      {
        id: "github",
        label: "Open GitHub profile",
        hint: identity.githubHandle,
        run: () => window.open(identity.github, "_blank", "noreferrer"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn profile",
        hint: "linkedin",
        run: () => window.open(identity.linkedin, "_blank", "noreferrer"),
      },
      {
        id: "leetcode",
        label: "Open LeetCode profile",
        hint: "harshadagrawal",
        run: () => window.open(identity.leetcode, "_blank", "noreferrer"),
      },
      { id: "theme", label: "Toggle light / dark theme", hint: "display", run: toggle },
    ];
  }, [toggle]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q),
    );
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement;
      setQuery("");
      setIndex(0);
      document.body.style.overflow = "hidden";
      window.setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = "";
      if (restoreFocus.current instanceof HTMLElement) restoreFocus.current.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const activate = (action: Action) => {
    hapticTap();
    setOpen(false);
    action.run();
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const action = filtered[index];
      if (action) activate(action);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-[#0f0f0e]/70 px-4 pt-[14vh] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            className="term w-full max-w-lg"
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="term-head">
              <span className="term-dot" aria-hidden="true" />
              <span className="term-dot" aria-hidden="true" />
              <span className="term-dot" aria-hidden="true" />
              <span className="ml-2 flex items-center gap-1.5">
                <Command className="size-3" aria-hidden="true" />K · quick jump
              </span>
            </div>
            <div className="border-b-2 border-dashed border-[#e8e4d8]/20 px-4 py-3">
              <label className="flex items-center gap-2 font-mono text-sm">
                <span className="term-prompt">$</span>
                <Search className="size-4 text-[#8f897b]" aria-hidden="true" />
                <span className="sr-only">Search sections and actions</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="jump to… (projects, resume, email)"
                  className="w-full bg-transparent text-[#e8e4d8] placeholder:text-[#8f897b] focus:outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
            </div>
            <ul role="listbox" aria-label="Actions" className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-2 font-mono text-xs text-[#8f897b]">
                  no matches — try "projects" or "resume"
                </li>
              )}
              {filtered.map((action, i) => (
                <li key={action.id} role="option" aria-selected={i === index}>
                  <button
                    type="button"
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => activate(action)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors ${
                      i === index ? "bg-[#ff6b35] text-[#17130b]" : "text-[#e8e4d8] hover:bg-[#e8e4d8]/10"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-bold">
                      {action.id === "resume" ? (
                        <FileDown className="size-4" aria-hidden="true" />
                      ) : action.id === "copy-email" ? (
                        <Mail className="size-4" aria-hidden="true" />
                      ) : action.id === "github" ? (
                        <GithubIcon className="size-4" />
                      ) : action.id === "linkedin" ? (
                        <LinkedinIcon className="size-4" />
                      ) : action.id === "leetcode" ? (
                        <LeetcodeIcon className="size-4" />
                      ) : action.id === "theme" ? (
                        <MoonStar className="size-4" aria-hidden="true" />
                      ) : (
                        <span aria-hidden="true">→</span>
                      )}
                      {action.label}
                    </span>
                    <span
                      className={`truncate text-xs ${i === index ? "text-[#17130b]/70" : "text-[#8f897b]"}`}
                    >
                      {action.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="term-head border-t-2 border-dashed border-[#e8e4d8]/20">
              ↑↓ navigate · ↵ open · esc close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
