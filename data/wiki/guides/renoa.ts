// Editorial summaries of the user-provided Prydwen snapshots in docs/renoa.
// Keep these separate from the E7BOT game data: recommendations are dated opinions.
export type GuideText = { en: string; vi: string };
const text = (en: string, vi: string): GuideText => ({ en, vi });

export const renoaSource = {
  name: "Prydwen",
  url: "https://www.prydwen.gg/chaos-zero-nightmare/characters/renoa",
  updated: "2026-03-15",
  files: ["docs/renoa/card.html", "docs/renoa/review.html", "docs/renoa/build.html", "docs/renoa/deck.html"],
};

export const review = {
  intro: text("A Void Hunter who turns discarded Dirge Bullets into Extra Attacks. Renoa rewards planning: generate bullets, amplify their damage, then discard them before cleaning up the deck.", "Hunter hệ Void, biến Dirge Bullet bị Discard thành Extra Attack. Renoa cần sắp xếp lượt chơi: tạo đạn, tăng sát thương, Discard để kích hoạt đòn đánh rồi dọn bớt đạn trong bộ bài."),
  profile: [
    { label: text("Single-target damage", "Sát thương đơn mục tiêu"), score: 3 },
    { label: text("AoE damage", "Sát thương diện rộng"), score: 2 },
    { label: text("AP efficiency", "Hiệu quả AP"), score: 4 },
    { label: text("Draw efficiency", "Hiệu quả rút bài"), score: 4 },
  ],
  pros: [
    text("Strong single-target burst and personal scaling through Dirge Bullets.", "Dồn sát thương đơn mục tiêu tốt; sức mạnh tăng theo lượng Dirge Bullet."),
    text("Several Epiphanies unlock substantially different playstyles.", "Nhiều Epiphany có thể thay đổi hẳn cách chơi."),
    text("Frequent hits and Extra Attacks benefit greatly from Morale and additive buffs.", "Nhiều hit và Extra Attack tận dụng rất tốt Morale cùng các buff cộng sát thương."),
  ],
  cons: [
    text("No AoE cards in her kit.", "Bộ kỹ năng không có card đánh diện rộng."),
    text("Unmanaged Dirge Bullets clog the deck and disrupt later rotations.", "Dirge Bullet dư thừa dễ làm nghẽn bộ bài và gián đoạn các lượt sau."),
    text("Needs careful timing between bullet generation, Ego Skill and damage payoffs.", "Cần căn thời điểm tạo đạn, dùng Ego Skill và tung card gây sát thương."),
  ],
  mechanics: [
    { title: "Dirge Bullet", body: text("The base card costs 1 AP, deals 160% damage and Exhausts when played. Discarding it instead triggers a 120% Extra Attack on a random enemy, including the end-of-turn discard. Potential upgrades can raise these values.", "Card gốc tốn 1 AP, gây 160% sát thương và Exhaust khi được đánh ra. Khi bị Discard, kể cả cuối lượt, nó kích hoạt Extra Attack 120% lên kẻ địch ngẫu nhiên. Các nâng cấp Potential có thể tăng những giá trị này.") },
    { title: text("Generate → Discard → Clear", "Tạo đạn → Discard → Dọn bài"), body: text("Generate bullets with Echo of Sorrow and Flower of Devoured Fate. Discard them to trigger Extra Attacks, then use Ballad of Pitch Black V to Exhaust bullets in the Graveyard before they cycle back into your hand.", "Dùng Echo of Sorrow và Flower of Devoured Fate để tạo đạn. Discard đạn để kích hoạt Extra Attack, sau đó dùng Ballad of Pitch Black V để Exhaust đạn trong Graveyard trước khi chúng quay lại tay.") },
    { title: text("Damage carry or draw support", "Gây sát thương hoặc hỗ trợ rút bài"), body: text("Carry builds emphasize repeated discards and additive buffs. Draw builds use Echo V to maintain a bullet in hand and Flower IV to draw three cards; reducing Flower IV's cost is highly recommended.", "Build sát thương tập trung Discard liên tục và nhận buff cộng sát thương. Build rút bài dùng Echo V để duy trì đạn trên tay, giúp Flower IV rút 3 lá; rất nên có hiệu ứng giảm cost cho Flower IV.") },
  ],
};

