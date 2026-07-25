import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/taxonomy";
import { getPublishedBusinesses } from "@/lib/businesses";
import { countLabel } from "@/lib/format";
import { Reveal } from "@/components/reveal";
import { PlusCorners } from "@/components/section";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Wellness by city — 17 South Bay cities",
  description:
    "Browse vetted wellness practices city by city — San Jose, Los Gatos, Sunnyvale, Santa Clara, and every corner of the South Bay.",
  alternates: { canonical: "/cities" },
};

export default async function CitiesPage() {
  const businesses = await getPublishedBusinesses();
  const counts = new Map<string, number>();
  for (const b of businesses) {
    if (b.city) counts.set(b.city, (counts.get(b.city) ?? 0) + 1);
  }

  const withCounts = cities
    .map((c) => ({ ...c, count: counts.get(c.name) ?? 0 }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <div className="wash-fern border-b hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 pt-14 pb-10">
          <p className="micro text-fern mb-3">Browse by city</p>
          <h1 className="display text-3xl sm:text-5xl max-w-[18ch]">
            The South Bay, block by block.
          </h1>
          <p className="mt-4 text-ink-soft text-[15px] max-w-[54ch]">
            {countLabel(businesses.length, "practice")} across{" "}
            {withCounts.length} cities — every one researched and rated.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-10 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {withCounts.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 35, 350)}>
              <Link
                href={`/cities/${c.slug}`}
                className="relative block border hairline bg-paper p-6 no-underline card-hover h-full"
              >
                <PlusCorners />
                <p className="micro text-fern mb-3">{countLabel(c.count, "practice")}</p>
                <h2 className="display text-xl text-ink mb-2">{c.name}</h2>
                <p className="text-[13px] text-ink-soft leading-relaxed">{c.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
