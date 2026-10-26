import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { ArticleView } from "../../components/articles/ArticleView";
import type { WikiArticle } from "../../lib/wiki/articles";

it("keeps article content and anchors without source attribution", () => {
  const article: WikiArticle = {
    slug: "example", title: "Bản cập nhật", description: "Nội dung tiếng Việt", date: "2026-10-21", kind: "patch-note",
    sources: [{ name: "STOVE", url: "https://page.onstove.com/example" }],
    sections: [{ id: "rossweisse", title: "Rossweisse", blocks: [
      { type: "table", headers: ["Thẻ", "Hiệu ứng", "Chi phí"], rows: [["Flicker Blade", "400% sát thương\nPhân cực", "0"], ["Unbound", "+120% cho mỗi X", "X"]] },
      { type: "paragraph", text: "Giá trị < 100% & được giữ nguyên" },
    ] }],
  };
  const html = renderToStaticMarkup(createElement(ArticleView, { article }));
  expect(html).toContain('href="#rossweisse"');
  expect(html).toContain('id="rossweisse"');
  expect(html).not.toContain('https://page.onstove.com/example');
  expect(html).not.toContain('STOVE');
  expect(html).not.toContain('Bản dịch tiếng Việt từ tài liệu đã lưu');
  expect(html).toContain("400% sát thương\nPolarize");
  expect(html).toContain("+120% cho mỗi X");
  expect(html).toContain("<th scope=\"col\">Cost</th>");
  expect(html).toContain("Giá trị &lt; 100% &amp; được giữ nguyên");
});

it("keeps names English across patch note headings, captions, lists and tables", () => {
  const article: WikiArticle = {
    slug: "example", title: "Lễ Hội Ác Mộng", description: "Nhận Thẻ Hiển Ngộ và Mảnh Ký Ức.", date: "2026-10-21", kind: "patch-note",
    sources: [], sections: [{ id: "kit", title: "Hiện Thực Hóa Bản Ngã", blocks: [
      { type: "heading", text: "Quân Bình Quang Ám (Equilux)" },
      { type: "list", items: ["Nhận 1 Điểm Hành động; giảm chi phí của lá bài."] },
      { type: "image", src: "/example.png", alt: "Tua Kiếm (Sword Tassel)", caption: "Công Lý (Justice), lớp Đột Kích (Striker)." },
    ] }],
  };
  const html = renderToStaticMarkup(createElement(ArticleView, { article }));
  for (const name of ["Nightmare Carnival", "Epiphany Card", "Memory Fragments", "Manifest Ego", "Equilux", "1 AP", "Sword Tassel", "Justice", "Striker"]) expect(html).toContain(name);
  for (const name of ["Hiển Ngộ", "Bản Ngã", "Tua Kiếm", "Quân Bình Quang Ám", "Công Lý", "Đột Kích", "Equilux (Equilux)"]) expect(html).not.toContain(name);
  expect(html).toContain("giảm chi phí của lá bài");
});
