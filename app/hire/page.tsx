import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { CtaButton } from "@/components/cta";
import { BrandBlocks } from "@/components/brand-blocks";
import { submitForm } from "@/lib/actions";
import { site } from "@/content/site";
import {
  hireHero,
  engagementModels,
  vetting,
  hireSteps,
  ikniteOs,
  straightTalk,
  hireForm,
} from "@/content/hire";

export const metadata: Metadata = {
  title: "Hire",
  description:
    "Work with Iknite Space: recruit an accelerator-trained engineer, embed talent in your team with continued mentor oversight, or outsource a scoped build to a senior-reviewed team in Buea.",
};

/**
 * The business-facing page — deliberately cleaner and more corporate
 * than the rest of the site: same tokens, type, and hairline foundation,
 * but calmer. No decode effects, minimal patterns, more whitespace.
 * Also served as the root of hire.iknite.space (see proxy.ts).
 */
export default function HirePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 pt-20 pb-14 sm:pt-32 sm:pb-20">
          <Reveal>
            <p className="micro text-ink-soft">{hireHero.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight max-w-[16ch]">
              {hireHero.headline}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
              {hireHero.lede}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaButton href="#inquiry" variant="ember">
                Start a conversation
              </CtaButton>
              <CtaButton href="/projects" variant="ghost">
                See the evidence
              </CtaButton>
            </div>
          </Reveal>
        </div>

        {/* Programme facts — quiet, corporate stat row. */}
        <div className="border-t hairline">
          <div className="mx-auto max-w-6xl px-5 sm:px-10">
            <dl className="grid grid-cols-2 md:grid-cols-4 divide-x [&>div]:hairline border-x hairline">
              {hireHero.facts.map((f, i) => (
                <Reveal key={f.k} delay={i * 70} className="px-5 py-6">
                  <div>
                    <dt className="micro text-ink-soft">{f.k}</dt>
                    <dd className="mt-1.5 m-0 text-[15px] font-medium">{f.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Engagement models ────────────────────────────────── */}
      <Section label="Ways to engage" index="01">
        <div className="max-w-[56ch] mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
              Three ways to work with us.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-[14px] text-ink-soft">
              One programme behind all three. The difference is who runs the
              work day to day — you, or us.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 border hairline divide-y md:divide-y-0 md:divide-x [&>div]:hairline">
          {engagementModels.map((m, i) => (
            <Reveal key={m.id} delay={i * 110} className="bg-paper">
              <div className="flex h-full flex-col p-6 sm:p-8">
                <p className="micro text-ink-soft">{m.forWho}</p>
                <h3 className="mt-2 text-xl font-medium">{m.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  {m.body}
                </p>
                <ul className="mt-6 pt-1 list-none p-0 m-0">
                  {m.points.map((point) => (
                    <li
                      key={point}
                      className="border-t hairline py-2.5 text-[13px] flex gap-3"
                    >
                      <span className="text-ember" aria-hidden="true">
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── The vetting story ────────────────────────────────── */}
      <Section label="How the talent is made" index="02">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <Reveal className="md:col-span-6">
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
              Verified, not certified.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-6">
            <p className="text-[14px] leading-relaxed text-ink-soft max-w-[52ch]">
              {vetting.intro}
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {vetting.stages.map((stage, i) => (
            <Reveal key={stage.t} delay={i * 90}>
              <div className="border-t-2 border-ink pt-4">
                <span className="micro text-ember tabular">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <h3 className="mt-2 text-[15px] font-medium">{stage.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                  {stage.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border hairline px-6 py-5">
            <span className="micro text-ink-soft">The public record:</span>
            <Link href="/projects" className="micro text-ember no-underline">
              Team project case studies →
            </Link>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="micro text-ember no-underline"
            >
              github.com/Iknite-Space ↗
            </a>
            <Link href="/mentors" className="micro text-ember no-underline">
              The mentor bench →
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ── Process ──────────────────────────────────────────── */}
      <Section label="How an engagement starts" index="03">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {hireSteps.map((step, i) => (
            <Reveal key={step.t} delay={i * 110}>
              <div className="h-full border-l hairline pl-6 pr-4 pb-2 lg:pr-8">
                <span className="micro text-ink-soft tabular">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[15px] font-medium">{step.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                  {step.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── IkniteOS ─────────────────────────────────────────── */}
      {/* `on-brand` pins the palette: this band reads identically in both
          lenses, like the footer and the home-page statement bands. */}
      <section className="on-brand relative overflow-hidden wash-brand text-paper border-t hairline">
        <BrandBlocks tone="dark" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 py-16 sm:py-24">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <Reveal>
                <p className="micro text-ember-soft">
                  Shipped by the Iknite ecosystem
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 text-3xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
                  {ikniteOs.name}
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-3 text-lg text-paper/90">{ikniteOs.tagline}</p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-5 text-[14px] leading-relaxed text-paper/70 max-w-[48ch]">
                  {ikniteOs.body}
                </p>
              </Reveal>
              <Reveal delay={260}>
                <a
                  href={ikniteOs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 micro no-underline border border-paper/40 px-5 py-3 text-paper hover:bg-ember hover:border-ember transition-colors"
                >
                  Visit ikniteos.com ↗
                </a>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <div className="grid sm:grid-cols-2 border border-paper/20 divide-y sm:divide-y-0 [&>div]:border-paper/20 sm:[&>div:nth-child(n+3)]:border-t sm:[&>div:nth-child(even)]:border-l">
                {ikniteOs.pillars.map((pillar, i) => (
                  <Reveal key={pillar.t} delay={i * 70}>
                    <div className="p-5 sm:p-6">
                      <span className="micro text-ember-soft tabular">
                        [{String(i + 1).padStart(2, "0")}]
                      </span>
                      <h3 className="mt-1.5 text-[14px] font-medium text-paper">
                        {pillar.t}
                      </h3>
                      <p className="mt-1 text-[13px] text-paper/60">
                        {pillar.d}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Straight talk ────────────────────────────────────── */}
      <Section label="Straight talk" index="04">
        <div className="max-w-[56ch] mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
              What we are — and what we&apos;re not.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-[14px] text-ink-soft">
              Early-career talent, honestly framed, seriously supervised. That
              framing wins us fewer engagements and keeps every one of them.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 border hairline divide-y md:divide-y-0 md:divide-x [&>div]:hairline">
          <Reveal className="p-6 sm:p-10 bg-paper">
            <div>
              <h3 className="micro text-ink-soft">We are</h3>
              <ul className="mt-5 list-none p-0 m-0 space-y-4">
                {straightTalk.are.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-relaxed">
                    <span
                      className="mt-[7px] inline-block w-1.5 h-1.5 shrink-0 bg-ember"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120} className="p-6 sm:p-10 bg-paper">
            <div>
              <h3 className="micro text-ink-soft">We are not</h3>
              <ul className="mt-5 list-none p-0 m-0 space-y-4">
                {straightTalk.areNot.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[14px] leading-relaxed text-ink-soft"
                  >
                    <span className="micro mt-[3px] shrink-0" aria-hidden="true">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Inquiry ──────────────────────────────────────────── */}
      <Section label="Start a conversation" index="05" id="inquiry" className="scroll-mt-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[18ch]">
                {hireForm.headline}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 text-[14px] leading-relaxed text-ink-soft max-w-[48ch]">
                {hireForm.body}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 border-l-2 border-ember pl-4 text-[13px] text-ink-soft">
                <span className="micro text-ink block mb-1">Prefer email?</span>
                <a
                  href={`mailto:${site.email}`}
                  className="no-underline text-ember"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="md:col-span-7">
            <form
              action={submitForm}
              className="relative border hairline p-6 sm:p-10 space-y-6 bg-paper"
            >
              <input type="hidden" name="_kind" value="hire" />
              {/* Honeypot: humans never see or reach this field. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              />

              <div className="grid sm:grid-cols-2 gap-6">
                {hireForm.fields.map((field) => (
                  <div
                    key={field.name}
                    className={field.name === "company" ? "sm:col-span-2" : ""}
                  >
                    <label
                      htmlFor={`hire-${field.name}`}
                      className="micro text-ink-soft block mb-2"
                    >
                      {field.label}
                      <span className="text-ember" aria-hidden="true">
                        {" "}
                        *
                      </span>
                    </label>
                    <input
                      id={`hire-${field.name}`}
                      type={field.type}
                      name={field.name}
                      required
                      className="field"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="hire-need" className="micro text-ink-soft block mb-2">
                  What do you need?
                  <span className="text-ember" aria-hidden="true">
                    {" "}
                    *
                  </span>
                </label>
                <select id="hire-need" name="need" required className="field">
                  {hireForm.needOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hire-brief" className="micro text-ink-soft block mb-2">
                  Tell us about it
                  <span className="text-ember" aria-hidden="true">
                    {" "}
                    *
                  </span>
                </label>
                <textarea
                  id="hire-brief"
                  name="brief"
                  rows={5}
                  required
                  className="field"
                  placeholder="The role, the gap, or the project — a few lines is plenty."
                />
              </div>

              <button
                type="submit"
                className="micro font-medium border border-ink bg-ink text-paper px-6 py-3 ember-hover cursor-pointer"
              >
                Send inquiry →
              </button>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
