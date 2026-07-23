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

/** Standard page section wrapper with the shared container width. */
export function Section({
  id,
  label,
  index,
  children,
  className = "",
}: {
  id?: string;
  label?: string;
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t hairline ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-10 py-16 sm:py-24">
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
