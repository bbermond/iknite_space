import { cohort } from "@/content/site";
import { CornerBracket } from "@/components/big-cta";

/**
 * Technical schematic of the cohort pipeline — apply → selection → the
 * six-month team boundary → transition. Pure CSS: skeleton cards,
 * square connector nodes, hatched boundary rails, dark status bar,
 * dotted-leader stats. Decorative; the real content is in the sections
 * below, so the internals are aria-hidden.
 */

function Skeleton({ lines = 3 }: { lines?: number }) {
  const widths = ["w-10/12", "w-8/12", "w-11/12", "w-7/12"];
  return (
    <div className="space-y-1.5 mt-3" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-1.5 bg-ink/10 ${widths[i % widths.length]}`} />
      ))}
    </div>
  );
}

function Node() {
  return <span aria-hidden="true" className="w-1.5 h-1.5 bg-ember shrink-0" />;
}

export function PipelineDiagram() {
  return (
    <div className="relative border hairline-strong bg-paper/85 backdrop-blur-[1px]">
      <CornerBracket className="top-2 left-2 border-t-2 border-l-2 text-ink/50" />
      <CornerBracket className="top-2 right-2 border-t-2 border-r-2 text-ink/50" />
      <CornerBracket className="bottom-2 left-2 border-b-2 border-l-2 text-ink/50" />
      <CornerBracket className="bottom-2 right-2 border-b-2 border-r-2 text-ink/50" />

      {/* Status rail */}
      <div className="flex flex-wrap justify-between gap-2 px-5 pt-4 micro text-ink-soft">
        <span className="flex items-center gap-2">
          [<span className="inline-block w-1.5 h-1.5 bg-ember animate-blink" aria-hidden="true" />
          PIPELINE // {cohort.name.toUpperCase()} ]
        </span>
        <span className="hidden sm:inline">[ BUEA // SILICON MOUNTAIN ]</span>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_2fr] gap-4 p-5" aria-hidden="true">
        {/* Intake column */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 content-start">
          <div className="border hairline-strong bg-paper p-3">
            <p className="micro text-ink-soft">01 / Apply</p>
            <Skeleton lines={3} />
          </div>
          <div className="border hairline-strong bg-paper p-3">
            <p className="micro text-ink-soft">02 / Selection</p>
            <p className="micro text-ember mt-1">{cohort.seats}</p>
            <Skeleton lines={2} />
          </div>
        </div>

        {/* Connector */}
        <div className="hidden md:flex items-center gap-1">
          <Node />
          <span className="w-8 border-t hairline-strong" />
          <Node />
        </div>

        {/* Team boundary */}
        <div className="relative">
          <div className="hatch absolute inset-y-0 left-0 w-2" />
          <div className="hatch absolute inset-y-0 right-0 w-2" />
          <div className="mx-2 border hairline-strong bg-paper">
            <div className="bg-ink text-paper micro px-3 py-2 flex justify-between items-center">
              <span>In program // {cohort.duration}</span>
              <span className="flex">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="animate-blink"
                    style={{ animationDelay: `${i * 180}ms` }}
                  >
                    &gt;
                  </span>
                ))}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-3">
              <div className="border hairline p-3">
                <p className="micro text-ink-soft">Team sprints</p>
                <Skeleton lines={3} />
              </div>
              <div className="border hairline p-3">
                <p className="micro text-ink-soft">Code review</p>
                <Skeleton lines={3} />
              </div>
            </div>
            <p className="micro text-ink-soft px-3 pb-3 flex items-center gap-2">
              <Node />
              Then: internship &amp; industry pathways
            </p>
          </div>
        </div>
      </div>

      {/* Dotted-leader stats */}
      <div className="grid sm:grid-cols-3 gap-x-8 gap-y-1 border-t hairline px-5 py-3 micro text-ink-soft">
        <p className="leader">
          <span className="text-ink tabular">10</span>
          <span>Seats</span>
        </p>
        <p className="leader">
          <span className="text-ink tabular">6 MO</span>
          <span>Structured training</span>
        </p>
        <p className="leader">
          <span className="text-ink tabular">2 WK</span>
          <span>Mentor cadence</span>
        </p>
      </div>
    </div>
  );
}
