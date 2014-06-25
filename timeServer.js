var net = require('net');
var port = [].slice.call(process.argv, 2)[0];

var server = net.createServer(function(socket) { //'connection' listener
  console.log('server connected');
  socket.end(new Date(new Date().setHours(new Date().getHours() + 4)).toISOString().slice(0, 16).replace('T', ' ') + '\n');
});
server.listen(port, function() { //'listening' listener
  console.log('server bound');
});

