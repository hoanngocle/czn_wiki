"""Bilingual, concise paraphrases of observed build recommendations."""
import json
from pathlib import Path

ROOT=Path(__file__).parent
NAMES=['Mika','Beryl','Hugo','Cassius','Owen','Adelheid','Rei','Yuki','Chizuru','Diana','Haru']
NAMES += ['Olga','Orlea','Rin','Rita','Selena','Tenebria','Tiphera','Tressa']
source={x['name']:x for x in json.loads((ROOT/'extracted.json').read_text(encoding='utf-8')) if x['name'] in NAMES}
result={name:{'partners':{},'fragments':[None]*len(c['fragments']),'synergies':{}} for name,c in source.items()}
missing={'en':'Listed by Prydwen without a written rationale.','vi':'Prydwen có liệt kê nhưng không nêu lý do cụ thể.'}
for name,c in source.items():
    for p in c['partners']:
        if not p['notesSource'].strip() or p['notesSource'].strip()=='-':result[name]['partners'][p['name']+' '+p['ego']]=missing.copy()
    for s in c['synergies']:
        if not s['notesSource']:result[name]['synergies'][s['name']]=missing.copy()

COMMON='''Nyx E0|Adds draw/discard utility, support stats and a modest team buff at any Ego level.|Thêm tiện ích rút/bỏ bài, chỉ số hỗ trợ và một ít buff toàn đội ở mọi cấp Ego.
Yuri E4|Her off-class passives are inactive, but spending 2 EP to draw 2 remains a useful free option.|Nội tại không hoạt động do khác hệ nghề, nhưng dùng 2 EP rút 2 lá vẫn là lựa chọn miễn phí hữu ích.
Arwen E4|Choose her passive damage reduction when surviving matters more than extra utility.|Chọn giảm sát thương thụ động khi ưu tiên sống sót hơn tiện ích bổ sung.
Alyssa E4|Trades Arwen's mitigation for DEF and passive healing; useful when DEF scaling matters or Arwen is unavailable.|Đổi giảm sát thương của Arwen lấy DEF và hồi máu thụ động; hữu ích khi cần hệ số DEF hoặc chưa có Arwen.
Yvonne E4|A free alternative to Yuri when extra stats matter more than an Ego draw skill.|Thay thế Yuri miễn phí khi coi trọng chỉ số hơn kỹ năng Ego rút bài.'''
for name in ['Mika','Cassius','Rei','Orlea','Tiphera']:
    for line in COMMON.splitlines():
        key,en,vi=line.split('|');result[name]['partners'][key]={'en':en,'vi':vi}

