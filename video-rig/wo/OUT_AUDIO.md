# OUT_AUDIO — SFX + bed + −14 LUFS master (executed against v4b, proof chain for v6)

**Executed by:** Audio agent, overnight run 2026-08-15.
**Gated on:** WO_AUDIO.md (pinned design) + OUT_SCOUR.md §F (license-safe sources +
loudnorm chain). Followed §F's exact loudnorm numbers (I=-14:TP=-1.5:LRA=11) over
WO_AUDIO's inline mention of TP=-1.0/LRA≤7, per WO_AUDIO's own instruction to defer
to SCOUR and log the substitution — logged here.

**Target video:** `out/RealBBv6-raw.mp4` did not exist at any point during this run
(checked repeatedly, last checked 02:05am). Proved the full chain on
`out/RealBBRoll-v4b-raw.mp4` (46.058667s, matches the "46s DR ad" spec) per the WO's
fallback instruction, with all hook-treatment-window hits (T2, T3) placed at their
specced times anyway so the mix is ready to re-mux onto v6 unchanged.

**Deliverable:** `out/v4b-audio-PROOF.mp4` (h264 video copied byte-for-byte from
v4b-raw, frame count verified identical 1380=1380; AAC audio muxed from the final
master). Mastered audio master file also kept standalone at
`wo/audio-assets/work/mixdown-mastered-final.wav` — this is the file the v6 re-mux
(below) reuses directly, no need to re-run the mix.

---

## 1. Assets — sources, licenses, why each was picked

### SFX — Kenney.nl CC0 packs (blessed default, per OUT_SCOUR §F)

Downloaded all 4 candidate packs named in the WO to survey the full field:

| Pack | Zip URL | License | Used? |
|---|---|---|---|
| Digital Audio | `https://kenney.nl/media/pages/assets/digital-audio/216eac4753-1677590265/kenney_digital-audio.zip` | CC0 ("Download this package (60 assets) for free, CC0 licensed!" — kenney.nl/assets/digital-audio) | No — all sci-fi laser/zap/powerup tones, wrong register for a roofing DR ad |
| UI Audio | `https://kenney.nl/media/pages/assets/ui-audio/490d233f68-1677590494/kenney_ui-audio.zip` | CC0 (50 assets, same page-text confirmation, kenney.nl/assets/ui-audio) | No — clicks/switches, interface-sounds pack had cleaner-fitting equivalents |
| **Impact Sounds** | `https://kenney.nl/media/pages/assets/impact-sounds/87b4ddecda-1677589768/kenney_impact-sounds.zip` | CC0 (130 assets, kenney.nl/assets/impact-sounds) | **Yes** — thud, impact |
| **Interface Sounds** | `https://kenney.nl/media/pages/assets/interface-sounds/fa43c1dd4d-1677589452/kenney_interface-sounds.zip` | CC0 (100 assets, kenney.nl/assets/interface-sounds) | **Yes** — tick, pop, shimmer |

Zips landed in `wo/audio-assets/*.zip`, extracted to `wo/audio-assets/extracted/`.
CC0 = public domain, attribution optional — confirmed on each pack's own listing
page, matches OUT_SCOUR §F's finding exactly.

**Assets picked (all peak-normalized to a common -1.0dB reference, see §2):**

| Role | Source file | Notes |
|---|---|---|
| thud | `impact-sounds/Audio/impactSoft_heavy_000.ogg` | soft/muffled heavy impact, reads as a low thud |
| tick | `interface-sounds/Audio/tick_001.ogg` | literally named "tick"; true decoded length 45ms (container duration tag says 23ms — a Vorbis short-file metadata quirk, decoded content is the real 45ms, see §3 gotcha log) |
| pop | `interface-sounds/Audio/drop_002.ogg` | short UI "drop" blip, reads as a soft pop |
| impact (light, for graphic lands) | `impact-sounds/Audio/impactGeneric_light_000.ogg` | distinct from thud so T2/end-card don't sound identical to the graphic lands |
| shimmer | `interface-sounds/Audio/glass_001.ogg` | bright/tinkling, used as the map-pin "faint ripple shimmer" |

