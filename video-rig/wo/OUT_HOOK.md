# OUT_HOOK — WO_HOOK_SPECTACLE build receipt (2026-08-15)

Two phases: install the blessed shortlist from `OUT_SCOUR.md`, then implement
`WO_HOOK_SPECTACLE.md` as `RealBBv6`. Everything below is a receipt from a real
run, not an intention.

---

## PHASE 1 — INSTALL

### Receipt — `npm ls`, top-level

All ten packages resolved at **4.0.509**, in lockstep with the rig's pinned
`remotion` / `@remotion/cli`. `npx remotion upgrade` was NOT run; nothing was
installed at `latest`. OUT_SCOUR flag 2 (version lockstep) is satisfied — no
version-mismatch error at runtime across ~1,380 rendered frames.

```
video-rig@1.0.0 C:\Users\josep\Claude Gravity\video-rig
+-- @remotion/captions@4.0.509
+-- @remotion/cli@4.0.509
+-- @remotion/google-fonts@4.0.509
+-- @remotion/lottie@4.0.509
|   `-- lottie-web@5.13.0 deduped
+-- @remotion/motion-blur@4.0.509
+-- @remotion/noise@4.0.509
+-- @remotion/paths@4.0.509
+-- @remotion/shapes@4.0.509
|   `-- @remotion/paths@4.0.509 deduped
+-- @remotion/transitions@4.0.509
|   +-- @remotion/paths@4.0.509 deduped
|   `-- @remotion/shapes@4.0.509 deduped
+-- lottie-web@5.13.0
+-- remotion@4.0.509
`-- split-type@0.3.4
```

`added 10 packages, and audited 256 packages` · `found 0 vulnerabilities`.

### Smoke still — `wo/smoke-arsenal.png`

| # | Proof | Verdict |
|---|-------|---------|
| a | Anton + Inter via `@remotion/google-fonts` | ✅ both render |
| b | `background-clip: text` with a `public/` png as the fill | ✅ renders — **with one mandatory condition, below** |
| c | `evolvePath` stroke sweep (`@remotion/paths`) | ✅ renders |

### ⚠️ `background-clip: text` verdict — WORKS, but it needs a tracked preload

**It renders in Remotion's Chromium.** OUT_SCOUR's high-confidence "no library
needed" call was correct. The specced grey-brown fallback (`#8a8a80`) is NOT
needed and was not used.

But the first smoke attempt rendered the clipped word **completely invisible**,
and the reason is worth carrying forward because it will bite anything that
fills type or shapes with an image:

- **Root cause is asset loading, not the clip.** Remotion's `delayRender`
  only waits on assets it knows about — `<Img>`, `<OffthreadVideo>`, `<Audio>`.
  A bare CSS `background-image: url(...)` is invisible to it, so the frame gets
  captured before the bitmap decodes. `br3-oldroof.png` is **29.9 MB /
  3072×5504**, so it loses that race every time. Transparent fill + no painted
  background = nothing on screen.
- **Diagnosis, not a guess.** The second smoke still renders three cases side by
  side: `B1 GRADIENT` (clip + a gradient, zero network) painted fine, proving
  the clip mechanism; `B2 ROOFPNG` (clip + the 29.9 MB png) painted fine *once a
  tracked `<Img>` of the same `staticFile()` URL was mounted in the subtree*;
  and a plain un-clipped background box as a control. Had the clip itself been
  unsupported, the failure mode would have been the opposite — a full rectangle
  of roof texture with transparent letters.
- **The fix, now baked into `HookSpectacle.tsx`:** T3 mounts a hidden 2×2
  `<Img src={staticFile('br3-oldroof.png')}>` alongside the clipped text. That
  makes the frame block on the decode and warms the cache the CSS background
  then paints from. Deterministic on single stills and on full renders.

---

## PHASE 2 — BUILD

- `src/HookSpectacle.tsx` — new. T1 / T2 / T3 / T5 + the exported helpers
  `hookSuppressesCaptions()` and `hookBackground()`.
- `src/RealBBv6.tsx` — new. v5 copied verbatim (same cut list, captions, four 2A
  graphics, end card) plus the hook layer, the T3 background treatment, and T4.
