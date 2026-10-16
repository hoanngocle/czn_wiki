import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("czn_combatant_vietnamese", "false"));
});
import characters from "../../data/wiki/characters.json";

test("each filter row replaces its selection and clicking it again restores all combatants", async ({ page }) => {
  await page.goto("/combatant");
  const portraits = page.getByTestId("combatant-portrait");
  const combatants = characters.filter((character) => character.kind === "combatant");

  for (const { first, second, expected } of [
    { first: "Job hunter", second: "Job vanguard", expected: combatants.filter((character) => character.job === "vanguard") },
    { first: "Ego creed", second: "Ego love", expected: combatants.filter((character) => character.ego === "love") },
    { first: "5 stars", second: "4 stars", expected: combatants.filter((character) => character.rarity === 4) },
  ]) {
    const previous = page.getByRole("button", { name: first, exact: true });
    const next = page.getByRole("button", { name: second, exact: true });
    await previous.click();
    await next.click();
    await expect(previous).toHaveAttribute("aria-pressed", "false");
    await expect(next).toHaveAttribute("aria-pressed", "true");
    await expect(portraits).toHaveCount(expected.length);
    expect((await portraits.evaluateAll((links) => links.map((link) => link.getAttribute("aria-label")))).sort())
      .toEqual(expected.map((character) => character.name).sort());
    await next.click();
    await expect(next).toHaveAttribute("aria-pressed", "false");
    await expect(portraits).toHaveCount(combatants.length);
  }
});

test("switching a job preserves the selected ego and rarity", async ({ page }) => {
  await page.goto("/combatant");
  const ego = page.getByRole("button", { name: "Ego love", exact: true });
  const rarity = page.getByRole("button", { name: "5 stars", exact: true });
  await ego.click();
  await rarity.click();
  await page.getByRole("button", { name: "Job hunter", exact: true }).click();
  await page.getByRole("button", { name: "Job striker", exact: true }).click();
  await expect(ego).toHaveAttribute("aria-pressed", "true");
  await expect(rarity).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Job hunter", exact: true })).toHaveAttribute("aria-pressed", "false");
  const expected = characters.filter((character) => character.kind === "combatant" && character.job === "striker" && character.ego === "love" && character.rarity === 5);
  await expect(page.getByTestId("combatant-portrait")).toHaveCount(expected.length);
  for (const character of expected) await expect(page.getByRole("link", { name: character.name, exact: true })).toBeVisible();
});
