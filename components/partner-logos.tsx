/* eslint-disable @next/next/no-img-element */

import fs from "node:fs";
import path from "node:path";
import { partners, type Partner } from "@/content/partners";

/**
 * The partner strip.
 *
 * Resolves `public/media/partners/<slug>.(svg|png|webp|jpg)` at build
 * time — same drop-in convention as MediaSlot and the mentor headshots.
 * A partner without a file renders as a typographic placeholder built
 * from the site's own tokens, so it inverts with the track and the strip
 * never shows a broken image or an empty cell.
 *
 * Plain <img>, not next/image: these are small vectors that must not go
 * through the optimizer (SVG would need `dangerouslyAllowSVG`), and the
 * cell reserves its own box, so there is no layout shift.
 */

const EXTS = [".svg", ".png", ".webp", ".jpg"];

function resolveLogo(slug: string): string | null {
  for (const ext of EXTS) {
    const rel = `/media/partners/${slug}${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

function Logo({ src, name, className = "" }: { src: string; name: string; className?: string }) {
  return (
    <img src={src} alt={name} className={`max-h-10 w-auto object-contain ${className}`} />
  );
}

function PartnerMark({ partner }: { partner: Partner }) {
  const src = resolveLogo(partner.slug);

  // No file dropped in yet — render the name as a deliberate wordmark
  // rather than a grey box. Uses the ink token, so it follows the track.
  if (!src) {
    return (
      <span className="micro text-ink-soft tracking-[0.22em] text-center leading-tight">
        {partner.name}
      </span>
    );
  }

  if (partner.onDark === "asset") {
    const inverted = resolveLogo(`${partner.slug}-inverted`);
    if (inverted) {
      return (
        <>
          <span data-when="code">
            <Logo src={src} name={partner.name} />
          </span>
          <span data-when="design">
            <Logo src={inverted} name={partner.name} />
          </span>
        </>
      );
    }
    // Declared "asset" but the export is missing — fall through to the
    // always-safe plate rather than rendering an unreadable mark.
  }

  return (
    <Logo
      src={src}
      name={partner.name}
      className={partner.onDark === "invert" ? "partner-invert" : "partner-plate"}
    />
  );
}

function PartnerCell({ partner }: { partner: Partner }) {
  const inner = (
    <span className="flex items-center justify-center h-full w-full p-6 min-h-24 partner-mark">
      <PartnerMark partner={partner} />
    </span>
  );

  return (
    <li className="bg-paper flex">
      {partner.href ? (
        <a
          href={partner.href}
          rel="noopener noreferrer"
          target="_blank"
          className="flex-1 no-underline"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

export function PartnerLogos({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border hairline ${className}`}
    >
      {partners.map((partner) => (
        <PartnerCell key={partner.slug} partner={partner} />
      ))}
    </ul>
  );
}
