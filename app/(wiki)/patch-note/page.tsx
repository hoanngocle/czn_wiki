import Link from "next/link";
import update from "../../../data/wiki/articles/2026-10-21-update.json";
import styles from "../../../components/articles/ArticleView.module.css";

export const metadata = { title: "Patch note | CZN Wiki", description: "Thông báo cập nhật Chaos Zero Nightmare bằng tiếng Việt." };

export default function PatchNoteIndex() {
  return <div className={styles.page} lang="vi"><header className={styles.header}>
    <div className={styles.eyebrow}>Chaos Zero Nightmare</div><h1>Patch note</h1>
    <p>Thông báo cập nhật và giới thiệu cơ chế, được dịch sang tiếng Việt từ tài liệu nguồn.</p>
  </header><div className={styles.body}>
    <section><time dateTime={update.date}>21/10/2026</time><h2><Link href="/patch-note/2026-10-21-update">{update.title} →</Link></h2><p>{update.description}</p></section>
    <section><h2><Link href="/mechanics/rossweisse">Cơ chế Rossweisse →</Link></h2><p>Phân cực Ánh sáng / Bóng tối, Tua kiếm và hợp nhất Equilux. Bản dịch bài giới thiệu cơ chế và dữ liệu trong thông báo cập nhật.</p><Link href="/combatant/rossweisse">Xem nhân vật Rossweisse →</Link></section>
  </div></div>;
}
