import type { CharacterSummary } from "./types";

export type CombatantFilters = { query: string; rarities: number[]; egos: string[]; jobs: string[] };

export function filterCombatants(items: CharacterSummary[], filters: CombatantFilters): CharacterSummary[] {
  const query = filters.query.trim().toLocaleLowerCase();
  return items.filter((item) => item.kind === "combatant"
    && (!query || [item.id, item.name, ...Object.values(item.names)].some((name) => name?.toLocaleLowerCase().includes(query)))
    && (!filters.rarities.length || filters.rarities.includes(item.rarity))
    && (!filters.egos.length || filters.egos.includes(item.ego))
    && (!filters.jobs.length || filters.jobs.includes(item.job)));
}
