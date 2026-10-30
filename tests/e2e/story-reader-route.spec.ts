import { expect, test } from "@playwright/test";

const story = "/ebooks/chu-gioi-tan-the-online";
const reading = `${story}/doc-truyen`;
const frame = 'iframe[title="Đọc Chư Giới Tận Thế Online"]';

test("reader has its own page and restores chapter, scroll and theme after navigation and reload", async ({ page }) => {
  await page.goto(reading);
  await expect(page.getByTestId("story-viewport")).toHaveCount(0);
  const reader = page.frameLocator(frame);
  await reader.getByRole("link", { name: "Bắt đầu đọc →", exact: true }).click();
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "1");
  await page.getByRole("button", { name: "Cài đặt đọc truyện", exact: true }).click();
  await page.getByRole("dialog", { name: "Cài đặt đọc truyện" }).getByRole("button", { name: "Đổi nền sáng tối", exact: true }).click();
  await page.getByRole("button", { name: "Đóng cài đặt", exact: true }).click();
  await reader.locator("body").evaluate(() => window.scrollTo(0, 450));
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("chu-gioi-reader-progress")!).scroll)).toBe(450);
  await page.getByRole("complementary", { name: "Mục lục wiki" }).getByRole("link", { name: "Cốt truyện", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${story}$`));
  await expect(page.locator(frame).filter({ visible: true })).toHaveCount(0);
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${reading}$`));
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "1");
  await expect.poll(() => reader.locator("body").evaluate(() => window.scrollY)).toBe(450);
  await page.reload();
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "1");
  await expect.poll(() => reader.locator("body").evaluate(() => window.scrollY)).toBe(450);
  await expect(page.locator('main[data-reader-theme]')).toHaveAttribute("data-reader-theme", "dark");
});

test("legacy reader bookmarks replace the hash with the dedicated page", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 94 })));
  await page.goto(`${story}#doc-truyen`);
  await expect(page).toHaveURL(new RegExp(`${reading}$`));
  await expect(page.frameLocator(frame).locator("body")).toHaveAttribute("data-chapter", "94");
  await expect(page.getByTestId("story-viewport").filter({ visible: true })).toHaveCount(0);
});

test("an explicit chapter opens without storage and invalid chapter input stays within the book", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("Storage unavailable"); };
    Storage.prototype.setItem = () => { throw new Error("Storage unavailable"); };
  });
  await page.goto(`${reading}?chuong=15`);
  await expect(page.frameLocator(frame).locator("body")).toHaveAttribute("data-chapter", "15");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("15");
  await page.goto(`${reading}?chuong=999999`);
  await expect(page.frameLocator(frame).locator("body")).toHaveAttribute("data-chapter", "1");
});

test("chapter selection can return to the initial chapter after iframe navigation", async ({ page }) => {
  await page.goto(`${reading}?chuong=15`);
  const reader = page.frameLocator(frame);
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "15");
  await reader.locator(".chapter-controls").getByRole("link", { name: /Chương sau/ }).click();
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "16");
  await page.getByLabel("Chương hiện tại").selectOption("15");
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "15");
});

test("returning to a cached reader page uses progress instead of a consumed chapter query", async ({ page }) => {
  await page.goto(`${reading}?chuong=15`);
  const reader = page.frameLocator(frame);
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "15");
  await page.getByLabel("Chương hiện tại").selectOption("20");
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "20");
  await page.getByRole("complementary", { name: "Mục lục wiki" }).getByRole("link", { name: "Cốt truyện", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${story}$`));
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${reading}$`));
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "20");
  await page.getByRole("complementary", { name: "Mục lục wiki" }).getByRole("link", { name: "Cốt truyện", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${story}$`));
  await page.getByLabel("Chương hiện tại").filter({ visible: true }).selectOption("15");
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "15");
  await expect(page).toHaveURL(new RegExp(`${reading}$`));
});
