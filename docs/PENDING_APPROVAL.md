# Pending approval — items required before/after launch

This site was built from the July 2026 agent brief. Per the brief, nothing
below was invented; each item is either omitted from the site or shown with
safe placeholder framing until confirmed by Bermond.

## Cohort & program facts (site currently shows)

| Item | Currently on site | Needs |
|---|---|---|
| Next cohort | "Cohort 06", starts **September 2026**, Buea, in person | Confirm cohort number + exact start date |
| Application status | **Open** (per instruction to announce the September cohort) | Confirm open vs. opening-soon; set deadline in `content/site.ts` |
| Application deadline | "TBA — apply early" | Real deadline |
| Seats | "10 seats" (pattern from Cohorts 4–5) | Confirm for Cohort 06 |
| Tuition / cost | Deliberately not stated; FAQ says "published with the application" | Confirmed tuition/funding model. The old "free until you get a job" and "guaranteed job after a year" claims were **retired** per the brief |
| Internship | **6-month internship — confirmed by owner (July 2026)**, described as the bridge into industry, still not framed as a job guarantee | — |
| Piscine | **2-week sink-or-swim challenge — added at owner's direction (July 2026)**, framed as "a test of passion, not skill" | Confirm exact piscine dates/format for Cohort 06 |
| Eligibility | Engineering graduates / final-year internship students (+ self-taught encouraged) — from the current site's published criteria | Confirm wording, esp. whether self-taught applicants are formally eligible |

## Design track — added August 2026 ⚠ needs review

The site now reads through two lenses, switched from the header: **code**
(`</>`) and **design** (`○◺`). Per the owner's direction the design track is
presented as **open for the same Cohort 06**, sharing one application.

Everything numeric on the design track is a confirmed programme fact that
already applied to the engineering track — cohort, dates, seats, piscine,
4 + 2 structure, mentor cadence, six-month internship. Nothing was invented.
What still needs confirming is craft-specific wording in
`content/tracks.ts` → `tracks.design`:

| Item | Currently on site | Needs |
|---|---|---|
| Design track is open for Cohort 06 | Same status line, deadline, and Apply CTA as the engineering track | Confirm designers are being selected for **this** cohort |
| Design curriculum | Five groups — Foundations, Craft, Research, Delivery, Professional — drawn from standard product-design practice | Confirm against what will actually be taught |
| Design eligibility | Design/media graduates, final-year design students, self-taught with a body of work | Confirm, esp. which faculties count |
| Design tooling | "A personal laptop and a Figma account" | Confirm Figma is the tool of record |
| Application field | Design applicants give a **portfolio link** instead of a GitHub profile; essay asks "why do you want to become a product designer?" | Confirm wording |
| Design mentors | `/mentors` now says "working engineers and designers" | **No design mentors are listed yet.** Either add them to `content/mentors.ts` or soften the claim |
| Stat tile | Design track shows "6 mo — internship after the programme" where the engineering track shows "20+ courses completed early-phase (C04)" | A verified design-track equivalent, if one exists |

The design track deliberately publishes **no** design-specific outcomes,
counts, or alumni. It must not until they are documented.

## Partner logos — added August 2026

Reversing the earlier "no partner logos" position at the owner's direction.
Four partners are listed in `content/partners.ts`: **Iknite Studio**,
**Mountain Hub**, **Moulingo**, **CimFest**.

- Confirm each is a **current, documented** relationship — `/partner` states
  in writing that a logo there means exactly that.
- Logo files were not reachable from the build environment; all four render
  as typographic placeholders until dropped into
  `public/media/partners/` (see `docs/MEDIA_AND_MIGRATION.md`).
- No descriptor, tagline, or URL is published for any partner. Add `href`
  per partner once verified.
- Mountain Hub specifically: the brief required separating Iknite from
  Mountain Hub's branding. Listing it as a partner is compatible with that,
  but confirm the framing is what you want.

## People

- **Mentor roster — now published at the owner's direction (July 2026)**
  on `/mentors` via `content/mentors.ts`: Acho Arnold Ewin, Kambang
  Sinclaire, Ian Joyce, Margaret Adams, Mbianou Bradon, Phillip Kang,
  Eric Williams. The page frames them as mentors of *recent cohorts* with
  affiliations "as listed at the time of mentoring". Still to verify per
  person: spelling, current affiliation, photo consent, and continued
  participation — edit or remove entries in `content/mentors.ts` only.
  Photos still needed at `public/media/mentors/<slug>.jpg`.
- **Team page** — no names published. Public LinkedIn candidates found during
  research (to verify + consent before publishing): Tim Merciful Ankongmbom
  (Operations Officer), Amin Jefferson (Design Educator), Tambua Evaristus
  (Software Engineer), Gilbert Tima (Associate Software Engineer),
  Ngeh Kellypride Cho (Junior Software Developer), Indah Riscobelle Mbah.
- **Founder attribution** — public sources attribute founding to Mountain Hub
  (2022) and name Ayuk Etta as founder/CEO of multiple entities. Per the
  brief's separation guidance, the site says only "fully owned and operated by
  Iknite" and dates history honestly. Confirm the About/history wording.
- Use **Ebako Samuel** (never an alias) if he is ever referenced.

## Impact metrics (deliberately NOT published)

- "20+ young engineers supported" — needs verified number + definition.
- Completion, internship, and employment counts — need definitions + data.
- No testimonials are shown; none existed with documented consent.

## Projects

- **Qless** — name/domain/trademark check pending (unrelated US company
  "QLess" exists). Case study is framed as a trainee prototype.
- **Auto Link** — minimal public documentation; page says the write-up is in
  preparation. Needs the team's input.
- Confirm each project may remain public.

## Contact & legal

- `info@iknite.space` and `+237 675 834 309` are shown (currently public on
  GitHub org / listings). Confirm mailbox is monitored + number correct.
- Physical address: site says "by appointment" without a street address.
- Footer/legal entity: "Iknite" pending the registration decision — no legal
  suffix used anywhere.
- Privacy policy owner + operating entity to confirm before launch.

## Removed per the brief

- Mountain Hub contact-form embed and all affiliation implications.
- Google Form application embed (replaced by native form).
- "Learn for free until you get a job" and "guaranteed job" claims.
- Mentor logos/employer logos (Microsoft, etc.) — these stay removed.
  Partner logos returned in August 2026 at the owner's direction, under the
  documented-relationship rule above.
