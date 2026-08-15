# WO_AUDIO — the missing lane: SFX + bed + −14 LUFS master (RealBB v6)

**Authored inline (Fable). Judgment decisions pinned below; builder implements.**
**Gated on:** OUT_SCOUR.md §F (license-safe SFX sources + the loudnorm chain) —
read it first; where it names better sources than this WO assumes, follow SCOUR
and log the substitution.

**The measured target (from the reference, probed):** momentary loudness DEAD
FLAT −14/−15 LUFS for the entire runtime. Voice-forward. Zero dips, zero dead air.

## The audio design (pinned)
Working on `out/RealBBv6-raw.mp4` (exists after WO_HOOK_SPECTACLE) — audio
work happens as a POST pass (ffmpeg filter graph or a Remotion <Audio> layer
set — builder's call; ffmpeg post is fine and faster to iterate).

1. **VOICE** — the take's own audio, untouched timing, always on top.
2. **SFX hits** (small, tasteful — this is a 46s DR ad, not a trailer):
   - T2 "OVERPAY" takeover land (~0.9s): low thud + soft whoosh-in
   - T3 word builds (×3, ~2.6-4.0s): short percussive tick per word-group land
   - each 2A graphic land (G1 20.6 · G2 24.6 · G3 27.3 · G4 37.4): one soft
     whoosh + subtle impact, SAME sample family across all four (consistency
     is the style)
   - b-roll cut points (7): NOTHING on most — only the symptom-montage
     entries (12.16 curl, 14.02 stain, 15.55 bill-graphic) get a barely-there
     tick. Restraint law: if it reads as "edited," it's too loud.
   - map pin drop (~33.5): one soft pop + faint ripple shimmer
   - end card (43.5): riser INTO it (0.6s) + soft resolve thud
   SFX gain staging: peaks ≥12dB under voice. When in doubt, quieter.
3. **BED** — one continuous instrumental bed, minimal/warm (lo-fi beat or
   soft pulse, NOT orchestral, NOT trailer), sidechain-ducked under voice
   (`sidechaincompress` ratio ~4:1, threshold tuned so bed sits ~18dB under
   voice during speech, swells slightly in the 0.3s gaps). Source per SCOUR §F
   (license-safe only — this ships in a client ad). If no safe bed source
   materializes tonight, ship SFX-only + state it: a wrong-license bed is a
   FLOOR violation, silence is not.
4. **MASTER** — two-pass `loudnorm` to I=−14 LUFS, TP=−1.0, LRA≤7. Print the
   measured JSON from pass 1 and the final integrated number in the OUT file.

## Verify (before reporting)
- `ebur128` momentary curve on the final: flat within ±1.5 LU across 0-46s
  (no dead-air dips) — paste the 5s-bucket numbers.
- A/B the voice: intelligibility must be IDENTICAL to the dry cut — if any SFX
  masks a word, drop that hit.
- Deliver `out/RealBBv6-audio.mp4` + `wo/OUT_AUDIO.md` (what was used, from
  where, license line per asset, gain decisions, loudnorm receipts).
