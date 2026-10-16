import { expect, test } from "@playwright/test";

test("production page uses local assets, has no hydration errors or mobile overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const external: string[] = [], errors: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (!["127.0.0.1", "localhost"].includes(url.hostname) && !["data:", "blob:"].includes(url.protocol)) external.push(request.url());
  });
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/combatant/1041", { waitUntil: "networkidle" });
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
  expect(await page.locator("img").evaluateAll((images) => images.filter((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth === 0).map((image) => (image as HTMLImageElement).src))).toEqual([]);
  const overflow = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth, elements: [...document.querySelectorAll("body *")].filter((element) => element.getBoundingClientRect().right > innerWidth + 1).slice(0, 10).map((element) => [element.tagName, element.className, Math.round(element.getBoundingClientRect().right)]) }));
  expect(overflow, JSON.stringify(overflow)).toMatchObject({ width: 390, viewport: 390 });
});

test("theme and page survive blocked localStorage", async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new Error("storage blocked"); } }); });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/combatant/1041");
  await expect(page.getByRole("heading", { level: 1, name: /Renoa/ })).toBeVisible();
  await page.getByRole("button", { name: "Đổi giao diện" }).click();
  expect(errors).toEqual([]);
});

test("picker retains scroll position and selected URL through navigation", async ({ page }) => {
  await page.goto("/combatant");
  const picker = page.getByRole("complementary", { name: /^(Combatant picker|Danh sách nhân vật)$/ });
  await picker.evaluate((element) => { element.scrollTop = 330; });
  await page.getByRole("link", { name: "Veronica" }).scrollIntoViewIfNeeded();
  const before = await picker.evaluate((element) => element.scrollTop);
  expect(before).toBeGreaterThan(0);
  await page.getByRole("link", { name: "Veronica" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /Veronica/ })).toBeVisible();
  expect(await picker.evaluate((element) => element.scrollTop)).toBe(before);
  await page.goBack();
  expect(await picker.evaluate((element) => element.scrollTop)).toBe(before);
});
