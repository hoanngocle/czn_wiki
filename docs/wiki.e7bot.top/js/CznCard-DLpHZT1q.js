import {
    _ as e,
    r as t,
    i as a,
    B as r,
    C as s,
    H as o,
    c as n,
    e as l,
    a8 as i,
    a as c,
    G as d,
    t as g,
    o as h,
    u as A,
    g as u,
    P as p,
    q as m,
    d as y,
    n as C,
    F as B,
    m as E,
    T as v,
    y as f,
    p as w,
    w as I
} from "./index-DKI40WV2.js";
import {
    h as x,
    e as D,
    d as M,
    g as k,
    i as S,
    j as G
} from "./api-BhwEKNwi.js";
import {
    a as Q,
    f as b
} from "./descriptionFormatter-B58vtNQt.js";
import {
    isCznCardFontLoaded as Y,
    getCznCardFontByType as U
} from "./cznFontLoader--BOnSV9S.js";
/**
 * CardInteraction.js - 卡片3D跟随效果工具类（纯JavaScript版本）
 * 
 * 完全独立的单文件实现，可用于任何JavaScript项目（React、Vue、原生JS等）
 * 零依赖，纯JavaScript实现
 * 
 * @version 2.0.0
 * @author Pokemon Cards CSS
 * @license MIT
 */
function L(e, t = 0, a = 100) {
    return Math.min(Math.max(e, t), a)
}

function T(e, t = 2) {
    return parseFloat(e.toFixed(t))
}

function R(e, t, a, r, s) {
    return (e - t) * (s - r) / (a - t) + r
}
class H {
    constructor(e, t = .066, a = .25) {
        this.current = "object" == typeof e ? { ...e
        } : e, this.target = "object" == typeof e ? { ...e
        } : e, this.velocity = "object" == typeof e ? Object.keys(e).reduce((e, t) => ({ ...e,
            [t]: 0
        }), {}) : 0, this.stiffness = t, this.damping = a
    }
    set(e) {
        this.target = "object" == typeof e ? { ...e
        } : e
    }
    update() {
        if ("object" == typeof this.current) {
            let e = !1;
            return Object.keys(this.current).forEach(t => {
                const a = this.target[t] - this.current[t],
                    r = Math.abs(a),
                    s = Math.abs(this.velocity[t]);
                r < .001 && s < .001 ? (this.current[t] = this.target[t], this.velocity[t] = 0) : r > .001 && (this.velocity[t] += a * this.stiffness, this.velocity[t] *= 1 - this.damping, this.current[t] += this.velocity[t], e = !0)
            }), e
        } {
            const e = this.target - this.current,
                t = Math.abs(e),
                a = Math.abs(this.velocity);
            return t < .001 && a < .001 ? (this.current = this.target, this.velocity = 0, !1) : t > .001 && (this.velocity += e * this.stiffness, this.velocity *= 1 - this.damping, this.current += this.velocity, !0)
        }
    }
    get() {
        return this.current
    }
}
class z {
    constructor(e = {}) {
        this.stiffness = e.stiffness || .066, this.damping = e.damping || .25, this.springRotate = new H({
            x: 0,
            y: 0
        }, this.stiffness, this.damping), this.springGlare = new H({
            x: 50,
            y: 50,
            o: 0
        }, this.stiffness, this.damping), this.springBackground = new H({
            x: 50,
            y: 50
        }, this.stiffness, this.damping), this.interacting = !1, this.element = null, this.animationFrame = null, this.isRunning = !1, this.interactEndTimeout = null, this.cachedRect = null, this.rectCacheTime = 0, this.RECT_CACHE_DURATION = 100, this.lastAppliedValues = null, this.pendingInteraction = null, this.interactionFrame = null, this.handleInteract = this.handleInteract.bind(this), this.handleInteractEnd = this.handleInteractEnd.bind(this), this.animate = this.animate.bind(this), this.onUpdate = e.onUpdate || null
    }
    bind(e) {
        return this.element && this.unbind(), this.element = e, this.element.addEventListener("pointermove", this.handleInteract), this.element.addEventListener("mousemove", this.handleInteract), this.element.addEventListener("touchmove", this.handleInteract), this.element.addEventListener("mouseout", this.handleInteractEnd), this.element.addEventListener("touchend", this.handleInteractEnd), this
    }
    unbind() {
        this.element && (this.element.removeEventListener("pointermove", this.handleInteract), this.element.removeEventListener("mousemove", this.handleInteract), this.element.removeEventListener("touchmove", this.handleInteract), this.element.removeEventListener("mouseout", this.handleInteractEnd), this.element.removeEventListener("touchend", this.handleInteractEnd), this.element = null, this.cachedRect = null, this.lastAppliedValues = null)
    }
    start() {
        if (!this.isRunning) return this.isRunning = !0, this.animate(), this
    }
    stop() {
        return this.isRunning = !1, this.animationFrame && (cancelAnimationFrame(this.animationFrame), this.animationFrame = null), this.interactEndTimeout && (clearTimeout(this.interactEndTimeout), this.interactEndTimeout = null), this.interactionFrame && (cancelAnimationFrame(this.interactionFrame), this.interactionFrame = null), this.pendingInteraction = null, this
    }
    animate() {
        if (!this.isRunning) return;
        const e = this.springRotate.update(),
            t = this.springGlare.update(),
            a = this.springBackground.update(),
            r = e || t || a;
        r && this.onUpdate && this.onUpdate(this.getValues()), r || this.interacting ? this.animationFrame = requestAnimationFrame(this.animate) : this.stop()
    }
    getCachedRect() {
        const e = Date.now();
        return (!this.cachedRect || e - this.rectCacheTime > this.RECT_CACHE_DURATION) && this.element && (this.cachedRect = this.element.getBoundingClientRect(), this.rectCacheTime = e), this.cachedRect
    }
    handleInteract(e) {
        if (!this.element) return;
        this.interactEndTimeout && (clearTimeout(this.interactEndTimeout), this.interactEndTimeout = null), this.interacting = !0, this.isRunning || this.start();
        const t = this.stiffness,
            a = this.damping;
        let r, s;
        this.springRotate.stiffness = t, this.springRotate.damping = a, this.springGlare.stiffness = t, this.springGlare.damping = a, this.springBackground.stiffness = t, this.springBackground.damping = a, "touchmove" === e.type ? (r = e.touches[0].clientX, s = e.touches[0].clientY) : (r = e.clientX, s = e.clientY);
        const o = this.getCachedRect();
        if (!o) return;
        const n = r - o.left,
            l = s - o.top,
            i = {
                x: L(T(100 / o.width * n)),
                y: L(T(100 / o.height * l))
            },
            c = i.x - 50,
            d = i.y - 50;
        this.springBackground.set({
            x: R(i.x, 0, 100, 37, 63),
            y: R(i.y, 0, 100, 33, 67)
        }), this.springRotate.set({
            x: T(-c / 3.5),
            y: T(d / 2)
        }), this.springGlare.set({
            x: T(i.x),
            y: T(i.y),
            o: 1
        })
    }
    handleInteractEnd() {
        this.interactEndTimeout && clearTimeout(this.interactEndTimeout), this.interactEndTimeout = setTimeout(() => {
            this.interactEndTimeout = null;
            const e = .01,
                t = .06;
            this.interacting = !1, this.springRotate.stiffness = e, this.springRotate.damping = t, this.springRotate.set({
                x: 0,
                y: 0
            }), this.springGlare.stiffness = e, this.springGlare.damping = t, this.springGlare.set({
                x: 50,
                y: 50,
                o: 0
            }), this.springBackground.stiffness = e, this.springBackground.damping = t, this.springBackground.set({
                x: 50,
                y: 50
            })
        }, 500)
    }
    reset() {
        this.springRotate.current = {
            x: 0,
            y: 0
        }, this.springRotate.target = {
            x: 0,
            y: 0
        }, this.springGlare.current = {
            x: 50,
            y: 50,
            o: 0
        }, this.springGlare.target = {
            x: 50,
            y: 50,
            o: 0
        }, this.springBackground.current = {
            x: 50,
            y: 50
        }, this.springBackground.target = {
            x: 50,
            y: 50
        }
    }
    getValues() {
        return {
            rotate: this.springRotate.get(),
            glare: this.springGlare.get(),
            background: this.springBackground.get()
        }
    }
    getStyles() {
        const e = this.getValues(),
            t = e.glare,
            a = e.rotate,
            r = e.background;
        return {
            "--pointer-x": `${t.x}%`,
            "--pointer-y": `${t.y}%`,
            "--pointer-from-center": L(Math.sqrt((t.y - 50) * (t.y - 50) + (t.x - 50) * (t.x - 50)) / 50, 0, 1),
            "--pointer-from-top": t.y / 100,
            "--pointer-from-left": t.x / 100,
            "--card-opacity": t.o,
            "--rotate-x": `${a.x}deg`,
            "--rotate-y": `${a.y}deg`,
            "--background-x": `${r.x}%`,
            "--background-y": `${r.y}%`
        }
    }
    applyStyles() {
        if (!this.element) return;
        const e = this.springGlare.get(),
            t = this.springRotate.get(),
            a = this.springBackground.get(),
            r = e.x - 50,
            s = e.y - 50,
            o = L(Math.sqrt(r * r + s * s) / 50, 0, 1);
        this.lastAppliedValues || (this.lastAppliedValues = {});
        const n = this.lastAppliedValues;
        n.pointerX !== e.x && (this.element.style.setProperty("--pointer-x", `${e.x}%`), n.pointerX = e.x), n.pointerY !== e.y && (this.element.style.setProperty("--pointer-y", `${e.y}%`), n.pointerY = e.y), n.pointerFromCenter !== o && (this.element.style.setProperty("--pointer-from-center", o), n.pointerFromCenter = o), n.cardOpacity !== e.o && (this.element.style.setProperty("--card-opacity", e.o), n.cardOpacity = e.o), n.rotateX !== t.x && (this.element.style.setProperty("--rotate-x", `${t.x}deg`), n.rotateX = t.x), n.rotateY !== t.y && (this.element.style.setProperty("--rotate-y", `${t.y}deg`), n.rotateY = t.y), n.backgroundX !== a.x && (this.element.style.setProperty("--background-x", `${a.x}%`), n.backgroundX = a.x), n.backgroundY !== a.y && (this.element.style.setProperty("--background-y", `${a.y}%`), n.backgroundY = a.y)
    }
    destroy() {
        this.stop(), this.unbind(), this.onUpdate = null
    }
}

