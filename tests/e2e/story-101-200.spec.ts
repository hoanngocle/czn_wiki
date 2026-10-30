import { expect, test } from "@playwright/test";
import baseline from "../../lib/story/legacy/v13.json";
import { STORY_STORAGE_KEY } from "../../lib/story/graph";

const story = "/ebooks/chu-gioi-tan-the-online";
test("old diagram receives chapter 200 and preserves personal notes", async ({ page }) => {
  const saved = structuredClone(baseline);
  saved.nodes.find((node) => node.id === "anna-character")!.summary = "Ghi chú của tôi";
  await page.addInitScript(({ key, raw }) => { if (!localStorage.getItem(key)) localStorage.setItem(key, raw); }, { key: STORY_STORAGE_KEY, raw: JSON.stringify(saved) });
  await page.goto(story);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Vũ Hội Hóa Trang");
  await page.getByRole("button", { name: "Tìm đến Phá Vũ Hội Hóa Trang, Anna gia nhập và vụ ám sát", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Chương 200: Ám sát", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  const graph = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORY_STORAGE_KEY);
  expect(graph.nodes.find((node: { id: string }) => node.id === "anna-character").summary).toBe("Ghi chú của tôi");
  expect(graph.nodes.some((node: { chapters?: number[] }) => node.chapters?.includes(200))).toBe(true);
});

test("profile and modal show chapter 200 facts then conceal later records when reading backwards", async ({ page, context }) => {
  await page.goto("/chu-gioi-tan-the-online/html/chuong-0200.html");
  await page.goto(`${story}/chien-than`);
  await expect(page.getByTestId("realm")).toHaveText("Trúc Cơ đỉnh phong");
  await expect(page.getByRole("region", { name: "Hồn lực", exact: true })).toContainText("10");
  await page.getByRole("button", { name: /Thất Tinh Du Long/ }).click();
  await expect(page.getByRole("tooltip")).toContainText("Kim Đan sơ cảnh");
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal.getByTestId("system-soul")).toContainText("10");
  await expect(modal.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
  await expect(modal.getByRole("navigation", { name: "Chức năng hệ thống Chiến Thần" }).locator("button:disabled")).toHaveCount(5);
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  await expect(modal.getByTestId("mission-list").getByRole("button")).toHaveCount(4);
  await modal.getByTestId("mission-list").getByRole("button", { name: /Nâng cấp Tru Tà/ }).click();
  await expect(modal.getByTestId("mission-detail")).toContainText("Đang tiến hành");
  await expect(modal.getByTestId("mission-detail")).toContainText("99%");
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0133.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("133");
  await expect(modal.getByRole("button", { name: "Danh Hiệu Chiến Thần", exact: true })).toHaveCount(0);
  await modal.getByRole("button", { name: "Danh sách nhiệm vụ", exact: true }).click();
  await expect(modal.getByTestId("mission-list").getByRole("button")).toHaveCount(2);
  await expect(modal).not.toContainText("Quyết chiến (thượng)");
});

test("locked functions fit a narrow screen at later chapters", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/chu-gioi-tan-the-online/html/chuong-0167.html");
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
  for (const slot of await modal.getByRole("button", { name: /Chức năng chưa mở khóa/ }).all()) {
    await expect(slot).toBeDisabled();
    await expect(slot).toBeInViewport();
  }
  expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
  await page.screenshot({ path: "test-results/story-200-titles-mobile.png" });
});
