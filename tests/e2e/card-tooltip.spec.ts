import { expect, test } from "@playwright/test";

test("card hover shows rarity and keyword explanations independently of animation", async ({ page }, testInfo) => {
  await page.goto("/combatant/renoa");
  await page.getByRole("checkbox", { name: "Animation" }).uncheck();
  const card = page.getByRole("button", { name: "Black Veil card", exact: true });
  await card.hover();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toContainText("Rarity");
  await expect(tooltip).toContainText("Common");
  await expect(tooltip).toContainText("Shield");
  await expect(tooltip).toContainText(/Decrease Damage Amount taken until the next turn|Giảm lượng sát thương nhận vào cho đến lượt tiếp theo/);
  await expect(card).toHaveAttribute("aria-describedby", await tooltip.getAttribute("id") ?? "missing");
  const cardBox = (await card.boundingBox())!;
  const tipBox = (await tooltip.boundingBox())!;
  expect(tipBox.x + tipBox.width <= cardBox.x || tipBox.x >= cardBox.x + cardBox.width).toBe(true);
  expect(tipBox.x).toBeGreaterThanOrEqual(10);
  expect(tipBox.x + tipBox.width).toBeLessThanOrEqual(page.viewportSize()!.width - 10);
  await expect(tooltip).toHaveCSS("pointer-events", "none");
  await expect(tooltip).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("card-tooltip.png") });
  await page.mouse.move(0, 0);
  await expect(tooltip).toHaveCount(0);
});

test("card tooltip supports keyboard focus and Escape without blocking the detail dialog", async ({ page }) => {
  await page.goto("/combatant/renoa");
  const card = page.getByRole("button", { name: "Dirge Bullet card", exact: true });
  await card.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("tooltip")).toContainText("Exhaust");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await expect(card).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: /Dirge Bullet/ })).toBeVisible();
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(card).toBeFocused();
  await expect(page.getByRole("tooltip")).toHaveCount(0);
});

test("moving between adjacent cards replaces the tooltip without trapping the pointer", async ({ page }) => {
  await page.goto("/combatant/renoa");
  await page.getByRole("checkbox", { name: "Animation" }).uncheck();
  const first = page.getByRole("button", { name: "Black Veil card", exact: true });
  const second = page.getByRole("button", { name: "Echo of Sorrow card", exact: true });
  await first.hover();
  await expect(page.getByRole("tooltip")).toContainText("Shield");
  const bounds = (await second.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + 20);
  await expect(page.getByRole("tooltip")).toHaveCount(1);
  await expect(page.getByRole("tooltip")).toContainText("Rare");
  await page.mouse.move(0, 0);
  await expect(page.getByRole("tooltip")).toHaveCount(0);
});
