import { expect, test } from "@playwright/test";

test("picker searches only 38 combatants and keeps filters during route changes", async ({ page }) => {
  await page.goto("/combatant");
  await expect(page.getByTestId("combatant-portrait")).toHaveCount(38);
  await page.getByRole("textbox", { name: "Search combatants" }).fill(" RENOa ");
  await expect(page.getByTestId("combatant-portrait")).toHaveCount(1);
  await page.getByRole("link", { name: /Renoa/ }).last().click();
  await expect.poll(() => new URL(page.url()).pathname).toBe("/combatant/renoa");
  await expect(page.getByRole("heading", { level: 1, name: /Renoa/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Renoa" }).last()).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("textbox", { name: "Search combatants" })).toHaveValue(" RENOa ");
  await page.goBack();
  await expect(page.getByRole("textbox", { name: "Search combatants" })).toHaveValue(" RENOa ");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByTestId("combatant-portrait")).toHaveCount(38);
  const fiveStar = page.getByRole("button", { name: "▲▲▲▲▲" });
  await fiveStar.click();
  await expect(fiveStar).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "Renoa" }).last().click();
  await expect.poll(() => new URL(page.url()).pathname).toBe("/combatant/renoa");
  await expect(fiveStar).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "Olga" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /Olga/ })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1, name: /Renoa/ })).toBeVisible();
  await page.goForward();
  await expect(page.getByRole("heading", { level: 1, name: /Olga/ })).toBeVisible();
  await page.goBack();
  await expect(fiveStar).toHaveAttribute("aria-pressed", "true");
});

test("known summary lacks detail; supporter and unknown IDs return HTTP 404", async ({ page, request }) => {
  await page.goto("/combatant/nia");
  await expect(page.getByRole("heading", { name: "Nia" })).toBeVisible();
  await expect(page.getByText(/detail.*not available/i)).toBeVisible();
  await expect(page.getByText("Annihilation Shot")).toHaveCount(0);
  expect((await request.get("/combatant/nope")).status()).toBe(404);
  expect((await request.get("/combatant/0001041")).status()).toBe(404);
  expect((await request.get("/combatant/20001")).status()).toBe(404);
});

test("name URLs support direct visits, spaced names, reloads and old bookmarks", async ({ page }) => {
  await page.goto("/combatant/renoa");
  await expect(page.getByRole("heading", { name: "Renoa", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Renoa", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Mei Lin", exact: true }).click();
  await expect(page).toHaveURL(/\/combatant\/mei-lin$/);
  await expect(page.getByRole("heading", { name: "Mei Lin", exact: true })).toBeVisible();
  await page.goto("/combatant/1041");
  await expect(page).toHaveURL(/\/combatant\/renoa$/);
  await expect(page.getByRole("heading", { name: "Renoa", exact: true })).toBeVisible();
});

test("mobile picker moves focus to search and traps it until Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/combatant/1041");
  const opener = page.getByRole("button", { name: "Choose combatant" });
  await opener.click();
  await expect(page.getByRole("textbox", { name: "Search combatants" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByTestId("combatant-portrait").last()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});
