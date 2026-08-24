I now have everything I need. Let me synthesize the full decision-ready package.

---

# KM UGC Avatar Marketing Agent — Decision-Ready Package

**Source data:** Live Higgsfield API probes (2026-06-03) + vault notes + web research. All Higgsfield model specs are direct API returns, not inferred.

---

## 1. AGENT CHARTER

**Mission.** The UGC Avatar Agent produces King Maker's own Meta video creative — 30-60 second UGC-style ads selling KM's done-for-you contractor website/SEO service to NC home-service contractors (roofing, HVAC, plumbing, electrician, painter, remodel, GC, landscaping, hardscape). It is not a client production tool.

**Identity.** The agent IS the KM spokesperson: a synthetic, consistent, clip-on-mic selfie-cam avatar who appears to be a digital-marketing insider talking directly to contractors. The avatar is NOT "Joseph on camera" — it is a KM-branded character that can be regenerated, updated, and deployed without Joseph needing to appear.

**What it owns.**
- Scripting: 30-60s ad scripts broken into 3-5 clip segments
- Clip generation: Higgsfield API calls for every clip (avatar talking head + B-roll)
- Cost preflight: `get_cost: true` on every generate before spending
- Assembly brief: the clip manifest handed to CapCut/ffmpeg for stitching
- Brand consistency: KM brand kit + avatar element/soul governance

**What it does NOT own.**
- Final assembly/export (done externally — see Section 5)
- Posting/campaign management (Meta Ads Manager / n8n funnel agent)
- Client-site production (separate contractor-template agent)

**Strategic framing.** The vault note `km-meta-noprice-pivot` is explicit: "Creative is the #1 lever — the algorithm finds whoever the creative self-selects." Image-first was forced by Joseph's camera constraint. This agent removes that constraint. Video UGC is the next performance tier.

---

## 2. THE HIGGSFIELD UGC PLAYBOOK

### 2A. Model-per-shot cheat sheet (all specs are live API-verified)

| Shot type | Model ID | Duration | Aspect | Key params | Notes |
|---|---|---|---|---|---|
| **Avatar talking head (primary)** | `marketing_studio_video` | 4-15s | 9:16 | `avatars[]`, `hook_id`, `setting_id`, `generate_audio: true`, `resolution: 1080p` | The UGC preset is the right mode; avatar fed via `avatars` param |
| **Avatar talking head (lip-sync alt)** | `wan2_7` | 2-15s | 9:16 | `medias[role=start_image]` + `medias[role=audio]` | Start image = avatar frame; audio = recorded/TTS voiceover; true lip-sync |
| **B-roll / job site (no people or single subject)** | `seedance_2_0` | 4-15s | 9:16 | `medias[role=start_image]`, `genre: auto`, `resolution: 720p` | Identity-consistent, reference-driven; use Elements `<<<element_id>>>` to anchor scene |
| **Identity-consistent avatar alt** | `seedance_2_0` | 4-15s | 9:16 | Element `<<<UUID>>>` in prompt | Supports Elements (not Soul); multiple placeholders per prompt |
| **Multi-shot / cinematic B-roll** | `kling3_0` | 3-15s | 9:16 | `sound: off` (for B-roll), `mode: std` | Better motion transfer; no native Element support — use as pure B-roll |

**HARD CONSTRAINT confirmed:** All models cap at 15s/clip. A 30s ad needs minimum 2 clips; 60s needs 4-6 clips. Assembly is external.

**Marketing Studio presets available (live):** UGC, Tutorial, Unboxing, Hyper Motion, Product Review, TV Spot, Wild Card. For KM: **UGC** is primary; **Product Review** and **TV Spot** are useful variants.

**Hooks available (live, 9 presets):**
- "Interview" (id: `26cac2dd`) — conversational credibility, works for B2B services
- "Epic Fail" (id: `ec9fdf99`) — pattern interrupt, contractor pain-point angle possible
- "Product Hit" (id: `3d45fb46`) — attention grabber, stunt-style
- "Camera Bump" (id: `2db84ed8`) — casual vlog feel, authentic

