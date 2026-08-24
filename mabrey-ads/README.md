# Mabrey Roofing — Meta Feed Ad Set (1080×1350, 4:5)

20 creatives. Two lanes, marked by filename prefix. All copy is truthful to
mabreyroofing.com — no invented stats, reviews, or financing claims.

## PRIMARY (cold traffic) — this folder

| File | Angle | Best use |
|---|---|---|
| PRIMARY-01-age-15plus | "Is your roof 15+ years old?" | Core evergreen — lead with this |
| PRIMARY-02-first-drip | "Don't wait for the first drip" | 50+ homeowner skew |
| PRIMARY-03-21-weak-points | 21-point checklist visual | Offer-forward, high trust |
| PRIMARY-04-hidden-damage | "What's your roof hiding?" | Fear/prevention variant |
| PRIMARY-05-military | Military discount | Military-heavy zips (Ft. Liberty corridor) |
| PRIMARY-06-insurance-claims | Claim denied/confusing | Year-round insurance angle |
| PRIMARY-07-summer-heat | NC summer heat | Seasonal — run Jun–Sep only |
| PRIMARY-08-warranty | Dedicated warranty dept | Differentiator/trust |
| PRIMARY-09-report-yours | Risk reversal — keep the report | Skeptic segment |
| PRIMARY-10-family-local | Family owned, not a franchise | Anti-storm-chaser positioning |
| PRIMARY-11-satellite | EagleView satellite measurement | Lowest-commitment offer — test vs 01 |
| PRIMARY-12-sat-space-quote | Measured from space, quoted in writing | Precision + no-visit |
| PRIMARY-13-sat-no-visit | No one on your roof, no one at your door | Privacy/no-stranger angle |
| PRIMARY-14-sat-precision | Precise down to the square foot | Data/accuracy angle |
| PRIMARY-15-sat-time | A quote shouldn't cost you a Saturday | Busy-homeowner angle |

## RETARGETING (warm audiences) — retargeting/

| File | Angle | Objection answered |
|---|---|---|
| RETARGETING-01-still-free | Still on the fence | Inaction |
| RETARGETING-02-keep-report | Report yours, no strings | Commitment fear |
| RETARGETING-03-slots-this-week | Slots open this week | Procrastination |
| RETARGETING-04-no-sales-pitch | Worried it's a pitch? It isn't | Trust |
| RETARGETING-05-what-it-catches | What inspection catches | Value clarity |
| RETARGETING-06-insurance-covered | Past storm damage may be covered | Cost objection |
| RETARGETING-07-military-discount | Military discount reminder | Price |
| RETARGETING-08-quick-visit | 30–45 min, written answers | Time objection |
| RETARGETING-09-warranty-dept | Real warranty department | Trust |
| RETARGETING-10-neighbors-aging | Every roof on your block is aging | Social proof proxy |
| RETARGETING-11-satellite | Start with a satellite measurement | "Not ready for an inspection" |
| RETARGETING-12-sat-just-the-number | Just want the number? Start there | Quote-collector mindset |
| RETARGETING-13-sat-no-appointment | No appointment needed. Seriously. | Scheduling friction |
| RETARGETING-14-sat-see-your-roof | See your roof like we see it | Curiosity/transparency |
| RETARGETING-15-sat-60-seconds | 60 seconds to request, zero visits | Final-rung fallback |

## Campaign notes
- Cold: start with 01, 02, 03 + one more; $50–75/day per ad set. Kill >$60 CPL after ~$150 spend.
- Retargeting: $10–20/day, cap frequency ~3–4/week per person. Rotate creatives when frequency climbs.
- Optimize to cost-per-booked-appointment (target <$150), not CPL.

## Source / re-render
- `ad-4x5.html` — primaries 01–03 (`?v=1..3`)
- `ads-extra.html` — primaries 04–10 (`?v=4..10`) + retargeting (`?rt=1..10`)
- `shoot.py` — renders primaries 01–03
- `shoot-extra.py` — renders primaries 04–10 + all retargeting
- Run with `.venv/Scripts/python shoot-extra.py` from this folder.
