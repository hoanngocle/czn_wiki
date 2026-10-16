import {
    _ as e,
    a,
    b as t,
    c as o,
    d as n,
    e as l,
    f as s,
    g as i,
    h as c,
    i as r,
    j as d,
    k as u
} from "./icon_type_job_striker-CiGFGdnP.js";
import {
    _ as p,
    r as m,
    i as g,
    C as b,
    H as v,
    P as h,
    B as y,
    c as _,
    d as f,
    q as k,
    t as C,
    s as w,
    G as z,
    F as x,
    m as M,
    n as S,
    p as I,
    o as T,
    R as j,
    y as D,
    u as $,
    a as L,
    aa as V,
    w as P,
    T as U,
    D as R,
    g as E,
    e as N,
    a9 as A,
    S as B,
    a7 as O,
    a8 as W,
    V as F,
    z as H,
    h as G
} from "./index-LLMsysJK.js";
import {
    f as J
} from "./descriptionFormatter-B58vtNQt.js";
import {
    u as K
} from "./useMobileSearch-ngDNb0gu.js";
import {
    V as q,
    A as X,
    C as Q
} from "./CombatantPicker-ClQyU0uo.js";
import {
    C as Y
} from "./CznCard-BU_7QlaH.js";
import {
    c as Z
} from "./api-BhwEKNwi.js";
import {
    _ as ee,
    C as ae,
    a as te,
    b as oe,
    c as ne,
    u as le,
    d as se,
    P as ie
} from "./style-CbJHPVi4.js"; /* empty css                       */
import {
    R as ce
} from "./RSparkCardModal-VsLhT5OG.js";
import re from "./html2canvas.esm-BPY6V10C.js";
import {
    c as de
} from "./GradeFilter-CKtlT6rD.js";
import {
    i as ue
} from "./img_profile_wrap-Dv24z9VM.js";
import "./index-Ba732c4P.js";
import "./cznFontLoader--BOnSV9S.js";
import "./star-BhsqqEIh.js";
const pe = {
        name: "CznCardGroup",
        components: {
            CznCard: Y,
            VGrid: q
        },
        props: {
            cards: {
                type: Array,
                default: () => []
            },
            title: {
                type: String,
                default: ""
            },
            useVirtualScroll: {
                type: Boolean,
                default: !1
            },
            characterEgo: {
                type: String,
                default: "basic"
            },
            scale: {
                type: Number,
                default: .5
            },
            columns: {
                type: Number,
                default: null
            },
            justify: {
                type: String,
                default: "start"
            },
            fixedSize: {
                type: Boolean,
                default: !1
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
                default: e => e.id || e.key
            },
            getItemClass: {
                type: Function,
                default: () => ({})
            },
            debugMode: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["card-click", "item-click"],
        setup(e, {
            emit: a
        }) {
            const t = m(null),
                o = m(null),
                n = m(0),
                l = g(() => e.title || e.cards && e.cards.length > 0),
                s = g(() => {
                    if (e.fixedSize) return e.scale;
                    if (e.useVirtualScroll && e.columns && n.value) {
                        const a = window.innerWidth <= 767,
                            t = a ? 4 : 16,
                            o = a ? 16 : 32,
                            l = (n.value - o - (e.columns - 1) * t) / e.columns / 464;
                        return Math.max(.1, Math.min(2, l))
                    }
                    if (e.useVirtualScroll) return e.scale;
                    if (!e.columns || !n.value) return e.scale;
                    const a = (n.value - 16 * (e.columns - 1)) / e.columns / 464;
                    return Math.max(.1, Math.min(2, a))
                }),
                i = g(() => {
                    if (e.useVirtualScroll && e.columns && n.value) {
                        const a = window.innerWidth <= 767,
                            t = a ? 4 : 16,
                            o = a ? 16 : 32;
                        return (n.value - o - (e.columns - 1) * t) / e.columns
                    }
                    return e.itemWidth
                }),
                c = g(() => {
                    if (e.useVirtualScroll && e.columns && n.value) {
                        return 672 * s.value
                    }
                    return e.itemHeight
                }),
                r = g(() => {
                    if (e.useVirtualScroll) return {};
                    if (!e.columns) return {
                        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                        gap: "1rem",
                        justifyContent: e.justify,
                        justifyItems: "start"
                    };
                    const a = Array.isArray(e.cards) ? e.cards.length : 0,
                        t = a > 0 ? Math.min(e.columns, a) : e.columns;
                    if (e.fixedSize) {
                        const a = 16;
                        return {
                            gridTemplateColumns: `repeat(${t}, auto)`,
                            gap: `${window.innerWidth<=767?Math.max(4,.5*a):a}px`,
                            justifyContent: e.justify,
                            justifyItems: "center"
                        }
                    }
                    if (!n.value) return {
                        gridTemplateColumns: `repeat(${t}, 1fr)`,
                        gap: "1rem",
                        justifyContent: e.justify,
                        justifyItems: "start"
                    };
                    return {
                        gridTemplateColumns: `repeat(${t}, 1fr)`,
                        gap: `${window.innerWidth<=767?Math.max(4,8):16}px`,
                        justifyContent: e.justify,
                        justifyItems: "center"
                    }
                }),
                d = g(() => {
                    if (e.useVirtualScroll || !n.value) return {};
                    const a = 464 * s.value,
                        t = 672 * s.value;
                    return e.fixedSize ? {
                        width: `${a}px`,
                        minWidth: `${a}px`,
                        maxWidth: `${a}px`,
                        minHeight: `${t}px`,
                        display: "flex",
                        justifyContent: "center"
                    } : e.columns ? {
                        width: "100%",
                        maxWidth: `${a}px`,
                        minHeight: `${t}px`,
                        display: "flex",
                        justifyContent: "center"
                    } : {}
                });
            let u = null;
            const p = () => {
                    e.useVirtualScroll && o.value ? n.value = o.value.offsetWidth : t.value && (n.value = t.value.offsetWidth)
                },
                _ = () => {
                    u && (u.disconnect(), u = null);
                    const a = e.useVirtualScroll ? o.value : t.value;
                    a && (p(), u = new ResizeObserver(e => {
                        for (const a of e) n.value = a.contentRect.width
                    }), u.observe(a))
                },
                f = () => {
                    p()
                };
            return b(() => {
                v(() => {
                    v(() => {
                        p(), _(), window.addEventListener("resize", f), setTimeout(() => {
                            p()
                        }, 100)
                    })
                })
            }), h(() => {
                u && (u.disconnect(), u = null), window.removeEventListener("resize", f)
            }), y(() => e.useVirtualScroll, () => {
                v(() => {
                    v(() => {
                        p(), _()
                    })
                })
            }), y(() => e.columns, () => {
                v(() => {
                    p()
                })
            }), {
                shouldShow: l,
                getCardKey: a => e.getItemKey(a),
                handleCardClick: e => {
                    a("card-click", e), a("item-click", e)
                },
                handleItemClick: e => {
                    a("card-click", e), a("item-click", e)
                },
                gridContainer: t,
                cardGroupContainer: o,
                computedScale: s,
                computedItemWidth: i,
                computedItemHeight: c,
                gridStyle: r,
                cardItemStyle: d
            }
        }
    },
    me = {
        key: 0,
        class: "card-group-title"
    };
const ge = p(pe, [
        ["render", function(e, a, t, o, n, l) {
            const s = I("CznCard"),
                i = I("VGrid");
            return o.shouldShow ? (T(), _("div", {
                key: 0,
                class: S(["card-group", {
                    "use-virtual-scroll": t.useVirtualScroll
                }]),
                ref: "cardGroupContainer"
            }, [t.title ? (T(), _("h3", me, C(t.title), 1)) : f("", !0), t.useVirtualScroll ? (T(), k(i, {
                key: 1,
                data: t.cards,
                columns: t.columns,
                "item-height": o.computedItemHeight,
                "item-width": o.computedItemWidth,
                "get-item-key": t.getItemKey,
                "get-item-class": t.getItemClass,
                onItemClick: o.handleItemClick
            }, {
                default: w(({
                    item: a
                }) => [j(e.$slots, "default", {
                    card: a,
                    item: a,
                    scale: o.computedScale
                }, () => [D(s, {
                    card: a,
                    "character-ego": t.characterEgo,
                    scale: o.computedScale,
                    "debug-mode": t.debugMode
                }, null, 8, ["card", "character-ego", "scale", "debug-mode"])], !0)]),
                _: 3
            }, 8, ["data", "columns", "item-height", "item-width", "get-item-key", "get-item-class", "onItemClick"])) : (T(), _("div", {
                key: 2,
                ref: "gridContainer",
                class: "cards-grid",
                style: z(o.gridStyle)
            }, [(T(!0), _(x, null, M(t.cards, a => (T(), _("div", {
                key: o.getCardKey(a),
                class: "card-item",
                style: z(o.cardItemStyle)
            }, [j(e.$slots, "default", {
                card: a,
                item: a,
                scale: o.computedScale
            }, () => [D(s, {
                card: a,
                "character-ego": t.characterEgo,
                scale: o.computedScale,
                "debug-mode": t.debugMode,
                onClick: e => o.handleCardClick(a)
            }, null, 8, ["card", "character-ego", "scale", "debug-mode", "onClick"])], !0)], 4))), 128))], 4))], 2)) : f("", !0)
        }],
        ["__scopeId", "data-v-17123ce5"]
    ]),
    be = {
        class: "counseling-flow-chart"
    },
    ve = {
        key: 0,
        class: "no-data"
    },
    he = {
        key: 1,
        class: "counseling-flow-content"
    },
    ye = {
        key: 0,
        class: "counseling-tabs"
    },
    _e = {
        class: "tab-buttons-desktop"
    },
    fe = ["onClick"],
    ke = ["value"],
    Ce = ["value"],
    we = {
        class: "vue-flow-wrapper"
    },
    ze = {
        class: "vue-flow-container"
    },
    xe = {
        class: "node-content"
    },
    Me = {
        key: 0,
        class: "node-title"
    },
    Se = ["innerHTML"],
    Ie = {
        key: 2,
        class: "node-debug-info"
    },
    Te = {
        key: 0,
        class: "debug-opt"
    },
    je = {
        key: 1,
        class: "debug-stability-range"
    },
    De = {
        class: "node-content"
    },
    $e = {
        class: "node-title choice-title"
    },
    Le = ["innerHTML"],
    Ve = {
        key: 0,
        class: "node-debug-info"
    },
    Pe = {
        class: "debug-opt"
    };
const Ue = {
        name: "CounselingModal",
        components: {
            CounselingFlowChart: p({
                name: "CounselingFlowChart",
                components: {
                    VueFlow: ne,
                    Background: oe,
                    Controls: te,
                    ControlButton: ae,
                    Handle: ee
                },
                props: {
                    counselingData: {
                        type: Object,
                        default: null
                    }
                },
                setup(e) {
                    const {
                        t: a
                    } = $(), t = m([]), o = m([]), n = m("TB"), l = m(0), {
                        layout: s
                    } = le(), {
                        fitView: i
                    } = se(), c = m(!1), r = g(() => e.counselingData && e.counselingData.start), d = g(() => e.counselingData && e.counselingData.start && e.counselingData.start.story_component_counselings ? e.counselingData.start.story_component_counselings.map((e, t) => {
                        let o = `${a("czn.counseling")}${t+1}`;
                        if (e.story && e.story.groups && e.story.groups.length > 0) {
                            const a = e.story.groups[0];
                            if (a.text) {
                                let e = a.text.replace(/<br\s*\/?>/gi, " ");
                                e = e.replace(/\s+/g, " ").trim();
                                o = e.length > 20 ? e.substring(0, 20) + "..." : e
                            }
                        }
                        return {
                            index: t,
                            title: o,
                            component: e
                        }
                    }) : []), u = () => {
                        var n;
                        if (!r.value) return t.value = [], void(o.value = []);
                        const s = [],
                            i = [],
                            u = new Map,
                            p = null == (n = d.value[l.value]) ? void 0 : n.component;
                        if (!p) return t.value = [], void(o.value = []);
                        const m = p,
                            g = `counseling-${l.value+1}`;
                        let b = "",
                            v = "";
                        if (m.story && m.story.groups && m.story.groups.length > 0) {
                            const e = m.story.groups[0];
                            e.text && (v = e.text, b = "")
                        }
                        const h = m.story && m.story.groups && m.story.groups.length > 0 ? m.story.groups[0] : null;
                        s.push({
                            id: g,
                            type: "counseling",
                            position: {
                                x: 0,
                                y: 0
                            },
                            data: {
                                title: b,
                                caption: v,
                                isStart: !0,
                                optTotal: h ? h.opt_total || 0 : void 0
                            }
                        });
                        const y = a => {
                                if (!e.counselingData || !e.counselingData.end || !e.counselingData.end.story_component_counselings) return {
                                    node: null,
                                    index: -1
                                };
                                for (let t = 0; t < e.counselingData.end.story_component_counselings.length; t++) {
                                    const o = e.counselingData.end.story_component_counselings[t];
                                    if (a >= o.stability_min && a <= o.stability_max) return {
                                        node: o,
                                        index: t
                                    }
                                }
                                return e.counselingData.end.story_component_counselings.length > 0 ? {
                                    node: e.counselingData.end.story_component_counselings[0],
                                    index: 0
                                } : {
                                    node: null,
                                    index: -1
                                }
                            },
                            _ = e => {
                                const a = ["end-excellent", "end-good", "end-normal", "end-poor", "end-bad"];
                                return a[e % a.length]
                            },
                            f = (e, t, o = 0) => {
                                if (!m.story || !m.story.groups || t >= m.story.groups.length) return;
                                const n = m.story.groups[t],
                                    l = n.opt_total || 0,
                                    r = o + l;
                                if (n.choice_details && n.choice_details.length > 0) n.choice_details.forEach((n, l) => {
                                    n.choices.forEach((n, r) => {
                                        let d = -1;
                                        for (let e = t + 1; e < m.story.groups.length; e++) {
                                            if (m.story.groups[e].use_choice === n.choice) {
                                                d = e;
                                                break
                                            }
                                        }
                                        if (d >= 0) {
                                            const c = `${e}-choice-${t}-${l}-${r}`;
                                            let u = "choice-default";
                                            u = "L" === n.type ? "choice-left" : "R" === n.type || r % 2 == 0 ? "choice-right" : "choice-left";
                                            const p = void 0 !== n.opt ? n.opt : matchedGroup && matchedGroup.opt_total || 0;
                                            s.push({
                                                id: c,
                                                type: "choice",
                                                position: {
                                                    x: 0,
                                                    y: 0
                                                },
                                                data: {
                                                    title: `${a("czn.choice")} ${n.choice}`,
                                                    text: n.text,
                                                    choiceNumber: n.choice,
                                                    choice: n.choice,
                                                    choiceType: u,
                                                    optTotal: p
                                                }
                                            });
                                            const m = o + p;
                                            i.push({
                                                id: `${e}-${c}`,
                                                source: e,
                                                target: c,
                                                type: "default",
                                                animated: !0,
                                                style: {
                                                    stroke: "#8b5cf6",
                                                    strokeWidth: 2
                                                },
                                                markerEnd: {
                                                    type: "arrowclosed",
                                                    color: "#8b5cf6"
                                                }
                                            }), f(c, d, m)
                                        } else {
                                            const {
                                                node: t,
                                                index: o
                                            } = y(nextScore);
                                            if (t)
                                                if (u.has(o)) {
                                                    const a = u.get(o);
                                                    i.push({
                                                        id: `${e}-${a}`,
                                                        source: e,
                                                        target: a,
                                                        type: "default",
                                                        animated: !0,
                                                        style: {
                                                            stroke: "#8b5cf6",
                                                            strokeWidth: 2
                                                        },
                                                        markerEnd: {
                                                            type: "arrowclosed",
                                                            color: "#8b5cf6"
                                                        }
                                                    })
                                                } else {
                                                    const e = `${choiceNodeId}-end`,
                                                        n = _(o);
                                                    u.set(o, e), s.push({
                                                        id: e,
                                                        type: "counseling",
                                                        position: {
                                                            x: 0,
                                                            y: 0
                                                        },
                                                        data: {
                                                            title: a("czn.ending") || "Ending",
                                                            caption: "",
                                                            isEnd: !0,
                                                            totalScore: nextScore,
                                                            endType: n,
                                                            stabilityRange: c.value && t ? `${t.stability_min}~${t.stability_max}` : void 0
                                                        }
                                                    }), i.push({
                                                        id: `${choiceNodeId}-${e}`,
                                                        source: choiceNodeId,
                                                        target: e,
                                                        type: "default",
                                                        animated: !0,
                                                        style: {
                                                            stroke: "#8b5cf6",
                                                            strokeWidth: 2
                                                        }
                                                    })
                                                }
                                        }
                                    })
                                });
                                else if (n.use_choice && n.text) {
                                    const a = `${e}-result-${t}`;
                                    let o = !1;
                                    for (let e = t + 1; e < m.story.groups.length; e++) {
                                        const a = m.story.groups[e];
                                        if (a.choice_details && a.choice_details.length > 0)
                                            for (const e of a.choice_details) {
                                                for (const a of e.choices)
                                                    if (a.choice === n.use_choice) {
                                                        o = !0;
                                                        break
                                                    }
                                                if (o) break
                                            }
                                        if (o) break
                                    }
                                    if (o) s.push({
                                        id: a,
                                        type: "counseling",
                                        position: {
                                            x: 0,
                                            y: 0
                                        },
                                        data: {
                                            title: n.text,
                                            caption: "",
                                            optTotal: l
                                        }
                                    }), i.push({
                                        id: `${e}-${a}`,
                                        source: e,
                                        target: a,
                                        type: "default",
                                        animated: !0,
                                        style: {
                                            stroke: "#8b5cf6",
                                            strokeWidth: 2
                                        },
                                        markerEnd: {
                                            type: "arrowclosed",
                                            color: "#8b5cf6"
                                        }
                                    });
                                    else {
                                        const {
                                            node: t,
                                            index: o
                                        } = y(r);
                                        if (t)
                                            if (u.has(o)) {
                                                const a = u.get(o);
                                                i.push({
                                                    id: `${e}-${a}`,
                                                    source: e,
                                                    target: a,
                                                    type: "default",
                                                    animated: !0,
                                                    style: {
                                                        stroke: "#8b5cf6",
                                                        strokeWidth: 2
                                                    },
                                                    markerEnd: {
                                                        type: "arrowclosed",
                                                        color: "#8b5cf6"
                                                    }
                                                })
                                            } else {
                                                const d = _(o);
                                                u.set(o, a), s.push({
                                                    id: a,
                                                    type: "counseling",
                                                    position: {
                                                        x: 0,
                                                        y: 0
                                                    },
                                                    data: {
                                                        title: n.text,
                                                        caption: "",
                                                        isEnd: !0,
                                                        totalScore: r,
                                                        endType: d,
                                                        optTotal: l,
                                                        stabilityRange: c.value && t ? `${t.stability_min}~${t.stability_max}` : void 0
                                                    }
                                                }), i.push({
                                                    id: `${e}-${a}`,
                                                    source: e,
                                                    target: a,
                                                    type: "default",
                                                    animated: !0,
                                                    style: {
                                                        stroke: "#8b5cf6",
                                                        strokeWidth: 2
                                                    },
                                                    markerEnd: {
                                                        type: "arrowclosed",
                                                        color: "#8b5cf6"
                                                    }
                                                })
                                            }
                                    }
                                }
                            };
                        if (m.story && m.story.groups && m.story.groups.length > 0) {
                            const e = m.story.groups[0].opt_total || 0;
                            f(g, 0, e)
                        }
                        t.value = s, o.value = i
                    }, p = async e => {
                        if (0 === t.value.length) return;
                        const a = s(t.value, o.value, e);
                        t.value = a, await v(), i()
                    };
                    return y(() => e.counselingData, () => {
                        l.value = 0, u()
                    }, {
                        deep: !0,
                        immediate: !0
                    }), y(() => l.value, () => {
                        u()
                    }), {
                        t: a,
                        nodes: t,
                        edges: o,
                        layoutDirection: n,
                        hasData: r,
                        formatText: e => e ? e.replace(/\n/g, "<br>") : "",
                        changeLayout: e => {
                            n.value = e, p(e)
                        },
                        onNodesInitialized: () => {
                            p(n.value)
                        },
                        Position: ie,
                        counselingTabs: d,
                        activeTabIndex: l,
                        switchTab: e => {
                            l.value !== e && (l.value = e, u())
                        },
                        isDevMode: c
                    }
                }
            }, [
                ["render", function(e, a, t, o, n, l) {
                    const s = I("Background"),
                        i = I("ControlButton"),
                        c = I("Controls"),
                        r = I("Handle"),
                        d = I("VueFlow");
                    return T(), _("div", be, [o.hasData ? (T(), _("div", he, [o.counselingTabs.length > 1 ? (T(), _("div", ye, [L("div", _e, [(T(!0), _(x, null, M(o.counselingTabs, (e, a) => (T(), _("button", {
                        key: a,
                        class: S(["tab-button", {
                            active: o.activeTabIndex === a
                        }]),
                        onClick: e => o.switchTab(a)
                    }, C(e.title), 11, fe))), 128))]), L("select", {
                        class: "tab-select-mobile",
                        value: o.activeTabIndex,
                        onChange: a[0] || (a[0] = e => o.switchTab(parseInt(e.target.value)))
                    }, [(T(!0), _(x, null, M(o.counselingTabs, (e, a) => (T(), _("option", {
                        key: a,
                        value: a
                    }, C(e.title), 9, Ce))), 128))], 40, ke)])) : f("", !0), L("div", we, [L("div", ze, [D(d, {
                        nodes: o.nodes,
                        "onUpdate:nodes": a[3] || (a[3] = e => o.nodes = e),
                        edges: o.edges,
                        "onUpdate:edges": a[4] || (a[4] = e => o.edges = e),
                        "min-zoom": .2,
                        "max-zoom": 2,
                        onNodesInitialized: o.onNodesInitialized
                    }, {
                        "node-counseling": w(e => [L("div", {
                            class: S(["flow-node counseling-node", e.data.endType])
                        }, [e.data.isStart ? f("", !0) : (T(), k(r, {
                            key: 0,
                            type: "target",
                            position: e.targetPosition || o.Position.Top
                        }, null, 8, ["position"])), e.data.isEnd ? f("", !0) : (T(), k(r, {
                            key: 1,
                            type: "source",
                            position: e.sourcePosition || o.Position.Bottom
                        }, null, 8, ["position"])), L("div", xe, [e.data.title ? (T(), _("div", Me, C(e.data.title), 1)) : f("", !0), e.data.caption ? (T(), _("div", {
                            key: 1,
                            class: "node-caption",
                            innerHTML: o.formatText(e.data.caption)
                        }, null, 8, Se)) : f("", !0), o.isDevMode ? (T(), _("div", Ie, [e.data.isEnd || void 0 === e.data.optTotal ? f("", !0) : (T(), _("div", Te, " 分值: " + C(e.data.optTotal), 1)), e.data.isEnd && e.data.stabilityRange ? (T(), _("div", je, " 分值: " + C(e.data.stabilityRange), 1)) : f("", !0)])) : f("", !0)])], 2)]),
                        "node-choice": w(e => [L("div", {
                            class: S(["flow-node choice-node", e.data.choiceType])
                        }, [D(r, {
                            type: "target",
                            position: e.targetPosition || o.Position.Top
                        }, null, 8, ["position"]), D(r, {
                            type: "source",
                            position: e.sourcePosition || o.Position.Bottom
                        }, null, 8, ["position"]), L("div", De, [L("div", $e, [e.data.text ? (T(), _("span", {
                            key: 0,
                            class: "choice-text",
                            innerHTML: o.formatText(e.data.text)
                        }, null, 8, Le)) : f("", !0)]), o.isDevMode && void 0 !== e.data.optTotal ? (T(), _("div", Ve, [L("div", Pe, " 分值: " + C(e.data.optTotal), 1)])) : f("", !0)])], 2)]),
                        default: w(() => [D(s), D(c, null, {
                            default: w(() => [D(i, {
                                class: S({
                                    active: "LR" === o.layoutDirection
                                }),
                                onClick: a[1] || (a[1] = e => o.changeLayout("LR")),
                                title: o.t("czn.encounter.horizontalLayout") || "水平布局"
                            }, {
                                default: w(() => a[5] || (a[5] = [L("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg"
                                }, [L("path", {
                                    d: "M4 12H20M20 12L14 6M20 12L14 18",
                                    stroke: "currentColor",
                                    "stroke-width": "2",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                })], -1)])),
                                _: 1
                            }, 8, ["class", "title"]), D(i, {
                                class: S({
                                    active: "TB" === o.layoutDirection
                                }),
                                onClick: a[2] || (a[2] = e => o.changeLayout("TB")),
                                title: o.t("czn.encounter.verticalLayout") || "垂直布局"
                            }, {
                                default: w(() => a[6] || (a[6] = [L("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg"
                                }, [L("path", {
                                    d: "M12 4V20M12 20L6 14M12 20L18 14",
                                    stroke: "currentColor",
                                    "stroke-width": "2",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                })], -1)])),
                                _: 1
                            }, 8, ["class", "title"])]),
                            _: 1
                        })]),
                        _: 1
                    }, 8, ["nodes", "edges", "onNodesInitialized"])])])])) : (T(), _("div", ve, [L("p", null, C(o.t("czn.noCounselingData")), 1)]))])
                }],
                ["__scopeId", "data-v-a788b228"]
            ])
        },
        props: {
            show: {
                type: Boolean,
                default: !1
            },
            combatantId: {
                type: String,
                default: ""
            }
        },
        emits: ["close"],
        setup(e, {
            emit: a
        }) {
            const {
                t: t
            } = $(), o = m(!1), n = m(null), l = m(null);
            V("counseling-modal", () => e.show);
            const s = async () => {
                var a, s;
                if (e.combatantId) {
                    o.value = !0, n.value = null, l.value = null;
                    try {
                        const a = await R.get(`/api/czn/story-content-counseling/combatant/${e.combatantId}`);
                        0 === a.data.code ? l.value = a.data.data : n.value = a.data.message || t("czn.failedToLoadCounseling")
                    } catch (i) {
                        n.value = (null == (s = null == (a = i.response) ? void 0 : a.data) ? void 0 : s.message) || t("czn.failedToLoadCounseling")
                    } finally {
                        o.value = !1
                    }
                } else n.value = t("czn.invalidCombatantId")
            };
            y(() => e.show, a => {
                a && e.combatantId && s()
            }), y(() => e.combatantId, () => {
                e.show && e.combatantId && s()
            });
            const i = () => {
                a("close")
            };
            return {
                t: t,
                loading: o,
                error: n,
                counselingData: l,
                close: i,
                handleOverlayClick: () => {
                    i()
                },
                formatText: e => e ? e.replace(/\n/g, "<br>") : ""
            }
        }
    },
    Re = {
        class: "counseling-modal-header"
    },
    Ee = {
        class: "counseling-modal-content"
    },
    Ne = {
        key: 0,
        class: "loading-container"
    },
    Ae = {
        class: "loading-text"
    },
    Be = {
        key: 1,
        class: "error-container"
    },
    Oe = {
        key: 2,
        class: "counseling-content"
    },
    We = {
        class: "flow-chart-section"
    },
    Fe = {
        key: 3,
        class: "no-data"
    };
