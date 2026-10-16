import {
    _ as e,
    u as r,
    i,
    c as t,
    a,
    d as l,
    G as s,
    t as c,
    F as n,
    m as o,
    n as p,
    o as _
} from "./index-LLMsysJK.js";
import {
    d
} from "./api-BhwEKNwi.js";
import {
    a as y,
    f as u
} from "./descriptionFormatter-B58vtNQt.js";
const m = {
        name: "CznRelic",
        props: {
            relic: {
                type: Object,
                required: !0
            },
            starLevel: {
                type: [String, Number],
                default: 5
            },
            scale: {
                type: Number,
                default: 1
            },
            isNew: {
                type: Boolean,
                default: !1
            }
        },
        setup(e) {
            const {
                t: t
            } = r(), a = {
                1: {
                    s_atk: 28,
                    s_def: 10,
                    s_hp: 22
                },
                2: {
                    s_atk: 45,
                    s_def: 17,
                    s_hp: 41
                },
                3: {
                    s_atk: 62,
                    s_def: 23,
                    s_hp: 60
                },
                4: {
                    s_atk: 74,
                    s_def: 27,
                    s_hp: 73
                },
                5: {
                    s_atk: 82,
                    s_def: 31,
                    s_hp: 83
                }
            }, l = i(() => parseInt(e.starLevel) || 3), s = {
                RARITY_COMMON: .7,
                RARITY_UNCOMMON: .8,
                RARITY_RARE: .9,
                RARITY_LEGEND: 1,
                RARITY_UNIQUE: 1.1
            }, c = i(() => {
                const r = l.value.toString(),
                    i = a[r] || {
                        s_atk: 0,
                        s_def: 0,
                        s_hp: 0
                    },
                    t = e.relic.relic_type || "",
                    c = e.relic.rarity || "RARITY_LEGEND",
                    n = s[c] || 1;
                return {
                    atk: "EQUIP_WEAPON" === t ? Math.round(i.s_atk * n) : 0,
                    def: "EQUIP_ARMOR" === t ? Math.round(i.s_def * n) : 0,
                    hp: "EQUIP_ACC" === t ? Math.round(i.s_hp * n) : 0
                }
            }), n = i(() => c.value.atk > 0 || c.value.def > 0 || c.value.hp > 0), o = i(() => {
                if (!e.relic.skills || 0 === e.relic.skills.length) return [];
                const r = l.value;
                return e.relic.skills.length < r ? e.relic.skills.slice(-1) : [e.relic.skills[r - 1]]
            }), p = i(() => e.relic.icon_name ? d(`item/${e.relic.icon_name}.webp`) : ""), _ = i(() => {
                if (!e.relic.rarity) return "";
                const r = e.relic.rarity.toLowerCase();
                return d(`rarity/bg_equipment_${r}.webp`)
            }), m = i(() => e.relic.rarity && y(e.relic.rarity) || "var(--text-primary)"), I = i(() => ({
                RARITY_COMMON: "common",
                RARITY_UNCOMMON: "uncommon",
                RARITY_RARE: "rare",
                RARITY_LEGEND: "legend",
                RARITY_UNIQUE: "unique"
            }[e.relic.rarity] || "")), R = i(() => ({
                RARITY_COMMON: t("czn.relics.rarityCommon") || "普通",
                RARITY_UNCOMMON: t("czn.relics.rarityUncommon") || "优秀",
                RARITY_RARE: t("czn.relics.rarityRare") || "稀有",
                RARITY_LEGEND: t("czn.relics.rarityLegend") || "传说",
                RARITY_UNIQUE: t("czn.relics.rarityUnique") || "唯一"
            }[e.relic.rarity] || e.relic.rarity)), b = i(() => ({
                EQUIP_WEAPON: t("czn.relics.typeWeapon") || "武器",
                EQUIP_ARMOR: t("czn.relics.typeArmor") || "护甲",
                EQUIP_ACC: t("czn.relics.typeAcc") || "饰品",
                RELIC: t("czn.relics.typeRelic") || "遗物"
            }[e.relic.relic_type] || e.relic.relic_type)), g = i(() => {
                const r = {
                    EQUIP_WEAPON: "img/icon_equip_type_equip_weapon.webp",
                    EQUIP_ARMOR: "img/icon_equip_type_equip_armor.webp",
                    EQUIP_ACC: "img/icon_equip_type_equip_accessory.webp",
                    RELIC: "img/icon_comm/icon_comm_relic.webp"
                }[e.relic.relic_type];
                return r ? d(r) : ""
            }), k = i(() => e.relic.reward_tag && e.relic.reward_tag.includes("delang")), A = i(() => ({}));
            return {
                t: t,
                relicAttribute: c,
                hasAttributes: n,
                displaySkills: o,
                relicIconUrl: p,
                rarityBackgroundUrl: _,
                getStarIconUrl: e => d(e ? "img/icon_star_rating_on.webp" : "img/icon_star_rating_off.webp"),
                rarityColorForName: m,
                rarityClass: I,
                rarityText: R,
                relicTypeText: b,
                relicTypeIconUrl: g,
                isShopItem: k,
                relicStyles: A,
                starLevel: l,
                formatDescription: u,
                handleImageError: e => {
                    e.target.style.display = "none"
                }
            }
        }
    },
    I = {
        class: "relic-card"
    },
    R = {
        key: 0,
        class: "ribbon-wrapper"
    },
    b = {
        class: "relic-header"
    },
    g = {
        class: "relic-icon-container"
    },
    k = ["src", "alt"],
    A = ["src", "alt"],
    E = ["src"],
    h = {
        class: "relic-info"
    },
    v = {
        class: "relic-name-wrapper"
    },
    f = {
        class: "relic-star-rating"
    },
    U = {
        class: "star-rating-stars"
    },
    N = ["src", "alt"],
    T = {
        class: "relic-badges"
    },
    C = {
        key: 1,
        class: "badge shop"
    },
    M = {
        key: 0,
        class: "relic-attributes"
    },
    O = {
        key: 0,
        class: "attribute-item"
    },
    w = {
        class: "attribute-label"
    },
    Y = {
        class: "attribute-value"
    },
    z = {
        key: 1,
        class: "attribute-item"
    },
    L = {
        class: "attribute-label"
    },
    S = {
        class: "attribute-value"
    },
    P = {
        key: 2,
        class: "attribute-item"
    },
    Q = {
        class: "attribute-label"
    },
    q = {
        class: "attribute-value"
    },
    x = {
        key: 1,
        class: "relic-skills"
    },
    D = ["innerHTML"];
