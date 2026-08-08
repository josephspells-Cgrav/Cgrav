# BUILD REPORT — WO-QS2 (Meta `Lead` conversion fires exactly once per lead)

Builder: QS2-BUILDER (Sonnet) · Repo: `mabrey-roofing` (site), branch `master` @ HEAD `dd6a588`
Sandbox: `.../scratchpad/QS2_SANDBOX/` · Staged: `.../scratchpad/QS2_STAGED_DELIVERABLE/site/`
Nothing committed, nothing deployed, no CRM repo touched, no `.env` touched, no DDL run.

## Summary

`lib/server/forwardLead.ts` now returns `{ outcome, updated }` instead of a bare outcome
string — `updated` is parsed defensively from the CRM's response body and is `true` only when
the CRM confirms a funnel-session UPDATE (`updated: true`). `app/api/lead/route.ts` branches on
that flag: when `true`, it returns `{ ok: true }` with **no** `requestId` and skips the CAPI
block entirely (no fetch, no `waitUntil`); every other path (fresh insert, malformed CRM body,
forward failure, bot/honeypot/time-trap) is byte-identical to pre-WO-QS2 behavior. Both
mandatory gates are green on a clean rebuild, and two new verification scripts give real,
re-runnable runtime proof of the new contract (something no existing harness could reach — see
§Tests below).

## Base state accounted for

