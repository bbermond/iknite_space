"use client";

import { useEffect, useState } from "react";

/** sessionStorage access can throw when storage is blocked — degrade gracefully. */
function safeSession(action: "get" | "set"): string | null {
  try {
    if (action === "get") return sessionStorage.getItem("iknite-booted");
    sessionStorage.setItem("iknite-booted", "1");
    return null;
  } catch {
    return action === "get" ? "1" : null; // storage blocked → skip the loader
  }
}

/**
 * Boot sequence: a brief percentage counter over the dot grid, once per
 * session. Skipped under prefers-reduced-motion, blocked storage, and
 * repeat visits.
 */
export function Loader() {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(true);

  useEffect(() => {
    if (safeSession("get")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      safeSession("set");
      return;
    }
    let timer: number | undefined;
    let fadeTimer: number | undefined;
    // Kick off asynchronously so the first paint isn't blocked by state work.
    const startTimer = window.setTimeout(() => {
      setGone(false);
      document.documentElement.style.overflow = "hidden";
      let p = 0;
      timer = window.setInterval(() => {
        p += Math.floor(Math.random() * 16) + 6;
        if (p >= 100) {
          p = 100;
          window.clearInterval(timer);
          fadeTimer = window.setTimeout(() => {
            setGone(true);
            safeSession("set");
            document.documentElement.style.overflow = "";
          }, 420);
        }
        setPct(p);
      }, 90);
    }, 0);
    return () => {
      window.clearTimeout(startTimer);
      if (timer !== undefined) window.clearInterval(timer);
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-paper dot-grid flex items-end transition-opacity duration-400 ${
        pct >= 100 ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full px-5 sm:px-10 pb-8 flex items-end justify-between">
        <div className="micro text-ink-soft">
          IKNITE SPACE
          <span className="text-ember"> /</span> BUEA, CM
        </div>
        <div className="text-5xl sm:text-7xl tabular leading-none">
          {String(pct).padStart(3, "0")}
          <span className="text-ember">%</span>
        </div>
      </div>
    </div>
  );
}
