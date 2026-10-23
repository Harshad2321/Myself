import type { VercelRequest, VercelResponse } from "@vercel/node";
// Baked-at-build fallback so a rate-limited or failing upstream never breaks
// the widget — the client also imports this same snapshot for offline use.
import snapshot from "../src/data/github-snapshot.json";

const USER = "Harshad2321";
const TTL_MS = 20 * 60 * 1000; // 20 minutes

type Language = { name: string; pct: number };
type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  url: string;
};
type GitHubData = {
  login: string;
  publicRepos: number;
  followers: number;
  stars: number;
  topLanguages: Language[];
  calendar: { total: number; weeks: { date: string; count: number }[][] } | null;
  recentRepos: Repo[];
  fetchedAt: string;
};

type CacheEntry = { data: GitHubData; at: number };
let cache: CacheEntry | null = null;

const jsonHeaders = (token?: string) => {
  const h: Record<string, string> = { "User-Agent": "portfolio-proxy", Accept: "application/vnd.github+json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
};

async function fetchLive(token: string | undefined): Promise<GitHubData> {
  const headers = jsonHeaders(token);
  const [user, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`, { headers }).then((r) => {
      if (!r.ok) throw new Error(`github user ${r.status}`);
      return r.json();
    }),
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers }).then(
      (r) => {
        if (!r.ok) throw new Error(`github repos ${r.status}`);
        return r.json();
      },
    ),
  ]);

  let stars = 0;
  const languages: Record<string, number> = {};
  const recent: Repo[] = [];
  for (const repo of repos) {
    stars += repo.stargazers_count;
    if (repo.language) languages[repo.language] = (languages[repo.language] ?? 0) + repo.size;
    if (recent.length < 6) {
      recent.push({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
        url: repo.html_url,
      });
    }
  }
  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0) || 1;
  const topLanguages: Language[] = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, bytes]) => ({ name, pct: Math.round((bytes / totalBytes) * 100) }));

  let calendar: GitHubData["calendar"] = null;
  if (token) {
    try {
      const gql = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          query:
            "query($u:String!){ user(login:$u){ contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }",
          variables: { u: USER },
        }),
      }).then((r) => r.json());
      const cal = gql?.data?.user?.contributionsCollection?.contributionCalendar;
      if (cal) {
        calendar = {
          total: cal.totalContributions,
          weeks: cal.weeks.map((w: { contributionDays: { date: string; contributionCount: number }[] }) =>
            w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
          ),
        };
      }
    } catch {
      // calendar is optional — stay null on failure
    }
  }

  return {
    login: user.login,
    publicRepos: user.public_repos,
    followers: user.followers,
    stars,
    topLanguages,
    calendar,
    recentRepos: recent,
    fetchedAt: new Date().toISOString(),
  };
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  // Edge/browser cache aligned with the in-memory TTL: repeat visitors within
  // the window never trigger an upstream call.
  res.setHeader("Cache-Control", "s-maxage=1200, stale-while-revalidate=3600");

  const token = process.env.GITHUB_TOKEN;
  const fresh = cache && Date.now() - cache.at < TTL_MS;
  if (cache && fresh) {
    return res.status(200).json({ live: true, cached: true, data: cache.data });
  }
  try {
    const data = await fetchLive(token);
    cache = { data, at: Date.now() };
    return res.status(200).json({ live: true, cached: false, data });
  } catch {
    // Upstream failed or rate-limited: serve the last good value if we have
    // one, else the build-time snapshot. Flag `live: false` so the UI can
    // label the numbers as cached instead of pretending they are fresh.
    const data = cache ? cache.data : (snapshot as GitHubData);
    return res.status(200).json({ live: false, cached: true, data });
  }
}
