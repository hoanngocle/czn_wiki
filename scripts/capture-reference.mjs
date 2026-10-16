import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { referenceServer } from "./reference-server.mjs";

const root = "docs/reference-baselines";
mkdirSync(root, { recursive: true });
const server = referenceServer();
await new Promise((resolve) => server.listen(4173, "127.0.0.1", resolve));
const browser = await chromium.launch();
const notes = [];
outer: for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["tablet", { width: 1024, height: 768 }], ["mobile", { width: 390, height: 844 }]]) {
  for (const theme of ["dark", "light"]) {
    for (const [state, pathname] of [["unselected", "/czn/combatant"], ["renoa-cards", "/czn/combatant/1041"]]) {
      const context = await browser.newContext({ viewport, locale: "en-US", timezoneId: "Asia/Saigon", reducedMotion: "reduce" });
      const page = await context.newPage();
      const failures = [];
      const requests = [];
      await page.addInitScript((theme) => {
        localStorage.setItem("themeMode", theme);
        localStorage.setItem("czn_combatant_enable_animation", "false");
        localStorage.setItem("czn_combatant_show_portrait_only", "false");
        localStorage.setItem("czn_combatant_enable_april_fool", "false");
      }, theme);
      await page.route("**/*", (route) => {
        const url = new URL(route.request().url());
        if (["127.0.0.1", "localhost"].includes(url.hostname)) return route.continue();
        failures.push(`blocked external ${url.href}`); route.abort();
      });
      page.on("requestfailed", (request) => failures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText}`));
      page.on("pageerror", (error) => failures.push(`page error ${error.message}`));
      page.on("response", (response) => requests.push(`${response.status()} ${response.url()}`));
      page.on("console", (message) => { if (message.type() === "error") failures.push(`console ${message.text()}`); });
      const response = await page.goto(`http://127.0.0.1:4173/#${pathname}`, { waitUntil: "networkidle", timeout: 30_000 });
      if (!response?.ok()) throw new Error(`Reference navigation failed: ${pathname} ${response?.status()}`);
      await page.waitForTimeout(700);
      if ((await page.locator(".group-selector-title").textContent())?.toLowerCase().includes("epic")) {
        await page.locator(".group-selector-header").click();
        await page.locator(".group-option").filter({ hasText: "Czn" }).click();
        await page.waitForTimeout(3000);
        if (process.env.DIAG) console.log("AFTER GROUP", await page.locator(".group-selector-title").innerText(), page.url(), (await page.locator("body").innerText()).slice(0, 250));
      }
      const bodyText = await page.locator("body").innerText();
      if (!bodyText.includes(state === "unselected" ? "Combatant" : "Renoa")) throw new Error(`Reference CZN state missing: ${pathname}; text ${bodyText.slice(0, 300)}; failures ${JSON.stringify(failures)}`);
      const file = `${root}/e7bot-${label}-${theme}-${state}.png`;
      await page.screenshot({ path: file });
      notes.push({ file, status: response?.status(), url: page.url(), title: await page.title(), text: bodyText.slice(0, 250), html: (await page.locator("#app").first().innerHTML()).slice(-1500), requests, failures });
      await context.close();
      if (notes.length >= Number(process.env.LIMIT || Infinity)) break outer;
    }
  }
}
await browser.close();
server.close();
writeFileSync(`${root}/baseline-capture.json`, JSON.stringify(notes, null, 2));
console.log(JSON.stringify(notes.map(({ file, status, text, failures }) => ({ file, status, text, failures: failures.length })), null, 2));