**Settings available (live, 14 presets):**
- **"In Car"** (id: `fdfa032c`) — selfie from car seat, casual tone between errands. BEST FIT for contractor audience (they live in trucks).
- **"Street"** (id: `8c95f9ba`) — walking urban street, spontaneous discovery feel.
- **"Office"** (id: `d39dda10`) — desk setup, laptop, professional tone.
- **"Nature"** (id: `10f47b85`) — outdoors, credibility for field-service angle.
- "Roofing" (id: `3cf2164e`) — person on skyscraper rooftop. Note: unrealistic category, novelty value only.

**Recommended setting for KM avatar:** "In Car" first (contractors relate to in-truck footage), "Office" for professional credibility clips.

### 2B. Exact API params for a talking-head clip

```
model: marketing_studio_video
params:
  resolution: 1080p
  generate_audio: true          # Higgsfield generates audio; alt: provide your own via wan2_7
  hook_id: "26cac2dd-..."       # Interview hook — conversational
  setting_id: "fdfa032c-..."    # In Car — contractor-relatable
avatars:
  - id: <KM_AVATAR_ID>
    type: custom                # "custom" for trained Soul or uploaded image
prompt: "[Script clip text here — the words the avatar speaks]"
aspect_ratio: 9:16
get_cost: true                  # ALWAYS preflight; set false to actually generate
```

### 2C. Per-clip cost estimate

**Unknown exactly** — Higgsfield doesn't publish a per-second credit rate in the API schema. The `get_cost: true` param on `generate_video` returns the cost before spending. This is the correct preflight. Do NOT skip it. Budget assumption based on image gen (~0.12 cr/image): video clips are higher; estimate 5-25 cr/clip based on typical AI video pricing, but this MUST be verified via `get_cost` on first test. Current balance: 637.23 credits (plus plan).

### 2D. Avatar setup: what exists and what's needed

**Existing Soul (ready):** "Joe" — soul_id `0b3fb529-89d8-4e3c-91ad-9a480a0db882`, status: ready, type: soul_2. Usable with `text2image_soul_v2` (image gen) and `soul_cinema_studio` (Cinema). **NOT usable with `marketing_studio_video` or `seedance_2_0` or `wan2_7`** — Soul is model-locked to soul_2/soul_cinema only.

**Existing Element (ready):** "Joe" — element_id `b82af239-e6b2-43bb-b087-26f660717675`, status: completed, category: character. Usable with `seedance_2_0`, `kling3_0`, `marketing_studio_video` (via `avatars` param or `<<<element_id>>>` in prompt). **This is the correct avatar for the UGC pipeline.**

**For marketing_studio_video:** Pass the Element in the `avatars[]` array. The API accepts `avatars[].id` with a `type: custom` flag. Use element_id `b82af239-...`.

**For wan2_7 (lip-sync):** Pass a reference frame image (generated from Soul "Joe" or a still from a prior clip) as `start_image` + an audio file as the `audio` role. This is the highest-fidelity lip-sync path.

**Key constraint confirmed:** Soul "Joe" can generate high-quality reference images (via `soul_2` image model) that then feed `wan2_7` as the `start_image`. This gives you Soul-quality face + wan2_7 lip-sync — a two-step pipeline that maximizes identity fidelity.

### 2E. Brand Kit setup (not yet created — ready to build)

The Marketing Studio supports a brand kit with: `brand_name`, `business_overview`, `logo`, `images`, `colors` (hex/rgb/usage), `fonts`, `tone_of_voice`, `tagline`, `products_or_services`, `keywords`. Action: `show_marketing_studio action=create type=brand_kit`. KM spec in Section 4.

---

## 3. THE AD CRAFT RULES

### 3A. Structure for a 30-60s contractor UGC ad

```
Clip 1 — HOOK (0-3s): Pattern interrupt. Stop the scroll.
Clip 2 — PROBLEM (4-12s): Name the contractor's exact pain. Be specific.
Clip 3 — SOLUTION + CREDIBILITY (13-30s): KM's offer. Show outcome, not features.
Clip 4 — PROOF (31-45s): Social proof, result, or analogy. One concrete number.
Clip 5 — CTA (46-60s): Single low-friction action. "Get your free demo."
```

