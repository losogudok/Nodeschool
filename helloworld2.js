"use strict"
var fs = require('fs');
var path = require('path');
var Q = require('q');
var args = [].slice.call(process.argv, 2);

function readFilesFromDir(dir) {
	var defer = Q.defer();
	fs.readdir(dir, function(err, files) {
		if (err) defer.reject(err);
		defer.resolve(files);
	});
	return defer.promise;
}

function filterFiles(files, ext) {
	var defer = Q.defer();
	// console.log(arguments);
	var filteredFiles = files.filter(function(val){
		return path.extname(val) === '.' + ext;
	});
	defer.resolve(filteredFiles);
	return defer.promise;
}

function printToConsole(list) {
	list.forEach(function(val){
		console.log(val);
	})
}

readFilesFromDir(args[0], args[1])
	.then(function(files) {
		return Q.fcall(filterFiles, files, args[1])
	})
	.then(printToConsole);