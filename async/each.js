var async = require('async');
var urls = [].slice.call(process.argv, 2);
var http = require('http');

async.each(urls, function(item, done) {
	var req = http.get(item, function(res){
			res.on('data', function(data){
			});
			res.on('end', function(){
				done();
			});			
		});
		req.on('error', function(err){
			done(err);
		});
}, function(err, results) {
	if (err) console.log(err);
});