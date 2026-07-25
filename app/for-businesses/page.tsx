import type { Metadata } from "next";
import { Section, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { BigCta } from "@/components/big-cta";
import { submitForm } from "@/lib/actions";
import { categories, cities } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "For businesses",
  description:
    "List your practice on FindWellness — the South Bay's curated wellness directory. Standard listings are free, and featured placement is earned, never sold.",
  alternates: { canonical: "/for-businesses" },
};

const INCLUDES = [
  {
    title: "A research-desk brief",
    body: "A plain-English summary of what your practice does and what patients consistently say — written from the data, in the same clean format as every listing.",
  },
  {
    title: "Verified ratings, displayed",
    body: "Your Google and Yelp ratings and review counts, clearly attributed and kept current as they change.",
  },
  {
    title: "Your services, listed",
    body: "The treatments and programs you actually offer, so high-intent patients can match themselves to your practice before they call.",
  },
  {
    title: "Direct contact links",
    body: "Your website, your phone, your front desk. We send patients straight to you — no lead forms, no booking fees, no middleman.",
  },
];

export default function ForBusinessesPage() {
  return (
    <>
      {/* ---- Header ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 pb-12">
          <Reveal>
            <p className="micro text-fern mb-4">For practice owners</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-[16ch]">
              Reach patients who research.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-[54ch] text-ink-soft text-[15px] sm:text-base">
              FindWellness puts your practice in front of South Bay patients
              who compare carefully before they book. Standard listings are
              free — and always will be.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---- [01] The audience ---- */}
      <Section label="The audience" index="01">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <h2 className="display text-2xl sm:text-4xl leading-tight max-w-[20ch]">
              They read everything before they call anyone.
            </h2>
            <div className="prose-fw text-[15px] text-ink-soft mt-6">
              <p>
                The people who use FindWellness are not impulse shoppers. They
                are high-intent, affluent South Bay patients — engineers,
                founders, families — comparing GLP-1 programs, hormone
                protocols, and aesthetics practices the way they compare
                anything else that matters: methodically, against the data.
              </p>
              <p>
                They arrive here because search results and ad-driven listings
                failed them. By the time one of them reaches your front desk,
                they have read your brief, your ratings, and your services —
                and chosen you on purpose. Those are the patients who show up,
                follow through, and stay.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <dl className="grid grid-cols-2 gap-px bg-ink/10 border hairline">
              {[
                { n: "270+", label: "Vetted practices listed" },
                { n: "7", label: "Care categories" },
                { n: "17", label: "South Bay cities covered" },
                { n: "22k+", label: "Reviews analyzed" },
              ].map((stat) => (
                <div key={stat.label} className="bg-paper p-6 sm:p-7">
                  <dd className="display text-3xl sm:text-4xl text-fern tabular">
                    {stat.n}
                  </dd>
                  <dt className="micro text-ink-soft mt-2">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ---- [02] What a listing includes ---- */}
      <Section label="What a listing includes" index="02" className="bg-paper-2/50">
        <Reveal className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="display text-2xl sm:text-4xl max-w-[20ch]">
              Everything a patient needs to choose you.
            </h2>
            <p className="text-ink-soft text-[13px] max-w-[38ch]">
              Every standard listing is free. We do not charge practices to
              appear in the directory.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {INCLUDES.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
              <div className="relative border hairline bg-paper p-7 h-full">
                <PlusCorners />
                <p className="micro text-fern mb-3 tabular">
                  0{i + 1}
                </p>
                <h3 className="display text-xl mb-2">{item.title}</h3>
                <p className="text-[13px] text-ink-soft leading-relaxed">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- [03] Featured placement ---- */}
      <Section label="Featured placement" index="03">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="display text-2xl sm:text-4xl leading-tight max-w-[22ch]">
              Being excellent is the only way in.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-fw text-[15px] text-ink-soft mt-6">
              <p>
                Featured placement on FindWellness is curated by editors, on
                merit — sustained ratings, deep review histories, breadth of
                service, and pricing transparency. It cannot be bought,
                sponsored, or negotiated, and that policy is permanent.
              </p>
              <p>
                The practical advice, then, is simple: take care of patients,
                earn reviews honestly, publish your pricing, and keep your
                listing accurate. The data does the rest — our rankings and
                featured picks follow it wherever it leads.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- [04] Claim or add your practice ---- */}
      <Section id="claim" label="Claim or add your practice" index="04" className="bg-paper-2/50">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <h2 className="display text-2xl sm:text-3xl leading-tight max-w-[18ch]">
              Tell the research desk about your practice.
            </h2>
            <p className="text-[14px] text-ink-soft mt-4 max-w-[44ch] leading-relaxed">
              Whether you are claiming an existing listing or requesting a new
              one, this form goes straight to the people who maintain the
              directory. We review every request within a few days.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <form action={submitForm} className="grid sm:grid-cols-2 gap-5">
              <input type="hidden" name="_kind" value="business" />
              <div className="sr-only" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="biz-practice" className="micro text-ink-soft block mb-2">
                  Practice name *
                </label>
                <input
                  id="biz-practice"
                  name="practice"
                  type="text"
                  required
                  autoComplete="organization"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="biz-name" className="micro text-ink-soft block mb-2">
                  Your name *
                </label>
                <input
                  id="biz-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="biz-email" className="micro text-ink-soft block mb-2">
                  Email *
                </label>
                <input
                  id="biz-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="biz-phone" className="micro text-ink-soft block mb-2">
                  Phone
                </label>
                <input
                  id="biz-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="biz-city" className="micro text-ink-soft block mb-2">
                  City
                </label>
                <select id="biz-city" name="city" defaultValue="" className="field">
                  <option value="">Select a city</option>
                  {cities.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="biz-category" className="micro text-ink-soft block mb-2">
                  Category
                </label>
                <select id="biz-category" name="category" defaultValue="" className="field">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="biz-link" className="micro text-ink-soft block mb-2">
                  Website
                </label>
                <input
                  id="biz-link"
                  name="link"
                  type="url"
                  placeholder="https://"
                  autoComplete="url"
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="biz-note" className="micro text-ink-soft block mb-2">
                  Note
                </label>
                <textarea
                  id="biz-note"
                  name="note"
                  rows={4}
                  placeholder="Anything the research desk should know — services, credentials, what makes your practice different."
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="micro bg-fern text-paper px-6 py-3.5 border border-fern invert-hover"
                >
                  Request your listing
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </Section>

      <Section>
        <BigCta href="/directory">See the directory patients use</BigCta>
      </Section>
    </>
  );
}
