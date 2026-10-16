import { createDecipheriv, createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { inspectAsset, walkFiles } from "./audit-reference-assets.mjs";
import { assetUrl, copyAsset, createAssetResolver } from "./asset-paths.mjs";

const KEY = "2egkWEkLvR9idARLvjqfJdWKfR24HJgY"; // E7BOT bundle, offline import only.

export function decodeSnapshot(payload, key) {
  let input;
  try { input = JSON.parse(payload); } catch { throw new Error("Invalid snapshot JSON"); }
  if (!input?.encrypted || typeof input.data !== "string") throw new Error("Invalid encrypted snapshot envelope");
  const bytes = Buffer.from(input.data, "base64");
  if (bytes.length < 32) throw new Error("Invalid encrypted payload length");
  try {
    const decipher = createDecipheriv("aes-256-cbc", Buffer.from(key.padEnd(32, "0").slice(0, 32)), bytes.subarray(0, 16));
    const result = JSON.parse(Buffer.concat([decipher.update(bytes.subarray(16)), decipher.final()]).toString("utf8"));
    if (result.code !== 0 || !result.data) throw new Error("Snapshot schema invalid");
    return result;
  } catch (error) { throw new Error(`Cannot decrypt snapshot: ${error.message}`); }
}

const source = (id, file) => ({ source: "e7bot", sourceId: String(id), sourceFile: file });

export function normalizeCharacters(records) {
  if (!Array.isArray(records)) throw new Error("Characters data must be an array");
  const result = records.map((record) => {
    if (!record.id || !record.name || !["CHAR_COMBATANT", "CHAR_SUPPORTER"].includes(record.char_type)) throw new Error("Invalid character record");
    if (!Number.isInteger(Number(record.rarity)) || Number(record.rarity) < 1) throw new Error(`Invalid rarity for character ${record.id}`);
    return {
      id: String(record.id), name: record.name, names: record.names ?? {},
      kind: record.char_type === "CHAR_COMBATANT" ? "combatant" : "supporter",
      job: record.job ?? "", ego: record.ego ?? "", rarity: Number(record.rarity),
      portrait: assetUrl(`api/assets/file/czn/data/face/character/portrait_character_crop_half_${record.model || record.id}.webp`, record.char_type === "CHAR_COMBATANT" ? "combatant" : "supporter"),
      color: record.color ?? "", ...source(record.id, "api/czn/characters/list.html"),
    };
  });
  if (new Set(result.map((item) => item.id)).size !== result.length) throw new Error("Duplicate character ID");
  return result;
}

function normalizeCard(card, nested = false) {
  if (!card?.id || !card?.name) throw new Error("Invalid card record");
  if (!Number.isInteger(Number(card.cost)) || card.cost === undefined || Number(card.cost) < -1) throw new Error(`Invalid cost for card ${card.id}`);
  if (typeof card.desc_display !== "string" || typeof card.card_category !== "string" || typeof card.rarity !== "string") throw new Error(`Invalid card description/category/rarity for ${card.id}`);
  if ((!nested && !Array.isArray(card.r_spark_cards)) || (card.r_spark_cards !== undefined && !Array.isArray(card.r_spark_cards)) || (card.talent !== undefined && !Array.isArray(card.talent)) || (card.tooltips !== undefined && !Array.isArray(card.tooltips))) throw new Error(`Invalid card variants/talent/tooltips for ${card.id}`);
  const art = card.sct_name ? assetUrl(`api/assets/file/czn/data/card_illustration/${card.sct_name}.webp`) : null;
  const video = card.animation && art ? art.replace(/\.webp$/, ".webm") : null;
  return {
    id: String(card.id), name: card.name, cost: Number(card.cost), description: card.desc_display,
    category: card.card_category, rarity: card.rarity, artwork: art, video,
    artKey: card.sct_name ?? "", sort: card.sort ?? "", egoType: card.ego_type ?? "",
    talent: (card.talent ?? []).map(({ id, title, desc }) => ({ id, title, desc })),
    tooltips: (card.tooltips ?? []).map(({ id, title, desc }) => ({ id, title, desc })),
    variants: (card.r_spark_cards ?? []).map((variant) => normalizeCard(variant, true)),
    sourceId: String(card.id),
  };
}

export function normalizeDetail(record) {
  if (!/^\d+$/.test(String(record?.id)) || !record.name || !record.combatant) throw new Error("Unsupported detail schema");
  const combatant = record.combatant;
  for (const key of ["start_cards", "spark_cards", "combatant_limit_breaks", "potential_target_cards"]) if (!Array.isArray(combatant[key])) throw new Error(`Missing or invalid combatant.${key}`);
  if (!Array.isArray(record.potential_nodes)) throw new Error("Missing or invalid potential_nodes");
  if (!combatant.collapse_skill_card || !combatant.collapse_passive) throw new Error("Missing collapse skill/passive");
  if (!Array.isArray(combatant.collapse_passive.collapse_cards)) throw new Error("Missing collapse_cards");
  if (!Number.isInteger(Number(record.rarity)) || Number(record.rarity) < 1) throw new Error("Invalid detail rarity");
  const result = {
    id: String(record.id), name: record.name, names: record.names ?? {}, job: record.job, ego: record.ego,
    rarity: Number(record.rarity), color: record.color,
    info: combatant.combatant_info ?? {},
    startCards: combatant.start_cards.map((card) => normalizeCard(card)),
    sparkCards: combatant.spark_cards.map((card) => normalizeCard(card)),
    collapseSkillCard: combatant.collapse_skill_card ? normalizeCard(combatant.collapse_skill_card) : null,
    collapseCards: combatant.collapse_passive.collapse_cards.map((card) => normalizeCard(card)),
    collapsePassive: combatant.collapse_passive ?? null,
    manifestEgo: combatant.combatant_limit_breaks ?? [],
    potentialNodes: record.potential_nodes ?? [],
    potentialTargetCards: combatant.potential_target_cards.map((card) => normalizeCard(card)),
    potentialTargetLinkCardId: combatant.potential_target_link_card_id ?? null,
    potentialTargetLinkCardIds: [...new Set((combatant.potential_target_link_card_id ?? "").replace(/^\[|\]$/g, "").split(",").map(id => id.trim()).filter(Boolean))],
    ...source(record.id, `api/czn/characters/${record.id}.html`),
  };
  const ids = new Set();
  function visit(card) { if (ids.has(card.id)) throw new Error(`Duplicate card ID ${card.id}`); ids.add(card.id); card.variants.forEach(visit); }
  [...result.startCards, ...result.sparkCards, ...result.potentialTargetCards, ...result.collapseCards, ...(result.collapseSkillCard ? [result.collapseSkillCard] : [])].forEach(visit);
  for (const linkedId of result.potentialTargetLinkCardIds) {
    if (!result.potentialTargetCards.some((card) => card.id === linkedId)) throw new Error(`Broken potential target card reference ${linkedId}`);
  }
  return result;
}

function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function writeJson(path, value) { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`); }

export function importSnapshot(sourceRoot, outputRoot, publicRoot) {
  const inputs = ["api/czn/characters/list.html", "api/czn/characters/1041.html", "api/czn/snapshot/characters/diff.html"];
  const decoded = inputs.map((path) => {
    const bytes = readFileSync(join(sourceRoot, path));
    return { path, sha256: sha256(bytes), value: decodeSnapshot(bytes.toString("utf8"), KEY) };
  });
  const characters = normalizeCharacters(decoded[0].value.data);
  const resolveAssetUrl = createAssetResolver(characters);
  const detail = normalizeDetail(decoded[1].value.data);
  const files = [
    ...walkFiles(join(sourceRoot, "api/assets/file/czn/data")),
    ...walkFiles(join(sourceRoot, "assets")).filter((file) => [".png", ".webp"].includes(extname(file))),
  ].sort();
  const assets = files.map((file) => {
    const sourcePath = relative(sourceRoot, file).replaceAll("\\", "/");
    const localUrl = resolveAssetUrl(sourcePath);
    const bytes = readFileSync(file);
    const inspection = inspectAsset(bytes, extname(file));
    if (inspection.status === "available") {
      copyAsset(file, publicRoot, localUrl);
    }
    return { sourcePath, localUrl, ...inspection, sha256: sha256(bytes) };
  });
  writeJson(join(outputRoot, "characters.json"), characters);
  writeJson(join(outputRoot, "combatant-ids.json"), characters.filter((character) => character.kind === "combatant").map((character) => character.id));
  writeJson(join(outputRoot, "characters/1041.json"), detail);
  writeJson(join(outputRoot, "assets.json"), assets);
  writeJson(join(outputRoot, "source-manifest.json"), { source: "e7bot", files: decoded.map(({ path, sha256 }) => ({ path, sha256 })), diff: decoded[2].value.data });
  return { characters: characters.length, combatants: characters.filter((c) => c.kind === "combatant").length, supporters: characters.filter((c) => c.kind === "supporter").length, assets: assets.length };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  try {
    const result = importSnapshot(resolve(process.argv[2] ?? "docs/wiki.e7bot.top"), resolve(process.argv[3] ?? "data/wiki"), resolve(process.argv[4] ?? "public"));
    console.log(JSON.stringify(result));
  } catch (error) { console.error(error); process.exitCode = 1; }
}
