import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { MediaSlot } from "@/components/media-slot";
import { CtaButton } from "@/components/cta";
import { Section, PlusCorners } from "@/components/section";
import { cohort, primaryCta, statusLine } from "@/content/site";
import {
  learningModel,
  curriculum,
  ticker,
  commitment,
  selectionProcess,
  faqs,
} from "@/content/program";

export const metadata: Metadata = {
  title: "Accelerator",
  description:
    "A selective six-month accelerator in Buea: structured coursework, bi-weekly 1:1 mentorship, team projects, and sprint delivery — with internship and industry transition pathways after.",
};

const eligibility = [
  {
    tag: "Graduates",
    body: "Engineering graduates from higher institutions and universities.",
  },
  {
    tag: "Final-year",
    body: "Final-year engineering students completing their internship period.",
  },
  {
    tag: "Self-taught",
    body: "Self-taught learners and career switchers with equivalent foundations — make your case in the application essay.",
  },
];

const requirements = [
  {
    t: "Personal laptop",
    d: "Your own machine, set up as your daily workshop.",
  },
  {
    t: "GitHub account",
    d: "Your work lives in version control from day one.",
  },
  {
    t: "Based in Buea",
    d: "In-person attendance, daily, for the full program.",
  },
  {
    t: "Real commitment",
    d: "Coursework, team projects, sprints — six months of showing up.",
  },
];

const mentorshipFacts = [
  ["Cadence", "1:1 sessions every two weeks"],
  ["Who mentors", "Working engineers and practitioners"],
  ["What happens", "Work review, real-world context, guidance"],
];

const pathways = [
  {
    n: "01",
    t: "Internship",
    d: "A structured internship phase to apply the discipline in practice.",
  },
  {
    n: "02",
    t: "Iknite work",
    d: "Contributing to Iknite engineering projects where openings exist.",
  },
  {
    n: "03",
    t: "External employment",
    d: "Introductions to employers who evaluate evidence, not certificates.",
  },
  {
    n: "04",
    t: "Specialization",
    d: "Deeper study in the direction your project work pointed to.",
  },
  {
    n: "05",
    t: "Founder path",
    d: "Building on your own idea, where the fit and support exist.",
  },
];

