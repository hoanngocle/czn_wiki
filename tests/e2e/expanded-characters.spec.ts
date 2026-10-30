import { expect, test } from "@playwright/test";

for (const [slug, name, starter] of [["narja", "Narja", "NA: Attack Response"], ["veronica", "Veronica", "Firing Preparation"], ["sereniel", "Sereniel", "Homing Laser"]]) {
  for (const width of [1440, 390]) {
    test(`${name} localized tabs, cards and assets at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`/czn/combatant/${slug}`);
      const tabs = page.getByRole("tablist", { name: `${name} hướng dẫn` });
      await expect(tabs.getByRole("tab")).toHaveText(["Card", "Đánh giá", "Build", "Deck"]);
      await expect(page.getByRole("heading", { name: "Start Cards" })).toBeVisible();
      await page.getByRole("button", { name: `${starter} card`, exact: true }).click();
      await expect(page.getByRole("dialog")).toContainText(starter);
      await expect(page.getByRole("dialog")).toContainText(/sát thương|Defense-Based Damage|Shield|Kích hoạt|Tạo 1 lá/i);
      await page.getByRole("button", { name: "Đóng hộp thoại" }).click();
      for (const tab of ["Đánh giá", "Build", "Deck"]) {
        await tabs.getByRole("tab", { name: tab, exact: true }).click();
        const images = page.getByRole("tabpanel").locator("img").filter({ visible: true });
        for (const img of await images.all()) {
          await img.scrollIntoViewIfNeeded();
          await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
        }
        await expect(page.locator("[data-image-placeholder]").filter({ visible: true })).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      await expect(page.getByRole("list", { name: "Các lá trong bộ bài" }).getByRole("listitem").first()).toBeVisible();
      await page.getByRole("checkbox", { name: "Tiếng Việt" }).uncheck();
      await expect(page.getByRole("tablist", { name: `${name} guide` }).getByRole("tab")).toHaveText(["Card", "Review", "Build", "Deck"]);
      expect(errors).toEqual([]);
    });
  }
}

test("Sereniel X-cost variant displays X and its translated effect", async ({ page }) => {
  await page.goto("/czn/combatant/sereniel");
  await page.getByRole("button", { name: "Shining Core card", exact: true }).click();
  const variants = page.getByRole("dialog").getByRole("button", { name: "Shining Core card", exact: true });
  await expect(variants.nth(4).locator("strong").first()).toHaveText("X");
  await expect(variants.nth(4)).toContainText("Homing Laser L");
});

test("Sereniel saved decks preserve copies and additional effects in the modal", async ({ page }) => {
  await page.goto("/czn/combatant/sereniel");
  await page.getByRole("tab", { name: "Deck", exact: true }).click();
  const deckTabs = page.getByRole("tablist", { name: "Bộ bài đề xuất" }).getByRole("tab");
  for (const [index, count] of [8, 9, 8].entries()) {
    await deckTabs.nth(index).click();
    await expect(page.getByRole("list", { name: "Các lá trong bộ bài" }).getByRole("listitem")).toHaveCount(count);
  }
  const plasma = page.getByRole("button", { name: "Plasma Missile III card", exact: true });
  await expect(plasma).toContainText("Giảm 2 Fortitude trong 1 lượt");
  await plasma.click();
  await expect(page.getByRole("dialog")).toContainText("Giảm 2 Fortitude trong 1 lượt");
  await page.getByRole("button", { name: "Đóng hộp thoại" }).click();
  await page.getByRole("checkbox", { name: "Tiếng Việt" }).uncheck();
  await expect(page.getByRole("button", { name: "Plasma Missile III card", exact: true })).toContainText("Decrease Fortitude by 2 for 1 turn");
});
