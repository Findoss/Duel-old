const path = require('path');

const PATHS = {
  source: path.join(__dirname, './source'),
  build: path.join(__dirname, './build'),
  statics: path.join(__dirname, './statics'),
};

module.exports = {
  outputDir: `${PATHS.build}`,
  configureWebpack: {
    entry: {
      app: `${PATHS.source}/main.js`,
    },
    output: {
      path: `${PATHS.build}`,
    },
    resolve: {
      alias: {
        '@': `${PATHS.source}`,
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            `${PATHS.source}`,
          ],
        },
      ],
    },
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(() => [
        {
          filename: `${PATHS.build}/index.html`,
          template: `${PATHS.statics}/index.html`,
        },
      ]);
  },
};
