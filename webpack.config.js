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
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Models: path.resolve(__dirname, 'src/domain/models'),
      Values: path.resolve(__dirname, 'src/domain/values'),
      Atoms: path.resolve(__dirname, 'src/app/components/atoms'),
      Molecules: path.resolve(__dirname, 'src/app/components/molecules'),
      Organisms: path.resolve(__dirname, 'src/app/components/organisms')
    }
  }
}
