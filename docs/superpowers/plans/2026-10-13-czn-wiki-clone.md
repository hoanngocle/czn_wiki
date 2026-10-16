# CZN Wiki — E7BOT Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng giao diện CZN gần như E7BOT, nâng cấp nhẹ và dễ chỉnh từng phần; hoàn thiện luồng chọn nhân vật → Renoa trước.

**Architecture:** Rebuild bằng React/Next App Router, tái sử dụng assets và quy tắc hiển thị E7BOT. Import snapshot offline thành dữ liệu có kiểu; UI tương tác tách thành component nhỏ. Prydwen chỉ bổ sung nội dung sau baseline, không quyết định bố cục.

**Tech Stack:** Next.js 16.4.0, React 19.3.0, TypeScript, CSS Modules + CSS variables, Tailwind hiện có. Vitest cho logic dữ liệu; Playwright Chromium cho tương tác và ảnh đối chiếu. Dùng npm + package-lock.json của repo.

**Spec:** `../specs/2026-10-13-czn-wiki-clone-design.md`

**Status:** Đã rà soát và cập nhật ngày 13/10/2026; người dùng đã yêu cầu triển khai bằng **GPT-6 Sol, reasoning High**. Task 1–5 đã triển khai và kiểm chứng; xem implementation-log.md và visual-review.md để đọc bằng chứng, giới hạn và ảnh đối chiếu.

**Execution:** Một implementer GPT-6 Sol High thực hiện tuần tự Task 1–5; không dừng xin xác nhận giữa các task. Controller review kết quả toàn bộ sau triển khai. Giữ tiến độ, lệnh kiểm chứng, sai lệch và giới hạn trong `docs/reference-baselines/implementation-log.md`; cập nhật checkbox chỉ khi có bằng chứng. Không tự push, publish hoặc sửa snapshot.

## Preflight đã xác nhận

- Repo hiện là Next starter; chưa có component/data/test của wiki. CodeGraph 1.6.0 đã index 70 file; MCP truy vấn Home/RootLayout thành công. Dùng CodeGraph trước khi tìm/đọc code; với file tài liệu không có symbol thì đọc trực tiếp.
- `npm run lint` ban đầu: 144 errors, 6.526 warnings do quét cả bundle tham chiếu. Lint riêng `app`, `eslint.config.mjs`, `next.config.ts` đạt. Task 1 phải giới hạn lint về code do dự án quản lý, không sửa bundle để làm lint xanh.
- `next.config.ts` bật `cacheComponents: true`, `partialPrefetching: true`. Đọc guide Next cục bộ về caching, params, loading/not-found trước khi quyết định route; không áp dụng hướng dẫn phiên bản cũ hoặc tắt các cờ chỉ để né lỗi.
- Có sẵn `yarn.lock` untracked của người dùng và `.codegraph/`. Không xóa/ghi đè yarn.lock, không đưa SQLite index vào commit. Ưu tiên checkout hiện tại để giữ dependencies/snapshot đã có; tạo nhánh `codex/czn-wiki-clone` nếu Git cho phép, không reset hoặc checkout đè thay đổi có sẵn.

## Global Constraints

- E7BOT là chuẩn giao diện chính: gần như y hệt, chỉ cải tiến nhẹ cho hiện đại.
- Không sửa hai thư mục snapshot nguồn tại chỗ.
- Danh sách có 38 combatant và 49 supporter; chỉ có detail Renoa `1041`.
- Không bịa detail/asset của nhân vật hoặc chức năng thiếu nguồn.
- Prydwen chỉ dùng cho nội dung bổ sung sau khi baseline E7BOT đạt yêu cầu.
- Không gọi backend gốc để bù dữ liệu trong runtime sản phẩm.
- Đọc tài liệu Next cục bộ theo AGENTS.md trước khi viết code tương ứng.
- Chưa triển khai CMS, tài khoản, công cụ Epic Seven hoặc đồng bộ trực tuyến.
- UI milestone đầu dùng tiếng Anh như nội dung API mẫu; tên đa ngôn ngữ vẫn được dùng khi tìm kiếm. Không tự mở rộng sang hệ thống dịch hoàn chỉnh.
- Baseline và bản dựng dùng cùng locale `en-US`, viewport, theme, trạng thái card và animation. Giữ font hệ thống E7BOT (Segoe UI + fallback), bỏ Geist tải qua Google của starter.
- ID hợp lệ trong route Combatant phải thuộc 38 combatant; supporter là 404, không phải summary thiếu detail.
- Import có thể tái lập theo nội dung: thứ tự output ổn định, hash nguồn SHA-256, không chèn thời gian chạy làm thay đổi JSON mỗi lần. Ngày cập nhật nguồn và ngày nhập dữ liệu là hai khái niệm riêng.

