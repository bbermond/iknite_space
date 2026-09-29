import Link from "next/link";
import { Decode } from "@/components/decode";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { MediaSlot } from "@/components/media-slot";
import { CtaButton } from "@/components/cta";
import { Section } from "@/components/section";
import { OrganizationJsonLd } from "@/components/json-ld";
import { BigCta } from "@/components/big-cta";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { Track, TrackWord } from "@/components/track";
import { StatementBanner } from "@/components/banner";
import { PartnerLogos } from "@/components/partner-logos";
import { cohort, primaryCta, statusLine } from "@/content/site";
import { tracks, type TrackContent } from "@/content/tracks";
import { projects } from "@/content/projects";

/* Sections that read differently through each lens are written once as a
   function of the track and rendered twice — see components/track.tsx.
   Anything not wrapped in <Track> is true of the whole programme. */

function HeroLede({ t }: { t: TrackContent }) {
  return <p className="mt-6 max-w-[54ch] text-[15px] text-ink-soft">{t.heroLede}</p>;
}

function Doors({ t }: { t: TrackContent }) {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-10 grid sm:grid-cols-2 sm:divide-x divide-y sm:divide-y-0 [&>a]:hairline">
      <Link
        href="/apply"
        className="group flex items-center justify-between gap-4 py-5 sm:pr-8 no-underline hover:bg-paper-2 transition-colors"
      >
        <span>
          <span className="micro text-ember block">{t.doorTrainee.eyebrow}</span>
          <span className="text-[15px] font-medium">{t.doorTrainee.title}</span>
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
          <span className="micro text-ember block">{t.doorEmployer.eyebrow}</span>
          <span className="text-[15px] font-medium">{t.doorEmployer.title}</span>
        </span>
        <span className="micro text-ink-soft group-hover:text-ember transition-colors whitespace-nowrap">
          Why hire from us <span aria-hidden="true">↓</span>
        </span>
      </Link>
    </div>
  );
}

function GapCopy({ t }: { t: TrackContent }) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <Reveal>
        <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch]">
          {t.gap.headline}
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div className="text-[14px] text-ink-soft space-y-4 max-w-[52ch]">
          <p>{t.gap.body}</p>
          <p className="text-ink">
            Iknite Space closes that gap before you enter a professional team,
            not after.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function GapCards({ t }: { t: TrackContent }) {
  return (
    <div className="mt-14 grid sm:grid-cols-3 border hairline divide-y sm:divide-y-0 sm:divide-x [&>div]:hairline">
      {t.gap.cards.map((item, i) => (
        <Reveal key={item.n} delay={i * 100} className="p-6">
          <span className="micro text-ember">[{item.n}]</span>
          <h3 className="mt-3 text-[15px] font-medium">{item.t}</h3>
          <p className="mt-2 text-[13px] text-ink-soft">{item.d}</p>
        </Reveal>
      ))}
    </div>
  );
}

