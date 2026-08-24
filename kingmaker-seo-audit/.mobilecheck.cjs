/* Barajas page mobile probe — 390px + desktop, local file then reusable vs live URL. */
const { chromium } = require("playwright");
const target = process.argv[2] || "file://" + __dirname.replace(/\\/g, "/") + "/barajas-construction/index.html";

(async () => {
  const browser = await chromium.launch();
  for (const [name, vp] of [["mobile-390", { width: 390, height: 844 }], ["desktop-1440", { width: 1440, height: 900 }]]) {
    const page = await browser.newPage({ viewport: vp });
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 100)); });
    page.on("pageerror", (e) => errors.push("PAGEERROR: " + String(e).slice(0, 100)));
    await page.goto(target, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(700);
    const r = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflowEls = [...document.querySelectorAll("body *")].filter((el) => el.getBoundingClientRect().right > window.innerWidth + 2 && getComputedStyle(el).position !== "fixed").slice(0, 4).map((el) => el.className && String(el.className).slice(0, 40) || el.tagName);
      return {
        xOverflow: doc.scrollWidth > window.innerWidth + 2,
        overflowEls,
        gridsDrawn: !!(document.getElementById("gridNow")?.children.length && document.getElementById("gridProj")?.children.length),
        navPills: document.querySelectorAll("[data-nav]").length,
        h1: document.querySelector("h1")?.innerText.slice(0, 60),
        minFont: Math.min(...[...document.querySelectorAll("p,li,td")].slice(0, 80).map((e) => parseFloat(getComputedStyle(e).fontSize))),
        tapTargets: [...document.querySelectorAll("[data-nav]")].every((a) => a.getBoundingClientRect().height >= 30),
        clientName: document.querySelector(".client-name")?.textContent?.trim(),
      };
    });
    console.log(`[${name}] overflow:${r.xOverflow}${r.overflowEls.length ? " (" + r.overflowEls.join(" | ") + ")" : ""} · grids:${r.gridsDrawn} · nav:${r.navPills} · minFont:${r.minFont}px · tap>=30px:${r.tapTargets} · console:[${errors.join(" ; ") || "clean"}]`);
    console.log(`  h1: ${r.h1} · sidebar client: ${r.clientName || "(hidden on mobile)"}`);
    await page.close();
  }
  await browser.close();
})();
