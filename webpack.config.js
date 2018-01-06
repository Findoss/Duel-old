const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let outPath = path.resolve(__dirname, 'bundle')

module.exports = {
  entry: {
    app: [
      './client/scripts/index.js'
    ],
    vendors: [
      './node_modules/phaser-ce/build/phaser'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: outPath
  },
  module: {
    loaders: [
      {
        test: /phaser\.js$/,
        loader: 'script-loader'
      }
    ]
  },
  devtool: 'cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: outPath + '/index.html',
      template: './client/index.html',
      chunks: ['vendors', 'app'],
      chunksSortMode: 'manual'
    })
  ]
}
