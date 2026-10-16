import { expect, test } from "@playwright/test";

test("root opens the CZN Combatant workspace and keeps the selected theme", async ({ page }) => {
  await page.goto("/");
  await expect.poll(() => new URL(page.url()).pathname).toBe("/combatant");
  await expect(page.getByRole("navigation", { name: "CZN navigation" })).toBeVisible();
  await page.getByRole("button", { name: /theme/i }).click();
  const selected = await page.locator("html").getAttribute("data-theme");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", selected!);
});

test("mobile navigation closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/combatant");
  const opener = page.getByRole("button", { name: "Open navigation" });
  await opener.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator("nav a").first()).not.toBeFocused();
  await opener.click();
  await expect(page.getByRole("navigation", { name: "CZN navigation" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "CZN navigation" }).getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("navigation", { name: "CZN navigation" }).getByRole("button", { name: /theme/i })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});

test("system color scheme sets the initial theme without a saved preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/combatant");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("legacy CZN combatant URL redirects to the unprefixed route", async ({ page, request }) => {
  const legacyIndex = await request.get("/czn/combatant", { maxRedirects: 0 });
  expect(legacyIndex.status()).toBe(308);
  expect(legacyIndex.headers().location).toBe("/combatant");
  const legacy = await request.get("/czn/combatant/1041", { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe("/combatant/1041");
  await page.goto("/czn/combatant/1041");
  await expect.poll(() => new URL(page.url()).pathname).toBe("/combatant/renoa");
  await expect(page.getByRole("heading", { level: 1, name: /Renoa/ })).toBeVisible();
});
