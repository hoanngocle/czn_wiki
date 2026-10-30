import { expect, test } from "@playwright/test";

const story = "/ebooks/chu-gioi-tan-the-online";

test("mission list follows the modal theme and exposes the recorded coverage", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.addInitScript(() => { if (!localStorage.getItem("chu-gioi-reader-progress")) localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 201 })); });
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  const panel = modal.getByRole("region", { name: "Danh sách nhiệm vụ" });
  await expect(panel).not.toContainText("Dữ liệu đến chương");
  await expect(panel.getByTestId("mission-list").getByRole("button")).toHaveCount(4);
  await expect(panel.getByLabel("Loại nhiệm vụ").locator("option")).toHaveCount(3);
  await expect(panel.getByTestId("mission-list")).not.toContainText("Triệu Lục");
  await expect(panel.getByTestId("mission-list")).not.toContainText("Gỡ bảng Bách Hoa");
  const modalText = await modal.evaluate((node) => getComputedStyle(node).color);
  expect(await panel.getByRole("heading", { name: "Danh sách nhiệm vụ" }).evaluate((node) => getComputedStyle(node).color)).toBe(modalText);
  expect(await panel.getByLabel("Tìm nhiệm vụ").evaluate((node) => getComputedStyle(node).color)).toBe(modalText);
  await page.screenshot({ path: "test-results/missions-desktop.png" });
  // Coverage extends through chapter 300; show the limit only beyond that point.
  await page.evaluate(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 301 })));
  await page.reload();
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  await expect(panel).toContainText("Dữ liệu đến chương 300.");
});

test("mission list searches and filters recorded tasks without changing story progress", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 100 })));
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  const panel = modal.getByRole("region", { name: "Danh sách nhiệm vụ" });
  await panel.getByLabel("Loại nhiệm vụ").selectOption("destiny");
  await expect(panel.getByTestId("mission-list").getByRole("button")).toHaveCount(1);
  await panel.getByTestId("mission-list").getByRole("button").click();
  await expect(panel.getByTestId("mission-detail")).toContainText("Trận Chiến Chết Chóc");
  await expect(panel.getByTestId("mission-detail")).toContainText("Đã hoàn thành");
  await panel.getByLabel("Loại nhiệm vụ").selectOption("all");
  await panel.getByLabel("Tìm nhiệm vụ").fill("than thong chien than");
  await expect(panel.getByTestId("mission-list").getByRole("button")).toHaveCount(1);
  await panel.getByTestId("mission-list").getByRole("button").click();
  await expect(panel.getByTestId("mission-detail")).toContainText("48 giờ");
  await expect(panel.getByTestId("mission-detail")).toContainText("Tru Tà");
  await panel.getByLabel("Tìm nhiệm vụ").fill("khong co nhiem vu nay");
  await expect(panel).toContainText("Không tìm thấy nhiệm vụ");
  await expect(panel.getByTestId("mission-detail")).toHaveCount(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("chu-gioi-reader-progress")!).chapter)).toBe(100);
  await expect(modal.getByRole("button", { name: "Đối chiếu truyện", exact: true })).toHaveCount(0);
});

test("mission list conceals future tasks and clears details when progress moves backwards", async ({ page, context }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 98 })));
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0033.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("33");
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  const panel = modal.getByRole("region", { name: "Danh sách nhiệm vụ" });
  await expect(panel).not.toContainText("Trận Chiến Chết Chóc");
  await expect(panel).not.toContainText("Tru Tà");
  await panel.getByLabel("Loại nhiệm vụ").selectOption("destiny");
  await expect(panel).toContainText("Chưa có nhiệm vụ.");
  await expect(panel.getByTestId("mission-list")).toHaveCount(0);
});

test("mission details work on narrow screens and keep keyboard focus inside the modal", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 100 })));
  await page.goto(story);
  const trigger = page.getByRole("button", { name: "Mở hệ thống Chiến Thần" });
  await trigger.click();
  const modal = page.getByRole("dialog");
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  const panel = modal.getByRole("region", { name: "Danh sách nhiệm vụ" });
  await panel.getByLabel("Loại nhiệm vụ").selectOption("system");
  await panel.getByTestId("mission-list").getByRole("button").first().click();
  await expect(panel.getByTestId("mission-detail")).toBeFocused();
  expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
  await page.screenshot({ path: "test-results/missions-mobile.png" });
  await page.keyboard.press("Tab");
  expect(await modal.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
