var e = Object.defineProperty,
    t = (t, n, o) => ((t, n, o) => n in t ? e(t, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o
    }) : t[n] = o)(t, "symbol" != typeof n ? n + "" : n, o);
import {
    a1 as n,
    ad as o,
    r,
    i,
    C as a,
    c as s,
    R as l,
    n as u,
    l as d,
    ae as c,
    af as h,
    P as f,
    y as v,
    s as p,
    ag as g,
    L as m,
    ah as y,
    B as w,
    G as b,
    a4 as _,
    ai as E,
    aj as x,
    a as N,
    d as k,
    t as S,
    F as M,
    N as I,
    ak as C,
    al as O,
    E as P,
    o as T,
    q as D,
    am as A,
    an as $,
    ao as z,
    a2 as B,
    ap as L,
    ac as V,
    H as R,
    aq as j,
    ar as G,
    K as H,
    as as F,
    m as Y,
    at as X,
    M as U,
    p as Z,
    U as W
} from "./index-DKI40WV2.js";

function q(e) {
    return !!g() && (C(e), !0)
}

function K(e) {
    return "function" == typeof e ? e() : d(e)
}
const J = "undefined" != typeof window && "undefined" != typeof document,
    Q = Object.prototype.toString,
    ee = () => {};
const te = e => e();

function ne(e, t = !1, n = "Timeout") {
    return new Promise((o, r) => {
        t ? setTimeout(() => r(n), e) : setTimeout(o, e)
    })
}

function oe(e, t, n = {}) {
    const {
        eventFilter: o = te,
        ...r
    } = n;
    return w(e, (i = o, a = t, function(...e) {
        return new Promise((t, n) => {
            Promise.resolve(i(() => a.apply(this, e), {
                fn: a,
                thisArg: this,
                args: e
            })).then(t).catch(n)
        })
    }), r);
    var i, a
}

function re(e, t, n = {}) {
    const {
        eventFilter: o,
        ...i
    } = n, {
        eventFilter: a,
        pause: s,
        resume: l,
        isActive: u
    } = function(e = te) {
        const t = r(!0);
        return {
            isActive: j(t),
            pause: function() {
                t.value = !1
            },
            resume: function() {
                t.value = !0
            },
            eventFilter: (...n) => {
                t.value && e(...n)
            }
        }
    }(o);
    return {
        stop: oe(e, t, { ...i,
            eventFilter: a
        }),
        pause: s,
        resume: l,
        isActive: u
    }
}

function ie(e, t = {}) {
    if (!A(e)) return $(e);
    const n = Array.isArray(e.value) ? Array.from({
        length: e.value.length
    }) : {};
    for (const o in e.value) n[o] = z(() => ({
        get: () => e.value[o],
        set(n) {
            var r;
            if (null == (r = K(t.replaceRef)) || r)
                if (Array.isArray(e.value)) {
                    const t = [...e.value];
                    t[o] = n, e.value = t
                } else {
                    const t = { ...e.value,
                        [o]: n
                    };
                    Object.setPrototypeOf(t, Object.getPrototypeOf(e.value)), e.value = t
                }
            else e.value[o] = n
        }
    }));
    return n
}

function ae(e, t = !1) {
    function n(n, {
        flush: o = "sync",
        deep: r = !1,
        timeout: i,
        throwOnTimeout: a
    } = {}) {
        let s = null;
        const l = [new Promise(i => {
            s = w(e, e => {
                n(e) !== t && (null == s || s(), i(e))
            }, {
                flush: o,
                deep: r,
                immediate: !0
            })
        })];
        return null != i && l.push(ne(i, a).then(() => K(e)).finally(() => null == s ? void 0 : s())), Promise.race(l)
    }

    function o(o, r) {
        if (!A(o)) return n(e => e === o, r);
        const {
            flush: i = "sync",
            deep: a = !1,
            timeout: s,
            throwOnTimeout: l
        } = null != r ? r : {};
        let u = null;
        const d = [new Promise(n => {
            u = w([e, o], ([e, o]) => {
                t !== (e === o) && (null == u || u(), n(e))
            }, {
                flush: i,
                deep: a,
                immediate: !0
            })
        })];
        return null != s && d.push(ne(s, l).then(() => K(e)).finally(() => (null == u || u(), K(e)))), Promise.race(d)
    }

    function r(e) {
        return i(1, e)
    }

    function i(e = 1, t) {
        let o = -1;
        return n(() => (o += 1, o >= e), t)
    }
    if (Array.isArray(K(e))) {
        return {
            toMatch: n,
            toContains: function(e, t) {
                return n(t => {
                    const n = Array.from(t);
                    return n.includes(e) || n.includes(K(e))
                }, t)
            },
            changed: r,
            changedTimes: i,
            get not() {
                return ae(e, !t)
            }
        }
    }
    return {
        toMatch: n,
        toBe: o,
        toBeTruthy: function(e) {
            return n(e => Boolean(e), e)
        },
        toBeNull: function(e) {
            return o(null, e)
        },
        toBeNaN: function(e) {
            return n(Number.isNaN, e)
        },
        toBeUndefined: function(e) {
            return o(void 0, e)
        },
        changed: r,
        changedTimes: i,
        get not() {
            return ae(e, !t)
        }
    }
}

function se(e) {
    return ae(e)
}

function le(e) {
    var t;
    const n = K(e);
    return null != (t = null == n ? void 0 : n.$el) ? t : n
}
const ue = J ? window : void 0;

function de(...e) {
    let t, n, o, r;
    if ("string" == typeof e[0] || Array.isArray(e[0]) ? ([n, o, r] = e, t = ue) : [t, n, o, r] = e, !t) return ee;
    Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
    const i = [],
        a = () => {
            i.forEach(e => e()), i.length = 0
        },
        s = w(() => [le(t), K(r)], ([e, t]) => {
            if (a(), !e) return;
            const r = (s = t, "[object Object]" === Q.call(s) ? { ...t
            } : t);
            var s;
            i.push(...n.flatMap(t => o.map(n => ((e, t, n, o) => (e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o)))(e, t, n, r))))
        }, {
            immediate: !0,
            flush: "post"
        }),
        l = () => {
            s(), a()
        };
    return q(l), l
}

function ce(...e) {
    let t, n, o = {};
    3 === e.length ? (t = e[0], n = e[1], o = e[2]) : 2 === e.length ? "object" == typeof e[1] ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
    const {
        target: r = ue,
        eventName: i = "keydown",
        passive: a = !1,
        dedupe: s = !1
    } = o, l = "function" == typeof(u = t) ? u : "string" == typeof u ? e => e.key === u : Array.isArray(u) ? e => u.includes(e.key) : () => !0;
    var u;
    return de(r, i, e => {
        e.repeat && K(s) || l(e) && n(e)
    }, a)
}

function he(e, t, n, o = {}) {
    var a, s, l;
    const {
        clone: u = !1,
        passive: d = !1,
        eventName: c,
        deep: h = !1,
        defaultValue: f,
        shouldEmit: v
    } = o, p = _(), g = n || (null == p ? void 0 : p.emit) || (null == (a = null == p ? void 0 : p.$emit) ? void 0 : a.bind(p)) || (null == (l = null == (s = null == p ? void 0 : p.proxy) ? void 0 : s.$emit) ? void 0 : l.bind(null == p ? void 0 : p.proxy));
    let m = c;
    t || (t = "modelValue"), m = m || `update:${t.toString()}`;
    const y = e => {
            return u ? "function" == typeof u ? u(e) : (t = e, JSON.parse(JSON.stringify(t))) : e;
            var t
        },
        b = () => void 0 !== e[t] ? y(e[t]) : f,
        E = e => {
            v ? v(e) && g(m, e) : g(m, e)
        };
    if (d) {
        const n = b(),
            o = r(n);
        let i = !1;
        return w(() => e[t], e => {
            i || (i = !0, o.value = y(e), R(() => i = !1))
        }), w(o, n => {
            i || n === e[t] && !h || E(n)
        }, {
            deep: h
        }), o
    }
    return i({
        get: () => b(),
        set(e) {
            E(e)
        }
    })
}
var fe = {
    value: () => {}
};

function ve() {
    for (var e, t = 0, n = arguments.length, o = {}; t < n; ++t) {
        if (!(e = arguments[t] + "") || e in o || /[\s.]/.test(e)) throw new Error("illegal type: " + e);
        o[e] = []
    }
    return new pe(o)
}

function pe(e) {
    this._ = e
}

function ge(e, t) {
    for (var n, o = 0, r = e.length; o < r; ++o)
        if ((n = e[o]).name === t) return n.value
}

function me(e, t, n) {
    for (var o = 0, r = e.length; o < r; ++o)
        if (e[o].name === t) {
            e[o] = fe, e = e.slice(0, o).concat(e.slice(o + 1));
            break
        }
    return null != n && e.push({
        name: t,
        value: n
    }), e
}
pe.prototype = ve.prototype = {
    constructor: pe,
    on: function(e, t) {
        var n, o, r = this._,
            i = (o = r, (e + "").trim().split(/^|\s+/).map(function(e) {
                var t = "",
                    n = e.indexOf(".");
                if (n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), e && !o.hasOwnProperty(e)) throw new Error("unknown type: " + e);
                return {
                    type: e,
                    name: t
                }
            })),
            a = -1,
            s = i.length;
        if (!(arguments.length < 2)) {
            if (null != t && "function" != typeof t) throw new Error("invalid callback: " + t);
            for (; ++a < s;)
                if (n = (e = i[a]).type) r[n] = me(r[n], e.name, t);
                else if (null == t)
                for (n in r) r[n] = me(r[n], e.name, null);
            return this
        }
        for (; ++a < s;)
            if ((n = (e = i[a]).type) && (n = ge(r[n], e.name))) return n
    },
    copy: function() {
        var e = {},
            t = this._;
        for (var n in t) e[n] = t[n].slice();
        return new pe(e)
    },
    call: function(e, t) {
        if ((n = arguments.length - 2) > 0)
            for (var n, o, r = new Array(n), i = 0; i < n; ++i) r[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
        for (i = 0, n = (o = this._[e]).length; i < n; ++i) o[i].value.apply(t, r)
    },
    apply: function(e, t, n) {
        if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
        for (var o = this._[e], r = 0, i = o.length; r < i; ++r) o[r].value.apply(t, n)
    }
};
var ye = "http://www.w3.org/1999/xhtml";
const we = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: ye,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};

function be(e) {
    var t = e += "",
        n = t.indexOf(":");
    return n >= 0 && "xmlns" !== (t = e.slice(0, n)) && (e = e.slice(n + 1)), we.hasOwnProperty(t) ? {
        space: we[t],
        local: e
    } : e
}

function _e(e) {
    return function() {
        var t = this.ownerDocument,
            n = this.namespaceURI;
        return n === ye && t.documentElement.namespaceURI === ye ? t.createElement(e) : t.createElementNS(n, e)
    }
}

function Ee(e) {
    return function() {
        return this.ownerDocument.createElementNS(e.space, e.local)
    }
}

function xe(e) {
    var t = be(e);
    return (t.local ? Ee : _e)(t)
}

function Ne() {}

function ke(e) {
    return null == e ? Ne : function() {
        return this.querySelector(e)
    }
}

function Se() {
    return []
}

function Me(e) {
    return null == e ? Se : function() {
        return this.querySelectorAll(e)
    }
}

function Ie(e) {
    return function() {
        return null == (t = e.apply(this, arguments)) ? [] : Array.isArray(t) ? t : Array.from(t);
        var t
    }
}

function Ce(e) {
    return function() {
        return this.matches(e)
    }
}

function Oe(e) {
    return function(t) {
        return t.matches(e)
    }
}
var Pe = Array.prototype.find;

function Te() {
    return this.firstElementChild
}
var De = Array.prototype.filter;

function Ae() {
    return Array.from(this.children)
}

function $e(e) {
    return new Array(e.length)
}

function ze(e, t) {
    this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t
}

function Be(e, t, n, o, r, i) {
    for (var a, s = 0, l = t.length, u = i.length; s < u; ++s)(a = t[s]) ? (a.__data__ = i[s], o[s] = a) : n[s] = new ze(e, i[s]);
    for (; s < l; ++s)(a = t[s]) && (r[s] = a)
}

function Le(e, t, n, o, r, i, a) {
    var s, l, u, d = new Map,
        c = t.length,
        h = i.length,
        f = new Array(c);
    for (s = 0; s < c; ++s)(l = t[s]) && (f[s] = u = a.call(l, l.__data__, s, t) + "", d.has(u) ? r[s] = l : d.set(u, l));
    for (s = 0; s < h; ++s) u = a.call(e, i[s], s, i) + "", (l = d.get(u)) ? (o[s] = l, l.__data__ = i[s], d.delete(u)) : n[s] = new ze(e, i[s]);
    for (s = 0; s < c; ++s)(l = t[s]) && d.get(f[s]) === l && (r[s] = l)
}

function Ve(e) {
    return e.__data__
}

function Re(e) {
    return "object" == typeof e && "length" in e ? e : Array.from(e)
}

function je(e, t) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function Ge(e) {
    return function() {
        this.removeAttribute(e)
    }
}

function He(e) {
    return function() {
        this.removeAttributeNS(e.space, e.local)
    }
}

function Fe(e, t) {
    return function() {
        this.setAttribute(e, t)
    }
}

function Ye(e, t) {
    return function() {
        this.setAttributeNS(e.space, e.local, t)
    }
}

function Xe(e, t) {
    return function() {
        var n = t.apply(this, arguments);
        null == n ? this.removeAttribute(e) : this.setAttribute(e, n)
    }
}

function Ue(e, t) {
    return function() {
        var n = t.apply(this, arguments);
        null == n ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n)
    }
}

function Ze(e) {
    return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView
}

function We(e) {
    return function() {
        this.style.removeProperty(e)
    }
}

function qe(e, t, n) {
    return function() {
        this.style.setProperty(e, t, n)
    }
}

function Ke(e, t, n) {
    return function() {
        var o = t.apply(this, arguments);
        null == o ? this.style.removeProperty(e) : this.style.setProperty(e, o, n)
    }
}

function Je(e, t) {
    return e.style.getPropertyValue(t) || Ze(e).getComputedStyle(e, null).getPropertyValue(t)
}

function Qe(e) {
    return function() {
        delete this[e]
    }
}

function et(e, t) {
    return function() {
        this[e] = t
    }
}

function tt(e, t) {
    return function() {
        var n = t.apply(this, arguments);
        null == n ? delete this[e] : this[e] = n
    }
}

function nt(e) {
    return e.trim().split(/^|\s+/)
}

function ot(e) {
    return e.classList || new rt(e)
}

function rt(e) {
    this._node = e, this._names = nt(e.getAttribute("class") || "")
}

function it(e, t) {
    for (var n = ot(e), o = -1, r = t.length; ++o < r;) n.add(t[o])
}

function at(e, t) {
    for (var n = ot(e), o = -1, r = t.length; ++o < r;) n.remove(t[o])
}

function st(e) {
    return function() {
        it(this, e)
    }
}

function lt(e) {
    return function() {
        at(this, e)
    }
}

function ut(e, t) {
    return function() {
        (t.apply(this, arguments) ? it : at)(this, e)
    }
}

function dt() {
    this.textContent = ""
}

function ct(e) {
    return function() {
        this.textContent = e
    }
}

function ht(e) {
    return function() {
        var t = e.apply(this, arguments);
        this.textContent = null == t ? "" : t
    }
}

function ft() {
    this.innerHTML = ""
}

function vt(e) {
    return function() {
        this.innerHTML = e
    }
}

function pt(e) {
    return function() {
        var t = e.apply(this, arguments);
        this.innerHTML = null == t ? "" : t
    }
}

function gt() {
    this.nextSibling && this.parentNode.appendChild(this)
}

function mt() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
}

function yt() {
    return null
}

function wt() {
    var e = this.parentNode;
    e && e.removeChild(this)
}

function bt() {
    var e = this.cloneNode(!1),
        t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e
}

function _t() {
    var e = this.cloneNode(!0),
        t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e
}

function Et(e) {
    return function() {
        var t = this.__on;
        if (t) {
            for (var n, o = 0, r = -1, i = t.length; o < i; ++o) n = t[o], e.type && n.type !== e.type || n.name !== e.name ? t[++r] = n : this.removeEventListener(n.type, n.listener, n.options);
            ++r ? t.length = r : delete this.__on
        }
    }
}

function xt(e, t, n) {
    return function() {
        var o, r = this.__on,
            i = function(e) {
                return function(t) {
                    e.call(this, t, this.__data__)
                }
            }(t);
        if (r)
            for (var a = 0, s = r.length; a < s; ++a)
                if ((o = r[a]).type === e.type && o.name === e.name) return this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = i, o.options = n), void(o.value = t);
        this.addEventListener(e.type, i, n), o = {
            type: e.type,
            name: e.name,
            value: t,
            listener: i,
            options: n
        }, r ? r.push(o) : this.__on = [o]
    }
}

function Nt(e, t, n) {
    var o = Ze(e),
        r = o.CustomEvent;
    "function" == typeof r ? r = new r(t, n) : (r = o.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r)
}

function kt(e, t) {
    return function() {
        return Nt(this, e, t)
    }
}

function St(e, t) {
    return function() {
        return Nt(this, e, t.apply(this, arguments))
    }
}
ze.prototype = {
    constructor: ze,
    appendChild: function(e) {
        return this._parent.insertBefore(e, this._next)
    },
    insertBefore: function(e, t) {
        return this._parent.insertBefore(e, t)
    },
    querySelector: function(e) {
        return this._parent.querySelector(e)
    },
    querySelectorAll: function(e) {
        return this._parent.querySelectorAll(e)
    }
}, rt.prototype = {
    add: function(e) {
        this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")))
    },
    remove: function(e) {
        var t = this._names.indexOf(e);
        t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")))
    },
    contains: function(e) {
        return this._names.indexOf(e) >= 0
    }
};
var Mt = [null];

function It(e, t) {
    this._groups = e, this._parents = t
}

function Ct() {
    return new It([
        [document.documentElement]
    ], Mt)
}

function Ot(e) {
    return "string" == typeof e ? new It([
        [document.querySelector(e)]
    ], [document.documentElement]) : new It([
        [e]
    ], Mt)
}

function Pt(e, t) {
    if (e = function(e) {
            let t;
            for (; t = e.sourceEvent;) e = t;
            return e
        }(e), void 0 === t && (t = e.currentTarget), t) {
        var n = t.ownerSVGElement || t;
        if (n.createSVGPoint) {
            var o = n.createSVGPoint();
            return o.x = e.clientX, o.y = e.clientY, [(o = o.matrixTransform(t.getScreenCTM().inverse())).x, o.y]
        }
        if (t.getBoundingClientRect) {
            var r = t.getBoundingClientRect();
            return [e.clientX - r.left - t.clientLeft, e.clientY - r.top - t.clientTop]
        }
    }
    return [e.pageX, e.pageY]
}
It.prototype = Ct.prototype = {
    constructor: It,
    select: function(e) {
        "function" != typeof e && (e = ke(e));
        for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
            for (var i, a, s = t[r], l = s.length, u = o[r] = new Array(l), d = 0; d < l; ++d)(i = s[d]) && (a = e.call(i, i.__data__, d, s)) && ("__data__" in i && (a.__data__ = i.__data__), u[d] = a);
        return new It(o, this._parents)
    },
    selectAll: function(e) {
        e = "function" == typeof e ? Ie(e) : Me(e);
        for (var t = this._groups, n = t.length, o = [], r = [], i = 0; i < n; ++i)
            for (var a, s = t[i], l = s.length, u = 0; u < l; ++u)(a = s[u]) && (o.push(e.call(a, a.__data__, u, s)), r.push(a));
        return new It(o, r)
    },
    selectChild: function(e) {
        return this.select(null == e ? Te : function(e) {
            return function() {
                return Pe.call(this.children, e)
            }
        }("function" == typeof e ? e : Oe(e)))
    },
    selectChildren: function(e) {
        return this.selectAll(null == e ? Ae : function(e) {
            return function() {
                return De.call(this.children, e)
            }
        }("function" == typeof e ? e : Oe(e)))
    },
    filter: function(e) {
        "function" != typeof e && (e = Ce(e));
        for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
            for (var i, a = t[r], s = a.length, l = o[r] = [], u = 0; u < s; ++u)(i = a[u]) && e.call(i, i.__data__, u, a) && l.push(i);
        return new It(o, this._parents)
    },
    data: function(e, t) {
        if (!arguments.length) return Array.from(this, Ve);
        var n, o = t ? Le : Be,
            r = this._parents,
            i = this._groups;
        "function" != typeof e && (n = e, e = function() {
            return n
        });
        for (var a = i.length, s = new Array(a), l = new Array(a), u = new Array(a), d = 0; d < a; ++d) {
            var c = r[d],
                h = i[d],
                f = h.length,
                v = Re(e.call(c, c && c.__data__, d, r)),
                p = v.length,
                g = l[d] = new Array(p),
                m = s[d] = new Array(p);
            o(c, h, g, m, u[d] = new Array(f), v, t);
            for (var y, w, b = 0, _ = 0; b < p; ++b)
                if (y = g[b]) {
                    for (b >= _ && (_ = b + 1); !(w = m[_]) && ++_ < p;);
                    y._next = w || null
                }
        }
        return (s = new It(s, r))._enter = l, s._exit = u, s
    },
    enter: function() {
        return new It(this._enter || this._groups.map($e), this._parents)
    },
    exit: function() {
        return new It(this._exit || this._groups.map($e), this._parents)
    },
    join: function(e, t, n) {
        var o = this.enter(),
            r = this,
            i = this.exit();
        return "function" == typeof e ? (o = e(o)) && (o = o.selection()) : o = o.append(e + ""), null != t && (r = t(r)) && (r = r.selection()), null == n ? i.remove() : n(i), o && r ? o.merge(r).order() : r
    },
    merge: function(e) {
        for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, r = n.length, i = o.length, a = Math.min(r, i), s = new Array(r), l = 0; l < a; ++l)
            for (var u, d = n[l], c = o[l], h = d.length, f = s[l] = new Array(h), v = 0; v < h; ++v)(u = d[v] || c[v]) && (f[v] = u);
        for (; l < r; ++l) s[l] = n[l];
        return new It(s, this._parents)
    },
    selection: function() {
        return this
    },
    order: function() {
        for (var e = this._groups, t = -1, n = e.length; ++t < n;)
            for (var o, r = e[t], i = r.length - 1, a = r[i]; --i >= 0;)(o = r[i]) && (a && 4 ^ o.compareDocumentPosition(a) && a.parentNode.insertBefore(o, a), a = o);
        return this
    },
    sort: function(e) {
        function t(t, n) {
            return t && n ? e(t.__data__, n.__data__) : !t - !n
        }
        e || (e = je);
        for (var n = this._groups, o = n.length, r = new Array(o), i = 0; i < o; ++i) {
            for (var a, s = n[i], l = s.length, u = r[i] = new Array(l), d = 0; d < l; ++d)(a = s[d]) && (u[d] = a);
            u.sort(t)
        }
        return new It(r, this._parents).order()
    },
    call: function() {
        var e = arguments[0];
        return arguments[0] = this, e.apply(null, arguments), this
    },
    nodes: function() {
        return Array.from(this)
    },
    node: function() {
        for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
            for (var o = e[t], r = 0, i = o.length; r < i; ++r) {
                var a = o[r];
                if (a) return a
            }
        return null
    },
    size: function() {
        let e = 0;
        for (const t of this) ++e;
        return e
    },
    empty: function() {
        return !this.node()
    },
    each: function(e) {
        for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
            for (var r, i = t[n], a = 0, s = i.length; a < s; ++a)(r = i[a]) && e.call(r, r.__data__, a, i);
        return this
    },
    attr: function(e, t) {
        var n = be(e);
        if (arguments.length < 2) {
            var o = this.node();
            return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n)
        }
        return this.each((null == t ? n.local ? He : Ge : "function" == typeof t ? n.local ? Ue : Xe : n.local ? Ye : Fe)(n, t))
    },
    style: function(e, t, n) {
        return arguments.length > 1 ? this.each((null == t ? We : "function" == typeof t ? Ke : qe)(e, t, null == n ? "" : n)) : Je(this.node(), e)
    },
    property: function(e, t) {
        return arguments.length > 1 ? this.each((null == t ? Qe : "function" == typeof t ? tt : et)(e, t)) : this.node()[e]
    },
    classed: function(e, t) {
        var n = nt(e + "");
        if (arguments.length < 2) {
            for (var o = ot(this.node()), r = -1, i = n.length; ++r < i;)
                if (!o.contains(n[r])) return !1;
            return !0
        }
        return this.each(("function" == typeof t ? ut : t ? st : lt)(n, t))
    },
    text: function(e) {
        return arguments.length ? this.each(null == e ? dt : ("function" == typeof e ? ht : ct)(e)) : this.node().textContent
    },
    html: function(e) {
        return arguments.length ? this.each(null == e ? ft : ("function" == typeof e ? pt : vt)(e)) : this.node().innerHTML
    },
    raise: function() {
        return this.each(gt)
    },
    lower: function() {
        return this.each(mt)
    },
    append: function(e) {
        var t = "function" == typeof e ? e : xe(e);
        return this.select(function() {
            return this.appendChild(t.apply(this, arguments))
        })
    },
    insert: function(e, t) {
        var n = "function" == typeof e ? e : xe(e),
            o = null == t ? yt : "function" == typeof t ? t : ke(t);
        return this.select(function() {
            return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null)
        })
    },
    remove: function() {
        return this.each(wt)
    },
    clone: function(e) {
        return this.select(e ? _t : bt)
    },
    datum: function(e) {
        return arguments.length ? this.property("__data__", e) : this.node().__data__
    },
    on: function(e, t, n) {
        var o, r, i = function(e) {
                return e.trim().split(/^|\s+/).map(function(e) {
                    var t = "",
                        n = e.indexOf(".");
                    return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
                        type: e,
                        name: t
                    }
                })
            }(e + ""),
            a = i.length;
        if (!(arguments.length < 2)) {
            for (s = t ? xt : Et, o = 0; o < a; ++o) this.each(s(i[o], t, n));
            return this
        }
        var s = this.node().__on;
        if (s)
            for (var l, u = 0, d = s.length; u < d; ++u)
                for (o = 0, l = s[u]; o < a; ++o)
                    if ((r = i[o]).type === l.type && r.name === l.name) return l.value
    },
    dispatch: function(e, t) {
        return this.each(("function" == typeof t ? St : kt)(e, t))
    },
    [Symbol.iterator]: function*() {
        for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
            for (var o, r = e[t], i = 0, a = r.length; i < a; ++i)(o = r[i]) && (yield o)
    }
};
const Tt = {
        passive: !1
    },
    Dt = {
        capture: !0,
        passive: !1
    };

function At(e) {
    e.stopImmediatePropagation()
}

function $t(e) {
    e.preventDefault(), e.stopImmediatePropagation()
}

function zt(e) {
    var t = e.document.documentElement,
        n = Ot(e).on("dragstart.drag", $t, Dt);
    "onselectstart" in t ? n.on("selectstart.drag", $t, Dt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none")
}

function Bt(e, t) {
    var n = e.document.documentElement,
        o = Ot(e).on("dragstart.drag", null);
    t && (o.on("click.drag", $t, Dt), setTimeout(function() {
        o.on("click.drag", null)
    }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect)
}
const Lt = e => () => e;

function Vt(e, {
    sourceEvent: t,
    subject: n,
    target: o,
    identifier: r,
    active: i,
    x: a,
    y: s,
    dx: l,
    dy: u,
    dispatch: d
}) {
    Object.defineProperties(this, {
        type: {
            value: e,
            enumerable: !0,
            configurable: !0
        },
        sourceEvent: {
            value: t,
            enumerable: !0,
            configurable: !0
        },
        subject: {
            value: n,
            enumerable: !0,
            configurable: !0
        },
        target: {
            value: o,
            enumerable: !0,
            configurable: !0
        },
        identifier: {
            value: r,
            enumerable: !0,
            configurable: !0
        },
        active: {
            value: i,
            enumerable: !0,
            configurable: !0
        },
        x: {
            value: a,
            enumerable: !0,
            configurable: !0
        },
        y: {
            value: s,
            enumerable: !0,
            configurable: !0
        },
        dx: {
            value: l,
            enumerable: !0,
            configurable: !0
        },
        dy: {
            value: u,
            enumerable: !0,
            configurable: !0
        },
        _: {
            value: d
        }
    })
}

function Rt(e) {
    return !e.ctrlKey && !e.button
}

function jt() {
    return this.parentNode
}

function Gt(e, t) {
    return null == t ? {
        x: e.x,
        y: e.y
    } : t
}

function Ht() {
    return navigator.maxTouchPoints || "ontouchstart" in this
}

function Ft(e, t, n) {
    e.prototype = t.prototype = n, n.constructor = e
}

function Yt(e, t) {
    var n = Object.create(e.prototype);
    for (var o in t) n[o] = t[o];
    return n
}

function Xt() {}
Vt.prototype.on = function() {
    var e = this._.on.apply(this._, arguments);
    return e === this._ ? this : e
};
var Ut = .7,
    Zt = 1 / Ut,
    Wt = "\\s*([+-]?\\d+)\\s*",
    qt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    Kt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    Jt = /^#([0-9a-f]{3,8})$/,
    Qt = new RegExp(`^rgb\\(${Wt},${Wt},${Wt}\\)$`),
    en = new RegExp(`^rgb\\(${Kt},${Kt},${Kt}\\)$`),
    tn = new RegExp(`^rgba\\(${Wt},${Wt},${Wt},${qt}\\)$`),
    nn = new RegExp(`^rgba\\(${Kt},${Kt},${Kt},${qt}\\)$`),
    on = new RegExp(`^hsl\\(${qt},${Kt},${Kt}\\)$`),
    rn = new RegExp(`^hsla\\(${qt},${Kt},${Kt},${qt}\\)$`),
    an = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    };

function sn() {
    return this.rgb().formatHex()
}

function ln() {
    return this.rgb().formatRgb()
}

function un(e) {
    var t, n;
    return e = (e + "").trim().toLowerCase(), (t = Jt.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), 6 === n ? dn(t) : 3 === n ? new fn(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, (15 & t) << 4 | 15 & t, 1) : 8 === n ? cn(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (255 & t) / 255) : 4 === n ? cn(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, ((15 & t) << 4 | 15 & t) / 255) : null) : (t = Qt.exec(e)) ? new fn(t[1], t[2], t[3], 1) : (t = en.exec(e)) ? new fn(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, 1) : (t = tn.exec(e)) ? cn(t[1], t[2], t[3], t[4]) : (t = nn.exec(e)) ? cn(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, t[4]) : (t = on.exec(e)) ? wn(t[1], t[2] / 100, t[3] / 100, 1) : (t = rn.exec(e)) ? wn(t[1], t[2] / 100, t[3] / 100, t[4]) : an.hasOwnProperty(e) ? dn(an[e]) : "transparent" === e ? new fn(NaN, NaN, NaN, 0) : null
}

function dn(e) {
    return new fn(e >> 16 & 255, e >> 8 & 255, 255 & e, 1)
}

function cn(e, t, n, o) {
    return o <= 0 && (e = t = n = NaN), new fn(e, t, n, o)
}

function hn(e, t, n, o) {
    return 1 === arguments.length ? ((r = e) instanceof Xt || (r = un(r)), r ? new fn((r = r.rgb()).r, r.g, r.b, r.opacity) : new fn) : new fn(e, t, n, null == o ? 1 : o);
    var r
}

function fn(e, t, n, o) {
    this.r = +e, this.g = +t, this.b = +n, this.opacity = +o
}

function vn() {
    return `#${yn(this.r)}${yn(this.g)}${yn(this.b)}`
}

function pn() {
    const e = gn(this.opacity);
    return `${1===e?"rgb(":"rgba("}${mn(this.r)}, ${mn(this.g)}, ${mn(this.b)}${1===e?")":`, ${e})`}`
}

function gn(e) {
    return isNaN(e) ? 1 : Math.max(0, Math.min(1, e))
}

function mn(e) {
    return Math.max(0, Math.min(255, Math.round(e) || 0))
}

function yn(e) {
    return ((e = mn(e)) < 16 ? "0" : "") + e.toString(16)
}

function wn(e, t, n, o) {
    return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new _n(e, t, n, o)
}

function bn(e) {
    if (e instanceof _n) return new _n(e.h, e.s, e.l, e.opacity);
    if (e instanceof Xt || (e = un(e)), !e) return new _n;
    if (e instanceof _n) return e;
    var t = (e = e.rgb()).r / 255,
        n = e.g / 255,
        o = e.b / 255,
        r = Math.min(t, n, o),
        i = Math.max(t, n, o),
        a = NaN,
        s = i - r,
        l = (i + r) / 2;
    return s ? (a = t === i ? (n - o) / s + 6 * (n < o) : n === i ? (o - t) / s + 2 : (t - n) / s + 4, s /= l < .5 ? i + r : 2 - i - r, a *= 60) : s = l > 0 && l < 1 ? 0 : a, new _n(a, s, l, e.opacity)
}

function _n(e, t, n, o) {
    this.h = +e, this.s = +t, this.l = +n, this.opacity = +o
}

function En(e) {
    return (e = (e || 0) % 360) < 0 ? e + 360 : e
}

function xn(e) {
    return Math.max(0, Math.min(1, e || 0))
}

function Nn(e, t, n) {
    return 255 * (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t)
}
Ft(Xt, un, {
    copy(e) {
        return Object.assign(new this.constructor, this, e)
    },
    displayable() {
        return this.rgb().displayable()
    },
    hex: sn,
    formatHex: sn,
    formatHex8: function() {
        return this.rgb().formatHex8()
    },
    formatHsl: function() {
        return bn(this).formatHsl()
    },
    formatRgb: ln,
    toString: ln
}), Ft(fn, hn, Yt(Xt, {
    brighter(e) {
        return e = null == e ? Zt : Math.pow(Zt, e), new fn(this.r * e, this.g * e, this.b * e, this.opacity)
    },
    darker(e) {
        return e = null == e ? Ut : Math.pow(Ut, e), new fn(this.r * e, this.g * e, this.b * e, this.opacity)
    },
    rgb() {
        return this
    },
    clamp() {
        return new fn(mn(this.r), mn(this.g), mn(this.b), gn(this.opacity))
    },
    displayable() {
        return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
    },
    hex: vn,
    formatHex: vn,
    formatHex8: function() {
        return `#${yn(this.r)}${yn(this.g)}${yn(this.b)}${yn(255*(isNaN(this.opacity)?1:this.opacity))}`
    },
    formatRgb: pn,
    toString: pn
})), Ft(_n, function(e, t, n, o) {
    return 1 === arguments.length ? bn(e) : new _n(e, t, n, null == o ? 1 : o)
}, Yt(Xt, {
    brighter(e) {
        return e = null == e ? Zt : Math.pow(Zt, e), new _n(this.h, this.s, this.l * e, this.opacity)
    },
    darker(e) {
        return e = null == e ? Ut : Math.pow(Ut, e), new _n(this.h, this.s, this.l * e, this.opacity)
    },
    rgb() {
        var e = this.h % 360 + 360 * (this.h < 0),
            t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
            n = this.l,
            o = n + (n < .5 ? n : 1 - n) * t,
            r = 2 * n - o;
        return new fn(Nn(e >= 240 ? e - 240 : e + 120, r, o), Nn(e, r, o), Nn(e < 120 ? e + 240 : e - 120, r, o), this.opacity)
    },
    clamp() {
        return new _n(En(this.h), xn(this.s), xn(this.l), gn(this.opacity))
    },
    displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
    },
    formatHsl() {
        const e = gn(this.opacity);
        return `${1===e?"hsl(":"hsla("}${En(this.h)}, ${100*xn(this.s)}%, ${100*xn(this.l)}%${1===e?")":`, ${e})`}`
    }
}));
const kn = e => () => e;

function Sn(e) {
    return 1 === (e = +e) ? Mn : function(t, n) {
        return n - t ? function(e, t, n) {
            return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n,
                function(o) {
                    return Math.pow(e + o * t, n)
                }
        }(t, n, e) : kn(isNaN(t) ? n : t)
    }
}

function Mn(e, t) {
    var n = t - e;
    return n ? function(e, t) {
        return function(n) {
            return e + n * t
        }
    }(e, n) : kn(isNaN(e) ? t : e)
}
const In = function e(t) {
    var n = Sn(t);

    function o(e, t) {
        var o = n((e = hn(e)).r, (t = hn(t)).r),
            r = n(e.g, t.g),
            i = n(e.b, t.b),
            a = Mn(e.opacity, t.opacity);
        return function(t) {
            return e.r = o(t), e.g = r(t), e.b = i(t), e.opacity = a(t), e + ""
        }
    }
    return o.gamma = e, o
}(1);

function Cn(e, t) {
    t || (t = []);
    var n, o = e ? Math.min(t.length, e.length) : 0,
        r = t.slice();
    return function(i) {
        for (n = 0; n < o; ++n) r[n] = e[n] * (1 - i) + t[n] * i;
        return r
    }
}

function On(e, t) {
    var n, o = t ? t.length : 0,
        r = e ? Math.min(o, e.length) : 0,
        i = new Array(r),
        a = new Array(o);
    for (n = 0; n < r; ++n) i[n] = Bn(e[n], t[n]);
    for (; n < o; ++n) a[n] = t[n];
    return function(e) {
        for (n = 0; n < r; ++n) a[n] = i[n](e);
        return a
    }
}

function Pn(e, t) {
    var n = new Date;
    return e = +e, t = +t,
        function(o) {
            return n.setTime(e * (1 - o) + t * o), n
        }
}

function Tn(e, t) {
    return e = +e, t = +t,
        function(n) {
            return e * (1 - n) + t * n
        }
}

function Dn(e, t) {
    var n, o = {},
        r = {};
    for (n in null !== e && "object" == typeof e || (e = {}), null !== t && "object" == typeof t || (t = {}), t) n in e ? o[n] = Bn(e[n], t[n]) : r[n] = t[n];
    return function(e) {
        for (n in o) r[n] = o[n](e);
        return r
    }
}
var An = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    $n = new RegExp(An.source, "g");

function zn(e, t) {
    var n, o, r, i = An.lastIndex = $n.lastIndex = 0,
        a = -1,
        s = [],
        l = [];
    for (e += "", t += "";
        (n = An.exec(e)) && (o = $n.exec(t));)(r = o.index) > i && (r = t.slice(i, r), s[a] ? s[a] += r : s[++a] = r), (n = n[0]) === (o = o[0]) ? s[a] ? s[a] += o : s[++a] = o : (s[++a] = null, l.push({
        i: a,
        x: Tn(n, o)
    })), i = $n.lastIndex;
    return i < t.length && (r = t.slice(i), s[a] ? s[a] += r : s[++a] = r), s.length < 2 ? l[0] ? function(e) {
        return function(t) {
            return e(t) + ""
        }
    }(l[0].x) : function(e) {
        return function() {
            return e
        }
    }(t) : (t = l.length, function(e) {
        for (var n, o = 0; o < t; ++o) s[(n = l[o]).i] = n.x(e);
        return s.join("")
    })
}

function Bn(e, t) {
    var n, o, r = typeof t;
    return null == t || "boolean" === r ? kn(t) : ("number" === r ? Tn : "string" === r ? (n = un(t)) ? (t = n, In) : zn : t instanceof un ? In : t instanceof Date ? Pn : (o = t, !ArrayBuffer.isView(o) || o instanceof DataView ? Array.isArray(t) ? On : "function" != typeof t.valueOf && "function" != typeof t.toString || isNaN(t) ? Dn : Tn : Cn))(e, t)
}
var Ln, Vn = 180 / Math.PI,
    Rn = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1
    };

function jn(e, t, n, o, r, i) {
    var a, s, l;
    return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * n + t * o) && (n -= e * l, o -= t * l), (s = Math.sqrt(n * n + o * o)) && (n /= s, o /= s, l /= s), e * o < t * n && (e = -e, t = -t, l = -l, a = -a), {
        translateX: r,
        translateY: i,
        rotate: Math.atan2(t, e) * Vn,
        skewX: Math.atan(l) * Vn,
        scaleX: a,
        scaleY: s
    }
}

function Gn(e, t, n, o) {
    function r(e) {
        return e.length ? e.pop() + " " : ""
    }
    return function(i, a) {
        var s = [],
            l = [];
        return i = e(i), a = e(a),
            function(e, o, r, i, a, s) {
                if (e !== r || o !== i) {
                    var l = a.push("translate(", null, t, null, n);
                    s.push({
                        i: l - 4,
                        x: Tn(e, r)
                    }, {
                        i: l - 2,
                        x: Tn(o, i)
                    })
                } else(r || i) && a.push("translate(" + r + t + i + n)
            }(i.translateX, i.translateY, a.translateX, a.translateY, s, l),
            function(e, t, n, i) {
                e !== t ? (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), i.push({
                    i: n.push(r(n) + "rotate(", null, o) - 2,
                    x: Tn(e, t)
                })) : t && n.push(r(n) + "rotate(" + t + o)
            }(i.rotate, a.rotate, s, l),
            function(e, t, n, i) {
                e !== t ? i.push({
                    i: n.push(r(n) + "skewX(", null, o) - 2,
                    x: Tn(e, t)
                }) : t && n.push(r(n) + "skewX(" + t + o)
            }(i.skewX, a.skewX, s, l),
            function(e, t, n, o, i, a) {
                if (e !== n || t !== o) {
                    var s = i.push(r(i) + "scale(", null, ",", null, ")");
                    a.push({
                        i: s - 4,
                        x: Tn(e, n)
                    }, {
                        i: s - 2,
                        x: Tn(t, o)
                    })
                } else 1 === n && 1 === o || i.push(r(i) + "scale(" + n + "," + o + ")")
            }(i.scaleX, i.scaleY, a.scaleX, a.scaleY, s, l), i = a = null,
            function(e) {
                for (var t, n = -1, o = l.length; ++n < o;) s[(t = l[n]).i] = t.x(e);
                return s.join("")
            }
    }
}
var Hn = Gn(function(e) {
        const t = new("function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix)(e + "");
        return t.isIdentity ? Rn : jn(t.a, t.b, t.c, t.d, t.e, t.f)
    }, "px, ", "px)", "deg)"),
    Fn = Gn(function(e) {
        return null == e ? Rn : (Ln || (Ln = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ln.setAttribute("transform", e), (e = Ln.transform.baseVal.consolidate()) ? jn((e = e.matrix).a, e.b, e.c, e.d, e.e, e.f) : Rn)
    }, ", ", ")", ")");

function Yn(e) {
    return ((e = Math.exp(e)) + 1 / e) / 2
}
const Xn = function e(t, n, o) {
    function r(e, r) {
        var i, a, s = e[0],
            l = e[1],
            u = e[2],
            d = r[0],
            c = r[1],
            h = r[2],
            f = d - s,
            v = c - l,
            p = f * f + v * v;
        if (p < 1e-12) a = Math.log(h / u) / t, i = function(e) {
            return [s + e * f, l + e * v, u * Math.exp(t * e * a)]
        };
        else {
            var g = Math.sqrt(p),
                m = (h * h - u * u + o * p) / (2 * u * n * g),
                y = (h * h - u * u - o * p) / (2 * h * n * g),
                w = Math.log(Math.sqrt(m * m + 1) - m),
                b = Math.log(Math.sqrt(y * y + 1) - y);
            a = (b - w) / t, i = function(e) {
                var o, r = e * a,
                    i = Yn(w),
                    d = u / (n * g) * (i * (o = t * r + w, ((o = Math.exp(2 * o)) - 1) / (o + 1)) - function(e) {
                        return ((e = Math.exp(e)) - 1 / e) / 2
                    }(w));
                return [s + d * f, l + d * v, u * i / Yn(t * r + w)]
            }
        }
        return i.duration = 1e3 * a * t / Math.SQRT2, i
    }
    return r.rho = function(t) {
        var n = Math.max(.001, +t),
            o = n * n;
        return e(n, o, o * o)
    }, r
}(Math.SQRT2, 2, 4);
var Un, Zn, Wn = 0,
    qn = 0,
    Kn = 0,
    Jn = 0,
    Qn = 0,
    eo = 0,
    to = "object" == typeof performance && performance.now ? performance : Date,
    no = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
        setTimeout(e, 17)
    };

function oo() {
    return Qn || (no(ro), Qn = to.now() + eo)
}

function ro() {
    Qn = 0
}

function io() {
    this._call = this._time = this._next = null
}

function ao(e, t, n) {
    var o = new io;
    return o.restart(e, t, n), o
}

function so() {
    Qn = (Jn = to.now()) + eo, Wn = qn = 0;
    try {
        ! function() {
            oo(), ++Wn;
            for (var e, t = Un; t;)(e = Qn - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
            --Wn
        }()
    } finally {
        Wn = 0,
            function() {
                var e, t, n = Un,
                    o = 1 / 0;
                for (; n;) n._call ? (o > n._time && (o = n._time), e = n, n = n._next) : (t = n._next, n._next = null, n = e ? e._next = t : Un = t);
                Zn = e, uo(o)
            }(), Qn = 0
    }
}

function lo() {
    var e = to.now(),
        t = e - Jn;
    t > 1e3 && (eo -= t, Jn = e)
}

function uo(e) {
    Wn || (qn && (qn = clearTimeout(qn)), e - Qn > 24 ? (e < 1 / 0 && (qn = setTimeout(so, e - to.now() - eo)), Kn && (Kn = clearInterval(Kn))) : (Kn || (Jn = to.now(), Kn = setInterval(lo, 1e3)), Wn = 1, no(so)))
}

function co(e, t, n) {
    var o = new io;
    return t = null == t ? 0 : +t, o.restart(n => {
        o.stop(), e(n + t)
    }, t, n), o
}
io.prototype = ao.prototype = {
    constructor: io,
    restart: function(e, t, n) {
        if ("function" != typeof e) throw new TypeError("callback is not a function");
        n = (null == n ? oo() : +n) + (null == t ? 0 : +t), this._next || Zn === this || (Zn ? Zn._next = this : Un = this, Zn = this), this._call = e, this._time = n, uo()
    },
    stop: function() {
        this._call && (this._call = null, this._time = 1 / 0, uo())
    }
};
var ho = ve("start", "end", "cancel", "interrupt"),
    fo = [];

function vo(e, t, n, o, r, i) {
    var a = e.__transition;
    if (a) {
        if (n in a) return
    } else e.__transition = {};
    ! function(e, t, n) {
        var o, r = e.__transition;

        function i(e) {
            n.state = 1, n.timer.restart(a, n.delay, n.time), n.delay <= e && a(e - n.delay)
        }

        function a(i) {
            var u, d, c, h;
            if (1 !== n.state) return l();
            for (u in r)
                if ((h = r[u]).name === n.name) {
                    if (3 === h.state) return co(a);
                    4 === h.state ? (h.state = 6, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete r[u]) : +u < t && (h.state = 6, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete r[u])
                }
            if (co(function() {
                    3 === n.state && (n.state = 4, n.timer.restart(s, n.delay, n.time), s(i))
                }), n.state = 2, n.on.call("start", e, e.__data__, n.index, n.group), 2 === n.state) {
                for (n.state = 3, o = new Array(c = n.tween.length), u = 0, d = -1; u < c; ++u)(h = n.tween[u].value.call(e, e.__data__, n.index, n.group)) && (o[++d] = h);
                o.length = d + 1
            }
        }

        function s(t) {
            for (var r = t < n.duration ? n.ease.call(null, t / n.duration) : (n.timer.restart(l), n.state = 5, 1), i = -1, a = o.length; ++i < a;) o[i].call(e, r);
            5 === n.state && (n.on.call("end", e, e.__data__, n.index, n.group), l())
        }

        function l() {
            for (var o in n.state = 6, n.timer.stop(), delete r[t], r) return;
            delete e.__transition
        }
        r[t] = n, n.timer = ao(i, 0, n.time)
    }(e, n, {
        name: t,
        index: o,
        group: r,
        on: ho,
        tween: fo,
        time: i.time,
        delay: i.delay,
        duration: i.duration,
        ease: i.ease,
        timer: null,
        state: 0
    })
}

function po(e, t) {
    var n = mo(e, t);
    if (n.state > 0) throw new Error("too late; already scheduled");
    return n
}

function go(e, t) {
    var n = mo(e, t);
    if (n.state > 3) throw new Error("too late; already running");
    return n
}

function mo(e, t) {
    var n = e.__transition;
    if (!n || !(n = n[t])) throw new Error("transition not found");
    return n
}

function yo(e, t) {
    var n, o, r, i = e.__transition,
        a = !0;
    if (i) {
        for (r in t = null == t ? null : t + "", i)(n = i[r]).name === t ? (o = n.state > 2 && n.state < 5, n.state = 6, n.timer.stop(), n.on.call(o ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r]) : a = !1;
        a && delete e.__transition
    }
}

function wo(e, t) {
    var n, o;
    return function() {
        var r = go(this, e),
            i = r.tween;
        if (i !== n)
            for (var a = 0, s = (o = n = i).length; a < s; ++a)
                if (o[a].name === t) {
                    (o = o.slice()).splice(a, 1);
                    break
                }
        r.tween = o
    }
}

function bo(e, t, n) {
    var o, r;
    if ("function" != typeof n) throw new Error;
    return function() {
        var i = go(this, e),
            a = i.tween;
        if (a !== o) {
            r = (o = a).slice();
            for (var s = {
                    name: t,
                    value: n
                }, l = 0, u = r.length; l < u; ++l)
                if (r[l].name === t) {
                    r[l] = s;
                    break
                }
            l === u && r.push(s)
        }
        i.tween = r
    }
}

function _o(e, t, n) {
    var o = e._id;
    return e.each(function() {
            var e = go(this, o);
            (e.value || (e.value = {}))[t] = n.apply(this, arguments)
        }),
        function(e) {
            return mo(e, o).value[t]
        }
}

function Eo(e, t) {
    var n;
    return ("number" == typeof t ? Tn : t instanceof un ? In : (n = un(t)) ? (t = n, In) : zn)(e, t)
}

function xo(e) {
    return function() {
        this.removeAttribute(e)
    }
}

function No(e) {
    return function() {
        this.removeAttributeNS(e.space, e.local)
    }
}

function ko(e, t, n) {
    var o, r, i = n + "";
    return function() {
        var a = this.getAttribute(e);
        return a === i ? null : a === o ? r : r = t(o = a, n)
    }
}

function So(e, t, n) {
    var o, r, i = n + "";
    return function() {
        var a = this.getAttributeNS(e.space, e.local);
        return a === i ? null : a === o ? r : r = t(o = a, n)
    }
}

function Mo(e, t, n) {
    var o, r, i;
    return function() {
        var a, s, l = n(this);
        if (null != l) return (a = this.getAttribute(e)) === (s = l + "") ? null : a === o && s === r ? i : (r = s, i = t(o = a, l));
        this.removeAttribute(e)
    }
}

function Io(e, t, n) {
    var o, r, i;
    return function() {
        var a, s, l = n(this);
        if (null != l) return (a = this.getAttributeNS(e.space, e.local)) === (s = l + "") ? null : a === o && s === r ? i : (r = s, i = t(o = a, l));
        this.removeAttributeNS(e.space, e.local)
    }
}

function Co(e, t) {
    var n, o;

    function r() {
        var r = t.apply(this, arguments);
        return r !== o && (n = (o = r) && function(e, t) {
            return function(n) {
                this.setAttributeNS(e.space, e.local, t.call(this, n))
            }
        }(e, r)), n
    }
    return r._value = t, r
}

function Oo(e, t) {
    var n, o;

    function r() {
        var r = t.apply(this, arguments);
        return r !== o && (n = (o = r) && function(e, t) {
            return function(n) {
                this.setAttribute(e, t.call(this, n))
            }
        }(e, r)), n
    }
    return r._value = t, r
}

function Po(e, t) {
    return function() {
        po(this, e).delay = +t.apply(this, arguments)
    }
}

function To(e, t) {
    return t = +t,
        function() {
            po(this, e).delay = t
        }
}

function Do(e, t) {
    return function() {
        go(this, e).duration = +t.apply(this, arguments)
    }
}

function Ao(e, t) {
    return t = +t,
        function() {
            go(this, e).duration = t
        }
}
var $o = Ct.prototype.constructor;

function zo(e) {
    return function() {
        this.style.removeProperty(e)
    }
}
var Bo = 0;

function Lo(e, t, n, o) {
    this._groups = e, this._parents = t, this._name = n, this._id = o
}

function Vo() {
    return ++Bo
}
var Ro = Ct.prototype;
Lo.prototype = {
    constructor: Lo,
    select: function(e) {
        var t = this._name,
            n = this._id;
        "function" != typeof e && (e = ke(e));
        for (var o = this._groups, r = o.length, i = new Array(r), a = 0; a < r; ++a)
            for (var s, l, u = o[a], d = u.length, c = i[a] = new Array(d), h = 0; h < d; ++h)(s = u[h]) && (l = e.call(s, s.__data__, h, u)) && ("__data__" in s && (l.__data__ = s.__data__), c[h] = l, vo(c[h], t, n, h, c, mo(s, n)));
        return new Lo(i, this._parents, t, n)
    },
    selectAll: function(e) {
        var t = this._name,
            n = this._id;
        "function" != typeof e && (e = Me(e));
        for (var o = this._groups, r = o.length, i = [], a = [], s = 0; s < r; ++s)
            for (var l, u = o[s], d = u.length, c = 0; c < d; ++c)
                if (l = u[c]) {
                    for (var h, f = e.call(l, l.__data__, c, u), v = mo(l, n), p = 0, g = f.length; p < g; ++p)(h = f[p]) && vo(h, t, n, p, f, v);
                    i.push(f), a.push(l)
                }
        return new Lo(i, a, t, n)
    },
    selectChild: Ro.selectChild,
    selectChildren: Ro.selectChildren,
    filter: function(e) {
        "function" != typeof e && (e = Ce(e));
        for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
            for (var i, a = t[r], s = a.length, l = o[r] = [], u = 0; u < s; ++u)(i = a[u]) && e.call(i, i.__data__, u, a) && l.push(i);
        return new Lo(o, this._parents, this._name, this._id)
    },
    merge: function(e) {
        if (e._id !== this._id) throw new Error;
        for (var t = this._groups, n = e._groups, o = t.length, r = n.length, i = Math.min(o, r), a = new Array(o), s = 0; s < i; ++s)
            for (var l, u = t[s], d = n[s], c = u.length, h = a[s] = new Array(c), f = 0; f < c; ++f)(l = u[f] || d[f]) && (h[f] = l);
        for (; s < o; ++s) a[s] = t[s];
        return new Lo(a, this._parents, this._name, this._id)
    },
    selection: function() {
        return new $o(this._groups, this._parents)
    },
    transition: function() {
        for (var e = this._name, t = this._id, n = Vo(), o = this._groups, r = o.length, i = 0; i < r; ++i)
            for (var a, s = o[i], l = s.length, u = 0; u < l; ++u)
                if (a = s[u]) {
                    var d = mo(a, t);
                    vo(a, e, n, u, s, {
                        time: d.time + d.delay + d.duration,
                        delay: 0,
                        duration: d.duration,
                        ease: d.ease
                    })
                }
        return new Lo(o, this._parents, e, n)
    },
    call: Ro.call,
    nodes: Ro.nodes,
    node: Ro.node,
    size: Ro.size,
    empty: Ro.empty,
    each: Ro.each,
    on: function(e, t) {
        var n = this._id;
        return arguments.length < 2 ? mo(this.node(), n).on.on(e) : this.each(function(e, t, n) {
            var o, r, i = function(e) {
                return (e + "").trim().split(/^|\s+/).every(function(e) {
                    var t = e.indexOf(".");
                    return t >= 0 && (e = e.slice(0, t)), !e || "start" === e
                })
            }(t) ? po : go;
            return function() {
                var a = i(this, e),
                    s = a.on;
                s !== o && (r = (o = s).copy()).on(t, n), a.on = r
            }
        }(n, e, t))
    },
    attr: function(e, t) {
        var n = be(e),
            o = "transform" === n ? Fn : Eo;
        return this.attrTween(e, "function" == typeof t ? (n.local ? Io : Mo)(n, o, _o(this, "attr." + e, t)) : null == t ? (n.local ? No : xo)(n) : (n.local ? So : ko)(n, o, t))
    },
    attrTween: function(e, t) {
        var n = "attr." + e;
        if (arguments.length < 2) return (n = this.tween(n)) && n._value;
        if (null == t) return this.tween(n, null);
        if ("function" != typeof t) throw new Error;
        var o = be(e);
        return this.tween(n, (o.local ? Co : Oo)(o, t))
    },
    style: function(e, t, n) {
        var o = "transform" == (e += "") ? Hn : Eo;
        return null == t ? this.styleTween(e, function(e, t) {
            var n, o, r;
            return function() {
                var i = Je(this, e),
                    a = (this.style.removeProperty(e), Je(this, e));
                return i === a ? null : i === n && a === o ? r : r = t(n = i, o = a)
            }
        }(e, o)).on("end.style." + e, zo(e)) : "function" == typeof t ? this.styleTween(e, function(e, t, n) {
            var o, r, i;
            return function() {
                var a = Je(this, e),
                    s = n(this),
                    l = s + "";
                return null == s && (this.style.removeProperty(e), l = s = Je(this, e)), a === l ? null : a === o && l === r ? i : (r = l, i = t(o = a, s))
            }
        }(e, o, _o(this, "style." + e, t))).each(function(e, t) {
            var n, o, r, i, a = "style." + t,
                s = "end." + a;
            return function() {
                var l = go(this, e),
                    u = l.on,
                    d = null == l.value[a] ? i || (i = zo(t)) : void 0;
                u === n && r === d || (o = (n = u).copy()).on(s, r = d), l.on = o
            }
        }(this._id, e)) : this.styleTween(e, function(e, t, n) {
            var o, r, i = n + "";
            return function() {
                var a = Je(this, e);
                return a === i ? null : a === o ? r : r = t(o = a, n)
            }
        }(e, o, t), n).on("end.style." + e, null)
    },
    styleTween: function(e, t, n) {
        var o = "style." + (e += "");
        if (arguments.length < 2) return (o = this.tween(o)) && o._value;
        if (null == t) return this.tween(o, null);
        if ("function" != typeof t) throw new Error;
        return this.tween(o, function(e, t, n) {
            var o, r;

            function i() {
                var i = t.apply(this, arguments);
                return i !== r && (o = (r = i) && function(e, t, n) {
                    return function(o) {
                        this.style.setProperty(e, t.call(this, o), n)
                    }
                }(e, i, n)), o
            }
            return i._value = t, i
        }(e, t, null == n ? "" : n))
    },
    text: function(e) {
        return this.tween("text", "function" == typeof e ? function(e) {
            return function() {
                var t = e(this);
                this.textContent = null == t ? "" : t
            }
        }(_o(this, "text", e)) : function(e) {
            return function() {
                this.textContent = e
            }
        }(null == e ? "" : e + ""))
    },
    textTween: function(e) {
        var t = "text";
        if (arguments.length < 1) return (t = this.tween(t)) && t._value;
        if (null == e) return this.tween(t, null);
        if ("function" != typeof e) throw new Error;
        return this.tween(t, function(e) {
            var t, n;

            function o() {
                var o = e.apply(this, arguments);
                return o !== n && (t = (n = o) && function(e) {
                    return function(t) {
                        this.textContent = e.call(this, t)
                    }
                }(o)), t
            }
            return o._value = e, o
        }(e))
    },
    remove: function() {
        return this.on("end.remove", (e = this._id, function() {
            var t = this.parentNode;
            for (var n in this.__transition)
                if (+n !== e) return;
            t && t.removeChild(this)
        }));
        var e
    },
    tween: function(e, t) {
        var n = this._id;
        if (e += "", arguments.length < 2) {
            for (var o, r = mo(this.node(), n).tween, i = 0, a = r.length; i < a; ++i)
                if ((o = r[i]).name === e) return o.value;
            return null
        }
        return this.each((null == t ? wo : bo)(n, e, t))
    },
    delay: function(e) {
        var t = this._id;
        return arguments.length ? this.each(("function" == typeof e ? Po : To)(t, e)) : mo(this.node(), t).delay
    },
    duration: function(e) {
        var t = this._id;
        return arguments.length ? this.each(("function" == typeof e ? Do : Ao)(t, e)) : mo(this.node(), t).duration
    },
    ease: function(e) {
        var t = this._id;
        return arguments.length ? this.each(function(e, t) {
            if ("function" != typeof t) throw new Error;
            return function() {
                go(this, e).ease = t
            }
        }(t, e)) : mo(this.node(), t).ease
    },
    easeVarying: function(e) {
        if ("function" != typeof e) throw new Error;
        return this.each(function(e, t) {
            return function() {
                var n = t.apply(this, arguments);
                if ("function" != typeof n) throw new Error;
                go(this, e).ease = n
            }
        }(this._id, e))
    },
    end: function() {
        var e, t, n = this,
            o = n._id,
            r = n.size();
        return new Promise(function(i, a) {
            var s = {
                    value: a
                },
                l = {
                    value: function() {
                        0 === --r && i()
                    }
                };
            n.each(function() {
                var n = go(this, o),
                    r = n.on;
                r !== e && ((t = (e = r).copy())._.cancel.push(s), t._.interrupt.push(s), t._.end.push(l)), n.on = t
            }), 0 === r && i()
        })
    },
    [Symbol.iterator]: Ro[Symbol.iterator]
};
var jo = {
    time: null,
    delay: 0,
    duration: 250,
    ease: function(e) {
        return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2
    }
};

function Go(e, t) {
    for (var n; !(n = e.__transition) || !(n = n[t]);)
        if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
    return n
}
Ct.prototype.interrupt = function(e) {
    return this.each(function() {
        yo(this, e)
    })
}, Ct.prototype.transition = function(e) {
    var t, n;
    e instanceof Lo ? (t = e._id, e = e._name) : (t = Vo(), (n = jo).time = oo(), e = null == e ? null : e + "");
    for (var o = this._groups, r = o.length, i = 0; i < r; ++i)
        for (var a, s = o[i], l = s.length, u = 0; u < l; ++u)(a = s[u]) && vo(a, e, t, u, s, n || Go(a, t));
    return new Lo(o, this._parents, e, t)
};
const Ho = e => () => e;

function Fo(e, {
    sourceEvent: t,
    target: n,
    transform: o,
    dispatch: r
}) {
    Object.defineProperties(this, {
        type: {
            value: e,
            enumerable: !0,
            configurable: !0
        },
        sourceEvent: {
            value: t,
            enumerable: !0,
            configurable: !0
        },
        target: {
            value: n,
            enumerable: !0,
            configurable: !0
        },
        transform: {
            value: o,
            enumerable: !0,
            configurable: !0
        },
        _: {
            value: r
        }
    })
}

function Yo(e, t, n) {
    this.k = e, this.x = t, this.y = n
}
Yo.prototype = {
    constructor: Yo,
    scale: function(e) {
        return 1 === e ? this : new Yo(this.k * e, this.x, this.y)
    },
    translate: function(e, t) {
        return 0 === e & 0 === t ? this : new Yo(this.k, this.x + this.k * e, this.y + this.k * t)
    },
    apply: function(e) {
        return [e[0] * this.k + this.x, e[1] * this.k + this.y]
    },
    applyX: function(e) {
        return e * this.k + this.x
    },
    applyY: function(e) {
        return e * this.k + this.y
    },
    invert: function(e) {
        return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k]
    },
    invertX: function(e) {
        return (e - this.x) / this.k
    },
    invertY: function(e) {
        return (e - this.y) / this.k
    },
    rescaleX: function(e) {
        return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e))
    },
    rescaleY: function(e) {
        return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e))
    },
    toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
    }
};
var Xo = new Yo(1, 0, 0);

function Uo(e) {
    e.stopImmediatePropagation()
}

function Zo(e) {
    e.preventDefault(), e.stopImmediatePropagation()
}

function Wo(e) {
    return !(e.ctrlKey && "wheel" !== e.type || e.button)
}

function qo() {
    var e = this;
    return e instanceof SVGElement ? (e = e.ownerSVGElement || e).hasAttribute("viewBox") ? [
        [(e = e.viewBox.baseVal).x, e.y],
        [e.x + e.width, e.y + e.height]
    ] : [
        [0, 0],
        [e.width.baseVal.value, e.height.baseVal.value]
    ] : [
        [0, 0],
        [e.clientWidth, e.clientHeight]
    ]
}

function Ko() {
    return this.__zoom || Xo
}

function Jo(e) {
    return -e.deltaY * (1 === e.deltaMode ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1)
}

function Qo() {
    return navigator.maxTouchPoints || "ontouchstart" in this
}

function er(e, t, n) {
    var o = e.invertX(t[0][0]) - n[0][0],
        r = e.invertX(t[1][0]) - n[1][0],
        i = e.invertY(t[0][1]) - n[0][1],
        a = e.invertY(t[1][1]) - n[1][1];
    return e.translate(r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r), a > i ? (i + a) / 2 : Math.min(0, i) || Math.max(0, a))
}
Yo.prototype;
var tr = (e => (e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom", e))(tr || {}),
    nr = (e => (e.Partial = "partial", e.Full = "full", e))(nr || {}),
    or = (e => (e.Bezier = "default", e.SimpleBezier = "simple-bezier", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e))(or || {}),
    rr = (e => (e.Strict = "strict", e.Loose = "loose", e))(rr || {}),
    ir = (e => (e.Arrow = "arrow", e.ArrowClosed = "arrowclosed", e))(ir || {}),
    ar = (e => (e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(ar || {}),
    sr = (e => (e.TopLeft = "top-left", e.TopCenter = "top-center", e.TopRight = "top-right", e.BottomLeft = "bottom-left", e.BottomCenter = "bottom-center", e.BottomRight = "bottom-right", e))(sr || {});
const lr = ["INPUT", "SELECT", "TEXTAREA"],
    ur = "undefined" != typeof document ? document : null;

function dr(e) {
    var t, n;
    const o = (null == (n = null == (t = e.composedPath) ? void 0 : t.call(e)) ? void 0 : n[0]) || e.target,
        r = "function" == typeof(null == o ? void 0 : o.hasAttribute) && o.hasAttribute("contenteditable"),
        i = "function" == typeof(null == o ? void 0 : o.closest) ? o.closest(".nokey") : null;
    return lr.includes(null == o ? void 0 : o.nodeName) || r || !!i
}

function cr(e, t, n, o) {
    const r = t.replace("+", "\n").replace("\n\n", "\n+").split("\n").map(e => e.trim().toLowerCase());
    if (1 === r.length) return e.toLowerCase() === t.toLowerCase();
    o || n.add(e.toLowerCase());
    const i = r.every((e, t) => n.has(e) && Array.from(n.values())[t] === r[t]);
    return o && n.delete(e.toLowerCase()), i
}

function hr(e, t) {
    const n = i(() => O(null == t ? void 0 : t.target) ? ? ur),
        o = x(!0 === O(e));
    let r = !1;
    const a = new Set;
    let s = u(O(e));

    function l() {
        r = !1, a.clear(), o.value = !0 === O(e)
    }

    function u(e) {
        return null === e ? (l(), () => !1) : "boolean" == typeof e ? (l(), o.value = e, () => !1) : Array.isArray(e) || "string" == typeof e ? function(e, t) {
            return n => {
                if (!n.code && !n.key) return !1;
                const o = (r = n.code, e.includes(r) ? "code" : "key");
                var r;
                return Array.isArray(e) ? e.some(e => cr(n[o], e, t, "keyup" === n.type)) : cr(n[o], e, t, "keyup" === n.type)
            }
        }(e, a) : e
    }
    return w(() => O(e), (e, t) => {
        "boolean" == typeof t && "boolean" != typeof e && l(), s = u(e)
    }, {
        immediate: !0
    }), de(["blur", "contextmenu"], l), ce((...e) => s(...e), e => {
        var n, i;
        const a = O(null == t ? void 0 : t.actInsideInputWithModifier) ? ? !0,
            s = O(null == t ? void 0 : t.preventDefault) ? ? !1;
        var l;
        r = (l = e).ctrlKey || l.metaKey || l.shiftKey || l.altKey;
        if ((!r || r && !a) && dr(e)) return;
        const u = (null == (i = null == (n = e.composedPath) ? void 0 : n.call(e)) ? void 0 : i[0]) || e.target,
            d = "BUTTON" === (null == u ? void 0 : u.nodeName) || "A" === (null == u ? void 0 : u.nodeName);
        s || !r && d || e.preventDefault(), o.value = !0
    }, {
        eventName: "keydown",
        target: n
    }), ce((...e) => s(...e), e => {
        const n = O(null == t ? void 0 : t.actInsideInputWithModifier) ? ? !0;
        if (o.value) {
            if ((!r || r && !n) && dr(e)) return;
            r = !1, o.value = !1
        }
    }, {
        eventName: "keyup",
        target: n
    }), o
}
const fr = "vue-flow__node-desc",
    vr = "vue-flow__edge-desc",
    pr = ["Enter", " ", "Escape"],
    gr = {
        ArrowUp: {
            x: 0,
            y: -1
        },
        ArrowDown: {
            x: 0,
            y: 1
        },
        ArrowLeft: {
            x: -1,
            y: 0
        },
        ArrowRight: {
            x: 1,
            y: 0
        }
    };

function mr(e) {
    return { ...e.computedPosition || {
            x: 0,
            y: 0
        },
        width: e.dimensions.width || 0,
        height: e.dimensions.height || 0
    }
}

function yr(e, t) {
    const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)),
        o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
    return Math.ceil(n * o)
}

function wr(e) {
    return {
        width: e.offsetWidth,
        height: e.offsetHeight
    }
}

function br(e, t = 0, n = 1) {
    return Math.min(Math.max(e, t), n)
}

function _r(e, t) {
    return {
        x: br(e.x, t[0][0], t[1][0]),
        y: br(e.y, t[0][1], t[1][1])
    }
}

function Er(e) {
    const t = e.getRootNode();
    return "elementFromPoint" in t ? t : window.document
}

function xr(e) {
    return e && "object" == typeof e && "id" in e && "source" in e && "target" in e
}

function Nr(e) {
    return e && "object" == typeof e && "id" in e && "position" in e && !xr(e)
}

function kr(e) {
    return Nr(e) && "computedPosition" in e
}

function Sr(e) {
    return !Number.isNaN(e) && Number.isFinite(e)
}

function Mr(e, t, n) {
    const o = {
        id: e.id.toString(),
        type: e.type ? ? "default",
        dimensions: F({
            width: 0,
            height: 0
        }),
        computedPosition: F({
            z: 0,
            ...e.position
        }),
        handleBounds: {
            source: [],
            target: []
        },
        draggable: void 0,
        selectable: void 0,
        connectable: void 0,
        focusable: void 0,
        selected: !1,
        dragging: !1,
        resizing: !1,
        initialized: !1,
        isParent: !1,
        position: {
            x: 0,
            y: 0
        },
        data: Ii(e.data) ? e.data : {},
        events: F(Ii(e.events) ? e.events : {})
    };
    return Object.assign(t ? ? o, e, {
        id: e.id.toString(),
        parentNode: n
    })
}

function Ir(e, t, n) {
    var o, r;
    const i = {
        id: e.id.toString(),
        type: e.type ? ? (null == t ? void 0 : t.type) ? ? "default",
        source: e.source.toString(),
        target: e.target.toString(),
        sourceHandle: null == (o = e.sourceHandle) ? void 0 : o.toString(),
        targetHandle: null == (r = e.targetHandle) ? void 0 : r.toString(),
        updatable: e.updatable ? ? (null == n ? void 0 : n.updatable),
        selectable: e.selectable ? ? (null == n ? void 0 : n.selectable),
        focusable: e.focusable ? ? (null == n ? void 0 : n.focusable),
        data: Ii(e.data) ? e.data : {},
        events: F(Ii(e.events) ? e.events : {}),
        label: e.label ? ? "",
        interactionWidth: e.interactionWidth ? ? (null == n ? void 0 : n.interactionWidth),
        ...n ? ? {}
    };
    return Object.assign(t ? ? i, e, {
        id: e.id.toString()
    })
}

function Cr(e, t, n, o) {
    const r = "string" == typeof e ? e : e.id,
        i = new Set,
        a = "source" === o ? "target" : "source";
    for (const s of n) s[a] === r && i.add(s[o]);
    return t.filter(e => i.has(e.id))
}

function Or({
    source: e,
    sourceHandle: t,
    target: n,
    targetHandle: o
}) {
    return `vueflow__edge-${e}${t??""}-${n}${o??""}`
}

function Pr({
    x: e,
    y: t
}, {
    x: n,
    y: o,
    zoom: r
}) {
    return {
        x: e * r + n,
        y: t * r + o
    }
}

function Tr({
    x: e,
    y: t
}, {
    x: n,
    y: o,
    zoom: r
}, i = !1, a = [1, 1]) {
    const s = {
        x: (e - n) / r,
        y: (t - o) / r
    };
    return i ? pi(s, a) : s
}

function Dr(e, t) {
    return {
        x: Math.min(e.x, t.x),
        y: Math.min(e.y, t.y),
        x2: Math.max(e.x2, t.x2),
        y2: Math.max(e.y2, t.y2)
    }
}

function Ar({
    x: e,
    y: t,
    width: n,
    height: o
}) {
    return {
        x: e,
        y: t,
        x2: e + n,
        y2: t + o
    }
}

function $r(e) {
    let t = {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY,
        x2: Number.NEGATIVE_INFINITY,
        y2: Number.NEGATIVE_INFINITY
    };
    for (let n = 0; n < e.length; n++) {
        const o = e[n];
        t = Dr(t, Ar({ ...o.computedPosition,
            ...o.dimensions
        }))
    }
    return function({
        x: e,
        y: t,
        x2: n,
        y2: o
    }) {
        return {
            x: e,
            y: t,
            width: n - e,
            height: o - t
        }
    }(t)
}

function zr(e, t, n = {
    x: 0,
    y: 0,
    zoom: 1
}, o = !1, r = !1) {
    const i = { ...Tr(t, n),
            width: t.width / n.zoom,
            height: t.height / n.zoom
        },
        a = [];
    for (const s of e) {
        const {
            dimensions: e,
            selectable: t = !0,
            hidden: n = !1
        } = s, l = e.width ? ? s.width ? ? null, u = e.height ? ? s.height ? ? null;
        if (r && !t || n) continue;
        const d = yr(i, mr(s));
        (null === l || null === u || o && d > 0 || d >= (l ? ? 0) * (u ? ? 0) || s.dragging) && a.push(s)
    }
    return a
}

function Br(e, t) {
    const n = new Set;
    if ("string" == typeof e) n.add(e);
    else if (e.length >= 1)
        for (const o of e) n.add(o.id);
    return t.filter(e => n.has(e.source) || n.has(e.target))
}

function Lr(e, t) {
    if ("number" == typeof e) return Math.floor(.5 * (t - t / (1 + e)));
    if ("string" == typeof e && e.endsWith("px")) {
        const t = Number.parseFloat(e);
        if (!Number.isNaN(t)) return Math.floor(t)
    }
    if ("string" == typeof e && e.endsWith("%")) {
        const n = Number.parseFloat(e);
        if (!Number.isNaN(n)) return Math.floor(t * n * .01)
    }
    return Ni(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0
}

function Vr(e, t, n, o, r, i = .1) {
    const a = function(e, t, n) {
            if ("string" == typeof e || "number" == typeof e) {
                const o = Lr(e, n),
                    r = Lr(e, t);
                return {
                    top: o,
                    right: r,
                    bottom: o,
                    left: r,
                    x: 2 * r,
                    y: 2 * o
                }
            }
            if ("object" == typeof e) {
                const o = Lr(e.top ? ? e.y ? ? 0, n),
                    r = Lr(e.bottom ? ? e.y ? ? 0, n),
                    i = Lr(e.left ? ? e.x ? ? 0, t),
                    a = Lr(e.right ? ? e.x ? ? 0, t);
                return {
                    top: o,
                    right: a,
                    bottom: r,
                    left: i,
                    x: i + a,
                    y: o + r
                }
            }
            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                x: 0,
                y: 0
            }
        }(i, t, n),
        s = (t - a.x) / e.width,
        l = (n - a.y) / e.height,
        u = br(Math.min(s, l), o, r),
        d = t / 2 - (e.x + e.width / 2) * u,
        c = n / 2 - (e.y + e.height / 2) * u,
        h = function(e, t, n, o, r, i) {
            const {
                x: a,
                y: s
            } = Pr(e, {
                x: t,
                y: n,
                zoom: o
            }), {
                x: l,
                y: u
            } = Pr({
                x: e.x + e.width,
                y: e.y + e.height
            }, {
                x: t,
                y: n,
                zoom: o
            }), d = r - l, c = i - u;
            return {
                left: Math.floor(a),
                top: Math.floor(s),
                right: Math.floor(d),
                bottom: Math.floor(c)
            }
        }(e, d, c, u, t, n),
        f = Math.min(h.left - a.left, 0),
        v = Math.min(h.top - a.top, 0);
    return {
        x: d - f + Math.min(h.right - a.right, 0),
        y: c - v + Math.min(h.bottom - a.bottom, 0),
        zoom: u
    }
}

function Rr(e, t) {
    if (!e.parentNode) return !1;
    const n = t.get(e.parentNode);
    return !!n && (!!n.selected || Rr(n, t))
}

function jr(e, t) {
    if (void 0 === e) return "";
    if ("string" == typeof e) return e;
    return `${t?`${t}__`:""}${Object.keys(e).sort().map(t=>`${t}=${e[t]}`).join("&")}`
}

function Gr(e) {
    const t = e.ctrlKey && vi() ? 10 : 1;
    return -e.deltaY * (1 === e.deltaMode ? .05 : e.deltaMode ? 1 : .002) * t
}

function Hr(e, t, n) {
    return e < t ? br(Math.abs(e - t), 1, t) / t : e > n ? -br(Math.abs(e - n), 1, t) / t : 0
}

function Fr(e, t, n = 15, o = 40) {
    return [Hr(e.x, o, t.width - o) * n, Hr(e.y, o, t.height - o) * n]
}

function Yr(e, t) {
    if (t) {
        const n = e.position.x + e.dimensions.width - t.dimensions.width,
            o = e.position.y + e.dimensions.height - t.dimensions.height;
        if (n > 0 || o > 0 || e.position.x < 0 || e.position.y < 0) {
            let r = {};
            if ("function" == typeof t.style ? r = { ...t.style(t)
                } : t.style && (r = { ...t.style
                }), r.width = r.width ? ? `${t.dimensions.width}px`, r.height = r.height ? ? `${t.dimensions.height}px`, n > 0)
                if ("string" == typeof r.width) {
                    const e = Number(r.width.replace("px", ""));
                    r.width = `${e+n}px`
                } else r.width += n;
            if (o > 0)
                if ("string" == typeof r.height) {
                    const e = Number(r.height.replace("px", ""));
                    r.height = `${e+o}px`
                } else r.height += o;
            if (e.position.x < 0) {
                const n = Math.abs(e.position.x);
                if (t.position.x = t.position.x - n, "string" == typeof r.width) {
                    const e = Number(r.width.replace("px", ""));
                    r.width = `${e+n}px`
                } else r.width += n;
                e.position.x = 0
            }
            if (e.position.y < 0) {
                const n = Math.abs(e.position.y);
                if (t.position.y = t.position.y - n, "string" == typeof r.height) {
                    const e = Number(r.height.replace("px", ""));
                    r.height = `${e+n}px`
                } else r.height += n;
                e.position.y = 0
            }
            t.dimensions.width = Number(r.width.toString().replace("px", "")), t.dimensions.height = Number(r.height.toString().replace("px", "")), "function" == typeof t.style ? t.style = e => ({ ...(0, t.style)(e),
                ...r
            }) : t.style = { ...t.style,
                ...r
            }
        }
    }
}

function Xr(e, t) {
    var n, o;
    const r = e.filter(e => "add" === e.type || "remove" === e.type);
    for (const a of r)
        if ("add" === a.type) {
            -1 === t.findIndex(e => e.id === a.item.id) && t.push(a.item)
        } else if ("remove" === a.type) {
        const e = t.findIndex(e => e.id === a.id); - 1 !== e && t.splice(e, 1)
    }
    const i = t.map(e => e.id);
    for (const a of t)
        for (const r of e)
            if (r.id === a.id) switch (r.type) {
                case "select":
                    a.selected = r.selected;
                    break;
                case "position":
                    if (kr(a) && (void 0 !== r.position && (a.position = r.position), void 0 !== r.dragging && (a.dragging = r.dragging), a.expandParent && a.parentNode)) {
                        const e = t[i.indexOf(a.parentNode)];
                        e && kr(e) && Yr(a, e)
                    }
                    break;
                case "dimensions":
                    if (kr(a) && (void 0 !== r.dimensions && (a.dimensions = r.dimensions), void 0 !== r.updateStyle && r.updateStyle && (a.style = { ...a.style || {},
                            width: `${null==(n=r.dimensions)?void 0:n.width}px`,
                            height: `${null==(o=r.dimensions)?void 0:o.height}px`
                        }), void 0 !== r.resizing && (a.resizing = r.resizing), a.expandParent && a.parentNode)) {
                        const e = t[i.indexOf(a.parentNode)];
                        if (e && kr(e)) {
                            !!e.dimensions.width && !!e.dimensions.height ? Yr(a, e) : R(() => {
                                Yr(a, e)
                            })
                        }
                    }
            }
    return t
}

function Ur(e, t) {
    return {
        id: e,
        type: "select",
        selected: t
    }
}

function Zr(e) {
    return {
        item: e,
        type: "add"
    }
}

function Wr(e) {
    return {
        id: e,
        type: "remove"
    }
}

function qr(e, t, n, o, r) {
    return {
        id: e,
        source: t,
        target: n,
        sourceHandle: o || null,
        targetHandle: r || null,
        type: "remove"
    }
}

function Kr(e, t = new Set, n = !1) {
    const o = [];
    for (const [r, i] of e) {
        const e = t.has(r);
        void 0 === i.selected && !e || i.selected === e || (n && (i.selected = e), o.push(Ur(i.id, e)))
    }
    return o
}
const Jr = () => {};

function Qr(e) {
    const t = new Set;
    let n = Jr,
        o = () => !1;
    const r = () => t.size > 0 || o(),
        i = e => {
            t.delete(e)
        };
    return {
        on: e => {
            t.add(e);
            const n = () => i(e);
            return q(n), {
                off: n
            }
        },
        off: i,
        trigger: o => {
            const i = [n];
            return r() ? i.push(...t) : e && i.push(e), Promise.allSettled(i.map(e => e(o)))
        },
        hasListeners: r,
        listeners: t,
        setEmitter: e => {
            n = e
        },
        removeEmitter: () => {
            n = Jr
        },
        setHasEmitListeners: e => {
            o = e
        },
        removeHasEmitListeners: () => {
            o = () => !1
        }
    }
}

function ei(e, t, n) {
    let o = e;
    do {
        if (o && o.matches(t)) return !0;
        if (o === n) return !1;
        o = o.parentElement
    } while (o);
    return !1
}

function ti({
    id: e,
    dragItems: t,
    findNode: n
}) {
    const o = [];
    for (const r of t) {
        const e = n(r.id);
        e && o.push(e)
    }
    return [e ? o.find(t => t.id === e) : o[0], o]
}

function ni(e) {
    if (Array.isArray(e)) switch (e.length) {
        case 1:
            return [e[0], e[0], e[0], e[0]];
        case 2:
            return [e[0], e[1], e[0], e[1]];
        case 3:
            return [e[0], e[1], e[2], e[1]];
        case 4:
            return e;
        default:
            return [0, 0, 0, 0]
    }
    return [e, e, e, e]
}

function oi(e, t, n, o) {
    let r = e.extent || n;
    if ("parent" !== r && (Array.isArray(r) || "parent" !== (null == r ? void 0 : r.range)) || e.expandParent) {
        if (Array.isArray(r)) {
            const e = (null == o ? void 0 : o.computedPosition.x) || 0,
                t = (null == o ? void 0 : o.computedPosition.y) || 0;
            r = [
                [r[0][0] + e, r[0][1] + t],
                [r[1][0] + e, r[1][1] + t]
            ]
        } else if ("parent" !== r && (null == r ? void 0 : r.range) && Array.isArray(r.range)) {
            const [e, t, n, i] = ni(r.padding), a = (null == o ? void 0 : o.computedPosition.x) || 0, s = (null == o ? void 0 : o.computedPosition.y) || 0;
            r = [
                [r.range[0][0] + a + i, r.range[0][1] + s + e],
                [r.range[1][0] + a - t, r.range[1][1] + s - n]
            ]
        }
    } else if (e.parentNode && o && e.dimensions.width && e.dimensions.height) {
        const e = function(e, t, n) {
            const [o, r, i, a] = "string" != typeof e ? ni(e.padding) : [0, 0, 0, 0];
            return !(!n || void 0 === n.computedPosition.x || void 0 === n.computedPosition.y || void 0 === n.dimensions.width || void 0 === n.dimensions.height) && [
                [n.computedPosition.x + a, n.computedPosition.y + o],
                [n.computedPosition.x + n.dimensions.width - r, n.computedPosition.y + n.dimensions.height - i]
            ]
        }(r, 0, o);
        e && (r = e)
    } else t(new ci(ui.NODE_EXTENT_INVALID, e.id)), r = n;
    return "parent" === r ? [
        [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
        [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
    ] : r
}

function ri(e, t, n, o, r) {
    const i = _r(t, function({
        width: e,
        height: t
    }, n) {
        return [n[0],
            [n[1][0] - (e || 0), n[1][1] - (t || 0)]
        ]
    }(e.dimensions, oi(e, n, o, r)));
    return {
        position: {
            x: i.x - ((null == r ? void 0 : r.computedPosition.x) || 0),
            y: i.y - ((null == r ? void 0 : r.computedPosition.y) || 0)
        },
        computedPosition: i
    }
}

function ii(e, t, n = tr.Left, o = !1) {
    const r = ((null == t ? void 0 : t.x) ? ? 0) + e.computedPosition.x,
        i = ((null == t ? void 0 : t.y) ? ? 0) + e.computedPosition.y,
        {
            width: a,
            height: s
        } = t ? ? function(e) {
            var t, n;
            return {
                width: (null == (t = e.dimensions) ? void 0 : t.width) ? ? e.width ? ? 0,
                height: (null == (n = e.dimensions) ? void 0 : n.height) ? ? e.height ? ? 0
            }
        }(e);
    if (o) return {
        x: r + a / 2,
        y: i + s / 2
    };
    switch ((null == t ? void 0 : t.position) ? ? n) {
        case tr.Top:
            return {
                x: r + a / 2,
                y: i
            };
        case tr.Right:
            return {
                x: r + a,
                y: i + s / 2
            };
        case tr.Bottom:
            return {
                x: r + a / 2,
                y: i + s
            };
        case tr.Left:
            return {
                x: r,
                y: i + s / 2
            }
    }
}

function ai(e, t) {
    return e && (t ? e.find(e => e.id === t) : e[0]) || null
}

function si({
    sourcePos: e,
    targetPos: t,
    sourceWidth: n,
    sourceHeight: o,
    targetWidth: r,
    targetHeight: i,
    width: a,
    height: s,
    viewport: l
}) {
    const u = {
        x: Math.min(e.x, t.x),
        y: Math.min(e.y, t.y),
        x2: Math.max(e.x + n, t.x + r),
        y2: Math.max(e.y + o, t.y + i)
    };
    u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
    const d = Ar({
            x: (0 - l.x) / l.zoom,
            y: (0 - l.y) / l.zoom,
            width: a / l.zoom,
            height: s / l.zoom
        }),
        c = Math.max(0, Math.min(d.x2, u.x2) - Math.max(d.x, u.x)),
        h = Math.max(0, Math.min(d.y2, u.y2) - Math.max(d.y, u.y));
    return Math.ceil(c * h) > 0
}

function li(e, t, n = !1) {
    const o = "number" == typeof e.zIndex;
    let r = o ? e.zIndex : 0;
    const i = t(e.source),
        a = t(e.target);
    return i && a ? (n && (r = o ? e.zIndex : Math.max(i.computedPosition.z || 0, a.computedPosition.z || 0)), r) : 0
}
var ui = (e => (e.MISSING_STYLES = "MISSING_STYLES", e.MISSING_VIEWPORT_DIMENSIONS = "MISSING_VIEWPORT_DIMENSIONS", e.NODE_INVALID = "NODE_INVALID", e.NODE_NOT_FOUND = "NODE_NOT_FOUND", e.NODE_MISSING_PARENT = "NODE_MISSING_PARENT", e.NODE_TYPE_MISSING = "NODE_TYPE_MISSING", e.NODE_EXTENT_INVALID = "NODE_EXTENT_INVALID", e.EDGE_INVALID = "EDGE_INVALID", e.EDGE_NOT_FOUND = "EDGE_NOT_FOUND", e.EDGE_SOURCE_MISSING = "EDGE_SOURCE_MISSING", e.EDGE_TARGET_MISSING = "EDGE_TARGET_MISSING", e.EDGE_TYPE_MISSING = "EDGE_TYPE_MISSING", e.EDGE_SOURCE_TARGET_SAME = "EDGE_SOURCE_TARGET_SAME", e.EDGE_SOURCE_TARGET_MISSING = "EDGE_SOURCE_TARGET_MISSING", e.EDGE_ORPHANED = "EDGE_ORPHANED", e.USEVUEFLOW_OPTIONS = "USEVUEFLOW_OPTIONS", e))(ui || {});
const di = {
    MISSING_STYLES: () => "It seems that you haven't loaded the necessary styles. Please import '@vue-flow/core/dist/style.css' to ensure that the graph is rendered correctly",
    MISSING_VIEWPORT_DIMENSIONS: () => "The Vue Flow parent container needs a width and a height to render the graph",
    NODE_INVALID: e => `Node is invalid\nNode: ${e}`,
    NODE_NOT_FOUND: e => `Node not found\nNode: ${e}`,
    NODE_MISSING_PARENT: (e, t) => `Node is missing a parent\nNode: ${e}\nParent: ${t}`,
    NODE_TYPE_MISSING: e => `Node type is missing\nType: ${e}`,
    NODE_EXTENT_INVALID: e => `Only child nodes can use a parent extent\nNode: ${e}`,
    EDGE_INVALID: e => `An edge needs a source and a target\nEdge: ${e}`,
    EDGE_SOURCE_MISSING: (e, t) => `Edge source is missing\nEdge: ${e} \nSource: ${t}`,
    EDGE_TARGET_MISSING: (e, t) => `Edge target is missing\nEdge: ${e} \nTarget: ${t}`,
    EDGE_TYPE_MISSING: e => `Edge type is missing\nType: ${e}`,
    EDGE_SOURCE_TARGET_SAME: (e, t, n) => `Edge source and target are the same\nEdge: ${e} \nSource: ${t} \nTarget: ${n}`,
    EDGE_SOURCE_TARGET_MISSING: (e, t, n) => `Edge source or target is missing\nEdge: ${e} \nSource: ${t} \nTarget: ${n}`,
    EDGE_ORPHANED: e => `Edge was orphaned (suddenly missing source or target) and has been removed\nEdge: ${e}`,
    EDGE_NOT_FOUND: e => `Edge not found\nEdge: ${e}`,
    USEVUEFLOW_OPTIONS: () => "The options parameter is deprecated and will be removed in the next major version. Please use the id parameter instead"
};
class ci extends Error {
    constructor(e, ...t) {
        var n;
        super(null == (n = di[e]) ? void 0 : n.call(di, ...t)), this.name = "VueFlowError", this.code = e, this.args = t
    }
}

function hi(e) {
    return "clientX" in e
}

function fi(e, t) {
    let n, o;
    return hi(e) ? (n = e.clientX, o = e.clientY) : "touches" in e && e.touches.length > 0 ? (n = e.touches[0].clientX, o = e.touches[0].clientY) : "changedTouches" in e && e.changedTouches.length > 0 ? (n = e.changedTouches[0].clientX, o = e.changedTouches[0].clientY) : (n = 0, o = 0), {
        x: n - ((null == t ? void 0 : t.left) ? ? 0),
        y: o - ((null == t ? void 0 : t.top) ? ? 0)
    }
}
const vi = () => {
    var e;
    return "undefined" != typeof navigator && (null == (e = null == navigator ? void 0 : navigator.userAgent) ? void 0 : e.indexOf("Mac")) >= 0
};

function pi(e, t = [1, 1]) {
    return {
        x: t[0] * Math.round(e.x / t[0]),
        y: t[1] * Math.round(e.y / t[1])
    }
}
const gi = () => !0;

function mi(e) {
    null == e || e.classList.remove("valid", "connecting", "vue-flow__handle-valid", "vue-flow__handle-connecting")
}

function yi(e, t, n, o) {
    var r, i;
    let a = [],
        s = Number.POSITIVE_INFINITY;
    const l = function(e, t, n) {
        const o = [],
            r = {
                x: e.x - n,
                y: e.y - n,
                width: 2 * n,
                height: 2 * n
            };
        for (const i of t.values()) yr(r, mr(i)) > 0 && o.push(i);
        return o
    }(e, n, t + 250);
    for (const u of l) {
        const n = [...(null == (r = u.handleBounds) ? void 0 : r.source) ? ? [], ...(null == (i = u.handleBounds) ? void 0 : i.target) ? ? []];
        for (const r of n) {
            if (o.nodeId === r.nodeId && o.type === r.type && o.id === r.id) continue;
            const {
                x: n,
                y: i
            } = ii(u, r, r.position, !0), l = Math.sqrt((n - e.x) ** 2 + (i - e.y) ** 2);
            l > t || (l < s ? (a = [{ ...r,
                x: n,
                y: i
            }], s = l) : l === s && a.push({ ...r,
                x: n,
                y: i
            }))
        }
    }
    if (!a.length) return null;
    if (a.length > 1) {
        const e = "source" === o.type ? "target" : "source";
        return a.find(t => t.type === e) ? ? a[0]
    }
    return a[0]
}

function wi(e, {
    handle: t,
    connectionMode: n,
    fromNodeId: o,
    fromHandleId: r,
    fromType: i,
    doc: a,
    lib: s,
    flowId: l,
    isValidConnection: u = gi
}, d, c, h, f) {
    const v = "target" === i,
        p = t ? a.querySelector(`.${s}-flow__handle[data-id="${l}-${null==t?void 0:t.nodeId}-${null==t?void 0:t.id}-${null==t?void 0:t.type}"]`) : null,
        {
            x: g,
            y: m
        } = fi(e),
        y = a.elementFromPoint(g, m),
        w = (null == y ? void 0 : y.classList.contains(`${s}-flow__handle`)) ? y : p,
        b = {
            handleDomNode: w,
            isValid: !1,
            connection: null,
            toHandle: null
        };
    if (w) {
        const e = bi(void 0, w),
            t = w.getAttribute("data-nodeid"),
            i = w.getAttribute("data-handleid"),
            a = w.classList.contains("connectable"),
            s = w.classList.contains("connectableend");
        if (!t || !e) return b;
        const l = {
            source: v ? t : o,
            sourceHandle: v ? i : r,
            target: v ? o : t,
            targetHandle: v ? r : i
        };
        b.connection = l;
        const p = a && s && (n === rr.Strict ? v && "source" === e || !v && "target" === e : t !== o || i !== r);
        b.isValid = p && u(l, {
            nodes: c,
            edges: d,
            sourceNode: h(l.source),
            targetNode: h(l.target)
        }), b.toHandle = _i(t, e, i, f, n, !0)
    }
    return b
}

function bi(e, t) {
    return e || ((null == t ? void 0 : t.classList.contains("target")) ? "target" : (null == t ? void 0 : t.classList.contains("source")) ? "source" : null)
}

function _i(e, t, n, o, r, i = !1) {
    var a, s, l;
    const u = o.get(e);
    if (!u) return null;
    const d = r === rr.Strict ? null == (a = u.handleBounds) ? void 0 : a[t] : [...(null == (s = u.handleBounds) ? void 0 : s.source) ? ? [], ...(null == (l = u.handleBounds) ? void 0 : l.target) ? ? []],
        c = (n ? null == d ? void 0 : d.find(e => e.id === n) : null == d ? void 0 : d[0]) ? ? null;
    return c && i ? { ...c,
        ...ii(u, c, c.position, !0)
    } : c
}
const Ei = {
        [tr.Left]: tr.Right,
        [tr.Right]: tr.Left,
        [tr.Top]: tr.Bottom,
        [tr.Bottom]: tr.Top
    },
    xi = ["production", "prod"];

function Ni(e, ...t) {
    ki()
}

function ki() {
    return !xi.includes("production")
}

function Si(e, t, n, o, r) {
    const i = t.querySelectorAll(`.vue-flow__handle.${e}`);
    return (null == i ? void 0 : i.length) ? Array.from(i).map(t => {
        const i = t.getBoundingClientRect();
        return {
            id: t.getAttribute("data-handleid"),
            type: e,
            nodeId: r,
            position: t.getAttribute("data-handlepos"),
            x: (i.left - n.left) / o,
            y: (i.top - n.top) / o,
            ...wr(t)
        }
    }) : null
}

function Mi(e, t, n, o, r, i = !1, a) {
    r.value = !1, e.selected ? (i || e.selected && t) && (o([e]), R(() => {
        a.blur()
    })) : n([e])
}

function Ii(e) {
    return void 0 !== d(e)
}

function Ci(e, t, n, o) {
    if (!e || !e.source || !e.target) return n(new ci(ui.EDGE_INVALID, (null == e ? void 0 : e.id) ? ? "[ID UNKNOWN]")), !1;
    let r;
    return r = xr(e) ? e : { ...e,
        id: Or(e)
    }, r = Ir(r, void 0, o), ! function(e, t) {
        return t.some(t => xr(t) && t.source === e.source && t.target === e.target && (t.sourceHandle === e.sourceHandle || !t.sourceHandle && !e.sourceHandle) && (t.targetHandle === e.targetHandle || !t.targetHandle && !e.targetHandle))
    }(r, t) && r
}

function Oi(e, t, n) {
    const o = {},
        r = [];
    for (let i = 0; i < e.length; ++i) {
        const a = e[i];
        if (!Nr(a)) {
            n(new ci(ui.NODE_INVALID, null == a ? void 0 : a.id) || `[ID UNKNOWN|INDEX ${i}]`);
            continue
        }
        const s = Mr(a, t(a.id), a.parentNode);
        a.parentNode && (o[a.parentNode] = !0), r[i] = s
    }
    for (const i of r) {
        const e = t(i.parentNode) || r.find(e => e.id === i.parentNode);
        i.parentNode && !e && n(new ci(ui.NODE_MISSING_PARENT, i.id, i.parentNode)), (i.parentNode || o[i.id]) && (o[i.id] && (i.isParent = !0), e && (e.isParent = !0))
    }
    return r
}

function Pi(e, t, n, o, r, i) {
    let a = r;
    const s = o.get(a) || new Map;
    o.set(a, s.set(n, t)), a = `${r}-${e}`;
    const l = o.get(a) || new Map;
    if (o.set(a, l.set(n, t)), i) {
        a = `${r}-${e}-${i}`;
        const s = o.get(a) || new Map;
        o.set(a, s.set(n, t))
    }
}

function Ti(e, t, n) {
    e.clear();
    for (const o of n) {
        const {
            source: t,
            target: n,
            sourceHandle: r = null,
            targetHandle: i = null
        } = o, a = {
            edgeId: o.id,
            source: t,
            target: n,
            sourceHandle: r,
            targetHandle: i
        }, s = `${t}-${r}--${n}-${i}`;
        Pi("source", a, `${n}-${i}--${t}-${r}`, e, t, r), Pi("target", a, s, e, n, i)
    }
}

function Di(e, t) {
    if (e.size !== t.size) return !1;
    for (const n of e)
        if (!t.has(n)) return !1;
    return !0
}

function Ai(e, t, n, o, r, i, a, s) {
    const l = [];
    for (const u of e) {
        const e = xr(u) ? u : Ci(u, s, r, i);
        if (!e) continue;
        const d = n(e.source),
            c = n(e.target);
        if (!d || !c) {
            r(new ci(ui.EDGE_SOURCE_TARGET_MISSING, e.id, e.source, e.target));
            continue
        }
        if (!d) {
            r(new ci(ui.EDGE_SOURCE_MISSING, e.id, e.source));
            continue
        }
        if (!c) {
            r(new ci(ui.EDGE_TARGET_MISSING, e.id, e.target));
            continue
        }
        if (t) {
            if (!t(e, {
                    edges: s,
                    nodes: a,
                    sourceNode: d,
                    targetNode: c
                })) {
                r(new ci(ui.EDGE_INVALID, e.id));
                continue
            }
        }
        const h = o(e.id);
        l.push({ ...Ir(e, h, i),
            sourceNode: d,
            targetNode: c
        })
    }
    return l
}
const $i = Symbol("vueFlow"),
    zi = Symbol("nodeId"),
    Bi = Symbol("nodeRef"),
    Li = Symbol("edgeId"),
    Vi = Symbol("edgeRef"),
    Ri = Symbol("slots");

function ji(e) {
    const {
        vueFlowRef: t,
        snapToGrid: n,
        snapGrid: o,
        noDragClassName: r,
        nodeLookup: i,
        nodeExtent: a,
        nodeDragThreshold: s,
        viewport: l,
        autoPanOnNodeDrag: u,
        autoPanSpeed: d,
        nodesDraggable: c,
        panBy: h,
        findNode: f,
        multiSelectionActive: v,
        nodesSelectionActive: p,
        selectNodesOnDrag: g,
        removeSelectedElements: m,
        addSelectedNodes: y,
        updateNodePositions: b,
        emits: _
    } = Ba(), {
        onStart: E,
        onDrag: N,
        onStop: k,
        onClick: S,
        el: M,
        disabled: I,
        id: C,
        selectable: P,
        dragHandle: T
    } = e, D = x(!1);
    let A, $ = [],
        z = null,
        B = {
            x: void 0,
            y: void 0
        },
        L = {
            x: 0,
            y: 0
        },
        V = null,
        R = !1,
        j = !1,
        G = 0,
        H = !1;
    const F = function() {
            const {
                viewport: e,
                snapGrid: t,
                snapToGrid: n,
                vueFlowRef: o
            } = Ba();
            return r => {
                var i;
                const a = (null == (i = o.value) ? void 0 : i.getBoundingClientRect()) ? ? {
                        left: 0,
                        top: 0
                    },
                    s = function(e) {
                        return "sourceEvent" in e
                    }(r) ? r.sourceEvent : r,
                    {
                        x: l,
                        y: u
                    } = fi(s, a),
                    d = Tr({
                        x: l,
                        y: u
                    }, e.value),
                    {
                        x: c,
                        y: h
                    } = n.value ? pi(d, t.value) : d;
                return {
                    xSnapped: c,
                    ySnapped: h,
                    ...d
                }
            }
        }(),
        Y = ({
            x: e,
            y: t
        }) => {
            B = {
                x: e,
                y: t
            };
            let r = !1;
            if ($ = $.map(i => {
                    const s = {
                            x: e - i.distance.x,
                            y: t - i.distance.y
                        },
                        {
                            computedPosition: l
                        } = ri(i, n.value ? pi(s, o.value) : s, _.error, a.value, i.parentNode ? f(i.parentNode) : void 0);
                    return r = r || i.position.x !== l.x || i.position.y !== l.y, i.position = l, i
                }), j = j || r, r && (b($, !0, !0), D.value = !0, V)) {
                const [e, t] = ti({
                    id: C,
                    dragItems: $,
                    findNode: f
                });
                N({
                    event: V,
                    node: e,
                    nodes: t
                })
            }
        },
        X = () => {
            if (!z) return;
            const [e, t] = Fr(L, z, d.value);
            if (0 !== e || 0 !== t) {
                const n = {
                    x: (B.x ? ? 0) - e / l.value.zoom,
                    y: (B.y ? ? 0) - t / l.value.zoom
                };
                h({
                    x: e,
                    y: t
                }) && Y(n)
            }
            G = requestAnimationFrame(X)
        },
        U = (e, t) => {
            R = !0;
            const n = f(C);
            g.value || v.value || !n || n.selected || m(), n && O(P) && g.value && Mi(n, v.value, y, m, p, !1, t);
            const o = F(e.sourceEvent);
            if (B = o, $ = function(e, t, n, o) {
                    var r, i;
                    const a = new Map;
                    for (const [s, l] of e) !l.selected && l.id !== o || l.parentNode && Rr(l, e) || !(l.draggable || t && void 0 === l.draggable) || e.get(s) && a.set(s, {
                        id: l.id,
                        position: l.position || {
                            x: 0,
                            y: 0
                        },
                        distance: {
                            x: n.x - (null == (r = l.computedPosition) ? void 0 : r.x) || 0,
                            y: n.y - (null == (i = l.computedPosition) ? void 0 : i.y) || 0
                        },
                        from: {
                            x: l.computedPosition.x,
                            y: l.computedPosition.y
                        },
                        extent: l.extent,
                        parentNode: l.parentNode,
                        dimensions: { ...l.dimensions
                        },
                        expandParent: l.expandParent
                    });
                    return Array.from(a.values())
                }(i.value, c.value, o, C), $.length) {
                const [t, n] = ti({
                    id: C,
                    dragItems: $,
                    findNode: f
                });
                E({
                    event: e.sourceEvent,
                    node: t,
                    nodes: n
                })
            }
        };
    return w([() => O(I), M], ([e, n], o, i) => {
        if (n) {
            const o = Ot(n);
            e || (A = function() {
                var e, t, n, o, r = Rt,
                    i = jt,
                    a = Gt,
                    s = Ht,
                    l = {},
                    u = ve("start", "drag", "end"),
                    d = 0,
                    c = 0;

                function h(e) {
                    e.on("mousedown.drag", f).filter(s).on("touchstart.drag", g).on("touchmove.drag", m, Tt).on("touchend.drag touchcancel.drag", y).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                }

                function f(a, s) {
                    if (!o && r.call(this, a, s)) {
                        var l = w(this, i.call(this, a, s), a, s, "mouse");
                        l && (Ot(a.view).on("mousemove.drag", v, Dt).on("mouseup.drag", p, Dt), zt(a.view), At(a), n = !1, e = a.clientX, t = a.clientY, l("start", a))
                    }
                }

                function v(o) {
                    if ($t(o), !n) {
                        var r = o.clientX - e,
                            i = o.clientY - t;
                        n = r * r + i * i > c
                    }
                    l.mouse("drag", o)
                }

                function p(e) {
                    Ot(e.view).on("mousemove.drag mouseup.drag", null), Bt(e.view, n), $t(e), l.mouse("end", e)
                }

                function g(e, t) {
                    if (r.call(this, e, t)) {
                        var n, o, a = e.changedTouches,
                            s = i.call(this, e, t),
                            l = a.length;
                        for (n = 0; n < l; ++n)(o = w(this, s, e, t, a[n].identifier, a[n])) && (At(e), o("start", e, a[n]))
                    }
                }

                function m(e) {
                    var t, n, o = e.changedTouches,
                        r = o.length;
                    for (t = 0; t < r; ++t)(n = l[o[t].identifier]) && ($t(e), n("drag", e, o[t]))
                }

                function y(e) {
                    var t, n, r = e.changedTouches,
                        i = r.length;
                    for (o && clearTimeout(o), o = setTimeout(function() {
                            o = null
                        }, 500), t = 0; t < i; ++t)(n = l[r[t].identifier]) && (At(e), n("end", e, r[t]))
                }

                function w(e, t, n, o, r, i) {
                    var s, c, f, v = u.copy(),
                        p = Pt(i || n, t);
                    if (null != (f = a.call(e, new Vt("beforestart", {
                            sourceEvent: n,
                            target: h,
                            identifier: r,
                            active: d,
                            x: p[0],
                            y: p[1],
                            dx: 0,
                            dy: 0,
                            dispatch: v
                        }), o))) return s = f.x - p[0] || 0, c = f.y - p[1] || 0,
                        function n(i, a, u) {
                            var g, m = p;
                            switch (i) {
                                case "start":
                                    l[r] = n, g = d++;
                                    break;
                                case "end":
                                    delete l[r], --d;
                                case "drag":
                                    p = Pt(u || a, t), g = d
                            }
                            v.call(i, e, new Vt(i, {
                                sourceEvent: a,
                                subject: f,
                                target: h,
                                identifier: r,
                                active: g,
                                x: p[0] + s,
                                y: p[1] + c,
                                dx: p[0] - m[0],
                                dy: p[1] - m[1],
                                dispatch: v
                            }), o)
                        }
                }
                return h.filter = function(e) {
                    return arguments.length ? (r = "function" == typeof e ? e : Lt(!!e), h) : r
                }, h.container = function(e) {
                    return arguments.length ? (i = "function" == typeof e ? e : Lt(e), h) : i
                }, h.subject = function(e) {
                    return arguments.length ? (a = "function" == typeof e ? e : Lt(e), h) : a
                }, h.touchable = function(e) {
                    return arguments.length ? (s = "function" == typeof e ? e : Lt(!!e), h) : s
                }, h.on = function() {
                    var e = u.on.apply(u, arguments);
                    return e === u ? h : e
                }, h.clickDistance = function(e) {
                    return arguments.length ? (c = (e = +e) * e, h) : Math.sqrt(c)
                }, h
            }().on("start", e => ((e, n) => {
                var o;
                "touchmove" === e.sourceEvent.type && e.sourceEvent.touches.length > 1 || (j = !1, 0 === s.value && U(e, n), B = F(e.sourceEvent), z = (null == (o = t.value) ? void 0 : o.getBoundingClientRect()) || null, L = fi(e.sourceEvent, z))
            })(e, n)).on("drag", e => ((e, t) => {
                const n = F(e.sourceEvent);
                if (!H && R && u.value && (H = !0, X()), !R) {
                    const o = n.xSnapped - (B.x ? ? 0),
                        r = n.ySnapped - (B.y ? ? 0);
                    Math.sqrt(o * o + r * r) > s.value && U(e, t)
                }(B.x !== n.xSnapped || B.y !== n.ySnapped) && $.length && R && (V = e.sourceEvent, L = fi(e.sourceEvent, z), Y(n))
            })(e, n)).on("end", e => (e => {
                let t = !1;
                if (!R && !D.value && !v.value) {
                    const n = e.sourceEvent,
                        o = F(n),
                        r = o.xSnapped - (B.x ? ? 0),
                        i = o.ySnapped - (B.y ? ? 0),
                        a = Math.sqrt(r * r + i * i);
                    0 !== a && a <= s.value && (null == S || S(n), t = !0)
                }
                if ($.length && !t) {
                    j && (b($, !1, !1), j = !1);
                    const [t, n] = ti({
                        id: C,
                        dragItems: $,
                        findNode: f
                    });
                    k({
                        event: e.sourceEvent,
                        node: t,
                        nodes: n
                    })
                }
                $ = [], D.value = !1, H = !1, R = !1, B = {
                    x: void 0,
                    y: void 0
                }, cancelAnimationFrame(G)
            })(e)).filter(e => {
                const t = e.target,
                    o = O(T);
                return !e.button && (!r.value || !ei(t, `.${r.value}`, n) && (!o || ei(t, o, n)))
            }), o.call(A)), i(() => {
                o.on(".drag", null), A && (A.on("start", null), A.on("drag", null), A.on("end", null))
            })
        }
    }), D
}

function Gi(e, t) {
    const n = {
        doubleClick: Qr(),
        click: Qr(),
        mouseEnter: Qr(),
        mouseMove: Qr(),
        mouseLeave: Qr(),
        contextMenu: Qr(),
        updateStart: Qr(),
        update: Qr(),
        updateEnd: Qr()
    };
    return n.doubleClick.on(n => {
        var o, r;
        t.edgeDoubleClick(n), null == (r = null == (o = e.events) ? void 0 : o.doubleClick) || r.call(o, n)
    }), n.click.on(n => {
        var o, r;
        t.edgeClick(n), null == (r = null == (o = e.events) ? void 0 : o.click) || r.call(o, n)
    }), n.mouseEnter.on(n => {
        var o, r;
        t.edgeMouseEnter(n), null == (r = null == (o = e.events) ? void 0 : o.mouseEnter) || r.call(o, n)
    }), n.mouseMove.on(n => {
        var o, r;
        t.edgeMouseMove(n), null == (r = null == (o = e.events) ? void 0 : o.mouseMove) || r.call(o, n)
    }), n.mouseLeave.on(n => {
        var o, r;
        t.edgeMouseLeave(n), null == (r = null == (o = e.events) ? void 0 : o.mouseLeave) || r.call(o, n)
    }), n.contextMenu.on(n => {
        var o, r;
        t.edgeContextMenu(n), null == (r = null == (o = e.events) ? void 0 : o.contextMenu) || r.call(o, n)
    }), n.updateStart.on(n => {
        var o, r;
        t.edgeUpdateStart(n), null == (r = null == (o = e.events) ? void 0 : o.updateStart) || r.call(o, n)
    }), n.update.on(n => {
        var o, r;
        t.edgeUpdate(n), null == (r = null == (o = e.events) ? void 0 : o.update) || r.call(o, n)
    }), n.updateEnd.on(n => {
        var o, r;
        t.edgeUpdateEnd(n), null == (r = null == (o = e.events) ? void 0 : o.updateEnd) || r.call(o, n)
    }), Object.entries(n).reduce((e, [t, n]) => (e.emit[t] = n.trigger, e.on[t] = n.on, e), {
        emit: {},
        on: {}
    })
}

function Hi() {
    return !0
}

function Fi({
    handleId: e,
    nodeId: t,
    type: n,
    isValidConnection: o,
    edgeUpdaterType: r,
    onEdgeUpdate: i,
    onEdgeUpdateEnd: a
}) {
    const {
        id: s,
        vueFlowRef: l,
        connectionMode: u,
        connectionRadius: d,
        connectOnClick: c,
        connectionClickStartHandle: h,
        nodesConnectable: f,
        autoPanOnConnect: v,
        autoPanSpeed: p,
        findNode: g,
        panBy: m,
        startConnection: y,
        updateConnection: w,
        endConnection: b,
        emits: _,
        viewport: E,
        edges: x,
        nodes: N,
        isValidConnection: k,
        nodeLookup: S
    } = Ba();
    let M = null,
        I = !1,
        C = null;
    return {
        handlePointerDown: function(c) {
            var h;
            const f = "target" === O(n),
                P = hi(c),
                T = Er(c.target),
                D = c.currentTarget;
            if (D && (P && 0 === c.button || !P)) {
                let n = function(n) {
                        F = fi(n, j), $ = yi(Tr(F, E.value, !1, [1, 1]), d.value, S.value, U), Y || (X(), Y = !0);
                        const o = wi(n, {
                            handle: $,
                            connectionMode: u.value,
                            fromNodeId: O(t),
                            fromHandleId: O(e),
                            fromType: f ? "target" : "source",
                            isValidConnection: z,
                            doc: T,
                            lib: "vue",
                            flowId: s,
                            nodeLookup: S.value
                        }, x.value, N.value, g, S.value);
                        C = o.handleDomNode, M = o.connection, I = function(e, t) {
                            let n = null;
                            return t ? n = !0 : e && !t && (n = !1), n
                        }(!!$, o.isValid);
                        const r = { ...q,
                            isValid: I,
                            to: o.toHandle && I ? Pr({
                                x: o.toHandle.x,
                                y: o.toHandle.y
                            }, E.value) : F,
                            toHandle: o.toHandle,
                            toPosition: I && o.toHandle ? o.toHandle.position : Ei[U.position],
                            toNode: o.toHandle ? S.value.get(o.toHandle.nodeId) : null
                        };
                        if (I && $ && (null == q ? void 0 : q.toHandle) && r.toHandle && q.toHandle.type === r.toHandle.type && q.toHandle.nodeId === r.toHandle.nodeId && q.toHandle.id === r.toHandle.id && q.to.x === r.to.x && q.to.y === r.to.y) return;
                        const i = $ ? ? o.toHandle;
                        if (w(i && I ? Pr({
                                x: i.x,
                                y: i.y
                            }, E.value) : F, o.toHandle, function(e, t) {
                                let n = null;
                                return t ? n = "valid" : e && !t && (n = "invalid"), n
                            }(!!i, I)), q = r, !$ && !I && !C) return mi(H);
                        M && M.source !== M.target && C && (mi(H), H = C, C.classList.add("connecting", "vue-flow__handle-connecting"), C.classList.toggle("valid", !!I), C.classList.toggle("vue-flow__handle-valid", !!I))
                    },
                    P = function(e) {
                        "touches" in e && e.touches.length > 0 || (($ || C) && M && I && (i ? i(e, M) : _.connect(M)), _.connectEnd(e), r && (null == a || a(e)), mi(H), cancelAnimationFrame(B), b(e), Y = !1, I = !1, M = null, C = null, T.removeEventListener("mousemove", n), T.removeEventListener("mouseup", P), T.removeEventListener("touchmove", n), T.removeEventListener("touchend", P))
                    };
                const A = g(O(t));
                let $, z = O(o) || k.value || Hi;
                !z && A && (z = (f ? A.isValidSourcePos : A.isValidTargetPos) || Hi);
                let B = 0;
                const {
                    x: L,
                    y: V
                } = fi(c), R = bi(O(r), D), j = null == (h = l.value) ? void 0 : h.getBoundingClientRect();
                if (!j || !R) return;
                const G = _i(O(t), R, O(e), S.value, u.value);
                if (!G) return;
                let H, F = fi(c, j),
                    Y = !1;
                const X = () => {
                        if (!v.value) return;
                        const [e, t] = Fr(F, j, p.value);
                        m({
                            x: e,
                            y: t
                        }), B = requestAnimationFrame(X)
                    },
                    U = { ...G,
                        nodeId: O(t),
                        type: R,
                        position: G.position
                    },
                    Z = S.value.get(O(t)),
                    W = {
                        inProgress: !0,
                        isValid: null,
                        from: ii(Z, U, tr.Left, !0),
                        fromHandle: U,
                        fromPosition: U.position,
                        fromNode: Z,
                        to: F,
                        toHandle: null,
                        toPosition: Ei[U.position],
                        toNode: null
                    };
                y({
                    nodeId: O(t),
                    id: O(e),
                    type: R,
                    position: (null == D ? void 0 : D.getAttribute("data-handlepos")) || tr.Top,
                    ...F
                }, {
                    x: L - j.left,
                    y: V - j.top
                }), _.connectStart({
                    event: c,
                    nodeId: O(t),
                    handleId: O(e),
                    handleType: R
                });
                let q = W;
                T.addEventListener("mousemove", n), T.addEventListener("mouseup", P), T.addEventListener("touchmove", n), T.addEventListener("touchend", P)
            }
        },
        handleClick: function(r) {
            var i, a;
            if (!c.value) return;
            const l = "target" === O(n);
            if (!h.value) return _.clickConnectStart({
                event: r,
                nodeId: O(t),
                handleId: O(e)
            }), void y({
                nodeId: O(t),
                type: O(n),
                id: O(e),
                position: tr.Top,
                ...fi(r)
            }, void 0, !0);
            let d = O(o) || k.value || Hi;
            const v = g(O(t));
            if (!d && v && (d = (l ? v.isValidSourcePos : v.isValidTargetPos) || Hi), v && !1 === (void 0 === v.connectable ? f.value : v.connectable)) return;
            const p = Er(r.target),
                m = wi(r, {
                    handle: {
                        nodeId: O(t),
                        id: O(e),
                        type: O(n),
                        position: tr.Top,
                        ...fi(r)
                    },
                    connectionMode: u.value,
                    fromNodeId: h.value.nodeId,
                    fromHandleId: h.value.id ? ? null,
                    fromType: h.value.type,
                    isValidConnection: d,
                    doc: p,
                    lib: "vue",
                    flowId: s,
                    nodeLookup: S.value
                }, x.value, N.value, g, S.value),
                w = (null == (i = m.connection) ? void 0 : i.source) === (null == (a = m.connection) ? void 0 : a.target);
            m.isValid && m.connection && !w && _.connect(m.connection), _.clickConnectEnd(r), b(r, !0)
        }
    }
}

function Yi(e) {
    const t = e ? ? m(zi, "") ? ? "",
        n = m(Bi, r(null)),
        {
            findNode: o,
            edges: a,
            emits: s
        } = Ba(),
        l = o(t);
    return l || s.error(new ci(ui.NODE_NOT_FOUND, t)), {
        id: t,
        nodeEl: n,
        node: l,
        parentNode: i(() => o(l.parentNode)),
        connectedEdges: i(() => Br([l], a.value))
    }
}

function Xi(e, t) {
    const n = {
        doubleClick: Qr(),
        click: Qr(),
        mouseEnter: Qr(),
        mouseMove: Qr(),
        mouseLeave: Qr(),
        contextMenu: Qr(),
        dragStart: Qr(),
        drag: Qr(),
        dragStop: Qr()
    };
    return n.doubleClick.on(n => {
        var o, r;
        t.nodeDoubleClick(n), null == (r = null == (o = e.events) ? void 0 : o.doubleClick) || r.call(o, n)
    }), n.click.on(n => {
        var o, r;
        t.nodeClick(n), null == (r = null == (o = e.events) ? void 0 : o.click) || r.call(o, n)
    }), n.mouseEnter.on(n => {
        var o, r;
        t.nodeMouseEnter(n), null == (r = null == (o = e.events) ? void 0 : o.mouseEnter) || r.call(o, n)
    }), n.mouseMove.on(n => {
        var o, r;
        t.nodeMouseMove(n), null == (r = null == (o = e.events) ? void 0 : o.mouseMove) || r.call(o, n)
    }), n.mouseLeave.on(n => {
        var o, r;
        t.nodeMouseLeave(n), null == (r = null == (o = e.events) ? void 0 : o.mouseLeave) || r.call(o, n)
    }), n.contextMenu.on(n => {
        var o, r;
        t.nodeContextMenu(n), null == (r = null == (o = e.events) ? void 0 : o.contextMenu) || r.call(o, n)
    }), n.dragStart.on(n => {
        var o, r;
        t.nodeDragStart(n), null == (r = null == (o = e.events) ? void 0 : o.dragStart) || r.call(o, n)
    }), n.drag.on(n => {
        var o, r;
        t.nodeDrag(n), null == (r = null == (o = e.events) ? void 0 : o.drag) || r.call(o, n)
    }), n.dragStop.on(n => {
        var o, r;
        t.nodeDragStop(n), null == (r = null == (o = e.events) ? void 0 : o.dragStop) || r.call(o, n)
    }), Object.entries(n).reduce((e, [t, n]) => (e.emit[t] = n.trigger, e.on[t] = n.on, e), {
        emit: {},
        on: {}
    })
}

function Ui() {
    const {
        getSelectedNodes: e,
        nodeExtent: t,
        updateNodePositions: n,
        findNode: o,
        snapGrid: r,
        snapToGrid: i,
        nodesDraggable: a,
        emits: s
    } = Ba();
    return (l, u = !1) => {
        const d = i.value ? r.value[0] : 5,
            c = i.value ? r.value[1] : 5,
            h = u ? 4 : 1,
            f = l.x * d * h,
            v = l.y * c * h,
            p = [];
        for (const n of e.value)
            if (n.draggable || a && void 0 === n.draggable) {
                const e = {
                        x: n.computedPosition.x + f,
                        y: n.computedPosition.y + v
                    },
                    {
                        computedPosition: r
                    } = ri(n, e, s.error, t.value, n.parentNode ? o(n.parentNode) : void 0);
                p.push({
                    id: n.id,
                    position: r,
                    from: n.position,
                    distance: {
                        x: l.x,
                        y: l.y
                    },
                    dimensions: n.dimensions
                })
            }
        n(p, !0, !1)
    }
}
const Zi = .1,
    Wi = e => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;

function qi() {
    return Ni(), Promise.resolve(!1)
}
const Ki = {
    zoomIn: qi,
    zoomOut: qi,
    zoomTo: qi,
    fitView: qi,
    setCenter: qi,
    fitBounds: qi,
    project: e => e,
    screenToFlowCoordinate: e => e,
    flowToScreenCoordinate: e => e,
    setViewport: qi,
    setTransform: qi,
    getViewport: () => ({
        x: 0,
        y: 0,
        zoom: 1
    }),
    getTransform: () => ({
        x: 0,
        y: 0,
        zoom: 1
    }),
    viewportInitialized: !1
};

function Ji(e, t = 0, n = Wi, o = () => {}) {
    const r = "number" == typeof t && t > 0;
    return r || o(), r ? e.transition().duration(t).ease(n).on("end", o) : e
}

function Qi(e, t, n) {
    const r = y(!0);
    return r.run(() => {
        r.run(() => {
            let t, o, r = !(!n.nodes.value.length && !n.edges.value.length);
            t = re([e.modelValue, () => {
                var t, n;
                return null == (n = null == (t = e.modelValue) ? void 0 : t.value) ? void 0 : n.length
            }], ([e]) => {
                e && Array.isArray(e) && (null == o || o.pause(), n.setElements(e), o || r || !e.length ? null == o || o.resume() : r = !0)
            }), o = re([n.nodes, n.edges, () => n.edges.value.length, () => n.nodes.value.length], ([n, o]) => {
                var r;
                (null == (r = e.modelValue) ? void 0 : r.value) && Array.isArray(e.modelValue.value) && (null == t || t.pause(), e.modelValue.value = [...n, ...o], R(() => {
                    null == t || t.resume()
                }))
            }, {
                immediate: r
            }), C(() => {
                null == t || t.stop(), null == o || o.stop()
            })
        }), r.run(() => {
            let t, o, r = !!n.nodes.value.length;
            t = re([e.nodes, () => {
                var t, n;
                return null == (n = null == (t = e.nodes) ? void 0 : t.value) ? void 0 : n.length
            }], ([e]) => {
                e && Array.isArray(e) && (null == o || o.pause(), n.setNodes(e), o || r || !e.length ? null == o || o.resume() : r = !0)
            }), o = re([n.nodes, () => n.nodes.value.length], ([n]) => {
                var o;
                (null == (o = e.nodes) ? void 0 : o.value) && Array.isArray(e.nodes.value) && (null == t || t.pause(), e.nodes.value = [...n], R(() => {
                    null == t || t.resume()
                }))
            }, {
                immediate: r
            }), C(() => {
                null == t || t.stop(), null == o || o.stop()
            })
        }), r.run(() => {
            let t, o, r = !!n.edges.value.length;
            t = re([e.edges, () => {
                var t, n;
                return null == (n = null == (t = e.edges) ? void 0 : t.value) ? void 0 : n.length
            }], ([e]) => {
                e && Array.isArray(e) && (null == o || o.pause(), n.setEdges(e), o || r || !e.length ? null == o || o.resume() : r = !0)
            }), o = re([n.edges, () => n.edges.value.length], ([n]) => {
                var o;
                (null == (o = e.edges) ? void 0 : o.value) && Array.isArray(e.edges.value) && (null == t || t.pause(), e.edges.value = [...n], R(() => {
                    null == t || t.resume()
                }))
            }, {
                immediate: r
            }), C(() => {
                null == t || t.stop(), null == o || o.stop()
            })
        }), r.run(() => {
            w(() => t.minZoom, () => {
                t.minZoom && Ii(t.minZoom) && n.setMinZoom(t.minZoom)
            }, {
                immediate: !0
            })
        }), r.run(() => {
            w(() => t.maxZoom, () => {
                t.maxZoom && Ii(t.maxZoom) && n.setMaxZoom(t.maxZoom)
            }, {
                immediate: !0
            })
        }), r.run(() => {
            w(() => t.translateExtent, () => {
                t.translateExtent && Ii(t.translateExtent) && n.setTranslateExtent(t.translateExtent)
            }, {
                immediate: !0
            })
        }), r.run(() => {
            w(() => t.nodeExtent, () => {
                t.nodeExtent && Ii(t.nodeExtent) && n.setNodeExtent(t.nodeExtent)
            }, {
                immediate: !0
            })
        }), r.run(() => {
            w(() => t.applyDefault, () => {
                Ii(t.applyDefault) && (n.applyDefault.value = t.applyDefault)
            }, {
                immediate: !0
            })
        }), r.run(() => {
            const e = async e => {
                let o = e;
                "function" == typeof t.autoConnect && (o = await t.autoConnect(e)), !1 !== o && n.addEdges([o])
            };
            w(() => t.autoConnect, () => {
                Ii(t.autoConnect) && (n.autoConnect.value = t.autoConnect)
            }, {
                immediate: !0
            }), w(n.autoConnect, (t, o, r) => {
                t ? n.onConnect(e) : n.hooks.value.connect.off(e), r(() => {
                    n.hooks.value.connect.off(e)
                })
            }, {
                immediate: !0
            })
        }), (() => {
            const e = ["id", "modelValue", "translateExtent", "nodeExtent", "edges", "nodes", "maxZoom", "minZoom", "applyDefault", "autoConnect"];
            for (const i of Object.keys(t)) {
                const a = i;
                if (!e.includes(a)) {
                    const e = o(() => t[a]),
                        i = n[a];
                    A(i) && r.run(() => {
                        w(e, e => {
                            Ii(e) && (i.value = e)
                        }, {
                            immediate: !0
                        })
                    })
                }
            }
        })()
    }), () => r.stop()
}

function ea() {
    return {
        vueFlowRef: null,
        viewportRef: null,
        nodes: [],
        edges: [],
        connectionLookup: new Map,
        nodeTypes: {},
        edgeTypes: {},
        initialized: !1,
        dimensions: {
            width: 0,
            height: 0
        },
        viewport: {
            x: 0,
            y: 0,
            zoom: 1
        },
        d3Zoom: null,
        d3Selection: null,
        d3ZoomHandler: null,
        minZoom: .5,
        maxZoom: 2,
        translateExtent: [
            [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
            [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
        ],
        nodeExtent: [
            [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
            [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
        ],
        selectionMode: nr.Full,
        paneDragging: !1,
        preventScrolling: !0,
        zoomOnScroll: !0,
        zoomOnPinch: !0,
        zoomOnDoubleClick: !0,
        panOnScroll: !1,
        panOnScrollSpeed: .5,
        panOnScrollMode: ar.Free,
        paneClickDistance: 0,
        panOnDrag: !0,
        edgeUpdaterRadius: 10,
        onlyRenderVisibleElements: !1,
        defaultViewport: {
            x: 0,
            y: 0,
            zoom: 1
        },
        nodesSelectionActive: !1,
        userSelectionActive: !1,
        userSelectionRect: null,
        defaultMarkerColor: "#b1b1b7",
        connectionLineStyle: {},
        connectionLineType: null,
        connectionLineOptions: {
            type: or.Bezier,
            style: {}
        },
        connectionMode: rr.Loose,
        connectionStartHandle: null,
        connectionEndHandle: null,
        connectionClickStartHandle: null,
        connectionPosition: {
            x: Number.NaN,
            y: Number.NaN
        },
        connectionRadius: 20,
        connectOnClick: !0,
        connectionStatus: null,
        isValidConnection: null,
        snapGrid: [15, 15],
        snapToGrid: !1,
        edgesUpdatable: !1,
        edgesFocusable: !0,
        nodesFocusable: !0,
        nodesConnectable: !0,
        nodesDraggable: !0,
        nodeDragThreshold: 1,
        elementsSelectable: !0,
        selectNodesOnDrag: !0,
        multiSelectionActive: !1,
        selectionKeyCode: "Shift",
        multiSelectionKeyCode: vi() ? "Meta" : "Control",
        zoomActivationKeyCode: vi() ? "Meta" : "Control",
        deleteKeyCode: "Backspace",
        panActivationKeyCode: "Space",
        hooks: {
            edgesChange: Qr(),
            nodesChange: Qr(),
            nodeDoubleClick: Qr(),
            nodeClick: Qr(),
            nodeMouseEnter: Qr(),
            nodeMouseMove: Qr(),
            nodeMouseLeave: Qr(),
            nodeContextMenu: Qr(),
            nodeDragStart: Qr(),
            nodeDrag: Qr(),
            nodeDragStop: Qr(),
            nodesInitialized: Qr(),
            miniMapNodeClick: Qr(),
            miniMapNodeDoubleClick: Qr(),
            miniMapNodeMouseEnter: Qr(),
            miniMapNodeMouseMove: Qr(),
            miniMapNodeMouseLeave: Qr(),
            connect: Qr(),
            connectStart: Qr(),
            connectEnd: Qr(),
            clickConnectStart: Qr(),
            clickConnectEnd: Qr(),
            paneReady: Qr(),
            init: Qr(),
            move: Qr(),
            moveStart: Qr(),
            moveEnd: Qr(),
            selectionDragStart: Qr(),
            selectionDrag: Qr(),
            selectionDragStop: Qr(),
            selectionContextMenu: Qr(),
            selectionStart: Qr(),
            selectionEnd: Qr(),
            viewportChangeStart: Qr(),
            viewportChange: Qr(),
            viewportChangeEnd: Qr(),
            paneScroll: Qr(),
            paneClick: Qr(),
            paneContextMenu: Qr(),
            paneMouseEnter: Qr(),
            paneMouseMove: Qr(),
            paneMouseLeave: Qr(),
            edgeContextMenu: Qr(),
            edgeMouseEnter: Qr(),
            edgeMouseMove: Qr(),
            edgeMouseLeave: Qr(),
            edgeDoubleClick: Qr(),
            edgeClick: Qr(),
            edgeUpdateStart: Qr(),
            edgeUpdate: Qr(),
            edgeUpdateEnd: Qr(),
            updateNodeInternals: Qr(),
            error: Qr(e => Ni(e.message))
        },
        applyDefault: !0,
        autoConnect: !1,
        fitViewOnInit: !1,
        fitViewOnInitDone: !1,
        noDragClassName: "nodrag",
        noWheelClassName: "nowheel",
        noPanClassName: "nopan",
        defaultEdgeOptions: void 0,
        elevateEdgesOnSelect: !1,
        elevateNodesOnSelect: !0,
        autoPanOnNodeDrag: !0,
        autoPanOnConnect: !0,
        autoPanSpeed: 15,
        disableKeyboardA11y: !1,
        ariaLiveMessage: ""
    }
}
const ta = ["id", "vueFlowRef", "viewportRef", "initialized", "modelValue", "nodes", "edges", "maxZoom", "minZoom", "translateExtent", "hooks", "defaultEdgeOptions"];

function na(e, t, n) {
    const o = function(e) {
            function t(t, n) {
                return new Promise(o => {
                    e.d3Selection && e.d3Zoom ? e.d3Zoom.interpolate("linear" === (null == n ? void 0 : n.interpolate) ? Bn : Xn).scaleBy(Ji(e.d3Selection, null == n ? void 0 : n.duration, null == n ? void 0 : n.ease, () => {
                        o(!0)
                    }), t) : o(!1)
                })
            }

            function n(t, n, o, r) {
                return new Promise(i => {
                    var a;
                    const {
                        x: s,
                        y: l
                    } = _r({
                        x: -t,
                        y: -n
                    }, e.translateExtent), u = Xo.translate(-s, -l).scale(o);
                    e.d3Selection && e.d3Zoom ? null == (a = e.d3Zoom) || a.interpolate("linear" === (null == r ? void 0 : r.interpolate) ? Bn : Xn).transform(Ji(e.d3Selection, null == r ? void 0 : r.duration, null == r ? void 0 : r.ease, () => {
                        i(!0)
                    }), u) : i(!1)
                })
            }
            return i(() => e.d3Zoom && e.d3Selection && e.dimensions.width && e.dimensions.height ? {
                viewportInitialized: !0,
                zoomIn: e => t(1.2, e),
                zoomOut: e => t(1 / 1.2, e),
                zoomTo: (t, n) => new Promise(o => {
                    e.d3Selection && e.d3Zoom ? e.d3Zoom.interpolate("linear" === (null == n ? void 0 : n.interpolate) ? Bn : Xn).scaleTo(Ji(e.d3Selection, null == n ? void 0 : n.duration, null == n ? void 0 : n.ease, () => {
                        o(!0)
                    }), t) : o(!1)
                }),
                setViewport: (e, t) => n(e.x, e.y, e.zoom, t),
                setTransform: (e, t) => n(e.x, e.y, e.zoom, t),
                getViewport: () => ({
                    x: e.viewport.x,
                    y: e.viewport.y,
                    zoom: e.viewport.zoom
                }),
                getTransform: () => ({
                    x: e.viewport.x,
                    y: e.viewport.y,
                    zoom: e.viewport.zoom
                }),
                fitView: (t = {
                    padding: Zi,
                    includeHiddenNodes: !1,
                    duration: 0
                }) => {
                    var o, r;
                    const i = [];
                    for (const n of e.nodes) n.dimensions.width && n.dimensions.height && ((null == t ? void 0 : t.includeHiddenNodes) || !n.hidden) && (!(null == (o = t.nodes) ? void 0 : o.length) || (null == (r = t.nodes) ? void 0 : r.length) && t.nodes.includes(n.id)) && i.push(n);
                    if (!i.length) return Promise.resolve(!1);
                    const a = $r(i),
                        {
                            x: s,
                            y: l,
                            zoom: u
                        } = Vr(a, e.dimensions.width, e.dimensions.height, t.minZoom ? ? e.minZoom, t.maxZoom ? ? e.maxZoom, t.padding ? ? Zi);
                    return n(s, l, u, t)
                },
                setCenter: (t, o, r) => {
                    const i = void 0 !== (null == r ? void 0 : r.zoom) ? r.zoom : e.maxZoom;
                    return n(e.dimensions.width / 2 - t * i, e.dimensions.height / 2 - o * i, i, r)
                },
                fitBounds: (t, o = {
                    padding: Zi
                }) => {
                    const {
                        x: r,
                        y: i,
                        zoom: a
                    } = Vr(t, e.dimensions.width, e.dimensions.height, e.minZoom, e.maxZoom, o.padding ? ? Zi);
                    return n(r, i, a, o)
                },
                project: t => Tr(t, e.viewport, e.snapToGrid, e.snapGrid),
                screenToFlowCoordinate: t => {
                    if (e.vueFlowRef) {
                        const {
                            x: n,
                            y: o
                        } = e.vueFlowRef.getBoundingClientRect();
                        return Tr({
                            x: t.x - n,
                            y: t.y - o
                        }, e.viewport, e.snapToGrid, e.snapGrid)
                    }
                    return {
                        x: 0,
                        y: 0
                    }
                },
                flowToScreenCoordinate: t => {
                    if (e.vueFlowRef) {
                        const {
                            x: n,
                            y: o
                        } = e.vueFlowRef.getBoundingClientRect();
                        return Pr({
                            x: t.x + n,
                            y: t.y + o
                        }, e.viewport)
                    }
                    return {
                        x: 0,
                        y: 0
                    }
                }
            } : Ki)
        }(e),
        r = t => {
            const n = t ? ? [];
            e.hooks.updateNodeInternals.trigger(n)
        },
        a = t => Br(t, e.edges),
        s = e => {
            if (e) return t.value.get(e)
        },
        l = e => {
            if (e) return n.value.get(e)
        },
        u = (o, r) => {
            const i = new Set,
                a = new Set;
            for (const e of o) Nr(e) ? i.add(e.id) : xr(e) && a.add(e.id);
            const s = Kr(t.value, i, !0),
                l = Kr(n.value, a);
            if (e.multiSelectionActive) {
                for (const e of i) s.push(Ur(e, r));
                for (const e of a) l.push(Ur(e, r))
            }
            s.length && e.hooks.nodesChange.trigger(s), l.length && e.hooks.edgesChange.trigger(l)
        },
        d = t => {
            var n;
            null == (n = e.d3Zoom) || n.scaleExtent([t, e.maxZoom]), e.minZoom = t
        },
        c = t => {
            var n;
            null == (n = e.d3Zoom) || n.scaleExtent([e.minZoom, t]), e.maxZoom = t
        },
        h = t => {
            var n;
            null == (n = e.d3Zoom) || n.translateExtent(t), e.translateExtent = t
        },
        f = t => {
            const n = t instanceof Function ? t(e.nodes) : t;
            (e.initialized || n.length) && (e.nodes = Oi(n, s, e.hooks.error.trigger))
        },
        v = t => {
            const o = t instanceof Function ? t(e.edges) : t;
            if (!e.initialized && !o.length) return;
            const r = Ai(o, e.isValidConnection, s, l, e.hooks.error.trigger, e.defaultEdgeOptions, e.nodes, e.edges);
            Ti(e.connectionLookup, n.value, r), e.edges = r
        },
        p = t => {
            const n = t instanceof Function ? t([...e.nodes, ...e.edges]) : t;
            (e.initialized || n.length) && (f(n.filter(Nr)), v(n.filter(xr)))
        },
        g = e => {
            const t = Sr((n = e).width) && Sr(n.height) && Sr(n.x) && Sr(n.y);
            var n;
            const o = t ? null : kr(e) ? e : s(e.id);
            if (!t && !o) return [null, null, t];
            return [t ? e : mr(o), o, t]
        },
        m = t => {
            const n = t instanceof Function ? t(e) : t,
                o = ["d3Zoom", "d3Selection", "d3ZoomHandler", "viewportRef", "vueFlowRef", "dimensions", "hooks"];
            Ii(n.defaultEdgeOptions) && (e.defaultEdgeOptions = n.defaultEdgeOptions);
            const r = n.modelValue || n.nodes || n.edges ? [] : void 0;
            r && (n.modelValue && r.push(...n.modelValue), n.nodes && r.push(...n.nodes), n.edges && r.push(...n.edges), p(r));
            for (const i of Object.keys(n)) {
                const t = i,
                    r = n[t];
                ![...ta, ...o].includes(t) && Ii(r) && (e[t] = r)
            }
            se(() => e.d3Zoom).not.toBeNull().then(() => {
                Ii(n.maxZoom) && c(n.maxZoom), Ii(n.minZoom) && d(n.minZoom), Ii(n.translateExtent) && h(n.translateExtent)
            }), e.initialized || (e.initialized = !0)
        };
    return {
        updateNodePositions: (t, n, o) => {
            var r, i;
            const a = [];
            for (const e of t) {
                const t = {
                    id: e.id,
                    type: "position",
                    dragging: o,
                    from: e.from
                };
                if (n && (t.position = e.position, e.parentNode)) {
                    const n = s(e.parentNode);
                    t.position = {
                        x: t.position.x - ((null == (r = null == n ? void 0 : n.computedPosition) ? void 0 : r.x) ? ? 0),
                        y: t.position.y - ((null == (i = null == n ? void 0 : n.computedPosition) ? void 0 : i.y) ? ? 0)
                    }
                }
                a.push(t)
            }(null == a ? void 0 : a.length) && e.hooks.nodesChange.trigger(a)
        },
        updateNodeDimensions: t => {
            if (!e.vueFlowRef) return;
            const n = e.vueFlowRef.querySelector(".vue-flow__transformationpane");
            if (!n) return;
            const r = window.getComputedStyle(n),
                {
                    m22: i
                } = new window.DOMMatrixReadOnly(r.transform),
                a = [];
            for (const e of t) {
                const t = e,
                    n = s(t.id);
                if (n) {
                    const e = wr(t.nodeElement);
                    if (!(!e.width || !e.height || n.dimensions.width === e.width && n.dimensions.height === e.height && !t.forceUpdate)) {
                        const o = t.nodeElement.getBoundingClientRect();
                        n.dimensions = e, n.handleBounds.source = Si("source", t.nodeElement, o, i, n.id), n.handleBounds.target = Si("target", t.nodeElement, o, i, n.id), a.push({
                            id: n.id,
                            type: "dimensions",
                            dimensions: e
                        })
                    }
                }
            }!e.fitViewOnInitDone && e.fitViewOnInit && o.value.fitView().then(() => {
                e.fitViewOnInitDone = !0
            }), a.length && e.hooks.nodesChange.trigger(a)
        },
        setElements: p,
        setNodes: f,
        setEdges: v,
        addNodes: t => {
            let n = t instanceof Function ? t(e.nodes) : t;
            n = Array.isArray(n) ? n : [n];
            const o = Oi(n, s, e.hooks.error.trigger),
                r = [];
            for (const e of o) r.push(Zr(e));
            r.length && e.hooks.nodesChange.trigger(r)
        },
        addEdges: t => {
            let n = t instanceof Function ? t(e.edges) : t;
            n = Array.isArray(n) ? n : [n];
            const o = Ai(n, e.isValidConnection, s, l, e.hooks.error.trigger, e.defaultEdgeOptions, e.nodes, e.edges),
                r = [];
            for (const e of o) r.push(Zr(e));
            r.length && e.hooks.edgesChange.trigger(r)
        },
        removeNodes: (t, n = !0, o = !1) => {
            const r = t instanceof Function ? t(e.nodes) : t,
                i = Array.isArray(r) ? r : [r],
                l = [],
                u = [];

            function d(e) {
                const t = a(e);
                for (const n of t) Ii(n.deletable) && !n.deletable || u.push(qr(n.id, n.source, n.target, n.sourceHandle, n.targetHandle))
            }

            function c(t) {
                const o = [];
                for (const n of e.nodes) n.parentNode === t && o.push(n);
                if (o.length) {
                    for (const e of o) l.push(Wr(e.id));
                    n && d(o);
                    for (const e of o) c(e.id)
                }
            }
            for (const e of i) {
                const t = "string" == typeof e ? s(e) : e;
                t && (Ii(t.deletable) && !t.deletable || (l.push(Wr(t.id)), n && d([t]), o && c(t.id)))
            }
            u.length && e.hooks.edgesChange.trigger(u), l.length && e.hooks.nodesChange.trigger(l)
        },
        removeEdges: t => {
            const n = t instanceof Function ? t(e.edges) : t,
                o = Array.isArray(n) ? n : [n],
                r = [];
            for (const e of o) {
                const t = "string" == typeof e ? l(e) : e;
                t && (Ii(t.deletable) && !t.deletable || r.push(qr("string" == typeof e ? e : e.id, t.source, t.target, t.sourceHandle, t.targetHandle)))
            }
            e.hooks.edgesChange.trigger(r)
        },
        findNode: s,
        findEdge: l,
        updateEdge: (t, o, r = !0) => {
            const i = l(t.id);
            if (!i) return !1;
            const a = e.edges.indexOf(i),
                u = function(e, t, n, o, r) {
                    if (!t.source || !t.target) return r(new ci(ui.EDGE_INVALID, e.id)), !1;
                    if (!n) return r(new ci(ui.EDGE_NOT_FOUND, e.id)), !1;
                    const {
                        id: i,
                        ...a
                    } = e;
                    return { ...a,
                        id: o ? Or(t) : i,
                        source: t.source,
                        target: t.target,
                        sourceHandle: t.sourceHandle,
                        targetHandle: t.targetHandle
                    }
                }(t, o, i, r, e.hooks.error.trigger);
            if (u) {
                const [t] = Ai([u], e.isValidConnection, s, l, e.hooks.error.trigger, e.defaultEdgeOptions, e.nodes, e.edges);
                return e.edges = e.edges.map((e, n) => n === a ? t : e), Ti(e.connectionLookup, n.value, [t]), t
            }
            return !1
        },
        updateEdgeData: (e, t, n = {
            replace: !1
        }) => {
            const o = l(e);
            if (!o) return;
            const r = "function" == typeof t ? t(o) : t;
            o.data = n.replace ? r : { ...o.data,
                ...r
            }
        },
        updateNode: (t, n, o = {
            replace: !1
        }) => {
            const r = s(t);
            if (!r) return;
            const i = "function" == typeof n ? n(r) : n;
            o.replace ? e.nodes.splice(e.nodes.indexOf(r), 1, i) : Object.assign(r, i)
        },
        updateNodeData: (e, t, n = {
            replace: !1
        }) => {
            const o = s(e);
            if (!o) return;
            const r = "function" == typeof t ? t(o) : t;
            o.data = n.replace ? r : { ...o.data,
                ...r
            }
        },
        applyEdgeChanges: t => {
            const o = Xr(t, e.edges);
            return Ti(e.connectionLookup, n.value, o), o
        },
        applyNodeChanges: t => Xr(t, e.nodes),
        addSelectedElements: e => {
            u(e, !0)
        },
        addSelectedNodes: o => {
            if (e.multiSelectionActive) {
                const t = o.map(e => Ur(e.id, !0));
                return void e.hooks.nodesChange.trigger(t)
            }
            e.hooks.nodesChange.trigger(Kr(t.value, new Set(o.map(e => e.id)), !0)), e.hooks.edgesChange.trigger(Kr(n.value))
        },
        addSelectedEdges: o => {
            if (e.multiSelectionActive) {
                const t = o.map(e => Ur(e.id, !0));
                return void e.hooks.edgesChange.trigger(t)
            }
            e.hooks.edgesChange.trigger(Kr(n.value, new Set(o.map(e => e.id)))), e.hooks.nodesChange.trigger(Kr(t.value, new Set, !0))
        },
        setMinZoom: d,
        setMaxZoom: c,
        setTranslateExtent: h,
        setNodeExtent: t => {
            e.nodeExtent = t, r()
        },
        setPaneClickDistance: t => {
            var n;
            null == (n = e.d3Zoom) || n.clickDistance(t)
        },
        removeSelectedElements: t => {
            if (!t || !t.length) return u([], !1);
            const n = t.reduce((e, t) => {
                const n = Ur(t.id, !1);
                return Nr(t) ? e.nodes.push(n) : e.edges.push(n), e
            }, {
                nodes: [],
                edges: []
            });
            n.nodes.length && e.hooks.nodesChange.trigger(n.nodes), n.edges.length && e.hooks.edgesChange.trigger(n.edges)
        },
        removeSelectedNodes: t => {
            const n = (t || e.nodes).map(e => (e.selected = !1, Ur(e.id, !1)));
            e.hooks.nodesChange.trigger(n)
        },
        removeSelectedEdges: t => {
            const n = (t || e.edges).map(e => (e.selected = !1, Ur(e.id, !1)));
            e.hooks.edgesChange.trigger(n)
        },
        startConnection: (t, n, o = !1) => {
            o ? e.connectionClickStartHandle = t : e.connectionStartHandle = t, e.connectionEndHandle = null, e.connectionStatus = null, n && (e.connectionPosition = n)
        },
        updateConnection: (t, n = null, o = null) => {
            e.connectionStartHandle && (e.connectionPosition = t, e.connectionEndHandle = n, e.connectionStatus = o)
        },
        endConnection: (t, n) => {
            e.connectionPosition = {
                x: Number.NaN,
                y: Number.NaN
            }, e.connectionEndHandle = null, e.connectionStatus = null, n ? e.connectionClickStartHandle = null : e.connectionStartHandle = null
        },
        setInteractive: t => {
            e.nodesDraggable = t, e.nodesConnectable = t, e.elementsSelectable = t
        },
        setState: m,
        getIntersectingNodes: (t, n = !0, o = e.nodes) => {
            const [r, i, a] = g(t);
            if (!r) return [];
            const s = [];
            for (const l of o || e.nodes) {
                if (!(a || l.id !== i.id && l.computedPosition)) continue;
                const e = mr(l),
                    t = yr(e, r);
                (n && t > 0 || t >= e.width * e.height || t >= Number(r.width) * Number(r.height)) && s.push(l)
            }
            return s
        },
        getIncomers: t => function(...e) {
            if (3 === e.length) {
                const [t, n, o] = e;
                return Cr(t, n, o, "source")
            }
            const [t, n] = e, o = "string" == typeof t ? t : t.id;
            return n.filter(e => xr(e) && e.target === o).map(e => n.find(t => Nr(t) && t.id === e.source))
        }(t, e.nodes, e.edges),
        getOutgoers: t => function(...e) {
            if (3 === e.length) {
                const [t, n, o] = e;
                return Cr(t, n, o, "target")
            }
            const [t, n] = e, o = "string" == typeof t ? t : t.id;
            return n.filter(e => xr(e) && e.source === o).map(e => n.find(t => Nr(t) && t.id === e.target))
        }(t, e.nodes, e.edges),
        getConnectedEdges: a,
        getHandleConnections: ({
            id: t,
            type: n,
            nodeId: o
        }) => {
            var r;
            const i = t ? `-${n}-${t}` : `-${n}`;
            return Array.from((null == (r = e.connectionLookup.get(`${o}${i}`)) ? void 0 : r.values()) ? ? [])
        },
        isNodeIntersecting: (e, t, n = !0) => {
            const [o] = g(e);
            if (!o) return !1;
            const r = yr(o, t);
            return n && r > 0 || r >= Number(o.width) * Number(o.height)
        },
        panBy: t => {
            const {
                viewport: n,
                dimensions: o,
                d3Zoom: r,
                d3Selection: i,
                translateExtent: a
            } = e;
            if (!r || !i || !t.x && !t.y) return !1;
            const s = Xo.translate(n.x + t.x, n.y + t.y).scale(n.zoom),
                l = [
                    [0, 0],
                    [o.width, o.height]
                ],
                u = r.constrain()(s, l, a),
                d = e.viewport.x !== u.x || e.viewport.y !== u.y || e.viewport.zoom !== u.k;
            return r.transform(i, u), d
        },
        fitView: e => o.value.fitView(e),
        zoomIn: e => o.value.zoomIn(e),
        zoomOut: e => o.value.zoomOut(e),
        zoomTo: (e, t) => o.value.zoomTo(e, t),
        setViewport: (e, t) => o.value.setViewport(e, t),
        setTransform: (e, t) => o.value.setTransform(e, t),
        getViewport: () => o.value.getViewport(),
        getTransform: () => o.value.getTransform(),
        setCenter: (e, t, n) => o.value.setCenter(e, t, n),
        fitBounds: (e, t) => o.value.fitBounds(e, t),
        project: e => o.value.project(e),
        screenToFlowCoordinate: e => o.value.screenToFlowCoordinate(e),
        flowToScreenCoordinate: e => o.value.flowToScreenCoordinate(e),
        toObject: () => {
            const t = [],
                n = [];
            for (const o of e.nodes) {
                const {
                    computedPosition: e,
                    handleBounds: n,
                    selected: r,
                    dimensions: i,
                    isParent: a,
                    resizing: s,
                    dragging: l,
                    events: u,
                    ...d
                } = o;
                t.push(d)
            }
            for (const o of e.edges) {
                const {
                    selected: e,
                    sourceNode: t,
                    targetNode: r,
                    events: i,
                    ...a
                } = o;
                n.push(a)
            }
            return JSON.parse(JSON.stringify({
                nodes: t,
                edges: n,
                position: [e.viewport.x, e.viewport.y],
                zoom: e.viewport.zoom,
                viewport: e.viewport
            }))
        },
        fromObject: t => new Promise(n => {
            const {
                nodes: r,
                edges: i,
                position: a,
                zoom: s,
                viewport: l
            } = t;
            if (r && f(r), i && v(i), (null == l ? void 0 : l.x) && (null == l ? void 0 : l.y) || a) {
                const t = (null == l ? void 0 : l.x) || a[0],
                    r = (null == l ? void 0 : l.y) || a[1],
                    i = (null == l ? void 0 : l.zoom) || s || e.viewport.zoom;
                return se(() => o.value.viewportInitialized).toBe(!0).then(() => {
                    o.value.setViewport({
                        x: t,
                        y: r,
                        zoom: i
                    }).then(() => {
                        n(!0)
                    })
                })
            }
            n(!0)
        }),
        updateNodeInternals: r,
        viewportHelper: o,
        $reset: () => {
            const t = ea();
            if (e.edges = [], e.nodes = [], e.d3Zoom && e.d3Selection) {
                const n = Xo.translate(t.defaultViewport.x ? ? 0, t.defaultViewport.y ? ? 0).scale(br(t.defaultViewport.zoom ? ? 1, t.minZoom, t.maxZoom)),
                    o = e.viewportRef.getBoundingClientRect(),
                    r = [
                        [0, 0],
                        [o.width, o.height]
                    ],
                    i = e.d3Zoom.constrain()(n, r, t.translateExtent);
                e.d3Zoom.transform(e.d3Selection, i)
            }
            m(t)
        },
        $destroy: () => {}
    }
}
const oa = ["data-id", "data-handleid", "data-nodeid", "data-handlepos"],
    ra = n({
        name: "Handle",
        compatConfig: {
            MODE: 3
        },
        props: {
            id: {
                default: null
            },
            type: {},
            position: {
                default: () => tr.Top
            },
            isValidConnection: {
                type: Function
            },
            connectable: {
                type: [Boolean, Number, String, Function],
                default: void 0
            },
            connectableStart: {
                type: Boolean,
                default: !0
            },
            connectableEnd: {
                type: Boolean,
                default: !0
            }
        },
        setup(e, {
            expose: t
        }) {
            const n = c(e, ["position", "connectable", "connectableStart", "connectableEnd", "id"]),
                h = o(() => n.type ? ? "source"),
                f = o(() => n.isValidConnection ? ? null),
                {
                    id: v,
                    connectionStartHandle: p,
                    connectionClickStartHandle: g,
                    connectionEndHandle: m,
                    vueFlowRef: y,
                    nodesConnectable: w,
                    noDragClassName: b,
                    noPanClassName: _
                } = Ba(),
                {
                    id: E,
                    node: x,
                    nodeEl: N,
                    connectedEdges: k
                } = Yi(),
                S = r(),
                M = o(() => void 0 === e.connectableStart || e.connectableStart),
                I = o(() => void 0 === e.connectableEnd || e.connectableEnd),
                C = o(() => {
                    var t, n, o, r, i, a;
                    return (null == (t = p.value) ? void 0 : t.nodeId) === E && (null == (n = p.value) ? void 0 : n.id) === e.id && (null == (o = p.value) ? void 0 : o.type) === h.value || (null == (r = m.value) ? void 0 : r.nodeId) === E && (null == (i = m.value) ? void 0 : i.id) === e.id && (null == (a = m.value) ? void 0 : a.type) === h.value
                }),
                O = o(() => {
                    var t, n, o;
                    return (null == (t = g.value) ? void 0 : t.nodeId) === E && (null == (n = g.value) ? void 0 : n.id) === e.id && (null == (o = g.value) ? void 0 : o.type) === h.value
                }),
                {
                    handlePointerDown: P,
                    handleClick: D
                } = Fi({
                    nodeId: E,
                    handleId: e.id,
                    isValidConnection: f,
                    type: h
                }),
                A = i(() => "string" == typeof e.connectable && "single" === e.connectable ? !k.value.some(t => {
                    const n = t[`${h.value}Handle`];
                    return t[h.value] === E && (!n || n === e.id)
                }) : "number" == typeof e.connectable ? k.value.filter(t => {
                    const n = t[`${h.value}Handle`];
                    return t[h.value] === E && (!n || n === e.id)
                }).length < e.connectable : "function" == typeof e.connectable ? e.connectable(x, k.value) : Ii(e.connectable) ? e.connectable : w.value);

            function $(e) {
                const t = hi(e);
                A.value && M.value && (t && 0 === e.button || !t) && P(e)
            }

            function z(e) {
                E && (g.value || M.value) && A.value && D(e)
            }
            return a(() => {
                var t;
                if (!x.dimensions.width || !x.dimensions.height) return;
                const n = null == (t = x.handleBounds[h.value]) ? void 0 : t.find(t => t.id === e.id);
                if (!y.value || n) return;
                const o = y.value.querySelector(".vue-flow__transformationpane");
                if (!(N.value && S.value && o && e.id)) return;
                const r = N.value.getBoundingClientRect(),
                    i = S.value.getBoundingClientRect(),
                    a = window.getComputedStyle(o),
                    {
                        m22: s
                    } = new window.DOMMatrixReadOnly(a.transform),
                    l = {
                        id: e.id,
                        position: e.position,
                        x: (i.left - r.left) / s,
                        y: (i.top - r.top) / s,
                        type: h.value,
                        nodeId: E,
                        ...wr(S.value)
                    };
                x.handleBounds[h.value] = [...x.handleBounds[h.value] ? ? [], l]
            }), t({
                handleClick: D,
                handlePointerDown: P,
                onClick: z,
                onPointerDown: $
            }), (t, n) => (T(), s("div", {
                ref_key: "handle",
                ref: S,
                "data-id": `${d(v)}-${d(E)}-${e.id}-${h.value}`,
                "data-handleid": e.id,
                "data-nodeid": d(E),
                "data-handlepos": t.position,
                class: u(["vue-flow__handle", [`vue-flow__handle-${t.position}`, `vue-flow__handle-${e.id}`, d(b), d(_), h.value, {
                    connectable: A.value,
                    connecting: O.value,
                    connectablestart: M.value,
                    connectableend: I.value,
                    connectionindicator: A.value && (M.value && !C.value || I.value && C.value)
                }]]),
                onMousedown: $,
                onTouchstartPassive: $,
                onClick: z
            }, [l(t.$slots, "default", {
                id: t.id
            })], 42, oa))
        }
    }),
    ia = function({
        sourcePosition: e = tr.Bottom,
        targetPosition: t = tr.Top,
        label: n,
        connectable: o = !0,
        isValidTargetPos: r,
        isValidSourcePos: i,
        data: a
    }) {
        const s = a.label ? ? n;
        return [B(ra, {
            type: "target",
            position: t,
            connectable: o,
            isValidConnection: r
        }), "string" != typeof s && s ? B(s) : B(M, [s]), B(ra, {
            type: "source",
            position: e,
            connectable: o,
            isValidConnection: i
        })]
    };
ia.props = ["sourcePosition", "targetPosition", "label", "isValidTargetPos", "isValidSourcePos", "connectable", "data"], ia.inheritAttrs = !1, ia.compatConfig = {
    MODE: 3
};
const aa = ia,
    sa = function({
        targetPosition: e = tr.Top,
        label: t,
        connectable: n = !0,
        isValidTargetPos: o,
        data: r
    }) {
        const i = r.label ? ? t;
        return [B(ra, {
            type: "target",
            position: e,
            connectable: n,
            isValidConnection: o
        }), "string" != typeof i && i ? B(i) : B(M, [i])]
    };
sa.props = ["targetPosition", "label", "isValidTargetPos", "connectable", "data"], sa.inheritAttrs = !1, sa.compatConfig = {
    MODE: 3
};
const la = sa,
    ua = function({
        sourcePosition: e = tr.Bottom,
        label: t,
        connectable: n = !0,
        isValidSourcePos: o,
        data: r
    }) {
        const i = r.label ? ? t;
        return ["string" != typeof i && i ? B(i) : B(M, [i]), B(ra, {
            type: "source",
            position: e,
            connectable: n,
            isValidConnection: o
        })]
    };
ua.props = ["sourcePosition", "label", "isValidSourcePos", "connectable", "data"], ua.inheritAttrs = !1, ua.compatConfig = {
    MODE: 3
};
const da = ua,
    ca = ["transform"],
    ha = ["width", "height", "x", "y", "rx", "ry"],
    fa = ["y"],
    va = n({
        name: "EdgeText",
        compatConfig: {
            MODE: 3
        },
        props: {
            x: {},
            y: {},
            label: {},
            labelStyle: {
                default: () => ({})
            },
            labelShowBg: {
                type: Boolean,
                default: !0
            },
            labelBgStyle: {
                default: () => ({})
            },
            labelBgPadding: {
                default: () => [2, 4]
            },
            labelBgBorderRadius: {
                default: 2
            }
        },
        setup(e) {
            const t = r({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }),
                n = r(null),
                o = i(() => `translate(${e.x-t.value.width/2} ${e.y-t.value.height/2})`);

            function u() {
                if (!n.value) return;
                const e = n.value.getBBox();
                e.width === t.value.width && e.height === t.value.height || (t.value = e)
            }
            return a(u), w([() => e.x, () => e.y, n, () => e.label], u), (e, r) => (T(), s("g", {
                transform: o.value,
                class: "vue-flow__edge-textwrapper"
            }, [e.labelShowBg ? (T(), s("rect", {
                key: 0,
                class: "vue-flow__edge-textbg",
                width: `${t.value.width+2*e.labelBgPadding[0]}px`,
                height: `${t.value.height+2*e.labelBgPadding[1]}px`,
                x: -e.labelBgPadding[0],
                y: -e.labelBgPadding[1],
                style: b(e.labelBgStyle),
                rx: e.labelBgBorderRadius,
                ry: e.labelBgBorderRadius
            }, null, 12, ha)) : k("", !0), N("text", V(e.$attrs, {
                ref_key: "el",
                ref: n,
                class: "vue-flow__edge-text",
                y: t.value.height / 2,
                dy: "0.3em",
                style: e.labelStyle
            }), [l(e.$slots, "default", {}, () => ["string" != typeof e.label ? (T(), D(G(e.label), {
                key: 0
            })) : (T(), s(M, {
                key: 1
            }, [H(S(e.label), 1)], 64))])], 16, fa)], 8, ca))
        }
    }),
    pa = ["id", "d", "marker-end", "marker-start"],
    ga = ["d", "stroke-width"],
    ma = n({
        name: "BaseEdge",
        inheritAttrs: !1,
        compatConfig: {
            MODE: 3
        },
        props: {
            id: {},
            labelX: {},
            labelY: {},
            path: {},
            label: {},
            markerStart: {},
            markerEnd: {},
            interactionWidth: {
                default: 20
            },
            labelStyle: {},
            labelShowBg: {
                type: Boolean
            },
            labelBgStyle: {},
            labelBgPadding: {},
            labelBgBorderRadius: {}
        },
        setup(e, {
            expose: t
        }) {
            const n = r(null),
                o = r(null),
                i = r(null),
                a = L();
            return t({
                pathEl: n,
                interactionEl: o,
                labelEl: i
            }), (e, t) => (T(), s(M, null, [N("path", V(d(a), {
                id: e.id,
                ref_key: "pathEl",
                ref: n,
                d: e.path,
                class: "vue-flow__edge-path",
                "marker-end": e.markerEnd,
                "marker-start": e.markerStart
            }), null, 16, pa), e.interactionWidth ? (T(), s("path", {
                key: 0,
                ref_key: "interactionEl",
                ref: o,
                fill: "none",
                d: e.path,
                "stroke-width": e.interactionWidth,
                "stroke-opacity": 0,
                class: "vue-flow__edge-interaction"
            }, null, 8, ga)) : k("", !0), e.label && e.labelX && e.labelY ? (T(), D(va, {
                key: 1,
                ref_key: "labelEl",
                ref: i,
                x: e.labelX,
                y: e.labelY,
                label: e.label,
                "label-show-bg": e.labelShowBg,
                "label-bg-style": e.labelBgStyle,
                "label-bg-padding": e.labelBgPadding,
                "label-bg-border-radius": e.labelBgBorderRadius,
                "label-style": e.labelStyle
            }, null, 8, ["x", "y", "label", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius", "label-style"])) : k("", !0)], 64))
        }
    });

function ya({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o
}) {
    const r = Math.abs(n - e) / 2,
        i = n < e ? n + r : n - r,
        a = Math.abs(o - t) / 2;
    return [i, o < t ? o + a : o - a, r, a]
}

function wa({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o,
    sourceControlX: r,
    sourceControlY: i,
    targetControlX: a,
    targetControlY: s
}) {
    const l = .125 * e + .375 * r + .375 * a + .125 * n,
        u = .125 * t + .375 * i + .375 * s + .125 * o;
    return [l, u, Math.abs(l - e), Math.abs(u - t)]
}

function ba(e, t) {
    return e >= 0 ? .5 * e : 25 * t * Math.sqrt(-e)
}

function _a({
    pos: e,
    x1: t,
    y1: n,
    x2: o,
    y2: r,
    c: i
}) {
    let a, s;
    switch (e) {
        case tr.Left:
            a = t - ba(t - o, i), s = n;
            break;
        case tr.Right:
            a = t + ba(o - t, i), s = n;
            break;
        case tr.Top:
            a = t, s = n - ba(n - r, i);
            break;
        case tr.Bottom:
            a = t, s = n + ba(r - n, i)
    }
    return [a, s]
}

function Ea(e) {
    const {
        sourceX: t,
        sourceY: n,
        sourcePosition: o = tr.Bottom,
        targetX: r,
        targetY: i,
        targetPosition: a = tr.Top,
        curvature: s = .25
    } = e, [l, u] = _a({
        pos: o,
        x1: t,
        y1: n,
        x2: r,
        y2: i,
        c: s
    }), [d, c] = _a({
        pos: a,
        x1: r,
        y1: i,
        x2: t,
        y2: n,
        c: s
    }), [h, f, v, p] = wa({
        sourceX: t,
        sourceY: n,
        targetX: r,
        targetY: i,
        sourceControlX: l,
        sourceControlY: u,
        targetControlX: d,
        targetControlY: c
    });
    return [`M${t},${n} C${l},${u} ${d},${c} ${r},${i}`, h, f, v, p]
}

function xa({
    pos: e,
    x1: t,
    y1: n,
    x2: o,
    y2: r
}) {
    let i, a;
    switch (e) {
        case tr.Left:
        case tr.Right:
            i = .5 * (t + o), a = n;
            break;
        case tr.Top:
        case tr.Bottom:
            i = t, a = .5 * (n + r)
    }
    return [i, a]
}

function Na(e) {
    const {
        sourceX: t,
        sourceY: n,
        sourcePosition: o = tr.Bottom,
        targetX: r,
        targetY: i,
        targetPosition: a = tr.Top
    } = e, [s, l] = xa({
        pos: o,
        x1: t,
        y1: n,
        x2: r,
        y2: i
    }), [u, d] = xa({
        pos: a,
        x1: r,
        y1: i,
        x2: t,
        y2: n
    }), [c, h, f, v] = wa({
        sourceX: t,
        sourceY: n,
        targetX: r,
        targetY: i,
        sourceControlX: s,
        sourceControlY: l,
        targetControlX: u,
        targetControlY: d
    });
    return [`M${t},${n} C${s},${l} ${u},${d} ${r},${i}`, c, h, f, v]
}
const ka = {
    [tr.Left]: {
        x: -1,
        y: 0
    },
    [tr.Right]: {
        x: 1,
        y: 0
    },
    [tr.Top]: {
        x: 0,
        y: -1
    },
    [tr.Bottom]: {
        x: 0,
        y: 1
    }
};

function Sa(e, t) {
    return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2)
}

function Ma({
    source: e,
    sourcePosition: t = tr.Bottom,
    target: n,
    targetPosition: o = tr.Top,
    center: r,
    offset: i
}) {
    const a = ka[t],
        s = ka[o],
        l = {
            x: e.x + a.x * i,
            y: e.y + a.y * i
        },
        u = {
            x: n.x + s.x * i,
            y: n.y + s.y * i
        },
        d = function({
            source: e,
            sourcePosition: t = tr.Bottom,
            target: n
        }) {
            return t === tr.Left || t === tr.Right ? e.x < n.x ? {
                x: 1,
                y: 0
            } : {
                x: -1,
                y: 0
            } : e.y < n.y ? {
                x: 0,
                y: 1
            } : {
                x: 0,
                y: -1
            }
        }({
            source: l,
            sourcePosition: t,
            target: u
        }),
        c = 0 !== d.x ? "x" : "y",
        h = d[c];
    let f, v, p;
    const g = {
            x: 0,
            y: 0
        },
        m = {
            x: 0,
            y: 0
        },
        [y, w, b, _] = ya({
            sourceX: e.x,
            sourceY: e.y,
            targetX: n.x,
            targetY: n.y
        });
    if (a[c] * s[c] === -1) {
        v = r.x ? ? y, p = r.y ? ? w;
        const e = [{
                x: v,
                y: l.y
            }, {
                x: v,
                y: u.y
            }],
            t = [{
                x: l.x,
                y: p
            }, {
                x: u.x,
                y: p
            }];
        f = a[c] === h ? "x" === c ? e : t : "x" === c ? t : e
    } else {
        const r = [{
                x: l.x,
                y: u.y
            }],
            d = [{
                x: u.x,
                y: l.y
            }];
        if (f = "x" === c ? a.x === h ? d : r : a.y === h ? r : d, t === o) {
            const t = Math.abs(e[c] - n[c]);
            if (t <= i) {
                const o = Math.min(i - 1, i - t);
                a[c] === h ? g[c] = (l[c] > e[c] ? -1 : 1) * o : m[c] = (u[c] > n[c] ? -1 : 1) * o
            }
        }
        if (t !== o) {
            const e = "x" === c ? "y" : "x",
                t = a[c] === s[e],
                n = l[e] > u[e],
                o = l[e] < u[e];
            (1 === a[c] && (!t && n || t && o) || 1 !== a[c] && (!t && o || t && n)) && (f = "x" === c ? r : d)
        }
        const y = {
                x: l.x + g.x,
                y: l.y + g.y
            },
            w = {
                x: u.x + m.x,
                y: u.y + m.y
            };
        Math.max(Math.abs(y.x - f[0].x), Math.abs(w.x - f[0].x)) >= Math.max(Math.abs(y.y - f[0].y), Math.abs(w.y - f[0].y)) ? (v = (y.x + w.x) / 2, p = f[0].y) : (v = f[0].x, p = (y.y + w.y) / 2)
    }
    return [
        [e, {
            x: l.x + g.x,
            y: l.y + g.y
        }, ...f, {
            x: u.x + m.x,
            y: u.y + m.y
        }, n], v, p, b, _
    ]
}

function Ia(e) {
    const {
        sourceX: t,
        sourceY: n,
        sourcePosition: o = tr.Bottom,
        targetX: r,
        targetY: i,
        targetPosition: a = tr.Top,
        borderRadius: s = 5,
        centerX: l,
        centerY: u,
        offset: d = 20
    } = e, [c, h, f, v, p] = Ma({
        source: {
            x: t,
            y: n
        },
        sourcePosition: o,
        target: {
            x: r,
            y: i
        },
        targetPosition: a,
        center: {
            x: l,
            y: u
        },
        offset: d
    });
    return [c.reduce((e, t, n) => {
        let o;
        return o = n > 0 && n < c.length - 1 ? function(e, t, n, o) {
            const r = Math.min(Sa(e, t) / 2, Sa(t, n) / 2, o),
                {
                    x: i,
                    y: a
                } = t;
            if (e.x === i && i === n.x || e.y === a && a === n.y) return `L${i} ${a}`;
            if (e.y === a) return `L ${i+r*(e.x<n.x?-1:1)},${a}Q ${i},${a} ${i},${a+r*(e.y<n.y?1:-1)}`;
            const s = e.x < n.x ? 1 : -1;
            return `L ${i},${a+r*(e.y<n.y?-1:1)}Q ${i},${a} ${i+r*s},${a}`
        }(c[n - 1], t, c[n + 1], s) : `${0===n?"M":"L"}${t.x} ${t.y}`, e += o
    }, ""), h, f, v, p]
}
const Ca = n({
        name: "StraightEdge",
        props: ["label", "labelStyle", "labelShowBg", "labelBgStyle", "labelBgPadding", "labelBgBorderRadius", "sourceY", "sourceX", "targetX", "targetY", "markerEnd", "markerStart", "interactionWidth"],
        compatConfig: {
            MODE: 3
        },
        setup: (e, {
            attrs: t
        }) => () => {
            const [n, o, r] = function(e) {
                const {
                    sourceX: t,
                    sourceY: n,
                    targetX: o,
                    targetY: r
                } = e, [i, a, s, l] = ya({
                    sourceX: t,
                    sourceY: n,
                    targetX: o,
                    targetY: r
                });
                return [`M ${t},${n}L ${o},${r}`, i, a, s, l]
            }(e);
            return B(ma, {
                path: n,
                labelX: o,
                labelY: r,
                ...t,
                ...e
            })
        }
    }),
    Oa = n({
        name: "SmoothStepEdge",
        props: ["sourcePosition", "targetPosition", "label", "labelStyle", "labelShowBg", "labelBgStyle", "labelBgPadding", "labelBgBorderRadius", "sourceY", "sourceX", "targetX", "targetY", "borderRadius", "markerEnd", "markerStart", "interactionWidth", "offset"],
        compatConfig: {
            MODE: 3
        },
        setup: (e, {
            attrs: t
        }) => () => {
            const [n, o, r] = Ia({ ...e,
                sourcePosition: e.sourcePosition ? ? tr.Bottom,
                targetPosition: e.targetPosition ? ? tr.Top
            });
            return B(ma, {
                path: n,
                labelX: o,
                labelY: r,
                ...t,
                ...e
            })
        }
    }),
    Pa = n({
        name: "StepEdge",
        props: ["sourcePosition", "targetPosition", "label", "labelStyle", "labelShowBg", "labelBgStyle", "labelBgPadding", "labelBgBorderRadius", "sourceY", "sourceX", "targetX", "targetY", "markerEnd", "markerStart", "interactionWidth"],
        setup: (e, {
            attrs: t
        }) => () => B(Oa, { ...e,
            ...t,
            borderRadius: 0
        })
    }),
    Ta = n({
        name: "BezierEdge",
        props: ["sourcePosition", "targetPosition", "label", "labelStyle", "labelShowBg", "labelBgStyle", "labelBgPadding", "labelBgBorderRadius", "sourceY", "sourceX", "targetX", "targetY", "curvature", "markerEnd", "markerStart", "interactionWidth"],
        compatConfig: {
            MODE: 3
        },
        setup: (e, {
            attrs: t
        }) => () => {
            const [n, o, r] = Ea({ ...e,
                sourcePosition: e.sourcePosition ? ? tr.Bottom,
                targetPosition: e.targetPosition ? ? tr.Top
            });
            return B(ma, {
                path: n,
                labelX: o,
                labelY: r,
                ...t,
                ...e
            })
        }
    }),
    Da = n({
        name: "SimpleBezierEdge",
        props: ["sourcePosition", "targetPosition", "label", "labelStyle", "labelShowBg", "labelBgStyle", "labelBgPadding", "labelBgBorderRadius", "sourceY", "sourceX", "targetX", "targetY", "markerEnd", "markerStart", "interactionWidth"],
        compatConfig: {
            MODE: 3
        },
        setup: (e, {
            attrs: t
        }) => () => {
            const [n, o, r] = Na({ ...e,
                sourcePosition: e.sourcePosition ? ? tr.Bottom,
                targetPosition: e.targetPosition ? ? tr.Top
            });
            return B(ma, {
                path: n,
                labelX: o,
                labelY: r,
                ...t,
                ...e
            })
        }
    }),
    Aa = {
        input: da,
        default: aa,
        output: la
    },
    $a = {
        default: Ta,
        straight: Ca,
        step: Pa,
        smoothstep: Oa,
        simplebezier: Da
    };
class za {
    constructor() {
        this.currentId = 0, this.flows = new Map
    }
    static getInstance() {
        var e;
        const t = null == (e = _()) ? void 0 : e.appContext.app,
            n = (null == t ? void 0 : t.config.globalProperties.$vueFlowStorage) ? ? za.instance;
        return za.instance = n ? ? new za, t && (t.config.globalProperties.$vueFlowStorage = za.instance), za.instance
    }
    set(e, t) {
        return this.flows.set(e, t)
    }
    get(e) {
        return this.flows.get(e)
    }
    remove(e) {
        return this.flows.delete(e)
    }
    create(e, t) {
        const n = ea(),
            o = I(n),
            r = {};
        for (const [i, h] of Object.entries(o.hooks)) {
            r[`on${i.charAt(0).toUpperCase()+i.slice(1)}`] = h.on
        }
        const a = {};
        for (const [i, h] of Object.entries(o.hooks)) a[i] = h.trigger;
        const s = i(() => {
                const e = new Map;
                for (const t of o.nodes) e.set(t.id, t);
                return e
            }),
            l = i(() => {
                const e = new Map;
                for (const t of o.edges) e.set(t.id, t);
                return e
            }),
            u = function(e, t, n) {
                const o = i(() => e => t.value.get(e)),
                    r = i(() => e => n.value.get(e)),
                    a = i(() => {
                        const t = { ...$a,
                                ...e.edgeTypes
                            },
                            n = Object.keys(t);
                        for (const o of e.edges) o.type && !n.includes(o.type) && (t[o.type] = o.type);
                        return t
                    }),
                    s = i(() => {
                        const t = { ...Aa,
                                ...e.nodeTypes
                            },
                            n = Object.keys(t);
                        for (const o of e.nodes) o.type && !n.includes(o.type) && (t[o.type] = o.type);
                        return t
                    }),
                    l = i(() => e.onlyRenderVisibleElements ? zr(e.nodes, {
                        x: 0,
                        y: 0,
                        width: e.dimensions.width,
                        height: e.dimensions.height
                    }, e.viewport, !0) : e.nodes),
                    u = i(() => {
                        if (e.onlyRenderVisibleElements) {
                            const n = [];
                            for (const o of e.edges) {
                                const r = t.value.get(o.source),
                                    i = t.value.get(o.target);
                                si({
                                    sourcePos: r.computedPosition || {
                                        x: 0,
                                        y: 0
                                    },
                                    targetPos: i.computedPosition || {
                                        x: 0,
                                        y: 0
                                    },
                                    sourceWidth: r.dimensions.width,
                                    sourceHeight: r.dimensions.height,
                                    targetWidth: i.dimensions.width,
                                    targetHeight: i.dimensions.height,
                                    width: e.dimensions.width,
                                    height: e.dimensions.height,
                                    viewport: e.viewport
                                }) && n.push(o)
                            }
                            return n
                        }
                        return e.edges
                    }),
                    d = i(() => [...l.value, ...u.value]),
                    c = i(() => {
                        const t = [];
                        for (const n of e.nodes) n.selected && t.push(n);
                        return t
                    }),
                    h = i(() => {
                        const t = [];
                        for (const n of e.edges) n.selected && t.push(n);
                        return t
                    }),
                    f = i(() => [...c.value, ...h.value]),
                    v = i(() => {
                        const t = [];
                        for (const n of e.nodes) n.dimensions.width && n.dimensions.height && void 0 !== n.handleBounds && t.push(n);
                        return t
                    }),
                    p = i(() => l.value.length > 0 && v.value.length === l.value.length);
                return {
                    getNode: o,
                    getEdge: r,
                    getElements: d,
                    getEdgeTypes: a,
                    getNodeTypes: s,
                    getEdges: u,
                    getNodes: l,
                    getSelectedElements: f,
                    getSelectedNodes: c,
                    getSelectedEdges: h,
                    getNodesInitialized: v,
                    areNodesInitialized: p
                }
            }(o, s, l),
            d = na(o, s, l);
        d.setState({ ...o,
            ...t
        });
        const c = { ...r,
            ...u,
            ...d,
            ...ie(o),
            nodeLookup: s,
            edgeLookup: l,
            emits: a,
            id: e,
            vueFlowVersion: "1.47.0",
            $destroy: () => {
                this.remove(e)
            }
        };
        return this.set(e, c), c
    }
    getId() {
        return "vue-flow-" + this.currentId++
    }
}

function Ba(e) {
    const t = za.getInstance(),
        n = g(),
        o = "object" == typeof e,
        r = o ? e : {
            id: e
        },
        i = r.id,
        a = i ? ? (null == n ? void 0 : n.vueFlowId);
    let s;
    if (n) {
        const e = m($i, null);
        null == e || a && e.id !== a || (s = e)
    }
    if (s || a && (s = t.get(a)), !s || a && s.id !== a) {
        const e = i ? ? t.getId(),
            o = t.create(e, r);
        s = o;
        (n ? ? y(!0)).run(() => {
            w(o.applyDefault, (e, t, n) => {
                const r = e => {
                        o.applyNodeChanges(e)
                    },
                    i = e => {
                        o.applyEdgeChanges(e)
                    };
                e ? (o.onNodesChange(r), o.onEdgesChange(i)) : (o.hooks.value.nodesChange.off(r), o.hooks.value.edgesChange.off(i)), n(() => {
                    o.hooks.value.nodesChange.off(r), o.hooks.value.edgesChange.off(i)
                })
            }, {
                immediate: !0
            }), q(() => {
                if (s) {
                    const e = t.get(s.id);
                    e ? e.$destroy() : Ni(s.id)
                }
            })
        })
    } else o && s.setState(r);
    if (n && (U($i, s), n.vueFlowId = s.id), o) {
        const e = _();
        "VueFlow" !== (null == e ? void 0 : e.type.name) && s.emits.error(new ci(ui.USEVUEFLOW_OPTIONS))
    }
    return s
}
const La = n({
        name: "UserSelection",
        compatConfig: {
            MODE: 3
        },
        props: {
            userSelectionRect: {}
        },
        setup: e => (e, t) => (T(), s("div", {
            class: "vue-flow__selection vue-flow__container",
            style: b({
                width: `${e.userSelectionRect.width}px`,
                height: `${e.userSelectionRect.height}px`,
                transform: `translate(${e.userSelectionRect.x}px, ${e.userSelectionRect.y}px)`
            })
        }, null, 4))
    }),
    Va = ["tabIndex"],
    Ra = n({
        name: "NodesSelection",
        compatConfig: {
            MODE: 3
        },
        setup(e) {
            const {
                emits: t,
                viewport: n,
                getSelectedNodes: o,
                noPanClassName: l,
                disableKeyboardA11y: c,
                userSelectionActive: h
            } = Ba(), f = Ui(), v = r(null), p = ji({
                el: v,
                onStart(e) {
                    t.selectionDragStart(e), t.nodeDragStart(e)
                },
                onDrag(e) {
                    t.selectionDrag(e), t.nodeDrag(e)
                },
                onStop(e) {
                    t.selectionDragStop(e), t.nodeDragStop(e)
                }
            });
            a(() => {
                var e;
                c.value || null == (e = v.value) || e.focus({
                    preventScroll: !0
                })
            });
            const g = i(() => $r(o.value)),
                m = i(() => ({
                    width: `${g.value.width}px`,
                    height: `${g.value.height}px`,
                    top: `${g.value.y}px`,
                    left: `${g.value.x}px`
                }));

            function y(e) {
                t.selectionContextMenu({
                    event: e,
                    nodes: o.value
                })
            }

            function w(e) {
                c || gr[e.key] && (e.preventDefault(), f({
                    x: gr[e.key].x,
                    y: gr[e.key].y
                }, e.shiftKey))
            }
            return (e, t) => !d(h) && g.value.width && g.value.height ? (T(), s("div", {
                key: 0,
                class: u(["vue-flow__nodesselection vue-flow__container", d(l)]),
                style: b({
                    transform: `translate(${d(n).x}px,${d(n).y}px) scale(${d(n).zoom})`
                })
            }, [N("div", {
                ref_key: "el",
                ref: v,
                class: u([{
                    dragging: d(p)
                }, "vue-flow__nodesselection-rect"]),
                style: b(m.value),
                tabIndex: d(c) ? void 0 : -1,
                onContextmenu: y,
                onKeydown: w
            }, null, 46, Va)], 6)) : k("", !0)
        }
    });
const ja = n({
        name: "Pane",
        compatConfig: {
            MODE: 3
        },
        props: {
            isSelecting: {
                type: Boolean
            },
            selectionKeyPressed: {
                type: Boolean
            }
        },
        setup(e) {
            const {
                vueFlowRef: t,
                nodes: n,
                viewport: i,
                emits: a,
                userSelectionActive: c,
                removeSelectedElements: h,
                userSelectionRect: f,
                elementsSelectable: v,
                nodesSelectionActive: p,
                getSelectedEdges: g,
                getSelectedNodes: m,
                removeNodes: y,
                removeEdges: b,
                selectionMode: _,
                deleteKeyCode: E,
                multiSelectionKeyCode: x,
                multiSelectionActive: N,
                edgeLookup: S,
                nodeLookup: M,
                connectionLookup: I,
                defaultEdgeOptions: C,
                connectionStartHandle: O
            } = Ba(), P = r(null), A = r(new Set), $ = r(new Set), z = r(), B = o(() => v.value && (e.isSelecting || c.value)), L = o(() => null !== O.value);
            let V = !1,
                R = !1;
            const j = hr(E, {
                    actInsideInputWithModifier: !1
                }),
                G = hr(x);

            function H(e, t) {
                return n => {
                    n.target === t && (null == e || e(n))
                }
            }

            function F(e) {
                V || L.value ? V = !1 : (a.paneClick(e), h(), p.value = !1)
            }

            function Y(e) {
                e.preventDefault(), e.stopPropagation(), a.paneContextMenu(e)
            }

            function X(e) {
                a.paneScroll(e)
            }
            return w(j, e => {
                e && (y(m.value), b(g.value), p.value = !1)
            }), w(G, e => {
                N.value = e
            }), (o, r) => (T(), s("div", {
                ref_key: "container",
                ref: P,
                class: u(["vue-flow__pane vue-flow__container", {
                    selection: o.isSelecting
                }]),
                onClick: r[0] || (r[0] = e => B.value ? void 0 : H(F, P.value)(e)),
                onContextmenu: r[1] || (r[1] = e => H(Y, P.value)(e)),
                onWheelPassive: r[2] || (r[2] = e => H(X, P.value)(e)),
                onPointerenter: r[3] || (r[3] = e => B.value ? void 0 : d(a).paneMouseEnter(e)),
                onPointerdown: r[4] || (r[4] = n => B.value ? function(n) {
                    var o, r, i;
                    if (z.value = null == (o = t.value) ? void 0 : o.getBoundingClientRect(), !v.value || !e.isSelecting || 0 !== n.button || n.target !== P.value || !z.value) return;
                    null == (i = null == (r = n.target) ? void 0 : r.setPointerCapture) || i.call(r, n.pointerId);
                    const {
                        x: s,
                        y: l
                    } = function(e, t) {
                        return {
                            x: e.clientX - t.left,
                            y: e.clientY - t.top
                        }
                    }(n, z.value);
                    R = !0, V = !1, h(), f.value = {
                        width: 0,
                        height: 0,
                        startX: s,
                        startY: l,
                        x: s,
                        y: l
                    }, a.selectionStart(n)
                }(n) : d(a).paneMouseMove(n)),
                onPointermove: r[5] || (r[5] = e => B.value ? function(e) {
                    var t;
                    if (!z.value || !f.value) return;
                    V = !0;
                    const {
                        x: o,
                        y: r
                    } = fi(e, z.value), {
                        startX: s = 0,
                        startY: l = 0
                    } = f.value, u = {
                        startX: s,
                        startY: l,
                        x: o < s ? o : s,
                        y: r < l ? r : l,
                        width: Math.abs(o - s),
                        height: Math.abs(r - l)
                    }, d = A.value, h = $.value;
                    A.value = new Set(zr(n.value, u, i.value, _.value === nr.Partial, !0).map(e => e.id)), $.value = new Set;
                    const v = (null == (t = C.value) ? void 0 : t.selectable) ? ? !0;
                    for (const n of A.value) {
                        const e = I.value.get(n);
                        if (e)
                            for (const {
                                    edgeId: t
                                } of e.values()) {
                                const e = S.value.get(t);
                                e && (e.selectable ? ? v) && $.value.add(t)
                            }
                    }
                    if (!Di(d, A.value)) {
                        const e = Kr(M.value, A.value, !0);
                        a.nodesChange(e)
                    }
                    if (!Di(h, $.value)) {
                        const e = Kr(S.value, $.value);
                        a.edgesChange(e)
                    }
                    f.value = u, c.value = !0, p.value = !1
                }(e) : d(a).paneMouseMove(e)),
                onPointerup: r[6] || (r[6] = t => B.value ? function(t) {
                    var n;
                    0 === t.button && R && (null == (n = t.target) || n.releasePointerCapture(t.pointerId), !c.value && f.value && t.target === P.value && F(t), c.value = !1, f.value = null, p.value = A.value.size > 0, a.selectionEnd(t), e.selectionKeyPressed && (V = !1), R = !1)
                }(t) : void 0),
                onPointerleave: r[7] || (r[7] = e => d(a).paneMouseLeave(e))
            }, [l(o.$slots, "default"), d(c) && d(f) ? (T(), D(La, {
                key: 0,
                "user-selection-rect": d(f)
            }, null, 8, ["user-selection-rect"])) : k("", !0), d(p) && d(m).length ? (T(), D(Ra, {
                key: 1
            })) : k("", !0)], 34))
        }
    }),
    Ga = n({
        name: "Transform",
        compatConfig: {
            MODE: 3
        },
        setup(e) {
            const {
                viewport: t,
                fitViewOnInit: n,
                fitViewOnInitDone: o
            } = Ba(), r = i(() => !!n.value && !o.value), a = i(() => `translate(${t.value.x}px,${t.value.y}px) scale(${t.value.zoom})`);
            return (e, t) => (T(), s("div", {
                class: "vue-flow__transformationpane vue-flow__container",
                style: b({
                    transform: a.value,
                    opacity: r.value ? 0 : void 0
                })
            }, [l(e.$slots, "default")], 4))
        }
    }),
    Ha = n({
        name: "Viewport",
        compatConfig: {
            MODE: 3
        },
        setup(e) {
            const {
                minZoom: t,
                maxZoom: n,
                defaultViewport: r,
                translateExtent: i,
                zoomActivationKeyCode: c,
                selectionKeyCode: h,
                panActivationKeyCode: f,
                panOnScroll: g,
                panOnScrollMode: m,
                panOnScrollSpeed: y,
                panOnDrag: b,
                zoomOnDoubleClick: _,
                zoomOnPinch: E,
                zoomOnScroll: N,
                preventScrolling: k,
                noWheelClassName: S,
                noPanClassName: M,
                emits: I,
                connectionStartHandle: C,
                userSelectionActive: O,
                paneDragging: D,
                d3Zoom: A,
                d3Selection: $,
                d3ZoomHandler: z,
                viewport: B,
                viewportRef: L,
                paneClickDistance: V
            } = Ba();
            ! function(e) {
                const {
                    emits: t,
                    dimensions: n
                } = Ba();
                let o;
                a(() => {
                    const r = () => {
                        var o, r;
                        if (!e.value || !((null == (r = (o = e.value).checkVisibility) ? void 0 : r.call(o)) ? ? 1)) return;
                        const i = wr(e.value);
                        0 !== i.width && 0 !== i.height || t.error(new ci(ui.MISSING_VIEWPORT_DIMENSIONS)), n.value = {
                            width: i.width || 500,
                            height: i.height || 500
                        }
                    };
                    r(), window.addEventListener("resize", r), e.value && (o = new ResizeObserver(() => r()), o.observe(e.value)), P(() => {
                        window.removeEventListener("resize", r), o && e.value && o.unobserve(e.value)
                    })
                })
            }(L);
            const R = x(!1),
                j = x(!1);
            let G = null,
                H = !1,
                F = 0,
                Y = {
                    x: 0,
                    y: 0,
                    zoom: 0
                };
            const X = hr(f),
                U = hr(h),
                Z = hr(c),
                W = o(() => (!U.value || U.value && !0 === h.value) && (X.value || b.value)),
                q = o(() => X.value || g.value),
                K = o(() => U.value || !0 === h.value && !0 !== W.value),
                J = o(() => null !== C.value);

            function Q(e, t) {
                return 2 === t && Array.isArray(e) && e.includes(2)
            }

            function ee(e) {
                return {
                    x: e.x,
                    y: e.y,
                    zoom: e.k
                }
            }

            function te(e, t) {
                return e.target.closest(`.${t}`)
            }
            return a(() => {
                if (!L.value) return void Ni();
                const e = L.value,
                    o = e.getBoundingClientRect(),
                    a = function() {
                        var e, t, n, o = Wo,
                            r = qo,
                            i = er,
                            a = Jo,
                            s = Qo,
                            l = [0, 1 / 0],
                            u = [
                                [-1 / 0, -1 / 0],
                                [1 / 0, 1 / 0]
                            ],
                            d = 250,
                            c = Xn,
                            h = ve("start", "zoom", "end"),
                            f = 0,
                            v = 10;

                        function p(e) {
                            e.property("__zoom", Ko).on("wheel.zoom", E, {
                                passive: !1
                            }).on("mousedown.zoom", x).on("dblclick.zoom", N).filter(s).on("touchstart.zoom", k).on("touchmove.zoom", S).on("touchend.zoom touchcancel.zoom", M).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                        }

                        function g(e, t) {
                            return (t = Math.max(l[0], Math.min(l[1], t))) === e.k ? e : new Yo(t, e.x, e.y)
                        }

                        function m(e, t, n) {
                            var o = t[0] - n[0] * e.k,
                                r = t[1] - n[1] * e.k;
                            return o === e.x && r === e.y ? e : new Yo(e.k, o, r)
                        }

                        function y(e) {
                            return [(+e[0][0] + +e[1][0]) / 2, (+e[0][1] + +e[1][1]) / 2]
                        }

                        function w(e, t, n, o) {
                            e.on("start.zoom", function() {
                                b(this, arguments).event(o).start()
                            }).on("interrupt.zoom end.zoom", function() {
                                b(this, arguments).event(o).end()
                            }).tween("zoom", function() {
                                var e = this,
                                    i = arguments,
                                    a = b(e, i).event(o),
                                    s = r.apply(e, i),
                                    l = null == n ? y(s) : "function" == typeof n ? n.apply(e, i) : n,
                                    u = Math.max(s[1][0] - s[0][0], s[1][1] - s[0][1]),
                                    d = e.__zoom,
                                    h = "function" == typeof t ? t.apply(e, i) : t,
                                    f = c(d.invert(l).concat(u / d.k), h.invert(l).concat(u / h.k));
                                return function(e) {
                                    if (1 === e) e = h;
                                    else {
                                        var t = f(e),
                                            n = u / t[2];
                                        e = new Yo(n, l[0] - t[0] * n, l[1] - t[1] * n)
                                    }
                                    a.zoom(null, e)
                                }
                            })
                        }

                        function b(e, t, n) {
                            return !n && e.__zooming || new _(e, t)
                        }

                        function _(e, t) {
                            this.that = e, this.args = t, this.active = 0, this.sourceEvent = null, this.extent = r.apply(e, t), this.taps = 0
                        }

                        function E(e, ...t) {
                            if (o.apply(this, arguments)) {
                                var n = b(this, t).event(e),
                                    r = this.__zoom,
                                    s = Math.max(l[0], Math.min(l[1], r.k * Math.pow(2, a.apply(this, arguments)))),
                                    d = Pt(e);
                                if (n.wheel) n.mouse[0][0] === d[0] && n.mouse[0][1] === d[1] || (n.mouse[1] = r.invert(n.mouse[0] = d)), clearTimeout(n.wheel);
                                else {
                                    if (r.k === s) return;
                                    n.mouse = [d, r.invert(d)], yo(this), n.start()
                                }
                                Zo(e), n.wheel = setTimeout(function() {
                                    n.wheel = null, n.end()
                                }, 150), n.zoom("mouse", i(m(g(r, s), n.mouse[0], n.mouse[1]), n.extent, u))
                            }
                        }

                        function x(e, ...t) {
                            if (!n && o.apply(this, arguments)) {
                                var r = e.currentTarget,
                                    a = b(this, t, !0).event(e),
                                    s = Ot(e.view).on("mousemove.zoom", function(e) {
                                        if (Zo(e), !a.moved) {
                                            var t = e.clientX - d,
                                                n = e.clientY - c;
                                            a.moved = t * t + n * n > f
                                        }
                                        a.event(e).zoom("mouse", i(m(a.that.__zoom, a.mouse[0] = Pt(e, r), a.mouse[1]), a.extent, u))
                                    }, !0).on("mouseup.zoom", function(e) {
                                        s.on("mousemove.zoom mouseup.zoom", null), Bt(e.view, a.moved), Zo(e), a.event(e).end()
                                    }, !0),
                                    l = Pt(e, r),
                                    d = e.clientX,
                                    c = e.clientY;
                                zt(e.view), Uo(e), a.mouse = [l, this.__zoom.invert(l)], yo(this), a.start()
                            }
                        }

                        function N(e, ...t) {
                            if (o.apply(this, arguments)) {
                                var n = this.__zoom,
                                    a = Pt(e.changedTouches ? e.changedTouches[0] : e, this),
                                    s = n.invert(a),
                                    l = n.k * (e.shiftKey ? .5 : 2),
                                    c = i(m(g(n, l), a, s), r.apply(this, t), u);
                                Zo(e), d > 0 ? Ot(this).transition().duration(d).call(w, c, a, e) : Ot(this).call(p.transform, c, a, e)
                            }
                        }

                        function k(n, ...r) {
                            if (o.apply(this, arguments)) {
                                var i, a, s, l, u = n.touches,
                                    d = u.length,
                                    c = b(this, r, n.changedTouches.length === d).event(n);
                                for (Uo(n), a = 0; a < d; ++a) l = [l = Pt(s = u[a], this), this.__zoom.invert(l), s.identifier], c.touch0 ? c.touch1 || c.touch0[2] === l[2] || (c.touch1 = l, c.taps = 0) : (c.touch0 = l, i = !0, c.taps = 1 + !!e);
                                e && (e = clearTimeout(e)), i && (c.taps < 2 && (t = l[0], e = setTimeout(function() {
                                    e = null
                                }, 500)), yo(this), c.start())
                            }
                        }

                        function S(e, ...t) {
                            if (this.__zooming) {
                                var n, o, r, a, s = b(this, t).event(e),
                                    l = e.changedTouches,
                                    d = l.length;
                                for (Zo(e), n = 0; n < d; ++n) r = Pt(o = l[n], this), s.touch0 && s.touch0[2] === o.identifier ? s.touch0[0] = r : s.touch1 && s.touch1[2] === o.identifier && (s.touch1[0] = r);
                                if (o = s.that.__zoom, s.touch1) {
                                    var c = s.touch0[0],
                                        h = s.touch0[1],
                                        f = s.touch1[0],
                                        v = s.touch1[1],
                                        p = (p = f[0] - c[0]) * p + (p = f[1] - c[1]) * p,
                                        y = (y = v[0] - h[0]) * y + (y = v[1] - h[1]) * y;
                                    o = g(o, Math.sqrt(p / y)), r = [(c[0] + f[0]) / 2, (c[1] + f[1]) / 2], a = [(h[0] + v[0]) / 2, (h[1] + v[1]) / 2]
                                } else {
                                    if (!s.touch0) return;
                                    r = s.touch0[0], a = s.touch0[1]
                                }
                                s.zoom("touch", i(m(o, r, a), s.extent, u))
                            }
                        }

                        function M(e, ...o) {
                            if (this.__zooming) {
                                var r, i, a = b(this, o).event(e),
                                    s = e.changedTouches,
                                    l = s.length;
                                for (Uo(e), n && clearTimeout(n), n = setTimeout(function() {
                                        n = null
                                    }, 500), r = 0; r < l; ++r) i = s[r], a.touch0 && a.touch0[2] === i.identifier ? delete a.touch0 : a.touch1 && a.touch1[2] === i.identifier && delete a.touch1;
                                if (a.touch1 && !a.touch0 && (a.touch0 = a.touch1, delete a.touch1), a.touch0) a.touch0[1] = this.__zoom.invert(a.touch0[0]);
                                else if (a.end(), 2 === a.taps && (i = Pt(i, this), Math.hypot(t[0] - i[0], t[1] - i[1]) < v)) {
                                    var u = Ot(this).on("dblclick.zoom");
                                    u && u.apply(this, arguments)
                                }
                            }
                        }
                        return p.transform = function(e, t, n, o) {
                            var r = e.selection ? e.selection() : e;
                            r.property("__zoom", Ko), e !== r ? w(e, t, n, o) : r.interrupt().each(function() {
                                b(this, arguments).event(o).start().zoom(null, "function" == typeof t ? t.apply(this, arguments) : t).end()
                            })
                        }, p.scaleBy = function(e, t, n, o) {
                            p.scaleTo(e, function() {
                                return this.__zoom.k * ("function" == typeof t ? t.apply(this, arguments) : t)
                            }, n, o)
                        }, p.scaleTo = function(e, t, n, o) {
                            p.transform(e, function() {
                                var e = r.apply(this, arguments),
                                    o = this.__zoom,
                                    a = null == n ? y(e) : "function" == typeof n ? n.apply(this, arguments) : n,
                                    s = o.invert(a),
                                    l = "function" == typeof t ? t.apply(this, arguments) : t;
                                return i(m(g(o, l), a, s), e, u)
                            }, n, o)
                        }, p.translateBy = function(e, t, n, o) {
                            p.transform(e, function() {
                                return i(this.__zoom.translate("function" == typeof t ? t.apply(this, arguments) : t, "function" == typeof n ? n.apply(this, arguments) : n), r.apply(this, arguments), u)
                            }, null, o)
                        }, p.translateTo = function(e, t, n, o, a) {
                            p.transform(e, function() {
                                var e = r.apply(this, arguments),
                                    a = this.__zoom,
                                    s = null == o ? y(e) : "function" == typeof o ? o.apply(this, arguments) : o;
                                return i(Xo.translate(s[0], s[1]).scale(a.k).translate("function" == typeof t ? -t.apply(this, arguments) : -t, "function" == typeof n ? -n.apply(this, arguments) : -n), e, u)
                            }, o, a)
                        }, _.prototype = {
                            event: function(e) {
                                return e && (this.sourceEvent = e), this
                            },
                            start: function() {
                                return 1 === ++this.active && (this.that.__zooming = this, this.emit("start")), this
                            },
                            zoom: function(e, t) {
                                return this.mouse && "mouse" !== e && (this.mouse[1] = t.invert(this.mouse[0])), this.touch0 && "touch" !== e && (this.touch0[1] = t.invert(this.touch0[0])), this.touch1 && "touch" !== e && (this.touch1[1] = t.invert(this.touch1[0])), this.that.__zoom = t, this.emit("zoom"), this
                            },
                            end: function() {
                                return 0 === --this.active && (delete this.that.__zooming, this.emit("end")), this
                            },
                            emit: function(e) {
                                var t = Ot(this.that).datum();
                                h.call(e, this.that, new Fo(e, {
                                    sourceEvent: this.sourceEvent,
                                    target: p,
                                    transform: this.that.__zoom,
                                    dispatch: h
                                }), t)
                            }
                        }, p.wheelDelta = function(e) {
                            return arguments.length ? (a = "function" == typeof e ? e : Ho(+e), p) : a
                        }, p.filter = function(e) {
                            return arguments.length ? (o = "function" == typeof e ? e : Ho(!!e), p) : o
                        }, p.touchable = function(e) {
                            return arguments.length ? (s = "function" == typeof e ? e : Ho(!!e), p) : s
                        }, p.extent = function(e) {
                            return arguments.length ? (r = "function" == typeof e ? e : Ho([
                                [+e[0][0], +e[0][1]],
                                [+e[1][0], +e[1][1]]
                            ]), p) : r
                        }, p.scaleExtent = function(e) {
                            return arguments.length ? (l[0] = +e[0], l[1] = +e[1], p) : [l[0], l[1]]
                        }, p.translateExtent = function(e) {
                            return arguments.length ? (u[0][0] = +e[0][0], u[1][0] = +e[1][0], u[0][1] = +e[0][1], u[1][1] = +e[1][1], p) : [
                                [u[0][0], u[0][1]],
                                [u[1][0], u[1][1]]
                            ]
                        }, p.constrain = function(e) {
                            return arguments.length ? (i = e, p) : i
                        }, p.duration = function(e) {
                            return arguments.length ? (d = +e, p) : d
                        }, p.interpolate = function(e) {
                            return arguments.length ? (c = e, p) : c
                        }, p.on = function() {
                            var e = h.on.apply(h, arguments);
                            return e === h ? p : e
                        }, p.clickDistance = function(e) {
                            return arguments.length ? (f = (e = +e) * e, p) : Math.sqrt(f)
                        }, p.tapDistance = function(e) {
                            return arguments.length ? (v = +e, p) : v
                        }, p
                    }().clickDistance(V.value).scaleExtent([t.value, n.value]).translateExtent(i.value),
                    s = Ot(e).call(a),
                    l = s.on("wheel.zoom"),
                    u = Xo.translate(r.value.x ? ? 0, r.value.y ? ? 0).scale(br(r.value.zoom ? ? 1, t.value, n.value)),
                    d = [
                        [0, 0],
                        [o.width, o.height]
                    ],
                    c = a.constrain()(u, d, i.value);
                a.transform(s, c), a.wheelDelta(Gr), A.value = a, $.value = s, z.value = l, B.value = {
                    x: c.x,
                    y: c.y,
                    zoom: c.k
                }, a.on("start", e => {
                    var t;
                    if (!e.sourceEvent) return null;
                    F = e.sourceEvent.button, R.value = !0;
                    const n = ee(e.transform);
                    "mousedown" === (null == (t = e.sourceEvent) ? void 0 : t.type) && (D.value = !0), Y = n, I.viewportChangeStart(n), I.moveStart({
                        event: e,
                        flowTransform: n
                    })
                }), a.on("end", e => {
                    if (!e.sourceEvent) return null;
                    if (R.value = !1, D.value = !1, Q(W.value, F ? ? 0) && !H && I.paneContextMenu(e.sourceEvent), H = !1, t = Y, n = e.transform, t.x !== n.x && !Number.isNaN(n.x) || t.y !== n.y && !Number.isNaN(n.y) || t.zoom !== n.k && !Number.isNaN(n.k)) {
                        const t = ee(e.transform);
                        Y = t, I.viewportChangeEnd(t), I.moveEnd({
                            event: e,
                            flowTransform: t
                        })
                    }
                    var t, n
                }), a.filter(e => {
                    var t;
                    const n = Z.value || N.value,
                        o = E.value && e.ctrlKey,
                        r = e.button,
                        i = "wheel" === e.type;
                    if (1 === r && "mousedown" === e.type && (te(e, "vue-flow__node") || te(e, "vue-flow__edge"))) return !0;
                    if (!(W.value || n || q.value || _.value || E.value)) return !1;
                    if (O.value) return !1;
                    if (J.value && !i) return !1;
                    if (!_.value && "dblclick" === e.type) return !1;
                    if (te(e, S.value) && i) return !1;
                    if (te(e, M.value) && (!i || q.value && i && !Z.value)) return !1;
                    if (!E.value && e.ctrlKey && i) return !1;
                    if (!n && !q.value && !o && i) return !1;
                    if (!E && "touchstart" === e.type && (null == (t = e.touches) ? void 0 : t.length) > 1) return e.preventDefault(), !1;
                    if (!W.value && ("mousedown" === e.type || "touchstart" === e.type)) return !1;
                    if (!0 === h.value && Array.isArray(b.value) && b.value.includes(0) && 0 === r) return !1;
                    if (Array.isArray(b.value) && !b.value.includes(r) && ("mousedown" === e.type || "touchstart" === e.type)) return !1;
                    const a = Array.isArray(b.value) && b.value.includes(r) || !0 === h.value && Array.isArray(b.value) && !b.value.includes(0) || !r || r <= 1;
                    return (!e.ctrlKey || X.value || i) && a
                }), w([O, W], () => {
                    O.value && !R.value ? a.on("zoom", null) : O.value || a.on("zoom", e => {
                        B.value = {
                            x: e.transform.x,
                            y: e.transform.y,
                            zoom: e.transform.k
                        };
                        const t = ee(e.transform);
                        H = Q(W.value, F ? ? 0), I.viewportChange(t), I.move({
                            event: e,
                            flowTransform: t
                        })
                    })
                }, {
                    immediate: !0
                }), w([O, q, m, Z, E, k, S], () => {
                    !q.value || Z.value || O.value ? void 0 !== l && s.on("wheel.zoom", function(e, t) {
                        const n = !k.value && "wheel" === e.type && !e.ctrlKey,
                            o = Z.value || N.value,
                            r = E.value && e.ctrlKey;
                        if (!o && !g.value && !r && "wheel" === e.type || n || te(e, S.value)) return null;
                        e.preventDefault(), l.call(this, e, t)
                    }, {
                        passive: !1
                    }) : s.on("wheel.zoom", e => {
                        if (te(e, S.value)) return !1;
                        const t = Z.value || N.value,
                            n = E.value && e.ctrlKey;
                        if (!(!k.value || q.value || t || n)) return !1;
                        e.preventDefault(), e.stopImmediatePropagation();
                        const o = s.property("__zoom").k || 1,
                            r = vi();
                        if (!X.value && e.ctrlKey && E.value && r) {
                            const t = Pt(e),
                                n = o * 2 ** Gr(e);
                            return void a.scaleTo(s, n, t, e)
                        }
                        const i = 1 === e.deltaMode ? 20 : 1;
                        let l = m.value === ar.Vertical ? 0 : e.deltaX * i,
                            u = m.value === ar.Horizontal ? 0 : e.deltaY * i;
                        !r && e.shiftKey && m.value !== ar.Vertical && !l && u && (l = u, u = 0), a.translateBy(s, -l / o * y.value, -u / o * y.value);
                        const d = ee(s.property("__zoom"));
                        G && clearTimeout(G), j.value ? (I.move({
                            event: e,
                            flowTransform: d
                        }), I.viewportChange(d), G = setTimeout(() => {
                            I.moveEnd({
                                event: e,
                                flowTransform: d
                            }), I.viewportChangeEnd(d), j.value = !1
                        }, 150)) : (j.value = !0, I.moveStart({
                            event: e,
                            flowTransform: d
                        }), I.viewportChangeStart(d))
                    }, {
                        passive: !1
                    })
                }, {
                    immediate: !0
                })
            }), (e, t) => (T(), s("div", {
                ref_key: "viewportRef",
                ref: L,
                class: "vue-flow__viewport vue-flow__container"
            }, [v(ja, {
                "is-selecting": K.value,
                "selection-key-pressed": d(U),
                class: u({
                    connecting: J.value,
                    dragging: d(D),
                    draggable: !0 === d(b) || Array.isArray(d(b)) && d(b).includes(0)
                })
            }, {
                default: p(() => [v(Ga, null, {
                    default: p(() => [l(e.$slots, "default")]),
                    _: 3
                })]),
                _: 3
            }, 8, ["is-selecting", "selection-key-pressed", "class"])], 512))
        }
    }),
    Fa = ["id"],
    Ya = ["id"],
    Xa = ["id"],
    Ua = n({
        name: "A11yDescriptions",
        compatConfig: {
            MODE: 3
        },
        setup(e) {
            const {
                id: t,
                disableKeyboardA11y: n,
                ariaLiveMessage: o
            } = Ba();
            return (e, r) => (T(), s(M, null, [N("div", {
                id: `${d(fr)}-${d(t)}`,
                style: {
                    display: "none"
                }
            }, " Press enter or space to select a node. " + S(d(n) ? "" : "You can then use the arrow keys to move the node around.") + " You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel. ", 9, Fa), N("div", {
                id: `${d(vr)}-${d(t)}`,
                style: {
                    display: "none"
                }
            }, " Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel. ", 8, Ya), d(n) ? k("", !0) : (T(), s("div", {
                key: 0,
                id: `${d("vue-flow__aria-live")}-${d(t)}`,
                "aria-live": "assertive",
                "aria-atomic": "true",
                style: {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    margin: "-1px",
                    border: "0",
                    padding: "0",
                    overflow: "hidden",
                    clip: "rect(0px, 0px, 0px, 0px)",
                    "clip-path": "inset(100%)"
                }
            }, S(d(o)), 9, Xa))], 64))
        }
    });

function Za(e, t, n) {
    return n === tr.Left ? e - t : n === tr.Right ? e + t : e
}

function Wa(e, t, n) {
    return n === tr.Top ? e - t : n === tr.Bottom ? e + t : e
}
const qa = function({
    radius: e = 10,
    centerX: t = 0,
    centerY: n = 0,
    position: o = tr.Top,
    type: r
}) {
    return B("circle", {
        class: `vue-flow__edgeupdater vue-flow__edgeupdater-${r}`,
        cx: Za(t, e, o),
        cy: Wa(n, e, o),
        r: e,
        stroke: "transparent",
        fill: "transparent"
    })
};
qa.props = ["radius", "centerX", "centerY", "position", "type"], qa.compatConfig = {
    MODE: 3
};
const Ka = qa,
    Ja = n({
        name: "Edge",
        compatConfig: {
            MODE: 3
        },
        props: ["id"],
        setup(e) {
            const {
                id: t,
                addSelectedEdges: n,
                connectionMode: a,
                edgeUpdaterRadius: s,
                emits: l,
                nodesSelectionActive: u,
                noPanClassName: d,
                getEdgeTypes: c,
                removeSelectedEdges: h,
                findEdge: f,
                findNode: v,
                isValidConnection: p,
                multiSelectionActive: g,
                disableKeyboardA11y: y,
                elementsSelectable: w,
                edgesUpdatable: b,
                edgesFocusable: E,
                hooks: x
            } = Ba(), N = i(() => f(e.id)), {
                emit: k,
                on: S
            } = Gi(N.value, l), M = m(Ri), I = _(), C = r(!1), O = r(!1), P = r(""), T = r(null), D = r("source"), A = r(null), $ = o(() => void 0 === N.value.selectable ? w.value : N.value.selectable), z = o(() => void 0 === N.value.updatable ? b.value : N.value.updatable), L = o(() => void 0 === N.value.focusable ? E.value : N.value.focusable);
            U(Li, e.id), U(Vi, A);
            const V = i(() => N.value.class instanceof Function ? N.value.class(N.value) : N.value.class),
                R = i(() => N.value.style instanceof Function ? N.value.style(N.value) : N.value.style),
                j = i(() => {
                    const e = N.value.type || "default",
                        t = null == M ? void 0 : M[`edge-${e}`];
                    if (t) return t;
                    let n = N.value.template ? ? c.value[e];
                    if ("string" == typeof n && I) {
                        const t = Object.keys(I.appContext.components);
                        t && t.includes(e) && (n = Z(e, !1))
                    }
                    return n && "string" != typeof n ? n : (l.error(new ci(ui.EDGE_TYPE_MISSING, n)), !1)
                }),
                {
                    handlePointerDown: G
                } = Fi({
                    nodeId: P,
                    handleId: T,
                    type: D,
                    isValidConnection: p,
                    edgeUpdaterType: D,
                    onEdgeUpdate: function(e, t) {
                        k.update({
                            event: e,
                            edge: N.value,
                            connection: t
                        })
                    },
                    onEdgeUpdateEnd: function(e) {
                        k.updateEnd({
                            event: e,
                            edge: N.value
                        }), O.value = !1
                    }
                });
            return () => {
                const n = v(N.value.source),
                    o = v(N.value.target),
                    r = "pathOptions" in N.value ? N.value.pathOptions : {};
                if (!n && !o) return l.error(new ci(ui.EDGE_SOURCE_TARGET_MISSING, N.value.id, N.value.source, N.value.target)), null;
                if (!n) return l.error(new ci(ui.EDGE_SOURCE_MISSING, N.value.id, N.value.source)), null;
                if (!o) return l.error(new ci(ui.EDGE_TARGET_MISSING, N.value.id, N.value.target)), null;
                if (!N.value || N.value.hidden || n.hidden || o.hidden) return null;
                let i;
                i = a.value === rr.Strict ? n.handleBounds.source : [...n.handleBounds.source || [], ...n.handleBounds.target || []];
                const u = ai(i, N.value.sourceHandle);
                let h;
                h = a.value === rr.Strict ? o.handleBounds.target : [...o.handleBounds.target || [], ...o.handleBounds.source || []];
                const f = ai(h, N.value.targetHandle),
                    p = (null == u ? void 0 : u.position) || tr.Bottom,
                    g = (null == f ? void 0 : f.position) || tr.Top,
                    {
                        x: m,
                        y: y
                    } = ii(n, u, p),
                    {
                        x: w,
                        y: b
                    } = ii(o, f, g);
                return N.value.sourceX = m, N.value.sourceY = y, N.value.targetX = w, N.value.targetY = b, B("g", {
                    ref: A,
                    key: e.id,
                    "data-id": e.id,
                    class: ["vue-flow__edge", `vue-flow__edge-${!1===j.value?"default":N.value.type||"default"}`, d.value, V.value, {
                        updating: C.value,
                        selected: N.value.selected,
                        animated: N.value.animated,
                        inactive: !$.value && !x.value.edgeClick.hasListeners()
                    }],
                    tabIndex: L.value ? 0 : void 0,
                    "aria-label": null === N.value.ariaLabel ? void 0 : N.value.ariaLabel ? ? `Edge from ${N.value.source} to ${N.value.target}`,
                    "aria-describedby": L.value ? `${vr}-${t}` : void 0,
                    "aria-roledescription": "edge",
                    role: L.value ? "group" : "img",
                    ...N.value.domAttributes,
                    onClick: X,
                    onContextmenu: W,
                    onDblclick: q,
                    onMouseenter: K,
                    onMousemove: J,
                    onMouseleave: Q,
                    onKeyDown: L.value ? ne : void 0
                }, [O.value ? null : B(!1 === j.value ? c.value.default : j.value, {
                    id: e.id,
                    sourceNode: n,
                    targetNode: o,
                    source: N.value.source,
                    target: N.value.target,
                    type: N.value.type,
                    updatable: z.value,
                    selected: N.value.selected,
                    animated: N.value.animated,
                    label: N.value.label,
                    labelStyle: N.value.labelStyle,
                    labelShowBg: N.value.labelShowBg,
                    labelBgStyle: N.value.labelBgStyle,
                    labelBgPadding: N.value.labelBgPadding,
                    labelBgBorderRadius: N.value.labelBgBorderRadius,
                    data: N.value.data,
                    events: { ...N.value.events,
                        ...S
                    },
                    style: R.value,
                    markerStart: `url('#${jr(N.value.markerStart,t)}')`,
                    markerEnd: `url('#${jr(N.value.markerEnd,t)}')`,
                    sourcePosition: p,
                    targetPosition: g,
                    sourceX: m,
                    sourceY: y,
                    targetX: w,
                    targetY: b,
                    sourceHandleId: N.value.sourceHandle,
                    targetHandleId: N.value.targetHandle,
                    interactionWidth: N.value.interactionWidth,
                    ...r
                }), ["source" === z.value || !0 === z.value ? [B("g", {
                    onMousedown: ee,
                    onMouseenter: H,
                    onMouseout: F
                }, B(Ka, {
                    position: p,
                    centerX: m,
                    centerY: y,
                    radius: s.value,
                    type: "source",
                    "data-type": "source"
                }))] : null, "target" === z.value || !0 === z.value ? [B("g", {
                    onMousedown: te,
                    onMouseenter: H,
                    onMouseout: F
                }, B(Ka, {
                    position: g,
                    centerX: w,
                    centerY: b,
                    radius: s.value,
                    type: "target",
                    "data-type": "target"
                }))] : null]])
            };

            function H() {
                C.value = !0
            }

            function F() {
                C.value = !1
            }

            function Y(e, t) {
                0 === e.button && (O.value = !0, P.value = t ? N.value.target : N.value.source, T.value = (t ? N.value.targetHandle : N.value.sourceHandle) ? ? null, D.value = t ? "target" : "source", k.updateStart({
                    event: e,
                    edge: N.value
                }), G(e))
            }

            function X(e) {
                var t;
                const o = {
                    event: e,
                    edge: N.value
                };
                $.value && (u.value = !1, N.value.selected && g.value ? (h([N.value]), null == (t = A.value) || t.blur()) : n([N.value])), k.click(o)
            }

            function W(e) {
                k.contextMenu({
                    event: e,
                    edge: N.value
                })
            }

            function q(e) {
                k.doubleClick({
                    event: e,
                    edge: N.value
                })
            }

            function K(e) {
                k.mouseEnter({
                    event: e,
                    edge: N.value
                })
            }

            function J(e) {
                k.mouseMove({
                    event: e,
                    edge: N.value
                })
            }

            function Q(e) {
                k.mouseLeave({
                    event: e,
                    edge: N.value
                })
            }

            function ee(e) {
                Y(e, !0)
            }

            function te(e) {
                Y(e, !1)
            }

            function ne(t) {
                var o;
                if (!y.value && pr.includes(t.key) && $.value) {
                    "Escape" === t.key ? (null == (o = A.value) || o.blur(), h([f(e.id)])) : n([f(e.id)])
                }
            }
        }
    }),
    Qa = n({
        name: "ConnectionLine",
        compatConfig: {
            MODE: 3
        },
        setup() {
            var e;
            const {
                id: t,
                connectionMode: n,
                connectionStartHandle: o,
                connectionEndHandle: r,
                connectionPosition: a,
                connectionLineType: s,
                connectionLineStyle: l,
                connectionLineOptions: u,
                connectionStatus: d,
                viewport: c,
                findNode: h
            } = Ba(), f = null == (e = m(Ri)) ? void 0 : e["connection-line"], v = i(() => {
                var e;
                return h(null == (e = o.value) ? void 0 : e.nodeId)
            }), p = i(() => {
                var e;
                return h(null == (e = r.value) ? void 0 : e.nodeId) ? ? null
            }), g = i(() => ({
                x: (a.value.x - c.value.x) / c.value.zoom,
                y: (a.value.y - c.value.y) / c.value.zoom
            })), y = i(() => u.value.markerStart ? `url(#${jr(u.value.markerStart,t)})` : ""), w = i(() => u.value.markerEnd ? `url(#${jr(u.value.markerEnd,t)})` : "");
            return () => {
                var e, t, i;
                if (!v.value || !o.value) return null;
                const a = o.value.id,
                    c = o.value.type,
                    h = v.value.handleBounds;
                let m = (null == h ? void 0 : h[c]) ? ? [];
                if (n.value === rr.Loose) {
                    const e = (null == h ? void 0 : h["source" === c ? "target" : "source"]) ? ? [];
                    m = [...m, ...e]
                }
                if (!m) return null;
                const b = (a ? m.find(e => e.id === a) : m[0]) ? ? null,
                    _ = (null == b ? void 0 : b.position) ? ? tr.Top,
                    {
                        x: E,
                        y: x
                    } = ii(v.value, b, _);
                let N = null;
                p.value && (N = n.value === rr.Strict ? (null == (e = p.value.handleBounds["source" === c ? "target" : "source"]) ? void 0 : e.find(e => {
                    var t;
                    return e.id === (null == (t = r.value) ? void 0 : t.id)
                })) || null : (null == (t = [...p.value.handleBounds.source ? ? [], ...p.value.handleBounds.target ? ? []]) ? void 0 : t.find(e => {
                    var t;
                    return e.id === (null == (t = r.value) ? void 0 : t.id)
                })) || null);
                const k = (null == (i = r.value) ? void 0 : i.position) ? ? (_ ? Ei[_] : null);
                if (!_ || !k) return null;
                const S = s.value ? ? u.value.type ? ? or.Bezier;
                let M = "";
                const I = {
                    sourceX: E,
                    sourceY: x,
                    sourcePosition: _,
                    targetX: g.value.x,
                    targetY: g.value.y,
                    targetPosition: k
                };
                return S === or.Bezier ? [M] = Ea(I) : S === or.Step ? [M] = Ia({ ...I,
                    borderRadius: 0
                }) : S === or.SmoothStep ? [M] = Ia(I) : S === or.SimpleBezier ? [M] = Na(I) : M = `M${E},${x} ${g.value.x},${g.value.y}`, B("svg", {
                    class: "vue-flow__edges vue-flow__connectionline vue-flow__container"
                }, B("g", {
                    class: "vue-flow__connection"
                }, f ? B(f, {
                    sourceX: E,
                    sourceY: x,
                    sourcePosition: _,
                    targetX: g.value.x,
                    targetY: g.value.y,
                    targetPosition: k,
                    sourceNode: v.value,
                    sourceHandle: b,
                    targetNode: p.value,
                    targetHandle: N,
                    markerEnd: w.value,
                    markerStart: y.value,
                    connectionStatus: d.value
                }) : B("path", {
                    d: M,
                    class: [u.value.class, d.value, "vue-flow__connection-path"],
                    style: { ...l.value,
                        ...u.value.style
                    },
                    "marker-end": w.value,
                    "marker-start": y.value
                })))
            }
        }
    }),
    es = ["id", "markerWidth", "markerHeight", "markerUnits", "orient"],
    ts = n({
        name: "MarkerType",
        compatConfig: {
            MODE: 3
        },
        props: {
            id: {},
            type: {},
            color: {
                default: "none"
            },
            width: {
                default: 12.5
            },
            height: {
                default: 12.5
            },
            markerUnits: {
                default: "strokeWidth"
            },
            orient: {
                default: "auto-start-reverse"
            },
            strokeWidth: {
                default: 1
            }
        },
        setup: e => (e, t) => (T(), s("marker", {
            id: e.id,
            class: "vue-flow__arrowhead",
            viewBox: "-10 -10 20 20",
            refX: "0",
            refY: "0",
            markerWidth: `${e.width}`,
            markerHeight: `${e.height}`,
            markerUnits: e.markerUnits,
            orient: e.orient
        }, [e.type === d(ir).ArrowClosed ? (T(), s("polyline", {
            key: 0,
            style: b({
                stroke: e.color,
                fill: e.color,
                strokeWidth: e.strokeWidth
            }),
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            points: "-5,-4 0,0 -5,4 -5,-4"
        }, null, 4)) : k("", !0), e.type === d(ir).Arrow ? (T(), s("polyline", {
            key: 1,
            style: b({
                stroke: e.color,
                strokeWidth: e.strokeWidth
            }),
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            fill: "none",
            points: "-5,-4 0,0 -5,4"
        }, null, 4)) : k("", !0)], 8, es))
    }),
    ns = {
        class: "vue-flow__marker vue-flow__container",
        "aria-hidden": "true"
    },
    os = n({
        name: "MarkerDefinitions",
        compatConfig: {
            MODE: 3
        },
        setup(e) {
            const {
                id: t,
                edges: n,
                connectionLineOptions: o,
                defaultMarkerColor: r
            } = Ba(), a = i(() => {
                const e = new Set,
                    i = [],
                    a = n => {
                        if (n) {
                            const o = jr(n, t);
                            e.has(o) || ("object" == typeof n ? i.push({ ...n,
                                id: o,
                                color: n.color || r.value
                            }) : i.push({
                                id: o,
                                color: r.value,
                                type: n
                            }), e.add(o))
                        }
                    };
                for (const t of [o.value.markerEnd, o.value.markerStart]) a(t);
                for (const t of n.value)
                    for (const e of [t.markerStart, t.markerEnd]) a(e);
                return i.sort((e, t) => e.id.localeCompare(t.id))
            });
            return (e, t) => (T(), s("svg", ns, [N("defs", null, [(T(!0), s(M, null, Y(a.value, e => (T(), D(ts, {
                id: e.id,
                key: e.id,
                type: e.type,
                color: e.color,
                width: e.width,
                height: e.height,
                markerUnits: e.markerUnits,
                "stroke-width": e.strokeWidth,
                orient: e.orient
            }, null, 8, ["id", "type", "color", "width", "height", "markerUnits", "stroke-width", "orient"]))), 128))])]))
        }
    }),
    rs = n({
        name: "Edges",
        compatConfig: {
            MODE: 3
        },
        setup(e) {
            const {
                findNode: t,
                getEdges: n,
                elevateEdgesOnSelect: o
            } = Ba();
            return (e, r) => (T(), s(M, null, [v(os), (T(!0), s(M, null, Y(d(n), e => (T(), s("svg", {
                key: e.id,
                class: "vue-flow__edges vue-flow__container",
                style: b({
                    zIndex: d(li)(e, d(t), d(o))
                })
            }, [v(d(Ja), {
                id: e.id
            }, null, 8, ["id"])], 4))), 128)), v(d(Qa))], 64))
        }
    }),
    is = n({
        name: "Node",
        compatConfig: {
            MODE: 3
        },
        props: ["id", "resizeObserver"],
        setup(e) {
            const {
                id: t,
                noPanClassName: n,
                selectNodesOnDrag: s,
                nodesSelectionActive: l,
                multiSelectionActive: u,
                emits: d,
                removeSelectedNodes: c,
                addSelectedNodes: h,
                updateNodeDimensions: f,
                onUpdateNodeInternals: v,
                getNodeTypes: p,
                nodeExtent: g,
                elevateNodesOnSelect: y,
                disableKeyboardA11y: b,
                ariaLiveMessage: E,
                snapToGrid: x,
                snapGrid: N,
                nodeDragThreshold: k,
                nodesDraggable: S,
                elementsSelectable: M,
                nodesConnectable: I,
                nodesFocusable: C,
                hooks: O
            } = Ba(), P = r(null);
            U(Bi, P), U(zi, e.id);
            const T = m(Ri),
                D = _(),
                A = Ui(),
                {
                    node: $,
                    parentNode: z
                } = Yi(e.id),
                {
                    emit: L,
                    on: V
                } = Xi($, d),
                j = o(() => void 0 === $.draggable ? S.value : $.draggable),
                G = o(() => void 0 === $.selectable ? M.value : $.selectable),
                H = o(() => void 0 === $.connectable ? I.value : $.connectable),
                F = o(() => void 0 === $.focusable ? C.value : $.focusable),
                Y = i(() => G.value || j.value || O.value.nodeClick.hasListeners() || O.value.nodeDoubleClick.hasListeners() || O.value.nodeMouseEnter.hasListeners() || O.value.nodeMouseMove.hasListeners() || O.value.nodeMouseLeave.hasListeners()),
                X = o(() => !!$.dimensions.width && !!$.dimensions.height),
                W = i(() => {
                    const e = $.type || "default",
                        t = null == T ? void 0 : T[`node-${e}`];
                    if (t) return t;
                    let n = $.template || p.value[e];
                    if ("string" == typeof n && D) {
                        const t = Object.keys(D.appContext.components);
                        t && t.includes(e) && (n = Z(e, !1))
                    }
                    return n && "string" != typeof n ? n : (d.error(new ci(ui.NODE_TYPE_MISSING, n)), !1)
                }),
                q = ji({
                    id: e.id,
                    el: P,
                    disabled: () => !j.value,
                    selectable: G,
                    dragHandle: () => $.dragHandle,
                    onStart(e) {
                        L.dragStart(e)
                    },
                    onDrag(e) {
                        L.drag(e)
                    },
                    onStop(e) {
                        L.dragStop(e)
                    },
                    onClick(e) {
                        le(e)
                    }
                }),
                K = i(() => $.class instanceof Function ? $.class($) : $.class),
                J = i(() => {
                    const e = ($.style instanceof Function ? $.style($) : $.style) || {},
                        t = $.width instanceof Function ? $.width($) : $.width,
                        n = $.height instanceof Function ? $.height($) : $.height;
                    return !e.width && t && (e.width = "string" == typeof t ? t : `${t}px`), !e.height && n && (e.height = "string" == typeof n ? n : `${n}px`), e
                }),
                Q = o(() => Number($.zIndex ? ? J.value.zIndex ? ? 0));
            return v(t => {
                !t.includes(e.id) && t.length || te()
            }), a(() => {
                w(() => $.hidden, (t = !1, n, o) => {
                    !t && P.value && (e.resizeObserver.observe(P.value), o(() => {
                        P.value && e.resizeObserver.unobserve(P.value)
                    }))
                }, {
                    immediate: !0,
                    flush: "post"
                })
            }), w([() => $.type, () => $.sourcePosition, () => $.targetPosition], () => {
                R(() => {
                    f([{
                        id: e.id,
                        nodeElement: P.value,
                        forceUpdate: !0
                    }])
                })
            }), w([() => $.position.x, () => $.position.y, () => {
                var e;
                return null == (e = z.value) ? void 0 : e.computedPosition.x
            }, () => {
                var e;
                return null == (e = z.value) ? void 0 : e.computedPosition.y
            }, () => {
                var e;
                return null == (e = z.value) ? void 0 : e.computedPosition.z
            }, Q, () => $.selected, () => $.dimensions.height, () => $.dimensions.width, () => {
                var e;
                return null == (e = z.value) ? void 0 : e.dimensions.height
            }, () => {
                var e;
                return null == (e = z.value) ? void 0 : e.dimensions.width
            }], ([e, t, n, o, r, i]) => {
                const a = {
                    x: e,
                    y: t,
                    z: i + (y.value && $.selected ? 1e3 : 0)
                };
                var s, l;
                $.computedPosition = void 0 !== n && void 0 !== o ? {
                    x: (l = a).x + (s = {
                        x: n,
                        y: o,
                        z: r
                    }).x,
                    y: l.y + s.y,
                    z: (s.z > l.z ? s.z : l.z) + 1
                } : a
            }, {
                flush: "post",
                immediate: !0
            }), w([() => $.extent, g], ([e, t], [n, o]) => {
                e === n && t === o || ee()
            }), "parent" === $.extent || "object" == typeof $.extent && "range" in $.extent && "parent" === $.extent.range ? se(() => X).toBe(!0).then(ee) : ee(), () => $.hidden ? null : B("div", {
                ref: P,
                "data-id": $.id,
                class: ["vue-flow__node", `vue-flow__node-${!1===W.value?"default":$.type||"default"}`, {
                    [n.value]: j.value,
                    dragging: null == q ? void 0 : q.value,
                    draggable: j.value,
                    selected: $.selected,
                    selectable: G.value,
                    parent: $.isParent
                }, K.value],
                style: {
                    visibility: X.value ? "visible" : "hidden",
                    zIndex: $.computedPosition.z ? ? Q.value,
                    transform: `translate(${$.computedPosition.x}px,${$.computedPosition.y}px)`,
                    pointerEvents: Y.value ? "all" : "none",
                    ...J.value
                },
                tabIndex: F.value ? 0 : void 0,
                role: F.value ? "group" : void 0,
                "aria-describedby": b.value ? void 0 : `${fr}-${t}`,
                "aria-label": $.ariaLabel,
                "aria-roledescription": "node",
                ...$.domAttributes,
                onMouseenter: ne,
                onMousemove: oe,
                onMouseleave: re,
                onContextmenu: ie,
                onClick: le,
                onDblclick: ae,
                onKeydown: ue
            }, [B(!1 === W.value ? p.value.default : W.value, {
                id: $.id,
                type: $.type,
                data: $.data,
                events: { ...$.events,
                    ...V
                },
                selected: $.selected,
                resizing: $.resizing,
                dragging: q.value,
                connectable: H.value,
                position: $.computedPosition,
                dimensions: $.dimensions,
                isValidTargetPos: $.isValidTargetPos,
                isValidSourcePos: $.isValidSourcePos,
                parent: $.parentNode,
                parentNodeId: $.parentNode,
                zIndex: $.computedPosition.z ? ? Q.value,
                targetPosition: $.targetPosition,
                sourcePosition: $.sourcePosition,
                label: $.label,
                dragHandle: $.dragHandle,
                onUpdateNodeInternals: te
            })]);

            function ee() {
                const e = $.computedPosition,
                    {
                        computedPosition: t,
                        position: n
                    } = ri($, x.value ? pi(e, N.value) : e, d.error, g.value, z.value);
                $.computedPosition.x === t.x && $.computedPosition.y === t.y || ($.computedPosition = { ...$.computedPosition,
                    ...t
                }), $.position.x === n.x && $.position.y === n.y || ($.position = n)
            }

            function te() {
                P.value && f([{
                    id: e.id,
                    nodeElement: P.value,
                    forceUpdate: !0
                }])
            }

            function ne(e) {
                (null == q ? void 0 : q.value) || L.mouseEnter({
                    event: e,
                    node: $
                })
            }

            function oe(e) {
                (null == q ? void 0 : q.value) || L.mouseMove({
                    event: e,
                    node: $
                })
            }

            function re(e) {
                (null == q ? void 0 : q.value) || L.mouseLeave({
                    event: e,
                    node: $
                })
            }

            function ie(e) {
                return L.contextMenu({
                    event: e,
                    node: $
                })
            }

            function ae(e) {
                return L.doubleClick({
                    event: e,
                    node: $
                })
            }

            function le(e) {
                G.value && (!s.value || !j.value || k.value > 0) && Mi($, u.value, h, c, l, !1, P.value), L.click({
                    event: e,
                    node: $
                })
            }

            function ue(e) {
                if (!dr(e) && !b.value)
                    if (pr.includes(e.key) && G.value) {
                        const t = "Escape" === e.key;
                        Mi($, u.value, h, c, l, t, P.value)
                    } else j.value && $.selected && gr[e.key] && (e.preventDefault(), E.value = `Moved selected node ${e.key.replace("Arrow","").toLowerCase()}. New position, x: ${~~$.position.x}, y: ${~~$.position.y}`, A({
                        x: gr[e.key].x,
                        y: gr[e.key].y
                    }, e.shiftKey))
            }
        }
    });
const as = {
        class: "vue-flow__nodes vue-flow__container"
    },
    ss = n({
        name: "Nodes",
        compatConfig: {
            MODE: 3
        },
        setup(e) {
            const {
                getNodes: t,
                updateNodeDimensions: n,
                emits: o
            } = Ba(), l = function(e = {
                includeHiddenNodes: !1
            }) {
                const {
                    nodes: t
                } = Ba();
                return i(() => {
                    if (0 === t.value.length) return !1;
                    for (const n of t.value)
                        if ((e.includeHiddenNodes || !n.hidden) && (void 0 === (null == n ? void 0 : n.handleBounds) || 0 === n.dimensions.width || 0 === n.dimensions.height)) return !1;
                    return !0
                })
            }(), u = r();
            return w(l, e => {
                e && R(() => {
                    o.nodesInitialized(t.value)
                })
            }, {
                immediate: !0
            }), a(() => {
                u.value = new ResizeObserver(e => {
                    const t = e.map(e => ({
                        id: e.target.getAttribute("data-id"),
                        nodeElement: e.target,
                        forceUpdate: !0
                    }));
                    R(() => n(t))
                })
            }), P(() => {
                var e;
                return null == (e = u.value) ? void 0 : e.disconnect()
            }), (e, n) => (T(), s("div", as, [u.value ? (T(!0), s(M, {
                key: 0
            }, Y(d(t), (e, t, n, o) => {
                const r = [e.id];
                if (o && o.key === e.id && X(o, r)) return o;
                const i = (T(), D(d(is), {
                    id: e.id,
                    key: e.id,
                    "resize-observer": u.value
                }, null, 8, ["id", "resize-observer"]));
                return i.memo = r, i
            }, n, 0), 128)) : k("", !0)]))
        }
    });
const ls = N("div", {
        class: "vue-flow__edge-labels"
    }, null, -1),
    us = n({
        name: "VueFlow",
        compatConfig: {
            MODE: 3
        },
        props: {
            id: {},
            modelValue: {},
            nodes: {},
            edges: {},
            edgeTypes: {},
            nodeTypes: {},
            connectionMode: {},
            connectionLineType: {},
            connectionLineStyle: {
                default: void 0
            },
            connectionLineOptions: {
                default: void 0
            },
            connectionRadius: {},
            isValidConnection: {
                type: [Function, null],
                default: void 0
            },
            deleteKeyCode: {
                default: void 0
            },
            selectionKeyCode: {
                type: [Boolean, null],
                default: void 0
            },
            multiSelectionKeyCode: {
                default: void 0
            },
            zoomActivationKeyCode: {
                default: void 0
            },
            panActivationKeyCode: {
                default: void 0
            },
            snapToGrid: {
                type: Boolean,
                default: void 0
            },
            snapGrid: {},
            onlyRenderVisibleElements: {
                type: Boolean,
                default: void 0
            },
            edgesUpdatable: {
                type: [Boolean, String],
                default: void 0
            },
            nodesDraggable: {
                type: Boolean,
                default: void 0
            },
            nodesConnectable: {
                type: Boolean,
                default: void 0
            },
            nodeDragThreshold: {},
            elementsSelectable: {
                type: Boolean,
                default: void 0
            },
            selectNodesOnDrag: {
                type: Boolean,
                default: void 0
            },
            panOnDrag: {
                type: [Boolean, Array],
                default: void 0
            },
            minZoom: {},
            maxZoom: {},
            defaultViewport: {},
            translateExtent: {},
            nodeExtent: {},
            defaultMarkerColor: {},
            zoomOnScroll: {
                type: Boolean,
                default: void 0
            },
            zoomOnPinch: {
                type: Boolean,
                default: void 0
            },
            panOnScroll: {
                type: Boolean,
                default: void 0
            },
            panOnScrollSpeed: {},
            panOnScrollMode: {},
            paneClickDistance: {},
            zoomOnDoubleClick: {
                type: Boolean,
                default: void 0
            },
            preventScrolling: {
                type: Boolean,
                default: void 0
            },
            selectionMode: {},
            edgeUpdaterRadius: {},
            fitViewOnInit: {
                type: Boolean,
                default: void 0
            },
            connectOnClick: {
                type: Boolean,
                default: void 0
            },
            applyDefault: {
                type: Boolean,
                default: void 0
            },
            autoConnect: {
                type: [Boolean, Function],
                default: void 0
            },
            noDragClassName: {},
            noWheelClassName: {},
            noPanClassName: {},
            defaultEdgeOptions: {},
            elevateEdgesOnSelect: {
                type: Boolean,
                default: void 0
            },
            elevateNodesOnSelect: {
                type: Boolean,
                default: void 0
            },
            disableKeyboardA11y: {
                type: Boolean,
                default: void 0
            },
            edgesFocusable: {
                type: Boolean,
                default: void 0
            },
            nodesFocusable: {
                type: Boolean,
                default: void 0
            },
            autoPanOnConnect: {
                type: Boolean,
                default: void 0
            },
            autoPanOnNodeDrag: {
                type: Boolean,
                default: void 0
            },
            autoPanSpeed: {}
        },
        emits: ["nodesChange", "edgesChange", "nodesInitialized", "paneReady", "init", "updateNodeInternals", "error", "connect", "connectStart", "connectEnd", "clickConnectStart", "clickConnectEnd", "moveStart", "move", "moveEnd", "selectionDragStart", "selectionDrag", "selectionDragStop", "selectionContextMenu", "selectionStart", "selectionEnd", "viewportChangeStart", "viewportChange", "viewportChangeEnd", "paneScroll", "paneClick", "paneContextMenu", "paneMouseEnter", "paneMouseMove", "paneMouseLeave", "edgeUpdate", "edgeContextMenu", "edgeMouseEnter", "edgeMouseMove", "edgeMouseLeave", "edgeDoubleClick", "edgeClick", "edgeUpdateStart", "edgeUpdateEnd", "nodeContextMenu", "nodeMouseEnter", "nodeMouseMove", "nodeMouseLeave", "nodeDoubleClick", "nodeClick", "nodeDragStart", "nodeDrag", "nodeDragStop", "miniMapNodeClick", "miniMapNodeDoubleClick", "miniMapNodeMouseEnter", "miniMapNodeMouseMove", "miniMapNodeMouseLeave", "update:modelValue", "update:nodes", "update:edges"],
        setup(e, {
            expose: t,
            emit: n
        }) {
            const o = e,
                r = h(),
                i = he(o, "modelValue", n),
                u = he(o, "nodes", n),
                c = he(o, "edges", n),
                g = Ba(o),
                m = Qi({
                    modelValue: i,
                    nodes: u,
                    edges: c
                }, o, g);
            return function(e, t) {
                    const n = _();

                    function o(e) {
                        var t;
                        const o = function(e) {
                            const [t, ...n] = e.split(":");
                            return `on${t.replace(/(?:^|-)(\w)/g,(e,t)=>t.toUpperCase())}${n.length?`:${n.join(":")}`:""}`
                        }(e);
                        return !!(null == (t = null == n ? void 0 : n.vnode.props) ? void 0 : t[o])
                    }
                    E(() => {
                        for (const [n, r] of Object.entries(t.value)) {
                            const t = t => {
                                e(n, t)
                            };
                            r.setEmitter(t), q(r.removeEmitter), r.setHasEmitListeners(() => o(n)), q(r.removeHasEmitListeners)
                        }
                    })
                }(n, g.hooks),
                function() {
                    const e = Ba();
                    w(() => e.viewportHelper.value.viewportInitialized, t => {
                        t && setTimeout(() => {
                            e.emits.init(e), e.emits.paneReady(e)
                        }, 1)
                    })
                }(),
                function() {
                    const {
                        emits: e
                    } = Ba();
                    a(() => {
                        if (ki()) {
                            const t = document.querySelector(".vue-flow__pane");
                            t && "1" !== window.getComputedStyle(t).zIndex && e.error(new ci(ui.MISSING_STYLES))
                        }
                    })
                }(), U(Ri, r), f(m), t(g), (e, t) => (T(), s("div", {
                    ref: d(g).vueFlowRef,
                    class: "vue-flow"
                }, [v(Ha, null, {
                    default: p(() => [v(rs), ls, v(ss), l(e.$slots, "zoom-pane")]),
                    _: 3
                }), l(e.$slots, "default"), v(Ua)], 512))
        }
    }),
    ds = n({
        name: "Panel",
        compatConfig: {
            MODE: 3
        },
        props: {
            position: {}
        },
        setup(e) {
            const t = e,
                {
                    userSelectionActive: n
                } = Ba(),
                o = i(() => `${t.position}`.split("-"));
            return (e, t) => (T(), s("div", {
                class: u(["vue-flow__panel", o.value]),
                style: b({
                    pointerEvents: d(n) ? "none" : "all"
                })
            }, [l(e.$slots, "default")], 6))
        }
    });
var cs = (e => (e.Lines = "lines", e.Dots = "dots", e))(cs || {});
const hs = function({
        dimensions: e,
        size: t,
        color: n
    }) {
        return B("path", {
            stroke: n,
            "stroke-width": t,
            d: `M${e[0]/2} 0 V${e[1]} M0 ${e[1]/2} H${e[0]}`
        })
    },
    fs = function({
        radius: e,
        color: t
    }) {
        return B("circle", {
            cx: e,
            cy: e,
            r: e,
            fill: t
        })
    };
cs.Lines, cs.Dots;
const vs = {
        [cs.Dots]: "#81818a",
        [cs.Lines]: "#eee"
    },
    ps = ["id", "x", "y", "width", "height", "patternTransform"],
    gs = {
        key: 2,
        height: "100",
        width: "100"
    },
    ms = ["fill"],
    ys = ["x", "y", "fill"],
    ws = n({
        name: "Background",
        compatConfig: {
            MODE: 3
        },
        props: {
            id: {},
            variant: {
                default: () => cs.Dots
            },
            gap: {
                default: 20
            },
            size: {
                default: 1
            },
            lineWidth: {
                default: 1
            },
            patternColor: {},
            color: {},
            bgColor: {},
            height: {
                default: 100
            },
            width: {
                default: 100
            },
            x: {
                default: 0
            },
            y: {
                default: 0
            },
            offset: {
                default: 0
            }
        },
        setup(e) {
            const {
                id: t,
                viewport: n
            } = Ba(), r = i(() => {
                const t = n.value.zoom,
                    [o, r] = Array.isArray(e.gap) ? e.gap : [e.gap, e.gap],
                    i = [o * t || 1, r * t || 1],
                    a = e.size * t,
                    [s, l] = Array.isArray(e.offset) ? e.offset : [e.offset, e.offset];
                return {
                    scaledGap: i,
                    offset: [s * t || 1 + i[0] / 2, l * t || 1 + i[1] / 2],
                    size: a
                }
            }), a = o(() => `pattern-${t}${e.id?`-${e.id}`:""}`), u = o(() => e.color || e.patternColor || vs[e.variant || cs.Dots]);
            return (e, t) => (T(), s("svg", {
                class: "vue-flow__background vue-flow__container",
                style: b({
                    height: `${e.height>100?100:e.height}%`,
                    width: `${e.width>100?100:e.width}%`
                })
            }, [l(e.$slots, "pattern-container", {
                id: a.value
            }, () => [N("pattern", {
                id: a.value,
                x: d(n).x % r.value.scaledGap[0],
                y: d(n).y % r.value.scaledGap[1],
                width: r.value.scaledGap[0],
                height: r.value.scaledGap[1],
                patternTransform: `translate(-${r.value.offset[0]},-${r.value.offset[1]})`,
                patternUnits: "userSpaceOnUse"
            }, [l(e.$slots, "pattern", {}, () => [e.variant === d(cs).Lines ? (T(), D(d(hs), {
                key: 0,
                size: e.lineWidth,
                color: u.value,
                dimensions: r.value.scaledGap
            }, null, 8, ["size", "color", "dimensions"])) : e.variant === d(cs).Dots ? (T(), D(d(fs), {
                key: 1,
                color: u.value,
                radius: r.value.size / 2
            }, null, 8, ["color", "radius"])) : k("", !0), e.bgColor ? (T(), s("svg", gs, [N("rect", {
                width: "100%",
                height: "100%",
                fill: e.bgColor
            }, null, 8, ms)])) : k("", !0)])], 8, ps)]), N("rect", {
                x: e.x,
                y: e.y,
                width: "100%",
                height: "100%",
                fill: `url(#${a.value})`
            }, null, 8, ys), l(e.$slots, "default", {
                id: a.value
            })], 4))
        }
    }),
    bs = {
        type: "button",
        class: "vue-flow__controls-button"
    };
const _s = ((e, t) => {
        const n = e.__vccOpts || e;
        for (const [o, r] of t) n[o] = r;
        return n
    })({
        name: "ControlButton",
        compatConfig: {
            MODE: 3
        }
    }, [
        ["render", function(e, t, n, o, r, i) {
            return T(), s("button", bs, [l(e.$slots, "default")])
        }]
    ]),
    Es = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 32 32"
    },
    xs = [N("path", {
        d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"
    }, null, -1)];
const Ns = {
        render: function(e, t) {
            return T(), s("svg", Es, xs)
        }
    },
    ks = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 32 5"
    },
    Ss = [N("path", {
        d: "M0 0h32v4.2H0z"
    }, null, -1)];
const Ms = {
        render: function(e, t) {
            return T(), s("svg", ks, Ss)
        }
    },
    Is = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 32 30"
    },
    Cs = [N("path", {
        d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0 0 27.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94a.919.919 0 0 1-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"
    }, null, -1)];
const Os = {
        render: function(e, t) {
            return T(), s("svg", Is, Cs)
        }
    },
    Ps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 25 32"
    },
    Ts = [N("path", {
        d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 0 0 0 13.714v15.238A3.056 3.056 0 0 0 3.048 32h18.285a3.056 3.056 0 0 0 3.048-3.048V13.714a3.056 3.056 0 0 0-3.048-3.047zM12.19 24.533a3.056 3.056 0 0 1-3.047-3.047 3.056 3.056 0 0 1 3.047-3.048 3.056 3.056 0 0 1 3.048 3.048 3.056 3.056 0 0 1-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"
    }, null, -1)];
const Ds = {
        render: function(e, t) {
            return T(), s("svg", Ps, Ts)
        }
    },
    As = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 25 32"
    },
    $s = [N("path", {
        d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 0 0 0 13.714v15.238A3.056 3.056 0 0 0 3.048 32h18.285a3.056 3.056 0 0 0 3.048-3.048V13.714a3.056 3.056 0 0 0-3.048-3.047zM12.19 24.533a3.056 3.056 0 0 1-3.047-3.047 3.056 3.056 0 0 1 3.047-3.048 3.056 3.056 0 0 1 3.048 3.048 3.056 3.056 0 0 1-3.048 3.047z"
    }, null, -1)];
const zs = {
        render: function(e, t) {
            return T(), s("svg", As, $s)
        }
    },
    Bs = n({
        name: "Controls",
        compatConfig: {
            MODE: 3
        },
        props: {
            showZoom: {
                type: Boolean,
                default: !0
            },
            showFitView: {
                type: Boolean,
                default: !0
            },
            showInteractive: {
                type: Boolean,
                default: !0
            },
            fitViewParams: {},
            position: {
                default: () => sr.BottomLeft
            }
        },
        emits: ["zoomIn", "zoomOut", "fitView", "interactionChange"],
        setup(e, {
            emit: t
        }) {
            const {
                nodesDraggable: n,
                nodesConnectable: r,
                elementsSelectable: i,
                setInteractive: a,
                zoomIn: u,
                zoomOut: c,
                fitView: h,
                viewport: f,
                minZoom: g,
                maxZoom: m
            } = Ba(), y = o(() => n.value || r.value || i.value), w = o(() => f.value.zoom <= g.value), b = o(() => f.value.zoom >= m.value);

            function _() {
                u(), t("zoomIn")
            }

            function E() {
                c(), t("zoomOut")
            }

            function x() {
                h(e.fitViewParams), t("fitView")
            }

            function N() {
                a(!y.value), t("interactionChange", !y.value)
            }
            return (e, t) => (T(), D(d(ds), {
                class: "vue-flow__controls",
                position: e.position
            }, {
                default: p(() => [l(e.$slots, "top"), e.showZoom ? (T(), s(M, {
                    key: 0
                }, [l(e.$slots, "control-zoom-in", {}, () => [v(_s, {
                    class: "vue-flow__controls-zoomin",
                    disabled: b.value,
                    onClick: _
                }, {
                    default: p(() => [l(e.$slots, "icon-zoom-in", {}, () => [(T(), D(G(d(Ns))))])]),
                    _: 3
                }, 8, ["disabled"])]), l(e.$slots, "control-zoom-out", {}, () => [v(_s, {
                    class: "vue-flow__controls-zoomout",
                    disabled: w.value,
                    onClick: E
                }, {
                    default: p(() => [l(e.$slots, "icon-zoom-out", {}, () => [(T(), D(G(d(Ms))))])]),
                    _: 3
                }, 8, ["disabled"])])], 64)) : k("", !0), e.showFitView ? l(e.$slots, "control-fit-view", {
                    key: 1
                }, () => [v(_s, {
                    class: "vue-flow__controls-fitview",
                    onClick: x
                }, {
                    default: p(() => [l(e.$slots, "icon-fit-view", {}, () => [(T(), D(G(d(Os))))])]),
                    _: 3
                })]) : k("", !0), e.showInteractive ? l(e.$slots, "control-interactive", {
                    key: 2
                }, () => [e.showInteractive ? (T(), D(_s, {
                    key: 0,
                    class: "vue-flow__controls-interactive",
                    onClick: N
                }, {
                    default: p(() => [y.value ? l(e.$slots, "icon-unlock", {
                        key: 0
                    }, () => [(T(), D(G(d(zs))))]) : k("", !0), y.value ? k("", !0) : l(e.$slots, "icon-lock", {
                        key: 1
                    }, () => [(T(), D(G(d(Ds))))])]),
                    _: 3
                })) : k("", !0)]) : k("", !0), l(e.$slots, "default")]),
                _: 3
            }, 8, ["position"]))
        }
    });
var Ls = "\0";

function Vs(e, t) {
    e[t] ? e[t]++ : e[t] = 1
}

function Rs(e, t) {
    --e[t] || delete e[t]
}

function js(e, t, n, o) {
    var r = "" + t,
        i = "" + n;
    if (!e && r > i) {
        var a = r;
        r = i, i = a
    }
    return r + "" + i + "" + (void 0 === o ? "\0" : o)
}

function Gs(e, t) {
    return js(e, t.v, t.w, t.name)
}
var Hs = class {
        constructor(e) {
            t(this, "_isDirected", !0), t(this, "_isMultigraph", !1), t(this, "_isCompound", !1), t(this, "_label"), t(this, "_defaultNodeLabelFn", () => {}), t(this, "_defaultEdgeLabelFn", () => {}), t(this, "_nodes", {}), t(this, "_in", {}), t(this, "_preds", {}), t(this, "_out", {}), t(this, "_sucs", {}), t(this, "_edgeObjs", {}), t(this, "_edgeLabels", {}), t(this, "_nodeCount", 0), t(this, "_edgeCount", 0), t(this, "_parent"), t(this, "_children"), e && (this._isDirected = !Object.hasOwn(e, "directed") || e.directed, this._isMultigraph = !!Object.hasOwn(e, "multigraph") && e.multigraph, this._isCompound = !!Object.hasOwn(e, "compound") && e.compound), this._isCompound && (this._parent = {}, this._children = {}, this._children[Ls] = {})
        }
        isDirected() {
            return this._isDirected
        }
        isMultigraph() {
            return this._isMultigraph
        }
        isCompound() {
            return this._isCompound
        }
        setGraph(e) {
            return this._label = e, this
        }
        graph() {
            return this._label
        }
        setDefaultNodeLabel(e) {
            return this._defaultNodeLabelFn = e, "function" != typeof e && (this._defaultNodeLabelFn = () => e), this
        }
        nodeCount() {
            return this._nodeCount
        }
        nodes() {
            return Object.keys(this._nodes)
        }
        sources() {
            var e = this;
            return this.nodes().filter(t => 0 === Object.keys(e._in[t]).length)
        }
        sinks() {
            var e = this;
            return this.nodes().filter(t => 0 === Object.keys(e._out[t]).length)
        }
        setNodes(e, t) {
            var n = arguments,
                o = this;
            return e.forEach(function(e) {
                n.length > 1 ? o.setNode(e, t) : o.setNode(e)
            }), this
        }
        setNode(e, t) {
            return Object.hasOwn(this._nodes, e) ? (arguments.length > 1 && (this._nodes[e] = t), this) : (this._nodes[e] = arguments.length > 1 ? t : this._defaultNodeLabelFn(e), this._isCompound && (this._parent[e] = Ls, this._children[e] = {}, this._children[Ls][e] = !0), this._in[e] = {}, this._preds[e] = {}, this._out[e] = {}, this._sucs[e] = {}, ++this._nodeCount, this)
        }
        node(e) {
            return this._nodes[e]
        }
        hasNode(e) {
            return Object.hasOwn(this._nodes, e)
        }
        removeNode(e) {
            var t = this;
            if (Object.hasOwn(this._nodes, e)) {
                var n = e => t.removeEdge(t._edgeObjs[e]);
                delete this._nodes[e], this._isCompound && (this._removeFromParentsChildList(e), delete this._parent[e], this.children(e).forEach(function(e) {
                    t.setParent(e)
                }), delete this._children[e]), Object.keys(this._in[e]).forEach(n), delete this._in[e], delete this._preds[e], Object.keys(this._out[e]).forEach(n), delete this._out[e], delete this._sucs[e], --this._nodeCount
            }
            return this
        }
        setParent(e, t) {
            if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
            if (void 0 === t) t = Ls;
            else {
                for (var n = t += ""; void 0 !== n; n = this.parent(n))
                    if (n === e) throw new Error("Setting " + t + " as parent of " + e + " would create a cycle");
                this.setNode(t)
            }
            return this.setNode(e), this._removeFromParentsChildList(e), this._parent[e] = t, this._children[t][e] = !0, this
        }
        _removeFromParentsChildList(e) {
            delete this._children[this._parent[e]][e]
        }
        parent(e) {
            if (this._isCompound) {
                var t = this._parent[e];
                if (t !== Ls) return t
            }
        }
        children(e = Ls) {
            if (this._isCompound) {
                var t = this._children[e];
                if (t) return Object.keys(t)
            } else {
                if (e === Ls) return this.nodes();
                if (this.hasNode(e)) return []
            }
        }
        predecessors(e) {
            var t = this._preds[e];
            if (t) return Object.keys(t)
        }
        successors(e) {
            var t = this._sucs[e];
            if (t) return Object.keys(t)
        }
        neighbors(e) {
            var t = this.predecessors(e);
            if (t) {
                const o = new Set(t);
                for (var n of this.successors(e)) o.add(n);
                return Array.from(o.values())
            }
        }
        isLeaf(e) {
            return 0 === (this.isDirected() ? this.successors(e) : this.neighbors(e)).length
        }
        filterNodes(e) {
            var t = new this.constructor({
                directed: this._isDirected,
                multigraph: this._isMultigraph,
                compound: this._isCompound
            });
            t.setGraph(this.graph());
            var n = this;
            Object.entries(this._nodes).forEach(function([n, o]) {
                e(n) && t.setNode(n, o)
            }), Object.values(this._edgeObjs).forEach(function(e) {
                t.hasNode(e.v) && t.hasNode(e.w) && t.setEdge(e, n.edge(e))
            });
            var o = {};

            function r(e) {
                var i = n.parent(e);
                return void 0 === i || t.hasNode(i) ? (o[e] = i, i) : i in o ? o[i] : r(i)
            }
            return this._isCompound && t.nodes().forEach(e => t.setParent(e, r(e))), t
        }
        setDefaultEdgeLabel(e) {
            return this._defaultEdgeLabelFn = e, "function" != typeof e && (this._defaultEdgeLabelFn = () => e), this
        }
        edgeCount() {
            return this._edgeCount
        }
        edges() {
            return Object.values(this._edgeObjs)
        }
        setPath(e, t) {
            var n = this,
                o = arguments;
            return e.reduce(function(e, r) {
                return o.length > 1 ? n.setEdge(e, r, t) : n.setEdge(e, r), r
            }), this
        }
        setEdge() {
            var e, t, n, o, r = !1,
                i = arguments[0];
            "object" == typeof i && null !== i && "v" in i ? (e = i.v, t = i.w, n = i.name, 2 === arguments.length && (o = arguments[1], r = !0)) : (e = i, t = arguments[1], n = arguments[3], arguments.length > 2 && (o = arguments[2], r = !0)), e = "" + e, t = "" + t, void 0 !== n && (n = "" + n);
            var a = js(this._isDirected, e, t, n);
            if (Object.hasOwn(this._edgeLabels, a)) return r && (this._edgeLabels[a] = o), this;
            if (void 0 !== n && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
            this.setNode(e), this.setNode(t), this._edgeLabels[a] = r ? o : this._defaultEdgeLabelFn(e, t, n);
            var s = function(e, t, n, o) {
                var r = "" + t,
                    i = "" + n;
                if (!e && r > i) {
                    var a = r;
                    r = i, i = a
                }
                var s = {
                    v: r,
                    w: i
                };
                o && (s.name = o);
                return s
            }(this._isDirected, e, t, n);
            return e = s.v, t = s.w, Object.freeze(s), this._edgeObjs[a] = s, Vs(this._preds[t], e), Vs(this._sucs[e], t), this._in[t][a] = s, this._out[e][a] = s, this._edgeCount++, this
        }
        edge(e, t, n) {
            var o = 1 === arguments.length ? Gs(this._isDirected, arguments[0]) : js(this._isDirected, e, t, n);
            return this._edgeLabels[o]
        }
        edgeAsObj() {
            const e = this.edge(...arguments);
            return "object" != typeof e ? {
                label: e
            } : e
        }
        hasEdge(e, t, n) {
            var o = 1 === arguments.length ? Gs(this._isDirected, arguments[0]) : js(this._isDirected, e, t, n);
            return Object.hasOwn(this._edgeLabels, o)
        }
        removeEdge(e, t, n) {
            var o = 1 === arguments.length ? Gs(this._isDirected, arguments[0]) : js(this._isDirected, e, t, n),
                r = this._edgeObjs[o];
            return r && (e = r.v, t = r.w, delete this._edgeLabels[o], delete this._edgeObjs[o], Rs(this._preds[t], e), Rs(this._sucs[e], t), delete this._in[t][o], delete this._out[e][o], this._edgeCount--), this
        }
        inEdges(e, t) {
            var n = this._in[e];
            if (n) {
                var o = Object.values(n);
                return t ? o.filter(e => e.v === t) : o
            }
        }
        outEdges(e, t) {
            var n = this._out[e];
            if (n) {
                var o = Object.values(n);
                return t ? o.filter(e => e.w === t) : o
            }
        }
        nodeEdges(e, t) {
            var n = this.inEdges(e, t);
            if (n) return n.concat(this.outEdges(e, t))
        }
    },
    Fs = {
        Graph: Hs,
        version: "2.2.4"
    },
    Ys = Hs,
    Xs = {
        write: function(e) {
            var t = {
                options: {
                    directed: e.isDirected(),
                    multigraph: e.isMultigraph(),
                    compound: e.isCompound()
                },
                nodes: Us(e),
                edges: Zs(e)
            };
            void 0 !== e.graph() && (t.value = structuredClone(e.graph()));
            return t
        },
        read: function(e) {
            var t = new Ys(e.options).setGraph(e.value);
            return e.nodes.forEach(function(e) {
                t.setNode(e.v, e.value), e.parent && t.setParent(e.v, e.parent)
            }), e.edges.forEach(function(e) {
                t.setEdge({
                    v: e.v,
                    w: e.w,
                    name: e.name
                }, e.value)
            }), t
        }
    };

function Us(e) {
    return e.nodes().map(function(t) {
        var n = e.node(t),
            o = e.parent(t),
            r = {
                v: t
            };
        return void 0 !== n && (r.value = n), void 0 !== o && (r.parent = o), r
    })
}

function Zs(e) {
    return e.edges().map(function(t) {
        var n = e.edge(t),
            o = {
                v: t.v,
                w: t.w
            };
        return void 0 !== t.name && (o.name = t.name), void 0 !== n && (o.value = n), o
    })
}
var Ws = function(e) {
    var t, n = {},
        o = [];

    function r(o) {
        Object.hasOwn(n, o) || (n[o] = !0, t.push(o), e.successors(o).forEach(r), e.predecessors(o).forEach(r))
    }
    return e.nodes().forEach(function(e) {
        t = [], r(e), t.length && o.push(t)
    }), o
};
var qs = class {
        constructor() {
            t(this, "_arr", []), t(this, "_keyIndices", {})
        }
        size() {
            return this._arr.length
        }
        keys() {
            return this._arr.map(function(e) {
                return e.key
            })
        }
        has(e) {
            return Object.hasOwn(this._keyIndices, e)
        }
        priority(e) {
            var t = this._keyIndices[e];
            if (void 0 !== t) return this._arr[t].priority
        }
        min() {
            if (0 === this.size()) throw new Error("Queue underflow");
            return this._arr[0].key
        }
        add(e, t) {
            var n = this._keyIndices;
            if (e = String(e), !Object.hasOwn(n, e)) {
                var o = this._arr,
                    r = o.length;
                return n[e] = r, o.push({
                    key: e,
                    priority: t
                }), this._decrease(r), !0
            }
            return !1
        }
        removeMin() {
            this._swap(0, this._arr.length - 1);
            var e = this._arr.pop();
            return delete this._keyIndices[e.key], this._heapify(0), e.key
        }
        decrease(e, t) {
            var n = this._keyIndices[e];
            if (t > this._arr[n].priority) throw new Error("New priority is greater than current priority. Key: " + e + " Old: " + this._arr[n].priority + " New: " + t);
            this._arr[n].priority = t, this._decrease(n)
        }
        _heapify(e) {
            var t = this._arr,
                n = 2 * e,
                o = n + 1,
                r = e;
            n < t.length && (r = t[n].priority < t[r].priority ? n : r, o < t.length && (r = t[o].priority < t[r].priority ? o : r), r !== e && (this._swap(e, r), this._heapify(r)))
        }
        _decrease(e) {
            for (var t, n = this._arr, o = n[e].priority; 0 !== e && !(n[t = e >> 1].priority < o);) this._swap(e, t), e = t
        }
        _swap(e, t) {
            var n = this._arr,
                o = this._keyIndices,
                r = n[e],
                i = n[t];
            n[e] = i, n[t] = r, o[i.key] = e, o[r.key] = t
        }
    },
    Ks = qs,
    Js = function(e, t, n, o) {
        return function(e, t, n, o) {
            var r, i, a = {},
                s = new Ks,
                l = function(e) {
                    var t = e.v !== r ? e.v : e.w,
                        o = a[t],
                        l = n(e),
                        u = i.distance + l;
                    if (l < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + e + " Weight: " + l);
                    u < o.distance && (o.distance = u, o.predecessor = r, s.decrease(t, u))
                };
            e.nodes().forEach(function(e) {
                var n = e === t ? 0 : Number.POSITIVE_INFINITY;
                a[e] = {
                    distance: n
                }, s.add(e, n)
            });
            for (; s.size() > 0 && (r = s.removeMin(), (i = a[r]).distance !== Number.POSITIVE_INFINITY);) o(r).forEach(l);
            return a
        }(e, String(t), n || Qs, o || function(t) {
            return e.outEdges(t)
        })
    },
    Qs = () => 1;
var el = Js,
    tl = function(e, t, n) {
        return e.nodes().reduce(function(o, r) {
            return o[r] = el(e, r, t, n), o
        }, {})
    };
var nl = function(e) {
    var t = 0,
        n = [],
        o = {},
        r = [];

    function i(a) {
        var s = o[a] = {
            onStack: !0,
            lowlink: t,
            index: t++
        };
        if (n.push(a), e.successors(a).forEach(function(e) {
                Object.hasOwn(o, e) ? o[e].onStack && (s.lowlink = Math.min(s.lowlink, o[e].index)) : (i(e), s.lowlink = Math.min(s.lowlink, o[e].lowlink))
            }), s.lowlink === s.index) {
            var l, u = [];
            do {
                l = n.pop(), o[l].onStack = !1, u.push(l)
            } while (a !== l);
            r.push(u)
        }
    }
    return e.nodes().forEach(function(e) {
        Object.hasOwn(o, e) || i(e)
    }), r
};
var ol = nl,
    rl = function(e) {
        return ol(e).filter(function(t) {
            return t.length > 1 || 1 === t.length && e.hasEdge(t[0], t[0])
        })
    };
var il = function(e, t, n) {
        return function(e, t, n) {
            var o = {},
                r = e.nodes();
            return r.forEach(function(e) {
                o[e] = {}, o[e][e] = {
                    distance: 0
                }, r.forEach(function(t) {
                    e !== t && (o[e][t] = {
                        distance: Number.POSITIVE_INFINITY
                    })
                }), n(e).forEach(function(n) {
                    var r = n.v === e ? n.w : n.v,
                        i = t(n);
                    o[e][r] = {
                        distance: i,
                        predecessor: e
                    }
                })
            }), r.forEach(function(e) {
                var t = o[e];
                r.forEach(function(n) {
                    var i = o[n];
                    r.forEach(function(n) {
                        var o = i[e],
                            r = t[n],
                            a = i[n],
                            s = o.distance + r.distance;
                        s < a.distance && (a.distance = s, a.predecessor = r.predecessor)
                    })
                })
            }), o
        }(e, t || al, n || function(t) {
            return e.outEdges(t)
        })
    },
    al = () => 1;

function sl(e) {
    var t = {},
        n = {},
        o = [];
    if (e.sinks().forEach(function r(i) {
            if (Object.hasOwn(n, i)) throw new ll;
            Object.hasOwn(t, i) || (n[i] = !0, t[i] = !0, e.predecessors(i).forEach(r), delete n[i], o.push(i))
        }), Object.keys(t).length !== e.nodeCount()) throw new ll;
    return o
}
class ll extends Error {
    constructor() {
        super(...arguments)
    }
}
var ul = sl;
sl.CycleException = ll;
var dl = ul;
var cl = function(e, t, n) {
    Array.isArray(t) || (t = [t]);
    var o = e.isDirected() ? t => e.successors(t) : t => e.neighbors(t),
        r = "post" === n ? hl : fl,
        i = [],
        a = {};
    return t.forEach(t => {
        if (!e.hasNode(t)) throw new Error("Graph does not have node: " + t);
        r(t, o, a, i)
    }), i
};

function hl(e, t, n, o) {
    for (var r = [
            [e, !1]
        ]; r.length > 0;) {
        var i = r.pop();
        i[1] ? o.push(i[0]) : Object.hasOwn(n, i[0]) || (n[i[0]] = !0, r.push([i[0], !0]), vl(t(i[0]), e => r.push([e, !1])))
    }
}

function fl(e, t, n, o) {
    for (var r = [e]; r.length > 0;) {
        var i = r.pop();
        Object.hasOwn(n, i) || (n[i] = !0, o.push(i), vl(t(i), e => r.push(e)))
    }
}

function vl(e, t) {
    for (var n = e.length; n--;) t(e[n], n, e);
    return e
}
var pl = cl;
var gl = cl;
var ml = Hs,
    yl = qs;
var wl = {
    Graph: Fs.Graph,
    json: Xs,
    alg: {
        components: Ws,
        dijkstra: Js,
        dijkstraAll: tl,
        findCycles: rl,
        floydWarshall: il,
        isAcyclic: function(e) {
            try {
                dl(e)
            } catch (t) {
                if (t instanceof dl.CycleException) return !1;
                throw t
            }
            return !0
        },
        postorder: function(e, t) {
            return pl(e, t, "post")
        },
        preorder: function(e, t) {
            return gl(e, t, "pre")
        },
        prim: function(e, t) {
            var n, o = new ml,
                r = {},
                i = new yl;

            function a(e) {
                var o = e.v === n ? e.w : e.v,
                    a = i.priority(o);
                if (void 0 !== a) {
                    var s = t(e);
                    s < a && (r[o] = n, i.decrease(o, s))
                }
            }
            if (0 === e.nodeCount()) return o;
            e.nodes().forEach(function(e) {
                i.add(e, Number.POSITIVE_INFINITY), o.setNode(e)
            }), i.decrease(e.nodes()[0], 0);
            var s = !1;
            for (; i.size() > 0;) {
                if (n = i.removeMin(), Object.hasOwn(r, n)) o.setEdge(n, r[n]);
                else {
                    if (s) throw new Error("Input graph is not connected: " + e);
                    s = !0
                }
                e.nodeEdges(n).forEach(a)
            }
            return o
        },
        tarjan: nl,
        topsort: ul
    },
    version: Fs.version
};

function bl(e) {
    e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev
}

function _l(e, t) {
    if ("_next" !== e && "_prev" !== e) return t
}
let El = wl.Graph,
    xl = class {
        constructor() {
            let e = {};
            e._next = e._prev = e, this._sentinel = e
        }
        dequeue() {
            let e = this._sentinel,
                t = e._prev;
            if (t !== e) return bl(t), t
        }
        enqueue(e) {
            let t = this._sentinel;
            e._prev && e._next && bl(e), e._next = t._next, t._next._prev = e, t._next = e, e._prev = t
        }
        toString() {
            let e = [],
                t = this._sentinel,
                n = t._prev;
            for (; n !== t;) e.push(JSON.stringify(n, _l)), n = n._prev;
            return "[" + e.join(", ") + "]"
        }
    };
var Nl = function(e, t) {
    if (e.nodeCount() <= 1) return [];
    let n = function(e, t) {
        let n = new El,
            o = 0,
            r = 0;
        e.nodes().forEach(e => {
            n.setNode(e, {
                v: e,
                in: 0,
                out: 0
            })
        }), e.edges().forEach(e => {
            let i = n.edge(e.v, e.w) || 0,
                a = t(e),
                s = i + a;
            n.setEdge(e.v, e.w, s), r = Math.max(r, n.node(e.v).out += a), o = Math.max(o, n.node(e.w).in += a)
        });
        let i = function(e) {
                const t = [];
                for (let n = 0; n < e; n++) t.push(n);
                return t
            }(r + o + 3).map(() => new xl),
            a = o + 1;
        return n.nodes().forEach(e => {
            Ml(i, a, n.node(e))
        }), {
            graph: n,
            buckets: i,
            zeroIdx: a
        }
    }(e, t || kl);
    return function(e, t, n) {
        let o, r = [],
            i = t[t.length - 1],
            a = t[0];
        for (; e.nodeCount();) {
            for (; o = a.dequeue();) Sl(e, t, n, o);
            for (; o = i.dequeue();) Sl(e, t, n, o);
            if (e.nodeCount())
                for (let i = t.length - 2; i > 0; --i)
                    if (o = t[i].dequeue(), o) {
                        r = r.concat(Sl(e, t, n, o, !0));
                        break
                    }
        }
        return r
    }(n.graph, n.buckets, n.zeroIdx).flatMap(t => e.outEdges(t.v, t.w))
};
let kl = () => 1;

function Sl(e, t, n, o, r) {
    let i = r ? [] : void 0;
    return e.inEdges(o.v).forEach(o => {
        let a = e.edge(o),
            s = e.node(o.v);
        r && i.push({
            v: o.v,
            w: o.w
        }), s.out -= a, Ml(t, n, s)
    }), e.outEdges(o.v).forEach(o => {
        let r = e.edge(o),
            i = o.w,
            a = e.node(i);
        a.in -= r, Ml(t, n, a)
    }), e.removeNode(o.v), i
}

function Ml(e, t, n) {
    n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n)
}
let Il = wl.Graph;
var Cl = {
    addBorderNode: function(e, t, n, o) {
        let r = {
            width: 0,
            height: 0
        };
        arguments.length >= 4 && (r.rank = n, r.order = o);
        return Ol(e, "border", r, t)
    },
    addDummyNode: Ol,
    applyWithChunking: Tl,
    asNonCompoundGraph: function(e) {
        let t = new Il({
            multigraph: e.isMultigraph()
        }).setGraph(e.graph());
        return e.nodes().forEach(n => {
            e.children(n).length || t.setNode(n, e.node(n))
        }), e.edges().forEach(n => {
            t.setEdge(n, e.edge(n))
        }), t
    },
    buildLayerMatrix: function(e) {
        let t = zl(Dl(e) + 1).map(() => []);
        return e.nodes().forEach(n => {
            let o = e.node(n),
                r = o.rank;
            void 0 !== r && (t[r][o.order] = n)
        }), t
    },
    intersectRect: function(e, t) {
        let n, o, r = e.x,
            i = e.y,
            a = t.x - r,
            s = t.y - i,
            l = e.width / 2,
            u = e.height / 2;
        if (!a && !s) throw new Error("Not possible to find intersection inside of the rectangle");
        Math.abs(s) * l > Math.abs(a) * u ? (s < 0 && (u = -u), n = u * a / s, o = u) : (a < 0 && (l = -l), n = l, o = l * s / a);
        return {
            x: r + n,
            y: i + o
        }
    },
    mapValues: function(e, t) {
        let n = t;
        "string" == typeof t && (n = e => e[t]);
        return Object.entries(e).reduce((e, [t, o]) => (e[t] = n(o, t), e), {})
    },
    maxRank: Dl,
    normalizeRanks: function(e) {
        let t = e.nodes().map(t => {
                let n = e.node(t).rank;
                return void 0 === n ? Number.MAX_VALUE : n
            }),
            n = Tl(Math.min, t);
        e.nodes().forEach(t => {
            let o = e.node(t);
            Object.hasOwn(o, "rank") && (o.rank -= n)
        })
    },
    notime: function(e, t) {
        return t()
    },
    partition: function(e, t) {
        let n = {
            lhs: [],
            rhs: []
        };
        return e.forEach(e => {
            t(e) ? n.lhs.push(e) : n.rhs.push(e)
        }), n
    },
    pick: function(e, t) {
        const n = {};
        for (const o of t) void 0 !== e[o] && (n[o] = e[o]);
        return n
    },
    predecessorWeights: function(e) {
        let t = e.nodes().map(t => {
            let n = {};
            return e.inEdges(t).forEach(t => {
                n[t.v] = (n[t.v] || 0) + e.edge(t).weight
            }), n
        });
        return Bl(e.nodes(), t)
    },
    range: zl,
    removeEmptyRanks: function(e) {
        let t = e.nodes().map(t => e.node(t).rank),
            n = Tl(Math.min, t),
            o = [];
        e.nodes().forEach(t => {
            let r = e.node(t).rank - n;
            o[r] || (o[r] = []), o[r].push(t)
        });
        let r = 0,
            i = e.graph().nodeRankFactor;
        Array.from(o).forEach((t, n) => {
            void 0 === t && n % i !== 0 ? --r : void 0 !== t && r && t.forEach(t => e.node(t).rank += r)
        })
    },
    simplify: function(e) {
        let t = (new Il).setGraph(e.graph());
        return e.nodes().forEach(n => t.setNode(n, e.node(n))), e.edges().forEach(n => {
            let o = t.edge(n.v, n.w) || {
                    weight: 0,
                    minlen: 1
                },
                r = e.edge(n);
            t.setEdge(n.v, n.w, {
                weight: o.weight + r.weight,
                minlen: Math.max(o.minlen, r.minlen)
            })
        }), t
    },
    successorWeights: function(e) {
        let t = e.nodes().map(t => {
            let n = {};
            return e.outEdges(t).forEach(t => {
                n[t.w] = (n[t.w] || 0) + e.edge(t).weight
            }), n
        });
        return Bl(e.nodes(), t)
    },
    time: function(e, t) {
        Date.now();
        try {
            return t()
        } finally {}
    },
    uniqueId: $l,
    zipObject: Bl
};

function Ol(e, t, n, o) {
    for (var r = o; e.hasNode(r);) r = $l(o);
    return n.dummy = t, e.setNode(r, n), r
}
const Pl = 65535;

function Tl(e, t) {
    if (t.length > Pl) {
        const n = function(e, t = Pl) {
            const n = [];
            for (let o = 0; o < e.length; o += t) {
                const r = e.slice(o, o + t);
                n.push(r)
            }
            return n
        }(t);
        return e.apply(null, n.map(t => e.apply(null, t)))
    }
    return e.apply(null, t)
}

function Dl(e) {
    const t = e.nodes().map(t => {
        let n = e.node(t).rank;
        return void 0 === n ? Number.MIN_VALUE : n
    });
    return Tl(Math.max, t)
}
let Al = 0;

function $l(e) {
    return e + "" + ++Al
}

function zl(e, t, n = 1) {
    null == t && (t = e, e = 0);
    let o = e => e < t;
    n < 0 && (o = e => t < e);
    const r = [];
    for (let i = e; o(i); i += n) r.push(i);
    return r
}

function Bl(e, t) {
    return e.reduce((e, n, o) => (e[n] = t[o], e), {})
}
let Ll = Nl,
    Vl = Cl.uniqueId;
var Rl = {
    run: function(e) {
        ("greedy" === e.graph().acyclicer ? Ll(e, (t = e, e => t.edge(e).weight)) : function(e) {
            let t = [],
                n = {},
                o = {};

            function r(i) {
                Object.hasOwn(o, i) || (o[i] = !0, n[i] = !0, e.outEdges(i).forEach(e => {
                    Object.hasOwn(n, e.w) ? t.push(e) : r(e.w)
                }), delete n[i])
            }
            return e.nodes().forEach(r), t
        }(e)).forEach(t => {
            let n = e.edge(t);
            e.removeEdge(t), n.forwardName = t.name, n.reversed = !0, e.setEdge(t.w, t.v, n, Vl("rev"))
        });
        var t
    },
    undo: function(e) {
        e.edges().forEach(t => {
            let n = e.edge(t);
            if (n.reversed) {
                e.removeEdge(t);
                let o = n.forwardName;
                delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o)
            }
        })
    }
};
let jl = Cl;
var Gl = {
    run: function(e) {
        e.graph().dummyChains = [], e.edges().forEach(t => function(e, t) {
            let n, o, r, i = t.v,
                a = e.node(i).rank,
                s = t.w,
                l = e.node(s).rank,
                u = t.name,
                d = e.edge(t),
                c = d.labelRank;
            if (l === a + 1) return;
            for (e.removeEdge(t), r = 0, ++a; a < l; ++r, ++a) d.points = [], o = {
                width: 0,
                height: 0,
                edgeLabel: d,
                edgeObj: t,
                rank: a
            }, n = jl.addDummyNode(e, "edge", o, "_d"), a === c && (o.width = d.width, o.height = d.height, o.dummy = "edge-label", o.labelpos = d.labelpos), e.setEdge(i, n, {
                weight: d.weight
            }, u), 0 === r && e.graph().dummyChains.push(n), i = n;
            e.setEdge(i, s, {
                weight: d.weight
            }, u)
        }(e, t))
    },
    undo: function(e) {
        e.graph().dummyChains.forEach(t => {
            let n, o = e.node(t),
                r = o.edgeLabel;
            for (e.setEdge(o.edgeObj, r); o.dummy;) n = e.successors(t)[0], e.removeNode(t), r.points.push({
                x: o.x,
                y: o.y
            }), "edge-label" === o.dummy && (r.x = o.x, r.y = o.y, r.width = o.width, r.height = o.height), t = n, o = e.node(t)
        })
    }
};
const {
    applyWithChunking: Hl
} = Cl;
var Fl = {
    longestPath: function(e) {
        var t = {};
        e.sources().forEach(function n(o) {
            var r = e.node(o);
            if (Object.hasOwn(t, o)) return r.rank;
            t[o] = !0;
            let i = e.outEdges(o).map(t => null == t ? Number.POSITIVE_INFINITY : n(t.w) - e.edge(t).minlen);
            var a = Hl(Math.min, i);
            return a === Number.POSITIVE_INFINITY && (a = 0), r.rank = a
        })
    },
    slack: function(e, t) {
        return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen
    }
};
var Yl = wl.Graph,
    Xl = Fl.slack,
    Ul = function(e) {
        var t, n, o = new Yl({
                directed: !1
            }),
            r = e.nodes()[0],
            i = e.nodeCount();
        o.setNode(r, {});
        for (; Zl(o, e) < i;) t = Wl(o, e), n = o.hasNode(t.v) ? Xl(e, t) : -Xl(e, t), ql(o, e, n);
        return o
    };

function Zl(e, t) {
    return e.nodes().forEach(function n(o) {
        t.nodeEdges(o).forEach(r => {
            var i = r.v,
                a = o === i ? r.w : i;
            e.hasNode(a) || Xl(t, r) || (e.setNode(a, {}), e.setEdge(o, a, {}), n(a))
        })
    }), e.nodeCount()
}

function Wl(e, t) {
    return t.edges().reduce((n, o) => {
        let r = Number.POSITIVE_INFINITY;
        return e.hasNode(o.v) !== e.hasNode(o.w) && (r = Xl(t, o)), r < n[0] ? [r, o] : n
    }, [Number.POSITIVE_INFINITY, null])[1]
}

function ql(e, t, n) {
    e.nodes().forEach(e => t.node(e).rank += n)
}
var Kl = Ul,
    Jl = Fl.slack,
    Ql = Fl.longestPath,
    eu = wl.alg.preorder,
    tu = wl.alg.postorder,
    nu = Cl.simplify,
    ou = ru;

function ru(e) {
    e = nu(e), Ql(e);
    var t, n = Kl(e);
    for (su(n), iu(n, e); t = uu(n);) cu(n, e, t, du(n, e, t))
}

function iu(e, t) {
    var n = tu(e, e.nodes());
    (n = n.slice(0, n.length - 1)).forEach(n => function(e, t, n) {
        var o = e.node(n),
            r = o.parent;
        e.edge(n, r).cutvalue = au(e, t, n)
    }(e, t, n))
}

function au(e, t, n) {
    var o = e.node(n).parent,
        r = !0,
        i = t.edge(n, o),
        a = 0;
    return i || (r = !1, i = t.edge(o, n)), a = i.weight, t.nodeEdges(n).forEach(i => {
        var s, l, u = i.v === n,
            d = u ? i.w : i.v;
        if (d !== o) {
            var c = u === r,
                h = t.edge(i).weight;
            if (a += c ? h : -h, s = n, l = d, e.hasEdge(s, l)) {
                var f = e.edge(n, d).cutvalue;
                a += c ? -f : f
            }
        }
    }), a
}

function su(e, t) {
    arguments.length < 2 && (t = e.nodes()[0]), lu(e, {}, 1, t)
}

function lu(e, t, n, o, r) {
    var i = n,
        a = e.node(o);
    return t[o] = !0, e.neighbors(o).forEach(r => {
        Object.hasOwn(t, r) || (n = lu(e, t, n, r, o))
    }), a.low = i, a.lim = n++, r ? a.parent = r : delete a.parent, n
}

function uu(e) {
    return e.edges().find(t => e.edge(t).cutvalue < 0)
}

function du(e, t, n) {
    var o = n.v,
        r = n.w;
    t.hasEdge(o, r) || (o = n.w, r = n.v);
    var i = e.node(o),
        a = e.node(r),
        s = i,
        l = !1;
    return i.lim > a.lim && (s = a, l = !0), t.edges().filter(t => l === hu(e, e.node(t.v), s) && l !== hu(e, e.node(t.w), s)).reduce((e, n) => Jl(t, n) < Jl(t, e) ? n : e)
}

function cu(e, t, n, o) {
    var r = n.v,
        i = n.w;
    e.removeEdge(r, i), e.setEdge(o.v, o.w, {}), su(e), iu(e, t),
        function(e, t) {
            var n = e.nodes().find(e => !t.node(e).parent),
                o = eu(e, n);
            (o = o.slice(1)).forEach(n => {
                var o = e.node(n).parent,
                    r = t.edge(n, o),
                    i = !1;
                r || (r = t.edge(o, n), i = !0), t.node(n).rank = t.node(o).rank + (i ? r.minlen : -r.minlen)
            })
        }(e, t)
}

function hu(e, t, n) {
    return n.low <= t.lim && t.lim <= n.lim
}
ru.initLowLimValues = su, ru.initCutValues = iu, ru.calcCutValue = au, ru.leaveEdge = uu, ru.enterEdge = du, ru.exchangeEdges = cu;
var fu = Fl.longestPath,
    vu = Ul,
    pu = ou,
    gu = function(e) {
        var t = e.graph().ranker;
        if (t instanceof Function) return t(e);
        switch (e.graph().ranker) {
            case "network-simplex":
            default:
                yu(e);
                break;
            case "tight-tree":
                ! function(e) {
                    fu(e), vu(e)
                }(e);
                break;
            case "longest-path":
                mu(e);
            case "none":
        }
    };
var mu = fu;

function yu(e) {
    pu(e)
}
let wu = Cl;

function bu(e, t, n, o, r, i, a) {
    let s = e.children(a);
    if (!s.length) return void(a !== t && e.setEdge(t, a, {
        weight: 0,
        minlen: n
    }));
    let l = wu.addBorderNode(e, "_bt"),
        u = wu.addBorderNode(e, "_bb"),
        d = e.node(a);
    e.setParent(l, a), d.borderTop = l, e.setParent(u, a), d.borderBottom = u, s.forEach(s => {
        bu(e, t, n, o, r, i, s);
        let d = e.node(s),
            c = d.borderTop ? d.borderTop : s,
            h = d.borderBottom ? d.borderBottom : s,
            f = d.borderTop ? o : 2 * o,
            v = c !== h ? 1 : r - i[a] + 1;
        e.setEdge(l, c, {
            weight: f,
            minlen: v,
            nestingEdge: !0
        }), e.setEdge(h, u, {
            weight: f,
            minlen: v,
            nestingEdge: !0
        })
    }), e.parent(a) || e.setEdge(t, l, {
        weight: 0,
        minlen: r + i[a]
    })
}
let _u = Cl;

function Eu(e, t, n, o, r, i) {
    let a = {
            width: 0,
            height: 0,
            rank: i,
            borderType: t
        },
        s = r[t][i - 1],
        l = _u.addDummyNode(e, "border", a, n);
    r[t][i] = l, e.setParent(l, o), s && e.setEdge(s, l, {
        weight: 1
    })
}

function xu(e) {
    e.nodes().forEach(t => Nu(e.node(t))), e.edges().forEach(t => Nu(e.edge(t)))
}

function Nu(e) {
    let t = e.width;
    e.width = e.height, e.height = t
}

function ku(e) {
    e.y = -e.y
}

function Su(e) {
    let t = e.x;
    e.x = e.y, e.y = t
}
let Mu = Cl;
let Iu = Cl.zipObject;

function Cu(e, t, n) {
    let o = Iu(n, n.map((e, t) => t)),
        r = t.flatMap(t => e.outEdges(t).map(t => ({
            pos: o[t.w],
            weight: e.edge(t).weight
        })).sort((e, t) => e.pos - t.pos)),
        i = 1;
    for (; i < n.length;) i <<= 1;
    let a = 2 * i - 1;
    i -= 1;
    let s = new Array(a).fill(0),
        l = 0;
    return r.forEach(e => {
        let t = e.pos + i;
        s[t] += e.weight;
        let n = 0;
        for (; t > 0;) t % 2 && (n += s[t + 1]), t = t - 1 >> 1, s[t] += e.weight;
        l += e.weight * n
    }), l
}
let Ou = Cl;
let Pu = Cl;

function Tu(e, t, n) {
    let o;
    for (; t.length && (o = t[t.length - 1]).i <= n;) t.pop(), e.push(o.vs), n++;
    return n
}
let Du = function(e, t = []) {
        return t.map(t => {
            let n = e.inEdges(t);
            if (n.length) {
                let o = n.reduce((t, n) => {
                    let o = e.edge(n),
                        r = e.node(n.v);
                    return {
                        sum: t.sum + o.weight * r.order,
                        weight: t.weight + o.weight
                    }
                }, {
                    sum: 0,
                    weight: 0
                });
                return {
                    v: t,
                    barycenter: o.sum / o.weight,
                    weight: o.weight
                }
            }
            return {
                v: t
            }
        })
    },
    Au = function(e, t) {
        let n = {};
        return e.forEach((e, t) => {
                let o = n[e.v] = {
                    indegree: 0,
                    in: [],
                    out: [],
                    vs: [e.v],
                    i: t
                };
                void 0 !== e.barycenter && (o.barycenter = e.barycenter, o.weight = e.weight)
            }), t.edges().forEach(e => {
                let t = n[e.v],
                    o = n[e.w];
                void 0 !== t && void 0 !== o && (o.indegree++, t.out.push(n[e.w]))
            }),
            function(e) {
                let t = [];

                function n(e) {
                    return t => {
                        t.merged || (void 0 === t.barycenter || void 0 === e.barycenter || t.barycenter >= e.barycenter) && function(e, t) {
                            let n = 0,
                                o = 0;
                            e.weight && (n += e.barycenter * e.weight, o += e.weight);
                            t.weight && (n += t.barycenter * t.weight, o += t.weight);
                            e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0
                        }(e, t)
                    }
                }

                function o(t) {
                    return n => {
                        n.in.push(t), 0 === --n.indegree && e.push(n)
                    }
                }
                for (; e.length;) {
                    let r = e.pop();
                    t.push(r), r.in.reverse().forEach(n(r)), r.out.forEach(o(r))
                }
                return t.filter(e => !e.merged).map(e => Ou.pick(e, ["vs", "i", "barycenter", "weight"]))
            }(Object.values(n).filter(e => !e.indegree))
    },
    $u = function(e, t) {
        let n = Pu.partition(e, e => Object.hasOwn(e, "barycenter")),
            o = n.lhs,
            r = n.rhs.sort((e, t) => t.i - e.i),
            i = [],
            a = 0,
            s = 0,
            l = 0;
        o.sort((u = !!t, (e, t) => e.barycenter < t.barycenter ? -1 : e.barycenter > t.barycenter ? 1 : u ? t.i - e.i : e.i - t.i)), l = Tu(i, r, l), o.forEach(e => {
            l += e.vs.length, i.push(e.vs), a += e.barycenter * e.weight, s += e.weight, l = Tu(i, r, l)
        });
        var u;
        let d = {
            vs: i.flat(!0)
        };
        s && (d.barycenter = a / s, d.weight = s);
        return d
    };
var zu = function e(t, n, o, r) {
    let i = t.children(n),
        a = t.node(n),
        s = a ? a.borderLeft : void 0,
        l = a ? a.borderRight : void 0,
        u = {};
    s && (i = i.filter(e => e !== s && e !== l));
    let d = Du(t, i);
    d.forEach(n => {
        if (t.children(n.v).length) {
            let s = e(t, n.v, o, r);
            u[n.v] = s, Object.hasOwn(s, "barycenter") && (a = s, void 0 !== (i = n).barycenter ? (i.barycenter = (i.barycenter * i.weight + a.barycenter * a.weight) / (i.weight + a.weight), i.weight += a.weight) : (i.barycenter = a.barycenter, i.weight = a.weight))
        }
        var i, a
    });
    let c = Au(d, o);
    ! function(e, t) {
        e.forEach(e => {
            e.vs = e.vs.flatMap(e => t[e] ? t[e].vs : e)
        })
    }(c, u);
    let h = $u(c, r);
    if (s && (h.vs = [s, h.vs, l].flat(!0), t.predecessors(s).length)) {
        let e = t.node(t.predecessors(s)[0]),
            n = t.node(t.predecessors(l)[0]);
        Object.hasOwn(h, "barycenter") || (h.barycenter = 0, h.weight = 0), h.barycenter = (h.barycenter * h.weight + e.order + n.order) / (h.weight + 2), h.weight += 2
    }
    return h
};
let Bu = wl.Graph,
    Lu = Cl;
let Vu = function(e) {
        let t = {},
            n = e.nodes().filter(t => !e.children(t).length),
            o = n.map(t => e.node(t).rank),
            r = Mu.applyWithChunking(Math.max, o),
            i = Mu.range(r + 1).map(() => []);
        return n.sort((t, n) => e.node(t).rank - e.node(n).rank).forEach(function n(o) {
            if (t[o]) return;
            t[o] = !0;
            let r = e.node(o);
            i[r.rank].push(o), e.successors(o).forEach(n)
        }), i
    },
    Ru = function(e, t) {
        let n = 0;
        for (let o = 1; o < t.length; ++o) n += Cu(e, t[o - 1], t[o]);
        return n
    },
    ju = zu,
    Gu = function(e, t, n, o) {
        o || (o = e.nodes());
        let r = function(e) {
                var t;
                for (; e.hasNode(t = Lu.uniqueId("_root")););
                return t
            }(e),
            i = new Bu({
                compound: !0
            }).setGraph({
                root: r
            }).setDefaultNodeLabel(t => e.node(t));
        return o.forEach(o => {
            let a = e.node(o),
                s = e.parent(o);
            (a.rank === t || a.minRank <= t && t <= a.maxRank) && (i.setNode(o), i.setParent(o, s || r), e[n](o).forEach(t => {
                let n = t.v === o ? t.w : t.v,
                    r = i.edge(n, o),
                    a = void 0 !== r ? r.weight : 0;
                i.setEdge(n, o, {
                    weight: e.edge(t).weight + a
                })
            }), Object.hasOwn(a, "minRank") && i.setNode(o, {
                borderLeft: a.borderLeft[t],
                borderRight: a.borderRight[t]
            }))
        }), i
    },
    Hu = function(e, t, n) {
        let o, r = {};
        n.forEach(n => {
            let i, a, s = e.parent(n);
            for (; s;) {
                if (i = e.parent(s), i ? (a = r[i], r[i] = s) : (a = o, o = s), a && a !== s) return void t.setEdge(a, s);
                s = i
            }
        })
    },
    Fu = wl.Graph,
    Yu = Cl;
var Xu = function e(t, n) {
    if (n && "function" == typeof n.customOrder) return void n.customOrder(t, e);
    let o = Yu.maxRank(t),
        r = Uu(t, Yu.range(1, o + 1), "inEdges"),
        i = Uu(t, Yu.range(o - 1, -1, -1), "outEdges"),
        a = Vu(t);
    if (Wu(t, a), n && n.disableOptimalOrderHeuristic) return;
    let s, l = Number.POSITIVE_INFINITY;
    for (let u = 0, d = 0; d < 4; ++u, ++d) {
        Zu(u % 2 ? r : i, u % 4 >= 2), a = Yu.buildLayerMatrix(t);
        let e = Ru(t, a);
        e < l && (d = 0, s = Object.assign({}, a), l = e)
    }
    Wu(t, s)
};

function Uu(e, t, n) {
    const o = new Map,
        r = (e, t) => {
            o.has(e) || o.set(e, []), o.get(e).push(t)
        };
    for (const i of e.nodes()) {
        const t = e.node(i);
        if ("number" == typeof t.rank && r(t.rank, i), "number" == typeof t.minRank && "number" == typeof t.maxRank)
            for (let e = t.minRank; e <= t.maxRank; e++) e !== t.rank && r(e, i)
    }
    return t.map(function(t) {
        return Gu(e, t, n, o.get(t) || [])
    })
}

function Zu(e, t) {
    let n = new Fu;
    e.forEach(function(e) {
        let o = e.graph().root,
            r = ju(e, o, n, t);
        r.vs.forEach((t, n) => e.node(t).order = n), Hu(e, n, r.vs)
    })
}

function Wu(e, t) {
    Object.values(t).forEach(t => t.forEach((t, n) => e.node(t).order = n))
}
let qu = wl.Graph,
    Ku = Cl;

function Ju(e, t, n) {
    if (t > n) {
        let e = t;
        t = n, n = e
    }
    let o = e[t];
    o || (e[t] = o = {}), o[n] = !0
}

function Qu(e, t, n) {
    if (t > n) {
        let e = t;
        t = n, n = e
    }
    return !!e[t] && Object.hasOwn(e[t], n)
}
let ed = Cl,
    td = function(e) {
        let t, n = Ku.buildLayerMatrix(e),
            o = Object.assign(function(e, t) {
                let n = {};

                function o(t, o) {
                    let r = 0,
                        i = 0,
                        a = t.length,
                        s = o[o.length - 1];
                    return o.forEach((t, l) => {
                        let u = function(e, t) {
                                if (e.node(t).dummy) return e.predecessors(t).find(t => e.node(t).dummy)
                            }(e, t),
                            d = u ? e.node(u).order : a;
                        (u || t === s) && (o.slice(i, l + 1).forEach(t => {
                            e.predecessors(t).forEach(o => {
                                let i = e.node(o),
                                    a = i.order;
                                !(a < r || d < a) || i.dummy && e.node(t).dummy || Ju(n, o, t)
                            })
                        }), i = l + 1, r = d)
                    }), o
                }
                return t.length && t.reduce(o), n
            }(e, n), function(e, t) {
                let n = {};

                function o(t, o, r, i, a) {
                    let s;
                    Ku.range(o, r).forEach(o => {
                        s = t[o], e.node(s).dummy && e.predecessors(s).forEach(t => {
                            let o = e.node(t);
                            o.dummy && (o.order < i || o.order > a) && Ju(n, t, s)
                        })
                    })
                }

                function r(t, n) {
                    let r, i = -1,
                        a = 0;
                    return n.forEach((s, l) => {
                        if ("border" === e.node(s).dummy) {
                            let t = e.predecessors(s);
                            t.length && (r = e.node(t[0]).order, o(n, a, l, i, r), a = l, i = r)
                        }
                        o(n, a, n.length, r, t.length)
                    }), n
                }
                return t.length && t.reduce(r), n
            }(e, n)),
            r = {};
        ["u", "d"].forEach(i => {
            t = "u" === i ? n : Object.values(n).reverse(), ["l", "r"].forEach(n => {
                "r" === n && (t = t.map(e => Object.values(e).reverse()));
                let a = ("u" === i ? e.predecessors : e.successors).bind(e),
                    s = function(e, t, n, o) {
                        let r = {},
                            i = {},
                            a = {};
                        return t.forEach(e => {
                            e.forEach((e, t) => {
                                r[e] = e, i[e] = e, a[e] = t
                            })
                        }), t.forEach(e => {
                            let t = -1;
                            e.forEach(e => {
                                let s = o(e);
                                if (s.length) {
                                    s = s.sort((e, t) => a[e] - a[t]);
                                    let o = (s.length - 1) / 2;
                                    for (let l = Math.floor(o), u = Math.ceil(o); l <= u; ++l) {
                                        let o = s[l];
                                        i[e] === e && t < a[o] && !Qu(n, e, o) && (i[o] = e, i[e] = r[e] = r[o], t = a[o])
                                    }
                                }
                            })
                        }), {
                            root: r,
                            align: i
                        }
                    }(0, t, o, a),
                    l = function(e, t, n, o, r) {
                        let i = {},
                            a = function(e, t, n, o) {
                                let r = new qu,
                                    i = e.graph(),
                                    a = function(e, t, n) {
                                        return (o, r, i) => {
                                            let a, s = o.node(r),
                                                l = o.node(i),
                                                u = 0;
                                            if (u += s.width / 2, Object.hasOwn(s, "labelpos")) switch (s.labelpos.toLowerCase()) {
                                                case "l":
                                                    a = -s.width / 2;
                                                    break;
                                                case "r":
                                                    a = s.width / 2
                                            }
                                            if (a && (u += n ? a : -a), a = 0, u += (s.dummy ? t : e) / 2, u += (l.dummy ? t : e) / 2, u += l.width / 2, Object.hasOwn(l, "labelpos")) switch (l.labelpos.toLowerCase()) {
                                                case "l":
                                                    a = l.width / 2;
                                                    break;
                                                case "r":
                                                    a = -l.width / 2
                                            }
                                            return a && (u += n ? a : -a), a = 0, u
                                        }
                                    }(i.nodesep, i.edgesep, o);
                                return t.forEach(t => {
                                    let o;
                                    t.forEach(t => {
                                        let i = n[t];
                                        if (r.setNode(i), o) {
                                            var s = n[o],
                                                l = r.edge(s, i);
                                            r.setEdge(s, i, Math.max(a(e, t, o), l || 0))
                                        }
                                        o = t
                                    })
                                }), r
                            }(e, t, n, r),
                            s = r ? "borderLeft" : "borderRight";

                        function l(e, t) {
                            let n = a.nodes(),
                                o = n.pop(),
                                r = {};
                            for (; o;) r[o] ? e(o) : (r[o] = !0, n.push(o), n = n.concat(t(o))), o = n.pop()
                        }

                        function u(e) {
                            i[e] = a.inEdges(e).reduce((e, t) => Math.max(e, i[t.v] + a.edge(t)), 0)
                        }

                        function d(t) {
                            let n = a.outEdges(t).reduce((e, t) => Math.min(e, i[t.w] - a.edge(t)), Number.POSITIVE_INFINITY),
                                o = e.node(t);
                            n !== Number.POSITIVE_INFINITY && o.borderType !== s && (i[t] = Math.max(i[t], n))
                        }
                        return l(u, a.predecessors.bind(a)), l(d, a.successors.bind(a)), Object.keys(o).forEach(e => i[e] = i[n[e]]), i
                    }(e, t, s.root, s.align, "r" === n);
                "r" === n && (l = Ku.mapValues(l, e => -e)), r[i + n] = l
            })
        });
        let i = function(e, t) {
            return Object.values(t).reduce((t, n) => {
                let o = Number.NEGATIVE_INFINITY,
                    r = Number.POSITIVE_INFINITY;
                Object.entries(n).forEach(([t, n]) => {
                    let i = function(e, t) {
                        return e.node(t).width
                    }(e, t) / 2;
                    o = Math.max(n + i, o), r = Math.min(n - i, r)
                });
                const i = o - r;
                return i < t[0] && (t = [i, n]), t
            }, [Number.POSITIVE_INFINITY, null])[1]
        }(e, r);
        return function(e, t) {
                let n = Object.values(t),
                    o = Ku.applyWithChunking(Math.min, n),
                    r = Ku.applyWithChunking(Math.max, n);
                ["u", "d"].forEach(n => {
                    ["l", "r"].forEach(i => {
                        let a = n + i,
                            s = e[a];
                        if (s === t) return;
                        let l = Object.values(s),
                            u = o - Ku.applyWithChunking(Math.min, l);
                        "l" !== i && (u = r - Ku.applyWithChunking(Math.max, l)), u && (e[a] = Ku.mapValues(s, e => e + u))
                    })
                })
            }(r, i),
            function(e, t) {
                return Ku.mapValues(e.ul, (n, o) => {
                    if (t) return e[t.toLowerCase()][o]; {
                        let t = Object.values(e).map(e => e[o]).sort((e, t) => e - t);
                        return (t[1] + t[2]) / 2
                    }
                })
            }(r, e.graph().align)
    };
let nd = Rl,
    od = Gl,
    rd = gu,
    id = Cl.normalizeRanks,
    ad = function(e) {
        let t = function(e) {
            let t = {},
                n = 0;

            function o(r) {
                let i = n;
                e.children(r).forEach(o), t[r] = {
                    low: i,
                    lim: n++
                }
            }
            return e.children().forEach(o), t
        }(e);
        e.graph().dummyChains.forEach(n => {
            let o = e.node(n),
                r = o.edgeObj,
                i = function(e, t, n, o) {
                    let r, i, a = [],
                        s = [],
                        l = Math.min(t[n].low, t[o].low),
                        u = Math.max(t[n].lim, t[o].lim);
                    r = n;
                    do {
                        r = e.parent(r), a.push(r)
                    } while (r && (t[r].low > l || u > t[r].lim));
                    i = r, r = o;
                    for (;
                        (r = e.parent(r)) !== i;) s.push(r);
                    return {
                        path: a.concat(s.reverse()),
                        lca: i
                    }
                }(e, t, r.v, r.w),
                a = i.path,
                s = i.lca,
                l = 0,
                u = a[l],
                d = !0;
            for (; n !== r.w;) {
                if (o = e.node(n), d) {
                    for (;
                        (u = a[l]) !== s && e.node(u).maxRank < o.rank;) l++;
                    u === s && (d = !1)
                }
                if (!d) {
                    for (; l < a.length - 1 && e.node(u = a[l + 1]).minRank <= o.rank;) l++;
                    u = a[l]
                }
                e.setParent(n, u), n = e.successors(n)[0]
            }
        })
    },
    sd = Cl.removeEmptyRanks,
    ld = {
        run: function(e) {
            let t = wu.addDummyNode(e, "root", {}, "_root"),
                n = function(e) {
                    var t = {};

                    function n(o, r) {
                        var i = e.children(o);
                        i && i.length && i.forEach(e => n(e, r + 1)), t[o] = r
                    }
                    return e.children().forEach(e => n(e, 1)), t
                }(e),
                o = Object.values(n),
                r = wu.applyWithChunking(Math.max, o) - 1,
                i = 2 * r + 1;
            e.graph().nestingRoot = t, e.edges().forEach(t => e.edge(t).minlen *= i);
            let a = function(e) {
                return e.edges().reduce((t, n) => t + e.edge(n).weight, 0)
            }(e) + 1;
            e.children().forEach(o => bu(e, t, i, a, r, n, o)), e.graph().nodeRankFactor = i
        },
        cleanup: function(e) {
            var t = e.graph();
            e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach(t => {
                e.edge(t).nestingEdge && e.removeEdge(t)
            })
        }
    },
    ud = function(e) {
        e.children().forEach(function t(n) {
            let o = e.children(n),
                r = e.node(n);
            if (o.length && o.forEach(t), Object.hasOwn(r, "minRank")) {
                r.borderLeft = [], r.borderRight = [];
                for (let t = r.minRank, o = r.maxRank + 1; t < o; ++t) Eu(e, "borderLeft", "_bl", n, r, t), Eu(e, "borderRight", "_br", n, r, t)
            }
        })
    },
    dd = {
        adjust: function(e) {
            let t = e.graph().rankdir.toLowerCase();
            "lr" !== t && "rl" !== t || xu(e)
        },
        undo: function(e) {
            let t = e.graph().rankdir.toLowerCase();
            "bt" !== t && "rl" !== t || function(e) {
                e.nodes().forEach(t => ku(e.node(t))), e.edges().forEach(t => {
                    let n = e.edge(t);
                    n.points.forEach(ku), Object.hasOwn(n, "y") && ku(n)
                })
            }(e);
            "lr" !== t && "rl" !== t || (! function(e) {
                e.nodes().forEach(t => Su(e.node(t))), e.edges().forEach(t => {
                    let n = e.edge(t);
                    n.points.forEach(Su), Object.hasOwn(n, "x") && Su(n)
                })
            }(e), xu(e))
        }
    },
    cd = Xu,
    hd = function(e) {
        (function(e) {
            let t = ed.buildLayerMatrix(e),
                n = e.graph().ranksep,
                o = 0;
            t.forEach(t => {
                const r = t.reduce((t, n) => {
                    const o = e.node(n).height;
                    return t > o ? t : o
                }, 0);
                t.forEach(t => e.node(t).y = o + r / 2), o += r + n
            })
        })(e = ed.asNonCompoundGraph(e)), Object.entries(td(e)).forEach(([t, n]) => e.node(t).x = n)
    },
    fd = Cl,
    vd = wl.Graph;
var pd = function(e, t) {
    let n = t && t.debugTiming ? fd.time : fd.notime;
    n("layout", () => {
        let o = n("  buildLayoutGraph", () => function(e) {
            let t = new vd({
                    multigraph: !0,
                    compound: !0
                }),
                n = kd(e.graph());
            return t.setGraph(Object.assign({}, md, Nd(n, gd), fd.pick(n, yd))), e.nodes().forEach(n => {
                const o = Nd(kd(e.node(n)), wd);
                Object.keys(bd).forEach(e => {
                    void 0 === o[e] && (o[e] = bd[e])
                }), t.setNode(n, o), t.setParent(n, e.parent(n))
            }), e.edges().forEach(n => {
                let o = kd(e.edge(n));
                t.setEdge(n, Object.assign({}, Ed, Nd(o, _d), fd.pick(o, xd)))
            }), t
        }(e));
        n("  runLayout", () => function(e, t, n) {
            t("    makeSpaceForEdgeLabels", () => function(e) {
                let t = e.graph();
                t.ranksep /= 2, e.edges().forEach(n => {
                    let o = e.edge(n);
                    o.minlen *= 2, "c" !== o.labelpos.toLowerCase() && ("TB" === t.rankdir || "BT" === t.rankdir ? o.width += o.labeloffset : o.height += o.labeloffset)
                })
            }(e)), t("    removeSelfEdges", () => function(e) {
                e.edges().forEach(t => {
                    if (t.v === t.w) {
                        var n = e.node(t.v);
                        n.selfEdges || (n.selfEdges = []), n.selfEdges.push({
                            e: t,
                            label: e.edge(t)
                        }), e.removeEdge(t)
                    }
                })
            }(e)), t("    acyclic", () => nd.run(e)), t("    nestingGraph.run", () => ld.run(e)), t("    rank", () => rd(fd.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => function(e) {
                e.edges().forEach(t => {
                    let n = e.edge(t);
                    if (n.width && n.height) {
                        let n = e.node(t.v),
                            o = {
                                rank: (e.node(t.w).rank - n.rank) / 2 + n.rank,
                                e: t
                            };
                        fd.addDummyNode(e, "edge-proxy", o, "_ep")
                    }
                })
            }(e)), t("    removeEmptyRanks", () => sd(e)), t("    nestingGraph.cleanup", () => ld.cleanup(e)), t("    normalizeRanks", () => id(e)), t("    assignRankMinMax", () => function(e) {
                let t = 0;
                e.nodes().forEach(n => {
                    let o = e.node(n);
                    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank))
                }), e.graph().maxRank = t
            }(e)), t("    removeEdgeLabelProxies", () => function(e) {
                e.nodes().forEach(t => {
                    let n = e.node(t);
                    "edge-proxy" === n.dummy && (e.edge(n.e).labelRank = n.rank, e.removeNode(t))
                })
            }(e)), t("    normalize.run", () => od.run(e)), t("    parentDummyChains", () => ad(e)), t("    addBorderSegments", () => ud(e)), t("    order", () => cd(e, n)), t("    insertSelfEdges", () => function(e) {
                var t = fd.buildLayerMatrix(e);
                t.forEach(t => {
                    var n = 0;
                    t.forEach((t, o) => {
                        var r = e.node(t);
                        r.order = o + n, (r.selfEdges || []).forEach(t => {
                            fd.addDummyNode(e, "selfedge", {
                                width: t.label.width,
                                height: t.label.height,
                                rank: r.rank,
                                order: o + ++n,
                                e: t.e,
                                label: t.label
                            }, "_se")
                        }), delete r.selfEdges
                    })
                })
            }(e)), t("    adjustCoordinateSystem", () => dd.adjust(e)), t("    position", () => hd(e)), t("    positionSelfEdges", () => function(e) {
                e.nodes().forEach(t => {
                    var n = e.node(t);
                    if ("selfedge" === n.dummy) {
                        var o = e.node(n.e.v),
                            r = o.x + o.width / 2,
                            i = o.y,
                            a = n.x - r,
                            s = o.height / 2;
                        e.setEdge(n.e, n.label), e.removeNode(t), n.label.points = [{
                            x: r + 2 * a / 3,
                            y: i - s
                        }, {
                            x: r + 5 * a / 6,
                            y: i - s
                        }, {
                            x: r + a,
                            y: i
                        }, {
                            x: r + 5 * a / 6,
                            y: i + s
                        }, {
                            x: r + 2 * a / 3,
                            y: i + s
                        }], n.label.x = n.x, n.label.y = n.y
                    }
                })
            }(e)), t("    removeBorderNodes", () => function(e) {
                e.nodes().forEach(t => {
                    if (e.children(t).length) {
                        let n = e.node(t),
                            o = e.node(n.borderTop),
                            r = e.node(n.borderBottom),
                            i = e.node(n.borderLeft[n.borderLeft.length - 1]),
                            a = e.node(n.borderRight[n.borderRight.length - 1]);
                        n.width = Math.abs(a.x - i.x), n.height = Math.abs(r.y - o.y), n.x = i.x + n.width / 2, n.y = o.y + n.height / 2
                    }
                }), e.nodes().forEach(t => {
                    "border" === e.node(t).dummy && e.removeNode(t)
                })
            }(e)), t("    normalize.undo", () => od.undo(e)), t("    fixupEdgeLabelCoords", () => function(e) {
                e.edges().forEach(t => {
                    let n = e.edge(t);
                    if (Object.hasOwn(n, "x")) switch ("l" !== n.labelpos && "r" !== n.labelpos || (n.width -= n.labeloffset), n.labelpos) {
                        case "l":
                            n.x -= n.width / 2 + n.labeloffset;
                            break;
                        case "r":
                            n.x += n.width / 2 + n.labeloffset
                    }
                })
            }(e)), t("    undoCoordinateSystem", () => dd.undo(e)), t("    translateGraph", () => function(e) {
                let t = Number.POSITIVE_INFINITY,
                    n = 0,
                    o = Number.POSITIVE_INFINITY,
                    r = 0,
                    i = e.graph(),
                    a = i.marginx || 0,
                    s = i.marginy || 0;

                function l(e) {
                    let i = e.x,
                        a = e.y,
                        s = e.width,
                        l = e.height;
                    t = Math.min(t, i - s / 2), n = Math.max(n, i + s / 2), o = Math.min(o, a - l / 2), r = Math.max(r, a + l / 2)
                }
                e.nodes().forEach(t => l(e.node(t))), e.edges().forEach(t => {
                    let n = e.edge(t);
                    Object.hasOwn(n, "x") && l(n)
                }), t -= a, o -= s, e.nodes().forEach(n => {
                    let r = e.node(n);
                    r.x -= t, r.y -= o
                }), e.edges().forEach(n => {
                    let r = e.edge(n);
                    r.points.forEach(e => {
                        e.x -= t, e.y -= o
                    }), Object.hasOwn(r, "x") && (r.x -= t), Object.hasOwn(r, "y") && (r.y -= o)
                }), i.width = n - t + a, i.height = r - o + s
            }(e)), t("    assignNodeIntersects", () => function(e) {
                e.edges().forEach(t => {
                    let n, o, r = e.edge(t),
                        i = e.node(t.v),
                        a = e.node(t.w);
                    r.points ? (n = r.points[0], o = r.points[r.points.length - 1]) : (r.points = [], n = a, o = i), r.points.unshift(fd.intersectRect(i, n)), r.points.push(fd.intersectRect(a, o))
                })
            }(e)), t("    reversePoints", () => function(e) {
                e.edges().forEach(t => {
                    let n = e.edge(t);
                    n.reversed && n.points.reverse()
                })
            }(e)), t("    acyclic.undo", () => nd.undo(e))
        }(o, n, t)), n("  updateInputGraph", () => function(e, t) {
            e.nodes().forEach(n => {
                let o = e.node(n),
                    r = t.node(n);
                o && (o.x = r.x, o.y = r.y, o.rank = r.rank, t.children(n).length && (o.width = r.width, o.height = r.height))
            }), e.edges().forEach(n => {
                let o = e.edge(n),
                    r = t.edge(n);
                o.points = r.points, Object.hasOwn(r, "x") && (o.x = r.x, o.y = r.y)
            }), e.graph().width = t.graph().width, e.graph().height = t.graph().height
        }(e, o))
    })
};
let gd = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"],
    md = {
        ranksep: 50,
        edgesep: 20,
        nodesep: 50,
        rankdir: "tb"
    },
    yd = ["acyclicer", "ranker", "rankdir", "align"],
    wd = ["width", "height", "rank"],
    bd = {
        width: 0,
        height: 0
    },
    _d = ["minlen", "weight", "width", "height", "labeloffset"],
    Ed = {
        minlen: 1,
        weight: 1,
        width: 0,
        height: 0,
        labeloffset: 10,
        labelpos: "r"
    },
    xd = ["labelpos"];

function Nd(e, t) {
    return fd.mapValues(fd.pick(e, t), Number)
}

function kd(e) {
    var t = {};
    return e && Object.entries(e).forEach(([e, n]) => {
        "string" == typeof e && (e = e.toLowerCase()), t[e] = n
    }), t
}
let Sd = Cl,
    Md = wl.Graph;
const Id = W({
    graphlib: wl,
    layout: pd,
    debug: {
        debugOrdering: function(e) {
            let t = Sd.buildLayerMatrix(e),
                n = new Md({
                    compound: !0,
                    multigraph: !0
                }).setGraph({});
            return e.nodes().forEach(t => {
                n.setNode(t, {
                    label: t
                }), n.setParent(t, "layer" + e.node(t).rank)
            }), e.edges().forEach(e => n.setEdge(e.v, e.w, {}, e.name)), t.forEach((e, t) => {
                let o = "layer" + t;
                n.setNode(o, {
                    rank: "same"
                }), e.reduce((e, t) => (n.setEdge(e, t, {
                    style: "invis"
                }), t))
            }), n
        }
    },
    util: {
        time: Cl.time,
        notime: Cl.notime
    },
    version: "1.1.8"
});

function Cd() {
    const {
        findNode: e
    } = Ba(), t = r(new Id.graphlib.Graph), n = r("LR");
    return {
        graph: t,
        layout: function(o, r, i = "LR") {
            var a, s;
            const l = new Id.graphlib.Graph;
            t.value = l, l.setDefaultEdgeLabel(() => ({}));
            const u = "LR" === i,
                d = window.innerWidth <= 768,
                c = window.innerWidth <= 480 ? {
                    rankdir: i,
                    nodesep: 30,
                    ranksep: 60,
                    marginx: 10,
                    marginy: 10
                } : d ? {
                    rankdir: i,
                    nodesep: 50,
                    ranksep: 100,
                    marginx: 15,
                    marginy: 15
                } : {
                    rankdir: i,
                    nodesep: 80,
                    ranksep: 150,
                    marginx: 20,
                    marginy: 20
                };
            l.setGraph(c), n.value = i;
            for (const t of o) {
                const n = e(t.id);
                l.setNode(t.id, {
                    width: (null == (a = null == n ? void 0 : n.dimensions) ? void 0 : a.width) || 250,
                    height: (null == (s = null == n ? void 0 : n.dimensions) ? void 0 : s.height) || 150
                })
            }
            for (const e of r) l.setEdge(e.source, e.target);
            return Id.layout(l), o.map(e => {
                const t = l.node(e.id);
                return { ...e,
                    targetPosition: u ? tr.Left : tr.Top,
                    sourcePosition: u ? tr.Right : tr.Bottom,
                    position: {
                        x: t.x,
                        y: t.y
                    }
                }
            })
        },
        previousDirection: n
    }
}
export {
    _s as C, tr as P, ra as _, Bs as a, ws as b, us as c, Ba as d, Cd as u
};