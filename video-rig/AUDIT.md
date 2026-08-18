# THE SELF-AUDIT PIPELINE — no render ships without passing this

Born 2026-08-16, the night a "hand pointing down" shipped as a paintbrush.
Joseph: *"is there a self-auditing loop pipeline you can craft first, so you're
not shipping things and then I have to audit them?"* This file is that loop.

## WHY THE OLD WAY FAILED (recorded so the fix stays honest)
1. **Sampled verification claimed the set.** 3 of 7 icons were eyeballed; all
   7 shipped. The broken 4 were exactly the ones never rendered in isolation.
2. **The author asked a confirmation question.** "Did my hammer render?" —
   yes, pixels appeared. The real question is a discovery question: "what IS
   this object?" A paintbrush passes the first and fails the second.
3. **Verified in-context at small scale.** Inside a busy 1080×1920 ad frame at
   ~260px, a broken silhouette hides. Isolated at 500px it is obvious.

These are the same laws the CRM side already paid for: *a metric that cannot
see the defect is not verification* · *verify the ROW, not the return value* ·
*a self-certifying gate is no gate.*

## THE LOOP (run before ANY visual deliverable goes to Joseph)

```
BUILD → RENDER AUDIT ARTIFACTS → BLIND VISION PASS → MECHANICAL CHECKS
     ↺ fix and repeat until clean          → RECEIPT → only then SHIP
```

### 1. Render the audit artifacts (mechanical, not curated)
- **Icons/elements:** the `IconLabBlind` comp — every icon isolated, LARGE,
  numbered but UNLABELED, at three animation phases (build ~35%, settle ~75%,
  idle 100%). One command:
  `node audit/audit-icons.mjs render`
- **Full ads:** one still per beat (the beat sheet is the frame list), plus
  the fold-critical frames (first frame, CTA frame). Never hand-pick "good"
  frames — the frame list comes from the beat map, mechanically.

### 2. The BLIND VISION PASS (the centerpiece)
A FRESH subagent — not the author's context — receives the unlabeled sheet
and answers, per numbered cell:
  a. "What object(s) do you see? ≤5 words."
  b. "Would a stranger scrolling at speed recognize it instantly — yes/no?"
  c. "Anything malformed, clipping, or accidentally resembling another object?"
The orchestrator then diffs (a) against the INTENDED list, which the blind
agent never saw.
- **PASS** = intended noun (or unambiguous synonym) appears in the answer.
- **FAIL** = wrong noun, "unclear", or a competing-object read (the paintbrush
  case). No partial credit — a maybe is a fail.
⚖️ The author NEVER grades their own icon. Authorship feels like verification
and is not.

### 3. Mechanical checks (cheap, catch what vision skims)
- Nothing renders outside its cell/viewBox (clipping = the shingle-lines bug).
- Type within safe margins; no text under 28px at 1080-wide.
- For copy frames: spelling of every rendered word, money figures exact.
- Palette lock: only NAVY/WHITE/RED/GOLD/STEEL (+ approved footage).

### 4. The receipt (audited = a file, not a claim)
`audit/receipts/<comp>-<YYYY-MM-DD-HHmm>.md` — per element: intended → blind
answer → verdict, plus the mechanical-check list and the artifact paths.
A deliverable message to Joseph links its receipt. No receipt = not audited =
do not send.

### 5. Ship gate
Only after every element PASSES does the full render go out. If a fix round
happens, the WHOLE set re-runs (a fix can break a neighbor — the set re-audits,
not the diff).

## SCOPE
- Applies to: icon/element libraries, motion-graphics comps, full ad renders,
  static ad images. Anything Joseph is asked to eyeball.
- Does NOT replace Joseph's eyeball — it precedes it. His review is the taste
  gate; this pipeline just guarantees he never again burns a review round on
  "that's a paintbrush."

## COST
One blind pass ≈ one Sonnet subagent + ~6 stills ≈ pennies and ~2 minutes.
A wasted Joseph-review round costs an evening. The math is not close.