## Review Focus

- Summary hợp lệ nhưng thiếu detail → hiện summary và thông báo thiếu dữ liệu; không crash hoặc dùng kit Renoa.
- Hai loại bản ghi cùng nằm trong list → picker Combatant tuyệt đối không lẫn 49 supporter.
- File asset tồn tại nhưng chứa `No Content` → đánh dấu không dùng được; không coi tồn tại là hợp lệ.
- Deep link, reload và back/forward → lựa chọn URL và vùng detail khớp nhau.
- Đổi nhân vật khi đang lọc → giữ query/filter/scroll của picker; bấm clear mới xóa filter. Direct-load ID lạ và supporter phải trả HTTP 404 thật, không chỉ render chữ 404 trong response 200.
- Mobile/modal/reduced motion → không kẹt focus, khóa scroll vĩnh viễn hoặc tự chạy animation khi đã tắt.

## File map dự kiến

```text
app/
  layout.tsx                         # theme, metadata và shell gốc
  page.tsx                           # chuyển tới Combatant
  globals.css                        # reset và global tối thiểu
  czn/layout.tsx                     # E7BOT shell dùng chung
  czn/combatant/layout.tsx            # giữ workspace/picker qua các route con
  czn/combatant/page.tsx              # chưa chọn nhân vật
  czn/combatant/[combatantId]/page.tsx # chọn bằng ID
  # Không thêm loading.tsx bọc kiểm tra ID; skeleton đặt tại vùng cần tải
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
vitest.config.ts                     # chỉ tests/unit, alias @ -> repo root
playwright.config.ts                 # chỉ tests/e2e; production server localhost
tests/unit/{import-e7bot,filters,assets,repository,description}.test.ts
tests/e2e/{shell,combatants,cards}.spec.ts
docs/reference-baselines/            # ảnh và checklist nguồn/bản dựng
  implementation-log.md              # tiến độ, kiểm chứng, quyết định và giới hạn
```

Mỗi nhóm component có CSS Module đi kèm; không gom tất cả CSS vào globals. Chỉ tạo file khi task cần, không dựng sẵn module ngoài phạm vi.

## Task 1: Baseline nguồn và dữ liệu có thể tái lập

**Files:** các script, `lib/wiki/types.ts`, data JSON, public/reference/e7bot, tests unit import/assets/repository, package scripts và cấu hình test.

**Interfaces:** `CharacterSummary` giữ `id`, `name`, `names`, `kind: 'combatant' | 'supporter'`, `job`, `ego`, `rarity`, `portrait`, `source`; detail giữ các nhóm cards/manifestEgo/potential và source. `AssetManifest` map đường dẫn nguồn sang local URL và trạng thái `available | missing | invalid`. `getCombatants(): CharacterSummary[]`, `getCharacter(id: string): CharacterSummary | undefined`, `getCharacterDetail(id: string): CharacterDetail | undefined` chỉ đọc dữ liệu đã import.

### 1A. Tooling và hợp đồng dữ liệu

- [x] Thêm Vitest và `@playwright/test` vào devDependencies bằng npm; thêm scripts `test:unit` = `vitest run`, `test:e2e` = `playwright test`, `import:wiki`, `audit:assets`, `reference:serve`, `typecheck` = `next typegen && tsc --noEmit`. Cài Chromium dùng cho QA nếu máy chưa có.
- [x] Trong `eslint.config.mjs`, ignore chính xác `docs/wiki.e7bot.top/**`, `docs/www.prydwen.gg/**`, `.codegraph/**`, `playwright-report/**`, `test-results/**`; vẫn lint scripts và tests do mình viết. Giữ các ignores Next sẵn có. Thêm thư mục output test vào `.gitignore`.
- [x] Cấu hình Vitest chỉ nhận `tests/unit/**/*.test.ts`, môi trường Node; Playwright chỉ nhận `tests/e2e/**/*.spec.ts`, không cho hai runner nhặt test của nhau. E2E dùng `127.0.0.1:3100`, webServer `npm run start -- --hostname 127.0.0.1 --port 3100`, build trước khi chạy. Reference server dùng cổng 4173.
- [x] Định nghĩa model tại `lib/wiki/types.ts`: ID luôn string; `names` là `Record<string, string>`; kind suy từ `char_type`, không phải `type`. Card phải giữ ID, mô tả, art key, cost, category, rarity và liên kết biến thể; không gộp hai record chỉ vì chung artwork. `SourceRef` giữ sourceId/sourceFile/sourceUpdatedAt nếu có; asset record giữ sourcePath/localUrl/status/reason.
- [x] Tách CLI side effect khỏi hàm thuần export trong importer/audit để unit test có thể import mà không ghi public/data. CLI nhận đường dẫn nguồn/đích rõ ràng và lỗi khác 0 nếu giải mã hoặc schema không hợp lệ.

