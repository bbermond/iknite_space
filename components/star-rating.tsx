import { formatRating, formatReviews } from "@/lib/format";

/**
 * Gold star row with numeric rating and review count. Stars are decorative;
 * the accessible label carries the value.
 */
export function StarRating({
  rating,
  reviews,
  className = "",
}: {
  rating: number | null;
  reviews?: number | null;
  className?: string;
}) {
  if (rating == null) return null;
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <span
      className={`inline-flex items-baseline gap-2 ${className}`}
      aria-label={`Rated ${formatRating(rating)} out of 5${reviews ? ` from ${formatReviews(reviews)}` : ""}`}
    >
      <span aria-hidden="true" className="relative inline-block leading-none text-[13px] tracking-[2px]">
        <span className="text-ink/20">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden whitespace-nowrap"
          style={{ width: `${pct}%`, color: "var(--color-gold)" }}
        >
          ★★★★★
        </span>
      </span>
      <span className="tabular text-[13px] font-medium">{formatRating(rating)}</span>
      {reviews != null && (
        <span className="micro text-ink-soft">{formatReviews(reviews)}</span>
      )}
    </span>
  );
}
