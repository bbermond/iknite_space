import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Iknite Space collects through this site, why, where it lives, and how to access, correct, or delete your data.",
};

const sections = [
  {
    heading: "What we collect",
    paragraphs: [
      "This site collects only what you type into its forms: accelerator applications, partner interest (mentoring, hiring, sponsoring, events, founders), and contact messages. Each submission carries the fields you filled in — typically your name, email, and the content of your message or application.",
      "We don't run third-party form embeds, ad trackers, or analytics scripts that profile you.",
    ],
  },
  {
    heading: "Why we collect it",
    paragraphs: [
      "Two reasons: running the selection process for the accelerator, and responding to the people who write to us. That's the whole list. We don't use your submission for anything you wouldn't expect from having sent it.",
    ],
  },
  {
    heading: "Where it lives",
    paragraphs: [
      "Submissions are stored on infrastructure under Iknite's control. No third-party form processor sits between you and us — your data lands directly with the team.",
    ],
  },
  {
    heading: "What we never do",
    paragraphs: [
      "We do not sell your data. We do not share it with third parties for marketing. We do not add you to mailing lists you didn't ask for.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      `You can ask us at any time what we hold about you, ask us to correct it, or ask us to delete it. Write to ${site.email} and we'll handle it directly.`,
    ],
  },
  {
    heading: "Who operates this site",
    paragraphs: [
      "This site is operated by Iknite. The formal legal entity line of this policy is pending confirmation and will be updated here once confirmed.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b hairline">
        <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <Reveal>
            <p className="micro text-ink-soft">Legal — plain terms, no fine print</p>
          </Reveal>
          <h1 className="mt-6 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
            <Decode text="Privacy." />
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
              Questions about this policy —{" "}
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
