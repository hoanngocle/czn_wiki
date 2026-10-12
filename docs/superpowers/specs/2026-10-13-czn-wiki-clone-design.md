# Phân tích nguồn và thiết kế clone CZN Wiki

Ngày phân tích: 13/10/2026. Trạng thái: đề xuất để review; chưa triển khai sản phẩm.

## 1. Mục tiêu và quyết định mới nhất

- Người dùng muốn dựng lại site để sau đó điều chỉnh lần lượt từng phần.
- **E7BOT là chuẩn giao diện chính: gần như y hệt, chỉ cải tiến nhẹ cho hiện đại.** Chỉ dẫn này thay thế phương án lấy bố cục Prydwen đã trao đổi trước đó.
- Prydwen là nguồn tham khảo nội dung bổ sung; không dùng sidebar, hero, bố cục bài viết của Prydwen để thay giao diện E7BOT.
- Lượt hiện tại chỉ phân tích và lập kế hoạch.
- Phạm vi đề xuất là Chaos Zero Nightmare. E7BOT còn có Epic Seven, nhưng chưa đưa phần đó vào đợt clone CZN; đây là giả định phạm vi, không phải dữ kiện người dùng đã chốt.
- Mốc đầu tiên: khung E7BOT + bộ chọn nhân vật + chi tiết Renoa + thẻ bài, đủ dùng để review trực quan trước khi mở rộng.

## 2. Hiện trạng repo

- Next.js `16.4.0`, React/React DOM `19.3.0`, TypeScript 5, Tailwind CSS 4.
- `app/page.tsx`, `app/layout.tsx`, `app/globals.css` vẫn là starter; chưa có hệ thống wiki.
- Script hiện có: `dev`, `build`, `start`, `lint`. Chưa có script test.
- Đã đọc hướng dẫn cục bộ `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` và `05-server-and-client-components.md`. Khi triển khai tiếp tục đọc các guide tương ứng với ảnh, font, metadata và route động.
- Hai thư mục trong `docs/` là snapshot HTML/JS/CSS/assets đã build; không có source component gốc, package riêng hay source map trong inventory.

## 3. Inventory đã kiểm tra

| Nguồn | Số file | Dung lượng xấp xỉ | Thành phần |
| --- | ---: | ---: | --- |
| `docs/wiki.e7bot.top` | 138 | 5,50 MiB | 16 JS, 8 CSS, 5 HTML, 92 WebP, 10 PNG, 6 WebM, 1 ICO |
| `docs/www.prydwen.gg` | 147 | 8,82 MiB | 51 JS, 46 CSS, 9 HTML, 34 WebP, 1 PNG, 4 WOFF2, 1 JSON, 1 ICO |

### E7BOT

- `index.html` là shell Vue với `<div id="app">`, nạp bundle `js/index-DKI40WV2.js` và CSS; không có nội dung wiki render sẵn trong HTML.
- Bundle thể hiện Vue, router, bản dịch và nhiều route E7/CZN. Các file `CznCombatantPage`, `CombatantPicker`, `CznCard`, `RSparkCardModal`, `GradeFilter` đã có.
- Route có trong bundle không đồng nghĩa trang đã tải đủ. Chunk của Partner, Cards database, Relics, Stories, Portrait và nhiều trang khác không có trong snapshot.
- Ba file API mang đuôi `.html` thực chất chứa JSON mã hóa: `api/czn/characters/list.html`, `api/czn/characters/1041.html`, `api/czn/snapshot/characters/diff.html`.
- Đã giải mã thử trong bộ nhớ bằng cùng quy tắc AES-CBC mà client bundle sử dụng; cả ba trả về JSON parse được với `code: 0`. Không thay đổi snapshot, không gọi API trực tuyến.
- Danh sách gồm **87 bản ghi: 38 `CHAR_COMBATANT`, 49 `CHAR_SUPPORTER`**. Không được coi cả 87 là nhân vật chiến đấu.
- Hồ sơ chi tiết duy nhất: **Renoa, ID `1041`, rarity 5, job `hunter`, ego nội bộ `creed`**.
- Renoa có 4 `start_cards`, 4 `spark_cards`, 6 `combatant_limit_breaks`, 10 `potential_nodes`, 1 `potential_target_cards`, cùng Ego/collapse và thông tin khác. Số phần tử mảng không đồng nghĩa số artwork riêng biệt hoặc số biến thể thẻ.
- 39 ảnh trong thư mục face/character gồm 38 portrait crop half và 1 face của Renoa; có 6 video artwork unique của Renoa.
- UI có tìm kiếm, lọc rarity/ego/job, chọn nhân vật, modal thẻ/upgrade, bật/tắt animation, chỉ hiện artwork; mobile dùng bộ chọn dạng overlay và tab Cards/Manifest Ego/Potential.
- Có code cho Counseling và Town Visit nhưng response API tương ứng chưa có. April Fool artwork cũng chưa có; không coi là tính năng đủ nguồn.

