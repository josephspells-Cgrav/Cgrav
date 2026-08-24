import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site.config";
import { SITEMAP_ENTRIES } from "@/lib/sitemap-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date("2026-06-25");
  return SITEMAP_ENTRIES.map((e) => ({
    url: `${SITE.url}${e.path}`,
    lastModified: e.lastModified ? new Date(e.lastModified) : buildDate,
    changeFrequency: e.changeFrequency ?? (e.path === "/" ? "weekly" : "monthly"),
    priority: e.priority ?? 0.7,
  }));
}
