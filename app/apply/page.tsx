import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta";
import { Section } from "@/components/section";
import { ApplyForm } from "@/components/apply-form";
import { ChecklistCard } from "@/components/graphics";
import { Track } from "@/components/track";
import { cohort, statusLine } from "@/content/site";
import { tracks, type TrackContent } from "@/content/tracks";

const open = cohort.status === "open";

export const metadata: Metadata = {
  title: open ? "Apply" : "Join the waitlist",
  description: open
    ? `Apply to ${cohort.name} — a selective six-month accelerator in ${cohort.location}. Application, essay, prep work, and an in-person interview. Every applicant gets a response.`
    : `Applications for ${cohort.name} are not open right now. Join the waitlist and we will contact you when the next application window opens.`,
};

/** Entry criteria are the one part of the digest that differs by craft. */
function EligibilityList({ t }: { t: TrackContent }) {
  return (
    <ul className="mt-4 space-y-3 text-[13px] text-ink-soft">
      {t.eligibility.map((item) => (
        <li key={item.tag} className="flex gap-3">
          <span className="text-ember" aria-hidden="true">
            +
          </span>
          <span>{item.body}</span>
        </li>
      ))}
      <li className="flex gap-3">
        <span className="text-ember" aria-hidden="true">
          +
        </span>
        <span>
          Applying to the other track? Switch the lens in the header — the
          criteria change with it.
        </span>
      </li>
    </ul>
  );
}

export default function ApplyPage() {
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

          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight max-w-[17ch]">
            <Decode text={open ? "Apply." : "Join the waitlist."} />
          </h1>

          <Reveal delay={150}>
            <p className="mt-6 max-w-[54ch] text-[15px] text-ink-soft">
              {open
                ? `Around ten seats, a written essay, assigned prep work, and an in-person interview in Buea. This is a selective program and the application reflects that — take your time, be specific, and expect a response either way.`
                : `Applications are not open right now. Leave your details below and we will contact you when the next application window opens.`}
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8">
              <CtaButton href="#form" variant="ember">
                {open ? "Start the application" : "Join the waitlist"}
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The window ───────────────────────────────────────── */}
      <Section label="The window" index="01">
        <Reveal>
          <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch]">
            One cohort. One window.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-px bg-ink/10 border hairline">
            {[
              ["Cohort", cohort.name],
              ["Starts", cohort.start],
              ["Location", `${cohort.location} — ${cohort.format.toLowerCase()}`],
              ["Duration", cohort.duration],
              ["Seats", cohort.seats],
              ["Deadline", cohort.applyDeadline ?? "TBA — apply early"],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper p-5">
                <dt className="micro text-ink-soft">{k}</dt>
                <dd className="mt-1 text-[13px]">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-6 border-l-2 border-ember pl-4 text-[13px] text-ink-soft max-w-[52ch]">
            {cohort.responseTime}
          </p>
        </Reveal>
      </Section>

      {/* ── Before you apply ─────────────────────────────────── */}
      <Section label="Before you apply" pattern="squares" index="02">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch]">
              Make sure the program fits your life first.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[14px] text-ink-soft max-w-[52ch]">
              The seats go to people who can commit fully — in person, in
              Buea, every day, for six months. Read the digest below; the
              accelerator page has the full curriculum, selection process,
              and FAQ.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 border hairline divide-y sm:divide-y-0 sm:divide-x [&>div]:hairline">
          <Reveal className="p-6 sm:p-8">
            <h3 className="micro text-ember">Eligibility</h3>
            <Track
              code={<EligibilityList t={tracks.code} />}
              design={<EligibilityList t={tracks.design} />}
            />
          </Reveal>

          <Reveal delay={100} className="p-6 sm:p-8">
            <h3 className="micro text-ember">Commitment</h3>
            <ul className="mt-4 space-y-3 text-[13px] text-ink-soft">
              {[
                "Six months, structured — in person in Buea, daily attendance.",
                "A personal laptop and a GitHub account.",
                "Coursework, team projects, and sprint delivery.",
                "1:1 mentorship sessions every two weeks.",
                "After the program: internship and industry transition pathways — a pathway, not a promise.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-ember" aria-hidden="true">
                    +
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="mt-8">
            <CtaButton href="/accelerator" variant="ghost">
              Full program details
            </CtaButton>
          </div>
        </Reveal>
      </Section>

      {/* ── The process ──────────────────────────────────────── */}
      <Section label="The process" pattern="stripes-h" index="03">
        <Reveal>
          <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch] mb-10">
            Five steps. No black box.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 border hairline divide-y lg:divide-y-0 sm:divide-x [&>*]:hairline">
          {[
            {
              n: "01",
              t: "Apply",
              d: "Submit the form below — your background, your links, and the essay.",
            },
            {
              n: "02",
              t: "Prep work",
              d: "Shortlisted applicants receive assigned preparatory learning to complete.",
            },
            {
              n: "03",
              t: "Interview",
              d: "An in-person conversation in Buea about your goals and readiness.",
            },
            {
              n: "04",
              t: "Piscine",
              d: "Two weeks, sink or swim — a test of passion, not skill.",
            },
            {
              n: "05",
              t: "Decision",
              d: "A clear yes or no. Every applicant gets a response.",
            },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 80} className="p-6">
              <span className="micro text-ember tabular">[{step.n}]</span>
              <h3 className="mt-3 text-[15px] font-medium">{step.t}</h3>
              <p className="mt-2 text-[13px] text-ink-soft">{step.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── The form ─────────────────────────────────────────── */}
      <Section label="The form" index="04" id="form" className="scroll-mt-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
                {open ? `Apply to ${cohort.name}.` : "Join the waitlist."}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[46ch]">
                {open
                  ? "Fields marked * are required. Your data stays with Iknite Space and is used only for this application."
                  : `Applications for ${cohort.name} are not open right now. Leave your name, email, and city — we will contact you when the next window opens.`}
              </p>
            </Reveal>
            {open && (
              <Reveal delay={200}>
                <p className="mt-6 border-l-2 border-ember pl-4 text-[13px] text-ink-soft max-w-[46ch]">
                  <span className="micro text-ink block mb-1">
                    Take the essay seriously
                  </span>
                  It is your voice in the process. Be honest, be specific,
                  and skip the buzzwords.
                </p>
              </Reveal>
            )}
            <Reveal delay={260}>
              <div className="mt-10 hidden md:block">
                <ChecklistCard title="Application review" />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={100}>
              <ApplyForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
