import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("czn_combatant_vietnamese", "false"));
});

test("build, modify, save, reload and share a deck", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/czn/deck-builder");
  await expect(page.getByRole("heading", { name: "Deck Builder", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Choose combatant", exact: true }).click();
  await page.getByRole("searchbox").fill("Mei Lin");
  await page.getByRole("button", { name: "Select Mei Lin", exact: true }).click();
  await expect(page.getByTestId("deck-card")).toHaveCount(8);
  await page.screenshot({ path: "test-results/deck-builder-desktop.png", fullPage: true });
  await expect(page.getByTestId("pt-total")).toHaveText("0");
  await page.getByRole("button", { name: "Remove Strike", exact: true }).first().click();
  await expect(page.getByTestId("pt-total")).toHaveText("20");
  await page.getByRole("button", { name: "Add card", exact: true }).click();
  await page.getByRole("searchbox").fill("Rising Dragon");
  await page.getByRole("dialog").getByRole("button", { name: "Rising Dragon Spire card", exact: true }).first().click();
  await page.getByRole("button", { name: "Confirm card", exact: true }).click();
  await expect(page.getByTestId("deck-card")).toHaveCount(8);
  await page.getByRole("button", { name: "Save deck", exact: true }).click();
  await page.getByLabel("Deck name").fill("Mei test deck");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Saved decks", exact: true }).click();
  await page.getByRole("button", { name: "Load Mei test deck", exact: true }).click();
  await expect(page.getByTestId("deck-card")).toHaveCount(8);
  await page.getByRole("button", { name: "Share deck", exact: true }).click();
  const link = await page.getByLabel("Share link").inputValue();
  await page.goto(link);
  await expect(page.getByTestId("deck-card")).toHaveCount(8);
  await expect(page.getByTestId("pt-total")).toHaveText("20");
  expect(errors).toEqual([]);
});

test("mobile picker supports keyboard dismissal and fits the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/czn/deck-builder");
  await page.getByRole("button", { name: "Choose combatant", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/deck-builder-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Choose combatant", exact: true }).click();
  await page.getByRole("searchbox").fill("Mei Lin");
  await page.getByRole("button", { name: "Select Mei Lin", exact: true }).click();
  await page.getByRole("button", { name: "Deck (8)", exact: true }).click();
  await expect(page.getByTestId("deck-card")).toHaveCount(8);
  await page.screenshot({ path: "test-results/deck-builder-mobile-cards.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Stats", exact: true }).click();
  await expect(page.getByRole("button", { name: "Save deck", exact: true })).toBeVisible();
});

test("unreadable saved data is preserved when saving a new deck", async ({ page }) => {
  const raw = '[{"id":"legacy","name":"Keep me","cardIds":["unknown"]}]';
  await page.addInitScript(value => localStorage.setItem("czn_saved_decks", value), raw);
  await page.goto("/czn/deck-builder");
  await page.getByRole("button", { name: "Choose combatant", exact: true }).click();
  await page.getByRole("searchbox").fill("Mei Lin");
  await page.getByRole("button", { name: "Select Mei Lin", exact: true }).click();
  await page.getByRole("button", { name: "Save deck", exact: true }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText("Saving is paused");
  expect(await page.evaluate(() => localStorage.getItem("czn_saved_decks"))).toBe(raw);
});

test("equipment, fragments, card variants and JSON backups survive loading", async ({ page }) => {
  await page.goto("/czn/deck-builder");
  await page.getByRole("button", { name: "Choose combatant", exact: true }).click();
  await page.getByRole("searchbox").fill("Mei Lin");
  await page.getByRole("button", { name: "Select Mei Lin", exact: true }).click();
  await page.getByRole("button", { name: "Choose partner", exact: true }).click();
  await page.getByRole("searchbox").fill("Arwen");
  await page.getByRole("button", { name: "Select Arwen", exact: true }).click();
  await page.getByRole("button", { name: "Choose weapon", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: /^Equip / }).first().click();
  await page.getByRole("button", { name: /Add memory fragments/ }).click();
  await page.getByRole("dialog").getByRole("button", { name: /pieces/ }).first().click();
  await page.getByRole("button", { name: "Edit Flame Dragon's Jewel", exact: true }).click();
  await page.getByLabel("Card variant").selectOption("c_1027_srt4_rsp5");
  await page.getByRole("button", { name: "Confirm card", exact: true }).click();
  await expect(page.getByTestId("pt-total")).toHaveText("0");
  await page.getByRole("button", { name: "Save deck", exact: true }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("button", { name: "Saved decks", exact: true }).click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const download = await downloadPromise;
  const path = await download.path();
  expect(path).not.toBeNull();
  await page.getByLabel("Import deck backup").setInputFiles(path!);
  await expect(page.getByRole("dialog").getByRole("status")).toContainText("0 decks imported");
  await page.getByLabel("Import deck backup").setInputFiles({ name: "invalid.json", mimeType: "application/json", buffer: Buffer.from('{}') });
  await expect(page.getByRole("dialog").getByRole("status")).toContainText("JSON array");
  await page.getByRole("button", { name: "Load Mei Lin Deck", exact: true }).click();
  await expect(page.getByRole("button", { name: "Remove weapon" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Choose partner" })).toContainText("Arwen");
  await expect(page.getByTestId("deck-card")).toHaveCount(8);
  expect(await page.locator("img").evaluateAll(images => (images as HTMLImageElement[]).filter(img => img.complete && !img.naturalWidth).map(img => img.src))).toEqual([]);
});
