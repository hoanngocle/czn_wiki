import type { Metadata } from "next";
import { EbookLibrary } from "../../components/ebooks/EbookLibrary";

export const metadata: Metadata = {
  title: "Ebooks | Thư viện truyện",
  description: "Thư viện truyện tiếng Việt. Tìm truyện, đọc từng chương và khám phá bản đồ cốt truyện.",
};

export default function EbooksPage() {
  return <EbookLibrary />;
}
