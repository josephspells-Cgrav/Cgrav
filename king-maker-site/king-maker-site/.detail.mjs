// Detail QA capture: bento gaplessness, hover-lift, dashboard climax (local).
import { chromium } from "@playwright/test";
import fs from "node:fs";
const URL = "http://localhost:3310";
const OUT = process.env.OUT_DIR || ".detail-out";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

// --- BENTO: scroll #proof into view, settle reveals, capture the section ---
await page.locator("#proof").scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
const proof = page.locator("#proof");
await proof.screenshot({ path: `${OUT}/bento-desktop.png` });

// Probe bento occupancy: bounding boxes of the cells (detect overlaps/gaps roughly)
const cells = await page.locator("#proof .km-card, #proof .km-card-blue").evaluateAll((els) =>
  els.map((e) => {
    const r = e.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) };
  }),
);

// --- HOVER: hover the first regular bento card, capture (icon fill + border shift + lift) ---
const firstCard = page.locator("#proof .km-card").first();
await firstCard.hover();
await page.waitForTimeout(450);
await proof.screenshot({ path: `${OUT}/bento-hover-desktop.png` });

// --- DASHBOARD climax: scroll the instrument in, let the win-line draw + numbers land ---
await page.getByText("How it’s won", { exact: false }).scrollIntoViewIfNeeded().catch(() => {});
await page.waitForTimeout(3200);
const chart = page.locator("svg[aria-label*='climbs']");
await chart.screenshot({ path: `${OUT}/dashboard-climax.png` }).catch(() => {});

// --- HERO fold detail ---
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/hero-fold.png` });

await browser.close();
console.log("cells:", JSON.stringify(cells, null, 0));
console.log("detail ->", OUT);
