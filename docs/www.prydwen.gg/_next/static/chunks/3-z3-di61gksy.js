(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 667012, e => {
    "use strict";
    var n = e.i(843476),
        a = e.i(975157),
        r = e.i(719180),
        l = e.i(940043),
        i = e.i(683239),
        s = function(e) {
            var r = e.matrix.data,
                l = r.set_type || "";
            return (0, n.jsx)("div", {
                className: "character-popover eth-matrix",
                children: (0, n.jsxs)("div", {
                    className: "details",
                    children: [(0, n.jsx)("p", {
                        className: "name",
                        children: (0, n.jsx)("span", {
                            className: (0, a.cn)("emp-name", "type-".concat(l)),
                            children: r.name
                        })
                    }), (0, n.jsxs)("div", {
                        className: "etheria-matrix-content",
                        children: [r.effect_1_pieces && r.effect_1_desc && (0, n.jsx)(n.Fragment, {
                            children: (0, n.jsxs)("p", {
                                children: [(0, n.jsxs)("strong", {
                                    children: [r.effect_1_pieces, "/", r.max_pieces, ":  "]
                                }), (0, n.jsx)("span", {
                                    className: "skill-with-coloring",
                                    dangerouslySetInnerHTML: {
                                        __html: (0, i.sanitizeGameContent)(r.effect_1_desc)
                                    }
                                })]
                            })
                        }), r.effect_2_pieces && r.effect_2_desc && (0, n.jsx)(n.Fragment, {
                            children: (0, n.jsxs)("p", {
                                children: [(0, n.jsxs)("strong", {
                                    children: [r.effect_2_pieces, "/", r.max_pieces, ":  "]
                                }), (0, n.jsx)("span", {
                                    className: "skill-with-coloring",
                                    dangerouslySetInnerHTML: {
                                        __html: (0, i.sanitizeGameContent)(r.effect_2_desc)
                                    }
                                })]
                            })
                        }), r.effect_3_pieces && r.effect_3_desc && (0, n.jsx)(n.Fragment, {
                            children: (0, n.jsxs)("p", {
                                children: [(0, n.jsxs)("strong", {
                                    children: [r.effect_3_pieces, "/", r.max_pieces, ":  "]
                                }), (0, n.jsx)("span", {
                                    className: "skill-with-coloring",
                                    dangerouslySetInnerHTML: {
                                        __html: (0, i.sanitizeGameContent)(r.effect_3_desc)
                                    }
                                })]
                            })
                        })]
                    }), (0, n.jsxs)("p", {
                        className: "source",
                        children: ["Source:", " ", (0, n.jsx)("strong", {
                            className: (0, a.cn)("emp-name", "type-".concat(r.source || "")),
                            children: r.source
                        })]
                    })]
                })
            })
        };
    e.s(["EthMatrixInline", 0, function(e) {
        var i = e.matrix,
            t = e.number,
            o = i.data,
            c = o.set_type || "";
        return (0, n.jsx)(r.CustomPopover, {
            enabled: !0,
            customClass: "character-hover-box etheria-matrix",
            popover: (0, n.jsx)(s, {
                matrix: i
            }),
            children: (0, n.jsxs)("div", {
                className: (0, a.cn)("inline-matrix-eth", "type-".concat(c)),
                children: [(0, n.jsx)("div", {
                    className: (0, a.cn)("etheria-matrix-image", "type-".concat(c)),
                    children: (0, n.jsx)(l.EthMatrixImage, {
                        name: o.name
                    })
                }), (0, n.jsxs)("span", {
                    className: "inline-name",
                    children: [o.name, " [", t, "/", o.max_pieces, "]"]
                })]
            })
        })
    }], 667012)
}, 100400, e => {
    "use strict";
    var n = e.i(843476),
        a = e.i(657688),
        r = e.i(975157),
        l = e.i(511365),
        i = (0, e.i(976921).getGameCdnUrl)("etheria-restart");
    e.s(["EthShellInline", 0, function(e) {
        var s = e.shell,
            t = s.data.rarity || "",
            o = (0, l.safeImageUrl)(s.data.small_image, "".concat(i, "/shells/").concat(s.slug, "_icon.webp"));
        return (0, n.jsx)(n.Fragment, {
            children: (0, n.jsxs)("div", {
                className: (0, r.cn)("inline-shell-eth", t),
                children: [(0, n.jsx)("span", {
                    className: (0, r.cn)("avatar etheria-shell", t),
                    children: (0, n.jsx)(a.default, {
                        className: "disable-transition",
                        src: o,
                        alt: s.name,
                        width: 48,
                        height: 48,
                        unoptimized: !0
                    })
                }), (0, n.jsx)("span", {
                    className: "inline-name",
                    children: s.name
                })]
            })
        })
    }])
}, 168856, 751057, e => {
    "use strict";
    var n = e.i(480388),
        a = e.i(181788),
        r = e.i(843476),
        l = e.i(657688),
        i = e.i(719180),
        s = e.i(486453),
        t = e.i(271645);
    e.i(174080), e.i(522016);
    var o = {
            CHARACTER: "👤",
            WEAPON: "⚔️",
            ITEM: "📦",
            SKILL: "⚡",
            ARTIFACT: "💎",
            BUFF: "✨",
            ENEMY: "👾",
            LOCATION: "📍",
            CUSTOM: "🏷️"
        },
        c = {
            CHARACTER: "#60A5FA",
            WEAPON: "#F87171",
            ITEM: "#34D399",
            SKILL: "#A78BFA",
            ARTIFACT: "#FBBF24",
            BUFF: "#2DD4BF",
            ENEMY: "#FB923C",
            LOCATION: "#818CF8",
            CUSTOM: "#9CA3AF"
        };

    function d(e) {
        var n = e.entity,
            a = e.className,
            i = o[n.type] || o.CUSTOM,
            s = c[n.type] || c.CUSTOM;
        return (0, r.jsxs)("div", {
            className: "entity-popover ".concat(void 0 === a ? "" : a),
            "data-entity-popover": "",
            "data-entity-type": n.type,
            children: [(0, r.jsx)("div", {
                className: "entity-popover-header",
                style: {
                    backgroundColor: "".concat(s, "20")
                },
                children: n.thumbnailUrl ? (0, r.jsx)("div", {
                    className: "entity-popover-image-wrapper",
                    children: (0, r.jsx)(l.default, {
                        src: n.thumbnailUrl,
                        alt: n.name,
                        width: 80,
                        height: 80,
                        className: "entity-popover-image",
                        style: {
                            objectFit: "cover"
                        }
                    })
                }) : (0, r.jsx)("div", {
                    className: "entity-popover-image-placeholder",
                    style: {
                        backgroundColor: "".concat(s, "30")
                    },
                    children: (0, r.jsx)("span", {
                        className: "entity-popover-image-icon",
                        children: i
                    })
                })
            }), (0, r.jsxs)("div", {
                className: "entity-popover-content",
                children: [(0, r.jsx)("h4", {
                    className: "entity-popover-name",
                    style: {
                        color: s
                    },
                    children: n.name
                }), (0, r.jsxs)("div", {
                    className: "entity-popover-meta",
                    children: [(0, r.jsxs)("span", {
                        className: "entity-popover-type",
                        style: {
                            color: s
                        },
                        children: [i, " ", n.type]
                    }), n.rarity && (0, r.jsxs)("span", {
                        className: "entity-popover-rarity",
                        children: ["• ", n.rarity]
                    })]
                }), n.description && (0, r.jsx)("p", {
                    className: "entity-popover-description",
                    children: n.description
                }), n.linkUrl && (0, r.jsx)("div", {
                    className: "entity-popover-footer",
                    children: (0, r.jsx)("span", {
                        className: "entity-popover-hint",
                        children: "Click to view details"
                    })
                })]
            })]
        })
    }
    var m = e.i(855111),
        p = e.i(786939),
        u = e.i(736332),
        v = e.i(818791),
        h = e.i(129993),
        y = e.i(846579),
        b = e.i(753976),
        x = e.i(741038),
        j = function(e) {
            var n = e.card,
                a = e.enablePopover;
            return (0, r.jsx)(i.CustomPopover, {
                enabled: a,
                customClass: "character-hover-box chaos-card-pop",
                popover: (0, r.jsx)(x.CZNCardPopover, {
                    card: n
                }),
                children: (0, r.jsxs)("div", {
                    className: "inline-card-chaos ".concat(n.rarity),
                    children: [(0, r.jsx)("div", {
                        className: "pw-card-placeholder ".concat(n.rarity)
                    }), (0, r.jsx)("span", {
                        className: "inline-name",
                        children: n.name
                    })]
                })
            })
        },
        C = e.i(912392),
        g = e.i(462510),
        f = e.i(651735),
        P = e.i(683239),
        E = function(e) {
            var n = e.effect,
                a = e.enablePopover,
                l = (0, r.jsx)("div", {
                    className: "popover-body",
                    children: (0, r.jsxs)("p", {
                        style: {
                            marginBottom: 0
                        },
                        children: [(0, r.jsxs)("strong", {
                            className: n.effect_type,
                            children: ["[", n.name, "]"]
                        }), ":", " ", (0, r.jsx)("span", {
                            dangerouslySetInnerHTML: {
                                __html: (0, P.sanitizeGameContent)(n.description)
                            }
                        })]
                    })
                });
            return (0, r.jsx)(i.CustomPopover, {
                enabled: void 0 === a || a,
                customClass: "character-hover-box chaos-effect",
                popover: l,
                children: (0, r.jsxs)("span", {
                    className: "inline-effect-chaos ".concat(n.effect_type),
                    children: ["[", n.name, "]"]
                })
            })
        },
        N = e.i(375441),
        I = e.i(839429),
        A = e.i(361679);

    function M(e) {
        var n = e.employee,
            a = e.enablePopover,
            s = a ? {
                slug: n.slug,
                fullName: n.fullName,
                shortName: n.shortName,
                rarityClassName: n.rarityClassName,
                smallAvatar: n.smallAvatar,
                role: n.role || "Unknown",
                type: n.type || "Counter",
                isRearmed: n.isRearmed,
                isRatingPending: n.isRatingPending,
                newRatings: n.newRatings
            } : null;
        return (0, r.jsx)(i.CustomPopover, {
            enabled: a,
            customClass: "character-hover-box",
            popover: s ? (0, r.jsx)(A.EmployeePopover, {
                employee: s
            }) : null,
            children: (0, r.jsxs)(I.AppLink, {
                href: "/counter-side/characters/".concat(n.slug),
                className: "inline-character ".concat(n.rarityClassName),
                children: [(0, r.jsx)("span", {
                    className: "avatar inline ".concat(n.rarityClassName),
                    children: n.smallAvatar && (0, r.jsx)(l.default, {
                        className: "disable-transition",
                        src: n.smallAvatar,
                        alt: n.fullName,
                        width: 32,
                        height: 32,
                        unoptimized: !0
                    })
                }), (0, r.jsx)("span", {
                    className: "inline-name",
                    children: n.shortName || n.fullName
                })]
            })
        })
    }
    var T = e.i(965820),
        _ = e.i(241590),
        R = e.i(593500),
        k = e.i(667012),
        w = e.i(100400),
        S = e.i(531227),
        F = e.i(484216),
        L = e.i(662075),
        O = e.i(485766),
        U = e.i(405380);

    function H(e) {
        var n = e.weapon,
            a = e.iconFallback,
            l = e.showLabel,
            i = e.enablePopover,
            s = (0, O.rarityDigit)(n.rarity),
            t = (0, L.resolveGenshinWeaponImage)(n.weaponId, n.image);
        return (0, r.jsx)(F.BaseCharacterInline, {
            name: n.name,
            slug: n.slug,
            imageUrl: t || a || null,
            gameSlug: "genshin",
            href: "/genshin-impact/weapons/".concat(n.slug),
            linkClass: "inline-weapon-genshin",
            variantClass: s ? "rarity-".concat(s) : void 0,
            showLabel: l,
            enablePopover: i,
            popoverClass: "genshin genshin-weapon-pop",
            popoverContent: (0, r.jsx)(U.GenshinWeaponPopover, {
                weapon: n
            })
        })
    }
    var B = e.i(415138),
        z = e.i(345521),
        D = e.i(336661),
        W = e.i(739038),
        K = e.i(676553),
        Z = e.i(769577),
        G = e.i(399610),
        Y = e.i(50437),
        V = e.i(287714),
        X = e.i(120215),
        q = e.i(677427),
        J = e.i(483543),
        Q = e.i(459512),
        $ = e.i(593528),
        ee = e.i(905252),
        en = e.i(524057),
        ea = e.i(793934),
        er = e.i(50956),
        el = e.i(343667),
        ei = e.i(768182),
        es = e.i(678576),
        et = function(e) {
            var n = e.employee,
                a = e.showLabel,
                l = e.enablePopover;
            return (0, r.jsx)(ei.BaseCharacterIcon, {
                name: n.name,
                slug: n.slug,
                image: n.smallImage,
                gameSlug: "p5x",
                href: "/persona-5x/characters/".concat(n.slug),
                rarity: n.rarity,
                imageSize: 60,
                imageResponsive: !1,
                showLabel: a,
                enablePopover: l,
                popoverContent: (0, r.jsx)(es.PersonaCharacterPopover, {
                    character: n
                })
            })
        },
        eo = e.i(809334),
        ec = e.i(420592),
        ed = e.i(311121),
        em = e.i(288474),
        ep = e.i(735451);

    function eu(e) {
        var n = e.psychube,
            a = e.enablePopover,
            s = n.rarity ? "rarity-".concat(n.rarity) : "";
        return (0, r.jsx)(i.CustomPopover, {
            enabled: void 0 !== a && a,
            customClass: "character-hover-box reverse rev-psychube-pop",
            popover: (0, r.jsx)(ep.RevPsychubeData, {
                character: n
            }),
            children: (0, r.jsxs)("span", {
                className: "inline-character-reverse psychube ".concat(s).trim(),
                children: [n.imageSmall && (0, r.jsx)("span", {
                    className: "avatar reverse psychube ".concat(s).trim(),
                    children: (0, r.jsx)(l.default, {
                        className: "disable-transition",
                        src: n.imageSmall,
                        alt: n.name,
                        width: 32,
                        height: 32,
                        unoptimized: !0
                    })
                }), (0, r.jsx)("span", {
                    className: "inline-name",
                    children: n.name
                })]
            })
        })
    }
    var ev = e.i(11574),
        eh = e.i(565765),
        ey = e.i(241898),
        eb = e.i(814185),
        ex = e.i(72003),
        ej = e.i(231912),
        eC = e.i(230842),
        eg = function(e) {
            var n = e.companion,
                a = n.rarity ? "rarity-".concat(n.rarity.toLowerCase()) : "";
            return (0, r.jsxs)("span", {
                className: "inline-character-sxs ".concat(a).trim(),
                children: [n.smallImage && (0, r.jsx)("span", {
                    className: "avatar sxs sxs-companion ".concat(a).trim(),
                    children: (0, r.jsx)(l.default, {
                        className: "disable-transition",
                        src: n.smallImage,
                        alt: n.name,
                        width: 32,
                        height: 32,
                        unoptimized: !0
                    })
                }), (0, r.jsx)("span", {
                    className: "inline-name",
                    children: n.name
                })]
            })
        },
        ef = e.i(599984),
        eP = function(e) {
            var n, a = e.fantomon,
                i = a.rarity ? "rarity-".concat(a.rarity.toLowerCase()) : "",
                s = null == (n = a.skills) ? void 0 : n[0];
            return (0, r.jsxs)("div", {
                className: "sxs-popover sxs-fantomon-popover ".concat(i).trim(),
                children: [(0, r.jsxs)("div", {
                    className: "sxs-popover-header",
                    children: [a.smallImage && (0, r.jsx)(l.default, {
                        className: "disable-transition",
                        src: a.smallImage,
                        alt: a.name,
                        width: 56,
                        height: 56,
                        unoptimized: !0
                    }), (0, r.jsxs)("div", {
                        className: "sxs-popover-title",
                        children: [(0, r.jsx)("strong", {
                            children: a.name
                        }), a.rarity && (0, r.jsx)("p", {
                            className: "sxs-popover-subtitle",
                            children: (0, r.jsx)("span", {
                                className: "sxs-rarity ".concat(i),
                                children: a.rarity
                            })
                        })]
                    })]
                }), s && (0, r.jsxs)("div", {
                    className: "sxs-popover-body",
                    children: [(0, r.jsx)("p", {
                        className: "sxs-skill-name",
                        children: (0, r.jsx)("strong", {
                            children: s.name
                        })
                    }), (0, r.jsx)(ef.SafeHtml, {
                        html: s.description
                    })]
                })]
            })
        },
        eE = function(e) {
            var n = e.fantomon,
                a = e.enablePopover,
                s = n.rarity ? "rarity-".concat(n.rarity.toLowerCase()) : "";
            return (0, r.jsx)(i.CustomPopover, {
                enabled: void 0 === a || a,
                customClass: "character-hover-box sxs-fantomon-pop",
                popover: (0, r.jsx)(eP, {
                    fantomon: n
                }),
                children: (0, r.jsxs)("span", {
                    className: "inline-fantomon-sxs ".concat(s).trim(),
                    children: [n.smallImage && (0, r.jsx)("span", {
                        className: "avatar sxs sxs-fantomon ".concat(s).trim(),
                        children: (0, r.jsx)(l.default, {
                            className: "disable-transition",
                            src: n.smallImage,
                            alt: n.name,
                            width: 32,
                            height: 32,
                            unoptimized: !0
                        })
                    }), (0, r.jsx)("span", {
                        className: "inline-name",
                        children: n.name
                    })]
                })
            })
        },
        eN = e.i(777329),
        eI = function(e) {
            var n = e.skill,
                a = e.enablePopover,
                s = n.type ? "type-".concat(n.type.toLowerCase()) : "";
            return (0, r.jsx)(i.CustomPopover, {
                enabled: void 0 === a || a,
                customClass: "character-hover-box sxs-skill-pop",
                popover: (0, r.jsx)(eN.SXSSkillPopover, {
                    skill: n
                }),
                children: (0, r.jsxs)("span", {
                    className: "inline-skill-sxs ".concat(s).trim(),
                    children: [n.smallImage && (0, r.jsx)("span", {
                        className: "avatar sxs sxs-skill",
                        children: (0, r.jsx)(l.default, {
                            className: "disable-transition",
                            src: n.smallImage,
                            alt: n.name,
                            width: 32,
                            height: 32,
                            unoptimized: !0
                        })
                    }), (0, r.jsx)("span", {
                        className: "inline-name",
                        children: n.name
                    })]
                })
            })
        },
        eA = e.i(277648),
        eM = e.i(382878),
        eT = e.i(519284),
        e_ = e.i(5586),
        eR = e.i(204844),
        ek = e.i(189263),
        ew = e.i(21344),
        eS = e.i(619083),
        eF = e.i(315053),
        eL = e.i(541007),
        eO = e.i(352691),
        eU = e.i(370905),
        eH = e.i(499092),
        eB = e.i(524906),
        ez = "team-embed/v1";

    function eD(e) {
        var n, a;
        return {
            slug: e.slug,
            name: e.name,
            smallImage: null != (n = e.icon) ? n : null,
            rarity: null != (a = e.rarity) ? a : ""
        }
    }
    var eW = {
        nikke: function(e, n) {
            var a, l;
            return (0, r.jsx)(er.NikkeTeamBox, {
                team: e.team,
                characters: (a = e.side.characters, l = n.pageCharacterData, a && Object.keys(a).length > 0 ? new Map(Object.entries(a)) : null != l ? l : new Map)
            })
        },
        "lost-sword": function(e, n) {
            var a;
            return (0, r.jsx)(G.LostTeamBox, {
                team: e.team,
                characters: (0, m._)(e.side.characters),
                pets: (0, m._)(e.side.pets),
                cards: (0, m._)(e.side.cards),
                index: null != (a = e.ordinal) ? a : void 0,
                tabId: n.domId
            })
        }
    };

    function eK(e) {
        var n = t.default.useId();
        return (0, r.jsx)("span", {
            className: "inline-embed inline-embed--team",
            children: eW[e.gameCode](e.payload, {
                domId: n,
                pageCharacterData: e.pageCharacterData
            })
        })
    }
    var eZ = Object.fromEntries(Object.keys(eW).map(function(e) {
            return ["".concat(e, ":TEAM"), function(n) {
                var a = function(e, n) {
                    if (!n || (void 0 === n ? "undefined" : (0, eB._)(n)) !== "object") return null;
                    if (n.kind === ez) return n.gameCode === e && n.team && "object" === (0, eB._)(n.team) ? {
                        kind: ez,
                        gameCode: e,
                        key: "string" == typeof n.key ? n.key : "",
                        ordinal: "number" == typeof n.ordinal ? n.ordinal : null,
                        team: n.team,
                        side: null != (a = n.side) ? a : {}
                    } : null;
                    if ("nikke" !== e || void 0 === n.Id) return null;
                    var a, r = n._members,
                        l = (0, eH._)(n, ["_members"]);
                    return {
                        kind: ez,
                        gameCode: e,
                        key: "",
                        ordinal: "number" == typeof n.Id ? n.Id : null,
                        team: l,
                        side: {
                            characters: r
                        }
                    }
                }(e, n.resolvedEntity);
                return a ? (0, r.jsx)(eK, {
                    gameCode: e,
                    payload: a,
                    pageCharacterData: n.characterData
                }) : null
            }]
        })),
        eG = (0, a._)((0, n._)({}, eZ), {
            "star-rail:CHARACTER": function(e) {
                var n, a;
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(eA.HSRCharacterCard, {
                            character: s,
                            enablePopover: null == (l = e.enablePopover) || l
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(eM.HSRCharacterIcon, {
                            character: s,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    })
                }
                return (0, r.jsx)(eT.HSRCharacterInline, {
                    character: null != (n = e.resolvedEntity) ? n : eD(e),
                    enablePopover: null == (a = e.enablePopover) || a
                })
            },
            "star-rail:ITEM": function(e) {
                var n;
                return e.resolvedEntity ? (0, r.jsx)(e_.HSRItemInline, {
                    item: e.resolvedEntity,
                    enablePopover: null == (n = e.enablePopover) || n
                }) : null
            },
            "star-rail:WEAPON": function(e) {
                var n;
                return e.resolvedEntity ? (0, r.jsx)(e_.HSRItemInline, {
                    item: e.resolvedEntity,
                    enablePopover: null == (n = e.enablePopover) || n
                }) : null
            },
            "nikke:CHARACTER": function(e) {
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s, t, o = e.resolvedEntity,
                        c = e.resolvedEntity,
                        d = c.rating_story || c.rating_boss || c.rating_pvp ? {
                            Story: c.rating_story,
                            Boss: c.rating_boss,
                            PVP: c.rating_pvp
                        } : void 0;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(ee.NikkeCharacterCard, {
                            character: o,
                            ratings: d,
                            enablePopover: null == (s = e.enablePopover) || s
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(en.NikkeCharacterIcon, {
                            character: o,
                            ratings: d,
                            enablePopover: null == (t = e.enablePopover) || t
                        })
                    })
                }
                var m = null != (l = e.resolvedEntity) ? l : (0, a._)((0, n._)({}, eD(e)), {
                        element: "",
                        weapon: "",
                        manufacturer: "",
                        burstType: "",
                        skills: []
                    }),
                    p = e.resolvedEntity,
                    u = p && (p.rating_story || p.rating_boss || p.rating_pvp) ? {
                        Story: p.rating_story,
                        Boss: p.rating_boss,
                        PVP: p.rating_pvp
                    } : void 0;
                return (0, r.jsx)(ea.NikkeCharacterInline, {
                    character: m,
                    ratings: u,
                    enablePopover: null == (i = e.enablePopover) || i
                })
            },
            "chaos-zero-nightmare:CHARACTER": function(e) {
                var n, a;
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(C.CZNCharacterCard, {
                            character: s,
                            enablePopover: null == (l = e.enablePopover) || l
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(g.CZNCharacterIcon, {
                            character: s,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    })
                }
                return (0, r.jsx)(f.CZNCharacterInline, {
                    character: null != (n = e.resolvedEntity) ? n : eD(e),
                    enablePopover: null == (a = e.enablePopover) || a
                })
            },
            "chaos-zero-nightmare:ITEM": function(e) {
                var n, a;
                return (0, r.jsx)(N.CZNPartnerInline, {
                    partner: null != (n = e.resolvedEntity) ? n : eD(e),
                    enablePopover: null == (a = e.enablePopover) || a
                })
            },
            "chaos-zero-nightmare:CUSTOM": function(e) {
                var n, a, l, i = null != (n = e.resolvedEntity) ? n : {
                    name: e.name,
                    rarity: null != (a = e.rarity) ? a : ""
                };
                return (0, r.jsx)(j, {
                    card: i,
                    enablePopover: null == (l = e.enablePopover) || l
                })
            },
            "chaos-zero-nightmare:EFFECT": function(e) {
                var n;
                if (!e.resolvedEntity) {
                    var a, l, i, s = {
                        name: e.name,
                        description: null != (a = e.tooltipContent) ? a : "",
                        effect_type: null != (l = e.rarity) ? l : ""
                    };
                    return (0, r.jsx)(E, {
                        effect: s,
                        enablePopover: null == (i = e.enablePopover) || i
                    })
                }
                return (0, r.jsx)(E, {
                    effect: e.resolvedEntity,
                    enablePopover: null == (n = e.enablePopover) || n
                })
            },
            "afk-journey:CHARACTER": function(e) {
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s, t, o = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(p.AFKCharacterCard, {
                            character: o,
                            enablePopover: null == (s = e.enablePopover) || s
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(u.AFKCharacterIcon, {
                            character: o,
                            enablePopover: null == (t = e.enablePopover) || t
                        })
                    })
                }
                var c = null != (l = e.resolvedEntity) ? l : (0, a._)((0, n._)({}, eD(e)), {
                    faction: ""
                });
                return (0, r.jsx)(v.AFKCharacterInline, {
                    character: c,
                    enablePopover: null == (i = e.enablePopover) || i
                })
            },
            "arknights-endfield:CHARACTER": function(e) {
                var n, a;
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(h.AKECharacterCard, {
                            character: s,
                            enablePopover: null == (l = e.enablePopover) || l
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(y.AKECharacterIcon, {
                            character: s,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    })
                }
                return (0, r.jsx)(b.AKECharacterInline, {
                    character: null != (n = e.resolvedEntity) ? n : eD(e),
                    enablePopover: null == (a = e.enablePopover) || a
                })
            },
            "counter-side:CHARACTER": function(e) {
                var n, a, l, i, s = null != (n = e.resolvedEntity) ? n : {
                    slug: e.slug,
                    fullName: e.name,
                    shortName: e.name,
                    rarityClassName: null != (a = e.rarity) ? a : "",
                    smallAvatar: null != (l = e.icon) ? l : void 0
                };
                return (0, r.jsx)(M, {
                    employee: s,
                    enablePopover: null == (i = e.enablePopover) || i
                })
            },
            "etheria-restart:CHARACTER": function(e) {
                var n, a;
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(T.EthCharacterCard, {
                            character: s,
                            enablePopover: null == (l = e.enablePopover) || l
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(_.EthCharacterIcon, {
                            character: s,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    })
                }
                return (0, r.jsx)(R.EthCharacterInline, {
                    character: null != (n = e.resolvedEntity) ? n : eD(e),
                    enablePopover: null == (a = e.enablePopover) || a
                })
            },
            "etheria-restart:ARTIFACT": function(e) {
                return e.resolvedEntity ? (0, r.jsx)(k.EthMatrixInline, {
                    matrix: e.resolvedEntity
                }) : null
            },
            "etheria-restart:WEAPON": function(e) {
                return e.resolvedEntity ? (0, r.jsx)(w.EthShellInline, {
                    shell: e.resolvedEntity
                }) : null
            },
            "genshin-impact:CHARACTER": function(e) {
                var n, a, l, i, s, t;
                return (0, r.jsx)(S.GenshinCharacterInline, {
                    ratings: null == (t = e.resolvedEntity) ? void 0 : t._tierRatings,
                    character: null != (n = e.resolvedEntity) ? n : {
                        slug: e.slug,
                        name: e.name,
                        rarity: null != (a = e.rarity) ? a : null,
                        element: null,
                        thumbnailUrl: null != (l = e.icon) ? l : null,
                        card: null,
                        icon: null != (i = e.icon) ? i : null,
                        weapon: null,
                        patch: null,
                        isUpcoming: !1,
                        isNew: !1
                    },
                    enablePopover: null == (s = e.enablePopover) || s
                })
            },
            "genshin-impact:WEAPON": function(e) {
                var n, a, l, i;
                return (0, r.jsx)(H, {
                    weapon: null != (n = e.resolvedEntity) ? n : {
                        slug: e.slug,
                        name: e.name,
                        rarity: null != (a = e.rarity) ? a : null,
                        weaponId: null,
                        image: null,
                        weaponType: null,
                        effectName: null,
                        refinements: [],
                        heroStats: null
                    },
                    iconFallback: null != (l = e.icon) ? l : null,
                    enablePopover: null == (i = e.enablePopover) || i
                })
            },
            "limbus-company:CHARACTER": function(e) {
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var n, a, l, i, s, t, o, c = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(B.LCIdentityCard, {
                            character: c,
                            enablePopover: null == (t = e.enablePopover) || t
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(z.LCIdentityIcon, {
                            character: c,
                            enablePopover: null == (o = e.enablePopover) || o
                        })
                    })
                }
                var d = null != (n = e.resolvedEntity) ? n : {
                    slug: e.slug,
                    name: e.name,
                    rarity: null != (a = e.rarity) ? a : "",
                    data: {
                        small_image: null != (l = e.icon) ? l : ""
                    },
                    thumbnailUrl: null != (i = e.icon) ? i : null
                };
                return (0, r.jsx)(D.LCIdentityInline, {
                    character: d,
                    enablePopover: null == (s = e.enablePopover) || s
                })
            },
            "lost-sword:CHARACTER": function(e) {
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var n, a, l, i, s, t = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(Z.LostCharacterCard, {
                            character: t,
                            enablePopover: null == (i = e.enablePopover) || i,
                            showLabel: !1
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(Y.LostCharacterIcon, {
                            character: t,
                            enablePopover: null == (s = e.enablePopover) || s,
                            showLabel: !1
                        })
                    })
                }
                var o = null != (n = e.resolvedEntity) ? n : {
                    slug: e.slug,
                    name: e.name,
                    data: {
                        rarity: null != (a = e.rarity) ? a : ""
                    }
                };
                return (0, r.jsx)(V.LostCharacterInline, {
                    character: o,
                    enablePopover: null == (l = e.enablePopover) || l
                })
            },
            "lost-sword:ITEM": function(e) {
                if ("card" === e.displayMode && e.resolvedEntity) {
                    var n, a, l, i, s, t = e.resolvedEntity;
                    return (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(W.LostCardCard, {
                            card: t
                        })
                    })
                }
                var o = null != (n = e.resolvedEntity) ? n : {
                    slug: e.slug,
                    name: e.name,
                    thumbnailUrl: null != (a = e.icon) ? a : null,
                    data: {
                        rarity: null != (l = e.rarity) ? l : null,
                        skill_effect: null != (i = e.tooltipContent) ? i : ""
                    }
                };
                return (0, r.jsx)(K.LostCardInline, {
                    card: o,
                    enablePopover: null == (s = e.enablePopover) || s
                })
            },
            "lost-sword:CUSTOM": function(e) {
                if ("card" === e.displayMode && e.resolvedEntity) {
                    var n, a, l, i, s, t = e.resolvedEntity;
                    return (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(X.LostPetCard, {
                            pet: t
                        })
                    })
                }
                var o = null != (n = e.resolvedEntity) ? n : {
                    slug: e.slug,
                    name: e.name,
                    thumbnailUrl: null != (a = e.icon) ? a : null,
                    data: {
                        rarity: null != (l = e.rarity) ? l : null,
                        skill_effect: null != (i = e.tooltipContent) ? i : ""
                    }
                };
                return (0, r.jsx)(q.LostPetInline, {
                    pet: o,
                    enablePopover: null == (s = e.enablePopover) || s
                })
            },
            "neverness-to-everness:CHARACTER": function(e) {
                var n = null != (a = e.resolvedEntity) ? a : eD(e);
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var a, l, i, s, t = e.resolvedEntity,
                        o = n._tierRatings;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(J.NTECharacterCard, {
                            character: t,
                            tierRatings: o,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(Q.NTECharacterIcon, {
                            character: t,
                            tierRatings: o,
                            enablePopover: null == (s = e.enablePopover) || s
                        })
                    })
                }
                return (0, r.jsx)($.NTECharacterInline, {
                    character: n,
                    ratings: n._tierRatings,
                    enablePopover: null == (l = e.enablePopover) || l
                })
            },
            "persona-5x:CHARACTER": function(e) {
                var n, a;
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(el.PersonaCharacterCard, {
                            character: s,
                            enablePopover: null == (l = e.enablePopover) || l
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(et, {
                            employee: s,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    })
                }
                return (0, r.jsx)(eo.PersonaCharacterInline, {
                    character: null != (n = e.resolvedEntity) ? n : eD(e),
                    enablePopover: null == (a = e.enablePopover) || a
                })
            },
            "re1999:CHARACTER": function(e) {
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var n, a, l, i, s, t, o = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(ed.ReverseCharacterCard, {
                            character: o,
                            enablePopover: null == (s = e.enablePopover) || s
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(em.ReverseCharacterIcon, {
                            character: o,
                            enablePopover: null == (t = e.enablePopover) || t
                        })
                    })
                }
                var c = null != (n = e.resolvedEntity) ? n : {
                    slug: e.slug,
                    name: e.name,
                    rarity: null != (a = e.rarity) ? a : "",
                    imageSmall: null != (l = e.icon) ? l : void 0
                };
                return (0, r.jsx)(ec.RevCharacterInline, {
                    character: c,
                    enablePopover: null == (i = e.enablePopover) || i
                })
            },
            "re1999:ITEM": function(e) {
                var n, a, l, i, s, t, o = null != (n = e.resolvedEntity) ? n : {
                    id: null != (a = e.id) ? a : "",
                    slug: e.slug,
                    name: e.name,
                    unitId: null != (l = e.id) ? l : "",
                    imageSmall: null != (i = e.icon) ? i : null,
                    rarity: null != (s = e.rarity) ? s : "",
                    tags: []
                };
                return (0, r.jsx)(eu, {
                    psychube: o,
                    enablePopover: null == (t = e.enablePopover) || t
                })
            },
            "resonance-solstice:CHARACTER": function(e) {
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var n, a, l, i, s, t = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(ev.ResoCharacterCard, {
                            character: t,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(eh.ResoCharacterIcon, {
                            character: t,
                            enablePopover: null == (s = e.enablePopover) || s
                        })
                    })
                }
                var o = null != (n = e.resolvedEntity) ? n : {
                    slug: e.slug,
                    name: e.name,
                    rarity: null != (a = e.rarity) ? a : null
                };
                return (0, r.jsx)(ey.ResoCharacterInline, {
                    character: o,
                    enablePopover: null == (l = e.enablePopover) || l
                })
            },
            "resonance-solstice:WEAPON": function(e) {
                var n, a, l = null != (n = e.resolvedEntity) ? n : {
                    name: e.name,
                    rarity: null != (a = e.rarity) ? a : null
                };
                return (0, r.jsx)(eb.ResoEqInline, {
                    item: l
                })
            },
            "silver-and-blood:CHARACTER": function(e) {
                var n, a;
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(ex.SilverCharacterCard, {
                            character: s,
                            enablePopover: null == (l = e.enablePopover) || l
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(ej.SilverCharacterIcon, {
                            character: s,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    })
                }
                return (0, r.jsx)(eC.SilverCharacterInline, {
                    character: null != (n = e.resolvedEntity) ? n : eD(e),
                    enablePopover: null == (a = e.enablePopover) || a
                })
            },
            "sword-x-staff:SKILL": function(e) {
                var n, a, l, i, s, t = null != (n = e.resolvedEntity) ? n : {
                    id: null != (a = e.id) ? a : "",
                    slug: e.slug,
                    name: e.name,
                    type: "",
                    class: "",
                    tags: [],
                    description: null != (l = e.tooltipContent) ? l : "",
                    keywords: [],
                    effects: [],
                    smallImage: null != (i = e.icon) ? i : "",
                    isMonster: !1
                };
                return (0, r.jsx)(eI, {
                    skill: t,
                    enablePopover: null == (s = e.enablePopover) || s
                })
            },
            "sword-x-staff:ITEM": function(e) {
                var n, a, l, i, s, t, o, c = null != (n = e.resolvedEntity) ? n : {
                    id: null != (a = e.id) ? a : "",
                    slug: e.slug,
                    name: e.name,
                    rarity: null != (l = e.rarity) ? l : "",
                    skills: [],
                    description: null != (i = e.tooltipContent) ? i : "",
                    smallImage: null != (s = e.icon) ? s : "",
                    fullImage: null != (t = e.icon) ? t : ""
                };
                return (0, r.jsx)(eE, {
                    fantomon: c,
                    enablePopover: null == (o = e.enablePopover) || o
                })
            },
            "sword-x-staff:CHARACTER": function(e) {
                var n, a, l, i, s, t = null != (n = e.resolvedEntity) ? n : {
                    id: null != (a = e.id) ? a : "",
                    slug: e.slug,
                    name: e.name,
                    rarity: null != (l = e.rarity) ? l : "",
                    ranks: [],
                    smallImage: null != (i = e.icon) ? i : "",
                    fullImage: null != (s = e.icon) ? s : ""
                };
                return (0, r.jsx)(eg, {
                    companion: t,
                    enablePopover: !1
                })
            },
            "trickcal:CHARACTER": function(e) {
                if ("icon" === e.displayMode && e.resolvedEntity) {
                    var n, a, l, i = e.resolvedEntity;
                    return (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(eR.TrickcalCharacterIcon, {
                            character: i,
                            enablePopover: null == (l = e.enablePopover) || l
                        })
                    })
                }
                var s = null != (n = e.resolvedEntity) ? n : {
                    slug: e.slug,
                    name: e.name,
                    personality: ""
                };
                return (0, r.jsx)(ek.TrickcalCharacterInline, {
                    character: s,
                    enablePopover: null == (a = e.enablePopover) || a
                })
            },
            "wuthering-waves:CHARACTER": function(e) {
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s, t, o, c = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(ew.WWCharacterCard, {
                            character: c,
                            enablePopover: null == (t = e.enablePopover) || t
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(eS.WWCharacterIcon, {
                            character: c,
                            enablePopover: null == (o = e.enablePopover) || o
                        })
                    })
                }
                var d = null != (l = e.resolvedEntity) ? l : (0, a._)((0, n._)({}, eD(e)), {
                    id: "",
                    unitId: "",
                    smallImage: null != (i = e.icon) ? i : "",
                    cardImage: "",
                    element: "",
                    weapon: ""
                });
                return (0, r.jsx)(eF.WWCharacterInline, {
                    character: d,
                    enablePopover: null == (s = e.enablePopover) || s
                })
            },
            "zenless:CHARACTER": function(e) {
                var n, a;
                if (("icon" === e.displayMode || "card" === e.displayMode) && e.resolvedEntity) {
                    var l, i, s = e.resolvedEntity;
                    return "card" === e.displayMode ? (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--card",
                        children: (0, r.jsx)(eL.ZZZCharacterCard, {
                            character: s,
                            enablePopover: null == (l = e.enablePopover) || l
                        })
                    }) : (0, r.jsx)("span", {
                        className: "inline-embed inline-embed--icon",
                        children: (0, r.jsx)(eO.ZZZCharacterIcon, {
                            character: s,
                            enablePopover: null == (i = e.enablePopover) || i
                        })
                    })
                }
                return (0, r.jsx)(eU.ZZZCharacterInline, {
                    character: null != (n = e.resolvedEntity) ? n : eD(e),
                    enablePopover: null == (a = e.enablePopover) || a
                })
            }
        }),
        eY = {
            CHARACTER: "👤",
            ITEM: "📦",
            SKILL: "⚡",
            WEAPON: "⚔️",
            ARTIFACT: "💎",
            BUFF: "✨",
            ENEMY: "👾",
            LOCATION: "📍",
            CUSTOM: "🏷️"
        },
        eV = {
            CHARACTER: "#60A5FA",
            ITEM: "#34D399",
            SKILL: "#A78BFA",
            WEAPON: "#F87171",
            ARTIFACT: "#FBBF24",
            BUFF: "#2DD4BF",
            ENEMY: "#FB923C",
            LOCATION: "#818CF8",
            CUSTOM: "#9CA3AF"
        },
        eX = {
            CHARACTER: "/characters",
            ITEM: "/items",
            SKILL: "/skills",
            WEAPON: "/weapons",
            ARTIFACT: "/artifacts",
            BUFF: "/buffs",
            ENEMY: "/enemies",
            LOCATION: "/locations",
            CUSTOM: ""
        },
        eq = {
            "5-star": "#FFB938",
            "4-star": "#A855F7",
            "3-star": "#3B82F6",
            "2-star": "#22C55E",
            "1-star": "#9CA3AF",
            legendary: "#FF8C00",
            epic: "#A855F7",
            rare: "#3B82F6",
            uncommon: "#22C55E",
            common: "#9CA3AF"
        };

    function eJ(e) {
        var n = e.indexOf(":");
        return n >= 0 ? e.slice(n + 1) : e
    }

    function eQ(e) {
        var n, a, t, o = e.type,
            c = e.gameCode,
            m = e.slug,
            p = e.name,
            u = e.id,
            v = e.icon,
            h = e.rarity,
            y = e.tooltipContent,
            b = e.linkUrl,
            x = e.enablePopover,
            j = null != (n = eV[o]) ? n : eV.CUSTOM,
            C = null != (a = eY[o]) ? a : eY.CUSTOM,
            g = null != (t = eX[o]) ? t : "",
            f = h ? eq[h.toLowerCase()] : null,
            P = (0, s.sanitizeCssColor)(f || j) || j,
            E = b && /^(https?:\/\/|\/[^/])/.test(b) ? b : null,
            N = null != E ? E : c && g ? "/".concat(c).concat(g, "/").concat(m) : void 0,
            I = (0, r.jsxs)("span", {
                className: "inline-element",
                style: {
                    backgroundColor: "".concat(P, "20"),
                    color: P,
                    borderBottom: "2px solid ".concat(P)
                },
                "data-inline-element": "",
                "data-type": o,
                "data-inline-fallback": "",
                children: [v ? (0, r.jsx)(l.default, {
                    src: v,
                    alt: p,
                    width: 32,
                    height: 32,
                    className: "inline-element-icon",
                    unoptimized: !0
                }) : (0, r.jsx)("span", {
                    className: "inline-element-icon",
                    children: C
                }), (0, r.jsx)("span", {
                    className: "inline-element-name",
                    children: p
                })]
            }),
            A = (0, r.jsx)(d, {
                entity: {
                    id: null != u ? u : "",
                    name: p,
                    slug: m,
                    type: o,
                    thumbnailUrl: null != v ? v : null,
                    rarity: null != h ? h : null,
                    description: null != y ? y : null,
                    linkUrl: null != N ? N : null,
                    gameCode: null != c ? c : null
                }
            }),
            M = N ? (0, r.jsx)("a", {
                href: N,
                className: "no-underline",
                children: I
            }) : I;
        return (0, r.jsx)(i.CustomPopover, {
            enabled: void 0 === x || x,
            customClass: "character-hover-box ".concat(null != c ? c : ""),
            popover: A,
            children: M
        })
    }
    e.s(["InlineElementDispatcher", 0, function(e) {
        var l, i = (0, a._)((0, n._)({}, e), {
                slug: "TEAM" === e.type ? e.slug : eJ(e.slug)
            }),
            s = eG["".concat(null != (l = i.gameCode) ? l : "", ":").concat(i.type)];
        if (s) {
            var t = s(i);
            if (t) return (0, r.jsx)(r.Fragment, {
                children: t
            })
        }
        return (0, r.jsx)(eQ, (0, n._)({}, i))
    }, "stripContentTypePrefix", 0, eJ], 168856);
    var e$ = {
            re1999: ["icon", "card"],
            "star-rail": ["icon", "card"],
            zenless: ["icon", "card"],
            "neverness-to-everness": ["icon", "card"],
            "chaos-zero-nightmare": ["icon", "card"],
            "afk-journey": ["icon", "card"],
            "arknights-endfield": ["icon", "card"],
            "etheria-restart": ["icon", "card"],
            "limbus-company": ["icon", "card"],
            "lost-sword": ["icon", "card"],
            "wuthering-waves": ["icon", "card"],
            "persona-5x": ["icon", "card"],
            "resonance-solstice": ["icon", "card"],
            "silver-and-blood": ["icon", "card"],
            nikke: ["icon", "card"],
            trickcal: ["icon"]
        },
        e0 = new Set(Object.keys(e$)),
        e5 = {
            "lost-sword:ITEM": ["card"],
            "lost-sword:CUSTOM": ["card"]
        },
        e1 = {
            nikke: {
                contentTypeSlugs: ["teams-public", "teams-profile"]
            },
            "lost-sword": {
                contentTypeSlugs: ["teams"]
            }
        };

    function e3(e, n) {
        var a, r;
        return e && n ? "CHARACTER" === n ? null != (a = e$[e]) ? a : [] : null != (r = e5["".concat(e, ":").concat(n)]) ? r : [] : []
    }
    Object.keys(e1), e.s(["EMBED_RESOLVABLE_GAME_CODES", 0, e0, "getEmbedModes", 0, e3, "isBlockLevelEmbed", 0, function(e, n) {
        return "TEAM" === e || "icon" === n || "card" === n
    }, "isInlineEmbedCapable", 0, function(e, n) {
        return e3(e, n).length > 0
    }, "supportsEmbedMode", 0, function(e, n, a) {
        return e3(e, n).includes(a)
    }, "supportsTeamEmbed", 0, function(e) {
        return !!e && e in e1
    }], 751057)
}, 5586, e => {
    "use strict";
    var n = e.i(843476),
        a = e.i(657688),
        r = e.i(709201),
        l = e.i(719180),
        i = e.i(683239),
        s = function(e) {
            var l, s = e.item,
                t = s.thumbnailUrl ? s.thumbnailUrl : s.slug ? (0, r.getItemImageUrl)(s.slug) : null,
                o = s.data,
                c = null != (l = o.rarity) ? l : 1;
            return (0, n.jsxs)("div", {
                className: "hsr-item-popover",
                children: [(0, n.jsxs)("div", {
                    className: "top rarity-".concat(c),
                    children: [t && (0, n.jsx)(a.default, {
                        className: "disable-transition",
                        src: t,
                        alt: s.name,
                        width: 50,
                        height: 50,
                        unoptimized: !0
                    }), (0, n.jsx)("h5", {
                        children: s.name
                    })]
                }), (0, n.jsxs)("div", {
                    className: "bottom",
                    children: [o.description && (0, n.jsx)("div", {
                        dangerouslySetInnerHTML: {
                            __html: (0, i.sanitizeGameContent)(o.description)
                        }
                    }), (0, n.jsx)("h5", {
                        children: "Source"
                    }), o.source ? (0, n.jsx)("div", {
                        dangerouslySetInnerHTML: {
                            __html: (0, i.sanitizeGameContent)(o.source)
                        }
                    }) : (0, n.jsx)("p", {
                        children: "Source missing."
                    })]
                })]
            })
        };
    e.s(["HSRItemInline", 0, function(e) {
        var i, t = e.item,
            o = e.enablePopover,
            c = t.thumbnailUrl ? t.thumbnailUrl : t.slug ? (0, r.getItemImageUrl)(t.slug) : null,
            d = null != (i = t.data.rarity) ? i : 1;
        return (0, n.jsx)(l.CustomPopover, {
            enabled: o,
            customClass: "hsr-item-popover",
            popover: (0, n.jsx)(s, {
                item: t
            }),
            children: (0, n.jsx)("div", {
                className: "hsr-item-inline",
                children: (0, n.jsxs)("div", {
                    children: [(0, n.jsx)("div", {
                        className: "hsr-image rarity-".concat(d),
                        children: c && (0, n.jsx)(a.default, {
                            className: "disable-transition",
                            src: c,
                            alt: t.name,
                            width: 35,
                            height: 35,
                            unoptimized: !0
                        })
                    }), (0, n.jsx)("div", {
                        className: "hsr-name",
                        children: (0, n.jsx)("span", {
                            children: t.name
                        })
                    })]
                })
            })
        })
    }], 5586)
}, 777329, e => {
    "use strict";
    var n = e.i(843476),
        a = e.i(657688),
        r = e.i(976921),
        l = e.i(599984),
        i = e.i(554978);
    e.s(["SXSSkillPopover", 0, function(e) {
        var s = e.skill,
            t = s.class ? (0, r.getIconUrl)(i.SXS_CDN_FOLDER, "class_".concat(s.class.toLowerCase().trim().replace(/\s+/g, "-"))) : null,
            o = s.type ? s.type.toLowerCase() : "";
        return (0, n.jsxs)("div", {
            className: "sxs-popover sxs-skill-popover type-".concat(o),
            children: [(0, n.jsxs)("div", {
                className: "sxs-popover-header",
                children: [s.smallImage && (0, n.jsx)(a.default, {
                    className: "disable-transition",
                    src: s.smallImage,
                    alt: s.name,
                    width: 48,
                    height: 48,
                    unoptimized: !0
                }), (0, n.jsxs)("div", {
                    className: "sxs-popover-title",
                    children: [(0, n.jsx)("strong", {
                        children: s.name
                    }), (s.class || s.type) && (0, n.jsxs)("p", {
                        className: "sxs-popover-subtitle",
                        children: [t && (0, n.jsx)(a.default, {
                            className: "disable-transition",
                            src: t,
                            alt: s.class,
                            width: 20,
                            height: 20,
                            unoptimized: !0
                        }), (0, n.jsx)("span", {
                            children: [s.class, s.type].filter(Boolean).join(" · ")
                        })]
                    })]
                })]
            }), (0, n.jsx)(l.SafeHtml, {
                html: s.description,
                className: "sxs-popover-body"
            })]
        })
    }])
}]);