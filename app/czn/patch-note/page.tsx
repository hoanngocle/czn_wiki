import Link from "next/link";
import update from "../../../data/wiki/articles/2026-10-21-update.json";
import styles from "../../../components/articles/ArticleView.module.css";

export const metadata = { title: "Patch note | CZN Wiki", description: "Thông báo cập nhật Chaos Zero Nightmare bằng tiếng Việt." };

export default function PatchNoteIndex() {
  return <div className={styles.page} lang="vi"><header className={styles.header}>
    <div className={styles.eyebrow}>Chaos Zero Nightmare</div><h1>Patch note</h1>
    <p>Thông báo cập nhật và giới thiệu cơ chế Chaos Zero Nightmare.</p>
  </header><div className={styles.body}>
    <section><time dateTime={update.date}>21/10/2026</time><h2><Link href="/czn/patch-note/2026-10-21-update">{update.title} →</Link></h2><p>{update.description}</p></section>
    <section><h2><Link href="/czn/mechanics/rossweisse">Cơ chế Rossweisse →</Link></h2><p>Polarize Light / Dark, Sword Tassel và hợp nhất Equilux.</p><Link href="/czn/combatant/rossweisse">Xem nhân vật Rossweisse →</Link></section>
  </div></div>;
}
