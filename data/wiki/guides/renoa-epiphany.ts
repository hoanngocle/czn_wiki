import type { GuideText } from "../../../lib/wiki/character-guide";

// Ratings and editorial summaries checked against docs/renoa/card.html.
// Prydwen rates I–V only; base cards intentionally have no entry.
export const renoaEpiphanySource = "https://www.prydwen.gg/chaos-zero-nightmare/characters/renoa#cards";

type EpiphanyReview = { rating: number; review: GuideText };

export const renoaEpiphanyReviews: Record<string, EpiphanyReview> = {
  c_1041_srt4_rsp1: {
    rating: 2,
    review: {
      en: "Creates two Dirge Bullets. A useful upgrade, but its one regular attack and two Extra Attacks usually scale worse than IV's three bullets in a build focused on Extra Attack damage.",
      vi: "Tạo 2 lá Dirge Bullet. Đây là nâng cấp hữu ích, nhưng 1 đòn đánh thường cùng 2 Extra Attack thường hưởng lợi từ cách xây dựng Extra Attack kém hơn 3 đạn của Epiphany IV.",
    },
  },
  c_1041_srt4_rsp2: {
    rating: 3,
    review: {
      en: "Creates one bullet in hand and two in the discard pile, giving an Attack card a high damage ceiling. Recovering the discarded bullets is awkward in normal rotations; it mainly suits one-turn burst setups using Nia's or Renoa's Ego Skill.",
      vi: "Tạo 1 Bullet trên tay và 2 Bullet trong Discard Pile, giúp lá Attack có trần sát thương cao. Khó tận dụng số Bullet trong Discard Pile ở vòng bài thông thường; phù hợp hơn với đội dồn sát thương trong một lượt dùng Ego Skill của Nia hoặc Renoa.",
    },
  },
  c_1041_srt4_rsp3: {
    rating: 1,
    review: {
      en: "Creates one bullet and discards two from the draw pile. Reliable rotations should avoid accumulating bullets there, while one-turn burst builds have stronger options such as II. This Epiphany is not recommended.",
      vi: "Tạo 1 Bullet và bỏ 2 Bullet từ Draw Pile. Vòng bài ổn định nên tránh để Bullet tích tụ ở đó, còn đội dồn sát thương trong một lượt có lựa chọn mạnh hơn như Epiphany II. Không khuyến nghị Epiphany này.",
    },
  },
  c_1041_srt4_rsp4: {
    rating: 5,
    review: {
      en: "Becomes a Skill that creates three bullets. The default for most carry builds: its three-bullet generation pairs directly with Flower of Devoured Fate I, which discards and replaces up to three cards.",
      vi: "Trở thành lá Skill tạo 3 Bullet. Đây là lựa chọn chính cho phần lớn cách xây dựng sát thương chủ lực: tạo 3 Bullet kết hợp rất tốt với Flower of Devoured Fate I, lá bài bỏ rồi tạo Bullet thay cho tối đa 3 lá.",
    },
  },
  c_1041_srt4_rsp5: {
    rating: 3,
    review: {
      en: "Creates a bullet when played and at the start of each turn. Especially useful for draw support, since it activates Flower IV's bonus draw condition. That build usually wants a Divine cost reduction on Flower IV to keep its AP demand manageable.",
      vi: "Tạo 1 Bullet khi dùng và vào đầu mỗi lượt. Đặc biệt hữu ích cho vai trò hỗ trợ Draw vì đáp ứng điều kiện rút thêm của Flower IV. cách xây dựng này thường cần Divine giảm chi phí cho Flower IV để kiểm soát lượng AP tiêu thụ.",
    },
  },
  c_1041_uni1_rsp1: {
    rating: 2,
    review: {
      en: "Raises the card's direct damage. Most Renoa builds invest in Extra Attacks from discarding bullets, so a modest increase to a regular Attack card contributes relatively little to their main damage plan.",
      vi: "Tăng sát thương trực tiếp của lá bài. Phần lớn cách xây dựng Renoa tập trung vào Extra Attack khi bỏ đạn, nên mức tăng vừa phải cho một lá Attack thông thường đóng góp khá ít vào nguồn sát thương chính.",
    },
  },
  c_1041_uni1_rsp2: {
    rating: 1,
    review: {
      en: "Discards a Dirge Bullet from the draw pile. This depends on bullets remaining in a place that well-managed, sustained rotations normally try to keep clear, making the effect unreliable outside specialized burst setups.",
      vi: "Bỏ 1 Dirge Bullet từ Draw Pile. Hiệu ứng phụ thuộc vào Bullet nằm ở nơi mà các vòng bài dài, được quản lý tốt thường cố giữ thông thoáng, nên khó dùng ổn định ngoài những đội dồn sát thương chuyên biệt.",
    },
  },
  c_1041_uni1_rsp3: {
    rating: 2,
    review: {
      en: "Adds a second hit and Exhausts one bullet from the graveyard, helping control bullet buildup. Ballad V already removes every bullet there, so this offers little additional utility when that Epiphany is part of the deck.",
      vi: "Thêm lần đánh thứ hai và Exhaust 1 Bullet trong nghĩa địa, giúp hạn chế Bullet tích tụ. Ballad V đã loại bỏ toàn bộ Bullet tại đó, nên Epiphany này ít bổ sung giá trị nếu bộ bài đã có Ballad V.",
    },
  },
  c_1041_uni1_rsp4: {
    rating: 3,
    review: {
      en: "Costs two AP and triggers an Extra Attack when discarded. It acts like an additional, stronger bullet and can support dedicated loops with Adagio, allowing its discard attack to trigger repeatedly within a turn.",
      vi: "Tốn 2 AP và gây Extra Attack khi Discarded. Có thể xem như thêm một viên Bullet mạnh hơn; kết hợp với Adagio để xây vòng lặp chuyên biệt, kích hoạt đòn đánh khi bỏ lá này nhiều lần trong một lượt.",
    },
  },
  c_1041_uni1_rsp5: {
    rating: 5,
    review: {
      en: "Becomes an Upgrade with a passive Extra Attack at the end of each turn. Usually the preferred option: it benefits from Renoa's Extra Attack investment, delivers recurring damage, and leaves the draw cycle after being played.",
      vi: "Trở thành lá Upgrade gây Extra Attack thụ động cuối mỗi lượt. Common là lựa chọn ưu tiên vì tận dụng cách xây dựng Extra Attack của Renoa, gây sát thương lặp lại và rời vòng Draw sau khi dùng.",
    },
  },
  c_1041_uni2_rsp1: {
    rating: 2,
    review: {
      en: "Improves its own damage bonus, but the increase is small. It retains the base card's demanding setup and generally contributes less than the more specialized Epiphany options.",
      vi: "Tăng phần tăng thêm sát thương của chính lá bài nhưng mức tăng nhỏ. Vẫn cần thiết lập khá nhiều như bản gốc, nên thường đóng góp ít hơn các Epiphany có vai trò chuyên biệt.",
    },
  },
  c_1041_uni2_rsp2: {
    rating: 2,
    review: {
      en: "Retrieves up to three bullets into the hand, but its best cases often depend on awkward rotations. Played bullets already Exhaust themselves and cannot be recovered from the graveyard; Ballad V handles consistency more effectively.",
      vi: "Lấy tối đa 3 đạn về tay, nhưng tình huống tận dụng tốt thường gắn với vòng bài thiếu tối ưu. Bullet đã được đánh sẽ tự Exhaust nên không thể lấy từ nghĩa địa; Ballad V giúp duy trì vòng bài ổn định hiệu quả hơn.",
    },
  },
  c_1041_uni2_rsp3: {
    rating: 3,
    review: {
      en: "Applies Mark for each bullet in hand. A hand full of bullets can turn this into a strong finishing card, but reaching that ceiling takes careful setup, so it mainly fits one-turn burst strategies.",
      vi: "Gắn Mark theo số Bullet trên tay. Khi tay có nhiều Bullet, đây có thể là lá kết liễu mạnh, nhưng cần chuẩn bị kỹ để đạt hiệu quả tối đa; chủ yếu phù hợp với chiến thuật dồn sát thương trong một lượt.",
    },
  },
  c_1041_uni2_rsp4: {
    rating: 3,
    review: {
      en: "Provides a large one-turn boost to bullet Extra Attacks. Strong for burst, but choosing it gives up Ballad V's bullet cleanup. Running both requires duplication and Epiphany-changing tools, taking resources away from another important card.",
      vi: "Tăng mạnh sát thương Extra Attack của Bullet trong 1 lượt. Mạnh khi dồn sát thương, nhưng chọn nó đồng nghĩa mất khả năng dọn Bullet của Ballad V. Muốn dùng cả hai cần nhân bản và công cụ đổi Epiphany, tiêu tốn tài nguyên dành cho lá quan trọng khác.",
    },
  },
  c_1041_uni2_rsp5: {
    rating: 5,
    review: {
      en: "Exhausts every bullet in the graveyard and gains damage for each one removed. The general-use recommendation because it prevents bullet buildup from ruining repeated rotations. Burst-only setups can favor IV when long-term deck cleanup matters less.",
      vi: "Exhaust toàn bộ Bullet trong nghĩa địa và tăng sát thương theo số Bullet đã loại. Đây là lựa chọn phổ dụng vì ngăn Bullet tích tụ làm hỏng các vòng bài tiếp theo. Đội chỉ dồn sát thương có thể ưu tiên IV khi ít cần dọn bộ bài về lâu dài.",
    },
  },
  c_1041_uni3_rsp1: {
    rating: 5,
    review: {
      en: "Raises the discard-and-create limit to three. The primary recommendation for carry play: it triggers the bullets already in hand while generating replacements, making it central to Renoa's repeating damage loop.",
      vi: "Nâng giới hạn Discard rồi tạo đạn lên 3. Đây là lựa chọn chính cho lối chơi sát thương chủ lực: vừa kích hoạt đạn sẵn trên tay vừa tạo đạn thay thế, trở thành trung tâm vòng lặp sát thương của Renoa.",
    },
  },
  c_1041_uni3_rsp2: {
    rating: 2,
    review: {
      en: "An Exhaust option that discards allied Combatant cards to generate bullets. It can help a one-turn burst setup, especially with allies who want their cards discarded, but does not directly serve Renoa's usual plan of discarding her own bullets.",
      vi: "Lá có Exhaust, bỏ bài của Combatant đồng đội để tạo đạn. Có thể dùng khi dồn sát thương trong một lượt, nhất là với đồng đội muốn bài Discarded, nhưng không trực tiếp hỗ trợ cách chơi thông thường của Renoa là bỏ đạn của chính mình.",
    },
  },
  c_1041_uni3_rsp3: {
    rating: 2,
    review: {
      en: "Trades bullet generation for a bonus to the next card, based on discarded one-cost cards. It lets Renoa act as a buffer, but this is weaker than dedicated buff supports such as Rei or Cassius.",
      vi: "Đổi khả năng tạo Bullet lấy phần tăng thêm cho lá tiếp theo, dựa trên số lá chi phí 1 đã bỏ. Giúp Renoa đảm nhiệm vai trò tăng sát thương cho đồng đội, nhưng hiệu quả thấp hơn hỗ trợ hiệu ứng tăng cường chuyên dụng như Rei hoặc Cassius.",
    },
  },
  c_1041_uni3_rsp4: {
    rating: 4,
    review: {
      en: "Draws three cards when a Dirge Bullet is in hand. This high draw output enables a dedicated support build; Echo V reliably supplies the bullet needed to activate the additional draw.",
      vi: "Rút 3 lá khi trên tay có Dirge Bullet. Lượng rút lớn giúp xây Renoa thành hỗ trợ Draw chuyên dụng; Echo V cung cấp ổn định viên Bullet cần để kích hoạt hiệu ứng rút thêm.",
    },
  },
  c_1041_uni3_rsp5: {
    rating: 3,
    review: {
      en: "Grants Retrieve to all bullets in hand. Powerful setups can discard the same bullets repeatedly in one turn, but execution is difficult and choosing this often sacrifices Flower I, Renoa's main bullet-generation tool.",
      vi: "Cho toàn bộ Bullet trên tay hiệu ứng Retrieve. Một số đội mạnh có thể bỏ cùng số Bullet nhiều lần trong một lượt, nhưng vận hành khó và thường phải đánh đổi Flower I, công cụ tạo Bullet chủ chốt của Renoa.",
    },
  },
};
