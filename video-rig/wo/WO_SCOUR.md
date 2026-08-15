# WO_SCOUR — GitHub / ecosystem scour for the motion-graphics arsenal

**Role:** researcher. NO installs, NO edits to `video-rig/` source. Output is a
ranked, installable shortlist with receipts.
**Output file (absolute):** `C:\Users\josep\Claude Gravity\video-rig\wo\OUT_SCOUR.md`
**Context:** Remotion 4.0.509 rig at `C:\Users\josep\Claude Gravity\video-rig\`
renders 1080×1920 30fps contractor ads (React components, `interpolate`/
`spring`, word-timestamped captions from faster-whisper). We are upgrading it
to legendary motion-graphics capability. The reference teardown that drives
requirements: `C:\Users\josep\Claude Gravity\vault\wiki\km-ref-schoolofmentors-teardown-2026-08-15.md` — READ IT FIRST.

## Capabilities to source (map every finding to one of these)
A. **Type-as-spectacle** — kinetic typography: full-frame word builds, image-
   filled glyphs (note: CSS `background-clip: text` may need no library —
   verify it renders in Remotion's headless Chrome), variable-size editorial
   stacks, per-word entrance systems.
B. **Transitions** — whip-blur, punch-in, speed-ramp. Check `@remotion/transitions`
   + `@remotion/motion-blur` (official) first; then community.
C. **Behind-subject compositing support** — anything that helps composite
   graphics behind a matted human layer (the matte itself is another WO).
D. **Fonts** — `@remotion/google-fonts` and which faces best match the
   reference: heavy condensed grotesque (Anton / Archivo Black / Bebas class)
   for impact caps + a clean heavy sans for captions (Inter/Montserrat class).
E. **Lottie** — `@remotion/lottie` + free LottieFiles-class sources for SFX-
   grade micro-animations (arrows, pops, sparkles) usable commercially.
F. **Audio tooling** — SFX sources that are genuinely license-safe for client
   ads (CC0/public domain: freesound CC0 filter, kenney.nl, pixabay audio —
   VERIFY license terms per source), music-bed options, and the exact ffmpeg
   mastering chain to hit −14 LUFS integrated (loudnorm two-pass — give the
   exact commands).
G. **Alignment/analysis** — whisperX (forced alignment: does it beat
   faster-whisper word timestamps enough to matter?), PySceneDetect for
   teardown automation.
H. **Wildcards** — anything genuinely excellent for React-code video
   (motion-canvas patterns worth stealing WITHOUT switching engines, theatre.js,
   easing libraries, remotion caption/template repos with word-caption systems).

## Rules
- Every recommendation carries: what it buys mapped to A–H · exact install
  command · license · maintenance signal (last release, stars as a weak
  signal) · risk/gotcha.
- Verify a package EXISTS and its version via `npm view <pkg> version` (Bash)
  — do not recommend from memory.
- Rank: TOP 8 "install tonight" + a second tier "later". Kill anything
  abandoned or license-risky for commercial client ads.
- Premises above may be wrong — if a target is deprecated/renamed/superseded,
  SAY SO with a receipt and recommend the real thing. Disagreement with
  receipts is wanted.
- Web research allowed (WebSearch/WebFetch). Keep the OUT file under ~200
  lines — dense, decision-ready.
