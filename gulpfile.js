var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function(){
  connect.server({
    port: 1820,
    livereload: true
  });
});

gulp.task('reload:src', function(){
  gulp.src('./src')
  .pipe(connect.reload());
});
