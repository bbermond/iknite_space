import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "FindWellness privacy policy, in plain English: what we collect, what we deliberately don't, and how to reach us about your data.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* ---- Header ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 pb-12">
          <Reveal>
            <p className="micro text-fern mb-4">Privacy · Effective July 2026</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-[18ch]">
              A short policy, in plain English.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-[54ch] text-ink-soft text-[15px] sm:text-base">
              FindWellness collects very little, tracks nothing across the
              web, and sells no data. Here is the whole picture.
            </p>
          </Reveal>
        </div>
      </div>

      <Section label="Privacy policy" index="01">
        <Reveal>
          <div className="prose-fw text-[15px] text-ink-soft">
            <h2 className="text-ink">What we collect</h2>
            <p>Three things, and only three:</p>
            <ul>
              <li>
                <strong className="text-ink">Form submissions.</strong> When
                you contact us, request a listing, or apply to the coach
                collective, we receive what you typed — typically your name,
                email address, and the details of your message or practice.
                You choose what to send; nothing is collected from a form you
                don&rsquo;t submit.
              </li>
              <li>
                <strong className="text-ink">A city preference.</strong> If
                you pick a city while browsing, we store that choice in your
                browser&rsquo;s localStorage so the site remembers it next
                time. It never leaves your device, we never see it, and
                clearing your browser data removes it.
              </li>
              <li>
                <strong className="text-ink">Standard server logs.</strong>{" "}
                Like nearly every website, our servers record basic technical
                details of each request — such as IP address, browser type,
                and timestamps — used only to operate and secure the site.
              </li>
            </ul>

            <h2 className="text-ink">What we don&rsquo;t collect</h2>
            <p>
              No advertising trackers. No analytics cookies. No cross-site
              profiles, no fingerprinting, no pixels watching you read. We do
              not sell, rent, or trade personal data — to anyone, for any
              reason.
            </p>

            <h2 className="text-ink">How submissions are used</h2>
            <p>
              We use what you send us to respond to you and to maintain the
              directory — verifying a correction, evaluating a listing
              request, or reviewing a coach application. Submissions are not
              added to marketing lists, and your email is used only for the
              conversation you started.
            </p>

            <h2 className="text-ink">Third-party content</h2>
            <p>
              Ratings and review counts shown in the directory are attributed
              to Google and Yelp and drawn from their public data; those marks
              belong to their owners. Listings also link out to practice
              websites and profiles. Once you leave FindWellness, the privacy
              practices of those sites are their own — this policy covers only
              us.
            </p>

            <h2 className="text-ink">Retention and removal</h2>
            <p>
              We keep form submissions for as long as they are useful for the
              purpose you sent them — an open conversation, an active listing
              request. If you would like a submission deleted, ask through the{" "}
              <Link href="/contact" className="text-fern">
                contact page
              </Link>{" "}
              and we will remove it.
            </p>

            <h2 className="text-ink">Changes to this policy</h2>
            <p>
              If this policy changes, we will update this page and its
              effective date. Since we collect so little, we expect changes to
              be rare and boring.
            </p>

            <h2 className="text-ink">Questions</h2>
            <p>
              Anything unclear? Ask us via the{" "}
              <Link href="/contact" className="text-fern">
                contact page
              </Link>
              . A person reads every message.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
