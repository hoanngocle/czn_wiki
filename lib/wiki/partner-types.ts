import type { Card, CharacterSummary } from "./types";

export type PartnerSummary = Omit<CharacterSummary, "portrait"> & { portrait: string | null };
export type PartnerStats = { level: number; breakthrough: boolean; attack: number; defense: number; hp: number };
export type PartnerTranslation = {
  profile: string;
  infoValues: string[];
  cardDescription: string;
  terms: Record<string, { title: string; desc: string }>;
  passives: Record<string, { name: string; descriptions: string[] }>;
};
export type PartnerMedia = {
  artwork: string | null;
  artworkSourceUrl: string;
  passiveIcon: string | null;
  sourceUrl: string;
  checkedAt: string;
};
export type PartnerDetail = {
  id: string;
  name: string;
  sourceUrl: string;
  profile: string;
  info: { label: string; value: string }[];
  card: Card | null;
  passives: { level: number; name: string; descriptions: string[] }[];
  stats: PartnerStats[];
};
