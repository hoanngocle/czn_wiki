# Bản đồ vũ trụ 3D — bản thử nghiệm

Route: `/ebooks/chu-gioi-tan-the-online/ban-do-vu-tru`.

Mục tiêu: nhìn rõ các khu, thế giới và quan hệ trong truyện. Three.js / React Three Fiber / Drei dựng không gian tương tác; danh mục HTML cho phép tìm kiếm, dùng bàn phím và xem chi tiết ngay cả khi WebGL không chạy. Dữ liệu độc lập với bản lưu sơ đồ cốt truyện.

## Phạm vi và cách đọc

- Nội dung chọn lọc đến chương 700. Không phải danh mục đầy đủ đến cuối truyện.
- Vị trí, kích thước, màu và khoảng cách do wiki bố trí; không phải bản đồ tọa độ chính thức.
- Rời Rạc đứng ngoài Biểu Tầng theo giải thích chương 518–519. Không biến nó thành khu thứ năm trong Biểu Tầng.
- Luân Hãm, Siêu Duy, Tranh Bá và Kỳ Dị là bốn khu được nêu ở chương 543, 551. Chỉ gán một thế giới vào khu khi có căn cứ.
- Lục Đạo là quan hệ cấu trúc, không phải một khu ngang hàng với bốn khu trên. Sáu điểm vẫn tách để tra cứu các giới và lịch sử sau dung hợp.
- Mộ Phần là khái niệm liên quan đến nơi phong ấn. Không dựng nó thành một hành tinh độc lập hoặc đồng nhất lời suy luận của Thanh Sơn với tọa độ được xác nhận.
- Quan hệ dung hợp ghi sự kiện và chương nguồn; quan hệ hành trình không có nghĩa hai điểm có cổng thông trực tiếp.
- Chỉ hiện đường nối của đối tượng được chọn. Tìm theo tên tiếng Việt có/không dấu và bí danh; chọn quan hệ để chuyển đối tượng; nút Toàn cảnh khôi phục camera.

## Căn cứ EPUB đã đối chiếu

Nguồn: `Chu Gioi Tan The Online - Yen Hoa Thanh Thanh.epub`, các entry `OEBPS/html/chuong-NNNN.html`; bản đọc trong `public/chu-gioi-tan-the-online/html/`.

| Chương | Căn cứ |
|---|---|
| 328 | Tạ Đạo Linh quyết định dung hợp Tu Hành và Thần Võ, giao Bi Ngưỡng thực hiện; không dùng chương này làm mốc hoàn tất. |
| 428 | Các giới Lục Đạo; Thú Vương là cách gọi trong truyện thay Súc sinh đạo. |
| 455–456 | Khởi động dung hợp Nhân Gian và Hoàng Tuyền. |
| 518–519 | Các thế giới Rời Rạc tách khỏi Biểu Tầng; Thần Võ, Huyền Không không cùng tầng; ba tầng Vỏ chỉ là các tầng ngoài cùng. |
| 527–528 | Hành trình rời Huyền Không; hệ thống gọi hiện thực là phần mộ của thế giới; tiến vào Biểu Tầng. |
| 543, 551 | Bốn khu và đặc tính Siêu Duy; Kỳ Dị phía trong cùng. |
| 547, 575 | Thiết Quyền Chính Nghĩa là thế giới Siêu Duy, có quyền cấp phép lưu lại. |
| 555 | Suy nghĩ của Thanh Sơn về quá khứ Tu Hành không được dùng thành khẳng định về Lục Đạo. |
| 570 | Hồi tưởng khu Phồn Vinh đổi tên thành Luân Hãm. |
| 602 | Hệ thống định vị vực sâu hỗn loạn của mảnh vỡ thế giới sâu trong Kỳ Dị. |
| 665–666 | Định nghĩa Mộ Phần; phân biệt tên gọi hệ thống với suy luận của Thanh Sơn. |
| 681 | Hệ thống tiết lộ Lục Đạo bị phá vỡ, cất giấu nhiều mộ phần. |
| 695–697 | Lấy căn nguyên, dung hợp bốn giới còn lại; mô tả Thiên Giới, A Tu La và Thú Vương. |

## Kiểm tra

`tests/unit/cosmology.test.ts`: phân loại, quan hệ hai chiều, bí danh, tính toàn vẹn và nguồn.

`tests/e2e/cosmology.spec.ts`: tải canvas, chọn thế giới, chuyển qua quan hệ, liên kết chương, tìm rỗng, di động và mất WebGL.
