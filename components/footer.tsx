import Link from "next/link";
import { site, footerGroups, primaryCta } from "@/content/site";
import { Wordmark } from "@/components/wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="wash-ink text-paper mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-2 md:col-span-4 space-y-4">
            <Wordmark inverted />
            <p className="text-paper/70 text-[13px] max-w-[36ch]">
              The South Bay&rsquo;s curated guide to modern wellness — every
              clinic researched, rated, and organized so you can choose with
              confidence.
            </p>
            <p className="micro text-moss">{site.location}</p>
            <Link
              href={primaryCta.href}
              className="inline-block micro no-underline border border-paper/40 px-4 py-2 text-paper hover:bg-fern-bright hover:border-fern-bright transition-colors"
            >
              {primaryCta.label} →
            </Link>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} className="md:col-span-2" aria-label={group.title}>
              <p className="micro text-paper/50 mb-3">{group.title}</p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-paper/80 hover:text-paper no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-paper/15 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 micro text-paper/50">
          <span>
            © {year} {site.name}. Curated in the South Bay.
          </span>
          <span className="flex gap-5">
            <Link href="/privacy" className="no-underline text-paper/50 hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms" className="no-underline text-paper/50 hover:text-paper">
              Terms
            </Link>
            <Link href="/admin" className="no-underline text-paper/35 hover:text-paper">
              Admin
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
