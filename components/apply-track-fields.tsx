import { programTracks } from "@/content/program-tracks";

function FieldLabel({
  htmlFor,
  optional = false,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="micro text-ink-soft block mb-2">
      {children}
      {optional ? (
        <span className="text-ink-soft"> — optional</span>
      ) : (
        <span className="text-ember" aria-hidden="true"> *</span>
      )}
    </label>
  );
}

export function ApplyTrackFields() {
  return (
    <>
      <fieldset>
        <legend className="micro text-ink-soft mb-2">
          Which track are you applying to?
          <span className="text-ember" aria-hidden="true"> *</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border hairline">
          {programTracks.map((track) => (
            <label
              key={track.name}
              className="bg-paper flex items-start gap-3 p-4 cursor-pointer hover:bg-paper-2 transition-colors"
            >
              <input
                type="radio"
                name="track"
                value={track.name}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-ember"
              />
              <span>
                <span className="text-[14px] font-medium block">{track.name}</span>
                <span className="text-[12px] text-ink-soft">{track.focus}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <FieldLabel htmlFor="apply-background">Education and experience</FieldLabel>
        <textarea
          id="apply-background"
          name="background"
          required
          rows={3}
          className="field"
        />
      </div>

      <div>
        <FieldLabel htmlFor="apply-work" optional>Link to relevant work</FieldLabel>
        <input
          id="apply-work"
          type="url"
          name="workLink"
          autoComplete="url"
          placeholder="Portfolio, GitHub, project, or other work link"
          className="field"
        />
      </div>

      <div>
        <FieldLabel htmlFor="apply-essay">Why do you want to join this programme, and what would you like to learn?</FieldLabel>
        <textarea
          id="apply-essay"
          name="essay"
          rows={8}
          required
          maxLength={10000}
          className="field"
        />
        <p className="mt-2 text-[12px] text-ink-soft">
          Write it yourself, in your own words. Be honest and specific — this
          is where we get to know you.
        </p>
      </div>
    </>
  );
}
