(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 601774, 915823, t => {
    "use strict";
    var e, n, i, r = t.i(381772),
        a = t.i(754452),
        u = t.i(229032),
        s = t.i(567928),
        o = t.i(523474),
        l = t.i(61106),
        c = t.i(912037),
        f = function() {
            function t() {
                (0, a._)(this, t), this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
            }
            return (0, l._)(t, [{
                key: "subscribe",
                value: function(t) {
                    var e = this;
                    return this.listeners.add(t), this.onSubscribe(),
                        function() {
                            e.listeners.delete(t), e.onUnsubscribe()
                        }
                }
            }, {
                key: "hasListeners",
                value: function() {
                    return this.listeners.size > 0
                }
            }, {
                key: "onSubscribe",
                value: function() {}
            }, {
                key: "onUnsubscribe",
                value: function() {}
            }]), t
        }();
    t.s(["Subscribable", 0, f], 915823);
    var h = new(e = new WeakMap, n = new WeakMap, i = new WeakMap, function(t) {
        function f() {
            var t;
            return (0, a._)(this, f), t = (0, r._)(this, f), (0, s._)(t, e, {
                writable: !0,
                value: void 0
            }), (0, s._)(t, n, {
                writable: !0,
                value: void 0
            }), (0, s._)(t, i, {
                writable: !0,
                value: void 0
            }), (0, o._)(t, i, function(t) {
                if ("u" > typeof window && window.addEventListener) {
                    var e = function() {
                        return t()
                    };
                    return window.addEventListener("visibilitychange", e, !1),
                        function() {
                            window.removeEventListener("visibilitychange", e)
                        }
                }
            }), t
        }
        return (0, c._)(f, t), (0, l._)(f, [{
            key: "onSubscribe",
            value: function() {
                (0, u._)(this, n) || this.setEventListener((0, u._)(this, i))
            }
        }, {
            key: "onUnsubscribe",
            value: function() {
                var t;
                this.hasListeners() || (null == (t = (0, u._)(this, n)) || t.call(this), (0, o._)(this, n, void 0))
            }
        }, {
            key: "setEventListener",
            value: function(t) {
                var e, r = this;
                (0, o._)(this, i, t), null == (e = (0, u._)(this, n)) || e.call(this), (0, o._)(this, n, t(function(t) {
                    "boolean" == typeof t ? r.setFocused(t) : r.onFocus()
                }))
            }
        }, {
            key: "setFocused",
            value: function(t) {
                (0, u._)(this, e) !== t && ((0, o._)(this, e, t), this.onFocus())
            }
        }, {
            key: "onFocus",
            value: function() {
                var t = this.isFocused();
                this.listeners.forEach(function(e) {
                    e(t)
                })
            }
        }, {
            key: "isFocused",
            value: function() {
                var t;
                return "boolean" == typeof(0, u._)(this, e) ? (0, u._)(this, e) : (null == (t = globalThis.document) ? void 0 : t.visibilityState) !== "hidden"
            }
        }]), f
    }(f));
    t.s(["focusManager", 0, h], 601774)
}, 540143, t => {
    "use strict";
    var e, n, i, r, a, u, s, o = t.i(855111),
        l = t.i(180166).systemSetTimeoutZero,
        c = (e = [], n = 0, i = function(t) {
            t()
        }, r = function(t) {
            t()
        }, a = l, u = function(t) {
            n ? e.push(t) : a(function() {
                i(t)
            })
        }, s = function() {
            var t = e;
            e = [], t.length && a(function() {
                r(function() {
                    t.forEach(function(t) {
                        i(t)
                    })
                })
            })
        }, {
            batch: function(t) {
                var e;
                n++;
                try {
                    e = t()
                } finally {
                    --n || s()
                }
                return e
            },
            batchCalls: function(t) {
                return function() {
                    for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                    u(function() {
                        t.apply(void 0, (0, o._)(n))
                    })
                }
            },
            schedule: u,
            setNotifyFunction: function(t) {
                i = t
            },
            setBatchNotifyFunction: function(t) {
                r = t
            },
            setScheduler: function(t) {
                a = t
            }
        });
    t.s(["notifyManager", 0, c])
}, 814448, t => {
    "use strict";
    var e, n, i, r = t.i(381772),
        a = t.i(754452),
        u = t.i(229032),
        s = t.i(567928),
        o = t.i(523474),
        l = t.i(61106),
        c = t.i(912037),
        f = t.i(915823),
        h = new(e = new WeakMap, n = new WeakMap, i = new WeakMap, function(t) {
            function f() {
                var t;
                return (0, a._)(this, f), t = (0, r._)(this, f), (0, s._)(t, e, {
                    writable: !0,
                    value: !0
                }), (0, s._)(t, n, {
                    writable: !0,
                    value: void 0
                }), (0, s._)(t, i, {
                    writable: !0,
                    value: void 0
                }), (0, o._)(t, i, function(t) {
                    if ("u" > typeof window && window.addEventListener) {
                        var e = function() {
                                return t(!0)
                            },
                            n = function() {
                                return t(!1)
                            };
                        return window.addEventListener("online", e, !1), window.addEventListener("offline", n, !1),
                            function() {
                                window.removeEventListener("online", e), window.removeEventListener("offline", n)
                            }
                    }
                }), t
            }
            return (0, c._)(f, t), (0, l._)(f, [{
                key: "onSubscribe",
                value: function() {
                    (0, u._)(this, n) || this.setEventListener((0, u._)(this, i))
                }
            }, {
                key: "onUnsubscribe",
                value: function() {
                    var t;
                    this.hasListeners() || (null == (t = (0, u._)(this, n)) || t.call(this), (0, o._)(this, n, void 0))
                }
            }, {
                key: "setEventListener",
                value: function(t) {
                    var e;
                    (0, o._)(this, i, t), null == (e = (0, u._)(this, n)) || e.call(this), (0, o._)(this, n, t(this.setOnline.bind(this)))
                }
            }, {
                key: "setOnline",
                value: function(t) {
                    (0, u._)(this, e) !== t && ((0, o._)(this, e, t), this.listeners.forEach(function(e) {
                        e(t)
                    }))
                }
            }, {
                key: "isOnline",
                value: function() {
                    return (0, u._)(this, e)
                }
            }]), f
        }(f.Subscribable));
    t.s(["onlineManager", 0, h])
}, 286491, 936553, 88587, t => {
    "use strict";
    var e, n, i, r, a, u, s, o, l, c, f = t.i(896572),
        h = t.i(381772),
        v = t.i(754452),
        d = t.i(229032),
        y = t.i(567928),
        p = t.i(523474),
        _ = t.i(203023),
        b = t.i(903150),
        m = t.i(61106),
        g = t.i(562578),
        w = t.i(813674),
        k = t.i(912037),
        S = t.i(511938),
        F = t.i(480388),
        O = t.i(181788),
        T = t.i(296137),
        P = t.i(619273),
        M = t.i(540143),
        C = t.i(390373),
        q = t.i(273911),
        E = t.i(601774),
        A = t.i(814448);

    function U(t) {
        return Math.min(1e3 * Math.pow(2, t), 3e4)
    }

    function j(t) {
        return (null != t ? t : "online") !== "online" || A.onlineManager.isOnline()
    }
    var R = function(t) {
        function e(t) {
            var n;
            return (0, v._)(this, e), (n = (0, h._)(this, e, ["CancelledError"])).revert = null == t ? void 0 : t.revert, n.silent = null == t ? void 0 : t.silent, n
        }
        return (0, k._)(e, t), e
    }((0, C._)(Error));

    function K(t) {
        var e, n, i, r = !1,
            a = 0,
            u = "pending",
            s = new Promise(function(t, e) {
                n = t, i = e
            });
        s.catch(P.noop);
        var o = function() {
                return "pending" !== u
            },
            l = function() {
                return E.focusManager.isFocused() && ("always" === t.networkMode || A.onlineManager.isOnline()) && t.canRun()
            },
            c = function() {
                return j(t.networkMode) && t.canRun()
            },
            f = function(t) {
                o() || (null == e || e(), u = "resolved", n(t))
            },
            h = function(t) {
                o() || (null == e || e(), u = "rejected", i(t))
            },
            v = function() {
                return new Promise(function(n) {
                    var i;
                    e = function(t) {
                        (o() || l()) && n(t)
                    }, null == (i = t.onPause) || i.call(t)
                }).then(function() {
                    var n;
                    e = void 0, o() || null == (n = t.onContinue) || n.call(t)
                })
            },
            d = function() {
                if (!o()) {
                    var e, n = 0 === a ? t.initialPromise : void 0;
                    try {
                        e = null != n ? n : t.fn()
                    } catch (t) {
                        e = Promise.reject(t)
                    }
                    Promise.resolve(e).then(f).catch(function(e) {
                        if (!o()) {
                            var n, i, u, s = null != (n = t.retry) ? n : 3 * !(0, q.isServer)(),
                                c = null != (i = t.retryDelay) ? i : U,
                                f = "function" == typeof c ? c(a, e) : c,
                                y = !0 === s || "number" == typeof s && a < s || "function" == typeof s && s(a, e);
                            if (r || !y) return void h(e);
                            a++, null == (u = t.onFail) || u.call(t, a, e), (0, P.sleep)(f).then(function() {
                                return l() ? void 0 : v()
                            }).then(function() {
                                r ? h(e) : d()
                            })
                        }
                    })
                }
            };
        return {
            promise: s,
            status: function() {
                return u
            },
            cancel: function(e) {
                if (!o()) {
                    var n, i = new R(e);
                    h(i), null == (n = t.onCancel) || n.call(t, i)
                }
            },
            continue: function() {
                return null == e || e(), s
            },
            cancelRetry: function() {
                r = !0
            },
            continueRetry: function() {
                r = !1
            },
            canStart: c,
            start: function() {
                return c() ? d() : v().then(d), s
            }
        }
    }
    t.s(["CancelledError", 0, R, "canFetch", 0, j, "createRetryer", 0, K], 936553);
    var D = t.i(180166),
        W = (e = new WeakMap, function() {
            function t() {
                (0, v._)(this, t), (0, y._)(this, e, {
                    writable: !0,
                    value: void 0
                })
            }
            return (0, m._)(t, [{
                key: "destroy",
                value: function() {
                    this.clearGcTimeout()
                }
            }, {
                key: "scheduleGc",
                value: function() {
                    var t = this;
                    this.clearGcTimeout(), (0, P.isValidTimeout)(this.gcTime) && (0, p._)(this, e, D.timeoutManager.setTimeout(function() {
                        t.optionalRemove()
                    }, this.gcTime))
                }
            }, {
                key: "updateGcTime",
                value: function(t) {
                    this.gcTime = Math.max(this.gcTime || 0, null != t ? t : (0, q.isServer)() ? 1 / 0 : 3e5)
                }
            }, {
                key: "clearGcTimeout",
                value: function() {
                    void 0 !== (0, d._)(this, e) && (D.timeoutManager.clearTimeout((0, d._)(this, e)), (0, p._)(this, e, void 0))
                }
            }]), t
        }());

    function L(t, e) {
        var n = e.pages,
            i = e.pageParams,
            r = n.length - 1;
        return n.length > 0 ? t.getNextPageParam(n[r], n, i[r], i) : void 0
    }

    function I(t, e) {
        var n, i = e.pages,
            r = e.pageParams;
        return i.length > 0 ? null == (n = t.getPreviousPageParam) ? void 0 : n.call(t, i[0], i, r[0], r) : void 0
    }
    t.s(["Removable", 0, W], 88587);
    var Q = (n = new WeakMap, i = new WeakMap, r = new WeakMap, a = new WeakMap, u = new WeakMap, s = new WeakMap, o = new WeakMap, l = new WeakMap, c = new WeakSet, function(t) {
        function e(t) {
            var f, _;
            return (0, v._)(this, e), f = (0, h._)(this, e), (0, b._)(f, c), (0, y._)(f, n, {
                writable: !0,
                value: void 0
            }), (0, y._)(f, i, {
                writable: !0,
                value: void 0
            }), (0, y._)(f, r, {
                writable: !0,
                value: void 0
            }), (0, y._)(f, a, {
                writable: !0,
                value: void 0
            }), (0, y._)(f, u, {
                writable: !0,
                value: void 0
            }), (0, y._)(f, s, {
                writable: !0,
                value: void 0
            }), (0, y._)(f, o, {
                writable: !0,
                value: void 0
            }), (0, y._)(f, l, {
                writable: !0,
                value: void 0
            }), (0, p._)(f, l, !1), (0, p._)(f, o, t.defaultOptions), f.setOptions(t.options), f.observers = [], (0, p._)(f, u, t.client), (0, p._)(f, a, (0, d._)(f, u).getQueryCache()), f.queryKey = t.queryKey, f.queryHash = t.queryHash, (0, p._)(f, i, H(f.options)), f.state = null != (_ = t.state) ? _ : (0, d._)(f, i), f.scheduleGc(), f
        }
        return (0, k._)(e, t), (0, m._)(e, [{
            key: "meta",
            get: function() {
                return this.options.meta
            }
        }, {
            key: "queryType",
            get: function() {
                return (0, d._)(this, n)
            }
        }, {
            key: "promise",
            get: function() {
                var t;
                return null == (t = (0, d._)(this, s)) ? void 0 : t.promise
            }
        }, {
            key: "setOptions",
            value: function(t) {
                if (this.options = (0, F._)({}, (0, d._)(this, o), t), (null == t ? void 0 : t._type) && (0, p._)(this, n, t._type), this.updateGcTime(this.options.gcTime), this.state && void 0 === this.state.data) {
                    var e = H(this.options);
                    void 0 !== e.data && (this.setState(G(e.data, e.dataUpdatedAt)), (0, p._)(this, i, e))
                }
            }
        }, {
            key: "optionalRemove",
            value: function() {
                this.observers.length || "idle" !== this.state.fetchStatus || (0, d._)(this, a).remove(this)
            }
        }, {
            key: "setData",
            value: function(t, e) {
                var n = (0, P.replaceData)(this.state.data, t, this.options);
                return (0, _._)(this, c, B).call(this, {
                    data: n,
                    type: "success",
                    dataUpdatedAt: null == e ? void 0 : e.updatedAt,
                    manual: null == e ? void 0 : e.manual
                }), n
            }
        }, {
            key: "setState",
            value: function(t) {
                (0, _._)(this, c, B).call(this, {
                    type: "setState",
                    state: t
                })
            }
        }, {
            key: "cancel",
            value: function(t) {
                var e, n, i = null == (e = (0, d._)(this, s)) ? void 0 : e.promise;
                return null == (n = (0, d._)(this, s)) || n.cancel(t), i ? i.then(P.noop).catch(P.noop) : Promise.resolve()
            }
        }, {
            key: "destroy",
            value: function() {
                (0, g._)((0, w._)(e.prototype), "destroy", this).call(this), this.cancel({
                    silent: !0
                })
            }
        }, {
            key: "resetState",
            get: function() {
                return (0, d._)(this, i)
            }
        }, {
            key: "reset",
            value: function() {
                this.destroy(), this.setState(this.resetState)
            }
        }, {
            key: "isActive",
            value: function() {
                var t = this;
                return this.observers.some(function(e) {
                    return !1 !== (0, P.resolveQueryValue)(e.options.enabled, t)
                })
            }
        }, {
            key: "isDisabled",
            value: function() {
                return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === P.skipToken || !this.isFetched()
            }
        }, {
            key: "isFetched",
            value: function() {
                return this.state.dataUpdateCount + this.state.errorUpdateCount > 0
            }
        }, {
            key: "isStatic",
            value: function() {
                var t = this;
                return this.getObserversCount() > 0 && this.observers.some(function(e) {
                    return "static" === (0, P.resolveQueryValue)(e.options.staleTime, t)
                })
            }
        }, {
            key: "isStale",
            value: function() {
                return this.getObserversCount() > 0 ? this.observers.some(function(t) {
                    return t.getCurrentResult().isStale
                }) : void 0 === this.state.data || this.state.isInvalidated
            }
        }, {
            key: "isStaleByTime",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                return void 0 === this.state.data || "static" !== t && (!!this.state.isInvalidated || !(0, P.timeUntilStale)(this.state.dataUpdatedAt, t))
            }
        }, {
            key: "onFocus",
            value: function() {
                var t, e;
                null == (t = this.observers.find(function(t) {
                    return t.shouldFetchOnWindowFocus()
                })) || t.refetch({
                    cancelRefetch: !1
                }), null == (e = (0, d._)(this, s)) || e.continue()
            }
        }, {
            key: "onOnline",
            value: function() {
                var t, e;
                null == (t = this.observers.find(function(t) {
                    return t.shouldFetchOnReconnect()
                })) || t.refetch({
                    cancelRefetch: !1
                }), null == (e = (0, d._)(this, s)) || e.continue()
            }
        }, {
            key: "addObserver",
            value: function(t) {
                this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), (0, d._)(this, a).notify({
                    type: "observerAdded",
                    query: this,
                    observer: t
                }))
            }
        }, {
            key: "removeObserver",
            value: function(t) {
                var e = this.observers.indexOf(t); - 1 !== e && (this.observers.splice(e, 1), this.observers.length || ((0, d._)(this, s) && ((0, d._)(this, l) || "paused" === this.state.fetchStatus && "pending" === this.state.status ? (0, d._)(this, s).cancel({
                    revert: !0
                }) : (0, d._)(this, s).cancelRetry()), this.scheduleGc()), (0, d._)(this, a).notify({
                    type: "observerRemoved",
                    query: this,
                    observer: t
                }))
            }
        }, {
            key: "getObserversCount",
            value: function() {
                return this.observers.length
            }
        }, {
            key: "invalidate",
            value: function() {
                this.state.isInvalidated || (0, _._)(this, c, B).call(this, {
                    type: "invalidate"
                })
            }
        }, {
            key: "fetch",
            value: function(t, e) {
                return (0, f._)(function() {
                    var i, o, h, v, y, b, m, g, w, k, M, C, q, E, A, U, j, D, W, Q, x;
                    return (0, T._)(this, function(G) {
                        switch (G.label) {
                            case 0:
                                var H, N;
                                if (i = this, "idle" !== this.state.fetchStatus && (null == (o = (0, d._)(this, s)) ? void 0 : o.status()) !== "rejected") {
                                    if (void 0 !== this.state.data && (null == e ? void 0 : e.cancelRefetch)) this.cancel({
                                        silent: !0
                                    });
                                    else if ((0, d._)(this, s)) return (0, d._)(this, s).continueRetry(), [2, (0, d._)(this, s).promise]
                                }
                                t && this.setOptions(t), !this.options.queryFn && (b = this.observers.find(function(t) {
                                    return t.options.queryFn
                                })) && this.setOptions(b.options), m = new AbortController, g = function(t) {
                                    Object.defineProperty(t, "signal", {
                                        enumerable: !0,
                                        get: function() {
                                            return (0, p._)(i, l, !0), m.signal
                                        }
                                    })
                                }, w = function() {
                                    var t, n = (0, P.ensureQueryFn)(i.options, e),
                                        r = (g(t = {
                                            client: (0, d._)(i, u),
                                            queryKey: i.queryKey,
                                            meta: i.meta
                                        }), t);
                                    return ((0, p._)(i, l, !1), i.options.persister) ? i.options.persister(n, r, i) : n(r)
                                }, g(N = {
                                    fetchOptions: e,
                                    options: i.options,
                                    queryKey: i.queryKey,
                                    client: (0, d._)(i, u),
                                    state: i.state,
                                    fetchFn: w
                                }), k = N, null == (h = "infinite" === (0, d._)(this, n) ? (H = this.options.pages, {
                                    onFetch: function(t, e) {
                                        var n, i, r, a, u, s = t.options,
                                            o = null == (r = t.fetchOptions) || null == (i = r.meta) || null == (n = i.fetchMore) ? void 0 : n.direction,
                                            l = (null == (a = t.state.data) ? void 0 : a.pages) || [],
                                            c = (null == (u = t.state.data) ? void 0 : u.pageParams) || [],
                                            h = {
                                                pages: [],
                                                pageParams: []
                                            },
                                            v = 0,
                                            d = function() {
                                                return (0, f._)(function() {
                                                    var e, n, i, r, a, u, d, y, p, _;
                                                    return (0, T._)(this, function(b) {
                                                        switch (b.label) {
                                                            case 0:
                                                                if (e = !1, n = function(n) {
                                                                        (0, P.addConsumeAwareSignal)(n, function() {
                                                                            return t.signal
                                                                        }, function() {
                                                                            return e = !0
                                                                        })
                                                                    }, i = (0, P.ensureQueryFn)(t.options, t.fetchOptions), r = function(r, a, u) {
                                                                        return (0, f._)(function() {
                                                                            var s, o, l;
                                                                            return (0, T._)(this, function(c) {
                                                                                switch (c.label) {
                                                                                    case 0:
                                                                                        var f;
                                                                                        if (e) return [2, Promise.reject(t.signal.reason)];
                                                                                        if (null == a && r.pages.length) return [2, Promise.resolve(r)];
                                                                                        return [4, i((n(f = {
                                                                                            client: t.client,
                                                                                            queryKey: t.queryKey,
                                                                                            pageParam: a,
                                                                                            direction: u ? "backward" : "forward",
                                                                                            meta: t.options.meta
                                                                                        }), f))];
                                                                                    case 1:
                                                                                        return s = c.sent(), o = t.options.maxPages, [2, {
                                                                                            pages: (l = u ? P.addToStart : P.addToEnd)(r.pages, s, o),
                                                                                            pageParams: l(r.pageParams, a, o)
                                                                                        }]
                                                                                }
                                                                            })
                                                                        })()
                                                                    }, !(o && l.length)) return [3, 2];
                                                                return u = (a = "backward" === o) ? I : L, [4, r(d = {
                                                                    pages: l,
                                                                    pageParams: c
                                                                }, u(s, d), a)];
                                                            case 1:
                                                                return h = b.sent(), [3, 6];
                                                            case 2:
                                                                y = null != H ? H : l.length, b.label = 3;
                                                            case 3:
                                                                if (_ = 0 === v ? null != (p = c[0]) ? p : s.initialPageParam : L(s, h), v > 0 && null == _) return [3, 6];
                                                                return [4, r(h, _)];
                                                            case 4:
                                                                h = b.sent(), v++, b.label = 5;
                                                            case 5:
                                                                if (v < y) return [3, 3];
                                                                b.label = 6;
                                                            case 6:
                                                                return [2, h]
                                                        }
                                                    })
                                                })()
                                            };
                                        t.options.persister ? t.fetchFn = function() {
                                            var n, i;
                                            return null == (n = (i = t.options).persister) ? void 0 : n.call(i, d, {
                                                client: t.client,
                                                queryKey: t.queryKey,
                                                meta: t.options.meta,
                                                signal: t.signal
                                            }, e)
                                        } : t.fetchFn = d
                                    }
                                }) : this.options.behavior) || h.onFetch(k, this), (0, p._)(this, r, this.state), ("idle" === this.state.fetchStatus || this.state.fetchMeta !== (null == (v = k.fetchOptions) ? void 0 : v.meta)) && (0, _._)(this, c, B).call(this, {
                                    type: "fetch",
                                    meta: null == (y = k.fetchOptions) ? void 0 : y.meta
                                }), M = (0, p._)(this, s, K({
                                    initialPromise: null == e ? void 0 : e.initialPromise,
                                    fn: k.fetchFn,
                                    onCancel: function(t) {
                                        (0, S._)(t, R) && t.revert && i.setState((0, O._)((0, F._)({}, (0, d._)(i, r)), {
                                            fetchStatus: "idle"
                                        })), m.abort()
                                    },
                                    onFail: function(t, e) {
                                        (0, _._)(i, c, B).call(i, {
                                            type: "failed",
                                            failureCount: t,
                                            error: e
                                        })
                                    },
                                    onPause: function() {
                                        (0, _._)(i, c, B).call(i, {
                                            type: "pause"
                                        })
                                    },
                                    onContinue: function() {
                                        (0, _._)(i, c, B).call(i, {
                                            type: "continue"
                                        })
                                    },
                                    retry: k.options.retry,
                                    retryDelay: k.options.retryDelay,
                                    networkMode: k.options.networkMode,
                                    canRun: function() {
                                        return !0
                                    }
                                })), G.label = 1;
                            case 1:
                                return G.trys.push([1, 3, 4, 5]), [4, M.start()];
                            case 2:
                                if (void 0 === (U = G.sent())) throw Error("".concat(this.queryHash, " data is undefined"));
                                return this.setData(U), null == (C = (q = (0, d._)(this, a).config).onSuccess) || C.call(q, U, this), null == (E = (A = (0, d._)(this, a).config).onSettled) || E.call(A, U, this.state.error, this), [2, U];
                            case 3:
                                if (j = G.sent(), (0, S._)(j, R)) {
                                    if (j.silent) return [2, (0, d._)(this, s).promise];
                                    else if (j.revert) {
                                        if (void 0 === this.state.data) throw j;
                                        return [2, this.state.data]
                                    }
                                }
                                throw (0, _._)(this, c, B).call(this, {
                                    type: "error",
                                    error: j
                                }), null == (D = (W = (0, d._)(this, a).config).onError) || D.call(W, j, this), null == (Q = (x = (0, d._)(this, a).config).onSettled) || Q.call(x, this.state.data, j, this), j;
                            case 4:
                                return (0, d._)(this, s) === M && (0, p._)(this, s, void 0), this.scheduleGc(), [7];
                            case 5:
                                return [2]
                        }
                    })
                }).call(this)
            }
        }]), e
    }(W));

    function x(t, e) {
        return (0, F._)({
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchStatus: j(e.networkMode) ? "fetching" : "paused"
        }, void 0 === t && {
            error: null,
            status: "pending"
        })
    }

    function G(t, e) {
        return {
            data: t,
            dataUpdatedAt: null != e ? e : Date.now(),
            error: null,
            isInvalidated: !1,
            status: "success"
        }
    }

    function H(t) {
        var e = "function" == typeof t.initialData ? t.initialData() : t.initialData,
            n = void 0 !== e,
            i = n ? "function" == typeof t.initialDataUpdatedAt ? t.initialDataUpdatedAt() : t.initialDataUpdatedAt : 0;
        return {
            data: e,
            dataUpdateCount: 0,
            dataUpdatedAt: n ? null != i ? i : Date.now() : 0,
            error: null,
            errorUpdateCount: 0,
            errorUpdatedAt: 0,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: null,
            isInvalidated: !1,
            status: n ? "success" : "pending",
            fetchStatus: "idle"
        }
    }

    function B(t) {
        var e = this;
        this.state = function(n) {
            switch (t.type) {
                case "failed":
                    return (0, O._)((0, F._)({}, n), {
                        fetchFailureCount: t.failureCount,
                        fetchFailureReason: t.error
                    });
                case "pause":
                    return (0, O._)((0, F._)({}, n), {
                        fetchStatus: "paused"
                    });
                case "continue":
                    return (0, O._)((0, F._)({}, n), {
                        fetchStatus: "fetching"
                    });
                case "fetch":
                    var i;
                    return (0, O._)((0, F._)({}, n, x(n.data, e.options)), {
                        fetchMeta: null != (i = t.meta) ? i : null
                    });
                case "success":
                    var a = (0, F._)((0, O._)((0, F._)({}, n, G(t.data, t.dataUpdatedAt)), {
                        dataUpdateCount: n.dataUpdateCount + 1
                    }), !t.manual && {
                        fetchStatus: "idle",
                        fetchFailureCount: 0,
                        fetchFailureReason: null
                    });
                    return (0, p._)(e, r, t.manual ? a : void 0), a;
                case "error":
                    var u = t.error;
                    return (0, O._)((0, F._)({}, n), {
                        error: u,
                        errorUpdateCount: n.errorUpdateCount + 1,
                        errorUpdatedAt: Date.now(),
                        fetchFailureCount: n.fetchFailureCount + 1,
                        fetchFailureReason: u,
                        fetchStatus: "idle",
                        status: "error",
                        isInvalidated: !0
                    });
                case "invalidate":
                    return (0, O._)((0, F._)({}, n), {
                        isInvalidated: !0
                    });
                case "setState":
                    return (0, F._)({}, n, t.state)
            }
        }(this.state), M.notifyManager.batch(function() {
            e.observers.slice().forEach(function(t) {
                t.onQueryUpdate()
            }), (0, d._)(e, a).notify({
                query: e,
                type: "updated",
                action: t
            })
        })
    }
    t.s(["Query", 0, Q, "fetchState", 0, x], 286491)
}, 619273, 180166, t => {
    "use strict";
    var e, n, i = t.i(855111),
        r = t.i(524906),
        a = t.i(754452),
        u = t.i(229032),
        s = t.i(567928),
        o = t.i(523474),
        l = t.i(61106),
        c = {
            setTimeout: function(t, e) {
                return setTimeout(t, e)
            },
            clearTimeout: function(t) {
                return clearTimeout(t)
            },
            setInterval: function(t, e) {
                return setInterval(t, e)
            },
            clearInterval: function(t) {
                return clearInterval(t)
            }
        },
        f = new(e = new WeakMap, n = new WeakMap, function() {
            function t() {
                (0, a._)(this, t), (0, s._)(this, e, {
                    writable: !0,
                    value: c
                }), (0, s._)(this, n, {
                    writable: !0,
                    value: !1
                })
            }
            return (0, l._)(t, [{
                key: "setTimeoutProvider",
                value: function(t) {
                    (0, o._)(this, e, t)
                }
            }, {
                key: "setTimeout",
                value: function(t, n) {
                    return (0, u._)(this, e).setTimeout(t, n)
                }
            }, {
                key: "clearTimeout",
                value: function(t) {
                    (0, u._)(this, e).clearTimeout(t)
                }
            }, {
                key: "setInterval",
                value: function(t, n) {
                    return (0, u._)(this, e).setInterval(t, n)
                }
            }, {
                key: "clearInterval",
                value: function(t) {
                    (0, u._)(this, e).clearInterval(t)
                }
            }]), t
        }());
    t.s(["systemSetTimeoutZero", 0, function(t) {
        setTimeout(t, 0)
    }, "timeoutManager", 0, f], 180166);
    var h = "u" < typeof window || "Deno" in globalThis;

    function v(t, e) {
        return ((null == e ? void 0 : e.queryKeyHashFn) || d)(t)
    }

    function d(t) {
        return JSON.stringify(t, function(t, e) {
            return b(e) ? Object.keys(e).sort().reduce(function(t, n) {
                return t[n] = e[n], t
            }, {}) : e
        })
    }

    function y(t, e) {
        if (t === e) return !0;
        if ((void 0 === t ? "undefined" : (0, r._)(t)) !== (void 0 === e ? "undefined" : (0, r._)(e))) return !1;
        if (t && e && (void 0 === t ? "undefined" : (0, r._)(t)) === "object" && (void 0 === e ? "undefined" : (0, r._)(e)) === "object") {
            if (Array.isArray(t) && Array.isArray(e)) {
                if (e.length > t.length) return !1;
                for (var n = 0; n < e.length; n++)
                    if (!y(t[n], e[n])) return !1;
                return !0
            }
            var i = Object.keys(e),
                a = !0,
                u = !1,
                s = void 0;
            try {
                for (var o, l = i[Symbol.iterator](); !(a = (o = l.next()).done); a = !0) {
                    var c = o.value;
                    if (!y(t[c], e[c])) return !1
                }
            } catch (t) {
                u = !0, s = t
            } finally {
                try {
                    a || null == l.return || l.return()
                } finally {
                    if (u) throw s
                }
            }
            return !0
        }
        return !1
    }
    var p = Object.prototype.hasOwnProperty;

    function _(t) {
        return Array.isArray(t) && t.length === Object.keys(t).length
    }

    function b(t) {
        if (!m(t)) return !1;
        var e = Object.getPrototypeOf(t),
            n = null == e ? void 0 : e.constructor;
        if (void 0 === n) return !0;
        if ("function" != typeof n) return !1;
        var i = n.prototype;
        return !!m(i) && !!i.hasOwnProperty("isPrototypeOf") && e === Object.prototype
    }

    function m(t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    }
    var g = Symbol();
    t.s(["addConsumeAwareSignal", 0, function(t, e, n) {
        var i, r = !1;
        return Object.defineProperty(t, "signal", {
            enumerable: !0,
            get: function() {
                return null != i || (i = e()), r || (r = !0, i.aborted ? n() : i.addEventListener("abort", n, {
                    once: !0
                })), i
            }
        }), t
    }, "addToEnd", 0, function(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            r = (0, i._)(t).concat([e]);
        return n && r.length > n ? r.slice(1) : r
    }, "addToStart", 0, function(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            r = [e].concat((0, i._)(t));
        return n && r.length > n ? r.slice(0, -1) : r
    }, "ensureQueryFn", 0, function(t, e) {
        return !t.queryFn && (null == e ? void 0 : e.initialPromise) ? function() {
            return e.initialPromise
        } : t.queryFn && t.queryFn !== g ? t.queryFn : function() {
            return Promise.reject(Error("Missing queryFn: '".concat(t.queryHash, "'")))
        }
    }, "functionalUpdate", 0, function(t, e) {
        return "function" == typeof t ? t(e) : t
    }, "hashKey", 0, d, "hashQueryKeyByOptions", 0, v, "isServer", 0, h, "isValidTimeout", 0, function(t) {
        return "number" == typeof t && t >= 0 && t !== 1 / 0
    }, "matchMutation", 0, function(t, e) {
        var n = t.exact,
            i = t.status,
            r = t.predicate,
            a = t.mutationKey;
        if (a) {
            if (!e.options.mutationKey) return !1;
            if (n) {
                if (d(e.options.mutationKey) !== d(a)) return !1
            } else if (!y(e.options.mutationKey, a)) return !1
        }
        return (!i || e.state.status === i) && (!r || !!r(e))
    }, "matchQuery", 0, function(t, e) {
        var n = t.type,
            i = void 0 === n ? "all" : n,
            r = t.exact,
            a = t.fetchStatus,
            u = t.predicate,
            s = t.queryKey,
            o = t.stale;
        if (s) {
            if (r) {
                if (e.queryHash !== v(s, e.options)) return !1
            } else if (!y(e.queryKey, s)) return !1
        }
        if ("all" !== i) {
            var l = e.isActive();
            if ("active" === i && !l || "inactive" === i && l) return !1
        }
        return ("boolean" != typeof o || e.isStale() === o) && (!a || a === e.state.fetchStatus) && (!u || !!u(e))
    }, "noop", 0, function() {}, "partialMatchKey", 0, y, "replaceData", 0, function(t, e, n) {
        return "function" == typeof n.structuralSharing ? n.structuralSharing(t, e) : !1 !== n.structuralSharing ? function t(e, n) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            if (e === n) return e;
            if (i > 500) return n;
            var a = _(e) && _(n);
            if (!a && !(b(e) && b(n))) return n;
            for (var u = (a ? e : Object.keys(e)).length, s = a ? n : Object.keys(n), o = s.length, l = a ? Array(o) : {}, c = 0, f = 0; f < o; f++) {
                var h = a ? f : s[f],
                    v = e[h],
                    d = n[h];
                if (v === d) {
                    l[h] = v, (a ? f < u : p.call(e, h)) && c++;
                    continue
                }
                if (null === v || null === d || (void 0 === v ? "undefined" : (0, r._)(v)) !== "object" || (void 0 === d ? "undefined" : (0, r._)(d)) !== "object") {
                    l[h] = d;
                    continue
                }
                var y = t(v, d, i + 1);
                l[h] = y, y === v && c++
            }
            return u === o && c === u ? e : l
        }(t, e) : e
    }, "resolveQueryValue", 0, function(t, e) {
        return "function" == typeof t ? t(e) : t
    }, "shallowEqualObjects", 0, function(t, e) {
        if (!e || Object.keys(t).length !== Object.keys(e).length) return !1;
        for (var n in t)
            if (t[n] !== e[n]) return !1;
        return !0
    }, "shouldThrowError", 0, function(t, e) {
        return "function" == typeof t ? t.apply(void 0, (0, i._)(e)) : !!t
    }, "skipToken", 0, g, "sleep", 0, function(t) {
        return new Promise(function(e) {
            f.setTimeout(e, t)
        })
    }, "timeUntilStale", 0, function(t, e) {
        return Math.max(t + (e || 0) - Date.now(), 0)
    }], 619273)
}, 912598, t => {
    "use strict";
    var e = t.i(271645),
        n = t.i(843476),
        i = e.createContext(void 0);
    t.s(["QueryClientProvider", 0, function(t) {
        var r = t.client,
            a = t.children;
        return e.useEffect(function() {
            return r.mount(),
                function() {
                    r.unmount()
                }
        }, [r]), (0, n.jsx)(i.Provider, {
            value: r,
            children: a
        })
    }, "useQueryClient", 0, function(t) {
        var n = e.useContext(i);
        if (t) return t;
        if (!n) throw Error("No QueryClient set, use QueryClientProvider to set one");
        return n
    }])
}, 203023, 903150, 273911, t => {
    "use strict";
    t.s(["_", 0, function(t, e, n) {
        if (!e.has(t)) throw TypeError("attempted to get private field on non-instance");
        return n
    }], 203023);
    var e = t.i(32041);
    t.s(["_", 0, function(t, n) {
        (0, e._)(t, n), n.add(t)
    }], 903150);
    var n = t.i(619273);
    t.s(["isServer", 0, function() {
        return n.isServer
    }], 273911)
}]);