const webpack = require("webpack");
const path = require("path");

module.exports = {
  module: {
    preLoaders: [
      {
        test:    /\.js$/,
        loader:  "eslint",
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test:    /\.js$/,
        loader:  "babel",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
  entry:  {fso: "./src/lib/fso.js"},
  output: {
    path:          path.join(__dirname),
    filename:      "dist/lib/[name].js",
    library:       "fso",
    libraryTarget: "commonjs",
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  devtool: "source-map",
};
