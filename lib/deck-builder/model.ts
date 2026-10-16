import type { BuilderCard, CardSelection, Catalog, Deck, Modifier } from "./types";

export const GODS = ["NIHILUM", "DIALLOS", "SECRED", "CIRCEN", "VITOR", "CALIGO"];
export const STORAGE_KEY = "czn_saved_decks";
export const baseId = (id: string) => id.replace(/_(rsp[1-5]|pot|lbk)$/, "");
export const isGod = (modifier: Modifier) => GODS.includes(modifier.god_type ?? "");
export const plainText = (text: string) => text.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ");

export function cardGroup(card: BuilderCard, combatantId: string): string {
  if (card.ownerId === combatantId) return "Combatant";
  if (card.tags.includes("neutral")) return "Neutral";
  if (card.tags.includes("monster_card")) return "Monster";
  if (card.tags.includes("taboo")) return "Curse";
  if (card.chaos) return "Event";
  if (card.sort === "SORT_EIDOLON") return "Persona";
  return "Other";
}

export function availableCards(combatantId: string, catalog: Catalog) {
  const job = catalog.characters.find(c => c.id === combatantId)?.job;
  return catalog.cards.filter(card => {
    if (card.ownerId && card.ownerId !== combatantId) return false;
    if (!["CARD_ATK", "CARD_SKILL", "CARD_POWER"].includes(card.category)) return false;
    if (card.talent.some(t => t.id === "TALENT_REMOVE")) return false;
    if (card.jobs.length && (!job || !card.jobs.includes(job))) return false;
    return card.ownerId === combatantId ? ["SORT_START", "SORT_UNIQUE"].includes(card.sort) : cardGroup(card, combatantId) !== "Other";
  });
}

