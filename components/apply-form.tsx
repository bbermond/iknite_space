import { cohort } from "@/content/site";
import { submitForm } from "@/lib/actions";

/**
 * Application form for the current cohort. Server component — submitForm
 * is a server action and nothing here needs client interactivity.
 *
 * When cohort.status !== "open" the same form collapses to a short
 * waitlist capture (name, email, city, consent) with waitlist wording.
 */

const EDUCATION_OPTIONS = [
  "Engineering graduate",
  "Final-year engineering student",
  "Self-taught / career switcher",
  "Other",
] as const;

const REFERRAL_OPTIONS = [
  "Friend or colleague",
  "Social media",
  "Iknite event or demo",
  "Search",
  "Other",
] as const;

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
        <span className="text-ember" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function Help({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[12px] text-ink-soft">{children}</p>;
}

export function ApplyForm() {
  const open = cohort.status === "open";

  return (
    <form action={submitForm} className="relative space-y-6">
      <input type="hidden" name="_kind" value="application" />
      <input type="hidden" name="cohort" value={cohort.name} />
      {!open && <input type="hidden" name="mode" value="waitlist" />}
      {/* Honeypot: humans never see or reach this field. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      />

      <div>
        <FieldLabel htmlFor="apply-name">Full name</FieldLabel>
        <input
          id="apply-name"
          type="text"
          name="name"
          required
          autoComplete="name"
          className="field"
        />
      </div>

      <div>
        <FieldLabel htmlFor="apply-email">Email</FieldLabel>
        <input
          id="apply-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="field"
        />
      </div>

      {open && (
        <div>
          <FieldLabel htmlFor="apply-phone">Phone / WhatsApp</FieldLabel>
          <input
            id="apply-phone"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            className="field"
          />
        </div>
      )}

      <div>
        <FieldLabel htmlFor="apply-city">City</FieldLabel>
        <input
          id="apply-city"
          type="text"
          name="city"
          required
          autoComplete="address-level2"
          className="field"
        />
        <Help>
          The program runs in person in Buea, with daily attendance for the
          full six months.
        </Help>
      </div>

      {open && (
        <>
          <div>
            <FieldLabel htmlFor="apply-education">
              Education background
            </FieldLabel>
            <select
              id="apply-education"
              name="education"
              required
              defaultValue=""
              className="field"
            >
              <option value="" disabled>
                Select your background
              </option>
              {EDUCATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="apply-github" optional>
              GitHub profile URL
            </FieldLabel>
            <input
              id="apply-github"
              type="url"
              name="github"
              autoComplete="url"
              placeholder="https://github.com/username"
              className="field"
            />
            <Help>
              Optional, but encouraged — we look at code, not just claims.
            </Help>
          </div>

          <div>
            <FieldLabel htmlFor="apply-essay">
              Why do you want to become a software engineer?
            </FieldLabel>
            <textarea
              id="apply-essay"
              name="essay"
              rows={8}
              required
              maxLength={10000}
              className="field"
            />
            <Help>
              Write it yourself, in your own words. Be honest and specific —
              this is where we get to know you.
            </Help>
          </div>

          <div>
            <FieldLabel htmlFor="apply-referral" optional>
              How did you hear about us
            </FieldLabel>
            <select
              id="apply-referral"
              name="referral"
              defaultValue=""
              className="field"
            >
              <option value="">Select (optional)</option>
              {REFERRAL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <label className="flex items-start gap-3 border hairline p-4 cursor-pointer hover:bg-paper-2 transition-colors">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-ember"
        />
        <span className="text-[13px] text-ink-soft">
          I consent to Iknite Space storing my application data and contacting
          me about {open ? "this application" : "the next application window"}.
          <span className="text-ember" aria-hidden="true">
            {" "}
            *
          </span>
        </span>
      </label>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-ember bg-ember text-paper px-6 py-4 micro font-medium hover:bg-ember-deep transition-colors cursor-pointer"
      >
        {open ? `Apply to ${cohort.name}` : "Join the waitlist"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
