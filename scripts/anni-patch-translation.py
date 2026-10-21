from pathlib import Path
from html.parser import HTMLParser
import re,json,html
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'docs/anni/10_21(Wed) Update Notice - Chaos Zero Nightmare (CZN).html'
class Text(HTMLParser):
 def __init__(self):super().__init__();self.out=[]
 def handle_data(self,d):self.out.append(d)
 def handle_starttag(self,t,a):
  if t=='br':self.out.append('\n')
def clean(s):
 p=Text();p.feed(s);return re.sub(r'[ \t\r\f\v\u00a0]+',' ',''.join(p.out)).strip()
def extract():
 s=SOURCE.read_text(encoding='utf-8').split('<div class="entry-content is-layout-flow">',1)[1].split('Read the full article on the official site',1)[0]
 blocks=[]
 for m in re.finditer(r'<table\b.*?</table>|<p\b[^>]*>.*?</p>|<img\b[^>]*>',s,re.S):
  v=m.group()
  if 'news-source-top' in v:continue
  if v.startswith('<table'):
   rows=[];spans={}
   for tr in re.findall(r'<tr\b[^>]*>(.*?)</tr>',v,re.S):
    row=[];c=0
    for cell in re.finditer(r'<t[dh]\b([^>]*)>(.*?)</t[dh]>',tr,re.S):
     while c in spans:
      txt,n=spans[c];row.append(txt);spans[c]=(txt,n-1) if n>1 else ('',0)
      if n<=1:del spans[c]
      c+=1
     attrs,body=cell.groups();txt=clean(body)
     rs=re.search(r'rowspan=["\']?(\d+)',attrs);cs=re.search(r'colspan=["\']?(\d+)',attrs)
     rs=int(rs[1]) if rs else 1;cs=int(cs[1]) if cs else 1
     for _ in range(cs):
      row.append(txt)
      if rs>1:spans[c]=(txt,rs-1)
      c+=1
    while c in spans:
     txt,n=spans[c];row.append(txt)
     if n>1:spans[c]=(txt,n-1)
     else:del spans[c]
     c+=1
    if row:rows.append(row)
   blocks.append({'type':'table','rows':rows,'images':re.findall(r'<img\b[^>]*src="([^"]+)"',v)})
  else:
   imgs=re.findall(r'<img\b[^>]*src="([^"]+)"',v)
   for src in imgs:blocks.append({'type':'image','src':src})
   txt=clean(v)
   if txt:blocks.append({'type':'paragraph','text':txt})
 return blocks
