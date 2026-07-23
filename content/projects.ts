/**
 * Trainee project case studies — Cohort 4 team projects documented in
 * public cohort updates. Statuses are honest: these are trainee-built
 * prototypes, not production products. Details flagged for verification
 * live in docs/PENDING_APPROVAL.md.
 */

export type Project = {
  slug: string;
  name: string;
  cohort: string;
  kind: "Trainee project";
  status: "Prototype" | "Concept" | "In development";
  oneLiner: string;
  problem: string;
  approach: string;
  practices: string[];
  /** Media slot key — resolved against /public/media, falls back to styled placeholder. */
  media: string;
};

export const projects: Project[] = [
  {
    slug: "cribconnect",
    name: "CribConnect",
    cohort: "Cohort 04",
    kind: "Trainee project",
    status: "Prototype",
    oneLiner: "Roommate matching based on shared preferences.",
    problem:
      "Finding a compatible roommate in a university town is mostly word-of-mouth and luck. Mismatches cost money and peace of mind.",
    approach:
      "The team scoped a matching flow around shared preferences — budget, habits, location — and built it as a full product slice: domain model, API contract, database, and interface.",
    practices: ["User stories", "Sprint cycles", "Code review", "API design", "Relational data"],
    media: "projects/cribconnect",
  },
  {
    slug: "qless",
    name: "Qless",
    cohort: "Cohort 04",
    kind: "Trainee project",
    status: "Prototype",
    oneLiner: "Service discovery and booking — spend time, not queues.",
    problem:
      "Customers lose hours waiting in line for services that could be booked ahead; small businesses have no simple way to list bookable slots.",
    approach:
      "The team designed a two-sided booking concept: businesses list services and availability, customers discover and reserve. Built through sprint cycles with reviews and demos.",
    practices: ["Domain modeling", "Sprints", "Reviews", "Team planning", "Demos"],
    media: "projects/qless",
  },
  {
    slug: "auto-link",
    name: "Auto Link",
    cohort: "Cohort 04",
    kind: "Trainee project",
    status: "Concept",
    oneLiner: "A Cohort 04 team project — case study in preparation.",
    problem:
      "This project's full write-up — problem, users, and current status — is being documented with the team before publication.",
    approach:
      "Built inside the same team workflow as the other Cohort 04 projects: stories, sprints, version control, and review.",
    practices: ["Sprints", "Version control", "Teamwork"],
    media: "projects/auto-link",
  },
];

/**
 * Curated engineering footprint — public repos on github.com/Iknite-Space,
 * classified honestly. Curation to be confirmed before adding more.
 */
export const repoHighlights = [
  { name: "CribConnect", kind: "Trainee project", lang: "TypeScript" },
  { name: "LegalAid", kind: "Iknite engineering", lang: "Go" },
  { name: "Eneo Alerts", kind: "Iknite engineering", lang: "Go" },
  { name: "Payment libraries", kind: "Open source", lang: "Go" },
  { name: "CI/CD examples", kind: "Learning resource", lang: "YAML" },
] as const;
