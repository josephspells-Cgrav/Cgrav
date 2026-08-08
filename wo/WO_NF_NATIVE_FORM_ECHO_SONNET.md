# WO-NF — /quote reads as a NATIVE Meta form + echoes the ad verbatim (site only)

**Read FIRST:** `wo/WO_R2_COMMON.md` (rules apply) with these OVERRIDES:
- Staging root: `C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/8e136755-160e-4e7b-8d30-03d7035e9097/scratchpad/NF_STAGED_DELIVERABLE/site/` (repo-relative paths, mabrey-roofing ONLY — no CRM work in this WO).
- SITE repo: `C:/Users/josep/Claude Gravity/mabrey-roofing` branch `master` @ HEAD `a80ee49`. Check the lockfile for the installer.
- 🔴 **GATES IN THE FOREGROUND, inline, never backgrounded.**
- Build report: `wo/BUILD_REPORT_NF.md`.

## WHY (context, do not re-litigate)
The live ad promises: **"Roof Replacement — $0 Down, $129/Mo" · "Free inspection first" ·
"Tap below to schedule yours. Takes about a minute."** The page opens with "Get a Fast, Free
Quote for Your Roofing Project" + "Question 1 of 7" — zero echo, and the counter advertises the
form as 40% longer than its 5 real questions. Joseph locked the replacement copy and the
native-form direction at 9:46pm 2026-08-07. The design decisions below are FINAL — implement
exactly; STOP-and-report anything that resists, never improvise visuals.

## FILE 1 — `components/funnel/QuoteFunnel.tsx`
All copy strings below are EXACT — character-for-character, including the `·` separators.

### A. Remove the canvas-level header (lines ~230-237)
Delete the `<p>Mabrey Roofing</p>` (13px) and the `<h1>Get a Fast, Free Quote…</h1>` that sit
between the takeover root and the sheet. NOTHING renders above the sheet afterward. Give the
sheet the top spacing the removed block used to provide (e.g. `mt-6` on the sheet container —
match the existing vertical rhythm, state the value you chose in the report).

### B. Persistent identity row — INSIDE the sheet, ALL steps (including DONE)
Sheet flex order becomes: [progress bar] → [identity row] → [scrollable content] → [footer bar].
The identity row lives OUTSIDE the scrollable div (it must not scroll away):
```tsx
<div className="flex items-center gap-2.5 border-b px-5 py-2.5"
     style={{ borderColor: FB.line }}>
  <img src="/icon-192.png" alt="" aria-hidden width={28} height={28}
       className="rounded-full" />
  <span className="text-[15px] font-semibold" style={{ color: FB.text }}>Mabrey Roofing</span>
</div>
```
- Verify `/public/icon-192.png` is the blue rounded-square M mark by LOOKING at it (Read the
  file — it renders as an image). If it is not the mark, try `apple-icon.png`, then
  `logo.png`; report which you used. Plain `<img>` matches this component's house idiom
  (verify: the file currently uses no `next/image`; if it does, match that instead).
- The DONE (success) step keeps the row — continuity through the win moment.

### C. Step-1 headline block — INSIDE the scrollable content, only when `step === 1`
Rendered ABOVE the QuestionScreen for step 1 (h1 replaces the deleted canvas h1 — the page
must still have exactly ONE h1 in its initial SSR render):
```tsx
<h1 className="mt-1 text-center text-[20px] font-bold leading-tight"
    style={{ color: FB.text }}>
  Schedule Your Free Inspection
</h1>
<p className="mt-1 text-center text-[15px] font-semibold" style={{ color: FB.text }}>
  $0 down · $129/mo · Full roof replacement
</p>
<p className="mt-0.5 mb-1 text-center text-[13px]" style={{ color: FB.subtle }}>
  5 quick questions
</p>
```
Steps 2+ render no headline block — the question h2 carries the screen.

### D. Counter honesty — "of 5", never "of 7"
1. DELETE the in-sheet italic line `Question {progress} of {QUOTE_TOTAL_STEPS}` (~line 257-259,
   the `aria-live="polite"` paragraph). Its a11y duty moves to (3) below.
2. Footer-bar label (~line 631-633 and the step-1 bar ~line 642):
   - steps 1-5: `Question {step} of 5`
   - contact step: `Almost done`
   - address step: `Last step`
   (Derive via the existing constants — `step <= LAST_QUESTION`, `CONTACT_STEP`,
   `ADDRESS_STEP` — never hardcode 6/7.)
3. The footer label span gets `aria-live="polite"` so step changes are still announced.
   If the footer bar is ever absent while a counter is needed, add a visually-hidden live
   region instead — do not leave step changes unannounced (axe 0-serious is a floor).
4. The thin blue progress BAR keeps its current `{progress}/{QUOTE_TOTAL_STEPS}` width math —
   visual fill only, no text, unchanged.

### E. Untouched — the preserve list (verbatim, byte-identical)
Consent paragraph (A2P-approved) · validation gates + shake · submitContact/submitFinal logic
and payloads · step order/constants · all telemetry event names and stepIds · QuestionScreen's
radio rows, tap beat, motion · FbInput/FbButton internals · the DONE screen's copy and check
animation · HoneypotField · the two error lines. If any edit above forces a touch inside this
list, STOP that item and report.

## FILE 2 — `components/booking/BookingFlow.tsx` (minimal, two edits max)
1. Diff its `const FB` (line ~30) against QuoteFunnel's. If any value drifted, sync to
   QuoteFunnel's values (QuoteFunnel is canonical — its palette comment documents the
   axe-safe blue split). Report the diff even if empty.
2. Add the SAME identity row (exact JSX from §B) at the top of its sheet, same position in
   its layout. Nothing else — /book's copy and flow are not in scope.

## FILE 3 — the /quote page metadata
Find where the `<title>` "Free Roofing Quote | Mabrey Roofing" is set (app/quote/… metadata).
Change the title string to `Schedule Your Free Inspection | Mabrey Roofing`. Description: if it
repeats "fast, free quote" language, align it to the inspection/offer wording — propose the
exact string in the report; keep every other metadata field untouched.

## Checks before finishing
- `grep -rn "Get a Fast, Free Quote"` across the repo — every remaining reference (tests,
  verify scripts, metadata, any other component) is either updated or listed in the report
  with a reason it was left.
- The old canvas h1 was the page's only h1: confirm the new step-1 h1 is present in the
  initial SSR HTML (build output or a rendered check — state how you verified).
- Fold check by arithmetic (no browser needed): progress bar + identity row + step-1 headline
  block + question h2 + 3 option rows + footer must total under ~640px at 375px width using
  the classes above — show the addition in the report.

## Gates + deliverable
- `npx tsc --noEmit` and `npx next build` (delete `.next` first) — FOREGROUND, tails verbatim.
- Stage every touched file at the staging root (repo-relative). Never commit, never deploy,
  never touch .env files, never send anything.
- `wo/BUILD_REPORT_NF.md`: gate tails · files touched with line anchors · the §B asset you
  used and why · the §D label logic · the §2 palette diff · the grep results · the fold
  arithmetic · STOPs. The orchestrator integrates, re-runs gates, deploys with
  `--scope team_NkPhIBvoJCuw96qNM5jblP4J`, and bundle-verifies the live copy.
