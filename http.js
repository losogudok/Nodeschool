var http = require('http');
var url = [].slice.call(process.argv, 2)[0];

http.get(url, function(res){
	res.setEncoding('utf8');
	res.on('data', function(data){
		console.log(data);
	});
});