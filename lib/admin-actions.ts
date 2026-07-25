"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminConfigured, sessionToken } from "@/lib/admin";

/** Constant-time equality via fixed-length digests. */
function passwordMatches(candidate: string, expected: string): boolean {
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function loginAdmin(formData: FormData) {
  if (!adminConfigured()) {
    redirect("/admin/login?error=unconfigured");
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    !passwordMatches(password, process.env.ADMIN_PASSWORD as string)
  ) {
    redirect("/admin/login?error=invalid");
  }
  const token = sessionToken();
  if (!token) redirect("/admin/login?error=unconfigured");

  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
