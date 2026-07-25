import "server-only";

/**
 * Minimal Airtable REST client for the Wellness Businesses table.
 *
 * Requires two env vars to go live (both optional for the public site,
 * which falls back to the bundled snapshot in data/businesses.json):
 *   AIRTABLE_API_KEY  — a personal access token with data.records:read/write
 *                       scoped to the FindWellness base
 *   AIRTABLE_BASE_ID  — defaults to the FindWellness South Bay base
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID || "appxKiQHVazWNp4yq";
const TABLE = "Wellness Businesses";
const API = "https://api.airtable.com/v0";

export function airtableConfigured() {
  return Boolean(process.env.AIRTABLE_API_KEY);
}

/** Airtable field names — the single mapping between CMS and site. */
export const FIELDS = {
  name: "Business Name",
  zone: "Zone",
  category: "Category",
  city: "City",
  address: "Address",
  phone: "Phone",
  website: "Website",
  mapsUrl: "Google Maps Link",
  yelpUrl: "Yelp Link",
  googleRating: "Google Rating",
  googleReviews: "Google Review Count",
  yelpRating: "Yelp Rating",
  yelpReviews: "Yelp Review Count",
  quote1: "Review Quote 1",
  quote2: "Review Quote 2",
  quote3: "Review Quote 3",
  quote4: "Review Quote 4",
  quote5: "Review Quote 5",
  copy: "Synthesized Business Copy",
  services: "Services",
  image1: "Image URL 1",
  image2: "Image URL 2",
  image3: "Image URL 3",
  image4: "Image URL 4",
  image5: "Image URL 5",
  tier: "Priority Tier",
  threatScore: "Threat Score",
  pricing: "Pricing Visibility",
  notes: "Notes",
  featured: "Featured",
  published: "Published",
} as const;

type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: Record<string, unknown>;
};

async function request(path: string, init?: RequestInit) {
  const key = process.env.AIRTABLE_API_KEY;
  if (!key) throw new Error("AIRTABLE_API_KEY is not configured");
  const res = await fetch(`${API}/${BASE_ID}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
    signal: init?.signal ?? AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Airtable ${init?.method || "GET"} ${path} failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return res.json();
}

/** Fetch every record, following pagination. */
export async function listAllRecords(): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;
  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (offset) params.set("offset", offset);
    const page = await request(`${encodeURIComponent(TABLE)}?${params}`);
    records.push(...(page.records as AirtableRecord[]));
    offset = page.offset;
  } while (offset);
  return records;
}

export async function getRecord(id: string): Promise<AirtableRecord> {
  return request(`${encodeURIComponent(TABLE)}/${encodeURIComponent(id)}`);
}

export async function createRecord(fields: Record<string, unknown>): Promise<AirtableRecord> {
  const body = await request(encodeURIComponent(TABLE), {
    method: "POST",
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });
  return body.records[0];
}

export async function updateRecord(id: string, fields: Record<string, unknown>): Promise<AirtableRecord> {
  const body = await request(encodeURIComponent(TABLE), {
    method: "PATCH",
    body: JSON.stringify({ records: [{ id, fields }], typecast: true }),
  });
  return body.records[0];
}

export async function deleteRecord(id: string): Promise<{ id: string; deleted: boolean }> {
  const params = new URLSearchParams({ "records[]": id });
  const body = await request(`${encodeURIComponent(TABLE)}?${params}`, { method: "DELETE" });
  return body.records[0];
}
