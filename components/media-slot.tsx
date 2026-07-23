import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { PlusCorners } from "@/components/section";

/**
 * Media slot: renders a real photo from /public/media/<slot>.(jpg|png|webp)
 * when present, otherwise a styled placeholder that names the shot we
 * want there. Drop approved photos into public/media using the paths in
 * docs/MEDIA_AND_MIGRATION.md and slots fill themselves.
 */
const EXTS = [".jpg", ".jpeg", ".png", ".webp"];

function resolveMedia(slot: string): string | null {
  for (const ext of EXTS) {
    const rel = `/media/${slot}${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export function MediaSlot({
  slot,
  alt,
  caption,
  aspect = "aspect-[16/10]",
  className = "",
}: {
  slot: string;
  alt: string;
  /** Shown inside the placeholder and as the visible caption of a real photo. */
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  const src = resolveMedia(slot);

  if (src) {
    return (
      <figure className={`relative ${className}`}>
        <div className={`relative ${aspect} overflow-hidden border hairline`}>
          <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        {caption && <figcaption className="micro text-ink-soft mt-2">{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <div className={`relative ${aspect} border hairline wash-ember-strong dot-grid ${className}`}>
      <PlusCorners />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <span className="micro text-ink-soft">MEDIA / {slot.toUpperCase()}</span>
        <span className="micro text-ink-soft/80 max-w-[24ch]">{caption ?? alt}</span>
      </div>
    </div>
  );
}
