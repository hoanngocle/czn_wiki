(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 719180, e => {
    "use strict";
    var t, n, r, o, i, a, s = e.i(480388),
        c = e.i(499092),
        u = e.i(317608),
        p = e.i(843476),
        f = e.i(271645),
        l = e.i(524906),
        d = e.i(511938);

    function m(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window
        }
        return e
    }

    function v(e) {
        var t = m(e).Element;
        return (0, d._)(e, t) || (0, d._)(e, Element)
    }

    function h(e) {
        var t = m(e).HTMLElement;
        return (0, d._)(e, t) || (0, d._)(e, HTMLElement)
    }

    function g(e) {
        if ("u" < typeof ShadowRoot) return !1;
        var t = m(e).ShadowRoot;
        return (0, d._)(e, t) || (0, d._)(e, ShadowRoot)
    }
    var b = Math.max,
        y = Math.min,
        w = Math.round;

    function x() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
            return e.brand + "/" + e.version
        }).join(" ") : navigator.userAgent
    }

    function O() {
        return !/^((?!chrome|android).)*safari/i.test(x())
    }

    function E(e, t, n) {
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        var r = e.getBoundingClientRect(),
            o = 1,
            i = 1;
        t && h(e) && (o = e.offsetWidth > 0 && w(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && w(r.height) / e.offsetHeight || 1);
        var a = (v(e) ? m(e) : window).visualViewport,
            s = !O() && n,
            c = (r.left + (s && a ? a.offsetLeft : 0)) / o,
            u = (r.top + (s && a ? a.offsetTop : 0)) / i,
            p = r.width / o,
            f = r.height / i;
        return {
            width: p,
            height: f,
            top: u,
            right: c + p,
            bottom: u + f,
            left: c,
            x: c,
            y: u
        }
    }

    function T(e) {
        var t = m(e);
        return {
            scrollLeft: t.pageXOffset,
            scrollTop: t.pageYOffset
        }
    }

    function A(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function j(e) {
        return ((v(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function D(e) {
        return E(j(e)).left + T(e).scrollLeft
    }

    function L(e) {
        return m(e).getComputedStyle(e)
    }

    function C(e) {
        var t = L(e),
            n = t.overflow,
            r = t.overflowX,
            o = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + o + r)
    }

    function k(e) {
        var t = E(e),
            n = e.offsetWidth,
            r = e.offsetHeight;
        return 1 >= Math.abs(t.width - n) && (n = t.width), 1 >= Math.abs(t.height - r) && (r = t.height), {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: n,
            height: r
        }
    }

    function P(e) {
        return "html" === A(e) ? e : e.assignedSlot || e.parentNode || (g(e) ? e.host : null) || j(e)
    }

    function S(e, t) {
        void 0 === t && (t = []);
        var n, r = function e(t) {
                return ["html", "body", "#document"].indexOf(A(t)) >= 0 ? t.ownerDocument.body : h(t) && C(t) ? t : e(P(t))
            }(e),
            o = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
            i = m(r),
            a = o ? [i].concat(i.visualViewport || [], C(r) ? r : []) : r,
            s = t.concat(a);
        return o ? s : s.concat(S(P(a)))
    }

    function R(e) {
        return h(e) && "fixed" !== L(e).position ? e.offsetParent : null
    }

    function H(e) {
        for (var t = m(e), n = R(e); n && ["table", "td", "th"].indexOf(A(n)) >= 0 && "static" === L(n).position;) n = R(n);
        return n && ("html" === A(n) || "body" === A(n) && "static" === L(n).position) ? t : n || function(e) {
            var t = /firefox/i.test(x());
            if (/Trident/i.test(x()) && h(e) && "fixed" === L(e).position) return null;
            var n = P(e);
            for (g(n) && (n = n.host); h(n) && 0 > ["html", "body"].indexOf(A(n));) {
                var r = L(n);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
                n = n.parentNode
            }
            return null
        }(e) || t
    }
    var M = "bottom",
        _ = "right",
        V = "left",
        W = "auto",
        B = ["top", M, _, V],
        N = "start",
        I = "viewport",
        U = "popper",
        q = B.reduce(function(e, t) {
            return e.concat([t + "-" + N, t + "-end"])
        }, []),
        $ = [].concat(B, [W]).reduce(function(e, t) {
            return e.concat([t, t + "-" + N, t + "-end"])
        }, []),
        F = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function z(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && g(n)) {
            var r = t;
            do {
                if (r && e.isSameNode(r)) return !0;
                r = r.parentNode || r.host
            } while (r)
        }
        return !1
    }

    function X(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function Y(e, t, n) {
        var r, o, i, a, s, c, u, p, f, l;
        return t === I ? X(function(e, t) {
            var n = m(e),
                r = j(e),
                o = n.visualViewport,
                i = r.clientWidth,
                a = r.clientHeight,
                s = 0,
                c = 0;
            if (o) {
                i = o.width, a = o.height;
                var u = O();
                (u || !u && "fixed" === t) && (s = o.offsetLeft, c = o.offsetTop)
            }
            return {
                width: i,
                height: a,
                x: s + D(e),
                y: c
            }
        }(e, n)) : v(t) ? ((r = E(t, !1, "fixed" === n)).top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r) : X((o = j(e), a = j(o), s = T(o), c = null == (i = o.ownerDocument) ? void 0 : i.body, u = b(a.scrollWidth, a.clientWidth, c ? c.scrollWidth : 0, c ? c.clientWidth : 0), p = b(a.scrollHeight, a.clientHeight, c ? c.scrollHeight : 0, c ? c.clientHeight : 0), f = -s.scrollLeft + D(o), l = -s.scrollTop, "rtl" === L(c || a).direction && (f += b(a.clientWidth, c ? c.clientWidth : 0) - u), {
            width: u,
            height: p,
            x: f,
            y: l
        }))
    }

    function K(e) {
        return e.split("-")[0]
    }

    function J(e) {
        return e.split("-")[1]
    }

    function G(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
    }

    function Q(e) {
        var t, n = e.reference,
            r = e.element,
            o = e.placement,
            i = o ? K(o) : null,
            a = o ? J(o) : null,
            s = n.x + n.width / 2 - r.width / 2,
            c = n.y + n.height / 2 - r.height / 2;
        switch (i) {
            case "top":
                t = {
                    x: s,
                    y: n.y - r.height
                };
                break;
            case M:
                t = {
                    x: s,
                    y: n.y + n.height
                };
                break;
            case _:
                t = {
                    x: n.x + n.width,
                    y: c
                };
                break;
            case V:
                t = {
                    x: n.x - r.width,
                    y: c
                };
                break;
            default:
                t = {
                    x: n.x,
                    y: n.y
                }
        }
        var u = i ? G(i) : null;
        if (null != u) {
            var p = "y" === u ? "height" : "width";
            switch (a) {
                case N:
                    t[u] = t[u] - (n[p] / 2 - r[p] / 2);
                    break;
                case "end":
                    t[u] = t[u] + (n[p] / 2 - r[p] / 2)
            }
        }
        return t
    }

    function Z() {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }

    function ee(e) {
        return Object.assign({}, Z(), e)
    }

    function et(e, t) {
        return t.reduce(function(t, n) {
            return t[n] = e, t
        }, {})
    }

    function en(e, t) {
        void 0 === t && (t = {});
        var n, r, o, i, a, s, c, u, p = t,
            f = p.placement,
            l = void 0 === f ? e.placement : f,
            d = p.strategy,
            m = void 0 === d ? e.strategy : d,
            g = p.boundary,
            w = p.rootBoundary,
            x = p.elementContext,
            O = void 0 === x ? U : x,
            T = p.altBoundary,
            D = p.padding,
            C = void 0 === D ? 0 : D,
            k = ee("number" != typeof C ? C : et(C, B)),
            R = e.rects.popper,
            V = e.elements[void 0 !== T && T ? O === U ? "reference" : U : O],
            W = (n = v(V) ? V : V.contextElement || j(e.elements.popper), r = void 0 === g ? "clippingParents" : g, o = void 0 === w ? I : w, c = (s = [].concat("clippingParents" === r ? (i = S(P(n)), !v(a = ["absolute", "fixed"].indexOf(L(n).position) >= 0 && h(n) ? H(n) : n) ? [] : i.filter(function(e) {
                return v(e) && z(e, a) && "body" !== A(e)
            })) : [].concat(r), [o]))[0], (u = s.reduce(function(e, t) {
                var r = Y(n, t, m);
                return e.top = b(r.top, e.top), e.right = y(r.right, e.right), e.bottom = y(r.bottom, e.bottom), e.left = b(r.left, e.left), e
            }, Y(n, c, m))).width = u.right - u.left, u.height = u.bottom - u.top, u.x = u.left, u.y = u.top, u),
            N = E(e.elements.reference),
            q = Q({
                reference: N,
                element: R,
                strategy: "absolute",
                placement: l
            }),
            $ = X(Object.assign({}, R, q)),
            F = O === U ? $ : N,
            K = {
                top: W.top - F.top + k.top,
                bottom: F.bottom - W.bottom + k.bottom,
                left: W.left - F.left + k.left,
                right: F.right - W.right + k.right
            },
            J = e.modifiersData.offset;
        if (O === U && J) {
            var G = J[l];
            Object.keys(K).forEach(function(e) {
                var t = [_, M].indexOf(e) >= 0 ? 1 : -1,
                    n = ["top", M].indexOf(e) >= 0 ? "y" : "x";
                K[e] += G[n] * t
            })
        }
        return K
    }
    var er = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };

    function eo() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some(function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        })
    }
    var ei = {
            passive: !0
        },
        ea = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };

    function es(e) {
        var t, n, r, o, i, a, s, c = e.popper,
            u = e.popperRect,
            p = e.placement,
            f = e.variation,
            l = e.offsets,
            d = e.position,
            v = e.gpuAcceleration,
            h = e.adaptive,
            g = e.roundOffsets,
            b = e.isFixed,
            y = l.x,
            x = void 0 === y ? 0 : y,
            O = l.y,
            E = void 0 === O ? 0 : O,
            T = "function" == typeof g ? g({
                x: x,
                y: E
            }) : {
                x: x,
                y: E
            };
        x = T.x, E = T.y;
        var A = l.hasOwnProperty("x"),
            D = l.hasOwnProperty("y"),
            C = V,
            k = "top",
            P = window;
        if (h) {
            var S = H(c),
                R = "clientHeight",
                W = "clientWidth";
            S === m(c) && "static" !== L(S = j(c)).position && "absolute" === d && (R = "scrollHeight", W = "scrollWidth"), ("top" === p || (p === V || p === _) && "end" === f) && (k = M, E -= (b && S === P && P.visualViewport ? P.visualViewport.height : S[R]) - u.height, E *= v ? 1 : -1), (p === V || ("top" === p || p === M) && "end" === f) && (C = _, x -= (b && S === P && P.visualViewport ? P.visualViewport.width : S[W]) - u.width, x *= v ? 1 : -1)
        }
        var B = Object.assign({
                position: d
            }, h && ea),
            N = !0 === g ? (t = {
                x: x,
                y: E
            }, n = m(c), r = t.x, o = t.y, {
                x: w(r * (i = n.devicePixelRatio || 1)) / i || 0,
                y: w(o * i) / i || 0
            }) : {
                x: x,
                y: E
            };
        return (x = N.x, E = N.y, v) ? Object.assign({}, B, ((s = {})[k] = D ? "0" : "", s[C] = A ? "0" : "", s.transform = 1 >= (P.devicePixelRatio || 1) ? "translate(" + x + "px, " + E + "px)" : "translate3d(" + x + "px, " + E + "px, 0)", s)) : Object.assign({}, B, ((a = {})[k] = D ? E + "px" : "", a[C] = A ? x + "px" : "", a.transform = "", a))
    }
    let ec = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var t = e.state;
            Object.keys(t.elements).forEach(function(e) {
                var n = t.styles[e] || {},
                    r = t.attributes[e] || {},
                    o = t.elements[e];
                h(o) && A(o) && (Object.assign(o.style, n), Object.keys(r).forEach(function(e) {
                    var t = r[e];
                    !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                }))
            })
        },
        effect: function(e) {
            var t = e.state,
                n = {
                    popper: {
                        position: t.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
            return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                function() {
                    Object.keys(t.elements).forEach(function(e) {
                        var r = t.elements[e],
                            o = t.attributes[e] || {},
                            i = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
                                return e[t] = "", e
                            }, {});
                        h(r) && A(r) && (Object.assign(r.style, i), Object.keys(o).forEach(function(e) {
                            r.removeAttribute(e)
                        }))
                    })
                }
        },
        requires: ["computeStyles"]
    };
    var eu = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };

    function ep(e) {
        return e.replace(/left|right|bottom|top/g, function(e) {
            return eu[e]
        })
    }
    var ef = {
        start: "end",
        end: "start"
    };

    function el(e) {
        return e.replace(/start|end/g, function(e) {
            return ef[e]
        })
    }

    function ed(e, t, n) {
        return b(e, y(t, n))
    }

    function em(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }

    function ev(e) {
        return ["top", _, M, V].some(function(t) {
            return e[t] >= 0
        })
    }
    var eh = (r = void 0 === (n = (t = {
            defaultModifiers: [{
                name: "eventListeners",
                enabled: !0,
                phase: "write",
                fn: function() {},
                effect: function(e) {
                    var t = e.state,
                        n = e.instance,
                        r = e.options,
                        o = r.scroll,
                        i = void 0 === o || o,
                        a = r.resize,
                        s = void 0 === a || a,
                        c = m(t.elements.popper),
                        u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                    return i && u.forEach(function(e) {
                            e.addEventListener("scroll", n.update, ei)
                        }), s && c.addEventListener("resize", n.update, ei),
                        function() {
                            i && u.forEach(function(e) {
                                e.removeEventListener("scroll", n.update, ei)
                            }), s && c.removeEventListener("resize", n.update, ei)
                        }
                },
                data: {}
            }, {
                name: "popperOffsets",
                enabled: !0,
                phase: "read",
                fn: function(e) {
                    var t = e.state,
                        n = e.name;
                    t.modifiersData[n] = Q({
                        reference: t.rects.reference,
                        element: t.rects.popper,
                        strategy: "absolute",
                        placement: t.placement
                    })
                },
                data: {}
            }, {
                name: "computeStyles",
                enabled: !0,
                phase: "beforeWrite",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = n.gpuAcceleration,
                        o = n.adaptive,
                        i = n.roundOffsets,
                        a = void 0 === i || i,
                        s = {
                            placement: K(t.placement),
                            variation: J(t.placement),
                            popper: t.elements.popper,
                            popperRect: t.rects.popper,
                            gpuAcceleration: void 0 === r || r,
                            isFixed: "fixed" === t.options.strategy
                        };
                    null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, es(Object.assign({}, s, {
                        offsets: t.modifiersData.popperOffsets,
                        position: t.options.strategy,
                        adaptive: void 0 === o || o,
                        roundOffsets: a
                    })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, es(Object.assign({}, s, {
                        offsets: t.modifiersData.arrow,
                        position: "absolute",
                        adaptive: !1,
                        roundOffsets: a
                    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                        "data-popper-placement": t.placement
                    })
                },
                data: {}
            }, ec, {
                name: "offset",
                enabled: !0,
                phase: "main",
                requires: ["popperOffsets"],
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = e.name,
                        o = n.offset,
                        i = void 0 === o ? [0, 0] : o,
                        a = $.reduce(function(e, n) {
                            var r, o, a, s, c, u;
                            return e[n] = (r = t.rects, a = [V, "top"].indexOf(o = K(n)) >= 0 ? -1 : 1, c = (s = "function" == typeof i ? i(Object.assign({}, r, {
                                placement: n
                            })) : i)[0], u = s[1], c = c || 0, u = (u || 0) * a, [V, _].indexOf(o) >= 0 ? {
                                x: u,
                                y: c
                            } : {
                                x: c,
                                y: u
                            }), e
                        }, {}),
                        s = a[t.placement],
                        c = s.x,
                        u = s.y;
                    null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a
                }
            }, {
                name: "flip",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = e.name;
                    if (!t.modifiersData[r]._skip) {
                        for (var o = n.mainAxis, i = void 0 === o || o, a = n.altAxis, s = void 0 === a || a, c = n.fallbackPlacements, u = n.padding, p = n.boundary, f = n.rootBoundary, l = n.altBoundary, d = n.flipVariations, m = void 0 === d || d, v = n.allowedAutoPlacements, h = t.options.placement, g = K(h) === h, b = c || (g || !m ? [ep(h)] : function(e) {
                                if (K(e) === W) return [];
                                var t = ep(e);
                                return [el(e), t, el(t)]
                            }(h)), y = [h].concat(b).reduce(function(e, n) {
                                var r, o, i, a, s, c, l, d, h, g, b, y;
                                return e.concat(K(n) === W ? (o = (r = {
                                    placement: n,
                                    boundary: p,
                                    rootBoundary: f,
                                    padding: u,
                                    flipVariations: m,
                                    allowedAutoPlacements: v
                                }).placement, i = r.boundary, a = r.rootBoundary, s = r.padding, c = r.flipVariations, d = void 0 === (l = r.allowedAutoPlacements) ? $ : l, 0 === (b = (g = (h = J(o)) ? c ? q : q.filter(function(e) {
                                    return J(e) === h
                                }) : B).filter(function(e) {
                                    return d.indexOf(e) >= 0
                                })).length && (b = g), Object.keys(y = b.reduce(function(e, n) {
                                    return e[n] = en(t, {
                                        placement: n,
                                        boundary: i,
                                        rootBoundary: a,
                                        padding: s
                                    })[K(n)], e
                                }, {})).sort(function(e, t) {
                                    return y[e] - y[t]
                                })) : n)
                            }, []), w = t.rects.reference, x = t.rects.popper, O = new Map, E = !0, T = y[0], A = 0; A < y.length; A++) {
                            var j = y[A],
                                D = K(j),
                                L = J(j) === N,
                                C = ["top", M].indexOf(D) >= 0,
                                k = C ? "width" : "height",
                                P = en(t, {
                                    placement: j,
                                    boundary: p,
                                    rootBoundary: f,
                                    altBoundary: l,
                                    padding: u
                                }),
                                S = C ? L ? _ : V : L ? M : "top";
                            w[k] > x[k] && (S = ep(S));
                            var R = ep(S),
                                H = [];
                            if (i && H.push(P[D] <= 0), s && H.push(P[S] <= 0, P[R] <= 0), H.every(function(e) {
                                    return e
                                })) {
                                T = j, E = !1;
                                break
                            }
                            O.set(j, H)
                        }
                        if (E)
                            for (var I = m ? 3 : 1, U = function(e) {
                                    var t = y.find(function(t) {
                                        var n = O.get(t);
                                        if (n) return n.slice(0, e).every(function(e) {
                                            return e
                                        })
                                    });
                                    if (t) return T = t, "break"
                                }, F = I; F > 0 && "break" !== U(F); F--);
                        t.placement !== T && (t.modifiersData[r]._skip = !0, t.placement = T, t.reset = !0)
                    }
                },
                requiresIfExists: ["offset"],
                data: {
                    _skip: !1
                }
            }, {
                name: "preventOverflow",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t = e.state,
                        n = e.options,
                        r = e.name,
                        o = n.mainAxis,
                        i = n.altAxis,
                        a = n.boundary,
                        s = n.rootBoundary,
                        c = n.altBoundary,
                        u = n.padding,
                        p = n.tether,
                        f = void 0 === p || p,
                        l = n.tetherOffset,
                        d = void 0 === l ? 0 : l,
                        m = en(t, {
                            boundary: a,
                            rootBoundary: s,
                            padding: u,
                            altBoundary: c
                        }),
                        v = K(t.placement),
                        h = J(t.placement),
                        g = !h,
                        w = G(v),
                        x = "x" === w ? "y" : "x",
                        O = t.modifiersData.popperOffsets,
                        E = t.rects.reference,
                        T = t.rects.popper,
                        A = "function" == typeof d ? d(Object.assign({}, t.rects, {
                            placement: t.placement
                        })) : d,
                        j = "number" == typeof A ? {
                            mainAxis: A,
                            altAxis: A
                        } : Object.assign({
                            mainAxis: 0,
                            altAxis: 0
                        }, A),
                        D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
                        L = {
                            x: 0,
                            y: 0
                        };
                    if (O) {
                        if (void 0 === o || o) {
                            var C, P = "y" === w ? "top" : V,
                                S = "y" === w ? M : _,
                                R = "y" === w ? "height" : "width",
                                W = O[w],
                                B = W + m[P],
                                I = W - m[S],
                                U = f ? -T[R] / 2 : 0,
                                q = h === N ? E[R] : T[R],
                                $ = h === N ? -T[R] : -E[R],
                                F = t.elements.arrow,
                                z = f && F ? k(F) : {
                                    width: 0,
                                    height: 0
                                },
                                X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Z(),
                                Y = X[P],
                                Q = X[S],
                                ee = ed(0, E[R], z[R]),
                                et = g ? E[R] / 2 - U - ee - Y - j.mainAxis : q - ee - Y - j.mainAxis,
                                er = g ? -E[R] / 2 + U + ee + Q + j.mainAxis : $ + ee + Q + j.mainAxis,
                                eo = t.elements.arrow && H(t.elements.arrow),
                                ei = eo ? "y" === w ? eo.clientTop || 0 : eo.clientLeft || 0 : 0,
                                ea = null != (C = null == D ? void 0 : D[w]) ? C : 0,
                                es = ed(f ? y(B, W + et - ea - ei) : B, W, f ? b(I, W + er - ea) : I);
                            O[w] = es, L[w] = es - W
                        }
                        if (void 0 !== i && i) {
                            var ec, eu, ep = "x" === w ? "top" : V,
                                ef = "x" === w ? M : _,
                                el = O[x],
                                em = "y" === x ? "height" : "width",
                                ev = el + m[ep],
                                eh = el - m[ef],
                                eg = -1 !== ["top", V].indexOf(v),
                                eb = null != (eu = null == D ? void 0 : D[x]) ? eu : 0,
                                ey = eg ? ev : el - E[em] - T[em] - eb + j.altAxis,
                                ew = eg ? el + E[em] + T[em] - eb - j.altAxis : eh,
                                ex = f && eg ? (ec = ed(ey, el, ew)) > ew ? ew : ec : ed(f ? ey : ev, el, f ? ew : eh);
                            O[x] = ex, L[x] = ex - el
                        }
                        t.modifiersData[r] = L
                    }
                },
                requiresIfExists: ["offset"]
            }, {
                name: "arrow",
                enabled: !0,
                phase: "main",
                fn: function(e) {
                    var t, n = e.state,
                        r = e.name,
                        o = e.options,
                        i = n.elements.arrow,
                        a = n.modifiersData.popperOffsets,
                        s = K(n.placement),
                        c = G(s),
                        u = [V, _].indexOf(s) >= 0 ? "height" : "width";
                    if (i && a) {
                        var p, f = (p = o.padding, ee("number" != typeof(p = "function" == typeof p ? p(Object.assign({}, n.rects, {
                                placement: n.placement
                            })) : p) ? p : et(p, B))),
                            l = k(i),
                            d = "y" === c ? "top" : V,
                            m = "y" === c ? M : _,
                            v = n.rects.reference[u] + n.rects.reference[c] - a[c] - n.rects.popper[u],
                            h = a[c] - n.rects.reference[c],
                            g = H(i),
                            b = g ? "y" === c ? g.clientHeight || 0 : g.clientWidth || 0 : 0,
                            y = f[d],
                            w = b - l[u] - f[m],
                            x = b / 2 - l[u] / 2 + (v / 2 - h / 2),
                            O = ed(y, x, w);
                        n.modifiersData[r] = ((t = {})[c] = O, t.centerOffset = O - x, t)
                    }
                },
                effect: function(e) {
                    var t = e.state,
                        n = e.options.element,
                        r = void 0 === n ? "[data-popper-arrow]" : n;
                    null == r || ("string" != typeof r || (r = t.elements.popper.querySelector(r))) && z(t.elements.popper, r) && (t.elements.arrow = r)
                },
                requires: ["popperOffsets"],
                requiresIfExists: ["preventOverflow"]
            }, {
                name: "hide",
                enabled: !0,
                phase: "main",
                requiresIfExists: ["preventOverflow"],
                fn: function(e) {
                    var t = e.state,
                        n = e.name,
                        r = t.rects.reference,
                        o = t.rects.popper,
                        i = t.modifiersData.preventOverflow,
                        a = en(t, {
                            elementContext: "reference"
                        }),
                        s = en(t, {
                            altBoundary: !0
                        }),
                        c = em(a, r),
                        u = em(s, o, i),
                        p = ev(c),
                        f = ev(u);
                    t.modifiersData[n] = {
                        referenceClippingOffsets: c,
                        popperEscapeOffsets: u,
                        isReferenceHidden: p,
                        hasPopperEscaped: f
                    }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                        "data-popper-reference-hidden": p,
                        "data-popper-escaped": f
                    })
                }
            }]
        }).defaultModifiers) ? [] : n, i = void 0 === (o = t.defaultOptions) ? er : o, function(e, t, n) {
            void 0 === n && (n = i);
            var o, a, s = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, er, i),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                },
                c = [],
                u = !1,
                p = {
                    state: s,
                    setOptions: function(n) {
                        var o, a, u, l, d, m, h = "function" == typeof n ? n(s.options) : n;
                        f(), s.options = Object.assign({}, i, s.options, h), s.scrollParents = {
                            reference: v(e) ? S(e) : e.contextElement ? S(e.contextElement) : [],
                            popper: S(t)
                        };
                        var g = (a = Object.keys(o = [].concat(r, s.options.modifiers).reduce(function(e, t) {
                            var n = e[t.name];
                            return e[t.name] = n ? Object.assign({}, n, t, {
                                options: Object.assign({}, n.options, t.options),
                                data: Object.assign({}, n.data, t.data)
                            }) : t, e
                        }, {})).map(function(e) {
                            return o[e]
                        }), u = new Map, l = new Set, d = [], a.forEach(function(e) {
                            u.set(e.name, e)
                        }), a.forEach(function(e) {
                            l.has(e.name) || function e(t) {
                                l.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach(function(t) {
                                    if (!l.has(t)) {
                                        var n = u.get(t);
                                        n && e(n)
                                    }
                                }), d.push(t)
                            }(e)
                        }), m = d, F.reduce(function(e, t) {
                            return e.concat(m.filter(function(e) {
                                return e.phase === t
                            }))
                        }, []));
                        return s.orderedModifiers = g.filter(function(e) {
                            return e.enabled
                        }), s.orderedModifiers.forEach(function(e) {
                            var t = e.name,
                                n = e.options,
                                r = e.effect;
                            if ("function" == typeof r) {
                                var o = r({
                                    state: s,
                                    name: t,
                                    instance: p,
                                    options: void 0 === n ? {} : n
                                });
                                c.push(o || function() {})
                            }
                        }), p.update()
                    },
                    forceUpdate: function() {
                        if (!u) {
                            var e = s.elements,
                                t = e.reference,
                                n = e.popper;
                            if (eo(t, n)) {
                                s.rects = {
                                    reference: (r = H(n), o = "fixed" === s.options.strategy, i = h(r), l = h(r) && (c = w((a = r.getBoundingClientRect()).width) / r.offsetWidth || 1, f = w(a.height) / r.offsetHeight || 1, 1 !== c || 1 !== f), d = j(r), v = E(t, l, o), g = {
                                        scrollLeft: 0,
                                        scrollTop: 0
                                    }, b = {
                                        x: 0,
                                        y: 0
                                    }, (i || !i && !o) && (("body" !== A(r) || C(d)) && (g = function(e) {
                                        return e !== m(e) && h(e) ? {
                                            scrollLeft: e.scrollLeft,
                                            scrollTop: e.scrollTop
                                        } : T(e)
                                    }(r)), h(r) ? (b = E(r, !0), b.x += r.clientLeft, b.y += r.clientTop) : d && (b.x = D(d))), {
                                        x: v.left + g.scrollLeft - b.x,
                                        y: v.top + g.scrollTop - b.y,
                                        width: v.width,
                                        height: v.height
                                    }),
                                    popper: k(n)
                                }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach(function(e) {
                                    return s.modifiersData[e.name] = Object.assign({}, e.data)
                                });
                                for (var r, o, i, a, c, f, l, d, v, g, b, y = 0; y < s.orderedModifiers.length; y++) {
                                    if (!0 === s.reset) {
                                        s.reset = !1, y = -1;
                                        continue
                                    }
                                    var x = s.orderedModifiers[y],
                                        O = x.fn,
                                        L = x.options,
                                        P = void 0 === L ? {} : L,
                                        S = x.name;
                                    "function" == typeof O && (s = O({
                                        state: s,
                                        options: P,
                                        name: S,
                                        instance: p
                                    }) || s)
                                }
                            }
                        }
                    },
                    update: (o = function() {
                        return new Promise(function(e) {
                            p.forceUpdate(), e(s)
                        })
                    }, function() {
                        return a || (a = new Promise(function(e) {
                            Promise.resolve().then(function() {
                                a = void 0, e(o())
                            })
                        })), a
                    }),
                    destroy: function() {
                        f(), u = !0
                    }
                };
            if (!eo(e, t)) return p;

            function f() {
                c.forEach(function(e) {
                    return e()
                }), c = []
            }
            return p.setOptions(n).then(function(e) {
                !u && n.onFirstUpdate && n.onFirstUpdate(e)
            }), p
        }),
        eg = "tippy-content",
        eb = "tippy-arrow",
        ey = "tippy-svg-arrow",
        ew = {
            passive: !0,
            capture: !0
        },
        ex = function() {
            return document.body
        };

    function eO(e, t, n) {
        if (Array.isArray(e)) {
            var r = e[t];
            return null == r ? Array.isArray(n) ? n[t] : n : r
        }
        return e
    }

    function eE(e, t) {
        var n = ({}).toString.call(e);
        return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1
    }

    function eT(e, t) {
        return "function" == typeof e ? e.apply(void 0, t) : e
    }

    function eA(e, t) {
        var n;
        return 0 === t ? e : function(r) {
            clearTimeout(n), n = setTimeout(function() {
                e(r)
            }, t)
        }
    }

    function ej(e) {
        return [].concat(e)
    }

    function eD(e, t) {
        -1 === e.indexOf(t) && e.push(t)
    }

    function eL(e) {
        return [].slice.call(e)
    }

    function eC(e) {
        return Object.keys(e).reduce(function(t, n) {
            return void 0 !== e[n] && (t[n] = e[n]), t
        }, {})
    }

    function ek() {
        return document.createElement("div")
    }

    function eP(e) {
        return ["Element", "Fragment"].some(function(t) {
            return eE(e, t)
        })
    }

    function eS(e, t) {
        e.forEach(function(e) {
            e && (e.style.transitionDuration = t + "ms")
        })
    }

    function eR(e, t) {
        e.forEach(function(e) {
            e && e.setAttribute("data-state", t)
        })
    }

    function eH(e, t, n) {
        var r = t + "EventListener";
        ["transitionend", "webkitTransitionEnd"].forEach(function(t) {
            e[r](t, n)
        })
    }

    function eM(e, t) {
        for (var n, r = t; r;) {
            if (e.contains(r)) return !0;
            r = null == r.getRootNode || null == (n = r.getRootNode()) ? void 0 : n.host
        }
        return !1
    }
    var e_ = {
            isTouch: !1
        },
        eV = 0;

    function eW() {
        !e_.isTouch && (e_.isTouch = !0, window.performance && document.addEventListener("mousemove", eB))
    }

    function eB() {
        var e = performance.now();
        e - eV < 20 && (e_.isTouch = !1, document.removeEventListener("mousemove", eB)), eV = e
    }

    function eN() {
        var e = document.activeElement;
        if (e && e._tippy && e._tippy.reference === e) {
            var t = e._tippy;
            e.blur && !t.state.isVisible && e.blur()
        }
    }
    var eI = !!("u" > typeof window && "u" > typeof document) && !!window.msCrypto,
        eU = Object.assign({
            appendTo: ex,
            aria: {
                content: "auto",
                expanded: "auto"
            },
            delay: 0,
            duration: [300, 250],
            getReferenceClientRect: null,
            hideOnClick: !0,
            ignoreAttributes: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [0, 10],
            onAfterUpdate: function() {},
            onBeforeUpdate: function() {},
            onCreate: function() {},
            onDestroy: function() {},
            onHidden: function() {},
            onHide: function() {},
            onMount: function() {},
            onShow: function() {},
            onShown: function() {},
            onTrigger: function() {},
            onUntrigger: function() {},
            onClickOutside: function() {},
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: !1,
            touch: !0,
            trigger: "mouseenter focus",
            triggerTarget: null
        }, {
            animateFill: !1,
            followCursor: !1,
            inlinePositioning: !1,
            sticky: !1
        }, {
            allowHTML: !1,
            animation: "fade",
            arrow: !0,
            content: "",
            inertia: !1,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999
        }),
        eq = Object.keys(eU);

    function e$(e) {
        var t = (e.plugins || []).reduce(function(t, n) {
            var r, o = n.name,
                i = n.defaultValue;
            return o && (t[o] = void 0 !== e[o] ? e[o] : null != (r = eU[o]) ? r : i), t
        }, {});
        return Object.assign({}, e, t)
    }

    function eF(e, t) {
        var n, r = Object.assign({}, t, {
            content: eT(t.content, [e])
        }, t.ignoreAttributes ? {} : ((n = t.plugins) ? Object.keys(e$(Object.assign({}, eU, {
            plugins: n
        }))) : eq).reduce(function(t, n) {
            var r = (e.getAttribute("data-tippy-" + n) || "").trim();
            if (!r) return t;
            if ("content" === n) t[n] = r;
            else try {
                t[n] = JSON.parse(r)
            } catch (e) {
                t[n] = r
            }
            return t
        }, {}));
        return r.aria = Object.assign({}, eU.aria, r.aria), r.aria = {
            expanded: "auto" === r.aria.expanded ? t.interactive : r.aria.expanded,
            content: "auto" === r.aria.content ? t.interactive ? null : "describedby" : r.aria.content
        }, r
    }

    function ez(e, t) {
        e.innerHTML = t
    }

    function eX(e) {
        var t = ek();
        return !0 === e ? t.className = eb : (t.className = ey, eP(e) ? t.appendChild(e) : ez(t, e)), t
    }

    function eY(e, t) {
        eP(t.content) ? (ez(e, ""), e.appendChild(t.content)) : "function" != typeof t.content && (t.allowHTML ? ez(e, t.content) : e.textContent = t.content)
    }

    function eK(e) {
        var t = e.firstElementChild,
            n = eL(t.children);
        return {
            box: t,
            content: n.find(function(e) {
                return e.classList.contains(eg)
            }),
            arrow: n.find(function(e) {
                return e.classList.contains(eb) || e.classList.contains(ey)
            }),
            backdrop: n.find(function(e) {
                return e.classList.contains("tippy-backdrop")
            })
        }
    }

    function eJ(e) {
        var t = ek(),
            n = ek();
        n.className = "tippy-box", n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
        var r = ek();

        function o(n, r) {
            var o = eK(t),
                i = o.box,
                a = o.content,
                s = o.arrow;
            r.theme ? i.setAttribute("data-theme", r.theme) : i.removeAttribute("data-theme"), "string" == typeof r.animation ? i.setAttribute("data-animation", r.animation) : i.removeAttribute("data-animation"), r.inertia ? i.setAttribute("data-inertia", "") : i.removeAttribute("data-inertia"), i.style.maxWidth = "number" == typeof r.maxWidth ? r.maxWidth + "px" : r.maxWidth, r.role ? i.setAttribute("role", r.role) : i.removeAttribute("role"), (n.content !== r.content || n.allowHTML !== r.allowHTML) && eY(a, e.props), r.arrow ? s ? n.arrow !== r.arrow && (i.removeChild(s), i.appendChild(eX(r.arrow))) : i.appendChild(eX(r.arrow)) : s && i.removeChild(s)
        }
        return r.className = eg, r.setAttribute("data-state", "hidden"), eY(r, e.props), t.appendChild(n), n.appendChild(r), o(e.props, e.props), {
            popper: t,
            onUpdate: o
        }
    }
    eJ.$$tippy = !0;
    var eG = 1,
        eQ = [],
        eZ = [];

    function e0(e, t) {
        void 0 === t && (t = {});
        var n, r = eU.plugins.concat(t.plugins || []);
        document.addEventListener("touchstart", eW, ew), window.addEventListener("blur", eN);
        var o = Object.assign({}, t, {
                plugins: r
            }),
            i = (eP(n = e) ? [n] : eE(n, "NodeList") ? eL(n) : Array.isArray(n) ? n : eL(document.querySelectorAll(n))).reduce(function(e, t) {
                var n = t && function(e, t) {
                    var n, r, o, i, a, s, c, u, p = eF(e, Object.assign({}, eU, e$(eC(t)))),
                        f = !1,
                        l = !1,
                        d = !1,
                        m = !1,
                        v = [],
                        h = eA(F, p.interactiveDebounce),
                        g = eG++,
                        b = (n = p.plugins).filter(function(e, t) {
                            return n.indexOf(e) === t
                        }),
                        y = {
                            id: g,
                            reference: e,
                            popper: ek(),
                            popperInstance: null,
                            props: p,
                            state: {
                                isEnabled: !0,
                                isVisible: !1,
                                isDestroyed: !1,
                                isMounted: !1,
                                isShown: !1
                            },
                            plugins: b,
                            clearDelayTimeouts: function() {
                                clearTimeout(r), clearTimeout(o), cancelAnimationFrame(i)
                            },
                            setProps: function(t) {
                                if (!y.state.isDestroyed) {
                                    P("onBeforeUpdate", [y, t]), q();
                                    var n = y.props,
                                        r = eF(e, Object.assign({}, n, eC(t), {
                                            ignoreAttributes: !0
                                        }));
                                    y.props = r, U(), n.interactiveDebounce !== r.interactiveDebounce && (H(), h = eA(F, r.interactiveDebounce)), n.triggerTarget && !r.triggerTarget ? ej(n.triggerTarget).forEach(function(e) {
                                        e.removeAttribute("aria-expanded")
                                    }) : r.triggerTarget && e.removeAttribute("aria-expanded"), R(), k(), O && O(n, r), y.popperInstance && (K(), G().forEach(function(e) {
                                        requestAnimationFrame(e._tippy.popperInstance.forceUpdate)
                                    })), P("onAfterUpdate", [y, t])
                                }
                            },
                            setContent: function(e) {
                                y.setProps({
                                    content: e
                                })
                            },
                            show: function() {
                                var t = y.state.isVisible,
                                    n = y.state.isDestroyed,
                                    r = !y.state.isEnabled,
                                    o = e_.isTouch && !y.props.touch,
                                    i = eO(y.props.duration, 0, eU.duration);
                                if (!(t || n || r || o || (u || e).hasAttribute("disabled")) && (P("onShow", [y], !1), !1 !== y.props.onShow(y))) {
                                    if (y.state.isVisible = !0, D() && (x.style.visibility = "visible"), k(), W(), y.state.isMounted || (x.style.transition = "none"), D()) {
                                        var a, s, p, f = eK(x);
                                        eS([f.box, f.content], 0)
                                    }
                                    c = function() {
                                        var e;
                                        if (y.state.isVisible && !m) {
                                            if (m = !0, x.offsetHeight, x.style.transition = y.props.moveTransition, D() && y.props.animation) {
                                                var t = eK(x),
                                                    n = t.box,
                                                    r = t.content;
                                                eS([n, r], i), eR([n, r], "visible")
                                            }
                                            S(), R(), eD(eZ, y), null == (e = y.popperInstance) || e.forceUpdate(), P("onMount", [y]), y.props.animation && D() && N(i, function() {
                                                y.state.isShown = !0, P("onShown", [y])
                                            })
                                        }
                                    }, s = y.props.appendTo, p = u || e, (a = y.props.interactive && s === ex || "parent" === s ? p.parentNode : eT(s, [p])).contains(x) || a.appendChild(x), y.state.isMounted = !0, K()
                                }
                            },
                            hide: function() {
                                var e = !y.state.isVisible,
                                    t = y.state.isDestroyed,
                                    n = !y.state.isEnabled,
                                    r = eO(y.props.duration, 1, eU.duration);
                                if (!e && !t && !n && (P("onHide", [y], !1), !1 !== y.props.onHide(y))) {
                                    if (y.state.isVisible = !1, y.state.isShown = !1, m = !1, f = !1, D() && (x.style.visibility = "hidden"), H(), B(), k(!0), D()) {
                                        var o, i = eK(x),
                                            a = i.box,
                                            s = i.content;
                                        y.props.animation && (eS([a, s], r), eR([a, s], "hidden"))
                                    }(S(), R(), y.props.animation) ? D() && (o = y.unmount, N(r, function() {
                                        !y.state.isVisible && x.parentNode && x.parentNode.contains(x) && o()
                                    })): y.unmount()
                                }
                            },
                            hideWithInteractivity: function(e) {
                                L().addEventListener("mousemove", h), eD(eQ, h), h(e)
                            },
                            enable: function() {
                                y.state.isEnabled = !0
                            },
                            disable: function() {
                                y.hide(), y.state.isEnabled = !1
                            },
                            unmount: function() {
                                y.state.isVisible && y.hide(), y.state.isMounted && (J(), G().forEach(function(e) {
                                    e._tippy.unmount()
                                }), x.parentNode && x.parentNode.removeChild(x), eZ = eZ.filter(function(e) {
                                    return e !== y
                                }), y.state.isMounted = !1, P("onHidden", [y]))
                            },
                            destroy: function() {
                                y.state.isDestroyed || (y.clearDelayTimeouts(), y.unmount(), q(), delete e._tippy, y.state.isDestroyed = !0, P("onDestroy", [y]))
                            }
                        };
                    if (!p.render) return y;
                    var w = p.render(y),
                        x = w.popper,
                        O = w.onUpdate;
                    x.setAttribute("data-tippy-root", ""), x.id = "tippy-" + y.id, y.popper = x, e._tippy = y, x._tippy = y;
                    var E = b.map(function(e) {
                            return e.fn(y)
                        }),
                        T = e.hasAttribute("aria-expanded");
                    return U(), R(), k(), P("onCreate", [y]), p.showOnCreate && Q(), x.addEventListener("mouseenter", function() {
                        y.props.interactive && y.state.isVisible && y.clearDelayTimeouts()
                    }), x.addEventListener("mouseleave", function() {
                        y.props.interactive && y.props.trigger.indexOf("mouseenter") >= 0 && L().addEventListener("mousemove", h)
                    }), y;

                    function A() {
                        var e = y.props.touch;
                        return Array.isArray(e) ? e : [e, 0]
                    }

                    function j() {
                        return "hold" === A()[0]
                    }

                    function D() {
                        var e;
                        return !!(null != (e = y.props.render) && e.$$tippy)
                    }

                    function L() {
                        var t, n, r = (u || e).parentNode;
                        return r && null != (n = ej(r)[0]) && null != (t = n.ownerDocument) && t.body ? n.ownerDocument : document
                    }

                    function C(e) {
                        return y.state.isMounted && !y.state.isVisible || e_.isTouch || a && "focus" === a.type ? 0 : eO(y.props.delay, +!e, eU.delay)
                    }

                    function k(e) {
                        void 0 === e && (e = !1), x.style.pointerEvents = y.props.interactive && !e ? "" : "none", x.style.zIndex = "" + y.props.zIndex
                    }

                    function P(e, t, n) {
                        if (void 0 === n && (n = !0), E.forEach(function(n) {
                                n[e] && n[e].apply(n, t)
                            }), n) {
                            var r;
                            (r = y.props)[e].apply(r, t)
                        }
                    }

                    function S() {
                        var t = y.props.aria;
                        if (t.content) {
                            var n = "aria-" + t.content,
                                r = x.id;
                            ej(y.props.triggerTarget || e).forEach(function(e) {
                                var t = e.getAttribute(n);
                                if (y.state.isVisible) e.setAttribute(n, t ? t + " " + r : r);
                                else {
                                    var o = t && t.replace(r, "").trim();
                                    o ? e.setAttribute(n, o) : e.removeAttribute(n)
                                }
                            })
                        }
                    }

                    function R() {
                        !T && y.props.aria.expanded && ej(y.props.triggerTarget || e).forEach(function(t) {
                            y.props.interactive ? t.setAttribute("aria-expanded", y.state.isVisible && t === (u || e) ? "true" : "false") : t.removeAttribute("aria-expanded")
                        })
                    }

                    function H() {
                        L().removeEventListener("mousemove", h), eQ = eQ.filter(function(e) {
                            return e !== h
                        })
                    }

                    function M(t) {
                        if (!e_.isTouch || !d && "mousedown" !== t.type) {
                            var n = t.composedPath && t.composedPath()[0] || t.target;
                            if (!(y.props.interactive && eM(x, n))) {
                                if (ej(y.props.triggerTarget || e).some(function(e) {
                                        return eM(e, n)
                                    })) {
                                    if (e_.isTouch || y.state.isVisible && y.props.trigger.indexOf("click") >= 0) return
                                } else P("onClickOutside", [y, t]);
                                !0 === y.props.hideOnClick && (y.clearDelayTimeouts(), y.hide(), l = !0, setTimeout(function() {
                                    l = !1
                                }), y.state.isMounted || B())
                            }
                        }
                    }

                    function _() {
                        d = !0
                    }

                    function V() {
                        d = !1
                    }

                    function W() {
                        var e = L();
                        e.addEventListener("mousedown", M, !0), e.addEventListener("touchend", M, ew), e.addEventListener("touchstart", V, ew), e.addEventListener("touchmove", _, ew)
                    }

                    function B() {
                        var e = L();
                        e.removeEventListener("mousedown", M, !0), e.removeEventListener("touchend", M, ew), e.removeEventListener("touchstart", V, ew), e.removeEventListener("touchmove", _, ew)
                    }

                    function N(e, t) {
                        var n = eK(x).box;

                        function r(e) {
                            e.target === n && (eH(n, "remove", r), t())
                        }
                        if (0 === e) return t();
                        eH(n, "remove", s), eH(n, "add", r), s = r
                    }

                    function I(t, n, r) {
                        void 0 === r && (r = !1), ej(y.props.triggerTarget || e).forEach(function(e) {
                            e.addEventListener(t, n, r), v.push({
                                node: e,
                                eventType: t,
                                handler: n,
                                options: r
                            })
                        })
                    }

                    function U() {
                        j() && (I("touchstart", $, {
                            passive: !0
                        }), I("touchend", z, {
                            passive: !0
                        })), y.props.trigger.split(/\s+/).filter(Boolean).forEach(function(e) {
                            if ("manual" !== e) switch (I(e, $), e) {
                                case "mouseenter":
                                    I("mouseleave", z);
                                    break;
                                case "focus":
                                    I(eI ? "focusout" : "blur", X);
                                    break;
                                case "focusin":
                                    I("focusout", X)
                            }
                        })
                    }

                    function q() {
                        v.forEach(function(e) {
                            var t = e.node,
                                n = e.eventType,
                                r = e.handler,
                                o = e.options;
                            t.removeEventListener(n, r, o)
                        }), v = []
                    }

                    function $(e) {
                        var t, n = !1;
                        if (!(!y.state.isEnabled || Y(e)) && !l) {
                            var r = (null == (t = a) ? void 0 : t.type) === "focus";
                            a = e, u = e.currentTarget, R(), !y.state.isVisible && eE(e, "MouseEvent") && eQ.forEach(function(t) {
                                return t(e)
                            }), "click" === e.type && (0 > y.props.trigger.indexOf("mouseenter") || f) && !1 !== y.props.hideOnClick && y.state.isVisible ? n = !0 : Q(e), "click" === e.type && (f = !n), n && !r && Z(e)
                        }
                    }

                    function F(t) {
                        var n, r, o, i = t.target,
                            a = (u || e).contains(i) || x.contains(i);
                        ("mousemove" !== t.type || !a) && (n = G().concat(x).map(function(e) {
                            var t, n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
                            return n ? {
                                popperRect: e.getBoundingClientRect(),
                                popperState: n,
                                props: p
                            } : null
                        }).filter(Boolean), r = t.clientX, o = t.clientY, n.every(function(e) {
                            var t = e.popperRect,
                                n = e.popperState,
                                i = e.props.interactiveBorder,
                                a = n.placement.split("-")[0],
                                s = n.modifiersData.offset;
                            if (!s) return !0;
                            var c = "bottom" === a ? s.top.y : 0,
                                u = "top" === a ? s.bottom.y : 0,
                                p = "right" === a ? s.left.x : 0,
                                f = "left" === a ? s.right.x : 0,
                                l = t.top - o + c > i,
                                d = o - t.bottom - u > i,
                                m = t.left - r + p > i,
                                v = r - t.right - f > i;
                            return l || d || m || v
                        }) && (H(), Z(t)))
                    }

                    function z(e) {
                        if (!(Y(e) || y.props.trigger.indexOf("click") >= 0 && f)) {
                            if (y.props.interactive) return void y.hideWithInteractivity(e);
                            Z(e)
                        }
                    }

                    function X(t) {
                        0 > y.props.trigger.indexOf("focusin") && t.target !== (u || e) || y.props.interactive && t.relatedTarget && x.contains(t.relatedTarget) || Z(t)
                    }

                    function Y(e) {
                        return !!e_.isTouch && j() !== e.type.indexOf("touch") >= 0
                    }

                    function K() {
                        J();
                        var t = y.props,
                            n = t.popperOptions,
                            r = t.placement,
                            o = t.offset,
                            i = t.getReferenceClientRect,
                            a = t.moveTransition,
                            s = D() ? eK(x).arrow : null,
                            p = i ? {
                                getBoundingClientRect: i,
                                contextElement: i.contextElement || u || e
                            } : e,
                            f = [{
                                name: "offset",
                                options: {
                                    offset: o
                                }
                            }, {
                                name: "preventOverflow",
                                options: {
                                    padding: {
                                        top: 2,
                                        bottom: 2,
                                        left: 5,
                                        right: 5
                                    }
                                }
                            }, {
                                name: "flip",
                                options: {
                                    padding: 5
                                }
                            }, {
                                name: "computeStyles",
                                options: {
                                    adaptive: !a
                                }
                            }, {
                                name: "$$tippy",
                                enabled: !0,
                                phase: "beforeWrite",
                                requires: ["computeStyles"],
                                fn: function(e) {
                                    var t = e.state;
                                    if (D()) {
                                        var n = eK(x).box;
                                        ["placement", "reference-hidden", "escaped"].forEach(function(e) {
                                            "placement" === e ? n.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? n.setAttribute("data-" + e, "") : n.removeAttribute("data-" + e)
                                        }), t.attributes.popper = {}
                                    }
                                }
                            }];
                        D() && s && f.push({
                            name: "arrow",
                            options: {
                                element: s,
                                padding: 3
                            }
                        }), f.push.apply(f, (null == n ? void 0 : n.modifiers) || []), y.popperInstance = eh(p, x, Object.assign({}, n, {
                            placement: r,
                            onFirstUpdate: c,
                            modifiers: f
                        }))
                    }

                    function J() {
                        y.popperInstance && (y.popperInstance.destroy(), y.popperInstance = null)
                    }

                    function G() {
                        return eL(x.querySelectorAll("[data-tippy-root]"))
                    }

                    function Q(e) {
                        y.clearDelayTimeouts(), e && P("onTrigger", [y, e]), W();
                        var t = C(!0),
                            n = A(),
                            o = n[0],
                            i = n[1];
                        e_.isTouch && "hold" === o && i && (t = i), t ? r = setTimeout(function() {
                            y.show()
                        }, t) : y.show()
                    }

                    function Z(e) {
                        if (y.clearDelayTimeouts(), P("onUntrigger", [y, e]), !y.state.isVisible) return void B();
                        if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0) || !f) {
                            var t = C(!1);
                            t ? o = setTimeout(function() {
                                y.state.isVisible && y.hide()
                            }, t) : i = requestAnimationFrame(function() {
                                y.hide()
                            })
                        }
                    }
                }(t, o);
                return n && e.push(n), e
            }, []);
        return eP(e) ? i[0] : i
    }
    e0.defaultProps = eU, e0.setDefaultProps = function(e) {
        Object.keys(e).forEach(function(t) {
            eU[t] = e[t]
        })
    }, e0.currentInput = e_, Object.assign({}, ec, {
        effect: function(e) {
            var t = e.state,
                n = {
                    popper: {
                        position: t.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
            Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow)
        }
    }), e0.setDefaultProps({
        render: eJ
    });
    var e1 = e.i(174080);

    function e2(e, t) {
        if (null == e) return {};
        var n, r, o = {},
            i = Object.keys(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
        return o
    }
    var e9 = "u" > typeof window && "u" > typeof document;

    function e3(e, t) {
        e && ("function" == typeof e && e(t), ({}).hasOwnProperty.call(e, "current") && (e.current = t))
    }

    function e8() {
        return e9 && document.createElement("div")
    }
    var e5 = e9 ? f.useLayoutEffect : f.useEffect;

    function e4(e, t, n) {
        n.split(/\s+/).forEach(function(n) {
            n && e.classList[t](n)
        })
    }
    var e7 = {
            name: "className",
            defaultValue: "",
            fn: function(e) {
                var t = e.popper.firstElementChild,
                    n = function() {
                        var t;
                        return !!(null == (t = e.props.render) ? void 0 : t.$$tippy)
                    };

                function r() {
                    e.props.className && !n() || e4(t, "add", e.props.className)
                }
                return {
                    onCreate: r,
                    onBeforeUpdate: function() {
                        n() && e4(t, "remove", e.props.className)
                    },
                    onAfterUpdate: r
                }
            }
        },
        e6 = (a = function(e) {
            var t, n, r, o = e.children,
                i = e.content,
                a = e.visible,
                s = e.singleton,
                c = e.render,
                u = e.reference,
                p = e.disabled,
                d = void 0 !== p && p,
                m = e.ignoreAttributes,
                v = (e.__source, e.__self, e2(e, ["children", "content", "visible", "singleton", "render", "reference", "disabled", "ignoreAttributes", "__source", "__self"])),
                h = void 0 !== a,
                g = void 0 !== s,
                b = (0, f.useState)(!1),
                y = b[0],
                w = b[1],
                x = (0, f.useState)({}),
                O = x[0],
                E = x[1],
                T = (0, f.useState)(),
                A = T[0],
                j = T[1],
                D = (t = function() {
                    return {
                        container: e8(),
                        renders: 1
                    }
                }, (n = (0, f.useRef)()).current || (n.current = "function" == typeof t ? t() : t), n.current),
                L = Object.assign({
                    ignoreAttributes: void 0 === m || m
                }, v, {
                    content: D.container
                });
            h && (L.trigger = "manual", L.hideOnClick = !1), g && (d = !0);
            var C = L,
                k = L.plugins || [];
            c && (C = Object.assign({}, L, {
                plugins: g && null != s.data ? [].concat(k, [{
                    fn: function() {
                        return {
                            onTrigger: function(e, t) {
                                var n = s.data.children.find(function(e) {
                                    return e.instance.reference === t.currentTarget
                                });
                                e.state.$$activeSingletonInstance = n.instance, j(n.content)
                            }
                        }
                    }
                }]) : k,
                render: function() {
                    return {
                        popper: D.container
                    }
                }
            }));
            var P = [u].concat(o ? [o.type] : []);
            return e5(function() {
                var e = u;
                u && u.hasOwnProperty("current") && (e = u.current);
                var t = e0(e || D.ref || e8(), Object.assign({}, C, {
                    plugins: [e7].concat(L.plugins || [])
                }));
                return D.instance = t, d && t.disable(), a && t.show(), g && s.hook({
                        instance: t,
                        content: i,
                        props: C,
                        setSingletonContent: j
                    }), w(!0),
                    function() {
                        t.destroy(), null == s || s.cleanup(t)
                    }
            }, P), e5(function() {
                if (1 === D.renders) return void D.renders++;
                var e, t, n, r, o, c, u, p = D.instance;
                p.setProps((e = p.props, Object.assign({}, t = C, {
                    popperOptions: Object.assign({}, e.popperOptions, t.popperOptions, {
                        modifiers: (o = [].concat((null == (n = e.popperOptions) ? void 0 : n.modifiers) || [], (null == (r = t.popperOptions) ? void 0 : r.modifiers) || []), c = [], o.forEach(function(e) {
                            c.find(function(t) {
                                return function e(t, n) {
                                    if (t === n) return !0;
                                    if ((void 0 === t ? "undefined" : (0, l._)(t)) !== "object" || null == t || (void 0 === n ? "undefined" : (0, l._)(n)) !== "object" || null == n || Object.keys(t).length !== Object.keys(n).length) return !1;
                                    for (var r in t)
                                        if (!n.hasOwnProperty(r)) return !1;
                                        else if (!e(t[r], n[r])) return !1;
                                    return !0
                                }(e, t)
                            }) || c.push(e)
                        }), c)
                    })
                }))), null == (u = p.popperInstance) || u.forceUpdate(), d ? p.disable() : p.enable(), h && (a ? p.show() : p.hide()), g && s.hook({
                    instance: p,
                    content: i,
                    props: C,
                    setSingletonContent: j
                })
            }), e5(function() {
                if (c) {
                    var e, t = D.instance;
                    t.setProps({
                        popperOptions: Object.assign({}, t.props.popperOptions, {
                            modifiers: [].concat(((null == (e = t.props.popperOptions) ? void 0 : e.modifiers) || []).filter(function(e) {
                                return "$$tippyReact" !== e.name
                            }), [{
                                name: "$$tippyReact",
                                enabled: !0,
                                phase: "beforeWrite",
                                requires: ["computeStyles"],
                                fn: function(e) {
                                    var t, n = e.state,
                                        r = null == (t = n.modifiersData) ? void 0 : t.hide;
                                    (O.placement !== n.placement || O.referenceHidden !== (null == r ? void 0 : r.isReferenceHidden) || O.escaped !== (null == r ? void 0 : r.hasPopperEscaped)) && E({
                                        placement: n.placement,
                                        referenceHidden: null == r ? void 0 : r.isReferenceHidden,
                                        escaped: null == r ? void 0 : r.hasPopperEscaped
                                    }), n.attributes.popper = {}
                                }
                            }])
                        })
                    })
                }
            }, [O.placement, O.referenceHidden, O.escaped].concat(P)), f.default.createElement(f.default.Fragment, null, o ? (0, f.cloneElement)(o, {
                ref: function(e) {
                    D.ref = e, e3(o.ref, e)
                }
            }) : null, y && (0, e1.createPortal)(c ? c((r = {
                "data-placement": O.placement
            }, O.referenceHidden && (r["data-reference-hidden"] = ""), O.escaped && (r["data-escaped"] = ""), r), A, D.instance) : i, D.container))
        }, (0, f.forwardRef)(function(e, t) {
            var n = e.children,
                r = e2(e, ["children"]);
            return f.default.createElement(a, Object.assign({}, void 0, r), n ? (0, f.cloneElement)(n, {
                ref: function(e) {
                    e3(t, e), e3(n.ref, e)
                }
            }) : null)
        })),
        te = null;

    function tt(e) {
        var t = e.children,
            n = e.onRef,
            r = e.isTouch,
            o = e.isVisible,
            i = e.onTouchTap,
            a = (0, f.useRef)(null);
        (0, f.useEffect)(function() {
            n(a.current)
        }, [n]);
        var s = (0, f.useCallback)(function(e) {
            r && (o || (e.preventDefault(), e.stopPropagation(), i()))
        }, [r, o, i]);
        return (0, p.jsx)("span", {
            ref: a,
            onClick: s,
            children: t
        })
    }

    function tn(e) {
        var t = e.children,
            n = e.content,
            r = e.enabled,
            o = e.customClass,
            i = e.isTouch,
            a = (0, c._)(e, ["children", "content", "enabled", "customClass", "isTouch"]),
            l = (0, u._)((0, f.useState)(!1), 2),
            d = l[0],
            m = l[1],
            v = (0, u._)((0, f.useState)(!1), 2),
            h = v[0],
            g = v[1],
            b = (0, u._)((0, f.useState)(null), 2),
            y = b[0],
            w = b[1],
            x = (0, f.useRef)(null),
            O = (0, f.useCallback)(function() {}, []),
            E = i ? {
                trigger: "click",
                touch: !0,
                interactive: !0,
                hideOnClick: !0,
                appendTo: "u" > typeof document ? function() {
                    return document.body
                } : void 0,
                animation: "none",
                inertia: !1,
                duration: [0, 0],
                placement: "top",
                popperOptions: {
                    modifiers: [{
                        name: "flip",
                        enabled: !0,
                        options: {
                            fallbackPlacements: ["bottom", "top"]
                        }
                    }, {
                        name: "eventListeners",
                        options: {
                            scroll: !0
                        }
                    }],
                    placement: "top"
                }
            } : {
                trigger: "mouseenter focus",
                touch: !1,
                interactive: !1,
                appendTo: "u" > typeof document ? function() {
                    return document.body
                } : void 0,
                animation: "none",
                inertia: !1,
                duration: [0, 0],
                placement: "top",
                popperOptions: {
                    modifiers: [{
                        name: "flip",
                        enabled: !0,
                        options: {
                            fallbackPlacements: ["bottom", "top"]
                        }
                    }, {
                        name: "eventListeners",
                        options: {
                            scroll: !1
                        }
                    }],
                    placement: "top"
                }
            };
        return (0, p.jsxs)(p.Fragment, {
            children: [(0, p.jsx)(tt, {
                onRef: w,
                isTouch: i,
                isVisible: h,
                onTouchTap: O,
                children: t
            }), y && (0, p.jsx)(e6, (0, s._)({
                reference: y,
                className: o,
                plugins: [{
                    fn: function() {
                        return {
                            onMount: function() {
                                return m(!0)
                            },
                            onShow: function(e) {
                                i && (te && te !== e && te.hide(), te = e), x.current = e, g(!0)
                            },
                            onHide: function() {
                                i && te === x.current && (te = null), g(!1)
                            },
                            onHidden: function() {
                                return m(!1)
                            }
                        }
                    }
                }],
                content: d ? "function" == typeof n ? n() : n : "",
                disabled: !r
            }, E, a))]
        })
    }
    e.s(["CustomPopover", 0, function(e) {
        var t, n, r, o = e.children,
            i = e.popover,
            a = e.enabled,
            s = e.customClass,
            c = (n = (t = (0, u._)((0, f.useState)(!1), 2))[0], r = t[1], (0, f.useEffect)(function() {
                var e = window.matchMedia("(hover: none) and (pointer: coarse)");
                r(e.matches);
                var t = function(e) {
                    return r(e.matches)
                };
                return e.addEventListener("change", t),
                    function() {
                        return e.removeEventListener("change", t)
                    }
            }, []), n);
        return a ? (0, p.jsx)(tn, {
            customClass: s,
            enabled: a,
            isTouch: c,
            content: null != i ? i : null,
            children: o
        }) : (0, p.jsx)("span", {
            children: o
        })
    }], 719180)
}]);