### Prydwen

- `chaos-zero-nightmare/characters/renoa.html` là HTML Renoa dài khoảng 1,74 triệu ký tự, kèm payload Next.js.
- Đã nhận diện nội dung Kit, Review, Decks & Teams, Build, Cards; Potential, Manifest Ego, Partners, Fragments, Equipment và Seasonal Powers.
- Trang hiển thị “Last updated: 15/March/2026”. Đây là thông tin của snapshot, không phải xác nhận dữ liệu hiện hành.
- `index.html` là dữ liệu RSC/prefetch, không phải trang chủ HTML hoàn chỉnh. Không dùng nó làm bằng chứng đã có toàn bộ homepage.
- Bốn file `.woff2` chỉ dài 90–93 byte và chứa `No Content`; không sử dụng được như font. Hai HTML RSC phụ và một CSS cũng là placeholder.
- Có ảnh full/icon Renoa, chín ảnh card `ronoa_*`, các icon hệ/class, ảnh một số nhân vật liên quan. Cần giữ tên file thực trong manifest, không tự đổi `ronoa` thành `renoa` trong đường dẫn.
- Những link đến Characters, Teams, Tier list, Guides, Equipment, Partners trong HTML chỉ chứng minh điều hướng; không chứng minh có dữ liệu của các trang đó.

## 4. Chuẩn giao diện E7BOT cần giữ

Đã xác nhận từ CSS và render code; chưa chạy snapshot trong browser hoặc đối chiếu screenshot ở lượt phân tích này.

- Giữ cấu trúc điều hướng của E7BOT, vùng chọn nhân vật và vùng chi tiết; không đổi thành landing page marketing hay trang article kiểu Prydwen.
- Desktop: bộ chọn ở vùng bên cạnh nội dung; nhân vật được chọn cập nhật URL `/czn/combatant/:combatantId` và vùng chi tiết.
- Giữ thứ tự nội dung, hệ icon, tỷ lệ portrait, phân nhóm thẻ, phần Manifest Ego và Potential.
- Mobile: bộ chọn thành overlay, nội dung có tab; giữ ý tưởng này và hoàn thiện focus/đóng mở/scroll.
- CSS nguồn có cả `.dark` và `.light`; bảo toàn hai theme. Chế độ khởi tạo cuối cùng sẽ kiểm tra ở baseline render, không suy từ màu ảnh riêng lẻ.
- Token dark đã đọc: nền chính `#1C1E23`, nền phụ `#252831`, nền bậc ba `#2A2D35`; blue `#4D88FF`, cyan `#5bc0de`; radius 4/8/12/16px.
- Body nguồn dùng Segoe UI và các font hệ thống CJK, cỡ 15px. Không cần font Anuphan bị thiếu của Prydwen để clone giao diện E7BOT.
- Các breakpoint đã thấy: 480px, 767/768px, 1024px. Bộ chọn có portrait tỷ lệ `260 / 460`; cần áp dụng đúng component và scale, không dùng tỷ lệ đó cho mọi avatar.
- Thẻ bài là nhiều lớp artwork/frame/rarity/cost/icon/text, có hiệu ứng hover và video; không thay bằng card UI chung chỉ gồm một ảnh và đoạn văn.

