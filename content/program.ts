/**
 * Accelerator programme content — grounded in the July 2026 build brief.
 * Verified operating facts only; unconfirmed items live in
 * docs/PENDING_APPROVAL.md.
 *
 * Everything in this file is TRUE OF BOTH TRACKS. Craft-specific copy —
 * curriculum, ticker, stats, learning model, eligibility — lives in
 * content/tracks.ts, keyed by lens. The two files together describe one
 * programme, not two.
 */

import type { TrackContent } from "@/content/tracks";

export const commitment = [
  { k: "Piscine", v: "2 weeks, sink or swim — before the program" },
  { k: "Duration", v: "6 months, structured" },
  { k: "Location", v: "Buea, Cameroon — in person, daily" },
  { k: "Cohort size", v: "~10 trainees, selective" },
  { k: "Mentorship", v: "1:1 sessions every two weeks" },
  { k: "Structure", v: "4 months mentored training + 2 months team project" },
  { k: "After the program", v: "6-month internship & industry transition" },
] as const;

export const selectionProcess = [
  { step: "01", title: "Apply", body: "Submit the application with your background, motivation, and the essay." },
  { step: "02", title: "Selection", body: "Application review, assigned prep work, and an in-person interview." },
  { step: "03", title: "Piscine", body: "A two-week sink-or-swim challenge — a test of passion, not skill." },
  { step: "04", title: "Program", body: "Six months of structured coursework, mentorship, and team delivery." },
  { step: "05", title: "Internship", body: "Six months inside real work — the bridge into industry." },
] as const;

/**
 * The cohort pipeline — powers the interactive diagram on the home hero.
 * Stats are verified program facts; blurbs are the hover-card copy.
 * Identical for both tracks: one cohort moves through one pipeline.
 */
export const pipelineStages = [
  {
    id: "apply",
    num: "01",
    title: "Apply",
    duration: "Rolling",
    statValue: 1,
    statSuffix: "",
    statLabel: "essay that matters most",
    blurb:
      "Background, motivation, and one essay — written by you, in your own words. Every applicant gets a response.",
  },
  {
    id: "selection",
    num: "02",
    title: "Selection",
    duration: "Weeks",
    statValue: 10,
    statSuffix: "",
    statLabel: "seats per cohort",
    blurb:
      "Application review, assigned prep work, and an in-person conversation in Buea. Small on purpose.",
  },
  {
    id: "piscine",
    num: "03",
    title: "Piscine",
    duration: "2 wk",
    statValue: 2,
    statSuffix: " wk",
    statLabel: "sink or swim",
    blurb:
      "Two weeks in the deep end before the program begins. A test of passion and persistence — not of what you already know.",
  },
  {
    id: "program",
    num: "04",
    title: "Program",
    duration: "6 mo",
    statValue: 6,
    statSuffix: " mo",
    statLabel: "4 training + 2 project",
    blurb:
      "Four months of mentored, structured training — then two months focused on your team project. Sprints, critique, code review, and demos throughout.",
  },
  {
    id: "internship",
    num: "05",
    title: "Internship",
    duration: "6 mo",
    statValue: 6,
    statSuffix: " mo",
    statLabel: "of real work",
    blurb:
      "Six months contributing to real projects — the bridge from the program into industry.",
  },
] as const;

export type PipelineStage = (typeof pipelineStages)[number];

/**
 * FAQs. Four answers are identical for both crafts; two — who is
 * eligible, and what you need — are built from the track's own wording
 * so neither lens ever claims the other's entry requirements.
 */
export function getFaqs(track: TrackContent) {
  return [
    {
      q: "Who is eligible?",
      a: `${track.eligibility[0].body} ${track.eligibility[1].body} ${track.eligibility[2].body} Tell us your story in the application essay.`,
    },
    {
      q: "How long is the program?",
      a: "A two-week piscine, then six months structured as four months of mentored training followed by two months focused on your team project — then a six-month internship into real work.",
    },
    {
      q: "How are trainees selected?",
      a: "Application review (including a short essay on why you want to do this work), assigned preparatory learning, and an in-person interview — then a two-week piscine, a sink-or-swim challenge that tests passion, not existing skill. Cohorts are small — around 10 seats — so selection is competitive.",
    },
    {
      q: "What do I need?",
      a: `${track.equipment} And the ability to live in Buea and attend in person daily for the duration of the program.`,
    },
    {
      q: "What does it cost?",
      a: "Cost and funding details for the September 2026 cohort are published with the application. Ask us directly via the contact page if anything is unclear.",
    },
    {
      q: "Is it remote?",
      a: "No. The program is built around in-person collaboration in Buea — teamwork, reviews, and demos happen face to face.",
    },
  ] as const;
}
