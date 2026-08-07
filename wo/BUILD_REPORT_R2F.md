# BUILD REPORT — R2F (/book honest refusal copy)

Repo: `C:/Users/josep/Claude Gravity/mabrey-roofing`, branch `master`.
Sandbox: `.../scratchpad/R2F_SANDBOX/` (robocopy of the working tree, excluding
`node_modules/.next/.git`; working tree was clean except one unrelated
untracked file `.night-copy-verify.mjs`, not touched).
Staged deliverable: `.../scratchpad/R2F_STAGED_DELIVERABLE/components/booking/BookingFlow.tsx`.
No commit, no deploy, no `.env` touched, no DDL.

## Package manager

Repo carries **both** `package-lock.json` and `pnpm-lock.yaml`. Disambiguated
via `vercel.json`: `"installCommand": "npm ci"` — production deploy uses
**npm**, so the sandbox used `npm install` (matches `package-lock.json`).

## CRM route read (read-only, no CRM edit made)

Read `C:/Users/josep/Claude Gravity/mabrey-crm-app/src/app/api/booking/public/book/route.ts`
and `.../src/lib/booking-public.ts`. Confirmed exact shape:

- `SlotUnavailableReason = "unavailable" | "taken"` (booking-public.ts:203, a
  literal union type).
- The pre-check 409 (route.ts:61-67) returns
  `{ ok: false, error: "slot_unavailable", reason: "unavailable" | "taken" }`
  — `"taken"` when the slot is in-grid but already marked unavailable,
  `"unavailable"` when off-grid entirely (past/out-of-window/Sunday/blackout).
- The DB-race conflict 409 (route.ts:77-81, real simultaneous-booking
  collision at the `appointments_org_slot_uq` constraint) returns
  `{ ok: false, error: "slot_unavailable" }` — **no `reason` field**. This is
  a genuine "someone else just took it" case, so falling through to the
  existing "taken" copy for a missing `reason` is correct, not a gap.
- Confirmed the field survives to the browser: `mabrey-roofing`'s own
  `app/api/booking/book/route.ts` is a thin same-origin proxy that does
  `const j = await r.json(); return NextResponse.json(j, { status: r.status })`
  — passes the CRM body through verbatim, `reason` included.

Field is real. No STOP needed on this point.

## THE CHANGE — `components/booking/BookingFlow.tsx`

`book()`'s `r.status === 409` branch now parses the body and branches on
`reason`, instead of using one hardcoded string for every 409.

**Before** (lines 131-135 of the original):
```tsx
        if (r.status === 409) {
          // Someone beat them to it — re-fetch live truth, say so plainly.
          await load("That time just got taken — these are still open.");
          return;
        }
```

**After:**
```tsx
        if (r.status === 409) {
          // The CRM discriminates WHY (reason: "taken" | "unavailable") —
          // someone really booking it is not the same fact as the day going
          // dark (e.g. a blackout set after this tab loaded), and the page
          // must not tell the second lie. Either way, re-fetch live truth so
          // the customer SEES it change, not just reads a message.
          let reason: string | undefined;
          try {
            const body = (await r.json()) as { reason?: string };
            reason = body.reason;
          } catch {
            // Unparseable body — falls through to the taken copy below.
          }
          if (reason === "unavailable") {
            await load("We're not available that day anymore — please pick another time.");
            return;
          }
          await load("That time just got taken — these are still open.");
          return;
        }
```

Mapping: `reason: "taken"` falls through to the **same, byte-for-byte**
`load("That time just got taken — these are still open.")` call as before
(not touched, not retyped — same statement). `reason: "unavailable"` gets
the new sentence, verbatim from the WO (confirmed straight apostrophe `'`
0x27 and em dash `—` U+2014 by byte-inspecting the WO file, not
transcribed from memory). No `reason` / unparseable body / any other
non-409 error path all still resolve to the original fallback strings,
untouched. `load(...)` is called in both branches exactly as before, so the
re-fetch-and-re-render behavior (the customer sees the day disappear) is
preserved unchanged in both cases. Nothing else in the file — no JSX, no
layout, no other string — was touched; confirmed by diffing the sandbox
file against the live repo file (single hunk, lines 131-135 → 131-150).