ROWS='''Adelheid|p|Clara E0|Team damage buffs make Clara the preferred support Partner, including at E0.|Buff sát thương toàn đội giúp Clara được ưu tiên cho vai trò hỗ trợ, kể cả E0.
Adelheid|p|Eishlen E0|A defensive fallback with useful stats and an Ego skill that retains Shield.|Phương án thiên phòng thủ với chỉ số hữu ích và kỹ năng Ego giữ lại Lá chắn.
Adelheid|p|Wilhelmina E4|A strong DEF stat substitute, but offers little additional utility.|Thay thế tốt về chỉ số DEF, nhưng ít tiện ích bổ sung.
Adelheid|p|Rachel E4|Her inexpensive Ego draw skill is useful when more defensive stats are unnecessary.|Kỹ năng Ego rút bài ít tốn tài nguyên hữu ích khi không cần thêm chỉ số phòng thủ.
Adelheid|p|Yuri E4|Trades class-matched stats for an inexpensive draw-2 Ego skill.|Đổi chỉ số từ Partner đúng hệ nghề lấy kỹ năng Ego rút 2 lá ít tốn tài nguyên.
Adelheid|f|0|Flexible DEF and HP bonuses work broadly; specialized teams may prefer a four-piece support set.|DEF và HP linh hoạt phù hợp nhiều đội; đội chuyên biệt có thể thích bộ hỗ trợ 4 món hơn.
Adelheid|f|1|Rapidly stacks a team multiplier for Counter and Extra Attacks; provides no such benefit to other damage types.|Nhanh chóng tích buff nhân sát thương Phản công và Đòn đánh thêm toàn đội; không hỗ trợ các dạng sát thương khác.
Adelheid|f|2|A fallback when nobody carries Glory's Reign, though her limited Exhaust access makes activation less convenient.|Phương án khi đội chưa có người mang Glory's Reign, nhưng ít bài Kiệt sức khiến kích hoạt kém thuận tiện.
Adelheid|s|Amir|Blessing triggers Metallization, while Truth Behind a Story adds offensive support.|Phước lành kích hoạt Metallization, còn Truth Behind a Story bổ sung hỗ trợ tấn công.
Adelheid|s|Magna|Counterattack retention and retained Shield help Magna begin turns with stronger counter damage.|Giữ lại Phản công và Lá chắn giúp Magna bắt đầu lượt với sát thương phản công tốt hơn.
Adelheid|s|Heidemarie|Blessing on generated blades adds draw and Shield; retrieving discarded blades supplies more attacks.|Phước lành trên kiếm được tạo bổ sung rút bài và Lá chắn; lấy kiếm đã bỏ lên tay giúp đánh thêm.
Adelheid|s|Nine|Blessing efficiently triggers Counterblade; Nine's Shield multiplier helps Shield skills, though it does not strengthen Blessing itself.|Phước lành kích hoạt Counterblade hiệu quả; buff nhân Lá chắn của Nine hỗ trợ bài tạo Khiên nhưng không tăng Phước lành.
Adelheid|s|Haru|Haru's repeated Retrieve and Move effects trigger Blessing often, while her self-buffs reduce demand for another buffer.|Thu hồi và Chuyển bài liên tục của Haru kích hoạt Phước lành nhiều lần; tự buff giúp giảm nhu cầu hỗ trợ sát thương.
Beryl|p|Nakia E4|A free temporary choice when none of the stronger listed damage Partners are available.|Lựa chọn miễn phí tạm thời khi chưa có Partner gây sát thương mạnh hơn trong danh sách.
Beryl|f|0|An accessible all-purpose damage setup, with performance close to her other leading option.|Bộ sát thương dễ tiếp cận, dùng rộng rãi và có hiệu quả gần lựa chọn hàng đầu còn lại.
Beryl|f|1|Competitive after meeting at least two set conditions for 20% Crit DMG; less unconditional than 2/2/2.|Cạnh tranh khi đạt ít nhất hai điều kiện bộ để có 20% Sát thương Bạo kích; cần điều kiện hơn 2/2/2.
Beryl|s|Orlea|Both can trigger Retain repeatedly, supporting teams built around Contaminated Spore.|Cả hai kích hoạt Giữ lại nhiều lần, hỗ trợ đội hình xoay quanh Contaminated Spore.
Beryl|s|Kayron|His large, infrequent hits suit the Contaminated Spore strategy that support Beryl enables.|Các đòn lớn nhưng ít lần của Kayron hợp chiến thuật Contaminated Spore do Beryl hỗ trợ.
Beryl|s|Nine|Large individual hits make Nine a useful damage dealer for Contaminated Spore support builds.|Các đòn đơn lẻ lớn giúp Nine phù hợp làm chủ lực trong đội hỗ trợ Contaminated Spore.
Beryl|s|Rei|Low-setup permanent Morale helps damage Beryl; their support roles overlap and combine less effectively.|Sĩ khí vĩnh viễn ít cần thiết lập hỗ trợ Beryl gây sát thương; khi cùng hỗ trợ, vai trò dễ trùng lặp.
Cassius|f|0|Core Exhaust cards activate the team buff efficiently; prefer it when no teammate already supplies the set.|Bài Kiệt sức cốt lõi kích hoạt buff toàn đội hiệu quả; ưu tiên khi chưa có đồng đội cung cấp bộ này.
Cassius|f|1|Use the stat-focused alternative if another teammate already fully activates Glory's Reign, whose buff cannot stack.|Dùng phương án tăng chỉ số nếu đồng đội đã kích hoạt đầy đủ Glory's Reign vì buff không cộng dồn.
Cassius|s|Sereniel|His Instinct attacks help Tenacity breaking, and additive buffs plus modest draw fit an optimized Sereniel deck.|Đòn hệ Bản năng hỗ trợ phá Sức bền; buff cộng thêm và lượng rút vừa phải hợp bộ Sereniel đã tối ưu.
Cassius|s|Hugo|Generated skills build Hunt stacks, attacks trigger them, and additive buffs amplify Hugo's Extra Attacks.|Kỹ năng được tạo tích cộng dồn Săn, bài tấn công kích hoạt chúng và buff cộng thêm tăng Đòn đánh thêm của Hugo.
Cassius|s|Selena|Joker helps order-dependent combos; additive buffs reward Selena's many Extra Attacks.|Joker hỗ trợ combo phụ thuộc thứ tự bài; buff cộng thêm tận dụng nhiều Đòn đánh thêm của Selena.
Cassius|s|Heidemarie|Sword Rain III helps complete Triple-1, while her many hits and later damage window benefit from Cassius's buffs.|Sword Rain III giúp hoàn thành Triple-1; nhiều lần đánh và thời điểm gây sát thương muộn tận dụng buff của Cassius.
Cassius|s|Diana|Quietus cards help complete Straight; Cassius adds discard triggers, draw and Morale for Diana's repeated hits.|Bài Tĩnh diệt giúp hoàn thành Straight; Cassius thêm bỏ bài, rút bài và Sĩ khí cho nhiều lần đánh của Diana.
Hugo|p|Tina E4|Retains E0's suitable effects with larger bonuses for a significant investment upgrade.|Giữ hiệu ứng phù hợp của E0 nhưng tăng chỉ số, mang lại nâng cấp đáng kể khi đầu tư.
Hugo|p|Tina E0|His signature Partner offers bonuses that fit his kit particularly well at comparable investment.|Partner đặc trưng có các bonus rất hợp bộ kỹ năng ở mức đầu tư tương đương.
Hugo|p|Nakia E4|A free placeholder when the stronger listed damage Partners are unavailable.|Lựa chọn miễn phí tạm thời khi chưa có Partner sát thương mạnh hơn trong danh sách.
Hugo|f|0|Can approach 2/2/2 damage with two stacks and 20% Crit DMG, but needs its conditions fulfilled.|Có thể gần sát thương 2/2/2 với hai cộng dồn và 20% Sát thương Bạo kích, nhưng phải thỏa điều kiện.
Hugo|f|1|Immediate, broadly reliable stats usually outperform alternatives outside specialized setups.|Chỉ số có tác dụng ngay, ổn định rộng rãi và thường hơn phương án khác ngoài đội hình chuyên biệt.
Hugo|s|Luke|Frequent targeted Bullet attacks provide many opportunities to spend Hugo's Hunt stacks.|Nhiều đòn Đạn chỉ định mục tiêu tạo cơ hội liên tục để dùng cộng dồn Săn của Hugo.
Hugo|s|Tressa|Unsheathe Dagger builds Hunt through a Skill, then generated attacks consume the stacks.|Unsheathe Dagger tích Săn bằng bài Kỹ năng, rồi các đòn được tạo dùng cộng dồn.
Hugo|s|Sereniel|Her frequent attacks drive Hugo; pairing them with Selena also supplies Skills to rebuild Hunt.|Tấn công liên tục của cô kích hoạt Hugo; ghép thêm Selena còn cung cấp Kỹ năng để tích lại Săn.
Hugo|s|Cassius|Quest Skills refill Hunt and Morale boosts Extra Attacks; cost-reduction Divines help combine drawing with buffing.|Kỹ năng Nhiệm vụ tích lại Săn, Sĩ khí tăng Đòn đánh thêm; Divine giảm chi phí giúp vừa rút bài vừa buff.
Hugo|s|Tiphera|Abundant Skills and AP simplify Hunt upkeep, though her single-hit buffs fit Hugo less well than dedicated buffers.|Nhiều Kỹ năng và AP giúp duy trì Săn dễ hơn, nhưng buff một lần đánh ít hợp Hugo hơn hỗ trợ chuyên buff.
Hugo|s|Heidemarie|Sword Rain III supplies a Skill and five attacks that can use maximum Hunt strength before stacks decrease.|Sword Rain III cung cấp một Kỹ năng và năm đòn có thể tận dụng Săn tối đa trước khi cộng dồn giảm.
Mika|f|0|Reliable support stats work across decks and modes unless a specialized effect is required.|Chỉ số hỗ trợ ổn định dùng được nhiều bộ bài và chế độ, trừ khi cần hiệu ứng chuyên biệt.
Mika|f|1|Usable but awkward: most Exhaust access comes from an expensive Ego skill, so another holder is usually preferable.|Dùng được nhưng khó thuận tiện: phần lớn Kiệt sức đến từ Ego đắt, nên thường để nhân vật khác mang.
Mika|s|Nine|Direct AP generation suits Nine better than discounts; Blessing's Shield can also benefit from Nine's Shield buffs.|Tạo AP trực tiếp hợp Nine hơn giảm chi phí; Lá chắn từ Blessing cũng tận dụng buff Lá chắn của Nine.
Mika|s|Veronica|Combines Veronica's heavy draw with abundant AP for comfortable turns, at the cost of offensive buff coverage.|Kết hợp rút nhiều bài của Veronica với AP dồi dào để vận hành dễ, nhưng thiếu hỗ trợ buff sát thương.
Mika|s|Mei Lin|Preserves printed costs for Line of Justice builds that repeatedly use Spire, unlike cost-reduction support.|Giữ chi phí bài cho bộ Line of Justice dùng Spire nhiều lần, khác với hỗ trợ giảm chi phí.
Owen|p|Lilian E0|Adds a low-cost Attack through Ego while retaining personal damage bonuses for hybrid support play.|Ego thêm bài Tấn công ít tốn AP, đồng thời giữ bonus sát thương cá nhân cho lối chơi hỗ trợ lai.
Owen|p|Ritochka E0|The one-turn Morale burst suits one-turn kills once the deck already draws consistently.|Sĩ khí bùng nổ một lượt hợp hạ địch trong một lượt khi bộ bài đã rút ổn định.
Owen|p|Yuri E4|Off-class passives are lost, but a 2-EP draw-2 Ego provides useful free support utility.|Không hưởng nội tại do khác hệ nghề, nhưng Ego 2 EP rút 2 lá là tiện ích hỗ trợ miễn phí hữu ích.
Owen|f|0|DEF and survivability are the usual priorities when Owen fills an endgame support slot.|DEF và khả năng sống sót thường được ưu tiên khi Owen đảm nhận hỗ trợ cuối game.
Owen|f|1|Choose the offensive mix when Owen contributes personal damage, particularly during Chaos runs.|Chọn phối hợp thiên tấn công khi Owen đóng góp sát thương cá nhân, nhất là khi chạy Chaos.
Owen|s|Kayron|An extra hit boosts large attacks despite the penalty; longer fights can expose the pair's draw shortage.|Thêm một lần đánh tăng hiệu quả đòn lớn dù có giảm sát thương; trận dài dễ lộ vấn đề thiếu rút bài.
Owen|s|Nine|Extra hits suit Hew's large multiplier, but a Vulnerable effect that buffs only one hit can lose value.|Thêm lần đánh hợp hệ số lớn của Hew, nhưng Dễ tổn thương chỉ buff một lần đánh có thể giảm hiệu quả.
Owen|s|Mei Lin|Season-2 Herb enables Passion-card sequences for opening burst; reducing Fortitude also benefits her multi-hit attacks.|Herb mùa 2 tạo chuỗi bài hệ Đam mê cho bùng nổ đầu trận; giảm Kiên cường cũng giúp đòn nhiều lần của cô.
Rei|f|0|Her usual Exhaust cards support reliable activation, provided no teammate already supplies the same set buff.|Các bài Kiệt sức thường dùng giúp kích hoạt ổn định, miễn chưa có đồng đội cung cấp cùng buff bộ.
Rei|f|1|The stat alternative avoids duplicating Glory's Reign when another teammate already maintains its non-stacking buff.|Phương án chỉ số tránh trùng Glory's Reign khi đồng đội đã duy trì buff không cộng dồn của bộ này.
Rei|s|Mei Lin|Targeted buffs favor single-Spire opening bursts; cost-based and Basic buffs help too, but support weakens after turn one.|Buff chỉ định hợp bùng nổ đầu trận với một Spire; buff theo chi phí và bài Cơ bản cũng hữu ích, nhưng yếu hơn sau lượt đầu.
Rei|s|Kayron|Provides Exhaust triggers and targeted Void draw, although her damage buffs are less valuable for Kayron.|Cung cấp kích hoạt Kiệt sức và rút chỉ định bài Hư vô, dù buff sát thương ít giá trị hơn với Kayron.
Rei|s|Chizuru|Supports Shadow of the Moon and Moonslash variants; relying on Rei for draw can become difficult after the opening turn.|Hỗ trợ hướng Shadow of the Moon và Moonslash; dựa vào Rei để rút bài có thể khó sau lượt mở đầu.
Yuki|p|Douglas E4|A free interim choice if no stronger listed Partner is available.|Lựa chọn miễn phí tạm thời khi chưa có Partner mạnh hơn trong danh sách.
Yuki|f|0|Broadly reliable damage stats; specialized builds can still prefer a dedicated four-piece effect.|Chỉ số sát thương ổn định trong nhiều trường hợp; bộ bài chuyên biệt vẫn có thể thích hiệu ứng 4 món hơn.
Yuki|f|1|A strong upgrade when most damage comes specifically from cards costing 1 AP.|Nâng cấp mạnh khi phần lớn sát thương đến từ bài có chi phí đúng 1 AP.
Yuki|s|Nia|Adagio enables Inspiration on opening cards; E2 Rhythm Boost and Dimensional Cube can add further damage buffs.|Adagio bật Cảm hứng cho bài mở đầu; Rhythm Boost E2 và Dimensional Cube có thể thêm buff sát thương.
Yuki|s|Cassius|Morale Epiphanies provide efficient buffs, but discounting Devil Dice helps him sustain both draw and buff duties.|Epiphany Sĩ khí buff hiệu quả, nhưng giảm chi phí Devil Dice giúp duy trì cả rút bài lẫn buff.
Yuki|s|Rei|Cost-based buffs, Morale and Glory's Reign support suitable Iceberg or discounted Flash Slash builds.|Buff theo chi phí, Sĩ khí và Glory's Reign hỗ trợ bộ Iceberg hoặc Flash Slash giảm chi phí phù hợp.
Yuki|s|Khalipe|Some Flash Slash builds trigger Celestial; Khalipe adds Shield and can apply AoE Vulnerable through Epiphanies.|Một số bộ Flash Slash kích hoạt Celestial; Khalipe thêm Lá chắn và có thể gây Dễ tổn thương diện rộng qua Epiphany.
Yuki|s|Veronica|An Inspiration-enabling Trickery Strike can replace Nia's role if drawn before Yuki begins her combo.|Trickery Strike có hiệu ứng bật Cảm hứng có thể thay vai trò Nia nếu rút được trước combo của Yuki.
Yuki|s|Narja|Discounting a 2-cost Flash Slash lowers AP pressure and can enable cost-sensitive equipment bonuses.|Giảm chi phí Flash Slash 2 AP giúp bớt áp lực AP và có thể bật bonus trang bị phụ thuộc chi phí.
Chizuru|p|Itsuku E4|The same broadly compatible effects as E0, with larger bonuses for further investment.|Hiệu ứng tương thích rộng như E0 nhưng có bonus cao hơn khi đầu tư thêm.
Chizuru|p|Itsuku E0|A modest lead over comparable alternatives, with the advantage of working across all Chizuru builds.|Nhỉnh hơn vừa phải so với lựa chọn tương đương, với ưu điểm dùng được mọi hướng xây dựng Chizuru.
Chizuru|p|Bria E0|Works in card-generation builds such as Moonslash; avoid her when the deck does not generate cards.|Hợp bộ tạo bài như Moonslash; tránh dùng khi bộ bài không tạo bài.
Chizuru|p|Anteia E4|Solid passive and base stats compensate for a weaker Ego skill without requiring a signature Partner.|Chỉ số cơ bản và nội tại tốt bù Ego yếu hơn, không cần đầu tư Partner đặc trưng.
Chizuru|p|Eloise E4|An accessible Exhaust-compatible option; lower Ego levels lose a substantial part of her value.|Lựa chọn dễ tiếp cận hợp Kiệt sức; cấp Ego thấp hơn mất phần đáng kể hiệu quả.
Chizuru|p|Zatera E4|A free temporary option when the stronger listed Partners are unavailable.|Phương án miễn phí tạm thời khi chưa có Partner mạnh hơn trong danh sách.
Chizuru|f|0|Reliable across her builds, while specialized sets can outperform it under their own conditions.|Ổn định ở nhiều bộ bài; bộ chuyên biệt có thể vượt lên khi thỏa điều kiện riêng.
Chizuru|f|1|Usually trails 2/2/2 because similar additive stats are already supplied by Morale, cards and teammates.|Thường kém 2/2/2 vì chỉ số cộng thêm tương tự đã được Sĩ khí, bài và đồng đội cung cấp.
Chizuru|f|2|Can outperform general sets with discard support; without discard its effect cannot activate.|Có thể hơn bộ phổ thông khi được hỗ trợ bỏ bài; không bỏ bài thì không kích hoạt hiệu ứng.
Chizuru|f|3|A niche choice when 1-cost attacks, typically Shadow of the Moon+, supply most damage.|Lựa chọn chuyên biệt khi bài Tấn công 1 AP, thường là Shadow of the Moon+, gây phần lớn sát thương.
Chizuru|s|Rei|Many buffs fit her cards; Dark Condensation IV scales across turns and Snack Time helps early draw.|Nhiều buff hợp bài của cô; Dark Condensation IV tích lũy qua các lượt, Snack Time hỗ trợ rút bài đầu trận.
Chizuru|s|Narja|Discounts remain useful under Inhibit, while additive and Basic buffs support Chizuru's attacks.|Giảm chi phí vẫn hữu ích khi có Ức chế; buff cộng thêm và bài Cơ bản hỗ trợ đòn đánh Chizuru.
Chizuru|s|Hugo|Moonslash decks alternate Skills and attacks to drive Hunt; Hugo contributes additional draw.|Bộ Moonslash xen Kỹ năng và tấn công để vận hành Săn; Hugo bổ sung rút bài.
Chizuru|s|Luke|Luke's many hits generate Wisps, while Chizuru's attacks strengthen Dance of the Demon II.|Nhiều lần đánh của Luke tạo Ma trơi; đòn của Chizuru tăng sức mạnh Dance of the Demon II.
Chizuru|s|Cassius|Buffing attacks also generate Wisps; discounted Devil Dice makes simultaneous draw and buff support easier.|Đòn buff đồng thời tạo Ma trơi; Devil Dice giảm chi phí giúp vừa rút bài vừa buff dễ hơn.
Diana|p|Sophia E4|Keeps the signature effects while substantially increasing their values over E0.|Giữ hiệu ứng đặc trưng và tăng đáng kể chỉ số so với E0.
Diana|p|Sophia E0|High-value bonuses make the signature Partner a substantial upgrade over alternatives.|Các bonus giá trị cao giúp Partner đặc trưng nâng cấp đáng kể so với lựa chọn thay thế.
Diana|p|Serithea E4|A good invested alternative, but lower base stats and card-only Crit bonuses leave Resonance damage behind Sophia.|Thay thế tốt khi đã đầu tư, nhưng chỉ số thấp hơn và buff Bạo kích chỉ cho bài khiến Cộng hưởng kém Sophia.
Diana|p|Akad E4|Bullet bonuses and a one-turn Crit burst make him especially useful in short fights or one-turn kills.|Bonus Đạn và bùng nổ Bạo kích một lượt đặc biệt hữu ích trong trận ngắn hoặc hạ địch một lượt.
Diana|p|Serithea E0|An entry-level alternative to E4 Akad, with considerably less power than E4 Serithea.|Thay thế khởi đầu cho Akad E4, nhưng sức mạnh thấp hơn đáng kể so với Serithea E4.
Diana|p|Yuri E4|A free starting option with draw utility, later reusable on support characters.|Lựa chọn miễn phí ban đầu có tiện ích rút bài, sau này vẫn dùng được cho nhân vật hỗ trợ.
Diana|f|0|Her frequent discards easily maintain the set's full effect, making it the preferred option.|Bỏ bài thường xuyên dễ duy trì đầy đủ hiệu ứng bộ, nên đây là lựa chọn ưu tiên.
Diana|f|1|Accessible and consistent, but weaker than her well-matched discard set.|Dễ tiếp cận và ổn định, nhưng yếu hơn bộ bỏ bài rất hợp với cô.
Diana|s|Nia|Soul Rip III rewards each discard with Extra Attacks; Nia also supplies useful draw and possible AP generation.|Soul Rip III biến mỗi lần bỏ bài thành Đòn đánh thêm; Nia còn rút bài và có thể tạo AP.
Diana|s|Cassius|Quietus helps fulfill Straight conditions; his Morale, discard and draw all support Diana's attack chain.|Tĩnh diệt giúp thỏa Straight; Sĩ khí, bỏ bài và rút bài của Cassius đều hỗ trợ chuỗi tấn công Diana.
Diana|s|Renoa|Discard and Quietus support can exhaust Dirge Bullets after activation, reducing deck clutter while adding attacks.|Hỗ trợ bỏ bài và Tĩnh diệt có thể khiến Dirge Bullet Kiệt sức sau kích hoạt, giảm nghẽn bộ bài và thêm đòn đánh.
Diana|s|Veronica|Heavy draw helps complete Diana's combo; suitable Divines can also add AP, and both use Extra Attack buffs.|Rút nhiều bài giúp Diana hoàn tất combo; Divine phù hợp còn thêm AP, và cả hai tận dụng buff Đòn đánh thêm.
Diana|s|Selena|Passion attacks trigger extra coordinated hits, while Drone Bombing can add Passion Weakness for Diana.|Đòn hệ Đam mê kích hoạt thêm đòn phối hợp; Drone Bombing có thể tạo Điểm yếu Đam mê cho Diana.
Haru|p|Priscilla E4|Lower listed raw damage, but Anchor Shot can maintain Weakness Attacks across most of Haru's hits.|Sát thương thô trong bảng thấp hơn, nhưng Anchor Shot giúp duy trì Đánh điểm yếu trên phần lớn đòn của Haru.
Haru|p|Douglas E4|A free placeholder until one of the stronger listed damage Partners is available.|Lựa chọn miễn phí tạm thời cho đến khi có Partner sát thương mạnh hơn trong danh sách.
Haru|f|0|A dependable general setup; more specialized sets can win when their cost requirements fit.|Bộ phổ thông đáng tin cậy; bộ chuyên biệt có thể hơn khi khớp yêu cầu chi phí.
Haru|f|1|Best considered when Anchor Shot stays at 2 AP or higher rather than being discounted.|Đáng cân nhắc khi Anchor Shot giữ chi phí từ 2 AP trở lên thay vì được giảm chi phí.
Haru|f|2|Fits decks that discount Anchor Shot and deal most damage with 1-cost cards.|Hợp bộ giảm chi phí Anchor Shot và gây phần lớn sát thương bằng bài 1 AP.
Haru|s|Narja|Persistent discounts reward repeated Anchor Shots, while Voracity and Predation can buff the full sequence.|Giảm chi phí duy trì giúp dùng Anchor Shot nhiều lần; Voracity và Predation có thể buff toàn chuỗi.
Haru|s|Nia|Adagio V assembles Haru's setup; E2 Rhythm Boost and Dimensional Cube can add damage bonuses.|Adagio V tập hợp bài thiết lập cho Haru; Rhythm Boost E2 và Dimensional Cube có thể bổ sung sát thương.
Haru|s|Veronica|Her large draw output helps assemble Haru's complete setup before the main attack sequence.|Rút nhiều bài giúp tập hợp đầy đủ khâu thiết lập của Haru trước chuỗi tấn công chính.
Haru|s|Cassius|Morale Epiphanies offer efficient buffs; cost-reduction Divines help him also sustain the team's draw.|Epiphany Sĩ khí buff hiệu quả; Divine giảm chi phí giúp đồng thời duy trì rút bài cho đội.'''
ROWS += '''
Olga|p|Emilie E4|Improves the same benefits as E0 with substantially stronger values for deeper investment.|Nâng mạnh các hiệu ứng sẵn có ở E0, phù hợp khi đầu tư sâu hơn.
Olga|p|Emilie E0|Her signature supplies valuable bonuses to Olga and teammates, outperforming the listed alternatives.|Partner trấn cung cấp nhiều buff giá trị cho Olga và đồng đội, vượt các phương án thay thế được liệt kê.
Olga|p|Anteia E4|High base stats and passive ATK suit Olga because many Partner effects cannot improve Fracture damage.|Chỉ số nền cao và ATK thụ động hợp Olga vì nhiều hiệu ứng Partner không tăng được sát thương Fracture.
Olga|p|Bria E0|Mainly a stat option: passive ATK helps, while the other effects add little to Olga.|Chủ yếu dùng lấy chỉ số: ATK thụ động hữu ích, các hiệu ứng khác ít đóng góp cho Olga.
Olga|p|Eloise E4|An accessible upgrade over Zatera, but weaker stats and multipliers limit her damage contribution.|Dễ tiếp cận và hơn Zatera, nhưng chỉ số cùng hệ số buff yếu hơn giới hạn đóng góp sát thương.
Olga|p|Zatera E4|A free placeholder when none of the stronger listed Partners is available.|Phương án miễn phí tạm dùng khi chưa có Partner mạnh hơn trong danh sách.
Olga|f|0|Olga activates the effect easily, and its Fracture bonus supports a large share of her damage.|Olga dễ kích hoạt hiệu ứng; buff Fracture hỗ trợ phần lớn sát thương của cô.
Olga|f|1|Slightly weaker than Sanguine Thorn but flexible and reusable across many characters.|Yếu hơn Sanguine Thorn nhưng linh hoạt và dùng chung được cho nhiều nhân vật.
Olga|s|Hugo|Olga's frequent skills feed Commence the Hunt; Hugo supplies draw to sustain her strong buffs.|Kỹ năng dùng thường xuyên của Olga tích Commence the Hunt; Hugo rút bài để duy trì buff mạnh của cô.
Olga|s|Hilde|Heavy draw, including targeted Attack draws, helps Olga set up and also fits Hugo teams.|Rút nhiều bài, kể cả rút đích danh bài Tấn công, giúp Olga thiết lập và hợp đội có Hugo.
Olga|s|Arabella|They amplify each other's Fracture damage, but competing draw and AP requirements can make rotations awkward.|Hai bên tăng sát thương Fracture cho nhau, nhưng cùng cần rút bài và AP nên chuỗi hành động có thể khó vận hành.
Olga|s|Veronica|Combines draw and AP support; Rosaria on Veronica can help Olga's team reach its Morale cap.|Kết hợp hỗ trợ rút bài và AP; Rosaria trên Veronica có thể giúp đội Olga chạm giới hạn Sĩ khí.
Orlea|p|Noel E0|After the nerfs, mainly considered for Chaos and Sortie; save-based modes generally favor Nyx or Yuri's draw.|Sau giảm sức mạnh, chủ yếu cân nhắc cho Chaos và Sortie; chế độ dùng bản lưu thường chuộng rút bài từ Nyx hoặc Yuri.
Orlea|f|0|Core Exhaust and Creation cards activate the team buff easily, unless another ally already supplies it.|Các lá Kiệt sức và Creation cốt lõi dễ kích hoạt buff đội, trừ khi đồng đội đã đảm nhiệm bộ này.
Orlea|f|1|Use flexible two-piece bonuses when another ally already fully activates Glory's Reign, whose buff does not stack.|Dùng các bộ 2 món linh hoạt khi đồng đội đã kích hoạt đủ Glory's Reign vì buff bộ này không cộng dồn.
Orlea|s|Nine|Vulnerable, Softie buffs and Glory's Reign amplify Nine, but the team still needs enough draw and AP.|Dễ tổn thương, buff Softie và Glory's Reign tăng sát thương Nine, nhưng đội vẫn phải đủ rút bài và AP.
Orlea|s|Kayron|Vulnerable and Softie strongly reward Kayron's scaling, though both characters compete for draw and AP.|Dễ tổn thương và Softie hỗ trợ mạnh khả năng tăng tiến của Kayron, nhưng cả hai cạnh tranh tài nguyên rút bài và AP.
Orlea|s|Veronica|Large draw output helps Orlea consistently access the cards needed to exploit Weak Points.|Rút nhiều bài giúp Orlea đều đặn tiếp cận các lá cần để tận dụng Weak Point.
Orlea|s|Beryl|Orlea activates Beryl's Retain effects; their distinct damage buffs can also support another carry together.|Orlea kích hoạt hiệu ứng Giữ lại của Beryl; các loại buff sát thương khác nhau của họ cũng có thể cùng hỗ trợ chủ lực khác.
Orlea|s|Rin|Retained skills keep Black Dance's hand requirement active, while Orlea's buffs also increase Rin's damage.|Kỹ năng được Giữ lại duy trì điều kiện bài trên tay của Black Dance; buff Orlea cũng tăng sát thương Rin.
Orlea|s|Tiphera|Strong AP generation supports Orlea, but combining it with reliable draw requires managing Event Horizon's randomness.|Tạo nhiều AP hỗ trợ Orlea, nhưng muốn đồng thời rút bài ổn định phải xử lý tính ngẫu nhiên của Event Horizon.
Rin|p|Douglas E4|A free temporary option when no stronger listed Partner is available.|Lựa chọn miễn phí tạm thời khi chưa có Partner mạnh hơn trong danh sách.
Rin|f|0|Consistent across builds and modes; specialized four-piece sets can win when their conditions are met.|Ổn định ở nhiều bộ bài và chế độ; bộ 4 món chuyên biệt có thể hơn khi đáp ứng điều kiện.
Rin|f|1|Its damage bonus overlaps with readily available buffs, so the flexible two-piece setup usually performs better.|Buff sát thương trùng nhóm với nhiều nguồn dễ có, nên phối bộ 2 món linh hoạt thường hiệu quả hơn.
Rin|f|2|A Crit Rate option when an ally or mechanic can discard Rin's cards to activate it.|Lựa chọn Tỷ lệ bạo kích khi đồng đội hoặc cơ chế có thể bỏ bài của Rin để kích hoạt.
Rin|f|3|A strong upgrade for decks dealing most of their damage through 1-cost cards.|Nâng cấp mạnh cho bộ bài gây phần lớn sát thương bằng lá có chi phí 1.
Rin|s|Narja|Turn-long discounts remain useful through repeated card plays; Voracity and Predation add supplementary buffs.|Giảm chi phí cả lượt vẫn hữu ích khi dùng lại bài nhiều lần; Voracity và Predation bổ sung buff.
Rin|s|Nia|Adagio V assembles Rin's hand; E2 Rhythm Boost and Dimensional Cube activation add damage bonuses.|Adagio V tập hợp bài cho Rin; Rhythm Boost E2 và kích hoạt Dimensional Cube bổ sung sát thương.
Rin|s|Veronica|Heavy draw collects Rin's required setup cards before her main attack sequence.|Rút nhiều bài giúp gom đủ các lá thiết lập của Rin trước chuỗi tấn công chính.
Rin|s|Orlea|Retained skills maintain the hand condition that boosts Black Dance, with passive buffs each turn.|Kỹ năng Giữ lại duy trì điều kiện bài trên tay để tăng Black Dance, đồng thời cung cấp buff mỗi lượt.
Rita|p|Eloise E4|An accessible Exhaust-compatible option with competitive multipliers; lower Ego levels lose considerable performance.|Lựa chọn dễ tiếp cận hợp bài Kiệt sức với hệ số buff cạnh tranh; cấp Ego thấp giảm hiệu quả đáng kể.
Rita|p|Zatera E4|A free placeholder until a stronger listed Partner becomes available.|Phương án miễn phí tạm dùng cho đến khi có Partner mạnh hơn trong danh sách.
Rita|f|0|Most of Rita's strongest attacks meet the high-cost requirement, making this her usual personal-damage choice.|Phần lớn đòn mạnh của Rita đáp ứng yêu cầu chi phí cao, nên đây thường là lựa chọn tăng sát thương cá nhân.
Rita|f|1|A dependable flexible setup, but optimized four-piece bonuses generally offer more damage.|Bộ linh hoạt đáng tin cậy, nhưng hiệu ứng 4 món được tối ưu thường cho sát thương cao hơn.
Rita|s|Nine|Fate Decreed can replace Fighting Spirit for Hew activation; Time Axis IV supplies Vulnerable for key hits.|Fate Decreed có thể thay Fighting Spirit để kích hoạt Hew; Time Axis IV cung cấp Dễ tổn thương cho đòn quan trọng.
Rita|s|Tiphera|High AP output and attack multipliers support demanding carry builds; supplementary draw remains subject to randomness.|Tạo nhiều AP và buff nhân sát thương hỗ trợ bộ chủ lực tốn tài nguyên; lượng rút bài bổ sung vẫn phụ thuộc ngẫu nhiên.
Rita|s|Mika|Reliable, accessible AP generation and substantial healing help Rita run her chosen rotation consistently.|Tạo AP ổn định, dễ tiếp cận cùng hồi máu lớn giúp Rita vận hành chuỗi hành động đều đặn.
Rita|s|Rei|Basic Attack buffs suit Rita's high ratios; repeating the same buff extends duration rather than increasing its strength.|Buff Tấn công cơ bản hợp hệ số cao của Rita; lặp cùng buff kéo dài thời gian thay vì tăng độ mạnh.
Rita|s|Haru|Targeted 2-cost draw and automatic plays ease Anchor Shot IV's setup; Time Axis IV adds situational Vulnerable support.|Rút đích danh bài chi phí 2 và tự dùng bài giảm gánh thiết lập Anchor Shot IV; Time Axis IV bổ sung Dễ tổn thương khi cần.
Rita|s|Orlea|Softie amplifies Rita's large attack ratios, while additional Vulnerable helps carry builds with fewer Time Axis copies.|Softie khuếch đại hệ số tấn công cao của Rita; thêm Dễ tổn thương giúp bộ chủ lực có ít bản Time Axis hơn.
Selena|p|Nakia E4|A free fallback when none of the stronger listed Partners is available.|Phương án miễn phí dự phòng khi chưa có Partner mạnh hơn trong danh sách.
Selena|f|0|A stable, accessible setup across builds; specialized options can surpass it in their intended conditions.|Bộ ổn định, dễ tiếp cận ở nhiều lối chơi; lựa chọn chuyên biệt có thể hơn khi đúng điều kiện.
Selena|f|1|Damage is close to the flexible setup, but reaching its conditional stacks makes it less immediate.|Sát thương gần bộ linh hoạt, nhưng cần tích cộng dồn theo điều kiện nên không phát huy ngay.
Selena|f|2|A Crit Rate alternative when another character or mechanic discards Selena's cards.|Phương án Tỷ lệ bạo kích khi nhân vật khác hoặc cơ chế hỗ trợ bỏ bài của Selena.
Selena|s|Sereniel|Additional Ravages enable more Homing Lasers, while coordinated attacks multiply hits after Selena sets them up.|Thêm lần Phá vỡ tạo cơ hội dùng thêm Homing Laser; đòn phối hợp tăng số lần đánh sau khi Selena thiết lập.
Selena|s|Cassius|Morale buffs and draw fit Selena; Sereniel teams gain extra synergy, but Divine AP or discounts often matter.|Buff Sĩ khí và rút bài hợp Selena; đội Sereniel có thêm tương tác, nhưng thường cần Divine AP hoặc giảm chi phí.
Selena|s|Rei|Accessible Morale buffs help both Selena and Sereniel without requiring Divine Epiphanies.|Buff Sĩ khí dễ tiếp cận hỗ trợ cả Selena lẫn Sereniel mà không cần Divine Epiphany.
Selena|s|Heidemarie|Repeated blade attacks trigger Selena's coordinated attacks, and Passion Weakness Imprint improves their synergy.|Các đòn kiếm liên tục kích hoạt đòn phối hợp Selena; Khắc Điểm yếu Passion tăng hiệu quả phối hợp.
Tenebria|p|Aria E4|Strengthens the same signature benefits as E0 for a substantial improvement at high investment.|Tăng mạnh các hiệu ứng trấn sẵn có ở E0, đem lại cải thiện lớn khi đầu tư cao.
Tenebria|p|Aria E0|The signature's varied damage bonuses make it the strongest listed option even at E0.|Nhiều loại buff sát thương từ Partner trấn giúp đây là lựa chọn mạnh nhất được liệt kê, ngay ở E0.
Tenebria|p|Bria E0|Chosen mainly for higher base stats; Bria, Ivy and Itsuku provide little meaningful passive synergy here.|Chủ yếu chọn vì chỉ số nền cao; Bria, Ivy và Itsuku ít có tương tác nội tại đáng kể trong trường hợp này.
Tenebria|p|Eloise E4|An accessible stat option when avoiding higher-rarity pulls; her passive and Ego skill have little synergy.|Lựa chọn lấy chỉ số dễ tiếp cận khi không muốn quay Partner hiếm hơn; nội tại và kỹ năng Ego ít tương tác.
Tenebria|p|Zatera E4|A free stopgap if none of the stronger listed Partners is available.|Phương án miễn phí tạm thời nếu chưa có Partner mạnh hơn trong danh sách.
Tenebria|p|Eloise E0|Weak initially but a better long-term investment than Zatera as additional Ego copies become available.|Ban đầu yếu nhưng đáng đầu tư lâu dài hơn Zatera khi có thêm bản để nâng Ego.
Tenebria|f|0|The reliable general damage setup; only particular specialist scenarios favor alternatives.|Bộ sát thương phổ thông đáng tin cậy; chỉ một số tình huống chuyên biệt ưu tiên phương án khác.
Tenebria|f|1|Extra Crit Rate when allied discard or Rhythm Fortissimo's Linked effect can activate the set.|Thêm Tỷ lệ bạo kích khi bỏ bài từ đồng đội hoặc Liên kết của Rhythm Fortissimo có thể kích hoạt bộ.
Tenebria|s|Rei|Activates Basics together and supplies multipliers; different buff variants are needed, and later turns still need draw support.|Kích hoạt bài Cơ bản cùng lúc và cung cấp buff nhân; cần các biến thể buff khác nhau, các lượt sau vẫn cần hỗ trợ rút bài.
Tenebria|s|Nia|Forbidden: Hunger supports AP and draw; Adagio into G-Chord can play expensive cards more cheaply.|Forbidden: Hunger hỗ trợ AP và rút bài; Adagio nối G-Chord có thể dùng bài đắt với chi phí thấp hơn.
Tenebria|s|Veronica|Draw and Divine AP address both resource needs, though further AP Divines may still be necessary.|Rút bài và Divine AP đáp ứng cả hai nhu cầu tài nguyên, nhưng có thể vẫn cần thêm Divine AP.
Tenebria|s|Narja|Basic Attack buffs and persistent discounts reward repeated expensive plays, but Narja provides no innate draw.|Buff Tấn công cơ bản và giảm chi phí duy trì hỗ trợ dùng lại bài đắt, nhưng Narja không có rút bài sẵn trong bộ kỹ năng.
Tenebria|s|Mei Lin|Rhythm conversion and frequent Passion plays enable dual damage, but AP, draw and boss Elasticity constrain the setup.|Chuyển đổi Rhythm và dùng nhiều bài Passion hỗ trợ hai chủ lực, nhưng AP, rút bài và Elasticity của trùm hạn chế bộ này.
Tiphera|p|Tiana E0|Wide team buffs make the signature preferred, unless the strategy specifically requires a Partner's draw skill.|Nhiều buff đội giúp Partner trấn được ưu tiên, trừ khi chiến thuật bắt buộc cần kỹ năng rút bài của Partner.
Tiphera|f|0|Her Exhaust-heavy rotation activates Glory's Reign naturally, making her a priority holder of its team buff.|Chuỗi hành động nhiều bài Kiệt sức kích hoạt Glory's Reign tự nhiên, nên ưu tiên để cô mang buff đội từ bộ này.
Tiphera|s|Nine|Frequent Exhaust enables Hew interactions; AP generation and attack multipliers support Nine's single-hit damage.|Kiệt sức thường xuyên tạo tương tác với Hew; tạo AP và buff nhân hỗ trợ sát thương đơn đòn của Nine.
Tiphera|s|Kayron|Form Convergence IV clears Futility while her AP and attack buffs help sustain Kayron's scaling.|Form Convergence IV dọn Futility; AP và buff tấn công giúp duy trì khả năng tăng tiến của Kayron.
Tiphera|s|Hugo|Generated skills feed Commence the Hunt; Hugo's draw complements her AP generation when enough attacks are available.|Kỹ năng được tạo tích Commence the Hunt; rút bài của Hugo bổ trợ tạo AP khi có đủ bài tấn công.
Tiphera|s|Veronica|Large draw output gives access to the right play order and reduces dependence on Divine Draw rolls.|Rút nhiều bài giúp sắp đúng thứ tự hành động và giảm phụ thuộc vào kết quả Divine rút bài.
Tressa|p|Anteia E4|Solid base and passive stats offer a non-signature option despite an unimpressive Ego skill.|Chỉ số nền và thụ động tốt tạo phương án ngoài Partner trấn, dù kỹ năng Ego không nổi bật.
Tressa|p|Eloise E4|An accessible Exhaust-compatible choice with useful multipliers; lower Ego levels perform considerably worse.|Lựa chọn dễ tiếp cận hợp Kiệt sức với hệ số buff hữu ích; cấp Ego thấp hiệu quả kém đáng kể.
Tressa|p|Zatera E4|A free temporary Partner when no stronger listed option is available.|Partner miễn phí tạm dùng khi chưa có lựa chọn mạnh hơn trong danh sách.
Tressa|f|0|A Crit Rate option if an ally or mechanic can discard Tressa's cards to activate it.|Lựa chọn Tỷ lệ bạo kích nếu đồng đội hoặc cơ chế có thể bỏ bài Tressa để kích hoạt.
Tressa|f|1|A consistent general damage setup, with specialist sets potentially stronger in narrower situations.|Bộ sát thương phổ thông ổn định; bộ chuyên biệt có thể mạnh hơn trong tình huống hẹp.
Tressa|s|Cassius|Morale or Agony Epiphanies support different builds; Divine cost reduction helps Cassius also supply draw.|Epiphany Sĩ khí hoặc Agony hỗ trợ các lối chơi khác nhau; Divine giảm chi phí giúp Cassius đồng thời cung cấp rút bài.
Tressa|s|Rei|Combines useful 1-cost, Void and Morale buffs with the team bonus from Glory's Reign.|Kết hợp buff bài chi phí 1, Void và Sĩ khí hữu ích cùng buff đội từ Glory's Reign.
Tressa|s|Hugo|Skill-generated attacks build and trigger Hugo's Extra Attacks, while his draw supports Tressa's rotation.|Tấn công tạo từ kỹ năng tích và kích hoạt Đòn đánh thêm của Hugo; rút bài của anh hỗ trợ chuỗi hành động Tressa.'''
for line in ROWS.splitlines():
    name,kind,key,en,vi=line.split('|')
    note={'en':en,'vi':vi}
    if kind=='f':result[name]['fragments'][int(key)]=note
    else:result[name]['partners' if kind=='p' else 'synergies'][key]=note
for name,c in source.items():
    assert set(result[name]['partners'])=={p['name']+' '+p['ego'] for p in c['partners']},name
    assert all(result[name]['fragments']),name
    assert set(result[name]['synergies'])=={s['name'] for s in c['synergies']},name
(ROOT/'build-notes-b.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({name:{key:len(value) for key,value in rec.items()} for name,rec in result.items()}))
