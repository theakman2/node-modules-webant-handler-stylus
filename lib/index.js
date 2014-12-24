var fs = require("fs");
var path = require("path");

var jsEscape = require("js-string-escape");
var stylus = require("stylus");

function StylusHandler() {
	this.settings = {};
}

StylusHandler.prototype = {
	extensions:[".styl",".stylus"],
	handle:function(filePath,done){
		var _this = this;
		fs.readFile(filePath,function(e,c){
			if (e) {
				done(e);
				return;
			}
			var opts = {
				filename:filePath,
				paths:[path.dirname(filePath)],
				compress:_this.settings.compress
			};
			
			stylus.render(c.toString(),opts,function(err,css){
				if (err) {
					done(err);
					return;
				}
				done(null,'module.exports = "' + jsEscape(css) + '";');
			});
		});
	}
};

module.exports = StylusHandler;