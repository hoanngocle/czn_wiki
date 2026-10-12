(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 726330, e => {
    "use strict";
    var n, t = e.i(511938),
        r = e.i(480388),
        o = e.i(181788),
        i = e.i(499092),
        a = e.i(317608),
        u = e.i(855111),
        c = e.i(271645),
        l = Object.defineProperty,
        s = function(e, n) {
            return l(e, "name", {
                value: n,
                configurable: !0
            })
        },
        d = !!("u" > typeof window && window.document && window.document.createElement);

    function f(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = t.checkForDefaultPrevented,
            o = void 0 === r || r;
        return s(function(t) {
            if (null == e || e(t), !1 === o || !t || !t.defaultPrevented) return null == n ? void 0 : n(t)
        }, "handleEvent")
    }

    function v(e) {
        var n;
        if (!d) throw Error("Cannot access document outside of the DOM");
        return null != (n = null == e ? void 0 : e.ownerDocument) ? n : document
    }

    function p(e) {
        return "IFRAME" === e.tagName
    }
    s(f, "composeEventHandlers"), s(function(e) {
        var n, t;
        if (!d) throw Error("Cannot access window outside of the DOM");
        return null != (n = null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ? n : window
    }, "getOwnerWindow"), s(v, "getOwnerDocument"), s(function e(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = v(n).activeElement;
        if (!(null == r ? void 0 : r.nodeName)) return null;
        if (p(r) && r.contentDocument) return e(r.contentDocument.body, t);
        if (t) {
            var o = r.getAttribute("aria-activedescendant");
            if (o) {
                var i = v(r).getElementById(o);
                if (i) return i
            }
        }
        return r
    }, "getActiveElement"), s(p, "isFrame");
    var m = e.i(540151),
        h = e.i(174080),
        y = e.i(524906),
        b = Object.defineProperty,
        g = function(e, n) {
            return b(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function E(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function w() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = E(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : E(n[e], null)
                }
            }
        }
    }

    function _() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return c.useCallback(w.apply(void 0, (0, u._)(n)), n)
    }
    g(E, "setRef"), g(w, "composeRefs"), g(_, "useComposedRefs");
    var S = Object.defineProperty,
        C = function(e, n) {
            return S(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function R(e) {
        var n = c.forwardRef(function(n, t) {
            var r, o = n.children,
                a = (0, i._)(n, ["children"]),
                u = null,
                l = !1,
                s = [];
            A(o) && "function" == typeof j && (o = j(o._payload)), c.Children.forEach(o, function(e) {
                if (L(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    A(t) && "function" == typeof j && (t = j(t._payload)), u = O(e, t), s.push(null == u || null == (n = u.props) ? void 0 : n.children)
                } else s.push(e)
            }), u ? u = c.cloneElement(u, void 0, s) : !l && 1 === c.Children.count(o) && c.isValidElement(o) && (u = o);
            var d = u ? k(u) : void 0,
                f = _(t, d);
            if (!u) {
                if (o || 0 === o) throw Error(l ? F(e) : T(e));
                return o
            }
            var v = D(a, null != (r = u.props) ? r : {});
            return u.type !== c.Fragment && (v.ref = t ? f : d), c.cloneElement(u, v)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    C(R, "createSlot");
    var P = Symbol.for("radix.slottable");
    C(function(e) {
        var n = C(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = P, n
    }, "createSlottable");
    var O = C(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return c.isValidElement(t) ? c.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return c.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function D(e, n) {
        var t = (0, r._)({}, n);
        for (var o in n) ! function(o) {
            var i = e[o],
                a = n[o];
            /^on[A-Z]/.test(o) ? i && a ? t[o] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = a.apply(void 0, (0, u._)(n));
                return i.apply(void 0, (0, u._)(n)), r
            } : i && (t[o] = i) : "style" === o ? t[o] = (0, r._)({}, i, a) : "className" === o && (t[o] = [i, a].filter(Boolean).join(" "))
        }(o);
        return (0, r._)({}, e, t)
    }

    function k(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function L(e) {
        return c.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === P
    }
    C(D, "mergeProps"), C(k, "getElementRef"), C(L, "isSlottable");
    var x = Symbol.for("react.lazy");

    function A(e) {
        return null != e && (void 0 === e ? "undefined" : (0, y._)(e)) === "object" && "$$typeof" in e && e.$$typeof === x && "_payload" in e && N(e._payload)
    }

    function N(e) {
        return (void 0 === e ? "undefined" : (0, y._)(e)) === "object" && null !== e && "then" in e
    }
    C(A, "isLazyComponent"), C(N, "isPromiseLike");
    var T = C(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        F = C(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        j = c[" use ".trim().toString()],
        M = e.i(843476),
        I = Object.defineProperty,
        W = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = R("Primitive.".concat(n)),
                a = c.forwardRef(function(e, a) {
                    var u = e.asChild,
                        c = (0, i._)(e, ["asChild"]),
                        l = u ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, M.jsx)(l, (0, o._)((0, r._)({}, c), {
                        ref: a
                    }))
                });
            return a.displayName = "Primitive.".concat(n), (0, o._)((0, r._)({}, e), (0, m._)({}, n, a))
        }, {});

    function B(e, n) {
        e && h.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }
    I(B, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var V = e.i(30207),
        K = Object.defineProperty,
        $ = function(e, n) {
            return K(e, "name", {
                value: n,
                configurable: !0
            })
        },
        z = "dismissableLayer.update",
        U = c.createContext({
            layers: new Set,
            layersWithOutsidePointerEventsDisabled: new Set,
            branches: new Set,
            dismissableSurfaces: new Set
        }),
        H = c.forwardRef($(function(e, l) {
            var s, d, v = e.disableOutsidePointerEvents,
                p = void 0 !== v && v,
                m = e.deferPointerDownOutside,
                h = void 0 !== m && m,
                y = e.onEscapeKeyDown,
                b = e.onPointerDownOutside,
                g = e.onFocusOutside,
                E = e.onInteractOutside,
                w = e.onDismiss,
                S = (0, i._)(e, ["disableOutsidePointerEvents", "deferPointerDownOutside", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside", "onDismiss"]),
                C = c.useContext(U),
                R = (0, a._)(c.useState(null), 2),
                P = R[0],
                O = R[1],
                D = null != (s = null == P ? void 0 : P.ownerDocument) ? s : null == (d = globalThis) ? void 0 : d.document,
                k = (0, a._)(c.useState({}), 2)[1],
                L = _(l, O),
                x = Array.from(C.layers),
                A = (0, a._)((0, u._)(C.layersWithOutsidePointerEventsDisabled).slice(-1), 1)[0],
                N = A ? x.indexOf(A) : -1,
                T = P ? x.indexOf(P) : -1,
                F = C.layersWithOutsidePointerEventsDisabled.size > 0,
                j = T >= N,
                I = c.useRef(!1),
                B = Z(function(e) {
                    null == b || b(e), null == E || E(e), e.defaultPrevented || null == w || w()
                }, {
                    ownerDocument: D,
                    deferPointerDownOutside: h,
                    isDeferredPointerDownOutsideRef: I,
                    dismissableSurfaces: C.dismissableSurfaces,
                    shouldHandlePointerDownOutside: c.useCallback(function(e) {
                        if (!(0, t._)(e, Node)) return !1;
                        var n = (0, u._)(C.branches).some(function(n) {
                            return n.contains(e)
                        });
                        return j && !n
                    }, [C.branches, j])
                }),
                K = G(function(e) {
                    if (!h || !I.current) {
                        var n = e.target;
                        !(0, u._)(C.branches).some(function(e) {
                            return e.contains(n)
                        }) && (null == g || g(e), null == E || E(e), e.defaultPrevented || null == w || w())
                    }
                }, D),
                H = !!P && T === x.length - 1,
                X = (0, V.useCallbackRef)(function(e) {
                    "Escape" === e.key && (null == y || y(e), !e.defaultPrevented && w && (e.preventDefault(), w()))
                });
            return c.useEffect(function() {
                if (H) return D.addEventListener("keydown", X, {
                        capture: !0
                    }),
                    function() {
                        return D.removeEventListener("keydown", X, {
                            capture: !0
                        })
                    }
            }, [D, H, X]), c.useEffect(function() {
                if (P) return p && (0 === C.layersWithOutsidePointerEventsDisabled.size && (n = D.body.style.pointerEvents, D.body.style.pointerEvents = "none"), C.layersWithOutsidePointerEventsDisabled.add(P)), C.layers.add(P), q(),
                    function() {
                        p && (C.layersWithOutsidePointerEventsDisabled.delete(P), 0 === C.layersWithOutsidePointerEventsDisabled.size && (D.body.style.pointerEvents = n))
                    }
            }, [P, D, p, C]), c.useEffect(function() {
                return function() {
                    P && (C.layers.delete(P), C.layersWithOutsidePointerEventsDisabled.delete(P), q())
                }
            }, [P, C]), c.useEffect(function() {
                var e = $(function() {
                    return k({})
                }, "handleUpdate");
                return document.addEventListener(z, e),
                    function() {
                        return document.removeEventListener(z, e)
                    }
            }, []), (0, M.jsx)(W.div, (0, o._)((0, r._)({}, S), {
                ref: L,
                style: (0, r._)({
                    pointerEvents: F ? j ? "auto" : "none" : void 0
                }, e.style),
                onFocusCapture: f(e.onFocusCapture, K.onFocusCapture),
                onBlurCapture: f(e.onBlurCapture, K.onBlurCapture),
                onPointerDownCapture: f(e.onPointerDownCapture, B.onPointerDownCapture)
            }))
        }, "DismissableLayer"));

    function X() {
        var e = c.useContext(U),
            n = (0, a._)(c.useState(null), 2),
            t = n[0],
            r = n[1];
        return c.useEffect(function() {
            if (t) return e.dismissableSurfaces.add(t),
                function() {
                    e.dismissableSurfaces.delete(t)
                }
        }, [t, e.dismissableSurfaces]), r
    }
    $(X, "useDismissableLayerSurface");
    var Y = $(function() {
        return !0
    }, "IS_TRUE");

    function Z(e, n) {
        var r, o = n.ownerDocument,
            i = void 0 === o ? null == (r = globalThis) ? void 0 : r.document : o,
            a = n.deferPointerDownOutside,
            l = void 0 !== a && a,
            s = n.isDeferredPointerDownOutsideRef,
            d = n.dismissableSurfaces,
            f = n.shouldHandlePointerDownOutside,
            v = void 0 === f ? Y : f,
            p = (0, V.useCallbackRef)(e),
            m = c.useRef(!1),
            h = c.useRef(!1),
            y = c.useRef(new Map),
            b = c.useRef(function() {});
        return c.useEffect(function() {
            var e = function() {
                    h.current = !1, s.current = !1, y.current.clear()
                },
                n = function() {
                    return Array.from(y.current.values()).some(Boolean)
                },
                r = function(e) {
                    if (h.current) {
                        var n = e.target;
                        (0, t._)(n, Node) && (0, u._)(d).some(function(e) {
                            return e.contains(n)
                        }) || y.current.set(e.type, !0), "click" === e.type && window.setTimeout(function() {
                            h.current && b.current()
                        }, 0)
                    }
                },
                o = function(e) {
                    h.current && y.current.set(e.type, !1)
                };
            $(e, "resetOutsideInteraction"), $(n, "isOutsideInteractionIntercepted"), $(r, "handleInteractionCapture"), $(o, "handleInteractionBubble");
            var a = $(function(t) {
                    if (t.target && !m.current) {
                        var r = function() {
                            i.removeEventListener("click", b.current);
                            var t = n();
                            e(), t || J("dismissableLayer.pointerDownOutside", p, o, {
                                discrete: !0
                            })
                        };
                        if ($(r, "handleAndDispatchPointerDownOutsideEvent"), !v(t.target)) {
                            i.removeEventListener("click", b.current), e(), m.current = !1;
                            return
                        }
                        var o = {
                            originalEvent: t
                        };
                        h.current = !0, s.current = l && 0 === t.button, y.current.clear(), l && 0 === t.button ? (i.removeEventListener("click", b.current), b.current = r, i.addEventListener("click", b.current, {
                            once: !0
                        })) : r()
                    } else i.removeEventListener("click", b.current), e();
                    m.current = !1
                }, "handlePointerDown"),
                c = ["pointerup", "mousedown", "mouseup", "touchstart", "touchend", "click"],
                f = !0,
                g = !1,
                E = void 0;
            try {
                for (var w, _ = c[Symbol.iterator](); !(f = (w = _.next()).done); f = !0) {
                    var S = w.value;
                    i.addEventListener(S, r, !0), i.addEventListener(S, o)
                }
            } catch (e) {
                g = !0, E = e
            } finally {
                try {
                    f || null == _.return || _.return()
                } finally {
                    if (g) throw E
                }
            }
            var C = window.setTimeout(function() {
                i.addEventListener("pointerdown", a)
            }, 0);
            return function() {
                window.clearTimeout(C), i.removeEventListener("pointerdown", a), i.removeEventListener("click", b.current);
                var e = !0,
                    n = !1,
                    t = void 0;
                try {
                    for (var u, l = c[Symbol.iterator](); !(e = (u = l.next()).done); e = !0) {
                        var s = u.value;
                        i.removeEventListener(s, r, !0), i.removeEventListener(s, o)
                    }
                } catch (e) {
                    n = !0, t = e
                } finally {
                    try {
                        e || null == l.return || l.return()
                    } finally {
                        if (n) throw t
                    }
                }
            }
        }, [i, p, l, s, d, v]), {
            onPointerDownCapture: $(function() {
                return m.current = !0
            }, "onPointerDownCapture")
        }
    }

    function G(e) {
        var n, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null == (n = globalThis) ? void 0 : n.document,
            r = (0, V.useCallbackRef)(e),
            o = c.useRef(!1);
        return c.useEffect(function() {
            var e = $(function(e) {
                e.target && !o.current && J("dismissableLayer.focusOutside", r, {
                    originalEvent: e
                }, {
                    discrete: !1
                })
            }, "handleFocus");
            return t.addEventListener("focusin", e),
                function() {
                    return t.removeEventListener("focusin", e)
                }
        }, [t, r]), {
            onFocusCapture: $(function() {
                return o.current = !0
            }, "onFocusCapture"),
            onBlurCapture: $(function() {
                return o.current = !1
            }, "onBlurCapture")
        }
    }

    function q() {
        var e = new CustomEvent(z);
        document.dispatchEvent(e)
    }

    function J(e, n, t, r) {
        var o = r.discrete,
            i = t.originalEvent.target,
            a = new CustomEvent(e, {
                bubbles: !1,
                cancelable: !0,
                detail: t
            });
        n && i.addEventListener(e, n, {
            once: !0
        }), o ? B(i, a) : i.dispatchEvent(a)
    }
    $(Z, "usePointerDownOutside"), $(G, "useFocusOutside"), $(q, "dispatchUpdate"), $(J, "handleAndDispatchCustomEvent"), e.s(["DismissableLayer", 0, H, "useDismissableLayerSurface", 0, X], 726330)
}, 303536, e => {
    "use strict";
    var n = e.i(271645),
        t = Object.defineProperty,
        r = function(e, n) {
            return t(e, "name", {
                value: n,
                configurable: !0
            })
        },
        o = 0,
        i = null;

    function a() {
        n.useEffect(function() {
            i || (i = {
                start: u(),
                end: u()
            });
            var e = i.start,
                n = i.end;
            return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== n && document.body.insertAdjacentElement("beforeend", n), o++,
                function() {
                    1 === o && (null == i || i.start.remove(), null == i || i.end.remove(), i = null), o = Math.max(0, o - 1)
                }
        }, [])
    }

    function u() {
        var e = document.createElement("span");
        return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e
    }
    r(function(e) {
        return a(), e.children
    }, "FocusGuards"), r(a, "useFocusGuards"), r(u, "createFocusGuard"), e.s(["useFocusGuards", 0, a])
}, 765491, 774606, e => {
    "use strict";
    var n, t = e.i(511938),
        r = e.i(480388),
        o = e.i(181788),
        i = e.i(499092),
        a = e.i(317608),
        u = e.i(855111),
        c = e.i(271645),
        l = Object.defineProperty,
        s = function(e, n) {
            return l(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function d(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function f() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = d(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : d(n[e], null)
                }
            }
        }
    }

    function v() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return c.useCallback(f.apply(void 0, (0, u._)(n)), n)
    }
    s(d, "setRef"), s(f, "composeRefs"), s(v, "useComposedRefs");
    var p = e.i(540151),
        m = e.i(174080),
        h = e.i(524906),
        y = Object.defineProperty,
        b = function(e, n) {
            return y(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function g(e) {
        var n = c.forwardRef(function(n, t) {
            var r, o = n.children,
                a = (0, i._)(n, ["children"]),
                u = null,
                l = !1,
                s = [];
            P(o) && "function" == typeof L && (o = L(o._payload)), c.Children.forEach(o, function(e) {
                if (C(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    P(t) && "function" == typeof L && (t = L(t._payload)), u = w(e, t), s.push(null == u || null == (n = u.props) ? void 0 : n.children)
                } else s.push(e)
            }), u ? u = c.cloneElement(u, void 0, s) : !l && 1 === c.Children.count(o) && c.isValidElement(o) && (u = o);
            var d = u ? S(u) : void 0,
                f = v(t, d);
            if (!u) {
                if (o || 0 === o) throw Error(l ? k(e) : D(e));
                return o
            }
            var p = _(a, null != (r = u.props) ? r : {});
            return u.type !== c.Fragment && (p.ref = t ? f : d), c.cloneElement(u, p)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    b(g, "createSlot");
    var E = Symbol.for("radix.slottable");
    b(function(e) {
        var n = b(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = E, n
    }, "createSlottable");
    var w = b(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return c.isValidElement(t) ? c.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return c.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function _(e, n) {
        var t = (0, r._)({}, n);
        for (var o in n) ! function(o) {
            var i = e[o],
                a = n[o];
            /^on[A-Z]/.test(o) ? i && a ? t[o] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = a.apply(void 0, (0, u._)(n));
                return i.apply(void 0, (0, u._)(n)), r
            } : i && (t[o] = i) : "style" === o ? t[o] = (0, r._)({}, i, a) : "className" === o && (t[o] = [i, a].filter(Boolean).join(" "))
        }(o);
        return (0, r._)({}, e, t)
    }

    function S(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function C(e) {
        return c.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === E
    }
    b(_, "mergeProps"), b(S, "getElementRef"), b(C, "isSlottable");
    var R = Symbol.for("react.lazy");

    function P(e) {
        return null != e && (void 0 === e ? "undefined" : (0, h._)(e)) === "object" && "$$typeof" in e && e.$$typeof === R && "_payload" in e && O(e._payload)
    }

    function O(e) {
        return (void 0 === e ? "undefined" : (0, h._)(e)) === "object" && null !== e && "then" in e
    }
    b(P, "isLazyComponent"), b(O, "isPromiseLike");
    var D = b(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        k = b(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        L = c[" use ".trim().toString()],
        x = e.i(843476),
        A = Object.defineProperty,
        N = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = g("Primitive.".concat(n)),
                a = c.forwardRef(function(e, a) {
                    var u = e.asChild,
                        c = (0, i._)(e, ["asChild"]),
                        l = u ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, x.jsx)(l, (0, o._)((0, r._)({}, c), {
                        ref: a
                    }))
                });
            return a.displayName = "Primitive.".concat(n), (0, o._)((0, r._)({}, e), (0, p._)({}, n, a))
        }, {});
    A(function(e, n) {
        e && m.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var T = e.i(30207),
        F = Object.defineProperty,
        j = function(e, n) {
            return F(e, "name", {
                value: n,
                configurable: !0
            })
        },
        M = "focusScope.autoFocusOnMount",
        I = "focusScope.autoFocusOnUnmount",
        W = {
            bubbles: !1,
            cancelable: !0
        },
        B = c.forwardRef(j(function(e, n) {
            var t = e.loop,
                u = void 0 !== t && t,
                l = e.trapped,
                s = void 0 !== l && l,
                d = e.onMountAutoFocus,
                f = e.onUnmountAutoFocus,
                p = (0, i._)(e, ["loop", "trapped", "onMountAutoFocus", "onUnmountAutoFocus"]),
                m = (0, a._)(c.useState(null), 2),
                h = m[0],
                y = m[1],
                b = (0, T.useCallbackRef)(d),
                g = (0, T.useCallbackRef)(f),
                E = c.useRef(null),
                w = v(n, y),
                _ = c.useRef({
                    paused: !1,
                    pause: function() {
                        this.paused = !0
                    },
                    resume: function() {
                        this.paused = !1
                    }
                }).current;
            c.useEffect(function() {
                if (s) {
                    var e = function(e) {
                            if (!_.paused && h) {
                                var n = e.target;
                                h.contains(n) ? E.current = n : X(E.current, {
                                    select: !0
                                })
                            }
                        },
                        n = function(e) {
                            if (!_.paused && h) {
                                var n = e.relatedTarget;
                                null !== n && (h.contains(n) || X(E.current, {
                                    select: !0
                                }))
                            }
                        },
                        t = function(e) {
                            if (document.activeElement === document.body) {
                                var n = !0,
                                    t = !1,
                                    r = void 0;
                                try {
                                    for (var o, i = e[Symbol.iterator](); !(n = (o = i.next()).done); n = !0) o.value.removedNodes.length > 0 && X(h)
                                } catch (e) {
                                    t = !0, r = e
                                } finally {
                                    try {
                                        n || null == i.return || i.return()
                                    } finally {
                                        if (t) throw r
                                    }
                                }
                            }
                        };
                    j(e, "handleFocusIn"), j(n, "handleFocusOut"), j(t, "handleMutations"), document.addEventListener("focusin", e), document.addEventListener("focusout", n);
                    var r = new MutationObserver(t);
                    return h && r.observe(h, {
                            childList: !0,
                            subtree: !0
                        }),
                        function() {
                            document.removeEventListener("focusin", e), document.removeEventListener("focusout", n), r.disconnect()
                        }
                }
            }, [s, h, _.paused]), c.useEffect(function() {
                if (h) {
                    Y.add(_);
                    var e = document.activeElement;
                    if (!h.contains(e)) {
                        var n = new CustomEvent(M, W);
                        h.addEventListener(M, b), h.dispatchEvent(n), n.defaultPrevented || (V(q($(h)), {
                            select: !0
                        }), document.activeElement === e && X(h))
                    }
                    return function() {
                        h.removeEventListener(M, b), setTimeout(function() {
                            var n = new CustomEvent(I, W);
                            h.addEventListener(I, g), h.dispatchEvent(n), n.defaultPrevented || X(null != e ? e : document.body, {
                                select: !0
                            }), h.removeEventListener(I, g), Y.remove(_)
                        }, 0)
                    }
                }
            }, [h, b, g, _]);
            var S = c.useCallback(function(e) {
                if ((u || s) && !_.paused) {
                    var n = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                        t = document.activeElement;
                    if (n && t) {
                        var r = e.currentTarget,
                            o = (0, a._)(K(r), 2),
                            i = o[0],
                            c = o[1];
                        i && c ? e.shiftKey || t !== c ? e.shiftKey && t === i && (e.preventDefault(), u && X(c, {
                            select: !0
                        })) : (e.preventDefault(), u && X(i, {
                            select: !0
                        })) : t === r && e.preventDefault()
                    }
                }
            }, [u, s, _.paused]);
            return (0, x.jsx)(N.div, (0, o._)((0, r._)({
                tabIndex: -1
            }, p), {
                ref: w,
                onKeyDown: S
            }))
        }, "FocusScope"));

    function V(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            t = n.select,
            r = void 0 !== t && t,
            o = document.activeElement,
            i = !0,
            a = !1,
            u = void 0;
        try {
            for (var c, l = e[Symbol.iterator](); !(i = (c = l.next()).done); i = !0) {
                var s = c.value;
                if (X(s, {
                        select: r
                    }), document.activeElement !== o) return
            }
        } catch (e) {
            a = !0, u = e
        } finally {
            try {
                i || null == l.return || l.return()
            } finally {
                if (a) throw u
            }
        }
    }

    function K(e) {
        var n = $(e);
        return [z(n, e), z(n.reverse(), e)]
    }

    function $(e) {
        for (var n = [], t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
                acceptNode: j(function(e) {
                    var n = "INPUT" === e.tagName && "hidden" === e.type;
                    return e.disabled || e.hidden || n ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                }, "acceptNode")
            }); t.nextNode();) n.push(t.currentNode);
        return n
    }

    function z(e, n) {
        var t = "function" == typeof n.checkVisibility && n.checkVisibility({
                checkVisibilityCSS: !0
            }),
            r = !0,
            o = !1,
            i = void 0;
        try {
            for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done); r = !0) {
                var c = a.value;
                if (!(t ? !c.checkVisibility({
                        checkVisibilityCSS: !0
                    }) : U(c, {
                        upTo: n
                    }))) return c
            }
        } catch (e) {
            o = !0, i = e
        } finally {
            try {
                r || null == u.return || u.return()
            } finally {
                if (o) throw i
            }
        }
    }

    function U(e, n) {
        var t = n.upTo;
        if ("hidden" === getComputedStyle(e).visibility) return !0;
        for (; e && (void 0 === t || e !== t);) {
            if ("none" === getComputedStyle(e).display) return !0;
            e = e.parentElement
        }
        return !1
    }

    function H(e) {
        return (0, t._)(e, HTMLInputElement) && "select" in e
    }

    function X(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            t = n.select;
        if (e && e.focus) {
            var r = document.activeElement;
            e.focus({
                preventScroll: !0
            }), e !== r && H(e) && void 0 !== t && t && e.select()
        }
    }
    j(V, "focusFirst"), j(K, "getTabbableEdges"), j($, "getTabbableCandidates"), j(z, "findVisible"), j(U, "isHidden"), j(H, "isSelectableInput"), j(X, "focus");
    var Y = Z();

    function Z() {
        var e = [];
        return {
            add: function(n) {
                var t = e[0];
                n !== t && (null == t || t.pause()), (e = G(e, n)).unshift(n)
            },
            remove: function(n) {
                var t;
                null == (t = (e = G(e, n))[0]) || t.resume()
            }
        }
    }

    function G(e, n) {
        var t = (0, u._)(e),
            r = t.indexOf(n);
        return -1 !== r && t.splice(r, 1), t
    }

    function q(e) {
        return e.filter(function(e) {
            return "A" !== e.tagName
        })
    }
    j(Z, "createFocusScopesStack"), j(G, "arrayRemove"), j(q, "removeLinks"), e.s(["FocusScope", 0, B], 765491);
    var J = Object.defineProperty,
        Q = function(e, n) {
            return J(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function ee(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function en() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = ee(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : ee(n[e], null)
                }
            }
        }
    }

    function et() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return c.useCallback(en.apply(void 0, (0, u._)(n)), n)
    }
    Q(ee, "setRef"), Q(en, "composeRefs"), Q(et, "useComposedRefs");
    var er = Object.defineProperty,
        eo = function(e, n) {
            return er(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function ei(e) {
        var n = c.forwardRef(function(n, t) {
            var r, o = n.children,
                a = (0, i._)(n, ["children"]),
                u = null,
                l = !1,
                s = [];
            ef(o) && "function" == typeof eh && (o = eh(o._payload)), c.Children.forEach(o, function(e) {
                if (es(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    ef(t) && "function" == typeof eh && (t = eh(t._payload)), u = eu(e, t), s.push(null == u || null == (n = u.props) ? void 0 : n.children)
                } else s.push(e)
            }), u ? u = c.cloneElement(u, void 0, s) : !l && 1 === c.Children.count(o) && c.isValidElement(o) && (u = o);
            var d = u ? el(u) : void 0,
                f = et(t, d);
            if (!u) {
                if (o || 0 === o) throw Error(l ? em(e) : ep(e));
                return o
            }
            var v = ec(a, null != (r = u.props) ? r : {});
            return u.type !== c.Fragment && (v.ref = t ? f : d), c.cloneElement(u, v)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    eo(ei, "createSlot");
    var ea = Symbol.for("radix.slottable");
    eo(function(e) {
        var n = eo(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = ea, n
    }, "createSlottable");
    var eu = eo(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return c.isValidElement(t) ? c.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return c.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function ec(e, n) {
        var t = (0, r._)({}, n);
        for (var o in n) ! function(o) {
            var i = e[o],
                a = n[o];
            /^on[A-Z]/.test(o) ? i && a ? t[o] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = a.apply(void 0, (0, u._)(n));
                return i.apply(void 0, (0, u._)(n)), r
            } : i && (t[o] = i) : "style" === o ? t[o] = (0, r._)({}, i, a) : "className" === o && (t[o] = [i, a].filter(Boolean).join(" "))
        }(o);
        return (0, r._)({}, e, t)
    }

    function el(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function es(e) {
        return c.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === ea
    }
    eo(ec, "mergeProps"), eo(el, "getElementRef"), eo(es, "isSlottable");
    var ed = Symbol.for("react.lazy");

    function ef(e) {
        return null != e && (void 0 === e ? "undefined" : (0, h._)(e)) === "object" && "$$typeof" in e && e.$$typeof === ed && "_payload" in e && ev(e._payload)
    }

    function ev(e) {
        return (void 0 === e ? "undefined" : (0, h._)(e)) === "object" && null !== e && "then" in e
    }
    eo(ef, "isLazyComponent"), eo(ev, "isPromiseLike");
    var ep = eo(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        em = eo(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        eh = c[" use ".trim().toString()],
        ey = Object.defineProperty,
        eb = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = ei("Primitive.".concat(n)),
                a = c.forwardRef(function(e, a) {
                    var u = e.asChild,
                        c = (0, i._)(e, ["asChild"]),
                        l = u ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, x.jsx)(l, (0, o._)((0, r._)({}, c), {
                        ref: a
                    }))
                });
            return a.displayName = "Primitive.".concat(n), (0, o._)((0, r._)({}, e), (0, p._)({}, n, a))
        }, {});
    ey(function(e, n) {
        e && m.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var eg = (null == (n = globalThis) ? void 0 : n.document) ? c.useLayoutEffect : function() {},
        eE = Object.defineProperty,
        ew = c.forwardRef(eE(function(e, n) {
            var t, u, l = e.container,
                s = (0, i._)(e, ["container"]),
                d = (0, a._)(c.useState(!1), 2),
                f = d[0],
                v = d[1];
            eg(function() {
                return v(!0)
            }, []);
            var p = l || f && (null == (u = globalThis) || null == (t = u.document) ? void 0 : t.body);
            return p ? m.createPortal((0, x.jsx)(eb.div, (0, o._)((0, r._)({}, s), {
                ref: n
            })), p) : null
        }, "name", {
            value: "Portal",
            configurable: !0
        }));
    e.s(["Portal", 0, ew], 774606)
}, 186312, e => {
    "use strict";
    var n = new WeakMap,
        t = new WeakMap,
        r = {},
        o = 0,
        i = function(e) {
            return e && (e.host || i(e.parentNode))
        },
        a = function(e, a, u, c) {
            var l = (Array.isArray(e) ? e : [e]).map(function(e) {
                if (a.contains(e)) return e;
                var n = i(e);
                return n && a.contains(n) ? n : (console.error("aria-hidden", e, "in not contained inside", a, ". Doing nothing"), null)
            }).filter(function(e) {
                return !!e
            });
            r[u] || (r[u] = new WeakMap);
            var s = r[u],
                d = [],
                f = new Set,
                v = new Set(l),
                p = function(e) {
                    !e || f.has(e) || (f.add(e), p(e.parentNode))
                };
            l.forEach(p);
            var m = function(e) {
                !e || v.has(e) || Array.prototype.forEach.call(e.children, function(e) {
                    if (f.has(e)) m(e);
                    else try {
                        var r = e.getAttribute(c),
                            o = null !== r && "false" !== r,
                            i = (n.get(e) || 0) + 1,
                            a = (s.get(e) || 0) + 1;
                        n.set(e, i), s.set(e, a), d.push(e), 1 === i && o && t.set(e, !0), 1 === a && e.setAttribute(u, "true"), o || e.setAttribute(c, "true")
                    } catch (n) {
                        console.error("aria-hidden: cannot operate on ", e, n)
                    }
                })
            };
            return m(a), f.clear(), o++,
                function() {
                    d.forEach(function(e) {
                        var r = n.get(e) - 1,
                            o = s.get(e) - 1;
                        n.set(e, r), s.set(e, o), r || (t.has(e) || e.removeAttribute(c), t.delete(e)), o || e.removeAttribute(u)
                    }), --o || (n = new WeakMap, n = new WeakMap, t = new WeakMap, r = {})
                }
        };
    e.s(["hideOthers", 0, function(e, n, t) {
        void 0 === t && (t = "data-aria-hidden");
        var r = Array.from(Array.isArray(e) ? e : [e]),
            o = n || ("u" < typeof document ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
        return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), a(r, o, t, "aria-hidden")) : function() {
            return null
        }
    }])
}, 985369, e => {
    "use strict";
    var n, t, r, o, i, a, u, c = e.i(290571),
        l = e.i(271645),
        s = "right-scroll-bar-position",
        d = "width-before-scroll-bar";

    function f(e, n) {
        return "function" == typeof e ? e(n) : e && (e.current = n), e
    }
    var v = "u" > typeof window ? l.useLayoutEffect : l.useEffect,
        p = new WeakMap,
        m = (void 0 === n && (n = {}), (void 0 === t && (t = function(e) {
            return e
        }), r = [], o = !1, i = {
            read: function() {
                if (o) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
                return r.length ? r[r.length - 1] : null
            },
            useMedium: function(e) {
                var n = t(e, o);
                return r.push(n),
                    function() {
                        r = r.filter(function(e) {
                            return e !== n
                        })
                    }
            },
            assignSyncMedium: function(e) {
                for (o = !0; r.length;) {
                    var n = r;
                    r = [], n.forEach(e)
                }
                r = {
                    push: function(n) {
                        return e(n)
                    },
                    filter: function() {
                        return r
                    }
                }
            },
            assignMedium: function(e) {
                o = !0;
                var n = [];
                if (r.length) {
                    var t = r;
                    r = [], t.forEach(e), n = r
                }
                var i = function() {
                        var t = n;
                        n = [], t.forEach(e)
                    },
                    a = function() {
                        return Promise.resolve().then(i)
                    };
                a(), r = {
                    push: function(e) {
                        n.push(e), a()
                    },
                    filter: function(e) {
                        return n = n.filter(e), r
                    }
                }
            }
        }).options = (0, c.__assign)({
            async: !0,
            ssr: !1
        }, n), i),
        h = function() {},
        y = l.forwardRef(function(e, n) {
            var t, r, o, i, a = l.useRef(null),
                u = l.useState({
                    onScrollCapture: h,
                    onWheelCapture: h,
                    onTouchMoveCapture: h
                }),
                s = u[0],
                d = u[1],
                y = e.forwardProps,
                b = e.children,
                g = e.className,
                E = e.removeScrollBar,
                w = e.enabled,
                _ = e.shards,
                S = e.sideCar,
                C = e.noRelative,
                R = e.noIsolation,
                P = e.inert,
                O = e.allowPinchZoom,
                D = e.as,
                k = e.gapMode,
                L = (0, c.__rest)(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]),
                x = (t = [a, n], r = function(e) {
                    return t.forEach(function(n) {
                        return f(n, e)
                    })
                }, (o = (0, l.useState)(function() {
                    return {
                        value: null,
                        callback: r,
                        facade: {
                            get current() {
                                return o.value
                            },
                            set current(value) {
                                var e = o.value;
                                e !== value && (o.value = value, o.callback(value, e))
                            }
                        }
                    }
                })[0]).callback = r, i = o.facade, v(function() {
                    var e = p.get(i);
                    if (e) {
                        var n = new Set(e),
                            r = new Set(t),
                            o = i.current;
                        n.forEach(function(e) {
                            r.has(e) || f(e, null)
                        }), r.forEach(function(e) {
                            n.has(e) || f(e, o)
                        })
                    }
                    p.set(i, t)
                }, [t]), i),
                A = (0, c.__assign)((0, c.__assign)({}, L), s);
            return l.createElement(l.Fragment, null, w && l.createElement(S, {
                sideCar: m,
                removeScrollBar: E,
                shards: _,
                noRelative: C,
                noIsolation: R,
                inert: P,
                setCallbacks: d,
                allowPinchZoom: !!O,
                lockRef: a,
                gapMode: k
            }), y ? l.cloneElement(l.Children.only(b), (0, c.__assign)((0, c.__assign)({}, A), {
                ref: x
            })) : l.createElement(void 0 === D ? "div" : D, (0, c.__assign)({}, A, {
                className: g,
                ref: x
            }), b))
        });
    y.defaultProps = {
        enabled: !0,
        removeScrollBar: !0,
        inert: !1
    }, y.classNames = {
        fullWidth: d,
        zeroRight: s
    };
    var b = function(e) {
        var n = e.sideCar,
            t = (0, c.__rest)(e, ["sideCar"]);
        if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
        var r = n.read();
        if (!r) throw Error("Sidecar medium not found");
        return l.createElement(r, (0, c.__assign)({}, t))
    };
    b.isSideCarExport = !0;
    var g = e.i(511938),
        E = function() {
            var e = 0,
                n = null;
            return {
                add: function(t) {
                    if (0 == e && (n = function() {
                            if (!document) return null;
                            var e = document.createElement("style");
                            e.type = "text/css";
                            var n = u || ("u" > typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
                            return n && e.setAttribute("nonce", n), e
                        }())) {
                        var r, o;
                        (r = n).styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t)), o = n, (document.head || document.getElementsByTagName("head")[0]).appendChild(o)
                    }
                    e++
                },
                remove: function() {
                    --e || !n || (n.parentNode && n.parentNode.removeChild(n), n = null)
                }
            }
        },
        w = function() {
            var e = E();
            return function(n, t) {
                l.useEffect(function() {
                    return e.add(n),
                        function() {
                            e.remove()
                        }
                }, [n && t])
            }
        },
        _ = function() {
            var e = w();
            return function(n) {
                return e(n.styles, n.dynamic), null
            }
        },
        S = {
            left: 0,
            top: 0,
            right: 0,
            gap: 0
        },
        C = function(e) {
            return parseInt(e || "", 10) || 0
        },
        R = function(e) {
            var n = window.getComputedStyle(document.body),
                t = n["padding" === e ? "paddingLeft" : "marginLeft"],
                r = n["padding" === e ? "paddingTop" : "marginTop"],
                o = n["padding" === e ? "paddingRight" : "marginRight"];
            return [C(t), C(r), C(o)]
        },
        P = function(e) {
            if (void 0 === e && (e = "margin"), "u" < typeof window) return S;
            var n = R(e),
                t = document.documentElement.clientWidth,
                r = window.innerWidth;
            return {
                left: n[0],
                top: n[1],
                right: n[2],
                gap: Math.max(0, r - t + n[2] - n[0])
            }
        },
        O = _(),
        D = "data-scroll-locked",
        k = function(e, n, t, r) {
            var o = e.left,
                i = e.top,
                a = e.right,
                u = e.gap;
            return void 0 === t && (t = "margin"), "\n  .".concat("with-scroll-bars-hidden", " {\n   overflow: hidden ").concat(r, ";\n   padding-right: ").concat(u, "px ").concat(r, ";\n  }\n  body[").concat(D, "] {\n    overflow: hidden ").concat(r, ";\n    overscroll-behavior: contain;\n    ").concat([n && "position: relative ".concat(r, ";"), "margin" === t && "\n    padding-left: ".concat(o, "px;\n    padding-top: ").concat(i, "px;\n    padding-right: ").concat(a, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(u, "px ").concat(r, ";\n    "), "padding" === t && "padding-right: ".concat(u, "px ").concat(r, ";")].filter(Boolean).join(""), "\n  }\n  \n  .").concat(s, " {\n    right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(d, " {\n    margin-right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(s, " .").concat(s, " {\n    right: 0 ").concat(r, ";\n  }\n  \n  .").concat(d, " .").concat(d, " {\n    margin-right: 0 ").concat(r, ";\n  }\n  \n  body[").concat(D, "] {\n    ").concat("--removed-body-scroll-bar-size", ": ").concat(u, "px;\n  }\n")
        },
        L = function() {
            var e = parseInt(document.body.getAttribute(D) || "0", 10);
            return isFinite(e) ? e : 0
        },
        x = function() {
            l.useEffect(function() {
                return document.body.setAttribute(D, (L() + 1).toString()),
                    function() {
                        var e = L() - 1;
                        e <= 0 ? document.body.removeAttribute(D) : document.body.setAttribute(D, e.toString())
                    }
            }, [])
        },
        A = function(e) {
            var n = e.noRelative,
                t = e.noImportant,
                r = e.gapMode,
                o = void 0 === r ? "margin" : r;
            x();
            var i = l.useMemo(function() {
                return P(o)
            }, [o]);
            return l.createElement(O, {
                styles: k(i, !n, o, t ? "" : "!important")
            })
        },
        N = !1;
    if ("u" > typeof window) try {
        var T = Object.defineProperty({}, "passive", {
            get: function() {
                return N = !0, !0
            }
        });
        window.addEventListener("test", T, T), window.removeEventListener("test", T, T)
    } catch (e) {
        N = !1
    }
    var F = !!N && {
            passive: !1
        },
        j = function(e, n) {
            if (!(0, g._)(e, Element)) return !1;
            var t = window.getComputedStyle(e);
            return "hidden" !== t[n] && (t.overflowY !== t.overflowX || "TEXTAREA" === e.tagName || "visible" !== t[n])
        },
        M = function(e, n) {
            var t = n.ownerDocument,
                r = n;
            do {
                if ("u" > typeof ShadowRoot && (0, g._)(r, ShadowRoot) && (r = r.host), I(e, r)) {
                    var o = W(e, r);
                    if (o[1] > o[2]) return !0
                }
                r = r.parentNode
            } while (r && r !== t.body) return !1
        },
        I = function(e, n) {
            return "v" === e ? j(n, "overflowY") : j(n, "overflowX")
        },
        W = function(e, n) {
            return "v" === e ? [n.scrollTop, n.scrollHeight, n.clientHeight] : [n.scrollLeft, n.scrollWidth, n.clientWidth]
        },
        B = function(e, n, t, r, o) {
            var i, a = (i = window.getComputedStyle(n).direction, "h" === e && "rtl" === i ? -1 : 1),
                u = a * r,
                c = t.target,
                l = n.contains(c),
                s = !1,
                d = u > 0,
                f = 0,
                v = 0;
            do {
                if (!c) break;
                var p = W(e, c),
                    m = p[0],
                    h = p[1] - p[2] - a * m;
                (m || h) && I(e, c) && (f += h, v += m);
                var y = c.parentNode;
                c = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y
            } while (!l && c !== document.body || l && (n.contains(c) || n === c)) return d && (o && 1 > Math.abs(f) || !o && u > f) ? s = !0 : !d && (o && 1 > Math.abs(v) || !o && -u > v) && (s = !0), s
        },
        V = function(e) {
            return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
        },
        K = function(e) {
            return [e.deltaX, e.deltaY]
        },
        $ = function(e) {
            return e && "current" in e ? e.current : e
        },
        z = 0,
        U = [];
    let H = (a = function(e) {
        var n = l.useRef([]),
            t = l.useRef([0, 0]),
            r = l.useRef(),
            o = l.useState(z++)[0],
            i = l.useState(_)[0],
            a = l.useRef(e);
        l.useEffect(function() {
            a.current = e
        }, [e]), l.useEffect(function() {
            if (e.inert) {
                document.body.classList.add("block-interactivity-".concat(o));
                var n = (0, c.__spreadArray)([e.lockRef.current], (e.shards || []).map($), !0).filter(Boolean);
                return n.forEach(function(e) {
                        return e.classList.add("allow-interactivity-".concat(o))
                    }),
                    function() {
                        document.body.classList.remove("block-interactivity-".concat(o)), n.forEach(function(e) {
                            return e.classList.remove("allow-interactivity-".concat(o))
                        })
                    }
            }
        }, [e.inert, e.lockRef.current, e.shards]);
        var u = l.useCallback(function(e, n) {
                if ("touches" in e && 2 === e.touches.length || "wheel" === e.type && e.ctrlKey) return !a.current.allowPinchZoom;
                var o, i = V(e),
                    u = t.current,
                    c = "deltaX" in e ? e.deltaX : u[0] - i[0],
                    l = "deltaY" in e ? e.deltaY : u[1] - i[1],
                    s = e.target,
                    d = Math.abs(c) > Math.abs(l) ? "h" : "v";
                if ("touches" in e && "h" === d && "range" === s.type) return !1;
                var f = window.getSelection(),
                    v = f && f.anchorNode;
                if (v && (v === s || v.contains(s))) return !1;
                var p = M(d, s);
                if (!p) return !0;
                if (p ? o = d : (o = "v" === d ? "h" : "v", p = M(d, s)), !p) return !1;
                if (!r.current && "changedTouches" in e && (c || l) && (r.current = o), !o) return !0;
                var m = r.current || o;
                return B(m, n, e, "h" === m ? c : l, !0)
            }, []),
            s = l.useCallback(function(e) {
                if (U.length && U[U.length - 1] === i) {
                    var t = "deltaY" in e ? K(e) : V(e),
                        r = n.current.filter(function(n) {
                            var r;
                            return n.name === e.type && (n.target === e.target || e.target === n.shadowParent) && (r = n.delta, r[0] === t[0] && r[1] === t[1])
                        })[0];
                    if (r && r.should) {
                        e.cancelable && e.preventDefault();
                        return
                    }
                    if (!r) {
                        var o = (a.current.shards || []).map($).filter(Boolean).filter(function(n) {
                            return n.contains(e.target)
                        });
                        (o.length > 0 ? u(e, o[0]) : !a.current.noIsolation) && e.cancelable && e.preventDefault()
                    }
                }
            }, []),
            d = l.useCallback(function(e, t, r, o) {
                var i = {
                    name: e,
                    delta: t,
                    target: r,
                    should: o,
                    shadowParent: function(e) {
                        for (var n = null; null !== e;)(0, g._)(e, ShadowRoot) && (n = e.host, e = e.host), e = e.parentNode;
                        return n
                    }(r)
                };
                n.current.push(i), setTimeout(function() {
                    n.current = n.current.filter(function(e) {
                        return e !== i
                    })
                }, 1)
            }, []),
            f = l.useCallback(function(e) {
                t.current = V(e), r.current = void 0
            }, []),
            v = l.useCallback(function(n) {
                d(n.type, K(n), n.target, u(n, e.lockRef.current))
            }, []),
            p = l.useCallback(function(n) {
                d(n.type, V(n), n.target, u(n, e.lockRef.current))
            }, []);
        l.useEffect(function() {
            return U.push(i), e.setCallbacks({
                    onScrollCapture: v,
                    onWheelCapture: v,
                    onTouchMoveCapture: p
                }), document.addEventListener("wheel", s, F), document.addEventListener("touchmove", s, F), document.addEventListener("touchstart", f, F),
                function() {
                    U = U.filter(function(e) {
                        return e !== i
                    }), document.removeEventListener("wheel", s, F), document.removeEventListener("touchmove", s, F), document.removeEventListener("touchstart", f, F)
                }
        }, []);
        var m = e.removeScrollBar,
            h = e.inert;
        return l.createElement(l.Fragment, null, h ? l.createElement(i, {
            styles: "\n  .block-interactivity-".concat(o, " {pointer-events: none;}\n  .allow-interactivity-").concat(o, " {pointer-events: all;}\n")
        }) : null, m ? l.createElement(A, {
            noRelative: e.noRelative,
            gapMode: e.gapMode
        }) : null)
    }, m.useMedium(a), b);
    var X = l.forwardRef(function(e, n) {
        return l.createElement(y, (0, c.__assign)({}, e, {
            ref: n,
            sideCar: H
        }))
    });
    X.classNames = y.classNames, e.s(["RemoveScroll", 0, X], 985369)
}]);