/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash include="extend,toArray,cloneDeep,isObject,isArray,first,last,rest,initial,each,mixin" exports="node"`
 */
;
(function () {
  function n(n) {
    n.length = 0, D.length < F && D.push(n)
  }

  function t(n, t, e) {
    t || (t = 0), typeof e == "undefined" && (e = n ? n.length : 0);
    var r = -1;
    e = e - t || 0;
    for (var o = Array(0 > e ? 0 : e); ++r < e;) o[r] = n[t + r];
    return o
  }

  function e(n) {
    return n && typeof n == "object" && !jt(n) && ct.call(n, "__wrapped__") ? n : new r(n)
  }

  function r(n, t) {
    this.__chain__ = !! t, this.__wrapped__ = n
  }

  function o(n) {
    function e() {
      if (o) {
        var n = t(o);
        ft.apply(n, arguments)
      }
      if (this instanceof e) {
        var a = i(r.prototype),
          n = r.apply(a, n || arguments);
        return _(n) ? n : a
      }
      return r.apply(u, n || arguments)
    }
    var r = n[0],
      o = n[2],
      u = n[4];
    return wt(e, n), e
  }

  function u(e, r, o, i, a) {
    if (o) {
      var c = o(e);
      if (typeof c != "undefined") return c
    }
    if (!_(e)) return e;
    var f = ut.call(e);
    if (!H[f]) return e;
    var l = bt[f];
    switch (f) {
    case T:
    case z:
      return new l(+e);
    case G:
    case q:
      return new l(e);
    case M:
      return c = l(e.source, I.exec(e)), c.lastIndex = e.lastIndex, c
    }
    if (f = jt(e), r) {
      var p = !i;
      i || (i = D.pop() || []), a || (a = D.pop() || []);
      for (var s = i.length; s--;)
        if (i[s] == e) return a[s];
      c = f ? l(e.length) : {}
    } else c = f ? t(e) : St({}, e);
    return f && (ct.call(e, "index") && (c.index = e.index), ct.call(e, "input") && (c.input = e.input)), r ? (i.push(e), a.push(c), (f ? At : Ct)(e, function (n, t) {
      c[t] = u(n, r, o, i, a)
    }), p && (n(i), n(a)), c) : c
  }

  function i(n) {
    return _(n) ? yt(n) : {}
  }

  function a(n, t, e) {
    if (typeof n != "function") return E;
    if (typeof t == "undefined" || !("prototype" in n)) return n;
    var r = n.__bindData__;
    if (typeof r == "undefined" && (dt.funcNames && (r = !n.name), r = r || !dt.funcDecomp, !r)) {
      var o = at.call(n);
      dt.funcNames || (r = !B.test(o)), r || (r = N.test(o), wt(n, r))
    }
    if (false === r || true !== r && 1 & r[1]) return n;
    switch (e) {
    case 1:
      return function (e) {
        return n.call(t, e)
      };
    case 2:
      return function (e, r) {
        return n.call(t, e, r)
      };
    case 3:
      return function (e, r, o) {
        return n.call(t, e, r, o)
      };
    case 4:
      return function (e, r, o, u) {
        return n.call(t, e, r, o, u)
      }
    }
    return j(n, t)
  }

  function c(n) {
    function e() {
      var n = p ? f : this;
      if (u) {
        var v = t(u);
        ft.apply(v, arguments)
      }
      return (a || y) && (v || (v = t(arguments)), a && ft.apply(v, a), y && v.length < l) ? (o |= 16, c([r, h ? o : -4 & o, v, null, f, l])) : (v || (v = arguments), s && (r = n[g]), this instanceof e ? (n = i(r.prototype), v = r.apply(n, v), _(v) ? v : n) : r.apply(n, v))
    }
    var r = n[0],
      o = n[1],
      u = n[2],
      a = n[3],
      f = n[4],
      l = n[5],
      p = 1 & o,
      s = 2 & o,
      y = 4 & o,
      h = 8 & o,
      g = r;
    return wt(e, n), e
  }

  function f(t, e, r, o, u, i) {
    if (r) {
      var a = r(t, e);
      if (typeof a != "undefined") return !!a
    }
    if (t === e) return 0 !== t || 1 / t == 1 / e;
    if (t === t && !(t && Q[typeof t] || e && Q[typeof e])) return false;
    if (null == t || null == e) return t === e;
    var c = ut.call(t),
      l = ut.call(e);
    if (c == L && (c = J), l == L && (l = J), c != l) return false;
    switch (c) {
    case T:
    case z:
      return +t == +e;
    case G:
      return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
    case M:
    case q:
      return t == e + ""
    }
    if (l = c == $, !l) {
      var p = ct.call(t, "__wrapped__"),
        s = ct.call(e, "__wrapped__");
      if (p || s) return f(p ? t.__wrapped__ : t, s ? e.__wrapped__ : e, r, o, u, i);
      if (c != J) return false;
      if (c = !dt.argsObject && y(t) ? Object : t.constructor, p = !dt.argsObject && y(e) ? Object : e.constructor, c != p && !(g(c) && c instanceof c && g(p) && p instanceof p) && "constructor" in t && "constructor" in e) return false
    }
    for (c = !u, u || (u = D.pop() || []), i || (i = D.pop() || []), p = u.length; p--;)
      if (u[p] == t) return i[p] == e;
    var h = 0,
      a = true;
    if (u.push(t), i.push(e), l) {
      if (p = t.length, h = e.length, (a = h == p) || o)
        for (; h--;)
          if (l = p, s = e[h], o)
            for (; l-- && !(a = f(t[l], s, r, o, u, i)););
          else if (!(a = f(t[h], s, r, o, u, i))) break
    } else kt(e, function (n, e, c) {
      return ct.call(c, e) ? (h++, a = ct.call(t, e) && f(t[e], n, r, o, u, i)) : void 0
    }), a && !o && kt(t, function (n, t, e) {
      return ct.call(e, t) ? a = -1 < --h : void 0
    });
    return u.pop(), i.pop(), c && (n(u), n(i)), a
  }

  function l(n, e, r, u, i, a) {
    var f = 1 & e,
      p = 4 & e,
      s = 16 & e,
      y = 32 & e;
    if (!(2 & e || g(n))) throw new TypeError;
    s && !r.length && (e &= -17, s = r = false), y && !u.length && (e &= -33, y = u = false);
    var h = n && n.__bindData__;
    return h && true !== h ? (h = t(h), h[2] && (h[2] = t(h[2])), h[3] && (h[3] = t(h[3])), !f || 1 & h[1] || (h[4] = i), !f && 1 & h[1] && (e |= 8), !p || 4 & h[1] || (h[5] = a), s && ft.apply(h[2] || (h[2] = []), r), y && pt.apply(h[3] || (h[3] = []), u), h[1] |= e, l.apply(null, h)) : (1 == e || 17 === e ? o : c)([n, e, r, u, i, a])
  }

  function p() {
    W.h = R, W.b = W.c = W.g = W.i = "", W.e = "t", W.j = true;
    for (var n, t = 0; n = arguments[t]; t++)
      for (var e in n) W[e] = n[e];
    t = W.a, W.d = /^[^,]+/.exec(t)[0], n = Function, t = "return function(" + t + "){", e = W;
    var r = "var n,t=" + e.d + ",E=" + e.e + ";if(!t)return E;" + e.i + ";";
    e.b ? (r += "var u=t.length;n=-1;if(" + e.b + "){", dt.unindexedChars && (r += "if(s(t)){t=t.split('')}"), r += "while(++n<u){" + e.g + ";}}else{") : dt.nonEnumArgs && (r += "var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';" + e.g + ";}}else{"), dt.enumPrototypes && (r += "var G=typeof t=='function';"), dt.enumErrorProps && (r += "var F=t===k||t instanceof Error;");
    var o = [];
    if (dt.enumPrototypes && o.push('!(G&&n=="prototype")'), dt.enumErrorProps && o.push('!(F&&(n=="message"||n=="name"))'), e.j && e.f) r += "var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];", o.length && (r += "if(" + o.join("&&") + "){"), r += e.g + ";", o.length && (r += "}"), r += "}";
    else if (r += "for(n in t){", e.j && o.push("m.call(t, n)"), o.length && (r += "if(" + o.join("&&") + "){"), r += e.g + ";", o.length && (r += "}"), r += "}", dt.nonEnumShadows) {
      for (r += "if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];", k = 0; 7 > k; k++) r += "n='" + e.h[k] + "';if((!(r&&x[n])&&m.call(t,n))", e.j || (r += "||(!x[n]&&t[n]!==A[n])"), r += "){" + e.g + "}";
      r += "}"
    }
    return (e.b || dt.nonEnumArgs) && (r += "}"), r += e.c + ";return E", n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L", t + r + "}")(a, K, et, ct, P, y, jt, v, W.f, rt, Q, mt, q, ot, ut)
  }

  function s(n) {
    return typeof n == "function" && it.test(n)
  }

  function y(n) {
    return n && typeof n == "object" && typeof n.length == "number" && ut.call(n) == L || false
  }

  function h(n) {
    var t = [];
    return kt(n, function (n, e) {
      g(n) && t.push(e)
    }), t.sort()
  }

  function g(n) {
    return typeof n == "function"
  }

  function _(n) {
    return !(!n || !Q[typeof n])
  }

  function v(n) {
    return typeof n == "string" || n && typeof n == "object" && ut.call(n) == q || false
  }

  function b(n) {
    for (var t = -1, e = xt(n), r = e.length, o = Array(r); ++t < r;) o[t] = n[e[t]];
    return o
  }

  function m(n, t, e) {
    if (t && typeof e == "undefined" && jt(n)) {
      e = -1;
      for (var r = n.length; ++e < r && false !== t(n[e], e, n););
    } else At(n, t, e);
    return n
  }

  function d(n, r, o) {
    var u = 0,
      i = n ? n.length : 0;
    if (typeof r != "number" && null != r) {
      var a = -1;
      for (r = e.createCallback(r, o, 3); ++a < i && r(n[a], a, n);) u++
    } else if (u = r, null == u || o) return n ? n[0] : C;
    return t(n, 0, vt(_t(0, u), i))
  }

  function w(n, r, o) {
    if (typeof r != "number" && null != r) {
      var u = 0,
        i = -1,
        a = n ? n.length : 0;
      for (r = e.createCallback(r, o, 3); ++i < a && r(n[i], i, n);) u++
    } else u = null == r || o ? 1 : _t(0, r);
    return t(n, u)
  }

  function j(n, e) {
    return 2 < arguments.length ? l(n, 17, t(arguments, 2), null, e) : l(n, 1, null, null, e)
  }

  function E(n) {
    return n
  }

  function x(n, t, o) {
    var u = true,
      i = t && h(t);
    t && (o || i.length) || (null == o && (o = t), a = r, t = n, n = e, i = h(t)), false === o ? u = false : _(o) && "chain" in o && (u = o.chain);
    var a = n,
      c = g(a);
    m(i, function (e) {
      var r = n[e] = t[e];
      c && (a.prototype[e] = function () {
        var t = this.__chain__,
          e = this.__wrapped__,
          o = [e];
        if (ft.apply(o, arguments), o = r.apply(n, o), u || t) {
          if (e === o && _(o)) return this;
          o = new a(o), o.__chain__ = t
        }
        return o
      })
    })
  }

  function O() {}

  function A(n) {
    return function (t) {
      return t[n]
    }
  }

  function S() {
    return this.__wrapped__
  }
  var C, D = [],
    P = {}, F = 40,
    I = /\w*$/,
    B = /^\s*function[ \n\r\t]+\w/,
    N = /\bthis\b/,
    R = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
    L = "[object Arguments]",
    $ = "[object Array]",
    T = "[object Boolean]",
    z = "[object Date]",
    K = "[object Error]",
    G = "[object Number]",
    J = "[object Object]",
    M = "[object RegExp]",
    q = "[object String]",
    H = {
      "[object Function]": false
    };
  H[L] = H[$] = H[T] = H[z] = H[G] = H[J] = H[M] = H[q] = true;
  var V = {
    configurable: false,
    enumerable: false,
    value: null,
    writable: false
  }, W = {
      a: "",
      b: null,
      c: "",
      d: "",
      e: "",
      v: null,
      g: "",
      h: null,
      support: null,
      i: "",
      j: false
    }, Q = {
      "boolean": false,
      "function": true,
      object: true,
      number: false,
      string: false,
      undefined: false
    }, U = Q[typeof window] && window || this,
    X = Q[typeof exports] && exports && !exports.nodeType && exports,
    Y = Q[typeof module] && module && !module.nodeType && module,
    Z = Y && Y.exports === X && X,
    nt = Q[typeof global] && global;
  !nt || nt.global !== nt && nt.window !== nt || (U = nt);
  var tt = [],
    et = Error.prototype,
    rt = Object.prototype,
    ot = String.prototype,
    ut = rt.toString,
    it = RegExp("^" + (ut + "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
    at = Function.prototype.toString,
    ct = rt.hasOwnProperty,
    ft = tt.push,
    lt = rt.propertyIsEnumerable,
    pt = tt.unshift,
    st = function () {
      try {
        var n = {}, t = s(t = Object.defineProperty) && t,
          e = t(n, n, n) && t
      } catch (r) {}
      return e
    }(),
    yt = s(yt = Object.create) && yt,
    ht = s(ht = Array.isArray) && ht,
    gt = s(gt = Object.keys) && gt,
    _t = Math.max,
    vt = Math.min,
    bt = {};
  bt[$] = Array, bt[T] = Boolean, bt[z] = Date, bt["[object Function]"] = Function, bt[J] = Object, bt[G] = Number, bt[M] = RegExp, bt[q] = String;
  var mt = {};
  mt[$] = mt[z] = mt[G] = {
    constructor: true,
    toLocaleString: true,
    toString: true,
    valueOf: true
  }, mt[T] = mt[q] = {
    constructor: true,
    toString: true,
    valueOf: true
  }, mt[K] = mt["[object Function]"] = mt[M] = {
    constructor: true,
    toString: true
  }, mt[J] = {
    constructor: true
  },
  function () {
    for (var n = R.length; n--;) {
      var t, e = R[n];
      for (t in mt) ct.call(mt, t) && !ct.call(mt[t], e) && (mt[t][e] = false)
    }
  }(), r.prototype = e.prototype;
  var dt = e.support = {};
  ! function () {
    function n() {
      this.x = 1
    }
    var t = {
      0: 1,
      length: 1
    }, e = [];
    n.prototype = {
      valueOf: 1,
      y: 1
    };
    for (var r in new n) e.push(r);
    for (r in arguments);
    dt.argsClass = ut.call(arguments) == L, dt.argsObject = arguments.constructor == Object && !(arguments instanceof Array), dt.enumErrorProps = lt.call(et, "message") || lt.call(et, "name"), dt.enumPrototypes = lt.call(n, "prototype"), dt.funcDecomp = !s(U.k) && N.test(function () {
      return this
    }), dt.funcNames = typeof Function.name == "string", dt.nonEnumArgs = 0 != r, dt.nonEnumShadows = !/valueOf/.test(e), dt.spliceObjects = (tt.splice.call(t, 0, 1), !t[0]), dt.unindexedChars = "xx" != "x" [0] + Object("x")[0]
  }(1), yt || (i = function () {
    function n() {}
    return function (t) {
      if (_(t)) {
        n.prototype = t;
        var e = new n;
        n.prototype = null
      }
      return e || U.Object()
    }
  }());
  var wt = st ? function (n, t) {
      V.value = t, st(n, "__bindData__", V)
    } : O;
  dt.argsClass || (y = function (n) {
    return n && typeof n == "object" && typeof n.length == "number" && ct.call(n, "callee") && !lt.call(n, "callee") || false
  });
  var jt = ht || function (n) {
      return n && typeof n == "object" && typeof n.length == "number" && ut.call(n) == $ || false
    }, Et = p({
      a: "z",
      e: "[]",
      i: "if(!(B[typeof z]))return E",
      g: "E.push(n)"
    }),
    xt = gt ? function (n) {
      return _(n) ? dt.enumPrototypes && typeof n == "function" || dt.nonEnumArgs && n.length && y(n) ? Et(n) : gt(n) : []
    } : Et,
    nt = {
      a: "g,e,K",
      i: "e=e&&typeof K=='undefined'?e:d(e,K,3)",
      b: "typeof u=='number'",
      v: xt,
      g: "if(e(t[n],n,g)===false)return E"
    }, ht = {
      a: "z,H,l",
      i: "var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",
      v: xt,
      g: "if(typeof E[n]=='undefined')E[n]=t[n]",
      c: "}}"
    }, Ot = {
      i: "if(!B[typeof t])return E;" + nt.i,
      b: false
    }, At = p(nt),
    St = p(ht, {
      i: ht.i.replace(";", ";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),
      g: "E[n]=e?e(E[n],t[n]):t[n]"
    }),
    kt = p(nt, Ot, {
      j: false
    }),
    Ct = p(nt, Ot);
  g(/x/) && (g = function (n) {
    return typeof n == "function" && "[object Function]" == ut.call(n)
  }), e.assign = St, e.bind = j, e.chain = function (n) {
    return n = new r(n), n.__chain__ = true, n
  }, e.createCallback = function (n, t, e) {
    var r = typeof n;
    if (null == n || "function" == r) return a(n, t, e);
    if ("object" != r) return A(n);
    var o = xt(n),
      u = o[0],
      i = n[u];
    return 1 != o.length || i !== i || _(i) ? function (t) {
      for (var e = o.length, r = false; e-- && (r = f(t[o[e]], n[o[e]], null, true)););
      return r
    } : function (n) {
      return n = n[u], i === n && (0 !== i || 1 / i == 1 / n)
    }
  }, e.forEach = m, e.forIn = kt, e.forOwn = Ct, e.functions = h, e.initial = function (n, r, o) {
    var u = 0,
      i = n ? n.length : 0;
    if (typeof r != "number" && null != r) {
      var a = i;
      for (r = e.createCallback(r, o, 3); a-- && r(n[a], a, n);) u++
    } else u = null == r || o ? 1 : r || u;
    return t(n, 0, vt(_t(0, i - u), i))
  }, e.keys = xt, e.property = A, e.rest = w, e.toArray = function (n) {
    return n && typeof n.length == "number" ? dt.unindexedChars && v(n) ? n.split("") : t(n) : b(n)
  }, e.values = b, e.drop = w, e.each = m, e.extend = St, e.methods = h, e.tail = w, x(e), e.cloneDeep = function (n, t, e) {
    return u(n, true, typeof t == "function" && a(t, e, 1))
  }, e.identity = E, e.isArguments = y, e.isArray = jt, e.isFunction = g, e.isObject = _, e.isString = v, e.mixin = x, e.noop = O, x(function () {
    var n = {};
    return Ct(e, function (t, r) {
      e.prototype[r] || (n[r] = t)
    }), n
  }(), false), e.first = d, e.last = function (n, r, o) {
    var u = 0,
      i = n ? n.length : 0;
    if (typeof r != "number" && null != r) {
      var a = i;
      for (r = e.createCallback(r, o, 3); a-- && r(n[a], a, n);) u++
    } else if (u = r, null == u || o) return n ? n[i - 1] : C;
    return t(n, _t(0, i - u))
  }, e.take = d, e.head = d, Ct(e, function (n, t) {
    var o = "sample" !== t;
    e.prototype[t] || (e.prototype[t] = function (t, e) {
      var u = this.__chain__,
        i = n(this.__wrapped__, t, e);
      return u || null != t && (!e || o && typeof t == "function") ? new r(i, u) : i
    })
  }), e.VERSION = "2.4.1", e.prototype.chain = function () {
    return this.__chain__ = true, this
  }, e.prototype.toString = function () {
    return this.__wrapped__ + ""
  }, e.prototype.value = S, e.prototype.valueOf = S, At(["join", "pop", "shift"], function (n) {
    var t = tt[n];
    e.prototype[n] = function () {
      var n = this.__chain__,
        e = t.apply(this.__wrapped__, arguments);
      return n ? new r(e, n) : e
    }
  }), At(["push", "reverse", "sort", "unshift"], function (n) {
    var t = tt[n];
    e.prototype[n] = function () {
      return t.apply(this.__wrapped__, arguments), this
    }
  }), At(["concat", "slice", "splice"], function (n) {
    var t = tt[n];
    e.prototype[n] = function () {
      return new r(t.apply(this.__wrapped__, arguments), this.__chain__)
    }
  }), dt.spliceObjects || At(["pop", "shift", "splice"], function (n) {
    var t = tt[n],
      o = "splice" == n;
    e.prototype[n] = function () {
      var n = this.__chain__,
        e = this.__wrapped__,
        u = t.apply(e, arguments);
      return 0 === e.length && delete e[0], n || o ? new r(u, n) : u
    }
  }), X && Y && Z && ((Y.exports = e)._ = e)
}).call(this);