TRANSLATIONS = r"""
0|Xóa tan mọi tuyệt vọng!
1|
2|Xin chào, chúng tôi là đội ngũ Chaos Zero Nightmare.
3|
4|
5|Dưới đây là thông tin chi tiết về bản cập nhật ngày 10/21 (Thứ Tư).
6|Bản cập nhật sẽ có trong trò chơi sau khi bảo trì hoàn tất.
7|Vui lòng xem chi tiết bên dưới.
8|■ Thảm Họa Thiên Hà Mùa 5: [Lời Hứa Trên Tuyết (A Promise Upon the Snow)] bắt đầu Chương 1
9|◆ Cốt truyện mới
10|Bổ sung Chương 1 của Thảm Họa Thiên Hà Mùa 5: [Quyết Tâm Vượt Qua Số Phận (Resolution Beyond Fate)].
11|Thời gian mở: sau bảo trì ngày 10/21/2026
12|Điều kiện mở khóa: hoàn thành Mùa 5, Chương 0, Tập 7 “Kẻ Phiêu Bạt (Drifters)”
13|◆ Chaos mới
14|Tham gia Chaos mới [Thành Lũy Thiên Giới (Celestial Bulwark)] để nhận Dữ Liệu Lưu Mùa.
15|Điều kiện mở khóa
16|Đạt Cấp Đội Trưởng 35
17|Chi tiết tiến trình
18|Khi hoàn thành Chaos, bạn có thể nhận phần thưởng dựa trên Điểm Tiến Trình Hằng Tuần.
19|Bạn có thể nhận phần thưởng từ [Nhiệm Vụ Thử Thách] dựa trên Điểm Tiến Trình Hằng Tuần đã đạt.
20|Tiến trình đặt lại mỗi tuần; bạn có thể tiếp tục nhận phần thưởng tiến trình cho đến khi mùa Thảm Họa Thiên Hà kết thúc.
21|[Celestial Bulwark] sẽ được tích hợp vào [Hệ Thống Zero] sau khi mùa Thảm Họa Thiên Hà kết thúc.
22|Cấp Thám Hiểm đạt được trong [Celestial Bulwark] ở mùa Thảm Họa Thiên Hà vẫn được giữ lại sau khi mùa kết thúc.
23|◆ Biến Dạng Tinh Vân (Nebula Distortion)
24|Những Biến Dạng Thuộc Tính dữ dội xuất hiện ở các khu vực chịu thảm họa khiến trận chiến với quái vật mạnh trong Chaos càng khó khăn. Khi nhiều biến dạng chồng lên nhau, hãy vượt qua các hiệu ứng biến dạng ngày càng nguy hiểm và đánh bại quái vật mạnh.
25|* Chỉ có thể khiêu chiến Biến Dạng Tinh Vân bằng Dữ Liệu Lưu Cơ Bản hoặc Dữ Liệu Lưu Mùa [A Promise Upon the Snow].
26|Điều kiện mở khóa
27|Hoàn thành Chaos mới [Celestial Bulwark]
28|Thời gian mở
29|Viadeus: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/23/2026
30|Seraphion: 10/28/2026 02:00 (UTC) – trước bảo trì ngày 12/23/2026
31|Enforcer Seraphion: 11/04/2026 02:00 (UTC) – trước bảo trì ngày 12/23/2026
32|◆ Các hạn chế của mùa [A Promise Upon the Snow]
33|Thẻ: Hành Động Chiến Thuật (Tactical Action), Khí Axit (Acid Gas)
34|Trang bị: Nước Thánh Màu Chì (Lead-Colored Holy Water)
35|Vận Mệnh: Tán Tỉnh (Courtship)
36|* Vật phẩm bị hạn chế sẽ không xuất hiện trong Chaos [Celestial Bulwark] hoặc các chế độ Chaos áp dụng tùy chọn [A Promise Upon the Snow].
37|* Không thể sử dụng vật phẩm bị hạn chế trong Đại Khe Nứt (The Great Rift).
38|* Nếu vào chiến đấu tại Đại Khe Nứt bằng Dữ Liệu Lưu chứa thẻ hoặc trang bị bị hạn chế theo mùa, các vật phẩm đó sẽ bị loại bỏ trước khi trận chiến bắt đầu.
39|◆ Cửa Hàng Tiếp Tế
40|Bạn có thể nhận phần thưởng tại Cửa Hàng Tiếp Tế bằng [Di Vật Của Nền Văn Minh Băng Giá (Relics of a Frozen Civilization)], loại tiền nhận được trong Chaos [Celestial Bulwark].
41|Cửa Hàng Tiếp Tế đợt 1
42|Thời gian
43|Sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/23/2026
44|Phần thưởng
114|* Các vật phẩm Lõi Chỉnh Sửa Dữ Liệu Lưu (Có Thời Hạn) chỉ dùng được trong thời gian sự kiện [Thảm Họa Thiên Hà Mùa 5: A Promise Upon the Snow].
115|■ Giới thiệu [Biến Số Môi Trường (Environment Variables)] của Thảm Họa Thiên Hà Mùa 5
116|Mùa Thảm Họa Thiên Hà mới giới thiệu hệ thống [Biến Số Môi Trường]. Trải nghiệm chiến thuật và quá trình phát triển sâu hơn thông qua các yếu tố nâng cấp dành riêng cho mùa.
117|◆ Thời gian mở
118|Sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/23/2026
119|* Từ mùa này, các khu vực nút chưa mở khóa sẽ hiển thị trước ở trạng thái khóa, giúp bạn xem trước hình dạng của Biến Số Môi Trường khi được mở rộng sau này.
120|* Theo tiến trình mùa, các nút sẽ mở rộng ra vùng ngoài của Biến Số Môi Trường và cung cấp thêm hiệu ứng.
121|Mở lần đầu: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/23/2026
122|Mở rộng đợt 1: sau bảo trì ngày 11/11/2026 – trước bảo trì ngày 12/23/2026
123|Mở rộng đợt 2: sau bảo trì ngày 12/02/2026 – trước bảo trì ngày 12/23/2026
124|◆ Tổng quan
125|Có thể truy cập qua nút [Biến Số Môi Trường] trên trang mùa Thảm Họa Thiên Hà, hoặc biểu tượng [Biến Số Môi Trường] trong Hệ Thống Zero – Codex.
126|Nâng cấp nền tảng của mùa: cây kỹ năng dành riêng cho mùa, tăng cường cơ chế cốt lõi của mùa hoặc giúp thám hiểm thuận tiện hơn.
127|Phạm vi áp dụng: các hiệu ứng đã kích hoạt áp dụng cho [Codex] và [Thảm Họa Thiên Hà: Chaos] trong thời gian mùa.
128|Cách phát triển: bắt đầu từ nút bên trong và lần lượt kích hoạt các nút kết nối. Dữ liệu Biến Số Môi Trường của mùa sẽ đặt lại khi mùa kết thúc.
129|◆ Tổng quan các nút Biến Số Môi Trường chính
132|Khôi Phục Ký Ức Gốc (Restore Original Memory)
133|Thêm Sự Kiện Tương Tác [Ảo Ảnh Tinh Xảo (Elaborate Illusion)] tại Khu Vực Chưa Xác Định [Điểm Cuối Ký Ức (End of Memories)] trong Chaos áp dụng tùy chọn [A Promise Upon the Snow].\n(Khi tương tác, nhận phần thưởng áp dụng Thần Khải Diallos cho 1 thẻ được chọn.)
134|Khắc Tọa Độ Mất Mát (Loss Coordinate Engraving)
135|Tìm lại [Ký Ức Khắc Sâu (Etched Memory)] thêm +1 lần tại [Khải Thị Định Sẵn (Planned Revelation)] ở khu vực bên trong Chaos áp dụng tùy chọn [A Promise Upon the Snow].
136|Hiệu Chỉnh Độ Chính Xác Tinh Luyện (Refinement Precision Correction)
137|Tăng tỷ lệ thành công khi dùng [Tinh Luyện Ký Ức (Memory Refinement)] trong Chaos áp dụng tùy chọn [A Promise Upon the Snow].
138|Bù Chi Phí Gia Công (Processing Cost Offset)
139|Trong Chaos áp dụng tùy chọn [A Promise Upon the Snow], thực hiện [Gia Công Ký Ức (Memory Processing)] mà không tiêu hao [Mảnh Ký Ức (Shards of Memory)].
140|Kết Tinh Mảnh Ký Ức (Shard of Memory Crystallization)
141|Nhận hiệu ứng có lợi khi bắt đầu trận chiến trong Chaos áp dụng tùy chọn [A Promise Upon the Snow].
142|Hiệu Chỉnh Pha Ngẫu Nhiên (Random Phase Correction)
143|Nhận thêm giá trị đổ xúc xắc trong Chaos [Celestial Bulwark].
144|Tăng Tốc Cộng Hưởng Ký Ức (Memory Resonance Acceleration)
145|Tăng lượng Di Vật Của Nền Văn Minh Băng Giá nhận được.
146|◆ Thông báo đặt lại tiền tệ
147|Kích hoạt các nút [Biến Số Môi Trường] của mùa mới cần “Ký Ức Ánh Sáng (Memory of Light)” nhận được trong Thảm Họa Thiên Hà Mùa 5.
148|Có thể nhận [Ký Ức Ánh Sáng] làm phần thưởng kết quả khi hoàn thành [Codex] và [Thảm Họa Thiên Hà: Chaos].
149|[Ký Ức Ánh Sáng] nhận từ các mùa trước sẽ bị đặt lại.
150|■ Thẻ Ký Ức của Thảm Họa Thiên Hà Mùa 5
151|◆ Tăng chỉ số và tỷ lệ thành công
152|Tăng Tấn Công và Lượng Sát Thương của Thẻ Ký Ức phẩm chất Huyền Thoại trở xuống.
153|◆ Tấn Công
154|Thường: 6% -> 7%
155|Hiếm: 7% -> 8%
156|Huyền Thoại: 8% -> 9%
157|◆ Lượng Sát Thương
158|Thường: 8% -> 9%
159|Hiếm: 10% -> 11%
160|Tăng tỷ lệ thành công của [Tinh Luyện Ký Ức] từ Hiếm → Huyền Thoại.
161|Hiếm → Huyền Thoại: 15% -> 20%
162|◆ Thẻ Ký Ức mới
163|Bổ sung thẻ mới [Ký Ức: Mất Mát (Memory: Loss)] vào Sức Mạnh Mùa [Ký Ức Khắc Sâu (Etched Memory)].
164|Thẻ sẽ nằm trong các lựa chọn [Ký Ức Khắc Sâu] được đưa ra tại [Khải Thị Định Sẵn (Planned Revelation)].
169|[Ký Ức: Mất Mát (Memory: Loss)]
170|[Ký Ức/Mở Màn]\nKhi thẻ Kỹ Năng của đồng minh được cộng dồn, +7% Tấn Công cho nhân vật này (1 lần mỗi lượt, 2 lần mỗi trận).\nTăng 25% Lượng Sát Thương của thẻ Tấn Công thuộc tính Công Lý của nhân vật này.
173|■ Tăng tỷ lệ Cứu Viện Chiến Binh theo mùa mới [Rossweisse]
174|Thời gian tăng tỷ lệ: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/02/2026
175|Chiến Binh theo mùa mới [Rossweisse] sẽ không được thêm vào danh sách Cứu Viện Chiến Binh Thường sau khi đợt tăng tỷ lệ kết thúc.
176|* Chiến Binh theo mùa này có thể được mở bán lại trong tương lai.
177|Tỷ lệ giống với các đợt tăng tỷ lệ Cứu Viện hiện có.
178|Điểm tích lũy Cứu Viện được xử lý như sau.
179|Điểm tích lũy từ các đợt Cứu Viện tăng tỷ lệ trước được chuyển sang đợt tăng tỷ lệ theo mùa này.
180|Tất cả sự kiện thuộc nhóm [Sự Kiện Tăng Tỷ Lệ Chiến Binh] cùng chia sẻ và cộng dồn một bộ đếm bảo đảm ★5.
181|Điểm tích lũy trong đợt tăng tỷ lệ theo mùa này sẽ chuyển sang đợt Cứu Viện tăng tỷ lệ kế tiếp.
182|Mã Ký Ức bán trong Kho Ký Ức Chiến Binh chỉ có trong thời gian tăng tỷ lệ Chiến Binh theo mùa và có thể mua tối đa 2 lần mỗi tài khoản.
183|Có thể sử dụng Mã Omega đang sở hữu cho Chiến Binh theo mùa.
184|Bổ sung Mô-đun Lăng Kính cho Chiến Binh mới [Rossweisse].
185|Chiến Binh theo mùa tăng tỷ lệ trước đó [Sereniel] sẽ không được thêm vào danh sách Cứu Viện Chiến Binh Thường.
186|Bổ sung Câu Chuyện Tin Nhắn [Rossweisse] vào Unigram.
187|Câu Chuyện Tin Nhắn mở khóa ở cấp Thân Thiện 3, 13 và 15 của [Rossweisse].
194|Cấp 1\nTiềm Năng bậc 0\nHiện Thực Hóa Bản Ngã bậc 0\nThân Thiện cấp 1
200|Cấp 60\nTiềm Năng bậc 7\nHiện Thực Hóa Bản Ngã bậc 6\nThân Thiện cấp 40
225|[Equilux/Độc Nhất]\n400% Sát Thương\nKhi phân cực, tách thành Shard:Light và Shard:Dark.
229|[Ánh Sáng/Độc Nhất/Giữ Lại]\n80% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi kích hoạt 1 thẻ của nhân vật này, kích hoạt hiệu ứng (2 lần mỗi lượt).
233|[Bóng Tối/Độc Nhất/Giữ Lại]\n80% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi kích hoạt 2 thẻ của các Chiến Binh khác, kích hoạt hiệu ứng (2 lần mỗi lượt).
238|Tạo 3 Sword Tassel.
242|200% Sát Thương\nLoại tối đa 1 thẻ trên tay; nếu đã loại, gây 150% Sát Thương.
246|200% Sát Thương\n4 Dấu Ấn Luân Hồi (Brand of the Cycle)
250|[Độc Nhất/Khởi Đầu] Rút 2\n1 Khiên Kyrken (Kyrken's Aegis)
255|[Liên Kết (1/20)/Giữ Lại]\nKhi hợp nhất thành thẻ Equilux, với mỗi cộng dồn, +80% Lượng Sát Thương cơ bản cho thẻ Equilux trong 1 lượt.
260|Đầu lượt, đưa thẻ này lên tay.\nKhi lên tay, phân cực thành thẻ Ánh Sáng và Bóng Tối (1 lần mỗi lượt).\nSố Đòn Đánh của thẻ này cố định là 1.
264|Đầu lượt, đưa thẻ này lên tay và đặt ở vị trí ngoài cùng bên trái.\nNếu trên tay chỉ còn thẻ Ánh Sáng, Bóng Tối và Liên Kết, hợp nhất thẻ Ánh Sáng, Bóng Tối và Sword Tassel thành thẻ Equilux.
268|Đầu lượt, đưa thẻ này lên tay và đặt ở vị trí ngoài cùng bên phải.\nNếu trên tay chỉ còn thẻ Ánh Sáng, Bóng Tối và Liên Kết, hợp nhất thẻ Ánh Sáng, Bóng Tối và Sword Tassel thành thẻ Equilux.
272|Tăng 20% Lượng Sát Thương nhận từ Rossweisse; khi kích hoạt, giảm Dấu Ấn Luân Hồi đi 1.
276|Tăng 20% Lượng Sát Thương của thẻ Tấn Công và tăng 15% Lượng Sát Thương cuối cùng của Flicker Blade.
281|1,200% Sát Thương\nKhi thẻ Equilux tiếp theo được kích hoạt, gây Sát Thương Cố Định bằng 30% Sát Thương đã gây lên mục tiêu.
286|Thêm hiệu ứng sau cho thẻ Kyrken's Apostle: nhận 1 AP. Thay đổi hiệu ứng của Khiên Kyrken như sau: tăng 30% Lượng Sát Thương của thẻ Tấn Công và tăng 20% Lượng Sát Thương cuối cùng của Flicker Blade.
290|Đầu trận, tăng 20% Lượng Sát Thương cuối cùng của Rossweisse.\nĐầu lượt, nhận 4 Tàn Ảnh Kiếm (Blade Afterimage).\nTàn Ảnh Kiếm: khi kích hoạt thẻ Ánh Sáng hoặc Bóng Tối của Rossweisse, gây 120% Sát Thương lên một kẻ địch ngẫu nhiên, tạo 1 Sword Tassel, rồi giảm Tàn Ảnh Kiếm đi 1 (tối đa 8 cộng dồn).
294|+400% Lượng Sát Thương cho Flickering White Night; thay đổi Sát Thương Cố Định gây lên mục tiêu khi thẻ Equilux tiếp theo được kích hoạt, từ bằng 30% Sát Thương nhận vào thành bằng 60% Sát Thương nhận vào.
298|Đầu trận, nhận 1 Danh Xưng Trân Quý (Precious Name).\nMỗi lần hiệu ứng thẻ Ánh Sáng hoặc Bóng Tối của Rossweisse kích hoạt, nhận 1 Danh Xưng Trân Quý.\nDanh Xưng Trân Quý: tăng 8% Lượng Sát Thương của Rossweisse (tối đa 5 cộng dồn).\n“Sig, Siegrune, Gerhilde, Fricka... và bạn.”
302|Tăng 3 cấp cho [Nâng Cấp Thẻ Cơ Bản], [Nâng Cấp Thẻ Đặc Trưng] và [Nâng Cấp Thẻ Phổ Thông] trong Tiềm Năng.
306|Khi Flicker Blade của Rossweisse lên tay, nhận 1 Lưỡi Kiếm Chống Luân Hồi (Blade Poised Against the Cycle); thẻ Equilux, Ánh Sáng và Bóng Tối không còn được tính vào giới hạn số thẻ trên tay.\nLưỡi Kiếm Chống Luân Hồi: tăng 15% Lượng Sát Thương cuối cùng của thẻ Tấn Công của Rossweisse; nếu là Flicker Blade, tăng 25% (tối đa 2 cộng dồn).
309|◆ Hiệu ứng Hiển Ngộ của từng thẻ
314|[Equilux/Độc Nhất]\n600% Sát Thương\nKhi phân cực, tách thành Shard:Light (Amped) và Shard:Dark (Amped).
317|[Equilux/Độc Nhất] 600% Sát Thương\nKhi phân cực, tách thành Shard:Light (Cycle) và Shard:Dark (Cycle).
320|[Equilux/Độc Nhất]\n400% Sát Thương\nKhiên bằng 20% Sát Thương.\nKhi phân cực, tách thành Shard:Light (Aegis) và Shard:Dark (Aegis).
323|[Equilux/Độc Nhất]\n600% Sát Thương\nKhi phân cực, tách thành Shard:Light (Blink) và Shard:Dark (Blink).
326|[Equilux/Độc Nhất/Kết Thúc]\n400% Sát Thương\n+120% Lượng Sát Thương cơ bản cho mỗi X.\nKhi phân cực, tách thành Shard:Light (Unbound) và Shard:Dark (Unbound).
329|[Ánh Sáng/Độc Nhất/Giữ Lại]\n120% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi kích hoạt 1 thẻ của nhân vật này, kích hoạt hiệu ứng (2 lần mỗi lượt).
332|[Bóng Tối/Độc Nhất/Giữ Lại] 120% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi kích hoạt 2 thẻ của các Chiến Binh khác, kích hoạt hiệu ứng (2 lần mỗi lượt).
335|[Ánh Sáng/Độc Nhất/Giữ Lại] 120% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi một thẻ bị Loại qua kỹ năng, kích hoạt hiệu ứng (2 lần mỗi lượt).
338|[Bóng Tối/Độc Nhất/Giữ Lại] 120% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi Rút thẻ qua kỹ năng, kích hoạt hiệu ứng (2 lần mỗi lượt).
341|[Ánh Sáng/Độc Nhất/Giữ Lại] 240% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi bị tấn công, kích hoạt hiệu ứng (1 lần mỗi lượt).
344|[Bóng Tối/Độc Nhất/Giữ Lại] 240% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi nhận Khiên qua kỹ năng, kích hoạt hiệu ứng (1 lần mỗi lượt).
347|[Ánh Sáng/Độc Nhất/Giữ Lại/Thu Hồi] 240% Sát Thương\nTạo 1 Sword Tassel.\nLoại 1 thẻ Trạng Thái Bất Lợi hoặc Nguyền Rủa ngẫu nhiên trên tay.
350|[Bóng Tối/Độc Nhất/Giữ Lại/Thu Hồi] 240% Sát Thương\nTạo 1 Sword Tassel.\nLoại 1 thẻ trên tay của một Chiến Binh khác ngẫu nhiên.
353|[Ánh Sáng/Độc Nhất/Giữ Lại] 120% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi nhận AP qua kỹ năng, kích hoạt hiệu ứng (2 lần mỗi lượt).
356|[Bóng Tối/Độc Nhất/Giữ Lại] 120% Sát Thương lên một kẻ địch ngẫu nhiên.\nTạo 1 Sword Tassel.\nKhi kích hoạt thẻ tốn 1 Chi Phí trở lên, kích hoạt hiệu ứng (2 lần mỗi lượt).
359|Tạo 3 Sword Tassel.\nKích hoạt hiệu ứng cho 1 thẻ Ánh Sáng hoặc Bóng Tối ngẫu nhiên.
361|Tạo 3 Sword Tassel.\nRút 1 thẻ của nhân vật này.
363|[Độc Nhất] Áp dụng Thu Hồi cho tất cả thẻ Ánh Sáng và Bóng Tối trên tay.
365|Tạo 3 Sword Tassel.\nKhi thẻ Equilux tiếp theo được hợp nhất, áp dụng Nghiền Nát cho thẻ đó.
367|[Độc Nhất] Kích hoạt hiệu ứng cho tất cả thẻ Ánh Sáng và Bóng Tối trên tay.
370|300% Sát Thương\nLoại tối đa 2 thẻ trên tay, sau đó gây số thẻ đã Loại x 200% Sát Thương.
372|200% Sát Thương\nLoại 1; nếu thẻ đó là thẻ Ánh Sáng hoặc Bóng Tối, kích hoạt rồi đưa lên tay.
374|300% Sát Thương\nLoại tối đa 1 thẻ trên tay.\nGiảm 2 Chi Phí cho 2 thẻ Ánh Sáng hoặc Bóng Tối tiếp theo cho đến khi được kích hoạt.
376|[Độc Nhất] 300% Sát Thương\nKhi thẻ Liên Kết được cộng dồn trong lượt này, +50% Lượng Sát Thương cơ bản (tối đa 500%).
378|[Độc Nhất]\nTrong 1 lượt, tăng 15% Lượng Sát Thương của nhân vật này cho mỗi thẻ Công Lý trên tay (tối đa 75%).
381|300% Sát Thương\n6 Dấu Ấn Luân Hồi
383|300% Sát Thương\n2 Dấu Ấn Luân Hồi\nThuần Khiết: tạo 2 Sword Tassel.\n* Thuần Khiết: kích hoạt hiệu ứng này khi trên tay không có thẻ thuộc tính khác.
385|200% Sát Thương\n4 Dấu Ấn Luân Hồi\nRút 1 thẻ của nhân vật này, rồi giảm 1 Chi Phí cho thẻ đó trong 1 lượt.
387|300% Sát Thương\n1 Dấu Ấn Luân Hồi cho mỗi thẻ Công Lý trên tay.\nThuần Khiết: giảm 1 Chi Phí.\n* Thuần Khiết: kích hoạt hiệu ứng này khi trên tay không có thẻ thuộc tính khác.
389|[Nghiền Nát] 500% Sát Thương\n4 Dấu Ấn Luân Hồi\nKhi thẻ này Phá Khiên, kích hoạt thêm 1 lần (1 lần mỗi lượt).
391|■ Tăng tỷ lệ Cứu Viện Cộng Sự theo mùa mới [Sig]
392|◆ Thời gian tăng tỷ lệ: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/02/2026
393|Cộng Sự theo mùa mới [Sig] sẽ không được thêm vào danh sách Cứu Viện Cộng Sự Thường sau khi đợt tăng tỷ lệ kết thúc.
394|* Cộng Sự theo mùa này có thể được mở bán lại trong tương lai.
395|Tỷ lệ giống với các đợt tăng tỷ lệ Cứu Viện hiện có.
396|Điểm tích lũy Cứu Viện được xử lý như sau.
397|Điểm tích lũy từ các đợt Cứu Viện tăng tỷ lệ trước được chuyển sang đợt tăng tỷ lệ theo mùa này.
398|Tất cả sự kiện thuộc nhóm [Sự Kiện Tăng Tỷ Lệ Cộng Sự] cùng chia sẻ và cộng dồn một bộ đếm bảo đảm ★5.
399|Điểm tích lũy trong đợt tăng tỷ lệ theo mùa này sẽ chuyển sang đợt Cứu Viện tăng tỷ lệ kế tiếp.
400|Sản phẩm Cộng Sự bán tại Kho Ký Ức Cộng Sự chỉ có trong thời gian tăng tỷ lệ Cộng Sự theo mùa.
401|1 mỗi tài khoản.
402|Cộng Sự theo mùa tăng tỷ lệ trước đó [Peko] sẽ không được thêm vào danh sách Cứu Viện Cộng Sự Thường.
420|Tăng 16-24% Tấn Công của Chiến Binh được bố trí.
421|Khi thẻ Công Lý của Chiến Binh được bố trí phân cực, +10-20% Tỷ Lệ Chí Mạng (không cộng dồn).
422|Khi thẻ Liên Kết của Chiến Binh được bố trí cộng dồn, nhận 1 [Ký Ức Tiền Kiếp (Memory of Past Life)].\n[Ký Ức Tiền Kiếp]: +15-30% Sát Thương Chí Mạng cho Chiến Binh được bố trí, +15-30% Sát Thương Chí Mạng cho thẻ Tấn Công Độc Nhất (không cộng dồn).
425|Tại Khu An Toàn, có thể áp dụng Hiển Ngộ hỗ trợ cho thẻ Thần Thoại của Chiến Binh được bố trí.\nKhi thẻ của Chiến Binh được bố trí Hợp Nhất, áp dụng 1 Dễ Tổn Thương lên kẻ địch có HP cao nhất (không cộng dồn).
427|Tăng 8~16% cơ hội xuất hiện Quái Vật Xâm Lược.
429|Tăng 6~12% cơ hội nhận thẻ Quái Vật.
432|2 Mảnh Thống Trị (Dominion Shard)\nTăng 50% Lượng Sát Thương của thẻ Tấn Công Công Lý của Chiến Binh được bố trí trong 2 lượt.\nEP: 3
435|Khi thẻ Liên Kết của Chiến Binh được bố trí cộng dồn, nhận 1 AP; khi kích hoạt, giảm Mảnh Thống Trị đi 1 (1 lần mỗi lượt).
436|■ Tăng tỷ lệ Cứu Viện Thường cho Chiến Binh [Tiphera] và Cộng Sự [Tiana]
437|Tổ chức sự kiện Tăng Tỷ Lệ Cứu Viện Thường để gặp Chiến Binh [Tiphera] và Cộng Sự [Tiana].
438|◆ Thời gian tăng tỷ lệ: 11/03/2026 18:00 (UTC) – 11/24/2026 18:00 (UTC)
439|Đợt Tăng Tỷ Lệ Cứu Viện Thường Tiphera và Tiana không chia sẻ bộ đếm bảo đảm với đợt Tăng Tỷ Lệ Cứu Viện Theo Mùa Rossweisse và Sig.
440|Các đợt “Tăng Tỷ Lệ Chiến Binh Thường” chia sẻ bộ đếm bảo đảm.
441|Các đợt “Tăng Tỷ Lệ Cộng Sự Thường” chia sẻ bộ đếm bảo đảm.
442|Có thể sử dụng Neo Khuếch Đại Tín Hiệu để thực hiện Cứu Viện Thường tăng tỷ lệ.
443|■ Nội dung – mở [Lòng Chảo Siêu Không Gian (Basin of Hyperspace)] mới
444|Mở [Lòng Chảo Siêu Không Gian: Hoàng Hôn Chiều Không Gian (Basin of Hyperspace: Dimensional Twilight)].
445|◆ Thời gian
446|Sau bảo trì ngày 10/21/2026 - trước bảo trì ngày 11/11/2026
447|Các trận chiến diễn ra từ Lòng Chảo thứ 1 đến Lòng Chảo thứ 8.
448|◆ Hiệu ứng hỗ trợ
452|+30% Lượng Sát Thương cho thẻ Công Lý.\nKhi Liên Kết 3 lần, +50% Lượng Sát Thương cho thẻ Tấn Công trong 2 lượt.
454|+30% Lượng Sát Thương cho thẻ Bản Năng.\nKhi sử dụng thẻ đã thay đổi Chi Phí 2 lần, +50% Lượng Sát Thương cho thẻ Tấn Công Dẫn Đầu (Lead) và Tiêu Hao (Exhaust) trong 2 lượt.
456|+15% Lượng Sát Thương cho thẻ Tấn Công.\nKhi Loại 3 thẻ, +50% Lượng Sát Thương cho thẻ Tấn Công Tịch Diệt (Quietus) và Liên Kết (Linked) trong 2 lượt.
457|■ Hệ thống – bổ sung [Ngoại Hình Thẻ (Card Skin)]
458|Bổ sung hệ thống mới [Ngoại Hình Thẻ], cho phép đổi hình minh họa trên thẻ Chiến Binh sang thiết kế bạn yêu thích.
459|Nhận Ngoại Hình Thẻ bằng cách mua [Gói Ngoại Hình Thẻ] ngẫu nhiên trong Cửa Hàng.
460|* Khi trang bị Ngoại Hình Thẻ, ngoại hình cũng áp dụng cho mọi thẻ trong cùng nhóm với thẻ được trang bị.
461|◆ Cách áp dụng
462|Có thể xem và áp dụng ngoại hình qua nút [Tùy Chỉnh Thẻ] tại màn hình [Chiến Binh] > [Chi Tiết] > [Thẻ].
463|Trong [Tùy Chỉnh Thẻ], chọn 1 thẻ của Chiến Binh và áp dụng ngoại hình mong muốn.
464|Khi trang bị Ngoại Hình Thẻ, có thể thay đổi vị trí hiển thị mô tả thẻ trong [Cài Đặt Trò Chơi].
465|◆ Cửa Hàng Gói Ngoại Hình Thẻ
466|Có thể tìm Gói Ngoại Hình Thẻ tại [Cửa Hàng] > [Nhà Hát Lumina (Lumina Theater)].
467|Có thể mua từng Gói Ngoại Hình Thẻ hoặc bộ năm gói. Mỗi gói cho 1 Ngoại Hình Thẻ ngẫu nhiên theo tỷ lệ chỉ định.
468|Nếu nhận Ngoại Hình Thẻ trùng, bạn sẽ được cấp tiền tệ thay thế.
469|◆ Thấu Kính Lumina (Lumina Lens)
470|[Thấu Kính Lumina] là tiền dùng để mua Gói Ngoại Hình Thẻ.
471|Có thể đổi [Thấu Kính Lumina] tại [Cửa Hàng Trao Đổi] > [Pha Lê].
472|Giá: 120 Pha Lê cho mỗi Thấu Kính Lumina
473|Nếu sở hữu [Tàn Dư Khoảnh Khắc Rực Rỡ (Remnant of a Brilliant Moment)] hoặc [Tàn Dư Khoảnh Khắc Tỏa Sáng (Remnant of a Shining Moment)], có thể đổi tiền trùng tại [Cửa Hàng Trao Đổi] > [Tàn Dư Khoảnh Khắc].
474|Nếu sở hữu [Thấu Kính Lăng Kính (Prism Lenses)], có thể đổi tại [Cửa Hàng Trao Đổi] > [Mô-đun Lăng Kính], tối đa 10 lần mỗi tháng.
475|Nếu sở hữu [Khoảnh Khắc Anh Hùng Rực Rỡ (Moment of the Radiant Hero)], có thể đổi tại [Kho Ký Ức Khoảnh Khắc] > [Kho Ký Ức Chiến Binh].
476|◆ Cửa Hàng Trao Đổi Tiền Trùng
477|Dùng Tàn Dư Khoảnh Khắc Rực Rỡ hoặc Tàn Dư Khoảnh Khắc Tỏa Sáng nhận khi Ngoại Hình Thẻ bị trùng để đổi lấy Ngoại Hình Thẻ tự chọn hoặc Thấu Kính Lumina.
478|* Tại Cửa Hàng Trao Đổi Tiền Trùng, có thể đổi mọi Ngoại Hình Thẻ vào bất kỳ lúc nào, bất kể mùa.
479|◆ Các cải tiến khác
480|Thêm [Thấu Kính Lumina] vào cửa hàng Kho Ký Ức Khoảnh Khắc > [Kho Ký Ức Chiến Binh].
481|Giá: 8 Khoảnh Khắc Anh Hùng Rực Rỡ cho mỗi Thấu Kính Lumina
482|Thêm [Thấu Kính Lumina] vào Cửa Hàng Trao Đổi > [Mô-đun Lăng Kính].
483|Giá: 3 Thấu Kính Lăng Kính cho mỗi Thấu Kính Lumina (giới hạn mua: 10 lần/tháng)
484|Đổi tên cửa hàng [Neo] trong Cửa Hàng Trao Đổi thành [Pha Lê].
485|■ Hệ thống – thêm chức năng chỉnh sửa [Chọn Và Áp Dụng Thần Khải]
486|Thêm chức năng cho phép chọn một Thần Khải để áp dụng cho Dữ Liệu Lưu.
487|[Chọn Và Áp Dụng Thần Khải] tiêu hao tiền tệ riêng của từng vị thần.
488|Bổ sung 6 loại tiền tệ riêng dành cho [Chọn Và Áp Dụng Thần Khải].
489|Tại bản cập nhật 10/21, chỉ có thể nhận và sử dụng [Vòng Tay Kyrken (Kyrken's Embrace)]. Tiền tệ riêng khác dành cho [Chọn Và Áp Dụng Thần Khải] sẽ được bổ sung trong các bản cập nhật sau.
496|Chọn và áp dụng Thần Khải Kyrken
497|Cập nhật 10/21
500|Chọn và áp dụng Thần Khải Diallos
501|Dự kiến trong bản cập nhật tương lai
504|Chọn và áp dụng Thần Khải Vytor
505|Dự kiến trong bản cập nhật tương lai
508|Chọn và áp dụng Thần Khải Nihilum
509|Dự kiến trong bản cập nhật tương lai
512|Chọn và áp dụng Thần Khải Sekred
513|Dự kiến trong bản cập nhật tương lai
516|Chọn và áp dụng Thần Khải Caligo
517|Dự kiến trong bản cập nhật tương lai
518|■ Hệ thống – đổi tên [Trang Phục (Outfits)] và thêm [Y Phục Đặc Biệt (Special Attire)]
519|Đổi tên [Outfits] thành [Attire] (Y Phục).
520|Bổ sung [Y Phục] phẩm chất “Đặc Biệt”.
521|Y Phục sẽ được áp dụng trong môi trường chiến đấu.
522|Thay đổi hoạt ảnh chiến đấu SD, hoạt ảnh chọn thẻ Chiến Binh (nhìn từ phía sau), hoạt ảnh Thẻ Đặc Biệt và hoạt ảnh Kỹ Năng Bản Ngã.
523|Thay đổi một số giọng nói chiến đấu và hằng ngày.
524|* Sản phẩm Y Phục Đặc Biệt không áp dụng cho các đoạn phim Cốt Truyện・Suy Sụp Tinh Thần・Trị Liệu Tâm Lý・vào Xuất Kích và một số môi trường khác.
525|■ Hệ thống – thêm [Nội Tại Thám Hiểm (Exploration Passive)] của Cộng Sự
526|Cộng Sự sẽ nhận kỹ năng mới gọi là [Nội Tại Thám Hiểm], hỗ trợ tổ đội hoặc Chiến Binh được bố trí trong Chaos và Xuất Kích.
527|◆ Cách hoạt động
528|Cộng Sự ★4 có 2 Nội Tại Thám Hiểm; Cộng Sự ★5 có 3 Nội Tại Thám Hiểm.
529|Hiệu ứng chỉ áp dụng khi bố trí Cộng Sự cho Chiến Binh thuộc lớp chỉ định và kích hoạt trong Chaos, Xuất Kích.
530|Hiện Thực Hóa Bản Ngã sẽ tăng cấp một số hiệu ứng, nâng cao chỉ số của chúng.
531|Nếu các Cộng Sự được bố trí có cùng hiệu ứng, cấp của chúng sẽ được cộng lại rồi áp dụng. Tuy nhiên, tổng cấp không thể vượt mức tối đa của từng hiệu ứng; hiệu ứng chỉ áp dụng riêng cho Chiến Binh được bố trí sẽ không được cộng lại.
532|◆ Hiệu ứng sở hữu
533|Có thể xem Hiệu Ứng Sở Hữu của từng Cộng Sự tại Chi Tiết Cộng Sự, Danh Sách Cộng Sự và Kho Lưu Trữ.
534|Thêm nút [Nội Tại Thám Hiểm] tại màn hình đội hình Chaos/Xuất Kích và thông tin Cộng Sự trong trò chơi, giúp xem một lần toàn bộ hiệu ứng kết hợp của các Cộng Sự được bố trí.
535|■ Sự kiện – [Lễ Hội Ác Mộng (Nightmare Carnival)]
536|Mừng kỷ niệm 1 năm với sự kiện lớn! Tổ chức [Lễ Hội Ác Mộng].
537|◆ Thời gian
538|Sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/02/2026
539|◆ Điều kiện mở khóa
540|Đạt Cấp Đội Trưởng 10
541|◆ Quà ghé thăm
542|Chỉ cần đăng nhập để nhận phần thưởng hào phóng, gồm Vé Chọn Chiến Binh ★5 và Vé Chọn Cộng Sự ★5.
543|Danh sách phần thưởng
544|Thẻ Ác Mộng lần 1 [Chiến Binh] (1st Nightmare Card [Combatant])
545|Thẻ Ác Mộng lần 1 [Cộng Sự] (1st Nightmare Card [Partner])
546|Pha Lê x1,600
547|Thấu Kính Lumina x5
548|Vật Liệu Căn Chỉnh Đa Chiều x3
549|◆ Điểm danh
550|Đăng nhập hằng ngày trong 14 ngày để nhận phần thưởng mỗi ngày.
551|Có tính năng Điểm Danh Bù dành cho Đội Trưởng đã bỏ lỡ một số ngày.
597|◆ Trao đổi
598|Có thể nhận [Xu Ác Mộng (Nightmare Tokens)] khi mua sản phẩm trong thời gian sự kiện.
599|Nhận phần thưởng từng mốc dựa trên tổng số [Xu Ác Mộng] tích lũy.
600|Bất kể Cấp Tài Khoản, bạn đều nhận được [Xu Ác Mộng] khi mua sản phẩm đủ điều kiện nhận [Xu Ác Mộng].
601|Số [Xu Ác Mộng] tối đa cần để nhận toàn bộ phần thưởng các mốc trong sự kiện là 15,000.
602|[Xu Ác Mộng] là tiền sự kiện có thời hạn, chỉ nhận và sử dụng trong thời gian sự kiện.
603|Khi mua sản phẩm đủ điều kiện nhận [Xu Ác Mộng], [Xu Ác Mộng] sẽ được gửi cùng sản phẩm
604|qua thư trong trò chơi và được nhận khi nhận thư.
605|Mua sản phẩm tiếp tế Arkhianon sẽ nhận [Xu Ác Mộng] ngay lập tức.
606|Nếu chưa đạt số [Xu Ác Mộng] tối đa, toàn bộ [Xu Ác Mộng] nhận từ việc mua
607|cùng sản phẩm nhiều lần đều được tính vào tiến trình sự kiện.
608|Phần thưởng chưa nhận sẽ được gửi qua thư khi đăng nhập lại trong vòng 42 ngày sau khi sự kiện kết thúc.
609|* Sự kiện [Trao Đổi] mở khóa ở Cấp Đội Trưởng 10; tuy nhiên, nếu mua sản phẩm trước khi đạt cấp này,
610|bạn vẫn nhận được [Xu Ác Mộng].
626|Nền Dữ Liệu Lưu [Cuộc Gặp Với Kyrken (Encounter with Kyrken)], Nền Dữ Liệu Lưu [Kyrken], Nhãn Dán [Rossweisse – Thức Tỉnh (Rossweisse - Awakening)]
627|* Lưu ý
628|Nội dung phần thưởng “Thẻ Ác Mộng lần 1 [Chiến Binh]/[Cộng Sự]” như sau.
629|Thẻ Ác Mộng lần 1 [Chiến Binh]: khi sử dụng, chọn và nhận một Chiến Binh ★5 (bao gồm đến Fei).
630|Thẻ Ác Mộng lần 1 [Cộng Sự]: khi sử dụng, chọn và nhận một Cộng Sự ★5 (bao gồm đến Ruixiang).
631|* Không bao gồm Chiến Binh/Cộng Sự theo mùa.
632|Sản phẩm mua trước khi sự kiện bắt đầu không đủ điều kiện nhận [Xu Ác Mộng]; việc hủy mua và hoàn tiền vì lý do này có thể bị hạn chế.
633|Tuy nhiên, nếu đã mua “sản phẩm Tiếp Tế Arkhianon” sau 9/30 và trước khi sự kiện Trao Đổi bắt đầu, bạn sẽ nhận [Xu Ác Mộng] tương ứng qua thư khi đăng nhập trong khoảng từ bảo trì ngày 10/21/2026 đến bảo trì ngày 12/02/2026.
634|Nếu đã nhận thư chứa [Xu Ác Mộng], việc hoàn tiền sản phẩm đã mua có thể bị hạn chế.
635|Khi hủy đăng ký sản phẩm đã mua, phần thưởng đã cấp và [Xu Ác Mộng] có thể bị thu hồi.
636|Việc hủy mua có thể bị hạn chế sau khi nhận và sử dụng phần thưởng Trao Đổi bằng [Xu Ác Mộng].
637|Nếu nhận phần thưởng sự kiện bằng cách bất hợp pháp hoặc bất thường khác, phần thưởng đã cấp và [Xu Ác Mộng] có thể bị thu hồi.
638|Khi [Xu Ác Mộng] bị thu hồi do hủy mua hoặc hoàn tiền, số điểm tích lũy trong sự kiện Trao Đổi cũng được điều chỉnh tương ứng.
639|◆ Phát thêm Aether
640|Thời gian: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 11/11/2026
641|Có thể nhận thêm 40 Aether khi sử dụng [Thành Phố Ark] - [Garden Cafe] - [Cửa Hàng].
642|◆ Tặng 70 lượt Cứu Viện Thường miễn phí
643|Thời gian: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/02/2026
644|Trong thời gian sự kiện, đăng nhập mỗi ngày nhận 10 lượt Cứu Viện miễn phí trong 7 ngày, tổng cộng tối đa 70 lượt Cứu Viện miễn phí.
645|Lượt Cứu Viện miễn phí chưa dùng sau khi đăng nhập được tích lũy để dùng vào ngày tiếp theo.
646|Lượt Cứu Viện miễn phí tích lũy chỉ dùng được trong thời gian sự kiện.
647|* Nếu không đăng nhập, bạn sẽ không nhận 10 lượt Cứu Viện miễn phí; mọi lượt Cứu Viện miễn phí chưa dùng trong thời gian này sẽ bị đặt lại.
648|◆ Thông tin
649|Cửa sổ thông báo sảnh hiển thị một lần mỗi ngày và sẽ ngừng xuất hiện khi đã nhận toàn bộ Quà Ghé Thăm Lễ Hội.
650|Danh sách Chiến Binh và Cộng Sự có thể chọn từ
651|“Thẻ Ác Mộng lần 1 [Chiến Binh]” và “Thẻ Ác Mộng lần 1 [Cộng Sự]”
652|như sau.
697|■ Sự kiện – [Công Viên Giấc Mơ Ác Mộng (Nightmare Dream Park)]
698|Để mừng Lễ Hội Ác Mộng, tổ chức sự kiện [Công Viên Giấc Mơ Ác Mộng], nơi bạn xây công viên giải trí trên SS Nightmare.
699|◆ Thời gian
700|Sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/23/2026
701|◆ Cách tham gia
702|Xây các trò chơi trong công viên để tăng sự hài lòng của Chiến Binh ghé thăm và kiếm lợi nhuận từ Công Viên Giấc Mơ Ác Mộng.
703|Bố trí Chiến Binh làm quản lý để công viên vận hành hiệu quả và nhận thêm Lợi Nhuận Quản Lý.
704|Mỗi quản lý có hiệu ứng bố trí riêng được áp dụng. Kết hợp các quản lý khác nhau để tối đa hóa Lợi Nhuận Quản Lý.
705|Dùng lợi nhuận kiếm được để xây thêm trò chơi và nâng cấp chúng nhằm tăng lợi nhuận.
706|Nâng hạng công viên qua xây dựng, nâng cấp trò chơi để khám phá Cốt Truyện mới và nhận nhiều phần thưởng.
707|Dùng kỹ năng để kéo dài Thời Gian Tích Lũy Lợi Nhuận Ngoại Tuyến Tối Đa, tăng số ô quản lý và tăng sự hài lòng của khách.
708|Công viên vẫn hoạt động khi ngoại tuyến, tự động tích lũy lợi nhuận ngay cả khi bạn không đăng nhập.
709|◆ Phần thưởng thành tựu
710|Biên Niên Sử Công Viên
714|Đạt [Công Viên Giải Trí Ai Cũng Nhắc Đến (The Amusement Park All the Buzz Is About)]
716|Nhãn Dán [Nức Nở (Adelheid) (Sob)]
717|Đạt [Điểm Đến Nổi Tiếng Nhất SS Nightmare (The SS Nightmare's Most Popular Spot)]
719|Nhãn Dán [Ngạc Nhiên (Veronica) (Surprise)]
720|Đạt [Ngôi Sao Mới Của Giới Công Viên (The Rising Star of the Amusement Park World)]
722|Nhãn Dán [Nhún Vai (Cassius) (Shrug)]
723|Đạt [Siêu Sao Của Giới Công Viên (The Superstar of the Amusement Park World)]
725|Nhãn Dán [Ồ! (Tiphera) (Wow)]
726|Đạt [Công Viên Xếp Hàng Bất Tận (An Amusement Park With a Never-Ending Line)]
728|Nhãn Dán [Ăn Mừng (Renoa) (Celebrate)]
729|Đạt [Công Viên Mang Lại Hạnh Phúc (An Amusement Park That Brings Happiness)]
731|Nhãn Dán [Cúi Chào (Rossweisse) (Bow)]
732|Đạt [Công Viên Tỏa Sáng Như Siêu Tân Tinh (An Amusement Park That Shines Like a Supernova)]
734|Nền Hồ Sơ [Công Viên Giấc Mơ Ác Mộng]
735|Hoàn thành toàn bộ thành tựu Biên Niên Sử Công Viên
736|Nền Dữ Liệu Lưu [Công Viên Giấc Mơ Ác Mộng]
737|Quản Lý Công Viên
738|Vật phẩm có thời hạn chỉ dùng được đến cuối Thảm Họa Thiên Hà Mùa 5 và sẽ bị xóa khi hết hạn.
742|Đạt [Vòng Quay Ngựa Gỗ (Merry-Go-Round)] cấp 50
745|Đạt [Mâm Xoay (Tagada)] cấp 50
748|Đạt [Tàu Lượn Siêu Tốc (Roller Coaster)] cấp 50
751|Đạt [Vòng Xoay Lộn Ngược (Top Spin)] cấp 50
754|Đạt [Tháp Rơi (Drop Tower)] cấp 50
757|Đạt [Khách Đặc Biệt (Special Guest)] cấp 50
760|Đạt [Buồng Chụp Ảnh (Photo Booth)] cấp 50
763|Đạt [Nhà Ma (Haunted House)] cấp 50
766|Đạt [Đài Quan Sát (Observatory)] cấp 50
769|Đạt [Thuyền Lắc (Swing Boat)] cấp 50
772|Đạt [Xe Điện Đụng (Bumper Cars)] cấp 50
775|Đạt [Quầy Xúc Xích (Hot Dog Stand)] cấp 50
778|Đạt [Máng Trượt Nước (Water Slide)] cấp 30
781|Đạt [Vòng Đu Quay (Ferris Wheel)] cấp 30
784|Đạt [Đu Quay Dây Văng (Swing Ride)] cấp 30
787|Xây [Pháo Hoa (Fireworks)]
790|■ Tin nhắn Unigram đặc biệt [Lễ Hội Ác Mộng]
791|Nhận món quà nhỏ do Renoa chuẩn bị để mừng Lễ Hội Ác Mộng.
792|◆ Thời gian: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/02/2026
793|◆ Phần thưởng: Nhãn Dán [Renoa Mừng Lễ Hội Ác Mộng (Nightmare Carnival Celebration Renoa)]
794|◆ Cách truy cập
795|Sảnh > Tin Nhắn Bật Lên Unigram Đặc Biệt
796|Sảnh > Unigram > Unigram Đặc Biệt
797|Sảnh > Biểu Ngữ Sự Kiện Lễ Hội Ác Mộng > Diễu Hành > Unigram Đặc Biệt
798|■ Sự kiện Mã Chấn Thương [Lưỡi Kiếm Chống Luân Hồi (Blade Poised Against the Cycle)] của Chiến Binh theo mùa mới [Rossweisse]
799|
800|Tổ chức sự kiện Mã Chấn Thương (Trauma Code) có thời hạn của Chiến Binh theo mùa mới [Rossweisse].
801|Trong thời gian sự kiện, có thể nhận phần thưởng có thời hạn bằng cách tham gia các trận chiến sự kiện.
802|Trải nghiệm câu chuyện của Rossweisse thông qua Mã Chấn Thương.
803|◆ Thời gian
804|Sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/02/2026
805|◆ Phần thưởng có thời hạn
806|Cung cấp các thành tựu có thời hạn trong sự kiện [Lưỡi Kiếm Chống Luân Hồi].
809|Hoàn tất đồng bộ Mã Chấn Thương [Lưỡi Kiếm Chống Luân Hồi]
811|Hoàn thành toàn bộ phần thưởng thành tựu Trận Chiến Sự Kiện [Theo Tôi Nào (Follow My Lead)]
813|Hoàn thành toàn bộ phần thưởng thành tựu Trận Chiến Sự Kiện [Ánh Sáng Tôi Luyện Bởi Công Lý (Light Honed by Justice)]
815|Hoàn thành toàn bộ phần thưởng thành tựu Trận Chiến Sự Kiện [Trống Rỗng Để Lấp Đầy (Empty to Be Filled)]
817|Hoàn thành toàn bộ phần thưởng thành tựu Trận Chiến Sự Kiện [Thân Xác Thuần Khiết (Pure Flesh)]
819|Hoàn thành toàn bộ phần thưởng thành tựu Trận Chiến Sự Kiện [Lưỡi Kiếm Mạnh Lên Vô Hạn (A Blade That Grows Infinitely Stronger)]
821|Đạt toàn bộ mục tiêu có thời hạn
822|Nhãn Dán [Kỷ Niệm Cùng Rossweisse (Memories Made with Rossweisse)]
823|* Từ bản cập nhật này, vẫn phải tiêu hao [Mã Bảo Mật Đặc Biệt (Special Security Code)] để mở Mã Chấn Thương ngay cả trong thời gian sự kiện.
824|* Có thể mua [Mã Bảo Mật Đặc Biệt] tại [Thành Phố Ark] > [Cửa Hàng Nono].
825|■ Sự kiện – Mô Phỏng Chiến Thuật Ảo [Rossweisse], [Tiphera]
826|Trong thời gian tăng tỷ lệ của Chiến Binh [Rossweisse] và [Tiphera], bạn có thể trải nghiệm hai Chiến Binh này qua sự kiện Mô Phỏng Chiến Thuật Ảo.
827|Có thể chơi màn thử bằng Dữ Liệu Lưu cố định chứa các Chiến Binh dùng thử.
828|◆ Rossweisse: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/02/2026
829|* Trận thử của Chiến Binh ★4 Beryl và Rei diễn ra cùng Rossweisse sẽ kết thúc trước bảo trì ngày 11/11/2026.
830|◆ Tiphera: 11/03/2026 18:00 (UTC) – 11/24/2026 18:00 (UTC)
831|■ Sự kiện – [Tăng Tốc: Mô Phỏng (Overdrive: Simulation)]
832|Tổ chức sự kiện [Tăng Tốc: Mô Phỏng], nơi bạn nhận x2 tiền tệ phát triển mỗi ngày.
833|Có thể nhận gấp đôi phần thưởng mô phỏng tối đa 6 lần mỗi ngày.
834|Các lượt này đặt lại hằng ngày lúc 18:00 (UTC) trong thời gian sự kiện.
835|◆ Thời gian: sau bảo trì ngày 10/21/2026 – 11/03/2026 18:00 (UTC)
836|■ Huấn Luyện Chiến Đấu – cải tiến tiến trình nội dung [Thử Thách]
837|Cải tiến cách tiến hành nội dung “Thử Thách” trong Huấn Luyện Chiến Đấu để linh hoạt hơn.
838|Có thể tham gia miễn phí tối đa 3 lần mỗi tuần mà không tiêu hao Aether.
839|Sau khi dùng hết lượt miễn phí, vẫn có thể tiếp tục Thử Thách bằng Aether.
840|Cải tiến giao diện liên quan để bạn xem số lượt miễn phí còn lại và lượng Aether cần cho lượt bổ sung ở từng màn hình.
841|Nếu Thoát trong chiến đấu, toàn bộ Aether dùng để vào sẽ được hoàn lại.
842|Nếu Thoát trong chiến đấu, lượt miễn phí sẽ được hoàn lại.
843|■ Thêm hai Mảnh Ký Ức mới
844|Bổ sung hai Mảnh Ký Ức mới.
845|Có thể nhận tại phó bản thu thập mới [Ánh Sáng Và Bông Tuyết (Radiance and Snowflakes)], Chiến Lợi Phẩm Chaos và Chế Tạo Mảnh Ký Ức.
849|Ánh Sáng Che Phủ (Veiled Radiance)
850|Bộ 4
851|Khi thẻ Công Lý được cộng dồn, +8% Tỷ Lệ Chí Mạng cho thẻ Tấn Công (tối đa 2 cộng dồn).
852|Bông Tuyết Ngày Đầu Gặp Gỡ (Snowflake of Our First Meeting)
853|Bộ 4
854|Khi thẻ Liên Kết được cộng dồn, nhận 1 [Tuyết Bột (Powder Snow)] (1 mỗi Chiến Binh).\n◦ [Tuyết Bột]: tăng 10% Lượng Sát Thương cho thẻ Tấn Công đồng minh với mỗi Tuyết Bột; nếu là Công Lý, tăng thêm 5% (tối đa 2 cộng dồn).\n◦ Ở 2 cộng dồn [Tuyết Bột], +15% Sát Thương Chí Mạng cho thẻ Tấn Công Công Lý đồng minh.
855|■ Thêm gói mới và nhiệm vụ Tiếp Tế Arkhianon
856|Bổ sung các gói cập nhật mới.
897|Bổ sung Y Phục mới.
905|Y Phục Rossweisse\n[Ánh Vàng Dưới Trời Đêm (Golden Glow Beneath the Night Sky)]
907|Y Phục Rossweisse [Ánh Vàng Dưới Trời Đêm]
909|$34.99\n(Trong thời gian giới hạn: $29.99)
910|Rossweisse Tí Hon (Petit Rossweisse) [Ánh Vàng Dưới Trời Đêm]
911|Y Phục Rossweisse [Ánh Vàng Dưới Trời Đêm] được giảm giá trong thời gian giới hạn.
912|Thời gian: sau bảo trì ngày 10/21/2026 – trước bảo trì ngày 12/02/2026
913|Giá giảm: $29.99
914|Thêm sáu nhiệm vụ mùa mới vào Tiếp Tế Arkhianon.
915|[Thảm Họa Thiên Hà] Hoàn thành Cốt Truyện Chương 1 “[12. Bắt Đầu Từ Bạn Bè (Starting as Friends)]”
916|[Thảm Họa Thiên Hà] Hoàn thành Biến Dạng Tinh Vân – “Viadeus”
917|[Thảm Họa Thiên Hà] Hoàn thành Biến Dạng Tinh Vân – “Seraphion”
918|[Thảm Họa Thiên Hà] Hoàn thành Biến Dạng Tinh Vân – “Enforcer Seraphion”
919|[Mã Chấn Thương] Hoàn thành Trận Chiến Sự Kiện “Lưỡi Kiếm Mạnh Lên Vô Hạn”
920|[Công Viên Giấc Mơ Ác Mộng] Đạt hạng công viên 10
921|■ Bổ sung Gói Ngoại Hình Thẻ mới
922|Mở bán các Gói Ngoại Hình Thẻ mới được cập nhật.
926|Gói [Lời Mời Dưới Trời Đêm (Invitation Under the Night Sky)]
929|Gói [Thiên Thần Trời Đêm (Angel of the Night Sky)]
932|Gói [Ngọn Lửa Trời Đêm (Flames of the Night Sky)]
935|Gói [Anh Hùng Trời Đêm (Hero of the Night Sky)]
938|Gói [Lời Hứa Trời Đêm (Promise of the Night Sky)]
941|Gói [Cám Dỗ Trời Đêm (Temptation of the Night Sky)]
944|* Có thể xem nội dung và tỷ lệ của từng gói qua nút [Thông Tin Tỷ Lệ] trong Cửa Hàng.
945|* Gói Ngoại Hình Thẻ Theo Mùa có thể được mở bán lại về sau ngay cả khi đã kết thúc bán.
946|■ Đặt lại ưu đãi x2 lần nạp Pha Lê đầu tiên
947|Sau cập nhật ngày 10/21 (Thứ Tư), có thể nhận lại ưu đãi x2 cho lần nạp Pha Lê đầu tiên.
948|■ Các cải tiến
949|◆ Chaos
950|“Quái Vật Xâm Lược” nay cũng xuất hiện tại Khu Vực Tinh Anh.
951|Tăng tần suất xuất hiện Khu Vực Tinh Anh ở khu vực bên trong Chaos áp dụng tùy chọn [A Promise Upon the Snow] (cũng áp dụng khi dùng “Ủy Quyền Chỉ Huy”).
952|[Kho Báu Kẻ Ăn Aether (Aether-Eater's Treasure Trove)] sẽ không xuất hiện ở khu vực bên trong Chaos áp dụng tùy chọn [A Promise Upon the Snow].
953|Tuy nhiên, nếu không còn Khu Vực Chưa Xác Định khả dụng, [Kho Báu Kẻ Ăn Aether] vẫn có thể xuất hiện.
954|◆ Tiện ích
955|Sau khi hoàn thành Hồi 1, Chương 1, Tập 6 “Trở Về Nhà (Returned Home)”, có thể chạm để bỏ qua đoạn phim lặp lại trong Chaos, như hoạt ảnh nhận thẻ hoặc Hiển Ngộ.
956|
957|Các đối tượng có thể bỏ qua
958|Nhận thẻ: thẻ Thường/Quái Vật/Theo Mùa
959|Nâng cấp thẻ: kích hoạt và áp dụng Hiển Ngộ Phổ Thông, áp dụng Thần Khải, Khắc Ấn, gia công và hiện thực hóa Thẻ Ký Ức (không gồm kích hoạt Thần Khải)
960|Thay đổi thẻ: Nhân Bản/Loại Bỏ/Chuyển Đổi
961|Hiển Ngộ Chiến Binh
962|Đổ xúc xắc (chỉ bỏ qua hoạt ảnh tung, vẫn phát hoạt ảnh kết quả thành công/thất bại)
963|Sau khi kết thúc Khu Vực Chiến Đấu Chaos và nhận toàn bộ phần thưởng chiến đấu, tự động chuyển sang màn hình Chọn Khu Vực tiếp theo mà không cần thao tác “Rời Đi”.
964|Tăng giá trị hiệu suất chiến đấu tối đa trong Huấn Luyện Chiến Đấu [Mô Phỏng].
965|Huấn Luyện Chiến Đấu áp dụng: Phát Triển, Chiến Binh, Cộng Sự và Tiềm Năng
966|Giá trị thay đổi: tối đa 5 lần → tối đa 6 lần
967|Trong <Xuất Kích>, cải tiến để có thể bỏ qua mà không chọn khi nhận Vận Mệnh thông qua Hiệu Ứng Vận Mệnh.
968|◆ Chiến đấu
969|Sửa lỗi khi loại một thẻ có bản sao, số lần nhân bản và cách tính điểm khác nhau tùy việc loại thẻ [Đã Nhân Bản] hay thẻ gốc, dù kết quả cuối cùng giống nhau.
970|* Thay đổi quy tắc này chỉ áp dụng cho Dữ Liệu Lưu từ Mùa 2 trở đi, thời điểm quy tắc Dữ Liệu Lưu được thay đổi.
971|Khi loại thẻ gốc, từ khóa [Đã Nhân Bản] được gỡ khỏi 1 thẻ [Đã Nhân Bản] ngẫu nhiên.
972|Số lần nhân bản cũng giảm; điểm Ký Ức Phai Mờ đã tăng do nhân bản giảm theo lượng đó.
973|Với Dữ Liệu Lưu hiện có, Ký Ức Phai Mờ cũng được tính lại theo quy tắc mới.
974|Điều chỉnh cân bằng Trùm Ẩn ở Vực Sâu Xuất Kích.
975|Cải thiện tốc độ phát hoạt ảnh cộng dồn thẻ Liên Kết.
976|Giảm HP và Lượng Sát Thương của “Avaritia” do “Aavarck” triệu hồi.
977|Giảm Lượng Sát Thương của “Golden Mane”.
978|Giảm Lượng Sát Thương của “Colossus”.
979|◆ Khu Vực Chưa Xác Định
980|Trong phần thưởng Lựa Chọn Khu Vực Chưa Xác Định, phần thưởng liên quan đến [Thần Khải Ngẫu Nhiên] hoặc [Thần Khải Chỉ Định] được cải tiến thành phần thưởng [Áp Dụng Thần Khải].
981|Có thể thêm hiệu ứng Thần Khải vào thẻ đã được áp dụng Hiển Ngộ.
982|Với thẻ đã có Thần Khải, hiệu ứng Hiển Ngộ hiện tại được giữ lại; chỉ thay đổi được hiệu ứng do Thần Khải thêm vào.
983|* Áp dụng cho mọi Khu Vực Chưa Xác Định; loại và số lượng phần thưởng Thần Khải giữ nguyên như trước.
984|◆ Khác
985|Thêm mục “Khôi Phục Sụp Đổ Liên Kết (Link Crash Recovery)” tại khu [Nghỉ Ngơi] trong Khu An Toàn để chỉ rõ chức năng này.
986|Khi mở cửa sổ Nạp Aether lúc thiếu Aether, số Tế Bào Aether được chọn tự động đặt theo lượng cần thiết.
987|Khi dùng liên tục các kỹ năng không phát đoạn phim, nay có thể phát nhiều câu thoại.
988|Áp dụng cho nhân vật ra mắt sau 10/21 (bao gồm Rossweisse).
989|Có thể cài đặt việc hiển thị cửa sổ tái quan sát Chaos Thảm Họa Thiên Hà trong Cài Đặt Trò Chơi.
990|Các cửa sổ cho phép cài đặt hiển thị trong Cài Đặt Trò Chơi sẽ có nút (i).
991|Thêm tab [Tin Nhắn Quan Trọng] vào Unigram.
992|Tab [Tin Nhắn Quan Trọng] cung cấp tin nhắn đặc biệt liên quan đến Thảm Họa Thiên Hà hoặc sự kiện.
993|Tăng độ phân giải ảnh khi chia sẻ hồ sơ Xuất Kích và Dữ Liệu Lưu từ 1280*720 lên 1920*1080.
994|Chiến Binh [Chizuru]: cải thiện mô tả Liên Kết của thẻ [Bóng Trăng (Shadow of the Moon)] để hiển thị trực quan số cộng dồn hiện tại và tối đa.
995|■ Sửa lỗi
996|◆ Liên quan đến chiến đấu
997|Cải thiện cơ chế Tự Động Chiến Đấu cho [Chizuru].
998|Sửa lỗi hiệu ứng không hiển thị khi nhận Thẻ Dục Vọng Mùa 4 hoặc Khắc Ấn Thẻ Mùa 3.
999|Sửa lỗi hiệu ứng “kích hoạt” của trang bị “Trâm Ác Mộng (Nightmare Hairpin)” không hoạt động.
1000|Sửa lỗi mô tả hiệu ứng “Xói Mòn (Erosion)” của Trùm [Pharanes] hiển thị khác với hoạt động thực tế.
1001|Sửa lỗi điểm dự kiến và điểm thực tế không khớp sau khi chỉnh sửa Dữ Liệu Lưu có từ trước đợt cải tổ Ký Ức Phai Mờ để tái hiện Hiển Ngộ.
1002|Sửa lỗi vào Chaos qua lối tắt trong <Hướng Dẫn Phát Triển> sau khi tạm trở về từ Chaos không tiếp tục Chaos đang chơi.
1003|Sửa lỗi đoạn phim hiển thị sai khi chọn lại một số lựa chọn cung cấp thông tin trong Khu Vực Chưa Xác Định.
1004|Sửa lỗi Sát Thương Kiên Cường do Kỹ Năng Bản Ngã “Buffalo Dive” của [Anika] gây ra không hiển thị trong nhật ký chiến đấu.
1005|Sửa lỗi “Homing Arrow” do [Hilde] rút qua trang bị “Psionic Combat Suit” đôi lúc kích hoạt sau đòn tấn công của địch thay vì ngay khi Tiêu Hao.
1006|Sửa lỗi biểu tượng Bloodstone không hiển thị trong nhật ký chiến đấu khi hồi HP qua hiệu ứng trang bị “Bloodstone”.
1007|Sửa lỗi giới hạn sử dụng mỗi lượt của một số trang bị được nạp sau bước Rút Thẻ Đầu Lượt.
1008|Sửa lỗi phần xem trước Khiên vẫn hiển thị sau khi lượt kết thúc nếu kết thúc lượt trong lúc giữ thẻ có “hiệu ứng Phước Lành”.
1009|Sửa lỗi không mở được menu sau một đợt Xâm Lược “Lightfeeder” trong Xuất Kích.
1010|Sửa lỗi biểu tượng thanh EP nhấp nháy sau một đợt Xâm Lược “Lightfeeder” trong Xuất Kích.
1011|Sửa lỗi biểu tượng nhật ký trống trong hành động của địch khi chiến đấu với Quái Vật “Gloomy Beast”.
1012|Sửa lỗi thẻ trên tay vẫn bất hoạt khi dùng Hiển Ngộ thứ 5 của “Anchor Shot” lên Lõi Chaos có kiểu hành động “Discord Devouring”.
1013|Sửa lỗi màn hình phần thưởng hiển thị 0 Dữ Liệu Chiến Thuật khi thoát Xuất Kích trước khi đánh bại Trùm đầu tiên.
1014|Sửa lỗi thời điểm kết thúc đoạn phim đôi lúc hiển thị thiếu tự nhiên khi dùng thẻ “Deluge” của [Mika].
1015|Sửa lỗi ánh xạ phím không hoạt động khi nhấn Caps Lock sau khi chọn thẻ bằng chuột tại màn hình Loại Bỏ Thẻ trên PC.
1016|Thêm ánh xạ phím PC cho nút nhận trong cửa sổ nhận chiến lợi phẩm Chaos.
1017|Sửa lỗi đoạn phim hồi HP không hiển thị sau khi đánh bại Trùm Hồi 1 và Hồi 2 trong <Xuất Kích>.
1018|Sửa lỗi biểu tượng cảnh báo tấn công vẫn hiển thị sau khi kẻ địch dự kiến chết vì sát thương theo thời gian đã hoàn tất hành động.
1019|Sửa lỗi [Heidemarie] phát hoạt ảnh trúng đòn khi [Arabella] dùng “Observer's Pleasure”.
1020|Sửa lỗi khi xác nhận lựa chọn phần thưởng thẻ trong lúc thẻ được chọn nằm ngoài màn hình, đoạn phim chuyển cảnh bắt đầu từ vị trí một thẻ chưa chọn.
1021|Sửa lỗi vẫn có thể chạm khi nút xem chi tiết Vận Mệnh không hiển thị.
1022|Sửa lỗi máy chủ do đánh giá sai Quái Vật và Trùm đã thu thập đầy đủ khi kết thúc Chaos.
1023|Sửa lỗi Lượng Sát Thương hiển thị sai thời điểm so với số đòn đánh khi “Giant Spore Mushroom” đang ở trạng thái Bào Tử bị đánh từ 2 đòn trở lên.
1024|Sửa lỗi điểm thưởng số lượt còn lại không được tính vào điểm hồ sơ hoàn thành Tổng Tấn Công (Full-Scale Offensive).
1025|Sửa lỗi “Homing Laser” hiển thị là thẻ có thể tạo dù Hiển Ngộ thứ 4 của “Cobalt Light” của [Sereniel] không thể tạo thẻ này.
1026|Sửa lỗi đôi lúc xuất hiện cửa sổ báo lỗi khi dùng Hiển Ngộ thứ 3 của “Bound At Dusk” của [Chizuru] cùng bộ bài Dream World.
1027|Sửa lỗi Soul Collector đôi lúc triệu hồi ngay Quái Vật thuộc hạ khi dùng Hiển Ngộ thứ 3 của “Bound At Dusk” của [Chizuru] cùng bộ bài Dream World.
1028|Cải thiện mô tả hiệu ứng Cộng Sự “Exalted Conviction”.
1029|* Hoạt động thực tế không thay đổi.
1030|Sửa lỗi hình ảnh Chaos bị cắt khi đổi độ phân giải trong hướng dẫn Chaos.
1031|Sửa lỗi nhân vật SD Cộng Sự không hiển thị khi dùng Kỹ Năng EP Cộng Sự sau khi thu nhỏ cửa sổ.
1032|Sửa lỗi thông báo tăng điểm Ký Ức Phai Mờ hiển thị sai số lần nhân bản khi nhân bản Thẻ Trung Lập.
1033|Sửa lỗi có thể nhận nhiều thẻ “Hew” bằng cách ban Thần Khải “Thiêu Hủy: 50% cơ hội lên tay” cho thẻ “Hew”.
1034|[PC] Sửa lỗi tay trái của “Colossus” được đặt thành mục tiêu số 4 trong ánh xạ phím.
1035|Sửa lỗi mô tả thẻ và mô tả hiệu ứng hiển thị khác nhau với Hiển Ngộ thứ 4 của “Warming Up” của [Anika].
1036|Sửa lỗi giao diện hội thoại Cộng Sự bị cắt trong chiến đấu ở một số độ phân giải.
1037|Sửa lỗi Hiển Ngộ dành riêng cho Xuất Kích [Thiêu Hủy: 50% cơ hội lên tay] xuất hiện trên thẻ “Hew” của Nine.
1038|Sửa lỗi thẻ được tạo qua Vận Mệnh Cảm Hứng (Inspiration) xuất hiện ở vị trí khác với vị trí tạo thẻ gốc.
1039|Sửa lỗi “Harmonization: Criticism of Discord” xuất hiện trong phần thưởng đánh bại Trùm Xuất Kích.
1040|Đổi hiệu ứng thẻ “Mutation: Prepare for Battle” để tạo 1 thẻ Cửa Hàng Dellang ngẫu nhiên có Chi Phí từ 1 trở lên, loại trừ thẻ “Độc Nhất”.
1041|Cập nhật chữ trên thẻ Hiển Ngộ thứ 3 của Drawing Slash của [Rin] để trạng thái mặc định ghi “Không Thể Kích Hoạt”, tương tự Finisher Round của Luke.
1042|* Cải tiến này áp dụng cho cửa sổ chọn Hiển Ngộ và menu xác nhận vì thẻ có thể bị hiểu nhầm là dùng được ngay.
1043|* Hoạt động thực tế không thay đổi.
1044|Cải thiện cách ghi hiệu ứng duy trì nhận qua Hiển Ngộ thứ 3 của Tsukuyomi của [Chizuru] để thống nhất với định dạng các hiệu ứng duy trì khác.
1045|Sửa lỗi “Lượng Hồi Phục” cơ bản trong chú giải hiệu ứng Thần Khải bị ghi nhầm thành “Lượng Sát Thương” cơ bản.
1046|* Chỉ chỉnh sửa văn bản; hoạt động thực tế không thay đổi.
1047|Sửa lỗi không thể tiếp tục khi tới menu [Thảm Họa Thiên Hà] qua lối tắt nhận Ký Ức Ánh Sáng trong [Codex].
1048|[Chiến Đấu] Sửa lỗi khi trên tay có 10 thẻ và một thẻ Liên Kết, các thẻ Liên Kết được tạo thêm không Liên Kết.
1049|[Phần Thưởng Tức Thời (Spot Reward)] Sửa lỗi nhấn liên tục nút “Nhận Phần Thưởng” làm xuất hiện màn hình bất thường.
1050|[Chiến Đấu] Sửa lỗi sau khi đánh bại địch bằng cách kích hoạt “Homing Laser L” qua “Distortion: Knowledge of Darkness”, “Homing Laser L” xuất hiện trên tay ở trạng thái không dùng được.
1051|[Chiến Đấu] Sửa lỗi rút thẻ Chi Phí 0 qua “Forbidden: Disposable Ego” lại hiển thị thông báo “Không có thẻ để rút”.
1052|[Chiến Đấu] Sửa lỗi Sát Thương Kiên Cường được áp dụng cả cho sát thương do kích hoạt hiệu ứng thêm một lần, ngoài sát thương từ kích hoạt thẻ.
1053|[Chiến Đấu] Sửa lỗi một số Hiệu Ứng Có Lợi không được áp dụng khi hiệu ứng kích hoạt thêm một lần.
1054|[Chiến Đấu] Sửa lỗi nếu một hiệu ứng khác kích hoạt trước trong lúc dùng thẻ, sát thương kích hoạt Phân Mảnh (Fracture) được tính sau hành động của quái vật.
1055|[Xuất Kích] Sửa lỗi Trùm Quái Vật từ mùa khác với mùa hiện tại xuất hiện ở Vực Sâu.
1056|[Xuất Kích] Sửa lỗi thẻ Dính Nhớp (Stickiness) vẫn nằm trên tay trong chiến đấu khi sở hữu Vận Mệnh > Khước Từ Bất Hạnh (Rejecting Misfortune) và Tiêu Hao Chí Mạng (Critical Exhaust).
1057|Sửa lỗi trò chơi đôi lúc không thể tiếp tục khi chọn thẻ từ chồng bài trong Tự Động Chiến Đấu.
1058|◆ Giao diện và trải nghiệm người dùng
1059|Cải thiện phần giới thiệu [Adelheid] và [Tenebria] cho đúng đặc tính.
1060|Cải thiện mô tả vật phẩm “Lõi Nguyên Mẫu (Core of Archetype)”.
1061|Hoạt động thực tế không thay đổi. Làm rõ mô tả cách thêm Thẻ Đặc Trưng “không có trong Dữ Liệu Lưu hiện tại”.
1062|Khi chỉnh sửa Dữ Liệu Lưu bằng Lõi, danh sách thẻ có thể chọn sẽ được xếp cùng thứ tự sắp xếp thẻ trong Dữ Liệu Lưu.
1063|Sửa lỗi có thể chạm màn hình trong hướng dẫn Mảnh Ký Ức.
1064|Khi dùng “Lõi Tiềm Năng (Core of Potential)” lên thẻ đã nhân bản, nay hiển thị thông báo nếu không có Hiển Ngộ để chọn.
1065|Sửa lỗi số ngày còn lại hiển thị là 0 trong menu Hoạt Động dù Biến Dạng Tinh Vân đang diễn ra.
1066|Sửa lỗi chọn nút lối tắt nội dung Thảm Họa Thiên Hà trong menu Hoạt Động luôn dẫn đến trang chính Thảm Họa Thiên Hà.
1067|(Android) Sửa lỗi video nền bị đứng khi quay lại ứng dụng sau khi đưa ứng dụng về nền tại trang chính Thảm Họa Thiên Hà.
1068|Sửa lỗi số Chiến Binh bố trí tại Học Viện Thành Phố Ark hiển thị ít hơn thực tế.
1069|Sửa lỗi thông báo mở khóa Mô Phỏng Phát Triển và Cốt Truyện Chính 1-8 không hiển thị ngay.
1070|Sửa lỗi thông báo hoàn thành hướng dẫn không hiển thị khi hoàn thành Nhiệm Vụ Quà Đặc Vụ (Agent Present Mission) trong Hướng Dẫn Phát Triển.
1071|Sửa lỗi nhấn ESC sau khi di chuyển qua lối tắt trong Huy Chương Thiên Hà đưa người chơi về sảnh.
1072|Sửa lỗi xuất hiện thông báo “Bậc 14” khi tái tổng hợp “Phòng Thí Nghiệm 0” nếu có Chaos với giới hạn lưu trữ Dữ Liệu Lưu từ 160 điểm trở lên.
1073|Sửa lỗi biểu tượng Chiến Binh không hiển thị cho Cộng Sự đang trang bị trong danh sách đội hình Cộng Sự của Chiến Binh đã đặt Cộng Sự dùng thử.
1074|Sửa lỗi tên Thẻ Thường hiển thị bằng màu phẩm chất khác khi cuộn danh sách thẻ trong chi tiết hồ sơ Xuất Kích.
1075|Sửa lỗi mục đã hoàn thành không được đặt cuối khi sắp xếp nhiệm vụ thử thách Thảm Họa Thiên Hà theo trạng thái hoàn thành.
1076|Sửa lỗi tiến trình không cập nhật khi đổi mùa bằng nút điều hướng trang trong Huy Chương Thiên Hà.
1077|Sửa lỗi Trùm Ẩn của mùa khác với mùa Điểm Kỳ Dị Chiều Không Gian hiện tại xuất hiện trong lựa chọn Trùm Vực Sâu của chế độ Khắc Nghiệt Xuất Kích.
1078|Thêm nút liên kết thông tin đội và bộ bài hiện tại ở góc dưới bên trái màn hình chọn phần thưởng “[Ký Ức Khắc Sâu]” trong mùa [A Promise Upon the Snow].
1079|[Arabella] Sửa lỗi [Hiệu Suất] không hiển thị trong mô tả Hiển Ngộ thứ 4 của “Sadistic Restraint”.
1080|[Xuất Kích] Sửa lỗi biểu tượng Khắc Nghiệt không biến mất khi đi Du Ngoạn từ Thành Phố Ark sau khi tạm trở về trong một số tình huống Xuất Kích.
1081|[Cốt Truyện] Sửa lỗi chọn “Quay Lại” trên màn hình chính sau khi chơi Cốt Truyện dẫn đến màn hình Nhiệm Vụ Cốt Truyện/Chiến Đấu thay vì màn hình chọn Hồi.
1082|[Chiến Đấu] Sửa lỗi hoạt ảnh tua lại hiển thị bất thường khi dùng “Hoàn Tác Hành Động Cuối/Hoàn Tác Lượt Hiện Tại”.
1083|[Kho Lưu Trữ] Sửa lỗi kết quả bộ lọc Lớp Cộng Sự/Chiến Binh hiển thị bất thường.
1084|Sửa lỗi chữ nút ánh xạ phím xuất hiện trong hội thoại Chiến Binh khi hoàn thành Lựa Chọn Chính Sách trong lúc bật hiển thị lối tắt.
1085|[Xuất Kích] Sửa lỗi văn bản liên quan đến tiêu hao AP của Vận Mệnh Đố Kỵ (Envy) hiển thị thành “được kích hoạt”.
1086|[Nhà Hát Ảo Ảnh (Theater of Illusions)] Sửa lỗi “Kịch Bản Đạo Diễn 2 (Director's Script 2)” hiển thị thành “Sứ Giả Diallos 2 (Diallos's Envoy 2)” trong Cấp Thám Hiểm.
1087|Sửa lỗi chính tả nhỏ và cải thiện giao diện/trải nghiệm người dùng.
1088|◆ Khác
1089|Sửa lỗi không phát hiệu ứng âm thanh liên quan khi nhận Huy Chương Thiên Hà.
1090|Sửa lỗi bị chậm khi chuyển về sảnh trên PC.
1091|Sửa lỗi câu thoại tiêu đề đôi lúc không phát khi khởi động trò chơi.
1092|Sửa lỗi máy chủ trong Sự Kiện Trở Lại.
1093|Sửa lỗi nhiệm vụ thứ hai ở Ngày 7 của sự kiện Sereniel được thiết lập khác với mô tả.
1094|Sửa lỗi nhạc nền không được giữ tại màn hình kết quả khi hoàn thành Nhiệm Vụ Chaos.
1095|Sửa lỗi bộ đếm hoàn thành thành tựu “Vẫn Là Đáp Án Sai (Still the Wrong Answer)” của Thảm Họa Thiên Hà Mùa 4 không tăng đúng.
1096|Sửa chỉ số đề xuất cho Sereniel trong “Hướng Dẫn Phát Triển”.
1097|Sửa lỗi nhấn liên tục phím tắt Menu Nhanh (Q) khi vào khu vực đôi lúc khiến trò chơi không thể tiếp tục.
1098|Sửa lỗi tùy chọn Tắt Tiếng Khi Chạy Nền trong [Cài Đặt Âm Thanh] không được áp dụng.
1099|Xin cảm ơn.
"""

