import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";

import type { Configuration } from "webpack";

import "webpack-dev-server";

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "src", "index.html"),
});

const config: Configuration = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.tsx"),
  target: "web",
  resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: { loader: "ts-loader" },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [htmlPlugin],
  devtool: "source-map",
};

export default config;
