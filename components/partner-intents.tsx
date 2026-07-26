"use client";

import { useEffect, useState } from "react";
import { partnerIntents } from "@/content/partner";
import { submitForm } from "@/lib/actions";

/**
 * Accordion over the five partner intents. Each intent is id-anchored so
 * /partner#mentor (etc.) deep-links and auto-opens; every panel carries
 * its own short form posting to the shared submitForm action.
 */
export function PartnerIntents() {
  const [openId, setOpenId] = useState<string | null>(
    partnerIntents[0]?.id ?? null
  );

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && partnerIntents.some((intent) => intent.id === hash)) {
        setOpenId(hash);
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ block: "start" });
        });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next) window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="border hairline divide-y [&>div]:hairline">
      {partnerIntents.map((intent, i) => {
        const open = openId === intent.id;
        const toggleId = `${intent.id}-toggle`;
        const panelId = `${intent.id}-panel`;

        return (
          <div key={intent.id} id={intent.id} className="scroll-mt-20">
            <h3 className="m-0">
              <button
                type="button"
                id={toggleId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(intent.id)}
                className="group w-full flex items-center justify-between gap-4 p-5 sm:px-8 text-left transition-colors hover:bg-paper-2"
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className={`micro tabular ${open ? "text-ember" : "text-ink-soft"}`}
                  >
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span
                    className={`text-[15px] font-medium transition-colors ${
                      open ? "text-ember" : "group-hover:text-ember"
                    }`}
                  >
                    {intent.label}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`micro ${open ? "text-ember" : "text-ink-soft"}`}
                >
                  {open ? "[−]" : "[+]"}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={toggleId}
              hidden={!open}
              className="border-t hairline"
            >
              <div className="grid md:grid-cols-2 gap-10 p-5 sm:p-8">
                <div>
                  <h4 className="text-xl sm:text-2xl font-medium leading-tight max-w-[26ch]">
                    {intent.headline}
                  </h4>
                  <p className="mt-4 text-[14px] text-ink-soft max-w-[52ch]">
                    {intent.body}
                  </p>
                  {intent.id === "sponsor" && (
                    <p className="mt-4">
                      <a
                        href="/sponsor"
                        className="micro text-ember no-underline inline-flex items-center gap-1"
                      >
                        Full sponsorship details
                        <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  )}
                  <p className="mt-6 border-l-2 border-ember pl-4 text-[13px] text-ink-soft max-w-[48ch]">
                    <span className="micro text-ink block mb-1">
                      What happens next
                    </span>
                    {intent.expectation}
                  </p>
                </div>

                <form action={submitForm} className="space-y-5">
                  <input type="hidden" name="_kind" value="partner" />
                  <input type="hidden" name="intent" value={intent.id} />
                  {/* Honeypot: humans never see or reach this field. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-px w-px overflow-hidden"
                  />

                  {intent.fields.map((field) => {
                    const fieldId = `${intent.id}-${field.name}`;
                    return (
                      <div key={field.name}>
                        <label
                          htmlFor={fieldId}
                          className="micro text-ink-soft block mb-2"
                        >
                          {field.label}
                          {field.required && (
                            <span className="text-ember" aria-hidden="true">
                              {" "}
                              *
                            </span>
                          )}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={fieldId}
                            name={field.name}
                            rows={4}
                            required={field.required}
                            className="field"
                          />
                        ) : (
                          <input
                            id={fieldId}
                            type={field.type}
                            name={field.name}
                            required={field.required}
                            className="field"
                          />
                        )}
                      </div>
                    );
                  })}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 border border-ink bg-ink text-paper px-5 py-3 micro font-medium ember-hover"
                  >
                    Send
                    <span aria-hidden="true">→</span>
                  </button>
                  <p className="text-[12px] text-ink-soft">
                    By sending this you agree that Iknite Space stores these
                    details to respond to you. See our{" "}
                    <a href="/privacy" className="underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
