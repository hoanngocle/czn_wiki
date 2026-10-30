import { test, expect } from "@playwright/test";

for (const chapter of [4, 14, 100]) {
  test(`cultivation status presents recorded soul power at chapter ${chapter}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.addInitScript((chapter) => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter })), chapter);
    await page.goto("/ebooks/chu-gioi-tan-the-online/chien-than");
    await expect(page.getByLabel("Chương hiện tại")).toHaveValue(String(chapter));
    const soul = page.getByRole("region", { name: "Hồn lực", exact: true });
    const meter = soul.getByRole("progressbar");
    if (chapter === 4) {
      await expect(page.getByTestId("realm")).toContainText("Luyện Khí tầng 2");
      await expect(soul).toContainText("— / —");
      await expect(soul).not.toContainText("Chưa có dữ liệu hồn lực");
      await expect(meter).toHaveCount(0);
    } else {
      await expect(meter).toHaveAttribute("aria-valuenow", chapter === 14 ? "2" : "20");
      await expect(meter).toHaveAttribute("aria-valuemax", chapter === 14 ? "6" : "20");
      await expect(soul).toContainText(chapter === 14 ? "2 / 6" : "530 / 20");
      if (chapter === 100) await expect(soul).toContainText("+510 vượt ngưỡng");
    }
    await page.screenshot({ path: `test-results/cultivation-${chapter}-desktop.png` });
    await page.setViewportSize({ width: 390, height: 844 });
    await soul.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/cultivation-${chapter}-mobile.png` });
  });
}
