// Chapter references use the supplied EPUB's entry numbering, at the end of a chapter.
// Evidence: docs/story/chapter-notes-*.json and the corresponding EPUB chapters.
import { extendedEquipment, extendedInventory, extendedJournal, extendedRealms, extendedSkills, extendedSoul } from "./war-god-101-200";
import { equipment300, inventory300, journal300, realms300, skills300, soul300, updateEntry300 } from "./war-god-201-300";
import { applyProfileEvents, storyExtension } from "./war-god-extension";
export const CURRENT_CHAP_KEY = "story-wiki:chu-gioi-tan-the-online:currentChap";
export const MAX_PROFILE_CHAPTER = 1500;
export type ProfileFact = { value: string; chapter: number; note?: string };
export type ProfileEntry = {
  id: string; name: string; kind: "weapon" | "material" | "manual" | "skill";
  chapter: number; until?: number; description: string; tag: string;
};
export type JournalEntry = { chapter: number; title: string; description: string };

export function parseCurrentChap(value: unknown): number {
  if (typeof value !== "number" && typeof value !== "string") return 1;
  if (typeof value === "string" && !/^\d+$/.test(value.trim())) return 1;
  const chapter = Number(value);
  return Number.isInteger(chapter) && chapter >= 1 && chapter <= MAX_PROFILE_CHAPTER ? chapter : 1;
}

const realms: ProfileFact[] = [
  { chapter: 1, value: "Luyện Khí Tầng 1" },
  { chapter: 4, value: "Luyện Khí tầng 2" },
  { chapter: 13, value: "Luyện Khí tầng 3" },
  { chapter: 14, value: "Luyện Khí tầng 4" },
  { chapter: 15, value: "Luyện Khí tầng 5" },
  { chapter: 47, value: "Luyện Khí tầng 7" },
  { chapter: 97, value: "Trúc Cơ" },
  ...extendedRealms,
  ...realms300,
  ...storyExtension.realms,
];
const soulRecords: ProfileFact[] = [
  { chapter: 14, value: "2 / 6" }, { chapter: 15, value: "1 / 7" },
  { chapter: 100, value: "530 / 20" },
  ...extendedSoul,
  ...soul300,
  ...storyExtension.soul,
];
const equipment: ProfileEntry[] = [
  { id: "army-bow", name: "Quân cung", kind: "weapon", chapter: 4, until: 66, tag: "Cung thuật", description: "Quân cung dùng để lĩnh ngộ Ổn Định và Liên Xạ. Được ghi nhận trong giai đoạn quân doanh; hồ sơ không suy đoán thời điểm thay thế khi chưa đủ đối chiếu." },
  { id: "earth-sword", name: "Địa kiếm", kind: "weapon", chapter: 64, tag: "Kiếm có linh", description: "Thanh kiếm được Bách Hoa trao cho Thanh Sơn. Kiếm linh tự phong ấn theo từng tầng, giải phóng uy năng theo tu vi của người sử dụng." },
  { id: "night-bow", name: "Dạ Vũ", kind: "weapon", chapter: 66, tag: "Cung thuật", description: "Bách Hoa nhắc trực tiếp tên cung Dạ Vũ và việc Thanh Sơn đã dùng cung bắn Đại Hắc Ngư. Đây là mốc xác nhận trong hồ sơ, không khẳng định là chương đầu tiên nhận cung." },
];
const inventory: ProfileEntry[] = [
  { id: "army-manual", name: "Quân Thể Luyện Khí pháp", kind: "manual", chapter: 14, tag: "Công pháp đã ghi nhận", description: "Tìm được trong doanh trại. Công pháp làm nền tảng tu hành; Thanh Sơn lựa chọn dùng hồn lực để lĩnh ngộ và nâng tu vi. Chưa xác nhận việc giữ bản vật lý ở các chương sau." },
  { id: "cosmic-heart", name: "Mảnh tim quái vật vũ trụ", kind: "material", chapter: 92, until: 95, tag: "Vật liệu nhiệm vụ", description: "Mảnh tim thuộc Vũ Trụ chủng, lấy dưới nhà tù của sòng bạc. Là vật liệu còn thiếu cho vòng quay Thần thông Chiến Thần." },
  { id: "hundred-wheel", name: "Bách Luân Phong Thánh Thành Thần pháp", kind: "manual", chapter: 96, tag: "Phần mở đầu", description: "Pháp môn Bách Hoa soạn riêng, được truyền qua thẻ ngọc. Thanh Sơn dùng 10 hồn lực để lĩnh ngộ phần mở đầu, chuẩn bị đột phá đại cảnh giới. Hồ sơ ghi nhận công pháp, không xác nhận số thẻ ngọc còn giữ." },
];
const skills: ProfileEntry[] = [
  { id: "steady", name: "Ổn Định", kind: "skill", chapter: 4, tag: "Cung thuật", description: "Kỹ thuật giữ vững cung, được lĩnh ngộ cùng Liên Xạ từ quân cung." },
  { id: "rapid", name: "Liên Xạ", kind: "skill", chapter: 4, tag: "Cung thuật", description: "Kỹ thuật bắn liên tiếp, được lĩnh ngộ qua Kỹ nghệ Chiến Thần." },
  { id: "swallows", name: "Yến Song Phi", kind: "skill", chapter: 15, until: 16, tag: "Cung thuật", description: "Được lĩnh ngộ với chi phí 6 hồn lực. Hai mũi tên có đường bay biến hóa." },
  { id: "dance", name: "Loạn Vũ", kind: "skill", chapter: 16, tag: "Sơ cấp · Cung thuật", description: "Sáng tạo từ ba kỹ thuật bắn cung; bắn liên tiếp năm mũi tên với đường cong khó đoán. Thay thế Yến Song Phi trên giao diện." },
  { id: "water", name: "Đoạn Thủy Lưu", kind: "skill", chapter: 65, tag: "Bí kiếm", description: "Bí kiếm được nhắc là nguyên nhân khiến Bách Hoa quý tài và cho Thanh Sơn chọn kiếm. Hồ sơ xác nhận từ chương này, không suy đoán thời điểm học." },
  { id: "lightning", name: "Tru Tà", kind: "skill", chapter: 98, tag: "Thần thông · Lôi điện", description: "Chọn Tru Tà và hướng sinh pháp khi thức tỉnh linh lực Lôi điện. Hiệu quả cụ thể chưa được công bố tại mốc này." },
  { id: "control", name: "Mất Khống Chế", kind: "skill", chapter: 99, tag: "Tầng 1 · Một giây", description: "Linh lực Lôi điện khiến mục tiêu trúng đòn mất khả năng điều khiển cơ thể trong một giây." },
  { id: "moon", name: "Nguyệt Trảm", kind: "skill", chapter: 100, tag: "Bí kiếm", description: "Khôi phục cùng 20 kiếm quyết sau khi đột phá. Tổng chi phí thức tỉnh 20 kiếm quyết và bí kiếm là 110 hồn lực; chương 100 xác nhận hoàn tất." },
];

