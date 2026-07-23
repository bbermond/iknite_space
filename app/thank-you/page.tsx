import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta";
import { PlusCorners } from "@/components/section";
import { cohort } from "@/content/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Submission confirmation — Iknite Space.",
  robots: { index: false, follow: false },
};

/** What happens after an application lands — verified selection steps only. */
const applicationSteps = [
  {
    step: "01",
    title: "Review",
    body: "We read your application and essay in full, on a rolling basis.",
  },
  {
    step: "02",
    title: "Prep work",
    body: "Shortlisted applicants receive assigned preparatory learning.",
  },
  {
    step: "03",
    title: "Interview",
    body: "An in-person conversation in Buea about your goals and readiness.",
  },
] as const;

type View = {
  chip: string;
  heading: string;
  body: string;
  ctas: { href: string; label: string; variant: "ember" | "primary" | "ghost" }[];
  showSteps?: boolean;
};

function resolveView(kind: string, invalid: boolean): View {
  if (invalid) {
    return {
      chip: "Not recorded",
      heading: "Something was missing.",
      body: "Your form arrived without a working email address or a required confirmation, so we didn't record it. Nothing was stored. Go back, complete the missing field, and send it again.",
      ctas: [
        { href: "/apply", label: "Back to the application", variant: "ember" },
        { href: "/contact", label: "Back to contact", variant: "ghost" },
      ],
    };
  }
  switch (kind) {
    case "application":
      return {
        chip: "Application received",
        heading: "Application received.",
        body: `Your application to ${cohort.name} is with the team. ${cohort.responseTime}`,
        ctas: [
          { href: "/accelerator", label: "Revisit the program", variant: "primary" },
          { href: "/insights", label: "Read cohort updates", variant: "ghost" },
        ],
        showSteps: true,
      };
    case "partner":
      return {
        chip: "Message received",
        heading: "We'll be in touch.",
        body: "Your inquiry is with the Iknite team. We reply to every serious message with the concrete next step for your intent — no auto-responders, no runaround.",
        ctas: [
          { href: "/projects", label: "See the work meanwhile", variant: "primary" },
          { href: "/", label: "Back to home", variant: "ghost" },
        ],
      };
    default:
      return {
        chip: "Message received",
        heading: "Message received.",
        body: "Thanks for writing. Your message landed directly with the Iknite team, and we reply by email.",
        ctas: [{ href: "/", label: "Back to home", variant: "primary" }],
      };
  }
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const kind = typeof params.kind === "string" ? params.kind : "contact";
  const invalid = params.status === "invalid";
  const view = resolveView(kind, invalid);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
      <div className="absolute inset-0 wash-ember" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <Reveal>
          <p className="micro inline-flex items-center gap-2 border hairline-strong bg-paper px-3 py-2">
            <span
              className={`inline-block w-2 h-2 ${invalid ? "bg-ink" : "bg-ember animate-blink"}`}
              aria-hidden="true"
            />
            {view.chip}
          </p>
        </Reveal>

        <h1 className="mt-8 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight max-w-[18ch]">
          <Decode text={view.heading} />
        </h1>

        <Reveal delay={120}>
          <p className="mt-6 max-w-[52ch] text-[15px] text-ink-soft">{view.body}</p>
        </Reveal>

        {view.showSteps && (
          <Reveal delay={200}>
            <div className="relative mt-12 border hairline bg-paper/80">
              <PlusCorners />
              <p className="micro text-ink-soft px-5 pt-5 sm:px-6 sm:pt-6">
                What happens next
              </p>
              <ol className="mt-4 grid sm:grid-cols-3 border-t hairline divide-y sm:divide-y-0 sm:divide-x [&>li]:hairline">
                {applicationSteps.map((s) => (
                  <li key={s.step} className="p-5 sm:p-6">
                    <span className="micro text-ember tabular">[{s.step}]</span>
                    <h2 className="mt-3 text-[15px] font-medium">{s.title}</h2>
                    <p className="mt-2 text-[13px] text-ink-soft">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        )}

        <Reveal delay={view.showSteps ? 280 : 200}>
          <div className="mt-10 flex flex-wrap gap-3">
            {view.ctas.map((cta) => (
              <CtaButton key={cta.href} href={cta.href} variant={cta.variant}>
                {cta.label}
              </CtaButton>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
