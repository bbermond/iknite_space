import type { Metadata } from "next";
import Link from "next/link";
import { Section, PlusCorners } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { BigCta } from "@/components/big-cta";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How FindWellness turns 22,000+ Google and Yelp reviews into a clear, rankable directory — research, compare, book directly. No pay-to-rank, ever.",
};

const STEPS = [
  {
    step: "01",
    title: "We do the research",
    body: "Before a practice appears in the directory, the research desk maps it against verified Google and Yelp ratings, review depth, the services it actually offers, clinical credentials, and whether it discloses pricing. More than 22,000 reviews have gone through that process so far, and the data is refreshed continuously in our research database — so a listing reflects how a practice performs today, not the year it opened.",
  },
  {
    step: "02",
    title: "You compare with clarity",
    body: "Every listing carries the same clean brief: what the practice does, what patients consistently say, how it prices, and how to reach it. Because the format never changes, comparing three IV lounges or five med spas takes minutes instead of an evening of open tabs. No sponsored slots interrupt the list, and nothing about the order is for sale.",
  },
  {
    step: "03",
    title: "You book directly",
    body: "Once you have chosen, we hand you straight to the practice — its website, its phone number, its front desk. FindWellness never sits between you and your provider: no booking fees, no lead reselling, no middleman. Your relationship belongs to you and the clinic from the very first call.",
  },
];

const FACTORS = [
  { factor: "Rating", detail: "Bayesian-smoothed Google & Yelp averages" },
  { factor: "Review depth", detail: "How many patients stand behind the number" },
  { factor: "Service breadth", detail: "The range of care actually offered" },
  { factor: "Pricing transparency", detail: "Whether costs are disclosed up front" },
];

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is FindWellness free?",
    a: "Yes. Browsing the directory, reading research briefs, and contacting practices costs nothing and requires no account. Standard listings are free for practices too.",
  },
  {
    q: "Do practices pay for placement?",
    a: "No. Directory order is computed from rating, review depth, service breadth, and pricing transparency, and featured placements are chosen by editors. There is no pay-to-rank and no sponsored slot anywhere on the site.",
  },
  {
    q: "How do I claim or update a listing?",
    a: (
      <>
        Use the form on the{" "}
        <Link href="/for-businesses" className="text-fern">
          for-businesses page
        </Link>{" "}
        to claim your listing or request a new one. For a quick correction — a
        changed phone number, a closed location — the{" "}
        <Link href="/contact" className="text-fern">
          contact page
        </Link>{" "}
        works just as well.
      </>
    ),
  },
  {
    q: "How are featured clinics chosen?",
    a: "By editors, on merit: sustained ratings, deep review histories, breadth of service, and honest pricing. Featured placement is curated, never sold, and the picks are revisited as the data changes.",
  },
  {
    q: "Do you offer medical advice?",
    a: "No. FindWellness is educational only. Nothing on this site is medical advice, and no listing is a clinical endorsement — decisions about treatment belong with you and a licensed clinician.",
  },
  {
    q: "How current is the data?",
    a: "Listings live in our research database and are refreshed continuously. Ratings, review counts, services, and pricing-transparency flags are updated as they change, and practices that close are removed.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ---- Header ---- */}
      <div className="relative wash-fern overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid dot-grid-fade opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-16 pb-12">
          <Reveal>
            <p className="micro text-fern mb-4">How it works</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-[18ch]">
              Research, compare, book. In that order.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-[54ch] text-ink-soft text-[15px] sm:text-base">
              What happens between your first search and your first
              appointment — and how the rankings underneath it actually work.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---- [01] The three steps ---- */}
      <Section label="The three steps" index="01">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} delay={i * 60}>
              <div className="border-t-2 border-fern pt-5 h-full">
                <p className="micro text-fern mb-3">Step {item.step}</p>
                <h2 className="display text-xl sm:text-2xl mb-3">{item.title}</h2>
                <p className="text-[14px] text-ink-soft leading-relaxed">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- [02] How rankings work ---- */}
      <Section label="How rankings work" index="02" className="bg-paper-2/50">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <h2 className="display text-2xl sm:text-4xl leading-tight max-w-[20ch]">
              A 4.9 with 300 reviews beats a lone 5.0.
            </h2>
            <div className="prose-fw text-[15px] text-ink-soft mt-6">
              <p>
                Directory order starts with a Bayesian-smoothed rating. In
                plain English: we don&rsquo;t take a star average at face value
                until enough people stand behind it. A practice rated 4.9
                across 300 reviews outranks one with a single 5.0, because
                three hundred consistent opinions tell you more than one
                enthusiastic one. The math simply formalizes that instinct.
              </p>
              <p>
                Featured placements work differently — they are picked by
                hand. Editors curate them on merit, revisit them as the data
                moves, and no practice can pay for one.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative border hairline bg-paper p-7 sm:p-8">
              <PlusCorners />
              <p className="micro text-fern mb-6">The exact factors</p>
              <ul className="space-y-4">
                {FACTORS.map((row) => (
                  <li key={row.factor} className="leader text-[14px]">
                    <span className="font-medium">{row.factor}</span>
                    <span className="micro text-ink-soft">{row.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 pt-6 border-t hairline text-[13px] text-ink-soft leading-relaxed">
                That&rsquo;s the whole formula. Nothing else — not ad spend,
                not relationships, not persistence — moves a practice up the
                list.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- [03] FAQ ---- */}
      <Section label="Questions, answered" index="03">
        <div className="max-w-3xl divide-y divide-ink/15">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 40, 200)} className="py-7 first:pt-0 last:pb-0">
              <h3 className="display text-lg sm:text-xl mb-2">{item.q}</h3>
              <p className="text-[14px] text-ink-soft leading-relaxed max-w-[62ch]">
                {item.a}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <BigCta href="/directory">Start your search</BigCta>
      </Section>
    </>
  );
}
