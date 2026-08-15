# OUT_BROLL — stills → motion → degrade → paranoia skim

**Run:** 2026-08-15, ~01:23–01:45 ET · agent: BROLL (Opus 5)
**WO:** `wo/WO_BROLL.md` · **Clips:** `video-rig/public/broll-v2/`
**Subject class:** anonymous texture only (roofs, aerials, materials). No hands,
faces, crews, trucks, or branding appear in any output. ✅ Class held.

---

## Credits — receipted, not estimated

| | credits |
|---|---|
| Balance BEFORE | **267.93** |
| Balance AFTER | **230.43** |
| **Spent** | **37.50** |
| Hard cap | 80.00 |
| Headroom left unspent | 42.50 |

5 video jobs billed at **7.50 each** (4 first-pass + 1 re-roll).

⚠️ **Preflight quote ≠ metered price.** `get_cost` quoted **8.75** for
`kling3_0 mode=pro sound=off`; the balance delta proves the actual charge was
**7.50** — identical to the `mode=std` quote. Either `pro` silently fell back to
`std`, or `sound=off` rebates the difference. Reported spend above is the
**balance delta**, not the quote. Price the next run off 7.50, not 8.75.

**Model pick (priced, not assumed):** `kling3_0` @ 5s / 9:16 / `sound=off`
— std 7.50 · **pro 8.75 (quoted)** · turbo 720p 7.50 · turbo 1080p 10.00.
Veo 3.1 ultra deliberately NOT used per WO.

⚠️ **`generate_video_batch` preset interception fired — the receipted gotcha is
real and reproducible.** 2 of 4 first-pass submissions were swallowed and
returned preset "IN THE DARK" (`24bae836-2c4a-48e0-89b6-49fcc0b21612`) instead
of a job. Passing `declined_preset_id` forced both through on resubmit. It cost
nothing (no job = no charge) but it silently drops half a batch — **always
re-check `submitted_count` against your request count.**

---

## Verdict table

| # | Source | Model | Cr | Motion prompt (gist) | Degrade recipe | Verdict | Realism /10 |
|---|---|---|---|---|---|---|---|
| 1 | `br3-oldroof.png` | kling3_0 5s 9:16 | 7.50 | handheld held near-still, no zoom; roof frozen; only far bare branches move | grain + phone color + micro-handheld + CFR30 | ✅ **KEEP** | **9.5** |
| 2 | `br4-curl.png` | kling3_0 5s 9:16 | 7.50 | locked macro, extremely slow push-in; curled tabs tremble; everything else rigid | grain + phone color + micro-handheld + CFR30 | ✅ **KEEP** | **9** |
| 3 | `br8-aerialstill.png` | kling3_0 5s 9:16 | 7.50 | slow steady drone forward, parallax over rooftops; cars stay parked | grain + phone color, **no handheld** (drone) + CFR30 | ✅ **KEEP** | **9** |
| 4 | `br7-newroof.png` v1 | kling3_0 5s 9:16 | 7.50 | slow push-in along ridge; leaves move; shingles rigid | — (killed before degrade) | ❌ **KILL** | **3** |
| 5 | `br7-newroof.png` v2 | kling3_0 5s 9:16 | 7.50 | **push-in removed** — fully locked tripod, only edge foliage moves | — | 🔴 **NEVER DELIVERED** | n/a |

**Shipped clips** (1080×1920, CFR 30, crf 18, faststart, audio stripped):
- `public/broll-v2/br3-oldroof-v2.mp4` — 11.9 MB
- `public/broll-v2/br4-curl-v2.mp4` — 8.7 MB
- `public/broll-v2/br8-aerial-v2.mp4` — 15.0 MB

---

## The kill — br7-newroof v1, named defect

**Defect: granule dissolution → directional wood-grain.** Over the 5s push-in,
the asphalt shingle surface on the sunlit plane stops being a *stippled granular
aggregate* and becomes *long fibrous streaks running diagonally along the
courses* — brushed-wood / hair texture. Tab outlines survive; the material
itself melts. Asphalt shingles have no directional grain, so this is not a
subtle aesthetic quibble — **a roofer clocks it instantly**, and roofers are
audience-adjacent for this ad.

Evidence kept at `public/broll-v2/_killed-evidence/`:
- `br7-v1-KILL-early-granular.jpg` — t=0.2s, correct granular aggregate
- `br7-v1-KILL-late-woodgrain.jpg` — t=4.8s, same crop, melted to fibre
- `br7-v1-KILLED.mp4` — the killed clip itself

**Root cause (the transferable lesson):** *the push-in is what killed it.*
A push forces the model to synthesise high-frequency detail that does not exist
in the plate; on a fine stochastic texture (granules) it invents the wrong
material. The three survivors all had either **no scale change** (br3), a
**much slower** push on a macro subject whose granules were already resolved
(br4), or **true parallax with no detail extrapolation** (br8).