**Whoosh + riser — synthesized, not sourced from any pack.** None of the 4 Kenney
packs contained a genuine broadband whoosh/air-sweep sample (closest were
"maximize/minimize" UI chirps, which read as game-UI blips, not cinematic
whooshes — wrong texture for a "soft whoosh-in"). WO_AUDIO explicitly pre-approves
synthesizing the riser with ffmpeg/sox from a filtered noise sweep ("synthesized-by-us
is automatically license-clean"); applied the identical technique to the whoosh since
it's the same underlying method and the packs offered nothing better. Built with
ffmpeg `anoisesrc` (pink noise) + `asendcmd` driving a runtime-swept `bandpass`
filter (verified the sweep is real via `aspectralstats` centroid tracking, not just a
static filtered burst — centroid rises ~1450Hz→5000Hz across the whoosh) + envelope
fades. Whoosh: 0.30s, sweep ~320→3200Hz. Riser: 0.60s, sweep ~260→3000Hz with a
rising amplitude envelope (RMS climbs -14.1dB→-12.7dB across its length — a real
swell, not a flat burst). 100% original, zero license exposure. No sox available on
this machine (checked) — ffmpeg alone was sufficient.

### Bed — Pixabay Music

**Track:** "Good Night - Lofi Cozy Chill Music" by FASSounds (Pixabay track ID
160166), 147s source, minimal/warm lo-fi instrumental beat — matches the WO's brief.
Confirmed by spectrogram inspection (`showspectrumpic`, viewed directly): rhythmic
low-mid drum/bass energy, no vocal-formant structure — safe as an instrumental bed.

- Page: `https://pixabay.com/music/beats-good-night-lofi-cozy-chill-music-160166/`
- Direct file (worked with **no account, no API key, no login** — a plain
  browser-UA `curl` GET, 200 OK): `https://cdn.pixabay.com/download/audio/2023/07/30/audio_e0908e8569.mp3?filename=fassounds-good-night-lofi-cozy-chill-music-160166.mp3`
  — pulled from the track page's own server-rendered schema.org `AudioObject.contentUrl`
  (crawlable structured data, not a login-gated endpoint). `pixabay.com` itself 403's
  a bare `curl` with no `User-Agent` header — adding a normal browser UA string was
  enough to get a real 200; no auth of any kind was needed at any step.
- **License:** Pixabay Content License (`pixabay.com/service/license-summary/`) —
  free commercial use, no attribution required, cannot redistribute the audio file
  standalone (we're not — it's mixed into a video production, per OUT_SCOUR §F's own
  note on this license).
- Used the first 46.06s of the 147s source directly (no loop needed — source is
  long enough to cover the whole ad from a clean start). 0.3s fade-in, 0.5s fade-out
  at the tail.

**Bed floor rule:** direct download worked, so the bed shipped. Had it failed, the
WO's floor rule was to skip rather than risk a wrong-license bed.

---

## 2. Gain staging — decisions and a real bug found along the way

**Reference:** voice (dry, from v4b) peak = **-0.85 dBTP**, RMS -17.8dB average
(overall astats on the extracted voice track).

**Step 1 — per-source normalization.** All 7 SFX files normalized to a common
-1.0dB peak reference before mix-time gain is applied, so every per-instance
`volume=` value in the filter graph means the same thing regardless of source.

Hit a real bug here: two sources (`tick_001.ogg`, `glass_001.ogg`) are **mono**.
Naively converting mono→stereo with `-ac 2` applies ffmpeg's default equal-power
upmix, which is NOT a simple duplication — it cost ~3dB of unexpected attenuation,
and combined with 44.1kHz→48kHz resample overshoot on very short transients, the
naive single-pass "measure then gain" approach landed 1.7-3dB off target. Fixed by
converting to final format FIRST (resample + channel layout), THEN measuring peak
on the converted file, THEN computing gain — a clean 2-step process. Worth carrying
forward: **always measure peak on the post-conversion file, never the raw source**,
when mono sources are in the mix.

**Step 2 — per-instance mix gain, and a second real bug.** Initial gain staging
(each SFX individually 12-14dB under the voice reference) looked correct in
isolation, but the mix deliberately **layers two SFX at the same instant** at several
moments (whoosh+impact at each graphic land, thud+whoosh at T2, riser+thud at the
end card, pop+shimmer at the pin drop, 80ms apart). Two decorrelated signals landing
at the same sample can sum a few dB louder than either alone — this ate 3-6dB of
the intended headroom. Caught it by building a **dedicated isolation render**: the
identical filter graph with the voice branch excluded from the final sum, pushed
through the exact same limiter + forced-gain loudnorm as the real master, so the
"worst combined SFX peak" could be measured directly instead of trusted from
per-file arithmetic. Took 4 gain rounds to converge; final numbers below.

**Final per-instance gains** (dB, relative to each source's -1dB-peak reference file):

| Moment | Time | SFX | Gain |
|---|---|---|---|
| T2 "OVERPAY" land | 0.90s | whoosh | -25dB |
| T2 "OVERPAY" land | 0.90s | thud | -24dB |
| T3 word-build 1 ("THE CHEAPEST") | 2.56s | tick | -20dB |
| T3 word-build 2 ("OPTION") | 3.04s | tick | -20dB |
| T3 word-build 3 ("YOU CAN FIND") | 3.52s | tick | -20dB |
| b-roll curl | 12.16s | tick | -24dB (barely-there) |
| b-roll stain | 14.02s | tick | -24dB (barely-there) |
| b-roll bill-graphic | 15.55s | tick | -24dB (barely-there) |
| G1 graphic land | 20.60s | whoosh + impact | -25dB / -25dB |
| G2 graphic land | 24.60s | whoosh + impact | -25dB / -25dB |
| G3 graphic land | 27.30s | whoosh + impact | -25dB / -25dB |
| G4 graphic land | 37.40s | whoosh + impact | -25dB / -25dB |
| Map pin drop | 33.50s / 33.58s | pop / shimmer | -23dB / -26dB |
| End card | 42.90s / 43.50s | riser / thud | -24dB / -24dB |

Word-level T2/T3 timings read from `public/take2-chunks.json` (exact ASR
timestamps), not eyeballed: T2 lands on "overpay" onset (0.94s in the transcript,
WO pins ~0.9s — used 0.9 exactly per the WO). T3's three beats land on "the"(2.56,
matches T3's own spec window start), "option"(3.04), "you"(3.52) — the real word-group
boundaries for "THE CHEAPEST / OPTION / YOU CAN FIND" per WO_HOOK_SPECTACLE's own
T3 breakdown.

**Bed ducking.** Pre-duck ceiling trimmed to -20dB peak / ~-29.7dB RMS (a sensible
"swell" level for the gaps). Sidechain: `sidechaincompress` keyed by voice,
`threshold=0.065` (~-23.7dB), `ratio=5`, `attack=12ms`, `release=220ms`,
`makeup=1.15`. Measured duck depth across 5 sampled speech windows: 11.4-25.0dB
under voice RMS (median ~13dB; deepest on the loudest hook line "Don't overpay",
which is expected — louder voice triggers harder ducking). Recovers to near its
-20dB ceiling in the natural inter-sentence gaps (verified on 3 real gaps in the
transcript: 19.8-20.12s, 36.86-37.26s, 41.18-41.72s). WO's "~18dB" is stated as a
tuning target, not a hard verify gate — actual achieved range is reported honestly
here rather than forced to hit one number; the audible behavior (recedes under
voice, swells in gaps) matches the spec's intent.

---

## 3. Mastering — the two-pass loudnorm chain, and a real gotcha

Ran OUT_SCOUR §F's exact chain (`I=-14:TP=-1.5:LRA=11`, `linear=true`), overriding
WO_AUDIO's inline TP=-1.0/LRA≤7 mention per WO_AUDIO's own "defer to SCOUR, log the
substitution" instruction.

**Gotcha: a straight two-pass loudnorm on this source would never hit linear
mode.** Read ffmpeg's actual `af_loudnorm.c` source to confirm — linear mode is
only used when `(target_I - measured_I) + measured_TP <= target_TP`. This voice
take's own natural true peak is already close to 0dBTP (a normally-recorded talking
head), so even the small gain needed to reach -14 LUFS pushes the peak past the
-1.5dBTP ceiling, and the filter silently falls back to "dynamic" (soft
limiting/pumping) — the opposite of what OUT_SCOUR §F says `linear=true` is for
("a precise static-gain match... no dynamic pumping"). Confirmed this empirically
by testing the **actual pass-2 output**, not pass-1's own self-report (pass 1
always reports "dynamic" regardless, since it has no `measured_*` values yet — that
field only reflects what pass 2 decided).