- `src/Root.tsx` — `RealBBv6` registered at **1380 frames / 30 fps / 1080×1920**.
- **`src/RealBBRoll.tsx` is byte-unchanged** — `git diff HEAD -- src/RealBBRoll.tsx`
  returns empty. Nothing in `out/RealBBRoll*` was touched.
- Scratch comp removed: `SmokeArsenal` is out of `Root.tsx` and the file is
  deleted. `wo/smoke-arsenal.png` is the surviving receipt.

Every window is driven by the **real** word timestamps in
`public/take2-chunks.json`, never the WO's approximations:

```
0.50 Don't · 0.94 overpay · 1.32 for · 1.48 your · 1.62 roof
2.56 with · 2.70 the · 2.80 cheapest · 3.04 option · 3.52 you · 3.78 find.
4.58 Here · 4.72 at · 4.84 Mabrey · 5.16 Roofing
6.06 highest · 6.42 quality · 7.72 affordable · 8.08 prices.
```

### Note on the take's framing

The face fills this frame far more than a normal talking-head: hat crown ≈11%,
brim bottom ≈37%, eyes ≈42%, mouth ≈62%, chin ≈82%. The WO's T2 band of
"top 12–38%" therefore lands on the **hat and brim**, with the face fully
visible beneath it — the spec is correct for this framing, confirmed against
`wo/hook-frames/_ref-face-t1.0.png`.

---

## DEVIATIONS LOG

Nine entries. Seven are ≤15% or additive. **#4** (word-locked T5 stagger) was a
judgment call against a literal spec number — **raised, ruled on, approved.**
**#5** (T5 "QUALITY") was superseded outright by a pinned design call. Both are
recorded here with the ruling, not quietly absorbed.

**1 · T2 OVERPAY width — 95.4% advance / 92.2% inked, vs spec "96–100%".**
−0.6 pts on the advance figure, −3.8 pts on the inked figure (−4.0% relative).
SVG `textLength` is an *advance* width including side bearings, so the visible
ink is always narrower than the number. Measured inked extent at t=1.4:
**x=33 → x=1029** of 1080. Pushing further would put the outer stroke and the
−4° rotation corners within ~5px of both frame edges, where antialiasing reads
as clipping. It renders as an edge-to-edge takeover word — see `t1.4.png`.

**2 · T2 fit method — SVG `textLength` + `lengthAdjust`, not a measured scale.**
The WO allowed "viewport units / measured scale". A `useLayoutEffect` measure
pass is unsafe here: Remotion renders frames statelessly, so an unsettled
measurement is a silent clipping bug on exactly the frames nobody re-checks.
`textLength` is exact on every frame including the first.
**First attempt was wrong and was caught in the stills:** `lengthAdjust="spacingAndGlyphs"`
stretched the glyphs ~13% to reach the target — OVERPAY's O came out visibly
rounder than the true Anton O in DON'T directly above it, which defeats the
point of a condensed face. Now `lengthAdjust="spacing"` at fontSize 320, where
Anton's natural width is ≈1014px, so the 1030 target costs ~2.7px of extra
tracking per gap and **zero glyph distortion**.

**3 · T2 overshoot lives in translateY, not scale.** Spring constants are exactly
as specced (damping 10, stiffness 200) but the scale channel is clamped to ≤1.0.
At 95% frame width a scale overshoot pushes the Y off the right edge. Vertical
overshoot is where impact reads anyway. Same reason the **2-frame 8px impact
shake is vertical-only** — the WO didn't specify an axis.

**4 · T5 stagger is word-locked, not 6 frames. ✅ APPROVED (Joseph, 08-15).**
The WO says "entrances staggered 6 frames" AND "affordable prices … lands at
≈7.7 on the words" AND, at the top, "use the REAL timestamps, never these
approximations". Those cannot all hold: "highest" is at 6.06 and "quality" at
6.42, which is **10.8 frames apart, not 6**. I held word-lock — all three lines
land on their spoken word (6.06 / 6.42 / 7.72). Ruling: *the timestamps law
outranks the 6-frame literal.* Closed.

