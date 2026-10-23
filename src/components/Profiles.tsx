import { Award, UserCheck } from "lucide-react";
import { codingProfiles, githubBadges, githubDeveloperProgramMember } from "../content";
import { GithubIcon, HackerrankIcon, LeetcodeIcon } from "./icons";
import { Reveal, Section } from "./primitives";

const profileIcons: Record<string, typeof GithubIcon> = {
  GitHub: GithubIcon,
  LeetCode: LeetcodeIcon,
  HackerRank: HackerrankIcon,
};

export function Profiles() {
  return (
    <Section
      id="profiles"
      index="08"
      kicker="where I code"
      title="Coding Profiles and GitHub Stats"
    >
      <ul className="grid gap-4 sm:grid-cols-3">
        {codingProfiles.map((profile, i) => {
          const Icon = profileIcons[profile.name] ?? GithubIcon;
          return (
            <Reveal key={profile.name} delay={i * 0.07} className="h-full">
              <li className="h-full">
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-7 text-muted transition group-hover:text-accent" />
                    <span className="font-mono text-xs text-faint">{profile.handle}</span>
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold">{profile.name}</p>
                  {profile.stat && <p className="mt-1 text-sm text-muted">{profile.stat}</p>}
                </a>
              </li>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-8">
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold">
            <Award className="size-5 text-accent" aria-hidden="true" />
            GitHub achievement badges
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {githubBadges.map((badge) => (
              <li
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-4 py-2 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:border-accent/50"
              >
                <Award className="size-4 text-accent2" aria-hidden="true" />
                {badge}
              </li>
            ))}
            {githubDeveloperProgramMember && (
              <li className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-4 py-2 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:border-accent/50">
                <UserCheck className="size-4 text-accent2" aria-hidden="true" />
                Developer Program Member
              </li>
            )}
          </ul>
          <p className="mt-4 text-sm text-muted">
            29 repositories on{" "}
            <a
              href="https://github.com/Harshad2321?tab=repositories"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              github.com/Harshad2321
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
