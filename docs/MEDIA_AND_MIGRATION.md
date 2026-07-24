# Media slots & content migration

The build environment could not reach the old site or Google Drive, so no
photographs are bundled yet. Every image location on the site is a **media
slot**: drop an approved photo into `public/media/<slot>.(jpg|png|webp)` and
the slot renders it automatically (see `components/media-slot.tsx`). Until
then each slot shows a styled placeholder naming the shot it wants.

## Slot manifest

| Slot path (`public/media/…`) | Wanted shot |
|---|---|
| `brand/logo.svg` | Approved Iknite Space logo (then swap `components/wordmark.tsx` to render it) |
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
