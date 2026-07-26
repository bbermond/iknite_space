import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta";
import { Section, PlusCorners } from "@/components/section";
import { PartnerIntents } from "@/components/partner-intents";
import { NetworkBanner } from "@/components/graphics";
import { partnerIntents } from "@/content/partner";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Five ways to build with Iknite Space in Buea: mentor a trainee, hire or meet talent, sponsor a cohort, collaborate on an event, or connect as a founder.",
};

export default function PartnerPage() {
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
              Partner — five ways in
            </p>
          </Reveal>

          <h1 className="mt-8 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight max-w-[17ch]">
            <Decode text="Build the pipeline" />
            <br />
            <Decode text="with us." />
          </h1>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[54ch] text-[15px] text-ink-soft">
              The accelerator works because working professionals stay in the
              loop. There are five ways in: mentor a trainee, hire or meet
              talent, sponsor a cohort, collaborate on an event, or talk to us
              as a founder. Each starts with a short form below.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <nav
              aria-label="Ways to partner"
              className="mt-12 grid grid-cols-2 sm:grid-cols-5 border hairline divide-x divide-y sm:divide-y-0 [&>a]:hairline bg-paper/70"
            >
              {partnerIntents.map((intent, i) => (
                <a
                  key={intent.id}
                  href={`#${intent.id}`}
                  className="group p-4 no-underline hover:bg-paper-2 transition-colors"
                >
                  <span className="micro text-ember tabular block">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="mt-1 block text-[13px] group-hover:text-ember transition-colors">
                    {intent.label}
                  </span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ── Talent-flow schematic ────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-5 sm:px-10 pb-16">
        <Reveal>
          <NetworkBanner />
        </Reveal>
      </div>

      {/* ── The five intents ─────────────────────────────────── */}
      <Section label="Ways in" index="01">
        <div className="grid md:grid-cols-12 gap-10 mb-10">
          <Reveal className="md:col-span-7">
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch]">
              Pick your way in. We reply to every serious message.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-[14px] text-ink-soft max-w-[44ch]">
              No third-party embeds, no forms into the void. Every submission
              lands with the Iknite team, and every intent tells you exactly
              what happens next.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <PartnerIntents />
        </Reveal>
      </Section>

      {/* ── Names & logos ────────────────────────────────────── */}
      <Section label="Names & logos" pattern="dots" index="02">
        <div className="relative border hairline wash-ember-strong p-8 sm:p-14">
          <PlusCorners />
          <div className="max-w-[58ch]">
            <Reveal>
              <p className="micro text-ember mb-4">Our policy</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
                A logo here means a working relationship.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[14px] text-ink-soft">
                We publish partner and sponsor names only for current,
                documented relationships — agreed in writing and active today.
                No logo walls, no borrowed credibility. As partnerships are
                formalized, they appear here with what they actually cover.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7">
                <CtaButton href="/contact" variant="primary">
                  Something else? Contact us
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
