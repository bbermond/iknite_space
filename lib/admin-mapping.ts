import "server-only";

import { FIELDS } from "@/lib/airtable";

/**
 * Convert a partial Business-shaped payload from the admin UI into Airtable
 * field values. Unknown keys are ignored; empty strings clear a field.
 */
export function toAirtableFields(body: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  // null and "" both mean "clear this field" — the dashboard's selects send
  // null for the em-dash empty option.
  const text = (v: unknown) =>
    v === null ? "" : typeof v === "string" ? v.trim() : undefined;
  const numeric = (v: unknown) => {
    if (v === "" || v === null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const map: [string, string, (v: unknown) => unknown][] = [
    ["name", FIELDS.name, text],
    ["zone", FIELDS.zone, text],
    ["category", FIELDS.category, text],
    ["city", FIELDS.city, text],
    ["address", FIELDS.address, text],
    ["phone", FIELDS.phone, text],
    ["website", FIELDS.website, text],
    ["mapsUrl", FIELDS.mapsUrl, text],
    ["yelpUrl", FIELDS.yelpUrl, text],
    ["googleRating", FIELDS.googleRating, numeric],
    ["googleReviews", FIELDS.googleReviews, numeric],
    ["yelpRating", FIELDS.yelpRating, numeric],
    ["yelpReviews", FIELDS.yelpReviews, numeric],
    ["copy", FIELDS.copy, text],
    ["services", FIELDS.services, text],
    ["tier", FIELDS.tier, text],
    ["pricing", FIELDS.pricing, text],
    ["notes", FIELDS.notes, text],
  ];

  for (const [key, field, coerce] of map) {
    if (key in body) {
      const v = coerce(body[key]);
      if (v !== undefined) out[field] = v === "" ? null : v;
    }
  }

  if ("featured" in body) out[FIELDS.featured] = body.featured === true;
  if ("published" in body) out[FIELDS.published] = body.published === true;

  if (Array.isArray(body.quotes)) {
    const q = body.quotes as unknown[];
    const fields = [FIELDS.quote1, FIELDS.quote2, FIELDS.quote3, FIELDS.quote4, FIELDS.quote5];
    fields.forEach((f, i) => {
      const v = text(q[i]);
      out[f] = v ? v : null;
    });
  }

  if (Array.isArray(body.images)) {
    const imgs = body.images as unknown[];
    const fields = [FIELDS.image1, FIELDS.image2, FIELDS.image3, FIELDS.image4, FIELDS.image5];
    fields.forEach((f, i) => {
      const v = text(imgs[i]);
      out[f] = v ? v : null;
    });
  }

  return out;
}