const G = e(m, [
    ["render", function(e, r, i, d, y, u) {
        return _(), t("div", {
            class: "czn-relic",
            style: s(d.relicStyles)
        }, [a("div", I, [i.isNew ? (_(), t("div", R, r[3] || (r[3] = [a("div", {
            class: "ribbon ribbon-new"
        }, "NEW", -1)]))) : l("", !0), a("div", b, [a("div", g, [i.relic.rarity ? (_(), t("img", {
            key: 0,
            src: d.rarityBackgroundUrl,
            alt: i.relic.name,
            class: "relic-icon-bg",
            onError: r[0] || (r[0] = (...e) => d.handleImageError && d.handleImageError(...e))
        }, null, 40, k)) : l("", !0), i.relic.icon_name ? (_(), t("img", {
            key: 1,
            src: d.relicIconUrl,
            alt: i.relic.name,
            class: "relic-icon",
            onError: r[1] || (r[1] = (...e) => d.handleImageError && d.handleImageError(...e))
        }, null, 40, A)) : l("", !0), d.relicTypeIconUrl ? (_(), t("img", {
            key: 2,
            src: d.relicTypeIconUrl,
            class: "relic-type-icon",
            alt: "Type Icon"
        }, null, 8, E)) : l("", !0)]), a("div", h, [a("div", v, [a("h4", {
            class: "relic-name",
            style: s({
                color: d.rarityColorForName
            })
        }, c(i.relic.name), 5)]), a("div", f, [a("div", U, [(_(), t(n, null, o(5, e => a("img", {
            key: e,
            src: d.getStarIconUrl(e <= d.starLevel),
            alt: e <= d.starLevel ? "Star on" : "Star off",
            class: "star-icon",
            onError: r[2] || (r[2] = (...e) => d.handleImageError && d.handleImageError(...e))
        }, null, 40, N)), 64))])]), a("div", T, [i.relic.rarity ? (_(), t("span", {
            key: 0,
            class: p(["badge rarity", d.rarityClass])
        }, c(d.rarityText), 3)) : l("", !0), d.isShopItem ? (_(), t("span", C, c(d.t("czn.relics.shop")), 1)) : l("", !0)]), d.hasAttributes ? (_(), t("div", M, [d.relicAttribute.atk > 0 ? (_(), t("div", O, [a("span", w, c(d.t("czn.relics.attack")), 1), a("span", Y, "+" + c(d.relicAttribute.atk), 1)])) : l("", !0), d.relicAttribute.def > 0 ? (_(), t("div", z, [a("span", L, c(d.t("czn.relics.defense")), 1), a("span", S, "+" + c(d.relicAttribute.def), 1)])) : l("", !0), d.relicAttribute.hp > 0 ? (_(), t("div", P, [a("span", Q, c(d.t("czn.relics.health")), 1), a("span", q, "+" + c(d.relicAttribute.hp), 1)])) : l("", !0)])) : l("", !0)])]), d.displaySkills.length > 0 ? (_(), t("div", x, [(_(!0), t(n, null, o(d.displaySkills, (e, r) => (_(), t("div", {
            key: r,
            class: "skill-item"
        }, [e.description ? (_(), t("div", {
            key: 0,
            class: "skill-description",
            innerHTML: d.formatDescription(e.description)
        }, null, 8, D)) : l("", !0)]))), 128))])) : l("", !0)])], 4)
    }],
    ["__scopeId", "data-v-5e9fef77"]
]);
export {
    G as C
};