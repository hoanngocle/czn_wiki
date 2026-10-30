import { expect, test } from "@playwright/test";
import { storyNodes } from "../../lib/story/timeline";

const route = "/ebooks/chu-gioi-tan-the-online";

test("replaces the vertical diagram with two horizontal branches covering chapters 1–300", async ({ page }) => {
  await page.evaluate(() => {
    localStorage.removeItem("story-wiki:chu-gioi-tan-the-online:v13");
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v1", JSON.stringify({ version: 1, nodes: [{ id: "old", title: "Sơ đồ cũ", kind: "event", summary: "", eyebrow: "Chương 1", x: 0, y: 0 }], links: [] }));
    localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v2", JSON.stringify({ version: 1, nodes: [], links: [] }));
  });
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await expect(page.getByTestId("story-node-old")).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem("story-wiki:chu-gioi-tan-the-online:v1"))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem("story-wiki:chu-gioi-tan-the-online:v2"))).toBeNull();
  await expect(page.getByRole("complementary", { name: "Mục lục wiki" })).toContainText("Chương 1–300");
  await expect(page.locator('[data-fork="true"]')).toHaveCount(2);
  await expect(page.locator('[data-testid^="story-node-"]')).toHaveCount(9);
  for (const node of storyNodes.filter((node) => node.kind === "event" || node.id === "hero")) {
    const title = page.getByTestId(`story-node-${node.id}`).locator("strong");
    await expect(title).toHaveCSS("white-space", "normal");
    await expect(title).not.toHaveCSS("text-overflow", "ellipsis");
    expect(await title.evaluate((element) => element.scrollHeight <= element.clientHeight && element.scrollWidth <= element.clientWidth)).toBe(true);
  }
  const root = (await page.getByTestId("story-node-hero").boundingBox())!;
  for (const realm of ["cultivation", "reality"]) {
    const stages = storyNodes.filter((node) => node.kind === "event" && node.realm === realm);
    expect(stages).toHaveLength(4);
    let previousRight = root.x + root.width;
    const first = (await page.getByTestId(`story-node-${stages[0].id}`).boundingBox())!;
    if (realm === "cultivation") expect(first.y + first.height).toBeLessThan(root.y + root.height / 2);
    else expect(first.y).toBeGreaterThan(root.y + root.height / 2);
    for (const node of stages) {
      const card = (await page.getByTestId(`story-node-${node.id}`).boundingBox())!;
      expect(card.x).toBeGreaterThan(previousRight);
      expect(card.y).toBeCloseTo(first.y);
      previousRight = card.x + card.width;
    }
  }
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Tạ Đạo Linh");
  await page.getByRole("button", { name: "Tìm đến Bách Hoa Tiên Tử (Tạ Đạo Linh)", exact: true }).click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toContainText("Chương 54");
  await page.getByRole("button", { name: "Đóng chi tiết" }).click();
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Nữ Thần Công Chính");
  await page.getByRole("button", { name: "Tìm đến Thiên Thần Rực Lửa và gặp Anna", exact: true }).click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toContainText("cấp SSS");
  await page.getByRole("button", { name: "Đóng chi tiết" }).click();
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
  await page.screenshot({ path: "test-results/story-two-worlds-desktop.png" });
});

test.beforeEach(async ({ page }) => {
  await page.goto(route);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page).toHaveTitle(/Chư Giới Tận Thế Online/);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
});

test("zooms around the viewport and clamps at both limits", async ({ page }) => {
  const zoom = page.getByRole("status", { name: "Tỷ lệ thu phóng" });
  await page.getByRole("button", { name: "Đặt lại 100%" }).click();
  await expect(zoom).toHaveText("100%");
  const board = page.getByTestId("story-viewport");
  const bounds = (await board.boundingBox())!;
  const card = page.getByTestId("story-node-rescue");
  const before = (await card.boundingBox())!;
  await page.getByRole("button", { name: "Phóng to", exact: true }).click();
  await expect(zoom).toHaveText("125%");
  const after = (await card.boundingBox())!;
  expect(after.x - (bounds.x + bounds.width / 2)).toBeCloseTo((before.x - (bounds.x + bounds.width / 2)) * 1.25, 0);
  for (let i = 0; i < 10; i++) await page.getByRole("button", { name: "Phóng to", exact: true }).click({ force: true });
  await expect(zoom).toHaveText("200%");
  for (let i = 0; i < 10; i++) await page.getByRole("button", { name: "Thu nhỏ", exact: true }).click({ force: true });
  await expect(zoom).toHaveText("3%");
});

