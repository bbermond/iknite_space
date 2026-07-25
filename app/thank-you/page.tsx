import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your submission has reached the FindWellness research desk.",
  robots: { index: false, follow: false },
};

type Copy = {
  kicker: string;
  headline: string;
  body: string;
};

const BY_KIND: Record<string, Copy> = {
  contact: {
    kicker: "Message received",
    headline: "It's in front of the research desk.",
    body: "We reply to every message — usually within a couple of business days. If you sent a correction, thank you twice: it makes the directory better for everyone.",
  },
  business: {
    kicker: "Listing request received",
    headline: "Your practice is in the queue.",
    body: "The research desk reviews every listing request within a few days — mapping your practice against ratings, services, and pricing transparency like every other entry. We'll follow up at the email you provided.",
  },
  coach: {
    kicker: "Application received",
    headline: "The collective will take it from here.",
    body: "Every coach is credential-reviewed before being featured — the collective checks certifications and experience first, then follows up at the email you provided. It's what keeps the roster worth being on.",
  },
};

const DEFAULT_COPY: Copy = {
  kicker: "Submission received",
  headline: "Thank you.",
  body: "Your submission has reached the research desk, and we'll follow up if a reply is needed.",
};

const INVALID_COPY: Copy = {
  kicker: "Submission incomplete",
  headline: "Something was missing.",
  body: "Every submission needs at least a name and a working email address so we can respond. Head back to the form and try again — it takes a minute.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const kind = typeof params.kind === "string" ? params.kind : "";
  const invalid = params.status === "invalid";

  const copy = invalid ? INVALID_COPY : (BY_KIND[kind] ?? DEFAULT_COPY);

  return (
    <div className="relative wash-fern overflow-hidden min-h-[70vh]">
      <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 sm:pt-28 pb-24">
        <Reveal>
          <p className="micro text-fern mb-4">{copy.kicker}</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="display text-4xl sm:text-6xl leading-[1.05] max-w-[16ch]">
            {copy.headline}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-[52ch] text-ink-soft text-[15px] sm:text-base">
            {copy.body}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap gap-3">
            {invalid && (
              <>
                <Link
                  href="/contact"
                  className="micro no-underline bg-fern text-paper border border-fern px-5 py-3 invert-hover"
                >
                  Try the contact form again
                </Link>
                <Link
                  href="/for-businesses#claim"
                  className="micro no-underline border hairline-strong px-5 py-3 invert-hover"
                >
                  Listing request form
                </Link>
              </>
            )}
            <Link
              href="/directory"
              className={`micro no-underline px-5 py-3 ${
                invalid
                  ? "border hairline-strong invert-hover"
                  : "bg-fern text-paper border border-fern invert-hover"
              }`}
            >
              Browse the directory
            </Link>
            <Link
              href="/"
              className="micro no-underline border hairline-strong px-5 py-3 invert-hover"
            >
              Back to home
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
