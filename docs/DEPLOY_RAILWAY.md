# Deploying to Railway

The repo is Railway-ready: `railway.json` selects the Dockerfile build, and
the Dockerfile produces a small standalone Next.js image listening on `$PORT`.

## Option A — connect the GitHub repo (recommended, ~2 minutes)

1. In [Railway](https://railway.com/new), choose **Deploy from GitHub repo**
   → select `bbermond/iknite_space`.
2. Pick the branch to deploy (`main` after the PR merges, or
   `claude/iknite-space-site-i39v8y` to preview before merging).
3. Railway detects `railway.json` + `Dockerfile` automatically. Deploy.
4. Settings → Networking → **Generate Domain** to get a public
   `*.up.railway.app` URL.
5. When happy, add the custom domain `iknite.space` (and `www`) and update
   DNS at the registrar (Railway shows the exact CNAME target).

Every push to the selected branch auto-deploys from then on.

## Option B — CLI

```bash
npm i -g @railway/cli
railway login
railway init      # create/link the project
railway up        # build & deploy
railway domain    # generate the public URL
```

## Environment variables (all optional)

| Var | Purpose |
|---|---|
| `DATA_DIR` | Where form submissions append as `submissions.jsonl`. Attach a Railway **Volume** (e.g. mounted at `/data`) and set `DATA_DIR=/data` so applications survive redeploys. Without a volume, submissions persist only until the next deploy — set the webhook below. |
| `SUBMISSIONS_WEBHOOK_URL` | Every submission is POSTed as JSON — point it at a Zapier/Make/n8n hook, Google Apps Script, Slack webhook, or your CRM endpoint. Recommended for production. |

## Post-deploy checks

- `/` renders with the loader animation, then the hero.
- Submit a test application on `/apply` → lands on `/thank-you`; check the
  volume file or webhook received it.
- `/categories/blog/` redirects to `/insights` (legacy SEO paths).
- `robots.txt` and `sitemap.xml` resolve.
