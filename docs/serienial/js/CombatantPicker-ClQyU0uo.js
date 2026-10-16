import {
    _ as e,
    i as t,
    c as a,
    d as l,
    a as n,
    G as o,
    n as s,
    o as i,
    u as r,
    t as d,
    y as c,
    p as u,
    w as m,
    F as p,
    m as g,
    r as v,
    C as h,
    H as y,
    P as b,
    q as f,
    s as C,
    R as k,
    B as w,
    e as S,
    v as I,
    T as V
} from "./index-LLMsysJK.js";
import {
    f as E
} from "./descriptionFormatter-B58vtNQt.js";
import {
    G as _
} from "./GradeFilter-CKtlT6rD.js";
import {
    F as x
} from "./index-Ba732c4P.js";
const M = ["src", "alt"];
const R = e({
        name: "EgoIcon",
        props: {
            ego: {
                type: String,
                default: ""
            }
        },
        setup: e => ({
            backgroundUrl: t(() => {
                return (t = e.ego) ? `/api/assets/file/czn/data/img/bg_ego_${t}.webp` : "";
                var t
            }),
            iconUrl: t(() => {
                return (t = e.ego) ? `/api/assets/file/czn/data/img/icon_ego_${t}.webp` : "";
                var t
            }),
            handleIconError: e => {
                e.target.style.display = "none"
            }
        })
    }, [
        ["render", function(e, t, r, d, c, u) {
            return r.ego ? (i(), a("div", {
                key: 0,
                class: s(["ego-icon", `ego-${r.ego}`]),
                style: o({
                    "--bg-image": `url(${d.backgroundUrl})`
                })
            }, [n("img", {
                src: d.iconUrl,
                alt: `${r.ego} icon`,
                class: "ego-icon-image",
                onError: t[0] || (t[0] = (...e) => d.handleIconError && d.handleIconError(...e))
            }, null, 40, M)], 6)) : l("", !0)
        }],
        ["__scopeId", "data-v-bec84b77"]
    ]),
    z = ["src", "alt"];
