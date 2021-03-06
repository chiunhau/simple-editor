const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'simple-editor.js',
    library: 'simple-editor',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './demo',
    port: 3000,
    proxy: {
      "/api/*": {
        target: 'http://localhost:3001',
        secure: false,
      }
    },
    watchContentBase: true,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use:  ['style-loader', 'css-loader']},
      { test: /\.scss$/,use: [ 'style-loader','css-loader', 'sass-loader']}
    ]
  }
}
