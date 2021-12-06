// https://github.com/vasturiano/d3-octree v0.2.0 Copyright 2021 Vasco Asturiano
! function(t, i) { "object" == typeof exports && "undefined" != typeof module ? i(exports) : "function" == typeof define && define.amd ? define(["exports"], i) : i((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 = t.d3 || {}) }(this, (function(t) {
    "use strict";

    function i(t, i, n, e, s) {
        if (isNaN(i) || isNaN(n) || isNaN(e)) return t;
        var h, r, o, a, l, u, _, f, c, y, x, d, p = t._root,
            w = { data: s },
            z = t._x0,
            N = t._y0,
            v = t._z0,
            g = t._x1,
            b = t._y1,
            A = t._z1;
        if (!p) return t._root = w, t;
        for (; p.length;)
            if ((f = i >= (r = (z + g) / 2)) ? z = r : g = r, (c = n >= (o = (N + b) / 2)) ? N = o : b = o, (y = e >= (a = (v + A) / 2)) ? v = a : A = a, h = p, !(p = p[x = y << 2 | c << 1 | f])) return h[x] = w, t;
        if (l = +t._x.call(null, p.data), u = +t._y.call(null, p.data), _ = +t._z.call(null, p.data), i === l && n === u && e === _) return w.next = p, h ? h[x] = w : t._root = w, t;
        do { h = h ? h[x] = new Array(8) : t._root = new Array(8), (f = i >= (r = (z + g) / 2)) ? z = r : g = r, (c = n >= (o = (N + b) / 2)) ? N = o : b = o, (y = e >= (a = (v + A) / 2)) ? v = a : A = a } while ((x = y << 2 | c << 1 | f) == (d = (_ >= a) << 2 | (u >= o) << 1 | l >= r));
        return h[d] = p, h[x] = w, t
    }

    function n(t, i, n, e, s, h, r) { this.node = t, this.x0 = i, this.y0 = n, this.z0 = e, this.x1 = s, this.y1 = h, this.z1 = r }

    function e(t) { return t[0] }

    function s(t) { return t[1] }

    function h(t) { return t[2] }

    function r(t, i, n, r) { var a = new o(null == i ? e : i, null == n ? s : n, null == r ? h : r, NaN, NaN, NaN, NaN, NaN, NaN); return null == t ? a : a.addAll(t) }

    function o(t, i, n, e, s, h, r, o, a) { this._x = t, this._y = i, this._z = n, this._x0 = e, this._y0 = s, this._z0 = h, this._x1 = r, this._y1 = o, this._z1 = a, this._root = void 0 }

    function a(t) { for (var i = { data: t.data }, n = i; t = t.next;) n = n.next = { data: t.data }; return i }
    var l = r.prototype = o.prototype;
    l.copy = function() {
        var t, i, n = new o(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1),
            e = this._root;
        if (!e) return n;
        if (!e.length) return n._root = a(e), n;
        for (t = [{ source: e, target: n._root = new Array(8) }]; e = t.pop();)
            for (var s = 0; s < 8; ++s)(i = e.source[s]) && (i.length ? t.push({ source: i, target: e.target[s] = new Array(8) }) : e.target[s] = a(i));
        return n
    }, l.add = function(t) {
        var n = +this._x.call(null, t),
            e = +this._y.call(null, t),
            s = +this._z.call(null, t);
        return i(this.cover(n, e, s), n, e, s, t)
    }, l.addAll = function(t) {
        var n, e, s, h, r, o = t.length,
            a = new Array(o),
            l = new Array(o),
            u = new Array(o),
            _ = 1 / 0,
            f = 1 / 0,
            c = 1 / 0,
            y = -1 / 0,
            x = -1 / 0,
            d = -1 / 0;
        for (e = 0; e < o; ++e) isNaN(s = +this._x.call(null, n = t[e])) || isNaN(h = +this._y.call(null, n)) || isNaN(r = +this._z.call(null, n)) || (a[e] = s, l[e] = h, u[e] = r, s < _ && (_ = s), s > y && (y = s), h < f && (f = h), h > x && (x = h), r < c && (c = r), r > d && (d = r));
        if (_ > y || f > x || c > d) return this;
        for (this.cover(_, f, c).cover(y, x, d), e = 0; e < o; ++e) i(this, a[e], l[e], u[e], t[e]);
        return this
    }, l.cover = function(t, i, n) {
        if (isNaN(t = +t) || isNaN(i = +i) || isNaN(n = +n)) return this;
        var e = this._x0,
            s = this._y0,
            h = this._z0,
            r = this._x1,
            o = this._y1,
            a = this._z1;
        if (isNaN(e)) r = (e = Math.floor(t)) + 1, o = (s = Math.floor(i)) + 1, a = (h = Math.floor(n)) + 1;
        else {
            for (var l, u, _ = r - e || 1, f = this._root; e > t || t >= r || s > i || i >= o || h > n || n >= a;) switch (u = (n < h) << 2 | (i < s) << 1 | t < e, (l = new Array(8))[u] = f, f = l, _ *= 2, u) {
                case 0:
                    r = e + _, o = s + _, a = h + _;
                    break;
                case 1:
                    e = r - _, o = s + _, a = h + _;
                    break;
                case 2:
                    r = e + _, s = o - _, a = h + _;
                    break;
                case 3:
                    e = r - _, s = o - _, a = h + _;
                    break;
                case 4:
                    r = e + _, o = s + _, h = a - _;
                    break;
                case 5:
                    e = r - _, o = s + _, h = a - _;
                    break;
                case 6:
                    r = e + _, s = o - _, h = a - _;
                    break;
                case 7:
                    e = r - _, s = o - _, h = a - _
            }
            this._root && this._root.length && (this._root = f)
        }
        return this._x0 = e, this._y0 = s, this._z0 = h, this._x1 = r, this._y1 = o, this._z1 = a, this
    }, l.data = function() {
        var t = [];
        return this.visit((function(i) {
            if (!i.length)
                do { t.push(i.data) } while (i = i.next)
        })), t
    }, l.extent = function(t) {
        return arguments.length ? this.cover(+t[0][0], +t[0][1], +t[0][2]).cover(+t[1][0], +t[1][1], +t[1][2]) : isNaN(this._x0) ? void 0 : [
            [this._x0, this._y0, this._z0],
            [this._x1, this._y1, this._z1]
        ]
    }, l.find = function(t, i, e, s) {
        var h, r, o, a, l, u, _, f, c, y = this._x0,
            x = this._y0,
            d = this._z0,
            p = this._x1,
            w = this._y1,
            z = this._z1,
            N = [],
            v = this._root;
        for (v && N.push(new n(v, y, x, d, p, w, z)), null == s ? s = 1 / 0 : (y = t - s, x = i - s, d = e - s, p = t + s, w = i + s, z = e + s, s *= s); f = N.pop();)
            if (!(!(v = f.node) || (r = f.x0) > p || (o = f.y0) > w || (a = f.z0) > z || (l = f.x1) < y || (u = f.y1) < x || (_ = f.z1) < d))
                if (v.length) {
                    var g = (r + l) / 2,
                        b = (o + u) / 2,
                        A = (a + _) / 2;
                    N.push(new n(v[7], g, b, A, l, u, _), new n(v[6], r, b, A, g, u, _), new n(v[5], g, o, A, l, b, _), new n(v[4], r, o, A, g, b, _), new n(v[3], g, b, a, l, u, A), new n(v[2], r, b, a, g, u, A), new n(v[1], g, o, a, l, b, A), new n(v[0], r, o, a, g, b, A)), (c = (e >= A) << 2 | (i >= b) << 1 | t >= g) && (f = N[N.length - 1], N[N.length - 1] = N[N.length - 1 - c], N[N.length - 1 - c] = f)
                } else {
                    var k = t - +this._x.call(null, v.data),
                        m = i - +this._y.call(null, v.data),
                        M = e - +this._z.call(null, v.data),
                        j = k * k + m * m + M * M;
                    if (j < s) {
                        var T = Math.sqrt(s = j);
                        y = t - T, x = i - T, d = e - T, p = t + T, w = i + T, z = e + T, h = v.data
                    }
                }
        return h
    }, l.remove = function(t) {
        if (isNaN(h = +this._x.call(null, t)) || isNaN(r = +this._y.call(null, t)) || isNaN(o = +this._z.call(null, t))) return this;
        var i, n, e, s, h, r, o, a, l, u, _, f, c, y, x, d = this._root,
            p = this._x0,
            w = this._y0,
            z = this._z0,
            N = this._x1,
            v = this._y1,
            g = this._z1;
        if (!d) return this;
        if (d.length)
            for (;;) {
                if ((_ = h >= (a = (p + N) / 2)) ? p = a : N = a, (f = r >= (l = (w + v) / 2)) ? w = l : v = l, (c = o >= (u = (z + g) / 2)) ? z = u : g = u, i = d, !(d = d[y = c << 2 | f << 1 | _])) return this;
                if (!d.length) break;
                (i[y + 1 & 7] || i[y + 2 & 7] || i[y + 3 & 7] || i[y + 4 & 7] || i[y + 5 & 7] || i[y + 6 & 7] || i[y + 7 & 7]) && (n = i, x = y)
            }
        for (; d.data !== t;)
            if (e = d, !(d = d.next)) return this;
        return (s = d.next) && delete d.next, e ? (s ? e.next = s : delete e.next, this) : i ? (s ? i[y] = s : delete i[y], (d = i[0] || i[1] || i[2] || i[3] || i[4] || i[5] || i[6] || i[7]) && d === (i[7] || i[6] || i[5] || i[4] || i[3] || i[2] || i[1] || i[0]) && !d.length && (n ? n[x] = d : this._root = d), this) : (this._root = s, this)
    }, l.removeAll = function(t) { for (var i = 0, n = t.length; i < n; ++i) this.remove(t[i]); return this }, l.root = function() { return this._root }, l.size = function() {
        var t = 0;
        return this.visit((function(i) {
            if (!i.length)
                do {++t } while (i = i.next)
        })), t
    }, l.visit = function(t) {
        var i, e, s, h, r, o, a, l, u = [],
            _ = this._root;
        for (_ && u.push(new n(_, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); i = u.pop();)
            if (!t(_ = i.node, s = i.x0, h = i.y0, r = i.z0, o = i.x1, a = i.y1, l = i.z1) && _.length) {
                var f = (s + o) / 2,
                    c = (h + a) / 2,
                    y = (r + l) / 2;
                (e = _[7]) && u.push(new n(e, f, c, y, o, a, l)), (e = _[6]) && u.push(new n(e, s, c, y, f, a, l)), (e = _[5]) && u.push(new n(e, f, h, y, o, c, l)), (e = _[4]) && u.push(new n(e, s, h, y, f, c, l)), (e = _[3]) && u.push(new n(e, f, c, r, o, a, y)), (e = _[2]) && u.push(new n(e, s, c, r, f, a, y)), (e = _[1]) && u.push(new n(e, f, h, r, o, c, y)), (e = _[0]) && u.push(new n(e, s, h, r, f, c, y))
            }
        return this
    }, l.visitAfter = function(t) {
        var i, e = [],
            s = [];
        for (this._root && e.push(new n(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); i = e.pop();) {
            var h = i.node;
            if (h.length) {
                var r, o = i.x0,
                    a = i.y0,
                    l = i.z0,
                    u = i.x1,
                    _ = i.y1,
                    f = i.z1,
                    c = (o + u) / 2,
                    y = (a + _) / 2,
                    x = (l + f) / 2;
                (r = h[0]) && e.push(new n(r, o, a, l, c, y, x)), (r = h[1]) && e.push(new n(r, c, a, l, u, y, x)), (r = h[2]) && e.push(new n(r, o, y, l, c, _, x)), (r = h[3]) && e.push(new n(r, c, y, l, u, _, x)), (r = h[4]) && e.push(new n(r, o, a, x, c, y, f)), (r = h[5]) && e.push(new n(r, c, a, x, u, y, f)), (r = h[6]) && e.push(new n(r, o, y, x, c, _, f)), (r = h[7]) && e.push(new n(r, c, y, x, u, _, f))
            }
            s.push(i)
        }
        for (; i = s.pop();) t(i.node, i.x0, i.y0, i.z0, i.x1, i.y1, i.z1);
        return this
    }, l.x = function(t) { return arguments.length ? (this._x = t, this) : this._x }, l.y = function(t) { return arguments.length ? (this._y = t, this) : this._y }, l.z = function(t) { return arguments.length ? (this._z = t, this) : this._z }, t.octree = r, Object.defineProperty(t, "__esModule", { value: !0 })
}));