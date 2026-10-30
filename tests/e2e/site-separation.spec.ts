import { expect, test } from "@playwright/test";

test("home offers two independent destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Khám phá CZN/ })).toHaveAttribute("href", "/czn");
  await page.getByRole("link", { name: /Mở thư viện/ }).click();
  await expect(page).toHaveURL(/\/ebooks$/);
  await expect(page.getByRole("heading", { name: "Thư viện truyện", exact: true })).toBeVisible();
});

test("CZN keeps catalog selection and navigation in its namespace", async ({ page }) => {
  await page.goto("/czn");
  await expect(page).toHaveURL(/\/czn\/combatant$/);
  const portrait = page.getByTestId("combatant-portrait").filter({ hasText: "Renoa" });
  await portrait.click();
  await expect(page).toHaveURL(/\/czn\/combatant\/renoa$/);
  await expect(portrait).toHaveAttribute("aria-current", "page");
  const links = await page.getByRole("navigation", { name: /CZN/ }).locator("a").evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
  expect(links.every(href => href?.startsWith("/czn"))).toBe(true);
});

test("legacy deep links retain their destinations, query and fragment", async ({ page, request }) => {
  for (const section of ["combatant", "partner", "deck-builder", "equipment", "terminology", "patch-note", "mechanics"]) {
    const response = await request.get(`/${section}/example?source=bookmark`, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(`/czn/${section}/example?source=bookmark`);
  }
  await page.goto("/truyen/chu-gioi-tan-the-online/chien-than?source=bookmark#profile-equipment");
  await expect(page).toHaveURL(/\/ebooks\/chu-gioi-tan-the-online\/chien-than\?source=bookmark#profile-equipment$/);
  await page.goto("/truyen");
  await expect(page).toHaveURL(/\/ebooks$/);
});

test("library searches actual books by title and author and recovers from no results", async ({ page }) => {
  await page.goto("/ebooks");
  const search = page.getByRole("searchbox", { name: "Tìm truyện hoặc tác giả" });
  const book = page.getByRole("heading", { name: "Chư Giới Tận Thế Online", exact: true });
  await search.fill("  CHU GIOI  ");
  await expect(book).toBeVisible();
  await search.fill("yen hoa thanh thanh");
  await expect(book).toBeVisible();
  await search.fill("không có cuốn sách này");
  await expect(book).toHaveCount(0);
  await expect(page.getByText("Không tìm thấy truyện phù hợp.")).toBeVisible();
  await page.getByRole("button", { name: "Xóa tìm kiếm" }).click();
  await expect(book).toBeVisible();
});

test("library opens the saved reading chapter and story returns to the library", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 97 })));
  await page.goto("/ebooks");
  await page.getByRole("link", { name: "Đọc truyện", exact: true }).click();
  await expect(page).toHaveURL(/\/ebooks\/chu-gioi-tan-the-online\/doc-truyen$/);
  await expect(page.frameLocator('iframe[title="Đọc Chư Giới Tận Thế Online"]').locator("body")).toHaveAttribute("data-chapter", "97");
  await page.getByRole("link", { name: "Về thư viện truyện", exact: true }).click();
  await expect(page).toHaveURL(/\/ebooks$/);
});

test("entrance and library fit narrow screens", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 320, height: 844 });
  for (const route of ["/", "/ebooks"]) {
    await page.goto(route);
    if (route === "/ebooks") {
      // Interact before screenshots so Playwright's caret hiding cannot race hydration.
      await page.getByRole("searchbox").fill("không có truyện");
      await expect(page.getByText("Không tìm thấy truyện phù hợp.")).toBeVisible();
      await page.getByRole("button", { name: "Xóa tìm kiếm" }).click();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/site-${route === "/" ? "home" : "ebooks"}-mobile.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});
