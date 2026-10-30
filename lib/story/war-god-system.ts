import { getWarGodProfile, MAX_PROFILE_CHAPTER } from "./war-god";
import { getInspectedWeapons } from "./war-god-inspection";
import { getWarGodTitles } from "./war-god-titles";
import { getWarGodMissions } from "./war-god-missions";
import { storyExtension } from "./war-god-extension";

export type SystemPhase = "dormant" | "technique" | "mission" | "wheel" | "choices" | "divinity";
export type SystemFact = { value: string; chapter: number; note: string };
export type DivinityChoice = { id: string; name: string; glyph: "clock" | "fist" | "woman" | "snakes" | "unknown"; description: string; chapter: number };

export type SystemModule = {
  id: "technique" | "destiny" | "divinity" | "titles" | "chronicle" | "missions" | "world-switch";
  name: string;
  status: string;
  description: string;
  chapter: number;
};

const materials = [
  { id: "chaos", kind: "Hỗn Loạn chủng", name: "Móng vuốt giao long xám hai sừng", chapter: 82 },
  { id: "abyss", kind: "Thâm Uyên chủng", name: "Đầu lâu quái vật mười mắt", chapter: 82 },
  { id: "cosmic", kind: "Vũ Trụ chủng", name: "Mảnh tim quái vật vũ trụ", chapter: 92 },
  { id: "underworld", kind: "Hoàng Tuyền chủng", name: "Trường kiếm sứt mẻ", chapter: 82 },
  { id: "unknown", kind: "Vị Tri chủng", name: "Mảnh xác phủ mây mỏng", chapter: 82 },
];
const patterns: Record<string, string> = {
  chaos: "Quái vật không rõ diện mạo nằm rạp gặm thi thể.",
  abyss: "Cầu thang đá uốn xuống vực sâu không thấy đáy.",
  cosmic: "Tinh cầu bị bốn chân quái vật khổng lồ phủ lên.",
  underworld: "Khung cảnh người chết sống lại.",
  unknown: "Mây dày với tay chân vươn ra.",
};
const choices: DivinityChoice[] = [
  { id: "time", glyph: "clock", name: "Tuyên Ngôn Thời Gian", description: "Thiên Tuyển kỹ. Vào tám giờ tối sinh nhật 20 tuổi, người chơi có thể khiến cả thế giới nghe lời mình nói.", chapter: 98 },
  { id: "fist", glyph: "fist", name: "Không Quyền", description: "Võ đạo Quy Tàng. Phóng lực trong phạm vi ba mét, gây tổn thương như một cú quyền trực diện.", chapter: 98 },
  { id: "woman", glyph: "woman", name: "Biến Thân Thành Nữ", description: "Thiên Tuyển kỹ. Biến thân thành nữ, mức độ xinh đẹp tăng 1000%, thực lực cá nhân tăng 115% theo thông báo hệ thống.", chapter: 98 },
  { id: "snakes", glyph: "snakes", name: "Tru Tà", description: "Hai rắn bạc quấn lại thành tên Tru Tà. Cố Thanh Sơn đã chọn Thần thông này và hướng sinh pháp của Lôi điện.", chapter: 98 },
];

