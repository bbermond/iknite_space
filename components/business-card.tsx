import Link from "next/link";
import type { Business } from "@/lib/businesses";
import { blurb } from "@/lib/businesses";
import { categoryByAirtableName } from "@/lib/taxonomy";
import { StarRating } from "@/components/star-rating";
import { SafeImage } from "@/components/safe-image";

/**
 * The directory's standard listing card. Hairline-bordered, image-optional
 * (leaf-hatch placeholder keeps the grid rhythm), gold star ratings, and a
 * featured mark for curated picks.
 */
export function BusinessCard({
  business,
  showImage = true,
}: {
  business: Business;
  showImage?: boolean;
}) {
  const cat = categoryByAirtableName(business.category);

  return (
    <article className="border hairline bg-paper card-hover relative flex flex-col">
      {business.featured && (
        <span className="absolute top-3 right-3 z-10 micro bg-ink text-gold-ink px-2 py-1 flex items-center gap-1">
          <span aria-hidden="true" style={{ color: "var(--color-gold)" }}>★</span>
          <span className="text-paper">Featured</span>
        </span>
      )}

      {showImage &&
        (business.images[0] ? (
          <SafeImage
            src={business.images[0]}
            alt={`${business.name} — ${cat?.name ?? "wellness practice"}`}
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
        ))}

      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <p className="micro text-ink-soft">
          {cat?.shortName ?? business.category}
          {business.city && (
            <>
              <span aria-hidden="true" className="mx-2 text-fern-bright">·</span>
              {business.city}
            </>
          )}
        </p>
        <h3 className="display text-xl leading-snug">
          <Link
            href={`/business/${business.slug}`}
            className="no-underline text-ink hover:text-fern transition-colors after:absolute after:inset-0"
          >
            {business.name}
          </Link>
        </h3>
        <StarRating
          rating={business.googleRating ?? business.yelpRating}
          reviews={business.googleRating ? business.googleReviews : business.yelpReviews}
        />
        <p className="text-[13px] text-ink-soft leading-relaxed">{blurb(business)}</p>
      </div>
    </article>
  );
}
