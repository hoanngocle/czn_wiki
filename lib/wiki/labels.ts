import terminology from "../../data/wiki/translations/vi/terminology.json";
import aliases from "../../data/wiki/translations/game-term-aliases.json";
import { createGameTermNormalizer } from "./game-term-names.mjs";
// Only interface controls are localized; game names stay identical to the source.
const interfaceLabels = new Set(["Review", "Animation"]);
const labels = new Map(Object.entries(terminology).filter(([key]) => interfaceLabels.has(key)).map(([key, value]) => [key.toLowerCase(), value]));
export const preserveGameTermNames = createGameTermNormalizer(terminology, aliases);

export function label(value: string, vietnamese: boolean): string {
  return vietnamese ? labels.get(value.toLowerCase()) ?? value : value;
}