Built on the CURRENT repo (HEAD `dd6a588`) with QS's staged
`components/funnel/QuoteFunnel.tsx` + `components/funnel/useLeadSubmit.tsx` overlaid into the
sandbox for gate-running context (per the WO's instruction). **Neither of my two primary files
overlaps with QS's staged files** — QS touched only those two funnel components; I touched only
`lib/server/forwardLead.ts` and `app/api/lead/route.ts`. No merge-on-top-of-QS was needed for my
files specifically, but the sandbox's gates (tsc, build, the functional script) all ran against
the FULL post-QS state so the receipts are honest about what actually ships together. Confirmed
via `diff -rq` against the real repo before staging: exactly 4 files differ that I touched (see
below), plus QS's 2 (not restaged here — that's QS's own deliverable).

Also checked BL's and TK's staged deliverables (siblings in the same scratchpad) for a
collision on my two files — both touch only `mabrey-crm-app` `src/...` paths (assistant tools,
estimating/takeoff). Zero overlap with the site repo.

## Files touched (all under `site/` in the staging root)

| File | Change |
|---|---|
| `lib/server/forwardLead.ts` | `ForwardOutcome` (bare string) → `ForwardResult { outcome, updated }`. Parses the CRM's JSON body for `updated === true`, fail-open (`false`) on anything else. |
| `app/api/lead/route.ts` | `okBody(requestId?)` now optional; new branch after the forward call: `if (forwardResult.updated) return NextResponse.json(okBody());` (skips CAPI, omits `requestId`). Log line reads `forwardResult.outcome` — same printed word as before. |
| `scripts/verify-forward-lead-updated.mjs` | **NEW.** Direct runtime test of `forwardLead()`'s new contract against a real local mock HTTP server. |
| `scripts/lead-dedupe-functional.mjs` | **NEW.** Sibling to the existing `scripts/security-functional.mjs` — spawns a real `next start` + mock CRM, proves the route-level branch over genuine HTTP. |

## The shape I chose for `forwardLead`'s return, and why

```ts
export interface ForwardResult {
  outcome: ForwardOutcome; // unchanged 3-value union, untouched
  updated: boolean;
}
```

Went with the plain 2-field object over a 4th discriminated-union member
(`"forwarded_updated"`) for three reasons:

1. **The log line had to keep printing the exact same word for the exact same cases** (WO's
   hard requirement). `console.log(\`[lead] ${id} ${forwardResult.outcome}\`)` is a trivial
   field read with this shape. A union member would either change what prints
   ("forwarded_updated") or need a translation step at the call site — both worse.
2. **`updated` is a genuinely orthogonal axis** from `outcome` (did the HTTP leg succeed, vs.
   did the CRM report a merge) — a union member would create representable-but-impossible
   states ("skipped_no_url_updated" makes no sense) that then need to be *not* constructed by
   convention. The 2-field shape makes the invalid state simply "not returned" by construction
   (I only ever set `updated: true` inside the one branch where `outcome` is already
   `"forwarded"`), with nothing to accidentally mismatch elsewhere.
3. Every existing call site that only reads `.outcome` (there's only the one, the log line)
   needed zero change to its access pattern.

`forwardLead.ts`'s fail-open reasoning is recorded in the `ForwardResult.updated` doc comment,
exactly as the WO asked — under-counting a real conversion is silent and permanent (starves
Meta's optimizer); a duplicate is the failure mode we can still catch downstream (the "Meta N
== CRM N" reconciliation, and Meta's own eventID dedup once a requestId exists).

## Receipts

- **`trackMetaLead` early-return reuse** — `lib/track.ts:74`, `if (!eventId) return;` (inside
  `trackMetaLead(eventId: string | undefined)`). Confirmed by direct read: when the route omits
  `requestId`, QS's staged `components/funnel/useLeadSubmit.tsx:129` does
  `trackMetaLead(body?.requestId)`, which passes `undefined` straight into this exact guard —
  no second guard needed, no client change made. Verified, not just asserted: I did NOT edit
  `useLeadSubmit.tsx` (WO item 3's own instruction — "only touch this file if the verification
  proves a change is genuinely required"; it didn't).
- **Unchanged log line** — `app/api/lead/route.ts:150`:
  `` console.log(`[lead] ${id} ${forwardResult.outcome}`); `` — same template, same 3 possible
  printed words (`forwarded` / `skipped_no_url` / `forward_failed`), just reading `.outcome` off
  the new object instead of a bare variable.
- **Bot/honeypot/time-trap paths unchanged** — `app/api/lead/route.ts:83,101,109` all still call
  `okBody(id)` verbatim (grep-confirmed pre/post-edit; only the one new branch at line 168-170
  calls the bare `okBody()`).

## Gates (both FOREGROUND, verbatim tails, clean rebuild)

**`npx tsc --noEmit`** — exit 0, zero output (clean).

**`npx next build`** (`.next` deleted first — genuine clean rebuild, not an incremental one):

```
▲ Next.js 16.2.12 (Turbopack)

⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
  Creating an optimized production build ...
✓ Compiled successfully in 8.4s
  Running TypeScript ...
  Finished TypeScript in 9.0s ...
  Collecting page data using 7 workers ...
✓ Generating static pages using 7 workers (146/146) in 3.7s
  Finalizing page optimization ...
...
├ ƒ /api/lead
...
```

Exit 0. 146/146 routes generated, `/api/lead` present as a dynamic function route. The one
warning (middleware→proxy) is pre-existing and unrelated to this change — confirmed present
before my edits too.

## Tests

No existing harness could reach this behavior directly, and I want to state exactly why rather
than wave at it:

- The only test tooling in this repo is Playwright (`tests/*.spec.ts`, driven over real HTTP
  against a running server) — there is no jest/vitest/ts-node, and no `test` npm script.
- `lib/server/forwardLead.ts` starts with `import "server-only"`, which throws under Node's
  default module-resolution condition (confirmed empirically: both plain `node` and Playwright's
  own test runner throw `"This module cannot be imported from a Client Component module"` on
  import) — it's designed to be neutralized by a bundler alias (Next's webpack/turbopack), not
  by any test runner. `node --conditions=react-server` resolves it to the package's own
  genuine no-op (`node_modules/server-only/empty.js`) and fixes this cleanly.
- Importing `app/api/lead/route.ts` directly (bypassing the dev server) hits a SEPARATE,
  unrelated wall: Playwright's transform can't resolve the bare specifier `next/server` at all
  (`Cannot find module '.../next/server'`), independent of the `server-only` issue and
  independent of my change — confirmed by testing without `--conditions` too, same failure.
  This is presumably why the existing suite (`tests/quote-funnel.spec.ts`'s own header comment)
  says the forward/CAPI path is only ever "verified directly against a mock webhook receiver
  outside this suite" — prior builders hit the same wall.

Given that, "add one if none" (WO's own words) meant building real, re-runnable verification —
not a fake test that reimplements the logic instead of exercising it. Two scripts, both run
GREEN in the foreground above and reproducible with the commands in their own header comments:

**`scripts/verify-forward-lead-updated.mjs`** (`node --conditions=react-server
scripts/verify-forward-lead-updated.mjs`) — imports `forwardLead()` directly (zero `@/` aliases
in that file, so this works cleanly) against a real local mock HTTP server I control per-case:

```
  [PASS] URL unset -> skipped_no_url / updated:false
  [PASS] fresh insert (no `updated` key) -> forwarded / updated:false
  [PASS] funnel-session update (`updated:true`) -> forwarded / updated:true
  [PASS] `updated` present but not boolean-true -> updated:false
  [PASS] malformed/non-JSON 200 body -> fail-open -> forwarded / updated:false
  [PASS] empty 200 body -> fail-open -> forwarded / updated:false
  [PASS] CRM 500 -> forward_failed / updated:false
  [PASS] network failure -> forward_failed / updated:false
============================================================
FORWARD-LEAD-UPDATED: 8/8 GREEN
```

(Hit one real bug while building this: `process.exit()` right after a failed-connection test
tripped a libuv teardown assertion on Windows — `Assertion failed: !(handle->flags &
UV_HANDLE_CLOSING)`. Fixed by using a non-privileged closed port + `process.exitCode` instead of
a forced `process.exit()`, letting pending handles drain. Cosmetic — all 8 logical assertions
had already printed PASS before the crash — but a crashing exit isn't a clean receipt, so I
fixed it rather than report around it.)

**`scripts/lead-dedupe-functional.mjs`** (`node scripts/lead-dedupe-functional.mjs`, requires a
prior `next build`) — sibling to the existing `scripts/security-functional.mjs`, same house
style: spawns a REAL `next start` server with `LEAD_WEBHOOK_URL` pointed at a mock CRM I
control, asserts over genuine HTTP:

```
  [PASS] next start is reachable
  [PASS] fresh insert -> 200
  [PASS] fresh insert -> requestId present               — {"ok":true,"requestId":"y55gkuhq"}
  [PASS] fresh insert -> forwarded once                   — forwards=1
  [PASS] update path -> 200
  [PASS] update path -> ok:true still present              — {"ok":true}
  [PASS] update path -> requestId ABSENT (key omitted)     — {"ok":true}
  [PASS] malformed CRM body -> 200
  [PASS] malformed CRM body -> fail-open -> requestId present  — {"ok":true,"requestId":"u9ltb0j5"}
  [PASS] CRM 500 -> 200 (lead response unaffected)
  [PASS] CRM 500 -> no regression -> requestId present     — {"ok":true,"requestId":"rfa13cpi"}
  [PASS] honeypot -> 200
  [PASS] honeypot -> ok:true + requestId present (unchanged) — {"ok":true,"requestId":"v9yhehv1"}
  [PASS] time-trap -> 200
  [PASS] time-trap -> ok:true + requestId present (unchanged) — {"ok":true,"requestId":"6u0s93tv"}
============================================================
LEAD-DEDUPE-FUNCTIONAL: 15/15 GREEN
```

Both scripts re-run clean after the final rebuild (exit 0, no orphaned processes/ports —
verified via `Get-NetTCPConnection` after each run).

### The one thing I could NOT directly observe, and why (proof-by-construction instead)

The WO's test bullets ask for "CAPI called once" / "CAPI not called." I could not observe this
directly: `sendLeadCapiEvent()` posts to a hardcoded `https://graph.facebook.com/...` URL with
no env override, and with `LEAD_CAPI_PIXEL_ID`/`FB_CAPI_ACCESS_TOKEN` unset (as both my script
and the pre-existing `security-functional.mjs` leave them) it's `"skipped_no_config"` — a
genuine no-op — **regardless** of whether `route.ts` even calls it. So "was fetch attempted"
isn't distinguishable from outside the process in this environment without either (a) hitting
Meta's real API with fake credentials from a test, which I won't do, or (b) editing `capi.ts`
to accept a URL override, which is out of my two-file scope.

What I proved instead, and why it's airtight: the `updated:true` branch is a single early
`return NextResponse.json(okBody())` that sits BEFORE the CAPI block, with nothing else between
them (`app/api/lead/route.ts:168-170`). The functional script's "update path -> requestId
ABSENT" assertion can only pass if that exact `return` executed — and a `return` means the CAPI
block physically did not run. Proving the branch was taken proves the skip; there's no code path
that reaches `requestId` absence any other way.

### Deliberate economization (not a gap)

`skipped_no_url` is fully covered at the `forwardLead()` unit level (script 1) but I did not
spin up a SECOND `next start` instance with `LEAD_WEBHOOK_URL` unset just to re-prove it at the
HTTP level — once `forwardLead` returns `updated: false`, the caller-side handling is IDENTICAL
regardless of which of the three `updated:false`-producing outcomes triggered it
(`skipped_no_url` / `forward_failed` / malformed body), and the functional script already
exercises that shared downstream path twice (`Forward Fail HTTP`, `Malformed CRM HTTP`). A
second full server spawn would have doubled the script's runtime for zero new coverage.

## STOPs (WO silent — recorded, not acted on)

1. **No npm script wired for the 2 new verify scripts.** The repo's house style
   (`security-audit`, `security-functional`, `doorway-check`, `reachability-check`) gives each
   its own `package.json` script entry. The WO named exactly two files as my surface and didn't
   mention `package.json`; I chose not to touch a shared config file outside that scope. Both
   scripts document their exact run command in their own header comment. If wiring is wanted:
   `"verify-forward-lead": "node --conditions=react-server scripts/verify-forward-lead-updated.mjs"`,
   `"lead-dedupe-functional": "node scripts/lead-dedupe-functional.mjs"`.
2. **`bookingUrl` is not threaded through `forwardLead`/`route.ts` today** (noticed, not touched
   — unrelated to this WO). `components/funnel/useLeadSubmit.tsx` (both the current repo's copy
   and QS's staged one) already reads `body?.bookingUrl` off `/api/lead`'s response, but neither
   the current nor my updated `route.ts`/`forwardLead.ts` ever populates it — the CRM's
   `site-lead` route computes and returns `bookingUrl` on both insert and update, but the site
   side has no wire for it yet. This looks like intentional, tolerant incompleteness (OS47's own
   comments frame the field's presence/absence as the copy switch, "honest on both sides of the
   rollout") rather than a bug, and it's orthogonal to Meta-conversion dedup, so I left it alone.
   Flagging only because I was reading this exact code path anyway.
3. **1 high-severity `npm audit` finding** surfaced by `npm ci` — pre-existing, unrelated to
   this change, out of scope; not investigated further.

## What I did NOT do

- Did not touch the CRM repo (`mabrey-crm-app`) at all.
- Did not touch `components/funnel/QuoteFunnel.tsx` or `useLeadSubmit.tsx` — verified (WO item
  3) that no change is required there; did not edit them.
- Did not commit, push, or deploy anything.
- Did not touch `.env`/secrets, run any DDL, or modify `package.json`.
