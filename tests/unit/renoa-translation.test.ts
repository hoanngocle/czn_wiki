import { expect, it } from "vitest";
import original from "../../data/wiki/characters/1041.json";
import { getCharacterDetail } from "../../lib/wiki/repository";
import { translateCharacterDetail } from "../../lib/wiki/translation";
import type { Card, CharacterDetail } from "../../lib/wiki/types";

function allCards(detail: CharacterDetail): Card[] {
  const flatten = (card: Card): Card[] => [card, ...card.variants.flatMap(flatten)];
  return [...detail.startCards, ...detail.sparkCards, ...detail.collapseCards, ...detail.potentialTargetCards, ...(detail.collapseSkillCard ? [detail.collapseSkillCard] : [])].flatMap(flatten);
}

it("translates every Renoa card and variant without changing mechanics or protected terms", () => {
  const source = allCards(original as CharacterDetail);
  const translated = allCards(translateCharacterDetail(getCharacterDetail("1041")!));
  expect(translated).toHaveLength(source.length);
  for (const [index, card] of translated.entries()) {
    const before = source[index];
    expect(card.description, card.id).not.toBe(before.description);
    expect([card.id, card.name, card.category, card.cost]).toEqual([before.id, before.name, before.category, before.cost]);
    expect(card.description.match(/\d+/g)?.sort(), card.id).toEqual(before.description.match(/\d+/g)?.sort());
    for (const token of before.description.matchAll(/<u>(.*?)<\/u>/g)) expect(card.description, card.id).toContain(`<u>${token[1]}</u>`);
    for (const [termIndex, term] of [...card.talent, ...card.tooltips].entries()) {
      const sourceTerm = [...before.talent, ...before.tooltips][termIndex];
      expect([term.id, term.title]).toEqual([sourceTerm.id, sourceTerm.title]);
      expect(term.desc, term.id).not.toBe(sourceTerm.desc);
    }
  }
  expect(original.startCards[0].description).toBe("<color_orange>100%</> Damage");
  expect(getCharacterDetail("1041")!.startCards[0].description).toBe("<color_orange>100%</> Damage");
});

it("translates Manifest Ego and every Potential upgrade while preserving names and values", () => {
  const translated = translateCharacterDetail(original as CharacterDetail);
  for (const [index, level] of translated.manifestEgo.entries()) {
    const before = original.manifestEgo[index];
    expect(level.desc, level.id).not.toBe(before.desc);
    expect({ ...level, desc: before.desc }).toEqual(before);
    expect(level.desc.match(/\d+(?:\.\d+)?/g)?.sort()).toEqual(before.desc.match(/\d+(?:\.\d+)?/g)?.sort());
    for (const token of before.desc.matchAll(/<u>(.*?)<\/u>/g)) expect(level.desc).toContain(`<u>${token[1]}</u>`);
  }
  const sourceNodes = original.potentialNodes.flatMap(node => [node, ...node.upgrade_nodes]);
  const translatedNodes = translated.potentialNodes.flatMap(node => [node, ...node.upgrade_nodes]);
  expect(translatedNodes).toHaveLength(sourceNodes.length);
  for (const [index, node] of translatedNodes.entries()) {
    const before = sourceNodes[index];
    expect(node.desc, node.id).not.toBe(before.desc);
    expect({ ...node, desc: before.desc, upgrade_nodes: [] }).toEqual({ ...before, upgrade_nodes: [] });
    expect(node.desc.match(/\d+(?:\.\d+)?/g)?.sort()).toEqual(before.desc.match(/\d+(?:\.\d+)?/g)?.sort());
    for (const token of before.desc.matchAll(/<u>(.*?)<\/u>/g)) expect(node.desc).toContain(`<u>${token[1]}</u>`);
  }
  expect(original.manifestEgo[1].desc).toContain("Cards created");
  expect(original.potentialNodes[1].upgrade_nodes[14].desc).toContain("Increase Damage");
});
