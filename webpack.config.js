const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "js/[name].bundle.[contenthash:6].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home",
      template: "template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["styled-jsx/babel"],
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)$/i,
        loader: "url-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
