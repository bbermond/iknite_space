# Iknite Space — backlog & session handoff

Last updated: 16 Aug 2026. Written so a fresh session (or another person)
can pick this up cold.

## Where things stand

**Live:** https://iknitespace-production.up.railway.app — Online, serving
commit `23e9803`. Railway project `Iknite_Space` → service `iknite_space`
(US West), deployed from GitHub repo `bbermond/iknite_space`.

The site is feature-complete against the July 2026 brief and the follow-up
rounds of feedback. 26 pages, all quality gates green (lint, type-check,
production build, link crawl, redirects, live smoke tests).

**August 2026 — the design track.** The site now reads through two lenses,
switched from the header next to the Apply CTA: `</>` code and `○◺` design.
The design lens is a full dark theme with the brand gradients, and swaps the
craft-specific copy on `/`, `/accelerator`, and `/apply`. Colourful brand
bands were added to `/`, `/accelerator`, `/sponsor`, and `/about`, and a
partner strip to `/` and `/partner`. See **Tracks** in the README for how it
works, and `docs/PENDING_APPROVAL.md` for what the owner still needs to
confirm about the design track.

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
- **Partner logos** — all four (Iknite Studio, Mountain Hub, Moulingo,
  CimFest) render as typographic placeholders. Drop files at
  `public/media/partners/<slug>.svg`. The Google Drive `Logo Assets`
  folder was not reachable from the build container.
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

### Hire page & subdomain (added 29 Aug 2026)
- `/hire` is live in the build: Andela-inspired structure, honesty-first
  tone, `kind: "hire"` submissions through the same form pipeline (so the
  form-delivery item above applies to it too).
- `hire.iknite.space` is wired in code (`proxy.ts`) but needs the Railway
  custom domain + DNS CNAME — steps in `docs/MEDIA_AND_MIGRATION.md`.
- Wording sign-offs for the engagement models and the IkniteOS attribution
  are listed in `docs/PENDING_APPROVAL.md` → "Hire & outsourcing".
- No OG image yet for `/hire`; falls back to the site default like every
  other page.

## Orientation for a new session

| Path | What it is |
|---|---|
| `content/site.ts` | **Cohort status, dates, contact, nav.** Flip `cohort.status` (`open`/`opening-soon`/`waitlist`/`closed`) and every CTA follows |
| `content/tracks.ts` | **Everything the `</>` / `○◺` switch changes** — per-track copy, curriculum, eligibility, apply fields |
| `content/program.ts` | Facts true of both tracks: `pipelineStages`, selection, commitment, `getFaqs()` |
| `content/partners.ts` | Partner strip — names, links, dark-surface handling |
| `content/mentors.ts` | Mentor roster (edit/remove freely) |
| `content/projects.ts`, `content/partner.ts` | Case studies, partner intents |
| `content/insights/*.md` | Blog — add a `.md` file to publish (`docs/ADDING_ARTICLES.md`) |
| `lib/actions.ts` | All form handling |
| `lib/insights.ts` | Markdown loader (gray-matter + marked) |
| `components/` | Design system: `pipeline-diagram`, `big-cta`, `banner`, `section`, `graphics`, `media-slot`, `partner-logos`, `decode`, `counter`, `reveal` |
| `components/track.tsx`, `lib/track*.ts` | The lens system — read the README's **Tracks** section first |
| `app/globals.css` | Design tokens, both track palettes, banners, patterns, `prose-mono` |

**Design language:** monospace (Geist Mono), off-white paper `#f4f3ef`, ink
`#16150f`, ember accents, hairline 1px grids, dot/square/stripe section
patterns, hatched outer gutters ≥1440px. Brand purple `#2e0b5d`, gradient
`#f99f61 → #ff2c5b`. Everything respects `prefers-reduced-motion`; ember
text uses the AA-safe `--color-ember-ink`.

**Design track palette:** paper `#0f0a1e`, ink `#f5f1ff`, ember-ink lifts to
`#ffa06b` (the light shade — on a dark field the ember roles invert). Defined
once under `[data-track="design"]`; every pattern, hairline, and gutter
follows automatically because they all read the same two tokens.

**Program facts as published:** 2-week piscine → 6 months (4 mentored
training + 2 team project) → 6-month internship; ~10 seats; 1:1 mentor
session every two weeks; eligibility engineering grads / final-year (+
self-taught with equivalent foundations); needs laptop, GitHub, Buea daily.
Both tracks share every one of those facts — the design track differs only in
craft (curriculum, eligibility wording, Figma instead of GitHub, portfolio
instead of repo).

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
- **Local paths in prompts are not reachable.** Sessions run in a remote
  container, so a macOS Google Drive path (`/Users/…/CloudStorage/…`) does
  not exist there. Assets have to come through the repo or a connector.
- **Contrast on gradients must be measured, not reasoned about.** The
  brand gradient's red stop put dark-violet type at ~4.0:1 once the
  BrandBlocks overlay shaded it, and white type on the spectrum band's
  orange end measured 1.2:1 on a narrow viewport. Both were invisible to a
  computed-style audit because the background is a `background-image`. They
  were caught by screenshotting the band with the text made transparent and
  sampling real pixels under every line box. Re-run that check after any
  change to `.banner-*` or `BrandBlocks`.
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