function AcceleratorPanel({ t }: { t: TrackContent }) {
  return (
    <div className="grid md:grid-cols-12 gap-10">
      <div className="md:col-span-5">
        <Reveal>
          <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
            {t.accelerator.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 text-[14px] text-ink-soft max-w-[44ch]">
            {t.accelerator.body}
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
          {t.stats.map((s) => (
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
          {t.learningModel.map((step, i) => (
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
  );
}

function HireCopy({ t }: { t: TrackContent }) {
  return (
    <div>
      <Reveal>
        <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
          {t.hire.headline}
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-5 text-[14px] text-ink-soft space-y-4 max-w-[52ch]">
          <p>{t.hire.lede}</p>
          <p className="text-ink">{t.hire.body}</p>
        </div>
      </Reveal>
      <Reveal delay={200}>
        <div className="mt-7 flex flex-wrap gap-3">
          <CtaButton href="/hire" variant="ember">
            Hire or work with us
          </CtaButton>
          <CtaButton href="/projects" variant="ghost">
            See their work
          </CtaButton>
        </div>
      </Reveal>
    </div>
  );
}

function HireCards({ t }: { t: TrackContent }) {
  return (
    <div className="grid grid-cols-2 border hairline divide-x divide-y [&>div]:hairline content-start">
      {t.hire.cards.map((item, i) => (
        <Reveal key={item.t} delay={i * 90} className="p-5 sm:p-6 bg-paper">
          <span className="micro text-ember tabular">
            [{String(i + 1).padStart(2, "0")}]
          </span>
          <h3 className="mt-2 text-[14px] font-medium">{item.t}</h3>
          <p className="mt-1.5 text-[13px] text-ink-soft">{item.d}</p>
        </Reveal>
      ))}
    </div>
  );
}

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
            <Track
              code={<HeroLede t={tracks.code} />}
              design={<HeroLede t={tracks.design} />}
            />
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
        <Track code={<Doors t={tracks.code} />} design={<Doors t={tracks.design} />} />
      </div>

      <Track
        code={<Marquee items={tracks.code.ticker} />}
        design={<Marquee items={tracks.design.ticker} />}
      />

      {/* ── The gap ──────────────────────────────────────────── */}
      <Section label="The gap" pattern="squares" index="01">
        <Track code={<GapCopy t={tracks.code} />} design={<GapCopy t={tracks.design} />} />
        <Track code={<GapCards t={tracks.code} />} design={<GapCards t={tracks.design} />} />
      </Section>

      {/* ── The accelerator ──────────────────────────────────── */}
      <Section label="The accelerator" index="02">
        <Track
          code={<AcceleratorPanel t={tracks.code} />}
          design={<AcceleratorPanel t={tracks.design} />}
        />
      </Section>

      {/* ── Band: what the switch actually switches ──────────── */}
      <StatementBanner
        tone="gradient"
        eyebrow="One programme, two crafts"
        headline={
          <>
            Engineers and designers train in the same cohort — because
            that&apos;s how they&apos;ll work.
          </>
        }
        body="Same six months, same piscine, same mentors, same team projects. Designers sit with the engineers building their work, and engineers ship against real design. Switch the lens in the header to read the programme through either craft."
        cta={{ href: "/accelerator", label: "How the program works" }}
        facts={[
          { k: "Cohort", v: cohort.name },
          { k: "Starts", v: cohort.start },
          { k: "Where", v: cohort.location },
          { k: "Seats", v: cohort.seats },
        ]}
      />

      {/* ── Proof ────────────────────────────────────────────── */}
      <Section label="Proof of work" pattern="dots" index="03">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[22ch]">
              <TrackWord
                code={tracks.code.proofHeadline}
                design={tracks.design.proofHeadline}
              />
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
      <Section
        label="Why hire from Iknite Space"
        index="04"
        id="hire"
        pattern="squares"
        className="scroll-mt-16"
      >
        <div className="grid md:grid-cols-2 gap-10">
          <Track code={<HireCopy t={tracks.code} />} design={<HireCopy t={tracks.design} />} />
          <Track code={<HireCards t={tracks.code} />} design={<HireCards t={tracks.design} />} />
        </div>
      </Section>

      {/* ── The wider Space ──────────────────────────────────── */}
      <StatementBanner
        tone="spectrum"
        eyebrow="We are building"
        headline="A home for talent, founders, and technology ventures in Cameroon."
        body="The accelerator is the operating foundation. The next phase is a reliable physical environment in Buea — training rooms, work areas, events, and space where product teams and startups grow together. We announce facilities when they open, not before."
        cta={{ href: "/about", label: "The vision" }}
      />

      {/* ── Partners ─────────────────────────────────────────── */}
      <Section label="Partners" index="05" pattern="stripes-h">
        <div className="max-w-[52ch] mb-10">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-medium leading-tight">
              We don&apos;t build this alone.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-[14px] text-ink-soft">
              Organisations working with Iknite Space across studio work,
              community, and events in Buea.
            </p>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <PartnerLogos />
        </Reveal>
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
              d: "Recruit a graduate, embed talent, or outsource a build.",
              href: "/hire",
              label: "Work with us",
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
                  <span
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t hairline">
        <div className="absolute inset-0 dot-grid" aria-hidden="true" />
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-20 text-center relative">
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
