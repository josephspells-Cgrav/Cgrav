# MABREY LAND CAMPAIGN — PLAN FINAL (post-Kimi distill)

2026-08-05 ~7:45 PM ET · OS46 · Supersedes PLAN_v1 (+ADDENDUM-1). Kimi audit receipts:
`wo/KIMI_OUT_LAND_PLAN.md` (14 findings: F1-F3 launch-killers, all absorbed below).
**This file is the canonical spec (F14); the contract JSON references it.**

## Kimi disposition ledger

| F | Verdict | Disposition |
|---|---|---|
| F1 budget arithmetic | ACCEPT | P2 restructured: persistent per-county agents run lens rounds IN-SESSION (14 harvest agents, not 30); verification always completes — no mid-P3 stop exists in the engine (it's deterministic code) |
| F2 cross-portal dupes | ACCEPT | `parcelId` + `mlsNumber` added; dedupe key priority parcelId > mlsNumber > normalized(address)+acreage fuzzy; P3 attempts county-GIS parcel join |
| F3 lens-2 unshippable | ACCEPT | Inventory lenses now: platform → alt-platform (land-specialist + brokerage sites) → auction/foreclosure/surplus. GIS off-market becomes a SEPARATE deliverable `offmarket` (Sean's scouting list: PIN + acreage + road + county-record link; owner names NOT harvested — Sean clicks through) |
| F4 buildScore weights | ACCEPT | Score computed DETERMINISTICALLY in P6 code (weights below); Opus J1 supplies only subjective sub-scores (access 0-5, restriction burden 0-5) + kill-flags; county $/acre norms computed from the harvest |
| F5 unverified floor | ACCEPT | Verbatim snippets ≤300ch + code-side containment check; fetch-blocked upgrades to verified-live ONLY via 2-source corroboration; county >40% unverified labeled "unverified-heavy"; `listingType`+`eventDate`, auctions auto-demote after event |
| F6 compliance | ACCEPT | Appendix A below is verbatim law for the site. No photos · no verbatim remarks on-site (snippets are internal verification artifacts, never rendered) · no referral/finder compensation, in writing · all inquiries route to listing source · no MLS/REALTOR marks · opaque customer tokens · noindex |
| F7 staleness ops | ACCEPT | Build-time URL re-check (HEAD + soft-404 string parse) in P6; >14-day verifiedAt auto-demotes at build; weekly re-verify re-run OWNED BY vault-agent (manual, cron candidate — named, not faked); report-dead-listing CTA deferred to Sean's call |
| F8 mid-run injection | ACCEPT | Harvest WIDE (no price cap in queries); ~25% agent budget reserved for a POST-CALL DELTA workflow (may add counties; per-customer-county minimums); J3 customer-matching moves to the delta; if the call never lands the main run still ships county-organized with matching marked pending |
| F9 schema v2 | ACCEPT | Below. floodNote → enum+source; zoning optional-with-source; lat/lng approximate-flagged; $/acre display-only under 2ac; provenance map |
| F10 stop conditions | ACCEPT | Degraded rounds count toward neither dry streak nor cap; platform lens guaranteed a second (pagination/newest-first) round; saturation requires ≥1 successful platform round |
| F11 MLS matrix + fetchability | ACCEPT | S1 deliverables: county→MLS matrix (Doorify/Triangle, Longleaf Pine, run-time confirmed) + per-source fetchability tier + per-domain soft-404 marker strings + fetchable-first routing |
| F12 UI spec | ACCEPT | §UI below. Default sort buildScore among verified-live; unverified collapsed behind toggle; map link = coords pin → county GIS parcel search → omit (never text-address guess); noindex; verbatim Appendix A copy; Sean-phone CTA = open question, absent in v1 |
| F13 knowledge checklist | ACCEPT | Kimi Answer-5 = REQUIRED K1/K2 coverage (IP/ATC semantics, county backlogs + private soil-scientist path, Neuse/Jordan riparian buffers, FEMA buyout kill rule → ALSO a P3 check, PUV rollback, heirs property/UPHPA, NCDOT driveway permits, no-family-exemption myth, Triassic well-yield zones, tap fees/allocation, 12-T + DD fee + no-disclosure-on-land, mineral/timber severance). Citation-mandated |
| F14 two schema homes | ACCEPT | This file canonical |

Missing-sources list (Kimi Answer 1 + MISSING SOURCES) → folded into S1 seed list verbatim.

## Geography (ADDENDUM-1 carried)

RADIUS RULE: ≤90 min drive to Raleigh = inclusion. 80-95 min kept + flagged; >95 excluded.
- TIER 1 (8 agents): Wake · Johnston · Harnett · Franklin · Durham · Orange · Chatham · Granville
- TIER 2 (6 regional agents): NE(Nash+Wilson+Edgecombe-edge) · N(Vance+Person+Warren) ·
  SW(Lee+Moore+Randolph-edge) · SE(Wayne+Sampson) · FAY(Cumberland+Hoke) · W(Alamance+Caswell-edge)
- Named towns map: Raleigh/Cary/Apex/Garner/Fuquay-Varina/Knightdale/Zebulon/Wendell=Wake; Clayton=Johnston.

## Engine (Workflow, ~38-42 agents; Sonnet bulk · Opus J1/J2 · Fable J3)

P1 census (2 Sonnet) → P2 harvest (14 Sonnet, in-session lens rounds, wide, verbatim snippets)
∥ P4 knowledge (3 Sonnet + 3 claim-verify batches, lite depth — stated honestly in method note)
→ [barrier: code dedupe parcelId>mls>addr] → P3 verify (Sonnet batches ~10 lots, URL-health +
on-page extraction + GIS parcel join + FEMA-buyout smell test + status read)
→ J1 (Opus) → J2 completeness critic (Opus) → conditional gap round (≤4 Sonnet + mini-verify)
→ J3 synthesis (Fable). Engine file: `engine/land_harvest_engine.js`.

## Schema v2 (LOT RECORD — canonical)

Harvest fields: title price acres county area address lat lng latlngApprox zoning zoningSource
waterHint sewerHint percStatus septicBedrooms septicSystemType roadFrontage legalAccess roadType
hoa restrictions floodZone floodSource listingType eventDate source url mlsNumber parcelId
listedDate snippet(≤300 verbatim) driveMinToRaleigh notes
Verify adds: status(verified-live|unverified|stale-risk|killed) verifiedAt evidence parcelSource
provenance killReason
P6 adds: id pricePerAcre buildScore buildNotes
Laws: unknown="unknown" never guessed · no live URL ⇒ no ship · **no parcelId AND no mlsNumber AND
no 2-source corroboration ⇒ status ceiling = unverified** (Kimi's One Thing, adopted at the
Kimi-offered demoted-ship strength) · snippets never rendered on the site.

## buildScore (P6 code, deterministic; weights sum 100)

sewer/water 25 (municipal both=25 · one=18 · septic-installed=15 · septic-needed+water=10 ·
both-unknown=8) · perc/IP 15 (approved=15 · none-stated=6 · unknown=5 · expired=3) · access 15
(J1 access0-5 × 3) · price-vs-county-median-$/ac 15 (≤60%=15 · ≤85%=12 · ≤115%=9 · ≤150%=5 · >150%=2)
· kill-flags 15 (none=15 · each flood/buffer/PUV/easement flag −5, floor 0) · drive 10 (≤30=10 ·
≤45=8 · ≤60=6 · ≤75=4 · ≤90=2) · restriction burden 5 (5 − J1 burden0-5, floor 0).
Unknown in a scored field ⇒ that field's "unknown" rung, never interpolated. Golden cases in
`engine/score.test.mjs`.

## UI spec (F12)

Default view: verified-live only, sorted buildScore desc; "Unverified finds (N)" collapsed
section below; stale-risk badged + sorted last within its section. Filters: county chips ·
price · acres · drive-time · text(title/area/county/address). Map link: lat/lng pin else county
GIS parcel search else omitted. Every card: source-named outbound listing link. Drive times
labeled "est." noindex,nofollow meta. Payload budget: lots.json ≤300KB, no webfonts, no images.
Palette: Mabrey navy #0e2140 / red #c02026 accent-scarce. A11y: labeled controls, contrast ≥4.5.

## Appendix A — site legal copy (VERBATIM, the only allowed text)

Footer: "Mabrey Roofing and Construction is a licensed North Carolina general contractor
(license #84804), not a real estate broker, and offers no brokerage services. This page is an
informational courtesy for Mabrey build clients. All property inquiries go to the listing
agent or source via each lot's link. Details are believed accurate as of the date shown but
are not guaranteed — confirm everything with the listing source. Lot availability changes daily."
Header sub: "Curated for Mabrey build clients · Not a listing service".
Laws: no listing photos · no verbatim listing remarks · no "call Sean about this lot" · no
compensation of any kind to Mabrey tied to any land transaction · no MLS/REALTOR marks ·
customer preset URLs use opaque tokens (?v=k3x9), never names.

## Open (for Sean's call — unchanged + F12 adds)

Per-customer county/town · budget · acreage · realtor status · urgency · domain/branding ·
Sean's phone on the site? · report-dead-listing contact address.

## Receipts

PLAN_v1 + ADDENDUM-1 · wo/KIMI_{BRIEF,OUT}_LAND_PLAN.md · this file ·
engine/land_harvest_engine.js · site/ · vault: km-mabrey-land-campaign-2026-08-05 (on completion)
