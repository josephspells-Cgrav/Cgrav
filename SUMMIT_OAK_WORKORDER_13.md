# WORK ORDER 13 — Summit & Oak (new HERO VIDEO: daytime roof BEFORE→AFTER transformation)

**From:** WE11 (architect) · **To:** Builder (WARM / active V2 session) · **Date:** 2026-06-20
**Compounds on:** WO_01–12. **A CREATIVE-ASSET + hero-integration WO** (Higgsfield video generation + a hero media swap + overlay re-tune) — NOT a layout refinement.
**Site:** `summit-oak-roofing/` (Next.js SSG), live `kingmaker-summit-oak-roofing.vercel.app`.

## 0. SOURCE / THE LOCKED ASK
The current hero media is a dark, overcast-looking **dusk photo** (avg luminance 75/255 — Joseph: "it's just too dark… almost like an overcast shot"). WE11's CSS brightness(1.4) was a stopgap. **Joseph wants the asset itself replaced with a NEW HERO VIDEO.**

**Locked deliverable** (ultrathink-synthesized from a stream-of-consciousness ask; he said *"forget everything else I've said"* → the earlier **evening-glow** + **two-option (evening vs daytime) photo** idea is DROPPED): a bright **DAYTIME** roof **BEFORE→AFTER transformation** video. It opens on a house with an **OLD/worn roof** and, as the camera orbits/pans, the roof transforms to a **NEW roof** by the middle/end (a roof-install/assembly feel). **~15 seconds**, ending in a settled drone **"hover"** on the finished new roof.

## 1. THE CREATIVE BRIEF (the lens)
- **Real, not AI-slop** ([[anti-ad-kingmaker-doctrine]] — commit to the REAL pole; the uncanny middle is death). A believable, photoreal **NC-suburban home** (brick/siding, Triangle vibe). **Vision-QA every generation** for slop / garble / uncanny / warped geometry — reject and regen.
- **Bright DAYTIME** — clear or partly-sunny sky, clean natural light, real curb appeal. **NOT overcast/grey** (the exact problem with the current shot).
- **The roof is the focal element.** BEFORE = old, weathered, **algae-streaked, curling/missing shingles**. AFTER = crisp **new architectural shingles** (GAF-premium), clean ridgelines.
- **Camera:** a slow **drone orbit / aerial pan** revealing the roof plane; starts on the old roof, ends hovering on the new roof.
- **No baked-in text or logos** (the site overlays all copy; Higgsfield image models bake garbled text ~20% per [[contractor-demo-media]] — keep the footage text-free + vision-QA).

## 2. THE HIGGSFIELD APPROACH (EXPLORE — don't settle on the first tool)
Joseph: *"there's a lot of tools on Higgsfield, make sure to explore them."* Start with **`models_explore(action:'recommend')`** for this exact goal (before→after transformation, drone orbit, 15s). Then:
- **MATCHED before/after pair (the key technique, [[contractor-demo-media]]):** generate the **AFTER** house (daytime, new roof) first, then use **`flux_kontext` img2img** — pass the AFTER's `job_id` as the media ref — to derive the **BEFORE** (the SAME house/angle/light, OLD worn roof). Do NOT use two independent text2img gens (they drift to different houses).
- **The transformation video — explore both routes, pick the stronger:**
  - (a) **Start+End keyframe model** — if Higgsfield has a video model that accepts a START frame (before) + END frame (after), feed the matched pair → it morphs before→after across the clip. Cleanest *if* it reads believably (no melty morph). Confirm support via `models_explore`.
  - (b) **Two-clip stitch (reliable fallback)** — image2video the BEFORE into an orbit clip + the AFTER into a matching-orbit clip, then **ffmpeg**-stitch them with a mid-video transition (a clean wipe / dissolve, or a "new-shingles sweep across the roof" reveal). This GUARANTEES a readable before→after.
- Build to **~15s** (most models output 5–10s — concat clips to reach 15s with the transformation arc front-loaded and a calm **hover** beat at the end).
- **Generate 3–4 takes**, vision-QA each (real? roof clearly transforms? no slop/garble/text?), keep the **best 1–2 for Joseph to pick** (he likes to choose — this is how the dropped "give me options" instinct is honored).
- ⏱️ **Time-box it:** if a clean single-shot morph (route a) proves unreliable after a reasonable exploration, ship the **two-clip stitch** (route b) — it reliably reads as the transformation. Don't infinitely chase a perfect in-shot morph.