export const partners = [
  { name: "Kiara E4", score: "123.00%", note: text("Highest result in the saved comparison.", "Kết quả cao nhất trong bảng so sánh của bản lưu.") },
  { name: "Serithea E4", score: "119.71%", note: text("Hunter Battle Pass partner with valuable CRIT Rate and CRIT DMG passives.", "Partner Hunter từ Battle Pass, có chỉ số CRIT Rate và CRIT DMG hữu ích.") },
  { name: "Kiara E0", score: "111.51%", note: text("Signature option at E0.", "Lựa chọn Partner trấn ở E0.") },
  { name: "Akad E4", score: "107.85%", note: text("Alternative in the source comparison.", "Lựa chọn thay thế trong bảng so sánh của nguồn.") },
  { name: "Yuri E4", score: "100.00%", note: text("Accessible F2P starting choice; can later move to a support.", "Lựa chọn F2P để bắt đầu; sau này có thể chuyển sang nhân vật hỗ trợ.") },
  { name: "Akad E0", score: "98.96%", note: text("Slightly below the Yuri E4 baseline in this comparison.", "Thấp hơn một chút so với mốc Yuri E4 trong phép so sánh này.") },
];

export const fragments = [
  { name: "Prelude to a Hero (4) + Executioner's Tool (2)", score: "101.27%", note: text("Discarding readily activates its CRIT Rate bonus, making this a strong general choice.", "Dễ kích hoạt bonus CRIT Rate nhờ Discard, phù hợp với nhiều cách chơi.") },
  { name: "Conquerer's Aspect (4) + Executioner's Tool (2)", score: "100.00%", note: text("Dirge Bullets count as 1-cost cards even when discarded, benefiting from its CRIT DMG bonus.", "Dirge Bullet vẫn được tính là card cost 1 khi bị Discard, nên hưởng bonus CRIT DMG của bộ này.") },
  { name: "Executioner's Tool (2) + Black Wing (2) + Flex (2)", score: "99.78%", note: text("An accessible, consistent option while assembling stronger four-piece sets.", "Lựa chọn dễ ghép và ổn định trong lúc hoàn thiện bộ 4 món tốt hơn.") },
];

export const stats = [
  { name: "Ideal", value: "CRIT Rate > CRIT DMG" },
  { name: "Desire", value: "Void DMG% > ATK%" },
  { name: "Imagination", value: "ATK%" },
  { name: "Substats", value: "Extra ATK DMG% ≥ CRIT Rate% > CRIT DMG% > ATK > ATK%" },
];
export const critNote = text("Aim for the Potential 7 CRIT Rate threshold on the character screen. The guide calls it 60%, while the saved skill text says greater than 60%; follow the in-game condition when tuning your final stats.", "Hướng tới ngưỡng CRIT Rate của Potential 7 trên màn hình nhân vật. Phần hướng dẫn ghi mốc 60%, còn mô tả kỹ năng trong bản lưu ghi lớn hơn 60%; hãy theo điều kiện hiển thị trong game khi chốt chỉ số.");
export const potentialAdvice = [
  { name: "3-1", note: text("Key damage upgrade: +40% Dirge Bullet damage and +20% Extra Attack damage.", "Nâng cấp sát thương quan trọng: +40% sát thương Dirge Bullet và +20% sát thương Extra Attack.") },
  { name: "7", note: text("Adds +5% Dirge Bullet damage, with another +10% when the CRIT Rate condition is met.", "Tăng 5% sát thương Dirge Bullet, cộng thêm 10% khi đạt điều kiện CRIT Rate.") },
  { name: "5-1", note: text("Improves Annihilation Shot, but basic attacks are a lower priority for her main discard builds.", "Tăng sức mạnh Annihilation Shot, nhưng đánh thường ít quan trọng hơn trong build Discard chủ lực.") },
];

