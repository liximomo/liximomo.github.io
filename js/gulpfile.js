var gulp = require('gulp');
var gutil = require("gulp-util");
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');


gulp.task('build', ['build:prod']);

gulp.task('default', ['build:dev'], function() {
  gulp.watch('./src/*.js', ['build:dev']);
});

gulp.task('build:dev', function(cb) {
  var config = require('./webpack.dev.config');
  webpackBuild(config, cb);
});

gulp.task('build:prod', function(cb) {
  var config = require('./webpack.config');
  webpackBuild(config, cb);
});

function webpackBuild(cfg ,cb) {
  webpack(cfg, function(err, stats) {
  if(err) throw new gutil.PluginError("webpack build", err);
    gutil.log("[webpack build]", stats.toString({
        colors: true
    }));
    cb();
    });
}