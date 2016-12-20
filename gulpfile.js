const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const live_server = require('gulp-live-server');
const del = require('del');
const uglify = require('gulp-uglify');
const argv = require('yargs').argv;
const shell = require('gulp-shell');
const merge = require('merge-stream');
const rename = require('gulp-rename');

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

gulp.task('templates', shell.task([
  'ruby template.rb ' + env(),
]));

gulp.task('copy:assets', function () {
  return gulp.src(['app/**/*.jpg'], {base: './app'})
    .pipe(gulp.dest(buildDir()));
});

gulp.task('copy:libs', function() {
  libs = [
    'node_modules/jquery/dist/jquery.js',
  ]

  task = gulp.src(libs, {base: './node_modules'});
  if (isProd) {
    task.pipe(uglify());
  }

  return task.pipe(gulp.dest(buildDir() + '/js'));
});

gulp.task('copy:js', function() {
  var jsCompile = gulp.src([appDir + '/**/*.js', appDir + '/**/*.json'], {base: './app'})
    .pipe(gulp.dest(buildDir()));

  if (isProd) {
    jsCompile.pipe(uglify())
  }

  return jsCompile.pipe(gulp.dest(buildDir()));
});

gulp.task('kill-server', function() {
  shell.task(["ps aux | grep gulp | grep -v grep | awk '{print $2}' | xargs kill -9 $1"]);
});

gulp.task('copy:html', ['templates'], function() {
  return gulp.src([appDir + '/**/*.html'], {base: './app'})
    .pipe(gulp.dest(buildDir()));
});

gulp.task('build', ['sass', 'copy:libs', 'copy:js', 'copy:html', 'copy:assets']);
gulp.task('default', ['build:dev']);

gulp.task('serve', ['build'], function() {
  var server = live_server('server.js');
  server.start();
  types = [
    "gulpfile.js",
    appDir + "/**/*.js",
    appDir + "/**/*.erb",
    appDir + "/**/*.scss",
    appDir + "/**/*.txt",
  ]

  gulp.watch(types, ['clean', 'build'],  function (file) {
    console.log(file);
    server.notify.apply(server, [file]);
  });
});

gulp.task('serve:prod', ['build:prod'], function() {
  var server = live_server.static(buildDir(), '3001');
  server.start();
  gulp.watch(appDir + '/**/*', ['build'], function (file) {
    server.notify.apply(server, [file]);
  })
});