export const equipment = [
  { name: "Swamp", weapons: ["Criticism of Discord", "Tentacles of Chaos", "Dagger That Tricked the Shadow", "Second Method"], armor: ["Fairy King's Crown", "Wings of Light"], trinkets: ["Verdant Day", "Verdant Night", "Verdant Shackles", "Dimensional Cube"] },
  { name: "Season 4 · Kaleidoscope Hatchery", weapons: ["Criticism of Discord", "Tentacles of Chaos", "Shell Bug Horn", "Second Method"], armor: ["Contaminated Cocoon Cape", "Pagna Mushroom"], trinkets: ["Invader Observation Logs", "Sphere of Randomness", "Essence-Fragmented Necklace", "Dimensional Cube"] },
  { name: "Season 1 · Lab Zero", weapons: ["Criticism of Discord", "Tentacles of Chaos", "Mutant Predator Spike", "W-52 Dopamine Injector"], armor: ["Wings of Freedom", "Rocket-Adorned Cape", "Fragment of the Empty Void"], trinkets: ["Superconductive Protein", "Dimensional Cube", "Amorphous Cube", "Sphere of Randomness"] },
  { name: "Season 2 · Burning Life", weapons: ["Criticism of Discord", "Tentacles of Chaos", "Second Method", "Harpoon Case of Broken Resolve"], armor: ["Fairy King's Crown"], trinkets: ["Dimensional Cube", "Amorphous Cube", "Sphere of Randomness"] },
  { name: "Season 3 · Theater of Illusions", weapons: ["Criticism of Discord", "Tentacles of Chaos", "Corrupted Gauntlet", "Second Method"], armor: ["Ring of the Seraphim", "Wings of Light"], trinkets: ["Dimensional Cube", "Amorphous Cube", "A Lonesome Wedding Ring", "Sphere of Randomness"] },
];
export const seasonal = [
  { name: "Season 4 · Desire Cards", note: text("Coordinate the team's Desire thresholds (3/5/7). The source suggests 1 Claim / 1 Survival / 1 Inquiry for flexibility, or specialize toward the team's target while retaining Inquiry for Sample Collection when useful.", "Phối hợp ngưỡng Desire (3/5/7) của cả đội. Nguồn gợi ý 1 Claim / 1 Survival / 1 Inquiry để linh hoạt, hoặc tập trung loại Desire đội cần và giữ Inquiry cho Sample Collection khi phù hợp.") },
  { name: "Season 3 · Persona & Engravings", note: text("For Attack Personas, look for Mark per Lux Engraving or Attunement cost reduction. For Skill Personas, activation on Discard works well with discard support. The equipment engraving granting +30% Extra Attack Damage after allies create five cards is a strong stacking option.", "Với Persona Attack, cân nhắc Mark theo Lux Engraving hoặc giảm cost qua Attunement. Với Persona Skill, hiệu ứng kích hoạt khi Discard hợp đội có hỗ trợ Discard. Engraving trang bị tăng 30% sát thương Extra Attack sau khi đồng đội tạo 5 lá là lựa chọn mạnh và có thể cộng dồn.") },
  { name: "Season 2 · Refinements", note: text("Look for +20% Attack Card damage, +30% damage to Attack Cards costing 1 or less, or +25% Extra Attack damage. God's Hammer is random; ATK% equipment effects generally suit ATK-based attackers.", "Cân nhắc +20% sát thương card Attack, +30% sát thương card Attack cost từ 1 trở xuống, hoặc +25% sát thương Extra Attack. God's Hammer có tính ngẫu nhiên; hiệu ứng trang bị ATK% thường hợp nhân vật gây sát thương theo ATK.") },
  { name: "Season 1 · Forbidden Cards", note: text("Gesture of Freedom for permanent cost reduction; Portrait of Fury for draw and damage; Ecstasy of Violence for damage; Eternal Hunger for draw and AP with the right allies.", "Gesture of Freedom để giảm cost vĩnh viễn; Portrait of Fury để rút bài và tăng sát thương; Ecstasy of Violence để tăng sát thương; Eternal Hunger để rút bài và có AP khi đi cùng đồng đội phù hợp.") },
];
export const dupes = [
  { name: "E0", score: "100%", note: text("Baseline.", "Mốc cơ bản.") },
  { name: "E1", score: "100.14%", note: text("Last-Ditch Assault gains another 20% scaling for each discarded Dirge Bullet.", "Last-Ditch Assault tăng thêm 20% hệ số theo mỗi Dirge Bullet bị Discard.") },
  { name: "E2", score: "132.50%", note: text("Every four bullets created generate a Dirge Bullet: Finale, with two Extra Attack hits on Discard.", "Mỗi 4 đạn được tạo sẽ sinh một Dirge Bullet: Finale, gây Extra Attack 2 hit khi bị Discard.") },
  { name: "E3", score: "132.65%", note: text("Adds 200% damage to Black Thorn.", "Tăng 200% sát thương cho Black Thorn.") },
  { name: "E4", score: "143.34%", note: text("Discarded bullets grant Rose's Resolve: +10% damage per stack, up to four; removed on shuffle.", "Discard đạn cho Rose's Resolve: tăng 10% sát thương mỗi tầng, tối đa 4 tầng; mất khi xáo bài.") },
  { name: "E5", score: "145.53%", note: text("Raises Basic, Common and Unique Card Upgrade Potential levels by three.", "Tăng 3 cấp Potential nâng cấp card Basic, Common và Unique.") },
  { name: "E6", score: "145.53%", note: text("Drawing a Dirge Bullet triggers a 50% Extra Attack. The saved benchmark is unchanged from E5; this is not a universal damage estimate.", "Rút Dirge Bullet kích hoạt Extra Attack 50%. Bảng mẫu giữ nguyên kết quả so với E5; đây không phải mức tăng sát thương cho mọi tình huống.") },
];

