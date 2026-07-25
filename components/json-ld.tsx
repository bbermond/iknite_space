import { site } from "@/content/site";

/** Render any schema.org object as a JSON-LD script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite structured data, rendered once on the home page. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            name: site.name,
            url: site.url,
            description: site.description,
            areaServed: "South Bay, Silicon Valley, California",
          },
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            name: site.name,
            url: site.url,
            publisher: { "@id": `${site.url}/#organization` },
          },
        ],
      }}
    />
  );
}