# Dictionary for labels and named game objects; identifiers remain available in parentheses.
NAMED={
'Tear of God':'Nước Mắt Thần',
'Core of the Reverse':'Lõi Nghịch Chuyển',
'Core of Annihilation':'Lõi Hủy Diệt',
'Core of Potential':'Lõi Tiềm Năng',
'Abyssal Core':'Lõi Vực Sâu',
'Colorless Core':'Lõi Vô Sắc',
'Signal Amplification Anchor':'Neo Khuếch Đại Tín Hiệu',
'Rescue Anchor':'Neo Cứu Viện',
'Prism Lens':'Thấu Kính Lăng Kính',
'Undetermined Ego Crystal':'Tinh Thể Bản Ngã Chưa Xác Định',
'Shards of Condemnation':'Mảnh Kết Tội',
'Multidimensional Alignment Material':'Vật Liệu Căn Chỉnh Đa Chiều',
'Premium Striker Manual':'Sổ Tay Đột Kích Cao Cấp',
'Premium Striker Certificate':'Chứng Nhận Đột Kích Cao Cấp',
'Premium Growth Stone of Justice':'Đá Phát Triển Công Lý Cao Cấp',
'Traces of Memory':'Dấu Vết Ký Ức',
'Core of Memory':'Lõi Ký Ức',
'Particles of Memory':'Hạt Ký Ức',
'Exquisite Slice of Cake':'Lát Bánh Tinh Tế',
'Sweet Choconilla':'Choconilla Ngọt Ngào',
'Premium Battle Memory':'Ký Ức Chiến Đấu Cao Cấp',
'Premium Support Data':'Dữ Liệu Hỗ Trợ Cao Cấp',
'Relic of a Frozen Civilization':'Di Vật Của Nền Văn Minh Băng Giá',
'Sword Slash':'Trảm Kiếm',
'Standing Blade':'Kiếm Thủ Thế',
'Flicker Blade':'Kiếm Chớp Nhoáng',
'Shard:Light':'Mảnh: Ánh Sáng',
'Shard:Dark':'Mảnh: Bóng Tối',
'Sword Resonance':'Cộng Hưởng Kiếm',
'Radiant Sword Flow':'Kiếm Lưu Rực Rỡ',
'Blade of the Cycle':'Lưỡi Kiếm Luân Hồi',
"Kyrken's Apostle":'Tông Đồ Kyrken',
'Sword Tassel':'Tua Kiếm',
'Equilux':'Quân Bình Quang Ám',
'Brand of the Cycle':'Dấu Ấn Luân Hồi',
"Kyrken's Aegis":'Khiên Kyrken',
'Flickering White Night':'Bạch Dạ Chập Chờn',
'Sleeping Memory':'Ký Ức Ngủ Say',
'Awakening Memory':'Ký Ức Thức Tỉnh',
'Vivid Memory':'Ký Ức Sống Động',
'Inner Memory':'Ký Ức Nội Tâm',
'Complete Memory':'Ký Ức Hoàn Chỉnh',
'Liberated Memory':'Ký Ức Giải Phóng',
'Child of the Cycle':'Đứa Con Luân Hồi',
'Cycle and Coalescence':'Luân Hồi Và Hợp Nhất',
'Danger Intuition':'Trực Giác Nguy Hiểm',
'Arcane Knowledge':'Tri Thức Huyền Bí',
'Frail Dominion of Kyrken':'Lãnh Địa Mong Manh Của Kyrken',
'Dominion Shard':'Mảnh Thống Trị',
"Kyrken's Embrace":'Vòng Tay Kyrken',
"Diallos's Radiance":'Ánh Sáng Diallos',
"Vytor's Bloodletting":'Hiến Máu Vytor',
"Nihilum's Encroachment":'Sự Xâm Lấn Của Nihilum',
"Sekred's Ember":'Tàn Lửa Sekred',
"Caligo's Judgment":'Phán Quyết Caligo',
'Core of Archetype':'Lõi Nguyên Mẫu',
'Core of Resonance':'Lõi Cộng Hưởng',
'Lumina Lens':'Thấu Kính Lumina',
'Starshine Package':'Gói Ánh Sao',
'Nightmare Carnival Chest I':'Rương Lễ Hội Ác Mộng I',
'Nightmare Carnival Chest II':'Rương Lễ Hội Ác Mộng II',
'Nightmare Carnival Chest III':'Rương Lễ Hội Ác Mộng III',
'Lumina Theater Chest':'Rương Nhà Hát Lumina',
'Normal Rescue Support Special':'Hỗ Trợ Cứu Viện Thường Đặc Biệt',
'1st Nightmare Card [Partner]':'Thẻ Ác Mộng lần 1 [Cộng Sự]',
'1st Nightmare Card [Combatant]':'Thẻ Ác Mộng lần 1 [Chiến Binh]',
}
LABELS={
'Item':'Vật phẩm','Purchase Limit':'Giới hạn mua','Price':'Giá','Once per week':'1 lần mỗi tuần','Free':'Miễn phí','Once per account':'1 lần mỗi tài khoản',
'Environment Variables':'Biến Số Môi Trường','Effect Description':'Mô tả hiệu ứng','Name':'Tên','Default Effect':'Hiệu ứng mặc định','Cost':'Chi Phí','Epiphany Status':'Có Hiển Ngộ',
'Criteria':'Điều kiện','Attack':'Tấn Công','Defense':'Phòng Thủ','Critical Chance':'Tỷ Lệ Chí Mạng','Critical Damage':'Sát Thương Chí Mạng','Starting Card':'Thẻ khởi đầu','100% Damage':'100% Sát Thương','100% Shield':'100% Khiên','Epiphany Card':'Thẻ Hiển Ngộ','Card Generation':'Thẻ được tạo','Unactivatable':'Không Thể Kích Hoạt','Exclusive Effect':'Hiệu ứng riêng','Light':'Ánh Sáng','Dark':'Bóng Tối','Ego Skill':'Kỹ Năng Bản Ngã','Ego Manifestation':'Hiện Thực Hóa Bản Ngã','Card':'Thẻ','Epiphany Effects':'Hiệu ứng Hiển Ngộ','Level':'Cấp','Effect':'Hiệu ứng','Passive':'Nội tại','Exploration Passive':'Nội Tại Thám Hiểm','Keyword':'Từ khóa','Bind':'Liên Kết','Cost Change':'Thay đổi Chi Phí','Card Discard':'Loại thẻ','Image':'Hình ảnh','Function':'Chức năng','Update Schedule':'Lịch cập nhật','Day':'Ngày','Item Name':'Tên vật phẩm','Quantity':'Số lượng','Total Nightmare Tokens':'Tổng Xu Ác Mộng','Reward':'Phần thưởng','Combatant':'Chiến Binh','Partner':'Cộng Sự','Achievement':'Thành tựu','Achievement Reward 1':'Phần thưởng thành tựu 1','Achievement Reward 2':'Phần thưởng thành tựu 2','Mission':'Nhiệm vụ','Set':'Bộ','Category':'Danh mục','Pack Items':'Vật phẩm trong gói','Price (USD)':'Giá (USD)','Sale Period':'Thời gian bán','Grade':'Phẩm chất','Ownership and Purchase Limit':'Giới hạn sở hữu và mua','Starcluster\nWardrobe':'Tủ Y Phục Tinh Đoàn (Starcluster Wardrobe)','Special':'Đặc Biệt','Currency':'Tiền tệ',
}
def fallback(s):
 if s in LABELS:return LABELS[s]
 if s in NAMED:return NAMED[s]+' ('+s+')'
 if re.fullmatch(r'\d+ times per account',s):return s.split()[0]+' lần mỗi tài khoản'
 # Item names followed by quantities, expiry labels, or epiphany variant names.
 for key in sorted(NAMED,key=len,reverse=True):
  if s.startswith(key) and (not s[len(key):] or s[len(key)] in ' ([x'):
   rest=s[len(key):].replace('Time-Limited','Có Thời Hạn')
   return NAMED[key]+' ('+key+')'+rest
 s=s.replace('Crystal (Paid)','Pha Lê (Trả Phí)').replace('Crystal x','Pha Lê x')
 s=re.sub(r'(\d{2}/\d{2}/\d{4}) after the maintenance',r'sau bảo trì ngày \1',s)
 s=re.sub(r'(\d{2}/\d{2}/\d{4}) before the maintenance',r'trước bảo trì ngày \1',s)
 return s