export const cardAdvice = [
  { name: "Echo of Sorrow", ratings: [2, 3, 1, 5, 3], preferred: "IV / V", note: text("IV generates three bullets and is the carry default. V supplies a bullet every turn for Flower IV draw builds. II can support one-turn burst setups; III depends on bullets remaining in the draw pile and is less reliable. I is a modest upgrade.", "IV tạo 3 đạn, là lựa chọn chính cho build sát thương. V cung cấp đạn mỗi lượt cho build rút bài bằng Flower IV. II dùng được khi dồn sát thương trong một lượt; III phụ thuộc đạn còn trong Draw Pile nên kém ổn định. I chỉ nâng cấp vừa phải."), divine: text("Draw 1 on IV or −1 cost. Neutral Draw 1 is convenient but sacrifices bullet generation.", "Draw 1 trên IV hoặc giảm 1 cost. Neutral Draw 1 dễ dùng nhưng phải đánh đổi khả năng tạo đạn.") },
  { name: "Instant Judgment", ratings: [2, 1, 2, 3, 5], preferred: "V", note: text("V provides passive end-of-turn damage and leaves the draw cycle after being played. IV enables discard loops with Adagio. III clears one bullet but is less useful when already running Ballad V; I and II offer limited value for Extra Attack builds.", "V gây sát thương thụ động cuối lượt và rời vòng rút bài sau khi dùng. IV có thể Discard lặp lại với Adagio. III dọn 1 đạn nhưng ít cần thiết nếu đã dùng Ballad V; I và II có giá trị hạn chế với build Extra Attack."), divine: text("Morale / Resolve on V or −1 cost. Neutral Draw 1 is also a practical option.", "Morale / Resolve trên V hoặc giảm 1 cost. Neutral Draw 1 cũng là lựa chọn thực dụng.") },
  { name: "Ballad of Pitch Black", ratings: [2, 2, 3, 3, 5], preferred: "V / IV", note: text("V Exhausts every Dirge Bullet in the Graveyard, keeping repeated rotations stable. IV amplifies bullet Extra Attacks for one turn and suits burst or Diana teams that already manage Exhaust. III offers Mark-based burst; II retrieves bullets and I is a smaller self-buff.", "V Exhaust toàn bộ Dirge Bullet trong Graveyard để duy trì vòng bài ổn định. IV tăng Extra Attack của đạn trong 1 lượt, hợp dồn sát thương hoặc đội Diana đã xử lý được Exhaust. III hỗ trợ dồn sát thương bằng Mark; II lấy đạn về tay; I chỉ tăng buff bản thân."), divine: text("Prioritize the correct Epiphany over Divine bonuses. No recommended Neutral target.", "Ưu tiên đúng Epiphany hơn bonus Divine. Không có Neutral mục tiêu được khuyến nghị.") },
  { name: "Flower of Devoured Fate", ratings: [5, 2, 2, 4, 3], preferred: "I / IV", note: text("I discards up to three cards and replaces them with bullets: the core carry loop. IV draws three with a bullet in hand. II is an Exhaust burst option using ally cards; III trades generation for a buff; V grants Retrieve for more demanding discard loops.", "I Discard tối đa 3 lá rồi tạo đạn tương ứng: card cốt lõi của vòng sát thương. IV rút 3 lá khi có đạn trên tay. II là lựa chọn dồn sát thương có Exhaust và dùng bài đồng đội; III đổi tạo đạn lấy buff; V cho Retrieve để vận hành các vòng Discard phức tạp hơn."), divine: text("−1 cost for II / IV, Draw 1 or 1 AP. Avoid Neutral effects that replace the build-defining Epiphany.", "Giảm 1 cost cho II / IV, Draw 1 hoặc 1 AP. Hạn chế chọn Neutral thay thế Epiphany quyết định cách vận hành build.") },
];