export const profileMilestones: JournalEntry[] = [
  { chapter: 1, title: "Trở lại trước tận thế", description: "Tỉnh lại trong hố xác, mất trang bị và tu vi cũ. Hành trình bắt đầu lại." },
  { chapter: 3, title: "Giao diện thức tỉnh", description: "Kích hoạt Kỹ nghệ Chiến Thần, nhìn thấy kỹ năng từng được thi triển trên vũ khí." },
  { chapter: 4, title: "Bắt đầu tu hành", description: "Lĩnh ngộ cung thuật; cuối chương đạt Luyện Khí tầng 2." },
  { chapter: 13, title: "Luyện Khí tầng 3", description: "Săn yêu thú, tích lũy kinh nghiệm và nâng tu vi." },
  { chapter: 14, title: "Con đường hồn lực", description: "Chọn hồn lực thay cho kinh nghiệm, lĩnh ngộ công pháp và lên tầng 4." },
  { chapter: 15, title: "Luyện Khí tầng 5", description: "Nâng tu vi và lĩnh ngộ Yến Song Phi." },
  { chapter: 16, title: "Sáng tạo Loạn Vũ", description: "Kỹ năng cung thuật mới thay thế Yến Song Phi." },
  { chapter: 47, title: "Luyện Khí tầng 7", description: "Đột phá giúp bổ sung linh lực trong hành trình ở Thần Võ." },
  { chapter: 64, title: "Địa kiếm nhận chủ", description: "Được trao Địa kiếm; uy năng được phong ấn theo tu vi." },
  { chapter: 65, title: "Bái sư Bách Hoa", description: "Nhận lời trở thành đệ tử Bách Hoa." },
  { chapter: 66, title: "Hồ sơ sư môn", description: "Xác nhận tên sư phụ Tạ Đạo Linh và ghi nhận cung Dạ Vũ." },
  { chapter: 81, title: "Nhiệm vụ năm chủng", description: "Nhiệm vụ Định Mệnh hoàn thành; bắt đầu thu thập vật liệu cho Thần thông Chiến Thần." },
  { chapter: 92, title: "Tìm được Vũ Trụ chủng", description: "Nhận mảnh tim quái vật vũ trụ, vật liệu cuối cần tìm." },
  { chapter: 95, title: "Vòng quay sẵn sàng", description: "Dùng mảnh tim lấp ô cuối, hoàn thành nhiệm vụ Thần thông Chiến Thần." },
  { chapter: 96, title: "Chuẩn bị đột phá", description: "Lĩnh ngộ phần đầu Bách Luân Phong Thánh Thành Thần pháp." },
  { chapter: 97, title: "Đột phá Trúc Cơ", description: "Trở về cơ thể, được hệ thống xác nhận đạt Trúc Cơ." },
  { chapter: 98, title: "Lôi điện thức tỉnh", description: "Chọn Tru Tà, theo hướng sinh pháp để bổ trợ kiếm thuật." },
  { chapter: 99, title: "Mất Khống Chế", description: "Xác nhận hiệu quả một giây và bắt đầu khôi phục kiếm quyết." },
  { chapter: 100, title: "Kiếm đạo trở lại", description: "Hoàn tất khôi phục kiếm quyết, luyện điều khiển lực Địa kiếm sáu nghìn cân." },
];

