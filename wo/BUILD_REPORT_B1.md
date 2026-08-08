# BUILD REPORT — WO-B1 (Booking blackout dates, Sonnet-5 builder)

Repo: `C:/Users/josep/Claude Gravity/mabrey-crm-app` (branch `showroom-integration`).
Sandbox: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/B1_SANDBOX/mabrey-crm-app`.
Staged deliverable: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/B1_STAGED_DELIVERABLE/` (16 files, exact repo-relative paths).
Never committed, never deployed, never wrote to any database, never touched `.env`. `scripts/set-booking-blackout.mjs` was **not run**.

## 1. GATE TAILS — VERBATIM

**✅ `npx tsc --noEmit`** — ran three times across the build (before the build-gate fix, and after); every run clean, zero output:
```
TSC_EXIT=0
```
(No diagnostics at all — tsc prints nothing on a clean run.)

**✅ `npm test`** — full suite, run three times total. Final run, against the fully-corrected code (post §1b fix below):
```
ℹ tests 3388
ℹ suites 931
ℹ pass 3388
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```
Also ran my 4 new files in isolation for a clean, fast read (`npx tsx --test src/lib/booking-blackouts.test.ts src/lib/booking-public-blackout.test.ts src/lib/scheduling-blackout.test.ts src/lib/booking-core-blackout.test.ts`), re-run AGAIN after the §1b build fix to confirm the refactor changed nothing observable:
```
ℹ tests 40
ℹ suites 15
ℹ pass 40
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```
(The `[booking-blackouts] malformed ... — ignoring ...` lines that print before this summary are **expected** — they're the `console.warn` calls the malformed-input tests deliberately trigger, proving the "never throw" law holds.)

Baseline sanity: prior known prod test count (vault kernel) was 3194; this repo's live `test` script has since grown to 3388 total (164 files) at my sandbox snapshot, purely from other builders' concurrent work landing test files — none of it collides with mine (see §5).

**✅ `npm run build`** — clean on the SECOND attempt (see §1b for the first attempt's real failure and fix). Final tail:
```
 ✓ Compiled successfully in 7.0min
   Skipping linting
   Checking validity of types ...
   Collecting page data ...
   Generating static pages (0/9) ...
   Generating static pages (2/9)
   Generating static pages (4/9)
   Generating static pages (6/9)
 ✓ Generating static pages (9/9)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                                    Size  First Load JS
┌ ○ /                                                         423 B         103 kB
├ ○ /_not-found                                               999 B         104 kB
├ ƒ /ads                                                    2.72 kB         118 kB
├ ƒ /api/appointments                                         423 B         103 kB
├ ƒ /api/appointments/[id]                                    423 B         103 kB
[... full route table, ~120 routes, all ○/ƒ, zero errors ...]
+ First Load JS shared by all                                103 kB
ƒ  Middleware                                                 132 kB
```
Full route table includes `/api/appointments`, `/api/appointments/[id]`, and every `/api/booking/*` route with no errors or warnings beyond the routine `Skipping linting` note.

### 1b. 🔴 A REAL build-gate failure, caught and fixed — the reason all three gates matter

The FIRST `npm run build` attempt **failed** with a genuine architectural regression that neither `tsc` nor `npm test` could have caught:

```
./src/lib/audit.ts
Error: You're importing a component that needs "next/headers". That only works
in a Server Component which is not supported in the pages/ directory.
Import trace for requested module:
./src/lib/audit.ts -> ./src/lib/production.ts -> ./src/lib/financials.ts ->
./src/lib/org-settings.ts -> ./src/lib/booking-blackouts.ts -> ./src/lib/scheduling.ts
-> ./src/lib/format.ts -> ./src/components/global-search.tsx
> Build failed because of webpack errors
```

**Root cause:** `src/lib/scheduling.ts` was, before this WO, a dependency-free leaf module (only `@date-fns/tz`) — safe to import from literally anywhere, including client components (`src/lib/format.ts` imports just its `BUSINESS_TZ` constant, and `format.ts` is in turn imported by `src/components/global-search.tsx`, a client-reachable component). My first draft had `scheduling.ts` import `etDateOf`/`isBlackedOut` from `booking-blackouts.ts` for the day-key check — but `booking-blackouts.ts` also exports `loadBlackoutDates`, which imports `getSettingValue` from `org-settings.ts`, which transitively chains through `financials.ts` -> `production.ts` -> `audit.ts` -> `next/headers` (server-only). ES module imports are file-level for bundling purposes, so importing ANY export from `booking-blackouts.ts` pulled the WHOLE heavy chain into `scheduling.ts`'s graph — and therefore into `global-search.tsx`'s client bundle, which Next.js correctly refuses to build.

**Fix:** removed the cross-module import entirely. `freeSlots`'s day-walk loop already computes `y`/`m`/`d` (dayStart's own ET calendar-date components) locally two lines above the blackout check, so the "YYYY-MM-DD" key is now built inline (`` `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}` ``) and checked with a plain `.has()` — byte-identical output to `etDateOf`/`isBlackedOut`, zero new imports, `scheduling.ts` restored to a pure leaf. Re-ran all three gates clean afterward (tsc, the 4 new test files in isolation, the full 3388-test suite, and the build) — see the tails above.

**Why this matters for the report:** this is exactly why the WO requires all three gates, not just `tsc`+`npm test` — a type-correct, unit-tested, logically-pure function can still break the actual production bundle via a transitive import a type checker has no reason to flag. Checked (via grep across `src/lib`, `src/components`, `src/app`) that `booking-core.ts`, `booking-public.ts`, and `vapi-tools.ts` — the other three files that DO still import from `booking-blackouts.ts` — are all server-only (never reachable from a client component), so this class of problem does not recur elsewhere in this build.

## 2. FILES TOUCHED (16 staged)

**In the WO's literal "YOUR FILES" list:**
- `src/lib/booking-blackouts.ts` — **NEW**. The one source of truth (§1).
- `src/lib/booking-public.ts` — 2a/2b/2c/2d.
- `src/lib/scheduling.ts` — `freeSlots` optional `blackoutDates` param.
- `src/lib/booking-core.ts` — `bookAppointment`/`rescheduleAppointment` blackout check + `allowBlackout`; `BookingError` gains `"blackout"`.
- `src/lib/vapi-tools.ts` — `check_availability` loads + passes blackouts.
- `scripts/set-booking-blackout.mjs` — **NEW**, not run.
- `src/lib/booking-blackouts.test.ts`, `src/lib/booking-public-blackout.test.ts`, `src/lib/scheduling-blackout.test.ts`, `src/lib/booking-core-blackout.test.ts` — **NEW**.
- `package.json` — test hand-list (see §5 for the live-collision handling).

**Beyond the literal bullet list — judgment calls, not silent guesses (reasoning below, §4/§6):**
- `src/app/api/booking/public/book/route.ts` — consumes the new `reason` discriminator (2d).
- `src/app/api/appointments/route.ts` — `bookAppointment` call gets `allowBlackout: true` (CRM UI, operator).
- `src/app/api/appointments/[id]/route.ts` — `rescheduleAppointment` call gets `allowBlackout: true` (CRM UI, operator).
- `src/lib/slack-commands.ts` — `rescheduleAppointment` call (the `/mabrey reschedule` command) gets `allowBlackout: true` (operator).
- `src/lib/booking-confirm.ts` — the operator "1/2" `bookAppointment` call gets `allowBlackout: true` (operator SMS reply relay).

None of these five are on the DO-NOT-TOUCH list (`assistant-*`, `touch-ledger.ts`, `agent-loop.ts`, `db/schema.ts`, `cadence.ts`, `speed-to-lead-call.ts`, `takeoff-*`) and none showed as locally modified in the live repo (checked via `git status --short` — see §5), so there was no collision risk. §4 explicitly says "operator callers pass `true` **only where they already exist**," which cannot be satisfied without touching the files where those calls already exist — the "YOUR FILES" bullet list names the primary mechanism files, not every consumer. Flagging this prominently rather than treating it as silent scope creep.

## 3. STOP QUESTIONS — count: 1

**STOP — `/book` refusal copy, mabrey-roofing.** `mabrey-roofing` is a SEPARATE repo (`C:/Users/josep/Claude Gravity/mabrey-roofing`) and was NOT present in my sandbox (a copy of `mabrey-crm-app` only), so per the WO I did not edit it. What it needs, precisely — see §7.

Everything else that could plausibly have been a stop (the confirmAppointment operator/customer nuance, §6; the package.json live collision, §5) had enough information in the WO body or the live repo to resolve with a documented, reasoned judgment call instead of a blind guess, so I implemented rather than skipped them. Flagging both here for visibility in case either judgment should be revisited.

## 4. `freeSlots` — every caller, and compile confirmation

Grepped the whole `src/` tree for `freeSlots\(` (not just the lib file). Real (non-test) callers:

1. **`src/lib/vapi-tools.ts:177`**, inside `runCheckAvailability` — **THE call I changed**: now `freeSlots(now, to, confirmed, now, blackoutDates)`, 5 args, with `blackoutDates` loaded via `loadBlackoutDates(db)`. Compiles (tsc clean) and is covered by the existing `check_availability` tests (still pass) plus my new `scheduling-blackout.test.ts`.
2. **`src/app/api/appointments/route.ts:212`** (the `GET` handler, CRM calendar feed) — `freeSlots(from, to, confirmed)`, unchanged, 3 args. The new 5th param is optional and appended last, so this keeps compiling and behaving byte-identically — confirmed by tsc (clean) and by the fact I did not touch this call site at all. Deliberately left blackout-unaware: the WO's own instruction ("every other caller ... must keep working with the parameter omitted") reads as "leave it alone," and it's consistent with the operator-override philosophy (staff see the real calendar).
3. **`src/lib/vapi-tools.test.ts:22` (import), `:510`** — test file, `freeSlots(now, to, [])`, 3 args, untouched. Still compiles and passes (confirmed in both full-suite runs).

No other caller exists anywhere in `src/`. All three keep working with the parameter omitted; only #1 was changed, and only additively.

## 5. Live-repo collision caught and handled — `package.json`

While staging, I diffed my sandbox's `package.json` against the CURRENT live repo and found the live file had drifted: another builder (working on assistant-* test coverage, matching the DO-NOT-TOUCH `assistant-*` glob) had **uncommitted, live-edited** `package.json`'s `test` script to add 6 entries (`assistant-confirm-binding`, `assistant-untrusted`, `assistant-composition-lint`, `agent-loop-cap`, `assistant-universal-read`, `assistant-read-honesty`) — all landing AFTER my sandbox snapshot. `git status --short` on the live repo confirmed this was the ONLY one of my 16 touched files with a live uncommitted diff; the other 15 (and recent `git log`) showed no drift.

**Handling:** `package.json`'s `test` string is a single shared hand-list every builder appends to — a naive wholesale file overwrite from my stale sandbox snapshot would have silently reverted the other builder's 6 entries. Instead I re-read the live file fresh and appended ONLY my 4 entries to the end of its CURRENT content, so the **staged** `package.json` is a non-destructive append against the live state as of this build (168 total test entries). My **sandbox's own** `package.json` (used only for my own gate-running) was reverted back to a self-consistent 162-entry version (my sandbox's original 158 + my 4) — I did not pull in the other builder's 6 new test files (and the source files they in turn import — `assistant-composition-lint.ts`, `assistant-confirm-binding.ts`, `assistant-universal-read.ts`, `assistant-untrusted.ts`, plus newer `agent-loop.ts`/`assistant.ts`/`assistant-tools.ts`/`assistant-reader-tools.ts` — all DO-NOT-TOUCH or DO-NOT-TOUCH-adjacent, actively moving) since verifying their in-flight work is out of my scope and would risk false failures unrelated to WO-B1.

