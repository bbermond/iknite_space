import Link from "next/link";

/** Primary rectangular CTA — ember fill on hover, mono uppercase label. */
export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "ember";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 border px-5 py-3 micro font-medium no-underline";
  const styles = {
    primary: "border-ink bg-ink text-paper ember-hover",
    ghost: "hairline-strong text-ink invert-hover",
    ember: "border-ember-ink bg-ember-ink text-paper hover:bg-ember-deep hover:border-ember-deep",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
