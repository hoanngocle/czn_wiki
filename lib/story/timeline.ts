import { milestones } from "./milestones";
import characterData from "./characters.json";

export type NodeKind = "event" | "character" | "world";
export type StoryNode = {
  id: string;
  title: string;
  kind: NodeKind;
  summary: string;
  eyebrow: string;
  x: number;
  y: number;
  realm?: "cultivation" | "reality";
  portrait?: string;
  chapters?: number[];
  source?: { title: string; url: string };
};
export type StoryLink = { source: string; target: string; label: string; timeline?: boolean; fork?: boolean; introduction?: boolean };

export const storyScope = "Chương 1–1500";
export const chronologyNote = `${milestones.length} mốc theo thứ tự chương EPUB, hai tuyến xen kẽ. Khoảng cách trên sơ đồ không biểu thị thời lượng.`;
export const bookSource = "Chu Gioi Tan The Online - Yen Hoa Thanh Thanh.epub";
export const chapterLabel = (chapters: number[]) => {
  const ranges: string[] = [];
  for (let index = 0; index < chapters.length; index++) {
    const first = chapters[index];
    while (index + 1 < chapters.length && chapters[index + 1] === chapters[index] + 1) index++;
    ranges.push(first === chapters[index] ? `${first}` : `${first}–${chapters[index]}`);
  }
  return `Chương ${ranges.join(", ")}`;
};

const laneCounts = { cultivation: 0, reality: 0 };
const events: StoryNode[] = milestones.map((item) => {
  const chapters = item.chapters ?? Array.from({ length: item.to - item.from + 1 }, (_, index) => item.from + index);
  return { id: item.id, title: item.title, summary: item.summary, kind: "event", realm: item.realm, chapters,
    eyebrow: `${item.realm === "reality" ? "Thế giới thực" : "Tu Hành"} · ${chapterLabel(chapters)}`,
    x: 460 + laneCounts[item.realm]++ * 720, y: item.realm === "cultivation" ? 260 : 760 };
});
const slots: Record<string, number> = {};
const introductions: StoryLink[] = [];
const characters: StoryNode[] = characterData.map((item) => {
  const parent = events.find((event) => event.realm === item.realm && event.chapters!.includes(item.chapter))!;
  const slot = slots[parent.id] ?? 0;
  slots[parent.id] = slot + 1;
  introductions.push({ source: parent.id, target: item.id, label: `Giới thiệu · Chương ${item.chapter}`, introduction: true });
  return { id: item.id, title: item.title, summary: item.summary, realm: item.realm as StoryNode["realm"], kind: "character", chapters: [item.chapter],
    eyebrow: `Lần đầu đề cập · Chương ${item.chapter}`, x: parent.x + (slot % 2) * 340,
    y: item.realm === "cultivation" ? -140 - Math.floor(slot / 2) * 320 : 1120 + Math.floor(slot / 2) * 320 };
});
export const storyNodes: StoryNode[] = [
  { id: "hero", title: "Cố Thanh Sơn", kind: "character", eyebrow: "Nhân vật chính · Chương 1", x: 0, y: 520, chapters: [1],
    summary: "Trở lại trước tận thế, Cố Thanh Sơn qua lại giữa Tu Hành và hiện thực, rồi bước vào Hoàng Tuyền, chín trăm triệu tầng thế giới và thời Thượng Cổ. Cùng đồng bạn chống tận thế, cứu Thiên Địa song kiếm và tìm hiểu Thâm Uyên; hành trình chương 1–1500 được nối theo từng mốc. Hồ sơ và Giao diện Chiến Thần ghi trạng thái theo chương đang đọc." },
  ...events, ...characters,
];
export const timelineIds = events.map((node) => node.id);
export const storyLinks: StoryLink[] = [
  ...(["cultivation", "reality"] as const).flatMap((realm) => {
    const branch = events.filter((node) => node.realm === realm);
    return branch.map((node, index) => ({ source: index ? branch[index - 1].id : "hero", target: node.id,
      label: index ? "Tiếp diễn" : realm === "cultivation" ? "Tu Hành" : "Thế giới thực", timeline: true, fork: index === 0 }));
  }),
  ...introductions,
];

export const nodeLabels: Record<NodeKind, string> = { event: "Sự kiện", character: "Nhân vật", world: "Thế giới" };
export const sceneSize = { width: Math.max(8000, ...events.map((node) => node.x + 1200)), height: 3300 };
export const nodeSize = { width: 400, height: 224 };

export function getNodeSize(node: Pick<StoryNode, "kind" | "title" | "portrait">) {
  const character = node.kind === "character";
  return {
    width: character ? 300 : nodeSize.width,
    // Reserve enough lines for long edited titles; geometry uses the same size.
    height: Math.max(character ? 180 : nodeSize.height, 112 + Math.ceil(node.title.length / (character ? 12 : 14)) * 28) + (character && node.portrait ? 96 : 0),
  };
}
