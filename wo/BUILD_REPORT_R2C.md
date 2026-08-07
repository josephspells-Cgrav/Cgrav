# BUILD REPORT — R2C — `set_booking_blackout` + grounding

Builder: Sonnet-5, judgment-zero. Staging id: **R2C**.
Sandbox: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/R2C_sandbox/mabrey-crm-app` (repo copy minus node_modules/.next/.git/.pglite/.vercel, `pnpm install`, all gates run there).
Staged deliverable: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/R2C_STAGED_DELIVERABLE/`.

## Gates

| Gate | Command | Result |
|---|---|---|
| Types | `npx tsc --noEmit` | ✅ PASS (exit 0, zero output) |
| Unit tests (own file, isolated) | `npx tsx --test src/lib/assistant-blackout-tools.test.ts` | ✅ 16/16 pass |
| Unit tests (full suite) | `npm test` | ✅ PASS — 3670/3670, 0 fail, 0 cancelled |
| Build | `npm run build` | ✅ PASS — see tail below |

### `npm test` final tally (verbatim)

```
ℹ tests 3670
ℹ suites 1018
ℹ pass 3670
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1075213.8542
```

Ran with `src/lib/assistant-blackout-tools.test.ts` appended to the hand-list (see Files touched). Every
pre-existing blackout-dependent suite stayed green with my `expandRange` export in place:
`booking-blackouts.test.ts`, `booking-public-blackout.test.ts`, `scheduling-blackout.test.ts`,
`booking-core-blackout.test.ts` — all pass, byte-identical behavior. `assistant-honesty-fixes.test.ts`'s
`buildGroundingBlock — 4f every query includes an org predicate` (4 tests) also stayed green, confirming
the grounding edit didn't disturb the pre-existing org-scoped queries it sits next to.

### `npm run build` tail (verbatim, route table trimmed to the summary)

```
 ✓ Compiled successfully in 5.4min
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
[... full route table, ~160 routes, all compile — /api/assistant present and unchanged size (423 B) ...]
+ First Load JS shared by all                                103 kB
ƒ Middleware                                                 132 kB
```

Exit code 0. The only warnings emitted (pre-existing, unrelated to this build — `next-auth`/`jose`'s
`DecompressionStream` Edge Runtime notice) are dependency-level, not from any file I touched.

### Own-file isolated run (verbatim)

```
▶ set_booking_blackout — add
  ✔ add creates the range and read-back matches (via list)
  ✔ end defaults to start for a one-day block
  ✔ a reversed range is refused, never written
  ✔ a range over 60 days is refused with a named reason
  ✔ preview writes nothing; only confirm:true writes the row
  ✔ an add covering a date with a live appointment lists it by day/time/first-name and discloses it will NOT be cancelled
  ✔ malformed existing settings never throws — add self-heals it into a well-formed row
✔ set_booking_blackout — add
▶ set_booking_blackout — remove
  ✔ remove takes out the range matching its exact start date
  ✔ remove of a non-existent start refuses and lists what currently exists
✔ set_booking_blackout — remove
▶ set_booking_blackout — list
  ✔ no ranges on file reads as fully open, not an error
  ✔ list shows the expanded ET date list and a live-appointment count for each range
✔ set_booking_blackout — list
▶ grounding — booking blackout line
  ✔ omitted entirely when no blackout ranges exist
  ✔ appears when a range falls within the next 21 days, with reason + do-not-propose line
  ✔ omitted when every range is further out than 21 days
  ✔ a range already in progress (started before today, ends after) still surfaces
✔ grounding — booking blackout line
▶ grounding — org-scope regression + the blackout line's deliberate non-scoping
  ✔ a demo-scoped lead never leaks into a prod-scope grounding call, even with a blackout line present, and the blackout line itself is identical in both scopes
✔ grounding — org-scope regression + the blackout line's deliberate non-scoping
ℹ tests 16
ℹ suites 5
ℹ pass 16
ℹ fail 0
```

## Files touched

Created:

- `src/lib/assistant-blackout-tools.ts` — the tool (`setBookingBlackoutTool`, export name;
  `ASSISTANT_BLACKOUT_TOOLS` array for convenience, unused by the orchestrator's individual-registration
  path but kept for shape-consistency with every other tool file).
