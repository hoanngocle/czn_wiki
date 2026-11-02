/** Curated atlas through chapter 700. Positions are editorial, never canonical coordinates. */
export type CosmosKind = "region" | "world" | "system" | "concept" | "place";
export type RelationKind = "contains" | "system" | "passage" | "fusion" | "secret";
export type CosmosEntity = {
  id: string;
  name: string;
  shortName: string;
  kind: CosmosKind;
  color: string;
  position: [number, number, number];
  radius: number;
  aliases?: string[];
  summary: string;
  note?: string;
  chapters: number[];
  history?: { chapter: number; text: string }[];
};
export type CosmosRelation = {
  source: string;
  target: string;
  kind: RelationKind;
  label: string;
  detail: string;
  chapters: number[];
  certainty?: "inference";
};

export const COSMOS_SCOPE = 700;
export const cosmosKindLabels: Record<CosmosKind, string> = {
  region: "Khu vực", world: "Thế giới", system: "Hệ thế giới", concept: "Khái niệm", place: "Địa vực",
};
export const relationLabels: Record<RelationKind, string> = {
  contains: "Phân vùng", system: "Cấu trúc", passage: "Hành trình", fusion: "Dung hợp", secret: "Bí mật",
};

export const cosmosEntities: CosmosEntity[] = [
  { id: "roi-rac", name: "Các thế giới Rời Rạc", shortName: "Rời Rạc", kind: "region", color: "#76b8cf", position: [-17, 0, 5], radius: 10,
    summary: "Nhóm thế giới nằm tách khỏi Biểu Tầng theo lời hồ ly trắng. Những thế giới Thanh Sơn đã đi qua ở giai đoạn này thuộc nhóm Rời Rạc, dễ bị các tồn tại mạnh hơn xâm chiếm hoặc hủy diệt.",
    note: "Rời Rạc được dùng làm nhãn nhóm trên bản đồ. Không phải một trong bốn khu của Biểu Tầng; các thế giới trong nhóm không nhất thiết cùng tầng hay ở gần nhau.", chapters: [518, 519, 528] },
  { id: "bieu-tang", name: "Biểu Tầng Thế Giới", shortName: "Biểu Tầng", aliases: ["900 triệu tầng", "chín trăm triệu tầng thế giới"], kind: "system", color: "#d6c38c", position: [7, 5, -1], radius: 1.1,
    summary: "Hệ chín trăm triệu tầng thế giới, mỗi tầng chứa nhiều thế giới độc lập. Vỏ Ngoài, Vỏ Giữa và Vỏ Trong được giới thiệu là ba tầng ngoài cùng. Những mô tả này là tri thức được nhân vật truyền đạt ở chương 518–519.",
    note: "Bốn khu được nêu ở chương 543 và 551. Bản đồ không đồng nhất chúng với ba tầng Vỏ Ngoài, Vỏ Giữa, Vỏ Trong.", chapters: [518, 519, 543, 551] },
  { id: "luan-ham", name: "Khu Luân Hãm", shortName: "Luân Hãm", aliases: ["khu Phồn Vinh"], kind: "region", color: "#ca7d75", position: [-1, 0, 10], radius: 6,
    summary: "Khu vực đã bị yêu ma chiếm lĩnh. Tên cũ là Phồn Vinh; theo hồi tưởng ở chương 570, khu vực được đổi tên sau cuộc xâm nhập của yêu ma.",
    note: "Bản mẫu chưa gán một thế giới có tên riêng vào khu này khi chưa có chứng cứ cụ thể.", chapters: [543, 551, 570],
    history: [{ chapter: 570, text: "Hồi tưởng: khu Phồn Vinh thất thủ và được đổi tên thành Luân Hãm. Đây là sự kiện quá khứ được kể lại, không phải xảy ra ở chương 570." }] },
  { id: "sieu-duy", name: "Khu Siêu Duy", shortName: "Siêu Duy", kind: "region", color: "#85c9ac", position: [12, 1, 9], radius: 6,
    summary: "Tập hợp các thế giới Siêu Duy, vượt giới hạn không gian và thời gian, có thể làm điểm đi tới nhiều thế giới khác. Việc đi vào phụ thuộc sự cho phép của thế giới ấy.", chapters: [543, 547, 551] },
  { id: "tranh-ba", name: "Khu Tranh Bá", shortName: "Tranh Bá", kind: "region", color: "#d5ae69", position: [0, -1, -10], radius: 6,
    summary: "Khu vực có sự tranh đấu giữa sinh linh với yêu ma và giữa các sinh linh với nhau. Chương 666, thi thể khổng lồ khuyên Thanh Sơn tới đây để mạnh lên.",
    note: "Chưa đưa các địa điểm ở những chương sau 700 vào bản mẫu này.", chapters: [543, 551, 666] },
  { id: "ky-di", name: "Khu Kỳ Dị", shortName: "Kỳ Dị", aliases: ["khu Kì Dị"], kind: "region", color: "#b59ad9", position: [15, 1, -10], radius: 7,
    summary: "Khu vực phía trong cùng của chín trăm triệu tầng thế giới, chứa những tồn tại kỳ lạ và các bảo vật hiếm. Chim Kinh Cức sống và thu thập bảo vật ở đây.", chapters: [543, 551, 602] },
  { id: "reality", name: "Thế giới hiện thực", shortName: "Hiện thực", aliases: ["Nhân Gian", "Nhân gian giới", "Trái Đất", "thế giới Nguyên Bản"], kind: "world", color: "#8dd8d1", position: [-17, 1, 7], radius: 1.05,
    summary: "Thế giới xuất phát của Cố Thanh Sơn, nơi có Nữ Thần Công Chính, Trương Anh Hào và Diệp Phi Ly. Tuyến Nhân Gian liên hệ với Hoàng Tuyền và các giới còn lại của Lục Đạo.",
    note: "Hệ thống gọi hiện thực là Mộ Phần Của Thế Giới. Chương 666, Thanh Sơn suy luận nơi này cất giấu một mộ phần; không tạo thêm một hành tinh riêng từ tên gọi ấy.", chapters: [428, 455, 528, 666, 697],
    history: [{ chapter: 455, text: "Thanh Sơn khởi động dung hợp Hoàng Tuyền với Nhân Gian." }, { chapter: 697, text: "Bốn giới còn lại được đưa vào cuộc dung hợp, tiếp nối Nhân Gian và Hoàng Tuyền." }] },
  { id: "cultivation", name: "Thế giới Tu Hành", shortName: "Tu Hành", kind: "world", color: "#99c985", position: [-22, 1, 3], radius: .85,
    summary: "Thế giới của Bách Hoa tông và Tam Thánh, một đầu của hành trình qua lại thời kỳ đầu của Thanh Sơn. Tạ Đạo Linh quyết định dung hợp thế giới này với Thần Võ.",
    note: "Không gộp Tu Hành và hiện thực chỉ vì dữ liệu cốt truyện dùng hai tuyến. Cũng không xác nhận suy đoán của Thanh Sơn ở chương 555 về quá khứ Lục Đạo của Tu Hành thành sự thật.", chapters: [328, 518, 555],
    history: [{ chapter: 328, text: "Tạ Đạo Linh giao Bi Ngưỡng phụ trách việc dung hợp Tu Hành và Thần Võ." }] },
  { id: "than-vo", name: "Thế giới Thần Võ", shortName: "Thần Võ", aliases: ["Thần Vũ", "Võ Thần"], kind: "world", color: "#dfb57b", position: [-19, -1, -1], radius: .8,
    summary: "Thế giới có nền văn minh tu hành và khí linh, đã chịu thảm họa luyện hóa. Công Tôn Trí đưa Thanh Sơn tới đây; về sau xuất hiện quyết định dung hợp với Tu Hành.",
    note: "Thần Võ và Huyền Không không cùng tầng theo nhận xét về tọa độ ở chương 518. Vị trí trên bản đồ chỉ phục vụ việc đọc.", chapters: [37, 294, 328, 518] },
  { id: "huyen-khong", name: "Thế giới Huyền Không", shortName: "Huyền Không", kind: "world", color: "#bda5db", position: [-12, 3, 1], radius: .75,
    summary: "Thế giới Thanh Sơn đến sau hành trình Hoàng Tuyền, nơi có các tông môn tu hành, Vương Hồng Đao và hiểm họa Giới Ma. Tại đây hắn gặp hồ ly trắng và biết về Biểu Tầng.",
    note: "Được giữ trên bản đồ như một địa điểm lịch sử, không có nghĩa vẫn an toàn hoặc nguyên vẹn ở chương 700.", chapters: [471, 518, 527, 528],
    history: [{ chapter: 527, text: "Các tu sĩ Huyền Không bị tàn sát; Thanh Sơn được giao mang đóa hoa yêu tinh đi." }, { chapter: 528, text: "Thanh Sơn rời những thế giới Rời Rạc và được hệ thống báo đã vào Biểu Tầng." }] },
  { id: "luc-dao", name: "Lục Đạo Luân Hồi", shortName: "Lục Đạo", kind: "system", color: "#d2b988", position: [-15, 0, 18], radius: .9,
    summary: "Hệ gồm Nhân Gian, Hoàng Tuyền, Thiên Giới, A Tu La, Ác Quỷ và Thú Vương. Chương 681, hệ thống tiết lộ thế giới Lục Đạo đã bị phá vỡ và cất giấu nhiều Mộ Phần Của Thế Giới.",
    note: "Sáu giới được tách điểm để tra cứu lịch sử và cấu trúc. Đến chương 697 đã có dung hợp; không nên đọc sáu điểm này như sáu thế giới vẫn hoàn toàn tách biệt.", chapters: [428, 681, 697],
    history: [{ chapter: 681, text: "Hệ thống tiết lộ bí mật về thế giới Lục Đạo và các mộ phần." }, { chapter: 697, text: "Dung hợp bốn giới còn lại với thế giới Nhân Gian và Hoàng Tuyền." }] },
  { id: "hoang-tuyen", name: "Thế giới Hoàng Tuyền", shortName: "Hoàng Tuyền", aliases: ["địa ngục"], kind: "world", color: "#7daabf", position: [-21, -1, 15], radius: .72,
    summary: "Cõi liên quan đến người chết và luân hồi trong Lục Đạo. Tại đây Thanh Sơn gặp các thống lĩnh địa ngục đến từ nhiều giới, tìm cách cứu Hoàng Tuyền và Nhân Gian.", chapters: [428, 432, 455, 456],
    history: [{ chapter: 455, text: "Khởi động dung hợp với Nhân Gian sau khi thu đủ căn nguyên." }] },
  { id: "thien-gioi", name: "Thiên Giới", shortName: "Thiên Giới", kind: "world", color: "#e7d7a3", position: [-18, 2, 22], radius: .65,
    summary: "Một giới thuộc Lục Đạo, có các Thiên Thần. Chương 697 mô tả thế giới có nhiều mây và dân số thưa thớt khi Thanh Sơn cùng Mèo Con tìm căn nguyên để dung hợp.", chapters: [428, 697] },
  { id: "a-tu-la", name: "A Tu La giới", shortName: "A Tu La", aliases: ["Tu La đạo"], kind: "world", color: "#d38a7c", position: [-12, 2, 23], radius: .7,
    summary: "Một giới thuộc Lục Đạo; các thống lĩnh A Tu La xuất hiện ở Hoàng Tuyền. Chương 697 mô tả A Tu La giới chia làm bốn giới khi Thanh Sơn thu thập căn nguyên.", chapters: [428, 539, 697] },
  { id: "ac-quy", name: "Ác Quỷ giới", shortName: "Ác Quỷ", aliases: ["Quỷ đói đạo", "Ngạ Quỷ"], kind: "world", color: "#ac85b4", position: [-8, -1, 18], radius: .65,
    summary: "Một giới thuộc Lục Đạo, còn được nhắc bằng tên Quỷ đói đạo. Thanh Sơn và Mèo Con lấy căn nguyên giới này rồi đưa vào kế hoạch dung hợp toàn Lục Đạo.", chapters: [428, 695, 696, 697] },
  { id: "thu-vuong", name: "Thú Vương giới", shortName: "Thú Vương", aliases: ["Súc sinh đạo"], kind: "world", color: "#a6bf7d", position: [-8, 1, 14], radius: .68,
    summary: "Tên gọi được người trong truyện dùng thay cho Súc sinh đạo. Chương 697 mô tả ba phần: mặt đất, đại dương và thế giới ngầm.", chapters: [428, 697] },
  { id: "justice", name: "Thiết Quyền Chính Nghĩa", shortName: "Thiết Quyền", aliases: ["câu lạc bộ", "Barry", "Mèo Con", "Mèo Nhỏ"], kind: "world", color: "#9ce1bd", position: [12, 2, 9], radius: 1,
    summary: "Câu lạc bộ của Barry và Mèo Con nằm trên một thế giới Siêu Duy. Thanh Sơn mang đóa hoa yêu tinh tới đây; quyền lưu lại được Mèo Con cho phép và gắn với ngọn hải đăng của thế giới.", chapters: [547, 551, 575] },
  { id: "fragments", name: "Vực sâu hỗn loạn của mảnh vỡ thế giới", shortName: "Vực sâu mảnh vỡ", kind: "place", color: "#c5a5ec", position: [15, 2, -10], radius: .95,
    summary: "Hệ thống xác định địa vực này nằm sâu trong khu Kỳ Dị, gần như tận cùng bên trong chín trăm triệu tầng thế giới. Ngay cả phần lớn chim Kinh Cức cũng không thể sống sót khi vào đây.",
    note: "Đây là một địa vực cụ thể; không đồng nhất với mọi nơi mang tên Thâm Uyên trong truyện.", chapters: [602] },
  { id: "tombs", name: "Mộ Phần Của Thế Giới", shortName: "Mộ Phần", aliases: ["phần mộ của thế giới"], kind: "concept", color: "#bd9a6d", position: [-24, 4, 9], radius: .6,
    summary: "Tên gọi chung cho các nơi chúng thần phong ấn, giấu những tạo vật bị loại bỏ mà không thể phá hủy. Bên trong có thể là vật phẩm, sinh mạng hoặc một thế giới không trọn vẹn.",
    note: "Ký hiệu này là một khái niệm và bí mật liên quan đến hiện thực, không phải tọa độ một hành tinh hay một khu độc lập.", chapters: [528, 665, 666, 681] },
];

