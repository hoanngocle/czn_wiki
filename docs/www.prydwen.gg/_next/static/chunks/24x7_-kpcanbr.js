(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 142102, e => {
    "use strict";
    var n, t, r, o, i = e.i(843476),
        a = e.i(480388),
        l = e.i(181788),
        u = e.i(499092),
        c = e.i(317608),
        f = e.i(271645),
        s = Object.defineProperty,
        d = function(e, n) {
            return s(e, "name", {
                value: n,
                configurable: !0
            })
        },
        p = !!("u" > typeof window && window.document && window.document.createElement);

    function v(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = t.checkForDefaultPrevented,
            o = void 0 === r || r;
        return d(function(t) {
            if (null == e || e(t), !1 === o || !t || !t.defaultPrevented) return null == n ? void 0 : n(t)
        }, "handleEvent")
    }

    function h(e) {
        var n;
        if (!p) throw Error("Cannot access document outside of the DOM");
        return null != (n = null == e ? void 0 : e.ownerDocument) ? n : document
    }

    function m(e) {
        return "IFRAME" === e.tagName
    }
    d(v, "composeEventHandlers"), d(function(e) {
        var n, t;
        if (!p) throw Error("Cannot access window outside of the DOM");
        return null != (n = null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ? n : window
    }, "getOwnerWindow"), d(h, "getOwnerDocument"), d(function e(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = h(n).activeElement;
        if (!(null == r ? void 0 : r.nodeName)) return null;
        if (m(r) && r.contentDocument) return e(r.contentDocument.body, t);
        if (t) {
            var o = r.getAttribute("aria-activedescendant");
            if (o) {
                var i = h(r).getElementById(o);
                if (i) return i
            }
        }
        return r
    }, "getActiveElement"), d(m, "isFrame");
    var g = e.i(855111),
        y = Object.defineProperty,
        _ = function(e, n) {
            return y(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function b(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function w() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = b(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : b(n[e], null)
                }
            }
        }
    }

    function x() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return f.useCallback(w.apply(void 0, (0, g._)(n)), n)
    }
    _(b, "setRef"), _(w, "composeRefs"), _(x, "useComposedRefs");
    var P = e.i(30030),
        E = e.i(726330),
        C = e.i(303536),
        S = e.i(765491),
        R = e.i(610772),
        O = e.i(540151),
        j = e.i(524906),
        D = e.i(953760),
        A = e.i(174080),
        T = "u" > typeof document ? f.useLayoutEffect : function() {};

    function k(e, n) {
        if (e === n) return !0;
        if ((void 0 === e ? "undefined" : (0, j._)(e)) !== (void 0 === n ? "undefined" : (0, j._)(n))) return !1;
        if ("function" == typeof e && e.toString() === n.toString()) return !0;
        if (e && n && (void 0 === e ? "undefined" : (0, j._)(e)) === "object") {
            if (Array.isArray(e)) {
                if ((t = e.length) !== n.length) return !1;
                for (r = t; 0 != r--;)
                    if (!k(e[r], n[r])) return !1;
                return !0
            }
            if ((t = (o = Object.keys(e)).length) !== Object.keys(n).length) return !1;
            for (r = t; 0 != r--;)
                if (!({}).hasOwnProperty.call(n, o[r])) return !1;
            for (r = t; 0 != r--;) {
                var t, r, o, i = o[r];
                if (("_owner" !== i || !e.$$typeof) && !k(e[i], n[i])) return !1
            }
            return !0
        }
        return e != e && n != n
    }

    function F(e) {
        return "u" < typeof window ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
    }

    function I(e, n) {
        var t = F(e);
        return Math.round(n * t) / t
    }

    function M(e) {
        var n = f.useRef(e);
        return T(function() {
            n.current = e
        }), n
    }
    var L = function(e, n) {
            var t = (0, D.offset)(e);
            return {
                name: t.name,
                fn: t.fn,
                options: [e, n]
            }
        },
        N = function(e, n) {
            var t = (0, D.shift)(e);
            return {
                name: t.name,
                fn: t.fn,
                options: [e, n]
            }
        },
        W = function(e, n) {
            var t = (0, D.flip)(e);
            return {
                name: t.name,
                fn: t.fn,
                options: [e, n]
            }
        },
        V = function(e, n) {
            var t = (0, D.size)(e);
            return {
                name: t.name,
                fn: t.fn,
                options: [e, n]
            }
        },
        z = function(e, n) {
            var t = (0, D.hide)(e);
            return {
                name: t.name,
                fn: t.fn,
                options: [e, n]
            }
        },
        $ = function(e, n) {
            var t = "arrow",
                r = function(n) {
                    var t = "function" == typeof e ? e(n) : e,
                        r = t.element,
                        o = t.padding;
                    return r && ({}).hasOwnProperty.call(r, "current") ? null != r.current ? (0, D.arrow)({
                        element: r.current,
                        padding: o
                    }).fn(n) : {} : r ? (0, D.arrow)({
                        element: r,
                        padding: o
                    }).fn(n) : {}
                };
            return {
                name: t,
                fn: r,
                options: [e, n]
            }
        },
        H = Object.defineProperty,
        B = function(e, n) {
            return H(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function K(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function U() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = K(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : K(n[e], null)
                }
            }
        }
    }

    function Z() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return f.useCallback(U.apply(void 0, (0, g._)(n)), n)
    }
    B(K, "setRef"), B(U, "composeRefs"), B(Z, "useComposedRefs");
    var X = Object.defineProperty,
        Y = function(e, n) {
            return X(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function G(e) {
        var n = f.forwardRef(function(n, t) {
            var r, o = n.children,
                i = (0, u._)(n, ["children"]),
                a = null,
                l = !1,
                c = [];
            er(o) && "function" == typeof el && (o = el(o._payload)), f.Children.forEach(o, function(e) {
                if (en(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    er(t) && "function" == typeof el && (t = el(t._payload)), a = J(e, t), c.push(null == a || null == (n = a.props) ? void 0 : n.children)
                } else c.push(e)
            }), a ? a = f.cloneElement(a, void 0, c) : !l && 1 === f.Children.count(o) && f.isValidElement(o) && (a = o);
            var s = a ? ee(a) : void 0,
                d = Z(t, s);
            if (!a) {
                if (o || 0 === o) throw Error(l ? ea(e) : ei(e));
                return o
            }
            var p = Q(i, null != (r = a.props) ? r : {});
            return a.type !== f.Fragment && (p.ref = t ? d : s), f.cloneElement(a, p)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    Y(G, "createSlot");
    var q = Symbol.for("radix.slottable");
    Y(function(e) {
        var n = Y(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = q, n
    }, "createSlottable");
    var J = Y(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return f.isValidElement(t) ? f.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return f.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function Q(e, n) {
        var t = (0, a._)({}, n);
        for (var r in n) ! function(r) {
            var o = e[r],
                i = n[r];
            /^on[A-Z]/.test(r) ? o && i ? t[r] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = i.apply(void 0, (0, g._)(n));
                return o.apply(void 0, (0, g._)(n)), r
            } : o && (t[r] = o) : "style" === r ? t[r] = (0, a._)({}, o, i) : "className" === r && (t[r] = [o, i].filter(Boolean).join(" "))
        }(r);
        return (0, a._)({}, e, t)
    }

    function ee(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function en(e) {
        return f.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === q
    }
    Y(Q, "mergeProps"), Y(ee, "getElementRef"), Y(en, "isSlottable");
    var et = Symbol.for("react.lazy");

    function er(e) {
        return null != e && (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && "$$typeof" in e && e.$$typeof === et && "_payload" in e && eo(e._payload)
    }

    function eo(e) {
        return (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && null !== e && "then" in e
    }
    Y(er, "isLazyComponent"), Y(eo, "isPromiseLike");
    var ei = Y(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        ea = Y(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        el = f[" use ".trim().toString()],
        eu = Object.defineProperty,
        ec = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = G("Primitive.".concat(n)),
                r = f.forwardRef(function(e, r) {
                    var o = e.asChild,
                        c = (0, u._)(e, ["asChild"]),
                        f = o ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, i.jsx)(f, (0, l._)((0, a._)({}, c), {
                        ref: r
                    }))
                });
            return r.displayName = "Primitive.".concat(n), (0, l._)((0, a._)({}, e), (0, O._)({}, n, r))
        }, {});
    eu(function(e, n) {
        e && A.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var ef = Object.defineProperty,
        es = f.forwardRef(ef(function(e, n) {
            var t = e.children,
                r = e.width,
                o = e.height,
                c = (0, u._)(e, ["children", "width", "height"]);
            return (0, i.jsx)(ec.svg, (0, l._)((0, a._)({}, c), {
                ref: n,
                width: void 0 === r ? 10 : r,
                height: void 0 === o ? 5 : o,
                viewBox: "0 0 30 10",
                preserveAspectRatio: "none",
                children: e.asChild ? t : (0, i.jsx)("polygon", {
                    points: "0,0 30,0 15,10"
                })
            }))
        }, "name", {
            value: "Arrow",
            configurable: !0
        })),
        ed = Object.defineProperty,
        ep = function(e, n) {
            return ed(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function ev(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function eh() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = ev(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : ev(n[e], null)
                }
            }
        }
    }

    function em() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return f.useCallback(eh.apply(void 0, (0, g._)(n)), n)
    }
    ep(ev, "setRef"), ep(eh, "composeRefs"), ep(em, "useComposedRefs");
    var eg = Object.defineProperty,
        ey = function(e, n) {
            return eg(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function e_(e) {
        var n = f.forwardRef(function(n, t) {
            var r, o = n.children,
                i = (0, u._)(n, ["children"]),
                a = null,
                l = !1,
                c = [];
            eS(o) && "function" == typeof eD && (o = eD(o._payload)), f.Children.forEach(o, function(e) {
                if (eE(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    eS(t) && "function" == typeof eD && (t = eD(t._payload)), a = ew(e, t), c.push(null == a || null == (n = a.props) ? void 0 : n.children)
                } else c.push(e)
            }), a ? a = f.cloneElement(a, void 0, c) : !l && 1 === f.Children.count(o) && f.isValidElement(o) && (a = o);
            var s = a ? eP(a) : void 0,
                d = em(t, s);
            if (!a) {
                if (o || 0 === o) throw Error(l ? ej(e) : eO(e));
                return o
            }
            var p = ex(i, null != (r = a.props) ? r : {});
            return a.type !== f.Fragment && (p.ref = t ? d : s), f.cloneElement(a, p)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    ey(e_, "createSlot");
    var eb = Symbol.for("radix.slottable");
    ey(function(e) {
        var n = ey(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = eb, n
    }, "createSlottable");
    var ew = ey(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return f.isValidElement(t) ? f.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return f.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function ex(e, n) {
        var t = (0, a._)({}, n);
        for (var r in n) ! function(r) {
            var o = e[r],
                i = n[r];
            /^on[A-Z]/.test(r) ? o && i ? t[r] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = i.apply(void 0, (0, g._)(n));
                return o.apply(void 0, (0, g._)(n)), r
            } : o && (t[r] = o) : "style" === r ? t[r] = (0, a._)({}, o, i) : "className" === r && (t[r] = [o, i].filter(Boolean).join(" "))
        }(r);
        return (0, a._)({}, e, t)
    }

    function eP(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function eE(e) {
        return f.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === eb
    }
    ey(ex, "mergeProps"), ey(eP, "getElementRef"), ey(eE, "isSlottable");
    var eC = Symbol.for("react.lazy");

    function eS(e) {
        return null != e && (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && "$$typeof" in e && e.$$typeof === eC && "_payload" in e && eR(e._payload)
    }

    function eR(e) {
        return (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && null !== e && "then" in e
    }
    ey(eS, "isLazyComponent"), ey(eR, "isPromiseLike");
    var eO = ey(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        ej = ey(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        eD = f[" use ".trim().toString()],
        eA = Object.defineProperty,
        eT = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = e_("Primitive.".concat(n)),
                r = f.forwardRef(function(e, r) {
                    var o = e.asChild,
                        c = (0, u._)(e, ["asChild"]),
                        f = o ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, i.jsx)(f, (0, l._)((0, a._)({}, c), {
                        ref: r
                    }))
                });
            return r.displayName = "Primitive.".concat(n), (0, l._)((0, a._)({}, e), (0, O._)({}, n, r))
        }, {});
    eA(function(e, n) {
        e && A.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var ek = e.i(30207),
        eF = (null == (n = globalThis) ? void 0 : n.document) ? f.useLayoutEffect : function() {},
        eI = (null == (t = globalThis) ? void 0 : t.document) ? f.useLayoutEffect : function() {};

    function eM(e) {
        var n = (0, c._)(f.useState(void 0), 2),
            t = n[0],
            r = n[1];
        return eI(function() {
            if (e) {
                r({
                    width: e.offsetWidth,
                    height: e.offsetHeight
                });
                var n = new ResizeObserver(function(n) {
                    if (Array.isArray(n) && n.length) {
                        var t, o, i = n[0];
                        if ("borderBoxSize" in i) {
                            var a = i.borderBoxSize,
                                l = Array.isArray(a) ? a[0] : a;
                            t = l.inlineSize, o = l.blockSize
                        } else t = e.offsetWidth, o = e.offsetHeight;
                        r({
                            width: t,
                            height: o
                        })
                    }
                });
                return n.observe(e, {
                        box: "border-box"
                    }),
                    function() {
                        return n.unobserve(e)
                    }
            }
            r(void 0)
        }, [e]), t
    }(0, Object.defineProperty)(eM, "name", {
        value: "useSize",
        configurable: !0
    });
    var eL = Object.defineProperty,
        eN = function(e, n) {
            return eL(e, "name", {
                value: n,
                configurable: !0
            })
        },
        eW = "Popper",
        eV = (0, c._)((0, P.createContextScope)(eW), 2),
        ez = eV[0],
        e$ = eV[1],
        eH = (0, c._)(ez(eW), 2),
        eB = eH[0],
        eK = eH[1],
        eU = eN(function(e) {
            var n = e.__scopePopper,
                t = e.children,
                r = (0, c._)(f.useState(null), 2),
                o = r[0],
                a = r[1],
                l = (0, c._)(f.useState(void 0), 2),
                u = l[0],
                s = l[1];
            return (0, i.jsx)(eB, {
                scope: n,
                anchor: o,
                onAnchorChange: a,
                placementState: u,
                setPlacementState: s,
                children: t
            })
        }, "Popper"),
        eZ = f.forwardRef(eN(function(e, n) {
            var t = e.__scopePopper,
                r = e.virtualRef,
                o = (0, u._)(e, ["__scopePopper", "virtualRef"]),
                c = eK("PopperAnchor", t),
                s = f.useRef(null),
                d = c.onAnchorChange,
                p = em(n, f.useCallback(function(e) {
                    s.current = e, e && d(e)
                }, [d])),
                v = f.useRef(null);
            f.useEffect(function() {
                if (r) {
                    var e = v.current;
                    v.current = r.current, e !== v.current && d(v.current)
                }
            });
            var h = c.placementState && e2(c.placementState),
                m = null == h ? void 0 : h[0],
                g = null == h ? void 0 : h[1];
            return r ? null : (0, i.jsx)(eT.div, (0, l._)((0, a._)({
                "data-radix-popper-side": m,
                "data-radix-popper-align": g
            }, o), {
                ref: p
            }))
        }, "PopperAnchor")),
        eX = "PopperContent",
        eY = (0, c._)(ez(eX), 2),
        eG = eY[0],
        eq = eY[1],
        eJ = f.forwardRef(eN(function(e, n) {
            var t, r, o, s, d, p, v, h, m, y, _, b, w, x, P, E, C, S, R, O, j, H, B, K, U, Z, X, Y, G, q, J, Q, ee, en, et, er, eo, ei, ea, el, eu, ec, ef, es, ed, ep, ev, eh, eg, ey, e_, eb, ew, ex = e.__scopePopper,
                eP = e.side,
                eE = e.sideOffset,
                eC = e.align,
                eS = void 0 === eC ? "center" : eC,
                eR = e.alignOffset,
                eO = e.arrowPadding,
                ej = e.avoidCollisions,
                eD = void 0 === ej || ej,
                eA = e.collisionBoundary,
                eI = void 0 === eA ? [] : eA,
                eL = e.collisionPadding,
                eW = void 0 === eL ? 0 : eL,
                eV = e.sticky,
                ez = e.hideWhenDetached,
                e$ = e.updatePositionStrategy,
                eH = void 0 === e$ ? "optimized" : e$,
                eB = e.onPlaced,
                eU = (0, u._)(e, ["__scopePopper", "side", "sideOffset", "align", "alignOffset", "arrowPadding", "avoidCollisions", "collisionBoundary", "collisionPadding", "sticky", "hideWhenDetached", "updatePositionStrategy", "onPlaced"]),
                eZ = eK(eX, ex),
                eY = (0, c._)(f.useState(null), 2),
                eq = eY[0],
                eJ = em(n, eY[1]),
                eQ = (0, c._)(f.useState(null), 2),
                e3 = eQ[0],
                e5 = eQ[1],
                e6 = eM(e3),
                e4 = null != (ed = null == e6 ? void 0 : e6.width) ? ed : 0,
                e7 = null != (ep = null == e6 ? void 0 : e6.height) ? ep : 0,
                e8 = "number" == typeof eW ? eW : (0, a._)({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }, eW),
                e9 = Array.isArray(eI) ? eI : [eI],
                ne = e9.length > 0,
                nn = {
                    padding: e8,
                    boundary: e9.filter(e0),
                    altBoundary: ne
                },
                nt = (o = void 0 === (r = (t = {
                    strategy: "fixed",
                    placement: (void 0 === eP ? "bottom" : eP) + ("center" !== eS ? "-" + eS : ""),
                    whileElementsMounted: eN(function() {
                        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                        return D.autoUpdate.apply(void 0, (0, g._)(n).concat([{
                            animationFrame: "always" === eH
                        }]))
                    }, "whileElementsMounted"),
                    elements: {
                        reference: eZ.anchor
                    },
                    middleware: [L({
                        mainAxis: (void 0 === eE ? 0 : eE) + e7,
                        alignmentAxis: void 0 === eR ? 0 : eR
                    }), eD && N((0, a._)({
                        mainAxis: !0,
                        crossAxis: !1,
                        limiter: "partial" === (void 0 === eV ? "partial" : eV) ? {
                            fn: (0, D.limitShift)(void 0).fn,
                            options: [void 0, void 0]
                        } : void 0
                    }, nn)), eD && W((0, a._)({}, nn)), V((0, l._)((0, a._)({}, nn), {
                        apply: eN(function(e) {
                            var n = e.elements,
                                t = e.rects,
                                r = e.availableWidth,
                                o = e.availableHeight,
                                i = t.reference,
                                a = i.width,
                                l = i.height,
                                u = n.floating.style;
                            u.setProperty("--radix-popper-available-width", "".concat(r, "px")), u.setProperty("--radix-popper-available-height", "".concat(o, "px")), u.setProperty("--radix-popper-anchor-width", "".concat(a, "px")), u.setProperty("--radix-popper-anchor-height", "".concat(l, "px"))
                        }, "apply")
                    })), e3 && $({
                        element: e3,
                        padding: void 0 === eO ? 0 : eO
                    }), e1({
                        arrowWidth: e4,
                        arrowHeight: e7
                    }), void 0 !== ez && ez && z((0, l._)((0, a._)({
                        strategy: "referenceHidden"
                    }, nn), {
                        boundary: ne ? nn.boundary : void 0
                    }))]
                }).placement) ? "bottom" : r, d = void 0 === (s = t.strategy) ? "absolute" : s, v = void 0 === (p = t.middleware) ? [] : p, h = t.platform, _ = (y = void 0 === (m = t.elements) ? {} : m).reference, b = y.floating, x = void 0 === (w = t.transform) || w, P = t.whileElementsMounted, E = t.open, S = (C = (0, c._)(f.useState({
                    x: 0,
                    y: 0,
                    strategy: d,
                    placement: o,
                    middlewareData: {},
                    isPositioned: !1
                }), 2))[0], R = C[1], j = (O = (0, c._)(f.useState(v), 2))[0], H = O[1], k(j, v) || H(v), K = (B = (0, c._)(f.useState(null), 2))[0], U = B[1], X = (Z = (0, c._)(f.useState(null), 2))[0], Y = Z[1], G = f.useCallback(function(e) {
                    e !== ee.current && (ee.current = e, U(e))
                }, []), q = f.useCallback(function(e) {
                    e !== en.current && (en.current = e, Y(e))
                }, []), J = _ || K, Q = b || X, ee = f.useRef(null), en = f.useRef(null), et = f.useRef(S), er = null != P, eo = M(P), ei = M(h), ea = M(E), el = f.useCallback(function() {
                    if (ee.current && en.current) {
                        var e = {
                            placement: o,
                            strategy: d,
                            middleware: j
                        };
                        ei.current && (e.platform = ei.current), (0, D.computePosition)(ee.current, en.current, e).then(function(e) {
                            var n = (0, l._)((0, a._)({}, e), {
                                isPositioned: !1 !== ea.current
                            });
                            eu.current && !k(et.current, n) && (et.current = n, A.flushSync(function() {
                                R(n)
                            }))
                        })
                    }
                }, [j, o, d, ei, ea]), T(function() {
                    !1 === E && et.current.isPositioned && (et.current.isPositioned = !1, R(function(e) {
                        return (0, l._)((0, a._)({}, e), {
                            isPositioned: !1
                        })
                    }))
                }, [E]), eu = f.useRef(!1), T(function() {
                    return eu.current = !0,
                        function() {
                            eu.current = !1
                        }
                }, []), T(function() {
                    if (J && (ee.current = J), Q && (en.current = Q), J && Q) {
                        if (eo.current) return eo.current(J, Q, el);
                        el()
                    }
                }, [J, Q, el, eo, er]), ec = f.useMemo(function() {
                    return {
                        reference: ee,
                        floating: en,
                        setReference: G,
                        setFloating: q
                    }
                }, [G, q]), ef = f.useMemo(function() {
                    return {
                        reference: J,
                        floating: Q
                    }
                }, [J, Q]), es = f.useMemo(function() {
                    var e = {
                        position: d,
                        left: 0,
                        top: 0
                    };
                    if (!ef.floating) return e;
                    var n = I(ef.floating, S.x),
                        t = I(ef.floating, S.y);
                    return x ? (0, a._)((0, l._)((0, a._)({}, e), {
                        transform: "translate(" + n + "px, " + t + "px)"
                    }), F(ef.floating) >= 1.5 && {
                        willChange: "transform"
                    }) : {
                        position: d,
                        left: n,
                        top: t
                    }
                }, [d, x, ef.floating, S.x, S.y]), f.useMemo(function() {
                    return (0, l._)((0, a._)({}, S), {
                        update: el,
                        refs: ec,
                        elements: ef,
                        floatingStyles: es
                    })
                }, [S, el, ec, ef, es])),
                nr = nt.refs,
                no = nt.floatingStyles,
                ni = nt.placement,
                na = nt.isPositioned,
                nl = nt.middlewareData,
                nu = eZ.setPlacementState;
            eF(function() {
                return nu(ni),
                    function() {
                        nu(void 0)
                    }
            }, [ni, nu]);
            var nc = (0, c._)(e2(ni), 2),
                nf = nc[0],
                ns = nc[1],
                nd = (0, ek.useCallbackRef)(eB);
            eF(function() {
                na && (null == nd || nd())
            }, [na, nd]);
            var np = null == (ev = nl.arrow) ? void 0 : ev.x,
                nv = null == (eh = nl.arrow) ? void 0 : eh.y,
                nh = (null == (eg = nl.arrow) ? void 0 : eg.centerOffset) !== 0,
                nm = (0, c._)(f.useState(), 2),
                ng = nm[0],
                ny = nm[1];
            return eF(function() {
                eq && ny(window.getComputedStyle(eq).zIndex)
            }, [eq]), (0, i.jsx)("div", {
                ref: nr.setFloating,
                "data-radix-popper-content-wrapper": "",
                style: (0, a._)((0, l._)((0, a._)({}, no), {
                    transform: na ? no.transform : "translate(0, -200%)",
                    minWidth: "max-content",
                    zIndex: ng,
                    "--radix-popper-transform-origin": [null == (ey = nl.transformOrigin) ? void 0 : ey.x, null == (e_ = nl.transformOrigin) ? void 0 : e_.y].join(" ")
                }), (null == (eb = nl.hide) ? void 0 : eb.referenceHidden) && {
                    visibility: "hidden",
                    pointerEvents: "none"
                }),
                dir: e.dir,
                children: (0, i.jsx)(eG, {
                    scope: ex,
                    placedSide: nf,
                    placedAlign: ns,
                    onArrowChange: e5,
                    arrowX: np,
                    arrowY: nv,
                    shouldHideArrow: nh,
                    children: (0, i.jsx)(eT.div, (0, l._)((0, a._)({
                        "data-side": nf,
                        "data-align": ns
                    }, eU), {
                        ref: eJ,
                        style: (0, l._)((0, a._)({}, eU.style), {
                            animation: na ? null == (ew = eU.style) ? void 0 : ew.animation : "none"
                        })
                    }))
                })
            })
        }, "PopperContent")),
        eQ = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right"
        };

    function e0(e) {
        return null !== e
    }
    eN(e0, "isNotNull");
    var e1 = eN(function(e) {
        return {
            name: "transformOrigin",
            options: e,
            fn: function(n) {
                var t, r, o, i, a, l = n.placement,
                    u = n.rects,
                    f = n.middlewareData,
                    s = (null == (o = f.arrow) ? void 0 : o.centerOffset) !== 0,
                    d = s ? 0 : e.arrowWidth,
                    p = s ? 0 : e.arrowHeight,
                    v = (0, c._)(e2(l), 2),
                    h = v[0],
                    m = {
                        start: "0%",
                        center: "50%",
                        end: "100%"
                    }[v[1]],
                    g = (null != (t = null == (i = f.arrow) ? void 0 : i.x) ? t : 0) + d / 2,
                    y = (null != (r = null == (a = f.arrow) ? void 0 : a.y) ? r : 0) + p / 2,
                    _ = "",
                    b = "";
                return "bottom" === h ? (_ = s ? m : "".concat(g, "px"), b = "".concat(-p, "px")) : "top" === h ? (_ = s ? m : "".concat(g, "px"), b = "".concat(u.floating.height + p, "px")) : "right" === h ? (_ = "".concat(-p, "px"), b = s ? m : "".concat(y, "px")) : "left" === h && (_ = "".concat(u.floating.width + p, "px"), b = s ? m : "".concat(y, "px")), {
                    data: {
                        x: _,
                        y: b
                    }
                }
            }
        }
    }, "transformOrigin");

    function e2(e) {
        var n = (0, c._)(e.split("-"), 2),
            t = n[0],
            r = n[1];
        return [t, void 0 === r ? "center" : r]
    }
    eN(e2, "getSideAndAlignFromPlacement");
    var e3 = e.i(774606),
        e5 = e.i(296626),
        e6 = Object.defineProperty,
        e4 = function(e, n) {
            return e6(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function e7(e) {
        var n = f.forwardRef(function(n, t) {
            var r, o = n.children,
                i = (0, u._)(n, ["children"]),
                a = null,
                l = !1,
                c = [];
            no(o) && "function" == typeof nu && (o = nu(o._payload)), f.Children.forEach(o, function(e) {
                if (nt(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    no(t) && "function" == typeof nu && (t = nu(t._payload)), a = e9(e, t), c.push(null == a || null == (n = a.props) ? void 0 : n.children)
                } else c.push(e)
            }), a ? a = f.cloneElement(a, void 0, c) : !l && 1 === f.Children.count(o) && f.isValidElement(o) && (a = o);
            var s = a ? nn(a) : void 0,
                d = x(t, s);
            if (!a) {
                if (o || 0 === o) throw Error(l ? nl(e) : na(e));
                return o
            }
            var p = ne(i, null != (r = a.props) ? r : {});
            return a.type !== f.Fragment && (p.ref = t ? d : s), f.cloneElement(a, p)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    e4(e7, "createSlot");
    var e8 = Symbol.for("radix.slottable");
    e4(function(e) {
        var n = e4(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = e8, n
    }, "createSlottable");
    var e9 = e4(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return f.isValidElement(t) ? f.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return f.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function ne(e, n) {
        var t = (0, a._)({}, n);
        for (var r in n) ! function(r) {
            var o = e[r],
                i = n[r];
            /^on[A-Z]/.test(r) ? o && i ? t[r] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = i.apply(void 0, (0, g._)(n));
                return o.apply(void 0, (0, g._)(n)), r
            } : o && (t[r] = o) : "style" === r ? t[r] = (0, a._)({}, o, i) : "className" === r && (t[r] = [o, i].filter(Boolean).join(" "))
        }(r);
        return (0, a._)({}, e, t)
    }

    function nn(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function nt(e) {
        return f.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === e8
    }
    e4(ne, "mergeProps"), e4(nn, "getElementRef"), e4(nt, "isSlottable");
    var nr = Symbol.for("react.lazy");

    function no(e) {
        return null != e && (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && "$$typeof" in e && e.$$typeof === nr && "_payload" in e && ni(e._payload)
    }

    function ni(e) {
        return (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && null !== e && "then" in e
    }
    e4(no, "isLazyComponent"), e4(ni, "isPromiseLike");
    var na = e4(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        nl = e4(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        nu = f[" use ".trim().toString()],
        nc = Object.defineProperty,
        nf = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = e7("Primitive.".concat(n)),
                r = f.forwardRef(function(e, r) {
                    var o = e.asChild,
                        c = (0, u._)(e, ["asChild"]),
                        f = o ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, i.jsx)(f, (0, l._)((0, a._)({}, c), {
                        ref: r
                    }))
                });
            return r.displayName = "Primitive.".concat(n), (0, l._)((0, a._)({}, e), (0, O._)({}, n, r))
        }, {});
    nc(function(e, n) {
        e && A.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var ns = (null == (r = globalThis) ? void 0 : r.document) ? f.useLayoutEffect : function() {},
        nd = Object.defineProperty,
        np = f[" useEffectEvent ".trim().toString()],
        nv = f[" useInsertionEffect ".trim().toString()];

    function nh(e) {
        if ("function" == typeof np) return np(e);
        var n = f.useRef(function() {
            throw Error("Cannot call an event handler while rendering.")
        });
        return "function" == typeof nv ? nv(function() {
            n.current = e
        }) : ns(function() {
            n.current = e
        }), f.useMemo(function() {
            return function() {
                for (var e, t = arguments.length, r = Array(t), o = 0; o < t; o++) r[o] = arguments[o];
                return null == (e = n.current) ? void 0 : e.call.apply(e, [n].concat((0, g._)(r)))
            }
        }, [])
    }
    nd(nh, "name", {
        value: "useEffectEvent",
        configurable: !0
    });
    var nm = Object.defineProperty,
        ng = function(e, n) {
            return nm(e, "name", {
                value: n,
                configurable: !0
            })
        },
        ny = f[" useInsertionEffect ".trim().toString()] || ns;

    function n_(e) {
        var n = e.prop,
            t = e.defaultProp,
            r = e.onChange,
            o = void 0 === r ? ng(function() {}, "onChange") : r,
            i = (e.caller, (0, c._)(nb({
                defaultProp: t,
                onChange: o
            }), 3)),
            a = i[0],
            l = i[1],
            u = i[2],
            s = void 0 !== n,
            d = s ? n : a;
        return [d, f.useCallback(function(e) {
            if (s) {
                var t, r = nw(e) ? e(n) : e;
                r !== n && (null == (t = u.current) || t.call(u, r))
            } else l(e)
        }, [s, n, l, u])]
    }

    function nb(e) {
        var n = e.defaultProp,
            t = e.onChange,
            r = (0, c._)(f.useState(n), 2),
            o = r[0],
            i = r[1],
            a = f.useRef(o),
            l = f.useRef(t);
        return ny(function() {
            l.current = t
        }, [t]), f.useEffect(function() {
            if (a.current !== o) {
                var e;
                null == (e = l.current) || e.call(l, o), a.current = o
            }
        }, [o, a]), [o, i, l]
    }

    function nw(e) {
        return "function" == typeof e
    }
    ng(n_, "useControllableState"), ng(nb, "useUncontrolledState"), ng(nw, "isFunction");
    var nx = Symbol("RADIX:SYNC_STATE");
    ng(function(e, n, t, r) {
        var o = n.prop,
            i = n.defaultProp,
            u = n.onChange,
            s = (n.caller, void 0 !== o),
            d = nh(u),
            p = [(0, l._)((0, a._)({}, t), {
                state: i
            })];
        r && p.push(r);
        var v = (0, c._)(f.useReducer.apply(f, [function(n, t) {
                if (t.type === nx) return (0, l._)((0, a._)({}, n), {
                    state: t.state
                });
                var r = e(n, t);
                return s && !Object.is(r.state, n.state) && d(r.state), r
            }].concat((0, g._)(p))), 2),
            h = v[0],
            m = v[1],
            y = h.state,
            _ = f.useRef(y);
        f.useEffect(function() {
            _.current !== y && (_.current = y, s || d(y))
        }, [y, _, s]);
        var b = f.useMemo(function() {
            return void 0 !== o ? (0, l._)((0, a._)({}, h), {
                state: o
            }) : h
        }, [h, o]);
        return f.useEffect(function() {
            s && !Object.is(o, h.state) && m({
                type: nx,
                state: o
            })
        }, [o, h.state, s]), [b, m]
    }, "useControllableStateReducer");
    var nP = e.i(186312),
        nE = e.i(985369),
        nC = Object.defineProperty,
        nS = function(e, n) {
            return nC(e, "name", {
                value: n,
                configurable: !0
            })
        },
        nR = "Popover",
        nO = (0, c._)((0, P.createContextScope)(nR, [e$]), 2),
        nj = nO[0];
    nO[1];
    var nD = e$(),
        nA = (0, c._)(nj(nR), 2),
        nT = nA[0],
        nk = nA[1],
        nF = nS(function(e) {
            var n = e.__scopePopover,
                t = e.children,
                r = e.open,
                o = e.defaultOpen,
                u = e.onOpenChange,
                s = e.modal,
                d = nD(n),
                p = f.useRef(null),
                v = (0, c._)(f.useState(!1), 2),
                h = v[0],
                m = v[1],
                g = (0, c._)(n_({
                    prop: r,
                    defaultProp: null != o && o,
                    onChange: u,
                    caller: nR
                }), 2),
                y = g[0],
                _ = g[1];
            return (0, i.jsx)(eU, (0, l._)((0, a._)({}, d), {
                children: (0, i.jsx)(nT, {
                    scope: n,
                    contentId: (0, R.useId)(),
                    triggerRef: p,
                    open: y,
                    onOpenChange: _,
                    onOpenToggle: f.useCallback(function() {
                        return _(function(e) {
                            return !e
                        })
                    }, [_]),
                    hasCustomAnchor: h,
                    onCustomAnchorAdd: f.useCallback(function() {
                        return m(!0)
                    }, []),
                    onCustomAnchorRemove: f.useCallback(function() {
                        return m(!1)
                    }, []),
                    modal: void 0 !== s && s,
                    children: t
                })
            }))
        }, "Popover"),
        nI = f.forwardRef(nS(function(e, n) {
            var t = e.__scopePopover,
                r = (0, u._)(e, ["__scopePopover"]),
                o = nk("PopoverTrigger", t),
                c = nD(t),
                f = x(n, o.triggerRef),
                s = (0, i.jsx)(nf.button, (0, l._)((0, a._)({
                    type: "button",
                    "aria-haspopup": "dialog",
                    "aria-expanded": o.open,
                    "aria-controls": o.open ? o.contentId : void 0,
                    "data-state": nZ(o.open)
                }, r), {
                    ref: f,
                    onClick: v(e.onClick, o.onOpenToggle)
                }));
            return o.hasCustomAnchor ? s : (0, i.jsx)(eZ, (0, l._)((0, a._)({
                asChild: !0
            }, c), {
                children: s
            }))
        }, "PopoverTrigger")),
        nM = "PopoverPortal",
        nL = (0, c._)(nj(nM, {
            forceMount: void 0
        }), 2),
        nN = nL[0],
        nW = nL[1],
        nV = nS(function(e) {
            var n = e.__scopePopover,
                t = e.forceMount,
                r = e.children,
                o = e.container,
                a = nk(nM, n);
            return (0, i.jsx)(nN, {
                scope: n,
                forceMount: t,
                children: (0, i.jsx)(e5.Presence, {
                    present: t || a.open,
                    children: (0, i.jsx)(e3.Portal, {
                        asChild: !0,
                        container: o,
                        children: r
                    })
                })
            })
        }, "PopoverPortal"),
        nz = "PopoverContent",
        n$ = f.forwardRef(nS(function(e, n) {
            var t = nW(nz, e.__scopePopover),
                r = e.forceMount,
                o = void 0 === r ? t.forceMount : r,
                c = (0, u._)(e, ["forceMount"]),
                f = nk(nz, e.__scopePopover);
            return (0, i.jsx)(e5.Presence, {
                present: o || f.open,
                children: f.modal ? (0, i.jsx)(nB, (0, l._)((0, a._)({}, c), {
                    ref: n
                })) : (0, i.jsx)(nK, (0, l._)((0, a._)({}, c), {
                    ref: n
                }))
            })
        }, "PopoverContent")),
        nH = e7("PopoverContent.RemoveScroll"),
        nB = f.forwardRef(nS(function(e, n) {
            var t = nk(nz, e.__scopePopover),
                r = f.useRef(null),
                o = x(n, r),
                u = f.useRef(!1);
            return f.useEffect(function() {
                var e = r.current;
                if (e) return (0, nP.hideOthers)(e)
            }, []), (0, i.jsx)(nE.RemoveScroll, {
                as: nH,
                allowPinchZoom: !0,
                children: (0, i.jsx)(nU, (0, l._)((0, a._)({}, e), {
                    ref: o,
                    trapFocus: t.open,
                    disableOutsidePointerEvents: !0,
                    onCloseAutoFocus: v(e.onCloseAutoFocus, function(e) {
                        var n;
                        e.preventDefault(), u.current || null == (n = t.triggerRef.current) || n.focus()
                    }),
                    onPointerDownOutside: v(e.onPointerDownOutside, function(e) {
                        var n = e.detail.originalEvent,
                            t = 0 === n.button && !0 === n.ctrlKey;
                        u.current = 2 === n.button || t
                    }, {
                        checkForDefaultPrevented: !1
                    }),
                    onFocusOutside: v(e.onFocusOutside, function(e) {
                        return e.preventDefault()
                    }, {
                        checkForDefaultPrevented: !1
                    })
                }))
            })
        }, "PopoverContentModal")),
        nK = f.forwardRef(nS(function(e, n) {
            var t = nk(nz, e.__scopePopover),
                r = f.useRef(!1),
                o = f.useRef(!1);
            return (0, i.jsx)(nU, (0, l._)((0, a._)({}, e), {
                ref: n,
                trapFocus: !1,
                disableOutsidePointerEvents: !1,
                onCloseAutoFocus: function(n) {
                    var i, a;
                    null == (i = e.onCloseAutoFocus) || i.call(e, n), n.defaultPrevented || (r.current || null == (a = t.triggerRef.current) || a.focus(), n.preventDefault()), r.current = !1, o.current = !1
                },
                onInteractOutside: function(n) {
                    null == (i = e.onInteractOutside) || i.call(e, n), n.defaultPrevented || (r.current = !0, "pointerdown" === n.detail.originalEvent.type && (o.current = !0));
                    var i, a, l = n.target;
                    (null == (a = t.triggerRef.current) ? void 0 : a.contains(l)) && n.preventDefault(), "focusin" === n.detail.originalEvent.type && o.current && n.preventDefault()
                }
            }))
        }, "PopoverContentNonModal")),
        nU = f.forwardRef(nS(function(e, n) {
            var t = e.__scopePopover,
                r = e.trapFocus,
                o = e.onOpenAutoFocus,
                c = e.onCloseAutoFocus,
                f = e.disableOutsidePointerEvents,
                s = e.onEscapeKeyDown,
                d = e.onPointerDownOutside,
                p = e.onFocusOutside,
                v = e.onInteractOutside,
                h = (0, u._)(e, ["__scopePopover", "trapFocus", "onOpenAutoFocus", "onCloseAutoFocus", "disableOutsidePointerEvents", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside"]),
                m = nk(nz, t),
                g = nD(t);
            return (0, C.useFocusGuards)(), (0, i.jsx)(S.FocusScope, {
                asChild: !0,
                loop: !0,
                trapped: r,
                onMountAutoFocus: o,
                onUnmountAutoFocus: c,
                children: (0, i.jsx)(E.DismissableLayer, {
                    asChild: !0,
                    disableOutsidePointerEvents: f,
                    onInteractOutside: v,
                    onEscapeKeyDown: s,
                    onPointerDownOutside: d,
                    onFocusOutside: p,
                    onDismiss: function() {
                        return m.onOpenChange(!1)
                    },
                    deferPointerDownOutside: !0,
                    children: (0, i.jsx)(eJ, (0, l._)((0, a._)({
                        "data-state": nZ(m.open),
                        role: "dialog",
                        id: m.contentId
                    }, g, h), {
                        ref: n,
                        style: (0, a._)({}, h.style, {
                            "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                            "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                            "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                            "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                            "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                        })
                    }))
                })
            })
        }, "PopoverContentImpl"));

    function nZ(e) {
        return e ? "open" : "closed"
    }
    nS(nZ, "getState");
    var nX = e.i(511938),
        nY = Object.defineProperty,
        nG = function(e, n) {
            return nY(e, "name", {
                value: n,
                configurable: !0
            })
        },
        nq = !!("u" > typeof window && window.document && window.document.createElement);

    function nJ(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = t.checkForDefaultPrevented,
            o = void 0 === r || r;
        return nG(function(t) {
            if (null == e || e(t), !1 === o || !t || !t.defaultPrevented) return null == n ? void 0 : n(t)
        }, "handleEvent")
    }

    function nQ(e) {
        var n;
        if (!nq) throw Error("Cannot access document outside of the DOM");
        return null != (n = null == e ? void 0 : e.ownerDocument) ? n : document
    }

    function n0(e) {
        return "IFRAME" === e.tagName
    }
    nG(nJ, "composeEventHandlers"), nG(function(e) {
        var n, t;
        if (!nq) throw Error("Cannot access window outside of the DOM");
        return null != (n = null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ? n : window
    }, "getOwnerWindow"), nG(nQ, "getOwnerDocument"), nG(function e(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = nQ(n).activeElement;
        if (!(null == r ? void 0 : r.nodeName)) return null;
        if (n0(r) && r.contentDocument) return e(r.contentDocument.body, t);
        if (t) {
            var o = r.getAttribute("aria-activedescendant");
            if (o) {
                var i = nQ(r).getElementById(o);
                if (i) return i
            }
        }
        return r
    }, "getActiveElement"), nG(n0, "isFrame");
    var n1 = Object.defineProperty,
        n2 = function(e, n) {
            return n1(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function n3(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function n5() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = n3(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : n3(n[e], null)
                }
            }
        }
    }

    function n6() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return f.useCallback(n5.apply(void 0, (0, g._)(n)), n)
    }
    n2(n3, "setRef"), n2(n5, "composeRefs"), n2(n6, "useComposedRefs");
    var n4 = Object.defineProperty,
        n7 = function(e, n) {
            return n4(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function n8(e) {
        var n = f.forwardRef(function(n, t) {
            var r, o = n.children,
                i = (0, u._)(n, ["children"]),
                a = null,
                l = !1,
                c = [];
            ta(o) && "function" == typeof tf && (o = tf(o._payload)), f.Children.forEach(o, function(e) {
                if (to(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    ta(t) && "function" == typeof tf && (t = tf(t._payload)), a = tn(e, t), c.push(null == a || null == (n = a.props) ? void 0 : n.children)
                } else c.push(e)
            }), a ? a = f.cloneElement(a, void 0, c) : !l && 1 === f.Children.count(o) && f.isValidElement(o) && (a = o);
            var s = a ? tr(a) : void 0,
                d = n6(t, s);
            if (!a) {
                if (o || 0 === o) throw Error(l ? tc(e) : tu(e));
                return o
            }
            var p = tt(i, null != (r = a.props) ? r : {});
            return a.type !== f.Fragment && (p.ref = t ? d : s), f.cloneElement(a, p)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    n7(n8, "createSlot");
    var n9 = Symbol.for("radix.slottable");

    function te(e) {
        var n = n7(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = n9, n
    }
    n7(te, "createSlottable");
    var tn = n7(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return f.isValidElement(t) ? f.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return f.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function tt(e, n) {
        var t = (0, a._)({}, n);
        for (var r in n) ! function(r) {
            var o = e[r],
                i = n[r];
            /^on[A-Z]/.test(r) ? o && i ? t[r] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = i.apply(void 0, (0, g._)(n));
                return o.apply(void 0, (0, g._)(n)), r
            } : o && (t[r] = o) : "style" === r ? t[r] = (0, a._)({}, o, i) : "className" === r && (t[r] = [o, i].filter(Boolean).join(" "))
        }(r);
        return (0, a._)({}, e, t)
    }

    function tr(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function to(e) {
        return f.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === n9
    }
    n7(tt, "mergeProps"), n7(tr, "getElementRef"), n7(to, "isSlottable");
    var ti = Symbol.for("react.lazy");

    function ta(e) {
        return null != e && (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && "$$typeof" in e && e.$$typeof === ti && "_payload" in e && tl(e._payload)
    }

    function tl(e) {
        return (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && null !== e && "then" in e
    }
    n7(ta, "isLazyComponent"), n7(tl, "isPromiseLike");
    var tu = n7(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        tc = n7(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        tf = f[" use ".trim().toString()],
        ts = Object.defineProperty,
        td = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = n8("Primitive.".concat(n)),
                r = f.forwardRef(function(e, r) {
                    var o = e.asChild,
                        c = (0, u._)(e, ["asChild"]),
                        f = o ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, i.jsx)(f, (0, l._)((0, a._)({}, c), {
                        ref: r
                    }))
                });
            return r.displayName = "Primitive.".concat(n), (0, l._)((0, a._)({}, e), (0, O._)({}, n, r))
        }, {});
    ts(function(e, n) {
        e && A.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var tp = (null == (o = globalThis) ? void 0 : o.document) ? f.useLayoutEffect : function() {},
        tv = Object.defineProperty,
        th = f[" useEffectEvent ".trim().toString()],
        tm = f[" useInsertionEffect ".trim().toString()];

    function tg(e) {
        if ("function" == typeof th) return th(e);
        var n = f.useRef(function() {
            throw Error("Cannot call an event handler while rendering.")
        });
        return "function" == typeof tm ? tm(function() {
            n.current = e
        }) : tp(function() {
            n.current = e
        }), f.useMemo(function() {
            return function() {
                for (var e, t = arguments.length, r = Array(t), o = 0; o < t; o++) r[o] = arguments[o];
                return null == (e = n.current) ? void 0 : e.call.apply(e, [n].concat((0, g._)(r)))
            }
        }, [])
    }
    tv(tg, "name", {
        value: "useEffectEvent",
        configurable: !0
    });
    var ty = Object.defineProperty,
        t_ = function(e, n) {
            return ty(e, "name", {
                value: n,
                configurable: !0
            })
        },
        tb = f[" useInsertionEffect ".trim().toString()] || tp;

    function tw(e) {
        var n = e.prop,
            t = e.defaultProp,
            r = e.onChange,
            o = void 0 === r ? t_(function() {}, "onChange") : r,
            i = (e.caller, (0, c._)(tx({
                defaultProp: t,
                onChange: o
            }), 3)),
            a = i[0],
            l = i[1],
            u = i[2],
            s = void 0 !== n,
            d = s ? n : a;
        return [d, f.useCallback(function(e) {
            if (s) {
                var t, r = tP(e) ? e(n) : e;
                r !== n && (null == (t = u.current) || t.call(u, r))
            } else l(e)
        }, [s, n, l, u])]
    }

    function tx(e) {
        var n = e.defaultProp,
            t = e.onChange,
            r = (0, c._)(f.useState(n), 2),
            o = r[0],
            i = r[1],
            a = f.useRef(o),
            l = f.useRef(t);
        return tb(function() {
            l.current = t
        }, [t]), f.useEffect(function() {
            if (a.current !== o) {
                var e;
                null == (e = l.current) || e.call(l, o), a.current = o
            }
        }, [o, a]), [o, i, l]
    }

    function tP(e) {
        return "function" == typeof e
    }
    t_(tw, "useControllableState"), t_(tx, "useUncontrolledState"), t_(tP, "isFunction");
    var tE = Symbol("RADIX:SYNC_STATE");
    t_(function(e, n, t, r) {
        var o = n.prop,
            i = n.defaultProp,
            u = n.onChange,
            s = (n.caller, void 0 !== o),
            d = tg(u),
            p = [(0, l._)((0, a._)({}, t), {
                state: i
            })];
        r && p.push(r);
        var v = (0, c._)(f.useReducer.apply(f, [function(n, t) {
                if (t.type === tE) return (0, l._)((0, a._)({}, n), {
                    state: t.state
                });
                var r = e(n, t);
                return s && !Object.is(r.state, n.state) && d(r.state), r
            }].concat((0, g._)(p))), 2),
            h = v[0],
            m = v[1],
            y = h.state,
            _ = f.useRef(y);
        f.useEffect(function() {
            _.current !== y && (_.current = y, s || d(y))
        }, [y, _, s]);
        var b = f.useMemo(function() {
            return void 0 !== o ? (0, l._)((0, a._)({}, h), {
                state: o
            }) : h
        }, [h, o]);
        return f.useEffect(function() {
            s && !Object.is(o, h.state) && m({
                type: tE,
                state: o
            })
        }, [o, h.state, s]), [b, m]
    }, "useControllableStateReducer");
    var tC = Object.defineProperty,
        tS = function(e, n) {
            return tC(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function tR(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function tO() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = tR(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : tR(n[e], null)
                }
            }
        }
    }

    function tj() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return f.useCallback(tO.apply(void 0, (0, g._)(n)), n)
    }
    tS(tR, "setRef"), tS(tO, "composeRefs"), tS(tj, "useComposedRefs");
    var tD = Object.defineProperty,
        tA = function(e, n) {
            return tD(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function tT(e) {
        var n = f.forwardRef(function(n, t) {
            var r, o = n.children,
                i = (0, u._)(n, ["children"]),
                a = null,
                l = !1,
                c = [];
            tW(o) && "function" == typeof tH && (o = tH(o._payload)), f.Children.forEach(o, function(e) {
                if (tL(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    tW(t) && "function" == typeof tH && (t = tH(t._payload)), a = tF(e, t), c.push(null == a || null == (n = a.props) ? void 0 : n.children)
                } else c.push(e)
            }), a ? a = f.cloneElement(a, void 0, c) : !l && 1 === f.Children.count(o) && f.isValidElement(o) && (a = o);
            var s = a ? tM(a) : void 0,
                d = tj(t, s);
            if (!a) {
                if (o || 0 === o) throw Error(l ? t$(e) : tz(e));
                return o
            }
            var p = tI(i, null != (r = a.props) ? r : {});
            return a.type !== f.Fragment && (p.ref = t ? d : s), f.cloneElement(a, p)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    tA(tT, "createSlot");
    var tk = Symbol.for("radix.slottable");
    tA(function(e) {
        var n = tA(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = tk, n
    }, "createSlottable");
    var tF = tA(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return f.isValidElement(t) ? f.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return f.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function tI(e, n) {
        var t = (0, a._)({}, n);
        for (var r in n) ! function(r) {
            var o = e[r],
                i = n[r];
            /^on[A-Z]/.test(r) ? o && i ? t[r] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = i.apply(void 0, (0, g._)(n));
                return o.apply(void 0, (0, g._)(n)), r
            } : o && (t[r] = o) : "style" === r ? t[r] = (0, a._)({}, o, i) : "className" === r && (t[r] = [o, i].filter(Boolean).join(" "))
        }(r);
        return (0, a._)({}, e, t)
    }

    function tM(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function tL(e) {
        return f.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === tk
    }
    tA(tI, "mergeProps"), tA(tM, "getElementRef"), tA(tL, "isSlottable");
    var tN = Symbol.for("react.lazy");

    function tW(e) {
        return null != e && (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && "$$typeof" in e && e.$$typeof === tN && "_payload" in e && tV(e._payload)
    }

    function tV(e) {
        return (void 0 === e ? "undefined" : (0, j._)(e)) === "object" && null !== e && "then" in e
    }
    tA(tW, "isLazyComponent"), tA(tV, "isPromiseLike");
    var tz = tA(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        t$ = tA(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        tH = f[" use ".trim().toString()],
        tB = Object.defineProperty,
        tK = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = tT("Primitive.".concat(n)),
                r = f.forwardRef(function(e, r) {
                    var o = e.asChild,
                        c = (0, u._)(e, ["asChild"]),
                        f = o ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, i.jsx)(f, (0, l._)((0, a._)({}, c), {
                        ref: r
                    }))
                });
            return r.displayName = "Primitive.".concat(n), (0, l._)((0, a._)({}, e), (0, O._)({}, n, r))
        }, {});
    tB(function(e, n) {
        e && A.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var tU = Object.defineProperty,
        tZ = Object.freeze({
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal"
        }),
        tX = f.forwardRef(tU(function(e, n) {
            return (0, i.jsx)(tK.span, (0, l._)((0, a._)({}, e), {
                ref: n,
                style: (0, a._)({}, tZ, e.style)
            }))
        }, "name", {
            value: "VisuallyHidden",
            configurable: !0
        })),
        tY = Object.defineProperty,
        tG = function(e, n) {
            return tY(e, "name", {
                value: n,
                configurable: !0
            })
        },
        tq = (0, c._)((0, P.createContextScope)("Tooltip", [e$]), 2),
        tJ = tq[0];
    tq[1];
    var tQ = e$(),
        t0 = "tooltip.open",
        t1 = (0, c._)(tJ("TooltipProvider"), 2),
        t2 = t1[0],
        t3 = t1[1],
        t5 = tG(function(e) {
            var n = e.__scopeTooltip,
                t = e.delayDuration,
                r = e.skipDelayDuration,
                o = void 0 === r ? 300 : r,
                a = e.disableHoverableContent,
                l = e.children,
                u = f.useRef(!0),
                c = f.useRef(!1),
                s = f.useRef(0);
            return f.useEffect(function() {
                var e = s.current;
                return function() {
                    return window.clearTimeout(e)
                }
            }, []), (0, i.jsx)(t2, {
                scope: n,
                isOpenDelayedRef: u,
                delayDuration: void 0 === t ? 700 : t,
                onOpen: f.useCallback(function() {
                    o <= 0 || (window.clearTimeout(s.current), u.current = !1)
                }, [o]),
                onClose: f.useCallback(function() {
                    o <= 0 || (window.clearTimeout(s.current), s.current = window.setTimeout(function() {
                        return u.current = !0
                    }, o))
                }, [o]),
                isPointerInTransitRef: c,
                onPointerInTransitChange: f.useCallback(function(e) {
                    c.current = e
                }, []),
                disableHoverableContent: void 0 !== a && a,
                children: l
            })
        }, "TooltipProvider"),
        t6 = "Tooltip",
        t4 = (0, c._)(tJ(t6), 2),
        t7 = t4[0],
        t8 = t4[1],
        t9 = tG(function(e) {
            var n = e.__scopeTooltip,
                t = e.children,
                r = e.open,
                o = e.defaultOpen,
                u = e.onOpenChange,
                s = e.disableHoverableContent,
                d = e.delayDuration,
                p = t3(t6, e.__scopeTooltip),
                v = tQ(n),
                h = (0, c._)(f.useState(null), 2),
                m = h[0],
                g = h[1],
                y = (0, c._)(f.useState(void 0), 2),
                _ = y[0],
                b = y[1],
                w = (0, R.useId)(),
                x = f.useRef(0),
                P = null != s ? s : p.disableHoverableContent,
                E = null != d ? d : p.delayDuration,
                C = f.useRef(!1),
                S = (0, c._)(tw({
                    prop: r,
                    defaultProp: null != o && o,
                    onChange: tG(function(e) {
                        e ? (p.onOpen(), document.dispatchEvent(new CustomEvent(t0))) : p.onClose(), null == u || u(e)
                    }, "onChange"),
                    caller: t6
                }), 2),
                O = S[0],
                j = S[1],
                D = f.useMemo(function() {
                    return O ? C.current ? "delayed-open" : "instant-open" : "closed"
                }, [O]),
                A = f.useCallback(function() {
                    window.clearTimeout(x.current), x.current = 0, C.current = !1, j(!0)
                }, [j]),
                T = f.useCallback(function() {
                    window.clearTimeout(x.current), x.current = 0, j(!1)
                }, [j]),
                k = f.useCallback(function() {
                    window.clearTimeout(x.current), x.current = window.setTimeout(function() {
                        C.current = !0, j(!0), x.current = 0
                    }, E)
                }, [E, j]);
            return f.useEffect(function() {
                return function() {
                    x.current && (window.clearTimeout(x.current), x.current = 0)
                }
            }, []), (0, i.jsx)(eU, (0, l._)((0, a._)({}, v), {
                children: (0, i.jsx)(t7, {
                    scope: n,
                    contentId: null != _ ? _ : w,
                    setContentId: b,
                    open: O,
                    stateAttribute: D,
                    trigger: m,
                    onTriggerChange: g,
                    onTriggerEnter: f.useCallback(function() {
                        p.isOpenDelayedRef.current ? k() : A()
                    }, [p.isOpenDelayedRef, k, A]),
                    onTriggerLeave: f.useCallback(function() {
                        P ? T() : (window.clearTimeout(x.current), x.current = 0)
                    }, [T, P]),
                    onOpen: A,
                    onClose: T,
                    disableHoverableContent: P,
                    children: t
                })
            }))
        }, "Tooltip"),
        re = "TooltipTrigger",
        rn = f.forwardRef(tG(function(e, n) {
            var t = e.__scopeTooltip,
                r = (0, u._)(e, ["__scopeTooltip"]),
                o = t8(re, t),
                c = t3(re, t),
                s = tQ(t),
                d = n6(n, f.useRef(null), o.onTriggerChange),
                p = f.useRef(!1),
                v = f.useRef(!1),
                h = f.useCallback(function() {
                    return p.current = !1
                }, []);
            return f.useEffect(function() {
                return function() {
                    return document.removeEventListener("pointerup", h)
                }
            }, [h]), (0, i.jsx)(eZ, (0, l._)((0, a._)({
                asChild: !0
            }, s), {
                children: (0, i.jsx)(td.button, (0, l._)((0, a._)({
                    "aria-describedby": o.open ? o.contentId : void 0,
                    "data-state": o.stateAttribute
                }, r), {
                    ref: d,
                    onPointerMove: nJ(e.onPointerMove, function(e) {
                        "touch" !== e.pointerType && (v.current || c.isPointerInTransitRef.current || (o.onTriggerEnter(), v.current = !0))
                    }),
                    onPointerLeave: nJ(e.onPointerLeave, function() {
                        o.onTriggerLeave(), v.current = !1
                    }),
                    onPointerDown: nJ(e.onPointerDown, function() {
                        o.open && o.onClose(), p.current = !0, document.addEventListener("pointerup", h, {
                            once: !0
                        })
                    }),
                    onFocus: nJ(e.onFocus, function() {
                        p.current || o.onOpen()
                    }),
                    onBlur: nJ(e.onBlur, o.onClose),
                    onClick: nJ(e.onClick, o.onClose)
                }))
            }))
        }, "TooltipTrigger")),
        rt = "TooltipPortal",
        rr = (0, c._)(tJ(rt, {
            forceMount: void 0
        }), 2),
        ro = rr[0],
        ri = rr[1],
        ra = tG(function(e) {
            var n = e.__scopeTooltip,
                t = e.forceMount,
                r = e.children,
                o = e.container,
                a = t8(rt, n);
            return (0, i.jsx)(ro, {
                scope: n,
                forceMount: t,
                children: (0, i.jsx)(e5.Presence, {
                    present: t || a.open,
                    children: (0, i.jsx)(e3.Portal, {
                        asChild: !0,
                        container: o,
                        children: r
                    })
                })
            })
        }, "TooltipPortal"),
        rl = "TooltipContent",
        ru = f.forwardRef(tG(function(e, n) {
            var t = ri(rl, e.__scopeTooltip),
                r = e.forceMount,
                o = void 0 === r ? t.forceMount : r,
                c = e.side,
                f = void 0 === c ? "top" : c,
                s = (0, u._)(e, ["forceMount", "side"]),
                d = t8(rl, e.__scopeTooltip);
            return (0, i.jsx)(e5.Presence, {
                present: o || d.open,
                children: d.disableHoverableContent ? (0, i.jsx)(rs, (0, l._)((0, a._)({
                    side: f
                }, s), {
                    ref: n
                })) : (0, i.jsx)(rc, (0, l._)((0, a._)({
                    side: f
                }, s), {
                    ref: n
                }))
            })
        }, "TooltipContent")),
        rc = f.forwardRef(tG(function(e, n) {
            var t = t8(rl, e.__scopeTooltip),
                r = t3(rl, e.__scopeTooltip),
                o = f.useRef(null),
                u = n6(n, o),
                s = (0, c._)(f.useState(null), 2),
                d = s[0],
                p = s[1],
                v = t.trigger,
                h = t.onClose,
                m = o.current,
                y = r.onPointerInTransitChange,
                _ = f.useCallback(function() {
                    p(null), y(!1)
                }, [y]),
                b = f.useCallback(function(e, n) {
                    var t = e.currentTarget,
                        r = {
                            x: e.clientX,
                            y: e.clientY
                        },
                        o = rd(r, t.getBoundingClientRect()),
                        i = rp(r, o),
                        a = rv(n.getBoundingClientRect());
                    p(rm((0, g._)(i).concat((0, g._)(a)))), y(!0)
                }, [y]);
            return f.useEffect(function() {
                return function() {
                    return _()
                }
            }, [_]), f.useEffect(function() {
                if (v && m) {
                    var e = tG(function(e) {
                            return b(e, m)
                        }, "handleTriggerLeave"),
                        n = tG(function(e) {
                            return b(e, v)
                        }, "handleContentLeave");
                    return v.addEventListener("pointerleave", e), m.addEventListener("pointerleave", n),
                        function() {
                            v.removeEventListener("pointerleave", e), m.removeEventListener("pointerleave", n)
                        }
                }
            }, [v, m, b, _]), f.useEffect(function() {
                if (d) {
                    var e = tG(function(e) {
                        var n = e.target,
                            t = {
                                x: e.clientX,
                                y: e.clientY
                            },
                            r = (null == v ? void 0 : v.contains(n)) || (null == m ? void 0 : m.contains(n)),
                            o = !rh(t, d);
                        r ? _() : o && (_(), h())
                    }, "handleTrackPointerGrace");
                    return document.addEventListener("pointermove", e),
                        function() {
                            return document.removeEventListener("pointermove", e)
                        }
                }
            }, [v, m, d, h, _]), (0, i.jsx)(rs, (0, l._)((0, a._)({}, e), {
                ref: u
            }))
        }, "TooltipContentHoverable")),
        rf = te("TooltipContent"),
        rs = f.forwardRef(tG(function(e, n) {
            var t = e.__scopeTooltip,
                r = e.children,
                o = e["aria-label"],
                c = e.id,
                s = e.onEscapeKeyDown,
                d = e.onPointerDownOutside,
                p = (0, u._)(e, ["__scopeTooltip", "children", "aria-label", "id", "onEscapeKeyDown", "onPointerDownOutside"]),
                v = t8(rl, t),
                h = tQ(t),
                m = v.onClose;
            f.useEffect(function() {
                return document.addEventListener(t0, m),
                    function() {
                        return document.removeEventListener(t0, m)
                    }
            }, [m]), f.useEffect(function() {
                if (v.trigger) {
                    var e = tG(function(e) {
                        (0, nX._)(e.target, Node) && e.target.contains(v.trigger) && m()
                    }, "handleScroll");
                    return window.addEventListener("scroll", e, {
                            capture: !0
                        }),
                        function() {
                            return window.removeEventListener("scroll", e, {
                                capture: !0
                            })
                        }
                }
            }, [v.trigger, m]);
            var g = v.setContentId;
            return tp(function() {
                return g(c),
                    function() {
                        g(void 0)
                    }
            }, [c, g]), (0, i.jsx)(E.DismissableLayer, {
                asChild: !0,
                disableOutsidePointerEvents: !1,
                onEscapeKeyDown: s,
                onPointerDownOutside: d,
                onFocusOutside: function(e) {
                    return e.preventDefault()
                },
                onDismiss: m,
                children: (0, i.jsxs)(eJ, (0, l._)((0, a._)({
                    "data-state": v.stateAttribute,
                    role: o ? void 0 : "tooltip",
                    id: o ? void 0 : v.contentId
                }, h, p), {
                    ref: n,
                    style: (0, a._)({}, p.style, {
                        "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                        "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                        "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                        "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                        "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
                    }),
                    children: [(0, i.jsx)(rf, {
                        children: r
                    }), o ? (0, i.jsx)(tX, {
                        id: v.contentId,
                        role: "tooltip",
                        children: o
                    }) : null]
                }))
            })
        }, "TooltipContentImpl"));

    function rd(e, n) {
        var t = Math.abs(n.top - e.y),
            r = Math.abs(n.bottom - e.y),
            o = Math.abs(n.right - e.x),
            i = Math.abs(n.left - e.x);
        switch (Math.min(t, r, o, i)) {
            case i:
                return "left";
            case o:
                return "right";
            case t:
                return "top";
            case r:
                return "bottom";
            default:
                throw Error("unreachable")
        }
    }

    function rp(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5,
            r = [];
        switch (n) {
            case "top":
                r.push({
                    x: e.x - t,
                    y: e.y + t
                }, {
                    x: e.x + t,
                    y: e.y + t
                });
                break;
            case "bottom":
                r.push({
                    x: e.x - t,
                    y: e.y - t
                }, {
                    x: e.x + t,
                    y: e.y - t
                });
                break;
            case "left":
                r.push({
                    x: e.x + t,
                    y: e.y - t
                }, {
                    x: e.x + t,
                    y: e.y + t
                });
                break;
            case "right":
                r.push({
                    x: e.x - t,
                    y: e.y - t
                }, {
                    x: e.x - t,
                    y: e.y + t
                })
        }
        return r
    }

    function rv(e) {
        var n = e.top,
            t = e.right,
            r = e.bottom,
            o = e.left;
        return [{
            x: o,
            y: n
        }, {
            x: t,
            y: n
        }, {
            x: t,
            y: r
        }, {
            x: o,
            y: r
        }]
    }

    function rh(e, n) {
        for (var t = e.x, r = e.y, o = !1, i = 0, a = n.length - 1; i < n.length; a = i++) {
            var l = n[i],
                u = n[a],
                c = l.x,
                f = l.y,
                s = u.x,
                d = u.y;
            f > r != d > r && t < (s - c) * (r - f) / (d - f) + c && (o = !o)
        }
        return o
    }

    function rm(e) {
        var n = e.slice();
        return n.sort(function(e, n) {
            return e.x < n.x ? -1 : e.x > n.x ? 1 : e.y < n.y ? -1 : 1 * !!(e.y > n.y)
        }), rg(n)
    }

    function rg(e) {
        if (e.length <= 1) return e.slice();
        for (var n = [], t = 0; t < e.length; t++) {
            for (var r = e[t]; n.length >= 2;) {
                var o = n[n.length - 1],
                    i = n[n.length - 2];
                if ((o.x - i.x) * (r.y - i.y) >= (o.y - i.y) * (r.x - i.x)) n.pop();
                else break
            }
            n.push(r)
        }
        n.pop();
        for (var a = [], l = e.length - 1; l >= 0; l--) {
            for (var u = e[l]; a.length >= 2;) {
                var c = a[a.length - 1],
                    f = a[a.length - 2];
                if ((c.x - f.x) * (u.y - f.y) >= (c.y - f.y) * (u.x - f.x)) a.pop();
                else break
            }
            a.push(u)
        }
        return (a.pop(), 1 === n.length && 1 === a.length && n[0].x === a[0].x && n[0].y === a[0].y) ? n : n.concat(a)
    }
    tG(rd, "getExitSideFromRect"), tG(rp, "getPaddedExitPoints"), tG(rv, "getPointsFromRect"), tG(rh, "isPointInPolygon"), tG(rm, "getHull"), tG(rg, "getHullPresorted"), e.s(["OverlayTrigger", 0, function(e) {
        var n, t, r, o = e.trigger,
            a = void 0 === o ? "click" : o,
            l = e.placement,
            u = e.overlay,
            c = e.delay,
            f = e.children,
            s = Array.isArray(a) ? a : [a],
            d = "bottom" === (n = void 0 === l ? "top" : l) ? "bottom" : "left" === n || "start" === n ? "left" : "right" === n || "end" === n ? "right" : "top";
        return s.includes("hover") && !s.includes("click") ? (0, i.jsx)(t5, {
            delayDuration: null != (t = null == c ? void 0 : c.show) ? t : 300,
            skipDelayDuration: null != (r = null == c ? void 0 : c.hide) ? r : 100,
            children: (0, i.jsxs)(t9, {
                children: [(0, i.jsx)(rn, {
                    asChild: !0,
                    children: f
                }), (0, i.jsx)(ra, {
                    children: (0, i.jsx)(ru, {
                        side: d,
                        sideOffset: 4,
                        className: "z-popover outline-none",
                        children: u
                    })
                })]
            })
        }) : (0, i.jsxs)(nF, {
            children: [(0, i.jsx)(nI, {
                asChild: !0,
                children: f
            }), (0, i.jsx)(nV, {
                children: (0, i.jsx)(n$, {
                    side: d,
                    sideOffset: 4,
                    className: "z-popover outline-none",
                    children: u
                })
            })]
        })
    }], 142102)
}]);