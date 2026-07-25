/**
 * FindWellness wordmark: leaf glyph + display-serif lockup.
 * `inverted` renders the paper-on-ink variant for dark surfaces.
 */
export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`w-5 h-5 ${inverted ? "text-fern-bright" : "text-fern"}`}
        fill="currentColor"
      >
        <path d="M12 21.5C6.8 18.6 4.4 13.4 5.3 6.9c6.5.9 11.7 3.3 13.4 8.6 1.1 3.4-1.2 6-6.7 6z" />
        <path
          d="M7.5 9.5c3.2 2.2 5.6 5 7.2 8.6"
          stroke={inverted ? "#151a14" : "#f7f5ef"}
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span
        className={`display text-[19px] leading-none tracking-tight ${
          inverted ? "text-paper" : "text-ink"
        }`}
      >
        Find<span className={inverted ? "text-moss" : "text-fern"}>Wellness</span>
      </span>
    </span>
  );
}
