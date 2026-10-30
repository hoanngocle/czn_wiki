# Hồ sơ Chiến Thần

Trang: `/ebooks/chu-gioi-tan-the-online/chien-than`.

Icon vòng sáng trên header chung mở modal hệ thống ngay trên bản đồ, trang đọc hoặc hồ sơ. Modal đã triển khai theo [spec concept](chien-than-concept-spec.md): nền xanh đen, chữ xanh lam, vòng Kỹ nghệ và dải nút tối ở đáy. Nhiệm vụ Định Mệnh là cảnh thông báo trung tâm; từ chương 81 có bàn quay năm hốc, chương 97 có bốn vị trí lựa chọn được giới hạn thông tin, từ chương 98 hàng chức năng có hai nút sáng. Có cảnh xem lại Tru Tà thu về hàng nút, hỗ trợ bỏ qua hiệu ứng và giảm chuyển động.

Giám định Quân cung, loan đao và giáo phân biệt kỹ nghệ nhìn thấy với kỹ nghệ đã lĩnh ngộ. Giá 2 hồn lực áp dụng cho cả cặp Ổn Định và Liên Xạ. Hồn lực có ghi chú nguồn/thời điểm, EXP chỉ hiện trước lựa chọn dùng hồn lực ở chương 14. Đồng hồ cát chỉ biểu diễn trạng thái xác nhận, không chạy đồng hồ thật. Ghi chú nguồn mở trong modal, có liên kết chương khi người đọc chủ động chọn.

Đóng bằng nút ×, Escape hoặc bấm nền ngoài; focus bàn phím giữ trong modal rồi trả về icon mở. Modal không chuyển trang, không tháo iframe, không ghi đè tiến độ và không tiêu hồn lực. Nguồn hệ thống gồm chương 3–4, 14–16, 34, 69, 81–82, 92, 94–95, 97–100. Vật liệu đã thu thập được phân biệt với vật liệu đã khảm. Minh họa hiện là vector, chưa có ảnh vật phẩm người dùng cung cấp.

Ảnh cần chuẩn bị được liệt kê trong [Danh sách ảnh vật dụng](danh-sach-anh-vat-dung.md).

Trang dùng chung `StoryShell` với bản đồ cốt truyện: cùng header, sidebar, màu nền và kích thước khung. Header hiển thị chương hiện tại và có liên kết tới chương đọc; sidebar đánh dấu trang đang mở và có lối nhảy tới từng phần hồ sơ. Nội dung hồ sơ cuộn riêng, giữ header và sidebar tại chỗ. Trên điện thoại, thanh chuyển trang thay thế sidebar.

`StorySidebar` là sidebar chung duy nhất cho cả ba tab, luôn có Bản đồ cốt truyện, Đọc truyện, Hồ sơ Chiến Thần và năm liên kết Nhân vật/Pháp bảo/Hòm đồ/Kỹ năng/Nhật ký. Không còn nội dung sidebar riêng của từng trang. Liên kết phần hồ sơ hoạt động từ mọi tab; liên kết Đọc truyện từ hồ sơ mở trình đọc nhúng qua `#doc-truyen` và tiếp tục chương đã lưu. Thanh chuyển trang trên điện thoại cũng có đủ ba tab.

Header hồ sơ giữ nhận diện chung và bộ chọn chương đang đọc (1–2488). Chọn chương trên bản đồ/trang đọc mở chương đó trong trình đọc nhúng; chọn từ hồ sơ mở trang chương tương ứng. Giá trị tự cập nhật theo tiến độ đọc. Nội dung chính bắt đầu ngay với các khối hồ sơ; không lặp lại phần giới thiệu và bảng tiến độ lớn. Điều khiển trên header tự xuống hàng trên màn hình nhỏ.

`currentChap` nhận số nguyên 1–2488 theo số chương của bản EPUB đã xuất. Trang tự lấy trường `chapter` trong localStorage `chu-gioi-reader-progress` của trang đọc làm nguồn chính, rồi lưu bản sao chuỗi số ở `story-wiki:chu-gioi-tan-the-online:currentChap`. Nếu chưa có tiến độ đọc hợp lệ, dùng bản lưu hồ sơ cũ; nếu cả hai không hợp lệ, trở về chương 1.

Hồ sơ cập nhật khi mở trang, khi chuyển chương ở tab đọc khác và khi quay lại tab/trang từ bộ nhớ trình duyệt. Chỉ cập nhật lại lựa chọn chi tiết khi chương đổi; các lần lưu vị trí cuộn không làm mất chi tiết đang xem. Hồ sơ luôn theo `currentChap` từ tiến độ đọc; không còn chế độ xem thử mốc riêng.

