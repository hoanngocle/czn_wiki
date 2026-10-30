import { extendedMissions } from "./war-god-101-200";
import { missionEvents300, missionFacts300, missions300 } from "./war-god-201-300";
import { extendMissions } from "./war-god-extension";
export type MissionKind = "destiny" | "system";
export type MissionStatus = "active" | "completed";
export type MissionEvent = { chapter: number; paragraphs: string; text: string; status?: MissionStatus; title?: string; objective?: string };
export type MissionFact = { chapter: number; label: string; text: string };
export type Mission = {
  id: string;
  title: string;
  kind: MissionKind;
  issuer: string;
  firstChapter: number;
  objective: string;
  events: MissionEvent[];
  facts?: MissionFact[];
};
export type MissionProjection = Mission & { status: MissionStatus };
export const MAX_MISSION_CHAPTER = 1500;
// Only missions explicitly issued by the War God system belong in this catalogue.
// Later discoveries, rewards and outcomes are dated to avoid chapter spoilers.
// Paragraphs refer to nonempty, HTML-stripped chapter-text paragraphs in the local novel.
const missionHistory: Mission[] = [
  {
    id: "death-battle", title: "Trận Chiến Chết Chóc", kind: "destiny",
    issuer: "Giao diện Chiến Thần", firstChapter: 34,
    objective: "Cứu giúp Công Tôn Trí và Ninh Nguyệt Thiền, thay đổi số mệnh tử vong của hai người.",
    events: [
      { chapter: 34, paragraphs: "62–71", text: "Kích hoạt kịch bản Trận Chiến Chết Chóc và nhiệm vụ Định Mệnh.", status: "active" },
      { chapter: 36, paragraphs: "40–62", text: "Công Tôn Trí giao tín vật và chỉ đường tới trận truyền tống ở thế giới khác." },
      { chapter: 55, paragraphs: "71", text: "Giao diện vẫn ghi đang tiến hành; hai người còn kiên trì trong vòng vây." },
      { chapter: 62, paragraphs: "66–73", text: "Thanh Sơn cầu xin Bách Hoa cứu hai người và trình bày tình báo." },
      { chapter: 66, paragraphs: "19–24, 52–61, 115", text: "Bách Hoa đưa cả hai khỏi vòng vây, nhưng Công Tôn Trí còn cần chữa ma hỏa; chưa có thông báo hoàn thành." },
      { chapter: 69, paragraphs: "22–25", text: "Nhiệm vụ Định Mệnh vẫn ghi Đang tiến hành vì Công Tôn Trí chưa thoát nguy hiểm tính mạng.", status: "active" },
      { chapter: 80, paragraphs: "42–44", text: "Bách Hoa xác nhận đã cứu Công Tôn Trí; Thanh Sơn thấy thông báo nhiệm vụ đã hoàn thành.", status: "completed" },
      { chapter: 81, paragraphs: "111–114", text: "Thông báo kết toán: cả hai trở lại trận doanh Nhân tộc an toàn, tình báo được báo cáo, nội gián Đao Hoàng bị giết. Nhận phần thưởng kịch bản mở Thần thông Chiến Thần." },
    ],
    facts: [
      { chapter: 34, label: "Phần thưởng", text: "Kỹ năng đặc biệt Chiến Thần Thần Thông (duy nhất)." },
      { chapter: 34, label: "Thất bại", text: "Người chơi bị xoá sổ." },
      { chapter: 81, label: "Đã nhận", text: "Thần thông của Chiến Thần (Kịch bản đặc biệt); mở vòng quay và nhiệm vụ thu thập tiếp theo." },
    ],
  },
  {
    id: "divinity-materials", title: "Thần thông Chiến Thần", kind: "system",
    issuer: "Giao diện Chiến Thần", firstChapter: 81,
    objective: "Thu thập vật phẩm của năm chủng Hỗn Loạn, Thâm Uyên, Vũ Trụ, Hoàng Tuyền và Chưa Biết, rồi đưa vào vòng quay.",
    events: [
      { chapter: 81, paragraphs: "114–135", text: "Vòng quay năm hốc mở ra; nhận yêu cầu thu thập và đặt vật phẩm của năm chủng vào vòng quay.", status: "active" },
      { chapter: 82, paragraphs: "36–46", text: "Lấy bốn vật ở kho Bách Hoa: kiếm mẻ Hoàng Tuyền, móng giao hai sừng Hỗn Loạn, sọ mười mắt Thâm Uyên, tàn vật phủ sương Chưa Biết. Còn thiếu Vũ Trụ." },
      { chapter: 85, paragraphs: "11–15, 22–45", text: "Đã khảm bốn vật, bốn hốc hóa điểm sáng; nhờ Trương Anh Hào tìm vật Vũ Trụ." },
      { chapter: 86, paragraphs: "63–66, 119–124", text: "Đánh cược ở sòng bạc để tìm cách lấy vật phẩm cần cho vòng quay." },
      { chapter: 87, paragraphs: "38–55", text: "Nhận thử thách sống sót ba phút nhằm lấy giải lớn của sòng bạc." },
      { chapter: 89, paragraphs: "7–36", text: "Đánh lui ba cá sấu trong thử thách sòng bạc." },
      { chapter: 90, paragraphs: "13–18", text: "Ông chủ sòng bạc vẫn không chịu trao giải; chưa lấy được vật Vũ Trụ." },
      { chapter: 92, paragraphs: "28–39", text: "Lấy mảnh tim quái vật Vũ Trụ, bảo quản trong hộp lạnh; chưa đưa vào vòng quay." },
      { chapter: 95, paragraphs: "25–32", text: "Khảm mảnh tim vào hốc cuối. Hệ thống xác nhận nhiệm vụ hoàn thành trước hạn; vòng quay sẵn sàng chờ đột phá.", status: "completed" },
      { chapter: 97, paragraphs: "48–65", text: "Sau khi Trúc Cơ, hệ thống đánh giá S và cho bốn lựa chọn thần thông; chưa công bố đầy đủ các lựa chọn." },
      { chapter: 98, paragraphs: "16–24, 49–50, 75", text: "Chọn Tru Tà; hệ thống xác nhận phát thưởng xong. Khi thức tỉnh Lôi điện, chọn hướng Sinh pháp." },
      { chapter: 99, paragraphs: "3–6", text: "Xác nhận Tru Tà tăng sát thương yêu ma ba phần; Mất Khống Chế khiến mục tiêu trúng đòn mất điều khiển cơ thể trong một giây." },
    ],
    facts: [
      { chapter: 81, label: "Thời hạn", text: "48 giờ trong truyện để thu thập và đưa vật phẩm vào vòng quay; không phải bộ đếm theo thời gian thực." },
      { chapter: 81, label: "Quy tắc thưởng", text: "Hết 48 giờ vẫn được rút dù chưa đủ vật phẩm. Chất lượng cao hơn và thu thập nhanh hơn tăng cơ hội thần thông mạnh; không nêu phạt xóa sổ." },
      { chapter: 97, label: "Đánh giá", text: "Hệ thống đánh giá S, mở bốn lựa chọn." },
      { chapter: 98, label: "Đã nhận", text: "Tru Tà; sau đó chọn Sinh pháp khi thức tỉnh Lôi điện." },
    ],
  },
  ...extendedMissions,
  ...missions300,
];
export const warGodMissions: Mission[] = extendMissions(missionHistory.map((mission) => ({ ...mission, events: [...mission.events, ...(missionEvents300[mission.id] ?? [])], facts: [...(mission.facts ?? []), ...(missionFacts300[mission.id] ?? [])] })));
export function getWarGodMissions(value: number): MissionProjection[] {
  const chapter = Number.isInteger(value) && value > 0 ? Math.min(value, MAX_MISSION_CHAPTER) : 1;
  return warGodMissions.filter((mission) => mission.firstChapter <= chapter).map((mission) => {
    const events = mission.events.filter((event) => event.chapter <= chapter).map((event) => ({ ...event }));
    const status = events.reduce<MissionStatus>((latest, event) => event.status ?? latest, "active");
    return {
      ...mission,
      title: events.findLast((event) => event.title)?.title ?? mission.title,
      objective: events.findLast((event) => event.objective)?.objective ?? mission.objective,
      status,
      events,
      facts: mission.facts?.filter((fact) => fact.chapter <= chapter).map((fact) => ({ ...fact })),
    };
  });
}
