import {
    a6 as e,
    r as a,
    i as l,
    B as n,
    C as i,
    P as s,
    H as o
} from "./index-DKI40WV2.js";

function r(r = {}) {
    const {
        onOpen: u = null,
        onClose: t = null,
        autoManage: d = !0,
        defaultCollapsed: v = !0
    } = r, w = e(), c = a(window.innerWidth), p = l(() => c.value <= 767), h = a(!1), C = a(!1), f = () => {
        c.value = window.innerWidth
    }, S = n(() => w.isSearchSidebarCollapsed, (e, a) => {
        if (!p.value || C.value || !d) return;
        C.value = !0;
        const l = !e;
        h.value = l, l && u ? u() : !l && t && t(), o(() => {
            C.value = !1
        })
    }), b = () => {
        p.value && (h.value = !0, u && u())
    }, g = () => {
        h.value = !1, t && t()
    };
    return i(() => {
        window.addEventListener("resize", f), p.value && (w.isSearchSidebarCollapsed = v)
    }), s(() => {
        window.removeEventListener("resize", f), S()
    }), {
        isMobile: p,
        showPicker: h,
        open: b,
        close: g,
        toggle: () => {
            h.value ? g() : b()
        }
    }
}
export {
    r as u
};