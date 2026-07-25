import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Minimal single-operator auth for the /admin CMS.
 *
 * Set ADMIN_PASSWORD on Railway to enable login. The session cookie stores
 * a hash derived from the password, so rotating the password invalidates
 * every existing session.
 */

export const ADMIN_COOKIE = "fw_admin";

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`findwellness-admin:${password}`).digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  // Read cookies before any env short-circuit so Next always treats callers
  // as request-time dynamic — otherwise /admin can prerender as a redirect.
  const store = await cookies();
  const expected = sessionToken();
  if (!expected) return false;
  const got = store.get(ADMIN_COOKIE)?.value;
  if (!got || got.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}
