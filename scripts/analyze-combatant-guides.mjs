import { readFileSync, writeFileSync } from "node:fs";
const sources = JSON.parse(readFileSync("docs/combatant/prydwen/extracted.json", "utf8"));
const roster = JSON.parse(readFileSync("data/wiki/characters.json", "utf8")).filter(x => x.kind === "combatant" && x.source === "e7bot");
const catalog = JSON.parse(readFileSync("data/deck-builder/catalog.json", "utf8"));
export const key = name => name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const roman = ["I", "II", "III", "IV", "V"];
const drafts = [];
for (const summary of roster) {
    const source = sources.find(x => key(x.name) === key(summary.name));
    if (!source)
        throw Error(summary.name);
    const detail = JSON.parse(readFileSync(`data/wiki/characters/${summary.id}.json`, "utf8"));
    const cards = [];
    const visit = c => { cards.push(c); c.variants.forEach(visit); };
    [...detail.startCards, ...detail.sparkCards, ...detail.collapseCards, ...detail.potentialTargetCards, ...(detail.collapseSkillCard ? [detail.collapseSkillCard] : [])].forEach(visit);
    for (const [deckIndex, deck] of source.decks.entries()) {
        const entries = deck.cards.map(entry => {
            const aliases = { "Soul Rip": "Soul Riff", "Rapid Fire (Luke) II": "Chain Fire II" };
            const name = (aliases[entry.name] ?? entry.name).replace(/^Soul Rip(?= |$)/, "Soul Riff").replace(/^Rapid Fire \(Luke\)(?= |$)/, "Chain Fire");
            const found = cards.find(c => key(c.name + (c.id.match(/_rsp([1-5])$/) ? ' ' + roman[Number(c.id.match(/_rsp([1-5])$/)[1]) - 1] : '')) === key(name)) ?? cards.find(c => key(c.name) === key(name));
            const external = found ? null : catalog.cards.filter(c => key(c.name) === key(entry.name) && !c.ownerId);
            return { ...entry, cardId: found?.id ?? (external?.length === 1 ? external[0].id : entry.name === "Sample Collection" && entry.description === "150% Damage. Draw 2." ? "card_ds04_des_10013" : null), external: !found, matches: external?.map(c => c.id) };
        });
        drafts.push({ id: summary.id, name: summary.name, sourceUrl: source.url, deckIndex, deck: deck.name, entries });
    }
}
writeFileSync("docs/combatant/prydwen/deck-mapping.json", JSON.stringify(drafts, null, 2) + "\n");
const unresolved = drafts.flatMap(d => d.entries.filter(e => !e.cardId && e.name !== "Persona").map(e => `${d.name}: ${e.name}`));
if (unresolved.length)
    throw Error(`Unresolved deck cards: ${unresolved.join(", ")}`);
console.log(JSON.stringify({ decks: drafts.length, customPersonas: drafts.flatMap(d => d.entries.filter(e => !e.cardId && e.name === "Persona")).length, unresolved }));
