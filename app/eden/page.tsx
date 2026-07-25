import type { Metadata } from "next";
import Link from "next/link";
import { edenBriefs, edenTags } from "@/content/eden";
import { Section, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { BigCta } from "@/components/big-cta";

export const metadata: Metadata = {
  title: "Eden — The Knowledge Garden",
  description:
    "Plain-English briefs on the science reshaping wellness — GLP-1s, NAD+, VO2max, heat and cold, CGMs, and more — graded by what the evidence supports.",
  alternates: { canonical: "/eden" },
};

const TAG_INDEX: Record<(typeof edenTags)[number], string> = {
  Research: "01",
  Protocols: "02",
  Technology: "03",
};

const TAG_BLURB: Record<(typeof edenTags)[number], string> = {
  Research:
    "The molecules and mechanisms behind the headlines, read against the primary literature.",
  Protocols:
    "Training, heat, and cold — the practices with the strongest longevity evidence, and how to do them well.",
  Technology:
    "The devices and tests promising to quantify your health, and what they measure honestly.",
};

export default function EdenPage() {
  return (
    <>
      {/* ---- Hero ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 dot-grid dot-grid-fade opacity-60"
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <Reveal>
            <p className="micro text-fern mb-5">
              The FindWellness knowledge garden
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-5xl sm:text-7xl lg:text-8xl leading-[1.0]">
              Eden
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-[46ch] text-ink-soft text-lg sm:text-xl">
              The forbidden fruit was knowledge. Ours is simply peer-reviewed.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 max-w-[56ch] text-ink-soft text-[15px] sm:text-base">
              Eden is where FindWellness translates the cutting-edge research and
              wellness technology worth your attention into plain English —
              sorting the durable evidence from the marketing, and grading every
              claim by how much science actually stands behind it.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 micro text-ink-soft">
              {edenBriefs.length} briefs · Updated July 2026
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---- Briefs by tag ---- */}
      {edenTags.map((tag) => {
        const briefs = edenBriefs.filter((b) => b.tag === tag);
        if (briefs.length === 0) return null;
        return (
          <Section
            key={tag}
            id={tag.toLowerCase()}
            label={tag}
            index={TAG_INDEX[tag]}
          >
            <Reveal className="mb-8">
              <p className="text-ink-soft text-[13px] max-w-[52ch]">
                {TAG_BLURB[tag]}
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {briefs.map((brief, i) => (
                <Reveal key={brief.slug} delay={i * 40}>
                  <Link
                    href={`/eden/${brief.slug}`}
                    className="relative flex flex-col h-full border hairline bg-paper p-6 no-underline card-hover"
                  >
                    <PlusCorners />
                    <p className="micro text-fern mb-3">{brief.tag}</p>
                    <h2 className="display text-xl text-ink mb-2">
                      {brief.title}
                    </h2>
                    <p className="text-[13px] text-ink-soft leading-relaxed flex-1">
                      {brief.dek}
                    </p>
                    <p className="leader micro text-ink-soft mt-5 pt-4 border-t hairline">
                      <span>{brief.minutes} min read</span>
                      <span className="tabular">Updated {brief.updated}</span>
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}

      {/* ---- Disclaimer band ---- */}
      <Section>
        <Reveal>
          <div className="relative border hairline-strong bg-paper-2/50 p-6 sm:p-8">
            <PlusCorners />
            <p className="micro text-fern mb-3">A note on how to read this</p>
            <p className="text-[13px] text-ink-soft leading-relaxed max-w-[68ch]">
              Eden is educational writing, not medical advice. The briefs
              summarize published research in good faith, but science evolves and
              individual circumstances differ. Nothing here is a diagnosis or a
              prescription. Before starting, stopping, or changing a medication,
              supplement, or protocol, talk it through with a qualified clinician
              who knows your history.
            </p>
          </div>
        </Reveal>
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
