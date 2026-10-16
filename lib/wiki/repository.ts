// Static JSON repository. Keep this module in Server Components and tests only.
import characters from "../../data/wiki/characters.json";
import { characterDetails } from "../../data/wiki/characters/index";
import manifest from "../../data/wiki/source-manifest.json";
import assets from "../../data/wiki/assets.json";
import type { CharacterDetail, CharacterSummary } from "./types";
import { combatantSlug } from "./urls";

const summaries = characters as CharacterSummary[];

export function getCombatants(): CharacterSummary[] {
  return summaries.filter((character) => character.kind === "combatant");
}

export function getCharacter(id: string): CharacterSummary | undefined {
  return summaries.find((character) => character.id === id);
}

export function getCombatantBySlug(slug: string): CharacterSummary | undefined {
  return getCombatants().find((character) => combatantSlug(character) === slug);
}

export function getCharacterDetail(id: string): CharacterDetail | undefined {
  return characterDetails[id];
}

export function getNewCombatantIds(): string[] { return manifest.diff.new; }
export function getUnavailableJobIcons(): string[] { return assets.filter((asset) => asset.status !== "available" && /icon_job_(\w+)\.webp$/.test(asset.sourcePath)).map((asset) => asset.sourcePath.match(/icon_job_(\w+)\.webp$/)?.[1] ?? "").filter(Boolean); }