- `src/lib/assistant-blackout-tools.test.ts` — 16 tests, PGlite harness, `touchAttempts` deleted before
  `outbox` in teardown per the standing rule (even though this file never populates either table itself —
  the rule reads as a blanket MUST for any new harness file, and it's a free no-op delete otherwise).

Edited (both purely additive, diffed against the original — see below):

- `src/lib/booking-blackouts.ts` — ONE change: `function expandRange` → `export function expandRange`
  (plus a 5-line doc-comment explaining why). No other line touched. Reasoning: the WO says "reuse
  loadBlackoutDates / the range type... do not duplicate the parsing" — `list`'s expanded-date output and
  the 60-day fat-finger guard both need the exact same walk (guard-against-pathological-input included),
  and re-deriving it a second time is the literal thing "do not duplicate" is warning against. This file
  isn't named as another builder's file this round and the change is a single keyword — flagging it here
  in case the orchestrator wants eyes on it given last round's file-collision history.
- `src/lib/assistant-grounding.ts` — added one import, one 21-day-horizon constant, one short display
  formatter (`fmtBlackoutRangeShort`), and one ~15-line block inside `buildGroundingBlock` (after the
  appointments block, before thread-subject resolution). Nothing else in the file was touched — diffed
  against the original to confirm.

`package.json` — appended `src/lib/assistant-blackout-tools.test.ts` to the end of the `test` script's
file list. Nothing reordered or removed (verified: valid JSON, new entry present, script length grew by
exactly the new filename).

`src/lib/assistant.ts`, `src/lib/assistant.test.ts`, `src/lib/assistant-flag.test.ts` — **not touched**,
per the round's registration rule. See `## REGISTRATION` below for exactly what the orchestrator needs to
add to each, plus two more files found (read-only) that also need a line each.

`src/lib/assistant-history-tools.ts` — **not touched** (§3 of the WO). Read in full: it assembles a
person's existing calls/texts/activities/appointments/cadence-runs — every appointment it returns is one
already on the books, rendered with its own real status. It never computes or offers an OPEN slot, so it
has nothing to filter against a blackout. Confirmed by grep: across every `src/lib/assistant-*.ts` file,
only `assistant-appointment-tools.ts` (`nearbyOpenSlots()` → `publicSlotGrid()`) and my own new file
reference availability/slot machinery at all — and `publicSlotGrid` is booking-blackouts.ts's own
surface #1, already blackout-aware by design, and outside this round's file-ownership boundary regardless.
Per the WO's own instruction ("if it does not touch availability, say so... and skip") — no change made.

## What `set_booking_blackout` does

One tool, three actions, matching the WO's literal shape:
`{ action: "add"|"remove"|"list", start?, end?, reason?, confirm? }`.

- **`add`** — blocks an inclusive ET-date range (`end` defaults to `start`). Refuses a reversed range or
  anything over 60 days outright, before any confirm round-trip, naming the day count in the refusal.
  🔴 Before the preview is ever shown, it queries live appointments (status `proposed`/`confirmed`) whose
  ET calendar date falls in the range. If any exist, BOTH the preview and the final confirmed summary say,
  verbatim: *"Blacking these dates out does NOT cancel these appointments — cancel or move them
  yourself."* — plus a day/time/first-name listing (capped at 20, "+N more" beyond that). Confirm re-checks
  this live, never trusting the preview's snapshot (mirrors `assistant-appointment-tools.ts`'s
  `noShowDisclosure()` re-check pattern). Malformed existing settings self-heal on the next `add` (the
  same "treat as empty" tolerance `scripts/set-booking-blackout.mjs` documents).
