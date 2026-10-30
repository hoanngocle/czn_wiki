import styles from "../../../../components/partners/Partners.module.css";

export default function PartnerLoading() {
  return <div className={styles.partnerDetail} role="status"><p className={styles.muted}>Loading partner details…</p></div>;
}
