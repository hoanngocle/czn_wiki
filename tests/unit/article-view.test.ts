import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { ArticleView } from "../../components/articles/ArticleView";
import type { WikiArticle } from "../../lib/wiki/articles";

it("keeps table cells, source links and section anchors in a translated article", () => {
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
  expect(html).toContain('href="https://page.onstove.com/example"');
  expect(html).toContain("400% sát thương\nPhân cực");
  expect(html).toContain("+120% cho mỗi X");
  expect(html).toContain("<th scope=\"col\">Chi phí</th>");
  expect(html).toContain("Giá trị &lt; 100% &amp; được giữ nguyên");
});
