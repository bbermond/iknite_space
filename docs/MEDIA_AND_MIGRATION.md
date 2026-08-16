# Media slots & content migration

The build environment could not reach the old site or Google Drive, so no
photographs are bundled yet. Every image location on the site is a **media
slot**: drop an approved photo into `public/media/<slot>.(jpg|png|webp)` and
the slot renders it automatically (see `components/media-slot.tsx`). Until
then each slot shows a styled placeholder naming the shot it wants.

## Slot manifest

| Slot path (`public/media/…`) | Wanted shot |
|---|---|
| `partners/iknite-studio.svg` | Iknite Studio logo — see **Partner logos** below |
| `partners/mountain-hub.svg` | Mountain Hub logo |
| `partners/moulingo.svg` | Moulingo logo |
| `partners/cimfest.svg` | CimFest logo |
| `projects/cribconnect.jpg` | CribConnect on a real screen, or the team demoing it |
| `projects/qless.jpg` | Qless on a real screen, or the team at work |
| `projects/auto-link.jpg` | Auto Link team / demo |
| `about/buea.jpg` | The Buea workspace / environment |
| `community/hackathon.jpg` | In-house hackathon or meetup in progress |
| `team/mentor-session.jpg` | Mentor presenting or reviewing work |
| `team/trainees-working.jpg` | Trainees working in teams (whiteboards, code review) |
| `program/mentorship.jpg` | A bi-weekly 1:1 mentor session in progress |
| `mentors/acho-arnold-ewin.jpg` | Mentor headshot (old-site photo or newer, with consent) |
| `mentors/kambang-sinclaire.jpg` | Mentor headshot |
| `mentors/ian-joyce.jpg` | Mentor headshot |
| `mentors/margaret-adams.jpg` | Mentor headshot |
| `mentors/mbianou-bradon.jpg` | Mentor headshot |
| `mentors/phillip-kang.jpg` | Mentor headshot |
| `mentors/eric-williams.jpg` | Mentor headshot |

Guidance from the brief: authentic photos only — trainees working, mentors
reviewing, whiteboards, demos, meetups, the Buea workspace. Audit consent,
captions, dates. No stock developers, glowing code, robots, or graduation
clichés. Historical photos containing Mountain Hub branding may be used only
as clearly dated archival material.

Good sources: the old site repo (`Iknite-Space/iknite-space.github.io`) holds
historical media for Cohorts 4–5, Gophers meetups, Design Meetups, Qless,
CribConnect, mentor sessions, and group work. Also the
`Iknite_space assets` folder on the Iknite Studio shared drive.

## Partner logos

The strip on the home page and `/partner` is driven by
`content/partners.ts` and rendered by `components/partner-logos.tsx`.

**To add a logo:** drop the file at `public/media/partners/<slug>.svg`
(`.png`, `.webp`, and `.jpg` also resolve, in that order of preference) and
rebuild. Nothing in the code needs to change — a partner without a file
renders its name as a typographic placeholder in the site's own design
language, so the strip never looks broken while you wait on assets.

**Dark surfaces.** The design track inverts the page to near-black, which
swallows dark logos. Each partner carries an `onDark` setting:

| `onDark` | Behaviour | Use when |
|---|---|---|
| `"plate"` *(default)* | Sits the mark on a small light panel | Full-colour logos — always safe |
| `"invert"` | CSS-inverts the mark to white | Single-colour black marks only |
| `"asset"` | Uses `partners/<slug>-inverted.svg` | You have a real light-on-dark export — best result |

`"asset"` falls back to `"plate"` if the `-inverted` file is missing, so it
is safe to set ahead of receiving the export.

**Adding or removing a partner** is a one-line edit to the array in
`content/partners.ts`. Entries carry a name and an optional `href` only —
per the site's content rules, no descriptor or relationship claim is
published for a partner until it is confirmed.

## Brand lockups

Three exports live in `public/media/brand/`:

| File | Type colour | Mark | Used on |
|---|---|---|---|
| `logo-primary.svg` | brand violet | gradient | paper surfaces (code track) |
| `logo-on-dark.svg` | white | gradient | the design track's dark surface |
| `logo-inverted.svg` | white | white | the brand-violet footer, both tracks |

`logo-on-dark.svg` is derived from `logo-primary.svg` by recolouring only
the twelve wordmark paths (`fill: #2e0b5d` → `#fdfbff`); the mark's gradient
stops are untouched. If an official light-on-dark export with the gradient
mark arrives, replace that file directly — the filename is what
`components/wordmark.tsx` looks for.

## Legacy content migration

- **Blog**: the old blog (through the Nov 2025 Cohort 5 mentor call) and the
  Feb 2026 LinkedIn update are represented as rewritten summaries in
  `content/insights.ts`. To migrate full articles, paste each approved
  original into a new entry's `body` array.
- **Redirects** already configured in `next.config.ts`: `/categories/blog/*`
  and `/blog/*` → `/insights`, `/how-it-works` → `/accelerator`. `/about/`,
  `/apply/`, `/contact/` keep their URLs.
- **Removed by design**: the Mountain Hub contact embed and the Google Form
  apply embed. Their replacements are Iknite-controlled forms
  (`lib/actions.ts`) — submissions append to `DATA_DIR/submissions.jsonl`
  and optionally forward to `SUBMISSIONS_WEBHOOK_URL`.

## Domain cut-over checklist

1. Deploy on Railway (see `docs/DEPLOY_RAILWAY.md`) and verify on the
   `*.up.railway.app` URL.
2. Add custom domain `iknite.space` (+ `www`) in Railway → Settings →
   Domains; update DNS (CNAME) at the registrar.
3. Confirm the old GitHub Pages site is retired after DNS propagates so
   redirects and SEO consolidate on the new site.
