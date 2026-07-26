import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta";
import { Section } from "@/components/section";
import { cohort, primaryCta } from "@/content/site";
import { getInsights, getInsight, type Insight } from "@/lib/insights";

type Props = { params: Promise<{ slug: string }> };

/**
 * Fully static: every article is prerendered at build time and unknown
 * slugs 404 — the runtime container never reads content/ from disk.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getInsights().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getInsight(slug);
  if (!entry) return { title: "Entry not found" };
  return {
    title: entry.title,
    description: entry.summary,
  };
}

/** Tag chip — Announcements carry the ember border. */
function tagChip(tag: Insight["tag"]) {
  return `micro inline-block border px-2 py-0.5 ${
    tag === "Announcement" ? "border-ember text-ember" : "hairline-strong text-ink-soft"
  }`;
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = getInsight(slug);
  if (!entry) notFound();

  const related = getInsights()
    .filter((e) => e.slug !== entry.slug)
    .slice(0, 2);

  const cta = primaryCta();
  const isCommunity = entry.tag === "Community";

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-14 pb-14 sm:pt-20 sm:pb-16">
          <Reveal>
            <Link
              href="/insights"
              className="micro inline-flex items-center gap-2 no-underline text-ink-soft hover:text-ink transition-colors"
            >
              <span aria-hidden="true">←</span>
              All insights
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-center gap-3 micro text-ink-soft">
              <span className="tabular">{entry.displayDate}</span>
              <span className="text-ember" aria-hidden="true">
                /
              </span>
              <span className={tagChip(entry.tag)}>{entry.tag}</span>
            </div>
          </Reveal>

          <h1 className="mt-5 text-3xl sm:text-5xl font-medium leading-[1.1] tracking-tight max-w-[28ch]">
            <Decode text={entry.title} />
          </h1>
        </div>
      </section>

      {/* ── Entry body (markdown-rendered at build time) ─────── */}
      <Section label={entry.tag} index="01">
        <Reveal>
          <div
            className="prose-mono"
            dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
          />
        </Reveal>
      </Section>

      {/* ── Related ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section label="Related" index="02">
          <div className="grid sm:grid-cols-2 border hairline divide-y sm:divide-y-0 sm:divide-x [&>a]:hairline">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/insights/${r.slug}`}
                className="group block p-6 no-underline hover:bg-paper-2 transition-colors"
              >
                <span className="flex flex-wrap items-center gap-2 micro text-ink-soft">
                  <span className="tabular">{r.displayDate}</span>
                  <span className="text-ember" aria-hidden="true">
                    /
                  </span>
                  <span>{r.tag}</span>
                </span>
                <span className="mt-3 block text-[15px] font-medium group-hover:text-ember transition-colors">
                  {r.title}
                </span>
                <span className="mt-1 block text-[13px] text-ink-soft">
                  {r.summary}
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ── Contextual CTA ───────────────────────────────────── */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-16 sm:py-20 relative overflow-hidden text-center">
          <div className="absolute inset-0 dot-grid" aria-hidden="true" />
          <div className="absolute inset-0 wash-ember" aria-hidden="true" />
          <div className="relative">
            <Reveal>
              <p className="micro text-ink-soft">
                {isCommunity ? "Get involved" : `Next cohort — ${cohort.start}`}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-2xl sm:text-4xl font-medium tracking-tight max-w-[26ch] mx-auto">
                {isCommunity
                  ? "Mentors, partners, and the community write this record with us."
                  : "Read the record. Then be part of the next entry."}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {isCommunity ? (
                  <>
                    <CtaButton href="/partner" variant="primary">
                      Partner with us
                    </CtaButton>
                    <CtaButton href="/contact" variant="ghost">
                      Contact us
                    </CtaButton>
                  </>
                ) : (
                  <>
                    <CtaButton href={cta.href} variant="ember">
                      {cta.label}
                    </CtaButton>
                    <CtaButton href="/accelerator" variant="ghost">
                      How the program works
                    </CtaButton>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
