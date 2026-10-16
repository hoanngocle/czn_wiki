import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const root = "docs/reference-baselines";
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3100"], { stdio: "pipe" });
let browser;
const observations = [];
try {
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    try { const response = await fetch("http://127.0.0.1:3100/combatant"); if (response.ok) { ready = true; break; } } catch { /* booting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!ready) throw new Error("Next server did not start");
  browser = await chromium.launch();
  mkdirSync(root, { recursive: true });
  for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["tablet", { width: 1024, height: 768 }], ["mobile", { width: 390, height: 844 }]]) {
    for (const theme of ["dark", "light"]) {
      for (const [state, pathname] of [["unselected", "/combatant"], ["renoa-cards", "/combatant/1041"]]) {
        const context = await browser.newContext({ viewport, locale: "en-US", timezoneId: "Asia/Saigon", reducedMotion: "reduce" });
        const page = await context.newPage();
        const failures = [];
        await page.addInitScript((theme) => { try { localStorage.setItem("themeMode", theme); localStorage.setItem("czn_combatant_enable_animation", "false"); localStorage.setItem("czn_combatant_show_portrait_only", "false"); } catch { /* storage blocked */ } }, theme);
        page.on("pageerror", (error) => failures.push(`page ${error.message}`));
        page.on("console", (message) => { if (message.type() === "error") failures.push(`console ${message.text()}`); });
        page.on("requestfailed", (request) => failures.push(`request ${request.url()} ${request.failure()?.errorText}`));
        page.on("response", (response) => { if (response.status() >= 400) failures.push(`HTTP ${response.status()} ${response.url()}`); });
        page.on("request", (request) => { if (!["127.0.0.1", "localhost"].includes(new URL(request.url()).hostname) && !/^(data|blob):/.test(request.url())) failures.push(`external ${request.url()}`); });
        const response = await page.goto(`http://127.0.0.1:3100${pathname}`, { waitUntil: "networkidle" });
        if (!response?.ok()) throw new Error(`Product navigation failed: ${pathname} ${response?.status()}`);
        const file = `${root}/czn-${label}-${theme}-${state}.png`;
        await page.screenshot({ path: file });
        observations.push({ file, status: response.status(), url: page.url(), failures: [...failures] });
        if (state === "renoa-cards" && theme === "dark" && label !== "tablet") {
          await page.getByRole("button", { name: "Echo of Sorrow card" }).first().click();
          const modal = `${root}/czn-${label}-dark-card-modal.png`;
          await page.screenshot({ path: modal }); observations.push({ file: modal, failures: [...failures] });
          await page.keyboard.press("Escape");
          await page.evaluate(() => window.scrollTo(0, 0));
          if (label === "mobile") {
            await page.getByRole("tab", { name: "Manifest Ego" }).click();
            await page.waitForFunction(() => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.includes("Manifest Ego"));
            await page.evaluate(() => window.scrollTo(0, 0));
            const ego = `${root}/czn-mobile-dark-manifest-ego.png`;
            await page.screenshot({ path: ego }); observations.push({ file: ego, failures: [...failures] });
            await page.getByRole("tab", { name: "Potential" }).click();
            await page.waitForFunction(() => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.includes("Potential"));
            await page.evaluate(() => window.scrollTo(0, 0));
            const potential = `${root}/czn-mobile-dark-potential.png`;
            await page.screenshot({ path: potential }); observations.push({ file: potential, failures: [...failures] });
          } else {
            await page.getByRole("heading", { name: "Manifest Ego" }).scrollIntoViewIfNeeded();
            const ego = `${root}/czn-desktop-dark-manifest-ego.png`;
            await page.screenshot({ path: ego }); observations.push({ file: ego, failures: [...failures] });
            await page.getByRole("heading", { name: "Potential", exact: true }).scrollIntoViewIfNeeded();
            const potential = `${root}/czn-desktop-dark-potential.png`;
            await page.screenshot({ path: potential }); observations.push({ file: potential, failures: [...failures] });
          }
        }
        await context.close();
      }
    }
  }
  writeFileSync(`${root}/product-capture.json`, JSON.stringify(observations, null, 2));
  console.log(JSON.stringify(observations.map(({ file, failures }) => ({ file, failures: failures.length }))));
} finally { await browser?.close(); child.kill(); }
