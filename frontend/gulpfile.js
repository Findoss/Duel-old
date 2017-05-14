var gulp = require('gulp');
var livereload = require('gulp-livereload');
var header = require('gulp-header');

gulp.task('reload', function() {
  return gulp.src('source/game/index.html')
    .pipe(livereload())
});

gulp.task('default', function() {
  livereload.listen();
  gulp.watch('source/game/scripts/*.js', ['reload']);
  gulp.watch('source/game/*.html', ['reload']);
});