/**
 * Content for the /functional-medicine primer page.
 *
 * LumiraPrime program details come from the program's own materials
 * ("LumiraPrime: A More Personal Approach to Healthspan"). NewU facts from
 * newuhydrationlounge.com. Function Health facts from functionhealth.com.
 */

export const biomarkerTicker = [
  "ApoB",
  "Lp(a)",
  "hs-CRP",
  "HbA1c",
  "Fasting insulin",
  "Testosterone",
  "Estradiol",
  "TSH",
  "Free T3",
  "Cortisol",
  "Vitamin D",
  "Ferritin",
  "Omega-3 index",
  "eGFR",
  "ALT",
  "Homocysteine",
  "DHEA-S",
  "IGF-1",
  "Uric acid",
  "B12",
];

export type BiomarkerSystem = {
  name: string;
  count: string;
  markers: string[];
  why: string;
};

export const biomarkerSystems: BiomarkerSystem[] = [
  {
    name: "Heart & Vascular",
    count: "15+",
    markers: ["ApoB", "Lp(a)", "LDL-P", "hs-CRP", "Triglycerides"],
    why: "Cardiovascular disease is still the leading cause of death — and standard panels miss the particles that matter most.",
  },
  {
    name: "Metabolic",
    count: "12+",
    markers: ["HbA1c", "Fasting insulin", "Glucose", "Uric acid", "ALT"],
    why: "Insulin resistance builds silently for a decade before a diagnosis. Caught early, it is largely reversible.",
  },
  {
    name: "Hormones",
    count: "15+",
    markers: ["Testosterone", "Estradiol", "TSH", "Free T3", "Cortisol", "DHEA-S"],
    why: "Energy, sleep, mood, and body composition all route through the endocrine system.",
  },
  {
    name: "Inflammation & Immunity",
    count: "8+",
    markers: ["hs-CRP", "Homocysteine", "Ferritin", "White cell differential"],
    why: "Chronic low-grade inflammation quietly accelerates nearly every disease of aging.",
  },
  {
    name: "Nutrients",
    count: "12+",
    markers: ["Vitamin D", "B12", "Folate", "Magnesium", "Omega-3 index", "Iron"],
    why: "Deficiencies are common, cheap to find, and cheap to fix — the lowest-hanging fruit in preventive health.",
  },
  {
    name: "Organs & Longevity",
    count: "15+",
    markers: ["eGFR", "Cystatin C", "Liver enzymes", "IGF-1", "Thyroid antibodies"],
    why: "Kidney, liver, and thyroid function set the boundaries of every other protocol you run.",
  },
];

export const pillars = [
  {
    title: "Root cause, not symptom",
    body: "Instead of naming the symptom and matching it to a prescription, functional medicine asks why it appeared — and works backward through sleep, nutrition, stress, hormones, and metabolic health to find the answer.",
  },
  {
    title: "Test, don't guess",
    body: "A modern workup measures 100+ biomarkers across the body's major systems, then retests on a cadence. Decisions follow the data, and progress is measured rather than assumed.",
  },
  {
    title: "You are a system",
    body: "Gut health shapes immunity; sleep shapes hormones; hormones shape metabolism. Practitioners map these connections instead of treating each lane in isolation.",
  },
  {
    title: "The plan is the medicine",
    body: "Protocols lean on the levers with the strongest evidence — training, nutrition, sleep, stress physiology, and targeted therapeutics — with a clinician adjusting as your data changes.",
  },
];

export type FeaturedProgram = {
  name: string;
  kicker: string;
  tagline: string;
  description: string[];
  highlights: { label: string; value: string }[];
  links: { label: string; href: string; external: boolean }[];
};

