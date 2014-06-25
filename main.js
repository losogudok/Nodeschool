
var printFilteredFiles = require('./print_module')
var args = [].slice.call(process.argv, 2);
var path = args[0];
var ext = args[1];

printFilteredFiles(path, ext, function(err, list) {
	if (err) throw err;
	list.forEach(function(val){
		console.log(val);
	})
});