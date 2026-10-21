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
  expect(readFileSync(join(root, "data/wiki/guides/index.ts"), "utf8").includes('"rossweisse": grossweisse')).toBe(hasGuide);
});
