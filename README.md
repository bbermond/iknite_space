# iknite.space

The public website for **Iknite Space** — a selective, six-month tech talent
accelerator in Buea, Cameroon, and the foundation of a wider home for talent,
founders, and technology ventures.

Built with Next.js (App Router) + Tailwind CSS 4, monospace-first technical
design system, deployed on Railway.

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
| `content/program.ts` | Curriculum, learning model, FAQs, commitment facts |
| `content/projects.ts` | Trainee project case studies |
| `content/insights/*.md` | Blog articles — **add a .md file to publish** (see `docs/ADDING_ARTICLES.md`) |
| `content/partner.ts` | Partner-page intents and their forms |
| `lib/actions.ts` | Form handling (file persist + optional webhook) |
| `components/` | Design system (reveal, decode, counter, marquee, media slots…) |
| `public/media/` | Drop approved photos here — see `docs/MEDIA_AND_MIGRATION.md` |
| `docs/PENDING_APPROVAL.md` | Facts that need confirmation before/after launch |
| `docs/DEPLOY_RAILWAY.md` | Deployment guide |

## Content rules

The site publishes verified facts only — no invented stats, people,
testimonials, or guarantees. Anything unconfirmed is tracked in
`docs/PENDING_APPROVAL.md`. Cohort status is config, not code: flip
`cohort.status` in `content/site.ts` between `open`, `opening-soon`,
`waitlist`, and `closed`, and every CTA on the site follows.
