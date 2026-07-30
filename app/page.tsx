import Link from "next/link";
import { Decode } from "@/components/decode";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { MediaSlot } from "@/components/media-slot";
import { CtaButton } from "@/components/cta";
import { Section, PlusCorners } from "@/components/section";
import { OrganizationJsonLd } from "@/components/json-ld";
import { BigCta } from "@/components/big-cta";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { cohort, primaryCta, statusLine } from "@/content/site";
import { stats, learningModel, ticker } from "@/content/program";
import { projects } from "@/content/projects";

export default function HomePage() {
  const cta = primaryCta();

  return (
    <>
      <OrganizationJsonLd />

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

          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight max-w-[17ch]">
            <Decode text="From potential" />
            <br />
            <Decode text="to production." />
          </h1>

          <Reveal delay={150}>
            <p className="mt-6 max-w-[54ch] text-[15px] text-ink-soft">
              Iknite Space is a selective, six-month tech talent accelerator in
              Buea — where emerging engineers train inside real team systems,
              and where companies hire juniors who already work like a team.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href={cta.href} variant="ember">
                {cta.label}
              </CtaButton>
              <CtaButton href="/accelerator" variant="ghost">
                How the program works
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={350}>
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

          <Reveal delay={450}>
            <div className="mt-6">
              <PipelineDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Two doors in ─────────────────────────────────────── */}
      <div className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 grid sm:grid-cols-2 sm:divide-x divide-y sm:divide-y-0 [&>a]:hairline">
          <Link
            href="/apply"
            className="group flex items-center justify-between gap-4 py-5 sm:pr-8 no-underline hover:bg-paper-2 transition-colors"
          >
            <span>
              <span className="micro text-ember block">For future engineers</span>
              <span className="text-[15px] font-medium">
                Train inside a real team
              </span>
            </span>
            <span className="micro text-ink-soft group-hover:text-ember transition-colors whitespace-nowrap">
              Apply <span aria-hidden="true">→</span>
            </span>
          </Link>
          <Link
            href="#hire"
            className="group flex items-center justify-between gap-4 py-5 sm:pl-8 no-underline hover:bg-paper-2 transition-colors"
          >
            <span>
              <span className="micro text-ember block">For employers</span>
              <span className="text-[15px] font-medium">
                Hire junior engineers who ship
              </span>
            </span>
            <span className="micro text-ink-soft group-hover:text-ember transition-colors whitespace-nowrap">
              Why hire from us <span aria-hidden="true">↓</span>
            </span>
          </Link>
        </div>
      </div>

      <Marquee items={ticker} />

      {/* ── The gap ──────────────────────────────────────────── */}
      <Section label="The gap" pattern="squares" index="01">
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch]">
              Finishing a course is not the same as being ready for a team.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="text-[14px] text-ink-soft space-y-4 max-w-[52ch]">
              <p>
                Many talented learners know the tools but have never shipped
                inside a real workflow — system thinking, code review, sprint
                discipline, product decisions, work that others must use and
                maintain.
              </p>
              <p className="text-ink">
                Iknite Space closes that gap before you enter a professional
                team, not after.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 border hairline divide-y sm:divide-y-0 sm:divide-x [&>div]:hairline">
          {[
            {
              n: "A",
              t: "Courses alone",
              d: "Syntax, small apps, solo work. Knowledge without team context.",
            },
            {
              n: "B",
              t: "The missing layer",
              d: "Reviews, sprints, contracts, trade-offs, communication, delivery.",
            },
            {
              n: "C",
              t: "Team-ready",
              d: "Contributing to real systems with discipline others can rely on.",
            },
          ].map((item, i) => (
            <Reveal key={item.n} delay={i * 100} className="p-6">
              <span className="micro text-ember">[{item.n}]</span>
              <h3 className="mt-3 text-[15px] font-medium">{item.t}</h3>
              <p className="mt-2 text-[13px] text-ink-soft">{item.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── The accelerator ──────────────────────────────────── */}
      <Section label="The accelerator" index="02">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
                Six months.
                <br />
                Real workflows.
                <br />
                Small cohort.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[44ch]">
                Four months of mentored, structured training, then two months
                shipping a team project — the conditions of a real engineering
                team, before you join one.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7">
                <CtaButton href="/accelerator" variant="primary">
                  Explore the program
                </CtaButton>
              </div>
            </Reveal>

            <dl className="mt-12 grid grid-cols-2 gap-px bg-ink/10 border hairline">
              {stats.map((s) => (
                <div key={s.label} className="bg-paper p-5 flex flex-col">
                  <dt className="order-2 mt-1 micro text-ink-soft">{s.label}</dt>
                  <dd className="order-1 text-3xl sm:text-4xl font-medium">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-7">
            <ol className="border hairline divide-y [&>li]:hairline">
              {learningModel.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.step}
                  delay={i * 70}
                  className="group relative p-5 sm:p-6 grid grid-cols-[3rem_1fr] gap-4 hover:bg-paper-2 transition-colors"
                >
                  <span className="micro text-ember tabular pt-1">{step.step}</span>
                  <div>
                    <h3 className="text-[15px] font-medium">{step.title}</h3>
                    <p className="mt-1 text-[13px] text-ink-soft max-w-[58ch]">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ── Proof ────────────────────────────────────────────── */}
      <Section label="Proof of work" pattern="dots" index="03">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[22ch]">
              Trainees don&apos;t collect certificates. They ship.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <CtaButton href="/projects" variant="ghost">
              All projects &amp; talent
            </CtaButton>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block no-underline border hairline hover:border-ink transition-colors"
              >
                <MediaSlot
                  slot={p.media}
                  alt={`${p.name} — ${p.oneLiner}`}
                  caption={`${p.cohort} team project`}
                  aspect="aspect-[4/3]"
                  className="border-0 border-b hairline"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-medium group-hover:text-ember transition-colors">
                      {p.name}
                    </h3>
                    <span className="micro text-ink-soft">{p.status}</span>
                  </div>
                  <p className="mt-2 text-[13px] text-ink-soft">{p.oneLiner}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── For employers ────────────────────────────────────── */}
      <Section label="Why hire from Iknite Space" index="04" id="hire" pattern="squares" className="scroll-mt-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
                Juniors who arrive already working like a team.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-5 text-[14px] text-ink-soft space-y-4 max-w-[52ch]">
                <p>
                  Our engineers complete four months of structured training
                  with assigned mentors, then two months of team-based product
                  development on a real project.
                </p>
                <p className="text-ink">
                  By graduation they&apos;ve worked in collaborative
                  engineering environments, built production-minded software
                  through Git and Agile workflows, and developed the habits
                  modern software teams expect.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7 flex flex-wrap gap-3">
                <CtaButton href="/partner#hire" variant="ember">
                  Hire or meet talent
                </CtaButton>
                <CtaButton href="/projects" variant="ghost">
                  See their work
                </CtaButton>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 border hairline divide-x divide-y [&>div]:hairline content-start">
            {[
              {
                t: "Git discipline",
                d: "Branches, pull requests, and code review as daily habit — not theory.",
              },
              {
                t: "Agile delivery",
                d: "User stories, sprints, stand-ups, and demos across six months.",
              },
              {
                t: "Team collaboration",
                d: "Four months mentored, two months shipping together on one product.",
              },
              {
                t: "Evidence, not claims",
                d: "Review the projects, the repos, and how each team actually worked.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 90} className="p-5 sm:p-6 bg-paper">
                <span className="micro text-ember tabular">[{String(i + 1).padStart(2, "0")}]</span>
                <h3 className="mt-2 text-[14px] font-medium">{item.t}</h3>
                <p className="mt-1.5 text-[13px] text-ink-soft">{item.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── The wider Space ──────────────────────────────────── */}
      <Section label="The wider Space" index="05">
        <div className="relative border hairline wash-ember-strong p-8 sm:p-14">
          <PlusCorners />
          <div className="max-w-[58ch]">
            <Reveal>
              <p className="micro text-ember mb-4">We are building</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
                A home for talent, founders, and technology ventures in
                Cameroon.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[14px] text-ink-soft">
                The accelerator is the operating foundation. The next phase is a
                reliable physical environment in Buea — training rooms, work
                areas, events, and space where product teams and startups grow
                together. We announce facilities when they open, not before.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7">
                <CtaButton href="/about" variant="primary">
                  The vision
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Audience router ──────────────────────────────────── */}
      <Section label="Find your way in" pattern="stripes-v" index="06">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border hairline divide-y lg:divide-y-0 sm:divide-x [&>*]:hairline">
          {[
            {
              t: "Trainee",
              d: `Apply to ${cohort.name} — starts ${cohort.start}.`,
              href: "/apply",
              label: "Apply",
            },
            {
              t: "Mentor",
              d: "Guide a trainee in bi-weekly sessions across six months.",
              href: "/partner#mentor",
              label: "Become a mentor",
            },
            {
              t: "Employer",
              d: "Review real work samples and meet team-ready juniors.",
              href: "/partner#hire",
              label: "Meet talent",
            },
            {
              t: "Sponsor",
              d: "Back a cohort — ten careers, documented publicly.",
              href: "/sponsor",
              label: "Sponsor a cohort",
            },
          ].map((a, i) => (
            <Reveal key={a.t} delay={i * 80}>
              <Link
                href={a.href}
                className="group relative block h-full p-6 no-underline hover:bg-paper-2 transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-5 right-5 micro text-ink/30 tabular"
                >
                  0{i + 1}
                </span>
                <h3 className="text-[15px] font-medium">{a.t}</h3>
                <p className="mt-2 text-[13px] text-ink-soft min-h-12">{a.d}</p>
                <span className="micro text-ember inline-flex items-center gap-1">
                  {a.label}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-grid" aria-hidden="true" />
          <div className="absolute inset-0 wash-ember" aria-hidden="true" />
          <div className="relative">
            <Reveal>
              <p className="micro text-ink-soft">Next cohort — {cohort.start}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">
                Ten seats. Six months.
                <br />
                Your move
                <span className="text-ember animate-blink" aria-hidden="true">
                  _
                </span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-10">
                <BigCta href={cta.href}>{cta.label}</BigCta>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
