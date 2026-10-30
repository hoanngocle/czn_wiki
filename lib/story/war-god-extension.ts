import extensionData from "./war-god-301-1000.json";
import extension1500Data from "./war-god-1001-1500.json";
import type { ProfileEntry, ProfileFact, JournalEntry } from "./war-god";
import type { Mission, MissionEvent, MissionFact } from "./war-god-missions";
import type { WarGodTitle } from "./war-god-titles";

export type ProfileSection = "skills" | "equipment" | "inventory";
type ProfileChange = { chapter: number; section: ProfileSection; paragraphs: string } & (
  | { operation: "upsert"; id: string; name: string; kind: ProfileEntry["kind"]; tag: string; description: string }
  | { operation: "remove"; id: string }
);
type MissionChange = { id: string; title?: string; kind?: Mission["kind"]; firstChapter?: number; objective?: string; events: MissionEvent[]; facts: MissionFact[] };
type TitleChange = { chapter: number; paragraphs: string } & (
  | { operation: "upsert"; id: string; name: string; skill: string; description: string }
  | { operation: "remove"; id: string }
);
type SystemChange = { chapter: number; module: "technique" | "divinity" | "titles" | "chronicle" | "missions" | "world-switch"; status: string; description: string; paragraphs: string };
export type StoryExtension = {
  realms: ProfileFact[]; soul: ProfileFact[]; journal: JournalEntry[];
  profileEvents: ProfileChange[]; missionUpdates: MissionChange[]; titleEvents: TitleChange[];
  systemEvents: SystemChange[]; controlEvents: { chapter: number; name: string; seconds: number; paragraphs: string }[];
};
const earlier = extensionData as StoryExtension;
const later = extension1500Data as StoryExtension;
export const storyExtension: StoryExtension = {
  realms: [...earlier.realms, ...later.realms],
  soul: [...earlier.soul, ...later.soul],
  journal: [...earlier.journal, ...later.journal],
  profileEvents: [...earlier.profileEvents, ...later.profileEvents],
  missionUpdates: [...earlier.missionUpdates, ...later.missionUpdates],
  titleEvents: [...earlier.titleEvents, ...later.titleEvents],
  systemEvents: [...earlier.systemEvents, ...later.systemEvents],
  controlEvents: [...earlier.controlEvents, ...later.controlEvents],
};

/** Replay only evidence known by the selected chapter; never change the base arrays. */
export function applyProfileEvents(entries: ProfileEntry[], section: ProfileSection, chapter: number): ProfileEntry[] {
  const current = new Map(entries.map((entry) => [entry.id, { ...entry }]));
  for (const event of storyExtension.profileEvents) {
    if (event.chapter > chapter || event.section !== section) continue;
    if (event.operation === "remove") current.delete(event.id);
    else current.set(event.id, { id: event.id, name: event.name, kind: event.kind, chapter: event.chapter, tag: event.tag, description: event.description });
  }
  return [...current.values()];
}

export function extendMissions(base: Mission[]): Mission[] {
  const missions = new Map(base.map((mission) => [mission.id, { ...mission, events: [...mission.events], facts: [...(mission.facts ?? [])] }]));
  for (const update of storyExtension.missionUpdates) {
    let mission = missions.get(update.id);
    if (!mission) {
      if (!update.title || !update.kind || !update.firstChapter || !update.objective) throw new Error(`Incomplete mission evidence: ${update.id}`);
      mission = { id: update.id, title: update.title, kind: update.kind, issuer: "Giao diện Chiến Thần", firstChapter: update.firstChapter, objective: update.objective, events: [], facts: [] };
      missions.set(update.id, mission);
    }
    // Later names/objectives belong in dated events, not the original mission header.
    mission.events.push(...update.events);
    mission.facts.push(...update.facts);
  }
  return [...missions.values()].map((mission) => ({ ...mission, events: mission.events.sort((a, b) => a.chapter - b.chapter), facts: mission.facts.sort((a, b) => a.chapter - b.chapter) })).sort((a, b) => a.firstChapter - b.firstChapter);
}

export function applyTitleEvents(titles: WarGodTitle[], chapter: number): WarGodTitle[] {
  const current = new Map(titles.map((title) => [title.id, { ...title }]));
  for (const event of storyExtension.titleEvents) {
    if (event.chapter > chapter) continue;
    if (event.operation === "remove") current.delete(event.id);
    else current.set(event.id, { id: event.id, name: event.name, skill: event.skill, description: event.description, chapter: event.chapter });
  }
  return [...current.values()];
}
