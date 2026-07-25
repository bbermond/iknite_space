import type { Metadata } from "next";
import Link from "next/link";
import { coachCategories, featuredCoach, vettingCriteria } from "@/content/coaches";
import { submitForm } from "@/lib/actions";
import { Section, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { BigCta } from "@/components/big-cta";

export const metadata: Metadata = {
  title: "Coaches & Health Consultants",
  description:
    "The FindWellness coach collective — vetted health consultants, concierge practitioners, fitness and performance coaches, and nutritionists serving San Jose, Los Gatos, and the South Bay. Selective, verified, and built for people who want a human in their corner.",
};

export default async function CoachesPage() {
  return (
    <>
      {/* ---- Hero ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <Reveal>
            <p className="micro text-fern mb-5">The coach collective</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-[16ch]">
              Great health is a team sport.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-[54ch] text-ink-soft text-[15px] sm:text-base">
              The directory tells you where to go. The collective gives you
              someone to go with — vetted health consultants, concierge
              practitioners, fitness coaches, and nutritionists for people who
              want a human in their corner.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#featured"
                className="micro no-underline bg-fern text-paper border border-fern px-5 py-3 invert-hover"
              >
                Meet our featured practitioner
              </a>
              <a
                href="#apply"
                className="micro no-underline border border-ink px-5 py-3 invert-hover"
              >
                Apply to join
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---- [01] Featured practitioner ---- */}
      <Section id="featured" label="Featured practitioner" index="01">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Monogram panel */}
          <Reveal className="lg:col-span-2">
            <div className="relative border hairline-strong wash-fern-strong aspect-square">
              <PlusCorners />
              <div aria-hidden="true" className="absolute inset-0 hatch opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  aria-hidden="true"
                  className="display text-[9rem] sm:text-[11rem] leading-none text-fern select-none"
                >
                  JK
                </span>
              </div>
              <p className="absolute bottom-4 left-5 micro text-ink-soft">
                Featured practitioner
              </p>
              <p className="absolute top-4 right-5 micro text-fern">San Jose</p>
            </div>
            <dl className="mt-6 space-y-2.5 text-[13px]">
              {[
                { dt: "Founder", dd: "Lumira Health & Wellness" },
                { dt: "Partner", dd: "NewU Hydration Lounge" },
                { dt: "Experience", dd: "15+ years" },
              ].map((row) => (
                <div key={row.dt} className="leader">
                  <dt className="micro text-ink-soft">{row.dt}</dt>
                  <dd className="font-medium tabular">{row.dd}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Profile */}
          <Reveal delay={80} className="lg:col-span-3">
            <h2 className="display text-3xl sm:text-5xl leading-[1.05]">
              {featuredCoach.name}
            </h2>
            <p className="micro text-fern mt-3">
              {featuredCoach.credentials} · {featuredCoach.title}
            </p>
            <p className="micro text-ink-soft mt-1.5">{featuredCoach.location}</p>

            <div className="mt-7 space-y-4 text-[15px] text-ink-soft leading-relaxed max-w-[58ch]">
              {featuredCoach.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-7 flex flex-wrap gap-2">
              {featuredCoach.focus.map((item) => (
                <li key={item} className="micro border hairline-strong px-3 py-1.5">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {featuredCoach.links.map((link) =>
                link.href.startsWith("http") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="micro no-underline bg-fern text-paper border border-fern px-4 py-2.5 invert-hover"
                  >
                    {link.label} ↗
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="micro no-underline border border-ink px-4 py-2.5 invert-hover"
                  >
                    {link.label} →
                  </Link>
                )
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- [02] The disciplines ---- */}
      <Section label="The disciplines" index="02" className="bg-paper-2/50">
        <Reveal className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="display text-2xl sm:text-4xl max-w-[20ch]">
              Four disciplines. One standard.
            </h2>
            <p className="text-ink-soft text-[13px] max-w-[40ch]">
              The collective is forming now, roster by roster. Each discipline
              admits a small number of coaches, reviewed individually — no one
              is listed automatically, and no placement is sold.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {coachCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 50}>
              <div className="relative border hairline bg-paper p-6 sm:p-8 h-full flex flex-col">
                <PlusCorners />
                <h3 className="display text-xl sm:text-2xl mb-1.5">{cat.name}</h3>
                <p className="text-[14px] font-medium">{cat.tagline}</p>
                <p className="text-[13px] text-ink-soft leading-relaxed mt-3">
                  {cat.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.offerings.map((offering) => (
                    <li
                      key={offering}
                      className="micro border hairline px-2.5 py-1 text-ink-soft"
                    >
                      {offering}
                    </li>
                  ))}
                </ul>
                <p className="micro text-fern mt-auto pt-6 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block w-1.5 h-1.5 bg-fern-bright animate-blink"
                  />
                  Accepting applications
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- [03] How we vet ---- */}
      <Section label="How we vet" index="03">
        <Reveal className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="display text-2xl sm:text-4xl max-w-[22ch]">
              Selective on purpose.
            </h2>
            <p className="text-ink-soft text-[13px] max-w-[38ch]">
              Every applicant passes the same four gates before their name
              appears anywhere on this site.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {vettingCriteria.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="border-t-2 border-fern pt-5">
                <p className="micro text-fern mb-3 tabular">0{i + 1}</p>
                <h3 className="display text-xl mb-2">{item.title}</h3>
                <p className="text-[13px] text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- [04] Apply ---- */}
      <Section id="apply" label="Apply to the collective" index="04" className="bg-paper-2/50">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <Reveal>
            <h2 className="display text-2xl sm:text-4xl max-w-[18ch]">
              Practice at the level you trained for.
            </h2>
            <p className="mt-5 text-ink-soft text-[15px] max-w-[48ch]">
              FindWellness readers are South Bay professionals who research
              carefully, invest in their health, and stay with practitioners
              who deliver. If that is the clientele your practice was built
              for, we should talk.
            </p>
            <div className="mt-8 space-y-6">
              {[
                {
                  title: "A qualified audience",
                  body: "Our readers arrive mid-decision — comparing options, reading closely, ready to commit to the right person rather than the nearest one.",
                },
                {
                  title: "Curated, never sold",
                  body: "Placement in the collective is earned through vetting. There is no fee to rank, no sponsored tier, and no way to buy your way past the process.",
                },
                {
                  title: "Direct client relationships",
                  body: "Clients contact you directly and remain yours entirely. We take no commission and never sit between you and the people you serve.",
                },
              ].map((point) => (
                <div key={point.title} className="border-t hairline-strong pt-4">
                  <h3 className="display text-lg mb-1">{point.title}</h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed max-w-[46ch]">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <form action={submitForm} className="relative border hairline bg-paper p-6">
              <PlusCorners />
              <input type="hidden" name="_kind" value="coach" />
              <div className="sr-only" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <p className="micro text-ink-soft mb-6">Application — coach collective</p>

              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
                <div>
                  <label htmlFor="coach-name" className="micro text-ink-soft block mb-1.5">
                    Name *
                  </label>
                  <input
                    id="coach-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="coach-email" className="micro text-ink-soft block mb-1.5">
                    Email *
                  </label>
                  <input
                    id="coach-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="coach-discipline" className="micro text-ink-soft block mb-1.5">
                    Discipline
                  </label>
                  <select id="coach-discipline" name="discipline" className="field">
                    <option value="">Select a discipline</option>
                    {coachCategories.map((cat) => (
                      <option key={cat.slug} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="coach-credentials" className="micro text-ink-soft block mb-1.5">
                    Credentials
                  </label>
                  <input
                    id="coach-credentials"
                    name="credentials"
                    type="text"
                    placeholder="RD, CSCS, NBC-HWC…"
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="coach-city" className="micro text-ink-soft block mb-1.5">
                    City
                  </label>
                  <input
                    id="coach-city"
                    name="city"
                    type="text"
                    placeholder="San Jose"
                    autoComplete="address-level2"
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="coach-link" className="micro text-ink-soft block mb-1.5">
                    Practice link
                  </label>
                  <input
                    id="coach-link"
                    name="link"
                    type="url"
                    placeholder="https://"
                    className="field"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="coach-note" className="micro text-ink-soft block mb-1.5">
                    Note
                  </label>
                  <textarea
                    id="coach-note"
                    name="note"
                    rows={4}
                    placeholder="Tell us about your practice — who you serve, how you work, and what you would bring to the collective."
                    className="field"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="micro bg-fern text-paper px-5 py-3 border border-fern invert-hover mt-6"
              >
                Submit application
              </button>
              <p className="text-[12px] text-ink-soft mt-4">
                We read every application and reply either way, usually within a
                week.
              </p>
            </form>
          </Reveal>
        </div>
      </Section>

      <Section>
        <BigCta href="/directory" variant="ink">
          Explore the directory
        </BigCta>
      </Section>
    </>
  );
}
