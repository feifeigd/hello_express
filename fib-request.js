
var request = require('request');

var Fiber = require('fibers');

function get(url){
	var error, response, body;
	var fiber = Fiber.current;
	request.get(url, function(err, resp, b){
		error = err;
		response = resp;
		body = b;
		fiber.run();	// 2
	});
	Fiber.yield();	// 1 
	return body;	// 3
}

exports.get = get;
