const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCSS = require('extract-text-webpack-plugin')

const PATHS = {
  source: path.join(__dirname, 'client'),
  build: path.join(__dirname, 'build')
}

const common = {
  entry: {
    app: [
      PATHS.source + '/scripts/index.js',
      PATHS.source + '/styles/index.css'
    ],
    vendors: './node_modules/phaser-ce/build/phaser'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: PATHS.build
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractCSS.extract({
          use: 'css-loader'
        })
      },
      {
        test: /phaser\.js$/,
        loader: 'script-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: PATHS.build + '/index.html',
      template: PATHS.source + '/index.html',
      chunks: ['vendors', 'app'],
      chunksSortMode: 'manual'
    }),
    new ExtractCSS('css/[name].bundle.css')
  ]
}

const dev = {
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: PATHS.build,
    host: 'localhost',
    port: 8000,
    compress: true,
    stats: {
      hash: false,
      cached: false,
      chunks: false,
      source: false,
      modules: false,
      version: false,
      children: false,
      performance: false
    }
  }
}

module.exports = (env) => {
  if (env === 'production') {
    return common
  } else {
    return merge([
      common,
      dev
    ])
  }
}
