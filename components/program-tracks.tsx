import Link from "next/link";
import { programTracks } from "@/content/program-tracks";
import { Reveal } from "@/components/reveal";

export function ProgramTracks() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 border hairline divide-y sm:divide-y-0 sm:divide-x [&>*]:hairline">
        {programTracks.map((track, index) => (
          <Reveal key={track.name} delay={index * 70}>
            <Link
              href="/apply"
              className="group block h-full min-h-40 p-5 no-underline hover:bg-paper-2 transition-colors"
            >
              <span className="micro text-ember tabular">[{track.number}]</span>
              <h3 className="mt-5 text-[15px] font-medium group-hover:text-ember transition-colors">
                {track.name}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{track.focus}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
