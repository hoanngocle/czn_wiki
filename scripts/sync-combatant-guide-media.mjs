import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { inspectAsset } from "./audit-reference-assets.mjs";
const sources = JSON.parse(readFileSync("docs/combatant/prydwen/extracted.json", "utf8"));
const catalog = JSON.parse(readFileSync("data/deck-builder/catalog.json", "utf8"));
const roster = JSON.parse(readFileSync("data/wiki/characters.json", "utf8"));
const equipment = JSON.parse(readFileSync("data/wiki/equipment.json", "utf8"));
const result = {};
const unavailable = [];
const clean = name => name.replace(/\s*\[\d-PC\]|\s*\(\d\)| E\d+$/g, "").trim();
const key = name => clean(name).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const cache = new Map();
async function image(url, path) {
    if (cache.has(path))
        return cache.get(path);
    const promise = (async () => { const local = join("public", path); if (!existsSync(local)) {
        const response = await fetch(url);
        if (response.status === 404) {
            unavailable.push({ url, path });
            return null;
        }
        if (!response.ok)
            throw Error(`${response.status}: ${url}`);
        const bytes = Buffer.from(await response.arrayBuffer());
        if (inspectAsset(bytes, extname(path)).status !== "available")
            throw Error(`Invalid image ${url}`);
        mkdirSync(dirname(local), { recursive: true });
        writeFileSync(local, bytes);
    } const meta = await sharp(local).metadata(); return { src: path, width: meta.width, height: meta.height }; })();
    cache.set(path, promise);
    return promise;
}
for (const source of sources) {
    const mapped = {};
    const own = roster.find(c => c.kind === "combatant" && key(c.name) === key(source.name));
    const refs = [source.name, ...source.partners.map(p => p.name), ...source.fragments.flatMap(f => f.sets.map(clean)).filter(n => !n.startsWith("Flex")), ...source.equipment.flatMap(e => Object.values(e.slots).flat()), ...source.synergies.map(s => s.name), ...source.teams.flatMap(t => t.members), ...source.decks.flatMap(d => [d.partner, ...d.equipment, ...d.fragments]).filter(Boolean)];
    for (const name of new Set(refs)) {
        const summary = roster.find(c => key(c.name) === key(name));
        const item = equipment.find(e => key(e.name) === key(name));
        const existing = summary?.portrait ?? item?.image;
        if (existing && existsSync(join("public", existing))) {
            const meta = await sharp(join("public", existing)).metadata();
            mapped[clean(name)] = { src: existing, width: meta.width, height: meta.height };
            continue;
        }
        const observed = source.images.find(i => key(i.alt) === key(name));
        if (!observed) {
            unavailable.push({ name, character: source.name, reason: "No source image" });
            continue;
        }
        let url = observed.src;
        if (url.includes("/_next/image?"))
            url = new URL(url, "https://www.prydwen.gg").searchParams.get("url");
        const suffix = extname(new URL(url).pathname) || ".webp";
        const path = `/assets/item/guide-${createHash("sha256").update(url).digest("hex").slice(0, 12)}${suffix}`;
        const asset = await image(url, path);
        if (asset)
            mapped[clean(name)] = asset;
    }
    const extras = catalog.cards.filter(c => c.ownerId === own.id);
    for (const c of extras) {
        if (!c.artKey)
            continue;
        const path = `/assets/card/${c.artKey}.webp`;
        await image(`https://wiki.e7bot.top/api/assets/file/czn/data/card_illustration/${c.artKey}.webp`, path);
    }
    result[own.id] = mapped;
}
// Neutral cards used in the observed deck examples.
const mappings = JSON.parse(readFileSync("docs/combatant/prydwen/deck-mapping.json", "utf8"));
for (const id of new Set(mappings.flatMap(d => d.entries.filter(e => e.external && e.cardId).map(e => e.cardId)))) {
    const c = catalog.cards.find(c => c.id === id);
    await image(`https://wiki.e7bot.top/api/assets/file/czn/data/card_illustration/${c.artKey}.webp`, `/assets/card/${c.artKey}.webp`);
}
for (const e of mappings.flatMap(d => d.entries.filter(e => !e.cardId && e.name === "Persona"))) {
    await image(e.image, `/assets/card/prydwen-${e.image.split('/').at(-1)}`);
}
mkdirSync("docs/combatant/prydwen", { recursive: true });
writeFileSync("docs/combatant/prydwen/media.json", JSON.stringify(result, null, 2) + "\n");
writeFileSync("docs/combatant/prydwen/media-unavailable.json", JSON.stringify(unavailable, null, 2) + "\n");
console.log(JSON.stringify({ characters: Object.keys(result).length, assets: cache.size, unavailable }));
