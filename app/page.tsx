import Link from "next/link";
import { site } from "@/content/site";
import { categories, cities } from "@/lib/taxonomy";
import { getPublishedBusinesses, toIndexEntry, sortByQuality } from "@/lib/businesses";
import { cleanQuote, countLabel } from "@/lib/format";
import { Section, SectionLabel, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { Marquee } from "@/components/marquee";
import { BigCta } from "@/components/big-cta";
import { FeaturedClinics } from "@/components/featured-clinics";
import { OrganizationJsonLd } from "@/components/json-ld";

export const revalidate = 300;

const TICKER = [
  "Longevity medicine",
  "GLP-1 programs",
  "NAD+ therapy",
  "Hormone optimization",
  "Advanced diagnostics",
  "Medical aesthetics",
  "IV nutrient therapy",
  "Metabolic health",
  "Regenerative medicine",
  "Functional labs",
  "Body composition",
  "Preventive screening",
];

export default async function HomePage() {
  const businesses = await getPublishedBusinesses();

  const featuredPool = businesses
    .filter((b) => b.featured || (b.googleRating ?? b.yelpRating ?? 0) >= 4.5)
    .map(toIndexEntry);

  const totalReviews = businesses.reduce(
    (sum, b) => sum + (b.googleReviews ?? 0) + (b.yelpReviews ?? 0),
    0
  );

  const cityCounts = new Map<string, number>();
  for (const b of businesses) {
    if (b.city) cityCounts.set(b.city, (cityCounts.get(b.city) ?? 0) + 1);
  }

  const voices = sortByQuality(
    businesses.filter((b) => b.quotes.length > 0 && (b.googleReviews ?? 0) >= 50)
  ).slice(0, 3);

  return (
    <>
      <OrganizationJsonLd />

      {/* ---- Hero ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <Reveal>
            <p className="micro text-fern mb-5">
              {site.region} · Curated wellness directory
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-[16ch]">
              Your health deserves better than a search results page.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-[52ch] text-ink-soft text-[15px] sm:text-base">
              Every med spa, longevity clinic, IV lounge, and hormone specialist
              in the South Bay — researched, rated, and organized by people who
              read the reviews so you don&rsquo;t have to.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <form action="/directory" className="mt-8 flex max-w-xl" role="search">
              <input
                type="search"
                name="q"
                placeholder="Search 366 vetted practices — try “NAD+” or “Los Gatos”"
                aria-label="Search the directory"
                className="field !border-ink/45 flex-1"
              />
              <button
                type="submit"
                className="micro bg-fern text-paper px-5 border border-fern invert-hover shrink-0"
              >
                Search
              </button>
            </form>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 max-w-2xl">
              {[
                { n: businesses.length, suffix: "", label: "Vetted practices" },
                { n: categories.length, suffix: "", label: "Care categories" },
                { n: cities.length, suffix: "", label: "South Bay cities" },
                { n: Math.round(totalReviews / 1000), suffix: "k+", label: "Reviews analyzed" },
              ].map((stat) => (
                <div key={stat.label} className="border-t hairline-strong pt-3">
                  <dd className="display text-3xl sm:text-4xl text-fern">
                    <Counter value={stat.n} suffix={stat.suffix} />
                  </dd>
                  <dt className="micro text-ink-soft">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <Marquee items={TICKER} />

      {/* ---- Featured clinics ---- */}
      <Section id="featured" label="Featured clinics" index="01">
        <Reveal className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="display text-2xl sm:text-4xl max-w-[22ch]">
              The short list, tuned to you.
            </h2>
            <p className="text-ink-soft text-[13px] max-w-[38ch]">
              Hand-picked leaders in each category, re-ranked for your city.
              Featured placements are curated — never sold.
            </p>
          </div>
        </Reveal>
        <FeaturedClinics
          entries={featuredPool}
          categoryTabs={categories.map((c) => ({ slug: c.slug, label: c.shortName }))}
          cityOptions={cities.filter((c) => (cityCounts.get(c.name) ?? 0) > 0).map((c) => c.name)}
        />
      </Section>

      {/* ---- Categories ---- */}
      <Section label="Browse by category" index="02" className="bg-paper-2/50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const count = businesses.filter((b) => b.category === cat.airtableName).length;
            return (
              <Reveal key={cat.slug} delay={i * 40}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="relative block border hairline bg-paper p-6 no-underline card-hover h-full"
                >
                  <PlusCorners />
                  <p className="micro text-fern mb-3">{countLabel(count, "practice")}</p>
                  <h3 className="display text-xl text-ink mb-2">{cat.name}</h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed">{cat.tagline}</p>
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={categories.length * 40}>
            <Link
              href="/directory"
              className="relative block border border-ink bg-ink text-paper p-6 no-underline card-hover h-full"
            >
              <p className="micro text-moss mb-3">Everything</p>
              <h3 className="display text-xl mb-2">The full directory</h3>
              <p className="text-[13px] text-paper/70 leading-relaxed">
                Search and filter all {businesses.length} practices at once. →
              </p>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ---- How it works ---- */}
      <Section label="How it works" index="03">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "We do the research",
              body: "Each practice is mapped against verified Google and Yelp ratings, review depth, services, credentials, and pricing transparency — over 22,000 reviews analyzed and counting.",
            },
            {
              step: "02",
              title: "You compare with clarity",
              body: "Every listing carries the same clean brief: what they do, what patients consistently say, how they price, and how to reach them. No pay-to-rank placements.",
            },
            {
              step: "03",
              title: "You book directly",
              body: "We connect you straight to the practice — their site, their phone, their front desk. FindWellness never sits between you and your provider.",
            },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 60}>
              <div className="border-t-2 border-fern pt-5">
                <p className="micro text-fern mb-3">Step {item.step}</p>
                <h3 className="display text-xl mb-2">{item.title}</h3>
                <p className="text-[13px] text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- Functional medicine band ---- */}
      <section className="wash-ink text-paper border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-16 sm:py-24">
          <Reveal className="mb-10">
            <SectionLabel index="04" dark>
              New — the functional medicine primer
            </SectionLabel>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <h2 className="display text-3xl sm:text-5xl leading-[1.05] max-w-[16ch]">
                Medicine that looks upstream.
              </h2>
              <p className="mt-5 text-paper/70 max-w-[48ch] text-[15px]">
                Functional medicine starts with your biology — hundreds of
                biomarkers, root-cause thinking, and a plan that treats you as
                a system, not a symptom. Our primer explains the field and
                introduces the programs pioneering it here in the Bay.
              </p>
              <Link
                href="/functional-medicine"
                className="mt-7 inline-block micro no-underline border border-paper/40 px-5 py-3 text-paper hover:bg-fern-bright hover:border-fern-bright transition-colors"
              >
                Read the primer →
              </Link>
            </Reveal>
            <Reveal delay={80}>
              <dl className="grid grid-cols-2 gap-px bg-paper/15 border border-paper/15">
                {[
                  { n: "100+", label: "Biomarkers in a modern panel" },
                  { n: "5", label: "Body systems mapped" },
                  { n: "43", label: "Longevity clinics listed" },
                  { n: "2×/yr", label: "Typical retesting cadence" },
                ].map((s) => (
                  <div key={s.label} className="bg-ink/60 p-6">
                    <dd className="display text-3xl text-fern-bright">{s.n}</dd>
                    <dt className="micro text-paper/60 mt-2">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Cities ---- */}
      <Section label="Wellness, city by city" index="05">
        <div className="flex flex-wrap gap-3">
          {cities
            .map((c) => ({ ...c, count: cityCounts.get(c.name) ?? 0 }))
            .filter((c) => c.count > 0)
            .sort((a, b) => b.count - a.count)
            .map((c, i) => (
              <Reveal key={c.slug} delay={Math.min(i * 25, 300)} as="span">
                <Link
                  href={`/cities/${c.slug}`}
                  className="inline-flex items-baseline gap-2 border hairline-strong px-4 py-2.5 no-underline invert-hover"
                >
                  <span className="text-[14px] font-medium">{c.name}</span>
                  <span className="micro text-ink-soft tabular">{c.count}</span>
                </Link>
              </Reveal>
            ))}
        </div>
      </Section>

      {/* ---- Programs: Eden + Coaches ---- */}
      <Section label="Beyond the directory" index="06" className="bg-paper-2/50">
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal>
            <Link
              href="/eden"
              className="relative block border hairline bg-paper p-8 no-underline card-hover h-full"
            >
              <PlusCorners />
              <p className="micro text-fern mb-3">Eden — the knowledge garden</p>
              <h3 className="display text-2xl text-ink mb-3">
                The science, before the hype reaches it.
              </h3>
              <p className="text-[13px] text-ink-soft leading-relaxed max-w-[46ch]">
                Plain-English briefs on the research and technology reshaping
                wellness — GLP-1s, NAD+, wearables, cold and heat, and what the
                evidence actually supports.
              </p>
              <span className="micro text-fern mt-5 inline-block">Enter the garden →</span>
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <Link
              href="/coaches"
              className="relative block border hairline bg-paper p-8 no-underline card-hover h-full"
            >
              <PlusCorners />
              <p className="micro text-fern mb-3">The coach collective</p>
              <h3 className="display text-2xl text-ink mb-3">
                A human in your corner.
              </h3>
              <p className="text-[13px] text-ink-soft leading-relaxed max-w-[46ch]">
                Health consultants, concierge practitioners, fitness coaches,
                and nutritionists who turn lab results and good intentions into
                a plan you keep.
              </p>
              <span className="micro text-fern mt-5 inline-block">Meet the coaches →</span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ---- Voices ---- */}
      {voices.length > 0 && (
        <Section label="Field notes" index="07">
          <p className="text-[13px] text-ink-soft mb-8 max-w-[52ch]">
            Syntheses of verified Google and Yelp reviews, distilled by our
            research desk for every listing.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {voices.map((b, i) => (
              <Reveal key={b.slug} delay={i * 60}>
                <figure className="border hairline p-6 h-full flex flex-col">
                  <blockquote className="text-[14px] leading-relaxed flex-1">
                    “
                    {cleanQuote(b.quotes[0]).length > 220
                      ? `${cleanQuote(b.quotes[0]).slice(0, 219).trimEnd()}…`
                      : cleanQuote(b.quotes[0])}
                    ”
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t hairline">
                    <Link href={`/business/${b.slug}`} className="micro text-fern no-underline">
                      {b.name} →
                    </Link>
                    <span className="block micro text-ink-soft mt-1">
                      Review synthesis · {b.city}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <BigCta href="/directory">Find your practice</BigCta>
      </Section>
    </>
  );
}
