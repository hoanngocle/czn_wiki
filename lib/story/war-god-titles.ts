import { applyTitleEvents } from "./war-god-extension";
export type WarGodTitle = { id: string; name: string; skill: string; description: string; chapter: number };

export function getWarGodTitles(chapter: number): WarGodTitle[] {
  if (chapter < 134) return [];
  return applyTitleEvents([
    { id: "sword-fifteen", name: "Kiếm Thập Ngũ", skill: "Âm Chấn · Sơ cấp", description: "Công kích gây thêm tổn thương thần hồn nhẹ, áp dụng cả khi dùng cung.", chapter: 134 },
    chapter < 167
      ? { id: "cavalry", name: "Giáo úy Kiêu Kỵ", skill: "Khoái Công · Sơ cấp", description: "Tăng tốc độ công kích 10% khi trang bị danh hiệu.", chapter: 134 }
      : { id: "guerrilla", name: "Du Kích tướng quân", skill: "Khoái Kích · Trung cấp", description: "Thay danh hiệu Giáo úy Kiêu Kỵ, tăng tốc độ công kích 15%.", chapter: 167 },
    ...(chapter >= 167 ? [{ id: "commander", name: "Tướng Soái Chi Tài", skill: "Kiếm Khí Tung Hoành", description: "Khi phát kiếm khí, tạo thêm một lần công kích. Không áp dụng cho mọi loại đòn đánh.", chapter: 167 }] : []),
    ...(chapter >= 268 ? [{ id: "ace-assassin", name: "Vương Bài Thích Khách", skill: "Thu Hoạch · Cao cấp", description: "Thay Kẻ Ám Sát sau khi dùng 100 hồn lực nâng cấp. Khi giết địch trong nháy mắt, hồi lại toàn bộ linh lực tiêu hao cho đòn đó; không phải hồi hồn lực.", chapter: 268 }]
      : chapter >= 267 ? [{ id: "assassin", name: "Kẻ Ám Sát", skill: "Thu Hoạch · Trung cấp", description: "Dùng 50 hồn lực mở sau ba lần giết địch mạnh hơn trong nháy mắt. Hiệu quả Thu Hoạch hồi 60% linh lực tiêu hao cho đòn kết liễu; không phải hồn lực.", chapter: 267 }] : []),
  ], chapter);
}
