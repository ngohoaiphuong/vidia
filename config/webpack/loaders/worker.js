module.exports = {
  test: /\.worker\.js$/,
  exclude: /node_modules/,
  use: [{
    loader: 'worker-loader'
  }]
}
