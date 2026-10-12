(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 467034, (t, r, e) => {
    var n = t.r(289204),
        i = t.r(416659),
        o = {
            872: function(t, r) {
                "use strict";
                r.byteLength = function(t) {
                    var r = a(t),
                        e = r[0],
                        n = r[1];
                    return (e + n) * 3 / 4 - n
                }, r.toByteArray = function(t) {
                    var r, e, o = a(t),
                        f = o[0],
                        s = o[1],
                        u = new i((f + s) * 3 / 4 - s),
                        h = 0,
                        l = s > 0 ? f - 4 : f;
                    for (e = 0; e < l; e += 4) r = n[t.charCodeAt(e)] << 18 | n[t.charCodeAt(e + 1)] << 12 | n[t.charCodeAt(e + 2)] << 6 | n[t.charCodeAt(e + 3)], u[h++] = r >> 16 & 255, u[h++] = r >> 8 & 255, u[h++] = 255 & r;
                    return 2 === s && (r = n[t.charCodeAt(e)] << 2 | n[t.charCodeAt(e + 1)] >> 4, u[h++] = 255 & r), 1 === s && (r = n[t.charCodeAt(e)] << 10 | n[t.charCodeAt(e + 1)] << 4 | n[t.charCodeAt(e + 2)] >> 2, u[h++] = r >> 8 & 255, u[h++] = 255 & r), u
                }, r.fromByteArray = function(t) {
                    for (var r, n = t.length, i = n % 3, o = [], f = 0, s = n - i; f < s; f += 16383) o.push(function(t, r, n) {
                        for (var i, o = [], f = r; f < n; f += 3) i = (t[f] << 16 & 0xff0000) + (t[f + 1] << 8 & 65280) + (255 & t[f + 2]), o.push(e[i >> 18 & 63] + e[i >> 12 & 63] + e[i >> 6 & 63] + e[63 & i]);
                        return o.join("")
                    }(t, f, f + 16383 > s ? s : f + 16383));
                    return 1 === i ? o.push(e[(r = t[n - 1]) >> 2] + e[r << 4 & 63] + "==") : 2 === i && o.push(e[(r = (t[n - 2] << 8) + t[n - 1]) >> 10] + e[r >> 4 & 63] + e[r << 2 & 63] + "="), o.join("")
                };
                for (var e = [], n = [], i = "u" > typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = 0, s = o.length; f < s; ++f) e[f] = o[f], n[o.charCodeAt(f)] = f;

                function a(t) {
                    var r = t.length;
                    if (r % 4 > 0) throw Error("Invalid string. Length must be a multiple of 4");
                    var e = t.indexOf("="); - 1 === e && (e = r);
                    var n = e === r ? 0 : 4 - e % 4;
                    return [e, n]
                }
                n[45] = 62, n[95] = 63
            },
            230: function(t, r, e) {
                "use strict";
                var o = e(872),
                    f = e(321),
                    s = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;

                function a(t) {
                    if (t > 0x7fffffff) throw RangeError('The value "' + t + '" is invalid for option "size"');
                    var r = new Uint8Array(t);
                    return Object.setPrototypeOf(r, u.prototype), r
                }

                function u(t, r, e) {
                    if ("number" == typeof t) {
                        if ("string" == typeof r) throw TypeError('The "string" argument must be of type string. Received type number');
                        return p(t)
                    }
                    return h(t, r, e)
                }

                function h(t, r, e) {
                    if ("string" == typeof t) {
                        var n = t,
                            o = r;
                        if (("string" != typeof o || "" === o) && (o = "utf8"), !u.isEncoding(o)) throw TypeError("Unknown encoding: " + o);
                        var f = 0 | E(n, o),
                            s = a(f),
                            h = s.write(n, o);
                        return h !== f && (s = s.slice(0, h)), s
                    }
                    if (ArrayBuffer.isView(t)) return g(t);
                    if (null == t) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + (void 0 === t ? "undefined" : i._(t)));
                    if (w(t, ArrayBuffer) || t && w(t.buffer, ArrayBuffer) || "u" > typeof SharedArrayBuffer && (w(t, SharedArrayBuffer) || t && w(t.buffer, SharedArrayBuffer))) return function(t, r, e) {
                        var n;
                        if (r < 0 || t.byteLength < r) throw RangeError('"offset" is outside of buffer bounds');
                        if (t.byteLength < r + (e || 0)) throw RangeError('"length" is outside of buffer bounds');
                        return Object.setPrototypeOf(n = void 0 === r && void 0 === e ? new Uint8Array(t) : void 0 === e ? new Uint8Array(t, r) : new Uint8Array(t, r, e), u.prototype), n
                    }(t, r, e);
                    if ("number" == typeof t) throw TypeError('The "value" argument must not be of type number. Received type number');
                    var l = t.valueOf && t.valueOf();
                    if (null != l && l !== t) return u.from(l, r, e);
                    var p = function(t) {
                        if (u.isBuffer(t)) {
                            var r = 0 | c(t.length),
                                e = a(r);
                            return 0 === e.length || t.copy(e, 0, 0, r), e
                        }
                        return void 0 !== t.length ? "number" != typeof t.length || function(t) {
                            return t != t
                        }(t.length) ? a(0) : g(t) : "Buffer" === t.type && Array.isArray(t.data) ? g(t.data) : void 0
                    }(t);
                    if (p) return p;
                    if ("u" > typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return u.from(t[Symbol.toPrimitive]("string"), r, e);
                    throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + (void 0 === t ? "undefined" : i._(t)))
                }

                function l(t) {
                    if ("number" != typeof t) throw TypeError('"size" argument must be of type number');
                    if (t < 0) throw RangeError('The value "' + t + '" is invalid for option "size"')
                }

                function p(t) {
                    return l(t), a(t < 0 ? 0 : 0 | c(t))
                }

                function g(t) {
                    for (var r = t.length < 0 ? 0 : 0 | c(t.length), e = a(r), n = 0; n < r; n += 1) e[n] = 255 & t[n];
                    return e
                }
                r.Buffer = u, r.SlowBuffer = function(t) {
                    return +t != t && (t = 0), u.alloc(+t)
                }, r.INSPECT_MAX_BYTES = 50, r.kMaxLength = 0x7fffffff, u.TYPED_ARRAY_SUPPORT = function() {
                    try {
                        var t = new Uint8Array(1),
                            r = {
                                foo: function() {
                                    return 42
                                }
                            };
                        return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(t, r), 42 === t.foo()
                    } catch (t) {
                        return !1
                    }
                }(), !u.TYPED_ARRAY_SUPPORT && "u" > typeof console && "function" == typeof console.error && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(u.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (u.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(u.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (u.isBuffer(this)) return this.byteOffset
                    }
                }), u.poolSize = 8192, u.from = function(t, r, e) {
                    return h(t, r, e)
                }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array), u.alloc = function(t, r, e) {
                    return (l(t), t <= 0) ? a(t) : void 0 !== r ? "string" == typeof e ? a(t).fill(r, e) : a(t).fill(r) : a(t)
                }, u.allocUnsafe = function(t) {
                    return p(t)
                }, u.allocUnsafeSlow = function(t) {
                    return p(t)
                };

                function c(t) {
                    if (t >= 0x7fffffff) throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");
                    return 0 | t
                }

                function E(t, r) {
                    if (u.isBuffer(t)) return t.length;
                    if (ArrayBuffer.isView(t) || w(t, ArrayBuffer)) return t.byteLength;
                    if ("string" != typeof t) throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + (void 0 === t ? "undefined" : i._(t)));
                    var e = t.length,
                        n = arguments.length > 2 && !0 === arguments[2];
                    if (!n && 0 === e) return 0;
                    for (var o = !1;;) switch (r) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return e;
                        case "utf8":
                        case "utf-8":
                            return L(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * e;
                        case "hex":
                            return e >>> 1;
                        case "base64":
                            return O(t).length;
                        default:
                            if (o) return n ? -1 : L(t).length;
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }

                function _(t, r, e) {
                    var n, i, f, s = !1;
                    if ((void 0 === r || r < 0) && (r = 0), r > this.length || ((void 0 === e || e > this.length) && (e = this.length), e <= 0 || (e >>>= 0) <= (r >>>= 0))) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return function(t, r, e) {
                                var n = t.length;
                                (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
                                for (var i = "", o = r; o < e; ++o) i += N[t[o]];
                                return i
                            }(this, r, e);
                        case "utf8":
                        case "utf-8":
                            return A(this, r, e);
                        case "ascii":
                            return function(t, r, e) {
                                var n = "";
                                e = Math.min(t.length, e);
                                for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
                                return n
                            }(this, r, e);
                        case "latin1":
                        case "binary":
                            return function(t, r, e) {
                                var n = "";
                                e = Math.min(t.length, e);
                                for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
                                return n
                            }(this, r, e);
                        case "base64":
                            return n = this, i = r, f = e, 0 === i && f === n.length ? o.fromByteArray(n) : o.fromByteArray(n.slice(i, f));
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return function(t, r, e) {
                                for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                                return i
                            }(this, r, e);
                        default:
                            if (s) throw TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), s = !0
                    }
                }

                function y(t, r, e) {
                    var n = t[r];
                    t[r] = t[e], t[e] = n
                }

                function d(t, r, e, n, i) {
                    var o;
                    if (0 === t.length) return -1;
                    if ("string" == typeof e ? (n = e, e = 0) : e > 0x7fffffff ? e = 0x7fffffff : e < -0x80000000 && (e = -0x80000000), (o = e *= 1) != o && (e = i ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length)
                        if (i) return -1;
                        else e = t.length - 1;
                    else if (e < 0)
                        if (!i) return -1;
                        else e = 0;
                    if ("string" == typeof r && (r = u.from(r, n)), u.isBuffer(r)) return 0 === r.length ? -1 : T(t, r, e, n, i);
                    if ("number" == typeof r) {
                        if (r &= 255, "function" == typeof Uint8Array.prototype.indexOf)
                            if (i) return Uint8Array.prototype.indexOf.call(t, r, e);
                            else return Uint8Array.prototype.lastIndexOf.call(t, r, e);
                        return T(t, [r], e, n, i)
                    }
                    throw TypeError("val must be string, number or Buffer")
                }

                function T(t, r, e, n, i) {
                    var o, f = 1,
                        s = t.length,
                        a = r.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (t.length < 2 || r.length < 2) return -1;
                        f = 2, s /= 2, a /= 2, e /= 2
                    }

                    function u(t, r) {
                        return 1 === f ? t[r] : t.readUInt16BE(r * f)
                    }
                    if (i) {
                        var h = -1;
                        for (o = e; o < s; o++)
                            if (u(t, o) === u(r, -1 === h ? 0 : o - h)) {
                                if (-1 === h && (h = o), o - h + 1 === a) return h * f
                            } else -1 !== h && (o -= o - h), h = -1
                    } else
                        for (e + a > s && (e = s - a), o = e; o >= 0; o--) {
                            for (var l = !0, p = 0; p < a; p++)
                                if (u(t, o + p) !== u(r, p)) {
                                    l = !1;
                                    break
                                }
                            if (l) return o
                        }
                    return -1
                }
                u.isBuffer = function(t) {
                    return null != t && !0 === t._isBuffer && t !== u.prototype
                }, u.compare = function(t, r) {
                    if (w(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), w(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)), !u.isBuffer(t) || !u.isBuffer(r)) throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === r) return 0;
                    for (var e = t.length, n = r.length, i = 0, o = Math.min(e, n); i < o; ++i)
                        if (t[i] !== r[i]) {
                            e = t[i], n = r[i];
                            break
                        }
                    return e < n ? -1 : +(n < e)
                }, u.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, u.concat = function(t, r) {
                    if (!Array.isArray(t)) throw TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return u.alloc(0);
                    if (void 0 === r)
                        for (e = 0, r = 0; e < t.length; ++e) r += t[e].length;
                    var e, n = u.allocUnsafe(r),
                        i = 0;
                    for (e = 0; e < t.length; ++e) {
                        var o = t[e];
                        if (w(o, Uint8Array) && (o = u.from(o)), !u.isBuffer(o)) throw TypeError('"list" argument must be an Array of Buffers');
                        o.copy(n, i), i += o.length
                    }
                    return n
                }, u.byteLength = E, u.prototype._isBuffer = !0, u.prototype.swap16 = function() {
                    var t = this.length;
                    if (t % 2 != 0) throw RangeError("Buffer size must be a multiple of 16-bits");
                    for (var r = 0; r < t; r += 2) y(this, r, r + 1);
                    return this
                }, u.prototype.swap32 = function() {
                    var t = this.length;
                    if (t % 4 != 0) throw RangeError("Buffer size must be a multiple of 32-bits");
                    for (var r = 0; r < t; r += 4) y(this, r, r + 3), y(this, r + 1, r + 2);
                    return this
                }, u.prototype.swap64 = function() {
                    var t = this.length;
                    if (t % 8 != 0) throw RangeError("Buffer size must be a multiple of 64-bits");
                    for (var r = 0; r < t; r += 8) y(this, r, r + 7), y(this, r + 1, r + 6), y(this, r + 2, r + 5), y(this, r + 3, r + 4);
                    return this
                }, u.prototype.toString = function() {
                    var t = this.length;
                    return 0 === t ? "" : 0 == arguments.length ? A(this, 0, t) : _.apply(this, arguments)
                }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(t) {
                    if (!u.isBuffer(t)) throw TypeError("Argument must be a Buffer");
                    return this === t || 0 === u.compare(this, t)
                }, u.prototype.inspect = function() {
                    var t = "",
                        e = r.INSPECT_MAX_BYTES;
                    return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">"
                }, s && (u.prototype[s] = u.prototype.inspect), u.prototype.compare = function(t, r, e, n, o) {
                    if (w(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(t)) throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + (void 0 === t ? "undefined" : i._(t)));
                    if (void 0 === r && (r = 0), void 0 === e && (e = t ? t.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), r < 0 || e > t.length || n < 0 || o > this.length) throw RangeError("out of range index");
                    if (n >= o && r >= e) return 0;
                    if (n >= o) return -1;
                    if (r >= e) return 1;
                    if (r >>>= 0, e >>>= 0, n >>>= 0, o >>>= 0, this === t) return 0;
                    for (var f = o - n, s = e - r, a = Math.min(f, s), h = this.slice(n, o), l = t.slice(r, e), p = 0; p < a; ++p)
                        if (h[p] !== l[p]) {
                            f = h[p], s = l[p];
                            break
                        }
                    return f < s ? -1 : +(s < f)
                }, u.prototype.includes = function(t, r, e) {
                    return -1 !== this.indexOf(t, r, e)
                }, u.prototype.indexOf = function(t, r, e) {
                    return d(this, t, r, e, !0)
                }, u.prototype.lastIndexOf = function(t, r, e) {
                    return d(this, t, r, e, !1)
                };

                function A(t, r, e) {
                    e = Math.min(t.length, e);
                    for (var n = [], i = r; i < e;) {
                        var o, f, s, a, u = t[i],
                            h = null,
                            l = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                        if (i + l <= e) switch (l) {
                            case 1:
                                u < 128 && (h = u);
                                break;
                            case 2:
                                (192 & (o = t[i + 1])) == 128 && (a = (31 & u) << 6 | 63 & o) > 127 && (h = a);
                                break;
                            case 3:
                                o = t[i + 1], f = t[i + 2], (192 & o) == 128 && (192 & f) == 128 && (a = (15 & u) << 12 | (63 & o) << 6 | 63 & f) > 2047 && (a < 55296 || a > 57343) && (h = a);
                                break;
                            case 4:
                                o = t[i + 1], f = t[i + 2], s = t[i + 3], (192 & o) == 128 && (192 & f) == 128 && (192 & s) == 128 && (a = (15 & u) << 18 | (63 & o) << 12 | (63 & f) << 6 | 63 & s) > 65535 && a < 1114112 && (h = a)
                        }
                        null === h ? (h = 65533, l = 1) : h > 65535 && (h -= 65536, n.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), n.push(h), i += l
                    }
                    var p = n,
                        g = p.length;
                    if (g <= 4096) return String.fromCharCode.apply(String, p);
                    for (var c = "", E = 0; E < g;) c += String.fromCharCode.apply(String, p.slice(E, E += 4096));
                    return c
                }

                function I(t, r, e) {
                    if (t % 1 != 0 || t < 0) throw RangeError("offset is not uint");
                    if (t + r > e) throw RangeError("Trying to access beyond buffer length")
                }

                function v(t, r, e, n, i, o) {
                    if (!u.isBuffer(t)) throw TypeError('"buffer" argument must be a Buffer instance');
                    if (r > i || r < o) throw RangeError('"value" argument is out of bounds');
                    if (e + n > t.length) throw RangeError("Index out of range")
                }

                function R(t, r, e, n, i, o) {
                    if (e + n > t.length || e < 0) throw RangeError("Index out of range")
                }

                function S(t, r, e, n, i) {
                    return r *= 1, e >>>= 0, i || R(t, r, e, 4, 34028234663852886e22, -34028234663852886e22), f.write(t, r, e, n, 23, 4), e + 4
                }

                function C(t, r, e, n, i) {
                    return r *= 1, e >>>= 0, i || R(t, r, e, 8, 17976931348623157e292, -17976931348623157e292), f.write(t, r, e, n, 52, 8), e + 8
                }
                u.prototype.write = function(t, r, e, n) {
                    if (void 0 === r) n = "utf8", e = this.length, r = 0;
                    else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0;
                    else if (isFinite(r)) r >>>= 0, isFinite(e) ? (e >>>= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0);
                    else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    var i, o, f, s, a, u, h, l, p = this.length - r;
                    if ((void 0 === e || e > p) && (e = p), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var g = !1;;) switch (n) {
                        case "hex":
                            return function(t, r, e, n) {
                                e = Number(e) || 0;
                                var i = t.length - e;
                                n ? (n = Number(n)) > i && (n = i) : n = i;
                                var o = r.length;
                                n > o / 2 && (n = o / 2);
                                for (var f = 0; f < n; ++f) {
                                    var s, a = parseInt(r.substr(2 * f, 2), 16);
                                    if ((s = a) != s) break;
                                    t[e + f] = a
                                }
                                return f
                            }(this, t, r, e);
                        case "utf8":
                        case "utf-8":
                            return i = r, o = e, b(L(t, this.length - i), this, i, o);
                        case "ascii":
                            return f = r, s = e, b(U(t), this, f, s);
                        case "latin1":
                        case "binary":
                            return function(t, r, e, n) {
                                return b(U(r), t, e, n)
                            }(this, t, r, e);
                        case "base64":
                            return a = r, u = e, b(O(t), this, a, u);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return h = r, l = e, b(function(t, r) {
                                for (var e, n, i = [], o = 0; o < t.length && !((r -= 2) < 0); ++o) n = (e = t.charCodeAt(o)) >> 8, i.push(e % 256), i.push(n);
                                return i
                            }(t, this.length - h), this, h, l);
                        default:
                            if (g) throw TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), g = !0
                    }
                }, u.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                }, u.prototype.slice = function(t, r) {
                    var e = this.length;
                    t = ~~t, r = void 0 === r ? e : ~~r, t < 0 ? (t += e) < 0 && (t = 0) : t > e && (t = e), r < 0 ? (r += e) < 0 && (r = 0) : r > e && (r = e), r < t && (r = t);
                    var n = this.subarray(t, r);
                    return Object.setPrototypeOf(n, u.prototype), n
                }, u.prototype.readUIntLE = function(t, r, e) {
                    t >>>= 0, r >>>= 0, e || I(t, r, this.length);
                    for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
                    return n
                }, u.prototype.readUIntBE = function(t, r, e) {
                    t >>>= 0, r >>>= 0, e || I(t, r, this.length);
                    for (var n = this[t + --r], i = 1; r > 0 && (i *= 256);) n += this[t + --r] * i;
                    return n
                }, u.prototype.readUInt8 = function(t, r) {
                    return t >>>= 0, r || I(t, 1, this.length), this[t]
                }, u.prototype.readUInt16LE = function(t, r) {
                    return t >>>= 0, r || I(t, 2, this.length), this[t] | this[t + 1] << 8
                }, u.prototype.readUInt16BE = function(t, r) {
                    return t >>>= 0, r || I(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, u.prototype.readUInt32LE = function(t, r) {
                    return t >>>= 0, r || I(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 0x1000000 * this[t + 3]
                }, u.prototype.readUInt32BE = function(t, r) {
                    return t >>>= 0, r || I(t, 4, this.length), 0x1000000 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, u.prototype.readIntLE = function(t, r, e) {
                    t >>>= 0, r >>>= 0, e || I(t, r, this.length);
                    for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
                    return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n
                }, u.prototype.readIntBE = function(t, r, e) {
                    t >>>= 0, r >>>= 0, e || I(t, r, this.length);
                    for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
                    return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o
                }, u.prototype.readInt8 = function(t, r) {
                    return (t >>>= 0, r || I(t, 1, this.length), 128 & this[t]) ? -((255 - this[t] + 1) * 1) : this[t]
                }, u.prototype.readInt16LE = function(t, r) {
                    t >>>= 0, r || I(t, 2, this.length);
                    var e = this[t] | this[t + 1] << 8;
                    return 32768 & e ? 0xffff0000 | e : e
                }, u.prototype.readInt16BE = function(t, r) {
                    t >>>= 0, r || I(t, 2, this.length);
                    var e = this[t + 1] | this[t] << 8;
                    return 32768 & e ? 0xffff0000 | e : e
                }, u.prototype.readInt32LE = function(t, r) {
                    return t >>>= 0, r || I(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, u.prototype.readInt32BE = function(t, r) {
                    return t >>>= 0, r || I(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, u.prototype.readFloatLE = function(t, r) {
                    return t >>>= 0, r || I(t, 4, this.length), f.read(this, t, !0, 23, 4)
                }, u.prototype.readFloatBE = function(t, r) {
                    return t >>>= 0, r || I(t, 4, this.length), f.read(this, t, !1, 23, 4)
                }, u.prototype.readDoubleLE = function(t, r) {
                    return t >>>= 0, r || I(t, 8, this.length), f.read(this, t, !0, 52, 8)
                }, u.prototype.readDoubleBE = function(t, r) {
                    return t >>>= 0, r || I(t, 8, this.length), f.read(this, t, !1, 52, 8)
                }, u.prototype.writeUIntLE = function(t, r, e, n) {
                    if (t *= 1, r >>>= 0, e >>>= 0, !n) {
                        var i = Math.pow(2, 8 * e) - 1;
                        v(this, t, r, e, i, 0)
                    }
                    var o = 1,
                        f = 0;
                    for (this[r] = 255 & t; ++f < e && (o *= 256);) this[r + f] = t / o & 255;
                    return r + e
                }, u.prototype.writeUIntBE = function(t, r, e, n) {
                    if (t *= 1, r >>>= 0, e >>>= 0, !n) {
                        var i = Math.pow(2, 8 * e) - 1;
                        v(this, t, r, e, i, 0)
                    }
                    var o = e - 1,
                        f = 1;
                    for (this[r + o] = 255 & t; --o >= 0 && (f *= 256);) this[r + o] = t / f & 255;
                    return r + e
                }, u.prototype.writeUInt8 = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 1, 255, 0), this[r] = 255 & t, r + 1
                }, u.prototype.writeUInt16LE = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 2, 65535, 0), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2
                }, u.prototype.writeUInt16BE = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 2, 65535, 0), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2
                }, u.prototype.writeUInt32LE = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 4, 0xffffffff, 0), this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t, r + 4
                }, u.prototype.writeUInt32BE = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 4, 0xffffffff, 0), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4
                }, u.prototype.writeIntLE = function(t, r, e, n) {
                    if (t *= 1, r >>>= 0, !n) {
                        var i = Math.pow(2, 8 * e - 1);
                        v(this, t, r, e, i - 1, -i)
                    }
                    var o = 0,
                        f = 1,
                        s = 0;
                    for (this[r] = 255 & t; ++o < e && (f *= 256);) t < 0 && 0 === s && 0 !== this[r + o - 1] && (s = 1), this[r + o] = (t / f | 0) - s & 255;
                    return r + e
                }, u.prototype.writeIntBE = function(t, r, e, n) {
                    if (t *= 1, r >>>= 0, !n) {
                        var i = Math.pow(2, 8 * e - 1);
                        v(this, t, r, e, i - 1, -i)
                    }
                    var o = e - 1,
                        f = 1,
                        s = 0;
                    for (this[r + o] = 255 & t; --o >= 0 && (f *= 256);) t < 0 && 0 === s && 0 !== this[r + o + 1] && (s = 1), this[r + o] = (t / f | 0) - s & 255;
                    return r + e
                }, u.prototype.writeInt8 = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1
                }, u.prototype.writeInt16LE = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 2, 32767, -32768), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2
                }, u.prototype.writeInt16BE = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 2, 32767, -32768), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2
                }, u.prototype.writeInt32LE = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 4, 0x7fffffff, -0x80000000), this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24, r + 4
                }, u.prototype.writeInt32BE = function(t, r, e) {
                    return t *= 1, r >>>= 0, e || v(this, t, r, 4, 0x7fffffff, -0x80000000), t < 0 && (t = 0xffffffff + t + 1), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4
                }, u.prototype.writeFloatLE = function(t, r, e) {
                    return S(this, t, r, !0, e)
                }, u.prototype.writeFloatBE = function(t, r, e) {
                    return S(this, t, r, !1, e)
                }, u.prototype.writeDoubleLE = function(t, r, e) {
                    return C(this, t, r, !0, e)
                }, u.prototype.writeDoubleBE = function(t, r, e) {
                    return C(this, t, r, !1, e)
                }, u.prototype.copy = function(t, r, e, n) {
                    if (!u.isBuffer(t)) throw TypeError("argument should be a Buffer");
                    if (e || (e = 0), n || 0 === n || (n = this.length), r >= t.length && (r = t.length), r || (r = 0), n > 0 && n < e && (n = e), n === e || 0 === t.length || 0 === this.length) return 0;
                    if (r < 0) throw RangeError("targetStart out of bounds");
                    if (e < 0 || e >= this.length) throw RangeError("Index out of range");
                    if (n < 0) throw RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length), t.length - r < n - e && (n = t.length - r + e);
                    var i = n - e;
                    if (this === t && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(r, e, n);
                    else if (this === t && e < r && r < n)
                        for (var o = i - 1; o >= 0; --o) t[o + r] = this[o + e];
                    else Uint8Array.prototype.set.call(t, this.subarray(e, n), r);
                    return i
                }, u.prototype.fill = function(t, r, e, n) {
                    if ("string" == typeof t) {
                        if ("string" == typeof r ? (n = r, r = 0, e = this.length) : "string" == typeof e && (n = e, e = this.length), void 0 !== n && "string" != typeof n) throw TypeError("encoding must be a string");
                        if ("string" == typeof n && !u.isEncoding(n)) throw TypeError("Unknown encoding: " + n);
                        if (1 === t.length) {
                            var i, o = t.charCodeAt(0);
                            ("utf8" === n && o < 128 || "latin1" === n) && (t = o)
                        }
                    } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                    if (r < 0 || this.length < r || this.length < e) throw RangeError("Out of range index");
                    if (e <= r) return this;
                    if (r >>>= 0, e = void 0 === e ? this.length : e >>> 0, t || (t = 0), "number" == typeof t)
                        for (i = r; i < e; ++i) this[i] = t;
                    else {
                        var f = u.isBuffer(t) ? t : u.from(t, n),
                            s = f.length;
                        if (0 === s) throw TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (i = 0; i < e - r; ++i) this[i + r] = f[i % s]
                    }
                    return this
                };
                var B = /[^+/0-9A-Za-z-_]/g;

                function L(t, r) {
                    r = r || 1 / 0;
                    for (var e, n = t.length, i = null, o = [], f = 0; f < n; ++f) {
                        if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                            if (!i) {
                                if (e > 56319 || f + 1 === n) {
                                    (r -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = e;
                                continue
                            }
                            if (e < 56320) {
                                (r -= 3) > -1 && o.push(239, 191, 189), i = e;
                                continue
                            }
                            e = (i - 55296 << 10 | e - 56320) + 65536
                        } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, e < 128) {
                            if ((r -= 1) < 0) break;
                            o.push(e)
                        } else if (e < 2048) {
                            if ((r -= 2) < 0) break;
                            o.push(e >> 6 | 192, 63 & e | 128)
                        } else if (e < 65536) {
                            if ((r -= 3) < 0) break;
                            o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
                        } else if (e < 1114112) {
                            if ((r -= 4) < 0) break;
                            o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
                        } else throw Error("Invalid code point")
                    }
                    return o
                }

                function U(t) {
                    for (var r = [], e = 0; e < t.length; ++e) r.push(255 & t.charCodeAt(e));
                    return r
                }

                function O(t) {
                    return o.toByteArray(function(t) {
                        if ((t = (t = t.split("=")[0]).trim().replace(B, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function b(t, r, e, n) {
                    for (var i = 0; i < n && !(i + e >= r.length) && !(i >= t.length); ++i) r[i + e] = t[i];
                    return i
                }

                function w(t, r) {
                    return n._(t, r) || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name
                }
                var N = function() {
                    for (var t = "0123456789abcdef", r = Array(256), e = 0; e < 16; ++e)
                        for (var n = 16 * e, i = 0; i < 16; ++i) r[n + i] = t[e] + t[i];
                    return r
                }()
            },
            321: function(t, r) {
                r.read = function(t, r, e, n, i) {
                    var o, f, s = 8 * i - n - 1,
                        a = (1 << s) - 1,
                        u = a >> 1,
                        h = -7,
                        l = e ? i - 1 : 0,
                        p = e ? -1 : 1,
                        g = t[r + l];
                    for (l += p, o = g & (1 << -h) - 1, g >>= -h, h += s; h > 0; o = 256 * o + t[r + l], l += p, h -= 8);
                    for (f = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; f = 256 * f + t[r + l], l += p, h -= 8);
                    if (0 === o) o = 1 - u;
                    else {
                        if (o === a) return f ? NaN : 1 / 0 * (g ? -1 : 1);
                        f += Math.pow(2, n), o -= u
                    }
                    return (g ? -1 : 1) * f * Math.pow(2, o - n)
                }, r.write = function(t, r, e, n, i, o) {
                    var f, s, a, u = 8 * o - i - 1,
                        h = (1 << u) - 1,
                        l = h >> 1,
                        p = 5960464477539062e-23 * (23 === i),
                        g = n ? 0 : o - 1,
                        c = n ? 1 : -1,
                        E = +(r < 0 || 0 === r && 1 / r < 0);
                    for (isNaN(r = Math.abs(r)) || r === 1 / 0 ? (s = +!!isNaN(r), f = h) : (f = Math.floor(Math.log(r) / Math.LN2), r * (a = Math.pow(2, -f)) < 1 && (f--, a *= 2), f + l >= 1 ? r += p / a : r += p * Math.pow(2, 1 - l), r * a >= 2 && (f++, a /= 2), f + l >= h ? (s = 0, f = h) : f + l >= 1 ? (s = (r * a - 1) * Math.pow(2, i), f += l) : (s = r * Math.pow(2, l - 1) * Math.pow(2, i), f = 0)); i >= 8; t[e + g] = 255 & s, g += c, s /= 256, i -= 8);
                    for (f = f << i | s, u += i; u > 0; t[e + g] = 255 & f, g += c, f /= 256, u -= 8);
                    t[e + g - c] |= 128 * E
                }
            }
        },
        f = {};

    function s(t) {
        var r = f[t];
        if (void 0 !== r) return r.exports;
        var e = f[t] = {
                exports: {}
            },
            n = !0;
        try {
            o[t](e, e.exports, s), n = !1
        } finally {
            n && delete f[t]
        }
        return e.exports
    }
    s.ab = "/ROOT/node_modules/next/dist/compiled/buffer/", r.exports = s(230)
}, 347015, t => {
    "use strict";
    var r = t.i(247167);
    t.i(317608);
    var e = t.i(50270);
    e.z.object({
        DATABASE_URL: e.z.string().min(1, "DATABASE_URL is required"),
        NEXTAUTH_URL: e.z.string().min(1).default("http://localhost:3000"),
        NEXTAUTH_SECRET: e.z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters"),
        DISCORD_CLIENT_ID: e.z.string().min(1, "DISCORD_CLIENT_ID is required"),
        DISCORD_CLIENT_SECRET: e.z.string().min(1, "DISCORD_CLIENT_SECRET is required"),
        DISCORD_GUILD_ID: e.z.string().optional(),
        DISCORD_TOKEN: e.z.string().optional(),
        DISCORD_KOFI_ROLES: e.z.string().optional(),
        DISCORD_SERVER_INVITE: e.z.string().optional(),
        KOFI_WEBHOOK_MODE: e.z.string().optional(),
        KOFI_WEBHOOK_PATH_TOKEN: e.z.string().optional(),
        KOFI_VERIFICATION_TOKEN: e.z.string().optional(),
        KOFI_VERIFICATION_TOKEN_ALT: e.z.string().optional(),
        KOFI_EMAIL_HASH_SALT: e.z.string().optional(),
        KOFI_GO_LIVE_AT: e.z.string().optional(),
        DISCORD_ADMIN_WEBHOOK_URL: e.z.string().optional(),
        DISCORD_BLOG_WEBHOOK_URL: e.z.string().optional(),
        DISCORD_TOURNAMENT_WEBHOOK_URL: e.z.string().optional(),
        DISCORD_SECURITY_WEBHOOK: e.z.string().optional(),
        CSRF_SECRET: e.z.string().optional(),
        CRON_SECRET: e.z.string().optional(),
        REVALIDATION_SECRET: e.z.string().optional(),
        BOT_API_SECRET: e.z.string().optional(),
        VIEW_HASH_SALT: e.z.string().optional(),
        ANALYTICS_SALT: e.z.string().optional(),
        S3_ACCESS_KEY: e.z.string().optional(),
        S3_SECRET_KEY: e.z.string().optional(),
        S3_BUCKET: e.z.string().optional(),
        S3_REGION: e.z.string().default("auto"),
        S3_ENDPOINT: e.z.string().optional(),
        R2_ACCOUNT_ID: e.z.string().optional(),
        R2_ACCESS_KEY_ID: e.z.string().optional(),
        R2_SECRET_ACCESS_KEY: e.z.string().optional(),
        R2_BUCKET_NAME: e.z.string().optional(),
        R2_BUCKET_PATH: e.z.string().default("images"),
        R2_CDN_URL: e.z.string().default("https://cdn.prydwen.gg"),
        R2_BUCKET: e.z.string().optional(),
        R2_REGION: e.z.string().optional(),
        R2_ENDPOINT: e.z.string().optional(),
        R2_SYNC_ON_DEMAND: e.z.string().optional(),
        CDN_URL: e.z.string().default("https://cdn.prydwen.gg"),
        GOOGLE_SHEETS_API_KEY: e.z.string().optional(),
        GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL: e.z.string().optional(),
        GOOGLE_SHEETS_PRIVATE_KEY: e.z.string().optional(),
        IRMINSUL_API_BASE: e.z.string().optional(),
        IRMINSUL_API_KEY: e.z.string().optional(),
        IRMINSUL_TLS_PINNED_SHA256: e.z.string().optional(),
        IRMINSUL_TLS_INSECURE: e.z.string().optional(),
        SMTP_HOST: e.z.string().optional(),
        SMTP_PORT: e.z.string().optional(),
        SMTP_USER: e.z.string().optional(),
        SMTP_PASS: e.z.string().optional(),
        SMTP_FROM: e.z.string().default("noreply@prydwen.gg"),
        CF_ZONE_ID: e.z.string().optional(),
        CF_API_TOKEN: e.z.string().optional(),
        SITE_URL: e.z.string().default("https://prydwen.gg"),
        RSC_EDGE_PURGE_URL: e.z.string().optional(),
        RSC_EDGE_PURGE_TOKEN: e.z.string().optional(),
        ORIGIN_TOKEN: e.z.string().optional(),
        EDGE_WARM: e.z.string().optional(),
        EDGE_WARM_V2: e.z.string().optional(),
        REDIS_URL: e.z.string().optional(),
        SLACK_SECURITY_WEBHOOK: e.z.string().optional(),
        SENTRY_ORG: e.z.string().optional(),
        SENTRY_PROJECT: e.z.string().optional(),
        SENTRY_AUTH_TOKEN: e.z.string().optional(),
        COOKIE_DOMAIN: e.z.string().optional(),
        LOG_LEVEL: e.z.enum(["debug", "info", "warn", "error"]).optional(),
        CACHE_DEBUG: e.z.string().default("false"),
        CACHE_WARM_CONCURRENCY: e.z.string().optional(),
        STARTUP_BG_WARM: e.z.string().optional(),
        STARTUP_BG_WARM_CONCURRENCY: e.z.string().optional(),
        STARTUP_BG_WARM_BATCH_DELAY_MS: e.z.string().optional(),
        STARTUP_BG_WARM_MAX: e.z.string().optional(),
        ALLOW_ROBOTS_CRAWL: e.z.string().default("false"),
        SKIP_SECRET_VALIDATION: e.z.string().optional(),
        NEXT_BUILD_SKIP_DB: e.z.string().optional(),
        UPLOAD_DIR: e.z.string().default("public/uploads"),
        PORT: e.z.string().default("3000"),
        INTERNAL_BASE_URL: e.z.string().optional(),
        CSP_REPORT_ONLY: e.z.string().optional(),
        CANONICAL_HOSTS: e.z.string().optional(),
        AD_NETWORK_SCRIPT_ALLOWLIST: e.z.string().optional(),
        TRUST_PROXY: e.z.string().default("false"),
        WARMUP_SECRET: e.z.string().optional(),
        CSRF_TRUSTED_ORIGINS: e.z.string().optional()
    });
    var n = e.z.object({
        NEXT_PUBLIC_GA_ID: e.z.string().optional(),
        NEXT_PUBLIC_APP_URL: e.z.string().default("https://prydwen.gg"),
        NEXT_PUBLIC_SITE_URL: e.z.string().default("https://prydwen.gg"),
        NEXT_PUBLIC_PLAYWIRE_PUB_ID: e.z.string().optional(),
        NEXT_PUBLIC_PLAYWIRE_WEBSITE_ID: e.z.string().optional(),
        NEXT_PUBLIC_ENABLE_ADMIRAL: e.z.string().default("false"),
        NEXT_PUBLIC_ADS_ENABLED: e.z.string().default("true"),
        NEXT_PUBLIC_ADS_TEST_MODE: e.z.string().default("false"),
        NEXT_PUBLIC_SENTRY_DSN: e.z.string().optional()
    });
    "true" === r.default.env.NEXT_BUILD_SKIP_DB || r.default.env.NEXT_PHASE;
    var i = function() {
        var t = n.safeParse({
            NEXT_PUBLIC_GA_ID: r.default.env.NEXT_PUBLIC_GA_ID,
            NEXT_PUBLIC_APP_URL: r.default.env.NEXT_PUBLIC_APP_URL,
            NEXT_PUBLIC_SITE_URL: "https://www.prydwen.gg",
            NEXT_PUBLIC_PLAYWIRE_PUB_ID: r.default.env.NEXT_PUBLIC_PLAYWIRE_PUB_ID,
            NEXT_PUBLIC_PLAYWIRE_WEBSITE_ID: r.default.env.NEXT_PUBLIC_PLAYWIRE_WEBSITE_ID,
            NEXT_PUBLIC_ENABLE_ADMIRAL: r.default.env.NEXT_PUBLIC_ENABLE_ADMIRAL,
            NEXT_PUBLIC_ADS_ENABLED: r.default.env.NEXT_PUBLIC_ADS_ENABLED,
            NEXT_PUBLIC_ADS_TEST_MODE: r.default.env.NEXT_PUBLIC_ADS_TEST_MODE,
            NEXT_PUBLIC_SENTRY_DSN: r.default.env.NEXT_PUBLIC_SENTRY_DSN
        });
        if (!t.success) throw Error("Invalid client environment variables:\n".concat(JSON.stringify(t.error.flatten().fieldErrors, null, 2)));
        return t.data
    }();
    t.s(["clientEnv", 0, i, "serverEnv", 0, {}])
}, 62617, t => {
    "use strict";
    var r = t.i(347015),
        e = r.serverEnv.R2_CDN_URL || r.serverEnv.CDN_URL || "https://cdn.prydwen.gg",
        n = r.serverEnv.R2_BUCKET_PATH || "images";

    function i(t, r) {
        if (!t || null == r || "" === r) return t;
        var e = encodeURIComponent(String(r)),
            n = t.includes("?") ? "&" : "?";
        return "".concat(t).concat(n, "v=").concat(e)
    }

    function o(t, r) {
        if (t.startsWith("http://") || t.startsWith("https://")) return i(t, r);
        var o = t.startsWith("/") ? t.slice(1) : t;
        return i("".concat(e, "/").concat(n, "/").concat(o), r)
    }
    t.s(["getCdnUrl", 0, o, "getR2Url", 0, o, "withVersion", 0, i])
}]);