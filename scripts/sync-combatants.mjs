import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { decodeSnapshot, normalizeCharacters, normalizeDetail } from "./import-e7bot.mjs";
import { inspectAsset } from "./audit-reference-assets.mjs";
import { applyVideoManifest, collectAnimatedArtKeys, syncCardVideos } from "./card-videos.mjs";
const root = "docs/combatant/current";
const key = "2egkWEkLvR9idARLvjqfJdWKfR24HJgY";
const report = { checkedAt: "2026-10-16", characters: [], unavailable: [] };
async function snapshot(endpoint, path) {
    const response = await fetch(`https://wiki.e7bot.top/api/czn/${endpoint}?lang=en`);
    if (!response.ok)
        throw new Error(`${response.status}: ${endpoint}`);
    const text = await response.text();
    const data = decodeSnapshot(text, key).data;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
    return data;
}
async function asset(sourceUrl, localUrl) {
    const path = join("public", localUrl);
    if (existsSync(path) && inspectAsset(readFileSync(path), ".webp").status === "available")
        return localUrl;
    const response = await fetch(sourceUrl);
    if (response.status === 404) {
        report.unavailable.push({ sourceUrl, localUrl, reason: "HTTP 404" });
        return null;
    }
    if (!response.ok)
        throw new Error(`${response.status}: ${sourceUrl}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (inspectAsset(bytes, ".webp").status !== "available") {
        report.unavailable.push({ sourceUrl, localUrl, reason: "Invalid image" });
        return null;
    }
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, bytes);
    return localUrl;
}
const roster = normalizeCharacters(await snapshot("characters/list", join(root, "api/czn/characters/list.html")));
const combatants = roster.filter(item => item.kind === "combatant");
for (let offset = 0; offset < combatants.length; offset += 6)
    await Promise.all(combatants.slice(offset, offset + 6).map(summary => snapshot(`characters/${summary.id}`, `${root}/api/czn/characters/${summary.id}.html`)));
const animationKeys = collectAnimatedArtKeys(await snapshot("cards/list", `${root}/api/czn/cards/list.html`));
for (const summary of combatants)
    collectAnimatedArtKeys(decodeSnapshot(readFileSync(`${root}/api/czn/characters/${summary.id}.html`, "utf8"), key).data, animationKeys);
const videoManifest = await syncCardVideos(animationKeys);
mkdirSync("data/wiki", { recursive: true });
writeFileSync("data/wiki/card-videos.json", JSON.stringify(videoManifest, null, 2) + "\n");
report.unavailable.push(...Object.values(videoManifest.cards).filter(item => item.status !== "available"));
for (const summary of combatants) {
    const sourceFile = `${root}/api/czn/characters/${summary.id}.html`;
    const raw = decodeSnapshot(readFileSync(sourceFile, "utf8"), key).data;
    const detail = normalizeDetail(raw);
    detail.sourceFile = sourceFile;
    const allCards = [];
    const visit = card => { allCards.push(card); card.variants.forEach(visit); };
    [...detail.startCards, ...detail.sparkCards, ...detail.collapseCards, ...detail.potentialTargetCards, ...(detail.collapseSkillCard ? [detail.collapseSkillCard] : [])].forEach(visit);
    const arts = [...new Set(allCards.filter(card => card.artwork).map(card => card.artKey))];
    const paths = new Map();
    for (let offset = 0; offset < arts.length; offset += 6)
        await Promise.all(arts.slice(offset, offset + 6).map(async (art) => paths.set(art, await asset(`https://wiki.e7bot.top/api/assets/file/czn/data/card_illustration/${art}.webp`, `/assets/card/${art}.webp`))));
    for (const card of allCards) {
        if (card.artwork)
            card.artwork = paths.get(card.artKey);
    }
    applyVideoManifest(detail, videoManifest);
    await asset(`https://wiki.e7bot.top/api/assets/file/czn/data/face/character/${summary.portrait.split('/').at(-1)}`, summary.portrait);
    mkdirSync("data/wiki/characters", { recursive: true });
    // Existing four reviewed kits are audited separately before replacing their authored translations.
    const target = ["1041", "1033", "1052", "30075"].includes(summary.id) ? `${root}/normalized/${summary.id}.json` : `data/wiki/characters/${summary.id}.json`;
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, JSON.stringify(detail, null, 2) + "\n");
    report.characters.push({ id: summary.id, name: summary.name, cards: allCards.length });
    console.log(`${summary.id} ${summary.name}: ${allCards.length} cards`);
}
writeFileSync(`${root}/roster.json`, JSON.stringify(roster, null, 2) + "\n");
writeFileSync(`${root}/sync-report.json`, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ combatants: combatants.length, unavailable: report.unavailable.length }));