const He = p(Ue, [
        ["render", function(e, a, t, o, n, l) {
            const s = I("CounselingFlowChart");
            return T(), k(U, {
                to: "body"
            }, [t.show ? (T(), _("div", {
                key: 0,
                class: "counseling-modal-overlay",
                onClick: a[2] || (a[2] = (...e) => o.handleOverlayClick && o.handleOverlayClick(...e))
            }, [L("div", {
                class: "counseling-modal",
                onClick: a[1] || (a[1] = P(() => {}, ["stop"]))
            }, [L("div", Re, [L("h3", null, C(o.t("czn.counseling")), 1), L("button", {
                class: "close-btn",
                onClick: a[0] || (a[0] = (...e) => o.close && o.close(...e))
            }, "×")]), L("div", Ee, [o.loading ? (T(), _("div", Ne, [a[3] || (a[3] = L("div", {
                class: "loading-spinner"
            }, null, -1)), L("div", Ae, C(o.t("common.loading")), 1)])) : o.error ? (T(), _("div", Be, [L("p", null, C(o.error), 1)])) : o.counselingData ? (T(), _("div", Oe, [L("div", We, [D(s, {
                "counseling-data": o.counselingData
            }, null, 8, ["counseling-data"])])])) : (T(), _("div", Fe, [L("p", null, C(o.t("czn.noCounselingData")), 1)]))])])])) : f("", !0)])
        }],
        ["__scopeId", "data-v-b0d22fc8"]
    ]),
    Ge = {
        name: "TownNormalVisitModal",
        props: {
            show: {
                type: Boolean,
                default: !1
            },
            combatantId: {
                type: String,
                default: ""
            }
        },
        emits: ["close"],
        setup(e, {
            emit: a
        }) {
            const {
                t: t
            } = $(), o = m(!1), n = m(null), l = m([]);
            V("town-visit-modal", () => e.show);
            const s = async () => {
                var a, s;
                if (e.combatantId) {
                    o.value = !0, n.value = null, l.value = [];
                    try {
                        const a = e.combatantId.replace(/_info$/, ""),
                            o = await R.get(`/api/czn/town-normal-visits/combatant/${a}`);
                        0 === o.data.code ? l.value = o.data.data || [] : n.value = o.data.message || t("czn.failedToLoadVisit")
                    } catch (i) {
                        n.value = (null == (s = null == (a = i.response) ? void 0 : a.data) ? void 0 : s.message) || t("czn.failedToLoadVisit")
                    } finally {
                        o.value = !1
                    }
                } else n.value = t("czn.invalidCombatantId")
            };
            y(() => e.show, a => {
                a && e.combatantId && s()
            }), y(() => e.combatantId, () => {
                e.show && e.combatantId && s()
            });
            const i = () => {
                a("close")
            };
            return {
                t: t,
                loading: o,
                error: n,
                visits: l,
                close: i,
                handleOverlayClick: () => {
                    i()
                }
            }
        }
    },
    Je = {
        class: "town-visit-modal-header"
    },
    Ke = {
        class: "town-visit-modal-content"
    },
    qe = {
        key: 0,
        class: "loading-container"
    },
    Xe = {
        class: "loading-text"
    },
    Qe = {
        key: 1,
        class: "error-container"
    },
    Ye = {
        key: 2,
        class: "visits-list"
    },
    Ze = {
        class: "visit-name"
    },
    ea = {
        key: 0,
        class: "visit-options"
    },
    aa = {
        class: "option-content"
    },
    ta = {
        class: "option-text"
    },
    oa = {
        class: "option-reward"
    },
    na = {
        class: "reward-value"
    },
    la = {
        key: 3,
        class: "no-data"
    };
