"""Export the supplied EPUB to a portable HTML reader, without dependencies.

python -X utf8 scripts/export_epub.py "book.epub" --output public/chu-gioi-tan-the-online
"""
import argparse
import html
import json
import posixpath
from pathlib import Path
import xml.etree.ElementTree as ET
import zipfile

TEMPLATES = Path(__file__).with_name("epub-reader")


def local_name(name):
    return name.rsplit("}", 1)[-1]


def parse(data):
    root = ET.fromstring(data)
    for node in root.iter():
        node.tag = local_name(node.tag)
        node.attrib = {local_name(k): v for k, v in node.attrib.items()}
    return root


def safe_path(base, name):
    path = posixpath.normpath(posixpath.join(base, name))
    if path.startswith(("../", "/")) or "\\" in path or ":" in path:
        raise ValueError(f"Unsafe EPUB path: {name}")
    return path


def document(title, body, prefix="", attributes=""):
    return f'''<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title><meta name="color-scheme" content="light dark">
<link rel="icon" href="data:,"><link rel="stylesheet" href="{prefix}assets/reader.css">
<script src="{prefix}assets/reader.js" defer></script></head><body {attributes}>
<a class="skip-link" href="#main">Đến nội dung</a>{body}</body></html>'''


def controls():
    return '''<dialog class="reader-settings" aria-labelledby="settings-title">
<div class="picker-heading"><h2 id="settings-title">Cài đặt đọc truyện</h2><button type="button" data-close-settings aria-label="Đóng cài đặt" autofocus>✕</button></div>
<div class="settings-row"><span>Cỡ chữ</span><div class="reader-tools" aria-label="Cỡ chữ">
<button type="button" data-font="-1" aria-label="Giảm cỡ chữ">A−</button>
<output id="font-size" aria-live="polite">20</output>
<button type="button" data-font="1" aria-label="Tăng cỡ chữ">A+</button></div></div>
<div class="settings-row"><span>Nền đọc</span><div class="reader-tools"><button type="button" id="theme-toggle" aria-label="Đổi nền sáng tối" aria-pressed="false">◐ <span>Đổi nền</span></button></div></div></dialog>'''