export const featuredPrograms: FeaturedProgram[] = [
  {
    name: "LumiraPrime",
    kicker: "Concierge healthspan program",
    tagline: "A personal advisory office for your biology.",
    description: [
      "LumiraPrime is a concierge precision-health and longevity program for people who want to understand their health deeply, make better-informed decisions, and remain capable for longer. Rather than handing you another stack of reports, it operates as a personal health advisory team — organizing the data, setting priorities, coordinating care, and translating findings into a practical plan.",
      "The program runs as a managed year, not a single appointment. It opens with comprehensive assessment — medical history, advanced laboratory testing, genetics, body composition, and wearable data — reviewed through a clinical intelligence process and presented in an Executive Health Briefing. From there, the LumiraPrime team supports implementation through scheduled strategy sessions, progress monitoring, protocol adjustments, follow-up testing, and coordination with physicians, specialists, trainers, and nutrition professionals.",
    ],
    highlights: [
      { label: "Method", value: "Decode → Map → Optimize → Extend → Prime" },
      { label: "Structure", value: "Annual membership, managed year-round" },
      { label: "Delivered by", value: "A coordinated clinical advisory team" },
      { label: "Designed for", value: "Executives, founders, and professionals" },
    ],
    links: [
      { label: "lumiraprime.com", href: "https://lumiraprime.com", external: true },
      { label: "Meet the founder", href: "/coaches", external: false },
    ],
  },
  {
    name: "NewU Hydration Lounge",
    kicker: "Medical IV, hormone & weight optimization",
    tagline: "Clinic-grade optimization, lounge-level comfort.",
    description: [
      "NewU Hydration Lounge is a medical-led IV nutrition, weight, and hormonal optimization facility in San Jose. Its physician-supervised services span IV vitamin therapy, bio-identical hormone optimization, medical weight management, and micronutrient testing — a practical entry point into data-driven wellness care.",
      "The practice pairs clinical rigor with accessibility: licensed clinicians administer every treatment, and programs are personalized from an intake and labs rather than a set menu.",
    ],
    highlights: [
      { label: "Location", value: "393 Blossom Hill Rd #290, San Jose" },
      { label: "Services", value: "IV therapy · Hormones · Weight · Testing" },
      { label: "Supervision", value: "Medical-led, licensed clinicians" },
      { label: "In the directory", value: "IV & Nutrient Lounges" },
    ],
    links: [
      { label: "newuhydrationlounge.com", href: "https://newuhydrationlounge.com", external: true },
      { label: "View the listing", href: "/business/newu-hydration-lounge", external: false },
    ],
  },
];

export const lumiraStages = [
  {
    stage: "Decode",
    body: "Build a detailed understanding of the client through medical history, advanced laboratory testing, genetics, lifestyle patterns, body composition, and wearables.",
  },
  {
    stage: "Map",
    body: "Bring the findings together to identify health risks, performance constraints, biological patterns, and opportunities for improvement.",
  },
  {
    stage: "Optimize",
    body: "Develop a personalized protocol across metabolic health, nutrition, fitness, sleep, hormonal balance, cardiovascular health, cognition, and gut health.",
  },
  {
    stage: "Extend",
    body: "Monitor progress, repeat relevant assessments, and refine the strategy as health, goals, and circumstances evolve.",
  },
  {
    stage: "Prime",
    body: "Create a sustainable long-term system that maintains energy, resilience, physical capability, and quality of life.",
  },
];

export const functionalFaq = [
  {
    q: "Is functional medicine a replacement for my doctor?",
    a: "No. The best programs coordinate with your primary care physician and specialists. Think of it as a deeper, more proactive layer on top of conventional care — not a substitute for it.",
  },
  {
    q: "What does testing actually involve?",
    a: "Typically a comprehensive blood draw covering 100+ biomarkers, sometimes extended with body-composition scans, genetics, gut testing, or wearable data. Results are reviewed by a clinician, not just an app.",
  },
  {
    q: "How much does it cost?",
    a: "The range is wide: national lab-testing memberships start around $365 a year, local clinic programs commonly run from a few hundred dollars a month, and full concierge programs are priced like a personal advisory service. Most practices in our directory offer consultations to scope the right level.",
  },
  {
    q: "How do I choose between a program and a clinic?",
    a: "If you want testing plus self-directed insight, a lab membership is a strong start. If you want a clinician managing protocols, choose a local functional or longevity clinic. If you want the whole thing run for you — testing, strategy, coordination — that's what concierge programs like LumiraPrime are built for.",
  },
];
