config = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: "./build"
  },
  module: {
    loaders: [
    { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  devtool: 'source-map'
}

module.exports = config;