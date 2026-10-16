import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { localizePartner } from "../../lib/wiki/partner-localization";
import { getPartnerDetail, getPartnerMedia, getPartners, getPartnerTranslation } from "../../lib/wiki/partners";

const partners = getPartners();
const translationDirectory = join("data", "wiki", "partners", "vi");
const tokens = (text: string, pattern: RegExp) => [...text.matchAll(pattern)].map(match => match[0]).sort();

function expectPreservedMechanics(original: string, translated: string, context: string) {
  expect(translated, context).not.toBe(original);
  expect(translated, context).not.toContain("\uFFFD");
  expect(tokens(translated, /\d+(?:\.\d+)?/g), `${context}: numbers`).toEqual(tokens(original, /\d+(?:\.\d+)?/g));
  expect(tokens(translated, /<[^>]*>/g), `${context}: formatting`).toEqual(tokens(original, /<[^>]*>/g));
}

it("registers one complete Vietnamese translation for every partner", () => {
  expect(partners).toHaveLength(49);
  expect(readdirSync(translationDirectory).filter(file => file.endsWith(".json")).sort()).toEqual(partners.map(partner => `${partner.id}.json`).sort());
  for (const partner of partners) {
    const registered = getPartnerTranslation(partner.id);
    expect(registered, partner.name).toBeDefined();
    expect(registered).toEqual(JSON.parse(readFileSync(join(translationDirectory, `${partner.id}.json`), "utf8")));
  }
});

describe.each(partners)("$name Vietnamese content", partner => {
  it("translates every paragraph and term while preserving mechanics and canonical card metadata", () => {
    const source = getPartnerDetail(partner.id)!;
    const sourceSnapshot = structuredClone(source);
    const translation = getPartnerTranslation(partner.id)!;
    const localized = localizePartner(source, translation);

    expectPreservedMechanics(source.profile, translation.profile, `${partner.name}: profile`);
    expect(translation.infoValues).toHaveLength(source.info.length);
    expect(localized.profile).toBe(translation.profile);
    expect(localized.info.map(item => item.value)).toEqual(translation.infoValues);
    for (const [index, item] of source.info.entries()) {
      if (item.label.startsWith("CV")) expect(localized.info[index].value).toBe(item.value);
    }

    expect(source.card).not.toBeNull();
    expect(localized.card).not.toBeNull();
    const card = source.card!;
    const localizedCard = localized.card!;
    expectPreservedMechanics(card.description, translation.cardDescription, `${partner.name}: card`);
    expect(localizedCard.description).toBe(translation.cardDescription);
    expect({ ...localizedCard, description: card.description, talent: card.talent, tooltips: card.tooltips }).toEqual(card);
    const sourceTerms = [...card.tooltips, ...card.talent];
    const localizedTerms = [...localizedCard.tooltips, ...localizedCard.talent];
    expect(Object.keys(translation.terms).sort()).toEqual([...new Set(sourceTerms.map(term => term.id))].sort());
    expect(localizedTerms).toHaveLength(sourceTerms.length);
    for (const [index, term] of sourceTerms.entries()) {
      const translated = translation.terms[term.id];
      expectPreservedMechanics(term.desc, translated.desc, `${partner.name}: ${term.id}`);
      expect(translated.title.trim()).not.toBe("");
      expect(localizedTerms[index]).toEqual({ ...term, title: translated.title, desc: translated.desc });
    }

    expect(Object.keys(translation.passives).sort()).toEqual(["1", "2", "3", "4", "5"]);
    expect(localized.passives).toHaveLength(source.passives.length);
    for (const [index, passive] of source.passives.entries()) {
      const translated = translation.passives[String(passive.level)];
      expect(translated.name.trim()).not.toBe("");
      expect(translated.name).not.toBe(passive.name);
      expect(translated.descriptions).toHaveLength(passive.descriptions.length);
      passive.descriptions.forEach((paragraph, paragraphIndex) => expectPreservedMechanics(paragraph, translated.descriptions[paragraphIndex], `${partner.name}: passive ${passive.level}/${paragraphIndex}`));
      expect(localized.passives[index]).toEqual({ ...passive, ...translated });
    }

    expect({ ...localized, profile: source.profile, info: source.info, card: source.card, passives: source.passives }).toEqual(source);
    expect(source).toEqual(sourceSnapshot);
  });

  it("records unavailable media explicitly and keeps available artwork local with source provenance", () => {
    const media = getPartnerMedia(partner.id);
    expect(media, partner.name).toBeDefined();
    expect(media!.sourceUrl).toMatch(/^https:\/\//);
    expect(media!.artworkSourceUrl).toMatch(/^https:\/\//);
    expect(media!.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}/);
    for (const asset of [media!.artwork, media!.passiveIcon]) {
      if (asset === null) continue;
      expect(asset, partner.name).toMatch(/^\/assets\//);
      expect(existsSync(join("public", asset!)), `${partner.name}: ${asset}`).toBe(true);
    }
  });
});

it("covers all partner portraits and cards, plus the 37 available full illustrations", () => {
  expect(partners.filter(partner => getPartnerMedia(partner.id)?.artwork !== null)).toHaveLength(37);
  expect(partners.filter(partner => getPartnerMedia(partner.id)?.artwork === null)).toHaveLength(12);
  for (const partner of partners) {
    expect(getPartnerMedia(partner.id)!.passiveIcon, partner.name).toBeNull();
    for (const asset of [partner.portrait, getPartnerDetail(partner.id)!.card!.artwork]) {
      expect(asset, partner.name).toMatch(/^\/assets\//);
      expect(existsSync(join("public", asset!)), `${partner.name}: ${asset}`).toBe(true);
    }
  }
});

it("leaves canonical English data intact when a translation is unavailable", () => {
  const detail = getPartnerDetail("30116")!;
  expect(localizePartner(detail, undefined)).toEqual(detail);
  expect(getPartnerTranslation("missing")).toBeUndefined();
  expect(getPartnerMedia("missing")).toBeUndefined();
});
