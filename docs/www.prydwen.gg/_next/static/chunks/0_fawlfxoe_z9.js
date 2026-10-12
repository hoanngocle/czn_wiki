(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 116253, e => {
    "use strict";
    var t = e.i(511938),
        a = e.i(480388),
        i = e.i(181788),
        n = e.i(843476),
        l = e.i(271645),
        r = e.i(259087),
        o = e.i(617870),
        c = e.i(149721),
        d = e.i(468757),
        s = e.i(327427),
        u = e.i(486453),
        m = e.i(654932),
        v = e.i(977990),
        h = {
            "circle-info": "ℹ️",
            lightbulb: "💡",
            "triangle-exclamation": "⚠️",
            "circle-exclamation": "❗",
            "pen-to-square": "📝",
            "question-circle": "❓",
            "check-circle": "✅",
            "times-circle": "❌",
            star: "⭐",
            fire: "🔥",
            bolt: "⚡",
            shield: "🛡️"
        };

    function p(e) {
        var t = e.type,
            a = e.title,
            i = e.children,
            r = e.customTypes,
            o = e.className,
            c = (0, l.useMemo)(function() {
                var e = r || v.DEFAULT_CALLOUT_TYPES;
                return e.find(function(e) {
                    return e.key === t
                }) || e[0]
            }, [t, r]),
            d = h[c.icon] || h["circle-info"];
        return (0, n.jsxs)("div", {
            className: "callout callout-".concat(t, " ").concat(void 0 === o ? "" : o),
            style: {
                "--callout-color": c.color
            },
            "data-callout": "",
            "data-callout-type": t,
            children: [(0, n.jsxs)("div", {
                className: "callout-header",
                children: [(0, n.jsx)("span", {
                    className: "callout-icon",
                    "aria-hidden": "true",
                    children: d
                }), (0, n.jsx)("span", {
                    className: "callout-title",
                    children: a || c.label
                })]
            }), (0, n.jsx)("div", {
                className: "callout-content",
                children: i
            })]
        })
    }
    var b = e.i(317608);

    function f(e) {
        var t = e.label,
            a = e.defaultOpen,
            i = e.children,
            r = e.className,
            o = (0, l.useId)(),
            c = "spoiler-content-".concat(o),
            d = (0, b._)((0, l.useState)(void 0 !== a && a), 2),
            s = d[0],
            u = d[1],
            m = (0, l.useCallback)(function() {
                u(function(e) {
                    return !e
                })
            }, []);
        return (0, n.jsxs)("div", {
            className: "spoiler-block ".concat(s ? "spoiler-block-open" : "", " ").concat(void 0 === r ? "" : r),
            "data-spoiler-block": "",
            "data-spoiler-open": s ? "true" : "false",
            children: [(0, n.jsxs)("button", {
                type: "button",
                className: "spoiler-block-summary",
                onClick: m,
                "aria-expanded": s,
                "aria-controls": c,
                children: [(0, n.jsx)("span", {
                    className: "spoiler-block-icon",
                    "aria-hidden": "true",
                    children: s ? "▼" : "▶"
                }), (0, n.jsx)("span", {
                    className: "spoiler-block-label",
                    children: void 0 === t ? "Show spoiler" : t
                })]
            }), (0, n.jsx)("div", {
                id: c,
                className: "spoiler-block-content",
                hidden: !s,
                "aria-hidden": !s,
                children: i
            })]
        })
    }

    function x(e) {
        var t = e.children,
            a = e.className,
            i = (0, b._)((0, l.useState)(!1), 2),
            r = i[0],
            o = i[1],
            c = (0, l.useCallback)(function() {
                o(function(e) {
                    return !e
                })
            }, []),
            d = (0, l.useCallback)(function(e) {
                ("Enter" === e.key || " " === e.key) && (e.preventDefault(), o(function(e) {
                    return !e
                }))
            }, []);
        return (0, n.jsx)("span", {
            className: "spoiler-inline ".concat(r ? "spoiler-inline-revealed" : "", " ").concat(void 0 === a ? "" : a),
            onClick: c,
            onKeyDown: d,
            role: "button",
            tabIndex: 0,
            "aria-pressed": r,
            "aria-label": r ? "Click to hide spoiler" : "Click to reveal spoiler",
            "data-spoiler-inline": "",
            "data-revealed": r ? "true" : "false",
            children: t
        })
    }
    var g = {
            youtube: "YouTube",
            twitch: "Twitch",
            bilibili: "Bilibili"
        },
        y = {
            youtube: "#FF0000",
            twitch: "#9146FF",
            bilibili: "#00A1D6"
        };

    function j(e) {
        var t = e.provider,
            a = e.videoId,
            i = e.aspectRatio,
            r = void 0 === i ? "16:9" : i,
            o = e.autoplay,
            c = void 0 !== o && o,
            d = e.lazyLoad,
            s = e.title,
            u = e.className,
            m = void 0 === u ? "" : u,
            v = (0, b._)((0, l.useState)(!1), 2),
            h = v[0],
            p = v[1],
            f = (0, b._)((0, l.useState)("localhost"), 2),
            x = f[0],
            j = f[1],
            w = (0, b._)((0, l.useState)(!1), 2),
            N = w[0],
            k = w[1],
            _ = (0, b._)((0, l.useState)(!(void 0 === d || d)), 2),
            E = _[0],
            C = _[1];
        (0, l.useEffect)(function() {
            j(window.location.hostname), k(!0)
        }, []);
        var T = (0, l.useMemo)(function() {
                return function(e, t) {
                    var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "localhost";
                    switch (e) {
                        case "youtube":
                            return "https://www.youtube.com/embed/".concat(t).concat(a ? "?autoplay=1" : "");
                        case "twitch":
                            return "https://player.twitch.tv/?video=".concat(t, "&parent=").concat(i).concat(a ? "&autoplay=true" : "");
                        case "bilibili":
                            return "https://player.bilibili.com/player.html?bvid=".concat(t).concat(a ? "&autoplay=1" : "");
                        default:
                            return ""
                    }
                }(t, a, c, x)
            }, [t, a, c, x]),
            R = (0, l.useMemo)(function() {
                return "youtube" === t ? "https://img.youtube.com/vi/".concat(a, "/maxresdefault.jpg") : ""
            }, [t, a]),
            I = (0, l.useMemo)(function() {
                switch (r) {
                    case "16:9":
                    default:
                        return "16 / 9";
                    case "4:3":
                        return "4 / 3";
                    case "1:1":
                        return "1 / 1"
                }
            }, [r]),
            S = (0, l.useCallback)(function() {
                C(!0)
            }, []),
            A = (0, l.useCallback)(function() {
                p(!0)
            }, []),
            L = s || "".concat(g[t], " video");
        return h ? (0, n.jsx)("div", {
            className: "video-embed video-embed-error ".concat(m),
            "data-video-embed": "",
            "data-video-provider": t,
            children: (0, n.jsxs)("div", {
                className: "video-embed-error-content",
                children: [(0, n.jsx)("span", {
                    className: "video-embed-error-icon",
                    children: "⚠️"
                }), (0, n.jsxs)("span", {
                    className: "video-embed-error-text",
                    children: ["Failed to load ", g[t], " video"]
                }), (0, n.jsxs)("a", {
                    href: function(e, t) {
                        switch (e) {
                            case "youtube":
                                return "https://www.youtube.com/watch?v=".concat(t);
                            case "twitch":
                                return "https://www.twitch.tv/videos/".concat(t);
                            case "bilibili":
                                return "https://www.bilibili.com/video/".concat(t);
                            default:
                                return ""
                        }
                    }(t, a),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "video-embed-error-link",
                    children: ["Watch on ", g[t], " →"]
                })]
            })
        }) : E ? "twitch" !== t || N ? (0, n.jsx)("div", {
            className: "video-embed video-embed-".concat(t, " ").concat(m),
            style: {
                aspectRatio: I
            },
            "data-video-embed": "",
            "data-video-provider": t,
            "data-video-id": a,
            children: (0, n.jsx)("iframe", {
                src: T,
                title: L,
                frameBorder: "0",
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                allowFullScreen: !0,
                loading: "lazy",
                className: "video-embed-iframe",
                onError: A
            })
        }) : (0, n.jsx)("div", {
            className: "video-embed video-embed-".concat(t, " ").concat(m),
            style: {
                aspectRatio: I
            },
            "data-video-embed": "",
            "data-video-provider": t
        }) : (0, n.jsx)("div", {
            className: "video-embed video-embed-placeholder ".concat(m),
            style: {
                aspectRatio: I,
                "--provider-color": y[t]
            },
            "data-video-embed": "",
            "data-video-provider": t,
            children: (0, n.jsxs)("button", {
                type: "button",
                className: "video-embed-play-button",
                onClick: S,
                "aria-label": "Play ".concat(L),
                children: [R && (0, n.jsx)("img", {
                    decoding: "async",
                    src: R,
                    alt: "".concat(L, " thumbnail"),
                    className: "video-embed-thumbnail",
                    loading: "lazy"
                }), (0, n.jsxs)("div", {
                    className: "video-embed-overlay",
                    children: [(0, n.jsx)("span", {
                        className: "video-embed-play-icon",
                        children: "▶"
                    }), (0, n.jsx)("span", {
                        className: "video-embed-provider-badge",
                        children: g[t]
                    })]
                })]
            })
        })
    }
    var w = "https://platform.twitter.com",
        N = /^\d+$/,
        k = /^https:\/\/(x\.com|twitter\.com)\//;

    function _(e) {
        var t = e.tweetId,
            a = e.url,
            i = (0, b._)((0, l.useState)(!1), 2),
            r = i[0],
            o = i[1],
            c = (0, b._)((0, l.useState)(0), 2),
            d = c[0],
            s = c[1],
            u = (0, l.useRef)(null),
            m = N.test(t),
            v = a && k.test(a) ? a : "https://x.com/i/status/".concat(t);
        (0, l.useEffect)(function() {
            if (r) {
                var e = function(e) {
                    if (e.origin === w) {
                        var t, a, i = e.data,
                            n = null == i ? void 0 : i["twttr.embed"];
                        if ((null == n ? void 0 : n.method) === "twttr.private.resize") {
                            var l = null == (a = n.params) || null == (t = a[0]) ? void 0 : t.height;
                            "number" == typeof l && l > 0 && s(Math.min(l, 5e3))
                        }
                    }
                };
                return window.addEventListener("message", e),
                    function() {
                        return window.removeEventListener("message", e)
                    }
            }
        }, [r]);
        var h = (0, l.useCallback)(function() {
            return o(!0)
        }, []);
        return m ? r ? (0, n.jsx)("div", {
            className: "tweet-embed tweet-embed-loaded",
            "data-tweet-embed": "",
            style: {
                maxWidth: "550px",
                margin: "0 auto"
            },
            children: (0, n.jsx)("iframe", {
                ref: u,
                src: "".concat(w, "/embed/Tweet.html?id=").concat(encodeURIComponent(t), "&dnt=true"),
                title: "Embedded post from X",
                sandbox: "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox",
                referrerPolicy: "no-referrer",
                loading: "lazy",
                scrolling: "no",
                style: {
                    width: "100%",
                    height: d ? "".concat(d, "px") : "500px",
                    border: "none",
                    colorScheme: "normal"
                }
            })
        }) : (0, n.jsxs)("div", {
            className: "tweet-embed tweet-embed-placeholder",
            "data-tweet-embed": "",
            style: {
                border: "1px solid var(--color-border-default, #2a2a35)",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                background: "var(--color-surface-secondary, #16161c)"
            },
            children: [(0, n.jsx)("span", {
                "aria-hidden": "true",
                style: {
                    fontSize: "28px",
                    fontWeight: 700
                },
                children: "𝕏"
            }), (0, n.jsx)("span", {
                style: {
                    color: "var(--color-text-muted, #9aa0aa)",
                    fontSize: "14px"
                },
                children: "Embedded post from X"
            }), (0, n.jsx)("button", {
                type: "button",
                onClick: h,
                className: "tweet-embed-load-button",
                style: {
                    border: "none",
                    borderRadius: "9999px",
                    padding: "8px 18px",
                    fontWeight: 600,
                    cursor: "pointer",
                    background: "#1d9bf0",
                    color: "#fff"
                },
                children: "Load post"
            }), (0, n.jsx)("a", {
                href: v,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                    color: "var(--color-text-muted, #9aa0aa)",
                    fontSize: "13px"
                },
                children: "Open on X instead →"
            })]
        }) : (0, n.jsx)("div", {
            className: "tweet-embed tweet-embed-error",
            "data-tweet-embed": "",
            children: (0, n.jsx)("a", {
                href: v,
                target: "_blank",
                rel: "noopener noreferrer",
                children: "View post on X →"
            })
        })
    }
    var E = e.i(174080),
        C = e.i(657688);

    function T(e) {
        var t = e.src,
            r = e.alt,
            o = void 0 === r ? "" : r,
            c = e.caption,
            d = e.alignment,
            s = void 0 === d ? "center" : d,
            u = e.maxWidth,
            m = e.width,
            v = e.height,
            h = e.lightboxEnabled,
            p = void 0 === h || h,
            f = e.lazyLoad,
            x = e.className,
            g = void 0 === x ? "" : x,
            y = (0, b._)((0, l.useState)(!1), 2),
            j = y[0],
            w = y[1],
            N = (0, b._)((0, l.useState)(!1), 2),
            k = N[0],
            _ = N[1],
            E = (0, b._)((0, l.useState)(!1), 2),
            T = E[0],
            I = E[1];
        (0, l.useEffect)(function() {
            _(!0)
        }, []);
        var S = (0, l.useCallback)(function() {
                p && !T && w(!0)
            }, [p, T]),
            A = (0, l.useCallback)(function() {
                w(!1)
            }, []),
            L = (0, l.useCallback)(function() {
                I(!0)
            }, []),
            F = {
                left: "rich-text-image-left",
                center: "rich-text-image-center",
                right: "rich-text-image-right",
                full: "rich-text-image-full"
            }[s],
            D = t.startsWith("http://") || t.startsWith("https://"),
            M = t.startsWith("data:"),
            W = Number(m),
            z = Number(v),
            O = Number.isFinite(W) && W > 0 && Number.isFinite(z) && z > 0;
        return T ? (0, n.jsxs)("figure", {
            className: "rich-text-image rich-text-image-error ".concat(F, " ").concat(g),
            "data-image": "",
            children: [(0, n.jsxs)("div", {
                className: "rich-text-image-error-placeholder",
                children: [(0, n.jsx)("span", {
                    className: "rich-text-image-error-icon",
                    children: "🖼️"
                }), (0, n.jsx)("span", {
                    className: "rich-text-image-error-text",
                    children: "Image failed to load"
                })]
            }), c && (0, n.jsx)("figcaption", {
                className: "rich-text-image-caption",
                children: c
            })]
        }) : (0, n.jsxs)(n.Fragment, {
            children: [(0, n.jsxs)("figure", {
                className: "rich-text-image ".concat(F, " ").concat(g),
                style: {
                    maxWidth: "full" === s ? "100%" : void 0 === u ? 800 : u
                },
                "data-image": "",
                "data-alignment": s,
                children: [(0, n.jsx)("button", {
                    type: "button",
                    className: "rich-text-image-button ".concat(p ? "rich-text-image-clickable" : ""),
                    onClick: p ? S : void 0,
                    disabled: !p,
                    "aria-label": p ? "Click to view full size" : void 0,
                    children: D || M ? (0, n.jsx)("img", (0, i._)((0, a._)({
                        decoding: "async",
                        src: t,
                        alt: o
                    }, Number.isFinite(m) && Number(m) > 0 ? {
                        width: Number(m)
                    } : {}, Number.isFinite(v) && Number(v) > 0 ? {
                        height: Number(v)
                    } : {}), {
                        className: "rich-text-image-img",
                        style: {
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "contain"
                        },
                        loading: void 0 === f || f ? "lazy" : "eager",
                        onError: L
                    })) : (0, n.jsx)(C.default, {
                        src: t,
                        alt: o,
                        width: O ? W : 800,
                        height: O ? z : 450,
                        className: "rich-text-image-img",
                        style: {
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "contain"
                        },
                        onError: L
                    })
                }), c && (0, n.jsx)("figcaption", {
                    className: "rich-text-image-caption",
                    children: c
                })]
            }), j && k && (0, n.jsx)(R, {
                src: t,
                alt: o,
                onClose: A
            })]
        })
    }

    function R(e) {
        var t = e.src,
            a = e.alt,
            i = e.onClose,
            r = (0, l.useRef)(null);
        (0, l.useEffect)(function() {
            var e = function(e) {
                "Escape" === e.key && i()
            };
            return document.addEventListener("keydown", e), document.body.style.overflow = "hidden",
                function() {
                    document.removeEventListener("keydown", e), document.body.style.overflow = ""
                }
        }, [i]);
        var o = (0, l.useCallback)(function(e) {
            e.target === r.current && i()
        }, [i]);
        return (0, E.createPortal)((0, n.jsxs)("div", {
            ref: r,
            className: "lightbox-overlay",
            onClick: o,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Image lightbox",
            children: [(0, n.jsx)("button", {
                type: "button",
                className: "lightbox-close-button",
                onClick: i,
                "aria-label": "Close lightbox",
                children: "✕"
            }), (0, n.jsx)("div", {
                className: "lightbox-content",
                children: (0, n.jsx)("img", {
                    loading: "lazy",
                    decoding: "async",
                    src: t,
                    alt: a,
                    className: "lightbox-image"
                })
            })]
        }), document.body)
    }

    function I(e) {
        var t = e.title,
            a = e.defaultOpen,
            i = e.variant,
            r = void 0 === i ? "" : i,
            o = e.children,
            c = (0, b._)((0, l.useState)(void 0 !== a && a), 2),
            d = c[0],
            s = c[1],
            u = ["accordion-item", r].filter(Boolean).join(" ");
        return (0, n.jsxs)("div", {
            className: u,
            "data-accordion-item": "",
            "data-variant": r,
            children: [(0, n.jsx)("div", {
                className: "pw-accordion-header",
                "data-accordion-header": "",
                children: (0, n.jsxs)("button", {
                    type: "button",
                    className: "pw-accordion-button".concat(d ? "" : " collapsed"),
                    onClick: function() {
                        return s(!d)
                    },
                    "aria-expanded": d,
                    "data-state": d ? "open" : "closed",
                    children: [(0, n.jsx)("span", {
                        className: "pw-accordion-button-text",
                        children: t
                    }), (0, n.jsx)("span", {
                        className: "pw-accordion-button-icon",
                        "aria-hidden": "true"
                    })]
                })
            }), (0, n.jsx)("div", {
                className: "pw-accordion-collapse".concat(d ? " show" : ""),
                "data-accordion-collapse": "",
                "data-state": d ? "open" : "closed",
                children: (0, n.jsx)("div", {
                    className: "pw-accordion-body",
                    children: o
                })
            })]
        })
    }

    function S(e) {
        var t = e.children;
        return (0, n.jsx)("div", {
            className: "pw-accordion",
            "data-accordion": "",
            children: t
        })
    }

    function A(e) {
        var t = e.label,
            a = e.isActive,
            i = void 0 !== a && a,
            l = e.onClick;
        return (0, n.jsx)("button", {
            type: "button",
            className: "pw-nav-link".concat(i ? " active" : ""),
            role: "tab",
            "aria-selected": i,
            onClick: l,
            "data-tab": "",
            children: t
        })
    }

    function L(e) {
        var t = e.isActive,
            a = void 0 !== t && t,
            i = e.children;
        return (0, n.jsx)("div", {
            className: "tab-pane".concat(a ? " active show" : ""),
            role: "tabpanel",
            "data-tab-panel": "",
            style: {
                display: a ? "block" : "none"
            },
            children: i
        })
    }

    function F(e) {
        var t = e.tabs,
            a = e.defaultActiveTab,
            i = e.children,
            r = (0, b._)((0, l.useState)(void 0 === a ? 0 : a), 2),
            o = r[0],
            c = r[1],
            d = Math.min(Math.max(o, 0), t.length - 1);
        return (0, n.jsxs)("div", {
            className: "tabs-container",
            "data-tabs": "",
            children: [(0, n.jsx)("div", {
                className: "pw-nav-tabs",
                role: "tablist",
                "data-tab-list": "",
                children: t.map(function(e, t) {
                    return (0, n.jsx)(A, {
                        label: e,
                        isActive: t === d,
                        onClick: function() {
                            return c(t)
                        }
                    }, e)
                })
            }), (0, n.jsx)("div", {
                className: "pw-tab-content",
                "data-tab-panels": "",
                children: l.Children.map(i, function(e, t) {
                    return (0, l.isValidElement)(e) ? (0, l.cloneElement)(e, {
                        isActive: t === d
                    }) : (0, n.jsx)(L, {
                        isActive: t === d,
                        children: e
                    })
                })
            })]
        })
    }
    var D = e.i(168856),
        M = e.i(751057),
        W = e.i(499092),
        z = e.i(524906);

    function O(e) {
        var t = e.type,
            r = e.gameCode,
            o = e.slug,
            c = (0, b._)((0, l.useState)(null), 2),
            d = c[0],
            s = c[1];
        (0, l.useEffect)(function() {
            if (!o || !r) return void s(null);
            var e = !1,
                a = new URLSearchParams({
                    gameCode: r,
                    slug: o,
                    type: t
                });
            return fetch("/api/news/inline-elements/resolve?".concat(a.toString())).then(function(e) {
                    return e.ok ? e.json() : null
                }).then(function(t) {
                    var a;
                    e || s(null != (a = null == t ? void 0 : t.data) ? a : null)
                }).catch(function() {
                    e || s(null)
                }),
                function() {
                    e = !0
                }
        }, [t, r, o]);
        var u = (0, l.useMemo)(function() {
                var t = null != d ? d : e.resolvedEntity;
                if (!t || (void 0 === t ? "undefined" : (0, z._)(t)) !== "object" || !("_members" in t)) return {
                    entity: t,
                    memberData: void 0
                };
                var a = t._members;
                return {
                    entity: (0, W._)(t, ["_members"]),
                    memberData: new Map(Object.entries(null != a ? a : {}))
                }
            }, [d, e.resolvedEntity]),
            m = u.entity,
            v = u.memberData;
        return (0, n.jsx)(D.InlineElementDispatcher, (0, i._)((0, a._)({}, e), {
            resolvedEntity: m,
            characterData: null != v ? v : e.characterData
        }))
    }
    var P = e.i(52383),
        U = e.i(369884);

    function B(e) {
        var h = e.content,
            b = e.config,
            g = e.gameCode,
            y = e.className,
            w = void 0 === y ? "" : y,
            N = e.characterData,
            k = e.weaponData,
            E = e.skillData,
            C = e.itemData,
            R = e.customData,
            A = e.teamData,
            W = e.pageIconData,
            z = e.renderPopover,
            B = e.renderInline,
            G = e.adInjection,
            X = e.unstyled,
            V = (0, l.useMemo)(function() {
                return (0, i._)((0, a._)({}, v.DEFAULT_RICH_TEXT_CONFIG, b), {
                    mentions: (0, a._)({}, v.DEFAULT_RICH_TEXT_CONFIG.mentions, null == b ? void 0 : b.mentions),
                    blocks: (0, a._)({}, v.DEFAULT_RICH_TEXT_CONFIG.blocks, null == b ? void 0 : b.blocks),
                    links: (0, a._)({}, v.DEFAULT_RICH_TEXT_CONFIG.links, null == b ? void 0 : b.links)
                })
            }, [b]),
            $ = (0, l.useMemo)(function() {
                var e, v, b, y, w = (0, s.sanitizeHtml)(h),
                    z = null != (e = null == G ? void 0 : G.enabled) && e,
                    X = null != (v = null == G ? void 0 : G.headingsBeforeFirstAd) ? v : 2,
                    $ = null != (b = null == G ? void 0 : G.headingsBetweenAds) ? b : 2,
                    K = Math.min(null != (y = null == G ? void 0 : G.maxAds) ? y : 10, 10),
                    q = 0,
                    Y = 1,
                    J = {
                        replace: function(e) {
                            if ((0, t._)(e, o.Element)) {
                                var l = e.attribs || {};
                                if (void 0 !== l["data-inline-element"]) return function(e, t, i, l, r, o, c, d, s, m) {
                                    var v, h, p, b, f, x, g, y, j, w, N, k, _, E, C, T, R = e.attribs || {},
                                        I = R["data-id"] || "",
                                        S = R["data-type"] || "CUSTOM",
                                        A = R["data-slug"] || "",
                                        L = R["data-name"] || "",
                                        F = null != (v = null == m ? void 0 : m(S, A, L, I)) ? v : null;
                                    if (F) return (0, n.jsx)(n.Fragment, {
                                        children: F
                                    });
                                    var W = R["data-icon"] || null,
                                        z = R["data-rarity"] || null,
                                        P = R["data-game-code"] || i || null,
                                        U = R["data-link-url"],
                                        B = (0, u.isValidLinkHref)(U) ? U : null,
                                        H = R["data-tooltip"] || null,
                                        G = R["data-display-mode"],
                                        X = "icon" === G || "card" === G ? G : "inline",
                                        V = (0, D.stripContentTypePrefix)(A),
                                        $ = void 0;
                                    "CHARACTER" === S && l ? $ = null != (f = null != (x = l.get(A)) ? x : l.get(V)) ? f : l.get(I) : "WEAPON" === S && r ? $ = null != (g = null != (y = r.get(A)) ? y : r.get(V)) ? g : r.get(I) : "SKILL" === S && o ? $ = null != (j = null != (w = o.get(A)) ? w : o.get(V)) ? j : o.get(I) : "ITEM" === S && c ? $ = null != (N = null != (k = c.get(A)) ? k : c.get(V)) ? N : c.get(I) : "CUSTOM" === S && d ? $ = null != (_ = null != (E = d.get(A)) ? E : d.get(V)) ? _ : d.get(I) : "TEAM" === S && s && ($ = null != (C = null != (T = s.get(A)) ? T : s.get(V)) ? C : s.get(I));
                                    var K = "CHARACTER" === S ? null == (h = t.mentions) ? void 0 : h.character : "WEAPON" === S ? null == (p = t.mentions) ? void 0 : p.weapon : null == (b = t.mentions) ? void 0 : b.item,
                                        q = {
                                            type: S,
                                            gameCode: P,
                                            slug: A,
                                            name: L,
                                            id: I,
                                            icon: W,
                                            rarity: z,
                                            tooltipContent: H,
                                            linkUrl: B,
                                            resolvedEntity: $,
                                            displayMode: X,
                                            enablePopover: (null == K ? void 0 : K.showPopover) !== !1,
                                            characterData: l
                                        };
                                    return void 0 === $ && P && ("TEAM" === S ? (0, M.supportsTeamEmbed)(P) : ("icon" === X || "card" === X) && M.EMBED_RESOLVABLE_GAME_CODES.has(P)) ? (0, n.jsx)(O, (0, a._)({}, q)) : (0, n.jsx)(D.InlineElementDispatcher, (0, a._)({}, q))
                                }(e, V, g, N, k, E, C, R, A, B);
                                if (void 0 !== l["data-rte-icon"]) {
                                    var r = l["data-rte-icon"],
                                        v = ["limited", "new", "up", "down"].includes(r) ? r : "limited";
                                    return (0, n.jsx)(P.RteIconGlyph, {
                                        kind: v
                                    })
                                }
                                if (l["data-fa-icon"]) return (0, n.jsx)(U.FaIconGlyph, {
                                    name: l["data-fa-icon"]
                                });
                                if (void 0 !== l["data-callout"]) {
                                    var h, b, y = l["data-callout-type"] || "info",
                                        w = l["data-callout-title"] || null,
                                        G = (0, o.domToReact)(e.children, J);
                                    return (0, n.jsx)(p, {
                                        type: y,
                                        title: w,
                                        customTypes: null == (b = V.blocks) || null == (h = b.callout) ? void 0 : h.types,
                                        children: G
                                    })
                                }
                                if (void 0 !== l["data-spoiler-block"] || "details" === e.name) {
                                    var Q, Z, ee = l["data-spoiler-label"] || (null == (Z = V.blocks) || null == (Q = Z.spoiler) ? void 0 : Q.defaultLabel),
                                        et = "true" === l["data-spoiler-open"],
                                        ea = e.children.find(function(e) {
                                            var a;
                                            return (0, t._)(e, o.Element) && "string" == typeof(null == (a = e.attribs) ? void 0 : a.class) && e.attribs.class.split(/\s+/).includes("spoiler-block-content")
                                        }),
                                        ei = ea ? (0, o.domToReact)(ea.children, J) : (0, o.domToReact)(e.children.filter(function(e) {
                                            return !((0, t._)(e, o.Element) && "summary" === e.name)
                                        }), J);
                                    return (0, n.jsx)(f, {
                                        label: ee,
                                        defaultOpen: et,
                                        children: ei
                                    })
                                }
                                if (void 0 !== l["data-spoiler-inline"]) {
                                    var en = (0, o.domToReact)(e.children, J);
                                    return (0, n.jsx)(x, {
                                        children: en
                                    })
                                }
                                if (void 0 !== l["data-video-embed"]) {
                                    var el, er, eo, ec, ed = l["data-video-provider"] || "youtube",
                                        es = l["data-video-id"],
                                        eu = l["data-aspect-ratio"] || (null == (er = V.blocks) || null == (el = er.video) ? void 0 : el.aspectRatio);
                                    return es ? (0, n.jsx)(j, {
                                        provider: ed,
                                        videoId: es,
                                        aspectRatio: eu,
                                        lazyLoad: null == (ec = V.blocks) || null == (eo = ec.video) ? void 0 : eo.lazyLoad
                                    }) : null
                                }
                                if (void 0 !== l["data-tweet-embed"]) {
                                    var em = l["data-tweet-id"];
                                    return em && /^\d+$/.test(em) ? (0, n.jsx)(_, {
                                        tweetId: em,
                                        url: l["data-tweet-url"]
                                    }) : null
                                }
                                if ("img" === e.name && l.src) {
                                    var ev, eh, ep, eb, ef, ex, eg, ey, ej, ew, eN = l.src,
                                        ek = l.alt || "",
                                        e_ = l["data-caption"],
                                        eE = l["data-alignment"],
                                        eC = function(e) {
                                            if (e) {
                                                var t = parseInt(e, 10);
                                                return Number.isFinite(t) && t > 0 ? t : void 0
                                            }
                                        },
                                        eT = eC(null != (ev = l.width) ? ev : l["data-width"]),
                                        eR = eC(null != (eh = l.height) ? eh : l["data-height"]);
                                    if (eN.startsWith("data:")) return;
                                    return (0, n.jsx)(T, {
                                        src: eN,
                                        alt: ek,
                                        caption: e_,
                                        alignment: eE || (null == (eb = V.blocks) || null == (ep = eb.image) ? void 0 : ep.alignment),
                                        maxWidth: null == (ex = V.blocks) || null == (ef = ex.image) ? void 0 : ef.maxWidth,
                                        width: eT,
                                        height: eR,
                                        lightboxEnabled: null == (ey = V.blocks) || null == (eg = ey.image) ? void 0 : eg.lightboxEnabled,
                                        lazyLoad: null == (ew = V.blocks) || null == (ej = ew.image) ? void 0 : ej.lazyLoad
                                    })
                                }
                                if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(e.name)) {
                                    var eI = e.children,
                                        eS = H(eI),
                                        eA = l.id || eS.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                                        eL = (0, o.domToReact)(eI, J),
                                        eF = "h1" === e.name ? "h2" : e.name,
                                        eD = (0, n.jsx)(eF, {
                                            id: eA,
                                            className: l.class,
                                            children: eL
                                        });
                                    if (z && "h2" === e.name && (q++, Y <= K && (1 === Y && q === X || Y > 1 && q > X && (q - X) % $ == 0))) {
                                        var eM = (0, n.jsx)(m.AdGuideSpot, {
                                            number: Y
                                        }, "auto-ad-".concat(Y));
                                        return Y++, (0, n.jsxs)(n.Fragment, {
                                            children: [eM, eD]
                                        })
                                    }
                                    return eD
                                }
                                if ("a" === e.name && l.href) {
                                    var eW, ez, eO, eP, eU, eB, eH, eG, eX, eV, e$, eK = l.href,
                                        eq = eK.startsWith("http") && !(0, s.isInternalHref)(eK) && !(null == (eO = V.links) || null == (ez = eO.external) || null == (eW = ez.trustedDomains) ? void 0 : eW.some(function(e) {
                                            return eK.includes(e)
                                        })),
                                        eY = {
                                            href: eK,
                                            className: l.class
                                        };
                                    eq ? (eY.target = (null == (eX = V.links) || null == (eG = eX.external) ? void 0 : eG.openInNewTab) ? "_blank" : void 0, eY.rel = (null == (e$ = V.links) || null == (eV = e$.external) ? void 0 : eV.nofollow) ? "noopener noreferrer nofollow" : "noopener noreferrer") : (null == (eU = V.links) || null == (eP = eU.internal) ? void 0 : eP.openInNewTab) && (eY.target = "_blank");
                                    var eJ = (0, o.domToReact)(e.children, J);
                                    return eq && (null == (eH = V.links) || null == (eB = eH.external) ? void 0 : eB.showExternalIcon) ? (0, n.jsxs)("a", (0, i._)((0, a._)({}, eY), {
                                        children: [eJ, (0, n.jsx)("span", {
                                            className: "external-link-icon",
                                            "aria-hidden": "true",
                                            children: "↗"
                                        })]
                                    })) : (0, n.jsx)("a", (0, i._)((0, a._)({}, eY), {
                                        children: eJ
                                    }))
                                }
                                if (void 0 !== l["data-section-divider"]) {
                                    var eQ = l["data-section-divider-title"];
                                    return (0, n.jsxs)("div", {
                                        className: "section-divider".concat(eQ ? " with-title" : ""),
                                        "data-section-divider": "",
                                        children: [eQ && (0, n.jsx)("h2", {
                                            className: "section-divider-title",
                                            children: eQ
                                        }), (0, n.jsx)("div", {
                                            className: "section-divider-line"
                                        })]
                                    })
                                }
                                if ("p" === e.name && function e(a) {
                                        var i = !0,
                                            n = !1,
                                            l = void 0;
                                        try {
                                            for (var r, c, d = (null != (r = a.children) ? r : [])[Symbol.iterator](); !(i = (c = d.next()).done); i = !0) {
                                                var s = c.value;
                                                if ((0, t._)(s, o.Element)) {
                                                    var u = s.attribs || {};
                                                    if (void 0 !== u["data-inline-element"] && (0, M.isBlockLevelEmbed)(u["data-type"], u["data-display-mode"]) || e(s)) return !0
                                                }
                                            }
                                        } catch (e) {
                                            n = !0, l = e
                                        } finally {
                                            try {
                                                i || null == d.return || d.return()
                                            } finally {
                                                if (n) throw l
                                            }
                                        }
                                        return !1
                                    }(e)) {
                                    var eZ = (0, o.attributesToProps)(l),
                                        e0 = (0, o.domToReact)(e.children, J);
                                    return (0, n.jsx)("div", (0, i._)((0, a._)({}, eZ), {
                                        className: "rich-text-paragraph ".concat(l.class || "").trim(),
                                        children: e0
                                    }))
                                }
                                if ("table" === e.name) {
                                    var e1 = (0, o.domToReact)(e.children, J);
                                    return (0, n.jsx)("div", {
                                        className: "rich-text-table-wrapper",
                                        children: (0, n.jsx)("table", {
                                            className: "rich-text-table ".concat(l.class || ""),
                                            children: e1
                                        })
                                    })
                                }
                                if (void 0 !== l["data-accordion"]) {
                                    var e2 = (0, o.domToReact)(e.children, J);
                                    return (0, n.jsx)(S, {
                                        children: e2
                                    })
                                }
                                if (void 0 !== l["data-accordion-item"]) {
                                    var e8 = l["data-title"] || "Section",
                                        e6 = "true" === l["data-open"],
                                        e9 = l["data-variant"] || "",
                                        e3 = e.children.find(function(e) {
                                            var a, i, n;
                                            return (0, t._)(e, o.Element) && ((null == (a = e.attribs) ? void 0 : a["data-accordion-collapse"]) !== void 0 || (null == (n = e.attribs) || null == (i = n.class) ? void 0 : i.includes("accordion-collapse")))
                                        }),
                                        e4 = null;
                                    if ((0, t._)(e3, o.Element)) {
                                        var e5 = e3.children.find(function(e) {
                                            var a, i;
                                            return (0, t._)(e, o.Element) && (null == (i = e.attribs) || null == (a = i.class) ? void 0 : a.includes("accordion-body"))
                                        });
                                        (0, t._)(e5, o.Element) && (e4 = (0, o.domToReact)(e5.children, J))
                                    }
                                    return e4 || (e4 = (0, o.domToReact)(e.children, J)), (0, n.jsx)(I, {
                                        title: e8,
                                        defaultOpen: e6,
                                        variant: e9,
                                        children: e4
                                    })
                                }
                                if (void 0 !== l["data-columns"]) {
                                    var e7 = Math.min(Math.max(parseInt(l["data-column-count"] || "2", 10) || 2, 2), 4),
                                        te = (0, o.domToReact)(e.children, J);
                                    return (0, n.jsx)("div", {
                                        className: "columns-container columns-".concat(e7),
                                        children: te
                                    })
                                }
                                if (void 0 !== l["data-column"]) {
                                    var tt = (0, o.domToReact)(e.children, J);
                                    return (0, n.jsx)("div", {
                                        className: "column",
                                        children: tt
                                    })
                                }
                                if (void 0 !== l["data-guide-card"]) {
                                    var ta = l["data-guide-url"] || "#",
                                        ti = (0, u.isValidLinkHref)(ta) ? ta : "#",
                                        tn = l["data-guide-title"] || "Guide",
                                        tl = l["data-guide-icon"] || null,
                                        tr = "string" == typeof tl && /^(https?:\/\/|\/)/.test(tl),
                                        to = tr && tl.trim().replace(/[?#].*$/, "").toLowerCase().endsWith("categories/category_guides.webp"),
                                        tc = "string" == typeof tl && !tr && tl.trim().length > 0,
                                        td = function(e) {
                                            var t = e.trim();
                                            if (!t || /^(https?:\/\/|\/\/)/i.test(t)) return null;
                                            var a = t.replace(/[?#].*$/, "");
                                            if (!a) return null;
                                            var i = a.replace(/\/+$/, "");
                                            return i || "/"
                                        }(ti),
                                        ts = W && td ? function(e, t, a) {
                                            var i = new Set([t]);
                                            if (a && t.startsWith("/")) {
                                                var n = "/".concat(a);
                                                t.startsWith("".concat(n, "/")) || t === n || "/" === t || i.add("".concat(n).concat(t))
                                            }
                                            var l = !0,
                                                r = !1,
                                                o = void 0;
                                            try {
                                                for (var c, d = i[Symbol.iterator](); !(l = (c = d.next()).done); l = !0) {
                                                    var s = c.value,
                                                        u = e.get(s);
                                                    if (u) return u
                                                }
                                            } catch (e) {
                                                r = !0, o = e
                                            } finally {
                                                try {
                                                    l || null == d.return || d.return()
                                                } finally {
                                                    if (r) throw o
                                                }
                                            }
                                        }(W, td, g) : void 0,
                                        tu = tr && !to || tc ? tl : null != ts ? ts : tl,
                                        tm = "string" == typeof tu && /^(https?:\/\/|\/)/.test(tu);
                                    return (0, n.jsx)("div", {
                                        className: "guide-card-embed",
                                        "data-guide-embed": "",
                                        children: (0, n.jsx)("a", {
                                            href: ti,
                                            className: "guide-card-embed-link",
                                            children: (0, n.jsxs)("div", {
                                                className: "category-card category-card-rte",
                                                children: [(0, n.jsx)("div", {
                                                    className: "pw-card-left",
                                                    children: tm ? (0, n.jsx)("img", {
                                                        src: tu,
                                                        alt: tn,
                                                        width: 100,
                                                        height: 100,
                                                        className: "category-image",
                                                        loading: "lazy",
                                                        decoding: "async"
                                                    }) : (0, n.jsx)("span", {
                                                        className: "category-image category-image-emoji",
                                                        children: tu
                                                    })
                                                }), (0, n.jsx)("div", {
                                                    className: "pw-card-right",
                                                    children: (0, n.jsx)("p", {
                                                        children: tn
                                                    })
                                                }), (0, n.jsx)(c.FontAwesomeIcon, {
                                                    icon: d.faArrowRightLong,
                                                    className: "arrow",
                                                    width: 18
                                                })]
                                            })
                                        })
                                    })
                                }
                                if (void 0 !== l["data-tabs"]) {
                                    var tv = parseInt(l["data-active-tab"] || "0", 10),
                                        th = e.children.find(function(e) {
                                            var a;
                                            return (0, t._)(e, o.Element) && (null == (a = e.attribs) ? void 0 : a["data-tab-list"]) !== void 0
                                        }),
                                        tp = e.children.find(function(e) {
                                            var a;
                                            return (0, t._)(e, o.Element) && (null == (a = e.attribs) ? void 0 : a["data-tab-panels"]) !== void 0
                                        }),
                                        tb = [];
                                    (0, t._)(th, o.Element) && th.children.forEach(function(e) {
                                        var a;
                                        if ((0, t._)(e, o.Element) && (null == (a = e.attribs) ? void 0 : a["data-tab"]) !== void 0) {
                                            var i = e.attribs["data-label"] || H([e]) || "Tab";
                                            tb.push(i)
                                        }
                                    });
                                    var tf = [];
                                    return (0, t._)(tp, o.Element) && tp.children.forEach(function(e) {
                                        var a;
                                        (0, t._)(e, o.Element) && (null == (a = e.attribs) ? void 0 : a["data-tab-panel"]) !== void 0 && tf.push((0, o.domToReact)(e.children, J))
                                    }), (0, n.jsx)(F, {
                                        tabs: tb,
                                        defaultActiveTab: tv,
                                        children: tf.map(function(e, t) {
                                            return (0, n.jsx)(L, {
                                                children: e
                                            }, tb[t] || t)
                                        })
                                    })
                                }
                            }
                        }
                    };
                return function(e) {
                    if (!Array.isArray(e)) return e;
                    var t = [],
                        a = [],
                        i = function() {
                            a.length > 0 && (t.push((0, n.jsx)("div", {
                                className: "guide-card-embed-row",
                                children: a
                            }, "gce-row-".concat(t.length))), a = [])
                        },
                        r = !0,
                        o = !1,
                        c = void 0;
                    try {
                        for (var d, s = e[Symbol.iterator](); !(r = (d = s.next()).done); r = !0) {
                            var u = d.value;
                            if (function(e) {
                                    var t;
                                    return l.default.isValidElement(e) && (null == (t = e.props) ? void 0 : t["data-guide-embed"]) !== void 0
                                }(u)) a.push(u);
                            else {
                                if ("string" == typeof u && "" === u.trim() && a.length > 0) continue;
                                i(), t.push(u)
                            }
                        }
                    } catch (e) {
                        o = !0, c = e
                    } finally {
                        try {
                            r || null == s.return || s.return()
                        } finally {
                            if (o) throw c
                        }
                    }
                    return i(), t
                }((0, r.default)(w, J))
            }, [h, V, g, N, k, E, C, R, A, z, B, G, W]);
        return void 0 !== X && X ? (0, n.jsx)("div", {
            className: "rte-plain ".concat(w).trim(),
            children: $
        }) : (0, n.jsx)("div", {
            className: "rich-text-content prose prose-invert prose-lg max-w-none ".concat(w),
            children: $
        })
    }

    function H(e) {
        return e.map(function(e) {
            return (0, t._)(e, o.Text) ? e.data || "" : (0, t._)(e, o.Element) && e.children ? H(e.children) : ""
        }).join("")
    }
    e.s(["RichTextRenderer", 0, B, "default", 0, B], 116253)
}]);