### Nâng cấp nhẹ được đề xuất

1. Chuẩn hóa khoảng cách và độ tương phản nhưng giữ mật độ thông tin, màu và vị trí các vùng.
2. Làm rõ selected/hover/focus; chuyển động ngắn, hỗ trợ reduced motion.
3. Modal dùng bàn phím được, có focus trap, Escape và trả focus về nút mở.
4. Bổ sung skeleton, trạng thái không có kết quả và trạng thái thiếu dữ liệu rõ ràng.
5. Tối ưu ảnh/video theo vùng nhìn; giữ thao tác bật/tắt animation như nguồn.

Làm bản fidelity trước, polish sau để có thể phân biệt phần clone và thay đổi chủ ý. Không đặt mục tiêu phần trăm giống khi chưa có baseline screenshot.

## 5. Khả năng hoàn thiện theo dữ liệu hiện có

| Phần | Có thể làm ngay | Giới hạn |
| --- | --- | --- |
| Shell, theme, điều hướng | Đọc/rebuild từ bundle và CSS | Cần render để chốt kích thước/scroll |
| Bộ chọn nhân vật | 38 combatant, portrait, tìm kiếm và bộ lọc | 37 nhân vật chưa có detail response |
| Chi tiết Renoa | Kit, cards, Manifest Ego, Potential | Cần kiểm kê asset tới từng biến thể |
| Modal/animation thẻ Renoa | Frame, sprite cost, video, code tham chiếu | April Fool và một số biến thể thiếu asset |
| Partner | Có 49 summary record | Chưa có detail/chunk riêng, không đưa vào milestone đầu |
| Build/review Renoa | Có nội dung tham khảo Prydwen | Có thể khác phiên bản với kit E7BOT |
| Cards toàn game, Sparks, Relics, Items, Encounters, Stories, Deck Builder | Có tên route/chứng cứ menu | Thiếu dữ liệu và/hoặc chunk để cam kết clone đầy đủ |
| Login/profile, công cụ Epic Seven | Có nhắc trong bundle | Ngoài phạm vi CZN đầu tiên |

37 hồ sơ chưa có chi tiết phải hiện summary thật và thông báo chưa có dữ liệu chi tiết; không nhân bản kit Renoa hoặc bịa nội dung. Route không thuộc inventory phải trả 404. Các chức năng thiếu snapshot không được hiển thị như đã hoạt động đầy đủ.

## 6. Ba cách triển khai

| Cách | Ưu điểm | Hạn chế | Kết luận |
| --- | --- | --- | --- |
| Chạy trực tiếp bản Vue đã build | Gần source render nhất khi đủ tài nguyên | Thiếu chunk/API, khó chỉnh từng phần, không phù hợp nền Next hiện tại | Chỉ dùng làm baseline tham chiếu |
| Rebuild component React trên Next, bám CSS/assets E7BOT | Dễ sửa từng phần, dữ liệu độc lập, dùng repo hiện có | Cần đối chiếu visual và port tương tác | **Đề xuất** |
| Thiết kế lại bằng bố cục Prydwen | Thuận tiện cho bài hướng dẫn dài | Không khớp chỉ dẫn mới nhất về giao diện | Không chọn |

## 7. Kiến trúc đề xuất

