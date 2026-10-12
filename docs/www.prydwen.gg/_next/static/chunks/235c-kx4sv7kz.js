(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 522016, (e, t, r) => {
    "use strict";
    e.i(247167);
    var n = e.r(743010),
        i = e.r(762278),
        a = e.r(767123),
        o = e.r(586639),
        l = e.r(416659);
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var u = {
        default: function() {
            return S
        },
        useLinkStatus: function() {
            return P
        }
    };
    for (var s in u) Object.defineProperty(r, s, {
        enumerable: !0,
        get: u[s]
    });
    var c = e.r(151836),
        d = e.r(843476),
        f = c._(e.r(271645)),
        p = e.r(195057),
        v = e.r(8372),
        g = e.r(818581),
        h = e.r(718967),
        m = e.r(405550),
        y = e.r(388540),
        b = e.r(91949),
        _ = e.r(573668),
        w = e.r(509396);

    function S(t) {
        var r, u, s, c, S = o._((0, f.useOptimistic)(b.IDLE_LINK_STATUS), 2),
            P = S[0],
            j = S[1],
            C = (0, f.useRef)(null),
            E = t.href,
            R = t.as,
            O = t.children,
            z = t.prefetch,
            I = void 0 === z ? null : z,
            k = t.passHref,
            T = t.replace,
            M = (t.shallow, t.scroll),
            L = t.onClick,
            N = t.onMouseEnter,
            A = t.onTouchStart,
            U = t.legacyBehavior,
            D = void 0 !== U && U,
            B = t.onNavigate,
            q = t.transitionTypes,
            F = t.ref,
            W = t.unstable_dynamicOnHover,
            H = a._(t, ["href", "as", "children", "prefetch", "passHref", "replace", "shallow", "scroll", "onClick", "onMouseEnter", "onTouchStart", "legacyBehavior", "onNavigate", "transitionTypes", "ref", "unstable_dynamicOnHover"]);
        u = O, D && ("string" == typeof u || "number" == typeof u) && (u = (0, d.jsx)("a", {
            children: u
        }));
        var K = f.default.useContext(v.AppRouterContext),
            G = !1 !== I,
            X = !1 === I ? "none" : !0 === I ? "full" : "auto",
            V = "none" !== X ? "auto" === X ? w.FetchStrategy.PPR : w.FetchStrategy.Full : w.FetchStrategy.PPR,
            $ = "string" == typeof(r = R || E) ? r : (0, p.formatUrl)(r);
        if (D) {
            if ((null == u ? void 0 : u.$$typeof) === Symbol.for("react.lazy")) throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: !1,
                configurable: !0
            });
            s = f.default.Children.only(u)
        }
        var J = D ? s && (void 0 === s ? "undefined" : l._(s)) === "object" && s.ref : F,
            Q = void 0,
            Y = f.default.useCallback(function(e) {
                return null !== K && (C.current = (0, b.mountLinkInstance)(e, $, K, V, G, j, Q)),
                    function() {
                        C.current && ((0, b.unmountLinkForCurrentNavigation)(C.current), C.current = null), (0, b.unmountPrefetchableInstance)(e)
                    }
            }, [G, $, K, V, j, Q]),
            Z = {
                ref: (0, g.useMergedRef)(Y, J),
                onClick: function(t) {
                    D || "function" != typeof L || L(t), D && s.props && "function" == typeof s.props.onClick && s.props.onClick(t), !K || t.defaultPrevented || function(t, r, n, i, a, o, l) {
                        var u = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "none";
                        if ("u" > typeof window) {
                            if ("A" === t.currentTarget.nodeName.toUpperCase() && ((s = t.currentTarget.getAttribute("target")) && "_self" !== s || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || t.nativeEvent && 2 === t.nativeEvent.which) || t.currentTarget.hasAttribute("download")) return;
                            if (!(0, _.isLocalURL)(r)) {
                                i && (t.preventDefault(), location.replace(r));
                                return
                            }
                            if (t.preventDefault(), o) {
                                var s, c = !1;
                                if (o({
                                        preventDefault: function() {
                                            c = !0
                                        }
                                    }), c) return
                            }
                            var d = e.r(699781).dispatchNavigateAction;
                            f.default.startTransition(function() {
                                d(r, i ? "replace" : "push", !1 === a ? y.ScrollBehavior.NoScroll : y.ScrollBehavior.Default, n.current, l, u)
                            })
                        }
                    }(t, $, C, T, M, B, q, X)
                },
                onMouseEnter: function(e) {
                    D || "function" != typeof N || N(e), D && s.props && "function" == typeof s.props.onMouseEnter && s.props.onMouseEnter(e), !K || G && (0, b.onNavigationIntent)(e.currentTarget, !0 === W)
                },
                onTouchStart: function(e) {
                    D || "function" != typeof A || A(e), D && s.props && "function" == typeof s.props.onTouchStart && s.props.onTouchStart(e), !K || G && (0, b.onNavigationIntent)(e.currentTarget, !0 === W)
                }
            };
        return (0, h.isAbsoluteUrl)($) ? Z.href = $ : D && !k && ("a" !== s.type || "href" in s.props) || (Z.href = (0, m.addBasePath)($)), c = D ? f.default.cloneElement(s, Z) : (0, d.jsx)("a", i._(n._({}, H, Z), {
            children: u
        })), (0, d.jsx)(x.Provider, {
            value: P,
            children: c
        })
    }
    var x = (0, f.createContext)(b.IDLE_LINK_STATUS),
        P = function() {
            return (0, f.useContext)(x)
        };
    ("function" == typeof r.default || "object" === l._(r.default) && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 605500, (e, t, r) => {
    "use strict";
    e.i(247167);
    var n = e.r(743010),
        i = e.r(762278),
        a = e.r(767123),
        o = e.r(586639),
        l = e.r(304821),
        u = e.r(144073),
        s = e.r(416659);
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "Image", {
        enumerable: !0,
        get: function() {
            return R
        }
    });
    var c = e.r(563141),
        d = e.r(151836),
        f = e.r(843476),
        p = d._(e.r(271645)),
        v = c._(e.r(174080)),
        g = c._(e.r(325633)),
        h = e.r(908927),
        m = e.r(987690),
        y = e.r(918556),
        b = e.r(65856),
        _ = c._(e.r(1948)),
        w = e.r(818581),
        S = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [32, 48, 64, 96, 128, 256, 384],
            qualities: [75],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !1
        };

    function x(e, t, r, a, o, l, u) {
        var s = null == e ? void 0 : e.src;
        e && e["data-loaded-src"] !== s && (e["data-loaded-src"] = s, ("decode" in e ? e.decode() : Promise.resolve()).catch(function() {}).then(function() {
            if (e.parentElement && e.isConnected) {
                if ("empty" !== t && o(!0), null == r ? void 0 : r.current) {
                    var l = new Event("load");
                    Object.defineProperty(l, "target", {
                        writable: !1,
                        value: e
                    });
                    var u = !1,
                        s = !1;
                    r.current(i._(n._({}, l), {
                        nativeEvent: l,
                        currentTarget: e,
                        target: e,
                        isDefaultPrevented: function() {
                            return u
                        },
                        isPropagationStopped: function() {
                            return s
                        },
                        persist: function() {},
                        preventDefault: function() {
                            u = !0, l.preventDefault()
                        },
                        stopPropagation: function() {
                            s = !0, l.stopPropagation()
                        }
                    }))
                }(null == a ? void 0 : a.current) && a.current(e)
            }
        }))
    }

    function P(e) {
        return p.use ? {
            fetchPriority: e
        } : {
            fetchpriority: e
        }
    }
    "u" < typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
    var j = "u" < typeof window ? p.useEffect : p.useLayoutEffect,
        C = (0, p.forwardRef)(function(e, t) {
            var r = l._([e, t]),
                u = r[0],
                s = r.slice(1),
                c = u.src,
                d = u.srcSet,
                v = u.sizes,
                g = u.height,
                h = u.width,
                m = u.decoding,
                y = u.className,
                b = u.style,
                _ = u.fetchPriority,
                S = u.placeholder,
                C = u.loading,
                E = u.unoptimized,
                R = u.fill,
                O = u.onLoadRef,
                z = u.onLoadingCompleteRef,
                I = u.setBlurComplete,
                k = u.setShowAltText,
                T = u.sizesInput,
                M = (u.onLoad, u.onError),
                L = a._(u, ["src", "srcSet", "sizes", "height", "width", "decoding", "className", "style", "fetchPriority", "placeholder", "loading", "unoptimized", "fill", "onLoadRef", "onLoadingCompleteRef", "setBlurComplete", "setShowAltText", "sizesInput", "onLoad", "onError"]),
                N = o._(s, 1)[0],
                A = (0, p.useRef)(!1),
                U = (0, p.useRef)(null);
            j(function() {
                var e = A.current,
                    t = U.current;
                e || null === t || (M && (t.src = t.src), t.complete && x(t, S, O, z, I, E, T), A.current = !0)
            }, [c, S, O, z, M, E, T]);
            var D = (0, w.useMergedRef)(N, U);
            return (0, f.jsx)("img", i._(n._({}, L, P(_)), {
                loading: C,
                width: h,
                height: g,
                decoding: m,
                "data-nimg": R ? "fill" : "1",
                className: y,
                style: b,
                sizes: v,
                srcSet: d,
                src: c,
                ref: D,
                onLoad: function(e) {
                    x(e.currentTarget, S, O, z, I, E, T)
                },
                onError: function(e) {
                    k(!0), "empty" !== S && I(!0), M && M(e)
                }
            }))
        });

    function E(e) {
        var t = e.isAppRouter,
            r = e.imgAttributes,
            i = n._({
                as: "image",
                imageSrcSet: r.srcSet,
                imageSizes: r.sizes,
                crossOrigin: r.crossOrigin,
                referrerPolicy: r.referrerPolicy
            }, P(r.fetchPriority));
        return t && v.default.preload ? (v.default.preload(r.src, i), null) : (0, f.jsx)(g.default, {
            children: (0, f.jsx)("link", n._({
                rel: "preload",
                href: r.srcSet ? void 0 : r.src
            }, i), "__nimg-" + r.src + r.srcSet + r.sizes)
        })
    }
    var R = (0, p.forwardRef)(function(e, t) {
        var r = (0, p.useContext)(b.RouterContext),
            a = (0, p.useContext)(y.ImageConfigContext),
            l = (0, p.useMemo)(function() {
                var e, t = S || a || m.imageConfigDefault,
                    r = u._(t.deviceSizes).concat(u._(t.imageSizes)).sort(function(e, t) {
                        return e - t
                    }),
                    o = t.deviceSizes.sort(function(e, t) {
                        return e - t
                    }),
                    l = null == (e = t.qualities) ? void 0 : e.sort(function(e, t) {
                        return e - t
                    });
                return i._(n._({}, t), {
                    allSizes: r,
                    deviceSizes: o,
                    qualities: l,
                    localPatterns: "u" < typeof window ? null == a ? void 0 : a.localPatterns : t.localPatterns
                })
            }, [a]),
            s = e.onLoad,
            c = e.onLoadingComplete,
            d = (0, p.useRef)(s);
        (0, p.useEffect)(function() {
            d.current = s
        }, [s]);
        var v = (0, p.useRef)(c);
        (0, p.useEffect)(function() {
            v.current = c
        }, [c]);
        var g = o._((0, p.useState)(!1), 2),
            w = g[0],
            x = g[1],
            P = o._((0, p.useState)(!1), 2),
            j = P[0],
            R = P[1],
            O = (0, h.getImgProps)(e, {
                defaultLoader: _.default,
                imgConf: l,
                blurComplete: w,
                showAltText: j
            }),
            z = O.props,
            I = O.meta;
        return (0, f.jsxs)(f.Fragment, {
            children: [(0, f.jsx)(C, i._(n._({}, z), {
                unoptimized: I.unoptimized,
                placeholder: I.placeholder,
                fill: I.fill,
                onLoadRef: d,
                onLoadingCompleteRef: v,
                setBlurComplete: x,
                setShowAltText: R,
                sizesInput: e.sizes,
                ref: t
            })), I.preload ? (0, f.jsx)(E, {
                isAppRouter: !r,
                imgAttributes: z
            }) : null]
        })
    });
    ("function" == typeof r.default || "object" === s._(r.default) && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
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
    var i = e.r(271645);

    function a(e, t) {
        var r = (0, i.useRef)(null),
            n = (0, i.useRef)(null);
        return (0, i.useCallback)(function(i) {
            if (null === i) {
                var a = r.current;
                a && (r.current = null, a());
                var l = n.current;
                l && (n.current = null, l())
            } else e && (r.current = o(e, i)), t && (n.current = o(t, i))
        }, [e, t])
    }

    function o(e, t) {
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
}, 670965, (e, t, r) => {
    "use strict";

    function n(e, t) {
        var r, n = e || 75;
        return (null == t || null == (r = t.qualities) ? void 0 : r.length) ? t.qualities.reduce(function(e, t) {
            return Math.abs(t - n) < Math.abs(e - n) ? t : e
        }, t.qualities[0]) : n
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "findClosestQuality", {
        enumerable: !0,
        get: function() {
            return n
        }
    })
}, 908927, (e, t, r) => {
    "use strict";
    e.i(247167);
    var n = e.r(743010),
        i = e.r(762278),
        a = e.r(767123),
        o = e.r(586639),
        l = e.r(304821),
        u = e.r(144073),
        s = e.r(416659);
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "getImgProps", {
        enumerable: !0,
        get: function() {
            return h
        }
    });
    var c = e.r(543369),
        d = e.r(488143),
        f = e.r(987690),
        p = ["-moz-initial", "fill", "none", "scale-down", void 0];

    function v(e) {
        return void 0 !== e.default
    }

    function g(e) {
        return void 0 === e ? e : "number" == typeof e ? Number.isFinite(e) ? e : NaN : "string" == typeof e && /^[0-9]+$/.test(e) ? parseInt(e, 10) : NaN
    }

    function h(e, t) {
        var r, h, m, y = l._([e, t]),
            b = y[0],
            _ = y.slice(1),
            w = b.src,
            S = b.sizes,
            x = b.unoptimized,
            P = void 0 !== x && x,
            j = b.priority,
            C = void 0 !== j && j,
            E = b.preload,
            R = void 0 !== E && E,
            O = b.loading,
            z = b.className,
            I = b.quality,
            k = b.width,
            T = b.height,
            M = b.fill,
            L = void 0 !== M && M,
            N = b.style,
            A = b.overrideSrc,
            U = (b.onLoad, b.onLoadingComplete, b.placeholder),
            D = void 0 === U ? "empty" : U,
            B = b.blurDataURL,
            q = b.fetchPriority,
            F = b.decoding,
            W = b.layout,
            H = b.objectFit,
            K = b.objectPosition,
            G = (b.lazyBoundary, b.lazyRoot, a._(b, ["src", "sizes", "unoptimized", "priority", "preload", "loading", "className", "quality", "width", "height", "fill", "style", "overrideSrc", "onLoad", "onLoadingComplete", "placeholder", "blurDataURL", "fetchPriority", "decoding", "layout", "objectFit", "objectPosition", "lazyBoundary", "lazyRoot"])),
            X = o._(_, 1)[0],
            V = X.imgConf,
            $ = X.showAltText,
            J = X.blurComplete,
            Q = X.defaultLoader,
            Y = V || f.imageConfigDefault;
        if ("allSizes" in Y) Z = Y;
        else {
            var Z, ee, et = u._(Y.deviceSizes).concat(u._(Y.imageSizes)).sort(function(e, t) {
                    return e - t
                }),
                er = Y.deviceSizes.sort(function(e, t) {
                    return e - t
                }),
                en = null == (ee = Y.qualities) ? void 0 : ee.sort(function(e, t) {
                    return e - t
                });
            Z = i._(n._({}, Y), {
                allSizes: et,
                deviceSizes: er,
                qualities: en
            })
        }
        if (void 0 === Q) throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"), "__NEXT_ERROR_CODE", {
            value: "E163",
            enumerable: !1,
            configurable: !0
        });
        var ei = G.loader || Q;
        delete G.loader, delete G.srcSet;
        var ea = "__next_img_default" in ei;
        if (ea) {
            if ("custom" === Z.loader) throw Object.defineProperty(Error('Image with src "'.concat(w, '" is missing "loader" prop.') + "\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader"), "__NEXT_ERROR_CODE", {
                value: "E252",
                enumerable: !1,
                configurable: !0
            })
        } else {
            var eo = ei;
            ei = function(e) {
                return e.config, eo(a._(e, ["config"]))
            }
        }
        if (W) {
            "fill" === W && (L = !0);
            var el = {
                intrinsic: {
                    maxWidth: "100%",
                    height: "auto"
                },
                responsive: {
                    width: "100%",
                    height: "auto"
                }
            }[W];
            el && (N = n._({}, N, el));
            var eu = {
                responsive: "100vw",
                fill: "100vw"
            }[W];
            eu && !S && (S = eu)
        }
        var es = "",
            ec = g(k),
            ed = g(T);
        if ((r = w) && (void 0 === r ? "undefined" : s._(r)) === "object" && (v(r) || void 0 !== r.src)) {
            var ef = v(w) ? w.default : w;
            if (!ef.src) throw Object.defineProperty(Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(ef))), "__NEXT_ERROR_CODE", {
                value: "E460",
                enumerable: !1,
                configurable: !0
            });
            if (!ef.height || !ef.width) throw Object.defineProperty(Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(ef))), "__NEXT_ERROR_CODE", {
                value: "E48",
                enumerable: !1,
                configurable: !0
            });
            if (h = ef.blurWidth, m = ef.blurHeight, B = B || ef.blurDataURL, es = ef.src, !L)
                if (ec || ed) {
                    if (ec && !ed) {
                        var ep = ec / ef.width;
                        ed = Math.round(ef.height * ep)
                    } else if (!ec && ed) {
                        var ev = ed / ef.height;
                        ec = Math.round(ef.width * ev)
                    }
                } else ec = ef.width, ed = ef.height
        }
        var eg = !C && !R && ("lazy" === O || void 0 === O);
        (!(w = "string" == typeof w ? w : es) || w.startsWith("data:") || w.startsWith("blob:")) && (P = !0, eg = !1), Z.unoptimized && (P = !0), ea && !Z.dangerouslyAllowSVG && w.split("?", 1)[0].endsWith(".svg") && (P = !0);
        var eh = g(I),
            em = Object.assign(L ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: H,
                objectPosition: K
            } : {}, $ ? {} : {
                color: "transparent"
            }, N),
            ey = J || "empty" === D ? null : "blur" === D ? 'url("data:image/svg+xml;charset=utf-8,'.concat((0, d.getImageBlurSvg)({
                widthInt: ec,
                heightInt: ed,
                blurWidth: h,
                blurHeight: m,
                blurDataURL: B || "",
                objectFit: em.objectFit
            }), '")') : 'url("'.concat(D, '")'),
            eb = p.includes(em.objectFit) ? "fill" === em.objectFit ? "100% 100%" : "cover" : em.objectFit,
            e_ = ey ? {
                backgroundSize: eb,
                backgroundPosition: em.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage: ey
            } : {},
            ew = function(e) {
                var t = e.config,
                    r = e.src,
                    n = e.unoptimized,
                    i = e.width,
                    a = e.quality,
                    o = e.sizes,
                    l = e.loader;
                if (n) {
                    if (r.startsWith("/") && !r.startsWith("//")) {
                        var s = (0, c.getDeploymentId)();
                        if (r.includes("/_next/static/immutable") && !(0, c.getAssetToken)()) s = void 0;
                        else if (s) {
                            var d = r.indexOf("?");
                            if (-1 !== d) {
                                var f = new URLSearchParams(r.slice(d + 1));
                                f.get("dpl") || (f.append("dpl", s), r = r.slice(0, d) + "?" + f.toString())
                            } else r += "?dpl=".concat(s)
                        }
                    }
                    return {
                        src: r,
                        srcSet: void 0,
                        sizes: void 0
                    }
                }
                var p = function(e, t, r) {
                        var n = e.deviceSizes,
                            i = e.allSizes;
                        if (r) {
                            for (var a = /(^|\s)(1?\d?\d)vw/g, o = []; l = a.exec(r);) o.push(parseInt(l[2]));
                            if (o.length) {
                                var l, s, c = .01 * (s = Math).min.apply(s, u._(o));
                                return {
                                    widths: i.filter(function(e) {
                                        return e >= n[0] * c
                                    }),
                                    kind: "w"
                                }
                            }
                            return {
                                widths: i,
                                kind: "w"
                            }
                        }
                        return "number" != typeof t ? {
                            widths: n,
                            kind: "w"
                        } : {
                            widths: u._(new Set([t, 2 * t].map(function(e) {
                                return i.find(function(t) {
                                    return t >= e
                                }) || i[i.length - 1]
                            }))),
                            kind: "x"
                        }
                    }(t, i, o),
                    v = p.widths,
                    g = p.kind,
                    h = v.length - 1;
                return {
                    sizes: o || "w" !== g ? o : "100vw",
                    srcSet: v.map(function(e, n) {
                        return "".concat(l({
                            config: t,
                            src: r,
                            quality: a,
                            width: e
                        }), " ").concat("w" === g ? e : n + 1).concat(g)
                    }).join(", "),
                    src: l({
                        config: t,
                        src: r,
                        quality: a,
                        width: v[h]
                    })
                }
            }({
                config: Z,
                src: w,
                unoptimized: P,
                width: ec,
                quality: eh,
                sizes: S,
                loader: ei
            }),
            eS = eg ? "lazy" : O;
        return {
            props: i._(n._({}, G), {
                loading: eS,
                fetchPriority: q,
                width: ec,
                height: ed,
                decoding: void 0 === F ? "async" : F,
                className: z,
                style: n._({}, em, e_),
                sizes: ew.sizes,
                srcSet: ew.srcSet,
                src: A || ew.src
            }),
            meta: {
                unoptimized: P,
                preload: R || C,
                placeholder: D,
                fill: L
            }
        }
    }
}, 325633, (e, t, r) => {
    "use strict";
    e.i(247167);
    var n = e.r(416659);
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var i = {
        default: function() {
            return h
        },
        defaultHead: function() {
            return f
        }
    };
    for (var a in i) Object.defineProperty(r, a, {
        enumerable: !0,
        get: i[a]
    });
    var o = e.r(563141),
        l = e.r(151836),
        u = e.r(843476),
        s = l._(e.r(271645)),
        c = o._(e.r(898879)),
        d = e.r(742732);

    function f() {
        return [(0, u.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"), (0, u.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")]
    }

    function p(e, t) {
        return "string" == typeof t || "number" == typeof t ? e : t.type === s.default.Fragment ? e.concat(s.default.Children.toArray(t.props.children).reduce(function(e, t) {
            return "string" == typeof t || "number" == typeof t ? e : e.concat(t)
        }, [])) : e.concat(t)
    }
    var v = ["name", "httpEquiv", "charSet", "itemProp"];

    function g(e) {
        var t, r, n, i;
        return e.reduce(p, []).reverse().concat(f().reverse()).filter((t = new Set, r = new Set, n = new Set, i = {}, function(e) {
            var a = !0,
                o = !1;
            if (e.key && "number" != typeof e.key && e.key.indexOf("$") > 0) {
                o = !0;
                var l = e.key.slice(e.key.indexOf("$") + 1);
                t.has(l) ? a = !1 : t.add(l)
            }
            switch (e.type) {
                case "title":
                case "base":
                    r.has(e.type) ? a = !1 : r.add(e.type);
                    break;
                case "meta":
                    for (var u = 0, s = v.length; u < s; u++) {
                        var c = v[u];
                        if (e.props.hasOwnProperty(c))
                            if ("charSet" === c) n.has(c) ? a = !1 : n.add(c);
                            else {
                                var d = e.props[c],
                                    f = i[c] || new Set;
                                ("name" !== c || !o) && f.has(d) ? a = !1 : (f.add(d), i[c] = f)
                            }
                    }
            }
            return a
        })).reverse().map(function(e, t) {
            var r = e.key || t;
            return s.default.cloneElement(e, {
                key: r
            })
        })
    }
    var h = function(e) {
        var t = e.children,
            r = (0, s.useContext)(d.HeadManagerContext);
        return (0, u.jsx)(c.default, {
            reduceComponentsToState: g,
            headManager: r,
            children: t
        })
    };
    ("function" == typeof r.default || "object" === n._(r.default) && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 488143, (e, t, r) => {
    "use strict";

    function n(e) {
        var t = e.widthInt,
            r = e.heightInt,
            n = e.blurWidth,
            i = e.blurHeight,
            a = e.blurDataURL,
            o = e.objectFit,
            l = n ? 40 * n : t,
            u = i ? 40 * i : r,
            s = l && u ? "viewBox='0 0 ".concat(l, " ").concat(u, "'") : "";
        return "%3Csvg xmlns='http://www.w3.org/2000/svg' ".concat(s, "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(20, "'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='").concat(20, "'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='").concat(s ? "none" : "contain" === o ? "xMidYMid" : "cover" === o ? "xMidYMid slice" : "none", "' style='filter: url(%23b);' href='").concat(a, "'/%3E%3C/svg%3E")
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "getImageBlurSvg", {
        enumerable: !0,
        get: function() {
            return n
        }
    })
}, 918556, (e, t, r) => {
    "use strict";
    e.i(247167), Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "ImageConfigContext", {
        enumerable: !0,
        get: function() {
            return a
        }
    });
    var n = e.r(563141)._(e.r(271645)),
        i = e.r(987690),
        a = n.default.createContext(i.imageConfigDefault)
}, 987690, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        VALID_LOADERS: function() {
            return a
        },
        imageConfigDefault: function() {
            return o
        }
    };
    for (var i in n) Object.defineProperty(r, i, {
        enumerable: !0,
        get: n[i]
    });
    var a = ["default", "imgix", "cloudinary", "akamai", "custom"],
        o = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            loaderFile: "",
            domains: [],
            disableStaticImages: !1,
            minimumCacheTTL: 14400,
            formats: ["image/webp"],
            maximumDiskCacheSize: void 0,
            maximumRedirects: 3,
            maximumResponseBody: 5e7,
            dangerouslyAllowLocalIP: !1,
            dangerouslyAllowSVG: !1,
            contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
            contentDispositionType: "attachment",
            localPatterns: void 0,
            remotePatterns: [],
            qualities: [75],
            unoptimized: !1,
            customCacheHandler: !1
        }
}, 794909, (e, t, r) => {
    "use strict";
    e.i(247167);
    var n = e.r(586639);
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var i = {
        default: function() {
            return d
        },
        getImageProps: function() {
            return c
        }
    };
    for (var a in i) Object.defineProperty(r, a, {
        enumerable: !0,
        get: i[a]
    });
    var o = e.r(563141),
        l = e.r(908927),
        u = e.r(605500),
        s = o._(e.r(1948));

    function c(e) {
        var t = (0, l.getImgProps)(e, {
                defaultLoader: s.default,
                imgConf: {
                    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                    imageSizes: [32, 48, 64, 96, 128, 256, 384],
                    qualities: [75],
                    path: "/_next/image",
                    loader: "default",
                    dangerouslyAllowSVG: !1,
                    unoptimized: !1
                }
            }).props,
            r = !0,
            i = !1,
            a = void 0;
        try {
            for (var o, u = Object.entries(t)[Symbol.iterator](); !(r = (o = u.next()).done); r = !0) {
                var c = n._(o.value, 2),
                    d = c[0],
                    f = c[1];
                void 0 === f && delete t[d]
            }
        } catch (e) {
            i = !0, a = e
        } finally {
            try {
                r || null == u.return || u.return()
            } finally {
                if (i) throw a
            }
        }
        return {
            props: t
        }
    }
    var d = u.Image
}, 657688, (e, t, r) => {
    t.exports = e.r(794909)
}, 1948, (e, t, r) => {
    "use strict";
    e.i(247167), Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function() {
            return o
        }
    });
    var n = e.r(670965),
        i = e.r(543369);

    function a(e) {
        var t, r = e.config,
            a = e.src,
            o = e.width,
            l = e.quality,
            u = (0, i.getDeploymentId)();
        if (a.startsWith("/") && !a.startsWith("//"))
            if (a.includes("/_next/static/immutable") && !(0, i.getAssetToken)()) u = void 0;
            else {
                var s = a.indexOf("?");
                if (-1 !== s) {
                    var c = new URLSearchParams(a.slice(s + 1)),
                        d = c.get("dpl");
                    if (d) {
                        u = d, c.delete("dpl");
                        var f = c.toString();
                        a = a.slice(0, s) + (f ? "?" + f : "")
                    }
                }
            }
        if (a.startsWith("/") && a.includes("?") && (null == (t = r.localPatterns) ? void 0 : t.length) === 1 && "**" === r.localPatterns[0].pathname && "" === r.localPatterns[0].search) throw Object.defineProperty(Error('Image with src "'.concat(a, '" is using a query string which is not configured in images.localPatterns.') + "\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns"), "__NEXT_ERROR_CODE", {
            value: "E871",
            enumerable: !1,
            configurable: !0
        });
        var p = (0, n.findClosestQuality)(l, r);
        return "".concat(r.path, "?url=").concat(encodeURIComponent(a), "&w=").concat(o, "&q=").concat(p).concat(a.startsWith("/") && u ? "&dpl=".concat(u) : "")
    }
    a.__next_img_default = !0;
    var o = a
}, 898879, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function() {
            return l
        }
    });
    var n = e.r(271645),
        i = "u" < typeof window,
        a = i ? function() {} : n.useLayoutEffect,
        o = i ? function() {} : n.useEffect;

    function l(e) {
        var t, r = e.headManager,
            l = e.reduceComponentsToState;

        function u() {
            if (r && r.mountedInstances) {
                var e = n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));
                r.updateHead(l(e))
            }
        }
        return i && (null == r || null == (t = r.mountedInstances) || t.add(e.children), u()), a(function() {
            var t;
            return null == r || null == (t = r.mountedInstances) || t.add(e.children),
                function() {
                    var t;
                    null == r || null == (t = r.mountedInstances) || t.delete(e.children)
                }
        }), a(function() {
            return r && (r._pendingUpdate = u),
                function() {
                    r && (r._pendingUpdate = u)
                }
        }), o(function() {
            return r && r._pendingUpdate && (r._pendingUpdate(), r._pendingUpdate = null),
                function() {
                    r && r._pendingUpdate && (r._pendingUpdate(), r._pendingUpdate = null)
                }
        }), null
    }
}, 296412, e => {
    "use strict";
    var t = e.i(843476),
        r = e.i(271645),
        n = (0, r.createContext)(null);
    e.s(["BannerSeedProvider", 0, function(e) {
        var r = e.seed,
            i = e.children;
        return (0, t.jsx)(n.Provider, {
            value: r,
            children: i
        })
    }, "useBannerSeed", 0, function() {
        return (0, r.useContext)(n)
    }])
}, 548124, 866301, 294496, e => {
    "use strict";
    var t = new Set(["afk-journey", "arknights-endfield", "chaos-zero-nightmare", "counter-side", "etheria-restart", "genshin-impact", "limbus-company", "lost-sword", "neverness-to-everness", "nikke", "persona-5x", "re1999", "resonance-solstice", "silver-and-blood", "star-rail", "sword-x-staff", "trickcal", "wuthering-waves", "zenless"]);
    e.s(["normalizeBannerPath", 0, function(e) {
        if (!e || "/" === e) return "/";
        var r, n = null != (r = e.split("/", 2)[1]) ? r : "";
        return t.has(n) ? "/".concat(n) : "/"
    }], 548124);
    var r = e.i(843476),
        n = e.i(271645),
        i = e.i(618566),
        a = e.i(769606),
        o = e.i(796886),
        l = new Set;

    function u(e, t) {
        var r = "".concat(e, "\0").concat(t);
        if (l.has(r)) return !1;
        if (l.size >= 2e3) {
            var n = l.values().next();
            n.done || l.delete(n.value)
        }
        return l.add(r), !0
    }

    function s(e) {
        var t = e.children,
            l = e.bannerId,
            s = e.targetUrl,
            d = e.className,
            f = (0, i.usePathname)(),
            p = (0, n.useRef)(!1),
            v = (0, n.useRef)(null);
        (0, n.useEffect)(function() {
            if (!p.current) {
                var e = v.current;
                if (e) {
                    if ("u" < typeof IntersectionObserver) {
                        p.current = !0, u(l, f) && c(l, f);
                        return
                    }
                    var t = new IntersectionObserver(function(e) {
                        var r = !0,
                            n = !1,
                            i = void 0;
                        try {
                            for (var a, o = e[Symbol.iterator](); !(r = (a = o.next()).done); r = !0)
                                if (a.value.isIntersecting && !p.current) {
                                    p.current = !0, u(l, f) && c(l, f), t.disconnect();
                                    return
                                }
                        } catch (e) {
                            n = !0, i = e
                        } finally {
                            try {
                                r || null == o.return || o.return()
                            } finally {
                                if (n) throw i
                            }
                        }
                    }, {
                        threshold: .5
                    });
                    return t.observe(e),
                        function() {
                            return t.disconnect()
                        }
                }
            }
        }, [l, f]);
        var g = (0, n.useCallback)(function() {
            (0, o.queueAnalyticsEvent)({
                eventType: "BANNER_CLICK",
                entityType: "PromotionalBanner",
                entityId: l,
                sessionId: (0, a.getSessionId)(),
                metadata: {
                    targetUrl: s,
                    sourcePage: f
                }
            }), (0, o.flushAnalyticsQueue)(), window.open(s, "_blank", "noopener,noreferrer")
        }, [l, s, f]);
        return (0, r.jsx)("div", {
            ref: v,
            onClick: g,
            className: d,
            style: {
                cursor: "pointer"
            },
            role: "link",
            tabIndex: 0,
            onKeyDown: function(e) {
                ("Enter" === e.key || " " === e.key) && g()
            },
            children: t
        })
    }

    function c(e, t) {
        (0, o.queueAnalyticsEvent)({
            eventType: "BANNER_IMPRESSION",
            entityType: "PromotionalBanner",
            entityId: e,
            pagePath: t,
            sessionId: (0, a.getSessionId)()
        })
    }
    e.s(["BannerClient", 0, function(e) {
        var t = e.banner,
            n = e.variant;
        return "alert" === (void 0 === n ? "image" : n) ? (0, r.jsx)(s, {
            bannerId: t.id,
            targetUrl: t.linkUrl,
            className: "banner-alert",
            children: (0, r.jsx)("div", {
                className: "pw-alert pw-alert-primary",
                children: (0, r.jsx)("p", {
                    children: t.altText || t.title
                })
            })
        }) : t.imageUrl ? t.imageUrlMobile ? (0, r.jsx)(s, {
            bannerId: t.id,
            targetUrl: t.linkUrl,
            className: "banner-image",
            children: (0, r.jsxs)("picture", {
                children: [(0, r.jsx)("source", {
                    media: "(max-width: 899px)",
                    srcSet: t.imageUrlMobile
                }), (0, r.jsx)("img", {
                    src: t.imageUrl,
                    alt: t.altText || t.title,
                    className: "banner-img",
                    loading: "TOP" === t.location ? "eager" : "lazy"
                })]
            })
        }) : (0, r.jsx)(s, {
            bannerId: t.id,
            targetUrl: t.linkUrl,
            className: "banner-image",
            children: (0, r.jsx)("img", {
                src: t.imageUrl,
                alt: t.altText || t.title,
                className: "banner-img",
                loading: "TOP" === t.location ? "eager" : "lazy",
                decoding: "async"
            })
        }) : (0, r.jsx)(s, {
            bannerId: t.id,
            targetUrl: t.linkUrl,
            className: "banner-text",
            children: (0, r.jsx)("div", {
                className: "banner-content",
                children: (0, r.jsx)("span", {
                    children: t.title
                })
            })
        })
    }], 866301);
    var d = "ad-free-hint-change";

    function f() {
        if ("u" < typeof document) return "unknown";
        var e = document.cookie.match(/(?:^|; )pw_ad_free=([^;]*)/);
        return e ? "1" === e[1] ? "ad-free" : "not-ad-free" : "unknown"
    }

    function p() {
        return "unknown"
    }

    function v(e) {
        return window.addEventListener(d, e),
            function() {
                window.removeEventListener(d, e)
            }
    }
    e.s(["useAdFreeHint", 0, function() {
        return (0, n.useSyncExternalStore)(v, f, p)
    }], 294496)
}, 292843, e => {
    "use strict";
    var t = e.i(271645),
        r = !1;
    e.s(["useRampReprocess", 0, function() {
        (0, t.useEffect)(function() {
            var e = window.ramp;
            !e || r || (r = !0, e.que.push(function() {
                var e, t;
                r = !1, null == (t = window.ramp) || null == (e = t.pageReprocess) || e.call(t)
            }))
        }, [])
    }])
}]);