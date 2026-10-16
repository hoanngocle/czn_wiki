import {
    _ as e,
    u as l,
    r as a,
    B as s,
    q as t,
    c as i,
    d as r,
    a as c,
    t as o,
    F as n,
    m as d,
    w as u,
    T as h,
    D as p,
    o as v,
    a6 as R,
    y as g,
    p as m,
    s as y,
    e as f,
    W as k,
    G as _,
    n as C,
    a7 as w,
    g as b,
    a8 as S,
    i as I,
    C as T,
    v as z
} from "./index-LLMsysJK.js";
import {
    S as E
} from "./SearchSidebar-BAZXZ4yE.js";
import {
    T as A
} from "./TagFilter-OwiwbS91.js";
import {
    C as M
} from "./CznRelic-BH0FFAV7.js";
import {
    f as L,
    a as U
} from "./descriptionFormatter-B58vtNQt.js";
import {
    d as O
} from "./api-BhwEKNwi.js";
const N = {
        name: "RelicReinforceDialog",
        props: {
            show: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["close"],
        setup(e, {
            emit: t
        }) {
            const {
                t: i
            } = l(), r = a(!1), c = a(null), o = a([]), n = async () => {
                r.value = !0, c.value = null;
                try {
                    const e = await p.get("/api/czn/relic-reinforce/list");
                    0 === e.data.code ? o.value = e.data.data : c.value = e.data.message || "Failed to fetch data"
                } catch (e) {
                    c.value = e.message || "Failed to fetch data"
                } finally {
                    r.value = !1
                }
            };
            return s(() => e.show, e => {
                e && 0 === o.value.length && n()
            }), {
                t: i,
                loading: r,
                error: c,
                items: o,
                handleClose: () => {
                    t("close")
                },
                fetchData: n,
                formatDescription: L
            }
        }
    },
    Y = {
        class: "modal-header"
    },
    D = {
        class: "modal-content"
    },
    B = {
        key: 0,
        class: "loading-state"
    },
    Q = {
        key: 1,
        class: "error-state"
    },
    x = {
        key: 2,
        class: "reinforce-list"
    },
    P = {
        class: "item-index"
    },
    V = ["innerHTML"],
    j = {
        key: 0,
        class: "empty-state"
    };
const F = {
        class: "czn-relic-page"
    },
    W = {
        key: 0,
        class: "loading-container"
    },
    G = {
        key: 1,
        class: "error-container"
    },
    q = {
        key: 2,
        class: "main-content"
    },
    H = {
        class: "search-input-container"
    },
    $ = {
        class: "search-input-wrapper"
    },
    Z = ["placeholder"],
    J = ["title"],
    K = {
        class: "page-content-container"
    },
    X = {
        class: "sort-controls"
    },
    ee = {
        class: "page-group-title"
    },
    le = {
        class: "controls-section"
    },
    ae = {
        class: "sort-section"
    },
    se = {
        value: "id"
    },
    te = {
        value: "rarity"
    },
    ie = {
        value: "relic_type"
    },
    re = ["title"],
    ce = {
        key: 0,
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    },
    oe = {
        key: 1,
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    },
    ne = {
        class: "page-count"
    },
    de = ["title"],
    ue = {
        class: "page-list-section"
    },
    he = {
        key: 0,
        class: "relics-list"
    },
    pe = ["onClick"],
    ve = {
        key: 1,
        class: "no-result"
    },
    Re = {
        class: "relic-detail"
    },
    ge = {
        class: "detail-header"
    },
    me = {
        class: "detail-icon-container"
    },
    ye = ["src", "alt"],
    fe = ["src", "alt"],
    ke = {
        class: "detail-info"
    },
    _e = {
        class: "detail-name-wrapper"
    },
    Ce = {
        class: "detail-star-rating"
    },
    we = {
        class: "star-rating-stars"
    },
    be = ["src", "alt"],
    Se = {
        class: "detail-badges"
    },
    Ie = {
        key: 1,
        class: "badge type"
    },
    Te = {
        key: 2,
        class: "badge category"
    },
    ze = {
        class: "detail-body"
    },
    Ee = {
        class: "detail-section"
    },
    Ae = {
        class: "info-grid"
    },
    Me = {
        class: "info-item"
    },
    Le = {
        class: "info-label"
    },
    Ue = {
        class: "info-value"
    },
    Oe = {
        key: 0,
        class: "info-item"
    },
    Ne = {
        class: "info-label"
    },
    Ye = {
        class: "info-value"
    },
    De = {
        key: 1,
        class: "info-item"
    },
    Be = {
        class: "info-label"
    },
    Qe = {
        class: "info-value"
    },
    xe = {
        class: "detail-section"
    },
    Pe = {
        class: "info-grid"
    },
    Ve = {
        key: 0,
        class: "info-item"
    },
    je = {
        class: "info-label"
    },
    Fe = {
        class: "info-value"
    },
    We = {
        key: 1,
        class: "info-item"
    },
    Ge = {
        class: "info-label"
    },
    qe = {
        class: "info-value"
    },
    He = {
        key: 2,
        class: "info-item"
    },
    $e = {
        class: "info-label"
    },
    Ze = {
        class: "info-value"
    },
    Je = {
        key: 0,
        class: "detail-section"
    },
    Ke = {
        class: "tag-list"
    },
    Xe = {
        key: 1,
        class: "detail-section"
    },
    el = {
        class: "skills-list"
    },
    ll = ["innerHTML"],
    al = {
        key: 1,
        class: "skill-links"
    },
    sl = {
        class: "link-item"
    },
    tl = {
        class: "link-label"
    },
    il = {
        class: "link-value"
    },
    rl = {
        key: 2,
        class: "skill-links"
    },
    cl = {
        class: "link-item"
    },
    ol = {
        class: "link-label"
    },
    nl = {
        class: "link-value"
    },
    dl = {
        key: 2,
        class: "detail-section"
    },
    ul = {
        class: "character-list"
    };
const hl = e({
    name: "CznRelicPage",
    components: {
        SearchSidebar: E,
        TagFilter: A,
        MobileTopNav: R,
        CznRelic: M,
        RelicReinforceDialog: e(N, [
            ["render", function(e, l, a, s, p, R) {
                return v(), t(h, {
                    to: "body"
                }, [a.show ? (v(), i("div", {
                    key: 0,
                    class: "relic-reinforce-modal-overlay",
                    onClick: l[3] || (l[3] = (...e) => s.handleClose && s.handleClose(...e))
                }, [c("div", {
                    class: "relic-reinforce-modal",
                    onClick: l[2] || (l[2] = u(() => {}, ["stop"]))
                }, [c("div", Y, [c("h3", null, o(s.t("czn.relics.relicReinforce")), 1), c("button", {
                    class: "close-btn",
                    onClick: l[0] || (l[0] = (...e) => s.handleClose && s.handleClose(...e))
                }, "×")]), c("div", D, [s.loading ? (v(), i("div", B, [l[4] || (l[4] = c("div", {
                    class: "spinner"
                }, null, -1)), c("p", null, o(s.t("common.loading") || "Loading..."), 1)])) : s.error ? (v(), i("div", Q, [c("p", null, o(s.error), 1), c("button", {
                    class: "retry-btn",
                    onClick: l[1] || (l[1] = (...e) => s.fetchData && s.fetchData(...e))
                }, o(s.t("common.retry") || "Retry"), 1)])) : (v(), i("div", x, [(v(!0), i(n, null, d(s.items, (e, l) => (v(), i("div", {
                    key: e.id,
                    class: "reinforce-item"
                }, [c("span", P, o(l + 1) + ".", 1), c("div", {
                    class: "item-description",
                    innerHTML: s.formatDescription(e.description)
                }, null, 8, V)]))), 128)), 0 === s.items.length ? (v(), i("div", j, [c("p", null, o(s.t("czn.relics.noRelics") || "No data found"), 1)])) : r("", !0)]))])])])) : r("", !0)])
            }],
            ["__scopeId", "data-v-aa97cf70"]
        ])
    },
    setup() {
        const {
            t: e
        } = l(), s = w();
        b();
        const {
            isSearchSidebarCollapsed: t
        } = S(s), i = a([]), r = a(!0), c = a(null), o = a(""), n = a(""), d = a(""), u = a(""), h = a("5"), v = a("rarity"), R = a("desc"), g = a(null), m = a(!1), y = {
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
        }, f = I(() => [{
            value: "1",
            label: "1★"
        }, {
            value: "2",
            label: "2★"
        }, {
            value: "3",
            label: "3★"
        }, {
            value: "4",
            label: "4★"
        }, {
            value: "5",
            label: "5★"
        }]), k = (e = !1, l = !1, a = !1) => {
            let s = i.value;
            if (o.value) {
                const e = o.value.toLowerCase();
                s = s.filter(l => {
                    var a, s;
                    return (l.id || "").toLowerCase().includes(e) || (l.name || "").toLowerCase().includes(e) || ((null == (a = l.names) ? void 0 : a.en) || "").toLowerCase().includes(e) || ((null == (s = l.names) ? void 0 : s.zht) || "").toLowerCase().includes(e)
                })
            }
            return !e && n.value && (s = s.filter(e => e.rarity === n.value)), !l && d.value && (s = s.filter(e => e.relic_type === d.value)), !a && u.value && (s = "other" === u.value ? s.filter(e => !e.chaos || !e.chaos.id) : s.filter(e => e.chaos && e.chaos.id === u.value)), s
        }, _ = I(() => {
            let e = k(!1, !1, !1);
            return e.sort((e, l) => {
                const a = "new" === V.value[e.id] ? 1 : 0,
                    s = "new" === V.value[l.id] ? 1 : 0;
                if (a !== s) return s - a;
                let t = 0;
                switch (v.value) {
                    case "id":
                        t = e.id.localeCompare(l.id, void 0, {
                            numeric: !0
                        });
                        break;
                    case "rarity":
                        const a = {
                                RARITY_UNIQUE: 5,
                                RARITY_LEGEND: 4,
                                RARITY_RARE: 3,
                                RARITY_UNCOMMON: 2,
                                RARITY_COMMON: 1
                            },
                            s = a[e.rarity] || 0,
                            i = a[l.rarity] || 0;
                        t = s !== i ? s - i : e.id.localeCompare(l.id, void 0, {
                            numeric: !0
                        });
                        break;
                    case "relic_type":
                        const r = e.relic_type || "",
                            c = l.relic_type || "";
                        t = r !== c ? r.localeCompare(c) : e.id.localeCompare(l.id, void 0, {
                            numeric: !0
                        });
                        break;
                    default:
                        t = 0
                }
                return "desc" === R.value ? -t : t
            }), e
        }), C = I(() => {
            const e = {};
            return k(!0, !1, !1).forEach(l => {
                const a = l.rarity || "none";
                e[a] = (e[a] || 0) + 1
            }), e
        }), z = I(() => {
            const e = {};
            return k(!1, !0, !1).forEach(l => {
                const a = l.relic_type || "none";
                e[a] = (e[a] || 0) + 1
            }), e
        }), E = I(() => {
            const e = {};
            return k(!1, !1, !0).forEach(l => {
                l.chaos && l.chaos.id ? e[l.chaos.id] = (e[l.chaos.id] || 0) + 1 : e.other = (e.other || 0) + 1
            }), e
        }), A = {
            RARITY_COMMON: 1,
            RARITY_RARE: 2,
            RARITY_LEGEND: 3,
            RARITY_UNIQUE: 4
        }, M = {
            EQUIP_WEAPON: 1,
            EQUIP_ARMOR: 2,
            EQUIP_ACC: 3,
            RELIC: 4
        }, N = I(() => {
            const e = [];
            return new Set(i.value.map(e => e.rarity).filter(Boolean)).forEach(l => {
                e.push({
                    value: l,
                    label: Q(l),
                    count: C.value[l] || 0,
                    order: A[l] || 999
                })
            }), e.sort((e, l) => e.order - l.order)
        }), Y = I(() => {
            const e = [];
            return new Set(i.value.map(e => e.relic_type).filter(Boolean)).forEach(l => {
                e.push({
                    value: l,
                    label: x(l),
                    count: z.value[l] || 0,
                    order: M[l] || 999
                })
            }), e.sort((e, l) => e.order - l.order)
        }), D = I(() => {
            const l = [],
                a = new Map;
            let s = !1;
            i.value.forEach(e => {
                e.chaos && e.chaos.id ? a.has(e.chaos.id) || a.set(e.chaos.id, e.chaos) : s = !0
            });
            return Array.from(a.values()).sort((e, l) => e.id.localeCompare(l.id, void 0, {
                numeric: !0
            })).forEach(e => {
                l.push({
                    value: e.id,
                    label: e.title || e.id,
                    count: E.value[e.id] || 0
                })
            }), s && l.push({
                value: "other",
                label: e("czn.relics.other") || "其他",
                count: E.value.other || 0
            }), l
        }), B = async () => {
            try {
                r.value = !0, c.value = null;
                const e = await p.get("/api/czn/relics/list");
                0 === e.data.code ? i.value = e.data.data || [] : c.value = e.data.message || "Failed to load relics"
            } catch (e) {
                c.value = e.message || "Failed to load relics"
            } finally {
                r.value = !1
            }
        }, Q = l => ({
            RARITY_COMMON: e("czn.relics.rarityCommon") || "普通",
            RARITY_UNCOMMON: e("czn.relics.rarityUncommon") || "高级",
            RARITY_RARE: e("czn.relics.rarityRare") || "稀有",
            RARITY_LEGEND: e("czn.relics.rarityLegend") || "传说",
            RARITY_UNIQUE: e("czn.relics.rarityUnique") || "唯一"
        }[l] || l), x = l => ({
            EQUIP_WEAPON: e("czn.relics.typeWeapon") || "武器",
            EQUIP_ARMOR: e("czn.relics.typeArmor") || "护甲",
            EQUIP_ACC: e("czn.relics.typeAcc") || "饰品",
            RELIC: e("czn.relics.typeRelic") || "遗物"
        }[l] || l), P = a(null), V = I(() => {
            const e = {};
            return P.value ? (P.value.new && P.value.new.forEach(l => {
                e[l] = "new"
            }), e) : e
        });
        return T(() => {
            window.innerWidth <= 767 && (s.isSearchSidebarCollapsed = !0), B(), (async () => {
                try {
                    const e = await p.get("/api/czn/snapshot/relics/diff");
                    0 === e.data.code && (P.value = e.data.data)
                } catch (e) {}
            })()
        }), {
            t: e,
            relics: i,
            loading: r,
            error: c,
            searchQuery: o,
            selectedRarity: n,
            selectedRelicType: d,
            selectedChaosId: u,
            selectedStarLevel: h,
            starLevelOptions: f,
            sortBy: v,
            sortOrder: R,
            toggleSortOrder: () => {
                R.value = "asc" === R.value ? "desc" : "asc"
            },
            filteredRelics: _,
            rarityOptions: N,
            relicTypeOptions: Y,
            chaosOptions: D,
            selectedRelic: g,
            isSearchSidebarCollapsed: t,
            loadRelics: B,
            handleSearch: () => {},
            handleRarityChange: () => {},
            handleRelicTypeChange: () => {},
            handleChaosChange: () => {},
            handleStarLevelChange: () => {},
            getRelicAttribute: (e, l) => {
                if (!e || !h.value) return 0;
                const a = h.value,
                    s = y[a];
                if (!s) return 0;
                const t = e.relic_type || "";
                return "atk" === l && "EQUIP_WEAPON" === t ? s.s_atk : "def" === l && "EQUIP_ARMOR" === t ? s.s_def : "hp" === l && "EQUIP_ACC" === t ? s.s_hp : 0
            },
            getSkillsByStarLevel: e => {
                if (!e || 0 === e.length) return [];
                if (!h.value) return [];
                const l = parseInt(h.value) || 1;
                return e.length < l ? e.slice(-1) : [e[l - 1]]
            },
            clearSearch: () => {
                o.value = ""
            },
            clearAllFilters: () => {
                o.value = "", n.value = "", d.value = "", u.value = ""
            },
            selectRelic: e => {},
            closeDetailModal: () => {
                g.value = null
            },
            getRelicIconUrl: e => e ? O(`item/${e}.webp`) : "",
            getRarityBackgroundUrl: e => {
                if (!e) return "";
                const l = e.toLowerCase();
                return O(`rarity/bg_equipment_${l}.webp`)
            },
            getStarLevel: e => {
                if (!e || !e.rarity) return 1;
                return {
                    RARITY_COMMON: 1,
                    RARITY_UNCOMMON: 2,
                    RARITY_RARE: 2,
                    RARITY_LEGEND: 3,
                    RARITY_UNIQUE: 5
                }[e.rarity] || 1
            },
            getStarIconUrl: e => O(e ? "img/icon_star_rating_on.webp" : "img/icon_star_rating_off.webp"),
            getRarityColorForName: e => e && U(e) || "var(--text-primary)",
            getRarityClass: e => ({
                RARITY_COMMON: "common",
                RARITY_UNCOMMON: "uncommon",
                RARITY_RARE: "rare",
                RARITY_LEGEND: "legend",
                RARITY_UNIQUE: "unique"
            }[e] || ""),
            getRarityText: Q,
            diffStatus: V,
            showRelicReinforce: m,
            uiStore: s,
            toggleMobileMenu: () => {},
            handleSidebarResize: () => {},
            isProduction: !0,
            formatDescription: L
        }
    }
}, [
    ["render", function(e, l, a, s, t, h) {
        const p = m("MobileTopNav"),
            R = m("TagFilter"),
            w = m("SearchSidebar"),
            b = m("CznRelic"),
            S = m("RelicReinforceDialog");
        return v(), i("div", F, [s.loading ? (v(), i("div", W, [l[20] || (l[20] = c("div", {
            class: "loading-spinner"
        }, null, -1)), c("p", null, o(s.t("common.loading")), 1)])) : s.error ? (v(), i("div", G, [l[21] || (l[21] = c("div", {
            class: "error-icon"
        }, "⚠️", -1)), c("h3", null, o(s.t("common.error")), 1), c("p", null, o(s.error), 1), c("button", {
            onClick: l[0] || (l[0] = (...e) => s.loadRelics && s.loadRelics(...e)),
            class: "retry-button"
        }, o(s.t("common.retry")), 1)])) : r("", !0), s.loading || s.error ? r("", !0) : (v(), i("div", q, [g(p, {
            "is-search-collapsed": s.isSearchSidebarCollapsed,
            "show-sidebar-button": !1,
            onToggleSidebar: s.toggleMobileMenu,
            onToggleSearch: s.uiStore.toggleSearchSidebar
        }, null, 8, ["is-search-collapsed", "onToggleSidebar", "onToggleSearch"]), g(w, {
            modelValue: s.searchQuery,
            "onUpdate:modelValue": l[8] || (l[8] = e => s.searchQuery = e),
            "search-placeholder": s.t("czn.relics.searchPlaceholder"),
            "show-type-switcher": !1,
            "initial-width": 410,
            collapsed: s.isSearchSidebarCollapsed,
            "onUpdate:collapsed": l[9] || (l[9] = e => s.uiStore.isSearchSidebarCollapsed = e),
            onSearch: s.handleSearch,
            onWidthChanged: s.handleSidebarResize
        }, {
            "search-container": y(() => [c("div", H, [c("div", $, [l[23] || (l[23] = c("svg", {
                class: "search-icon",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, [c("path", {
                d: "M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            }), c("path", {
                d: "M14 14L11.1 11.1",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            })], -1)), f(c("input", {
                "onUpdate:modelValue": l[1] || (l[1] = e => s.searchQuery = e),
                type: "text",
                placeholder: s.t("czn.relics.searchPlaceholder"),
                class: "search-input",
                onInput: l[2] || (l[2] = (...e) => s.handleSearch && s.handleSearch(...e))
            }, null, 40, Z), [
                [z, s.searchQuery]
            ]), s.searchQuery ? (v(), i("button", {
                key: 0,
                onClick: l[3] || (l[3] = (...e) => s.clearSearch && s.clearSearch(...e)),
                class: "clear-search-button",
                title: s.t("czn.relics.clearFilters")
            }, l[22] || (l[22] = [c("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 14 14",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, [c("path", {
                d: "M13 1L1 13M1 1L13 13",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            })], -1)]), 8, J)) : r("", !0)])])]),
            "detail-filter": y(() => [g(R, {
                modelValue: s.selectedRarity,
                "onUpdate:modelValue": l[4] || (l[4] = e => s.selectedRarity = e),
                options: s.rarityOptions,
                "show-stats": !0,
                onChange: s.handleRarityChange
            }, null, 8, ["modelValue", "options", "onChange"]), g(R, {
                modelValue: s.selectedRelicType,
                "onUpdate:modelValue": l[5] || (l[5] = e => s.selectedRelicType = e),
                options: s.relicTypeOptions,
                "show-stats": !0,
                onChange: s.handleRelicTypeChange
            }, null, 8, ["modelValue", "options", "onChange"]), g(R, {
                modelValue: s.selectedStarLevel,
                "onUpdate:modelValue": l[6] || (l[6] = e => s.selectedStarLevel = e),
                options: s.starLevelOptions,
                "show-stats": !1,
                onChange: s.handleStarLevelChange
            }, null, 8, ["modelValue", "options", "onChange"]), g(R, {
                modelValue: s.selectedChaosId,
                "onUpdate:modelValue": l[7] || (l[7] = e => s.selectedChaosId = e),
                options: s.chaosOptions,
                "show-stats": !0,
                onChange: s.handleChaosChange
            }, null, 8, ["modelValue", "options", "onChange"])]),
            _: 1
        }, 8, ["modelValue", "search-placeholder", "collapsed", "onSearch", "onWidthChanged"]), c("div", K, [c("div", X, [c("h3", ee, o(s.t("czn.relics.title")), 1), c("div", le, [c("div", ae, [f(c("select", {
            "onUpdate:modelValue": l[10] || (l[10] = e => s.sortBy = e),
            class: "sort-select"
        }, [c("option", se, o(s.t("czn.relics.sortById")), 1), c("option", te, o(s.t("czn.relics.sortByRarity")), 1), c("option", ie, o(s.t("czn.relics.sortByRelicType")), 1)], 512), [
            [k, s.sortBy]
        ]), c("button", {
            class: "sort-order-btn",
            onClick: l[11] || (l[11] = (...e) => s.toggleSortOrder && s.toggleSortOrder(...e)),
            title: "asc" === s.sortOrder ? s.t("czn.relics.sortAsc") || "升序" : s.t("czn.relics.sortDesc") || "降序",
            type: "button"
        }, ["asc" === s.sortOrder ? (v(), i("svg", ce, l[24] || (l[24] = [c("path", {
            d: "M7 14L12 9L17 14",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }, null, -1)]))) : (v(), i("svg", oe, l[25] || (l[25] = [c("path", {
            d: "M7 10L12 15L17 10",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }, null, -1)])))], 8, re)]), c("div", ne, o(s.filteredRelics.length) + "/" + o(s.relics.length), 1), c("button", {
            class: "relic-reinforce-btn",
            onClick: l[12] || (l[12] = e => s.showRelicReinforce = !0),
            title: s.t("czn.relics.relicReinforce")
        }, [l[26] || (l[26] = c("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
        }, [c("path", {
            d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
            fill: "currentColor"
        })], -1)), c("span", null, o(s.t("czn.relics.relicReinforce")), 1)], 8, de)])]), c("div", ue, [s.filteredRelics.length > 0 ? (v(), i("div", he, [(v(!0), i(n, null, d(s.filteredRelics, e => (v(), i("div", {
            key: e.id,
            class: C(["relic-item", {
                "relic-item-clickable": !s.isProduction
            }]),
            onClick: l => !s.isProduction && s.selectRelic(e)
        }, [g(b, {
            relic: e,
            scale: .85,
            "star-level": s.selectedStarLevel,
            "is-new": "new" === s.diffStatus[e.id]
        }, null, 8, ["relic", "star-level", "is-new"])], 10, pe))), 128))])) : (v(), i("div", ve, [l[27] || (l[27] = c("div", {
            class: "empty-icon"
        }, "✨", -1)), c("h3", null, o(s.t("czn.relics.noRelics")), 1), c("p", null, o(s.t("czn.relics.noRelicsDescription")), 1)]))])]), s.selectedRelic && !s.isProduction ? (v(), i("div", {
            key: 0,
            class: "relic-detail-modal",
            onClick: l[18] || (l[18] = (...e) => s.closeDetailModal && s.closeDetailModal(...e))
        }, [c("div", {
            class: "modal-content",
            onClick: l[17] || (l[17] = u(() => {}, ["stop"]))
        }, [c("button", {
            class: "close-button",
            onClick: l[13] || (l[13] = (...e) => s.closeDetailModal && s.closeDetailModal(...e))
        }, "×"), c("div", Re, [c("div", ge, [c("div", me, [s.selectedRelic.rarity ? (v(), i("img", {
            key: 0,
            src: s.getRarityBackgroundUrl(s.selectedRelic.rarity),
            alt: s.selectedRelic.name,
            class: "detail-icon-bg",
            onError: l[14] || (l[14] = (...l) => e.handleImageError && e.handleImageError(...l))
        }, null, 40, ye)) : r("", !0), s.selectedRelic.icon_name ? (v(), i("img", {
            key: 1,
            src: s.getRelicIconUrl(s.selectedRelic.icon_name),
            alt: s.selectedRelic.name,
            class: "detail-icon",
            onError: l[15] || (l[15] = (...l) => e.handleImageError && e.handleImageError(...l))
        }, null, 40, fe)) : r("", !0)]), c("div", ke, [c("div", _e, [c("h2", {
            class: "detail-name",
            style: _({
                color: s.getRarityColorForName(s.selectedRelic.rarity)
            })
        }, o(s.selectedRelic.name), 5)]), c("div", Ce, [c("div", we, [(v(), i(n, null, d(5, a => c("img", {
            key: a,
            src: s.getStarIconUrl(a <= (parseInt(s.selectedStarLevel) || 3)),
            alt: a <= (parseInt(s.selectedStarLevel) || 3) ? "Star on" : "Star off",
            class: "star-icon",
            onError: l[16] || (l[16] = (...l) => e.handleImageError && e.handleImageError(...l))
        }, null, 40, be)), 64))])]), c("div", Se, [s.selectedRelic.rarity ? (v(), i("span", {
            key: 0,
            class: C(["badge rarity", s.getRarityClass(s.selectedRelic.rarity)])
        }, o(s.getRarityText(s.selectedRelic.rarity)), 3)) : r("", !0), s.selectedRelic.relic_type ? (v(), i("span", Ie, o(e.getRelicTypeText(s.selectedRelic.relic_type)), 1)) : r("", !0), s.selectedRelic.relic_category ? (v(), i("span", Te, o(e.getRelicCategoryText(s.selectedRelic.relic_category)), 1)) : r("", !0)])])]), c("div", ze, [c("div", Ee, [c("h3", null, o(s.t("czn.relics.basicInfo")), 1), c("div", Ae, [c("div", Me, [c("span", Le, o(s.t("czn.relics.id")) + ":", 1), c("span", Ue, o(s.selectedRelic.id), 1)]), s.selectedRelic.sort ? (v(), i("div", Oe, [c("span", Ne, o(s.t("czn.relics.sort")) + ":", 1), c("span", Ye, o(s.selectedRelic.sort), 1)])) : r("", !0), s.selectedRelic.reward_ratio ? (v(), i("div", De, [c("span", Be, o(s.t("czn.relics.rewardRatio")) + ":", 1), c("span", Qe, o(s.selectedRelic.reward_ratio) + "%", 1)])) : r("", !0)])]), c("div", xe, [c("h3", null, o(s.t("czn.relics.attributes")), 1), c("div", Pe, [s.getRelicAttribute(s.selectedRelic, "atk") > 0 ? (v(), i("div", Ve, [c("span", je, o(s.t("czn.relics.attack")), 1), c("span", Fe, "+" + o(s.getRelicAttribute(s.selectedRelic, "atk")), 1)])) : r("", !0), s.getRelicAttribute(s.selectedRelic, "def") > 0 ? (v(), i("div", We, [c("span", Ge, o(s.t("czn.relics.defense")), 1), c("span", qe, "+" + o(s.getRelicAttribute(s.selectedRelic, "def")), 1)])) : r("", !0), s.getRelicAttribute(s.selectedRelic, "hp") > 0 ? (v(), i("div", He, [c("span", $e, o(s.t("czn.relics.health")), 1), c("span", Ze, "+" + o(s.getRelicAttribute(s.selectedRelic, "hp")), 1)])) : r("", !0)])]), s.selectedRelic.reward_tag && s.selectedRelic.reward_tag.length > 0 ? (v(), i("div", Je, [c("h3", null, o(s.t("czn.relics.rewardTags")), 1), c("div", Ke, [(v(!0), i(n, null, d(s.selectedRelic.reward_tag, (e, l) => (v(), i("span", {
            key: l,
            class: "tag-item"
        }, o(e), 1))), 128))])])) : r("", !0), s.getSkillsByStarLevel(s.selectedRelic.skills).length > 0 ? (v(), i("div", Xe, [c("h3", null, o(s.t("czn.relics.skills")), 1), c("div", el, [(v(!0), i(n, null, d(s.getSkillsByStarLevel(s.selectedRelic.skills), (e, l) => (v(), i("div", {
            key: l,
            class: "skill-detail-item"
        }, [e.description ? (v(), i("div", {
            key: 0,
            class: "skill-description",
            innerHTML: s.formatDescription(e.description)
        }, null, 8, ll)) : r("", !0), e.link_cs_id && e.link_cs_id.length > 0 ? (v(), i("div", al, [c("div", sl, [c("span", tl, o(s.t("czn.relics.linkCsId")) + ":", 1), c("span", il, o(e.link_cs_id.join(", ")), 1)])])) : r("", !0), e.cs_value && e.cs_value.length > 0 ? (v(), i("div", rl, [c("div", cl, [c("span", ol, o(s.t("czn.relics.csValue")) + ":", 1), c("span", nl, o(e.cs_value.join(", ")), 1)])])) : r("", !0)]))), 128))])])) : r("", !0), s.selectedRelic.recommend_link_char_base_id && s.selectedRelic.recommend_link_char_base_id.length > 0 ? (v(), i("div", dl, [c("h3", null, o(s.t("czn.relics.recommendCharacters")), 1), c("div", ul, [(v(!0), i(n, null, d(s.selectedRelic.recommend_link_char_base_id, (e, l) => (v(), i("span", {
            key: l,
            class: "character-item"
        }, o(e), 1))), 128))])])) : r("", !0)])])])])) : r("", !0), g(S, {
            show: s.showRelicReinforce,
            onClose: l[19] || (l[19] = e => s.showRelicReinforce = !1)
        }, null, 8, ["show"])]))])
    }],
    ["__scopeId", "data-v-78f9ea6b"]
]);
export {
    hl as
    default
};