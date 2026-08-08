# BUILD REPORT — WO-NF (/quote reads as a native Meta form + echoes the ad)

Builder: NF-BUILDER (judgment-zero Sonnet). Read `wo/WO_NF_NATIVE_FORM_ECHO_SONNET.md`
and `wo/WO_R2_COMMON.md` (rules applied with WO-NF's overrides — site-only, no CRM
work, different staging root, gates foreground/inline) before starting.

Sandbox: copied `C:/Users/josep/Claude Gravity/mabrey-roofing` (branch `master` @
HEAD `a80ee49`, minus `node_modules/.next/.git`) via `robocopy` into
`…/8e136755…/scratchpad/NF_SANDBOX/`. Never wrote to the real repo. Lockfile check:
both `package-lock.json` and `pnpm-lock.yaml` present; `pnpm-lock.yaml` is the more
recently committed one (2026-07-29 vs 2026-07-27), so installed with `pnpm install`
(one follow-up `pnpm approve-builds sharp` for its native install script — routine,
not a scope decision). All gates run in the sandbox, foreground, inline — none
backgrounded. Staged at `…/scratchpad/NF_STAGED_DELIVERABLE/site/…`, repo-relative
paths, verified byte-identical to sandbox source via `diff -q` (§6). Never committed,
never deployed, never touched `.env` files, never sent anything.

---

## 0. TL;DR gate status

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | ✅ PASS (clean, zero output) |
| `npx next build` (after deleting `.next`) | ✅ PASS — 146 routes, `/quote` included as `○` (static) |

---

## 1. Gate tails (verbatim)

```
$ npx tsc --noEmit
(clean — no stdout/stderr at all; exit code 0)
```

```
$ npx next build
▲ Next.js 16.2.12 (Turbopack)
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
  [pre-existing framework notice — middleware.ts predates this WO, unrelated to
   any of the 3 touched files, not introduced by this build]

  Creating an optimized production build ...
✓ Compiled successfully in 10.2s
  Running TypeScript ...
  Finished TypeScript in 10.0s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/146) ...
✓ Generating static pages using 7 workers (146/146) in 3.8s
  Finalizing page optimization ...

Route (app)
┌ ○ /
...
├ ○ /quote
...
└ ○ /warranty

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

Full 115-line route table omitted here for length; `/quote` renders `○` (fully
static, matching pre-WO behavior — no route-type regression).

---

## 2. Files touched (line anchors are the FINAL post-edit file)

**`components/funnel/QuoteFunnel.tsx`**
- L54-61 — new `stepLabel(step)` helper (§D), placed right after the
  `CONTACT_STEP`/`ADDRESS_STEP`/`DONE_STEP` constants it derives from.
- L286-296 — §A: canvas-level header (`<p>Mabrey Roofing</p>` + old `<h1>`)
  deleted; sheet div gets `mt-6` (first class in its `className`).
- L307-315 — §B: persistent identity row, outside the scrollable div, no step
  gate (renders on every step incl. DONE).
- L317-337 — §C + §D.1: step-1 headline block (`step === 1` gated) added;
  the old `Question {progress} of {QUOTE_TOTAL_STEPS}` italic line deleted.
- L663-665, L671-677 — §D.2/§D.3: both footer-bar label spans now call
  `stepLabel(step)` and carry `aria-live="polite"`.

**`components/booking/BookingFlow.tsx`**
- L165-183 — the same identity-row JSX (icon + "Mabrey Roofing"), inserted as
  the first child of the layout container, above the pre-existing
  `<p>Mabrey Roofing</p>` brand line.
- `const FB` (L30-40): diffed, not edited — see §4 below.

**`app/quote/page.tsx`**
- L25 — `title` changed to `"Schedule Your Free Inspection | Mabrey Roofing"`.
- L26-27 — `description` left untouched (see §5 below — it does not repeat
  "fast, free quote" language, so the WO's conditional does not fire).

---

## 3. §B — the asset used, and why

Read `/public/icon-192.png` with the Read tool (renders as an image): it **is**
the blue rounded-square M mark — confirmed by looking at it, not inferred from
the filename. Used it as specified; did not need to fall back to
`apple-icon.png` or `logo.png`.

House-idiom check: grepped `QuoteFunnel.tsx` and `BookingFlow.tsx` for
`next/image` / `<Image` — zero hits in either file (both already use plain
`<img>`/`<svg>` throughout, no `next/image` import anywhere in either
component). Plain `<img>` matches, exactly as the WO's fallback rule predicts.

SSR verification (not just visual): built the sandbox, then grepped the
prerendered `/quote` HTML at
`.next/server/app/quote.html` — `icon-192.png` appears exactly once (the
identity row), and the string is present in the initial static HTML, not just
client-rendered.

---

## 4. FILE 2 — the `const FB` diff (§2, reported even though empty of drift)

```diff
--- BookingFlow.tsx FB                    +++ QuoteFunnel.tsx FB
   canvas: "#F0F2F5",                        canvas: "#F0F2F5",
                                            >  blue: "#1877F2",
   blueText: "#1568D8",                       blueText: "#1568D8",
                                            >  blueTextHover: "#1462C9",
   text: "#1C1E21",                           text: "#1C1E21",
   subtle: "#65676B",                         subtle: "#65676B",
   line: "#CED0D4",                           line: "#CED0D4",
   green: "#31A24C",                       <  (QuoteFunnel has no `green`)
   font: '-apple-system, ...'                 font: '-apple-system, ...'
