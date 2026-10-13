import { expect, test } from "@playwright/test";

test("Renoa cards, potential target, Ego levels and variant dialog use source data", async ({ page }) => {
  await page.goto("/combatant/1041");
  await expect(page.getByRole("heading", { name: "Start Cards" })).toBeVisible();
  const dirge = page.getByRole("button", { name: "Dirge Bullet card", exact: true });
  await expect(dirge).toBeVisible();
  await expect(dirge).toContainText("Bullet");
  await expect(dirge).toContainText("Exhaust");
  await expect(dirge).toContainText("160% Damage");
  const opener = page.getByRole("button", { name: /Echo of Sorrow/ }).first();
  await opener.click();
  await expect(page.getByRole("dialog", { name: /Echo of Sorrow/ })).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("button", { name: "Epiphany 1" })).toBeVisible();
  await page.getByRole("dialog").getByRole("button", { name: "Epiphany 1" }).click();
  await expect(page.getByRole("dialog").getByRole("button", { name: "Base" })).toBeVisible();
  await page.getByRole("dialog").getByRole("button", { name: "Base" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await dirge.click();
  await expect(page.getByRole("dialog", { name: /Dirge Bullet/ })).toBeVisible();
  await page.getByRole("dialog").getByRole("button", { name: "Potential", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("button", { name: "Potential", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(dirge).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("tab", { name: "Manifest Ego" }).click();
  await expect(page.getByTestId("manifest-level")).toHaveCount(6);
  await page.getByRole("tab", { name: "Potential" }).click();
  await expect(page.getByTestId("potential-node")).toHaveCount(10);
});

test("animation preference and reduced motion stop card video", async ({ page }) => {
  await page.goto("/combatant/1041");
  const animation = page.getByRole("checkbox", { name: "Animation" });
  await animation.check();
  await page.getByRole("button", { name: /Echo of Sorrow/ }).first().click();
  const video = page.getByRole("dialog").locator("video");
  await expect(video).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await page.keyboard.press("Escape");
  await animation.uncheck();
  await page.reload();
  await expect(page.getByRole("checkbox", { name: "Animation" })).not.toBeChecked();
});

test("failed card video falls back to local artwork", async ({ page }) => {
  let failedVideos = 0;
  await page.route("**/*.webm", async (route) => { failedVideos++; await route.abort(); });
  await page.goto("/combatant/1041");
  await page.getByRole("checkbox", { name: "Animation" }).check();
  await page.getByRole("button", { name: /Echo of Sorrow/ }).first().click();
  const dialog = page.getByRole("dialog", { name: /Echo of Sorrow/ });
  await expect.poll(() => failedVideos).toBeGreaterThan(0);
  await expect(dialog.locator("video")).toHaveCount(0);
  await expect(dialog.locator("img").first()).toBeVisible();
});
