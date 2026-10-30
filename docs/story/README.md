# Nguồn cho timeline chương 1–1500

Giao diện **Cốt Truyện** hiện tách mỗi Arc thành một sơ đồ riêng, có submenu và nút chuyển Arc. Xem [cách tổ chức và lưu dữ liệu theo Arc](cot-truyen-theo-arc.md).

**Cập nhật hiện tại:** đã đọc đủ chương 1–1500; 1.500 tóm tắt, 170 mốc cốt truyện và 138 hồ sơ nhân vật kể cả Cố Thanh Sơn. Phần mới bổ sung 500 chương và 57 mốc; xem [Tổng hợp chương 1001–1500](tong-hop-1001-1500.md) và [301–1000](tong-hop-301-1000.md). Hồ sơ Chiến Thần lọc theo chương; bản đồ tổng quan giữ các chỉnh sửa cá nhân khi nâng dữ liệu.

Chuẩn bị hình ảnh: [Danh sách ảnh vật dụng và hệ thống Chiến Thần](danh-sach-anh-vat-dung.md), gồm mô tả, chương tham chiếu, gợi ý tạo hình, tên file và bảng theo dõi.

Thiết kế hệ thống: [Spec concept Giao diện Chiến Thần](chien-than-concept-spec.md), đối chiếu nguyên tác để đề xuất thiết kế lại modal với màn sáng xanh lam, hàng nút tròn và bàn quay năm chủng.

Nguồn chính: `Chu Gioi Tan The Online - Yen Hoa Thanh Thanh.epub` trong thư mục dự án, SHA-256 `c085010a96c7753a56cbf51db7301c5c74c163f162ba84f10f13493647eb7c44`.

## Lịch sử dữ liệu chương 1–100

Phần dưới ghi lại các lần xây dựng trước đây; số lượng hồ sơ và mốc tại từng lần không phải số hiện tại.

Đã đọc toàn văn các entry `OEBPS/html/chuong-0001.html` đến `chuong-0100.html` theo sáu nhóm không chồng lặp. Các tệp `chapter-notes-*.json` ghi tóm tắt bằng lời mới, kết quả sự kiện, nhân vật và những điểm cần đối chiếu. Không lưu bản chép toàn văn truyện vào ứng dụng.

Ứng dụng dùng 8 mốc (4 Tu Hành, 4 thế giới thực), có diễn biến từng chương hiển thị ngay trong phần Nội dung, trước danh sách nhân vật. Một số chương chuyển cảnh (4, 44, 69, 80, 85, 95) thuộc cả hai mốc liên quan. Khoảng cách ngang chỉ thể hiện thứ tự trên từng nhánh, không thể hiện thời gian trôi hay sự đồng thời giữa các cột.

Các nhân vật có tên, danh hiệu hoặc vai trò nhận diện trong đoạn được đưa vào 85 hồ sơ, kể cả nhân vật chỉ được nhắc. Những vai vô danh không thể nhận diện riêng không bị gán tên; các hóa thân heo/người chèo thuyền/cung nữ được giải thích trong hồ sơ Bách Hoa và tóm tắt chương. Ngỗng Trắng giữ hồ sơ riêng vì có vai trò dẫn đường được nêu rõ. Không tạo hồ sơ riêng cho từng loại yêu thú thông thường.

Hồ sơ nối vào mốc đầu tiên đề cập/hiện diện. Phần mô tả phân biệt chương xuất hiện, chương gọi tên và chương gặp Thanh Sơn khi các thời điểm này khác nhau. Các thông tin sau chương 100 không dùng để điền sư môn hoặc danh tính chưa được tiết lộ.

Các điểm đã đối chiếu:

