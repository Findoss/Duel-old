/* eslint no-restricted-syntax: ["error", "BinaryExpression[operator='in']"] */

const fs = require('fs');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');

// path
const pathInputs = [
  'client/scripts/views/*.js',
  'libs/*.js',
  'server/classes/*.js',
];
const pathOutput = 'docs/';
const pathTemplate = 'utils/docs_template/members.hbs';

for (let i = 0; i < pathInputs.length; i++) {
  const templateData = jsdoc2md.getTemplateDataSync({ files: pathInputs[i] });
  const classes = templateData.reduce((classNames, identifier) => {
    if (identifier.kind === 'class') {
      classNames.push(identifier.name);
    }
    return classNames;
  }, []);

  for (const className of classes) {
    console.log(`rendering class ${className}.js`);
    const output = jsdoc2md.renderSync({
      data: templateData,
      template: `{{#class name="${className}"}}{{>docs}}{{/class}}`,
      partial: [
        pathTemplate,
      ],
    });
    fs.writeFileSync(path.resolve(pathOutput, `class_${className}.md`), output);
  }
}
