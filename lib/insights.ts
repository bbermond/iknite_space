import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Git-backed blog: each article is a markdown file in content/insights/.
 * Adding an article = adding a .md file (see docs/ADDING_ARTICLES.md) —
 * the site rebuilds and publishes it automatically on push.
 *
 * All insight pages are statically generated at build time, so this
 * loader never runs inside the production container (content/ is not
 * shipped in the standalone image).
 */

export type InsightTag = "Cohort update" | "Announcement" | "Community";

export type Insight = {
  slug: string;
  date: string; // YYYY-MM — sitemap parses this, keep the format
  displayDate: string;
  title: string;
  tag: InsightTag;
  summary: string;
  bodyHtml: string;
};

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");
const VALID_TAGS: InsightTag[] = ["Cohort update", "Announcement", "Community"];

function parseFile(filename: string): Insight {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(INSIGHTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "date", "displayDate", "tag", "summary"]) {
    if (!data[field]) {
      throw new Error(`content/insights/${filename}: missing "${field}" in frontmatter`);
    }
  }
  if (!/^\d{4}-\d{2}$/.test(String(data.date))) {
    throw new Error(`content/insights/${filename}: date must be YYYY-MM, got "${data.date}"`);
  }
  if (!VALID_TAGS.includes(data.tag)) {
    throw new Error(
      `content/insights/${filename}: tag must be one of ${VALID_TAGS.join(" | ")}`
    );
  }

  return {
    slug,
    date: String(data.date),
    displayDate: String(data.displayDate),
    title: String(data.title),
    tag: data.tag,
    summary: String(data.summary),
    bodyHtml: marked.parse(content, { async: false }),
  };
}

/** All insights, newest first. */
export function getInsights(): Insight[] {
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getInsight(slug: string): Insight | undefined {
  return getInsights().find((i) => i.slug === slug);
}