- Nữ Thần Công Chính được gọi trực tiếp ở chương 17; quyền Lãnh tụ tối cao ở chương 24.
- Anna hiện diện chưa tên ở chương 8, được gọi Anna ở chương 17, gặp Thanh Sơn ở chương 20.
- Mặc Kính Nam, Phùng Hoắc Đức và Hoắc Đức là một người. Hải hoàng là Lý Đông Nguyên (chương 17), không tạo hồ sơ trùng.
- Công Tôn Trí xuất hiện ở chương 28; Ninh Nguyệt Thiền được nhắc ở chương 28 và xuất hiện ở chương 29.
- Nhóm Lãnh Thiên Tinh hiện diện từ cuối chương 44; tên người chỉ huy được nêu ở chương 46, bốn đồng đội được gọi tên ở chương 47.
- Bách Hoa được nhắc ở chương 54; Ngỗng Trắng xuất hiện ở chương 56; chính thức yết kiến ở chương 62; chọn kiếm ở chương 63, tên Địa kiếm ở chương 64, nhận lời bái sư ở chương 65, xác nhận đệ tử thứ tư và tên Tạ Đạo Linh ở chương 66.
- Chương 69 vẫn ghi nhiệm vụ Định Mệnh đang tiến hành. Không kết luận việc chữa trị Công Tôn Trí đã hoàn tất.
- Tần Tiểu Lâu và Tú Tú xuất hiện ở chương 81; cũng tại đây Ngỗng Trắng được giới thiệu tên Bạch Ánh Thiên và vai đại sư huynh. Giữ cùng ID nhân vật Ngỗng Trắng.
- Giữ cách viết Tô Hưng Triêu và Bạch Hồng Vũ theo lần đầu; các biến thể Tô Hưng Triều/Bạch Hoành Vũ ở chương 71 không tạo nhân vật mới.
- Chuẩn hóa Thần Vũ/Võ Thần/Thần Võ về Thần Võ khi cùng chỉ thế giới đó. Không dùng lỗi tên Ninh Nguyệt Kiều hoặc câu “tầng thứ nhất” ở chương 46 để tạo sự kiện mới; chương 47 xác nhận Luyện Khí tầng bảy.
- EPUB có một tiêu đề phụ “Chương 24: Vây Quét” nằm trong entry chương 21. Số chương lấy từ entry và tiêu đề chính, không dùng dòng này để đánh lại số.

Ảnh do người dùng chọn trong hồ sơ, được thu nhỏ và lưu tại trình duyệt cùng sơ đồ; không tải ảnh lên dịch vụ ngoài. Chuyển dữ liệu v3/v4 sang v5 cập nhật nội dung gốc, giữ node riêng, các đường nối và nhãn do người dùng chỉnh, cùng ảnh tương thích. Khóa v3/v4 được giữ làm bản sao lưu toàn bộ nội dung trước chỉnh sửa.


## Phần tiếp nối 72–100

Đọc toàn văn 29 chương mới trong các ghi chú `chapter-notes-72-81.json`, `chapter-notes-82-91.json`, `chapter-notes-92-100.json`. Có 20 hồ sơ mới; các vai vô danh nhận diện rõ được ghi bằng vai trò, còn nhân vật quần chúng/thoáng qua chỉ có trong tóm tắt chương. Không gán tên từ phần sau.

Gộp vào mốc Cửu phủ chương 71–80 và thêm bốn mốc:

- Tu Hành 80–85: nhận sư môn, tìm bốn chủng vật liệu, sinh hoạt Bách Hoa.
- Thế giới thực 85–89: kết minh Anh Hào, tìm Vũ Trụ chủng, cuộc cược ở sòng bạc.
- Thế giới thực 90–95: xử sòng bạc, nhận vật liệu, dịch quỷ và quyết định ở lại của Anna.
- Tu Hành 95–100: hoàn thành nhiệm vụ, Trúc Cơ, Lôi điện và luyện kiếm.

Các chương chuyển cảnh thuộc cả hai mốc tương ứng. Chương 80 mở đầu bằng Bạch phủ hủy thuê sát thủ rồi chuyển sang Bách Hoa; chương 85 chuyển về hiện thực; chương 95 có cả Anna ở hiện thực và Thanh Sơn ở Tu Hành.

Đối chiếu đầu xuất hiện và kết quả:

