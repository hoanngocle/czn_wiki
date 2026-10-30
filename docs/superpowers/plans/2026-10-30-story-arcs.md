# Cốt Truyện theo Arc

> **For agentic workers:** Use superpowers:executing-plans for implementation.

**Goal:** Mỗi cung truyện là một sơ đồ riêng; mục Cốt Truyện mở menu con các Arc, không kéo dài một canvas duy nhất.

**Architecture:** Danh mục Arc theo khoảng chương và diễn biến, dựng sơ đồ từ dữ liệu tổng hiện có. Mỗi Arc có URL và bản lưu riêng; nguồn tổng cùng chỉnh sửa cũ không bị ghi đè. Dùng seed ba chiều để cập nhật nội dung mới mà giữ chỉnh sửa Arc.

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest, Playwright; không thêm dependency.

**Spec:** Yêu cầu trực tiếp của người dùng: bổ sung toàn bộ dữ liệu vào Cốt Truyện, tách Arc và submenu. Các quyết định triển khai dưới đây là lựa chọn của người thực hiện trong phạm vi yêu cầu.

## Thiết kế

- Chia theo cung truyện thay vì mỗi 100 chương cứng; giữ đầy đủ mọi chương đã tổng hợp. Các khoảng là phân chia biên tập, không gán là tên Arc chính thức của tác giả.
- `lib/story/arcs.ts`: danh mục Arc, URL ổn định, tra Arc theo chương; dữ liệu mới ngoài danh mục được chia tiếp thành đoạn ngắn, không bỏ sót.
- `lib/story/arc-graph.ts`: lấy mốc thuộc Arc, đưa tọa độ về sơ đồ ngắn, nhân vật xuất hiện/được nhắc trong Arc, giữ tùy chỉnh và node riêng từ bản cũ. Mốc giao ranh giới được giới hạn danh sách chương ở Arc đang xem.
- Nhân vật tái xuất vẫn có thể hiện ở Arc sau. Mỗi Arc được sửa bố cục, ghi chú, thêm/xóa độc lập; bản lưu gốc vẫn giữ nguyên. Node riêng không gắn chương hoặc liên kết được giữ ở Arc đầu.
- `useStoryGraph`: hỗ trợ bản lưu theo Arc, giữ nhánh tương thích hiện tại. Không ghi đè bản lỗi; báo lỗi lưu rõ ràng.
- `StorySidebar`/`StoryShell`: đổi nhãn thành Cốt Truyện và mở danh sách Arc trên desktop/mobile.
- `StoryTimeline` và page: chọn Arc bằng `?arc=...`, tiêu đề/khoảng chương, Arc trước/sau, chọn nhanh trên màn hẹp, tìm kiếm trong Arc, tải lại đúng bản lưu.
- Không sửa dữ liệu truyện/cảnh giới/nhiệm vụ; không commit/publish. Giữ checkout hiện tại vì dữ liệu và thay đổi đang dùng ở đây.

## Công việc

- [x] Viết kiểm thử phân vùng đầy đủ, bố cục ngắn, giữ dữ liệu cũ, độc lập các Arc và cập nhật seed.
- [x] Tạo danh mục và phép tách sơ đồ; nối bản lưu theo Arc.
- [x] Triển khai submenu, URL, tiêu đề, điều hướng và màn hình hẹp.
- [x] Kiểm tra độc lập, unit/typecheck/lint và browser; cập nhật tài liệu.

## Review focus

Chương giao ranh giới; nhân vật tái xuất; node riêng thiếu chương; bản lưu rỗng/xóa có chủ ý; chuyển Arc khi đang sửa hoặc kéo; không rơi dữ liệu mới ngoài chương 1000.

## Kiểm chứng

524 unit tests qua; typecheck/lint các tệp Arc qua; build production qua. Kiểm tra browser desktop/mobile qua cho chuyển Arc, reload, ghi chú độc lập, submenu và không tràn ngang. Review độc lập đã sửa hai lỗi: nhãn đường nối cá nhân qua ranh giới và tọa độ chuỗi node riêng nhiều bước. Có regression test cho cả hai. Danh mục hiện phủ toàn bộ dữ liệu tích hợp, kể cả phần 1001–1500.
