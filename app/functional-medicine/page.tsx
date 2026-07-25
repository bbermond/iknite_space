import type { Metadata } from "next";
import Link from "next/link";
import {
  biomarkerTicker,
  biomarkerSystems,
  pillars,
  featuredPrograms,
  lumiraStages,
  functionalFaq,
} from "@/content/functional";
import { getPublishedBusinesses, featuredFor } from "@/lib/businesses";
import { categoryBySlug } from "@/lib/taxonomy";
import { Section, SectionLabel, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { BusinessCard } from "@/components/business-card";
import { BigCta } from "@/components/big-cta";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Functional Medicine — an introduction to root-cause health",
  description:
    "What functional medicine is, what a 100+ biomarker panel reveals, and the South Bay programs pioneering data-driven healthspan — including LumiraPrime and NewU Hydration Lounge.",
  alternates: { canonical: "/functional-medicine" },
};

export default async function FunctionalMedicinePage() {
  const all = await getPublishedBusinesses();
  const cat = categoryBySlug("functional-longevity");
  const clinics = cat ? featuredFor(all, { category: cat.airtableName, limit: 3 }) : [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Functional Medicine — an introduction to root-cause health",
          description:
            "A plain-English primer on functional medicine, modern biomarker panels, and the programs pioneering data-driven healthspan in the South Bay.",
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          dateModified: "2026-07",
          url: `${site.url}/functional-medicine`,
        }}
      />

      {/* ---- Dark hero ---- */}
      <div className="wash-ink text-paper overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 sm:pt-24 pb-16">
          <Reveal>
            <p className="micro text-fern-bright mb-5">The FindWellness primer · Functional medicine</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-[14ch]">
              Most medicine waits. This doesn&rsquo;t.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-[54ch] text-paper/70 text-[15px] sm:text-base">
              Functional medicine measures your biology before it breaks —
              hundreds of biomarkers, root-cause thinking, and a personalized
              protocol that treats you as a system, not a symptom. Here is how
              it works, and who does it well near you.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#programs"
                className="micro no-underline bg-fern-bright border border-fern-bright text-ink px-5 py-3 hover:bg-paper hover:border-paper transition-colors"
              >
                See the featured programs ↓
              </a>
              <Link
                href="/categories/functional-longevity"
                className="micro no-underline border border-paper/40 text-paper px-5 py-3 hover:bg-paper/10 transition-colors"
              >
                Browse 43 local clinics
              </Link>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mt-14 grid grid-cols-3 max-w-xl border-t border-paper/20 pt-6 gap-6">
              {[
                { n: "100+", label: "Biomarkers tested" },
                { n: "6", label: "Body systems mapped" },
                { n: "2×/yr", label: "Retesting cadence" },
              ].map((s) => (
                <div key={s.label}>
                  <dd className="display text-3xl sm:text-4xl text-fern-bright">{s.n}</dd>
                  <dt className="micro text-paper/60 mt-1.5">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Biomarker ticker on the dark band */}
        <div className="border-t border-paper/15 py-3 overflow-hidden marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...biomarkerTicker, ...biomarkerTicker].map((m, i) => (
              <span key={i} className="micro text-paper/50 whitespace-nowrap px-5 flex items-center gap-5">
                {m}
                <span className="text-fern-bright">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Pillars ---- */}
      <Section label="What functional medicine is" index="01">
        <Reveal className="mb-10">
          <h2 className="display text-2xl sm:text-4xl max-w-[24ch]">
            Four ideas separate it from the ten-minute appointment.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 50}>
              <div className="border-t-2 border-fern pt-5">
                <p className="micro text-fern mb-3 tabular">0{i + 1}</p>
                <h3 className="display text-xl mb-2">{p.title}</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- The panel ---- */}
      <section className="wash-clay text-paper border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-16 sm:py-24">
          <Reveal className="mb-10">
            <SectionLabel index="02" dark>
              What gets measured
            </SectionLabel>
          </Reveal>
          <Reveal className="mb-10">
            <h2 className="display text-2xl sm:text-4xl max-w-[24ch]">
              Your biology, in six systems.
            </h2>
            <p className="mt-4 text-paper/60 text-[14px] max-w-[52ch]">
              A modern panel reads far past the annual physical. These are the
              systems a serious workup maps — and why each one earns its place.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/15 border border-paper/15">
            {biomarkerSystems.map((sys, i) => (
              <Reveal key={sys.name} delay={i * 40}>
                <div className="bg-ink/70 p-6 h-full">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="display text-lg">{sys.name}</h3>
                    <span className="display text-2xl text-clay tabular">{sys.count}</span>
                  </div>
                  <p className="text-[13px] text-paper/60 leading-relaxed mb-4">{sys.why}</p>
                  <ul className="flex flex-wrap gap-1.5 list-none">
                    {sys.markers.map((m) => (
                      <li key={m} className="micro border border-paper/25 text-paper/70 px-2 py-1">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="micro text-paper/40 mt-6">
            Representative markers — exact panels vary by program and clinician.
          </p>
        </div>
      </section>

      {/* ---- The method (LumiraPrime five stages) ---- */}
      <Section label="A managed method" index="03">
        <Reveal className="mb-10">
          <h2 className="display text-2xl sm:text-4xl max-w-[26ch]">
            From data to a plan you actually run.
          </h2>
          <p className="mt-4 text-ink-soft text-[14px] max-w-[54ch]">
            The strongest programs follow a structured arc. LumiraPrime&rsquo;s
            five-stage method is a clean example of how concierge healthspan
            work gets organized.
          </p>
        </Reveal>
        <ol className="grid md:grid-cols-5 gap-px bg-ink/10 border hairline list-none">
          {lumiraStages.map((s, i) => (
            <Reveal key={s.stage} delay={i * 50} as="li">
              <div className="bg-paper p-5 h-full">
                <p className="micro text-fern mb-2 tabular">Stage 0{i + 1}</p>
                <h3 className="display text-lg mb-2">{s.stage}</h3>
                <p className="text-[12.5px] text-ink-soft leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---- Featured programs ---- */}
      <Section id="programs" label="Featured programs" index="04" className="bg-paper-2/50">
        <Reveal className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="display text-2xl sm:text-4xl max-w-[20ch]">
              Two ways in, both excellent.
            </h2>
            <p className="text-ink-soft text-[13px] max-w-[38ch]">
              Editorially selected programs bringing functional medicine to the
              South Bay — from full concierge to first infusion.
            </p>
          </div>
        </Reveal>
        <div className="space-y-6">
          {featuredPrograms.map((prog, i) => (
            <Reveal key={prog.name} delay={i * 60}>
              <article className="relative border hairline bg-paper p-7 sm:p-9 grid lg:grid-cols-5 gap-8">
                <PlusCorners />
                <div className="lg:col-span-3">
                  <p className="micro text-fern mb-2">{prog.kicker}</p>
                  <h3 className="display text-2xl sm:text-3xl mb-1">{prog.name}</h3>
                  <p className="text-fern text-[14px] italic mb-5" style={{ fontFamily: "var(--font-display)" }}>
                    {prog.tagline}
                  </p>
                  {prog.description.map((p, j) => (
                    <p key={j} className="text-[14px] text-ink-soft leading-relaxed mb-3 max-w-[62ch]">
                      {p}
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-3 mt-5">
                    {prog.links.map((l) =>
                      l.external ? (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="micro no-underline bg-fern border border-fern text-paper px-4 py-2.5 invert-hover"
                        >
                          {l.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="micro no-underline border border-ink px-4 py-2.5 invert-hover"
                        >
                          {l.label} →
                        </Link>
                      )
                    )}
                  </div>
                </div>
                <dl className="lg:col-span-2 border-t lg:border-t-0 lg:border-l hairline pt-6 lg:pt-0 lg:pl-8 space-y-4 self-center">
                  {prog.highlights.map((h) => (
                    <div key={h.label}>
                      <dt className="micro text-ink-soft mb-0.5">{h.label}</dt>
                      <dd className="text-[14px] font-medium">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        {/* National reference */}
        <Reveal delay={100}>
          <aside className="mt-6 border hairline-strong border-dashed p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="micro text-ink-soft mb-1">The national reference point</p>
              <p className="text-[14px] text-ink-soft max-w-[70ch]">
                <strong className="text-ink">Function Health</strong> popularized
                consumer biomarker testing at scale — memberships from $365/year
                with 160+ lab tests, drawn at 2,000+ Quest locations and reviewed
                by clinicians. A strong self-directed starting point before, or
                alongside, local care.
              </p>
            </div>
            <a
              href="https://www.functionhealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="micro no-underline border border-ink px-4 py-2.5 invert-hover shrink-0"
            >
              functionhealth.com ↗
            </a>
          </aside>
        </Reveal>
      </Section>

      {/* ---- Local clinics ---- */}
      {clinics.length > 0 && (
        <Section label="From the directory" index="05">
          <Reveal className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="display text-2xl sm:text-4xl">
                The South Bay&rsquo;s top functional clinics.
              </h2>
              <Link href="/categories/functional-longevity" className="micro text-fern no-underline shrink-0">
                All 43 clinics →
              </Link>
            </div>
          </Reveal>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {clinics.map((b) => (
              <li key={b.slug}>
                <BusinessCard business={b} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ---- FAQ ---- */}
      <Section label="Sensible questions" index="06">
        <div className="max-w-3xl divide-y divide-[color-mix(in_srgb,var(--color-ink)_14%,transparent)]">
          {functionalFaq.map((f) => (
            <Reveal key={f.q}>
              <div className="py-6">
                <h3 className="display text-lg mb-2">{f.q}</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="micro text-ink-soft mt-8 border hairline p-4 max-w-3xl">
          Educational content, not medical advice. Work with a licensed
          clinician before starting, stopping, or changing any treatment.
        </p>
      </Section>

      <Section>
        <BigCta href="/categories/functional-longevity">Find your clinic</BigCta>
      </Section>
    </>
  );
}