- Giữ Next App Router và TypeScript; không đổi stack hay chạy hai runtime Vue/React trong sản phẩm.
- Snapshot `docs/wiki.e7bot.top` và `docs/www.prydwen.gg` là nguồn đối chiếu, không sửa tại chỗ.
- Import offline thành dữ liệu có kiểu + asset manifest. Chỉ copy tài nguyên dùng tới sang `public/reference/e7bot/` và sau này `public/reference/prydwen/`.
- Page/layout đọc dữ liệu bằng Server Component. Picker, filter, theme, tab, modal và video control là Client Component ở ranh giới nhỏ.
- Phase đầu không cần database/CMS/login hoặc backend đồng bộ. Nội dung có nguồn gốc rõ ràng và file riêng để dễ cập nhật sau.
- Không mang script quảng cáo/analytics/session trong snapshot vào bản dựng; chỉ tái sử dụng phần giao diện và nội dung thuộc phạm vi.
- Model tách `CharacterSummary`, `CharacterDetail`, `Card`, `Guide`, `AssetManifest`; `Guide` bổ sung sau khi baseline E7BOT đạt yêu cầu.
- Mỗi dữ liệu giữ `source`, `sourceId`, `sourceFile`, `sourceUpdatedAt` nếu có. Ngày import không thay cho ngày cập nhật nguồn.
- ID `1041` ↔ slug `renoa` đã đối chiếu bằng tên hai nguồn. `creed` ↔ `Void` chỉ được xác nhận cho Renoa trong lần đọc này; chưa suy rộng thành mapping đầy đủ của các hệ.
- Giữ bản nội dung tiếng Anh đã có trong API mẫu để đối chiếu; tách label UI và tên đa ngôn ngữ. Việt hóa toàn bộ chưa nằm trong phạm vi chốt.

### Routes của milestone đầu

- `/`: chuyển tới `/czn/combatant`, không tự thiết kế homepage mới.
- `/czn/combatant`: picker + trạng thái chọn nhân vật như nguồn.
- `/czn/combatant/[combatantId]`: cùng bố cục, có nhân vật đang chọn; Renoa đầy đủ, nhân vật khác summary + trạng thái thiếu detail.
- Không cần một route khác theo URL Prydwen cho cùng nhân vật.

## 8. Tiêu chí nghiệm thu

- Cùng vùng màn hình, theme và trạng thái: so sánh bản dựng với E7BOT baseline về bố cục, chiều rộng, spacing, typography, portrait crop, card scale và thứ tự nội dung.
- Viewport kiểm tra: 1440×900, 1024×768, 390×844; không tràn ngang ngoài các vùng cuộn có chủ ý.
- Bộ chọn chỉ có 38 combatant; filter kết hợp hoạt động, clear trả lại 38, query không khớp hiện empty state.
- Deep link Renoa, refresh và back/forward giữ đúng lựa chọn; ID lạ 404; ID hợp lệ thiếu detail không hiển thị dữ liệu giả.
- Thẻ có cost/description/frame đúng dữ liệu; video có poster fallback; tắt animation và reduced motion được tôn trọng.
- Modal đóng bằng Escape, trả focus và cuộn đúng trên mobile.
- Không có request ngầm tới backend gốc để bù dữ liệu; missing asset được ghi nhận và có fallback có chủ ý.
- Lint, TypeScript, production build và test tương tác chính đạt trước khi gọi milestone hoàn tất.

## 9. Những điểm còn phải kiểm chứng

- Baseline render của snapshot E7BOT: cần máy chủ local chỉ để phục vụ file gốc, ánh xạ API không đuôi sang các `.html`, history fallback đúng và chặn request tracker. Đây là công cụ QA, không phải sản phẩm.
- Kích thước điều hướng/scroll thực tế, trạng thái theme ban đầu và mọi asset card được tham chiếu.
- Thứ tự ưu tiên những trang ngoài Combatant sau khi người dùng xem mẫu đầu.
- Có đưa build/review Prydwen vào một section bổ sung hay không sau khi bản clone E7BOT được review. Hiện không tự chèn làm thay đổi cấu trúc chính.

Kế hoạch triển khai nằm tại `../plans/2026-10-13-czn-wiki-clone.md`.
