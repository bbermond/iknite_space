/**
 * Mentor roster — republished from the previous site at the owner's
 * direction (July 2026), with experience details supplied by Iknite.
 * Re-verify current roles and photo consent per docs/PENDING_APPROVAL.md;
 * edit or remove entries here freely — nothing else needs to change.
 *
 * Photos: drop files at public/media/mentors/<slug>.(jpg|png|webp).
 * Until then each card shows a styled placeholder.
 */

export type Mentor = {
  slug: string;
  name: string;
  /** Employer / affiliation as listed at the time of mentoring. */
  org?: string;
  /** Title, where one was given. */
  title?: string;
  /** Short experience summary. */
  bio: string;
};

export const mentors: Mentor[] = [
  {
    slug: "acho-arnold-ewin",
    name: "Acho Arnold Ewin",
    org: "Microsoft",
    bio: "10 years as a full-stack developer — backend in Go, C#, PHP, and TypeScript; Vue.js and React on the frontend.",
  },
  {
    slug: "ian-joyce",
    name: "Ian Joyce",
    org: "The Honest Company",
    bio: "15 years working with data.",
  },
  {
    slug: "margaret-adams",
    name: "Margaret Adams",
    org: "Airship",
    bio: "10 years of experience as a frontend engineer.",
  },
  {
    slug: "mbianou-bradon",
    name: "Mbianou Bradon",
    org: "Zotech Design",
    title: "Head of Engineering",
    bio: "Full-stack engineer across web, mobile, and desktop applications, with 3+ years of experience.",
  },
  {
    slug: "phillip-kang",
    name: "Phillip Kang",
    org: "Duro Labs",
    bio: "Backend and DevOps engineering, 13 years of experience.",
  },
  {
    slug: "eric-williams",
    name: "Eric Williams",
    bio: "9 years of experience across many fields, including full-stack work and application security.",
  },
  {
    slug: "kambang-sinclaire",
    name: "Kambang Sinclaire",
    org: "Fluide Technologies",
    title: "CTO — founder of Kingssoftwares",
    bio: "7+ years of proven expertise designing and building resilient, scalable, high-performing software systems.",
  },
];

export const mentorModel = [
  {
    k: "Cadence",
    v: "1:1 sessions every two weeks, across the full six months",
  },
  { k: "Format", v: "Review work, question decisions, share real-world context" },
  { k: "Who mentors", v: "Working engineers and practitioners — in Cameroon and the diaspora" },
] as const;
