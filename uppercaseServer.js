var http = require('http');
var fs = require('fs');
var port = [].slice.call(process.argv, 2)[0];


var server = http.createServer(function (req, res) {
	console.log('Got request');
	if (req.method === 'POST') {
		req.on('data', function(data){
			res.write(data.toString().toUpperCase());
		});
		req.on('end', function(){
			res.end();
		});
	}
	// res.write('Hello!');
	// res.end('Hello!');	
})
server.on('connection', function (socket){
	console.log('Got connection');
});
server.listen(port, function(){
	console.log('Server listening on port ' + port );
});