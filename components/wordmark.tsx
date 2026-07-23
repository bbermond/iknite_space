/**
 * Text wordmark used until the approved logo files are added.
 * Swap: drop the real logo at public/media/brand/logo.svg and replace
 * this component's contents with an <Image>. See docs/MEDIA_AND_MIGRATION.md.
 *
 * Screen readers get "Iknite Space"; the glyph separator is decorative.
 */
export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`micro font-semibold tracking-[0.18em] ${
        inverted ? "text-paper" : "text-ink"
      }`}
    >
      <span className="sr-only">Iknite Space</span>
      <span aria-hidden="true">
        IKNITE<span className="text-ember">*</span>SPACE
      </span>
    </span>
  );
}
