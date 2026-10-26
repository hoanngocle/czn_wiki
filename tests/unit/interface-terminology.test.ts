import { expect, it } from "vitest";
import { interfaceText } from "../../lib/ui/language";

it("keeps game labels English in Vietnamese equipment and deck builder controls", () => {
  for (const term of ["Deck Builder", "Equipment", "Items", "Weapon", "Armor", "Accessory", "Legendary", "Unique", "Rare", "Common", "Monster", "Curse", "Event", "Persona", "Normal", "Sortie", "Epiphany", "Memory Fragments"]) {
    expect(interfaceText(term, true), term).toBe(term);
  }
  expect(interfaceText("weapon", true)).toBe("Weapon");
  expect(interfaceText("LEGEND", true)).toBe("Legendary");
  expect(interfaceText("Memory fragments", true)).toBe("Memory Fragments");
  expect(interfaceText("Include Sortie", true)).toBe("Gồm Sortie");
  expect(interfaceText("Divine epiphanies", true)).toBe("Divine Epiphanies");
  expect(interfaceText("Choose one normal and one divine epiphany. Only compatible effects are shown.", true)).toBe("Chọn một Normal Epiphany và một Divine Epiphany. Chỉ hiển thị các hiệu ứng tương thích.");
  expect(interfaceText("Save deck", true)).toBe("Lưu bộ bài");
});
