# Greenwick Rugby League

Official GRL website for `greenwickgov/grl`. React + Vite frontend for GitHub Pages, with Convex database functions for clubs, fixtures, news and automatically calculated standings.

## Features

Rounded responsive emerald/lime UI; generated GRL, six club and 6FLIX PNG logos; news search and printable article pages; club hubs; season/round/club draw filters; regular-season ladder calculated from final match scores. No invented fixtures or ladder scores. Six clubs and two user-supplied announcements are seeded idempotently.

## Run

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set `VITE_CONVEX_URL` to the project's Convex deployment URL. Without it, the public site shows the included club/news content and honest empty states for draws and standings.

## Convex

The GRL development project is `ashton-lee-archer/grl`, deployment `famous-lemming-191` (Sydney region). Development schema and functions have been deployed and seeded. Production activation is pending approval.

```sh
npx convex dev --configure existing --team ashton-lee-archer --project grl --dev-deployment cloud --once
npx convex run seed:initialize
```

After approval, activate the project's production deployment with `npx convex deploy`, seed it using `npx convex run --prod seed:initialize`, and set the GitHub repository Actions variable `VITE_CONVEX_URL` to the production URL. Re-run the Pages workflow.

Public clients have one read query (`league:overview`); write functions are internal and require deployment administrator access. Use the Convex dashboard function runner to call `league:saveNews` and `league:saveMatch`, or use authenticated Convex CLI. Never put deployment keys in the frontend, repository, or GitHub Actions variables. Use Secrets if CI deployment is added.

### Fixture fields

`season`, `round`, `home`, `away` (club slugs), `kickoff` (ISO timestamp), `venue`, `competition` (`regular`/`finals`), `status` (`scheduled`/`live`/`final`) and scores when live or final. Standings award 2 points for a win, 1 for a draw; finals are excluded. Official adjustments/byes are not yet configured. Standings tie-break by points, difference, points scored; club name provides stable display order for otherwise equal clubs.

## Publish

The included workflow builds and deploys to GitHub Pages on pushes to `main`. Enable Pages with source **GitHub Actions**. Frontend deployments do not modify Convex schemas or data. Hash routes work on Pages without server rewrites.

## Research and content

NRL.com was studied for information hierarchy (fixtures, feature story, latest news, club access, partners), with an original GRL design. Facebook research and verified links are recorded in `RESEARCH.md`. Club logo artwork is newly generated for this website. The 6FLIX asset represents the user-provided broadcast agreement; no additional commercial sponsorship is asserted.
