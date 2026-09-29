/**
 * Track-aware content. Both lenses are rendered into the HTML; CSS
 * removes the inactive one (`display: none`, so it leaves the
 * accessibility tree too — see app/globals.css).
 *
 * This keeps every page a Server Component and fully static: switching
 * lenses is one attribute write on <html>, with no refetch, no
 * re-render, and nothing to hydrate.
 *
 * Both wrappers are `display: contents`, so they never introduce a box
 * — a swapped child stays a direct grid/flex item of whatever contains
 * it. Pick by content model, not by layout:
 *
 *   <Track>      block content — sections, grid cells, paragraphs
 *   <TrackWord>  inline content — a word or phrase inside a sentence
 */

export function Track({
  code,
  design,
}: {
  code: React.ReactNode;
  design: React.ReactNode;
}) {
  return (
    <>
      <div data-when="code">{code}</div>
      <div data-when="design">{design}</div>
    </>
  );
}

/** Inline swap — safe inside a <p>, a heading, or a button label. */
export function TrackWord({
  code,
  design,
}: {
  code: React.ReactNode;
  design: React.ReactNode;
}) {
  return (
    <>
      <span data-when="code">{code}</span>
      <span data-when="design">{design}</span>
    </>
  );
}
