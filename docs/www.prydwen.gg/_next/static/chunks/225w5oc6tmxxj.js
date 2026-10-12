(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 975157, r => {
    "use strict";
    var e = r.i(855111),
        o = r.i(207670),
        t = r.i(480388),
        n = r.i(317608),
        a = function(r, e) {
            for (var o = Array(r.length + e.length), t = 0; t < r.length; t++) o[t] = r[t];
            for (var n = 0; n < e.length; n++) o[r.length + n] = e[n];
            return o
        },
        s = function() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Map,
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                o = arguments.length > 2 ? arguments[2] : void 0;
            return {
                nextPart: r,
                validators: e,
                classGroupId: o
            }
        },
        i = [],
        l = function(r) {
            var e = u(r),
                o = r.conflictingClassGroups,
                t = r.conflictingClassGroupModifiers;
            return {
                getClassGroupId: function(r) {
                    if (r.startsWith("[") && r.endsWith("]")) return d(r);
                    var o = r.split("-"),
                        t = +("" === o[0] && o.length > 1);
                    return c(o, t, e)
                },
                getConflictingClassGroupIds: function(r, e) {
                    if (e) {
                        var n = t[r],
                            s = o[r];
                        return n ? s ? a(s, n) : n : s || i
                    }
                    return o[r] || i
                }
            }
        },
        c = function(r, e, o) {
            if (0 == r.length - e) return o.classGroupId;
            var t = r[e],
                n = o.nextPart.get(t);
            if (n) {
                var a = c(r, e + 1, n);
                if (a) return a
            }
            var s = o.validators;
            if (null !== s)
                for (var i = 0 === e ? r.join("-") : r.slice(e).join("-"), l = s.length, d = 0; d < l; d++) {
                    var u = s[d];
                    if (u.validator(i)) return u.classGroupId
                }
        },
        d = function(r) {
            var e, o, t;
            return -1 === r.slice(1, -1).indexOf(":") ? void 0 : (o = (e = r.slice(1, -1)).indexOf(":"), (t = e.slice(0, o)) ? "arbitrary.." + t : void 0)
        },
        u = function(r) {
            var e = r.theme;
            return m(r.classGroups, e)
        },
        m = function(r, e) {
            var o = s();
            for (var t in r) f(r[t], o, t, e);
            return o
        },
        f = function(r, e, o, t) {
            for (var n = r.length, a = 0; a < n; a++) p(r[a], e, o, t)
        },
        p = function(r, e, o, t) {
            "string" == typeof r ? b(r, e, o) : "function" == typeof r ? g(r, e, o, t) : h(r, e, o, t)
        },
        b = function(r, e, o) {
            ("" === r ? e : v(e, r)).classGroupId = o
        },
        g = function(r, e, o, t) {
            x(r) ? f(r(t), e, o, t) : (null === e.validators && (e.validators = []), e.validators.push({
                classGroupId: o,
                validator: r
            }))
        },
        h = function(r, e, o, t) {
            for (var a = Object.entries(r), s = a.length, i = 0; i < s; i++) {
                var l = (0, n._)(a[i], 2),
                    c = l[0];
                f(l[1], v(e, c), o, t)
            }
        },
        v = function(r, e) {
            for (var o = r, t = e.split("-"), n = t.length, a = 0; a < n; a++) {
                var i = t[a],
                    l = o.nextPart.get(i);
                l || (l = s(), o.nextPart.set(i, l)), o = l
            }
            return o
        },
        x = function(r) {
            return "isThemeGetter" in r && !0 === r.isThemeGetter
        },
        k = function(r) {
            if (r < 1) return {
                get: function() {},
                set: function() {}
            };
            var e = 0,
                o = Object.create(null),
                t = Object.create(null),
                n = function(n, a) {
                    o[n] = a, ++e > r && (e = 0, t = o, o = Object.create(null))
                };
            return {
                get: function(r) {
                    var e = o[r];
                    return void 0 !== e ? e : void 0 !== (e = t[r]) ? (n(r, e), e) : void 0
                },
                set: function(r, e) {
                    r in o ? o[r] = e : n(r, e)
                }
            }
        },
        w = [],
        y = function(r, e, o, t, n) {
            return {
                modifiers: r,
                hasImportantModifier: e,
                baseClassName: o,
                maybePostfixModifierPosition: t,
                isExternal: n
            }
        },
        z = function(r) {
            var e = r.prefix,
                o = r.experimentalParseClassName,
                t = function(r) {
                    for (var e, o = [], t = 0, n = 0, a = 0, s = r.length, i = 0; i < s; i++) {
                        var l = r[i];
                        if (0 === t && 0 === n) {
                            if (":" === l) {
                                o.push(r.slice(a, i)), a = i + 1;
                                continue
                            }
                            if ("/" === l) {
                                e = i;
                                continue
                            }
                        }
                        "[" === l ? t++ : "]" === l ? t-- : "(" === l ? n++ : ")" === l && n--
                    }
                    var c = 0 === o.length ? r : r.slice(a),
                        d = c,
                        u = !1;
                    return c.endsWith("!") ? (d = c.slice(0, -1), u = !0) : c.startsWith("!") && (d = c.slice(1), u = !0), y(o, u, d, e && e > a ? e - a : void 0)
                };
            if (e) {
                var n = e + ":",
                    a = t;
                t = function(r) {
                    return r.startsWith(n) ? a(r.slice(n.length)) : y(w, !1, r, void 0, !0)
                }
            }
            if (o) {
                var s = t;
                t = function(r) {
                    return o({
                        className: r,
                        parseClassName: s
                    })
                }
            }
            return t
        },
        _ = function(r) {
            var o = new Map;
            return r.orderSensitiveModifiers.forEach(function(r, e) {
                    o.set(r, 1e6 + e)
                }),
                function(r) {
                    for (var t = [], n = [], a = 0; a < r.length; a++) {
                        var s = r[a],
                            i = "[" === s[0],
                            l = o.has(s);
                        i || l ? (n.length > 0 && (n.sort(), t.push.apply(t, (0, e._)(n)), n = []), t.push(s)) : n.push(s)
                    }
                    return n.length > 0 && (n.sort(), t.push.apply(t, (0, e._)(n))), t
                }
        },
        G = function(r) {
            var e = Object.create(null),
                o = r.postfixLookupClassGroups;
            if (o)
                for (var t = 0; t < o.length; t++) e[o[t]] = !0;
            return e
        },
        C = /\s+/,
        S = function(r, e) {
            for (var o = e.parseClassName, t = e.getClassGroupId, n = e.getConflictingClassGroupIds, a = e.sortModifiers, s = e.postfixLookupClassGroupIds, i = [], l = r.trim().split(C), c = "", d = l.length - 1; d >= 0; d -= 1) {
                var u = l[d],
                    m = o(u),
                    f = m.isExternal,
                    p = m.modifiers,
                    b = m.hasImportantModifier,
                    g = m.baseClassName,
                    h = m.maybePostfixModifierPosition;
                if (f) {
                    c = u + (c.length > 0 ? " " + c : c);
                    continue
                }
                var v = !!h,
                    x = void 0;
                if (v) {
                    var k = (x = t(g.substring(0, h))) && s[x] ? t(g) : void 0;
                    k && k !== x && (x = k, v = !1)
                } else x = t(g);
                if (!x) {
                    if (!v || !(x = t(g))) {
                        c = u + (c.length > 0 ? " " + c : c);
                        continue
                    }
                    v = !1
                }
                var w = 0 === p.length ? "" : 1 === p.length ? p[0] : a(p).join(":"),
                    y = b ? w + "!" : w,
                    z = y + x;
                if (!(i.indexOf(z) > -1)) {
                    i.push(z);
                    for (var _ = n(x, v), G = 0; G < _.length; ++G) {
                        var S = _[G];
                        i.push(y + S)
                    }
                    c = u + (c.length > 0 ? " " + c : c)
                }
            }
            return c
        },
        M = function() {
            for (var r, e, o = arguments.length, t = Array(o), n = 0; n < o; n++) t[n] = arguments[n];
            for (var a = 0, s = ""; a < t.length;)(r = t[a++]) && (e = j(r)) && (s && (s += " "), s += e);
            return s
        },
        j = function(r) {
            if ("string" == typeof r) return r;
            for (var e, o = "", t = 0; t < r.length; t++) r[t] && (e = j(r[t])) && (o && (o += " "), o += e);
            return o
        },
        I = function(r) {
            for (var o, n, a, s, i = arguments.length, c = Array(i > 1 ? i - 1 : 0), d = 1; d < i; d++) c[d - 1] = arguments[d];
            var u = function(r) {
                var e = n(r);
                if (e) return e;
                var t = S(r, o);
                return a(r, t), t
            };
            return s = function(e) {
                    var i;
                    return i = c.reduce(function(r, e) {
                        return e(r)
                    }, r()), n = (o = (0, t._)({
                        cache: k(i.cacheSize),
                        parseClassName: z(i),
                        sortModifiers: _(i),
                        postfixLookupClassGroupIds: G(i)
                    }, l(i))).cache.get, a = o.cache.set, s = u, u(e)
                },
                function() {
                    for (var r = arguments.length, o = Array(r), t = 0; t < r; t++) o[t] = arguments[t];
                    return s(M.apply(void 0, (0, e._)(o)))
                }
        },
        N = [],
        D = function(r) {
            var e = function(e) {
                return e[r] || N
            };
            return e.isThemeGetter = !0, e.themeKey = r, e
        },
        O = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
        P = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
        T = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
        A = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
        W = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
        L = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/,
        $ = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
        B = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
        F = function(r) {
            return T.test(r)
        },
        q = function(r) {
            return !!r && !Number.isNaN(Number(r))
        },
        E = function(r) {
            return !!r && Number.isInteger(Number(r))
        },
        J = function(r) {
            return r.endsWith("%") && q(r.slice(0, -1))
        },
        K = function(r) {
            return A.test(r)
        },
        U = function() {
            return !0
        },
        R = function(r) {
            return W.test(r) && !L.test(r)
        },
        Y = function() {
            return !1
        },
        H = function(r) {
            return $.test(r)
        },
        Z = function(r) {
            return B.test(r)
        },
        Q = function(r) {
            return !rr(r) && !rl(r)
        },
        V = function(r) {
            return r.startsWith("@container") && ("/" === r[10] && void 0 !== r[11] || "s" === r[11] && void 0 !== r[16] && r.startsWith("-size/", 10) || "n" === r[11] && void 0 !== r[18] && r.startsWith("-normal/", 10))
        },
        X = function(r) {
            return rg(r, rk, Y)
        },
        rr = function(r) {
            return O.test(r)
        },
        re = function(r) {
            return rg(r, rw, R)
        },
        ro = function(r) {
            return rg(r, ry, q)
        },
        rt = function(r) {
            return rg(r, r_, U)
        },
        rn = function(r) {
            return rg(r, rz, Y)
        },
        ra = function(r) {
            return rg(r, rv, Y)
        },
        rs = function(r) {
            return rg(r, rx, Z)
        },
        ri = function(r) {
            return rg(r, rG, H)
        },
        rl = function(r) {
            return P.test(r)
        },
        rc = function(r) {
            return rh(r, rw)
        },
        rd = function(r) {
            return rh(r, rz)
        },
        ru = function(r) {
            return rh(r, rv)
        },
        rm = function(r) {
            return rh(r, rk)
        },
        rf = function(r) {
            return rh(r, rx)
        },
        rp = function(r) {
            return rh(r, rG, !0)
        },
        rb = function(r) {
            return rh(r, r_, !0)
        },
        rg = function(r, e, o) {
            var t = O.exec(r);
            return !!t && (t[1] ? e(t[1]) : o(t[2]))
        },
        rh = function(r, e) {
            var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                t = P.exec(r);
            return !!t && (t[1] ? e(t[1]) : o)
        },
        rv = function(r) {
            return "position" === r || "percentage" === r
        },
        rx = function(r) {
            return "image" === r || "url" === r
        },
        rk = function(r) {
            return "length" === r || "size" === r || "bg-size" === r
        },
        rw = function(r) {
            return "length" === r
        },
        ry = function(r) {
            return "number" === r
        },
        rz = function(r) {
            return "family-name" === r
        },
        r_ = function(r) {
            return "number" === r || "weight" === r
        },
        rG = function(r) {
            return "shadow" === r
        },
        rC = function() {
            var r = D("color"),
                o = D("font"),
                t = D("text"),
                n = D("font-weight"),
                a = D("tracking"),
                s = D("leading"),
                i = D("breakpoint"),
                l = D("container"),
                c = D("spacing"),
                d = D("radius"),
                u = D("shadow"),
                m = D("inset-shadow"),
                f = D("text-shadow"),
                p = D("drop-shadow"),
                b = D("blur"),
                g = D("perspective"),
                h = D("aspect"),
                v = D("ease"),
                x = D("animate"),
                k = function() {
                    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]
                },
                w = function() {
                    return ["center", "top", "bottom", "left", "right", "top-left", "left-top", "top-right", "right-top", "bottom-right", "right-bottom", "bottom-left", "left-bottom"]
                },
                y = function() {
                    return (0, e._)(w()).concat([rl, rr])
                },
                z = function() {
                    return ["auto", "hidden", "clip", "visible", "scroll"]
                },
                _ = function() {
                    return ["auto", "contain", "none"]
                },
                G = function() {
                    return [rl, rr, c]
                },
                C = function() {
                    return [F, "full", "auto"].concat((0, e._)(G()))
                },
                S = function() {
                    return [E, "none", "subgrid", rl, rr]
                },
                M = function() {
                    return ["auto", {
                        span: ["full", E, rl, rr]
                    }, E, rl, rr]
                },
                j = function() {
                    return [E, "auto", rl, rr]
                },
                I = function() {
                    return ["auto", "min", "max", "fr", rl, rr]
                },
                N = function() {
                    return ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"]
                },
                O = function() {
                    return ["start", "end", "center", "stretch", "center-safe", "end-safe"]
                },
                P = function() {
                    return ["auto"].concat((0, e._)(G()))
                },
                T = function() {
                    return [F, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit"].concat((0, e._)(G()))
                },
                A = function() {
                    return [l, F, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit"].concat((0, e._)(G()))
                },
                W = function() {
                    return [F, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit"].concat((0, e._)(G()))
                },
                L = function() {
                    return [r, rl, rr]
                },
                $ = function() {
                    return (0, e._)(w()).concat([ru, ra, {
                        position: [rl, rr]
                    }])
                },
                B = function() {
                    return ["no-repeat", {
                        repeat: ["", "x", "y", "space", "round"]
                    }]
                },
                R = function() {
                    return ["auto", "cover", "contain", rm, X, {
                        size: [rl, rr]
                    }]
                },
                Y = function() {
                    return [J, rc, re]
                },
                H = function() {
                    return ["", "none", "full", d, rl, rr]
                },
                Z = function() {
                    return ["", q, rc, re]
                },
                rg = function() {
                    return ["solid", "dashed", "dotted", "double"]
                },
                rh = function() {
                    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]
                },
                rv = function() {
                    return [q, J, ru, ra]
                },
                rx = function() {
                    return ["", "none", b, rl, rr]
                },
                rk = function() {
                    return ["none", q, rl, rr]
                },
                rw = function() {
                    return ["none", q, rl, rr]
                },
                ry = function() {
                    return [q, rl, rr]
                },
                rz = function() {
                    return [F, "full"].concat((0, e._)(G()))
                };
            return {
                cacheSize: 500,
                theme: {
                    animate: ["spin", "ping", "pulse", "bounce"],
                    aspect: ["video"],
                    blur: [K],
                    breakpoint: [K],
                    color: [U],
                    container: [K],
                    "drop-shadow": [K],
                    ease: ["in", "out", "in-out"],
                    font: [Q],
                    "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
                    "inset-shadow": [K],
                    leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
                    perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
                    radius: [K],
                    shadow: [K],
                    spacing: ["px", q],
                    text: [K],
                    "text-shadow": [K],
                    tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
                },
                classGroups: {
                    aspect: [{
                        aspect: ["auto", "square", F, rr, rl, h]
                    }],
                    container: ["container"],
                    "container-type": [{
                        "@container": ["", "normal", "size", rl, rr]
                    }],
                    "container-named": [V],
                    columns: [{
                        columns: [q, "auto", rr, rl, l]
                    }],
                    "break-after": [{
                        "break-after": k()
                    }],
                    "break-before": [{
                        "break-before": k()
                    }],
                    "break-inside": [{
                        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
                    }],
                    "box-decoration": [{
                        "box-decoration": ["slice", "clone"]
                    }],
                    box: [{
                        box: ["border", "content"]
                    }],
                    display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
                    sr: ["sr-only", "not-sr-only"],
                    float: [{
                        float: ["right", "left", "none", "start", "end"]
                    }],
                    clear: [{
                        clear: ["left", "right", "both", "none", "start", "end"]
                    }],
                    isolation: ["isolate", "isolation-auto"],
                    "object-fit": [{
                        object: ["contain", "cover", "fill", "none", "scale-down"]
                    }],
                    "object-position": [{
                        object: y()
                    }],
                    overflow: [{
                        overflow: z()
                    }],
                    "overflow-x": [{
                        "overflow-x": z()
                    }],
                    "overflow-y": [{
                        "overflow-y": z()
                    }],
                    overscroll: [{
                        overscroll: _()
                    }],
                    "overscroll-x": [{
                        "overscroll-x": _()
                    }],
                    "overscroll-y": [{
                        "overscroll-y": _()
                    }],
                    position: ["static", "fixed", "absolute", "relative", "sticky"],
                    inset: [{
                        inset: C()
                    }],
                    "inset-x": [{
                        "inset-x": C()
                    }],
                    "inset-y": [{
                        "inset-y": C()
                    }],
                    start: [{
                        "inset-s": C(),
                        start: C()
                    }],
                    end: [{
                        "inset-e": C(),
                        end: C()
                    }],
                    "inset-bs": [{
                        "inset-bs": C()
                    }],
                    "inset-be": [{
                        "inset-be": C()
                    }],
                    top: [{
                        top: C()
                    }],
                    right: [{
                        right: C()
                    }],
                    bottom: [{
                        bottom: C()
                    }],
                    left: [{
                        left: C()
                    }],
                    visibility: ["visible", "invisible", "collapse"],
                    z: [{
                        z: [E, "auto", rl, rr]
                    }],
                    basis: [{
                        basis: [F, "full", "auto", l].concat((0, e._)(G()))
                    }],
                    "flex-direction": [{
                        flex: ["row", "row-reverse", "col", "col-reverse"]
                    }],
                    "flex-wrap": [{
                        flex: ["nowrap", "wrap", "wrap-reverse"]
                    }],
                    flex: [{
                        flex: [q, F, "auto", "initial", "none", rr]
                    }],
                    grow: [{
                        grow: ["", q, rl, rr]
                    }],
                    shrink: [{
                        shrink: ["", q, rl, rr]
                    }],
                    order: [{
                        order: [E, "first", "last", "none", rl, rr]
                    }],
                    "grid-cols": [{
                        "grid-cols": S()
                    }],
                    "col-start-end": [{
                        col: M()
                    }],
                    "col-start": [{
                        "col-start": j()
                    }],
                    "col-end": [{
                        "col-end": j()
                    }],
                    "grid-rows": [{
                        "grid-rows": S()
                    }],
                    "row-start-end": [{
                        row: M()
                    }],
                    "row-start": [{
                        "row-start": j()
                    }],
                    "row-end": [{
                        "row-end": j()
                    }],
                    "grid-flow": [{
                        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
                    }],
                    "auto-cols": [{
                        "auto-cols": I()
                    }],
                    "auto-rows": [{
                        "auto-rows": I()
                    }],
                    gap: [{
                        gap: G()
                    }],
                    "gap-x": [{
                        "gap-x": G()
                    }],
                    "gap-y": [{
                        "gap-y": G()
                    }],
                    "justify-content": [{
                        justify: (0, e._)(N()).concat(["normal"])
                    }],
                    "justify-items": [{
                        "justify-items": (0, e._)(O()).concat(["normal"])
                    }],
                    "justify-self": [{
                        "justify-self": ["auto"].concat((0, e._)(O()))
                    }],
                    "align-content": [{
                        content: ["normal"].concat((0, e._)(N()))
                    }],
                    "align-items": [{
                        items: (0, e._)(O()).concat([{
                            baseline: ["", "last"]
                        }])
                    }],
                    "align-self": [{
                        self: ["auto"].concat((0, e._)(O()), [{
                            baseline: ["", "last"]
                        }])
                    }],
                    "place-content": [{
                        "place-content": N()
                    }],
                    "place-items": [{
                        "place-items": (0, e._)(O()).concat(["baseline"])
                    }],
                    "place-self": [{
                        "place-self": ["auto"].concat((0, e._)(O()))
                    }],
                    p: [{
                        p: G()
                    }],
                    px: [{
                        px: G()
                    }],
                    py: [{
                        py: G()
                    }],
                    ps: [{
                        ps: G()
                    }],
                    pe: [{
                        pe: G()
                    }],
                    pbs: [{
                        pbs: G()
                    }],
                    pbe: [{
                        pbe: G()
                    }],
                    pt: [{
                        pt: G()
                    }],
                    pr: [{
                        pr: G()
                    }],
                    pb: [{
                        pb: G()
                    }],
                    pl: [{
                        pl: G()
                    }],
                    m: [{
                        m: P()
                    }],
                    mx: [{
                        mx: P()
                    }],
                    my: [{
                        my: P()
                    }],
                    ms: [{
                        ms: P()
                    }],
                    me: [{
                        me: P()
                    }],
                    mbs: [{
                        mbs: P()
                    }],
                    mbe: [{
                        mbe: P()
                    }],
                    mt: [{
                        mt: P()
                    }],
                    mr: [{
                        mr: P()
                    }],
                    mb: [{
                        mb: P()
                    }],
                    ml: [{
                        ml: P()
                    }],
                    "space-x": [{
                        "space-x": G()
                    }],
                    "space-x-reverse": ["space-x-reverse"],
                    "space-y": [{
                        "space-y": G()
                    }],
                    "space-y-reverse": ["space-y-reverse"],
                    size: [{
                        size: T()
                    }],
                    "inline-size": [{
                        inline: ["auto"].concat((0, e._)(A()))
                    }],
                    "min-inline-size": [{
                        "min-inline": ["auto"].concat((0, e._)(A()))
                    }],
                    "max-inline-size": [{
                        "max-inline": ["none"].concat((0, e._)(A()))
                    }],
                    "block-size": [{
                        block: ["auto"].concat((0, e._)(W()))
                    }],
                    "min-block-size": [{
                        "min-block": ["auto"].concat((0, e._)(W()))
                    }],
                    "max-block-size": [{
                        "max-block": ["none"].concat((0, e._)(W()))
                    }],
                    w: [{
                        w: [l, "screen"].concat((0, e._)(T()))
                    }],
                    "min-w": [{
                        "min-w": [l, "screen", "none"].concat((0, e._)(T()))
                    }],
                    "max-w": [{
                        "max-w": [l, "screen", "none", "prose", {
                            screen: [i]
                        }].concat((0, e._)(T()))
                    }],
                    h: [{
                        h: ["screen", "lh"].concat((0, e._)(T()))
                    }],
                    "min-h": [{
                        "min-h": ["screen", "lh", "none"].concat((0, e._)(T()))
                    }],
                    "max-h": [{
                        "max-h": ["screen", "lh", "none"].concat((0, e._)(T()))
                    }],
                    "font-size": [{
                        text: ["base", t, rc, re]
                    }],
                    "font-smoothing": ["antialiased", "subpixel-antialiased"],
                    "font-style": ["italic", "not-italic"],
                    "font-weight": [{
                        font: [n, rb, rt]
                    }],
                    "font-stretch": [{
                        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", J, rr]
                    }],
                    "font-family": [{
                        font: [rd, rn, o]
                    }],
                    "font-features": [{
                        "font-features": [rr]
                    }],
                    "fvn-normal": ["normal-nums"],
                    "fvn-ordinal": ["ordinal"],
                    "fvn-slashed-zero": ["slashed-zero"],
                    "fvn-figure": ["lining-nums", "oldstyle-nums"],
                    "fvn-spacing": ["proportional-nums", "tabular-nums"],
                    "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
                    tracking: [{
                        tracking: [a, rl, rr]
                    }],
                    "line-clamp": [{
                        "line-clamp": [q, "none", rl, ro]
                    }],
                    leading: [{
                        leading: ["none", s].concat((0, e._)(G()))
                    }],
                    "list-image": [{
                        "list-image": ["none", rl, rr]
                    }],
                    "list-style-position": [{
                        list: ["inside", "outside"]
                    }],
                    "list-style-type": [{
                        list: ["disc", "decimal", "none", rl, rr]
                    }],
                    "text-alignment": [{
                        text: ["left", "center", "right", "justify", "start", "end"]
                    }],
                    "placeholder-color": [{
                        placeholder: L()
                    }],
                    "text-color": [{
                        text: L()
                    }],
                    "text-decoration": ["underline", "overline", "line-through", "no-underline"],
                    "text-decoration-style": [{
                        decoration: (0, e._)(rg()).concat(["wavy"])
                    }],
                    "text-decoration-thickness": [{
                        decoration: [q, "from-font", "auto", rl, re]
                    }],
                    "text-decoration-color": [{
                        decoration: L()
                    }],
                    "underline-offset": [{
                        "underline-offset": [q, "auto", rl, rr]
                    }],
                    "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
                    "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
                    "text-wrap": [{
                        text: ["wrap", "nowrap", "balance", "pretty"]
                    }],
                    indent: [{
                        indent: G()
                    }],
                    "tab-size": [{
                        tab: [E, rl, rr]
                    }],
                    "vertical-align": [{
                        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", rl, rr]
                    }],
                    whitespace: [{
                        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
                    }],
                    break: [{
                        break: ["normal", "words", "all", "keep"]
                    }],
                    wrap: [{
                        wrap: ["break-word", "anywhere", "normal"]
                    }],
                    hyphens: [{
                        hyphens: ["none", "manual", "auto"]
                    }],
                    content: [{
                        content: ["none", rl, rr]
                    }],
                    "bg-attachment": [{
                        bg: ["fixed", "local", "scroll"]
                    }],
                    "bg-clip": [{
                        "bg-clip": ["border", "padding", "content", "text"]
                    }],
                    "bg-origin": [{
                        "bg-origin": ["border", "padding", "content"]
                    }],
                    "bg-position": [{
                        bg: $()
                    }],
                    "bg-repeat": [{
                        bg: B()
                    }],
                    "bg-size": [{
                        bg: R()
                    }],
                    "bg-image": [{
                        bg: ["none", {
                            linear: [{
                                to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                            }, E, rl, rr],
                            radial: ["", rl, rr],
                            conic: ["", E, rl, rr]
                        }, rf, rs]
                    }],
                    "bg-color": [{
                        bg: L()
                    }],
                    "gradient-from-pos": [{
                        from: Y()
                    }],
                    "gradient-via-pos": [{
                        via: Y()
                    }],
                    "gradient-to-pos": [{
                        to: Y()
                    }],
                    "gradient-from": [{
                        from: L()
                    }],
                    "gradient-via": [{
                        via: L()
                    }],
                    "gradient-to": [{
                        to: L()
                    }],
                    rounded: [{
                        rounded: H()
                    }],
                    "rounded-s": [{
                        "rounded-s": H()
                    }],
                    "rounded-e": [{
                        "rounded-e": H()
                    }],
                    "rounded-t": [{
                        "rounded-t": H()
                    }],
                    "rounded-r": [{
                        "rounded-r": H()
                    }],
                    "rounded-b": [{
                        "rounded-b": H()
                    }],
                    "rounded-l": [{
                        "rounded-l": H()
                    }],
                    "rounded-ss": [{
                        "rounded-ss": H()
                    }],
                    "rounded-se": [{
                        "rounded-se": H()
                    }],
                    "rounded-ee": [{
                        "rounded-ee": H()
                    }],
                    "rounded-es": [{
                        "rounded-es": H()
                    }],
                    "rounded-tl": [{
                        "rounded-tl": H()
                    }],
                    "rounded-tr": [{
                        "rounded-tr": H()
                    }],
                    "rounded-br": [{
                        "rounded-br": H()
                    }],
                    "rounded-bl": [{
                        "rounded-bl": H()
                    }],
                    "border-w": [{
                        border: Z()
                    }],
                    "border-w-x": [{
                        "border-x": Z()
                    }],
                    "border-w-y": [{
                        "border-y": Z()
                    }],
                    "border-w-s": [{
                        "border-s": Z()
                    }],
                    "border-w-e": [{
                        "border-e": Z()
                    }],
                    "border-w-bs": [{
                        "border-bs": Z()
                    }],
                    "border-w-be": [{
                        "border-be": Z()
                    }],
                    "border-w-t": [{
                        "border-t": Z()
                    }],
                    "border-w-r": [{
                        "border-r": Z()
                    }],
                    "border-w-b": [{
                        "border-b": Z()
                    }],
                    "border-w-l": [{
                        "border-l": Z()
                    }],
                    "divide-x": [{
                        "divide-x": Z()
                    }],
                    "divide-x-reverse": ["divide-x-reverse"],
                    "divide-y": [{
                        "divide-y": Z()
                    }],
                    "divide-y-reverse": ["divide-y-reverse"],
                    "border-style": [{
                        border: (0, e._)(rg()).concat(["hidden", "none"])
                    }],
                    "divide-style": [{
                        divide: (0, e._)(rg()).concat(["hidden", "none"])
                    }],
                    "border-color": [{
                        border: L()
                    }],
                    "border-color-x": [{
                        "border-x": L()
                    }],
                    "border-color-y": [{
                        "border-y": L()
                    }],
                    "border-color-s": [{
                        "border-s": L()
                    }],
                    "border-color-e": [{
                        "border-e": L()
                    }],
                    "border-color-bs": [{
                        "border-bs": L()
                    }],
                    "border-color-be": [{
                        "border-be": L()
                    }],
                    "border-color-t": [{
                        "border-t": L()
                    }],
                    "border-color-r": [{
                        "border-r": L()
                    }],
                    "border-color-b": [{
                        "border-b": L()
                    }],
                    "border-color-l": [{
                        "border-l": L()
                    }],
                    "divide-color": [{
                        divide: L()
                    }],
                    "outline-style": [{
                        outline: (0, e._)(rg()).concat(["none", "hidden"])
                    }],
                    "outline-offset": [{
                        "outline-offset": [q, rl, rr]
                    }],
                    "outline-w": [{
                        outline: ["", q, rc, re]
                    }],
                    "outline-color": [{
                        outline: L()
                    }],
                    shadow: [{
                        shadow: ["", "inner", "none", u, rp, ri]
                    }],
                    "shadow-color": [{
                        shadow: L()
                    }],
                    "inset-shadow": [{
                        "inset-shadow": ["none", m, rp, ri]
                    }],
                    "inset-shadow-color": [{
                        "inset-shadow": L()
                    }],
                    "ring-w": [{
                        ring: Z()
                    }],
                    "ring-w-inset": ["ring-inset"],
                    "ring-color": [{
                        ring: L()
                    }],
                    "ring-offset-w": [{
                        "ring-offset": [q, re]
                    }],
                    "ring-offset-color": [{
                        "ring-offset": L()
                    }],
                    "inset-ring-w": [{
                        "inset-ring": Z()
                    }],
                    "inset-ring-color": [{
                        "inset-ring": L()
                    }],
                    "text-shadow": [{
                        "text-shadow": ["none", f, rp, ri]
                    }],
                    "text-shadow-color": [{
                        "text-shadow": L()
                    }],
                    opacity: [{
                        opacity: [q, rl, rr]
                    }],
                    "mix-blend": [{
                        "mix-blend": (0, e._)(rh()).concat(["plus-darker", "plus-lighter"])
                    }],
                    "bg-blend": [{
                        "bg-blend": rh()
                    }],
                    "mask-clip": [{
                        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
                    }, "mask-no-clip"],
                    "mask-composite": [{
                        mask: ["add", "subtract", "intersect", "exclude"]
                    }],
                    "mask-image-linear-pos": [{
                        "mask-linear": [q]
                    }],
                    "mask-image-linear-from-pos": [{
                        "mask-linear-from": rv()
                    }],
                    "mask-image-linear-to-pos": [{
                        "mask-linear-to": rv()
                    }],
                    "mask-image-linear-from-color": [{
                        "mask-linear-from": L()
                    }],
                    "mask-image-linear-to-color": [{
                        "mask-linear-to": L()
                    }],
                    "mask-image-t-from-pos": [{
                        "mask-t-from": rv()
                    }],
                    "mask-image-t-to-pos": [{
                        "mask-t-to": rv()
                    }],
                    "mask-image-t-from-color": [{
                        "mask-t-from": L()
                    }],
                    "mask-image-t-to-color": [{
                        "mask-t-to": L()
                    }],
                    "mask-image-r-from-pos": [{
                        "mask-r-from": rv()
                    }],
                    "mask-image-r-to-pos": [{
                        "mask-r-to": rv()
                    }],
                    "mask-image-r-from-color": [{
                        "mask-r-from": L()
                    }],
                    "mask-image-r-to-color": [{
                        "mask-r-to": L()
                    }],
                    "mask-image-b-from-pos": [{
                        "mask-b-from": rv()
                    }],
                    "mask-image-b-to-pos": [{
                        "mask-b-to": rv()
                    }],
                    "mask-image-b-from-color": [{
                        "mask-b-from": L()
                    }],
                    "mask-image-b-to-color": [{
                        "mask-b-to": L()
                    }],
                    "mask-image-l-from-pos": [{
                        "mask-l-from": rv()
                    }],
                    "mask-image-l-to-pos": [{
                        "mask-l-to": rv()
                    }],
                    "mask-image-l-from-color": [{
                        "mask-l-from": L()
                    }],
                    "mask-image-l-to-color": [{
                        "mask-l-to": L()
                    }],
                    "mask-image-x-from-pos": [{
                        "mask-x-from": rv()
                    }],
                    "mask-image-x-to-pos": [{
                        "mask-x-to": rv()
                    }],
                    "mask-image-x-from-color": [{
                        "mask-x-from": L()
                    }],
                    "mask-image-x-to-color": [{
                        "mask-x-to": L()
                    }],
                    "mask-image-y-from-pos": [{
                        "mask-y-from": rv()
                    }],
                    "mask-image-y-to-pos": [{
                        "mask-y-to": rv()
                    }],
                    "mask-image-y-from-color": [{
                        "mask-y-from": L()
                    }],
                    "mask-image-y-to-color": [{
                        "mask-y-to": L()
                    }],
                    "mask-image-radial": [{
                        "mask-radial": [rl, rr]
                    }],
                    "mask-image-radial-from-pos": [{
                        "mask-radial-from": rv()
                    }],
                    "mask-image-radial-to-pos": [{
                        "mask-radial-to": rv()
                    }],
                    "mask-image-radial-from-color": [{
                        "mask-radial-from": L()
                    }],
                    "mask-image-radial-to-color": [{
                        "mask-radial-to": L()
                    }],
                    "mask-image-radial-shape": [{
                        "mask-radial": ["circle", "ellipse"]
                    }],
                    "mask-image-radial-size": [{
                        "mask-radial": [{
                            closest: ["side", "corner"],
                            farthest: ["side", "corner"]
                        }]
                    }],
                    "mask-image-radial-pos": [{
                        "mask-radial-at": w()
                    }],
                    "mask-image-conic-pos": [{
                        "mask-conic": [q]
                    }],
                    "mask-image-conic-from-pos": [{
                        "mask-conic-from": rv()
                    }],
                    "mask-image-conic-to-pos": [{
                        "mask-conic-to": rv()
                    }],
                    "mask-image-conic-from-color": [{
                        "mask-conic-from": L()
                    }],
                    "mask-image-conic-to-color": [{
                        "mask-conic-to": L()
                    }],
                    "mask-mode": [{
                        mask: ["alpha", "luminance", "match"]
                    }],
                    "mask-origin": [{
                        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
                    }],
                    "mask-position": [{
                        mask: $()
                    }],
                    "mask-repeat": [{
                        mask: B()
                    }],
                    "mask-size": [{
                        mask: R()
                    }],
                    "mask-type": [{
                        "mask-type": ["alpha", "luminance"]
                    }],
                    "mask-image": [{
                        mask: ["none", rl, rr]
                    }],
                    filter: [{
                        filter: ["", "none", rl, rr]
                    }],
                    blur: [{
                        blur: rx()
                    }],
                    brightness: [{
                        brightness: [q, rl, rr]
                    }],
                    contrast: [{
                        contrast: [q, rl, rr]
                    }],
                    "drop-shadow": [{
                        "drop-shadow": ["", "none", p, rp, ri]
                    }],
                    "drop-shadow-color": [{
                        "drop-shadow": L()
                    }],
                    grayscale: [{
                        grayscale: ["", q, rl, rr]
                    }],
                    "hue-rotate": [{
                        "hue-rotate": [q, rl, rr]
                    }],
                    invert: [{
                        invert: ["", q, rl, rr]
                    }],
                    saturate: [{
                        saturate: [q, rl, rr]
                    }],
                    sepia: [{
                        sepia: ["", q, rl, rr]
                    }],
                    "backdrop-filter": [{
                        "backdrop-filter": ["", "none", rl, rr]
                    }],
                    "backdrop-blur": [{
                        "backdrop-blur": rx()
                    }],
                    "backdrop-brightness": [{
                        "backdrop-brightness": [q, rl, rr]
                    }],
                    "backdrop-contrast": [{
                        "backdrop-contrast": [q, rl, rr]
                    }],
                    "backdrop-grayscale": [{
                        "backdrop-grayscale": ["", q, rl, rr]
                    }],
                    "backdrop-hue-rotate": [{
                        "backdrop-hue-rotate": [q, rl, rr]
                    }],
                    "backdrop-invert": [{
                        "backdrop-invert": ["", q, rl, rr]
                    }],
                    "backdrop-opacity": [{
                        "backdrop-opacity": [q, rl, rr]
                    }],
                    "backdrop-saturate": [{
                        "backdrop-saturate": [q, rl, rr]
                    }],
                    "backdrop-sepia": [{
                        "backdrop-sepia": ["", q, rl, rr]
                    }],
                    "border-collapse": [{
                        border: ["collapse", "separate"]
                    }],
                    "border-spacing": [{
                        "border-spacing": G()
                    }],
                    "border-spacing-x": [{
                        "border-spacing-x": G()
                    }],
                    "border-spacing-y": [{
                        "border-spacing-y": G()
                    }],
                    "table-layout": [{
                        table: ["auto", "fixed"]
                    }],
                    caption: [{
                        caption: ["top", "bottom"]
                    }],
                    transition: [{
                        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", rl, rr]
                    }],
                    "transition-behavior": [{
                        transition: ["normal", "discrete"]
                    }],
                    duration: [{
                        duration: [q, "initial", rl, rr]
                    }],
                    ease: [{
                        ease: ["linear", "initial", v, rl, rr]
                    }],
                    delay: [{
                        delay: [q, rl, rr]
                    }],
                    animate: [{
                        animate: ["none", x, rl, rr]
                    }],
                    backface: [{
                        backface: ["hidden", "visible"]
                    }],
                    perspective: [{
                        perspective: [g, rl, rr]
                    }],
                    "perspective-origin": [{
                        "perspective-origin": y()
                    }],
                    rotate: [{
                        rotate: rk()
                    }],
                    "rotate-x": [{
                        "rotate-x": rk()
                    }],
                    "rotate-y": [{
                        "rotate-y": rk()
                    }],
                    "rotate-z": [{
                        "rotate-z": rk()
                    }],
                    scale: [{
                        scale: rw()
                    }],
                    "scale-x": [{
                        "scale-x": rw()
                    }],
                    "scale-y": [{
                        "scale-y": rw()
                    }],
                    "scale-z": [{
                        "scale-z": rw()
                    }],
                    "scale-3d": ["scale-3d"],
                    skew: [{
                        skew: ry()
                    }],
                    "skew-x": [{
                        "skew-x": ry()
                    }],
                    "skew-y": [{
                        "skew-y": ry()
                    }],
                    transform: [{
                        transform: [rl, rr, "", "none", "gpu", "cpu"]
                    }],
                    "transform-origin": [{
                        origin: y()
                    }],
                    "transform-style": [{
                        transform: ["3d", "flat"]
                    }],
                    translate: [{
                        translate: rz()
                    }],
                    "translate-x": [{
                        "translate-x": rz()
                    }],
                    "translate-y": [{
                        "translate-y": rz()
                    }],
                    "translate-z": [{
                        "translate-z": rz()
                    }],
                    "translate-none": ["translate-none"],
                    zoom: [{
                        zoom: [E, rl, rr]
                    }],
                    accent: [{
                        accent: L()
                    }],
                    appearance: [{
                        appearance: ["none", "auto"]
                    }],
                    "caret-color": [{
                        caret: L()
                    }],
                    "color-scheme": [{
                        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
                    }],
                    cursor: [{
                        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", rl, rr]
                    }],
                    "field-sizing": [{
                        "field-sizing": ["fixed", "content"]
                    }],
                    "pointer-events": [{
                        "pointer-events": ["auto", "none"]
                    }],
                    resize: [{
                        resize: ["none", "", "y", "x"]
                    }],
                    "scroll-behavior": [{
                        scroll: ["auto", "smooth"]
                    }],
                    "scrollbar-thumb-color": [{
                        "scrollbar-thumb": L()
                    }],
                    "scrollbar-track-color": [{
                        "scrollbar-track": L()
                    }],
                    "scrollbar-gutter": [{
                        "scrollbar-gutter": ["auto", "stable", "both"]
                    }],
                    "scrollbar-w": [{
                        scrollbar: ["auto", "thin", "none"]
                    }],
                    "scroll-m": [{
                        "scroll-m": G()
                    }],
                    "scroll-mx": [{
                        "scroll-mx": G()
                    }],
                    "scroll-my": [{
                        "scroll-my": G()
                    }],
                    "scroll-ms": [{
                        "scroll-ms": G()
                    }],
                    "scroll-me": [{
                        "scroll-me": G()
                    }],
                    "scroll-mbs": [{
                        "scroll-mbs": G()
                    }],
                    "scroll-mbe": [{
                        "scroll-mbe": G()
                    }],
                    "scroll-mt": [{
                        "scroll-mt": G()
                    }],
                    "scroll-mr": [{
                        "scroll-mr": G()
                    }],
                    "scroll-mb": [{
                        "scroll-mb": G()
                    }],
                    "scroll-ml": [{
                        "scroll-ml": G()
                    }],
                    "scroll-p": [{
                        "scroll-p": G()
                    }],
                    "scroll-px": [{
                        "scroll-px": G()
                    }],
                    "scroll-py": [{
                        "scroll-py": G()
                    }],
                    "scroll-ps": [{
                        "scroll-ps": G()
                    }],
                    "scroll-pe": [{
                        "scroll-pe": G()
                    }],
                    "scroll-pbs": [{
                        "scroll-pbs": G()
                    }],
                    "scroll-pbe": [{
                        "scroll-pbe": G()
                    }],
                    "scroll-pt": [{
                        "scroll-pt": G()
                    }],
                    "scroll-pr": [{
                        "scroll-pr": G()
                    }],
                    "scroll-pb": [{
                        "scroll-pb": G()
                    }],
                    "scroll-pl": [{
                        "scroll-pl": G()
                    }],
                    "snap-align": [{
                        snap: ["start", "end", "center", "align-none"]
                    }],
                    "snap-stop": [{
                        snap: ["normal", "always"]
                    }],
                    "snap-type": [{
                        snap: ["none", "x", "y", "both"]
                    }],
                    "snap-strictness": [{
                        snap: ["mandatory", "proximity"]
                    }],
                    touch: [{
                        touch: ["auto", "none", "manipulation"]
                    }],
                    "touch-x": [{
                        "touch-pan": ["x", "left", "right"]
                    }],
                    "touch-y": [{
                        "touch-pan": ["y", "up", "down"]
                    }],
                    "touch-pz": ["touch-pinch-zoom"],
                    select: [{
                        select: ["none", "text", "all", "auto"]
                    }],
                    "will-change": [{
                        "will-change": ["auto", "scroll", "contents", "transform", rl, rr]
                    }],
                    fill: [{
                        fill: ["none"].concat((0, e._)(L()))
                    }],
                    "stroke-w": [{
                        stroke: [q, rc, re, ro]
                    }],
                    stroke: [{
                        stroke: ["none"].concat((0, e._)(L()))
                    }],
                    "forced-color-adjust": [{
                        "forced-color-adjust": ["auto", "none"]
                    }]
                },
                conflictingClassGroups: {
                    "container-named": ["container-type"],
                    overflow: ["overflow-x", "overflow-y"],
                    overscroll: ["overscroll-x", "overscroll-y"],
                    inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
                    "inset-x": ["start", "end", "right", "left"],
                    "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
                    flex: ["basis", "grow", "shrink"],
                    gap: ["gap-x", "gap-y"],
                    p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
                    px: ["ps", "pe", "pr", "pl"],
                    py: ["pbs", "pbe", "pt", "pb"],
                    m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
                    mx: ["ms", "me", "mr", "ml"],
                    my: ["mbs", "mbe", "mt", "mb"],
                    size: ["w", "h"],
                    "font-size": ["leading"],
                    "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
                    "fvn-ordinal": ["fvn-normal"],
                    "fvn-slashed-zero": ["fvn-normal"],
                    "fvn-figure": ["fvn-normal"],
                    "fvn-spacing": ["fvn-normal"],
                    "fvn-fraction": ["fvn-normal"],
                    "line-clamp": ["display", "overflow"],
                    rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
                    "rounded-s": ["rounded-ss", "rounded-es"],
                    "rounded-e": ["rounded-se", "rounded-ee"],
                    "rounded-t": ["rounded-tl", "rounded-tr"],
                    "rounded-r": ["rounded-tr", "rounded-br"],
                    "rounded-b": ["rounded-br", "rounded-bl"],
                    "rounded-l": ["rounded-tl", "rounded-bl"],
                    "border-spacing": ["border-spacing-x", "border-spacing-y"],
                    "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
                    "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
                    "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
                    "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
                    "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
                    "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
                    translate: ["translate-x", "translate-y", "translate-none"],
                    "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
                    "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
                    "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
                    "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
                    "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
                    "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
                    "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
                    touch: ["touch-x", "touch-y", "touch-pz"],
                    "touch-x": ["touch"],
                    "touch-y": ["touch"],
                    "touch-pz": ["touch"]
                },
                conflictingClassGroupModifiers: {
                    "font-size": ["leading"]
                },
                postfixLookupClassGroups: ["container-type"],
                orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
            }
        },
        rS = function(r, e) {
            var o = e.cacheSize,
                t = e.prefix,
                n = e.experimentalParseClassName,
                a = e.extend,
                s = void 0 === a ? {} : a,
                i = e.override,
                l = void 0 === i ? {} : i;
            return rM(r, "cacheSize", o), rM(r, "prefix", t), rM(r, "experimentalParseClassName", n), rj(r.theme, l.theme), rj(r.classGroups, l.classGroups), rj(r.conflictingClassGroups, l.conflictingClassGroups), rj(r.conflictingClassGroupModifiers, l.conflictingClassGroupModifiers), rM(r, "postfixLookupClassGroups", l.postfixLookupClassGroups), rM(r, "orderSensitiveModifiers", l.orderSensitiveModifiers), rI(r.theme, s.theme), rI(r.classGroups, s.classGroups), rI(r.conflictingClassGroups, s.conflictingClassGroups), rI(r.conflictingClassGroupModifiers, s.conflictingClassGroupModifiers), rN(r, s, "postfixLookupClassGroups"), rN(r, s, "orderSensitiveModifiers"), r
        },
        rM = function(r, e, o) {
            void 0 !== o && (r[e] = o)
        },
        rj = function(r, e) {
            if (e)
                for (var o in e) rM(r, o, e[o])
        },
        rI = function(r, e) {
            if (e)
                for (var o in e) rN(r, e, o)
        },
        rN = function(r, e, o) {
            var t = e[o];
            void 0 !== t && (r[o] = r[o] ? r[o].concat(t) : t)
        },
        rD = function(r) {
            for (var o = arguments.length, t = Array(o > 1 ? o - 1 : 0), n = 1; n < o; n++) t[n - 1] = arguments[n];
            return "function" == typeof r ? I.apply(void 0, [rC, r].concat((0, e._)(t))) : I.apply(void 0, [function() {
                return rS(rC(), r)
            }].concat((0, e._)(t)))
        }({
            extend: {
                theme: {
                    spacing: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "10", "12", "15", "16", "20", "24"],
                    font: ["display", "legacy"]
                }
            }
        }),
        rO = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function rP(r) {
        var e = "string" == typeof r ? new Date(r) : r,
            o = e.getDate().toString().padStart(2, "0"),
            t = rO[e.getMonth()],
            n = e.getFullYear(),
            a = e.getHours().toString().padStart(2, "0"),
            s = e.getMinutes().toString().padStart(2, "0");
        return "".concat(o, "/").concat(t, "/").concat(n, " ").concat(a, ":").concat(s)
    }
    r.s(["cn", 0, function() {
        for (var r = arguments.length, e = Array(r), t = 0; t < r; t++) e[t] = arguments[t];
        return rD((0, o.clsx)(e))
    }, "dateStringToUnix", 0, function(r) {
        return r ? Math.floor(new Date(r + "T00:00:00Z").getTime() / 1e3) : 0
    }, "formatDate", 0, function(r) {
        var e = "string" == typeof r ? new Date(r) : r,
            o = e.getDate().toString().padStart(2, "0"),
            t = rO[e.getMonth()],
            n = e.getFullYear();
        return "".concat(o, "/").concat(t, "/").concat(n)
    }, "formatDateForInput", 0, function(r) {
        return r ? ("string" == typeof r ? new Date(r) : r).toISOString().slice(0, 16) : ""
    }, "formatDateLocale", 0, function(r) {
        return rP(r)
    }, "formatDateTime", 0, rP, "groupBy", 0, function(r, e) {
        var o = {},
            t = !0,
            n = !1,
            a = void 0;
        try {
            for (var s, i = r[Symbol.iterator](); !(t = (s = i.next()).done); t = !0) {
                var l = s.value,
                    c = e(l);
                o[c] || (o[c] = []), o[c].push(l)
            }
        } catch (r) {
            n = !0, a = r
        } finally {
            try {
                t || null == i.return || i.return()
            } finally {
                if (n) throw a
            }
        }
        return o
    }, "orderBy", 0, function(r, o) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "asc";
        return (0, e._)(r).sort(function(r, e) {
            var n = r[o],
                a = e[o];
            return n < a ? "asc" === t ? -1 : 1 : n > a ? "asc" === t ? 1 : -1 : 0
        })
    }, "uniqBy", 0, function(r, e) {
        var o = new Set;
        return r.filter(function(r) {
            var t = "function" == typeof e ? e(r) : r[e];
            return !o.has(t) && (o.add(t), !0)
        })
    }, "unixToDateString", 0, function(r) {
        return r && 0 !== r ? new Date(1e3 * r).toISOString().split("T")[0] : ""
    }], 975157)
}]);