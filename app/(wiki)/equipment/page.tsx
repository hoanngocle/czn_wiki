import type { Metadata } from "next";
import equipment from "../../../data/wiki/equipment.json";
import { EquipmentBrowser } from "../../../components/equipment/EquipmentBrowser";

export const metadata: Metadata = {
  title: "Equipment | CZN Wiki",
  description: "Tra cứu vũ khí, giáp và phụ kiện trong Chaos Zero Nightmare. Tìm trang bị theo hiệu ứng, độ hiếm và khu vực.",
};

export default function EquipmentPage() {
  return <EquipmentBrowser equipment={equipment} />;
}
