var fs = require("fs");
var path = require("path");
var url = require("url");

var jsStringEscape = require("js-string-escape");
var stylus = require("stylus");

module.exports = {
	willHandle:function(filePath,settings){
		if (url.parse(filePath,false,true).host) {
			return false;
		}
		if (filePath === "@@css/addStylesheet") {
			return true;
		}
		if (filePath.indexOf("@@") === 0) {
			return false;
		}
		var ext = path.extname(filePath);
		if (ext === ".styl") {
			return true;
		}
		if (ext === ".stylus") {
			return true;
		}
		return false;
	},
	handle:function(filePath,settings,done){
		if (filePath === "@@css/addStylesheet") {
			fs.readFile(__dirname+"/data/addStylesheet.js",function(e,c){
				if (e) {
					done(e);
					return;
				}
				done(null,c.toString());
			});
		} else {
			fs.readFile(filePath,function(e,c){
				if (e) {
					done(e);
					return;
				}
				var opts = {
					filename:filePath,
					paths:[path.dirname(filePath)],
					compress:settings && settings.compress
				};
				
				stylus.render(c.toString(),opts,function(err,css){
					if (err) {
						done(err);
						return;
					}
					done(null,'require("!@@css/addStylesheet")("'+jsStringEscape(css)+'");');
				});
			});
		}
	}
};