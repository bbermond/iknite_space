/**
 * The Coach Collective — content for /coaches.
 *
 * Categories are recruiting rosters, not listings: the collective is forming
 * and no coach profiles exist yet except the featured practitioner. Every
 * factual claim about Judith Kibuh below is verified; do not extend her bio,
 * credentials, or affiliations without a source.
 */

export type CoachCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Example engagement types shown as chips on the category card. */
  offerings: string[];
};

export const coachCategories: CoachCategory[] = [
  {
    slug: "health-consultants",
    name: "Health Consultants & Concierges",
    tagline: "One accountable person for the whole of your health.",
    description:
      "Private-client advisors who run point across your care — coordinating executive physicals, navigating specialists, tracking lab schedules, and managing longevity programs so that no result sits unread and no referral stalls.",
    offerings: [
      "Private-client health advisory",
      "Care navigation & referrals",
      "Executive physical coordination",
      "Longevity program management",
      "Second-opinion research",
    ],
  },
  {
    slug: "fitness-performance",
    name: "Fitness & Performance Coaches",
    tagline: "Training for the next thirty years, not the next thirty days.",
    description:
      "Coaches who program strength, conditioning, and recovery with the rigor of a clinical protocol — for desk-bound professionals, masters athletes, and anyone whose goal is capacity that lasts.",
    offerings: [
      "Strength for longevity",
      "VO2max development blocks",
      "Return-from-injury programming",
      "Masters athlete coaching",
      "Movement & mobility assessment",
    ],
  },
  {
    slug: "nutrition",
    name: "Nutritionists & Dietitians",
    tagline: "Food advice that answers to your labs, not to trends.",
    description:
      "Credentialed nutrition professionals who build eating patterns around your bloodwork, your training, and your actual week — including companion support through GLP-1 therapy, where protein and muscle preservation decide the outcome.",
    offerings: [
      "Metabolic health consults",
      "GLP-1 companion nutrition",
      "Sports fueling plans",
      "Gut health protocols",
      "Body-composition nutrition",
    ],
  },
  {
    slug: "mind-recovery",
    name: "Mind & Recovery",
    tagline: "The quiet half of performance.",
    description:
      "Specialists in the systems that decide whether everything else works: sleep, stress physiology, breath, and the daily behaviors that either hold a plan together or quietly undo it.",
    offerings: [
      "Sleep coaching",
      "Stress physiology & HRV work",
      "Breathwork instruction",
      "Behavior-change coaching",
      "Recovery protocol design",
    ],
  },
];

export type FeaturedCoach = {
  name: string;
  credentials: string;
  title: string;
  location: string;
  focus: string[];
  bio: string[];
  links: { label: string; href: string }[];
};

export const featuredCoach: FeaturedCoach = {
  name: "Judith Kibuh",
  credentials: "AGPCNP",
  title: "Adult-Gerontology Primary Care Nurse Practitioner · Functional & Integrative Medicine",
  location: "San Jose, CA · NewU Hydration Lounge, 393 Blossom Hill Rd #290",
  focus: [
    "Root causes of illness",
    "Hormone optimization",
    "IV hydration therapy",
    "Restoring balance",
    "Wellness-based interventions",
  ],
  bio: [
    "Judith Kibuh is an adult-gerontology primary care nurse practitioner with more than fifteen years of clinical experience and a specialty in functional and integrative medicine. Her starting point is the question most appointments never reach: why. She works to uncover the root causes of illness and restore balance, rather than manage symptoms in isolation.",
    "She is the founder of Lumira Health & Wellness and a partner at NewU Hydration Lounge in San Jose — a medical-led IV nutrition, weight, and hormonal optimization facility on Blossom Hill Road. Her practice centers on IV hydration therapy, hormone optimization, and wellness-based interventions.",
    "Judith also leads LumiraPrime, her concierge healthspan program, profiled in our functional medicine primer — the place to start if you want one clinician overseeing the long arc of your health.",
  ],
  links: [
    { label: "NewU Hydration Lounge", href: "https://newuhydrationlounge.com" },
    { label: "LumiraPrime program", href: "/functional-medicine" },
  ],
};

export const vettingCriteria: { title: string; body: string }[] = [
  {
    title: "Verified credentials & licensure",
    body: "Every license, certification, and credential is checked against the issuing board or certifying body before a coach joins the collective. Lapsed or unverifiable claims end the conversation.",
  },
  {
    title: "Practice history",
    body: "We look for a real body of work — years in practice, the kinds of clients served, and how engagements are structured and priced. New practices are welcome to apply; unproven ones wait.",
  },
  {
    title: "Client references",
    body: "We speak with current and former clients directly about results, communication, and follow-through — the parts of a practice a website cannot show.",
  },
  {
    title: "Scope-of-practice honesty",
    body: "Coaches must be precise about what they do and do not treat, and refer to physicians when a concern is medical. Overreach is the fastest way out of the collective.",
  },
];
