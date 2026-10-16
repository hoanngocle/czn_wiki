import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { decodeSnapshot, normalizeCharacters } from "./import-e7bot.mjs";
import { inspectAsset, walkFiles } from "./audit-reference-assets.mjs";
import { copyAsset, createAssetResolver } from "./asset-paths.mjs";

const root = resolve("docs/deck-builder/wiki.e7bot.top");
const read = (file) => {
  const raw = readFileSync(join(root, "api/czn", file), "utf8");
  const value = JSON.parse(raw);
  return value.encrypted ? decodeSnapshot(raw, "2egkWEkLvR9idARLvjqfJdWKfR24HJgY").data : value.data ?? value;
};
const summaries = normalizeCharacters(read("characters/list.html"));
const assetUrl = createAssetResolver(summaries);
let copied = 0;
for (const file of walkFiles(join(root, "api/assets/file/czn/data"))) {
  const relative = file.slice(root.length + 1).replaceAll("\\", "/");
  const url = assetUrl(relative);
  const target = join("public", url);
  if (inspectAsset(readFileSync(file), file.slice(file.lastIndexOf("."))).status === "available") {
    const existed = existsSync(target);
    copyAsset(file, "public", url);
    if (!existed) copied++;
  }
}
const asset = (path) => { const url = assetUrl(path); return existsSync(join("public", url)) ? url : null; };
const image = (path) => asset(`api/assets/file/czn/data/${path}.webp`);
const normalize = (card) => ({
  id: card.id, name: card.name, cost: card.cost ?? -1, description: card.desc_display,
  category: card.card_category, rarity: card.rarity, sort: card.sort, artKey: card.sct_name,
  egoType: card.ego_type, artwork: image(`card_illustration/${card.sct_name}`),
  video: card.animation ? asset(`api/assets/file/czn/data/card_illustration/${card.sct_name}.webm`) : null,
  talent: card.talent ?? [], tooltips: card.tooltips ?? [], variants: [], sourceId: card.id,
  ownerId: card.base_combatant?.id ?? null, ownerClass: card.base_combatant?.base_class_define_id, jobs: card.ownable_job ?? [], tags: card.reward_tag ?? [],
  chaos: card.chaos_name || card.chaos_id || "", variantIds: (card.r_spark_cards ?? []).map(c => c.id),
});
const characters = summaries.map(c => ({ ...c, portrait: asset(c.portrait) }));
const partners = read("characters/partner/list/detail.html");
const cards = read("cards/list.html").map(normalize);
const eidolon = read("eidolon-card-define/list.html");
const catalog = {
  characters,
  partners: partners.map(p => ({ id: p.id, description: p.partner_passives.map(s => s.description).join("<br><br>"), card: normalize(p.partner_card) })),
  cards,
  relics: read("relics/list.html").filter(r => ["EQUIP_WEAPON", "EQUIP_ARMOR", "EQUIP_ACC"].includes(r.relic_type)).map(r => ({ id: r.id, name: r.name, rarity: r.rarity, type: r.relic_type, image: image(`item/${r.icon_name}`), description: r.skills.map(s => s.description).join("<br>"), tags: r.reward_tag })),
  pieces: read("piece-set-options/list.html").map(p => ({ ...p, image: image(p.icon.startsWith("piece/") ? p.icon : `item/${p.icon}`) })),
  sparks: read("r-sparks/list.json"), eidolons: eidolon.rewards,
  combinations: eidolon.illust_combs.map(c => ({ ...c, artwork: image(`card_illustration/${c.change_to_sct_name}`) })),
};
mkdirSync("data/deck-builder", { recursive: true });
writeFileSync("data/deck-builder/catalog.json", JSON.stringify(catalog));
writeFileSync("data/deck-builder/source.json", JSON.stringify({ source: "docs/deck-builder/wiki.e7bot.top", cards: cards.length, characters: characters.length, missingArtwork: cards.filter(c => !c.artwork).length }, null, 2) + "\n");
console.log(JSON.stringify({ characters: characters.length, cards: cards.length, copiedAssets: copied, missingArtwork: cards.filter(c => !c.artwork).length }));
