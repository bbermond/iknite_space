# FindWellness

The South Bay's curated guide to modern wellness — 366 researched practices
across med spas, functional & longevity medicine, medical weight loss,
hormone clinics, IV lounges, and mobile IV, organized for people who make
health decisions carefully.

Built with Next.js 16 (App Router), Tailwind CSS v4, and Airtable as the
content backend. Deploys to Railway via Docker.

## Architecture

| Layer | Where | Notes |
| --- | --- | --- |
| Public site | `app/**` | Server components; ISR (`revalidate = 300`) on data-driven pages |
| Business data | `data/businesses.json` | Bundled snapshot of the Airtable base — the site always renders, even unconfigured |
| Live data | `lib/airtable.ts` + `lib/businesses.ts` | When `AIRTABLE_API_KEY` is set, reads go to Airtable (5-min in-memory cache) with snapshot fallback |
| CMS | `/admin` + `app/api/admin/**` | Password-gated dashboard: search, create, edit, feature, publish, delete |
| Taxonomy | `lib/taxonomy.ts` | Category & city slugs, editorial copy — the join key with Airtable single-selects |
| Editorial | `content/*.ts` | Site config, Eden briefs, coaches, functional-medicine content |
| Forms | `lib/actions.ts` | Server action → JSONL on disk + optional webhook |

## Environment variables (Railway → Service → Variables)

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | for `/admin` | Enables the CMS login |
| `AIRTABLE_API_KEY` | for live data + CMS writes | Personal access token with `data.records:read`/`write` on the FindWellness base |
| `AIRTABLE_BASE_ID` | no | Defaults to the FindWellness South Bay base |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL once the custom domain is live |
| `DATA_DIR` | no | Volume path (e.g. `/data`) so form submissions survive redeploys |
| `SUBMISSIONS_WEBHOOK_URL` | no | POSTs each form submission as JSON (Slack, Zapier, CRM) |

## Working locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (standalone output)
npm run lint
```

## Content workflow

1. Edit businesses in Airtable (or `/admin`, which writes to Airtable).
2. The live site refreshes within ~5 minutes; CMS writes revalidate immediately.
3. To refresh the bundled fallback snapshot after large imports, re-export the
   base over `data/businesses.json` (same shape as `lib/businesses.ts` `Business`).

Featured logic: the `Featured` checkbox in Airtable pins a business to the top
of its category/city and the homepage; unfilled slots are topped up
automatically by Bayesian-smoothed rating. `Published` off hides a listing
everywhere.
