import { site } from "@/content/site";

/**
 * Organization structured data for search engines. Rendered once, on the
 * home page. All values come from content/site.ts — nothing hard-coded.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buea",
      addressRegion: "South-West Region",
      addressCountry: "CM",
    },
    sameAs: [site.social.github, site.social.linkedin, site.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
