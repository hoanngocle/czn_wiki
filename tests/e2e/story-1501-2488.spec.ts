import { expect, test } from "@playwright/test";
import baseline from "../../lib/story/legacy/chapters-1500.json";
import { STORY_STORAGE_KEY } from "../../lib/story/graph";

const story = "/ebooks/chu-gioi-tan-the-online";

test("the final chapter migrates a saved graph and rewinds the void mission", async ({ page, context }) => {
  const saved = structuredClone(baseline);
  saved.nodes.find((node) => node.id === "anna-character")!.summary = "Ghi chú riêng trước đoạn kết";
  await page.addInitScript(({ key, raw }) => {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, raw);
    for (const suffix of ["chapters-200", "chapters-300", "chapters-1000", "chapters-1500", "meo-mun-restored"]) localStorage.setItem(`${key}:${suffix}`, "1");
    localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 2488 }));
  }, { key: STORY_STORAGE_KEY, raw: JSON.stringify(saved) });
  await page.goto(story);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  const stored = await page.evaluate((key) => ({ graph: JSON.parse(localStorage.getItem(key)!), backup: localStorage.getItem(`${key}:before-chapters-2488`) }), STORY_STORAGE_KEY);
  expect(stored.graph.nodes.some((node: { chapters?: number[] }) => node.chapters?.includes(2488))).toBe(true);
  expect(stored.graph.nodes.find((node: { id: string }) => node.id === "anna-character").summary).toBe("Ghi chú riêng trước đoạn kết");
  expect(stored.backup).toBe(JSON.stringify(saved));
  await page.goto(`${story}/chien-than`);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("2488");
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  const reader = await context.newPage();
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-2141.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("2141");
  await modal.getByLabel("Tìm nhiệm vụ").fill("Chiến Thần Hư Không");
  await modal.getByTestId("mission-list").getByRole("button").click();
  await expect(modal.getByTestId("mission-detail").getByRole("heading", { name: /Chiến Thần Hư Không/i })).toBeVisible();
  await expect(modal.getByTestId("mission-detail").locator('[data-status="active"]')).toHaveText("Đang tiến hành");
  await reader.goto("/chu-gioi-tan-the-online/html/chuong-2142.html");
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("2142");
  await modal.getByLabel("Tìm nhiệm vụ").fill("Chiến Thần Hư Không");
  await modal.getByTestId("mission-list").getByRole("button").click();
  await expect(modal.getByTestId("mission-detail").getByRole("heading", { name: /Chiến Thần Hư Không/i })).toBeVisible();
  await expect(modal.getByTestId("mission-detail").locator('[data-status="completed"]')).toHaveText("Đã hoàn thành");
  await page.screenshot({ path: "test-results/story-2488-mission-desktop.png" });
});

test("the final profile and system dialog fit a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.addInitScript(() => localStorage.setItem("chu-gioi-reader-progress", JSON.stringify({ chapter: 2488 })));
  await page.goto(`${story}/chien-than`);
  await expect(page.getByLabel("Chương hiện tại")).toHaveValue("2488");
  await expect(page.getByTestId("realm")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Mở hệ thống Chiến Thần" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
  await page.screenshot({ path: "test-results/story-2488-modal-mobile.png" });
  await modal.getByRole("button", { name: "Đóng hệ thống Chiến Thần" }).click();
  await expect(modal).toHaveCount(0);
});
