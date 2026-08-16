/**
 * Partner organisations shown in the logo strip.
 *
 * Deliberately name-only. The site publishes no descriptor, tagline, or
 * relationship claim for a partner unless it has been confirmed — see
 * docs/PENDING_APPROVAL.md. Add `href` once a URL is verified and the
 * logo becomes a link; leave it null and it renders as plain text.
 *
 * ── Adding a logo ────────────────────────────────────────────────
 * Drop the file at `public/media/partners/<slug>.svg` (or .png/.webp).
 * It is picked up on the next build — nothing here needs to change.
 * Until then the slug renders as a typographic placeholder in the site's
 * own design language, so the strip never looks broken.
 *
 * `onDark` decides how the mark survives the design track's dark
 * surface:
 *   "plate"  (default) sits the logo on a small light panel — always
 *            safe, and the only correct option for full-colour marks
 *   "invert" CSS-inverts a single-colour black mark to white
 *   "asset"  uses `<slug>-inverted.svg`, a supplied light-on-dark export
 *            — the best-looking option when one exists
 */

export type PartnerOnDark = "plate" | "invert" | "asset";

export type Partner = {
  slug: string;
  name: string;
  href: string | null;
  onDark: PartnerOnDark;
};

export const partners: Partner[] = [
  { slug: "iknite-studio", name: "Iknite Studio", href: null, onDark: "plate" },
  { slug: "mountain-hub", name: "Mountain Hub", href: null, onDark: "plate" },
  { slug: "moulingo", name: "Moulingo", href: null, onDark: "plate" },
  { slug: "cimfest", name: "CimFest", href: null, onDark: "plate" },
];
