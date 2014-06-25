var spawn = require('child_process').spawn;
function countLines(args) {
	var path = [].slice.call(args, 2);
	var wc = spawn('wc',['-l', path[0]]);
	wc.stdout.setEncoding('utf8');
	wc.stdout.on('data', function(data){
		console.log(data.match(/\d{1,}/g)[0]);
	});
}
countLines(process.argv);

