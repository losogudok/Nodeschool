"use strict"
var fs = require('fs');
var path = require('path');
var Q = require('q');

function readFilesFromDir(dir) {
	var defer = Q.defer();
	fs.readdir(dir, function(err, files) {
		if (err) defer.reject(new Error(err));
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

function printFilteredFiles(dir, ext, callback) {
	readFilesFromDir(dir)
		.then(function(files) {
			return Q.fcall(filterFiles, files, ext)
		}, function(err) {
			throw new Error(err);
		})
		.then(callback);
}

// function printFilteredFiles(dir, ext, callback) {
// 	fs.readdir(dir, function(err, files) {
// 		if (err) {
// 			return callback(err);
// 		}
// 		var filteredFiles = files.filter(function(val){
// 			return path.extname(val) === '.' + ext;
// 		});
// 		return callback(null, filteredFiles);
// 	});
// }

module.exports = printFilteredFiles;