export function initialCards(combatantId: string, catalog: Catalog) {
  return catalog.cards.filter(c => c.ownerId === combatantId && /^c_\d+_(srt|uni)\d+$/.test(c.id))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

export function createDeck(combatantId = "", catalog: Catalog): Deck {
  const character = catalog.characters.find(c => c.id === combatantId);
  return {
    id: "", name: character ? `${character.name} Deck` : "", combatantId, partnerId: null,
    cardIds: initialCards(combatantId, catalog).map(c => ({ id: c.variantIds.find(id => /_(pot|lbk)$/.test(id)) ?? c.id, s: [], e: [] })),
    relics: { weapon: null, armor: null, accessory: null }, pieceSets: [], ptLimit: 170, savedAt: 0,
  };
}

export function addCard(deck: Deck, card: CardSelection, index = deck.cardIds.length): Deck {
  if (deck.cardIds.length >= 40) throw new Error("A deck can contain at most 40 cards.");
  const cardIds = [...deck.cardIds];
  cardIds.splice(index, 0, { id: card.id, s: [...card.s], e: [...card.e] });
  return { ...deck, cardIds };
}

export function modifierAllowed(mod: Modifier, card: BuilderCard) {
  return !card.tags.includes("taboo") && (!mod.target_card_category.length || mod.target_card_category.includes(card.category))
    && card.cost >= mod.target_card_cost_min && card.cost <= mod.target_card_cost_max
    && (!card.ownerClass || !mod.target_link_base_class_define_id.length || mod.target_link_base_class_define_id.includes(card.ownerClass))
    && (!mod.target_card_include_talent?.length || mod.target_card_include_talent.some(id => card.talent.some(t => t.id === id)))
    && !mod.target_card_exclude_talent?.some(id => card.talent.some(t => t.id === id));
}

export function resolveCard(selection: CardSelection, catalog: Catalog): BuilderCard {
  const base = catalog.cards.find(c => c.id === selection.id);
  if (!base) throw new Error(`Unknown card: ${selection.id}`);
  const persona = base.sort === "SORT_EIDOLON";
  const mods = (persona ? selection.e.map(id => catalog.eidolons.find(m => m.id === id)) : selection.s.map(id => catalog.sparks.find(m => m.id === id))).filter((m): m is Modifier => !!m);
  const adjustment = mods.reduce((sum, m) => sum + (persona ? (m.slot_add_cost ?? 0) * (m.slot_add_cost_mathsign?.startsWith("MATHSIGN_SUBTRACT") ? -1 : 1) : m.add_cost_value ?? 0), 0);
  const combination = persona && mods.length ? catalog.combinations.find(c => c.card_category === base.category && c.slot_type_0 === mods[0].slot_type_id && (c.slot_type_1 || "none") === (mods[1]?.slot_type_id || "none")) : undefined;
  return { ...base, name: combination?.name ?? base.name, artwork: combination?.artwork ?? base.artwork,
    cost: base.cost < 0 ? -1 : Math.max(0, base.cost + adjustment),
    description: [base.description, ...mods.map(m => m.description)].filter(Boolean).join("<br>"),
    talent: [...base.talent, ...mods.flatMap(m => m.slot_add_card_talent_details ?? [])],
  };
}

// Ported from the supplied cznPTUtils bundle. Enhanced cards retain their functional base ID.
export function calculatePT(deck: Deck, catalog: Catalog) {
  const initial = initialCards(deck.combatantId, catalog);
  const remaining = new Map(initial.map(c => [c.id, 1]));
  let originals = 0, copies = 0, neutral = 0, monsterScore = 0, godFlashScore = 0;
  const curseCounts = new Map<string, number>();
  for (const selection of deck.cardIds) {
    const card = catalog.cards.find(c => c.id === selection.id);
    if (!card) continue;
    const group = cardGroup(card, deck.combatantId), base = baseId(card.id);
    if (selection.s.some(id => { const m = catalog.sparks.find(s => s.id === id); return m && isGod(m); }) && ["Combatant", "Neutral", "Monster", "Curse", "Event"].includes(group)) godFlashScore += 20;
    if (group === "Combatant") {
      if ((remaining.get(base) ?? 0) > 0) {
        remaining.set(base, remaining.get(base)! - 1);
        if (/_srt\d+$/.test(base)) originals++;
      } else copies++;
    } else if (["Neutral", "Event", "Curse"].includes(group)) {
      neutral++;
      if (group === "Curse") { const count = (curseCounts.get(base) ?? 0) + 1; curseCounts.set(base, count); if (count > 1) copies++; }
    } else if (group === "Monster") monsterScore += card.rarity === "RARITY_RARE" ? 50 : ["RARITY_LEGEND", "RARITY_UNIQUE"].includes(card.rarity) ? 80 : 20;
  }
  const missingScore = deck.combatantId ? Math.max(0, Math.max(4, initial.filter(c => /_srt\d+$/.test(c.id)).length) - originals) * 20 : 0;
  const copyScore = Math.max(0, copies - 2) * 40, neutralTabooScore = neutral * 20;
  return { total: missingScore + copyScore + neutralTabooScore + monsterScore + godFlashScore, missingScore, copyScore, neutralTabooScore, monsterScore, godFlashScore };
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid deck format.");
  return value as Record<string, unknown>;
}
function idList(value: unknown): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some(id => typeof id !== "string")) throw new Error("Invalid card modifications.");
  return value;
}

