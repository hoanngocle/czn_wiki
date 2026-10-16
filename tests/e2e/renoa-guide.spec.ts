import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`Renoa guide tabs switch content and preserve card preferences at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/combatant/renoa");
    const tabs = page.getByRole("tablist", { name: "Renoa guide" });
    await expect(tabs.getByRole("tab")).toHaveText(["Card", "Review", "Build", "Deck"]);
    await expect(page.getByRole("heading", { name: "Start Cards", exact: true })).toBeVisible();
    await page.getByRole("checkbox", { name: "Animation", exact: true }).check();
    await tabs.getByRole("tab", { name: "Review", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Start Cards", exact: true })).not.toBeVisible();
    await expect(page.getByRole("heading", { name: "Điểm mạnh", exact: true })).toBeVisible();
    await page.getByRole("checkbox", { name: "Tiếng Việt" }).uncheck();
    await expect(page.getByRole("heading", { name: "Strengths", exact: true })).toBeVisible();
    await tabs.getByRole("tab", { name: "Build", exact: true }).click();
    await expect(page.getByRole("table", { name: "Partner rankings" }).getByRole("row").nth(1)).toContainText("Kiara");
    await tabs.getByRole("tab", { name: "Deck", exact: true }).click();
    const deckTabs = page.getByRole("tablist", { name: "Recommended decks" });
    for (const [name, count] of [["Daughters of Discard (Diana Support)", 7], ["Hypercarry Renoa", 7], ["Draw Renoa", 6]] as const) {
      await deckTabs.getByRole("tab", { name, exact: true }).click();
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
      await expect(page.getByRole("list", { name: "Deck cards" }).getByRole("listitem")).toHaveCount(count);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await tabs.getByRole("tab", { name: "Card", exact: true }).click();
    await expect(page.getByRole("checkbox", { name: "Animation", exact: true })).toBeChecked();
    await expect(page.getByRole("button", { name: "Echo of Sorrow card", exact: true })).toContainText("140% Damage");
  });
}

test("Renoa tabs support arrow keys and Home/End with a single active panel", async ({ page }) => {
  await page.goto("/combatant/renoa");
  const tabs = page.getByRole("tablist", { name: "Renoa guide" });
  await tabs.getByRole("tab", { name: "Card", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: "Review", exact: true })).toBeFocused();
  await expect(tabs.getByRole("tab", { name: "Review", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
  await page.keyboard.press("End");
  await expect(tabs.getByRole("tab", { name: "Deck", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: "Card", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(tabs.getByRole("tab", { name: "Deck", exact: true })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(tabs.getByRole("tab", { name: "Card", exact: true })).toBeFocused();
});

test("deck copies preserve their individual effects when switching languages", async ({ page }) => {
  await page.goto("/combatant/renoa");
  await page.getByRole("tab", { name: "Deck", exact: true }).click();
  const language = page.getByRole("checkbox", { name: "Tiếng Việt" });
  const cards = page.getByRole("list", { name: "Các lá trong deck" }).getByRole("listitem");
  await expect(cards).toHaveCount(7);
  const flowers = cards.filter({ hasText: "Flower of Devoured Fate I" }).filter({ hasText: "Rút 1 lá" });
  await expect(flowers).toHaveCount(3);
  await expect(cards.first()).toContainText("Đầu lượt, tạo 1 lá Dirge Bullet");
  await language.uncheck();
  const englishCards = page.getByRole("list", { name: "Deck cards" }).getByRole("listitem");
  await expect(englishCards.first()).toContainText("At the start of turn");
  await page.getByRole("tab", { name: "Draw Renoa", exact: true }).click();
  await expect(englishCards).toHaveCount(6);
  await expect(englishCards.filter({ hasText: "−1 cost" })).toHaveCount(4);
  await language.check();
  await expect(cards.filter({ hasText: "Giảm 1 chi phí" })).toHaveCount(4);
  await expect(cards.filter({ hasText: "Nếu có Dirge Bullet trên tay, rút thêm 1 lá." })).toHaveCount(4);
});

test("missing guide images keep their reserved slots and readable card content", async ({ page }) => {
  await page.route("**/assets/partner/prydwen-janet_icon.webp", route => route.abort());
  await page.route("**/assets/card/prydwen-ronoa_6.webp", route => route.abort());
  await page.goto("/combatant/renoa");
  await page.getByRole("tab", { name: "Deck", exact: true }).click();
  const panel = page.getByRole("tabpanel", { name: "Daughters of Discard (Diana Support)", exact: true });
  const partnerSlot = panel.locator('[data-image-placeholder="Janet"]');
  await expect(partnerSlot).toBeVisible();
  const bounds = await partnerSlot.boundingBox();
  expect(bounds!.width).toBeGreaterThanOrEqual(70);
  expect(bounds!.height).toBeGreaterThanOrEqual(70);
  await expect(panel.locator('[data-image-placeholder="Flower of Devoured Fate I"]')).toHaveCount(3);
  await expect(panel.getByRole("listitem").filter({ hasText: "Rút 1 lá" })).toHaveCount(3);
});
