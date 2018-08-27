const mode = process.env.MODE || 'default';
console.log(`[mode    ] ${mode}`);
module.exports = require(`./${mode}.json`);
