import type { Card, CharacterDetail } from "./types";

export type GuideText = { en: string; vi: string };
export type GuideImageAsset = { src: string; width: number; height: number };
export type CardReview = { rating?: number; review?: GuideText };
export type DeckCardReference = { cardId: string; count: number; draw?: number; costDelta?: number; effects?: GuideText };
type Recommendation = { name: string; score: string; note: GuideText };
export type CharacterGuide = {
  characterId: string;
  name: string;
  identity: string[];
  subtitle: GuideText;
  portrait: string;
  source: { name: string; url: string; updated: string; files: string[]; note?: GuideText; kind?: "kit" | "guide" };
  images: Record<string, GuideImageAsset>;
  extraCards: Card[];
  generatedCardIds?: string[];
  epiphanyReviews: Record<string, CardReview>;
  review: {
    intro: GuideText;
    profile: { label: GuideText; score: number }[];
    pros: GuideText[];
    cons: GuideText[];
    mechanics: { title: GuideText | string; body: GuideText; cardId: string }[];
  };
  cardAdvice: { cardId: string; ratings: number[]; preferred: string; note: GuideText; divine: GuideText }[];
  partners: Recommendation[];
  fragments: Recommendation[];
  stats: { name: GuideText; value: GuideText }[];
  buildAdvice?: { title: GuideText; body: GuideText }[];
  critNote: GuideText;
  potentialIntro: GuideText;
  potentialAdvice: { name: string; note: GuideText }[];
  equipment: { name: GuideText; weapons: string[]; armor: string[]; trinkets: string[]; note?: GuideText }[];
  seasonal: { name: GuideText; note: GuideText }[];
  dupes: Recommendation[];
  decks: { name: GuideText; role: GuideText; partner: string; cards: DeckCardReference[]; gear: string[]; fragments: string[]; fragmentPieces?: number[]; code?: string; note: GuideText }[];
  synergies: { name: string; note: GuideText }[];
  teams: { name: GuideText; members: string[]; steps: GuideText[] }[];
};

type CardAdviceGuide = Pick<CharacterGuide, "cardAdvice" | "epiphanyReviews">;

export function moveCardAdviceToReviews<T extends CardAdviceGuide>(guide: T, detailedReviews: Record<string, CardReview> = {}): T {
  const migratedReviews: Record<string, CardReview> = {};
  for (const advice of guide.cardAdvice) {
    migratedReviews[advice.cardId] = {
      review: {
        en: `${advice.note.en} Neutral / Divine: ${advice.divine.en}`,
        vi: `${advice.note.vi} Trung lập / Thần thánh: ${advice.divine.vi}`,
      },
    };
    advice.ratings.forEach((rating, index) => {
      migratedReviews[`${advice.cardId}_rsp${index + 1}`] = { rating };
    });
  }
  return {
    ...guide,
    cardAdvice: [],
    epiphanyReviews: { ...migratedReviews, ...guide.epiphanyReviews, ...detailedReviews },
  };
}

export function indexCharacterCards(detail: CharacterDetail, extraCards: Card[] = []) {
  const cards = new Map<string, Card>();
  const visit = (card: Card) => { cards.set(card.id, card); card.variants.forEach(visit); };
  [...detail.startCards, ...detail.sparkCards, ...(detail.generatedCards ?? []), ...detail.collapseCards, ...detail.potentialTargetCards, ...extraCards].forEach(visit);
  if (detail.egoSkillCard) visit(detail.egoSkillCard);
  if (detail.collapseSkillCard) visit(detail.collapseSkillCard);
  return cards;
}

export function resolveDeckCard(cards: Map<string, Card>, entry: DeckCardReference, vietnamese: boolean): Card {
  const source = cards.get(entry.cardId);
  if (!source) throw new Error(`Unknown guide card: ${entry.cardId}`);
  const suffix = entry.cardId.match(/_rsp([1-5])$/)?.[1];
  return {
    ...source,
    name: `${source.name}${suffix ? ` ${["I", "II", "III", "IV", "V"][Number(suffix) - 1]}` : ""}`,
    cost: source.cost === -1 ? -1 : Math.max(0, source.cost + (entry.costDelta ?? 0)),
    description: source.description + (entry.draw ? `<br>${vietnamese ? "Rút" : "Draw"} <color_orange>${entry.draw}</>${vietnamese ? " lá" : ""}` : "") + (entry.effects ? `<br>${entry.effects[vietnamese ? "vi" : "en"]}` : ""),
  };
}
