import { expect, test } from "@playwright/test";

const story = "/ebooks/chu-gioi-tan-the-online";

test("opens missions and keeps five dock slots locked on desktop and mobile", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 98 })));
  await page.goto(story);
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
    const modal = page.getByRole("dialog");
    const stage = modal.getByTestId("system-stage");
    const dock = modal.getByRole("navigation", { name: "Chức năng hệ thống Chiến Thần" });
    await expect(stage.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
    await expect(dock.getByRole("button")).toHaveCount(6);
    await expect(dock.locator("button:enabled")).toHaveCount(1);
    const locked = dock.getByRole("button", { name: /Chức năng chưa mở khóa/ });
    await expect(locked).toHaveCount(5);
    for (const slot of await locked.all()) {
      await expect(slot).toBeDisabled();
      await expect(slot).toHaveText("");
      await expect(slot).toBeInViewport();
      await slot.evaluate((node) => (node as HTMLButtonElement).click());
      await expect(stage.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
    }
    await page.screenshot({ path: `test-results/system-locked-${width}.png`, animations: "disabled" });
    await dock.getByRole("button", { name: "Kỹ nghệ Chiến Thần", exact: true }).click();
    await expect(stage).not.toHaveText("");
    await page.keyboard.press("Tab");
    expect(await modal.evaluate((node) => node.contains(document.activeElement) && !(document.activeElement as HTMLButtonElement).disabled)).toBe(true);
    expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
    await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).click();
  }
});

test("mobile close and header menus keep 44px touch targets", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal.locator("header").getByRole("button", { name: "Danh sách nhiệm vụ" })).toBeVisible();
  await expect(modal.getByRole("button", { name: "Bỏ qua hiệu ứng" })).toHaveCount(0);
  for (const name of ["Đóng hệ thống Chiến Thần", "Danh sách nhiệm vụ"]) {
    const bounds = (await modal.getByRole("button", { name, exact: true }).boundingBox())!;
    expect(bounds.width).toBeGreaterThanOrEqual(44);
    expect(bounds.height).toBeGreaterThanOrEqual(44);
  }
});

test("system opens in place, traps focus and returns to its trigger", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 92 })));
  await page.goto(story);
  const trigger = page.getByRole("button", { name: "Mở hệ thống Chiến Thần" });
  await trigger.click();
  const modal = page.getByRole("dialog", { name: "Chiến Thần", exact: true });
  await expect(modal).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`${story}$`));
  await modal.getByRole("button", { name: "Xem vòng quay Thần thông Chiến Thần" }).click();
  await modal.getByRole("button", { name: "Vũ Trụ chủng", exact: true }).click();
  await expect(modal).toContainText("Mảnh tim quái vật vũ trụ");
  await page.screenshot({ path: "test-results/system-desktop.png" });
  await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).focus();
  await page.keyboard.press("Shift+Tab");
  expect(await modal.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(modal).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.mouse.click(4, 4);
  await expect(modal).toHaveCount(0);
});