**5 · T5 "QUALITY" is WHITE caps on the 2A red highlighter sweep.**
✅ **Pinned design call (Joseph, 08-15)** — supersedes the red-text spec and my
interim red-plus-black-stroke fix.
Rationale as given: *the 2A sweep IS the house emphasis device on busy footage;
white-on-red-bar reads on both canopy and hat.* The underlying problem was real
and is what triggered the call: T5 crosses two very different backgrounds —
dark tree canopy on the drone cut (6.06–7.75), then his **white hat** once the
cut returns to the take (7.75–8.55) — and brand **red text** is low-contrast
against *both*. A black stroke helped but never made it pop.
Implementation: identical mechanics to the T4 brand moment / the existing Hi2A —
bar draws left→right on the same `interpolate(f0, [8,22], [0,1])` grow window,
same `top:15% / height:72% / borderRadius:8 / 0 0 26px glow`. Size (96px), font
(Anton), position, and stack order are unchanged from the specced QUALITY. No
stroke on it — the bar is the separation, as in every other Hi2A instance.
The 3px black stroke remains on T1's "DON'T" and the white stroke on T2's
"OVERPAY", per the same ruling.
Three states verified: `t6.5.png` (white, bar not yet started — it begins at
6.69), `t7.0.png` (bar ~64% drawn), `t8.2.png` (fully drawn, over the white hat).

**6 · T4 renders through the existing Hi2A with one added optional `font` prop.**
The WO says reuse the component; the font rule says use Anton. Hi2A in RealBBv6
now takes `font?` defaulting to the v5 system stack, so **the four v5 graphics
render byte-identical to v5** and only T4 passes Anton. Without this the brand
moment would have been the one non-Anton element inside an Anton hook.
`RealBBRoll.tsx` was not touched to do this — RealBBv6 has its own copy.

**7 · T3 lines are mounted for the whole window and hidden by opacity.**
Not a spec change — a bug fix caught in the stills. Unmounting lines before
their beat made the flex column re-centre on each landing, so the two lines
already on screen **jumped ~80px upward** when "YOU CAN FIND" arrived at 3.52.
Reserving the full stack height from the first beat is what makes it a build
instead of a shuffle. Verified: "THE CHEAPEST" now sits at identical y in
`t2.8.png` and `t3.9.png`.

**8 · T3 window runs to 4.29, spec said ≈4.10.** +0.19s (+4.6%) so the exit ramp
completes cleanly before T4 opens at 4.58. Background push/dim releases on the
same ramp, so T4 opens on a clean face as specced.

**9 · Sizes the WO left open, chosen and verified.** T3 stack 176 / 330 / 120px
with the alternating ∓1.5° tilt and the 2-frame 1.06→1.00 settle as specced;
T3 fill sampled at `backgroundSize: 1000px auto, backgroundPosition: center 56%`
(1400px was too zoomed — glyphs read as generic cracked stone rather than as a
roof). T1 120px, T5 54/96/54, T4 40/84 are all exactly per spec.
Fonts are loaded with narrowed weights + `latin` subset — the unnarrowed Inter
load fires **126 font network requests per render worker** (Remotion warns).

---

## THE 7 FRAMES — what I saw in each

All at `wo/hook-frames/`. Every one was rendered, opened, and looked at; the
three defects found are fixed and re-verified in these files. Two supplementary
frames (t1.8, t2.8) were added to check the whip exit and the stack-stability
fix.