export default function AcceleratorPage() {
  const cta = primaryCta();

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
              {statusLine()}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight max-w-[17ch]">
              The accelerator.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[54ch] text-[15px] text-ink-soft">
              Six months inside the conditions of a real engineering team:
              structured coursework, bi-weekly 1:1 mentorship, team projects,
              and sprint delivery — building work you can show, and habits a
              team can rely on.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href={cta.href} variant="ember">
                {cta.label}
              </CtaButton>
              <CtaButton href="/contact" variant="ghost">
                Ask a question
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 border hairline divide-x divide-y sm:divide-y-0 [&>div]:hairline bg-paper/70">
              {[
                ["Start", cohort.start],
                ["Location", cohort.location],
                ["Duration", cohort.duration],
                ["Seats", cohort.seats],
              ].map(([k, v]) => (
                <div key={k} className="p-4">
                  <dt className="micro text-ink-soft">{k}</dt>
                  <dd className="mt-1 text-[13px]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────────── */}
      <Section label="Who it's for" index="01">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[22ch]">
                For engineers at the start of the climb.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[52ch]">
                The program is built for people who already have foundations
                and want the team layer on top: workflows, reviews, delivery,
                and judgment.
              </p>
            </Reveal>

            <div className="mt-8 border hairline divide-y [&>*]:hairline">
              {eligibility.map((e, i) => (
                <Reveal
                  key={e.tag}
                  delay={i * 90}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 p-5"
                >
                  <span className="micro text-ember pt-0.5">{e.tag}</span>
                  <p className="text-[13px] text-ink-soft">{e.body}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={150}>
            <div className="relative border hairline p-6 sm:p-8 h-full">
              <PlusCorners />
              <p className="micro text-ember">What you need</p>
              <ul className="mt-6 divide-y [&>li]:hairline">
                {requirements.map((r) => (
                  <li key={r.t} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-ember" aria-hidden="true">
                        +
                      </span>
                      <div>
                        <h3 className="text-[14px] font-medium">{r.t}</h3>
                        <p className="mt-1 text-[13px] text-ink-soft">{r.d}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── The learning model ───────────────────────────────── */}
      <Section label="The learning model" index="02">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch]">
              Six steps, from selection to transition.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[14px] text-ink-soft max-w-[40ch]">
              Each step raises the standard: from foundations, to teamwork, to
              shipping work others can use.
            </p>
          </Reveal>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border hairline">
          {learningModel.map((step, i) => (
            <Reveal
              as="li"
              key={step.step}
              delay={i * 70}
              className="bg-paper p-6 hover:bg-paper-2 transition-colors"
            >
              <span className="micro text-ember tabular">{step.step}</span>
              <h3 className="mt-3 text-[15px] font-medium">{step.title}</h3>
              <p className="mt-2 text-[13px] text-ink-soft">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── Curriculum ───────────────────────────────────────── */}
      <Section label="Curriculum" index="03">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
              Capabilities, not a tool list.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[14px] text-ink-soft max-w-[52ch]">
              Everything below is used together inside real team workflows —
              on projects, under review, in sprints. Nothing is taught as an
              isolated course and left on the shelf.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink/10 border hairline">
          {curriculum.map((group, i) => (
            <Reveal
              key={group.label}
              delay={i * 80}
              className={`bg-paper p-5 ${
                i === curriculum.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <h3 className="micro text-ember">{group.label}</h3>
              <ul className="mt-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] text-ink-soft border-b hairline py-2 last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Marquee items={ticker} />

      {/* ── Mentorship ───────────────────────────────────────── */}
      <Section label="Mentorship" index="04">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[22ch]">
                A working engineer in your corner.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[52ch]">
                Every trainee meets a mentor in structured 1:1 sessions every
                two weeks across the six months — working engineers and
                practitioners who review your work, share real-world context,
                and pressure-test your decisions.
              </p>
            </Reveal>

            <dl className="mt-8 border hairline divide-y [&>div]:hairline max-w-md">
              {mentorshipFacts.map(([k, v], i) => (
                <Reveal
                  as="div"
                  key={k}
                  delay={i * 80}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 p-4"
                >
                  <dt className="micro text-ink-soft pt-0.5">{k}</dt>
                  <dd className="text-[13px]">{v}</dd>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={240}>
              <div className="mt-8">
                <CtaButton href="/partner#mentor" variant="ghost">
                  Become a mentor
                </CtaButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="md:col-span-5">
            <MediaSlot
              slot="program/mentorship"
              alt="Mentor and trainee reviewing work together in a 1:1 session"
              caption="Bi-weekly 1:1 mentor session"
              aspect="aspect-[4/5]"
            />
          </Reveal>
        </div>
      </Section>

      {/* ── Selection ────────────────────────────────────────── */}
      <Section label="Selection" index="05">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[22ch]">
              Deliberate, in person, competitive.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[14px] text-ink-soft max-w-[40ch]">
              Small cohorts — {cohort.seats} — mean every seat is earned. The
              process itself is the first test of commitment.
            </p>
          </Reveal>
        </div>

        <ol className="grid lg:grid-cols-5 border hairline divide-y lg:divide-y-0 lg:divide-x [&>li]:hairline">
          {selectionProcess.map((s, i) => (
            <Reveal
              as="li"
              key={s.step}
              delay={i * 90}
              className="p-5 sm:p-6 hover:bg-paper-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="micro text-ember tabular">{s.step}</span>
                <span
                  aria-hidden="true"
                  className="hidden lg:block flex-1 border-t hairline"
                />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">{s.title}</h3>
              <p className="mt-2 text-[13px] text-ink-soft max-w-[40ch]">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── Commitment ───────────────────────────────────────── */}
      <Section label="Commitment" index="06">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
                Know what you are signing up for.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[38ch]">
                The program asks a lot on purpose. This is the deal, in plain
                terms.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <dl className="border hairline divide-y [&>div]:hairline">
              {commitment.map((row, i) => (
                <Reveal
                  as="div"
                  key={row.k}
                  delay={i * 50}
                  className="grid grid-cols-[8rem_1fr] sm:grid-cols-[12rem_1fr] gap-4 p-4 sm:px-6"
                >
                  <dt className="micro text-ink-soft pt-0.5">{row.k}</dt>
                  <dd className="text-[13px]">{row.v}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ── After the program ────────────────────────────────── */}
      <Section label="After the program" index="07">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
              A pathway, not a promise.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="text-[14px] text-ink-soft space-y-4 max-w-[52ch]">
              <p>
                The six-month phase leads into internship and industry
                transition pathways. Where each trainee lands depends on their
                work, the market, and the opportunities we open together.
              </p>
              <p className="text-ink">
                We don&apos;t promise jobs. We build the evidence — real
                projects, real workflow discipline — that earns them.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink/10 border hairline">
          {pathways.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 80}
              className={`bg-paper p-5 ${
                i === pathways.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span className="micro text-ember tabular">{p.n}</span>
              <h3 className="mt-3 text-[14px] font-medium">{p.t}</h3>
              <p className="mt-2 text-[13px] text-ink-soft">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <Section label="FAQ" index="08">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
                Asked, answered.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[36ch]">
                Something we missed? Ask us directly — we respond to every
                message.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7">
                <CtaButton href="/contact" variant="ghost">
                  Contact us
                </CtaButton>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="border hairline divide-y [&>*]:hairline">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="group">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:px-6 [&::-webkit-details-marker]:hidden hover:bg-paper-2 transition-colors">
                      <span className="flex items-baseline gap-4">
                        <span className="micro text-ink-soft tabular">
                          Q{i + 1}
                        </span>
                        <span className="text-[14px] font-medium">{f.q}</span>
                      </span>
                      <span
                        className="text-ember transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-5 sm:px-6 pb-5 text-[13px] text-ink-soft max-w-[62ch]">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-grid" aria-hidden="true" />
          <div className="absolute inset-0 wash-ember" aria-hidden="true" />
          <div className="relative">
            <Reveal>
              <p className="micro text-ink-soft">{statusLine()}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">
                Ready to do the work?
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
                <CtaButton href="/contact" variant="ghost">
                  Talk to us first
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