IMAGE_CAPTIONS={
 'f216236bf7c34ccfb02a9c1fade7538f.jpg': 'Rossweisse — Chiến Binh thuộc tính Công Lý (Justice), lớp Đột Kích (Striker). “Khi vòng luân hồi kết thúc, tất cả sẽ trở về như thuở ban đầu.” Một Chiến Binh tự tăng cường khả năng chiến đấu và trực tiếp rút các thẻ Tấn Công của chính mình.',
 '9b1774c362c54efa88055aa184e377f3.jpg': 'Sig — Lãng Khách (Wanderer), Cộng Sự lớp Đột Kích (Striker Partner). “Rossweisse cũng đến sao?” Người chị em đã khuất của Rossweisse được hồi sinh. Dù có vẻ chỉ nghĩ cho mình, ngang nhiên nêu yêu cầu mà chẳng hề áy náy, cô vẫn kiên định trung thành với Rossweisse.',
}
SECTION_IDS=['season-5','environment-variables','memory-cards','rossweisse','sig','tiphera-tiana','basin-of-hyperspace','card-skins','divine-epiphany','attire','exploration-passive','nightmare-carnival','nightmare-dream-park','special-unigram','trauma-code','virtual-tactical-simulation','overdrive','combat-training','memory-fragments','packages','card-skin-packs','crystal-reset','improvements','bug-fixes']

