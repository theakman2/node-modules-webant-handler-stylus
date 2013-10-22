var Handler = require("../lib/index.js");
var HandlerBase = require("./lib/Handler.js");

function createHandler(Handler,settings) {
	var handlerBase = new HandlerBase(settings);
	
	Handler.prototype = handlerBase;
	Handler.prototype.constructor = Handler;
	
	return new Handler();
}

var tests = {
	"test stylus 1":function(assert,done) {
		var handler = createHandler(Handler);
		var data = {
			filePath:"http://sfi9s.sdf.sd/vk93k.handlebars?bla=3",
			raw:"http://sfi9s.sdf.sd/vk93k.handlebars?bla=3",
			requireType:"comment"
		};
		handler.willHandle(data,function(err,yes){
			assert.strictEqual(err,null,"Handler should not report any errors.");
			assert.strictEqual(yes,false,"Handler should not claim to handle this file.");
			done();
		});
	},
	"test stylus 2":function(assert,done) {
		var handler = createHandler(Handler);
		var data = {
			filePath:__dirname+"/path/to/bad/file.css",
			raw:"file.css",
			requireType:"function"
		};
		handler.willHandle(data,function(err,yes){
			assert.strictEqual(err,null,"Handler should not report any errors.");
			assert.strictEqual(yes,false,"Handler should not claim to handle this file.");
			done();
		});
	},
	"test stylus correct file type":function(assert,done) {		
		var handler = createHandler(Handler);
		var data = {
			filePath:__dirname+"/styles.styl",
			requireType:"comment"
		};
		handler.handle(data,function(resp){
			assert.deepEqual(
				resp,
				{
					type:"internalCss",
					content:".foo .bar {\n  color: #ecd;\n}\n"
				},
				"Handler should call 'update' correctly."
			);
			done();
		});
	},
	"test stylus correct file type with compression (2)":function(assert,done) {		
		var handler = createHandler(Handler,{compress:true});
		var data = {
			filePath:__dirname+"/styles.stylus",
			requireType:"comment"
		};
		handler.handle(data,function(resp){
			assert.deepEqual(
				resp,
				{
					type:"internalCss",
					content:".foo .bar{color:#ecd}\n"
				},
				"Handler should call 'update' correctly."
			);
			done();
		});
	},
	"test stylus correct file type with compression and as javascript":function(assert,done) {		
		var handler = createHandler(Handler,{compress:true});
		var data = {
			filePath:__dirname+"/styles.styl",
			requireType:"function"
		};
		handler.handle(data,function(resp){
			assert.deepEqual(
				resp,
				{
					type:"internalJs",
					content:'require("@@css/addStylesheet")(".foo .bar{color:#ecd}");'
				},
				"Handler should call 'update' correctly."
			);
			done();
		});
	}
};

require("test").run(tests);