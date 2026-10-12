(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 266027, e => {
    "use strict";
    var t, r, n, i, s, a, o, u, l, c, h, d, f, _, v, p, y, b, w, k, g, R, m, S, E = e.i(317608),
        O = e.i(912598),
        T = e.i(271645),
        C = T.createContext(!1);
    C.Provider, e.i(843476);
    var M = T.createContext((t = !1, {
            clearReset: function() {
                t = !1
            },
            reset: function() {
                t = !0
            },
            isReset: function() {
                return t
            }
        })),
        Q = e.i(619273),
        A = function(e, t, r) {
            var n = (null == r ? void 0 : r.state.error) && "function" == typeof e.throwOnError ? (0, Q.shouldThrowError)(e.throwOnError, [r.state.error, r]) : e.throwOnError;
            (e.suspense || n) && !t.isReset() && (e.retryOnMount = !1)
        },
        U = function(e) {
            T.useEffect(function() {
                e.clearReset()
            }, [e])
        },
        W = function(e) {
            var t = e.result,
                r = e.errorResetBoundary,
                n = e.throwOnError,
                i = e.query,
                s = e.suspense;
            return t.isError && !r.isReset() && !t.isFetching && i && (s && void 0 === t.data || (0, Q.shouldThrowError)(n, [t.error, i]))
        },
        P = e.i(855111),
        D = function(e) {
            if (e.suspense) {
                var t = function(e) {
                        return "static" === e ? e : Math.max(null != e ? e : 1e3, 1e3)
                    },
                    r = e.staleTime;
                e.staleTime = "function" == typeof r ? function() {
                    for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                    return t(r.apply(void 0, (0, P._)(n)))
                } : t(r), "number" == typeof e.gcTime && (e.gcTime = Math.max(e.gcTime, 1e3))
            }
        },
        V = e.i(540143),
        B = e.i(381772),
        F = e.i(754452),
        j = e.i(229032),
        x = e.i(567928),
        L = e.i(523474),
        N = e.i(203023),
        H = e.i(903150),
        I = e.i(61106),
        q = e.i(193706),
        z = e.i(912037),
        K = e.i(342527),
        Y = e.i(480388),
        G = e.i(181788),
        J = e.i(180166),
        X = e.i(273911),
        Z = e.i(915823),
        $ = e.i(601774),
        ee = e.i(286491),
        et = (r = new WeakMap, n = new WeakMap, i = new WeakMap, s = new WeakMap, a = new WeakMap, o = new WeakMap, u = new WeakMap, l = new WeakMap, c = new WeakMap, h = new WeakMap, d = new WeakMap, f = new WeakMap, _ = new WeakMap, v = new WeakMap, p = new WeakSet, y = new WeakSet, b = new WeakSet, w = new WeakSet, k = new WeakSet, g = new WeakSet, R = new WeakSet, m = new WeakSet, S = new WeakSet, function(e) {
            function t(e, E) {
                var O;
                return (0, F._)(this, t), O = (0, B._)(this, t), (0, H._)(O, p), (0, H._)(O, y), (0, H._)(O, b), (0, H._)(O, w), (0, H._)(O, k), (0, H._)(O, g), (0, H._)(O, R), (0, H._)(O, m), (0, H._)(O, S), (0, x._)(O, r, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, n, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, i, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, s, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, a, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, o, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, u, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, l, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, c, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, h, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, d, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, f, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, _, {
                    writable: !0,
                    value: void 0
                }), (0, x._)(O, v, {
                    writable: !0,
                    value: new Set
                }), O.options = E, (0, L._)(O, r, e), (0, L._)(O, u, null), O.bindMethods(), O.setOptions(E), O
            }
            return (0, z._)(t, e), (0, I._)(t, [{
                key: "bindMethods",
                value: function() {
                    this.refetch = this.refetch.bind(this)
                }
            }, {
                key: "onSubscribe",
                value: function() {
                    1 === this.listeners.size && ((0, j._)(this, n).addObserver(this), er((0, j._)(this, n), this.options) ? (0, N._)(this, p, ea).call(this) : this.updateResult(), (0, N._)(this, g, eh).call(this))
                }
            }, {
                key: "onUnsubscribe",
                value: function() {
                    this.hasListeners() || this.destroy()
                }
            }, {
                key: "shouldFetchOnReconnect",
                value: function() {
                    return en((0, j._)(this, n), this.options, this.options.refetchOnReconnect)
                }
            }, {
                key: "shouldFetchOnWindowFocus",
                value: function() {
                    return en((0, j._)(this, n), this.options, this.options.refetchOnWindowFocus)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.listeners = new Set, (0, N._)(this, R, ed).call(this), (0, N._)(this, m, ef).call(this), (0, j._)(this, n).removeObserver(this)
                }
            }, {
                key: "setOptions",
                value: function(e) {
                    var t = this.options,
                        i = (0, j._)(this, n);
                    if (this.options = (0, j._)(this, r).defaultQueryOptions(e), void 0 !== this.options.enabled && "boolean" != typeof this.options.enabled && "function" != typeof this.options.enabled && "boolean" != typeof(0, Q.resolveQueryValue)(this.options.enabled, (0, j._)(this, n))) throw Error("Expected enabled to be a boolean or a callback that returns a boolean");
                    (0, N._)(this, S, e_).call(this), (0, j._)(this, n).setOptions(this.options), t._defaulted && !(0, Q.shallowEqualObjects)(this.options, t) && (0, j._)(this, r).getQueryCache().notify({
                        type: "observerOptionsUpdated",
                        query: (0, j._)(this, n),
                        observer: this
                    });
                    var s = this.hasListeners();
                    s && ei((0, j._)(this, n), i, this.options, t) && (0, N._)(this, p, ea).call(this), this.updateResult(), s && ((0, j._)(this, n) !== i || (0, Q.resolveQueryValue)(this.options.enabled, (0, j._)(this, n)) !== (0, Q.resolveQueryValue)(t.enabled, (0, j._)(this, n)) || (0, Q.resolveQueryValue)(this.options.staleTime, (0, j._)(this, n)) !== (0, Q.resolveQueryValue)(t.staleTime, (0, j._)(this, n))) && (0, N._)(this, b, eu).call(this);
                    var a = (0, N._)(this, w, el).call(this);
                    s && ((0, j._)(this, n) !== i || (0, Q.resolveQueryValue)(this.options.enabled, (0, j._)(this, n)) !== (0, Q.resolveQueryValue)(t.enabled, (0, j._)(this, n)) || a !== (0, j._)(this, _)) && (0, N._)(this, k, ec).call(this, a)
                }
            }, {
                key: "getOptimisticResult",
                value: function(e) {
                    var t = (0, j._)(this, r).getQueryCache().build((0, j._)(this, r), e),
                        i = this.createResult(t, e);
                    return (0, Q.shallowEqualObjects)(this.getCurrentResult(), i) || ((0, L._)(this, s, i), (0, L._)(this, o, this.options), (0, L._)(this, a, (0, j._)(this, n).state)), i
                }
            }, {
                key: "getCurrentResult",
                value: function() {
                    return (0, j._)(this, s)
                }
            }, {
                key: "trackResult",
                value: function(e, t) {
                    var r = this;
                    return new Proxy(e, {
                        get: function(e, n) {
                            return r.trackProp(n), null == t || t(n), Reflect.get(e, n)
                        }
                    })
                }
            }, {
                key: "trackProp",
                value: function(e) {
                    (0, j._)(this, v).add(e)
                }
            }, {
                key: "getCurrentQuery",
                value: function() {
                    return (0, j._)(this, n)
                }
            }, {
                key: "refetch",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0,
                        t = (0, E._)([e], 1)[0],
                        r = void 0 === t ? {} : t,
                        n = ((0, K._)(r), (0, q._)({}, r));
                    return this.fetch((0, Y._)({}, n))
                }
            }, {
                key: "fetchOptimistic",
                value: function(e) {
                    var t, n = this,
                        i = (0, j._)(this, r).defaultQueryOptions(e),
                        s = (0, j._)(this, r).getQueryCache().build((0, j._)(this, r), i),
                        a = function() {},
                        o = new Promise(function(e) {
                            t = e, a = (0, j._)(n, r).getQueryCache().subscribe(function(t) {
                                "updated" === t.type && t.query.queryHash === s.queryHash && void 0 !== s.state.data && (a(), e(n.createResult(s, i)))
                            })
                        });
                    return Promise.race([s.fetch().then(function() {
                        var e = n.createResult(s, i);
                        return null == t || t(e), e
                    }).finally(function() {
                        a()
                    }), o])
                }
            }, {
                key: "fetch",
                value: function(e) {
                    var t, r = this;
                    return (0, N._)(this, p, ea).call(this, (0, G._)((0, Y._)({}, e), {
                        cancelRefetch: null == (t = e.cancelRefetch) || t
                    })).then(function() {
                        return r.updateResult(), (0, j._)(r, s)
                    })
                }
            }, {
                key: "createResult",
                value: function(e, t) {
                    var r, d, f, _ = (0, j._)(this, n),
                        v = this.options,
                        p = (0, j._)(this, s),
                        y = (0, j._)(this, a),
                        b = (0, j._)(this, o),
                        w = e !== _ ? e.state : (0, j._)(this, i),
                        k = e.state,
                        g = (0, Y._)({}, k),
                        R = !1;
                    if (t._optimisticResults) {
                        var m = this.hasListeners(),
                            S = !m && er(e, t),
                            E = m && ei(e, _, t, v);
                        (S || E) && (g = (0, Y._)({}, g, (0, ee.fetchState)(k.data, e.options))), "isRestoring" === t._optimisticResults && (g.fetchStatus = "idle")
                    }
                    var O = g.error,
                        T = g.errorUpdatedAt,
                        C = g.status;
                    r = g.data;
                    var M = !1;
                    if (void 0 !== t.placeholderData && void 0 === r && "pending" === C && ((null == p ? void 0 : p.isPlaceholderData) && t.placeholderData === (null == b ? void 0 : b.placeholderData) ? (f = p.data, M = !0) : f = "function" == typeof t.placeholderData ? t.placeholderData(null == (d = (0, j._)(this, h)) ? void 0 : d.state.data, (0, j._)(this, h)) : t.placeholderData, void 0 !== f && (C = "success", r = (0, Q.replaceData)(null == p ? void 0 : p.data, f, t), R = !0)), t.select && void 0 !== r && !M)
                        if (p && r === (null == y ? void 0 : y.data) && t.select === (0, j._)(this, l)) r = (0, j._)(this, c);
                        else try {
                            (0, L._)(this, l, t.select), r = t.select(r), r = (0, Q.replaceData)(null == p ? void 0 : p.data, r, t), (0, L._)(this, c, r), (0, L._)(this, u, null)
                        } catch (e) {
                            (0, L._)(this, u, e)
                        } else void 0 === r && (0, L._)(this, u, null);
                    (0, j._)(this, u) && (O = (0, j._)(this, u), r = (0, j._)(this, c), T = Date.now(), C = "error", R = !1);
                    var A = "fetching" === g.fetchStatus,
                        U = "pending" === C,
                        W = "error" === C,
                        P = U && A,
                        D = void 0 !== r;
                    return {
                        status: C,
                        fetchStatus: g.fetchStatus,
                        isPending: U,
                        isSuccess: "success" === C,
                        isError: W,
                        isInitialLoading: P,
                        isLoading: P,
                        data: r,
                        dataUpdatedAt: g.dataUpdatedAt,
                        error: O,
                        errorUpdatedAt: T,
                        failureCount: g.fetchFailureCount,
                        failureReason: g.fetchFailureReason,
                        errorUpdateCount: g.errorUpdateCount,
                        isFetched: e.isFetched(),
                        isFetchedAfterMount: g.dataUpdateCount > w.dataUpdateCount || g.errorUpdateCount > w.errorUpdateCount,
                        isFetching: A,
                        isRefetching: A && !U,
                        isLoadingError: W && !D,
                        isPaused: "paused" === g.fetchStatus,
                        isPlaceholderData: R,
                        isRefetchError: W && D,
                        isStale: es(e, t),
                        refetch: this.refetch,
                        isEnabled: !1 !== (0, Q.resolveQueryValue)(t.enabled, e)
                    }
                }
            }, {
                key: "updateResult",
                value: function() {
                    var e = this,
                        t = (0, j._)(this, s),
                        i = this.createResult((0, j._)(this, n), this.options);
                    if ((0, L._)(this, a, (0, j._)(this, n).state), (0, L._)(this, o, this.options), void 0 !== (0, j._)(this, a).data && (0, L._)(this, h, (0, j._)(this, n)), !(0, Q.shallowEqualObjects)(i, t)) {
                        (0, L._)(this, s, i);
                        var u = function() {
                            if (!t) return !0;
                            var r = e.options.notifyOnChangeProps,
                                n = "function" == typeof r ? r() : r;
                            if ("all" === n || !n && !(0, j._)(e, v).size) return !0;
                            var i = new Set(null != n ? n : (0, j._)(e, v));
                            return e.options.throwOnError && i.add("error"), Object.keys((0, j._)(e, s)).some(function(r) {
                                return (0, j._)(e, s)[r] !== t[r] && i.has(r)
                            })
                        }();
                        V.notifyManager.batch(function() {
                            u && e.listeners.forEach(function(t) {
                                t((0, j._)(e, s))
                            }), (0, j._)(e, r).getQueryCache().notify({
                                query: (0, j._)(e, n),
                                type: "observerResultsUpdated"
                            })
                        })
                    }
                }
            }, {
                key: "onQueryUpdate",
                value: function() {
                    this.updateResult(), this.hasListeners() && (0, N._)(this, g, eh).call(this)
                }
            }]), t
        }(Z.Subscribable));

    function er(e, t) {
        return !1 !== (0, Q.resolveQueryValue)(t.enabled, e) && void 0 === e.state.data && ("error" !== e.state.status || !1 !== (0, Q.resolveQueryValue)(t.retryOnMount, e)) || void 0 !== e.state.data && en(e, t, t.refetchOnMount)
    }

    function en(e, t, r) {
        if (!1 !== (0, Q.resolveQueryValue)(t.enabled, e) && "static" !== (0, Q.resolveQueryValue)(t.staleTime, e)) {
            var n = (0, Q.resolveQueryValue)(r, e);
            return "always" === n || !1 !== n && es(e, t)
        }
        return !1
    }

    function ei(e, t, r, n) {
        return (e !== t || !1 === (0, Q.resolveQueryValue)(n.enabled, e)) && (!r.suspense || "error" !== e.state.status) && es(e, r)
    }

    function es(e, t) {
        return !1 !== (0, Q.resolveQueryValue)(t.enabled, e) && e.isStaleByTime((0, Q.resolveQueryValue)(t.staleTime, e))
    }

    function ea(e) {
        (0, N._)(this, S, e_).call(this);
        var t = (0, j._)(this, n).fetch(this.options, e);
        return (null == e ? void 0 : e.throwOnError) || (t = t.catch(Q.noop)), t
    }

    function eo(e) {
        return !(0, X.isServer)() && !1 !== (0, Q.resolveQueryValue)(this.options.enabled, (0, j._)(this, n)) && (0, Q.isValidTimeout)(e)
    }

    function eu() {
        var e = this;
        (0, N._)(this, R, ed).call(this);
        var t = (0, Q.resolveQueryValue)(this.options.staleTime, (0, j._)(this, n));
        if (!(0, j._)(this, s).isStale && (0, N._)(this, y, eo).call(this, t)) {
            var r = (0, Q.timeUntilStale)((0, j._)(this, s).dataUpdatedAt, t) + 1;
            (0, L._)(this, d, J.timeoutManager.setTimeout(function() {
                (0, j._)(e, s).isStale || e.updateResult()
            }, r))
        }
    }

    function el() {
        var e;
        return null != (e = (0, Q.resolveQueryValue)(this.options.refetchInterval, (0, j._)(this, n))) && e
    }

    function ec(e) {
        var t = this;
        (0, N._)(this, m, ef).call(this), (0, L._)(this, _, e), 0 !== (0, j._)(this, _) && (0, N._)(this, y, eo).call(this, (0, j._)(this, _)) && (0, L._)(this, f, J.timeoutManager.setInterval(function() {
            (t.options.refetchIntervalInBackground || $.focusManager.isFocused()) && (0, N._)(t, p, ea).call(t)
        }, (0, j._)(this, _)))
    }

    function eh() {
        (0, N._)(this, b, eu).call(this), (0, N._)(this, k, ec).call(this, (0, N._)(this, w, el).call(this))
    }

    function ed() {
        void 0 !== (0, j._)(this, d) && (J.timeoutManager.clearTimeout((0, j._)(this, d)), (0, L._)(this, d, void 0))
    }

    function ef() {
        void 0 !== (0, j._)(this, f) && (J.timeoutManager.clearInterval((0, j._)(this, f)), (0, L._)(this, f, void 0))
    }

    function e_() {
        var e = (0, j._)(this, r).getQueryCache().build((0, j._)(this, r), this.options);
        if (e !== (0, j._)(this, n)) {
            var t = (0, j._)(this, n);
            (0, L._)(this, n, e), (0, L._)(this, i, e.state), this.hasListeners() && (null == t || t.removeObserver(this), e.addObserver(this))
        }
    }
    e.s(["useQuery", 0, function(e, t) {
        return function(e, t, r) {
            var n = T.useContext(C),
                i = T.useContext(M),
                s = (0, O.useQueryClient)(r),
                a = s.defaultQueryOptions(e),
                o = s.getQueryCache().get(a.queryHash),
                u = !1 !== e.subscribed;
            a._optimisticResults = n ? "isRestoring" : u ? "optimistic" : void 0, D(a), A(a, i, o), U(i);
            var l = (0, E._)(T.useState(function() {
                    return new t(s, a)
                }), 1)[0],
                c = l.getOptimisticResult(a),
                h = !n && u;
            if (T.useSyncExternalStore(T.useCallback(function(e) {
                    var t = h ? l.subscribe(V.notifyManager.batchCalls(e)) : Q.noop;
                    return l.updateResult(), t
                }, [l, h]), function() {
                    return l.getCurrentResult()
                }, function() {
                    return l.getCurrentResult()
                }), T.useEffect(function() {
                    l.setOptions(a)
                }, [a, l]), (null == a ? void 0 : a.suspense) && c.isPending) throw l.fetchOptimistic(a).catch(function() {
                i.clearReset()
            });
            if (W({
                    result: c,
                    errorResetBoundary: i,
                    throwOnError: a.throwOnError,
                    query: o,
                    suspense: a.suspense
                })) throw c.error;
            return a.notifyOnChangeProps ? c : l.trackResult(c)
        }(e, et, t)
    }], 266027)
}, 404618, e => {
    "use strict";
    var t = e.i(843476),
        r = e.i(758240),
        n = e.i(8359),
        i = e.i(292843),
        s = e.i(72335);
    e.s(["AdTopSpot", 0, function(e) {
        var a = e.game;
        e.profile, e.tier;
        var o = (0, r.useAdPlaceholderMode)(),
            u = (0, n.useAdsBlocked)();
        return (0, i.useRampReprocess)(), (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsx)("div", {
                className: "pw-content-placeholder".concat(o ? " ad-dev-placeholder" : ""),
                id: "pw-header-ad-1",
                "data-ad-slot": "pw-header-ad-1",
                "data-ad-type": "Header (Primary)",
                "data-ad-size": "728×90 / responsive",
                "data-ad-game": a || "",
                "data-ad-blocked": u ? "true" : void 0
            }), (0, t.jsx)(s.HeaderBannerSlot, {
                location: "HEADER_1"
            })]
        })
    }])
}, 254068, e => {
    "use strict";
    var t = e.i(843476),
        r = e.i(404618),
        n = e.i(23026);
    e.s(["PageAdHeader", 0, function(e) {
        var i = e.game,
            s = (0, n.useGameCode)();
        return (0, t.jsx)(r.AdTopSpot, {
            game: (null != i ? i : s) || void 0
        })
    }])
}, 72335, e => {
    "use strict";
    var t = e.i(317608),
        r = e.i(843476),
        n = e.i(271645),
        i = e.i(618566),
        s = e.i(548124),
        a = e.i(866301),
        o = e.i(296412),
        u = e.i(294496),
        l = e.i(8359);
    e.s(["HeaderBannerSlot", 0, function(e) {
        var c, h = e.location,
            d = e.initialBanners,
            f = e.initialPathKey,
            _ = (0, i.usePathname)(),
            v = (0, u.useAdFreeHint)(),
            p = (0, l.useShouldHideBanners)(),
            y = (0, o.useBannerSeed)(),
            b = "ad-free" === v || p,
            w = null != d ? d : y ? y[h] : void 0,
            k = null != f ? f : null == y ? void 0 : y.pathKey,
            g = (0, t._)((0, n.useState)(null != w ? w : null), 2),
            R = g[0],
            m = g[1],
            S = (0, t._)((0, n.useState)(null), 2),
            E = S[0],
            O = S[1],
            T = (0, n.useRef)(void 0 !== w && null != k ? k : null);
        (0, n.useEffect)(function() {
            if (!b) {
                var e = (0, s.normalizeBannerPath)(_ || "/");
                if (null !== T.current && e === T.current) {
                    m(function(e) {
                        var t;
                        return null != (t = null != e ? e : w) ? t : []
                    }), O(function(e) {
                        if (null !== e) return e;
                        var t = null != w ? w : [];
                        return t.length > 0 ? Math.floor(Math.random() * t.length) : null
                    });
                    return
                }
                var t = !1;
                return fetch("/api/banners/header-slot?location=".concat(h, "&path=").concat(encodeURIComponent(_ || "/")), {
                        credentials: "omit"
                    }).then(function(e) {
                        return e.ok ? e.json() : {
                            banners: []
                        }
                    }).then(function(r) {
                        if (!t) {
                            var n, i = null != (n = null == r ? void 0 : r.banners) ? n : [];
                            m(i), O(i.length > 0 ? Math.floor(Math.random() * i.length) : null), T.current = e
                        }
                    }).catch(function() {
                        t || (m([]), O(null))
                    }),
                    function() {
                        t = !0
                    }
            }
        }, [h, _, b]);
        var C = !b && R && null !== E && null != (c = R[E]) ? c : null;
        return (0, r.jsx)("div", {
            className: "custom-banner-header",
            "data-banner-location": h,
            children: C && (0, r.jsx)(a.BannerClient, {
                banner: C
            })
        })
    }])
}, 294538, e => {
    "use strict";
    e.s(["ANONYMOUS_SHARE_TTL_DAYS", 0, 60, "ANONYMOUS_TOOL_SHARES_ENABLED", 0, !0, "FAVORITES_ENABLED", 0, !1, "GENSHIN_ROTATION_BUILDER_ENABLED", 0, !0, "USER_TOURNAMENTS_AND_TIER_LISTS_ENABLED", 0, !1])
}, 516459, e => {
    "use strict";
    var t = e.i(896572),
        r = e.i(511938),
        n = e.i(480388),
        i = e.i(181788),
        s = e.i(317608),
        a = e.i(296137),
        o = e.i(271645),
        u = null;

    function l() {
        return (0, t._)(function() {
            return (0, a._)(this, function(e) {
                return u ? [2, u] : [2, u = (0, t._)(function() {
                    var e, t;
                    return (0, a._)(this, function(r) {
                        switch (r.label) {
                            case 0:
                                return r.trys.push([0, , 3, 4]), [4, fetch("/api/csrf", {
                                    credentials: "include"
                                })];
                            case 1:
                                if (!(e = r.sent()).ok) throw Error("CSRF token request failed: ".concat(e.status));
                                return [4, e.json()];
                            case 2:
                                return [2, "string" == typeof(null == (t = r.sent()) ? void 0 : t.csrfToken) ? t.csrfToken : ""];
                            case 3:
                                return u = null, [7];
                            case 4:
                                return [2]
                        }
                    })
                })()]
            })
        })()
    }
    e.s(["fetchCsrfToken", 0, l, "fetchWithCsrf", 0, function(e) {
        return (0, t._)(function(e) {
            var t, r, s, o, u = arguments;
            return (0, a._)(this, function(a) {
                switch (a.label) {
                    case 0:
                        return t = u.length > 1 && void 0 !== u[1] ? u[1] : {}, r = function(r) {
                            var s = new Headers(t.headers);
                            return s.set("x-csrf-token", r), s.set("Content-Type", "application/json"), fetch(e, (0, i._)((0, n._)({}, t), {
                                headers: s,
                                credentials: "include"
                            }))
                        }, [4, l()];
                    case 1:
                        return [4, r.apply(void 0, [a.sent()])];
                    case 2:
                        if (403 !== (s = a.sent()).status) return [3, 8];
                        a.label = 3;
                    case 3:
                        return a.trys.push([3, 7, , 8]), [4, s.clone().json()];
                    case 4:
                        if (!("string" == typeof(null == (o = a.sent()) ? void 0 : o.error) && /csrf/i.test(o.error))) return [3, 6];
                        return [4, l()];
                    case 5:
                        return [2, r.apply(void 0, [a.sent()])];
                    case 6:
                        return [3, 8];
                    case 7:
                        return a.sent(), [3, 8];
                    case 8:
                        return [2, s]
                }
            })
        }).apply(this, arguments)
    }, "useCsrf", 0, function() {
        var e = (0, s._)((0, o.useState)({
                token: null,
                loading: !0,
                error: null
            }), 2),
            u = e[0],
            l = e[1],
            c = (0, o.useRef)(null),
            h = (0, o.useCallback)(function() {
                return (0, t._)(function() {
                    var e, t, s;
                    return (0, a._)(this, function(a) {
                        switch (a.label) {
                            case 0:
                                return a.trys.push([0, 3, , 4]), l(function(e) {
                                    return (0, i._)((0, n._)({}, e), {
                                        loading: !0,
                                        error: null
                                    })
                                }), [4, fetch("/api/csrf", {
                                    credentials: "include"
                                })];
                            case 1:
                                if (!(e = a.sent()).ok) throw Error("Failed to fetch CSRF token");
                                return [4, e.json()];
                            case 2:
                                return c.current = (t = a.sent()).csrfToken, l({
                                    token: t.csrfToken,
                                    loading: !1,
                                    error: null
                                }), [2, t.csrfToken];
                            case 3:
                                return s = a.sent(), c.current = null, l({
                                    token: null,
                                    loading: !1,
                                    error: (0, r._)(s, Error) ? s.message : "Unknown error"
                                }), [2, null];
                            case 4:
                                return [2]
                        }
                    })
                })()
            }, []);
        (0, o.useEffect)(function() {
            h()
        }, [h]);
        var d = (0, o.useMemo)(function() {
            var e = function(e, i, s, o) {
                return (0, t._)(function() {
                    var u, l, d;
                    return (0, a._)(this, function(f) {
                        switch (f.label) {
                            case 0:
                                return u = (0, r._)(s, FormData), l = function(t) {
                                    var r = (0, n._)({
                                        "x-csrf-token": t
                                    }, null == o ? void 0 : o.headers);
                                    return u || void 0 === s || (r["Content-Type"] = "application/json"), fetch(i, {
                                        method: e,
                                        headers: r,
                                        body: void 0 === s ? void 0 : u ? s : JSON.stringify(s),
                                        credentials: "include"
                                    })
                                }, [4, (0, t._)(function() {
                                    return (0, a._)(this, function(e) {
                                        switch (e.label) {
                                            case 0:
                                                if (c.current) return [2, c.current];
                                                return [4, h()];
                                            case 1:
                                                return [2, e.sent() || ""]
                                        }
                                    })
                                })()];
                            case 1:
                                return [4, l.apply(void 0, [f.sent()])];
                            case 2:
                                var _;
                                return [4, (_ = d = f.sent(), (0, t._)(function() {
                                    var e;
                                    return (0, a._)(this, function(t) {
                                        switch (t.label) {
                                            case 0:
                                                if (403 !== _.status) return [2, !1];
                                                t.label = 1;
                                            case 1:
                                                return t.trys.push([1, 3, , 4]), [4, _.clone().json()];
                                            case 2:
                                                return [2, "string" == typeof(null == (e = t.sent()) ? void 0 : e.error) && /csrf/i.test(e.error)];
                                            case 3:
                                                return t.sent(), [2, !1];
                                            case 4:
                                                return [2]
                                        }
                                    })
                                })())];
                            case 3:
                                if (!f.sent()) return [3, 5];
                                return [4, h()];
                            case 4:
                                return [2, l.apply(void 0, [f.sent() || ""])];
                            case 5:
                                return [2, d]
                        }
                    })
                })()
            };
            return {
                get: function(e) {
                    return (0, t._)(function() {
                        return (0, a._)(this, function(t) {
                            return [2, fetch(e, {
                                credentials: "include"
                            })]
                        })
                    })()
                },
                post: function(t, r, n) {
                    return e("POST", t, r, n)
                },
                put: function(t, r, n) {
                    return e("PUT", t, r, n)
                },
                patch: function(t, r, n) {
                    return e("PATCH", t, r, n)
                },
                delete: function(t) {
                    return e("DELETE", t)
                }
            }
        }, [h]);
        return {
            csrfToken: u.token,
            loading: u.loading,
            error: u.error,
            refresh: h,
            api: d
        }
    }])
}]);