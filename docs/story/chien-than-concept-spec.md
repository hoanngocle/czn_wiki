# Spec concept Giao diện Chiến Thần

**Trạng thái:** đã được người dùng duyệt và triển khai vào modal ngày 30/10/2026. Minh họa hiện dùng vector; có thể thay bằng ảnh vật dụng sau. Các ghi chú “đề xuất” bên dưới phân biệt lựa chọn mỹ thuật với bằng chứng nguyên tác.

**Concept:** một màn sáng xanh lam nổi trước tầm mắt Cố Thanh Sơn. Chữ hệ thống xuất hiện trong khoảng không trung tâm; một hàng nút tròn nằm ở đáy, các chức năng chưa mở chìm trong bóng tối và sương. Khi nhận phần thưởng Thần thông, bàn quay chiếm toàn bộ sân khấu; sau khi chọn, nó thu nhỏ về hàng nút.

Người đọc đang quan sát hệ thống tại mốc truyện của mình. Mọi tương tác phục vụ khám phá và xem lại; kết quả tu luyện, nhiệm vụ và phần thưởng vẫn theo truyện.

## 1 Căn cứ trong nguyên tác

Nguồn là bản EPUB đã xuất thành HTML trong dự án, phạm vi chương 1–100. Các mô tả dưới đây được diễn giải lại. Cột cuối chuyển chi tiết nguyên tác thành yêu cầu thiết kế.

