var async = require('async');
var arg = [].slice.call(process.argv, 2)[0];
var fs = require('fs');
var http = require('http');

async.waterfall([
	function(callback) {
		fs.readFile(err, data) {
			if (err) callback(err);
			callback(null, data);
		}
	},
	function(url, callback) {
		var result = '';
		http.get(url, function(res){
			if (err) callback(err);
			res.on('data', function(data){
				result += data;
			});
		});
	}

], function(err, result) {
	console.log(result);
});