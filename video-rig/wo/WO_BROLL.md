# WO_BROLL — the 12/10 b-roll experiment (stills → motion → degrade)

**Role:** executor with visual QC. Goal: b-roll clips as close to
indistinguishable-from-real as the stack allows, on the PERMITTED CLASS ONLY
(anonymous texture: roofs, aerials, materials — NO hands, NO faces, NO crews,
NO trucks, NO branding: those are law).
**Output file:** `C:\Users\josep\Claude Gravity\video-rig\wo\OUT_BROLL.md`
**Clips dir:** `C:\Users\josep\Claude Gravity\video-rig\public\broll-v2\`
**Budget: HARD CAP 80 Higgsfield credits.** Check `mcp__f19ec897-…__balance`
BEFORE (expect ≈267.93) and AFTER; log both. Stop generating at the cap even
mid-plan. Load MCP tools via ToolSearch (server prefix `mcp__f19ec897-9966-412b-a1b6-b930f25fce40__`).

## The pipeline being tested
`nano_banana_pro still (exists) → image-to-video (subtle motion) → CFR 30 →
degrade pass → paranoia skim → keep/kill`

## Steps
1. **Model pick:** `models_explore action=recommend` for image-to-video with a
   start frame; price with `get_cost: true`. Prefer the cheap-capable tier
   (Kling-class ~14cr) over premium (Veo ultra 87cr — NOT tonight). Choose
   duration ≈3-5s per clip, 9:16.
2. **Sources (already on disk, 4 exist):**
   `video-rig\public\br4-curl.png` (curling shingles macro) ·
   `br8-aerialstill.png` (NC neighborhood aerial) · `br7-newroof.png`
   (finished roof golden hour) · `br3-oldroof.png` (worn roof).
   Upload via `media_upload`, then image-to-video each with APPEARANCE-ONLY
   subtle-motion prompts, e.g. curl: "static camera, a very slow push in,
   shingle edges tremble almost imperceptibly in wind, nothing else moves";
   aerial: "slow steady drone drift forward, parallax over rooftops";
   newroof: "slow push in, leaves on nearby trees move slightly";
   oldroof: "handheld camera sway only, scene static".
   ⚠️ Known gotcha (receipted): `generate_video_batch` may intercept with a
   PRESET RECOMMENDATION instead of submitting — pass `declined_preset_id`
   to force your own prompt through.
3. **Degrade pass** (the too-polished antidote — realism = added imperfection):
   ffmpeg per clip, iterate by eye:
   - grain: `noise=alls=5:allf=t+u`
   - phone color: slight `eq=saturation=0.93:contrast=0.98` + tiny highlight
     roll-off (`curves`)
   - optional micro-handheld (skip on the drone clip): scale 104% + slow
     sin/cos translate drift, sub-pixel amplitude
   - finish CFR 30, `crf 18`, faststart.
4. **Paranoia skim EVERY output** (standing order): extract 6 frames/clip,
   LOOK at them — morphing geometry, breathing shingles, warping lines,
   melted edges ⇒ KILL that clip (a killed clip with a named defect is a
   good result; do not re-roll more than once per source within budget).
5. **Verdict table** in OUT_BROLL.md: per clip — source · model · credits ·
   motion prompt · degrade recipe · KEEP/KILL + why · honest realism score
   /10 vs real phone footage.

## Rules
- The originals in `public\` are referenced by committed compositions —
  do NOT modify or delete them; write only into `broll-v2\`.
- No git commits. Report spend explicitly. If the MCP misbehaves, fail loud
  in OUT_BROLL.md rather than burning credits probing.