const sa = {
        class: "czn-combatant-summary"
    },
    ia = {
        class: "summary-header"
    },
    ca = {
        class: "combatant-main-info"
    },
    ra = {
        class: "combatant-avatar-wrapper"
    },
    da = ["src", "alt"],
    ua = ["src"],
    pa = {
        class: "combatant-info"
    },
    ma = {
        class: "combatant-meta"
    },
    ga = {
        class: "ego-with-icon"
    },
    ba = ["src", "alt"],
    va = {
        class: "ego-text"
    },
    ha = {
        class: "job-with-icon"
    },
    ya = ["src", "alt"],
    _a = {
        class: "job-text"
    },
    fa = {
        class: "name-with-rarity"
    },
    ka = {
        class: "combatant-name"
    },
    Ca = {
        class: "rarity-stars"
    },
    wa = ["src", "alt"],
    za = ["innerHTML"],
    xa = {
        key: 0,
        class: "combatant-header-actions"
    },
    Ma = ["title"],
    Sa = {
        class: "btn-text"
    },
    Ia = ["title"],
    Ta = {
        class: "btn-text"
    },
    ja = ["title"],
    Da = {
        class: "btn-text"
    },
    $a = {
        key: 0,
        class: "mobile-tab-nav"
    },
    La = {
        class: "content-sections"
    },
    Va = {
        class: "cards-section"
    },
    Pa = {
        key: 0,
        class: "card-group-section"
    },
    Ua = {
        class: "card-group-title-wrapper"
    },
    Ra = {
        class: "card-group-title"
    },
    Ea = {
        key: 0,
        class: "animation-toggle",
        style: {
            "z-index": "10",
            position: "relative"
        }
    },
    Na = ["title"],
    Aa = ["disabled"],
    Ba = {
        class: "toggle-text"
    },
    Oa = {
        class: "toggle-label"
    },
    Wa = {
        class: "toggle-text"
    },
    Fa = ["disabled"],
    Ha = {
        class: "toggle-text"
    },
    Ga = {
        class: "toggle-label"
    },
    Ja = {
        class: "toggle-text"
    },
    Ka = {
        key: 1,
        class: "card-group-section"
    },
    qa = {
        class: "card-group-title"
    },
    Xa = {
        key: 2,
        class: "card-group-section"
    },
    Qa = {
        class: "card-group-title"
    },
    Ya = {
        key: 3,
        class: "card-group-section"
    },
    Za = {
        class: "card-group-title"
    },
    et = {
        key: 0,
        class: "limit-breaks-section"
    },
    at = {
        class: "section-title"
    },
    tt = {
        class: "limit-breaks-grid"
    },
    ot = {
        class: "limit-break-header"
    },
    nt = {
        class: "break-level"
    },
    lt = {
        class: "limit-break-title"
    },
    st = ["innerHTML"],
    it = {
        key: 1,
        class: "potential-section"
    },
    ct = {
        class: "section-title"
    },
    rt = {
        class: "potential-nodes-grid"
    },
    dt = ["onClick"],
    ut = {
        class: "potential-header"
    },
    pt = {
        class: "potential-title"
    },
    mt = {
        class: "node-num"
    },
    gt = {
        key: 0,
        class: "potential-sub-title"
    },
    bt = ["innerHTML"],
    vt = {
        class: "upgrade-modal-header"
    },
    ht = {
        class: "upgrade-modal-content"
    },
    yt = {
        key: 0,
        class: "upgrade-nodes-list"
    },
    _t = {
        class: "upgrade-level"
    },
    ft = {
        class: "upgrade-content"
    },
    kt = {
        key: 0,
        class: "upgrade-main-title"
    },
    Ct = {
        key: 1,
        class: "upgrade-sub-title"
    },
    wt = ["innerHTML"],
    zt = {
        key: 1,
        class: "no-upgrades"
    };