For a 30s cut: compress to Hook + Problem/Solution + CTA (3 clips). This is the smoke-test format.

### 3B. Hook rules (grounded in research + vault)

**Best hook types for a service B2B offer (source: getkoro.app research):**
1. **"Industry Secret"** — "Here's what the top roofing guys in NC are doing that you're not." Leverages authority and exclusivity.
2. **"3 Reasons Why"** — Structured value. Contractors like lists (concrete, time-respecting).
3. **"I Was Skeptical"** — Disarms the "another marketing guy" defense. Start with their objection.
4. **"Problem Agitation (POV)"** — "POV: Your truck is full but your phone isn't ringing in December." Instant relatability.

**Hook timing rule:** First 1-3 seconds is the scroll-stop window. 30% hook rate at 3s is the floor; top performers hit 40-50%. Design for mute: text overlay with the hook visible immediately.

**Hook formula for KM:** Lead with contractor's reality, not KM's offer. Wrong: "King Maker builds contractor websites." Right: "Most roofers in Charlotte get 90% of their work from referrals — and that's terrifying."

**Vault confirmation (direct-response-design-philosophy):** "Specificity beats broad appeal." Name the trade, name the city or region, name the season.

### 3C. Script pacing rules

- **Words per clip:** Target 30-40 words per 10-second clip. Conversational cadence, not read-from-script speed.
- **One idea per clip:** Never bridge two concepts inside one 15s clip — cut is cheaper than confusion.
- **Clip 1 (hook) is visual-first:** Even if audio exists, the visual hook must work on mute (caption overlay or strong visual action).
- **Clip 3 (solution) is the offer frame:** "We build you a site that ranks on Google and brings in inbound calls — handled for you." No price. No features. Outcome only. (Confirmed by vault: no-price pivot.)
- **CTA clip:** Single action only. "Click below to see a free demo built for [trade] companies in [region]." Matches the funnel: Meta ad → demo URL. Low-friction.

### 3D. Caption rules

- Captions on every clip. Meta feed is ~80% watched muted (vault: direct-response-design-philosophy).
- One line per caption, max 6-8 words.
- Bold key phrase on each caption card.
- Assembly tool (CapCut) auto-captions from audio transcript — use this, don't hand-type.

### 3E. Strongest real-ad patterns (vault synthesis)

From `direct-response-design-philosophy` (distilled from FACEBOOK_AD_LIBRARY_RESEARCH.md):
- "Job-site footage consistently outperforms studio creative for trust signals in home services."
- 16-20 second feed videos are strongest for direct-response lead gen (the 30s ad is the safe bet; 60s for retargeting).
- "Negative option hooks ('Most [City] contractors don't realize...') create FOMO without desperation."
- CTA "See If You Qualify" / "Get Your Free Demo" self-selects buyers over "Learn More."

**Known gap:** No live competitor video ad teardowns have been pulled for the KM offer specifically (agencies selling to contractors). This is the job of the `contractor-ad-research` skill + `fb_ad_library` MCP on the first Monday sweep.

---

## 4. THE KM AVATAR + BRAND-KIT SPEC

### 4A. Avatar spec (ready to build)

**Avatar identity:** Male, 30s-40s, clean casual look (not polished suit, not dirty work clothes — the "digital marketing guy who understands your world"). Clip-on lavalier mic visible on shirt/jacket. Selfie-cam framing (slightly above eye level, 9:16 vertical).

**Existing asset:** Element "Joe" (`b82af239-e6b2-43bb-b087-26f660717675`) is already in the workspace. This is the starting point. Unknown: whether this Element has sufficient face quality for UGC talking-head output. The first test gen will reveal this.

**If Element "Joe" needs a better reference image:** Generate a high-quality Soul "Joe" image (model: `soul_2`, prompt: "man in his 30s, clean casual polo shirt, small clip-on lavalier microphone on collar, selfie camera angle, slight above-eye-level, 9:16 vertical, natural indoor light, professional but approachable") and use that as a new Element with `show_reference_elements action=create`.

**Avatar name for scripts:** "Alex from King Maker" or simply "KM Advisor" — not Joseph's name.

