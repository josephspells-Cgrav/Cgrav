"use client";

import { useState, type FormEvent } from "react";
import { Container, Section } from "@/components/ui";
import { Reveal, Eyebrow, TypeIn } from "@/components/motion";
import { FIRM } from "@/lib/site.config";

/* F5 (WO_04) — the selectivity close, replaced by the home's PRIMARY conversion:
 * a super-agency book-an-appointment form (the link-in-bio CTA). Two-column:
 * value left, form card right. Industry-neutral (trade dropdown). Posts to
 * /api/lead (booking). "One contractor per market" stays as a light scarcity line. */

const TRADES = ["Roofing", "HVAC", "Plumbing", "Kitchen & Bath", "Painting", "General Contractor", "Other"];

const WHAT_YOU_GET = [
  "Where you rank now, versus where you could",
  "The exact pages your site is missing",
  "Whether your market is still open",
  "A straight answer. No pitch, no pressure.",
];

const fieldCls =
  "w-full border border-line bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-dim focus:border-blue focus:outline-none";
const labelCls = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-dim";

export function BookAppointment() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", ...data }),
      });
      const json = await res.json();
      setStatus(json.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="book" tone="tint">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Value (left) */}
          <div className="lg:pt-2">
            <Eyebrow>Book your appointment</Eyebrow>
            <TypeIn
              text="Find out what your site is leaving on the table."
              as="h2"
              className="mt-6 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink"
            />
            <Reveal delay={0.12} className="mt-6 text-[17px] leading-relaxed text-muted">
              <p>
                A short call. We pull up your site and your market, and show you exactly where the
                leads are going instead of to you.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-7">
              <ul className="space-y-3">
                {WHAT_YOU_GET.map((w) => (
                  <li key={w} className="flex gap-3 text-[15.5px] leading-snug text-ink">
                    <svg viewBox="0 0 16 16" className="mt-[3px] h-4 w-4 shrink-0 text-blue-action" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 8.5l3.4 3.4L13 4.3" />
                    </svg>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <p className="mt-8 border-t border-line pt-6 text-[14px] leading-relaxed text-muted">
              <span className="font-semibold text-ink">One contractor per market.</span> When we build
              for you, we don't build for your competitor. If your market is taken, we'll tell you on
              the call.
            </p>
          </div>

          {/* Form card (right) */}
          <Reveal delay={0.1}>
            <div className="border border-line bg-surface px-6 py-8 shadow-panel sm:px-9 sm:py-9">
              {status === "ok" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center bg-blue-tint text-blue">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M4 12.5l5 5L20 6.5" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-[22px] font-bold text-ink">Request received.</h3>
                  <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                    We'll confirm your appointment by email within one business day. Talk soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  {/* honeypot */}
                  <input type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-name" className={labelCls}>Name</label>
                      <input id="bk-name" name="name" required suppressHydrationWarning className={fieldCls} placeholder="Full name" />
                    </div>
                    <div>
                      <label htmlFor="bk-company" className={labelCls}>Company</label>
                      <input id="bk-company" name="company" required suppressHydrationWarning className={fieldCls} placeholder="Company name" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-trade" className={labelCls}>Trade</label>
                      <select id="bk-trade" name="trade" required defaultValue="" suppressHydrationWarning className={fieldCls}>
                        <option value="" disabled>Select your trade</option>
                        {TRADES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-email" className={labelCls}>Email</label>
                      <input id="bk-email" name="email" type="email" required suppressHydrationWarning className={fieldCls} placeholder="you@company.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-market" className={labelCls}>Primary market <span className="font-normal normal-case text-dim">(optional)</span></label>
                      <input id="bk-market" name="market" suppressHydrationWarning className={fieldCls} placeholder="City + radius you serve" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-message" className={labelCls}>Anything we should know <span className="font-normal normal-case text-dim">(optional)</span></label>
                      <textarea id="bk-message" name="message" rows={3} suppressHydrationWarning className={fieldCls} placeholder="Where you are, where you want to be." />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 bg-blue-action px-7 py-4 text-[16px] font-semibold text-white transition-transform duration-200 ease-out hover:bg-blue active:scale-[0.99] disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Book my appointment"}
                    {status !== "sending" ? (
                      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
                    ) : null}
                  </button>
                  {status === "error" ? (
                    <p className="mt-4 text-[13.5px] text-red-ink">
                      Something went wrong. Email{" "}
                      <a href={`mailto:${FIRM.email}`} className="underline">{FIRM.email}</a> and we'll get you booked.
                    </p>
                  ) : (
                    <p className="mt-4 text-center text-[12.5px] text-dim">A senior strategist responds within one business day.</p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
