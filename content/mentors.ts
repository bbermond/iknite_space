/**
 * Mentor roster — republished from the previous site at the owner's
 * direction (July 2026). Affiliations are as listed when each mentor
 * guided a cohort; re-verify current roles, spellings, and photo consent
 * per docs/PENDING_APPROVAL.md, and edit or remove entries here freely —
 * nothing else needs to change.
 *
 * Photos: drop files at public/media/mentors/<slug>.(jpg|png|webp).
 * Until then each card shows a styled placeholder.
 */

export type Mentor = {
  slug: string;
  name: string;
  /** Role / affiliation line as shown on the previous site. */
  role: string;
};

export const mentors: Mentor[] = [
  {
    slug: "acho-arnold-ewin",
    name: "Acho Arnold Ewin",
    role: "Software Engineer — Microsoft",
  },
  {
    slug: "kambang-sinclaire",
    name: "Kambang Sinclaire",
    role: "CTO, Fluide Technologies — founder, Kingssoftwares",
  },
  {
    slug: "ian-joyce",
    name: "Ian Joyce",
    role: "The Honest Company",
  },
  {
    slug: "margaret-adams",
    name: "Margaret Adams",
    role: "Airship",
  },
  {
    slug: "mbianou-bradon",
    name: "Mbianou Bradon",
    role: "Frontend Engineer — Zotech Design",
  },
  {
    slug: "phillip-kang",
    name: "Phillip Kang",
    role: "Duro Labs",
  },
  {
    slug: "eric-williams",
    name: "Eric Williams",
    role: "Engineering mentor",
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