- **`remove`** — matches and drops the range whose `start` is an EXACT match (same rule as the CLI
  script's `--remove`). A non-existent start refuses and lists what's currently on file. Re-reads fresh at
  confirm; if someone else already removed it in the gap, says so honestly rather than claiming a second
  removal.
- **`list`** — every range + its expanded ET date list (via the now-exported `expandRange`) + a live
  appointment count per range. No confirm needed (matches `check_stop_status`'s read-only-in-effect
  precedent — the WHOLE tool still ships gated behind the write flag, per that file's own comment).

Live, not dormant — no per-verb settings flag, unlike `place_call`/`custom_cadence`. Never contacts a
customer; only ever writes the one `booking_blackouts` settings row `loadBlackoutDates`/`loadBlackoutRanges`
already read on all three booking surfaces.

## Grounding line

`assistant-grounding.ts`'s `buildGroundingBlock` now appends one line — `Booking blackouts: Aug 10-12
(Sean unavailable) — do not propose these dates.` — whenever a blackout range's `[start, end]` overlaps
`[today, today+21 days]` in ET. Absent/empty settings, or every range further than 21 days out, omits the
line entirely (never "no blackouts"). Multiple in-window ranges join with commas on the one line. A range
already in progress (started before today, still running) still surfaces — tested explicitly.

**A judgment call worth flagging** (WO said "Grounding queries are org-scoped as of WO-A1 — match that
pattern exactly"): the blackout settings row is NOT org-scoped anywhere in this codebase —
`org-settings.ts`'s `getSettingValue`/`upsertSettingValue` filter by `key` (the PK) only, no `orgId`
predicate exists on any settings-table read I could find (grepped `settings.orgId` across `src/` —
zero hits outside the schema definition itself), and `booking-blackouts.ts`'s own header calls it "ONE
source of truth," singular, no scope split. Retrofitting org-scoping onto a real-world fact ("Sean is on
vacation these dates") would mean a demo-mode conversation and a prod conversation could disagree about
whether the same calendar days are blocked — that reads like a bug, not a feature. I read "match that
pattern exactly" as: keep the file's EXISTING leads/calls/appointments/thread-subject queries org-scoped
exactly as they already are (I touched none of that code) — not as an instruction to invent scoping for a
table that has never had it. I wrote a test (`grounding — org-scope regression + the blackout line's
deliberate non-scoping`) that proves BOTH halves at once: a demo-scoped lead still never leaks into a
prod-scope grounding call (the pre-existing invariant, unbroken), and the blackout line itself renders
identically in both scopes (the deliberate converse). Flagging this explicitly rather than silently
picking a side — if the intended reading was "give blackouts an org column too," that's a real schema
change outside a 2-file WO and I'd want it named as its own ticket rather than improvised here.

## STOP questions

**Zero** in the sense of "skipped work." One judgment call flagged above (grounding org-scope reading) —
implemented with a reasoned default and a test proving the behavior either reading would want checked, not
skipped.

## REGISTRATION

Import line for `src/lib/assistant.ts`:

```ts
import { setBookingBlackoutTool } from "@/lib/assistant-blackout-tools";
```

Branch: **writes-live only** (the `ASSISTANT_WRITES_LIVE === "1"` branch of `allTools()`), registered as
an individual identifier in the array literal (this file's own import-cycle precedent — every other
recently-added tool is registered this way, never spread from a module-level array). Not read-only (`add`/
`remove` write the settings row). No per-verb dormancy flag needed (WO: "Live, not dormant"). Suggested
slot — right after `sendBookingLinkTool` (the last entry in the current array):

```ts
        sendBookingLinkTool,
        setBookingBlackoutTool,
```

Three more files were found read-only (not edited, per the round's rule) that each need one line once this
is wired in:

- **`src/lib/assistant-flag.test.ts`** — `WRITE_TOOL_NAMES` is an ORDERED array `deepEqual`'d against
  `allTools()`'s actual output when the flag is `"1"`. Add `"set_booking_blackout"` at the same position
  suggested above (right after `"send_booking_link",`), or the flag-closure test fails on an order
  mismatch:
  ```ts
        "send_booking_link",
        "set_booking_blackout", // WO-R2C
  ```
- **`src/lib/assistant.test.ts`** — the "confirm coverage registry" test (`describe("Alex v2 — confirm
  coverage registry...")`) derives write-tool names LIVE from `allTools()` and fails with `"set_booking_blackout"
  is UNCLASSIFIED` until it's filed into `CONFIRM_REQUIRED` or `NO_CONFIRM_OK`. It belongs in
  **`CONFIRM_REQUIRED`** — `add`/`remove` mutate real availability data and the whole reason a human
  confirms `add` is the live-appointment disclosure; `list` alone would justify `NO_CONFIRM_OK` (like
  `check_stop_status`) but the tool isn't list-only. Suggested entry:
  ```ts
      "set_booking_blackout", // WO-R2C — mutates real availability; add's confirm carries the live-appointment disclosure
  ```
- **`src/lib/assistant-authz.test.ts`** — read in full, not edited. Its `readOnly` tests spot-check a
  PARTIAL hand-list of write-verb names (not an exhaustive `deepEqual`), and `set_booking_blackout` isn't
  in that sample — the test's own invariant ("readOnly strips every write verb") still holds true for it
  either way since it's only ever registered in the writes-live branch, same as everything else in that
  branch. No edit needed, but flagging that I didn't exhaustively trace every assertion in the file.

`assistant-reachability.test.ts` needs no change — `set_booking_blackout`'s only required field is
`action` (not `*_id`/`*_ids`-shaped), so the mechanical `needsSupplier()` pattern never flags it.

`assistant-blackout-tools.ts`'s own import graph (booking-blackouts, db/schema, demo-scope, format,
org-settings, audit, assistant-floor, drizzle-orm) is a plain static-import graph with no cycle back to
`assistant.ts` or the comms/cadence files that force the lazy-dynamic-import pattern — a plain top-level
`import` (like `rescheduleCadenceStepTool`/`setAppointmentStatusTool`, not the `start_cadence`/`send_text`
lazy pattern) should be safe. Worth a `tsc`/`build` re-check once wired, same as any registration.

## House idioms copied (source cited)

- Two-phase confirm + integrity-floor-first ordering — every `assistant-*-tools.ts` file, most directly
  `assistant-cadence-control.ts`'s `rescheduleCadenceStepTool`.
- Re-check the live disclosure fact at BOTH preview and confirm, never a frozen snapshot — copied from
  `assistant-appointment-tools.ts`'s `noShowDisclosure()`.
- Re-read fresh at confirm, report the TRUE state on a mid-flight change rather than claiming a stale
  action succeeded — copied from `assistant-outbox-control.ts`'s `cancel_scheduled_send` (0-row race →
  `describeTerminal`) and `assistant-cadence-control.ts`'s re-read-then-conditional-update.
- `getScope()`/`whereOrg()` on the appointments query — the exact idiom every write tool in this codebase
  uses; matched here even though the settings-row read it sits beside is deliberately unscoped.
- Malformed-settings tolerance on read AND self-healing on write — copied from
  `scripts/set-booking-blackout.mjs`'s own "treating as empty, matching the app's own tolerance" comment,
  and `booking-blackouts.ts`'s `parseBlackoutRanges`.
- `asScope()` / `next/headers` `cookies()` monkey-patch test idiom — copied verbatim from
  `assistant-honesty-fixes.test.ts` (re-declared per-file, since each `tsx --test` file argument is its
  own process).
