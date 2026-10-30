# Wiki timeline — Chư Giới Tận Thế Online

## Yêu cầu

Tạo một trang wiki dạng timeline kết hợp mindmap như Miro. Người dùng xác nhận nền trơn, không dùng lưới chấm, và phải thu phóng được.

## Thiết kế đề xuất

- Đường dẫn: `/truyen/chu-gioi-tan-the-online`, trang riêng trong ứng dụng Next.js hiện tại.
- Một bảng nền trơn chiếm phần lớn màn hình; kéo vùng trống để di chuyển.
- Trục ngang biểu diễn trình tự các giai đoạn truyện. Các nút nhân vật, thế giới và sự kiện nối vào mốc tương ứng.
- Thanh điều khiển gồm thu nhỏ, tỷ lệ hiện tại, phóng to và xem toàn bộ. Giới hạn thu phóng 25–200%; giữ điểm đang nhìn khi thay đổi tỷ lệ.
- Chọn một nút mở bảng nội dung bên phải; trên màn hình nhỏ hiển thị bảng này phía dưới. Nội dung gồm tiêu đề, loại mục, tóm tắt và nguồn tham khảo nếu có.
- Giao diện tiếng Việt, màu phân biệt các loại nút, nhãn rõ ràng, thao tác được bằng bàn phím.

## Phương án

1. Timeline cuộn ngang: đơn giản nhưng không thể hiện tốt các nhánh quan hệ.
2. Bảng timeline có nhánh liên kết: phù hợp yêu cầu kiểu Miro và thu phóng; đây là phương án đề xuất đã được người dùng điều chỉnh về nền.
3. Trình biên tập cộng tác đầy đủ: nhiều chức năng ngoài phạm vi một trang wiki ban đầu.

## Quyết định mặc định cần duyệt

Bản đầu phục vụ đọc và khám phá; chưa bổ sung trình biên tập, đăng nhập hay cộng tác thời gian thực. Các chức năng này chưa được người dùng xác nhận. Dùng React, CSS Modules và SVG có sẵn trong dự án; không cần thư viện sơ đồ mới.

## Nội dung

Không suy đoán các mốc chương, quan hệ hay diễn biến truyện. Đối chiếu nguồn cho nội dung chính thức; phần chưa được xác minh phải ghi rõ là nội dung minh họa/chờ bổ sung.

## Giới hạn và nghiệm thu

- Không thay thế trang chủ hoặc các trang Chaos Zero Nightmare hiện có.
- Nền không có chấm hoặc lưới.
- Thu phóng, kéo bảng, xem toàn bộ và chọn nút hoạt động trên desktop; có điều khiển chạm trên màn hình nhỏ.
- Không thêm lưu trữ máy chủ hoặc chức năng xuất bản trong phạm vi này.
- Kiểm tra kiểu dữ liệu và các tương tác chính trước khi bàn giao.
