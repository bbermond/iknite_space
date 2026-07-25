import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Site-wide Open Graph card. Pages without their own og image inherit this,
 * so every share renders branded instead of a bare text card.
 */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#151a14",
          backgroundImage:
            "radial-gradient(90% 80% at 85% 0%, rgba(46,138,99,0.35), transparent 60%), radial-gradient(60% 50% at 5% 100%, rgba(217,180,92,0.18), transparent 55%)",
          color: "#f7f5ef",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="#2e8a63">
            <path d="M12 21.5C6.8 18.6 4.4 13.4 5.3 6.9c6.5.9 11.7 3.3 13.4 8.6 1.1 3.4-1.2 6-6.7 6z" />
          </svg>
          <div style={{ display: "flex", fontSize: 44 }}>
            <span>Find</span>
            <span style={{ color: "#9db4a0" }}>Wellness</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 980 }}>
            The South Bay&rsquo;s curated guide to modern wellness.
          </div>
          <div
            style={{
              display: "flex",
              gap: 40,
              fontSize: 26,
              color: "rgba(247,245,239,0.75)",
            }}
          >
            <span>270+ vetted practices</span>
            <span style={{ color: "#2e8a63" }}>·</span>
            <span>7 categories</span>
            <span style={{ color: "#2e8a63" }}>·</span>
            <span>17 cities</span>
            <span style={{ color: "#2e8a63" }}>·</span>
            <span>Curated, never sold</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
