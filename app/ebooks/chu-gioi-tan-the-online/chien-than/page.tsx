import type { Metadata } from "next";
import { WarGodProfile } from "../../../../components/story/WarGodProfile";

export const metadata: Metadata = {
  title: "Cố Thanh Sơn · Giao diện Chiến Thần",
  description: "Hồ sơ Cố Thanh Sơn theo chương: cảnh giới, pháp bảo, hòm đồ và kỹ năng trong Chư Giới Tận Thế Online.",
};

export default function WarGodPage() { return <WarGodProfile />; }
