var gulp = require('gulp');
var sass = require('gulp-sass')
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish')
var connect = require('gulp-connect');

gulp.task('sass', function() {
  gulp.src('src/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('src'))
});

gulp.task('jshint', function() {
  return gulp.src('src/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('connect', function(){
  connect.server({
    root: 'src',
    port: 1820,
    livereload: true
  });
});

gulp.task('reload:src', function(){
  gulp.src('./src')
  .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch(['src/*.html', 'src/*.css'], ['reload:src']);
  gulp.watch(['src/*.scss'], ['sass']);
  gulp.watch(['src/*.js'], ['jshint']);
});

gulp.task('default', ['sass', 'jshint', 'connect', 'watch']);