| Nguồn | Mô tả đã xác nhận | Hệ quả cho concept |
| --- | --- | --- |
| [Chương 3](../../public/chu-gioi-tan-the-online/html/chuong-0003.html) | Giao diện xanh nhạt; hàng nút bên dưới giống những lỗ đen, thỉnh thoảng có sương. Chữ nhỏ màu xanh xuất hiện phía trên. Nút đầu tiên từ từ hiện tên Kỹ nghệ Chiến Thần. | Bố trí hàng nút dưới cùng. Tạo chiều sâu cho nút chưa mở. Chữ và quá trình hiện tên là điểm nhấn. |
| [Chương 4](../../public/chu-gioi-tan-the-online/html/chuong-0004.html) | Các chức năng khác vẫn đen. Giao diện có thông tin nhân vật, hồn lực, kinh nghiệm và đồng hồ cát. Khi chạm vũ khí, hệ thống liệt kê kỹ năng, người từng thi triển và chi phí lĩnh ngộ. | Kỹ nghệ cần một chế độ giám định vũ khí. Hồn lực, kinh nghiệm và đồng hồ cát là các thành phần riêng, có dữ liệu theo cảnh. |
| [Chương 14](../../public/chu-gioi-tan-the-online/html/chuong-0014.html) | Chữ nhỏ sáng như đom đóm. Thanh Sơn chọn dùng hồn lực thay kinh nghiệm để nâng cấp; lựa chọn này loại bỏ cách nâng cấp bằng kinh nghiệm. | Chữ sáng nhẹ. Thay đổi cách hiển thị chỉ số sau lựa chọn; không giữ thanh EXP như một cơ chế đang dùng ở mọi chương. |
| [Chương 16](../../public/chu-gioi-tan-the-online/html/chuong-0016.html) | Kỹ nghệ được đại diện bằng một vầng sáng hình tròn; phát thông báo khi sáng tạo Loạn Vũ. | Nút Kỹ nghệ là vầng sáng tròn. Thông báo sáng tạo kỹ năng xuất hiện từ vùng này. |
| [Chương 34](../../public/chu-gioi-tan-the-online/html/chuong-0034.html) | Một vệt sáng lướt qua; chữ đỏ như máu xuất hiện ngay chính giữa khi vào nhiệm vụ Định Mệnh. | Nhiệm vụ dùng trạng thái thông báo trung tâm màu đỏ. Chưa có bằng chứng rằng nó là nút tròn thường trực thứ ba. |
| [Chương 69](../../public/chu-gioi-tan-the-online/html/chuong-0069.html) | Nhiệm vụ Định Mệnh vẫn được ghi đang tiến hành. | Không báo hoàn thành ngay khi nhân vật được cứu khỏi chiến trường. |
| [Chương 81](../../public/chu-gioi-tan-the-online/html/chuong-0081.html) | Nhiệm vụ hoàn thành. Khi nhận thưởng, nội dung giao diện biến mất, thay bằng bàn quay tròn với năm hốc sâu, hình vẽ và hoa văn. | Vòng quay là một cảnh riêng chiếm sân khấu trung tâm, không phải danh sách năm thẻ trong cột chi tiết. |
| [Chương 94](../../public/chu-gioi-tan-the-online/html/chuong-0094.html) | Ánh đỏ, chữ lớn cảnh báo dòng thời gian hỗn loạn và đếm ngược 15 giây. | Có mức cảnh báo khẩn màu đỏ; đếm ngược chỉ thuộc cảnh truyện được xem lại. |
| [Chương 95](../../public/chu-gioi-tan-the-online/html/chuong-0095.html) | Mảnh tim bị hút vào hốc cuối. Cả năm hốc biến thành điểm sáng, ánh sáng lan ra vòng tròn. | Phân biệt hình thức hốc rỗng, vật liệu có sẵn và trạng thái đã khảm. Hoàn thành bằng ánh sáng lan trên vòng. |
| [Chương 97](../../public/chu-gioi-tan-the-online/html/chuong-0097.html) | Đột phá Trúc Cơ, vòng quay sáng mạnh, đánh giá S. Xuất hiện bốn ô; nhìn ô nào thì ô ấy sáng và hiện lời giới thiệu bên cạnh. | Bốn lựa chọn có trạng thái tập trung và phần giới thiệu liền kề. Trên web dùng trỏ chuột, bàn phím hoặc chạm. |
| [Chương 98](../../public/chu-gioi-tan-the-online/html/chuong-0098.html) | Tru Tà được biểu diễn bằng hai rắn bạc quấn lại thành chữ. Vòng tròn thu nhỏ xuống hàng nút. Lúc này chỉ hai nút sáng: Kỹ nghệ và vòng Thần thông chứa Tru Tà. | Đây là chuyển cảnh chủ đạo. Giữ đúng hai chức năng đã sáng ở mốc này. |
| [Chương 99](../../public/chu-gioi-tan-the-online/html/chuong-0099.html) | Hệ thống công bố hiệu quả Lôi điện; đồng hồ cát rơi rất chậm. Hồn lực có thể lớn hơn giới hạn hiển thị. | Không tự tính thời gian chạy thật. Không biến hồn lực thành thanh phần trăm bị chặn ở 100%. |

## 2 Những điểm cần sửa so với ảnh hiện tại

| Hiện tại | Concept thay thế |
| --- | --- |
| Modal trắng ngà với hai cột menu và nội dung | Một màn sáng thống nhất; vùng biểu diễn trung tâm và hàng nút phía dưới |
| Kỹ nghệ, nhiệm vụ, Thần thông xếp thành menu dọc tương đương | Kỹ nghệ và Thần thông là các nút tròn; nhiệm vụ hiển thị như thông báo trong sân khấu |
| Icon khiên hoặc kiếm lục giác đại diện hệ thống | Đề xuất dấu hiệu mở modal bằng vòng sáng với lõi tối; huy hiệu lục giác không có căn cứ trong đoạn nguồn |
| Hòm thông tin dùng nhiều thẻ có viền, bo góc | Chữ nổi, đường phân cách mảnh, ít bề mặt đặc; dành diện tích cho vật thể và vòng quay |
| Năm chủng là danh sách dọc | Năm hốc nằm trên một bàn quay có đồ án riêng |
| Mỗi kỹ năng gắn một liên kết nguồn thường trực | Một lối “Đối chiếu truyện” mở ghi chú nguồn theo nội dung đang xem |
| Chương 4 ghi hồn lực chưa có số liệu | Ghi nhận được 4/5 ở đầu chương và 1/5 gần cuối chương, trước đoạn thăng cấp; phải chỉ rõ thời điểm thay vì báo hoàn toàn không có dữ liệu |
| Kỹ nghệ chỉ liệt kê kỹ năng đã học | Tách kỹ năng nhìn thấy trên vũ khí, kỹ năng đã lĩnh ngộ và chi phí học |

