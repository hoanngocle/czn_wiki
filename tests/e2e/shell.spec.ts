import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("czn_combatant_vietnamese", "false"));
});

test("CZN entry opens the Combatant workspace and keeps the selected theme", async ({ page }) => {
  await page.goto("/czn");
  await expect.poll(() => new URL(page.url()).pathname).toBe("/czn/combatant");
  await expect(page.getByRole("navigation", { name: "CZN navigation" })).toBeVisible();
  await page.getByRole("button", { name: /theme/i }).click();
  const selected = await page.locator("html").getAttribute("data-theme");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", selected!);
});

test("mobile navigation closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/czn/combatant");
  const opener = page.getByRole("button", { name: "Open navigation" });
  await opener.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator("nav a").first()).not.toBeFocused();
  await opener.click();
  await expect(page.getByRole("navigation", { name: "CZN navigation" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "CZN navigation" }).getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("navigation", { name: "CZN navigation" }).getByRole("button", { name: "Chuyển sang tiếng Việt" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});

test("system color scheme sets the initial theme without a saved preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/czn/combatant");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("legacy combatant URL redirects into the CZN namespace", async ({ page, request }) => {
  const legacyIndex = await request.get("/combatant", { maxRedirects: 0 });
  expect(legacyIndex.status()).toBe(308);
  expect(legacyIndex.headers().location).toBe("/czn/combatant");
  const legacy = await request.get("/combatant/1041", { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe("/czn/combatant/1041");
  await page.goto("/combatant/1041");
  await expect.poll(() => new URL(page.url()).pathname).toBe("/czn/combatant/renoa");
  await expect(page.getByRole("heading", { level: 1, name: /Renoa/ })).toBeVisible();
});
