"use client";

import { useState } from "react";
import Link from "next/link";

/* /audit v1 — a static guided self-audit (no backend). The contractor checks
 * their own site against the enterprise standard the site teaches; the live gap
 * score is the verify-it-yourself moment and the tier-2 conversion hinge. v2
 * (a real URL scanner) is a later WO. */

const CRITERIA: { id: string; label: string; detail: string }[] = [
  { id: "service-pages", label: "A unique page for every service you offer", detail: "Not one 'Services' list, a real page each." },
  { id: "location-pages", label: "A unique page for every town you serve", detail: "Not one 'Service Areas' paragraph." },
  { id: "schema", label: "LocalBusiness / Organization schema in the HTML", detail: "Machine-readable facts, not just text." },
  { id: "answer-first", label: "Answer-first content", detail: "The buyer's question as a heading, the answer in the first line." },
  { id: "cwv", label: "Passes Core Web Vitals", detail: "Fast LCP, low CLS, INP under 200ms." },
  { id: "ssr", label: "Content is in the static HTML", detail: "Not rendered only after the page loads (AI-invisible)." },
  { id: "ai-legible", label: "An llms.txt file and AI-legible headings", detail: "So AI engines can read and cite you." },
  { id: "no-orphan", label: "No orphan pages", detail: "Every page reachable in two clicks or fewer." },
  { id: "cost", label: "Cost and pricing content for buyers", detail: "The researcher's first question, answered." },
  { id: "projects", label: "A portfolio of real, geo-tagged jobs", detail: "Real-job → page, never spun city names." },
];

export function SelfAudit() {
  const [have, setHave] = useState<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);

  const haveCount = CRITERIA.filter((c) => have[c.id]).length;
  const gap = CRITERIA.length - haveCount;
  const toggle = (id: string) => setHave((h) => ({ ...h, [id]: !h[id] }));

  return (
    <div>
      <ul className="border border-line bg-surface-2">
        {CRITERIA.map((c, i) => {
          const checked = !!have[c.id];
          return (
            <li key={c.id} className={i < CRITERIA.length - 1 ? "border-b border-line-soft" : ""}>
              <button
                type="button"
                onClick={() => {
                  toggle(c.id);
                  setStarted(true);
                }}
                aria-pressed={checked}
                className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-surface"
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-[12px] ${
                    checked ? "border-blue bg-blue-action text-white" : "border-line text-transparent"
                  }`}
                >
                  &#10003;
                </span>
                <span>
                  <span className={`block text-[15px] font-medium ${checked ? "text-ink" : "text-muted"}`}>{c.label}</span>
                  <span className="km-mono mt-0.5 block text-[12px] text-dim">{c.detail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Live result */}
      <div className="mt-8 border-t border-blue/50 bg-surface px-6 py-7">
        {started ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="km-display km-tabular text-[3rem] font-extrabold leading-none text-blue">{gap}</span>
              <span className="text-[15px] text-muted">of {CRITERIA.length} enterprise fundamentals missing</span>
            </div>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {gap === 0
                ? "If you genuinely have all ten, your site is already enterprise-grade. Bring it to us for an honest second audit, free."
                : `Every missing item is a reason a buyer searched and found someone else. This is exactly what we build, in the right order. Audit our own site against the same ten, then talk to us.`}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/apply" className="inline-flex items-center gap-2 bg-blue-action px-6 py-3 text-[14px] font-semibold text-white transition-transform duration-200 ease-out hover:bg-blue active:scale-[0.98]">
                This is what we fix &#8594;
              </Link>
              <Link href="/guides" className="km-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-blue hover:text-blue">
                Read the guides first
              </Link>
            </div>
          </>
        ) : (
          <p className="text-[15px] text-muted">
            Check each one your site already has. Your gap score updates as you go, no email required.
          </p>
        )}
      </div>
    </div>
  );
}
