"use client";

import { useEffect, useMemo, useState } from "react";
import { categories } from "@/lib/taxonomy";

/**
 * The FindWellness CMS: search, filter, feature, publish, edit, create,
 * and delete businesses. Reads and writes go through /api/admin/*, which
 * talks to Airtable — the site's source of truth.
 */

type Row = {
  airtableId: string;
  slug: string;
  name: string;
  category: string | null;
  city: string | null;
  zone: string | null;
  tier: string | null;
  googleRating: number | null;
  googleReviews: number | null;
  featured: boolean;
  published: boolean;
  hasImages: boolean;
};

type FullBusiness = Row & {
  address: string | null;
  phone: string | null;
  website: string | null;
  mapsUrl: string | null;
  yelpUrl: string | null;
  yelpRating: number | null;
  yelpReviews: number | null;
  quotes: string[];
  copy: string | null;
  services: string | null;
  images: string[];
  pricing: string | null;
  notes: string | null;
};

const ZONES = ["Core Zone", "West / Premium Zone", "South Corridor", "Secondary Pull Zone"];
const TIERS = [
  "Tier 1 — Immediate Competitor",
  "Tier 2 — Important Category",
  "Tier 3 — Local / Niche",
  "Tier 4 — Watchlist",
];
const PRICING = ["Public Prices", "Consult Only", "Partial / Some Prices"];

const EMPTY: FullBusiness = {
  airtableId: "",
  slug: "",
  name: "",
  category: categories[0].airtableName,
  city: "",
  zone: null,
  tier: null,
  googleRating: null,
  googleReviews: null,
  featured: false,
  published: true,
  hasImages: false,
  address: "",
  phone: "",
  website: "",
  mapsUrl: "",
  yelpUrl: "",
  yelpRating: null,
  yelpReviews: null,
  quotes: [],
  copy: "",
  services: "",
  images: [],
  pricing: null,
  notes: "",
};

