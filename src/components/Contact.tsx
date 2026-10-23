import { useState, type FormEvent } from "react";
import { Check, Copy, Eye, Mail, MapPin, Phone, Send } from "lucide-react";
import { identity, openToRoles } from "../content";
import { GithubIcon, HackerrankIcon, LeetcodeIcon, LinkedinIcon } from "./icons";
import { PrimaryButton, Reveal, Section } from "./primitives";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, the mailto link still works
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="flex size-9 items-center justify-center rounded-lg border border-line text-muted transition hover:border-accent/60 hover:text-ink"
    >
      {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
    </button>
  );
}

function PhoneReveal() {
  const [shown, setShown] = useState(false);

  if (shown) {
    return (
      <a
        href={`tel:${identity.phone.replace(/\s/g, "")}`}
        className="font-mono text-base text-ink underline-offset-4 hover:underline"
      >
        {identity.phone}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setShown(true)}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-accent/60 hover:text-ink"
    >
      <Eye className="size-4" aria-hidden="true" />
      Click to reveal phone number
    </button>
  );
}

const links = [
  { label: "GitHub", value: identity.githubHandle, href: identity.github, Icon: GithubIcon },
  {
    label: "LinkedIn",
    value: "harshad-agrawal-486964322",
    href: identity.linkedin,
    Icon: LinkedinIcon,
  },
  { label: "LeetCode", value: "harshadagrawal", href: identity.leetcode, Icon: LeetcodeIcon },
  {
    label: "HackerRank",
    value: "harshad_agrawal1",
    href: identity.hackerrank,
    Icon: HackerrankIcon,
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-faint transition focus:border-accent/60 focus:outline-none";

  return (
    <Section id="contact" index="09" kicker="say hello" title="Get in Touch">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              I am open to {openToRoles.slice(0, 2).join(", ")}, {openToRoles.slice(2).join(", ")}{" "}
              and similar roles. Whether you have an opportunity, a project idea, or a question
              about anything on this page, my inbox is open.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex flex-wrap items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                  <Mail className="size-4.5" aria-hidden="true" />
                </span>
                <a
                  href={`mailto:${identity.email}`}
                  className="break-all font-medium underline-offset-4 hover:underline"
                >
                  {identity.email}
                </a>
                <CopyEmail />
              </li>
              <li className="flex flex-wrap items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                  <MapPin className="size-4.5" aria-hidden="true" />
                </span>
                {identity.location}
              </li>
              <li className="flex flex-wrap items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                  <Phone className="size-4.5" aria-hidden="true" />
                </span>
                <PhoneReveal />
              </li>
            </ul>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {links.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-full flex-col gap-2 rounded-xl border border-line bg-surface p-4 transition duration-200 hover:-translate-y-1 hover:border-accent/50"
                  >
                    <Icon className="size-5 text-accent" />
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="truncate text-xs text-faint" title={value}>
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
            aria-label="Contact form"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="contact-name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} resize-y`}
                placeholder="What would you like to talk about?"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PrimaryButton type="submit">
                <Send className="size-4" aria-hidden="true" />
                Send Message
              </PrimaryButton>
              <p className="text-xs text-faint">
                This form opens your email client with the message pre-filled.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
