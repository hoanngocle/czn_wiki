(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 75830, 586318, e => {
    "use strict";
    var t, r, n = e.i(373835),
        i = e.i(381772),
        o = e.i(754452),
        a = e.i(229032),
        s = e.i(567928),
        l = e.i(523474),
        c = e.i(61106),
        u = e.i(540151),
        d = e.i(562578),
        f = e.i(813674),
        p = e.i(912037),
        h = e.i(480388),
        v = e.i(181788),
        m = e.i(499092),
        y = e.i(317608),
        b = e.i(855111),
        g = e.i(524906),
        w = e.i(390373),
        S = e.i(271645),
        _ = e.i(30030),
        E = Object.defineProperty,
        R = function(e, t) {
            return E(e, "name", {
                value: t,
                configurable: !0
            })
        };

    function P(e, t) {
        if ("function" == typeof e) return e(t);
        null != e && (e.current = t)
    }

    function N() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return function(e) {
            var r = !1,
                n = t.map(function(t) {
                    var n = P(t, e);
                    return r || "function" != typeof n || (r = !0), n
                });
            if (r) return function() {
                for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    "function" == typeof r ? r() : P(t[e], null)
                }
            }
        }
    }

    function A() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return S.useCallback(N.apply(void 0, (0, b._)(t)), t)
    }
    R(P, "setRef"), R(N, "composeRefs"), R(A, "useComposedRefs");
    var x = Object.defineProperty,
        k = function(e, t) {
            return x(e, "name", {
                value: t,
                configurable: !0
            })
        };

    function O(e) {
        var t = S.forwardRef(function(t, r) {
            var n, i = t.children,
                o = (0, m._)(t, ["children"]),
                a = null,
                s = !1,
                l = [];
            z(i) && "function" == typeof F && (i = F(i._payload)), S.Children.forEach(i, function(e) {
                if (T(e)) {
                    s = !0;
                    var t, r = "child" in e.props ? e.props.child : e.props.children;
                    z(r) && "function" == typeof F && (r = F(r._payload)), a = I(e, r), l.push(null == a || null == (t = a.props) ? void 0 : t.children)
                } else l.push(e)
            }), a ? a = S.cloneElement(a, void 0, l) : !s && 1 === S.Children.count(i) && S.isValidElement(i) && (a = i);
            var c = a ? M(a) : void 0,
                u = A(r, c);
            if (!a) {
                if (i || 0 === i) throw Error(s ? W(e) : H(e));
                return i
            }
            var d = j(o, null != (n = a.props) ? n : {});
            return a.type !== S.Fragment && (d.ref = r ? u : c), S.cloneElement(a, d)
        });
        return t.displayName = "".concat(e, ".Slot"), t
    }
    k(O, "createSlot");
    var C = Symbol.for("radix.slottable");
    k(function(e) {
        var t = k(function(e) {
            return "child" in e ? e.children(e.child) : e.children
        }, "Slottable");
        return t.displayName = "".concat(e, ".Slottable"), t.__radixId = C, t
    }, "createSlottable");
    var I = k(function(e, t) {
        if ("child" in e.props) {
            var r = e.props.child;
            return S.isValidElement(r) ? S.cloneElement(r, void 0, e.props.children(r.props.children)) : null
        }
        return S.isValidElement(t) ? t : null
    }, "getSlottableElementFromSlottable");

    function j(e, t) {
        var r = (0, h._)({}, t);
        for (var n in t) ! function(n) {
            var i = e[n],
                o = t[n];
            /^on[A-Z]/.test(n) ? i && o ? r[n] = function() {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                var n = o.apply(void 0, (0, b._)(t));
                return i.apply(void 0, (0, b._)(t)), n
            } : i && (r[n] = i) : "style" === n ? r[n] = (0, h._)({}, i, o) : "className" === n && (r[n] = [i, o].filter(Boolean).join(" "))
        }(n);
        return (0, h._)({}, e, r)
    }

    function M(e) {
        var t, r, n = null == (t = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : t.get,
            i = n && "isReactWarning" in n && n.isReactWarning;
        return i ? e.ref : (i = (n = null == (r = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : r.get) && "isReactWarning" in n && n.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }

    function T(e) {
        return S.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === C
    }
    k(j, "mergeProps"), k(M, "getElementRef"), k(T, "isSlottable");
    var G = Symbol.for("react.lazy");

    function z(e) {
        return null != e && (void 0 === e ? "undefined" : (0, g._)(e)) === "object" && "$$typeof" in e && e.$$typeof === G && "_payload" in e && L(e._payload)
    }

    function L(e) {
        return (void 0 === e ? "undefined" : (0, g._)(e)) === "object" && null !== e && "then" in e
    }
    k(z, "isLazyComponent"), k(L, "isPromiseLike");
    var H = k(function(e) {
            return "".concat(e, " failed to slot onto its children. Expected a single React element child or `Slottable`.")
        }, "createSlotError"),
        W = k(function(e) {
            return "".concat(e, " failed to slot onto its `Slottable`. Expected `Slottable` to receive a single React element child.")
        }, "createSlottableError"),
        F = S[" use ".trim().toString()],
        D = e.i(843476),
        K = Object.defineProperty,
        U = function(e, t) {
            return K(e, "name", {
                value: t,
                configurable: !0
            })
        };

    function Z(e) {
        var t = e + "CollectionProvider",
            r = (0, y._)((0, _.createContextScope)(t), 2),
            n = r[0],
            i = r[1],
            o = (0, y._)(n(t, {
                collectionRef: {
                    current: null
                },
                itemMap: new Map
            }), 2),
            a = o[0],
            s = o[1],
            l = U(function(e) {
                var t = e.scope,
                    r = e.children,
                    n = S.useRef(null),
                    i = S.useRef(new Map).current;
                return (0, D.jsx)(a, {
                    scope: t,
                    itemMap: i,
                    collectionRef: n,
                    children: r
                })
            }, "CollectionProvider");
        l.displayName = t;
        var c = e + "CollectionSlot",
            d = O(c),
            f = S.forwardRef(function(e, t) {
                var r = e.scope,
                    n = e.children,
                    i = A(t, s(c, r).collectionRef);
                return (0, D.jsx)(d, {
                    ref: i,
                    children: n
                })
            });
        f.displayName = c;
        var p = e + "CollectionItemSlot",
            b = "data-radix-collection-item",
            g = O(p),
            w = S.forwardRef(function(e, t) {
                var r = e.scope,
                    n = e.children,
                    i = (0, m._)(e, ["scope", "children"]),
                    o = S.useRef(null),
                    a = A(t, o),
                    l = s(p, r);
                return S.useEffect(function() {
                    return l.itemMap.set(o, (0, h._)({
                            ref: o
                        }, i)),
                        function() {
                            l.itemMap.delete(o)
                        }
                }), (0, D.jsx)(g, (0, v._)((0, h._)({}, (0, u._)({}, b, "")), {
                    ref: a,
                    children: n
                }))
            });

        function E(t) {
            var r = s(e + "CollectionConsumer", t);
            return S.useCallback(function() {
                var e = r.collectionRef.current;
                if (!e) return [];
                var t = Array.from(e.querySelectorAll("[".concat(b, "]")));
                return Array.from(r.itemMap.values()).sort(function(e, r) {
                    return t.indexOf(e.ref.current) - t.indexOf(r.ref.current)
                })
            }, [r.collectionRef, r.itemMap])
        }
        return w.displayName = p, U(E, "useCollection"), [{
            Provider: l,
            Slot: f,
            ItemSlot: w
        }, E, i]
    }
    U(Z, "createCollection");
    var B = new WeakMap,
        V = (t = new WeakMap, U(r = function(e) {
            function r(e) {
                var a;
                return (0, o._)(this, r), a = (0, i._)(this, r, [e]), (0, s._)(a, t, {
                    writable: !0,
                    value: void 0
                }), (0, l._)(a, t, (0, b._)((0, d._)(((0, n._)(a), (0, f._)(r.prototype)), "keys", a).call(a))), B.set(a, !0), a
            }
            return (0, p._)(r, e), (0, c._)(r, [{
                key: "set",
                value: function(e, n) {
                    return B.get(this) && (this.has(e) ? (0, a._)(this, t)[(0, a._)(this, t).indexOf(e)] = e : (0, a._)(this, t).push(e)), (0, d._)((0, f._)(r.prototype), "set", this).call(this, e, n), this
                }
            }, {
                key: "insert",
                value: function(e, r, n) {
                    var i, o = this.has(r),
                        s = (0, a._)(this, t).length,
                        l = X(e),
                        c = l >= 0 ? l : s + l,
                        u = c < 0 || c >= s ? -1 : c;
                    if (u === this.size || o && u === this.size - 1 || -1 === u) return this.set(r, n), this;
                    var d = this.size + +!o;
                    l < 0 && c++;
                    for (var f = (0, b._)((0, a._)(this, t)), p = !1, h = c; h < d; h++)
                        if (c === h) {
                            var v = f[h];
                            f[h] === r && (v = f[h + 1]), o && this.delete(r), i = this.get(v), this.set(r, n)
                        } else {
                            p || f[h - 1] !== r || (p = !0);
                            var m = f[p ? h : h - 1],
                                y = i;
                            i = this.get(m), this.delete(m), this.set(m, y)
                        }
                    return this
                }
            }, {
                key: "with",
                value: function(e, t, n) {
                    var i = new r(this);
                    return i.insert(e, t, n), i
                }
            }, {
                key: "before",
                value: function(e) {
                    var r = (0, a._)(this, t).indexOf(e) - 1;
                    if (!(r < 0)) return this.entryAt(r)
                }
            }, {
                key: "setBefore",
                value: function(e, r, n) {
                    var i = (0, a._)(this, t).indexOf(e);
                    return -1 === i ? this : this.insert(i, r, n)
                }
            }, {
                key: "after",
                value: function(e) {
                    var r = (0, a._)(this, t).indexOf(e);
                    if (-1 !== (r = -1 === r || r === this.size - 1 ? -1 : r + 1)) return this.entryAt(r)
                }
            }, {
                key: "setAfter",
                value: function(e, r, n) {
                    var i = (0, a._)(this, t).indexOf(e);
                    return -1 === i ? this : this.insert(i + 1, r, n)
                }
            }, {
                key: "first",
                value: function() {
                    return this.entryAt(0)
                }
            }, {
                key: "last",
                value: function() {
                    return this.entryAt(-1)
                }
            }, {
                key: "clear",
                value: function() {
                    return (0, l._)(this, t, []), (0, d._)((0, f._)(r.prototype), "clear", this).call(this)
                }
            }, {
                key: "delete",
                value: function(e) {
                    var n = (0, d._)((0, f._)(r.prototype), "delete", this).call(this, e);
                    return n && (0, a._)(this, t).splice((0, a._)(this, t).indexOf(e), 1), n
                }
            }, {
                key: "deleteAt",
                value: function(e) {
                    var t = this.keyAt(e);
                    return void 0 !== t && this.delete(t)
                }
            }, {
                key: "at",
                value: function(e) {
                    var r = Y((0, a._)(this, t), e);
                    if (void 0 !== r) return this.get(r)
                }
            }, {
                key: "entryAt",
                value: function(e) {
                    var r = Y((0, a._)(this, t), e);
                    if (void 0 !== r) return [r, this.get(r)]
                }
            }, {
                key: "indexOf",
                value: function(e) {
                    return (0, a._)(this, t).indexOf(e)
                }
            }, {
                key: "keyAt",
                value: function(e) {
                    return Y((0, a._)(this, t), e)
                }
            }, {
                key: "from",
                value: function(e, t) {
                    var r = this.indexOf(e);
                    if (-1 !== r) {
                        var n = r + t;
                        return n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.at(n)
                    }
                }
            }, {
                key: "keyFrom",
                value: function(e, t) {
                    var r = this.indexOf(e);
                    if (-1 !== r) {
                        var n = r + t;
                        return n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.keyAt(n)
                    }
                }
            }, {
                key: "find",
                value: function(e, t) {
                    var r = 0,
                        n = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (var a, s = this[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                            var l = a.value;
                            if (Reflect.apply(e, t, [l, r, this])) return l;
                            r++
                        }
                    } catch (e) {
                        i = !0, o = e
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (i) throw o
                        }
                    }
                }
            }, {
                key: "findIndex",
                value: function(e, t) {
                    var r = 0,
                        n = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (var a, s = this[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                            var l = a.value;
                            if (Reflect.apply(e, t, [l, r, this])) return r;
                            r++
                        }
                    } catch (e) {
                        i = !0, o = e
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (i) throw o
                        }
                    }
                    return -1
                }
            }, {
                key: "filter",
                value: function(e, t) {
                    var n = [],
                        i = 0,
                        o = !0,
                        a = !1,
                        s = void 0;
                    try {
                        for (var l, c = this[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
                            var u = l.value;
                            Reflect.apply(e, t, [u, i, this]) && n.push(u), i++
                        }
                    } catch (e) {
                        a = !0, s = e
                    } finally {
                        try {
                            o || null == c.return || c.return()
                        } finally {
                            if (a) throw s
                        }
                    }
                    return new r(n)
                }
            }, {
                key: "map",
                value: function(e, t) {
                    var n = [],
                        i = 0,
                        o = !0,
                        a = !1,
                        s = void 0;
                    try {
                        for (var l, c = this[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
                            var u = l.value;
                            n.push([u[0], Reflect.apply(e, t, [u, i, this])]), i++
                        }
                    } catch (e) {
                        a = !0, s = e
                    } finally {
                        try {
                            o || null == c.return || c.return()
                        } finally {
                            if (a) throw s
                        }
                    }
                    return new r(n)
                }
            }, {
                key: "reduce",
                value: function() {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    var n = (0, y._)(t, 2),
                        i = n[0],
                        o = n[1],
                        a = 0,
                        s = null != o ? o : this.at(0),
                        l = !0,
                        c = !1,
                        u = void 0;
                    try {
                        for (var d, f = this[Symbol.iterator](); !(l = (d = f.next()).done); l = !0) {
                            var p = d.value;
                            s = 0 === a && 1 === t.length ? p : Reflect.apply(i, this, [s, p, a, this]), a++
                        }
                    } catch (e) {
                        c = !0, u = e
                    } finally {
                        try {
                            l || null == f.return || f.return()
                        } finally {
                            if (c) throw u
                        }
                    }
                    return s
                }
            }, {
                key: "reduceRight",
                value: function() {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    for (var n = (0, y._)(t, 2), i = n[0], o = n[1], a = null != o ? o : this.at(-1), s = this.size - 1; s >= 0; s--) {
                        var l = this.at(s);
                        a = s === this.size - 1 && 1 === t.length ? l : Reflect.apply(i, this, [a, l, s, this])
                    }
                    return a
                }
            }, {
                key: "toSorted",
                value: function(e) {
                    return new r((0, b._)(this.entries()).sort(e))
                }
            }, {
                key: "toReversed",
                value: function() {
                    for (var e = new r, t = this.size - 1; t >= 0; t--) {
                        var n = this.keyAt(t),
                            i = this.get(n);
                        e.set(n, i)
                    }
                    return e
                }
            }, {
                key: "toSpliced",
                value: function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    var i = (0, b._)(this.entries());
                    return i.splice.apply(i, (0, b._)(t)), new r(i)
                }
            }, {
                key: "slice",
                value: function(e, t) {
                    var n = new r,
                        i = this.size - 1;
                    if (void 0 === e) return n;
                    e < 0 && (e += this.size), void 0 !== t && t > 0 && (i = t - 1);
                    for (var o = e; o <= i; o++) {
                        var a = this.keyAt(o),
                            s = this.get(a);
                        n.set(a, s)
                    }
                    return n
                }
            }, {
                key: "every",
                value: function(e, t) {
                    var r = 0,
                        n = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (var a, s = this[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                            var l = a.value;
                            if (!Reflect.apply(e, t, [l, r, this])) return !1;
                            r++
                        }
                    } catch (e) {
                        i = !0, o = e
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (i) throw o
                        }
                    }
                    return !0
                }
            }, {
                key: "some",
                value: function(e, t) {
                    var r = 0,
                        n = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (var a, s = this[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                            var l = a.value;
                            if (Reflect.apply(e, t, [l, r, this])) return !0;
                            r++
                        }
                    } catch (e) {
                        i = !0, o = e
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (i) throw o
                        }
                    }
                    return !1
                }
            }]), r
        }((0, w._)(Map)), "OrderedDict"), r);

    function Y(e, t) {
        if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
        var r = $(e, t);
        return -1 === r ? void 0 : e[r]
    }

    function $(e, t) {
        var r = e.length,
            n = X(t),
            i = n >= 0 ? n : r + n;
        return i < 0 || i >= r ? -1 : i
    }

    function X(e) {
        return e != e || 0 === e ? 0 : Math.trunc(e)
    }

    function q(e, t) {
        if (e === t) return !0;
        if ((void 0 === e ? "undefined" : (0, g._)(e)) !== "object" || (void 0 === t ? "undefined" : (0, g._)(t)) !== "object" || null == e || null == t) return !1;
        var r = Object.keys(e),
            n = Object.keys(t);
        if (r.length !== n.length) return !1;
        var i = !0,
            o = !1,
            a = void 0;
        try {
            for (var s, l = r[Symbol.iterator](); !(i = (s = l.next()).done); i = !0) {
                var c = s.value;
                if (!Object.prototype.hasOwnProperty.call(t, c) || e[c] !== t[c]) return !1
            }
        } catch (e) {
            o = !0, a = e
        } finally {
            try {
                i || null == l.return || l.return()
            } finally {
                if (o) throw a
            }
        }
        return !0
    }

    function J(e, t) {
        return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING)
    }

    function Q(e, t) {
        return e[1].element && t[1].element ? J(e[1].element, t[1].element) ? -1 : 1 : 0
    }

    function ee(e) {
        return new MutationObserver(function(t) {
            var r = !0,
                n = !1,
                i = void 0;
            try {
                for (var o, a = t[Symbol.iterator](); !(r = (o = a.next()).done); r = !0) {
                    var s = o.value;
                    if ("childList" === s.type) return void e()
                }
            } catch (e) {
                n = !0, i = e
            } finally {
                try {
                    r || null == a.return || a.return()
                } finally {
                    if (n) throw i
                }
            }
        })
    }
    U(Y, "at"), U($, "toSafeIndex"), U(X, "toSafeInteger"), U(function(e) {
        var t = e + "CollectionProvider",
            r = (0, y._)((0, _.createContextScope)(t), 2),
            n = r[0],
            i = r[1],
            o = (0, y._)(n(t, {
                collectionElement: null,
                collectionRef: {
                    current: null
                },
                collectionRefObject: {
                    current: null
                },
                itemMap: new V,
                setItemMap: U(function() {}, "setItemMap")
            }), 2),
            a = o[0],
            s = o[1],
            l = U(function(e) {
                var t = e.state,
                    r = (0, m._)(e, ["state"]);
                return t ? (0, D.jsx)(d, (0, v._)((0, h._)({}, r), {
                    state: t
                })) : (0, D.jsx)(c, (0, h._)({}, r))
            }, "CollectionProvider");
        l.displayName = t;
        var c = U(function(e) {
            var t = R();
            return (0, D.jsx)(d, (0, v._)((0, h._)({}, e), {
                state: t
            }))
        }, "CollectionInit");
        c.displayName = t + "Init";
        var d = U(function(e) {
            var t = e.scope,
                r = e.children,
                n = e.state,
                i = S.useRef(null),
                o = (0, y._)(S.useState(null), 2),
                s = o[0],
                l = A(i, o[1]),
                c = (0, y._)(n, 2),
                u = c[0],
                d = c[1];
            return S.useEffect(function() {
                if (s) {
                    var e = ee(function() {});
                    return e.observe(s, {
                            childList: !0,
                            subtree: !0
                        }),
                        function() {
                            e.disconnect()
                        }
                }
            }, [s]), (0, D.jsx)(a, {
                scope: t,
                itemMap: u,
                setItemMap: d,
                collectionRef: l,
                collectionRefObject: i,
                collectionElement: s,
                children: r
            })
        }, "CollectionProviderImpl");
        d.displayName = t + "Impl";
        var f = e + "CollectionSlot",
            p = O(f),
            b = S.forwardRef(function(e, t) {
                var r = e.scope,
                    n = e.children,
                    i = A(t, s(f, r).collectionRef);
                return (0, D.jsx)(p, {
                    ref: i,
                    children: n
                })
            });
        b.displayName = f;
        var g = e + "CollectionItemSlot",
            w = O(g),
            E = S.forwardRef(function(e, t) {
                var r = e.scope,
                    n = e.children,
                    i = (0, m._)(e, ["scope", "children"]),
                    o = S.useRef(null),
                    a = (0, y._)(S.useState(null), 2),
                    l = a[0],
                    c = A(t, o, a[1]),
                    d = s(g, r).setItemMap,
                    f = S.useRef(i);
                q(f.current, i) || (f.current = i);
                var p = f.current;
                return S.useEffect(function() {
                    return d(function(e) {
                            return l ? e.has(l) ? e.set(l, (0, v._)((0, h._)({}, p), {
                                element: l
                            })).toSorted(Q) : (e.set(l, (0, v._)((0, h._)({}, p), {
                                element: l
                            })), e.toSorted(Q)) : e
                        }),
                        function() {
                            d(function(e) {
                                return l && e.has(l) ? (e.delete(l), new V(e)) : e
                            })
                        }
                }, [l, p, d]), (0, D.jsx)(w, (0, v._)((0, h._)({}, (0, u._)({}, "data-radix-collection-item", "")), {
                    ref: c,
                    children: n
                }))
            });

        function R() {
            return S.useState(new V)
        }

        function P(t) {
            return s(e + "CollectionConsumer", t).itemMap
        }
        return E.displayName = g, U(R, "useInitCollection"), U(P, "useCollection"), [{
            Provider: l,
            Slot: b,
            ItemSlot: E
        }, {
            createCollectionScope: i,
            useCollection: P,
            useInitCollection: R
        }]
    }, "createCollection"), U(q, "shallowEqual"), U(J, "isElementPreceding"), U(Q, "sortByDocumentPosition"), U(ee, "getChildListObserver"), e.s(["createCollection", 0, Z], 75830);
    var et = Object.defineProperty,
        er = S.createContext(void 0);

    function en(e) {
        var t = S.useContext(er);
        return e || t || "ltr"
    }
    et(en, "name", {
        value: "useDirection",
        configurable: !0
    }), e.s(["useDirection", 0, en], 586318)
}, 30030, e => {
    "use strict";
    var t = e.i(540151),
        r = e.i(480388),
        n = e.i(181788),
        i = e.i(499092),
        o = e.i(855111),
        a = e.i(271645),
        s = e.i(843476),
        l = Object.defineProperty,
        c = function(e, t) {
            return l(e, "name", {
                value: t,
                configurable: !0
            })
        };

    function u(e) {
        var l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            u = [];

        function f(t, r) {
            var n = a.createContext(r);
            n.displayName = t + "Context";
            var l = u.length;
            u = (0, o._)(u).concat([r]);
            var d = c(function(t) {
                var r, o = t.scope,
                    c = t.children,
                    u = (0, i._)(t, ["scope", "children"]),
                    d = (null == o || null == (r = o[e]) ? void 0 : r[l]) || n,
                    f = a.useMemo(function() {
                        return u
                    }, Object.values(u));
                return (0, s.jsx)(d.Provider, {
                    value: f,
                    children: c
                })
            }, "Provider");

            function f(i, o) {
                var s, c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    u = c.optional,
                    d = (null == o || null == (s = o[e]) ? void 0 : s[l]) || n,
                    f = a.useContext(d);
                if (f) return f;
                if (void 0 !== r) return r;
                if (!(void 0 !== u && u)) throw Error("`".concat(i, "` must be used within `").concat(t, "`"))
            }
            return d.displayName = t + "Provider", c(f, "useContext"), [d, f]
        }
        c(f, "createContext");
        var p = c(function() {
            var i = u.map(function(e) {
                return a.createContext(e)
            });
            return c(function(o) {
                var s = (null == o ? void 0 : o[e]) || i;
                return a.useMemo(function() {
                    return (0, t._)({}, "__scope".concat(e), (0, n._)((0, r._)({}, o), (0, t._)({}, e, s)))
                }, [o, s])
            }, "useScope")
        }, "createScope");
        return p.scopeName = e, [f, d.apply(void 0, [p].concat((0, o._)(l)))]
    }

    function d() {
        for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
        var o = n[0];
        if (1 === n.length) return o;
        var s = c(function() {
            var e = n.map(function(e) {
                return {
                    useScope: e(),
                    scopeName: e.scopeName
                }
            });
            return c(function(n) {
                var i = e.reduce(function(e, t) {
                    var i = t.useScope,
                        o = t.scopeName,
                        a = i(n)["__scope".concat(o)];
                    return (0, r._)({}, e, a)
                }, {});
                return a.useMemo(function() {
                    return (0, t._)({}, "__scope".concat(o.scopeName), i)
                }, [i])
            }, "useComposedScopes")
        }, "createScope");
        return s.scopeName = o.scopeName, s
    }
    c(function(e, t) {
        var r = a.createContext(t);
        r.displayName = e + "Context";
        var n = c(function(e) {
            var t = e.children,
                n = (0, i._)(e, ["children"]),
                o = a.useMemo(function() {
                    return n
                }, Object.values(n));
            return (0, s.jsx)(r.Provider, {
                value: o,
                children: t
            })
        }, "Provider");

        function o(n) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = i.optional,
                s = a.useContext(r);
            if (s) return s;
            if (void 0 !== t) return t;
            if (!(void 0 !== o && o)) throw Error("`".concat(n, "` must be used within `").concat(e, "`"))
        }
        return n.displayName = e + "Provider", c(o, "useContext"), [n, o]
    }, "createContext"), c(u, "createContextScope"), c(d, "composeContextScopes"), e.s(["createContextScope", 0, u])
}, 610772, e => {
    "use strict";
    var t, r = e.i(317608),
        n = e.i(271645),
        i = (null == (t = globalThis) ? void 0 : t.document) ? n.useLayoutEffect : function() {},
        o = Object.defineProperty,
        a = n[" useId ".trim().toString()] || function() {},
        s = 0;

    function l(e) {
        var t = (0, r._)(n.useState(a()), 2),
            o = t[0],
            l = t[1];
        return i(function() {
            e || l(function(e) {
                return null != e ? e : String(s++)
            })
        }, [e]), e || (o ? "radix-".concat(o) : "")
    }
    o(l, "name", {
        value: "useId",
        configurable: !0
    }), e.s(["useId", 0, l], 610772)
}, 296626, e => {
    "use strict";
    var t, r = e.i(317608),
        n = e.i(271645),
        i = (null == (t = globalThis) ? void 0 : t.document) ? n.useLayoutEffect : function() {},
        o = Object.defineProperty,
        a = function(e, t) {
            return o(e, "name", {
                value: t,
                configurable: !0
            })
        };

    function s(e, t) {
        return n.useReducer(function(e, r) {
            var n = t[e][r];
            return null != n ? n : e
        }, e)
    }
    a(s, "useStateMachine");
    var l = a(function(e) {
        var t = e.present,
            r = e.children,
            i = c(t),
            o = "function" == typeof r ? r({
                present: i.isPresent
            }) : n.Children.only(r),
            a = d(i.ref, p(o));
        return "function" == typeof r || i.isPresent ? n.cloneElement(o, {
            ref: a
        }) : null
    }, "Presence");

    function c(e) {
        var t = (0, r._)(n.useState(), 2),
            o = t[0],
            l = t[1],
            c = n.useRef(null),
            u = n.useRef(e),
            d = n.useRef("none"),
            p = n.useRef(void 0),
            h = e ? "mounted" : "unmounted",
            v = (0, r._)(s(h, {
                mounted: {
                    UNMOUNT: "unmounted",
                    ANIMATION_OUT: "unmountSuspended"
                },
                unmountSuspended: {
                    MOUNT: "mounted",
                    ANIMATION_END: "unmounted"
                },
                unmounted: {
                    MOUNT: "mounted"
                }
            }), 2),
            m = v[0],
            y = v[1];
        return n.useEffect(function() {
            if ("mounted" === m) {
                var e;
                d.current = null != (e = p.current) ? e : f(c.current), p.current = void 0
            } else d.current = "none"
        }, [m]), i(function() {
            var t = c.current,
                r = u.current;
            if (r !== e) {
                var n = d.current,
                    i = f(t);
                e ? (p.current = i, y("MOUNT")) : "none" === i || (null == t ? void 0 : t.display) === "none" ? y("UNMOUNT") : r && n !== i ? y("ANIMATION_OUT") : y("UNMOUNT"), u.current = e
            }
        }, [e, y]), i(function() {
            if (o) {
                var e, t, r = null != (e = o.ownerDocument.defaultView) ? e : window,
                    n = a(function(e) {
                        var n = f(c.current).includes(CSS.escape(e.animationName));
                        if (e.target === o && n && (y("ANIMATION_END"), !u.current)) {
                            var i = o.style.animationFillMode;
                            o.style.animationFillMode = "forwards", t = r.setTimeout(function() {
                                "forwards" === o.style.animationFillMode && (o.style.animationFillMode = i)
                            })
                        }
                    }, "handleAnimationEnd"),
                    i = a(function(e) {
                        e.target === o && (d.current = f(c.current))
                    }, "handleAnimationStart");
                return o.addEventListener("animationstart", i), o.addEventListener("animationcancel", n), o.addEventListener("animationend", n),
                    function() {
                        r.clearTimeout(t), o.removeEventListener("animationstart", i), o.removeEventListener("animationcancel", n), o.removeEventListener("animationend", n)
                    }
            }
            y("ANIMATION_END")
        }, [o, y]), {
            isPresent: ["mounted", "unmountSuspended"].includes(m),
            ref: n.useCallback(function(e) {
                if (e) {
                    var t = getComputedStyle(e);
                    c.current = t, p.current = f(t)
                } else c.current = null;
                l(e)
            }, [])
        }
    }

    function u(e, t) {
        if ("function" == typeof e) return e(t);
        null != e && (e.current = t)
    }

    function d() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        var i = n.useRef(t);
        return i.current = t, n.useCallback(function(e) {
            var t = i.current,
                r = !1,
                n = t.map(function(t) {
                    var n = u(t, e);
                    return r || "function" != typeof n || (r = !0), n
                });
            if (r) return function() {
                for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    "function" == typeof r ? r() : u(t[e], null)
                }
            }
        }, [])
    }

    function f(e) {
        return (null == e ? void 0 : e.animationName) || "none"
    }

    function p(e) {
        var t, r, n = null == (t = Object.getOwnPropertyDescriptor(e.props, "ref")) ? void 0 : t.get,
            i = n && "isReactWarning" in n && n.isReactWarning;
        return i ? e.ref : (i = (n = null == (r = Object.getOwnPropertyDescriptor(e, "ref")) ? void 0 : r.get) && "isReactWarning" in n && n.isReactWarning) ? e.props.ref : e.props.ref || e.ref
    }
    a(c, "usePresence"), a(u, "setRef"), a(d, "useStableComposedRefs"), a(f, "getAnimationName"), a(p, "getElementRef"), e.s(["Presence", 0, l], 296626)
}, 207670, e => {
    "use strict";
    var t = e.i(524906);

    function r() {
        for (var e, r, n = 0, i = "", o = arguments.length; n < o; n++)(e = arguments[n]) && (r = function e(r) {
            var n, i, o = "";
            if ("string" == typeof r || "number" == typeof r) o += r;
            else if ("object" == (void 0 === r ? "undefined" : (0, t._)(r)))
                if (Array.isArray(r)) {
                    var a = r.length;
                    for (n = 0; n < a; n++) r[n] && (i = e(r[n])) && (o && (o += " "), o += i)
                } else
                    for (i in r) r[i] && (o && (o += " "), o += i);
            return o
        }(e)) && (i && (i += " "), i += r);
        return i
    }
    e.s(["clsx", 0, r, "default", 0, r])
}, 683239, e => {
    "use strict";
    var t = e.i(480388),
        r = e.i(181788),
        n = e.i(544821),
        i = ["p", "br", "span", "div", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "a", "img", "table", "colgroup", "col", "thead", "tbody", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "iframe"],
        o = {
            "*": ["class", "style", "data-inline-element", "data-id", "data-type", "data-slug", "data-name", "data-icon", "data-color", "data-rarity", "data-game-code", "data-link-url", "data-tooltip", "data-callout", "data-callout-type", "data-callout-title", "data-spoiler-block", "data-spoiler-label", "data-spoiler-open", "data-spoiler-inline", "data-video-embed", "data-video-provider", "data-video-id", "data-aspect-ratio", "data-caption", "data-alignment", "data-section-divider", "data-section-divider-title", "data-tabs", "data-tab-list", "data-tab", "data-tab-panel", "data-tab-panels", "data-active-tab", "data-label", "data-tab-index", "data-accordion", "data-accordion-item", "data-title", "data-open", "data-variant", "data-accordion-collapse", "data-columns", "data-column", "data-column-count", "data-guide-card", "data-guide-url", "data-guide-title", "data-guide-description", "data-guide-icon", "data-rte-icon", "data-fa-icon"],
            a: ["href", "target", "rel"],
            span: ["class", "style"],
            img: ["src", "alt", "width", "height"],
            iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen"],
            td: ["colspan", "rowspan", "class", "style"],
            th: ["colspan", "rowspan", "class", "style"]
        },
        a = /^\d+(\.\d+)?(px|em|rem|%)?$/,
        s = {
            "*": {
                color: [/^#[0-9a-f]{3,6}$/i, /^rgb\(\d+,\s*\d+,\s*\d+\)$/],
                "background-color": [/^#[0-9a-f]{3,6}$/i, /^rgb\(\d+,\s*\d+,\s*\d+\)$/],
                "font-weight": [/^(bold|normal|\d+)$/]
            },
            col: {
                width: [a],
                "min-width": [a]
            },
            colgroup: {
                width: [a],
                "min-width": [a]
            }
        };

    function l(e) {
        return e && "string" == typeof e ? (0, n.default)(e, {
            allowedTags: i,
            allowedAttributes: o,
            allowedSchemes: ["http", "https"],
            allowedSchemesAppliedToAttributes: ["href", "src", "data-link-url"],
            allowedStyles: s,
            allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
            transformTags: {
                a: function(e, n) {
                    return (n.href || "").startsWith("http") ? {
                        tagName: e,
                        attribs: (0, r._)((0, t._)({}, n), {
                            target: "_blank",
                            rel: "noopener noreferrer"
                        })
                    } : {
                        tagName: e,
                        attribs: n
                    }
                }
            }
        }) : ""
    }
    e.s(["createSafeHtml", 0, function(e) {
        return {
            __html: l(e)
        }
    }, "decodeHtmlEntities", 0, function(e) {
        return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    }, "sanitizeGameContent", 0, l, "sanitizeStrict", 0, function(e) {
        return e && "string" == typeof e ? (0, n.default)(e, {
            allowedTags: ["strong", "b", "em", "i", "br", "span"],
            allowedAttributes: {
                span: ["class"]
            }
        }) : ""
    }, "stripHtml", 0, function(e) {
        return e && "string" == typeof e ? (0, n.default)(e, {
            allowedTags: [],
            allowedAttributes: {}
        }) : ""
    }])
}, 419763, e => {
    "use strict";
    var t = {
            AFK_JOURNEY: "afk-journey",
            ARKNIGHTS_ENDFIELD: "arknights-endfield",
            CHAOS_ZERO_NIGHTMARE: "chaos-zero-nightmare",
            COUNTER_SIDE: "counter-side",
            ETHERIA_RESTART: "etheria-restart",
            GENSHIN_IMPACT: "genshin-impact",
            LIMBUS_COMPANY: "limbus-company",
            LOST_SWORD: "lost-sword",
            NEVERNESS_TO_EVERNESS: "neverness-to-everness",
            NIKKE: "nikke",
            PERSONA_5X: "persona-5x",
            RE1999: "re1999",
            RESONANCE_SOLSTICE: "resonance-solstice",
            SILVER_AND_BLOOD: "silver-and-blood",
            SILVER_PALACE: "silver-palace",
            STAR_RAIL: "star-rail",
            SWORD_X_STAFF: "sword-x-staff",
            TRICKCAL: "trickcal",
            WUTHERING_WAVES: "wuthering-waves",
            ZENLESS: "zenless"
        },
        r = {
            "afk-journey": {
                code: "afk-journey",
                name: "AFK Journey",
                shortName: "AFK Journey",
                basePath: "/afk-journey",
                description: "AFK Journey is an idle RPG featuring heroes from the AFK Arena universe in an open-world adventure with strategic combat.",
                publisher: "Farlight Games / Lilith Games",
                developer: "Farlight Games",
                website: "https://afkjourney.com",
                globalOrder: 1,
                isActive: !0,
                iconExtension: ".png",
                cdnSlug: "afk"
            },
            "arknights-endfield": {
                code: "arknights-endfield",
                name: "Arknights: Endfield",
                shortName: "AKE",
                basePath: "/arknights-endfield",
                description: "Arknights: Endfield is an open-world action RPG and real-time strategy hybrid developed by Hypergryph, set in the Arknights universe on the planet Talos-II.",
                publisher: "Hypergryph / Gryphline",
                developer: "Hypergryph",
                website: "https://endfield.hypergryph.com",
                globalOrder: 18,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "ake",
                coverSlug: "ae",
                cdnFolder: "arknights-endfield"
            },
            "chaos-zero-nightmare": {
                code: "chaos-zero-nightmare",
                name: "Chaos Zero Nightmare",
                shortName: "CZN",
                basePath: "/chaos-zero-nightmare",
                description: "Chaos Zero Nightmare is a card-based tactical RPG featuring deck building, character partners, and strategic combat.",
                globalOrder: 19,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "czn",
                coverSlug: "chaos",
                cdnFolder: "chaos"
            },
            "counter-side": {
                code: "counter-side",
                name: "Counter Side",
                shortName: "Counter Side",
                basePath: "/counter-side",
                description: "Counter:Side is a side-scrolling tactical RPG featuring strategic unit deployment, PvP battles, and deep storylines.",
                publisher: "Nexon",
                developer: "Studiobside",
                website: "https://counterside.com",
                globalOrder: 3,
                isActive: !0,
                iconExtension: ".png",
                cdnSlug: "cs"
            },
            "etheria-restart": {
                code: "etheria-restart",
                name: "Etheria: Restart",
                shortName: "ER",
                basePath: "/etheria-restart",
                description: "Etheria: Restart is a sci-fi RPG featuring strategic combat with customizable shells and matrix modules.",
                publisher: "Smilegate",
                developer: "Smilegate RPG",
                website: "https://etheria-restart.com",
                globalOrder: 13,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "etheria"
            },
            "genshin-impact": {
                code: "genshin-impact",
                name: "Genshin Impact",
                shortName: "Genshin",
                basePath: "/genshin-impact",
                description: "Genshin Impact is an open-world action RPG developed by HoYoverse, where players explore the fantasy world of Teyvat, command a party of elementally-attuned characters, and battle across seven nations.",
                publisher: "HoYoverse",
                developer: "HoYoverse",
                website: "https://genshin.hoyoverse.com",
                globalOrder: 3,
                isActive: !1,
                isPreLaunch: !0,
                iconExtension: ".webp"
            },
            "limbus-company": {
                code: "limbus-company",
                name: "Limbus Company",
                shortName: "Limbus Company",
                basePath: "/limbus-company",
                description: "Limbus Company is a turn-based strategy RPG Gacha Game developed and published by Project Moon.",
                publisher: "Project Moon",
                developer: "Project Moon",
                website: "https://limbuscompany.com",
                globalOrder: 4,
                isActive: !0,
                iconExtension: ".webp",
                coverSlug: "limbus"
            },
            "lost-sword": {
                code: "lost-sword",
                name: "Lost Sword",
                shortName: "Lost Sword",
                basePath: "/lost-sword",
                description: "Lost Sword is a 2D anime-style gacha RPG developed by Code Cat and published by WeMadeConnect, blending Arthurian legends with isekai tropes and idle combat mechanics.",
                publisher: "WeMadeConnect",
                developer: "Code Cat",
                website: "https://lostsword.wemade.com",
                globalOrder: 5,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "lost"
            },
            "neverness-to-everness": {
                code: "neverness-to-everness",
                name: "Neverness to Everness",
                shortName: "NTE",
                basePath: "/neverness-to-everness",
                description: "Neverness to Everness is a supernatural urban open-world RPG developed by Hotta Studio, a subsidiary of Perfect World Games. Navigate an Anomaly-filled city using extraordinary Esper abilities.",
                publisher: "Perfect World Games",
                developer: "Hotta Studio",
                website: "https://nte.perfectworld.com/en/",
                globalOrder: 6,
                isActive: !0,
                iconExtension: ".webp",
                cdnFolder: "nte",
                coverSlug: "nte"
            },
            nikke: {
                code: "nikke",
                name: "NIKKE: Goddess of Victory",
                shortName: "NIKKE",
                basePath: "/nikke",
                description: "NIKKE is a sci-fi shooter RPG where you command a squad of android soldiers called NIKKEs to reclaim the surface from alien invaders known as Raptures.",
                publisher: "Level Infinite",
                developer: "Shift Up",
                website: "https://nikke-en.com",
                globalOrder: 7,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "nikke"
            },
            "persona-5x": {
                code: "persona-5x",
                name: "Persona 5: The Phantom X",
                shortName: "P5X",
                basePath: "/persona-5x",
                description: "Persona 5: The Phantom X is a mobile RPG based on the Persona franchise featuring turn-based combat, Persona summoning, and strategic team building.",
                publisher: "Perfect World Games",
                developer: "Perfect World Games / Black Wings",
                website: "https://p5x.perfectworld.com",
                globalOrder: 11,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "persona"
            },
            re1999: {
                code: "re1999",
                name: "Reverse: 1999",
                shortName: "R1999",
                basePath: "/re1999",
                description: "Prydwen.gg is a wiki for Reverse: 1999.",
                publisher: "Bluepoch",
                developer: "Bluepoch",
                website: "https://re1999.bluepoch.com/",
                globalOrder: 8,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "reverse",
                cdnFolder: "re1999"
            },
            "resonance-solstice": {
                code: "resonance-solstice",
                name: "Resonance: Solstice",
                shortName: "Reso",
                basePath: "/resonance-solstice",
                description: "Resonance: Solstice is a tactical RPG featuring card-based combat, train management, and real-time trading across interconnected stations.",
                publisher: "UjoyGames",
                developer: "UjoyGames",
                website: "https://reso.ujoygames.com",
                globalOrder: 14,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "reso"
            },
            "silver-and-blood": {
                code: "silver-and-blood",
                name: "Silver and Blood",
                shortName: "SNB",
                basePath: "/silver-and-blood",
                description: "Silver and Blood is a real-time strategy RPG featuring vampires, werewolves, and supernatural beings in a dark fantasy setting.",
                publisher: "NXONEX",
                developer: "NXONEX",
                website: "https://silverandblood.nxonex.com",
                globalOrder: 9,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "silver"
            },
            "silver-palace": {
                code: "silver-palace",
                name: "Silver Palace",
                shortName: "Silver Palace",
                basePath: "/silver-palace",
                description: "Silver Palace is an upcoming character-collection RPG featuring Reactor-Attribute-driven combat, Motives, Epiphanies, and Implements gear systems.",
                globalOrder: 21,
                isActive: !1,
                isPreLaunch: !0,
                iconExtension: ".webp"
            },
            "star-rail": {
                code: "star-rail",
                name: "Honkai Star Rail",
                shortName: "HSR",
                basePath: "/star-rail",
                description: "Honkai Star Rail is a space fantasy turn-based RPG by HoYoverse featuring strategic combat and deep character progression.",
                publisher: "HoYoverse",
                developer: "miHoYo",
                website: "https://hsr.hoyoverse.com",
                globalOrder: 17,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "hsr",
                cdnFolder: "honkai-star-rail"
            },
            "sword-x-staff": {
                code: "sword-x-staff",
                name: "Sword x Staff",
                shortName: "SxS",
                basePath: "/sword-x-staff",
                description: "Sword x Staff is a class-based RPG featuring Technique and Charm skill systems, Fantomon companions, and a roster of Companions across multiple classes.",
                globalOrder: 20,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "sword-staff",
                coverSlug: "sword",
                cdnFolder: "sword-staff"
            },
            trickcal: {
                code: "trickcal",
                name: "Trickcal Re:vive",
                shortName: "Trickcal",
                basePath: "/trickcal",
                description: "Trickcal is an autobattler where you build teams around elements and races to conquer various PVE and PVP content.",
                publisher: "Actoz Soft",
                developer: "Actoz Soft",
                website: "https://trickcal.com",
                globalOrder: 10,
                isActive: !0,
                iconExtension: ".webp"
            },
            "wuthering-waves": {
                code: "wuthering-waves",
                name: "Wuthering Waves",
                shortName: "WuWa",
                basePath: "/wuthering-waves",
                description: "Wuthering Waves is an open-world action RPG by Kuro Games featuring fast-paced combat, echo collection, and deep character builds.",
                publisher: "Kuro Games",
                developer: "Kuro Games",
                website: "https://wutheringwaves.kurogames.com",
                globalOrder: 16,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "wuwa",
                coverSlug: "ww",
                cdnFolder: "wuthering-waves"
            },
            zenless: {
                code: "zenless",
                name: "Zenless Zone Zero",
                shortName: "ZZZ",
                basePath: "/zenless",
                description: "Zenless Zone Zero is an urban fantasy action RPG developed by miHoYo/HoYoverse featuring fast-paced combat, stylish characters, and strategic team building.",
                publisher: "HoYoverse",
                developer: "miHoYo",
                website: "https://zenless.hoyoverse.com",
                globalOrder: 15,
                isActive: !0,
                iconExtension: ".webp",
                cdnSlug: "zzz",
                cdnFolder: "zenless-zone-zero"
            }
        };
    Object.values(t), Object.values(t), Object.fromEntries(Object.keys(r).map(function(e) {
        return [e, {
            name: r[e].name,
            code: r[e].code,
            description: r[e].description,
            isActive: r[e].isActive
        }]
    })), Object.fromEntries(Object.keys(r).map(function(e) {
        return [e, r[e].iconExtension]
    })), e.s(["GAME_CODES", 0, t, "GAME_PATHS", 0, t], 419763)
}]);