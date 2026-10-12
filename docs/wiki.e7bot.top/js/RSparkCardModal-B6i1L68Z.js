import {
    _ as a,
    u as e,
    r,
    i as l,
    B as n,
    C as s,
    P as t,
    q as o,
    c as d,
    d as c,
    a as i,
    t as p,
    G as u,
    F as h,
    m as y,
    T as k,
    p as C,
    o as m,
    w as v,
    y as f,
    H as b
} from "./index-DKI40WV2.js";
import {
    C as g
} from "./CznCard-DLpHZT1q.js";
const _ = {
        name: "RSparkCardModal",
        components: {
            CznCard: g
        },
        props: {
            show: {
                type: Boolean,
                default: !1
            },
            card: {
                type: Object,
                default: null
            },
            characterEgo: {
                type: String,
                default: null
            },
            enableAnimation: {
                type: Boolean,
                default: !1
            },
            enableAprilFool: {
                type: Boolean,
                default: void 0
            }
        },
        emits: ["close"],
        setup(a, {
            emit: o
        }) {
            const {
                t: d
            } = e(), c = r(null), i = r(0), p = l(() => i.value < 768), u = l(() => {
                const a = v.value.length;
                return 1 === a ? 1 : 2 === a ? 2 : 6 === a ? p.value ? 2 : 3 : Math.min(a, 3)
            }), h = l(() => {
                if (!i.value) return .5;
                const a = u.value;
                let e = (i.value - 40 - 16 * (a - 1)) / a / 464;
                return Math.min(e, .5)
            }), y = l(() => ({
                display: "grid",
                gridTemplateColumns: `repeat(${u.value}, 1fr)`,
                gap: "16px",
                padding: "20px",
                justifyItems: "center",
                alignItems: "start",
                width: "100%",
                maxWidth: "1200px"
            })), k = () => {
                c.value ? i.value = c.value.clientWidth : i.value = window.innerWidth
            };
            n(() => a.show, a => {
                a && b(() => {
                    k()
                })
            });
            const C = l(() => a.card && a.card.r_spark_cards ? a.card.r_spark_cards.filter(a => (a => {
                    if (!a) return !1;
                    const e = a.toString();
                    return e.endsWith("_pot") || e.endsWith("_lbk")
                })(a.id)) : []),
                m = l(() => a.card && a.card.r_spark_cards ? a.card.r_spark_cards.filter(a => {
                    return !!(e = a.id) && null !== e.toString().match(/_rsp([1-5])$/);
                    var e
                }) : []),
                v = l(() => {
                    if (!a.card) return [];
                    const e = [];
                    return a.card && e.push({ ...a.card,
                        _cardType: "base"
                    }), C.value.forEach(a => {
                        e.push({ ...a,
                            _cardType: "potential"
                        })
                    }), m.value.forEach(a => {
                        e.push({ ...a,
                            _cardType: "rspark"
                        })
                    }), e
                });
            return s(() => {
                window.addEventListener("resize", k), k()
            }), t(() => {
                window.removeEventListener("resize", k)
            }), {
                t: d,
                contentRef: c,
                allCards: v,
                getCardTypeLabel: a => {
                    if (!a || !a._cardType) return "";
                    switch (a._cardType) {
                        case "base":
                            return d("czn.baseCard");
                        case "potential":
                            return d("czn.potentialAwakening");
                        case "rspark":
                            return d("czn.rSparkCards");
                        default:
                            return ""
                    }
                },
                handleClose: () => {
                    o("close")
                },
                gridStyle: y,
                dynamicScale: h,
                isMobile: p
            }
        }
    },
    w = {
        class: "r-spark-modal"
    },
    x = {
        class: "r-spark-modal-header"
    },
    S = {
        class: "r-spark-modal-content",
        ref: "contentRef"
    },
    z = {
        class: "card-type-label"
    },
    T = {
        key: 1,
        class: "no-r-spark-cards"
    };
const E = a(_, [
    ["render", function(a, e, r, l, n, s) {
        const t = C("CznCard");
        return m(), o(k, {
            to: "body"
        }, [r.show ? (m(), d("div", {
            key: 0,
            class: "r-spark-modal-overlay",
            onClick: e[3] || (e[3] = (...a) => l.handleClose && l.handleClose(...a))
        }, [i("div", w, [i("div", x, [i("h3", null, p(l.t("czn.rSparkCards")), 1), i("button", {
            class: "close-btn",
            onClick: e[0] || (e[0] = (...a) => l.handleClose && l.handleClose(...a))
        }, "×")]), l.isMobile ? (m(), d("button", {
            key: 0,
            class: "mobile-close-btn",
            onClick: e[1] || (e[1] = (...a) => l.handleClose && l.handleClose(...a))
        }, e[4] || (e[4] = [i("svg", {
            viewBox: "0 0 24 24",
            width: "24",
            height: "24",
            stroke: "currentColor",
            "stroke-width": "2",
            fill: "none",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }, [i("line", {
            x1: "18",
            y1: "6",
            x2: "6",
            y2: "18"
        }), i("line", {
            x1: "6",
            y1: "6",
            x2: "18",
            y2: "18"
        })], -1)]))) : c("", !0), i("div", S, [r.card && l.allCards.length > 0 ? (m(), d("div", {
            key: 0,
            class: "cards-container",
            style: u(l.gridStyle)
        }, [(m(!0), d(h, null, y(l.allCards, a => (m(), d("div", {
            key: a.id,
            class: "r-spark-card-item",
            onClick: e[2] || (e[2] = v(() => {}, ["stop"]))
        }, [f(t, {
            card: a,
            "character-ego": r.characterEgo,
            scale: l.dynamicScale,
            "enable-animation": r.enableAnimation,
            "enable-april-fool": r.enableAprilFool
        }, null, 8, ["card", "character-ego", "scale", "enable-animation", "enable-april-fool"]), i("div", z, p(l.getCardTypeLabel(a)), 1)]))), 128))], 4)) : (m(), d("div", T, [i("p", null, p(l.t("czn.noRSparkCards")), 1)]))], 512)])])) : c("", !0)])
    }],
    ["__scopeId", "data-v-27635cda"]
]);
export {
    E as R
};