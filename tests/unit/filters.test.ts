import { expect, it } from "vitest";
import { getCombatants } from "../../lib/wiki/repository";
import { filterCombatants } from "../../lib/wiki/filters";

const items = getCombatants();
const empty = { query: "", rarities: [], egos: [], jobs: [] };

it("trims and folds query across names", () => {
  expect(filterCombatants(items, { ...empty, query: " RENOa " }).map((x) => x.id)).toEqual(["1041"]);
  expect(filterCombatants(items, { ...empty, query: "妮雅" }).map((x) => x.id)).toEqual(["1003"]);
  expect(filterCombatants(items, { ...empty, query: "no matching combatant" })).toEqual([]);
});

it("uses AND across filters and OR within a filter", () => {
  const result = filterCombatants(items, { query: "", rarities: [4, 5], egos: [], jobs: ["hunter"] });
  expect(result.some((x) => x.id === "1041")).toBe(true);
  expect(result.every((x) => [4, 5].includes(x.rarity) && x.job === "hunter")).toBe(true);
  expect(filterCombatants(items, { ...empty, rarities: [5], jobs: ["hunter"] }).some((x) => x.id === "1041")).toBe(true);
  expect(filterCombatants(items, empty)).toHaveLength(39);
});
