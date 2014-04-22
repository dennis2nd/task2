var express = require("express");
var app = express();

app.get("/", function (req, res) {
	res.sendfile("./index.html");
});

app.get("/:operation", function (req, res, next) {
	var loc = req.query.loc;

	var spawn = require("child_process").spawn,
	    git_clone = spawn("git", ["clone", loc, "/git/"]);
	
	git_clone.stdout.on('data', function (data) {
		res.send(data);
	});

	git_clone.stderr.on("data", function (data) {
		res.send(data);
	});

	git_clone.on("close", function (code) {
		res.send('child process exited with code ' + code);
	});
});

app.listen(3000);