"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "█▓▒░<>/\\|=+*#";

/**
 * Text settles from glyph noise into the final string — plays once
 * when the element first becomes visible. Skipped entirely under
 * prefers-reduced-motion. Screen readers always get the real text
 * (visually hidden); the animated glyphs are aria-hidden.
 */
export function Decode({
  text,
  className = "",
  speed = 22,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || played.current) return;
        played.current = true;
        io.disconnect();

        let frame = 0;
        const total = Math.max(10, Math.floor(text.length * 1.4));
        const tick = () => {
          frame++;
          const settled = Math.floor((frame / total) * text.length);
          let out = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (i < settled || ch === " ") out += ch;
            else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          setDisplay(out);
          if (settled < text.length) {
            timerRef.current = window.setTimeout(tick, speed);
          } else {
            setDisplay(text);
          }
        };
        timerRef.current = window.setTimeout(tick, speed);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
