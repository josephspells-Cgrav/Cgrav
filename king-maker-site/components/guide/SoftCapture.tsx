"use client";

import { useState, type FormEvent } from "react";

/* Tier-1 soft capture — ONE field, value never gated. "Email me this guide as a
 * PDF." Posts to the same /api/lead sink with a type marker. The guide is fully
 * readable for free; this is opt-in, not a wall. */
export function SoftCapture({ guideSlug, label = "Want this guide as a PDF?" }: { guideSlug: string; label?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const email = new FormData(e.currentTarget).get("email");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "guide-pdf", email, source: guideSlug }),
      });
      const json = await res.json();
      setStatus(json.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="my-10 border border-line bg-surface px-6 py-7">
      {status === "ok" ? (
        <p className="text-[15px] text-ink">
          <span className="km-mono mr-2 text-blue">&#9670;</span>
          On its way. Check your inbox.
        </p>
      ) : (
        <>
          <p className="text-[15px] font-semibold text-ink">{label}</p>
          <p className="mt-1.5 text-[13.5px] text-dim">One field. We&rsquo;ll email it. The guide stays free either way.</p>
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label htmlFor={`sc-${guideSlug}`} className="sr-only">
              Email address
            </label>
            <input
              id={`sc-${guideSlug}`}
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              suppressHydrationWarning
              className="w-full border border-line bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-dim focus:border-blue focus:outline-none sm:max-w-xs"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex shrink-0 items-center justify-center bg-blue-action px-6 py-3 text-[14px] font-semibold text-white transition-transform duration-200 ease-out hover:bg-blue active:scale-[0.98] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Email me the PDF"}
            </button>
          </form>
          {status === "error" ? <p className="mt-3 text-[13px] text-red">Something went wrong. Try again.</p> : null}
        </>
      )}
    </div>
  );
}
