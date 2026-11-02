import { expect, test } from "@playwright/test";

const atlas = "/ebooks/chu-gioi-tan-the-online/ban-do-vu-tru";

test("explore a world, its relations, and chapter evidence", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto(atlas);
  await expect(page.getByRole("heading", { name: /^Bản đồ vũ trụ/ })).toBeVisible();
  await expect(page.getByTestId("cosmos-canvas").locator("canvas")).toBeVisible();
  await expect(page.getByTestId("cosmos-canvas")).toHaveAttribute("data-ready", "true");
  await page.getByLabel("Tìm khu vực hoặc thế giới").fill("huyen khong");
  await page.getByTestId("cosmos-results").getByRole("button", { name: /Huyền Không/ }).click();
  const details = page.getByTestId("cosmos-details");
  await expect(details.getByRole("heading", { name: "Thế giới Huyền Không", exact: true })).toBeVisible();
  await details.getByRole("button", { name: /Thiết Quyền Chính Nghĩa/ }).click();
  await expect(details.getByRole("heading", { name: "Thiết Quyền Chính Nghĩa", exact: true })).toBeVisible();
  await expect(page.getByLabel("Tìm khu vực hoặc thế giới")).toHaveValue("");
  await expect(details.getByRole("link", { name: "Chương 547", exact: true }).first()).toHaveAttribute("href", /doc-truyen\?chuong=547$/);
  await page.getByRole("button", { name: "Toàn cảnh", exact: true }).click();
  await page.getByTestId("cosmos-canvas").getByRole("button", { name: "Xem Thế giới hiện thực", exact: true }).click();
  await expect(details.getByRole("heading", { name: "Thế giới hiện thực", exact: true })).toBeVisible();
  await details.getByRole("button", { name: /Mộ Phần Của Thế Giới/ }).click();
  await expect(details.getByRole("heading", { name: "Mộ Phần Của Thế Giới", exact: true })).toBeVisible();
  await expect(details.getByText("Khái niệm", { exact: true })).toBeVisible();
  await page.getByLabel("Tìm khu vực hoặc thế giới").fill("xyz-no-world");
  await expect(page.getByText("Không tìm thấy địa điểm phù hợp.")).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile list and details stay reachable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(atlas);
  await page.getByLabel("Tìm khu vực hoặc thế giới").fill("thần võ");
  await page.getByTestId("cosmos-results").getByRole("button", { name: /Thần Võ/ }).click();
  await expect(page.getByTestId("cosmos-details").getByRole("heading", { name: "Thế giới Thần Võ", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("desktop catalog and relation navigation reveal the new detail heading", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(atlas);
  await page.getByTestId("cosmos-results").getByRole("button", { name: /Thế giới hiện thực/ }).click();
  const details = page.getByTestId("cosmos-details");
  await expect(details.getByRole("heading", { name: "Thế giới hiện thực", exact: true })).toBeInViewport();
  await details.getByRole("button", { name: "Lục Đạo Luân Hồi", exact: true }).click();
  await expect(details.getByRole("heading", { name: "Lục Đạo Luân Hồi", exact: true })).toBeInViewport();
  await expect.poll(() => details.evaluate((element) => element.scrollTop)).toBe(0);
});

test("world details remain usable when WebGL is unavailable", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type.includes("webgl")) return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto(atlas);
  await expect(page.getByText("Không thể mở không gian 3D trên thiết bị này.")).toBeVisible();
  await page.getByLabel("Tìm khu vực hoặc thế giới").fill("hiện thực");
  await page.getByTestId("cosmos-results").getByRole("button", { name: /Thế giới hiện thực/ }).click();
  await expect(page.getByTestId("cosmos-details").getByRole("heading", { name: "Thế giới hiện thực", exact: true })).toBeVisible();
  await context.close();
});