No additional copy invented. No headings, apology text, or emoji added.

## GATES

- **Typecheck** (`npm run typecheck` → `tsc --noEmit`): ✅ PASS, clean, zero
  errors.
- **Build** (`npm run build` → `next build`, Turbopack, Next 16.2.12): ✅
  PASS, `✓ Compiled successfully`, all 146 routes generated including
  `/book` and `/api/booking/book`.
- **Test script**: none exists in `package.json` (`typecheck`, `build`,
  `lint`, `security-audit`, `security-functional`, `doorway-check`,
  `reachability-check` are the only scripts — no `test`/jest/vitest). N/A,
  not silently skipped — confirmed absent.
- **Lint** (`npm run lint` → `next lint`): ❌ tool-level failure, but
  **pre-existing and unrelated** — it errors at CLI argument-parsing
  (`Invalid project directory provided, no such directory: ...\lint`)
  before touching any source file, i.e. before my change could possibly be
  in the loop. Not requested by the WO (WO says typecheck/build/test/
  Playwright); ran it anyway for diligence, reporting it rather than
  hiding it, not fixing it (out of scope — a `next lint` CLI/version issue
  unrelated to a two-file string+branch change).
- **Playwright** (`npx playwright test --project=desktop`, prod server via
  `next start` on :3210 per `playwright.config.ts`): ❌ **122 passed / 20
  failed / 9 skipped** (6.0m). All 20 failures are on routes and assertions
  that do not import or exercise `BookingFlow.tsx` (confirmed zero matches
  for `BookingFlow` or `/book` across `tests/`): `home`, `services-hub`,
  `service-replacement`, `brand-gaf`, `service-ventilation`,
  `commercial-hub`, `cost`, `financing`, `contact`, `project-brier-creek`,
  `certifications` (all "renders + a11y"), three `WO_23 homepage polish`
  assertions, `heading-legibility` on `/storm-damage`, three `nav.spec.ts`
  checks, and two `persistence.spec.ts` hero-video checks.

  **Causal check performed** (this is the one place I went beyond the
  letter of the WO, in the interest of not conflating a pre-existing gap
  with this change on a page the WO calls high-stakes): reverted
  `BookingFlow.tsx` to the original unmodified content in the sandbox,
  rebuilt, restarted the server, and re-ran 5 of the 20 failing tests by
  exact name (`home renders + a11y`, `desktop header is atomic…`,
  `footer surface-map links present…`, `WO_23 … B1: every heading
  underline…`, `persistence … reveal markers: FULL shows the stage…`).
  **All 5 failed identically** against the untouched original file — same
  error, same locator, same timeout. Conclusive: these 20 failures are
  pre-existing/environmental in this sandbox, not caused by this change.
  Re-applied my edit afterward and re-ran typecheck + build clean (see
  above) to confirm the final staged file is the fixed one, not the
  reverted one.

  Not investigated further or fixed — out of scope per the WO's hard
  constraint ("This is a string + a branch, nothing else"); flagging root
  cause (missing env var / unreachable asset host / genuine pre-existing
  a11y or layout bug on `master`) is a separate piece of work.

## STOP questions

None. The `reason` field was present exactly as the WO described, so no
STOP was triggered.

## REGISTRATION

N/A — this WO does not touch `src/lib/assistant.ts` or any Alex tool; it's
a different repo (mabrey-roofing, the public site) entirely, no CRM-side
change.

## Files touched

- `components/booking/BookingFlow.tsx` — the only file created or modified.
  Staged at `.../scratchpad/R2F_STAGED_DELIVERABLE/components/booking/BookingFlow.tsx`.

## House idioms carried over

- `await load(notice)` re-fetch-and-annotate pattern (pre-existing in this
  file) — reused unchanged, not reinvented, per the "re-fetch live truth"
  requirement.
- Em-dash-separated inline comment voice matching the file's existing
  comments (e.g. the original "Someone beat them to it — re-fetch live
  truth, say so plainly." style) — carried into the replacement comment.
