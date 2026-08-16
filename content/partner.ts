/**
 * Partner page — one page, five intents. Each intent reveals a short,
 * Iknite-controlled form (no third-party embeds).
 */

export type PartnerIntent = {
  id: string;
  label: string;
  headline: string;
  body: string;
  expectation: string;
  fields: { name: string; label: string; type: "text" | "email" | "textarea"; required: boolean }[];
};

export const partnerIntents: PartnerIntent[] = [
  {
    id: "mentor",
    label: "Become a mentor",
    headline: "A few hours a month. A changed trajectory.",
    body: "Mentors meet trainees in structured sessions every two weeks — reviewing work, sharing real-world context, and guiding decisions across the six-month program. Engineers, product practitioners, and designers in Cameroon or the diaspora are welcome.",
    expectation: "We reply with the mentor guide and a short conversation to match you with the cohort.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "background", label: "Your experience (role, stack, years)", type: "textarea", required: true },
    ],
  },
  {
    id: "hire",
    label: "Hire or meet talent",
    headline: "Evaluate evidence, not certificates.",
    body: "Our trainees work with Git, code review, sprints, APIs, databases, and team planning from day one. Review real projects and workflows, then meet the people behind them.",
    expectation: "We reply with available work samples and set up introductions that fit your needs.",
    fields: [
      { name: "name", label: "Contact name", type: "text", required: true },
      { name: "email", label: "Work email", type: "email", required: true },
      { name: "company", label: "Company & roles you hire for", type: "textarea", required: true },
    ],
  },
  {
    id: "sponsor",
    label: "Sponsor a cohort",
    headline: "Fund practical technology capacity in Buea.",
    body: "Sponsorship supports a transparent, documented program: small cohorts, real projects, published updates. Support a cohort, equipment, or the infrastructure of the future Space.",
    expectation: "We reply with the program model, current needs, and reporting approach.",
    fields: [
      { name: "name", label: "Contact name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "interest", label: "What you'd like to support", type: "textarea", required: true },
    ],
  },
  {
    id: "collaborate",
    label: "Collaborate on an event",
    headline: "Meetups, workshops, and open-source — together.",
    body: "We host and join technical meetups, design sessions, and community events in the Silicon Mountain ecosystem. Propose a talk, a workshop, or a collaboration.",
    expectation: "We reply to scope the event and find a date.",
    fields: [
      { name: "name", label: "Contact name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "idea", label: "What do you have in mind?", type: "textarea", required: true },
    ],
  },
  {
    id: "founder",
    label: "Founder / startup",
    headline: "The wider Space is being built. Talk to us early.",
    body: "We are building toward a shared environment for startups and product teams in Buea. Facilities and services will be announced as they open — but conversations with founders start now.",
    expectation: "We reply to learn about your venture and stay in touch as the Space develops.",
    fields: [
      { name: "name", label: "Founder name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "venture", label: "Your venture & what you're looking for", type: "textarea", required: true },
    ],
  },
];