Giữ cách mở bằng icon trên header, modal tại chỗ và tiến độ đọc hiện có. Trang hồ sơ nhân vật vẫn là nơi tổng hợp pháp bảo, vật dụng, sư môn và nhật ký.

## 3 Hướng mỹ thuật đề xuất

### Cảm giác

Yên tĩnh, lạnh, bí ẩn và chính xác. Hệ thống có cảm giác không thuộc thế giới vật chất. Chuyển động nhỏ và có lý do; phần nhìn thu hút nhất là chữ sáng, vòng Kỹ nghệ và hốc tối. Giảm chi tiết trang trí khi chúng cạnh tranh với thông tin.

Nguyên tác xác nhận màu xanh nhạt và chữ xanh lam nhưng không quy định mã màu, font, độ trong suốt, chất liệu kính hay tỷ lệ khung. Các thông số dưới đây là đề xuất thiết kế.

| Thành phần | Đề xuất |
| --- | --- |
| Không gian sau modal | Trang đang đọc tối và mờ đi, vẫn nhận ra bối cảnh |
| Nền màn hệ thống | Xanh đen `#07131D`, lớp xanh lam trong mờ ở mép; chọn nền tối để chữ xanh nhạt có tương phản |
| Màn sáng | Xanh lam nhạt `#91D8F4`, chỉ phủ lớp mỏng, không phủ kín nội dung bằng ánh sáng |
| Chữ chính | Xanh trắng `#E0F5FF`, sắc nét; glow rất nhẹ ngoài nét chữ |
| Chữ phụ | Xanh xám sáng `#A5BECF`, vẫn đọc được trên nền thực tế |
| Chức năng đang hoạt động | Lam bạc `#85D9FF`, vòng sáng mảnh và nhãn rõ |
| Nút chưa mở | Lõi gần đen `#02070C`, viền sâu, sương xám lam mỏng |
| Cảnh báo định mệnh | Đỏ `#FF747E`; giới hạn ở thông báo nguy hiểm |
| Tru Tà | Bạc lạnh `#DAE8F4` với ánh điện lam; hình hai rắn bạc là yếu tố chính |
| Font | Font tiếng Việt hiện có, nét thường hoặc vừa; chữ nội dung 15–17 px, tiêu đề 22–28 px trên desktop |

Không dùng chữ rune giả làm nội dung. Hoa văn hốc vòng quay có thể dùng nét trừu tượng, nhưng năm đồ án nhận diện phải bám mô tả bên dưới. Không tự thêm HP, MP, phẩm chất trang bị hoặc thanh phần trăm tu vi.

## 4 Bố cục modal

Desktop: khung đề xuất tối đa khoảng 1040 px rộng, cao không quá 88% vùng nhìn. Viền mảnh, góc tiết chế; nội dung có khoảng trống để cảm giác nổi trong không gian. Nút đóng luôn thấy được.

Thứ tự từ trên xuống:

1. **Thanh ngoài hệ thống:** tên Giao diện Chiến Thần, chương đang đọc, nút đóng. Đây là tiện ích đọc wiki, không giả làm một phần mô tả nguyên tác.
2. **Dải trạng thái gọn:** biểu tượng nhân vật, Cố Thanh Sơn và cảnh giới; hồn lực ở cạnh phải; đồng hồ cát có chú thích trạng thái. Nguồn và thời điểm của chỉ số mở khi bấm vào chỉ số.
3. **Sân khấu trung tâm:** thông báo, vật đang giám định, nhiệm vụ hoặc vòng quay. Mỗi thời điểm có một chủ thể chính.
4. **Dòng hệ thống:** một hoặc vài dòng ngắn xuất hiện phía trên hàng nút. Nội dung dài mở rộng tại chỗ.
5. **Hàng nút dưới cùng:** các vòng tròn đã mở có nhãn; phần chưa mở là dải lõi tối và sương, mờ dần về mép. Không khẳng định tổng số nút vì nguồn chưa xác nhận con số này.
6. **Tiện ích nhỏ:** xem lại thông báo và đối chiếu truyện. Đặt ngoài hàng chức năng nguyên tác để người đọc phân biệt.