### 1B. Import, inventory và repository

- [x] Viết importer thuần `decodeSnapshot(payload, key)` và `normalizeCharacters(records)` với fixture test trước: đọc được 87 record, tách 38/49, detail có ID `1041` và tên Renoa; payload hỏng báo lỗi rõ ràng.
- [x] Port quy tắc giải mã đọc từ bundle sang script offline; không import hoặc chạy toàn bộ bundle trong ứng dụng. Không đưa lớp mã hóa vào browser sản phẩm.
- [x] Audit file theo signature/nội dung; test một `.woff2` chứa `No Content` là invalid và một WebP thực là available. Kiểm kê cả URL trong CSS, tên card biến thể và asset inline liên quan.
- [x] Sinh JSON và copy assets xác định; chạy hai lần cho kết quả ổn định, giữ tên nguồn và provenance. Kiểm tra repository trả undefined cho ID không tồn tại hoặc detail chưa tải.
- [x] Kiểm tra schema thực sau AES: envelope `{ code: 0, data }`; `start_cards`, `spark_cards`, `combatant_limit_breaks`, `potential_target_cards` nằm trong `data.combatant`, `potential_nodes` nằm tại `data`. Không đọc nhầm mảng trên root hoặc mất cấu trúc biến thể lồng nhau. Tách IV 16 byte đầu từ payload Base64, giải mã AES-256-CBC/PKCS7 bằng Node crypto; chỉ lấy khóa từ logic bundle offline, không đóng gói khóa vào client.
- [x] Import cả `snapshot/characters/diff.html` nếu dùng badge NEW của nguồn; giữ semantics badge theo snapshot, không tự tính là mới ở thời điểm hiện tại. Ghi nguồn này vào manifest dù chỉ dùng cho baseline.
- [x] `repository.ts` là module server-only đọc JSON tĩnh; hàm filter và kiểu dữ liệu dùng chung không import repository. Truyền summary/manifest cần dùng sang Client Component bằng props; không đưa toàn bộ snapshot/guide vào client bundle.
- [x] Unit bổ sung: ID supporter có summary nhưng không thuộc getCombatants; ID `1003` có name Nia, detail undefined; detail/card ID trùng hoặc tham chiếu hỏng được báo rõ; mọi `available.localUrl` ánh xạ tới file đúng signature. Asset audit không tự fetch bù từ Internet.

### 1C. Baseline có thể lặp lại
- [x] Tạo reference server chỉ bind localhost, phục vụ snapshot không chỉnh file gốc; map ba API `.html`, history fallback và tắt script tracker trong response QA. Không chạy chunk không liên quan.
- [x] Render `/czn/combatant` và `/czn/combatant/1041`; chụp desktop/mobile, dark/light, card modal. Ghi rõ missing resources; nếu baseline không chạy đầy đủ, ghi giới hạn và bổ sung ảnh tham chiếu trước khi cam kết fidelity.
- [x] Reference server map URL pathname (bỏ query `lang`) về ba API snapshot; static file có MIME đúng cho JS/CSS/WebP/WebM, range request cho video nếu cần. Missing API/asset trả 404, chỉ history-fallback cho route trang; không trả HTML shell cho chunk thiếu. Resolve path trong root snapshot, chặn traversal. Chặn external requests bằng browser route và loại tracker khỏi HTML response QA.
- [x] Trước navigation đặt locale `en-US`, themeMode `dark` hoặc `light`, `czn_combatant_enable_animation=false`, `czn_combatant_show_portrait_only=false`, `czn_combatant_enable_april_fool=false` trong localStorage. Reset context giữa các case; dùng cùng timezone Asia/Saigon và reduced motion khi chụp. Ghi tên key thực nếu bundle khác.
- [x] Lưu baseline với tên `<source>-<viewport>-<theme>-<state>.png` ở `docs/reference-baselines/`; states tối thiểu: unselected, Renoa cards, picker mobile, card modal, Manifest Ego, Potential. Ảnh shell/Renoa có cả dark/light; viewport 1440x900, 1024x768, 390x844. Dùng ảnh nguồn cho layout; không coi screenshot của chính bản dựng là baseline nguồn.
- [x] Ghi `baseline-notes.md` với phiên bản browser, viewport, locale, theme, missing resources và ảnh liên quan. Nếu thiếu tài nguyên khiến một state không render được, triển khai phần có bằng chứng từ CSS/bundle, ghi limitation cụ thể; tiếp tục task có thể làm, không bịa fidelity.
- [x] Chạy `npm run test:unit -- tests/unit/import-e7bot.test.ts tests/unit/assets.test.ts tests/unit/repository.test.ts`; phải PASS các count 87/38/49, detail Renoa và fixture invalid asset.