export function AdminDashboard({
  initialRows,
  configured,
}: {
  initialRows: Row[];
  configured: boolean;
}) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [flash, setFlash] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [editing, setEditing] = useState<FullBusiness | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 4500);
    return () => clearTimeout(t);
  }, [flash]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (!term ||
          r.name.toLowerCase().includes(term) ||
          (r.city ?? "").toLowerCase().includes(term)) &&
        (!category || r.category === category) &&
        (!status ||
          (status === "published" && r.published) ||
          (status === "unpublished" && !r.published) ||
          (status === "featured" && r.featured) ||
          (status === "no-rating" && r.googleRating == null))
    );
  }, [rows, q, category, status]);

  const stats = useMemo(
    () => ({
      total: rows.length,
      published: rows.filter((r) => r.published).length,
      featured: rows.filter((r) => r.featured).length,
    }),
    [rows]
  );

  async function api(path: string, init?: RequestInit): Promise<Record<string, unknown> | null> {
    try {
      const res = await fetch(path, {
        ...init,
        headers: { "Content-Type": "application/json", ...init?.headers },
      });
      const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      if (!res.ok) {
        setFlash({ kind: "error", text: String(body.error ?? `Request failed (${res.status})`) });
        return null;
      }
      return body;
    } catch {
      setFlash({ kind: "error", text: "Network error — is the server reachable?" });
      return null;
    }
  }

  async function toggle(row: Row, key: "featured" | "published") {
    setBusy(row.airtableId + key);
    const next = !row[key];
    const body = await api(`/api/admin/businesses/${row.airtableId}`, {
      method: "PATCH",
      body: JSON.stringify({ [key]: next }),
    });
    if (body) {
      setRows((rs) => rs.map((r) => (r.airtableId === row.airtableId ? { ...r, [key]: next } : r)));
      setFlash({ kind: "ok", text: `${row.name}: ${key} ${next ? "on" : "off"}.` });
    }
    setBusy(null);
  }

  async function openEdit(row: Row) {
    setBusy(row.airtableId + "edit");
    const body = await api(`/api/admin/businesses/${row.airtableId}`);
    setBusy(null);
    if (body?.business) {
      setIsNew(false);
      setEditing(body.business as FullBusiness);
    }
  }

  async function remove(row: Row) {
    if (!window.confirm(`Delete “${row.name}” from Airtable? This cannot be undone.`)) return;
    setBusy(row.airtableId + "delete");
    const body = await api(`/api/admin/businesses/${row.airtableId}`, { method: "DELETE" });
    if (body) {
      setRows((rs) => rs.filter((r) => r.airtableId !== row.airtableId));
      setFlash({ kind: "ok", text: `${row.name} deleted.` });
    }
    setBusy(null);
  }

  async function save(form: FullBusiness) {
    setBusy("save");
    const payload = {
      name: form.name,
      category: form.category,
      city: form.city,
      zone: form.zone,
      tier: form.tier,
      pricing: form.pricing,
      address: form.address,
      phone: form.phone,
      website: form.website,
      mapsUrl: form.mapsUrl,
      yelpUrl: form.yelpUrl,
      googleRating: form.googleRating,
      googleReviews: form.googleReviews,
      yelpRating: form.yelpRating,
      yelpReviews: form.yelpReviews,
      copy: form.copy,
      services: form.services,
      notes: form.notes,
      quotes: [0, 1, 2, 3, 4].map((i) => form.quotes[i] ?? ""),
      images: [0, 1, 2, 3, 4].map((i) => form.images[i] ?? ""),
      featured: form.featured,
      published: form.published,
    };
    const body = isNew
      ? await api("/api/admin/businesses", { method: "POST", body: JSON.stringify(payload) })
      : await api(`/api/admin/businesses/${form.airtableId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
    setBusy(null);
    if (!body?.business) return;

    const saved = body.business as FullBusiness;
    const row: Row = {
      airtableId: saved.airtableId,
      slug: saved.slug,
      name: saved.name,
      category: saved.category,
      city: saved.city,
      zone: saved.zone,
      tier: saved.tier,
      googleRating: saved.googleRating,
      googleReviews: saved.googleReviews,
      featured: saved.featured,
      published: saved.published,
      hasImages: (saved.images ?? []).length > 0,
    };
    setRows((rs) =>
      isNew ? [row, ...rs] : rs.map((r) => (r.airtableId === row.airtableId ? row : r))
    );
    setFlash({ kind: "ok", text: `${saved.name} saved.` });
    setEditing(null);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-10 py-10">
      {!configured && (
        <div className="border border-gold-ink bg-paper-2 px-5 py-4 text-[13px] mb-8">
          <strong>Read-only mode.</strong> The site is serving the bundled data
          snapshot. Set <code className="micro">AIRTABLE_API_KEY</code> on
          Railway to enable create, edit, feature, publish, and delete.
        </div>
      )}

      {/* Stats + actions */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <dl className="flex gap-6">
          {[
            { label: "Listings", value: stats.total },
            { label: "Published", value: stats.published },
            { label: "Featured", value: stats.featured },
          ].map((s) => (
            <div key={s.label} className="border hairline px-4 py-2.5">
              <dd className="display text-2xl text-fern tabular">{s.value}</dd>
              <dt className="micro text-ink-soft">{s.label}</dt>
            </div>
          ))}
        </dl>
        <div className="ml-auto flex gap-3">
          <a
            href="https://airtable.com/appxKiQHVazWNp4yq"
            target="_blank"
            rel="noopener noreferrer"
            className="micro no-underline border hairline-strong px-4 py-2.5 invert-hover"
          >
            Open Airtable ↗
          </a>
          <button
            type="button"
            onClick={() => {
              setIsNew(true);
              setEditing({ ...EMPTY });
            }}
            className="micro bg-fern text-paper border border-fern px-4 py-2.5 invert-hover"
          >
            + Add business
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or city…"
          aria-label="Search businesses"
          className="field sm:max-w-xs"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className="field !w-auto"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.airtableName}>
              {c.shortName}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          className="field !w-auto"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="unpublished">Hidden</option>
          <option value="featured">Featured</option>
          <option value="no-rating">Missing rating</option>
        </select>
        <span className="micro text-ink-soft self-center sm:ml-auto tabular">
          {filtered.length} shown
        </span>
      </div>

      {flash && (
        <p
          role="status"
          className={`px-4 py-2.5 text-[13px] mb-4 border ${
            flash.kind === "ok" ? "border-fern text-fern" : "border-clay-ink text-clay"
          }`}
        >
          {flash.text}
        </p>
      )}

      {/* Table */}
      <div className="border hairline overflow-x-auto">
        <table className="w-full text-[13px] min-w-[860px]">
          <thead>
            <tr className="text-left border-b hairline-strong">
              <th className="micro text-ink-soft font-normal px-4 py-3">Business</th>
              <th className="micro text-ink-soft font-normal px-4 py-3">Category</th>
              <th className="micro text-ink-soft font-normal px-4 py-3">City</th>
              <th className="micro text-ink-soft font-normal px-4 py-3">Rating</th>
              <th className="micro text-ink-soft font-normal px-4 py-3">Featured</th>
              <th className="micro text-ink-soft font-normal px-4 py-3">Published</th>
              <th className="micro text-ink-soft font-normal px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color-mix(in_srgb,var(--color-ink)_10%,transparent)]">
            {filtered.slice(0, 200).map((r) => (
              <tr key={r.airtableId} className={r.published ? "" : "opacity-50"}>
                <td className="px-4 py-3">
                  <span className="font-medium">{r.name}</span>
                  <a
                    href={`/business/${r.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="micro text-fern no-underline ml-2"
                  >
                    view ↗
                  </a>
                </td>
                <td className="px-4 py-3 text-ink-soft">{r.category ?? "—"}</td>
                <td className="px-4 py-3 text-ink-soft">{r.city ?? "—"}</td>
                <td className="px-4 py-3 tabular">
                  {r.googleRating != null ? `${r.googleRating}★ (${r.googleReviews ?? 0})` : "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggle(r, "featured")}
                    disabled={busy === r.airtableId + "featured"}
                    aria-pressed={r.featured}
                    aria-label={`${r.featured ? "Unfeature" : "Feature"} ${r.name}`}
                    className={`micro border px-2.5 py-1.5 ${
                      r.featured
                        ? "bg-ink text-paper border-ink"
                        : "hairline-strong text-ink-soft hover:text-ink"
                    }`}
                  >
                    {r.featured ? "★ On" : "☆ Off"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggle(r, "published")}
                    disabled={busy === r.airtableId + "published"}
                    aria-pressed={r.published}
                    aria-label={`${r.published ? "Hide" : "Publish"} ${r.name}`}
                    className={`micro border px-2.5 py-1.5 ${
                      r.published
                        ? "bg-fern text-paper border-fern"
                        : "hairline-strong text-ink-soft hover:text-ink"
                    }`}
                  >
                    {r.published ? "Live" : "Hidden"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => openEdit(r)}
                    disabled={busy === r.airtableId + "edit"}
                    className="micro border hairline-strong px-2.5 py-1.5 invert-hover mr-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(r)}
                    disabled={busy === r.airtableId + "delete"}
                    className="micro border border-clay-ink text-clay px-2.5 py-1.5 hover:bg-clay-ink hover:text-paper transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 200 && (
          <p className="micro text-ink-soft px-4 py-3 border-t hairline">
            Showing the first 200 — narrow the search to see the rest.
          </p>
        )}
      </div>

      {/* Edit drawer */}
      {editing && (
        <div
          className="fixed inset-0 z-[70] bg-ink/50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={isNew ? "Add business" : `Edit ${editing.name}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditing(null);
          }}
        >
          <div className="w-full max-w-2xl bg-paper h-full overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="display text-2xl">{isNew ? "Add business" : editing.name}</h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="micro border hairline-strong px-3 py-2 invert-hover"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                save(editing);
              }}
              className="space-y-5"
            >
              <Field label="Business name" required>
                <input
                  className="field"
                  required
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Category">
                  <select
                    className="field"
                    value={editing.category ?? ""}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value || null })}
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.airtableName}>
                        {c.airtableName}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="City">
                  <input
                    className="field"
                    value={editing.city ?? ""}
                    onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                  />
                </Field>
                <Field label="Zone">
                  <select
                    className="field"
                    value={editing.zone ?? ""}
                    onChange={(e) => setEditing({ ...editing, zone: e.target.value || null })}
                  >
                    <option value="">—</option>
                    {ZONES.map((z) => (
                      <option key={z}>{z}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Priority tier">
                  <select
                    className="field"
                    value={editing.tier ?? ""}
                    onChange={(e) => setEditing({ ...editing, tier: e.target.value || null })}
                  >
                    <option value="">—</option>
                    {TIERS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Pricing visibility">
                  <select
                    className="field"
                    value={editing.pricing ?? ""}
                    onChange={(e) => setEditing({ ...editing, pricing: e.target.value || null })}
                  >
                    <option value="">—</option>
                    {PRICING.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Phone">
                  <input
                    className="field"
                    value={editing.phone ?? ""}
                    onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Address">
                <input
                  className="field"
                  value={editing.address ?? ""}
                  onChange={(e) => setEditing({ ...editing, address: e.target.value })}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Website">
                  <input
                    className="field"
                    type="url"
                    value={editing.website ?? ""}
                    onChange={(e) => setEditing({ ...editing, website: e.target.value })}
                  />
                </Field>
                <Field label="Google Maps link">
                  <input
                    className="field"
                    type="url"
                    value={editing.mapsUrl ?? ""}
                    onChange={(e) => setEditing({ ...editing, mapsUrl: e.target.value })}
                  />
                </Field>
                <Field label="Yelp link">
                  <input
                    className="field"
                    type="url"
                    value={editing.yelpUrl ?? ""}
                    onChange={(e) => setEditing({ ...editing, yelpUrl: e.target.value })}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Field label="Google ★">
                  <input
                    className="field"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editing.googleRating ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        googleRating: e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                  />
                </Field>
                <Field label="Google #">
                  <input
                    className="field"
                    type="number"
                    min="0"
                    value={editing.googleReviews ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        googleReviews: e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                  />
                </Field>
                <Field label="Yelp ★">
                  <input
                    className="field"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editing.yelpRating ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        yelpRating: e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                  />
                </Field>
                <Field label="Yelp #">
                  <input
                    className="field"
                    type="number"
                    min="0"
                    value={editing.yelpReviews ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        yelpReviews: e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                  />
                </Field>
              </div>

              <Field label="Services (comma-separated)">
                <textarea
                  className="field"
                  rows={2}
                  value={editing.services ?? ""}
                  onChange={(e) => setEditing({ ...editing, services: e.target.value })}
                />
              </Field>

              <Field label="Research brief (public description)">
                <textarea
                  className="field"
                  rows={5}
                  value={editing.copy ?? ""}
                  onChange={(e) => setEditing({ ...editing, copy: e.target.value })}
                />
              </Field>

              <Field label="Review quotes (up to 5)">
                <div className="space-y-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <textarea
                      key={i}
                      className="field"
                      rows={2}
                      placeholder={`Quote ${i + 1}`}
                      aria-label={`Review quote ${i + 1}`}
                      value={editing.quotes[i] ?? ""}
                      onChange={(e) => {
                        const quotes = [...editing.quotes];
                        quotes[i] = e.target.value;
                        setEditing({ ...editing, quotes });
                      }}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Image URLs (up to 5)">
                <div className="space-y-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <input
                      key={i}
                      className="field"
                      type="url"
                      placeholder={`https://… image ${i + 1}`}
                      aria-label={`Image URL ${i + 1}`}
                      value={editing.images[i] ?? ""}
                      onChange={(e) => {
                        const images = [...editing.images];
                        images[i] = e.target.value;
                        setEditing({ ...editing, images });
                      }}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Internal notes (never shown publicly)">
                <textarea
                  className="field"
                  rows={2}
                  value={editing.notes ?? ""}
                  onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                />
              </Field>

              <div className="flex gap-6 border-t hairline pt-5">
                <label className="flex items-center gap-2 text-[14px]">
                  <input
                    type="checkbox"
                    checked={editing.published}
                    onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  />
                  Published
                </label>
                <label className="flex items-center gap-2 text-[14px]">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  />
                  Featured
                </label>
                <button
                  type="submit"
                  disabled={busy === "save" || !configured}
                  className="ml-auto micro bg-fern text-paper border border-fern px-6 py-3 invert-hover disabled:opacity-50"
                >
                  {busy === "save" ? "Saving…" : isNew ? "Create" : "Save changes"}
                </button>
              </div>
              {!configured && (
                <p className="micro text-clay">
                  Read-only mode — set AIRTABLE_API_KEY to save changes.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="micro text-ink-soft block mb-1.5">
        {label}
        {required && <span className="text-clay ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
