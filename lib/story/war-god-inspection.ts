export type TechniqueRecord = {
  name: string; performer: string; cost: number | null; costNote?: string;
  status: string; chapter: number; learnedChapter?: number;
};
export type InspectedWeapon = {
  id: "bow" | "saber" | "spear"; name: string; chapter: number; description: string;
  techniques: TechniqueRecord[];
};

export function getInspectedWeapons(chapter: number): InspectedWeapon[] {
  if (chapter < 3) return [];
  const weapons: InspectedWeapon[] = [{
    id: "saber", name: "Loan đao quân đội", chapter: 3,
    description: "Loan đao tiêu chuẩn quân đội đã hỏng. Kỹ nghệ lưu lại dấu vết những người từng sử dụng nó.",
    techniques: [{ name: "Hoành Tảo Thiên Quân & Khai Môn Kiến Sơn", performer: "Vương Tiến / Trương Khoát", cost: 1, costNote: "Cho cả hai đao thuật", status: "Chưa ghi nhận lĩnh ngộ", chapter: 3 }],
  }];
  if (chapter >= 4) {
    weapons.unshift({
      id: "bow", name: "Quân cung", chapter: 4,
      description: "Quân cung tiêu chuẩn quân đội. Những kỹ nghệ từng thi triển trên vũ khí hiện ra trước mắt.",
      techniques: [
        { name: "Ổn Định & Liên Xạ", performer: "Trương Vũ", cost: 2, costNote: "Cho cả hai kỹ nghệ", status: "Đã lĩnh ngộ", chapter: 4, learnedChapter: 4 },
        { name: "Chính Xác", performer: "Trương Vũ", cost: 4, status: "Chưa ghi nhận lĩnh ngộ", chapter: 4 },
        { name: "Yến Song Phi", performer: "Trương Vũ", cost: 6, status: chapter >= 16 ? "Được thay thế bởi Loạn Vũ" : chapter >= 15 ? "Đã lĩnh ngộ" : "Chưa lĩnh ngộ", chapter: 4, learnedChapter: chapter >= 15 ? 15 : undefined },
        ...(chapter >= 16 ? [{ name: "Loạn Vũ", performer: "Cố Thanh Sơn", cost: null, costNote: "Sáng tạo từ cung thuật", status: chapter >= 118 ? "Kỹ năng Mở rộng · Trung cấp · Mười mũi tên" : "Kỹ năng Mở rộng · Sơ cấp", chapter: chapter >= 118 ? 118 : 16, learnedChapter: chapter >= 118 ? 118 : 16 }] : []),
      ],
    });
    weapons.push({ id: "spear", name: "Giáo rỉ sét", chapter: 4, description: "Cây giáo trên giá vũ khí quân doanh. Thanh Sơn xem kỹ nghệ rồi đặt lại.", techniques: [{ name: "Đâm", performer: "Chưa xác nhận", cost: null, status: "Chưa ghi nhận lĩnh ngộ", chapter: 4 }] });
  }
  return weapons;
}
