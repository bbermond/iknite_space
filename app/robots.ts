import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// /thank-you is excluded from indexing via its own noindex metadata —
// deliberately NOT crawl-blocked here, so engines can see the directive.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
