var gulp = require('gulp')
var livereload = require('gulp-livereload')

gulp.task('reload', () => {
  return gulp.src('source/game/index.html')
    .pipe(livereload())
})

gulp.task('default', () => {
  livereload.listen()
  gulp.watch('source/game/scripts/*.js', ['reload'])
  gulp.watch('source/game/scripts/*/*.js', ['reload'])
  gulp.watch('source/game/*.html', ['reload'])
})
