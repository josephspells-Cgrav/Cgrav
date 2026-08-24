• # ADVERSARIAL AUDIT — ad-factory/SKILL.md

  ## MAJOR

  **1. The stage-skip clause is a universal escape hatch that swallows the QA stage itself.**
  Line 20-21: *"A stage's tool is not optional decoration — skipping a stage means saying so in the delivery report."* Every stage — including Stage 6 QA and the Stage 0 BACKUP GATE — is technically dischargeable by writing one sentence in a report the user reads *after* delivery. This directly contradicts Stage 6's *"blind, whole-set, before the user ever sees it"* (line 112) and Stage 7's required *"QA results"* (line 126): a session can "comply" with Stage 7 by reporting "Stage 6 skipped — time pressure." QA and backup need to be non-skippable, or the skip-clause must name which stages it applies to.

  **2. Stage 2 and Stage 6 contradict each other on caption identity.**
  Line 76-77: *"MONEY ATOMS never split: '$X a month' ... merge into one caption token before chunking."* Line 119: *"caption text == repaired transcript (diff, zero mismatches)."* After merging, the caption token stream is definitionally *not* equal to the transcript word stream — on every money line. A literal diff can never pass; a merge-aware diff is never specified, and no caption-text artifact (SRT/JSON fed to Remotion) is ever named as the diff input. As written, the check either always fails (session learns to wave it through) or always "passes" (session eyeballs it and claims zero mismatches). Fakeable in both directions.

  **3. "Blind QA" is defined as self-audit — the blinding is unenforceable.**
  Line 34: *"Blind QA | self-audit pipeline."* Line 114: *"fresh-eyes description of what each section IS, diffed against intent."* Nothing requires a fresh context, subagent, or separate session for the blind pass. The session that selected the takes, wrote the captions, and assembled the comp then "blindly" describes its own work. That is the exact failure mode the blind pass exists to catch, and a session can claim the pass with full compliance theater. "Blind" needs a named owner (e.g., "a context that did not build the ad") to mean anything.

  **4. Floor 4 (faces/releases) has no checkable substrate.**
  Line 140-141: *"No release on file → the face gets flagged in the delivery report and the ad is marked NOT-RUNNABLE."* "On file" — where? No release registry path exists in the skill, so "checked the release" is an unfalsifiable claim. Worse, the NOT-RUNNABLE marking lives only in the report prose; the file at `out/<client>/<name>-vN.mp4` is byte-identical to a runnable ad, and *"internal drafts exempt"* (line 139) defines no draft/runnable distinction in naming or location. Floor leak: a face ships because the marker never touches the artifact.

  **5. Money floor leaks through config staleness.**
  Line 132-134: money copy *"renders ONLY from the client config the user has seen."* "Has seen" is past-tense and perpetual — a config eyeballed in July satisfies the floor in September. QA (line 120) checks render == config, never config == current offer. Combined with Stage 7's report fields (line 125-127) *not* requiring the rendered money values to be recited, the full leak path is: client changes terms verbally → config unchanged → pipeline renders, QA green, report contains no numbers → user approves a file without ever seeing the stale figures. The new-config path (line 102-103) is the only place the eyeball is forced.

  **6. Missing failure modes with no defined behavior:**
  - **No usable take of a scripted beat.** Stage 2's *"A BEAT IS A TAKE"* (line 71) presumes a best take exists per beat. Zero coverage for: all takes of the money line are flubbed/blown out. No reshoot-escalation, no "mark ad incomplete" path — the pressure gradients all point at shipping the least-bad take silently.
  - **Whisper failure.** *"Whisper word-timestamps on every talking take"* (line 70) assumes success. The ASR repair table (line 73-75) patches brand nouns, not wholesale transcription collapse on accent/noise — and transcription runs *before* denoise (Stage 3), so the noisiest audio feeds the selection decision. No confidence floor, no manual-alignment fallback, no abort condition.
  - **QA failure loop.** *"the whole set re-audits after every fix"* (line 116-117) with no bound. Render fails QA twice → the skill says re-audit again, forever. No N-failures-escalate-to-user rule.
  - **deep-filter mid-run failure.** PREFLIGHT (line 38) says *"Any miss → fix before promising an ad"* — but line 30 documents the pip build is BROKEN on Windows, so "fix" is undefined (re-download the release binary? from where?). And if the binary crashes on one wav mid-pipeline, Stage 3 has no fallback and finding #1's skip-clause lets denoise evaporate with a note.

  ## MINOR

  **7. PREFLIGHT is incomplete against the pipeline's own dependencies.** Line 36-38 checks scenedetect, auto-editor, deep-filter, node_modules, ingest dir — but **not** `ffmpeg`/`ffprobe`, which Stage 0's CFR law, Stage 4's loudnorm, and Stage 6's fps/loudness probes all require; not whisper/`build_captions.py` deps; not `wo/OUT_AUDIO.md` or `wo/audio-assets/` presence; not LosslessCut (an inventory row, line 27, that no stage ever invokes — dead row). Also `tools/deep-filter.exe --version` is a relative path with no stated cwd; from the workspace root it resolves nowhere.

  **8. "Mechanical checks, all of them" (line 118) contains non-mechanical items.** *"first 2s carries the hook"* (line 121) is judgment; *"duration within spec"* (line 121) references a spec defined nowhere in the file; *"loudness probe ≈ −14 LUFS"* (line 120) has an undefined tolerance. Each is a compliant-looking checkbox a session can tick by assertion.

  **9. "Re-listen" is unverifiable for a session.** Line 82-83: *"re-listen to every auto-cut that touches a money atom."* A session cannot listen; no mechanical proxy is named (re-transcribe the cut region? probe for clipped onsets?). Fakeable as written.

  **10. Ingest has no mixed-client rule and a move/copy hazard.** Line 42-43: *"anything elsewhere needs the user to point at it once, then gets moved in."* Nothing addresses a dump containing multiple clients or an unidentifiable client — the pipeline's front door silently mis-files work. And "moved" (not "copied") relocates the only copy of footage, in tension with the one-disk law two bullets later.

  **11. A "pipeline law" contains an elision.** Line 50: `ffmpeg -i in.mp4 -vf fps=30 -crf 16 ...` — the `...` hides audio handling in the command that law №1 mandates run on EVERY source. The one command that must be copy-paste-exact is the one with the placeholder.

  **12. Undefined tier language.** Line 68: *"the editor's judgment — never delegated below this tier"* — no tier model exists anywhere in the skill; the session cannot know whether it is above or below "this tier."

  **13. Honest-claims floor has no enforcement surface.** Floor 3 (line 136-137) bans invented counts/testimonials, but Stage 5's component kit includes *"proof chips"* (line 107) whose copy has no source-of-truth artifact (config holds money atoms, not proof claims) and no QA check. A session can invent "500+ roofs installed" on a proof chip and pass every named gate.

  **14. Delivery report omits the money values rendered.** Line 125-127 lists report contents; the rendered dollar figures/terms are not among them — the user's final eyeball gets no at-a-glance recital of the exact claims being approved (compounds finding #5).

  ## VERDICT: **AMEND-NEEDED**

  Findings 1–3 are self-faking gates: the skill's two most important controls (QA, the blind pass, caption integrity) can each be fully "satisfied" in prose while skipped in fact. Finding 4–5 are live floor leaks against the user's standing laws. The doctrine sections are untouched by this audit per scope; every finding above is about enforceability, not taste.

