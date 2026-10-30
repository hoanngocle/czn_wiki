import { expect, test } from "@playwright/test";
import baseline from "../../lib/story/legacy/chapters-200.json";
import { STORY_STORAGE_KEY } from "../../lib/story/graph";

const story = "/ebooks/chu-gioi-tan-the-online";
test("a chapter 200 save gains the last arc while retaining personal changes", async ({ page }) => {
  const saved = structuredClone(baseline);
  saved.nodes.find((node) => node.id === "anna-character")!.summary = "Ghi chú riêng chương 200";
  saved.nodes = saved.nodes.filter((node) => node.id !== "lieu-hanh");
  saved.links = saved.links.filter((link) => link.target !== "lieu-hanh");
  await page.addInitScript(({ key, raw }) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, raw);
      localStorage.setItem(`${key}:chapters-200`, "1");
      localStorage.setItem(`${key}:meo-mun-restored`, "1");
    }
  }, { key: STORY_STORAGE_KEY, raw: JSON.stringify(saved) });
  await page.goto(story);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Hồng Hoang Liệt Diễm");
  await page.getByRole("button", { name: "Tìm đến Triều Âm, Hồng Hoang Liệt Diễm và hộ pháp cho sư phụ", exact: true }).click();
  await expect(page.getByRole("heading", { name: /^Chương 300:/ })).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  const graph = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORY_STORAGE_KEY);
  expect(graph.nodes.find((node: { id: string }) => node.id === "anna-character").summary).toBe("Ghi chú riêng chương 200");
  expect(graph.nodes.some((node: { id: string }) => node.id === "lieu-hanh")).toBe(false);
  expect(graph.nodes.some((node: { chapters?: number[] }) => node.chapters?.includes(300))).toBe(true);
});

test("chapter 300 modal keeps functions locked, shows selected tasks, and rewinds correctly", async ({ page, context }) => {
  await page.goto("/chu-gioi-tan-the-online/html/chuong-0300.html");
  await page.goto(`${story}/chien-than`);
  await expect(page.getByTestId("realm")).toHaveText("Nguyên Anh hậu kỳ");
  await expect(page.getByRole("button", { name: /Triều Âm kiếm/ })).toBeVisible();
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal.getByTestId("system-soul")).toContainText("Chưa xác nhận");
  await expect(modal.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
  await expect(modal.getByRole("navigation", { name: "Chức năng hệ thống Chiến Thần" }).locator("button:disabled")).toHaveCount(5);
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  await expect(modal.getByTestId("mission-list").getByRole("button")).toHaveCount(10);
  await modal.getByTestId("mission-list").getByRole("button", { name: /Quyết chiến \(hạ\)/ }).click();
  await expect(modal.getByTestId("mission-detail")).toContainText("Bảo vệ hiện trạng thế giới Thần Võ.");
  await expect(modal.getByTestId("mission-detail")).toContainText("Đang tiến hành");
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0236.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("236");
  await expect(modal.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  await expect(modal.getByTestId("mission-list").getByRole("button")).toHaveCount(4);
  await expect(modal).not.toContainText("Quyết chiến (hạ)");
});

test("chapter 300 tasks fit a narrow modal", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/chu-gioi-tan-the-online/html/chuong-0300.html");
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  await modal.getByLabel("Tìm nhiệm vụ").fill("thứ tư");
  await modal.getByTestId("mission-list").getByRole("button").click();
  await expect(modal.getByTestId("mission-detail")).toContainText("Trò chuyện với khí linh mạnh nhất");
  expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
  await page.screenshot({ path: "test-results/story-300-modal-mobile.png" });
});
