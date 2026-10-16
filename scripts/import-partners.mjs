import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { decodeSnapshot, normalizeCharacters } from "./import-e7bot.mjs";
import { assetUrl, copyAsset } from "./asset-paths.mjs";
import { inspectAsset } from "./audit-reference-assets.mjs";

const key = "2egkWEkLvR9idARLvjqfJdWKfR24HJgY"; // Public offline snapshot format.
const sourceUrl = id => `https://wiki.e7bot.top/#/czn/partner/${id}`;
const readSnapshot = path => decodeSnapshot(readFileSync(path, "utf8"), key).data;
const statNames = { S_ATK_INC_ADD_OUT: "attack", S_DEF_INC_ADD_OUT: "defense", S_HP_INC_ADD_OUT: "hp" };
// The source uses $term#rank$ references; the rendered label is just the term.
const displayText = text => String(text ?? "").replace(/\$([^$]+)\$/g, "$1").replace(/#\d+\b/g, "");
const displayPassives = passives => passives.map(passive => ({ ...passive, descriptions: passive.descriptions.map(displayText) }));

function snapshotStats(record) {
  return record.partner_levels.flatMap(({ level }) => [false, true].map(breakthrough => {
    const stats = { level, breakthrough, attack: record.char_partner.default_atk_add ?? 0, defense: record.char_partner.default_def_add ?? 0, hp: record.char_partner.default_hp_add ?? 0 };
    const increments = [...record.partner_levels.filter(row => row.level <= level), ...record.partner_ascends.filter(row => row.ascend * 10 < level || (row.ascend * 10 === level && breakthrough))];
    for (const row of increments) for (let slot = 1; slot <= 3; slot++) {
      const name = statNames[row[`stat${slot}_link_stat_list_id`]];
      if (name) stats[name] += Number(row[`stat${slot}_value`] ?? 0);
    }
    return stats;
  }));
}

function snapshotDetail(record) {
  const info = record.supporter_info ?? {};
  const passives = [...new Set(record.partner_passives.map(p => p.level))].sort((a, b) => a - b).map(level => {
    const entries = record.partner_passives.filter(p => p.level === level);
    return { level, name: entries[0].name, descriptions: entries.map(p => p.outgame_description || p.description) };
  });
  return {
    id: String(record.id), name: record.name, sourceUrl: sourceUrl(record.id), profile: info.background_text ?? "",
    info: [
      { label: "Race Type", value: info.race_type },
      { label: "Birthday", value: [info.birth_month, info.birth_day].filter(Boolean).join(" ") },
      { label: "Specialty", value: info.specialty },
      { label: "CV (JP)", value: info.cv_ja },
      { label: "CV (KR)", value: info.cv_ko },
      { label: "CV (EN)", value: info.cv_en },
    ].filter(item => item.value && item.value !== "Not included"),
    card: record.partner_card, passives, stats: snapshotStats(record),
  };
}

// Only copies verified local files. Unavailable artwork remains null, never a broken URL.
export function importPartners(sourceRoot = "docs/partner/current", outputRoot = "data/wiki", publicRoot = "public") {
  const roster = normalizeCharacters(readSnapshot(join(sourceRoot, "api/czn/characters/list.html"))).filter(c => c.kind === "supporter");
  function image(sourcePath, kind) {
    if (!sourcePath) return null;
    const pathname = sourcePath.startsWith("http") ? new URL(sourcePath).pathname : sourcePath;
    const cleanPath = pathname.replace(/^\//, "");
    const url = assetUrl(pathname, kind);
    const name = basename(cleanPath);
    const candidates = [
      join(sourceRoot, cleanPath), join(sourceRoot, "extracted/assets", name),
      join(sourceRoot, "api/assets/file/czn/data/face/character", name),
      join(sourceRoot, "api/assets/file/czn/data/card_illustration", name),
      join("public", url),
    ];
    const source = candidates.find(path => existsSync(path) && inspectAsset(readFileSync(path), extname(path)).status === "available");
    if (!source) return null;
    copyAsset(source, publicRoot, url);
    return url;
  }
  function card(raw, id) {
    if (!raw?.name) return null;
    const artwork = image(raw.sct_name ? `api/assets/file/czn/data/card_illustration/${raw.sct_name}.webp` : raw.image, "supporter");
    return {
      id: raw.id ?? `p_${id}`, name: raw.name, cost: Number(raw.cost ?? 0),
      description: displayText(raw.desc_display ?? raw.description), category: raw.card_category ?? "CARD_SKILL",
      rarity: raw.rarity ?? "RARITY_COMMON", artwork, video: null,
      artKey: raw.sct_name ?? `support_${id}_01`, sort: "SORT_SUPPORT", egoType: raw.ego_type ?? "EGO_OWNER",
      talent: raw.talent ?? [], tooltips: raw.tooltips ?? [], variants: [], sourceId: raw.id ?? `p_${id}`,
    };
  }
  const characters = roster.map(character => ({ ...character, portrait: image(character.portrait, "supporter") }));
  const details = {};
  const extractedRoot = join(sourceRoot, "extracted");
  if (existsSync(extractedRoot)) for (const file of readdirSync(extractedRoot).filter(name => /^\d+\.json$/.test(name))) {
    const raw = JSON.parse(readFileSync(join(extractedRoot, file), "utf8"));
    const summary = characters.find(c => c.id === raw.id);
    if (!summary || raw.name !== summary.name || file !== `${raw.id}.json`) throw new Error(`Partner capture identity mismatch: ${file}`);
    if (!Array.isArray(raw.passives) || !Array.isArray(raw.stats)) throw new Error(`Incomplete partner capture: ${file}`);
    details[raw.id] = { id: raw.id, name: raw.name, sourceUrl: sourceUrl(raw.id), profile: displayText(raw.profile), info: raw.info ?? [], card: card(raw.card, raw.id), passives: displayPassives(raw.passives), stats: raw.stats };
  }
  // Full local snapshots take priority over browser captures of selected levels.
  for (const summary of characters) {
    const path = join(sourceRoot, `api/czn/characters/partner/${summary.id}.html`);
    if (!existsSync(path)) continue;
    const record = readSnapshot(path);
    if (String(record.id) !== summary.id || record.char_type !== "CHAR_SUPPORTER") throw new Error(`Invalid partner snapshot: ${summary.id}`);
    const detail = snapshotDetail(record);
    details[summary.id] = { ...detail, profile: displayText(detail.profile), passives: displayPassives(detail.passives), card: card(detail.card, summary.id) };
  }
  mkdirSync(outputRoot, { recursive: true });
  writeFileSync(join(outputRoot, "partners.json"), `${JSON.stringify({ characters, details }, null, 2)}\n`);
  return { partners: characters.length, details: Object.keys(details).length, missingPortraits: characters.filter(c => !c.portrait).map(c => c.id), missingArtwork: Object.values(details).filter(d => !d.card?.artwork).map(d => d.id) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  try { console.log(JSON.stringify(importPartners(process.argv[2], process.argv[3], process.argv[4]))); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
