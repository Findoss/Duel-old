const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const livereload = require('gulp-livereload')
const jsdoc2md = require('jsdoc-to-markdown')

gulp.task('doc', () => {
  const inputFile = './client/scripts/classes/*.js'
  const outputDir = '../docs/'
  const templateData = jsdoc2md.getTemplateDataSync({ files: inputFile })

  const classNames = templateData.reduce((classNames, identifier) => {
    if (identifier.kind === 'class') classNames.push(identifier.name)
    return classNames
  }, [])

  for (const className of classNames) {
    console.log(`rendering ${className}`)
    const output = jsdoc2md.renderSync({
      data: templateData,
      template: `{{#class name="${className}"}}{{>docs}}{{/class}} })`
    })
    fs.writeFileSync(path.resolve(outputDir, `class_${className}.md`), output)
  }
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
