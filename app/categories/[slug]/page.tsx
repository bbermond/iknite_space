import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryBySlug, cityByName } from "@/lib/taxonomy";
import {
  getPublishedBusinesses,
  featuredFor,
  sortByQuality,
} from "@/lib/businesses";
import { site } from "@/content/site";
import { countLabel } from "@/lib/format";
import { BusinessCard } from "@/components/business-card";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { BigCta } from "@/components/big-cta";

export const revalidate = 300;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return { title: "Not found" };
  return {
    title: `${cat.name} in the South Bay`,
    description: cat.description.slice(0, 160),
    alternates: { canonical: `/categories/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  const all = await getPublishedBusinesses();
  const inCategory = all.filter((b) => b.category === cat.airtableName);
  if (inCategory.length === 0) notFound();

  const featured = featuredFor(all, { category: cat.airtableName, limit: 3 });
  const featuredSlugs = new Set(featured.map((b) => b.slug));
  const rest = sortByQuality(inCategory.filter((b) => !featuredSlugs.has(b.slug)));

  const cityCounts = new Map<string, number>();
  for (const b of inCategory) {
    if (b.city) cityCounts.set(b.city, (cityCounts.get(b.city) ?? 0) + 1);
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${cat.name} in the South Bay`,
          description: cat.description,
          url: `${site.url}/categories/${cat.slug}`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: inCategory.length,
            itemListElement: sortByQuality(inCategory)
              .slice(0, 10)
              .map((b, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: b.name,
                url: `${site.url}/business/${b.slug}`,
              })),
          },
        }}
      />

      <div className="wash-fern border-b hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 pt-14 pb-10">
          <nav aria-label="Breadcrumb" className="micro text-ink-soft mb-5">
            <Link href="/categories" className="no-underline text-ink-soft hover:text-ink">
              Categories
            </Link>
            <span aria-hidden="true" className="mx-2 text-fern-bright">/</span>
            <span className="text-ink">{cat.shortName}</span>
          </nav>
          <p className="micro text-fern mb-3">{countLabel(inCategory.length, "vetted practice")}</p>
          <h1 className="display text-3xl sm:text-5xl max-w-[18ch]">{cat.name}</h1>
          <p className="mt-4 text-ink-soft text-[15px] max-w-[58ch]">{cat.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2 list-none">
            {cat.signatureServices.map((s) => (
              <li key={s} className="micro border hairline-strong px-3 py-1.5 text-ink-soft">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {featured.length > 0 && (
        <Section label="Editor's picks" index="01">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {featured.map((b) => (
              <li key={b.slug}>
                <BusinessCard business={b} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section label={`All ${cat.shortName.toLowerCase()} practices`} index="02">
        {cityCounts.size > 1 && (
          <Reveal className="mb-8">
            <div className="flex flex-wrap gap-2">
              {[...cityCounts.entries()]
                .sort((a, b) => b[1] - a[1])
                .map(([cityName, count]) => {
                  const c = cityByName(cityName);
                  return (
                    <Link
                      key={cityName}
                      href={`/directory?category=${cat.slug}${c ? `&city=${c.slug}` : ""}`}
                      className="micro no-underline border hairline-strong px-3 py-2 invert-hover inline-flex gap-2"
                    >
                      {cityName} <span className="tabular text-ink-soft">{count}</span>
                    </Link>
                  );
                })}
            </div>
          </Reveal>
        )}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
          {rest.map((b) => (
            <li key={b.slug}>
              <BusinessCard business={b} showImage={Boolean(b.images.length)} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <BigCta href="/directory" variant="ink">
          Search the full directory
        </BigCta>
      </Section>
    </>
  );
}
