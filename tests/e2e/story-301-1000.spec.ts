import { expect, test } from "@playwright/test";
import baseline from "../../lib/story/legacy/chapters-300.json";
import { STORY_STORAGE_KEY } from "../../lib/story/graph";

const story = "/ebooks/chu-gioi-tan-the-online";

test("chapter 1000 migration preserves notes and the modal rewinds its mission history", async ({ page, context }) => {
  const saved = structuredClone(baseline);
  saved.nodes.find((node) => node.id === "anna-character")!.summary = "Ảnh và ghi chú của tôi";
  saved.nodes = saved.nodes.filter((node) => node.id !== "lieu-hanh");
  saved.links = saved.links.filter((link) => link.target !== "lieu-hanh");
  await page.addInitScript(({ key, raw }) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, raw);
      for (const suffix of ["chapters-200", "chapters-300", "meo-mun-restored"]) localStorage.setItem(`${key}:${suffix}`, "1");
      localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 1000 }));
    }
  }, { key: STORY_STORAGE_KEY, raw: JSON.stringify(saved) });
  await page.goto(story);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  const graph = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORY_STORAGE_KEY);
  expect(graph.nodes.some((node: { chapters?: number[] }) => node.chapters?.includes(1000))).toBe(true);
  expect(graph.nodes.find((node: { id: string }) => node.id === "anna-character").summary).toBe("Ảnh và ghi chú của tôi");
  expect(graph.nodes.some((node: { id: string }) => node.id === "lieu-hanh")).toBe(false);
  await page.goto(`${story}/chien-than`);
  await expect(page.getByTestId("realm")).toHaveText("Tứ Trụ Thánh");
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByLabel("Tìm nhiệm vụ").fill("khế ước");
  await modal.getByTestId("mission-list").getByRole("button").click();
  await expect(modal.getByTestId("mission-detail")).toContainText("chưa công bố");
  await page.screenshot({ path: "test-results/story-1000-modal-desktop.png" });
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0999.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("999");
  await expect(modal).not.toContainText("Khế ước với ý chí thế giới");
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0934.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("934");
  await modal.getByLabel("Tìm nhiệm vụ").fill("Thiên kiếm");
  await modal.getByTestId("mission-list").getByRole("button").click();
  await expect(modal.getByTestId("mission-detail")).toContainText("Đang tiến hành");
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0940.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("940");
  await modal.getByLabel("Tìm nhiệm vụ").fill("Thiên kiếm");
  await modal.getByTestId("mission-list").getByRole("button").click();
  await expect(modal.getByTestId("mission-detail")).toContainText("Hoàn thành");
});

test("chapter 1000 functions fit a narrow modal and later reading stays capped", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 1001 })));
  await page.goto(`${story}/chien-than`);
  await expect(page.getByTestId("realm")).toHaveText("Tứ Trụ Thánh");
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByRole("button", { name: "Chức năng đã mở", exact: true }).click();
  await expect(modal.getByRole("heading", { name: "Tình báo cá nhân", exact: true })).toBeVisible();
  expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
  await page.screenshot({ path: "test-results/story-1000-modal-mobile.png" });
  await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).click();
  await expect(modal).toHaveCount(0);
});
