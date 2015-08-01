var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('src/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('src'))
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
});

gulp.task('default', ['sass', 'connect', 'watch']);