export const cosmosRelations: CosmosRelation[] = [
  ...["luan-ham", "sieu-duy", "tranh-ba", "ky-di"].map((target): CosmosRelation => ({ source: "bieu-tang", target, kind: "contains", label: "Khu thuộc Biểu Tầng", detail: "Một trong bốn khu được Tô Tuyết Nhi và Mèo Con giới thiệu.", chapters: [543, 551] })),
  ...["reality", "cultivation", "than-vo", "huyen-khong"].map((target): CosmosRelation => ({ source: "roi-rac", target, kind: "contains", label: "Thuộc nhóm Rời Rạc", detail: "Chương 518, hồ ly trắng xếp những thế giới Thanh Sơn từng đi qua vào nhóm Rời Rạc, nằm tách khỏi Biểu Tầng. Đây là phân loại tại giai đoạn được kể.", chapters: [518] })),
  ...["reality", "hoang-tuyen", "thien-gioi", "a-tu-la", "ac-quy", "thu-vuong"].map((target): CosmosRelation => ({ source: "luc-dao", target, kind: "system", label: "Một giới trong Lục Đạo", detail: "Quan hệ cấu trúc của hệ luân hồi. Các điểm vẫn tách để tra cứu dù về sau đã có dung hợp.", chapters: [428, 697] })),
  { source: "sieu-duy", target: "justice", kind: "contains", label: "Thế giới Siêu Duy", detail: "Chương 547 xác nhận đặc tính Siêu Duy và quyền cho phép lưu lại ở Thiết Quyền Chính Nghĩa.", chapters: [543, 547] },
  { source: "ky-di", target: "fragments", kind: "contains", label: "Nằm sâu trong khu Kỳ Dị", detail: "Hệ thống Chiến Thần xác định địa vực mảnh vỡ thế giới ở sâu trong khu Kỳ Dị.", chapters: [602] },
  { source: "cultivation", target: "than-vo", kind: "fusion", label: "Quyết định dung hợp", detail: "Tạ Đạo Linh giao việc dung hợp cho Bi Ngưỡng. Chương nguồn này xác nhận quyết định và khởi sự, không dùng làm mốc hoàn tất.", chapters: [328] },
  { source: "reality", target: "hoang-tuyen", kind: "fusion", label: "Dung hợp Nhân Gian — Hoàng Tuyền", detail: "Thanh Sơn khởi động dung hợp sau khi thu đủ căn nguyên; chương 456 tiếp tục cuộc cứu Lục Đạo.", chapters: [455, 456] },
  ...["thien-gioi", "a-tu-la", "ac-quy", "thu-vuong"].map((source): CosmosRelation => ({ source, target: "reality", kind: "fusion", label: "Dung hợp cùng Nhân Gian và Hoàng Tuyền", detail: "Bốn giới còn lại được đưa vào cuộc dung hợp ở chương 697. Đường nối ghi sự kiện, không phải đường du hành.", chapters: [697] })),
  { source: "huyen-khong", target: "justice", kind: "passage", label: "Hành trình mang hoa yêu tinh", detail: "Thanh Sơn rời Huyền Không, đi qua Biểu Tầng và tới Thiết Quyền Chính Nghĩa. Đường nối tóm tắt hành trình, không khẳng định có cổng dịch chuyển trực tiếp.", chapters: [527, 528, 547] },
  { source: "tombs", target: "reality", kind: "secret", label: "Tên gọi hệ thống dành cho hiện thực", detail: "Chương 528, hệ thống gọi thế giới hiện thực là phần mộ của thế giới. Chương 666, Thanh Sơn suy luận hiện thực cất giấu một mộ phần; suy luận đó chưa phải một tọa độ được xác nhận.", chapters: [528, 665, 666] },
  { source: "luc-dao", target: "tombs", kind: "secret", label: "Cất giấu nhiều mộ phần", detail: "Bí mật được hệ thống tiết lộ ở chương 681: thế giới Lục Đạo cất giấu nhiều Mộ Phần Của Thế Giới và đã bị phá vỡ.", chapters: [681] },
];

export function getConnections(id: string) {
  return cosmosRelations.flatMap((relation) => {
    const other = relation.source === id ? relation.target : relation.target === id ? relation.source : undefined;
    const entity = cosmosEntities.find((item) => item.id === other);
    return entity ? [{ relation, entity }] : [];
  });
}

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
export function searchCosmos(query: string) {
  const term = normalize(query.trim());
  return cosmosEntities.filter((item) => normalize([item.name, ...(item.aliases ?? [])].join(" ")).includes(term));
}

export function chapterHref(chapter: number) {
  return `/ebooks/chu-gioi-tan-the-online/doc-truyen?chuong=${chapter}`;
}