def export_book(source, output):
    output = output.resolve()
    with zipfile.ZipFile(source) as archive:
        container = parse(archive.read("META-INF/container.xml"))
        opf_path = safe_path("", container.find(".//rootfile").attrib["full-path"])
        base = posixpath.dirname(opf_path)
        package = parse(archive.read(opf_path))
        title = package.findtext("metadata/title", "Chư Giới Tận Thế Online")
        author = package.findtext("metadata/creator", "")
        items = {item.attrib["id"]: item.attrib for item in package.findall("manifest/item")}
        chapters = []
        documents = {}
        assets = []
        cover = None
        for item in items.values():
            href = safe_path("", item["href"])
            media = item.get("media-type", "")
            if media == "application/xhtml+xml":
                root = parse(archive.read(safe_path(base, href)))
                documents[item["id"]] = (href, root)
            elif media.startswith(("image/", "font/")) or media == "text/css":
                assets.append((href, archive.read(safe_path(base, href))))
                if "cover-image" in item.get("properties", "").split():
                    cover = href
        for ref in package.findall("spine/itemref"):
            item_id = ref.attrib["idref"]
            if item_id not in documents:
                continue
            href, root = documents[item_id]
            # Only chapter documents; cover, metadata and EPUB nav stay supplementary.
            if root.find(".//*[@class='chapter-text']") is None:
                continue
            heading = root.find(".//h1")
            chapter_title = "".join(heading.itertext()).strip() if heading is not None else root.findtext("head/title", "Chương")
            chapters.append({"number": len(chapters) + 1, "title": chapter_title, "href": href})
        if not chapters:
            raise ValueError("No chapter-text documents found in EPUB spine")

        def write(name, content):
            target = output / safe_path("", name)
            if not target.resolve().is_relative_to(output):
                raise ValueError("Output escapes destination")
            target.parent.mkdir(parents=True, exist_ok=True)
            if isinstance(content, bytes):
                target.write_bytes(content)
            else:
                target.write_text(content, encoding="utf-8", newline="\n")

        for name, content in assets:
            write(name, content)
        for name in ("reader.css", "reader.js"):
            write("assets/" + name, (TEMPLATES / name).read_bytes())
        font_directory = TEMPLATES.parent.parent / "public/fonts/be-vietnam-pro"
        for weight in ("Regular", "SemiBold"):
            name = f"BeVietnamPro-{weight}.ttf"
            write("assets/fonts/" + name, (font_directory / name).read_bytes())
        for index, chapter in enumerate(chapters):
            root = next(root for href, root in documents.values() if href == chapter["href"])
            article = root.find(".//article")
            if article is None:
                raise ValueError(f"Missing article: {chapter['href']}")
            article.set("id", "main")
            article.set("tabindex", "-1")
            folder = posixpath.dirname(chapter["href"])
            prefix = posixpath.relpath(".", folder) + "/" if folder else ""
            links = []
            if index > 0:
                previous = posixpath.relpath(chapters[index - 1]["href"], folder)
                links.append(f'<a href="{previous}" rel="prev">← Chương trước</a>')
            links.append('<button type="button" data-contents aria-haspopup="dialog" aria-expanded="false"><span aria-hidden="true">☰</span> Mục lục</button>')
            if index + 1 < len(chapters):
                following = posixpath.relpath(chapters[index + 1]["href"], folder)
                links.append(f'<a href="{following}" rel="next">Chương sau →</a>')
            navigation = '<nav class="chapter-nav" aria-label="Điều hướng chương">' + "".join(links) + "</nav>"
            body = f'''<header class="reading-header"><a class="brand" href="{prefix}index.html">CHƯ GIỚI <span>/ TỦ SÁCH</span></a><button type="button" class="settings-trigger" data-settings aria-label="Cài đặt đọc truyện" aria-haspopup="dialog" aria-expanded="false">⚙</button></header>
{controls()}<main class="reading-shell">
<div class="chapter-controls">{navigation}</div>{ET.tostring(article, encoding="unicode", method="html")}{navigation}
<footer class="reading-footer">{html.escape(author)} <a href="#main">Về đầu chương ↑</a></footer></main>
<div class="scroll-progress" aria-hidden="true"></div>'''
            write(chapter["href"], document(chapter["title"] + " · " + title, body, prefix, f'data-chapter="{index + 1}" data-href="{html.escape(chapter["href"], quote=True)}"'))

        # Preserve the book's information/cover pages, with browser-friendly links.
        chapter_paths = {chapter["href"] for chapter in chapters}
        for item_id, (href, root) in documents.items():
            if href in chapter_paths or "nav" in items[item_id].get("properties", "").split():
                continue
            for node in root.iter():
                if "href" in node.attrib:
                    node.set("href", node.attrib["href"].replace("nav.xhtml", "index.html").replace("cover.xhtml", "cover.html"))
            write(href.replace(".xhtml", ".html"), "<!doctype html>\n" + ET.tostring(root, encoding="unicode", method="html"))

        entries = "\n".join(f'<li><a href="{c["href"]}"><span>{html.escape(c["title"])}</span><span aria-hidden="true">↗</span></a></li>' for c in chapters)
        cover_html = f'<img src="{html.escape(cover, quote=True)}" alt="Bìa truyện {html.escape(title, quote=True)}" width="300" height="420">' if cover else '<div class="cover-placeholder">CHƯ GIỚI<br>TẬN THẾ<br>ONLINE</div>'
        body = f'''<header class="library-header"><a class="brand" href="index.html">CHƯ GIỚI <span>/ TỦ SÁCH</span></a><a href="#chapters">Mục lục ↗</a></header>
<main id="main"><section class="book-hero"><div class="book-description"><p class="eyebrow">MỘT CUỘC HÀNH TRÌNH QUA CHƯ GIỚI</p>
<h1>Chư Giới Tận Thế <em>Online</em></h1><p class="subtitle">Ngày tàn của thế giới</p>
<p class="author">Tác giả <strong>{html.escape(author)}</strong></p>
<p class="book-intro">Giữa những thế giới đang đi đến hồi kết,<br>một hành trình mới bắt đầu.</p>
<div class="book-facts"><span><strong>{len(chapters):,}</strong> chương</span><span>Tiếng Việt</span><span>Bản đầy đủ từ EPUB</span></div>
<div class="hero-actions"><a class="primary-button" href="{chapters[0]['href']}">Bắt đầu đọc <span>→</span></a><a class="secondary-button" href="#chapters">Xem mục lục</a></div>
<a id="resume" class="resume" hidden>Tiếp tục đọc</a></div><figure class="book-cover">{cover_html}<figcaption>YÊN HỎA THÀNH THÀNH</figcaption></figure></section>
<section id="chapters" class="contents"><div class="contents-heading"><div><h2>Mục lục</h2></div>
<label class="chapter-search"><span>Tìm chương</span><input type="search" id="chapter-search" placeholder="Số chương hoặc tên chương…" autocomplete="off"></label></div>
<p id="search-status" class="search-status" role="status" aria-live="polite">Các chương được sắp theo thứ tự trong sách.</p>
<ol class="chapter-list">{entries}</ol><p id="empty-search" hidden>Không tìm thấy chương phù hợp. Thử số chương hoặc từ khóa khác.</p>
<button class="load-more" id="load-more" type="button" hidden>Xem thêm chương ↓</button></section></main>
<footer class="library-footer"><span>CHƯ GIỚI TẬN THẾ ONLINE</span><span>{html.escape(author)} · Chúc bạn đọc truyện vui vẻ.</span><a href="#main">Về đầu trang ↑</a></footer>'''
        write("index.html", document(title + " · Đọc truyện", body))
        write("chapters.json", json.dumps({"title": title, "author": author, "chapters": chapters}, ensure_ascii=False, indent=2) + "\n")
        write("assets/chapters.js", "window.readerChapters = " + json.dumps(chapters, ensure_ascii=False) + ";\n")
        write("README.txt", f"{title}\n{author}\n\n{len(chapters)} chương, xuất theo thứ tự spine của EPUB.\nMở index.html để đọc; không cần mạng hay cài thêm thư viện.\nTrên website: /chu-gioi-tan-the-online/index.html\nCác chương: html/ ; tài nguyên: assets/ ; danh mục: chapters.json\n")
        return len(chapters)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--output", type=Path, default=Path("public/chu-gioi-tan-the-online"))
    args = parser.parse_args()
    count = export_book(args.source, args.output)
    print(f"Exported {count} chapters to {args.output}")
