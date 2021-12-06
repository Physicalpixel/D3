// https://github.com/vasturiano/d3-force-3d v3.0.2 Copyright 2021 Vasco Asturiano
! function(n, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("d3-binarytree"), require("d3-quadtree"), require("d3-octree"), require("d3-dispatch"), require("d3-timer")) : "function" == typeof define && define.amd ? define(["exports", "d3-binarytree", "d3-quadtree", "d3-octree", "d3-dispatch", "d3-timer"], t) : t((n = "undefined" != typeof globalThis ? globalThis : n || self).d3 = n.d3 || {}, n.d3, n.d3, n.d3, n.d3, n.d3) }(this, (function(n, t, e, r, i, u) {
    "use strict";

    function o(n) { return function() { return n } }

    function f(n) { return 1e-6 * (n() - .5) }

    function a(n) { return n.x + n.vx }

    function c(n) { return n.y + n.vy }

    function l(n) { return n.z + n.vz }

    function h(n) { return n.index }

    function v(n, t) { var e = n.get(t); if (!e) throw new Error("node not found: " + t); return e }
    const d = 4294967296;

    function y(n) { return n.x }

    function s(n) { return n.y }

    function g(n) { return n.z }
    var x = Math.PI * (3 - Math.sqrt(5)),
        z = 20 * Math.PI / (9 + Math.sqrt(221));
    n.forceCenter = function(n, t, e) {
        var r, i = 1;

        function u() {
            var u, o, f = r.length,
                a = 0,
                c = 0,
                l = 0;
            for (u = 0; u < f; ++u) a += (o = r[u]).x || 0, c += o.y || 0, l += o.z || 0;
            for (a = (a / f - n) * i, c = (c / f - t) * i, l = (l / f - e) * i, u = 0; u < f; ++u) o = r[u], a && (o.x -= a), c && (o.y -= c), l && (o.z -= l)
        }
        return null == n && (n = 0), null == t && (t = 0), null == e && (e = 0), u.initialize = function(n) { r = n }, u.x = function(t) { return arguments.length ? (n = +t, u) : n }, u.y = function(n) { return arguments.length ? (t = +n, u) : t }, u.z = function(n) { return arguments.length ? (e = +n, u) : e }, u.strength = function(n) { return arguments.length ? (i = +n, u) : i }, u
    }, n.forceCollide = function(n) {
        var i, u, h, v, d = 1,
            y = 1;

        function s() {
            for (var n, o, s, x, z, p, M, w, q = i.length, N = 0; N < y; ++N)
                for (o = (1 === u ? t.binarytree(i, a) : 2 === u ? e.quadtree(i, a, c) : 3 === u ? r.octree(i, a, c, l) : null).visitAfter(g), n = 0; n < q; ++n) s = i[n], M = h[s.index], w = M * M, x = s.x + s.vx, u > 1 && (z = s.y + s.vy), u > 2 && (p = s.z + s.vz), o.visit(m);

            function m(n, t, e, r, i, o, a) {
                var c = [t, e, r, i, o, a],
                    l = c[0],
                    h = c[1],
                    y = c[2],
                    g = c[u],
                    q = c[u + 1],
                    N = c[u + 2],
                    m = n.data,
                    A = n.r,
                    b = M + A;
                if (!m) return l > x + b || g < x - b || u > 1 && (h > z + b || q < z - b) || u > 2 && (y > p + b || N < p - b);
                if (m.index > s.index) {
                    var k = x - m.x - m.vx,
                        E = u > 1 ? z - m.y - m.vy : 0,
                        j = u > 2 ? p - m.z - m.vz : 0,
                        D = k * k + E * E + j * j;
                    D < b * b && (0 === k && (D += (k = f(v)) * k), u > 1 && 0 === E && (D += (E = f(v)) * E), u > 2 && 0 === j && (D += (j = f(v)) * j), D = (b - (D = Math.sqrt(D))) / D * d, s.vx += (k *= D) * (b = (A *= A) / (w + A)), u > 1 && (s.vy += (E *= D) * b), u > 2 && (s.vz += (j *= D) * b), m.vx -= k * (b = 1 - b), u > 1 && (m.vy -= E * b), u > 2 && (m.vz -= j * b))
                }
            }
        }

        function g(n) { if (n.data) return n.r = h[n.data.index]; for (var t = n.r = 0; t < Math.pow(2, u); ++t) n[t] && n[t].r > n.r && (n.r = n[t].r) }

        function x() { if (i) { var t, e, r = i.length; for (h = new Array(r), t = 0; t < r; ++t) e = i[t], h[e.index] = +n(e, t, i) } }
        return "function" != typeof n && (n = o(null == n ? 1 : +n)), s.initialize = function(n, ...t) { i = n, v = t.find((n => "function" == typeof n)) || Math.random, u = t.find((n => [1, 2, 3].includes(n))) || 2, x() }, s.iterations = function(n) { return arguments.length ? (y = +n, s) : y }, s.strength = function(n) { return arguments.length ? (d = +n, s) : d }, s.radius = function(t) { return arguments.length ? (n = "function" == typeof t ? t : o(+t), x(), s) : n }, s
    }, n.forceLink = function(n) {
        var t, e, r, i, u, a, c, l = h,
            d = function(n) { return 1 / Math.min(u[n.source.index], u[n.target.index]) },
            y = o(30),
            s = 1;

        function g(r) {
            for (var u = 0, o = n.length; u < s; ++u)
                for (var l, h, v, d, y, g = 0, x = 0, z = 0, p = 0; g < o; ++g) h = (l = n[g]).source, x = (v = l.target).x + v.vx - h.x - h.vx || f(c), i > 1 && (z = v.y + v.vy - h.y - h.vy || f(c)), i > 2 && (p = v.z + v.vz - h.z - h.vz || f(c)), x *= d = ((d = Math.sqrt(x * x + z * z + p * p)) - e[g]) / d * r * t[g], z *= d, p *= d, v.vx -= x * (y = a[g]), i > 1 && (v.vy -= z * y), i > 2 && (v.vz -= p * y), h.vx += x * (y = 1 - y), i > 1 && (h.vy += z * y), i > 2 && (h.vz += p * y)
        }

        function x() {
            if (r) {
                var i, o, f = r.length,
                    c = n.length,
                    h = new Map(r.map(((n, t) => [l(n, t, r), n])));
                for (i = 0, u = new Array(f); i < c; ++i)(o = n[i]).index = i, "object" != typeof o.source && (o.source = v(h, o.source)), "object" != typeof o.target && (o.target = v(h, o.target)), u[o.source.index] = (u[o.source.index] || 0) + 1, u[o.target.index] = (u[o.target.index] || 0) + 1;
                for (i = 0, a = new Array(c); i < c; ++i) o = n[i], a[i] = u[o.source.index] / (u[o.source.index] + u[o.target.index]);
                t = new Array(c), z(), e = new Array(c), p()
            }
        }

        function z() {
            if (r)
                for (var e = 0, i = n.length; e < i; ++e) t[e] = +d(n[e], e, n)
        }

        function p() {
            if (r)
                for (var t = 0, i = n.length; t < i; ++t) e[t] = +y(n[t], t, n)
        }
        return null == n && (n = []), g.initialize = function(n, ...t) { r = n, c = t.find((n => "function" == typeof n)) || Math.random, i = t.find((n => [1, 2, 3].includes(n))) || 2, x() }, g.links = function(t) { return arguments.length ? (n = t, x(), g) : n }, g.id = function(n) { return arguments.length ? (l = n, g) : l }, g.iterations = function(n) { return arguments.length ? (s = +n, g) : s }, g.strength = function(n) { return arguments.length ? (d = "function" == typeof n ? n : o(+n), z(), g) : d }, g.distance = function(n) { return arguments.length ? (y = "function" == typeof n ? n : o(+n), p(), g) : y }, g
    }, n.forceManyBody = function() {
        var n, i, u, a, c, l, h = o(-30),
            v = 1,
            d = 1 / 0,
            x = .81;

        function z(o) {
            var f, a = n.length,
                l = (1 === i ? t.binarytree(n, y) : 2 === i ? e.quadtree(n, y, s) : 3 === i ? r.octree(n, y, s, g) : null).visitAfter(M);
            for (c = o, f = 0; f < a; ++f) u = n[f], l.visit(w)
        }

        function p() { if (n) { var t, e, r = n.length; for (l = new Array(r), t = 0; t < r; ++t) e = n[t], l[e.index] = +h(e, t, n) } }

        function M(n) {
            var t, e, r, u, o, f, a = 0,
                c = 0,
                h = n.length;
            if (h) {
                for (r = u = o = f = 0; f < h; ++f)(t = n[f]) && (e = Math.abs(t.value)) && (a += t.value, c += e, r += e * (t.x || 0), u += e * (t.y || 0), o += e * (t.z || 0));
                a *= Math.sqrt(4 / h), n.x = r / c, i > 1 && (n.y = u / c), i > 2 && (n.z = o / c)
            } else {
                (t = n).x = t.data.x, i > 1 && (t.y = t.data.y), i > 2 && (t.z = t.data.z);
                do { a += l[t.data.index] } while (t = t.next)
            }
            n.value = a
        }

        function w(n, t, e, r, o) {
            if (!n.value) return !0;
            var h = [e, r, o][i - 1],
                y = n.x - u.x,
                s = i > 1 ? n.y - u.y : 0,
                g = i > 2 ? n.z - u.z : 0,
                z = h - t,
                p = y * y + s * s + g * g;
            if (z * z / x < p) return p < d && (0 === y && (p += (y = f(a)) * y), i > 1 && 0 === s && (p += (s = f(a)) * s), i > 2 && 0 === g && (p += (g = f(a)) * g), p < v && (p = Math.sqrt(v * p)), u.vx += y * n.value * c / p, i > 1 && (u.vy += s * n.value * c / p), i > 2 && (u.vz += g * n.value * c / p)), !0;
            if (!(n.length || p >= d)) {
                (n.data !== u || n.next) && (0 === y && (p += (y = f(a)) * y), i > 1 && 0 === s && (p += (s = f(a)) * s), i > 2 && 0 === g && (p += (g = f(a)) * g), p < v && (p = Math.sqrt(v * p)));
                do { n.data !== u && (z = l[n.data.index] * c / p, u.vx += y * z, i > 1 && (u.vy += s * z), i > 2 && (u.vz += g * z)) } while (n = n.next)
            }
        }
        return z.initialize = function(t, ...e) { n = t, a = e.find((n => "function" == typeof n)) || Math.random, i = e.find((n => [1, 2, 3].includes(n))) || 2, p() }, z.strength = function(n) { return arguments.length ? (h = "function" == typeof n ? n : o(+n), p(), z) : h }, z.distanceMin = function(n) { return arguments.length ? (v = n * n, z) : Math.sqrt(v) }, z.distanceMax = function(n) { return arguments.length ? (d = n * n, z) : Math.sqrt(d) }, z.theta = function(n) { return arguments.length ? (x = n * n, z) : Math.sqrt(x) }, z
    }, n.forceRadial = function(n, t, e, r) {
        var i, u, f, a, c = o(.1);

        function l(n) {
            for (var o = 0, c = i.length; o < c; ++o) {
                var l = i[o],
                    h = l.x - t || 1e-6,
                    v = (l.y || 0) - e || 1e-6,
                    d = (l.z || 0) - r || 1e-6,
                    y = Math.sqrt(h * h + v * v + d * d),
                    s = (a[o] - y) * f[o] * n / y;
                l.vx += h * s, u > 1 && (l.vy += v * s), u > 2 && (l.vz += d * s)
            }
        }

        function h() { if (i) { var t, e = i.length; for (f = new Array(e), a = new Array(e), t = 0; t < e; ++t) a[t] = +n(i[t], t, i), f[t] = isNaN(a[t]) ? 0 : +c(i[t], t, i) } }
        return "function" != typeof n && (n = o(+n)), null == t && (t = 0), null == e && (e = 0), null == r && (r = 0), l.initialize = function(n, ...t) { i = n, u = t.find((n => [1, 2, 3].includes(n))) || 2, h() }, l.strength = function(n) { return arguments.length ? (c = "function" == typeof n ? n : o(+n), h(), l) : c }, l.radius = function(t) { return arguments.length ? (n = "function" == typeof t ? t : o(+t), h(), l) : n }, l.x = function(n) { return arguments.length ? (t = +n, l) : t }, l.y = function(n) { return arguments.length ? (e = +n, l) : e }, l.z = function(n) { return arguments.length ? (r = +n, l) : r }, l
    }, n.forceSimulation = function(n, t) {
        t = t || 2;
        var e, r = Math.min(3, Math.max(1, Math.round(t))),
            o = 1,
            f = .001,
            a = 1 - Math.pow(f, 1 / 300),
            c = 0,
            l = .6,
            h = new Map,
            v = u.timer(g),
            y = i.dispatch("tick", "end"),
            s = function() { let n = 1; return () => (n = (1664525 * n + 1013904223) % d) / d }();

        function g() { p(), y.call("tick", e), o < f && (v.stop(), y.call("end", e)) }

        function p(t) {
            var i, u, f = n.length;
            void 0 === t && (t = 1);
            for (var v = 0; v < t; ++v)
                for (o += (c - o) * a, h.forEach((function(n) { n(o) })), i = 0; i < f; ++i) null == (u = n[i]).fx ? u.x += u.vx *= l : (u.x = u.fx, u.vx = 0), r > 1 && (null == u.fy ? u.y += u.vy *= l : (u.y = u.fy, u.vy = 0)), r > 2 && (null == u.fz ? u.z += u.vz *= l : (u.z = u.fz, u.vz = 0));
            return e
        }

        function M() {
            for (var t, e = 0, i = n.length; e < i; ++e) {
                if ((t = n[e]).index = e, null != t.fx && (t.x = t.fx), null != t.fy && (t.y = t.fy), null != t.fz && (t.z = t.fz), isNaN(t.x) || r > 1 && isNaN(t.y) || r > 2 && isNaN(t.z)) {
                    var u = 10 * (r > 2 ? Math.cbrt(.5 + e) : r > 1 ? Math.sqrt(.5 + e) : e),
                        o = e * x,
                        f = e * z;
                    1 === r ? t.x = u : 2 === r ? (t.x = u * Math.cos(o), t.y = u * Math.sin(o)) : (t.x = u * Math.sin(o) * Math.cos(f), t.y = u * Math.cos(o), t.z = u * Math.sin(o) * Math.sin(f))
                }(isNaN(t.vx) || r > 1 && isNaN(t.vy) || r > 2 && isNaN(t.vz)) && (t.vx = 0, r > 1 && (t.vy = 0), r > 2 && (t.vz = 0))
            }
        }

        function w(t) { return t.initialize && t.initialize(n, s, r), t }
        return null == n && (n = []), M(), e = {
            tick: p,
            restart: function() { return v.restart(g), e },
            stop: function() { return v.stop(), e },
            numDimensions: function(n) { return arguments.length ? (r = Math.min(3, Math.max(1, Math.round(n))), h.forEach(w), e) : r },
            nodes: function(t) { return arguments.length ? (n = t, M(), h.forEach(w), e) : n },
            alpha: function(n) { return arguments.length ? (o = +n, e) : o },
            alphaMin: function(n) { return arguments.length ? (f = +n, e) : f },
            alphaDecay: function(n) { return arguments.length ? (a = +n, e) : +a },
            alphaTarget: function(n) { return arguments.length ? (c = +n, e) : c },
            velocityDecay: function(n) { return arguments.length ? (l = 1 - n, e) : 1 - l },
            randomSource: function(n) { return arguments.length ? (s = n, h.forEach(w), e) : s },
            force: function(n, t) { return arguments.length > 1 ? (null == t ? h.delete(n) : h.set(n, w(t)), e) : h.get(n) },
            find: function() {
                var t, e, i, u, o, f, a = Array.prototype.slice.call(arguments),
                    c = a.shift() || 0,
                    l = (r > 1 ? a.shift() : null) || 0,
                    h = (r > 2 ? a.shift() : null) || 0,
                    v = a.shift() || 1 / 0,
                    d = 0,
                    y = n.length;
                for (v *= v, d = 0; d < y; ++d)(u = (t = c - (o = n[d]).x) * t + (e = l - (o.y || 0)) * e + (i = h - (o.z || 0)) * i) < v && (f = o, v = u);
                return f
            },
            on: function(n, t) { return arguments.length > 1 ? (y.on(n, t), e) : y.on(n) }
        }
    }, n.forceX = function(n) {
        var t, e, r, i = o(.1);

        function u(n) { for (var i, u = 0, o = t.length; u < o; ++u)(i = t[u]).vx += (r[u] - i.x) * e[u] * n }

        function f() { if (t) { var u, o = t.length; for (e = new Array(o), r = new Array(o), u = 0; u < o; ++u) e[u] = isNaN(r[u] = +n(t[u], u, t)) ? 0 : +i(t[u], u, t) } }
        return "function" != typeof n && (n = o(null == n ? 0 : +n)), u.initialize = function(n) { t = n, f() }, u.strength = function(n) { return arguments.length ? (i = "function" == typeof n ? n : o(+n), f(), u) : i }, u.x = function(t) { return arguments.length ? (n = "function" == typeof t ? t : o(+t), f(), u) : n }, u
    }, n.forceY = function(n) {
        var t, e, r, i = o(.1);

        function u(n) { for (var i, u = 0, o = t.length; u < o; ++u)(i = t[u]).vy += (r[u] - i.y) * e[u] * n }

        function f() { if (t) { var u, o = t.length; for (e = new Array(o), r = new Array(o), u = 0; u < o; ++u) e[u] = isNaN(r[u] = +n(t[u], u, t)) ? 0 : +i(t[u], u, t) } }
        return "function" != typeof n && (n = o(null == n ? 0 : +n)), u.initialize = function(n) { t = n, f() }, u.strength = function(n) { return arguments.length ? (i = "function" == typeof n ? n : o(+n), f(), u) : i }, u.y = function(t) { return arguments.length ? (n = "function" == typeof t ? t : o(+t), f(), u) : n }, u
    }, n.forceZ = function(n) {
        var t, e, r, i = o(.1);

        function u(n) { for (var i, u = 0, o = t.length; u < o; ++u)(i = t[u]).vz += (r[u] - i.z) * e[u] * n }

        function f() { if (t) { var u, o = t.length; for (e = new Array(o), r = new Array(o), u = 0; u < o; ++u) e[u] = isNaN(r[u] = +n(t[u], u, t)) ? 0 : +i(t[u], u, t) } }
        return "function" != typeof n && (n = o(null == n ? 0 : +n)), u.initialize = function(n) { t = n, f() }, u.strength = function(n) { return arguments.length ? (i = "function" == typeof n ? n : o(+n), f(), u) : i }, u.z = function(t) { return arguments.length ? (n = "function" == typeof t ? t : o(+t), f(), u) : n }, u
    }, Object.defineProperty(n, "__esModule", { value: !0 })
}));