var stream = require('stream');
var util = require('util');

// node v0.10+ use native Transform, else polyfill
var Transform = stream.Transform;

function Upper(options) {
  // init Transform
  Transform.call(this, options);
}
util.inherits(Upper, Transform);

Upper.prototype._transform = function (chunk, enc, cb) {
  var upperChunk = chunk.toString().toUpperCase();
  this.push(upperChunk);
  cb();
};


// try it out
var upper = new Upper();
process.stdin.pipe(upper).pipe(process.stdout); // output to stdout
