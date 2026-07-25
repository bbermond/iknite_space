import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, cityBySlug, categories } from "@/lib/taxonomy";
import {
  getPublishedBusinesses,
  featuredFor,
  sortByQuality,
} from "@/lib/businesses";
import { site } from "@/content/site";
import { countLabel } from "@/lib/format";
import { BusinessCard } from "@/components/business-card";
import { Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { BigCta } from "@/components/big-cta";

export const revalidate = 300;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = cityBySlug(slug);
  if (!city) return { title: "Not found" };
  return {
    title: `Wellness in ${city.name} — vetted clinics & med spas`,
    description: `${city.blurb} Every ${city.name} practice researched, rated, and organized by FindWellness.`,
    alternates: { canonical: `/cities/${city.slug}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = cityBySlug(slug);
  if (!city) notFound();

  const all = await getPublishedBusinesses();
  const inCity = all.filter((b) => b.city === city.name);
  if (inCity.length === 0) notFound();

  const featured = featuredFor(all, { city: city.name, limit: 3 });
  const featuredSlugs = new Set(featured.map((b) => b.slug));
  const rest = sortByQuality(inCity.filter((b) => !featuredSlugs.has(b.slug)));

  const categoryCounts = categories
    .map((c) => ({
      ...c,
      count: inCity.filter((b) => b.category === c.airtableName).length,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Wellness in ${city.name}`,
          description: city.blurb,
          url: `${site.url}/cities/${city.slug}`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: inCity.length,
            itemListElement: sortByQuality(inCity)
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
            <Link href="/cities" className="no-underline text-ink-soft hover:text-ink">
              Cities
            </Link>
            <span aria-hidden="true" className="mx-2 text-fern-bright">/</span>
            <span className="text-ink">{city.name}</span>
          </nav>
          <p className="micro text-fern mb-3">{countLabel(inCity.length, "vetted practice")}</p>
          <h1 className="display text-3xl sm:text-5xl">Wellness in {city.name}</h1>
          <p className="mt-4 text-ink-soft text-[15px] max-w-[56ch]">{city.blurb}</p>

          {categoryCounts.length > 1 && (
            <ul className="mt-6 flex flex-wrap gap-2 list-none">
              {categoryCounts.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/directory?category=${c.slug}&city=${city.slug}`}
                    className="micro no-underline border hairline-strong px-3 py-2 invert-hover inline-flex gap-2"
                  >
                    {c.shortName} <span className="tabular text-ink-soft">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {featured.length > 0 && (
        <Section label={`Best of ${city.name}`} index="01">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {featured.map((b) => (
              <li key={b.slug}>
                <BusinessCard business={b} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section label={`All ${city.name} practices`} index="02">
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
