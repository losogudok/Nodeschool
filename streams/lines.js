var stream = require('stream');
var util = require('util');
var Transform = stream.Transform;
var colors = require('colors');
var fs = require('fs');
var fileRs = fs.createReadStream('sample.txt');

function EvenUpper(options) {
  Transform.call(this, options);
  this.index = 1;
  this.buffer = '';
}

util.inherits(EvenUpper, Transform);


EvenUpper.prototype._transform = function (chunk, enc, cb) {
	var chunkString = chunk.toString();
	var chunkArray = chunkString.split('\n');
	var cuttedLine = chunkString.slice(chunkString.lastIndexOf('\n') + 1, chunkString.length);
	var self = this;
	// console.log(chunkString.red);
	chunkArray[0] = this.buffer + chunkArray[0];
	this.buffer = cuttedLine;
	chunkArray.forEach(function(val, index){
		var lowerVal,
			upperVal;
		if ( this.index % 2 === 0 ) {
			upperVal = val.toUpperCase();
			this.push(upperVal + '\n');
		}	
		else {
			lowerVal = val.toLowerCase();
			this.push(lowerVal + '\n');
		}
		// console.log('\n' + this.index + '\n');
		this.index++;
	}, self);
	// console.log('\n' + chunkString + '\n');
  	cb();
};
EvenUpper.prototype._flush = function(cd) {
	this.index = 1;
	this.buffer = '';	
	cd();
}
// EvenUpper.prototype._flush = function (chunk, enc, cb) {
// 	var lines = this.remaining.split('\n');
// 	lines = lines.map(function(val, index, arr) {
		
// 	});
// 	// console.log(lines);
//   	// var upperChunk = chunk.toString().toUpperCase();
//   	// this.push(upperChunk);
//   	this.push(lines.toString('utf8'));
//   	// cb();
// };
// Split.prototype._transform = function(chunk, enc, cb) {
    
//     // var index = remaining.indexOf('\n');
//     // var last  = 0;
//     // while (index > -1) {
//     //   var line = remaining.substring(last, index);
//     //   last = index + 1;
//     //   func(line);
//     //   index = remaining.indexOf('\n', last);
//     // }

//     // remaining = remaining.substring(last);

  
//      this.push(remaining);
// }


// try it out
var evenUpper = new EvenUpper();

process.stdin.pipe(evenUpper).pipe(process.stdout); // output to stdout
// fileRs.pipe(evenUpper).pipe(process.stdout); // output to stdout
