import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta";
import { BigCta } from "@/components/big-cta";
import { Section, PlusCorners } from "@/components/section";
import { ChecklistCard } from "@/components/graphics";
import { submitForm } from "@/lib/actions";
import { cohort, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Sponsor a cohort of the Iknite Space accelerator in Buea: fund seats, equipment, mentorship operations, or the infrastructure of the wider Space — with documented, public reporting.",
};

const funds = [
  {
    n: "01",
    t: "Cohort seats",
    d: "Keep selection about potential, not ability to pay — back the trainees of a full six-month cohort.",
  },
  {
    n: "02",
    t: "Equipment & connectivity",
    d: "Laptops, reliable internet, and power keep ten people shipping every day.",
  },
  {
    n: "03",
    t: "Mentorship & operations",
    d: "The structure around the learning: program operations, reviews, demos, and community events.",
  },
  {
    n: "04",
    t: "The wider Space",
    d: "The next phase we are building in Buea — training rooms, work areas, solar power, startup space. Vision, funded deliberately.",
  },
];

export default function SponsorPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <Reveal>
            <p className="micro inline-flex items-center gap-2 border hairline-strong bg-paper px-3 py-2">
              <span className="inline-block w-2 h-2 bg-ember animate-blink" aria-hidden="true" />
              Sponsorship — {cohort.name} starts {cohort.start}
            </p>
          </Reveal>

          <h1 className="mt-8 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight max-w-[17ch]">
            <Decode text="Back the pipeline." />
          </h1>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[54ch] text-[15px] text-ink-soft">
              Ten seats, six months, real delivery — a documented program that
              turns emerging engineers into people teams can rely on.
              Sponsorship keeps it running, and keeps it selective on merit.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href="#sponsor-form" variant="ember">
                Start the conversation
              </CtaButton>
              <CtaButton href="/projects" variant="ghost">
                See the evidence
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why ──────────────────────────────────────────────── */}
      <Section label="Why sponsor" index="01" pattern="squares">
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[22ch]">
              Small, selective, and visible from the first sprint.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="text-[14px] text-ink-soft space-y-4 max-w-[52ch]">
              <p>
                This is not a certificate mill. Around ten trainees per cohort
                work through structured coursework, a two-week piscine, team
                sprints, code review, and public demos — with bi-weekly 1:1
                mentorship from working engineers.
              </p>
              <p className="text-ink">
                Every cohort is documented publicly. You can see exactly what
                your support builds — the projects, the process, the people.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── What support funds ───────────────────────────────── */}
      <Section label="What support funds" index="02">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border hairline divide-y lg:divide-y-0 sm:divide-x [&>*]:hairline">
          {funds.map((f, i) => (
            <Reveal key={f.n} delay={i * 80} className="p-6">
              <span className="micro text-ember tabular">[{f.n}]</span>
              <h3 className="mt-3 text-[15px] font-medium">{f.t}</h3>
              <p className="mt-2 text-[13px] text-ink-soft">{f.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-6 micro text-ink-soft">
            The wider Space is a development vision — support for it is framed
            as building, never as buying access to facilities that don&apos;t
            exist yet.
          </p>
        </Reveal>
      </Section>

      {/* ── How we report ────────────────────────────────────── */}
      <Section label="How we report" index="03" pattern="stripes-h">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[22ch]">
                No logo walls. Documented outcomes.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-5 text-[14px] text-ink-soft space-y-4 max-w-[50ch]">
                <p>
                  Sponsors get a clear agreement on what their support covers,
                  progress you can verify in the public cohort record, and
                  honest conversations when things change.
                </p>
                <p>
                  We publish sponsor names only for current, documented
                  relationships — agreed in writing, described accurately.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7">
                <CtaButton href="/insights" variant="ghost">
                  The public record
                </CtaButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <ChecklistCard title="Sponsor reporting" />
          </Reveal>
        </div>
      </Section>

      {/* ── The form ─────────────────────────────────────────── */}
      <Section label="Start the conversation" index="04" id="sponsor-form" className="scroll-mt-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
                Tell us what you want to make possible.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[44ch]">
                We reply with the program model, current needs, and our
                reporting approach — then find the shape of support that fits.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 border-l-2 border-ember pl-4 text-[13px] text-ink-soft max-w-[44ch]">
                Prefer email? Reach us directly at{" "}
                <a href={`mailto:${site.email}`} className="text-ink underline">
                  {site.email}
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={100}>
              <div className="relative border hairline p-6 sm:p-8">
                <PlusCorners />
                <form action={submitForm} className="relative space-y-6">
                  <input type="hidden" name="_kind" value="partner" />
                  <input type="hidden" name="intent" value="sponsor" />
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
                    <div>
                      <label htmlFor="sponsor-name" className="micro text-ink-soft block mb-2">
                        Contact name
                        <span className="text-ember" aria-hidden="true"> *</span>
                      </label>
                      <input id="sponsor-name" type="text" name="name" required className="field" />
                    </div>
                    <div>
                      <label htmlFor="sponsor-email" className="micro text-ink-soft block mb-2">
                        Email
                        <span className="text-ember" aria-hidden="true"> *</span>
                      </label>
                      <input id="sponsor-email" type="email" name="email" required className="field" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sponsor-org" className="micro text-ink-soft block mb-2">
                      Organization
                    </label>
                    <input id="sponsor-org" type="text" name="organization" className="field" />
                  </div>

                  <div>
                    <label htmlFor="sponsor-interest" className="micro text-ink-soft block mb-2">
                      What you&apos;d like to support
                      <span className="text-ember" aria-hidden="true"> *</span>
                    </label>
                    <textarea id="sponsor-interest" name="interest" rows={5} required className="field" />
                  </div>

                  <button
                    type="submit"
                    className="stripes-hover relative block w-full bg-ember-ink text-paper py-5 text-center cursor-pointer"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-current"
                    />
                    <span className="relative z-10 font-medium text-base tracking-[0.18em] uppercase">
                      Send <span aria-hidden="true">→</span>
                    </span>
                  </button>
                  <p className="text-[12px] text-ink-soft">
                    By sending this you agree that Iknite Space stores these
                    details to respond to you. See our{" "}
                    <a href="/privacy" className="underline">privacy policy</a>.
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-20 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid" aria-hidden="true" />
          <div className="absolute inset-0 wash-ember" aria-hidden="true" />
          <div className="relative text-center">
            <Reveal>
              <p className="micro text-ink-soft">
                {cohort.name} — starts {cohort.start}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">
                Ten careers per cohort.
                <br />
                Fund the next ten
                <span className="text-ember animate-blink" aria-hidden="true">_</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-10">
                <BigCta href="#sponsor-form" variant="ember">
                  Sponsor a cohort
                </BigCta>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
