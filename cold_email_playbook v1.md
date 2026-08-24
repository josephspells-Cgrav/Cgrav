# King Maker Cold Email Playbook

**Version:** 1.0
**Date:** 2026-05-11
**Author:** Joe (with Claude)
**Status:** Live campaign — proof of concept phase

---

## 1. Operating Philosophy

Cold email is a volume game with a delayed feedback loop. Most people quit before they reach the volume where the math works. The economics are unbeatable compared to every other acquisition channel — but only at scale.

**Core principle:** The funnel is built, the copy is proven sound, and infrastructure is clean. The only variable that moves the needle is volume. More emails equal more opens equal more replies equal more calls. Everything else is rounding error.

**Mental discipline:** The "this was too easy" feeling when writing short, effective copy is creative anxiety, not signal. Good copy from a decade of sales pattern recognition feels easy in retrospect because the work happened years ago in the brain. Don't second-guess copy that's already mechanically sound.

---

## 2. The Sequence (Final Version)

### Email 1 — Day 1

**Subject:** `{{companyName}}`

**Body:**

```
{{firstName}} — pulled some visibility data on your market while mapping the {{prospect_city}} region. You're only showing up in about 3 out of 10 areas you probably service on Google.

Want me to send over the full breakdown?

Joe
```

### Email 2 — Day 4

**Subject:** `re: {{companyName}}` (threaded)

**Body:**

```
Bumping this. The data doesn't take long to pull — just didn't want to send it unsolicited.

Joe
```

### Email 3 — Day 7

**Subject:** `re: {{companyName}}` (threaded)

**Body:**

```
Last one from me on this.

I'm mapping one roofing company per city in your region. If that's not you, I'll move on to the next one.

Either way — no hard feelings.

Joe
```

**Total word count:** 94 words across 3 emails. Send timing: Day 1, Day 4, Day 7.

---

## 3. Why The Sequence Works

**Brevity creates curiosity gaps.** Email 1 is 39 words. Short enough that it reads like a text message from someone who knows something you don't, not a marketing email. The brain doesn't pattern-match it as "sales pitch, delete."

**The subject line is intentionally boring.** `{{companyName}}` alone creates productive confusion — "who is this and why are they emailing about my company?" That question is what gets the open. Clever subject lines pre-pitch the email and kill the open rate.

**"3 out of 10 areas" does the work of a paragraph.** The specific denominator forces the reader to do the math automatically. "I'm missing 70% of my market" hits before any persuasion language has to happen. The framing as "areas" not "zip codes" matches how roofers actually talk.

**"on Google" anchors the abstraction.** Without it, "visibility data" is a marketing term. With it, the email is grounded in something every business owner instantly understands.

**Email 2 implies relationship.** "Bumping this" is what you say to someone you already know. "Just didn't want to send it unsolicited" positions the ledger as something valuable enough to require permission — and frames Joe as respectful rather than pushy.

**Email 3 is pure loss aversion.** No mechanism, no education, no selling. "I'm leaving and taking the opportunity with me" + "no hard feelings" disarms aggression while triggering scarcity.

**Why this beats AI-written or polished copy.** 69% of US decision-makers say AI-written emails bother them. Over-aggressive messaging is the top complaint — 65% of cold emails fail because they feel too sales-focused. This sequence sounds like a human and explicitly doesn't push. That's a competitive advantage in 2026.

---

## 4. List Filtering Criteria

**Required filters (set in Instantly or list source):**

- Company name contains "roof" or "roofing" (eliminates general contractor noise)
- Decision-maker level only: Owner, Owner-Operator, CEO, President, CMO, Operator
- No employees, no interns, no junior staff
- US-based contractor businesses

**Recommended secondary filters when available:**

- 50+ Google reviews on Google Business Profile (filters out new/dormant operators)
- Recent review activity (within 90 days)
- Multiple service areas listed on existing website
- Revenue indicator $1M+ where data exists (employee count proxy works)

**Verticals to expand into (in priority order):**

1. **HVAC** — 100,000+ businesses nationally. Same location architecture problem. Same owner-operator decision maker. Same cold email approach. 3x the size of roofing.
2. **Plumbing** — 120,000+ businesses. Commercial work has high ticket sizes.
3. **Solar installers** — Smaller list (40K-50K) but $25K-$50K average tickets.
4. **Garage door companies** — Underrated, 50K+ businesses, almost zero competition for sophisticated SEO outreach.
5. **Restoration contractors** — Fire/water/mold damage. Smaller list (30K) but $20K-$80K tickets.

**Verticals to avoid:**

- Solo operators under $300K annual revenue (can't afford the program, shouldn't buy it)
- Landscaping/lawn care (low average ticket, low marketing sophistication)
- Anything serviced by W-2 employees rather than owner-operators

---

## 5. Infrastructure Setup

**Current state (proof of concept):**