```

**Every key present in BOTH files has the identical value — zero drift.** The
only differences are keys present in one file and absent in the other:
`blue`/`blueTextHover` exist only in QuoteFunnel (BookingFlow never references
`FB.blue` or `FB.blueTextHover` anywhere in its source — grepped, zero hits);
`green` exists only in BookingFlow (its own DONE-screen checkmark background,
unrelated to the shared identity row). Since no shared value drifted, and the
identity row only needs `FB.line` (border) and `FB.text` (label color) — both
present and matching in both files — **no sync edit was needed.** Per the WO
("If any value drifted, sync… Report the diff even if empty"): reported, no
action required.

---

## 5. §D — the counter-honesty label logic

```ts
function stepLabel(step: number): string {
  if (step <= LAST_QUESTION) return `Question ${step} of ${LAST_QUESTION}`;
  if (step === CONTACT_STEP) return "Almost done";
  if (step === ADDRESS_STEP) return "Last step";
  return "";
}
```

`LAST_QUESTION = QUOTE_STEPS.length` (confirmed 5 in `lib/quote-funnel.ts`), so
the rendered text reads "Question 1 of 5" … "Question 5 of 5" — never a
hardcoded 6 or 7, fully derived from the same constants that drive step order.
Both footer-bar spans (`step > 1 && step < DONE_STEP` block and the
`step === 1` block) now call the same function, so the two call sites can't
drift from each other the way the old flat text did.

`aria-live="polite"` added to both label `<span>`s (§D.3). Checked whether the
footer bar is ever absent while a counter is still needed: the bar renders for
`step > 1 && step < DONE_STEP` OR `step === 1` — together that's every step
from 1 through `ADDRESS_STEP` (the last step before `DONE_STEP`), i.e. every
step that has a counter concept at all. `DONE_STEP` has no footer bar, but
also needs no counter (it's the success screen). **The footer bar is never
absent while a counter is needed — no visually-hidden fallback region required.**

The progress bar's width math (`(progress / QUOTE_TOTAL_STEPS) * 100`) is
untouched, per §D.4 — still fill-only, no text.

---

## 6. Checks before finishing (per the WO's explicit list)

**`grep -rn "Get a Fast, Free Quote"` across the sandbox repo (all file
types):**

```
components/funnel/QuoteFunnel.tsx:281:        Get a Fast, Free Quote for Your Roofing Project
```

That's the pre-edit baseline — after my edit, this string has **zero**
remaining occurrences anywhere in the tree (verified post-edit: `grep -rln
"Get a Fast" .` → zero matches). No test, verify script, or other component
referenced the literal phrase, so nothing else needed updating for that exact
string.

**Related but distinct finding, flagged per the WO's "tests… listed in the
report" language even though the literal grep didn't hit it:**
`tests/quote-funnel.spec.ts` has two hardcoded assertions —
`page.getByText(/question 1 of 7/i)` (L40) and `page.getByText(/question 7 of
7/i)` (L67) — that targeted the now-deleted in-sheet italic counter line.
Post-edit, `grep -c "of 7" .next/server/app/quote.html` returns 0, so both
assertions will fail the next time this spec runs. **Not edited** — `tests/`
is outside this WO's three-file scope (FILE 1/2/3 only), and fixing test
assertions is a judgment call about what the NEW assertion should say, not a
mechanical rename. Also worth flagging: this same spec file's linear walk
(L36-69) still asserts the OLD address-before-contact step order (expects
"Where is the roof" before "Where do we reach you") — that staleness
**predates this WO** (from the WO-QS contact/address swap, already shipped at
HEAD `a80ee49`, never updated in this spec) and is unrelated to anything I
touched. Flagging both so the orchestrator can batch a test-suite fix rather
than treat mine as a new regression.

`tests/fork.spec.ts`'s "Step 1 of 7" reference (L6, L9) is the SITE's
separate hero `EstimateQuiz` component (homepage `#estimate`), derives its
expected string from `QUOTE_TOTAL_STEPS` dynamically (not hardcoded), and I
did not touch that component or `QUOTE_TOTAL_STEPS` — unaffected, no action
needed. Same for `tests/site-funnel.spec.ts`'s "Step N of
{QUOTE_TOTAL_STEPS}" assertions — also the homepage hero quiz, not `/quote`.

