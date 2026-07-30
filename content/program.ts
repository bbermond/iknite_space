/**
 * Accelerator program content — grounded in the July 2026 build brief.
 * Verified operating facts only; unconfirmed items live in docs/PENDING_APPROVAL.md.
 */

export const stats = [
  { value: 6, suffix: " mo", label: "Structured accelerator phase" },
  { value: 10, suffix: "", label: "Seats per cohort, selected" },
  { value: 2, suffix: " wk", label: "Mentor check-in cadence" },
  { value: 20, suffix: "+", label: "Courses completed early-phase (C04)" },
] as const;

export const learningModel = [
  {
    step: "01",
    title: "Discover & select",
    body: "We look for curiosity, discipline, foundational ability, and the willingness to learn by doing. Small cohorts, deliberate selection.",
  },
  {
    step: "02",
    title: "Prepare",
    body: "Selected applicants complete assigned foundational learning and set up the tools and habits the cohort runs on.",
  },
  {
    step: "03",
    title: "Build foundations",
    body: "Core engineering, product, and collaboration concepts — from version control to system structure.",
  },
  {
    step: "04",
    title: "Work in teams",
    body: "Plan solutions, write user stories, define domains and APIs, work in sprints, review code, respond to feedback.",
  },
  {
    step: "05",
    title: "Ship projects",
    body: "Build usable solutions to locally relevant problems. Show the work, the process, and the learning.",
  },
  {
    step: "06",
    title: "Transition",
    body: "Move toward internships, Iknite work, external employment, further specialization, or a founder path where available.",
  },
] as const;

export const curriculum = [
  {
    label: "Foundations",
    items: ["Ubuntu & dev environment", "Git & GitHub", "HTML & CSS", "JavaScript", "NPM"],
  },
  {
    label: "Engineering",
    items: ["Go", "React", "Next.js", "Relational databases", "API design", "Auth & authorization"],
  },
  {
    label: "Systems",
    items: ["Design patterns", "Domain-Driven Design", "Domain boundaries", "API contracts", "Maintainability trade-offs"],
  },
  {
    label: "Delivery",
    items: ["Agile & Scrum", "User stories & sprints", "Linting & testing", "CI/CD with GitHub Actions", "Pull requests & review", "Refactoring"],
  },
  {
    label: "Professional",
    items: ["Product ideation", "UX exposure", "Communication", "Teamwork", "Book Club", "Public demos"],
  },
] as const;

/** Ticker terms for the marquee. */
export const ticker = [
  "GIT",
  "GO",
  "REACT",
  "NEXT.JS",
  "POSTGRES",
  "API CONTRACTS",
  "DDD",
  "SCRUM",
  "CI/CD",
  "CODE REVIEW",
  "USER STORIES",
  "SPRINTS",
  "TESTING",
  "AUTH",
  "REFACTORING",
  "DEMOS",
] as const;

export const commitment = [
  { k: "Piscine", v: "2 weeks, sink or swim — before the program" },
  { k: "Duration", v: "6 months, structured" },
  { k: "Location", v: "Buea, Cameroon — in person, daily" },
  { k: "Cohort size", v: "~10 trainees, selective" },
  { k: "Mentorship", v: "1:1 sessions every two weeks" },
  { k: "Structure", v: "4 months mentored training + 2 months team project" },
  { k: "Equipment", v: "Personal laptop + GitHub account" },
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
      "Four months of mentored, structured training — then two months focused on your team project. Sprints, code review, and demos throughout.",
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

export const faqs = [
  {
    q: "Who is eligible?",
    a: "Graduates of engineering programs in higher institutions or universities, and final-year students on internship from engineering faculties. Credible self-taught learners and career switchers with equivalent foundations are encouraged to apply — tell us your story in the application essay.",
  },
  {
    q: "How long is the program?",
    a: "A two-week piscine, then six months structured as four months of mentored training followed by two months focused on your team project — then a six-month internship into real work.",
  },
  {
    q: "How are trainees selected?",
    a: "Application review (including a short essay on why you want to be a software engineer), assigned preparatory learning, and an in-person interview — then a two-week piscine, a sink-or-swim challenge that tests passion, not existing skill. Cohorts are small — around 10 seats — so selection is competitive.",
  },
  {
    q: "What do I need?",
    a: "A personal laptop, a GitHub account, and the ability to live in Buea and attend in person daily for the duration of the program.",
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
