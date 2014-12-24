var args = require("system").args;

var page = require("webpage").create();

page.open(args[1],function(status){
	setTimeout(function(){
		var g = page.evaluate(function(){
			return __global;
		});
		console.log(JSON.stringify(g));
		phantom.exit();
	},1000);
});