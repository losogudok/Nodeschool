var async = require('async');
var args = [].slice.call(process.argv, 2);
var http = require('http');
var hostname = args[0];
var user_id = 1;
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
		async.times(5, function(n, next){
			createUser(n+1, function(err, user){
				next(err, user);
			});
		}, function(err, users){
			if (err) console.log(err);
			done(null);
		});
	},
	function(done) {
		var result = '';
		var req = http.get('http://' + hostname +':' + port + '/users', function(res){
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
	console.log(results[1]);
});

function createUser(id, callback) {
	var req = http.request(opts, function(res){
		res.on('data', function(data){
		});
		res.on('end', function(){
			callback(null);
		});
	});
	req.on('error', function(err) {
		callback(err);
	});
	req.write(JSON.stringify({
		'user_id': id
	}));
	req.end();
} 

// var http = require('http');
// var async = require('async');

// async.times(5, function (n, next) {
//   var req = http.request({
//     hostname: process.argv[2],
//     port: process.argv[3],
//     method: 'POST',
//     path: '/users/create'
//   });

//   req.write(JSON.stringify({ user_id: n }));
//   req.end();
// }, function (err, results) {
//   if (err) return console.log(err);

//   http.get('http://' + process.argv.slice(2).join(':') + '/users', function (res) {
//     var body = '';

//     res.on('data', function (chunk) {
//       body += chunk.toString();
//     });

//     res.on('end', function () {
//       console.log(body);
//     });
//   });

// });
// var async = require('async'),
// 	http = require('http'),
// 	user_id = 0,
// 	hostname = process.argv[2],
// 	port = process.argv[3],
// 	url = 'http://' +  hostname + ':' + port + '/users';

// var sendPostRequests = function(done){
// 	async.times(5, function(n, next){
// 		var req = http.request({
// 			hostname: hostname,
// 			port: port,
// 			method: 'POST',
// 			path: "/users/create"
// 		}, function(res){
// 			res.on('data', function (chunk) {
// 	        });
// 	        res.on('end', function(){
// 	        	next(null)
// 	        })
// 		})

// 		req.write(JSON.stringify({ 'user_id': n + 1 }))
// 		req.end();
// 	}, function(err){
// 		if (err) return console.log(err);
// 		// finished sending post requests, move on to the next function
// 		done(null)
// 	})
// };

// var sendGetRequest = function(done){
// 	http.get(url, function(res){
// 		var body = '';

// 		res.on('data', function(chunk){
// 			body += chunk.toString();
// 		})

// 		res.on('end', function(){
// 			done(null, body)
// 		})
// 	})

// }

// // send requests
// async.series({
// 	post: sendPostRequests, 
// 	get: sendGetRequest
// 	}, function(err, results){
// 		// log result of get request
// 		console.log(results.get)
// 	})