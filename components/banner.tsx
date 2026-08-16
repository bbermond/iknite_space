import { CtaButton } from "@/components/cta";
import { BrandBlocks } from "@/components/brand-blocks";
import { PlusCorners } from "@/components/section";

/**
 * Colourful bands — the one place the brand gradient runs full width.
 *
 * Banners look IDENTICAL in both tracks. They get there by re-pointing
 * paper/ink to the fixed `--color-banner-*` tokens (see `.banner` in
 * globals.css), which means every component nested inside one — buttons,
 * hairlines, dotted leaders, micro labels — resolves against the band
 * instead of the page and needs no banner-specific styling of its own.
 *
 * Use sparingly: they are the loudest surface on the site. One per page,
 * two at most on the home page.
 */

export type BannerTone = "gradient" | "violet" | "spectrum";

export function Banner({
  tone = "gradient",
  children,
  padded = true,
  className = "",
}: {
  tone?: BannerTone;
  children: React.ReactNode;
  /** false = edge-to-edge content (a ticker, a logo strip). */
  padded?: boolean;
  className?: string;
}) {
  return (
    <section className={`banner banner-${tone} border-y hairline-strong ${className}`}>
      <BrandBlocks tone={tone === "gradient" ? "gradient" : "dark"} />
      {padded ? (
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 py-14 sm:py-20">
          {children}
        </div>
      ) : (
        <div className="relative">{children}</div>
      )}
    </section>
  );
}

/**
 * The standard band: eyebrow, statement, optional supporting line and
 * call to action. `ghost` CTAs invert cleanly against every tone, so the
 * button needs no per-tone variant.
 */
export function StatementBanner({
  eyebrow,
  headline,
  body,
  cta,
  tone = "gradient",
  facts,
}: {
  eyebrow?: string;
  headline: React.ReactNode;
  body?: React.ReactNode;
  cta?: { href: string; label: string };
  tone?: BannerTone;
  /** Optional dotted-leader rows down the right-hand side. */
  facts?: readonly { k: string; v: string }[];
}) {
  return (
    <Banner tone={tone}>
      <div className={facts ? "grid md:grid-cols-12 gap-10 items-center" : ""}>
        <div className={facts ? "md:col-span-7" : "max-w-[52ch]"}>
          {eyebrow && <p className="micro mb-4 opacity-80">{eyebrow}</p>}
          <h2 className="text-2xl sm:text-4xl font-medium leading-tight tracking-tight">
            {headline}
          </h2>
          {body && <p className="mt-5 text-[14px] text-ink-soft max-w-[52ch]">{body}</p>}
          {cta && (
            <div className="mt-8">
              <CtaButton href={cta.href} variant="ghost">
                {cta.label}
              </CtaButton>
            </div>
          )}
        </div>

        {facts && (
          <dl className="md:col-span-5 relative border hairline-strong p-6 sm:p-7 space-y-3">
            <PlusCorners />
            {facts.map((fact) => (
              <div key={fact.k} className="leader text-[13px]">
                <dt className="micro opacity-80">{fact.k}</dt>
                <dd className="font-medium">{fact.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Banner>
  );
}