| Frame | Path | What I saw |
|---|---|---|
| t=0.9 | `wo/hook-frames/t0.9.png` | T1 only, as timed (T2 enters 0.94). "DON'T" white Anton + 3px black stroke at top 8%, sitting in the tree canopy above the hat crown. Face completely clear, bottom captions running. No clipping, right rail clear. |
| t=1.4 | `wo/hook-frames/t1.4.png` | The takeover. OVERPAY red / white-stroked / −4°, spanning **x=33→1029** — no clipping, and the letterforms are now true condensed Anton matching DON'T above (this frame is what caught the glyph-stretch defect on the first pass). Cap band 16.5–29% = hat and brim; eyes, nose, mouth all visible below. "FOR YOUR" tucked under the right edge. |
| t=1.8 | `wo/hook-frames/t1.8.png` | Supplementary. Early in the 4-frame whip-up (cubic-in, ~5% through) — block still essentially in place, reads as anticipation before the snap-off. Nothing broken. |
| t=2.8 | `wo/hook-frames/t2.8.png` | Supplementary, first T3 beat. "THE CHEAPEST" alone, glyphs filled with the worn roof — shingle courses and a crack read clearly inside the letterforms. Take pushed to 130% + dimmed 40%, face is texture not anchor. Captions correctly suppressed. Critically: the line already sits in its **final** y, proving the stack no longer shuffles. |
| t=3.2 | `wo/hook-frames/t3.2.png` | Two lines in ("THE CHEAPEST" + "OPTION"), both at their final positions — identical y to t=3.9. Alternating tilt visible. Captions suppressed. |
| t=3.9 | `wo/hook-frames/t3.9.png` | Full three-line stack, the sanctioned full-frame moment. Measured extents: "THE CHEAPEST" **x=88→988** at y 640–810 (33–42%, above the rail band); "OPTION" **x=126→953** at y 860–1170; "YOU CAN FIND" dark red, well inside. No clipping. |
| t=5.0 | `wo/hook-frames/t5.0.png` | T4 brand moment. Face clean — scale back to 1.0, undimmed, as specced. "HERE AT" 40px over "MABREY ROOFING" 84px white Anton caps, red highlighter sweep caught mid-grow (~36% across, covering "MAB") — the Hi2A mechanic doing its normal job. Top zone, face untouched, captions running. |
| t=6.5 | `wo/hook-frames/t6.5.png` | T5 over the drone cut, unchanged from v5. "highest" (Inter 900) + "QUALITY" in **white** Anton caps — the red bar has not started yet (it begins at 6.69, 8 frames after the word lands, per the Hi2A grow window). White-on-canopy reads cleanly with the house shadow. Top zone, no face — it's b-roll. |
| t=7.0 | `wo/hook-frames/t7.0.png` | Added to catch the sweep mid-flight. Red bar **~64% drawn** behind white "QUALITY", covering "QUAL" and part of the I. This is the house device visibly doing its job on the busiest background in the hook. |
| t=8.2 | `wo/hook-frames/t8.2.png` | Full T5 stack, and the drone cut has ended (7.75) so this is over his face. Stack at 7.5–22% — well clear of the eyes at 42%. Bar fully drawn: white QUALITY on solid red over the **white hat**, which was the worst-case background and is now the strongest beat in T5. Captions running. |

Extra reference frames kept alongside: `_ref-face-t1.0.png`, `_ref-face-t5.0.png`
(framing map), `_ref-rooftexture.png` (fill-source inspection).

### Right-rail check — measured, one 3px touch, accepted

Rule: right 12% (x > 950) clear of critical glyphs. Measured off the stills:

| Element | Inked extent | Vertical band | Verdict |
|---|---|---|---|
| T2 OVERPAY | x=33 → **1029** | 15–29% | above the rail's vertical band — clear |
| T3 THE CHEAPEST | x=88 → **988** | 33–42% | above the rail's vertical band — clear |
| T3 OPTION | x=126 → **953** | 45–61% | **+3px past the boundary** |
| T5 stack | x=310 → **769** | 7.5–22% | clear by 181px |

OPTION touches x=953 — a 3px breach that would cost the right stem of the N a
sliver under a like-rail icon. Left as-is deliberately: the **blessed v5 bottom
captions run to x=1044**, i.e. 94px into the same zone, and Joseph shipped that.
Tightening OPTION to 950 while captions sit at 1044 would be incoherent.
Reported rather than silently fixed — trivially reversible (drop OPTION 330→320).

---

## RENDER RECEIPT

```
npx remotion render <bundle> RealBBv6 out/RealBBv6-raw.mp4 --codec h264
→ Encoded 1380/1380
→ + out/RealBBv6-raw.mp4   116.8 MB    [exit code 0]
```

`ffprobe out/RealBBv6-raw.mp4`:

| | |
|---|---|
| duration | **46.058667s** → **46.06s ✅** (WO target: 46.06s) |
| frames | **1380 / 1380** encoded, none dropped |
| resolution | 1080 × 1920 |
| video | h264, 30/1 fps |
| audio | aac, 2159 frames — his voice track carried through intact |
| size | 116,767,172 bytes (116.8 MB) |
| written | 2026-08-15 02:10 |

