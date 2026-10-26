import type { CardReview } from "../../../lib/wiki/character-guide";

// Prydwen rates Epiphany I-V; base-card entries preserve Neutral and Divine guidance without ratings.
// Editorial summaries are adapted from docs/combatant/prydwen/supplement-source.json.
export const rinEpiphanyReviews: Record<string, CardReview> = {
  c_1018_srt4: {
    review: {
      en: "II adds a hit in Dark Mist Stance and scales well with allied buffs. A Neutral Morale Epiphany can instead improve Rin's more important attacks. Neutral / Divine: Neutral 1 Morale is viable; prioritize 2 Vulnerable or 1 AP divines.",
      vi: "II thêm lần đánh trong Dark Mist Stance và phối hợp tốt với hiệu ứng đồng đội. Epiphany Morale Neutral có thể tăng các đòn quan trọng hơn của Rin. Neutral / Divine: 1 Morale Neutral hữu ích; ưu tiên 2 Vulnerable hoặc 1 AP.",
    },
  },
  c_1018_srt4_rsp1: {
    rating: 4,
    review: {
      en: "Raises Drawing Slash's base damage. It is a solid direct upgrade, but usually scales less than II with team buffs and cannot improve Rin's other attacks like a Neutral Epiphany can.",
      vi: "Tăng sát thương cơ bản của Drawing Slash. Đây là nâng cấp trực tiếp tốt, nhưng thường hưởng lợi từ hiệu ứng đồng đội kém hơn II và không tăng các đòn đánh khác của Rin như Epiphany Neutral.",
    },
  },
  c_1018_srt4_rsp2: {
    rating: 5,
    review: {
      en: "Changes the Dark Mist Stance bonus into one additional hit. This is the strongest option for the card's own damage because the extra hit scales especially well with Rin's usual allied buffs and multi-hit playstyle.",
      vi: "Đổi phần tăng thêm trong Dark Mist Stance thành 1 lần đánh bổ sung. Đây là lựa chọn mạnh nhất cho sát thương của chính lá bài vì nhịp đánh thêm phối hợp rất tốt với hiệu ứng đồng đội và lối chơi nhiều nhịp của Rin.",
    },
  },
  c_1018_srt4_rsp3: {
    rating: 4,
    review: {
      en: "More than doubles the base ratio but requires Dark Mist Stance and removes the former multiplicative bonus. It is strong direct damage, though II normally scales better and Neutral can support Rin's other attacks.",
      vi: "Tăng hơn gấp đôi hệ số cơ bản nhưng bắt buộc có Dark Mist Stance và mất phần tăng sát thương nhân trước đó. Sát thương trực tiếp tốt, dù II thường tăng tiến mạnh hơn và bản Neutral còn hỗ trợ các đòn khác của Rin.",
    },
  },
  c_1018_srt4_rsp4: {
    rating: 4,
    review: {
      en: "Makes the Dark Mist Stance bonus scale with the number of cards in hand. It offers reliable extra damage, but II generally gains more from buffs while a Neutral Epiphany can strengthen the rest of Rin's sequence.",
      vi: "Cho phần tăng thêm trong Dark Mist Stance tăng theo số bài trên tay. Hiệu ứng tăng sát thương ổn định, nhưng II thường hưởng lợi từ hiệu ứng tăng cường tốt hơn, còn bản Neutral có thể tăng cả chuỗi đánh còn lại của Rin.",
    },
  },
  c_1018_srt4_rsp5: {
    rating: 4,
    review: {
      en: "Keeps the stance bonus and greatly raises the base ratio, but changes the card from zero to two AP. The steep cost makes it less practical than II in most rotations despite its high standalone damage.",
      vi: "Giữ phần tăng thêm trong thế đánh và tăng mạnh hệ số cơ bản, nhưng đổi chi phí từ 0 lên 2 AP. Cost cao khiến nó kém thực tế hơn II trong phần lớn vòng bài dù sát thương riêng lớn.",
    },
  },
  c_1018_uni1_rsp1: {
    rating: 1,
    review: {
      en: "Adds a small Shield. The defensive value is situational and is nowhere near the repeated-attack value of Destruction IV, the cornerstone of Rin's strongest damage builds.",
      vi: "Thêm một lượng Shield nhỏ. Giá trị DEF chỉ hữu ích trong vài tình huống và không thể so với khả năng lặp đòn của Destruction IV, nền tảng cho các cách xây dựng sát thương mạnh nhất của Rin.",
    },
  },
  c_1018_uni1: {
    review: {
      en: "IV returns Annihilation and Black Dance for repeated attacks and is central to the recommended builds. Other variants do not replace that loop. Neutral / Divine: 1 AP is the main Divine target; avoid Neutral replacements.",
      vi: "IV đưa Annihilation và Black Dance trở lại để đánh nhiều lần, là cốt lõi các bộ bài đề xuất. Biến thể khác không thay được vòng lặp này. Neutral / Divine: 1 AP là lựa chọn Divine ưu tiên; tránh thay bằng bản Neutral.",
    },
  },
  c_1018_uni1_rsp2: {
    rating: 1,
    review: {
      en: "Draws one Rin card and reduces the cost of that drawn card by one until activated. That modest efficiency cannot compete with Destruction IV returning Rin's two main attacks for repeated use.",
      vi: "Rút 1 lá của Rin và giảm 1 chi phí của lá vừa rút cho đến khi kích hoạt. Mức tiết kiệm đó không thể cạnh tranh với Destruction IV, lá đưa hai đòn đánh chủ lực của Rin trở lại để dùng lặp nhiều lần.",
    },
  },
  c_1018_uni1_rsp3: {
    rating: 1,
    review: {
      en: "Draws one card and gives that card a strong multiplicative damage bonus. The payoff can be useful, but remains far below the full attack loop enabled by Destruction IV.",
      vi: "Rút 1 lá và cho lá đó phần tăng sát thương nhân mạnh. Hiệu ứng có thể hữu ích, nhưng vẫn kém xa toàn bộ vòng lặp Attack mà Destruction IV mở ra.",
    },
  },
  c_1018_uni1_rsp4: {
    rating: 5,
    review: {
      en: "Returns Annihilation and Black Dance whenever it is used, allowing each attack to be replayed once per Destruction IV copy. This is Rin's defining Epiphany and the basis of nearly every high-damage deck.",
      vi: "Đưa Annihilation và Black Dance trở lại mỗi khi sử dụng, cho phép lặp lại từng đòn một lần với mỗi bản Destruction IV. Đây là Epiphany cốt lõi của Rin và nền tảng của gần như mọi bộ bài sát thương cao.",
    },
  },
  c_1018_uni1_rsp5: {
    rating: 1,
    review: {
      en: "Becomes an Upgrade that draws one Rin Attack card at turn start when Dark Mist Stance is active. The automatic draw is convenient but cannot replace Destruction IV's repeated payoff attacks.",
      vi: "Trở thành lá Upgrade, rút 1 bài Attack của Rin đầu lượt nếu đang có Dark Mist Stance. Khả năng tự Draw tiện lợi nhưng không thể thay thế chuỗi đòn chủ lực lặp lại của Destruction IV.",
    },
  },
  c_1018_uni2: {
    review: {
      en: "II's four hits maximize buffed damage but increase AP demands. V reduces the cost of other Rin attacks and is easier to sustain. Neutral / Divine: Neutral 1 Morale scales well because Destruction IV can replay Annihilation repeatedly; also consider 2 Vulnerable or Weakness Attack.",
      vi: "Bốn lần đánh của II tối đa sát thương có tăng sức mạnh nhưng cần nhiều AP. V giảm chi phí các đòn khác của Rin và dễ duy trì hơn. Neutral / Divine: 1 Morale Neutral tăng tiến tốt vì Destruction IV có thể dùng lại Annihilation nhiều lần; cũng nên cân nhắc 2 Vulnerable hoặc Attack điểm yếu.",
    },
  },
  c_1018_uni2_rsp1: {
    rating: 2,
    review: {
      en: "Raises the base damage ratio. Replaying it through Destruction IV is expensive, and with the additive buffs common in Rin teams it normally deals less total damage than the multi-hit II.",
      vi: "Tăng hệ số sát thương cơ bản. Việc dùng lặp qua Destruction IV tốn nhiều AP; với các hiệu ứng tăng cộng thường có trong đội Rin, tổng sát thương thường kém bản II nhiều nhịp.",
    },
  },
  c_1018_uni2_rsp2: {
    rating: 4,
    review: {
      en: "Hits four times in Dark Mist Stance at a lower ratio per hit. It is the best damage option with additive buffs, but repeatedly playing it alongside Black Dance creates a demanding AP requirement.",
      vi: "Đánh 4 lần trong Dark Mist Stance với hệ số mỗi nhịp thấp hơn. Đây là lựa chọn sát thương mạnh nhất khi có hiệu ứng tăng cộng, nhưng dùng lặp cùng Black Dance đòi hỏi rất nhiều AP.",
    },
  },
  c_1018_uni2_rsp3: {
    rating: 3,
    review: {
      en: "Adds 100% Critical Damage and can approach II when few other buffs are available. In the heavily buffed teams Rin usually uses, II scales further, while this option keeps the same high AP demand.",
      vi: "Thêm 100% CRIT DMG và có thể gần bằng II khi đội có ít hiệu ứng tăng cường. Trong đội Rin thường dùng nhiều tăng cường, II tăng tiến tốt hơn, còn lựa chọn này vẫn cần lượng AP cao tương tự.",
    },
  },
  c_1018_uni2_rsp4: {
    rating: 1,
    review: {
      en: "Raises the base ratio and grants a large self-only multiplier, effectively concentrating its damage into one hit. That hit scales poorly with Rin's usual multi-hit buffs, so the other damage options overtake it.",
      vi: "Tăng hệ số cơ bản và cho phần tăng nhân lớn chỉ áp dụng lên chính lá này, dồn sát thương vào một nhịp. Nhịp đánh đó phối hợp kém với các tăng cường nhiều nhịp quen thuộc của Rin nên các lựa chọn sát thương khác vượt trội hơn.",
    },
  },
  c_1018_uni2_rsp5: {
    rating: 4,
    review: {
      en: "Discounts Rin's other Attack cards on their next use, making each Black Dance returned by Destruction effectively free. It greatly eases the rotation's AP cost, trading away considerable damage compared with II or III.",
      vi: "Giảm chi phí các bài Attack khác của Rin ở lần dùng kế tiếp, khiến mỗi Black Dance được Destruction đưa về gần như miễn phí. Vòng bài nhẹ AP hơn nhiều, đổi lại mất đáng kể sát thương so với II hoặc III.",
    },
  },
  c_1018_uni3: {
    review: {
      en: "II draws two Rin cards while preserving Dark Mist Stance. V offers a permanent buff with simpler ordering and removes itself from later draws. Neutral / Divine: Neutral 1 Morale is acceptable; choose the variant before spending on Divines.",
      vi: "II rút hai lá Rin trong khi giữ Dark Mist Stance. V tăng sức mạnh lâu dài, dễ sắp thứ tự hơn và tự rời các lượt rút sau. Neutral / Divine: 1 Morale Neutral là lựa chọn chấp nhận được; ưu tiên đúng biến thể trước khi đầu tư Divine.",
    },
  },
  c_1018_uni3_rsp1: {
    rating: 3,
    review: {
      en: "Doubles the Attack-card buff from 40% to 80%. The bonus is strong, but the card must be played early and Rin may gain more by keeping the Skill in hand for an extra Black Dance hit.",
      vi: "Tăng gấp đôi hiệu ứng cho bài Attack từ 40% lên 80%. Phần tăng thêm mạnh, nhưng cần dùng lá này sớm; đôi khi Rin được lợi hơn nếu giữ bài Skill trên tay để Black Dance thêm một lần đánh.",
    },
  },
  c_1018_uni3_rsp2: {
    rating: 5,
    review: {
      en: "Draws two Rin cards while Dark Mist Stance is active and still retains the stance. Reliable targeted draw is extremely valuable for assembling Rin's required attack sequence, making this the strongest general option.",
      vi: "Rút 2 lá của Rin khi đang có Dark Mist Stance và vẫn duy trì thế đánh. Khả năng rút đúng bài rất quan trọng để ghép chuỗi Attack cần thiết, khiến đây là lựa chọn tổng quát mạnh nhất.",
    },
  },
  c_1018_uni3_rsp3: {
    rating: 3,
    review: {
      en: "Creates a base Annihilation with Ephemeral. It can stay in hand to add a Black Dance hit and be played afterward, but using both the Skill and the created attack costs two extra AP.",
      vi: "Tạo một Annihilation cơ bản có Ephemeral. Có thể giữ lá tạo ra trên tay để Black Dance thêm một lần đánh rồi dùng sau, nhưng tổng chi phí cho bài Skill và đòn đánh được tạo là 2 AP.",
    },
  },
  c_1018_uni3_rsp4: {
    rating: 3,
    review: {
      en: "Grants Dark Mist Stance at the start of each turn. It is mainly useful when end-of-turn allied effects would otherwise remove the stance, and offers little in rotations that already maintain it reliably.",
      vi: "Nhận Dark Mist Stance vào đầu mỗi lượt. Chủ yếu hữu ích khi hiệu ứng đồng đội cuối lượt làm mất thế đánh; đóng góp không nhiều trong vòng bài vốn đã duy trì Dark Mist Stance ổn định.",
    },
  },
  c_1018_uni3_rsp5: {
    rating: 4,
    review: {
      en: "Changes the buff into a permanent 50% increase. It needs no special play order, stays consistent across turns, and thins itself from later draws, making it the comfortable alternative to II.",
      vi: "Đổi hiệu ứng thành tăng vĩnh viễn 50%. Không cần sắp thứ tự dùng bài đặc biệt, duy trì ổn định qua nhiều lượt và tự rời vòng rút bài, nên đây là lựa chọn dễ vận hành thay cho II.",
    },
  },
};