export function validateDeck(input: unknown, catalog: Catalog): Deck {
  const value = object(input);
  const character = catalog.characters.find(c => c.kind === "combatant" && c.id === value.combatantId);
  if (!character) throw new Error("Combatant not found in the local catalog.");
  if (typeof value.name !== "string" || !value.name.trim() || value.name.length > 120) throw new Error("Deck name must contain 1–120 characters.");
  if (!Array.isArray(value.cardIds) || value.cardIds.length > 40) throw new Error("A deck can contain at most 40 cards.");
  const allowed = new Set(availableCards(character.id, catalog).map(c => c.id));
  const cardIds = value.cardIds.map(entry => {
    const data = typeof entry === "string" ? { id: entry } : object(entry);
    if (typeof data.id !== "string" || !allowed.has(data.id)) throw new Error(`Unavailable card: ${String(data.id)}`);
    const card = catalog.cards.find(c => c.id === data.id)!;
    const s = idList(data.s), e = idList(data.e), persona = card.sort === "SORT_EIDOLON";
    if (s.length > 2 || e.length > 2 || (persona ? s.length : e.length) || new Set(s).size !== s.length) throw new Error("Invalid card modifications.");
    const sparks = s.map(id => catalog.sparks.find(m => m.id === id));
    if (sparks.filter(m => m && isGod(m)).length > 1 || sparks.filter(m => m && !isGod(m)).length > 1) throw new Error("Choose one god and one normal epiphany per card.");
    for (const mod of [...sparks, ...e.map(id => catalog.eidolons.find(m => m.id === id))]) {
      if (!mod || !modifierAllowed(mod, card)) throw new Error("Incompatible card modification.");
    }
    return { id: data.id, s, e };
  });
  const relicInput = value.relics === undefined ? {} : object(value.relics);
  const relics: Deck["relics"] = { weapon: null, armor: null, accessory: null };
  for (const [key, type] of [["weapon", "EQUIP_WEAPON"], ["armor", "EQUIP_ARMOR"], ["accessory", "EQUIP_ACC"]] as const) {
    const id = relicInput[key];
    if (id != null && !catalog.relics.some(r => r.id === id && r.type === type)) throw new Error("Invalid equipment selection.");
    relics[key] = typeof id === "string" ? id : null;
  }
  if (value.partnerId != null && !catalog.characters.some(c => c.kind === "supporter" && c.id === value.partnerId)) throw new Error("Partner not found.");
  const pieceSets: Deck["pieceSets"] = [];
  if (value.pieceSets !== undefined && !Array.isArray(value.pieceSets)) throw new Error("Invalid memory fragments.");
  for (const raw of (value.pieceSets ?? []) as unknown[]) {
    const p = object(raw), piece = catalog.pieces.find(item => item.id === p.id);
    if (!piece || (p.effectCount !== 2 && p.effectCount !== 4) || !piece[p.effectCount === 2 ? "set2" : "set4"] || pieceSets.some(item => item.id === p.id && item.effectCount === p.effectCount)) throw new Error("Invalid memory fragment combination.");
    pieceSets.push({ id: piece.id, effectCount: Number(p.effectCount) });
  }
  if (pieceSets.reduce((sum, p) => sum + p.effectCount, 0) > 6) throw new Error("Memory fragments cannot exceed six pieces.");
  const ptLimit = value.ptLimit ?? 170;
  if (typeof ptLimit !== "number" || !Number.isInteger(ptLimit) || ptLimit < 0 || ptLimit > 999) throw new Error("Invalid PT limit.");
  return { id: typeof value.id === "string" ? value.id : "", name: value.name.trim(), combatantId: character.id, partnerId: typeof value.partnerId === "string" ? value.partnerId : null, cardIds, relics, pieceSets, ptLimit, savedAt: typeof value.savedAt === "number" && Number.isFinite(value.savedAt) ? value.savedAt : 0 };
}

export function parseDecks(text: string, catalog: Catalog): Deck[] {
  if (text.length > 2_000_000) throw new Error("Backup is too large (maximum 2 MB).");
  const input: unknown = JSON.parse(text);
  if (!Array.isArray(input) || input.length > 500) throw new Error("Expected a JSON array with at most 500 decks.");
  return input.map(value => validateDeck(value, catalog));
}

export function encodeDeck(deck: Deck): string {
  return btoa(encodeURIComponent(JSON.stringify({ v: 4, c: deck.combatantId, d: deck.cardIds, p: deck.partnerId, e: { w: deck.relics.weapon, a: deck.relics.armor, ac: deck.relics.accessory }, ps: deck.pieceSets.map(p => ({ id: p.id, count: p.effectCount })), name: deck.name, ptLimit: deck.ptLimit })));
}

export function decodeDeck(encoded: string, catalog: Catalog): Deck {
  if (encoded.length > 100_000) throw new Error("Share link is too large.");
  const data = object(JSON.parse(decodeURIComponent(atob(encoded))));
  if (data.v !== 3 && data.v !== 4) throw new Error("Unsupported share link version.");
  const relics = data.e ? object(data.e) : {};
  if (data.ps !== undefined && !Array.isArray(data.ps)) throw new Error("Invalid memory fragments.");
  return validateDeck({ combatantId: data.c, cardIds: data.d, partnerId: data.p, name: data.name || "Shared deck", ptLimit: data.ptLimit ?? 170,
    relics: { weapon: relics.w, armor: relics.a, accessory: relics.ac }, pieceSets: ((data.ps ?? []) as unknown[]).map(value => { const p = object(value); return { id: p.id, effectCount: p.count }; }) }, catalog);
}