**Fix:** added a pre-mastering peak limiter (`alimiter=limit=0.631` [-4dBTP],
`level=disabled` — the `level` auto-normalize-back-to-0dB default has to be turned
off or it defeats the limiting entirely) ahead of the two-pass loudnorm. Bisected
the minimum limiter ceiling needed on the dry voice alone: -2.5dBTP still fails,
-3.0dBTP succeeds — used -4dBTP on the full mix for margin. This is a real addition
to "the exact chain" beyond OUT_SCOUR §F's literal command, worth carrying forward
to any future two-pass loudnorm run on hot-peaked talking-head source: **run a
peak-limiting pre-pass first if the source's own true peak is above roughly
-3dBTP, or budget for `linear=true` to silently no-op into dynamic mode.**

**Pass 1 (measured, on the limiter-processed premaster):**
```json
{
  "input_i": "-15.44",
  "input_tp": "-3.85",
  "input_lra": "2.00",
  "input_thresh": "-25.69"
}
```

**Pass 2 command (the exact chain used):**
```bash
ffmpeg -i mixdown-limited.wav -af \
  "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=-15.44:measured_TP=-3.85:measured_LRA=2.00:measured_thresh=-25.69:linear=true:print_format=summary" \
  -ar 48000 -ac 2 -c:a pcm_s16le mixdown-mastered-final.wav
```

