import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: "/directory", label: "The full directory" },
  { href: "/categories", label: "All categories" },
  { href: "/cities", label: "All cities" },
  { href: "/eden", label: "Eden — knowledge garden" },
];

export default function NotFound() {
  return (
    <div className="relative wash-fern overflow-hidden min-h-[70vh]">
      <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 sm:pt-28 pb-24">
        <p className="micro text-fern mb-4">404 — Page not found</p>
        <h1 className="display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-[14ch]">
          Lost in the garden.
        </h1>
        <p className="mt-6 max-w-[52ch] text-ink-soft text-[15px] sm:text-base">
          The page you were looking for has moved, closed, or never existed.
          The directory, on the other hand, is very much open.
        </p>

        <form action="/directory" className="mt-8 flex max-w-xl" role="search">
          <input
            type="search"
            name="q"
            placeholder="Search the directory"
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

        <div className="mt-10 flex flex-wrap gap-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="micro no-underline border hairline-strong px-4 py-2.5 invert-hover"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