**v5 is intact and still renders.** `git diff HEAD -- src/RealBBRoll.tsx` is empty
(byte-unchanged), and `RealBBRoll` was rendered as a still from the same bundle
after the v6 work: `wo/hook-frames/_ref-v5-still-t6.0.png`.
`out/RealBBRoll-v5-raw.mp4` is untouched at its original 00:38 timestamp.

Per the WO this is where the slice ends — **assembly and audio are a later
slice** and were not started. The temporary `.hook-bundle/` build dir used to
render the stills has been deleted.

---

## CLOSED THIS PASS

- **T5 contrast** — was the one open design question. Ruled: white caps on the
  2A red sweep. Applied, rendered, verified across all three bar states.
  *(The superseded intermediate render was killed rather than finished — one
  render of the final state beats two of intermediate states.)*
- **T5 stagger** — word-lock approved; the timestamps law outranks the 6-frame
  literal.

## OPEN — needs Joseph's eye

1. **Deviation #1** — OVERPAY's inked coverage is 92% of frame width (95.4%
   advance). It reads full-bleed, but if you want it genuinely kissing both
   edges that is a deliberate bleed decision to make, not a bug to fix.
2. **T3 "OPTION" touches x=953**, 3px into the nominal right-12% rail zone —
   left as-is because the blessed v5 captions run to x=1044. Reversible in one
   constant (330→320) if you want the line held.

Not committed to git. `out/RealBBRoll*` and Downloads untouched.

---

# SLICE 3 — WO_G4_COMPOSITE (2026-08-15, COMPOSITE builder)

Two pinned changes to `RealBBv6` + a full re-render. `src/RealBBRoll.tsx` (v5)
is byte-untouched — `git diff HEAD -- src/RealBBRoll.tsx` is empty. Nothing
committed to git. `out/RealBBRoll-v5-raw.mp4`, `out/v4b-audio-PROOF.mp4`,
`wo/audio-assets/` and Downloads were not touched.

## 1 — The behind-subject composite at the $50M beat

Sequence-mounted, `layout="none"`, under the two-zone gradient scrim and under
the G4 `Hi2A` headline. Layer stack inside the Sequence, bottom → top:

| # | layer | value |
|---|---|---|
| 2 | scrim | `rgba(12,27,46,0.85 × env)` full frame |
| 3 | behind-graphics | container `opacity 0.2 × env` |
| | · numerals | Anton 140px, `WebkitTextStroke 2px #fff`, fill transparent, two instances, drift −12 px/s |
| | · roofline | one SVG path, `#050b14`, ×0.75 inside the container → **15%** |
| 4 | matted speaker | `<OffthreadVideo transparent muted src="take2-alpha.webm" trimBefore={1121}>`, `objectFit: cover` |

`trimBefore` = the mount frame, so alpha frame N lands on base frame N. Both
files are 1080×1920 / 30fps, so `objectFit: cover` is a 1:1 map — the
alignment is geometric, not eyeballed.

`env` = `interpolate(f, [0, 8, 83, 91], [0, 1, 1, 0])` — in over 8 frames from
the mount, out over the 8 frames ending at 40.4s.

### ⚠️ DEVIATION #1 — the mount is frame **1121**, not the WO's 1116

**Caught by the t=37.3 still, which is exactly why that still was specified.**
At 1116 (37.20s) the MAP cut is still on screen — it runs to 37.35 — so the
matted speaker mounted *over the map graphic* and floated there as a cut-out
for 5 frames before the map cut out from under him. A 0.17s face flash at a
cut seam: the same artefact class v5 already killed once (the 18.02 hand cut,
"0.28s of face flashing between the two cuts").

1121 (37.367s) is the first frame after the map's out-point. There the base
take is underneath again, so the matted speaker lands pixel-identical on his
base-video self and the layer mounts invisibly — which is the whole premise of
the device. The out-point (1212 / 40.4s) is unchanged; duration 96 → 91.

Receipt: `wo/hook-frames/g4-t37.3.png` now shows the map cut clean and
unobstructed. `wo/hook-frames/g4-t37.47.png` (frame 1124, `env` 0.375) is the
"scrim entering" frame the WO asked for, one mount-width later.

### ⚠️ DEVIATION #2 — the roofline is a 980-tall silhouette, not a bottom strip

Built first exactly as pinned: a 360px strip on the bottom edge, 15%. It was
**100% invisible** — he fills the bottom of this frame shoulder to shoulder.

