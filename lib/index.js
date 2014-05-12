var fs = require("fs");
var path = require("path");

var jsEscape = require("js-string-escape");
var stylus = require("stylus");

module.exports = {
	extensions:[".styl",".stylus"],
	aliases:require("webant-handler-css").aliases,
	handle:function(filePath,done){
		fs.readFile(filePath,function(e,c){
			if (e) {
				done(e);
				return;
			}
			var opts = {
				filename:filePath,
				paths:[path.dirname(filePath)],
				compress:module.exports.settings && module.exports.settings.compress
			};
			
			stylus.render(c.toString(),opts,function(err,css){
				if (err) {
					done(err);
					return;
				}
				done(null,'require("{css/addStylesheet}|sameAsChunk={entry}")("'+jsEscape(css)+'");');
			});
		});
	}
};