const path = require('path')

module.exports = {
  entry: './src/app/index.js',
  output: {
    filename: 'game-of-life.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './src/app'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
