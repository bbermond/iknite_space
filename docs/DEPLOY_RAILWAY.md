# Deploying FindWellness to Railway

The repo ships a three-stage `Dockerfile` (standalone Next.js output) and
`railway.json`, so Railway needs no build configuration.

## First deploy

1. Railway → New Project → Deploy from GitHub → `bbermond/iknite_space`.
2. Railway detects `railway.json` + `Dockerfile` automatically.
3. Settings → Networking → Generate Domain (or attach the custom domain).

## Environment variables (Service → Variables)

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Enables `/admin` (the CMS login). Without it, admin shows setup instructions. |
| `AIRTABLE_API_KEY` | Airtable personal access token (`data.records:read` + `data.records:write` on the FindWellness base). Enables live data + CMS writes. Create at airtable.com/create/tokens. |
| `AIRTABLE_BASE_ID` | Optional — defaults to the FindWellness South Bay base. |
| `NEXT_PUBLIC_SITE_URL` | Set to the public URL (e.g. `https://findwellness.com`) once the domain is live; drives canonicals, sitemap, and JSON-LD. |
| `DATA_DIR` | Optional — attach a Railway Volume at `/data` and set `DATA_DIR=/data` so form submissions survive redeploys. |
| `SUBMISSIONS_WEBHOOK_URL` | Optional — POSTs every form submission as JSON (Slack, Zapier, Make, CRM). |

Without any variables the site still works fully read-only from the bundled
snapshot of the Airtable base (`data/businesses.json`).

## Post-deploy smoke check

- `/` renders with the featured clinics section populated.
- `/directory?q=nad` returns filtered results.
- `/business/newu-hydration-lounge` renders with rating + JSON-LD.
- `/admin` → login → dashboard shows 366 listings; toggling Featured on a
  listing updates Airtable (requires both env vars).
- `/sitemap.xml` and `/robots.txt` respond.

## How content flows

Airtable is the source of truth. With `AIRTABLE_API_KEY` set, public pages
re-read Airtable at most every 5 minutes (plus immediate revalidation after
any CMS write). The bundled snapshot is only a fallback so the site can
never render empty.
