/**
 * Insights — the program's public record. These entries are rewritten
 * summaries of documented cohort updates (site blog + LinkedIn),
 * dated to the period they cover. Full legacy articles can be migrated
 * into ./insights/ as they are approved — see docs/MEDIA_AND_MIGRATION.md.
 */

export type Insight = {
  slug: string;
  date: string; // YYYY-MM
  displayDate: string;
  title: string;
  tag: "Cohort update" | "Announcement" | "Community";
  summary: string;
  body: string[];
};

export const insights: Insight[] = [
  {
    slug: "cohort-06-september-2026",
    date: "2026-07",
    displayDate: "July 2026",
    title: "Applications open: Cohort 06 starts September 2026",
    tag: "Announcement",
    summary:
      "The next accelerator cohort starts in September in Buea. Ten seats, six months, real team delivery.",
    body: [
      "We are selecting the next cohort of the Iknite Space Tech Talent Accelerator. The program starts in September 2026 in Buea and runs for six months of structured coursework, mentorship, team projects, and delivery discipline.",
      "As with previous cohorts, seats are limited and selection is deliberate: application, assigned preparatory learning, and an in-person conversation. We are looking for curiosity, discipline, and the willingness to learn by doing.",
      "Apply early — we review on a rolling basis and respond to every applicant.",
    ],
  },
  {
    slug: "cohort-05-update-february-2026",
    date: "2026-02",
    displayDate: "February 2026",
    title: "Cohort 05 moves into systems and delivery",
    tag: "Cohort update",
    summary:
      "Four months in: Domain-Driven Design, Scrum workflows, Next.js — and final-project ideation begins.",
    body: [
      "Roughly four months into the program, Cohort 05's core learning moved into Domain-Driven Design, Agile and Scrum workflows, and Next.js.",
      "The next stage: final-project ideation — teams define problems, plan domains, write API contracts, break work into sprints, and begin production-minded implementation.",
      "Preparation for the next cohort is underway in parallel.",
    ],
  },
  {
    slug: "cohort-05-selected-november-2025",
    date: "2025-11",
    displayDate: "November 2025",
    title: "Cohort 05: ten trainees selected, ten mentors sought",
    tag: "Cohort update",
    summary:
      "After application review, interviews, and onboarding, ten trainees joined Cohort 05 — with a public call for mentors.",
    body: [
      "Cohort 05 began with ten trainees selected through application review, interviews, final selection, and onboarding.",
      "Alongside selection, we opened a call for ten mentors — experienced engineers and product practitioners willing to give structured feedback in sessions every two weeks across the six-month program.",
    ],
  },
  {
    slug: "cohort-04-sprints-august-2025",
    date: "2025-08",
    displayDate: "August 2025",
    title: "Cohort 04 closes its training phase shipping in sprints",
    tag: "Cohort update",
    summary:
      "Teams behind Qless, CribConnect, and Auto Link completed multiple sprint cycles as the six-month phase wrapped.",
    body: [
      "By August, several Cohort 04 teams had completed at least four sprint cycles on their projects — Qless, CribConnect, and Auto Link — with reviews, refactoring, and demos along the way.",
      "The cohort reached the end of its six-month structured training period, moving toward internship and transition pathways.",
    ],
  },
  {
    slug: "cohort-04-launch-2025",
    date: "2025-02",
    displayDate: "Early 2025",
    title: "Cohort 04: nine trainees, twenty-plus courses, real teams",
    tag: "Cohort update",
    summary:
      "Nine trainees began the six-month program — completing 20+ structured courses in the early phase before moving into team delivery.",
    body: [
      "Cohort 04 launched with nine trainees. In the early program period the cohort completed more than twenty structured courses while establishing the working habits the program is built on: version control, reviews, and sprint discipline.",
      "The cohort's activities included mentor presentations, West/Central Africa Gophers meetups, Design Meetups, and visits from international guests — exposure that connects Buea's Silicon Mountain ecosystem to the wider engineering world.",
    ],
  },
];
