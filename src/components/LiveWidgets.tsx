import { identity } from "../content";
import { useLive, type GitHubData, type LeetCodeData } from "../lib/live";

// "● live" marker: pulsing dot when numbers are real-time, steady "cached"
// label when serving the last good snapshot. Never implies freshness it
// doesn't have.
function LiveBadge({ live }: { live: boolean }) {
  return (
    <span
      className={`ml-auto inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 text-[9px] font-bold tracking-widest ${
        live
          ? "border-[#ff6b35]/60 text-[#ff6b35]"
          : "border-[#8f897b]/50 text-[#8f897b]"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${live ? "bg-[#ff6b35] animate-pulse" : "bg-[#8f897b]"}`}
        aria-hidden="true"
      />
      {live ? "LIVE" : "CACHED"}
      <span className="sr-only">{live ? "live data" : "cached data"}</span>
    </span>
  );
}

function SkeletonLines({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-2" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="h-4 animate-pulse rounded bg-[#e8e4d8]/10"
          style={{ width: `${88 - i * 12}%` }}
        />
      ))}
    </div>
  );
}

const heatColor = (count: number) => {
  if (count === 0) return "#232320";
  if (count <= 2) return "#5c2a12";
  if (count <= 5) return "#a03d16";
  if (count <= 8) return "#d5542a";
  return "#ff6b35";
};

function Heatmap({ calendar }: { calendar: NonNullable<GitHubData["calendar"]> }) {
  return (
    <div className="mt-3">
      <p className="tok"># contributions · last 12 months</p>
      <div
        className="mt-1.5 flex gap-[3px] overflow-x-auto pb-1"
        aria-label={`Contribution heatmap, ${calendar.total} contributions in the last year`}
        role="img"
      >
        {calendar.weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <span
                key={day.date}
                className="size-[9px] shrink-0 rounded-[2px]"
                style={{ background: heatColor(day.count) }}
                title={`${day.date}: ${day.count}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-1">
        contributions(1y) = <span className="tval">{calendar.total}</span>
      </p>
    </div>
  );
}

export function GitHubLive() {
  const { github } = useLive();

  return (
    <div className="term lift">
      <div className="term-head">
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="ml-2">~/github $ gh api /users/{identity.githubHandle}</span>
        {github ? <LiveBadge live={github.live} /> : null}
      </div>
      <div className="term-body">
        {!github ? (
          <SkeletonLines rows={5} />
        ) : (
          <>
            <p>
              public_repos = <span className="tval">{github.data.publicRepos}</span>
              <span className="tok"> · </span>
              followers = <span className="tval">{github.data.followers}</span>
              <span className="tok"> · </span>
              stars = <span className="tval">{github.data.stars}</span>
            </p>

            <p className="mt-3 tok"># top languages by bytes across public repos</p>
            <ul className="mt-1.5 space-y-1.5">
              {github.data.topLanguages.map((lang) => (
                <li key={lang.name} className="flex items-center gap-2">
                  <span className="w-36 shrink-0 truncate text-xs">{lang.name}</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full border border-[#8f897b]/40">
                    <span
                      className="block h-full bg-[#ff6b35]"
                      style={{ width: `${lang.pct}%` }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right text-xs tval">{lang.pct}%</span>
                </li>
              ))}
            </ul>

            {github.data.calendar ? <Heatmap calendar={github.data.calendar} /> : null}

            <p className="mt-3 tok"># recently pushed public repos</p>
            <ul className="mt-1 space-y-1">
              {github.data.recentRepos.map((repo) => (
                <li key={repo.name} className="flex flex-wrap items-baseline gap-x-2 text-xs">
                  <span className="tok">→</span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-bold text-[#e8e4d8] underline decoration-[#ff6b35] decoration-2 underline-offset-2 hover:text-[#ff6b35]"
                  >
                    {repo.name}
                  </a>
                  {repo.language && <span className="tok">{repo.language}</span>}
                  {repo.stars > 0 && <span className="tok">★{repo.stars}</span>}
                  <span className="tok">{repo.pushedAt.slice(0, 10)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export function LeetCodeLive() {
  const { leetcode } = useLive();

  // No public stats on the profile (or snapshot absent): hide, never fake.
  if (leetcode && leetcode.data === null) return null;
  const data = leetcode?.data;

  const difficulties: { key: keyof NonNullable<LeetCodeData["solved"]>; label: string }[] = [
    { key: "Easy", label: "easy" },
    { key: "Medium", label: "medium" },
    { key: "Hard", label: "hard" },
  ];

  return (
    <div className="term lift">
      <div className="term-head">
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="ml-2">~/leetcode $ curl solved --user harshadagrawal</span>
        {leetcode ? <LiveBadge live={leetcode.live} /> : null}
      </div>
      <div className="term-body">
        {!leetcode || !data ? (
          <SkeletonLines rows={4} />
        ) : (
          <>
            <p>
              total_solved = <span className="tval">{data.solved.All ?? 0}</span>
              <span className="tok"> · </span>
              <a
                href={identity.leetcode}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#e8e4d8] underline decoration-[#ff6b35] decoration-2 underline-offset-2 hover:text-[#ff6b35]"
              >
                leetcode.com/u/harshadagrawal →
              </a>
            </p>
            <ul className="mt-2 space-y-1.5">
              {difficulties.map(({ key, label }) => {
                const value = data.solved[key] ?? 0;
                const max = Math.max(
                  data.solved.Easy ?? 0,
                  data.solved.Medium ?? 0,
                  data.solved.Hard ?? 0,
                  1,
                );
                return (
                  <li key={key} className="flex items-center gap-2">
                    <span className="w-14 shrink-0 text-xs">{label}</span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full border border-[#8f897b]/40">
                      <span
                        className="block h-full bg-[#ff6b35]"
                        style={{ width: `${Math.round((value / max) * 100)}%` }}
                      />
                    </span>
                    <span className="w-6 shrink-0 text-right text-xs tval">{value}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
