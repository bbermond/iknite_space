"use client";

import { useState } from "react";
import { cohort } from "@/content/site";
import { pipelineStages, type PipelineStage } from "@/content/program";
import { Counter } from "@/components/counter";
import { CornerBracket } from "@/components/big-cta";

/**
 * Interactive schematic of the cohort pipeline:
 * Apply → Selection → Piscine → Program → Internship.
 *
 * Hovering/focusing/tapping a stage swaps a fixed-height detail panel
 * below the row (no floating popovers → no viewport clamping, no layout
 * shift, identical behavior for touch, mouse, and keyboard). The stat
 * count-up re-runs on stage change via a keyed <Counter>.
 */

function Skeleton({ lines = 3 }: { lines?: number }) {
  const widths = ["w-10/12", "w-8/12", "w-11/12", "w-7/12"];
  return (
    <div className="space-y-1.5 mt-2" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-1 bg-ink/10 ${widths[i % widths.length]}`} />
      ))}
    </div>
  );
}

function Connector() {
  return (
    <div className="hidden md:flex items-center shrink-0" aria-hidden="true">
      <span className="w-1.5 h-1.5 bg-ember" />
      <span className="w-4 lg:w-6 border-t hairline-strong" />
      <span className="w-1.5 h-1.5 bg-ember" />
    </div>
  );
}

export function PipelineDiagram() {
  const [active, setActive] = useState<PipelineStage>(pipelineStages[0]);

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

      {/* Stage row */}
      <div className="grid grid-cols-2 md:flex md:items-stretch gap-2 md:gap-0 p-4 sm:p-5">
        {pipelineStages.map((stage, i) => {
          const isActive = active.id === stage.id;
          const isProgram = stage.id === "program";
          return (
            <div key={stage.id} className={`flex md:flex-1 ${isProgram ? "md:flex-[1.4]" : ""}`}>
              {i > 0 && <Connector />}
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls="pipeline-detail"
                onMouseEnter={() => setActive(stage)}
                onFocus={() => setActive(stage)}
                onClick={() => setActive(stage)}
                className={`relative w-full text-left border p-3 transition-colors cursor-pointer ${
                  isActive
                    ? "border-ember bg-paper"
                    : "hairline-strong bg-paper hover:bg-paper-2"
                } ${isProgram ? "md:mx-1" : ""}`}
              >
                {isProgram && (
                  <>
                    <span className="hatch absolute inset-y-0 -left-1 w-1" aria-hidden="true" />
                    <span className="hatch absolute inset-y-0 -right-1 w-1" aria-hidden="true" />
                  </>
                )}
                <span className="flex items-baseline justify-between gap-2">
                  <span className={`micro ${isActive ? "text-ember" : "text-ink-soft"}`}>
                    {stage.num}
                  </span>
                  <span className="micro text-ink-soft tabular">{stage.duration}</span>
                </span>
                <span className="mt-1 block text-[13px] font-medium">{stage.title}</span>
                {isProgram ? (
                  <span className="mt-2 block bg-ink text-paper micro px-2 py-1" aria-hidden="true">
                    Sprints // Review{" "}
                    <span className="animate-blink">&gt;&gt;</span>
                  </span>
                ) : (
                  <Skeleton lines={2} />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Detail panel — fixed height so stage-switching never shifts layout */}
      <div
        id="pipeline-detail"
        aria-live="polite"
        className="border-t hairline mx-4 sm:mx-5 mb-4 min-h-28 sm:min-h-24 grid sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-2 items-center py-3"
      >
        <div className="flex items-baseline gap-2">
          <span key={active.id} className="text-4xl sm:text-5xl font-medium text-ember">
            <Counter value={active.statValue} suffix={active.statSuffix} duration={600} />
          </span>
        </div>
        <div>
          <p className="micro text-ink">
            [{active.num}] {active.title} — {active.statLabel}
          </p>
          <p className="mt-1 text-[13px] text-ink-soft max-w-[58ch]">{active.blurb}</p>
        </div>
      </div>

      {/* Dotted-leader stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-1 border-t hairline px-5 py-3 micro text-ink-soft">
        <p className="leader">
          <span className="text-ink tabular">
            <Counter value={10} duration={700} />
          </span>
          <span>Seats</span>
        </p>
        <p className="leader">
          <span className="text-ink tabular">
            <Counter value={2} suffix=" WK" duration={700} />
          </span>
          <span>Piscine</span>
        </p>
        <p className="leader">
          <span className="text-ink tabular">
            <Counter value={6} suffix=" MO" duration={700} />
          </span>
          <span>Program</span>
        </p>
        <p className="leader">
          <span className="text-ink tabular">
            <Counter value={6} suffix=" MO" duration={700} />
          </span>
          <span>Internship</span>
        </p>
      </div>
    </div>
  );
}