Probed rather than guessed. Alpha channel of `take2-alpha.webm` at frame 1155
(`alphaextract`, 0 = background visible, 255 = he covers it):

```
(40,1700) = 255      (300,1750) = 255     ← the pinned bottom strip: dead paint
(20,1240) =   0      (20,1330)  =   0     ← open frame, left of his neck
(100,1250)=   0      (160,1300) =   0
(1040,1200)=  0      (1040,1320)=   0     ← open frame, right of his braid
```

So the path was rebuilt 980 tall, still anchored to the bottom edge, with the
ridge line crossing at screen y≈1115–1320 — inside the open bands the probe
found. Second receipt: the same frame rendered with the path temporarily
filled `#ff0000` shows the gable mass reading on **both** sides of him, which
proves paint + geometry + occlusion rather than inferring them. Test fill
reverted to `#050b14`; the red frame was written to scratch, never to `wo/`.

### The three gates the WO named

- **Ghosting — NONE.** Frame 1119 of the base take was extracted straight from
  `take2-cfr.mp4` and set against the composite still: same head scale, same
  position, same mouth shape, same chain and braid. The silhouette covers his
  base-video self exactly. (The mirrored hat lettering is the source take's own
  front-camera mirror, present in the base frame too — not the matte.)
- **Halo on navy — ACCEPTABLE.** Three 1:1 crops (hat edge, jaw/ear/braid,
  left shoulder) against the 0.85 navy scrim: hard clean edge on the hat, no
  light fringe, no dark rim, braid strands preserved. The only soft edge is his
  out-of-focus hand at the bottom-left, which is soft in the source.
- **Hi2A unobstructed — YES.** The headline sits above the composite in the
  tree; "WE'VE INSTALLED OVER / $50 MILLION / OF ROOFS" and the red sweep are
  untouched, and the bottom captions still render last of all.

## 2 — B-roll video swap

The `Cut` type gained `video?: boolean` and `srcFrom?: number`; `BRoll` gained
an `OffthreadVideo` branch (the v6 copy had stills only).

| cut | was | now | in/out | srcFrom | s / x / y |
|---|---|---|---|---|---|
| `old` | `br3-oldroof.png` | `broll-v2/br3-oldroof-v2.mp4` | 9.80–11.30 | 0.2s | `[1,1] / [0,0] / [0,0]` |
| `curl` | `br4-curl.png` | `broll-v2/br4-curl-v2.mp4` | 12.16–14.02 | 0.3s | `[1,1] / [0,0] / [0,0]` |

Camera-move lerps neutral per the WO — the clips carry real motion and a
synthetic push on top would double-move. The 3-frame entry settle (1.035 → 1)
is kept: it is the house cut-seam device, not a camera move, and dropping it
would have made these two cuts enter differently from every other cut.

**The clip must be Sequence-mounted at its own in-point.** `BRoll` renders at
the composition root, so a bare `OffthreadVideo` would ask a 5.03s clip for its
frame 294 and come back black. `<Sequence from={round(cut.from×fps)}>` restarts
the clip's clock at the cut; `trimBefore={round(srcFrom×fps)}` picks the
in-point inside it.

Both clips are video-only (`ffprobe` → `streams: video`), as is the alpha webm,
so nothing can leak into the mix; `muted` is set anyway per the WO.

Verified in render: `wo/hook-frames/broll-t10.5.png` (full-frame worn roof,
missing tabs, vent pipe — caption "IS OVER 15 YEARS OLD" clean over it) and
`wo/hook-frames/broll-t13.1.png` (curled-tab macro, exposed decking — caption
"SEE SOME CURLING SHINGLES," clean over it). No black frames, no letterbox.

## 3 — Sync probe: the matte is frame-locked, mechanically

Eyeballing one frame proves one frame. To rule out drift anywhere inside the
window, alpha frame **1190** was PSNR'd against five neighbouring base frames,
each masked by the same alpha and flattened over black (so only HIS pixels are
compared):

```
base 1188 → 19.68 dB      base 1191 → 20.62 dB
base 1189 → 21.09 dB      base 1193 → 18.74 dB
base 1190 → 35.33 dB   ← sharp peak at the SAME index
```

