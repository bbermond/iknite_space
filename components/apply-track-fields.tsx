"use client";

import { useSyncExternalStore } from "react";
import { TRACKS } from "@/lib/track";
import {
  getServerTrack,
  getTrack,
  setTrack,
  subscribeToTrack,
} from "@/lib/track-store";
import { tracks } from "@/content/tracks";

/**
 * The three application fields whose wording depends on the craft:
 * the track choice itself, education background, and the work link.
 *
 * A Client Component rather than the CSS `<Track>` swap used everywhere
 * else, because a `display: none` form field is still submitted — the
 * inactive track's inputs would ride along in the FormData. Here only the
 * active track's fields exist in the DOM at all.
 *
 * Choosing a track sets the site lens too. They are the same decision, so
 * having two controls that could disagree would be the bug.
 *
 * Without JavaScript this renders the default (engineering) track and the
 * form still submits correctly — `track` simply arrives as "code".
 */

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
  const active = useSyncExternalStore(subscribeToTrack, getTrack, getServerTrack);
  const t = tracks[active];

  return (
    <>
      <fieldset>
        <legend className="micro text-ink-soft mb-2">
          Which track are you applying to?
          <span className="text-ember" aria-hidden="true"> *</span>
        </legend>
        <div className="grid grid-cols-2 gap-px bg-ink/10 border hairline">
          {TRACKS.map((key) => {
            const option = tracks[key];
            const checked = active === key;
            return (
              <label
                key={key}
                className={`bg-paper flex items-start gap-3 p-4 cursor-pointer transition-colors ${
                  checked
                    ? "shadow-[inset_0_0_0_2px_var(--color-ember-ink)]"
                    : "hover:bg-paper-2"
                }`}
              >
                <input
                  type="radio"
                  name="track"
                  value={key}
                  checked={checked}
                  onChange={() => setTrack(key)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-ember"
                />
                <span>
                  <span className="text-[14px] font-medium block">
                    {option.discipline}
                  </span>
                  <span className="text-[12px] text-ink-soft">
                    {key === "code"
                      ? "Build the systems"
                      : "Design what gets built"}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-[12px] text-ink-soft">
          Both tracks run in the same cohort. This also switches the site to
          that track — you can change it at any time.
        </p>
      </fieldset>

      <div>
        <FieldLabel htmlFor="apply-education">Education background</FieldLabel>
        <select
          id="apply-education"
          name="education"
          required
          defaultValue=""
          key={active} /* reset the choice when the track's options change */
          className="field"
        >
          <option value="" disabled>
            Select your background
          </option>
          {t.educationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <FieldLabel htmlFor="apply-work" optional>
          {t.workField.label}
        </FieldLabel>
        <input
          id="apply-work"
          type="url"
          name={t.workField.name}
          autoComplete="url"
          placeholder={t.workField.placeholder}
          className="field"
        />
        <p className="mt-2 text-[12px] text-ink-soft">{t.workField.help}</p>
      </div>

      <div>
        <FieldLabel htmlFor="apply-essay">{t.essayPrompt}</FieldLabel>
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
