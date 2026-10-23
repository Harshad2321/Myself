# Deploying to Vercel (replacing myself-chi-mauve.vercel.app)

This is a Vite static site plus two serverless API functions in `api/`:

- `api/github.ts` — proxies the public GitHub REST/GraphQL API with a
  20-minute in-memory cache and `s-maxage=1200` edge caching.
- `api/leetcode.ts` — proxies LeetCode's public GraphQL endpoint, 30-minute
  cache. If the profile has no public stats it returns `data: null` and the
  widget simply stays hidden.

Both fall back to build-time snapshots baked in `src/data/*-snapshot.json`
(see below), so a rate-limited or failing upstream never breaks the page —
widgets show a `CACHED` badge instead of `LIVE`.

## Steps

1. **Push to GitHub.** This repo deploys from
   `https://github.com/Harshad2321/Myself` (branch `main`):

   ```bash
   git init
   git add -A
   git commit -m "portfolio v4"
   git remote add origin https://github.com/Harshad2321/Myself.git
   git push -f origin main   # -f replaces the old v1 code in that repo
   ```

2. **Vercel picks it up automatically.** The existing "Myself" project is
   already linked to that repo: every push to `main` triggers a deploy.
   Vercel auto-detects Vite (build `npm run build`, output `dist`) and the
   `api/` serverless functions — no config change needed.

3. **Set the `GITHUB_TOKEN` environment variable** (Project → Settings →
   Environment Variables). Any fine-grained PAT with **public repo read**
   access is enough. This is optional but recommended:
   - without it: 60 unauthenticated req/hr per IP *on the serverless side*,
     mitigated by the 20-min cache — fine for a portfolio;
   - with it: 5,000 req/hr and the contribution heatmap (GraphQL-only)
     becomes available.

4. **Domain**: the deploy replaces the old v1 site at
   `https://myself-chi-mauve.vercel.app` (same Vercel project, same URL).
   The OG/meta tags in `index.html` already point there.

## Keeping the fallback snapshots fresh

Snapshots are committed real values, refreshed by:

```bash
node scripts/update-snapshots.mjs            # public APIs, no token needed
GITHUB_TOKEN=ghp_xxx node scripts/update-snapshots.mjs   # + contribution calendar
```

Run it occasionally before a deploy (it never deletes a previous snapshot on
failure). `scripts/generate-og.mjs` regenerates `public/og.png` if you change
the OG card stats.

## Deliberately skipped

- **Resume download counter** — a real counter needs a durable store
  (Vercel KV / Upstash). An in-memory counter resets on every cold start and
  would undercount, which is worse than no counter. Add Vercel KV later if
  wanted.
- **HackerRank live stats** — no public API; stays a plain link.
- `my image.png` (the original photo) is left in the repo root untouched;
  the processed variants live in `public/assets/avatar-*`.
