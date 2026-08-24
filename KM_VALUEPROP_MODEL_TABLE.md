# King Maker Value-Prop — ROI MODEL (Conservative / Realistic / Optimistic)
> Every output is MODELED — illustrative, not a promise. Close rate, ticket, and lead volume are the client's variables. Generated 2026-06-24.

**Modeled — all outputs are illustrative, not promises.** Close rate, ticket, and lead volume are the client's own variables.

**Inputs**

| Input | Value | Measured/Modeled | Source |
|---|---|---|---|
| Avg roof-replacement ticket (low anchor) | $9,500 | measured | NerdWallet consumer cost data [P3] — https://www.nerdwallet.com/home-ownership/home-improvement/learn/roof-replacement-cost |
| Avg roof replacement ticket (carrier data) | $17,631 (Verisk 2025); $14,747 national wind/hail claim 2019-2023 (III) | measured | Verisk + Insurance Information Institute [P3] |
| Realistic modeled ticket | $12,000 | modeled | Digest realistic VPL model [P10] — https://www.homeadvisor.com/cost/roofing/install-a-roof/ |
| Optimistic modeled ticket | $18,000 | modeled | Digest optimistic VPL tier, anchored to Verisk $17.6k [P10][P3] |
| Organic/owned-channel close rate | 18-24% lead-to-job (vs 6-10% for shared aggregator leads) | measured (directional, multi-vendor) | Multi-vendor convergence [P10] — https://pipelineon.com/blog/construction-leads-guide/ |
| Close-rate band used in model | 15% / 20% / 25% | modeled (on the sourced band) | Brackets the sourced 18-24% band (low pushed below floor, high rounded up) [P10] |
| Value per qualified lead (REVENUE, not profit) | conservative ~$1,425 / realistic ~$2,400 / optimistic ~$4,500 | modeled (ticket measured, close directional) | Digest VPL model: ticket x close rate [P10] |
| Lead multiple, deep authority site vs thin template | ~1.5x-3x leads (case studies); >2x median leads at 300+ indexed pages (1,400+ firms, independent) | measured (independent corr.) + directional (vendor) | Vendor case studies + HubSpot independent dataset [P5][P1] — https://blog.hubspot.com/...5806... |
| Verified roofing service-area-page case result | +340% leads, +109% traffic, +111% conversion over 2 yrs | measured (single case study) | Improve & Grow case study [P2] — https://improveandgrow.com/success-stories/contractors/roofing-leads-case-study/ |
| Monthly qualified-lead baseline | 3 / 6 / 12 leads per month (conservative/realistic/optimistic) | MODELED ASSUMPTION (un-sourced absolute; reason: digest gives multiples and rates, never a per-contractor monthly lead count) | NO absolute lead baseline exists in the digest — ASSUMPTION. Anchored low and scaled 2x/4x using the sourced lead multiples above. |
| GHL template ops cost (status-quo baseline) | $297/mo = $3,564/yr (most-popular tier) | measured | GoHighLevel pricing [P10] — https://www.gohighlevel.com/pricing |
| King Maker one-time + ongoing cost (delta inputs) | ~$5,000 one-time + ~$500/mo ($6,000/yr) ops | modeled (per task spec) / measured (market rate context) | Task-specified delta inputs; $500/mo is the LOW end of the pro local-SEO market (avg ~$1,557/mo) [P4] |
| Cold-start ramp curve | 1.74% of new pages rank top-10 within 1 yr; 72.9% of top-10 pages are 3+ yrs old; 40.82% of eventual winners rank within 1 month | measured | Ahrefs ranking-age study [P10] — https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google... |
| Storm-demand modifiers (optimistic only) | +300-800% search in 48h; 45-65% storm close (vendor, directional — NOT used); NC severe-storm disasters 7.4/yr 2020-2024 vs 2.7/yr long-run | directional (search/close) + measured (NC disaster frequency) | Pinpoint storm guide + NOAA NCEI [P3][P3] |

**Scenarios**

