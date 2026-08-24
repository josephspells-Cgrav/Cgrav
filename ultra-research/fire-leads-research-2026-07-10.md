# Fire-Incident Lead Services — Research (2026-07-10)

> Sonnet research agent, 43 tool-uses. Question: what app notifies contractors of structure fires w/ address (+contact) for rebuild lead-gen, does it cover the NC Triangle, and can it feed the Mabrey CRM? Gaps honestly flagged at bottom.

## Ranked services

### Tier 1 — purpose-built commercial fire-lead vendors ("the app" contractors mean)

**① FireNotification.com — strongest offering + the only real integration story**
- Incident address + timestamp, pre-alert before public dispatch notes, **owner/contact data BUNDLED** (owner name, LLC details, phones, sq ft, assessed value, geocoding)
- 300+ node SDR radio network + AI filtering, cross-referenced vs tax/title/municipal records
- **Webhooks + Zapier + HubSpot/Salesforce apps + CSV export** → plugs straight into our `POST /api/leads` intake
- Triangle coverage ❌ NOT confirmed (SoCal/NV/TX + "select markets"; "if your county isn't highlighted, we can activate it") — requires direct contact
- Pricing: quote-only, no long-term contracts

**② Alert Networks (alertnetworks.net)** — county-by-county, implies one-contractor-per-territory exclusivity; flat monthly, quote-only; no API mentioned; Triangle unconfirmed.

**③ FireLeads.com** — email+SMS alerts; smallest footprint (Reno NV office); free trial; weakest evidence of scale; Triangle unconfirmed.

### Tier 2 — free/public tools repurposed
**④ PulsePoint** (CAD-fed public app) — incident + address, NO owner data ever. Wake Co partial (fire-only calls from Cary/Apex/Morrisville excluded, per 2022 forum — stale), Durham/Orange unknown. ⚠️ EULA likely restricts to personal non-commercial use — read before building on it.
**⑤ Broadcastify / scanner DIY** — live feeds confirmed: Wake Co Fire (feed 38216), Durham City Fire (feed 32074). **Durham shows 0% encrypted; Wake fire dispatch = VHF analog** — Triangle fire audio still monitorable (unlike many metros). Raw audio only; the AI-transcription-on-scanner-audio play is literally what FireNotification automates. Industry ethics fault line documented in practitioner forums (scene-adjacent solicitation is resented; wait-until-concluded is the norm among defenders).

### Tier 3 — paging services (IPN/incidentpage.net, Alertpage) — nationwide claims, human dispatchers pushing alerts; contractor-fit unverified.

## Compliance snapshot (NC Triangle)
1. **NC Home Solicitation Sales Act (GS 25A-38–42):** unsolicited door-originated contracts need a written **3-business-day right-to-cancel** notice — or homeowner can rescind anytime.
2. **Per-town solicitation permits:** Cary requires a police-issued visible permit; Wake + Durham counties have no-solicit ordinances on record; Raleigh dropped licensing but RPD recommends visible ID. Check per municipality, no blanket assumption.
3. **Public-adjuster line (GS 58 Art. 33A):** bidding/performing the rebuild = fine; NEGOTIATING the insurance claim amount for the insured = PA license territory (PA cannot work for a contractor; 10% fee cap; referral interests must be disclosed).
4. **TCPA:** emergency exemption does NOT cover solicitation. Cold text/robocall to skip-traced numbers = $500-1,500/message exposure; disaster-victim lists are a plaintiffs'-bar target. **In-person canvass + mail = low exposure; auto-text/call = the danger zone.** Manual live-agent dialing scrubbed vs DNC = the middle.
5. **NC GC license required >$40k/project** (HB 488, 2023) — fire rebuilds routinely cross it; Class 1 misdemeanor unlicensed.

## The standard contractor workflow
1. Incident trigger (vendor alert / PulsePoint / scanner) → address + type
2. Address → owner of record: **free county GIS** (Wake iMaps, Durham County GIS/tax, Orange GIS) — public record, zero exposure
3. Owner → live contact: FireNotification bundles it; else PropertyRadar / BatchData (has API; ~$2k/mo at 100k traces) / PropStream / LexisNexis Accurint / TLO
4. Outreach: in-person (fastest, lowest telecom risk, permit-gated) > mail > manual phone (DNC-scrubbed) >> never auto-blast

## CRM integration verdict (OS18)
FireNotification webhook (or n8n parsing any vendor's email alerts) → `POST /api/leads` w/ source label "Fire incident" → geocode → **fire-layer pins on the existing install map** = door-knock routing screen → speed-to-lead queue. The intake spine shipped in WO_1; this is a config-level add once a vendor is picked.

## Unconfirmed (flagged, not asserted)
- No public pricing on any Tier-1 vendor (all quote-only)
- No vendor publicly confirms Triangle coverage — all require direct inquiry
- PulsePoint Durham/Orange status unknown; Wake data point is 2022-stale
- PulsePoint EULA commercial-use clause not read verbatim
- Broadcastify premium tier pricing inconsistent across sources
