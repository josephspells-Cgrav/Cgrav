# WO_MATTE — behind-subject compositing spike (GO/KILL)

**Role:** executor. Produce an alpha matte of the speaker from our real take
and PROVE behind-subject compositing works in this rig, or KILL it with a
receipt. This is a spike: working proof > polish.
**Output file:** `C:\Users\josep\Claude Gravity\video-rig\wo\OUT_MATTE.md`
**Source:** `C:\Users\josep\Claude Gravity\video-rig\public\take2-cfr.mp4`
(1080×1920, 30fps CFR, 45.84s, one man outdoors, phone selfie framing).
**Reference device being enabled:** graphics composited BEHIND the masked
speaker (giant clock / floating icons behind him) — see
`vault\wiki\km-ref-schoolofmentors-teardown-2026-08-15.md` §visual-system 4.

## Plan of attack (verify premises; disagree with receipts)
1. Candidate tools, try in this order, first one that works wins:
   a. **robust-video-matting (RVM)** — pip installable, pretrained
      (PeterL1n/RobustVideoMatting), CPU works (slow is fine overnight).
      Python is available (faster_whisper already runs on this box).
   b. **briaai/RMBG or rembg** batch per-frame as fallback (worse temporal
      stability — if you must use it, note flicker honestly).
2. Output an **alpha WebM (VP9 + alpha) or PNG sequence** for a 10s TEST
   SEGMENT first (t=30s→40s, the proof beat) — do NOT run the full 46s until
   the segment proves clean.
3. Compose 3 PROOF FRAMES in Remotion or ffmpeg: background graphic layer
   (any bold test graphic) BEHIND the matted speaker, original footage look
   preserved in front. Save as `wo\matte-proof-{1,2,3}.jpg`.
4. **Paranoia-skim your own output** (standing order): halo/edge artifacts,
   eaten fingers/hair, flicker. Report honestly — a KILL verdict with a
   receipt is a GREEN outcome for this spike.
5. If GO: run the FULL 46s matte, save to `video-rig\public\take2-alpha.webm`
   (or PNG seq dir + manifest), record runtime, and write the exact
   reproduction commands + a Remotion usage snippet (OffthreadVideo/Img
   layering order) in OUT_MATTE.md.

## Rules
- New deps: install into a venv or the rig's existing python env — do NOT
  break the faster-whisper install (`pip list | grep -i faster` first; use
  `pip install --dry-run` sanity if unsure).
- GPU absent — assume CPU; chunk the work; overnight runtime is acceptable.
  If CPU-infeasible, say so with measured it/s and KILL honestly.
- Commit nothing to git; leave artifacts on disk + the OUT file.
- Verdict line at top of OUT_MATTE.md: **GO (full matte ready) / GO-PARTIAL
  (segment proven, full pending) / KILL (reason + receipt)**.
