import notes from "./chapter-notes.json";
import { milestones } from "./milestones";

export type StoryArc = { id: string; title: string; from: number; to: number; order: number };
// Editorial groupings by story development, not official volume titles.
const chapters = notes.at(-1)?.chapter ?? 1;
const groups: [string, string, number][] = [
  ["khoi-dau-bach-hoa", "Trở lại tận thế · Nhập môn Bách Hoa", 100],
  ["tue-thi-quyet-chien", "Tuế thí · Quyết chiến", 167],
  ["cuu-phu-thanh-giao", "Cửu phủ · Thánh giáo", 237],
  ["than-vo-trieu-am", "Thần Võ · Triều Âm", 300],
  ["bien-kiem-thien-ma", "Biển kiếm · Thiên Ma", 330],
  ["kiem-tien-phuc-hy", "Kiếm Tiên · Biến động Phục Hy", 407],
  ["hoang-tuyen-luc-dao", "Hoàng Tuyền · Cứu Lục Đạo", 469],
  ["huyen-khong", "Huyền Không · Quảng Dương", 531],
  ["thiet-quyen", "Thiết Quyền Chính Nghĩa", 572],
  ["laura-moi-lua", "Laura · Mồi Lửa", 642],
  ["thien-tru-kinh-cuc", "Thiên Tru · Lời hứa Kinh Cức", 680],
  ["tro-ve-luc-dao", "Trở về Lục Đạo · Cứu Địa kiếm", 722],
  ["tranh-ba-doan-toi", "Khu Tranh Bá · Đồng hành Đoạn Tội", 769],
  ["luu-sa-hoang-van", "Mê cung Lưu Sa · Hoang Vân Thiên Cung", 814],
  ["thuong-co-than-vuong", "Thượng Cổ · Thân phận Thần vương", 866],
  ["ma-long-dia-kiep", "Ma Long · Bốn thế giới của kiếp nạn", 908],
  ["thien-dia-song-kiem", "Thiên Địa song kiếm · Trở về", 940],
  ["song-tu-tru-than-dat", "Sao Song Tử · Trụ Thần Đất", 974],
  ["luong-kiep-the-gioi", "Kinh Cức hội ngộ · Lượng kiếp", 1000],
];

let from = 1;
const curated: StoryArc[] = [];
for (const [id, title, end] of groups) {
  if (from > chapters) break;
  curated.push({ id, title, from, to: Math.min(end, chapters), order: curated.length + 1 });
  from = end + 1;
}
// Newly integrated chapters stay reachable while later editorial groups are refined.
for (; from <= chapters; from += 50) {
  const opening = milestones.find((item) => item.from >= from && item.from < from + 50);
  curated.push({ id: `tiep-noi-${from}`, title: opening?.title ?? `Hành trình từ chương ${from}`, from, to: Math.min(from + 49, chapters), order: curated.length + 1 });
}
export const storyArcs = curated;
export const getStoryArc = (id?: string) => storyArcs.find((arc) => arc.id === id) ?? storyArcs[0];
export const arcForChapter = (chapter: number) => storyArcs.find((arc) => chapter >= arc.from && chapter <= arc.to);
export const arcUrl = (arc: Pick<StoryArc, "id">) => `/ebooks/chu-gioi-tan-the-online?arc=${encodeURIComponent(arc.id)}`;
