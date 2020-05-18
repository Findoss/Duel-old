/* eslint no-new-func: 0 */

function Templater(templateText) {
  return new Function(
    'data',
    `let output=${
      JSON.stringify(templateText)
        .replace(/{{ (.+?) }}/g, '"+($1)+"')
        .replace(/{% (.+?) %}/g, '";$1\noutput+="')
    };return output;`,
  );
}

module.exports.render = (template, payload) => {
  const renderTemplate = Templater(template);
  return renderTemplate(payload);
};
