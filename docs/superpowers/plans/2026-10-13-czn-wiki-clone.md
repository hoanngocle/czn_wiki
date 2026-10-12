# CZN Wiki — E7BOT Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng giao diện CZN gần như E7BOT, nâng cấp nhẹ và dễ chỉnh từng phần; hoàn thiện luồng chọn nhân vật → Renoa trước.

**Architecture:** Rebuild bằng React/Next App Router, tái sử dụng assets và quy tắc hiển thị E7BOT. Import snapshot offline thành dữ liệu có kiểu; UI tương tác tách thành component nhỏ. Prydwen chỉ bổ sung nội dung sau baseline, không quyết định bố cục.

**Tech Stack:** Next.js 16.4.0, React 19.3.0, TypeScript, CSS Modules + CSS variables, Tailwind hiện có. Đề xuất thêm Vitest cho data/filter và Playwright cho tương tác/visual khi bắt đầu triển khai, chưa cài ở lượt lập kế hoạch.

**Spec:** `../specs/2026-10-13-czn-wiki-clone-design.md`

**Status:** Kế hoạch đề xuất theo yêu cầu phân tích trước. Chưa thực thi task, chưa chốt thiết kế bằng screenshot, chưa có build/test sản phẩm.

## Global Constraints

- E7BOT là chuẩn giao diện chính: gần như y hệt, chỉ cải tiến nhẹ cho hiện đại.
- Không sửa hai thư mục snapshot nguồn tại chỗ.
- Danh sách có 38 combatant và 49 supporter; chỉ có detail Renoa `1041`.
- Không bịa detail/asset của nhân vật hoặc chức năng thiếu nguồn.
- Prydwen chỉ dùng cho nội dung bổ sung sau khi baseline E7BOT đạt yêu cầu.
- Không gọi backend gốc để bù dữ liệu trong runtime sản phẩm.
- Đọc tài liệu Next cục bộ theo AGENTS.md trước khi viết code tương ứng.
- Chưa triển khai CMS, tài khoản, công cụ Epic Seven hoặc đồng bộ trực tuyến.

## Review Focus

- Summary hợp lệ nhưng thiếu detail → hiện summary và thông báo thiếu dữ liệu; không crash hoặc dùng kit Renoa.
- Hai loại bản ghi cùng nằm trong list → picker Combatant tuyệt đối không lẫn 49 supporter.
- File asset tồn tại nhưng chứa `No Content` → đánh dấu không dùng được; không coi tồn tại là hợp lệ.
- Deep link, reload và back/forward → lựa chọn URL và vùng detail khớp nhau.
- Mobile/modal/reduced motion → không kẹt focus, khóa scroll vĩnh viễn hoặc tự chạy animation khi đã tắt.

## File map dự kiến

```text
app/
  layout.tsx                         # theme, metadata và shell gốc
  page.tsx                           # chuyển tới Combatant
  globals.css                        # reset và global tối thiểu
  czn/layout.tsx                     # E7BOT shell dùng chung
  czn/combatant/page.tsx              # chưa chọn nhân vật
  czn/combatant/[combatantId]/page.tsx # chọn bằng ID
  czn/combatant/loading.tsx
  czn/combatant/[combatantId]/not-found.tsx
components/
  shell/{WikiShell,Navigation,ThemeToggle,MobileNavigation}.tsx
  combatants/{CombatantWorkspace,CombatantPicker,CombatantFilters,CombatantPortrait}.tsx
  combatants/{CombatantDetail,ManifestEgo,PotentialPanel,MissingDetail}.tsx
  cards/{GameCard,CardArtwork,CardCost,CardDescription,CardDetailModal}.tsx
  ui/{Dialog,EmptyState,Skeleton}.tsx
styles/wiki-tokens.css               # token đối chiếu E7BOT
lib/wiki/{types,repository,filters,assets,description}.ts
data/wiki/{characters,assets,source-manifest}.json
data/wiki/characters/1041.json
public/reference/e7bot/              # chỉ assets đã kiểm tra và dùng
scripts/reference-server.mjs         # phục vụ baseline snapshot, chỉ dev
scripts/import-e7bot.mjs             # giải mã/chuẩn hóa offline
scripts/audit-reference-assets.mjs
tests/unit/{import-e7bot,filters,assets,repository,description}.test.ts
tests/e2e/{shell,combatants,cards}.spec.ts
docs/reference-baselines/            # ảnh và checklist nguồn/bản dựng
```

Mỗi nhóm component có CSS Module đi kèm; không gom tất cả CSS vào globals. Chỉ tạo file khi task cần, không dựng sẵn module ngoài phạm vi.

## Task 1: Baseline nguồn và dữ liệu có thể tái lập

**Files:** các script, `lib/wiki/types.ts`, data JSON, public/reference/e7bot, tests unit import/assets/repository, package scripts và cấu hình test.

