PASS VERIFICATION — https://contractor-template-preview.vercel.app/preview/hvac

| # | Axis | Score | Finding |
|---|------|-------|---------|
| 4 | Density discipline | FAIL | Hero subcopy contains a duplicated city list bug — "Castalia, Spring Hope, Bunn, Louisburg, Nashville, and Franklinton" appears twice back-to-back with a broken/missing connector verb between the two instances. Template merge-tag injected the array twice. |
| 4 | Density discipline | WARN | Hero subcopy is overloaded for a hero slot — service-area list + NATE cert + 24/7 dispatch + Manual J + warranty + voicemail differentiator all crammed into a single paragraph that should carry one promise. |
| 5 | Layout adaptation | WARN | Emergency band has visible dead zones in upper-left of the teal section (left of the orange dispatch card) and the right ~60% of the hero next to the two top CTA buttons reads as unused dark space. |
| 8 | Motion/polish | WARN | Orange "TAP TO CALL" pill inside the emergency dispatch card is redundant with the large phone-number CTA directly above it — visually static, no distinct hover affordance, reads as duplicate CTA. |
| 1 | Image-content match | OK | Hero = outdoor condenser on concrete pad beside brick home at golden hour. Heat-pump / central-air card images = outdoor condensers. Furnace card = Trane closet install with flue + condensate trap. Mini-split card = sunroom wall head + outdoor inverter — directly matches card copy ("Sunroom additions"). All on-trade. |
| 9 | Empty-space discipline | OK | Hero right-side and section gutters read as intentional breathing room; no accidental placeholder bands outside the emergency-band issue already flagged under Axis 5. |
| 2 | Hero diversity per page-type | NOT_EVALUATED | Requires multi-URL hero comparison across niche page-types. |
| 3 | Copy on-trade | NOT_EVALUATED | Requires per-niche vocabulary allow/banned list (lib/niche-config/hvac.ts). |
| 6 | Math/copy consistency | NOT_EVALUATED | Requires source-array length context (lib/content-*.ts) — e.g. "Four system types" vs array.length not cross-checked. |
| 7 | Section trade-fit | NOT_EVALUATED | Requires per-niche allowed-sections list. |

CONSOLE: 0 errors, 0 warnings | SCREENSHOT: C:\Users\josep\AppData\Local\hermes\cache\screenshots\browser_screenshot_e5470c7273df4e3fb6744b633ce1307f.png