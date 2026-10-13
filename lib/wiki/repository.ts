// Static JSON repository. Keep this module in Server Components and tests only.
import characters from "../../data/wiki/characters.json";
import detail from "../../data/wiki/characters/1041.json";
import manifest from "../../data/wiki/source-manifest.json";
import assets from "../../data/wiki/assets.json";
import type { CharacterDetail, CharacterSummary } from "./types";

const summaries = characters as CharacterSummary[];

export function getCombatants(): CharacterSummary[] {
  return summaries.filter((character) => character.kind === "combatant");
}

export function getCharacter(id: string): CharacterSummary | undefined {
  return summaries.find((character) => character.id === id);
}

export function getCharacterDetail(id: string): CharacterDetail | undefined {
  return id === "1041" ? detail as CharacterDetail : undefined;
}

export function getNewCombatantIds(): string[] { return manifest.diff.new; }
export function getUnavailableJobIcons(): string[] { return assets.filter((asset) => asset.status !== "available" && /icon_job_(\w+)\.webp$/.test(asset.sourcePath)).map((asset) => asset.sourcePath.match(/icon_job_(\w+)\.webp$/)?.[1] ?? "").filter(Boolean); }
