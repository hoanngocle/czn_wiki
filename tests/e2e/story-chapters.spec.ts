import { expect, test } from "@playwright/test";
import { storyNodes } from "../../lib/story/timeline";
import previousSeed from "../../lib/story/legacy/v6.json";
import seedV7 from "../../lib/story/legacy/v7.json";
import seedV8 from "../../lib/story/legacy/v8.json";
import seedV9 from "../../lib/story/legacy/v9.json";
import seedV10 from "../../lib/story/legacy/v10.json";
import seedV11 from "../../lib/story/legacy/v11.json";
import seedV12 from "../../lib/story/legacy/v12.json";

test("combines the cosmic material search and outbreak into chapters 85–95", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.evaluate((seed) => {
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v12", JSON.stringify(seed));
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
  }, seedV12);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByTestId("story-node-outbreak")).toHaveCount(0);
  await page.getByRole("searchbox").fill("Kết minh Anh Hào");
  await page.getByRole("button", { name: "Tìm đến Kết minh Anh Hào, tìm Vũ Trụ chủng và dịch quỷ bùng phát", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail).toContainText("Thế giới thực · Chương 85–95");
  await expect(detail.locator("section")).toHaveCount(11);
  await expect(detail.getByRole("heading", { name: /^Chương 85:/ })).toHaveCount(1);
  await expect(detail.getByRole("heading", { name: /^Chương 95:/ })).toHaveCount(1);
  await expect(detail.getByRole("button", { name: /Lần đầu đề cập/ })).toHaveCount(7);
  await expect(page.getByTestId("story-link-impartial-goddess-cosmic-search")).toHaveCount(1);
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
  const title = page.getByTestId("story-node-cosmic-search").locator("strong");
  expect(await title.evaluate((element) => element.scrollWidth <= element.clientWidth && element.scrollHeight <= element.clientHeight)).toBe(true);
  await page.screenshot({ path: "test-results/story-merged-cosmic.png" });
});

test("combines the selected reality milestones and all their first appearances", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.evaluate((seed) => {
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v11", JSON.stringify(seed));
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
  }, seedV11);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  for (const id of ["archery", "sea", "upgrade"]) await expect(page.getByTestId(`story-node-${id}`)).toHaveCount(0);
  await page.getByRole("searchbox").fill("Liên Bang bảo hộ");
  await page.getByRole("button", { name: "Tìm đến Liên Bang bảo hộ, kết giao Anna và đối đầu Cửu phủ", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail).toContainText("Thế giới thực · Chương 21–27, 38–44, 69–80");
  await expect(detail.locator("section")).toHaveCount(26);
  for (const chapter of [21, 27, 38, 44, 69, 70, 80]) await expect(detail.getByRole("heading", { name: new RegExp(`^Chương ${chapter}:`) })).toHaveCount(1);
  for (const chapter of [28, 37, 45, 68]) await expect(detail.getByRole("heading", { name: new RegExp(`^Chương ${chapter}:`) })).toHaveCount(0);
  await expect(detail.getByRole("button", { name: /Lần đầu đề cập/ })).toHaveCount(23);
  await expect(page.getByTestId("story-link-impartial-goddess-cosmic-search")).toHaveCount(1);
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
  await page.screenshot({ path: "test-results/story-merged-reality.png" });
});

