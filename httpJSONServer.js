var http = require('http');
var url = require('url');
var port = [].slice.call(process.argv, 2)[0] || 3000;


var server = http.createServer(function (req, res) {
	console.log('Got request');
	var parsedUrl = url.parse(req.url, true); 
	if (req.method === 'GET') {
		var date = new Date(parsedUrl.query.iso);
		if (parsedUrl.pathname === '/api/parsetime') {
			var jsonRES = {
				"hour": date.getHours(),
				"minute": date.getMinutes(),
				"second": date.getSeconds()
			};
			res.end(JSON.stringify(jsonRES));
		}
		if (parsedUrl.pathname === '/api/unixtime') {
			var jsonRES = {
				"unixtime": date.getTime()
			}
			res.end(JSON.stringify(jsonRES));
		}
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