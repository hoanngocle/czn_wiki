import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { completeCombatantGuide } from "./complete-combatant-guide.mjs";
import { cardVideoUrl } from "./card-videos.mjs";
import { localizeGuideProse } from "./combatant-prose.mjs";
const read = path => JSON.parse(readFileSync(path, "utf8"));
const roster = read("data/wiki/characters.json").filter(c => c.kind === "combatant" && c.source === "e7bot");
const sources = read("docs/combatant/prydwen/extracted.json");
const editorial = read("docs/combatant/prydwen/editorial.json");
const mappings = read("docs/combatant/prydwen/deck-mapping.json");
const media = read("docs/combatant/prydwen/media.json");
const catalog = read("data/deck-builder/catalog.json");
const buildNotes = Object.assign({}, ...["docs/combatant/prydwen/build-notes.json", "docs/combatant/prydwen/build-notes-b.json", "docs/combatant/prydwen/build-notes-legacy.json"].map(path => existsSync(path) ? read(path) : {}));
const legacy = { "1041": "renoa", "1033": "veronica", "1052": "narja", "30075": "sereniel" };
const personaTranslations = read("data/wiki/translations/vi/guide-personas.json");
const extraTranslations = read("data/wiki/translations/vi/guide-extra.cards.json");
const teamNames = read("docs/combatant/prydwen/team-names.vi.json");
const deckNotes = read("docs/combatant/prydwen/deck-notes.json");
const videoManifest = existsSync("data/wiki/card-videos.json") ? read("data/wiki/card-videos.json") : { cards: {} };
const pair = (en, vi) => ({ en, vi });
const plain = text => text.replace(/<br\s*\/?>/g, "; ").replace(/<[^>]*>/g, "");
const key = name => name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const clean = name => name.replace(/\s*\[\d-PC\]|\s*\(\d\)| E\d+$/g, "").trim();
const sourceNote = pair("Review, build options and all captured deck examples are summarized from the Prydwen page captured on 16 October 2026. Card effects use E7BOT consistently; older seasonal decks may require unavailable effects. Additional generated cards use the saved E7BOT card catalog.", "Tóm tắt đánh giá, các phương án xây dựng và toàn bộ bộ bài đã lưu từ trang Prydwen lưu ngày 16/10/2026. Hiệu ứng card thống nhất theo E7BOT; bộ bài từ mùa cũ có thể cần hiệu ứng hiện không còn khả dụng. Bài được tạo bổ sung lấy từ danh mục card E7BOT đã lưu.");
const effects = { "Draw 1": "Rút 1 lá", "1 AP": "Nhận 1 Điểm hành động", "2 Vulnerable to the target": "Gây 2 Dễ tổn thương lên mục tiêu", "At the start of each turn, when this card is the first card used, Draw 2": "Đầu mỗi lượt, nếu đây là lá đầu tiên được sử dụng, Rút 2 lá", "Apply Initiation to this card": "Áp dụng Khởi đầu cho lá này", "Always Attack Weakness": "Luôn tấn công điểm yếu", "Treated as a Common Card Draw 1 Common Card(s)": "Được xem là Bài thường. Rút 1 lá Bài thường", "Weakness Attack: Decrease Fortitude by 2 for 1 turn": "Tấn công điểm yếu: Giảm 2 Kiên cường trong 1 lượt", "1 Morale, 1 Resolve": "Nhận 1 Sĩ khí và 1 Quyết tâm" };
Object.assign(effects, { "For 1 turn, gain 2 Morale": "Nhận 2 Sĩ khí trong 1 lượt", "Morale 2": "Nhận 2 Sĩ khí", "Draw 2": "Rút 2 lá", "For 1 turn, gain 3 Morale": "Nhận 3 Sĩ khí trong 1 lượt", "1 Morale next turn": "Nhận 1 Sĩ khí ở lượt tiếp theo", "Morale 1": "Nhận 1 Sĩ khí", "Increase Action Count by 2": "Tăng Số lần hành động thêm 2", "For 1 turn, gain 1 Morale": "Nhận 1 Sĩ khí trong 1 lượt" });
Object.assign(effects, {
    "Apply 1 Mark to the target": "Gây 1 Dấu ấn lên mục tiêu",
    "Apply 1 Vulnerable to the target": "Gây 1 Dễ tổn thương lên mục tiêu",
    "Apply Vulnerable 1 to all enemies": "Gây 1 Dễ tổn thương lên toàn bộ kẻ địch",
    "Apply Vulnerable 2 to all enemies": "Gây 2 Dễ tổn thương lên toàn bộ kẻ địch",
    "At the start of the turn, change the Cost of this card to 0 - 3": "Đầu lượt, thay đổi Tiêu hao của lá này thành 0 - 3",
    "Draw 1 card(s) of this unit": "Rút 1 lá của nhân vật này",
    "For 1 turn, gain 1 Resolve": "Nhận 1 Quyết tâm trong 1 lượt",
    "For 1 turn, gain 2 Resolve": "Nhận 2 Quyết tâm trong 1 lượt",
    "Gain 2 Ego Points": "Nhận 2 Điểm Ego",
    "Resolve 1": "Nhận 1 Quyết tâm"
});
const statVi = text => text.replace(/Extra ATK DMG/gi, "Sát thương đòn đánh thêm").replace(/Extra DMG/gi, "Sát thương bổ sung").replace(/CRIT Rate/gi, "Tỷ lệ chí mạng").replace(/CRIT DMG/gi, "Sát thương chí mạng").replace(/DoT DMG/gi, "Sát thương theo thời gian").replace(/EGO Regen/gi, "Hồi năng lượng Ego").replace(/Void DMG/gi, "Sát thương Hư vô").replace(/Instinct DMG/gi, "Sát thương Bản năng").replace(/Passion DMG/gi, "Sát thương Đam mê").replace(/Justice DMG/gi, "Sát thương Công lý").replace(/Order DMG/gi, "Sát thương Trật tự").replace(/ATK/g, "Tấn công").replace(/DEF/g, "Phòng thủ").replace(/HP/g, "Máu");
const areaVi = text => text.replace(/BEST|\(BEST\)/g, "").replace(/Season (\d+):/g, "Mùa $1:").replace(/\(CURRENT\)/gi, "(hiện tại)").replace(/Swamp/g, "Đầm lầy").replace(/City of Mist/g, "Thành phố sương mù").replace(/Support/g, "Hỗ trợ").replace(/Group (\d+)/g, "Nhóm $1");
const canonCard = card => ({ ...card, artwork: existsSync(`public/assets/card/${card.artKey}.webp`) ? `/assets/card/${card.artKey}.webp` : card.artwork, video: cardVideoUrl(card, videoManifest), variants: card.variants ?? [] });
for (const summary of roster) {
    const slug = legacy[summary.id] ?? summary.id;
    const existing = legacy[summary.id] ? read(`data/wiki/guides/${slug}.json`) : null;
    const detail = read(`data/wiki/characters/${summary.id}.json`), source = sources.find(s => key(s.name) === key(summary.name));
    const review = (Array.isArray(editorial) ? editorial : Object.values(editorial)).find(e => e.name === summary.name) ?? existing?.review;
    if (!review)
        throw Error(`No editorial ${summary.name}`);
    const transPath = `data/wiki/translations/vi/${slug}.cards.json`;
    const translated = read(transPath);
    const progressionPath = `data/wiki/translations/vi/${slug}.progression.json`;
    const progression = read(progressionPath);
    const own = [];
    const visit = c => { own.push(c); c.variants.forEach(visit); };
    [...detail.startCards, ...detail.sparkCards, ...detail.collapseCards, ...detail.potentialTargetCards, detail.collapseSkillCard].filter(Boolean).forEach(visit);
    const extraCards = existing ? existing.extraCards.filter(c => !c.id.startsWith(`guide_${summary.id}_persona`)).map(canonCard) : catalog.cards.filter(c => c.ownerId === summary.id && !own.some(o => o.id === c.id)).map(canonCard);
    const generatedCardIds = existing?.generatedCardIds ?? extraCards.map(c => c.id);
    const decks = [];
    const personas = new Map();
    for (const mapping of mappings.filter(d => d.id === summary.id)) {
        const deckSource = source.decks[mapping.deckIndex];
        const deckCards = [];
        for (const entry of mapping.entries) {
            let id = entry.cardId;
            if (!id && entry.name === "Persona") {
                const personaKey = JSON.stringify([entry.description, entry.cost, entry.type, entry.tags, entry.classRestriction]);
                id = personas.get(personaKey);
                if (!id) {
                    id = `guide_${summary.id}_persona${personas.size ? `_${personas.size + 1}` : ""}`;
                    personas.set(personaKey, id);
                    if (!personaTranslations[entry.description])
                        throw Error(`Missing Persona translation ${entry.description}`);
                    const tagsEn = entry.tags.map(tag => `[${tag}]`).join(" ");
                    const tagsVi = entry.tags.map(tag => `[${tag.replace("Unique", "Độc nhất").replace("Exhaust", "Kiệt sức")}]`).join(" ");
                    const restrictions = { "Ranger only": "Chỉ dành cho Xạ thủ", "Striker only": "Chỉ dành cho Đột kích", "Hunter only": "Chỉ dành cho Thợ săn", "Controller only": "Chỉ dành cho Điều khiển", "No Class restrictions": "Không giới hạn vai trò", "Vanguard, Controller only": "Chỉ dành cho Tiên phong và Điều khiển" };
                    if (!restrictions[entry.classRestriction])
                        throw Error(`Unknown Persona restriction: ${entry.classRestriction}`);
                    extraTranslations[id] = [tagsVi, personaTranslations[entry.description], restrictions[entry.classRestriction]].filter(Boolean).join("<br>");
                    if (!extraCards.some(c => c.id === id))
                        extraCards.push({ id, name: "Persona", cost: Number(entry.cost), description: [tagsEn, entry.description, entry.classRestriction].filter(Boolean).join("<br>"), category: { Attack: "CARD_ATK", Skill: "CARD_SKILL", Upgrade: "CARD_UPGRADE" }[entry.type], rarity: "RARITY_UNIQUE", artwork: `/assets/card/prydwen-${entry.image.split('/').at(-1)}`, video: null, artKey: "prydwen-persona", sort: "SORT_SUPPORT", egoType: "EGO_OWNER", talent: [], tooltips: [], variants: [], sourceId: `${source.url}#decks` });
                }
            }
            if (!id)
                throw Error(`Unmapped deck card ${summary.name}: ${entry.name}`);
            if (entry.external && entry.cardId && !extraCards.some(c => c.id === id))
                extraCards.push(canonCard(catalog.cards.find(c => c.id === id)));
            const card = [...own, ...extraCards].find(c => c.id === id);
            if (!card)
                throw Error(`Missing ${id}`);
            const ref = { cardId: id, count: entry.count };
            // Prydwen renders the divine cost reduction separately from the base cost.
            if (entry.divine === "Reduce the cost of this card by 1.")
                ref.costDelta = -1;
            else if (entry.divine === "Draw 1")
                ref.draw = 1;
            else if (entry.divine) {
                if (!effects[entry.divine])
                    throw Error(`Unknown divine ${entry.divine}`);
                ref.effects = pair(entry.divine, effects[entry.divine]);
            }
            if (entry.epiphanyEffect) {
                if (!effects[entry.epiphanyEffect])
                    throw Error(`Unknown epiphany ${entry.epiphanyEffect}`);
                ref.effects = pair([entry.epiphanyEffect, ref.effects?.en].filter(Boolean).join("<br>"), [effects[entry.epiphanyEffect], ref.effects?.vi].filter(Boolean).join("<br>"));
            }
            deckCards.push(ref);
        }
        const note = deckNotes[summary.name]?.[mapping.deckIndex];
        if (!note || note.sourceName !== deckSource.name)
            throw Error(`Missing deck translation ${summary.name}/${deckSource.name}`);
        decks.push({ name: note.name, role: note.role, partner: deckSource.partner, cards: deckCards, gear: deckSource.equipment, fragments: deckSource.fragments.map(clean), fragmentPieces: deckSource.fragments.map(name => Number(name.match(/\[(\d)-PC\]|\((\d)\)/)?.slice(1).find(Boolean) ?? 0)), code: deckSource.code || undefined, note: note.note });
    }
    const images = { ...existing?.images, ...media[summary.id] };
    images[`${summary.name} artwork`] = images[summary.name];
    const ego = { creed: "Void", instinct: "Instinct", love: "Passion", norms: "Order", narcissism: "Justice" }[summary.ego];
    const job = summary.job.charAt(0).toUpperCase() + summary.job.slice(1);
    images[ego] = { src: `/assets/common/icon_type_ego_${summary.ego}.png`, width: 44, height: 44 };
    images[job] = { src: `/assets/common/icon_type_job_${summary.job === "vanguard" ? "knight" : summary.job}.png`, width: 44, height: 44 };
    const partners = source.partners.map(p => {
        const name = `${p.name}${p.ego ? ' ' + p.ego : ''}`;
        images[name] = images[p.name];
        const note = buildNotes[summary.name]?.partners[name] ?? existing?.partners.find(p => p.name === name)?.note;
        if (!note)
            throw Error(`Missing partner rationale ${summary.name}/${name}`);
        return { name, score: p.performance || "—", note };
    });
    const fragments = source.fragments.map((f, index) => {
        const note = (buildNotes[summary.name]?.fragments[index] ?? existing?.fragments[index]?.note);
        if (!note)
            throw Error(`Missing fragment rationale ${summary.name}/${index}`);
        return { name: f.sets.map(n => n.replace(/ \[(\d)-PC\]/g, " ($1)")).join(" + "), score: "—", note };
    });
    const stats = source.stats.flatMap(group => Object.entries(group.priorities).map(([slot, value]) => ({ name: pair(`${source.stats.length > 1 ? group.label + ' · ' : ''}${slot}`, `${source.stats.length > 1 ? group.label.replace(summary.name + ' Stats', '').replace('Support', 'Hỗ trợ').replace('Offensive', 'Tấn công').replace('DPS-Lite', 'Sát thương phụ').replace('Crit Variant', 'Chí mạng').replace('Pure Attack', 'Thuần Tấn công').replace(/^\s*[—–-]\s*/, '').trim() + ' · ' : ''}${({ Ideal: 'Lý tưởng', Desire: 'Khao khát', Imagination: 'Tưởng tượng', Substats: 'Chỉ số phụ' })[slot] ?? slot}`), value: pair(value, statVi(value)) })));
    const equipment = source.equipment.map(e => ({ name: pair(e.label.replace(/BEST/g, "").trim(), areaVi(e.label).trim()), weapons: e.slots.Weapons ?? [], armor: e.slots.Armor ?? [], trinkets: e.slots.Trinkets ?? [] }));
    const mechanics = detail.sparkCards.slice(0, 3).map(c => ({ title: c.name, body: pair(plain(c.description), translated[c.id] ? plain(translated[c.id]) : ""), cardId: c.id }));
    if (mechanics.some(m => !m.body.vi))
        throw Error(`Missing mechanic translation for ${summary.name}`);
    const guide = { characterId: summary.id, name: summary.name, identity: [ego, job], subtitle: review.intro, portrait: summary.portrait, source: { name: "Prydwen + E7BOT", url: source.url, updated: "", kind: "guide", files: [`docs/combatant/prydwen/${source.sourceFile}`, detail.sourceFile, "data/deck-builder/catalog.json"], note: sourceNote }, images, extraCards, generatedCardIds, epiphanyReviews: {}, review: { intro: review.intro, profile: [], pros: review.pros, cons: review.cons, mechanics }, cardAdvice: [], partners, fragments, stats, critNote: pair("Priority symbols are preserved from the source; they compare stats rather than prescribing a universal target value.", "Giữ nguyên dấu so sánh ưu tiên từ nguồn; đây là thứ tự ưu tiên chỉ số, không phải một ngưỡng cố định cho mọi bộ bài."), potentialIntro: pair("The Card tab contains every Potential level. The entries below show the source's maximum-level effects; no unsupported investment order is assigned.", "Tab Thẻ bài có đầy đủ các cấp Tiềm năng. Dưới đây là hiệu ứng ở cấp tối đa trong dữ liệu; không tự gán thứ tự đầu tư khi chưa có căn cứ."), potentialAdvice: detail.potentialNodes.filter(n => ["3_1", "5_1", "5_2", "7_0"].includes(n.node_num)).map(n => { const max = [n, ...n.upgrade_nodes].sort((a, b) => Number(b.node_level) - Number(a.node_level))[0]; return { name: n.node_num.replace("_", "-"), note: pair(plain(max.desc), progression.potentialNodes[max.id] ? plain(progression.potentialNodes[max.id]) : "") }; }), equipment, seasonal: [], dupes: [], decks, synergies: source.synergies.map(s => ({ name: s.name, note: buildNotes[summary.name]?.synergies[s.name] ?? existing?.synergies.find(item => item.name === s.name)?.note })), teams: source.teams.map(t => ({ name: pair(t.name, teamNames[t.name] ?? t.name), members: t.members, steps: [pair("Team composition recorded from the source. No fixed rotation was captured for this entry.", "Thành phần đội hình được ghi từ nguồn. Mục này chưa lưu chuỗi hành động cố định.")] })) };
    if (existing && ["1041", "30075"].includes(summary.id)) {
        Object.assign(guide, { review: existing.review, epiphanyReviews: existing.epiphanyReviews, source: { ...guide.source, files: [...new Set([...existing.source.files, ...guide.source.files])] } });
    }
    for (const synergy of guide.synergies)
        if (!synergy.note?.vi || !synergy.note?.en)
            throw Error(`Missing synergy rationale ${summary.name}/${synergy.name}`);
    if (guide.potentialAdvice.some(item => !item.note.vi))
        throw Error(`Missing Potential translation for ${summary.name}`);
    writeFileSync(`data/wiki/guides/${slug}.json`, JSON.stringify(localizeGuideProse(completeCombatantGuide(guide, [...own, ...extraCards]), [...own, ...extraCards], read(`data/wiki/translations/vi/${slug}.glossary.json`).terms), null, 2) + "\n");
}
writeFileSync("data/wiki/translations/vi/guide-extra.cards.json", JSON.stringify(extraTranslations, null, 2) + "\n");
console.log(JSON.stringify({ guides: roster.length, complete: true }));
