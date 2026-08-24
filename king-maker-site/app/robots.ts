import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site.config";

/* AI-bot hierarchy (2026). The citation-critical SEARCH bots are explicitly
 * allowed (the single most common own-goal is blocking them); training bots are
 * allowed too (opt-in for reach). Blocking GPTBot has ZERO effect on ChatGPT
 * Search (that's OAI-SearchBot), so we allow the lot. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI-SEARCH / CITATION crawlers (citation-critical — MUST allow):
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      // AI-TRAINING crawlers (no citation effect; allowed for reach):
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
