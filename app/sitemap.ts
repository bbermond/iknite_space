import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { insights } from "@/content/insights";

/** All indexable routes. /thank-you is deliberately excluded (noindex). */
const staticRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/accelerator", priority: 0.9 },
  { path: "/apply", priority: 0.9 },
  { path: "/projects", priority: 0.8 },
  { path: "/mentors", priority: 0.8 },
  { path: "/partner", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/insights", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      priority,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    ...insights.map((i) => ({
      url: `${site.url}/insights/${i.slug}`,
      // Insight dates are YYYY-MM; anchor to the first of that month.
      lastModified: new Date(`${i.date}-01`),
      priority: 0.5,
    })),
  ];
}