Trên điện thoại: dải trạng thái xuống hai dòng; sân khấu theo chiều dọc; hàng nút vẫn nằm dưới vùng nội dung và dễ chạm. Vòng quay giữ hình tròn, chọn một hốc thì mô tả hiện bên dưới. Không thu nhỏ chữ chạy quanh chu vi. Vùng chạm tối thiểu 44 px, hỗ trợ chiều rộng 320 px, cuộn theo chiều dọc trong modal.

## 5 Các cảnh giao diện

### A Màn hệ thống thường trực

Một thông báo ngắn hoặc trạng thái gần nhất ở trung tâm. Hàng nút bên dưới là điểm điều hướng chính. Chương 1–2 chưa có hệ thống thức tỉnh: hiển thị trạng thái chưa thức tỉnh kín đáo, không hé lộ tên chức năng tương lai. Từ chương 3 có Kỹ nghệ; đến hết chương 98 có hai nút sáng theo mô tả nguồn.

Đồng hồ cát là dấu hiệu nhận diện cần có từ khi nguồn đã mô tả ở chương 4. Khi chỉ biết trạng thái định tính, thể hiện “đã hết”, “rơi rất chậm” hoặc “chưa xác định”, kèm chương nguồn; không tự suy ra số phút còn lại theo đồng hồ máy tính.

### B Kỹ nghệ Chiến Thần và giám định

Bấm vòng Kỹ nghệ mở vật đang giám định trong sân khấu. Vật thể nằm một bên hoặc ở chính giữa phía trên; thông tin hệ thống hiện cạnh nó, giữ nội dung dễ đọc.

Mỗi kỹ nghệ có tên, người từng thi triển khi nguồn nêu, chi phí lĩnh ngộ và trạng thái: đã nhìn thấy, đã học hoặc được thay thế. Kỹ năng nhìn thấy trên vũ khí không đồng nghĩa với đã học; cũng không nên giấu tên một kỹ năng đã được truyện công bố chỉ vì nhân vật học ở chương sau.

Ví dụ Quân cung ở chương 4:

| Kỹ nghệ | Người thi triển | Chi phí nguồn nêu | Trạng thái cuối chương |
| --- | --- | --- | --- |
| Ổn Định và Liên Xạ | Trương Vũ | 2 hồn lực cho cặp kỹ năng | Đã lĩnh ngộ |
| Chính Xác | Trương Vũ | 4 hồn lực | Đã nhìn thấy; chưa ghi nhận lĩnh ngộ |
| Yến Song Phi | Trương Vũ | 6 hồn lực | Đã nhìn thấy; chưa lĩnh ngộ ở chương này |

Không chia chi phí 2 hồn lực thành 2 cho từng kỹ năng. Không bật nút “Lĩnh ngộ” làm thay đổi truyện. Có thể có thao tác “Xem quá trình lĩnh ngộ” cho kết quả đã xảy ra; đây là xem lại một cảnh, không trừ điểm trong dữ liệu người đọc.

### C Nhiệm vụ Định Mệnh

Khi xem lại cảnh chương 34, một vệt sáng ngắn đi qua sân khấu; nội dung nhiệm vụ đỏ xuất hiện ở trung tâm. Phân cấp: tên kịch bản, mục tiêu cứu hai người, phần thưởng, điều kiện thất bại. Không nhấp nháy đỏ liên tục.

