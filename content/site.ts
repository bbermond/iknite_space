/**
 * Global site configuration.
 *
 * This file is the single place to change cohort status, contact details,
 * navigation, and announcement copy. Nothing here is hard-coded into
 * components — edit and redeploy.
 */

export type CohortStatus =
  | "open" // Applications open  → primary CTA: Apply
  | "opening-soon" // Applications opening soon → primary CTA: Join waitlist
  | "waitlist" // Between windows → primary CTA: Join waitlist
  | "closed"; // Applications closed → primary CTA: Join waitlist

export const cohort = {
  status: "open" as CohortStatus,
  /** Displayed everywhere the cohort is referenced. */
  number: "06",
  name: "Cohort 06",
  start: "September 2026",
  location: "Buea, Cameroon",
  format: "In person",
  duration: "6 months",
  seats: "10 seats",
  /** Set to a real date string when confirmed; null renders "TBA". */
  applyDeadline: null as string | null,
  /** Expected response timeline shown on the apply page. */
  responseTime: "We review applications on a rolling basis and respond to every applicant.",
};

export const site = {
  name: "Iknite Space",
  tagline: "Tech Talent Accelerator — Buea, Cameroon",
  description:
    "A selective six-month accelerator in Buea where emerging engineers learn through real projects, mentorship, and real team workflows. Applications open for Cohort 06, starting September 2026.",
  url: "https://iknite.space",
  /**
   * Contact details below are the currently published public ones.
   * Flagged for confirmation in docs/PENDING_APPROVAL.md before launch.
   */
  email: "info@iknite.space",
  phone: "+237 675 834 309",
  location: "Buea, South-West Region, Cameroon",
  social: {
    github: "https://github.com/Iknite-Space",
    linkedin: "https://cm.linkedin.com/company/iknite-space",
    facebook: "https://www.facebook.com/iknite.space",
  },
};

export const nav = [
  { href: "/accelerator", label: "Accelerator" },
  { href: "/projects", label: "Projects" },
  { href: "/partner", label: "Partner" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const;

/** Primary CTA resolves from cohort status — never a dead button. */
export function primaryCta() {
  if (cohort.status === "open") {
    return { href: "/apply", label: `Apply to ${cohort.name}` };
  }
  return { href: "/apply", label: "Join the waitlist" };
}

export function statusLine() {
  switch (cohort.status) {
    case "open":
      return `Applications open — ${cohort.name} starts ${cohort.start}`;
    case "opening-soon":
      return `Applications opening soon — ${cohort.name} starts ${cohort.start}`;
    case "waitlist":
      return `Join the waitlist for ${cohort.name}`;
    case "closed":
      return `Applications closed — join the waitlist for the next cohort`;
  }
}
