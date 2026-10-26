import type { Metadata } from "next";
import equipment from "../../../data/wiki/equipment.json";
import { EquipmentBrowser } from "../../../components/equipment/EquipmentBrowser";

export const metadata: Metadata = {
  title: "Equipment | CZN Wiki",
  description: "Tra cứu Weapon, Armor và Accessory trong Chaos Zero Nightmare. Tìm Equipment theo hiệu ứng, Rarity và khu vực.",
};

export default function EquipmentPage() {
  return <EquipmentBrowser equipment={equipment} />;
}
