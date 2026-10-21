import type { Metadata } from "next";
import { CardGlossary } from "../../../components/cards/CardGlossary";
import { characterTranslations } from "../../../data/wiki/translations";
import { collectGlossary } from "../../../lib/wiki/glossary";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Thuật ngữ | CZN Wiki" };

export default function TerminologyPage() {
  return <div className={styles.page} lang="vi">
    <header className={styles.header}>
      <h1>Thuật ngữ</h1>
      <p>Tên cơ chế, loại bài và hiệu ứng được giữ nguyên bằng tiếng Anh; phần giải thích bằng tiếng Việt. Các định nghĩa cùng tên nhưng khác điều kiện hoặc chỉ số được trình bày riêng.</p>
    </header>
    <CardGlossary definitions={collectGlossary(characterTranslations)} />
  </div>;
}
