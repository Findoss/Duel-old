const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let outPath = path.resolve(__dirname, 'bundle')

module.exports = {
  entry: './client/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: outPath
  },
  devtool: 'cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: outPath + '/index.html',
      template: './client/index.html'
    })
  ]
}