**Deliverable:** baseline kiểm chứng được + dữ liệu offline sạch; đây là điều kiện để chốt fidelity cho task sau.

## Task 2: Shell E7BOT và hai theme

**Files:** app layout/page/globals, czn/layout, shell components, wiki-tokens, tests/e2e/shell.

**Interfaces:** `WikiShell({ children })`, `Navigation({ activePath })`; theme `light | dark`, lưu preference ở browser, khởi tạo theo quy tắc xác nhận trong baseline Task 1.

- [x] Viết e2e shell trước: root redirect đúng URL, heading/nav xuất hiện; toggle light/dark rồi reload giữ lựa chọn; OS preference dùng khi chưa có override; mobile menu Escape trả focus. Chạy để xác nhận test fail trên starter trước khi dựng shell.

- [x] Tái dựng điều hướng và vùng content theo screenshot Task 1; dùng token nguồn `#1C1E23`, `#252831`, `#2A2D35`, `#4D88FF`, `#5bc0de` và token light tương ứng đọc từ CSS.
- [x] Giữ vị trí, mật độ, icon và hành vi thu gọn nguồn; không đưa hero/sidebar Prydwen vào shell.
- [x] Tạo `/` chuyển tới `/czn/combatant`; menu chưa có dữ liệu phải có trạng thái rõ ràng, không dẫn tới trang giả đầy đủ.
- [x] Hoàn thiện theme toggle, focus hiển thị, mobile navigation và Escape; không hydration mismatch.
- [x] Thay metadata starter và font Google bằng font hệ thống nguồn trong `app/layout.tsx`/`globals.css`. Khởi tạo theme trước paint bằng cơ chế SSR/client nhất quán; không chỉ suppress hydration warning cho toàn bộ cây. Đọc localStorage có try/catch, storage bị chặn vẫn render được.
- [x] Tách label nav vào cấu hình nhỏ; mục ngoài milestone hiển thị disabled/Coming soon, không link đến route 404 như thể đã hỗ trợ. Theme/system default, kích thước shell và breakpoint lấy từ baseline; navigation active path lấy từ pathname.
- [x] Chạy `npm run test:e2e -- tests/e2e/shell.spec.ts`: kiểm tra chuyển theme và reload giữ preference, mobile navigation đóng được và trả focus; đối chiếu ảnh 1440×900, 1024×768, 390×844.

**Deliverable:** shell nhìn gần E7BOT, chưa polish làm thay đổi cấu trúc.

## Task 3: Bộ chọn nhân vật, filter và URL

**Files:** routes Combatant, picker/filter/portrait/workspace/missing-detail, `lib/wiki/filters.ts`, unit filters và e2e combatants.

**Interfaces:** `filterCombatants(items: CharacterSummary[], filters: { query: string; rarities: number[]; egos: string[]; jobs: string[] }): CharacterSummary[]`. Trường filter khác nhau kết hợp AND; nhiều giá trị trong cùng filter kết hợp OR. Query trim, không phân biệt hoa thường và tìm theo `name`/`names`.

**State ownership:** `app/czn/combatant/layout.tsx` cung cấp 38 summaries cho Client `CombatantWorkspace`; workspace chứa picker và render `children` của hai page. Filter và desktop picker scroll sống trong workspace không remount khi đổi ID; không key workspace theo pathname. Selected ID đọc từ URL, không giữ bản sao trong state. Detail page lấy ID/server data qua params đã await; client không gọi API nguồn. Mobile picker đóng sau chọn và trả focus hợp lý.

