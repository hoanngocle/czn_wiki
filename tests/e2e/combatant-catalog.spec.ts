import { expect, test } from "@playwright/test";
import roster from "../../data/wiki/characters.json";
import { characterGuides } from "../../data/wiki/guides";
import { combatantSlug } from "../../lib/wiki/urls";

test.describe.configure({ mode: "parallel" });

for (const character of roster.filter(item => item.kind === "combatant")) {
  test(`${character.name} has four localized tabs, its own deck and working guide images`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/combatant/${combatantSlug(character)}`);
    const tabs = page.getByRole("tablist", { name: `${character.name} hướng dẫn` });
    await expect(tabs.getByRole("tab")).toHaveText(["Thẻ bài", "Đánh giá", "Xây dựng", "Bộ bài"]);
    await expect(page.getByRole("heading", { name: "Bài khởi đầu", exact: true })).toBeVisible();
    for (const tab of ["Đánh giá", "Xây dựng", "Bộ bài"]) {
      await tabs.getByRole("tab", { name: tab, exact: true }).click();
      for (const img of await page.getByRole("tabpanel").locator("img").filter({ visible: true }).all()) {
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      }
      await expect(page.locator("[data-image-placeholder]").filter({ visible: true })).toHaveCount(0);
    }
    const guide = characterGuides[character.id];
    const deckTabs = page.getByRole("tablist", { name: "Bộ bài đề xuất" }).getByRole("tab");
    await expect(deckTabs).toHaveCount(guide.decks.length);
    for (const [index, deck] of guide.decks.entries()) {
      await deckTabs.nth(index).click();
      const expectedCount = deck.cards.reduce((sum, card) => sum + card.count, 0);
      await expect(page.getByRole("list", { name: "Các lá trong bộ bài" }).getByRole("listitem")).toHaveCount(expectedCount);
      for (const img of await page.getByRole("tabpanel").locator("img").filter({ visible: true }).all()) {
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      }
      await expect(page.locator("[data-image-placeholder]").filter({ visible: true })).toHaveCount(0);
    }
    await page.getByRole("checkbox", { name: "Tiếng Việt" }).uncheck();
    await expect(page.getByRole("tablist", { name: `${character.name} guide` }).getByRole("tab")).toHaveText(["Card", "Review", "Build", "Deck"]);
    expect(errors).toEqual([]);
  });
}

for (const name of ["Nia", "Luke", "Nine", "Tressa", "Adelheid", "Cassius"]) {
  test(`${name} guide fits mobile and keeps deck effects in the card dialog`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/combatant/${combatantSlug({ name })}`);
    const tabs = page.getByRole("tablist", { name: `${name} hướng dẫn` });
    for (const tab of ["Đánh giá", "Xây dựng", "Bộ bài"]) {
      await tabs.getByRole("tab", { name: tab, exact: true }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const first = page.getByRole("list", { name: "Các lá trong bộ bài" }).getByRole("button").first();
    const cardName = (await first.getAttribute("aria-label"))!.replace(/ card$/, "");
    await first.click();
    await expect(page.getByRole("dialog")).toContainText(cardName);
    if (name === "Nia") {
      await expect(page.getByRole("dialog")).toContainText("Nhận 2 Sĩ khí trong 1 lượt");
      await expect(page.getByRole("dialog")).toContainText("Rút 1 lá");
    }
    await page.getByRole("button", { name: "Đóng hộp thoại" }).click();
    if (name === "Nine") await page.screenshot({ path: "test-results/combatant-nine-mobile.png", fullPage: true });
  });
}

test("Vanguard filter exposes all six combatants with working class icons", async ({ page }) => {
  await page.goto("/combatant");
  await page.getByRole("button", { name: "Vai trò Tiên phong", exact: true }).click();
  await expect(page.getByTestId("combatant-portrait")).toHaveCount(6);
  await page.getByRole("link", { name: "Nine", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Nine" })).toBeVisible();
  const images = page.locator("header img").filter({ visible: true });
  for (const image of await images.all()) await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
});