## 3. INTEGRATION (`components/Hero.tsx` + `/public`)
- **Swap `public/hero.mp4`** = the new 15s video, **ffmpeg-compressed** for web (it LAZY-loads on first engagement, so it's not the LCP — but keep it lean, ~1.5–3MB at 720–1080p).
- **Swap `public/hero-poster.jpg`** = a poster frame of the **AFTER (new-roof) bright daytime state**, web-optimized (~50–80KB). **This IS the LCP + the reduced-motion image + the default first impression — it must look premium immediately** (do NOT use the old-roof frame as the poster).
- ⚠️ **LOOP handling:** a before→after video must **NOT hard-loop** (an after→before snap every cycle is jarring). Play once and **hold/hover on the final new-roof frame** (drop `loop`, or loop ONLY the final settled-hover segment). The poster + the final frame are both the new-roof state, so the rest reads seamless. The existing 700ms `onCanPlay` opacity fade softens the poster→video-start hand-off.
- ⚠️ **RE-TUNE the hero overlay for the NEW BRIGHT footage:** the current `brightness(1.4) saturate(1.08)` filter (on the img + video) + the dusk-tuned scrim + text-shadow were built for the DARK photo. A bright daytime video will **over-brighten under the filter (washed)** → **remove (or sharply reduce) the brightness filter**, then re-tune the left scrim + the `[textShadow]` so the left-column text stays legible over the new bright sky/roof. **Verify on the ACTUAL new footage** (axe AA + a vision pass) — the **light-gray subhead** is the watch-item (a bright daytime sky behind it is the worst-contrast case; it may need a touch MORE scrim/shadow than the dusk version, not less).

## 4. PRESERVE (do NOT touch)
- The **WO_12 dual-intent HOME hero structure** — the "Active leak right now? Tap to call 24/7" strip + the EstimateQuiz form + the supporting/trust/stats column. All conversion guts + **proven copy** (this is a MEDIA swap + overlay re-tune; no copy/structure changes).
- The **LCP/CWV perf pattern**: poster preload (`ReactDOM.preload`) + the video lazy-load-on-engagement effect (poster stays the LCP) + the reduced-motion poster fallback. Keep all of it.
- The 48-URL SEO spine + schema (WO_08–11), NC compliance, the rounded prices. (Inner-page `PageHero` heroes are OUT of scope — this WO is the HOME hero video only.)

## 5. VERIFICATION
- 🎯 **Joseph's eyeball = the FINAL CREATIVE GATE.** Show him the best take(s) (link or capture); HE picks before the final deploy is locked. Creative is his call.
- Vision-QA: real/believable (no slop, garble, baked text, warped geometry); the roof CLEARLY transforms old→new; bright daytime (not overcast); the hover ending lands.
- Hero integration: video plays (lazy on engagement) + holds/rests cleanly (no jarring loop-snap); poster = the bright new-roof LCP; **text legible over the new footage** (axe 0-serious desktop+mobile + vision); 0 console errors; **CWV green** (poster LCP < 2.5s, CLS 0); reduced-motion shows the (good) poster.
- build green (`npm run build`) · render every route family (200 + 0 errors) · **deployed-content check** (the live URL serves the new mp4 + poster) · deploy to `kingmaker-summit-oak-roofing.vercel.app`.

## 6. OPERATING
Explore the Higgsfield toolset (don't settle on the first model); matched-pair via `flux_kontext`; multiple takes + vision-QA for slop; ffmpeg for stitch/compress/poster-extract. **Show Joseph the best take(s) for his pick BEFORE locking the deploy.** Capture your working method (which model + settings actually produced a clean before→after) to the vault — it's a reusable contractor-demo technique. Report the approach used + the take(s) + the hero re-tune + verification evidence + the live URL.

---
*Source: WE11 ultrathink synthesis of Joseph's request, 2026-06-20. "Forget everything else" → dropped the evening-glow + two-option idea; locked the daytime before→after transformation video (15s + hover). Superseded the WE11 CSS brightness stopgap (the new bright video replaces it). — WE11.*
