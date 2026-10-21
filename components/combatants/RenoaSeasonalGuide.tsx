"use client";
import { preserveGameTermNames } from "../../lib/wiki/labels";
import { VerticalTabs } from "./GuideTabs";
import styles from "./RenoaBuildGuide.module.css";
type Props = { vietnamese: boolean };
export function RenoaSeasonalGuide({ vietnamese }: Props) {
  const t = (en: string, vi: string) => vietnamese ? preserveGameTermNames(vi) : en;
  return <VerticalTabs vietnamese={vietnamese} labels={[4, 3, 2, 1].map(n => `${t("Season", "Mùa")} ${n}`)} best={1} label={t("Seasonal powers", "Sức mạnh theo mùa")}>
    {[
      <div className={styles.prose} key="desire"><p><em>{t("Introduces Desire Cards. Desire Cards primarily give a strong passive buff by meeting Desire Thresholds (3/5/7), which requires multiple allies to also use decks made in Season 4.", "Giới thiệu Bài Khát vọng: những lá bài cung cấp hiệu ứng nội tại mạnh khi đạt các ngưỡng Khát vọng (3/5/7). Để đạt các ngưỡng này, nhiều đồng đội cũng cần dùng bộ bài được tạo trong Mùa 4.")}</em></p>
        <ul><li>{t("A common flexible setup is ", "Cách kết hợp linh hoạt thường dùng là ")}<strong><u>1 Claim / 1 Survival / 1 Inquiry</u></strong>{t(". You can also use ", ". Bạn cũng có thể dùng ")}<strong><u>3 X</u></strong>{t(" to reach a threshold more easily, or ", " để dễ đạt ngưỡng hơn, hoặc ")}<strong><u>2 X / 1 Inquiry</u></strong>{t(" to retain Sample Collection as the card effect. ", " để giữ hiệu ứng bài Sample Collection. ")}<strong>{t("The choice depends heavily on allied Desire Cards and your team’s goal.", "Lựa chọn phụ thuộc rất nhiều vào Bài Khát vọng của đồng đội và mục tiêu xây dựng đội.")}</strong></li></ul>
        <aside className={styles.callout}>{t("X is a placeholder for the desired threshold. For example, when aiming for 7 Claim, you might use ", "X đại diện cho loại Khát vọng mà bạn cần đạt ngưỡng. Ví dụ, khi hướng tới 7 Claim, bạn có thể dùng ")}<strong><u>2 Claim / 1 Inquiry</u></strong>.</aside>
      </div>,
      <div className={styles.prose} key="persona"><p><em>{t("Introduces Persona Cards and Engravings. Persona Cards enable powerful new playstyles and buffs or debuffs. Engravings apply effects to Persona Cards and equipment, similarly to Season 2 Refinements but with new effects.", "Giới thiệu Bài Persona và Khắc ấn. Bài Persona tạo lối chơi mới hoặc các hiệu ứng tăng cường, suy yếu mạnh. Khắc ấn áp dụng lên cả Bài Persona lẫn trang bị, hoạt động tương tự Tinh luyện Mùa 2 nhưng có hiệu ứng mới.")}</em></p>
        <ul><li>{t("For Attack Persona Cards, the common Card Engravings are ", "Với Bài Persona Tấn công, Khắc ấn Bài thường dùng là ")}<strong><em>{t("“For each Lux Engraving, apply 1 Mark to random enemies”", "“Với mỗi Khắc ấn Lux, gây 1 Dấu ấn lên kẻ địch ngẫu nhiên”")}</em></strong>{t(" or ", " hoặc ")}<strong><em>{t("“Attunement: Decrease Cost by 1 until used.”", "“Điều hòa: Giảm 1 tiêu hao cho tới khi sử dụng.”")}</em></strong>
          <ul><li>{t("For Skill Persona Cards, use ", "Với Bài Persona Kỹ năng, chọn ")}<strong><em>{t("“When this card is Discarded, activate this card”", "“Khi lá bài này bị loại bỏ, kích hoạt lá bài này”")}</em></strong>{t(" if the team can reliably discard it.", " nếu đội có cách chủ động loại bỏ lá bài.")}</li></ul></li>
          <li>{t("The common Equipment Engraving is ", "Khắc ấn Trang bị thường được ưu tiên là ")}<strong><em>{t("“When allies create 5 or more cards through abilities, +30% damage to this unit’s Extra Attacks (once per turn).”", "“Khi đồng đội tạo ít nhất 5 lá bài bằng kỹ năng, tăng 30% sát thương đòn đánh thêm của nhân vật này (1 lần mỗi lượt).”")}</em></strong> <strong><u>{t("This effect stacks.", "Hiệu ứng này cộng dồn.")}</u></strong>{t(" Other damage effects remain usable, but are considerably weaker for Extra Attack units.", " Các hiệu ứng tăng sát thương khác vẫn dùng được, nhưng kém hơn đáng kể đối với nhân vật dùng đòn đánh thêm.")}</li></ul>
      </div>,
      <div className={styles.prose} key="refinements"><p><em>{t("Introduces Refinements: additional equipment effects with no Faint Memory cost after Season 2. God’s Hammer adds a random copy of another equipment effect, costs 10 Faint Memory and is only obtained from the boss.", "Giới thiệu Tinh luyện: bổ sung hiệu ứng trang bị mà không tốn Ký ức Mờ nhạt sau Mùa 2. Búa Thần thêm một bản sao ngẫu nhiên của hiệu ứng trang bị khác, tốn 10 Ký ức Mờ nhạt và chỉ nhận được từ trùm.")}</em></p>
        <ul>{[t("Increase Attack Card damage by 20%.", "Tăng 20% sát thương Bài Tấn công."), t("Increase damage of Attack Cards costing 1 or less by 30%.", "Tăng 30% sát thương Bài Tấn công có tiêu hao từ 1 trở xuống."), t("Increase Extra Attack damage by 25%.", "Tăng 25% sát thương đòn đánh thêm.")].map(value => <li key={value}><strong><em>{value}</em></strong></li>)}</ul>
        <aside className={`${styles.callout} ${styles.warning}`}>{t("God’s Hammer is completely random at the end of the run, so there is no specific recommendation. ATK-based attackers generally prefer ATK% equipment effects; DEF-based attackers prefer DEF%.", "Búa Thần hoàn toàn ngẫu nhiên ở cuối lượt khám phá, nên không có lựa chọn cụ thể để khuyến nghị. Nhân vật gây sát thương theo Tấn công thường ưu tiên hiệu ứng Tấn công%; nhân vật gây sát thương theo Phòng thủ ưu tiên Phòng thủ%.")}</aside>
      </div>,
      <div className={styles.prose} key="forbidden"><p><em>{t("Introduces Forbidden Cards, powerful cards that create new synergies. They can only be acquired once per run, with duplication available through one event or save data editing.", "Giới thiệu Bài Cấm, những lá bài mạnh tạo ra cách phối hợp mới. Mỗi lượt khám phá chỉ nhận được một lần; có thể nhân bản qua một sự kiện hoặc chỉnh sửa dữ liệu lưu.")}</em></p>
        <ul>{[
          ["Gesture of Freedom", t("Permanent cost reduction for one card; the target can be controlled.", "Giảm tiêu hao vĩnh viễn cho một lá bài; có thể chủ động chọn mục tiêu.")],
          ["Portrait of Fury", t("More draw and damage.", "Tăng mạnh khả năng rút bài và tăng sát thương.")],
          ["Ecstasy of Violence", t("More damage.", "Tăng sát thương.")],
          ["Eternal Hunger", t("More draw and much more AP. Depends on allies.", "Tăng khả năng rút bài và tăng mạnh Điểm Hành động. Phụ thuộc đồng đội.")],
        ].map(([name, note]) => <li key={name}><strong>{t("Forbidden", "Bài Cấm")}: <u>{name}</u>.</strong> <em>{note}</em></li>)}</ul>
      </div>,
    ]}
  </VerticalTabs>;
}