// End-of-chapter evidence from the supplied EPUB; these are records, not game actions.
export function getWarGodSystem(value: number) {
  const chapter = Number.isInteger(value) && value > 0 ? Math.min(value, MAX_PROFILE_CHAPTER) : 1;
  const profile = getWarGodProfile(chapter);
  const phase: SystemPhase = chapter < 3 ? "dormant" : chapter >= 98 ? "divinity" : chapter === 97 ? "choices" : chapter >= 81 ? "wheel" : chapter >= 34 ? "mission" : "technique";
  const soul: SystemFact = chapter >= 101 && profile.soul ? { ...profile.soul, note: profile.soul.note ?? "Số liệu gần nhất được ghi nhận; không phải số dư trực tiếp." }
    : chapter >= 100 ? { value: "530 / 20", chapter: 100, note: "Sau khi hoàn tất khôi phục kiếm quyết. Số ghi nhận, không phải số dư trực tiếp." }
    : chapter >= 99 ? { value: "640 / 20", chapter: 99, note: "Ghi nhận sau khi tiến giai Trúc Cơ, trước khi khôi phục kiếm quyết; không quy đổi thành phần trăm." }
    : profile.soul ? { ...profile.soul, note: "Số liệu gần nhất được ghi nhận; không phải số dư trực tiếp ở mọi chương sau." }
    : chapter >= 4 ? { value: "1 / 5", chapter: 4, note: "Ghi nhận gần cuối chương 4, trước khi thăng cấp. Đầu chương ghi 4/5; chưa xác nhận số dư sau thăng cấp." }
    : { value: "Chưa xác nhận", chapter, note: "Chưa có số hồn lực được xác nhận tại mốc này." };
  const experience: SystemFact | null = chapter >= 14 || chapter < 4 ? null : chapter >= 13
    ? { value: "0 / 15", chapter: 13, note: "Ghi nhận ở chương 13." }
    : { value: "0 / 10", chapter: 4, note: "Ghi nhận sau khi lên Luyện Khí tầng 2 ở cuối chương 4; không phải số dư liên tục." };
  const hourglass: SystemFact | null = chapter < 4 ? null : chapter >= 330
    ? { value: "Không còn giới hạn", chapter: 330, note: "Quyết chiến (hạ) hoàn thành: sau khi về hiện thực có thể quay lại bất cứ lúc nào, không còn giới hạn thời gian qua lại hai thế giới." }
    : chapter >= 167
    ? { value: "Thưởng 7 ngày", chapter: 167, note: "Hoàn thành vượt mức Quyết chiến (thượng), được bảy ngày ở thế giới thực. Đây là phần thưởng trong truyện, không phải thời gian còn lại hoặc bộ đếm trực tiếp." }
    : chapter >= 99
    ? { value: "Rơi rất chậm", chapter: 99, note: "Chương 99 mô tả chỉ vài hạt cát rơi sau một khoảng thời gian dài. Không có thời gian thực để đếm." }
    : chapter === 4 ? { value: "Đã hết", chapter: 4, note: "Cuối chương 4, đồng hồ cát hết và Thanh Sơn trở về thế giới thật." }
    : { value: "Chưa xác định", chapter: 4, note: "Đồng hồ cát được mô tả từ chương 4; chưa xác nhận lượng cát tại chương đang xem." };
  const modules: SystemModule[] = [];
  if (chapter >= 3) modules.push({
    id: "technique", name: "Kỹ nghệ Chiến Thần", status: "Đã kích hoạt", chapter: 3,
    description: "Nhìn thấy kỹ năng từng được thi triển trên vũ khí. Dùng hồn lực để lĩnh ngộ kỹ nghệ được hệ thống ghi nhận.",
  });
  if (chapter >= 34) modules.push({
    id: "destiny", name: "Nhiệm vụ Định Mệnh", status: chapter >= 80 ? "Đã hoàn thành" : "Đang tiến hành",
    chapter: chapter >= 81 ? 81 : chapter >= 80 ? 80 : chapter >= 69 ? 69 : 34,
    description: chapter >= 81
      ? "Trận Chiến Chết Chóc đã hoàn thành: Công Tôn Trí và Ninh Nguyệt Thiền trở về Nhân tộc an toàn. Phần thưởng mở ra vòng quay Thần thông Chiến Thần."
      : chapter >= 80 ? "Công Tôn Trí đã được cứu. Giao diện Chiến Thần thông báo nhiệm vụ đã hoàn thành."
      : "Cứu giúp Công Tôn Trí và Ninh Nguyệt Thiền, thay đổi số mệnh của hai người. Hệ thống ghi phần thưởng là Thần thông Chiến Thần; thất bại sẽ bị xóa sổ.",
  });
  if (chapter >= 81) modules.push({
    id: "divinity", name: "Thần thông Chiến Thần",
    status: chapter >= 98 ? "Đã thức tỉnh" : chapter === 97 ? "Bốn lựa chọn · Đánh giá S" : chapter >= 95 ? "Vòng quay sẵn sàng" : "Thu thập vật liệu",
    chapter: chapter >= 99 ? 99 : chapter >= 98 ? 98 : chapter >= 95 ? 95 : 81,
    description: chapter >= 99
      ? "Lôi điện theo hướng sinh pháp. Tru Tà tăng sát thương đối với yêu ma ba phần; Mất Khống Chế khiến mục tiêu trúng đòn mất khả năng điều khiển cơ thể trong một giây."
      : chapter >= 98 ? "Đã chọn Tru Tà và hướng sinh pháp khi thức tỉnh linh lực Lôi điện."
      : chapter >= 95 ? "Đã đưa đủ năm vật liệu vào vòng quay trước thời hạn. Hệ thống xác nhận hoàn thành nhiệm vụ, chờ thức tỉnh thần thông khi đột phá đại cảnh giới."
      : "Thu thập vật liệu của năm chủng để đặt vào vòng quay. Nhiệm vụ có thời hạn 48 giờ trong truyện; chất lượng vật liệu và tốc độ thu thập ảnh hưởng phần thưởng.",
  });
  if (chapter >= 134) modules.push({ id: "titles", name: "Danh Hiệu Chiến Thần", chapter: chapter >= 167 ? 167 : 134, status: "Tạm sở hữu", description: "Phần thưởng trao trước của chuỗi Quyết chiến. Chỉ trang bị một danh hiệu cùng lúc; hoàn thành nửa đầu chưa đồng nghĩa hoàn thành cả chuỗi." });
  const technique = modules.find((item) => item.id === "technique");
  if (technique && chapter >= 142 && chapter < 188) {
    technique.status = "Đông lạnh";
    technique.chapter = chapter >= 150 ? 150 : 142;
    technique.description = chapter >= 150 ? "Thời kỳ đông lạnh đã qua hơn nửa; không có thời lượng cụ thể để chạy bộ đếm." : "Sau đột phá liên tục, việc lĩnh ngộ tu vi bước vào thời kỳ đông lạnh. Thêm hồn lực có thể rút ngắn thời gian; không nêu thời lượng cụ thể.";
  }
  if (technique && (chapter === 282 || chapter >= 299)) {
    technique.status = "Đông lạnh";
    technique.chapter = chapter >= 299 ? 299 : 282;
    technique.description = "Sau khi liên tục nâng tu vi, khả năng lĩnh ngộ tu vi bước vào hồi chiêu. Thu thêm hồn lực có thể rút ngắn; truyện chưa cho thời lượng cụ thể.";
  }
  const divinity = modules.find((item) => item.id === "divinity");
  if (divinity && chapter >= 189) {
    divinity.chapter = chapter >= 190 ? 190 : 189;
    divinity.status = "Chờ nâng cấp";
    divinity.description = chapter >= 190 ? "Tru Tà hiện vẫn giữ hiệu quả đã xác nhận. Hệ thống yêu cầu ba thuốc độ tinh khiết 99%: Tiềm Năng Võ Giả, Ngũ Hành Khai Hóa và Thiên Tuyển Thức Tỉnh để nâng Tru Tà trước, rồi mới mở nhiệm vụ thần thông mới sau khi đột phá Kim Đan. Chưa xác nhận hoàn thành." : "Hệ thống mở yêu cầu nâng cấp thần thông khi chuẩn bị tiến vào Kim Đan; chi tiết nguyên liệu chưa được công bố ở chương này.";
  }
  if (divinity && chapter >= 237) {
    divinity.chapter = 237;
    divinity.status = "Đã nâng cấp";
    divinity.description = "Tru Tà đã nâng cấp. Cương Trực thay Thất Khống/Mất Khống Chế, khiến mục tiêu mất khả năng điều khiển cơ thể hai giây, áp dụng với mọi sinh vật. Chuỗi nhiệm vụ Thần thông tiếp theo đã mở.";
  }
  for (const event of storyExtension.systemEvents) {
    if (event.chapter > chapter) continue;
    const systemModule = modules.find((item) => item.id === event.module);
    if (systemModule) Object.assign(systemModule, { chapter: event.chapter, status: event.status, description: event.description });
    else modules.push({ id: event.module, name: event.module === "chronicle" ? "Biên niên sử ngày tận thế" : event.module === "world-switch" ? "Qua lại thế giới" : "Nhiệm vụ Chiến Thần", chapter: event.chapter, status: event.status, description: event.description });
  }
  if (modules.some((item) => item.id === "missions")) {
    const destinyIndex = modules.findIndex((item) => item.id === "destiny");
    if (destinyIndex >= 0) modules.splice(destinyIndex, 1);
  }
  const chronicle = modules.find((item) => item.id === "chronicle");
  if (chronicle && chapter >= 978) chronicle.name = "Tình báo cá nhân";
  const extendedControl = storyExtension.controlEvents.filter((event) => event.chapter <= chapter).at(-1);
  return {
    chapter, modules, phase, soul, experience, hourglass, realm: profile.realm,
    control: extendedControl ? { name: extendedControl.name, seconds: extendedControl.seconds, chapter: extendedControl.chapter } : chapter >= 237 ? { name: "Cương Trực", seconds: 2, chapter: 237 } : chapter >= 99 ? { name: "Mất Khống Chế", seconds: 1, chapter: 99 } : null,
    dock: modules.filter((item) => item.id !== "destiny" && (item.id !== "divinity" || chapter >= 98)).map((item) => item.id),
    titles: getWarGodTitles(chapter), skills: profile.skills,
    latestMission: getWarGodMissions(chapter).at(-1),
    weapons: getInspectedWeapons(chapter),
    choices: chapter < 97 ? [] : chapter >= 98 ? choices.map((item) => ({ ...item })) : choices.map((item, index): DivinityChoice => ({
      id: String(index), glyph: index === 0 ? "clock" : "unknown", name: index === 0 ? "Biểu tượng đồng hồ" : `Lựa chọn ${index + 1}`,
      description: index === 0 ? "Biểu tượng liên quan đến thời gian. Lời giới thiệu chưa được công bố tại chương này." : "Hệ thống đã hiện bốn vị trí. Chi tiết biểu tượng này chưa được công bố tại chương đang đọc.", chapter: 97,
    })),
    materials: chapter < 81 ? [] : materials.map((item) => ({
      id: item.id, kind: item.kind, pattern: patterns[item.id],
      name: chapter >= item.chapter ? item.name : undefined,
      chapter: chapter >= item.chapter ? item.chapter : 81,
      state: chapter >= (item.id === "cosmic" ? 95 : 85) ? "Đã đưa vào vòng quay" : chapter >= item.chapter ? "Đã thu thập" : "Chưa ghi nhận",
    })),
  };
}
export type WarGodSystemState = ReturnType<typeof getWarGodSystem>;
