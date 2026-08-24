"use client";

import { useState } from "react";

/* Cat 10 centerpiece (WO_09 §3) — the hardened, copy-paste AI audit prompt.
 * Rendered in the .km-code housing (the one sanctioned dark accent block) with a
 * copy button. Honest by construction: it tells the AI to reflect the site, not
 * promise rankings. No motion beyond a color transition + an instant copied
 * state (reduced-motion safe). */

const AUDIT_PROMPT = `You are a senior technical-SEO auditor for home-service contractor websites. Audit the website at:
[PASTE YOUR WEBSITE URL HERE]

Browse the site before answering. Assess only what you can verify by visiting it. If you cannot reach a page, say so instead of guessing. Be strict and specific, with no generic praise.

Do all four steps:

1. CLASSIFY the site as one of:
   - BROCHURE: about 5-10 pages, no dedicated per-city or per-service pages, mostly a digital business card.
   - STANDARD: about 10-20 pages, with dedicated service pages, dedicated location/city pages, online scheduling, and basic on-page and technical SEO.
   - ENTERPRISE: 50+ pages, deep service-by-city coverage, schema markup, fast load, answer-first content.
   State which tier it is, and why.

2. CHECK what is broken or missing for that tier: dedicated location pages, dedicated service pages, title tags and headings, meta descriptions, internal links, schema markup, page speed, mobile usability, answer-first content, and online booking. Flag anything broken or absent.

3. SCORE the site from 1 to 10 (1 = bare brochure, 10 = complete enterprise system). Give the number, then one sentence of justification.

4. LIST two checklists: one titled "Done well" and one titled "Broken or missing." Be concrete and name the actual page or element. End with the single highest-impact fix.

Do not promise rankings or guarantees. Reflect what the site actually is, not what it could become.`;

export function AuditPrompt() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(AUDIT_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the prompt is fully visible to select manually */
    }
  };
  return (
    <div className="my-8">
      <p className="mb-3 text-[14.5px] font-medium text-muted">
        Paste this into ChatGPT, Claude, or Gemini, then drop your website link where it says so.
      </p>
      <div className="relative">
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Audit prompt copied" : "Copy the audit prompt"}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 bg-blue-action px-3.5 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-blue focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {copied ? (
            <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="11" height="11" rx="0" />
              <path d="M5 15V5a1 1 0 0 1 1-1h10" />
            </svg>
          )}
          {copied ? "Copied" : "Copy prompt"}
        </button>
        <pre className="km-code overflow-x-auto whitespace-pre-wrap break-words px-5 py-5 pr-28 text-[13px] leading-relaxed">
          {AUDIT_PROMPT}
        </pre>
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-dim">
        It reports what your site is, not what it could be. No tool can promise a ranking, and this one
        will not either.
      </p>
    </div>
  );
}
