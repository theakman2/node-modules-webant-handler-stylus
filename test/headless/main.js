window["__MODULES__"] = window["__MODULES__"] || {};
window["__MODULES__"].modules = window["__MODULES__"].modules || {};
window["__MODULES__"].modules['main.js'] = {
"3":function(require,module,exports) {
require([ "main.js", "1" ])("html body {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  width: 342px;\n}\n");
},
"2":function(require,module,exports) {
require([ "main.js", "1" ])("html body {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  height: 194px;\n}\n");
},
"1":function(require,module,exports) {
/**
 * Taken verbatim from medikoo's node webmake module (https://github.com/medikoo/modules-webmake)
 **/
var style, add;

if (document.createStyleSheet) {
    // IE
    if (document.styleSheets.length > 29) {
        style = document.styleSheets[document.styleSheets.length - 1];
    } else {
        style = document.createStyleSheet();
    }
    add = function(css) {
        style.cssText += css;
    };
} else {
    style = document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
    style.setAttribute("type", "text/css");
    add = function(css) {
        style.appendChild(document.createTextNode(css));
    };
}

module.exports = add;
},
"0":function(require,module,exports) {
require([ "main.js", "3" ]);

require([ "main.js", "2" ]);

require([ "main.js", "1" ])("#foo { height: 32px; padding:0; border:0; margin:0; }");

setTimeout(function() {
    var el = document.getElementById("foo");
    window.__global = document.body.clientWidth + ";" + document.body.clientHeight + ";" + el.clientHeight;
}, 700);
}};

(function(){      function getExports(data,cb) {    var ret;    if (typeof data[0] === "string") {     try {      var fn = window["__MODULES__"].modules[data[0]][data[1]];     } catch(e) {      throw new Error("Module " + data + "not found.");      }     if (fn.hasOwnProperty("__module")) {      ret = fn.__module.exports;     } else {      var module;      var exports = {};      fn.__module = module = { exports: exports };      fn.call(       undefined,               getExports       ,       module,       exports      );      ret = module.exports;     }    } else {     ret = [];     for (var i = 0; i < data.length; i++) {      ret.push(getExports(data[i],cb));     }    }    if (typeof cb === "function") {     cb.apply(undefined,typeof data[0] === "string" ? [ret] : ret);    } else {     return ret;    }   };   window["__MODULES__"] = window["__MODULES__"] || {};   window["__MODULES__"].modules = window["__MODULES__"].modules || {};   window["__MODULES__"].getExports = getExports;       getExports(["main.js","0"]);     })();