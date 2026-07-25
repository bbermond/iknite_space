/** Small display helpers shared across pages. */

export function formatRating(rating: number | null): string {
  if (rating == null) return "—";
  return rating.toFixed(1).replace(/\.0$/, ".0");
}

export function formatReviews(count: number | null): string {
  if (count == null) return "";
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k reviews`;
  return `${count} review${count === 1 ? "" : "s"}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** `https://www.example.com/path` → `example.com` for compact link labels. */
export function displayUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Source review quotes often arrive pre-quoted; strip the wrapping marks so
 * templates can add their own typographic quotes without doubling.
 */
export function cleanQuote(quote: string): string {
  return quote.trim().replace(/^["“”'']+|["“”'']+$/g, "").trim();
}

/** Plural-safe count label: `220 clinics`, `1 clinic`. */
export function countLabel(n: number, noun: string, plural?: string): string {
  return `${n} ${n === 1 ? noun : plural ?? `${noun}s`}`;
}
