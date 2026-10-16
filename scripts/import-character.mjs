import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { decodeSnapshot, normalizeDetail } from "./import-e7bot.mjs";
import { inspectAsset, walkFiles } from "./audit-reference-assets.mjs";
import { assetUrl, copyAsset } from "./asset-paths.mjs";

// Import one saved E7BOT character without replacing the roster or other characters.
export function importCharacter(sourceRoot, id, outputRoot = "data/wiki", publicRoot = "public") {
  if (!/^\d+$/.test(id)) throw new Error("Character ID must be numeric");
  const sourceFile = join(sourceRoot, `api/czn/characters/${id}.html`);
  const envelope = decodeSnapshot(readFileSync(sourceFile, "utf8"), "2egkWEkLvR9idARLvjqfJdWKfR24HJgY");
  if (String(envelope.data.id) !== id) throw new Error("Snapshot character ID does not match requested ID");
  const detail = normalizeDetail(envelope.data);
  detail.sourceFile = relative(process.cwd(), sourceFile).replaceAll("\\", "/");
  const assetRoot = join(sourceRoot, "api/assets/file/czn/data");
  const files = walkFiles(assetRoot);
  let imported = 0;
  for (const file of files) {
    const extension = extname(file).toLowerCase();
    if (![".png", ".webp", ".webm"].includes(extension)) continue;
    if (inspectAsset(readFileSync(file), extension).status !== "available") continue;
    const url = assetUrl(relative(sourceRoot, file));
    copyAsset(file, publicRoot, url);
    imported++;
  }
  const unavailable = [];
  const visit = card => {
    if (card.artwork && !existsSync(join(publicRoot, card.artwork))) {
      unavailable.push(card.artwork);
      card.artwork = null;
    }
    if (card.video && !existsSync(join(publicRoot, card.video))) card.video = null;
    card.variants.forEach(visit);
  };
  [...detail.startCards, ...detail.sparkCards, ...detail.collapseCards, ...detail.potentialTargetCards, ...(detail.collapseSkillCard ? [detail.collapseSkillCard] : [])].forEach(visit);
  const target = join(outputRoot, `characters/${id}.json`);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, `${JSON.stringify(detail, null, 2)}\n`);
  return { id, assets: imported, unavailable: [...new Set(unavailable)] };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  try {
    if (!process.argv[2] || !process.argv[3]) throw new Error("Usage: node scripts/import-character.mjs docs/<slug> <id>");
    console.log(JSON.stringify(importCharacter(process.argv[2], process.argv[3])));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
