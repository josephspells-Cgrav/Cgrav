# OUT_MATTE — behind-subject compositing spike (result)

## VERDICT: GO (full matte ready)

Alpha matte of the speaker from `take2-cfr.mp4`, full 45.8s / 1374 frames,
produced on CPU with RobustVideoMatting (mobilenetv3). First candidate tool
worked — no fallback needed. 10s test segment proved clean (quantified
flicker near-zero, fine hair/chain preserved, inter-finger gaps preserved on
a spot-check outside the segment), one named-and-bounded halo artifact at a
specific lighting condition. Full run: **2.953 it/s, 779.2s (13.0 min) for
1374 frames.** Deliverable: `video-rig\public\take2-alpha.webm` (63.5 MiB),
**verified by decoding it back and compositing it live over a solid
background — not just by trusting the encoder exit code** (see Verification
section — this caught and resolved a real local-tooling gotcha before
shipping).

---

## Tool chosen

**RobustVideoMatting (PeterL1n/RobustVideoMatting), `mobilenetv3` variant**,
loaded via `torch.hub.load(..., pretrained=True)` — first candidate in the
WO's priority order, worked on the first real attempt, no need to fall back
to briaai/RMBG or rembg. Confirmed entrypoints (`hubconf.py`, verified via
WebFetch before writing any code): `mobilenetv3`, `resnet50`, `converter`.
Call signature: `fgr, pha, *rec = model(frame, *rec, downsample_ratio=r)`,
`rec = [None, None, None, None]` for the first frame, carried forward
per-frame for temporal stability.

