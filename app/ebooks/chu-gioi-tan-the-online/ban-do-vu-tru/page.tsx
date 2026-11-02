import type { Metadata } from "next";
import { CosmosAtlas } from "../../../../components/story/cosmos/CosmosAtlas";

export const metadata: Metadata = {
  title: "Bản đồ vũ trụ 3D · Chư Giới Tận Thế Online",
  description: "Khám phá các thế giới Rời Rạc, Biểu Tầng và Lục Đạo với quan hệ, lịch sử và chương nguồn trong truyện.",
};

export default function CosmosPage() { return <CosmosAtlas />; }
