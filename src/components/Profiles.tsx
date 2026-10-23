import { Award, UserCheck } from "lucide-react";
import { codingProfiles, githubBadges, githubDeveloperProgramMember } from "../content";
import { GithubIcon, HackerrankIcon, LeetcodeIcon } from "./icons";
import { Reveal, Section } from "./primitives";
import { GitHubLive, LeetCodeLive } from "./LiveWidgets";

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
      cmd="ssh harshad@github"
      title="Coding Profiles and GitHub Stats"
    >
      <ul className="grid gap-5 sm:grid-cols-3">
        {codingProfiles.map((profile, i) => {
          const Icon = profileIcons[profile.name] ?? GithubIcon;
          return (
            <Reveal key={profile.name} delay={i * 0.07} className="h-full">
              <li className="h-full">
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="card lift group flex h-full flex-col p-6"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex size-12 items-center justify-center rounded-xl border-[3px] border-inkline bg-card shadow-[3px_3px_0_var(--c-hard)]"
                      aria-hidden="true"
                    >
                      <Icon className="size-6 text-accentcard" />
                    </span>
                    <span className="font-mono text-xs font-bold text-[#17130b]/60">
                      {profile.handle}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-lg text-[#17130b]">{profile.name}</p>
                  {profile.stat && (
                    <p className="mt-1 text-sm font-semibold text-[#45403a]">{profile.stat}</p>
                  )}
                </a>
              </li>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-10">
        <h3 className="font-mono text-sm font-bold text-accent">
          <span className="text-muted">~/live</span> $ watch gh stats
        </h3>
        <div className="mt-5 grid items-start gap-6 lg:grid-cols-2">
          <GitHubLive />
          <LeetCodeLive />
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <div className="card p-6 sm:p-7">
          <h3 className="flex items-center gap-2 font-display text-base uppercase text-[#17130b]">
            <Award className="size-5" aria-hidden="true" />
            GitHub achievement badges
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {githubBadges.map((badge) => (
              <li key={badge} className="chip px-4 py-2 text-sm font-bold">
                <Award className="size-4 text-[#17130b]" aria-hidden="true" />
                {badge}
              </li>
            ))}
            {githubDeveloperProgramMember && (
              <li className="chip px-4 py-2 text-sm font-bold">
                <UserCheck className="size-4 text-[#17130b]" aria-hidden="true" />
                Developer Program Member
              </li>
            )}
          </ul>
          <p className="mt-4 text-sm font-semibold text-[#45403a]">
            29 repositories on{" "}
            <a
              href="https://github.com/Harshad2321?tab=repositories"
              target="_blank"
              rel="noreferrer noopener"
              className="font-bold text-[#17130b] underline decoration-[3px] underline-offset-4 hover:bg-accentfill"
            >
              github.com/Harshad2321
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
