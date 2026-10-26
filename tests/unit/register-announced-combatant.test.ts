import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { expect, it } from "vitest";

it.each([false, true])("registers a published kit and preserves an optional editorial guide (guide: %s)", hasGuide => {
  const root = mkdtempSync(join(tmpdir(), "czn-announced-roster-"));
  const write = (path: string, value: unknown) => { const target = join(root, path); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, JSON.stringify(value)); };
  write("data/wiki/characters.json", [{ id: "1003", kind: "combatant", source: "e7bot" }, { id: "rossweisse", kind: "combatant", source: "stove" }]);
  for (const id of ["1003", "rossweisse"]) {
    write(`data/wiki/characters/${id}.json`, {});
    for (const part of ["cards", "glossary", "progression"]) write(`data/wiki/translations/vi/${id}.${part}.json`, {});
  }
  write("data/wiki/guides/1003.json", {});
  if (hasGuide) write("data/wiki/guides/rossweisse.json", {});
  expect(() => execFileSync(process.execPath, [resolve("scripts/register-combatant-content.mjs")], { cwd: root })).not.toThrow();
  expect(readFileSync(join(root, "data/wiki/characters/index.ts"), "utf8")).toContain('"rossweisse": crossweisse');
  expect(readFileSync(join(root, "data/wiki/translations/index.ts"), "utf8")).toContain('"rossweisse":');
  expect(readFileSync(join(root, "data/wiki/guides/index.ts"), "utf8").includes('"rossweisse": moveCardAdviceToReviews(grossweisse as CharacterGuide)')).toBe(hasGuide);
});

it("moves every guide's card advice into card-level Epiphany guidance when regenerating the registry", () => {
  const root = mkdtempSync(join(tmpdir(), "czn-rin-guide-"));
  const write = (path: string, value: unknown) => { const target = join(root, path); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, JSON.stringify(value)); };
  write("data/wiki/characters.json", [{ id: "1018", kind: "combatant", source: "e7bot" }]);
  write("data/wiki/characters/1018.json", {});
  write("data/wiki/guides/1018.json", {});
  for (const part of ["cards", "glossary", "progression"]) write(`data/wiki/translations/vi/1018.${part}.json`, {});

  execFileSync(process.execPath, [resolve("scripts/register-combatant-content.mjs")], { cwd: root });

  const registry = readFileSync(join(root, "data/wiki/guides/index.ts"), "utf8");
  expect(registry).toContain('import { rinEpiphanyReviews } from "./rin-epiphany";');
  expect(registry).toContain('import { moveCardAdviceToReviews, type CharacterGuide } from "../../../lib/wiki/character-guide";');
  expect(registry).toContain('"1018": moveCardAdviceToReviews(g1018 as CharacterGuide, rinEpiphanyReviews)');
});
