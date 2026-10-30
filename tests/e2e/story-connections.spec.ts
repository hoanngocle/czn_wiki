import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
});

for (const zoom of [75, 125]) {
  test(`connects nodes by dragging at ${zoom}%, renames, persists and deletes the link`, async ({ page }) => {
    await page.getByRole("button", { name: "Đặt lại 100%" }).click();
    await page.getByRole("button", { name: zoom === 75 ? "Thu nhỏ" : "Phóng to", exact: true }).click();
    await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ");
    await page.getByRole("button", { name: "Tìm đến Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ", exact: true }).click();
    await page.getByRole("button", { name: "Đóng chi tiết" }).click();
    const source = page.getByTestId("connect-handle-rescue");
    const target = page.getByTestId("story-node-anna");
    // The chapter graph is taller; bring the upper row into view before dragging.
    const board = page.getByTestId("story-viewport");
    const boardBox = (await board.boundingBox())!;
    await board.focus();
    for (let step = 0; step < 30 && Math.min((await target.boundingBox())!.y, (await source.boundingBox())!.y - 70) < boardBox.y + 20; step++) {
      await page.keyboard.press("ArrowUp");
    }
    expect((await target.boundingBox())!.y).toBeGreaterThanOrEqual(boardBox.y + 20);
    // Keep the drop point above the bottom toolbar when the two lanes are far apart.
    for (let step = 0; step < 30; step++) {
      const targetBox = (await target.boundingBox())!;
      if (targetBox.y + targetBox.height / 2 < boardBox.y + boardBox.height - 80) break;
      await page.keyboard.press("ArrowDown");
    }
    expect((await source.boundingBox())!.y).toBeGreaterThan(boardBox.y);
    const originalNode = await page.getByTestId("story-node-rescue").getAttribute("style");
    const originalView = await page.getByTestId("story-scene").getAttribute("style");
    const a = (await source.boundingBox())!;
    const b = (await target.boundingBox())!;
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    await page.mouse.move(b.x + 20, b.y + b.height / 2, { steps: 10 });
    await page.mouse.up();
    const editor = page.getByRole("dialog", { name: "Đường nối" });
    await expect(editor).toBeVisible();
    await editor.getByLabel("Tên đường nối").fill("Khám phá thế giới");
    await editor.getByRole("button", { name: "Lưu tên" }).click();
    await expect(page.getByTestId("story-link-rescue-anna")).toHaveCount(1);
    await expect(page.getByTestId("story-node-rescue")).toHaveAttribute("style", originalNode!);
    await expect(page.getByTestId("story-scene")).toHaveAttribute("style", originalView!);
    await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
    await page.getByRole("button", { name: "Xem toàn bộ sơ đồ", exact: true }).click();
    await page.getByRole("button", { name: "Đường nối Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ đến Thiên Thần Rực Lửa và gặp Anna: Khám phá thế giới", exact: true }).click();
    await expect(editor.getByLabel("Tên đường nối")).toHaveValue("Khám phá thế giới");
    await editor.getByRole("button", { name: "Xóa đường nối", exact: true }).click();
    await editor.getByRole("button", { name: "Xác nhận xóa" }).click();
    await expect(page.getByTestId("story-link-rescue-anna")).toHaveCount(0);
    await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
    await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
    await expect(page.getByTestId("story-link-rescue-anna")).toHaveCount(0);
    await expect(page.getByTestId("story-node-rescue")).toHaveCount(1);
    await expect(page.getByTestId("story-node-anna")).toHaveCount(1);
  });
}

test("supports click-to-connect, rejects self links and avoids duplicate links", async ({ page }) => {
  await page.getByTestId("connect-handle-rescue").click();
  await page.getByTestId("story-node-rescue").click();
  await expect(page.getByTestId("story-link-rescue-rescue")).toHaveCount(0);
  await page.getByTestId("connect-handle-rescue").click();
  await page.getByTestId("story-node-sword").click();
  const editor = page.getByRole("dialog", { name: "Đường nối" });
  await expect(editor).toBeVisible();
  await editor.getByRole("button", { name: "Đóng", exact: true }).click();
  await expect(page.getByTestId("story-link-rescue-sword")).toHaveCount(1);
  await page.getByTestId("connect-handle-rescue").focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Escape");
  await page.getByTestId("story-node-anna").click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toBeVisible();
  await expect(page.getByTestId("story-link-rescue-anna")).toHaveCount(0);
});

