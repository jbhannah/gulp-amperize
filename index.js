'use strict';

var through = require('through2')
  , gutil = require('gulp-util')
  , Amperize = require('amperize');

module.exports = function (options) {
  function amperize(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new gutil.PluginError('gulp-amperize', 'doesn\'t support Streams'));
    }

    var amperize = new Amperize(options || {});

    amperize.parse(file.contents.toString(), function (error, data) {
      if (error) {
        return callback(new gutil.PluginError('gulp-amperize', error));
      }

      file.contents = new Buffer(data);
      callback(null, file);
    });
  }

  return through.obj(amperize);
};
