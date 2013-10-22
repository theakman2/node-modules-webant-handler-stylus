var path = require("path");

var stylus = require("stylus");

function Handler() {
	var self = this;
	
	this.extensions = [".styl",".stylus"];
	this.requireTypes = ["comment","function"];
	this.requireAliases = {
		'@@css/addStylesheet':path.resolve(__dirname,"data/addStylesheet.js")
	};
	
	this.go = function(data,update,done) {
		var opts = {
			filename:data.filePath,
			paths:[path.dirname(data.filePath)],
			compress:self.settings && self.settings.compress
		};
		
		stylus.render(data.content,opts,function(err,css){
			if (err) {
				done(err);
				return;
			}
			if (data.requireType === "comment") {
				update({
					type:"internalCss",
					content:css
				},done);	
			} else {
				update({
					type:"internalJs",
					content:'require("@@css/addStylesheet")('+self.makeString(css.replace(/\s+/g," ").trim())+');'
				},done);
			}
		});
	};
};

module.exports = Handler;