"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { BusinessIndexEntry } from "@/lib/businesses";
import { StarRating } from "@/components/star-rating";
import { SafeImage } from "@/components/safe-image";

/**
 * The homepage's curated picks: filter the best of the directory by
 * category and city. Manually featured businesses always lead; the rest
 * rank by a smoothed rating score. The visitor's city choice persists in
 * localStorage so return visits open on their scene.
 */

const CITY_KEY = "fw-city";

/**
 * The saved city lives in localStorage, read via useSyncExternalStore so the
 * server renders "all" and the client settles on the saved value without a
 * hydration mismatch or a setState-in-effect.
 */
const cityListeners = new Set<() => void>();
const cityStore = {
  subscribe(listener: () => void) {
    cityListeners.add(listener);
    return () => cityListeners.delete(listener);
  },
  get(): string {
    try {
      return window.localStorage.getItem(CITY_KEY) ?? "all";
    } catch {
      return "all";
    }
  },
  set(value: string) {
    try {
      if (value === "all") window.localStorage.removeItem(CITY_KEY);
      else window.localStorage.setItem(CITY_KEY, value);
    } catch {
      /* storage unavailable — selection still applies via re-render */
    }
    cityListeners.forEach((l) => l());
  },
};

function entryScore(e: BusinessIndexEntry): number {
  if (!e.rating) return 0;
  return e.rating + Math.min(Math.log10((e.reviews ?? 0) + 1) * 0.15, 0.55);
}

export function FeaturedClinics({
  entries,
  categoryTabs,
  cityOptions,
}: {
  entries: BusinessIndexEntry[];
  categoryTabs: { slug: string; label: string }[];
  cityOptions: string[];
}) {
  const [category, setCategory] = useState<string>("all");
  const savedCity = useSyncExternalStore(cityStore.subscribe, cityStore.get, () => "all");
  const city = cityOptions.includes(savedCity) ? savedCity : "all";

  function chooseCity(next: string) {
    cityStore.set(next);
  }

  const picks = useMemo(() => {
    const scoped = entries.filter(
      (e) =>
        (category === "all" || e.categorySlug === category) &&
        (city === "all" || e.city === city)
    );
    return [...scoped]
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return entryScore(b) - entryScore(a);
      })
      .slice(0, 6);
  }, [entries, category, city]);

  const browseHref =
    `/directory?` +
    new URLSearchParams({
      ...(category !== "all" ? { category } : {}),
      ...(city !== "all" ? { city } : {}),
    }).toString();

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter featured clinics by category">
          {[{ slug: "all", label: "All" }, ...categoryTabs].map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setCategory(tab.slug)}
              aria-pressed={category === tab.slug}
              className={`micro px-3 py-2 border transition-colors ${
                category === tab.slug
                  ? "bg-ink text-paper border-ink"
                  : "hairline-strong text-ink-soft hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <label className="lg:ml-auto flex items-center gap-3">
          <span className="micro text-ink-soft">Near</span>
          <select
            value={city}
            onChange={(e) => chooseCity(e.target.value)}
            className="field !w-auto pr-8"
            aria-label="Filter featured clinics by city"
          >
            <option value="all">All South Bay</option>
            {cityOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      {picks.length === 0 ? (
        <div className="border hairline p-10 text-center">
          <p className="text-ink-soft mb-4">
            No rated picks for this combination yet — the full directory has
            every listing.
          </p>
          <Link href={browseHref} className="micro no-underline border border-ink px-4 py-2 invert-hover inline-block">
            Browse all matches →
          </Link>
        </div>
      ) : (
        <>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {picks.map((e) => (
              <li key={e.slug}>
                <article className="border hairline bg-paper card-hover relative h-full flex flex-col">
                  {e.featured && (
                    <span className="absolute top-3 right-3 z-10 micro bg-ink px-2 py-1 flex items-center gap-1">
                      <span aria-hidden="true" style={{ color: "var(--color-gold)" }}>★</span>
                      <span className="text-paper">Featured</span>
                    </span>
                  )}
                  {e.image ? (
                    <SafeImage
                      src={e.image}
                      alt=""
                      aspect="aspect-[16/9]"
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <span className="block relative aspect-[16/9] bg-paper-2 hatch">
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="w-8 h-8 text-fern/35" fill="currentColor">
                          <path d="M12 21.5C6.8 18.6 4.4 13.4 5.3 6.9c6.5.9 11.7 3.3 13.4 8.6 1.1 3.4-1.2 6-6.7 6z" />
                        </svg>
                      </span>
                    </span>
                  )}
                  <div className="p-5 flex flex-col gap-2.5 flex-1">
                    <p className="micro text-ink-soft">
                      {e.category}
                      {e.city && (
                        <>
                          <span aria-hidden="true" className="mx-2 text-fern-bright">·</span>
                          {e.city}
                        </>
                      )}
                    </p>
                    <h3 className="display text-xl leading-snug">
                      <Link
                        href={`/business/${e.slug}`}
                        className="no-underline text-ink hover:text-fern transition-colors after:absolute after:inset-0"
                      >
                        {e.name}
                      </Link>
                    </h3>
                    <StarRating rating={e.rating} reviews={e.reviews} />
                    <p className="text-[13px] text-ink-soft leading-relaxed">{e.blurb}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href={browseHref}
              className="micro no-underline border border-ink px-5 py-3 invert-hover inline-block"
            >
              Browse every match →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