const j = e({
        name: "CznJobIcon",
        props: {
            job: {
                type: String,
                default: ""
            }
        },
        setup: e => ({
            iconUrl: t(() => {
                return (t = e.job) ? `/api/assets/file/czn/data/img/icon_job_${t}.webp` : "";
                var t
            }),
            handleIconError: e => {
                e.target.style.display = "none"
            }
        })
    }, [
        ["render", function(e, t, o, r, d, c) {
            return o.job ? (i(), a("div", {
                key: 0,
                class: s(["job-icon", `job-${o.job}`])
            }, [n("img", {
                src: r.iconUrl,
                alt: `${o.job} icon`,
                class: "job-icon-image",
                onError: t[0] || (t[0] = (...e) => r.handleIconError && r.handleIconError(...e))
            }, null, 40, z)], 2)) : l("", !0)
        }],
        ["__scopeId", "data-v-ab4f03be"]
    ]),
    T = {
        name: "CombatantDisplay",
        components: {
            EgoIcon: R,
            CznJobIcon: j
        },
        props: {
            combatant: {
                type: Object,
                default: null
            },
            isSelected: {
                type: Boolean,
                default: !1
            },
            hideRemove: {
                type: Boolean,
                default: !1
            },
            scale: {
                type: Number,
                default: 1
            },
            showBorder: {
                type: Boolean,
                default: !1
            },
            isNew: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["click", "remove"],
        setup(e, {
            emit: t
        }) {
            const {
                t: a
            } = r(), l = e => 5 === e ? "ssr" : 4 === e ? "sr" : 3 === e ? "r" : null;
            return {
                t: a,
                handleClick: () => {
                    t("click")
                },
                handleRemove: () => {
                    t("remove")
                },
                getCombatantPortraitUrl: e => (null == e ? void 0 : e.id) ? `/api/assets/file/czn/data/face/character/portrait_character_crop_half_${e.id}.webp` : "/assets/icons/icon_menu_portrait.png",
                getRarityType: l,
                getRarityBorderUrl: e => {
                    const t = l(e);
                    return t ? `/api/assets/file/czn/data/rarity/slot_rarity_${t}.webp` : ""
                },
                slotBackgroundUrl: "/api/assets/file/czn/data/img/img_slot_bg.webp",
                handleImageError: e => {
                    e.target.style.display = "none"
                }
            }
        }
    },
    N = {
        key: 0,
        class: "empty-slot"
    },
    J = {
        class: "add-text"
    },
    $ = {
        key: 1,
        class: "combatant-info"
    },
    H = {
        key: 0,
        class: "ribbon-wrapper"
    },
    U = {
        class: "portrait-container"
    },
    B = ["src", "alt"],
    A = {
        class: "icon-group"
    },
    F = {
        key: 0,
        class: "job-badge"
    },
    P = {
        key: 1,
        class: "ego-badge"
    },
    L = {
        class: "combatant-name"
    },
    W = {
        key: 0,
        class: "rarity-border-wrapper"
    },
    O = ["title"];
const G = e(T, [
        ["render", function(e, t, r, p, g, v) {
            const h = u("CznJobIcon"),
                y = u("EgoIcon");
            return i(), a("div", {
                class: s(["combatant-display", {
                    selected: r.isSelected,
                    empty: !r.combatant,
                    "has-border": r.showBorder
                }]),
                style: o({
                    "--scale": r.scale
                }),
                onClick: t[2] || (t[2] = (...e) => p.handleClick && p.handleClick(...e))
            }, [r.combatant ? (i(), a("div", $, [r.isNew ? (i(), a("div", H, t[4] || (t[4] = [n("div", {
                class: "ribbon ribbon-new"
            }, "NEW", -1)]))) : l("", !0), n("div", {
                class: "slot-background",
                style: o({
                    "--slot-bg-image": `url(${p.slotBackgroundUrl})`
                })
            }, null, 4), n("div", U, [n("img", {
                src: p.getCombatantPortraitUrl(r.combatant),
                alt: r.combatant.name,
                onError: t[0] || (t[0] = (...e) => p.handleImageError && p.handleImageError(...e)),
                class: "portrait"
            }, null, 40, B), n("div", A, [r.combatant.job ? (i(), a("div", F, [c(h, {
                job: r.combatant.job
            }, null, 8, ["job"])])) : l("", !0), r.combatant.ego ? (i(), a("div", P, [c(y, {
                ego: r.combatant.ego
            }, null, 8, ["ego"])])) : l("", !0)]), n("div", L, d(r.combatant.name), 1), p.getRarityType(r.combatant.rarity) ? (i(), a("div", W, [n("div", {
                class: "rarity-border",
                style: o({
                    "--rarity-image": `url(${p.getRarityBorderUrl(r.combatant.rarity)})`
                })
            }, null, 4), t[5] || (t[5] = n("div", {
                class: "rarity-background"
            }, null, -1))])) : l("", !0)]), r.hideRemove ? l("", !0) : (i(), a("button", {
                key: 1,
                class: "remove-btn",
                onClick: t[1] || (t[1] = m((...e) => p.handleRemove && p.handleRemove(...e), ["stop"])),
                title: p.t("czn.deckBuilder.removeCombatant")
            }, " × ", 8, O))])) : (i(), a("div", N, [t[3] || (t[3] = n("div", {
                class: "add-icon"
            }, "+", -1)), n("div", J, d(p.t("czn.deckBuilder.addCombatant")), 1)]))], 6)
        }],
        ["__scopeId", "data-v-b6d63c77"]
    ]),
    D = {
        class: "partner-hover-info"
    },
    q = {
        key: 0,
        class: "section ego-skill-section"
    },
    K = {
        class: "section-header"
    },
    Q = {
        class: "header-main"
    },
    X = {
        class: "skill-name"
    },
    Y = {
        class: "skill-type"
    },
    Z = {
        key: 0,
        class: "cost-badge"
    },
    ee = {
        class: "cost-value"
    },
    te = {
        class: "section-body"
    },
    ae = ["innerHTML"],
    le = {
        key: 1,
        class: "section-divider"
    },
    ne = {
        key: 2,
        class: "section passive-section"
    },
    oe = {
        key: 0,
        class: "section-header"
    },
    se = {
        class: "header-main"
    },
    ie = {
        class: "skill-name"
    },
    re = {
        class: "skill-type"
    },
    de = {
        class: "section-body"
    },
    ce = ["innerHTML"];
const ue = e({
        name: "PartnerHoverInfo",
        props: {
            partner: {
                type: Object,
                required: !0
            }
        },
        setup(e) {
            const {
                t: a
            } = r();
            return {
                t: a,
                description: t(() => {
                    var t;
                    return (null == (t = e.partner.partner_card) ? void 0 : t.desc_display) || ""
                }),
                cardName: t(() => {
                    var t;
                    return (null == (t = e.partner.partner_card) ? void 0 : t.name) || e.partner.name
                }),
                cost: t(() => {
                    var t;
                    return null == (t = e.partner.partner_card) ? void 0 : t.cost
                }),
                passives: t(() => {
                    if (!e.partner.partner_passives || 0 === e.partner.partner_passives.length) return [];
                    const t = Math.max(...e.partner.partner_passives.map(e => e.level || 0));
                    return e.partner.partner_passives.filter(e => (e.level || 0) === t)
                }),
                formatDescription: E
            }
        }
    }, [
        ["render", function(e, t, o, s, r, c) {
            return i(), a("div", D, [s.description ? (i(), a("div", q, [n("div", K, [n("div", Q, [n("span", X, d(s.cardName), 1), n("span", Y, d(s.t("czn.egoSkill")), 1)]), void 0 !== s.cost ? (i(), a("div", Z, [t[0] || (t[0] = n("span", {
                class: "cost-label"
            }, "EP", -1)), n("span", ee, d(s.cost), 1)])) : l("", !0)]), n("div", te, [n("div", {
                class: "description",
                innerHTML: s.formatDescription(s.description)
            }, null, 8, ae)])])) : l("", !0), s.description && s.passives && s.passives.length > 0 ? (i(), a("div", le)) : l("", !0), s.passives && s.passives.length > 0 ? (i(), a("div", ne, [(i(!0), a(p, null, g(s.passives, (e, t) => (i(), a("div", {
                key: e.id || t,
                class: "passive-item-container"
            }, [0 === t ? (i(), a("div", oe, [n("div", se, [n("span", ie, d(e.name), 1), n("span", re, d(s.t("czn.partnerPassive")), 1)])])) : l("", !0), n("div", de, [n("div", {
                class: "description",
                innerHTML: s.formatDescription(e.description)
            }, null, 8, ce)])]))), 128))])) : l("", !0)])
        }],
        ["__scopeId", "data-v-ba54b2fb"]
    ]),
    me = ["onClick"],
    pe = {
        class: "ego-item"
    };
const ge = e({
        name: "EgoFilter",
        components: {
            EgoIcon: R
        },
        props: {
            modelValue: {
                type: String,
                default: ""
            },
            customEgos: {
                type: Array,
                default: null
            }
        },
        emits: ["update:modelValue", "change"],
        setup(e, {
            emit: t
        }) {
            const {
                t: a
            } = r(), l = e.customEgos || [{
                value: "creed"
            }, {
                value: "instinct"
            }, {
                value: "love"
            }, {
                value: "narcissism"
            }, {
                value: "norms"
            }], n = v(e.modelValue);
            return {
                egos: l,
                selectedEgo: n,
                toggleEgo: e => {
                    n.value === e ? n.value = "" : n.value = e, t("update:modelValue", n.value), t("change", n.value)
                }
            }
        }
    }, [
        ["render", function(e, t, l, r, d, m) {
            const v = u("EgoIcon");
            return i(), a("div", {
                class: "filter-row",
                style: o({
                    gridTemplateColumns: `repeat(${r.egos.length}, 1fr)`
                })
            }, [(i(!0), a(p, null, g(r.egos, e => (i(), a("div", {
                key: e.value,
                class: s(["filter-cell", {
                    active: r.selectedEgo === e.value
                }]),
                onClick: t => r.toggleEgo(e.value)
            }, [n("div", pe, [c(v, {
                ego: e.value
            }, null, 8, ["ego"])])], 10, me))), 128))], 4)
        }],
        ["__scopeId", "data-v-4180bdda"]
    ]),
    ve = ["onClick"],
    he = {
        class: "job-item"
    };
const ye = e({
        name: "CznJobFilter",
        components: {
            CznJobIcon: j
        },
        props: {
            modelValue: {
                type: String,
                default: ""
            },
            customJobs: {
                type: Array,
                default: null
            }
        },
        emits: ["update:modelValue", "change"],
        setup(e, {
            emit: t
        }) {
            const {
                t: a
            } = r(), l = e.customJobs || [{
                value: "striker"
            }, {
                value: "knight"
            }, {
                value: "ranger"
            }, {
                value: "hunter"
            }, {
                value: "psionic"
            }, {
                value: "controller"
            }], n = v(e.modelValue);
            return {
                jobs: l,
                selectedJob: n,
                toggleJob: e => {
                    n.value === e ? n.value = "" : n.value = e, t("update:modelValue", n.value), t("change", n.value)
                }
            }
        }
    }, [
        ["render", function(e, t, l, r, d, m) {
            const v = u("CznJobIcon");
            return i(), a("div", {
                class: "filter-row",
                style: o({
                    gridTemplateColumns: `repeat(${r.jobs.length}, 1fr)`
                })
            }, [(i(!0), a(p, null, g(r.jobs, e => (i(), a("div", {
                key: e.value,
                class: s(["filter-cell", {
                    active: r.selectedJob === e.value
                }]),
                onClick: t => r.toggleJob(e.value)
            }, [n("div", he, [c(v, {
                job: e.value
            }, null, 8, ["job"])])], 10, ve))), 128))], 4)
        }],
        ["__scopeId", "data-v-ca17f258"]
    ]),
    be = ["onClick"];
const fe = e({
        name: "VGrid",
        components: {
            VList: x
        },
        props: {
            data: {
                type: Array,
                required: !0
            },
            columns: {
                type: Number,
                default: null
            },
            itemHeight: {
                type: Number,
                default: 340
            },
            itemWidth: {
                type: Number,
                default: 240
            },
            height: {
                type: String,
                default: "600px"
            },
            containerStyle: {
                type: Object,
                default: () => ({})
            },
            gridStyle: {
                type: Object,
                default: () => ({})
            },
            getItemKey: {
                type: Function,
                default: (e, t) => e.id || e.key || t
            },
            getItemClass: {
                type: Function,
                default: () => ({})
            },
            onItemClick: {
                type: Function,
                default: () => {}
            }
        },
        emits: ["item-click"],
        setup(e, {
            emit: a
        }) {
            const l = v(1200),
                n = v(4),
                o = v(window.innerWidth),
                s = () => {
                    const t = document.querySelector(".v-grid");
                    l.value = t ? t.clientWidth : window.innerWidth - 200, (() => {
                        if (null !== e.columns) return void(n.value = e.columns);
                        const t = e.itemWidth,
                            a = o.value <= 767 ? 4 : 16,
                            s = o.value <= 767 ? 16 : 32,
                            i = l.value - s,
                            r = Math.floor((i + a) / (t + a));
                        n.value = Math.max(1, Math.min(6, r))
                    })()
                },
                i = () => {
                    o.value = window.innerWidth, s()
                };
            h(() => {
                y(() => {
                    s()
                }), window.addEventListener("resize", i)
            }), b(() => {
                window.removeEventListener("resize", i)
            });
            return {
                gridRows: t(() => {
                    const t = [],
                        a = e.data,
                        l = n.value;
                    for (let e = 0; e < a.length; e += l) {
                        const n = a.slice(e, e + l),
                            o = l - n.length;
                        t.push({
                            id: `row-${Math.floor(e/l)}`,
                            index: Math.floor(e / l),
                            items: n,
                            placeholders: o > 0 ? Array(o).fill(null) : []
                        })
                    }
                    return t
                }),
                gridRowStyle: t(() => ({
                    "grid-template-columns": `repeat(${n.value}, 1fr)`,
                    height: `${e.itemHeight}px`
                })),
                computedItemSize: t(() => {
                    const t = o.value <= 767 ? 4 : 8;
                    return e.itemHeight + t
                }),
                handleItemClick: (t, l) => {
                    a("item-click", t, l), e.onItemClick(t, l)
                },
                columns: n,
                getItemKey: e.getItemKey,
                getItemClass: e.getItemClass
            }
        }
    }, [
        ["render", function(e, t, l, r, d, c) {
            const m = u("VList");
            return i(), f(m, {
                data: r.gridRows,
                class: "v-grid",
                style: o(l.gridStyle),
                "item-size": r.computedItemSize
            }, {
                default: C(({
                    item: t,
                    index: l
                }) => [n("div", {
                    class: "v-grid-row",
                    style: o(r.gridRowStyle)
                }, [(i(!0), a(p, null, g(t.items, (l, n) => (i(), a("div", {
                    key: r.getItemKey(l, t.index * r.columns + n),
                    class: s(["v-grid-item", r.getItemClass(l, t.index * r.columns + n)]),
                    onClick: e => r.handleItemClick(l, t.index * r.columns + n)
                }, [k(e.$slots, "default", {
                    item: l,
                    index: t.index * r.columns + n,
                    rowIndex: t.index,
                    colIndex: n
                }, void 0, !0)], 10, be))), 128)), (i(!0), a(p, null, g(t.placeholders, e => (i(), a("div", {
                    key: `placeholder-${e}`,
                    class: "v-grid-item placeholder"
                }))), 128))], 4)]),
                _: 3
            }, 8, ["data", "style", "item-size"])
        }],
        ["__scopeId", "data-v-1c25fb39"]
    ]),
    Ce = {
        name: "AdaptiveGrid",
        components: {
            VGrid: fe
        },
        props: {
            items: {
                type: Array,
                default: () => []
            },
            useVirtualScroll: {
                type: Boolean,
                default: !1
            },
            minColumns: {
                type: Number,
                default: null
            },
            defaultColumns: {
                type: Number,
                default: null
            },
            minItemWidth: {
                type: Number,
                default: 200
            },
            baseItemWidth: {
                type: Number,
                required: !0
            },
            baseItemHeight: {
                type: Number,
                required: !0
            },
            baseScale: {
                type: Number,
                default: 1
            },
            minScale: {
                type: Number,
                default: null
            },
            padding: {
                type: Number,
                default: 0
            },
            maxScale: {
                type: Number,
                default: null
            },
            gap: {
                type: Number,
                default: 4
            },
            itemHeight: {
                type: Number,
                default: 340
            },
            itemWidth: {
                type: Number,
                default: 240
            },
            getItemKey: {
                type: Function,
                default: (e, t) => (null == e ? void 0 : e.id) || (null == e ? void 0 : e.key) || t
            },
            getItemClass: {
                type: Function,
                default: () => ({})
            }
        },
        emits: ["item-click"],
        setup(e, {
            emit: a
        }) {
            const l = v(null),
                n = v(0),
                o = t(() => {
                    if (e.useVirtualScroll) return {
                        columns: 0,
                        scale: e.baseScale
                    };
                    if (!n.value) return e.defaultColumns ? {
                        columns: e.defaultColumns,
                        scale: e.baseScale
                    } : {
                        columns: 0,
                        scale: e.baseScale
                    };
                    const t = n.value,
                        a = e.gap,
                        l = e.baseItemWidth,
                        o = null !== e.minScale ? e.minScale : .8,
                        s = null !== e.maxScale ? e.maxScale : 1.2,
                        i = Math.floor((t + a) / (l * o + a)),
                        r = Math.max(1, i);
                    !e.minColumns || Math.min(e.minColumns, r);
                    let d = null,
                        c = Number.MAX_VALUE;
                    for (let n = 1; n <= r; n++) {
                        const o = (t - (n - 1) * a) / n / l;
                        if (o > s + .01) continue;
                        const i = !e.minColumns || n >= e.minColumns;
                        let r = Math.abs(o - e.baseScale);
                        i || (r += 1e3), r < c && (c = r, d = {
                            columns: n,
                            scale: o
                        })
                    }
                    if (d) return d;
                    return {
                        columns: r,
                        scale: (t - (r - 1) * a) / r / l
                    }
                }),
                s = t(() => o.value.scale),
                i = t(() => o.value.columns),
                r = t(() => {
                    if (e.useVirtualScroll) return {};
                    if (!n.value && !e.defaultColumns) return {};
                    const t = e.gap;
                    return {
                        gridTemplateColumns: `repeat(${o.value.columns}, 1fr)`,
                        gap: `${t}px`,
                        padding: `${e.padding}px`,
                        justifyContent: "start",
                        justifyItems: "center"
                    }
                }),
                d = t(() => {
                    if (e.useVirtualScroll) return {};
                    if (!n.value && !e.defaultColumns) return {};
                    const t = o.value.scale,
                        a = e.baseItemWidth * t,
                        l = e.baseItemHeight * t;
                    return {
                        width: `${a}px`,
                        height: `${l}px`,
                        minHeight: `${l}px`
                    }
                });
            let c = null;
            const u = () => {
                    l.value && requestAnimationFrame(() => {
                        if (l.value) {
                            const e = window.getComputedStyle(l.value),
                                t = parseFloat(e.paddingLeft) || 0,
                                a = parseFloat(e.paddingRight) || 0;
                            n.value = l.value.clientWidth - t - a
                        }
                    })
                },
                m = ((e, t) => {
                    let a;
                    const l = (...l) => {
                        clearTimeout(a), a = setTimeout(() => {
                            e(...l)
                        }, t)
                    };
                    return l.cancel = () => {
                        clearTimeout(a)
                    }, l
                })(u, 100),
                p = () => {
                    c && (c.disconnect(), c = null), !e.useVirtualScroll && l.value && (u(), c = new ResizeObserver(e => {
                        m()
                    }), c.observe(l.value))
                },
                g = () => {
                    !e.useVirtualScroll && l.value && m()
                };
            h(() => {
                e.useVirtualScroll || y(() => {
                    y(() => {
                        u(), p(), window.addEventListener("resize", g), setTimeout(() => {
                            u()
                        }, 100)
                    })
                })
            }), b(() => {
                c && (c.disconnect(), c = null), window.removeEventListener("resize", g), m.cancel && m.cancel()
            }), w(() => e.useVirtualScroll, () => {
                y(() => {
                    p()
                })
            }), w(() => e.minColumns, () => {
                e.useVirtualScroll || y(() => {
                    u()
                })
            }), w(s, e => {});
            return {
                gridContainer: l,
                computedScale: s,
                gridStyle: r,
                itemStyle: d,
                handleItemClick: (e, t) => {
                    a("item-click", e, t)
                },
                actualColumns: i,
                scrollToElement: (e, t = {}) => {
                    const {
                        maxRetries: a = 30,
                        retryDelay: o = 50,
                        block: s = "center"
                    } = t;
                    return new Promise(t => {
                        let i = 0;
                        const r = () => {
                            if (!l.value) return void(i < a ? (i++, setTimeout(r, o)) : t(!1));
                            if (!n.value) return void(i < a ? (i++, setTimeout(r, o)) : t(!1));
                            const d = l.value.querySelector(e);
                            if (!d) return void(i < a ? (i++, setTimeout(r, o)) : t(!1));
                            const c = d.getBoundingClientRect();
                            0 !== c.height && 0 !== c.width ? (d.scrollIntoView({
                                behavior: "instant",
                                block: s,
                                inline: "nearest"
                            }), t(!0)) : i < a ? (i++, setTimeout(r, o)) : t(!1)
                        };
                        r()
                    })
                }
            }
        }
    },
    ke = ["onClick"];
const we = e(Ce, [
        ["render", function(e, t, l, n, r, d) {
            const c = u("VGrid");
            return l.useVirtualScroll ? (i(), f(c, {
                key: 0,
                data: l.items,
                "item-height": l.itemHeight,
                "item-width": l.itemWidth,
                columns: l.minColumns,
                "get-item-key": l.getItemKey,
                "get-item-class": l.getItemClass,
                onItemClick: n.handleItemClick
            }, {
                default: C(({
                    item: t,
                    index: a
                }) => [k(e.$slots, "default", {
                    item: t,
                    index: a,
                    scale: n.computedScale
                }, void 0, !0)]),
                _: 3
            }, 8, ["data", "item-height", "item-width", "columns", "get-item-key", "get-item-class", "onItemClick"])) : (i(), a("div", {
                key: 1,
                ref: "gridContainer",
                class: "adaptive-grid",
                style: o(n.gridStyle)
            }, [(i(!0), a(p, null, g(l.items, (t, r) => (i(), a("div", {
                key: l.getItemKey(t, r),
                class: s(["grid-item", l.getItemClass(t, r)]),
                style: o(n.itemStyle),
                onClick: e => n.handleItemClick(t, r)
            }, [k(e.$slots, "default", {
                item: t,
                index: r,
                scale: n.computedScale
            }, void 0, !0)], 14, ke))), 128))], 4))
        }],
        ["__scopeId", "data-v-0e211101"]
    ]),
    Se = ["striker", "knight", "ranger", "hunter", "psionic", "controller"],
    Ie = e => {
        const t = Se.indexOf(e || "");
        return -1 === t ? 999 : t
    },
    Ve = {
        name: "CombatantPicker",
        components: {
            CombatantDisplay: G,
            PartnerHoverInfo: ue,
            GradeFilter: _,
            EgoFilter: ge,
            JobFilter: ye,
            AdaptiveGrid: we
        },
        props: {
            mode: {
                type: String,
                default: "modal",
                validator: e => ["modal", "inline"].includes(e)
            },
            show: {
                type: Boolean,
                default: !1
            },
            combatants: {
                type: Array,
                default: () => []
            },
            modelValue: {
                type: String,
                default: ""
            },
            loading: {
                type: Boolean,
                default: !1
            },
            scale: {
                type: Number,
                default: .48
            },
            headerTitle: {
                type: String,
                default: ""
            },
            searchPlaceholder: {
                type: String,
                default: ""
            },
            noResultText: {
                type: String,
                default: ""
            },
            closeOnSelect: {
                type: Boolean,
                default: !0
            },
            charType: {
                type: String,
                default: "CHAR_COMBATANT",
                validator: e => ["CHAR_COMBATANT", "CHAR_SUPPORTER"].includes(e)
            },
            showEgoFilter: {
                type: Boolean,
                default: !0
            },
            customGrades: {
                type: Array,
                default: null
            },
            showSearch: {
                type: Boolean,
                default: !0
            },
            minColumns: {
                type: Number,
                default: 3
            },
            minCombatantWidth: {
                type: Number,
                default: 110
            },
            defaultJob: {
                type: String,
                default: ""
            },
            showHoverInfo: {
                type: Boolean,
                default: !1
            },
            minScale: {
                type: Number,
                default: null
            },
            maxScale: {
                type: Number,
                default: null
            },
            gap: {
                type: Number,
                default: 16
            },
            diffStatus: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ["update:show", "select", "update:modelValue"],
        setup(e, {
            emit: a
        }) {
            const {
                t: l
            } = r(), n = v(""), o = v(""), s = v(""), i = v("");
            w(() => e.show, t => {
                t && e.defaultJob && (i.value = e.defaultJob)
            });
            const d = v(window.innerWidth),
                c = t(() => d.value <= 767),
                u = v(!1),
                m = v(null),
                p = v({}),
                g = t(() => {
                    let t = e.combatants.filter(t => t.char_type === e.charType);
                    if (n.value) {
                        const e = n.value.toLowerCase();
                        t = t.filter(t => t.name.toLowerCase().includes(e) || t.id.toLowerCase().includes(e))
                    }
                    o.value && (t = t.filter(e => e.rarity === parseInt(o.value))), s.value && (t = t.filter(e => e.ego === s.value)), i.value && (t = t.filter(e => e.job === i.value));
                    const a = (e => {
                        if (!Array.isArray(e)) return e;
                        const t = [...e];
                        return t.sort((e, t) => e.rarity !== t.rarity ? t.rarity - e.rarity : Ie(e.job) - Ie(t.job)), t
                    })(t);
                    return e.diffStatus && Object.keys(e.diffStatus).length > 0 && a.sort((t, a) => {
                        const l = "new" === e.diffStatus[t.id] ? 1 : 0;
                        return ("new" === e.diffStatus[a.id] ? 1 : 0) - l
                    }), a
                }),
                h = () => {
                    "modal" === e.mode && (a("update:show", !1), n.value = "", o.value = "", s.value = "", i.value = "")
                },
                y = t(() => c.value ? 3 : e.minColumns);
            return {
                t: l,
                searchQuery: n,
                selectedRarity: o,
                selectedEgo: s,
                selectedJob: i,
                filteredCombatants: g,
                handleSelect: t => {
                    e.modelValue === t.id ? (a("select", null), a("update:modelValue", "")) : (a("select", t), a("update:modelValue", t.id), "modal" === e.mode && e.closeOnSelect && h())
                },
                close: h,
                handleOverlayClick: () => {
                    h()
                },
                handleRarityChange: e => {
                    o.value = e
                },
                handleEgoChange: e => {
                    s.value = e
                },
                handleJobChange: e => {
                    i.value = e
                },
                isMobileDevice: c,
                isMobileDevice: c,
                computedMinColumns: y,
                showHover: u,
                hoverPartner: m,
                hoverStyle: p,
                handleMouseEnter: (t, a) => {
                    if (c.value || "CHAR_SUPPORTER" !== e.charType || !e.showHoverInfo) return;
                    m.value = t;
                    const l = a.currentTarget.getBoundingClientRect(),
                        n = window.innerWidth - l.right,
                        o = l.left;
                    let s = l.right + 10;
                    n < 340 && o > 340 && (s = l.left - 340 - 10);
                    let i = l.top;
                    i + 300 > window.innerHeight && (i = window.innerHeight - 300 - 10), i < 10 && (i = 10), p.value = {
                        position: "fixed",
                        left: `${s}px`,
                        top: `${i}px`,
                        zIndex: 2e3
                    }, u.value = !0
                },
                handleMouseLeave: () => {
                    u.value = !1, m.value = null
                }
            }
        }
    },
    Ee = {
        key: 0,
        class: "picker-header"
    },
    _e = {
        class: "picker-body"
    },
    xe = {
        key: 0,
        class: "search-box"
    },
    Me = ["placeholder"],
    Re = {
        class: "filter-group"
    },
    ze = {
        class: "filter-label"
    },
    je = {
        class: "filter-options"
    },
    Te = {
        key: 0,
        class: "filter-group"
    },
    Ne = {
        class: "filter-label"
    },
    Je = {
        class: "filter-options"
    },
    $e = {
        class: "filter-group"
    },
    He = {
        class: "filter-label"
    },
    Ue = {
        class: "filter-options"
    },
    Be = {
        class: "combatants-list"
    },
    Ae = {
        key: 0,
        class: "no-result"
    },
    Fe = ["onMouseenter"],
    Pe = {
        class: "combatant-display-wrapper"
    },
    Le = {
        key: 0,
        class: "combatant-picker-inline"
    },
    We = {
        key: 0,
        class: "search-box"
    },
    Oe = ["placeholder"],
    Ge = {
        class: "filters"
    },
    De = {
        class: "combatants-list"
    },
    qe = {
        key: 0,
        class: "loading-state"
    },
    Ke = {
        class: "loading-text"
    },
    Qe = {
        key: 1,
        class: "no-result"
    },
    Xe = ["onMouseenter"],
    Ye = {
        class: "combatant-display-wrapper"
    };
const Ze = e(Ve, [
    ["render", function(e, t, r, g, v, h) {
        const y = u("GradeFilter"),
            b = u("EgoFilter"),
            k = u("JobFilter"),
            w = u("CombatantDisplay"),
            E = u("AdaptiveGrid"),
            _ = u("PartnerHoverInfo");
        return i(), a(p, null, [(i(), f(V, {
            to: "body"
        }, ["modal" === r.mode && r.show ? (i(), a("div", {
            key: 0,
            class: "combatant-picker-overlay",
            onClick: t[11] || (t[11] = (...e) => g.handleOverlayClick && g.handleOverlayClick(...e))
        }, [n("div", {
            class: "combatant-picker-modal",
            onClick: t[10] || (t[10] = m(() => {}, ["stop"]))
        }, [g.isMobileDevice ? l("", !0) : (i(), a("div", Ee, [n("h3", null, d(r.headerTitle || g.t("czn.deckBuilder.selectCombatant")), 1), n("button", {
            class: "close-btn",
            onClick: t[0] || (t[0] = (...e) => g.close && g.close(...e))
        }, "×")])), n("div", _e, [r.showSearch ? (i(), a("div", xe, [S(n("input", {
            "onUpdate:modelValue": t[1] || (t[1] = e => g.searchQuery = e),
            type: "text",
            placeholder: r.searchPlaceholder || g.t("czn.searchCombatant"),
            class: "search-input"
        }, null, 8, Me), [
            [I, g.searchQuery]
        ])])) : l("", !0), n("div", {
            class: s(["filters", {
                "with-labels": !g.isMobileDevice
            }])
        }, [g.isMobileDevice ? (i(), a(p, {
            key: 1
        }, [c(y, {
            modelValue: g.selectedRarity,
            "onUpdate:modelValue": t[5] || (t[5] = e => g.selectedRarity = e),
            onChange: g.handleRarityChange,
            "game-type": "czn",
            "custom-grades": r.customGrades
        }, null, 8, ["modelValue", "onChange", "custom-grades"]), r.showEgoFilter ? (i(), f(b, {
            key: 0,
            modelValue: g.selectedEgo,
            "onUpdate:modelValue": t[6] || (t[6] = e => g.selectedEgo = e),
            onChange: g.handleEgoChange
        }, null, 8, ["modelValue", "onChange"])) : l("", !0), c(k, {
            modelValue: g.selectedJob,
            "onUpdate:modelValue": t[7] || (t[7] = e => g.selectedJob = e),
            onChange: g.handleJobChange
        }, null, 8, ["modelValue", "onChange"])], 64)) : (i(), a(p, {
            key: 0
        }, [n("div", Re, [n("label", ze, d(g.t("czn.cards.combatantRarity")), 1), n("div", je, [c(y, {
            modelValue: g.selectedRarity,
            "onUpdate:modelValue": t[2] || (t[2] = e => g.selectedRarity = e),
            onChange: g.handleRarityChange,
            "game-type": "czn",
            "custom-grades": r.customGrades
        }, null, 8, ["modelValue", "onChange", "custom-grades"])])]), r.showEgoFilter ? (i(), a("div", Te, [n("label", Ne, d(g.t("czn.cards.ego")), 1), n("div", Je, [c(b, {
            modelValue: g.selectedEgo,
            "onUpdate:modelValue": t[3] || (t[3] = e => g.selectedEgo = e),
            onChange: g.handleEgoChange
        }, null, 8, ["modelValue", "onChange"])])])) : l("", !0), n("div", $e, [n("label", He, d(g.t("czn.cards.job")), 1), n("div", Ue, [c(k, {
            modelValue: g.selectedJob,
            "onUpdate:modelValue": t[4] || (t[4] = e => g.selectedJob = e),
            onChange: g.handleJobChange
        }, null, 8, ["modelValue", "onChange"])])])], 64))], 2), n("div", Be, [0 === g.filteredCombatants.length ? (i(), a("div", Ae, d(g.t("czn.noCombatants")), 1)) : (i(), f(E, {
            key: 1,
            items: g.filteredCombatants,
            "min-columns": g.computedMinColumns,
            "min-item-width": r.minCombatantWidth,
            "base-item-width": 260,
            "base-item-height": 460,
            "base-scale": .5,
            "min-scale": .4,
            "max-scale": .6,
            gap: 4,
            "get-item-key": e => e.id,
            "get-item-class": e => ({
                selected: r.modelValue === e.id
            }),
            onItemClick: t[9] || (t[9] = e => g.handleSelect(e))
        }, {
            default: C(({
                item: e,
                scale: a
            }) => [n("div", {
                class: "combatant-item",
                onMouseenter: t => g.handleMouseEnter(e, t),
                onMouseleave: t[8] || (t[8] = (...e) => g.handleMouseLeave && g.handleMouseLeave(...e))
            }, [n("div", Pe, [c(w, {
                combatant: e,
                "is-selected": r.modelValue === e.id,
                "hide-remove": !0,
                scale: a,
                "is-new": r.diffStatus && "new" === r.diffStatus[e.id]
            }, null, 8, ["combatant", "is-selected", "scale", "is-new"])])], 40, Fe)]),
            _: 1
        }, 8, ["items", "min-columns", "min-item-width", "get-item-key", "get-item-class"]))])])]), (i(), f(V, {
            to: "body"
        }, [g.showHover && g.hoverPartner ? (i(), a("div", {
            key: 0,
            class: "partner-hover-container",
            style: o(g.hoverStyle)
        }, [c(_, {
            partner: g.hoverPartner
        }, null, 8, ["partner"])], 4)) : l("", !0)]))])) : l("", !0)])), "inline" === r.mode ? (i(), a("div", Le, [r.showSearch ? (i(), a("div", We, [S(n("input", {
            "onUpdate:modelValue": t[12] || (t[12] = e => g.searchQuery = e),
            type: "text",
            placeholder: r.searchPlaceholder || g.t("czn.searchCombatant"),
            class: "search-input"
        }, null, 8, Oe), [
            [I, g.searchQuery]
        ])])) : l("", !0), n("div", Ge, [c(y, {
            modelValue: g.selectedRarity,
            "onUpdate:modelValue": t[13] || (t[13] = e => g.selectedRarity = e),
            onChange: g.handleRarityChange,
            "game-type": "czn",
            "custom-grades": r.customGrades
        }, null, 8, ["modelValue", "onChange", "custom-grades"]), r.showEgoFilter ? (i(), f(b, {
            key: 0,
            modelValue: g.selectedEgo,
            "onUpdate:modelValue": t[14] || (t[14] = e => g.selectedEgo = e),
            onChange: g.handleEgoChange
        }, null, 8, ["modelValue", "onChange"])) : l("", !0), c(k, {
            modelValue: g.selectedJob,
            "onUpdate:modelValue": t[15] || (t[15] = e => g.selectedJob = e),
            onChange: g.handleJobChange
        }, null, 8, ["modelValue", "onChange"])]), n("div", De, [r.loading ? (i(), a("div", qe, [t[18] || (t[18] = n("div", {
            class: "loading-spinner"
        }, null, -1)), n("div", Ke, d(g.t("common.loading")), 1)])) : 0 === g.filteredCombatants.length ? (i(), a("div", Qe, d(r.noResultText || g.t("czn.noCombatants")), 1)) : (i(), f(E, {
            key: 2,
            items: g.filteredCombatants,
            "min-columns": g.computedMinColumns,
            "default-columns": g.computedMinColumns,
            "min-item-width": r.minCombatantWidth,
            "base-item-width": 260,
            "base-item-height": 460,
            "base-scale": r.scale,
            "min-scale": r.minScale,
            "max-scale": r.maxScale,
            gap: r.gap,
            "get-item-key": e => e.id,
            "get-item-class": e => ({
                selected: r.modelValue === e.id
            }),
            onItemClick: t[17] || (t[17] = e => g.handleSelect(e))
        }, {
            default: C(({
                item: e,
                scale: a
            }) => [n("div", {
                class: "combatant-item",
                onMouseenter: t => g.handleMouseEnter(e, t),
                onMouseleave: t[16] || (t[16] = (...e) => g.handleMouseLeave && g.handleMouseLeave(...e))
            }, [n("div", Ye, [c(w, {
                combatant: e,
                "is-selected": r.modelValue === e.id,
                "hide-remove": !0,
                scale: a,
                "is-new": r.diffStatus && "new" === r.diffStatus[e.id]
            }, null, 8, ["combatant", "is-selected", "scale", "is-new"])])], 40, Xe)]),
            _: 1
        }, 8, ["items", "min-columns", "default-columns", "min-item-width", "base-scale", "min-scale", "max-scale", "gap", "get-item-key", "get-item-class"]))]), (i(), f(V, {
            to: "body"
        }, [g.showHover && g.hoverPartner ? (i(), a("div", {
            key: 0,
            class: "partner-hover-container",
            style: o(g.hoverStyle)
        }, [c(_, {
            partner: g.hoverPartner
        }, null, 8, ["partner"])], 4)) : l("", !0)]))])) : l("", !0)], 64)
    }],
    ["__scopeId", "data-v-432133f1"]
]);
export {
    we as A, Ze as C, ge as E, ye as J, ue as P, fe as V, G as a
};