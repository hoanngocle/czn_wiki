import { expect, test } from "@playwright/test";

test("upgrade cards show their category icon", async ({ page }) => {
  await page.goto("/combatant/selena");
  const card = page.getByRole("button", { name: "Sniper's Domain card", exact: true });
  const icon = card.locator('img[src="/assets/card/icon_category_card_power.webp"]');
  await expect(icon).toBeVisible();
  await expect.poll(() => icon.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
});

for (const width of [1440, 390]) {
  test(`localized shared cards and guide assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/combatant/renoa");
    const tabs = page.getByRole("tablist", { name: "Renoa hướng dẫn" });
    await expect(tabs.getByRole("tab")).toHaveText(["Thẻ bài", "Đánh giá", "Xây dựng", "Bộ bài"]);
    await expect(page.getByRole("heading", { name: "Bài khởi đầu" })).toBeVisible();
    const echo = page.getByRole("button", { name: "Echo of Sorrow card", exact: true });
    const artwork = await echo.locator("img").first().evaluate((img: HTMLImageElement) => new URL(img.src).pathname);
    await echo.click();
    await expect(page.getByRole("dialog").getByRole("note")).toHaveCount(5);
    await expect(page.getByRole("button", { name: "Thức tỉnh bài 5", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Đóng hộp thoại" }).click();
    await tabs.getByRole("tab", { name: "Đánh giá", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Điểm mạnh" })).toBeVisible();
    await tabs.getByRole("tab", { name: "Xây dựng", exact: true }).click();
    await expect(page.getByRole("table", { name: "Xếp hạng Đối tác" })).toContainText("Kiara");
    await tabs.getByRole("tab", { name: "Bộ bài", exact: true }).click();
    const list = page.getByRole("list", { name: "Các lá trong bộ bài" });
    await expect(list.getByRole("listitem")).toHaveCount(7);
    expect(await list.getByRole("button", { name: "Echo of Sorrow V card", exact: true }).locator("img").first().evaluate((img: HTMLImageElement) => new URL(img.src).pathname)).toBe(artwork);
    await expect(list.getByRole("listitem").filter({ hasText: "Rút 1 lá" })).toHaveCount(3);
    await page.getByRole("tab", { name: "Renoa hỗ trợ rút bài", exact: true }).click();
    const flower = list.getByRole("button", { name: "Flower of Devoured Fate IV card", exact: true });
    await expect(flower).toHaveCount(4);
    await expect(flower.first().locator("strong").first()).toHaveText("0");
    await flower.first().click();
    await expect(page.getByRole("dialog").getByRole("button", { name: "Flower of Devoured Fate IV card", exact: true }).locator("strong").first()).toHaveText("0");
    await page.keyboard.press("Escape");
    const vi = page.getByRole("checkbox", { name: "Tiếng Việt" });
    await vi.uncheck();
    await expect(page.getByRole("tablist", { name: "Renoa guide" }).getByRole("tab")).toHaveText(["Card", "Review", "Build", "Deck"]);
    await expect(page.getByRole("tab", { name: "Draw Renoa", exact: true })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("list", { name: "Deck cards" })).toContainText("Draw");
    await page.reload();
    await expect(vi).not.toBeChecked();
    await expect(page.getByRole("heading", { name: "Start Cards" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("all guide images load and failed card artwork has a readable fallback", async ({ page }) => {
  await page.goto("/combatant/renoa");
  for (const name of ["Đánh giá", "Xây dựng", "Bộ bài"]) {
    await page.getByRole("tablist", { name: "Renoa hướng dẫn" }).getByRole("tab", { name, exact: true }).click();
    const images = page.getByRole("tabpanel").locator("img").filter({ visible: true });
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  }
  await page.route("**/assets/card/unique_1041_02.webp", route => route.abort());
  await page.reload();
  await page.getByRole("tab", { name: "Bộ bài", exact: true }).click();
  await expect(page.locator('[data-image-placeholder="Flower of Devoured Fate I"]').filter({ visible: true })).toHaveCount(3);
});