### 4B. Brand Kit spec (ready to create via API)

```json
{
  "brand_name": "King Maker",
  "business_overview": "King Maker builds done-for-you Google-optimized websites for home-service contractors in North Carolina. We handle the site, SEO, and local map presence — contractors get inbound calls without chasing referrals.",
  "tagline": "Built for contractors. Built to rank.",
  "tone_of_voice": ["direct", "no-bullshit", "insider", "results-focused"],
  "industry": "Digital Marketing / Home Services",
  "company_type": "B2B service",
  "products_or_services": [
    "Done-for-you contractor websites",
    "Local SEO / Google Maps optimization",
    "Free demo site (no pitch, just results)"
  ],
  "keywords": ["roofing", "HVAC", "plumbing", "electrician", "NC contractor", "inbound leads", "Google ranking", "done for you"],
  "colors": [
    {"hex": "#000000", "rgb": "0,0,0", "usage": "primary background"},
    {"hex": "#C9A84C", "rgb": "201,168,76", "usage": "primary accent / gold"},
    {"hex": "#FFFFFF", "rgb": "255,255,255", "usage": "text on dark"}
  ],
  "fonts": [
    {"name": "Inter", "type": "sans-serif", "usage": "body / captions"},
    {"name": "Bebas Neue", "type": "display", "usage": "hook overlays / headlines"}
  ],
  "social_links": {
    "facebook": "https://facebook.com/[KM_PAGE]"
  }
}
```

**Logo:** Upload KM logo (black/gold) via `media_upload` → `media_confirm` → pass CDN URL to brand kit `logo` field. This step requires Joseph to provide the logo file.

---

## 5. THE PRODUCTION PIPELINE

### Numbered pipeline: brief → export

**Step 1 — BRIEF (agent)**
- Input: trade (e.g., roofing), city/region (e.g., Charlotte NC), hook type, ad duration (30s or 60s)
- Output: 3-5 clip script with word counts and timing

**Step 2 — SCRIPT (agent)**
- Write each clip's spoken words (30-40 words each)
- Write the caption overlay for each clip (6-8 words, bold key phrase)
- Write the visual direction for any B-roll clips

**Step 3 — PREFLIGHT (agent)**
- Call `generate_video` with `get_cost: true` for each clip
- Report total credit cost to Joseph before spending
- Gate: do not proceed without cost confirmation

**Step 4 — CLIP GENERATION (agent → Higgsfield)**
- Talking-head clips: `marketing_studio_video` with Element "Joe", hook_id, setting_id, generate_audio: true, 9:16, 1080p
- B-roll clips: `seedance_2_0` with scene prompt (no people, or single-subject job site)
- Poll `show_generations` for each job until complete
- Save clip URLs + durations to a clip manifest

**Step 5 — ASSEMBLY BRIEF (agent → Joseph)**
- Output: numbered clip manifest with CDN URLs, durations, and caption text per clip
- Include: music suggestion (genre, energy), caption style (font/color from brand kit), transition type (cut — no dissolves for UGC)

**Step 6 — ASSEMBLY (Joseph → CapCut or ffmpeg)**
- Import clips in order
- Apply auto-captions from audio (CapCut: Captions > Auto-generate)
- Add background music at -15 to -20 dB under voice
- Export: 1080x1920 (9:16), H.264, 30fps, <50MB for Meta upload

**Step 7 — EXPORT + UPLOAD**
- Upload to Meta Ads Manager as a new video creative
- Swap into existing adset `6946273895397` or create a new video-only adset
- Run alongside existing image creative to A/B test

### Assembly recommendation: CapCut (primary)

CapCut is the correct tool for this workflow. Reasons: free, purpose-built for 9:16 social vertical, auto-caption from audio (critical for muted-feed compliance), built-in background music library, no render queue wait. ffmpeg is a valid fallback for batch automation but requires manual caption work.

**Honest gap:** Neither CapCut nor ffmpeg is accessible to the agent. The assembly step is a Joseph-manual action. The agent's job ends at the clip manifest + assembly brief. If full automation is needed later, an n8n node calling CapCut's API or a Shotstack/Creatomate integration would close this gap — but that is out of scope for the initial pipeline.

