import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`patch note keeps English game names and Vietnamese explanations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/patch-note/2026-10-21-update");
    const article = page.locator("article").first();
    for (const name of ["Galactic Disaster", "Sword Tassel", "Manifest Ego", "Divine Epiphany", "Nightmare Carnival"]) await expect(article).toContainText(name);
    await expect(article).not.toContainText(/Hiển Ngộ|Quân Bình Quang Ám|Tua Kiếm|Thảm Họa Thiên Hà/);
    await expect(article).toContainText("Thông báo cập nhật");
    await expect(article).not.toContainText(/Prydwen|E7BOT|Bản dịch đầy đủ|Nguồn:/i);
    await expect(page.locator("#rossweisse table")).not.toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test(`build guide and card advice keep mechanic names English at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/combatant/rin");
    await page.getByRole("tab", { name: "Build", exact: true }).click();
    const build = page.getByRole("tabpanel").first();
    await expect(build).toContainText("Dark Mist Stance");
    await expect(build).not.toContainText(/Thế Sương đen|Điểm hành động|Thức tỉnh bài/);
    await expect(build).not.toContainText(/Prydwen|E7BOT|Nguồn:/i);
    await page.getByRole("tab", { name: "Card", exact: true }).click();
    await page.getByRole("button", { name: "Drawing Slash card", exact: true }).click();
    const advice = page.getByRole("dialog").getByRole("note");
    await expect(advice.first()).toContainText("Dark Mist Stance");
    await expect(advice.first()).toContainText("1 AP");
    await expect(advice.first()).not.toContainText(/Thế Sương đen|Điểm hành động|Thức tỉnh bài/);
  });
}

test("Vietnamese deck builder retains English equipment, item and Epiphany names", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/deck-builder");
  await page.getByRole("region", { name: "Thiết lập bộ bài" }).getByRole("button", { name: "Chọn Combatant", exact: true }).click();
  await page.getByRole("searchbox").fill("Mei Lin");
  await page.getByRole("button", { name: "Chọn Mei Lin", exact: true }).click();
  await page.getByRole("button", { name: "Chọn Weapon", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Legendary");
  await expect(dialog).not.toContainText(/Huyền thoại|Độc nhất|Vũ khí/);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "＋ Thêm Memory Fragments", exact: true }).click();
  await expect(dialog.getByRole("heading")).toContainText("Memory Fragments");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Thêm bài", exact: true }).click();
  const groups = dialog.getByRole("combobox", { name: "Nguồn bài" });
  await expect(groups.locator("option")).toHaveText(["Tất cả nguồn", "Combatant", "Neutral", "Monster", "Curse", "Event", "Persona"]);
  await dialog.getByRole("button", { name: "Strike card", exact: true }).first().click();
  await dialog.getByRole("button", { name: "Epiphany", exact: true }).click();
  await expect(dialog).toContainText("Chọn một Normal Epiphany và một Divine Epiphany.");
  await expect(dialog.getByRole("checkbox", { name: "Gồm Sortie" })).toBeVisible();
});
