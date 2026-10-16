import { expect, test } from "@playwright/test";

test.describe("English partner controls", () => {
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("czn_combatant_vietnamese", "false"));
});

test("partner navigation hydrates without runtime or instant-navigation diagnostics", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/partner/licinia");
  await page.getByRole("tab", { name: "Skills", exact: true }).click();
  await page.getByRole("button", { name: /View support card/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  expect(errors).toEqual([]);
});

test("tablet partner detail keeps long names and controls inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/partner/westmacott");
  const heading = page.getByRole("heading", { name: "Westmacott", exact: true });
  await expect(heading).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(768);
  const bounds = await heading.boundingBox();
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(768);
  await page.getByRole("tab", { name: "Stats", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "Breakthrough" })).toBeVisible();
});

test("partner roster filters by name, rarity, and class", async ({ page }) => {
  await page.goto("/partner");
  await expect(page.getByRole("heading", { name: "Select Partner" })).toBeVisible();
  await expect(page.getByTestId("partner-portrait")).toHaveCount(49);
  await page.getByRole("button", { name: "3 stars", exact: true }).click();
  await expect(page.getByRole("link", { name: "Nakia", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Licinia", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByRole("button", { name: "Class striker", exact: true }).click();
  await page.getByRole("textbox", { name: "Search partners" }).fill("Licinia");
  await expect(page.getByTestId("partner-portrait")).toHaveCount(1);
  await page.getByRole("link", { name: "Licinia", exact: true }).click();
  await expect(page).toHaveURL(/\/partner\/licinia$/);
  await expect(page.getByRole("textbox", { name: "Search partners" })).toHaveValue("Licinia");
});

test("Licinia passive and breakthrough controls show exact source values", async ({ page }) => {
  await page.goto("/partner/licinia");
  await expect(page.getByRole("heading", { name: "Licinia", exact: true })).toBeVisible();
  await page.getByRole("tab", { name: "Skills", exact: true }).click();
  const passive = page.getByRole("region", { name: "Passive" });
  await expect(passive).toContainText("24%");
  await page.getByRole("tab", { name: "Stats", exact: true }).click();
  await page.getByLabel("Partner level", { exact: true }).selectOption("10");
  await page.getByRole("checkbox", { name: "Breakthrough" }).uncheck();
  const stats = page.getByRole("tabpanel", { name: "Stats", exact: true });
  await expect(stats.getByTestId("stat-attack")).toHaveText("45");
  await expect(stats.getByTestId("stat-defense")).toHaveText("0");
  await expect(stats.getByTestId("stat-hp")).toHaveText("19");
  await page.getByRole("tab", { name: "Skills", exact: true }).click();
  await passive.getByRole("button", { name: "Level 1", exact: true }).click();
  await expect(passive).toContainText("16%");
  await page.getByRole("tab", { name: "Stats", exact: true }).click();
  await expect(page.getByLabel("Partner level", { exact: true })).toHaveValue("10");
  await page.getByRole("checkbox", { name: "Breakthrough" }).check();
  await expect(stats.getByTestId("stat-attack")).toHaveText("47");
  await expect(stats.getByTestId("stat-defense")).toHaveText("1");
  await expect(stats.getByTestId("stat-hp")).toHaveText("24");
  await page.getByRole("tab", { name: "Skills", exact: true }).click();
  const card = page.getByRole("button", { name: /View support card/ });
  await card.click();
  await expect(page.getByRole("dialog")).toContainText("Paralytic Poison");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(card).toBeFocused();
});

test("partner ids redirect and unknown or combatant ids return 404", async ({ page }) => {
  await page.goto("/partner/30116");
  await expect(page).toHaveURL(/\/partner\/licinia$/);
  for (const slug of ["unknown-partner", "1016"]) {
    const response = await page.goto(`/partner/${slug}`);
    expect(response?.status()).toBe(404);
  }
});

test("mobile partner picker closes after selection and Escape without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/partner/licinia");
  const opener = page.getByRole("button", { name: "Choose partner", exact: true });
  const picker = page.getByRole("dialog", { name: "Partner picker" });
  await opener.click();
  await expect(picker).toHaveAttribute("aria-modal", "true");
  await expect(page.getByRole("heading", { name: "Licinia", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Mở điều hướng" })).toHaveCount(0);
  expect(await page.getByRole("heading", { name: "Licinia", exact: true, includeHidden: true }).evaluate(element => Boolean(element.closest("[inert]")))).toBe(true);
  await expect(picker.getByRole("button", { name: "Close partner picker" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Search partners" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(picker.getByRole("link").last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("textbox", { name: "Search partners" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(picker).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.getByRole("heading", { name: "Licinia", exact: true })).toBeVisible();
  await opener.click();
  await picker.getByRole("button", { name: "Close partner picker" }).click();
  await expect(picker).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.getByRole("textbox", { name: "Search partners" }).fill("Nakia");
  await page.getByRole("link", { name: "Nakia", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Nakia", exact: true })).toBeVisible();
  await expect(picker).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
});

test("Vietnamese is the default and keyboard tabs preserve progression across language changes", async ({ page }) => {
  await page.goto("/partner/licinia");
  const vietnamese = page.getByRole("checkbox", { name: "Tiếng Việt", exact: true });
  await expect(vietnamese).toBeChecked();
  const profile = page.getByRole("tab", { name: "Hồ sơ", exact: true });
  await expect(profile).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Phó chỉ huy của Black Spica");
  await expect(page.getByRole("heading", { name: "Licinia", exact: true })).toBeVisible();

  await profile.focus();
  await page.keyboard.press("ArrowRight");
  const skills = page.getByRole("tab", { name: "Kỹ năng", exact: true });
  await expect(skills).toBeFocused();
  await expect(skills).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Blossoming Venom");
  await expect(page.getByRole("tabpanel")).toContainText("24%");
  const passiveLevel = page.getByRole("button", { name: "Cấp 1", exact: true });
  await passiveLevel.click();
  await expect(passiveLevel).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("tabpanel")).toContainText("16%");
  const supportCard = page.getByRole("button", { name: "Xem lá hỗ trợ: Blossoming Venom", exact: true });
  await supportCard.click();
  await expect(page.getByRole("dialog")).toContainText("Độc tê liệt");
  await expect(page.getByRole("dialog")).toContainText("Điểm hành động");
  await page.keyboard.press("Escape");
  await expect(supportCard).toBeFocused();

  await skills.focus();
  await page.keyboard.press("ArrowRight");
  const stats = page.getByRole("tab", { name: "Chỉ số", exact: true });
  await expect(stats).toBeFocused();
  await expect(stats).toHaveAttribute("aria-selected", "true");
  await page.getByLabel("Cấp đối tác", { exact: true }).selectOption("10");
  await page.getByRole("checkbox", { name: "Đột phá", exact: true }).uncheck();
  await expect(page.getByTestId("stat-attack")).toHaveText("45");

  await stats.focus();
  await page.keyboard.press("End");
  const images = page.getByRole("tab", { name: "Hình ảnh", exact: true });
  await expect(images).toBeFocused();
  await expect(images).toHaveAttribute("aria-selected", "true");
  for (const name of ["Chân dung Licinia", "Ảnh bài hỗ trợ: Blossoming Venom"]) {
    const artwork = page.getByRole("img", { name, exact: true });
    await expect(artwork).toBeVisible();
    await expect.poll(() => artwork.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await expect(page.getByRole("tabpanel")).toContainText("Chưa có hình ảnh toàn thân.");
  await expect(page.getByRole("link", { name: "Xem ảnh đầy đủ", exact: true })).toHaveCount(0);
  await images.focus();
  await page.keyboard.press("Home");
  await expect(profile).toBeFocused();
  await expect(profile).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowLeft");
  await expect(images).toBeFocused();

  await vietnamese.uncheck();
  await expect(page.getByRole("tab", { name: "Images", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab", { name: "Stats", exact: true }).click();
  await expect(page.getByLabel("Partner level", { exact: true })).toHaveValue("10");
  await expect(page.getByRole("checkbox", { name: "Breakthrough", exact: true })).not.toBeChecked();
  await expect(page.getByTestId("stat-attack")).toHaveText("45");
  await page.getByRole("tab", { name: "Skills", exact: true }).click();
  await expect(page.getByRole("button", { name: "Level 1", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "View support card: Blossoming Venom", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Paralytic Poison");
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(vietnamese).not.toBeChecked();
  await expect(page.getByRole("tab", { name: "Profile", exact: true })).toHaveAttribute("aria-selected", "true");
});

test("available full partner artwork loads from a local image", async ({ page, request }) => {
  await page.goto("/partner/arwen");
  await page.getByRole("tab", { name: "Hình ảnh", exact: true }).click();
  const artwork = page.getByRole("img", { name: "Hình ảnh toàn thân của Arwen", exact: true });
  await expect(artwork).toBeVisible();
  await expect.poll(() => artwork.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  const fullImage = page.getByRole("link", { name: "Xem ảnh đầy đủ", exact: true });
  const imagePath = await fullImage.getAttribute("href");
  expect(imagePath).toMatch(/^\/assets\//);
  expect((await request.get(imagePath!)).ok()).toBe(true);
});
