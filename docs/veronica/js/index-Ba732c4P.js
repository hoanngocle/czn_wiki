import {
    a2 as e,
    r as t,
    y as r,
    ac as o,
    i as n,
    C as l,
    P as s,
    B as i,
    ad as a
} from "./index-LLMsysJK.js";
const u = null,
    {
        min: c,
        max: f,
        abs: d,
        floor: p
    } = Math,
    v = (e, t, r) => c(r, f(t, e)),
    m = e => [...e].sort((e, t) => e - t),
    h = "function" == typeof queueMicrotask ? queueMicrotask : e => {
        Promise.resolve().then(e)
    },
    y = () => {
        let e;
        return [new Promise(t => {
            e = t
        }), e]
    },
    b = e => {
        let t;
        return () => (e && (t = e(), e = void 0), t)
    },
    S = (e, t, r) => {
        const o = r ? "unshift" : "push";
        for (let n = 0; n < t; n++) e[o](-1);
        return e
    },
    g = (e, t) => {
        const r = e.t[t];
        return -1 === r ? e.o : r
    },
    k = (e, t, r) => {
        const o = -1 === e.t[t];
        return e.t[t] = r, e.i = c(t, e.i), o
    },
    z = (e, t) => {
        if (!e.l) return 0;
        if (e.i >= t) return e.u[t];
        e.i < 0 && (e.u[0] = 0, e.i = 0);
        let r = e.i,
            o = e.u[r];
        for (; r < t;) o += g(e, r), e.u[++r] = o;
        return e.i = t, o
    },
    w = (e, t, r = 0, o = e.l - 1) => {
        for (; r <= o;) {
            const n = p((r + o) / 2),
                l = z(e, n);
            if (l <= t) {
                if (l + g(e, n) > t) return n;
                r = n + 1
            } else o = n - 1
        }
        return v(r, 0, e.l - 1)
    },
    x = (e, t, r) => {
        const o = t - e.l;
        return e.i = r ? -1 : c(t - 1, e.i), e.l = t, o > 0 ? (S(e.u, o), S(e.t, o, r), e.o * o) : (e.u.splice(o), (r ? e.t.splice(0, -o) : e.t.splice(o)).reduce((t, r) => t - (-1 === r ? e.o : r), 0))
    },
    E = "undefined" != typeof window,
    O = () => document.documentElement,
    A = b(() => !!E && "rtl" === getComputedStyle(O()).direction),
    B = b(() => !!/iP(hone|od|ad)/.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 0),
    I = b(() => "scrollBehavior" in O().style),
    j = setTimeout,
    T = (e, t) => t && A() ? -e : e,
    M = e({
        props: {
            L: {
                type: Object,
                required: !0
            },
            W: {
                type: Object,
                required: !0
            },
            X: {
                type: Object,
                required: !0
            },
            Y: {
                type: Function,
                required: !0
            },
            D: {
                type: Number,
                required: !0
            },
            U: {
                type: Boolean
            },
            G: {
                type: Boolean
            },
            K: {
                type: String,
                required: !0
            },
            Z: Object
        },
        setup(e) {
            const l = t(),
                s = n(() => e.L.value && e.W.k(e.D)),
                u = n(() => e.L.value && e.W.I(e.D));
            return i(() => l.value && e.D, (t, r, o) => {
                o(e.Y(l.value, e.D))
            }, {
                flush: "post"
            }), () => {
                var t;
                const {
                    X: n,
                    U: i,
                    G: c,
                    K: f
                } = e, d = u.value, {
                    style: p,
                    ...v
                } = null !== (t = e.Z) && void 0 !== t ? t : {}, m = {
                    contain: "layout style",
                    position: d && c ? void 0 : "absolute",
                    [i ? "height" : "width"]: "100%",
                    [i ? "top" : "left"]: "0px",
                    [i ? A() ? "right" : "left" : "top"]: s.value + "px",
                    visibility: !d || c ? "visible" : "hidden",
                    ...p
                };
                return i && (m.display = "inline-flex"), r(f, a({
                    ref: l,
                    style: m
                }, v), "function" == typeof(h = n) || "[object Object]" === Object.prototype.toString.call(h) && !o(h) ? n : {
                    default: () => [n],
                    _: 2
                }, 16, ["style"]);
                var h
            }
        }
    }),
    q = (e, t) => {
        const r = e.key;
        return null != r ? r : "_" + t
    },
    L = e({
        props: {
            data: {
                type: Array,
                required: !0
            },
            bufferSize: Number,
            itemSize: Number,
            shift: Boolean,
            horizontal: Boolean,
            startMargin: {
                type: Number,
                default: 0
            },
            ssrCount: Number,
            scrollRef: Object,
            as: {
                type: String,
                default: "div"
            },
            item: {
                type: String,
                default: "div"
            },
            itemProps: Function,
            keepMounted: Array
        },
        emits: ["scroll", "scrollEnd"],
        setup(e, {
            emit: a,
            expose: p,
            slots: b
        }) {
            let E = !!e.ssrCount;
            const O = e.horizontal,
                A = t(),
                L = ((e, t = 40, r = 0, o, n = !1) => {
                    let l = !!r,
                        s = 1,
                        i = 0,
                        a = 0,
                        p = 0,
                        v = 0,
                        h = 0,
                        y = 0,
                        b = 0,
                        E = 0,
                        O = u,
                        A = [0, l ? f(r - 1, 0) : -1],
                        I = 0;
                    const j = {
                            o: t,
                            t: S([], F = e),
                            l: F,
                            i: -1,
                            u: S([], F)
                        },
                        T = new Set,
                        M = () => p - a,
                        q = () => M() + h + v,
                        L = (e, t) => ((e, t, r, o) => {
                            if (o = c(o, e.l - 1), z(e, o) <= t) {
                                const n = w(e, r, o);
                                return [w(e, t, o, n), n]
                            } {
                                const n = w(e, t, void 0, o);
                                return [n, w(e, r, n)]
                            }
                        })(j, e, t, A[0]),
                        P = () => (e => e.l ? z(e, e.l - 1) + g(e, e.l - 1) : 0)(j),
                        N = e => z(j, e) - h,
                        C = e => g(j, e),
                        R = (e, t = -1) => j.t[e] === t,
                        D = e => {
                            e && (B() && 0 !== b || O && 1 === E ? h += e : v += e)
                        };
                    var F;
                    return {
                        p: () => s,
                        m: () => (e => [e.t.slice(), e.o])(j),
                        h: (e = 200) => {
                            if (!i || l) return A;
                            let t, r;
                            if (y)[t, r] = A;
                            else {
                                e = f(0, e);
                                let o = f(0, q()),
                                    l = o + i;
                                n || (1 !== b && (o -= e), 2 !== b && (l += e)), [t, r] = A = L(f(0, o), f(0, l)), O && (t = c(t, O[0]), r = f(r, O[1]))
                            }
                            return [f(t, 0), c(r, j.l - 1)]
                        },
                        v: () => w(j, q()),
                        S: () => w(j, q() + i),
                        I: R,
                        k: N,
                        O: C,
                        j: () => j.l,
                        T: () => p,
                        q: () => 0 !== b,
                        B: () => i,
                        M: () => a,
                        N: P,
                        P: () => (y = v, v = 0, [y, 2 === E]),
                        R: (e, t) => {
                            const r = [e, t];
                            return T.add(r), () => {
                                T.delete(r)
                            }
                        },
                        A: (e, t) => {
                            let r, o, c = 0;
                            switch (e) {
                                case 1:
                                    {
                                        if (t === p && 0 === E) break;
                                        const e = y;y = 0;
                                        const r = t - p,
                                            n = d(r);e && n < d(e) + 1 || 0 !== E || (b = r < 0 ? 2 : 1),
                                        l && (l = !1),
                                        p = t,
                                        c = 4;
                                        const s = M();s >= -i && s <= P() && (c += 1, o = n > i);
                                        break
                                    }
                                case 2:
                                    c = 8, 0 !== b && (r = !0, c += 1), b = 0, E = 0, O = u;
                                    break;
                                case 3:
                                    {
                                        const e = t.filter(([e, t]) => !R(e, t));
                                        if (!e.length) break;D(e.reduce((e, [t, r]) => ((2 === E || (O && 1 === E ? t < O[0] : N(t) + (0 === b && 0 === E ? C(t) : 0) < M())) && (e += r - C(t)), e), 0));
                                        for (const [t, r] of e) {
                                            const e = C(t),
                                                o = k(j, t, r);
                                            n && (I += o ? r : r - e)
                                        }
                                        n && i && I > i && (D(((e, t) => {
                                            let r = 0;
                                            const o = [];
                                            e.t.forEach((e, n) => {
                                                -1 !== e && (o.push(e), n < t && r++)
                                            }), e.i = -1;
                                            const n = m(o),
                                                l = n.length,
                                                s = l / 2 | 0,
                                                i = l % 2 == 0 ? (n[s - 1] + n[s]) / 2 : n[s],
                                                a = e.o;
                                            return ((e.o = i) - a) * f(t - r, 0)
                                        })(j, w(j, q()))), n = !1),
                                        c = 3,
                                        o = !0;
                                        break
                                    }
                                case 4:
                                    i !== t && (i || (o = !0), i = t, c = 3);
                                    break;
                                case 5:
                                    t[1] ? (D(x(j, t[0], !0)), E = 2, c = 1) : (x(j, t[0]), c = 1);
                                    break;
                                case 6:
                                    a = t;
                                    break;
                                case 7:
                                    E = 1;
                                    break;
                                case 8:
                                    O = L(t, t + i), c = 1
                            }
                            c && (s = 1 + (2147483647 & s), r && h && (v += h, h = 0), T.forEach(([e, t]) => {
                                c & e && t(o)
                            }))
                        }
                    }
                })(e.data.length, e.itemSize, e.ssrCount, 0, !e.itemSize),
                P = ((e, t) => {
                    let r;
                    const o = t ? "width" : "height",
                        n = new WeakMap,
                        l = (e => {
                            let t;
                            return {
                                F(r) {
                                    (t || (t = new((e => e.defaultView)((e => e.ownerDocument)(r)).ResizeObserver)(e))).observe(r)
                                },
                                J(e) {
                                    t.unobserve(e)
                                },
                                V() {
                                    t && t.disconnect()
                                }
                            }
                        })(t => {
                            const l = [];
                            for (const {
                                    target: s,
                                    contentRect: i
                                } of t)
                                if (s.offsetParent)
                                    if (s === r) e.A(4, i[o]);
                                    else {
                                        const e = n.get(s);
                                        e != u && l.push([e, i[o]])
                                    }
                            l.length && e.A(3, l)
                        });
                    return {
                        ee(e) {
                            l.F(r = e)
                        },
                        te: (e, t) => (n.set(e, t), l.F(e), () => {
                            n.delete(e), l.J(e)
                        }),
                        re: l.V
                    }
                })(L, O),
                N = ((e, t) => {
                    let r, o, n = y();
                    const l = t ? "scrollLeft" : "scrollTop",
                        s = t ? "overflowX" : "overflowY",
                        [i, a] = ((e, t, r) => {
                            let o;
                            return [async (n, l) => {
                                if (!(await t())) return;
                                o && o();
                                const s = () => {
                                    const [t, r] = y();
                                    return o = () => {
                                        r(!1)
                                    }, e.B() && j(o, 150), [t, e.R(2, () => {
                                        r(!0)
                                    })]
                                };
                                if (l && I()) e.A(8, n()), h(async () => {
                                    for (;;) {
                                        let t = !0;
                                        for (let [n, l] = e.h(); n <= l; n++)
                                            if (e.I(n)) {
                                                t = !1;
                                                break
                                            }
                                        if (t) break;
                                        const [r, o] = s();
                                        try {
                                            if (!(await r)) return
                                        } finally {
                                            o()
                                        }
                                    }
                                    e.A(7), r(n(), l)
                                });
                                else
                                    for (;;) {
                                        const [t, o] = s();
                                        try {
                                            if (e.A(7), r(n()), !(await t)) return
                                        } finally {
                                            o()
                                        }
                                    }
                            }, () => {
                                o && o()
                            }]
                        })(e, () => n[0], (e, o) => {
                            e = T(e, t), o ? r.scrollTo({
                                [t ? "left" : "top"]: e,
                                behavior: "smooth"
                            }) : r[l] = e
                        });
                    return {
                        oe(i) {
                            r = i, o = ((e, t, r, o, n) => {
                                const l = Date.now;
                                let s = 0,
                                    i = !1,
                                    a = !1,
                                    c = !1,
                                    f = !1;
                                const d = (() => {
                                        let t;
                                        const r = () => {
                                                t != u && clearTimeout(t)
                                            },
                                            o = () => {
                                                r(), t = j(() => {
                                                    t = u, (() => {
                                                        if (i || a) return i = !1, void d();
                                                        c = !1, e.A(2)
                                                    })()
                                                }, 150)
                                            };
                                        return o.H = r, o
                                    })(),
                                    p = () => {
                                        s = l(), c && (f = !0), e.A(1, o()), d()
                                    },
                                    v = t => {
                                        if (i || !e.q() || t.ctrlKey) return;
                                        const o = l() - s;
                                        150 > o && 50 < o && (r ? t.deltaX : t.deltaY) && (i = !0)
                                    },
                                    m = () => {
                                        a = !0, c = f = !1
                                    },
                                    h = () => {
                                        a = !1, B() && (c = !0)
                                    };
                                return t.addEventListener("scroll", p), t.addEventListener("wheel", v, {
                                    passive: !0
                                }), t.addEventListener("touchstart", m, {
                                    passive: !0
                                }), t.addEventListener("touchend", h, {
                                    passive: !0
                                }), {
                                    V: () => {
                                        t.removeEventListener("scroll", p), t.removeEventListener("wheel", v), t.removeEventListener("touchstart", m), t.removeEventListener("touchend", h), d.H()
                                    },
                                    C: () => {
                                        const [t, l] = e.P();
                                        t && (n(T(t, r), l, f), f = !1, l && e.B() > e.N() && e.A(1, o()))
                                    }
                                }
                            })(e, i, t, () => T(i[l], t), (t, r, o) => {
                                if (o) {
                                    const e = i.style,
                                        t = e[s];
                                    e[s] = "hidden", j(() => {
                                        e[s] = t
                                    })
                                }
                                i[l] = e.T() + t, r && a()
                            }), n[1](!0)
                        },
                        re() {
                            o && o.V(), n[1](!1), n = y()
                        },
                        ne(e) {
                            i(() => e)
                        },
                        se(t) {
                            t += e.T(), i(() => t)
                        },
                        ie(t, {
                            align: r,
                            smooth: o,
                            offset: n = 0
                        } = {}) {
                            if (t = v(t, 0, e.j() - 1), "nearest" === r) {
                                const o = e.k(t),
                                    n = e.T();
                                if (o < n) r = "start";
                                else {
                                    if (!(o + e.O(t) > n + e.B())) return;
                                    r = "end"
                                }
                            }
                            i(() => n + e.M() + e.k(t) + ("end" === r ? e.O(t) - e.B() : "center" === r ? (e.O(t) - e.B()) / 2 : 0), o)
                        },
                        le: () => {
                            o && o.C()
                        }
                    }
                })(L, O),
                C = t(L.p()),
                R = L.R(1, () => {
                    C.value = L.p()
                }),
                D = L.R(4, () => {
                    a("scroll", L.T())
                }),
                F = L.R(8, () => {
                    a("scrollEnd")
                }),
                X = n(t => {
                    C.value;
                    const r = L.h(e.bufferSize);
                    return t && ((e, t) => e[0] === t[0] && e[1] === t[1])(t, r) ? t : r
                }),
                Y = n(() => C.value && L.q()),
                W = n(() => C.value && L.N());
            return l(() => {
                E = !1;
                const t = requestAnimationFrame(() => {
                    const t = e => {
                        P.ee(e), N.oe(e)
                    };
                    e.scrollRef ? t(e.scrollRef) : t(A.value.parentElement)
                });
                s(() => {
                    cancelAnimationFrame(t)
                })
            }), s(() => {
                R(), D(), F(), P.re(), N.re()
            }), i(() => e.data.length, t => {
                L.A(5, [t, e.shift])
            }), i(() => e.startMargin, e => {
                L.A(6, e)
            }, {
                immediate: !0
            }), i([C], () => {
                N.le()
            }, {
                flush: "post"
            }), p({
                get scrollOffset() {
                    return L.T()
                },
                get scrollSize() {
                    return f((e = L).N(), e.B());
                    var e
                },
                get viewportSize() {
                    return L.B()
                },
                findStartIndex: L.v,
                findEndIndex: L.S,
                getItemOffset: L.k,
                getItemSize: L.O,
                scrollToIndex: N.ie,
                scrollTo: N.ne,
                scrollBy: N.se
            }), () => {
                const t = e.as,
                    n = e.item,
                    l = W.value,
                    s = [],
                    i = t => {
                        var o;
                        const l = b.default({
                            item: e.data[t],
                            index: t
                        })[0];
                        return r(M, {
                            key: q(l, t),
                            L: C,
                            W: L,
                            Y: P.te,
                            D: t,
                            X: l,
                            U: O,
                            G: E,
                            K: n,
                            Z: null === (o = e.itemProps) || void 0 === o ? void 0 : o.call(e, {
                                item: e.data[t],
                                index: t
                            })
                        }, null, 8, ["L", "W", "Y", "D", "X", "U", "G", "K", "Z"])
                    };
                if (e.keepMounted) {
                    const t = new Set(e.keepMounted);
                    for (let [e, r] = X.value; e <= r; e++) t.add(e);
                    m([...t]).forEach(e => {
                        s.push(i(e))
                    })
                } else
                    for (let [e, r] = X.value; e <= r; e++) s.push(i(e));
                return r(t, {
                    ref: A,
                    style: {
                        contain: "size paint style",
                        overflowAnchor: "none",
                        overflow: "clip",
                        flex: "none",
                        position: "relative",
                        width: O ? l + "px" : "100%",
                        height: O ? "100%" : l + "px",
                        pointerEvents: Y.value ? "none" : void 0
                    }
                }, "function" == typeof(a = s) || "[object Object]" === Object.prototype.toString.call(a) && !o(a) ? s : {
                    default: () => [s],
                    _: 2
                }, 8, ["style"]);
                var a
            }
        }
    }),
    P = e({
        props: {
            data: {
                type: Array,
                required: !0
            },
            bufferSize: Number,
            itemSize: Number,
            shift: Boolean,
            horizontal: Boolean,
            ssrCount: Number,
            itemProps: Function,
            keepMounted: Array
        },
        emits: ["scroll", "scrollEnd"],
        setup(e, {
            emit: n,
            expose: l,
            slots: s
        }) {
            const i = e.horizontal,
                a = e => {
                    n("scroll", e)
                },
                u = () => {
                    n("scrollEnd")
                },
                c = t();
            return l({
                get scrollOffset() {
                    return c.value.scrollOffset
                },
                get scrollSize() {
                    return c.value.scrollSize
                },
                get viewportSize() {
                    return c.value.viewportSize
                },
                findStartIndex: (...e) => c.value.findStartIndex(...e),
                findEndIndex: (...e) => c.value.findEndIndex(...e),
                getItemOffset: (...e) => c.value.getItemOffset(...e),
                getItemSize: (...e) => c.value.getItemSize(...e),
                scrollToIndex: (...e) => c.value.scrollToIndex(...e),
                scrollTo: (...e) => c.value.scrollTo(...e),
                scrollBy: (...e) => c.value.scrollBy(...e)
            }), () => {
                return r("div", {
                    style: {
                        display: i ? "inline-block" : "block",
                        [i ? "overflowX" : "overflowY"]: "auto",
                        contain: "strict",
                        width: "100%",
                        height: "100%"
                    }
                }, [r(L, {
                    ref: c,
                    data: e.data,
                    bufferSize: e.bufferSize,
                    itemSize: e.itemSize,
                    itemProps: e.itemProps,
                    shift: e.shift,
                    ssrCount: e.ssrCount,
                    horizontal: i,
                    keepMounted: e.keepMounted,
                    onScroll: a,
                    onScrollEnd: u
                }, (t = s, "function" == typeof t || "[object Object]" === Object.prototype.toString.call(t) && !o(t) ? s : {
                    default: () => [s],
                    _: 2
                }), 8, ["data", "bufferSize", "itemSize", "itemProps", "shift", "ssrCount", "horizontal", "keepMounted", "onScroll", "onScrollEnd"])], 4);
                var t
            }
        }
    });
export {
    P as F
};