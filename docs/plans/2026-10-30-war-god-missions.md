# Danh sách nhiệm vụ Chiến Thần, chương1–100

## Phạm vi được yêu cầu

Cập nhật theo đính chính của người dùng: chỉ các nhiệm vụ do hệ thống Chiến Thần công bố. Danh mục sản phẩm gồm Trận Chiến Chết Chóc và Thần thông Chiến Thần; loại lời nhờ, việc được giao, khảo nghiệm, cảnh báo và hồi tưởng khỏi danh sách.

Đọc toàn văn100 chương, lưu bảng nhiệm vụ có căn cứ và hiển thị danh sách trong modal concept hiện tại. Giữ hình thức modal, vùng chọn chương ở header và các cảnh Kỹ nghệ/Thần thông. Không khôi phục menu Đối chiếu truyện. Trạng thái bám Cố Thanh Sơn, không có nút tự nhận/thưởng/hoàn thành.

## Thiết kế

- Dữ liệu nhiệm vụ có loại, người giao, mục tiêu, sự kiện theo chương, nguồn đoạn. Chỉ lưu hai nhiệm vụ hệ thống chính thức; các ghi chép khác chỉ nằm trong audit đọc truyện.
- Các bước cầu cứu và thu thập năm vật phẩm là diễn tiến của nhiệm vụ hệ thống, không phải những nhiệm vụ riêng.
- Lọc theo chương trước khi đưa ra UI: chỉ nhiệm vụ, diễn tiến, thưởng/phạt/hạn đã xuất hiện. Chương lớn hơn100 giữ dữ liệu100 và báo phạm vi đã đọc.
- Mục “Danh sách nhiệm vụ” mở danh sách có tìm kiếm/lọc loại, chọn mục để xem mục tiêu, trạng thái, diễn tiến. Không thay đổi mặc định các cảnh concept, kể cả cảnh Định Mệnh34–80.
- Bảng Markdown và bốn audit phạm vi đọc được lưu trong docs/story.

## Thực hiện và kiểm chứng

1. Hoàn tất đọc độc lập bốn nhóm chương, đối chiếu các tuyến kéo dài giữa nhóm (đã xong).
2. Viết test biên chương/không lộ tương lai, dữ liệu và bảng nhiệm vụ.
3. Thêm cảnh danh sách nhiệm vụ, nối nút tiện ích; sửa mốc hoàn thành80, khảm bốn vật85 theo nguồn.
4. Chạy unit, TypeScript, lint các file liên quan, Playwright modal/danh sách/chọn chương; kiểm tra mobile và keyboard.
5. Review độc lập dữ liệu/UI, xử lý lỗi có căn cứ rồi báo kết quả.
