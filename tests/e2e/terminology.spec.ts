import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`glossary keeps bilingual names and distinct definitions at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/terminology");
    const glossary = page.getByRole("region", { name: "Danh sách thuật ngữ" });
    const search = page.getByRole("searchbox", { name: "Tìm thuật ngữ" });
    await search.fill("Performance Buzz");
    await expect(glossary.locator("dt")).toHaveCount(1);
    await expect(glossary.locator("dt")).toContainText("Sức nóng sân khấu");
    await expect(glossary.locator("dd")).toContainText("100%");
    await expect(glossary.locator("dd")).toContainText("150%");
    await search.fill("giu lai");
    const retained = glossary.locator("dl > div").filter({ has: page.locator("dt", { hasText: /^Giữ lạiRetain$/ }) });
    await expect(retained).toContainText("Đặc tính lá bài");
    await expect(retained).toContainText("Điều kiện kích hoạt");
    await search.fill("Action Points");
    await expect(glossary.locator("dt")).toHaveCount(1);
    await expect(glossary.locator("dt")).toContainText("Điểm hành động");
    await search.fill("khong-co-thuat-ngu-nay");
    await expect(glossary.getByRole("status")).toContainText("Không tìm thấy");
    await search.fill("");
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath("glossary-light.png") });
    if (width < 768) await page.getByRole("button", { name: "Mở điều hướng" }).click();
    await page.getByRole("button", { name: /Đổi giao diện/ }).click();
    if (width < 768) await page.keyboard.press("Escape");
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath("glossary-dark.png") });
  });
}
