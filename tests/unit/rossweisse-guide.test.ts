import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { characterGuides } from "../../data/wiki/guides";
import { getCharacterDetail, getCombatants } from "../../lib/wiki/repository";
import { indexCharacterCards, resolveDeckCard } from "../../lib/wiki/character-guide";
import { CharacterBuild, CharacterDecks } from "../../components/combatants/CharacterGuide";
import { CharacterGuideContext } from "../../components/combatants/CharacterGuideContext";

it("renders Rossweisse build and playable deck references with exactly three combatants per team", () => {
  const guide = characterGuides.rossweisse;
  expect(guide).toBeDefined();
  const cards = indexCharacterCards(getCharacterDetail("rossweisse")!, guide.extraCards);
  expect(guide.decks.length).toBeGreaterThan(0);
  expect(guide.teams.length).toBeGreaterThan(0);
  const roster = new Set(getCombatants().map(c => c.name));
  for (const team of guide.teams) {
    expect(team.members).toHaveLength(3);
    expect(new Set(team.members).size).toBe(3);
    expect(team.members.filter(name => name === "Rossweisse")).toHaveLength(1);
    for (const name of team.members) expect(roster.has(name), name).toBe(true);
  }
  for (const deck of guide.decks) {
    for (const entry of deck.cards) {
      const card = resolveDeckCard(cards, entry, false);
      expect(card.costLabel).not.toBe("Unactivatable");
      if (card.talent.some(tag => tag.title === "Unique")) expect(entry.count).toBe(1);
    }
  }
  for (const vietnamese of [true, false]) {
    const render = (component: typeof CharacterBuild) => renderToStaticMarkup(createElement(
      CharacterGuideContext.Provider,
      { value: { guide, cards, animationEnabled: false } },
      createElement(component, { vietnamese }),
    ));
    const build = render(CharacterBuild);
    expect(build).toContain(vietnamese ? "Ưu tiên xây dựng" : "Build priorities");
    expect(build).toContain("Sword Tassel");
    const decks = render(CharacterDecks);
    expect(decks).toContain("Mika");
    expect(decks).toContain("Tiphera");
    expect(decks).toContain('data-card-id="rossweisse_srt4_rsp1"');
  }
});
