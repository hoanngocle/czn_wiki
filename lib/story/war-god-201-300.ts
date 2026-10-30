import type { JournalEntry, ProfileEntry, ProfileFact } from "./war-god";
import type { Mission, MissionEvent, MissionFact } from "./war-god-missions";

// Evidence: full chapter notes 201–233, 234–266 and 267–300 in docs/story.
export const realms300: ProfileFact[] = [
  { chapter: 276, value: "Kim Đan sơ kỳ" },
  { chapter: 282, value: "Kim Đan hậu kỳ" },
  { chapter: 285, value: "Nguyên Anh sơ kỳ" },
  { chapter: 299, value: "Nguyên Anh hậu kỳ" },
];
export const soul300: ProfileFact[] = [
  { chapter: 267, value: "230 / 40", note: "Bản ghi trước khi dùng 50 hồn lực mở Kẻ Ám Sát. Chương không ghi lại số dư sau khoản chi; không coi 230 là số cuối chương." },
  { chapter: 268, value: "80 / 40", note: "Hệ thống ghi rõ 80/40 sau khi dùng 100 hồn lực nâng danh hiệu thành Vương Bài Thích Khách." },
  { chapter: 274, value: "10", note: "Dùng 70 hồn lực học Bách Thánh Kết Đan quyết, hệ thống ghi còn 10; chưa nhắc lại mẫu số." },
  { chapter: 277, value: "10 / 100", note: "Sau Kim Đan, giới hạn được xác nhận là 100. Bản ghi 10/100 xuất hiện trước khi dùng 10 học Họa Ảnh; chương này không ghi lại số dư." },
  { chapter: 280, value: "0 / 100", note: "Hệ thống ghi rõ 0/100; không dùng số này để điền ngược các chương trước." },
  { chapter: 281, value: "174", note: "Bản ghi giữa chương. Sau đó vẫn nhận thêm hồn lực, gồm 100, 7 và 11; chưa chốt số dư cuối chương." },
  { chapter: 282, value: "416", note: "Đầu chương ghi 560; dùng 210 học Bách Hoa Hóa Anh quyết. Trong lúc tiếp tục thu hồn lực, số hiển thị lần lượt 371, 372, 377, 391, 416, rồi còn các khoản tăng khác. Không tự tính thành số dư cuối chương." },
  { chapter: 286, value: "7000 / 200", note: "Sau Nguyên Anh, trần hồn lực là 200; ghi 7200/200, dùng 200 học Yến Quy còn 7000/200." },
  { chapter: 292, value: "Chưa xác nhận", note: "Bản ghi đầy đủ gần nhất là 7000/200 ở chương 286. Chương 290 nhận thêm 100, chương 292 chi 190 học Hồng Lưu; còn các nguồn tăng khác nên chưa đủ căn cứ chốt số dư mới." },
];
export const skills300: ProfileEntry[] = [
  { id: "upright", name: "Cương Trực", kind: "skill", chapter: 237, tag: "Lôi điện · Hai giây", description: "Được chọn ở chương 236, hệ thống trao ở 237 và thay Thất Khống/Mất Khống Chế. Khiến mục tiêu trúng đòn mất khả năng điều khiển cơ thể hai giây, áp dụng với mọi sinh vật." },
  { id: "spirit-intent", name: "Tâm Ý Tương Thông", kind: "skill", chapter: 272, tag: "Thần thông · Khí linh", description: "Phần thưởng Chứng minh giá trị của ngài; hiểu ý muốn của khí linh. Mục tiêu nhặt binh khí đạt ở 271, tới 272 mới nhận kỹ năng." },
  { id: "self-weight", name: "Tự Thừa Kỳ Trọng", kind: "skill", chapter: 276, tag: "Thần thông Địa kiếm", description: "Địa kiếm thức tỉnh khi chủ nhân đạt Kim Đan, tự gánh trọng lượng bản thân; thuộc thần thông của kiếm, không phải phép tăng thể lực của Thanh Sơn." },
  { id: "paint-shadow", name: "Họa Ảnh", kind: "skill", chapter: 277, tag: "Bí kiếm", description: "Dùng 10 hồn lực lĩnh ngộ. Ghi nhận từ thông báo hệ thống, không gán thêm hiệu quả chưa được đối chiếu." },
  { id: "returning-swallow", name: "Yến Quy", kind: "skill", chapter: 286, tag: "Bí kiếm", description: "Dùng 200 hồn lực lĩnh ngộ sau khi đạt Nguyên Anh; hệ thống ghi số dư còn 7000/200." },
  { id: "sword-torrent", name: "Hồng Lưu", kind: "skill", chapter: 292, tag: "Bí kiếm Quảng Dương", description: "Dùng 190 hồn lực lĩnh ngộ từ binh khí thu được. Chiêu thứ bảy của kiếm pháp cơ bản được báo giá 17 nhưng không chọn học; không thêm chiêu đó vào kỹ năng sở hữu." },
  { id: "deep-concealment", name: "Liễm Tức Sâu", kind: "skill", chapter: 296, until: 297, tag: "Quyền dùng một lần", description: "Nhiệm vụ thứ ba cho phép dùng một lần, che giấu khí tức trong ba ngày. Chưa kích hoạt tại chương 296; không phải kỹ năng dùng vô hạn." },
  { id: "deep-concealment-active", name: "Liễm Tức Sâu", kind: "skill", chapter: 297, tag: "Ghi nhận một lần · Thời hạn ba ngày", description: "Đã dùng quyền kích hoạt một lần ở chương 297, che khí tức trong ba ngày nhưng không che cơ thể đang nhìn thấy. Đây là ghi nhận hiệu quả tạm thời đã sử dụng, không phải kỹ năng vĩnh viễn hoặc xác nhận vẫn đang hiệu lực ở chương đang xem. Nguồn không nêu chính xác chương hết hạn." },
];
export const equipment300: ProfileEntry[] = [
  { id: "tide-sound", name: "Triều Âm kiếm", kind: "weapon", chapter: 296, tag: "Hư hại · Chờ sửa", description: "Hai kiếm gãy và cá nhỏ hợp lại thành Triều Âm, được trao cho Thanh Sơn. Kiếm vẫn hư hại; chưa mở kỹ năng của kiếm trước khi sửa chữa." },
];
export const inventory300: ProfileEntry[] = [
  { id: "qi-manuals", name: "Khối ngọc công pháp Luyện Khí", kind: "manual", chapter: 260, tag: "Hơn 2.000 công pháp", description: "Nhận hơn hai nghìn công pháp Luyện Khí để chuẩn bị hỗ trợ người ở hiện thực. Việc có tài liệu không đồng nghĩa đã học tất cả." },
  { id: "seven-color-sachet", name: "Túi gấm bảy màu", kind: "material", chapter: 264, tag: "Truyền thừa Bách Hoa", description: "Được trao và luyện hóa trước khi sang Thần Võ. Không tự xem mọi nội dung trong truyền thừa là kỹ năng đã lĩnh ngộ." },
  { id: "universal-talisman", name: "Thông dụng phù", kind: "material", chapter: 272, tag: "Bách Hoa", description: "Ninh Nguyệt Thiền chuyển phù của sư phụ. Chuyển vật qua thời không, khác Truyền tấn phù chỉ truyền tin." },
  { id: "sealed-sphere", name: "Mật Phong Cầu", kind: "material", chapter: 276, tag: "Thưởng trước", description: "Phần thưởng trao trước khi nhiệm vụ Quyết chiến (hạ) đổi mục tiêu. Giữ lại một vật từ kiếp trước; nội dung bên trong chưa được công bố." },
  { id: "fish-dragon-pearl", name: "Linh châu Ngư Long", kind: "material", chapter: 279, until: 283, tag: "Quà cá nhỏ", description: "Cá nhỏ tặng sau khi được cứu, giúp chữa thương thần hồn cực nhanh. Đây là quà ngoài hệ thống, không phải phần thưởng hứa trước." },
  { id: "teleport-disc", name: "Đĩa bát quái truyền tống", kind: "material", chapter: 279, tag: "Khí linh trao", description: "Nhận trước khi hai kiếm và cá vào vực sâu; được dặn mạnh hơn rồi quay lại." },
  { id: "flower-nascent-manual", name: "Bách Hoa Hóa Anh quyết", kind: "manual", chapter: 282, tag: "Đã lĩnh ngộ toàn bộ", description: "Dùng 210 hồn lực lĩnh ngộ toàn bộ công pháp, chuẩn bị con đường từ Kim Đan đến Nguyên Anh. Học công pháp và đột phá là các mốc riêng." },
  { id: "buddhist-bowl", name: "Bình bát Phật môn", kind: "material", chapter: 294, tag: "Khí linh đi theo", description: "Bình bát tự đi theo và cho cất trong túi trữ vật. Có khả năng diệt tà ma; việc nhận bình bát không đồng nghĩa đã học truyền thừa Phật tông hay Lục Tiên." },
];
export function updateEntry300(entry: ProfileEntry, chapter: number): ProfileEntry {
  if (entry.id === "earth-sword") {
    if (chapter >= 276) return { ...entry, chapter: 276, tag: "Thần thông thức tỉnh", description: "Sau khi Thanh Sơn đạt Kim Đan, Địa kiếm thức tỉnh Tự Thừa Kỳ Trọng, tự gánh trọng lượng bản thân. Chương 276 ghi trọng lượng 86.370.000 cân." };
    if (chapter >= 231) return { ...entry, chapter: 231, description: "Chương 231 ghi Địa kiếm nặng 60.000 cân khi giao chiến. Giữ đúng số ở chương này; không suy ra một lần nâng cấp từ các số liệu không thống nhất." };
    if (chapter >= 224) return { ...entry, chapter: 224, description: "Chương 224 mô tả Địa kiếm nặng 6.000 cân, khác con số 60.000 ở chương 181. Ghi theo nguồn, không suy đoán bị giảm sức mạnh." };
  }
  if (entry.id === "lightning" && chapter >= 237) return { ...entry, chapter: 237, description: "Tru Tà đã được nâng cấp sau khi nạp ba thuốc tinh khiết 99%. Cương Trực thay Thất Khống, khiến mục tiêu mất khả năng điều khiển cơ thể hai giây." };
  if (entry.id === "shrink-earth" && chapter >= 281) return { ...entry, chapter: 281, tag: "Thần kỹ · Cao cấp", description: "Súc Địa Thành Thốn lên cao cấp: phạm vi dịch chuyển từ ba mươi mét mở rộng tới phạm vi thần niệm. Không tự đặt một khoảng cách mét mới." };
  if (entry.id === "paint-shadow" && chapter >= 281) return { ...entry, chapter: 281, description: "Tạo nhiều bóng kiếm cùng tấn công; mỗi bóng có uy lực như kiếm chủ. Số lượng phụ thuộc cảnh giới và trình độ kiếm thuật." };
  if (entry.id === "hundred-saints" && chapter >= 276) return { ...entry, chapter: 276, tag: "Đã lĩnh ngộ · Đã Kết Đan", description: "Dùng thêm 70 hồn lực học công pháp ở chương 274; thực sự đột phá Kim Đan ở chương 276." };
  if (entry.id === "hundred-saints" && chapter >= 274) return { ...entry, chapter: 274, description: "Dùng 70 hồn lực học phần công pháp phục vụ Kết Đan; chưa coi việc lĩnh ngộ là đã đột phá." };
  if (entry.id === "sealed-sphere" && chapter >= 277) return { ...entry, chapter: 277, tag: "Thưởng trước · Một lần", description: "Chứa một lần Triệu Hồn Nhân Quả kiếm ở sức mạnh kiếp trước. Mở ra phải dùng ngay; không phải kiếm thuật đã học để tự do thi triển ở tu vi hiện tại." };
  if (entry.id === "seven-star-dragon" && chapter >= 276) return { ...entry, chapter: 276, tag: "Bí kiếm · Đủ cảnh giới", description: "Đã lĩnh ngộ sớm từ chương 191. Sau khi đạt Kim Đan ở chương 276, Thanh Sơn đáp ứng cảnh giới tối thiểu hệ thống từng nêu để dùng Du Long an toàn; không phải học lại." };
  return entry;
}
export const journal300: JournalEntry[] = [
  { chapter: 221, title: "Thu nửa công thức còn thiếu", description: "Đột nhập Thánh quốc lấy công thức Thiên Tuyển; chưa đồng nghĩa đã có đủ thuốc 99%." },
  { chapter: 233, title: "Thoát trận Thánh giáo", description: "Dùng Thất Tinh Du Long vượt cảnh giới, trọng thương rồi thoát bằng thiết bị bước nhảy." },
  { chapter: 237, title: "Cương Trực", description: "Hoàn thành nâng Tru Tà; nhận hiệu quả khống chế hai giây và mở chuỗi nhiệm vụ Thần thông tiếp theo." },
  { chapter: 258, title: "Người Bất Tử rút lui", description: "Trận thứ năm không có người đăng ký; nhóm tạm thắng cuộc đối đầu tại hiện thực." },
  { chapter: 264, title: "Quyết chiến (hạ)", description: "Sang Thần Võ, hệ thống phát nhiệm vụ điều tra thế giới và khởi động chuỗi Thần thông bảy ngày." },
  { chapter: 268, title: "Vương Bài Thích Khách", description: "Dùng 100 hồn lực nâng danh hiệu, nhận Thu Hoạch cao cấp; số dư 80/40." },
  { chapter: 272, title: "Tâm Ý Tương Thông", description: "Nhận thưởng nhiệm vụ đầu tiên sau khi nhặt kiếm gãy." },
  { chapter: 276, title: "Kim Đan và đổi mục tiêu", description: "Đột phá Kim Đan; Địa kiếm thức tỉnh. Quyết chiến (hạ) chuyển sang bảo vệ hiện trạng Thần Võ." },
  { chapter: 279, title: "Cứu cá nhỏ", description: "Hoàn thành Giúp người làm niềm vui, nhận Ngư Long Linh châu." },
  { chapter: 282, title: "Kim Đan hậu kỳ", description: "Học Bách Hoa Hóa Anh quyết, liên tiếp đột phá; khả năng lĩnh ngộ tu vi bước vào hồi chiêu." },
  { chapter: 285, title: "Nguyên Anh", description: "Vượt lôi kiếp, tiến vào Nguyên Anh." },
  { chapter: 286, title: "Yến Quy", description: "Học bí kiếm bằng 200 hồn lực, còn 7000/200." },
  { chapter: 287, title: "Hợp nhất chuỗi thần thông", description: "Hai chuỗi Kim Đan và Nguyên Anh được hợp nhất thành bảy nhiệm vụ; đã xong hai, còn năm." },
  { chapter: 292, title: "Hồng Lưu", description: "Dùng 190 hồn lực lĩnh ngộ bí kiếm; nhiệm vụ thứ ba được mở." },
  { chapter: 296, title: "Triều Âm", description: "Nhận kiếm hư hại, quyền Liễm Tức Sâu một lần; từ chối truyền thừa Lục Tiên." },
  { chapter: 298, title: "Vua khí linh", description: "Gặp Hồng Hoang Liệt Diễm, hoàn thành nhiệm vụ thứ ba và nhận nhiệm vụ hội thoại thứ tư." },
  { chapter: 299, title: "Nguyên Anh hậu kỳ", description: "Lên trung kỳ rồi hậu kỳ; bắt đầu hồi chiêu mới, cần hồn lực thu thêm để rút ngắn." },
  { chapter: 300, title: "Sư phụ độ kiếp", description: "Tạ Đạo Linh bắt đầu kiếp Thần Chiếu; cuối chương chưa xác nhận vượt qua." },
];

