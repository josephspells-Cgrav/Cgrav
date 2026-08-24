import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const ROUTES: { path: string; name: string; marker: string }[] = [
  { path: "/", name: "home", marker: "ranking system" },
  { path: "/guides", name: "guides-pillar", marker: "Why this matters" },
  { path: "/guides/enterprise-website-anatomy", name: "guide-sample", marker: "enterprise-grade" },
  { path: "/guides/why-a-brochure-cant-win", name: "guide-brochure", marker: "brochure can" },
  { path: "/guides/organic-vs-paid", name: "guide-organic-paid", marker: "rented leads" },
  { path: "/guides/trades", name: "trades", marker: "real service" },
  { path: "/guides/trades/roofing", name: "trade-roofing", marker: "authority roofing site" },
  { path: "/playbook/organic-vs-the-map-pack", name: "chapter-pack", marker: "Organic vs. the Map Pack" },
  { path: "/guides/the-honesty-layer", name: "honesty", marker: "what we refuse to claim" },
  { path: "/audit", name: "audit", marker: "Ten fundamentals" },
  { path: "/glossary", name: "glossary", marker: "LocalBusiness schema" },
  { path: "/playbook", name: "playbook", marker: "$1M to $10M" },
  { path: "/apply", name: "apply", marker: "one contractor per city" },
  { path: "/firm", name: "firm", marker: "digital supremacy" },
  { path: "/privacy", name: "privacy", marker: "Privacy Policy" },
  { path: "/terms", name: "terms", marker: "Terms of Service" },
];

const OUT = ".verify";
fs.mkdirSync(OUT, { recursive: true });

test.beforeEach(async ({ page }) => {
  // Reduced motion so scroll-reveal content is visible in full-page captures.
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const r of ROUTES) {
  test(`${r.name} renders + a11y`, async ({ page }, testInfo) => {
    const project = testInfo.project.name;
    const consoleErrors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });

    const resp = await page.goto(r.path, { waitUntil: "networkidle" });
    expect(resp?.status(), `${r.path} status`).toBeLessThan(400);

    await expect(page.locator("body")).toContainText(r.marker, { timeout: 10000 });

    try {
      await page.screenshot({ path: `${OUT}/${r.name}-${project}.png`, fullPage: true });
    } catch {
      await page.screenshot({ path: `${OUT}/${r.name}-${project}.png`, fullPage: false });
    }

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    if (serious.length) {
      fs.writeFileSync(`${OUT}/axe-${r.name}-${project}.json`, JSON.stringify(serious, null, 2));
      const summary = serious.map((v) => `${v.impact}: ${v.id} (${v.nodes.length}) - ${v.help}`).join("\n");
      throw new Error(`axe ${r.name}/${project} serious/critical:\n${summary}`);
    }

    const real = consoleErrors.filter(
      (e) => !/favicon|Download the React DevTools|Unable to get image data from canvas/i.test(e),
    );
    expect(real, `console errors on ${r.path}: ${real.join("; ")}`).toHaveLength(0);
  });
}
