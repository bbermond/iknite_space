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

/**
 * Numbered uppercase section label: `[01] — FEATURED CLINICS`. The label text
 * renders as an h2 so listing pages keep a sound heading outline; Tailwind's
 * preflight leaves headings visually identical to the old span.
 */
export function SectionLabel({
  index,
  dark = false,
  children,
}: {
  index?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`micro flex items-center gap-3 ${dark ? "text-paper/60" : "text-ink-soft"}`}>
      {index && (
        <span aria-hidden="true" className={`tabular ${dark ? "text-fern-bright" : "text-fern"}`}>
          [{index}]
        </span>
      )}
      <h2 className="font-normal">{children}</h2>
      <span
        aria-hidden="true"
        className={`flex-1 border-t ${dark ? "border-paper/20" : "hairline"}`}
      />
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
