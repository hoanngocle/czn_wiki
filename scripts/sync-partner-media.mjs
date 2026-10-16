import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { decodeSnapshot } from "./import-e7bot.mjs";
import { inspectAsset } from "./audit-reference-assets.mjs";

// Names and image URLs were read from Prydwen's Full Image panels on 2026-10-16.
// Explicit aliases reconcile source spelling; gameplay IDs always come from E7BOT.
const observedNames = "akad alcea alyssa anteia aria arwen asteria bria carroty clara daisy douglas eishlen eloise emilie erica eunie gaya itsuku ivy janet kiara licinia lilian marianne marin nakia noel nyx peko priscilla rachel raidel ritochka rosaria ruixiang scarlet serithea solia sophia sylvia tiana tina westmaccot wilhelmina yuri yvonne zatera zeta".split(" ");
const aliases = { Lillian: "lilian", Westmacott: "westmaccot" };
const catalog = JSON.parse(readFileSync("data/wiki/partners.json", "utf8"));
const result = {};
mkdirSync("public/assets/partner/full", { recursive: true });
mkdirSync("public/assets/partner/passive", { recursive: true });
async function download(url, local, optional = false) {
  const path = join("public", local);
  if (existsSync(path) && inspectAsset(readFileSync(path), ".webp").status !== "available") throw new Error(`Invalid local image: ${path}`);
  if (!existsSync(path)) {
    const response = await fetch(url);
    if (optional && response.status === 404) return null;
    if (!response.ok) throw new Error(`${response.status}: ${url}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const check = inspectAsset(bytes, ".webp");
    if (check.status !== "available") throw new Error(`Invalid image ${url}: ${JSON.stringify(check)}`);
    writeFileSync(path, bytes);
  }
  return local;
}
for (let offset = 0; offset < catalog.characters.length; offset += 5) {
  await Promise.all(catalog.characters.slice(offset, offset + 5).map(async partner => {
    const slug = aliases[partner.name] ?? partner.name.toLowerCase();
    if (!observedNames.includes(slug)) throw new Error(`No observed source image for ${partner.name}`);
    const raw = decodeSnapshot(readFileSync(`docs/partner/current/api/czn/characters/partner/${partner.id}.html`, "utf8"), "2egkWEkLvR9idARLvjqfJdWKfR24HJgY").data;
    const artworkSourceUrl = `https://cdn.prydwen.gg/images/chaos/partners/${slug}_full.webp`;
    const iconUrl = `https://wiki.e7bot.top/api/assets/file/czn/data/${raw.char_partner.tactic_passive_icon}.webp`;
    result[partner.id] = {
      artwork: await download(artworkSourceUrl, `/assets/partner/full/${partner.id}.webp`, true),
      artworkSourceUrl,
      passiveIcon: await download(iconUrl, `/assets/partner/passive/${partner.id}.webp`, true),
      passiveIconSourceUrl: iconUrl,
      sourceUrl: "https://www.prydwen.gg/chaos-zero-nightmare/partners",
      checkedAt: "2026-10-16",
    };
  }));
}
writeFileSync("data/wiki/partners/media.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ partners: Object.keys(result).length, fullArt: Object.values(result).filter(item => item.artwork).length, unavailableFullArt: Object.entries(result).filter(([, item]) => !item.artwork).map(([id]) => id), passiveIcons: Object.values(result).filter(item => item.passiveIcon).length }));
