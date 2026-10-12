(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 348845, e => {
    "use strict";
    var n, t, r = e.i(480388),
        o = e.i(181788),
        i = e.i(499092),
        a = e.i(843476),
        l = e.i(317608),
        c = e.i(855111),
        u = e.i(271645),
        d = e.i(30030),
        f = e.i(75830),
        s = Object.defineProperty,
        p = function(e, n) {
            return s(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function v(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function _() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = v(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : v(n[e], null)
                }
            }
        }
    }

    function h() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return u.useCallback(_.apply(void 0, (0, c._)(n)), n)
    }
    p(v, "setRef"), p(_, "composeRefs"), p(h, "useComposedRefs");
    var m = Object.defineProperty,
        g = function(e, n) {
            return m(e, "name", {
                value: n,
                configurable: !0
            })
        },
        b = !!("u" > typeof window && window.document && window.document.createElement);

    function y(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = t.checkForDefaultPrevented,
            o = void 0 === r || r;
        return g(function(t) {
            if (null == e || e(t), !1 === o || !t || !t.defaultPrevented) return null == n ? void 0 : n(t)
        }, "handleEvent")
    }

    function w(e) {
        var n;
        if (!b) throw Error("Cannot access document outside of the DOM");
        return null != (n = null == e ? void 0 : e.ownerDocument) ? n : document
    }

    function C(e) {
        return "IFRAME" === e.tagName
    }
    g(y, "composeEventHandlers"), g(function(e) {
        var n, t;
        if (!b) throw Error("Cannot access window outside of the DOM");
        return null != (n = null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ? n : window
    }, "getOwnerWindow"), g(w, "getOwnerDocument"), g(function e(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = w(n).activeElement;
        if (!(null == r ? void 0 : r.nodeName)) return null;
        if (C(r) && r.contentDocument) return e(r.contentDocument.body, t);
        if (t) {
            var o = r.getAttribute("aria-activedescendant");
            if (o) {
                var i = w(r).getElementById(o);
                if (i) return i
            }
        }
        return r
    }, "getActiveElement"), g(C, "isFrame");
    var E = (null == (n = globalThis) ? void 0 : n.document) ? u.useLayoutEffect : function() {},
        A = Object.defineProperty,
        S = u[" useEffectEvent ".trim().toString()],
        j = u[" useInsertionEffect ".trim().toString()];

    function R(e) {
        if ("function" == typeof S) return S(e);
        var n = u.useRef(function() {
            throw Error("Cannot call an event handler while rendering.")
        });
        return "function" == typeof j ? j(function() {
            n.current = e
        }) : E(function() {
            n.current = e
        }), u.useMemo(function() {
            return function() {
                for (var e, t = arguments.length, r = Array(t), o = 0; o < t; o++) r[o] = arguments[o];
                return null == (e = n.current) ? void 0 : e.call.apply(e, [n].concat((0, c._)(r)))
            }
        }, [])
    }
    A(R, "name", {
        value: "useEffectEvent",
        configurable: !0
    });
    var x = Object.defineProperty,
        O = function(e, n) {
            return x(e, "name", {
                value: n,
                configurable: !0
            })
        },
        P = u[" useInsertionEffect ".trim().toString()] || E;

    function I(e) {
        var n = e.prop,
            t = e.defaultProp,
            r = e.onChange,
            o = void 0 === r ? O(function() {}, "onChange") : r,
            i = (e.caller, (0, l._)(N({
                defaultProp: t,
                onChange: o
            }), 3)),
            a = i[0],
            c = i[1],
            d = i[2],
            f = void 0 !== n,
            s = f ? n : a;
        return [s, u.useCallback(function(e) {
            if (f) {
                var t, r = D(e) ? e(n) : e;
                r !== n && (null == (t = d.current) || t.call(d, r))
            } else c(e)
        }, [f, n, c, d])]
    }

    function N(e) {
        var n = e.defaultProp,
            t = e.onChange,
            r = (0, l._)(u.useState(n), 2),
            o = r[0],
            i = r[1],
            a = u.useRef(o),
            c = u.useRef(t);
        return P(function() {
            c.current = t
        }, [t]), u.useEffect(function() {
            if (a.current !== o) {
                var e;
                null == (e = c.current) || e.call(c, o), a.current = o
            }
        }, [o, a]), [o, i, c]
    }

    function D(e) {
        return "function" == typeof e
    }
    O(I, "useControllableState"), O(N, "useUncontrolledState"), O(D, "isFunction");
    var V = Symbol("RADIX:SYNC_STATE");
    O(function(e, n, t, i) {
        var a = n.prop,
            d = n.defaultProp,
            f = n.onChange,
            s = (n.caller, void 0 !== a),
            p = R(f),
            v = [(0, o._)((0, r._)({}, t), {
                state: d
            })];
        i && v.push(i);
        var _ = (0, l._)(u.useReducer.apply(u, [function(n, t) {
                if (t.type === V) return (0, o._)((0, r._)({}, n), {
                    state: t.state
                });
                var i = e(n, t);
                return s && !Object.is(i.state, n.state) && p(i.state), i
            }].concat((0, c._)(v))), 2),
            h = _[0],
            m = _[1],
            g = h.state,
            b = u.useRef(g);
        u.useEffect(function() {
            b.current !== g && (b.current = g, s || p(g))
        }, [g, b, s]);
        var y = u.useMemo(function() {
            return void 0 !== a ? (0, o._)((0, r._)({}, h), {
                state: a
            }) : h
        }, [h, a]);
        return u.useEffect(function() {
            s && !Object.is(a, h.state) && m({
                type: V,
                state: a
            })
        }, [a, h.state, s]), [y, m]
    }, "useControllableStateReducer");
    var k = e.i(540151),
        T = e.i(174080),
        F = e.i(524906),
        M = Object.defineProperty,
        W = function(e, n) {
            return M(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function B(e) {
        var n = u.forwardRef(function(n, t) {
            var r, o = n.children,
                a = (0, i._)(n, ["children"]),
                l = null,
                c = !1,
                d = [];
            X(o) && "function" == typeof G && (o = G(o._payload)), u.Children.forEach(o, function(e) {
                if (z(e)) {
                    c = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    X(t) && "function" == typeof G && (t = G(t._payload)), l = K(e, t), d.push(null == l || null == (n = l.props) ? void 0 : n.children)
                } else d.push(e)
            }), l ? l = u.cloneElement(l, void 0, d) : !c && 1 === u.Children.count(o) && u.isValidElement(o) && (l = o);
            var f = l ? $(l) : void 0,
                s = h(t, f);
            if (!l) {
                if (o || 0 === o) throw Error(c ? q(e) : Z(e));
                return o
            }
            var p = L(a, null != (r = l.props) ? r : {});
            return l.type !== u.Fragment && (p.ref = t ? s : f), u.cloneElement(l, p)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    W(B, "createSlot");
    var H = Symbol.for("radix.slottable");
    W(function(e) {
        var n = W(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = H, n
    }, "createSlottable");
    var K = W(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return u.isValidElement(t) ? u.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return u.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function L(e, n) {
        var t = (0, r._)({}, n);
        for (var o in n) ! function(o) {
            var i = e[o],
                a = n[o];
            /^on[A-Z]/.test(o) ? i && a ? t[o] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = a.apply(void 0, (0, c._)(n));
                return i.apply(void 0, (0, c._)(n)), r
            } : i && (t[o] = i) : "style" === o ? t[o] = (0, r._)({}, i, a) : "className" === o && (t[o] = [i, a].filter(Boolean).join(" "))
        }(o);
        return (0, r._)({}, e, t)
    }

    function $(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function z(e) {
        return u.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === H
    }
    W(L, "mergeProps"), W($, "getElementRef"), W(z, "isSlottable");
    var U = Symbol.for("react.lazy");

    function X(e) {
        return null != e && (void 0 === e ? "undefined" : (0, F._)(e)) === "object" && "$$typeof" in e && e.$$typeof === U && "_payload" in e && Y(e._payload)
    }

    function Y(e) {
        return (void 0 === e ? "undefined" : (0, F._)(e)) === "object" && null !== e && "then" in e
    }
    W(X, "isLazyComponent"), W(Y, "isPromiseLike");
    var Z = W(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        q = W(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        G = u[" use ".trim().toString()],
        J = Object.defineProperty,
        Q = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = B("Primitive.".concat(n)),
                l = u.forwardRef(function(e, l) {
                    var c = e.asChild,
                        u = (0, i._)(e, ["asChild"]),
                        d = c ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, a.jsx)(d, (0, o._)((0, r._)({}, u), {
                        ref: l
                    }))
                });
            return l.displayName = "Primitive.".concat(n), (0, o._)((0, r._)({}, e), (0, k._)({}, n, l))
        }, {});
    J(function(e, n) {
        e && T.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var ee = Object.defineProperty,
        en = function(e, n) {
            return ee(e, "name", {
                value: n,
                configurable: !0
            })
        },
        et = !!("u" > typeof window && window.document && window.document.createElement);

    function er(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = t.checkForDefaultPrevented,
            o = void 0 === r || r;
        return en(function(t) {
            if (null == e || e(t), !1 === o || !t || !t.defaultPrevented) return null == n ? void 0 : n(t)
        }, "handleEvent")
    }

    function eo(e) {
        var n;
        if (!et) throw Error("Cannot access document outside of the DOM");
        return null != (n = null == e ? void 0 : e.ownerDocument) ? n : document
    }

    function ei(e) {
        return "IFRAME" === e.tagName
    }
    en(er, "composeEventHandlers"), en(function(e) {
        var n, t;
        if (!et) throw Error("Cannot access window outside of the DOM");
        return null != (n = null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ? n : window
    }, "getOwnerWindow"), en(eo, "getOwnerDocument"), en(function e(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = eo(n).activeElement;
        if (!(null == r ? void 0 : r.nodeName)) return null;
        if (ei(r) && r.contentDocument) return e(r.contentDocument.body, t);
        if (t) {
            var o = r.getAttribute("aria-activedescendant");
            if (o) {
                var i = eo(r).getElementById(o);
                if (i) return i
            }
        }
        return r
    }, "getActiveElement"), en(ei, "isFrame");
    var ea = (null == (t = globalThis) ? void 0 : t.document) ? u.useLayoutEffect : function() {},
        el = Object.defineProperty,
        ec = u[" useEffectEvent ".trim().toString()],
        eu = u[" useInsertionEffect ".trim().toString()];

    function ed(e) {
        if ("function" == typeof ec) return ec(e);
        var n = u.useRef(function() {
            throw Error("Cannot call an event handler while rendering.")
        });
        return "function" == typeof eu ? eu(function() {
            n.current = e
        }) : ea(function() {
            n.current = e
        }), u.useMemo(function() {
            return function() {
                for (var e, t = arguments.length, r = Array(t), o = 0; o < t; o++) r[o] = arguments[o];
                return null == (e = n.current) ? void 0 : e.call.apply(e, [n].concat((0, c._)(r)))
            }
        }, [])
    }
    el(ed, "name", {
        value: "useEffectEvent",
        configurable: !0
    });
    var ef = Object.defineProperty,
        es = function(e, n) {
            return ef(e, "name", {
                value: n,
                configurable: !0
            })
        },
        ep = u[" useInsertionEffect ".trim().toString()] || ea;

    function ev(e) {
        var n = e.prop,
            t = e.defaultProp,
            r = e.onChange,
            o = void 0 === r ? es(function() {}, "onChange") : r,
            i = (e.caller, (0, l._)(e_({
                defaultProp: t,
                onChange: o
            }), 3)),
            a = i[0],
            c = i[1],
            d = i[2],
            f = void 0 !== n,
            s = f ? n : a;
        return [s, u.useCallback(function(e) {
            if (f) {
                var t, r = eh(e) ? e(n) : e;
                r !== n && (null == (t = d.current) || t.call(d, r))
            } else c(e)
        }, [f, n, c, d])]
    }

    function e_(e) {
        var n = e.defaultProp,
            t = e.onChange,
            r = (0, l._)(u.useState(n), 2),
            o = r[0],
            i = r[1],
            a = u.useRef(o),
            c = u.useRef(t);
        return ep(function() {
            c.current = t
        }, [t]), u.useEffect(function() {
            if (a.current !== o) {
                var e;
                null == (e = c.current) || e.call(c, o), a.current = o
            }
        }, [o, a]), [o, i, c]
    }

    function eh(e) {
        return "function" == typeof e
    }
    es(ev, "useControllableState"), es(e_, "useUncontrolledState"), es(eh, "isFunction");
    var em = Symbol("RADIX:SYNC_STATE");
    es(function(e, n, t, i) {
        var a = n.prop,
            d = n.defaultProp,
            f = n.onChange,
            s = (n.caller, void 0 !== a),
            p = ed(f),
            v = [(0, o._)((0, r._)({}, t), {
                state: d
            })];
        i && v.push(i);
        var _ = (0, l._)(u.useReducer.apply(u, [function(n, t) {
                if (t.type === em) return (0, o._)((0, r._)({}, n), {
                    state: t.state
                });
                var i = e(n, t);
                return s && !Object.is(i.state, n.state) && p(i.state), i
            }].concat((0, c._)(v))), 2),
            h = _[0],
            m = _[1],
            g = h.state,
            b = u.useRef(g);
        u.useEffect(function() {
            b.current !== g && (b.current = g, s || p(g))
        }, [g, b, s]);
        var y = u.useMemo(function() {
            return void 0 !== a ? (0, o._)((0, r._)({}, h), {
                state: a
            }) : h
        }, [h, a]);
        return u.useEffect(function() {
            s && !Object.is(a, h.state) && m({
                type: em,
                state: a
            })
        }, [a, h.state, s]), [y, m]
    }, "useControllableStateReducer");
    var eg = Object.defineProperty,
        eb = function(e, n) {
            return eg(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function ey(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function ew() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = ey(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : ey(n[e], null)
                }
            }
        }
    }

    function eC() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return u.useCallback(ew.apply(void 0, (0, c._)(n)), n)
    }
    eb(ey, "setRef"), eb(ew, "composeRefs"), eb(eC, "useComposedRefs");
    var eE = Object.defineProperty,
        eA = function(e, n) {
            return eE(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function eS(e) {
        var n = u.forwardRef(function(n, t) {
            var r, o = n.children,
                a = (0, i._)(n, ["children"]),
                l = null,
                c = !1,
                d = [];
            eN(o) && "function" == typeof eT && (o = eT(o._payload)), u.Children.forEach(o, function(e) {
                if (eP(e)) {
                    c = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    eN(t) && "function" == typeof eT && (t = eT(t._payload)), l = eR(e, t), d.push(null == l || null == (n = l.props) ? void 0 : n.children)
                } else d.push(e)
            }), l ? l = u.cloneElement(l, void 0, d) : !c && 1 === u.Children.count(o) && u.isValidElement(o) && (l = o);
            var f = l ? eO(l) : void 0,
                s = eC(t, f);
            if (!l) {
                if (o || 0 === o) throw Error(c ? ek(e) : eV(e));
                return o
            }
            var p = ex(a, null != (r = l.props) ? r : {});
            return l.type !== u.Fragment && (p.ref = t ? s : f), u.cloneElement(l, p)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    eA(eS, "createSlot");
    var ej = Symbol.for("radix.slottable");
    eA(function(e) {
        var n = eA(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = ej, n
    }, "createSlottable");
    var eR = eA(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return u.isValidElement(t) ? u.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return u.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function ex(e, n) {
        var t = (0, r._)({}, n);
        for (var o in n) ! function(o) {
            var i = e[o],
                a = n[o];
            /^on[A-Z]/.test(o) ? i && a ? t[o] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = a.apply(void 0, (0, c._)(n));
                return i.apply(void 0, (0, c._)(n)), r
            } : i && (t[o] = i) : "style" === o ? t[o] = (0, r._)({}, i, a) : "className" === o && (t[o] = [i, a].filter(Boolean).join(" "))
        }(o);
        return (0, r._)({}, e, t)
    }

    function eO(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function eP(e) {
        return u.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === ej
    }
    eA(ex, "mergeProps"), eA(eO, "getElementRef"), eA(eP, "isSlottable");
    var eI = Symbol.for("react.lazy");

    function eN(e) {
        return null != e && (void 0 === e ? "undefined" : (0, F._)(e)) === "object" && "$$typeof" in e && e.$$typeof === eI && "_payload" in e && eD(e._payload)
    }

    function eD(e) {
        return (void 0 === e ? "undefined" : (0, F._)(e)) === "object" && null !== e && "then" in e
    }
    eA(eN, "isLazyComponent"), eA(eD, "isPromiseLike");
    var eV = eA(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        ek = eA(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        eT = u[" use ".trim().toString()],
        eF = Object.defineProperty,
        eM = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = eS("Primitive.".concat(n)),
                l = u.forwardRef(function(e, l) {
                    var c = e.asChild,
                        u = (0, i._)(e, ["asChild"]),
                        d = c ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, a.jsx)(d, (0, o._)((0, r._)({}, u), {
                        ref: l
                    }))
                });
            return l.displayName = "Primitive.".concat(n), (0, o._)((0, r._)({}, e), (0, k._)({}, n, l))
        }, {});
    eF(function(e, n) {
        e && T.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var eW = e.i(296626),
        eB = e.i(610772),
        eH = Object.defineProperty,
        eK = function(e, n) {
            return eH(e, "name", {
                value: n,
                configurable: !0
            })
        },
        eL = "Collapsible",
        e$ = (0, l._)((0, d.createContextScope)(eL), 2),
        ez = e$[0],
        eU = e$[1],
        eX = (0, l._)(ez(eL), 2),
        eY = eX[0],
        eZ = eX[1],
        eq = u.forwardRef(eK(function(e, n) {
            var t = e.__scopeCollapsible,
                c = e.open,
                d = e.defaultOpen,
                f = e.disabled,
                s = e.onOpenChange,
                p = (0, i._)(e, ["__scopeCollapsible", "open", "defaultOpen", "disabled", "onOpenChange"]),
                v = (0, l._)(ev({
                    prop: c,
                    defaultProp: null != d && d,
                    onChange: s,
                    caller: eL
                }), 2),
                _ = v[0],
                h = v[1];
            return (0, a.jsx)(eY, {
                scope: t,
                disabled: f,
                contentId: (0, eB.useId)(),
                open: _,
                onOpenToggle: u.useCallback(function() {
                    return h(function(e) {
                        return !e
                    })
                }, [h]),
                children: (0, a.jsx)(eM.div, (0, o._)((0, r._)({
                    "data-state": e1(_),
                    "data-disabled": f ? "" : void 0
                }, p), {
                    ref: n
                }))
            })
        }, "Collapsible")),
        eG = u.forwardRef(eK(function(e, n) {
            var t = e.__scopeCollapsible,
                l = (0, i._)(e, ["__scopeCollapsible"]),
                c = eZ("CollapsibleTrigger", t);
            return (0, a.jsx)(eM.button, (0, o._)((0, r._)({
                type: "button",
                "aria-controls": c.open ? c.contentId : void 0,
                "aria-expanded": c.open || !1,
                "data-state": e1(c.open),
                "data-disabled": c.disabled ? "" : void 0,
                disabled: c.disabled
            }, l), {
                ref: n,
                onClick: er(e.onClick, c.onOpenToggle)
            }))
        }, "CollapsibleTrigger")),
        eJ = "CollapsibleContent",
        eQ = u.forwardRef(eK(function(e, n) {
            var t = e.forceMount,
                l = (0, i._)(e, ["forceMount"]),
                c = eZ(eJ, e.__scopeCollapsible);
            return (0, a.jsx)(eW.Presence, {
                present: t || c.open,
                children: function(e) {
                    var t = e.present;
                    return (0, a.jsx)(e0, (0, o._)((0, r._)({}, l), {
                        ref: n,
                        present: t
                    }))
                }
            })
        }, "CollapsibleContent")),
        e0 = u.forwardRef(eK(function(e, n) {
            var t, c = e.__scopeCollapsible,
                d = e.present,
                f = e.children,
                s = (0, i._)(e, ["__scopeCollapsible", "present", "children"]),
                p = eZ(eJ, c),
                v = (0, l._)(u.useState(d), 2),
                _ = v[0],
                h = v[1],
                m = u.useRef(null),
                g = eC(n, m),
                b = u.useRef(0),
                y = b.current,
                w = u.useRef(0),
                C = w.current,
                E = p.open || _,
                A = u.useRef(E),
                S = u.useRef(void 0);
            return u.useEffect(function() {
                var e = requestAnimationFrame(function() {
                    return A.current = !1
                });
                return function() {
                    return cancelAnimationFrame(e)
                }
            }, []), ea(function() {
                var e = m.current;
                if (e) {
                    S.current = S.current || {
                        transitionDuration: e.style.transitionDuration,
                        animationName: e.style.animationName
                    }, e.style.transitionDuration = "0s", e.style.animationName = "none";
                    var n = e.getBoundingClientRect();
                    b.current = n.height, w.current = n.width, A.current || (e.style.transitionDuration = S.current.transitionDuration, e.style.animationName = S.current.animationName), h(d)
                }
            }, [p.open, d]), (0, a.jsx)(eM.div, (0, o._)((0, r._)({
                "data-state": e1(p.open),
                "data-disabled": p.disabled ? "" : void 0,
                id: p.contentId,
                hidden: !E
            }, s), {
                ref: g,
                style: (0, r._)((t = {}, (0, k._)(t, "--radix-collapsible-content-height", y ? "".concat(y, "px") : void 0), (0, k._)(t, "--radix-collapsible-content-width", C ? "".concat(C, "px") : void 0), t), e.style),
                children: E && f
            }))
        }, "CollapsibleContentImpl"));

    function e1(e) {
        return e ? "open" : "closed"
    }
    eK(e1, "getState");
    var e2 = e.i(586318),
        e8 = Object.defineProperty,
        e3 = function(e, n) {
            return e8(e, "name", {
                value: n,
                configurable: !0
            })
        },
        e4 = "Accordion",
        e5 = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
        e7 = (0, l._)((0, f.createCollection)(e4), 3),
        e6 = e7[0],
        e9 = e7[1],
        ne = e7[2],
        nn = (0, l._)((0, d.createContextScope)(e4, [ne, eU]), 2),
        nt = nn[0];
    nn[1];
    var nr = eU(),
        no = u.forwardRef(e3(function(e, n) {
            var t = e.type,
                l = (0, i._)(e, ["type"]);
            return (0, a.jsx)(e6.Provider, {
                scope: e.__scopeAccordion,
                children: "multiple" === t ? (0, a.jsx)(ns, (0, o._)((0, r._)({}, l), {
                    ref: n
                })) : (0, a.jsx)(nf, (0, o._)((0, r._)({}, l), {
                    ref: n
                }))
            })
        }, "Accordion")),
        ni = (0, l._)(nt(e4), 2),
        na = ni[0],
        nl = ni[1],
        nc = (0, l._)(nt(e4, {
            collapsible: !1
        }), 2),
        nu = nc[0],
        nd = nc[1],
        nf = u.forwardRef(e3(function(e, n) {
            var t = e.value,
                c = e.defaultValue,
                d = e.onValueChange,
                f = void 0 === d ? e3(function() {}, "onValueChange") : d,
                s = e.collapsible,
                p = void 0 !== s && s,
                v = (0, i._)(e, ["value", "defaultValue", "onValueChange", "collapsible"]),
                _ = (0, l._)(I({
                    prop: t,
                    defaultProp: null != c ? c : "",
                    onChange: f,
                    caller: e4
                }), 2),
                h = _[0],
                m = _[1];
            return (0, a.jsx)(na, {
                scope: e.__scopeAccordion,
                value: u.useMemo(function() {
                    return h ? [h] : []
                }, [h]),
                onItemOpen: m,
                onItemClose: u.useCallback(function() {
                    return p && m("")
                }, [p, m]),
                children: (0, a.jsx)(nu, {
                    scope: e.__scopeAccordion,
                    collapsible: p,
                    children: (0, a.jsx)(nh, (0, o._)((0, r._)({}, v), {
                        ref: n
                    }))
                })
            })
        }, "AccordionImplSingle")),
        ns = u.forwardRef(e3(function(e, n) {
            var t = e.value,
                d = e.defaultValue,
                f = e.onValueChange,
                s = void 0 === f ? e3(function() {}, "onValueChange") : f,
                p = (0, i._)(e, ["value", "defaultValue", "onValueChange"]),
                v = (0, l._)(I({
                    prop: t,
                    defaultProp: null != d ? d : [],
                    onChange: s,
                    caller: e4
                }), 2),
                _ = v[0],
                h = v[1],
                m = u.useCallback(function(e) {
                    return h(function() {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                        return (0, c._)(n).concat([e])
                    })
                }, [h]),
                g = u.useCallback(function(e) {
                    return h(function() {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                        return n.filter(function(n) {
                            return n !== e
                        })
                    })
                }, [h]);
            return (0, a.jsx)(na, {
                scope: e.__scopeAccordion,
                value: _,
                onItemOpen: m,
                onItemClose: g,
                children: (0, a.jsx)(nu, {
                    scope: e.__scopeAccordion,
                    collapsible: !0,
                    children: (0, a.jsx)(nh, (0, o._)((0, r._)({}, p), {
                        ref: n
                    }))
                })
            })
        }, "AccordionImplMultiple")),
        np = (0, l._)(nt(e4), 2),
        nv = np[0],
        n_ = np[1],
        nh = u.forwardRef(e3(function(e, n) {
            var t = e.__scopeAccordion,
                l = e.disabled,
                c = e.dir,
                d = e.orientation,
                f = void 0 === d ? "vertical" : d,
                s = (0, i._)(e, ["__scopeAccordion", "disabled", "dir", "orientation"]),
                p = h(u.useRef(null), n),
                v = e9(t),
                _ = "ltr" === (0, e2.useDirection)(c),
                m = y(e.onKeyDown, function(e) {
                    if (e5.includes(e.key)) {
                        var n, t = e.target,
                            r = v().filter(function(e) {
                                var n;
                                return !(null == (n = e.ref.current) ? void 0 : n.disabled)
                            }),
                            o = r.findIndex(function(e) {
                                return e.ref.current === t
                            }),
                            i = r.length;
                        if (-1 !== o) {
                            e.preventDefault();
                            var a = o,
                                l = i - 1,
                                c = e3(function() {
                                    (a = o + 1) > l && (a = 0)
                                }, "moveNext"),
                                u = e3(function() {
                                    (a = o - 1) < 0 && (a = l)
                                }, "movePrev");
                            switch (e.key) {
                                case "Home":
                                    a = 0;
                                    break;
                                case "End":
                                    a = l;
                                    break;
                                case "ArrowRight":
                                    "horizontal" === f && (_ ? c() : u());
                                    break;
                                case "ArrowDown":
                                    "vertical" === f && c();
                                    break;
                                case "ArrowLeft":
                                    "horizontal" === f && (_ ? u() : c());
                                    break;
                                case "ArrowUp":
                                    "vertical" === f && u()
                            }
                            null == (n = r[a % i].ref.current) || n.focus()
                        }
                    }
                });
            return (0, a.jsx)(nv, {
                scope: t,
                disabled: l,
                direction: c,
                orientation: f,
                children: (0, a.jsx)(e6.Slot, {
                    scope: t,
                    children: (0, a.jsx)(Q.div, (0, o._)((0, r._)({}, s), {
                        "data-orientation": f,
                        ref: p,
                        onKeyDown: l ? void 0 : m
                    }))
                })
            })
        }, "AccordionImpl")),
        nm = "AccordionItem",
        ng = (0, l._)(nt(nm), 2),
        nb = ng[0],
        ny = ng[1],
        nw = u.forwardRef(e3(function(e, n) {
            var t = e.__scopeAccordion,
                l = e.value,
                c = (0, i._)(e, ["__scopeAccordion", "value"]),
                u = n_(nm, t),
                d = nl(nm, t),
                f = nr(t),
                s = (0, eB.useId)(),
                p = l && d.value.includes(l) || !1,
                v = u.disabled || e.disabled;
            return (0, a.jsx)(nb, {
                scope: t,
                open: p,
                disabled: v,
                triggerId: s,
                children: (0, a.jsx)(eq, (0, o._)((0, r._)({
                    "data-orientation": u.orientation,
                    "data-state": nj(p)
                }, f, c), {
                    ref: n,
                    disabled: v,
                    open: p,
                    onOpenChange: function(e) {
                        e ? d.onItemOpen(l) : d.onItemClose(l)
                    }
                }))
            })
        }, "AccordionItem")),
        nC = u.forwardRef(e3(function(e, n) {
            var t = e.__scopeAccordion,
                l = (0, i._)(e, ["__scopeAccordion"]),
                c = n_(e4, t),
                u = ny("AccordionHeader", t);
            return (0, a.jsx)(Q.h3, (0, o._)((0, r._)({
                "data-orientation": c.orientation,
                "data-state": nj(u.open),
                "data-disabled": u.disabled ? "" : void 0
            }, l), {
                ref: n
            }))
        }, "AccordionHeader")),
        nE = "AccordionTrigger",
        nA = u.forwardRef(e3(function(e, n) {
            var t = e.__scopeAccordion,
                l = (0, i._)(e, ["__scopeAccordion"]),
                c = n_(e4, t),
                u = ny(nE, t),
                d = nd(nE, t),
                f = nr(t);
            return (0, a.jsx)(e6.ItemSlot, {
                scope: t,
                children: (0, a.jsx)(eG, (0, o._)((0, r._)({
                    "aria-disabled": u.open && !d.collapsible || void 0,
                    "data-orientation": c.orientation,
                    id: u.triggerId
                }, f, l), {
                    ref: n
                }))
            })
        }, "AccordionTrigger")),
        nS = u.forwardRef(e3(function(e, n) {
            var t = e.__scopeAccordion,
                l = (0, i._)(e, ["__scopeAccordion"]),
                c = n_(e4, t),
                u = ny("AccordionContent", t),
                d = nr(t);
            return (0, a.jsx)(eQ, (0, o._)((0, r._)({
                role: "region",
                "aria-labelledby": u.triggerId,
                "data-orientation": c.orientation
            }, d, l), {
                ref: n,
                style: (0, r._)({
                    "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
                    "--radix-accordion-content-width": "var(--radix-collapsible-content-width)"
                }, e.style)
            }))
        }, "AccordionContent"));

    function nj(e) {
        return e ? "open" : "closed"
    }
    e3(nj, "getState");
    var nR = e.i(975157);

    function nx(e) {
        var n = e.eventKey,
            t = e.className,
            l = e.children,
            c = (0, i._)(e, ["eventKey", "className", "children"]);
        return (0, a.jsx)(nw, (0, o._)((0, r._)({
            value: n,
            className: (0, nR.cn)("pw-accordion-item", t),
            "data-event-key": n
        }, c), {
            children: l
        }))
    }

    function nO(e) {
        e.as;
        var n = e.className,
            t = e.children,
            l = e.triggerClassName,
            c = e.triggerStyle,
            u = (0, i._)(e, ["as", "className", "children", "triggerClassName", "triggerStyle"]);
        return (0, a.jsx)(nC, {
            asChild: !0,
            children: (0, a.jsx)("div", (0, o._)((0, r._)({
                className: (0, nR.cn)("pw-accordion-header", n)
            }, u), {
                children: (0, a.jsx)(nA, {
                    className: (0, nR.cn)("pw-accordion-button", l),
                    style: c,
                    children: t
                })
            }))
        })
    }

    function nP(e) {
        var n = e.className,
            t = e.children,
            l = (0, i._)(e, ["className", "children"]);
        return (0, a.jsx)(nS, {
            className: "pw-accordion-collapse",
            children: (0, a.jsx)("div", (0, o._)((0, r._)({
                className: (0, nR.cn)("pw-accordion-body", n)
            }, l), {
                children: t
            }))
        })
    }
    var nI = Object.assign(function(e) {
        var n = e.defaultActiveKey,
            t = e.activeKey,
            r = e.alwaysOpen,
            o = e.onSelect,
            i = e.flush,
            l = e.className,
            c = e.id,
            u = e.children,
            d = (0, nR.cn)("pw-accordion", i && "pw-accordion-flush", l);
        if (void 0 !== r && r) {
            var f = null != n ? Array.isArray(n) ? n : [n] : [],
                s = void 0 !== t ? Array.isArray(t) ? t : [t] : void 0;
            return (0, a.jsx)(no, {
                type: "multiple",
                defaultValue: void 0 === s ? f : void 0,
                value: s,
                onValueChange: function(e) {
                    var n;
                    return null == o ? void 0 : o(null != (n = e[e.length - 1]) ? n : null)
                },
                className: d,
                id: c,
                children: u
            })
        }
        var p = null != n ? Array.isArray(n) ? n[0] : n : "",
            v = void 0 !== t ? Array.isArray(t) ? t[0] : t : void 0;
        return (0, a.jsx)(no, {
            type: "single",
            collapsible: !0,
            defaultValue: void 0 === v ? p : void 0,
            value: v,
            onValueChange: function(e) {
                return null == o ? void 0 : o(e || null)
            },
            className: d,
            id: c,
            children: u
        })
    }, {
        Item: nx,
        Header: nO,
        Body: nP
    });
    e.s(["Accordion", 0, nI, "AccordionBody", 0, nP, "AccordionHeader", 0, nO, "AccordionItem", 0, nx], 348845)
}]);