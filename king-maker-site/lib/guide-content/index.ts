import type { GuideContent } from "@/lib/content-blocks";

/* slug → GuideContent for the buyer's-guide sub-sections (WO_09, Phase E).
 * 32 sub-sections across 11 categories — see lib/buyers-guide.ts for the
 * structure. Each is authored to its title. A slug with no entry renders the
 * "publishing next" shell (the /guides/[slug] page handles the fallback). */

// Cat 1 — Website types
import { content as theBrochure } from "./the-brochure";
import { content as theStandard } from "./the-standard";
import { content as theEnterprise } from "./the-enterprise";
// Cat 2 — Pricing
import { content as whatAWebsiteShouldCost } from "./what-a-website-should-cost";
import { content as seoRetainersExplained } from "./seo-retainers-explained";
// Cat 3 — The Map Pack
import { content as howGoogleRanksYourGbp } from "./how-google-ranks-your-gbp";
import { content as yourWebsitePlusGbp } from "./your-website-plus-gbp";
import { content as mapPackLimitations } from "./map-pack-limitations";
// Cat 4 — Ranking for multiple cities
import { content as locationPages } from "./location-pages";
import { content as googleRelevance } from "./google-relevance";
import { content as topicalAuthority } from "./topical-authority";
// Cat 5 — Turning visitors into leads
import { content as instantEstimateTool } from "./instant-estimate-tool";
import { content as costGuide } from "./cost-guide";
import { content as onlineBooking } from "./online-booking";
// Cat 6 — Ranking for AI
import { content as aiOverviews } from "./ai-overviews";
import { content as machineReadableSite } from "./machine-readable-site";
import { content as answerFirstContent } from "./answer-first-content";
// Cat 7 — What are backlinks
import { content as manufacturerBacklinks } from "./manufacturer-backlinks";
import { content as localAuthorityBacklinks } from "./local-authority-backlinks";
import { content as tradeSupplierBacklinks } from "./trade-supplier-backlinks";
// Cat 8 — Organic vs. paid
import { content as ownedVsRented } from "./owned-vs-rented";
import { content as whereAdsStillWin } from "./where-ads-still-win";
import { content as theAppreciatingAsset } from "./the-appreciating-asset";
// Cat 9 — Why bad sites still rank
import { content as grandfathering } from "./grandfathering";
import { content as siteEquityCompounding } from "./site-equity-compounding";
import { content as howYouOvertake } from "./how-you-overtake";
// Cat 10 — How to audit your site
import { content as aiSiteAudit } from "./ai-site-audit";
import { content as auditByPageCount } from "./audit-by-page-count";
import { content as whatABadAuditLooksLike } from "./what-a-bad-audit-looks-like";
// Cat 11 — Revenue generation
import { content as trafficToRevenue } from "./traffic-to-revenue";
import { content as compoundingRevenueCurve } from "./compounding-revenue-curve";
import { content as scalingTo5m } from "./scaling-to-5m";

export const GUIDE_CONTENT: Record<string, GuideContent> = {
  "the-brochure": theBrochure,
  "the-standard": theStandard,
  "the-enterprise": theEnterprise,
  "what-a-website-should-cost": whatAWebsiteShouldCost,
  "seo-retainers-explained": seoRetainersExplained,
  "how-google-ranks-your-gbp": howGoogleRanksYourGbp,
  "your-website-plus-gbp": yourWebsitePlusGbp,
  "map-pack-limitations": mapPackLimitations,
  "location-pages": locationPages,
  "google-relevance": googleRelevance,
  "topical-authority": topicalAuthority,
  "instant-estimate-tool": instantEstimateTool,
  "cost-guide": costGuide,
  "online-booking": onlineBooking,
  "ai-overviews": aiOverviews,
  "machine-readable-site": machineReadableSite,
  "answer-first-content": answerFirstContent,
  "manufacturer-backlinks": manufacturerBacklinks,
  "local-authority-backlinks": localAuthorityBacklinks,
  "trade-supplier-backlinks": tradeSupplierBacklinks,
  "owned-vs-rented": ownedVsRented,
  "where-ads-still-win": whereAdsStillWin,
  "the-appreciating-asset": theAppreciatingAsset,
  grandfathering: grandfathering,
  "site-equity-compounding": siteEquityCompounding,
  "how-you-overtake": howYouOvertake,
  "ai-site-audit": aiSiteAudit,
  "audit-by-page-count": auditByPageCount,
  "what-a-bad-audit-looks-like": whatABadAuditLooksLike,
  "traffic-to-revenue": trafficToRevenue,
  "compounding-revenue-curve": compoundingRevenueCurve,
  "scaling-to-5m": scalingTo5m,
};
