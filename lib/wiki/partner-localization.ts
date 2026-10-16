import type { PartnerDetail, PartnerTranslation } from "./partner-types";

const infoLabels: Record<string, string> = {
  "Race Type": "Chủng tộc", Birthday: "Sinh nhật", Specialty: "Sở trường",
  "CV (JP)": "Lồng tiếng (Nhật)", "CV (KR)": "Lồng tiếng (Hàn)", "CV (EN)": "Lồng tiếng (Anh)",
};

// Overlay text only: IDs, English card names, artwork and gameplay values stay canonical.
export function localizePartner(detail: PartnerDetail, translation?: PartnerTranslation): PartnerDetail {
  if (!translation) return detail;
  const term = (item: { id: string; title: string; desc: string }) => ({ ...item, ...translation.terms[item.id] });
  return {
    ...detail,
    profile: translation.profile,
    info: detail.info.map((item, index) => ({ label: infoLabels[item.label] ?? item.label, value: translation.infoValues[index] ?? item.value })),
    card: detail.card ? { ...detail.card, description: translation.cardDescription, tooltips: detail.card.tooltips.map(term), talent: detail.card.talent.map(term) } : null,
    passives: detail.passives.map(item => ({ ...item, ...translation.passives[String(item.level)] })),
  };
}
