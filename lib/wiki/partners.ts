// Static data stays on the server; pages pass only the selected detail to clients.
import catalog from "../../data/wiki/partners.json";
import type { PartnerDetail, PartnerSummary, PartnerMedia } from "./partner-types";
import media from "../../data/wiki/partners/media.json";
import { partnerTranslations } from "./partner-translations";
import { combatantSlug } from "./urls";

export const partnerSlug = combatantSlug;
export function partnerUrl(partner: { name: string }): string { return `/partner/${partnerSlug(partner)}`; }

export function getPartners(): PartnerSummary[] {
  return catalog.characters as PartnerSummary[];
}

export function getPartner(idOrSlug: string): PartnerSummary | undefined {
  return getPartners().find(partner => partner.id === idOrSlug || partnerSlug(partner) === idOrSlug);
}

export function getPartnerDetail(id: string): PartnerDetail | undefined {
  return (catalog.details as Record<string, PartnerDetail>)[id];
}

export function getPartnerTranslation(id: string) { return partnerTranslations[id]; }
export function getPartnerMedia(id: string): PartnerMedia | undefined { return (media as Record<string, PartnerMedia>)[id]; }
