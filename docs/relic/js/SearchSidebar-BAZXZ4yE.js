import {
    _ as e,
    a7 as a,
    r as t,
    i as l,
    B as s,
    C as o,
    P as i,
    c as d,
    a as n,
    d as r,
    R as c,
    n as u,
    G as v,
    o as p,
    F as h,
    m,
    t as y,
    e as b,
    v as f
} from "./index-LLMsysJK.js";
const g = {
        name: "SearchSidebar",
        props: {
            showTypeSwitcher: {
                type: Boolean,
                default: !1
            },
            typeTabs: {
                type: Array,
                default: () => []
            },
            selectedType: {
                type: String,
                default: ""
            },
            searchPlaceholder: {
                type: String,
                default: "搜索..."
            },
            initialWidth: {
                type: Number,
                default: 330
            },
            showDetailFilter: {
                type: Boolean,
                default: !0
            },
            modelValue: {
                type: String,
                default: ""
            },
            collapsed: {
                type: Boolean,
                default: void 0
            },
            enableFilterScroll: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["update:modelValue", "search", "type-change", "width-changed", "update:collapsed"],
        setup(e, {
            emit: d
        }) {
            const n = a(),
                r = t(e.modelValue),
                c = t(null),
                u = t(e.initialWidth),
                v = t(!1),
                p = t(0),
                h = t(0),
                m = t(!1),
                y = t(window.innerWidth),
                b = l(() => y.value <= 767);
            let f = null;
            const g = l(() => {
                const a = void 0 !== e.collapsed ? e.collapsed : m.value;
                return f !== a && (f = a), a
            });
            s(() => e.collapsed, (e, a) => {
                void 0 !== e && (m.value = e)
            }, {
                immediate: !0
            });
            const w = a => {
                    b.value && !g.value && (a.target.closest("[data-ignore-outside-click]") || c.value && !c.value.contains(a.target) && (void 0 === e.collapsed ? m.value = !0 : d("update:collapsed", !0)))
                },
                k = () => {
                    const a = y.value <= 767;
                    y.value = window.innerWidth;
                    const t = y.value <= 767;
                    t ? !a && t && setTimeout(() => {
                        document.addEventListener("click", w, !0)
                    }, 0) : (void 0 === e.collapsed ? m.value = !1 : d("update:collapsed", !1), document.removeEventListener("click", w, !0))
                };
            o(() => {
                window.addEventListener("resize", k), b.value && setTimeout(() => {
                    document.addEventListener("click", w, !0)
                }, 0)
            }), i(() => {
                window.removeEventListener("resize", k), document.removeEventListener("click", w, !0)
            }), s(() => e.modelValue, e => {
                r.value = e
            });
            const E = e => {
                    if (!v.value) return;
                    if (n.hasModalOpen) return void L();
                    const a = ("mousemove" === e.type ? e.clientX : e.touches[0].clientX) - p.value,
                        t = h.value + a;
                    u.value = Math.max(250, Math.min(600, t))
                },
                L = () => {
                    v.value = !1, document.removeEventListener("mousemove", E), document.removeEventListener("mouseup", L), document.removeEventListener("touchmove", E), document.removeEventListener("touchend", L), d("width-changed", u.value)
                };
            return {
                sidebarRef: c,
                searchQuery: r,
                sidebarWidth: u,
                isResizing: v,
                startResize: e => {
                    if (n.hasModalOpen) return e.preventDefault(), void e.stopPropagation();
                    v.value = !0, p.value = "mousedown" === e.type ? e.clientX : e.touches[0].clientX, h.value = u.value, document.addEventListener("mousemove", E), document.addEventListener("mouseup", L), document.addEventListener("touchmove", E), document.addEventListener("touchend", L), e.preventDefault()
                },
                handleSearch: () => {
                    d("update:modelValue", r.value), d("search", r.value)
                },
                handleTypeChange: e => {
                    d("type-change", e)
                },
                isMobileCollapsed: g,
                toggleMobileCollapse: () => {
                    void 0 === e.collapsed ? m.value = !m.value : d("update:collapsed", !e.collapsed)
                },
                isMobile: b
            }
        }
    },
    w = {
        key: 0,
        class: "type-switcher"
    },
    k = {
        class: "tab-list"
    },
    E = ["onClick"],
    L = {
        class: "search-header"
    },
    S = {
        class: "search-box-wrapper",
        style: {
            display: "flex",
            gap: "10px",
            "align-items": "center"
        }
    },
    x = {
        class: "search-box",
        style: {
            flex: "1"
        }
    },
    M = ["placeholder"],
    C = {
        class: "filter-list"
    },
    T = {
        key: 2,
        class: "search-results-container"
    },
    z = {
        class: "sidebar-bottom"
    };
const R = e(g, [
    ["render", function(e, a, t, l, s, o) {
        return p(), d("div", {
            ref: "sidebarRef",
            class: u(["search-sidebar", {
                "mobile-collapsed": l.isMobileCollapsed
            }]),
            style: v({
                width: l.sidebarWidth + "px"
            })
        }, [n("div", {
            class: "resize-handle mobile-hidden",
            onMousedown: a[0] || (a[0] = (...e) => l.startResize && l.startResize(...e)),
            onTouchstart: a[1] || (a[1] = (...e) => l.startResize && l.startResize(...e))
        }, null, 32), t.showTypeSwitcher ? (p(), d("div", w, [c(e.$slots, "type-switcher", {}, () => [n("div", k, [(p(!0), d(h, null, m(t.typeTabs, e => (p(), d("div", {
            key: e.value,
            class: u(["tab-item", {
                active: t.selectedType === e.value
            }]),
            onClick: a => l.handleTypeChange(e.value)
        }, y(e.label), 11, E))), 128))])], !0)])) : r("", !0), n("div", L, [n("div", S, [n("div", x, [c(e.$slots, "search-container", {}, () => [b(n("input", {
            "onUpdate:modelValue": a[2] || (a[2] = e => l.searchQuery = e),
            type: "text",
            placeholder: t.searchPlaceholder,
            class: "search-input",
            onInput: a[3] || (a[3] = (...e) => l.handleSearch && l.handleSearch(...e))
        }, null, 40, M), [
            [f, l.searchQuery]
        ])], !0)]), l.isMobile ? (p(), d("button", {
            key: 0,
            onClick: a[4] || (a[4] = (...e) => l.toggleMobileCollapse && l.toggleMobileCollapse(...e)),
            class: "mobile-close-btn",
            style: {
                padding: "8px",
                background: "transparent",
                border: "none",
                "font-size": "1.25rem",
                color: "var(--text-secondary)",
                cursor: "pointer"
            }
        }, " ✕ ")) : r("", !0)])]), t.showDetailFilter ? (p(), d("div", {
            key: 1,
            class: u(["detail-filter", {
                "scrollable-filter": t.enableFilterScroll
            }])
        }, [n("div", C, [c(e.$slots, "detail-filter", {}, void 0, !0)])], 2)) : r("", !0), t.enableFilterScroll ? r("", !0) : (p(), d("div", T, [c(e.$slots, "search-results", {}, void 0, !0)])), n("div", z, [c(e.$slots, "sidebar-bottom", {}, void 0, !0)])], 6)
    }],
    ["__scopeId", "data-v-ce1c82f4"]
]);
export {
    R as S
};