import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { airtableConfigured } from "@/lib/airtable";
import { getAllBusinesses } from "@/lib/businesses";
import { logoutAdmin } from "@/lib/admin-actions";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin — business CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const businesses = await getAllBusinesses();
  const rows = businesses.map((b) => ({
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
  }));

  return (
    <>
      <div className="border-b hairline bg-paper-2/60">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-6 flex items-center justify-between">
          <div>
            <p className="micro text-fern mb-1">FindWellness CMS</p>
            <h1 className="display text-2xl">Business directory</h1>
          </div>
          <form action={logoutAdmin}>
            <button type="submit" className="micro border hairline-strong px-4 py-2.5 invert-hover">
              Sign out
            </button>
          </form>
        </div>
      </div>
      <AdminDashboard initialRows={rows} configured={airtableConfigured()} />
    </>
  );
}