Header dùng chung cho cả ba tab. Bản đồ gom tìm kiếm, bộ lọc, thêm node, hiện nhân vật, thu phóng và hướng dẫn lên header. Trang đọc gom điều hướng chương, mục lục, cỡ chữ và nền sáng/tối lên header qua cầu nối `reader-action`/`reader-state`, xác thực origin và cửa sổ gửi. Các điều khiển gốc của trang đọc độc lập vẫn hoạt động; khi nhúng trong wiki, thanh đầu trang và điều hướng đầu chương được ẩn để tránh lặp lại.

Các sự kiện focus/pageshow/storage chỉ áp dụng lại trạng thái khi chương nguồn thực sự đổi. Lỗi ghi storage không khiến bản lưu cũ ghi đè tiến độ đọc còn trong bộ nhớ của phiên đang mở.

Đồng bộ dùng localStorage trong cùng trình duyệt và cùng origin. Lỗi storage không chặn thao tác trong phiên. Đọc quá chương 300 vẫn giữ đúng `currentChap`, nhưng dữ liệu hồ sơ lấy đến chương 300 và hiển thị thông báo phạm vi.

Hồ sơ dùng trạng thái cuối chương. `lib/story/war-god.ts` chứa các ghi nhận có chương nguồn, không phải danh sách đầy đủ mọi vật phẩm hay số dư liên tục. Hồn lực có dữ liệu hiển thị chương xác nhận; công pháp ghi rõ khi chưa biết còn giữ bản vật lý hay không. Kỹ năng thay thế và vật liệu đã tiêu hao có mốc loại bỏ.

Khối nhân vật dùng giao diện tu hành: tên nhân vật, dòng cảnh giới không đóng khung ngay dưới tên và thanh hồn lực. Cảnh giới khởi đầu là Luyện Khí Tầng 1, cập nhật theo chương đang đọc. Thanh hồn lực phản ánh bản ghi có nguồn, không phải số dư trực tiếp; chưa có dữ liệu thì chỉ hiển thị — / —, không gán bằng 0. Bản ghi vượt ngưỡng (530/20) giữ nguyên số liệu, thanh đầy và nhãn +510; không tự tạo điểm kinh nghiệm hay phần trăm đột phá.

Nguồn: ghi chú chương trong thư mục này và đối chiếu trực tiếp bản EPUB đã cung cấp, qua các chương HTML xuất tại `public/chu-gioi-tan-the-online/html/`.

Các mốc đối chiếu bổ sung: cuối chương 4 đạt Luyện Khí tầng 2; chương 13 tầng 3; 14 tầng 4 và hồn lực 2/6; 15 tầng 5 và hồn lực 1/7 sau khi học Yến Song Phi; 16 Loạn Vũ thay Yến Song Phi. Chương 47 xác nhận tầng 7; 64 trao Địa kiếm; 65 bái sư; 66 ghi nhận tên Dạ Vũ; 92 nhận mảnh tim; 95 dùng mảnh tim; 96 học công pháp mới; 97 Trúc Cơ; 98 chọn Tru Tà; 99 công bố hiệu quả; 100 hoàn tất hồi phục kiếm quyết, hồn lực 530/20 và lực Địa kiếm 6.000 cân.

Không dùng con số lực kiếm ở chương 100 để điền các chương trước. Không coi một mức hồn lực từng ghi nhận là số dư hiện tại ở mọi chương sau.

Chi tiết pháp bảo, vật phẩm và kỹ năng hiển thị trong tooltip khi di chuột, focus bằng bàn phím hoặc chạm trên điện thoại. Tooltip giữ mô tả và liên kết chương nguồn, tự đặt vị trí trong màn hình; đóng khi rời chuột, nhấn Escape, chạm bên ngoài hoặc cuộn trang. Không còn khối Thông tin giám định riêng.

## Mở rộng chương 101–200

Xem [bản tổng hợp](tong-hop-101-200.md). Hồ sơ thêm kỹ năng, pháp quyết, chiến giáp, Phá Ma tiễn và các ghi nhận hồn lực/cảnh giới. Modal thêm Danh Hiệu Chiến Thần từ 134, thay danh hiệu Kiêu Kỵ bằng Du Kích ở 167; chỉ xem trạng thái theo truyện. Bảng nhiệm vụ thêm Quyết chiến (thượng) và yêu cầu nâng Tru Tà. Hồn lực không có mẫu số thì hiển thị số đơn, không dựng thanh phần trăm giả. Dữ kiện chỉ mở từ chương được xác nhận.

