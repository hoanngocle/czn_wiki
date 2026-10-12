(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 30207, e => {
    "use strict";
    var a = e.i(855111),
        r = e.i(271645);

    function t(e) {
        var t = r.useRef(e);
        return r.useEffect(function() {
            t.current = e
        }), r.useMemo(function() {
            return function() {
                for (var e, r = arguments.length, n = Array(r), s = 0; s < r; s++) n[s] = arguments[s];
                return null == (e = t.current) ? void 0 : e.call.apply(e, [t].concat((0, a._)(n)))
            }
        }, [])
    }(0, Object.defineProperty)(t, "name", {
        value: "useCallbackRef",
        configurable: !0
    }), e.s(["useCallbackRef", 0, t])
}, 786939, 381959, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(976921),
        s = function(e) {
            var t = e.rarity;
            return (0, a.jsxs)("div", {
                className: "afk-rarity rar-".concat(t),
                children: ["A" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: (0, n.getIconUrl)("afk-journey", "rarity_a"),
                        alt: "Rarity A",
                        className: "faction-icon",
                        width: 34,
                        height: 34,
                        unoptimized: !0
                    })
                }), "S" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: (0, n.getIconUrl)("afk-journey", "rarity_s"),
                        alt: "Rarity S",
                        className: "faction-icon",
                        width: 34,
                        height: 34,
                        unoptimized: !0
                    })
                })]
            })
        },
        i = {
            Mage: "class_mage",
            Marksman: "class_mark",
            Rogue: "class_rogue",
            Support: "class_support",
            Tank: "class_tank",
            Warrior: "class_warrior"
        },
        l = function(e) {
            var t = e.charClass,
                s = i[t];
            return (0, a.jsx)("div", {
                className: "afk-class ".concat(t),
                children: s && (0, a.jsx)(r.default, {
                    src: (0, n.getIconUrl)("afk-journey", s),
                    alt: t,
                    className: "faction-icon",
                    width: 34,
                    height: 34,
                    unoptimized: !0
                })
            })
        },
        c = {
            Graveborn: "faction_grave",
            Lightbearer: "faction_light",
            Mauler: "faction_mauler",
            Wilder: "faction_wilder",
            Celestial: "faction_cele",
            Hypogean: "faction_hypo",
            Dimensional: "faction_dim"
        },
        o = function(e) {
            var t = e.faction,
                s = c[t];
            return (0, a.jsx)("div", {
                className: "afk-faction ".concat(t),
                children: s && (0, a.jsx)(r.default, {
                    src: (0, n.getIconUrl)("afk-journey", s),
                    alt: t,
                    className: "faction-icon",
                    width: 34,
                    height: 34,
                    unoptimized: !0
                })
            })
        },
        d = e.i(209962),
        m = e.i(952949),
        h = e.i(440904),
        g = e.i(336405),
        u = function(e) {
            var r = e.character,
                t = r.smallImage ? r.smallImage : null;
            return (0, a.jsx)(m.BaseCharacterPopover, {
                gameClass: "afk",
                avatarClass: "afk ".concat(r.faction),
                imageUrl: t,
                imageAlt: r.name,
                imageSize: {
                    width: 60,
                    height: 60
                },
                name: r.name,
                detailsUrl: "/afk-journey/characters/".concat(r.slug),
                renderBadges: function() {
                    return (0, a.jsxs)(a.Fragment, {
                        children: [!r.isPet && (0, a.jsx)(s, {
                            rarity: r.rarity
                        }), (0, a.jsx)(l, {
                            charClass: r.class
                        }), (0, a.jsx)(o, {
                            faction: r.faction
                        })]
                    })
                },
                renderRatings: function() {
                    return (0, g.isAfkRatingPlaceholder)(r.ratings) ? (0, a.jsx)(h.RatingsUnavailable, {}) : (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsxs)("div", {
                            className: "bottom afk-top",
                            children: [(0, a.jsx)(d.RatingBox, {
                                game: "reverse",
                                rating: r.ratings.afk,
                                ratingName: "AFK Stages"
                            }), (0, a.jsx)(d.RatingBox, {
                                game: "reverse",
                                rating: r.ratings.pvp,
                                ratingName: "PVP"
                            })]
                        }), (0, a.jsxs)("div", {
                            className: "bottom afk-bottom",
                            children: [(0, a.jsx)(d.RatingBox, {
                                game: "reverse",
                                rating: r.ratings.dream_overall_pre,
                                ratingName: "Dream Realm"
                            }), (0, a.jsx)(d.RatingBox, {
                                game: "reverse",
                                rating: r.ratings.dream_overall,
                                ratingName: "Dream Realm (Endless)"
                            })]
                        })]
                    })
                }
            })
        };
    e.s(["AFKCharacterPopover", 0, u], 381959);
    var p = {
            A: "rarity_a",
            S: "rarity_s"
        },
        v = {
            Mage: "class_mage",
            Marksman: "class_mark",
            Rogue: "class_rogue",
            Support: "class_support",
            Tank: "class_tank",
            Warrior: "class_warrior"
        };
    e.s(["AFKCharacterCard", 0, function(e) {
        var s = e.character,
            i = e.showLabel,
            l = e.enablePopover,
            c = e.showTags,
            o = e.disablePrefetch,
            d = s.cardImage || "https://cdn.prydwen.gg/images/afk-journey/characters/_placeholder.webp",
            m = !s.cardImage,
            h = s.faction,
            g = p[s.rarity],
            f = v[s.class];
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: s.name,
            slug: s.slug,
            imageUrl: d,
            gameSlug: "afk",
            routePrefix: "afk-journey",
            imageWidth: 134,
            imageHeight: 160,
            avatarExtraClass: "".concat(h).concat(m ? " is-placeholder" : ""),
            showLabel: i,
            enablePopover: l,
            popoverClass: "afk",
            popoverContent: (0, a.jsx)(u, {
                character: s
            }),
            disablePrefetch: o,
            renderFloatingElements: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)("span", {
                        className: "floating-element afk",
                        children: g && (0, a.jsx)(r.default, {
                            src: (0, n.getIconUrl)("afk-journey", g),
                            alt: "Rarity ".concat(s.rarity),
                            width: 24,
                            height: 24,
                            unoptimized: !0
                        })
                    }), (0, a.jsx)("span", {
                        className: "floating-element afk class",
                        children: f && (0, a.jsx)(r.default, {
                            src: (0, n.getIconUrl)("afk-journey", f),
                            alt: s.class,
                            width: 24,
                            height: 24,
                            unoptimized: !0
                        })
                    })]
                })
            },
            renderAfterLabel: function() {
                return i && s.isNew && c ? "test" === s.slug ? (0, a.jsx)("span", {
                    className: "tag future",
                    children: "Future"
                }) : (0, a.jsx)("span", {
                    className: "tag new",
                    children: "New"
                }) : null
            }
        })
    }], 786939)
}, 736332, 818791, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(768182),
        n = e.i(976921),
        s = e.i(381959),
        i = {
            A: "rarity_a",
            S: "rarity_s"
        };
    e.s(["AFKCharacterIcon", 0, function(e) {
        var l = e.character,
            c = e.showLabel,
            o = e.enablePopover,
            d = e.showIcon,
            m = e.showTags,
            h = l.smallImage ? l.smallImage : null,
            g = i[l.rarity];
        return (0, a.jsx)(t.BaseCharacterIcon, {
            name: l.name,
            slug: l.slug,
            image: h,
            gameSlug: "afk",
            avatarExtraClass: l.faction,
            href: "/afk-journey/characters/".concat(l.slug),
            showLabel: c,
            enablePopover: o,
            popoverClass: "afk",
            popoverContent: (0, a.jsx)(s.AFKCharacterPopover, {
                character: l
            }),
            renderFloatingElements: d ? function() {
                return (0, a.jsx)("span", {
                    className: "floating-element afk",
                    children: g && (0, a.jsx)(r.default, {
                        src: (0, n.getIconUrl)("afk-journey", g),
                        alt: "Rarity ".concat(l.rarity),
                        width: 24,
                        height: 24,
                        unoptimized: !0
                    })
                })
            } : void 0,
            renderAfterLabel: function() {
                return c && l.isNew && m ? "test" === l.slug ? (0, a.jsx)("span", {
                    className: "tag future",
                    children: "Future"
                }) : (0, a.jsx)("span", {
                    className: "tag new",
                    children: "New"
                }) : null
            }
        })
    }], 736332);
    var l = e.i(484216);
    e.s(["AFKCharacterInline", 0, function(e) {
        var r, t, n = e.character,
            i = e.enablePopover;
        return (0, a.jsx)(l.BaseCharacterInline, {
            name: n.name,
            slug: n.slug,
            imageUrl: null != (r = n.smallImage) ? r : null,
            gameSlug: "afk",
            routePrefix: "afk-journey",
            linkClass: "inline-character-afk ".concat(null != (t = n.faction) ? t : "").trim(),
            variantClass: n.faction,
            popoverClass: "afk",
            enablePopover: i,
            popoverContent: (0, a.jsx)(s.AFKCharacterPopover, {
                character: n
            })
        })
    }], 818791)
}, 741038, 881193, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(683239),
        n = e.i(14270),
        s = e.i(719180),
        i = function(e) {
            var r = e.entry;
            return r.description ? (0, a.jsxs)("p", {
                children: [(0, a.jsxs)("strong", {
                    className: r.effect_type || void 0,
                    children: ["[", r.name, "]"]
                }), ":", " ", (0, a.jsx)("span", {
                    dangerouslySetInnerHTML: {
                        __html: (0, t.sanitizeGameContent)(r.description)
                    }
                })]
            }) : (0, a.jsx)("span", {
                children: r.name
            })
        },
        l = function(e) {
            var r, t = (null != (r = e.card.effectsData) ? r : []).filter(function(e) {
                return e.name && e.name.trim().length > 0
            });
            return 0 === t.length ? null : (0, a.jsx)(s.CustomPopover, {
                enabled: !0,
                customClass: "chaos-effect-popover",
                popover: (0, a.jsx)("div", {
                    id: "popover-chaos-effect",
                    children: (0, a.jsx)("div", {
                        className: "popover-body",
                        children: t.map(function(e) {
                            return (0, a.jsx)(i, {
                                entry: e
                            }, e.name)
                        })
                    })
                }),
                children: (0, a.jsx)("p", {
                    className: "show-effects",
                    children: "Show Effects"
                })
            })
        };
    e.s(["CZNCardEffectsPopover", 0, l], 881193), e.s(["CZNCardPopover", 0, function(e) {
        var s, i = e.card,
            c = i.element || "Neutral",
            o = "Ego Skill" === i.cardCategory,
            d = i.image || (0, n.getCznCardImageUrl)(i.cardId, null),
            m = 99 === i.cost ? "-" : String(null != (s = i.cost) ? s : 0),
            h = i.tags && i.tags.length > 0 || i.effects && i.effects.length > 0;
        return (0, a.jsx)("div", {
            className: "chaos-card-special ".concat(c).concat(o ? " ego" : ""),
            children: (0, a.jsxs)("div", {
                className: "chaos-card-inside",
                children: [(0, a.jsx)("div", {
                    className: "left-border ".concat(c)
                }), d && (0, a.jsx)("div", {
                    className: "chaos-image",
                    children: (0, a.jsx)(r.default, {
                        className: "disable-transition",
                        src: d,
                        alt: i.name,
                        width: 200,
                        height: 300,
                        style: {
                            width: "200px",
                            height: "300px",
                            objectFit: "cover"
                        },
                        unoptimized: !0
                    })
                }), (0, a.jsxs)("div", {
                    className: "chaos-header",
                    children: [(0, a.jsx)("div", {
                        className: "cost ".concat(c),
                        children: (0, a.jsx)("span", {
                            children: m
                        })
                    }), (0, a.jsxs)("div", {
                        className: "info",
                        children: [(0, a.jsx)("p", {
                            className: "name ".concat(i.rarity),
                            children: i.name
                        }), (0, a.jsxs)("p", {
                            className: "type",
                            children: [(0, a.jsx)("strong", {
                                children: i.cardType
                            }), i.isSeasonal && (0, a.jsxs)(a.Fragment, {
                                children: [" ", "| ", (0, a.jsx)("strong", {
                                    className: "seasonal",
                                    children: "Season"
                                })]
                            })]
                        })]
                    })]
                }), (0, a.jsxs)("div", {
                    className: "chaos-content",
                    children: [i.tags && i.tags.length > 0 && (0, a.jsx)("p", {
                        className: "tags",
                        children: i.tags.map(function(e) {
                            return (0, a.jsxs)("span", {
                                className: "inline-name",
                                children: ["[", e.trim(), "]"]
                            }, e.trim())
                        })
                    }), i.cardEffect && (0, a.jsx)("div", {
                        className: "skill-with-coloring ".concat(c),
                        dangerouslySetInnerHTML: {
                            __html: (0, t.sanitizeGameContent)(i.cardEffect)
                        }
                    }), i.restriction && "Neutral" === i.combatant && "Forbidden Card" !== i.cardCategory && "Monster Card" !== i.cardCategory && "Striker, Vanguard, Ranger, Hunter, Psionic, Controller" !== i.restriction && (0, a.jsxs)("div", {
                        className: "skill-with-coloring rules ".concat(c),
                        children: [i.restriction, " only"]
                    }), h && (0, a.jsx)(l, {
                        card: i
                    })]
                })]
            })
        })
    }], 741038)
}, 912392, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(569991),
        s = e.i(638285),
        i = e.i(468757),
        l = e.i(149721);
    e.s(["CZNCharacterCard", 0, function(e) {
        var c, o = e.character,
            d = e.showLabel,
            m = e.showTags,
            h = e.enablePopover,
            g = e.disableLink,
            u = e.disablePrefetch;
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: o.name,
            slug: o.slug,
            imageUrl: null != (c = o.cardImage) ? c : null,
            gameSlug: "czn",
            routePrefix: "chaos-zero-nightmare",
            imageWidth: 280,
            imageHeight: 400,
            imageResponsive: !0,
            avatarExtraClass: "rarity-".concat(o.rarity),
            showLabel: d,
            enablePopover: h,
            popoverClass: "czn",
            popoverContent: (0, a.jsx)(n.CZNCharacterPopover, {
                character: o
            }),
            disableLink: g,
            disablePrefetch: u,
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [m && o.isNew && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    }), m && o.isLimited && (0, a.jsx)("span", {
                        className: "tag limited".concat(o.isNew ? " with-new" : ""),
                        children: (0, a.jsx)(l.FontAwesomeIcon, {
                            icon: i.faClock,
                            width: "18"
                        })
                    }), m && o.upcoming && (0, a.jsx)("span", {
                        className: "tag future",
                        children: "Soon"
                    })]
                })
            },
            renderAfterAvatar: function() {
                return (0, a.jsxs)("span", {
                    className: "floating-element ".concat("Unknown" === o.element ? "empty" : ""),
                    children: [o.element && "Unknown" !== o.element && (0, a.jsx)("div", {
                        className: "element",
                        children: (0, a.jsx)(r.default, {
                            src: (0, s.getElementIconUrl)(o.element),
                            alt: o.element,
                            className: "faction-icon",
                            width: 28,
                            height: 28,
                            unoptimized: !0
                        })
                    }), o.class && "Unknown" !== o.class && (0, a.jsx)("div", {
                        className: "class",
                        children: (0, a.jsx)(r.default, {
                            src: (0, s.getClassIconUrl)(o.class),
                            alt: o.class,
                            className: "faction-icon",
                            width: 28,
                            height: 28,
                            unoptimized: !0
                        })
                    })]
                })
            }
        })
    }])
}, 462510, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(768182),
        n = e.i(569991),
        s = e.i(468757),
        i = e.i(149721),
        l = e.i(638285);
    e.s(["CZNCharacterIcon", 0, function(e) {
        var c = e.character,
            o = e.showLabel,
            d = e.enablePopover,
            m = e.disableLink,
            h = e.disablePrefetch,
            g = e.showElement,
            u = e.tierWatchlist,
            p = e.tierNew,
            v = e.tierTags,
            f = e.tierDupes,
            x = e.tierChange,
            j = e.tierLimited,
            w = e.hideStatusBadges,
            b = c.smallImage ? c.smallImage : null,
            C = null == f ? void 0 : f.trim();
        return (0, a.jsx)(t.BaseCharacterIcon, {
            name: c.name,
            slug: c.slug,
            image: b,
            gameSlug: "czn",
            rarity: c.rarity,
            href: "/chaos-zero-nightmare/characters/".concat(c.slug),
            showLabel: o,
            enablePopover: d,
            disableLink: m,
            disablePrefetch: void 0 === h || h,
            popoverClass: "czn",
            popoverContent: (0, a.jsx)(n.CZNCharacterPopover, {
                character: c
            }),
            renderFloatingElements: C ? function() {
                return (0, a.jsx)("span", {
                    className: "floating-element dupes",
                    children: C
                })
            } : void 0,
            renderAfterLabel: function() {
                var e = !w && ("yes" === j || void 0 === j && !0 === c.isLimited),
                    t = !w && ("yes" === p || void 0 === p && !0 === c.isNew);
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsxs)("div", {
                        className: "floating-right-corner",
                        children: [e && (0, a.jsx)("span", {
                            className: "item limited",
                            children: (0, a.jsx)(i.FontAwesomeIcon, {
                                icon: s.faClock,
                                width: "18"
                            })
                        }), t && (0, a.jsx)("span", {
                            className: "item new",
                            children: "NEW"
                        }), "up" === x && (0, a.jsx)("span", {
                            className: "item up",
                            children: (0, a.jsx)(i.FontAwesomeIcon, {
                                icon: s.faArrowUp,
                                width: "18"
                            })
                        }), "down" === x && (0, a.jsx)("span", {
                            className: "item down",
                            children: (0, a.jsx)(i.FontAwesomeIcon, {
                                icon: s.faArrowDown,
                                width: "18"
                            })
                        }), "yes" === u && (0, a.jsx)("span", {
                            className: "item watchlist",
                            children: (0, a.jsx)(i.FontAwesomeIcon, {
                                icon: s.faEye,
                                width: "18"
                            })
                        })]
                    }), v && (0, a.jsx)("div", {
                        className: "tier-list-tags",
                        children: v.split(",").map(function(e, r) {
                            return (0, a.jsx)("span", {
                                className: "single-tag ".concat(e.trim(), " ").concat("Watchlist [UP]" === e.trim() ? "watch-up" : "", " ").concat("Watchlist [DOWN]" === e.trim() ? "watch-down" : ""),
                                children: r === v.split(",").length - 1 ? (0, a.jsx)(a.Fragment, {
                                    children: e
                                }) : (0, a.jsxs)(a.Fragment, {
                                    children: [e, ", "]
                                })
                            }, e.trim() || r)
                        })
                    }), g && c.element && "Unknown" !== c.element && (0, a.jsxs)("span", {
                        className: "floating-element",
                        children: [(0, a.jsx)(r.default, {
                            src: (0, l.getElementIconUrl)(c.element),
                            alt: c.element,
                            className: "faction-icon",
                            width: 24,
                            height: 24,
                            unoptimized: !0
                        }), " ", c.element]
                    })]
                })
            }
        })
    }])
}, 651735, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(569991);
    e.s(["CZNCharacterInline", 0, function(e) {
        var n, s = e.character,
            i = e.enablePopover;
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: s.name,
            slug: s.slug,
            imageUrl: null != (n = s.smallImage) ? n : null,
            gameSlug: "czn",
            routePrefix: "chaos-zero-nightmare",
            linkClass: "inline-character-chaos",
            variantClass: "rarity-".concat(s.rarity),
            popoverClass: "czn",
            enablePopover: i,
            popoverContent: (0, a.jsx)(t.CZNCharacterPopover, {
                character: s
            })
        })
    }])
}, 569991, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(246767),
        t = e.i(211898),
        n = e.i(657688),
        s = e.i(638285),
        i = function(e) {
            var r = e.ele;
            return r && "Unknown" !== r ? (0, a.jsxs)("div", {
                className: "czn-element ".concat(r),
                children: [(0, a.jsx)(n.default, {
                    src: (0, s.getElementIconUrl)(r),
                    alt: r,
                    className: "faction-icon",
                    width: 30,
                    height: 30,
                    unoptimized: !0
                }), r]
            }) : null
        },
        l = e.i(209962),
        c = e.i(952949),
        o = e.i(440904);
    e.i(706280);
    var d = e.i(76874);
    e.s(["CZNCharacterPopover", 0, function(e) {
        var n = e.character,
            m = n.smallImage ? n.smallImage : null,
            h = n.tierRatings ? n.tierRatings.filter(function(e) {
                return e.slug === n.slug
            }).filter(function(e) {
                return !((0, d.isPlaceholderRating)(e.rating_chaos) && (0, d.isPlaceholderRating)(e.rating_save) && (0, d.isPlaceholderRating)(e.rating_great))
            }) : [];
        return (0, a.jsx)(c.BaseCharacterPopover, {
            gameClass: "czn",
            avatarClass: "czn rarity-".concat(n.rarity),
            imageUrl: m,
            imageAlt: n.name,
            imageResponsive: !0,
            name: n.name,
            detailsUrl: "/chaos-zero-nightmare/characters/".concat(n.slug),
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)(r.CZNRarity, {
                        rarity: n.rarity
                    }), (0, a.jsx)(i, {
                        ele: n.element
                    }), (0, a.jsx)(t.CZNClass, {
                        classChar: n.class
                    })]
                })
            },
            renderRatings: function() {
                return h.length > 0 ? (0, a.jsx)(a.Fragment, {
                    children: h.map(function(e) {
                        var r;
                        return (0, a.jsxs)("div", {
                            children: [e.category && (0, a.jsxs)("h6", {
                                className: "czn-small-role ".concat((0, s.cznRoleClass)(e.category)),
                                children: [(0, s.cznRoleLabel)(e.category), (null == (r = e.dupes) ? void 0 : r.trim()) ? (0, a.jsx)("span", {
                                    className: "role-dupes",
                                    children: " [".concat(e.dupes.trim(), "]")
                                }) : null]
                            }), (0, a.jsxs)("div", {
                                className: "bottom afk-bottom",
                                children: [(0, a.jsx)(l.RatingBox, {
                                    game: "chaos",
                                    rating: e.rating_chaos,
                                    ratingName: "Chaos Mode"
                                }), (0, a.jsx)(l.RatingBox, {
                                    game: "chaos",
                                    rating: e.rating_save,
                                    ratingName: "Save Data"
                                }), (0, a.jsx)(l.RatingBox, {
                                    game: "chaos",
                                    rating: e.rating_great,
                                    ratingName: "Great Rift"
                                })]
                            })]
                        }, "".concat(e.slug, "-").concat(e.category))
                    })
                }) : (0, a.jsx)(o.RatingsUnavailable, {})
            }
        })
    }], 569991)
}, 375441, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(133532);
    e.s(["CZNPartnerInline", 0, function(e) {
        var n, s = e.partner,
            i = e.enablePopover,
            l = e.showLabel;
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: s.name,
            slug: s.slug,
            imageUrl: null != (n = s.smallImage) ? n : null,
            gameSlug: "czn",
            href: "/chaos-zero-nightmare/partners?search=".concat(encodeURIComponent(s.name)),
            linkClass: "inline-partner-chaos",
            variantClass: "rarity-".concat(s.rarity),
            popoverClass: "czn",
            enablePopover: i,
            showLabel: l,
            popoverContent: (0, a.jsx)(t.CZNPartnerPopover, {
                partner: s
            })
        })
    }])
}, 133532, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(246767),
        t = e.i(211898),
        n = e.i(683239),
        s = e.i(952949);
    e.s(["CZNPartnerPopover", 0, function(e) {
        var i, l = e.partner;
        return (0, a.jsx)(s.BaseCharacterPopover, {
            gameClass: "czn",
            avatarClass: "czn rarity-".concat(l.rarity),
            imageUrl: null != (i = l.smallImage) ? i : null,
            imageAlt: l.name,
            imageResponsive: !0,
            name: l.name,
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)(r.CZNRarity, {
                        rarity: l.rarity
                    }), (0, a.jsx)(t.CZNClass, {
                        classChar: l.class
                    })]
                })
            },
            renderRatings: function() {
                var e;
                return (0, a.jsxs)("div", {
                    className: "bottom full",
                    children: [(0, a.jsxs)("div", {
                        className: "partner-ego",
                        children: [(0, a.jsx)("p", {
                            className: "title",
                            children: (0, a.jsxs)("strong", {
                                children: ["EGO ", l.egoName || "-", " [", null != (e = l.egoCost) ? e : "?", "EP]"]
                            })
                        }), l.egoDescription ? (0, a.jsx)("div", {
                            className: "skill-with-coloring",
                            dangerouslySetInnerHTML: {
                                __html: (0, n.sanitizeGameContent)(l.egoDescription)
                            }
                        }) : (0, a.jsx)("p", {
                            children: "Coming Soon!"
                        })]
                    }), l.passiveName && (0, a.jsxs)("div", {
                        className: "partner-passive",
                        children: [(0, a.jsx)("p", {
                            className: "title",
                            children: (0, a.jsx)("strong", {
                                children: l.passiveName
                            })
                        }), l.passiveEffect && (0, a.jsx)("div", {
                            className: "skill-with-coloring",
                            dangerouslySetInnerHTML: {
                                __html: (0, n.sanitizeGameContent)(l.passiveEffect)
                            }
                        })]
                    })]
                })
            }
        })
    }])
}, 246767, 211898, e => {
    "use strict";
    var a = e.i(843476);
    e.s(["CZNRarity", 0, function(e) {
        var r = e.rarity.replace("-star", "");
        return (0, a.jsxs)("div", {
            className: "czn-rarity rarity-".concat(r),
            children: [r, "★"]
        })
    }], 246767);
    var r = e.i(657688),
        t = e.i(638285);
    e.s(["CZNClass", 0, function(e) {
        var n = e.classChar;
        return n && "Unknown" !== n ? (0, a.jsxs)("div", {
            className: "czn-class ".concat(n),
            children: [(0, a.jsx)(r.default, {
                src: (0, t.getClassIconUrl)(n),
                alt: n,
                className: "faction-icon",
                width: 30,
                height: 30,
                unoptimized: !0
            }), n]
        }) : null
    }], 211898)
}, 361679, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(209962),
        t = e.i(148730),
        n = e.i(324807),
        s = e.i(952949),
        i = e.i(440904);
    e.i(706280);
    var l = e.i(76874);
    e.s(["EmployeePopover", 0, function(e) {
        var c = e.employee,
            o = c.type.toString().split(",").map(function(e) {
                return (0, a.jsx)(n.TypeIcon, {
                    type: e.trim()
                }, e.trim())
            });
        return (0, a.jsx)(s.BaseCharacterPopover, {
            gameClass: "cs",
            avatarClass: c.rarityClassName,
            imageUrl: c.smallAvatar,
            imageAlt: c.fullName,
            imageUnoptimized: !0,
            name: c.shortName || c.fullName,
            detailsUrl: "/counter-side/characters/".concat(c.slug),
            useDetailsWrapper: !1,
            renderTags: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [c.showNewTag && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "NEW!"
                    }), c.hasBeenBuffedRecently && (0, a.jsx)("span", {
                        className: "tag buffed",
                        children: "Updated"
                    })]
                })
            },
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)(t.RoleIcon, {
                        role: c.role
                    }), o, !0 === c.isRearmed && (0, a.jsx)(t.RoleIcon, {
                        role: "Rearm"
                    })]
                })
            },
            renderRatings: function() {
                var e, t, n, s, o, d, m, h, g, u = (0, l.isPlaceholderRating)(null == (s = c.newRatings) ? void 0 : s.pve_early) && (0, l.isPlaceholderRating)(null == (o = c.newRatings) ? void 0 : o.pve_late) && (0, l.isPlaceholderRating)(null == (d = c.newRatings) ? void 0 : d.pvp_sea);
                return c.isRatingPending || u ? (0, a.jsx)(i.RatingsUnavailable, {}) : (0, a.jsxs)("div", {
                    className: "bottom",
                    children: [(0, a.jsx)(r.RatingBox, {
                        game: "cs",
                        rating: null != (e = null == (m = c.newRatings) ? void 0 : m.pve_early) ? e : "?",
                        ratingName: "PVE (Early)"
                    }), (0, a.jsx)(r.RatingBox, {
                        game: "cs",
                        rating: null != (t = null == (h = c.newRatings) ? void 0 : h.pve_late) ? t : "?",
                        ratingName: "PVE (Late)"
                    }), (0, a.jsx)(r.RatingBox, {
                        game: "cs",
                        rating: null != (n = null == (g = c.newRatings) ? void 0 : g.pvp_sea) ? n : "?",
                        ratingName: "PVP"
                    })]
                })
            }
        })
    }])
}, 148730, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(142102),
        n = (0, e.i(976921).getGameCdnUrl)("counter-side");
    e.s(["RoleIcon", 0, function(e) {
        var s = e.role,
            i = (0, a.jsxs)("div", {
                id: "popover-role",
                className: "popover bs-popover-auto fade show",
                role: "tooltip",
                children: [(0, a.jsx)("div", {
                    className: "popover-arrow"
                }), (0, a.jsx)("h3", {
                    className: "popover-header",
                    children: s
                }), (0, a.jsxs)("div", {
                    className: "popover-body",
                    children: ["Defender" === s && (0, a.jsx)(a.Fragment, {
                        children: "Protects allies from the front line. Has significantly high DEF, and taunts enemies."
                    }), "Ranger" === s && (0, a.jsx)(a.Fragment, {
                        children: "A powerful ranged attacker. Has high CRIT and HIT, and needs protection because of low HP."
                    }), "Siege" === s && (0, a.jsx)(a.Fragment, {
                        children: "A siege unit that charges straight at enemy Bosses. Attacks nearby enemies if no Boss is present."
                    }), "Sniper" === s && (0, a.jsx)(a.Fragment, {
                        children: "A hindmost firepower supporter. Has noticeably high HIT, and is effective against Strikers."
                    }), "Striker" === s && (0, a.jsx)(a.Fragment, {
                        children: "An outrider that disrupts enemy lines. Has high EVA and HIT, and specializes in close combat."
                    }), "Supporter" === s && (0, a.jsx)(a.Fragment, {
                        children: "A Support role that heals allies or weakens enemies."
                    }), "Tower" === s && (0, a.jsx)(a.Fragment, {
                        children: "A stationary unit. Used for base protection purposes, and has special combat support functions."
                    }), "Awakened Defender" === s && (0, a.jsx)(a.Fragment, {
                        children: "Protects allies from the front line. Has significantly high DEF, and taunts enemies."
                    }), "Awakened Ranger" === s && (0, a.jsx)(a.Fragment, {
                        children: "A powerful ranged attacker. Has high CRIT and HIT, and needs protection because of low HP."
                    }), "Awakened Siege" === s && (0, a.jsx)(a.Fragment, {
                        children: "A siege unit that charges straight at enemy Bosses. Attacks nearby enemies if no Boss is present."
                    }), "Awakened Sniper" === s && (0, a.jsx)(a.Fragment, {
                        children: "A hindmost firepower supporter. Has noticeably high HIT, and is effective against Strikers."
                    }), "Awakened Striker" === s && (0, a.jsx)(a.Fragment, {
                        children: "An outrider that disrupts enemy lines. Has high EVA and HIT, and specializes in close combat."
                    }), "Awakened Supporter" === s && (0, a.jsx)(a.Fragment, {
                        children: "A Support role that heals allies or weakens enemies."
                    }), "Awakened Tower" === s && (0, a.jsx)(a.Fragment, {
                        children: "A stationary unit. Used for base protection purposes, and has special combat support functions."
                    }), "Rearm" === s && (0, a.jsx)(a.Fragment, {
                        children: "Rearmed units develop a Leader skill. Their Leader skill is activated when they're selected as Leader."
                    })]
                })]
            });
        return (0, a.jsx)(t.OverlayTrigger, {
            trigger: "click",
            rootClose: !0,
            placement: "auto-start",
            overlay: i,
            children: (0, a.jsxs)("div", {
                className: "employee-role ".concat(s),
                children: [("Defender" === s || "Awakened Defender" === s) && (0, a.jsx)(r.default, {
                    src: "".concat(n, "/icons/role_defender.webp"),
                    alt: s,
                    width: 24,
                    height: 24,
                    unoptimized: !0
                }), ("Ranger" === s || "Awakened Ranger" === s) && (0, a.jsx)(r.default, {
                    src: "".concat(n, "/icons/role_ranger.webp"),
                    alt: s,
                    width: 24,
                    height: 24,
                    unoptimized: !0
                }), ("Siege" === s || "Awakened Siege" === s) && (0, a.jsx)(r.default, {
                    src: "".concat(n, "/icons/role_siege.webp"),
                    alt: s,
                    width: 24,
                    height: 24,
                    unoptimized: !0
                }), ("Sniper" === s || "Awakened Sniper" === s) && (0, a.jsx)(r.default, {
                    src: "".concat(n, "/icons/role_sniper.webp"),
                    alt: s,
                    width: 24,
                    height: 24,
                    unoptimized: !0
                }), ("Striker" === s || "Awakened Striker" === s) && (0, a.jsx)(r.default, {
                    src: "".concat(n, "/icons/role_striker.webp"),
                    alt: s,
                    width: 24,
                    height: 24,
                    unoptimized: !0
                }), ("Supporter" === s || "Awakened Supporter" === s) && (0, a.jsx)(r.default, {
                    src: "".concat(n, "/icons/role_support.webp"),
                    alt: s,
                    width: 24,
                    height: 24,
                    unoptimized: !0
                }), ("Tower" === s || "Awakened Tower" === s) && (0, a.jsx)(r.default, {
                    src: "".concat(n, "/icons/role_tower.webp"),
                    alt: s,
                    width: 24,
                    height: 24,
                    unoptimized: !0
                }), "Rearm" === s && (0, a.jsx)(r.default, {
                    src: "".concat(n, "/icons/special_rearm.webp"),
                    alt: s,
                    width: 24,
                    height: 24,
                    unoptimized: !0
                }), (0, a.jsx)("span", {
                    children: s
                })]
            })
        })
    }])
}, 324807, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = (0, e.i(976921).getGameCdnUrl)("counter-side");
    e.s(["TypeIcon", 0, function(e) {
        var n = e.type;
        return (0, a.jsxs)("div", {
            className: "employee-role ".concat("Corrupted Object" === n ? "CO" : n),
            children: ["Counter" === n && (0, a.jsx)(r.default, {
                src: "".concat(t, "/icons/type_counter.webp"),
                alt: "Counter",
                width: 24,
                height: 24,
                unoptimized: !0
            }), "Mech" === n && (0, a.jsx)(r.default, {
                src: "".concat(t, "/icons/type_mech.webp"),
                alt: "Mech",
                width: 24,
                height: 24,
                unoptimized: !0
            }), "Soldier" === n && (0, a.jsx)(r.default, {
                src: "".concat(t, "/icons/type_soldier.webp"),
                alt: "Soldier",
                width: 24,
                height: 24,
                unoptimized: !0
            }), "Corrupted Object" === n && (0, a.jsx)(r.default, {
                src: "".concat(t, "/icons/type_co.webp"),
                alt: "Corrupted Object",
                width: 24,
                height: 24,
                unoptimized: !0
            }), (0, a.jsx)("span", {
                children: "Corrupted Object" === n ? "C.O." : n
            })]
        })
    }])
}, 965820, 794669, 563731, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(471976),
        t = e.i(511365),
        n = e.i(149721),
        s = e.i(468757),
        i = e.i(975157),
        l = e.i(209962),
        c = e.i(657688),
        o = e.i(976921),
        d = (0, o.getGameCdnUrl)("etheria-restart");

    function m(e) {
        var r = e.element,
            t = e.className,
            n = e.size,
            s = void 0 === n ? 24 : n;
        return r ? (0, a.jsx)(c.default, {
            src: "".concat(d, "/icons/ele_").concat(r.toLowerCase(), ".webp"),
            alt: r,
            width: s,
            height: s,
            className: t || "faction-icon",
            unoptimized: !0
        }) : null
    }
    e.s(["EthElementIcon", 0, m], 794669);
    var h = e.i(952949),
        g = e.i(440904);
    e.i(706280);
    var u = e.i(76874),
        p = (0, o.getGameCdnUrl)("etheria-restart");

    function v(e) {
        var r = e.character,
            c = (0, t.safeImageUrl)(r.smallImage, "".concat(p, "/characters/").concat(r.slug, "_icon.webp")),
            o = [r.rating_campaign, r.rating_module_terror, r.rating_module_doki, r.rating_module_aurora, r.rating_nether_quarry, r.rating_pvp_rta],
            d = o.some(function(e) {
                return null != e
            }) && !o.every(function(e) {
                return (0, u.isPlaceholderRating)(e)
            });
        return (0, a.jsx)(h.BaseCharacterPopover, {
            gameClass: "eth",
            avatarClass: (0, i.cn)("etheria", "rarity-".concat(r.rarity)),
            imageUrl: c,
            imageAlt: r.name,
            imageSize: {
                width: 100,
                height: 100
            },
            name: r.name,
            detailsUrl: "/etheria-restart/characters/".concat(r.slug),
            disablePrefetch: !0,
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)("div", {
                        className: (0, i.cn)("eth-rarity", "rarity-".concat(r.rarity)),
                        children: r.rarity
                    }), (0, a.jsxs)("div", {
                        className: (0, i.cn)("eth-element", r.element),
                        children: [(0, a.jsx)(m, {
                            element: r.element,
                            size: 24
                        }), r.element]
                    }), r.tier_role && (0, a.jsxs)("div", {
                        className: (0, i.cn)("eth-role", r.tier_role),
                        children: [(0, a.jsx)(n.FontAwesomeIcon, {
                            icon: function(e) {
                                switch (e) {
                                    case "DPS":
                                    default:
                                        return s.faHandFist;
                                    case "Control":
                                        return s.faVirus;
                                    case "Support":
                                        return s.faFlask;
                                    case "Sustain":
                                        return s.faBriefcaseMedical
                                }
                            }(r.tier_role),
                            width: "18"
                        }), " ", r.tier_role]
                    })]
                })
            },
            renderRatings: function() {
                return d ? (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsxs)("div", {
                        className: "bottom eth-bottom",
                        children: [(0, a.jsx)(l.RatingBox, {
                            game: "eth",
                            rating: r.rating_module_aurora || "?",
                            ratingName: "Aurora"
                        }), (0, a.jsx)(l.RatingBox, {
                            game: "eth",
                            rating: r.rating_module_doki || "?",
                            ratingName: "DokiDoki"
                        }), (0, a.jsx)(l.RatingBox, {
                            game: "eth",
                            rating: r.rating_module_terror || "?",
                            ratingName: "Terrormaton"
                        })]
                    }), (0, a.jsxs)("div", {
                        className: "bottom eth-top",
                        children: [(0, a.jsx)(l.RatingBox, {
                            game: "eth",
                            rating: r.rating_campaign || "?",
                            ratingName: "Generic PVE"
                        }), (0, a.jsx)(l.RatingBox, {
                            game: "eth",
                            rating: r.rating_nether_quarry || "?",
                            ratingName: "Nether Quarry"
                        }), (0, a.jsx)(l.RatingBox, {
                            game: "eth",
                            rating: r.rating_pvp_rta || "?",
                            ratingName: "PVP"
                        })]
                    })]
                }) : (0, a.jsx)(g.RatingsUnavailable, {})
            }
        })
    }
    e.s(["EthCharacterPopover", 0, v], 563731);
    var f = (0, o.getGameCdnUrl)("etheria-restart");
    e.s(["EthCharacterCard", 0, function(e) {
        var n = e.character,
            s = e.showLabel,
            i = e.enablePopover,
            l = e.showIcon,
            c = e.showTags,
            o = e.disablePrefetch,
            d = (0, t.safeImageUrl)(n.cardImage, "".concat(f, "/characters/").concat(n.slug, "_card.webp"));
        return (0, a.jsx)(r.BaseCharacterCard, {
            name: n.name,
            slug: n.slug,
            imageUrl: d,
            gameSlug: "etheria",
            routePrefix: "etheria-restart",
            imageWidth: 262,
            imageHeight: 358,
            avatarExtraClass: "rarity-".concat(n.rarity),
            showLabel: s,
            enablePopover: i,
            popoverClass: "etheria",
            popoverContent: (0, a.jsx)(v, {
                character: n
            }),
            disablePrefetch: o,
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [s && n.isNew && c && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    }), s && n.isUpdated && c && (0, a.jsx)("span", {
                        className: "tag updated",
                        children: "Updated"
                    })]
                })
            },
            renderAfterAvatar: function() {
                return l ? (0, a.jsx)("span", {
                    className: "floating-element",
                    children: (0, a.jsx)("div", {
                        className: "element",
                        children: (0, a.jsx)(m, {
                            element: n.element,
                            size: 20
                        })
                    })
                }) : null
            }
        })
    }], 965820)
}, 241590, 593500, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(975157),
        t = e.i(511365),
        n = e.i(768182),
        s = e.i(563731),
        i = e.i(794669),
        l = e.i(976921),
        c = (0, l.getGameCdnUrl)("etheria-restart");
    e.s(["EthCharacterIcon", 0, function(e) {
        var l = e.character,
            o = e.showLabel,
            d = e.enablePopover,
            m = (e.showTags, e.tags),
            h = e.tierCategory,
            g = (0, t.safeImageUrl)(l.smallImage, "".concat(c, "/characters/").concat(l.slug, "_icon.webp"));
        return (0, a.jsx)(n.BaseCharacterIcon, {
            name: l.name,
            slug: l.slug,
            image: g,
            gameSlug: "etheria",
            href: "/etheria-restart/characters/".concat(l.slug),
            disablePrefetch: !0,
            rarity: l.rarity,
            imageSize: 60,
            imageResponsive: !1,
            showLabel: o,
            enablePopover: d,
            popoverClass: "etheria",
            popoverContent: (0, a.jsx)(s.EthCharacterPopover, {
                character: l
            }),
            renderFloatingElements: m ? function() {
                return (0, a.jsx)("span", {
                    className: "floating-element etheria element",
                    children: (0, a.jsx)(i.EthElementIcon, {
                        element: l.element,
                        size: 20
                    })
                })
            } : void 0,
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [h && l.isNew && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    }), m && (0, a.jsx)("div", {
                        className: "tier-list-tags",
                        children: m.split(",").map(function(e, t) {
                            return (0, a.jsxs)("span", {
                                className: (0, r.cn)("single-tag", e.trim()),
                                children: [e.trim(), t < m.split(",").length - 1 ? ", " : ""]
                            }, e.trim() || t)
                        })
                    })]
                })
            }
        })
    }], 241590);
    var o = e.i(484216),
        d = (0, l.getGameCdnUrl)("etheria-restart");
    e.s(["EthCharacterInline", 0, function(e) {
        var r = e.character,
            n = e.enablePopover,
            i = (0, t.safeImageUrl)(r.smallImage, "".concat(d, "/characters/").concat(r.slug, "_icon.webp"));
        return (0, a.jsx)(o.BaseCharacterInline, {
            name: r.name,
            slug: r.slug,
            imageUrl: i,
            gameSlug: "etheria",
            routePrefix: "etheria-restart",
            linkClass: "inline-character-eth rarity-".concat(r.rarity),
            variantClass: "inline rarity-".concat(r.rarity),
            imageWidth: 32,
            imageHeight: 32,
            enablePopover: n,
            popoverContent: (0, a.jsx)(s.EthCharacterPopover, {
                character: r
            }),
            disablePrefetch: !0
        })
    }], 593500)
}, 940043, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = (0, e.i(976921).getGameCdnUrl)("etheria-restart"),
        n = {
            Onslaught: "set_onslaught",
            Harvest: "set_harvest",
            Fury: "set_fury",
            Momentum: "set_momentum",
            Keeneye: "set_keeneye",
            Furyedge: "set_furyedge",
            Wellspring: "set_wellspring",
            Cure: "set_cure",
            Evolguard: "set_evolguard",
            Unbreakable: "set_unbreakable",
            Bramble: "set_bramble",
            Bloodbath: "set_bloodbath",
            Colossguard: "set_colossguard",
            Swiftrush: "set_swiftrush",
            Bulwark: "set_bulwark",
            Strive: "set_strive",
            Timeweave: "set_timeweave",
            Swiftraid: "set_swiftraid",
            Battlewill: "set_battlewill",
            Etherplague: "set_etherplague",
            Swiftsmite: "set_swiftsmite",
            "Virulent Toxin": "set_virulent-toxin",
            "Chasing Dawn": "set_chasing-dawn",
            "Unyielding Oath": "set_unyielding-oath",
            Profanation: "set_profanation",
            "Ebullition Strike": "set_ebullition-strike",
            Overflow: "set_overflow"
        };
    e.s(["EthMatrixImage", 0, function(e) {
        var s = n[e.name];
        return s ? (0, a.jsx)(r.default, {
            src: "".concat(t, "/icons/").concat(s, ".webp"),
            alt: "Matrix",
            width: 50,
            height: 50,
            unoptimized: !0
        }) : null
    }, "MATRIX_IMAGE_MAP", 0, n])
}, 531227, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(747659),
        n = e.i(485766),
        s = e.i(759122);
    e.s(["GenshinCharacterInline", 0, function(e) {
        var i = e.character,
            l = e.ratings,
            c = e.showLabel,
            o = e.enablePopover,
            d = (0, n.rarityDigit)(i.rarity);
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: i.name,
            slug: i.slug,
            imageUrl: (0, t.resolveGenshinImage)(i.slug, "icon", void 0),
            gameSlug: "genshin",
            routePrefix: "genshin-impact",
            variantClass: d ? "rarity-".concat(d) : void 0,
            showLabel: c,
            enablePopover: o,
            popoverClass: "genshin",
            popoverContent: (0, a.jsx)(s.GenshinCharacterPopover, {
                character: i,
                ratings: l
            })
        })
    }])
}, 759122, 592136, 184195, e => {
    "use strict";
    var a = e.i(855111),
        r = e.i(843476),
        t = e.i(271645),
        n = e.i(657688),
        s = e.i(952949),
        i = e.i(706756),
        l = e.i(209962),
        c = e.i(747659),
        o = e.i(660133),
        d = e.i(485766);

    function m(e, a, r, t) {
        var n = {},
            s = !0,
            i = !1,
            l = void 0;
        try {
            for (var c, o = e[Symbol.iterator](); !(s = (c = o.next()).done); s = !0) {
                var d = c.value;
                n[d] = {
                    caption: a[d],
                    title: r[d],
                    description: function(e) {
                        var a = "string" == typeof e ? e.trim() : "";
                        return a ? "<p>".concat(a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "</p>") : ""
                    }(t[d])
                }
            }
        } catch (e) {
            i = !0, l = e
        } finally {
            try {
                s || null == o.return || o.return()
            } finally {
                if (i) throw l
            }
        }
        return n
    }
    var h = ["T0", "T0.5", "T1", "T1.5", "T2", "T3", "T4", "T5"],
        g = new Map(h.map(function(e, a) {
            return [e, a]
        }));
    e.s(["tierOrderIndex", 0, function(e) {
        var a;
        return null != (a = g.get(e)) ? a : h.length
    }, "tierSuffix", 0, function(e) {
        return e.slice(1).replace(".", "")
    }], 592136);
    var u = [{
            key: "boss-1",
            index: 1,
            shortLabel: "Boss #1",
            ratingField: "ratingBoss1",
            tagsField: "tagsBoss1",
            ratingColumn: "rating_stygian_boss_1",
            tagsColumn: "tags_boss_1",
            configEntrySlug: "stygian-boss-1"
        }, {
            key: "boss-2",
            index: 2,
            shortLabel: "Boss #2",
            ratingField: "ratingBoss2",
            tagsField: "tagsBoss2",
            ratingColumn: "rating_stygian_boss_2",
            tagsColumn: "tags_boss_2",
            configEntrySlug: "stygian-boss-2"
        }, {
            key: "boss-3",
            index: 3,
            shortLabel: "Boss #3",
            ratingField: "ratingBoss3",
            tagsField: "tagsBoss3",
            ratingColumn: "rating_stygian_boss_3",
            tagsColumn: "tags_boss_3",
            configEntrySlug: "stygian-boss-3"
        }],
        p = ["T0", "T0.5", "T1", "T1.5", "T2", "T3", "T4", "T5"],
        v = new Set(["T1.5", "T4", "T5"]),
        f = p.filter(function(e) {
            return !v.has(e)
        }),
        x = [{
            key: "dps",
            label: "On-Field DPS",
            cssClass: "dps",
            roleClass: "dps"
        }, {
            key: "sub-dps",
            label: "Damage Support",
            cssClass: "sub-dps",
            roleClass: "debuffer"
        }, {
            key: "support",
            label: "Pure Support / Sustain",
            cssClass: "support",
            roleClass: "support"
        }],
        j = {
            apex: "Apex Characters",
            meta: "Meta Characters",
            niche: "Off-Meta Characters",
            forgotten: "The Forgotten Ones"
        },
        w = {
            apex: "Apex characters",
            meta: "Meta characters",
            niche: "Off-Meta characters",
            forgotten: "The Forgotten Ones"
        },
        b = {
            apex: "The characters that dominate the meta. They are the top performers in their roles and can perform tremendously in all general content.",
            meta: "The characters that are still completely viable, but lack the power compared to tiers above.",
            niche: "Niche picks that may do well in certain scenarios if truly invested. As always, they may be able to clear Abyss due to the nature of the game, but they are demonstrably weaker than Apex and Meta characters.",
            forgotten: "Super outdated characters or kits that don’t really do much and require a lot of work to perform correctly."
        },
        C = {
            apex: "Stygian Apex",
            meta: "Stygian Meta",
            niche: "Stygian Off-Meta",
            forgotten: w.forgotten
        },
        y = {
            apex: "Stygian Apex",
            meta: "Stygian Meta",
            niche: "Stygian Off-Meta",
            forgotten: j.forgotten
        },
        N = {
            apex: "The best performers for this Boss; these are also the characters you can look to for clearing Dire difficulty.",
            meta: "Still viable clearers for this Boss, but may face some difficulties, whether it be lacking damage or having incompatibilities versus the boss mechanics.",
            niche: "Niche picks or weaker substitutes for higher-ranked characters.",
            forgotten: b.forgotten
        },
        _ = ["apex", "meta", "niche", "forgotten"],
        P = {
            overall: m(_, w, j, b),
            stygian: m(_, C, y, N)
        },
        S = [{
            variant: "apex",
            tiers: ["T0", "T0.5"]
        }, {
            variant: "meta",
            tiers: ["T1", "T1.5", "T2"]
        }, {
            variant: "niche",
            tiers: ["T3", "T4"]
        }, {
            variant: "forgotten",
            tiers: ["T5"]
        }],
        I = new Set(["high app", "flexible", "cc", "comfort", "shieldbreak", "mechanic"]);

    function R(e) {
        return e.trim().toLowerCase().replace(/\s+/g, "-")
    }

    function L(e) {
        var a, r, t = R(e);
        return null != (a = null == (r = x.find(function(e) {
            return e.key === t
        })) ? void 0 : r.label) ? a : e
    }

    function A(e) {
        var a, r, t = R(e);
        return null != (a = null == (r = x.find(function(e) {
            return e.key === t
        })) ? void 0 : r.roleClass) ? a : ""
    }
    e.s(["GENSHIN_META_LINE_COPY", 0, P, "GENSHIN_STYGIAN_BOSSES", 0, u, "GENSHIN_TIER_CATEGORIES", 0, x, "GENSHIN_TIER_MODES", 0, [{
        value: "overall",
        label: "Overall",
        blurb: "how the character performs across general gameplay and the majority of endgame content."
    }, {
        value: "stygian",
        label: "Stygian Onslaught",
        blurb: "how the character performs in the Stygian Onslaught endgame mode."
    }], "categoryLabel", 0, L, "categoryRoleClass", 0, A, "categorySlug", 0, R, "genshinBossTileLabel", 0, function(e, a) {
        return ("string" == typeof a ? a.trim() : "") || e.shortLabel
    }, "genshinTierModeTileLabel", 0, function(e, a) {
        var r = "string" == typeof a ? a.trim() : "";
        return "stygian" === e.value && r ? "".concat(e.label, " ").concat(r) : e.label
    }, "genshinTierRowsFor", 0, function(e) {
        return "stygian" === e ? f : p
    }, "genshinTierTagTone", 0, function(e) {
        var a = e.trim().toLowerCase().replace(/\s+/g, " ");
        return /^partner\b/.test(a) ? "red" : /^expert\b/.test(a) ? "orange" : I.has(a) ? "green" : null
    }, "metaLineForTier", 0, function(e) {
        var a, r;
        return null != (a = null == (r = S.find(function(a) {
            return a.tiers[0] === e
        })) ? void 0 : r.variant) ? a : null
    }], 184195);
    var k = new Map(x.map(function(e, a) {
        return [e.key, a]
    }));
    e.s(["GenshinCharacterPopover", 0, function(e) {
        var m, h, g, p, v = e.character,
            f = e.ratings,
            x = (0, i.useGenshinRatingsBySlug)(),
            j = null != (m = null != f ? f : x.get(v.slug)) ? m : [],
            w = (0, a._)(j).sort(function(e, a) {
                var r, t, n = null != (r = k.get(R(e.category))) ? r : Number.MAX_SAFE_INTEGER,
                    s = null != (t = k.get(R(a.category))) ? t : Number.MAX_SAFE_INTEGER;
                if (n !== s) return n - s;
                var i = e.dupes.trim(),
                    l = a.dupes.trim();
                return i !== l ? i.localeCompare(l) : e.id.localeCompare(a.id)
            }),
            b = (0, d.rarityDigit)(v.rarity),
            C = null != (h = v.element) ? h : void 0,
            y = null != (g = v.weapon) ? g : void 0,
            N = (0, d.genshinElementIcon)(C),
            _ = (0, d.genshinWeaponIcon)(y);
        return (0, r.jsx)(s.BaseCharacterPopover, {
            gameClass: "genshin",
            avatarClass: "genshin".concat(b ? " rarity-".concat(b) : ""),
            imageUrl: (0, c.resolveGenshinImage)(v.slug, "card", null != (p = v.card) ? p : void 0),
            imageAlt: v.name,
            imageResponsive: !0,
            name: v.name,
            detailsUrl: "/genshin-impact/characters/".concat(v.slug),
            renderBadges: function() {
                return (0, r.jsxs)(r.Fragment, {
                    children: [b ? (0, r.jsxs)("div", {
                        className: "genshin-rarity rar-".concat(b),
                        children: [b, "★"]
                    }) : null, N ? (0, r.jsx)("div", {
                        className: "genshin-element ".concat((0, o.elementSlug)(C)),
                        children: (0, r.jsx)(n.default, {
                            src: N,
                            alt: null != C ? C : "",
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        })
                    }) : null, _ ? (0, r.jsx)("div", {
                        className: "genshin-weapon",
                        children: (0, r.jsx)(n.default, {
                            src: _,
                            alt: null != y ? y : "",
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        })
                    }) : null]
                })
            },
            renderRatings: w.length > 0 ? function() {
                return (0, r.jsx)(r.Fragment, {
                    children: w.map(function(e) {
                        var a;
                        return (0, r.jsxs)(t.default.Fragment, {
                            children: [(0, r.jsxs)("h6", {
                                className: "hsr-small-role ".concat(A(e.category)),
                                children: [L(e.category), e.dupes.trim() ? (0, r.jsx)("span", {
                                    className: "role-dupes",
                                    children: L(e.category) ? " [".concat(e.dupes.trim(), "]") : "[".concat(e.dupes.trim(), "]")
                                }) : null]
                            }), (a = u.some(function(a) {
                                return null !== e[a.ratingField]
                            }), (0, r.jsxs)("div", {
                                className: a ? "bottom" : "bottom full",
                                children: [(0, r.jsx)(l.RatingBox, {
                                    game: "genshin",
                                    rating: e.ratingOverall,
                                    ratingName: "Overall"
                                }), a ? u.map(function(a) {
                                    return (0, r.jsx)(l.RatingBox, {
                                        game: "genshin",
                                        rating: e[a.ratingField],
                                        ratingName: a.shortLabel
                                    }, a.key)
                                }) : null]
                            }))]
                        }, e.id)
                    })
                })
            } : function() {
                return null
            }
        })
    }], 759122)
}, 706756, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(271645),
        t = e.i(60533),
        n = new Map,
        s = (0, t.createGameDataContext)({
            ratingsBySlug: n
        }),
        i = s.Provider,
        l = s.useData;
    e.s(["GenshinRatingsProvider", 0, function(e) {
        var t = e.ratings,
            n = e.children,
            s = (0, r.useMemo)(function() {
                var e = new Map,
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var s, i = t[Symbol.iterator](); !(a = (s = i.next()).done); a = !0) {
                        var l = s.value,
                            c = e.get(l.slug);
                        c ? c.push(l) : e.set(l.slug, [l])
                    }
                } catch (e) {
                    r = !0, n = e
                } finally {
                    try {
                        a || null == i.return || i.return()
                    } finally {
                        if (r) throw n
                    }
                }
                return {
                    ratingsBySlug: e
                }
            }, [t]);
        return (0, a.jsx)(i, {
            value: s,
            children: n
        })
    }, "useGenshinRatingsBySlug", 0, function() {
        return l().ratingsBySlug
    }])
}, 405380, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(952949),
        n = e.i(662075),
        s = e.i(485766);
    e.s(["GenshinWeaponPopover", 0, function(e) {
        var i, l = e.weapon,
            c = (0, s.rarityDigit)(l.rarity),
            o = null != (i = l.weaponType) ? i : void 0,
            d = (0, s.genshinWeaponIcon)(o),
            m = function(e, a) {
                if (0 !== e.length) {
                    var r = "5" === a ? 1 : 5,
                        t = e.find(function(e) {
                            return e.refinement === r
                        });
                    return (null != t ? t : e[e.length - 1]).html
                }
            }(l.refinements, null != c ? c : ""),
            h = l.heroStats;
        return (0, a.jsx)(t.BaseCharacterPopover, {
            gameClass: "genshin genshin-weapon-pop",
            avatarClass: "genshin".concat(c ? " rarity-".concat(c) : ""),
            imageUrl: (0, n.resolveGenshinWeaponImage)(l.weaponId, l.image),
            imageAlt: l.name,
            imageResponsive: !0,
            name: l.name,
            detailsUrl: "/genshin-impact/weapons/".concat(l.slug),
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [c ? (0, a.jsxs)("div", {
                        className: "genshin-rarity rar-".concat(c),
                        children: [c, "★"]
                    }) : null, d ? (0, a.jsxs)("div", {
                        className: "genshin-weapon",
                        children: [(0, a.jsx)(r.default, {
                            src: d,
                            alt: null != o ? o : "",
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        }), o ? (0, a.jsx)("span", {
                            children: o
                        }) : null]
                    }) : null]
                })
            },
            renderRatings: function() {
                return h || m ? (0, a.jsxs)("div", {
                    className: "genshin-weapon-popover-body",
                    children: [h ? (0, a.jsxs)("dl", {
                        className: "genshin-weapon-popover-stats",
                        children: [(0, a.jsxs)("div", {
                            children: [(0, a.jsx)("dt", {
                                children: "Base ATK"
                            }), (0, a.jsx)("dd", {
                                children: h.baseAtk
                            })]
                        }), h.mainStat ? (0, a.jsxs)("div", {
                            children: [(0, a.jsx)("dt", {
                                children: h.mainStat.label
                            }), (0, a.jsx)("dd", {
                                children: h.mainStat.value
                            })]
                        }) : null]
                    }) : null, l.effectName ? (0, a.jsx)("p", {
                        className: "genshin-weapon-popover-effect-name",
                        children: l.effectName
                    }) : null, m ? (0, a.jsx)("div", {
                        className: "genshin-weapon-popover-effect",
                        dangerouslySetInnerHTML: {
                            __html: m
                        }
                    }) : null]
                }) : null
            }
        })
    }])
}, 912626, 759060, 364280, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = (0, e.i(976921).getGameCdnUrl)("limbus-company");

    function n(e) {
        var a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return "".concat(t, "/icons/affinity_").concat(e.toLowerCase()).concat(a ? "_big" : "", ".webp")
    }
    e.s(["CDN_BASE", 0, t, "getAffinityIconUrl", 0, n, "getAttackTypeIconUrl", 0, function(e) {
        return "".concat(t, "/icons/attackt_").concat(e.toLowerCase(), ".webp")
    }, "getCategoryImageUrl", 0, function(e) {
        return "".concat(t, "/categories/").concat(e, ".webp")
    }, "getEgoImageUrl", 0, function(e, a) {
        return a || "".concat(t, "/ego/").concat(e, "_small.webp")
    }, "getIdentityImageUrl", 0, function(e) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "small",
            r = arguments.length > 2 ? arguments[2] : void 0;
        return "small" === a && r ? r : "".concat(t, "/characters/").concat(e, "_").concat(a, ".webp")
    }, "getStatIconUrl", 0, function(e) {
        return "".concat(t, "/icons/stat_").concat(e.toLowerCase(), ".webp")
    }], 759060), e.s(["LCAffinity", 0, function(e) {
        var t = e.affinity,
            s = e.value,
            i = e.hideLabel;
        return (0, a.jsxs)("div", {
            className: "lc-affinity ".concat(t),
            children: [t && (0, a.jsx)(r.default, {
                src: n(t),
                alt: t,
                width: 24,
                height: 24
            }), !i && (0, a.jsx)(a.Fragment, {
                children: t
            }), " ", s && (0, a.jsxs)(a.Fragment, {
                children: ["x", s]
            })]
        })
    }], 912626), e.s(["LCRarity", 0, function(e) {
        var r = e.rarity;
        return (0, a.jsx)("div", {
            className: "lc-rarity rarity-".concat(r),
            children: r
        })
    }], 364280)
}, 415138, 477508, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(839429),
        t = e.i(657688),
        n = e.i(719180),
        s = e.i(209962),
        i = e.i(912626),
        l = e.i(364280),
        c = e.i(952949),
        o = e.i(440904);
    e.i(706280);
    var d = e.i(76874),
        m = e.i(759060),
        h = function(e) {
            var r = e.character,
                t = r.data.small_image || (0, m.getIdentityImageUrl)(r.slug, "small", r.thumbnailUrl);
            return (0, a.jsx)(c.BaseCharacterPopover, {
                gameClass: "limbus",
                avatarClass: "limbus rarity-".concat(r.rarity),
                imageUrl: t,
                imageAlt: r.name,
                imageSize: {
                    width: 80,
                    height: 80
                },
                imageUnoptimized: !1,
                name: r.name,
                detailsUrl: "/limbus-company/identities/".concat(r.slug),
                useDetailsWrapper: !1,
                renderTags: function() {
                    return (0, a.jsx)(a.Fragment, {
                        children: r.data.isNew && (0, a.jsx)("span", {
                            className: "tag new",
                            children: "NEW!"
                        })
                    })
                },
                renderBadges: function() {
                    var e, t, n, s, c, o;
                    return (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsx)(l.LCRarity, {
                            rarity: r.rarity || ""
                        }), (0, a.jsx)(i.LCAffinity, {
                            affinity: null == (e = r.data.affinityDetailed) ? void 0 : e.affinity_1,
                            value: null == (t = r.data.affinityDetailed) ? void 0 : t.affinity_1_v,
                            hideLabel: !0
                        }), (0, a.jsx)(i.LCAffinity, {
                            affinity: null == (n = r.data.affinityDetailed) ? void 0 : n.affinity_2,
                            value: null == (s = r.data.affinityDetailed) ? void 0 : s.affinity_2_v,
                            hideLabel: !0
                        }), (0, a.jsx)(i.LCAffinity, {
                            affinity: null == (c = r.data.affinityDetailed) ? void 0 : c.affinity_3,
                            value: null == (o = r.data.affinityDetailed) ? void 0 : o.affinity_3_v,
                            hideLabel: !0
                        })]
                    })
                },
                renderRatings: function() {
                    var e, t, n;
                    return (0, a.jsx)("div", {
                        className: "bottom full",
                        children: r.data.isReviewPending || (0, d.isPlaceholderRating)(null == (t = r.data.ratings) ? void 0 : t.end) ? (0, a.jsx)(o.RatingsUnavailable, {}) : (0, a.jsx)(s.RatingBox, {
                            game: "nikke",
                            rating: null != (e = null == (n = r.data.ratings) ? void 0 : n.end) ? e : 0,
                            ratingName: "Endgame"
                        })
                    })
                }
            })
        };
    e.s(["LCIdentityPopover", 0, h], 477508), e.s(["LCIdentityCard", 0, function(e) {
        var s = e.character,
            i = e.showLabel,
            l = e.enablePopover,
            c = e.showTags,
            o = e.tierList,
            d = e.disablePrefetch,
            g = s.data.mid_image || (0, m.getIdentityImageUrl)(s.slug, "mid");
        return (0, a.jsx)(n.CustomPopover, {
            enabled: l,
            customClass: "character-hover-box hsr",
            popover: (0, a.jsx)(h, {
                character: s
            }),
            children: (0, a.jsxs)(r.AppLink, {
                href: "/limbus-company/identities/" + s.slug,
                prefetch: !d && void 0,
                children: [(0, a.jsxs)("div", {
                    className: "avatar reverse rarity-".concat(s.rarity, " ").concat(i || ""),
                    children: [(0, a.jsx)("div", {
                        className: "overlay"
                    }), g && (0, a.jsx)(t.default, {
                        className: "disable-transition",
                        src: g,
                        alt: "".concat(s.name),
                        width: 140,
                        height: 216
                    }), i && (0, a.jsx)("span", {
                        className: "emp-name",
                        children: s.name
                    })]
                }), o && (0, a.jsxs)("p", {
                    className: "tags",
                    children: ["[", s.data.tierListTags, "]"]
                }), i && s.data.isNew && c && (0, a.jsx)("span", {
                    className: "tag new",
                    children: "New"
                })]
            })
        })
    }], 415138)
}, 345521, 336661, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(768182),
        t = e.i(477508),
        n = e.i(759060),
        s = e.i(468757),
        i = e.i(149721);
    e.s(["LCIdentityIcon", 0, function(e) {
        var l, c = e.character,
            o = e.showLabel,
            d = e.enablePopover,
            m = e.showTags,
            h = e.tierList,
            g = c.data.small_image || (0, n.getIdentityImageUrl)(c.slug, "small", c.thumbnailUrl),
            u = c.data.tierIcon,
            p = c.data.tierEgoMarker;
        return (0, a.jsx)(r.BaseCharacterIcon, {
            name: c.name,
            slug: c.slug,
            image: g,
            gameSlug: "limbus",
            rarity: null != (l = c.rarity) ? l : void 0,
            imageSize: 100,
            imageResponsive: !1,
            href: "/limbus-company/identities/".concat(c.slug),
            popoverClass: "hsr",
            showLabel: !h && o,
            enablePopover: d,
            popoverContent: (0, a.jsx)(t.LCIdentityPopover, {
                character: c
            }),
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [h && u && (0, a.jsxs)("span", {
                        className: "tag limited",
                        children: ["Event ID" === u && "E", "Prior Season Event ID" === u && "PE", "Prior Season ID" === u && "S", "Walpurgisnacht ID" === u && "W"]
                    }), h && u && p && (0, a.jsx)("span", {
                        className: "tag limited ego with-change",
                        children: (0, a.jsx)(i.FontAwesomeIcon, {
                            icon: s.faStar,
                            width: "12"
                        })
                    }), h && !u && p && (0, a.jsx)("span", {
                        className: "tag limited ego",
                        children: (0, a.jsx)(i.FontAwesomeIcon, {
                            icon: s.faStar,
                            width: "12"
                        })
                    }), !h && c.data.isNew && m && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New "
                    })]
                })
            }
        })
    }], 345521);
    var l = e.i(839429),
        c = e.i(657688),
        o = e.i(719180);
    e.s(["LCIdentityInline", 0, function(e) {
        var r = e.character,
            s = e.enablePopover,
            i = r.data.small_image || (0, n.getIdentityImageUrl)(r.slug, "small", r.thumbnailUrl);
        return (0, a.jsx)(o.CustomPopover, {
            enabled: s,
            customClass: "character-hover-box hsr",
            popover: (0, a.jsx)(t.LCIdentityPopover, {
                character: r
            }),
            children: (0, a.jsxs)(l.AppLink, {
                href: "/limbus-company/identities/".concat(r.slug),
                className: "inline-character-lc rarity-".concat(r.rarity || ""),
                children: [(0, a.jsx)("span", {
                    className: "avatar limbus inline rarity-".concat(r.rarity || ""),
                    children: i && (0, a.jsx)(c.default, {
                        className: "disable-transition",
                        src: i,
                        alt: r.name,
                        width: 32,
                        height: 32
                    })
                }), (0, a.jsx)("span", {
                    className: "inline-name",
                    children: r.name
                })]
            })
        })
    }], 336661)
}, 739038, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(719180),
        n = e.i(814976),
        s = e.i(511762);
    e.s(["LostCardCard", 0, function(e) {
        var i = e.card,
            l = e.showLabel,
            c = i.data.rarity,
            o = (0, s.getLostSwordCardImageUrl)(i);
        return (0, a.jsxs)(t.CustomPopover, {
            enabled: !0,
            customClass: "character-hover-box lost-card",
            popover: (0, a.jsx)(n.LostCardPopover, {
                card: i
            }),
            children: [(0, a.jsx)("div", {
                className: "avatar pw-card lost rarity-".concat(c, " ").concat(l ? "show-label" : ""),
                children: (0, a.jsx)(r.default, {
                    src: o,
                    alt: i.name,
                    width: 100,
                    height: 150,
                    className: "disable-transition",
                    style: {
                        width: "100%",
                        height: "auto"
                    },
                    unoptimized: !0
                })
            }), l && (0, a.jsx)("span", {
                className: "emp-name",
                children: i.name
            })]
        })
    }])
}, 676553, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(719180),
        n = e.i(814976),
        s = e.i(511762);
    e.s(["LostCardInline", 0, function(e) {
        var i = e.card,
            l = e.enablePopover,
            c = i.data.rarity,
            o = c ? "rarity-".concat(c) : "",
            d = (0, s.getLostSwordCardImageUrl)(i);
        return (0, a.jsx)(t.CustomPopover, {
            enabled: void 0 === l || l,
            customClass: "character-hover-box lost-card",
            popover: (0, a.jsx)(n.LostCardPopover, {
                card: i
            }),
            children: (0, a.jsxs)("span", {
                className: "inline-card-lost ".concat(o).trim(),
                children: [(0, a.jsx)("span", {
                    className: "avatar lost lost-inline-card ".concat(o).trim(),
                    children: (0, a.jsx)(r.default, {
                        className: "disable-transition",
                        src: d,
                        alt: i.name,
                        width: 32,
                        height: 32,
                        unoptimized: !0
                    })
                }), (0, a.jsx)("span", {
                    className: "inline-name",
                    children: i.name
                })]
            })
        })
    }])
}, 814976, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(480588);
    e.s(["LostCardPopover", 0, function(e) {
        var t = e.card,
            n = t.data.rarity,
            s = t.data.skill_effect || "";
        return (0, a.jsxs)("div", {
            className: "pw-card-popover lost-card",
            children: [(0, a.jsx)("h5", {
                className: "rarity-".concat(n),
                children: t.name
            }), (0, a.jsx)("hr", {}), (0, a.jsxs)("div", {
                className: "text",
                children: [!s && (0, a.jsx)("p", {
                    children: "-"
                }), s && (0, a.jsx)("p", {
                    className: "skill-with-coloring",
                    dangerouslySetInnerHTML: {
                        __html: (0, r.richTextToHtml)(s)
                    }
                })]
            })]
        })
    }])
}, 769577, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(817376),
        s = e.i(511762);
    e.s(["LostCharacterCard", 0, function(e) {
        var i = e.character,
            l = e.showLabel,
            c = void 0 === l || l,
            o = e.showIcon,
            d = void 0 === o || o,
            m = e.enablePopover,
            h = e.disablePrefetch,
            g = (0, s.getLostSwordCharacterImageUrl)(i, "card"),
            u = i.data.rarity,
            p = i.data.element,
            v = i.data.class,
            f = i.data.position,
            x = i.data.is_new;
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: i.name,
            slug: i.slug,
            imageUrl: g,
            gameSlug: "lost",
            routePrefix: "lost-sword",
            imageWidth: 140,
            imageHeight: 180,
            avatarExtraClass: "rarity-".concat(u).concat(c ? " show-label" : ""),
            showLabel: c,
            enablePopover: void 0 !== m && m,
            popoverClass: "lost",
            popoverContent: (0, a.jsx)(n.LostCharacterPopover, {
                character: i
            }),
            disablePrefetch: h,
            renderFloatingElements: function() {
                return d ? (0, a.jsxs)("span", {
                    className: "floating-element lost",
                    children: [p ? (0, a.jsx)("div", {
                        className: "element",
                        children: (0, a.jsx)(r.default, {
                            src: (0, s.getLostSwordIconUrl)("element", p),
                            alt: p,
                            width: 24,
                            height: 24,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }) : null, v ? (0, a.jsx)("div", {
                        className: "class",
                        children: (0, a.jsx)(r.default, {
                            src: (0, s.getLostSwordIconUrl)("class", v),
                            alt: v,
                            width: 24,
                            height: 24,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }) : null, f ? (0, a.jsx)("div", {
                        className: "class",
                        children: (0, a.jsx)(r.default, {
                            src: (0, s.getLostSwordIconUrl)("position", f),
                            alt: f,
                            width: 24,
                            height: 24,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }) : null]
                }) : null
            },
            renderAfterLabel: function() {
                return c && x ? (0, a.jsx)("span", {
                    className: "tag new",
                    children: "New"
                }) : null
            }
        })
    }])
}, 287714, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(817376),
        n = e.i(511762);
    e.s(["LostCharacterInline", 0, function(e) {
        var s = e.character,
            i = e.enablePopover,
            l = (0, n.getLostSwordCharacterImageUrl)(s, "small"),
            c = s.data.rarity;
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: s.name,
            slug: s.slug,
            imageUrl: l,
            gameSlug: "lost",
            routePrefix: "lost-sword",
            variantClass: "rarity-".concat(c),
            imageWidth: 40,
            imageHeight: 40,
            enablePopover: i,
            popoverContent: (0, a.jsx)(t.LostCharacterPopover, {
                character: s
            })
        })
    }])
}, 817376, e => {
    "use strict";
    var a = e.i(524906),
        r = e.i(843476),
        t = e.i(657688),
        n = e.i(209962),
        s = e.i(511762),
        i = e.i(952949),
        l = e.i(440904);
    e.i(706280);
    var c = e.i(76874);
    e.s(["LostCharacterPopover", 0, function(e) {
        var o = e.character,
            d = o.data.rarity,
            m = o.data.element,
            h = o.data.class,
            g = o.data.position,
            u = o.data.ratings,
            p = Array.isArray(u) ? u : u && (void 0 === u ? "undefined" : (0, a._)(u)) === "object" ? [u] : [],
            v = p.find(function(e) {
                return e.isDefault
            }) || p[0] || null,
            f = v && !((0, c.isPlaceholderRating)(v.PVE) && (0, c.isPlaceholderRating)(v.Raids) && (0, c.isPlaceholderRating)(v.PVP) && (0, c.isPlaceholderRating)(v.Brawl)) ? v : null,
            x = (0, s.getLostSwordCharacterImageUrl)(o, "small"),
            j = "Front" === g ? "forward" : "Middle" === g ? "center" : "backward";
        return (0, r.jsx)(i.BaseCharacterPopover, {
            gameClass: "lost",
            avatarClass: "lost rarity-".concat(d),
            imageUrl: x,
            imageAlt: o.name,
            imageSize: {
                width: 100,
                height: 100
            },
            name: o.name,
            detailsUrl: "/lost-sword/characters/".concat(o.slug),
            renderBadges: function() {
                return (0, r.jsxs)(r.Fragment, {
                    children: [d ? (0, r.jsxs)("div", {
                        className: "lost-rarity rarity-".concat(d),
                        children: [d, "★"]
                    }) : null, m ? (0, r.jsx)("div", {
                        className: "lost-element ".concat(m),
                        children: (0, r.jsx)(t.default, {
                            src: (0, s.getLostSwordIconUrl)("element", m),
                            alt: m,
                            width: 32,
                            height: 32,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }) : null, h ? (0, r.jsx)("div", {
                        className: "lost-class ".concat(h),
                        children: (0, r.jsx)(t.default, {
                            src: (0, s.getLostSwordIconUrl)("class", h),
                            alt: h,
                            width: 32,
                            height: 32,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }) : null, g ? (0, r.jsx)("div", {
                        className: "lost-formation ".concat(g),
                        children: (0, r.jsx)(t.default, {
                            src: (0, s.getLostSwordIconUrl)("position", j),
                            alt: g,
                            width: 32,
                            height: 32,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }) : null]
                })
            },
            renderRatings: function() {
                return f ? (0, r.jsxs)(r.Fragment, {
                    children: [(0, r.jsxs)("p", {
                        className: "lost-role",
                        children: ["Some characters can be played in ", (0, r.jsx)("strong", {
                            children: "multiple roles"
                        }), ", and in that case we only show the ratings for the primary one. Check the profile for the others."]
                    }), (0, r.jsxs)("h6", {
                        className: "role-lost",
                        children: ["Role: ", (0, r.jsx)("strong", {
                            className: " ".concat(f.role),
                            children: f.role
                        })]
                    }), (0, r.jsxs)("div", {
                        className: "bottom lost-top",
                        children: [(0, r.jsx)(n.RatingBox, {
                            game: "lost-sword",
                            rating: f.PVE,
                            ratingName: "PVE"
                        }), (0, r.jsx)(n.RatingBox, {
                            game: "lost-sword",
                            rating: f.Raids,
                            ratingName: "Raids"
                        })]
                    }), (0, r.jsxs)("div", {
                        className: "bottom lost-bottom",
                        children: [(0, r.jsx)(n.RatingBox, {
                            game: "lost-sword",
                            rating: f.PVP,
                            ratingName: "PVP"
                        }), (0, r.jsx)(n.RatingBox, {
                            game: "lost-sword",
                            rating: f.Brawl,
                            ratingName: "Brawl"
                        })]
                    })]
                }) : (0, r.jsx)(l.RatingsUnavailable, {})
            }
        })
    }])
}, 120215, 391340, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(719180),
        n = e.i(480588);

    function s(e) {
        var r = e.pet,
            t = r.data.rarity,
            s = r.data.skill_effect || "";
        return (0, a.jsxs)("div", {
            className: "pw-card-popover lost-card",
            children: [(0, a.jsx)("h5", {
                className: "rarity-".concat(t),
                children: r.name
            }), (0, a.jsx)("hr", {}), (0, a.jsxs)("div", {
                className: "text",
                children: [!s && (0, a.jsx)("p", {
                    children: "-"
                }), s && (0, a.jsx)("p", {
                    className: "skill-with-coloring",
                    dangerouslySetInnerHTML: {
                        __html: (0, n.richTextToHtml)(s)
                    }
                })]
            })]
        })
    }
    e.s(["LostPetPopover", 0, s], 391340);
    var i = e.i(511762);
    e.s(["LostPetCard", 0, function(e) {
        var n = e.pet,
            l = e.showLabel,
            c = n.data.rarity,
            o = (0, i.getPetImageUrl)(n);
        return (0, a.jsxs)(t.CustomPopover, {
            enabled: !0,
            customClass: "character-hover-box lost-card",
            popover: (0, a.jsx)(s, {
                pet: n
            }),
            children: [(0, a.jsx)("div", {
                className: "avatar pw-card lost rarity-".concat(c, " ").concat(l ? "show-label" : ""),
                children: (0, a.jsx)(r.default, {
                    src: o,
                    alt: n.name,
                    width: 100,
                    height: 150,
                    className: "disable-transition",
                    style: {
                        width: "100%",
                        height: "auto"
                    },
                    unoptimized: !0
                })
            }), l && (0, a.jsx)("span", {
                className: "emp-name",
                children: n.name
            })]
        })
    }], 120215)
}, 677427, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(719180),
        n = e.i(391340),
        s = e.i(511762);
    e.s(["LostPetInline", 0, function(e) {
        var i = e.pet,
            l = e.enablePopover,
            c = i.data.rarity,
            o = c ? "rarity-".concat(c) : "",
            d = (0, s.getPetImageUrl)(i);
        return (0, a.jsx)(t.CustomPopover, {
            enabled: void 0 === l || l,
            customClass: "character-hover-box lost-card",
            popover: (0, a.jsx)(n.LostPetPopover, {
                pet: i
            }),
            children: (0, a.jsxs)("span", {
                className: "inline-pet-lost ".concat(o).trim(),
                children: [(0, a.jsx)("span", {
                    className: "avatar lost lost-inline-pet ".concat(o).trim(),
                    children: (0, a.jsx)(r.default, {
                        className: "disable-transition",
                        src: d,
                        alt: i.name,
                        width: 32,
                        height: 32,
                        unoptimized: !0
                    })
                }), (0, a.jsx)("span", {
                    className: "inline-name",
                    children: i.name
                })]
            })
        })
    }])
}, 399610, 50437, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(473668),
        n = e.i(683239),
        s = e.i(719180),
        i = e.i(768182),
        l = e.i(817376),
        c = e.i(511762);

    function o(e) {
        var r = e.character,
            t = e.showLabel,
            s = void 0 === t || t,
            o = e.tags,
            d = e.cost,
            m = e.enablePopover,
            h = (0, c.getLostSwordCharacterImageUrl)(r, "small"),
            g = r.data.rarity;
        return (0, a.jsx)(i.BaseCharacterIcon, {
            name: r.name,
            slug: r.slug,
            image: h,
            gameSlug: "lost",
            href: "/lost-sword/characters/".concat(r.slug),
            rarity: String(g),
            avatarExtraClass: s ? "show-label" : "",
            imageSize: 80,
            showLabel: s,
            enablePopover: m,
            popoverContent: (0, a.jsx)(l.LostCharacterPopover, {
                character: r
            }),
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [d && (0, a.jsx)("span", {
                        className: "tag invest",
                        children: "$"
                    }), o && (0, a.jsx)("div", {
                        className: "tier-list-tags",
                        dangerouslySetInnerHTML: {
                            __html: (0, n.sanitizeGameContent)(o || "")
                        }
                    })]
                })
            }
        })
    }
    e.s(["LostCharacterIcon", 0, o], 50437);
    var d = e.i(814976),
        m = e.i(120215),
        h = e.i(480588),
        g = e.i(975157);
    e.s(["LostTeamBox", 0, function(e) {
        var i = e.team,
            l = e.characters,
            u = e.pets,
            p = e.cards,
            v = void 0 === p ? [] : p,
            f = e.index,
            x = e.tabId,
            j = i.data.name || i.name,
            w = i.data.mode,
            b = i.data.front || [],
            C = i.data.mid || [],
            y = i.data.rear || [],
            N = i.data.explanation,
            _ = i.data.ult_order,
            P = i.data.equipment_and_invest,
            S = i.data.substitutes,
            I = i.data.updated_date,
            R = function() {
                if (!I) return null;
                var e = new Date(I.includes("T") ? I : I + "T00:00:00");
                return isNaN(e.getTime()) ? null : (0, g.formatDate)(e)
            }(),
            L = (0, h.richTextToHtml)(N),
            A = (0, h.richTextToHtml)(P),
            k = (0, h.richTextToHtml)(S),
            z = "string" == typeof _ ? _ : (0, h.richTextToHtml)(_),
            E = function(e) {
                return l.find(function(a) {
                    return a.slug === e
                })
            },
            U = function(e) {
                var t, n = E(e.character);
                if (!n) return null;
                var i = e.card ? (t = e.card, v.find(function(e) {
                    return e.name === t
                })) : void 0;
                return (0, a.jsxs)("div", {
                    className: "single-char",
                    children: [(0, a.jsx)(o, {
                        character: n,
                        showLabel: !1,
                        enablePopover: !0
                    }), e.card && (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsx)("p", {
                            children: "+"
                        }), i ? (0, a.jsx)(s.CustomPopover, {
                            enabled: !0,
                            customClass: "character-hover-box lost-card",
                            popover: (0, a.jsx)(d.LostCardPopover, {
                                card: i
                            }),
                            children: (0, a.jsx)("div", {
                                className: "avatar pw-card lost rarity-".concat(i.data.rarity),
                                children: (0, a.jsx)(r.default, {
                                    src: (0, c.getLostSwordCardImageUrl)(i),
                                    alt: e.card,
                                    width: 60,
                                    height: 80,
                                    unoptimized: !0,
                                    className: "disable-transition",
                                    style: {
                                        width: "100%",
                                        height: "auto"
                                    }
                                })
                            })
                        }) : (0, a.jsx)("div", {
                            className: "pw-card-name",
                            children: e.card
                        })]
                    })]
                }, e.character)
            },
            F = function(e) {
                var r = E(e);
                return r ? (0, a.jsx)(o, {
                    character: r,
                    showLabel: !1,
                    enablePopover: !0
                }, e) : null
            },
            T = null != x ? x : void 0 !== f ? "team_".concat(f) : "team_".concat(i.id.slice(-8));
        return (0, a.jsxs)("div", {
            className: "box lost-team",
            children: [(0, a.jsxs)("div", {
                className: "team-header",
                children: [(0, a.jsx)("div", {
                    className: "skill-icon rarity-5",
                    children: void 0 !== f ? "Team ".concat(f) : "Team"
                }), (0, a.jsxs)("div", {
                    className: "skill-info",
                    children: [(0, a.jsx)("p", {
                        className: "skill-name",
                        children: j
                    }), (0, a.jsxs)("p", {
                        className: "skill-type",
                        children: ["Mode: ", (0, a.jsx)("strong", {
                            children: w || "N/A"
                        }), " || Date Added:", " ", (0, a.jsx)("strong", {
                            children: R || "N/A"
                        })]
                    })]
                })]
            }), (0, a.jsx)("div", {
                className: "team-details",
                children: (0, a.jsxs)(t.Tabs, {
                    defaultActiveKey: "team",
                    id: T,
                    className: "mb-4",
                    children: [(0, a.jsxs)(t.Tab, {
                        eventKey: "team",
                        title: "Team Info",
                        children: [(0, a.jsx)("h6", {
                            children: "Characters"
                        }), (0, a.jsxs)("div", {
                            className: "lost-team-with-card",
                            children: [y.map(function(e) {
                                return U(e)
                            }), C.map(function(e) {
                                return U(e)
                            }), b.map(function(e) {
                                return U(e)
                            })]
                        }), "PVP" !== w && i.data.pets && i.data.pets.length > 0 && (0, a.jsxs)(a.Fragment, {
                            children: [(0, a.jsx)("h6", {
                                children: "Pets"
                            }), (0, a.jsx)("div", {
                                className: "pets",
                                children: (0, a.jsx)("div", {
                                    className: "lost-team-with-card pets",
                                    children: i.data.pets.map(function(e) {
                                        var r = u.find(function(a) {
                                            return a.name === e
                                        });
                                        return r ? (0, a.jsx)("div", {
                                            className: "single-char",
                                            children: (0, a.jsx)(m.LostPetCard, {
                                                pet: r
                                            })
                                        }, e) : null
                                    })
                                })
                            })]
                        }), (0, a.jsx)("h6", {
                            children: "About the team"
                        }), L ? (0, a.jsx)("p", {
                            dangerouslySetInnerHTML: {
                                __html: (0, n.sanitizeGameContent)(L || "")
                            }
                        }) : (0, a.jsx)("p", {
                            children: "-"
                        }), (0, a.jsx)("h6", {
                            children: "Ultimate order"
                        }), z ? (0, a.jsx)("p", {
                            dangerouslySetInnerHTML: {
                                __html: (0, n.sanitizeGameContent)(z || "")
                            }
                        }) : (0, a.jsx)("p", {
                            children: "-"
                        }), (0, a.jsx)("h6", {
                            children: "Gear & Investment"
                        }), A ? (0, a.jsx)("p", {
                            dangerouslySetInnerHTML: {
                                __html: (0, n.sanitizeGameContent)(A || "")
                            }
                        }) : (0, a.jsx)("p", {
                            children: "-"
                        }), (0, a.jsx)("h6", {
                            children: "Substitutions"
                        }), k ? (0, a.jsx)("p", {
                            dangerouslySetInnerHTML: {
                                __html: (0, n.sanitizeGameContent)(k || "")
                            }
                        }) : (0, a.jsx)("p", {
                            children: "-"
                        })]
                    }), (0, a.jsx)(t.Tab, {
                        eventKey: "visual",
                        title: "Visual Formation",
                        children: (0, a.jsxs)("div", {
                            className: "lost-visual-team",
                            children: [(0, a.jsxs)("div", {
                                className: "back-row",
                                children: [(0, a.jsx)("p", {
                                    children: "Back Row"
                                }), (0, a.jsx)("div", {
                                    className: "characters-inside",
                                    children: y.map(function(e) {
                                        return F(e.character)
                                    })
                                })]
                            }), (0, a.jsxs)("div", {
                                className: "mid-row",
                                children: [(0, a.jsx)("p", {
                                    children: "Mid Row"
                                }), (0, a.jsx)("div", {
                                    className: "characters-inside",
                                    children: C.map(function(e) {
                                        return F(e.character)
                                    })
                                })]
                            }), (0, a.jsxs)("div", {
                                className: "front-row",
                                children: [(0, a.jsx)("p", {
                                    children: "Front Row"
                                }), (0, a.jsx)("div", {
                                    className: "characters-inside",
                                    children: b.map(function(e) {
                                        return F(e.character)
                                    })
                                })]
                            })]
                        })
                    })]
                })
            })]
        })
    }], 399610)
}, 483543, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(609775),
        s = e.i(150236),
        i = (0, e.i(976921).getGameCdnUrl)("nte");
    e.s(["NTECharacterCard", 0, function(e) {
        var l = e.character,
            c = e.showLabel,
            o = e.showIcon,
            d = e.enablePopover,
            m = e.tierRatings,
            h = e.disablePrefetch,
            g = (0, s.useNTEData)().tierRatings,
            u = null != m ? m : g.get(l.slug),
            p = l.card_image || "".concat(i, "/characters/").concat(l.slug, "_card.webp");
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: l.name,
            slug: l.slug,
            imageUrl: p,
            gameSlug: "nte",
            routePrefix: "neverness-to-everness",
            imageWidth: 140,
            imageHeight: 176,
            avatarExtraClass: "rarity-".concat(l.rarity),
            showLabel: c,
            enablePopover: d,
            popoverClass: "chaos",
            popoverContent: (0, a.jsx)(n.NTEPopover, {
                character: l,
                ratings: u
            }),
            disablePrefetch: h,
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [c && l.is_new && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    }), c && l.is_upcoming && (0, a.jsx)("span", {
                        className: "tag future",
                        children: l.release_patch || "Soon"
                    })]
                })
            },
            renderAfterAvatar: function() {
                if (!o) return null;
                var e = l.element && "unknown" !== l.element.toLowerCase(),
                    t = l.role && "unknown" !== l.role.toLowerCase();
                return e || t ? (0, a.jsxs)("span", {
                    className: "floating-element",
                    children: [e && (0, a.jsx)("div", {
                        className: "element",
                        children: (0, a.jsx)(r.default, {
                            src: "".concat(i, "/icons/element_").concat(l.element.toLowerCase(), ".webp"),
                            alt: l.element,
                            className: "faction-icon",
                            width: 22,
                            height: 22,
                            unoptimized: !0
                        })
                    }), t && (0, a.jsx)("div", {
                        className: "role",
                        children: (0, a.jsx)(r.default, {
                            src: "".concat(i, "/icons/role_").concat(l.role.toLowerCase(), ".webp"),
                            alt: l.role,
                            className: "faction-icon",
                            width: 22,
                            height: 22,
                            unoptimized: !0
                        })
                    })]
                }) : null
            }
        })
    }])
}, 459512, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(149721),
        n = e.i(468757),
        s = e.i(768182),
        i = e.i(609775),
        l = e.i(150236),
        c = (0, e.i(976921).getGameCdnUrl)("nte");
    e.s(["NTECharacterIcon", 0, function(e) {
        var o = e.character,
            d = e.showLabel,
            m = e.showIcon,
            h = e.enablePopover,
            g = e.disableLink,
            u = e.tierRatings,
            p = e.tierDupes,
            v = e.tierTags,
            f = e.tierMarks,
            x = (0, l.useNTEData)().tierRatings,
            j = null != u ? u : x.get(o.slug),
            w = "".concat(c, "/characters/").concat(o.slug, "_small.webp"),
            b = v ? v.split(",").map(function(e) {
                return e.trim()
            }).filter(Boolean) : [],
            C = f ? f.split(",").map(function(e) {
                return e.trim()
            }).filter(Boolean) : [];
        return (0, a.jsx)(s.BaseCharacterIcon, {
            name: o.name,
            slug: o.slug,
            image: w,
            gameSlug: "nte",
            rarity: o.rarity,
            imageSize: 94,
            imageResponsive: !1,
            href: "/neverness-to-everness/characters/".concat(o.slug),
            disableLink: g,
            popoverClass: "chaos",
            showLabel: d,
            enablePopover: h,
            popoverContent: (0, a.jsx)(i.NTEPopover, {
                character: o,
                ratings: j
            }),
            renderFloatingElements: function() {
                var e = o.element && "unknown" !== o.element.toLowerCase(),
                    t = o.role && "unknown" !== o.role.toLowerCase(),
                    n = m && (e || t);
                return n || p ? (0, a.jsxs)(a.Fragment, {
                    children: [n && (0, a.jsxs)("span", {
                        className: "floating-element",
                        children: [e && (0, a.jsx)("div", {
                            className: "element",
                            children: (0, a.jsx)(r.default, {
                                src: "".concat(c, "/icons/element_").concat(o.element.toLowerCase(), ".webp"),
                                alt: o.element,
                                className: "faction-icon",
                                width: 22,
                                height: 22,
                                unoptimized: !0
                            })
                        }), t && (0, a.jsx)("div", {
                            className: "role",
                            children: (0, a.jsx)(r.default, {
                                src: "".concat(c, "/icons/role_").concat(o.role.toLowerCase(), ".webp"),
                                alt: o.role,
                                className: "faction-icon",
                                width: 22,
                                height: 22,
                                unoptimized: !0
                            })
                        })]
                    }), p && (0, a.jsx)("span", {
                        className: "floating-element dupes ".concat("S" === o.rarity ? "rar-S" : "rar-A"),
                        children: p
                    })]
                }) : null
            },
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [d && o.is_new && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    }), d && o.is_upcoming && (0, a.jsx)("span", {
                        className: "tag future",
                        children: o.release_patch || "Soon"
                    }), C.length > 0 && (0, a.jsxs)("div", {
                        className: "floating-right-corner",
                        children: [C.includes("new") && (0, a.jsx)("span", {
                            className: "item new",
                            children: "NEW"
                        }), C.includes("up") && (0, a.jsx)("span", {
                            className: "item up",
                            children: (0, a.jsx)(t.FontAwesomeIcon, {
                                icon: n.faArrowUp,
                                width: "18"
                            })
                        }), C.includes("down") && (0, a.jsx)("span", {
                            className: "item down",
                            children: (0, a.jsx)(t.FontAwesomeIcon, {
                                icon: n.faArrowDown,
                                width: "18"
                            })
                        }), C.includes("watch") && (0, a.jsx)("span", {
                            className: "item watchlist",
                            children: (0, a.jsx)(t.FontAwesomeIcon, {
                                icon: n.faEye,
                                width: "18"
                            })
                        })]
                    }), b.length > 0 && (0, a.jsx)("div", {
                        className: "tier-list-tags",
                        children: b.map(function(e, r) {
                            return (0, a.jsx)("span", {
                                className: "single-tag ".concat(e),
                                children: r === b.length - 1 ? e : "".concat(e, ", ")
                            }, "".concat(e, "-").concat(r))
                        })
                    })]
                })
            }
        })
    }])
}, 593528, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(609775),
        n = e.i(150236),
        s = (0, e.i(976921).getGameCdnUrl)("nte");
    e.s(["NTECharacterInline", 0, function(e) {
        var i = e.character,
            l = e.enablePopover,
            c = e.ratings,
            o = (0, n.useNTEData)().tierRatings,
            d = null != c ? c : o.get(i.slug),
            m = "".concat(s, "/characters/").concat(i.slug, "_small.webp");
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: i.name,
            slug: i.slug,
            imageUrl: m,
            gameSlug: "nte",
            routePrefix: "neverness-to-everness",
            variantClass: "rarity-".concat(i.rarity),
            imageWidth: 45,
            imageHeight: 38,
            popoverClass: "chaos",
            enablePopover: l,
            popoverContent: (0, a.jsx)(t.NTEPopover, {
                character: i,
                ratings: d
            })
        })
    }])
}, 150236, e => {
    "use strict";
    var a = e.i(843476),
        r = (0, e.i(60533).createGameDataContext)({
            characters: [],
            arcs: [],
            modules: [],
            sets: [],
            esperCycles: [],
            esperCyclePassives: [],
            effects: [],
            tierRatings: new Map
        }),
        t = r.Provider,
        n = r.useData;
    e.s(["NTEDataProvider", 0, function(e) {
        var r = e.characters,
            n = e.arcs,
            s = e.modules,
            i = e.sets,
            l = e.esperCycles,
            c = e.esperCyclePassives,
            o = e.effects,
            d = e.tierRatings,
            m = e.children;
        return (0, a.jsx)(t, {
            value: {
                characters: void 0 === r ? [] : r,
                arcs: void 0 === n ? [] : n,
                modules: void 0 === s ? [] : s,
                sets: void 0 === i ? [] : i,
                esperCycles: void 0 === l ? [] : l,
                esperCyclePassives: void 0 === c ? [] : c,
                effects: void 0 === o ? [] : o,
                tierRatings: null != d ? d : new Map
            },
            children: m
        })
    }, "useNTEData", 0, n])
}, 609775, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(149721),
        n = e.i(468757),
        s = e.i(952949),
        i = e.i(440904),
        l = e.i(209962),
        c = (0, e.i(976921).getGameCdnUrl)("nte");

    function o(e) {
        var r = e.category,
            s = e.dupes,
            i = s ? " [".concat(s, "]") : "";
        return "DPS" === r ? (0, a.jsxs)("h6", {
            className: "nte-small-role dps",
            children: [(0, a.jsx)(t.FontAwesomeIcon, {
                icon: n.faHandFist,
                width: "18"
            }), " Damage", i]
        }) : "Hybrid" === r ? (0, a.jsxs)("h6", {
            className: "nte-small-role sdps",
            children: [(0, a.jsx)(t.FontAwesomeIcon, {
                icon: n.faVirus,
                width: "18"
            }), " Hybrid", i]
        }) : "Support" === r ? (0, a.jsxs)("h6", {
            className: "nte-small-role amplifier",
            children: [(0, a.jsx)(t.FontAwesomeIcon, {
                icon: n.faFlask,
                width: "18"
            }), " Support", i]
        }) : null
    }
    e.s(["NTEPopover", 0, function(e) {
        var t = e.character,
            n = e.ratings,
            d = "".concat(c, "/characters/").concat(t.slug, "_small.webp"),
            m = n && n.length > 0;
        return (0, a.jsx)(s.BaseCharacterPopover, {
            gameClass: "nte",
            avatarClass: "nte rarity-".concat(t.rarity),
            imageUrl: d,
            imageAlt: t.name,
            imageSize: {
                width: 60,
                height: 60
            },
            name: t.name,
            detailsUrl: "/neverness-to-everness/characters/".concat(t.slug),
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: ["Unknown" !== t.rarity && (0, a.jsx)("div", {
                        className: "nte-rarity rarity-".concat(t.rarity),
                        children: (0, a.jsx)(r.default, {
                            src: "".concat(c, "/icons/rarity_").concat(t.rarity.toLowerCase(), ".webp"),
                            alt: t.rarity,
                            className: "faction-icon",
                            width: 30,
                            height: 30,
                            unoptimized: !0
                        })
                    }), t.element && "Unknown" !== t.element && (0, a.jsxs)("div", {
                        className: "nte-element",
                        children: [(0, a.jsx)(r.default, {
                            src: "".concat(c, "/icons/element_").concat(t.element.toLowerCase(), ".webp"),
                            alt: t.element,
                            className: "faction-icon",
                            width: 30,
                            height: 30,
                            unoptimized: !0
                        }), t.element]
                    }), t.role && "Unknown" !== t.role && (0, a.jsxs)("div", {
                        className: "nte-role",
                        children: [(0, a.jsx)(r.default, {
                            src: "".concat(c, "/icons/role_").concat(t.role.toLowerCase(), ".webp"),
                            alt: t.role,
                            className: "faction-icon",
                            width: 30,
                            height: 30,
                            unoptimized: !0
                        }), t.role]
                    })]
                })
            },
            renderRatings: function() {
                return m ? n.length > 1 ? (0, a.jsx)("div", {
                    className: "special-split",
                    children: n.map(function(e) {
                        return (0, a.jsxs)("div", {
                            className: "column",
                            children: [(0, a.jsx)(o, {
                                category: e.category,
                                dupes: e.dupes
                            }), (0, a.jsx)("div", {
                                className: "bottom full",
                                children: (0, a.jsx)(l.RatingBox, {
                                    game: "hsr",
                                    rating: e.rating,
                                    ratingName: "Endgame PVE"
                                })
                            })]
                        }, "".concat(t.slug, "-").concat(e.category, "-").concat(e.rating, "-").concat(e.dupes))
                    })
                }) : (0, a.jsx)(a.Fragment, {
                    children: n.map(function(e) {
                        return (0, a.jsxs)("div", {
                            children: [(0, a.jsx)(o, {
                                category: e.category,
                                dupes: e.dupes
                            }), (0, a.jsx)("div", {
                                className: "bottom full",
                                children: (0, a.jsx)(l.RatingBox, {
                                    game: "hsr",
                                    rating: e.rating,
                                    ratingName: "Endgame PVE"
                                })
                            })]
                        }, "".concat(t.slug, "-").concat(e.category, "-").concat(e.rating, "-").concat(e.dupes))
                    })
                }) : (0, a.jsx)(i.RatingsUnavailable, {})
            }
        })
    }])
}, 343667, 678576, 809334, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(324307),
        s = e.i(856058),
        i = e.i(209962),
        l = e.i(952949),
        c = e.i(440904);
    e.i(706280);
    var o = e.i(76874),
        d = function(e) {
            var t = e.character,
                d = (0, s.usePersonaRatings)().find(function(e) {
                    return e.slug === t.slug
                }) || null,
                m = d && !((0, o.isPlaceholderRating)(d.global_general) && (0, o.isPlaceholderRating)(d.global_bossing) && (0, o.isPlaceholderRating)(d.cn_general) && (0, o.isPlaceholderRating)(d.cn_bossing)) ? d : null,
                h = m && (!(0, o.isPlaceholderRating)(m.global_general) || !(0, o.isPlaceholderRating)(m.global_bossing)),
                g = m && (!(0, o.isPlaceholderRating)(m.cn_general) || !(0, o.isPlaceholderRating)(m.cn_bossing));
            return (0, a.jsx)(l.BaseCharacterPopover, {
                gameClass: "persona",
                avatarClass: "persona rarity-".concat(t.rarity),
                imageUrl: t.smallImage,
                imageAlt: t.name,
                imageSize: {
                    width: 60,
                    height: 60
                },
                name: t.name,
                detailsUrl: "/persona-5x/characters/".concat(t.slug),
                renderBadges: function() {
                    return (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsxs)("div", {
                            className: "persona-rarity rarity-".concat(t.rarity),
                            children: [t.rarity, "✯"]
                        }), "None" !== t.element && (0, a.jsx)("div", {
                            className: "persona-element ".concat(t.element),
                            children: (0, a.jsx)(r.default, {
                                src: (0, n.getElementIconUrl)(t.element),
                                alt: t.element,
                                className: "icon-img",
                                width: 32,
                                height: 32,
                                unoptimized: !0
                            })
                        }), (0, a.jsx)("div", {
                            className: "persona-job ".concat(t.job),
                            children: (0, a.jsx)(r.default, {
                                src: (0, n.getJobIconUrl)(t.job),
                                alt: t.job,
                                className: "icon-img",
                                width: 32,
                                height: 32,
                                unoptimized: !0
                            })
                        })]
                    })
                },
                renderRatings: function() {
                    return m ? (0, a.jsxs)(a.Fragment, {
                        children: [h && (0, a.jsxs)("div", {
                            className: "bottom afk-top",
                            children: [!(0, o.isPlaceholderRating)(m.global_general) && (0, a.jsx)(i.RatingBox, {
                                game: "persona",
                                rating: m.global_general,
                                ratingName: "General (Global)"
                            }), !(0, o.isPlaceholderRating)(m.global_bossing) && (0, a.jsx)(i.RatingBox, {
                                game: "persona",
                                rating: m.global_bossing,
                                ratingName: "Bossing (Global)"
                            })]
                        }), g && (0, a.jsxs)("div", {
                            className: "bottom afk-bottom",
                            children: [!(0, o.isPlaceholderRating)(m.cn_general) && (0, a.jsx)(i.RatingBox, {
                                game: "persona",
                                rating: m.cn_general,
                                ratingName: "General (CN)"
                            }), !(0, o.isPlaceholderRating)(m.cn_bossing) && (0, a.jsx)(i.RatingBox, {
                                game: "persona",
                                rating: m.cn_bossing,
                                ratingName: "Bossing (CN)"
                            })]
                        })]
                    }) : (0, a.jsx)(c.RatingsUnavailable, {})
                }
            })
        };
    e.s(["PersonaCharacterPopover", 0, d], 678576);
    var m = e.i(468757),
        h = e.i(149721);
    e.s(["PersonaCharacterCard", 0, function(e) {
        var s = e.character,
            i = e.showLabel,
            l = e.enablePopover,
            c = e.customName,
            o = e.tierDupes,
            g = e.tierCN,
            u = e.tierCurrent,
            p = e.weaponReliant,
            v = e.dupeReliant,
            f = e.level100,
            x = e.disablePrefetch;
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: null != c ? c : s.name,
            slug: s.slug,
            imageUrl: s.cardImage,
            gameSlug: "p5x",
            routePrefix: "persona-5x",
            imageWidth: 140,
            imageHeight: 191,
            avatarExtraClass: "rarity-".concat(s.rarity),
            showLabel: i,
            enablePopover: l,
            popoverClass: "persona",
            popoverContent: (0, a.jsx)(d, {
                character: s
            }),
            wrapClassName: "pw-card avatar-card",
            disablePrefetch: x,
            renderFloatingElements: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [!u && (0, a.jsxs)("span", {
                        className: "floating-element p5x",
                        children: [s.element && "None" !== s.element && (0, a.jsx)("div", {
                            className: "element",
                            children: (0, a.jsx)(r.default, {
                                src: (0, n.getElementIconUrl)(s.element),
                                alt: s.element,
                                className: "icon-img",
                                width: 22,
                                height: 22,
                                unoptimized: !0
                            })
                        }), (0, a.jsx)("div", {
                            className: "class",
                            children: (0, a.jsx)(r.default, {
                                src: (0, n.getJobIconUrl)(s.job),
                                alt: s.job,
                                className: "icon-img",
                                width: 22,
                                height: 22,
                                unoptimized: !0
                            })
                        })]
                    }), u && (0, a.jsxs)(a.Fragment, {
                        children: [(p || v || f) && (0, a.jsxs)("span", {
                            className: "floating-element p5x",
                            children: [p && (0, a.jsx)("div", {
                                className: "element weapon",
                                children: (0, a.jsx)(h.FontAwesomeIcon, {
                                    icon: m.faBaseballBatBall,
                                    width: "18"
                                })
                            }), v && (0, a.jsx)("div", {
                                className: "element dupe",
                                children: (0, a.jsx)(h.FontAwesomeIcon, {
                                    icon: m.faPuzzlePiece,
                                    width: "18"
                                })
                            }), f && (0, a.jsx)("div", {
                                className: "element level100",
                                children: (0, a.jsx)(h.FontAwesomeIcon, {
                                    icon: m.faCrown,
                                    width: "18"
                                })
                            })]
                        }), (0, a.jsx)("span", {
                            className: "floating-element dupes ".concat("cn_general" === u || "cn_bossing" === u ? "on-CN" : ""),
                            children: "cn_general" === u || "cn_bossing" === u ? (0, a.jsx)(a.Fragment, {
                                children: g
                            }) : (0, a.jsx)(a.Fragment, {
                                children: o
                            })
                        })]
                    })]
                })
            },
            renderAfterLabel: function() {
                return (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsxs)("div", {
                        className: "tag-container",
                        children: [i && s.isNew && (0, a.jsx)("span", {
                            className: "tag new",
                            children: "New"
                        }), i && !1 === s.availableInGlobal && (0, a.jsx)("span", {
                            className: "tag future".concat(s.isNew ? " with-new" : ""),
                            children: "CN"
                        })]
                    })
                })
            }
        })
    }], 343667);
    var g = e.i(484216);
    e.s(["PersonaCharacterInline", 0, function(e) {
        var r = e.character,
            t = e.enablePopover;
        return (0, a.jsx)(g.BaseCharacterInline, {
            name: r.name,
            slug: r.slug,
            imageUrl: r.smallImage,
            gameSlug: "p5x",
            routePrefix: "persona-5x",
            linkClass: "inline-character-persona rarity-".concat(r.rarity),
            variantClass: "rarity-".concat(r.rarity),
            imageWidth: 24,
            imageHeight: 24,
            popoverClass: "persona",
            enablePopover: t,
            popoverContent: (0, a.jsx)(d, {
                character: r
            })
        })
    }], 809334)
}, 856058, e => {
    "use strict";
    var a = e.i(843476),
        r = (0, e.i(60533).createGameDataContext)({
            ratings: []
        }),
        t = r.Provider,
        n = r.useData;
    e.s(["PersonaRatingsProvider", 0, function(e) {
        var r = e.ratings,
            n = e.children;
        return (0, a.jsx)(t, {
            value: {
                ratings: r
            },
            children: n
        })
    }, "usePersonaRatings", 0, function() {
        return n().ratings
    }])
}, 311121, 578145, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(615266),
        s = e.i(209962),
        i = function(e) {
            var r = e.rarity;
            return (0, a.jsxs)("div", {
                className: "rev-rarity rarity-".concat(r),
                children: [r, "✦"]
            })
        },
        l = function(e) {
            var t = e.affinity,
                n = e.hideLabel;
            return (0, a.jsxs)("div", {
                className: "rev-afflatus ".concat(t),
                children: ["Star" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/re1999/icons/afl_star.webp",
                        alt: t,
                        width: 24,
                        height: 24,
                        unoptimized: !0
                    })
                }), "Intellect" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/re1999/icons/afl_intellect.webp",
                        alt: t,
                        width: 24,
                        height: 24,
                        unoptimized: !0
                    })
                }), "Mineral" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/re1999/icons/afl_mineral.webp",
                        alt: t,
                        width: 24,
                        height: 24,
                        unoptimized: !0
                    })
                }), "Plant" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/re1999/icons/afl_plant.webp",
                        alt: t,
                        width: 24,
                        height: 24,
                        unoptimized: !0
                    })
                }), "Spirit" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/re1999/icons/afl_spirit.webp",
                        alt: t,
                        width: 24,
                        height: 24,
                        unoptimized: !0
                    })
                }), "Beast" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/re1999/icons/afl_beast.webp",
                        alt: t,
                        width: 24,
                        height: 24,
                        unoptimized: !0
                    })
                }), !n && (0, a.jsx)(a.Fragment, {
                    children: t
                })]
            })
        },
        c = e.i(952949),
        o = e.i(440904);
    e.i(706280);
    var d = e.i(76874),
        m = function(e) {
            var r = e.character,
                t = r.imageSmall ? r.imageSmall : null;
            return (0, a.jsx)(c.BaseCharacterPopover, {
                gameClass: "reverse",
                avatarClass: "reverse rarity-".concat(r.rarity),
                imageUrl: t,
                imageAlt: r.name,
                imageSize: {
                    width: 64,
                    height: 64
                },
                useDetailsWrapper: !1,
                name: r.name,
                detailsUrl: "/re1999/characters/".concat(r.slug),
                renderTags: function() {
                    return (0, a.jsx)(a.Fragment, {
                        children: r.isNew && (0, a.jsx)("span", {
                            className: "tag new",
                            children: "NEW!"
                        })
                    })
                },
                renderBadges: function() {
                    return (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsx)(i, {
                            rarity: r.rarity
                        }), (0, a.jsx)(l, {
                            affinity: r.afflatus
                        }), (0, a.jsx)("div", {
                            className: "rev-rarity ",
                            children: r.damageType
                        })]
                    })
                },
                renderRatings: function() {
                    var e, t = null == (e = r.ratingsNew) ? void 0 : e.base;
                    return "number" != typeof t || (0, d.isPlaceholderRating)(t) ? (0, a.jsx)(o.RatingsUnavailable, {}) : (0, a.jsx)("div", {
                        className: "bottom full",
                        children: (0, a.jsx)(s.RatingBox, {
                            game: "reverse",
                            rating: t,
                            ratingName: "Overall - Euphoria"
                        })
                    })
                }
            })
        };
    e.s(["ReverseCharacterPopover", 0, m], 578145);
    var h = {
        Beast: "https://cdn.prydwen.gg/images/re1999/icons/afl_big_beast.webp",
        Star: "https://cdn.prydwen.gg/images/re1999/icons/afl_big_star.webp",
        Mineral: "https://cdn.prydwen.gg/images/re1999/icons/afl_big_mineral.webp",
        Spirit: "https://cdn.prydwen.gg/images/re1999/icons/afl_big_spirit.webp",
        Intellect: "https://cdn.prydwen.gg/images/re1999/icons/afl_big_intellect.webp",
        Plant: "https://cdn.prydwen.gg/images/re1999/icons/afl_big_plant.webp"
    };
    e.s(["ReverseCharacterCard", 0, function(e) {
        var s, i = e.character,
            l = e.showLabel,
            c = e.showIcon,
            o = e.enablePopover,
            d = e.showTags,
            g = e.tags,
            u = e.showTierListChange,
            p = e.currentTier,
            v = e.disablePrefetch,
            f = h[i.afflatus];
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: i.name,
            slug: i.slug,
            imageUrl: null != (s = i.imageCard) ? s : null,
            gameSlug: "reverse",
            routePrefix: "re1999",
            imageWidth: 160,
            imageHeight: 160,
            avatarExtraClass: "rarity-".concat(i.rarity),
            showLabel: l,
            enablePopover: o,
            popoverClass: "reverse",
            popoverContent: (0, a.jsx)(m, {
                character: i
            }),
            cardClass: "",
            disablePrefetch: v,
            renderBeforeImage: function() {
                return (0, a.jsx)("div", {
                    className: "overlay"
                })
            },
            renderFloatingElements: function() {
                return c && f ? (0, a.jsx)("span", {
                    className: "floating-element reverse",
                    children: (0, a.jsx)(r.default, {
                        src: f,
                        alt: i.afflatus,
                        width: 32,
                        height: 32,
                        unoptimized: !0
                    })
                }) : null
            },
            renderAfterLabel: function() {
                return u ? (0, a.jsxs)("span", {
                    className: "tier-badge-stack",
                    children: ["base" === p && i.tierEuphoria && (0, a.jsx)("span", {
                        className: "tag reverse euphoria",
                        children: i.tierEuphoria
                    }), !i.availableInGlobal && (0, a.jsx)("span", {
                        className: "tag future",
                        children: i.releasePatch
                    }), (0, a.jsx)(n.TierListMarks, {
                        marks: i.marks
                    })]
                }) : null
            },
            renderAfterAvatar: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [g && (0, a.jsx)("p", {
                        className: "tags",
                        children: g
                    }), l && i.isNew && d && ("ezio-auditore" === i.slug || "kassandra" === i.slug || "alexios" === i.slug ? (0, a.jsx)("span", {
                        className: "tag reverse new no-padding",
                        children: "New"
                    }) : (0, a.jsx)("span", {
                        className: "tag reverse new",
                        children: "New"
                    })), l && !i.availableInGlobal && d && (0, a.jsx)("span", {
                        className: "tag future 2",
                        children: i.releasePatch
                    }), !u && !i.availableInGlobal && (0, a.jsx)("span", {
                        className: "tag future 3",
                        children: i.releasePatch
                    })]
                })
            }
        })
    }], 311121)
}, 288474, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(768182),
        t = e.i(578145),
        n = e.i(468757),
        s = e.i(149721),
        i = new Set(["bkornblume", "druvis-iii", "eternity", "lilya", "voyager", "jessica", "lucy", "regulus", "semmelweis", "matilda", "tennant", "jiu-niangzi", "ezra-theodore", "ms-newbabel", "melania", "medicine-pocket", "shamane", "centurion", "getian", "pickles", "an-an-lee", "sotheby"]);
    e.s(["ReverseCharacterIcon", 0, function(e) {
        var l = e.character,
            c = e.showLabel,
            o = e.enablePopover,
            d = e.showTags,
            m = e.tags,
            h = e.showTierListChange,
            g = e.currentTier,
            u = l.imageSmall ? l.imageSmall : null;
        return (0, a.jsx)(r.BaseCharacterIcon, {
            name: l.name,
            slug: l.slug,
            image: u,
            gameSlug: "reverse",
            avatarExtraClass: "small",
            rarity: l.rarity,
            imageSize: 64,
            imageResponsive: !0,
            showLabel: c,
            enablePopover: o,
            popoverClass: "reverse",
            popoverContent: (0, a.jsx)(t.ReverseCharacterPopover, {
                character: l
            }),
            href: "/re1999/characters/".concat(l.slug),
            renderBeforeImage: function() {
                return (0, a.jsx)("div", {
                    className: "overlay"
                })
            },
            renderBeforeLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [h && "base" === g && i.has(l.slug) && (0, a.jsx)("span", {
                        className: "tag reverse euphoria",
                        children: (0, a.jsx)(s.FontAwesomeIcon, {
                            icon: n.faMeteor,
                            width: "18"
                        })
                    }), m && (0, a.jsx)("p", {
                        className: "tags",
                        children: m
                    })]
                })
            },
            renderAfterLabel: function() {
                return (0, a.jsx)(a.Fragment, {
                    children: c && l.isNew && d && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New "
                    })
                })
            }
        })
    }])
}, 420592, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(578145);
    e.s(["RevCharacterInline", 0, function(e) {
        var n = e.character,
            s = e.enablePopover,
            i = n.imageSmall || "https://cdn.prydwen.gg/images/reverse/characters/".concat(n.slug, "_icon.webp");
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: n.name,
            slug: n.slug,
            imageUrl: i,
            gameSlug: "reverse",
            routePrefix: "re1999",
            linkClass: "inline-character-reverse rarity-".concat(n.rarity),
            variantClass: "inline rarity-".concat(n.rarity),
            imageWidth: 32,
            imageHeight: 32,
            enablePopover: s,
            popoverContent: (0, a.jsx)(t.ReverseCharacterPopover, {
                character: n
            })
        })
    }])
}, 735451, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(348845),
        n = e.i(473668),
        s = e.i(683239);
    e.s(["RevPsychubeData", 0, function(e) {
        var i, l, c, o, d, m, h, g, u, p, v, f, x, j, w, b, C, y, N = e.character,
            _ = N.imageSmall ? N.imageSmall : null;
        return (0, a.jsx)(t.Accordion, {
            className: "tier-list-accordion",
            children: (0, a.jsxs)(t.Accordion.Item, {
                eventKey: "0",
                children: [(0, a.jsxs)(t.Accordion.Header, {
                    children: [(0, a.jsx)("div", {
                        className: "avatar",
                        children: _ && (0, a.jsx)(r.default, {
                            className: "disable-transition",
                            src: _,
                            alt: "".concat(N.name),
                            width: 256,
                            height: 256,
                            style: {
                                width: "100%",
                                height: "auto"
                            },
                            unoptimized: !0
                        })
                    }), (0, a.jsxs)("div", {
                        className: "information",
                        children: [(0, a.jsxs)("h2", {
                            className: "name",
                            children: [N.name, " ", N.notAvailableInGlobal && (0, a.jsx)("span", {
                                className: "tag future",
                                children: N.releasePatch
                            }), " ", N.isNew && (0, a.jsx)("span", {
                                className: "tag new",
                                children: "NEW!"
                            }), " "]
                        }), (0, a.jsx)("div", {
                            className: "details",
                            children: (0, a.jsxs)("p", {
                                children: ["Rarity:", " ", (0, a.jsxs)("strong", {
                                    className: "rarity-".concat(N.rarity),
                                    children: [N.rarity, "✦"]
                                })]
                            })
                        })]
                    })]
                }), (0, a.jsx)(t.Accordion.Body, {
                    children: (0, a.jsxs)(n.Tabs, {
                        defaultActiveKey: "amp",
                        id: N.slug,
                        className: "mb-4",
                        children: [(0, a.jsx)(n.Tab, {
                            eventKey: "amp",
                            title: "Amplification",
                            children: N.descriptionLevel1 ? (0, a.jsxs)(a.Fragment, {
                                children: [(0, a.jsxs)("div", {
                                    className: "amp-desc",
                                    children: [(0, a.jsx)("p", {
                                        className: "level",
                                        children: "Lv. 1:"
                                    }), (0, a.jsx)("div", {
                                        className: "details",
                                        children: (0, a.jsx)("div", {
                                            dangerouslySetInnerHTML: {
                                                __html: (0, s.sanitizeGameContent)(N.descriptionLevel1 || "")
                                            }
                                        })
                                    })]
                                }), (0, a.jsx)("hr", {}), (0, a.jsxs)("div", {
                                    className: "amp-desc",
                                    children: [(0, a.jsx)("p", {
                                        className: "level",
                                        children: "Lv. 5:"
                                    }), (0, a.jsx)("div", {
                                        className: "details",
                                        children: (0, a.jsx)("div", {
                                            dangerouslySetInnerHTML: {
                                                __html: (0, s.sanitizeGameContent)(N.descriptionLevel5 || "")
                                            }
                                        })
                                    })]
                                })]
                            }) : (0, a.jsx)("p", {
                                className: "no-effect",
                                children: "This Psychube doesn't grant any special effects to the wearer."
                            })
                        }), (0, a.jsx)(n.Tab, {
                            eventKey: "stats",
                            title: "Stats",
                            children: (0, a.jsx)("div", {
                                className: "pw-table-responsive overflow-x-auto",
                                children: (0, a.jsxs)("table", {
                                    className: "pw-table w-full text-sm text-left border-collapse pw-table-striped pw-table-bordered border cones-list",
                                    children: [(0, a.jsx)("thead", {
                                        children: (0, a.jsxs)("tr", {
                                            children: [(0, a.jsx)("th", {
                                                children: "Stat"
                                            }), (0, a.jsx)("th", {
                                                children: "Lv. 1"
                                            }), (0, a.jsx)("th", {
                                                children: "Lv. 60"
                                            })]
                                        })
                                    }), (0, a.jsxs)("tbody", {
                                        children: [(0, a.jsxs)("tr", {
                                            children: [(0, a.jsx)("td", {
                                                className: "stat",
                                                children: "ATK"
                                            }), (0, a.jsx)("td", {
                                                children: (null == (l = N.stats) || null == (i = l.atk) ? void 0 : i.base) || "-"
                                            }), (0, a.jsx)("td", {
                                                children: (null == (o = N.stats) || null == (c = o.atk) ? void 0 : c.max) || "-"
                                            })]
                                        }), (0, a.jsxs)("tr", {
                                            children: [(0, a.jsx)("td", {
                                                className: "stat",
                                                children: "HP"
                                            }), (0, a.jsx)("td", {
                                                children: (null == (m = N.stats) || null == (d = m.hp) ? void 0 : d.base) || "-"
                                            }), (0, a.jsx)("td", {
                                                children: (null == (g = N.stats) || null == (h = g.hp) ? void 0 : h.max) || "-"
                                            })]
                                        }), (0, a.jsxs)("tr", {
                                            children: [(0, a.jsx)("td", {
                                                className: "stat",
                                                children: "Reality DEF"
                                            }), (0, a.jsx)("td", {
                                                children: (null == (p = N.stats) || null == (u = p.reality_def) ? void 0 : u.base) || "-"
                                            }), (0, a.jsx)("td", {
                                                children: (null == (f = N.stats) || null == (v = f.reality_def) ? void 0 : v.max) || "-"
                                            })]
                                        }), (0, a.jsxs)("tr", {
                                            children: [(0, a.jsx)("td", {
                                                className: "stat",
                                                children: "Mental DEF"
                                            }), (0, a.jsx)("td", {
                                                children: (null == (j = N.stats) || null == (x = j.mental_def) ? void 0 : x.base) || "-"
                                            }), (0, a.jsx)("td", {
                                                children: (null == (b = N.stats) || null == (w = b.mental_def) ? void 0 : w.max) || "-"
                                            })]
                                        }), (null == (y = N.stats) || null == (C = y.custom) ? void 0 : C.name) ? (0, a.jsxs)("tr", {
                                            children: [(0, a.jsx)("td", {
                                                className: "stat",
                                                children: N.stats.custom.name
                                            }), (0, a.jsxs)("td", {
                                                children: [N.stats.custom.base || "-", "%"]
                                            }), (0, a.jsxs)("td", {
                                                children: [N.stats.custom.max || "-", "%"]
                                            })]
                                        }) : null]
                                    })]
                                })
                            })
                        }), (0, a.jsx)(n.Tab, {
                            eventKey: "imp",
                            title: "Impression",
                            children: N.impression ? (0, a.jsx)(a.Fragment, {
                                children: (0, a.jsx)("div", {
                                    className: "amp-desc",
                                    children: (0, a.jsx)("div", {
                                        className: "details",
                                        children: (0, a.jsx)("div", {
                                            dangerouslySetInnerHTML: {
                                                __html: (0, s.sanitizeGameContent)(N.impression || "")
                                            }
                                        })
                                    })
                                })
                            }) : (0, a.jsx)("p", {
                                className: "amp-desc",
                                children: "Impression text isn't available."
                            })
                        }), (0, a.jsxs)(n.Tab, {
                            eventKey: "info",
                            title: "Info",
                            children: [(0, a.jsx)("h5", {
                                children: "Tags"
                            }), (0, a.jsx)("div", {
                                className: "specialities-list",
                                children: N.tags ? N.tags.sort().map(function(e) {
                                    return (0, a.jsx)("span", {
                                        children: e
                                    }, e)
                                }) : (0, a.jsx)("span", {
                                    className: "no-spec",
                                    children: "-"
                                })
                            }), (0, a.jsx)("h5", {
                                children: "Release patch:"
                            }), (0, a.jsx)("div", {
                                className: "specialities-list",
                                children: (0, a.jsx)("span", {
                                    children: N.releasePatch ? N.releasePatch : "1.0"
                                })
                            })]
                        })]
                    })
                })]
            })
        })
    }])
}, 11574, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(134062),
        s = e.i(410020),
        i = e.i(468757),
        l = e.i(149721);
    e.s(["ResoCharacterCard", 0, function(e) {
        var c, o, d = e.character,
            m = e.showLabel,
            h = e.enablePopover,
            g = e.hideIcons,
            u = e.disablePrefetch,
            p = "".concat(s.RESO_CDN_URL, "/characters/").concat(d.slug, "_card.webp");
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: d.name,
            slug: d.slug,
            imageUrl: p,
            gameSlug: "reso",
            routePrefix: "resonance-solstice",
            imageWidth: 188,
            imageHeight: 328,
            avatarExtraClass: null != (c = null == (o = d.rarity) ? void 0 : o.toUpperCase()) ? c : "",
            showLabel: m,
            enablePopover: h,
            popoverClass: "reso",
            popoverContent: (0, a.jsx)(n.ResoCharacterPopover, {
                character: d
            }),
            disablePrefetch: u,
            renderAfterLabel: function() {
                return m ? d.is_new ? (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    }), d.is_limited && (0, a.jsx)("span", {
                        className: "tag limited with-new",
                        children: (0, a.jsx)(l.FontAwesomeIcon, {
                            icon: i.faClock,
                            width: "18"
                        })
                    }), !0 === d.is_future && (0, a.jsx)("span", {
                        className: "tag future with-new",
                        children: "Eternal"
                    })]
                }) : (0, a.jsxs)(a.Fragment, {
                    children: [d.is_limited && (0, a.jsx)("span", {
                        className: "tag limited",
                        children: (0, a.jsx)(l.FontAwesomeIcon, {
                            icon: i.faClock,
                            width: "18"
                        })
                    }), !0 === d.is_future && (0, a.jsx)("span", {
                        className: "tag future",
                        children: "Eternal"
                    })]
                }) : null
            },
            renderAfterAvatar: function() {
                return !g && d.position && "Unknown" !== d.position ? (0, a.jsxs)("span", {
                    className: "floating-element",
                    children: [(0, a.jsx)("div", {
                        className: "position",
                        children: (0, a.jsx)(r.default, {
                            src: "".concat(s.RESO_CDN_URL, "/icons/position_").concat(d.position.toLowerCase(), ".webp"),
                            alt: d.position,
                            className: "faction-icon",
                            width: 20,
                            height: 20,
                            unoptimized: !0
                        })
                    }), d.class && "Unknown" !== d.class && (0, a.jsx)("div", {
                        className: "class",
                        children: (0, a.jsx)(r.default, {
                            src: "".concat(s.RESO_CDN_URL, "/icons/class_").concat(d.class.toLowerCase(), ".webp"),
                            alt: d.class,
                            className: "faction-icon",
                            width: 20,
                            height: 20,
                            unoptimized: !0
                        })
                    })]
                }) : null
            }
        })
    }])
}, 565765, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(768182),
        t = e.i(134062),
        n = e.i(410020);
    e.s(["ResoCharacterIcon", 0, function(e) {
        var s, i, l = e.character,
            c = e.showLabel,
            o = e.enablePopover,
            d = e.disableLink,
            m = "".concat(n.RESO_CDN_URL, "/characters/").concat(l.slug, ".webp");
        return (0, a.jsx)(r.BaseCharacterIcon, {
            name: l.name,
            slug: l.slug,
            image: m,
            gameSlug: "reso",
            href: "/resonance-solstice/characters/".concat(l.slug),
            rarity: null != (s = null == (i = l.rarity) ? void 0 : i.toUpperCase()) ? s : void 0,
            rawRarityClass: !0,
            imageSize: 96,
            imageResponsive: !1,
            showLabel: c,
            disableLink: d,
            enablePopover: o,
            popoverContent: (0, a.jsx)(t.ResoCharacterPopover, {
                character: l
            })
        })
    }])
}, 241898, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(134062),
        n = e.i(410020);
    e.s(["ResoCharacterInline", 0, function(e) {
        var s, i, l, c = e.character,
            o = e.enablePopover,
            d = "".concat(n.RESO_CDN_URL, "/characters/").concat(c.slug, ".webp");
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: c.name,
            slug: c.slug,
            imageUrl: d,
            gameSlug: "reso",
            routePrefix: "resonance-solstice",
            linkClass: "inline-character-reso ".concat(null != (s = null == (i = c.rarity) ? void 0 : i.toUpperCase()) ? s : ""),
            variantClass: null == (l = c.rarity) ? void 0 : l.toUpperCase(),
            imageWidth: 32,
            imageHeight: 32,
            enablePopover: o,
            popoverContent: (0, a.jsx)(t.ResoCharacterPopover, {
                character: c
            })
        })
    }])
}, 134062, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(209962),
        n = e.i(410020),
        s = e.i(952949),
        i = e.i(440904);
    e.i(706280);
    var l = e.i(76874);
    e.s(["ResoCharacterPopover", 0, function(e) {
        var c, o, d = e.character,
            m = "".concat(n.RESO_CDN_URL, "/characters/").concat(d.slug, ".webp");
        return (0, a.jsx)(s.BaseCharacterPopover, {
            gameClass: "reso",
            avatarClass: "reso ".concat(null != (c = null == (o = d.rarity) ? void 0 : o.toUpperCase()) ? c : ""),
            imageUrl: m,
            imageAlt: d.name,
            imageSize: {
                width: 100,
                height: 100
            },
            name: d.name,
            detailsUrl: "/resonance-solstice/characters/".concat(d.slug),
            renderBadges: function() {
                var e, t, s, i;
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsxs)("div", {
                        className: "reso-rarity rarity-".concat(null != (e = null == (s = d.rarity) ? void 0 : s.toUpperCase()) ? e : ""),
                        children: [null != (t = null == (i = d.rarity) ? void 0 : i.toUpperCase()) ? t : "?", "★"]
                    }), d.position && "Unknown" !== d.position && (0, a.jsxs)("div", {
                        className: "reso-class",
                        children: [(0, a.jsx)(r.default, {
                            src: "".concat(n.RESO_CDN_URL, "/icons/position_").concat(d.position.toLowerCase(), ".webp"),
                            alt: d.position,
                            className: "faction-icon",
                            width: 20,
                            height: 20,
                            unoptimized: !0
                        }), d.position]
                    }), d.class && "Unknown" !== d.class && (0, a.jsxs)("div", {
                        className: "reso-class",
                        children: [(0, a.jsx)(r.default, {
                            src: "".concat(n.RESO_CDN_URL, "/icons/class_").concat(d.class.toLowerCase(), ".webp"),
                            alt: d.class,
                            className: "faction-icon",
                            width: 20,
                            height: 20,
                            unoptimized: !0
                        }), d.class]
                    })]
                })
            },
            renderRatings: function() {
                var e = (0, l.isPlaceholderRating)(d.tier_global) && (0, l.isPlaceholderRating)(d.tier_alt);
                return !d.tier_global || e ? (0, a.jsx)(i.RatingsUnavailable, {}) : (0, a.jsxs)("div", {
                    className: "bottom lost-bottom",
                    children: [(0, a.jsx)(t.RatingBox, {
                        game: "reso",
                        rating: d.tier_global,
                        ratingName: "Generic PVE"
                    }), null != d.tier_alt && (0, a.jsx)(t.RatingBox, {
                        game: "reso",
                        rating: d.tier_alt,
                        ratingName: "Eternal Scuffle"
                    })]
                })
            }
        })
    }])
}, 814185, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(719180),
        t = e.i(683239),
        n = function(e) {
            var r = e.item;
            return (0, a.jsx)("div", {
                className: "character-popover bp-item reso",
                children: (0, a.jsxs)("div", {
                    className: "details",
                    children: [(0, a.jsx)("p", {
                        className: "name",
                        children: (0, a.jsx)("span", {
                            className: "emp-name rarity-".concat(r.rarity),
                            children: r.name
                        })
                    }), (0, a.jsx)("div", {
                        className: "bp-item-content",
                        children: r.affix && "" !== r.affix && (0, a.jsx)("p", {
                            className: "skill-with-coloring",
                            dangerouslySetInnerHTML: {
                                __html: (0, t.sanitizeGameContent)(r.affix)
                            }
                        })
                    })]
                })
            })
        };
    e.s(["ResoEqInline", 0, function(e) {
        var t = e.item;
        return (0, a.jsx)(r.CustomPopover, {
            enabled: !0,
            customClass: "character-hover-box reso-eq",
            popover: (0, a.jsx)(n, {
                item: t
            }),
            children: (0, a.jsx)("span", {
                className: "inline-character-reso ".concat(t.rarity),
                children: (0, a.jsx)("span", {
                    className: "inline-name",
                    children: t.name
                })
            })
        })
    }], 814185)
}, 471976, e => {
    "use strict";
    var a = e.i(480388),
        r = e.i(181788),
        t = e.i(843476),
        n = e.i(657688),
        s = e.i(839429),
        i = e.i(719180);

    function l(e) {
        var l = e.name,
            c = e.slug,
            o = e.imageUrl,
            d = e.gameSlug,
            m = e.href,
            h = e.routePrefix,
            g = e.imageWidth,
            u = e.imageHeight,
            p = e.imageResponsive,
            v = e.imageUnoptimized,
            f = e.showLabel,
            x = e.avatarExtraClass,
            j = e.enablePopover,
            w = e.popoverContent,
            b = e.popoverClass,
            C = e.renderBeforeImage,
            y = e.renderFloatingElements,
            N = e.renderAfterLabel,
            _ = e.renderAfterAvatar,
            P = e.disableLink,
            S = e.cardClass,
            I = e.wrapClassName,
            R = null != m ? m : "/".concat(null != h ? h : d, "/characters/").concat(c),
            L = ["avatar", void 0 === S ? "pw-card" : S, d, x, f ? String(f) : ""].filter(Boolean).join(" "),
            A = (0, t.jsxs)(t.Fragment, {
                children: [(0, t.jsxs)("div", {
                    className: L,
                    children: [null == C ? void 0 : C(), o && (0, t.jsx)(n.default, (0, r._)((0, a._)({
                        className: "disable-transition",
                        src: o,
                        alt: l,
                        width: void 0 === g ? 134 : g,
                        height: void 0 === u ? 160 : u
                    }, void 0 !== p && p ? {
                        style: {
                            width: "100%",
                            height: "auto"
                        }
                    } : {}), {
                        unoptimized: void 0 === v || v
                    })), null == y ? void 0 : y(), f && (0, t.jsx)("span", {
                        className: "emp-name",
                        children: l
                    }), null == N ? void 0 : N()]
                }), null == _ ? void 0 : _()]
            }),
            k = P ? (0, t.jsx)("div", {
                style: {
                    pointerEvents: "none"
                },
                children: A
            }) : (0, t.jsx)(s.AppLink, {
                href: R,
                children: A
            }),
            z = I ? (0, t.jsx)("div", {
                className: I,
                children: k
            }) : k;
        return (0, t.jsx)(i.CustomPopover, {
            enabled: j,
            customClass: "character-hover-box ".concat(null != b ? b : d),
            popover: null != w ? w : (0, t.jsx)(t.Fragment, {}),
            children: z
        })
    }
    e.s(["BaseCharacterCard", 0, l, "default", 0, l])
}, 599984, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(683239);
    e.s(["SafeHtml", 0, function(e) {
        var t = e.html,
            n = e.className,
            s = e.as;
        return t ? (0, a.jsx)(void 0 === s ? "div" : s, {
            className: n,
            dangerouslySetInnerHTML: {
                __html: (0, r.sanitizeGameContent)(t)
            }
        }) : null
    }])
}, 72003, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(471976),
        t = e.i(753550),
        n = e.i(506447),
        s = e.i(468757),
        i = e.i(149721);
    e.s(["SilverCharacterCard", 0, function(e) {
        var l = e.character,
            c = e.showLabel,
            o = e.enablePopover,
            d = e.tags,
            m = e.disablePrefetch,
            h = "https://cdn.prydwen.gg/images/silver-and-blood/characters/".concat(l.slug, "_card.webp");
        return (0, a.jsx)(r.BaseCharacterCard, {
            name: l.name,
            slug: l.slug,
            imageUrl: h,
            gameSlug: "silver",
            routePrefix: "silver-and-blood",
            imageWidth: 120,
            imageHeight: 164,
            imageResponsive: !0,
            avatarExtraClass: "rarity-".concat(l.rarity, " ").concat(l.faction),
            showLabel: c,
            enablePopover: o,
            popoverClass: "silver",
            popoverContent: (0, a.jsx)(t.SilverCharacterPopover, {
                character: l
            }),
            disablePrefetch: m,
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [c && l.isLimited && (0, a.jsx)("span", {
                        className: "tag limited",
                        children: (0, a.jsx)(i.FontAwesomeIcon, {
                            icon: s.faClock,
                            width: "18"
                        })
                    }), c && l.isNew && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    })]
                })
            },
            renderAfterAvatar: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsxs)("span", {
                        className: "floating-element",
                        children: [(0, a.jsx)("div", {
                            className: "faction",
                            children: (0, a.jsx)(n.FactionIcon, {
                                faction: l.faction,
                                size: "small"
                            })
                        }), (0, a.jsx)("div", {
                            className: "armor",
                            children: (0, a.jsx)(n.ArmorIcon, {
                                armor: l.armor,
                                size: "small"
                            })
                        })]
                    }), d && (0, a.jsx)("div", {
                        className: "tier-list-tags",
                        children: d.split(",").map(function(e, r) {
                            return (0, a.jsx)("span", {
                                className: "single-tag ".concat(e),
                                children: r === d.split(",").length - 1 ? (0, a.jsx)(a.Fragment, {
                                    children: e
                                }) : (0, a.jsxs)(a.Fragment, {
                                    children: [e, ", "]
                                })
                            }, e.trim() || r)
                        })
                    })]
                })
            }
        })
    }])
}, 231912, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(768182),
        t = e.i(753550);
    e.s(["SilverCharacterIcon", 0, function(e) {
        var n = e.character,
            s = e.showLabel,
            i = e.enablePopover,
            l = "https://cdn.prydwen.gg/images/silver-and-blood/characters/".concat(n.slug, ".webp");
        return (0, a.jsx)(r.BaseCharacterIcon, {
            name: n.name,
            slug: n.slug,
            image: l,
            gameSlug: "silver",
            href: "/silver-and-blood/characters/".concat(n.slug),
            rarity: n.rarity,
            avatarExtraClass: n.faction,
            imageSize: 64,
            imageResponsive: !1,
            showLabel: s,
            enablePopover: i,
            popoverContent: (0, a.jsx)(t.SilverCharacterPopover, {
                character: n
            })
        })
    }])
}, 230842, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(753550);
    e.s(["SilverCharacterInline", 0, function(e) {
        var n, s, i = e.character,
            l = e.enablePopover,
            c = "https://cdn.prydwen.gg/images/silver-and-blood/characters/".concat(i.slug, ".webp");
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: i.name,
            slug: i.slug,
            imageUrl: c,
            gameSlug: "silver",
            routePrefix: "silver-and-blood",
            linkClass: "inline-character-silver rarity-".concat(i.rarity, " ").concat(null != (n = i.faction) ? n : "").trim(),
            variantClass: "rarity-".concat(i.rarity, " ").concat(null != (s = i.faction) ? s : "").trim(),
            imageWidth: 38,
            imageHeight: 38,
            enablePopover: l,
            popoverContent: (0, a.jsx)(t.SilverCharacterPopover, {
                character: i
            })
        })
    }])
}, 753550, 506447, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(209962),
        t = e.i(657688),
        n = e.i(639863);

    function s(e) {
        return "number" == typeof e ? e : n.SILVER_ICON_SIZE[e]
    }

    function i(e) {
        var r = e.position,
            i = e.size,
            l = e.className,
            c = n.SILVER_POSITIONS.find(function(e) {
                return e.value === r
            });
        if (!c) return null;
        var o = s(void 0 === i ? "small" : i);
        return (0, a.jsx)(t.default, {
            src: "".concat(n.SILVER_CDN_BASE, "/icons/").concat(c.icon, ".webp"),
            alt: c.label,
            className: void 0 === l ? "faction-icon" : l,
            width: o,
            height: o
        })
    }

    function l(e) {
        var r = e.faction,
            i = e.size,
            l = e.className,
            c = n.SILVER_FACTIONS.find(function(e) {
                return e.value === r
            });
        if (!c) return null;
        var o = s(void 0 === i ? "small" : i);
        return (0, a.jsx)(t.default, {
            src: "".concat(n.SILVER_CDN_BASE, "/icons/").concat(c.icon, ".webp"),
            alt: c.label,
            className: void 0 === l ? "faction-icon" : l,
            width: o,
            height: o
        })
    }

    function c(e) {
        var r = e.characterClass,
            i = e.size,
            l = e.className,
            c = n.SILVER_CLASSES.find(function(e) {
                return e.value === r
            });
        if (!c) return null;
        var o = s(void 0 === i ? "small" : i);
        return (0, a.jsx)(t.default, {
            src: "".concat(n.SILVER_CDN_BASE, "/icons/").concat(c.icon, ".webp"),
            alt: c.label,
            className: void 0 === l ? "faction-icon" : l,
            width: o,
            height: o
        })
    }

    function o(e) {
        var r = e.armor,
            i = e.size,
            l = e.className,
            c = n.SILVER_ARMORS.find(function(e) {
                return e.value === r
            });
        if (!c) return null;
        var o = s(void 0 === i ? "small" : i);
        return (0, a.jsx)(t.default, {
            src: "".concat(n.SILVER_CDN_BASE, "/icons/").concat(c.icon, ".webp"),
            alt: c.label,
            className: void 0 === l ? "faction-icon" : l,
            width: o,
            height: o
        })
    }
    e.s(["ArmorIcon", 0, o, "ClassIcon", 0, c, "FactionIcon", 0, l, "PositionIcon", 0, i], 506447);
    var d = e.i(952949),
        m = e.i(440904);
    e.i(706280);
    var h = e.i(76874);
    e.s(["SilverCharacterPopover", 0, function(e) {
        var t = e.character,
            n = "https://cdn.prydwen.gg/images/silver-and-blood/characters/".concat(t.slug, ".webp"),
            s = (void 0 !== t.rating_story_deficit || void 0 !== t.rating_boss || void 0 !== t.rating_pvp) && !((0, h.isPlaceholderRating)(t.rating_story_deficit) && (0, h.isPlaceholderRating)(t.rating_boss) && (0, h.isPlaceholderRating)(t.rating_pvp));
        return (0, a.jsx)(d.BaseCharacterPopover, {
            gameClass: "silver",
            avatarClass: "silver rarity-".concat(t.rarity, " ").concat(t.faction),
            imageUrl: n,
            imageAlt: t.name,
            imageSize: {
                width: 64,
                height: 64
            },
            name: t.name,
            detailsUrl: "/silver-and-blood/characters/".concat(t.slug),
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)("div", {
                        className: "silver-rarity rarity-".concat(t.rarity),
                        children: t.rarity
                    }), "Unknown" !== t.faction && (0, a.jsx)("div", {
                        className: "silver-faction ".concat(t.faction),
                        children: (0, a.jsx)(l, {
                            faction: t.faction,
                            size: "small"
                        })
                    }), "Unknown" !== t.class && (0, a.jsx)("div", {
                        className: "silver-faction",
                        children: (0, a.jsx)(c, {
                            characterClass: t.class,
                            size: "small"
                        })
                    }), "Unknown" !== t.position && (0, a.jsx)("div", {
                        className: "silver-faction",
                        children: (0, a.jsx)(i, {
                            position: t.position,
                            size: "small"
                        })
                    }), "Unknown" !== t.armor && (0, a.jsx)("div", {
                        className: "silver-faction",
                        children: (0, a.jsx)(o, {
                            armor: t.armor,
                            size: "small"
                        })
                    })]
                })
            },
            renderRatings: function() {
                var e, n, i;
                return s ? (0, a.jsxs)("div", {
                    className: "bottom eth-bottom",
                    children: [(0, a.jsx)(r.RatingBox, {
                        game: "eth",
                        rating: null != (e = t.rating_story_deficit) ? e : 0,
                        ratingName: "Story"
                    }), (0, a.jsx)(r.RatingBox, {
                        game: "eth",
                        rating: null != (n = t.rating_boss) ? n : 0,
                        ratingName: "Bossing"
                    }), (0, a.jsx)(r.RatingBox, {
                        game: "eth",
                        rating: null != (i = t.rating_pvp) ? i : 0,
                        ratingName: "PVP"
                    })]
                }) : (0, a.jsx)(m.RatingsUnavailable, {})
            }
        })
    }], 753550)
}, 204844, 78227, 189263, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(768182),
        t = e.i(657688),
        n = e.i(209962),
        s = e.i(976921),
        i = (0, s.getGameCdnUrl)("trickcal");

    function l(e, a) {
        if (!a) return "";
        var r, t = null == (r = ({
            faction: {
                Dragon: "race_dragons",
                Elemental: "race_elementals",
                Elf: "race_elves",
                Mystic: "race_mystic",
                Phantom: "race_phantoms",
                Sprite: "race_sprites",
                Werebeast: "race_werebeast",
                Witch: "race_witches"
            },
            personality: {
                Composed: "element_composed",
                Depressed: "element_depressed",
                Innocent: "element_innocence",
                Mad: "element_madness",
                Madness: "element_madness",
                Vivacious: "element_vivacious",
                Resonance: "element_resonance"
            },
            position: {
                All: "position_all",
                Back: "position_back",
                Front: "position_front",
                Mid: "position_middle",
                Middle: "position_middle"
            },
            role: {
                DPS: "class_dps",
                Support: "class_support",
                Tank: "class_tank"
            },
            damage: {
                Magic: "damage_magic",
                Magical: "damage_magic",
                Physical: "damage_physical"
            },
            item: {
                Hearts: "ico_heart",
                "Apostle Certificate": "ico_apostle",
                "Average Pastel": "ico_bluec",
                "Basic Pastel": "ico_brownc",
                Candy: "ico_candy",
                "Card Rate Up Tickets": "ico_card",
                "Recruitment Tickets": "ico_summon",
                Choucaron: "ico_choucaron",
                "Crystal Drop": "ico_crystal",
                Friendship: "ico_friendship",
                Gold: "ico_gold",
                "Ultra Pastel": "ico_goldc",
                "Crystal Leafs": "ico_leaf",
                Macarons: "ico_macron",
                "Order Certificate": "ico_order",
                "Joint Order Certificate": "ico_orderc",
                "Epic Pastel": "ico_purplec",
                "Battle Supply": "ico_pvp",
                "Star Candy": "ico_starc",
                "Thumbs Up": "ico_token"
            }
        })[e]) ? void 0 : r[a];
        return t ? "".concat(i, "/icons/").concat(t, ".webp") : ""
    }
    e.s(["getTrickcalIconUrl", 0, l, "toRatings", 0, function(e) {
        return e.map(function(e, a) {
            return {
                id: a + 1,
                name: e.name,
                slug: e.slug,
                rarity: e.rarity,
                position: e.position,
                personality: e.personality,
                faction: e.faction,
                damage: e.damage,
                role: e.role,
                rating_global: e.rating_global,
                tags: e.tags,
                is_new: e.is_new,
                is_kr: e.is_kr,
                eldain: e.eldain
            }
        })
    }], 78227);
    var c = e.i(952949),
        o = e.i(440904);
    e.i(706280);
    var d = e.i(76874);

    function m(e) {
        var r = e.character,
            s = e.ratingInfo,
            i = "https://cdn.prydwen.gg/images/trickcal/characters/".concat(r.slug, ".webp"),
            m = s && !(0, d.isPlaceholderRating)(s.rating_global) ? s : null;
        return (0, a.jsx)(c.BaseCharacterPopover, {
            gameClass: "trickcal",
            avatarClass: "trickcal ".concat(r.personality),
            imageUrl: i,
            imageAlt: r.name,
            imageSize: {
                width: 100,
                height: 100
            },
            name: r.name,
            detailsUrl: "/trickcal/characters/".concat(r.slug),
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsxs)("div", {
                        className: "trickcal-rarity rarity-".concat(r.rarity),
                        children: [r.rarity, "★"]
                    }), (0, a.jsx)("div", {
                        className: "trickcal-faction ".concat(r.faction),
                        children: l("faction", r.faction) && (0, a.jsx)(t.default, {
                            src: l("faction", r.faction),
                            alt: r.faction,
                            width: 32,
                            height: 32,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }), (0, a.jsx)("div", {
                        className: "trickcal-element ".concat(r.personality),
                        children: l("personality", r.personality) && (0, a.jsx)(t.default, {
                            src: l("personality", r.personality),
                            alt: r.personality,
                            width: 32,
                            height: 32,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }), (0, a.jsx)("div", {
                        className: "trickcal-position ".concat(r.position),
                        children: l("position", r.position) && (0, a.jsx)(t.default, {
                            src: l("position", r.position),
                            alt: r.position,
                            width: 32,
                            height: 32,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    }), (0, a.jsx)("div", {
                        className: "trickcal-role ".concat(r.role),
                        children: l("role", r.role) && (0, a.jsx)(t.default, {
                            src: l("role", r.role),
                            alt: r.role,
                            width: 32,
                            height: 32,
                            className: "faction-icon",
                            unoptimized: !0
                        })
                    })]
                })
            },
            renderRatings: function() {
                return m ? (0, a.jsx)("div", {
                    className: "bottom full",
                    children: (0, a.jsx)(n.RatingBox, {
                        game: "trick",
                        rating: m.rating_global,
                        ratingName: "Global Server"
                    })
                }) : (0, a.jsx)(o.RatingsUnavailable, {})
            }
        })
    }
    var h = e.i(468757),
        g = e.i(149721),
        u = (0, s.getGameCdnUrl)("trickcal");
    e.s(["TrickcalCharacterIcon", 0, function(e) {
        var t = e.character,
            n = e.showLabel,
            s = e.enablePopover,
            i = e.tierlist,
            l = e.ratingInfo,
            c = e.disablePrefetch,
            o = "".concat(u, "/characters/").concat(t.slug, ".webp"),
            d = null != l ? l : null;
        return (0, a.jsx)(r.BaseCharacterIcon, {
            name: t.name,
            slug: t.slug,
            image: o,
            gameSlug: "trickcal",
            avatarExtraClass: t.personality,
            imageSize: 100,
            disablePrefetch: c,
            showLabel: n,
            enablePopover: s,
            popoverClass: "trickcal",
            popoverContent: (0, a.jsx)(m, {
                character: t,
                ratingInfo: d
            }),
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [i ? (0, a.jsx)(a.Fragment, {
                        children: (null == d ? void 0 : d.is_new) && !t.krOnly && (0, a.jsx)("span", {
                            className: "tag new",
                            children: "New"
                        })
                    }) : (0, a.jsx)(a.Fragment, {
                        children: n && t.isNew && !t.krOnly && (0, a.jsx)("span", {
                            className: "tag new",
                            children: "New"
                        })
                    }), (0, a.jsxs)("div", {
                        className: "tags-right",
                        children: [n && t.krOnly && (0, a.jsx)("span", {
                            className: "kr",
                            children: "KR"
                        }), n && (t.isEldain || t.isStargazer) && (0, a.jsx)("span", {
                            className: "eldain",
                            children: (0, a.jsx)(g.FontAwesomeIcon, {
                                icon: h.faStar,
                                width: "18"
                            })
                        })]
                    })]
                })
            }
        })
    }], 204844);
    var p = e.i(484216);
    e.s(["TrickcalCharacterInline", 0, function(e) {
        var r = e.character,
            t = e.enablePopover,
            n = e.ratingInfo,
            s = "https://cdn.prydwen.gg/images/trickcal/characters/".concat(r.slug, ".webp");
        return (0, a.jsx)(p.BaseCharacterInline, {
            name: r.name,
            slug: r.slug,
            imageUrl: s,
            gameSlug: "trickcal",
            linkClass: "inline-character-trickcal ".concat(r.personality),
            variantClass: r.personality,
            imageWidth: 100,
            imageHeight: 100,
            enablePopover: t,
            popoverContent: (0, a.jsx)(m, {
                character: r,
                ratingInfo: n
            })
        })
    }], 189263)
}, 21344, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(432385),
        s = (0, e.i(976921).getGameCdnUrl)("wuthering-waves");
    e.s(["WWCharacterCard", 0, function(e) {
        var i, l = e.character,
            c = e.showLabel,
            o = e.enablePopover,
            d = e.showIcon,
            m = e.disablePrefetch;
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: l.name,
            slug: l.slug,
            imageUrl: null != (i = l.cardImage) ? i : null,
            gameSlug: "ww",
            routePrefix: "wuthering-waves",
            imageWidth: 280,
            imageHeight: 400,
            imageResponsive: !0,
            avatarExtraClass: "rarity-".concat(l.rarity),
            showLabel: c,
            enablePopover: o,
            popoverClass: "ww",
            popoverContent: (0, a.jsx)(n.WWCharacterPopover, {
                character: l
            }),
            disablePrefetch: m,
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [c && l.isNew && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    }), c && l.upcoming && (0, a.jsx)("span", {
                        className: "tag future",
                        children: l.releaseVer || "3.x"
                    })]
                })
            },
            renderAfterAvatar: function() {
                return d ? (0, a.jsx)("span", {
                    className: "floating-element",
                    children: "Unknown" != l.element && (0, a.jsx)(r.default, {
                        src: "".concat(s, "/icons/element_").concat(l.element.toLowerCase(), ".webp"),
                        alt: l.element,
                        width: 24,
                        height: 24,
                        unoptimized: !0
                    })
                }) : null
            }
        })
    }])
}, 619083, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(768182),
        n = e.i(615266),
        s = e.i(432385),
        i = e.i(468757),
        l = e.i(149721),
        c = (0, e.i(976921).getGameCdnUrl)("wuthering-waves");
    e.s(["WWCharacterIcon", 0, function(e) {
        var o, d, m = e.character,
            h = e.showLabel,
            g = e.enablePopover,
            u = e.showEidolon,
            p = e.showTierListchange,
            v = e.tags,
            f = e.tier,
            x = e.column,
            j = e.tierData,
            w = m.smallImage || null,
            b = (null != (d = null == j ? void 0 : j.dupes) ? d : "").trim(),
            C = u && j && !!(o = f ? ({
                toa: "toa_expert",
                ww: "ww_expert"
            })[f] : void 0) && !!j[o] && (!j.toa_expert_column || "toa" !== f || x === j.toa_expert_column),
            y = j ? "toa" === f ? j.toa_marks : "ww" === f ? j.ww_marks : "" : "";
        return (0, a.jsx)(t.BaseCharacterIcon, {
            name: m.name,
            slug: m.slug,
            image: w,
            gameSlug: "ww",
            rarity: m.rarity,
            href: "/wuthering-waves/characters/".concat(m.slug),
            imageSize: 120,
            showLabel: h,
            enablePopover: g,
            popoverClass: "ww",
            popoverContent: (0, a.jsx)(s.WWCharacterPopover, {
                character: m
            }),
            renderFloatingElements: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [u && b ? (0, a.jsx)("span", {
                        className: "floating-element sequence ".concat("4" === m.rarity ? "rar-4" : "rar-5"),
                        children: b
                    }) : null, C && (0, a.jsx)("span", {
                        className: "floating-element expert",
                        children: (0, a.jsx)(l.FontAwesomeIcon, {
                            icon: i.faAnglesUp,
                            width: "18"
                        })
                    }), u && (0, a.jsx)("span", {
                        className: "floating-element ww-element-tl",
                        children: "Unknown" != m.element && (0, a.jsx)(r.default, {
                            src: "".concat(c, "/icons/element_").concat(m.element.toLowerCase(), ".webp"),
                            alt: m.element,
                            width: 24,
                            height: 24,
                            unoptimized: !0
                        })
                    })]
                })
            },
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [p && (0, a.jsx)(n.TierListMarks, {
                        marks: y
                    }), u && v && (0, a.jsx)("div", {
                        className: "tier-list-tags",
                        children: v.split(",").map(function(e, r) {
                            return (0, a.jsx)("span", {
                                className: "single-tag ".concat(e),
                                children: r === v.split(",").length - 1 ? (0, a.jsx)(a.Fragment, {
                                    children: e
                                }) : (0, a.jsxs)(a.Fragment, {
                                    children: [e, ", "]
                                })
                            }, e.trim() || r)
                        })
                    })]
                })
            }
        })
    }])
}, 315053, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(432385);
    e.s(["WWCharacterInline", 0, function(e) {
        var n, s = e.character,
            i = e.enablePopover;
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: s.name,
            slug: s.slug,
            imageUrl: null != (n = s.smallImage) ? n : null,
            gameSlug: "ww",
            routePrefix: "wuthering-waves",
            variantClass: "rarity-".concat(s.rarity),
            enablePopover: i,
            popoverContent: (0, a.jsx)(t.WWCharacterPopover, {
                character: s
            })
        })
    }])
}, 432385, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(271645),
        t = e.i(657688),
        n = e.i(515186),
        s = e.i(468757),
        i = e.i(149721),
        l = e.i(209962),
        c = e.i(952949),
        o = e.i(440904);
    e.i(706280);
    var d = e.i(76874),
        m = (0, e.i(976921).getGameCdnUrl)("wuthering-waves");
    e.s(["WWCharacterPopover", 0, function(e) {
        var h = e.character,
            g = e.ratings,
            u = e.tierConfig,
            p = e.tierListType,
            v = (0, n.useWWRatings)(),
            f = (0, n.useWWTierConfig)(),
            x = (0, n.useWWTierListType)(),
            j = null != u ? u : f,
            w = h.smallImage ? h.smallImage : null,
            b = "value" === (null != p ? p : x),
            C = b ? "Value (ToA)" : "ToA",
            y = b ? "Value (WW)" : "WW",
            N = (null != g ? g : v).filter(function(e) {
                return e.slug === h.slug
            }).filter(function(e) {
                return !((0, d.isPlaceholderRating)(e.toa_rating) && (0, d.isPlaceholderRating)(e.ww_rating))
            });
        return (0, a.jsx)(c.BaseCharacterPopover, {
            gameClass: "ww",
            avatarClass: "ww rarity-".concat(h.rarity),
            imageUrl: w,
            imageAlt: h.name,
            imageResponsive: !0,
            name: h.name,
            detailsUrl: "/wuthering-waves/characters/".concat(h.slug),
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsxs)("div", {
                        className: "ww-rarity rarity-".concat(h.rarity),
                        children: [h.rarity, "★"]
                    }), h.element && "Unknown" !== h.element && (0, a.jsxs)("div", {
                        className: "ww-element ".concat(h.element),
                        children: [(0, a.jsx)(t.default, {
                            src: "".concat(m, "/icons/element_").concat(h.element.toLowerCase(), ".webp"),
                            alt: h.element,
                            width: 20,
                            height: 20,
                            unoptimized: !0
                        }), (0, a.jsx)("span", {
                            children: h.element
                        })]
                    }), h.weapon && "Unknown" !== h.weapon && (0, a.jsxs)("div", {
                        className: "ww-weapon ".concat(h.weapon),
                        children: [(0, a.jsx)(t.default, {
                            src: "".concat(m, "/icons/weapon_").concat(h.weapon.toLowerCase(), ".webp"),
                            alt: h.weapon,
                            width: 20,
                            height: 20,
                            unoptimized: !0
                        }), h.weapon]
                    })]
                })
            },
            renderRatings: function() {
                return !0 != h.upcoming ? (0, a.jsx)(a.Fragment, {
                    children: N.map(function(e) {
                        var t, n = "string" == typeof(t = e.dupes) ? t.trim() : "";
                        return (0, a.jsxs)(r.default.Fragment, {
                            children: ["dps" === e.toa_cat && (0, a.jsxs)("h6", {
                                className: "hsr-small-role dps",
                                children: [(0, a.jsx)(i.FontAwesomeIcon, {
                                    icon: s.faHandFist,
                                    width: "12"
                                }), " DPS", n ? (0, a.jsx)("span", {
                                    className: "role-dupes",
                                    children: " [".concat(n, "]")
                                }) : null]
                            }), "hybrid" === e.toa_cat && (0, a.jsxs)("h6", {
                                className: "hsr-small-role debuffer",
                                children: [(0, a.jsx)(i.FontAwesomeIcon, {
                                    icon: s.faVirus,
                                    width: "12"
                                }), " Hybrid", n ? (0, a.jsx)("span", {
                                    className: "role-dupes",
                                    children: " [".concat(n, "]")
                                }) : null]
                            }), "support" === e.toa_cat && (0, a.jsxs)("h6", {
                                className: "hsr-small-role sustain",
                                children: [(0, a.jsx)(i.FontAwesomeIcon, {
                                    icon: s.faBriefcaseMedical,
                                    width: "12"
                                }), " Support", n ? (0, a.jsx)("span", {
                                    className: "role-dupes",
                                    children: " [".concat(n, "]")
                                }) : null]
                            }), (0, a.jsxs)("div", {
                                className: "bottom ww-top",
                                children: [(0, a.jsx)(l.RatingBox, {
                                    game: "ww",
                                    rating: e.toa_rating,
                                    ratingName: C,
                                    tiers: j
                                }), (0, a.jsx)(l.RatingBox, {
                                    game: "ww",
                                    rating: e.ww_rating,
                                    ratingName: y,
                                    tiers: j
                                })]
                            })]
                        }, "".concat(e.slug, "-").concat(e.toa_cat))
                    })
                }) : (0, a.jsx)(o.RatingsUnavailable, {})
            }
        })
    }])
}, 515186, e => {
    "use strict";
    var a = e.i(843476),
        r = (0, e.i(60533).createGameDataContext)({
            ratings: [],
            tierConfig: [],
            tierListType: "main"
        }),
        t = r.Provider,
        n = r.useData;
    e.s(["WWRatingsProvider", 0, function(e) {
        var r = e.ratings,
            n = e.tierConfig,
            s = e.tierListType,
            i = e.children;
        return (0, a.jsx)(t, {
            value: {
                ratings: r,
                tierConfig: null != n ? n : [],
                tierListType: void 0 === s ? "main" : s
            },
            children: i
        })
    }, "useWWRatings", 0, function() {
        return n().ratings
    }, "useWWTierConfig", 0, function() {
        return n().tierConfig
    }, "useWWTierListType", 0, function() {
        return n().tierListType
    }])
}, 541007, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(471976),
        n = e.i(465860),
        s = e.i(374168),
        i = e.i(519302);
    e.s(["ZZZCharacterCard", 0, function(e) {
        var l, c, o = e.character,
            d = e.showLabel,
            m = e.enablePopover,
            h = e.disablePrefetch,
            g = "miyabi" === o.slug ? "ele_frost" : "yixuan" === o.slug ? "ele_yi" : "ye-shunguang" === o.slug ? "ele_honest" : "Physical" === o.element ? "ele_physical" : "Fire" === o.element ? "ele_fire" : "Ice" === o.element ? "ele_ice" : "Ether" === o.element ? "ele_ether" : "Lumiflux" === o.element ? "ele_lumiflux" : "Wind" === o.element ? "ele_wind" : "Electric" === o.element ? "ele_electric" : null,
            u = (l = o.style, i.ZZZ_STYLES.includes(l) ? "style_".concat(l.toLowerCase()) : null);
        return (0, a.jsx)(t.BaseCharacterCard, {
            name: o.name,
            slug: o.slug,
            imageUrl: null != (c = o.cardImage) ? c : null,
            gameSlug: "zzz",
            routePrefix: "zenless",
            imageWidth: 280,
            imageHeight: 400,
            imageResponsive: !0,
            avatarExtraClass: "rarity-".concat(o.rarity),
            showLabel: d,
            enablePopover: m,
            popoverClass: "zzz",
            popoverContent: (0, a.jsx)(n.ZZZCharacterPopover, {
                character: o
            }),
            disablePrefetch: h,
            renderFloatingElements: function() {
                return (0, a.jsxs)("span", {
                    className: "floating-element zzz",
                    children: [(0, a.jsx)("div", {
                        className: "element",
                        children: g && (0, a.jsx)(r.default, {
                            src: "".concat(s.CDN_BASE, "/icons/").concat(g, ".webp"),
                            alt: "".concat(o.name, " ").concat(o.element, " element"),
                            width: 24,
                            height: 24,
                            unoptimized: !0
                        })
                    }), (0, a.jsx)("div", {
                        className: "class",
                        children: u && (0, a.jsx)(r.default, {
                            src: "".concat(s.CDN_BASE, "/icons/").concat(u, ".webp"),
                            alt: "".concat(o.name, " ").concat(o.style, " style"),
                            width: 24,
                            height: 24,
                            unoptimized: !0
                        })
                    })]
                })
            },
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [d && o.isNew && (0, a.jsx)("span", {
                        className: "tag new",
                        children: "New"
                    }), d && !0 === o.upcoming && o.upcomingVersion && (0, a.jsx)("span", {
                        className: "tag future",
                        children: o.upcomingVersion
                    })]
                })
            }
        })
    }])
}, 352691, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = e.i(768182),
        n = e.i(615266),
        s = e.i(465860),
        i = e.i(374168);
    e.s(["ZZZCharacterIcon", 0, function(e) {
        var l = e.character,
            c = e.showLabel,
            o = e.enablePopover,
            d = e.showEidolon,
            m = e.showTierListchange,
            h = e.tags,
            g = e.tierData,
            u = e.disablePrefetch,
            p = l.smallImage ? l.smallImage : null;
        return (0, a.jsx)(t.BaseCharacterIcon, {
            name: l.name,
            slug: l.slug,
            image: p,
            gameSlug: "zzz",
            rarity: l.rarity,
            href: "/zenless/characters/".concat(l.slug),
            showLabel: c,
            enablePopover: o,
            disablePrefetch: void 0 === u || u,
            popoverClass: "zzz",
            popoverContent: function() {
                return (0, a.jsx)(s.ZZZCharacterPopover, {
                    character: l
                })
            },
            renderFloatingElements: function() {
                var e, t, n;
                return (0, a.jsxs)(a.Fragment, {
                    children: [d && (0, a.jsx)("span", {
                        className: "floating-element zzz",
                        children: (0, a.jsx)("div", {
                            className: "element",
                            children: (0, a.jsx)(r.default, {
                                src: (t = l.element, "miyabi" === (n = l.slug) ? "".concat(i.CDN_BASE, "/icons/ele_frost.webp") : "yixuan" === n ? "".concat(i.CDN_BASE, "/icons/ele_yi.webp") : "ye-shunguang" === n ? "".concat(i.CDN_BASE, "/icons/ele_honest.webp") : "".concat(i.CDN_BASE, "/icons/ele_").concat(t.toLowerCase(), ".webp")),
                                alt: l.element,
                                width: 24,
                                height: 24,
                                unoptimized: !0
                            })
                        })
                    }), d && (0, a.jsx)("span", {
                        className: "floating-element cinema ".concat("A" === l.rarity ? "rarity-A" : "rarity-S", " "),
                        children: "A" === l.rarity ? (0, a.jsx)(a.Fragment, {
                            children: "M6"
                        }) : (0, a.jsx)(a.Fragment, {
                            children: "pyrois" === l.slug ? (0, a.jsx)(a.Fragment, {
                                children: "M2"
                            }) : (0, a.jsx)(a.Fragment, {
                                children: "M0"
                            })
                        })
                    }), m && (0, a.jsx)(a.Fragment, {
                        children: (null == (e = l.tierRatings) ? void 0 : e.some(function(e) {
                            return "TRUE" === e.has_potential
                        })) && (0, a.jsx)("span", {
                            className: "floating-element potential ",
                            children: "P6"
                        })
                    })]
                })
            },
            renderAfterLabel: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [m && (0, a.jsx)(n.TierListMarks, {
                        marks: null == g ? void 0 : g.marks
                    }), d && h && (0, a.jsx)("div", {
                        className: "tier-list-tags",
                        children: h.split(",").map(function(e, r) {
                            return (0, a.jsx)("span", {
                                className: "single-tag ".concat(e.trim(), " ").concat("Watchlist [UP]" === e.trim() ? "watch-up" : "", " ").concat("Watchlist [DOWN]" === e.trim() ? "watch-down" : ""),
                                children: r === h.split(",").length - 1 ? (0, a.jsx)(a.Fragment, {
                                    children: e
                                }) : (0, a.jsxs)(a.Fragment, {
                                    children: [e, ", "]
                                })
                            }, e.trim() || r)
                        })
                    })]
                })
            }
        })
    }])
}, 370905, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(484216),
        t = e.i(465860);
    e.s(["ZZZCharacterInline", 0, function(e) {
        var n, s = e.character,
            i = e.enablePopover;
        return (0, a.jsx)(r.BaseCharacterInline, {
            name: s.name,
            slug: s.slug,
            imageUrl: null != (n = s.smallImage) ? n : null,
            gameSlug: "zzz",
            routePrefix: "zenless",
            variantClass: "rarity-".concat(s.rarity),
            popoverClass: "hsr",
            enablePopover: i,
            popoverContent: (0, a.jsx)(t.ZZZCharacterPopover, {
                character: s
            })
        })
    }])
}, 465860, e => {
    "use strict";
    var a = e.i(843476),
        r = e.i(657688),
        t = function(e) {
            var t = e.element,
                n = e.character;
            return (0, a.jsxs)("div", {
                className: "zzz-element ".concat(t),
                children: ["Physical" === t && (0, a.jsx)(a.Fragment, {
                    children: "ye-shunguang" === n ? (0, a.jsx)(a.Fragment, {
                        children: (0, a.jsx)(r.default, {
                            src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_honest.webp",
                            alt: t,
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        })
                    }) : (0, a.jsx)(a.Fragment, {
                        children: (0, a.jsx)(r.default, {
                            src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_physical.webp",
                            alt: t,
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        })
                    })
                }), "Fire" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_fire.webp",
                        alt: t,
                        width: 25,
                        height: 25,
                        unoptimized: !0
                    })
                }), "Wind" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_wind.webp",
                        alt: t,
                        width: 25,
                        height: 25,
                        unoptimized: !0
                    })
                }), "Lumiflux" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_lumiflux.webp",
                        alt: t,
                        width: 25,
                        height: 25,
                        unoptimized: !0
                    })
                }), "Ice" === t && (0, a.jsx)(a.Fragment, {
                    children: "miyabi" === n ? (0, a.jsx)(a.Fragment, {
                        children: (0, a.jsx)(r.default, {
                            src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_frost.webp",
                            alt: t,
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        })
                    }) : (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsx)(r.default, {
                            src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_ice.webp",
                            alt: t,
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        }), " "]
                    })
                }), "Electric" === t && (0, a.jsx)(a.Fragment, {
                    children: (0, a.jsx)(r.default, {
                        src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_electric.webp",
                        alt: t,
                        width: 25,
                        height: 25,
                        unoptimized: !0
                    })
                }), "Ether" === t && (0, a.jsx)(a.Fragment, {
                    children: "yixuan" === n ? (0, a.jsx)(a.Fragment, {
                        children: (0, a.jsx)(r.default, {
                            src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_yi.webp",
                            alt: t,
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        })
                    }) : (0, a.jsx)(a.Fragment, {
                        children: (0, a.jsx)(r.default, {
                            src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/ele_ether.webp",
                            alt: t,
                            width: 25,
                            height: 25,
                            unoptimized: !0
                        })
                    })
                })]
            })
        },
        n = e.i(142102),
        s = function(e) {
            var t = e.rarity,
                s = (0, a.jsxs)("div", {
                    id: "popover-rarity",
                    className: "popover bs-popover-auto fade show",
                    role: "tooltip",
                    children: [(0, a.jsx)("div", {
                        className: "popover-arrow"
                    }), (0, a.jsx)("h3", {
                        className: "popover-header",
                        children: t
                    }), (0, a.jsxs)("div", {
                        className: "popover-body",
                        children: [t, " is one of the Agent ranks available in Zenless Zone Zero."]
                    })]
                });
            return (0, a.jsx)(n.OverlayTrigger, {
                trigger: "click",
                rootClose: !0,
                placement: "auto-start",
                overlay: s,
                children: (0, a.jsxs)("div", {
                    className: "zzz-rarity rar-".concat(t),
                    children: ["A" === t && (0, a.jsx)(a.Fragment, {
                        children: (0, a.jsx)(r.default, {
                            src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/rarity_a.webp",
                            alt: "Rarity A",
                            className: "faction-icon",
                            width: 35,
                            height: 35,
                            unoptimized: !0
                        })
                    }), "S" === t && (0, a.jsx)(a.Fragment, {
                        children: (0, a.jsx)(r.default, {
                            src: "https://cdn.prydwen.gg/images/zenless-zone-zero/icons/rarity_s.webp",
                            alt: "Rarity A",
                            className: "faction-icon",
                            width: 35,
                            height: 35,
                            unoptimized: !0
                        })
                    }), "Unknown" === t && (0, a.jsx)(a.Fragment, {
                        children: "Unknown"
                    })]
                })
            })
        },
        i = e.i(519302),
        l = i.ZZZ_STYLES,
        c = function(e) {
            var t = e.style,
                n = e.notext,
                s = l.includes(t);
            return (0, a.jsx)("div", {
                className: "zzz-style ".concat(t),
                children: s && (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)(r.default, {
                        src: (0, i.getStyleIconUrl)(t),
                        alt: t,
                        width: 35,
                        height: 35,
                        unoptimized: !0
                    }), n ? (0, a.jsx)(a.Fragment, {}) : (0, a.jsx)("span", {
                        children: t
                    })]
                })
            })
        },
        o = e.i(468757),
        d = e.i(149721),
        m = e.i(209962),
        h = e.i(952949),
        g = e.i(440904);
    e.i(706280);
    var u = e.i(76874);
    e.s(["ZZZCharacterPopover", 0, function(e) {
        var r = e.character,
            n = r.smallImage ? r.smallImage : null,
            i = r.tierRatings ? r.tierRatings.filter(function(e) {
                return e.slug === r.slug
            }).filter(function(e) {
                return !(0, u.isPlaceholderRating)(e.rating)
            }) : [];
        return (0, a.jsx)(h.BaseCharacterPopover, {
            gameClass: "zzz",
            avatarClass: "zzz rarity-".concat(r.rarity),
            imageUrl: n,
            imageAlt: r.name,
            imageResponsive: !0,
            name: r.name,
            detailsUrl: "/zenless/characters/".concat(r.slug),
            renderBadges: function() {
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)(s, {
                        rarity: r.rarity
                    }), (0, a.jsx)(t, {
                        element: r.element,
                        character: r.slug
                    }), (0, a.jsx)(c, {
                        style: r.style
                    })]
                })
            },
            renderRatings: function() {
                return i.length > 0 ? (0, a.jsxs)(a.Fragment, {
                    children: [i.length > 1 && (0, a.jsx)("p", {
                        className: "zzz-role",
                        children: "This character can be played in multiple roles, so there's more than one row of ratings visible below."
                    }), i.map(function(e) {
                        return (0, a.jsxs)("div", {
                            children: ["CritDPS" === e.category && (0, a.jsxs)("h6", {
                                className: "zzz-small-role dps",
                                children: [(0, a.jsx)(d.FontAwesomeIcon, {
                                    icon: o.faHandFist,
                                    width: "12"
                                }), " Crit DPS"]
                            }), "AnoDPS" === e.category && (0, a.jsxs)("h6", {
                                className: "zzz-small-role sec-dps",
                                children: [(0, a.jsx)(d.FontAwesomeIcon, {
                                    icon: o.faGhost,
                                    width: "18"
                                }), " Anomaly DPS"]
                            }), "Support" === e.category && (0, a.jsxs)("h6", {
                                className: "zzz-small-role support",
                                children: [(0, a.jsx)(d.FontAwesomeIcon, {
                                    icon: o.faFlask,
                                    width: "18"
                                }), " Support"]
                            }), (0, a.jsx)("div", {
                                className: "bottom full",
                                children: (0, a.jsx)(m.RatingBox, {
                                    game: "hsr",
                                    rating: e.rating,
                                    ratingName: "",
                                    modeCompact: !0
                                })
                            })]
                        }, "".concat(e.slug, "-").concat(e.category))
                    })]
                }) : (0, a.jsx)(g.RatingsUnavailable, {})
            }
        })
    }], 465860)
}, 336405, e => {
    "use strict";
    var a = e.i(62617),
        r = e.i(419763);
    e.i(706280);
    var t = e.i(76874);
    e.i(237157);
    var n = r.GAME_CODES.AFK_JOURNEY;
    r.GAME_PATHS.AFK_JOURNEY;
    var s = (0, a.getCdnUrl)(n);
    e.s(["CDN_BASE", 0, s, "isAfkRatingPlaceholder", 0, function(e) {
        return !e || (0, t.isPlaceholderRating)(e.afk)
    }])
}, 976921, e => {
    "use strict";
    var a = e.i(62617),
        r = "https://cdn.prydwen.gg/images";
    e.s(["derivePosterUrl", 0, function(e) {
        var a = function(e) {
            var a = (null != e ? e : "").trim();
            if (!a) return "";
            if (/^(https?:)?\/\//i.test(a) || a.startsWith("data:")) return a;
            var t = a.replace(/^\/+/, "").replace(/^images\//i, "");
            return "".concat(r, "/").concat(t)
        }(e);
        if (!a) return "";
        var t = a.match(/^(.*)\.(webm|mp4)(\?.*)?$/i);
        return t ? "".concat(t[1], "_poster.webp") : ""
    }, "getCharacterImageUrl", 0, function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "small",
            s = arguments.length > 3 ? arguments[3] : void 0,
            i = arguments.length > 4 ? arguments[4] : void 0;
        return "small" === n && s ? s : (0, a.withVersion)("".concat(r, "/").concat(e, "/").concat("counter-side" === e ? "employees" : "characters", "/").concat(t, "_").concat(n, ".webp"), i)
    }, "getGameCdnUrl", 0, function(e) {
        return "".concat(r, "/").concat(e)
    }, "getIconUrl", 0, function(e, t, n) {
        return (0, a.withVersion)("".concat(r, "/").concat(e, "/icons/").concat(t, ".webp"), n)
    }, "getImageUrl", 0, function(e, t, n) {
        var s = t.startsWith("/") ? t.slice(1) : t;
        return (0, a.withVersion)("".concat(r, "/").concat(e, "/").concat(s), n)
    }])
}, 638285, e => {
    "use strict";
    var a = e.i(62617),
        r = e.i(419763);
    r.GAME_CODES.CHAOS_ZERO_NIGHTMARE, r.GAME_PATHS.CHAOS_ZERO_NIGHTMARE;
    var t = (0, a.getCdnUrl)("chaos"),
        n = {
            dps: {
                label: "DPS",
                cssClass: "dps"
            },
            sdps: {
                label: "Sub DPS",
                cssClass: "sdps"
            },
            support: {
                label: "Support",
                cssClass: "support"
            },
            shielder: {
                label: "Shielder",
                cssClass: "shielder"
            }
        },
        s = ["dps", "support"];
    s.map(function(e) {
        return n[e].label
    });
    var i = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    e.s(["CDN_BASE", 0, t, "CZN_CLASSES", 0, ["Controller", "Hunter", "Psionic", "Ranger", "Striker", "Vanguard"], "CZN_ELEMENTS", 0, ["Instinct", "Justice", "Order", "Passion", "Void"], "CZN_RARITIES", 0, ["3-star", "4-star", "5-star"], "CZN_ROLE_META", 0, n, "CZN_TIERS", 0, [{
        name: "T0",
        label: "T0",
        color: "#EF5350",
        minRating: 11,
        cssClass: "tier-0",
        ratingClass: "t-0"
    }, {
        name: "T0.5",
        label: "T0.5",
        color: "#ec6563",
        minRating: 10,
        cssClass: "tier-05",
        ratingClass: "t-05"
    }, {
        name: "T1",
        label: "T1",
        color: "#ffa967",
        minRating: 9,
        cssClass: "tier-1",
        ratingClass: "t-1"
    }, {
        name: "T1.5",
        label: "T1.5",
        color: "#ffbe7c",
        minRating: 8,
        cssClass: "tier-15",
        ratingClass: "t-15"
    }, {
        name: "T2",
        label: "T2",
        color: "#FED4A0",
        minRating: 7,
        cssClass: "tier-2",
        ratingClass: "t-2"
    }, {
        name: "T3",
        label: "T3",
        color: "#BFFF7F",
        minRating: 6,
        cssClass: "tier-3",
        ratingClass: "t-3"
    }], "CZN_TIER_ROLE_COLUMNS", 0, s, "cznRarityDigit", 0, function(e) {
        var a = /(\d+)/.exec(String(null != e ? e : "").trim());
        return a ? a[1] : ""
    }, "cznRoleClass", 0, function(e) {
        var a, r;
        return null != (a = null == (r = n[e]) ? void 0 : r.cssClass) ? a : ""
    }, "cznRoleLabel", 0, function(e) {
        var a, r;
        return null != (a = null == (r = n[e]) ? void 0 : r.label) ? a : e
    }, "formatCznDate", 0, function(e) {
        var a = String(null != e ? e : "").trim();
        if (!a) return "";
        var r = new Date(Number.isNaN(Number(a)) ? a : Number(a));
        if (Number.isNaN(r.getTime())) return a;
        var t = r.getDate().toString().padStart(2, "0");
        return "".concat(t, "/").concat(i[r.getMonth()], "/").concat(r.getFullYear())
    }, "getClassIconUrl", 0, function(e) {
        return "".concat(t, "/icons/class_").concat(e.toLowerCase(), ".webp")
    }, "getElementIconUrl", 0, function(e) {
        return "".concat(t, "/icons/element_").concat(e.toLowerCase(), ".webp")
    }])
}, 511365, e => {
    "use strict";
    var a = (0, e.i(976921).getGameCdnUrl)("etheria-restart"),
        r = new Set(["cdn.prydwen.gg", "cdn.discordapp.com", "cdn.nekobytes.ai"]);

    function t(e, a) {
        return ! function(e) {
            if (!e) return !1;
            try {
                var a = new URL(e);
                return ("https:" === a.protocol || "http:" === a.protocol) && r.has(a.hostname)
            } catch (e) {
                return !1
            }
        }(e) ? a : e
    }
    e.s(["ER_CDN_URL", 0, a, "getElementIconUrl", 0, function(e) {
        return "".concat(a, "/icons/ele_").concat(e.toLowerCase(), ".webp")
    }, "getEthCharacterImageUrl", 0, function(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "small",
            n = arguments.length > 2 ? arguments[2] : void 0,
            s = "".concat(a, "/characters/").concat(e).concat("card" === r ? "_card" : "_icon", ".webp");
        return "small" === r ? t(n, s) : s
    }, "safeImageUrl", 0, t])
}, 511762, e => {
    "use strict";
    var a = e.i(976921),
        r = e.i(419763);
    e.i(237157), r.GAME_CODES.LOST_SWORD;
    var t = {
            Front: "forward",
            Middle: "center",
            Back: "backward"
        },
        n = (0, a.getGameCdnUrl)("lost-sword");

    function s() {
        return n
    }
    e.s(["CDN_BASE", 0, n, "getLostSwordCardImageUrl", 0, function(e) {
        return e.thumbnailUrl ? e.thumbnailUrl : "".concat(s(), "/cards/").concat(e.slug, ".webp")
    }, "getLostSwordCdnBase", 0, s, "getLostSwordCharacterImageUrl", 0, function(e) {
        var a, r, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "small";
        return "small" === t && "string" == typeof(null == (a = e.data) ? void 0 : a.small_image) ? e.data.small_image : "card" === t && "string" == typeof(null == (r = e.data) ? void 0 : r.card_image) ? e.data.card_image : "".concat(s(), "/characters/").concat(e.slug, "_").concat("small" === t ? "icon" : t, ".webp")
    }, "getLostSwordIconUrl", 0, function(e, a) {
        if (!a) return "".concat(s(), "/icons/").concat(e, "_unknown.webp");
        var r = "position" === e && t[a] || a.toLowerCase();
        return "".concat(s(), "/icons/").concat(e, "_").concat(r, ".webp")
    }, "getPetImageUrl", 0, function(e) {
        return e.thumbnailUrl ? e.thumbnailUrl : "".concat(s(), "/pets/").concat(e.slug, ".webp")
    }])
}, 324307, 345240, e => {
    "use strict";
    var a = e.i(855111),
        r = (0, e.i(976921).getGameCdnUrl)("persona-5x"),
        t = "https://cdn.prydwen.gg/images/persona-5x/icons";
    (0, a._)(["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychokinesis", "Nuclear", "Bless", "Curse", "Almighty"]).concat(["Passive", "Buff", "Debuff", "Heal"]);
    var n = {
            Physical: "ele_physical",
            Gun: "ele_gun",
            Fire: "ele_fire",
            Ice: "ele_ice",
            Electric: "ele_electric",
            Wind: "ele_wind",
            Psychokinesis: "ele_psychic",
            Nuclear: "ele_nuke",
            Bless: "ele_bless",
            Curse: "ele_curse",
            Almighty: "ele_almighty",
            Passive: "ele_passive",
            Buff: "ele_buff",
            Debuff: "ele_debuff",
            Heal: "ele_heal"
        },
        s = {
            "Single-target": "job_single",
            "Multi-target": "job_multi",
            Healer: "job_healer",
            Tank: "job_tank",
            Buffer: "job_buffer",
            Debuffer: "job_debuffer",
            Navigator: "job_navigator",
            Virtuoso: "job_virtuoso"
        };

    function i(e) {
        return "".concat(r, "/characters/").concat(e, ".webp")
    }
    e.s(["CDN_BASE", 0, r, "CDN_ICONS", 0, t, "ELEMENT_ICON_MAP", 0, n, "JOB_ICON_MAP", 0, s], 345240), e.s(["getElementIconUrl", 0, function(e) {
        return e ? "".concat(t, "/").concat(n[e] || e.toLowerCase(), ".webp") : ""
    }, "getJobIconUrl", 0, function(e) {
        return "".concat(t, "/").concat(s[e] || e.toLowerCase(), ".webp")
    }, "getNoResultsImageUrl", 0, function() {
        return "".concat(r, "/no_results.webp")
    }, "getP5xCardImageUrl", 0, function(e, a, t) {
        return t || "".concat(r, "/cards/p5x_").concat("Revelation" === a ? "rev" : "uni", "_").concat(e, ".webp")
    }, "toPersonaCharacter", 0, function(e) {
        var a, t, n = e.data;
        return {
            id: e.id,
            slug: e.slug,
            name: e.name,
            codename: n.codename || "",
            unitId: n.unit_id || "",
            rarity: n.rarity || "4",
            element: n.element || "Physical",
            job: n.job || "Single-target",
            isNew: n.is_new || !1,
            availableInGlobal: null == (t = n.available_in_global) || t,
            smallImage: n.small_image || i(e.slug),
            cardImage: n.card_image || (a = e.slug, "".concat(r, "/characters/").concat(a, "_card.webp"))
        }
    }, "toPersonaEntity", 0, function(e) {
        var a, t = e.data,
            n = t.unit_id || "";
        return {
            id: e.id,
            slug: e.slug,
            unitId: n,
            name: e.name,
            rarity: t.rarity || "4",
            element: t.element || "Physical",
            job: t.job || "Single-target",
            source: t.source || "",
            availableInGlobal: null == (a = t.available_in_global) || a,
            smallImage: t.small_image || (n ? "".concat(r, "/personas/").concat(n, ".webp") : i(e.slug)),
            corePassiveName: t.core_passive_name || "",
            mainSkillName: t.main_skill_name || "",
            mainSkillCost: t.main_skill_cost || "",
            corePassive: t.core_passive || "",
            highlightSkill: t.highlight_skill || "",
            mainSkill: t.main_skill || "",
            skills: t.skills || []
        }
    }], 324307)
}, 410020, e => {
    "use strict";
    var a = e.i(62617),
        r = e.i(419763);
    e.i(237157);
    var t = r.GAME_CODES.RESONANCE_SOLSTICE;
    r.GAME_PATHS.RESONANCE_SOLSTICE;
    var n = (0, a.getCdnUrl)(t),
        s = {
            Electro: "element_electro",
            Fire: "element_fire",
            Frost: "element_frost",
            Physical: "element_physical",
            Reverb: "element_reverb",
            Reverengy: "element_rever"
        };
    e.s(["RESO_CDN_URL", 0, n, "getResoIconUrl", 0, function(e, a) {
        if ("element" === e) {
            var r = s[a];
            if (r) return "".concat(n, "/icons/").concat(r, ".webp")
        }
        return "".concat(n, "/icons/").concat(e, "_").concat(a.toLowerCase().replace(/\s+/g, "_"), ".webp")
    }])
}, 639863, e => {
    "use strict";
    var a = (0, e.i(976921).getGameCdnUrl)("silver-and-blood");
    e.s(["SILVER_ARMORS", 0, [{
        value: "Light",
        label: "Light",
        icon: "armor_light"
    }, {
        value: "Medium",
        label: "Medium",
        icon: "armor_medium"
    }, {
        value: "Heavy",
        label: "Heavy",
        icon: "armor_heavy"
    }], "SILVER_CDN_BASE", 0, a, "SILVER_CLASSES", 0, [{
        value: "Assassin",
        label: "Assassin",
        icon: "class_assassin"
    }, {
        value: "Defender",
        label: "Defender",
        icon: "class_defender"
    }, {
        value: "Enchanter",
        label: "Enchanter",
        icon: "class_enchanter"
    }, {
        value: "Marksman",
        label: "Marksman",
        icon: "class_marksman"
    }, {
        value: "Sorcerer",
        label: "Sorcerer",
        icon: "class_sorcerer"
    }, {
        value: "Warrior",
        label: "Warrior",
        icon: "class_warrior"
    }], "SILVER_DAMAGE_TYPES", 0, [{
        value: "Physical",
        label: "Physical",
        icon: "damage_physical"
    }, {
        value: "Magical",
        label: "Magical",
        icon: "damage_magical"
    }, {
        value: "Piercing",
        label: "Piercing",
        icon: "damage_piercing"
    }], "SILVER_FACTIONS", 0, [{
        value: "Ancestors",
        label: "Ancestors",
        icon: "faction_ancestors"
    }, {
        value: "Bloodborn",
        label: "Bloodborn",
        icon: "faction_bloodborn"
    }, {
        value: "Church",
        label: "Church",
        icon: "faction_church"
    }, {
        value: "Kingdom",
        label: "Kingdom",
        icon: "faction_kingdom"
    }], "SILVER_ICON_SIZE", 0, {
        small: 24,
        medium: 35,
        large: 48
    }, "SILVER_POSITIONS", 0, [{
        value: "New Moon",
        label: "New Moon",
        icon: "pos_newmoon"
    }, {
        value: "Crescent Moon",
        label: "Crescent Moon",
        icon: "pos_crescentmoon"
    }, {
        value: "Full Moon",
        label: "Full Moon",
        icon: "pos_fullmoon"
    }]])
}, 554978, e => {
    "use strict";
    var a = e.i(419763),
        r = e.i(976921);
    a.GAME_CODES.SWORD_X_STAFF;
    var t = "sword-staff",
        n = (0, r.getGameCdnUrl)(t),
        s = {
            T1: ["Mage", "Warrior"],
            T2: ["Sage", "Sorcerer", "Duelist", "Knight"],
            T3: ["Arcanist", "Archmage", "Berserker", "Paladin"],
            T4: ["Dominator", "Destroyer", "Conqueror", "Guardian"],
            T5: ["Prophet", "Magister", "Ravager", "Templar"]
        };
    Object.keys(s), e.s(["CDN_BASE", 0, n, "SXS_CDN_FOLDER", 0, t, "SXS_CLASS_TIERS", 0, s, "SXS_TIER_GROUPS", 0, s, "SXS_TIER_ROW_LABELS", 0, ["T0", "T0.5", "T1", "T2", "T3", "T4", "T5"]])
}, 374168, e => {
    "use strict";
    var a = (0, e.i(976921).getGameCdnUrl)("zenless-zone-zero");
    e.s(["CDN_BASE", 0, a])
}, 519302, e => {
    "use strict";
    var a = e.i(62617),
        r = e.i(419763);
    r.GAME_CODES.ZENLESS, r.GAME_PATHS.ZENLESS;
    var t = (0, a.getCdnUrl)("zenless-zone-zero");
    e.s(["CDN_BASE", 0, t, "ELEMENT_COLORS", 0, {
        Physical: "#C8C8C8",
        Fire: "#FF6347",
        Ice: "#4DB8FF",
        Electric: "#FFD700",
        Ether: "#9B59B6"
    }, "ZZZ_STYLES", 0, ["Attack", "Stun", "Anomaly", "Defence", "Support", "Rupture", "Armorer"], "getBangbooAvatarUrl", 0, function(e, a) {
        return a || "".concat(t, "/bangboos/").concat(e, ".webp")
    }, "getCharacterFullArtUrl", 0, function(e, a) {
        return a || "".concat(t, "/characters/").concat(e, "_full.webp")
    }, "getStyleIconUrl", 0, function(e) {
        return "".concat(t, "/icons/style_").concat(e.toLowerCase(), ".webp")
    }])
}]);