var http = require('http');
var fs = require('fs');
var port = [].slice.call(process.argv, 2)[0];
var location = [].slice.call(process.argv, 2)[1];

var server = http.createServer(function (req, res) {
	console.log('Got request');
	console.log('File location is ' + location);
	var fileRs = fs.createReadStream(location);
	fileRs.pipe(res);
	// res.write('Hello!');
	// res.end('Hello!');	
})
server.on('connection', function (socket){
	console.log('Got connection');
});
server.listen(port, function(){
	console.log('Server listening on port ' + port );
});
