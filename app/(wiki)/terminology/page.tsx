import type { Metadata } from "next";
import { CardGlossary } from "../../../components/cards/CardGlossary";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Thuật ngữ | CZN Wiki" };

export default function TerminologyPage() {
  return <div className={styles.page} lang="vi">
    <header className={styles.header}>
      <h1>Thuật ngữ</h1>
      <p>Tra cứu tên lá bài, loại lá và hiệu ứng trong game cùng giải nghĩa tiếng Việt.</p>
    </header>
    <CardGlossary />
  </div>;
}
