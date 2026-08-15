# WO_HOOK_SPECTACLE — the type-as-spectacle hook rebuild (RealBB v6)

**Authored inline (Fable) — every treatment choice below is a taste decision
already made. The builder implements; do not re-design. Where a pixel value
proves unworkable, adjust ≤15% and log it; bigger deviations = stop and report.**

**The mission:** our 0–8.6s is the rated weakness (advice-shaped talking head).
The reference (vault: km-ref-schoolofmentors-teardown-2026-08-15, §visual-system 1)
fights the muted-autoplay war entirely with type — five treatments in eight
seconds. We port that to Joseph's actual hook take.

**Component:** new file `src/HookSpectacle.tsx`, mounted in a NEW composition
`RealBBv6` (copy of RealBBRoll with the hook layer added; RealBBRoll stays
untouched and renderable — it is the blessed v5).

**Word timings:** read from `public/take2-chunks.json` (exact word-level s/e —
use the REAL timestamps, never these approximations).

## The five treatments (T1–T5)

**T1 — caption stack punch (≈0.50–1.05, "Don't")**
Bottom captions keep running (house law). ADDITIONALLY, top zone: "DON'T" slams
in — Anton-class heavy caps, white, 120px, top 8%, spring damping 12 stiffness
280, 3px black stroke + house shadow. It stays and is joined by T2.

**T2 — the takeover word (≈0.72–1.75, "OVERPAY")**
"OVERPAY" is our $400,000 — the emotional money word at second one.
GIANT: 100% frame width (fit text via viewport units / measured scale), brand
red #cf2027 fill, white 6px stroke, slight −4° rotation, lands with an
overshoot spring (damping 10, stiffness 200) + 2-frame 8px shake on impact.
Position: centered, top 12–38% band (face stays visible below it).
"for your" appears small (44px white) tucked under its right edge.
T1+T2 exit together at ≈1.75 with a 4-frame whip-up.

**T3 — kinetic caps build with image-filled glyphs (≈2.56–4.10,
"THE CHEAPEST OPTION YOU CAN FIND")**
Full-frame type build, one word-group per beat, stacked to fill the frame
(reference: "WITH A.I. AGENTS THAT WORK"):
- "THE CHEAPEST" — glyphs FILLED with the worn-roof texture
  (`public/br3-oldroof.png` via `background-clip: text` — the concept lives in
  the letterform; verify it renders in Remotion's headless Chrome, fallback:
  solid #8a8a80 grey-brown).
- "OPTION" — white caps.
- "YOU CAN FIND" — smaller, dark red.
Background: the take, pushed to 130% scale + 40% dimmed (face becomes texture,
not anchor). Each word lands with a 2-frame scale-settle (1.06→1.00) and a
±1.5° rotation offset alternating. Bottom captions: SUPPRESSED during T3 only
(the treatment IS the sentence; duplicating it reads as a bug).

**T4 — the brand moment (≈4.58–5.56, "Here at Mabrey Roofing")**
Cut back to clean face (scale 1.0, undimmed). Top zone: "MABREY ROOFING" in
white caps 84px with the 2A red highlighter sweep behind it (existing Hi2A
mechanics — reuse the component, this is the house accent doing its job).
Small "HERE AT" 40px above it.

**T5 — editorial color stack over the drone cut (≈5.50–8.60)**
The v5 drone-house cut stays EXACTLY as approved (br2-dronehouse.png, same
move). ON it, top zone, an editorial stack (reference flavor-b, lowercase):
- "highest" 54px white lowercase
- "QUALITY" 96px caps, red
- "affordable prices" 54px white, lands at ≈7.7 on the words
Entrances staggered 6 frames, each a soft spring (damping 14). Exit by 8.55
clean — the qualifier beat (9.28+) belongs to the v5 flow, untouched.

## Rules
- Two-zone law holds everywhere except T3's sanctioned full-frame moment.
  Nothing ever covers the face except T3's deliberate dim-behind-type.
- Fonts: if wave-2 installed @remotion/google-fonts (Anton + Inter), use them;
  else system stack '"Arial Black",Arial' as interim and note it.
- Bottom captions component: reuse from RealBBRoll verbatim, add ONLY the T3
  suppression window.
- Verify: render stills at t = 0.9, 1.4, 3.2, 3.9, 5.0, 6.5, 8.2 to
  `wo\hook-frames\` (mkdir) and LOOK at each (paranoia skim, standing order):
  clipping, face coverage outside T3, overlap with the like-rail zone
  (right 12% of frame stays clear of critical glyphs). Fix before reporting.
- Then render the full RealBBv6 comp to `out/RealBBv6-raw.mp4` (same encode
  settings as v5) and confirm duration 46.06s, then STOP — assembly/audio is
  a later slice.
- Report to `wo\OUT_HOOK.md`: what deviated from spec (with %), the 7 frame
  paths, render receipt.