## Mở rộng chương 201–300

Xem [bản tổng hợp](tong-hop-201-300.md). Modal dùng Cương Trực hai giây từ 237, thay hiệu quả một giây cũ; danh hiệu thích khách mở ở 267 và nâng ở 268. Quyết chiến (hạ) đổi mục tiêu ở 276. Hồ sơ ghi Kim Đan ở 276, Nguyên Anh ở 285, Nguyên Anh hậu kỳ ở 299; hồn lực thiếu số chốt được ghi rõ, không tự tính. Liễm Tức Sâu là quyền dùng một lần, Triệu Hồn Nhân Quả nằm trong vật phẩm một lần, Hồng Hoang Liệt Diễm không phải giáp sở hữu. Có 100 tóm tắt chương mới và migration giữ chỉnh sửa cá nhân.

## Mở rộng chương 301–1000

Xem [bản tổng hợp](tong-hop-301-1000.md). Bảy gói chứng cứ đọc toàn văn nối thêm 700 chương, 87 mốc truyện và 54 hồ sơ nhân vật quan trọng. Trạng thái Thanh Sơn được cập nhật bằng sự kiện theo chương: 27 mốc cảnh giới, 92 ghi nhận hồn lực và 352 thay đổi kỹ năng, trang bị, vật phẩm trong phạm vi mới.

Danh sách nhiệm vụ có 29 hồ sơ tới chương 1000; chỉ gồm nhiệm vụ do Chiến Thần phát hoặc xác nhận. Phân loại “Nhiệm vụ hệ thống” bao quát cả nhiệm vụ Thần thông, Kiếm Tiên, danh hiệu và các chức năng về sau. Chương 1000 mới bắt đầu tạo nhiệm vụ, chưa công bố đủ tên/điều kiện/phần thưởng.

Modal có mục Chức năng đã mở để tra diễn tiến Biên niên sử/Tình báo cá nhân, Nhiệm vụ Chiến Thần, qua lại thế giới và các danh hiệu. Khi hệ thống vắng mặt, ghi trạng thái vắng thay vì mô phỏng nút hành động; phục hồi khi giao diện nguyên bản trở lại. Các nguồn hồn lực riêng không cộng chung; không suy ra số dư sau những khoản thu chi không đủ dữ liệu.

Đọc lại chương cũ trả về đúng kỹ năng, vật dụng và nhiệm vụ ở mốc đó. Bản đồ vẫn là tổng quan toàn phạm vi. Bản lưu được nâng từ seed 300 cố định, giữ dữ liệu cá nhân và lưu bản sao trước nâng.


## Mở rộng chương 1001–1500

Xem [tổng hợp 1001–1500](tong-hop-1001-1500.md) và năm gói chứng cứ đọc toàn văn cùng khoảng chương. Hồ sơ cập nhật trạng thái cuối chương, gồm nhiệm vụ tiếp nối từ chương 1000, vòng nhẫn An Hồn Hương, các cấp tu vi, Kiếm đồng, phù thuật và truyền thừa Bất Chu.

Tinh Hà kiếp hoàn tất ở chương 1478. Chương 1477 mới đạt điều kiện tối thiểu rồi tiếp tục leo Thần thụ. Ngọc Thánh Tuyển nhận ở 1478 được dung nhập mắt trái ở 1489; cùng lúc Hoàng Tuyền Lộ Dẫn thức tỉnh, Đoạn Thủy Lưu chuyển thành Vong Xuyên Giang Trảm. Quyến Luyến do Phi Nguyệt trao ở 1495 còn quyền trả lại. Cuối chương 1500 mới có mảnh Định Giới đầu tiên và ba thuật sao trời; pháp trượng dùng để học đã trả ngay trong chương.

Chỉ mệnh lệnh do Giao diện Chiến Thần ban bố được đưa vào danh sách nhiệm vụ. Lệnh chịu phạt của thân phận ác quỷ, yêu cầu công hội, chỉ dẫn Thánh Tuyển và lời tiên đoán không tạo nhiệm vụ hệ thống giả. Chi phí duy trì, số liệu làm tròn và đoạn nguồn mâu thuẫn có ghi chú; không tự dựng số dư hồn lực.
