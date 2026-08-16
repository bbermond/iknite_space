/**
 * An inline <script> that runs while the browser parses the document.
 *
 * `type` is flipped to text/plain on the client so the tag is inert
 * after hydration and on soft navigations (scripts injected by DOM
 * updates never execute anyway), which also silences React's dev-time
 * warning about rendering script tags. `suppressHydrationWarning`
 * covers the deliberate type mismatch.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
