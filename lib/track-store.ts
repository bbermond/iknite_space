"use client";

import { DEFAULT_TRACK, TRACK_STORAGE_KEY, isTrack, type Track } from "@/lib/track";

/**
 * The client-side source of truth for the active track.
 *
 * A module-level store rather than React context because the switcher
 * appears more than once (desktop header, mobile menu) and both copies
 * must agree instantly. `useSyncExternalStore` reads from here, so the
 * lazy first read matches what the inline <head> script already wrote
 * onto <html> — same key, same fallback, so hydration never mismatches.
 */

let current: Track | null = null;
const listeners = new Set<() => void>();

function read(): Track {
  try {
    const stored = localStorage.getItem(TRACK_STORAGE_KEY);
    if (isTrack(stored)) return stored;
  } catch {
    /* localStorage can throw outright in privacy modes */
  }
  return DEFAULT_TRACK;
}

export function getTrack(): Track {
  current ??= read();
  return current;
}

/** The server always renders the default lens; the script corrects it. */
export function getServerTrack(): Track {
  return DEFAULT_TRACK;
}

export function setTrack(next: Track) {
  if (current === next) return;
  current = next;
  document.documentElement.setAttribute("data-track", next);
  try {
    localStorage.setItem(TRACK_STORAGE_KEY, next);
  } catch {
    /* preference simply won't persist */
  }
  for (const listener of listeners) listener();
}

export function subscribeToTrack(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
