/**
 * Tracks — the two lenses the site can be read through.
 *
 *   code   `</>`  the blueprint: paper, ink hairlines, engineering copy
 *   design `○◺`   the same programme rendered in full: dark surface,
 *                 brand gradients, product-design copy
 *
 * The active track lives in one place: a `data-track` attribute on
 * <html>. Everything else follows from it —
 *
 *   · the palette, because `[data-track="design"]` re-points the very
 *     same paper/ink tokens the whole design system already reads from
 *     (see app/globals.css)
 *   · the copy, because `<Track>` renders both variants and CSS removes
 *     the inactive one from the box tree
 *
 * Nothing is fetched, and no page becomes dynamic: both lenses ship in
 * the static HTML and the switch is a single attribute write.
 */

export const TRACKS = ["code", "design"] as const;

export type Track = (typeof TRACKS)[number];

export const DEFAULT_TRACK: Track = "code";

/** localStorage key. Also hard-coded into TRACK_INIT_SCRIPT below. */
export const TRACK_STORAGE_KEY = "iknite-track";

export function isTrack(value: unknown): value is Track {
  return value === "code" || value === "design";
}

/**
 * Runs synchronously in <head> while the browser parses the document —
 * before the first paint, and long before React hydrates. Without it a
 * returning visitor on the design track would see a full paper-white
 * page flash to dark. Wrapped in try/catch because localStorage throws
 * outright in some privacy modes.
 *
 * Kept as a hand-minified string on purpose: it is inlined into every
 * page and must not depend on the bundle having loaded.
 */
export const TRACK_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  TRACK_STORAGE_KEY
)});if(t!=="code"&&t!=="design")t=${JSON.stringify(
  DEFAULT_TRACK
)};document.documentElement.setAttribute("data-track",t)}catch(e){}})()`;

/**
 * Re-syncs the switch buttons' `aria-pressed` after they have parsed.
 * The <head> script cannot do this — the buttons do not exist yet — so
 * the switcher renders this immediately after itself. Visual state is
 * pure CSS and needs no help; this is only for assistive tech reading
 * the page before hydration.
 */
export const TRACK_BUTTON_SYNC_SCRIPT = `{try{var t=document.documentElement.getAttribute("data-track")||${JSON.stringify(
  DEFAULT_TRACK
)},b=document.querySelectorAll("[data-track-btn]");for(var i=0;i<b.length;i++){b[i].setAttribute("aria-pressed",b[i].getAttribute("data-mode")===t?"true":"false")}}catch(e){}}`;
