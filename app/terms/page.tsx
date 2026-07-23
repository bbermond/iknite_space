import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Website terms for iknite.space — what this site is, how program terms work, and who owns the content.",
};

const sections = [
  {
    heading: "What this site is",
    paragraphs: [
      "This is an informational website about Iknite Space — the accelerator program, its projects, and how to get involved. Nothing on it is a contract, an offer of employment, or a promise of outcomes.",
    ],
  },
  {
    heading: "Program terms",
    paragraphs: [
      "The full terms of the accelerator — including cost, funding, and commitments — are provided directly to applicants during the selection process. Where anything on this site and those terms differ, the terms provided during selection apply.",
    ],
  },
  {
    heading: "No guarantee of admission",
    paragraphs: [
      "Submitting an application does not guarantee a seat. Cohorts are small and selection is competitive: application review, assigned preparatory learning, and an in-person interview. We do commit to responding to every applicant.",
    ],
  },
  {
    heading: "Content",
    paragraphs: [
      "The text, design, and structure of this site belong to Iknite unless noted otherwise. Trainee project work remains the work of its authors and is presented here as part of the program's public record. Don't republish site content without asking first.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `Questions about these terms go to ${site.email}. We reply to every serious message.`,
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b hairline">
        <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <Reveal>
            <p className="micro text-ink-soft">Legal — short and honest</p>
          </Reveal>
          <h1 className="mt-6 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
            <Decode text="Terms." />
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-10 py-14 sm:py-20">
        <div className="max-w-[62ch] space-y-12">
          {sections.map((s, i) => (
            <Reveal as="section" key={s.heading} delay={i * 60}>
              <h2 className="micro text-ink-soft flex items-center gap-3">
                <span className="text-ember tabular">[0{i + 1}]</span>
                {s.heading}
              </h2>
              <div className="mt-4 space-y-3 text-[14px] text-ink-soft border-l border-ink/10 pl-4">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal delay={sections.length * 60}>
            <p className="micro text-ink-soft border-t hairline pt-6">
              Reach us —{" "}
              <a href={`mailto:${site.email}`} className="text-ink no-underline hover:text-ember transition-colors">
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
}