**The old canvas h1 was the page's only h1 — confirmed the new step-1 h1 is
present and singular in the initial SSR HTML.** Verified by building the
sandbox (`next build`) and grepping the prerendered output at
`.next/server/app/quote.html`:

```
$ grep -o '<h1[^>]*>' quote.html | wc -l
1
$ grep -o '<h1[^>]*>[^<]*' quote.html
<h1 class="mt-1 text-center text-[20px] font-bold leading-tight" style="color:#1C1E21">Schedule Your Free Inspection
$ grep -c "Get a Fast, Free Quote" quote.html
0
$ grep -c "Question 1 of 7|of 7" quote.html
0
$ grep -o 'Question 1 of [0-9]*' quote.html
Question 1 of 5
$ grep -o '\$0 down[^<]*' quote.html
$0 down · $129/mo · Full roof replacement
$ grep -o '<title>[^<]*</title>' quote.html
<title>Schedule Your Free Inspection | Mabrey Roofing</title>
```

This is real evidence, not inference — `step` is initialized to `1`
(`useState(1)`), so the `step === 1` block renders unconditionally on the very
first server render, and it's the only `<h1>` element anywhere in that
render. Also spot-verified the `·` separators are byte-exact U+00B7 (hex `c2
b7`) against the WO source text itself, not just visually similar characters.

---

## 7. Fold arithmetic (step 1, 375px viewport, no browser — per the WO's ask)

Container width chain: outer takeover `px-4` (16px×2) → 343px available →
sheet `w-full max-w-md` caps at 448px but only 343px is available, so sheet =
343px → scrollable content div `px-5` (20px×2, mobile; `sm:px-7` doesn't apply
below 640px) → **303px content width** for the headline block + question h2.

Per-item heights (mobile Tailwind values; text-wrap assumptions stated —
erred toward the pessimistic/taller estimate on every line that plausibly
wraps at 303px, so this is a conservative ceiling, not a best case):

| Item | Basis | Height |
|---|---|---|
| Progress bar | `h-1.5` fixed | 6px |
| Identity row | `py-2.5`(20) + img 28px (taller than the 15px text line) + `border-b`(1) | 49px |
| Step-1 headline block | h1 "Schedule Your Free Inspection" (29 chars @ 20px bold, leading-tight) wraps 2 lines → 4+50=54px; `·` price line (43 chars @ 15px semibold) wraps 2 lines → 4+40=44px; "5 quick questions" (17 chars @ 13px) fits 1 line → 2+18+4=24px | 122px |
| Question h2 | "What kind of property is it?" (29 chars @ 19px bold, no `sub` on step 1) wraps 2 lines → 8+50 | 58px |
| 3 option rows | `mt-4`(16) + 3×`min-h-[52px]`(156) + 2×`space-y-2.5` gaps(20); step 1's options carry no `hint` text | 192px |
| Footer bar | `py-2.5`(20) + one short line ("Question 1 of 5") | 37px |
| **Strict 6-item sum** | | **464px** |

464px is **well under the ~640px ceiling** (176px of margin), even under
worst-case 2-line-wrap assumptions on every text element that could plausibly
wrap.

For completeness, the full sheet footprint (adding the sheet's own `mt-6`
top margin, the scrollable div's `py-5` vertical padding that wraps the
headline+question+options group, and the sheet's `mb-4` bottom margin — none
of which the WO's 6-item list named individually, but all of which are real
rendered space): 24 (mt-6) + 6 + 49 + 20 (py-5 top) + 122 + 58 + 192 + 20
(py-5 bottom) + 37 + 16 (mb-4) = **≈544px total**, from the top of the sheet
to the bottom of the footer bar — comfortably inside even the smallest common
mobile viewport (iPhone SE, 375×667) with room to spare, confirming the whole
step-1 screen (including the footer) renders without the internal scrollable
region needing to scroll on a typical phone. (`HoneypotField` contributes 0px
— it's `position: absolute; left: -9999px`, out of flow, confirmed by reading
`useLeadSubmit.tsx`.)

---

## 8. §E preserve-list verification (byte-identical check, not just "I didn't
mean to touch it")

