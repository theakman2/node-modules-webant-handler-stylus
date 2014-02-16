!function(r){function o(t,e){if("function"==typeof e){var n=o(t);return e.apply(void 0,"string"==typeof t[0]?[n]:n),void 0}if("string"==typeof t){var $=r[t];if($.hasOwnProperty("__module"))return $.__module.exports;var i,u={};return $.__module=i={exports:u},$.call(void 0,o,i,u),i.exports}for(var n=[],f=0;f<t.length;f++)n.push(o(t[f]));return n}o("0")}({
"0":function(require,module,exports) {
require("1");

require("3");

require("2")("#foo { height: 32px; padding:0; border:0; margin:0; }");

setTimeout(function() {
    var el = document.getElementById("foo");
    window.__global = document.body.clientWidth + ";" + document.body.clientHeight + ";" + el.clientHeight;
}, 700);
},"1":function(require,module,exports) {
require("2")("html body {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  width: 342px;\n}\n");
},"2":function(require,module,exports) {
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
},"3":function(require,module,exports) {
require("2")("html body {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  height: 194px;\n}\n");
}});