**Pass 2 result:**
```
Input Integrated:    -15.3 LUFS   Input True Peak:    -4.0 dBTP
Output Integrated:   -13.9 LUFS   Output True Peak:   -2.6 dBTP
Output LRA:            2.0 LU     Normalization Type:  Linear   <- confirmed, not dynamic
Target Offset:        -0.1 LU
```

**Integrated LUFS achieved: -13.9 LUFS** (target -14, within 0.1 LU).

---

## 4. Verify

**ebur128 momentary, 5s buckets, final master:**

| Bucket | Window | Avg momentary | Min | Max |
|---|---|---|---|---|
| 0 | 0-5s | -23.42 | -120.7* | -10.29 |
| 1 | 5-10s | -15.56 | -36.53 | -9.21 |
| 2 | 10-15s | -14.61 | -25.84 | -10.04 |
| 3 | 15-20s | -15.13 | -26.51 | -10.32 |
| 4 | 20-25s | -14.66 | -25.23 | -9.84 |
| 5 | 25-30s | -15.28 | -25.89 | -11.54 |
| 6 | 30-35s | -14.78 | -26.62 | -10.70 |
| 7 | 35-40s | -15.01 | -25.11 | -10.44 |
| 8 | 40-45s | -15.87 | -26.02 | -9.45 |
| 9 | 45-46.06s (partial) | -18.58 | -31.94 | 0.00 |

*Bucket 0's low average is the natural pre-speech lead-in (word 1 "Don't" starts at
0.5s; momentary loudness needs ~400ms to integrate) — not a defect, this happens
before any content exists to measure.

**Buckets 1-8 (the full-content span, 5-45s): -14.61 to -15.87, a 1.26 LU spread —
within the ±1.5 LU flat requirement.** Zero `-inf` frames anywhere in the 461-frame
(100ms step) curve — confirmed no dead air. Two brief dips below -30 LUFS momentary
(4.4-4.5s, 9.0-9.1s) both land on real, short natural speech pauses in the script
(the T1/T2 exit breath, and the "...prices." / "So if your roof..." sentence
boundary) — expected cadence for spoken-word content, not a mixing defect.

**SFX ≥12dB under voice — measured via isolation render**, not trusted from
per-file arithmetic (see §2's bug). Built the SFX+bed-only mix (voice excluded from
the final sum) and ran it through the byte-identical limiter + forced-gain loudnorm
as the real master. Worst-case peak anywhere in that isolated render: **-17.37dB**
(and it's a bed drum transient landing in a natural vocal gap at 15.10/19.96/37.10/
41.54s — not one of the named SFX hits). Voice reference peak (same chain): -2.55dB.
**14.8dB under voice at the worst point in the whole file.**

Per-hit clean measurements (narrow window right at each timestamp, same isolation
render):

| Hit | Peak | dB under voice |
|---|---|---|
| T2 whoosh+thud | -22.6dB | 20.1dB |
| T3 tick 1 | -19.4dB | 16.8dB |
| T3 tick 2 | -19.5dB | 16.9dB |
| T3 tick 3 | -20.1dB | 17.5dB |
| b-roll tick (curl) | -22.5dB | 19.9dB |
| b-roll tick (stain) | -19.4dB | 16.8dB |
| b-roll tick (bill) | -23.4dB | 20.8dB |
| G1 whoosh+impact | -25.3dB | 22.8dB |
| G2 whoosh+impact | -22.4dB | 19.9dB |
| G3 whoosh+impact | -22.3dB | 19.7dB |
| G4 whoosh+impact | -18.6dB | 16.1dB |
| pin pop+shimmer | -19.9dB | 17.3dB |
| end-card riser+thud | -17.4dB | **14.9dB (tightest of all 13)** |

