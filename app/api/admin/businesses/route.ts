import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin";
import { airtableConfigured, createRecord } from "@/lib/airtable";
import {
  getAllBusinesses,
  invalidateBusinessCache,
  fromAirtableFields,
} from "@/lib/businesses";
import { toAirtableFields } from "@/lib/admin-mapping";

function refreshSite() {
  invalidateBusinessCache();
  revalidatePath("/", "layout");
}

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const businesses = await getAllBusinesses();
  return Response.json({
    configured: airtableConfigured(),
    total: businesses.length,
    businesses: businesses.map((b) => ({
      airtableId: b.airtableId,
      slug: b.slug,
      name: b.name,
      category: b.category,
      city: b.city,
      zone: b.zone,
      tier: b.tier,
      googleRating: b.googleRating,
      googleReviews: b.googleReviews,
      featured: b.featured,
      published: b.published,
      hasImages: b.images.length > 0,
    })),
  });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!airtableConfigured()) {
    return Response.json(
      { error: "Set AIRTABLE_API_KEY to enable writes — the site is currently serving the bundled data snapshot." },
      { status: 501 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body.name !== "string" || !body.name.trim()) {
    return Response.json({ error: "A business name is required" }, { status: 400 });
  }

  try {
    const record = await createRecord(toAirtableFields(body));
    refreshSite();
    return Response.json({ business: fromAirtableFields(record.id, record.fields) }, { status: 201 });
  } catch (err) {
    console.error("[admin] create failed:", err);
    return Response.json({ error: "Airtable rejected the create — check field values." }, { status: 502 });
  }
}
