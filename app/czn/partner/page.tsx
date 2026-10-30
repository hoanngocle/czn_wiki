import type { Metadata } from "next";
import { PartnerSelectionPrompt } from "../../../components/partners/PartnerWorkspace";

export const metadata: Metadata = { title: "Partners | CZN Wiki", description: "Browse partners, support cards, passives, and stats in Chaos Zero Nightmare." };

export default function PartnersPage() {
  return <PartnerSelectionPrompt />;
}
