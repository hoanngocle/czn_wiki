import descriptions from "../../data/wiki/translations/vi/renoa.cards.json";
import glossary from "../../data/wiki/translations/vi/renoa.glossary.json";
import progression from "../../data/wiki/translations/vi/renoa.progression.json";
import type { Card, CharacterDetail } from "./types";

const cardDescriptions: Record<string, string> = descriptions;
const egoDescriptions: Record<string, string> = progression.manifestEgo;
const potentialDescriptions: Record<string, string> = progression.potentialNodes;
const terms = new Map(glossary.terms.map(term => [term.id, term.desc]));

function translateCard(card: Card): Card {
  const translateTerm = (term: Card["talent"][number]) => ({ ...term, desc: terms.get(term.id) ?? term.desc });
  return {
    ...card,
    description: cardDescriptions[card.id] ?? card.description,
    talent: card.talent.map(translateTerm),
    tooltips: card.tooltips.map(translateTerm),
    variants: card.variants.map(translateCard),
  };
}

export function translateCharacterDetail(detail: CharacterDetail): CharacterDetail {
  if (detail.id !== glossary.characterId) return detail;
  return {
    ...detail,
    startCards: detail.startCards.map(translateCard),
    sparkCards: detail.sparkCards.map(translateCard),
    collapseCards: detail.collapseCards.map(translateCard),
    potentialTargetCards: detail.potentialTargetCards.map(translateCard),
    collapseSkillCard: detail.collapseSkillCard ? translateCard(detail.collapseSkillCard) : null,
    manifestEgo: detail.manifestEgo.map(level => ({ ...level, desc: egoDescriptions[level.id] ?? level.desc })),
    potentialNodes: detail.potentialNodes.map(node => ({
      ...node,
      desc: potentialDescriptions[node.id] ?? node.desc,
      upgrade_nodes: node.upgrade_nodes.map(level => ({ ...level, desc: potentialDescriptions[level.id] ?? level.desc })),
    })),
  };
}
