import { NextResponse } from "next/server";
import { z } from "zod";

/* Lead sink (WO_04 — wired). Validates shape, drops bots (honeypot), and FORWARDS
 * the lead to a real destination when configured:
 *   - LEAD_WEBHOOK_URL  → POST the lead JSON (n8n intake webhook). Primary.
 *   - RESEND_API_KEY + LEAD_NOTIFY_EMAIL (+ LEAD_FROM_EMAIL) → email fallback.
 * If neither env is set, the route is UI-only (returns ok, logs) — set the env in
 * Vercel before the booking form goes link-in-bio live. No data is persisted here. */

// BOFU application (full form).
const ApplySchema = z.object({
  type: z.undefined().or(z.literal("apply")),
  name: z.string().min(1).max(120),
  company: z.string().min(1).max(160),
  vertical: z.string().min(1).max(60),
  revenue: z.string().min(1).max(40),
  market: z.string().min(1).max(160),
  email: z.string().email().max(160),
  situation: z.string().max(2000).optional().default(""),
  company_url: z.string().max(0).optional().default(""), // honeypot
});

// Book-an-appointment (the home's primary conversion).
const BookingSchema = z.object({
  type: z.literal("booking"),
  name: z.string().min(1).max(120),
  company: z.string().min(1).max(160),
  trade: z.string().min(1).max(60),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().default(""), // optional — the chat widget is the phone/SMS opt-in path, not this form
  market: z.string().max(160).optional().default(""),
  message: z.string().max(2000).optional().default(""),
  company_url: z.string().max(0).optional().default(""), // honeypot
});

// Tier-1/2 soft capture (1 field): guide PDF, audit report, newsletter.
const SoftSchema = z.object({
  type: z.enum(["guide-pdf", "audit", "newsletter"]),
  email: z.string().email().max(160),
  source: z.string().max(120).optional().default(""),
});

const Schema = z.union([SoftSchema, BookingSchema, ApplySchema]);

/** Forward a validated lead to the configured sink. Returns true (delivered),
 * false (sink errored), or null (no sink configured → UI-only). Best-effort:
 * never blocks the user — a sink failure is logged, the user still sees success. */
async function forwardLead(lead: Record<string, unknown>): Promise<boolean | null> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString(), source: "king-maker-site" }),
      });
      return r.ok;
    } catch {
      return false;
    }
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (key && to) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL || "King Maker <leads@kingmakerseo.com>",
          to,
          subject: `New ${String(lead.type || "lead")} — ${String(lead.company || lead.email || "")}`,
          text: Object.entries(lead).map(([k, v]) => `${k}: ${String(v)}`).join("\n"),
        }),
      });
      return r.ok;
    } catch {
      return false;
    }
  }
  return null;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please complete the required fields." }, { status: 422 });
  }
  // Honeypot tripped — pretend success, drop silently.
  if ("company_url" in parsed.data && parsed.data.company_url) {
    return NextResponse.json({ ok: true });
  }

  const delivered = await forwardLead(parsed.data as Record<string, unknown>);
  if (delivered === false) {
    // Sink configured but errored — log for recovery; still succeed for the user.
    console.error("[lead] sink delivery failed", { type: (parsed.data as { type?: string }).type });
  } else if (delivered === null) {
    // No sink configured yet — UI-only. Surfaced in the build report.
    console.warn("[lead] no sink configured (LEAD_WEBHOOK_URL / RESEND_API_KEY) — lead not forwarded");
  }
  return NextResponse.json({ ok: true });
}
