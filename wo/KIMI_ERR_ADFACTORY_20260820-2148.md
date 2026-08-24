• Let me read the SKILL.md file.Now audit. Let me think through findings systematically.

  **Internal contradictions:**

  1. Stage 1 says "sample ~3 frames per shot (start/mid/end) and LOOK at them" then later in the same stage says "One frame per shot is a SAMPLE; judge quality only from multiple frames." Not a contradiction — consistent actually. OK.

  2. PREFLIGHT checks `node_modules present in video-rig` but doesn't check LosslessCut (listed in tool inventory for Stage trim/harvest). Minor: inventory row vs preflight gap. Also doesn't check `wo/OUT_AUDIO.md` / `audio-assets/` / `AUDIT.md` / client config dir presence. Minor.

  3. Stage 6 says "caption text == repaired transcript (diff, zero mismatches)" — but Stage 2 says money atoms merge into one caption token BEFORE chunking; captions are chunked/split display-wise. If captions are chunked tokens merged, a literal diff of caption text vs transcript would mismatch (merged tokens, punctuation, per-word timing). Mechanically checkable? Ambiguous — diff between what two artifacts? The captions are composited into video; is there a caption text file to diff? The skill never names a caption text artifact (e.g., an SRT or the JSON fed to Remotion). Exploitable ambiguity / QA not mechanically checkable as written.

  4. Stage 6: "loudness probe ≈ −14 LUFS" — undefined tolerance ("≈"). Minor: undefined threshold.

  5. Stage 6: "duration within spec" — "the spec" is never defined anywhere. Exploitable ambiguity.

  6. Stage 6: "first 2s carries the hook" — not mechanical; subjective. Contradicts "Mechanical checks, all of them". Internal contradiction: the section header claims all checks mechanical but includes subjective ones ("wrong noun/unclear = FAIL" is the blind pass; "first 2s carries the hook" is judgment).

  7. Sequencing: Stage 3 says re-listen to every auto-cut touching a money atom — fine. Stage 4 says license logged per asset in delivery report. Fine.

  8. Stage 5 money config: "No config for the client → build the config FIRST and show the user the money-atom values." Floor 1: "renders ONLY from the client config the user has seen." But what about config EXISTS but values changed verbally (the audit prompt item)? Floor says "New or changed money values = shown to the user before render" — covered, arguably. But there's no mechanism to detect changed values — how would a session know values changed? Verbal changes from user: if user says "make it $99 now," the skill doesn't explicitly say update config then show... Actually floor 1 covers showing. But there's an exploitable ambiguity: "the user has seen" — seen when? A config seen last month counts? No re-confirmation requirement per job. Also the money-eyeball happens only on config creation path; on existing-config path nothing forces the user to see values each render. QA checks money atoms match config values, not that values match reality. So floor leak: config is the single source of truth but nothing validates config against actual current offer. MINOR/MAJOR — the failure mode "client config exists but money values changed" is handled only if the session knows; stale config silently renders. Also: who builds config on creation — the session invents values? "build the config FIRST and show the user" — values presumably come from the user, but not stated that user SUPPLIES (vs session drafts and user approves). Actually showing for approval is fine-ish, but the user must supply values; ambiguity: session could draft plausible numbers and user rubber-stamps. Minor.

  9. Failure mode: footage has no usable take of a scripted beat — not addressed. Beat selection assumes a best take exists. Missing failure mode: escalate/flag gap, mark ad incomplete or request reshoot. MAJOR (missing).

  10. Whisper fails on accent/noise — Stage 2 assumes whisper timestamps on every take; no fallback (manual alignment, flag low-confidence). The ASR repair table handles brand names but not wholesale failure. Missing failure mode. MAJOR/MINOR.

  11. Ingest folder mixed clients — Stage 0 defines `ingest/<client>/<date>/` structure but nothing about what to do when a dump contains mixed clients in one folder or unidentified client. Missing: refuse/sort/ask. MINOR.

  12. Render fails QA twice — no loop bound, no escalation. Stage 6 says "whole set re-audits after every fix" — infinite fix loop possible; no "after N failures, stop and escalate." Missing failure mode. MINOR/MAJOR.

  13. deep-filter binary missing — PREFLIGHT checks `--version`, miss → "fix before promising an ad." But "fix" — pip build is broken on Windows per the table note; so the fix path is unclear (re-download release binary?). Also missing-failure-mode: what if it fails mid-run (crashes on a wav)? Stage 3 has no fallback — is denoise skippable? "A stage's tool is not optional decoration — skipping a stage means saying so in the delivery report" — that line creates an escape hatch: any stage can be skipped by merely noting it in the report. That's an exploitable ambiguity/escape hatch: denoise skipped, QA blind pass skipped, even backup gate? Well, skipping with a note — the note discharge is too cheap for some stages. MAJOR: the blanket "skipping a stage means saying so in the delivery report" lets QA (Stage 6) or money-eyeball... well floors are separate. But Stage 6 QA is a stage — technically skippable with disclosure. That contradicts "before the user ever sees it" force and Stage 7 requiring "QA results" in report. Exploitable.

  14. Floor 4 faces: "internal drafts exempt" — undefined what marks output as internal draft vs ad; output path is same `out/<client>/<name>-vN.mp4`. No naming/marker distinguishing draft from runnable ad except the delivery report marking NOT-RUNNABLE. A flagged NOT-RUNNABLE file sits in same out/ dir — nothing prevents it being used. Exploitable ambiguity: marking is report-only, no filename suffix or watermark. MINOR/MAJOR floor leak — "a face could ship without a release": the floor relies on the report label only; the mp4 itself is unmarked. Also who checks release on file — where's the release registry? "No release on file" — on file where? Undefined location → session can't check mechanically → exploitable. MAJOR.

  15. Floor 3 honest claims: applies to captions/VO. But Stage 5 money card/proof chips/offer banner — proof chips could carry invented counts ("500+ roofs")? Floor 3 covers it generically. The QA checks money atoms vs config but honest-claims (proof chips content) have no mechanical check and no source-of-truth artifact — config has money atoms but proof claims? Config includes "end-card text, money atoms" — proof chips content source undefined. Exploitable: session could invent proof chip text ("Trusted by hundreds") — honest claims floor says no invented counts/testimonials; "trusted by hundreds" is a count-ish claim. Check coverage: QA mechanical checks don't include claims audit vs any artifact. MINOR.

  16. Backup gate: "No second copy → say so in the first status line and get one made." Then... editing begins only after copy made? "get one made" — who makes it? Session can copy to second disk itself. OK. But "say so in the first status line" — if session never sends status lines (autonomous run), gate could pass silently. Minor. Also gate is soft: it says editing uncopied footage is bad but the enforcement is "say so." Should be a hard stop? It says "must exist in a second location before editing begins" — that's a must, OK, enforcement is the must. Fine-ish.

  17. PREFLIGHT mechanically checkable: `scenedetect version` — actual command is `scenedetect --version`? PySceneDetect CLI: `scenedetect version` is actually a valid subcommand? PySceneDetect has `scenedetect version` command — yes, `scenedetect version` prints version info. OK. `tools/deep-filter.exe --version` — relative path "tools/" relative to what? In inventory it's `video-rig/tools/deep-filter.exe`. Preflight says `tools/deep-filter.exe` — cwd ambiguity; from repo root of working dir (Claude Gravity) tools/ doesn't exist. Minor inconsistency — could fake by running from wrong cwd, get "not found," then "fix." Actually it'd fail visibly. Minor ambiguity.

  18. PREFLIGHT: "node_modules present in video-rig" — presence of dir doesn't prove install integrity; but mechanically checkable. It doesn't check ffmpeg despite Stage 0 requiring ffmpeg for CFR-normalize and ffmpeg being used in loudnorm/loudness probe. Missing preflight item — MAJOR-ish missing failure mode (ffmpeg absent → whole pipeline dead, discovered late). Also ffprobe for probes. Also whisper (build_captions.py deps) not preflighted. MINOR/MAJOR.

  19. LosslessCut in inventory but never referenced in any stage (Stage 0-3 don't mention it; it's "manual" trim). Not a contradiction per se; but "A stage's tool is not optional decoration" — LosslessCut has no stage. Minor.

  20. Stage 2 "never delegated below this tier" — tier language undefined in the skill; what tier is the session? Ambiguous jargon. Minor.

  21. QA: "the whole set re-audits after every fix" — "set" undefined for a single-ad pipeline; inherited from AUDIT.md maybe. Also self-audit — "blind" QA run by the same session that made the ad is not blind; nothing requires a fresh context/subagent for the blind pass. Exploitable: "blind" claimed by same-eyes session. MAJOR (QA fakeable): "Run the AUDIT.md blind pass" — if AUDIT.md requires fresh session, fine, but as written the skill doesn't enforce separate context; "self-audit pipeline" in the inventory even calls it self-audit — contradicts "blind." Internal contradiction: inventory "Blind QA | self-audit pipeline" — blind vs self. MAJOR/MINOR.

  22. Stage 6 "duration within spec" — spec undefined (client config? brief?). Noted in #5.

  23. Money copy floor leak via captions: money atoms come from transcript (spoken) AND config. If the spoken money line in footage says a different number than config (stale footage), QA check "every money atom ... matching the client config values" would fail render — good. But which wins? It fails, then what — no escalation path. Minor.

  24. CFR-normalize command truncated: "ffmpeg -i in.mp4 -vf fps=30 -crf 16 ..." — ellipsis in a "pipeline law" command; the "..." hides audio handling (-c:a copy? re-encode? audio resample?). Ambiguity but it's in a code snippet, ellipsis acceptable shorthand? Given full-output-enforcement ethos, a law with "..." is exploitable — session fills gaps (could drop audio: forgetting -c:a could... actually default ffmpeg includes audio re-encode). Minor.

  25. Nothing auto-posts floor vs description "the factory's output is always a file awaiting a human eyeball" — consistent.

  26. Money eyeball: Stage 5 new-config path shows user money atoms. But changed-value path on existing config: floor 1 says "New or changed money values = shown to the user before render, full stop." Good. But nothing requires showing on EVERY render with existing unchanged config — the law says money copy "renders ONLY from the client config the user has seen" — "has seen" past tense, satisfied forever after first view. Stale-config risk: values changed by client verbally to Joseph — session can't know; Joseph updates config presumably. Acceptable? The audit prompt asks: "client config exists but money values changed verbally" — if the USER says values changed, floor 1 triggers. If client told user, user knows. If user tells session "client says it's now $89" — session must update config and show before render — floor covers "changed money values = shown." OK. But subtle leak: QA verifies render matches config, never that config matches user intent at render time. I'd flag as MINOR with the "user has seen" having no freshness/per-job confirmation.

  27. Stage 7 delivery report required contents list doesn't include the face-release/NOT-RUNNABLE status (floor 4 says flag in report — OK it does mention flagging). Fine.

  28. Stage 3 auto-editor "margins on" — no value; re-listen requirement is human/session listening — session can't literally listen; it can probe. "re-listen to every auto-cut that touches a money atom" — how does a session re-listen? Mechanically: re-transcribe the cut region? Undefined mechanism → fakeable. MINOR (mechanically checkable? no). Same with "LOOK at them" frames — session can ReadMediaFile frames, OK that's checkable.

  29. Stage 4 "the SCOUR §F numbers govern on any conflict" — SCOUR undefined in skill; external reference. Fine as pointer but a session without SCOUR can't resolve conflicts. Minor.

  30. Composition section: "`verify-before-claim` (before any 'the ad is done')" — good, but that skill name isn't in available skills list (user has it? it's referenced as a law "verify-before-claim" — fine).

  31. Stage 6: "caption text == repaired transcript (diff, zero mismatches)" — also money atoms merged into single tokens means caption tokens ≠ transcript words → diff zero mismatches impossible unless diff is token-merge-aware. Contradiction with Stage 2 merging. MAJOR internal contradiction: mechanical check as written cannot pass on money lines, or session interprets loosely → fakeable. Yes — Stage 2: "MONEY ATOMS never split: '$X a month'... merge into one caption token before chunking." So caption token stream differs from transcript word stream. A naive diff fails; a smart diff undefined. Contradiction/ambiguity.

  32. PREFLIGHT doesn't check ingest dir second-disk backup capability, client config presence, whisper. Noted.

  33. "Any miss → fix before promising an ad" — "fix" for broken pip build noted in table; fine.

  34. Stage 1: catalog requires "sample ~3 frames" but scenedetect save-images saves 3 per scene by default? save-images default is 3 images per scene — fine.

  35. Ordering: Stage 2 needs whisper before Stage 3 denoise? Whisper on denoised audio would be more accurate, but stage order is transcribe (Stage 2) before denoise (Stage 3). Is that a contradiction? Whisper on raw audio is fine for selection; denoise later. Not a contradiction.

  But whisper failure on noise — transcript from noisy audio may be garbage → wrong take selection. Missing fallback. Noted.

  36. Stage 0 "Anything there is work; anything elsewhere needs the user to point at it once, then gets moved in." — moved = destructive-ish (move vs copy); with backup gate ordering: move before or after backup? Moving the only copy is risky. Minor ambiguity — "moved" vs "copied in" conflicts with one-disk law spirit. MINOR.

  37. No stage covers hook variants: doctrine says "shoot every hook variant available" — shooting is field work, not pipeline. Fine.

  38. QA mechanical check "every money atom present" — present where? In captions? VO? money card? Ambiguous scope. Minor.

  39. Release registry location undefined (floor 4 "on file"). Noted (#14).

  40. Ingest mixed clients — noted (#11). Also "client" determination when folder name ambiguous — nothing.

  41. What about "the user has seen" for config — delivery could happen without any user eyeball if config pre-exists: money copy rendered, QA passes, file delivered — user sees report at delivery. That's the design (deliver-for-eyeball). Floor is user sees VALUES before render only for new/changed. Stale-but-seen config is a real leak vector for changed-verbally-elsewhere scenario but the user is the one who'd change config. I'd flag: no per-render money recitation in delivery... Actually Stage 7 report doesn't require listing money values rendered — a final-eyeball aid. MINOR: delivery report required fields omit the money values shown/rendered, so user's final eyeball must watch the video to verify numbers; adding values to report would catch config drift. Reasonable minor finding.

  Now verdict: AMEND-NEEDED.

  Organize findings MAJOR/MINOR with exact quotes, numbered.

  MAJOR candidates:
  1. Stage-skipping escape hatch (§premise "skipping a stage means saying so in the delivery report") — discharges QA/backup/denoise with a note; contradicts Stage 6 "before the user ever sees it" and Stage 7 requiring "QA results."
  2. Caption diff contradiction (Stage 2 merges money atoms vs Stage 6 "diff, zero mismatches").
  3. "Blind" QA is self-audit — no separate-context enforcement; fakeable. Inventory: "Blind QA | self-audit pipeline".
  4. Face-release floor: no registry location, no marking on file itself, "internal drafts exempt" undefined path — floor leak.
  5. Missing failure modes: no-usable-take; whisper failure; QA-fail loop bound; deep-filter mid-run failure (no fallback, and pip build broken so preflight "fix" unclear).
  6. Stale config money leak — QA checks render==config, nothing checks config==current offer; "user has seen" has no freshness. Maybe MAJOR as floor leak or MINOR. I'll make it MAJOR-ish? The floor leak category #4 in audit: "any path by which money copy could render without the user seeing values" — with pre-existing config, money renders without user seeing values this job. That's technically by design but combined with no money values in the delivery report, a stale config ships wrong numbers with user none the wiser until watching. I'll call it MAJOR floor leak: "renders ONLY from the client config the user has seen" is satisfied by a months-old viewing; no per-job confirmation or report recital.

  MINOR:
  7. PREFLIGHT gaps: ffmpeg/ffprobe absent (used in Stage 0 fps normalize, loudnorm, probes), whisper/build_captions deps, LosslessCut listed in inventory but never preflighted nor staged, client config dir, wo/OUT_AUDIO.md presence. Relative path `tools/deep-filter.exe` cwd ambiguity.
  8. Subjective checks under "Mechanical checks, all of them": "first 2s carries the hook", "duration within spec" (spec undefined), "≈ −14 LUFS" (tolerance undefined).
  9. "Re-listen to every auto-cut that touches a money atom" — no defined mechanism for a session; fakeable.
  10. Ingest mixed clients: no rule; "gets moved in" — move vs copy risk against backup law.
  11. CFR normalize command has "..." — law-grade command with elision.
  12. "never delegated below this tier" — tier undefined.
  13. Delivery report required fields omit rendered money values (final eyeball aid).
  14. Proof chips/claims have no source artifact or QA check (honest-claims floor unenforced mechanically).
  15. LosslessCut inventory row has no stage (dead row) — merge with 7.
  16. Money atom mismatch (spoken ≠ config) fails QA with no escalation path — covered under 5 loop bound.

  Keep it tight. Verdict: AMEND-NEEDED.

To resume this session: kimi -r session_793ae091-5c1d-4173-bde7-c42ae7f4cdab
