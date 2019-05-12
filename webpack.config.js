const path = require("path");
const webpackHtmlPlugin = require("html-webpack-plugin");
module.exports = {
    devtool:'source-map',
    entry:'./src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
      },
    plugins:[
        new webpackHtmlPlugin({
            template:'./src/index.html'
        })
    ],
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
      }
}