---

## 6. FIRST TEST-GEN

The goal: validate avatar quality, audio sync, and UGC format fit at minimum credit cost, before generating a full 5-clip set.

### Test plan: one 10-second talking-head clip

**Target clip:** Hook clip only. Clip 1 of a roofing-niche ad. 10 seconds, 9:16, Marketing Studio / UGC preset, "In Car" setting, "Interview" hook.

**Script for this clip (35 words):**
"Most roofers in Charlotte get 90% of their work from referrals. That's great — until a slow season hits and your phone goes quiet. There's a way to get inbound calls coming in every week. Let me show you."

**Caption overlay:** "YOUR PHONE SHOULDN'T GO QUIET IN SLOW SEASON."

**Exact API call (preflight — do not generate until cost confirmed):**

```python
generate_video(
  model="marketing_studio_video",
  prompt="Man speaking directly to selfie camera, casual polo shirt with small clip-on lavalier mic visible on collar, in a truck cab, natural window light, 9:16 vertical UGC selfie format. Speaking words: 'Most roofers in Charlotte get 90% of their work from referrals. That's great — until a slow season hits and your phone goes quiet. There's a way to get inbound calls coming in every week. Let me show you.'",
  params={
    "resolution": "720p",        # 720p for test (cheaper than 1080p)
    "generate_audio": True,
    "hook_id": "26cac2dd-99cb-4818-a678-509b0dab2c32",    # Interview hook
    "setting_id": "fdfa032c-801f-4602-8dfd-1162b0f8c9c9", # In Car
    "get_cost": True             # PREFLIGHT — no spend until confirmed
  },
  aspect_ratio="9:16",
  avatars=[{
    "id": "b82af239-e6b2-43bb-b087-26f660717675",  # Element "Joe"
    "type": "custom"
  }],
  duration=10
)
```

**What to evaluate:**
1. Does "Joe" Element's face render as a consistent character?
2. Does audio sync / lip movement match the spoken words?
3. Does "In Car" setting read as authentic for a contractor audience?
4. Is the UGC selfie framing convincing (not AI-obvious)?
5. Does the clip-on mic prop appear in frame?

**If quality is poor on Element "Joe":** Generate a fresh Soul "Joe" image (soul_2 model, portrait prompt), create a new Element from it, and re-run. This is the iteration path.

**Cost estimate:** Unknown exactly — `get_cost: true` will return the number. Do not spend until confirmed.

---

## 7. OPEN QUESTIONS FOR JOSEPH + HONEST UNKNOWNS

### Questions requiring Joseph's decision

1. **Is the "Joe" Element the right face?** Review the thumbnail at `https://d2ol7oe51mr4n9.cloudfront.net/user_37DL39pvGMePebQ071EJ23Gcy7z/a070b69b-69f3-4a2d-9799-b5bbebc65a8b.jpg`. If this face reads as the KM spokesperson, we proceed. If not, new reference images are needed.

2. **Avatar name?** "Alex from King Maker" / "The KM Advisor" / or anonymous (no name, just the brand)? Matters for scripts and brand kit voice.

3. **KM logo file?** The brand kit requires a CDN-hosted logo. Joseph needs to upload the KM black/gold logo via the media upload flow before the brand kit can be finalized.

4. **Price doctrine (already flagged in vault).** The vault note has an open contradiction: $497/mo (locked) vs $297-497/mo (pivot framing). The CTA clip's wording changes slightly depending on the answer. Current default: no price in the ad (vault confirms no-price pivot).

5. **Assembly preference?** CapCut (manual, free, easy) or is there an automation budget for Shotstack/Creatomate (API-based assembly, costs ~$0.01-0.05/render)?

### Honest unknowns / risks

1. **Per-clip credit cost is unknown until `get_cost` preflight.** The 637-credit balance may cover 25-120 clips depending on the actual rate. This is the single biggest operational unknown. Resolve on first test.