A 14 dB spike at the matching index and nowhere else. The 35.33 dB ceiling is
the VP9-crf32-vs-h264 lossy floor, not misalignment — a one-frame offset would
have read as ~21 dB. **Offset = 0 frames. No ghosting is possible.**

## 4 — Render receipt

```
npx remotion render src/index.ts RealBBv6 out/RealBBv6-raw.mp4 --codec h264
started 02:28:44 · finished 02:34:13 · 5m29s wall
Rendered 1380/1380 · Encoded 1380/1380
→ ○ out/RealBBv6-raw.mp4   109.6 MB   [exit code 0]
```

`ffprobe out/RealBBv6-raw.mp4`:

| | |
|---|---|
| duration | **46.058667s** ✅ (target ≈46.058s — bit-identical to the pre-slice render) |
| frames | **1380 / 1380**, none dropped |
| resolution | 1080 × 1920, h264, 30/1 fps |
| audio | aac, **2159 frames** — his voice track carried through unchanged |
| size | 109,625,778 bytes (109.6 MB, down from 116.8 MB — the navy scrim and the two video cuts compress better than the high-detail stills they replaced) |
| bitrate | 19.0 Mbit/s |
| written | 2026-08-15 02:34 |

### Verified out of the DELIVERED MP4, not just out of stills

Frames pulled back out of `out/RealBBv6-raw.mp4` with ffmpeg and looked at:

- **1118 / 1122** — the seam. 1118 is the map cut, clean and unobstructed;
  1122 is the composite mounted with the scrim entering and him seamless. The
  5-frame cut-out-over-map flash is gone from the shipped file.
- **1155** — the money frame. Full scrim, he is lit, the red-bar headline is
  unobstructed, the drifting numeral and the roof horizon both read.
- **1211** — the last composite frame, `env` 0.125: a clean dissolve back to
  the world, no pop.
- **315 / 393** — the two swapped b-roll clips, full frame, captions clean.

## Frames on disk — `wo/hook-frames/`

| file | frame | t | what it proves |
|---|---|---|---|
| `g4-t37.3.png` | 1119 | 37.30s | map cut clean — the composite no longer mounts over it |
| `g4-t37.47.png` | 1124 | 37.47s | mount + scrim entering, speaker seamless over his base self |
| `g4-t38.5.png` | 1155 | 38.50s | full effect: scrim, numerals, roof horizon, headline unobstructed |
| `g4-t40.3.png` | 1209 | 40.30s | exit, `env` 0.375, world returning, headline fading |
| `broll-t10.5.png` | 315 | 10.50s | `br3-oldroof-v2.mp4` compositing under captions |
| `broll-t13.1.png` | 393 | 13.10s | `br4-curl-v2.mp4` compositing under captions |

## OPEN — needs Joseph's eye

1. **The behind-graphics read as FRAGMENTS, by geometry.** He fills this frame;
   the open bands are ~130px at the left, ~100px at the right, and the top
   strip the headline already owns. So the drifting `$50,000,000` shows as
   "$50" upper-left and a stray glyph or two elsewhere, and the roof horizon
   shows either side of his neck. That is the behind-subject look working as
   intended (type passing behind a subject), but it is a taste call — if you
   want the numerals legible as a full string, the shot has no room for it at
   140px and the size would have to come down.
2. **Deviation #1 (mount at 1121)** is a defect fix, not a preference — but it
   moves the scrim's first frame from 37.30 to 37.37. If you want the scrim
   under the map's last 1.5 frames deliberately, that is a different device
   (fading the map out into the scrim) and a different build.
3. **Deviation #2 (roofline raised)** is the one place I changed a pinned
   value on taste-adjacent grounds. Reverting is one constant: `980` → `360`
   in `RoofSilhouette` (it will be invisible again).
4. **Pre-existing, not touched:** on the map cut's tail the bottom captions sit
   above where the map's own bottom gradient has ramped in, so at ~37.3 the
   caption is grey-on-pale for a beat. It is blessed v5 behaviour and outside
   this slice, flagged once here rather than silently patched.

Not committed to git. `src/RealBBRoll.tsx` byte-unchanged, `out/RealBBRoll-v5-raw.mp4`,
`out/v4b-audio-PROOF.mp4`, `wo/audio-assets/` and Downloads untouched.
