import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { categories, cities, categoryBySlug, cityBySlug } from "@/lib/taxonomy";
import {
  getPublishedBusinesses,
  sortByQuality,
  type Business,
} from "@/lib/businesses";
import { countLabel } from "@/lib/format";
import { BusinessCard } from "@/components/business-card";
import { DirectoryFilters } from "@/components/directory-filters";

export const metadata: Metadata = {
  title: "Directory — every vetted practice in the South Bay",
  description:
    "Search and filter 270+ researched wellness practices — med spas, longevity clinics, IV lounges, hormone specialists, and weight-loss programs across the South Bay.",
  alternates: { canonical: "/directory" },
};

const PER_PAGE = 24;

function matches(b: Business, q: string): boolean {
  const hay = [b.name, b.city, b.category, b.services, b.copy, b.address]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((term) => hay.includes(term));
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const categorySlug = typeof params.category === "string" ? params.category : "";
  const citySlug = typeof params.city === "string" ? params.city : "";
  const sort = typeof params.sort === "string" ? params.sort : "best";
  const page = Math.max(1, Number(typeof params.page === "string" ? params.page : "1") || 1);

  const category = categoryBySlug(categorySlug);
  const city = cityBySlug(citySlug);

  const all = await getPublishedBusinesses();

  let results = all.filter(
    (b) =>
      (!category || b.category === category.airtableName) &&
      (!city || b.city === city.name) &&
      (!q || matches(b, q))
  );

  results =
    sort === "az"
      ? [...results].sort((a, b) => a.name.localeCompare(b.name))
      : sort === "reviews"
        ? [...results].sort(
            (a, b) =>
              ((b.googleReviews ?? 0) + (b.yelpReviews ?? 0)) -
              ((a.googleReviews ?? 0) + (a.yelpReviews ?? 0))
          )
        : sortByQuality(results);

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageResults = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const pageHref = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (categorySlug) sp.set("category", categorySlug);
    if (citySlug) sp.set("city", citySlug);
    if (sort !== "best") sp.set("sort", sort);
    if (p > 1) sp.set("page", String(p));
    return `/directory${sp.size ? `?${sp}` : ""}`;
  };

  const heading = [category?.name, city ? `in ${city.name}` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className="wash-fern border-b hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 pt-12 pb-8">
          <p className="micro text-fern mb-3">The directory</p>
          <h1 className="display text-3xl sm:text-5xl mb-2">
            {heading || "Every practice, one place."}
          </h1>
          <p className="text-ink-soft text-[14px] max-w-[56ch]">
            {countLabel(results.length, "practice")}
            {q && (
              <>
                {" "}matching <strong className="text-ink">“{q}”</strong>
              </>
            )}
            {" — researched, rated, and updated continuously."}
          </p>
        </div>
      </div>

      <div className="sticky top-14 z-40 bg-paper/95 backdrop-blur border-b hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-4">
          <Suspense fallback={<div className="h-[74px]" aria-hidden="true" />}>
            <DirectoryFilters
              categoryOptions={categories.map((c) => ({ slug: c.slug, label: c.name }))}
              cityOptions={cities.map((c) => ({ slug: c.slug, label: c.name }))}
            />
          </Suspense>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-10 py-10">
        {pageResults.length === 0 ? (
          <div className="border hairline p-12 text-center max-w-xl mx-auto my-10">
            <h2 className="display text-2xl mb-3">Nothing matched.</h2>
            <p className="text-ink-soft text-[14px] mb-6">
              Try fewer words, or clear a filter — the directory covers{" "}
              {countLabel(all.length, "practice")} across the South Bay.
            </p>
            <Link
              href="/directory"
              className="micro no-underline border border-ink px-4 py-2 invert-hover inline-block"
            >
              Clear all filters
            </Link>
          </div>
        ) : (
          <>
            <h2 className="sr-only">Results</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
              {pageResults.map((b) => (
                <li key={b.slug}>
                  <BusinessCard business={b} />
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav
                className="mt-10 flex items-center justify-between border-t hairline pt-6"
                aria-label="Pagination"
              >
                {current > 1 ? (
                  <Link href={pageHref(current - 1)} className="micro no-underline border hairline-strong px-4 py-2 invert-hover">
                    ← Previous
                  </Link>
                ) : (
                  <span />
                )}
                <span className="micro text-ink-soft tabular">
                  Page {current} of {totalPages}
                </span>
                {current < totalPages ? (
                  <Link href={pageHref(current + 1)} className="micro no-underline border hairline-strong px-4 py-2 invert-hover">
                    Next →
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
}