- [x] Viết unit filter và e2e routing/state trước, xác nhận fail: AND/OR, tên đa ngôn ngữ, supporter exclusion, empty results, clear, URL→selected state và filter persistence.

- [x] Viết test có 38 combatant, không supporter; query ` renoa ` và `RENOA` ra ID `1041`; query vô nghĩa ra rỗng; filter kết hợp rarity 5/job hunter vẫn có Renoa; clear trả đủ 38.
- [x] Rebuild picker theo nguồn, giữ scale portrait, bố cục lọc và selected state. Desktop cạnh detail; mobile mở overlay.
- [x] Chọn nhân vật cập nhật `/czn/combatant/[combatantId]`; truy cập trực tiếp cùng URL cho cùng kết quả. Đọc params bất đồng bộ theo guide Next cục bộ.
- [x] ID lạ dùng not-found; ID có summary thiếu detail hiện thông tin thật và trạng thái thiếu dữ liệu; trang không ID giữ trạng thái chưa chọn như nguồn.
- [x] Chỉ chấp nhận ID trong getCombatants; supporter ID và ID lạ đều notFound. Không tự strip số 0 hoặc parseInt biến URL không hợp lệ thành ID hợp lệ. Tạo `generateStaticParams` cho 38 combatant nếu phù hợp guide Cache Components đang cài.
- [x] Kiểm tra HTTP 404 trên production bằng Playwright `request.get`, không chỉ assert text. Không thêm `loading.tsx` phía trên bước kiểm tra ID. Nếu Cache Components vẫn stream 200 cho ID lạ, thêm `proxy.ts` chỉ matcher `/czn/combatant/:path*`, kiểm tra tập ID summary nhỏ trước render và trả response 404 có nội dung accessible; không import full detail/asset manifest vào proxy. Ghi lựa chọn và kiểm chứng thực tế trong log.
- [x] E2E state: đặt rarity 5 rồi chọn Renoa; chuyển sang combatant khác trong tập đang lọc; back/forward giữ query/filter và đúng selected/detail. Filter không loại selected detail đang mở; khi clear chọn không tự mất. Desktop scroll picker không reset do điều hướng; reload URL vẫn đúng nhân vật. Nia thiếu detail không render card Renoa.
- [x] Mobile picker và tabs Cards/Manifest Ego/Potential là các thao tác riêng; đổi tab không mở lại picker, đóng picker không đổi selected. Không nhân đôi DOM interactive desktop/mobile khiến test/a11y có hai nút cùng tên đang hoạt động.
- [x] Chạy `npm run test:unit -- tests/unit/filters.test.ts` và `npm run test:e2e -- tests/e2e/combatants.spec.ts`: assert `1041` Renoa, `1003` Nia thiếu detail, ID không tồn tại 404, back/forward/reload không lệch selected state.

**Deliverable:** luồng chọn nhân vật hoàn chỉnh với giới hạn dữ liệu trung thực.

## Task 4: Chi tiết Renoa và card renderer

**Files:** CombatantDetail/ManifestEgo/PotentialPanel, cards components, Dialog, lib description/assets, unit description và e2e cards.

**Interfaces:** `GameCard({ card, animationEnabled, portraitOnly })`, `CardDetailModal({ card, open, onClose })`; `Card` có ID, tên, cost, mô tả, category, rarity, artwork, video tùy chọn, variant IDs. Chuẩn hóa các trường nguồn vào model ở Task 1; không để component tự parse response mã hóa.

- [x] Viết unit description trước cho text thật từ snapshot, emphasis/keyword/newline, unknown token và input `<script>`/event handler. Ưu tiên token AST render qua React text nodes; không dùng regex sanitize rồi đưa trực tiếp vào dangerouslySetInnerHTML.

