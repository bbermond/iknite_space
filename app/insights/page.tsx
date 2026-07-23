import type { Metadata } from "next";
import Link from "next/link";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta";
import { Section } from "@/components/section";
import { cohort, primaryCta } from "@/content/site";
import { insights, type Insight } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Cohort updates and announcements from the Iknite Space accelerator in Buea — the program's public record, documented as it happens.",
};

/** Tag chip — Announcements carry the ember border. */
function tagChip(tag: Insight["tag"]) {
  return `micro inline-block border px-2 py-0.5 ${
    tag === "Announcement" ? "border-ember text-ember" : "hairline-strong text-ink-soft"
  }`;
}

export default function InsightsPage() {
  const cta = primaryCta();
  const entries = [...insights].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Reveal>
            <p className="micro inline-flex items-center gap-2 border hairline-strong bg-paper px-3 py-2">
              <span className="inline-block w-2 h-2 bg-ember" aria-hidden="true" />
              Insights
            </p>
          </Reveal>

          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight max-w-[17ch]">
            <Decode text="The program's" />
            <br />
            <Decode text="public record." />
          </h1>

          <Reveal delay={150}>
            <p className="mt-6 max-w-[54ch] text-[15px] text-ink-soft">
              Cohort selections, program milestones, and announcements —
              documented as they happen, published in the open. What we did,
              when we did it. Newest first.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The record ───────────────────────────────────────── */}
      <Section label="The record" index="01">
        <div className="border hairline divide-y [&>div]:hairline">
          {entries.map((entry, i) => (
            <Reveal key={entry.slug} delay={Math.min(i, 4) * 70}>
              <Link
                href={`/insights/${entry.slug}`}
                className="group grid gap-x-6 gap-y-2 sm:grid-cols-[8.5rem_10rem_1fr] items-start p-5 sm:p-6 no-underline hover:bg-paper-2 transition-colors"
              >
                <span className="micro tabular text-ink-soft sm:pt-1">
                  {entry.displayDate}
                </span>
                <span>
                  <span className={tagChip(entry.tag)}>{entry.tag}</span>
                </span>
                <span>
                  <span className="block text-[15px] font-medium group-hover:text-ember transition-colors">
                    {entry.title}
                  </span>
                  <span className="mt-1 block text-[13px] text-ink-soft max-w-[70ch]">
                    {entry.summary}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-5 micro text-ink-soft">
            Entries are condensed from published cohort updates.
          </p>
        </Reveal>
      </Section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-16 sm:py-20 relative overflow-hidden text-center">
          <div className="absolute inset-0 dot-grid" aria-hidden="true" />
          <div className="absolute inset-0 wash-ember" aria-hidden="true" />
          <div className="relative">
            <Reveal>
              <p className="micro text-ink-soft">
                Next cohort — {cohort.start}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">
                The next entry
                <br />
                is being written
                <span className="text-ember animate-blink" aria-hidden="true">
                  _
                </span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <CtaButton href={cta.href} variant="ember">
                  {cta.label}
                </CtaButton>
                <CtaButton href="/accelerator" variant="ghost">
                  How the program works
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
