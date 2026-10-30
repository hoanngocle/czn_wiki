import { test, expect } from "@playwright/test";

const route = "/ebooks/chu-gioi-tan-the-online/chien-than";
const key = "story-wiki:chu-gioi-tan-the-online:currentChap";

test("remembers progress, reveals chapter-appropriate details and clears future selections", async ({ page, context }) => {
  await page.goto("/chu-gioi-tan-the-online/html/chuong-0100.html");
  await page.goto(route);
  await expect(page.getByRole("region", { name: "Hồ sơ Chiến Thần", exact: true }).getByRole("heading", { name: "Cố Thanh Sơn", exact: true })).toBeVisible();
  await expect(page.getByRole("spinbutton")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Cập nhật chương" })).toHaveCount(0);
  await expect(page.getByTestId("realm")).toContainText("Trúc Cơ");
  await page.getByRole("button", { name: /Địa kiếm/ }).click();
  await expect(page.getByRole("tooltip")).toContainText("6.000 cân");
  await page.reload();
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("100");
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe("100");
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0004.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("4");
  await expect(page.getByText("Địa kiếm", { exact: true })).toHaveCount(0);
  await expect(page.getByTestId("realm")).toContainText("Luyện Khí tầng 2");
});

test("filters inventory and removes spent materials", async ({ page, context }) => {
  await page.addInitScript(({ key }) => localStorage.setItem(key, "92"), { key });
  await page.goto(route);
  await page.getByRole("button", { name: "Vật liệu", exact: true }).click();
  await page.getByRole("button", { name: /Mảnh tim quái vật vũ trụ/ }).click();
  await expect(page.getByRole("tooltip")).toContainText("Vũ Trụ chủng");
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0095.html");
  await expect(page.getByRole("button", { name: /Mảnh tim quái vật vũ trụ/ })).toHaveCount(0);
});

test("invalid storage and mobile layout stay usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(({ key }) => localStorage.setItem(key, "not-a-chapter"), { key });
  await page.goto(route);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("1");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("blocked storage keeps navigation working and explains unsaved progress", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 97 }));
    Storage.prototype.setItem = () => { throw new DOMException("Blocked", "SecurityError"); };
  });
  await page.goto(route);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("97");
  await expect(page.getByTestId("realm")).toContainText("Trúc Cơ");
  await expect(page.getByRole("status")).toContainText("Chưa lưu được");
});

test("renders populated desktop and mobile profiles without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(({ key }) => localStorage.setItem(key, "100"), { key });
  await page.goto(route);
  await expect(page.getByTestId("realm")).toContainText("Trúc Cơ");
  await page.getByRole("button", { name: /Địa kiếm/ }).click();
  await page.screenshot({ path: "test-results/war-god-desktop.png", fullPage: true, animations: "disabled" });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/war-god-mobile.png", fullPage: true, animations: "disabled" });
  expect(errors).toEqual([]);
});

test("mobile story wiki exposes a usable profile link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await page.getByRole("link", { name: "Chiến Thần", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${route}$`));
  await expect(page.getByLabel("Chương hiện tại").filter({ visible: true })).toBeVisible();
});
