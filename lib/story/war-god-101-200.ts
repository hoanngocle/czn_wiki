import type { JournalEntry, ProfileEntry, ProfileFact } from "./war-god";
import type { Mission } from "./war-god-missions";

// End-of-chapter records. See docs/story/chapter-notes-101-133.json,
// chapter-notes-134-166.json and chapter-notes-167-200.json for paragraph evidence.
export const extendedRealms: ProfileFact[] = [
  { chapter: 142, value: "Trúc Cơ hậu kỳ" },
  { chapter: 189, value: "Trúc Cơ đỉnh phong" },
];
export const extendedSoul: ProfileFact[] = [
  { chapter: 115, value: "642", note: "Hệ thống ghi 642 sau khi giết hai tu sĩ Trúc Cơ. Khác số 530 từng ghi ở chương 100; giữ nguyên số truyện ghi, không tự tính lại." },
  { chapter: 118, value: "0 / 20", note: "Đầu chương ghi 530/20; sau luyện tập, dùng 530 hồn lực học Súc Địa Thành Thốn và còn 0/20." },
  { chapter: 125, value: "0 / 20", note: "Hệ thống từ chối phần hồn lực từ quỷ cấp thấp và vẫn hiện 0/20; không tự cộng 2 điểm được nhắc trong thông báo trước đó." },
  { chapter: 141, value: "270 / 20", note: "Ghi 320/20, dùng 10 học Liễm Tức quyết còn 310/20, rồi dùng 40 học phần Trúc Cơ trung kỳ của Bách Thánh Kết Đan quyết, còn 270." },
  { chapter: 142, value: "178 / 20", note: "Dùng 12 học trận Phong linh còn 258/20; dùng 80 học phần hậu kỳ còn 178. Chương này vẫn ghi giới hạn 20." },
  { chapter: 150, value: "300", note: "Truyện ghi hồn lực đạt 300; không công bố lại mẫu số tại mốc này." },
  { chapter: 167, value: "270", note: "Dùng 30 hồn lực lĩnh ngộ Thiện Thần Hộ Niệm, còn 270; không nêu mẫu số." },
  { chapter: 189, value: "220", note: "Dùng 50 học Bách Thánh Kết Đan quyết và đạt Trúc Cơ đỉnh phong. Hệ thống ghi còn 220." },
  { chapter: 191, value: "0", note: "Chương này lại ghi có 270 rồi tiêu hết để học Thất Tinh Du Long. Không khớp số 220 ở chương 189; giữ nguyên số dư 0 theo thông báo, không tự bù chênh lệch." },
  { chapter: 195, value: "10", note: "Giết quán quân thứ ba, nhận 10 hồn lực; tổng được hệ thống ghi là 10." },
];
export const extendedSkills: ProfileEntry[] = [
  { id: "sword-recovery", name: "1.106 môn kiếm thuật", chapter: 103, kind: "skill", tag: "Kiếm đạo · Tự lĩnh ngộ", description: "Hệ thống xác nhận đã thức tỉnh 1.106 môn kiếm thuật; những bí kiếm còn lại chưa khôi phục. Không tiêu hồn lực trong lần lĩnh ngộ này." },
  { id: "sword-silk", name: "Kiếm Khí Hóa Ti", chapter: 113, kind: "skill", tag: "Kiếm thuật", description: "Thanh Sơn thể hiện năng lực hóa kiếm khí thành tơ trong Tuế thí. Đây là mốc sử dụng được xác nhận, không suy đoán ngày học." },
  { id: "shrink-earth", name: "Súc Địa Thành Thốn", chapter: 118, kind: "skill", tag: "Thần kỹ · Trung cấp", description: "Bách Hoa truyền dạy. Giá ban đầu 1.000 hồn lực giảm theo mức tự luyện; Thanh Sơn dùng 530 để học sơ cấp, dịch chuyển ba mét. Sau mười ngày luyện trong cùng chương, đạt trung cấp, phạm vi ba mươi mét." },
  { id: "wind-shot", name: "Ngự Phong", chapter: 127, kind: "skill", tag: "Cung thuật", description: "Được sử dụng khi truy đuổi quỷ giết người. Truyện xác nhận sử dụng, không nêu chi phí hay thời điểm lĩnh ngộ." },
  { id: "sure-shot", name: "Bách Phát Bách Trúng", chapter: 127, kind: "skill", tag: "Cung thuật", description: "Được sử dụng trong cuộc truy đuổi quỷ giết người; không tự gán chi phí học." },
  { id: "bombardment", name: "Oanh Kích", chapter: 127, kind: "skill", tag: "Cung thuật", description: "Cung kỹ được xác nhận khi chiến đấu với quỷ giết người; không có số hồn lực lĩnh ngộ được nêu." },
  { id: "concealment", name: "Liễm Tức quyết", chapter: 141, kind: "skill", tag: "Bản siêu cải tiến", description: "Nhận thẻ ngọc Liễm Tức quyết do Tần Tiểu Lâu trao ở chương 135, đến chương 141 mới dùng 10 hồn lực lĩnh ngộ. Che giấu tu vi, hữu ích khi điều tra tiền tuyến." },
  { id: "spirit-seal", name: "Trận Phong linh", chapter: 142, kind: "skill", tag: "Trận pháp", description: "Dùng 12 hồn lực lĩnh ngộ từ trận bàn; bố trí hai tầng cảnh giới, quan sát nhiều hướng và báo động khi có người tới." },
  { id: "benevolent-protection", name: "Thiện Thần Hộ Niệm", chapter: 167, kind: "skill", tag: "Bí pháp Phật môn", description: "Dùng 30 hồn lực lĩnh ngộ bí pháp được Bi Ngưỡng đại sư trao. Tự kích hoạt khi bị công kích thần hồn hoặc Thiên Ma tiếp cận, bảo hộ khỏi mê hoặc và thao túng." },
  { id: "mountain-sword", name: "Khai Sơn", chapter: 168, kind: "skill", tag: "Kiếm quyết", description: "Dùng thử với danh hiệu Tướng Soái Chi Tài để kiểm chứng Kiếm Khí Tung Hoành. Đây là mốc sử dụng được xác nhận, không phải một lần trả hồn lực học mới." },
  { id: "wind-slash", name: "Phong Trảm", chapter: 168, kind: "skill", tag: "Kiếm quyết", description: "Sử dụng khi thử tốc độ của danh hiệu Du Kích tướng quân; không nêu chi phí lĩnh ngộ mới." },
  { id: "flowing-cloud", name: "Lưu Vân kiếm quyết", chapter: 189, kind: "skill", tag: "Kiếm thuật · Ngự phong", description: "Trúc Cơ đỉnh phong đủ linh lực để dùng kiếm quyết chiến đấu trên không và ngự phong trong thời gian ngắn. Chương 189 xác nhận sử dụng." },
  { id: "seven-star-dragon", name: "Thất Tinh Du Long", chapter: 191, kind: "skill", tag: "Bí kiếm · Vượt cảnh giới", description: "Hệ thống ghi tiêu hết 270 hồn lực để lĩnh ngộ. Cần Kim Đan sơ cảnh để sử dụng an toàn; ở Trúc Cơ, thi triển có nguy cơ tổn thương kinh mạch. Việc học bí kiếm không đồng nghĩa đã lên Kim Đan." },
];
export const extendedInventory: ProfileEntry[] = [
  { id: "trial-seal", name: "Con dấu Đệ Nhất Danh", chapter: 114, until: 116, kind: "material", tag: "Tuế thí", description: "Nhận con dấu linh ngọc dành cho người đứng đầu Tuế thí." },
  { id: "demon-arrows", name: "Phá Ma tiễn", chapter: 137, until: 148, kind: "material", tag: "Tên phá ma", description: "Đổi quyền nhận hai binh khí lấy năm mũi tên làm từ thiên thạch. Số lượng giảm theo các lần chiến đấu, không coi năm là số dư liên tục." },
  { id: "demon-arrows-refill", name: "Hai hộp Phá Ma tiễn", chapter: 167, kind: "material", tag: "Tiếp tế quân đội", description: "Nhận thêm hai hộp Phá Ma tiễn cùng trang bị Du Kích tướng quân. Không có số mũi tên còn lại được xác nhận liên tục." },
  { id: "hundred-saints", name: "Bách Thánh Kết Đan quyết", chapter: 135, kind: "manual", tag: "Công pháp Bách Hoa", description: "Sư phụ truyền pháp quyết giúp linh lực vượt công pháp thông thường hơn hai mươi phần trăm. Nhận thẻ ngọc ở chương 135, lúc đó chưa đủ hồn lực để học." },
  { id: "concealment-manual", name: "Thẻ ngọc Liễm Tức quyết", chapter: 135, kind: "manual", tag: "Bản siêu cải tiến", description: "Nhận từ Tần Tiểu Lâu. Hệ thống báo giá 10 hồn lực; lúc nhận chưa lĩnh ngộ." },
  { id: "death-token", name: "Tín vật Tử Thần", chapter: 199, kind: "material", tag: "Anna trao lại", description: "Anna chọn gia nhập nhóm và trao lại tín vật cho Thanh Sơn. Ghi nhận lần nhận lại ở chương 199." },
];
export const extendedEquipment: ProfileEntry[] = [
  { id: "cavalry-armor", name: "Chiến giáp Kiêu Kỵ", chapter: 136, until: 166, kind: "weapon", tag: "Linh Khí · Chiến giáp", description: "Bộ giáp đen chữ đỏ được cấp khi báo danh tiền tuyến. Hồ sơ ghi nhận trang bị, không suy đoán độ bền còn lại." },
  { id: "guerrilla-armor", name: "Kim giáp Du Kích tướng quân", chapter: 166, kind: "weapon", tag: "Quân hàm Du Kích", description: "Được thưởng khi thăng Du Kích tướng quân, thay trang bị Kiêu Kỵ." },
];
export const extendedJournal: JournalEntry[] = [
  { chapter: 103, title: "Kiếm đạo tiến bộ", description: "Tự khôi phục 1.106 môn kiếm thuật dưới sự chỉ dẫn của Bách Hoa." },
  { chapter: 115, title: "Kết thúc Tuế thí", description: "Thắng cuộc; hệ thống ghi nhận hồn lực 642." },
  { chapter: 118, title: "Súc Địa Thành Thốn", description: "Dùng hết hồn lực lĩnh ngộ thần kỹ; luyện lên trung cấp, Loạn Vũ cũng đạt trung cấp." },
  { chapter: 134, title: "Quyết chiến và Danh Hiệu", description: "Nhận nửa đầu nhiệm vụ Vận Mệnh; được mở trước chức năng Danh Hiệu Chiến Thần." },
  { chapter: 141, title: "Học pháp quyết tại tiền tuyến", description: "Lĩnh ngộ Liễm Tức quyết và phần Trúc Cơ trung kỳ của Bách Thánh Kết Đan quyết." },
  { chapter: 142, title: "Trúc Cơ hậu kỳ", description: "Đột phá liên tục, học trận Phong linh; Kỹ nghệ Chiến Thần bước vào thời kỳ đông lạnh." },
  { chapter: 166, title: "Du Kích tướng quân", description: "Được thăng quân hàm, vượt yêu cầu Giáo úy của nhiệm vụ." },
  { chapter: 167, title: "Quyết chiến (thượng) hoàn thành", description: "Hệ thống xác nhận hoàn thành vượt mức, ban danh hiệu mới và bảy ngày ở thế giới thực; học Thiện Thần Hộ Niệm." },
  { chapter: 189, title: "Trúc Cơ đỉnh phong", description: "Dùng 50 hồn lực lĩnh ngộ công pháp; hệ thống mở yêu cầu nâng cấp thần thông." },
  { chapter: 190, title: "Ba thuốc thức tỉnh", description: "Cần ba thuốc độ tinh khiết 99% để nâng Tru Tà; giới hạn hồn lực được nói là tăng thêm 40, chưa nêu tổng mới." },
  { chapter: 191, title: "Thất Tinh Du Long", description: "Tiêu hết hồn lực học bí kiếm; mới đặt sản xuất thuốc, chưa hoàn thành yêu cầu nâng thần thông." },
  { chapter: 195, title: "Phá lời hứa trường sinh", description: "Diệt quán quân thứ ba, hệ thống ghi tổng hồn lực 10." },
  { chapter: 200, title: "Vụ ám sát Tổng thống", description: "Diệt ba sát thủ và tiến vào phòng nghỉ; chưa xác nhận sống chết của Tổng thống tại cuối chương." },
];

