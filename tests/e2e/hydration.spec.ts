import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("czn_combatant_vietnamese", "false"));
});

// Run with PLAYWRIGHT_DEV_SERVER=1 to catch React's development-only
// attribute mismatch diagnostics as well as recoverable hydration errors.
const themes = [
  { name: "system dark", system: "dark", saved: null, expected: "dark" },
  { name: "system light", system: "light", saved: null, expected: "light" },
  { name: "saved dark", system: "light", saved: "dark", expected: "dark" },
  { name: "saved light", system: "dark", saved: "light", expected: "light" },
] as const;

for (const theme of themes) {
  test(`${theme.name} hydrates without errors and remains interactive`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ colorScheme: theme.system });
    if (theme.saved) {
      await page.addInitScript((saved) => localStorage.setItem("themeMode", saved), theme.saved);
    }

    await page.goto("/czn/combatant", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme.expected);
    const toggle = page.getByRole("button", { name: "Toggle theme" });
    await expect(toggle).toHaveAttribute("title", `Theme: ${theme.saved ?? "system"}`);
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme.expected === "dark" ? "light" : "dark");
    expect(errors).toEqual([]);
  });
}
