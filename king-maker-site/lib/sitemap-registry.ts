import type { MetadataRoute } from "next";
import { BG_SUBS } from "./buyers-guide";
import { CHAPTERS } from "./playbook";

/* Sitemap entries. Guide (buyer's-guide sub-sections) + trade + playbook routes
 * are generated from the registries so page-count never drifts from the nav. */
export type SitemapEntry = {
  path: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
  lastModified?: string;
};

export const SITEMAP_ENTRIES: SitemapEntry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/guides", priority: 0.95, changeFrequency: "weekly" },
  ...BG_SUBS.map((s) => ({ path: `/guides/${s.slug}`, priority: 0.85 })),
  { path: "/playbook", priority: 0.85, changeFrequency: "weekly" },
  ...CHAPTERS.map((c) => ({ path: `/playbook/${c.slug}`, priority: 0.7 })),
  { path: "/audit", priority: 0.8 },
  { path: "/pricing", priority: 0.85 },
  { path: "/glossary", priority: 0.6 },
  { path: "/apply", priority: 0.8 },
  { path: "/firm", priority: 0.7 },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];
