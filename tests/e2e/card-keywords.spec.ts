import { expect, test } from "@playwright/test";

for (const entry of [
  { term: "Efficiency", character: "Anika", card: "Ignition Slash", explanation: "chi phí đã được giảm", englishExplanation: "cost-reduced" },
  { term: "Destroy", character: "Anika", card: "Rampage Trigger", explanation: "Tenacity", englishExplanation: "Tenacity" },
  { term: "Attunement", character: "Selena", card: "Target Spotted", explanation: "đầu lượt", englishExplanation: "start-of-turn" },
]) {
  test(`${entry.term} can be searched and is explained on card hover`, async ({ page }) => {
    await page.goto("/czn/terminology");
    await page.getByRole("searchbox", { name: "Tìm thuật ngữ" }).fill(entry.term);
    const glossary = page.getByRole("region", { name: "Danh sách thuật ngữ" });
    await expect(glossary.locator("dt")).toHaveCount(1);
    await expect(glossary.locator("dt")).toContainText(entry.term);
    await expect(glossary.locator("dd")).toContainText(entry.explanation);

    await page.getByRole("button", { name: "Switch to English" }).click();
    await page.goto("/czn/deck-builder");
    await page.getByRole("button", { name: "Choose combatant", exact: true }).click();
    await page.getByRole("searchbox").fill(entry.character);
    await page.getByRole("button", { name: `Select ${entry.character}`, exact: true }).click();
    const card = page.getByRole("button", { name: `${entry.card} card`, exact: true });
    await card.hover();
    const tooltip = page.getByRole("tooltip");
    await expect(tooltip.getByText(entry.term, { exact: true })).toHaveCount(1);
    await expect(tooltip).toContainText(entry.englishExplanation, { useInnerText: true });
    await expect(card).toHaveAttribute("aria-describedby", await tooltip.getAttribute("id") ?? "missing");
    await page.keyboard.press("Escape");
    await expect(tooltip).toHaveCount(0);
  });
}
