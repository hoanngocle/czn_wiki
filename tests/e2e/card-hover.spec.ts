import { expect, test, type Locator, type Page } from "@playwright/test";

async function hoverAt(page: Page, card: Locator, x: number, y: number) {
  const surface = card.locator("..");
  await surface.scrollIntoViewIfNeeded();
  const bounds = (await surface.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width * x, bounds.y + bounds.height * y);
}

test("stationary pointer keeps the same tilt after the card rotates", async ({ page }) => {
  await page.goto("/combatant/renoa");
  await page.getByRole("checkbox", { name: "Animation" }).check();
  const card = page.getByRole("button", { name: "Black Veil card", exact: true });
  await card.scrollIntoViewIfNeeded();
  const box = (await card.locator("..").boundingBox())!;
  const point = { x: box.x + box.width * .15, y: box.y + box.height * .2 };
  await page.mouse.move(point.x, point.y);
  const angle = () => card.evaluate(element => parseFloat(element.style.getPropertyValue("--rotate-y")));
  await expect.poll(angle).toBeCloseTo(-21, 1);
  // A tiny movement back to the same screen position must not change the target.
  await page.mouse.move(point.x + 1, point.y + 1);
  await page.mouse.move(point.x, point.y);
  const settled = await card.evaluate(async element => {
    for (let frame = 0; frame < 60; frame++) await new Promise(requestAnimationFrame);
    return parseFloat((element as HTMLElement).style.getPropertyValue("--rotate-y"));
  });
  expect(settled).toBeCloseTo(-21, 1);
});

test("card hover stays enabled when artwork animation is off", async ({ page }, testInfo) => {
  await page.goto("/combatant/renoa");
  const card = page.getByRole("button", { name: "Dirge Bullet card", exact: true });
  const animation = page.getByRole("checkbox", { name: "Animation" });
  await animation.check();
  const rotation = () => card.evaluate(element => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    return { x: matrix.m23, y: matrix.m13 };
  });
  await hoverAt(page, card, .2, .2);
  await expect.poll(async () => (await rotation()).x).toBeGreaterThan(.05);
  await expect.poll(async () => (await rotation()).y).toBeGreaterThan(.05);
  await hoverAt(page, card, .8, .8);
  await expect.poll(async () => (await rotation()).x).toBeLessThan(-.05);
  await expect.poll(async () => (await rotation()).y).toBeLessThan(-.05);
  const shine = card.locator("[aria-hidden='true']").filter({ hasNot: page.locator("video") }).last();
  await expect(shine).toHaveCSS("mix-blend-mode", "soft-light");
  await expect.poll(() => shine.evaluate(element => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.4);
  await page.screenshot({ path: testInfo.outputPath("card-hover.png") });
  const held = await rotation();
  await page.mouse.move(0, 0);
  await expect.poll(async () => {
    const { x, y } = await rotation();
    return (Math.abs(x) + Math.abs(y)) / (Math.abs(held.x) + Math.abs(held.y));
  }, { timeout: 450, intervals: [50] }).toBeLessThan(.6);
  await expect.poll(async () => {
    const { x, y } = await rotation();
    return Math.abs(x) + Math.abs(y);
  }, { timeout: 10_000 }).toBeLessThan(.001);
  await animation.uncheck();
  await hoverAt(page, card, .2, .2);
  await expect.poll(async () => (await rotation()).x).toBeGreaterThan(.05);
  await expect.poll(async () => (await rotation()).y).toBeGreaterThan(.05);
  await expect(shine).toBeVisible();
  await expect.poll(() => shine.evaluate(element => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.4);
  await expect(page.locator("video")).toHaveCount(0);
  await page.reload();
  await expect(animation).not.toBeChecked();
  await hoverAt(page, card, .8, .8);
  await expect.poll(async () => (await rotation()).x).toBeLessThan(-.05);
  await expect.poll(async () => (await rotation()).y).toBeLessThan(-.05);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await hoverAt(page, card, .8, .8);
  await expect(card).toHaveCSS("transform", "none");
});

test("enlarged detail cards retain pointer tilt instead of a CSS lift", async ({ page }, testInfo) => {
  await page.goto("/combatant/renoa");
  await page.getByRole("checkbox", { name: "Animation" }).uncheck();
  await page.getByRole("button", { name: "Dirge Bullet card", exact: true }).click();
  const card = page.getByRole("dialog").locator('button[data-animation="false"]').first();
  await expect(page.getByRole("dialog").locator("video")).toHaveCount(0);
  await hoverAt(page, card, .2, .2);
  await expect.poll(() => card.evaluate(element => {
    const transform = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    return Math.abs(transform.m23) + Math.abs(transform.m13);
  })).toBeGreaterThan(.1);
  await page.screenshot({ path: testInfo.outputPath("detail-hover.png") });
});
