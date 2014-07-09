var async = require('async');
var urls = [].slice.call(process.argv, 2);
var fs = require('fs');
var http = require('http');

async.series({
	requestOne: function(done) {
		var result = '';
		http.get(urls[0], function(res){
			res.on('data', function(data){
				result += data;
			});
			res.on('end', function(){
				done(null, result);
			});
			res.on('error', function(err){
				done(err);
			});
		});
	},
	requestTwo: function(done) {
		var result = '';
		http.get(urls[1], function(res){
			res.on('data', function(data){
				result += data;
			});
			res.on('end', function(){
				done(null, result);
			});
			res.on('error', function(err){
				done(err);
			});
		});
	}
}, function(err, results) {
	console.log(results);
});
