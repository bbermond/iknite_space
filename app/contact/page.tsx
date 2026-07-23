import type { Metadata } from "next";
import { Decode } from "@/components/decode";
import { Reveal } from "@/components/reveal";
import { PlusCorners } from "@/components/section";
import { site } from "@/content/site";
import { submitForm } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Iknite Space in Buea directly — email, phone, and one form that lands with the team. Applications, mentoring, hiring, sponsorship, events.",
};

const intents = [
  "Applying to the accelerator",
  "Mentoring",
  "Hiring talent",
  "Sponsorship",
  "Event or community",
  "Something else",
] as const;

const socials = [
  ["GitHub", site.social.github],
  ["LinkedIn", site.social.linkedin],
  ["Facebook", site.social.facebook],
] as const;

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade" aria-hidden="true" />
      <div className="absolute inset-0 wash-ember" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── Left: direct lines ─────────────────────────────── */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="micro inline-flex items-center gap-2 border hairline-strong bg-paper px-3 py-2">
                <span className="inline-block w-2 h-2 bg-ember animate-blink" aria-hidden="true" />
                Direct line
              </p>
            </Reveal>

            <h1 className="mt-8 text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              <Decode text="Contact." />
            </h1>

            <Reveal delay={120}>
              <p className="mt-6 max-w-[46ch] text-[15px] text-ink-soft">
                Direct questions get direct answers. Every message lands with
                the Iknite team — no ticket queue, no runaround.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-10 border hairline divide-y [&>div]:hairline bg-paper/70">
                <div className="grid grid-cols-[6.5rem_1fr] gap-4 p-4">
                  <dt className="micro text-ink-soft pt-0.5">Email</dt>
                  <dd className="text-[13px]">
                    <a
                      href={`mailto:${site.email}`}
                      className="no-underline hover:text-ember transition-colors"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-4 p-4">
                  <dt className="micro text-ink-soft pt-0.5">Phone</dt>
                  <dd className="text-[13px] tabular">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="no-underline hover:text-ember transition-colors"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-4 p-4">
                  <dt className="micro text-ink-soft pt-0.5">Location</dt>
                  <dd className="text-[13px]">{site.location}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={280}>
              <ul className="mt-6 flex flex-wrap gap-5 micro">
                {socials.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-ink-soft hover:text-ember no-underline transition-colors"
                    >
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={340}>
              <p className="mt-10 border-l-2 border-ember pl-4 text-[13px] text-ink-soft max-w-[42ch]">
                <span className="micro text-ink block mb-1">Visiting</span>
                Visits are by appointment while the Space develops — write
                first and we&apos;ll set a time.
              </p>
            </Reveal>
          </div>

          {/* ── Right: one form, straight to the team ──────────── */}
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <div className="relative border hairline bg-paper p-6 sm:p-10">
                <PlusCorners />
                <p className="micro text-ink-soft">
                  <span className="text-ember tabular">[01]</span> Write to us
                </p>

                <form action={submitForm} className="mt-8 space-y-6">
                  <input type="hidden" name="_kind" value="contact" />
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
                    <label htmlFor="contact-intent" className="micro text-ink-soft block mb-2">
                      Intent
                      <span className="text-ember" aria-hidden="true"> *</span>
                    </label>
                    <select
                      id="contact-intent"
                      name="intent"
                      required
                      defaultValue=""
                      className="field"
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {intents.map((intent) => (
                        <option key={intent} value={intent}>
                          {intent}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="micro text-ink-soft block mb-2">
                        Name
                        <span className="text-ember" aria-hidden="true"> *</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="micro text-ink-soft block mb-2">
                        Email
                        <span className="text-ember" aria-hidden="true"> *</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="micro text-ink-soft block mb-2">
                      Message
                      <span className="text-ember" aria-hidden="true"> *</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      className="field"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 border border-ink bg-ink text-paper px-5 py-3 micro font-medium ember-hover"
                    >
                      Send
                      <span aria-hidden="true">→</span>
                    </button>
                    <p className="micro text-ink-soft">
                      We reply to every serious message.
                    </p>
                  </div>
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
