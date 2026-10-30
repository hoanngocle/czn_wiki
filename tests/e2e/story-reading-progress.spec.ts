import { test, expect } from "@playwright/test";

const profileUrl = "/ebooks/chu-gioi-tan-the-online/chien-than";
const chapterUrl = (chapter: number) => `/chu-gioi-tan-the-online/html/chuong-${String(chapter).padStart(4, "0")}.html`;
const key = "story-wiki:chu-gioi-tan-the-online:currentChap";

test("existing reader progress takes priority over a manual profile snapshot", async ({ page }) => {
  await page.addInitScript(({ key }) => localStorage.setItem(key, "16"), { key });
  await page.goto(chapterUrl(97));
  await page.goto(profileUrl);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("97");
  await expect(page.getByTestId("realm")).toContainText("Trúc Cơ");
  await page.reload();
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("97");
});

test("open profile follows another reader tab without clearing selection on scrolling", async ({ page, context }) => {
  await page.goto(profileUrl);
  const reader = await context.newPage();
  await reader.goto(chapterUrl(98));
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("98");
  await page.getByRole("button", { name: /Địa kiếm/ }).click();
  await reader.evaluate(() => window.scrollTo(0, 600));
  await expect.poll(() => reader.evaluate(() => JSON.parse(localStorage.getItem("chu-gioi-reader-progress")!).scroll)).toBeGreaterThan(0);
  await expect(page.getByRole("tooltip")).toContainText("Địa kiếm");
  await reader.locator('a[rel="next"]').first().click();
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("99");
  await reader.goto(chapterUrl(4));
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("4");
  await expect(page.getByRole("button", { name: /Địa kiếm/ })).toHaveCount(0);
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe("4");
});

test("reading beyond chapter 300 preserves progress and labels limited profile coverage", async ({ page }) => {
  await page.goto(chapterUrl(301));
  await page.goto(profileUrl);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("301");
  await expect(page.getByTestId("realm")).toContainText("Nguyên Anh");
  await expect(page.getByText("Bạn đang đọc chương 301. Hồ sơ hiện có dữ liệu đến chương 300.")).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe("301");
});

test("failed saves keep session progress when stale storage is refreshed", async ({ page }) => {
  await page.addInitScript(({ key }) => {
    localStorage.setItem(key, "10");
    localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 97 }));
    Storage.prototype.setItem = () => { throw new DOMException("Full", "QuotaExceededError"); };
  }, { key });
  await page.goto(profileUrl);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("97");
  await page.evaluate(() => { window.dispatchEvent(new Event("focus")); window.dispatchEvent(new Event("pageshow")); });
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("97");
  await expect(page.getByRole("status")).toContainText("Chưa lưu được");
});
