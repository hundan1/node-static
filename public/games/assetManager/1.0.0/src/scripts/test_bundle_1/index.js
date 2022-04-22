window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  "test-first": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5dde3HwuyNCUIVDy/dAcg5f", "test-first");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tips: cc.Label
      },
      start: function start() {
        this.tips.textKey = "\u8fdb\u5165\u5206\u5305\u573a\u666f";
      },
      goLoadSubpackage: function goLoadSubpackage() {
        cc.director.loadScene("Main");
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "test-first" ]);