**Interfaces:** `CharacterSummary` giữ `id`, `name`, `names`, `kind: 'combatant' | 'supporter'`, `job`, `ego`, `rarity`, `portrait`, `source`; detail giữ các nhóm cards/manifestEgo/potential và source. `AssetManifest` map đường dẫn nguồn sang local URL và trạng thái `available | missing | invalid`. `getCombatants(): CharacterSummary[]`, `getCharacter(id: string): CharacterSummary | undefined`, `getCharacterDetail(id: string): CharacterDetail | undefined` chỉ đọc dữ liệu đã import.

- [ ] Viết importer thuần `decodeSnapshot(payload, key)` và `normalizeCharacters(records)` với fixture test trước: đọc được 87 record, tách 38/49, detail có ID `1041` và tên Renoa; payload hỏng báo lỗi rõ ràng.
- [ ] Port quy tắc giải mã đọc từ bundle sang script offline; không import hoặc chạy toàn bộ bundle trong ứng dụng. Không đưa lớp mã hóa vào browser sản phẩm.
- [ ] Audit file theo signature/nội dung; test một `.woff2` chứa `No Content` là invalid và một WebP thực là available. Kiểm kê cả URL trong CSS, tên card biến thể và asset inline liên quan.
- [ ] Sinh JSON và copy assets xác định; chạy hai lần cho kết quả ổn định, giữ tên nguồn và provenance. Kiểm tra repository trả undefined cho ID không tồn tại hoặc detail chưa tải.
- [ ] Tạo reference server chỉ bind localhost, phục vụ snapshot không chỉnh file gốc; map ba API `.html`, history fallback và tắt script tracker trong response QA. Không chạy chunk không liên quan.
- [ ] Render `/czn/combatant` và `/czn/combatant/1041`; chụp desktop/mobile, dark/light, card modal. Ghi rõ missing resources; nếu baseline không chạy đầy đủ, ghi giới hạn và bổ sung ảnh tham chiếu trước khi cam kết fidelity.
- [ ] Chạy `npm run test:unit -- tests/unit/import-e7bot.test.ts tests/unit/assets.test.ts tests/unit/repository.test.ts`; phải PASS các count 87/38/49, detail Renoa và fixture invalid asset.

**Deliverable:** baseline kiểm chứng được + dữ liệu offline sạch; đây là điều kiện để chốt fidelity cho task sau.

## Task 2: Shell E7BOT và hai theme

**Files:** app layout/page/globals, czn/layout, shell components, wiki-tokens, tests/e2e/shell.

**Interfaces:** `WikiShell({ children })`, `Navigation({ activePath })`; theme `light | dark`, lưu preference ở browser, khởi tạo theo quy tắc xác nhận trong baseline Task 1.

- [ ] Tái dựng điều hướng và vùng content theo screenshot Task 1; dùng token nguồn `#1C1E23`, `#252831`, `#2A2D35`, `#4D88FF`, `#5bc0de` và token light tương ứng đọc từ CSS.
- [ ] Giữ vị trí, mật độ, icon và hành vi thu gọn nguồn; không đưa hero/sidebar Prydwen vào shell.
- [ ] Tạo `/` chuyển tới `/czn/combatant`; menu chưa có dữ liệu phải có trạng thái rõ ràng, không dẫn tới trang giả đầy đủ.
- [ ] Hoàn thiện theme toggle, focus hiển thị, mobile navigation và Escape; không hydration mismatch.
- [ ] Chạy `npm run test:e2e -- tests/e2e/shell.spec.ts`: kiểm tra chuyển theme và reload giữ preference, mobile navigation đóng được và trả focus; đối chiếu ảnh 1440×900, 1024×768, 390×844.

**Deliverable:** shell nhìn gần E7BOT, chưa polish làm thay đổi cấu trúc.

## Task 3: Bộ chọn nhân vật, filter và URL

**Files:** routes Combatant, picker/filter/portrait/workspace/missing-detail, `lib/wiki/filters.ts`, unit filters và e2e combatants.

**Interfaces:** `filterCombatants(items: CharacterSummary[], filters: { query: string; rarities: number[]; egos: string[]; jobs: string[] }): CharacterSummary[]`. Trường filter khác nhau kết hợp AND; nhiều giá trị trong cùng filter kết hợp OR. Query trim, không phân biệt hoa thường và tìm theo `name`/`names`.

- [ ] Viết test có 38 combatant, không supporter; query ` renoa ` và `RENOA` ra ID `1041`; query vô nghĩa ra rỗng; filter kết hợp rarity 5/job hunter vẫn có Renoa; clear trả đủ 38.
- [ ] Rebuild picker theo nguồn, giữ scale portrait, bố cục lọc và selected state. Desktop cạnh detail; mobile mở overlay.
- [ ] Chọn nhân vật cập nhật `/czn/combatant/[combatantId]`; truy cập trực tiếp cùng URL cho cùng kết quả. Đọc params bất đồng bộ theo guide Next cục bộ.
- [ ] ID lạ dùng not-found; ID có summary thiếu detail hiện thông tin thật và trạng thái thiếu dữ liệu; trang không ID giữ trạng thái chưa chọn như nguồn.
- [ ] Chạy `npm run test:unit -- tests/unit/filters.test.ts` và `npm run test:e2e -- tests/e2e/combatants.spec.ts`: assert `1041` Renoa, `1003` Nia thiếu detail, ID không tồn tại 404, back/forward/reload không lệch selected state.

