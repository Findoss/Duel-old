const gulp = require('gulp')
const livereload = require('gulp-livereload')
const jsdoc = require('gulp-jsdoc3')
const fs = require('fs')
const jsdoc2md = require('jsdoc-to-markdown')

gulp.task('doc', () => {
  let config = require('./jsdoc.json')
//   gulp.src(['./client/scripts/classes/*.js', '../README.md'], {read: false})
//     .pipe(jsdoc(config))
//     .pipe(livereload())
// })
  const output = jsdoc2md.renderSync({ files: './client/scripts/classes/*.js' })
  fs.writeFileSync('../docs/api.md', output)
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
