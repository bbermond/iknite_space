# Adding a blog article (Insights)

The blog is git-backed: **every article is a markdown file in
`content/insights/`**. Adding a file publishes it — the site rebuilds and
deploys automatically on push. No CMS login, no database; GitHub is the admin.

## Steps (browser only, ~2 minutes)

1. Open the repo on GitHub → `content/insights/` → **Add file → Create new file**.
2. Name it `your-article-slug.md` — the filename becomes the URL
   (`iknite.space/insights/your-article-slug`). Lowercase, hyphens, no spaces.
3. Paste this template and fill it in:

   ```markdown
   ---
   title: "Your article title"
   date: "2026-09"            # YYYY-MM — controls sort order and sitemap
   displayDate: "September 2026"
   tag: "Cohort update"       # one of: Cohort update | Announcement | Community
   summary: "One or two sentences shown in the list and in link previews."
   ---

   First paragraph — rendered as the lede.

   ## A section heading

   Regular markdown works: **bold**, *italic*, [links](https://example.com),
   lists, quotes, and code blocks.

   - Point one
   - Point two
   ```

4. **Commit changes** (commit straight to the default branch).
5. Railway rebuilds automatically; the article is live in a few minutes at
   `/insights/your-article-slug`.

## Notes

- **Editing**: open the file on GitHub → pencil icon → edit → commit.
- **Deleting**: delete the file; the URL 404s after the next deploy.
- The build fails loudly (deploy is blocked, site stays on the old version)
  if frontmatter is missing a field, `date` isn't `YYYY-MM`, or `tag` isn't
  one of the three allowed values — fix the file and commit again.
- Images: upload to `public/media/insights/` (same Add-file flow) and
  reference as `![caption](/media/insights/your-image.jpg)`.
- Announcements get the ember-highlighted chip in the list automatically.
