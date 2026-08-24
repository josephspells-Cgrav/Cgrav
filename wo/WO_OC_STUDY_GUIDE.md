# WO_OC_STUDY_GUIDE — Organic Chemistry study guide, one page, deployed

> 2026-08-19 ~12:05am ET, OS58. Builder: Sonnet sub-agent. THE ANSWER KEY IN §3 IS LAW —
> the builder renders it exactly and never re-derives, "improves," or reinterprets chemistry.
> A blind judge will transcribe every rendered diagram and diff it against §3; any mismatch
> is a build defect. Deploy is the ORCHESTRATOR's job, not the builder's.

## §0 Mission
A single static page: **"OC Study Guide"** — all 6 questions from a first-semester organic
chemistry problem set, every answer given, every diagram drawn as clean SVG skeletal
structures with curved arrows. Audience: a student studying for this material. Tone:
teach-the-pattern (each answer carries a one-line WHY), never just answer-dumping.

Output folder: `C:/Users/josep/Claude Gravity/oc-study-guide/` → `index.html` (+ nothing
else needed; single self-contained file, all SVG inline).

## §1 The proven drawing template
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/a549d86c-61fb-45c1-83dc-c613a86b264c/scratchpad/orgo-4b.html`
is a FINISHED, verified sample (Q4B). Read it first. Copy its grammar exactly: white ground,
black skeletal structures (stroke 3, round caps), parallel-line double bonds, **red #c1121f
curved arrows** with the `#ah` marker, **blue #0b5394 circled formal charges**, gray
teaching annotations, Georgia/serif type. Every new drawing follows this system. REUSE the
4B drawing itself for question 4B (embed its SVG, don't redraw).

Layout: one column, max-width ~900px, a numbered section per question, print-friendly
(@media print: avoid page-breaks inside a drawing). Header: "OC Study Guide" + subtitle
"Hybridization · Resonance · Acid/Base · Mechanisms · Substitution/Elimination/Addition".
`<meta name="robots" content="noindex,nofollow">`. No brand, no links, no tracking.

## §2 Drawing conventions (the judge transcribes against these)
- Skeletal zig-zag; CH3 termini written as H3C/CH3 text labels.
- Curved arrow = red bezier FROM the electron source (midpoint of a π bond, a lone pair,
  or a σ bond) TO the destination atom/bond region. Full arrowhead = electron pair;
  **fishhook (half-arrowhead) = single electron** (Q2d only).
- Formal charges: ⊕/⊖ in a small blue circle adjacent to the atom.
- Lone pairs drawn as dot-pairs ONLY where a mechanism uses them (nucleophile attacking).
- Resonance structures separated by ⟷ (double-headed straight arrow); curved arrows drawn
  ON the structure they convert FROM.
- Every sub-answer visibly present: Q2 arrows between EVERY adjacent pair; Q3 one-line
  justification per species; Q6 classification checkbox ticked per reaction (draw the
  3-checkbox group like the 4B sample, tick the right one).

## §3 THE ANSWER KEY (law — render exactly this)

### Q1 — Hybridization (draw each molecule once, label the indicated atoms)
**Structure 1 — 5-membered ring, cyclopenta-1,3-diene, C5 bears OH and a prop-1-ynyl
(C≡C–CH3) substituent:**
- ring alkene carbons (the four CH of the two C=C): **sp²**
- O of the OH: **sp³**
- C5 (the ring carbon bearing OH + alkynyl; four σ bonds): **sp³**
- both alkyne carbons (C≡C): **sp**  · the alkyne's terminal CH3: sp³
Render: draw the molecule, then callout lines from each labeled atom to a small box
reading sp/sp²/sp³.
**Structure 2 — cyclohexane ring; one ring carbon is C=N–CH3 (N-methyl imine); another
ring carbon bears an acetyl group C(=O)CH3:**
- ring C of C=N: **sp²** · imine N: **sp²** (lone pair in an sp² orbital — note this) ·
  N–CH3 carbon: **sp³** · carbonyl C: **sp²** · carbonyl O: **sp²** · **acetyl CH3: sp³**
  (baton F2) · ring CH/CH2: **sp³**
**Structure 3 — mesityl oxide, CH3–C(=O)–CH=C(CH3)2:**
- carbonyl C: **sp²** · both alkene carbons: **sp²** · every CH3: **sp³**

### Q2 — Resonance contributors (arrows on every converting structure)
**a) Methyl vinyl ketone CH2=CH–C(=O)–CH3 — 3 structures:**
 I. neutral (label "major — no charge separation").
 I→II arrow: C=O π → onto O.  II: C–O single bond, O⊖, carbonyl C⊕.
 I→III arrows (draw from I as a second conversion or chain II→III per convention below):
 render as a CHAIN: I ⟷ II ⟷ III where II→III arrows: C=C π shifts to form C=C between
 α-C and carbonyl C; the ⊕ moves to the terminal CH2.
 III: ⊕H2C–CH=C(–O⊖)–CH3 (O⊖ retained, terminal C⊕). Teaching line: "the enone's β-carbon
 is electrophilic — this is why."
**b) 1-phenylethyl ANION (Ph–C⊖H–CH3) — 4 structures:** ⊖ at benzylic → ortho → para →
 ortho′. Arrows (CORRECTED — baton F1): benzylic lone pair → the Cα–C(ipso) BOND (an
 exocyclic C=C forms); simultaneously the C(ipso)=C(ortho) ring π bond → onto the ORTHO
 carbon, which now carries the ⊖. Each subsequent step repeats that pattern, walking the
 charge. 🔴 The arrow NEVER points into the ipso–ortho bond from the lone pair — that
 breaks the ipso octet and would walk the charge to meta. Ring loses aromatic circle — draw explicit alternating
 bonds in the dearomatized forms. Never meta.
