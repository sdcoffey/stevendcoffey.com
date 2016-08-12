const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const preprocess = require('gulp-preprocess');
const live_server = require('gulp-live-server');
const del = require('del');
const uglify = require('gulp-uglify');
const argv = require('yargs').argv;

var isProd = !!argv.production;
var appDir = "app";

var env = function() {
  return isProd ? "prod" : "dev";
}

var buildDir = function() {
  return "build/" + env();
}

// -- tasks

gulp.task('clean', function () {
  return del.sync(buildDir() + '/**/*');
});

gulp.task('sass', function () {
  return component = gulp.src(appDir + '/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(buildDir()));
});

gulp.task('copy:assets', function () {
  return gulp.src([appDir + '/static_assets/*'], {base: './app'})
    .pipe(gulp.dest(buildDir()));
});

gulp.task('copy:js', function() {
  var jsCompile = gulp.src([appDir + '/**/*.js'], {base: './app'})
    .pipe(gulp.dest(buildDir()));

  if (isProd) {
    jsCompile.pipe(uglify())
  }

  return jsCompile.pipe(gulp.dest(buildDir()));
});

gulp.task('watch', ['build'], function () {
  gulp.watch(appDir + '/**/*', ['build']);
});

gulp.task('copy:html', function() {
  return gulp.src([appDir + '/**/*.html'], {base: './app'})
    .pipe(preprocess({ context: { NODE_ENV: env() }}))
    .pipe(gulp.dest(buildDir()));
});

gulp.task('build', ['clean', 'sass', 'copy:js', 'copy:html', 'copy:assets']);
gulp.task('build:prod', ['enable:prod', 'build']);
gulp.task('default', ['build']);

gulp.task('serve', ['build'], function() {
  var server = live_server.static(buildDir(), '3001');
  server.start();
  gulp.watch(appDir + '/**/*', [buildDir()], function (file) {
    server.notify.apply(server, [file]);
  })
});

gulp.task('serve:prod', ['build:prod'], function() {
  var server = live_server.static(buildDir(), '3001');
  server.start();
  gulp.watch(appDir + '/**/*', [buildDir()], function (file) {
    server.notify.apply(server, [file]);
  })
});

gulp.task('enable:prod', function() {
  isProd = true;
});