const xt = {
        class: "czn-container"
    },
    Mt = {
        class: "combatant-detail"
    },
    St = {
        key: 0,
        class: "no-selection"
    },
    It = {
        class: "no-selection-content"
    },
    Tt = {
        key: 1,
        class: "loading-container"
    },
    jt = {
        class: "loading-text"
    },
    Dt = {
        key: 2,
        class: "detail-content"
    },
    $t = {
        class: "upgrade-modal-header"
    },
    Lt = {
        class: "upgrade-modal-content"
    },
    Vt = {
        key: 0,
        class: "upgrade-nodes-list"
    },
    Pt = {
        class: "upgrade-level"
    },
    Ut = {
        class: "upgrade-content"
    },
    Rt = {
        key: 0,
        class: "upgrade-main-title"
    },
    Et = {
        key: 1,
        class: "upgrade-sub-title"
    },
    Nt = ["innerHTML"],
    At = {
        key: 1,
        class: "no-upgrades"
    },
    Bt = {
        class: "r-spark-modal-header"
    },
    Ot = {
        class: "r-spark-modal-content"
    },
    Wt = {
        key: 0,
        class: "r-spark-cards-grid"
    },
    Ft = {
        key: 1,
        class: "no-r-spark-cards"
    };
const Ht = p({
    name: "CznCombatantPage",
    components: {
        CombatantPicker: Q,
        CznCard: Y,
        CombatantDetail: p({
            name: "CombatantDetail",
            components: {
                CznCard: Y,
                CznCardGroup: ge,
                AdaptiveGrid: X,
                CounselingModal: He,
                TownNormalVisitModal: p(Ge, [
                    ["render", function(e, a, t, o, n, l) {
                        return T(), k(U, {
                            to: "body"
                        }, [t.show ? (T(), _("div", {
                            key: 0,
                            class: "town-visit-modal-overlay",
                            onClick: a[2] || (a[2] = (...e) => o.handleOverlayClick && o.handleOverlayClick(...e))
                        }, [L("div", {
                            class: "town-visit-modal",
                            onClick: a[1] || (a[1] = P(() => {}, ["stop"]))
                        }, [L("div", Je, [L("h3", null, C(o.t("czn.townVisit")), 1), L("button", {
                            class: "close-btn",
                            onClick: a[0] || (a[0] = (...e) => o.close && o.close(...e))
                        }, "×")]), L("div", Ke, [o.loading ? (T(), _("div", qe, [a[3] || (a[3] = L("div", {
                            class: "loading-spinner"
                        }, null, -1)), L("div", Xe, C(o.t("common.loading")), 1)])) : o.error ? (T(), _("div", Qe, [L("p", null, C(o.error), 1)])) : o.visits && o.visits.length > 0 ? (T(), _("div", Ye, [(T(!0), _(x, null, M(o.visits, e => (T(), _("div", {
                            key: e.id,
                            class: "visit-item"
                        }, [L("h4", Ze, C(e.name || e.id), 1), e.options && e.options.length > 0 ? (T(), _("div", ea, [(T(!0), _(x, null, M(e.options, t => (T(), _("div", {
                            key: t.choice,
                            class: S(["option-item", {
                                correct: "O" === t.choice,
                                wrong: "X" === t.choice
                            }])
                        }, [L("div", aa, [L("span", {
                            class: S(["option-badge", "O" === t.choice ? "correct-badge" : "wrong-badge"])
                        }, C("O" === t.choice ? o.t("czn.correct") : o.t("czn.wrong")), 3), L("span", ta, C(t.text), 1), L("span", oa, [a[4] || (a[4] = L("span", {
                            class: "heart-icon"
                        }, "❤️", -1)), L("span", na, C("O" === t.choice ? `+${e.success_reward_friendship_exp}` : `+${e.fail_reward_friendship_exp}`), 1)])])], 2))), 128))])) : f("", !0)]))), 128))])) : (T(), _("div", la, [L("p", null, C(o.t("czn.noVisitData")), 1)]))])])])) : f("", !0)])
                    }],
                    ["__scopeId", "data-v-423eb734"]
                ]),
                RSparkCardModal: ce
            },
            props: {
                combatant: {
                    type: Object,
                    required: !0
                },
                combatantDetail: {
                    type: Object,
                    default: null
                }
            },
            setup(p) {
                const {
                    t: v
                } = $(), _ = E(), f = m(!1), k = m(null), C = m(!1), w = m(null), z = m(!1), x = m(!1), M = m(!1), S = localStorage.getItem("czn_combatant_enable_animation"), I = m("false" !== S), T = localStorage.getItem("czn_combatant_show_portrait_only"), j = m("true" === T), D = (() => {
                    const e = new Date;
                    return 3 === e.getMonth() && 1 === e.getDate()
                })(), L = localStorage.getItem("czn_combatant_enable_april_fool"), P = m(null !== L ? "true" === L : D);
                y(I, e => {
                    localStorage.setItem("czn_combatant_enable_animation", e), window.dispatchEvent(new CustomEvent("czn-animation-setting-changed"))
                }), y(j, e => {
                    localStorage.setItem("czn_combatant_show_portrait_only", e)
                }), y(P, e => {
                    localStorage.setItem("czn_combatant_enable_april_fool", e)
                });
                const U = m(!0),
                    R = e => {
                        if (!e) return !1;
                        const a = e.toString();
                        return a.endsWith("_pot") || a.endsWith("_lbk")
                    },
                    N = g(() => {
                        var e, a, t, o, n, l, s, i;
                        const c = (null == (t = null == (a = null == (e = p.combatantDetail) ? void 0 : e.combatant) ? void 0 : a.potential_target_cards) ? void 0 : t.length) > 0,
                            r = null == (l = null == (n = null == (o = p.combatantDetail) ? void 0 : o.combatant) ? void 0 : n.start_cards) ? void 0 : l.some(e => e.r_spark_cards && e.r_spark_cards.some(e => R(e.id))),
                            d = null == (i = null == (s = p.combatantDetail) ? void 0 : s.combatant) ? void 0 : i.collapse_skill_card,
                            u = (null == d ? void 0 : d.r_spark_cards) && d.r_spark_cards.some(e => R(e.id));
                        return c || r || u
                    }),
                    A = e => {
                        if (U.value && e.r_spark_cards && e.r_spark_cards.length > 0) {
                            const a = e.r_spark_cards.find(e => R(e.id));
                            if (a) return e.base_combatant && !a.base_combatant && (a.base_combatant = e.base_combatant), a
                        }
                        return e
                    },
                    B = g(() => {
                        var e;
                        const a = null == (e = p.combatantDetail) ? void 0 : e.combatant;
                        if (!a) return [];
                        const t = a.start_cards || [],
                            o = a.potential_target_cards || [];
                        if (!N.value || !U.value) return t;
                        return [...t.map(A), ...o]
                    }),
                    O = g(() => {
                        var e, a;
                        const t = null == (a = null == (e = p.combatantDetail) ? void 0 : e.combatant) ? void 0 : a.collapse_skill_card;
                        return t ? N.value && U.value ? A(t) : t : null
                    }),
                    W = g(() => N.value ? U.value ? v("czn.potentialAwakening") || "潜力觉醒" : v("czn.baseCards") || "基础卡" : v("czn.startCards"));
                y(() => p.combatantDetail, e => {
                    var a, t, o;
                    null == (a = null == e ? void 0 : e.combatant) || a.potential_target_cards, (null == (o = null == (t = null == e ? void 0 : e.combatant) ? void 0 : t.potential_target_cards) ? void 0 : o.length) > 0 && (U.value = !0)
                }, {
                    immediate: !0
                }), V("r-spark-modal", () => C.value);
                const F = m(window.innerWidth),
                    H = g(() => F.value <= 767 ? .25 : .5),
                    G = g(() => F.value <= 767 ? 3 : 5),
                    K = g(() => F.value < 768),
                    q = m("cards"),
                    X = () => {
                        F.value = window.innerWidth
                    };
                b(() => {
                    window.addEventListener("resize", X)
                }), h(() => {
                    window.removeEventListener("resize", X)
                });
                return {
                    t: v,
                    themeStore: _,
                    showUpgradeModal: f,
                    selectedNode: k,
                    showRSparkModal: C,
                    selectedCard: w,
                    isShareMode: z,
                    getCombatantPortraitUrl: Z,
                    getEgoIconUrl: e => new URL(Object.assign({
                            "/src/assets/czn/icon_type_ego_creed.png": u,
                            "/src/assets/czn/icon_type_ego_instinct.png": d,
                            "/src/assets/czn/icon_type_ego_love.png": r,
                            "/src/assets/czn/icon_type_ego_narcissism.png": c,
                            "/src/assets/czn/icon_type_ego_norms.png": i
                        })[`/src/assets/czn/icon_type_ego_${e}.png`],
                        import.meta.url).href,
                    getJobIconUrl: i => new URL(Object.assign({
                            "/src/assets/czn/icon_type_job_controller.png": s,
                            "/src/assets/czn/icon_type_job_defender.png": l,
                            "/src/assets/czn/icon_type_job_hunter.png": n,
                            "/src/assets/czn/icon_type_job_knight.png": o,
                            "/src/assets/czn/icon_type_job_psionic.png": t,
                            "/src/assets/czn/icon_type_job_ranger.png": a,
                            "/src/assets/czn/icon_type_job_striker.png": e
                        })[`/src/assets/czn/icon_type_job_${i}.png`],
                        import.meta.url).href,
                    getTranslatedEgo: e => v(`czn.ego.${e}`, e),
                    getTranslatedJob: e => v(`czn.job.${e}`, e),
                    getRarityStarIconUrl: () => de,
                    formatDescription: J,
                    formatNodeNum: e => e ? e.replace(/_0$/, "") : "",
                    showUpgradeNodes: e => {
                        e.upgrade_nodes && e.upgrade_nodes.length > 0 && (k.value = e, f.value = !0)
                    },
                    closeUpgradeModal: () => {
                        f.value = !1, k.value = null
                    },
                    handleCardClick: e => {
                        var a, t;
                        if (!e) return;
                        const o = null == (a = p.combatantDetail) ? void 0 : a.combatant;
                        let n = e;
                        if (o) {
                            const a = [...o.start_cards || [], ...o.spark_cards || [], o.collapse_skill_card, ...o.potential_target_cards || []].filter(Boolean);
                            for (const o of a) {
                                if (o.id === e.id) {
                                    n = o;
                                    break
                                }
                                if (null == (t = o.r_spark_cards) ? void 0 : t.some(a => a.id === e.id)) {
                                    n = o;
                                    break
                                }
                            }
                        }
                        w.value = n, C.value = !0
                    },
                    closeRSparkModal: () => {
                        C.value = !1, w.value = null
                    },
                    showCounselingModal: () => {
                        x.value = !0
                    },
                    closeCounselingModal: () => {
                        x.value = !1
                    },
                    showCounselingModalFlag: x,
                    showVisitModal: () => {
                        M.value = !0
                    },
                    closeVisitModal: () => {
                        M.value = !1
                    },
                    showVisitModalFlag: M,
                    shareCombatant: async () => {
                        try {
                            z.value = !0, await new Promise(e => setTimeout(e, 100));
                            const e = document.querySelector(".czn-combatant-summary");
                            if (!e) return;
                            const a = getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim() || "#ffffff",
                                t = await re(e, {
                                    backgroundColor: a,
                                    scale: 2,
                                    useCORS: !0,
                                    allowTaint: !0,
                                    width: e.scrollWidth + 40,
                                    height: e.scrollHeight + 40,
                                    x: -20,
                                    y: -20
                                }),
                                o = await new Promise(e => t.toBlob(e, "image/png")),
                                n = URL.createObjectURL(o),
                                l = document.createElement("a");
                            l.href = n, l.download = `combatant_${p.combatant.id||"unknown"}.png`, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(n), z.value = !1
                        } catch (e) {
                            z.value = !1
                        }
                    },
                    cardScale: H,
                    cardColumns: G,
                    enableAnimation: I,
                    enableAprilFool: P,
                    showPortraitOnly: j,
                    isMobile: K,
                    activeTab: q,
                    imgProfileWrap: ue,
                    getShortBackgroundText: e => {
                        if (!e) return "";
                        let a = e.split(/<br\s*\/?>/i)[0] || "";
                        return /<color_[^>]+>/i.test(a) && !/<\/(>|color>)/.test(a) && (a += "</>"), J(a)
                    },
                    showPotentialAwakening: U,
                    currentDisplayCards: B,
                    currentCardGroupTitle: W,
                    hasPotentialCards: N,
                    handleLabelClick: e => {},
                    handleToggleChange: e => {},
                    currentCollapseSkillCard: O
                }
            }
        }, [
            ["render", function(e, a, t, o, n, l) {
                var s, i, c, r, d, u, p, m, g, b, v, h, y, k, z, j, $, V, U, R, E, O, W;
                const F = I("CznCard"),
                    H = I("AdaptiveGrid"),
                    G = I("RSparkCardModal"),
                    J = I("CounselingModal"),
                    K = I("TownNormalVisitModal");
                return T(), _("div", sa, [L("div", ia, [L("div", ca, [L("div", ra, [L("img", {
                    src: o.getCombatantPortraitUrl(t.combatant),
                    alt: t.combatant.name,
                    class: "combatant-avatar"
                }, null, 8, da), L("img", {
                    src: o.imgProfileWrap,
                    alt: "",
                    class: "avatar-border"
                }, null, 8, ua)]), L("div", pa, [L("div", ma, [L("div", ga, [L("img", {
                    src: o.getEgoIconUrl(t.combatant.ego),
                    alt: t.combatant.ego,
                    class: "ego-icon"
                }, null, 8, ba), L("span", va, C(o.getTranslatedEgo(t.combatant.ego)), 1)]), L("div", ha, [L("img", {
                    src: o.getJobIconUrl(t.combatant.job),
                    alt: t.combatant.job,
                    class: "job-icon"
                }, null, 8, ya), L("span", _a, C(o.getTranslatedJob(t.combatant.job)), 1)])]), L("div", fa, [L("h1", ka, C(t.combatant.name), 1), L("div", Ca, [(T(!0), _(x, null, M(t.combatant.rarity, e => (T(), _("img", {
                    key: e,
                    src: o.getRarityStarIconUrl(),
                    alt: `${e}星`,
                    class: "rarity-star-icon"
                }, null, 8, wa))), 128))])]), (null == (c = null == (i = null == (s = t.combatantDetail) ? void 0 : s.combatant) ? void 0 : i.combatant_info) ? void 0 : c.background_text) ? (T(), _("div", {
                    key: 0,
                    class: "combatant-intro",
                    innerHTML: o.getShortBackgroundText(t.combatantDetail.combatant.combatant_info.background_text)
                }, null, 8, za)) : f("", !0)])]), o.isShareMode ? f("", !0) : (T(), _("div", xa, [L("button", {
                    class: "counseling-btn",
                    onClick: a[0] || (a[0] = (...e) => o.showCounselingModal && o.showCounselingModal(...e)),
                    title: o.t("czn.counseling")
                }, [a[15] || (a[15] = L("svg", {
                    class: "counseling-icon",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                }, [L("path", {
                    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                }), L("line", {
                    x1: "8",
                    y1: "9",
                    x2: "16",
                    y2: "9"
                }), L("line", {
                    x1: "8",
                    y1: "13",
                    x2: "14",
                    y2: "13"
                })], -1)), L("span", Sa, C(o.t("czn.counseling")), 1)], 8, Ma), L("button", {
                    class: "visit-btn",
                    onClick: a[1] || (a[1] = (...e) => o.showVisitModal && o.showVisitModal(...e)),
                    title: o.t("czn.townVisit")
                }, [a[16] || (a[16] = L("svg", {
                    class: "visit-icon",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                }, [L("path", {
                    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                }), L("circle", {
                    cx: "12",
                    cy: "10",
                    r: "3"
                })], -1)), L("span", Ta, C(o.t("czn.townVisit")), 1)], 8, Ia), L("button", {
                    class: "share-btn",
                    onClick: a[2] || (a[2] = (...e) => o.shareCombatant && o.shareCombatant(...e)),
                    title: o.t("czn.shareCombatant")
                }, [a[17] || (a[17] = L("svg", {
                    class: "share-icon",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                }, [L("path", {
                    d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
                }), L("polyline", {
                    points: "16,6 12,2 8,6"
                }), L("line", {
                    x1: "12",
                    y1: "2",
                    x2: "12",
                    y2: "15"
                })], -1)), L("span", Da, C(o.t("czn.share")), 1)], 8, ja)]))]), o.isMobile && !o.isShareMode ? (T(), _("div", $a, [L("button", {
                    class: S(["tab-btn", {
                        active: "cards" === o.activeTab
                    }]),
                    onClick: a[3] || (a[3] = e => o.activeTab = "cards")
                }, C(o.t("czn.tabCards")), 3), L("button", {
                    class: S(["tab-btn", {
                        active: "limitBreaks" === o.activeTab
                    }]),
                    onClick: a[4] || (a[4] = e => o.activeTab = "limitBreaks")
                }, C(o.t("czn.tabLimitBreaks")), 3), L("button", {
                    class: S(["tab-btn", {
                        active: "potential" === o.activeTab
                    }]),
                    onClick: a[5] || (a[5] = e => o.activeTab = "potential")
                }, C(o.t("czn.tabPotential")), 3)])) : f("", !0), L("div", La, [N(L("div", Va, [(null == (u = null == (d = null == (r = t.combatantDetail) ? void 0 : r.combatant) ? void 0 : d.start_cards) ? void 0 : u.length) ? (T(), _("div", Pa, [L("div", Ua, [L("h3", Ra, C(o.t("czn.startCards")), 1), o.isShareMode ? f("", !0) : (T(), _("div", Ea, [L("label", {
                    class: S(["toggle-label", {
                        disabled: !o.hasPotentialCards
                    }]),
                    title: o.hasPotentialCards ? "" : "该角色没有潜力觉醒卡牌",
                    onClick: a[8] || (a[8] = (...e) => o.handleLabelClick && o.handleLabelClick(...e))
                }, [N(L("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": a[6] || (a[6] = e => o.showPotentialAwakening = e),
                    class: "toggle-input",
                    disabled: !o.hasPotentialCards,
                    onChange: a[7] || (a[7] = (...e) => o.handleToggleChange && o.handleToggleChange(...e))
                }, null, 40, Aa), [
                    [B, o.showPotentialAwakening]
                ]), L("span", Ba, C(o.t("czn.potentialAwakening") || "潜力觉醒"), 1)], 10, Na), L("label", Oa, [N(L("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": a[9] || (a[9] = e => o.enableAprilFool = e),
                    class: "toggle-input"
                }, null, 512), [
                    [B, o.enableAprilFool]
                ]), L("span", Wa, C(o.t("czn.aprilFool")), 1)]), L("label", {
                    class: S(["toggle-label", {
                        disabled: o.enableAprilFool
                    }])
                }, [N(L("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": a[10] || (a[10] = e => o.enableAnimation = e),
                    class: "toggle-input",
                    disabled: o.enableAprilFool
                }, null, 8, Fa), [
                    [B, o.enableAnimation]
                ]), L("span", Ha, C(o.t("czn.enableCardAnimation")), 1)], 2), L("label", Ga, [N(L("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": a[11] || (a[11] = e => o.showPortraitOnly = e),
                    class: "toggle-input"
                }, null, 512), [
                    [B, o.showPortraitOnly]
                ]), L("span", Ja, C(o.t("czn.showPortraitOnly") || "只看立绘"), 1)])]))]), D(H, {
                    items: o.currentDisplayCards,
                    "base-item-width": 464,
                    "base-item-height": 672,
                    "base-scale": .4,
                    "min-scale": .3,
                    "max-scale": .5,
                    gap: 4,
                    padding: 10,
                    "min-columns": o.cardColumns,
                    onItemClick: o.handleCardClick
                }, {
                    default: w(({
                        item: e,
                        scale: a
                    }) => [D(F, {
                        card: e,
                        "character-ego": t.combatant.ego,
                        scale: a,
                        "debug-mode": !0,
                        "enable-animation": o.enableAnimation,
                        "enable-april-fool": o.enableAprilFool,
                        "only-portrait": o.showPortraitOnly
                    }, null, 8, ["card", "character-ego", "scale", "enable-animation", "enable-april-fool", "only-portrait"])]),
                    _: 1
                }, 8, ["items", "min-columns", "onItemClick"])])) : f("", !0), (null == (g = null == (m = null == (p = t.combatantDetail) ? void 0 : p.combatant) ? void 0 : m.spark_cards) ? void 0 : g.length) ? (T(), _("div", Ka, [L("h3", qa, C(o.t("czn.uniqueCards")), 1), D(H, {
                    items: t.combatantDetail.combatant.spark_cards,
                    "base-item-width": 464,
                    "base-item-height": 672,
                    "base-scale": .4,
                    "min-scale": .3,
                    "max-scale": .5,
                    gap: 4,
                    padding: 10,
                    "min-columns": o.cardColumns,
                    onItemClick: o.handleCardClick
                }, {
                    default: w(({
                        item: e,
                        scale: a
                    }) => [D(F, {
                        card: e,
                        "character-ego": t.combatant.ego,
                        scale: a,
                        "debug-mode": !0,
                        "enable-animation": o.enableAnimation,
                        "enable-april-fool": o.enableAprilFool,
                        "only-portrait": o.showPortraitOnly
                    }, null, 8, ["card", "character-ego", "scale", "enable-animation", "enable-april-fool", "only-portrait"])]),
                    _: 1
                }, 8, ["items", "min-columns", "onItemClick"])])) : f("", !0), (null == (v = null == (b = t.combatantDetail) ? void 0 : b.combatant) ? void 0 : v.collapse_skill_card) ? (T(), _("div", Xa, [L("h3", Qa, C(o.t("czn.egoSkill")), 1), D(H, {
                    items: [o.currentCollapseSkillCard],
                    "base-item-width": 464,
                    "base-item-height": 672,
                    "base-scale": .4,
                    "min-scale": .3,
                    "max-scale": .5,
                    gap: 4,
                    padding: 10,
                    "min-columns": o.cardColumns,
                    onItemClick: o.handleCardClick
                }, {
                    default: w(({
                        item: e,
                        scale: a
                    }) => [D(F, {
                        card: e,
                        "character-ego": t.combatant.ego,
                        scale: a,
                        "debug-mode": !0,
                        "enable-animation": o.enableAnimation,
                        "enable-april-fool": o.enableAprilFool,
                        "only-portrait": o.showPortraitOnly
                    }, null, 8, ["card", "character-ego", "scale", "enable-animation", "enable-april-fool", "only-portrait"])]),
                    _: 1
                }, 8, ["items", "min-columns", "onItemClick"])])) : f("", !0), (null == (z = null == (k = null == (y = null == (h = t.combatantDetail) ? void 0 : h.combatant) ? void 0 : y.collapse_passive) ? void 0 : k.collapse_cards) ? void 0 : z.length) ? (T(), _("div", Ya, [L("h3", Za, C(o.t("czn.collapseCards")), 1), D(H, {
                    items: t.combatantDetail.combatant.collapse_passive.collapse_cards,
                    "base-item-width": 464,
                    "base-item-height": 672,
                    "base-scale": .4,
                    "min-scale": .3,
                    "max-scale": .5,
                    gap: 4,
                    padding: 10,
                    "min-columns": o.cardColumns,
                    onItemClick: o.handleCardClick
                }, {
                    default: w(({
                        item: e,
                        scale: a
                    }) => [D(F, {
                        card: e,
                        "character-ego": t.combatant.ego,
                        scale: a,
                        "debug-mode": !0,
                        "enable-animation": o.enableAnimation,
                        "enable-april-fool": o.enableAprilFool,
                        "only-portrait": o.showPortraitOnly
                    }, null, 8, ["card", "character-ego", "scale", "enable-animation", "enable-april-fool", "only-portrait"])]),
                    _: 1
                }, 8, ["items", "min-columns", "onItemClick"])])) : f("", !0), f("", !0)], 512), [
                    [A, !o.isMobile || "cards" === o.activeTab]
                ]), (null == (V = null == ($ = null == (j = t.combatantDetail) ? void 0 : j.combatant) ? void 0 : $.combatant_limit_breaks) ? void 0 : V.length) ? N((T(), _("div", et, [L("h3", at, C(o.t("czn.manifestEgo")), 1), L("div", tt, [(T(!0), _(x, null, M(t.combatantDetail.combatant.combatant_limit_breaks, e => (T(), _("div", {
                    key: e.id,
                    class: "limit-break-item"
                }, [L("div", ot, [L("span", nt, C(o.t("czn.level")) + " " + C(e.break_level), 1), L("h4", lt, C(e.title), 1)]), L("div", {
                    class: "limit-break-desc",
                    innerHTML: o.formatDescription(null == e ? void 0 : e.desc)
                }, null, 8, st)]))), 128))])], 512)), [
                    [A, !o.isMobile || "limitBreaks" === o.activeTab]
                ]) : f("", !0), (null == (R = null == (U = t.combatantDetail) ? void 0 : U.potential_nodes) ? void 0 : R.length) && !o.isShareMode ? N((T(), _("div", it, [L("h3", ct, C(o.t("czn.potential")), 1), L("div", rt, [(T(!0), _(x, null, M(t.combatantDetail.potential_nodes, e => {
                    var a, t;
                    return T(), _("div", {
                        key: e.id,
                        class: S(["potential-node-item", {
                            "has-upgrades": e.upgrade_nodes && e.upgrade_nodes.length > 0
                        }]),
                        onClick: a => o.showUpgradeNodes(e)
                    }, [L("div", ut, [L("h4", pt, C((null == (a = e.potential_node_type_define) ? void 0 : a.main_title) || o.t("czn.potentialNode")), 1), L("span", mt, C(o.t("czn.potential")) + C(o.formatNodeNum(e.node_num)), 1)]), (null == (t = e.potential_node_type_define) ? void 0 : t.sub_title) ? (T(), _("div", gt, C(e.potential_node_type_define.sub_title), 1)) : f("", !0), L("div", {
                        class: "potential-desc",
                        innerHTML: o.formatDescription(null == e ? void 0 : e.desc)
                    }, null, 8, bt)], 10, dt)
                }), 128))])], 512)), [
                    [A, !o.isMobile || "potential" === o.activeTab]
                ]) : f("", !0)]), o.showUpgradeModal ? (T(), _("div", {
                    key: 1,
                    class: "upgrade-modal-overlay",
                    onClick: a[14] || (a[14] = (...e) => o.closeUpgradeModal && o.closeUpgradeModal(...e))
                }, [L("div", {
                    class: "upgrade-modal",
                    onClick: a[13] || (a[13] = P(() => {}, ["stop"]))
                }, [L("div", vt, [a[18] || (a[18] = L("h3", null, "升阶", -1)), L("button", {
                    class: "close-btn",
                    onClick: a[12] || (a[12] = (...e) => o.closeUpgradeModal && o.closeUpgradeModal(...e))
                }, "×")]), L("div", ht, [(null == (O = null == (E = o.selectedNode) ? void 0 : E.upgrade_nodes) ? void 0 : O.length) ? (T(), _("div", yt, [(T(!0), _(x, null, M(o.selectedNode.upgrade_nodes, e => {
                    var a, t;
                    return T(), _("div", {
                        key: e.id,
                        class: "upgrade-node-item"
                    }, [L("div", _t, "+" + C(e.node_level), 1), L("div", ft, [(null == (a = e.potential_node_type_define) ? void 0 : a.main_title) ? (T(), _("div", kt, C(e.potential_node_type_define.main_title), 1)) : f("", !0), (null == (t = e.potential_node_type_define) ? void 0 : t.sub_title) ? (T(), _("div", Ct, C(e.potential_node_type_define.sub_title), 1)) : f("", !0), L("div", {
                        class: "upgrade-desc",
                        innerHTML: o.formatDescription(null == e ? void 0 : e.desc)
                    }, null, 8, wt)])])
                }), 128))])) : (T(), _("div", zt, a[19] || (a[19] = [L("p", null, "该节点暂无升级节点", -1)])))])])])) : f("", !0), D(G, {
                    show: o.showRSparkModal,
                    card: o.selectedCard,
                    "character-ego": null == (W = t.combatant) ? void 0 : W.ego,
                    "enable-animation": o.enableAnimation,
                    "enable-april-fool": o.enableAprilFool,
                    onClose: o.closeRSparkModal
                }, null, 8, ["show", "card", "character-ego", "enable-animation", "enable-april-fool", "onClose"]), D(J, {
                    show: o.showCounselingModalFlag,
                    "combatant-id": t.combatant.id,
                    onClose: o.closeCounselingModal
                }, null, 8, ["show", "combatant-id", "onClose"]), D(K, {
                    show: o.showVisitModalFlag,
                    "combatant-id": t.combatant.id,
                    onClose: o.closeVisitModal
                }, null, 8, ["show", "combatant-id", "onClose"])])
            }],
            ["__scopeId", "data-v-e10958f7"]
        ])
    },
    props: {
        combatantId: {
            type: String,
            default: ""
        }
    },
    setup(p) {
        const {
            t: v
        } = $(), h = E(), _ = O(), {
            isSearchSidebarCollapsed: f
        } = W(_), k = H(), C = G(), {
            isMobile: w,
            showPicker: z
        } = K({
            defaultCollapsed: !1
        }), x = m([]), M = m(null), S = m(null), I = m(!1), T = m(!1);
        F(g(() => {
            var e;
            return "CznCombatantWithId" === k.name && (null == (e = M.value) ? void 0 : e.id) === k.params.combatantId && !T.value && Boolean(S.value)
        }));
        const j = m(!1),
            D = m(null),
            L = m(!1),
            V = m(null),
            P = g({
                get: () => {
                    var e;
                    return (null == (e = M.value) ? void 0 : e.id) || ""
                },
                set: e => {
                    const a = x.value.find(a => a.id === e);
                    a && N(a)
                }
            }),
            U = g(() => w.value ? .25 : .5),
            N = async e => {
                try {
                    if (!e) return;
                    M.value = e, e && e.id && C.push({
                        name: "CznCombatantWithId",
                        params: {
                            combatantId: e.id
                        }
                    }), await (async e => {
                        if (e) {
                            T.value = !0;
                            try {
                                const a = await R.get(`/api/czn/characters/${e}`);
                                0 === a.data.code ? S.value = a.data.data : S.value = null
                            } catch (a) {
                                S.value = null
                            } finally {
                                T.value = !1
                            }
                        }
                    })(e.id), w.value && (z.value = !1)
                } catch (a) {}
            };
        y(() => k.params.combatantId, e => {
            if (e && x.value.length > 0) {
                const a = x.value.find(a => a.id === e);
                a && N(a)
            }
        }, {
            immediate: !0
        }), y(() => p.combatantId, e => {
            if (e && x.value.length > 0) {
                const a = x.value.find(a => a.id === e);
                a && N(a)
            }
        }, {
            immediate: !0
        });
        const A = m(null),
            B = g(() => {
                const e = {};
                return A.value ? (A.value.new && A.value.new.forEach(a => {
                    e[a] = "new"
                }), e) : e
            });
        return b(async () => {
            await (async () => {
                I.value = !0;
                try {
                    const e = await R.get("/api/czn/characters/list");
                    0 === e.data.code && (x.value = e.data.data || [])
                } catch (e) {} finally {
                    I.value = !1
                }
            })(), (async () => {
                try {
                    const e = await R.get("/api/czn/snapshot/characters/diff");
                    0 === e.data.code && (A.value = e.data.data)
                } catch (e) {}
            })();
            const e = k.params.combatantId || p.combatantId;
            if (e && x.value.length > 0) {
                const a = x.value.find(a => a.id === e);
                a && N(a)
            }
        }), {
            t: v,
            themeStore: h,
            uiStore: _,
            isSearchSidebarCollapsed: f,
            isMobile: w,
            combatants: x,
            selectedCombatant: M,
            selectedCombatantId: P,
            combatantDetail: S,
            loading: I,
            detailLoading: T,
            showUpgradeModal: j,
            selectedNode: D,
            showRSparkModal: L,
            selectedCard: V,
            showMobilePicker: z,
            diffStatus: B,
            selectCombatant: N,
            handleSelect: e => {
                N(e)
            },
            showUpgradeNodes: e => {
                e.upgrade_nodes && e.upgrade_nodes.length > 0 && (D.value = e, j.value = !0)
            },
            closeUpgradeModal: () => {
                j.value = !1, D.value = null
            },
            handleCardClick: e => {
                e && e.r_spark_cards && e.r_spark_cards.length > 0 && (V.value = e, L.value = !0)
            },
            closeRSparkModal: () => {
                L.value = !1, V.value = null
            },
            formatNodeNum: e => e ? e.replace(/_0$/, "") : "",
            cardScale: U,
            formatDescription: J,
            getEgoIconUrl: e => new URL(Object.assign({
                    "/src/assets/czn/icon_type_ego_creed.png": u,
                    "/src/assets/czn/icon_type_ego_instinct.png": d,
                    "/src/assets/czn/icon_type_ego_love.png": r,
                    "/src/assets/czn/icon_type_ego_narcissism.png": c,
                    "/src/assets/czn/icon_type_ego_norms.png": i
                })[`/src/assets/czn/icon_type_ego_${e}.png`],
                import.meta.url).href,
            getJobIconUrl: i => new URL(Object.assign({
                    "/src/assets/czn/icon_type_job_controller.png": s,
                    "/src/assets/czn/icon_type_job_defender.png": l,
                    "/src/assets/czn/icon_type_job_hunter.png": n,
                    "/src/assets/czn/icon_type_job_knight.png": o,
                    "/src/assets/czn/icon_type_job_psionic.png": t,
                    "/src/assets/czn/icon_type_job_ranger.png": a,
                    "/src/assets/czn/icon_type_job_striker.png": e
                })[`/src/assets/czn/icon_type_job_${i}.png`],
                import.meta.url).href,
            getTranslatedEgo: e => v(`czn.ego.${e}`, e),
            getTranslatedJob: e => v(`czn.job.${e}`, e),
            getRarityStarIconUrl: () => de
        }
    }
}, [
    ["render", function(e, a, t, o, n, l) {
        var s, i, c, r;
        const d = I("CombatantPicker"),
            u = I("CombatantDetail"),
            p = I("CznCard");
        return T(), _("div", {
            class: S(["czn-combatant-page", o.themeStore.currentTheme])
        }, [L("div", xt, [o.isMobile && o.showMobilePicker ? (T(), _("div", {
            key: 0,
            class: "mobile-overlay-backdrop",
            onClick: a[0] || (a[0] = e => o.showMobilePicker = !1)
        })) : f("", !0), !o.isMobile || o.showMobilePicker ? (T(), _("div", {
            key: 1,
            class: S(["sidebar-wrapper", {
                "mobile-overlay": o.isMobile && o.showMobilePicker
            }])
        }, [D(d, {
            mode: "inline",
            modelValue: o.selectedCombatantId,
            "onUpdate:modelValue": a[1] || (a[1] = e => o.selectedCombatantId = e),
            combatants: o.combatants,
            loading: o.loading,
            scale: .45,
            "min-scale": .4,
            "max-scale": .5,
            gap: 4,
            "min-columns": 3,
            "search-placeholder": o.t("czn.searchCombatant"),
            "no-result-text": o.t("czn.noCombatants"),
            "diff-status": o.diffStatus,
            onSelect: o.handleSelect
        }, null, 8, ["modelValue", "combatants", "loading", "search-placeholder", "no-result-text", "diff-status", "onSelect"])], 2)) : f("", !0), L("div", Mt, [o.selectedCombatant ? o.detailLoading ? (T(), _("div", Tt, [a[9] || (a[9] = L("div", {
            class: "loading-spinner"
        }, null, -1)), L("div", jt, C(o.t("common.loading")), 1)])) : o.combatantDetail ? (T(), _("div", Dt, [D(u, {
            combatant: o.selectedCombatant,
            "combatant-detail": o.combatantDetail
        }, null, 8, ["combatant", "combatant-detail"])])) : f("", !0) : (T(), _("div", St, [L("div", It, [a[8] || (a[8] = L("div", {
            class: "icon"
        }, "⚔️", -1)), L("h3", null, C(o.t("czn.selectCombatant")), 1), L("p", null, C(o.t("czn.selectCombatantDescription")), 1)])]))])]), o.showUpgradeModal ? (T(), _("div", {
            key: 0,
            class: "upgrade-modal-overlay",
            onClick: a[4] || (a[4] = (...e) => o.closeUpgradeModal && o.closeUpgradeModal(...e))
        }, [L("div", {
            class: "upgrade-modal",
            onClick: a[3] || (a[3] = P(() => {}, ["stop"]))
        }, [L("div", $t, [a[10] || (a[10] = L("h3", null, "升阶", -1)), L("button", {
            class: "close-btn",
            onClick: a[2] || (a[2] = (...e) => o.closeUpgradeModal && o.closeUpgradeModal(...e))
        }, "×")]), L("div", Lt, [(null == (i = null == (s = o.selectedNode) ? void 0 : s.upgrade_nodes) ? void 0 : i.length) ? (T(), _("div", Vt, [(T(!0), _(x, null, M(o.selectedNode.upgrade_nodes, e => {
            var a, t;
            return T(), _("div", {
                key: e.id,
                class: "upgrade-node-item"
            }, [L("div", Pt, "+" + C(e.node_level), 1), L("div", Ut, [(null == (a = e.potential_node_type_define) ? void 0 : a.main_title) ? (T(), _("div", Rt, C(e.potential_node_type_define.main_title), 1)) : f("", !0), (null == (t = e.potential_node_type_define) ? void 0 : t.sub_title) ? (T(), _("div", Et, C(e.potential_node_type_define.sub_title), 1)) : f("", !0), L("div", {
                class: "upgrade-desc",
                innerHTML: o.formatDescription(null == e ? void 0 : e.desc)
            }, null, 8, Nt)])])
        }), 128))])) : (T(), _("div", At, a[11] || (a[11] = [L("p", null, "该节点暂无升级节点", -1)])))])])])) : f("", !0), o.showRSparkModal ? (T(), _("div", {
            key: 1,
            class: "r-spark-modal-overlay",
            onClick: a[7] || (a[7] = (...e) => o.closeRSparkModal && o.closeRSparkModal(...e))
        }, [L("div", {
            class: "r-spark-modal",
            onClick: a[6] || (a[6] = P(() => {}, ["stop"]))
        }, [L("div", Bt, [L("h3", null, C(o.t("czn.rSparkCards")), 1), L("button", {
            class: "close-btn",
            onClick: a[5] || (a[5] = (...e) => o.closeRSparkModal && o.closeRSparkModal(...e))
        }, "×")]), L("div", Ot, [(null == (r = null == (c = o.selectedCard) ? void 0 : c.r_spark_cards) ? void 0 : r.length) ? (T(), _("div", Wt, [(T(!0), _(x, null, M(o.selectedCard.r_spark_cards, e => {
            var a;
            return T(), _("div", {
                key: e.id,
                class: "r-spark-card-item"
            }, [D(p, {
                card: e,
                "character-ego": null == (a = o.selectedCombatant) ? void 0 : a.ego,
                scale: o.cardScale
            }, null, 8, ["card", "character-ego", "scale"])])
        }), 128))])) : (T(), _("div", Ft, [L("p", null, C(o.t("czn.noRSparkCards")), 1)]))])])])) : f("", !0)], 2)
    }],
    ["__scopeId", "data-v-2f200157"]
]);
export {
    Ht as
    default
};