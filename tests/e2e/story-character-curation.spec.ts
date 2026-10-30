import { expect, test } from "@playwright/test";
import { createInitialGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";
import previousSeed from "../../lib/story/legacy/v12.json";

const route = "/ebooks/chu-gioi-tan-the-online";

test("character list removes passing characters from existing saves and stays curated after reload", async ({ page }) => {
  const saved = createInitialGraph();
  saved.nodes = saved.nodes.filter((node) => node.id !== "meo-mun");
  saved.links = saved.links.filter((link) => link.target !== "meo-mun");
  saved.nodes.push(...previousSeed.nodes.filter((node) => ["vuong-tien", "chuot-dong", "ly-dong", "trieu-luc", "nhiep-van", "dao-hoang", "doc-co-quynh", "chu-khai-vu"].includes(node.id)) as typeof saved.nodes);
  for (const id of ["vuong-tien", "chuot-dong", "ly-dong", "trieu-luc", "nhiep-van", "dao-hoang", "doc-co-quynh", "chu-khai-vu"]) saved.links.push({ source: "hero", target: id, label: "Giới thiệu cũ", introduction: true });
  saved.nodes.find((node) => node.id === "anna-character")!.summary = "Ghi chú Anna của tôi";
  await page.addInitScript(({ key, raw }) => { if (!localStorage.getItem(key)) localStorage.setItem(key, raw); }, { key: STORY_STORAGE_KEY, raw: JSON.stringify(saved) });
  await page.goto(route);
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Mở công cụ sơ đồ", exact: true }).click();
  await page.getByRole("button", { name: "Nhân vật", exact: true }).click();
  await expect(page.getByRole("button", { name: "Ẩn node nhân vật · 27", exact: true })).toBeVisible();
  await expect(page.getByTestId("story-node-vuong-tien")).toHaveCount(0);
  await expect(page.getByTestId("story-node-chuot-dong")).toHaveCount(0);
  await expect(page.getByTestId("story-node-ly-dong")).toHaveCount(0);
  const search = page.getByRole("searchbox", { name: "Tìm trong wiki" });
  await search.fill("Mèo mun");
  await page.getByRole("button", { name: "Tìm đến Mèo mun — Thiên Tuyển Kỹ", exact: true }).click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toContainText("Trương Anh Hào triệu hồi");
  await search.fill("Anna");
  await page.getByRole("button", { name: "Tìm đến Anna", exact: true }).click();
  await expect(page.getByRole("complementary", { name: "Chi tiết wiki" })).toContainText("Ghi chú Anna của tôi");
  await page.reload();
  await expect(page.getByTestId("story-viewport")).toHaveAttribute("data-ready", "true");
  const data = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORY_STORAGE_KEY);
  expect(data.nodes.filter((node: { kind: string }) => node.kind === "character")).toHaveLength(27);
  expect(await page.evaluate((key) => localStorage.getItem(`${key}:before-character-curation`), STORY_STORAGE_KEY)).toContain("chuot-dong");
});
