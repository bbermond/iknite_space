import { site } from "@/content/site";

/**
 * Serialize for embedding inside a <script> tag: escape the characters that
 * could close the tag or break the parser, so CMS-controlled strings (business
 * names, addresses) can never inject markup.
 */
function safeJson(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** Render any schema.org object as a JSON-LD script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
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
