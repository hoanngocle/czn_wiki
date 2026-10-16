const e = {
        unique: "#a360ff",
        legend: "#FF9600",
        rare: "#33a0f3",
        common: "#9296a1",
        uncommon: "#50A93E",
        unique_light: "#D598FF",
        legend_light: "#ffc978",
        rare_light: "#6FC7FF",
        common_light: "#FFFFFF",
        uncommon_light: "#82E070",
        ego_love: "#BC2643",
        ego_norms: "#168256",
        ego_narcissism: "#1E61B4",
        ego_creed: "#6D30C1",
        ego_instinct: "#DE6E00",
        ego_love_light: "#FF5A5A",
        ego_norms_light: "#4BCE7F",
        ego_narcissism_light: "#38A9FF",
        ego_creed_light: "#CC83FF",
        ego_instinct_light: "#FFB000",
        color_sr: "#ffc978",
        color_r: "#87cafe",
        color_d9d9d9: "#D9D9D9"
    },
    o = {
        RARITY_UNIQUE: e.unique,
        RARITY_LEGEND: e.legend,
        RARITY_RARE: e.rare,
        RARITY_COMMON: e.common,
        RARITY_UNCOMMON: e.uncommon
    },
    r = {
        RARITY_UNIQUE: e.unique_light,
        RARITY_LEGEND: e.legend_light,
        RARITY_RARE: e.rare_light,
        RARITY_COMMON: e.common_light,
        RARITY_UNCOMMON: e.uncommon_light
    };

function l(e, l = !1) {
    if (!e) return "";
    return (l ? r : o)[e] || ""
}

function c(o, r = "#FF8C00") {
    try {
        return o && "string" == typeof o ? o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = o.replace(/\$/g, "")).replace(/<color_ego_(\w+)_light>/g, (o, r) => {
            const l = e[`ego_${r}_light`];
            return l ? `<span style="color: ${l}">` : o
        })).replace(/<color_ego_(\w+)>/g, (o, r) => {
            if (o.includes("_light")) return o;
            const l = e[`ego_${r}`];
            return l ? `<span style="color: ${l}">` : o
        })).replace(/<color_orange>/g, `<span style="color: ${r}">`)).replace(/<color_red>/g, '<span style="color: #FF0000">')).replace(/<color_blue>/g, '<span style="color: #0000FF">')).replace(/<color_green>/g, '<span style="color: #00FF00">')).replace(/<color_yellow>/g, '<span style="color: #FFFF00">')).replace(/<color_purple>/g, '<span style="color: #800080">')).replace(/<color_white>/g, '<span style="color: #FFFFFF">')).replace(/<color_black>/g, '<span style="color: #000000">')).replace(/<color_gray>/g, '<span style="color: #808080">')).replace(/<color_darkgray>/g, '<span style="color: #A9A9A9">')).replace(/<cc>/g, `<span style="color: ${r}">`)).replace(/<\/>/g, "</span>")).replace(/<br\s*\/?>/gi, "<br>") : ""
    } catch (l) {
        return o || ""
    }
}

function n(e) {
    try {
        return e && "string" == typeof e ? (e = (e = (e = e.replace(/<[^>]+>/g, "")).replace(/\$/g, "").replace(/\^/g, "")).replace(/<br\s*\/?>/gi, "\n")).trim() : ""
    } catch (o) {
        return e || ""
    }
}
export {
    l as a, c as f, n as g
};