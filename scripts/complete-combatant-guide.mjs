import { readFileSync } from "node:fs";
const read = path => JSON.parse(readFileSync(path, "utf8"));
const source = read("docs/combatant/prydwen/supplement-source.json");
const key = name => name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const canonicalName = name => name.replace(/^Soul Rip(?= |$)/, "Soul Riff").replace(/^Rapid Fire \(Luke\)(?= |$)/, "Chain Fire");
export function completeCombatantGuide(guide, cards) {
    const notes = read("docs/combatant/prydwen/build-supplement-notes.json")[guide.name];
    const cardNotes = read("docs/combatant/prydwen/card-advice-notes.json")[guide.name];
    const original = source.find(item => item.name === guide.name);
    if (!notes || !cardNotes || !original)
        throw Error(`Missing supplemental guide: ${guide.name}`);
    if (notes.seasonal.length !== original.seasonal.length || notes.dupes.length !== original.dupes.length || cardNotes.length !== original.cards.length)
        throw Error(`Incomplete supplemental guide: ${guide.name}`);
    guide.critNote = notes.stats.en ? notes.stats : guide.critNote;
    guide.potentialIntro = notes.potential;
    guide.seasonal = notes.seasonal.map(({ name, note }) => ({ name, note }));
    guide.dupes = notes.dupes;
    for (const [index, item] of guide.equipment.entries()) {
        const note = notes.equipment[index];
        if (note?.note.en)
            item.note = note.note;
    }
    guide.cardAdvice = original.cards.map((group, index) => {
        const card = cards.find(item => key(item.name) === key(canonicalName(group.name)) && !/_rsp[1-5]$/.test(item.id));
        if (!card)
            throw Error(`Unmapped card advice: ${guide.name}/${group.name}`);
        const translated = cardNotes[index];
        if (translated.sourceName !== group.name)
            throw Error(`Card note order mismatch: ${guide.name}/${group.name}`);
        const ratings = group.variants.slice(1).map(item => item.rating);
        if (ratings.length !== 5 || ratings.some(rating => rating < 0 || rating > 5))
            throw Error(`Invalid ratings: ${guide.name}/${group.name}`);
        const best = Math.max(...ratings);
        return { cardId: card.id, ratings, preferred: best === 0 ? "" : ratings.flatMap((rating, i) => rating === best ? [["I", "II", "III", "IV", "V"][i]] : []).join(" / "), note: translated.note, divine: translated.divine };
    });
    return guide;
}