export const decks = [
  {
    name: "Daughters of Discard (Diana Support)", role: text("Discard synergy", "Phối hợp Discard"), count: 7,
    cards: [
      { name: "Echo of Sorrow V", count: 1, extra: "" },
      { name: "Ballad of Pitch Black IV", count: 1, extra: "" },
      { name: "Flower of Devoured Fate I", count: 3, extra: "Draw 1" },
      { name: "Flower of Devoured Fate IV", count: 1, extra: "" },
      { name: "Persona", count: 1, extra: "[Unique] [Exhaust 2] +30% Bullet DMG · Hunter" },
    ],
    gear: ["Criticism of Discord", "Fairy King's Crown", "Verdant Night"], fragments: "Conquerer's Aspect + Executioner's Tool",
    note: text("Use Renoa's bullets as the main ammunition and Diana's With All My Heart! IV to apply Quietus. Discarding WAMH IV with Flower I can generate bullets and apply Quietus in the same sequence. Nia is recommended over Cassius for the additional discard support. Source deck credit: Upi.", "Dùng đạn Renoa làm nguồn đạn chính, kết hợp With All My Heart! IV của Diana để gắn Quietus. Discard WAMH IV bằng Flower I có thể vừa tạo đạn vừa gắn Quietus trong cùng chuỗi xử lý. Nguồn ưu tiên Nia hơn Cassius vì cần thêm hỗ trợ Discard. Tác giả deck theo nguồn: Upi."),
  },
  {
    name: "Hypercarry Renoa", role: text("Main damage dealer", "Sát thương chủ lực"), count: 7,
    cards: [
      { name: "Echo of Sorrow IV", count: 1, extra: "" },
      { name: "Ballad of Pitch Black V", count: 1, extra: "" },
      { name: "Flower of Devoured Fate I", count: 3, extra: "Draw 1" },
      { name: "Flower of Devoured Fate I", count: 1, extra: "" },
      { name: "Persona", count: 1, extra: "[Unique] [Exhaust 2] +30% Bullet DMG · Hunter" },
    ],
    gear: ["Criticism of Discord", "Fairy King's Crown", "Verdant Night"], fragments: "Executioner's Tool + Conquerer's Aspect",
    note: text("Each Flower I discards three bullets for three Extra Attacks and generates three new bullets. Four copies can provide twelve Extra Attacks from Flower alone. Use Ballad V to clear discarded bullets and keep later turns consistent.", "Mỗi Flower I Discard 3 đạn để kích hoạt 3 Extra Attack, rồi tạo 3 đạn mới. Bốn bản có thể cho 12 Extra Attack chỉ từ Flower. Dùng Ballad V dọn đạn đã Discard để các lượt sau vẫn vận hành ổn định."),
  },
  {
    name: "Draw Renoa", role: text("Draw support", "Hỗ trợ rút bài"), count: 6,
    cards: [
      { name: "Echo of Sorrow V", count: 1, extra: "" },
      { name: "Instant Judgment V", count: 1, extra: "" },
      { name: "Flower of Devoured Fate IV", count: 4, extra: "−1 cost" },
    ],
    gear: [], fragments: "",
    note: text("Echo V creates a bullet at the start of each turn, enabling Flower IV to draw three. Divine cost reduction is strongly recommended: without it, repeated 1-AP Flowers can strain the team's AP. The saved deck does not specify equipment or fragments.", "Echo V tạo đạn đầu mỗi lượt, giúp Flower IV rút 3 lá. Rất nên có Divine giảm cost: nếu không, nhiều Flower cost 1 dễ làm thiếu AP cho cả đội. Mẫu deck lưu không chỉ định trang bị hay Fragment."),
  },
];

