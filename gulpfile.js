var gulp = require('gulp');
var connect = require('gulp-connect');

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
  gulp.watch(['src/*'], ['reload:src']);
});

gulp.task('default', ['connect', 'watch']);