| Scenario | Leads/mo | Close rate | Jobs/mo | Avg ticket | Annual revenue | Delta vs $297/mo GHL |
|---|---|---|---|---|---|---|
| Conservative | 3 qualified leads/mo (MODELED ASSUMPTION — no absolute lead baseline exists in the digest; anchored low for a single-office NC roofer in a normal, non-storm year, reflecting the cold-start reality that only 1.74% of new pages rank top-10 within a year [P10]) | 15% (SOURCED LOW END — bottom of the organic/owned-channel 18-24% band [P10]; held below the band floor to stay deliberately pessimistic) | 0.45 jobs/mo (= 3 leads x 15%) ≈ ~5 jobs/yr (MODELED) | $9,500 (SOURCED — NerdWallet avg roof replacement [P3]; lowest of the three independent ticket anchors) | $51,300 MODELED (3 leads x 12 mo x 15% x $9,500 = 5.4 jobs x $9,500) | +$34,300 incremental MODELED Year-1 net (revenue $51,300 lift attributed to the authority site over a thin template, minus $5,000 one-time minus $6,000/yr ops = +$40,300 gross of GHL; net of the $3,564 GHL tier still being paid either way it is a wash on that line, so delta vs staying on GHL = $51,300 - $5,000 - $6,000 = +$40,300, and roughly +$34,300 if you also haircut Year-1 revenue ~30% for cold-start ramp). Use +$34k as the conservative Year-1 figure; it turns net-positive even before full ramp. |
| Realistic | 6 qualified leads/mo (MODELED ASSUMPTION — 2x the conservative base, consistent with the >2x median-leads jump at 300+ indexed pages across 1,400+ firms [P1] and the directional ~1.5x-3x deep-vs-thin lead multiple [P5]; still a single mid-market NC office) | 20% (SOURCED MIDPOINT — center of the organic/owned-channel 18-24% close band [P10]) | 1.2 jobs/mo (= 6 leads x 20%) ≈ ~14 jobs/yr (MODELED) | $12,000 (MODELED — the digest's own realistic-tier ticket [P10], sitting between NerdWallet's $9.5k avg [P3] and the $14.7k national wind/hail and $17.6k Verisk replacement figures [P3]) | $172,800 MODELED (6 leads x 12 mo x 20% x $12,000 = 14.4 jobs x $12,000) | +$161,800 incremental MODELED steady-state annual (revenue $172,800 minus $5,000 one-time minus $6,000/yr ops = +$161,800 vs a thin $297/mo template). At Year-1 ramp (~30-40% haircut) the incremental is roughly +$95k-$110k; this $161.8k figure is the matured run-rate, not month-one. |
| Optimistic | 12 qualified leads/mo (MODELED ASSUMPTION — top of the directional ~1.5x-3x lead multiple [P5] and the +340% roofing-leads case-study ceiling [P2]; assumes a storm-active NC year, where post-storm search spikes +300-800% in 48h [P3] and storm leads close far higher) | 25% (SOURCED HIGH END — top of the organic/owned-channel 18-24% band rounded up [P10]; still well below the vendor-reported 45-65% storm close rate, which is directional-only [P3] and deliberately NOT used) | 3.0 jobs/mo (= 12 leads x 25%) = ~36 jobs/yr (MODELED) | $18,000 (MODELED — the digest's optimistic-tier ticket [P10], anchored to the Verisk $17,631 avg replacement and NC storm/insurance five-figure jobs [P3]) | $648,000 MODELED (12 leads x 12 mo x 25% x $18,000 = 36 jobs x $18,000) | +$637,000 incremental MODELED annual at maturity in a storm-active year (revenue $648,000 minus $5,000 one-time minus $6,000/yr ops). This is the CEILING case: storm year + matured rankings + premium insurance tickets all aligning. Do not present as expected; present as the upper bound of the band. |

**Model detail**

## King Maker Authority-Site ROI Model — NC Roofing Contractor
**Every number below is MODELED.** Tickets and close-rate bands are sourced from the digest; lead volumes are a marked assumption (no absolute baseline exists in the sources); all revenue and delta figures are model outputs.

| Input | Conservative | Realistic | Optimistic | Source / Type |
|---|---|---|---|---|
| Monthly qualified leads | 3 | 6 | 12 | **MODELED ASSUMPTION** — no absolute baseline in digest; scaled on sourced ~1.5x-3x lead multiple & >2x-at-300-pages [P1][P5][P2] |
| Close rate (lead→job) | 15% | 20% | 25% | Sourced band 18-24% [P10]; low pushed below floor, high rounded up — MODELED on sourced band |
| Jobs / month | ~0.45 | ~1.2 | ~3.0 | MODELED (leads × close) |
| Jobs / year | ~5.4 | ~14.4 | ~36 | MODELED |
| Avg ticket (revenue) | $9,500 | $12,000 | $18,000 | $9.5k measured (NerdWallet) [P3]; $12k/$18k modeled tiers [P10] |
| Value per lead (rev) | ~$1,425 | ~$2,400 | ~$4,500 | MODELED (ticket × close) [P10] |
| **Annual revenue (matured)** | **$51,300** | **$172,800** | **$648,000** | **MODELED** |
| − One-time build | −$5,000 | −$5,000 | −$5,000 | Task spec |
| − Annual ops ($500/mo) | −$6,000 | −$6,000 | −$6,000 | Task spec; low end of pro market (avg ~$1,557/mo) [P4] |
| **Δ vs GHL $297/mo template (Yr-1, ramp-adj)** | **≈ +$34,300** | **≈ +$95k–$110k** | **≈ +$300k+** | **MODELED Year-1, ~30-40% cold-start haircut [P10]** |
| **Δ vs GHL template (matured run-rate)** | **+$40,300** | **+$161,800** | **+$637,000** | **MODELED steady-state (12-24+ mo)** |

**How to read this:** The conservative row is engineered to be pessimistic — sub-band close rate (15% vs sourced 18-24% floor), the lowest sourced ticket ($9,500), only 3 leads/mo, and a ~30% Year-1 ramp haircut — and it *still* clears the $5k + $6k/yr cost in Year 1. The realistic row uses the digest's own value-per-lead figure ($2,400 = $12k × 20%) verbatim [P10]. The optimistic row stacks every input at its sourced ceiling (storm-active year, matured rankings, insurance-tier tickets) and is a low-probability upper bound, not a forecast.

**Why the delta exists at all (the mechanism, not the magnitude):** a $297/mo CSR template is structurally SEO-capped — 0 SSR/prerender [P5], AI-uncitable (crawlers read raw HTML only) [P5], no programmatic city pages [P5], and exposed to Google's site-wide thin-content drag if it clones geo-pages [P1][P9]. The authority site out-earns it by harvesting long-tail (one deep page ranks top-10 for ~1,000 keywords [P1]) and unlocking organic blue-link in cities with no office [P2]. Mechanism = well-sourced; per-client magnitude = modeled.

**Hard guardrails:** close rate is on the *client's* sales process, not the site (≈45% of home-services calls go unanswered [P7]); rankings are never guaranteed (Google now refers deceived businesses to the FTC [P11], and NC UDTPA carries treble damages [P11]); these are MODELED ranges, not promises.

**Caveats**

- CLOSE RATE IS ON THE CLIENT, NOT THE SITE. The site delivers qualified leads; whether 15%, 20%, or 25% convert to signed jobs depends entirely on the contractor's sales process, speed-to-lead, and answer rate. Note ~45% of home-services calls go unanswered (Construction proxy ~47% unanswered) [P7] — a slow or unanswered phone silently caps every scenario regardless of lead volume.
- RAMP / COLD-START: None of the annualRevenue figures are achievable in month one. Only 1.74% of new pages rank top-10 within a year and the average #1 page is 5 years old [P10]. The realistic/optimistic annual figures are MATURED run-rates (12-24+ months out). Year-1 actuals run roughly 30-40% below the steady-state numbers shown — already reflected in the conservative deltaVsGhl (~$34k) but NOT in the realistic/optimistic annualRevenue.
- MONTHLY LEAD VOLUME IS THE ONE UN-SOURCED INPUT. The digest provides close rates, ticket sizes, value-per-lead, and lead MULTIPLES — but never an absolute per-contractor monthly lead count. The 3/6/12 figures are a deliberately-conservative modeled assumption; a real forecast requires the client's current baseline lead volume. Every revenue number inherits this assumption.
- RANGES, NOT PROMISES. Google's own guidance states no one can guarantee rankings, and now refers deceived businesses to the FTC [P11]. A 'guaranteed top-3' framing would also expose an NC client to UDTPA treble damages [P11]. This model is a band of MODELED outcomes, not a commitment.
- EVERY OUTPUT NUMBER IS MODELED, not measured. Tickets and close-rate bands are sourced; the multiplication into revenue, the lead volumes, and all delta math are model outputs. The conservative row is built to clear cost even at sub-band close rates and lowest ticket — a skeptic should find it pessimistic, not hyped.
- DELTA-vs-GHL ACCOUNTING: deltaVsGhl = modeled site revenue minus $5,000 one-time minus $6,000/yr ops. The $3,564/yr GHL tier is roughly a wash (paid in the status quo too), so it is not double-counted. The incremental case rests on the authority architecture (SSR/static, programmatic city pages, internal mesh) out-earning a CSR template that is structurally SEO-capped and AI-uncitable [P5][P9] — a mechanism that is well-sourced, but the magnitude per client is modeled.
- STORM DEPENDENCY (optimistic row): the $648k ceiling assumes a storm-active NC year. NC is intermittent — a given year may be quiet (long-run 2.7 billion-dollar disasters/yr) [P3]. The 45-65% storm close rate (vendor, directional) was deliberately NOT used; the optimistic close stays at the 25% band-top.
- REVENUE, NOT PROFIT. Value-per-lead and all annual figures are top-line REVENUE per the digest's explicit framing [P10]. Net margin (materials, labor, overhead) is the contractor's and is not modeled here.