const lastFact = (facts: ProfileFact[], chapter: number) => facts.filter((fact) => fact.chapter <= chapter).at(-1);
export function getWarGodProfile(value: number) {
  const currentChap = parseCurrentChap(value);
  const visible = (entries: ProfileEntry[]) => entries.filter((entry) => entry.chapter <= currentChap && (entry.until === undefined || currentChap < entry.until)).map((entry) => ({ ...entry }));
  const weapons = visible([...equipment, ...extendedEquipment, ...equipment300]).map((entry) => {
    if (entry.id === "earth-sword" && currentChap >= 181) return { ...entry, chapter: 181, description: `${entry.description} Chương 181 ghi lực đánh quỷ mập là 60.000 cân; giữ đúng con số của chương này.` };
    if (entry.id === "earth-sword" && currentChap >= 100) return { ...entry, chapter: 100, description: `${entry.description} Chương 100 xác nhận lực được sử dụng là 6.000 cân.` };
    if (entry.id === "cavalry-armor" && currentChap >= 139) return { ...entry, chapter: 139, description: `${entry.description} Vai giáp bị vỡ khi cứu các nữ tu ở chương 139; chưa có xác nhận sửa chữa.` };
    return entry;
  }).map((entry) => updateEntry300(entry, currentChap));
  const abilities = visible([...skills, ...extendedSkills, ...skills300]).filter((entry) => entry.id !== "control" || currentChap < 237).map((entry) => {
    if (entry.id === "dance" && currentChap >= 118) return { ...entry, chapter: 118, tag: "Trung cấp · Cung thuật", description: "Sau mười ngày tu luyện, Loạn Vũ đạt trung cấp: bắn liên tiếp mười mũi tên. Đây là trạng thái cuối chương 118." };
    if (entry.id === "steady" && currentChap >= 16) return { ...entry, chapter: 16, description: `${entry.description} Chương 16 gọi là Vững Chắc.` };
    if (entry.id === "lightning" && currentChap >= 99) return { ...entry, chapter: 99, description: "Linh lực Lôi điện theo sinh pháp. Tru Tà tăng sát thương đối với yêu ma ba phần; phối hợp kiếm thuật và Mất Khống Chế." };
    return entry;
  }).map((entry) => updateEntry300(entry, currentChap));
  return {
    currentChap, realm: lastFact(realms, currentChap)!, soul: lastFact(soulRecords, currentChap),
    sect: currentChap >= 65 ? "Bách Hoa tông" : "Chưa gia nhập sư môn",
    equipment: applyProfileEvents(weapons, "equipment", currentChap), inventory: applyProfileEvents(visible([...inventory, ...extendedInventory, ...inventory300]).filter((entry) => entry.id !== "death-token" || currentChap < 259).map((entry) => {
      if (entry.id === "hundred-saints" && currentChap >= 189) return { ...entry, chapter: 189, tag: "Đã lĩnh ngộ · Trúc Cơ đỉnh phong", description: "Đã học các phần Trúc Cơ trung kỳ (40 hồn lực, chương 141), hậu kỳ (80, chương 142) và đỉnh phong (50, chương 189). Chưa xác nhận đột phá Kim Đan." };
      if (entry.id === "hundred-saints" && currentChap >= 141) return { ...entry, chapter: currentChap >= 142 ? 142 : 141, tag: "Đã lĩnh ngộ", description: currentChap >= 142 ? "Đã học phần trung kỳ bằng 40 hồn lực và phần hậu kỳ bằng 80. Cuối chương 142 đạt Trúc Cơ hậu kỳ." : "Dùng 40 hồn lực lĩnh ngộ phần Trúc Cơ trung kỳ; việc học công pháp chưa đồng nghĩa đã đột phá ngay." };
      if (entry.id === "concealment-manual" && currentChap >= 141) return { ...entry, chapter: 141, tag: "Đã lĩnh ngộ", description: "Dùng 10 hồn lực lĩnh ngộ Liễm Tức quyết. Hồ sơ ghi nhận công pháp, không xác nhận số thẻ ngọc còn giữ." };
      return entry;
    }).map((entry) => updateEntry300(entry, currentChap)), "inventory", currentChap), skills: applyProfileEvents(abilities, "skills", currentChap),
    journal: [...profileMilestones, ...extendedJournal, ...journal300, ...storyExtension.journal].filter((entry) => entry.chapter <= currentChap).slice(-4).reverse(),
  };
}
export type WarGodProfile = ReturnType<typeof getWarGodProfile>;