test("opens details without moving the board", async ({ page }) => {
  const scene = page.getByTestId("story-scene");
  const transform = await scene.getAttribute("style");
  await page.getByTestId("story-node-rescue").click();
  const details = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(details.getByRole("heading", { name: "Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ" })).toBeVisible();
  await expect(scene).toHaveAttribute("style", transform!);
  await page.getByRole("button", { name: "Đóng chi tiết" }).click();
  await page.getByTestId("story-node-hero").click();
  await expect(details.getByRole("heading", { name: "Cố Thanh Sơn" })).toBeVisible();
  await page.getByRole("button", { name: "Đóng chi tiết" }).click();
  await expect(details).toHaveCount(0);
});

test("releases a drag outside the board and fits after resizing", async ({ page }) => {
  const board = page.getByTestId("story-viewport");
  const scene = page.getByTestId("story-scene");
  const rect = (await board.boundingBox())!;
  const before = await scene.getAttribute("style");
  await page.mouse.move(rect.x + 35, rect.y + 120);
  await page.mouse.down();
  await page.mouse.move(rect.x + 130, rect.y + 160);
  await expect(scene).not.toHaveAttribute("style", before!);
  await page.mouse.move(15, 15);
  await page.mouse.up();
  const stopped = await scene.getAttribute("style");
  await page.mouse.move(rect.x + 200, rect.y + 70);
  await expect(scene).toHaveAttribute("style", stopped!);
  await page.setViewportSize({ width: 1100, height: 850 });
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
  const fitted = (await board.boundingBox())!;
  for (const id of ["awakening", "rescue", "sword"]) {
    const node = (await page.getByTestId(`story-node-${id}`).boundingBox())!;
    expect(node.x).toBeGreaterThanOrEqual(fitted.x);
    expect(node.x + node.width).toBeLessThanOrEqual(fitted.x + fitted.width);
  }
});

test("searches Vietnamese names without accents and recovers from no results", async ({ page }) => {
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("co thanh son");
  await page.getByRole("button", { name: "Tìm đến Cố Thanh Sơn" }).click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toContainText("Cố Thanh Sơn");
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("zzzzzz");
  await expect(page.getByText("Không tìm thấy mục phù hợp.")).toBeVisible();
  await page.getByRole("button", { name: "Xóa tìm kiếm" }).click();
  await expect(page.getByRole("searchbox", { name: "Tìm trong wiki" })).toHaveValue("");
});

test("fits every node into the space beside the open details panel", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByTestId("story-node-rescue").click();
  const panel = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(panel).toBeVisible();
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
  const panelBounds = (await panel.boundingBox())!;
  const boardBounds = (await page.getByTestId("story-viewport").boundingBox())!;
  for (const { id } of storyNodes.filter((node) => node.kind === "event" || node.id === "hero")) {
    const node = (await page.getByTestId(`story-node-${id}`).boundingBox())!;
    expect(node.x).toBeGreaterThanOrEqual(boardBounds.x);
    expect(node.x + node.width).toBeLessThanOrEqual(panelBounds.x);
  }
});

test("keeps zoom and details accessible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ");
  await page.getByRole("button", { name: "Tìm đến Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ", exact: true }).click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toBeVisible();
  await page.screenshot({ path: "test-results/story-timeline-mobile.png" });
  await page.getByRole("button", { name: "Đóng chi tiết" }).click();
  await page.getByRole("button", { name: "Phóng to", exact: true }).click();
  await expect(page.getByRole("status", { name: "Tỷ lệ thu phóng" })).not.toHaveText("3%");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