- Hải Đức xuất hiện vô danh ở cuối 73, nêu tên 74; không khẳng định kết cục riêng khi văn bản không nói rõ.
- Trương Anh Hào 74; Sài Lang 75; Trương Hành Chỉ 77; Lý Đồng và Tôn Minh Nguyệt 78.
- Chương 81 chính thức xếp Thanh Sơn là tam sư đệ, Tú Tú nhỏ nhất; giữ chú thích về cách gọi đệ tử thứ tư ở chương 66.
- Mèo mun 85; Độc Cô Quỳnh 86; Chu Khai Vũ xuất hiện vô danh 86, xác nhận chủ sòng bạc 89, nêu tên 90; Lão Tôn 91; Tuần lộc đồng hoang và lời nhắc em gái Anh Hào 93.
- Chương 81 bắt đầu nhiệm vụ thu năm chủng; 82 đủ bốn, 92 lấy mảnh tim, 95 hoàn thành nhiệm vụ.
- Trúc Cơ ở 97, chọn Tru Tà/sinh pháp ở 98, Mất Khống Chế một giây ở 99. Lực Địa kiếm được Thanh Sơn sử dụng ở 100 là sáu nghìn cân.
- Nhận định ở 97 về nguyên nhân tận thế đến sớm là suy luận của Thanh Sơn. Không xác nhận người diệt Nhiếp phủ hoặc tên nhóm sát thủ Bạch phủ thuê.

Dữ liệu v6 dùng bản gốc v5 cố định để so sánh từng trường khi nâng cấp. Giữ văn bản, vị trí, ảnh, nguồn và đường nối người dùng đã sửa, tôn trọng việc xóa node/đường nối; bổ sung các mục mới và cập nhật các trường gốc chưa sửa. Khóa v5 vẫn được giữ làm bản sao lưu.


Mốc thế giới thực 69–70 đã gộp với 71–80 thành “Nâng cấp Nữ Thần, đối đầu Cửu phủ” (69–80). Bỏ khối nguồn và mục mở rộng cuối bảng chi tiết. Dữ liệu v7 giữ bản sao v5/v6, chuyển đường nối của mốc cũ sang mốc gộp và giữ các ghi chú riêng cùng ảnh nhân vật.


Mốc Tu Hành “Thức tỉnh Chiến Thần, tu luyện Loạn Vũ” gộp hai mốc chương 1–4 và 12–16, giữ đúng các chương của hai mốc và toàn bộ 8 hồ sơ nhân vật giới thiệu. Chương 5–11 thuộc tuyến hiện thực. Dữ liệu v8 chuyển bản lưu v7, giữ ghi chú và ảnh, chuyển các đường nối training sang awakening.


Mốc “Giải cứu Công Tôn Trí, Ninh Nguyệt Thiền và đến Thần Võ” gộp chương 28–32 và 33–37 thành 28–37, giữ cả 6 hồ sơ nhân vật giới thiệu. Dữ liệu v9 chuyển bản lưu v8, giữ ghi chú, ảnh và chuyển đường nối than-vo sang rescue.


Mốc “Thoát Thần Võ, đến Bách Hoa và bái sư” gộp ba mốc 44–53, 54–61, 62–65 thành chương 44–65, giữ đủ 12 hồ sơ nhân vật giới thiệu. Dữ liệu v10 chuyển bản lưu v9, giữ ghi chú, ảnh và chuyển đường nối bach-hoa/apprenticeship sang sword.


Mốc “Bách Hoa cứu viện, nhập sư môn và Trúc Cơ” gộp ba đoạn chương 66–69, 80–85, 95–100, giữ đúng 16 chương và đủ 10 hồ sơ nhân vật giới thiệu. Các chương hiện thực xen giữa vẫn nằm trên nhánh riêng. Dữ liệu v11 chuyển bản lưu v10, giữ ghi chú, ảnh và chuyển đường nối sect-family/foundation sang saints.


Mốc “Liên Bang bảo hộ, kết giao Anna và đối đầu Cửu phủ” gộp các đoạn 21–27, 38–44, 69–80, gồm cả mốc biển 69–70 trước đây. Giữ đủ 26 chương, 23 hồ sơ nhân vật; các chương Tu Hành xen giữa ở nhánh riêng. Dữ liệu v12 chuyển bản lưu v11 và các bản cũ; archery, sea, upgrade đều quy về impartial-goddess. Nhãn đường nối riêng nằm bên trong mốc gộp được chuyển thành ghi chú trong Nội dung.


Mốc “Kết minh Anh Hào, tìm Vũ Trụ chủng và dịch quỷ bùng phát” gộp 85–89 và 90–95 thành chương 85–95, giữ đủ 11 chương và 7 hồ sơ nhân vật giới thiệu. Dữ liệu v13 chuyển bản lưu v12, giữ ghi chú, ảnh và chuyển đường nối outbreak sang cosmic-search.
