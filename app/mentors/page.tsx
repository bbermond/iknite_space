import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { MediaSlot } from "@/components/media-slot";
import { CtaButton } from "@/components/cta";
import { BigCta } from "@/components/big-cta";
import { Section, PlusCorners } from "@/components/section";
import { mentors, mentorModel } from "@/content/mentors";
import { cohort } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentors",
  description:
    "Working engineers and designers guide every Iknite Space cohort in structured 1:1 sessions every two weeks — reviewing work, questioning decisions, and sharing real-world context.",
};

export default function MentorsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 pb-16 sm:pt-24">
          <Reveal>
            <p className="micro inline-flex items-center gap-2 border hairline-strong bg-paper px-3 py-2">
              <span className="inline-block w-2 h-2 bg-ember animate-blink" aria-hidden="true" />
              1:1 — every two weeks — six months
            </p>
          </Reveal>

          <h1 className="mt-8 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
            <Decode text="Working practitioners," />
            <br />
            <Decode text="in your corner." />
          </h1>

          <Reveal delay={150}>
            <p className="mt-6 max-w-[52ch] text-[15px] text-ink-soft">
              Every trainee is matched with a mentor for the full program —
              structured sessions every two weeks to review work, question
              decisions, and pressure-test thinking against real-world
              experience.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <dl className="mt-10 grid sm:grid-cols-3 border hairline divide-y sm:divide-y-0 sm:divide-x [&>div]:hairline bg-paper/70">
              {mentorModel.map((m) => (
                <div key={m.k} className="p-4">
                  <dt className="micro text-ink-soft">{m.k}</dt>
                  <dd className="mt-1 text-[13px]">{m.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── The roster ───────────────────────────────────────── */}
      <Section label="The mentors" pattern="dots" index="01">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch]">
              People who ship for a living.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[13px] text-ink-soft max-w-[38ch]">
              Mentors who have guided recent cohorts. Affiliations as listed
              at the time of mentoring; the roster refreshes with each cohort.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 list-none">
          {mentors.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={(i % 4) * 80}>
              <div className="group flex flex-col border hairline hover:border-ink transition-colors h-full">
                <MediaSlot
                  slot={`mentors/${m.slug}`}
                  alt={`${m.name} — Iknite Space mentor`}
                  caption="Mentor"
                  aspect="aspect-square"
                  className="border-0 border-b hairline"
                />
                <div className="p-4 flex-1">
                  <h3 className="text-[14px] font-medium leading-snug">
                    {m.name}
                  </h3>
                  {(m.title || m.org) && (
                    <p className="mt-1 micro text-ember">
                      {[m.title, m.org].filter(Boolean).join(" — ")}
                    </p>
                  )}
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                    {m.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* The open seat — recruiting is part of the roster */}
          <Reveal as="li" delay={320}>
            <a
              href="/partner#mentor"
              className="group relative flex flex-col justify-between border hairline-strong dot-grid p-4 no-underline h-full min-h-[16rem] hover:bg-paper-2 transition-colors"
            >
              <PlusCorners />
              <span className="micro text-ink-soft">
                [{String(mentors.length + 1).padStart(2, "0")}]
              </span>
              <span>
                <span className="block text-[14px] font-medium text-ink">
                  Your name here.
                </span>
                <span className="mt-1 block micro text-ember">
                  Mentor the next cohort{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </span>
            </a>
          </Reveal>
        </ul>
      </Section>

      {/* ── What mentors do ──────────────────────────────────── */}
      <Section label="What mentors actually do" pattern="stripes-h" index="02">
        <div className="grid sm:grid-cols-3 border hairline divide-y sm:divide-y-0 sm:divide-x [&>div]:hairline">
          {[
            {
              n: "A",
              t: "Review the work",
              d: "Code, decisions, and trade-offs get looked at by someone who ships professionally.",
            },
            {
              n: "B",
              t: "Add real context",
              d: "How teams actually plan, disagree, recover, and deliver — beyond what coursework covers.",
            },
            {
              n: "C",
              t: "Guide the path",
              d: "Career direction, specialization, and honest feedback on readiness.",
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

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t hairline">
        <div className="absolute inset-0 dot-grid" aria-hidden="true" />
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-20 relative">
          <div className="relative text-center">
            <Reveal>
              <p className="micro text-ink-soft">
                {cohort.name} — starts {cohort.start}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">
                A few hours a month.
                <br />
                A changed trajectory
                <span className="text-ember animate-blink" aria-hidden="true">
                  _
                </span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-10">
                <BigCta href="/partner#mentor" variant="ink">
                  Become a mentor
                </BigCta>
              </div>
              <div className="mt-4 flex justify-center">
                <CtaButton href="/contact" variant="ghost">
                  Ask a question first
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
