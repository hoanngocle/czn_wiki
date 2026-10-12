(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 522016, (e, t, r) => {
    "use strict";
    e.i(247167);
    var n = e.r(743010),
        o = e.r(762278),
        a = e.r(767123),
        l = e.r(586639),
        i = e.r(416659);
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var u = {
        default: function() {
            return j
        },
        useLinkStatus: function() {
            return C
        }
    };
    for (var c in u) Object.defineProperty(r, c, {
        enumerable: !0,
        get: u[c]
    });
    var s = e.r(151836),
        f = e.r(843476),
        d = s._(e.r(271645)),
        p = e.r(195057),
        h = e.r(8372),
        v = e.r(818581),
        y = e.r(718967),
        g = e.r(405550),
        m = e.r(388540),
        b = e.r(91949),
        x = e.r(573668),
        _ = e.r(509396);

    function j(t) {
        var r, u, c, s, j = l._((0, d.useOptimistic)(b.IDLE_LINK_STATUS), 2),
            C = j[0],
            S = j[1],
            k = (0, d.useRef)(null),
            w = t.href,
            N = t.as,
            P = t.children,
            E = t.prefetch,
            O = void 0 === E ? null : E,
            L = t.passHref,
            M = t.replace,
            R = (t.shallow, t.scroll),
            A = t.onClick,
            B = t.onMouseEnter,
            I = t.onTouchStart,
            D = t.legacyBehavior,
            K = void 0 !== D && D,
            U = t.onNavigate,
            H = t.transitionTypes,
            F = t.ref,
            z = t.unstable_dynamicOnHover,
            G = a._(t, ["href", "as", "children", "prefetch", "passHref", "replace", "shallow", "scroll", "onClick", "onMouseEnter", "onTouchStart", "legacyBehavior", "onNavigate", "transitionTypes", "ref", "unstable_dynamicOnHover"]);
        u = P, K && ("string" == typeof u || "number" == typeof u) && (u = (0, f.jsx)("a", {
            children: u
        }));
        var W = d.default.useContext(h.AppRouterContext),
            X = !1 !== O,
            $ = !1 === O ? "none" : !0 === O ? "full" : "auto",
            J = "none" !== $ ? "auto" === $ ? _.FetchStrategy.PPR : _.FetchStrategy.Full : _.FetchStrategy.PPR,
            q = "string" == typeof(r = N || w) ? r : (0, p.formatUrl)(r);
        if (K) {
            if ((null == u ? void 0 : u.$$typeof) === Symbol.for("react.lazy")) throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: !1,
                configurable: !0
            });
            c = d.default.Children.only(u)
        }
        var Q = K ? c && (void 0 === c ? "undefined" : i._(c)) === "object" && c.ref : F,
            V = void 0,
            Y = d.default.useCallback(function(e) {
                return null !== W && (k.current = (0, b.mountLinkInstance)(e, q, W, J, X, S, V)),
                    function() {
                        k.current && ((0, b.unmountLinkForCurrentNavigation)(k.current), k.current = null), (0, b.unmountPrefetchableInstance)(e)
                    }
            }, [X, q, W, J, S, V]),
            Z = {
                ref: (0, v.useMergedRef)(Y, Q),
                onClick: function(t) {
                    K || "function" != typeof A || A(t), K && c.props && "function" == typeof c.props.onClick && c.props.onClick(t), !W || t.defaultPrevented || function(t, r, n, o, a, l, i) {
                        var u = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "none";
                        if ("u" > typeof window) {
                            if ("A" === t.currentTarget.nodeName.toUpperCase() && ((c = t.currentTarget.getAttribute("target")) && "_self" !== c || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || t.nativeEvent && 2 === t.nativeEvent.which) || t.currentTarget.hasAttribute("download")) return;
                            if (!(0, x.isLocalURL)(r)) {
                                o && (t.preventDefault(), location.replace(r));
                                return
                            }
                            if (t.preventDefault(), l) {
                                var c, s = !1;
                                if (l({
                                        preventDefault: function() {
                                            s = !0
                                        }
                                    }), s) return
                            }
                            var f = e.r(699781).dispatchNavigateAction;
                            d.default.startTransition(function() {
                                f(r, o ? "replace" : "push", !1 === a ? m.ScrollBehavior.NoScroll : m.ScrollBehavior.Default, n.current, i, u)
                            })
                        }
                    }(t, q, k, M, R, U, H, $)
                },
                onMouseEnter: function(e) {
                    K || "function" != typeof B || B(e), K && c.props && "function" == typeof c.props.onMouseEnter && c.props.onMouseEnter(e), !W || X && (0, b.onNavigationIntent)(e.currentTarget, !0 === z)
                },
                onTouchStart: function(e) {
                    K || "function" != typeof I || I(e), K && c.props && "function" == typeof c.props.onTouchStart && c.props.onTouchStart(e), !W || X && (0, b.onNavigationIntent)(e.currentTarget, !0 === z)
                }
            };
        return (0, y.isAbsoluteUrl)(q) ? Z.href = q : K && !L && ("a" !== c.type || "href" in c.props) || (Z.href = (0, g.addBasePath)(q)), s = K ? d.default.cloneElement(c, Z) : (0, f.jsx)("a", o._(n._({}, G, Z), {
            children: u
        })), (0, f.jsx)(T.Provider, {
            value: C,
            children: s
        })
    }
    var T = (0, d.createContext)(b.IDLE_LINK_STATUS),
        C = function() {
            return (0, d.useContext)(T)
        };
    ("function" == typeof r.default || "object" === i._(r.default) && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 818581, (e, t, r) => {
    "use strict";
    var n = e.r(416659);
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "useMergedRef", {
        enumerable: !0,
        get: function() {
            return a
        }
    });
    var o = e.r(271645);

    function a(e, t) {
        var r = (0, o.useRef)(null),
            n = (0, o.useRef)(null);
        return (0, o.useCallback)(function(o) {
            if (null === o) {
                var a = r.current;
                a && (r.current = null, a());
                var i = n.current;
                i && (n.current = null, i())
            } else e && (r.current = l(e, o)), t && (n.current = l(t, o))
        }, [e, t])
    }

    function l(e, t) {
        if ("function" != typeof e) return e.current = t,
            function() {
                e.current = null
            };
        var r = e(t);
        return "function" == typeof r ? r : function() {
            return e(null)
        }
    }("function" == typeof r.default || "object" === n._(r.default) && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 262957, e => {
    "use strict";
    e.i(247167);
    var t = e.i(843476),
        r = e.i(271645),
        n = e.i(522016),
        o = e.i(778497);
    e.s(["default", 0, function(e) {
        var a = e.error,
            l = e.reset;
        return (0, r.useEffect)(function() {
            o.logger.error({
                error: a.message,
                digest: a.digest,
                stack: void 0
            }, "Game section error")
        }, [a, !1]), (0, t.jsx)("div", {
            className: "flex items-center justify-center",
            style: {
                minHeight: "60vh",
                padding: "2rem"
            },
            children: (0, t.jsxs)("div", {
                className: "text-center",
                style: {
                    maxWidth: "32rem"
                },
                children: [(0, t.jsx)("div", {
                    className: "mb-6",
                    children: (0, t.jsx)("svg", {
                        width: "48",
                        height: "48",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        strokeWidth: 1.5,
                        style: {
                            color: "var(--color-brand-tertiary, #dc3545)"
                        },
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        })
                    })
                }), (0, t.jsx)("h1", {
                    className: "text-xl font-bold mb-4",
                    style: {
                        color: "var(--color-text-lighter, #e0e0e0)"
                    },
                    children: "Something went wrong"
                }), (0, t.jsxs)("p", {
                    className: "mb-6",
                    style: {
                        color: "var(--color-text-muted, #999)"
                    },
                    children: ["An error occurred while loading this game page. Please try again or return to the home page.", !1]
                }), !1, (0, t.jsxs)("div", {
                    className: "flex flex-col sm:flex-row gap-2 justify-center",
                    children: [(0, t.jsx)("button", {
                        onClick: l,
                        className: "pw-btn pw-btn-danger",
                        type: "button",
                        children: "Try Again"
                    }), (0, t.jsx)(n.default, {
                        href: "/",
                        className: "pw-btn pw-btn-outline-secondary",
                        children: "Go Home"
                    })]
                }), (0, t.jsxs)("p", {
                    className: "mt-6 small",
                    style: {
                        color: "var(--color-text-muted, #999)"
                    },
                    children: ["If this problem persists, please", " ", (0, t.jsx)("a", {
                        href: "https://discord.gg/prydwen",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        style: {
                            color: "var(--color-brand-primary, #6c8cff)"
                        },
                        children: "contact us on Discord"
                    }), "."]
                })]
            })
        })
    }])
}]);