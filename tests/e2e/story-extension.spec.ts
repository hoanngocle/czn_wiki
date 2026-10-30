import { expect, test } from "@playwright/test";
import previousSeed from "../../lib/story/legacy/v5.json";

const route = "/ebooks/chu-gioi-tan-the-online";

test("shows compact new milestones, chapter 100 detail and first-appearance portrait profiles", async ({ page }) => {
  await page.goto(route);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await page.getByRole("searchbox").fill("Bách Hoa cứu viện");
  await page.getByRole("button", { name: "Tìm đến Bách Hoa cứu viện, nhập sư môn và Trúc Cơ", exact: true }).click();
  await expect(detail).toContainText("Tu Hành · Chương 66–69, 80–85, 95–100");
  await detail.getByRole("button", { name: "Tần Tiểu Lâu Lần đầu đề cập · Chương 81", exact: true }).click();
  await expect(detail.getByRole("button", { name: "Thêm ảnh nhân vật" })).toBeVisible();
  await expect(detail).toContainText("Nhị sư huynh");
  await page.getByRole("searchbox").fill("Chu Khai Vũ");
  await page.getByRole("button", { name: "Tìm đến Chu Khai Vũ", exact: true }).click();
  await expect(detail).toContainText("Lần đầu đề cập · Chương 86");
  await expect(detail).toContainText("phán quyết ở 90");
  await page.getByRole("searchbox").fill("Bách Hoa cứu viện, nhập sư môn và Trúc Cơ");
  await page.getByRole("button", { name: "Tìm đến Bách Hoa cứu viện, nhập sư môn và Trúc Cơ", exact: true }).click();
  await expect(detail).toContainText("Tu Hành · Chương 66–69, 80–85, 95–100");
  await detail.getByRole("heading", { name: "Chương 100: So chiêu", exact: true }).scrollIntoViewIfNeeded();
  await expect(detail).toContainText("sáu nghìn cân");
  await page.screenshot({ path: "test-results/story-chapter-100.png" });
  await page.getByRole("button", { name: "Đóng chi tiết" }).click();
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
  await expect(page.locator('[data-testid^="story-node-"]')).toHaveCount(9);
  await page.screenshot({ path: "test-results/story-through-100-overview.png" });
});

test("upgrades the saved chapter 71 map while keeping an uploaded portrait and personal notes", async ({ page }) => {
  await page.goto(route);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.evaluate((seed) => {
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 30;
    canvas.getContext("2d")!.fillRect(0, 0, 30, 30);
    const goose = seed.nodes.find((node) => node.id === "white-goose")! as typeof seed.nodes[number] & { portrait?: string };
    goose.portrait = canvas.toDataURL("image/png");
    goose.summary = "Ghi chú riêng về đại sư huynh";
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v5", JSON.stringify(seed));
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
  }, previousSeed);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("searchbox").fill("Bạch Ánh Thiên");
  await page.getByRole("button", { name: "Tìm đến Ngỗng Trắng (Bạch Ánh Thiên)", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail.getByRole("img")).toBeVisible();
  await expect(detail).toContainText("Ghi chú riêng về đại sư huynh");
  await expect(page.getByTestId("story-node-saints")).toHaveCount(1);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("story-wiki:chu-gioi-tan-the-online:v5")!).nodes.length)).toBe(79);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("story-wiki:chu-gioi-tan-the-online:v13")!).nodes.find((node: { id: string }) => node.id === "white-goose").summary)).toBe("Ghi chú riêng về đại sư huynh");
});
