import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default ({ isDev }) => ({
  devServer: isDev
    ? {
        server: {
          type: "spdy",
        },
      }
    : undefined,
  devtool: isDev ? "source-map" : false,
  experiments: {
    css: true,
    topLevelAwait: true,
  },
  mode: isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/typescript",
                [
                  "@babel/env",
                  {
                    modules: false,
                  },
                ],
                [
                  "@babel/react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
              plugins: [isDev && "react-refresh/babel"].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  output: {
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin(), isDev && new ReactRefreshPlugin()].filter(
    Boolean
  ),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".module.css"],
  },
});
