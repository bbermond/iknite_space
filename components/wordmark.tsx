/* eslint-disable @next/next/no-img-element */

/**
 * The official iknite.space lockup, served from the brand SVG exports in
 * public/media/brand. Plain <img> on purpose: a single cached vector
 * request, no image optimizer in the path, no layout shift.
 *
 * Three exports, three surfaces:
 *   logo-primary   violet type + gradient mark — the paper surface
 *   logo-on-dark   white type + gradient mark  — the design track
 *   logo-inverted  flat white                  — the brand-violet footer
 *
 * `logo-on-dark` is derived from the primary export by recolouring only
 * the twelve wordmark paths; the mark's gradient is untouched.
 */

function Mark({ src, height }: { src: string; height: string }) {
  return (
    <img
      src={src}
      alt="Iknite Space"
      width={438}
      height={183}
      className={`${height} w-auto`}
    />
  );
}

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  // The footer is deep violet in both tracks — one flat white lockup.
  if (inverted) {
    return <Mark src="/media/brand/logo-inverted.svg" height="h-9" />;
  }

  // Elsewhere the surface flips with the track, so the lockup does too.
  return (
    <>
      <span data-when="code">
        <Mark src="/media/brand/logo-primary.svg" height="h-8" />
      </span>
      <span data-when="design">
        <Mark src="/media/brand/logo-on-dark.svg" height="h-8" />
      </span>
    </>
  );
}
