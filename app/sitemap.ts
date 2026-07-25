import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { categories, cities } from "@/lib/taxonomy";
import { getPublishedBusinesses } from "@/lib/businesses";
import { edenBriefs } from "@/content/eden";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const businesses = await getPublishedBusinesses();
  const cityNames = new Set(businesses.map((b) => b.city).filter(Boolean));

  const statics: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/directory`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/functional-medicine`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/coaches`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/eden`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/categories`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/cities`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/how-it-works`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/for-businesses`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...statics,
    ...categories.map((c) => ({
      url: `${site.url}/categories/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...cities
      .filter((c) => cityNames.has(c.name))
      .map((c) => ({
        url: `${site.url}/cities/${c.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ...edenBriefs.map((b) => ({
      url: `${site.url}/eden/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...businesses.map((b) => ({
      url: `${site.url}/business/${b.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
