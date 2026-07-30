/**
 * The Iknite Space brand mark — two interlocking flexed corner brackets —
 * recreated as inline SVG from the supplied logo files so it can render
 * in gradient, brand-purple, or paper variants at any size.
 */
export function BrandMark({
  variant = "gradient",
  className = "w-6 h-6",
}: {
  variant?: "gradient" | "purple" | "paper";
  className?: string;
}) {
  const gradientId = "ik-mark-grad";
  const fill =
    variant === "gradient"
      ? `url(#${gradientId})`
      : variant === "purple"
        ? "#2d1264"
        : "var(--color-paper)";

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f2955a" />
            <stop offset="55%" stopColor="#f2694f" />
            <stop offset="100%" stopColor="#f83f5c" />
          </linearGradient>
        </defs>
      )}
      <g fill={fill}>
        <path d="M 2 6 Q 38 12 72 3 L 68 25 Q 44 29 27 26 Q 22 46 26 64 L 4 69 Q -1 36 2 6 Z" />
        <path
          d="M 2 6 Q 38 12 72 3 L 68 25 Q 44 29 27 26 Q 22 46 26 64 L 4 69 Q -1 36 2 6 Z"
          transform="rotate(180 50 50)"
        />
      </g>
    </svg>
  );
}
