import "server-only";

import snapshot from "@/data/businesses.json";
import { airtableConfigured, listAllRecords, FIELDS } from "@/lib/airtable";
import { categoryByAirtableName, cityByName } from "@/lib/taxonomy";

export type Business = {
  airtableId: string;
  name: string;
  slug: string;
  zone: string | null;
  category: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  mapsUrl: string | null;
  yelpUrl: string | null;
  googleRating: number | null;
  googleReviews: number | null;
  yelpRating: number | null;
  yelpReviews: number | null;
  quotes: string[];
  copy: string | null;
  services: string | null;
  images: string[];
  tier: string | null;
  threatScore: number | null;
  pricing: string | null;
  notes: string | null;
  featured: boolean;
  published: boolean;
};

/** Compact shape serialized to the client for instant search/filtering. */
export type BusinessIndexEntry = {
  slug: string;
  name: string;
  category: string | null;
  categorySlug: string | null;
  city: string | null;
  citySlug: string | null;
  rating: number | null;
  reviews: number | null;
  blurb: string;
  image: string | null;
  featured: boolean;
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function selectName(v: unknown): string | null {
  if (v && typeof v === "object" && "name" in v) return String((v as { name: unknown }).name);
  if (typeof v === "string") return v;
  return null;
}

function str(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

function num(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/** Map a raw Airtable REST record (fields keyed by name) into a Business. */
export function fromAirtableFields(id: string, f: Record<string, unknown>): Business {
  const name = (str(f[FIELDS.name]) ?? "").trim();
  return {
    airtableId: id,
    name,
    slug: slugify(name),
    zone: selectName(f[FIELDS.zone]),
    category: selectName(f[FIELDS.category]),
    city: str(f[FIELDS.city]),
    address: str(f[FIELDS.address]),
    phone: str(f[FIELDS.phone]),
    website: str(f[FIELDS.website]),
    mapsUrl: str(f[FIELDS.mapsUrl]),
    yelpUrl: str(f[FIELDS.yelpUrl]),
    googleRating: num(f[FIELDS.googleRating]),
    googleReviews: num(f[FIELDS.googleReviews]),
    yelpRating: num(f[FIELDS.yelpRating]),
    yelpReviews: num(f[FIELDS.yelpReviews]),
    quotes: [f[FIELDS.quote1], f[FIELDS.quote2], f[FIELDS.quote3], f[FIELDS.quote4], f[FIELDS.quote5]]
      .map(str)
      .filter((q): q is string => q !== null),
    copy: str(f[FIELDS.copy]),
    services: str(f[FIELDS.services]),
    images: [f[FIELDS.image1], f[FIELDS.image2], f[FIELDS.image3], f[FIELDS.image4], f[FIELDS.image5]]
      .map(str)
      .filter((u): u is string => u !== null),
    tier: selectName(f[FIELDS.tier]),
    threatScore: num(f[FIELDS.threatScore]),
    pricing: selectName(f[FIELDS.pricing]),
    notes: str(f[FIELDS.notes]),
    featured: f[FIELDS.featured] === true,
    published: f[FIELDS.published] === true,
  };
}

/**
 * Colliding slugs get -2/-3 suffixes assigned in airtableId order — a stable,
 * immutable key — so a record keeps the same URL whether it renders from the
 * bundled snapshot or a live Airtable read, regardless of list ordering.
 */
function dedupeSlugs(list: Business[]): Business[] {
  const groups = new Map<string, Business[]>();
  for (const b of list) {
    const g = groups.get(b.slug);
    if (g) g.push(b);
    else groups.set(b.slug, [b]);
  }
  const finalSlug = new Map<Business, string>();
  for (const [slug, group] of groups) {
    const ordered = [...group].sort((a, b) => a.airtableId.localeCompare(b.airtableId));
    ordered.forEach((b, i) => {
      finalSlug.set(b, i === 0 ? slug : `${slug}-${i + 1}`);
    });
  }
  return list.map((b) => {
    const s = finalSlug.get(b)!;
    return s === b.slug ? b : { ...b, slug: s };
  });
}

const LIVE_TTL_MS = 5 * 60 * 1000;
let liveCache: { at: number; data: Business[] } | null = null;

/** Force the next read to hit Airtable (called after CMS writes). */
export function invalidateBusinessCache() {
  liveCache = null;
}

async function loadLive(): Promise<Business[]> {
  const now = Date.now();
  if (liveCache && now - liveCache.at < LIVE_TTL_MS) return liveCache.data;
  const records = await listAllRecords();
  const data = dedupeSlugs(
    records
      .map((r) => fromAirtableFields(r.id, r.fields))
      .filter((b) => b.name.length > 0)
      .sort((a, b) => a.name.localeCompare(b.name))
  );
  liveCache = { at: now, data };
  return data;
}

function loadSnapshot(): Business[] {
  return (snapshot as { businesses: Business[] }).businesses;
}

/**
 * All businesses. Uses live Airtable data when AIRTABLE_API_KEY is set
 * (cached for five minutes), falling back to the bundled snapshot — so the
 * public site always renders, configured or not.
 */
export async function getAllBusinesses(): Promise<Business[]> {
  if (airtableConfigured()) {
    try {
      return await loadLive();
    } catch (err) {
      console.error("[businesses] live fetch failed; serving snapshot:", err);
    }
  }
  return loadSnapshot();
}

/**
 * The research base contains repeat-scrape duplicates (same practice, several
 * records). Public pages collapse each exact-name group to its most complete
 * record, filling gaps (rating, images, quotes…) from the duplicates. The
 * admin CMS still sees every raw record for cleanup.
 */
function completeness(b: Business): number {
  return (
    (b.googleRating != null ? 8 : 0) +
    (b.yelpRating != null ? 2 : 0) +
    (b.images.length > 0 ? 4 : 0) +
    (b.quotes.length > 0 ? 2 : 0) +
    ((b.copy?.length ?? 0) > 300 ? 1 : 0) +
    (b.website ? 1 : 0) +
    (b.phone ? 1 : 0)
  );
}

function nameKey(b: Business): string {
  return b.name.toLowerCase().replace(/['’]/g, "").replace(/\s+/g, " ").trim();
}

function mergeDuplicates(list: Business[]): Business[] {
  const groups = new Map<string, Business[]>();
  for (const b of list) {
    const key = nameKey(b);
    const g = groups.get(key);
    if (g) g.push(b);
    else groups.set(key, [b]);
  }

  const out: Business[] = [];
  for (const group of groups.values()) {
    if (group.length === 1) {
      out.push(group[0]);
      continue;
    }
    const ordered = [...group].sort(
      (a, b) => completeness(b) - completeness(a) || a.airtableId.localeCompare(b.airtableId)
    );
    const winner = { ...ordered[0] };
    // The merged record owns the group's canonical URL: the shortest slug in
    // the group is the un-suffixed base (suffixes only exist because of the
    // duplicates being collapsed here).
    winner.slug = group.reduce((s, b) => (b.slug.length < s.length ? b.slug : s), winner.slug);
    for (const loser of ordered.slice(1)) {
      for (const key of [
        "zone", "category", "city", "address", "phone", "website", "mapsUrl",
        "yelpUrl", "copy", "services", "tier", "pricing",
      ] as const) {
        if (winner[key] == null && loser[key] != null) {
          (winner as Record<string, unknown>)[key] = loser[key];
        }
      }
      if (winner.googleRating == null && loser.googleRating != null) {
        winner.googleRating = loser.googleRating;
        winner.googleReviews = loser.googleReviews;
      }
      if (winner.yelpRating == null && loser.yelpRating != null) {
        winner.yelpRating = loser.yelpRating;
        winner.yelpReviews = loser.yelpReviews;
      }
      if (winner.images.length === 0 && loser.images.length > 0) winner.images = loser.images;
      if (winner.quotes.length === 0 && loser.quotes.length > 0) winner.quotes = loser.quotes;
      if (loser.featured) winner.featured = true;
    }
    out.push(winner);
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/** Published, de-duplicated businesses — everything public renders from this. */
export async function getPublishedBusinesses(): Promise<Business[]> {
  return mergeDuplicates(
    (await getAllBusinesses()).filter((b) => b.published !== false)
  );
}

export async function getBusinessBySlug(slug: string): Promise<Business | undefined> {
  return (await getPublishedBusinesses()).find((b) => b.slug === slug);
}

/**
 * Quality score: a Bayesian-smoothed Google rating so a 4.9★ with 300
 * reviews outranks a lone 5★, with a small volume bonus. Range ≈ 0–5.5.
 */
export function score(b: Business): number {
  const r = b.googleRating ?? b.yelpRating;
  const n = (b.googleRating ? b.googleReviews : b.yelpReviews) ?? 0;
  if (!r) return 0;
  const PRIOR_MEAN = 4.55;
  const PRIOR_WEIGHT = 25;
  const smoothed = (r * n + PRIOR_MEAN * PRIOR_WEIGHT) / (n + PRIOR_WEIGHT);
  return smoothed + Math.min(Math.log10(n + 1) * 0.12, 0.5);
}

export function sortByQuality(list: Business[]): Business[] {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const d = score(b) - score(a);
    if (d !== 0) return d;
    return (b.googleReviews ?? 0) - (a.googleReviews ?? 0);
  });
}

/**
 * Featured picks for a scope (homepage, category page, or city page):
 * manually featured businesses first, topped up with the highest-scoring
 * rated businesses until `limit` is reached.
 */
export function featuredFor(
  list: Business[],
  opts: { category?: string; city?: string; limit?: number } = {}
): Business[] {
  const limit = opts.limit ?? 6;
  const scoped = list.filter(
    (b) =>
      (!opts.category || b.category === opts.category) &&
      (!opts.city || b.city === opts.city)
  );
  const manual = scoped.filter((b) => b.featured);
  const fill = sortByQuality(scoped.filter((b) => !b.featured && (b.googleRating ?? b.yelpRating)));
  // The source data contains near-duplicate records; never show the same
  // name twice in a curated row.
  const seen = new Set<string>();
  const out: Business[] = [];
  for (const b of [...sortByQuality(manual), ...fill]) {
    const key = b.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(b);
    if (out.length === limit) break;
  }
  return out;
}

/**
 * First sentence of the synthesized copy, capped for card display. Extends
 * past abbreviations ("Dr.", "St.") so sentences don't cut mid-title.
 */
const ABBREV_END = /\b(?:Dr|Mr|Mrs|Ms|St|Ste|Blvd|Ave|Rd|Inc|vs|No)\.$/;

export function blurb(b: Business, max = 150): string {
  const source = (b.copy ?? "").trim();
  const parts = source.split(/(?<=[.!?])\s+/);
  let text = "";
  for (const part of parts) {
    text = text ? `${text} ${part}` : part;
    if (!ABBREV_END.test(text) && text.length > 20) break;
  }
  if (!text) text = source;
  if (text.length > max) {
    const cut = text.slice(0, max - 1);
    text = `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 20)).trimEnd()}…`;
  }
  return text;
}

export function toIndexEntry(b: Business): BusinessIndexEntry {
  return {
    slug: b.slug,
    name: b.name,
    category: categoryByAirtableName(b.category)?.shortName ?? b.category,
    categorySlug: categoryByAirtableName(b.category)?.slug ?? null,
    city: b.city,
    citySlug: b.city ? cityByName(b.city)?.slug ?? slugify(b.city) : null,
    rating: b.googleRating ?? b.yelpRating,
    reviews: b.googleRating ? b.googleReviews : b.yelpReviews,
    blurb: blurb(b),
    image: b.images[0] ?? null,
    featured: b.featured,
  };
}

/** Related businesses: same category, nearby first, best first. */
export function related(all: Business[], current: Business, limit = 4): Business[] {
  const pool = all.filter((b) => b.slug !== current.slug && b.category === current.category);
  const sameCity = sortByQuality(pool.filter((b) => b.city === current.city));
  const others = sortByQuality(pool.filter((b) => b.city !== current.city));
  const seen = new Set<string>([current.name.toLowerCase()]);
  const out: Business[] = [];
  for (const b of [...sameCity, ...others]) {
    const key = b.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(b);
    if (out.length === limit) break;
  }
  return out;
}

/** Parse the comma-separated Services field into display chips. */
export function serviceChips(b: Business, max = 8): string[] {
  if (!b.services) return [];
  return b.services
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 60)
    .slice(0, max);
}
