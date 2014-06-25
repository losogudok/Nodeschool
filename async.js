var http = require('http');
var Q = require('q');
var urls = [].slice.call(process.argv, 2);
var url1 = urls[0];
var url2 = urls[1];
var url3 = urls[2];



var requests = urls.map(function(url){
	return makePromiseRequest(url);
});

Q.all(requests).done(function(){
	requests.forEach(function(data){
		console.log(data);
	});
});

function makePromiseRequest(url) {
	var reqDefer = Q.defer();
	http.get(url, function(res){
		var fullResponse = '';
		res.setEncoding('utf8');
		res.on('data', function(data){
			fullResponse += data;
		});
		res.on('end', function(){
			reqDefer.resolve(fullResponse);
		});
	});
	return reqDefer.promise;
}