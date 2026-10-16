import { readFileSync, readdirSync } from "node:fs";
const labels = JSON.parse(readFileSync("data/wiki/translations/vi/terminology.json", "utf8"));
const sharedTerms = readdirSync("data/wiki/translations/vi").filter(name => name.endsWith(".glossary.json")).flatMap(name => JSON.parse(readFileSync(`data/wiki/translations/vi/${name}`, "utf8")).terms);
const catalogNames = JSON.parse(readFileSync("data/deck-builder/catalog.json", "utf8")).cards.map(card => card.name);
const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const glossaryEntries = terms => terms.filter(term => term.englishTitle).flatMap(term => [
    [term.englishTitle, term.title],
    [term.englishTitle.replace(/:$/, ""), term.title.replace(/:$/, "")],
]);
/** Localize guide prose while protecting the character's English card names. */
export function localizeGuideProse(guide, cards, terms) {
    // Synergy explanations also mention cards belonging to other combatants.
    const protectedNames = [...new Set([...catalogNames, ...cards.map(card => card.name), ...(guide.decks ?? []).map(deck => deck.name.en), ...(guide.teams ?? []).map(team => team.name.en)])].sort((a, b) => b.length - a.length);
    const dictionary = {
        ...Object.fromEntries(glossaryEntries(sharedTerms)),
        ...labels,
        ...Object.fromEntries(glossaryEntries(terms)),
        AP: "Điểm hành động", DEF: "Phòng thủ", ATK: "Tấn công", HP: "Máu", AoE: "sát thương diện rộng", AOE: "sát thương diện rộng",
        OTK: "kết liễu trong một lượt", DPS: "chủ lực gây sát thương", Buff: "Hiệu ứng tăng cường", debuff: "hiệu ứng bất lợi", buffs: "hiệu ứng tăng cường",
        "Save Data": "dữ liệu lưu", "Faint Memory": "Ký ức phai nhạt", Faint: "Ký ức phai nhạt",
        Engravings: "Khắc ấn", Engraving: "Khắc ấn", Refinements: "Tinh luyện", Refinement: "Tinh luyện",
        "Card Damage": "sát thương bài", "Card DMG": "sát thương bài", "Crit Rate": "Tỷ lệ chí mạng", "Crit DMG": "Sát thương chí mạng",
        DoT: "sát thương theo thời gian", Quest: "Nhiệm vụ", Quests: "Nhiệm vụ",
        Creations: "Tạo vật", Creation: "Tạo vật",
        "Passion Weakness": "điểm yếu Đam mê", "Weakness Attack": "tấn công điểm yếu",
        "Extra Attack": "Đòn đánh thêm", "Extra Attacks": "Đòn đánh thêm",
        "Divine Epiphany": "Thức tỉnh thần thánh", Epiphany: "Thức tỉnh bài", Epiphanies: "Thức tỉnh bài",
    };
    const names = new Set(protectedNames);
    // Match the longest whole phrase first: Shock must not hide Shockwave, and
    // the Launcher card must not split the Launcher Bullet glossary term.
    const phrases = [...new Set([...protectedNames, ...Object.keys(dictionary)])].filter(Boolean).sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(?:${phrases.map(escape).join("|")})(?![\\p{L}\\p{N}])`, "gu");
    const translate = text => {
        return text.replace(/Soul Rip/g, "Soul Riff").replace(pattern, term => names.has(term) ? term : dictionary[term])
            .replaceAll("Khiên", "Lá chắn").replaceAll("Bạo kích", "chí mạng");
    };
    const visit = value => {
        if (Array.isArray(value))
            return value.map(visit);
        if (!value || typeof value !== "object")
            return value;
        return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, key === "vi" && typeof child === "string" ? translate(child) : visit(child)]));
    };
    return visit(guide);
}
