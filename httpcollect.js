var http = require('http');
var url = [].slice.call(process.argv, 2)[0];

http.get(url, function(res){
	var fullResponse = '';
	res.setEncoding('utf8');
	res.on('data', function(data){
		fullResponse += data;
	});
	res.on('end', function(){
		console.log(fullResponse.length);
		console.log(fullResponse);
	});
});