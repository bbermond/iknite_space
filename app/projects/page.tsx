import type { Metadata } from "next";
import Link from "next/link";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { MediaSlot } from "@/components/media-slot";
import { CtaButton } from "@/components/cta";
import { Section, PlusCorners } from "@/components/section";
import { site } from "@/content/site";
import { projects, repoHighlights } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects & Talent",
  description:
    "Team projects, public repositories, and documented workflows from the Iknite Space accelerator in Buea — evidence you can review before meeting the people behind it.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Reveal>
            <p className="micro inline-flex items-center gap-2 border hairline-strong bg-paper px-3 py-2">
              <span className="inline-block w-2 h-2 bg-ember" aria-hidden="true" />
              Projects &amp; talent — the public record
            </p>
          </Reveal>

          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight max-w-[17ch]">
            <Decode text="Proof," />
            <br />
            <Decode text="not promises." />
          </h1>

          <Reveal delay={150}>
            <p className="mt-6 max-w-[54ch] text-[15px] text-ink-soft">
              A certificate says a course was finished. We publish the work
              instead — team projects, public repositories, and the workflow
              that produced them — so you can judge the evidence yourself.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Team projects ────────────────────────────────────── */}
      <Section label="Team projects" index="01">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[24ch]">
              Scoped, sprinted, reviewed — by cohort teams.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[13px] text-ink-soft max-w-[40ch]">
              Each case study documents the problem, the approach, and how the
              team actually worked — reviewed with the teams before publishing.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full no-underline border hairline hover:border-ink transition-colors"
              >
                <MediaSlot
                  slot={p.media}
                  alt={`${p.name} — ${p.oneLiner}`}
                  caption={`${p.cohort} team project`}
                  aspect="aspect-[4/3]"
                  className="border-0 border-b hairline"
                />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 micro text-ink-soft">
                    <span>{p.cohort}</span>
                    <span className="text-ember" aria-hidden="true">/</span>
                    <span className="border hairline-strong px-2 py-0.5">{p.status}</span>
                  </div>
                  <h3 className="mt-3 text-[15px] font-medium group-hover:text-ember transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[13px] text-ink-soft">{p.oneLiner}</p>
                  <span className="mt-4 micro text-ember inline-flex items-center gap-1">
                    Case study
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Engineering footprint ────────────────────────────── */}
      <Section label="Engineering footprint" pattern="squares" index="02">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight max-w-[20ch]">
                The work lives in public repositories.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[14px] text-ink-soft max-w-[44ch]">
                Trainee projects sit alongside Iknite&apos;s own engineering and
                open-source work — classified honestly, so you always know what
                you are looking at.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 border hairline-strong px-5 py-3 micro font-medium no-underline invert-hover"
              >
                github.com/Iknite-Space
                <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={100}>
              <div className="overflow-x-auto">
                <table className="w-full border hairline text-left">
                  <thead>
                    <tr className="border-b hairline">
                      <th scope="col" className="p-4 micro text-ink-soft font-normal">
                        Repository
                      </th>
                      <th scope="col" className="p-4 micro text-ink-soft font-normal">
                        Classification
                      </th>
                      <th scope="col" className="p-4 micro text-ink-soft font-normal">
                        Language
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y [&>tr]:hairline">
                    {repoHighlights.map((repo) => (
                      <tr key={repo.name} className="hover:bg-paper-2 transition-colors">
                        <td className="p-4 text-[13px] font-medium">{repo.name}</td>
                        <td className="p-4 text-[13px] text-ink-soft">{repo.kind}</td>
                        <td className="p-4 micro text-ink-soft">{repo.lang}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── For employers ────────────────────────────────────── */}
      <Section label="For employers" pattern="dots" index="03">
        <div className="relative border hairline wash-ember-strong p-8 sm:p-14">
          <PlusCorners />
          <div className="max-w-[58ch]">
            <Reveal>
              <p className="micro text-ember mb-4">Hire on evidence</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl sm:text-4xl font-medium leading-tight">
                Review how the team worked. Then meet them.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[14px] text-ink-soft">
                Every case study shows the process behind the product — scoping,
                sprints, code review, demos. Start there, then let us set up
                introductions that fit your needs. Talent profiles are published
                with each trainee&apos;s consent as cohorts complete.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7">
                <CtaButton href="/partner#hire" variant="primary">
                  Meet talent
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
