(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 473668, e => {
    "use strict";
    var n, t, r = e.i(843476),
        o = e.i(480388),
        i = e.i(181788),
        a = e.i(499092),
        u = e.i(317608),
        c = e.i(271645),
        l = Object.defineProperty,
        f = function(e, n) {
            return l(e, "name", {
                value: n,
                configurable: !0
            })
        },
        s = !!("u" > typeof window && window.document && window.document.createElement);

    function d(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = t.checkForDefaultPrevented,
            o = void 0 === r || r;
        return f(function(t) {
            if (null == e || e(t), !1 === o || !t || !t.defaultPrevented) return null == n ? void 0 : n(t)
        }, "handleEvent")
    }

    function v(e) {
        var n;
        if (!s) throw Error("Cannot access document outside of the DOM");
        return null != (n = null == e ? void 0 : e.ownerDocument) ? n : document
    }

    function p(e) {
        return "IFRAME" === e.tagName
    }
    f(d, "composeEventHandlers"), f(function(e) {
        var n, t;
        if (!s) throw Error("Cannot access window outside of the DOM");
        return null != (n = null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ? n : window
    }, "getOwnerWindow"), f(v, "getOwnerDocument"), f(function e(n) {
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
    }, "getActiveElement"), f(p, "isFrame");
    var m = e.i(30030),
        b = e.i(855111),
        h = Object.defineProperty,
        y = function(e, n) {
            return h(e, "name", {
                value: n,
                configurable: !0
            })
        },
        g = !!("u" > typeof window && window.document && window.document.createElement);

    function _(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = t.checkForDefaultPrevented,
            o = void 0 === r || r;
        return y(function(t) {
            if (null == e || e(t), !1 === o || !t || !t.defaultPrevented) return null == n ? void 0 : n(t)
        }, "handleEvent")
    }

    function w(e) {
        var n;
        if (!g) throw Error("Cannot access document outside of the DOM");
        return null != (n = null == e ? void 0 : e.ownerDocument) ? n : document
    }

    function E(e) {
        return "IFRAME" === e.tagName
    }
    y(_, "composeEventHandlers"), y(function(e) {
        var n, t;
        if (!g) throw Error("Cannot access window outside of the DOM");
        return null != (n = null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ? n : window
    }, "getOwnerWindow"), y(w, "getOwnerDocument"), y(function e(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = w(n).activeElement;
        if (!(null == r ? void 0 : r.nodeName)) return null;
        if (E(r) && r.contentDocument) return e(r.contentDocument.body, t);
        if (t) {
            var o = r.getAttribute("aria-activedescendant");
            if (o) {
                var i = w(r).getElementById(o);
                if (i) return i
            }
        }
        return r
    }, "getActiveElement"), y(E, "isFrame");
    var S = e.i(75830),
        C = Object.defineProperty,
        R = function(e, n) {
            return C(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function j(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function I() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = j(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : j(n[e], null)
                }
            }
        }
    }

    function x() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return c.useCallback(I.apply(void 0, (0, b._)(n)), n)
    }
    R(j, "setRef"), R(I, "composeRefs"), R(x, "useComposedRefs");
    var T = e.i(610772),
        P = e.i(540151),
        F = e.i(174080),
        D = e.i(524906),
        A = Object.defineProperty,
        O = function(e, n) {
            return A(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function N(e) {
        var n = c.forwardRef(function(n, t) {
            var r, o = n.children,
                i = (0, a._)(n, ["children"]),
                u = null,
                l = !1,
                f = [];
            W(o) && "function" == typeof z && (o = z(o._payload)), c.Children.forEach(o, function(e) {
                if (L(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    W(t) && "function" == typeof z && (t = z(t._payload)), u = M(e, t), f.push(null == u || null == (n = u.props) ? void 0 : n.children)
                } else f.push(e)
            }), u ? u = c.cloneElement(u, void 0, f) : !l && 1 === c.Children.count(o) && c.isValidElement(o) && (u = o);
            var s = u ? k(u) : void 0,
                d = x(t, s);
            if (!u) {
                if (o || 0 === o) throw Error(l ? U(e) : $(e));
                return o
            }
            var v = V(i, null != (r = u.props) ? r : {});
            return u.type !== c.Fragment && (v.ref = t ? d : s), c.cloneElement(u, v)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    O(N, "createSlot");
    var K = Symbol.for("radix.slottable");
    O(function(e) {
        var n = O(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = K, n
    }, "createSlottable");
    var M = O(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return c.isValidElement(t) ? c.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return c.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function V(e, n) {
        var t = (0, o._)({}, n);
        for (var r in n) ! function(r) {
            var i = e[r],
                a = n[r];
            /^on[A-Z]/.test(r) ? i && a ? t[r] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = a.apply(void 0, (0, b._)(n));
                return i.apply(void 0, (0, b._)(n)), r
            } : i && (t[r] = i) : "style" === r ? t[r] = (0, o._)({}, i, a) : "className" === r && (t[r] = [i, a].filter(Boolean).join(" "))
        }(r);
        return (0, o._)({}, e, t)
    }

    function k(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function L(e) {
        return c.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === K
    }
    O(V, "mergeProps"), O(k, "getElementRef"), O(L, "isSlottable");
    var G = Symbol.for("react.lazy");

    function W(e) {
        return null != e && (void 0 === e ? "undefined" : (0, D._)(e)) === "object" && "$$typeof" in e && e.$$typeof === G && "_payload" in e && B(e._payload)
    }

    function B(e) {
        return (void 0 === e ? "undefined" : (0, D._)(e)) === "object" && null !== e && "then" in e
    }
    O(W, "isLazyComponent"), O(B, "isPromiseLike");
    var $ = O(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        U = O(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        z = c[" use ".trim().toString()],
        H = Object.defineProperty,
        X = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = N("Primitive.".concat(n)),
                u = c.forwardRef(function(e, u) {
                    var c = e.asChild,
                        l = (0, a._)(e, ["asChild"]),
                        f = c ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, r.jsx)(f, (0, i._)((0, o._)({}, l), {
                        ref: u
                    }))
                });
            return u.displayName = "Primitive.".concat(n), (0, i._)((0, o._)({}, e), (0, P._)({}, n, u))
        }, {});
    H(function(e, n) {
        e && F.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var Y = e.i(30207),
        Z = (null == (n = globalThis) ? void 0 : n.document) ? c.useLayoutEffect : function() {},
        q = Object.defineProperty,
        J = c[" useEffectEvent ".trim().toString()],
        Q = c[" useInsertionEffect ".trim().toString()];

    function ee(e) {
        if ("function" == typeof J) return J(e);
        var n = c.useRef(function() {
            throw Error("Cannot call an event handler while rendering.")
        });
        return "function" == typeof Q ? Q(function() {
            n.current = e
        }) : Z(function() {
            n.current = e
        }), c.useMemo(function() {
            return function() {
                for (var e, t = arguments.length, r = Array(t), o = 0; o < t; o++) r[o] = arguments[o];
                return null == (e = n.current) ? void 0 : e.call.apply(e, [n].concat((0, b._)(r)))
            }
        }, [])
    }
    q(ee, "name", {
        value: "useEffectEvent",
        configurable: !0
    });
    var en = Object.defineProperty,
        et = function(e, n) {
            return en(e, "name", {
                value: n,
                configurable: !0
            })
        },
        er = c[" useInsertionEffect ".trim().toString()] || Z;

    function eo(e) {
        var n = e.prop,
            t = e.defaultProp,
            r = e.onChange,
            o = void 0 === r ? et(function() {}, "onChange") : r,
            i = (e.caller, (0, u._)(ei({
                defaultProp: t,
                onChange: o
            }), 3)),
            a = i[0],
            l = i[1],
            f = i[2],
            s = void 0 !== n,
            d = s ? n : a;
        return [d, c.useCallback(function(e) {
            if (s) {
                var t, r = ea(e) ? e(n) : e;
                r !== n && (null == (t = f.current) || t.call(f, r))
            } else l(e)
        }, [s, n, l, f])]
    }

    function ei(e) {
        var n = e.defaultProp,
            t = e.onChange,
            r = (0, u._)(c.useState(n), 2),
            o = r[0],
            i = r[1],
            a = c.useRef(o),
            l = c.useRef(t);
        return er(function() {
            l.current = t
        }, [t]), c.useEffect(function() {
            if (a.current !== o) {
                var e;
                null == (e = l.current) || e.call(l, o), a.current = o
            }
        }, [o, a]), [o, i, l]
    }

    function ea(e) {
        return "function" == typeof e
    }
    et(eo, "useControllableState"), et(ei, "useUncontrolledState"), et(ea, "isFunction");
    var eu = Symbol("RADIX:SYNC_STATE");
    et(function(e, n, t, r) {
        var a = n.prop,
            l = n.defaultProp,
            f = n.onChange,
            s = (n.caller, void 0 !== a),
            d = ee(f),
            v = [(0, i._)((0, o._)({}, t), {
                state: l
            })];
        r && v.push(r);
        var p = (0, u._)(c.useReducer.apply(c, [function(n, t) {
                if (t.type === eu) return (0, i._)((0, o._)({}, n), {
                    state: t.state
                });
                var r = e(n, t);
                return s && !Object.is(r.state, n.state) && d(r.state), r
            }].concat((0, b._)(v))), 2),
            m = p[0],
            h = p[1],
            y = m.state,
            g = c.useRef(y);
        c.useEffect(function() {
            g.current !== y && (g.current = y, s || d(y))
        }, [y, g, s]);
        var _ = c.useMemo(function() {
            return void 0 !== a ? (0, i._)((0, o._)({}, m), {
                state: a
            }) : m
        }, [m, a]);
        return c.useEffect(function() {
            s && !Object.is(a, m.state) && h({
                type: eu,
                state: a
            })
        }, [a, m.state, s]), [_, h]
    }, "useControllableStateReducer");
    var ec = e.i(586318),
        el = Object.defineProperty,
        ef = function(e, n) {
            return el(e, "name", {
                value: n,
                configurable: !0
            })
        },
        es = !1;

    function ed() {
        var e = (0, u._)(c.useState(es), 2),
            n = e[0],
            t = e[1];
        return c.useEffect(function() {
            es || (es = !0, t(!0))
        }, []), n
    }
    ef(ed, "useIsHydrated");
    var ev = c[" useSyncExternalStore ".trim().toString()];

    function ep() {
        return function() {}
    }

    function em() {
        return ev(ep, function() {
            return !0
        }, function() {
            return !1
        })
    }
    ef(ep, "subscribe"), ef(em, "useIsHydratedModern");
    var eb = "function" == typeof ev ? em : ed,
        eh = Object.defineProperty,
        ey = function(e, n) {
            return eh(e, "name", {
                value: n,
                configurable: !0
            })
        },
        eg = "rovingFocusGroup.onEntryFocus",
        e_ = {
            bubbles: !1,
            cancelable: !0
        },
        ew = "RovingFocusGroup",
        eE = (0, u._)((0, S.createCollection)(ew), 3),
        eS = eE[0],
        eC = eE[1],
        eR = eE[2],
        ej = (0, u._)((0, m.createContextScope)(ew, [eR]), 2),
        eI = ej[0],
        ex = ej[1],
        eT = (0, u._)(eI(ew), 2),
        eP = eT[0],
        eF = eT[1],
        eD = c.forwardRef(ey(function(e, n) {
            return (0, r.jsx)(eS.Provider, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, r.jsx)(eS.Slot, {
                    scope: e.__scopeRovingFocusGroup,
                    children: (0, r.jsx)(eA, (0, i._)((0, o._)({}, e), {
                        ref: n
                    }))
                })
            })
        }, "RovingFocusGroup")),
        eA = c.forwardRef(ey(function(e, n) {
            var t = e.__scopeRovingFocusGroup,
                l = e.orientation,
                f = e.loop,
                s = e.dir,
                d = e.currentTabStopId,
                v = e.defaultCurrentTabStopId,
                p = e.onCurrentTabStopIdChange,
                m = e.onEntryFocus,
                h = e.preventScrollOnEntryFocus,
                y = void 0 !== h && h,
                g = (0, a._)(e, ["__scopeRovingFocusGroup", "orientation", "loop", "dir", "currentTabStopId", "defaultCurrentTabStopId", "onCurrentTabStopIdChange", "onEntryFocus", "preventScrollOnEntryFocus"]),
                w = c.useRef(null),
                E = x(n, w),
                S = (0, ec.useDirection)(s),
                C = (0, u._)(eo({
                    prop: d,
                    defaultProp: null != v ? v : null,
                    onChange: p,
                    caller: ew
                }), 2),
                R = C[0],
                j = C[1],
                I = (0, u._)(c.useState(!1), 2),
                T = I[0],
                P = I[1],
                F = (0, Y.useCallbackRef)(m),
                D = eC(t),
                A = c.useRef(!1),
                O = (0, u._)(c.useState(0), 2),
                N = O[0],
                K = O[1];
            return c.useEffect(function() {
                var e = w.current;
                if (e) return e.addEventListener(eg, F),
                    function() {
                        return e.removeEventListener(eg, F)
                    }
            }, [F]), (0, r.jsx)(eP, {
                scope: t,
                orientation: l,
                dir: S,
                loop: void 0 !== f && f,
                currentTabStopId: R,
                onItemFocus: c.useCallback(function(e) {
                    return j(e)
                }, [j]),
                onItemShiftTab: c.useCallback(function() {
                    return P(!0)
                }, []),
                onFocusableItemAdd: c.useCallback(function() {
                    return K(function(e) {
                        return e + 1
                    })
                }, []),
                onFocusableItemRemove: c.useCallback(function() {
                    return K(function(e) {
                        return e - 1
                    })
                }, []),
                children: (0, r.jsx)(X.div, (0, i._)((0, o._)({
                    tabIndex: T || 0 === N ? -1 : 0,
                    "data-orientation": l
                }, g), {
                    ref: E,
                    style: (0, o._)({
                        outline: "none"
                    }, e.style),
                    onMouseDown: _(e.onMouseDown, function() {
                        A.current = !0
                    }),
                    onFocus: _(e.onFocus, function(e) {
                        var n = !A.current;
                        if (e.target === e.currentTarget && n && !T) {
                            var t = new CustomEvent(eg, e_);
                            if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
                                var r = D().filter(function(e) {
                                    return e.focusable
                                });
                                eV([r.find(function(e) {
                                    return e.active
                                }), r.find(function(e) {
                                    return e.id === R
                                })].concat((0, b._)(r)).filter(Boolean).map(function(e) {
                                    return e.ref.current
                                }), y)
                            }
                        }
                        A.current = !1
                    }),
                    onBlur: _(e.onBlur, function() {
                        return P(!1)
                    })
                }))
            })
        }, "RovingFocusGroupImpl")),
        eO = c.forwardRef(ey(function(e, n) {
            var t = e.__scopeRovingFocusGroup,
                u = e.focusable,
                l = void 0 === u || u,
                f = e.active,
                s = e.tabStopId,
                d = e.children,
                v = (0, a._)(e, ["__scopeRovingFocusGroup", "focusable", "active", "tabStopId", "children"]),
                p = (0, T.useId)(),
                m = s || p,
                b = eF("RovingFocusGroupItem", t),
                h = b.currentTabStopId === m,
                y = eC(t),
                g = b.onFocusableItemAdd,
                w = b.onFocusableItemRemove,
                E = b.currentTabStopId,
                S = eb();
            return Z(function() {
                if (S && l) return g(),
                    function() {
                        return w()
                    }
            }, [S, l, g, w]), c.useEffect(function() {
                if (!S && l) return g(),
                    function() {
                        return w()
                    }
            }, [S, l, g, w]), (0, r.jsx)(eS.ItemSlot, {
                scope: t,
                id: m,
                focusable: l,
                active: void 0 !== f && f,
                children: (0, r.jsx)(X.span, (0, i._)((0, o._)({
                    tabIndex: h ? 0 : -1,
                    "data-orientation": b.orientation
                }, v), {
                    ref: n,
                    onMouseDown: _(e.onMouseDown, function(e) {
                        l ? b.onItemFocus(m) : e.preventDefault()
                    }),
                    onFocus: _(e.onFocus, function() {
                        return b.onItemFocus(m)
                    }),
                    onKeyDown: _(e.onKeyDown, function(e) {
                        if ("Tab" === e.key && e.shiftKey) return void b.onItemShiftTab();
                        if (e.target === e.currentTarget) {
                            var n = eM(e, b.orientation, b.dir);
                            if (void 0 !== n) {
                                if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                                e.preventDefault();
                                var t = y().filter(function(e) {
                                    return e.focusable
                                }).map(function(e) {
                                    return e.ref.current
                                });
                                if ("last" === n) t.reverse();
                                else if ("prev" === n || "next" === n) {
                                    "prev" === n && t.reverse();
                                    var r = t.indexOf(e.currentTarget);
                                    t = b.loop ? ek(t, r + 1) : t.slice(r + 1)
                                }
                                setTimeout(function() {
                                    return eV(t)
                                })
                            }
                        }
                    }),
                    children: "function" == typeof d ? d({
                        isCurrentTabStop: h,
                        hasTabStop: null != E
                    }) : d
                }))
            })
        }, "RovingFocusGroupItem")),
        eN = {
            ArrowLeft: "prev",
            ArrowUp: "prev",
            ArrowRight: "next",
            ArrowDown: "next",
            PageUp: "first",
            Home: "first",
            PageDown: "last",
            End: "last"
        };

    function eK(e, n) {
        return "rtl" !== n ? e : "ArrowLeft" === e ? "ArrowRight" : "ArrowRight" === e ? "ArrowLeft" : e
    }

    function eM(e, n, t) {
        var r = eK(e.key, t);
        if (!("vertical" === n && ["ArrowLeft", "ArrowRight"].includes(r)) && !("horizontal" === n && ["ArrowUp", "ArrowDown"].includes(r))) return eN[r]
    }

    function eV(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            t = document.activeElement,
            r = !0,
            o = !1,
            i = void 0;
        try {
            for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done); r = !0) {
                var c = a.value;
                if (c === t || (c.focus({
                        preventScroll: n
                    }), document.activeElement !== t)) return
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

    function ek(e, n) {
        return e.map(function(t, r) {
            return e[(n + r) % e.length]
        })
    }
    ey(eK, "getDirectionAwareKey"), ey(eM, "getFocusIntent"), ey(eV, "focusFirst"), ey(ek, "wrapArray");
    var eL = e.i(296626),
        eG = Object.defineProperty,
        eW = function(e, n) {
            return eG(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function eB(e, n) {
        if ("function" == typeof e) return e(n);
        null != e && (e.current = n)
    }

    function e$() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return function(e) {
            var t = !1,
                r = n.map(function(n) {
                    var r = eB(n, e);
                    return t || "function" != typeof r || (t = !0), r
                });
            if (t) return function() {
                for (var e = 0; e < r.length; e++) {
                    var t = r[e];
                    "function" == typeof t ? t() : eB(n[e], null)
                }
            }
        }
    }

    function eU() {
        for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
        return c.useCallback(e$.apply(void 0, (0, b._)(n)), n)
    }
    eW(eB, "setRef"), eW(e$, "composeRefs"), eW(eU, "useComposedRefs");
    var ez = Object.defineProperty,
        eH = function(e, n) {
            return ez(e, "name", {
                value: n,
                configurable: !0
            })
        };

    function eX(e) {
        var n = c.forwardRef(function(n, t) {
            var r, o = n.children,
                i = (0, a._)(n, ["children"]),
                u = null,
                l = !1,
                f = [];
            e1(o) && "function" == typeof e6 && (o = e6(o._payload)), c.Children.forEach(o, function(e) {
                if (eQ(e)) {
                    l = !0;
                    var n, t = "child" in e.props ? e.props.child : e.props.children;
                    e1(t) && "function" == typeof e6 && (t = e6(t._payload)), u = eZ(e, t), f.push(null == u || null == (n = u.props) ? void 0 : n.children)
                } else f.push(e)
            }), u ? u = c.cloneElement(u, void 0, f) : !l && 1 === c.Children.count(o) && c.isValidElement(o) && (u = o);
            var s = u ? eJ(u) : void 0,
                d = eU(t, s);
            if (!u) {
                if (o || 0 === o) throw Error(l ? e8(e) : e3(e));
                return o
            }
            var v = eq(i, null != (r = u.props) ? r : {});
            return u.type !== c.Fragment && (v.ref = t ? d : s), c.cloneElement(u, v)
        });
        return n.displayName = "".concat(e, ".Slot"), n
    }
    eH(eX, "createSlot");
    var eY = Symbol.for("radix.slottable");
    eH(function(e) {
        var n = eH(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return n.displayName = "".concat(e, ".Slottable"), n.__radixId = eY, n
    }, "createSlottable");
    var eZ = eH(function(e, n) {
        if ("child" in e.props) {
            var t = e.props.child;
            return c.isValidElement(t) ? c.cloneElement(t, void 0, e.props.children(t.props.children)) : null
        }
        return c.isValidElement(n) ? n : null
    }, "getSlottableElementFromSlottable");

    function eq(e, n) {
        var t = (0, o._)({}, n);
        for (var r in n) ! function(r) {
            var i = e[r],
                a = n[r];
            /^on[A-Z]/.test(r) ? i && a ? t[r] = function() {
                for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                var r = a.apply(void 0, (0, b._)(n));
                return i.apply(void 0, (0, b._)(n)), r
            } : i && (t[r] = i) : "style" === r ? t[r] = (0, o._)({}, i, a) : "className" === r && (t[r] = [i, a].filter(Boolean).join(" "))
        }(r);
        return (0, o._)({}, e, t)
    }

    function eJ(e) {
        var n, t, r = null == (n = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : n.get,
            o = r && "isReactWarning" in r && r.isReactWarning;
        return o ? e.ref : (o = (r = null == (t = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : t.get) && "isReactWarning" in r && r.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function eQ(e) {
        return c.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === eY
    }
    eH(eq, "mergeProps"), eH(eJ, "getElementRef"), eH(eQ, "isSlottable");
    var e0 = Symbol.for("react.lazy");

    function e1(e) {
        return null != e && (void 0 === e ? "undefined" : (0, D._)(e)) === "object" && "$$typeof" in e && e.$$typeof === e0 && "_payload" in e && e2(e._payload)
    }

    function e2(e) {
        return (void 0 === e ? "undefined" : (0, D._)(e)) === "object" && null !== e && "then" in e
    }
    eH(e1, "isLazyComponent"), eH(e2, "isPromiseLike");
    var e3 = eH(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        e8 = eH(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        e6 = c[" use ".trim().toString()],
        e7 = Object.defineProperty,
        e4 = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce(function(e, n) {
            var t = eX("Primitive.".concat(n)),
                u = c.forwardRef(function(e, u) {
                    var c = e.asChild,
                        l = (0, a._)(e, ["asChild"]),
                        f = c ? t : n;
                    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, r.jsx)(f, (0, i._)((0, o._)({}, l), {
                        ref: u
                    }))
                });
            return u.displayName = "Primitive.".concat(n), (0, i._)((0, o._)({}, e), (0, P._)({}, n, u))
        }, {});
    e7(function(e, n) {
        e && F.flushSync(function() {
            return e.dispatchEvent(n)
        })
    }, "name", {
        value: "dispatchDiscreteCustomEvent",
        configurable: !0
    });
    var e5 = (null == (t = globalThis) ? void 0 : t.document) ? c.useLayoutEffect : function() {},
        e9 = Object.defineProperty,
        ne = c[" useEffectEvent ".trim().toString()],
        nn = c[" useInsertionEffect ".trim().toString()];

    function nt(e) {
        if ("function" == typeof ne) return ne(e);
        var n = c.useRef(function() {
            throw Error("Cannot call an event handler while rendering.")
        });
        return "function" == typeof nn ? nn(function() {
            n.current = e
        }) : e5(function() {
            n.current = e
        }), c.useMemo(function() {
            return function() {
                for (var e, t = arguments.length, r = Array(t), o = 0; o < t; o++) r[o] = arguments[o];
                return null == (e = n.current) ? void 0 : e.call.apply(e, [n].concat((0, b._)(r)))
            }
        }, [])
    }
    e9(nt, "name", {
        value: "useEffectEvent",
        configurable: !0
    });
    var nr = Object.defineProperty,
        no = function(e, n) {
            return nr(e, "name", {
                value: n,
                configurable: !0
            })
        },
        ni = c[" useInsertionEffect ".trim().toString()] || e5;

    function na(e) {
        var n = e.prop,
            t = e.defaultProp,
            r = e.onChange,
            o = void 0 === r ? no(function() {}, "onChange") : r,
            i = (e.caller, (0, u._)(nu({
                defaultProp: t,
                onChange: o
            }), 3)),
            a = i[0],
            l = i[1],
            f = i[2],
            s = void 0 !== n,
            d = s ? n : a;
        return [d, c.useCallback(function(e) {
            if (s) {
                var t, r = nc(e) ? e(n) : e;
                r !== n && (null == (t = f.current) || t.call(f, r))
            } else l(e)
        }, [s, n, l, f])]
    }

    function nu(e) {
        var n = e.defaultProp,
            t = e.onChange,
            r = (0, u._)(c.useState(n), 2),
            o = r[0],
            i = r[1],
            a = c.useRef(o),
            l = c.useRef(t);
        return ni(function() {
            l.current = t
        }, [t]), c.useEffect(function() {
            if (a.current !== o) {
                var e;
                null == (e = l.current) || e.call(l, o), a.current = o
            }
        }, [o, a]), [o, i, l]
    }

    function nc(e) {
        return "function" == typeof e
    }
    no(na, "useControllableState"), no(nu, "useUncontrolledState"), no(nc, "isFunction");
    var nl = Symbol("RADIX:SYNC_STATE");
    no(function(e, n, t, r) {
        var a = n.prop,
            l = n.defaultProp,
            f = n.onChange,
            s = (n.caller, void 0 !== a),
            d = nt(f),
            v = [(0, i._)((0, o._)({}, t), {
                state: l
            })];
        r && v.push(r);
        var p = (0, u._)(c.useReducer.apply(c, [function(n, t) {
                if (t.type === nl) return (0, i._)((0, o._)({}, n), {
                    state: t.state
                });
                var r = e(n, t);
                return s && !Object.is(r.state, n.state) && d(r.state), r
            }].concat((0, b._)(v))), 2),
            m = p[0],
            h = p[1],
            y = m.state,
            g = c.useRef(y);
        c.useEffect(function() {
            g.current !== y && (g.current = y, s || d(y))
        }, [y, g, s]);
        var _ = c.useMemo(function() {
            return void 0 !== a ? (0, i._)((0, o._)({}, m), {
                state: a
            }) : m
        }, [m, a]);
        return c.useEffect(function() {
            s && !Object.is(a, m.state) && h({
                type: nl,
                state: a
            })
        }, [a, m.state, s]), [_, h]
    }, "useControllableStateReducer");
    var nf = Object.defineProperty,
        ns = function(e, n) {
            return nf(e, "name", {
                value: n,
                configurable: !0
            })
        },
        nd = "Tabs",
        nv = (0, u._)((0, m.createContextScope)(nd, [ex]), 2),
        np = nv[0];
    nv[1];
    var nm = ex(),
        nb = (0, u._)(np(nd), 2),
        nh = nb[0],
        ny = nb[1],
        ng = c.forwardRef(ns(function(e, n) {
            var t = e.__scopeTabs,
                c = e.value,
                l = e.onValueChange,
                f = e.defaultValue,
                s = e.orientation,
                d = void 0 === s ? "horizontal" : s,
                v = e.dir,
                p = e.activationMode,
                m = (0, a._)(e, ["__scopeTabs", "value", "onValueChange", "defaultValue", "orientation", "dir", "activationMode"]),
                b = (0, ec.useDirection)(v),
                h = (0, u._)(na({
                    prop: c,
                    onChange: l,
                    defaultProp: null != f ? f : "",
                    caller: nd
                }), 2),
                y = h[0],
                g = h[1];
            return (0, r.jsx)(nh, {
                scope: t,
                baseId: (0, T.useId)(),
                value: y,
                onValueChange: g,
                orientation: d,
                dir: b,
                activationMode: void 0 === p ? "automatic" : p,
                children: (0, r.jsx)(e4.div, (0, i._)((0, o._)({
                    dir: b,
                    "data-orientation": d
                }, m), {
                    ref: n
                }))
            })
        }, "Tabs")),
        n_ = c.forwardRef(ns(function(e, n) {
            var t = e.__scopeTabs,
                u = e.loop,
                c = (0, a._)(e, ["__scopeTabs", "loop"]),
                l = ny("TabsList", t),
                f = nm(t);
            return (0, r.jsx)(eD, (0, i._)((0, o._)({
                asChild: !0
            }, f), {
                orientation: l.orientation,
                dir: l.dir,
                loop: void 0 === u || u,
                children: (0, r.jsx)(e4.div, (0, i._)((0, o._)({
                    role: "tablist",
                    "aria-orientation": l.orientation
                }, c), {
                    ref: n
                }))
            }))
        }, "TabsList")),
        nw = c.forwardRef(ns(function(e, n) {
            var t = e.__scopeTabs,
                u = e.value,
                c = e.disabled,
                l = void 0 !== c && c,
                f = (0, a._)(e, ["__scopeTabs", "value", "disabled"]),
                s = ny("TabsTrigger", t),
                v = nm(t),
                p = nS(s.baseId, u),
                m = nC(s.baseId, u),
                b = u === s.value;
            return (0, r.jsx)(eO, (0, i._)((0, o._)({
                asChild: !0
            }, v), {
                focusable: !l,
                active: b,
                children: (0, r.jsx)(e4.button, (0, i._)((0, o._)({
                    type: "button",
                    role: "tab",
                    "aria-selected": b,
                    "aria-controls": m,
                    "data-state": b ? "active" : "inactive",
                    "data-disabled": l ? "" : void 0,
                    disabled: l,
                    id: p
                }, f), {
                    ref: n,
                    onMouseDown: d(e.onMouseDown, function(e) {
                        l || 0 !== e.button || !1 !== e.ctrlKey ? e.preventDefault() : s.onValueChange(u)
                    }),
                    onKeyDown: d(e.onKeyDown, function(e) {
                        !l && e.target === e.currentTarget && [" ", "Enter"].includes(e.key) && s.onValueChange(u)
                    }),
                    onFocus: d(e.onFocus, function() {
                        var e = "manual" !== s.activationMode;
                        b || l || !e || s.onValueChange(u)
                    })
                }))
            }))
        }, "TabsTrigger")),
        nE = c.forwardRef(ns(function(e, n) {
            var t = e.__scopeTabs,
                u = e.value,
                l = e.forceMount,
                f = e.children,
                s = (0, a._)(e, ["__scopeTabs", "value", "forceMount", "children"]),
                d = ny("TabsContent", t),
                v = nS(d.baseId, u),
                p = nC(d.baseId, u),
                m = u === d.value,
                b = c.useRef(m);
            return c.useEffect(function() {
                var e = requestAnimationFrame(function() {
                    return b.current = !1
                });
                return function() {
                    return cancelAnimationFrame(e)
                }
            }, []), (0, r.jsx)(eL.Presence, {
                present: l || m,
                children: function(t) {
                    var a = t.present;
                    return (0, r.jsx)(e4.div, (0, i._)((0, o._)({
                        "data-state": m ? "active" : "inactive",
                        "data-orientation": d.orientation,
                        role: "tabpanel",
                        "aria-labelledby": v,
                        hidden: !a,
                        id: p,
                        tabIndex: 0
                    }, s), {
                        ref: n,
                        style: (0, i._)((0, o._)({}, e.style), {
                            animationDuration: b.current ? "0s" : void 0
                        }),
                        children: a && f
                    }))
                }
            })
        }, "TabsContent"));

    function nS(e, n) {
        return "".concat(e, "-trigger-").concat(n)
    }

    function nC(e, n) {
        return "".concat(e, "-content-").concat(n)
    }
    ns(nS, "makeTriggerId"), ns(nC, "makeContentId");
    var nR = e.i(975157),
        nj = c.default.createContext({
            activeKey: "",
            onSelect: function() {}
        }),
        nI = Object.assign(function(e) {
            return null
        }, {
            Container: function(e) {
                var n = e.activeKey,
                    t = e.onSelect,
                    o = e.children;
                return (0, r.jsx)(ng, {
                    value: n,
                    onValueChange: function(e) {
                        return t(e || null)
                    },
                    children: (0, r.jsx)(nj.Provider, {
                        value: {
                            activeKey: n,
                            onSelect: function(e) {
                                return t(e)
                            }
                        },
                        children: o
                    })
                })
            },
            Content: function(e) {
                var n = e.className,
                    t = e.children;
                return (0, r.jsx)("div", {
                    className: (0, nR.cn)("pw-tab-content", n),
                    children: t
                })
            },
            Pane: function(e) {
                var n = e.eventKey,
                    t = e.children;
                return (0, r.jsx)(nE, {
                    value: n,
                    className: "pw-tab-pane",
                    children: t
                })
            }
        });
    e.s(["Nav", 0, {
        List: function(e) {
            var n = e.className,
                t = e.children;
            return (0, r.jsx)(n_, {
                className: (0, nR.cn)("pw-nav pw-nav-tabs", n),
                children: t
            })
        },
        Link: function(e) {
            var n = e.eventKey,
                t = e.disabled,
                o = e.className,
                i = e.children;
            return (0, r.jsx)(nw, {
                value: n,
                disabled: t,
                className: (0, nR.cn)("pw-nav-link", t && "disabled", o),
                children: i
            })
        }
    }, "Tab", 0, nI, "Tabs", 0, function(e) {
        var n, t = e.defaultActiveKey,
            o = e.activeKey,
            i = e.onSelect,
            a = e.id,
            u = e.className,
            l = e.children,
            f = [];
        c.default.Children.forEach(l, function(e) {
            if (c.default.isValidElement(e) && e.props.eventKey) {
                var n = e.props;
                f.push({
                    eventKey: n.eventKey,
                    title: n.title,
                    children: e.props.children,
                    className: n.className
                })
            }
        });
        var s = void 0 === o ? (void 0 === t ? "" : t) || (null == (n = f[0]) ? void 0 : n.eventKey) : void 0;
        return (0, r.jsxs)(ng, {
            value: o,
            defaultValue: s,
            onValueChange: function(e) {
                return null == i ? void 0 : i(e || null)
            },
            id: a,
            className: u,
            children: [(0, r.jsx)(n_, {
                className: "pw-nav pw-nav-tabs",
                "aria-label": "Tabs",
                children: f.map(function(e) {
                    return (0, r.jsx)(nw, {
                        value: e.eventKey,
                        className: "pw-nav-link",
                        children: e.title
                    }, e.eventKey)
                })
            }), (0, r.jsx)("div", {
                className: "pw-tab-content",
                children: f.map(function(e) {
                    return (0, r.jsx)(nE, {
                        value: e.eventKey,
                        className: (0, nR.cn)("pw-tab-pane", e.className),
                        children: e.children
                    }, e.eventKey)
                })
            })]
        })
    }], 473668)
}]);