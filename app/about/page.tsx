import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { MediaSlot } from "@/components/media-slot";
import { CtaButton } from "@/components/cta";
import { Section, PlusCorners } from "@/components/section";
import { Banner } from "@/components/banner";
import { cohort, site, primaryCta } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Iknite Space is a selective tech talent accelerator in Buea, Cameroon — fully owned and operated by Iknite. Where we work, how we operate, our history, and the wider Space we are building.",
};

const operatingPrinciples = [
  {
    n: "01",
    t: "Small cohorts",
    d: "Around ten seats, selected deliberately. Everyone is known, everyone is accountable.",
  },
  {
    n: "02",
    t: "Real projects",
    d: "Work moves through user stories, sprints, and demos — not exercises with answer keys.",
  },
  {
    n: "03",
    t: "Review culture",
    d: "Code, writing, and decisions all pass through review. Feedback is the default, not an event.",
  },
  {
    n: "04",
    t: "Communication as craft",
    d: "Stand-ups, written updates, and public demos are treated as core discipline, not soft extras.",
  },
  {
    n: "05",
    t: "Documented publicly",
    d: "Cohort progress is published as it happens. The record is the proof.",
  },
];

const rhythm = [
  "In-house hackathons",
  "Public demos",
  "The Book Club",
  "Community meetups",
];

const ecosystem = [
  {
    name: "Iknite Space",
    role: "Talent and community — the accelerator today, and the physical environment we are building next.",
  },
  {
    name: "Iknite Studio",
    role: "Product, brand, and software execution — the real project context and working mentors behind the training.",
  },
  {
    name: "Iknite Labs",
    role: "A planned venture-building arm for the ideas and teams that outgrow the program.",
  },
];

const history = [
  {
    date: "2022",
    event: "Iknite Space founded in Buea.",
  },
  {
    date: "Early 2025",
    event:
      "Cohort 04 begins — nine trainees, completing 20+ structured courses in the early phase.",
  },
  {
    date: "Aug 2025",
    event:
      "Cohort 04 completes its training phase after multiple sprint cycles on team projects.",
  },
  {
    date: "Nov 2025",
    event:
      "Cohort 05 selected — ten trainees, with a public call for ten mentors.",
  },
  {
    date: "Feb 2026",
    event:
      "Cohort 05 moves into Domain-Driven Design, Scrum, and Next.js; preparation for the next cohort begins.",
  },
  {
    date: cohort.start,
    event: `${cohort.name} starts in ${cohort.location}.`,
    upcoming: true,
  },
];

const visionFacilities = [
  {
    t: "Reliable power",
    d: "Dependable electricity, including solar — work that doesn't stop when the grid does.",
  },
  {
    t: "High-speed internet",
    d: "Connectivity fit for distributed teams and remote collaboration.",
  },
  {
    t: "Training rooms",
    d: "Dedicated space for cohorts, courses, and workshops.",
  },
  {
    t: "Work areas",
    d: "Focused environments for teams building day to day.",
  },
  {
    t: "Event capacity",
    d: "Room for demos, meetups, and the community that gathers around the work.",
  },
  {
    t: "Startup space",
    d: "A place for product teams and early ventures to grow side by side.",
  },
];

