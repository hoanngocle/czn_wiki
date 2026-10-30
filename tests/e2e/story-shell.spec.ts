import { test, expect } from "@playwright/test";

const story = "/ebooks/chu-gioi-tan-the-online";

test("header chapter selector opens the chosen chapter and follows subsequent navigation", async ({ page }) => {
  await page.goto(story);
  const selector = page.getByRole("combobox", { name: "Chương hiện tại", exact: true }).filter({ visible: true });
  await selector.selectOption("2488");
  const reader = page.frameLocator('iframe[title="Đọc Chư Giới Tận Thế Online"]');
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "2488");
  await expect(selector).toHaveValue("2488");
  await selector.selectOption("3");
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "3");
  await expect(selector).toHaveValue("3");
  await reader.locator(".chapter-controls").getByRole("link", { name: /Chương sau/ }).click();
  await expect(selector).toHaveValue("4");
  await page.setViewportSize({ width: 320, height: 844 });
  await expect(selector).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/chapter-selector-mobile.png" });
});

test("profile header chapter selector opens the selected chapter", async ({ page }) => {
  await page.goto(`${story}/chien-than`);
  await page.getByRole("combobox", { name: "Chương hiện tại", exact: true }).selectOption("15");
  await expect(page).toHaveURL(/\/doc-truyen$/);
  await expect(page.frameLocator('iframe[title="Đọc Chư Giới Tận Thế Online"]').locator("body")).toHaveAttribute("data-chapter", "15");
});

test("all three views expose the same shared sidebar and profile section links", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 97 })));
  await page.goto(story);
  const sidebar = page.getByRole("complementary", { name: "Mục lục wiki" }).filter({ visible: true });
  const labels = await sidebar.getByRole("link").allTextContents();
  expect(labels).toEqual(["Cốt truyện", "Đọc truyện", "Hồ sơ Chiến Thần", "Nhân vật", "Pháp bảo", "Hòm đồ", "Kỹ năng"]);
  await sidebar.getByRole("link", { name: "Pháp bảo", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${story}/chien-than#profile-equipment$`));
  await expect(page.getByRole("heading", { name: "Pháp bảo", exact: true })).toBeInViewport();
  await expect(sidebar).toHaveCount(1);
  expect(await sidebar.getByRole("link").allTextContents()).toEqual(labels);
  await sidebar.getByRole("link", { name: "Đọc truyện", exact: true }).click();
  const reader = page.frameLocator('iframe[title="Đọc Chư Giới Tận Thế Online"]');
  await expect(reader.locator("body")).toHaveAttribute("data-chapter", "97");
  await expect(sidebar.getByRole("link", { name: "Đọc truyện", exact: true })).toHaveAttribute("aria-current", "page");
  expect(await sidebar.getByRole("link").allTextContents()).toEqual(labels);
  await sidebar.getByRole("link", { name: "Cốt truyện", exact: true }).click();
  await expect(page.getByTestId("story-viewport").filter({ visible: true })).toBeVisible();
  await expect(sidebar.getByRole("link", { name: "Cốt truyện", exact: true })).toHaveAttribute("aria-current", "page");
  expect(await sidebar.getByRole("link").allTextContents()).toEqual(labels);
});

test("story and profile share the header/sidebar geometry and chapter display", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 97 })));
  await page.goto(story);
  const header = page.getByTestId("story-header").filter({ visible: true });
  await expect(header.getByLabel("Chương hiện tại")).toHaveValue("97");
  const headerBounds = await header.boundingBox();
  const sidebar = page.getByRole("complementary", { name: "Mục lục wiki" }).filter({ visible: true });
  const sidebarBounds = await sidebar.boundingBox();
  await sidebar.getByRole("link", { name: /Hồ sơ Chiến Thần/ }).click();
  await expect(page).toHaveURL(`${new URL(page.url()).origin}${story}/chien-than`);
  await expect(header).toBeVisible();
  expect((await header.boundingBox())?.width).toBe(headerBounds?.width);
  expect((await sidebar.boundingBox())?.width).toBe(sidebarBounds?.width);
  await expect(sidebar.getByRole("link", { name: /Hồ sơ Chiến Thần/ })).toHaveAttribute("aria-current", "page");
  await expect(header.getByLabel("Chương hiện tại")).toHaveValue("97");
  await page.getByRole("region", { name: "Hồ sơ Chiến Thần" }).evaluate((node) => { node.scrollTop = 600; });
  expect((await header.boundingBox())?.y).toBe(0);
  await page.screenshot({ path: "test-results/story-shared-shell-desktop.png" });
});

test("current chapter stays visible in the mobile header and updates from reader", async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${story}/chien-than`);
  const chapter = page.getByTestId("story-header").getByLabel("Chương hiện tại");
  await expect(chapter).toBeVisible();
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0098.html");
  await expect(chapter).toHaveValue("98");
  await expect(page.getByRole("navigation", { name: "Chuyển trang truyện" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/story-shared-shell-mobile.png" });
});