function P(e) {
    return "SORT_EIDOLON" === (null == e ? void 0 : e.sort)
}

function F(e) {
    return Array.isArray(null == e ? void 0 : e.selectedEidolons) ? e.selectedEidolons : []
}

function O(e) {
    const t = Number((null == e ? void 0 : e.slot_add_cost) || 0);
    return t ? "MATHSIGN_SUBTRACT" === e.slot_add_cost_mathsign || "MATHSIGN_SUBTRACT_MIN_0" === e.slot_add_cost_mathsign ? -t : t : 0
}

function N(e) {
    var t, a, r, s;
    return [null == e ? void 0 : e.slot_type_id, null == (t = null == e ? void 0 : e.slot_type) ? void 0 : t.slot_type, null == (a = null == e ? void 0 : e.slot_type) ? void 0 : a.slot_icon, null == (r = null == e ? void 0 : e.slot_type) ? void 0 : r.name, null == (s = null == e ? void 0 : e.slot_type) ? void 0 : s.id].filter(Boolean).join(" ").toLowerCase().includes("lux") ? "icon_eidolon_lux" : "icon_eidolon_umbra"
}

function _(e) {
    var t, a;
    return (null == e ? void 0 : e.slot_type_id) || (null == (t = null == e ? void 0 : e.slot_type) ? void 0 : t.id) || (null == (a = null == e ? void 0 : e.slot_type) ? void 0 : a.slot_type) || "none"
}

function j(e) {
    return e && "none" !== e ? e : "none"
}

function Z(e) {
    const t = Array.isArray(null == e ? void 0 : e.slot_add_card_talent_details) ? e.slot_add_card_talent_details : [];
    return t.length > 0 ? t : ((null == e ? void 0 : e.slot_add_card_talent) || []).filter(e => e && "TALENT_NONE" !== e).map(e => ({
        id: e,
        title: e.replace(/^TALENT_/, "").replace(/_/g, " "),
        desc: ""
    }))
}

function K(e) {
    return String((null == e ? void 0 : e.id) || "").toUpperCase()
}

function J(e) {
    return String((null == e ? void 0 : e.title) || "")
}

function W(e) {
    return function(e) {
        const t = K(e).match(/^TALENT_EXHAUST_(\d+)$/);
        if (t) return Number(t[1]);
        const a = J(e).match(/(\d+)\s*$/);
        return a ? Number(a[1]) : null
    }(e) || 1
}

function V(e, t) {
    if (!e || t <= 1) return e;
    let a = e;
    return a = a.replace(/使用此卡牌\d+次时/g, `使用此卡牌${t}次时`), a = a.replace(/使用此卡牌\d+次時/g, `使用此卡牌${t}次時`), a = a.replace(/used\s+\d+\s+times/gi, `used ${t} times`), a !== e || (a = a.replace(/使用此卡牌时/g, `使用此卡牌${t}次时`), a = a.replace(/使用此卡牌時/g, `使用此卡牌${t}次時`), a = a.replace(/When used,/i, `When used ${t} times,`)), a
}

function X(e) {
    const t = Array.isArray(null == e ? void 0 : e.talent) ? e.talent : [],
        a = F(e).flatMap(Z),
        r = [],
        s = {
            index: -1,
            total: 0,
            representative: null,
            hasNumberedRepresentative: !1
        },
        o = new Set;
    return [...t, ...a].forEach(e => {
        if (!e || !e.title && !e.desc && !e.id) return;
        if (function(e) {
                const t = K(e),
                    a = J(e).trim();
                return "TALENT_EXHAUST" === t || "TALENT_EXHAUST_N" === t || /^TALENT_EXHAUST_\d+$/.test(t) || /^消[灭滅]\d*$/.test(a) || /^Exhaust\s*\d*$/i.test(a)
            }(e)) {
            const t = W(e),
                a = t > 1;
            return -1 === s.index && (s.index = r.length, r.push(s)), s.total += t, void((!s.representative || a && !s.hasNumberedRepresentative) && (s.representative = e, s.hasNumberedRepresentative = a))
        }
        const t = e.id || `${e.title||""}:${e.desc||""}`;
        o.has(t) || (o.add(t), r.push(e))
    }), r.map(e => e === s ? function(e) {
        const t = e.representative,
            a = e.total;
        return a <= 1 ? { ...t
        } : { ...t,
            id: "TALENT_EXHAUST_N",
            title: (r = t.title, s = a, r ? s <= 1 ? r.replace(/\s*\d+\s*$/, "") : /\d+\s*$/.test(r) ? r.replace(/\d+\s*$/, String(s)) : /[A-Za-z]$/.test(r) ? `${r} ${s}` : `${r}${s}` : r),
            desc: V(t.desc, a)
        };
        var r, s
    }(s) : e).filter(Boolean)
}

