import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { edenBriefs, type EvidenceGrade } from "@/content/eden";
import { Section, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { BigCta } from "@/components/big-cta";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";

export function generateStaticParams() {
  return edenBriefs.map((brief) => ({ slug: brief.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brief = edenBriefs.find((b) => b.slug === slug);
  if (!brief) {
    return { title: "Not found — Eden" };
  }
  return {
    title: `${brief.title} — Eden`,
    description: brief.dek,
  };
}

const GRADE_CHIP: Record<EvidenceGrade, string> = {
  Strong: "bg-fern text-paper border border-fern",
  Moderate: "border border-fern text-fern",
  Early: "border hairline-strong text-ink-soft",
};

export default async function BriefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brief = edenBriefs.find((b) => b.slug === slug);
  if (!brief) notFound();

  const more = [
    ...edenBriefs.filter((b) => b.slug !== brief.slug && b.tag === brief.tag),
    ...edenBriefs.filter((b) => b.slug !== brief.slug && b.tag !== brief.tag),
  ].slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: brief.title,
          description: brief.dek,
          dateModified: "2026-07",
          author: { "@type": "Organization", name: site.name },
        }}
      />

      {/* ---- Header ---- */}
      <div className="relative wash-fern overflow-hidden border-b hairline">
        <div
          aria-hidden="true"
          className="absolute inset-0 dot-grid dot-grid-fade opacity-50"
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-12 sm:pt-16 pb-12 sm:pb-16">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="micro flex items-center gap-2 text-ink-soft"
            >
              <Link href="/eden" className="no-underline text-fern">
                Eden
              </Link>
              <span aria-hidden="true">→</span>
              <Link
                href={`/eden#${brief.tag.toLowerCase()}`}
                className="no-underline text-ink-soft hover:text-ink"
              >
                {brief.tag}
              </Link>
            </nav>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-6xl leading-[1.03] mt-6 max-w-[18ch]">
              {brief.title}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-[54ch] text-ink-soft text-lg">
              {brief.dek}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="micro text-ink-soft mt-7 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Updated {brief.updated}</span>
              <span aria-hidden="true" className="text-fern">
                ·
              </span>
              <span>{brief.minutes} min read</span>
              <span aria-hidden="true" className="text-fern">
                ·
              </span>
              <span className="text-fern">{brief.tag}</span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---- Article ---- */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-14 sm:py-20">
          {/* TL;DR */}
          <Reveal className="mb-12">
            <div className="relative wash-fern-strong border hairline-strong p-6 sm:p-8 max-w-[65ch]">
              <PlusCorners />
              <p className="micro text-fern mb-3">TL;DR</p>
              <p className="text-[15px] sm:text-base leading-relaxed text-ink">
                {brief.tldr}
              </p>
            </div>
          </Reveal>

          {/* Body */}
          <Reveal>
            <div className="prose-fw text-[15px] sm:text-base text-ink">
              {brief.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>

          {/* Evidence table */}
          <Reveal className="mt-16">
            <h2 className="display text-2xl sm:text-3xl mb-2">
              What the evidence says
            </h2>
            <p className="text-[13px] text-ink-soft mb-8 max-w-[52ch]">
              How firmly the research supports each claim in this brief, graded
              conservatively.
            </p>
            <div className="border hairline">
              <div
                aria-hidden="true"
                className="hidden sm:grid grid-cols-[1fr_auto] gap-4 px-5 py-3 border-b hairline bg-paper-2/50"
              >
                <span className="micro text-ink-soft">Claim</span>
                <span className="micro text-ink-soft">Evidence</span>
              </div>
              {brief.evidence.map((row) => (
                <div
                  key={row.claim}
                  className="grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-6 px-5 py-5 border-b hairline last:border-b-0 items-start"
                >
                  <div>
                    <p className="text-[14px] font-medium text-ink leading-snug">
                      {row.claim}
                    </p>
                    <p className="text-[13px] text-ink-soft leading-relaxed mt-1">
                      {row.note}
                    </p>
                  </div>
                  <span
                    className={`micro shrink-0 px-2.5 py-1 justify-self-start sm:justify-self-end ${GRADE_CHIP[row.grade]}`}
                  >
                    {row.grade}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Sources */}
          <Reveal className="mt-16">
            <h2 className="display text-2xl sm:text-3xl mb-6">Sources</h2>
            <ol className="max-w-[65ch]">
              {brief.sources.map((source, i) => (
                <li
                  key={source}
                  className="flex gap-4 py-3 border-t hairline last:border-b"
                >
                  <span className="micro text-fern tabular shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] text-ink-soft leading-relaxed">
                    {source}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Disclaimer */}
          <Reveal className="mt-12">
            <p className="text-[13px] text-ink-soft leading-relaxed max-w-[65ch] border-l-2 border-fern pl-4">
              This brief is educational content, not medical advice. It
              summarizes published research and cannot account for your
              individual health. Talk with a qualified clinician before starting,
              stopping, or changing any medication, supplement, or protocol.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- More from the garden ---- */}
      <Section label="More from the garden">
        <div className="grid sm:grid-cols-3 gap-5">
          {more.map((b, i) => (
            <Reveal key={b.slug} delay={i * 40}>
              <Link
                href={`/eden/${b.slug}`}
                className="relative flex flex-col h-full border hairline bg-paper p-6 no-underline card-hover"
              >
                <PlusCorners />
                <p className="micro text-fern mb-3">{b.tag}</p>
                <h3 className="display text-xl text-ink mb-2">{b.title}</h3>
                <p className="text-[13px] text-ink-soft leading-relaxed flex-1">
                  {b.dek}
                </p>
                <span className="micro text-fern mt-5 inline-block">
                  Read the brief →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- CTA ---- */}
      <Section>
        <BigCta href="/directory" variant="ink">
          Put knowledge to work
        </BigCta>
      </Section>
    </>
  );
}
