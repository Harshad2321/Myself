# Harshad Agrawal — Portfolio

Personal portfolio of Harshad Agrawal (AI/ML Engineer, Pune) built with
React 19, TypeScript, Vite, Tailwind CSS 4 and Framer Motion.

**Live:** https://myself-chi-mauve.vercel.app — auto-deploys from this
repository's `main` branch via Vercel.

## What's inside

- **Neo-brutalist "systems engineer" shell** — charcoal base, one burnt-orange
  accent, thick ink outlines and hard offset shadows; a terminal/CLI motif
  runs through the whole site (boot intro, status card, `~/section $ cmd`
  headers, `requirements.txt`-style skill blocks).
- **Real data only** — every number (6+ months experience, 17-agent platform,
  194 tests, 6th/96,000+, CGPA 7.85) comes from `src/content.ts`; skill chips
  with an orange underline link to the project/experience/cert that proves
  them.
- **Live widgets** — GitHub stats (repos/followers/stars, top languages by
  bytes, contribution heatmap, recently-pushed repos) and LeetCode
  solved-by-difficulty, fetched from `api/` serverless functions with a
  20–30 min cache and build-time snapshot fallback (`src/data/`).
- **Interaction layer** — haptic press feedback, block-press buttons,
  achievement toasts, XP-style scroll progress, scramble name reveal,
  Ctrl/Cmd+K command palette, canvas-rendered shareable "flex card",
  confetti on resume download and form submit. All of it respects
  `prefers-reduced-motion` and stays keyboard-accessible.

## Editing content

All copy lives in `src/content.ts`. Edit text there without touching
components. The photo is `public/assets/avatar-*` (processed from
`my image.png`; re-run the crop if you replace the original).

## Scripts

```bash
npm run dev                     # local dev (live widgets fall back to snapshots)
npm run build                   # typecheck + production build → dist/
node scripts/update-snapshots.mjs      # refresh GitHub/LeetCode fallback data
GITHUB_TOKEN=… node scripts/update-snapshots.mjs   # + contribution calendar
node scripts/generate-og.mjs    # regenerate public/og.png share card
```

## Deploying

See [DEPLOY.md](DEPLOY.md). In short: push to `main` — Vercel builds it.
Set `GITHUB_TOKEN` (public-read PAT) in the Vercel project env for higher
API rate limits and the contribution heatmap.
