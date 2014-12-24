var css = require("styles.styl");
var css2 = require("styles.stylus");

document.head.innerHTML += '<style type="text/css">' + css + '</style>';
document.head.innerHTML += '<style type="text/css">' + css2 + '</style>';

setTimeout(function(){
	var el = document.getElementById("foo");
	window.__global = document.body.clientWidth + ";" + document.body.clientHeight + ";" + el.clientHeight;
},700);