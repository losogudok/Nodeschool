var async = require('async');
var args = [].slice.call(process.argv, 2);
var http = require('http');
var hostname = args[0];
var port = args[1];
var opts = {
	hostname: hostname,
	port: port,
	path: '/users/create',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
};

async.series([
	function(done) {
		async.times(5, function(n, done){
			createUser(n, function(err, user){
				done(err, user);
			});
		}, function(err, users){
			// console.log(users);
			done(err, users);
		});
	},
	function(done) {
		var req = http.get(hostname + '/users', function(res){
			res.on('data', function(data){
				result += data;
			});
			res.on('end', function(){
				done(null, result);
			});
		});
		req.on('error', function(err) {
			done(err);
		});
	}
], function(err, results){
	console.log(results);
});

function createUser(id, done) {
	var result = '';
	var req = http.request(opts, function(res){
		res.on('data', function(data){
			result += data;
		});
		res.on('end', function(){
			done(null, result);
		});
	});
	req.on('error', function(err) {
		done(err);
	});
	req.write(JSON.stringify({
		user_id: id
	}));
	req.end();
} 