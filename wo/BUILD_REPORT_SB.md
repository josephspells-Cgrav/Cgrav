# BUILD REPORT — SB — the TEXT agent must never propose a blacked-out day

Sandbox: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/sandbox/mabrey-crm-app`
(copied from `C:/Users/josep/Claude Gravity/mabrey-crm-app`, branch `showroom-integration` @ HEAD `c127add`,
minus `node_modules`/`.next`/`.git`; `pnpm install` run in the sandbox). Real repo never touched — read-only source.

Staged deliverable: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/SB_STAGED_DELIVERABLE/` (repo-relative paths).

🔴 `src/lib/assistant-tools.ts`, `src/lib/assistant-debrief.ts`, `src/lib/assistant-appointment-tools.ts` —
**not touched.** Grep-verified zero occurrences of my new symbols in those three files before staging.
That is BL's surface (`BUILD_REPORT_BL.md` — the Slack-assistant/voice/appointment-write side, complementary
and file-disjoint from this WO).

## Gates (all foreground, inline, this exact sandbox)

1. `npx tsc --noEmit` — **0 errors** (one real hit during the first pass, in my OWN new test file — fixed,
   see §3). Second run: empty output, exit code `0`.
2. `npm test` (full unioned suite, my new file appended to package.json's hand-list) — **3887 tests, 3887
   pass, 0 fail.**
3. `npm run build` — **compiled successfully**, all ~180 routes generated (`/messages`, the four
   `/api/webhooks/*`, `/api/text-alex/drafts/[id]` all present and compiled). Only pre-existing warnings
   (jose/next-auth Edge Runtime — CompressionStream/DecompressionStream, unrelated to this change, present
   on `master`/HEAD independent of my edits).

### `npm test` final tally (verbatim)
```
ℹ tests 3887
ℹ suites 1082
ℹ pass 3887
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 356450.5034
```

### Own-file isolated run (verbatim, `npx tsx --test src/lib/text-alex-blackout.test.ts`)
```
▶ findTextAlexBlackoutHit — supported-format table (each paired with a free-day counterpart)
  ✔ "Weekday, Month Day(th)" — "Tuesday, August 11th" (blacked out) escalates
  ✔ "Weekday, Month Day(th)" — "Thursday, August 20th" (free) does not escalate
  ✔ "Month Day" (no weekday) — "August 11" escalates
  ✔ "Month Day" (no weekday) — "August 20" (free) does not escalate
  ✔ "Aug Day" (abbreviated) — "Aug 11" escalates
  ✔ "Aug Day" (abbreviated) — "Aug 20" (free) does not escalate
  ✔ "M/D" numeric — "8/11" escalates
  ✔ "M/D" numeric — "8/20" (free) does not escalate
  ✔ "Weekday the Nth" — "Monday the 10th" escalates (Aug 10 2026 IS a Monday)
  ✔ "Weekday the Nth" — "Thursday the 20th" (free; Aug 20 2026 IS a Thursday) does not escalate
  ✔ bare weekday — "Tuesday" resolves to the NEXT Tuesday (Aug 11, blacked out) and escalates
  ✔ bare weekday — "Saturday" (free; next Saturday is Aug 8) does not escalate
  ✔ no date reference at all — never escalates
  ✔ a date candidate outside the 60-day window is out of scope, not a hit (not ambiguous)
✔ findTextAlexBlackoutHit — supported-format table (14 tests)
▶ fail-safe ambiguity -> escalate (never guess) (3 tests, all pass)
▶ expired range gates nothing (2 tests, all pass)
▶ the exact live-incident body + the exact live-shaped range (fixed clock — never Date.now()) (2 tests, all pass)
▶ buildTextAlexBlackoutLine — the grounding courtesy line (5 tests, all pass)
▶ membership sweep — the blackout check gates the ONE auto-send path (5 tests, all pass)
▶ maybeDraftTextAlexReply x booking_blackouts — the end-to-end fix (4 tests, all pass)
ℹ tests 35
ℹ pass 35
ℹ fail 0
```

### `npm run build` tail (verbatim, route table trimmed — all ~180 routes compiled; `/messages`,
`/api/webhooks/telnyx`, `/api/text-alex/drafts/[id]` all present)
```
 ✓ Compiled successfully in 2.6min
   Checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (9/9)
   Finalizing page optimization ...
   Collecting build traces ...
...
├ ƒ /messages                                               10.3 kB         172 kB
├ ƒ /api/webhooks/telnyx                                      423 B         103 kB
├ ƒ /api/text-alex/drafts/[id]                                423 B         103 kB
...
ƒ Middleware                                                 132 kB
○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## §1 — The parser's supported-format table

`findTextAlexBlackoutHit(body, ranges, now)` (pure; `src/lib/text-alex-drafts.ts`) scans the composed reply
via `extractDateCandidates`, most-specific pattern first, each match's span blanked before the next pattern
runs (so e.g. the "Tuesday" inside "Tuesday, August 11th" can never also fire the bare-weekday pattern).
Window: today..+60 days ET (`BLACKOUT_LINT_WINDOW_DAYS`, `text-alex-drafts.ts:153`).

| # | Format | Example | Resolution rule | Ambiguous case |
|---|---|---|---|---|
| 1 | `Weekday, Month Day(th)` | "Tuesday, August 11th" | month+day → nearest of this-year/next-year landing in-window | never (month+day is always deterministic once in-window) |
| 2 | `Month Day` | "August 11" | same as #1 | same |
| 3 | `Aug Day` (abbrev., optional `.`) | "Aug 11" | same as #1 | same |
| 4 | `M/D` numeric | "8/11" | same as #1, month from digits 1-12 | same |
| 5 | `Weekday the Nth` | "Monday the 10th" | day-walk today..+60d for (dow, day-of-month) match | **>1 match in window (rare 28-day-Feb coincidence) → HIT** |
| 6 | bare `Weekday` | "Tuesday" | day-walk to the NEXT such weekday, strictly after today | **said ON that same weekday (today) → HIT** (today-or-next-week is genuinely ambiguous) |

Every non-ambiguous candidate is checked with `blackoutReason(etDate, ranges)` (booking-blackouts.ts) — the
FIRST real hit anywhere in the body short-circuits with `hit:true`. A candidate whose month/day doesn't land
within today..+60d in either year is silently out of scope (not a hit — it's not a near-term booking
proposal). Known accepted false-positive surface (over-escalation is explicitly cheap per the WO): a past-
tense mention ("we were closed last Monday") still resolves to the future occurrence and could theoretically
false-hit if that future date happens to be blacked out; a numeric `M/D` could theoretically collide with an
unrelated fraction. Neither occurred in the live transcript or is realistic given Alex's system prompt
(short, scheduling-focused replies; specs/pricing are escalated before the model ever runs).

## §2 — The escalation shape matched (file:line)

`composeTextAlexDraft`'s existing escalation mechanism — `meta.needsHuman: boolean` + `meta.escalation:
string | null` on `AlexDraftMeta` (`src/lib/text-alex-shared.ts:30-43`) — reused verbatim, no new mechanism:
- `src/lib/text-alex-drafts.ts:516-524` — `meta.needsHuman = composed.needsHuman || blackout.hit`;
  `meta.escalation` is `blackout.escalation` (or `composed.escalation + "+" + blackout.escalation` when both
  fired, so neither signal is silently dropped).
- The blackout escalation string itself names both the date and the reason, e.g.
  `blackout_date: "Tuesday, August 11th" resolves to 2026-08-11, which is blacked out (Sean unavailable)`
  (`src/lib/text-alex-drafts.ts:428-433`), or for the ambiguous case,
  `blackout_date: "Friday" is an ambiguous date reference — could not safely resolve which day it means,
  escalating rather than risk the wrong one` (`text-alex-drafts.ts:419-424`).
- Reused, never re-implemented: `loadBlackoutRanges` + `blackoutReason` (`booking-blackouts.ts`) — the SAME
  reader `isBlockedByBlackout` (`booking-core.ts:76-84`) uses for the write-boundary check.

## §3 — Where THE WALL actually sits (and the bug it would have been if I hadn't checked)

`checkTextAlexBlackout(db, composed.reply)` runs **once**, right after `composeTextAlexDraft` succeeds and
before `meta` is built (`text-alex-drafts.ts:514`) — so `needsHuman`/`escalation` are correct for BOTH modes:

- **Autonomous mode** (`TEXT_ALEX_AUTONOMOUS=1`, the live-defect mode): a new gate,
  `if (blackout.hit) { …disposition:"held_blackout"… return; }`, sits as the FIRST check inside
  `if (isTextAlexAutonomous())`, ahead of the pause/human-driving gates, ahead of the ONE
  `approveAlexDraft(...)` call site text-alex-sendpath.test.ts already pins as the module's only send path
  (`text-alex-drafts.ts:557-578`).
- **HITL mode** (the shipped default): I found — and fixed — a real bug while wiring this in. The existing
  HITL-path `notifySlackOfAutoReply` call and the function's final `return` both read `composed.needsHuman`/
  `composed.escalation` **directly**, bypassing the `meta` I'd just built. Left alone, a blackout hit would
  have updated the stored draft row correctly but the Slack ping and the caller's own return value would
  have silently reported `needsHuman:false` — a human reviewing the thread flag would never have seen it.
  Fixed at `text-alex-drafts.ts:695-710` to read `meta.needsHuman`/`meta.escalation`. Covered by a dedicated
  membership-sweep test (`text-alex-blackout.test.ts`, "the HITL Slack ping also reads meta.needsHuman").

Fail-safe direction is stated as a comment at the check itself (`text-alex-drafts.ts:144-148`) and enforced
structurally: an ambiguous candidate returns `hit:true` before any `blackoutReason` lookup even runs.

## §4 — The courtesy line (item 2)

`buildTextAlexBlackoutLine(ranges, todayEt, horizonEt)` — pure, **zero new imports**
(`src/lib/text-alex-shared.ts`, after the existing `alexDraftNeedsHuman`) — mirrors the register and the
today..+21d horizon of `assistant-grounding.ts`'s WO-R2C line (`assistant-grounding.ts:218-237`,
horizon constant at `:48`). Cannot import that file's private `fmtBlackoutRangeShort` (not exported) so it's
mirrored locally with a citation. text-alex-shared.ts is a documented zero-server-import leaf
(its own header + `assistant-history-tools.ts:21`'s "single zero-import leaf" claim), so the ET-date
arithmetic deliberately lives in the caller instead: `text-alex-context.ts`'s `assembleTextAlexContext` now
also calls `loadBlackoutRanges(db)` and threads it through the (still-pure) `buildContextBlock`, which
computes `todayEt`/`horizonEt` via `booking-blackouts.ts`'s `etDateOf` and appends the line
(`text-alex-context.ts:136-207`). `blackoutRanges`/`now` are new OPTIONAL trailing params defaulting to
`[]`/`new Date()` — every pre-existing call site and its pinned tests (`text-alex.test.ts`'s
`buildContextBlock` describe block) behaves byte-identically. Explicitly documented as defense-in-depth, not
the gate — §3 is what actually holds.

## §5 — Tests (the list)

- Every format in §1's table, paired blacked-out-vs-free-day (14 tests) — `text-alex-blackout.test.ts`.
- Both fail-safe ambiguous cases, including a real (non-leap-year Feb) calendar coincidence for the
  "Weekday the Nth twice in-window" case, verified by direct computation before writing the fixture.
- Expired range gates nothing (pure) + no-settings-row-at-all inert default (pure).
- The WO's EXACT live body vs the WO's EXACT live-shaped range JSON, fixed clock (`new
  Date("2026-08-07T16:00:00.000Z")`, never `Date.now()`) — plus the other two live transcript sentences.
- The courtesy line: empty/out-of-horizon/in-horizon/multi-range/no-reason (5 tests).
- Membership sweep (BL's pattern, `text-alex-sendpath.test.ts`'s style): single call site, source order
  (check → autonomous branch → gate → the one auto-send call), the gate's own block never reaches
  `approveAlexDraft(`, and the HITL-path meta-not-composed fix (5 tests).
- DB-integration (PGlite): autonomous-mode hit never auto-sends; HITL-mode hit still parks + flags;
  happy-path UNCHANGED (autonomous still auto-sends a free day, byte-identical `autoSent:true`); no
  settings row at all is fully inert (4 tests). Dates are computed relative to the real run-time clock
  (`nearFutureEtDate`, via `etDateOf`) rather than hardcoded, so these four stay correct regardless of
  when this suite runs in the future (my lint's today..+60d window makes hardcoded absolute dates
  time-fragile in a way `booking-core-blackout.test.ts`'s unbounded check isn't — noted so a future
  reader doesn't "fix" this back to a hardcoded date).
- PGlite teardown: `touchAttempts` deleted before `outbox` (`text-alex-blackout.test.ts` `afterEach`).
- New tests appended (not reordered/inserted) to `package.json`'s `test` hand-list, one new file:
  `src/lib/text-alex-blackout.test.ts`.

One bug caught by my own membership-sweep test before it ever reached the report: the substring
`checkTextAlexBlackout(` also matches the function's own `async function checkTextAlexBlackout(`
declaration, so a naive count assertion read 2 instead of 1 — fixed by anchoring on `"await
checkTextAlexBlackout("` for the call-site count.

## STOPs / explicitly out of scope (per the WO's own §4 — not built)

- Sending a correction to the affected homeowner — customer-reaching, Joseph's call.
- Any change to the `proposal_chase` ladder.
- Any edit to `assistant-tools.ts` / `assistant-debrief.ts` / `assistant-appointment-tools.ts` — BL's
  surface; confirmed untouched.
- The voice agent — already gated via `vapi-tools.ts` (unrelated to this WO's surface).
- Not built (WO silent, so stopped and recorded): a hard block on a HUMAN's manual Approve of an
  already-flagged blackout draft (`approveAlexDraft` itself isn't gated — only the AUTONOMOUS auto-send
  is, per the WO's literal "the draft does NOT auto-send"). A human clicking Approve on a
  `needsHuman:true`/`escalation:"blackout_date:…"` draft can still send it — that's the same "HITL
  reviews, HITL can override" contract every other escalation class already has (price/insurance/legal/
  complaint/cancellation never hard-block a human's Approve either). Flagging this explicitly in case the
  intent was a harder floor — one more `if` in `approveAlexDraft` re-running the same
  `findTextAlexBlackoutHit` against the (possibly human-edited) body would close it, but the WO didn't ask
  for it and I didn't want to invent a new mechanism beyond what was specified.

## REGISTRATION

Not applicable — this WO touches no `assistant.ts` tool surface (customer-facing text agent only, not the
in-CRM assistant). Nothing to register in `allTools()`.

## Files touched

Staged at `SB_STAGED_DELIVERABLE/` (repo-relative):

- `src/lib/text-alex-drafts.ts` — edited. New "blackout wall" section (date-parsing/resolution/check, pure
  except the `loadBlackoutRanges` shell), wired into `maybeDraftTextAlexReply` (blackout computed once,
  autonomous gate added, HITL-path meta-read bug fixed), `notifySlackOfAutoReply`'s disposition union +
  map extended with `held_blackout`.
- `src/lib/text-alex-shared.ts` — edited. New courtesy-line section: `TEXT_ALEX_BLACKOUT_HORIZON_DAYS`,
  `TextAlexBlackoutRange`, `buildTextAlexBlackoutLine`. Zero new imports (still a true zero-import leaf).
- `src/lib/text-alex-context.ts` — edited. `buildContextBlock` gains two optional trailing params
  (`blackoutRanges`, `now`) and appends the courtesy line; `assembleTextAlexContext` loads ranges and
  threads them through. Existing call sites/tests unaffected (defaults preserve old behavior exactly).
- `src/lib/text-alex-blackout.test.ts` — **new**, 35 tests (§5).
- `package.json` — appended `src/lib/text-alex-blackout.test.ts` to the end of the `test` script's file
  list only. Nothing reordered or removed.

## House idioms copied (source cited)

- `etDateOf` / `loadBlackoutRanges` / `loadBlackoutDates` / `isBlackedOut` / `blackoutReason` —
  `booking-blackouts.ts` (all reused; `isBlackedOut`/`loadBlackoutDates` were available but I used
  `loadBlackoutRanges` + `blackoutReason` directly instead — same semantics, one DB read instead of two,
  and `blackoutReason` gives the reason string for free).
- The write-boundary check shape (`loadBlackoutRanges` → per-date membership test) —
  `isBlockedByBlackout`, `booking-core.ts:76-84`.
- The courtesy line's register + today..+21d horizon + "absent → omit entirely, never noise every turn"
  law — `assistant-grounding.ts:218-237` (WO-R2C), its horizon constant at `:48`.
- The deliberate ET-date-arithmetic duplication-for-import-safety pattern (rather than importing a
  server-chain module into a client-safe leaf) — `scheduling.ts:74-86`'s own documented precedent for the
  exact same booking-blackouts.ts import-chain problem.
- The comment-stripped-source membership-sweep pattern (`src()`/`count()`, `.indexOf` source-order proofs)
  — `text-alex-sendpath.test.ts:27-35` (BL's cited precedent too).
- The dynamic-relative-date test-fixture pattern (never hardcode an absolute date behind a time-windowed
  check) — reasoned from first principles against `booking-core-blackout.test.ts`'s hardcoded dates, which
  are safe there only because `isBlockedByBlackout` has no time window; my lint's today..+60d window means
  it does not get that same freedom.
- PGlite/drizzle-kit harness + `armEnv`/`stubAnthropic` shape — `text-alex-auto.test.ts`.
- `db.insert(settings).values({ key: "booking_blackouts", value: { ranges: [...] } })` seeding idiom —
  `booking-core-blackout.test.ts:70-75`'s `setBlackout` helper.

## Receipts ledger

- Live incident dates verified against the real calendar before writing fixtures (not assumed): 2026-08-07
  = Friday, 2026-08-10 = Monday, 2026-08-11 = Tuesday, 2026-08-12 = Wednesday, 2026-08-14 = Friday — all
  match the WO's transcript exactly.
- The "Weekday the Nth twice in one window" ambiguous fixture (Feb 10 / Mar 10 2026, both Tuesdays) was
  verified by direct computation (2026 is not a leap year → Feb has exactly 28 days = 4 weeks, so day-10
  keeps the same weekday month to month) before being written into the test, not asserted from memory.
- `git branch --show-current` / `git rev-parse --short HEAD` in the source repo before copying: confirmed
  `showroom-integration` @ `c127add`, clean working tree — matches the WO's pin exactly.
- Grep-confirmed zero occurrences of any new symbol I added (`checkTextAlexBlackout`, `blackout.hit`,
  `held_blackout`, `TextAlexBlackoutRange`, etc.) in `assistant-tools.ts` / `assistant-debrief.ts` /
  `assistant-appointment-tools.ts` before staging.

You never deploy this; the orchestrator integrates, re-runs every gate, deploys.
