"""Integration checks for the standalone EPUB exporter (standard library only)."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]


class ExportEpubTests(unittest.TestCase):
    def test_spine_order_unicode_content_and_navigation(self):
        with tempfile.TemporaryDirectory(dir=ROOT / "tmp") as tmp:
            source = Path(tmp) / "book.epub"
            output = Path(tmp) / "reader"
            with zipfile.ZipFile(source, "w") as book:
                book.writestr("META-INF/container.xml", '<container><rootfiles><rootfile full-path="OEBPS/content.opf"/></rootfiles></container>')
                book.writestr("OEBPS/content.opf", '''<package xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata><dc:title>Truyện thử</dc:title><dc:creator>Tác giả</dc:creator></metadata><manifest><item id="a" href="html/a.html" media-type="application/xhtml+xml"/><item id="b" href="html/b.html" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="b"/><itemref idref="a"/></spine></package>''')
                for name, title in [("a", "Chương 2: Kết thúc"), ("b", "Chương 1: Khởi đầu")]:
                    book.writestr(f"OEBPS/html/{name}.html", f'<html xmlns="http://www.w3.org/1999/xhtml"><head><title>{title}</title></head><body><article><h1>{title}</h1><div class="chapter-text">Tiếng Việt &amp; ký ức.<br/><div/>Dòng cuối.</div></article></body></html>')
            result = subprocess.run([sys.executable, str(ROOT / "scripts/export_epub.py"), str(source), "--output", str(output)], capture_output=True, text=True, encoding="utf-8")
            self.assertEqual(result.returncode, 0, result.stderr)
            manifest = json.loads((output / "chapters.json").read_text(encoding="utf-8"))
            self.assertEqual([c["title"] for c in manifest["chapters"]], ["Chương 1: Khởi đầu", "Chương 2: Kết thúc"])
            first = (output / "html/b.html").read_text(encoding="utf-8")
            self.assertIn("Tiếng Việt &amp; ký ức.", first)
            self.assertIn("<div></div>Dòng cuối.", first)
            self.assertIn('href="a.html" rel="next"', first)
            self.assertNotIn('rel="prev"', first)
            self.assertIn('data-contents aria-haspopup="dialog"', first)
            picker_data = (output / "assets/chapters.js").read_text(encoding="utf-8")
            self.assertEqual(json.loads(picker_data.removeprefix("window.readerChapters = ").strip().removesuffix(";")), manifest["chapters"])
            last = (output / "html/a.html").read_text(encoding="utf-8")
            self.assertIn('href="b.html" rel="prev"', last)
            self.assertNotIn('rel="next"', last)
            self.assertTrue((output / "assets/reader.js").is_file())
            self.assertTrue((output / "index.html").is_file())


if __name__ == "__main__":
    unittest.main()
