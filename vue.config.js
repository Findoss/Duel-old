const path = require('path');

const PATHS = {
  source: path.join(__dirname, './client/source'),
  build: path.join(__dirname, './client/build'),
  statics: path.join(__dirname, './client/statics'),
};

module.exports = {
  configureWebpack: {
    entry: {
      app: `${PATHS.source}\\main.js`,
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
      .tap(args => [
        {
          filename: `${PATHS.build}\\index.html`,
          template: `${PATHS.statics}\\index.html`,
        },
      ]);
  },
};
