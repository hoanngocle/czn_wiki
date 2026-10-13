import { expect, it } from "vitest";
import { getCombatants, getCharacter, getCharacterDetail } from "../../lib/wiki/repository";

it("only lists combatants and leaves missing detail unavailable", () => {
  expect(getCombatants()).toHaveLength(38);
  expect(getCombatants().every((character) => character.kind === "combatant")).toBe(true);
  expect(getCharacter("1003")?.name).toBe("Nia");
  expect(getCharacterDetail("1003")).toBeUndefined();
  expect(getCharacterDetail("1041")?.name).toBe("Renoa");
  expect(getCharacter("missing")).toBeUndefined();
});
