/**
 * Hire page — the business-facing entry point (also served at the root
 * of hire.iknite.space via proxy.ts).
 *
 * Tone: corporate, calm, and honest. Every claim here is either a
 * documented programme fact or an offer Iknite controls; nothing is a
 * marketplace superlative. Wording that needs owner sign-off is listed
 * in docs/PENDING_APPROVAL.md under "Hire & outsourcing".
 */

export const hireHero = {
  eyebrow: "Work with Iknite",
  headline: "Engineers who already work like a team.",
  lede:
    "Iknite Space trains a small number of engineers through a selective, six-month accelerator — real projects, real team workflows, senior mentors in the loop. Companies work with us three ways: recruit a graduate, embed talent in your team, or hand us a scoped build.",
  /** Programme facts — the same figures published across the site. */
  facts: [
    { k: "Selection", v: "2-week piscine" },
    { k: "Training", v: "4 + 2 months" },
    { k: "Mentorship", v: "1:1, senior-led" },
    { k: "Cohort size", v: "10 seats" },
  ],
} as const;

export type EngagementModel = {
  id: string;
  name: string;
  forWho: string;
  body: string;
  points: string[];
};

export const engagementModels: EngagementModel[] = [
  {
    id: "recruit",
    name: "Recruit a graduate",
    forWho: "For teams hiring full-time",
    body:
      "Hire from the current cohort or our alumni. You interview real people against real work — repositories, reviews, and shipped team projects — not certificates.",
    points: [
      "Full-time roles, on-site or remote",
      "Work samples and project history up front",
      "Direct introductions — no agency layer",
    ],
  },
  {
    id: "embed",
    name: "Embed talent",
    forWho: "For teams that need capacity",
    body:
      "Early-career engineers join your team and your workflow, while Iknite mentorship continues in the background — structured check-ins, code review support, and an escalation line to senior engineers.",
    points: [
      "Your tools, your process, your standups",
      "Continued Iknite mentor oversight",
      "Monthly engagement, clear notice terms",
    ],
  },
  {
    id: "outsource",
    name: "Outsource a build",
    forWho: "For companies with a project",
    body:
      "Bring us a scoped problem. An Iknite team designs and builds it — cohort engineers do the work, senior engineers review it and answer for it. You get one point of contact and a delivery cadence you can plan around.",
    points: [
      "Fixed scope, milestone delivery",
      "Senior review on everything that ships",
      "Weekly demos and written status",
    ],
  },
];

/** The vetting story — how the talent is actually made. */
export const vetting = {
  intro:
    "We won't tell you our people are the top one percent of anything. We'd rather show you how they're selected, how they train, and what they've built — and let you judge.",
  stages: [
    {
      t: "Selected, not enrolled",
      d: "Entry is earned through a two-week piscine — an intensive tryout that filters for persistence and aptitude before the programme begins.",
    },
    {
      t: "Trained on real workflows",
      d: "Four months of structured training, then two months building a product in a team: Git, code review, sprints, stand-ups, APIs, databases, demos.",
    },
    {
      t: "Supervised by working engineers",
      d: "Every trainee has an assigned mentor — a working professional — reviewing their work in structured sessions across all six months.",
    },
    {
      t: "Proven in the open",
      d: "Team projects and engineering work are public. Review the repositories and case studies before you ever talk to us.",
    },
  ],
} as const;

export const hireSteps = [
  {
    t: "Tell us what you need",
    d: "A role, a capacity gap, or a project. The short form below is enough to start — no deck required.",
  },
  {
    t: "We propose the fit",
    d: "Specific people with work samples, or a scoped delivery plan with milestones. If we're not the right fit, we say so.",
  },
  {
    t: "Meet and decide",
    d: "Interview the people. Interrogate the scope. Nothing starts until you're satisfied, and there's no obligation to proceed.",
  },
  {
    t: "Start with oversight",
    d: "Work begins with a clear communication cadence, senior review, and structured check-ins from the Iknite side.",
  },
] as const;

/** IkniteOS — the ecosystem's shipped product, featured as proof of work. */
export const ikniteOs = {
  name: "IkniteOS",
  url: "https://ikniteos.com",
  tagline: "Build a business that knows how to grow.",
  body:
    "IkniteOS is the connected growth platform built by Iknite Studio — the product arm of the Iknite ecosystem. It brings a company's brand, website, marketing, sales, and automation into one system. It is also the standard our talent trains toward: the same ecosystem that teaches our engineers ships product.",
  pillars: [
    { t: "Brand & offer", d: "Positioning and demand generation" },
    { t: "Web & funnels", d: "Conversion-focused web design" },
    { t: "CRM & automation", d: "Lead management and follow-up" },
    { t: "Acquisition", d: "Content, search, and campaigns" },
    { t: "AI visibility", d: "Search and AI answer optimisation" },
    { t: "Growth intelligence", d: "Revenue-focused reporting" },
  ],
} as const;

/** Straight talk — what an engagement is and is not. */
export const straightTalk = {
  are: [
    "A selective accelerator producing early-career engineers with verified team habits",
    "A delivery setup where senior engineers review and answer for the work",
    "A single accountable point of contact in Buea (UTC+1, aligned with European hours)",
    "Public about our projects, our methods, and our limits",
  ],
  areNot: [
    "A marketplace claiming the top 1% of global talent",
    "A body shop renting out senior architects we don't have",
    "The right partner for every project — if we can't do it well, we decline",
    "Interested in an engagement that oversells a person",
  ],
} as const;

export const hireForm = {
  headline: "Start a conversation.",
  body:
    "Tell us what you need in a few lines. A real person replies — with specific people and work samples, or a scoped plan — usually within a few working days.",
  fields: [
    { name: "name", label: "Contact name", type: "text" },
    { name: "email", label: "Work email", type: "email" },
    { name: "company", label: "Company", type: "text" },
  ],
  needOptions: [
    "Recruit a graduate",
    "Embed talent in our team",
    "Outsource a build",
    "Not sure yet — let's talk",
  ],
} as const;
