import { MAX_READING_CHAPTER } from "../story/reading-progress";

export const ebooks = [{
  slug: "chu-gioi-tan-the-online",
  title: "Chư Giới Tận Thế Online",
  alternateTitle: "Ngày Tàn Của Thế Giới",
  author: "Yên Hỏa Thành Thành",
  cover: "/chu-gioi-tan-the-online/assets/cover.jpg",
  chapters: MAX_READING_CHAPTER,
  genres: ["Tiên hiệp", "Mạt thế"],
  description: "Theo chân Cố Thanh Sơn qua hai thế giới song song: một thế giới tu hành và một thực tại đang bước vào tận thế.",
}];

export function ebookUrl(slug: string) {
  return `/ebooks/${slug}`;
}
