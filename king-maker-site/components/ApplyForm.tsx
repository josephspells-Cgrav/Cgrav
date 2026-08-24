"use client";

import { useState, type FormEvent } from "react";
import { Crest } from "./Crest";
import { FIRM } from "@/lib/site.config";

const VERTICALS = ["Roofing", "HVAC", "Plumbing", "Electrical", "General Contractor", "Other Trade"];
const REVENUE = ["Under $1M", "$1M – $3M", "$3M – $10M", "$10M+"];

const inputCls =
  "w-full border border-line bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-dim focus:border-blue focus:outline-none";
const labelCls = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-dim";

export function ApplyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setStatus(json.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-blue/40 bg-surface-2 px-7 py-12 text-center">
        <Crest className="mx-auto h-9 w-auto" tone="blue" />
        <h2 className="mt-6 text-[24px] font-bold text-ink">We have your application.</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          We review every application personally. If your market is open and you&rsquo;re a fit,
          we&rsquo;ll reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-surface-2 px-6 py-8 sm:px-9 sm:py-10">
      {/* honeypot */}
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Your name
          </label>
          <input id="name" name="name" required suppressHydrationWarning className={inputCls} placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company
          </label>
          <input id="company" name="company" required suppressHydrationWarning className={inputCls} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="vertical" className={labelCls}>
            Vertical
          </label>
          <select id="vertical" name="vertical" required defaultValue="" suppressHydrationWarning className={inputCls}>
            <option value="" disabled>
              Select your trade
            </option>
            {VERTICALS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="revenue" className={labelCls}>
            Annual revenue
          </label>
          <select id="revenue" name="revenue" required defaultValue="" suppressHydrationWarning className={inputCls}>
            <option value="" disabled>
              Select range
            </option>
            {REVENUE.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="market" className={labelCls}>
            Primary city + radius
          </label>
          <input id="market" name="market" required suppressHydrationWarning className={inputCls} placeholder="e.g. Charlotte, NC + 40 mi" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input id="email" name="email" type="email" required suppressHydrationWarning className={inputCls} placeholder="you@company.com" />
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="situation" className={labelCls}>
          Tell us your situation
        </label>
        <textarea
          id="situation"
          name="situation"
          rows={4}
          suppressHydrationWarning className={inputCls}
          placeholder="Where you are, where you want to be, what you've tried."
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 bg-blue-action px-7 py-3.5 text-[15px] font-semibold text-white transition-transform duration-200 ease-out hover:bg-blue active:scale-[0.98] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Application"}
          {status !== "sending" ? (
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
              &#8594;
            </span>
          ) : null}
        </button>
        <span className="text-[12px] text-dim">A senior strategist responds within one business day.</span>
      </div>
      {status === "error" ? (
        <p className="mt-4 text-[13px] text-red">
          Something went wrong. Email {""}
          <a href={`mailto:${FIRM.email}`} className="underline">
            {FIRM.email}
          </a>{" "}
          and we&rsquo;ll take it from there.
        </p>
      ) : null}
    </form>
  );
}
