import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "FindWellness terms of use, in plain English: an educational directory, not medical advice — plus accuracy, acceptable use, and liability.",
};

export default function TermsPage() {
  return (
    <>
      {/* ---- Header ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 pb-12">
          <Reveal>
            <p className="micro text-fern mb-4">Terms · Effective July 2026</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-[16ch]">
              Terms of use.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-[54ch] text-ink-soft text-[15px] sm:text-base">
              The rules of the road for using FindWellness — written to be
              read, not skimmed past. Using the site means you accept them.
            </p>
          </Reveal>
        </div>
      </div>

      <Section label="The terms" index="01">
        <Reveal>
          <div className="prose-fw text-[15px] text-ink-soft">
            <h2 className="text-ink">An informational directory — not medical advice</h2>
            <p>
              FindWellness is an educational directory of wellness practices
              in the South Bay. Nothing on this site is medical advice, a
              diagnosis, or a treatment recommendation, and no listing —
              featured or otherwise — is a clinical endorsement. Decisions
              about your health belong with you and a licensed clinician who
              knows your history. Please see one before starting, stopping, or
              changing any treatment.
            </p>

            <h2 className="text-ink">Accuracy is best-effort</h2>
            <p>
              Our research desk works to keep every listing current, and the
              data is refreshed continuously — but practices change hours,
              prices, services, and locations without telling us. Information
              here is provided as a starting point, not a guarantee. Before
              you book, verify the details that matter with the practice
              directly.
            </p>

            <h2 className="text-ink">Third-party marks and data</h2>
            <p>
              Ratings and review counts are sourced from publicly available
              Google and Yelp data and are attributed as such. Google, Yelp,
              and every practice name on this site are trademarks of their
              respective owners. Their appearance here does not imply
              affiliation with, or endorsement of, FindWellness.
            </p>

            <h2 className="text-ink">Featured placement is editorial</h2>
            <p>
              Featured placements and directory rankings are editorial
              judgments built from data — verified ratings, review depth,
              service breadth, and pricing transparency. They are curated,
              never sold, and no payment can change them.
            </p>

            <h2 className="text-ink">Acceptable use</h2>
            <p>Use the site as a person researching care, or a practice keeping its listing accurate. Don&rsquo;t:</p>
            <ul>
              <li>submit false information through our forms, or impersonate a practice or person;</li>
              <li>scrape, harvest, or republish the directory at scale;</li>
              <li>use the site to spam, harass, or mislead anyone;</li>
              <li>probe, disrupt, or interfere with how the site operates.</li>
            </ul>

            <h2 className="text-ink">Liability, in plain English</h2>
            <p>
              The site is provided as-is. We are not liable for decisions you
              make based on directory information, for the care or conduct of
              any listed practice, or for the content of external sites we
              link to. Your relationship with any provider — clinical,
              financial, or otherwise — is between you and them. Nothing in
              these terms limits rights that applicable law does not allow to
              be limited.
            </p>

            <h2 className="text-ink">Changes</h2>
            <p>
              If these terms change, we will post the update here with a new
              effective date. Continuing to use the site after a change means
              you accept the revised terms.
            </p>

            <h2 className="text-ink">Contact</h2>
            <p>
              Questions about these terms? Reach us through the{" "}
              <Link href="/contact" className="text-fern">
                contact page
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
