import { expect, test } from "@playwright/test";

test("equipment navigation, combined filters, details, and reset", async ({ page }) => {
  await page.goto("/czn/combatant");
  await page.getByRole("link", { name: "Equipment", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Equipment", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Equipment", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("status")).toContainText("555");
  await page.getByRole("button", { name: "Weapon", exact: true }).click();
  await page.getByRole("combobox", { name: /Rarity/ }).selectOption("RARITY_RARE");
  await page.getByLabel("Khu vực").selectOption("Laboratory 0");
  await page.getByRole("searchbox").fill("Overcurrent Shock Unit");
  await expect(page.getByRole("status")).toHaveText("1 / 555 trang bị");
  const item = page.getByRole("button", { name: "Xem Overcurrent Shock Unit", exact: true });
  await item.click();
  const dialog = page.getByRole("dialog", { name: "Overcurrent Shock Unit" });
  await expect(dialog).toContainText("Fixed Damage");
  await expect(dialog).not.toContainText("$Draw$");
  await expect(dialog.locator("img")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(item).toBeFocused();
  await page.getByRole("searchbox").fill("no-such-equipment-xyz");
  await expect(page.getByText("Không tìm thấy trang bị phù hợp.")).toBeVisible();
  await page.getByRole("button", { name: "Xóa bộ lọc", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("555 / 555 trang bị");
  await expect(page.locator("[data-equipment-id]")).toHaveCount(48);
  await page.getByRole("button", { name: /Xem thêm/ }).click();
  await expect(page.locator("[data-equipment-id]")).toHaveCount(96);
});

test("equipment fits mobile in both themes and loads its artwork", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/czn/equipment");
    await expect(page.getByRole("heading", { name: "Equipment", exact: true })).toBeVisible();
    await expect.poll(() => page.locator("[data-equipment-id] img").first().evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.locator("[data-equipment-id]").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole("button", { name: "Đóng chi tiết" }).click();
  }
});

test("effect search matches visible words and percentages across formatting tags", async ({ page }) => {
  await page.goto("/czn/equipment");
  await page.getByRole("searchbox").fill("activated");
  await expect(page.getByRole("button", { name: "Xem Bloody Pendant", exact: true })).toBeVisible();
  await page.getByRole("searchbox").fill("20%");
  await page.getByRole("button", { name: "Weapon", exact: true }).click();
  await expect(page.getByRole("button", { name: "Xem Mutation: Shell Bug Horn", exact: true })).toBeVisible();
});

test("malformed source keyword markers do not leak into equipment effects", async ({ page }) => {
  await page.goto("/czn/equipment");
  await page.getByRole("searchbox").fill("Mutation: Crushed Angel Feather");
  await page.getByRole("button", { name: "Xem Mutation: Crushed Angel Feather", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Increases Damage, Shield Gain, and Heal Amounts of Celestial cards by 60%");
  await expect(page.getByRole("dialog")).not.toContainText("$");
});
