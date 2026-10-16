import {
    _ as e,
    r as a,
    C as l,
    c as t,
    a as s,
    F as o,
    m as n,
    n as i,
    o as u,
    d as c,
    t as r
} from "./index-LLMsysJK.js";
const d = {
        name: "TagFilter",
        props: {
            modelValue: {
                type: [String, Number],
                default: ""
            },
            options: {
                type: Array,
                required: !0,
                validator: e => e.every(e => "object" == typeof e && "value" in e && "label" in e)
            },
            showStats: {
                type: Boolean,
                default: !1
            },
            multiple: {
                type: Boolean,
                default: !1
            },
            maxSelection: {
                type: Number,
                default: null
            }
        },
        emits: ["update:modelValue", "change"],
        setup(e, {
            emit: t
        }) {
            const s = a(!1),
                o = a(null);
            return l(() => {
                s.value = document.body.classList.contains("light") || o.value && null !== o.value.closest(".light")
            }), {
                selectOption: a => {
                    if (e.multiple) {
                        const l = Array.isArray(e.modelValue) ? e.modelValue : [];
                        let s;
                        if (l.includes(a)) s = l.filter(e => e !== a);
                        else {
                            if (e.maxSelection && l.length >= e.maxSelection) return;
                            s = [...l, a]
                        }
                        t("update:modelValue", s), t("change", s)
                    } else {
                        const l = e.modelValue === a ? "" : a;
                        t("update:modelValue", l), t("change", l)
                    }
                },
                isLightMode: s,
                containerRef: o
            }
        }
    },
    m = {
        class: "tag-filter-row"
    },
    p = ["onClick"],
    g = {
        class: "tag-label"
    },
    v = {
        key: 0,
        class: "tag-count"
    };
const f = e(d, [
    ["render", function(e, a, l, d, f, y) {
        return u(), t("div", {
            class: i(["tag-filter", {
                "light-theme": d.isLightMode
            }])
        }, [s("div", m, [(u(!0), t(o, null, n(l.options, e => (u(), t("div", {
            key: e.value,
            class: i(["tag-item", {
                active: l.modelValue === e.value,
                [`tag-${e.value}`]: e.value
            }]),
            onClick: a => d.selectOption(e.value)
        }, [s("span", g, r(e.label), 1), l.showStats && void 0 !== e.count ? (u(), t("span", v, " (" + r(e.count) + ") ", 1)) : c("", !0)], 10, p))), 128))])], 2)
    }],
    ["__scopeId", "data-v-0cf7c643"]
]);
export {
    f as T
};