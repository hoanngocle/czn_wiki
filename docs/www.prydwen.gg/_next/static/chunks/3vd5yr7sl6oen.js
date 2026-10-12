(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 398113, (e, t, r) => {
    t.exports = function(e, t) {
        this.v = e, this.k = t
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 352445, (e, t, r) => {
    var n = e.r(289204);
    t.exports = function(e, t) {
        if (!n._(e, t)) throw TypeError("Cannot call a class as a function")
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 514356, (e, t, r) => {
    var n = e.r(863974);

    function o(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, n(o.key), o)
        }
    }
    t.exports = function(e, t, r) {
        return t && o(e.prototype, t), r && o(e, r), Object.defineProperty(e, "prototype", {
            writable: !1
        }), e
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 332164, (e, t, r) => {
    t.exports = function(e) {
        if (void 0 === e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 180689, (e, t, r) => {
    var n = e.r(935045).default,
        o = e.r(332164);
    t.exports = function(e, t) {
        if (t && ("object" == n(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw TypeError("Derived constructors may only return object or undefined");
        return o(e)
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 619823, (e, t, r) => {
    function n(e) {
        return t.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, t.exports.__esModule = !0, t.exports.default = t.exports, n(e)
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports
}, 410885, (e, t, r) => {
    function n(e, r) {
        return t.exports = n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
            return e.__proto__ = t, e
        }, t.exports.__esModule = !0, t.exports.default = t.exports, n(e, r)
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports
}, 59947, (e, t, r) => {
    var n = e.r(410885);
    t.exports = function(e, t) {
        if ("function" != typeof t && null !== t) throw TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t && n(e, t)
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 245813, (e, t, r) => {
    t.exports = function(e) {
        try {
            return -1 !== Function.toString.call(e).indexOf("[native code]")
        } catch (t) {
            return "function" == typeof e
        }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 858524, (e, t, r) => {
    function n() {
        try {
            var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
        } catch (e) {}
        return (t.exports = n = function() {
            return !!e
        }, t.exports.__esModule = !0, t.exports.default = t.exports)()
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports
}, 742062, (e, t, r) => {
    var n = e.r(858524),
        o = e.r(410885);
    t.exports = function(e, t, r) {
        if (n()) return Reflect.construct.apply(null, arguments);
        var u = [null];
        u.push.apply(u, t);
        var a = new(e.bind.apply(e, u));
        return r && o(a, r.prototype), a
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 413098, (e, t, r) => {
    var n = e.r(619823),
        o = e.r(410885),
        u = e.r(245813),
        a = e.r(742062);

    function s(e) {
        var r = "function" == typeof Map ? new Map : void 0;
        return t.exports = s = function(e) {
            if (null === e || !u(e)) return e;
            if ("function" != typeof e) throw TypeError("Super expression must either be null or a function");
            if (void 0 !== r) {
                if (r.has(e)) return r.get(e);
                r.set(e, t)
            }

            function t() {
                return a(e, arguments, n(this).constructor)
            }
            return t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), o(t, e)
        }, t.exports.__esModule = !0, t.exports.default = t.exports, s(e)
    }
    t.exports = s, t.exports.__esModule = !0, t.exports.default = t.exports
}, 641731, (e, t, r) => {
    "use strict";
    var n = e.r(289204),
        o = e.r(13451);
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), r.UnsupportedStrategy = r.UnknownError = r.OAuthCallbackError = r.MissingSecret = r.MissingAuthorize = r.MissingAdapterMethods = r.MissingAdapter = r.MissingAPIRoute = r.InvalidCallbackUrl = r.AccountNotLinkedError = void 0, r.adapterErrorHandler = function(e, t) {
        if (e) return Object.keys(e).reduce(function(r, n) {
            return r[n] = (0, a.default)(u.default.mark(function r() {
                var o, a, s, i, c, l = arguments;
                return u.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            for (r.prev = 0, a = Array(o = l.length), s = 0; s < o; s++) a[s] = l[s];
                            return t.debug("adapter_".concat(n), {
                                args: a
                            }), i = e[n], r.next = 6, i.apply(void 0, a);
                        case 6:
                            return r.abrupt("return", r.sent);
                        case 9:
                            throw r.prev = 9, r.t0 = r.catch(0), t.error("adapter_error_".concat(n), r.t0), (c = new h(r.t0)).name = "".concat(y(n), "Error"), c;
                        case 15:
                        case "end":
                            return r.stop()
                    }
                }, r, null, [
                    [0, 9]
                ])
            })), r
        }, {})
    }, r.capitalize = y, r.eventsErrorHandler = function(e, t) {
        return Object.keys(e).reduce(function(r, n) {
            return r[n] = (0, a.default)(u.default.mark(function r() {
                var o, a = arguments;
                return u.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, o = e[n], r.next = 4, o.apply(void 0, a);
                        case 4:
                            return r.abrupt("return", r.sent);
                        case 7:
                            r.prev = 7, r.t0 = r.catch(0), t.error("".concat(x(n), "_EVENT_ERROR"), r.t0);
                        case 10:
                        case "end":
                            return r.stop()
                    }
                }, r, null, [
                    [0, 7]
                ])
            })), r
        }, {})
    }, r.upperSnake = x;
    var u = o(e.r(231277)),
        a = o(e.r(145940)),
        s = o(e.r(514414)),
        i = o(e.r(352445)),
        c = o(e.r(514356)),
        l = o(e.r(180689)),
        f = o(e.r(619823)),
        d = o(e.r(59947));

    function p(e, t, r) {
        return t = (0, f.default)(t), (0, l.default)(e, v() ? Reflect.construct(t, r || [], (0, f.default)(e).constructor) : t.apply(e, r))
    }

    function v() {
        try {
            var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
        } catch (e) {}
        return (v = function() {
            return !!e
        })()
    }
    var h = r.UnknownError = function(e) {
        function t(e) {
            var r, o;
            return (0, i.default)(this, t), (o = p(this, t, [null != (r = null == e ? void 0 : e.message) ? r : e])).name = "UnknownError", o.code = e.code, n._(e, Error) && (o.stack = e.stack), o
        }
        return (0, d.default)(t, e), (0, c.default)(t, [{
            key: "toJSON",
            value: function() {
                return {
                    name: this.name,
                    message: this.message,
                    stack: this.stack
                }
            }
        }])
    }((0, o(e.r(413098)).default)(Error));

    function x(e) {
        return e.replace(/([A-Z])/g, "_$1").toUpperCase()
    }

    function y(e) {
        return "".concat(e[0].toUpperCase()).concat(e.slice(1))
    }
    r.OAuthCallbackError = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "OAuthCallbackError"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h), r.AccountNotLinkedError = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "AccountNotLinkedError"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h), r.MissingAPIRoute = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "MissingAPIRouteError"), (0, s.default)(e, "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h), r.MissingSecret = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "MissingSecretError"), (0, s.default)(e, "code", "NO_SECRET"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h), r.MissingAuthorize = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "MissingAuthorizeError"), (0, s.default)(e, "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h), r.MissingAdapter = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "MissingAdapterError"), (0, s.default)(e, "code", "EMAIL_REQUIRES_ADAPTER_ERROR"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h), r.MissingAdapterMethods = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "MissingAdapterMethodsError"), (0, s.default)(e, "code", "MISSING_ADAPTER_METHODS_ERROR"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h), r.UnsupportedStrategy = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "UnsupportedStrategyError"), (0, s.default)(e, "code", "CALLBACK_CREDENTIALS_JWT_ERROR"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h), r.InvalidCallbackUrl = function(e) {
        function t() {
            var e;
            (0, i.default)(this, t);
            for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
            return e = p(this, t, [].concat(n)), (0, s.default)(e, "name", "InvalidCallbackUrl"), (0, s.default)(e, "code", "INVALID_CALLBACK_URL_ERROR"), e
        }
        return (0, d.default)(t, e), (0, c.default)(t)
    }(h)
}, 36357, (e, t, r) => {
    "use strict";
    var n = e.r(289204),
        o = e.r(13451);
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), r.default = void 0, r.proxyLogger = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
            t = arguments.length > 1 ? arguments[1] : void 0;
        try {
            if ("u" < typeof window) return e;
            var r = {},
                n = function(e) {
                    var n;
                    r[e] = (n = (0, s.default)(u.default.mark(function r(n, o) {
                        var s, i;
                        return u.default.wrap(function(r) {
                            for (;;) switch (r.prev = r.next) {
                                case 0:
                                    if (f[e](n, o), "error" === e && (o = l(o)), o.client = !0, s = "".concat(t, "/_log"), i = new URLSearchParams(function(e) {
                                            for (var t = 1; t < arguments.length; t++) {
                                                var r = null != arguments[t] ? arguments[t] : {};
                                                t % 2 ? c(Object(r), !0).forEach(function(t) {
                                                    (0, a.default)(e, t, r[t])
                                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : c(Object(r)).forEach(function(t) {
                                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                                                })
                                            }
                                            return e
                                        }({
                                            level: e,
                                            code: n
                                        }, o)), !navigator.sendBeacon) {
                                        r.next = 8;
                                        break
                                    }
                                    return r.abrupt("return", navigator.sendBeacon(s, i));
                                case 8:
                                    return r.next = 10, fetch(s, {
                                        method: "POST",
                                        body: i,
                                        keepalive: !0
                                    });
                                case 10:
                                    return r.abrupt("return", r.sent);
                                case 11:
                                case "end":
                                    return r.stop()
                            }
                        }, r)
                    })), function(e, t) {
                        return n.apply(this, arguments)
                    })
                };
            for (var o in e) n(o);
            return r
        } catch (e) {
            return f
        }
    }, r.setLogger = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 ? arguments[1] : void 0;
        t || (f.debug = function() {}), e.error && (f.error = e.error), e.warn && (f.warn = e.warn), e.debug && (f.debug = e.debug)
    };
    var u = o(e.r(231277)),
        a = o(e.r(514414)),
        s = o(e.r(145940)),
        i = e.r(641731);

    function c(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function l(e) {
        var t, r;
        if (n._(e, Error) && !n._(e, i.UnknownError)) return {
            message: e.message,
            stack: e.stack,
            name: e.name
        };
        if (null != (t = e) && t.error) {
            e.error = l(e.error), e.message = null != (r = e.message) ? r : e.error.message
        }
        return e
    }
    var f = {
        error: function(e, t) {
            t = l(t), console.error("[next-auth][error][".concat(e, "]"), "\nhttps://next-auth.js.org/errors#".concat(e.toLowerCase()), t.message, t)
        },
        warn: function(e) {
            console.warn("[next-auth][warn][".concat(e, "]"), "\nhttps://next-auth.js.org/warnings#".concat(e.toLowerCase()))
        },
        debug: function(e, t) {
            console.log("[next-auth][debug][".concat(e, "]"), t)
        }
    };
    r.default = f
}, 498520, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), r.default = function(e) {
        var t, r = new URL("http://localhost:3000/api/auth");
        e && !e.startsWith("http") && (e = "https://".concat(e));
        var n = new URL(null != (t = e) ? t : r),
            o = ("/" === n.pathname ? r.pathname : n.pathname).replace(/\/$/, ""),
            u = "".concat(n.origin).concat(o);
        return {
            origin: n.origin,
            host: n.host,
            path: o,
            base: u,
            toString: function() {
                return u
            }
        }
    }
}, 790120, (e, t, r) => {
    "use strict";
    var n = e.r(13451);
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), r.BroadcastChannel = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "nextauth.message";
        return {
            receive: function(t) {
                var r = function(r) {
                    if (r.key === e) {
                        var n, o = JSON.parse(null != (n = r.newValue) ? n : "{}");
                        (null == o ? void 0 : o.event) === "session" && null != o && o.data && t(o)
                    }
                };
                return window.addEventListener("storage", r),
                    function() {
                        return window.removeEventListener("storage", r)
                    }
            },
            post: function(t) {
                if ("u" > typeof window) try {
                    localStorage.setItem(e, JSON.stringify(i(i({}, t), {}, {
                        timestamp: f()
                    })))
                } catch (e) {}
            }
        }
    }, r.apiBaseUrl = l, r.fetchData = function(e, t, r) {
        return c.apply(this, arguments)
    }, r.now = f;
    var o = n(e.r(231277)),
        u = n(e.r(514414)),
        a = n(e.r(145940));

    function s(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function i(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? s(Object(r), !0).forEach(function(t) {
                (0, u.default)(e, t, r[t])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }

    function c() {
        return (c = (0, a.default)(o.default.mark(function e(t, r, n) {
            var u, a, s, c, f, d, p, v, h, x = arguments;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return a = (u = x.length > 3 && void 0 !== x[3] ? x[3] : {}).ctx, c = void 0 === (s = u.req) ? null == a ? void 0 : a.req : s, f = "".concat(l(r), "/").concat(t), e.prev = 2, p = {
                            headers: i({
                                "Content-Type": "application/json"
                            }, null != c && null != (d = c.headers) && d.cookie ? {
                                cookie: c.headers.cookie
                            } : {})
                        }, null != c && c.body && (p.body = JSON.stringify(c.body), p.method = "POST"), e.next = 7, fetch(f, p);
                    case 7:
                        return v = e.sent, e.next = 10, v.json();
                    case 10:
                        if (h = e.sent, v.ok) {
                            e.next = 13;
                            break
                        }
                        throw h;
                    case 13:
                        return e.abrupt("return", Object.keys(h).length > 0 ? h : null);
                    case 16:
                        return e.prev = 16, e.t0 = e.catch(2), n.error("CLIENT_FETCH_ERROR", {
                            error: e.t0,
                            url: f
                        }), e.abrupt("return", null);
                    case 20:
                    case "end":
                        return e.stop()
                }
            }, e, null, [
                [2, 16]
            ])
        }))).apply(this, arguments)
    }

    function l(e) {
        return "u" < typeof window ? "".concat(e.baseUrlServer).concat(e.basePathServer) : e.basePath
    }

    function f() {
        return Math.floor(Date.now() / 1e3)
    }
}, 13451, (e, t, r) => {
    t.exports = function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 935045, (e, t, r) => {
    function n(e) {
        return t.exports = n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, t.exports.__esModule = !0, t.exports.default = t.exports, n(e)
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports
}, 178679, (e, t, r) => {
    function n(e, r, o, u) {
        var a = Object.defineProperty;
        try {
            a({}, "", {})
        } catch (e) {
            a = 0
        }
        t.exports = n = function(e, t, r, o) {
            function u(t, r) {
                n(e, t, function(e) {
                    return this._invoke(t, r, e)
                })
            }
            t ? a ? a(e, t, {
                value: r,
                enumerable: !o,
                configurable: !o,
                writable: !o
            }) : e[t] = r : (u("next", 0), u("throw", 1), u("return", 2))
        }, t.exports.__esModule = !0, t.exports.default = t.exports, n(e, r, o, u)
    }
    t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports
}, 755157, (e, t, r) => {
    var n = e.r(289204),
        o = e.r(178679);

    function u() {
        var e, r, a = "function" == typeof Symbol ? Symbol : {},
            s = a.iterator || "@@iterator",
            i = a.toStringTag || "@@toStringTag";

        function c(t, u, a, s) {
            var i = Object.create((u && n._(u.prototype, f) ? u : f).prototype);
            return o(i, "_invoke", function(t, n, o) {
                var u, a, s, i = 0,
                    c = o || [],
                    f = !1,
                    d = {
                        p: 0,
                        n: 0,
                        v: e,
                        a: p,
                        f: p.bind(e, 4),
                        d: function(t, r) {
                            return u = t, a = 0, s = e, d.n = r, l
                        }
                    };

                function p(t, n) {
                    for (a = t, s = n, r = 0; !f && i && !o && r < c.length; r++) {
                        var o, u = c[r],
                            p = d.p,
                            v = u[2];
                        t > 3 ? (o = v === n) && (s = u[(a = u[4]) ? 5 : (a = 3, 3)], u[4] = u[5] = e) : u[0] <= p && ((o = t < 2 && p < u[1]) ? (a = 0, d.v = n, d.n = u[1]) : p < v && (o = t < 3 || u[0] > n || n > v) && (u[4] = t, u[5] = n, d.n = v, a = 0))
                    }
                    if (o || t > 1) return l;
                    throw f = !0, n
                }
                return function(o, c, v) {
                    if (i > 1) throw TypeError("Generator is already running");
                    for (f && 1 === c && p(c, v), a = c, s = v;
                        (r = a < 2 ? e : s) || !f;) {
                        u || (a ? a < 3 ? (a > 1 && (d.n = -1), p(a, s)) : d.n = s : d.v = s);
                        try {
                            if (i = 2, u) {
                                if (a || (o = "next"), r = u[o]) {
                                    if (!(r = r.call(u, s))) throw TypeError("iterator result is not an object");
                                    if (!r.done) return r;
                                    s = r.value, a < 2 && (a = 0)
                                } else 1 === a && (r = u.return) && r.call(u), a < 2 && (s = TypeError("The iterator does not provide a '" + o + "' method"), a = 1);
                                u = e
                            } else if ((r = (f = d.n < 0) ? s : t.call(n, d)) !== l) break
                        } catch (t) {
                            u = e, a = 1, s = t
                        } finally {
                            i = 1
                        }
                    }
                    return {
                        value: r,
                        done: f
                    }
                }
            }(t, a, s), !0), i
        }
        var l = {};

        function f() {}

        function d() {}

        function p() {}
        r = Object.getPrototypeOf;
        var v = p.prototype = f.prototype = Object.create([][s] ? r(r([][s]())) : (o(r = {}, s, function() {
            return this
        }), r));

        function h(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, p) : (e.__proto__ = p, o(e, i, "GeneratorFunction")), e.prototype = Object.create(v), e
        }
        return d.prototype = p, o(v, "constructor", p), o(p, "constructor", d), d.displayName = "GeneratorFunction", o(p, i, "GeneratorFunction"), o(v), o(v, i, "Generator"), o(v, s, function() {
            return this
        }), o(v, "toString", function() {
            return "[object Generator]"
        }), (t.exports = u = function() {
            return {
                w: c,
                m: h
            }
        }, t.exports.__esModule = !0, t.exports.default = t.exports)()
    }
    t.exports = u, t.exports.__esModule = !0, t.exports.default = t.exports
}, 336852, (e, t, r) => {
    var n = e.r(289204),
        o = e.r(398113),
        u = e.r(178679);
    t.exports = function e(t, r) {
        var a;
        this.next || (u(e.prototype), u(e.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
            return this
        })), u(this, "_invoke", function(e, u, s) {
            function i() {
                return new r(function(u, a) {
                    ! function e(u, a, s, i) {
                        try {
                            var c = t[u](a),
                                l = c.value;
                            return n._(l, o) ? r.resolve(l.v).then(function(t) {
                                e("next", t, s, i)
                            }, function(t) {
                                e("throw", t, s, i)
                            }) : r.resolve(l).then(function(e) {
                                c.value = e, s(c)
                            }, function(t) {
                                return e("throw", t, s, i)
                            })
                        } catch (e) {
                            i(e)
                        }
                    }(e, s, u, a)
                })
            }
            return a = a ? a.then(i, i) : i()
        }, !0)
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 506822, (e, t, r) => {
    var n = e.r(755157),
        o = e.r(336852);
    t.exports = function(e, t, r, u, a) {
        return new o(n().w(e, t, r, u), a || Promise)
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 288691, (e, t, r) => {
    var n = e.r(506822);
    t.exports = function(e, t, r, o, u) {
        var a = n(e, t, r, o, u);
        return a.next().then(function(e) {
            return e.done ? e.value : a.next()
        })
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 354534, (e, t, r) => {
    t.exports = function(e) {
        var t = Object(e),
            r = [];
        for (var n in t) r.unshift(n);
        return function e() {
            for (; r.length;)
                if ((n = r.pop()) in t) return e.value = n, e.done = !1, e;
            return e.done = !0, e
        }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 56299, (e, t, r) => {
    var n = e.r(935045).default;
    t.exports = function(e) {
        if (null != e) {
            var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
                r = 0;
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) return {
                next: function() {
                    return e && r >= e.length && (e = void 0), {
                        value: e && e[r++],
                        done: !e
                    }
                }
            }
        }
        throw TypeError(n(e) + " is not iterable")
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 330659, (e, t, r) => {
    var n = e.r(398113),
        o = e.r(755157),
        u = e.r(288691),
        a = e.r(506822),
        s = e.r(336852),
        i = e.r(354534),
        c = e.r(56299);

    function l() {
        "use strict";
        var e = o(),
            r = e.m(l),
            f = (Object.getPrototypeOf ? Object.getPrototypeOf(r) : r.__proto__).constructor;

        function d(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === f || "GeneratorFunction" === (t.displayName || t.name))
        }
        var p = {
            throw: 1,
            return: 2,
            break: 3,
            continue: 3
        };

        function v(e) {
            var t, r;
            return function(n) {
                t || (t = {
                    stop: function() {
                        return r(n.a, 2)
                    },
                    catch: function() {
                        return n.v
                    },
                    abrupt: function(e, t) {
                        return r(n.a, p[e], t)
                    },
                    delegateYield: function(e, o, u) {
                        return t.resultName = o, r(n.d, c(e), u)
                    },
                    finish: function(e) {
                        return r(n.f, e)
                    }
                }, r = function(e, r, o) {
                    n.p = t.prev, n.n = t.next;
                    try {
                        return e(r, o)
                    } finally {
                        t.next = n.n
                    }
                }), t.resultName && (t[t.resultName] = n.v, t.resultName = void 0), t.sent = n.v, t.next = n.n;
                try {
                    return e.call(this, t)
                } finally {
                    n.p = t.prev, n.n = t.next
                }
            }
        }
        return (t.exports = l = function() {
            return {
                wrap: function(t, r, n, o) {
                    return e.w(v(t), r, n, o && o.reverse())
                },
                isGeneratorFunction: d,
                mark: e.m,
                awrap: function(e, t) {
                    return new n(e, t)
                },
                AsyncIterator: s,
                async: function(e, t, r, n, o) {
                    return (d(t) ? a : u)(v(e), t, r, n, o)
                },
                keys: i,
                values: c
            }
        }, t.exports.__esModule = !0, t.exports.default = t.exports)()
    }
    t.exports = l, t.exports.__esModule = !0, t.exports.default = t.exports
}, 231277, (e, t, r) => {
    var n = e.r(416659),
        o = e.r(330659)();
    t.exports = o;
    try {
        regeneratorRuntime = o
    } catch (e) {
        ("u" < typeof globalThis ? "undefined" : n._(globalThis)) === "object" ? globalThis.regeneratorRuntime = o: Function("r", "regeneratorRuntime = r")(o)
    }
}, 226252, (e, t, r) => {
    var n = e.r(935045).default;
    t.exports = function(e, t) {
        if ("object" != n(e) || !e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
            var o = r.call(e, t || "default");
            if ("object" != n(o)) return o;
            throw TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === t ? String : Number)(e)
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 863974, (e, t, r) => {
    var n = e.r(935045).default,
        o = e.r(226252);
    t.exports = function(e) {
        var t = o(e, "string");
        return "symbol" == n(t) ? t : t + ""
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 514414, (e, t, r) => {
    var n = e.r(863974);
    t.exports = function(e, t, r) {
        return (t = n(t)) in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 145940, (e, t, r) => {
    function n(e, t, r, n, o, u, a) {
        try {
            var s = e[u](a),
                i = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(i) : Promise.resolve(i).then(n, o)
    }
    t.exports = function(e) {
        return function() {
            var t = this,
                r = arguments;
            return new Promise(function(o, u) {
                var a = e.apply(t, r);

                function s(e) {
                    n(a, o, u, s, i, "next", e)
                }

                function i(e) {
                    n(a, o, u, s, i, "throw", e)
                }
                s(void 0)
            })
        }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 31159, (e, t, r) => {
    t.exports = function(e) {
        if (Array.isArray(e)) return e
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 773973, (e, t, r) => {
    t.exports = function(e, t) {
        var r = null == e ? null : "u" > typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (null != r) {
            var n, o, u, a, s = [],
                i = !0,
                c = !1;
            try {
                if (u = (r = r.call(e)).next, 0 === t) {
                    if (Object(r) !== r) return;
                    i = !1
                } else
                    for (; !(i = (n = u.call(r)).done) && (s.push(n.value), s.length !== t); i = !0);
            } catch (e) {
                c = !0, o = e
            } finally {
                try {
                    if (!i && null != r.return && (a = r.return(), Object(a) !== a)) return
                } finally {
                    if (c) throw o
                }
            }
            return s
        }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 427500, (e, t, r) => {
    t.exports = function(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 737906, (e, t, r) => {
    var n = e.r(427500);
    t.exports = function(e, t) {
        if (e) {
            if ("string" == typeof e) return n(e, t);
            var r = ({}).toString.call(e).slice(8, -1);
            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0
        }
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 294441, (e, t, r) => {
    t.exports = function() {
        throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 462195, (e, t, r) => {
    var n = e.r(31159),
        o = e.r(773973),
        u = e.r(737906),
        a = e.r(294441);
    t.exports = function(e, t) {
        return n(e) || o(e, t) || u(e, t) || a()
    }, t.exports.__esModule = !0, t.exports.default = t.exports
}, 627667, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    })
}, 217255, (e, t, r) => {
    "use strict";
    var n, o, u, a, s, i = e.i(247167),
        c = e.r(13451),
        l = e.r(935045);
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var f = {
        SessionContext: !0,
        useSession: !0,
        getSession: !0,
        getCsrfToken: !0,
        getProviders: !0,
        signIn: !0,
        signOut: !0,
        SessionProvider: !0
    };
    r.SessionContext = void 0, r.SessionProvider = function(e) {
        if (!k) throw Error("React Context is unavailable in Server Components");
        var t, r, n, o, u, a, s = e.children,
            i = e.basePath,
            c = e.refetchInterval,
            l = e.refetchWhenOffline;
        i && (j.basePath = i);
        var f = void 0 !== e.session;
        j._lastSync = f ? (0, g.now)() : 0;
        var p = x.useState(function() {
                return f && (j._session = e.session), e.session
            }),
            y = (0, h.default)(p, 2),
            b = y[0],
            w = y[1],
            O = x.useState(!f),
            m = (0, h.default)(O, 2),
            S = m[0],
            E = m[1];
        x.useEffect(function() {
            return j._getSession = (0, v.default)(d.default.mark(function e() {
                    var t, r, n = arguments;
                    return d.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (t = (n.length > 0 && void 0 !== n[0] ? n[0] : {}).event, e.prev = 1, !((r = "storage" === t) || void 0 === j._session)) {
                                    e.next = 10;
                                    break
                                }
                                return j._lastSync = (0, g.now)(), e.next = 7, M({
                                    broadcast: !r
                                });
                            case 7:
                                return j._session = e.sent, w(j._session), e.abrupt("return");
                            case 10:
                                if (!(!t || null === j._session || (0, g.now)() < j._lastSync)) {
                                    e.next = 12;
                                    break
                                }
                                return e.abrupt("return");
                            case 12:
                                return j._lastSync = (0, g.now)(), e.next = 15, M();
                            case 15:
                                j._session = e.sent, w(j._session), e.next = 22;
                                break;
                            case 19:
                                e.prev = 19, e.t0 = e.catch(1), P.error("CLIENT_SESSION_ERROR", e.t0);
                            case 22:
                                return e.prev = 22, E(!1), e.finish(22);
                            case 25:
                            case "end":
                                return e.stop()
                        }
                    }, e, null, [
                        [1, 19, 22, 25]
                    ])
                })), j._getSession(),
                function() {
                    j._lastSync = 0, j._session = void 0, j._getSession = function() {}
                }
        }, []), x.useEffect(function() {
            var e = A.receive(function() {
                return j._getSession({
                    event: "storage"
                })
            });
            return function() {
                return e()
            }
        }, []), x.useEffect(function() {
            var t = e.refetchOnWindowFocus,
                r = void 0 === t || t,
                n = function() {
                    r && "visible" === document.visibilityState && j._getSession({
                        event: "visibilitychange"
                    })
                };
            return document.addEventListener("visibilitychange", n, !1),
                function() {
                    return document.removeEventListener("visibilitychange", n, !1)
                }
        }, [e.refetchOnWindowFocus]);
        var R = (t = x.useState("u" > typeof navigator && navigator.onLine), n = (r = (0, h.default)(t, 2))[0], o = r[1], u = function() {
                return o(!0)
            }, a = function() {
                return o(!1)
            }, x.useEffect(function() {
                return window.addEventListener("online", u), window.addEventListener("offline", a),
                    function() {
                        window.removeEventListener("online", u), window.removeEventListener("offline", a)
                    }
            }, []), n),
            T = !1 !== l || R;
        x.useEffect(function() {
            if (c && T) {
                var e = setInterval(function() {
                    j._session && j._getSession({
                        event: "poll"
                    })
                }, 1e3 * c);
                return function() {
                    return clearInterval(e)
                }
            }
        }, [c, T]);
        var U = x.useMemo(function() {
            return {
                data: b,
                status: S ? "loading" : b ? "authenticated" : "unauthenticated",
                update: function(e) {
                    return (0, v.default)(d.default.mark(function t() {
                        var r;
                        return d.default.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!(S || !b)) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 2:
                                    return E(!0), t.t0 = g.fetchData, t.t1 = j, t.t2 = P, t.next = 8, L();
                                case 8:
                                    return t.t3 = t.sent, t.t4 = e, t.t5 = {
                                        csrfToken: t.t3,
                                        data: t.t4
                                    }, t.t6 = {
                                        body: t.t5
                                    }, t.t7 = {
                                        req: t.t6
                                    }, t.next = 15, (0, t.t0)("session", t.t1, t.t2, t.t7);
                                case 15:
                                    return r = t.sent, E(!1), r && (w(r), A.post({
                                        event: "session",
                                        data: {
                                            trigger: "getSession"
                                        }
                                    })), t.abrupt("return", r);
                                case 19:
                                case "end":
                                    return t.stop()
                            }
                        }, t)
                    }))()
                }
            }
        }, [b, S]);
        return (0, _.jsx)(k.Provider, {
            value: U,
            children: s
        })
    }, r.getCsrfToken = L, r.getProviders = U, r.getSession = M, r.signIn = function(e, t, r) {
        return I.apply(this, arguments)
    }, r.signOut = function(e) {
        return N.apply(this, arguments)
    }, r.useSession = function(e) {
        if (!k) throw Error("React Context is unavailable in Server Components");
        var t = x.useContext(k),
            r = null != e ? e : {},
            n = r.required,
            o = r.onUnauthenticated,
            u = n && "unauthenticated" === t.status;
        return (x.useEffect(function() {
            if (u) {
                var e = "/api/auth/signin?".concat(new URLSearchParams({
                    error: "SessionRequired",
                    callbackUrl: window.location.href
                }));
                o ? o() : window.location.href = e
            }
        }, [u, o]), u) ? {
            data: t.data,
            update: t.update,
            status: "loading"
        } : t
    };
    var d = c(e.r(231277)),
        p = c(e.r(514414)),
        v = c(e.r(145940)),
        h = c(e.r(462195)),
        x = m(e.r(271645)),
        y = m(e.r(36357)),
        b = c(e.r(498520)),
        g = e.r(790120),
        _ = e.r(843476),
        w = e.r(627667);

    function O(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap,
            r = new WeakMap;
        return (O = function(e) {
            return e ? r : t
        })(e)
    }

    function m(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || "object" != l(e) && "function" != typeof e) return {
            default: e
        };
        var r = O(t);
        if (r && r.has(e)) return r.get(e);
        var n = {
                __proto__: null
            },
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var u in e)
            if ("default" !== u && ({}).hasOwnProperty.call(e, u)) {
                var a = o ? Object.getOwnPropertyDescriptor(e, u) : null;
                a && (a.get || a.set) ? Object.defineProperty(n, u, a) : n[u] = e[u]
            }
        return n.default = e, r && r.set(e, n), n
    }

    function S(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function E(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? S(Object(r), !0).forEach(function(t) {
                (0, p.default)(e, t, r[t])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : S(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    Object.keys(w).forEach(function(e) {
        "default" === e || "__esModule" === e || Object.prototype.hasOwnProperty.call(f, e) || e in r && r[e] === w[e] || Object.defineProperty(r, e, {
            enumerable: !0,
            get: function() {
                return w[e]
            }
        })
    });
    var j = {
            baseUrl: (0, b.default)(null != (n = i.default.env.NEXTAUTH_URL) ? n : i.default.env.VERCEL_URL).origin,
            basePath: (0, b.default)(i.default.env.NEXTAUTH_URL).path,
            baseUrlServer: (0, b.default)(null != (o = null != (u = i.default.env.NEXTAUTH_URL_INTERNAL) ? u : i.default.env.NEXTAUTH_URL) ? o : i.default.env.VERCEL_URL).origin,
            basePathServer: (0, b.default)(null != (a = i.default.env.NEXTAUTH_URL_INTERNAL) ? a : i.default.env.NEXTAUTH_URL).path,
            _lastSync: 0,
            _session: void 0,
            _getSession: function() {}
        },
        A = (0, g.BroadcastChannel)(),
        P = (0, y.proxyLogger)(y.default, j.basePath),
        k = r.SessionContext = null == (s = x.createContext) ? void 0 : s.call(x, void 0);

    function M(e) {
        return R.apply(this, arguments)
    }

    function R() {
        return (R = (0, v.default)(d.default.mark(function e(t) {
            var r, n;
            return d.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2, (0, g.fetchData)("session", j, P, t);
                    case 2:
                        return n = e.sent, (null == (r = null == t ? void 0 : t.broadcast) || r) && A.post({
                            event: "session",
                            data: {
                                trigger: "getSession"
                            }
                        }), e.abrupt("return", n);
                    case 5:
                    case "end":
                        return e.stop()
                }
            }, e)
        }))).apply(this, arguments)
    }

    function L(e) {
        return T.apply(this, arguments)
    }

    function T() {
        return (T = (0, v.default)(d.default.mark(function e(t) {
            var r;
            return d.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2, (0, g.fetchData)("csrf", j, P, t);
                    case 2:
                        return r = e.sent, e.abrupt("return", null == r ? void 0 : r.csrfToken);
                    case 4:
                    case "end":
                        return e.stop()
                }
            }, e)
        }))).apply(this, arguments)
    }

    function U() {
        return C.apply(this, arguments)
    }

    function C() {
        return (C = (0, v.default)(d.default.mark(function e() {
            return d.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2, (0, g.fetchData)("providers", j, P);
                    case 2:
                        return e.abrupt("return", e.sent);
                    case 3:
                    case "end":
                        return e.stop()
                }
            }, e)
        }))).apply(this, arguments)
    }

    function I() {
        return (I = (0, v.default)(d.default.mark(function e(t, r, n) {
            var o, u, a, s, i, c, l, f, p, v, h, x, y, b, _, w, O;
            return d.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return a = void 0 === (u = (o = null != r ? r : {}).callbackUrl) ? window.location.href : u, i = void 0 === (s = o.redirect) || s, c = (0, g.apiBaseUrl)(j), e.next = 4, U();
                    case 4:
                        if (l = e.sent) {
                            e.next = 8;
                            break
                        }
                        return window.location.href = "".concat(c, "/error"), e.abrupt("return");
                    case 8:
                        if (!(!t || !(t in l))) {
                            e.next = 11;
                            break
                        }
                        return window.location.href = "".concat(c, "/signin?").concat(new URLSearchParams({
                            callbackUrl: a
                        })), e.abrupt("return");
                    case 11:
                        return f = "credentials" === l[t].type, p = "email" === l[t].type, v = f || p, h = "".concat(c, "/").concat(f ? "callback" : "signin", "/").concat(t), x = "".concat(h).concat(n ? "?".concat(new URLSearchParams(n)) : ""), e.t0 = fetch, e.t1 = x, e.t2 = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }, e.t3 = URLSearchParams, e.t4 = E, e.t5 = E({}, r), e.t6 = {}, e.next = 25, L();
                    case 25:
                        return e.t7 = e.sent, e.t8 = a, e.t9 = {
                            csrfToken: e.t7,
                            callbackUrl: e.t8,
                            json: !0
                        }, e.t10 = (0, e.t4)(e.t5, e.t6, e.t9), e.t11 = new e.t3(e.t10), e.t12 = {
                            method: "post",
                            headers: e.t2,
                            body: e.t11
                        }, e.next = 33, (0, e.t0)(e.t1, e.t12);
                    case 33:
                        return y = e.sent, e.next = 36, y.json();
                    case 36:
                        if (b = e.sent, !(i || !v)) {
                            e.next = 42;
                            break
                        }
                        return w = null != (_ = b.url) ? _ : a, window.location.href = w, w.includes("#") && window.location.reload(), e.abrupt("return");
                    case 42:
                        if (O = new URL(b.url).searchParams.get("error"), !y.ok) {
                            e.next = 46;
                            break
                        }
                        return e.next = 46, j._getSession({
                            event: "storage"
                        });
                    case 46:
                        return e.abrupt("return", {
                            error: O,
                            status: y.status,
                            ok: y.ok,
                            url: O ? null : b.url
                        });
                    case 47:
                    case "end":
                        return e.stop()
                }
            }, e)
        }))).apply(this, arguments)
    }

    function N() {
        return (N = (0, v.default)(d.default.mark(function e(t) {
            var r, n, o, u, a, s, i, c, l;
            return d.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return o = void 0 === (n = (null != t ? t : {}).callbackUrl) ? window.location.href : n, u = (0, g.apiBaseUrl)(j), e.t0 = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }, e.t1 = URLSearchParams, e.next = 6, L();
                    case 6:
                        return e.t2 = e.sent, e.t3 = o, e.t4 = {
                            csrfToken: e.t2,
                            callbackUrl: e.t3,
                            json: !0
                        }, e.t5 = new e.t1(e.t4), a = {
                            method: "post",
                            headers: e.t0,
                            body: e.t5
                        }, e.next = 13, fetch("".concat(u, "/signout"), a);
                    case 13:
                        return s = e.sent, e.next = 16, s.json();
                    case 16:
                        if (i = e.sent, A.post({
                                event: "session",
                                data: {
                                    trigger: "signout"
                                }
                            }), !(null == (r = null == t ? void 0 : t.redirect) || r)) {
                            e.next = 23;
                            break
                        }
                        return l = null != (c = i.url) ? c : o, window.location.href = l, l.includes("#") && window.location.reload(), e.abrupt("return");
                    case 23:
                        return e.next = 25, j._getSession({
                            event: "storage"
                        });
                    case 25:
                        return e.abrupt("return", i);
                    case 26:
                    case "end":
                        return e.stop()
                }
            }, e)
        }))).apply(this, arguments)
    }
}, 758240, e => {
    "use strict";
    var t = e.i(247167),
        r = e.i(271645);

    function n(e) {
        return window.addEventListener("storage", e), window.addEventListener("ad-dev-override-change", e),
            function() {
                window.removeEventListener("storage", e), window.removeEventListener("ad-dev-override-change", e)
            }
    }

    function o() {
        return null
    }

    function u() {
        return null
    }

    function a() {
        return null
    }
    e.s(["AD_DEV_STORAGE_KEYS", 0, {
        placeholderMode: "dev:ads-placeholder-mode",
        adFreeOverride: "dev:ads-ad-free-override"
    }, "isAdsBlocked", 0, function(e) {
        return "on" === e.override || "off" !== e.override && !e.isLoading && e.isAdFree
    }, "useAdFreeOverride", 0, function() {
        return (0, r.useSyncExternalStore)(n, u, a)
    }, "useAdPlaceholderMode", 0, function() {
        var e = (0, r.useSyncExternalStore)(n, o, a),
            u = "true" === t.default.env.NEXT_PUBLIC_ADS_PLACEHOLDER_MODE;
        return null !== e ? e : u
    }])
}, 8359, e => {
    "use strict";
    var t = e.i(217255),
        r = e.i(271645),
        n = e.i(758240);

    function o() {
        var e = (0, t.useSession)(),
            n = e.data,
            o = e.status;
        return (0, r.useMemo)(function() {
            var e = "loading" === o,
                t = "authenticated" === o && !!(null == n ? void 0 : n.user);
            if (e) return {
                isAdFree: !1,
                isLoading: !0,
                isLoggedIn: !1,
                expiresAt: null,
                source: null
            };
            if (!t || !(null == n ? void 0 : n.user)) return {
                isAdFree: !1,
                isLoading: !1,
                isLoggedIn: !1,
                expiresAt: null,
                source: null
            };
            var r = n.user;
            if (r.isAdmin) return {
                isAdFree: !0,
                isLoading: !1,
                isLoggedIn: !0,
                expiresAt: null,
                source: "admin"
            };
            var u = r.isAdFree;
            return u && r.adFreeUntil && new Date(r.adFreeUntil) < new Date && (u = !1), {
                isAdFree: u,
                isLoading: !1,
                isLoggedIn: !0,
                expiresAt: r.adFreeUntil ? new Date(r.adFreeUntil) : null,
                source: null
            }
        }, [n, o])
    }
    e.s(["useAdFree", 0, o, "useAdsBlocked", 0, function() {
        var e = o(),
            t = e.isAdFree,
            r = e.isLoading,
            u = (0, n.useAdFreeOverride)();
        return (0, n.isAdsBlocked)({
            isAdFree: t,
            isLoading: r,
            override: u
        })
    }, "useShouldHideBanners", 0, function() {
        var e = o(),
            t = e.isAdFree,
            r = e.isLoading,
            u = (0, n.useAdFreeOverride)();
        return "on" === u || "off" !== u && (r || t)
    }, "useShouldShowAds", 0, function() {
        var e = o(),
            t = e.isAdFree,
            r = e.isLoading,
            u = (0, n.useAdFreeOverride)();
        return "on" !== u && ("off" === u || !r && !t)
    }])
}]);