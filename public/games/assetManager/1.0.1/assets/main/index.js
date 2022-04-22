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
  Apis: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b24fYkr1FKKYJtjqT80lI1", "Apis");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HttpUtil_1 = require("./HttpUtil");
    exports.default = {
      fetchVersion: function(params) {
        return HttpUtil_1.default.GET("/game/version", params);
      },
      testPost: function(params) {
        void 0 === params && (params = {});
        return HttpUtil_1.default.POST("/test/add", params);
      }
    };
    cc._RF.pop();
  }, {
    "./HttpUtil": "HttpUtil"
  } ],
  HttpUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fdaf0euXBtIgoto65FbMLWQ", "HttpUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("./config");
    var HttpUtil = function() {
      function HttpUtil() {}
      HttpUtil.GET = function(url, params) {
        var _this = this;
        void 0 === params && (params = {});
        return new Promise(function(resolve, reject) {
          var dataStr = "";
          Object.keys(params).forEach(function(key) {
            dataStr += key + "=" + encodeURIComponent(params[key]) + "&";
          });
          url = url + "?_t=" + new Date().getTime();
          if ("" !== dataStr) {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
            url += "&" + dataStr;
          }
          url = HttpUtil.baseUrl + url;
          console.log("url:", url);
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
          xhr.onload = function() {
            4 == xhr.readyState && xhr.status >= 200 && xhr.status < 300 ? resolve(JSON.parse(xhr.responseText)) : reject(new Error("\u8bf7\u6c42\u5931\u8d25 xht.state:" + xhr.status));
          };
          xhr.onerror = function(ex) {
            reject(new Error("xhr onerror"));
          };
          xhr.ontimeout = function(ex) {
            reject(new Error("xhr ontimeout"));
          };
          xhr.timeout = _this.timeout;
          xhr.send();
        });
      };
      HttpUtil.POST = function(url, param) {
        var _this = this;
        void 0 === param && (param = {});
        return new Promise(function(resolve, reject) {
          url = HttpUtil.baseUrl + url;
          var xhr = new XMLHttpRequest();
          var dataStr = "";
          Object.keys(param).forEach(function(key) {
            dataStr += key + "=" + encodeURIComponent(param[key]) + "&";
          });
          "" !== dataStr && (dataStr = dataStr.substring(0, dataStr.lastIndexOf("&")));
          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onload = function() {
            4 == xhr.readyState && xhr.status >= 200 && xhr.status < 300 ? resolve(JSON.parse(xhr.responseText)) : reject(new Error("\u8bf7\u6c42\u5931\u8d25 xht.state:" + xhr.status));
          };
          xhr.onerror = function(ex) {
            reject(new Error("xhr onerror"));
          };
          xhr.ontimeout = function(ex) {
            reject(new Error("xhr ontimeout"));
          };
          xhr.timeout = _this.timeout;
          xhr.send(dataStr);
        });
      };
      HttpUtil.__GET = function(url, params) {
        var _this = this;
        void 0 === params && (params = {});
        var _a = this._GET(url, params), P = _a.P, fn = _a.fn;
        return Promise.race([ P, new Promise(function() {
          setTimeout(function() {
            console.log("timeout ...");
            fn();
          }, _this.timeout);
        }) ]);
      };
      HttpUtil._GET = function(url, params) {
        var _this = this;
        void 0 === params && (params = {});
        console.log("_GET...");
        var P_reject = function() {
          console.log("P_reject\u672a\u88ab\u91cd\u65b0\u8d4b\u503c");
        };
        var P = new Promise(function(resolve, reject) {
          P_reject = function() {
            console.log("P_reject\u88ab\u91cd\u65b0\u8d4b\u503c\u4e86");
            reject(new Error("\u8bf7\u6c42\u8d85\u65f6"));
          };
          var dataStr = "";
          Object.keys(params).forEach(function(key) {
            dataStr += key + "=" + encodeURIComponent(params[key]) + "&";
          });
          url = url + "?_t=" + new Date().getTime();
          if ("" !== dataStr) {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
            url += "&" + dataStr;
          }
          url = HttpUtil.baseUrl + url;
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
          xhr.onload = function() {
            4 == xhr.readyState && xhr.status >= 200 && xhr.status < 300 ? resolve(JSON.parse(xhr.responseText)) : reject(new Error("\u8bf7\u6c42\u5931\u8d25 xht.state:" + xhr.status));
          };
          xhr.onerror = function() {
            console.log("xhr onerror");
            reject(new Error("xhr onerror"));
          };
          xhr.timeout = _this.timeout;
          xhr.send();
        });
        return {
          P: P,
          fn: P_reject
        };
      };
      HttpUtil.timeout = 3e3;
      HttpUtil.baseUrl = config_1.default.address + "api";
      return HttpUtil;
    }();
    exports.default = HttpUtil;
    cc._RF.pop();
  }, {
    "./config": "config"
  } ],
  LodeAssets: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1593ZAlz9Fk4nHnFYUp3O+", "LodeAssets");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Apis_1 = require("./Apis");
    var LodeAssets = function(_super) {
      __extends(LodeAssets, _super);
      function LodeAssets() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.loadTips = null;
        _this.showWindow = null;
        _this.labels = [];
        _this.SUB_AB_NAME = "test_bundle_1";
        _this._audioSource = null;
        _this._isLoading = false;
        _this._type = "0";
        return _this;
      }
      LodeAssets.prototype.onLoad = function() {
        var testBundle = cc.assetManager.getBundle(this.SUB_AB_NAME);
        console.log("onLoad... cc.assetManager.getBundle(" + this.SUB_AB_NAME + ")", testBundle);
        testBundle && (this.labels[0].string = "\u5df2\u52a0\u8f7d");
      };
      LodeAssets.prototype.toggleChange = function(toggle) {
        cc.log("toggle change:", toggle);
        this._type = toggle.node.name;
      };
      LodeAssets.prototype.fetchVersion = function() {
        var _this = this;
        Apis_1.default.fetchVersion({
          name: "assetManager",
          bundleName: this.SUB_AB_NAME
        }).then(function(res) {
          if (0 == res.code) {
            var hash = res.hash;
            var version = res.version;
            var url = res.url;
            var bundlePath = url + "remote/" + _this.SUB_AB_NAME;
            "1" == _this._type ? _this.loadRemoteBundle1(bundlePath) : _this.loadRemoteBundle2(bundlePath, hash);
            cc.log("\u83b7\u53d6\u6e38\u620f\u7248\u672c\u4fe1\u606f\u6210\u529f:", res);
          } else {
            _this._isLoading = false;
            _this.loadTips.string = "\u52a0\u8f7d\u5931\u8d25";
            cc.warn("\u83b7\u53d6\u6e38\u620f\u7248\u672c\u4fe1\u606f\u5931\u8d25:", res);
          }
        }).catch(function(err) {
          _this._isLoading = false;
          _this.loadTips.string = "\u52a0\u8f7d\u5931\u8d25";
          cc.error("\u83b7\u53d6\u6e38\u620f\u7248\u672c\u4fe1\u606f\u5931\u8d25:", err);
        });
      };
      LodeAssets.prototype.clearCache = function() {
        cc.assetManager.cacheManager.clearCache();
        console.log("clear all cache");
      };
      LodeAssets.prototype.onClickBundle = function() {
        var _this = this;
        var testBundle = cc.assetManager.getBundle(this.SUB_AB_NAME);
        if (testBundle || this._isLoading) return;
        this._onClear();
        this._isLoading = true;
        this.loadTips.string = "Bundle Loading....";
        "0" == this._type ? cc.assetManager.loadBundle(this.SUB_AB_NAME, {
          maxRetryCount: 1,
          onFileProgress: function(loaded, total) {
            cc.log("\u901a\u8fc7\u5305\u540d\u8bf7\u6c42AS\u5305\uff0c\u8bf7\u6c42\u8fdb\u5ea6\uff1a", loaded, total);
          }
        }, function(err, bundle) {
          if (err) {
            _this.loadTips.string = "\u52a0\u8f7d\u5931\u8d25";
            cc.warn("\u901a\u8fc7\u5305\u540d\u8bf7\u6c42AS\u5305,\u8bf7\u6c42\u5931\u8d25", err);
          } else {
            _this.loadTips.string = "Bundle loaded Successfully by name!";
            _this.labels[0].string = "\u5df2\u52a0\u8f7d";
            cc.log("\u901a\u8fc7\u5305\u540d\u8bf7\u6c42AS\u5305,\u8bf7\u6c42\u6210\u529f", bundle);
          }
          _this._isLoading = false;
        }) : this.fetchVersion();
      };
      LodeAssets.prototype.loadRemoteBundle1 = function(url, cb) {
        var _this = this;
        cc.assetManager.loadBundle(url, {
          maxRetryCount: 1,
          onFileProgress: function(loaded, total) {
            cc.log("\u4e0d\u643a\u5e26\u7248\u672c\u53f7\u8bf7\u6c42AS\u5305\uff0c\u8bf7\u6c42\u8fdb\u5ea6\uff1a", loaded, total);
          }
        }, function(err, bundle) {
          if (err) {
            _this.loadTips.string = "\u52a0\u8f7d\u5931\u8d25";
            cc.warn("\u4e0d\u643a\u5e26\u7248\u672c\u53f7\u8bf7\u6c42AS\u5305,\u8bf7\u6c42\u5931\u8d25", err);
          } else {
            _this.loadTips.string = "Bundle loaded Successfully by name!";
            _this.labels[0].string = "\u5df2\u52a0\u8f7d";
            cc.log("\u4e0d\u643a\u5e26\u7248\u672c\u53f7\u8bf7\u6c42AS\u5305,\u8bf7\u6c42\u6210\u529f", bundle);
          }
          _this._isLoading = false;
          cb && cb();
        });
      };
      LodeAssets.prototype.loadRemoteBundle2 = function(url, version) {
        var _this = this;
        cc.assetManager.loadBundle(url, {
          version: version,
          maxRetryCount: 1,
          onFileProgress: function(loaded, total) {
            cc.log("\u643a\u5e26\u7248\u672c\u53f7(" + version + ")\u8bf7\u6c42AS\u5305\uff0c\u8bf7\u6c42\u8fdb\u5ea6\uff1a", loaded, total);
          }
        }, function(err, bundle) {
          if (err) {
            _this.loadTips.string = "\u52a0\u8f7d\u5931\u8d25";
            cc.warn("\u643a\u5e26\u7248\u672c\u53f7(" + version + ")\u8bf7\u6c42AS\u5305,\u8bf7\u6c42\u5931\u8d25", err);
          } else {
            _this.loadTips.string = "Bundle loaded Successfully by name!";
            _this.labels[0].string = "\u5df2\u52a0\u8f7d";
            cc.log("\u643a\u5e26\u7248\u672c\u53f7(" + version + ")\u8bf7\u6c42AS\u5305,\u8bf7\u6c42\u6210\u529f", bundle);
          }
          _this._isLoading = false;
        });
      };
      LodeAssets.prototype.onClickTexture = function() {
        var _this = this;
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle(this.SUB_AB_NAME);
        if (!testBundle) {
          this.loadTips.string = "\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u5148\u52a0\u8f7dAsset Bundle";
          return;
        }
        this._onClear();
        this._isLoading = true;
        this.loadTips.string = "Texture Loading....";
        testBundle.load("gold", function(err, asset) {
          if (err) {
            _this._isLoading = false;
            _this.loadTips.string = "Texture Load Failed";
            cc.log("Error url [" + err + "]");
            return;
          }
          _this._isLoading = false;
          _this.loadTips.string = "";
          var node = new cc.Node("New Node");
          node.setPosition(0, 0);
          var component = node.addComponent(cc.Sprite);
          component.spriteFrame = new cc.SpriteFrame(asset);
          _this.labels[1].string = "\u5df2\u52a0\u8f7d";
          _this.showWindow.addChild(node);
        });
      };
      LodeAssets.prototype.onClickAudio = function() {
        var _this = this;
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle(this.SUB_AB_NAME);
        if (!testBundle) {
          this.loadTips.string = "\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u5148\u52a0\u8f7dAsset Bundle";
          return;
        }
        this._onClear();
        this._isLoading = true;
        this.loadTips.string = "Audio Loading....";
        testBundle.load("ss", function(err, asset) {
          if (err) {
            _this._isLoading = false;
            _this.loadTips.string = "Audio Load Failed";
            cc.log("Error url [" + err + "]");
            return;
          }
          _this._isLoading = false;
          _this.loadTips.string = "";
          var node = new cc.Node("New Node");
          node.setPosition(0, 0);
          var component = node.addComponent(cc.AudioSource);
          component.clip = asset;
          component.play();
          _this._audioSource = component;
          _this.loadTips.string = "\u64ad\u653e\u97f3\u4e50";
          _this.labels[2].string = "\u5df2\u52a0\u8f7d";
          _this.showWindow.addChild(node);
        });
      };
      LodeAssets.prototype.onClickScene = function() {
        var _this = this;
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle(this.SUB_AB_NAME);
        if (!testBundle) {
          this.loadTips.string = "\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u5148\u52a0\u8f7dAsset Bundle";
          return;
        }
        this._onClear();
        this._isLoading = true;
        this.loadTips.string = "Scene Loading....";
        testBundle.loadScene("sub-scene", function(err, asset) {
          if (err) {
            _this._isLoading = false;
            _this.loadTips.string = "Scene Load Failed";
            cc.log("Error url [" + err + "]");
            return;
          }
          _this._isLoading = false;
          _this.loadTips.string = "";
          cc.director.runScene(asset);
        });
      };
      LodeAssets.prototype.onClickRelease = function() {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle(this.SUB_AB_NAME);
        if (!testBundle) {
          this.loadTips.string = "\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u5148\u52a0\u8f7dAsset Bundle";
          return;
        }
        this._onClear();
        testBundle.releaseAll();
        this.loadTips.string = "\u8d44\u6e90\u5df2\u88ab\u91ca\u653e";
        this.labels[1].string = "\u52a0\u8f7d Texture";
        this.labels[2].string = "\u52a0\u8f7d Audio";
        this.labels[3].string = "\u52a0\u8f7d Scene";
      };
      LodeAssets.prototype.onClickDestroy = function() {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle(this.SUB_AB_NAME);
        if (!testBundle) {
          this.loadTips.string = "\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u5148\u52a0\u8f7dAsset Bundle";
          return;
        }
        this._onClear();
        cc.assetManager.removeBundle(testBundle);
        this.loadTips.string = "\u5206\u5305\u5df2\u88ab\u9500\u6bc1";
        this.labels[0].string = "\u52a0\u8f7d Asset Bundle";
        this.labels[1].string = "\u52a0\u8f7d Texture";
        this.labels[2].string = "\u52a0\u8f7d Audio";
        this.labels[3].string = "\u52a0\u8f7d Scene";
      };
      LodeAssets.prototype._onClear = function() {
        this.showWindow.removeAllChildren(true);
        this._audioSource && this._audioSource instanceof cc.AudioSource && this._audioSource.stop();
      };
      __decorate([ property(cc.Label) ], LodeAssets.prototype, "loadTips", void 0);
      __decorate([ property(cc.Node) ], LodeAssets.prototype, "showWindow", void 0);
      __decorate([ property({
        type: [ cc.Label ]
      }) ], LodeAssets.prototype, "labels", void 0);
      LodeAssets = __decorate([ ccclass ], LodeAssets);
      return LodeAssets;
    }(cc.Component);
    exports.default = LodeAssets;
    cc._RF.pop();
  }, {
    "./Apis": "Apis"
  } ],
  config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "948edCVuo5HbYO4GQBXOg8R", "config");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      address: "http://192.168.164.52:5151/"
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "Apis", "HttpUtil", "LodeAssets", "config" ]);