import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import ghSnapshot from "../data/github-snapshot.json";
import lcSnapshot from "../data/leetcode-snapshot.json";

// Live-data layer. Fetches from the serverless proxies after first paint
// (idle callback), falls back to the build-time snapshots on any failure so
// widgets always have real numbers — live:true only when the API answered.

export type GitHubData = {
  login: string;
  publicRepos: number;
  followers: number;
  stars: number;
  topLanguages: { name: string; pct: number }[];
  calendar: { total: number; weeks: { date: string; count: number }[][] } | null;
  recentRepos: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    pushedAt: string;
    url: string;
  }[];
  fetchedAt: string;
};

export type LeetCodeData = {
  solved: { All?: number; Easy?: number; Medium?: number; Hard?: number };
  fetchedAt: string;
};

type Feed<T> = { live: boolean; data: T } | null;

// LeetCode data is nullable: the profile may expose no public stats, in
// which case the API answers { data: null } and the widget stays hidden.
type LiveState = {
  github: Feed<GitHubData>;
  leetcode: Feed<LeetCodeData | null>;
};

const LiveContext = createContext<LiveState>({ github: null, leetcode: null });

// eslint-disable-next-line react-refresh/only-export-components
export const useLive = () => useContext(LiveContext);

async function fetchFeed<T>(url: string, snapshot: T): Promise<Feed<T>> {
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(String(res.status));
    const json = (await res.json()) as { live: boolean; data: T };
    if (!json?.data) throw new Error("empty");
    return { live: json.live, data: json.data };
  } catch {
    // Proxy unreachable (local dev without functions, bad network) — use the
    // baked snapshot. `live:false` lets the UI label it as cached.
    return { live: false, data: snapshot };
  }
}

export function LiveProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LiveState>({ github: null, leetcode: null });

  useEffect(() => {
    // Never block first paint: start after load + idle.
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const load = () => {
      if (cancelled) return;
      void fetchFeed<GitHubData>("/api/github", ghSnapshot as GitHubData).then((github) => {
        if (!cancelled) setState((s) => ({ ...s, github }));
      });
      void fetchFeed<LeetCodeData | null>("/api/leetcode", lcSnapshot as LeetCodeData).then(
        (leetcode) => {
          if (!cancelled) setState((s) => ({ ...s, leetcode }));
        },
      );
    };
    const start = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(load);
      } else {
        timeoutId = window.setTimeout(load, 400);
      }
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return <LiveContext.Provider value={state}>{children}</LiveContext.Provider>;
}
