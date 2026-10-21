import type { Card } from "./types";
import { preserveGameTermNames } from "./labels";

const inferredTerms = [
  { id: "TERM_EFFICIENCY", en: { title: "Efficiency", desc: "Activates the effect after Efficiency when the card is activated in a cost-reduced state, including reduction through Lead or Divine Epiphanies." }, vi: { title: "Hiệu suất", desc: "Kích hoạt phần hiệu ứng sau Hiệu suất khi lá bài được kích hoạt trong trạng thái chi phí đã được giảm, chẳng hạn nhờ Dẫn đầu hoặc Thức tỉnh thần thánh." } },
  { id: "TERM_DESTROY", en: { title: "Destroy", desc: "Activates the effect after Destroy when the card breaks the target’s Tenacity and inflicts Ravage, or hits a target already in Ravage. Defeating the target is not required." }, vi: { title: "Phá vỡ", desc: "Kích hoạt hiệu ứng sau Phá vỡ khi lá bài đánh vỡ thanh Sức bền khiến mục tiêu Suy yếu, hoặc đánh trúng mục tiêu đang Suy yếu. Không cần tiêu diệt mục tiêu." } },
  { id: "TERM_ATTUNEMENT", en: { title: "Attunement", desc: "Activates the effect after Attunement when the card enters the hand, including the start-of-turn draw. Playing the card is not required; other effects do not activate automatically." }, vi: { title: "Điều hòa", desc: "Kích hoạt hiệu ứng sau Điều hòa ngay khi lá bài được đưa lên tay, kể cả rút bài đầu lượt. Không cần sử dụng lá bài; các hiệu ứng khác không tự kích hoạt." } },
];
const normalizeTitle = (title: string) => title.replace(/:$/, "").trim().toLowerCase();

export function getCardTerms(card: Pick<Card, "description" | "talent" | "tooltips">, vietnamese = false) {
  const definitions = inferredTerms.map(term => ({ id: term.id, title: term.en.title,
    desc: vietnamese ? preserveGameTermNames(term.vi.desc) : term.en.desc }));
  const terms = new Map<string, Card["tooltips"][number]>();
  for (const term of [...card.talent, ...card.tooltips]) {
    const definition = definitions.find(candidate => candidate.id === term.id || normalizeTitle(candidate.title) === normalizeTitle(term.title)
      || inferredTerms.some(inferred => inferred.id === candidate.id && normalizeTitle(inferred.vi.title) === normalizeTitle(term.title)));
    const resolved = definition ?? term;
    terms.set(resolved.id, resolved);
  }
  const description = card.description.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, "");
  for (const term of definitions) {
    const legacyTitle = inferredTerms.find(inferred => inferred.id === term.id)!.vi.title;
    if ([term.title, legacyTitle].some(title => description.toLocaleLowerCase().includes(title.toLocaleLowerCase()))) terms.set(term.id, term);
  }
  return [...terms.values()];
}