export const extendedMissions: Mission[] = [
  {
    id: "decisive-battle", title: "Quyết chiến (thượng)", kind: "destiny", issuer: "Giao diện Chiến Thần", firstChapter: 134,
    objective: "Trong giai đoạn đầu cuộc quyết chiến, thăng quân hàm lên Giáo úy Chiêu Vũ.",
    events: [
      { chapter: 134, paragraphs: "40–55", text: "Hệ thống mở nhiệm vụ Vận Mệnh Quyết chiến, công bố yêu cầu nửa đầu và trao trước Danh Hiệu Chiến Thần.", status: "active" },
      { chapter: 166, paragraphs: "25–35", text: "Được thăng Du Kích tướng quân, vượt yêu cầu quân hàm; tại chương này chưa có thông báo hệ thống hoàn thành." },
      { chapter: 167, paragraphs: "36–44", text: "Hệ thống xác nhận Quyết chiến (thượng) hoàn thành vượt mức; ban thêm danh hiệu và bảy ngày ở thế giới thực.", status: "completed" },
      { chapter: 168, paragraphs: "22–26", text: "Nửa sau chưa được phát; không tạo nhiệm vụ mới khi hệ thống chưa công bố mục tiêu." },
    ],
    facts: [
      { chapter: 134, label: "Thưởng trước", text: "Mở Danh Hiệu Chiến Thần, tạm sử dụng trong chuỗi nhiệm vụ. Chỉ có thể trang bị một danh hiệu cùng lúc." },
      { chapter: 134, label: "Thất bại", text: "Thu hồi phần thưởng và không được tăng tu vi trong ba năm." },
      { chapter: 167, label: "Hoàn thành vượt mức", text: "Giữ quyền tạm dùng chức năng Danh Hiệu đến hết chuỗi; nhận Tướng Soái Chi Tài và bảy ngày ở thế giới thực. Chưa kết luận hoàn thành toàn bộ chuỗi Quyết chiến." },
    ],
  },
  {
    id: "divinity-upgrade", title: "Nâng cấp Tru Tà", kind: "system", issuer: "Giao diện Chiến Thần", firstChapter: 189,
    objective: "Hoàn thành yêu cầu nâng cấp thần thông do hệ thống mở khi chuẩn bị đột phá Kim Đan.",
    events: [
      { chapter: 189, paragraphs: "51–60", text: "Giao diện mở yêu cầu nâng cấp thần thông; chưa công bố danh sách nguyên liệu trong chương này.", status: "active" },
      { chapter: 190, paragraphs: "11–13", text: "Yêu cầu ba thuốc độ tinh khiết 99%: Tiềm Năng Võ Giả, Ngũ Hành Khai Hóa và Thiên Tuyển Thức Tỉnh." },
      { chapter: 191, paragraphs: "15–51", text: "Đặt sản xuất thuốc Tiềm Năng Võ Giả. Chưa xác nhận nhận đủ ba thuốc hoặc nâng cấp thành công." },
    ],
    facts: [
      { chapter: 190, label: "Vật liệu", text: "Ba thuốc đều cần độ tinh khiết 99%; đây là điều kiện hệ thống nêu, không phải vật phẩm đã có sẵn." },
      { chapter: 190, label: "Mục đích", text: "Phải nâng Tru Tà trước, để mở nhiệm vụ thần thông mới sau khi đột phá Kim Đan. Chưa xác nhận đã nâng Tru Tà hoặc đạt Kim Đan." },
    ],
  },
];