test("profile and mobile expose the system without revealing future modules", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${story}/chien-than`);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog", { name: "Chiến Thần", exact: true });
  await expect(modal.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
  await expect(modal).not.toContainText("Tru Tà");
  expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
  await page.screenshot({ path: "test-results/system-mobile.png" });
  await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).click();
  await expect(page.getByRole("region", { name: "Hồ sơ Chiến Thần", exact: true })).toBeVisible();
});

test("reader keeps its chapter, iframe and scroll while the system is open", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 92 })));
  await page.goto(`${story}/doc-truyen`);
  const reader = page.frameLocator('iframe[title="Đọc Chư Giới Tận Thế Online"]');
  await expect(reader.locator(".chapter-text")).toBeVisible();
  const position = await reader.locator("body").evaluate(() => { window.scrollTo(0, 400); return window.scrollY; });
  const iframe = await page.locator('iframe[title="Đọc Chư Giới Tận Thế Online"]').elementHandle();
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog", { name: "Chiến Thần", exact: true });
  await modal.getByRole("button", { name: "Xem vòng quay Thần thông Chiến Thần" }).click();
  await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).click();
  expect(await reader.locator("body").evaluate(() => window.scrollY)).toBe(position);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
    await expect(modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" })).toBeVisible();
    if (width === 390) await page.screenshot({ path: "test-results/system-mobile-populated.png" });
  }
  await page.setViewportSize({ width: 1280, height: 720 });
  // Resizing reflows the reader; closing the modal must preserve that new position too.
  const resizedPosition = await reader.locator("body").evaluate(() => window.scrollY);
  await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).click();
  await expect(page).toHaveURL(new RegExp(`${story}/doc-truyen$`));
  expect(await iframe?.evaluate((node) => node.isConnected)).toBe(true);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("92");
  expect(await reader.locator("body").evaluate(() => window.scrollY)).toBe(resizedPosition);
});

test("inspects a weapon without spending soul and shows evidence for recorded stats", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 4 })));
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByRole("button", { name: "Kỹ nghệ Chiến Thần", exact: true }).click();
  await expect(modal.getByTestId("system-soul")).toContainText("1 / 5");
  await expect(modal.getByTestId("system-stage")).toContainText("Chính Xác");
  await expect(modal.getByTestId("system-stage")).toContainText("Cho cả hai kỹ nghệ");
  await expect(modal.getByTestId("system-stage")).toContainText("Yến Song Phi");
  await modal.getByRole("button", { name: "Loan đao quân đội", exact: true }).click();
  await expect(modal.getByTestId("system-stage")).toContainText("Vương Tiến / Trương Khoát");
  await modal.getByRole("button", { name: "Quân cung", exact: true }).click();
  await modal.getByTestId("system-stage").evaluate((node) => { node.scrollTop = 0; });
  await page.screenshot({ path: "test-results/concept-inspection-desktop.png" });
  await modal.getByTestId("system-soul").click();
  await expect(modal.getByRole("region", { name: "Nguồn đang xem" })).toContainText("trước khi thăng cấp");
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("chu-gioi-reader-progress")!).chapter)).toBe(4);
});

for (const chapter of [1, 34, 81, 95, 97, 98, 300]) {
  test(`chapter ${chapter} opens missions without automatically unlocking dock slots`, async ({ page }) => {
    await page.addInitScript((chapter) => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter })), chapter);
    await page.goto(story);
    await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
    const modal = page.getByRole("dialog");
    await expect(modal.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
    const dock = modal.getByRole("navigation", { name: "Chức năng hệ thống Chiến Thần" });
    await expect(dock.locator("button:disabled")).toHaveCount(5);
    await expect(dock.getByRole("button", { name: "Kỹ nghệ Chiến Thần", exact: true })).toBeEnabled();
    await modal.getByRole("button", { name: "Danh sách nhiệm vụ" }).click();
    await expect(modal.getByTestId("system-stage")).not.toHaveText("");
    if (chapter >= 81) {
      await modal.getByRole("button", { name: "Xem vòng quay Thần thông Chiến Thần" }).click();
      await expect(modal.getByRole("group", { name: "Bàn quay năm chủng" }).getByRole("button")).toHaveCount(5);
    }
  });
}

test("reduced motion and backward progress clear future details while the modal remains open", async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/chu-gioi-tan-the-online/html/chuong-0098.html");
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByRole("button", { name: "Kỹ nghệ Chiến Thần", exact: true }).click();
  await expect(modal.getByTestId("system-stage")).not.toHaveText("");
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-0004.html");
  await expect(modal).not.toContainText("Tru Tà");
  await expect(modal.getByRole("region", { name: "Danh sách nhiệm vụ" })).toBeVisible();
  await modal.getByRole("button", { name: "Kỹ nghệ Chiến Thần", exact: true }).click();
  await expect(modal.getByTestId("system-stage")).toContainText("Quân cung");
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
    await expect(modal.getByRole("button", { name: "Kỹ nghệ Chiến Thần", exact: true })).toBeInViewport();
    await page.screenshot({ path: `test-results/concept-inspection-${width}.png` });
  }
});

test("opening the modal selects an active mission instead of a completed one", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 94 })));
  await page.goto(story);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal.getByTestId("mission-detail")).toContainText("Đang tiến hành");
  await expect(modal.getByTestId("mission-detail").getByRole("heading", { name: "Thần thông Chiến Thần", exact: true })).toBeVisible();
  await modal.getByTestId("mission-list").getByRole("button", { name: /Trận Chiến Chết Chóc/ }).click();
  await expect(modal.getByTestId("mission-detail")).toContainText("Đã hoàn thành");
  await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).click();
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  await expect(modal.getByTestId("mission-detail")).toContainText("Đang tiến hành");
});