test("combines the rescue, sect family and Foundation Establishment without including intervening reality chapters", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.evaluate((seed) => {
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v10", JSON.stringify(seed));
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
  }, seedV10);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByTestId("story-node-sect-family")).toHaveCount(0);
  await expect(page.getByTestId("story-node-foundation")).toHaveCount(0);
  await page.getByRole("searchbox").fill("Bách Hoa cứu viện");
  await page.getByRole("button", { name: "Tìm đến Bách Hoa cứu viện, nhập sư môn và Trúc Cơ", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail).toContainText("Tu Hành · Chương 66–69, 80–85, 95–100");
  await expect(detail.locator("section")).toHaveCount(16);
  for (const chapter of [66, 69, 80, 85, 95, 100]) await expect(detail.getByRole("heading", { name: new RegExp(`^Chương ${chapter}:`) })).toHaveCount(1);
  for (const chapter of [70, 79, 86, 94]) await expect(detail.getByRole("heading", { name: new RegExp(`^Chương ${chapter}:`) })).toHaveCount(0);
  await expect(detail.getByRole("button", { name: /Lần đầu đề cập/ })).toHaveCount(10);
  await expect(page.getByTestId("story-link-sword-saints")).toHaveCount(1);
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
  const title = page.getByTestId("story-node-saints").locator("strong");
  expect(await title.evaluate((element) => element.scrollWidth <= element.clientWidth && element.scrollHeight <= element.clientHeight)).toBe(true);
  await page.screenshot({ path: "test-results/story-merged-saints.png" });
});

test("combines the escape, Bach Hoa trial and apprenticeship into chapters 44–65", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.evaluate((seed) => {
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v9", JSON.stringify(seed));
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
  }, seedV9);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByTestId("story-node-bach-hoa")).toHaveCount(0);
  await expect(page.getByTestId("story-node-apprenticeship")).toHaveCount(0);
  await page.getByRole("searchbox").fill("Thoát Thần Võ");
  await page.getByRole("button", { name: "Tìm đến Thoát Thần Võ, đến Bách Hoa và bái sư", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail).toContainText("Tu Hành · Chương 44–65");
  await expect(detail.locator("section")).toHaveCount(22);
  await expect(detail.getByRole("heading", { name: /^Chương 44:/ })).toHaveCount(1);
  await expect(detail.getByRole("heading", { name: /^Chương 65:/ })).toHaveCount(1);
  await expect(detail.getByRole("button", { name: /Lần đầu đề cập/ })).toHaveCount(12);
  await expect(page.getByTestId("story-link-sword-saints")).toHaveCount(1);
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
  await page.screenshot({ path: "test-results/story-merged-bach-hoa.png" });
});

test("combines rescue and the journey to Than Vo into chapters 28–37", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.evaluate((seed) => {
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v8", JSON.stringify(seed));
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
  }, seedV8);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByTestId("story-node-than-vo")).toHaveCount(0);
  await page.getByRole("searchbox").fill("Giải cứu Công Tôn Trí");
  await page.getByRole("button", { name: "Tìm đến Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail).toContainText("Tu Hành · Chương 28–37");
  await expect(detail.locator("section")).toHaveCount(10);
  await expect(detail.getByRole("heading", { name: /^Chương 28:/ })).toHaveCount(1);
  await expect(detail.getByRole("heading", { name: /^Chương 37:/ })).toHaveCount(1);
  await expect(detail.getByRole("button", { name: /Lần đầu đề cập/ })).toHaveCount(6);
  await expect(page.getByTestId("story-link-rescue-sword")).toHaveCount(1);
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
  await page.screenshot({ path: "test-results/story-merged-rescue.png" });
});

test("combines the first cultivation milestones and their character introductions in a saved diagram", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.evaluate((seed) => {
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v7", JSON.stringify(seed));
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
  }, seedV7);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByTestId("story-node-training")).toHaveCount(0);
  await page.getByTestId("story-node-awakening").click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail).toContainText("Tu Hành · Chương 1–4, 12–16");
  await expect(detail.getByRole("heading", { name: "Thức tỉnh Chiến Thần, tu luyện Loạn Vũ", exact: true })).toBeVisible();
  await expect(detail.locator("section")).toHaveCount(9);
  await expect(detail.getByRole("heading", { name: /^Chương 12:/ })).toHaveCount(1);
  await expect(detail.getByRole("heading", { name: /^Chương 16:/ })).toHaveCount(1);
  await expect(detail.getByRole("heading", { name: /^Chương 5:/ })).toHaveCount(0);
  await expect(detail.getByRole("button", { name: /Lần đầu đề cập/ })).toHaveCount(8);
  await expect(page.getByTestId("story-link-awakening-rescue")).toHaveCount(1);
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
  await page.screenshot({ path: "test-results/story-merged-awakening.png" });
});