export const missionEvents300: Record<string, MissionEvent[]> = {
  "divinity-upgrade": [
    { chapter: 204, paragraphs: "29–38", text: "Chưa có thuốc Thiên Tuyển tinh khiết cao; Anna giữ một nửa công thức." },
    { chapter: 221, paragraphs: "32–35", text: "Thu được nửa công thức còn thiếu tại Thánh quốc; chưa xác nhận đã sản xuất đủ thuốc." },
    { chapter: 235, paragraphs: "36–57, 66–69", text: "Nhận thuốc Ngũ Hành 99% do Hoàng đế Phục Hy gửi qua Anna." },
    { chapter: 236, paragraphs: "47–63", text: "Đưa ba thuốc vào giao diện, chọn Cương Trực; chưa có thông báo trao kỹ năng hoàn tất." },
    { chapter: 237, paragraphs: "7–17", text: "Hệ thống trao Cương Trực, thay Thất Khống, xác nhận nhiệm vụ nâng Tru Tà hoàn thành.", status: "completed" },
  ],
};
export const missionFacts300: Record<string, MissionFact[]> = {
  "divinity-upgrade": [{ chapter: 237, label: "Đã nhận", text: "Cương Trực thay Thất Khống/Mất Khống Chế: mất điều khiển cơ thể hai giây, áp dụng mọi sinh vật." }],
};
export const missions300: Mission[] = [
  {
    id: "decisive-battle-lower", title: "Quyết chiến (hạ)", kind: "destiny", issuer: "Giao diện Chiến Thần", firstChapter: 264,
    objective: "Tìm nguyên nhân Thần Võ chưa bị yêu ma chiếm lĩnh và vì sao Nhân tộc thế giới tu hành biết tới thế giới này.",
    events: [
      { chapter: 264, paragraphs: "48–53", text: "Hệ thống phát Quyết chiến (hạ), trao trước quyền Danh Hiệu Chiến Thần.", status: "active" },
      { chapter: 276, paragraphs: "52–60", text: "Biến động khiến hệ thống sửa nhiệm vụ, trao trước thêm Mật Phong Cầu.", objective: "Bảo vệ hiện trạng thế giới Thần Võ." },
    ],
    facts: [
      { chapter: 264, label: "Thất bại", text: "Thu hồi phần thưởng, cấm tăng tu vi trong ba năm." },
      { chapter: 276, label: "Thưởng trước bổ sung", text: "Mật Phong Cầu và quyền dùng Danh Hiệu. Thất bại thu hồi cả hai, cấm tăng tu vi ba năm." },
    ],
  },
  {
    id: "divinity-chain", title: "Chuỗi nhiệm vụ Thần thông", kind: "system", issuer: "Giao diện Chiến Thần", firstChapter: 237,
    objective: "Hoàn thành các nhiệm vụ hệ thống để tăng số lần rút thần thông; bắt đầu khi vào thế giới tu hành.",
    events: [
      { chapter: 237, paragraphs: "18–28", text: "Mở chuỗi sau khi nâng Tru Tà; chưa bắt đầu đếm thời gian ở hiện thực.", status: "active" },
      { chapter: 264, paragraphs: "68–69", text: "Vào thế giới tu hành, chuỗi thần thông Kim Đan bắt đầu với thời hạn bảy ngày trong truyện." },
      { chapter: 287, paragraphs: "1–17", text: "Hợp nhất chuỗi Kim Đan và Nguyên Anh: tổng bảy nhiệm vụ, đã hoàn thành hai, còn năm." },
      { chapter: 298, paragraphs: "25–46", text: "Nhiệm vụ thứ ba hoàn thành; hệ thống mở nhiệm vụ thứ tư về cuộc trò chuyện với vua khí linh." },
    ],
    facts: [
      { chapter: 264, label: "Thời hạn", text: "Bảy ngày trong truyện; không chạy đồng hồ thời gian thực." },
      { chapter: 287, label: "Chuỗi hợp nhất", text: "Có bảy nhiệm vụ, đã hoàn thành hai. Truyện nêu 50% thần thông chiến đấu, 30% thần kỹ; không tự phân bổ phần còn lại." },
    ],
  },
  {
    id: "prove-worth", title: "Chứng minh giá trị của ngài", kind: "system", issuer: "Giao diện Chiến Thần", firstChapter: 265,
    objective: "Thể hiện tài năng ở Thần Võ cho tới khi nhặt được một binh khí.",
    events: [
      { chapter: 265, paragraphs: "15–21", text: "Phát nhiệm vụ đầu tiên trong chuỗi thần thông, hứa thưởng Tâm Ý Tương Thông.", status: "active" },
      { chapter: 271, paragraphs: "31–43", text: "Nhặt được kiếm gãy, đạt điều kiện hoàn thành nhiệm vụ đầu tiên.", status: "completed" },
      { chapter: 272, paragraphs: "41–65", text: "Hệ thống xác nhận nhiệm vụ và trao Tâm Ý Tương Thông." },
    ],
    facts: [{ chapter: 265, label: "Hứa thưởng", text: "Tâm Ý Tương Thông." }, { chapter: 272, label: "Đã nhận", text: "Tâm Ý Tương Thông: hiểu ý khí linh." }],
  },
  {
    id: "helping-others", title: "Giúp người làm niềm vui", kind: "system", issuer: "Giao diện Chiến Thần", firstChapter: 273,
    objective: "Đáp ứng lời cầu cứu của kiếm gãy.",
    events: [
      { chapter: 273, paragraphs: "5–15", text: "Nhiệm vụ thứ hai mở sau Tâm Ý Tương Thông; yêu cầu giúp binh khí.", status: "active" },
      { chapter: 279, paragraphs: "53–54", text: "Cứu cá nhỏ, hệ thống xác nhận hoàn thành. Cá tặng Ngư Long Linh châu; không coi quà của cá là phần thưởng hệ thống đã hứa.", status: "completed" },
    ],
  },
  {
    id: "divinity-third", title: "Nhiệm vụ Thần thông thứ ba", kind: "system", issuer: "Giao diện Chiến Thần", firstChapter: 292,
    objective: "Chờ hệ thống công bố nội dung nhiệm vụ tiếp theo.",
    events: [
      { chapter: 292, paragraphs: "27–28", text: "Hệ thống mở nhiệm vụ thứ ba; chi tiết chưa công bố.", status: "active" },
      { chapter: 296, paragraphs: "9–12", text: "Công bố yêu cầu vào vực sâu và quyền Liễm Tức Sâu một lần.", objective: "Tiến vào vực sâu thế giới, tìm vật quan trọng và tìm hiểu bí mật thế giới." },
      { chapter: 298, paragraphs: "26–27", text: "Gặp vua khí linh Hồng Hoang Liệt Diễm, nhiệm vụ thứ ba được xác nhận hoàn thành.", status: "completed" },
    ],
    facts: [{ chapter: 296, label: "Hỗ trợ", text: "Liễm Tức Sâu dùng một lần, hiệu lực ba ngày trong truyện; không làm cơ thể tàng hình." }],
  },
  {
    id: "divinity-fourth", title: "Nhiệm vụ Thần thông thứ tư", kind: "system", issuer: "Giao diện Chiến Thần", firstChapter: 298,
    objective: "Trò chuyện với khí linh mạnh nhất; hệ thống không đặt mục tiêu cụ thể, chờ đoạn kịch bản kết thúc.",
    events: [{ chapter: 298, paragraphs: "28–41", text: "Hệ thống mở nhiệm vụ hội thoại thứ tư; chưa nêu phần thưởng hoặc xác nhận hoàn thành.", status: "active" }],
  },
];