Every hit clears the ≥12dB floor with real margin (tightest is 2.9dB of headroom
past the line).

**A/B intelligibility spot-check** (3 moments, windowed RMS: final mix vs a
dry-cut mastered through the byte-identical limiter+loudnorm chain, no SFX/bed):

| Moment | Window | Dry RMS | Final RMS | Delta |
|---|---|---|---|---|
| G2 graphic hit ("...as low as $98 a month") | 23.6-25.6s | -17.73dB | -17.64dB | 0.09dB |
| Montage tick ("...starting to see some leaks") | 13.02-15.02s | -17.94dB | -17.77dB | 0.17dB |
| End-card riser ("schedule your free quote and we") | 42.4-44.4s | -17.43dB | -17.27dB | 0.16dB |

All three deltas are under 0.2dB — voice reads as unchanged, nothing masked.

---

## 5. Re-mux onto v6 — the exact command for when it lands

The audio master does **not** depend on the hook's visual treatment layer — v6 is
v4b/v5 plus a purely visual overlay (`HookSpectacle.tsx`) for 0-8.6s, same voice
take, same 46.06s timeline (WO_HOOK_SPECTACLE's own verify step confirms v6 renders
to the same duration). So the finished master
(`wo/audio-assets/work/mixdown-mastered-final.wav`) muxes straight onto v6 with
**no re-run of the mix/master pipeline**:

```bash
ffmpeg -y -i out/RealBBv6-raw.mp4 -i wo/audio-assets/work/mixdown-mastered-final.wav \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest \
  out/RealBBv6-audio.mp4
```

If v6's actual rendered duration turns out to differ from 46.058667s (it shouldn't
per WO_HOOK_SPECTACLE's spec, but worth a real check rather than assuming), confirm
first with `ffprobe -v error -show_entries format=duration -of csv=p=0
out/RealBBv6-raw.mp4` — if it's off by more than a frame or two, the SFX moment map
in `wo/audio-assets/work/mix_filtergraph.txt` would need its `adelay` values
re-checked against v6's actual word timing before reusing the pre-built master
blind. The full mix pipeline (still valid, reusable end to end by swapping the
`-i` target) is:

```bash
# 1. Render the SFX+bed+voice premaster from the filter graph (swap the -i target to v6)
ffmpeg -y -i out/RealBBv6-raw.mp4 -filter_complex_script wo/audio-assets/work/mix_filtergraph.txt \
  -map "[mixdown]" -ar 48000 -ac 2 -c:a pcm_f32le wo/audio-assets/work/mixdown-premaster.wav

# 2. Pre-limit (required for loudnorm linear mode to be reachable, see §3)
ffmpeg -y -i wo/audio-assets/work/mixdown-premaster.wav \
  -af "alimiter=limit=0.631:attack=5:release=60:level=disabled" wo/audio-assets/work/mixdown-limited.wav

# 3. Pass 1 - measure
ffmpeg -i wo/audio-assets/work/mixdown-limited.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null -
# (read the four measured_* values from the printed JSON)

# 4. Pass 2 - apply linear gain using the measured values from step 3
ffmpeg -y -i wo/audio-assets/work/mixdown-limited.wav -af \
  "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=<I>:measured_TP=<TP>:measured_LRA=<LRA>:measured_thresh=<thresh>:linear=true:print_format=summary" \
  -ar 48000 -ac 2 -c:a pcm_s16le wo/audio-assets/work/mixdown-mastered-final.wav

# 5. Mux onto v6
ffmpeg -y -i out/RealBBv6-raw.mp4 -i wo/audio-assets/work/mixdown-mastered-final.wav \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest out/RealBBv6-audio.mp4
```

---

## Files

- `out/v4b-audio-PROOF.mp4` — the delivered proof render (v4b video, mastered audio)
- `wo/audio-assets/final/sfx_*.wav` — the 7 gain-normalized SFX stems (-1dB peak reference)
- `wo/audio-assets/work/mixdown-mastered-final.wav` — the finished audio master, ready to mux onto v6 directly
- `wo/audio-assets/work/mix_filtergraph.txt` — the full ffmpeg filter graph (all 20 SFX placements + bed ducking), reusable as-is against v6
- `wo/audio-assets/*.zip` + `extracted/` — the 4 raw Kenney CC0 packs, kept for provenance
- `wo/audio-assets/pixabay_test_track.mp3` — the full 147s Pixabay bed source, kept for provenance
