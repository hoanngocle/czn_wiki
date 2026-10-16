import {
    f as n
} from "./api-BhwEKNwi.js";
const l = {
        normal: null,
        green: null,
        red: null
    },
    r = {
        normal: null,
        green: null,
        red: null
    },
    o = (o = "normal") => l[o] || r[o] ? r[o] || Promise.resolve(l[o]) : (r[o] = new Promise((e, a) => {
        const m = new Image;
        m.crossOrigin = "anonymous", m.src = n(`card_${o}_0`), m.onload = () => {
            l[o] = m, r[o] = null, e(m)
        }, m.onerror = n => {
            r[o] = null, a(n)
        }
    }), r[o]),
    e = () => o("normal"),
    a = async (n = "normal") => l[n] ? l[n] : r[n] ? r[n] : o(n),
    m = (n = "normal") => !!l[n];
export {
    a as getCznCardFontByType, m as isCznCardFontLoaded, e as preloadCznCardFont
};