Ở chế độ xem trạng thái thông thường, hiện bản rút gọn với trạng thái nhiệm vụ. Mở từ tiện ích thông báo hoặc chỉ báo nhiệm vụ; không dựng thêm một nút tròn đã mở mang tên Định Mệnh vào hàng chức năng. Chương 69 vẫn đang tiến hành; chương 81 mới xác nhận hoàn thành.

### D Bàn quay năm chủng

Từ chương 81, cảnh nhận thưởng thay sân khấu bằng bàn quay. Năm hốc phân bố đều quanh vòng, bên trong có đồ án. Vị trí góc và chiều sắp xếp là lựa chọn mỹ thuật; thứ tự dưới đây theo lời kể.

| Chủng | Đồ án theo chương 81 | Vật liệu xác nhận sau đó |
| --- | --- | --- |
| Hỗn Loạn | Quái vật không rõ diện mạo nằm rạp gặm thi thể | Móng vuốt giao long xám hai sừng, chương 82 |
| Thâm Uyên | Cầu thang đá uốn xuống vực sâu không thấy đáy | Đầu lâu quái vật mười mắt, chương 82 |
| Vũ Trụ | Tinh cầu bị bốn chân quái vật khổng lồ phủ lên | Mảnh tim quái vật vũ trụ, chương 92 |
| Hoàng Tuyền | Cảnh người chết sống lại | Trường kiếm sứt mẻ, chương 82 |
| Vị Tri hoặc Hỗn Độn | Mây dày với tay chân vươn ra | Mảnh xác phủ mây mỏng, chương 82 |

Hốc chưa có dữ liệu mang đồ án tối. Vật liệu đã thu thập được minh họa cạnh hốc hoặc trong bảng chi tiết; không tự coi đã thu thập là đã khảm. Chương 95 xác nhận cả năm hốc được lấp đầy: chúng biến thành điểm sáng và ánh sáng lan theo vòng. Những thời điểm khảm bốn món đầu chưa được đối chiếu riêng phải giữ mức thông tin đã xác nhận.

Chạm hoặc tập trung vào hốc sẽ tăng độ sáng và mở tên chủng, vật liệu, trạng thái. Thời hạn 48 giờ là dữ kiện của nhiệm vụ trong truyện; không khởi động một đồng hồ 48 giờ thật khi người dùng mở modal.

### E Bốn lựa chọn và thu nhỏ về hàng nút

Ở chương 97, hiển thị bốn vị trí lựa chọn và đánh giá S. Chương này mới mô tả rõ biểu tượng đồng hồ; các biểu tượng và lời giải thích chỉ được mở theo đoạn nguồn đã công bố. Không lấy thông tin chương 98 điền vào chương 97.

Đến chương 98, có thể xem lại đủ bốn lựa chọn:

| Biểu tượng nguyên tác | Tên |
| --- | --- |
| Đồng hồ | Tuyên Ngôn Thời Gian |
| Nắm đấm | Không Quyền |
| Avatar nữ | Biến Thân Thành Nữ |
| Hai rắn bạc; quấn lại thành chữ khi được nhìn | Tru Tà |

Trỏ chuột, focus hoặc chạm làm biểu tượng sáng lên và hiện mô tả cạnh nó. Người đọc được khám phá lựa chọn, nhưng không đổi phần thưởng đã chọn của nhân vật. Ghi rõ “Cố Thanh Sơn đã chọn Tru Tà”. Cảnh xem lại kết thúc bằng vòng tròn thu nhỏ xuống hàng nút đen, thay một nút chưa mở; trong vòng còn biểu tượng Tru Tà.

Không lặp quá trình lựa chọn mỗi lần mở modal. Từ chương 99, mở vòng Thần thông sẽ thấy Lôi điện, Tru Tà và hiệu quả Mất Khống Chế một giây theo nguồn.

## 6 Quy tắc dữ liệu theo chương và theo cảnh

