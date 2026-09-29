import Link from "next/link";
import { footerNav, site, statusLine, primaryCta } from "@/content/site";
import { Wordmark } from "@/components/wordmark";
import { BrandBlocks } from "@/components/brand-blocks";

export function Footer() {
  const cta = primaryCta();
  const year = new Date().getFullYear();

  return (
    // `on-brand` pins paper/ink to fixed light values: this surface is
    // deep violet in BOTH tracks, so it must not follow the inversion.
    <footer className="on-brand relative overflow-hidden wash-brand text-paper mt-24">
      <BrandBlocks tone="dark" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <Wordmark inverted />
            <p className="text-paper/70 text-[13px] max-w-[38ch]">
              A selective tech talent accelerator in Buea — and the foundation
              of a wider home for talent, founders, and technology ventures in
              Cameroon.
            </p>
            <p className="micro text-ember-soft">{statusLine()}</p>
            <Link
              href={cta.href}
              className="inline-block micro no-underline border border-paper/40 px-4 py-2 text-paper hover:bg-ember hover:border-ember transition-colors"
            >
              {cta.label} →
            </Link>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <p className="micro text-paper/60 mb-3">Site</p>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-paper/80 hover:text-paper no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-[13px] text-paper/80 hover:text-paper no-underline">
                  Contact
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/sponsor"
                  className="text-[13px] text-ember-soft hover:text-paper no-underline inline-flex items-center gap-2"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-ember" aria-hidden="true" />
                  Sponsor a cohort
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="micro text-paper/60 mb-3">Reach us</p>
            <ul className="space-y-2 text-[13px] text-paper/80">
              <li>
                <a href={`mailto:${site.email}`} className="no-underline hover:text-paper">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="no-underline hover:text-paper">
                  {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
            <ul className="flex gap-5 mt-4 micro">
              <li>
                <a href={site.social.github} className="text-paper/70 hover:text-paper no-underline" rel="noopener noreferrer" target="_blank">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={site.social.linkedin} className="text-paper/70 hover:text-paper no-underline" rel="noopener noreferrer" target="_blank">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={site.social.facebook} className="text-paper/70 hover:text-paper no-underline" rel="noopener noreferrer" target="_blank">
                  Facebook ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper/15 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 micro text-paper/60">
          <span>© {year} Iknite Space. Fully owned and operated by Iknite.</span>
          <span className="flex gap-5">
            <Link href="/privacy" className="no-underline text-paper/60 hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms" className="no-underline text-paper/60 hover:text-paper">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
