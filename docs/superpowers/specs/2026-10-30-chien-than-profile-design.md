# Hồ sơ Chiến Thần — Cố Thanh Sơn

## Hướng đã chọn

Người dùng chọn hồ sơ thay đổi theo mốc chương truyện. Trang giúp khám phá quá trình phát triển của Cố Thanh Sơn bằng giao diện nhập vai, gồm cảnh giới, pháp bảo, hòm đồ và kỹ năng.

## Phương án

- Hồ sơ theo chương: bám dữ liệu wiki, chọn mốc để xem trạng thái và các thay đổi. Người dùng đã chọn hướng này.
- Mô phỏng game: tự trang bị, dùng kỹ năng và thay đổi chỉ số; cần cơ chế và dữ liệu mô phỏng riêng. Không chọn trong bản này.

## Thiết kế đề xuất

- Thêm trang `/truyen/chu-gioi-tan-the-online/chien-than`, liên kết từ wiki truyện và có lối quay về sơ đồ.
- Theo điều chỉnh của người dùng: dùng bảng màu của wiki truyện, nền kem `#fafbf7`, khối trắng ngà `#fffefa`, chữ xanh đậm `#293d36`, điểm nhấn xanh lá `#52775e` và vàng nâu cho pháp bảo. Giữ bố cục hồ sơ Chiến Thần. Các hiệu ứng nhẹ, tôn trọng tùy chọn giảm chuyển động.
- Thanh đầu trang ghi tên hệ thống và mốc chương đang xem. Bộ chọn mốc có tên sự kiện, nút trước/sau và chương tương ứng.
- Khối nhân vật hiển thị Cố Thanh Sơn, cảnh giới, sư môn và hồn lực khi có số liệu được xác nhận cho đúng mốc.
- Khối pháp bảo hiển thị các ô trang bị; hòm đồ hiển thị vật phẩm theo loại; kỹ năng có tên, mô tả và thời điểm ghi nhận.
- Bấm pháp bảo, vật phẩm hoặc kỹ năng để xem chi tiết cùng nguồn chương. Nhật ký ngắn chỉ ra thay đổi của mốc đang chọn.
- Trên điện thoại, các khối xếp dọc; mọi thao tác dùng được bằng bàn phím và có trạng thái chọn rõ ràng.

## Nội dung và giới hạn

- Phạm vi chương 1–100, dựa trên ghi chú nguồn hiện có; đối chiếu EPUB khi cần xác minh chi tiết trạng thái.
- Mặc định mở mốc đầu tiên. Chỉ hiển thị những mốc đã có hồ sơ được đối chiếu, không giả định dữ liệu chính xác cho mọi chương.
- Không tiết lộ tên vật phẩm hoặc kỹ năng tương lai trước mốc xuất hiện. Phân biệt vật đang sở hữu, vật đã dùng và vật đã trao đi khi có bằng chứng.
- Không tự tạo HP, MP, độ hiếm, lượng tồn kho hoặc tỷ lệ tu luyện. Số liệu chưa xác nhận được ghi rõ thay vì gán bằng 0.
- Ví dụ đã có nguồn: Trúc Cơ ở chương 97, chọn Tru Tà ở 98, Mất Khống Chế một giây ở 99, Địa kiếm sáu nghìn cân và hồn lực 530/20 ở 100.
- Dùng Next.js, React và CSS Modules hiện có; dữ liệu hồ sơ tách khỏi dữ liệu sơ đồ. Không cần dịch vụ hay thư viện mới.

## Kiểm tra nghiệm thu

- Mỗi mốc hiển thị cảnh giới, đồ và kỹ năng đúng với bằng chứng nguồn; chuyển mốc sớm không để lộ nội dung mốc sau.
- Bộ chọn mốc, chi tiết vật phẩm, phân loại hòm đồ và liên kết qua lại hoạt động.
- Kiểm tra kiểu dữ liệu, lint phần thay đổi, kiểm thử logic mốc và thao tác chính; xem giao diện ở desktop và điện thoại.

Người dùng đã duyệt tạm thiết kế và bổ sung biến `currentChap` để nhớ chương đang đọc. Triển khai lưu tiến độ trong trình duyệt theo khóa riêng của truyện; hồ sơ chỉ dùng bằng chứng không vượt quá chương đó.

## Bổ sung: đồng bộ trang đọc

Theo yêu cầu tiếp theo, `currentChap` tự lấy tiến độ có sẵn từ trang đọc truyện (khóa `chu-gioi-reader-progress`), ưu tiên hơn bản lưu nhập thủ công. Cập nhật khi mở hồ sơ, quay lại trang và khi trang đọc ở tab khác đổi chương. Giữ nguyên vị trí cuộn của trang đọc. Tiến độ hỗ trợ toàn bộ 2488 chương; nội dung hồ sơ vẫn giới hạn chương 1–100 và ghi rõ giới hạn khi đọc xa hơn.

## Bổ sung: khung wiki dùng chung

Theo yêu cầu mới, trang Chiến Thần dùng chung header và sidebar với trang truyện thông qua `StoryShell`, kế thừa màu nền và bố cục khung wiki hiện tại. Header ghi chương hiện tại; phần hồ sơ cuộn trong vùng nội dung chính. Sidebar giữ thông tin truyện, menu chuyển trang và các liên kết tới phần hồ sơ. Trên điện thoại, header vẫn hiển thị chương và có thanh chuyển trang bên dưới.
