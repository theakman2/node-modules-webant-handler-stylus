require("styles.styl");
require("styles.stylus");

require("{css/addStylesheet}")("#foo { height: 32px; padding:0; border:0; margin:0; }");

setTimeout(function(){
	var el = document.getElementById("foo");
	window.__global = document.body.clientWidth + ";" + document.body.clientHeight + ";" + el.clientHeight;
},700);