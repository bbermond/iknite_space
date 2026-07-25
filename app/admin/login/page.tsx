import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin, adminConfigured } from "@/lib/admin";
import { loginAdmin } from "@/lib/admin-actions";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <p className="micro text-fern mb-3">FindWellness CMS</p>
      <h1 className="display text-3xl mb-6">Admin access</h1>

      {!adminConfigured() ? (
        <div className="border hairline p-6 text-[14px] text-ink-soft space-y-3">
          <p className="text-ink font-medium">The CMS isn&rsquo;t configured yet.</p>
          <p>
            Set the <code className="micro bg-paper-2 px-1.5 py-0.5">ADMIN_PASSWORD</code>{" "}
            environment variable on Railway (Service → Variables), redeploy, and
            this page becomes your login.
          </p>
          <p>
            To let the CMS write to Airtable, also set{" "}
            <code className="micro bg-paper-2 px-1.5 py-0.5">AIRTABLE_API_KEY</code>{" "}
            — a personal access token with read/write scope on the FindWellness
            base.
          </p>
        </div>
      ) : (
        <>
          {error === "invalid" && (
            <p role="alert" className="border border-clay-ink text-clay px-4 py-3 text-[13px] mb-4">
              That password didn&rsquo;t match. Try again.
            </p>
          )}
          <form action={loginAdmin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="micro text-ink-soft block mb-1.5">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="field"
              />
            </div>
            <button
              type="submit"
              className="micro bg-ink text-paper border border-ink px-5 py-3 fern-hover w-full"
            >
              Sign in
            </button>
          </form>
        </>
      )}
    </div>
  );
}
