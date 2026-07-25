"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

/**
 * The directory's filter bar. Renders as a plain GET form so filtering
 * works without JavaScript; with it, selects apply instantly and the
 * search box debounces as you type.
 */
export function DirectoryFilters({
  categoryOptions,
  cityOptions,
}: {
  categoryOptions: { slug: string; label: string }[];
  cityOptions: { slug: string; label: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const [q, setQ] = useState(params.get("q") ?? "");

  const category = params.get("category") ?? "";
  const city = params.get("city") ?? "";
  const sort = params.get("sort") ?? "best";

  function apply(next: Record<string, string>) {
    const merged = new URLSearchParams();
    const values: Record<string, string> = {
      q,
      category,
      city,
      sort,
      ...next,
    };
    for (const key of ["q", "category", "city", "sort"] as const) {
      const v = values[key].trim();
      if (v && !(key === "sort" && v === "best")) merged.set(key, v);
    }
    startTransition(() => {
      router.replace(`/directory${merged.size ? `?${merged}` : ""}`, { scroll: false });
    });
  }

  // Debounced live search once the user types.
  useEffect(() => {
    if (q === (params.get("q") ?? "")) return;
    const t = setTimeout(() => apply({ q }), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const selectClass = "field !w-auto pr-8";

  return (
    <form
      action="/directory"
      method="get"
      className="flex flex-col lg:flex-row gap-3 lg:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        apply({ q });
      }}
    >
      <div className="flex-1 min-w-0">
        <label htmlFor="dir-q" className="micro text-ink-soft block mb-1.5">
          Search
        </label>
        <input
          id="dir-q"
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Name, treatment, or neighborhood…"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="dir-category" className="micro text-ink-soft block mb-1.5">
          Category
        </label>
        <select
          id="dir-category"
          name="category"
          value={category}
          onChange={(e) => apply({ category: e.target.value })}
          className={selectClass}
        >
          <option value="">All categories</option>
          {categoryOptions.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dir-city" className="micro text-ink-soft block mb-1.5">
          City
        </label>
        <select
          id="dir-city"
          name="city"
          value={city}
          onChange={(e) => apply({ city: e.target.value })}
          className={selectClass}
        >
          <option value="">All cities</option>
          {cityOptions.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dir-sort" className="micro text-ink-soft block mb-1.5">
          Sort
        </label>
        <select
          id="dir-sort"
          name="sort"
          value={sort}
          onChange={(e) => apply({ sort: e.target.value })}
          className={selectClass}
        >
          <option value="best">Best match</option>
          <option value="rating">Top rated</option>
          <option value="reviews">Most reviewed</option>
          <option value="az">A–Z</option>
        </select>
      </div>

      <button
        type="submit"
        className="micro bg-fern text-paper border border-fern px-5 py-3 invert-hover lg:mb-0"
      >
        Apply
      </button>
    </form>
  );
}
