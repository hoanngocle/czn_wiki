import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { referenceServer } from "./reference-server.mjs";

const root = "docs/reference-baselines";
const server = referenceServer();
await new Promise((resolve) => server.listen(4173, "127.0.0.1", resolve));
let browser;
const notes = [];
try {
  browser = await chromium.launch();
  for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, locale: "en-US", timezoneId: "Asia/Saigon", reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.addInitScript(() => { localStorage.setItem("themeMode", "dark"); localStorage.setItem("czn_combatant_enable_animation", "false"); localStorage.setItem("czn_combatant_show_portrait_only", "false"); localStorage.setItem("czn_combatant_enable_april_fool", "false"); });
    await page.route("**/*", (route) => ["127.0.0.1", "localhost"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
    await page.goto("http://127.0.0.1:4173/#/czn/combatant/1041", { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    if ((await page.locator(".group-selector-title").textContent())?.toLowerCase().includes("epic")) {
      await page.locator(".group-selector-header").click();
      await page.locator(".group-option").filter({ hasText: "Czn" }).click();
    }
    await page.getByText("Renoa", { exact: true }).first().waitFor();
    const save = async (state) => { const file = `${root}/e7bot-${label}-dark-${state}.png`; await page.screenshot({ path: file }); notes.push({ file, text: (await page.locator("body").innerText()).slice(0, 400) }); };
    // The source mobile picker is the unselected route; the search glyph on a detail route is unrelated.
    const echo = page.getByText("Echo of Sorrow", { exact: true }).first();
    await echo.click({ force: true, timeout: 8000 });
    await page.waitForTimeout(200);
    await save("card-modal");
    if (await page.locator(".r-spark-modal-overlay .close-btn").count()) await page.locator(".r-spark-modal-overlay .close-btn").first().evaluate((element) => element.click());
    await page.goto("http://127.0.0.1:4173/#/czn/combatant/1041", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    if (await page.locator(".r-spark-modal-overlay").count()) await page.locator(".r-spark-modal-overlay .close-btn").first().evaluate((element) => element.click());
    if (label === "mobile") {
      await page.getByRole("button", { name: "Ego", exact: true }).click();
      await page.waitForFunction(() => document.querySelector(".tab-btn.active")?.textContent?.trim() === "Ego");
      await page.evaluate(() => window.scrollTo(0, 0));
      await save("manifest-ego");
      await page.getByRole("button", { name: "Potential", exact: true }).click();
      await page.waitForFunction(() => document.querySelector(".tab-btn.active")?.textContent?.trim() === "Potential");
      await page.evaluate(() => window.scrollTo(0, 0));
      await save("potential");
    } else {
      await page.getByText("Manifest Ego", { exact: true }).first().scrollIntoViewIfNeeded();
      await save("manifest-ego");
      await page.getByText("Potential", { exact: true }).first().scrollIntoViewIfNeeded();
      await save("potential");
    }
    await context.close();
  }
} finally { await browser?.close(); server.close(); writeFileSync(`${root}/baseline-state-capture.json`, JSON.stringify(notes, null, 2)); }
console.log(JSON.stringify(notes.map(({ file }) => file)));
