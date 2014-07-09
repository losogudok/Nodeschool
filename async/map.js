var async = require('async');
var urls = [].slice.call(process.argv, 2);
var http = require('http');

async.map(urls, function(item, done) {
	var result = '';
	var req = http.get(item, function(res){
			res.on('data', function(data){
				result += data;
			});
			res.on('end', function(){
				done(null, result);
			});			
		});
		req.on('error', function(err){
			done(err);
		});
}, function(err, results) {
	if (err) console.log(err);
	if (results) console.log(results);
});