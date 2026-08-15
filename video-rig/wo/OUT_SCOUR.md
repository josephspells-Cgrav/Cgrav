# OUT_SCOUR — motion-graphics ecosystem scour (2026-08-15)

**Role:** researcher, no installs performed. Every version/license below is a live
`npm view` / PyPI-JSON / GitHub-API read done tonight, not memory. Rig context:
`remotion`/`@remotion/cli` **locked at 4.0.509** in `package-lock.json`; npm's
actual latest is **4.0.512** (published 2026-08-14, same-day as this scour —
Remotion ships near-daily).

## READ FIRST — 2 flags that govern the whole shortlist

1. **License threshold, not previously flagged anywhere in this project.**
   `remotion` core license = `SEE LICENSE IN LICENSE.md` →
   [github.com/remotion-dev/remotion/blob/main/LICENSE.md](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md):
   free for **individuals and for-profit orgs with ≤3 employees**; above that,
   a paid Company License is required. This is **already true of the rig
   today** (core `remotion` + `@remotion/cli`) — not a new risk any
   recommendation below introduces. It also covers `@remotion/google-fonts`,
   `@remotion/lottie`, `@remotion/player`, `@remotion/gif`, `@remotion/rive`,
   `@remotion/webcodecs`, `@remotion/media-parser`, `@remotion/transitions`
   (same umbrella license). Packages marked **MIT** below carry zero
   incremental exposure regardless of headcount. Action: confirm the legal
   entity is ≤3 employees; if it ever isn't, budget a Company License before
   scaling render volume.