- [x] Render Renoa theo thứ tự và bố cục E7BOT; dùng 4 start cards, 4 spark entries, Ego/collapse, 6 Manifest Ego và 10 Potential nodes từ detail nguồn. Biến thể và card nhóm lồng nhau giữ đúng quan hệ.
- [x] Dựng card nhiều lớp, frame/cost/icon/mô tả theo source; giữ lớp sprite số nếu cần để đạt fidelity. Description formatter chỉ nhận markup được hỗ trợ, có test loại bỏ script/event handler mà vẫn giữ emphasis/keyword hợp lệ.
- [x] Thêm modal biến thể/upgrade và option animation/artwork-only theo nguồn. Không tạo option April Fool hoạt động giả khi thiếu asset.
- [x] Modal có accessible name, focus trap, Escape, click outside có chủ ý và trả focus về opener còn tồn tại. Body scroll lock được giải phóng cả khi close lẫn khi route unmount; nested overlay không được unlock scroll của overlay khác còn mở. Dùng một primitive Dialog chung thay vì mỗi feature tự cài.
- [x] Video dùng WebM đã có, poster fallback; reduced motion hoặc tắt animation ngừng video. Asset thiếu có fallback được kiểm kê.
- [x] Animation/artwork-only preferences lưu qua reload theo nguồn; reduced motion luôn thắng bật animation. Video mute/loop/playsInline, lỗi video chuyển poster; ảnh/video chỉ tải khi cần, không autoplay video bị ẩn hoặc modal đã đóng. E2E kiểm tra pause sau khi đổi preference/reduced motion và sau đóng modal, không chỉ kiểm tra checkbox.
- [x] Potential renderer phải dùng đúng quan hệ `potential_target_cards`, không chỉ vẽ 10 ô có tên. Manifest Ego đủ 6 mức và phần mô tả. Upgrade/variant modal hiển thị data liên kết đúng thẻ đang chọn; test ít nhất hai thẻ có biến thể khác nhau để bắt lỗi dùng state cũ.
- [x] Chạy unit description và `npm run test:e2e -- tests/e2e/cards.spec.ts`: modal mở/đóng, Escape trả focus, body scroll phục hồi, option animation có hiệu lực, video lỗi vẫn có poster.
- [x] So sánh screenshot cùng card/trạng thái với baseline; cố định animation/time khi chụp để tránh khác biệt ngẫu nhiên.

**Deliverable:** Renoa đủ để review toàn bộ ngôn ngữ giao diện của bản clone.

## Task 5: Polish nhẹ và nghiệm thu milestone

**Files:** CSS Modules liên quan, shell/ui, tests e2e, docs/reference-baselines.

- [x] Review bản fidelity; ghi danh sách chênh lệch có chủ ý và lỗi cần sửa theo từng vùng, tránh đổi đồng loạt layout.
- [x] Chỉ polish spacing, contrast, focus/hover, loading/empty/missing states và mobile touch targets; giữ màu, tỷ lệ card, cấu trúc E7BOT.
- [x] Kiểm tra network không phụ thuộc API gốc, không asset broken chưa được ghi nhận; description dài và màn hình 390px không phá layout.
- [x] E2E network allowlist localhost/127.0.0.1 và data/blob cần thiết, fail nếu có request khác; ghi console error, hydration warning và failed image/video requests. Test navigation bằng bàn phím, storage bị chặn, màn hình 390px không tràn document ngang.
- [x] Chạy `npm run import:wiki` hai lần và so hash output; `npm run audit:assets`, `npm run lint`, `npm run typecheck`, `npm run test:unit`, `npm run build`, `npm run test:e2e`; ghi command/exit code/số test thật trong implementation-log. `typecheck` sinh Next route types trước tsc nên chạy được từ checkout sạch.
- [x] Chụp bản dựng cùng matrix Task 1; đặt ảnh nguồn và bản dựng cạnh nhau, kiểm tra shell width, typography, portrait crop, card scale, modal và tabs. Ghi chênh lệch theo vùng trong `visual-review.md`; screenshot chỉ chứng minh render, không tự chứng minh giống nguồn. Sửa chênh lệch lớn trước handoff.
- [x] Cập nhật README với lệnh chạy, import/test, route Renoa, giới hạn 37 detail thiếu và vị trí ảnh review. Controller review diff cuối, tập trung route status/state persistence/import correctness/a11y; implementer sửa lỗi quan trọng rồi chạy lại phần test liên quan.
- [x] Bàn giao preview và ảnh desktop/mobile; từ đây người dùng có thể chỉ định điều chỉnh từng phần.

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
- Đã bổ sung owner/test cho lint snapshot, HTTP 404, filter/scroll persistence, baseline locale/state, Next generated route types và preference video.
- Người dùng đã yêu cầu GPT-6 Sol High triển khai. Không cần xin lại approval cho plan hoặc thao tác lập trình có thể hoàn tác; báo blocker thật kèm bằng chứng và tiếp tục phần độc lập có thể làm.