function q(e, t = []) {
    if (!e) return e;
    const a = e.eidolonBaseName || e.name,
        r = e.eidolonBaseSctName || e.sct_name;
    if (!P(e)) return { ...e,
        eidolonBaseName: a,
        eidolonBaseSctName: r,
        eidolonIllustComb: null
    };
    const s = function(e, t = []) {
        if (!P(e) || !Array.isArray(t) || 0 === t.length) return null;
        const a = F(e);
        if (0 === a.length) return null;
        const r = (null == e ? void 0 : e.card_category) || (null == e ? void 0 : e.category),
            s = j(_(a[0])),
            o = j(a[1] ? _(a[1]) : "none");
        return t.find(e => (null == e ? void 0 : e.card_category) === r && j(null == e ? void 0 : e.slot_type_0) === s && j(null == e ? void 0 : e.slot_type_1) === o) || null
    }(e, t);
    return s ? { ...e,
        name: s.name || a,
        sct_name: s.change_to_sct_name || r,
        eidolonBaseName: a,
        eidolonBaseSctName: r,
        eidolonIllustComb: s
    } : { ...e,
        name: a,
        sct_name: r,
        eidolonBaseName: a,
        eidolonBaseSctName: r,
        eidolonIllustComb: null
    }
}
const $ = {
    class: "cost-wrapper"
};
const ee = {
        name: "CznCard",
        components: {
            CznCardCost: e({
                name: "CznCardCost",
                props: {
                    cost: {
                        type: Number,
                        required: !0
                    },
                    scale: {
                        type: Number,
                        default: 1
                    },
                    costChange: {
                        type: Number,
                        default: 0
                    }
                },
                setup(e) {
                    const n = t(null),
                        l = a(() => e.cost < 0 ? "normal" : e.costChange < 0 ? "green" : e.costChange > 0 ? "red" : "normal"),
                        i = t(Y(l.value)),
                        c = a(() => e.cost < 0 ? "x" : e.cost ? ? 0),
                        d = a(() => {
                            const t = e.scale || 1;
                            return {
                                fontSize: 24 * t + "px",
                                transform: `scale(${t})`,
                                transformOrigin: "top left"
                            }
                        }),
                        g = a(() => ({
                            width: "234px",
                            height: "91px",
                            transform: `scale(${e.scale||1})`,
                            transformOrigin: "top left"
                        })),
                        h = async () => {
                            if (!n.value) return;
                            const t = n.value,
                                a = t.getContext("2d");
                            t.width = 234, t.height = 91, a.imageSmoothingEnabled = !1;
                            try {
                                const t = await U(l.value);
                                i.value || (i.value = !0);
                                const r = (e => "green" === e || "red" === e ? {
                                        chars: {
                                            48: {
                                                x: 0,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            49: {
                                                x: 79,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            50: {
                                                x: 158,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            51: {
                                                x: 237,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            52: {
                                                x: 316,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            53: {
                                                x: 395,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            54: {
                                                x: 0,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            55: {
                                                x: 79,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            56: {
                                                x: 158,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            57: {
                                                x: 237,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            }
                                        }
                                    } : {
                                        chars: {
                                            48: {
                                                x: 79,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            49: {
                                                x: 158,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            50: {
                                                x: 237,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            51: {
                                                x: 316,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            52: {
                                                x: 395,
                                                y: 0,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            53: {
                                                x: 0,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            54: {
                                                x: 79,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            55: {
                                                x: 158,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            56: {
                                                x: 237,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            57: {
                                                x: 316,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            },
                                            120: {
                                                x: 395,
                                                y: 92,
                                                width: 78,
                                                height: 91,
                                                xadvance: 78
                                            }
                                        }
                                    })(l.value),
                                    s = (e.cost < 0 ? "x" : e.cost ? ? 0).toString();
                                let o = 0;
                                for (let e = 0; e < s.length; e++) {
                                    const n = s[e].charCodeAt(0),
                                        l = r.chars[n];
                                    l && (a.drawImage(t, l.x, l.y, l.width, l.height, o, 0, l.width, l.height), o += l.xadvance)
                                }
                            } catch (r) {}
                        };
                    return r([() => e.cost, () => e.costChange], () => {
                        o(() => {
                            h()
                        })
                    }, {
                        immediate: !0
                    }), r(() => e.scale, () => {}), s(() => {
                        o(() => {
                            h()
                        })
                    }), {
                        costCanvas: n,
                        canvasStyle: g,
                        isLoaded: i,
                        displayCost: c,
                        placeholderStyle: d
                    }
                }
            }, [
                ["render", function(e, t, a, r, s, o) {
                    return h(), n("div", $, [l(c("canvas", {
                        ref: "costCanvas",
                        class: "cost-canvas",
                        style: d(r.canvasStyle)
                    }, null, 4), [
                        [i, r.isLoaded]
                    ]), l(c("span", {
                        class: "cost-placeholder",
                        style: d(r.placeholderStyle)
                    }, g(r.displayCost), 5), [
                        [i, !r.isLoaded]
                    ])])
                }],
                ["__scopeId", "data-v-91c52e46"]
            ])
        },
        props: {
            card: {
                type: Object,
                required: !0
            },
            scale: {
                type: Number,
                default: 1
            },
            characterEgo: {
                type: String,
                default: "basic"
            },
            debugMode: {
                type: Boolean,
                default: !1
            },
            showRemoveButton: {
                type: Boolean,
                default: !1
            },
            showCopyButton: {
                type: Boolean,
                default: !1
            },
            selected: {
                type: Boolean,
                default: !1
            },
            enable3d: {
                type: Boolean,
                default: void 0
            },
            enableAnimation: {
                type: Boolean,
                default: void 0
            },
            onlyPortrait: {
                type: Boolean,
                default: !1
            },
            isNew: {
                type: Boolean,
                default: !1
            },
            enableAprilFool: {
                type: Boolean,
                default: void 0
            }
        },
        emits: ["remove", "copy"],
        setup(e, {
            emit: n
        }) {
            const {
                t: l,
                locale: i
            } = A(), c = u(), d = t(null), g = t(null), h = t(null), m = t(!1), y = t(!1), C = a(() => String(i.value || "").startsWith("en")), B = a(() => String(i.value || "").startsWith("zh")), E = t({}), v = t(window.innerWidth), f = a(() => v.value <= 767), w = () => "false" !== localStorage.getItem("czn_combatant_enable_animation"), I = t(w()), Y = () => {
                I.value = w()
            }, U = a(() => void 0 !== e.enable3d ? e.enable3d : I.value), L = a(() => (!ce.value || !x(e.card.sct_name)) && (void 0 !== e.enableAnimation ? e.enableAnimation : I.value)), T = a(() => {
                if (!e.card.rarity) return {};
                const t = Q(e.card.rarity, !0);
                return t ? {
                    color: t
                } : {}
            }), R = t(!1);
            let H = null,
                P = null;
            const _ = t(!1),
                j = t(!1),
                Z = a(() => !(L.value && e.card.animation && ge.value && !_.value) || !(!ge.value || j.value)),
                K = () => {
                    d.value && tt.value && o(() => {
                        const e = d.value.getBoundingClientRect(),
                            t = window.innerWidth,
                            a = window.innerHeight,
                            r = g.value ? g.value.offsetHeight : 200,
                            s = 15,
                            n = t - e.right - s,
                            l = e.left - s,
                            i = n < 330 && l >= 330;
                        m.value = i;
                        let c = e.top + .02 * e.height;
                        c + r > a && (c = Math.max(0, a - r - 10)), c < 0 && (c = 10), E.value = i ? {
                            right: `${t-e.left+s}px`,
                            top: `${c}px`,
                            left: "auto"
                        } : {
                            left: `${e.right+s}px`,
                            top: `${c}px`,
                            right: "auto"
                        }, y.value && g.value && o(() => {
                            if (g.value) {
                                const r = g.value.offsetHeight,
                                    o = g.value.offsetWidth,
                                    n = e.top + .02 * e.height;
                                let l = n;
                                if (n + r > a && (l = Math.max(0, a - r - 10)), l < 0 && (l = 10), i) {
                                    const t = Math.max(10, e.left - o - s);
                                    E.value = {
                                        left: `${t}px`,
                                        top: `${l}px`,
                                        right: "auto"
                                    }
                                } else {
                                    const a = e.right + s;
                                    E.value = a + o > t - 10 ? {
                                        left: `${Math.max(10,t-o-10)}px`,
                                        top: `${l}px`,
                                        right: "auto"
                                    } : { ...E.value,
                                        top: `${l}px`
                                    }
                                }
                            }
                        })
                    })
                },
                J = 468,
                W = 680,
                V = a(() => ({
                    width: `${J*e.scale}px`,
                    height: `${W*e.scale}px`,
                    fontSize: 16 * e.scale + "px",
                    transform: "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))"
                })),
                q = a(() => ({})),
                $ = a(() => ({})),
                ee = a(() => {
                    const t = e.scale;
                    return {
                        width: `${78*t*.9}px`,
                        height: `${91*t*.9}px`,
                        transform: "translateY(0%)"
                    }
                }),
                te = a(() => {
                    const t = e.scale;
                    return {
                        color: "white",
                        backgroundColor: "rgba(186, 68, 246, 1)",
                        fontSize: 20 * t + "px",
                        padding: `${0*t}px ${5*t}px`,
                        borderRadius: 4 * t + "px",
                        marginTop: -8 * t + "px",
                        height: 25 * t + "px",
                        lineHeight: 25 * t + "px",
                        width: "fit-content",
                        minWidth: "fit-content"
                    }
                }),
                ae = a(() => {
                    if (!e.selected) return {};
                    const t = e.scale,
                        a = 56.16 * t;
                    return {
                        width: `${a}px`,
                        height: `${a}px`,
                        top: `${34*t}px`,
                        right: `${.05*J*t}px`,
                        fontSize: `${.55*a}px`
                    }
                }),
                re = a(() => {
                    if (!e.showRemoveButton) return {};
                    const t = e.scale,
                        a = 56.16 * t;
                    return {
                        width: `${a}px`,
                        height: `${a}px`,
                        top: `${34*t}px`,
                        right: `${.05*J*t}px`,
                        fontSize: `${.65*a}px`
                    }
                }),
                se = a(() => {
                    if (!e.showCopyButton) return {};
                    const t = e.scale,
                        a = 56.16 * t;
                    return {
                        width: `${a}px`,
                        height: `${a}px`,
                        top: `${34*t+a+.1*a}px`,
                        right: `${.05*J*t}px`,
                        fontSize: `${.5*a}px`
                    }
                }),
                oe = a(() => e.card && e.card.r_spark_cards && e.card.r_spark_cards.length > 0),
                ne = a(() => {
                    const t = (e.characterEgo || "basic").toLowerCase().replace(/[^a-z0-9_]/g, "_");
                    return D(`card_ego_${t}`)
                }),
                le = a(() => {
                    var t;
                    if ("EGO_OWNER" == e.card.ego_type) {
                        if (null == (t = e.card.base_combatant) ? void 0 : t.ego) {
                            const t = e.card.base_combatant.ego.toLowerCase();
                            if ("owner" !== t) {
                                const e = t.replace(/[^a-z0-9_]/g, "_");
                                return D(`card_ego_${e}`)
                            }
                        }
                        const a = (e.characterEgo || "basic").toLowerCase().replace(/[^a-z0-9_]/g, "_");
                        return D(`card_ego_${a}`)
                    }
                    return D("card_" + e.card.ego_type.toLowerCase().replace(/[^a-z0-9_]/g, "_"))
                }),
                ie = a(() => {
                    var t;
                    if ("EGO_OWNER" == e.card.ego_type && (null == (t = e.card.base_combatant) ? void 0 : t.ego)) {
                        const t = e.card.base_combatant.ego.toLowerCase();
                        if ("owner" !== t) {
                            const e = t.replace(/[^a-z0-9_]/g, "_");
                            return M(`img/deco_tp_skill_ego_${e}.webp`)
                        }
                    }
                    return M("img/deco_tp_skill_ego_basic.webp")
                }),
                ce = a(() => {
                    if (void 0 !== e.enableAprilFool) return e.enableAprilFool;
                    const t = new Date;
                    return 3 === t.getMonth() && 1 === t.getDate()
                }),
                de = a(() => e.card.sct_name ? ce.value && x(e.card.sct_name) ? k(e.card.sct_name) : S(e.card.sct_name) : null),
                ge = a(() => e.card.sct_name && e.card.animation ? G(e.card.sct_name) : null);
            r([() => e.card.sct_name, L], () => {
                _.value = !1, j.value = !1
            });
            const he = a(() => {
                    if (!e.card.rarity) return {
                        icon: null,
                        iconSub: null,
                        title: null
                    };
                    const t = {
                        RARITY_COMMON: "common",
                        RARITY_RARE: "rare",
                        RARITY_LEGEND: "legend",
                        RARITY_UNIQUE: "unique"
                    }[e.card.rarity] || "common";
                    return {
                        icon: D(`card_rarity_${t}`),
                        iconSub: D(`card_rarity_${t}_sub`),
                        title: D(`card_title_rarity_${t}`)
                    }
                }),
                Ae = a(() => he.value.icon),
                ue = a(() => he.value.iconSub),
                pe = a(() => he.value.title),
                me = a(() => D("energy_line_default")),
                ye = a(() => new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAADsUlEQVR4XmNkGGigoKnJoKStzaBhZMQAYisYGjLwi4gwLO3oADmNiWGwASYWFmQn0S8EQaGipKPDoGJiwqCsr8+gAGQrGxgY8TEwaPMwMJgAaR1eBgZWoPPE2RgY1I/8BruTheoByMHNxaAIslxPnwHkIHU9PQZlHR1JoAPNgZZZiAEdBHSIFAcDgwDQdiZmBobf/xkYvv8F4n9ABWhxSr4DOXl4GEQkJBhUdIyBaUiTQc1AD0wLa2pYAB1gDAwVEK3MycAgyA0JmV9A+38CHQGivwEd9RHI//8fGkRAhzIwQ9hiIEeyspIQguKysgwySkoMqsCoUVRVZVA3MGCQU1HRE5aQ0AWGhDbQLAtgtEiK/mdgBYUIAyRUQCHzE+iAl0D+379Qh8AcxEAcQA1BNg4OcLTIA3OWBjCtgGgVKyspLiYmDT4mJntxZmYddhYWGWB64WdnYGAB+vTHL4hjfgEtfvuXkQEUQihWU5gNWRiEpaTABlYtXsJg6ORoDUq0XAwMZsAo0gZGD48Iqk//AB30HZh+X36FiP9hRgsJKmc7FgaQw4B29Ic6OfoAnfoXGBKgNAIKEXCo/GRg+IseG6SkXBKjFNMqYKiBBEGOe/4DGF3Uz9cMlIDBV1Cj+WbQO5CFAVLcgIug3/SIXrQ0iR5CoHLxPyjj/YAE5YCnOA6gY1iBrgRjYAkALL0YDr0FOu7Gjh0gJ9LNgSxAyzmBmBnoGC6Qg6DF0WtgkXXxAwPD2XcMDNc+MTAcALnqONBxnbm5NHEgyCHsQMtZgRhYuTCAaFAofASWm8++MzDcANq6/zUDwxVgPffo64uXDNduXGd4eP0aw62zZ8H01WMnkPMJIgSBaQMU/4xoBS3TP9RsxYKWaECOYQeKgTAbqGYBhsbrPwwMV4Fp6NhnBoaTwFC58vXrV4bHt24zPLh+neHG+XMMdy9dZrh3+TLD2+fPCBVBREUxKJ3AHCaEpOMZsBC/CnTEFaAjTgEddhVIv3t6/z4wJIChcu0a2BG3T58DOuwKA5mAheE/pD3xl4GRERQaLND0AY4moKH/gIn4J7AqefaNgeH8GwaGS0D2GWD03Lv3/j3DC6Bj7pw4wfDwGjSKgPS3T58YqAhYGP7+AddkP/6zsggAHfcRaPkFYFo59YWB4TKQPvPhxw9g9NxkeAhMKzfPnmG4dvYCw4t798COY6A9YGFY0t4OskaXoaKc4f2rVwx3r1wBppFLcPz45k2G379+MQwQGPQ1CcMooDAEALxBGGOH+SGZAAAAAElFTkSuQmCC",
                    import.meta.url).href),
                Ce = a(() => new URL("data:image/png;base64,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",
                    import.meta.url).href),
                Be = a(() => "SORT_SUPPORT" === e.card.sort ? new URL("data:image/png;base64,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",
                    import.meta.url).href : "SORT_COLLAPSE_SKILL" === e.card.sort ? new URL("data:image/png;base64,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",
                    import.meta.url).href : null),
                Ee = a(() => "SORT_SUPPORT" === e.card.sort ? l("czn.tpSkillType.supp") : "SORT_COLLAPSE_SKILL" === e.card.sort ? l("czn.tpSkillType.awaken") : ""),
                ve = a(() => e.card.selectedSparks && Array.isArray(e.card.selectedSparks) ? e.card.selectedSparks.reduce((e, t) => e + (t.add_cost_value || 0), 0) : 0),
                fe = a(() => F(e.card)),
                we = a(() => fe.value.reduce((e, t) => e + O(t), 0)),
                Ie = a(() => ve.value + we.value),
                xe = a(() => {
                    const t = e.card.cost ? ? 0;
                    return -1 === t ? -1 : t + Ie.value
                }),
                De = a(() => {
                    const e = xe.value;
                    return e < 0 ? 0 : e
                }),
                Me = a(() => {
                    const t = e.scale;
                    return {
                        width: 50 * t + "px",
                        height: 50 * t + "px",
                        display: "block"
                    }
                }),
                ke = a(() => D("card_bg_disc")),
                Se = a(() => D("card_bg_title")),
                Ge = a(() => Te.value ? "CARD_COLLAPSE" : e.card.card_category),
                Qe = a(() => {
                    if (!Ge.value) return null;
                    const e = Ge.value.toLowerCase();
                    return D(`icon_category_${e}`)
                }),
                be = a(() => {
                    const t = e.card.rarity,
                        a = e.card.card_category,
                        r = e.card.sort,
                        s = "CARD_CURSE" === a,
                        o = "CARD_ABNORM" === a,
                        n = "SORT_COLLAPSE" === r,
                        l = "SORT_COLLAPSE_SKILL" === r,
                        i = "SORT_SUPPORT" === r;
                    return {
                        isUnique: "RARITY_UNIQUE" === t,
                        isCurse: s,
                        isAbnorm: o,
                        isCollapse: n,
                        isCollapseSkill: l,
                        isSupport: i,
                        showLeftBorder: !(n || s || l || i || o),
                        fullWidthIllustration: n || s || l || i || o
                    }
                }),
                Ye = a(() => be.value.isUnique),
                Ue = a(() => be.value.isCurse),
                Le = a(() => be.value.isAbnorm),
                Te = a(() => be.value.isCollapse),
                Re = a(() => be.value.isCollapseSkill),
                He = a(() => be.value.isSupport),
                ze = a(() => {
                    const t = (() => {
                        var t;
                        let a = (null == (t = e.card.base_combatant) ? void 0 : t.ego) || e.characterEgo || "basic";
                        return "owner" === a.toLowerCase() && (a = e.characterEgo || "basic"), a.toLowerCase().replace(/[^a-z0-9_]/g, "_")
                    })();
                    return {
                        left: D(`card_ego_${t}_abnorm_l`),
                        right: D(`card_ego_${t}_abnorm_r`),
                        top: D(`card_ego_${t}_abnorm_t`),
                        bottom: D(`card_ego_${t}_abnorm_b`)
                    }
                }),
                Pe = a(() => ze.value.left),
                Fe = a(() => ze.value.right),
                Oe = a(() => ze.value.top),
                Ne = a(() => ze.value.bottom),
                _e = a(() => D("card_frame_card_collapse")),
                je = a(() => D("icon_card_collapse_off")),
                Ze = a(() => ({
                    left: D("card_frame_card_curse_l"),
                    right: D("card_frame_card_curse_r"),
                    top: D("card_frame_card_curse_top"),
                    bottom: D("card_frame_card_curse_bottom")
                })),
                Ke = a(() => Ze.value.left),
                Je = a(() => Ze.value.right),
                We = a(() => Ze.value.top),
                Ve = a(() => Ze.value.bottom),
                Xe = a(() => e.card.name && e.card.name.length > 10),
                qe = a(() => X(e.card).filter(e => e && (e.title || e.desc))),
                $e = a(() => e.card.tooltips && Array.isArray(e.card.tooltips) ? e.card.tooltips.filter(e => e && (e.title || e.desc)) : []),
                et = a(() => {
                    const t = [];
                    return e.card.rarity && t.push({
                        title: l("czn.cards.rarity") || "稀有度",
                        desc: Ct(e.card.rarity)
                    }), e.card.chaos_name && t.push({
                        title: l("czn.cards.source"),
                        desc: e.card.chaos_name
                    }), qe.value.length > 0 && t.push(...qe.value), $e.value.length > 0 && t.push(...$e.value), t
                }),
                tt = a(() => et.value.length > 0),
                at = a(() => qe.value.length > 0),
                rt = new Set(["NIHILUM", "DIALLOS", "SECRED", "CIRCEN", "VITOR", "CALIGO"]),
                st = a(() => {
                    if (!e.card.selectedSparks || !Array.isArray(e.card.selectedSparks)) return {
                        nonGod: [],
                        god: []
                    };
                    const t = [],
                        a = [];
                    return e.card.selectedSparks.forEach(e => {
                        (e => {
                            const t = e.god_type;
                            return t && "none" !== t && rt.has(t)
                        })(e) ? a.push(e): t.push(e)
                    }), {
                        nonGod: t,
                        god: a
                    }
                }),
                ot = a(() => st.value.god.length > 0),
                nt = a(() => st.value.nonGod.length > 0),
                lt = a(() => ot.value || nt.value),
                it = a(() => fe.value.length > 0),
                ct = a(() => {
                    if (ot.value) {
                        const e = st.value.god[0];
                        return e && e.god_type ? D(`icon_card_battle_expand_${e.god_type.toLowerCase()}`) : D("icon_card_battle_expand_circen")
                    }
                    return nt.value ? D("icon_card_battle_expand_default") : null
                }),
                dt = a(() => D("card_sel")),
                gt = a(() => D("card_frame_shadow")),
                ht = a(() => {
                    const t = e.scale,
                        a = 2 * t;
                    return {
                        "--box-shadow-blur": `${8*t}px`,
                        "--box-shadow-spread": `${4*t}px`,
                        "--box-shadow-color": c.isLight ? "rgba(0, 122, 255, 0.8)" : "rgba(255, 215, 0, 0.8)",
                        "--border-width": `${a}px`,
                        "--border-color": c.isLight ? "#007AFF" : "#FFD700"
                    }
                }),
                At = a(() => {
                    const t = 20 * e.scale;
                    return {
                        "--card-selection-image": `url(${gt.value})`,
                        "--border-image-width": `${t}px`
                    }
                }),
                ut = a(() => {
                    const t = e.scale,
                        a = 149.76 * t,
                        r = ot.value ? .9 * a : .8 * a * .7;
                    return {
                        width: `${r}px`,
                        height: `${r}px`,
                        left: `${ot.value?4.5:9.5}%`,
                        top: "20%",
                        fontSize: 16 * t + "px"
                    }
                }),
                pt = a(() => D("img_slot_eidolon")),
                mt = a(() => {
                    const t = e.scale,
                        a = .14 * J * t;
                    return {
                        "--eidolon-slots-width": `${a}px`,
                        "--eidolon-slots-height": `${a*(136/76)}px`,
                        "--eidolon-slot-icon-size": `${a*(52/76)}px`
                    }
                }),
                yt = e => D(N(e)),
                Ct = e => ({
                    RARITY_COMMON: l("czn.items.rarityCommon"),
                    RARITY_RARE: l("czn.items.rarityRare"),
                    RARITY_LEGEND: l("czn.items.rarityLegend"),
                    RARITY_UNIQUE: l("czn.items.rarityUnique")
                }[e] || e),
                Bt = ((e, t) => {
                    let a;
                    return function(...r) {
                        clearTimeout(a), a = setTimeout(() => {
                            clearTimeout(a), e(...r)
                        }, t)
                    }
                })(K, 100),
                Et = () => {
                    v.value = window.innerWidth, y.value && Bt()
                },
                vt = () => {
                    y.value && Bt()
                };
            return s(() => {
                K(), window.addEventListener("resize", Et), window.addEventListener("scroll", vt, !0), window.addEventListener("czn-animation-setting-changed", Y), U.value && o(() => {
                    P = new z({
                        stiffness: .08,
                        damping: .3,
                        onUpdate: () => {
                            if (P.applyStyles(), d.value) {
                                const e = getComputedStyle(d.value),
                                    t = parseFloat(e.getPropertyValue("--pointer-x") || 50),
                                    a = parseFloat(e.getPropertyValue("--pointer-y") || 50),
                                    r = Math.abs(t - 50) / 50,
                                    s = Math.abs(a - 50) / 50,
                                    o = Math.sqrt(r * r + s * s);
                                d.value.style.setProperty("--pointer-from-center", Math.min(o, 1)), d.value.style.setProperty("--background-x", t), d.value.style.setProperty("--background-y", a)
                            }
                        }
                    }), d.value && P.bind(d.value).start()
                }), H = new IntersectionObserver(e => {
                    e.forEach(e => {
                        e.isIntersecting ? (R.value = !0, P && !P.isRunning && P.start()) : (R.value = !1, P && P.stop())
                    })
                }, {
                    rootMargin: "50px 0px"
                }), d.value && H.observe(d.value)
            }), r(U, (e, t) => {
                e && !P ? o(() => {
                    P = new z({
                        stiffness: .08,
                        damping: .3,
                        onUpdate: () => {
                            if (P.applyStyles(), d.value) {
                                const e = getComputedStyle(d.value),
                                    t = parseFloat(e.getPropertyValue("--pointer-x") || 50),
                                    a = parseFloat(e.getPropertyValue("--pointer-y") || 50),
                                    r = Math.abs(t - 50) / 50,
                                    s = Math.abs(a - 50) / 50,
                                    o = Math.sqrt(r * r + s * s);
                                d.value.style.setProperty("--pointer-from-center", Math.min(o, 1)), d.value.style.setProperty("--background-x", t), d.value.style.setProperty("--background-y", a)
                            }
                        }
                    }), d.value && P.bind(d.value).start()
                }) : !e && P && (P.destroy(), P = null, d.value && (d.value.style.setProperty("--rotate-x", "0deg"), d.value.style.setProperty("--rotate-y", "0deg"), d.value.style.setProperty("--pointer-x", "50"), d.value.style.setProperty("--pointer-y", "50"), d.value.style.setProperty("--pointer-from-center", "0"), d.value.style.setProperty("--background-x", "50"), d.value.style.setProperty("--background-y", "50"), d.value.style.setProperty("--card-opacity", "0")))
            }), p(() => {
                window.removeEventListener("resize", Et), window.removeEventListener("scroll", vt, !0), window.removeEventListener("czn-animation-setting-changed", Y), H && (H.disconnect(), H = null), P && (P.destroy(), P = null)
            }), {
                cardRef: d,
                tooltipRef: g,
                showTooltipOnLeft: m,
                showTooltip: y,
                tooltipStyle: E,
                handleMouseEnter: () => {
                    f.value || (y.value = !0, K())
                },
                handleMouseLeave: () => {
                    y.value = !1
                },
                tooltipItems: et,
                hasTooltipContent: tt,
                formatTooltipDesc: e => e ? b(e) : "",
                descriptionText: h,
                nameStyle: T,
                cardStyles: V,
                holographicStyle: q,
                energyLineStyle: $,
                collapseIconStyle: ee,
                collapseTextStyle: te,
                cardEgoBackgroundUrl: ne,
                cardLeftBorderUrl: le,
                cardDecoTpSkillEgoUrl: ie,
                cardIllustrationUrl: de,
                cardIllustrationAnimationUrl: ge,
                rarityImageUrl: Ae,
                rarityImageSubUrl: ue,
                rarityTitleUrl: pe,
                energyLineUrl: me,
                cardBottomBgUrl: ke,
                cardTopBgUrl: Se,
                cardCategoryIconUrl: Qe,
                displayCategory: Ge,
                cardTypeFlags: be,
                isUnique: Ye,
                isCurseCard: Ue,
                curseFrameLeftUrl: Ke,
                curseFrameRightUrl: Je,
                curseFrameTopUrl: We,
                curseFrameBottomUrl: Ve,
                isAbnormCard: Le,
                abnormFrameLeftUrl: Pe,
                abnormFrameRightUrl: Fe,
                abnormFrameTopUrl: Oe,
                abnormFrameBottomUrl: Ne,
                isCollapseCard: Te,
                isCollapseSkillCard: Re,
                isSupportCard: He,
                collapseFrameUrl: _e,
                collapseIconUrl: je,
                gaugeTpOnUrl: ye,
                decoStarUrl: Ce,
                tpSkillTypeIconUrl: Be,
                tpSkillTypeText: Ee,
                sparkCostAdjustment: ve,
                eidolonCostAdjustment: we,
                totalCostAdjustment: Ie,
                adjustedCost: xe,
                costGaugeCount: De,
                gaugeImageStyle: Me,
                isLongName: Xe,
                hasRSparkCards: oe,
                validTalents: qe,
                hasValidTalents: at,
                getFormattedContent: () => {
                    let t = "";
                    if (at.value) {
                        const e = qe.value.map(e => e.title).join("/");
                        t += `<div class="talent-text">[${e}]</div>`
                    }
                    return e.card.desc_display && (t += b(e.card.desc_display, "#7de5ff")), fe.value.length > 0 && fe.value.forEach(e => {
                        e.description && (t += `<div class="spark-text spark-eidolon"><img class="eidolon-desc-icon" src="${yt(e)}" alt="" />${b(e.description)}</div>`)
                    }), st.value.nonGod.length > 0 && st.value.nonGod.forEach(e => {
                        e.description && (t += `<div class="spark-text spark-non-god">${b(e.description)}</div>`)
                    }), st.value.god.length > 0 && st.value.god.forEach(e => {
                        e.description && (t += `<div class="spark-text spark-god">${b(e.description)}</div>`)
                    }), t
                },
                getRarityText: Ct,
                getCategoryText: e => {
                    if (!e) return "";
                    const t = e.toLowerCase();
                    return l(`czn.cardCategory.${t}`, e)
                },
                formatDescription: b,
                handleImageError: e => {
                    e.target.style.display = "none"
                },
                handleVideoError: e => {
                    _.value = !0, j.value = !1, e.target.style.display = "none"
                },
                handleVideoLoaded: () => {
                    j.value = !0
                },
                handleLeftBorderError: e => {
                    ne.value && e.target.src !== ne.value ? e.target.src = ne.value : e.target.style.display = "none"
                },
                handleRarityImageError: e => {
                    e.target.style.display = "none"
                },
                handleBackgroundImageLoad: () => {},
                selectedBadgeStyle: ae,
                removeButtonStyle: re,
                handleRemove: () => {
                    n("remove", e.card)
                },
                copyButtonStyle: se,
                handleCopy: () => {
                    n("copy", e.card)
                },
                webmLoadFailed: _,
                webmLoaded: j,
                showStaticImageMask: Z,
                hasGodSpark: ot,
                hasNonGodSpark: nt,
                hasAnySpark: lt,
                hasEidolons: it,
                selectedEidolons: fe,
                godSparkIconUrl: ct,
                godSparkIconStyle: ut,
                eidolonSlotBgUrl: pt,
                eidolonSlotsStyle: mt,
                getEidolonIconUrl: yt,
                cardSelectionUrl: dt,
                cardSelectionStyle: ht,
                cardFrameShadowUrl: gt,
                cardFrameShadowStyle: At,
                effectiveEnableAnimation: L,
                isEnglishLocale: C,
                isChineseLocale: B,
                t: l
            }
        }
    },
    te = {
        key: 0,
        class: "tooltip-title"
    },
    ae = ["innerHTML"],
    re = {
        key: 0,
        class: "card-shine"
    },
    se = {
        key: 1,
        class: "card-holo"
    },
    oe = {
        class: "card-background"
    },
    ne = {
        key: 0,
        class: "card-bg-left"
    },
    le = ["src"],
    ie = {
        key: 1,
        class: "card-deco-tp-skill-ego"
    },
    ce = {
        class: "deco-wrapper"
    },
    de = ["src"],
    ge = {
        class: "deco-vertical-line"
    },
    he = ["src"],
    Ae = ["src"],
    ue = ["src", "alt"],
    pe = ["src"],
    me = {
        key: 2,
        class: "illustration-placeholder"
    },
    ye = {
        key: 4,
        class: "ribbon-wrapper"
    },
    Ce = {
        key: 2,
        class: "card-rarity-icon"
    },
    Be = ["src"],
    Ee = {
        key: 3,
        class: "card-rarity-icon-sub"
    },
    ve = ["src"],
    fe = {
        key: 4,
        class: "card-rarity-title"
    },
    we = ["src"],
    Ie = {
        class: "card-curse-frame card-curse-frame-l"
    },
    xe = ["src"],
    De = {
        class: "card-curse-frame card-curse-frame-r"
    },
    Me = ["src"],
    ke = {
        class: "card-curse-frame card-curse-frame-top"
    },
    Se = ["src"],
    Ge = {
        class: "card-curse-frame card-curse-frame-bottom"
    },
    Qe = ["src"],
    be = {
        class: "card-abnorm-frame card-abnorm-frame-l"
    },
    Ye = ["src"],
    Ue = {
        class: "card-abnorm-frame card-abnorm-frame-r"
    },
    Le = ["src"],
    Te = {
        class: "card-abnorm-frame card-abnorm-frame-top"
    },
    Re = ["src"],
    He = {
        class: "card-abnorm-frame card-abnorm-frame-bottom"
    },
    ze = ["src"],
    Pe = {
        class: "card-collapse-frame card-collapse-frame-l"
    },
    Fe = ["src"],
    Oe = {
        class: "card-collapse-frame card-collapse-frame-r"
    },
    Ne = ["src"],
    _e = {
        key: 2,
        class: "card-content"
    },
    je = {
        key: 1,
        class: "card-cost"
    },
    Ze = ["src"],
    Ke = {
        key: 1,
        class: "cost-wrapper"
    },
    Je = ["src"],
    We = ["src"],
    Ve = ["src"],
    Xe = ["src"],
    qe = {
        key: 5,
        class: "card-cost-gauge"
    },
    $e = ["src"],
    et = {
        key: 6,
        class: "card-rarity"
    },
    tt = {
        class: "rarity-badge"
    },
    at = {
        key: 7,
        class: "card-category"
    },
    rt = ["src"],
    st = {
        class: "category-text"
    },
    ot = {
        key: 8,
        class: "card-description"
    },
    nt = ["innerHTML"],
    lt = {
        key: 9,
        class: "card-info-center"
    },
    it = {
        class: "info-center-name"
    },
    ct = {
        class: "info-center-type"
    },
    dt = ["src"],
    gt = {
        class: "tp-skill-type-text"
    },
    ht = {
        class: "info-center-description"
    },
    At = ["innerHTML"],
    ut = ["title"],
    pt = ["title"];
const mt = e(ee, [
    ["render", function(e, t, a, r, s, o) {
        const l = w("CznCardCost");
        return h(), n("div", {
            class: "czn-card-wrapper",
            onMouseenter: t[31] || (t[31] = (...e) => r.handleMouseEnter && r.handleMouseEnter(...e)),
            onMouseleave: t[32] || (t[32] = (...e) => r.handleMouseLeave && r.handleMouseLeave(...e))
        }, [(h(), m(v, {
            to: "body"
        }, [r.hasTooltipContent ? (h(), n("div", {
            key: 0,
            class: C(["card-tooltip", {
                "tooltip-left": r.showTooltipOnLeft,
                "tooltip-visible": r.showTooltip
            }]),
            style: d(r.tooltipStyle),
            ref: "tooltipRef"
        }, [(h(!0), n(B, null, E(r.tooltipItems, (e, t) => (h(), n("div", {
            key: t,
            class: "tooltip-item"
        }, [e.title ? (h(), n("div", te, g(e.title), 1)) : y("", !0), e.desc ? (h(), n("div", {
            key: 1,
            class: "tooltip-desc",
            innerHTML: r.formatTooltipDesc(e.desc)
        }, null, 8, ae)) : y("", !0)]))), 128))], 6)) : y("", !0)])), c("div", {
            class: C(["czn-card", {
                "unique-card": r.isUnique
            }]),
            style: d(r.cardStyles),
            ref: "cardRef"
        }, [a.onlyPortrait ? y("", !0) : (h(), n("div", re)), a.onlyPortrait ? y("", !0) : (h(), n("div", se)), c("div", oe, [r.cardTypeFlags.showLeftBorder ? (h(), n("div", ne, [r.cardLeftBorderUrl ? (h(), n("img", {
            key: 0,
            src: r.cardLeftBorderUrl,
            alt: "card left border",
            class: "bg-image",
            loading: "lazy",
            decoding: "async",
            onLoad: t[0] || (t[0] = (...e) => r.handleBackgroundImageLoad && r.handleBackgroundImageLoad(...e)),
            onError: t[1] || (t[1] = (...e) => r.handleLeftBorderError && r.handleLeftBorderError(...e))
        }, null, 40, le)) : y("", !0)])) : y("", !0), r.isCollapseSkillCard || r.isSupportCard ? (h(), n("div", ie, [c("div", ce, [r.cardDecoTpSkillEgoUrl ? (h(), n("img", {
            key: 0,
            src: r.cardDecoTpSkillEgoUrl,
            alt: "deco tp skill ego",
            class: "deco-tp-skill-ego-image",
            loading: "lazy",
            decoding: "async",
            onError: t[2] || (t[2] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, de)) : y("", !0), c("div", ge, [c("img", {
            src: r.decoStarUrl,
            alt: "deco star",
            class: "deco-star-image deco-star-top",
            loading: "lazy",
            decoding: "async",
            onError: t[3] || (t[3] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, he), c("img", {
            src: r.decoStarUrl,
            alt: "deco star",
            class: "deco-star-image deco-star-bottom",
            loading: "lazy",
            decoding: "async",
            onError: t[4] || (t[4] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Ae)])])])) : y("", !0), c("div", {
            class: C(["card-bg-right", {
                "card-bg-right-full": r.cardTypeFlags.fullWidthIllustration
            }])
        }, [r.cardIllustrationUrl ? (h(), n("img", {
            key: 0,
            src: r.cardIllustrationUrl,
            alt: a.card.name,
            class: C(["card-illustration", {
                "illustration-hidden": r.effectiveEnableAnimation && a.card.animation && r.cardIllustrationAnimationUrl && r.webmLoaded && !r.webmLoadFailed
            }]),
            loading: "lazy",
            decoding: "async",
            onError: t[5] || (t[5] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 42, ue)) : y("", !0), r.effectiveEnableAnimation && a.card.animation && r.cardIllustrationAnimationUrl && !r.webmLoadFailed ? (h(), n("video", {
            key: 1,
            src: r.cardIllustrationAnimationUrl,
            class: C(["card-illustration", {
                "illustration-hidden": !r.webmLoaded
            }]),
            autoplay: "",
            loop: "",
            muted: "",
            playsinline: "",
            onError: t[6] || (t[6] = (...e) => r.handleVideoError && r.handleVideoError(...e)),
            onLoadeddata: t[7] || (t[7] = (...e) => r.handleVideoLoaded && r.handleVideoLoaded(...e))
        }, null, 42, pe)) : y("", !0), r.cardIllustrationUrl || r.cardIllustrationAnimationUrl ? y("", !0) : (h(), n("div", me, t[33] || (t[33] = [c("span", null, "插画加载中...", -1)]))), c("div", {
            class: C(["illustration-overlay", {
                "overlay-with-left-bg": r.cardTypeFlags.showLeftBorder
            }])
        }, null, 2), r.showStaticImageMask ? (h(), n("div", {
            key: 3,
            class: C(["illustration-static-mask", {
                "mask-with-left-bg": r.cardTypeFlags.showLeftBorder
            }])
        }, null, 2)) : y("", !0), a.isNew ? (h(), n("div", ye, t[34] || (t[34] = [c("div", {
            class: "ribbon ribbon-new"
        }, "NEW", -1)]))) : y("", !0)], 2), !r.rarityImageUrl || r.isCurseCard || r.isCollapseSkillCard || r.isSupportCard || a.onlyPortrait ? y("", !0) : (h(), n("div", Ce, [c("img", {
            src: r.rarityImageUrl,
            alt: "rarity",
            class: "rarity-icon-image",
            onError: t[8] || (t[8] = (...e) => r.handleRarityImageError && r.handleRarityImageError(...e))
        }, null, 40, Be)])), !r.rarityImageSubUrl || r.isCurseCard || r.isCollapseSkillCard || r.isSupportCard || a.onlyPortrait ? y("", !0) : (h(), n("div", Ee, [c("img", {
            src: r.rarityImageSubUrl,
            alt: "rarity sub",
            class: "rarity-icon-sub-image",
            onError: t[9] || (t[9] = (...e) => r.handleRarityImageError && r.handleRarityImageError(...e))
        }, null, 40, ve)])), !r.rarityTitleUrl || r.isCurseCard || r.isCollapseSkillCard || r.isSupportCard || a.onlyPortrait ? y("", !0) : (h(), n("div", fe, [c("img", {
            src: r.rarityTitleUrl,
            alt: "rarity title",
            class: "rarity-title-image",
            onError: t[10] || (t[10] = (...e) => r.handleRarityImageError && r.handleRarityImageError(...e))
        }, null, 40, we)])), r.isCurseCard ? (h(), n(B, {
            key: 5
        }, [c("div", Ie, [c("img", {
            src: r.curseFrameLeftUrl,
            alt: "curse frame left",
            class: "curse-frame-image",
            onError: t[11] || (t[11] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, xe)]), c("div", De, [c("img", {
            src: r.curseFrameRightUrl,
            alt: "curse frame right",
            class: "curse-frame-image",
            onError: t[12] || (t[12] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Me)]), c("div", ke, [c("img", {
            src: r.curseFrameTopUrl,
            alt: "curse frame top",
            class: "curse-frame-image",
            onError: t[13] || (t[13] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Se)]), c("div", Ge, [c("img", {
            src: r.curseFrameBottomUrl,
            alt: "curse frame bottom",
            class: "curse-frame-image",
            onError: t[14] || (t[14] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Qe)])], 64)) : y("", !0), r.isAbnormCard ? (h(), n(B, {
            key: 6
        }, [c("div", be, [c("img", {
            src: r.abnormFrameLeftUrl,
            alt: "abnorm frame left",
            class: "abnorm-frame-image",
            onError: t[15] || (t[15] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Ye)]), c("div", Ue, [c("img", {
            src: r.abnormFrameRightUrl,
            alt: "abnorm frame right",
            class: "abnorm-frame-image",
            onError: t[16] || (t[16] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Le)]), c("div", Te, [c("img", {
            src: r.abnormFrameTopUrl,
            alt: "abnorm frame top",
            class: "abnorm-frame-image",
            onError: t[17] || (t[17] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Re)]), c("div", He, [c("img", {
            src: r.abnormFrameBottomUrl,
            alt: "abnorm frame bottom",
            class: "abnorm-frame-image",
            onError: t[18] || (t[18] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, ze)])], 64)) : y("", !0), r.isCollapseCard ? (h(), n(B, {
            key: 7
        }, [c("div", Pe, [c("img", {
            src: r.collapseFrameUrl,
            alt: "collapse frame left",
            class: "collapse-frame-image",
            onError: t[19] || (t[19] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Fe)]), c("div", Oe, [c("img", {
            src: r.collapseFrameUrl,
            alt: "collapse frame right",
            class: "collapse-frame-image collapse-frame-flipped",
            onError: t[20] || (t[20] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Ne)])], 64)) : y("", !0)]), c("div", {
            class: C(["card-selection-overlay", {
                "selection-selected": a.selected,
                "selection-unselected": !a.selected,
                "collapse-skill-card": r.isCollapseSkillCard || r.isSupportCard,
                "collapse-card": r.isCollapseCard
            }]),
            style: d(a.selected ? r.cardSelectionStyle : r.cardFrameShadowStyle)
        }, null, 6), a.onlyPortrait ? y("", !0) : (h(), n("div", _e, [r.isCollapseSkillCard || r.isSupportCard ? y("", !0) : (h(), n("div", {
            key: 0,
            class: C(["card-name", {
                "long-name": r.isLongName
            }]),
            style: d(r.nameStyle)
        }, g(a.card.name), 7)), r.isCollapseSkillCard || r.isSupportCard ? y("", !0) : (h(), n("div", je, [r.isCollapseCard ? (h(), n(B, {
            key: 0
        }, [c("img", {
            src: r.collapseIconUrl,
            alt: "collapse icon",
            class: "collapse-icon",
            style: d(r.collapseIconStyle),
            onError: t[21] || (t[21] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 44, Ze), c("div", {
            class: "collapse-text",
            style: d(r.collapseTextStyle)
        }, " 0/5 ", 4)], 64)) : (h(), n("div", Ke, [f(l, {
            cost: r.adjustedCost,
            scale: a.scale,
            costChange: r.totalCostAdjustment
        }, null, 8, ["cost", "scale", "costChange"])]))])), r.isCollapseSkillCard || r.isSupportCard || r.isCollapseCard ? y("", !0) : (h(), n("div", {
            key: 2,
            class: "card-energy-line",
            style: d(r.energyLineStyle)
        }, [c("img", {
            src: r.energyLineUrl,
            alt: "energy line",
            class: "energy-line-image",
            onError: t[22] || (t[22] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Je)], 4)), !r.hasAnySpark || r.hasEidolons || r.isCollapseSkillCard || r.isSupportCard || r.isCollapseCard ? y("", !0) : (h(), n("div", {
            key: 3,
            class: "card-god-spark-icon",
            style: d(r.godSparkIconStyle)
        }, [c("img", {
            src: r.godSparkIconUrl,
            alt: "spark icon",
            class: "god-spark-icon-image",
            onError: t[23] || (t[23] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, We)], 4)), !r.hasEidolons || r.isCollapseSkillCard || r.isSupportCard || r.isCollapseCard ? y("", !0) : (h(), n("div", {
            key: 4,
            class: "card-eidolon-slots",
            style: d(r.eidolonSlotsStyle)
        }, [c("img", {
            src: r.eidolonSlotBgUrl,
            alt: "eidolon slots",
            class: "eidolon-slot-bg-image",
            onError: t[24] || (t[24] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, Ve), (h(!0), n(B, null, E(r.selectedEidolons.slice(0, 2), (e, a) => (h(), n("img", {
            key: `${e.id}-${a}`,
            src: r.getEidolonIconUrl(e),
            alt: "eidolon icon",
            class: C(["eidolon-slot-type-image", 0 === a ? "eidolon-slot-type-top" : "eidolon-slot-type-bottom"]),
            onError: t[25] || (t[25] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 42, Xe))), 128))], 4)), r.isCollapseSkillCard || r.isSupportCard ? (h(), n("div", qe, [(h(!0), n(B, null, E(r.costGaugeCount, e => (h(), n("img", {
            key: e,
            src: r.gaugeTpOnUrl,
            alt: "gauge tp on",
            class: "gauge-tp-on-image",
            style: d(r.gaugeImageStyle),
            onError: t[26] || (t[26] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 44, $e))), 128))])) : y("", !0), a.card.rarity ? (h(), n("div", et, [c("span", tt, g(r.getRarityText(a.card.rarity)), 1)])) : y("", !0), !r.cardCategoryIconUrl || r.isCollapseSkillCard || r.isSupportCard ? y("", !0) : (h(), n("div", at, [c("img", {
            src: r.cardCategoryIconUrl,
            alt: "card category",
            class: "category-icon",
            onError: t[27] || (t[27] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, rt), c("span", st, g(r.getCategoryText(r.displayCategory)), 1)])), r.isCollapseSkillCard || r.isSupportCard ? y("", !0) : (h(), n("div", ot, [c("div", {
            class: C(["description-text", {
                "english-description-text": r.isEnglishLocale,
                "chinese-description-text": r.isChineseLocale
            }]),
            innerHTML: r.getFormattedContent(),
            ref: "descriptionText"
        }, null, 10, nt)])), r.isCollapseSkillCard || r.isSupportCard ? (h(), n("div", lt, [c("div", it, g(a.card.name), 1), c("div", ct, [c("img", {
            src: r.tpSkillTypeIconUrl,
            alt: "tp skill type",
            class: "tp-skill-type-icon",
            onError: t[28] || (t[28] = (...e) => r.handleImageError && r.handleImageError(...e))
        }, null, 40, dt), c("span", gt, g(r.tpSkillTypeText), 1)]), t[35] || (t[35] = c("div", {
            class: "info-center-divider"
        }, null, -1)), c("div", ht, [c("div", {
            class: C(["description-text", {
                "english-description-text": r.isEnglishLocale,
                "chinese-description-text": r.isChineseLocale
            }]),
            innerHTML: r.getFormattedContent(),
            ref: "descriptionTextCenter"
        }, null, 10, At)])])) : y("", !0)])), a.selected && !a.onlyPortrait ? (h(), n("div", {
            key: 3,
            class: "czn-card-selected-badge",
            style: d(r.selectedBadgeStyle)
        }, " ✓ ", 4)) : y("", !0), a.showRemoveButton && !a.onlyPortrait ? (h(), n("button", {
            key: 4,
            class: "czn-card-remove-btn",
            onClick: t[29] || (t[29] = I((...e) => r.handleRemove && r.handleRemove(...e), ["stop"])),
            title: r.t("czn.deckBuilder.removeCard"),
            style: d(r.removeButtonStyle)
        }, " × ", 12, ut)) : y("", !0), a.showCopyButton && !a.onlyPortrait ? (h(), n("button", {
            key: 5,
            class: "czn-card-copy-btn",
            onClick: t[30] || (t[30] = I((...e) => r.handleCopy && r.handleCopy(...e), ["stop"])),
            title: r.t("czn.deckBuilder.copyCard"),
            style: d(r.copyButtonStyle)
        }, t[36] || (t[36] = [c("svg", {
            class: "copy-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }, [c("rect", {
            x: "9",
            y: "9",
            width: "13",
            height: "13",
            rx: "2",
            ry: "2"
        }), c("path", {
            d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        })], -1)]), 12, pt)) : y("", !0)], 6)], 32)
    }],
    ["__scopeId", "data-v-a72baa53"]
]);
export {
    mt as C, O as a, N as b, Z as g, P as i, q as w
};