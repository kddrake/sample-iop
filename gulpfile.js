var gulp = require('gulp-help')(require('gulp'));
var sass = require('gulp-sass')
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var Server = require('karma').Server;
var connect = require('gulp-connect');

gulp.task('sass', 'Compiles preprocessed SASS files to a CSS file', function() {
  gulp.src(['src/sass/*.scss', 'src/sass/*.sass'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('src'))
});

gulp.task('jshint', 'Detects errors and potential problems in JavaScript', function() {
  return gulp.src('src/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('unit-test', 'Runs Karma unit tests', function(done){
  new Server({
    //__dirname is a global nodeJS var that points to
    //the directory containing the gulpfile
    configFile: __dirname + '/test/unit/karma.conf.js'
  }, done).start();
});

gulp.task('connect', 'Webserver with LiveReload at localhost:1820 serving up \'src/\'', function(){
  connect.server({
    root: 'src',
    port: 1820,
    livereload: true
  });
});

gulp.task('reload:src', false, function(){
  gulp.src('./src')
  .pipe(connect.reload());
});

gulp.task('watch', 'Watches files and runs corresponding gulp tasks', function(){
  gulp.watch(['src/*.html', 'src/*.css'], ['reload:src']);
  gulp.watch(['src/*.scss'], ['sass']);
  gulp.watch(['src/*.js'], ['jshint']);
});

gulp.task('default', false, ['sass', 'jshint', 'unit-test', 'connect', 'watch']);
