/**
 * Track content — everything the `</>` / `○◺` switch changes.
 *
 * The programme underneath is ONE programme: same cohort, same piscine,
 * same 4 + 2 month structure, same bi-weekly mentorship, same six-month
 * internship, same ~10 seats in Buea. Only the craft differs, so only
 * craft-specific copy lives here. Shared operating facts stay in
 * content/program.ts and content/site.ts and are never duplicated.
 *
 * ⚠ The design track's craft areas (curriculum, tooling, eligibility
 *   wording) mirror standard product-design practice and are pending the
 *   owner's confirmation — see docs/PENDING_APPROVAL.md. No numbers,
 *   outcomes, or cohort facts were invented for it: every figure shown
 *   on the design track is a confirmed programme fact that already
 *   applied to the engineering track.
 */

export const tracks = {
  code: {
    key: "code",
    /** Shown in the switch tooltip and anywhere the lens is named. */
    name: "Code",
    discipline: "Engineering",
    person: "engineer",
    people: "engineers",

    heroLede:
      "Iknite Space is a selective, six-month tech talent accelerator in Buea — where emerging engineers train inside real team systems, and where companies hire juniors who already work like a team.",

    doorTrainee: {
      eyebrow: "For future engineers",
      title: "Train inside a real team",
    },
    doorEmployer: {
      eyebrow: "For employers",
      title: "Hire junior engineers who ship",
    },

    ticker: [
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
    ],

    stats: [
      { value: 6, suffix: " mo", label: "Structured accelerator phase" },
      { value: 10, suffix: "", label: "Seats per cohort, selected" },
      { value: 2, suffix: " wk", label: "Mentor check-in cadence" },
      { value: 20, suffix: "+", label: "Courses completed early-phase (C04)" },
    ],

    gap: {
      headline: "Finishing a course is not the same as being ready for a team.",
      body: "Many talented learners know the tools but have never shipped inside a real workflow — system thinking, code review, sprint discipline, product decisions, work that others must use and maintain.",
      cards: [
        {
          n: "A",
          t: "Courses alone",
          d: "Syntax, small apps, solo work. Knowledge without team context.",
        },
        {
          n: "B",
          t: "The missing layer",
          d: "Reviews, sprints, contracts, trade-offs, communication, delivery.",
        },
        {
          n: "C",
          t: "Team-ready",
          d: "Contributing to real systems with discipline others can rely on.",
        },
      ],
    },

    accelerator: {
      headline: ["Six months.", "Real workflows.", "Small cohort."],
      body: "Four months of mentored, structured training, then two months shipping a team project — the conditions of a real engineering team, before you join one.",
    },

    learningModel: [
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
    ],

    curriculum: [
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
    ],

    proofHeadline: "Trainees don't collect certificates. They ship.",

    hire: {
      headline: "Juniors who arrive already working like a team.",
      lede: "Our engineers complete four months of structured training with assigned mentors, then two months of team-based product development on a real project.",
      body: "By graduation they've worked in collaborative engineering environments, built production-minded software through Git and Agile workflows, and developed the habits modern software teams expect.",
      cards: [
        {
          t: "Git discipline",
          d: "Branches, pull requests, and code review as daily habit — not theory.",
        },
        {
          t: "Agile delivery",
          d: "User stories, sprints, stand-ups, and demos across six months.",
        },
        {
          t: "Team collaboration",
          d: "Four months mentored, two months shipping together on one product.",
        },
        {
          t: "Evidence, not claims",
          d: "Review the projects, the repos, and how each team actually worked.",
        },
      ],
    },

    /* ── /accelerator ─────────────────────────────────────────── */
    acceleratorLede:
      "Six months inside the conditions of a real engineering team: structured coursework, bi-weekly 1:1 mentorship, team projects, and sprint delivery — building work you can show, and habits a team can rely on.",
    audienceHeadline: "For engineers at the start of the climb.",
    audienceBody:
      "The program is built for people who already have foundations and want the team layer on top: workflows, reviews, delivery, and judgment.",
    mentorHeadline: "A working engineer in your corner.",
    mentorBody:
      "Every trainee meets a mentor in structured 1:1 sessions every two weeks across the six months — working engineers and practitioners who review your work, share real-world context, and pressure-test your decisions.",
    toolRequirement: {
      t: "GitHub account",
      d: "Your work lives in version control from day one.",
    },

    eligibility: [
      {
        tag: "Graduates",
        body: "Engineering graduates from higher institutions and universities.",
      },
      {
        tag: "Final year",
        body: "Final-year students on internship from engineering faculties.",
      },
      {
        tag: "Self-taught",
        body: "Credible self-taught learners and career switchers with equivalent foundations.",
      },
    ],

    /* ── /apply ──────────────────────────────────────────────── */
    /** The one application field that differs between the two crafts. */
    workField: {
      name: "github",
      label: "GitHub profile URL",
      placeholder: "https://github.com/username",
      help: "Optional, but encouraged — we look at code, not just claims.",
    },
    educationOptions: [
      "Engineering graduate",
      "Final-year engineering student",
      "Self-taught / career switcher",
      "Other",
    ],
    essayPrompt: "Why do you want to become a software engineer?",

    equipment: "A personal laptop and a GitHub account.",
  },

  design: {
    key: "design",
    name: "Design",
    discipline: "Product design",
    person: "designer",
    people: "designers",

    heroLede:
      "Iknite Space is a selective, six-month tech talent accelerator in Buea — where emerging designers train inside real product teams, and where companies hire juniors who already design work engineers can build.",

    doorTrainee: {
      eyebrow: "For future designers",
      title: "Design inside a real team",
    },
    doorEmployer: {
      eyebrow: "For employers",
      title: "Hire junior designers who ship",
    },

    ticker: [
      "FIGMA",
      "DESIGN SYSTEMS",
      "TYPOGRAPHY",
      "COLOUR & CONTRAST",
      "LAYOUT & GRIDS",
      "USER RESEARCH",
      "USER FLOWS",
      "WIREFRAMES",
      "PROTOTYPING",
      "COMPONENTS",
      "DESIGN TOKENS",
      "ACCESSIBILITY",
      "CRITIQUE",
      "USABILITY TESTING",
      "HANDOFF",
      "CASE STUDIES",
    ],

    stats: [
      { value: 6, suffix: " mo", label: "Structured accelerator phase" },
      { value: 10, suffix: "", label: "Seats per cohort, selected" },
      { value: 2, suffix: " wk", label: "Mentor check-in cadence" },
      { value: 6, suffix: " mo", label: "Internship after the programme" },
    ],

    gap: {
      headline: "A folder of beautiful screens is not the same as being ready for a team.",
      body: "Many talented designers know the tools but have never designed inside a real product — constraints, critique, research, engineering hand-off, work that others must build, extend, and maintain.",
      cards: [
        {
          n: "A",
          t: "Tutorials alone",
          d: "Trends, single screens, solo files. Craft without product context.",
        },
        {
          n: "B",
          t: "The missing layer",
          d: "Research, critique, constraints, systems, accessibility, hand-off.",
        },
        {
          n: "C",
          t: "Team-ready",
          d: "Designing inside real systems, with decisions others can follow.",
        },
      ],
    },

    accelerator: {
      headline: ["Six months.", "Real products.", "Small cohort."],
      body: "Four months of mentored, structured training, then two months designing and shipping a team product — the conditions of a real product team, before you join one.",
    },

    learningModel: [
      {
        step: "01",
        title: "Discover & select",
        body: "We look for curiosity, discipline, an eye that keeps developing, and the willingness to learn by doing. Small cohorts, deliberate selection.",
      },
      {
        step: "02",
        title: "Prepare",
        body: "Selected applicants complete assigned foundational learning and set up the tools and habits the cohort runs on.",
      },
      {
        step: "03",
        title: "Build foundations",
        body: "Core design, product, and collaboration concepts — from typography and layout to systems thinking.",
      },
      {
        step: "04",
        title: "Work in teams",
        body: "Plan solutions, map user flows, define components and states, work in sprints, run critique, respond to feedback.",
      },
      {
        step: "05",
        title: "Ship projects",
        body: "Design usable solutions to locally relevant problems, alongside the engineers building them. Show the work, the process, and the learning.",
      },
      {
        step: "06",
        title: "Transition",
        body: "Move toward internships, Iknite work, external employment, further specialization, or a founder path where available.",
      },
    ],

    curriculum: [
      {
        label: "Foundations",
        items: ["Design fundamentals", "Typography", "Colour & contrast", "Layout & grids", "Figma"],
      },
      {
        label: "Craft",
        items: ["Interface systems", "Components & states", "Prototyping", "Motion basics", "Brand & identity"],
      },
      {
        label: "Research",
        items: ["User interviews", "User flows", "Journey mapping", "Usability testing", "Synthesis"],
      },
      {
        label: "Delivery",
        items: ["Agile & Scrum", "Critique & design review", "Design tokens", "Accessibility & WCAG", "Design–engineering hand-off", "Iteration on feedback"],
      },
      {
        label: "Professional",
        items: ["Product ideation", "Communication", "Teamwork", "Book Club", "Public demos", "Portfolio & case studies"],
      },
    ],

    proofHeadline: "Trainees don't collect mockups. They ship.",

    hire: {
      headline: "Juniors who arrive already designing for a team.",
      lede: "Our designers complete four months of structured training with assigned mentors, then two months of team-based product development on a real project.",
      body: "By graduation they've worked alongside engineers, defended decisions in critique, designed against real constraints and accessibility requirements, and developed the habits modern product teams expect.",
      cards: [
        {
          t: "Systems, not screens",
          d: "Components, states, and tokens others can reuse — not one-off mockups.",
        },
        {
          t: "Research-led",
          d: "Interviews, flows, and usability tests behind the decisions they make.",
        },
        {
          t: "Team collaboration",
          d: "Four months mentored, two months shipping together with engineers.",
        },
        {
          t: "Evidence, not claims",
          d: "Review the case studies, the process, and how each team actually worked.",
        },
      ],
    },

    /* ── /accelerator ─────────────────────────────────────────── */
    acceleratorLede:
      "Six months inside the conditions of a real product team: structured coursework, bi-weekly 1:1 mentorship, team projects, and sprint delivery — building work you can show, and habits a team can rely on.",
    audienceHeadline: "For designers at the start of the climb.",
    audienceBody:
      "The program is built for people who already have an eye and want the team layer on top: research, critique, systems, hand-off, and judgment.",
    mentorHeadline: "A working designer in your corner.",
    mentorBody:
      "Every trainee meets a mentor in structured 1:1 sessions every two weeks across the six months — working designers and practitioners who review your work, share real-world context, and pressure-test your decisions.",
    toolRequirement: {
      t: "Figma account",
      d: "Your work lives in shared, reviewable files from day one.",
    },

    eligibility: [
      {
        tag: "Graduates",
        body: "Graduates of design, media, or related programmes from higher institutions and universities.",
      },
      {
        tag: "Final year",
        body: "Final-year students on internship from design and related faculties.",
      },
      {
        tag: "Self-taught",
        body: "Credible self-taught designers with a body of work that shows how they think.",
      },
    ],

    /* ── /apply ──────────────────────────────────────────────── */
    workField: {
      name: "portfolio",
      label: "Portfolio or work link",
      placeholder: "https://behance.net/yourname",
      help: "Optional, but encouraged — anything that shows your work and how you think. A Figma file, a Behance page, even a folder of sketches.",
    },
    educationOptions: [
      "Design or media graduate",
      "Final-year design student",
      "Self-taught / career switcher",
      "Other",
    ],
    essayPrompt: "Why do you want to become a product designer?",

    equipment: "A personal laptop and a Figma account.",
  },
} as const;

export type TrackContent = (typeof tracks)[keyof typeof tracks];

/** Iteration order for anything that renders both lenses. */
export const trackList = [tracks.code, tracks.design] as const;