> **Rule for the next run: never push in on a fine-grained texture plate.**
> Lock the camera and let foliage or light carry the motion. Camera moves are
> only safe when the plate already resolves the detail the move reveals.

---

## 🔴 FAIL LOUD — the br7 re-roll was charged and never delivered

The v2 re-roll (`job 32a88fb8-89e9-4097-9ef3-d4934eb7dd98`) was accepted,
**billed 7.50**, and then sat in provider status `waiting` for **21+ minutes**
without ever entering `in_progress`. The four first-pass jobs all went
`pending → in_progress → completed` in **~3 minutes** on the same model, same
params, same session — so this is a provider-side stall, not a slow render.

Per WO rule *"if the MCP misbehaves, fail loud in OUT_BROLL.md rather than
burning credits probing,"* I **stopped rather than resubmitting.** There was
42.50 of unspent headroom available; it was deliberately not spent chasing a
stalled queue.

**Open item for the morning:** the job may still land. Re-check with
`jobs_wait` / `show_generation_by_ids` on `32a88fb8-89e9-4097-9ef3-d4934eb7dd98`
before paying for br7 again — **the credit is already spent.** If it did land,
it still needs the full paranoia skim (1:1 crops at t=0.2 vs t=4.8) plus the
degrade pass before it may ship; a delivered clip is not a passed clip.

**Net: br7-newroof has no shipping clip.** 3 of 4 sources delivered.

---

## Paranoia skim — method and coverage

Standing order was to LOOK at every output, not trust the thumbnails. Method:

1. 6 frames/clip at 1.2 fps from every raw clip → read all of them.
2. **Full-resolution same-region crops at t=0.2 vs t=4.8** — this is the step
   that caught br7; the melt is invisible at preview scale and only shows in a
   1:1 crop. The 520px contact frames alone would have passed br7.
3. 12 frames/clip at 2.4 fps from every **degraded** output — re-skimmed after
   the ffmpeg pass, since the degrade is itself a chance to introduce artefacts.

Checked for and NOT found on the three keepers: morphing geometry · breathing
shingles · warping ridge/fascia lines · melted edges · texture boil · cars or
structures mutating · anything entering frame from the banned subject class.

Per-clip notes:
- **br3-oldroof** — the most stable of the set. Vent pipe, flashing patch, every
  missing-tab tear and dark streak hold their exact silhouettes end to end.
  Near-nothing for the model to invent, which is exactly why it scores highest.
- **br4-curl** — the curled tab keeps its precise peak-and-sweep silhouette
  through the push; granules stay discrete; moss flecks persist. Residual tell
  is inherited from the *plate*, not the motion: the depth-of-field is creamier
  than a phone macro would give at that distance.
- **br8-aerial** — genuine 3D parallax, not a flat digital zoom: roof faces
  reveal correctly as the camera advances. Hip and ridge lines stay straight,
  AC condenser and carport slats intact, parked cars stay parked.

---

## Honest caveats (not defects, but tells to know about)

1. **24 → 30 fps is frame duplication.** Kling renders 24; the WO's CFR-30
   ingest law is satisfied by duplication, which adds a faint 3:2-style judder.
   Invisible on br3/br4 (almost no motion), marginally present on br8 (fastest
   motion). Not corrected — `minterpolate` would synthesise exactly the warping
   artefacts this WO exists to avoid. Flagging rather than hiding.
2. **The degrade is deliberately subtle.** Grain `alls=5`, saturation 0.93,
   contrast 0.98, highlight roll-off to 0.955 with a 0.012 black lift, light
   ISP-style `unsharp`. Micro-handheld is a 4% overscan with two incommensurate
   sine/cosine drifts so the wobble never visibly loops. It reads as phone
   capture without announcing itself as a filter — but if these are cut against
   Joseph's *real* outdoor footage, the grain may want a second pass to match.
3. **br8's forward speed** is slightly smoother and faster than a hand-flown
   drone. Reads as a programmed/orbit shot rather than a person flying. Fine
   for b-roll; would not survive being intercut with actual hand-flown footage.
4. **Scores are vs "real phone footage," judged on stills.** A 9 means I could
   not find a defect in frame-by-frame inspection — not that it is certified
   indistinguishable in motion at full speed on a phone screen. **Joseph's
   eyeball is still the gate.**

---

## Bottom line

The pipeline works — **3 of 4 sources shipped at 9+/10**, and the one quality
failure failed for a *specific, diagnosable, avoidable* reason rather than
general AI mush. The whole yield came in at **37.50 of 80 credits**, less than
half the cap.

Scoreboard: **3 KEEP · 1 KILL (named defect) · 1 undelivered (provider stall).**

The single most valuable output of this run is not a clip, it is the rule:
**camera moves are the enemy of texture.** Lock the camera on material plates.

Second most valuable: **the 1:1 crop test is the only skim that works.** br7
passed every 520px contact sheet and failed instantly at full resolution. Any
future b-roll QC that stops at preview-scale frames will ship melted texture.
