import { NextResponse, type NextRequest } from "next/server";

/**
 * Host-based serving for the hire subdomain.
 *
 * When a request arrives on `hire.*` (hire.iknite.space once DNS and the
 * Railway custom domain exist — see docs/MEDIA_AND_MIGRATION.md), the
 * root serves the hire page while the URL bar keeps the subdomain root.
 * `/hire` on that host redirects to `/` so the page has one address per
 * host. Every other path passes through and serves the main site.
 *
 * Note: in this Next.js version the old `middleware` file convention is
 * deprecated — this root-level `proxy.ts` is its replacement.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (!host.startsWith("hire.")) return NextResponse.next();

  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = "/hire";
    return NextResponse.rewrite(url);
  }
  if (url.pathname === "/hire") {
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

/** Only the two paths above matter; skip assets and everything else. */
export const config = {
  matcher: ["/", "/hire"],
};