- 2 domains: `labskingmakerseo.com` + secondary
- 10 inboxes total, 5 per domain
- 30 emails/day per inbox = 300/day capacity
- Pre-warmed accounts via Instantly
- All accounts at 90%+ health score

**Scale state (post-validation):**

- 4-5 domains, 4 inboxes per domain
- 30-40/day per inbox = 500-800/day capacity
- Total monthly send capacity: 15,000-24,000 emails

**Critical operational rules:**

- Never bump send volume by more than 25% in one day, regardless of health score
- Health score is a lagging indicator — wait 3-4 days after volume changes to assess
- If any inbox drops below 90% health, pause that inbox and redistribute its sends
- Always send from real-name @branded-domain addresses (joe@kingmakerseo, j@kingmakerseo, etc.)
- Delete "pre-made" accounts that don't match the signature in the email — credibility leak

**Send timing:**

- Sunday between 7-9am local time is optimal for contractor inboxes
- Saturday start works (lower inbox competition than Monday)
- Contractors are early risers — by 10am they're already mentally planning the week
- Avoid Tuesday 8-10am — peak cold email competition window

---

## 6. Metrics & Benchmarks

**The only metric that matters for scaling decisions: live sales calls.**

Booked calls don't count — show rate on cold-booked appointments is 30-40% with contractors. Live conversations are the only signal that the chain works end to end.

**Expected emails-to-live-call rates:**

- Industry average for cold outreach: 0.05-0.15%
- 1 live call per 1,000 emails is realistic
- 1 live call per 500 emails is exceptional

**Healthy benchmark numbers:**

- Open rate: 10-15% on a clean cold list (anything below 10% suggests deliverability issue)
- Positive reply rate: 0.5-1.5% on filtered lists
- Live call rate: 0.1-0.2%
- Close rate on qualified live calls: 20-30% (cold-sourced), up to 50% on referrals

**Kill signals (when to pause and diagnose, not scale):**

- Open rate below 10% on full 500-send test → deliverability problem, fix domain before continuing
- Zero replies after all 3 emails hit the full list with healthy open rates → copy or targeting problem
- Health score on any inbox drops below 85% → pause that inbox

**The scale trigger:**

- 1 live call from the 500-contact test = scale immediately
- 0 live calls but positive replies = work the replies manually before scaling
- 0 replies, healthy opens = diagnose targeting/copy before scaling

---

## 7. Reply Handling Workflow

**Speed to lead is the entire game.** Contractors who replied at 3pm have mentally moved on by 6pm. A 10pm response gets a "tomorrow" that never happens.

**The 60-second auto-reply (set up in Instantly):**

```
Got it — I'll pull your data and reach out within the hour. — Joe
```

This buys an hour to actually act while keeping the conversation alive.

**Then within the hour:**

1. Open Claude on phone
2. Paste: "pull visibility data for [company name] in [city] region"
3. Get talking points in 3-4 minutes
4. Reply to email with: `"Glad this landed. I'm available to walk through the data any morning this week between 9 and 1 — what works for you?"`
5. When they reply with a time, confirm and ask for best number: `"Perfect, talk Thursday at 10. I'll call you then. What's the best number?"`

**Call flow:**

1. Call within 5 minutes of reply if a phone number is in their email signature
2. If no direct number, go through front desk: "Is Mike available? He reached out about some visibility data I pulled for the company."
3. If both fail, reply with the schedule question above

**Sales call flow (when on the phone):**

1. Demo site share — "this is what we build, scroll for 15 seconds"
2. Architecture blueprint — "here's what's under the hood, 92 pages, each built to rank independently"
3. Visibility ledger — "here's where you're invisible right now, and here's what happens when we turn the engine on"
4. 3-year compound projection — "here's what it looks like at $5K/mo versus $10K/mo over three years"
5. Engine + gas + keys metaphor as the explanatory framework throughout
6. No pricing on the website — pricing happens collaboratively on the call

---

## 8. Scaling Plan

**Phase 1: Validate (current)**

- Send 500 contacts through full 3-email sequence
- Goal: 1 live sales call to confirm chain works
- Duration: 10-14 days
- Cost: existing infrastructure, no new spend

**Phase 2: Scale roofing vertical**

- Trigger: 1+ live call from Phase 1
- Buy remaining roofing contacts (up to 32,000 nationally)
- Run through sequence at 500/day
- Duration: 60-90 days to exhaust list
- Cost: $300-$500 for full list + $150/month Instantly

**Phase 3: Add HVAC vertical**

- Build HVAC version of sequence (replace "roofing" with "HVAC")
- Build HVAC ledger and architecture docs
- Run parallel to roofing campaign
- Duration: continuous
- Cost: $200-$400 for initial HVAC list

**Phase 4: Add plumbing + solar verticals**

- Same template approach
- By this point, 2-3 closed deals should fund expansion
- 200,000+ total contacts across 4 verticals

**The volume problem (the goal):**

- 5 live sales calls per week sustained
- Requires 3,500 emails/week through full sequence
- Requires 500/day across all inboxes
- Requires 17-20 inboxes total across 4-5 domains
- At 25% close rate = 1+ deal closed per week

