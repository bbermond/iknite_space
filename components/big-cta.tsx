import Link from "next/link";

/**
 * Full-width band CTA — flat fill, corner bracket, animated diagonal
 * stripes on hover (.stripes-hover in globals.css). The site's loudest
 * element; use once per page, at the end.
 */

export function CornerBracket({
  className = "top-3 right-3 border-t-2 border-r-2",
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-4 h-4 border-current ${className}`}
    />
  );
}

const VARIANTS = {
  fern: "bg-fern text-paper",
  ink: "bg-ink text-paper",
} as const;

export function BigCta({
  href,
  children,
  variant = "fern",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`stripes-hover relative block w-full py-8 sm:py-10 text-center no-underline ${VARIANTS[variant]} ${className}`}
    >
      <CornerBracket />
      <span className="relative z-10 font-medium text-lg sm:text-2xl tracking-[0.18em] uppercase">
        {children}
      </span>
    </Link>
  );
}
