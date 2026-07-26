import { Reveal } from "@/components/reveal";

/** Corner plus-marks for technical panels. */
export function PlusCorners() {
  const pos = [
    "-top-[5px] -left-[5px]",
    "-top-[5px] -right-[5px]",
    "-bottom-[5px] -left-[5px]",
    "-bottom-[5px] -right-[5px]",
  ];
  return (
    <>
      {pos.map((p) => (
        <svg
          key={p}
          aria-hidden="true"
          viewBox="0 0 9 9"
          className={`plus absolute w-[9px] h-[9px] ${p}`}
        >
          <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}

/** Numbered uppercase section label: `[01] — ACCELERATOR`. */
export function SectionLabel({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="micro text-ink-soft flex items-center gap-3">
      {index && <span className="text-ember tabular">[{index}]</span>}
      <span>{children}</span>
      <span aria-hidden="true" className="flex-1 border-t hairline" />
    </div>
  );
}

/** Background patterns that demarcate sections (all very low contrast). */
const PATTERNS = {
  none: "",
  dots: "dot-grid-soft",
  squares: "grid-squares",
  "stripes-h": "stripes-h",
  "stripes-v": "stripes-v",
  hatch: "hatch-soft",
} as const;

export type SectionPattern = keyof typeof PATTERNS;

/** Standard page section wrapper with the shared container width. */
export function Section({
  id,
  label,
  index,
  pattern = "none",
  children,
  className = "",
}: {
  id?: string;
  label?: string;
  index?: string;
  pattern?: SectionPattern;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative border-t hairline ${className}`}>
      {pattern !== "none" && (
        <div className={`absolute inset-0 ${PATTERNS[pattern]}`} aria-hidden="true" />
      )}
      <div className="relative mx-auto max-w-6xl px-5 sm:px-10 py-16 sm:py-24">
        {label && (
          <Reveal className="mb-10">
            <SectionLabel index={index}>{label}</SectionLabel>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
