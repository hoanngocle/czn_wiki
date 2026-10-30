import { expect, test } from "@playwright/test";

const route = "/ebooks/chu-gioi-tan-the-online";

test.beforeEach(async ({ page }) => {
  await page.goto(route);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
});

test("creates, edits, persists and deletes a node", async ({ page }) => {
  await page.getByRole("button", { name: "Thêm node", exact: true }).click();
  const editor = page.getByRole("dialog", { name: "Thêm node" });
  await editor.getByLabel("Tiêu đề", { exact: true }).fill("Mốc truyện của tôi");
  await editor.getByLabel("Loại node").selectOption("world");
  await editor.getByLabel("Nội dung").fill("Nội dung do tôi bổ sung.");
  await editor.getByLabel("Kết nối với").selectOption("rescue");
  await editor.getByRole("button", { name: "Tạo node" }).click();
  const details = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(details.getByRole("heading", { name: "Mốc truyện của tôi" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Đường nối Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ đến Mốc truyện của tôi: Liên quan", exact: true })).toHaveCount(1);
  await details.getByRole("button", { name: "Sửa node" }).click();
  await page.getByRole("dialog").getByLabel("Tiêu đề", { exact: true }).fill("Thế giới đã chỉnh sửa");
  await page.getByRole("button", { name: "Lưu thay đổi" }).click();
  await expect(details.getByRole("heading", { name: "Thế giới đã chỉnh sửa" })).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Thế giới đã chỉnh sửa");
  await page.getByRole("button", { name: "Tìm đến Thế giới đã chỉnh sửa" }).click();
  await expect(details).toContainText("Nội dung do tôi bổ sung.");
  await details.getByRole("button", { name: "Xóa node", exact: true }).click();
  await page.getByRole("button", { name: "Hủy xóa" }).click();
  await expect(details.getByRole("heading", { name: "Thế giới đã chỉnh sửa" })).toBeVisible();
  await details.getByRole("button", { name: "Xóa node", exact: true }).click();
  await page.getByRole("button", { name: "Xác nhận xóa" }).click();
  await expect(page.getByRole("button", { name: "Thế giới đã chỉnh sửa — Thế giới", exact: true })).toHaveCount(0);
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByRole("button", { name: "Thế giới đã chỉnh sửa — Thế giới", exact: true })).toHaveCount(0);
});

for (const { zoom, delta, expected } of [{ zoom: 75, delta: 90, expected: 1300 }, { zoom: 125, delta: 100, expected: 1260 }]) {
  test(`drags a node at ${zoom}% without panning, updates links and persists position`, async ({ page }) => {
    await page.getByRole("button", { name: "Đặt lại 100%" }).click();
    await page.getByRole("button", { name: zoom < 100 ? "Thu nhỏ" : "Phóng to", exact: true }).click();
    await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ");
    await page.getByRole("button", { name: "Tìm đến Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ", exact: true }).click();
    await page.getByRole("button", { name: "Đóng chi tiết" }).click();
    const node = page.getByTestId("story-node-rescue");
    const board = page.getByTestId("story-viewport");
    const boardBox = (await board.boundingBox())!;
    await board.focus();
    for (let step = 0; step < 20 && (await node.boundingBox())!.y < boardBox.y + 20; step++) {
      await page.keyboard.press("ArrowUp");
    }
    expect((await node.boundingBox())!.y).toBeGreaterThanOrEqual(boardBox.y + 20);
    const scene = page.getByTestId("story-scene");
    const transform = await scene.getAttribute("style");
    const edge = page.getByTestId("story-link-rescue-sword");
    const originalPath = await edge.getAttribute("d");
    const box = (await node.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + 35);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + delta, box.y + 65, { steps: 8 });
    await page.mouse.up();
    await expect(node).toHaveCSS("left", `${expected}px`);
    await expect(scene).toHaveAttribute("style", transform!);
    await expect(edge).not.toHaveAttribute("d", originalPath!);
    await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toHaveCount(0);
    await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
    await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
    await expect(node).toHaveCSS("left", `${expected}px`);
  });
}

test("deleting a seeded timeline node removes its edges and sidebar entry", async ({ page }) => {
  await page.getByTestId("story-node-rescue").click();
  await page.getByRole("button", { name: "Xóa node", exact: true }).click();
  await page.getByRole("button", { name: "Xác nhận xóa" }).click();
  await expect(page.getByTestId("story-node-rescue")).toHaveCount(0);
  await expect(page.getByTestId("story-link-rescue-sword")).toHaveCount(0);
  await expect(page.getByRole("complementary", { name: "Mục lục wiki" })).not.toContainText("Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ");
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
  await page.getByTestId("story-node-hero").click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toContainText("Cố Thanh Sơn");
});

test("validates blank titles and unsafe source URLs without losing the draft", async ({ page }) => {
  await page.getByRole("button", { name: "Thêm node", exact: true }).click();
  const editor = page.getByRole("dialog");
  await editor.getByLabel("Tiêu đề", { exact: true }).fill("   ");
  await editor.getByRole("button", { name: "Tạo node" }).click();
  await expect(editor.getByRole("alert")).toContainText("tiêu đề");
  await editor.getByLabel("Tiêu đề", { exact: true }).fill("Bản nháp");
  await editor.getByLabel("Đường dẫn nguồn").fill("javascript:alert(1)");
  await editor.getByRole("button", { name: "Tạo node" }).click();
  await expect(editor.getByRole("alert")).toContainText("http");
  await expect(editor.getByLabel("Tiêu đề", { exact: true })).toHaveValue("Bản nháp");
  await editor.getByRole("button", { name: "Hủy", exact: true }).click();
  await expect(editor).toHaveCount(0);
});

test("retains in-memory edits and reports a storage write failure", async ({ page }) => {
  await page.evaluate(() => {
    Storage.prototype.setItem = () => { throw new DOMException("Storage is full", "QuotaExceededError"); };
  });
  await page.getByTestId("story-node-rescue").click();
  await page.getByRole("button", { name: "Sửa node" }).click();
  await page.getByRole("dialog").getByLabel("Tiêu đề", { exact: true }).fill("Chỉnh sửa chưa lưu được");
  await page.getByRole("button", { name: "Lưu thay đổi" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText("Không thể lưu");
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" }).getByRole("heading", { name: "Chỉnh sửa chưa lưu được" })).toBeVisible();
  await expect(page.getByText("Chưa lưu được", { exact: true })).toBeVisible();
});

test("opens corrupt storage safely and preserves the raw value until an edit", async ({ page }) => {
  await page.evaluate(() => localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v13", "broken data"));
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText("Không đọc được sơ đồ đã lưu");
  await expect(page.getByTestId("story-node-rescue")).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("story-wiki:chu-gioi-tan-the-online:v13"))).toBe("broken data");
});

test("creates a node on mobile after restoring an intentionally empty board", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => localStorage.setItem("story-wiki:chu-gioi-tan-the-online:v13", JSON.stringify({ version: 1, nodes: [], links: [] })));
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("button", { name: "Tạo node đầu tiên" }).click();
  const editor = page.getByRole("dialog");
  await editor.getByLabel("Tiêu đề", { exact: true }).fill("Mốc mới trên điện thoại");
  await editor.getByLabel("Nội dung").fill("Ghi chú của tôi.");
  await page.screenshot({ path: "test-results/story-editor-mobile.png" });
  await editor.getByRole("button", { name: "Tạo node", exact: true }).click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" }).getByRole("heading", { name: "Mốc mới trên điện thoại" })).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await expect(page.getByRole("button", { name: "Mốc mới trên điện thoại — Sự kiện", exact: true })).toHaveCount(1);
  await expect(page.getByTestId("story-node-rescue")).toHaveCount(0);
});