2. **Version lockstep.** Remotion enforces exact-version-match across all
   `@remotion/*` packages at runtime (fails loud, not silent) — see
   [remotion.dev/docs/version-mismatch](https://www.remotion.dev/docs/version-mismatch).
   Installing any new `@remotion/*` at latest (4.0.512) next to a core pinned
   at 4.0.509 **will break**. Fix: run `npx remotion upgrade` (bumps
   everything in lockstep) in the same sitting as any install below, or pin
   every new package to `4.0.509` to match what's locked now.

## TOP 8 — install tonight

| # | Pick | Cap | Install | License | Maintained | Gotcha |
|---|------|-----|---------|---------|------------|--------|
| 1 | `@remotion/captions` | A/G | `npm i @remotion/captions@4.0.509` | MIT | official, 2026-08-14 | `createTikTokStyleCaptions(Caption[], combineTokensWithinMilliseconds)` groups word timestamps into pages — maps faster-whisper's `{w,s,e}` to `{text:' '+w, startMs:s*1000, endMs:e*1000}` in one transform. Directly implements the teardown's "1-3 words/page" caption law natively in React instead of pre-baked ASS. |
| 2 | `@remotion/paths` + `@remotion/shapes` | A/H | `npm i @remotion/paths@4.0.509 @remotion/shapes@4.0.509` | MIT | official, 2026-08-14 | `evolvePath(progress)` returns `{strokeDasharray, strokeDashoffset}` — a one-call progressive line-draw. This IS the 2A red-highlighter-sweep primitive, native, no hand-rolled SVG math. `shapes` gives Circle/Star/Pie/Triangle generators for pop accents. |
| 3 | `split-type` | A | `npm i split-type@0.3.4` | ISC | small/stable; last publish 2023-10-22 (finished utility, not a red flag) | Deterministic word/char/line DOM splitting for the "variable-size editorial stacks" device. Prefer this over GSAP SplitText inside Remotion — see GSAP gotcha in tier 2. |
| 4 | `@remotion/transitions` + `@remotion/motion-blur` | B | `npm i @remotion/transitions@4.0.509 @remotion/motion-blur@4.0.509` | transitions: Remotion License (see flag 1) · motion-blur: MIT | official, 2026-08-14 | `transitions` ships `fade/slide/wipe/flip/clockWipe/iris` presentations — **no whip-blur preset out of the box.** Build whip-blur by wrapping a fast `interpolate()`-driven zoom/pan in `<CameraMotionBlur>` (frame-camera-realistic blur) or `<Trail>` (per-element ghost trail); this is the intended composition per Remotion's own docs split. |
| 5 | `@remotion/google-fonts` | D | `npm i @remotion/google-fonts@4.0.509` | Remotion License (flag 1) | official, 2026-08-14 | Confirmed importable: `@remotion/google-fonts/Anton`, `/BebasNeue`, `/ArchivoBlack` for impact caps; `/Inter`, `/Montserrat` for captions. Per-family submodule import (`loadFont()`), tree-shakes unused weights. All underlying fonts are OFL — zero license risk independent of the wrapper. |
| 6 | `@remotion/lottie` + `lottie-web` | E | `npm i @remotion/lottie@4.0.509 lottie-web@5.13.0` | lottie: Remotion License (flag 1) · lottie-web: MIT | official, 2026-08-14 / 2025-05-21 | Peer dep is `lottie-web@^5` — 5.13.0 satisfies it, verified. Source free commercial-safe files from LottieFiles' **free tier only** (Lottie Simple License: commercial use OK, no attribution required, cannot resell/redistribute the raw file standalone) — do not pull "Pro" marked files. |
| 7 | `scenedetect` (PySceneDetect) | G | `pip install scenedetect==0.7.1` | PyPI metadata blank; **repo license = BSD-3-Clause** (verified via GitHub API) | very active — pushed 2026-08-10 (5 days ago), 5.1k★ | As of 0.7, opencv-python ships bundled — the old `[opencv]` extras syntax is gone, don't use it. On a headless/server box, `pip install scenedetect-headless` instead (same module, `opencv-python-headless` dep, no GUI libs). Automates shot-boundary detection for future reference-ad teardowns (the kind of 61-scene-event extraction done by hand for the school-of-mentors ad). Not used tonight, but cheap to have ready. |
| 8 | `whisperx` | G | `pip install whisperx==3.8.6` | BSD-2-Clause (Whisper: MIT, pyannote code: MIT) | active — pushed 2026-07-13, 23.6k★ | **Test on one existing take before swapping the pipeline — see G below, this is not a clean win.** Mabrey ads are single-speaker: run alignment-only (skip `--diarize`) to avoid the gated pyannote model entirely. |

## Capability notes not fully covered above

**C — behind-subject compositing (Remotion side; the matte model itself is
WO_MATTE's call, not scoured here).** No new package needed. `<OffthreadVideo
transparent>` is an official, built-in prop that decodes **VP9-with-alpha
WebM and ProRes 4444** natively —
[remotion.dev/docs/videos/transparency](https://www.remotion.dev/docs/videos/transparency).
That's exactly WO_MATTE's planned output format (VP9+alpha WebM). Layering
order for the reference device (graphic behind speaker): background graphic
`<AbsoluteFill>` → `<OffthreadVideo transparent src={matte}>` on top.
Gotcha: `transparent` forces PNG frame extraction instead of BMP — **~40%
slower render**, and VP8-with-alpha is much slower still than VP9 or ProRes —
confirms WO_MATTE's VP9 choice was already the right one. FYI cross-note,
not a verdict: `robust-video-matting` (PeterL1n/RVM), the tool WO_MATTE is
testing, is GPL-3.0-licensed and hasn't pushed since 2024-04-02 (9.5k★,
2+ years stale) — GPL governs redistributing RVM's *source*, not the
video asset it outputs, so it's unlikely to bite for an internal render
tool, but WO_MATTE should make its GO/KILL call with that on the table.

**A — image-filled glyphs / `background-clip: text`.** High-confidence
**no library needed**: Remotion always renders through its own bundled
Chromium, and unprefixed `background-clip: text` has shipped in Chromium
since v120 (Nov 2023) — any current Remotion build is far newer. I can't
literally render a proof frame (research-only role, no source edits) — hand
a 10-second smoke test to Wave 2/3 before relying on it at scale.

**F — audio.** SFX, all commercial-safe, verified:
- **kenney.nl** (Audio / UI Audio / Digital Audio packs) — **CC0**, confirmed public-domain, attribution "nice but not mandatory." Best default source.
- **freesound.org** — mixed licenses per-upload; filter the search results column to **"Creative Commons 0"** (or API `filter=license:"Creative Commons 0"`) before using anything from there — do not use un-filtered results commercially.
- **pixabay** (audio + music) — Pixabay Content License: free commercial use, no attribution, but cannot resell/redistribute the audio file standalone.
Music-bed: same Pixabay Music library covers a bed; for anything beyond that, this scour didn't find a CC0-grade music source better than Pixabay/Kenney — treat as sufficient for tonight.
**ffmpeg mastering chain** (ffmpeg 8.1 full build already on PATH, confirmed — no npm wrapper needed):
```bash
# Pass 1 — measure
ffmpeg -i in.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null -
# read measured_I / measured_TP / measured_LRA / measured_thresh from the printed JSON

# Pass 2 — apply linear gain using the measured values
ffmpeg -i in.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=<I>:measured_TP=<TP>:measured_LRA=<LRA>:measured_thresh=<thresh>:linear=true:print_format=summary -ar 48000 out.wav
```
`linear=true` in pass 2 is what makes this a precise static-gain match instead
of dynamic compression — matches the reference ad's measured "dead flat
−14/−15 LUFS for 218 straight seconds" (no dynamic pumping).

**H — wildcards.**
- **`remotion-dev/skills`** — official Remotion-team Claude Code / Codex /
  Cursor skill pack (`npx skills add remotion-dev/skills`), 12 skills incl.
  captions, rendering, markup best-practice. Not an npm runtime dependency —
  a dev-tooling install for whoever runs the build wave. Genuinely the
  highest-leverage/lowest-risk find in this scour; flagging, not installing
  (out of my research-only remit).
- **Easing — do not add a library.** `remotion` core already exports
  `Easing` (linear/quad/cubic/poly/sin/circle/exp/elastic/back/bounce/bezier)
  — see [remotion.dev/docs/easing](https://www.remotion.dev/docs/easing).
  `d3-ease`/`eases`/`bezier-easing`/`popmotion` would be redundant weight.
- **motion-canvas** — steal the *pattern*, don't install the package (WO's
  own framing, and correctly so: `@motion-canvas/core`/`2d` are a competing
  standalone engine with their own player/exporter — installing it into a
  Remotion project doesn't integrate with anything). The one idea worth
  porting: its **signal** model (a reactive value that auto-propagates to
  everything reading it, vs. manually threading `interpolate(frame, …)`
  everywhere) — worth a thin hand-rolled hook if per-word state wiring gets
  unwieldy in the HookSpectacle build.
- **`@remotion/noise`** (MIT, official) — Perlin/simplex noise generator;
  fits WO_BROLL's "micro-handheld sway" degrade pass better than hand-rolled
  sin/cos drift if that clip needs a second pass.

## Tier 2 — later, not tonight

- **`gsap@3.15.0`** (A) — confirmed **free for commercial use as of the
  Webflow acquisition**, incl. former Club GreenSock plugins (SplitText,
  MorphSVG) — [gsap.com/standard-license](https://gsap.com/standard-license/).
  Real gotcha: GSAP's timeline is realtime-ticking; Remotion renders by
  seeking to arbitrary frames statelessly. Naively `.play()`-ing a GSAP
  timeline inside a Remotion component will desync on frame-seek/parallel
  render workers. Only reach for this if you specifically want MorphSVG or
  GSAP's easing-curve bank — `split-type` + `@remotion/paths` + core
  `Easing` already cover this rig's needs without the determinism risk.
- **`remotion-animated@2.2.0`** (A) — MIT, declarative fade/slide/scale
  wrapper, 221★, but repo hasn't pushed since 2025-02-22 (~18mo). Small
  finished utility, fine to grab, not urgent.
- **`@remotion/rive`** (E-adjacent) — real capability, but Rive assets need
  authoring in the separate Rive editor (`.riv` format) — a bigger pivot
  than Lottie's ready-made free-file catalog. Revisit only if Lottie proves
  too limited.
- **`@remotion/three`, `@remotion/skia`** (H) — both MIT, official, real —
  no device in the reference teardown needs 3D or low-level canvas drawing.
  Skip until a concrete use appears.
- **`@remotion/webcodecs`, `@remotion/media-parser`** (C) — Remotion
  License. Lower-level than needed; `<OffthreadVideo transparent>` already
  solves tonight's compositing ask. Reach for these only if a custom
  frame-accurate decode pipeline becomes necessary.

## Killed — with receipts

- **`popmotion@11.0.5`** — MIT, but last published 2022-08-15; the project
  was folded into Framer's "motion" package years ago and isn't the current
  path even in its own ecosystem. Redundant with core `Easing` regardless.
- **`d3-ease`, `eases`, `bezier-easing`** — all fine licenses (BSD-3/MIT/MIT)
  but 100% redundant: `remotion` core ships the same curve set for free,
  zero extra dependency.
- **`@theatre/studio@0.7.2`** — **AGPL-3.0-only** (network-copyleft; the
  paired `@theatre/core` is Apache-2.0 and clean, but the visual editor half
  that makes Theatre.js worth adopting is AGPL). Also a full competing
  animation-state architecture for marginal gain over native
  `interpolate`/`spring` on a project this size. Kill for tonight.
- **`chroma-key`** (npm) — does not exist, confirmed 404 on the registry.
  No off-the-shelf JS chroma-key package; not needed anyway since the
  compositing plan is pre-matted alpha video, not live keying.
- **`@ffmpeg-installer/ffmpeg`, `ffmpeg-static`** — unnecessary: system
  ffmpeg 8.1 (full build, libx264/libvpx/libopus/loudnorm all present) is
  already on PATH. Adding either bundles a second, older ffmpeg binary for
  no reason.

## Wrong premises found (disagreement with receipts)

1. **"Remotion 4.0.509 rig"** (WO header) — accurate for what's locked, but
   npm's real latest is **4.0.512**, published the same day as this scour.
   Minor, but the version-lockstep flag above makes it load-bearing the
   moment any new `@remotion/*` package is added.
2. **Capability C implicitly assumes a package gap.** There isn't one on the
   Remotion side — `<OffthreadVideo transparent>` already does exactly what
   was being scouted for, official and built-in. The real unresolved
   question lives entirely in WO_MATTE's Python-side matting choice, not in
   the npm ecosystem.
3. **WhisperX as "the" alignment upgrade** — real but softer than the WO's
   framing implies. WhisperX's own forced-alignment step (wav2vec2 CTC) has
   an open, unresolved GitHub issue (m-bain/whisperX#1247) and an academic
   comparison showing it trails Montreal Forced Aligner in word-boundary
   precision. It likely still beats faster-whisper's native cross-attention
   word timestamps, but "enough to matter" for 2A-style tight caption sync
   should be eyeballed on one real take before touching the pipeline, not
   assumed.
4. **License terms were never a stated concern anywhere in this project's
   docs, but govern half this shortlist** — see flag 1. Worth a one-time
   headcount confirmation, not urgent tonight, but shouldn't stay unstated.
