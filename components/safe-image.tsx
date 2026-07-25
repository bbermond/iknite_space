"use client";

import { useState } from "react";

/**
 * External business photos live on each clinic's own domain, so any one of
 * them can 404 or block hotlinking. SafeImage renders a plain lazy <img>
 * inside a fixed-aspect box (no layout shift) and swaps to the leaf-hatch
 * placeholder if the file fails to load.
 */
export function SafeImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={`block relative overflow-hidden bg-paper-2 ${aspect} ${className}`}>
      {failed ? (
        <span className="absolute inset-0 hatch flex items-center justify-center">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-8 h-8 text-fern/40" fill="currentColor">
            <path d="M12 21.5C6.8 18.6 4.4 13.4 5.3 6.9c6.5.9 11.7 3.3 13.4 8.6 1.1 3.4-1.2 6-6.7 6z" />
          </svg>
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
