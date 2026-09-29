/**
 * The geometric background composition from the official brand banners:
 * large translucent offset squares and a corner circle arc. Absolutely
 * positioned, decorative, clipped by the parent (which must be
 * relative + overflow-hidden).
 */
export function BrandBlocks({
  tone = "light",
}: {
  /**
   * light    on paper / pale gradient surfaces
   * dark     on the brand-violet surface
   * gradient on the orange→red banner, where the shapes read as shadow
   */
  tone?: "light" | "dark" | "gradient";
}) {
  // On the gradient band the shapes LIGHTEN rather than shade: darkening
  // the red end pushed the dark-violet type below 4.5:1.
  const block = {
    light: "bg-brand-red/[0.05]",
    dark: "bg-paper/[0.04]",
    gradient: "bg-[var(--color-banner-paper)]/[0.10]",
  }[tone];

  const arc = {
    light: "border-brand-red/[0.08]",
    dark: "border-paper/[0.06]",
    gradient: "border-[var(--color-banner-paper)]/[0.12]",
  }[tone];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className={`absolute -left-10 bottom-[-20%] w-64 h-[130%] ${block}`} />
      <div className={`absolute left-[38%] top-[-30%] w-72 h-[110%] ${block}`} />
      <div className={`absolute right-[18%] bottom-[-40%] w-56 h-[95%] ${block}`} />
      <div
        className={`absolute -right-40 -top-56 w-[34rem] h-[34rem] rounded-full border-[3rem] ${arc}`}
      />
    </div>
  );
}
