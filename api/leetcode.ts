import type { VercelRequest, VercelResponse } from "@vercel/node";
import snapshot from "../src/data/leetcode-snapshot.json";

const LC_USER = "harshadagrawal";
const TTL_MS = 30 * 60 * 1000;

type Solved = { All?: number; Easy?: number; Medium?: number; Hard?: number };
type LeetCodeData = { solved: Solved; fetchedAt: string };

type CacheEntry = { data: LeetCodeData; at: number };
let cache: CacheEntry | null = null;

async function fetchLive(): Promise<LeetCodeData> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({
      query:
        "query($u:String!){ matchedUser(username:$u){ submitStats{ acSubmissionNum{ difficulty count } } } }",
      variables: { u: LC_USER },
    }),
  });
  if (!res.ok) throw new Error(`leetcode ${res.status}`);
  const json = await res.json();
  const rows: { difficulty: keyof Solved; count: number }[] | undefined =
    json?.data?.matchedUser?.submitStats?.acSubmissionNum;
  if (!Array.isArray(rows) || rows.length === 0) throw new Error("leetcode: no public stats");
  const solved: Solved = {};
  for (const row of rows) solved[row.difficulty] = row.count;
  if (!solved.All && !solved.Easy && !solved.Medium && !solved.Hard) {
    throw new Error("leetcode: empty stats");
  }
  return { solved, fetchedAt: new Date().toISOString() };
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");

  if (cache && Date.now() - cache.at < TTL_MS) {
    return res.status(200).json({ live: true, cached: true, data: cache.data });
  }
  try {
    const data = await fetchLive();
    cache = { data, at: Date.now() };
    return res.status(200).json({ live: true, cached: false, data });
  } catch {
    const snap = snapshot as LeetCodeData | null;
    if (!snap) {
      // Profile has no public stats — the widget stays hidden, never broken.
      return res.status(200).json({ live: false, cached: false, data: null });
    }
    const data = cache ? cache.data : snap;
    return res.status(200).json({ live: false, cached: true, data });
  }
}
