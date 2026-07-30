import { BrandMark } from "@/components/brand-mark";

/**
 * The iknite.space lockup — brand mark + lowercase wordmark, per the
 * supplied logo files. Purple on paper; paper-white on dark surfaces.
 */
export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="sr-only">Iknite Space</span>
      <span
        aria-hidden="true"
        className={`font-sans font-bold lowercase tracking-tight text-[17px] leading-none ${
          inverted ? "text-paper" : "text-brand"
        }`}
      >
        iknite.space
      </span>
      <BrandMark variant="gradient" className="w-5 h-5 shrink-0" />
    </span>
  );
}
