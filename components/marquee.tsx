/** Horizontal ticker of terms, duplicated for a seamless loop. */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y hairline py-3" aria-hidden="true">
      <div className="marquee-track gap-0">
        {row.map((item, i) => (
          <span key={i} className="micro text-ink-soft whitespace-nowrap px-6 flex items-center gap-6">
            {item}
            <span className="text-ember">+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
