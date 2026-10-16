import { expect, it } from "vitest";
import { getCombatants, getCharacter, getCharacterDetail } from "../../lib/wiki/repository";

it("lists complete combatants and leaves unknown detail unavailable", () => {
  expect(getCombatants()).toHaveLength(38);
  expect(getCombatants().every((character) => character.kind === "combatant")).toBe(true);
  expect(getCharacter("1003")?.name).toBe("Nia");
  expect(getCharacterDetail("1003")?.name).toBe("Nia");
  expect(getCombatants().every(character => getCharacterDetail(character.id))).toBe(true);
  expect(getCharacterDetail("missing")).toBeUndefined();
  expect(getCharacterDetail("1041")?.name).toBe("Renoa");
  expect(getCharacter("missing")).toBeUndefined();
});
