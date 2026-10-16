import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import assets from "../../data/wiki/assets.json";
import characters from "../../data/wiki/characters.json";
import catalog from "../../data/deck-builder/catalog.json";
import { normalizeCharacters } from "../../scripts/import-e7bot.mjs";
import { assetUrl, copyAsset, createAssetResolver } from "../../scripts/asset-paths.mjs";

it("stores every available manifest asset at a flat URL without changing its bytes", () => {
  for (const asset of assets.filter((asset) => asset.status === "available")) {
    expect(asset.localUrl).toMatch(/^\/assets\/[^/]+\/[^/]+$/);
    const path = join("public", asset.localUrl);
    expect(existsSync(path), asset.localUrl).toBe(true);
    expect(createHash("sha256").update(readFileSync(path)).digest("hex")).toBe(asset.sha256);
  }
});

it("flattens nested item files and keeps card videos alongside artwork", () => {
  expect(assetUrl("api/assets/file/czn/data/item/relics/relic_0108.webp")).toBe("/assets/item/relic_0108.webp");
  expect(assetUrl("api/assets/file/czn/data/card_illustration/unique_1041_01.webm")).toBe("/assets/card/unique_1041_01.webm");
  const resolveAsset = createAssetResolver([{ kind: "supporter", portrait: "/assets/partner/portrait_character_crop_half_30044.webp" }]);
  expect(resolveAsset("api/assets/file/czn/data/face/character/portrait_character_crop_half_30044.webp")).toBe("/assets/partner/portrait_character_crop_half_30044.webp");
});

it("refuses a conflicting basename without overwriting the existing asset", () => {
  const root = mkdtempSync(join(tmpdir(), "czn-asset-layout-"));
  try {
    const first = join(root, "first.webp"), second = join(root, "second.webp");
    writeFileSync(first, "first asset");
    writeFileSync(second, "different asset");
    copyAsset(first, root, "/assets/item/icon.webp");
    expect(() => copyAsset(first, root, "/assets/item/icon.webp")).not.toThrow();
    expect(() => copyAsset(second, root, "/assets/item/icon.webp")).toThrow(/collision/i);
    expect(readFileSync(join(root, "assets/item/icon.webp"), "utf8")).toBe("first asset");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

it("keeps every non-null deck builder asset reference connected to a real file", () => {
  const urls = JSON.stringify(catalog).match(/\/assets\/[^"\s]+/g) ?? [];
  expect(urls.length).toBeGreaterThan(0);
  expect(JSON.stringify(catalog)).not.toContain("/reference/e7bot/");
  for (const url of new Set(urls)) {
    expect(url).toMatch(/^\/assets\/[^/]+\/[^/]+$/);
    expect(existsSync(join("public", url)), url).toBe(true);
  }
});

it("assigns combatants and partners to their own flat portrait directories", () => {
  for (const character of characters) {
    expect(character.portrait).toMatch(new RegExp(`^/assets/${character.kind === "combatant" ? "combatant" : "partner"}/[^/]+$`));
  }
  const imported = normalizeCharacters([
    { id: "1003", name: "Combatant", char_type: "CHAR_COMBATANT", rarity: 5 },
    { id: "20001", name: "Partner", char_type: "CHAR_SUPPORTER", rarity: 4 },
  ]);
  expect(imported.map((character) => character.portrait)).toEqual([
    "/assets/combatant/portrait_character_crop_half_1003.webp",
    "/assets/partner/portrait_character_crop_half_20001.webp",
  ]);
});
