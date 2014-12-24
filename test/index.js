var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");

var async = require("async");
var shellEscape = require("shell-escape");
var Webant = require("webant");

var handler = require("../lib/index.js");

var tmpl = path.join(__dirname,"headless","index.html.tmpl");

var htmlOutPath1 = path.join(__dirname,"headless","output","index1.html");
var htmlOutPath2 = path.join(__dirname,"headless","output","index2.html");

Webant.Writer = function(){
	this.write = function(s,cb){
		cb(null,s[0].content);
	};
};

function executeHeadlessJavascript(javascript,htmlOutPath,cb) {
	fs.readFile(tmpl,function(err,contents){
		if (err) {
			cb(err);
			return;
		}
		contents = contents.toString().replace('%JAVASCRIPT%',javascript);
		fs.writeFile(htmlOutPath,contents,function(err){
			if (err) {
				cb(err);
				return;
			}
			var dir = path.dirname(htmlOutPath);
			var base = path.basename(htmlOutPath);
			var args = shellEscape([path.join(__dirname,"headless","phantomwebant.js"),base]);
			var pjs = childProcess.exec(
				'phantomjs ' + args,
				{
					cwd:dir,
					maxBuffer:1024*1024
				},
				function(err,stdout,stderr) {
					pjs.kill();
					if (err) {
						cb(err);
						return;
					}
					if (stderr) {
						cb(err);
						return;
					}
					var out;
					try {
						out = JSON.parse(stdout.trim());
					} catch(e) {
						cb(e);
						return;
					}
					cb(null,out);
				}
			);
		});
	});
}

var tests = {
	"test handler":function(assert,done) {
		var webant = new Webant({
			entry:path.join(__dirname,"headless","entry.js"),
			dest:'s',
			handlers:[handler]
		});
		webant.build(function(err,js){
			if (err) {
				assert.fail("Webant should not error when parsing javascript (error: " + err + ")");
				done();
				return;
			}
			executeHeadlessJavascript(js,htmlOutPath1,function(err,out){
				if (err) {
					assert.fail(err.toString());
					done();
					return;
				}
				assert.strictEqual(
					out,
					"342;194;32",
					"Uncompressed css should be compiled correctly."
				);
				var _h = new handler();
				_h.settings.compress = true;
				var webant = new Webant({
					entry:path.join(__dirname,"headless","entry.js"),
					dest:'s',
					handlers:[_h]
				});
				webant.build(function(err,js){
					if (err) {
						assert.fail("Webant should not error when parsing javascript (error: " + err + ")");
						done();
						return;
					}
					executeHeadlessJavascript(js,htmlOutPath2,function(err,out){
						if (err) {
							assert.fail(err.toString());
							done();
							return;
						}
						assert.strictEqual(
							out,
							"342;194;32",
							"Compressed css should be compiled correctly."
						);
						async.map([htmlOutPath1,htmlOutPath2],fs.stat,function(err,stats){
							if (err) {
								assert.error('Error stating files.');
								done();
								return;
							}
							assert.ok(
								stats[0].size > stats[1].size,
								'Compressed file should be smaller.'
							);
							done();
						});
					});
				});
			});
		});
	}
};

require("test").run(tests);