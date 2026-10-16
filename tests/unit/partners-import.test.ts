import { afterAll, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { importPartners } from "../../scripts/import-partners.mjs";

const output = mkdtempSync(join(tmpdir(), "czn-partners-"));
afterAll(() => rmSync(output, { recursive: true, force: true }));

it("reproduces the complete current catalog with the default import source", () => {
  const dataRoot = join(output, "current-data");
  const publicRoot = join(output, "current-public");
  const result = importPartners(undefined, dataRoot, publicRoot);
  expect(result).toEqual({ partners: 49, details: 49, missingPortraits: [], missingArtwork: [] });
  const generated = JSON.parse(readFileSync(join(dataRoot, "partners.json"), "utf8"));
  const canonical = JSON.parse(readFileSync("data/wiki/partners.json", "utf8"));
  expect(generated).toEqual(canonical);
});

it("imports the supporter roster and preserves passive ranks and breakthrough boundaries", () => {
  const result = spawnSync(process.execPath, ["scripts/import-partners.mjs", "docs/partner", join(output, "data"), join(output, "public")], { encoding: "utf8" });
  expect(result.status, result.stderr).toBe(0);
  const catalog = JSON.parse(readFileSync(join(output, "data/partners.json"), "utf8"));
  expect(catalog.characters).toHaveLength(49);
  expect(catalog.characters.every((c: { kind: string }) => c.kind === "supporter")).toBe(true);
  const licinia = catalog.details["30116"];
  expect(licinia.name).toBe("Licinia");
  expect(licinia.passives.map((p: { level: number }) => p.level)).toEqual([1, 2, 3, 4, 5]);
  expect(licinia.passives[0].descriptions.join(" ")).toContain("16");
  expect(licinia.passives[4].descriptions.join(" ")).toContain("24");
  expect(licinia.passives[4].descriptions.join(" ")).not.toMatch(/\$|Virutoxin#\d/);
  const stat = (level: number, breakthrough: boolean) => licinia.stats.find((s: { level: number; breakthrough: boolean }) => s.level === level && s.breakthrough === breakthrough);
  expect(stat(1, false)).toEqual({ level: 1, breakthrough: false, attack: 27, defense: 0, hp: 1 });
  expect(stat(10, false)).toEqual({ level: 10, breakthrough: false, attack: 45, defense: 0, hp: 19 });
  expect(stat(10, true)).toEqual({ level: 10, breakthrough: true, attack: 47, defense: 1, hp: 24 });
  expect(stat(11, false)).toEqual({ level: 11, breakthrough: false, attack: 49, defense: 1, hp: 26 });
  expect(stat(60, true)).toEqual({ level: 60, breakthrough: true, attack: 155, defense: 5, hp: 144 });
  expect(licinia.card.name).toBe("Blossoming Venom");
  expect(licinia.card.cost).toBe(3);
  expect(licinia.card.tooltips.map((t: { title: string }) => t.title)).toContain("Paralytic Poison");
  expect(existsSync(join(output, "public", licinia.card.artwork))).toBe(true);
  for (const character of catalog.characters) {
    if (character.portrait) {
      expect(character.portrait).toMatch(/^\/assets\/partner\//);
      expect(existsSync(join(output, "public", character.portrait))).toBe(true);
    }
  }
});
