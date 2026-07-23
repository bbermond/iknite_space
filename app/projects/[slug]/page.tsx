import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { MediaSlot } from "@/components/media-slot";
import { CtaButton } from "@/components/cta";
import { Section } from "@/components/section";
import { projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — ${project.cohort} team project`,
    description: project.oneLiner,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 wash-ember" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-14 pb-14 sm:pt-20 sm:pb-16">
          <Reveal>
            <Link
              href="/projects"
              className="micro inline-flex items-center gap-2 no-underline text-ink-soft hover:text-ink transition-colors"
            >
              <span aria-hidden="true">←</span>
              All projects
            </Link>
          </Reveal>

          <h1 className="mt-8 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
            <Decode text={project.name} />
          </h1>

          <Reveal delay={120}>
            <p className="mt-5 max-w-[52ch] text-[15px] text-ink-soft">
              {project.oneLiner}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <dl className="mt-10 grid grid-cols-3 border hairline divide-x [&>div]:hairline bg-paper/70">
              {[
                ["Cohort", project.cohort],
                ["Kind", project.kind],
                ["Status", project.status],
              ].map(([k, v]) => (
                <div key={k} className="p-4">
                  <dt className="micro text-ink-soft">{k}</dt>
                  <dd className="mt-1 text-[13px]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={280}>
            <MediaSlot
              slot={project.media}
              alt={`${project.name} — ${project.oneLiner}`}
              caption={`${project.cohort} team project — ${project.name}`}
              aspect="aspect-[16/9]"
              className="mt-10"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Case study ───────────────────────────────────────── */}
      <Section label="Case study" index="01">
        <div className="border hairline">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x [&>div]:hairline">
            <Reveal className="p-6 sm:p-10">
              <span className="micro text-ember">[A]</span>
              <h2 className="mt-3 text-lg sm:text-xl font-medium">The problem</h2>
              <p className="mt-3 text-[14px] text-ink-soft max-w-[52ch]">
                {project.problem}
              </p>
            </Reveal>
            <Reveal delay={100} className="p-6 sm:p-10">
              <span className="micro text-ember">[B]</span>
              <h2 className="mt-3 text-lg sm:text-xl font-medium">The approach</h2>
              <p className="mt-3 text-[14px] text-ink-soft max-w-[52ch]">
                {project.approach}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="border-t hairline p-6 sm:p-10">
            <span className="micro text-ember">[C]</span>
            <h2 className="mt-3 text-lg sm:text-xl font-medium">
              How the team worked
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.practices.map((practice) => (
                <li key={practice} className="micro border hairline-strong px-3 py-2">
                  {practice}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-5 border hairline bg-paper-2 p-5 sm:p-6 flex gap-4">
            <span className="micro text-ember shrink-0 pt-0.5">Note</span>
            <p className="text-[13px] text-ink-soft max-w-[70ch]">
              Like every project here, {project.name} is a trainee prototype
              built inside the program — published as evidence of how the team
              worked, not as a finished production product. Current status:{" "}
              {project.status}.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ── More projects ────────────────────────────────────── */}
      <Section label="More projects" index="02">
        <div className="grid sm:grid-cols-2 border hairline divide-y sm:divide-y-0 sm:divide-x [&>a]:hairline">
          <Link
            href={`/projects/${prev.slug}`}
            className="group block p-6 no-underline hover:bg-paper-2 transition-colors"
          >
            <span className="micro text-ink-soft">
              <span aria-hidden="true">←</span> Previous
            </span>
            <span className="mt-2 block text-[15px] font-medium group-hover:text-ember transition-colors">
              {prev.name}
            </span>
            <span className="mt-1 block text-[13px] text-ink-soft">
              {prev.oneLiner}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group block p-6 no-underline hover:bg-paper-2 transition-colors sm:text-right"
          >
            <span className="micro text-ink-soft">
              Next <span aria-hidden="true">→</span>
            </span>
            <span className="mt-2 block text-[15px] font-medium group-hover:text-ember transition-colors">
              {next.name}
            </span>
            <span className="mt-1 block text-[13px] text-ink-soft">
              {next.oneLiner}
            </span>
          </Link>
        </div>
      </Section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 py-16 sm:py-20 relative overflow-hidden text-center">
          <div className="absolute inset-0 dot-grid" aria-hidden="true" />
          <div className="absolute inset-0 wash-ember" aria-hidden="true" />
          <div className="relative">
            <Reveal>
              <p className="micro text-ink-soft">Where this leads</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-2xl sm:text-4xl font-medium tracking-tight max-w-[26ch] mx-auto">
                Hiring? Meet the team behind the work. Building? Learn to work
                like this.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <CtaButton href="/partner#hire" variant="primary">
                  Meet talent
                </CtaButton>
                <CtaButton href="/apply" variant="ember">
                  Apply to the program
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
