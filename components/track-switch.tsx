"use client";

import { useSyncExternalStore } from "react";
import { TRACKS, TRACK_BUTTON_SYNC_SCRIPT, type Track } from "@/lib/track";
import {
  getServerTrack,
  getTrack,
  setTrack,
  subscribeToTrack,
} from "@/lib/track-store";
import { InlineScript } from "@/components/inline-script";

/**
 * The two-glyph lens switch that sits beside the primary CTA.
 *
 * `</>` for the engineering track, circle-and-triangle for design — the
 * primitives each craft actually draws with. Both are stroked at the
 * same optical weight so neither half reads as the "on" state by
 * default; the lit half is set by CSS from `[data-track]`, which the
 * inline <head> script writes before the first paint.
 */

const DESCRIPTION: Record<Track, string> = {
  code: "Code view — the engineering track",
  design: "Design view — the design track",
};

const SHORT: Record<Track, string> = { code: "Code", design: "Design" };

function TrackGlyph({ track }: { track: Track }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (track === "code") {
    return (
      <svg {...common}>
        <path d="M8.6 7.2 4 12l4.6 4.8" />
        <path d="M15.4 7.2 20 12l-4.6 4.8" />
        <path d="M13.1 5.6 10.9 18.4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="8.5" cy="12" r="3.9" />
      <path d="M16.5 7.7 20.9 16.3H12.1Z" />
    </svg>
  );
}

export function TrackSwitch({ className = "" }: { className?: string }) {
  // getServerTrack keeps the first client render identical to the
  // server HTML; the store's real value lands on the very next tick.
  const active = useSyncExternalStore(subscribeToTrack, getTrack, getServerTrack);

  return (
    <>
      <div className={`track-switch ${className}`} role="group" aria-label="Site view">
        {TRACKS.map((track) => (
          <button
            key={track}
            type="button"
            data-track-btn=""
            data-mode={track}
            className="track-btn"
            aria-label={DESCRIPTION[track]}
            aria-pressed={active === track}
            title={SHORT[track]}
            suppressHydrationWarning
            onClick={() => setTrack(track)}
          >
            <TrackGlyph track={track} />
          </button>
        ))}
      </div>
      <InlineScript html={TRACK_BUTTON_SYNC_SCRIPT} />
    </>
  );
}
