# WORK ORDER 14 — Summit & Oak (hero video: clean daytime drone roof shot, play-once → idle)

**From:** WE11 (architect) · **To:** Builder (WARM / active V2 session) · **Date:** 2026-06-20
**Compounds on:** WO_01–13. **Supersedes the WO_13 attempt** — the before→after roof-transformation video "failed miserably" (Joseph). **DROP the transformation / before-after / assembly idea entirely.**
**Site:** `summit-oak-roofing/` (Next.js SSG), live `kingmaker-summit-oak-roofing.vercel.app`.

## 0. THE ASK (simple + achievable)
A **NORMAL bright DAYTIME drone-footage roof shot** — a clean aerial orbit / slow flyover of a nice roof on a real home. **~15 seconds, 4K source.** No before/after, no transformation — just premium daytime drone roof footage. The camera settles to a calm hover at the end. **CRITICAL behavior: it PLAYS ONCE, then goes IDLE — it must NOT loop over and over;** when it finishes it holds/rests on the final (hover) frame.

## 1. THE CREATIVE BRIEF (the lens)
- **Real, photoreal** NC-suburban home (anti-AI-slop, [[anti-ad-kingmaker-doctrine]] — commit to the REAL pole; **vision-QA every gen** for garble / uncanny / warped geometry — reject + regen).
- **Bright DAYTIME** — clear or partly-sunny sky, clean natural light, real curb appeal. **NOT overcast/grey** (the original hero's exact problem).
- **A nice NEW roof** — crisp architectural shingles (GAF-premium), clean ridgelines. The roof is the focal subject.
- **Camera:** a smooth drone **orbit / slow aerial flyover** revealing the roof + home, **settling to a calm hover** at the end.
- **No baked-in text/logos** (the site overlays all copy; keep the footage text-free + vision-QA).
- **4K source, web-compressed delivery:** generate at 4K for quality but **deliver a lean web mp4** (~1080–1440p, the hero scales it) — do NOT ship a raw multi-tens-of-MB 4K file. It still reads crisp downscaled-from-4K.
- **The end frame = the settled hover** (where the video idles after one play).

## 2. HIGGSFIELD APPROACH (a single coherent shot — far simpler than WO_13)
`models_explore(action:'recommend')` for "drone orbit / aerial real-estate roof footage." Generate the base daytime new-roof house image (soul_2 or similar) → **image2video** a drone-orbit motion (or a text2video drone shot) → the camera orbits + settles to a hover. Concat to ~15s if the model outputs shorter; **ffmpeg** to compress + extract a bright new-roof **poster frame**. Generate **3–4 takes**, vision-QA each (real / believable / bright daytime / no slop / no text), keep the **best 1–2 for Joseph to pick**. (No morph, no transformation — this is a normal, reliable single-shot gen.)

## 3. INTEGRATION (`components/Hero.tsx` + `/public`)
- **Swap `public/hero.mp4`** = the new 15s daytime drone shot (web-compressed) + **`public/hero-poster.jpg`** = a bright new-roof daytime frame (the **LCP**, ~50–80KB, looks premium standalone).
- ⚠️ **PLAY-ONCE → IDLE (the explicit ask):** the hero `<video>` currently has `loop` — **REMOVE `loop`** so it plays through once and **HOLDS on the final hover frame** (no restart / no loop-snap). Confirm the element **rests on the last frame (not black/empty)** when it ends — set it up so the final painted frame stays (the video naturally holds its last frame on `ended` when `loop` is off; verify it visually, and that the poster→video→idle hand-off is clean).
- ⚠️ **RE-TUNE the overlay for the BRIGHT footage:** the current `brightness(1.4) saturate(1.08)` filter on the img + video was for the DARK dusk photo — a bright daytime shot **washes out** under it → **remove (or sharply reduce) the brightness filter**, then re-tune the left scrim + the `[textShadow]` so the left-column text stays legible over the new bright sky/roof. **Verify on the ACTUAL new video** (axe AA + a vision pass) — the **light-gray subhead** is the watch-item (a bright daytime sky behind it is the worst-contrast case; it may need a touch MORE scrim/shadow, not less).
- Keep the **poster-preload + video-lazy-load-on-engagement LCP pattern** (poster stays the LCP) + the **reduced-motion poster fallback**.

## 4. PRESERVE (do NOT touch)
The **WO_12 dual-intent HOME hero structure** (the "Active leak right now? Tap to call 24/7" strip + the EstimateQuiz form + the supporting/trust/stats column) · all conversion guts + **proven copy** · the 48-URL SEO spine + schema · the **LCP/CWV perf pattern**. This is a **media swap + the loop/overlay re-tune ONLY** — no copy/structure changes. **Home hero only** (inner `PageHero` is OUT of scope).

## 5. VERIFICATION
- 🎯 **Joseph's eyeball = the FINAL CREATIVE GATE.** Show him the best take(s); HE picks before the deploy is locked.
- Vision-QA: real / believable / bright daytime (not overcast) / no slop / no garble / no baked text.
- Hero: **plays ONCE + idles on the hover (NO loop)** · poster = the bright new-roof LCP · **text legible over the footage** (axe 0-serious desktop+mobile + vision) · 0 console errors · **CWV green** (poster LCP < 2.5s, CLS 0) · reduced-motion shows the (good) poster.
- build green (`npm run build`) · render every route family (200 + 0 errors) · **deployed-content check** (the live URL serves the new mp4 + poster) · deploy to `kingmaker-summit-oak-roofing.vercel.app`.

## 6. OPERATING
Explore Higgsfield; multiple takes + vision-QA for slop; ffmpeg compress + poster-extract; 4K source → web-compressed delivery. **Show Joseph the best take(s) for his pick BEFORE locking the deploy.** Capture your working drone-shot method (model + settings) to the vault. Report the approach + the take(s) + the loop/overlay re-tune + verification evidence + the live URL.

---
*Source: WE11, 2026-06-20. Supersedes WO_13 (transformation failed). Locked: a normal daytime drone roof shot, 15s, 4K source/web-compressed, play-once-then-idle (no loop). Carries the WO_13 integration land-mines (loop handling + overlay re-tune for bright footage) which still apply. — WE11.*