2. **`marketing_studio_video` audio quality with the UGC preset.** The `generate_audio: true` flag auto-generates voice. Quality may be robotic or off-brand. If so, the correct fallback is: (a) use a text-to-speech service (ElevenLabs, etc.) to generate the audio externally, then feed it to `wan2_7` as the `audio` role input for true lip-sync against a reference frame.

3. **Element "Joe" identity consistency across clips.** Elements are single-image references — they may drift between clips. Soul is more identity-stable but is model-locked to soul_2/soul_cinema (no Marketing Studio). The wan2_7 path (start_image from a Soul gen + external audio) may give the best consistency. **This is the #1 thing the test gen resolves.**

4. **Soul "Joe" vs Element "Joe" distinction.** Both exist in the workspace. Soul is for image generation only (soul_2 model). Element is for video generation (seedance_2_0, kling3_0, marketing_studio_video). They appear to be the same person but are separate objects. Do not confuse them.

5. **"Working crew" people prompts in B-roll.** The mission brief flags this as a known Higgsfield limit (soul_2 mangles working-crew scenes). Verified constraint: keep B-roll to single-subject or no-people job-site shots (roofing equipment, ladder, truck, shingles, phone with leads) rather than multi-person crew scenes.

6. **No live competitor video-ad teardowns pulled yet.** The fb_ad_library sweep for agencies/marketing-services selling to contractors has not been run. This is the first task for a Monday ad sweep — it will sharpen the hook language significantly.

7. **Marketing Studio's "UGC" preset behavior with avatars.** The preset is well-documented for physical products. KM is selling a service/outcome, not a physical product. The `webproduct` type (advertise a website/service as a whole) may be the correct product setup in the Marketing Studio instead of `product`. Test both.

---

## 8. PROPOSED VAULT NOTES

Six concept notes to create under `vault/wiki/`:

1. **`km-ugc-avatar-agent.md`** — The agent charter + pipeline overview. Single source of truth for the UGC Avatar Agent's mission, avatar IDs, brand kit ID (once created), and the production pipeline. Links to all sub-notes below.

2. **`km-higgsfield-model-cheatsheet.md`** — Grounded model-per-shot reference: model IDs, param names, duration caps, aspect ratios, avatar compatibility (Soul vs Element), cost preflight procedure. Replaces any inferred/guessed Higgsfield notes. Living document — update after each test gen with actual credit costs.

3. **`km-ugc-avatar-spec.md`** — KM avatar identity spec: Element ID + Soul ID, face description, the clip-on-mic visual detail, persona name decision, and the two-step Soul-image → Element-update pipeline for quality improvement.

4. **`km-ugc-ad-craft.md`** — The ad craft rules: 5-beat script structure, timing per beat, hook type rankings for contractor B2B (Industry Secret, 3 Reasons Why, I Was Skeptical, POV Problem), caption rules, muted-feed design rule, the no-price CTA formula. Links to `direct-response-design-philosophy`.

5. **`km-ugc-assembly-pipeline.md`** — The external assembly step: CapCut workflow (import → auto-caption → music → export spec), clip manifest format, the n8n/Shotstack gap note, Creatomate as a future automation option.

6. **`km-higgsfield-brand-kit.md`** — The KM brand kit: full JSON spec as written in Section 4B, the brand kit ID once created via API, logo upload instructions, and the action=get command to retrieve the current state before any PUT update.

---

**Sources consulted:**
- [UGC Hooks for Video Ads — GetKoro](https://getkoro.app/blog/ugc-hooks-for-video-ads)
- [UGC Scripts Guide — inBeat Agency](https://inbeat.agency/blog/ugc-scripts)
- [UGC Script Templates — UseClip](https://useclip.com/ugc-script-templates-for-5-ad-types)
- [UGC Script Generator — Motionapp](https://motionapp.com/blog/how-to-write-ugc-ad-scripts)
- Higgsfield API live probes: `balance`, `show_marketing_studio` (presets, hooks, settings), `models_explore` (video), `show_characters` (Soul list), `show_reference_elements` (Element list)
- Vault notes: `km-meta-noprice-pivot`, `hub-king-maker`, `km-funnel-live-state-2026-06-01`, `direct-response-design-philosophy`, `premium-ad-curation`