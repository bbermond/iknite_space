import type { Metadata } from "next";
import Link from "next/link";
import { Section, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { submitForm } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the FindWellness research desk — listing corrections, partnerships, and press. We reply to every message.",
  alternates: { canonical: "/contact" },
};

const TOPICS = [
  "Listing correction",
  "Add a practice",
  "Partnership",
  "Press",
  "Other",
];

export default function ContactPage() {
  return (
    <>
      {/* ---- Header ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 pb-12">
          <Reveal>
            <p className="micro text-fern mb-4">Contact</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-[16ch]">
              Talk to the research desk.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-[54ch] text-ink-soft text-[15px] sm:text-base">
              Corrections, partnerships, press — every message lands with the
              people who maintain the directory, and we reply to all of it.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---- Form ---- */}
      <Section label="Send a message" index="01">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="prose-fw text-[15px] text-ink-soft">
              <p>
                Spotted an error in a listing? Corrections are the fastest way
                to make the directory better, and the research desk reviews
                every one. Partnership and press inquiries land in the same
                place.
              </p>
            </div>
            <div className="relative border hairline bg-paper p-6 mt-6 max-w-md">
              <PlusCorners />
              <p className="micro text-fern mb-2">Requesting a listing?</p>
              <p className="text-[13px] text-ink-soft leading-relaxed">
                The{" "}
                <Link href="/for-businesses" className="text-fern">
                  for-businesses page
                </Link>{" "}
                has a dedicated form that captures everything the research
                desk needs about your practice — it&rsquo;s the faster route.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <form action={submitForm} className="grid sm:grid-cols-2 gap-5">
              <input type="hidden" name="_kind" value="contact" />
              <div className="sr-only" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div>
                <label htmlFor="contact-name" className="micro text-ink-soft block mb-2">
                  Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="micro text-ink-soft block mb-2">
                  Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-topic" className="micro text-ink-soft block mb-2">
                  Topic
                </label>
                <select id="contact-topic" name="topic" defaultValue="" className="field">
                  <option value="">Select a topic</option>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="micro text-ink-soft block mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="What should the research desk know?"
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="micro bg-fern text-paper px-6 py-3.5 border border-fern invert-hover"
                >
                  Send message
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
