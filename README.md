# iknite.space

The public website for **Iknite Space** — a selective, six-month tech talent
accelerator in Buea, Cameroon, and the foundation of a wider home for talent,
founders, and technology ventures.

Built with Next.js (App Router) + Tailwind CSS 4, monospace-first technical
design system, deployed on Railway.

The site reads through **two lenses**, switched from the header:

| | | |
|---|---|---|
| `</>` | **code** | the blueprint — off-white paper, ink hairlines, engineering copy |
| `○◺` | **design** | the same programme in full — dark surface, brand gradients, design copy |

One programme underneath: same cohort, same dates, same application. Only
the craft-specific copy changes. See **Tracks** below.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `content/site.ts` | **Cohort status, dates, CTAs, contact, nav** — the one file to edit between cohorts |
| `content/tracks.ts` | **Everything the lens switch changes** — per-track copy, curriculum, eligibility, apply fields |
| `content/program.ts` | Facts true of BOTH tracks: pipeline, selection, commitment, FAQ shell |
| `content/partners.ts` | Partner strip — names, links, dark-surface handling |
| `content/projects.ts` | Trainee project case studies |
| `content/insights/*.md` | Blog articles — **add a .md file to publish** (see `docs/ADDING_ARTICLES.md`) |
| `content/partner.ts` | Partner-page intents and their forms |
| `lib/actions.ts` | Form handling (file persist + optional webhook) |
| `components/` | Design system (reveal, decode, counter, marquee, banners, media slots…) |
| `public/media/partners/` | Drop partner logos here — see `docs/MEDIA_AND_MIGRATION.md` |
| `public/media/` | Drop approved photos here — see `docs/MEDIA_AND_MIGRATION.md` |
| `docs/BACKLOG.md` | **Start here** — open items, handoff notes, gotchas |
| `docs/PENDING_APPROVAL.md` | Facts that need confirmation before/after launch |
| `docs/ADDING_ARTICLES.md` | How to publish a blog article |
| `docs/DEPLOY_RAILWAY.md` | Deployment guide |

## Tracks

The active lens is one attribute — `data-track` on `<html>` — written by an
inline script in `app/layout.tsx` before the first paint, so a returning
visitor never sees the page flash between themes.

Everything follows from that attribute:

- **The palette.** `[data-track="design"]` in `app/globals.css` re-points the
  same `--color-paper` / `--color-ink` tokens the whole design system already
  reads from, so hairlines, dot fields, hatching, patterns, buttons, and the
  wide-screen gutters all invert from those few declarations.
- **The copy.** `<Track>` and `<TrackWord>` (`components/track.tsx`) render
  *both* variants; CSS removes the inactive one with `display: none`, which
  also takes it out of the accessibility tree. Pages stay Server Components
  and fully static — switching costs no refetch and no re-render.

Two deliberate exceptions:

- **Form fields** use the client component `components/apply-track-fields.tsx`
  instead, because a `display: none` input is still submitted. Only the
  active track's fields exist in the DOM at all.
- **Banners** (`components/banner.tsx`) look identical in both lenses. They
  re-point paper/ink to the fixed `--color-banner-*` tokens, so anything
  nested inside resolves against the band rather than the page.

To add track-specific copy: add the field to both tracks in
`content/tracks.ts`, then render it through `<Track>`.

## Content rules

The site publishes verified facts only — no invented stats, people,
testimonials, or guarantees. Anything unconfirmed is tracked in
`docs/PENDING_APPROVAL.md`. Cohort status is config, not code: flip
`cohort.status` in `content/site.ts` between `open`, `opening-soon`,
`waitlist`, and `closed`, and every CTA on the site follows.
