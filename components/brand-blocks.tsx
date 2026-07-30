/**
 * The geometric background composition from the official brand banners:
 * large translucent offset squares and a corner circle arc. Absolutely
 * positioned, decorative, clipped by the parent (which must be
 * relative + overflow-hidden).
 */
export function BrandBlocks({
  tone = "light",
}: {
  /** light = on paper/gradient surfaces; dark = on the brand-purple surface */
  tone?: "light" | "dark";
}) {
  const block = tone === "dark" ? "bg-paper/[0.04]" : "bg-brand-red/[0.05]";
  const arc = tone === "dark" ? "border-paper/[0.06]" : "border-brand-red/[0.08]";
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
