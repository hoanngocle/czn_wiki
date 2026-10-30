import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 100 })));
  await page.goto("/ebooks/chu-gioi-tan-the-online/chien-than");
});

test("hover details remain reachable and dismiss with Escape or pointer exit", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Thông tin giám định" })).toHaveCount(0);
  const weapon = page.getByRole("button", { name: /Địa kiếm/ });
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toHaveCount(0);
  await weapon.hover();
  await expect(tooltip).toContainText("6.000 cân");
  await tooltip.getByRole("link").hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip.getByRole("link")).toHaveAttribute("href", /chuong-0100.html$/);
  await page.screenshot({ path: "test-results/profile-tooltip-desktop.png" });
  await page.keyboard.press("Escape");
  await expect(tooltip).toHaveCount(0);
  await weapon.focus();
  await expect(tooltip).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(tooltip.getByRole("link")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(weapon).toBeFocused();
  await expect(tooltip).toHaveCount(0);
  await page.getByRole("heading", { name: "Pháp bảo", exact: true }).hover();
  await weapon.hover();
  await expect(tooltip).toBeVisible();
  await page.getByRole("heading", { name: "Pháp bảo", exact: true }).hover();
  await expect(tooltip).toHaveCount(0);
});

test("touch opens details within the viewport and an outside tap closes them", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 100 })));
  await page.goto("/ebooks/chu-gioi-tan-the-online/chien-than");
  await page.getByRole("button", { name: /Nguyệt Trảm/ }).tap();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toBeVisible();
  const box = await tooltip.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(844);
  await page.screenshot({ path: "test-results/profile-tooltip-mobile.png" });
  await page.getByRole("heading", { name: "Kỹ năng", exact: true }).tap();
  await expect(tooltip).toHaveCount(0);
  await context.close();
});
