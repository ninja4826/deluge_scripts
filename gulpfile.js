var gulp = require('gulp');
var gutil = require('gulp-util');

var babel = require('gulp-babel');
var coffee = require('gulp-coffee');

var eslint = require('gulp-eslint');
var coffeelint = require('gulp-coffeelint');

gulp.task('babel', function() {
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('eslint', function() {
  return gulp.src('src/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('coffee', function() {
  return gulp.src('src/*.coffee')
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('build/'));
});

gulp.task('coffeelint', function() {
  return gulp.src('src/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter());
});

gulp.task('lint', ['eslint', 'coffeelint']);

gulp.task('build', ['babel', 'coffee']);

gulp.task('default', ['lint', 'build']);
