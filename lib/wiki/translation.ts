// Registry lookup stays outside the client translation engine.
import { characterTranslations } from "../../data/wiki/translations";
import { translateCharacterDetail as translateDetail } from "./translation-core";
import type { CharacterDetail } from "./types";
export { translateCard } from "./translation-core";
export function translateCharacterDetail(detail: CharacterDetail) {
  return translateDetail(detail, characterTranslations[detail.id]);
}
