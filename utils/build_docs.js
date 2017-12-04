const fs = require('fs')
const path = require('path')
const jsdoc2md = require('jsdoc-to-markdown')

// path
const pathInput = 'client/scripts/classes/*.js'
const pathOutput = 'docs/'

let templateData = jsdoc2md.getTemplateDataSync({ files: pathInput })

let classNames = templateData.reduce((classNames, identifier) => {
  if (identifier.kind === 'class') {
    classNames.push(identifier.name)
  }
  return classNames
}, [])

for (let className of classNames) {
  console.log(`rendering class ${className}.js`)
  let output = jsdoc2md.renderSync({
    data: templateData,
    template: `{{#class name="${className}"}}{{>docs}}{{/class}} })`
  })
  fs.writeFileSync(path.resolve(pathOutput, `class_${className}.md`), output)
}
