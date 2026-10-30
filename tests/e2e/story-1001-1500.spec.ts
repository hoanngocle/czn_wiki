import { expect, test } from "@playwright/test";
import baseline from "../../lib/story/legacy/chapters-1000.json";
import { STORY_STORAGE_KEY } from "../../lib/story/graph";

const story = "/ebooks/chu-gioi-tan-the-online";

test("chapter 1500 updates a saved diagram and rewinds the world-will mission", async ({ page, context }) => {
  const saved = structuredClone(baseline);
  saved.nodes.find((node) => node.id === "anna-character")!.summary = "Ghi chú giữ lại từ chương 1000";
  await page.addInitScript(({ key, raw }) => {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, raw);
    for (const suffix of ["chapters-200", "chapters-300", "chapters-1000", "meo-mun-restored"]) localStorage.setItem(`${key}:${suffix}`, "1");
    localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 1500 }));
  }, { key: STORY_STORAGE_KEY, raw: JSON.stringify(saved) });
  await page.goto(story);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  const graph = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORY_STORAGE_KEY);
  expect(graph.nodes.some((node: { chapters?: number[] }) => node.chapters?.includes(1500))).toBe(true);
  expect(graph.nodes.find((node: { id: string }) => node.id === "anna-character").summary).toBe("Ghi chú giữ lại từ chương 1000");
  await page.goto(`${story}/chien-than`);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("1500");
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-1013.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("1013");
  await modal.getByLabel("Tìm nhiệm vụ").fill("khế ước");
  await modal.getByTestId("mission-list").getByRole("button").click();
  await expect(modal.getByTestId("mission-detail")).toContainText("Đang tiến hành");
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-1014.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("1014");
  await expect(modal.getByTestId("mission-detail")).toContainText("Hoàn thành");
  await page.screenshot({ path: "test-results/story-1500-mission-desktop.png" });
});

test("chapter 1500 profile and modal remain usable at 320 pixels", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 1500 })));
  await page.goto(`${story}/chien-than`);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("1500");
  await expect(page.getByTestId("realm")).toHaveText("Tinh Hà Thánh Nhân");
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
  await page.screenshot({ path: "test-results/story-1500-modal-mobile.png" });
  await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).click();
  await expect(modal).toHaveCount(0);
});
