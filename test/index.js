var fs = require("fs");
var path = require("path");

var Handler = require("../lib/index.js");

var tests = {
	"test filetypes":function(assert) {
		var handler = new Handler();
		var data = [
		            "https://mysite.co.uk/bla.js",
		            "//cdn.google.com/path/to/assets.css",
		            "path/to/assets.styl",
		            "/abs/path/to/assets.styl",
		            "path/to/assets.stylus",
		            "/abs/path/to/assets.stylus",
		            "@@hbs/runtime",
		            "@@css/addStylesheet"
		            ];
		assert.deepEqual(
			data.map(handler.willHandle),
			[false,false,true,true,true,true,false,true],
			"Should handle the correct files."
		);
	},
	"test content 1":function(assert,done) {		
		var handler = new Handler();
		handler.handle(__dirname+"/styles.styl",function(err,content){
			assert.ok(!err,"There should be no errors handling this filetype.");
			assert.equal(
				content,
				'require("!@@css/addStylesheet")(".foo .bar {\\n  color: #ecd;\\n}\\n");',
				"Handler should return the right content."
			);
			done();
		});
	},
	"test content 2":function(assert,done) {
		var handler = new Handler({compress:true});
		handler.handle(__dirname+"/styles.stylus",function(err,content){
			assert.ok(!err,"There should be no errors handling this filetype.");
			assert.equal(
				content,
				'require("!@@css/addStylesheet")(".foo .bar{color:#ecd}\\n");',
				"Handler should return the right content."
			);
			done();
		});
	},
	"test content 3":function(assert,done) {		
		var handler = new Handler({compress:true});
		handler.handle("@@css/addStylesheet",function(err,content){
			assert.ok(!err,"There should be no errors handling this filetype.");
			assert.equal(
				content,
				fs.readFileSync(path.join(__dirname,"..","lib","data","addStylesheet.js")).toString(),
				"Handler should update with correct content."
			);
			done();
		});
	}
};

require("test").run(tests);