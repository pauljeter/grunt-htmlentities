/*
 * grunt-htmlentities
 * https://github.com/pauljeter/grunt-htmlentities
 *
 * Copyright (c) 2015 Paul Jeter
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var he = require('he');
  var path = require('path');
  var fs = require('fs');

  // var normalizePath = function (p) {
  //   if (path.sep !== '/') {
  //     p = p.replace(/\\/g, '/');
  //   }
  //   return p;
  // };
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('htmlentities', 'Grunt task for the javascript HE html entities handler', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      encodeEverything: false,
      useNamedReferences: true,
      allowUnsafeSymbols: false,
      strict: false,
    });

    var heOpts = {
      encodeEverything: options.encodeEverything,
      useNamedReferences: options.useNamedReferences,
      allowUnsafeSymbols: options.allowUnsafeSymbols,
      strict: options.strict
    };

    // Iterate over all specified file groups.
    this.files.forEach(function(a) {
      var files = a.src;
      var valid = a.src.filter(existsFilter);
      var dest = a.dest;
      var counter = 0;

      // if (a.dest && detectDestType(a.dest)) {
      //   var dest = a.dest;
      // } else {
      //   var dest;
      // }
      // a.dest ? detectDestType(a.dest) ? a.dest : false : 'dest';
      // console.log('dest', dest);

      // console.log(files);
      files.forEach(function(f) {

        // console.log(f);

        // Handle options.
        var src = grunt.file.read(f);
        var encoded = he.encode(src, heOpts);
        // console.log(encoded);

        var fileDir = dest || path.dirname(f);
        // console.log('fileDir', fileDir);
        var optsFilename = options.rename ? (options.rename + '.' + options.extname + '.html') : false;
        var fileName = optsFilename || path.basename(f);
        // console.log('path.basename(f)', path.basename(f));
        // console.log('fileName', fileName);
        var filePath = fileDir + '/' + fileName;
        // console.log('filePath', filePath);
        // Write the destination file.
        grunt.file.write(filePath, encoded);

        // Print a success message.
        // grunt.log.writeln('File "' + filePath + '" created.');
        counter++;
      });
      grunt.log.writeln('Successfully encoded ' + counter.toString().green + ' files.')
    });
  });

  var detectDestType = function(dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return true;
    } else {
      return false;
    }
  };

  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };

  // Warn on and remove invalid source files (if nonull was set).
  var existsFilter = function(filepath) {

    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  };

};