export default function AboutPage() {
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
              {site.tagline}
            </p>
          </Reveal>

          <h1 className="mt-8 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
            <Decode text="About" />
          </h1>

          <Reveal delay={160}>
            <div className="mt-6 max-w-[56ch] space-y-4">
              <p className="text-[16px] sm:text-[18px] leading-relaxed">
                Iknite Space exists because completing a course is not the same
                as contributing to a real product team.
              </p>
              <p className="text-[15px] text-ink-soft">
                The accelerator closes that gap the only way it closes: through
                real work — projects, reviews, sprints, demos — in small
                cohorts, in Buea.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── [01] Where we work ───────────────────────────────── */}
      <Section label="Where we work" index="01">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
                Rooted in Buea. Built to a wider standard.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-5 text-[14px] text-ink-soft space-y-4 max-w-[52ch]">
                <p>
                  We work from Buea, in Cameroon&apos;s South-West — home of
                  the Silicon Mountain ecosystem, where a dense community of
                  developers, designers, and founders has grown around the
                  university town.
                </p>
                <p>
                  Being local is the point: trainees build solutions to
                  problems they can see. But the standard is not local — we
                  train to the workflows of modern professional teams, so the
                  work holds up in distributed and global settings.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <dl className="mt-8 border hairline divide-y [&>div]:hairline max-w-md">
                {[
                  ["Base", site.location],
                  ["Format", `${cohort.format}, daily`],
                  ["Ecosystem", "Silicon Mountain"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 p-4">
                    <dt className="micro text-ink-soft pt-0.5">{k}</dt>
                    <dd className="text-[13px]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <MediaSlot
              slot="about/buea"
              alt="The Iknite Space workspace in Buea"
              caption="The Buea workspace"
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </Section>

      {/* ── [02] How we operate ──────────────────────────────── */}
      <Section label="How we operate" pattern="squares" index="02">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[22ch]">
                Run like a product team, because it is one.
              </h2>
            </Reveal>

            <ol className="mt-8 border hairline divide-y [&>li]:hairline">
              {operatingPrinciples.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.n}
                  delay={i * 70}
                  className="grid grid-cols-[3rem_1fr] gap-4 p-5 hover:bg-paper-2 transition-colors"
                >
                  <span className="micro text-ember tabular pt-1">{p.n}</span>
                  <div>
                    <h3 className="text-[15px] font-medium">{p.t}</h3>
                    <p className="mt-1 text-[13px] text-ink-soft max-w-[56ch]">
                      {p.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={150}>
              <MediaSlot
                slot="community/hackathon"
                alt="Trainees working together during an in-house hackathon"
                caption="In-house hackathon"
                aspect="aspect-[4/3]"
              />
            </Reveal>
            <Reveal delay={230}>
              <div className="relative border hairline p-6 mt-8">
                <PlusCorners />
                <p className="micro text-ember">The rhythm</p>
                <p className="mt-3 text-[13px] text-ink-soft max-w-[44ch]">
                  Around the coursework and sprints, a documented community
                  cadence keeps the work public and the pressure honest:
                </p>
                <ul className="mt-4 divide-y [&>li]:hairline">
                  {rhythm.map((item) => (
                    <li key={item} className="py-3 first:pt-0 last:pb-0 flex items-baseline gap-3">
                      <span className="text-ember" aria-hidden="true">+</span>
                      <span className="text-[13px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── [03] The Iknite ecosystem ────────────────────────── */}
      <Section label="The Iknite ecosystem" index="03">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
              One name, three functions.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[14px] text-ink-soft max-w-[52ch]">
              Iknite Space is fully owned and operated by Iknite. That matters
              practically: the training runs next to real product work, and the
              people reviewing your code build software for a living.
            </p>
          </Reveal>
        </div>

        <div className="border hairline divide-y [&>*]:hairline">
          {ecosystem.map((e, i) => (
            <Reveal
              key={e.name}
              delay={i * 90}
              className="grid sm:grid-cols-[12rem_1fr] gap-2 sm:gap-6 p-5 sm:p-6 hover:bg-paper-2 transition-colors"
            >
              <h3 className="text-[15px] font-medium">
                {e.name}
                {i === 0 && (
                  <span className="micro text-ember ml-3">You are here</span>
                )}
              </h3>
              <p className="text-[13px] text-ink-soft max-w-[62ch]">{e.role}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── [04] History ─────────────────────────────────────── */}
      <Section label="History" pattern="stripes-h" index="04">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
                The record so far.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[36ch]">
                Documented moments, not milestones invented after the fact. The
                full running log lives in our updates.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7">
                <CtaButton href="/insights" variant="ghost">
                  Read the updates
                </CtaButton>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <ol className="border hairline divide-y [&>li]:hairline">
              {history.map((h, i) => (
                <Reveal
                  as="li"
                  key={h.date}
                  delay={i * 60}
                  className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9rem_1fr] gap-4 p-4 sm:px-6 hover:bg-paper-2 transition-colors"
                >
                  <span
                    className={`micro tabular pt-0.5 ${
                      h.upcoming ? "text-ember" : "text-ink-soft"
                    }`}
                  >
                    {h.date}
                  </span>
                  <p className="text-[13px] max-w-[58ch]">
                    {h.event}
                    {h.upcoming && (
                      <span className="micro text-ember ml-3">Next</span>
                    )}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ── [05] The team ────────────────────────────────────── */}
      <Section label="The team" index="05">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
              Real people, published properly.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="text-[14px] text-ink-soft space-y-4 max-w-[52ch]">
              <p>
                Program team and mentor profiles are being published here with
                each person&apos;s consent. Until then, this section stays
                honest: no stock faces, no invented bios.
              </p>
              <p className="text-ink">
                Want to know who you&apos;d be working with? Ask us directly —
                we respond to every message.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Reveal>
            <MediaSlot
              slot="team/mentor-session"
              alt="A mentor and trainee in a working session"
              caption="Mentor session"
              aspect="aspect-[16/10]"
            />
          </Reveal>
          <Reveal delay={100}>
            <MediaSlot
              slot="team/trainees-working"
              alt="Trainees working together at the Buea workspace"
              caption="Trainees at work"
              aspect="aspect-[16/10]"
            />
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-10">
            <CtaButton href="/contact" variant="ghost">
              Contact the team
            </CtaButton>
          </div>
        </Reveal>
      </Section>

      {/* ── [06] The vision ──────────────────────────────────── */}
      {/* The vision is the site's spectrum band, here and on the home
          page — same surface, same statement, wherever it appears. */}
      <Banner tone="spectrum">
        <div className="max-w-[58ch]">
          <Reveal>
            <p className="micro mb-4 opacity-80">
              [06] — The vision · We are building
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight tracking-tight">
              The wider Space: a reliable home for talent and ventures in Buea.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[14px] text-ink-soft">
              The accelerator is the operating foundation. The next phase is
              the physical environment around it — infrastructure that makes
              serious technology work dependable in Buea.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/20 border hairline-strong">
          {visionFacilities.map((f, i) => (
            <Reveal key={f.t} delay={i * 70} className="bg-paper/10 p-5">
              <h3 className="text-[14px] font-medium">{f.t}</h3>
              <p className="mt-2 text-[13px] text-ink-soft">{f.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-[13px] max-w-[58ch]">
            None of this is offered as an available facility today. We announce
            each part when it opens — not before.
          </p>
        </Reveal>
      </Banner>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t hairline">
        <div className="absolute inset-0 dot-grid" aria-hidden="true" />
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-20 text-center relative">
          <div className="relative">
            <Reveal>
              <p className="micro text-ink-soft">
                Next cohort — {cohort.start}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">
                Join the work, or back it
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
                <CtaButton href="/partner" variant="ghost">
                  Partner with us
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