test("drops on blank canvas without creating a link or moving the board", async ({ page }) => {
  const handle = (await page.getByTestId("connect-handle-rescue").boundingBox())!;
  const board = (await page.getByTestId("story-viewport").boundingBox())!;
  const before = await page.getByTestId("story-scene").getAttribute("style");
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
  await page.mouse.down();
  await page.mouse.move(board.x + 15, board.y + 15, { steps: 8 });
  await page.mouse.up();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByTestId("story-scene")).toHaveAttribute("style", before!);
  await expect(page.getByTestId("connection-preview")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^Đường nối / })).toHaveCount(8);
});

test("shows the simplified enlarged details with icon actions and chapter start", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByTestId("story-node-awakening").click();
  const panel = page.getByRole("complementary", { name: "Chi tiết wiki" });
  expect((await panel.boundingBox())!.width).toBeGreaterThan(310);
  await expect(panel.getByRole("button", { name: "Sửa node" })).toHaveText("");
  await expect(panel.getByRole("button", { name: "Xóa node", exact: true })).toHaveText("");
  await expect(panel).not.toContainText("Kết nối trong wiki");
  await expect(panel).not.toContainText("NGUỒN THAM KHẢO");
  await expect(panel).not.toContainText("Kéo node để sắp xếp");
  await expect(page.getByRole("complementary", { name: "Mục lục wiki" })).toContainText("Chương 1–300");
});

for (const pair of [
  { source: "rescue", target: "awakening", forward: "Thức tỉnh Chiến Thần, tu luyện Loạn Vũ đến Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ: Giải cứu", reverse: "Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ đến Thức tỉnh Chiến Thần, tu luyện Loạn Vũ", original: "Giải cứu", vertical: false },
  { source: "truong-da-trap", target: "awakening", forward: "Thức tỉnh Chiến Thần, tu luyện Loạn Vũ đến Phá bẫy, hóa giải hiểu lầm: Song song", reverse: "Phá bẫy, hóa giải hiểu lầm đến Thức tỉnh Chiến Thần, tu luyện Loạn Vũ", original: "Song song", vertical: true },
]) {
test(`keeps both directions separately selectable (${pair.source})`, async ({ page }) => {
  await page.getByTestId(`connect-handle-${pair.target}`).click();
  await page.getByTestId(`story-node-${pair.source}`).click();
  await page.getByRole("dialog", { name: "Đường nối" }).getByLabel("Tên đường nối").fill(pair.original);
  await page.getByRole("button", { name: "Lưu tên", exact: true }).click();
  await page.getByTestId(`connect-handle-${pair.source}`).click();
  await page.getByTestId(`story-node-${pair.target}`).click();
  const editor = page.getByRole("dialog", { name: "Đường nối" });
  await editor.getByLabel("Tên đường nối").fill("Chiều ngược");
  await editor.getByRole("button", { name: "Lưu tên" }).click();
  const forward = page.getByRole("button", { name: `Đường nối ${pair.forward}`, exact: true });
  const reverse = page.getByRole("button", { name: `Đường nối ${pair.reverse}: Chiều ngược`, exact: true });
  const a = (await forward.boundingBox())!;
  const b = (await reverse.boundingBox())!;
  if (pair.vertical) expect(Math.abs((a.x + a.width / 2) - (b.x + b.width / 2))).toBeGreaterThan((a.width + b.width) / 2);
  else expect(Math.abs(a.y - b.y)).toBeGreaterThan(a.height);
  await forward.click();
  await expect(editor.getByLabel("Tên đường nối")).toHaveValue(pair.original);
  await editor.getByRole("button", { name: "Đóng", exact: true }).click();
  await reverse.click();
  await expect(editor.getByLabel("Tên đường nối")).toHaveValue("Chiều ngược");
});
}
