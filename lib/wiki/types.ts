export type SourceRef = {
  source: "e7bot";
  sourceId: string;
  sourceFile: string;
  sourceUpdatedAt?: string;
};

export type CharacterSummary = SourceRef & {
  id: string;
  name: string;
  names: Record<string, string>;
  kind: "combatant" | "supporter";
  job: string;
  ego: string;
  rarity: number;
  portrait: string;
  color: string;
};

export type Card = {
  id: string;
  name: string;
  cost: number;
  description: string;
  category: string;
  rarity: string;
  artwork: string | null;
  video: string | null;
  artKey: string;
  sort: string;
  egoType: string;
  talent: { id: string; title: string; desc: string }[];
  tooltips: { id: string; title: string; desc: string }[];
  variants: Card[];
  sourceId: string;
};

export type CharacterDetail = SourceRef & {
  id: string;
  name: string;
  names: Record<string, string>;
  job: string;
  ego: string;
  rarity: number;
  color: string;
  info: Record<string, unknown>;
  startCards: Card[];
  sparkCards: Card[];
  collapseSkillCard: Card | null;
  collapseCards: Card[];
  collapsePassive: Record<string, unknown> | null;
  manifestEgo: { id: string; break_level: number; title: string; sub_title: string; desc: string; link_card_id: string }[];
  potentialNodes: { id: string; desc: string; node_level: string; node_num: string; max_level: string; potential_node_type_define?: { main_title?: string; sub_title?: string }; upgrade_nodes: { id: string; desc: string; node_level: string; node_num: string; max_level: string; potential_node_type_define?: { main_title?: string; sub_title?: string } }[] }[];
  potentialTargetCards: Card[];
  potentialTargetLinkCardId: string | null;
  potentialTargetLinkCardIds?: string[];
};

export type AssetRecord = {
  sourcePath: string;
  localUrl: string;
  status: "available" | "missing" | "invalid";
  reason?: string;
  sha256?: string;
};
