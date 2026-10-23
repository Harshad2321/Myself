// Bakes static fallback snapshots for the live-data widgets. Run manually
// (node scripts/update-snapshots.mjs) or in CI before deploy so the site
// degrades to recent real numbers instead of nothing on API failure.
// Unauthenticated GitHub REST is fine here: this runs once at build time,
// not per visitor. Set GITHUB_TOKEN to also refresh the contribution
// calendar (GraphQL needs a token).

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const USER = "Harshad2321";
const LC_USER = "harshadagrawal";
const token = process.env.GITHUB_TOKEN;
const headers = token ? { Authorization: `Bearer ${token}` } : {};

async function fetchJson(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function github() {
  const user = await fetchJson(`https://api.github.com/users/${USER}`, { headers });
  const repos = await fetchJson(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
    { headers },
  );

  let stars = 0;
  const languages = {};
  const recent = [];
  for (const repo of repos) {
    stars += repo.stargazers_count;
    if (repo.language) languages[repo.language] = (languages[repo.language] ?? 0) + repo.size; // size = KB ≈ byte share
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
  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, bytes]) => ({ name, pct: Math.round((bytes / totalBytes) * 100) }));

  // Contribution calendar needs GraphQL + token; omitted otherwise.
  let calendar = null;
  if (token) {
    try {
      const gql = await fetchJson("https://api.github.com/graphql", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query($u:String!){ user(login:$u){ contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }`,
          variables: { u: USER },
        }),
      });
      const cal = gql?.data?.user?.contributionsCollection?.contributionCalendar;
      if (cal) {
        calendar = {
          total: cal.totalContributions,
          weeks: cal.weeks.map((w) =>
            w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
          ),
        };
      }
    } catch {
      // calendar stays null — the widget hides gracefully
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

async function leetcode() {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({
      query: `query($u:String!){ matchedUser(username:$u){ submitStats{ acSubmissionNum{ difficulty count } } } }`,
      variables: { u: LC_USER },
    }),
  });
  if (!res.ok) throw new Error(`leetcode ${res.status}`);
  const json = await res.json();
  const rows = json?.data?.matchedUser?.submitStats?.acSubmissionNum;
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const by = Object.fromEntries(rows.map((r) => [r.difficulty, r.count]));
  if (!by.All && !by.Easy && !by.Medium && !by.Hard) return null;
  return { solved: by, fetchedAt: new Date().toISOString() };
}

await mkdir(resolve(root, "src/data"), { recursive: true });

try {
  const gh = await github();
  await writeFile(resolve(root, "src/data/github-snapshot.json"), JSON.stringify(gh, null, 2));
  console.log(`github snapshot ok: ${gh.publicRepos} repos, ${gh.followers} followers, ${gh.stars} stars`);
} catch (e) {
  console.error(`github snapshot FAILED (kept previous file if any): ${e.message}`);
}

try {
  const lc = await leetcode();
  if (lc) {
    await writeFile(resolve(root, "src/data/leetcode-snapshot.json"), JSON.stringify(lc, null, 2));
    console.log(`leetcode snapshot ok: ${JSON.stringify(lc.solved)}`);
  } else {
    console.log("leetcode: no public submission stats — widget will stay hidden");
  }
} catch (e) {
  console.error(`leetcode snapshot FAILED: ${e.message}`);
}