- `currentChap` vẫn lấy tiến độ đọc hiện có. Modal không đổi chương, URL hay vị trí cuộn của người đọc.
- Mặc định xem trạng thái cuối chương. Cảnh xem lại dùng mốc nhỏ hơn bên trong chương và có nhãn riêng; không trộn chỉ số trước sự kiện với trạng thái sau sự kiện rồi gọi là đồng thời.
- Mỗi dữ kiện cần chương, vị trí trước hoặc sau sự kiện khi cần, loại bằng chứng và trạng thái xác nhận. Lưu riêng lần xuất hiện, lần học, lần thay thế, lần thu thập và lần sử dụng.
- Hồn lực chương 4: nguồn có 4/5 ở đầu chương, 1/5 ngay trước đoạn thăng cấp. Cuối chương có thể trình bày “Ghi nhận gần nhất 1/5” và mở ghi chú thời điểm. Không gọi đó là số dư chính xác sau mọi biến đổi; không tự sửa số theo phép cộng trừ suy đoán.
- Cảnh giới cuối chương 4 là Luyện Khí tầng 2; EXP sau thăng cấp được nêu là 0/10. Nếu dựng cảnh giám định đầu chương, cảnh giới lúc ấy là tầng 1. Các trạng thái phải tách nhau.
- Sau lựa chọn ở chương 14, EXP không còn là cơ chế nâng cấp đang dùng. Giữ số liệu cũ trong lịch sử nếu cần đối chiếu.
- Hồn lực 640/20 ở chương 99 và 530/20 ở chương 100 được giữ nguyên dạng ghi nhận; không ép thành tỷ lệ hoặc giới hạn số đầu bằng số sau.
- Giới hạn dữ liệu hiện tại đến chương 100; đọc xa hơn vẫn giữ đúng chương thực tế và có ghi chú phạm vi trong phần nguồn.

## 7 Chuyển động và tương tác

Thời lượng dưới đây là đề xuất, không phải thông số nguyên tác.

| Tương tác | Biểu hiện |
| --- | --- |
| Mở modal | Màn sáng hiện rõ trong 180–240 ms; không chớp trắng |
| Chọn nút chức năng | Vòng đang chọn sáng hơn, nội dung thay trong 120–180 ms |
| Chữ hệ thống | Hiện theo cụm hoặc dòng; nội dung đầy đủ vẫn sẵn cho trình đọc màn hình. Có thể bỏ qua hiệu ứng |
| Nút chưa mở | Sương ở viền rất nhẹ, tự dừng sau đoạn mở; không chạy vòng vô hạn gây phân tâm |
| Nhiệm vụ nguy hiểm | Một vệt sáng, sau đó giữ chữ đỏ ổn định |
| Đủ năm vật liệu | Năm điểm sáng nối thành một vòng; cảnh xem lại 600–900 ms |
| Chọn Tru Tà trong cảnh xem lại | Hai rắn bạc biến thành chữ, vòng thu về hàng nút trong 500–700 ms |

Âm thanh không tự phát. Nếu bổ sung, mặc định tắt và chỉ bật do thao tác rõ ràng của người đọc. Với giảm chuyển động, bỏ sương, vệt chạy và biến hình; hiển thị trạng thái cuối ngay, không mất thông tin.

Giữ focus trong modal; đóng bằng ×, Escape hoặc nền ngoài, trả focus về icon mở. Nền dưới không nhận click hay phím tắt. Tooltip không chứa thông tin thiết yếu duy nhất; bàn phím và cảm ứng đều mở được mọi mô tả. Phần “Đối chiếu truyện” ghi nguồn đúng của mục đang xem và mở chương ở tab riêng nếu người đọc chọn liên kết.

## 8 Asset cần chuẩn bị cho concept

Danh sách vật dụng hiện có nằm trong [file ảnh vật dụng](danh-sach-anh-vat-dung.md). Các asset bên dưới là bộ bổ sung cho concept này; chúng thay hướng icon khiên/kiếm lục giác được đề xuất trước đó.

