

var express = require('express');
var fibersMiddleWare = require('./fib-middleware');
var request = require('./fib-request');
var fib_redis = require('./fib-redis');
var redis_client = fib_redis.init(require('redis-url').connect());

var User = {};
User.get = function(id){
	var user_json = redis_client.get('user:' + id);
	return JSON.parse(user_json);
};

var Event = {};
Event.getUserEvents = function(user_id){
	var user_json = redis_client.mget('user:' + id + ':events');
	return JSON.parse(user_json);
};

var app = express();
app.use(fibersMiddleWare.runInFiber);	// 设置中间件

app.get('/baidu', function(req, res){
	var baidu_response_body = request.get('http://baidu.com');
	res.send(baidu_response_body);
}).get('/users/:fb_id', function(req, res){
	var user = User.get(req.params.fb_id);
	res.setHeader('Content-Type', 'application/json');
	res.send(200, JSON.stringify(user));
}).get('/users:fb_id/events', function(req, res){
	var user = User.get(req.params.fb_id);
	var events = Event.getUserEvents(user.id);
	var response = {'user':user, 'events':events};
	res.setHeader('Content-Type', 'application/json');
	res.send(200, JSON.stringify(response));
});

var server = app.listen(80, function(){
	console.log('Listening on port %d', server.address().port);
});

console.log("fuck");
