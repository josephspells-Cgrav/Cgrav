// QA detail capture (local): bento, hover-lift, dashboard climax, hero, one-shot.
import { chromium } from "@playwright/test";
import fs from "node:fs";
const URL = "http://localhost:3310";
const OUT = process.env.OUT_DIR || ".qa-out";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(700);

// HERO fold (with the blueprint crest field)
await page.screenshot({ path: `${OUT}/hero-fold.png` });

// BENTO section
await page.locator("#proof").scrollIntoViewIfNeeded();
await page.waitForTimeout(1600);
await page.locator("#proof").screenshot({ path: `${OUT}/bento.png` });

// HOVER a regular bento card
const card = page.locator("#proof .km-card").first();
await card.hover();
await page.waitForTimeout(450);
await page.locator("#proof").screenshot({ path: `${OUT}/bento-hover.png` });

// DASHBOARD climax — scroll the chart in, let line draw + numbers land (~delay 1.45s)
const chart = page.locator("svg[aria-label*='climbs']");
await chart.scrollIntoViewIfNeeded();
await page.waitForTimeout(3400);
await chart.screenshot({ path: `${OUT}/dashboard-climax.png` });

// ONE-SHOT check: read a count-up final value, scroll away + back, confirm it does NOT reset to 0
const readGap = async () =>
  await page.locator("#problem .text-red.km-display").first().innerText().catch(() => "");
await page.locator("#problem").scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
const firstVal = await readGap();
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.locator("#book").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.locator("#problem").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
const secondVal = await readGap();

console.log("one-shot gap value first/second:", JSON.stringify(firstVal), JSON.stringify(secondVal), firstVal === secondVal && firstVal !== "0%" ? "OK (no reset)" : "CHECK");
console.log("qa detail ->", OUT);
await browser.close();
