const mode = process.env.MODE || 'develop';
console.log(`[mode    ] ${mode}`);
module.exports = require(`./${mode}.js`);