---

## 9. The Math (For Sanity Checking)

**Cost per live call:** $20-$35 at current infrastructure.

Compared to:
- Facebook/Instagram ads to contractors: $150-$400 per live call
- Google Ads: $300-$800 per live call
- Cold calling (own time): $100+ per live call at any reasonable time valuation

Cold email is the cheapest sales conversation available. Period.

**Revenue projection at 15,000 emails/month:**

- 15-30 live calls per month
- 4-8 closed deals per month at 25-30% close rate
- $4,000-$15,000 per deal depending on tier
- $20,000-$80,000 in monthly revenue from cold email alone

**Why most people quit before this works:**

- Send 500 emails, get 0 calls, decide cold email doesn't work
- Go spend $3,000 on Facebook ads
- Were 2,000 emails away from their first call
- Never find out

---

## 10. Common Mistakes To Avoid

**1. Workshop-paralysis on copy.** Sequence is 94 words total. There's almost nothing to optimize. Changing copy before you have data is just guessing with extra steps.

**2. Volume-bumping too fast.** A 66% volume increase overnight can trigger spam filters even at 100% health score. Pattern consistency matters more than current reputation.

**3. Using mismatched sender addresses.** A signature of "Joe" sent from "christopher@wavelengthflowmatic.org" looks like phishing. Delete those accounts even if they're "free."

**4. Slow follow-up on replies.** A 7-hour gap between reply and response loses the lead. Set up auto-reply, push notifications, and Claude on phone for instant data pulls.

**5. Targeting too broad.** Solo operators and $300K businesses dilute the list and waste sends. Filter for owner-operator + 50+ reviews + multi-service-area indicators minimum.

**6. Quitting the test too early.** 500 emails is a sample, not a verdict. Full 3-email sequence needs 12 days minimum to produce statistically meaningful data.

**7. Optimizing the wrong metric.** Reply rate is a vanity metric. Live calls are the only number that matters. A reply that says "fuck off" counts the same as a reply that books a call.

**8. Treating cold email like inbound.** Show rate on auto-booked calls is 30-40%. Either call instantly or use a schedule-by-email handoff that requires conscious commitment.

---

## 11. The Voice & Tone Rules

Same register as the King Maker sales deck, FAQ document, and all client-facing communication:

- **Direct.** No mythology, no royalty language, no theatrics
- **Plainspoken.** A contractor should be able to read it aloud to his business partner without feeling stupid
- **Peer-to-peer.** Not a vendor pitching up. An operator talking sideways
- **Confident without selling.** Information that the reader needs to know, not a pitch they need to accept
- **Lightly playful when appropriate.** "No hard feelings" is the tone. Never groveling, never aggressive

**Words and phrases to avoid:**

- "Synergy," "leverage," "circle back," "touch base," any corporate speak
- "I hope this email finds you well" — instant pattern match to spam
- "Quick question" — pattern match to bait-and-switch
- "Hi Mike, hope you're having a great week!" — generic warmup
- Royalty/throne/citadel language in cold email (different audience from the brand site)

**Words and phrases that work:**

- "Pulled some data on your market" — implies effort already done
- "Want me to send the breakdown?" — soft, permission-based ask
- "Just didn't want to send it unsolicited" — respectful framing
- "Either way, no hard feelings" — disarms aggression
- "Last one from me on this" — clean exit, triggers scarcity

---

## 12. Things That Are Idea Porn (Skip For Now)

- AI calling outbound (TCPA risk + lower book rate + setup cost)
- Texting cold prospects (TCPA legal exposure)
- Instagram content for B2B contractor leads (consumer platform)
- LinkedIn content before having proven client results
- Productizing the cold email system as a SaaS for other agencies
- $497/month website-as-a-service subscriptions (race to bottom)
- Anything that requires more than $500 in spend before first deal closes

---

## 13. The Compound Effect

This system gets better every month for three structural reasons:

1. **List quality improves.** Each campaign teaches what targeting filters work best
2. **Sequence learnings compound.** Real reply data informs real refinements (after, not before, data exists)
3. **Brand recognition grows.** Contractors who see your name across multiple touchpoints start to recognize it

By month 6, the same email sent to a contractor who's been emailed 3 times before has higher reply rates than a cold send to a fresh prospect. By month 12, referrals from closed clients start adding incremental revenue with zero acquisition cost.

The first deal funds infrastructure. Infrastructure funds volume. Volume funds the next vertical. Each closed client funds 3-5 referral relationships over their lifetime.

---

## 14. Version History

**v1.0 — 2026-05-11**
- Initial playbook created from May 10 strategy session
- Sequence: final 3-email version (94 words total)
- Infrastructure: 2 domains, 10 inboxes, 300/day capacity
- Target: roofers $3M-$10M revenue in Southeast US
- Status: 500-contact validation campaign running

---

**End of playbook.**
