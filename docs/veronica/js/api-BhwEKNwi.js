function _(_) {
    return `${_.startsWith("/")?_:`/${_}`}`
}

function u(u) {
    return _(`/api/assets/file/czn/data/${u}`)
}

function n(_ = {}) {
    return _.card_icon_name ? u(`${_.card_icon_name}.webp`) : _.id ? u(`face/character/face_character_${_.id}.webp`) : "/assets/icons/icon_menu_portrait.png"
}

function e(_) {
    return u(`card_illustration/${_}.webp`)
}

function i(_) {
    return u(`card_illustration/april_card/${_}_0401.webp`)
}
const t = new Set(["abnormal_curse_00067", "job_00404", "job_00405", "job_00406", "job_00407", "job_00408", "job_00409", "job_00410", "job_00411", "job_00412", "start_1003_01", "start_1003_02", "start_1004_01", "start_1004_02", "start_1005_01", "start_1005_02", "start_1008_01", "start_1008_02", "start_1008_03", "start_1009_01", "start_1009_02", "start_1010_01", "start_1010_02", "start_1017_01", "start_1017_02", "start_1018_01", "start_1018_02", "start_1018_03", "start_1021_01", "start_1021_02", "start_1024_01", "start_1024_02", "start_1027_01", "start_1027_02", "start_1028_01", "start_1028_02", "start_1028_03", "start_1033_01", "start_1033_02", "start_1039_01", "start_1039_02", "start_1040_01", "start_1040_02", "start_1040_03", "start_1041_01", "start_1041_02", "start_1043_01", "start_1043_02", "start_1049_01", "start_1049_02", "start_1049_03", "start_1050_01", "start_1050_02", "start_1052_01", "start_1052_02", "start_1056_01", "start_1056_02", "start_1057_01", "start_1057_02", "start_1057_03", "start_1060_01", "start_1060_02", "start_1062_01", "start_1062_02", "start_1062_03", "start_1064_01", "start_1064_02", "start_30047_01", "start_30047_02", "start_30075_01", "start_30075_02", "start_30084_01", "start_30084_02", "start_30097_01", "start_30097_02", "unique_1003_01", "unique_1003_02", "unique_1003_03", "unique_1003_04", "unique_1003_05", "unique_1004_01", "unique_1004_02", "unique_1004_03", "unique_1004_04", "unique_1004_05", "unique_1005_01", "unique_1005_02", "unique_1005_03", "unique_1005_04", "unique_1005_05", "unique_1008_01", "unique_1008_02", "unique_1008_03", "unique_1008_04", "unique_1008_05", "unique_1009_01", "unique_1009_02", "unique_1009_03", "unique_1009_04", "unique_1009_05", "unique_1009_06", "unique_1010_01", "unique_1010_02", "unique_1010_03", "unique_1010_04", "unique_1010_05", "unique_1017_01", "unique_1017_02", "unique_1017_03", "unique_1017_04", "unique_1017_05", "unique_1018_01", "unique_1018_02", "unique_1018_03", "unique_1018_04", "unique_1018_05", "unique_1021_01", "unique_1021_02", "unique_1021_03", "unique_1021_04", "unique_1021_05", "unique_1024_01", "unique_1024_02", "unique_1024_03", "unique_1024_04", "unique_1024_05", "unique_1024_06", "unique_1024_07", "unique_1024_08", "unique_1024_09", "unique_1024_10", "unique_1024_11", "unique_1024_12", "unique_1024_13", "unique_1024_14", "unique_1027_01", "unique_1027_02", "unique_1027_03", "unique_1027_04", "unique_1027_05", "unique_1028_01", "unique_1028_02", "unique_1028_03", "unique_1028_04", "unique_1028_05", "unique_1033_01", "unique_1033_02", "unique_1033_03", "unique_1033_04", "unique_1033_05", "unique_1033_06", "unique_1033_07", "unique_1033_09", "unique_1033_10", "unique_1033_11", "unique_1039_01", "unique_1039_02", "unique_1039_03", "unique_1039_04", "unique_1039_05", "unique_1040_01", "unique_1040_02", "unique_1040_03", "unique_1040_04", "unique_1040_05", "unique_1040_06", "unique_1041_01", "unique_1041_02", "unique_1041_03", "unique_1041_04", "unique_1041_05", "unique_1041_06", "unique_1043_01", "unique_1043_02", "unique_1043_03", "unique_1043_04", "unique_1043_05", "unique_1049_01", "unique_1049_02", "unique_1049_03", "unique_1049_04", "unique_1049_05", "unique_1049_06", "unique_1049_07", "unique_1049_08", "unique_1049_09", "unique_1050_01", "unique_1050_02", "unique_1050_03", "unique_1050_04", "unique_1050_05", "unique_1052_02", "unique_1052_03", "unique_1052_04", "unique_1052_05", "unique_1052_06", "unique_1056_01", "unique_1056_02", "unique_1056_03", "unique_1056_04", "unique_1056_05", "unique_1057_01", "unique_1057_02", "unique_1057_03", "unique_1057_04", "unique_1057_05", "unique_1060_01", "unique_1060_02", "unique_1060_03", "unique_1060_04", "unique_1060_06", "unique_1062_01", "unique_1062_02", "unique_1062_03", "unique_1062_04", "unique_1062_05", "unique_1064_01", "unique_1064_02", "unique_1064_03", "unique_1064_04", "unique_1064_05", "unique_30047_01", "unique_30047_02", "unique_30047_03", "unique_30047_04", "unique_30047_05", "unique_30075_01", "unique_30075_02", "unique_30075_03", "unique_30075_04", "unique_30075_05", "unique_30084_01", "unique_30084_02", "unique_30084_03", "unique_30084_04", "unique_30084_05", "unique_30084_06", "unique_30084_07", "unique_30084_08", "unique_30097_01", "unique_30097_02", "unique_30097_03", "unique_30097_04", "unique_30097_05", "unique_30097_06", "unique_30097_07"]);

function q(_) {
    return t.has(_)
}

function a(_) {
    return u(`card_illustration/${_}.webm`)
}

function r(_) {
    return u(`card/${_}.webp`)
}

function s(_) {
    return u(`font/${_}.webp`)
}

function c(u) {
    return _(`/api/assets/file/e7/data/${u}`)
}
export {
    c as a, _ as b, n as c, u as d, r as e, s as f, i as g, q as h, e as i, a as j
};