**Residual risk, named honestly:** if the orchestrator doesn't apply the staged `package.json` reasonably soon, further concurrent appends from other builders could make even my re-merged version stale again. If that happens, the safe fix is the same either way: append these 4 exact entries to the end of whatever the live `test` script currently is —
```
src/lib/booking-blackouts.test.ts src/lib/booking-public-blackout.test.ts src/lib/scheduling-blackout.test.ts src/lib/booking-core-blackout.test.ts
```
— never apply my staged `package.json` as a blind whole-file replace.

## 6. `isOfferedOpenSlot` — inherited, not its own change

**Inherited entirely.** `isOfferedOpenSlot` has always worked by calling `publicSlotGrid(db, now)` fresh and checking whether the requested `iso` appears in the returned grid. Once `publicSlotGrid` became blackout-aware (2a — a blacked-out day is dropped from the grid the same way Sunday is), a blacked-out slot simply never appears in the grid `isOfferedOpenSlot` walks, so it already returns `false` for it — zero blackout-specific code needed inside `isOfferedOpenSlot` itself. I refactored it to delegate to a new `slotUnavailableReason` (for 2d's discriminator) rather than duplicate the grid-walk loop, but its own contract, signature, and behavior for the boolean gate are unchanged. Covered explicitly by `booking-public-blackout.test.ts`'s "isOfferedOpenSlot rejects a blacked-out slot (2c)" tests (both pass).

## 7. `/book` refusal copy — what it needs, and where it lives

**Two separate pieces, in two different repos:**

**(a) API shape — `mabrey-crm-app`, DONE by me.** `src/lib/booking-public.ts` now exports `slotUnavailableReason(db, iso, now) -> "unavailable" | "taken" | null` (distinguishing "off-grid entirely, including blacked-out" from "in the grid but a real appointment already holds it"). `src/app/api/booking/public/book/route.ts`'s pre-check branch now calls it and returns `{ ok: false, error: "slot_unavailable", reason }` at 409 — **additive only**: `error`/status are untouched, so this is non-breaking. The `bookAppointment` conflict branch (the true-race "taken" case) was left **byte-identical**, exactly as the WO required — no `reason` field added there, on purpose, per the strictest reading of "keep the existing 'taken' behavior byte-identical."

**(b) Display copy — `mabrey-roofing` (separate repo, NOT in my sandbox, NOT edited).** `components/booking/BookingFlow.tsx`, lines ~118-142, function `book()`. Today:
```ts
if (r.status === 409) {
  // Someone beat them to it — re-fetch live truth, say so plainly.
  await load("That time just got taken — these are still open.");
  return;
}
```
This branch never parses the response body at all — only `r.status`. It needs to:
1. Parse the JSON body (`const j = await r.json().catch(() => null);`).
2. Branch on `j?.reason`: `reason === "unavailable"` → an honest line, e.g. `"we're not available that day anymore — pick another"`; `reason === "taken"` (or absent, for back-compat with the untouched conflict branch) → keep today's `"That time just got taken — these are still open."`.

`app/api/booking/book/route.ts` in that repo is a byte-for-byte pass-through proxy to the CRM's `/api/booking/public/book` (confirmed by reading it) — it forwards status and body verbatim, so it needs **no change**; the new `reason` field already flows through it automatically once BookingFlow.tsx reads it.

## 8. Operator-override wiring — the one place I diverged from a literal reading (flagged, not silent)

§4's example list names `confirmAppointment` generically as an "operator-driven" verb that "must be able to proceed." Tracing its actual callers: `src/app/api/appointments/[id]/route.ts` (CRM UI, `source: "crm_api"` — operator, unambiguous) **and** `src/lib/booking-confirm.ts`'s `handleCustomerCounterReply` (the CUSTOMER's own SMS "yes" to an operator's counter-offer — `confirmedBy: "customer_accepted_counter"`, gated on `contacts.phone === input.from`, i.e. the customer's number, not an operator's). That second call site is genuinely customer-driven despite calling a verb named in the operator list.

Resolution: `confirmAppointment` never picks a time (only `bookAppointment`/`rescheduleAppointment` do — §4's own parenthetical, "if it picks the new time"), so it got **no** blackout check and **no** `allowBlackout` field at all — there's nothing for either caller to bypass. This sidesteps the apparent conflict cleanly: the asymmetry principle (customer hard-blocked / operator override) is preserved because the operator already exercised their override at the moment THEY proposed that specific countered time via `bookAppointment` (which I did wire with `allowBlackout: true`, gated on `isOperatorNumber` a few lines above); the customer's later "yes" is just a status flip, not a fresh availability decision. Documented directly on `confirmAppointment` in `booking-core.ts` and at both call sites so a future reader doesn't have to re-derive this.

## 9. `assistant-tools.ts` — the orchestrator's integration step (not touched, per the WO)

`src/lib/assistant-tools.ts` line ~1060 calls `bookAppointment` for the in-CRM AI assistant's `schedule_appointment` tool (`source: "crm_assistant"`) — squarely an operator-driven path, but `assistant-*` is on the DO-NOT-TOUCH list, so I did not edit it, per the WO's explicit instruction. **Named consequence, not hidden:** until `allowBlackout: true` is added there, a blackout-day request through this ONE surface will still correctly REFUSE (safe — hard-blocked by default, no data/safety issue) but the surrounding `if (!result.ok) { ... return writeFailure("lead_not_found", ...) }` fallback will misreport it as "no lead found" rather than "date is blacked out," since that code only branches explicitly on `"conflict"`. The fix is the same one-line addition made at every other operator call site: `allowBlackout: true` on that `bookAppointment` call.

## 10. House idioms copied (source cited per instance)

- **Settings row read/write** — `getSettingValue`/`upsertSettingValue` generic accessors, `src/lib/org-settings.ts:39-61`. `booking-blackouts.ts` imports and calls `getSettingValue` directly rather than hand-rolling a `db.select().from(settings)...` query (per the WO: "grep `from(settings)` for the idiom" — this file is the cleanest hit, already generic).
- **PGlite test harness** — `pushSchema`/`drizzle-orm/pglite`/`PGlite({extensions:{pg_trgm}})` setup, and the `globalThis.__mabreyDb` wiring for `getDb()`'s internal resolver (`src/lib/db/index.ts:29-33`) — copied from `src/lib/booking-public.test.ts:49-64` and `src/lib/booking-core.test.ts:49-59`. (Caught my own initial miss on the global-wiring half — see the note in §11.)
- **CLI env-file + read-back-print idiom** — `readFileSync` a `DATABASE_URL=` line, strip quotes, `neon(url)`, print `TARGET HOST`, write, then read the row back and assert rather than trusting the write's return value — copied from `scripts/apply-takeoff-ddl.mjs:8-21,59-93`.
- **`{ok:false, error}` refusal shape reuse** — `BookingConflict`/`BookingError` in `src/lib/booking-core.ts:41-62`, extended (not replaced) per the WO's explicit "do NOT invent a new return type" instruction.

## 11. Self-caught issue during build (not a gate failure, fixed before finalizing)

My first draft of all 4 new test files omitted the `globalThis.__mabreyDb = db` line every sibling PGlite test file sets in its `before()` hook. `getDb()` (`src/lib/db/index.ts`) checks that global first and falls back to a DEV-ONLY on-disk PGlite otherwise — so `booking-core-blackout.test.ts` (the only one of my 4 files that reaches `bookAppointment`/`rescheduleAppointment`, which call `logAudit` internally via `getDb()`) ran with visible `[audit] write failed ... relation "audit_log" does not exist` console spam. Non-fatal by design (`logAudit` is wrapped in try/catch, fail-open, "the audit trail must never break the business write") — no test assertion depended on it and all 40 tests passed even before the fix — but it deviated from house convention and buried real signal in noise. Added the global-set (+ matching `after()` cleanup) to all 4 files; re-ran both gates clean with zero warnings.

## 12. What I did NOT touch, and why (informational, not a stop)

`src/lib/booking-confirm.ts`'s `handleOperatorCounter` (the "operator texts back a different day/time" counter-offer path) does a **raw `db.insert(appointments)`** directly — it does not call `bookAppointment` at all, and predates this WO. That means a blackout-day counter-offer typed by an operator is not blocked by anything (though an operator typing a specific date is squarely the override case anyway, so this is low-severity) and also isn't logged through the blackout-aware path. Out of scope for WO-B1 (not named anywhere in the WO, and rerouting it through `booking-core.ts` would be a materially bigger change than "add a blackout check") — flagging as an observation only, not something I fixed or was asked to.
