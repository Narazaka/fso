const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode:   "production",
  module: {
    rules: [
      {
        test:    /\.js$/,
        loader:  "babel-loader",
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
    libraryTarget: "commonjs2",
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  devtool: "source-map",
};
