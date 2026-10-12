(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 291310, t => {
    "use strict";
    t.i(247167);
    var n = t.i(754452),
        a = t.i(61106),
        e = t.i(317608),
        r = t.i(855111),
        i = t.i(524906);

    function o(t, n) {
        var a = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var e = Object.getOwnPropertySymbols(t);
            n && (e = e.filter(function(n) {
                return Object.getOwnPropertyDescriptor(t, n).enumerable
            })), a.push.apply(a, e)
        }
        return a
    }

    function s(t) {
        for (var n = 1; n < arguments.length; n++) {
            var a = null != arguments[n] ? arguments[n] : {};
            n % 2 ? o(Object(a), !0).forEach(function(n) {
                var e, r;
                e = n, r = a[n], (e = function(t) {
                    var n = function(t, n) {
                        if ("object" != (void 0 === t ? "undefined" : (0, i._)(t)) || !t) return t;
                        var a = t[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var e = a.call(t, n || "default");
                            if ("object" != (void 0 === e ? "undefined" : (0, i._)(e))) return e;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === n ? String : Number)(t)
                    }(t, "string");
                    return "symbol" == (void 0 === n ? "undefined" : (0, i._)(n)) ? n : n + ""
                }(e)) in t ? Object.defineProperty(t, e, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = r
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : o(Object(a)).forEach(function(n) {
                Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(a, n))
            })
        }
        return t
    }
    var f = function() {},
        l = {},
        c = {},
        u = null,
        d = {
            mark: f,
            measure: f
        };
    try {
        "u" > typeof window && (l = window), "u" > typeof document && (c = document), "u" > typeof MutationObserver && (u = MutationObserver), "u" > typeof performance && (d = performance)
    } catch (t) {}
    var m = (l.navigator || {}).userAgent,
        p = void 0 === m ? "" : m,
        h = l,
        v = c,
        g = u,
        b = d;
    h.document;
    var y = !!v.documentElement && !!v.head && "function" == typeof v.addEventListener && "function" == typeof v.createElement,
        x = ~p.indexOf("MSIE") || ~p.indexOf("Trident/"),
        k = {
            classic: {
                fa: "solid",
                fas: "solid",
                "fa-solid": "solid",
                far: "regular",
                "fa-regular": "regular",
                fal: "light",
                "fa-light": "light",
                fat: "thin",
                "fa-thin": "thin",
                fab: "brands",
                "fa-brands": "brands"
            },
            duotone: {
                fa: "solid",
                fad: "solid",
                "fa-solid": "solid",
                "fa-duotone": "solid",
                fadr: "regular",
                "fa-regular": "regular",
                fadl: "light",
                "fa-light": "light",
                fadt: "thin",
                "fa-thin": "thin"
            },
            sharp: {
                fa: "solid",
                fass: "solid",
                "fa-solid": "solid",
                fasr: "regular",
                "fa-regular": "regular",
                fasl: "light",
                "fa-light": "light",
                fast: "thin",
                "fa-thin": "thin"
            },
            "sharp-duotone": {
                fa: "solid",
                fasds: "solid",
                "fa-solid": "solid",
                fasdr: "regular",
                "fa-regular": "regular",
                fasdl: "light",
                "fa-light": "light",
                fasdt: "thin",
                "fa-thin": "thin"
            }
        },
        w = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"],
        A = "classic",
        N = "duotone",
        S = [A, N, "sharp", "sharp-duotone"],
        P = new Map([
            ["classic", {
                defaultShortPrefixId: "fas",
                defaultStyleId: "solid",
                styleIds: ["solid", "regular", "light", "thin", "brands"],
                futureStyleIds: [],
                defaultFontWeight: 900
            }],
            ["sharp", {
                defaultShortPrefixId: "fass",
                defaultStyleId: "solid",
                styleIds: ["solid", "regular", "light", "thin"],
                futureStyleIds: [],
                defaultFontWeight: 900
            }],
            ["duotone", {
                defaultShortPrefixId: "fad",
                defaultStyleId: "solid",
                styleIds: ["solid", "regular", "light", "thin"],
                futureStyleIds: [],
                defaultFontWeight: 900
            }],
            ["sharp-duotone", {
                defaultShortPrefixId: "fasds",
                defaultStyleId: "solid",
                styleIds: ["solid", "regular", "light", "thin"],
                futureStyleIds: [],
                defaultFontWeight: 900
            }]
        ]),
        O = ["fak", "fa-kit", "fakd", "fa-kit-duotone"],
        C = ["fak", "fakd"],
        E = ["fak", "fa-kit", "fakd", "fa-kit-duotone"],
        z = {
            classic: {
                fab: "fa-brands",
                fad: "fa-duotone",
                fal: "fa-light",
                far: "fa-regular",
                fas: "fa-solid",
                fat: "fa-thin"
            },
            duotone: {
                fadr: "fa-regular",
                fadl: "fa-light",
                fadt: "fa-thin"
            },
            sharp: {
                fass: "fa-solid",
                fasr: "fa-regular",
                fasl: "fa-light",
                fast: "fa-thin"
            },
            "sharp-duotone": {
                fasds: "fa-solid",
                fasdr: "fa-regular",
                fasdl: "fa-light",
                fasdt: "fa-thin"
            }
        },
        j = ["fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt"].concat((0, r._)(["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"]), (0, r._)(["fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands"])),
        F = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        I = F.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
        M = (0, r._)(["classic", "duotone", "sharp", "sharp-duotone"]).concat((0, r._)(["solid", "regular", "light", "thin", "duotone", "brands"]), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", "duotone-group", "swap-opacity", "primary", "secondary"]).concat(F.map(function(t) {
            return "".concat(t, "x")
        })).concat(I.map(function(t) {
            return "w-".concat(t)
        })),
        _ = "___FONT_AWESOME___",
        L = "svg-inline--fa",
        D = "data-fa-i2svg",
        R = "data-fa-pseudo-element",
        T = "data-prefix",
        W = "data-icon",
        Y = "fontawesome-i2svg",
        H = ["HTML", "HEAD", "STYLE", "SCRIPT"],
        B = function() {
            try {
                return !0
            } catch (t) {
                return !1
            }
        }();

    function q(t) {
        return new Proxy(t, {
            get: function(t, n) {
                return n in t ? t[n] : t[A]
            }
        })
    }
    var U = s({}, k);
    U[A] = s(s(s(s({}, {
        "fa-duotone": "duotone"
    }), k[A]), {
        fak: "kit",
        "fa-kit": "kit"
    }), {
        fakd: "kit-duotone",
        "fa-kit-duotone": "kit-duotone"
    });
    var V = q(U),
        X = s({}, {
            classic: {
                solid: "fas",
                regular: "far",
                light: "fal",
                thin: "fat",
                brands: "fab"
            },
            duotone: {
                solid: "fad",
                regular: "fadr",
                light: "fadl",
                thin: "fadt"
            },
            sharp: {
                solid: "fass",
                regular: "fasr",
                light: "fasl",
                thin: "fast"
            },
            "sharp-duotone": {
                solid: "fasds",
                regular: "fasdr",
                light: "fasdl",
                thin: "fasdt"
            }
        });
    X[A] = s(s(s(s({}, {
        duotone: "fad"
    }), X[A]), {
        kit: "fak"
    }), {
        "kit-duotone": "fakd"
    });
    var K = q(X),
        $ = s({}, z);
    $[A] = s(s({}, $[A]), {
        fak: "fa-kit"
    });
    var G = q($),
        J = s({}, {
            classic: {
                "fa-brands": "fab",
                "fa-duotone": "fad",
                "fa-light": "fal",
                "fa-regular": "far",
                "fa-solid": "fas",
                "fa-thin": "fat"
            },
            duotone: {
                "fa-regular": "fadr",
                "fa-light": "fadl",
                "fa-thin": "fadt"
            },
            sharp: {
                "fa-solid": "fass",
                "fa-regular": "fasr",
                "fa-light": "fasl",
                "fa-thin": "fast"
            },
            "sharp-duotone": {
                "fa-solid": "fasds",
                "fa-regular": "fasdr",
                "fa-light": "fasdl",
                "fa-thin": "fasdt"
            }
        });
    J[A] = s(s({}, J[A]), {
        "fa-kit": "fak"
    }), q(J);
    var Q = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,
        Z = "fa-layers-text",
        tt = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;
    q(s({}, {
        classic: {
            900: "fas",
            400: "far",
            normal: "far",
            300: "fal",
            100: "fat"
        },
        duotone: {
            900: "fad",
            400: "fadr",
            300: "fadl",
            100: "fadt"
        },
        sharp: {
            900: "fass",
            400: "fasr",
            300: "fasl",
            100: "fast"
        },
        "sharp-duotone": {
            900: "fasds",
            400: "fasdr",
            300: "fasdl",
            100: "fasdt"
        }
    }));
    var tn = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"],
        ta = (0, r._)(["kit"]).concat((0, r._)(M)),
        te = h.FontAwesomeConfig || {};
    v && "function" == typeof v.querySelector && [
        ["data-family-prefix", "familyPrefix"],
        ["data-css-prefix", "cssPrefix"],
        ["data-family-default", "familyDefault"],
        ["data-style-default", "styleDefault"],
        ["data-replacement-class", "replacementClass"],
        ["data-auto-replace-svg", "autoReplaceSvg"],
        ["data-auto-add-css", "autoAddCss"],
        ["data-auto-a11y", "autoA11y"],
        ["data-search-pseudo-elements", "searchPseudoElements"],
        ["data-observe-mutations", "observeMutations"],
        ["data-mutate-approach", "mutateApproach"],
        ["data-keep-original-source", "keepOriginalSource"],
        ["data-measure-performance", "measurePerformance"],
        ["data-show-missing-icons", "showMissingIcons"]
    ].forEach(function(t) {
        var n, a = (0, e._)(t, 2),
            r = a[0],
            i = a[1],
            o = "" === (n = function(t) {
                var n = v.querySelector("script[" + t + "]");
                if (n) return n.getAttribute(t)
            }(r)) || "false" !== n && ("true" === n || n);
        null != o && (te[i] = o)
    });
    var tr = {
        styleDefault: "solid",
        familyDefault: A,
        cssPrefix: "fa",
        replacementClass: L,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        mutateApproach: "async",
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0
    };
    te.familyPrefix && (te.cssPrefix = te.familyPrefix);
    var ti = s(s({}, tr), te);
    ti.autoReplaceSvg || (ti.observeMutations = !1);
    var to = {};
    Object.keys(tr).forEach(function(t) {
        Object.defineProperty(to, t, {
            enumerable: !0,
            set: function(n) {
                ti[t] = n, ts.forEach(function(t) {
                    return t(to)
                })
            },
            get: function() {
                return ti[t]
            }
        })
    }), Object.defineProperty(to, "familyPrefix", {
        enumerable: !0,
        set: function(t) {
            ti.cssPrefix = t, ts.forEach(function(t) {
                return t(to)
            })
        },
        get: function() {
            return ti.cssPrefix
        }
    }), h.FontAwesomeConfig = to;
    var ts = [],
        tf = {
            size: 16,
            x: 0,
            y: 0,
            rotate: 0,
            flipX: !1,
            flipY: !1
        };

    function tl() {
        for (var t = 12, n = ""; t-- > 0;) n += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" [62 * Math.random() | 0];
        return n
    }

    function tc(t) {
        for (var n = [], a = (t || []).length >>> 0; a--;) n[a] = t[a];
        return n
    }

    function tu(t) {
        return t.classList ? tc(t.classList) : (t.getAttribute("class") || "").split(" ").filter(function(t) {
            return t
        })
    }

    function td(t) {
        return "".concat(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function tm(t) {
        return Object.keys(t || {}).reduce(function(n, a) {
            return n + "".concat(a, ": ").concat(t[a].trim(), ";")
        }, "")
    }

    function tp(t) {
        return t.size !== tf.size || t.x !== tf.x || t.y !== tf.y || t.rotate !== tf.rotate || t.flipX || t.flipY
    }

    function th() {
        var t = to.cssPrefix,
            n = to.replacementClass,
            a = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}';
        if ("fa" !== t || n !== L) {
            var e = RegExp("\\.".concat("fa", "\\-"), "g"),
                r = RegExp("\\--".concat("fa", "\\-"), "g"),
                i = RegExp("\\.".concat(L), "g");
            a = a.replace(e, ".".concat(t, "-")).replace(r, "--".concat(t, "-")).replace(i, ".".concat(n))
        }
        return a
    }
    var tv = !1;

    function tg() {
        to.autoAddCss && !tv && (! function(t) {
            if (t && y) {
                var n = v.createElement("style");
                n.setAttribute("type", "text/css"), n.innerHTML = t;
                for (var a = v.head.childNodes, e = null, r = a.length - 1; r > -1; r--) {
                    var i = a[r];
                    ["STYLE", "LINK"].indexOf((i.tagName || "").toUpperCase()) > -1 && (e = i)
                }
                v.head.insertBefore(n, e)
            }
        }(th()), tv = !0)
    }
    var tb = h || {};
    tb[_] || (tb[_] = {}), tb[_].styles || (tb[_].styles = {}), tb[_].hooks || (tb[_].hooks = {}), tb[_].shims || (tb[_].shims = []);
    var ty = tb[_],
        tx = [],
        tk = function() {
            v.removeEventListener("DOMContentLoaded", tk), tw = 1, tx.map(function(t) {
                return t()
            })
        },
        tw = !1;

    function tA(t) {
        var n, a = t.tag,
            e = t.attributes,
            r = t.children;
        return "string" == typeof t ? td(t) : "<".concat(a, " ").concat(Object.keys((n = void 0 === e ? {} : e) || {}).reduce(function(t, a) {
            return t + "".concat(a, '="').concat(td(n[a]), '" ')
        }, "").trim(), ">").concat((void 0 === r ? [] : r).map(tA).join(""), "</").concat(a, ">")
    }

    function tN(t, n, a) {
        if (t && t[n] && t[n][a]) return {
            prefix: n,
            iconName: a,
            icon: t[n][a]
        }
    }
    y && ((tw = (v.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(v.readyState)) || v.addEventListener("DOMContentLoaded", tk));
    var tS = function(t, n, a, e) {
        var r, i, o, s = Object.keys(t),
            f = s.length,
            l = void 0 !== e ? function(t, a, r, i) {
                return n.call(e, t, a, r, i)
            } : n;
        for (void 0 === a ? (r = 1, o = t[s[0]]) : (r = 0, o = a); r < f; r++) o = l(o, t[i = s[r]], i, t);
        return o
    };

    function tP(t) {
        var n = function(t) {
            for (var n = [], a = 0, e = t.length; a < e;) {
                var r = t.charCodeAt(a++);
                if (r >= 55296 && r <= 56319 && a < e) {
                    var i = t.charCodeAt(a++);
                    (64512 & i) == 56320 ? n.push(((1023 & r) << 10) + (1023 & i) + 65536) : (n.push(r), a--)
                } else n.push(r)
            }
            return n
        }(t);
        return 1 === n.length ? n[0].toString(16) : null
    }

    function tO(t) {
        return Object.keys(t).reduce(function(n, a) {
            var e = t[a];
            return e.icon ? n[e.iconName] = e.icon : n[a] = e, n
        }, {})
    }

    function tC(t, n) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            e = a.skipHooks,
            r = tO(n);
        "function" != typeof ty.hooks.addPack || void 0 !== e && e ? ty.styles[t] = s(s({}, ty.styles[t] || {}), r) : ty.hooks.addPack(t, tO(n)), "fas" === t && tC("fa", n)
    }
    var tE = ty.styles,
        tz = ty.shims,
        tj = Object.keys(G),
        tF = tj.reduce(function(t, n) {
            return t[n] = Object.keys(G[n]), t
        }, {}),
        tI = null,
        tM = {},
        t_ = {},
        tL = {},
        tD = {},
        tR = {},
        tT = function() {
            var t = function(t) {
                return tS(tE, function(n, a, e) {
                    return n[e] = tS(a, t, {}), n
                }, {})
            };
            tM = t(function(t, n, a) {
                return n[3] && (t[n[3]] = a), n[2] && n[2].filter(function(t) {
                    return "number" == typeof t
                }).forEach(function(n) {
                    t[n.toString(16)] = a
                }), t
            }), t_ = t(function(t, n, a) {
                return t[a] = a, n[2] && n[2].filter(function(t) {
                    return "string" == typeof t
                }).forEach(function(n) {
                    t[n] = a
                }), t
            }), tR = t(function(t, n, a) {
                var e = n[2];
                return t[a] = a, e.forEach(function(n) {
                    t[n] = a
                }), t
            });
            var n = "far" in tE || to.autoFetchSvg,
                a = tS(tz, function(t, a) {
                    var e = a[0],
                        r = a[1],
                        i = a[2];
                    return "far" !== r || n || (r = "fas"), "string" == typeof e && (t.names[e] = {
                        prefix: r,
                        iconName: i
                    }), "number" == typeof e && (t.unicodes[e.toString(16)] = {
                        prefix: r,
                        iconName: i
                    }), t
                }, {
                    names: {},
                    unicodes: {}
                });
            tL = a.names, tD = a.unicodes, tI = tq(to.styleDefault, {
                family: to.familyDefault
            })
        };

    function tW(t, n) {
        return (tM[t] || {})[n]
    }

    function tY(t, n) {
        return (tR[t] || {})[n]
    }

    function tH(t) {
        return tL[t] || {
            prefix: null,
            iconName: null
        }
    }
    ts.push(function(t) {
        tI = tq(t.styleDefault, {
            family: to.familyDefault
        })
    }), tT();
    var tB = function() {
        return {
            prefix: null,
            iconName: null,
            rest: []
        }
    };

    function tq(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            a = n.family,
            e = void 0 === a ? A : a,
            r = V[e][t];
        if (e === N && !t) return "fad";
        var i = K[e][t] || K[e][r],
            o = t in ty.styles ? t : null;
        return i || o || null
    }

    function tU(t) {
        return t.sort().filter(function(t, n, a) {
            return a.indexOf(t) === n
        })
    }

    function tV(t) {
        var n, a, r, i, o, f, l, c, u, d, m, p, h, v, g, b, y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            x = y.skipLookups,
            k = null,
            O = j.concat(E),
            C = tU(t.filter(function(t) {
                return O.includes(t)
            })),
            z = tU(t.filter(function(t) {
                return !j.includes(t)
            })),
            F = C.filter(function(t) {
                return k = t, !w.includes(t)
            }),
            I = (0, e._)(F, 1)[0],
            M = (h = A, v = tj.reduce(function(t, n) {
                return t[n] = "".concat(to.cssPrefix, "-").concat(n), t
            }, {}), S.forEach(function(t) {
                (C.includes(v[t]) || C.some(function(n) {
                    return tF[t].includes(n)
                })) && (h = t)
            }), h),
            _ = s(s({}, (g = [], b = null, z.forEach(function(t) {
                var n, a, e, r, i = (n = to.cssPrefix, e = (a = t.split("-"))[0], r = a.slice(1).join("-"), e !== n || "" === r || ~ta.indexOf(r) ? null : r);
                i ? b = i : t && g.push(t)
            }), {
                iconName: b,
                rest: g
            })), {}, {
                prefix: tq(void 0 === I ? null : I, {
                    family: M
                })
            });
        return s(s(s({}, _), (a = (n = {
            values: t,
            family: M,
            styles: tE,
            config: to,
            canonical: _,
            givenPrefix: k
        }).values, r = n.family, i = n.canonical, o = n.givenPrefix, f = n.styles, c = void 0 === (l = n.config) ? {} : l, u = r === N, d = a.includes("fa-duotone") || a.includes("fad"), m = "duotone" === c.familyDefault, p = "fad" === i.prefix || "fa-duotone" === i.prefix, !u && (d || m || p) && (i.prefix = "fad"), (a.includes("fa-brands") || a.includes("fab")) && (i.prefix = "fab"), !i.prefix && tX.includes(r) && (Object.keys(void 0 === f ? {} : f).find(function(t) {
            return tK.includes(t)
        }) || c.autoFetchSvg) && (i.prefix = P.get(r).defaultShortPrefixId, i.iconName = tY(i.prefix, i.iconName) || i.iconName), ("fa" === i.prefix || "fa" === (void 0 === o ? "" : o)) && (i.prefix = tI || "fas"), i)), function(t, n, a) {
            var e = a.prefix,
                r = a.iconName;
            if (t || !e || !r) return {
                prefix: e,
                iconName: r
            };
            var i = "fa" === n ? tH(r) : {},
                o = tY(e, r);
            return r = i.iconName || o || r, "far" !== (e = i.prefix || e) || tE.far || !tE.fas || to.autoFetchSvg || (e = "fas"), {
                prefix: e,
                iconName: r
            }
        }(void 0 !== x && x, k, _))
    }
    var tX = S.filter(function(t) {
            return t !== A || t !== N
        }),
        tK = Object.keys(z).filter(function(t) {
            return t !== A
        }).map(function(t) {
            return Object.keys(z[t])
        }).flat(),
        t$ = function() {
            function t() {
                (0, n._)(this, t), this.definitions = {}
            }
            return (0, a._)(t, [{
                key: "add",
                value: function() {
                    for (var t = this, n = arguments.length, a = Array(n), e = 0; e < n; e++) a[e] = arguments[e];
                    var r = a.reduce(this._pullDefinitions, {});
                    Object.keys(r).forEach(function(n) {
                        t.definitions[n] = s(s({}, t.definitions[n] || {}), r[n]), tC(n, r[n]);
                        var a = G[A][n];
                        a && tC(a, r[n]), tT()
                    })
                }
            }, {
                key: "reset",
                value: function() {
                    this.definitions = {}
                }
            }, {
                key: "_pullDefinitions",
                value: function(t, n) {
                    var a = n.prefix && n.iconName && n.icon ? {
                        0: n
                    } : n;
                    return Object.keys(a).map(function(n) {
                        var e = a[n],
                            r = e.prefix,
                            i = e.iconName,
                            o = e.icon,
                            s = o[2];
                        t[r] || (t[r] = {}), s.length > 0 && s.forEach(function(n) {
                            "string" == typeof n && (t[r][n] = o)
                        }), t[r][i] = o
                    }), t
                }
            }]), t
        }(),
        tG = [],
        tJ = {},
        tQ = {},
        tZ = Object.keys(tQ);

    function t0(t, n) {
        for (var a = arguments.length, e = Array(a > 2 ? a - 2 : 0), i = 2; i < a; i++) e[i - 2] = arguments[i];
        return (tJ[t] || []).forEach(function(t) {
            n = t.apply(null, [n].concat((0, r._)(e)))
        }), n
    }

    function t1(t) {
        for (var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), e = 1; e < n; e++) a[e - 1] = arguments[e];
        (tJ[t] || []).forEach(function(t) {
            t.apply(null, a)
        })
    }

    function t2() {
        var t = arguments[0],
            n = Array.prototype.slice.call(arguments, 1);
        return tQ[t] ? tQ[t].apply(null, n) : void 0
    }

    function t5(t) {
        "fa" === t.prefix && (t.prefix = "fas");
        var n = t.iconName,
            a = t.prefix || tI;
        if (n) return n = tY(a, n) || n, tN(t4.definitions, a, n) || tN(ty.styles, a, n)
    }
    var t4 = new t$,
        t6 = {
            noAuto: function() {
                to.autoReplaceSvg = !1, to.observeMutations = !1, t1("noAuto")
            },
            config: to,
            dom: {
                i2svg: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return y ? (t1("beforeI2svg", t), t2("pseudoElements2svg", t), t2("i2svg", t)) : Promise.reject(Error("Operation requires a DOM of some kind."))
                },
                watch: function() {
                    var t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        a = n.autoReplaceSvgRoot;
                    !1 === to.autoReplaceSvg && (to.autoReplaceSvg = !0), to.observeMutations = !0, t = function() {
                        t3({
                            autoReplaceSvgRoot: a
                        }), t1("watch", n)
                    }, y && (tw ? setTimeout(t, 0) : tx.push(t))
                }
            },
            parse: {
                icon: function(t) {
                    if (null === t) return null;
                    if ((void 0 === t ? "undefined" : (0, i._)(t)) === "object" && t.prefix && t.iconName) return {
                        prefix: t.prefix,
                        iconName: tY(t.prefix, t.iconName) || t.iconName
                    };
                    if (Array.isArray(t) && 2 === t.length) {
                        var n = 0 === t[1].indexOf("fa-") ? t[1].slice(3) : t[1],
                            a = tq(t[0]);
                        return {
                            prefix: a,
                            iconName: tY(a, n) || n
                        }
                    }
                    if ("string" == typeof t && (t.indexOf("".concat(to.cssPrefix, "-")) > -1 || t.match(Q))) {
                        var e = tV(t.split(" "), {
                            skipLookups: !0
                        });
                        return {
                            prefix: e.prefix || tI,
                            iconName: tY(e.prefix, e.iconName) || e.iconName
                        }
                    }
                    if ("string" == typeof t) {
                        var r = tI;
                        return {
                            prefix: r,
                            iconName: tY(r, t) || t
                        }
                    }
                }
            },
            library: t4,
            findIconDefinition: t5,
            toHtml: tA
        },
        t3 = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = t.autoReplaceSvgRoot,
                a = void 0 === n ? v : n;
            (Object.keys(ty.styles).length > 0 || to.autoFetchSvg) && y && to.autoReplaceSvg && t6.dom.i2svg({
                node: a
            })
        };

    function t7(t, n) {
        return Object.defineProperty(t, "abstract", {
            get: n
        }), Object.defineProperty(t, "html", {
            get: function() {
                return t.abstract.map(function(t) {
                    return tA(t)
                })
            }
        }), Object.defineProperty(t, "node", {
            get: function() {
                if (y) {
                    var n = v.createElement("div");
                    return n.innerHTML = t.html, n.children
                }
            }
        }), t
    }

    function t9(t) {
        var n, a, e, r, i, o, f = t.icons,
            l = f.main,
            c = f.mask,
            u = t.prefix,
            d = t.iconName,
            m = t.transform,
            p = t.symbol,
            h = t.title,
            v = t.maskId,
            g = t.titleId,
            b = t.extra,
            y = t.watchable,
            x = c.found ? c : l,
            k = x.width,
            w = x.height,
            A = C.includes(u),
            N = [to.replacementClass, d ? "".concat(to.cssPrefix, "-").concat(d) : ""].filter(function(t) {
                return -1 === b.classes.indexOf(t)
            }).filter(function(t) {
                return "" !== t || !!t
            }).concat(b.classes).join(" "),
            S = {
                children: [],
                attributes: s(s({}, b.attributes), {}, {
                    "data-prefix": u,
                    "data-icon": d,
                    class: N,
                    role: b.attributes.role || "img",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 ".concat(k, " ").concat(w)
                })
            },
            P = A && !~b.classes.indexOf("fa-fw") ? {
                width: "".concat(k / w * 1, "em")
            } : {};
        void 0 !== y && y && (S.attributes[D] = ""), h && (S.children.push({
            tag: "title",
            attributes: {
                id: S.attributes["aria-labelledby"] || "title-".concat(g || tl())
            },
            children: [h]
        }), delete S.attributes.title);
        var O = s(s({}, S), {}, {
                prefix: u,
                iconName: d,
                main: l,
                mask: c,
                maskId: v,
                transform: m,
                symbol: p,
                styles: s(s({}, P), b.styles)
            }),
            E = c.found && l.found ? t2("generateAbstractMask", O) || {
                children: [],
                attributes: {}
            } : t2("generateAbstractIcon", O) || {
                children: [],
                attributes: {}
            },
            z = E.children,
            j = E.attributes;
        return (O.children = z, O.attributes = j, p) ? (n = O.prefix, a = O.iconName, e = O.children, r = O.attributes, o = !0 === (i = O.symbol) ? "".concat(n, "-").concat(to.cssPrefix, "-").concat(a) : i, [{
            tag: "svg",
            attributes: {
                style: "display: none;"
            },
            children: [{
                tag: "symbol",
                attributes: s(s({}, r), {}, {
                    id: o
                }),
                children: e
            }]
        }]) : function(t) {
            var n = t.children,
                a = t.main,
                e = t.mask,
                r = t.attributes,
                i = t.styles,
                o = t.transform;
            if (tp(o) && a.found && !e.found) {
                var f = {
                    x: a.width / a.height / 2,
                    y: .5
                };
                r.style = tm(s(s({}, i), {}, {
                    "transform-origin": "".concat(f.x + o.x / 16, "em ").concat(f.y + o.y / 16, "em")
                }))
            }
            return [{
                tag: "svg",
                attributes: r,
                children: n
            }]
        }(O)
    }

    function t8(t) {
        var n, a, e, r, i, o, f, l = t.content,
            c = t.width,
            u = t.height,
            d = t.transform,
            m = t.title,
            p = t.extra,
            h = t.watchable,
            v = s(s(s({}, p.attributes), m ? {
                title: m
            } : {}), {}, {
                class: p.classes.join(" ")
            });
        void 0 !== h && h && (v[D] = "");
        var g = s({}, p.styles);
        tp(d) && (a = (n = {
            transform: d,
            startCentered: !0,
            width: c,
            height: u
        }).transform, e = n.width, r = n.height, o = void 0 !== (i = n.startCentered) && i, f = "", o && x ? f += "translate(".concat(a.x / 16 - (void 0 === e ? 16 : e) / 2, "em, ").concat(a.y / 16 - (void 0 === r ? 16 : r) / 2, "em) ") : o ? f += "translate(calc(-50% + ".concat(a.x / 16, "em), calc(-50% + ").concat(a.y / 16, "em)) ") : f += "translate(".concat(a.x / 16, "em, ").concat(a.y / 16, "em) "), f += "scale(".concat(a.size / 16 * (a.flipX ? -1 : 1), ", ").concat(a.size / 16 * (a.flipY ? -1 : 1), ") "), g.transform = f += "rotate(".concat(a.rotate, "deg) "), g["-webkit-transform"] = g.transform);
        var b = tm(g);
        b.length > 0 && (v.style = b);
        var y = [];
        return y.push({
            tag: "span",
            attributes: v,
            children: [l]
        }), m && y.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [m]
        }), y
    }
    var nt = ty.styles;

    function nn(t) {
        var n = t[0],
            a = t[1],
            r = (0, e._)(t.slice(4), 1)[0];
        return {
            found: !0,
            width: n,
            height: a,
            icon: Array.isArray(r) ? {
                tag: "g",
                attributes: {
                    class: "".concat(to.cssPrefix, "-").concat("duotone-group")
                },
                children: [{
                    tag: "path",
                    attributes: {
                        class: "".concat(to.cssPrefix, "-").concat("secondary"),
                        fill: "currentColor",
                        d: r[0]
                    }
                }, {
                    tag: "path",
                    attributes: {
                        class: "".concat(to.cssPrefix, "-").concat("primary"),
                        fill: "currentColor",
                        d: r[1]
                    }
                }]
            } : {
                tag: "path",
                attributes: {
                    fill: "currentColor",
                    d: r
                }
            }
        }
    }
    var na = {
        found: !1,
        width: 512,
        height: 512
    };

    function ne(t, n) {
        var a = n;
        return "fa" === n && null !== to.styleDefault && (n = tI), new Promise(function(e, r) {
            if ("fa" === a) {
                var i, o, f = tH(t) || {};
                t = f.iconName || t, n = f.prefix || n
            }
            if (t && n && nt[n] && nt[n][t]) return e(nn(nt[n][t]));
            i = t, o = n, B || to.showMissingIcons || !i || console.error('Icon with name "'.concat(i, '" and prefix "').concat(o, '" is missing.')), e(s(s({}, na), {}, {
                icon: to.showMissingIcons && t && t2("missingIconAbstract") || {}
            }))
        })
    }
    var nr = function() {},
        ni = to.measurePerformance && b && b.mark && b.measure ? b : {
            mark: nr,
            measure: nr
        },
        no = 'FA "6.7.2"',
        ns = function(t) {
            ni.mark("".concat(no, " ").concat(t, " ends")), ni.measure("".concat(no, " ").concat(t), "".concat(no, " ").concat(t, " begins"), "".concat(no, " ").concat(t, " ends"))
        },
        nf = function(t) {
            return ni.mark("".concat(no, " ").concat(t, " begins")),
                function() {
                    return ns(t)
                }
        },
        nl = function() {};

    function nc(t) {
        return "string" == typeof(t.getAttribute ? t.getAttribute(D) : null)
    }

    function nu(t) {
        return v.createElementNS("http://www.w3.org/2000/svg", t)
    }

    function nd(t) {
        return v.createElement(t)
    }
    var nm = {
        replace: function(t) {
            var n = t[0];
            if (n.parentNode)
                if (t[1].forEach(function(t) {
                        n.parentNode.insertBefore(function t(n) {
                            var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                e = a.ceFn,
                                r = void 0 === e ? "svg" === n.tag ? nu : nd : e;
                            if ("string" == typeof n) return v.createTextNode(n);
                            var i = r(n.tag);
                            return Object.keys(n.attributes || []).forEach(function(t) {
                                i.setAttribute(t, n.attributes[t])
                            }), (n.children || []).forEach(function(n) {
                                i.appendChild(t(n, {
                                    ceFn: r
                                }))
                            }), i
                        }(t), n)
                    }), null === n.getAttribute(D) && to.keepOriginalSource) {
                    var a, e = v.createComment((a = " ".concat(n.outerHTML, " "), a = "".concat(a, "Font Awesome fontawesome.com ")));
                    n.parentNode.replaceChild(e, n)
                } else n.remove()
        },
        nest: function(t) {
            var n = t[0],
                a = t[1];
            if (~tu(n).indexOf(to.replacementClass)) return nm.replace(t);
            var e = new RegExp("".concat(to.cssPrefix, "-.*"));
            if (delete a[0].attributes.id, a[0].attributes.class) {
                var r = a[0].attributes.class.split(" ").reduce(function(t, n) {
                    return n === to.replacementClass || n.match(e) ? t.toSvg.push(n) : t.toNode.push(n), t
                }, {
                    toNode: [],
                    toSvg: []
                });
                a[0].attributes.class = r.toSvg.join(" "), 0 === r.toNode.length ? n.removeAttribute("class") : n.setAttribute("class", r.toNode.join(" "))
            }
            var i = a.map(function(t) {
                return tA(t)
            }).join("\n");
            n.setAttribute(D, ""), n.innerHTML = i
        }
    };

    function np(t) {
        t()
    }

    function nh(t, n) {
        var a = "function" == typeof n ? n : nl;
        if (0 === t.length) a();
        else {
            var e = np;
            "async" === to.mutateApproach && (e = h.requestAnimationFrame || np), e(function() {
                var n = !0 === to.autoReplaceSvg ? nm.replace : nm[to.autoReplaceSvg] || nm.replace,
                    e = nf("mutate");
                t.map(n), e(), a()
            })
        }
    }
    var nv = !1,
        ng = null;

    function nb(t) {
        if (g && to.observeMutations) {
            var n = t.treeCallback,
                a = void 0 === n ? nl : n,
                e = t.nodeCallback,
                r = void 0 === e ? nl : e,
                i = t.pseudoElementsCallback,
                o = void 0 === i ? nl : i,
                s = t.observeMutationsRoot,
                f = void 0 === s ? v : s;
            ng = new g(function(t) {
                if (!nv) {
                    var n = tI;
                    tc(t).forEach(function(t) {
                        if ("childList" === t.type && t.addedNodes.length > 0 && !nc(t.addedNodes[0]) && (to.searchPseudoElements && o(t.target), a(t.target)), "attributes" === t.type && t.target.parentNode && to.searchPseudoElements && o(t.target.parentNode), "attributes" === t.type && nc(t.target) && ~tn.indexOf(t.attributeName))
                            if ("class" === t.attributeName && (i = (e = t.target).getAttribute ? e.getAttribute(T) : null, s = e.getAttribute ? e.getAttribute(W) : null, i && s)) {
                                var e, i, s, f, l = tV(tu(t.target)),
                                    c = l.prefix,
                                    u = l.iconName;
                                t.target.setAttribute(T, c || n), u && t.target.setAttribute(W, u)
                            } else(f = t.target) && f.classList && f.classList.contains && f.classList.contains(to.replacementClass) && r(t.target)
                    })
                }
            }), y && ng.observe(f, {
                childList: !0,
                attributes: !0,
                characterData: !0,
                subtree: !0
            })
        }
    }

    function ny(t) {
        var n, a, e, r, i, o, f, l, c, u, d, m, p = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                styleParser: !0
            },
            h = (r = (n = t).getAttribute("data-prefix"), i = n.getAttribute("data-icon"), o = void 0 !== n.innerText ? n.innerText.trim() : "", ((f = tV(tu(n))).prefix || (f.prefix = tI), r && i && (f.prefix = r, f.iconName = i), f.iconName && f.prefix) ? f : (f.prefix && o.length > 0 && (a = f.prefix, e = n.innerText, f.iconName = (t_[a] || {})[e] || tW(f.prefix, tP(n.innerText))), !f.iconName && to.autoFetchSvg && n.firstChild && n.firstChild.nodeType === Node.TEXT_NODE && (f.iconName = n.firstChild.data), f)),
            v = h.iconName,
            g = h.prefix,
            b = h.rest,
            y = (l = tc(t.attributes).reduce(function(t, n) {
                return "class" !== t.name && "style" !== t.name && (t[n.name] = n.value), t
            }, {}), c = t.getAttribute("title"), u = t.getAttribute("data-fa-title-id"), to.autoA11y && (c ? l["aria-labelledby"] = "".concat(to.replacementClass, "-title-").concat(u || tl()) : (l["aria-hidden"] = "true", l.focusable = "false")), l),
            x = t0("parseNodeAttributes", {}, t),
            k = p.styleParser ? (d = t.getAttribute("style"), m = [], d && (m = d.split(";").reduce(function(t, n) {
                var a = n.split(":"),
                    e = a[0],
                    r = a.slice(1);
                return e && r.length > 0 && (t[e] = r.join(":").trim()), t
            }, {})), m) : [];
        return s({
            iconName: v,
            title: t.getAttribute("title"),
            titleId: t.getAttribute("data-fa-title-id"),
            prefix: g,
            transform: tf,
            mask: {
                iconName: null,
                prefix: null,
                rest: []
            },
            maskId: null,
            symbol: !1,
            extra: {
                classes: b,
                styles: k,
                attributes: y
            }
        }, x)
    }
    var nx = ty.styles;

    function nk(t) {
        var n = "nest" === to.autoReplaceSvg ? ny(t, {
            styleParser: !1
        }) : ny(t);
        return ~n.extra.classes.indexOf(Z) ? t2("generateLayersText", t, n) : t2("generateSvgReplacementMutation", t, n)
    }

    function nw(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (!y) return Promise.resolve();
        var a = v.documentElement.classList,
            e = function(t) {
                return a.add("".concat(Y, "-").concat(t))
            },
            i = function(t) {
                return a.remove("".concat(Y, "-").concat(t))
            },
            o = to.autoFetchSvg ? (0, r._)(O).concat((0, r._)(j)) : w.concat(Object.keys(nx));
        o.includes("fa") || o.push("fa");
        var s = [".".concat(Z, ":not([").concat(D, "])")].concat(o.map(function(t) {
            return ".".concat(t, ":not([").concat(D, "])")
        })).join(", ");
        if (0 === s.length) return Promise.resolve();
        var f = [];
        try {
            f = tc(t.querySelectorAll(s))
        } catch (t) {}
        if (!(f.length > 0)) return Promise.resolve();
        e("pending"), i("complete");
        var l = nf("onTree"),
            c = f.reduce(function(t, n) {
                try {
                    var a = nk(n);
                    a && t.push(a)
                } catch (t) {
                    B || "MissingIcon" !== t.name || console.error(t)
                }
                return t
            }, []);
        return new Promise(function(t, a) {
            Promise.all(c).then(function(a) {
                nh(a, function() {
                    e("active"), e("complete"), i("pending"), "function" == typeof n && n(), l(), t()
                })
            }).catch(function(t) {
                l(), a(t)
            })
        })
    }

    function nA(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        nk(t).then(function(t) {
            t && nh([t], n)
        })
    }
    var nN = function(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                a = n.transform,
                e = void 0 === a ? tf : a,
                r = n.symbol,
                i = void 0 !== r && r,
                o = n.mask,
                f = void 0 === o ? null : o,
                l = n.maskId,
                c = void 0 === l ? null : l,
                u = n.title,
                d = void 0 === u ? null : u,
                m = n.titleId,
                p = void 0 === m ? null : m,
                h = n.classes,
                v = void 0 === h ? [] : h,
                g = n.attributes,
                b = void 0 === g ? {} : g,
                y = n.styles,
                x = void 0 === y ? {} : y;
            if (t) {
                var k = t.prefix,
                    w = t.iconName,
                    A = t.icon;
                return t7(s({
                    type: "icon"
                }, t), function() {
                    return t1("beforeDOMElementCreation", {
                        iconDefinition: t,
                        params: n
                    }), to.autoA11y && (d ? b["aria-labelledby"] = "".concat(to.replacementClass, "-title-").concat(p || tl()) : (b["aria-hidden"] = "true", b.focusable = "false")), t9({
                        icons: {
                            main: nn(A),
                            mask: f ? nn(f.icon) : {
                                found: !1,
                                width: null,
                                height: null,
                                icon: {}
                            }
                        },
                        prefix: k,
                        iconName: w,
                        transform: s(s({}, tf), e),
                        symbol: i,
                        title: d,
                        maskId: c,
                        titleId: p,
                        extra: {
                            attributes: b,
                            styles: x,
                            classes: v
                        }
                    })
                })
            }
        },
        nS = RegExp('"', "ug"),
        nP = s(s(s(s({}, {
            FontAwesome: {
                normal: "fas",
                400: "fas"
            }
        }), {
            "Font Awesome 6 Free": {
                900: "fas",
                400: "far"
            },
            "Font Awesome 6 Pro": {
                900: "fas",
                400: "far",
                normal: "far",
                300: "fal",
                100: "fat"
            },
            "Font Awesome 6 Brands": {
                400: "fab",
                normal: "fab"
            },
            "Font Awesome 6 Duotone": {
                900: "fad",
                400: "fadr",
                normal: "fadr",
                300: "fadl",
                100: "fadt"
            },
            "Font Awesome 6 Sharp": {
                900: "fass",
                400: "fasr",
                normal: "fasr",
                300: "fasl",
                100: "fast"
            },
            "Font Awesome 6 Sharp Duotone": {
                900: "fasds",
                400: "fasdr",
                normal: "fasdr",
                300: "fasdl",
                100: "fasdt"
            }
        }), {
            "Font Awesome 5 Free": {
                900: "fas",
                400: "far"
            },
            "Font Awesome 5 Pro": {
                900: "fas",
                400: "far",
                normal: "far",
                300: "fal"
            },
            "Font Awesome 5 Brands": {
                400: "fab",
                normal: "fab"
            },
            "Font Awesome 5 Duotone": {
                900: "fad"
            }
        }), {
            "Font Awesome Kit": {
                400: "fak",
                normal: "fak"
            },
            "Font Awesome Kit Duotone": {
                400: "fakd",
                normal: "fakd"
            }
        }),
        nO = Object.keys(nP).reduce(function(t, n) {
            return t[n.toLowerCase()] = nP[n], t
        }, {}),
        nC = Object.keys(nO).reduce(function(t, n) {
            var a = nO[n];
            return t[n] = a[900] || (0, r._)(Object.entries(a))[0][1], t
        }, {});

    function nE(t, n) {
        var a = "".concat("data-fa-pseudo-element-pending").concat(n.replace(":", "-"));
        return new Promise(function(e, r) {
            if (null !== t.getAttribute(a)) return e();
            var i = tc(t.children).filter(function(t) {
                    return t.getAttribute(R) === n
                })[0],
                o = h.getComputedStyle(t, n),
                f = o.getPropertyValue("font-family"),
                l = f.match(tt),
                c = o.getPropertyValue("font-weight"),
                u = o.getPropertyValue("content");
            if (i && !l) return t.removeChild(i), e();
            if (l && "none" !== u && "" !== u) {
                var d = o.getPropertyValue("content"),
                    m = (P = f.replace(/^['"]|['"]$/g, "").toLowerCase(), C = isNaN(O = parseInt(c)) ? "normal" : O, (nO[P] || {})[C] || nC[P]),
                    p = (j = (N = (w = E = d.replace(nS, "")).length, (z = (S = w.charCodeAt(0)) >= 55296 && S <= 56319 && N > 1 && (A = w.charCodeAt(1)) >= 56320 && A <= 57343 ? (S - 55296) * 1024 + A - 56320 + 65536 : S) >= 1105920 && z <= 1112319), {
                        value: (F = 2 === E.length && E[0] === E[1]) ? tP(E[0]) : tP(E),
                        isSecondary: j || F
                    }),
                    g = p.value,
                    b = p.isSecondary,
                    y = l[0].startsWith("FontAwesome"),
                    x = tW(m, g),
                    k = x;
                if (y) {
                    var w, A, N, S, P, O, C, E, z, j, F, I, M, _ = (I = tD[g], M = tW("fas", g), I || (M ? {
                        prefix: "fas",
                        iconName: M
                    } : null) || {
                        prefix: null,
                        iconName: null
                    });
                    _.iconName && _.prefix && (x = _.iconName, m = _.prefix)
                }
                if (!x || b || i && i.getAttribute(T) === m && i.getAttribute(W) === k) e();
                else {
                    t.setAttribute(a, k), i && t.removeChild(i);
                    var L = {
                            iconName: null,
                            title: null,
                            titleId: null,
                            prefix: null,
                            transform: tf,
                            symbol: !1,
                            mask: {
                                iconName: null,
                                prefix: null,
                                rest: []
                            },
                            maskId: null,
                            extra: {
                                classes: [],
                                styles: {},
                                attributes: {}
                            }
                        },
                        D = L.extra;
                    D.attributes[R] = n, ne(x, m).then(function(r) {
                        var i = t9(s(s({}, L), {}, {
                                icons: {
                                    main: r,
                                    mask: tB()
                                },
                                prefix: m,
                                iconName: k,
                                extra: D,
                                watchable: !0
                            })),
                            o = v.createElementNS("http://www.w3.org/2000/svg", "svg");
                        "::before" === n ? t.insertBefore(o, t.firstChild) : t.appendChild(o), o.outerHTML = i.map(function(t) {
                            return tA(t)
                        }).join("\n"), t.removeAttribute(a), e()
                    }).catch(r)
                }
            } else e()
        })
    }

    function nz(t) {
        return Promise.all([nE(t, "::before"), nE(t, "::after")])
    }

    function nj(t) {
        return t.parentNode !== document.head && !~H.indexOf(t.tagName.toUpperCase()) && !t.getAttribute(R) && (!t.parentNode || "svg" !== t.parentNode.tagName)
    }

    function nF(t) {
        if (y) return new Promise(function(n, a) {
            var e = tc(t.querySelectorAll("*")).filter(nj).map(nz),
                r = nf("searchPseudoElements");
            nv = !0, Promise.all(e).then(function() {
                r(), nv = !1, n()
            }).catch(function() {
                r(), nv = !1, a()
            })
        })
    }
    var nI = !1,
        nM = function(t) {
            return t.toLowerCase().split(" ").reduce(function(t, n) {
                var a = n.toLowerCase().split("-"),
                    e = a[0],
                    r = a.slice(1).join("-");
                if (e && "h" === r) return t.flipX = !0, t;
                if (e && "v" === r) return t.flipY = !0, t;
                if (isNaN(r = parseFloat(r))) return t;
                switch (e) {
                    case "grow":
                        t.size = t.size + r;
                        break;
                    case "shrink":
                        t.size = t.size - r;
                        break;
                    case "left":
                        t.x = t.x - r;
                        break;
                    case "right":
                        t.x = t.x + r;
                        break;
                    case "up":
                        t.y = t.y - r;
                        break;
                    case "down":
                        t.y = t.y + r;
                        break;
                    case "rotate":
                        t.rotate = t.rotate + r
                }
                return t
            }, {
                size: 16,
                x: 0,
                y: 0,
                flipX: !1,
                flipY: !1,
                rotate: 0
            })
        },
        n_ = {
            x: 0,
            y: 0,
            width: "100%",
            height: "100%"
        };

    function nL(t) {
        var n = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1];
        return t.attributes && (t.attributes.fill || n) && (t.attributes.fill = "black"), t
    }
    tG = [{
        mixout: function() {
            return {
                dom: {
                    css: th,
                    insertCss: tg
                }
            }
        },
        hooks: function() {
            return {
                beforeDOMElementCreation: function() {
                    tg()
                },
                beforeI2svg: function() {
                    tg()
                }
            }
        }
    }, {
        mixout: function() {
            return {
                icon: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        a = (t || {}).icon ? t : t5(t || {}),
                        e = n.mask;
                    return e && (e = (e || {}).icon ? e : t5(e || {})), nN(a, s(s({}, n), {}, {
                        mask: e
                    }))
                }
            }
        },
        hooks: function() {
            return {
                mutationObserverCallbacks: function(t) {
                    return t.treeCallback = nw, t.nodeCallback = nA, t
                }
            }
        },
        provides: function(t) {
            t.i2svg = function(t) {
                var n = t.node,
                    a = void 0 === n ? v : n,
                    e = t.callback;
                return nw(a, void 0 === e ? function() {} : e)
            }, t.generateSvgReplacementMutation = function(t, n) {
                var a = n.iconName,
                    r = n.title,
                    i = n.titleId,
                    o = n.prefix,
                    s = n.transform,
                    f = n.symbol,
                    l = n.mask,
                    c = n.maskId,
                    u = n.extra;
                return new Promise(function(n, d) {
                    Promise.all([ne(a, o), l.iconName ? ne(l.iconName, l.prefix) : Promise.resolve({
                        found: !1,
                        width: 512,
                        height: 512,
                        icon: {}
                    })]).then(function(l) {
                        var d = (0, e._)(l, 2);
                        n([t, t9({
                            icons: {
                                main: d[0],
                                mask: d[1]
                            },
                            prefix: o,
                            iconName: a,
                            transform: s,
                            symbol: f,
                            maskId: c,
                            title: r,
                            titleId: i,
                            extra: u,
                            watchable: !0
                        })])
                    }).catch(d)
                })
            }, t.generateAbstractIcon = function(t) {
                var n, a = t.children,
                    e = t.attributes,
                    r = t.main,
                    i = t.transform,
                    o = tm(t.styles);
                return o.length > 0 && (e.style = o), tp(i) && (n = t2("generateAbstractTransformGrouping", {
                    main: r,
                    transform: i,
                    containerWidth: r.width,
                    iconWidth: r.width
                })), a.push(n || r.icon), {
                    children: a,
                    attributes: e
                }
            }
        }
    }, {
        mixout: function() {
            return {
                layer: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        a = n.classes,
                        e = void 0 === a ? [] : a;
                    return t7({
                        type: "layer"
                    }, function() {
                        t1("beforeDOMElementCreation", {
                            assembler: t,
                            params: n
                        });
                        var a = [];
                        return t(function(t) {
                            Array.isArray(t) ? t.map(function(t) {
                                a = a.concat(t.abstract)
                            }) : a = a.concat(t.abstract)
                        }), [{
                            tag: "span",
                            attributes: {
                                class: ["".concat(to.cssPrefix, "-layers")].concat((0, r._)(e)).join(" ")
                            },
                            children: a
                        }]
                    })
                }
            }
        }
    }, {
        mixout: function() {
            return {
                counter: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        a = n.title,
                        e = void 0 === a ? null : a,
                        i = n.classes,
                        o = void 0 === i ? [] : i,
                        f = n.attributes,
                        l = void 0 === f ? {} : f,
                        c = n.styles,
                        u = void 0 === c ? {} : c;
                    return t7({
                        type: "counter",
                        content: t
                    }, function() {
                        var a, i, f, c, d, m, p;
                        return t1("beforeDOMElementCreation", {
                            content: t,
                            params: n
                        }), i = (a = {
                            content: t.toString(),
                            title: e,
                            extra: {
                                attributes: l,
                                styles: u,
                                classes: ["".concat(to.cssPrefix, "-layers-counter")].concat((0, r._)(o))
                            }
                        }).content, f = a.title, d = s(s(s({}, (c = a.extra).attributes), f ? {
                            title: f
                        } : {}), {}, {
                            class: c.classes.join(" ")
                        }), (m = tm(c.styles)).length > 0 && (d.style = m), (p = []).push({
                            tag: "span",
                            attributes: d,
                            children: [i]
                        }), f && p.push({
                            tag: "span",
                            attributes: {
                                class: "sr-only"
                            },
                            children: [f]
                        }), p
                    })
                }
            }
        }
    }, {
        mixout: function() {
            return {
                text: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        a = n.transform,
                        e = void 0 === a ? tf : a,
                        i = n.title,
                        o = void 0 === i ? null : i,
                        f = n.classes,
                        l = void 0 === f ? [] : f,
                        c = n.attributes,
                        u = void 0 === c ? {} : c,
                        d = n.styles,
                        m = void 0 === d ? {} : d;
                    return t7({
                        type: "text",
                        content: t
                    }, function() {
                        return t1("beforeDOMElementCreation", {
                            content: t,
                            params: n
                        }), t8({
                            content: t,
                            transform: s(s({}, tf), e),
                            title: o,
                            extra: {
                                attributes: u,
                                styles: m,
                                classes: ["".concat(to.cssPrefix, "-layers-text")].concat((0, r._)(l))
                            }
                        })
                    })
                }
            }
        },
        provides: function(t) {
            t.generateLayersText = function(t, n) {
                var a = n.title,
                    e = n.transform,
                    r = n.extra,
                    i = null,
                    o = null;
                if (x) {
                    var s = parseInt(getComputedStyle(t).fontSize, 10),
                        f = t.getBoundingClientRect();
                    i = f.width / s, o = f.height / s
                }
                return to.autoA11y && !a && (r.attributes["aria-hidden"] = "true"), Promise.resolve([t, t8({
                    content: t.innerHTML,
                    width: i,
                    height: o,
                    transform: e,
                    title: a,
                    extra: r,
                    watchable: !0
                })])
            }
        }
    }, {
        hooks: function() {
            return {
                mutationObserverCallbacks: function(t) {
                    return t.pseudoElementsCallback = nF, t
                }
            }
        },
        provides: function(t) {
            t.pseudoElements2svg = function(t) {
                var n = t.node,
                    a = void 0 === n ? v : n;
                to.searchPseudoElements && nF(a)
            }
        }
    }, {
        mixout: function() {
            return {
                dom: {
                    unwatch: function() {
                        nv = !0, nI = !0
                    }
                }
            }
        },
        hooks: function() {
            return {
                bootstrap: function() {
                    nb(t0("mutationObserverCallbacks", {}))
                },
                noAuto: function() {
                    ng && ng.disconnect()
                },
                watch: function(t) {
                    var n = t.observeMutationsRoot;
                    nI ? nv = !1 : nb(t0("mutationObserverCallbacks", {
                        observeMutationsRoot: n
                    }))
                }
            }
        }
    }, {
        mixout: function() {
            return {
                parse: {
                    transform: function(t) {
                        return nM(t)
                    }
                }
            }
        },
        hooks: function() {
            return {
                parseNodeAttributes: function(t, n) {
                    var a = n.getAttribute("data-fa-transform");
                    return a && (t.transform = nM(a)), t
                }
            }
        },
        provides: function(t) {
            t.generateAbstractTransformGrouping = function(t) {
                var n = t.main,
                    a = t.transform,
                    e = t.containerWidth,
                    r = t.iconWidth,
                    i = "translate(".concat(32 * a.x, ", ").concat(32 * a.y, ") "),
                    o = "scale(".concat(a.size / 16 * (a.flipX ? -1 : 1), ", ").concat(a.size / 16 * (a.flipY ? -1 : 1), ") "),
                    f = "rotate(".concat(a.rotate, " 0 0)"),
                    l = {
                        transform: "".concat(i, " ").concat(o, " ").concat(f)
                    },
                    c = {
                        outer: {
                            transform: "translate(".concat(e / 2, " 256)")
                        },
                        inner: l,
                        path: {
                            transform: "translate(".concat(-(r / 2 * 1), " -256)")
                        }
                    };
                return {
                    tag: "g",
                    attributes: s({}, c.outer),
                    children: [{
                        tag: "g",
                        attributes: s({}, c.inner),
                        children: [{
                            tag: n.icon.tag,
                            children: n.icon.children,
                            attributes: s(s({}, n.icon.attributes), c.path)
                        }]
                    }]
                }
            }
        }
    }, {
        hooks: function() {
            return {
                parseNodeAttributes: function(t, n) {
                    var a = n.getAttribute("data-fa-mask"),
                        e = a ? tV(a.split(" ").map(function(t) {
                            return t.trim()
                        })) : tB();
                    return e.prefix || (e.prefix = tI), t.mask = e, t.maskId = n.getAttribute("data-fa-mask-id"), t
                }
            }
        },
        provides: function(t) {
            t.generateAbstractMask = function(t) {
                var n, a, e, r, i, o, f, l, c = t.children,
                    u = t.attributes,
                    d = t.main,
                    m = t.mask,
                    p = t.maskId,
                    h = t.transform,
                    v = d.width,
                    g = d.icon,
                    b = m.width,
                    y = m.icon,
                    x = (a = (n = {
                        transform: h,
                        containerWidth: b,
                        iconWidth: v
                    }).transform, e = n.containerWidth, r = n.iconWidth, i = "translate(".concat(32 * a.x, ", ").concat(32 * a.y, ") "), o = "scale(".concat(a.size / 16 * (a.flipX ? -1 : 1), ", ").concat(a.size / 16 * (a.flipY ? -1 : 1), ") "), f = "rotate(".concat(a.rotate, " 0 0)"), l = {
                        transform: "".concat(i, " ").concat(o, " ").concat(f)
                    }, {
                        outer: {
                            transform: "translate(".concat(e / 2, " 256)")
                        },
                        inner: l,
                        path: {
                            transform: "translate(".concat(-(r / 2 * 1), " -256)")
                        }
                    }),
                    k = {
                        tag: "rect",
                        attributes: s(s({}, n_), {}, {
                            fill: "white"
                        })
                    },
                    w = g.children ? {
                        children: g.children.map(nL)
                    } : {},
                    A = {
                        tag: "g",
                        attributes: s({}, x.inner),
                        children: [nL(s({
                            tag: g.tag,
                            attributes: s(s({}, g.attributes), x.path)
                        }, w))]
                    },
                    N = {
                        tag: "g",
                        attributes: s({}, x.outer),
                        children: [A]
                    },
                    S = "mask-".concat(p || tl()),
                    P = "clip-".concat(p || tl()),
                    O = {
                        tag: "mask",
                        attributes: s(s({}, n_), {}, {
                            id: S,
                            maskUnits: "userSpaceOnUse",
                            maskContentUnits: "userSpaceOnUse"
                        }),
                        children: [k, N]
                    },
                    C = {
                        tag: "defs",
                        children: [{
                            tag: "clipPath",
                            attributes: {
                                id: P
                            },
                            children: "g" === y.tag ? y.children : [y]
                        }, O]
                    };
                return c.push(C, {
                    tag: "rect",
                    attributes: s({
                        fill: "currentColor",
                        "clip-path": "url(#".concat(P, ")"),
                        mask: "url(#".concat(S, ")")
                    }, n_)
                }), {
                    children: c,
                    attributes: u
                }
            }
        }
    }, {
        provides: function(t) {
            var n = !1;
            h.matchMedia && (n = h.matchMedia("(prefers-reduced-motion: reduce)").matches), t.missingIconAbstract = function() {
                var t = [],
                    a = {
                        fill: "currentColor"
                    },
                    e = {
                        attributeType: "XML",
                        repeatCount: "indefinite",
                        dur: "2s"
                    };
                t.push({
                    tag: "path",
                    attributes: s(s({}, a), {}, {
                        d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
                    })
                });
                var r = s(s({}, e), {}, {
                        attributeName: "opacity"
                    }),
                    i = {
                        tag: "circle",
                        attributes: s(s({}, a), {}, {
                            cx: "256",
                            cy: "364",
                            r: "28"
                        }),
                        children: []
                    };
                return n || i.children.push({
                    tag: "animate",
                    attributes: s(s({}, e), {}, {
                        attributeName: "r",
                        values: "28;14;28;28;14;28;"
                    })
                }, {
                    tag: "animate",
                    attributes: s(s({}, r), {}, {
                        values: "1;0;1;1;0;1;"
                    })
                }), t.push(i), t.push({
                    tag: "path",
                    attributes: s(s({}, a), {}, {
                        opacity: "1",
                        d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
                    }),
                    children: n ? [] : [{
                        tag: "animate",
                        attributes: s(s({}, r), {}, {
                            values: "1;0;0;0;0;1;"
                        })
                    }]
                }), n || t.push({
                    tag: "path",
                    attributes: s(s({}, a), {}, {
                        opacity: "0",
                        d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
                    }),
                    children: [{
                        tag: "animate",
                        attributes: s(s({}, r), {}, {
                            values: "0;0;1;1;0;0;"
                        })
                    }]
                }), {
                    tag: "g",
                    attributes: {
                        class: "missing"
                    },
                    children: t
                }
            }
        }
    }, {
        hooks: function() {
            return {
                parseNodeAttributes: function(t, n) {
                    var a = n.getAttribute("data-fa-symbol");
                    return t.symbol = null !== a && ("" === a || a), t
                }
            }
        }
    }], tJ = {}, Object.keys(tQ).forEach(function(t) {
        -1 === tZ.indexOf(t) && delete tQ[t]
    }), tG.forEach(function(t) {
        var n = t.mixout ? t.mixout() : {};
        if (Object.keys(n).forEach(function(t) {
                "function" == typeof n[t] && (t6[t] = n[t]), "object" === (0, i._)(n[t]) && Object.keys(n[t]).forEach(function(a) {
                    t6[t] || (t6[t] = {}), t6[t][a] = n[t][a]
                })
            }), t.hooks) {
            var a = t.hooks();
            Object.keys(a).forEach(function(t) {
                tJ[t] || (tJ[t] = []), tJ[t].push(a[t])
            })
        }
        t.provides && t.provides(tQ)
    }), t6.noAuto;
    var nD = t6.config;
    t6.library, t6.dom;
    var nR = t6.parse;
    t6.findIconDefinition, t6.toHtml;
    var nT = t6.icon;
    t6.layer;
    var nW = t6.text,
        nY = t6.counter;
    t.s(["config", 0, nD, "counter", 0, nY, "icon", 0, nT, "parse", 0, nR, "text", 0, nW])
}, 149721, t => {
    "use strict";
    var n, a = t.i(247167),
        e = t.i(754452),
        r = t.i(61106),
        i = t.i(480388),
        o = t.i(181788),
        s = t.i(499092),
        f = t.i(317608),
        l = t.i(180072),
        c = t.i(855111),
        u = t.i(524906),
        d = t.i(271645),
        m = t.i(291310);

    function p() {
        var t = (0, l._)(["(?<=^|s)", "-"], ["(?<=^|\\s)", "-"]);
        return p = function() {
            return t
        }, t
    }

    function h(t) {
        var n;
        return (n = t - 0) == n ? t : (t = t.replace(/[_-]+(.)?/g, function(t, n) {
            return n ? n.toUpperCase() : ""
        })).charAt(0).toLowerCase() + t.slice(1)
    }
    t.i(843476);
    var v = function(t, n) {
            return d.default.createElement("stop", (0, i._)({
                key: "".concat(n, "-").concat(t.offset),
                offset: t.offset,
                stopColor: t.color
            }, void 0 !== t.opacity && {
                stopOpacity: t.opacity
            }))
        },
        g = new Map,
        b = (function t(n, a) {
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if ("string" == typeof a) return a;
            var r = (a.children || []).map(function(a) {
                    var r = a;
                    return ("fill" in e || e.gradientFill) && "path" === a.tag && "fill" in a.attributes && (r = (0, o._)((0, i._)({}, a), {
                        attributes: (0, o._)((0, i._)({}, a.attributes), {
                            fill: void 0
                        })
                    })), t(n, r)
                }),
                l = a.attributes || {},
                u = {},
                d = !0,
                m = !1,
                p = void 0;
            try {
                for (var b, y = Object.entries(l)[Symbol.iterator](); !(d = (b = y.next()).done); d = !0) {
                    var x = (0, f._)(b.value, 2),
                        k = x[0],
                        w = x[1];
                    switch (!0) {
                        case "class" === k:
                            u.className = w;
                            break;
                        case "style" === k:
                            u.style = function(t) {
                                if (g.has(t)) return g.get(t);
                                for (var n = {}, a = 0, e = t.length; a < e;) {
                                    var r = t.indexOf(";", a),
                                        i = -1 === r ? e : r,
                                        o = t.slice(a, i).trim();
                                    if (o) {
                                        var s = o.indexOf(":");
                                        if (s > 0) {
                                            var f = o.slice(0, s).trim(),
                                                l = o.slice(s + 1).trim();
                                            if (f && l) {
                                                var c = h(f);
                                                n[c.startsWith("webkit") ? c.charAt(0).toUpperCase() + c.slice(1) : c] = l
                                            }
                                        }
                                    }
                                    a = i + 1
                                }
                                if (1e3 === g.size) {
                                    var u = g.keys().next().value;
                                    u && g.delete(u)
                                }
                                return g.set(t, n), n
                            }(String(w));
                            break;
                        case k.startsWith("aria-"):
                        case k.startsWith("data-"):
                            u[k.toLowerCase()] = w;
                            break;
                        default:
                            u[h(k)] = w
                    }
                }
            } catch (t) {
                m = !0, p = t
            } finally {
                try {
                    d || null == y.return || y.return()
                } finally {
                    if (m) throw p
                }
            }
            var A = e.style,
                N = e.role,
                S = e["aria-label"],
                P = e.gradientFill,
                O = (0, s._)(e, ["style", "role", "aria-label", "gradientFill"]);
            if (A && (u.style = u.style ? (0, i._)({}, u.style, A) : A), N && (u.role = N), S && (u["aria-label"] = S, u["aria-hidden"] = "false"), P) {
                u.fill = "url(#".concat(P.id, ")");
                var C = P.type,
                    E = P.stops,
                    z = (0, s._)(P, ["type", "stops"]);
                r.unshift(n("linear" === C ? "linearGradient" : "radialGradient", (0, o._)((0, i._)({}, z), {
                    id: P.id
                }), (void 0 === E ? [] : E).map(v)))
            }
            return n.apply(void 0, [a.tag, (0, i._)({}, u, O)].concat((0, c._)(r)))
        }).bind(null, d.default.createElement),
        y = function(t, n) {
            var a = (0, d.useId)();
            return t || (n ? a : void 0)
        },
        x = function() {
            function t() {
                var n, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "react-fontawesome";
                (0, e._)(this, t), this.enabled = !1;
                var i = !1;
                try {
                    i = void 0 !== a.default && (null == (n = a.default.env) ? void 0 : n.NODE_ENV) === "development"
                } catch (t) {}
                this.scope = r, this.enabled = i
            }
            return (0, r._)(t, [{
                key: "log",
                value: function() {
                    for (var t, n = arguments.length, a = Array(n), e = 0; e < n; e++) a[e] = arguments[e];
                    this.enabled && (t = console).log.apply(t, ["[".concat(this.scope, "]")].concat((0, c._)(a)))
                }
            }, {
                key: "warn",
                value: function() {
                    for (var t, n = arguments.length, a = Array(n), e = 0; e < n; e++) a[e] = arguments[e];
                    this.enabled && (t = console).warn.apply(t, ["[".concat(this.scope, "]")].concat((0, c._)(a)))
                }
            }, {
                key: "error",
                value: function() {
                    for (var t, n = arguments.length, a = Array(n), e = 0; e < n; e++) a[e] = arguments[e];
                    this.enabled && (t = console).error.apply(t, ["[".concat(this.scope, "]")].concat((0, c._)(a)))
                }
            }]), t
        }();
    void 0 !== a.default && (null == (n = a.default.env) || n.FA_VERSION);
    var k = Number.parseInt("searchPseudoElementsFullScan" in m.config && "boolean" == typeof m.config.searchPseudoElementsFullScan ? "7.0.0" : "6.0.0") >= 7,
        w = {
            left: "fa-pull-left",
            right: "fa-pull-right"
        },
        A = {
            90: "fa-rotate-90",
            180: "fa-rotate-180",
            270: "fa-rotate-270"
        },
        N = {
            "2xs": "fa-2xs",
            xs: "fa-xs",
            sm: "fa-sm",
            lg: "fa-lg",
            xl: "fa-xl",
            "2xl": "fa-2xl",
            "1x": "fa-1x",
            "2x": "fa-2x",
            "3x": "fa-3x",
            "4x": "fa-4x",
            "5x": "fa-5x",
            "6x": "fa-6x",
            "7x": "fa-7x",
            "8x": "fa-8x",
            "9x": "fa-9x",
            "10x": "fa-10x"
        },
        S = "fa-fw";

    function P(t) {
        var n = m.config.cssPrefix || m.config.familyPrefix || "fa";
        return "fa" === n ? t : t.replace(RegExp(String.raw(p(), "fa"), "g"), "".concat(n, "-"))
    }

    function O(t) {
        if (t) return (void 0 === t ? "undefined" : (0, u._)(t)) === "object" && "icon" in t && t.icon ? t : m.parse.icon(t)
    }
    var C = new x("FontAwesomeIcon"),
        E = {
            border: !1,
            className: "",
            mask: void 0,
            maskId: void 0,
            fixedWidth: !1,
            inverse: !1,
            flip: !1,
            icon: void 0,
            listItem: !1,
            pull: void 0,
            pulse: !1,
            rotation: void 0,
            rotateBy: !1,
            size: void 0,
            spin: !1,
            spinPulse: !1,
            spinReverse: !1,
            beat: !1,
            fade: !1,
            beatFade: !1,
            bounce: !1,
            shake: !1,
            symbol: !1,
            title: "",
            titleId: void 0,
            transform: void 0,
            swapOpacity: !1,
            widthAuto: !1,
            canvasSquare: !1,
            canvasRoomy: !1,
            flip360: !1,
            buzz: !1,
            float: !1,
            jello: !1,
            spinSnap: !1,
            spinSnap4: !1,
            spinSnap8: !1,
            swing: !1,
            wag: !1
        },
        z = new Set(Object.keys(E)),
        j = d.default.forwardRef(function(t, n) {
            var a = (0, i._)({}, E, t),
                e = a.icon,
                r = a.mask,
                s = a.symbol,
                f = a.title,
                l = a.titleId,
                u = a.maskId,
                d = a.transform,
                p = y(u, !!r),
                h = y(l, !!f),
                v = O(e);
            if (!v) return C.error("Icon lookup is undefined", e), null;
            var g = (R = a.beat, T = a.fade, W = a.beatFade, Y = a.bounce, H = a.shake, B = a.spin, q = a.spinPulse, U = a.spinReverse, V = a.pulse, X = a.fixedWidth, K = a.inverse, $ = a.border, G = a.flip, J = a.size, Q = a.rotation, Z = a.pull, tt = a.swapOpacity, tn = a.rotateBy, ta = a.widthAuto, te = a.canvasSquare, tr = a.canvasRoomy, ti = a.flip360, to = a.buzz, ts = a.float, tf = a.jello, tl = a.spinSnap, tc = a.spinSnap4, tu = a.spinSnap8, td = a.swing, tm = a.wag, tp = a.className, th = [], (tp && th.push.apply(th, (0, c._)(tp.split(" "))), R && th.push("fa-beat"), T && th.push("fa-fade"), W && th.push("fa-beat-fade"), Y && th.push("fa-bounce"), H && th.push("fa-shake"), B && th.push("fa-spin"), U && th.push("fa-spin-reverse"), q && th.push("fa-spin-pulse"), V && th.push("fa-pulse"), X && th.push(S), K && th.push("fa-inverse"), $ && th.push("fa-border"), !0 === G && th.push("fa-flip"), ("horizontal" === G || "both" === G) && th.push("fa-flip-horizontal"), ("vertical" === G || "both" === G) && th.push("fa-flip-vertical"), null != J && th.push(N[J]), null != Q && 0 !== Q && th.push(A[Q]), null != Z && th.push(w[Z]), tt && th.push("fa-swap-opacity"), k) ? (tn && th.push("fa-rotate-by"), ta && th.push("fa-width-auto"), te && th.push("fa-canvas-square"), tr && th.push("fa-canvas-roomy"), ti && th.push("fa-flip-360"), to && th.push("fa-buzz"), ts && th.push("fa-float"), tf && th.push("fa-jello"), tl && th.push("fa-spin-snap"), tc && th.push("fa-spin-snap-4"), tu && th.push("fa-spin-snap-8"), td && th.push("fa-swing"), tm && th.push("fa-wag"), "fa" === (m.config.cssPrefix || m.config.familyPrefix || "fa") ? th : th.map(P)) : th),
                x = "string" == typeof d ? m.parse.transform(d) : d,
                j = O(r),
                F = (0, m.icon)(v, (0, o._)((0, i._)({}, g.length > 0 && {
                    classes: g
                }, x && {
                    transform: x
                }, j && {
                    mask: j
                }), {
                    symbol: s,
                    title: f,
                    titleId: h,
                    maskId: p
                }));
            if (!F) return C.error("Could not find icon", v), null;
            var I = F.abstract,
                M = {
                    ref: n
                },
                _ = !0,
                L = !1,
                D = void 0;
            try {
                for (var R, T, W, Y, H, B, q, U, V, X, K, $, G, J, Q, Z, tt, tn, ta, te, tr, ti, to, ts, tf, tl, tc, tu, td, tm, tp, th, tv, tg = Object.keys(a)[Symbol.iterator](); !(_ = (tv = tg.next()).done); _ = !0) {
                    var tb = tv.value;
                    z.has(tb) || (M[tb] = a[tb])
                }
            } catch (t) {
                L = !0, D = t
            } finally {
                try {
                    _ || null == tg.return || tg.return()
                } finally {
                    if (L) throw D
                }
            }
            return b(I[0], M)
        });
    j.displayName = "FontAwesomeIcon", "".concat("fa-layers", " ").concat(S), t.s(["FontAwesomeIcon", 0, j])
}]);