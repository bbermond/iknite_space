import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublishedBusinesses,
  blurb,
  related,
  serviceChips,
} from "@/lib/businesses";
import { categoryByAirtableName, cityByName } from "@/lib/taxonomy";
import { site } from "@/content/site";
import { cleanQuote, displayUrl, formatRating, formatReviews, telHref } from "@/lib/format";
import { StarRating } from "@/components/star-rating";
import { SafeImage } from "@/components/safe-image";
import { BusinessCard } from "@/components/business-card";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export const revalidate = 300;

export async function generateStaticParams() {
  const businesses = await getPublishedBusinesses();
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const businesses = await getPublishedBusinesses();
  const b = businesses.find((x) => x.slug === slug);
  if (!b) return { title: "Not found" };
  const cat = categoryByAirtableName(b.category);
  return {
    title: `${b.name} — ${cat?.shortName ?? "Wellness"}${b.city ? ` in ${b.city}` : ""}`,
    description: blurb(b, 160),
    alternates: { canonical: `/business/${b.slug}` },
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const businesses = await getPublishedBusinesses();
  const b = businesses.find((x) => x.slug === slug);
  if (!b) notFound();

  const cat = categoryByAirtableName(b.category);
  const city = cityByName(b.city);
  const chips = serviceChips(b, 12);
  const rel = related(businesses, b);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: b.name,
    url: `${site.url}/business/${b.slug}`,
    ...(b.website ? { sameAs: [b.website, b.yelpUrl].filter(Boolean) } : {}),
    ...(b.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: b.address,
            addressLocality: b.city ?? undefined,
            addressRegion: "CA",
            addressCountry: "US",
          },
        }
      : {}),
    ...(b.phone ? { telephone: b.phone } : {}),
    ...(b.googleRating && b.googleReviews
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: b.googleRating,
            reviewCount: b.googleReviews,
            bestRating: 5,
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ---- Header ---- */}
      <div className="wash-fern border-b hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 pt-10 pb-10">
          <nav aria-label="Breadcrumb" className="micro text-ink-soft mb-6">
            <ol className="flex flex-wrap gap-2 list-none">
              <li>
                <Link href="/directory" className="no-underline text-ink-soft hover:text-ink">
                  Directory
                </Link>
                <span aria-hidden="true" className="ml-2 text-fern-bright">/</span>
              </li>
              {cat && (
                <li>
                  <Link href={`/categories/${cat.slug}`} className="no-underline text-ink-soft hover:text-ink">
                    {cat.shortName}
                  </Link>
                  <span aria-hidden="true" className="ml-2 text-fern-bright">/</span>
                </li>
              )}
              <li aria-current="page" className="text-ink">{b.name}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="micro text-fern mb-3">
                {cat?.name ?? b.category}
                {b.city && (
                  <>
                    <span aria-hidden="true" className="mx-2 text-fern-bright">·</span>
                    {city ? (
                      <Link href={`/cities/${city.slug}`} className="no-underline text-fern">
                        {b.city}
                      </Link>
                    ) : (
                      b.city
                    )}
                  </>
                )}
                {b.featured && (
                  <>
                    <span aria-hidden="true" className="mx-2 text-fern-bright">·</span>
                    <span className="text-gold">★ Featured</span>
                  </>
                )}
              </p>
              <h1 className="display text-3xl sm:text-5xl leading-[1.05]">{b.name}</h1>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                {b.googleRating != null && (
                  <span className="inline-flex items-center gap-2">
                    <StarRating rating={b.googleRating} reviews={b.googleReviews} />
                    <span className="micro text-ink-soft">Google</span>
                  </span>
                )}
                {b.yelpRating != null && (
                  <span className="inline-flex items-center gap-2">
                    <StarRating rating={b.yelpRating} reviews={b.yelpReviews} />
                    <span className="micro text-ink-soft">Yelp</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {b.website && (
                <a
                  href={b.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="micro no-underline bg-fern border border-fern text-paper px-5 py-3 invert-hover"
                >
                  Visit website ↗
                </a>
              )}
              {b.phone && (
                <a
                  href={telHref(b.phone)}
                  className="micro no-underline border border-ink px-5 py-3 invert-hover"
                >
                  {b.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-10 py-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12 min-w-0">
          {/* ---- Gallery ---- */}
          {b.images.length > 0 && (
            <Reveal>
              <div className={`grid gap-2 ${b.images.length === 1 ? "" : "grid-cols-2 sm:grid-cols-3"}`}>
                {b.images.slice(0, 3).map((src, i) => (
                  <SafeImage
                    key={src}
                    src={src}
                    alt={`${b.name} — photo ${i + 1}`}
                    aspect={b.images.length === 1 ? "aspect-[21/9]" : "aspect-[4/3]"}
                    className={i === 0 && b.images.length >= 3 ? "sm:col-span-1" : ""}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                ))}
              </div>
            </Reveal>
          )}

          {/* ---- The brief ---- */}
          {b.copy && (
            <Reveal>
              <section aria-labelledby="brief-heading">
                <h2 id="brief-heading" className="micro text-fern mb-4">The research brief</h2>
                <div className="prose-fw text-[15px] leading-relaxed">
                  {b.copy.split(/\n{2,}/).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* ---- Services ---- */}
          {chips.length > 0 && (
            <Reveal>
              <section aria-labelledby="services-heading">
                <h2 id="services-heading" className="micro text-fern mb-4">Services</h2>
                <ul className="flex flex-wrap gap-2 list-none">
                  {chips.map((s) => (
                    <li key={s} className="border hairline-strong px-3 py-1.5 text-[13px]">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {/* ---- Field notes ---- */}
          {b.quotes.length > 0 && (
            <Reveal>
              <section aria-labelledby="notes-heading">
                <h2 id="notes-heading" className="micro text-fern mb-2">Field notes</h2>
                <p className="micro text-ink-soft mb-4">
                  Synthesized from verified Google &amp; Yelp reviews
                </p>
                <div className="space-y-4">
                  {b.quotes.slice(0, 3).map((qt, i) => (
                    <blockquote key={i} className="border-l-2 border-fern pl-5 text-[14px] leading-relaxed text-ink-soft">
                      “{cleanQuote(qt)}”
                    </blockquote>
                  ))}
                </div>
              </section>
            </Reveal>
          )}
        </div>

        {/* ---- Facts rail ---- */}
        <aside className="lg:col-span-1">
          <div className="border hairline p-6 sticky top-32 space-y-5">
            <h2 className="micro text-fern">At a glance</h2>
            <dl className="space-y-4 text-[14px]">
              {b.address && (
                <div>
                  <dt className="micro text-ink-soft mb-1">Address</dt>
                  <dd>
                    {b.mapsUrl ? (
                      <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4 decoration-fern-bright">
                        {b.address}
                      </a>
                    ) : (
                      b.address
                    )}
                  </dd>
                </div>
              )}
              {b.phone && (
                <div>
                  <dt className="micro text-ink-soft mb-1">Phone</dt>
                  <dd>
                    <a href={telHref(b.phone)} className="text-ink no-underline hover:text-fern">
                      {b.phone}
                    </a>
                  </dd>
                </div>
              )}
              {b.website && (
                <div>
                  <dt className="micro text-ink-soft mb-1">Website</dt>
                  <dd>
                    <a href={b.website} target="_blank" rel="noopener noreferrer" className="text-fern no-underline">
                      {displayUrl(b.website)} ↗
                    </a>
                  </dd>
                </div>
              )}
              {b.pricing && (
                <div>
                  <dt className="micro text-ink-soft mb-1">Pricing transparency</dt>
                  <dd>{b.pricing}</dd>
                </div>
              )}
              {b.googleRating != null && (
                <div>
                  <dt className="micro text-ink-soft mb-1">Google rating</dt>
                  <dd className="tabular">
                    {formatRating(b.googleRating)} · {formatReviews(b.googleReviews)}
                  </dd>
                </div>
              )}
              {b.yelpUrl && (
                <div>
                  <dt className="micro text-ink-soft mb-1">Yelp</dt>
                  <dd>
                    <a href={b.yelpUrl} target="_blank" rel="noopener noreferrer" className="text-fern no-underline">
                      View on Yelp ↗
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <p className="micro text-ink-soft border-t hairline pt-4">
              Spotted an error?{" "}
              <Link href="/contact" className="text-fern no-underline">
                Tell the research desk
              </Link>
            </p>
          </div>
        </aside>
      </div>

      {/* ---- Related ---- */}
      {rel.length > 0 && (
        <Section label={`More ${cat?.shortName ?? "wellness"} nearby`} index="01">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none">
            {rel.map((r) => (
              <li key={r.slug}>
                <BusinessCard business={r} showImage={false} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
