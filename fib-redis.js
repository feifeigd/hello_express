
var Fiber = require('fibers');

var conn;

function get(key){
	var error, value;
	var fiber = Fiber.current;
	conn.get(key, function(err, val){
		error = err;
		value = val;
		fiber.run();
	});
	Fiber.yield();
	return value;
}

function init(connection){
	conn = connection;
	return {'get':get};
}

exports.init = init;
