import { CornerBracket } from "@/components/big-cta";

/**
 * Decorative technical graphics — original Iknite compositions in the
 * site's schematic language (boxes, connector nodes, hatched boundaries,
 * skeleton lines). Purely visual; all aria-hidden with the surrounding
 * content carrying the real information.
 */

function Bars({ lines = 3, marker }: { lines?: number; marker?: number }) {
  const widths = ["w-10/12", "w-7/12", "w-11/12", "w-8/12", "w-9/12"];
  return (
    <div className="space-y-2 mt-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          {marker === i && <span className="w-2 h-2 bg-ember shrink-0" />}
          <div className={`h-1.5 bg-ink/10 ${widths[i % widths.length]}`} />
        </div>
      ))}
    </div>
  );
}

function MiniBox({ label, lines = 2 }: { label: string; lines?: number }) {
  return (
    <div className="border hairline-strong bg-paper p-3">
      <p className="micro text-ink-soft">{label}</p>
      <Bars lines={lines} />
    </div>
  );
}

function VNode() {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <span className="w-1.5 h-1.5 bg-ember" />
      <span className="h-4 border-l hairline-strong" />
      <span className="w-1.5 h-1.5 bg-ember" />
    </div>
  );
}

/**
 * Boundary diagram: community flows in through selective intake, work
 * happens inside the team boundary, evidence flows out to employers and
 * ventures. Used on /partner.
 */
export function NetworkBanner() {
  return (
    <div aria-hidden="true" className="relative border hairline bg-paper/80 p-5 sm:p-8 overflow-hidden">
      <div className="absolute inset-0 grid-squares" />
      <CornerBracket className="top-2 left-2 border-t-2 border-l-2 text-ink/50" />
      <CornerBracket className="top-2 right-2 border-t-2 border-r-2 text-ink/50" />
      <CornerBracket className="bottom-2 left-2 border-b-2 border-l-2 text-ink/50" />
      <CornerBracket className="bottom-2 right-2 border-b-2 border-r-2 text-ink/50" />

      <div className="relative flex flex-wrap justify-between gap-2 micro text-ink-soft mb-5">
        <span className="flex items-center gap-2">
          [<span className="inline-block w-1.5 h-1.5 bg-ember animate-blink" />
          TALENT FLOW ]
        </span>
        <span className="hidden sm:inline">[ EVIDENCE OUT ]</span>
      </div>

      <div className="relative grid md:grid-cols-[1fr_auto_2fr_auto_1fr] gap-4 items-center">
        {/* In */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
          <MiniBox label="Applicants" />
          <MiniBox label="Community" />
        </div>

        <div className="hidden md:block">
          <div className="border border-ember/60 bg-paper px-2 py-1 micro text-ember">
            Selective intake
          </div>
        </div>

        {/* Team boundary */}
        <div className="relative">
          <div className="hatch absolute inset-y-0 left-0 w-2" />
          <div className="hatch absolute inset-y-0 right-0 w-2" />
          <div className="mx-2 border hairline-strong bg-paper">
            <div className="bg-ink text-paper micro px-3 py-1.5 flex justify-between">
              <span>Team boundary</span>
              <span className="animate-blink">&gt;&gt;</span>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3">
              <MiniBox label="Sprints" lines={3} />
              <MiniBox label="Review" lines={3} />
              <MiniBox label="Demos" lines={3} />
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <span className="w-1.5 h-1.5 bg-ember" />
          <span className="w-5 border-t hairline-strong" />
          <span className="w-1.5 h-1.5 bg-ember" />
        </div>

        {/* Out */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
          <MiniBox label="Employers" />
          <MiniBox label="Ventures" />
        </div>
      </div>

      <div className="relative md:hidden mt-4 flex justify-center">
        <VNode />
      </div>
    </div>
  );
}

/**
 * Checklist card on a dot field — a document skeleton with ember markers.
 * Used on /apply and /sponsor.
 */
export function ChecklistCard({ title }: { title: string }) {
  return (
    <div aria-hidden="true" className="relative dot-grid-soft p-6 sm:p-10">
      <CornerBracket className="top-0 left-0 border-t-2 border-l-2 text-ink/40" />
      <CornerBracket className="bottom-0 right-0 border-b-2 border-r-2 text-ink/40" />
      <div className="relative border hairline-strong bg-paper p-5 max-w-sm mx-auto">
        <p className="micro text-ink flex items-center gap-2">
          {title.toUpperCase()}
          <span className="text-ember animate-blink">|</span>
        </p>
        <Bars lines={5} marker={1} />
        <Bars lines={3} marker={2} />
        <div className="mt-4 border-t hairline pt-3 flex justify-between micro text-ink-soft">
          <span className="leader flex-1 mr-4">
            <span className="text-ink tabular">10</span>
            <span>Seats</span>
          </span>
          <span className="text-ember">✓</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Terminal log feed — dotted-leader event lines with a staggered fade
 * loop. Used on /insights.
 */
const LOG_LINES = [
  ["[APPLY]", "APPLICATION_RECEIVED"],
  ["[SELECT]", "INTERVIEW_SCHEDULED"],
  ["[PISCINE]", "DAY_01 // SINK_OR_SWIM"],
  ["[SPRINT]", "REVIEW_REQUESTED"],
  ["[DEMO]", "SHIPPED"],
] as const;

export function LogFeed() {
  return (
    <div aria-hidden="true" className="border hairline-strong bg-ink text-paper/80 p-4 font-mono">
      <div className="flex justify-between micro text-paper/50 border-b border-paper/15 pb-2 mb-2">
        <span>COHORT LOG</span>
        <span className="animate-blink text-ember-soft">●</span>
      </div>
      <ul className="space-y-1.5 micro">
        {LOG_LINES.map(([tag, event], i) => (
          <li
            key={event}
            className="leader leader-inverse animate-blink"
            style={{
              animationDuration: "3.6s",
              animationDelay: `${i * 0.55}s`,
              animationTimingFunction: "ease-in-out",
            }}
          >
            <span className="text-ember-soft">{tag}</span>
            <span>{event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
