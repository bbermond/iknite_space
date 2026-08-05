/* eslint-disable @next/next/no-img-element */

/**
 * The official iknite.space lockup, served from the brand SVG exports in
 * public/media/brand. Plain <img> on purpose: a single cached vector
 * request, no image optimizer in the path, no layout shift.
 */
export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <img
      src={inverted ? "/media/brand/logo-inverted.svg" : "/media/brand/logo-primary.svg"}
      alt="Iknite Space"
      width={438}
      height={183}
      className={inverted ? "h-9 w-auto" : "h-8 w-auto"}
    />
  );
}
