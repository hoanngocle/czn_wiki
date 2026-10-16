import { expect, test } from "@playwright/test";

test("every modal card supports the same animation and hover interaction", async ({ page }) => {
  await page.setViewportSize({ width: 1700, height: 1100 });
  await page.goto("/combatant/renoa");
  await page.getByRole("checkbox", { name: /^(Animation|Ảnh động)$/ }).check();
  await page.getByRole("button", { name: "Echo of Sorrow card", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const cards = dialog.getByRole("button", { name: "Echo of Sorrow card", exact: true });
  await expect(cards).toHaveCount(6);
  for (const card of await cards.all()) {
    await expect(card).toHaveAttribute("data-animation", "true");
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator("video")).toHaveCount(1);
    await expect.poll(() => card.locator("video").evaluate((video: HTMLVideoElement) => !video.paused && video.currentTime > 0)).toBe(true);
    const bounds = (await card.locator("..").boundingBox())!;
    await page.mouse.move(bounds.x + bounds.width * .2, bounds.y + bounds.height * .2);
    await expect.poll(() => card.evaluate(element => Math.abs(parseFloat(element.style.getPropertyValue("--rotate-y"))))).toBeGreaterThan(5);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => dialog.locator("video").evaluateAll(videos => videos.every(video => (video as HTMLVideoElement).paused))).toBe(true);
});

test("all five Epiphanies show their own source rating and language-specific review", async ({ page }) => {
  await page.goto("/combatant/renoa");
  for (const [name, ratings] of [
    ["Echo of Sorrow", [2, 3, 1, 5, 3]],
    ["Instant Judgment", [2, 1, 2, 3, 5]],
    ["Ballad of Pitch Black", [2, 2, 3, 3, 5]],
    ["Flower of Devoured Fate", [5, 2, 2, 4, 3]],
  ] as const) {
    await page.getByRole("button", { name: `${name} card`, exact: true }).click();
    const dialog = page.getByRole("dialog");
    const reviews = dialog.getByRole("note");
    await expect(reviews).toHaveCount(5);
    for (let index = 0; index < 5; index++) {
      await expect(reviews.nth(index)).toHaveAttribute("lang", "vi");
      await expect(reviews.nth(index).getByRole("img", { name: `Prydwen: ${ratings[index]} / 5` })).toBeVisible();
      expect((await reviews.nth(index).locator("p").innerText()).length).toBeGreaterThan(60);
    }
    await expect(dialog.getByRole("link", { name: "Prydwen" })).toHaveCount(0);
    await page.keyboard.press("Escape");
  }
  await page.getByRole("checkbox", { name: "Tiếng Việt" }).uncheck();
  await page.getByRole("button", { name: "Echo of Sorrow card", exact: true }).click();
  const reviews = page.getByRole("dialog").getByRole("note");
  await expect(reviews.first()).toHaveAttribute("lang", "en");
  await expect(reviews.nth(3)).toContainText("carry builds");
  await expect(reviews.nth(4)).toContainText("draw support");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(reviews).toHaveCount(5);
  expect(await page.getByRole("dialog").evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test("cards without video keep static artwork and pointer tilt", async ({ page }) => {
  await page.goto("/combatant/renoa");
  await page.getByRole("checkbox", { name: /^(Animation|Ảnh động)$/ }).check();
  await page.getByRole("button", { name: "Black Veil card", exact: true }).click();
  const card = page.getByRole("dialog").getByRole("button", { name: "Black Veil card", exact: true });
  await expect(card.locator("video")).toHaveCount(0);
  await expect(card.locator("img").first()).toBeVisible();
  const bounds = (await card.locator("..").boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width * .2, bounds.y + bounds.height * .2);
  await expect.poll(() => card.evaluate(element => Math.abs(parseFloat(element.style.getPropertyValue("--rotate-y"))))).toBeGreaterThan(5);
  await expect(page.getByRole("dialog").getByRole("note")).toHaveCount(0);
});

test("every modal variant retains artwork and hover when video fails", async ({ page }) => {
  await page.setViewportSize({ width: 1700, height: 1100 });
  await page.route("**/*.webm", route => route.abort());
  await page.goto("/combatant/renoa");
  await page.getByRole("checkbox", { name: /^(Animation|Ảnh động)$/ }).check();
  await page.getByRole("button", { name: "Echo of Sorrow card", exact: true }).click();
  const cards = page.getByRole("dialog").getByRole("button", { name: "Echo of Sorrow card", exact: true });
  await expect(cards).toHaveCount(6);
  for (const card of await cards.all()) {
    await expect(card).toHaveAttribute("data-animation", "true");
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator("video")).toHaveCount(0);
    await expect(card.locator("img").first()).toBeVisible();
    const bounds = (await card.locator("..").boundingBox())!;
    await page.mouse.move(bounds.x + bounds.width * .8, bounds.y + bounds.height * .8);
    await expect.poll(() => card.evaluate(element => Math.abs(parseFloat(element.style.getPropertyValue("--rotate-y"))))).toBeGreaterThan(5);
  }
});
