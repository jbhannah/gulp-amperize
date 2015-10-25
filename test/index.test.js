'use strict';

var gulp = require('gulp')
  , chai = require('chai')
  , expect = chai.expect
  , Amperize = require('amperize')
  , through = require('through2')
  , fs = require('fs')
  , gulpAmperize = require('../');

describe('gulp-amperize', function () {
  var filename = __dirname + '/fixtures/index.html';

  it('amperizes my HTML file', function (done) {
    return gulp.src(filename)
      .pipe(gulpAmperize())
      .pipe(through.obj(function (file, encoding, callback) {
        var source = fs.readFileSync(filename)
          , amperize = new Amperize();

          amperize.parse(source.toString(), function (error, data) {
            if (error) {
              throw error;
            }

            expect(data).to.be.equal(file.contents.toString());
            done();
          });
      }));
  });
});
