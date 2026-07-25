import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin";
import {
  airtableConfigured,
  getRecord,
  updateRecord,
  deleteRecord,
} from "@/lib/airtable";
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

const writesDisabled = () =>
  Response.json(
    { error: "Set AIRTABLE_API_KEY to enable writes — the site is currently serving the bundled data snapshot." },
    { status: 501 }
  );

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  if (airtableConfigured()) {
    try {
      const record = await getRecord(id);
      return Response.json({ business: fromAirtableFields(record.id, record.fields) });
    } catch {
      return Response.json({ error: "Record not found" }, { status: 404 });
    }
  }

  const b = (await getAllBusinesses()).find((x) => x.airtableId === id);
  if (!b) return Response.json({ error: "Record not found" }, { status: 404 });
  return Response.json({ business: b });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!airtableConfigured()) return writesDisabled();
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const record = await updateRecord(id, toAirtableFields(body));
    refreshSite();
    return Response.json({ business: fromAirtableFields(record.id, record.fields) });
  } catch (err) {
    console.error("[admin] update failed:", err);
    return Response.json({ error: "Airtable rejected the update — check field values." }, { status: 502 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!airtableConfigured()) return writesDisabled();
  const { id } = await params;

  try {
    await deleteRecord(id);
    refreshSite();
    return Response.json({ deleted: true });
  } catch (err) {
    console.error("[admin] delete failed:", err);
    return Response.json({ error: "Airtable rejected the delete." }, { status: 502 });
  }
}