export const synergies = [
  { name: "Nia", note: text("Soul Rip III can add another Extra Attack per discard. E2 Rhythm Boost supplies an additive buff; Adagio and her Ego Skill help cycle or discard bullets from the draw pile.", "Soul Rip III có thể thêm một Extra Attack mỗi lần Discard. Rhythm Boost ở E2 cung cấp buff cộng sát thương; Adagio và Ego Skill giúp xoay bài hoặc Discard đạn trong Draw Pile.") },
  { name: "Rei", note: text("Supports 1-cost cards, Void damage and additive buffs such as Morale; can also use Glory Reign (4-piece).", "Hỗ trợ card cost 1, sát thương Void và buff cộng như Morale; có thể dùng bộ Glory Reign 4 món.") },
  { name: "Cassius", note: text("Neutral Morale on Devil Dice or Dice Trick provides inexpensive buffs. Cost-reduction Divines help him draw and buff together; Shuffle and Devil Dice IV assist with discarding.", "Neutral Morale trên Devil Dice hoặc Dice Trick cho buff ít tốn AP. Divine giảm cost giúp vừa rút bài vừa buff; Shuffle và Devil Dice IV hỗ trợ Discard.") },
  { name: "Diana", note: text("Quietus helps Exhaust Renoa's bullets and adds a hit to each. Both benefit from discard effects, Extra Attack buffs and allies such as Nia.", "Quietus giúp Exhaust đạn Renoa và thêm một hit cho mỗi đạn. Cả hai cùng hưởng lợi từ Discard, buff Extra Attack và đồng đội như Nia.") },
];
export const teams = [
  { name: "Daughters of Discard", members: ["Diana", "Renoa", "Nia"], steps: [
    text("Play Nia's buffs, then use Diana and Renoa's discard effects. G Chord can play Glorious Resistance for free.", "Dùng buff của Nia rồi kích hoạt các hiệu ứng Discard của Diana và Renoa. G Chord có thể đánh Glorious Resistance miễn phí."),
    text("Generate Renoa bullets, apply Quietus, then continue the discard chain.", "Tạo đạn Renoa, gắn Quietus rồi tiếp tục chuỗi Discard."),
    text("Finish with Blooming Love IV, activating as many bullets as possible for the final burst.", "Kết thúc bằng Blooming Love IV, kích hoạt nhiều đạn nhất có thể để dồn sát thương."),
  ] },
  { name: "Renoa's Fei-t Pics", members: ["Renoa", "Fei", "Nia"], steps: [text("This team is listed in the snapshot, but its detailed rotation is not expanded in the saved page.", "Đội hình có trong bản lưu, nhưng phần hướng dẫn chi tiết chưa được mở trong trang đã lưu.")] },
];
