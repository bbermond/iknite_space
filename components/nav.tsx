"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, primaryCta } from "@/content/site";
import { Wordmark } from "@/components/wordmark";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const cta = primaryCta();

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-10 flex items-center justify-between h-14">
        <Link href="/" className="no-underline" aria-label="Iknite Space — home">
          <Wordmark />
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`micro no-underline transition-colors ${
                  active
                    ? "text-ember underline underline-offset-8 decoration-2"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={cta.href}
            className="micro no-underline border border-ink bg-ink text-paper px-4 py-2 ember-hover"
          >
            {cta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden micro border hairline-strong px-3 py-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="md:hidden border-t hairline bg-paper"
      >
        <ul>
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href} className="border-b hairline">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block px-5 py-4 micro no-underline ${
                    active ? "text-ember" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-4 micro no-underline bg-ink text-paper"
            >
              {cta.label} →
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