def localize_dates(text):
 # Match actual source calendar dates, never the Bind stack limit (1/20).
 return re.sub(r'(?<!\d)(10/21|10/28|11/04|11/03|11/24|11/11|12/02|12/23|9/30)(/2026)?(?!\d)',lambda m: m[1].split('/')[1].zfill(2)+'/'+m[1].split('/')[0].zfill(2)+(m[2] or ''),text)

def build():
 import shutil
 source_html=SOURCE.read_text(encoding='utf-8').split('<div class="entry-content is-layout-flow">',1)[1].split('Read the full article on the official site',1)[0]
 source_html=re.sub(r'<p class="news-source-top".*?</p>','',source_html,flags=re.S)
 source_text=re.sub(r'\s+','',clean(source_html))
 extracted_text=''.join(re.sub(r'\s+','',b['text']) if b['type']=='paragraph' else ''.join(re.sub(r'\s+','',v) for row in b['rows'] for v in row) if b['type']=='table' else '' for b in extract())
 assert source_text==extracted_text,'Extraction omitted article text'
 assert len(re.findall(r'<img\b',source_html))==sum(1 if b['type']=='image' else len(b.get('images',[])) for b in extract()),'Extraction omitted article images'
 translated={}
 for line in TRANSLATIONS.splitlines():
  if '|' in line:
   key,value=line.split('|',1);translated[int(key)]=value.replace('\\n','\n')
 article={'slug':'2026-10-21-update','title':'Thông báo cập nhật 21/10 (Thứ Tư)','description':'Bản dịch đầy đủ thông báo cập nhật 21/10/2026: Thảm Họa Thiên Hà Mùa 5, Rossweisse, Sig, Lễ Hội Ác Mộng, hệ thống mới, cải tiến và sửa lỗi.','date':'2026-10-21','kind':'patch-note','sources':[{'name':'STOVE — thông báo chính thức','url':'https://page.onstove.com/chaoszeronightmare/en/view/14593128'},{'name':'CZN.gg — bản lưu nguồn','url':'https://czn.gg/10-21wed-update-notice/'}],'sections':[{'id':'overview','title':'Thông báo cập nhật','blocks':[{'type':'paragraph','text':'Ngày trong bản dịch được trình bày theo thứ tự ngày/tháng/năm. Các mốc giờ ghi UTC được giữ nguyên theo thông báo nguồn.'}]}]}
 i=0;section_count=0;checks=[];untranslated=[];imgcount=0
 target=ROOT/'public/assets/anni/patch-note';target.mkdir(parents=True,exist_ok=True)
 def imageblock(src,alt=None):
  nonlocal imgcount
  name=Path(src).name
  assert re.fullmatch(r'[a-f0-9]{32}\.(jpg|png|webp)',name),name
  source=SOURCE.parent/src.removeprefix('./')
  assert source.is_file(),source
  shutil.copyfile(source,target/name);imgcount+=1
  result={'type':'image','src':'/assets/anni/patch-note/'+name,'alt':alt or 'Hình minh họa: '+article['sections'][-1]['title']}
  if name in IMAGE_CAPTIONS:result['caption']=IMAGE_CAPTIONS[name]
  return result
 def translate(original):
  nonlocal i
  index=i;i+=1
  result=localize_dates(translated.get(index,fallback(original)))
  # Prose is explicitly translated. Unchanged proper names, numbers and symbols are valid.
  if result==original and re.search(r'\b(the|when|will|increase|after|before|per|with|and|times)\b',original,re.I):untranslated.append((index,original))
  oldnums=re.findall(r'\d+(?:[,.]\d+)*',original)
  newnums=re.findall(r'\d+(?:[,.]\d+)*',result)
  oldnums=[str(int(n)) if n.isdigit() else n for n in oldnums]
  newnums=[str(int(n)) if n.isdigit() else n for n in newnums]
  from collections import Counter
  missing=list((Counter(oldnums)-Counter(newnums)).elements())
  if missing:checks.append((index,missing,original,result))
  return result
 for block in extract():
  if block['type']=='image':article['sections'][-1]['blocks'].append(imageblock(block['src']));continue
  if block['type']=='table':
   rs=[[translate(v) for v in row] for row in block['rows']]
   for icon_index,src in enumerate(block.get('images',[])):article['sections'][-1]['blocks'].append(imageblock(src,'Biểu tượng: '+rs[icon_index+1][1]))
   # Normalization uses source headings to identify continuation layouts.
   original=block['rows'];width=len(original[0]);fixed=[rs[0]]
   for row in rs[1:]:
    prev=fixed[-1]
    if len(row)==width:fixed.append(row)
    elif original[0][0]=='Category':
     fixed.append(prev[:3]+row+prev[4:] if original[0][2]=='Grade' else prev[:2]+row+prev[3:])
    elif original[0][0]=='Achievement':fixed.append(row+['']*(width-len(row)))
    else:fixed.append(prev[:width-len(row)]+row)
   assert all(len(r)==width for r in fixed)
   if fixed[0][0]=='':fixed[0][0]='Nhóm'
   # Table icon cells are rendered as separate images directly above the table.
   if original[0][0]=='Image':
    for row in fixed[1:]:row[0]='Biểu tượng: '+row[1]
   article['sections'][-1]['blocks'].append({'type':'table','headers':fixed[0],'rows':fixed[1:]});continue
  text=translate(block['text'])
  if not text:continue
  if text.startswith('■'):
   title=text.removeprefix('■').strip();sid=SECTION_IDS[section_count];section_count+=1
   article['sections'].append({'id':sid,'title':title,'blocks':[]})
  elif text.startswith('◆'):article['sections'][-1]['blocks'].append({'type':'heading','text':text.removeprefix('◆').strip()})
  else:article['sections'][-1]['blocks'].append({'type':'paragraph','text':text})
 assert section_count==len(SECTION_IDS),(section_count,len(SECTION_IDS))
 assert not untranslated,untranslated
 assert not checks,checks
 out=ROOT/'data/wiki/articles/2026-10-21-update.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(article,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(json.dumps({'text_entries':i,'sections':len(article['sections']),'tables':sum(b['type']=='table' for s in article['sections'] for b in s['blocks']),'images':imgcount,'output':str(out)},ensure_ascii=False))
if __name__=='__main__':build()
