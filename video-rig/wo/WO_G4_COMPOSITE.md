# WO_G4_COMPOSITE — behind-subject device at the $50M beat (RealBBv6)

**Authored inline (Fable). Pinned design; implement, don't re-design.**
**The device:** the reference's behind-subject compositing (graphics BEHIND the
masked speaker) applied to ONE beat tonight: G4, the $50M proof moment
(37.4–40.2s). Matte is ready: `public/take2-alpha.webm` (VP9+alpha, same
timeline as take2-cfr — frame 0 = frame 0), verified by decode-back.

## Layer stack (bottom → top), Sequence-mounted ONLY for ~[1116..1212] frames
(37.2s–40.4s — `<OffthreadVideo transparent>` costs ~40% render speed; bounded
mounting keeps that to ~96 frames):
1. The base composition exactly as-is (take2-cfr playing underneath).
2. **Scrim** — AbsoluteFill `rgba(12,27,46,0.85)`, fade in 8 frames from 37.3,
   fade out 8 frames ending 40.4.
3. **Behind-graphics** (≤20% opacity, slow drift — texture, not competition):
   - Giant outlined "$50,000,000" in Anton, white outline (2px, no fill),
     ~140px, drifting upward at ~12px/s, two staggered instances offset.
   - A roofline silhouette strip along the bottom edge (simple dark SVG
     gable/ridge shapes, 15% opacity).
4. **The matted speaker** — `<OffthreadVideo transparent
   src={staticFile('take2-alpha.webm')} startFrom={SEQ_FROM}>` so source time
   stays aligned with the base take (alpha webm frame N == take2-cfr frame N).
   He sits pixel-identical over the base video, so the "cut" is invisible —
   only the background swaps.
5. **The existing G4 Hi2A graphic unchanged on top** ("WE'VE INSTALLED OVER /
   $50 MILLION / OF ROOFS") — it remains the headline; the composite is depth.
6. Bottom captions continue as normal (they render above in the tree already).

## Verify
- Stills at t=37.3 (scrim entering) · 38.5 (full effect) · 40.3 (exiting) →
  wo/hook-frames/, LOOK at each: edge halo acceptability on navy, sync
  (his silhouette must exactly cover his base-video self — any offset reads
  as ghosting), the Hi2A graphic unobstructed.
- Then the FULL re-render of RealBBv6 (same command) — this render is the
  assembly candidate, so first ALSO apply the b-roll swap below.

## Piggyback slice — b-roll video swap (same render, pinned)
In the CUTS list: cut 2 (`old`, 9.80–11.30) src → `broll-v2/br3-oldroof-v2.mp4`
(video: true, srcFrom: 0.2) and cut 3 (`curl`, 12.16–14.02) src →
`broll-v2/br4-curl-v2.mp4` (video: true, srcFrom: 0.3). Identical in/out
times; the BRoll component already supports video cuts. Camera-move lerps
(s/x/y) for these two cuts → neutral [1,1]/[0,0]/[0,0] (the clips carry REAL
motion now; a synthetic move on top would double-move). Muted (they ship
silent but set muted anyway).
