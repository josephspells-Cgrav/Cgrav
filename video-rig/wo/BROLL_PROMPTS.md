# B-ROLL PROMPT KIT — drone / roofing crew · 5s · NO CUTS

For Higgsfield (Kling 3.0 pro image-to-video ≈ 7.5cr per 5s clip is the
workhorse tier). Paste-ready. Built 2026-08-16 against Joseph's brief:
*"think of what a roofing crew actually looks like... and it can't have any
cuts — I just did one and it gave me three cuts in a five second video."*

---

## 1. WHY YOU GOT THREE CUTS (and how to stop it)

A video model cuts when the prompt reads like a **story** instead of an
**observation**. Three triggers, all avoidable:

1. **Sequence words.** "then", "next", "as they finish", "before", "after",
   "we see… and then". Every one is an instruction to change shots.
2. **More than one camera idea.** "orbit the house and push in on the crew" =
   two shots = a cut. **One clip, one move, full stop.**
3. **Multiple competing subjects.** If nothing is clearly the hero, the model
   invents coverage of each — which it renders as cuts.

**The fix is structural:** describe ONE continuous camera move, over ONE
subject, in ONE moment of time. Then say so explicitly, twice — once at the
top, once at the end. Every prompt below is built that way.

---

## 2. 🔴 THREE THINGS TO NEVER ASK THE MODEL FOR

These are receipted failures from your own arc — not caution, measured.

- **❌ "Mabrey Roofing" on the shirts.** AI-rendered text on fabric garbles,
  every time. It's already a locked law: *motion-track a real composited
  wordmark, never generate it.* Keep shirts plain hi-vis; if you want the
  brand on a back, we composite it in the rig afterward.
- **❌ Close-ups of hands working.** Hands-doing-craft is AI's single weakest
  subject — two "hands" plates already died on this project. The drone height
  solves this for free.
- **❌ Faces.** Recognizable faces are the fastest AI tell. At drone altitude
  crew read as *figures*, which is exactly what you want. Never bring the
  camera down to face level.

⭐ **The law underneath all three:** *AI realism scales inversely with objects
in frame.* A wide aerial is mostly roof plane, tarps and shingle texture —
things the model is genuinely good at. Keep the humans small.

---

## 3. THE SHOTS

Each is one continuous move. Copy-paste as-is.

### A — TEAR-OFF ORBIT *(most useful; sells "real job site")*
```
Aerial drone footage, one single continuous unbroken take, no cuts. A slow
smooth orbital move around a two-story suburban house, camera steady at roof
height. The asphalt shingle roof is mid-replacement: one large section
stripped to bare gray plywood decking, the rest still covered in old dark
weathered shingles. Bright blue tarps draped over one roof slope and over the
shrubs below. Four roofing workers in high-visibility yellow-green safety
shirts, wide-brim sun hats, and work gloves are spread across the roof,
kneeling and working. Stacks of new shingle bundles sit on the deck. A debris
dumpster in the driveway. Late afternoon sun, long shadows, warm natural
light. Documentary construction footage, realistic, natural color. One
uninterrupted camera move, no editing, no scene change.
```

### B — RIDGE LINE PASS *(the prettiest; crew read as silhouettes)*
```
Aerial drone footage, one single continuous unbroken take, no cuts. The drone
glides slowly forward along the ridgeline of a residential roof, moving in one
straight steady line just above the peak. Fresh dark architectural shingles
laid in neat courses on one slope, an older stripped section with blue tarp on
the other. Three roofing workers in high-visibility orange safety shirts and
sun hats kneel and work along the slope, seen from above and behind, small in
frame. Bundles of shingles and a coil of rope on the deck. Clear morning
light, soft shadows. Realistic documentary aerial footage, natural color. One
continuous forward move, no cuts, no editing.
```

