import type { Metadata } from "next";
import Link from "next/link";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "404",
  description: "This page doesn't exist.",
  robots: { index: false, follow: false },
};

const destinations = [
  { href: "/", label: "Home", note: "Start from the top" },
  { href: "/accelerator", label: "Accelerator", note: "The six-month program" },
  { href: "/projects", label: "Projects", note: "Proof of work" },
  { href: "/partner", label: "Partner", note: "Mentor, hire, sponsor" },
  { href: "/apply", label: "Apply", note: "Your move" },
] as const;

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
      <div className="absolute inset-0 wash-ember" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <Reveal>
          <p className="micro inline-flex items-center gap-2 border hairline-strong bg-paper px-3 py-2">
            <span className="inline-block w-2 h-2 bg-ember animate-blink" aria-hidden="true" />
            Error — route not found
          </p>
        </Reveal>

        <h1 className="mt-6 text-[6rem] sm:text-[10rem] lg:text-[12rem] font-medium leading-none tracking-tight tabular">
          4<span className="text-ember">0</span>4
        </h1>

        <p className="mt-6 max-w-[46ch] text-[15px] text-ink-soft">
          <Decode text="This page doesn't exist — these do:" />
        </p>

        <Reveal delay={200}>
          <ul className="mt-8 max-w-2xl border hairline divide-y [&>li]:hairline bg-paper/80">
            {destinations.map((d, i) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="group flex items-baseline gap-4 px-5 py-4 no-underline hover:bg-paper-2 transition-colors"
                >
                  <span className="micro text-ember tabular">
                    [0{i + 1}]
                  </span>
                  <span className="text-[15px] font-medium group-hover:text-ember transition-colors">
                    {d.label}
                  </span>
                  <span className="micro text-ink-soft hidden sm:inline">{d.note}</span>
                  <span
                    className="ml-auto transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