test("merges saved chapters 69–80 and places their narrative before characters without a source disclosure", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.evaluate((seed) => {
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v6", JSON.stringify(seed));
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
  }, previousSeed);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByTestId("story-node-sea")).toHaveCount(0);
  await page.getByRole("searchbox").fill("Liên Bang bảo hộ");
  await page.getByRole("button", { name: "Tìm đến Liên Bang bảo hộ, kết giao Anna và đối đầu Cửu phủ", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail).toContainText("Thế giới thực · Chương 21–27, 38–44, 69–80");
  await expect(detail.getByRole("heading", { name: "Chương 69: Tóc bạc", exact: true })).toBeVisible();
  await expect(detail.getByRole("heading", { name: "Chương 70: Tới rồi", exact: true })).toBeVisible();
  await expect(detail.locator("section")).toHaveCount(26);
  await expect(detail.locator("details")).toHaveCount(0);
  await expect(detail).not.toContainText("Nguồn:");
  await expect(detail).not.toContainText("Diễn biến theo từng chương");
  const headings = await detail.getByRole("heading").allTextContents();
  expect(headings.at(-1)).toBe("Nhân vật được giới thiệu");
  expect(headings.at(-2)).toMatch(/^Chương 80:/);
  await expect(detail.getByRole("button", { name: "Trương Anh Hào Lần đầu đề cập · Chương 74", exact: true })).toHaveCount(1);
  await page.screenshot({ path: "test-results/story-merged-69-80.png" });
});

test("opens at readable scale and exposes chapter notes, first mentions and portrait slots", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  expect((await page.getByTestId("story-node-awakening").boundingBox())!.width).toBeGreaterThanOrEqual(180);
  await page.screenshot({ path: "test-results/story-chapters-readable.png" });
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Phá bẫy, hóa giải hiểu lầm");
  await page.getByRole("button", { name: "Tìm đến Phá bẫy, hóa giải hiểu lầm", exact: true }).click();
  const detail = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(detail).toContainText("Thế giới thực · Chương 4–11");
  await expect(detail.getByRole("heading", { name: "Chương 6: Nói thẳng", exact: true })).toBeVisible();
  await expect(detail).toContainText("kim có máu");
  await detail.getByRole("button", { name: "Anna Lần đầu đề cập · Chương 8", exact: true }).click();
  await expect(detail.getByRole("heading", { name: "Anna", exact: true })).toBeVisible();
  await expect(detail).toContainText("chương 17");
  await expect(detail).toContainText("chương 20");
  await expect(detail.getByRole("button", { name: "Thêm ảnh nhân vật" })).toBeVisible();
  expect(await detail.evaluate((element) => element.scrollTop)).toBe(0);
  await page.screenshot({ path: "test-results/story-character-profile.png" });
  await detail.getByRole("button", { name: "Về mốc giới thiệu" }).click();
  await expect(detail.getByRole("heading", { name: "Phá bẫy, hóa giải hiểu lầm", exact: true })).toBeVisible();
});

test("expands character nodes with full titles and restores the two-branch overview", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("button", { name: /Hiện node nhân vật/ }).click();
  await expect(page.locator("[data-testid^='story-node-']")).toHaveCount(storyNodes.length);
  for (const character of storyNodes.filter((node) => node.kind === "character")) {
    const title = page.getByTestId(`story-node-${character.id}`).locator("strong");
    expect(await title.evaluate((element) => element.scrollWidth <= element.clientWidth && element.scrollHeight <= element.clientHeight)).toBe(true);
  }
  await expect(page.getByTestId("story-link-truong-da-trap-anna-character")).toHaveCount(1);
  await page.getByRole("button", { name: /Ẩn node nhân vật/ }).click();
  await expect(page.locator("[data-testid^='story-node-']")).toHaveCount(9);
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
});
