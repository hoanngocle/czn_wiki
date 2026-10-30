import { expect, test } from "@playwright/test";

test("uploads, preserves on invalid replacement, persists and removes a character portrait", async ({ page }) => {
  await page.goto("/ebooks/chu-gioi-tan-the-online");
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  const selectHero = async () => {
    await page.getByRole("searchbox", { name: "Tìm trong wiki" }).fill("Cố Thanh Sơn");
    await page.getByRole("button", { name: "Tìm đến Cố Thanh Sơn", exact: true }).click();
  };
  await selectHero();
  const details = page.getByRole("complementary", { name: "Chi tiết wiki" });
  await details.getByRole("button", { name: "Thêm ảnh nhân vật" }).click();
  const editor = page.getByRole("dialog");
  const png = await page.evaluate(() => {
    const canvas = document.createElement("canvas"); canvas.width = 900; canvas.height = 600;
    const context = canvas.getContext("2d")!; context.fillStyle = "#42654d"; context.fillRect(0, 0, 900, 600);
    return canvas.toDataURL("image/png").split(",")[1];
  });
  await editor.getByLabel("Chọn ảnh nhân vật").setInputFiles({ name: "hero.png", mimeType: "image/png", buffer: Buffer.from(png, "base64") });
  await expect(editor.getByRole("img", { name: "Ảnh nhân vật xem trước" })).toBeVisible();
  const original = await editor.getByRole("img").getAttribute("src");
  await expect.poll(() => editor.getByRole("img").evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(512);
  await editor.getByLabel("Chọn ảnh nhân vật").setInputFiles({ name: "large.png", mimeType: "image/png", buffer: Buffer.alloc(8 * 1024 * 1024 + 1) });
  await expect(editor.getByRole("alert")).toContainText("8 MB");
  await expect(editor.getByRole("img")).toHaveAttribute("src", original!);
  await editor.getByLabel("Chọn ảnh nhân vật").setInputFiles({ name: "bad.svg", mimeType: "image/svg+xml", buffer: Buffer.from("<svg/>") });
  await expect(editor.getByRole("alert")).toContainText("PNG, JPEG hoặc WebP");
  await expect(editor.getByRole("img")).toHaveAttribute("src", original!);
  await editor.getByRole("button", { name: "Lưu thay đổi" }).click();
  await expect(details.getByRole("img", { name: "Ảnh Cố Thanh Sơn" })).toBeVisible();
  await page.screenshot({ path: "test-results/story-character-uploaded.png" });
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click(); await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true"); await selectHero();
  await expect(details.getByRole("img")).toHaveAttribute("src", original!);
  await details.getByRole("button", { name: "Đổi ảnh nhân vật" }).click();
  await editor.getByRole("button", { name: "Xóa ảnh" }).click();
  await editor.getByRole("button", { name: "Lưu thay đổi" }).click();
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click(); await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true"); await selectHero();
  await expect(details.getByRole("img")).toHaveCount(0);
  await expect(details.getByRole("button", { name: "Thêm ảnh nhân vật" })).toBeVisible();
});
