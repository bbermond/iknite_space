"use server";

import fs from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";

/**
 * All site forms land here: applications, partner intents, contact.
 *
 * Storage strategy (in order):
 *  1. Append to DATA_DIR/submissions.jsonl (attach a Railway volume at
 *     /data and set DATA_DIR=/data to persist across deploys).
 *  2. If SUBMISSIONS_WEBHOOK_URL is set, POST the submission as JSON
 *     (pipe into a spreadsheet, CRM, Slack, or email automation).
 *
 * No third-party form embeds; Iknite controls the data end to end.
 */

const KINDS = ["application", "partner", "contact", "hire"] as const;
export type FormKind = (typeof KINDS)[number];

/** Generous cap — the apply essay is the most important field on the site. */
const MAX_FIELD = 10_000;

function sanitize(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.slice(0, MAX_FIELD).trim();
}

async function persist(kind: FormKind, record: Record<string, string>) {
  const submission = {
    kind,
    receivedAt: new Date().toISOString(),
    ...record,
  };

  const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(
      path.join(dataDir, "submissions.jsonl"),
      JSON.stringify(submission) + "\n"
    );
  } catch (err) {
    console.error("[forms] file persistence failed:", err);
  }

  const webhook = process.env.SUBMISSIONS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
        signal: AbortSignal.timeout(5000),
      });
    } catch (err) {
      console.error("[forms] webhook forward failed:", err);
    }
  }
}

export async function submitForm(formData: FormData) {
  const rawKind = sanitize(formData.get("_kind"));
  const kind: FormKind = (KINDS as readonly string[]).includes(rawKind)
    ? (rawKind as FormKind)
    : "contact";

  // Honeypot: bots fill every field; humans never see this one.
  // Logged (without content) so false positives are diagnosable.
  if (sanitize(formData.get("website"))) {
    console.warn(`[forms] honeypot tripped for kind=${kind} — submission dropped`);
    redirect("/thank-you");
  }

  const record: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("_") || key === "website") continue;
    record[key] = sanitize(value);
  }

  // Server-side floor mirrors the client's required fields: never store an
  // entry we cannot act on, even from a direct POST.
  const invalid =
    !record.email ||
    !record.email.includes("@") ||
    !record.name ||
    (kind === "application" && record.consent !== "on");
  if (invalid) {
    redirect("/thank-you?status=invalid");
  }

  await persist(kind, record);
  redirect(`/thank-you?kind=${kind}`);
}
