import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { decodeSnapshot } from "./import-e7bot.mjs";
import { inspectAsset } from "./audit-reference-assets.mjs";
import { assetUrl, copyAsset } from "./asset-paths.mjs";

const root = "docs/relic";
for (const rarity of ["common", "rare", "unique", "legend"]) {
  const path = `api/assets/file/czn/data/rarity/bg_equipment_rarity_${rarity}.webp`;
  const source = join(root, path);
  if (inspectAsset(readFileSync(source), ".webp").status !== "available") throw new Error(`Invalid rarity background: ${rarity}`);
  copyAsset(source, "public", assetUrl(path));
}
const records = decodeSnapshot(readFileSync(join(root, "api/czn/relics/list.html"), "utf8"), "2egkWEkLvR9idARLvjqfJdWKfR24HJgY").data;
const types = new Set(["EQUIP_WEAPON", "EQUIP_ARMOR", "EQUIP_ACC"]);
function formatEffect(text) {
  // Some source effects omit a closing keyword marker. Preserve the words
  // without guessing which text should be highlighted in those records.
  if ((text.match(/\$/g)?.length ?? 0) % 2) return text.replaceAll("$", "");
  return text.replace(/\$([^$]+)\$/g, "<cc>$1</cc>");
}
const equipment = records.filter(record => types.has(record.relic_type)).map(record => {
  const path = `api/assets/file/czn/data/item/${record.icon_name}.webp`;
  const source = join(root, path);
  const image = assetUrl(path);
  if (inspectAsset(readFileSync(source), ".webp").status !== "available") throw new Error(`Invalid equipment image: ${record.id}`);
  copyAsset(source, "public", image);
  return {
    id: record.id, name: record.name, names: record.names,
    type: record.relic_type, rarity: record.rarity, image,
    description: record.skills.map(skill => formatEffect(skill.description)).join("<br>"),
    chaos: record.chaos?.title ?? null,
  };
});
if (new Set(equipment.map(item => item.id)).size !== equipment.length) throw new Error("Duplicate equipment ID");
mkdirSync("data/wiki", { recursive: true });
writeFileSync("data/wiki/equipment.json", JSON.stringify(equipment, null, 2) + "\n");
console.log(`Imported ${equipment.length} equipment records and validated their local artwork.`);