### C — SLOW RISE REVEAL *(good opener / establishing)*
```
Aerial drone footage, one single continuous unbroken take, no cuts. The camera
rises slowly and steadily straight upward from just above a finished dark
shingle roof, gradually revealing the whole house, the driveway with a work
truck and ladder, and the tree-lined suburban street beyond. Two roofing
workers in high-visibility yellow safety shirts and sun hats stand on the roof
near the ridge, small in frame. Blue tarp folded at the roof edge. Warm golden
hour light. Realistic documentary aerial footage, natural color, no text. One
smooth continuous rise, no cuts, no scene change.
```

### D — LATERAL DRIFT *(safest motion class — pure parallax)*
```
Aerial drone footage, one single continuous unbroken take, no cuts. The camera
drifts slowly sideways from left to right at a fixed height, looking down at a
roof under replacement. Half the roof is stripped to bare wood decking, half
covered in fresh dark shingles. A large blue tarp weighted at the corners
covers a stack of materials. Three workers in high-visibility yellow-green
shirts, hard hats and gloves work spread out across the slope. Overcast soft
daylight, even flat lighting. Realistic documentary construction footage,
natural color. One continuous sideways drift, no cuts, no editing.
```

### E — NO PEOPLE AT ALL *(highest hit-rate; zero human tells)*
```
Aerial drone footage, one single continuous unbroken take, no cuts. A slow
steady overhead move across a residential roof mid-replacement. Bare gray
plywood decking exposed on one section, rows of fresh dark architectural
shingles on another, a bright blue tarp weighted down with shingle bundles,
scattered torn-off old shingles, a roofing nail gun and hose resting on the
deck. No people. Late afternoon sunlight raking across the surface, strong
texture and shadow. Realistic documentary aerial footage, natural color. One
uninterrupted camera move, no cuts.
```

### F — DUMPSTER / TEAR-OFF DEBRIS *(sells scale of work, no faces)*
```
Aerial drone footage, one single continuous unbroken take, no cuts. The camera
looks down and drifts slowly forward over a driveway where a large debris
dumpster is filled with torn-off dark shingles, beside a pickup truck and an
extension ladder leaning against the house. One worker in a high-visibility
yellow shirt and sun hat walks across the driveway carrying a bundle, small in
frame. Blue tarp spread on the lawn catching debris. Bright midday sun.
Realistic documentary construction footage, natural color. One continuous
forward drift, no cuts, no editing.
```

---

## 4. NEGATIVE PROMPT (paste into the negative field every time)
```
cuts, jump cut, scene change, multiple shots, montage, transition, split
screen, text, logo, watermark, subtitles, captions, close-up of hands, face
close-up, distorted hands, extra limbs, warped faces, cartoon, illustration,
CGI look, oversaturated, fisheye distortion, timelapse, fast motion
```

---

## 5. SETTINGS + WORKING NOTES

- **Length:** 5s. Kling caps around 5-10s per clip; short is also *why* these
  pass — less time for the eye to find a tell.
- **Aspect:** 9:16 if it's going straight into the vertical ad; 16:9 if you
  want crop room. **Crop BEFORE generation, never after** — the model then
  only has to animate what you kept.
- **Motion:** keep it LOW/slow. Fast drone moves force the model to invent
  detail frame-to-frame and that's where warping shows up.
- ⚠️ **Never push in on texture.** A scale change on a fine-grain plate
  (shingle granules) makes the model invent high-frequency detail — that's
  what dissolved the asphalt into wood-grain streaks last time. **Orbit,
  drift, and rise are safe** (parallax reveals real geometry); push-in is not.
- **Judge at 1:1, not on a contact sheet.** A 520px preview lies — the killed
  clip passed every small preview and failed only at full resolution.
- **Judge at thumb-speed with sound on.** Your buddy couldn't tell; you
  frame-scrubbing at 1:1 could. The cold-viewer test is the real detector.
- **Expect a hit rate, not a hit.** Budget 3-4 generations per keeper. At
  ~7.5cr each that's ~30cr for one usable clip.

## 6. IF A CLIP STILL CUTS
Strip it down. Delete every clause except the camera move and the single
hero subject, then re-add detail one line at a time. Nine times out of ten the
cut is coming from one sentence that implies a second moment in time.
