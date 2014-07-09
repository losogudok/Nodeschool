var async = require('async');
var arg = [].slice.call(process.argv, 2)[0];
var fs = require('fs');
var http = require('http');

async.waterfall([
	function(callback) {
		fs.readFile(arg, function(err, data) {
			if (err) return callback(err);
			callback(null, data.toString('utf8'));
		});
	},
	function(url, callback) {
		var result = '';
		http.get(url, function(res){
			res.on('data', function(data){
				result += data;
			});
			res.on('end', function(){
				callback(null, result);
			});
			res.on('error', function(err){
				callback(err);
			});
		});
	}

], function(err, result) {
	console.log(result);
});