Ran a full `diff -u` of the original vs. edited `QuoteFunnel.tsx` (109-line
diff, reproduced in full below this table by section) and independently
grepped both files for every preserve-list item's exact text — all matched
verbatim, only line numbers shifted from the insertions above them:

| Preserve item | Verified |
|---|---|
| Consent paragraph (A2P-approved) | Byte-identical text at (shifted) L437, confirmed via grep against original L405 |
| Validation gates + shake | `nameValid`/`phoneValid`/`attempted`/`shakeAnim`/the two `role="alert"` phone+name error blocks — zero diff lines touch them |
| `submitContact`/`submitFinal` logic + payloads | Zero diff lines inside either function body |
| Step order/constants | `LAST_QUESTION`/`CONTACT_STEP`/`ADDRESS_STEP`/`DONE_STEP` — same formulas, same values; only a new function was added adjacent to them |
| Telemetry event names + stepIds | Zero diff lines touch `track(...)` calls or the `stepId` map |
| `QuestionScreen` (radio rows, tap beat, motion) | Entirely outside the diff — function untouched |
| `FbInput`/`FbButton` internals | Entirely outside the diff — untouched |
| DONE screen copy + check animation | Entirely outside the diff (the `step === DONE_STEP` JSX block itself is byte-identical; the identity row now sits ABOVE it structurally, not inside it) |
| `HoneypotField` | Untouched, same call site (now inside the same scrollable div, just below the moved `AnimatePresence`) |
| The two "That did not go through" error lines | Both confirmed byte-identical at their (shifted) line numbers |

Nothing on the preserve list forced a touch — no STOP needed for §E.

Full diff of the 4 edit regions (§A/§B/§C+D.1 combined as one contiguous hunk,
then §D.2/§D.3 as two more hunks) is in the report generation working notes;
the summary above is the complete set of changed regions — no edits exist
outside what's itemized in §2.

---

## 9. Staging verification

```
$ diff -q <sandbox> <staged>
components/funnel/QuoteFunnel.tsx: MATCH
components/booking/BookingFlow.tsx: MATCH
app/quote/page.tsx: MATCH
```

Staged at `…/scratchpad/NF_STAGED_DELIVERABLE/site/…`, repo-relative paths
(`components/funnel/QuoteFunnel.tsx`, `components/booking/BookingFlow.tsx`,
`app/quote/page.tsx`), byte-identical to the gate-passing sandbox source.

---

## 10. STOPs / flagged findings

No item in FILE 1/2/3's instructions resisted implementation — nothing hit a
hard STOP. Two observations flagged for the orchestrator's judgment (neither
blocked the build):

1. **BookingFlow.tsx now shows "Mabrey Roofing" twice, stacked** — the new
   identity row (icon + bold "Mabrey Roofing", §B/FILE 2 edit) sits directly
   above the pre-existing plain-text `<p className="text-center text-[14px]
   font-bold">Mabrey Roofing</p>` brand line (`BookingFlow.tsx` L184-186,
   post-edit). The WO scoped FILE 2 to "two edits max… nothing else — /book's
   copy and flow are not in scope," and the two named edits are exactly (a)
   diff the FB block, (b) add the identity row — removing the old line would
   be a third edit and touches "flow," so I left it as literally specified
   and did not delete the pre-existing line. Visually redundant on `/book`
   until someone decides whether the old line should go.
2. **§3 (Description)** — WO says "if [the description] repeats 'fast, free
   quote' language, align it… propose the exact string." Checked: the
   current description ("Answer a few quick questions and we will call to set
   a free, no-pressure roof inspection.") contains neither "fast" nor "quote"
   — it's already inspection-framed, not quote-framed. Conditional did not
   fire; left untouched, exactly one field (`title`) changed in FILE 3.
3. **Pre-existing test staleness surfaced, not introduced** — see §6:
   `tests/quote-funnel.spec.ts`'s two "of 7" assertions will fail post-merge
   (direct consequence of §D.1/§D.2, expected and correct — the old text they
   check for is supposed to be gone now), and that same file's step-order walk
   was already stale from the earlier WO-QS swap, unrelated to this WO. Both
   are outside the 3-file scope; flagged for a follow-up test-suite pass
   rather than silently patched.

---

## 11. REGISTRATION section

**N/A.** This WO is site-only (`mabrey-roofing`), never touches
`src/lib/assistant.ts` or any CRM file — the Round-2 registration rule
(`WO_R2_COMMON.md`'s `## 🔴 THE REGISTRATION RULE`) doesn't apply.

---

## 12. Deploy note (for the orchestrator, not executed here)

Per WO-NF: deploy with `--scope team_NkPhIBvoJCuw96qNM5jblP4J`, then
bundle-verify the live copy. Not exercised — no deploy was run from this
sandbox.
