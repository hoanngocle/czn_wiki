import type { CharacterTranslation } from "../../data/wiki/translations";
import { label } from "./labels";
import type { Card, CharacterDetail } from "./types";

export function translateCard(card: Card, translation?: CharacterTranslation): Card {
  if (!translation) return card;
  const translateTerm = (term: Card["talent"][number]) => translation.terms.find(candidate => candidate.id === term.id && candidate.englishDesc === term.desc)
    ?? translation.terms.find(candidate => candidate.id === term.id && candidate.englishDesc === undefined)
    ?? term;
  return { ...card, description: translation.cards[card.id] ?? card.description,
    talent: card.talent.map(translateTerm), tooltips: card.tooltips.map(translateTerm),
    variants: card.variants.map(variant => translateCard(variant, translation)) };
}

export function translateCharacterDetail(detail: CharacterDetail, translation?: CharacterTranslation): CharacterDetail {
  if (!translation) return detail;
  const translate = (card: Card) => translateCard(card, translation);
  return {
    ...detail,
    startCards: detail.startCards.map(translate), sparkCards: detail.sparkCards.map(translate),
    collapseCards: detail.collapseCards.map(translate), potentialTargetCards: detail.potentialTargetCards.map(translate),
    collapseSkillCard: detail.collapseSkillCard ? translate(detail.collapseSkillCard) : null,
    manifestEgo: detail.manifestEgo.map(level => ({ ...level, title: label(level.title, true), desc: translation.manifestEgo[level.id] ?? level.desc })),
    potentialNodes: detail.potentialNodes.map(node => ({
      ...node,
      potential_node_type_define: node.potential_node_type_define ? { ...node.potential_node_type_define, main_title: label(node.potential_node_type_define.main_title ?? "", true), sub_title: label(node.potential_node_type_define.sub_title ?? "", true) } : undefined,
      desc: translation.potentialNodes[node.id] ?? node.desc,
      upgrade_nodes: node.upgrade_nodes.map(level => ({ ...level, desc: translation.potentialNodes[level.id] ?? level.desc })),
    })),
  };
}