| Asset | Yêu cầu |
| --- | --- |
| Vòng Kỹ nghệ | Vầng sáng tròn xanh lam, lõi nhẹ; ưu tiên vector và hiệu ứng để thu phóng sắc nét |
| Nút chưa mở | Lõi tối có chiều sâu và sương mỏng; tách lớp để có bản tĩnh giảm chuyển động |
| Đồng hồ cát | Có các biến thể trạng thái được nguồn xác nhận; không dùng lượng cát để ám chỉ một thời gian chính xác chưa biết |
| Năm đồ án vòng quay | Năm hình phân biệt theo bảng ở mục 5D; đọc được ở kích thước nhỏ |
| Bàn quay | Nền tròn, năm hốc, lớp hoa văn, lớp ánh sáng tách riêng |
| Bốn lựa chọn Thần thông | Đồng hồ, nắm đấm, avatar nữ, hai rắn bạc; không dựng hai rắn thành hai tia sét đơn thuần |
| Tru Tà | Bản hai rắn bạc, bản chuyển thành tên và bản biểu tượng nhỏ trong vòng |
| Vật thể giám định | Trước tiên Quân cung, loan đao hỏng và giáo rỉ; thêm vật khác theo bằng chứng truyện |

Ảnh vật thể nền trong suốt, không chữ in sẵn; phần chữ Tru Tà ưu tiên lớp chữ riêng để đọc tốt và dễ hiệu chỉnh. Có thể dựng concept đầu tiên bằng hình khối tạm, nhưng giữ đúng vòng sáng, hàng nút và năm hốc.

## 9 Bộ màn concept cần dựng và tiêu chí nghiệm thu

1. **Chương 4:** Kỹ nghệ sáng ở đáy, các phần chưa mở tối; Quân cung trong sân khấu, bốn kỹ nghệ được nhận diện, hai đã học; đồng hồ cát và chỉ số có ghi chú thời điểm.
2. **Chương 34:** nhiệm vụ chữ đỏ ở giữa; không thêm một nút chức năng Định Mệnh không có bằng chứng.
3. **Chương 81:** bàn quay năm hốc thay nội dung thường; năm đồ án hiện đúng, chưa hé lộ vật liệu thu được ở chương sau.
4. **Chương 95:** đủ năm điểm sáng, vòng quay sẵn sàng; không hiện bốn lựa chọn sớm.
5. **Chương 97:** bốn vị trí lựa chọn; chỉ tiết lộ tên và hình đã có tại chương này.
6. **Chương 98:** xem lại bốn lựa chọn và chuyển cảnh Tru Tà về hàng nút; trạng thái cuối có hai nút sáng.
7. **Mobile 390 px và 320 px:** cảnh Kỹ nghệ và bàn quay đều đọc được, không tràn ngang; nút đóng và hàng chức năng dễ dùng.

Concept đạt khi có thể nhận ra màn sáng, chữ hệ thống, vầng tròn Kỹ nghệ và hàng nút tối ngay cả khi chưa đọc nhãn. Vòng quay cần có hình thức và chuyển cảnh riêng. Dữ liệu phải phân biệt trạng thái cuối chương với cảnh xem lại, không tạo thêm luật chơi, và các tương tác phải giữ nguyên tiến độ đọc.

## 10 Phạm vi thay thế đặc tả cũ

Spec này đề xuất thay thế phần trình bày của modal hệ thống: menu dọc, các thẻ thông tin, cách thể hiện nhiệm vụ và vòng quay. Nó không thay thế đặc tả trang hồ sơ nhân vật hoặc sidebar wiki. Bảng màu xanh lam áp dụng riêng cho hệ thống; khung wiki và hồ sơ vẫn theo bảng màu hiện hành.

Các nội dung cần đối chiếu tiếp trước khi triển khai dữ liệu chi tiết: thời điểm khảm từng món trong bốn vật liệu đầu, những thay đổi hồn lực nằm giữa các mốc đã xác nhận, và các chức năng ngoài phạm vi chương 100. Concept không tự điền các chỗ này bằng suy đoán.