**Deliverable:** luồng chọn nhân vật hoàn chỉnh với giới hạn dữ liệu trung thực.

## Task 4: Chi tiết Renoa và card renderer

**Files:** CombatantDetail/ManifestEgo/PotentialPanel, cards components, Dialog, lib description/assets, unit description và e2e cards.

**Interfaces:** `GameCard({ card, animationEnabled, portraitOnly })`, `CardDetailModal({ card, open, onClose })`; `Card` có ID, tên, cost, mô tả, category, rarity, artwork, video tùy chọn, variant IDs. Chuẩn hóa các trường nguồn vào model ở Task 1; không để component tự parse response mã hóa.

- [ ] Render Renoa theo thứ tự và bố cục E7BOT; dùng 4 start cards, 4 spark entries, Ego/collapse, 6 Manifest Ego và 10 Potential nodes từ detail nguồn. Biến thể và card nhóm lồng nhau giữ đúng quan hệ.
- [ ] Dựng card nhiều lớp, frame/cost/icon/mô tả theo source; giữ lớp sprite số nếu cần để đạt fidelity. Description formatter chỉ nhận markup được hỗ trợ, có test loại bỏ script/event handler mà vẫn giữ emphasis/keyword hợp lệ.
- [ ] Thêm modal biến thể/upgrade và option animation/artwork-only theo nguồn. Không tạo option April Fool hoạt động giả khi thiếu asset.
- [ ] Video dùng WebM đã có, poster fallback; reduced motion hoặc tắt animation ngừng video. Asset thiếu có fallback được kiểm kê.
- [ ] Chạy unit description và `npm run test:e2e -- tests/e2e/cards.spec.ts`: modal mở/đóng, Escape trả focus, body scroll phục hồi, option animation có hiệu lực, video lỗi vẫn có poster.
- [ ] So sánh screenshot cùng card/trạng thái với baseline; cố định animation/time khi chụp để tránh khác biệt ngẫu nhiên.

**Deliverable:** Renoa đủ để review toàn bộ ngôn ngữ giao diện của bản clone.

## Task 5: Polish nhẹ và nghiệm thu milestone

**Files:** CSS Modules liên quan, shell/ui, tests e2e, docs/reference-baselines.

- [ ] Review bản fidelity; ghi danh sách chênh lệch có chủ ý và lỗi cần sửa theo từng vùng, tránh đổi đồng loạt layout.
- [ ] Chỉ polish spacing, contrast, focus/hover, loading/empty/missing states và mobile touch targets; giữ màu, tỷ lệ card, cấu trúc E7BOT.
- [ ] Kiểm tra network không phụ thuộc API gốc, không asset broken chưa được ghi nhận; description dài và màn hình 390px không phá layout.
- [ ] Chạy `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run test:unit`, `npm run test:e2e`; ghi kết quả thật và các giới hạn còn lại.
- [ ] Bàn giao preview và ảnh desktop/mobile; từ đây người dùng có thể chỉ định điều chỉnh từng phần.

**Deliverable:** bản clone CZN đầu tiên đã kiểm chứng, không tuyên bố toàn bộ E7BOT hoàn thiện.

## Lộ trình mở rộng sau milestone đầu

1. **Nội dung Prydwen cho Renoa:** đối chiếu version và tên hệ, tách guide khỏi kit. Đặt trong phần bổ sung tương thích E7BOT nếu người dùng chọn; không ghi đè dữ liệu kit. Import phần HTML liên quan qua parser, không chạy embedded script.
2. **Các nhân vật còn lại + Partner:** bổ sung detail/API/assets theo inventory; 49 partner hiện chỉ đủ summary.
3. **Cards database, Sparks, Relics, Items:** thu thập đủ mẫu trang và dữ liệu trước rồi áp dụng component đã có.
4. **Encounters, Stories, Deck Builder và công cụ:** mỗi nhóm cần phân tích riêng về dữ liệu và tương tác; chưa ước lượng như trang tĩnh.

Mỗi nhóm mở rộng tạo kế hoạch riêng dựa trên nguồn bổ sung. Không thể cam kết clone đủ mọi route chỉ từ snapshot hiện tại.

## Tự review kế hoạch

- Đã phản ánh chỉ dẫn cuối: E7BOT làm chuẩn; Prydwen chỉ bổ sung nội dung.
- Đã tách 87 records thành 38 combatant/49 supporter, và tách summary khỏi detail.
- Năm rủi ro Review Focus có task/test sở hữu tương ứng.
- Các task phụ thuộc theo thứ tự baseline/data → shell → picker → detail/cards → polish.
- Chưa bắt đầu implementation. Khi được yêu cầu triển khai, đề xuất làm tuần tự trong chat này để giữ nhất quán visual và dễ review từng phần.
