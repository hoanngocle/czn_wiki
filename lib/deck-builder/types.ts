import type { Card, CharacterSummary } from "../wiki/types";

export type BuilderCharacter = Omit<CharacterSummary, "portrait"> & { portrait: string | null };
export type BuilderCard = Card & { ownerId: string | null; ownerClass?: string; jobs: string[]; tags: string[]; chaos: string; variantIds: string[] };
export type Relic = { id: string; name: string; type: string; rarity: string; image: string | null; description: string; tags: string[] };
export type Piece = { id: string; name: string; image: string | null; set2: { description: string } | null; set4: { description: string } | null; set6: { description: string } | null };
export type Modifier = {
  id: string; description: string; god_type?: string; add_cost_value?: number; is_sortie?: boolean;
  target_card_category: string[]; target_card_cost_min: number; target_card_cost_max: number;
  target_card_include_talent?: string[]; target_card_exclude_talent?: string[]; target_link_base_class_define_id: string[];
  slot_type_id?: string; slot_type?: { name: string }; slot_add_cost?: number; slot_add_cost_mathsign?: string;
  slot_add_card_talent_details?: Card["talent"];
};
export type Catalog = {
  characters: BuilderCharacter[]; cards: BuilderCard[]; relics: Relic[]; pieces: Piece[]; sparks: Modifier[]; eidolons: Modifier[];
  partners: { id: string; description: string; card: Card }[];
  combinations: { card_category: string; slot_type_0: string; slot_type_1: string; name: string; artwork: string | null }[];
};
export type CardSelection = { id: string; s: string[]; e: string[] };
export type Deck = {
  id: string; name: string; combatantId: string; partnerId: string | null; cardIds: CardSelection[];
  relics: { weapon: string | null; armor: string | null; accessory: string | null };
  pieceSets: { id: string; effectCount: number }[]; ptLimit: number; savedAt: number;
};
