const { resolve: { alias } } = require('../webpack.config.js')

module.exports = {
  resolve: {
    alias
  },
  module: {
    rules: [
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
  }
}
