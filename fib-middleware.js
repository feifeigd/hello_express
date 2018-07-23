
var Fiber = require('fibers');

function fiberMiddleWare(req, resp, next){
	Fiber(function(){
		next();
	}).run();
}

exports.runInFiber = fiberMiddleWare;
