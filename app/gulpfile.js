let gulp = require('gulp')
let livereload = require('gulp-livereload')
let jsdoc = require('gulp-jsdoc3')

gulp.task('doc', () => {
  let config = require('./jsdoc.json')
  gulp.src(['./source/game/scripts/classes/*.js', '../README.md'], {read: false})
    .pipe(jsdoc(config))
    .pipe(livereload())
})

gulp.task('doc_watch', () => {
  livereload.listen()
  gulp.watch('source/game/scripts/*/*.js', ['doc'])
})

gulp.task('reload', () => {
  gulp.src('source/game/index.html')
      .pipe(livereload())
})

gulp.task('default', () => {
  livereload.listen()
  gulp.watch('source/game/scripts/*.js', ['reload'])
  gulp.watch('source/game/scripts/*/*.js', ['reload'])
  gulp.watch('source/game/*.html', ['reload'])
})
