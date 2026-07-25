import type { Metadata } from "next";
import Link from "next/link";
import { Section, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { BigCta } from "@/components/big-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why FindWellness exists: a curated, data-backed directory of 270+ vetted wellness practices across the South Bay — researched by hand, never pay-to-rank.",
  alternates: { canonical: "/about" },
};

const TRACKED = [
  { factor: "Rating", detail: "Verified Google & Yelp averages" },
  { factor: "Review depth", detail: "How many patients stand behind the number" },
  { factor: "Services", detail: "What each practice actually offers" },
  { factor: "Credentials", detail: "Who is clinically responsible" },
  { factor: "Pricing transparency", detail: "Whether costs are disclosed up front" },
];

const NEXT_UP = [
  {
    href: "/functional-medicine",
    kicker: "The functional medicine primer",
    title: "Root-cause medicine, explained.",
    body: "A plain-English guide to the fastest-growing field in the directory — what a modern biomarker panel covers, and which South Bay programs are pioneering it.",
    cta: "Read the primer →",
  },
  {
    href: "/coaches",
    kicker: "The coach collective",
    title: "A human in your corner.",
    body: "Health consultants, concierge practitioners, fitness coaches, and nutritionists — credentials reviewed before anyone is featured.",
    cta: "Meet the coaches →",
  },
  {
    href: "/eden",
    kicker: "Eden — the knowledge garden",
    title: "The science, before the hype.",
    body: "Briefs on the research reshaping wellness — GLP-1s, NAD+, wearables, cold and heat — and what the evidence actually supports.",
    cta: "Enter the garden →",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---- Header ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 pb-12">
          <Reveal>
            <p className="micro text-fern mb-4">About FindWellness</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-[18ch]">
              The directory the South Bay deserved.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-[54ch] text-ink-soft text-[15px] sm:text-base">
              A curated guide to modern wellness across Silicon Valley&rsquo;s
              South Bay — every practice researched, rated, and organized by
              people who read the reviews so you don&rsquo;t have to.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---- [01] Why we exist ---- */}
      <Section label="Why we exist" index="01">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <h2 className="display text-2xl sm:text-4xl leading-tight max-w-[20ch]">
              Health decisions are high-stakes. Search results were never built
              for them.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-fw text-[15px] text-ink-soft">
              <p>
                Search for a med spa or a hormone clinic and the first page you
                see is shaped by ad budgets and SEO — whoever paid the most or
                optimized hardest, not whoever treats patients best. Ad-driven
                listing sites work the same way: the top placements are sold,
                and it rarely says so.
              </p>
              <p>
                That ordering is tolerable when you&rsquo;re choosing a
                restaurant. It fails completely when the decision involves your
                labs, your hormones, or a needle. Choosing a clinic is a
                high-stakes health decision, and it deserves better inputs than
                an auction.
              </p>
              <p>
                FindWellness is our answer: a curated, data-backed directory of
                270+ vetted practices across 7 categories and 17 South Bay
                cities — built by a research desk, not an ad server.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- [02] The research desk ---- */}
      <Section label="The research desk" index="02" className="bg-paper-2/50">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <h2 className="display text-2xl sm:text-4xl leading-tight max-w-[20ch]">
              One rubric, applied to every practice.
            </h2>
            <div className="prose-fw text-[15px] text-ink-soft mt-6">
              <p>
                Every practice in the directory is mapped against the same
                standard: verified Google and Yelp ratings, review depth, the
                services actually offered, clinical credentials, and whether
                pricing is disclosed before you walk in. More than 22,000
                reviews have been analyzed to date.
              </p>
              <p>
                The directory is not a snapshot. Listings live in our research
                database — Airtable — where each practice carries a quality
                tier and a pricing-transparency flag, and the data is refreshed
                continuously as ratings move, services change, and practices
                open or close.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative border hairline bg-paper p-7 sm:p-8">
              <PlusCorners />
              <p className="micro text-fern mb-6">
                What we track for every practice
              </p>
              <ul className="space-y-4">
                {TRACKED.map((row) => (
                  <li key={row.factor} className="leader text-[14px]">
                    <span className="font-medium">{row.factor}</span>
                    <span className="micro text-ink-soft">{row.detail}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-8 pt-6 border-t hairline grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  { n: "270+", label: "Vetted practices" },
                  { n: "7", label: "Care categories" },
                  { n: "17", label: "South Bay cities" },
                  { n: "22k+", label: "Reviews analyzed" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dd className="display text-2xl sm:text-3xl text-fern tabular">
                      {stat.n}
                    </dd>
                    <dt className="micro text-ink-soft mt-1">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- [03] Independence ---- */}
      <Section label="Independence" index="03">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="display text-2xl sm:text-4xl leading-tight max-w-[22ch]">
              Featured means curated. It has never meant paid.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-fw text-[15px] text-ink-soft mt-6">
              <p>
                No practice can buy its way into a featured placement or a
                higher rank — there is no pay-to-rank anywhere on this site,
                and there never will be. Editors choose featured clinics on
                merit: sustained ratings, deep review histories, breadth of
                service, and honest pricing. Being excellent is the only way
                in.
              </p>
              <p>
                We hold ourselves to the same standard on accuracy. If a
                listing is wrong, out of date, or missing something a patient
                should know, tell us through the{" "}
                <Link href="/contact" className="text-fern">
                  contact page
                </Link>{" "}
                — corrections are welcome, and the research desk reviews every
                one.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- [04] What's next ---- */}
      <Section label="What's next" index="04" className="bg-paper-2/50">
        <div className="grid md:grid-cols-3 gap-5">
          {NEXT_UP.map((item, i) => (
            <Reveal key={item.href} delay={i * 60}>
              <Link
                href={item.href}
                className="relative block border hairline bg-paper p-7 no-underline card-hover h-full"
              >
                <PlusCorners />
                <p className="micro text-fern mb-3">{item.kicker}</p>
                <h3 className="display text-xl text-ink mb-2">{item.title}</h3>
                <p className="text-[13px] text-ink-soft leading-relaxed">
                  {item.body}
                </p>
                <span className="micro text-fern mt-5 inline-block">
                  {item.cta}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <BigCta href="/directory">Browse the directory</BigCta>
      </Section>
    </>
  );
}