**c) 1-phenylethyl CATION — 4 structures:** ⊕ benzylic → ortho → para → ortho′. Arrows:
 ring π → the empty benzylic p orbital, then π walks.
**d) 1-phenylethyl RADICAL — 4 structures, FISHHOOK arrows in pairs** (one electron from
 the ring π joins the radical electron to form the new bond; the other single electron
 lands on the next carbon). Radical dot • at benzylic → ortho → para → ortho′. Note under
 it: "exactly one open-shell atom per structure."

### Q3 — Acid/base classification
Table (text, no drawing needed beyond small structures):
| species | classification | justification (one line each) |
| ⊖C≡N | Lewis base + Brønsted base | carbon lone pair donates; accepts H⁺ → HCN |
| H2N⊖ | Lewis base + Brønsted base | N lone pairs; conj. acid NH3 pKa ≈ 38 |
| CH3CH2Br | Lewis acid (electrophile) | C–Br carbon accepts an electron pair as Br⁻ departs |
| CH3COOH | Brønsted acid | donates O–H proton, pKa ≈ 4 |
| HO⊖ | Lewis base + Brønsted base | conj. acid H2O pKa ≈ 15.7 |
| cyclohexene | Lewis base (weak Brønsted base) | the π bond is the donatable pair |
**B) strength:** NH2⊖ STRONG · HO⊖ STRONG · CN⊖ WEAK (conj. acid HCN pKa ≈ 9) ·
cyclohexene VERY WEAK.
**C)** "A Brønsted acid donates a proton; a Brønsted base accepts one. HCl + NH3: HCl the
acid, NH3 the base."

### Q4 — Mechanisms
**A) PhCH2CH2–Br + NaSH → PhCH2CH2–SH · SUBSTITUTION (SN2), one concerted step.**
Draw: phenethyl bromide left; HS⊖ (with lone-pair dots) below-left; red arrow lone pair →
the C bearing Br (backside); red arrow C–Br σ → Br. Reaction arrow → product PhCH2CH2SH
+ Br⊖. Teaching line: "1° carbon + great nucleophile = one-step SN2, inversion."
Checkboxes: ☑ substitution.
**B) EMBED THE EXISTING 4B SVG** (from §1's sample file) verbatim. ☑ addition.

### Q5 — Why carboxylic acid (pKa≈4) beats alcohol (pKa≈16)
Words: "Acidity is decided by the CONJUGATE BASE. Acetate spreads its −1 over two
equivalent oxygens by resonance (each O ≈ −½) and the carbonyl withdraws inductively;
ethoxide's −1 sits on one oxygen with nowhere to go. A stabler anion = an easier-to-lose
proton = 12 pKa units."
Drawings: acetic acid → (deprotonation arrow, base:⊖ generic) → acetate resonance PAIR
with ⟷ and the arrows (O⊖ lone pair → C–O, C=O π → other O); beside it ethanol →
ethoxide, single structure, ⊖ on O, caption "localized — no resonance."

### Q6 — Products + classification (7 reactions; draw substrate → reagent over arrow →
product; tick one checkbox each)
1. PhCH2CH2Br + KCN → **PhCH2CH2–C≡N** · ☑ substitution · "CN⊖: strong nucleophile,
   weak base → SN2 on the 1° carbon."
2. PhCH2CH2Br + KOH → **PhCH2CH2–OH** · ☑ substitution · "small strong nucleophile, 1°
   substrate → SN2 beats E2."
3. PhCH2CH2Br + KOtBu → **PhCH=CH2 (styrene)** · ☑ elimination · "bulky base can't reach
   the carbon → E2; conjugated alkene is the payoff. Compare #2 — the ONLY change is base
   bulk."
4. 1-methylcyclopentene + HBr → **1-bromo-1-methylcyclopentane** (Br on the ring carbon
   that bears the CH3) · ☑ addition · "Markovnikov: H to the CH, Br to the 3° carbon via
   the 3° carbocation."
5. PhCH2Br + Li⁺ ⊖C≡C–CH3 → **PhCH2–C≡C–CH3** · ☑ substitution · "acetylide carbanion =
   carbon nucleophile; SN2 on the benzylic 1° carbon."
6. propene + HBr, peroxides/light → **1-bromopropane** (Br terminal) · ☑ addition ·
   "radical chain flips the regiochemistry: anti-Markovnikov."
7. propene + 1. BH3 2. NaOH/H2O2 → **1-propanol** (OH terminal) · ☑ addition ·
   "hydroboration-oxidation: anti-Markovnikov OH, syn addition."

## §4 Build laws
- Work ONLY in `C:/Users/josep/Claude Gravity/oc-study-guide/` (create it). Never touch
  any .wt-* worktree, mabrey-*, knight-*, or CRM path. No git. NO DEPLOY (orchestrator's).
- Self-contained single index.html — no external requests, fonts system-stack only.
- After building: screenshot the page full-length via Playwright (run from
  `C:/Users/josep/Claude Gravity/mabrey-roofing`, file:/// URL works,
  `--full-page`), READ your own screenshot, and fix anything visually broken (overlaps,
  clipped arrows, collisions) BEFORE reporting. Iterate until your own read is clean.
- Chemistry text/structures come from §3 verbatim. If §3 seems wrong or ambiguous
  anywhere, STOP on that item and flag it in your report — never silently "fix" chemistry.

## §5 Report
Return: file path, drawing count, your screenshot self-audit findings + fixes, anything
flagged. The orchestrator then runs a BLIND judge (transcribes every diagram with zero
context, diffed against §3) before deploy — build for that audit.
