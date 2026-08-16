# Iknite Space — backlog & session handoff

Last updated: 14 Aug 2026. Written so a fresh session (or another person)
can pick this up cold.

## Where things stand

**Live:** https://iknitespace-production.up.railway.app — Online, serving
commit `23e9803`. Railway project `Iknite_Space` → service `iknite_space`
(US West), deployed from GitHub repo `bbermond/iknite_space`.

The site is feature-complete against the July 2026 brief and the follow-up
rounds of feedback. 26 pages, all quality gates green (lint, type-check,
production build, link crawl, redirects, live smoke tests).

## Open items — priority order

### 1. Form delivery is not durable ⚠️ time-sensitive
Applications currently append to `DATA_DIR/submissions.jsonl` **inside the
container**, so they are lost on every redeploy. Before promoting the apply
link anywhere:
- Set `SUBMISSIONS_WEBHOOK_URL` in Railway → Variables (Zapier/Make/n8n/
  Apps Script/Slack all work — every submission POSTs as JSON), **and/or**
- Attach a Railway Volume mounted at `/data` and set `DATA_DIR=/data`.

See `docs/DEPLOY_RAILWAY.md`. A lost application is unrecoverable.

### 2. Confirm the auto-deploy branch
The branch this was built on (`claude/iknite-space-site-i39v8y`) was renamed
to `main`; the old name no longer exists on the remote. Railway → service →
Settings → Source must point at **`main`**, or pushes won't auto-deploy.
Symptom of it being wrong: pushes land on GitHub but the site never changes
(this silently happened between 25 Jul and 14 Aug — the live site was three
weeks stale while every push "succeeded").

### 3. Approvals before wider promotion
Full list in `docs/PENDING_APPROVAL.md`. Most urgent:
- **Mentor consent** — seven mentors are publicly live with names, photos,
  and employer affiliations (`content/mentors.ts`, `public/media/mentors/`).
  Confirm each consents, and that titles/employers are current.
- Application deadline (`cohort.applyDeadline` in `content/site.ts`).
- Tuition/cost wording — deliberately unstated; the old "free until you get
  a job" and "guaranteed job" claims were retired and must not return
  without documentation.
- Public contact email/phone/address, and the legal entity for the footer.

### 4. Remaining media
Slots are wired; drop files in and they appear (see
`docs/MEDIA_AND_MIGRATION.md` for the full manifest):
- `public/media/mentors/eric-williams.png`, `kambang-sinclaire.png` — the
  only two mentors without headshots (they show styled placeholders now).
- `about/buea`, `community/hackathon`, `team/mentor-session`,
  `team/trainees-working`, `program/mentorship`, and the three
  `projects/*` slots — cohort and workspace photography.
- Not yet used from the brand drive: `Iknite Background compositions.png`
  and the 1280w social share images (would make good OG/share cards —
  the site currently has no OG image).

### 5. Domain cut-over
Add `iknite.space` + `www` in Railway → Settings → Networking, update the
registrar CNAME, then retire the old GitHub Pages site so redirects and SEO
consolidate here.

### 6. Nice-to-haves not started
- Replit reference recording the owner mentioned — never received.
- Talent profiles (`/talent/[profile]`) from the brief — deferred until
  trainees consent.
- Analytics — no provider wired yet (brief lists events worth tracking).

## Orientation for a new session

| Path | What it is |
|---|---|
| `content/site.ts` | **Cohort status, dates, contact, nav.** Flip `cohort.status` (`open`/`opening-soon`/`waitlist`/`closed`) and every CTA follows |
| `content/program.ts` | Curriculum, learning model, `pipelineStages`, FAQs, commitment |
| `content/mentors.ts` | Mentor roster (edit/remove freely) |
| `content/projects.ts`, `content/partner.ts` | Case studies, partner intents |
| `content/insights/*.md` | Blog — add a `.md` file to publish (`docs/ADDING_ARTICLES.md`) |
| `lib/actions.ts` | All form handling |
| `lib/insights.ts` | Markdown loader (gray-matter + marked) |
| `components/` | Design system: `pipeline-diagram`, `big-cta`, `section`, `graphics`, `media-slot`, `decode`, `counter`, `reveal` |
| `app/globals.css` | Design tokens, brand palette, patterns, `prose-mono` |

**Design language:** monospace (Geist Mono), off-white paper `#f4f3ef`, ink
`#16150f`, ember accents, hairline 1px grids, dot/square/stripe section
patterns, hatched outer gutters ≥1440px. Brand purple `#2e0b5d`, gradient
`#f99f61 → #ff2c5b`. Everything respects `prefers-reduced-motion`; ember
text uses the AA-safe `--color-ember-ink`.

**Program facts as published:** 2-week piscine → 6 months (4 mentored
training + 2 team project) → 6-month internship; ~10 seats; 1:1 mentor
session every two weeks; eligibility engineering grads / final-year (+
self-taught with equivalent foundations); needs laptop, GitHub, Buea daily.

## Gotchas learned the hard way

- **Deploys can silently no-op.** Always verify against the live URL, not
  just `git push`. `railway status` + `railway deployment list` tell the truth.
- **This repo was once overwritten** by a different project (FindWellness)
  from another Claude session pushing to the same repo; it was merged as
  PR #1 and later reverted. Those commits remain recoverable at `a3eb12c`.
  If that project is still pointed here, repoint it to its own repo.
- **Images pasted into chat cannot be saved to disk** by the agent — they
  must arrive as file uploads, via the repo, or through a connector. The
  mentor headshots were ultimately pulled from Google Drive
  (`mentor dps` folder), not from the chat pastes.
- **The old iknite.space site and its GitHub repo are unreachable** from the
  sandbox (egress policy), so legacy content was reconstructed from the
  brief plus public sources rather than scraped.
- **ConductorAI's actual artwork was never copied** — the design language was
  reimplemented from scratch. Keep it that way.

## Deploying from a fresh session

The Railway CLI is not installed by default and has no token in the
environment. To deploy manually:

```bash
npm i -g @railway/cli
railway login --browserless      # prints a URL + code for the owner to approve
railway link --project Iknite_Space
railway status                   # confirm service, URL, last deployment
```

Prefer fixing auto-deploy (item 2) so this isn't needed.