**Cross-reference (WO_SCOUR, running in parallel tonight):** independently
confirmed VP9-alpha WebM is the right target format for Remotion
(`<OffthreadVideo transparent>` decodes it natively — official, no extra
package) and flagged RVM is **GPL-3.0**, last pushed 2024-04-02 (2yr+ stale,
9.5k★). Read: GPL binds redistributing RVM's *source*, not the video output
it produces — using it as an internal processing tool to generate a video
asset is standard practice (same relationship as compiling with GPL'd gcc).
Not a blocker for this use. Staleness is a real maintenance-signal caveat —
the model is feature-complete for this task and still the reference
implementation, but there won't be upstream fixes if a regression matters
later.

## Environment setup (and one real gotcha)

- Python present on this box already runs faster-whisper in a venv
  (`hermes-agent\venv`, faster-whisper 1.2.1, numpy 2.4.6, opencv-headless
  5.0.0.93). **Left untouched, confirmed by `pip list` diff before/after.**
- New deps installed into a **fresh, separate venv** — never touched the
  faster-whisper env, satisfying the WO's isolation rule.
- **Gotcha #1 (cost ~10 min): Windows MAX_PATH.** First venv attempt lived
  under the long scratchpad path
  (`...\3422154e-...\scratchpad\matte-venv\...`); `pip install torch`
  failed extracting `setuptools`' bundled `pkg_resources` test fixtures —
  a nested path exceeded 260 chars (`OSError: No such file or directory`,
  pip's own hint pointed at Windows long-path support). **Fix used: moved
  the venv to a short root (`C:\mv-venv`) instead of enabling Windows long
  paths** — that's a system-setting change, out of scope for an agent to
  flip. Reproduces cleanly if the venv lives anywhere deeply nested.
- Install command (CPU wheel index — avoids the multi-GB CUDA-bundled
  default on PyPI):
  ```
  C:\Users\josep\AppData\Local\Programs\Python\Python312\python.exe -m venv C:\mv-venv
  C:\mv-venv\Scripts\python.exe -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
  C:\mv-venv\Scripts\python.exe -m pip install opencv-python-headless pillow numpy tqdm
  ```
  Result: `torch 2.13.0+cpu`, `torchvision 0.28.0+cpu` — CPU-only wheels
  (121.9MB), confirmed no CUDA pulled in.

## CPU throughput (the honest numbers)

Machine: Intel i3-1125G4 @ 2.0GHz, 4 physical / 8 logical cores, running
**under real contention** — 3 sibling overnight WOs (SCOUR/VIRAL/BROLL)
active concurrently, ~3.6GB free RAM at the start. Numbers below are what
this box actually delivered tonight, not a clean-machine benchmark.

| Run | Frames | downsample_ratio | avg ms/frame | it/s | Total |
|---|---|---|---|---|---|
| Smoke test | 8 | auto (0.2667) | 327.8 | 3.05 | 4.5s |
| 10s test segment (t=30-40s) | 300 | auto (0.2667) | 412.6 | 2.424 | 196.9s |
| Quality A/B | 101 | 0.5 (forced) | 814.7 | 1.228 | 106.9s |
| **Full 46s matte (1374 frames)** | 1374 | auto (0.2667) | **338.7** | **2.953** | **779.2s (13.0 min)** |
| VP9 alpha encode (RGBA PNGs → webm) | 1374 | n/a | — | ~2.4 fps encode | 580.0s (9.7 min) |
| **Total wall time, video in → alpha webm out** | | | | | **~22.6 min** |

Throughput visibly dips and recovers through the test-segment and full runs,
tracking sibling-WO CPU load, not a problem with the matting itself —
confirmed by the corner-patch flicker metric staying ~0 throughout (see
below). **CPU is not infeasible — it's comfortably fast enough that
"overnight" was never actually needed:** the entire 46s clip, raw video to
finished alpha WebM, took well under 25 minutes end to end.

`downsample_ratio` A/B: tried the auto heuristic (0.2667, target ~512px on
the long side) against a forced 0.5 (~960px) on the same absolute frame.
**No visible improvement** on the one real artifact found (see below), at
~2x the compute cost — kept the auto ratio for the full run.

**VP9 encode note:** ffmpeg's libvpx-vp9 default `-deadline`/`-cpu-used`
settings are extremely slow on this CPU (killed after 144s of CPU time with
zero frames flushed — would've been the actual bottleneck of the night).
Used `-deadline good -cpu-used 5 -row-mt 1` instead: ~2.4-3.3 fps, finished
in 9.7 min. This is the setting worth keeping for any future matte-to-webm
encode on this box.

## Paranoia-skim (honest findings, not "looks great")

Quantitative flicker check (`flicker_check.py`) across all 300 test-segment
frames:
- Overall alpha frame-to-frame diff: mean **2.712/255** (~1.1%), max
  6.107/255, **zero outlier frames** (>4x median jump) — no mask-flicker
  failure mode.
- Corner-patch (pure-background) diff: mean **0.0022/255**, max 0.012/255 —
  background stays rock-solid; the model isn't hallucinating noise into
  empty sky.
- Silhouette size: 62.7% of frame on average, frame-to-frame delta mean
  0.254% of frame (natural head movement, not jitter).

Visual spot-checks (crops at 1.6-2.5x, both from the segment and a targeted
check outside it):
- **Fine hair / gold chain**: preserved with correct semi-transparency, not
  a hard cutout — a dangling dreadlock crossing a bold test-graphic disc
  reads as real hair, softly.
- **Inter-finger gaps** (frame 60, t≈2s — a hand gesture that happens
  *outside* the 30-40s test segment, spot-checked once the full run reached
  it): cleanly preserved, no eaten webbing between fingers. This was the
  WO's named worst-case risk category and it holds up.
- **One real, named artifact**: a soft light halo (~15-25px) at the cap-top
  edge, specifically where the ORIGINAL footage has blown/overexposed sky
  directly behind the light-colored cap brim. Root-caused via the
  downsample A/B above — it's not an encoder-resolution issue (0.5 ratio
  didn't fix it), more likely the true highlight bleed in the source
  footage plus mobilenetv3's decontamination ceiling at a highlight-vs-
  highlight edge. **Localized to that one lighting condition**, not a
  general edge-quality problem — every other edge in every crop (jaw,
  shoulder, chain, fingers) is clean against a dark test background.
  Mitigation path if it matters for a specific shot: resnet50 variant
  (heavier/slower, better decontamination), a 1-2px alpha erode + feather
  post-process, or just don't stack a razor-dark graphic edge directly
  behind a blown-highlight cap crown.

**No hands were eaten, no hair was eaten, no general flicker. The one real
defect is bounded, named, and doesn't block a GO.**

## Verification — a real gotcha caught before shipping

This is the part of the paranoia-skim that actually mattered most tonight.

After encoding, `ffprobe` reported the output stream as plain `yuv420p`
(no "a"), and a naive `ffmpeg -i take2-alpha.webm -pix_fmt rgba frame.png`
extraction, plus `alphaextract`, both came back with **alpha = 255
everywhere (fully opaque)** — which would mean a KILL, since a
fully-opaque "alpha matte" is useless for behind-subject compositing.

Chased it down instead of trusting the first bad read:
1. `ffmpeg -i take2-alpha.webm -f null -` shows `alpha_mode: 1` in the
   container metadata — the muxer DID flag real alpha data as present.
2. Isolated a minimal 2-frame repro. **Encode-time log confirms correct
   alpha the whole way through**: input PNG read as `alpha:straight`,
   internally converted to `yuva420p`, output stream reported as
   `yuva420p(tv, progressive)` at encode time.
3. On decode, the filter graph showed `pixfmt:yuv420p ... alpha:unspecified`
   — **ffmpeg's default/native `vp9` decoder silently drops the WebM alpha
   BlockAdditional plane.** Forcing the alternate decoder —
   `ffmpeg -c:v libvpx-vp9 -i take2-alpha.webm ...` — reads it back
   correctly: alpha min/max/mean **0 / 255 / 157.05**, matching the source
   PNG's own alpha stats (0 / 255 / 157.04) almost exactly.
4. Re-verified the **actual full deliverable** (not just the mini repro) at
   5 timestamps across the whole 46s (t=1/15/30/40/45s) with the correct
   decoder forced — real, varying alpha at every point.
5. Built a genuine overlay composite straight from the shipped webm file
   (`ffmpeg -c:v libvpx-vp9 -i take2-alpha.webm ... overlay ...`) — first
   attempt showed background-only again (a *second*, unrelated bug: a PTS
   timestamp mismatch between the seeked video input and the color-source
   background starved the overlay filter of synced frames). Fixed with
   `setpts=PTS-STARTPTS` on both inputs. Result: a clean, correct
   behind-subject composite decoded from the real shipped file, confirming
   the deliverable itself — not just the intermediate PNG sequence — is
   good.

**Net: the file was correct the entire time; two separate local-ffmpeg
verification bugs (wrong decoder, then a filter-graph PTS mismatch) made it
LOOK broken.** Worth stating plainly because "the export exists and
ffprobe doesn't error" would have been a false GO, and a naive first
alpha-check would have been a false KILL — both wrong. Documented here so
nobody re-loses this hour:

```
# Reading this webm's alpha back with LOCAL ffmpeg tools requires forcing
# the libvpx-vp9 decoder — the default "vp9" (native) decoder drops alpha:
ffmpeg -c:v libvpx-vp9 -i take2-alpha.webm -pix_fmt rgba frame.png
```

**What this does *not* cover:** an actual Remotion/Chromium render. Chrome's
VP9 decoder (same lineage as libvpx, the mature reference implementation
used across the web for exactly this "transparent video" pattern) should
handle this fine — this is standard practice, not a fringe format — but
that's a reasoned inference, not something rendered and eyeballed tonight.
Flag as the one open item before this ships into an actual composition.

## Proof frames (behind-subject composite, required deliverable)

Background: synthetic bold test graphic (giant clock + floating icon discs,
1080x1920) matching the reference device (`km-ref-schoolofmentors-teardown`
§visual-system 4: "giant clock for 24/7 ... floating player icons").
Composite math: `out = fgr*alpha + bg*(1-alpha)` using RVM's own
color-decontaminated `fgr`, not the raw source pixels (RVM's documented
recommended usage).

- `wo\matte-proof-1.jpg` — frame 40 of the test segment (t≈31.3s)
- `wo\matte-proof-2.jpg` — frame 160 (t≈35.3s) — the cap-halo crop is from
  this frame
- `wo\matte-proof-3.jpg` — frame 280 (t≈39.3s)

All three: clock ring and icon discs correctly pass BEHIND the head/cap/
shoulders, original footage look preserved in front. (Generated from the
intermediate RGBA PNG sequence; the Verification section above additionally
confirms the same behind-subject compositing works from the actual shipped
`take2-alpha.webm` file, decoded fresh.)

## Reproduction — exact commands

Scripts persisted at `video-rig\matte_test.py`, `video-rig\composite_proof.py`,
`video-rig\flicker_check.py` (root, matching this project's existing
`build_captions.py` convention — not committed, per the WO's no-git rule).

```
# 1. one-time venv (short path — see MAX_PATH gotcha above)
C:\Users\josep\AppData\Local\Programs\Python\Python312\python.exe -m venv C:\mv-venv
C:\mv-venv\Scripts\python.exe -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
C:\mv-venv\Scripts\python.exe -m pip install opencv-python-headless pillow numpy tqdm

# 2. full matte -> RGBA PNG sequence (auto downsample_ratio, ~0.2667 for this 1080x1920 source)
C:\mv-venv\Scripts\python.exe video-rig\matte_test.py ^
  --input "C:\Users\josep\Claude Gravity\video-rig\public\take2-cfr.mp4" ^
  --start 0 ^
  --outdir <some-scratch-dir>

# 3. encode RGBA sequence -> VP9 alpha WebM (video-only, no audio track --
#    the original take2-cfr.mp4 stays the audio source in the Remotion comp)
#    -deadline good -cpu-used 5 -row-mt 1: the DEFAULT libvpx-vp9 settings
#    are ~20x too slow on this CPU -- do not omit these flags.
ffmpeg -y -framerate 30 -i <scratch-dir>\rgba\frame_%05d.png ^
  -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0 -crf 32 -b:v 0 ^
  -deadline good -cpu-used 5 -row-mt 1 -threads 4 -an ^
  "C:\Users\josep\Claude Gravity\video-rig\public\take2-alpha.webm"

# 4. verify alpha actually round-trips (default decoder will falsely show opaque!)
ffmpeg -c:v libvpx-vp9 -i "C:\Users\josep\Claude Gravity\video-rig\public\take2-alpha.webm" -pix_fmt rgba frame.png

# optional: 3-frame proof composite against any bg graphic
C:\mv-venv\Scripts\python.exe video-rig\composite_proof.py --rgba-dir <scratch-dir>\rgba --bg <bg.png> --frames "40,160,280" --outdir <out> --prefix matte-proof

# optional: quantitative flicker check
C:\mv-venv\Scripts\python.exe video-rig\flicker_check.py --rgba-dir <scratch-dir>\rgba
```

## Remotion usage (matches this rig's existing conventions — see `RealBBRoll.tsx`)

`<OffthreadVideo transparent>` is Remotion's official built-in prop for
VP9-alpha WebM / ProRes 4444 (confirmed via docs + independently by
WO_SCOUR) — **no new package needed**. Gotcha both of us hit independently:
`transparent` forces PNG frame extraction instead of BMP during Remotion's
own render (~40% slower render pass) — budget for that on the final render,
separate from the matting time above.

```tsx
<AbsoluteFill style={{background: '#000'}}>
  {/* graphic layer — BEHIND the speaker */}
  <AbsoluteFill>
    <BehindSubjectGraphic t={t} frame={frame} fps={fps} />
  </AbsoluteFill>

  {/* matted speaker — alpha webm, original look preserved, no bg */}
  <OffthreadVideo
    transparent
    src={staticFile('take2-alpha.webm')}
    style={{width: '100%', height: '100%', objectFit: 'cover'}}
  />

  {/* original take2-cfr.mp4 is no longer in this stack -- the alpha webm
      carries the visible speaker; pull AUDIO from the original take
      separately if this composition needs sound and doesn't already have
      an audio-carrying layer elsewhere (see RealBBRoll.tsx's face layer
      comment: "audio lives here and never stops under a cut") */}
</AbsoluteFill>
```

## Cleanup / what's left on disk

- `C:\mv-venv` — the matting venv (torch/torchvision/opencv/pillow/numpy).
  Not part of the repo, not committed. Safe to delete or keep for reuse on
  the next matte job (full render, resnet50 variant, etc.) — ~1.2GB.
- Scratchpad (`...\scratchpad\matte-*`) — intermediate RGBA PNG sequences
  from the smoke test, 10s segment, full run, and quality A/B (~2.3GB
  total). Not needed once `take2-alpha.webm` is confirmed good in an actual
  Remotion render; safe to delete.
- Nothing committed to git. `video-rig\public\take2-alpha.webm` and the 3
  new root-level `.py` scripts are on disk, untracked.

## What I'd do next if this becomes a real pipeline (not tonight's scope)

1. **Render one real Remotion frame** through `<OffthreadVideo transparent>`
   and eyeball it — closes the one open item from Verification above.
2. Try `resnet50` variant on a shot with more hard edges (blown highlights,
   fast motion) — heavier but better decontamination, still CPU-feasible at
   these throughput numbers.
3. Cheap alpha post-process (1-2px erode + slight feather) as a general
   halo-tightener before compositing, independent of model choice.
4. If this becomes a recurring step, wrap `matte_test.py` + the ffmpeg
   encode (with the correct `-deadline good -cpu-used 5` flags) into one
   script so it's a single command per take.