test("keeps long editable text inside its card and preserves full detail text", async ({ page }) => {
  const title = "Một sự kiện rất dài trong hành trình của nhân vật chính ".repeat(3).slice(0, 150).trim();
  await page.getByRole("button", { name: "Thêm node", exact: true }).click();
  const editor = page.getByRole("dialog");
  await editor.getByLabel("Tiêu đề", { exact: true }).fill(title);
  await editor.getByLabel("Nhãn phụ").fill("Nhãnrấtdài".repeat(10));
  await editor.getByLabel("Nội dung").fill("Nộidungrấtdài".repeat(40));
  await editor.getByRole("button", { name: "Tạo node", exact: true }).click();
  const node = page.getByRole("button", { name: `${title} — Sự kiện`, exact: true });
  const heading = node.locator("strong");
  await expect(heading).toHaveCSS("white-space", "normal");
  await expect(heading).not.toHaveCSS("text-overflow", "ellipsis");
  expect(await heading.evaluate((element) => element.scrollWidth <= element.clientWidth && element.scrollHeight <= element.clientHeight)).toBe(true);
  expect(await node.evaluate((element) => element.scrollHeight <= element.clientHeight && element.scrollWidth <= element.clientWidth)).toBe(true);
  const details = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await expect(details.getByRole("heading", { name: title, exact: true })).toBeVisible();
  expect(await details.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
