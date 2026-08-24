# WS-D BUILDER — Interactive conversion tooling + the funnel (SECURITY-SENSITIVE)

You are the **WS-D builder** on the King Maker authority roofing build (Phase A–E, parallel).
Architect/reviewer = `website-engineer` (WE12). You touch the lead pipeline — **the security
receipt must stay 10/10 GREEN**. Work ONLY in your worktree.

## 0. BOOT — in order, do not skip
1. `cd "C:/Users/josep/Claude Gravity/so-ws-d"` — confirm branch `ws-d-funnel`. Never touch another worktree.
2. `npm install`.
3. Fire **`kmwe`**.
4. **Ultrathink-reread to convergence (min 3 passes):** `vault/wiki/km-authority-build-program.md` → `vault/wiki/km-research-roofing-site-blueprint-2026.md` (§1 Category I tooling) + **`vault/wiki/km-research-funnel-vs-leadform-2026.md`** (the funnel decision: BUILD don't rent, gate behind CAPI, storm=call/retail=quiz, judge on cost-per-booked-call) → `BUILD-CONTRACT.md` (§2 row + **§5 CSS-owned list** + **§9 WS-D rulings — all BINDING**) → `app/api/lead/route.ts`, `lib/leadSchema.ts`, `components/EstimateQuiz.tsx`, `components/FinancingCalculator.tsx`, `lib/finance.ts`, `lib/track.ts`.
5. Then build.

## 1. SCOPE — touch ONLY these (BUILD-CONTRACT §2)
- **EXTENDS**: `components/EstimateQuiz.tsx`, `components/FinancingCalculator.tsx`, `components/SecondaryEstimate.tsx`, `lib/finance.ts`, `lib/track.ts`.
- **CREATES**: `components/tools/**`, `components/funnel/**`, `lib/funnel.ts`, `lib/types/funnel.ts`.
- ⛔ **CSS-OWNED — coordinate, do NOT edit solo**: `app/api/lead/route.ts`, `lib/leadSchema.ts`, `lib/leadConstants.ts`, `next.config.ts`. (BUILD-CONTRACT §5.)

## 2. BUILD — launch-wave subset
- **Cost calculator** (`/roof-cost-calculator`) + **financing payment-calculator** (`/financing/payment-calculator`) — interactive, lead-capturing, also win "how much does a roof cost in [city]" AI-Overviews. (Satellite-estimate + visualizer = Wave 2, not now.)
- **Instrument the existing dual-intent quiz** — step-level drop-off events to `lib/track.ts`, a **config-driven question array**, an A/B variant flag (the funnel research mandates these or the build loses to a rented tool on rate-of-learning).
- **CAPI = SERVER-ONLY at launch, NO browser Meta Pixel** (§9 — preserves CSP Control #1/#2 + zero-stored-data). Secrets `LEAD_CAPI_*`/`FB_CAPI_ACCESS_TOKEN` server-only (never `NEXT_PUBLIC_*`).

## 3. YOUR BINDING §9 RULINGS — read twice
- **LeadExtension ordering (BLOCKING):** the matching strict-Zod fields in `lib/leadSchema.ts` (CSS-owned) MUST merge to `main` **BEFORE** any WS-D branch POSTs them, or `strictObject` 400s and silently drops the lead. Pinned launch set: `quizAnswers{situation,zip,leaking}`, `estimateLow`, `estimateHigh`. `QuizAnswers` is a BOUNDED interface (not an open Record). **Add a route test asserting 200 on a full quiz payload.**
- **Estimates are advisory** — send validated `CalcInput`; recompute the band SERVER-SIDE.
- **Bot-defense:** every new funnel surface that POSTs `/api/lead` MUST replicate ContactForm's honeypot + `startedAt` time-trap (send `t`) or it auto-drops as a bot.
- **Zero-PII logging:** delete the demo `console.log` of PII in `EstimateQuiz.tsx` when wiring the live POST; never log lead values.

## 4. ⚠️ COORDINATION — the CSS agent (do this FIRST)
Ping `cyber-security-specialist-1` on the bus BEFORE you build the POST path: the new lead fields go into the CSS-owned `lib/leadSchema.ts` (strict Zod), and CSS merges them to `main` first. CAPI fires server-side from the existing route. `npm run security-audit` must stay **10/10 GREEN** after any change. The validation order is load-bearing: rate-limit → BotID → honeypot → time-trap → Zod → HMAC forward.
```
node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" send --from website-engineer --to cyber-security-specialist-1 --type ping --body "WS-D needs leadSchema fields merged to main first: quizAnswers{situation,zip,leaking}, estimateLow, estimateHigh (bounded). Then I wire the server-side CAPI + quiz POST."
```

## 5. GATES — all green before you report (§6)
`npx tsc --noEmit` · `npm run build` · `npx playwright test --project=desktop` (+ `--project=mobile`) · **`npm run security-audit` (must be 10/10 GREEN)** · the new full-quiz-payload route test (200) · axe 0 critical/serious. Then `git add -A && git commit -m "WS-D: tools + funnel + CAPI"`. **DO NOT deploy/merge.**

## 6. PRESERVE
The dual-intent fork (storm=call-first / retail=quiz-first) · the quiz is NOT demoted · zero-stored-data + static CSP (no nonce) · the security receipt GREEN · proven copy.

## 7. REPORT
When done + gates green: print a completion report in this session, then —
`node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" send --from website-engineer --to human --type ws-report --body "WS-D COMPLETE on ws-d-funnel — gates green incl. security 10/10 + quiz-payload 200 test. Built: <1-line>. Ready for WE12 QA + Phase F."`
Then STOP.
